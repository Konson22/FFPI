<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\ModuleEnrollment;
use App\Models\LessonScore;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ModulesController extends Controller
{
    /**
     * Get all enrolled modules with progress summary.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // $user = Auth::user();
        $user = User::find(1);
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get all enrolled modules for the user
        $enrollments = ModuleEnrollment::where('user_id', $user->id)
            ->with(['module.lessons' => function($query) {
                $query->where('is_active', true)->orderBy('order')->orderBy('id');
            }])
            ->get()
            ->keyBy('module_id');

        // Get all lesson scores for the user grouped by module
        $lessonScores = LessonScore::where('user_id', $user->id)
            ->get()
            ->groupBy('module_id');

        // Map modules with progress data
        $modules = $enrollments->map(function($enrollment) use ($lessonScores) {
            $module = $enrollment->module;
            $moduleScores = $lessonScores->get($module->id, collect());
            
            // Get active lessons
            $activeLessons = $module->lessons->where('is_active', true);
            $totalLessons = $activeLessons->count();
            
            // Calculate lesson progress summaries
            $lessons = $activeLessons->map(function($lesson) use ($moduleScores) {
                $lessonScore = $moduleScores->firstWhere('lesson_id', $lesson->id);
                
                return [
                    'id' => $lesson->id,
                    'order' => $lesson->order,
                    'title' => $lesson->title,
                    'objective' => $lesson->objective,
                    'is_completed' => $lessonScore && $lessonScore->completed_at !== null,
                    'quiz_score' => $lessonScore ? $lessonScore->quiz_score : null,
                    'completed_at' => $lessonScore ? $lessonScore->completed_at : null,
                ];
            })->values();

            // Calculate overall progress
            $completedLessons = $moduleScores->whereNotNull('completed_at')->count();
            $progressPercentage = $totalLessons > 0 
                ? (int)round(($completedLessons / $totalLessons) * 100) 
                : 0;

            // Update enrollment progress if calculated value differs
            if ($enrollment->progress_percentage != $progressPercentage) {
                $enrollment->update([
                    'progress_percentage' => $progressPercentage,
                    'status' => $progressPercentage === 100 ? 'completed' : ($progressPercentage > 0 ? 'started' : 'enrolled'),
                ]);
            }

            return [
                'id' => $module->id,
                'order' => $module->order,
                'featured' => $module->featured,
                'title' => $module->title,
                'description' => $module->description,
                'lessons_count' => $totalLessons,
                'enrollment' => [
                    'status' => $enrollment->status,
                    'started_at' => $enrollment->started_at,
                    'completed_at' => $enrollment->completed_at,
                    'progress_percentage' => $progressPercentage,
                    'quiz_score' => $enrollment->quiz_score,
                ],
                'progress' => [
                    'completed_lessons' => $completedLessons,
                    'total_lessons' => $totalLessons,
                    'percentage' => $progressPercentage,
                    'is_completed' => $progressPercentage === 100,
                ],
                'lessons' => $lessons,
                'created_at' => $module->created_at,
                'updated_at' => $module->updated_at,
            ];
        })->values();

        $categories = $this->getCategories();
        
        return response()->json([
            'success' => true,
            'modules' => $modules,
            'categories' => $categories,
        ], 200);
    }

    /**
     * Browse all available modules (with optional filtering).
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function browse()
    {
        $modules = Module::active()
            ->ordered()
            ->get();
        
        $categories = $this->getCategories();
        
        return response()->json([
            'success' => true,
            'data' => [
                'modules' => $modules,
                'categories' => $categories,
            ]
        ], 200);
    }

    /**
     * Get a specific module.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $module = Module::with(['lessons'])
            ->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'module' => $module,
        ], 200);
    }

    /**
     * Get available categories for modules.
     * 
     * @return array
     */
    private function getCategories()
    {
        return [
            ['id' => 'all', 'name' => 'All Topics', 'icon' => '📚'],
            ['id' => 'sexual-health', 'name' => 'Sexual Health', 'icon' => '❤️'],
            ['id' => 'family-planning', 'name' => 'Family Planning', 'icon' => '👶'],
            ['id' => 'relationships', 'name' => 'Relationships', 'icon' => '💕'],
            ['id' => 'reproductive-rights', 'name' => 'Reproductive Rights', 'icon' => '✊'],
            ['id' => 'contraception', 'name' => 'Contraception', 'icon' => '💊'],
            ['id' => 'pregnancy', 'name' => 'Pregnancy', 'icon' => '🤱'],
            ['id' => 'sti-prevention', 'name' => 'STI Prevention', 'icon' => '🛡️'],
            ['id' => 'consent', 'name' => 'Consent', 'icon' => '✋'],
            ['id' => 'mental-health', 'name' => 'Mental Health', 'icon' => '🧠']
        ];
    }
}

