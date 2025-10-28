<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\User;
use App\Services\Moodle\MoodleLmsAdapter;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class LearnController extends Controller
{
    protected $moodleAdapter;

    public function __construct(MoodleLmsAdapter $moodleAdapter)
    {
        $this->moodleAdapter = $moodleAdapter;
    }

    /**
     * Display the learn hub page with enrolled courses and available courses.
     */
    public function index()
    {
        $user = Auth::user();

        $hasCourseIdOnModules = Schema::hasTable('modules') && Schema::hasColumn('modules', 'course_id');

        // Enrolled courses
        $enrolledQuery = $user->enrolledCourses()->wherePivot('status', '!=', 'dropped');
        if ($hasCourseIdOnModules) {
            $enrolledQuery->with(['modules.lessons']);
        }
        $enrolledCourses = $enrolledQuery->get();
        if (!$hasCourseIdOnModules) {
            foreach ($enrolledCourses as $course) {
                $course->setRelation('modules', collect([]));
            }
        }

        // Available courses
        $availableQuery = Course::active()->whereNotIn('id', $enrolledCourses->pluck('id'));
        if ($hasCourseIdOnModules) {
            $availableQuery->with(['modules.lessons']);
        }
        $availableCourses = $availableQuery->get();
        if (!$hasCourseIdOnModules) {
            foreach ($availableCourses as $course) {
                $course->setRelation('modules', collect([]));
            }
        }

        // Moodle courses (optional)
        $moodleCourses = collect([]);
        $moodleEnabled = config('lms.adapter') === 'moodle' && config('lms.enabled');
        if ($moodleEnabled) {
            try {
                $moodleQuery = Course::whereNotNull('moodle_id')->active();
                if ($hasCourseIdOnModules) {
                    $moodleQuery->with(['modules.lessons']);
                }
                $moodleCourses = $moodleQuery->get()->map(function ($course) use ($user, $hasCourseIdOnModules) {
                    $enrollment = $user->enrolledCourses()->wherePivot('course_id', $course->id)->first();
                    if (!$hasCourseIdOnModules) {
                        $course->setRelation('modules', collect([]));
                    }
                    return [
                        'id' => $course->id,
                        'title' => $course->title,
                        'description' => $course->description,
                        'category' => $course->category,
                        'moodle_id' => $course->moodle_id,
                        'is_moodle' => true,
                        'is_enrolled' => $enrollment ? true : false,
                        'enrollment_status' => $enrollment ? $enrollment->pivot->status : null,
                        'progress_percentage' => $enrollment ? $enrollment->pivot->progress_percentage : 0,
                        'moodle_url' => $this->moodleAdapter->getCourseUrl($course->id),
                        'modules' => $course->modules,
                        'modules_count' => $course->modules->count(),
                        'lessons_count' => $course->modules->sum(function ($module) {
                            return $module->lessons->count();
                        })
                    ];
                });
            } catch (\Exception $e) {
                \Log::warning('Failed to load Moodle courses', ['error' => $e->getMessage()]);
            }
        }

        $categories = collect([
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
        ]);

        return Inertia::render('user/learn/index', [
            'user' => $user,
            'enrolledCourses' => $enrolledCourses,
            'availableCourses' => $availableCourses,
            'moodleCourses' => $moodleCourses,
            'categories' => $categories,
            'enrolledCourseIds' => $enrolledCourses->pluck('id')->toArray(),
            'moodleEnabled' => $moodleEnabled,
            'lmsAdapter' => config('lms.adapter')
        ]);
    }

    /**
     * Display the browse courses page with all available courses.
     */
    public function browse()
    {
        $user = Auth::user();
        
        // Fetch all active courses (without modules for now - course_id column doesn't exist)
        $courses = Course::active()->ordered()->get();
        
        // Add empty modules array to prevent errors
        foreach ($courses as $course) {
            $course->modules = collect([]);
        }
        
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
        
        // Don't eager load modules for now - course_id column doesn't exist yet
        $course = Course::active()->findOrFail($id);
        
        // Manually set empty modules array
        $course->modules = collect([]);
        
        return Inertia::render('user/learn/course', [
            'user' => $user,
            'course' => $course,
            'modules' => collect([])
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
     * Display Moodle course player
     */
    public function moodleCourse($id)
    {
        try {
            $user = Auth::user();
            $course = Course::whereNotNull('moodle_id')->findOrFail($id);

            return Inertia::render('user/learn/MoodleCoursePlayer', [
                'user' => $user,
                'courseId' => $course->id
            ]);
        } catch (\Exception $e) {
            return redirect()->route('user.learn')->with('error', 'Course not found or not available in Moodle');
        }
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