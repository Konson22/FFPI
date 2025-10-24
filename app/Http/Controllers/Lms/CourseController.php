<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Schema;

/**
 * Course (Module) Controller
 * Handles course discovery, listing, and details
 */
class CourseController extends Controller
{
    /**
     * List all published courses with filters
     */
    public function index(Request $request): JsonResponse
    {
        $query = Module::query()->with(['category']);
        
        // Only filter by published if column exists
        if (Schema::hasColumn('modules', 'published')) {
            $query->where('published', true);
        } elseif (Schema::hasColumn('modules', 'is_active')) {
            $query->where('is_active', true);
        }
        
        // Filter by category
        if ($request->has('categoryId')) {
            $query->where('category_id', $request->categoryId);
        }
        
        // Filter by search
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }
        
        // Filter by featured (if column exists)
        if ($request->has('featured') && Schema::hasColumn('modules', 'featured')) {
            $query->where('featured', $request->boolean('featured'));
        }
        
        // Pagination
        $perPage = min($request->get('perPage', 20), 100);
        $courses = $query->paginate($perPage);
        
        // Transform to include enrollment status
        $coursesData = $courses->getCollection()->map(function ($module) use ($request) {
            $data = $this->transformCourse($module);
            
            // Add enrollment info if user is authenticated
            if ($user = $request->user()) {
                // Check if user has progress in this module
                $hasProgress = \App\Models\UserProgress::whereHas('lesson', function ($q) use ($module) {
                    $q->where('module_id', $module->id);
                })->where('user_id', $user->id)->exists();
                    
                if ($hasProgress) {
                    $data['isEnrolled'] = true;
                    $data['progress'] = $this->calculateProgress($module->id, $user->id);
                }
            }
            
            return $data;
        });
        
        return response()->json($coursesData);
    }
    
    /**
     * Search courses
     */
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q', '');
        
        $courses = Module::where('published', true)
            ->where(function ($q) use ($query) {
                $q->where('title', 'like', "%{$query}%")
                  ->orWhere('description', 'like', "%{$query}%")
                  ->orWhere('summary', 'like', "%{$query}%");
            })
            ->with(['category'])
            ->limit(20)
            ->get()
            ->map(fn($module) => $this->transformCourse($module));
        
        return response()->json($courses);
    }
    
    /**
     * Get single course details
     */
    public function show(Request $request, $id): JsonResponse
    {
        $module = Module::with(['category', 'lessons'])->findOrFail($id);
        
        // Check if published column exists, fallback to is_active
        $isPublished = isset($module->published) ? $module->published : ($module->is_active ?? true);
        
        if (!$isPublished) {
            abort(404);
        }
        
        $data = $this->transformCourse($module);
        
        // Add enrollment info
        if ($user = $request->user()) {
            // Check if user has any progress in this course
            $hasProgress = \App\Models\UserProgress::whereHas('lesson', function ($q) use ($id) {
                $q->where('module_id', $id);
            })->where('user_id', $user->id)->exists();
                
            if ($hasProgress) {
                $data['isEnrolled'] = true;
                $data['progress'] = $this->calculateProgress($module->id, $user->id);
            }
        }
        
        // Add lesson count
        $publishedLessons = $module->lessons->filter(function ($lesson) {
            return isset($lesson->published) ? $lesson->published : true;
        });
        $data['lessonCount'] = $publishedLessons->count();
        
        return response()->json($data);
    }
    
    /**
     * Get course reviews (stub)
     */
    public function reviews($id): JsonResponse
    {
        // TODO: Implement reviews table and functionality
        return response()->json([]);
    }
    
    /**
     * Submit course review (stub)
     */
    public function submitReview(Request $request, $id): JsonResponse
    {
        $request->validate([
            'rating' => 'required|integer|min:1|max:5',
            'review' => 'nullable|string|max:1000',
        ]);
        
        // TODO: Store review in database
        
        return response()->json(['message' => 'Review submitted']);
    }
    
    /**
     * Transform Module to Course format
     */
    private function transformCourse($module): array
    {
        // Handle category - it might be a relationship object or a string
        $categoryData = null;
        if ($module->category && is_object($module->category)) {
            // It's a relationship
            $categoryData = [
                'id' => $module->category->id,
                'name' => $module->category->name,
                'slug' => $module->category->slug ?? strtolower(str_replace(' ', '-', $module->category->name)),
            ];
        } elseif ($module->category && is_string($module->category)) {
            // It's a legacy string value
            $categoryData = [
                'id' => strtolower(str_replace(' ', '-', $module->category)),
                'name' => $module->category,
                'slug' => strtolower(str_replace(' ', '-', $module->category)),
            ];
        }
        
        return [
            'id' => $module->id,
            'title' => $module->title,
            'slug' => $module->slug ?? "course-{$module->id}",
            'summary' => $module->summary ?? $module->description,
            'description' => $module->description,
            'coverUrl' => $module->cover_image ? asset('storage/' . $module->cover_image) : null,
            'thumbnailUrl' => $module->thumbnail ? asset('storage/' . $module->thumbnail) : null,
            'difficulty' => $module->difficulty_level ?? $module->difficulty ?? 'beginner',
            'duration' => $module->duration_hours ? $module->duration_hours * 3600 : ($module->duration ?? 0),
            'categoryId' => $module->category_id,
            'category' => $categoryData,
            'published' => $module->published ?? true,
            'featured' => $module->featured ?? false,
            'createdAt' => $module->created_at->toISOString(),
            'updatedAt' => $module->updated_at->toISOString(),
            'isEnrolled' => false, // Will be overridden if enrolled
            'progress' => 0, // Will be overridden if enrolled
        ];
    }
    
    /**
     * Calculate user's progress in a course
     */
    private function calculateProgress(int $moduleId, int $userId): int
    {
        $totalLessons = \App\Models\Lesson::where('module_id', $moduleId)
            ->where('published', true)
            ->count();
        
        if ($totalLessons === 0) {
            return 0;
        }
        
        $completedLessons = \App\Models\UserProgress::where('user_id', $userId)
            ->whereHas('lesson', function ($q) use ($moduleId) {
                $q->where('module_id', $moduleId);
            })
            ->where('completed', true)
            ->count();
        
        return (int) round(($completedLessons / $totalLessons) * 100);
    }
}

