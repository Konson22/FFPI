<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LearnController extends Controller
{
    /**
     * Display the learn hub page with enrolled courses and available courses.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Fetch user's enrolled courses with their modules and lessons
        $enrolledCourses = $user->enrolledCourses()
            ->with(['modules.lessons'])
            ->wherePivot('status', '!=', 'dropped')
            ->orderBy('course_enrollments.updated_at', 'desc')
            ->get();
        
        // Get user's enrolled course IDs
        $enrolledCourseIds = $enrolledCourses->pluck('id')->toArray();
        
        // Fetch all available courses (excluding enrolled ones)
        $availableCourses = Course::with(['modules.lessons'])
            ->active()
            ->ordered()
            ->whereNotIn('id', $enrolledCourseIds)
            ->get();
        
        // Get categories from all courses
        $allCourses = $enrolledCourses->concat($availableCourses);
        $categories = $allCourses->pluck('category')
            ->unique()
            ->filter()
            ->map(function ($category) {
                return [
                    'id' => strtolower(str_replace(' ', '-', $category)),
                    'name' => $category,
                    'icon' => $this->getCategoryIcon($category)
                ];
            })
            ->prepend(['id' => 'all', 'name' => 'All Topics', 'icon' => '📚'])
            ->values();
        
        return Inertia::render('user/learn/index', [
            'user' => $user,
            'enrolledCourses' => $enrolledCourses,
            'availableCourses' => $availableCourses,
            'categories' => $categories,
            'enrolledCourseIds' => $enrolledCourseIds
        ]);
    }

    /**
     * Display the browse courses page with all available courses.
     */
    public function browse()
    {
        $user = Auth::user();
        
        // Fetch all active courses with their modules and lessons
        $courses = Course::with(['modules.lessons'])
            ->active()
            ->ordered()
            ->get();
        
        // Get user's enrolled course IDs
        $enrolledCourseIds = $user->enrolledCourses()
            ->wherePivot('status', '!=', 'dropped')
            ->pluck('courses.id')
            ->toArray();
        
        // Get categories from all courses
        $categories = Course::select('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->map(function ($category) {
                return [
                    'id' => strtolower(str_replace(' ', '-', $category)),
                    'name' => $category,
                    'icon' => $this->getCategoryIcon($category)
                ];
            })
            ->prepend(['id' => 'all', 'name' => 'All Topics', 'icon' => '📚'])
            ->values();
        
        return Inertia::render('user/learn/browse', [
            'user' => $user,
            'courses' => $courses,
            'categories' => $categories,
            'enrolledCourseIds' => $enrolledCourseIds
        ]);
    }
    
    /**
     * Display a specific course with its modules.
     */
    public function showCourse($id)
    {
        $user = Auth::user();
        
        $course = Course::with(['modules.lessons'])
            ->active()
            ->findOrFail($id);
        
        $modules = $course->modules;
        
        return Inertia::render('user/learn/course', [
            'user' => $user,
            'course' => $course,
            'modules' => $modules
        ]);
    }
    
    /**
     * Legacy show method - redirects to showModule for backward compatibility.
     */
    public function show($id)
    {
        return $this->showModule($id);
    }
    
    /**
     * Display a specific module with its lessons.
     */
    public function showModule($id)
    {
        $user = Auth::user();
        
        $module = Module::with(['course', 'lessons'])
            ->active()
            ->findOrFail($id);
        
        return Inertia::render('user/learn/module', [
            'user' => $user,
            'module' => $module
        ]);
    }
    
    /**
     * Display a specific lesson.
     */
    public function lesson($moduleId, $lessonId)
    {
        $user = Auth::user();
        
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $moduleId)
            ->findOrFail($lessonId);
        
        return Inertia::render('user/learn/lesson', [
            'user' => $user,
            'module' => $module,
            'lesson' => $lesson
        ]);
    }
    
    /**
     * Enroll user in a course.
     */
    public function enroll(Request $request, $courseId)
    {
        $user = Auth::user();
        
        // Check if user is already enrolled
        $existingEnrollment = $user->enrolledCourses()
            ->wherePivot('course_id', $courseId)
            ->wherePivot('status', '!=', 'dropped')
            ->first();
            
        if ($existingEnrollment) {
            return redirect()->back()->with('error', 'You are already enrolled in this course.');
        }
        
        // Create new enrollment
        $user->enrolledCourses()->attach($courseId, [
            'status' => 'enrolled',
            'enrolled_at' => now(),
            'progress_percentage' => 0
        ]);
        
        return redirect()->back()->with('success', 'Successfully enrolled in the course!');
    }
    /**
     * Get icon for category.
     */
    private function getCategoryIcon($category)
    {
        $icons = [
            'Sexual Health' => '❤️',
            'Family Planning' => '👶',
            'Relationships' => '💕',
            'Gender Equality' => '⚖️',
            'Mental Health' => '🧠',
            'Reproductive Rights' => '✊',
            'Contraception' => '💊',
            'Pregnancy' => '🤱',
            'STI Prevention' => '🛡️',
            'Consent' => '🤝'
        ];
        
        return $icons[$category] ?? '📚';
    }
}