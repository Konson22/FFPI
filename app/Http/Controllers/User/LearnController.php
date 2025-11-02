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

        // Fetch enrollments for this user - get first enrolled module only
        $firstEnrollment = ModuleEnrollment::where('user_id', $user->id)
            ->orderBy('created_at')
            ->first();
        
        $enrolledCourseIds = $firstEnrollment ? [$firstEnrollment->module_id] : [];
        $canEnrollMore = !$firstEnrollment; // Can enroll if no enrollment exists
        
        // Build enrolledCourse with progress calculated from lesson_scores - only first module
        $enrolledCourse = null;
        if ($firstEnrollment) {
            $module = $modules->firstWhere('id', $firstEnrollment->module_id);
            
            if ($module) {
                // Get lesson scores for this module
                $lessonScores = LessonScore::where('user_id', $user->id)
                    ->where('module_id', $module->id)
                    ->get();
                
                // Calculate completed lessons (where completed_at is not null)
                $completedLessons = $lessonScores->whereNotNull('completed_at')->count();
                $totalLessons = $module->lessons->where('is_active', true)->count();
                
                // Calculate progress percentage based on completed lessons
                $progressPercentage = $totalLessons > 0 
                    ? (int)round(($completedLessons / $totalLessons) * 100) 
                    : 0;
                
                // Determine status based on progress
                $status = $firstEnrollment->status;
                if ($progressPercentage === 100 && $totalLessons > 0) {
                    $status = 'completed';
                    $canEnrollMore = true; // Can enroll in next module if first is completed
                } elseif ($progressPercentage > 0 && $status !== 'completed') {
                    $status = 'started';
                    $canEnrollMore = false; // Cannot enroll until first is completed
                } else {
                    $canEnrollMore = false; // Cannot enroll if not started or completed
                }
                
                // Update enrollment progress if it has changed
                if ($firstEnrollment->progress_percentage != $progressPercentage || $firstEnrollment->status != $status) {
                    $firstEnrollment->update([
                        'progress_percentage' => $progressPercentage,
                        'status' => $status,
                    ]);
                }
                
                $enrolledCourse = [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'difficulty_level' => $module->difficulty_level ?? 'Beginner',
                    'duration' => $module->duration ?? null,
                    'icon' => '📚',
                    'modules' => [ [ 'lessons' => $module->lessons->where('is_active', true)->map(function ($l) use ($lessonScores) {
                        $lessonScore = $lessonScores->firstWhere('lesson_id', $l->id);
                        return [
                            'id' => $l->id,
                            'title' => $l->title,
                            'objective' => $l->objective,
                            'pdf_url' => $l->pdf_url,
                            'video_url' => $l->video_url,
                            'order' => $l->order,
                            'is_active' => (bool)$l->is_active,
                            'is_completed' => $lessonScore && $lessonScore->completed_at !== null,
                            'quiz_score' => $lessonScore ? (int)$lessonScore->quiz_score : null,
                        ]; })->values()->sortBy('order') ] ],
                    'pivot' => [
                        'status' => $status,
                        'progress_percentage' => $progressPercentage,
                    ],
                    'target_audience' => [],
                ];
            }
        }

        return Inertia::render('user/learn/index', [
            'user' => $user,
            'enrolledCourse' => $enrolledCourse,
            'availableCourses' => $courses,
            'enrolledCourseIds' => $enrolledCourseIds,
            'canEnrollMore' => $canEnrollMore,
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
     * Redirect GET requests from /complete route to quiz page.
     * This prevents "GET method not supported" errors.
     */
    public function redirectFromComplete($moduleId, $lessonId)
    {
        return redirect()->route('user.learn.lesson.quiz', [
            'moduleId' => $moduleId,
            'lessonId' => $lessonId,
        ]);
    }

    /**
     * Show the quiz page for a specific lesson.
     */
    public function quiz(Request $request, $moduleId, $lessonId)
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

        // Retrieve quiz result from session if available (after submission)
        $quizResult = $request->session()->pull('quiz_result');

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
            'quizResult' => $quizResult,
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
        $passMark = 75; // Changed to 75%
        $passed = $score >= $passMark;

        // Always save the score to lesson_scores regardless of pass/fail
        // Mark lesson as completed if score >= 75%
        $lessonScore = LessonScore::updateOrCreate(
            [
                'user_id' => $user->id,
                'module_id' => $module->id,
                'lesson_id' => $lesson->id,
            ],
            [
                'quiz_score' => $score,
                'completed_at' => $passed ? now() : null,
            ]
        );

        // Find next lesson if lesson is completed
        $nextLesson = null;
        if ($passed) {
            $nextLesson = Lesson::where('module_id', $module->id)
                ->where(function ($q) use ($lesson) {
                    $q->where('order', '>', $lesson->order)
                      ->orWhere(function ($q2) use ($lesson) {
                          $q2->where('order', $lesson->order)->where('id', '>', $lesson->id);
                      });
                })
                ->orderBy('order')
                ->orderBy('id')
                ->first();
        }

        // Prepare quiz result data
        $quizResult = [
            'score' => $score,
            'totalQuestions' => $numQuestions,
            'correctAnswers' => $numCorrect,
            'passed' => $passed,
            'passMark' => $passMark,
            'nextLesson' => $nextLesson ? [
                'id' => $nextLesson->id,
                'title' => $nextLesson->title,
            ] : null,
        ];

        // Store quiz result in session for retrieval on redirect
        $request->session()->put('quiz_result', $quizResult);

        // Redirect to quiz page (GET route) which will display the results
        // This prevents GET request errors on refresh
        if ($request->header('X-Inertia')) {
            return redirect()->route('user.learn.lesson.quiz', [
                'moduleId' => $module->id,
                'lessonId' => $lesson->id,
            ]);
        }

        // Fallback for non-Inertia requests
        if (!$passed) {
            return redirect()->route('user.learn.lesson', ['moduleId' => $module->id, 'lessonId' => $lesson->id])
                ->with('error', "Quiz not passed. Score: {$score}%. Need {$passMark}%.");
        }

        // Redirect to next lesson if available, otherwise back to module
        if ($nextLesson) {
            return redirect()->route('user.learn.lesson', ['moduleId' => $module->id, 'lessonId' => $nextLesson->id])
                ->with('success', "Great job! You scored {$score}% and completed this lesson. Moving to next lesson...");
        }

        return redirect()->route('user.learn.module', ['id' => $module->id])
            ->with('success', "Great job! You scored {$score}% and completed this lesson.");
    }
    
    /**
     * Enroll user in a module. User must complete first module before enrolling in another.
     */
    public function enroll(Request $request, $id)
    {
        $user = Auth::user();
        
        // Check if user already has an enrollment
        $firstEnrollment = ModuleEnrollment::where('user_id', $user->id)
            ->orderBy('created_at')
            ->first();
        
        if ($firstEnrollment) {
            // Check if first module is completed
            $firstModule = Module::find($firstEnrollment->module_id);
            if ($firstModule) {
                $lessonScores = LessonScore::where('user_id', $user->id)
                    ->where('module_id', $firstModule->id)
                    ->get();
                
                $completedLessons = $lessonScores->whereNotNull('completed_at')->count();
                $totalLessons = $firstModule->lessons->where('is_active', true)->count();
                $progressPercentage = $totalLessons > 0 
                    ? (int)round(($completedLessons / $totalLessons) * 100) 
                    : 0;
                
                // If first module is not 100% completed, prevent enrollment
                if ($progressPercentage < 100) {
                    return redirect()->back()
                        ->with('error', 'Please complete your current module before enrolling in a new one.');
                }
            }
        }

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