<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\LessonScore;
use App\Models\ModuleEnrollment;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;

class LearnController extends Controller
{

    /**
     * Display the learn hub page with enrolled courses and available courses.
     */
    public function index()
    {
        $user = Auth::user();

        // Get all available modules with lessons
        $modules = Module::active()
            ->with(['lessons' => function ($q) {
                $q->orderBy('order')->orderBy('id');
            }])
            ->ordered()
            ->get();

        // Map modules to the legacy "course" shape expected by the frontend
        $courses = $modules->map(function ($m) {
            return [
                'id' => $m->id,
                'title' => $m->title,
                'description' => $m->description,
                'category' => $m->category ?? 'family-planning',
                'difficulty_level' => $m->difficulty_level ?? 'Beginner',
                'duration' => $m->duration ?? null,
                'icon' => '📚',
                // Emulate nested modules with lessons so existing UI counters work
                'modules' => [
                    [ 'lessons' => $m->lessons->map(function ($l) { return [
                        'id' => $l->id,
                        'title' => $l->title,
                        'objective' => $l->objective,
                        'pdf_url' => $l->pdf_url,
                        'video_url' => $l->video_url,
                        'order' => $l->order,
                        'is_active' => (bool)$l->is_active,
                    ]; })->values() ]
                ],
                // Enrollment pivot placeholders (not implemented)
                'pivot' => null,
                'target_audience' => [],
            ];
        });

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

        // Fetch enrollments for this user
        $enrollments = ModuleEnrollment::where('user_id', $user->id)->get()->keyBy('module_id');
        $enrolledCourseIds = $enrollments->keys()->all();

        // Build enrolledCourses with minimal pivot data to satisfy UI
        $enrolledCourses = $modules->filter(function ($m) use ($enrollments) {
            return $enrollments->has($m->id);
        })->map(function ($m) use ($enrollments) {
            $pivot = $enrollments[$m->id];
            return [
                'id' => $m->id,
                'title' => $m->title,
                'description' => $m->description,
                'category' => $m->category ?? 'family-planning',
                'difficulty_level' => $m->difficulty_level ?? 'Beginner',
                'duration' => $m->duration ?? null,
                'icon' => '📚',
                'modules' => [ [ 'lessons' => $m->lessons->map(function ($l) { return [
                    'id' => $l->id,
                    'title' => $l->title,
                    'objective' => $l->objective,
                    'pdf_url' => $l->pdf_url,
                    'video_url' => $l->video_url,
                    'order' => $l->order,
                    'is_active' => (bool)$l->is_active,
                ]; })->values() ] ],
                'pivot' => [
                    'status' => $pivot->status,
                    'progress_percentage' => (int)$pivot->progress_percentage,
                ],
                'target_audience' => [],
            ];
        })->values();

        return Inertia::render('user/learn/index', [
            'user' => $user,
            // Frontend expects these keys
            'enrolledCourses' => $enrolledCourses,
            'availableCourses' => $courses,
            'categories' => $categories,
            'enrolledCourseIds' => $enrolledCourseIds,
        ]);
    }

    /**
     * Display the browse modules page with all available modules.
     */
    public function browse()
    {
        $user = Auth::user();
        
        // Fetch all active modules with lessons
        $modules = Module::active()
            ->with(['lessons' => function ($q) {
                $q->orderBy('order')->orderBy('id');
            }])
            ->ordered()
            ->get();
        
        // Get categories from modules
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
        
        // Map to legacy course shape used by browse.jsx
        $courses = $modules->map(function ($m) {
            return [
                'id' => $m->id,
                'title' => $m->title,
                'description' => $m->description,
                'category' => $m->category ?? 'family-planning',
                'difficulty_level' => $m->difficulty_level ?? 'Beginner',
                'duration' => $m->duration ?? null,
                'icon' => '📚',
                'modules' => [
                    [ 'lessons' => $m->lessons->map(function ($l) { return [
                        'id' => $l->id,
                        'title' => $l->title,
                        'objective' => $l->objective,
                        'pdf_url' => $l->pdf_url,
                        'video_url' => $l->video_url,
                        'order' => $l->order,
                        'is_active' => (bool)$l->is_active,
                    ]; })->values() ]
                ],
            ];
        });
        
        // Enrolled ids for badges and button state
        $enrolledIds = ModuleEnrollment::where('user_id', $user->id)->pluck('module_id')->toArray();

        return Inertia::render('user/learn/browse', [
            'user' => $user,
            'courses' => $courses,
            'categories' => $categories,
            'enrolledCourseIds' => $enrolledIds,
        ]);
    }
    
    /**
     * Display a specific module (legacy route - redirects to showModule).
     */
    public function showCourse($id)
    {
        return $this->showModule($id);
    }
    
    /**
     * Legacy show method - redirects to showModule for backward compatibility.
     */
    public function show($id)
    {
        return $this->showModule($id);
    }
    
    /**
     * Display a specific module.
     */
    public function showModule($id)
    {
        $user = Auth::user();
        
        $module = Module::active()
            ->with(['lessons' => function ($q) {
                $q->orderBy('order')->orderBy('id');
            }])
            ->findOrFail($id);

        // Compute progression: first lesson unlocked; others unlocked if previous completed
        $completedLessonIds = LessonScore::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->whereNotNull('completed_at')
            ->pluck('lesson_id')
            ->toArray();

        $lessons = $module->lessons->values();
        $progression = [];
        foreach ($lessons as $index => $lesson) {
            $isCompleted = in_array($lesson->id, $completedLessonIds, true);
            $isFirst = $index === 0;
            $prevCompleted = $isFirst ? true : in_array($lessons[$index - 1]->id, $completedLessonIds, true);
            $isLocked = !$isFirst && !$prevCompleted;
            $progression[$lesson->id] = [
                'locked' => $isLocked,
                'completed' => $isCompleted,
            ];
        }
        
        return Inertia::render('user/learn/module', [
            'user' => $user,
            'module' => $module,
            'progression' => $progression,
        ]);
    }

    /**
     * Render a specific lesson inside a module.
     */
    public function lesson($moduleId, $lessonId)
    {
        $user = Auth::user();

        $module = Module::active()->findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $module->id)
            ->with(['quizzes'])
            ->findOrFail($lessonId);

        // Enforce gating: allow access only if first lesson or previous is completed
        $previousLesson = Lesson::where('module_id', $module->id)
            ->where(function ($q) use ($lesson) {
                $q->where('order', '<', $lesson->order)
                  ->orWhere(function ($q2) use ($lesson) { $q2->where('order', $lesson->order)->where('id', '<', $lesson->id); });
            })
            ->orderBy('order', 'desc')->orderBy('id', 'desc')
            ->first();

        if ($previousLesson) {
            $prevCompleted = LessonScore::where('user_id', $user->id)
                ->where('module_id', $module->id)
                ->where('lesson_id', $previousLesson->id)
                ->whereNotNull('completed_at')
                ->exists();
            if (!$prevCompleted) {
                return redirect()->route('user.learn.module', ['id' => $module->id])
                    ->with('error', 'Please complete the previous lesson first.');
            }
        }

        return Inertia::render('user/learn/Lesson', [
            'user' => $user,
            'courseId' => $module->id,
            'lessonId' => $lesson->id,
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'objective' => $lesson->objective,
                'content' => $lesson->content,
                'pdf_url' => $lesson->pdf_url,
                'video_url' => $lesson->video_url,
            ],
            'quizzes' => $lesson->quizzes->map(function ($q) {
                return [
                    'id' => $q->id,
                    'question' => $q->question,
                    'type' => $q->type ?? 'single_choice',
                    'options' => $q->options ?? [],
                    'explanation' => $q->explanation,
                ];
            }),
        ]);
    }

    /**
     * Show the quiz page for a specific lesson.
     */
    public function quiz($moduleId, $lessonId)
    {
        $user = Auth::user();

        $module = Module::active()->findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $module->id)
            ->with(['quizzes'])
            ->findOrFail($lessonId);

        // Check if lesson has quizzes
        if ($lesson->quizzes->isEmpty()) {
            return redirect()->route('user.learn.lesson', ['moduleId' => $module->id, 'lessonId' => $lesson->id])
                ->with('error', 'No quiz available for this lesson.');
        }

        return Inertia::render('user/learn/Quiz', [
            'user' => $user,
            'module' => [
                'id' => $module->id,
                'title' => $module->title,
            ],
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
            ],
            'quizzes' => $lesson->quizzes->map(function ($q) {
                return [
                    'id' => $q->id,
                    'question' => $q->question,
                    'type' => $q->type ?? 'single_choice',
                    'options' => $q->options ?? [],
                    'explanation' => $q->explanation,
                ];
            }),
        ]);
    }

    /**
     * Mark a lesson as completed for the current user.
     */
    public function completeLesson(Request $request, $moduleId, $lessonId)
    {
        $user = Auth::user();

        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $module->id)
            ->with('quizzes')
            ->findOrFail($lessonId);

        $data = $request->validate([
            'answers' => 'required|array',
            'answers.*.quiz_id' => 'required|integer|exists:quizzes,id',
            'answers.*.answer' => 'nullable', // Can be string or array
        ]);

        // Grade on server
        $quizList = $lesson->quizzes->keyBy('id');
        $numQuestions = max(1, $quizList->count());
        $numCorrect = 0;
        foreach ($data['answers'] as $answer) {
            $quizId = (int)($answer['quiz_id'] ?? 0);
            if (!$quizList->has($quizId)) {
                continue;
            }
            
            $quiz = $quizList[$quizId];
            $userAnswer = $answer['answer'] ?? null;
            
            if ($userAnswer === null || $userAnswer === '') {
                continue;
            }

            // Handle multiple choice format (has options and correct_answers)
            if (!empty($quiz->options) && !empty($quiz->correct_answers)) {
                // Normalize user answer to array
                $userAnswers = is_array($userAnswer) 
                    ? array_map('trim', array_map('mb_strtolower', $userAnswer))
                    : [trim(mb_strtolower((string)$userAnswer))];
                
                // Normalize correct answers
                $correctAnswers = array_map('trim', array_map('mb_strtolower', $quiz->correct_answers));
                
                // Sort both arrays for comparison
                sort($userAnswers);
                sort($correctAnswers);
                
                // Check if answers match
                if ($userAnswers === $correctAnswers) {
                    $numCorrect++;
                }
            } 
            // Fallback to old format (correct_answer)
            elseif (!empty($quiz->correct_answer)) {
                $userAnswerStr = is_array($userAnswer) 
                    ? trim(mb_strtolower($userAnswer[0] ?? ''))
                    : trim(mb_strtolower((string)$userAnswer));
                
                $correct = trim(mb_strtolower((string)$quiz->correct_answer));
                
                if ($correct !== '' && $userAnswerStr !== '' && $userAnswerStr === $correct) {
                    $numCorrect++;
                }
            }
        }
        $score = (int)round(($numCorrect / $numQuestions) * 100);
        $passMark = 70;

        if ($score < $passMark) {
            return redirect()->route('user.learn.lesson', ['moduleId' => $module->id, 'lessonId' => $lesson->id])
                ->with('error', "Quiz not passed. Score: {$score}%. Need {$passMark}%.");
        }

        LessonScore::updateOrCreate(
            [
                'user_id' => $user->id,
                'module_id' => $module->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'quiz_score' => $score,
                'completed_at' => now(),
            ]
        );

        return redirect()->route('user.learn.module', ['id' => $module->id])
            ->with('success', "Great job! You scored {$score}% and unlocked the next lesson.");
    }
    
    /**
     * Enroll user in a module (if enrollment feature is needed).
     * Currently disabled as courses are removed.
     */
    public function enroll(Request $request, $id)
    {
        $user = Auth::user();
        $module = Module::active()->findOrFail($id);

        $enrollment = ModuleEnrollment::updateOrCreate(
            [
                'user_id' => $user->id,
                'module_id' => $module->id,
            ],
            [
                'status' => 'enrolled',
                'started_at' => now(),
            ]
        );

        // For Inertia requests, redirect back so onSuccess handlers can run
        return redirect()->back()->with('success', 'Enrolled successfully.');
    }

}