<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\LessonScore;
use App\Models\LessonQuiz;
use App\Models\ModuleEnrollment;
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
                $q->orderBy('id');
            }])
            ->ordered()
            ->get();

        // Map modules to the legacy "course" shape expected by the frontend
        $courses = $modules->map(function ($m) {
            $lessons = $m->lessons->values()->map(function ($l, $index) {
                return [
                    'id' => $l->id,
                    'title' => $l->title,
                    'objective' => null,
                    'content_markdown' => $l->content_markdown,
                    'content_html' => $l->content_html,
                    'pdf_url' => $l->pdf_url,
                    'video_url' => $l->video_url,
                    'order' => $index + 1,
                    'is_active' => true,
                ];
            })->values();

            return [
                'id' => $m->id,
                'title' => $m->title,
                'description' => $m->description,
                'difficulty_level' => $m->difficulty_level ?? 'Beginner',
                'duration' => $m->duration ?? null,
                'icon' => '📚',
                // Emulate nested modules with lessons so existing UI counters work
                'modules' => [
                    ['lessons' => $lessons],
                ],
                // Enrollment pivot placeholders (not implemented)
                'pivot' => null,
                'target_audience' => [],
            ];
        });

        // Fetch all enrollments for this user
        $enrollments = ModuleEnrollment::where('user_id', $user->id)
            ->orderBy('created_at')
            ->get();
        
        $enrolledCourseIds = $enrollments->pluck('module_id')->toArray();
        $canEnrollMore = true; // Users can always enroll in more modules
        
        // Build enrolled courses with progress calculated from lesson_scores
        $enrolledCourses = [];
        foreach ($enrollments as $enrollment) {
            $module = $modules->firstWhere('id', $enrollment->module_id);
            
            if ($module) {
                // Get lesson scores for this module
                $lessonScores = LessonScore::where('user_id', $user->id)
                    ->where('module_id', $module->id)
                    ->get();
                
                // Calculate completed lessons (where percentage >= 75%)
                $completedLessons = $lessonScores->where('percentage', '>=', 75)->count();
                $totalLessons = $module->lessons->count();
                
                // Calculate progress percentage based on completed lessons
                $progressPercentage = $totalLessons > 0 
                    ? (int)round(($completedLessons / $totalLessons) * 100) 
                    : 0;
                
                // Determine status based on progress
                $status = $enrollment->status;
                if ($progressPercentage === 100 && $totalLessons > 0) {
                    $status = 'completed';
                } elseif ($progressPercentage > 0 && $status !== 'completed') {
                    $status = 'started';
                }
                
                // Update enrollment progress if it has changed
                if ($enrollment->progress_percentage != $progressPercentage || $enrollment->status != $status) {
                    $enrollment->update([
                        'progress_percentage' => $progressPercentage,
                        'status' => $status,
                    ]);
                }
                
                $enrolledCourses[] = [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'difficulty_level' => $module->difficulty_level ?? 'Beginner',
                    'duration' => $module->duration ?? null,
                    'icon' => '📚',
                    'modules' => [[
                        'lessons' => $module->lessons->values()->map(function ($l, $index) use ($lessonScores) {
                            $lessonScore = $lessonScores->firstWhere('lesson_id', $l->id);
                            return [
                                'id' => $l->id,
                                'title' => $l->title,
                                'objective' => null,
                                'content_markdown' => $l->content_markdown,
                                'content_html' => $l->content_html,
                                'pdf_url' => $l->pdf_url,
                                'video_url' => $l->video_url,
                                'order' => $index + 1,
                                'is_active' => true,
                                'is_completed' => $lessonScore && $lessonScore->percentage >= 75,
                                'quiz_score' => $lessonScore ? (int) round($lessonScore->percentage) : null,
                            ];
                        })->values()
                    ]],
                    'pivot' => [
                        'status' => $status,
                        'progress_percentage' => $progressPercentage,
                    ],
                    'target_audience' => [],
                ];
            }
        }
        
        // For backward compatibility, keep enrolledCourse as first enrolled course or null
        $enrolledCourse = !empty($enrolledCourses) ? $enrolledCourses[0] : null;

        return Inertia::render('user/learn/index', [
            'user' => $user,
            'enrolledCourse' => $enrolledCourse,
            'enrolledCourses' => $enrolledCourses, // All enrolled courses
            'availableCourses' => $courses,
            'enrolledCourseIds' => $enrolledCourseIds,
            'canEnrollMore' => $canEnrollMore,
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
                $q->orderBy('id');
            }])
            ->findOrFail($id);

        // Compute progression: first lesson unlocked; others unlocked if previous completed
        $completedLessonIds = LessonScore::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->where('percentage', '>=', 75)
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
            ->findOrFail($lessonId);

        // Enforce gating: allow access only if first lesson or previous is completed
        $previousLesson = Lesson::where('module_id', $module->id)
            ->where('id', '<', $lesson->id)
            ->orderBy('id', 'desc')
            ->first();

        if ($previousLesson) {
            $prevCompleted = LessonScore::where('user_id', $user->id)
                ->where('module_id', $module->id)
                ->where('lesson_id', $previousLesson->id)
                ->where('percentage', '>=', 75)
                ->exists();
            if (!$prevCompleted) {
                return redirect()->route('user.learn.module', ['id' => $module->id])
                    ->with('error', 'Please complete the previous lesson first.');
            }
        }

        return Inertia::render('user/learn/Lesson', [
            'user' => $user,
            'moduleId' => $module->id,
            'lessonId' => $lesson->id,
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'content_markdown' => $lesson->content_markdown,
                'content_html' => $lesson->content_html,
                'video_url' => $lesson->video_url,
                'pdf_url' => $lesson->pdf_url,
            ],
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
     * Now uses AI-generated quizzes instead of database quizzes.
     */
    public function quiz(Request $request, $moduleId, $lessonId)
    {
        $user = Auth::user();

        $module = Module::active()->findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $module->id)->findOrFail($lessonId);

        // Enforce gating: allow access only if first lesson or previous is completed
        $previousLesson = Lesson::where('module_id', $module->id)
            ->where('id', '<', $lesson->id)
            ->orderBy('id', 'desc')
            ->first();

        if ($previousLesson) {
            $prevCompleted = LessonScore::where('user_id', $user->id)
                ->where('module_id', $module->id)
                ->where('lesson_id', $previousLesson->id)
                ->where('percentage', '>=', 75)
                ->exists();
            if (!$prevCompleted) {
                return redirect()->route('user.learn.module', ['id' => $module->id])
                    ->with('error', 'Please complete the previous lesson first.');
            }
        }

        // Prepare lesson data for frontend quiz generation
        $category = $module->category ?? $lesson->title;
        $lessonContent = $lesson->content_markdown ?? $lesson->title;

        // Retrieve quiz result from session if available (after submission)
        $quizResult = $request->session()->pull('quiz_result');

        // Fetch quiz questions from database (randomized, max 10)
        $quizzes = LessonQuiz::where('lesson_id', $lesson->id)
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->map(function ($quiz) {
                // Transform database format to frontend format
                $options = [];
                $correctAnswers = [];
                $correctAnswer = null;

                if (is_array($quiz->options)) {
                    foreach ($quiz->options as $option) {
                        if (is_array($option) && isset($option['text'])) {
                            $options[] = $option['text'];
                            if (isset($option['is_correct']) && $option['is_correct']) {
                                $correctAnswers[] = $option['text'];
                                if ($quiz->type === 'multiple_choice' || $quiz->type === 'true_false') {
                                    $correctAnswer = $option['text'];
                                }
                            }
                        } elseif (is_string($option)) {
                            // Fallback: if options is just an array of strings
                            $options[] = $option;
                        }
                    }
                }

                return [
                    'id' => $quiz->id,
                    'question' => $quiz->question,
                    'type' => $quiz->type ?? 'multiple_choice',
                    'options' => $options,
                    'correct_answer' => $correctAnswer,
                    'correct_answers' => $correctAnswers,
                    'explanation' => $quiz->explanation,
                    'points' => $quiz->points ?? 1,
                ];
            });

        return Inertia::render('user/learn/Quiz', [
            'user' => $user,
            'module' => [
                'id' => $module->id,
                'title' => $module->title,
            ],
            'lesson' => [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'content' => $lessonContent,
            ],
            'category' => $category,
            'quizResult' => $quizResult,
            'quizzes' => $quizzes,
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
            ->findOrFail($lessonId);

        $data = $request->validate([
            'answers' => 'required|array',
            'answers.*.quiz_id' => 'required|integer',
            'answers.*.answer' => 'nullable', // Can be string or array
            'quizzes' => 'nullable|array', // Quizzes with correct answers from frontend
            'quizzes.*.id' => 'required|integer',
            'quizzes.*.correct_answer' => 'nullable|string',
            'quizzes.*.correct_answers' => 'nullable|array',
        ]);

        // Grade on server against quizzes sent from frontend, or fallback to session
        $quizList = collect();
        if (isset($data['quizzes']) && is_array($data['quizzes']) && !empty($data['quizzes'])) {
            // Use quizzes from frontend request
            $quizList = collect($data['quizzes'])->keyBy('id');
        } else {
            // Fallback to session (for backward compatibility)
            $sessionKey = "ai_quizzes_{$module->id}_{$lesson->id}";
            $quizArray = $request->session()->get($sessionKey, []);
            $quizList = collect($quizArray)->keyBy('id');
        }
        $numQuestions = max(1, $quizList->count());
        $numCorrect = 0;
        foreach ($data['answers'] as $answer) {
            $quizId = (int)($answer['quiz_id'] ?? 0);
            if (!$quizList->has($quizId)) {
                continue;
            }
            
            $quiz = (object)$quizList[$quizId];
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
                $correctAnswers = array_map('trim', array_map('mb_strtolower', (array)$quiz->correct_answers));
                
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
                'total_points' => $numQuestions,
                'percentage' => $score,
            ]
        );

        // Find next lesson if lesson is completed
        $nextLesson = null;
        if ($passed) {
            $nextLesson = Lesson::where('module_id', $module->id)
                ->where('id', '>', $lesson->id)
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
     * Enroll user in a module.
     */
    public function enroll(Request $request, $id)
    {
        $user = Auth::user();

        $module = Module::active()->findOrFail($id);

        // Check if user is already enrolled in this module
        $existingEnrollment = ModuleEnrollment::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        if ($existingEnrollment) {
            return redirect()->back()->with('info', 'You are already enrolled in this module.');
        }

        $enrollment = ModuleEnrollment::create([
            'user_id' => $user->id,
            'module_id' => $module->id,
            'status' => 'enrolled',
            'started_at' => now(),
            'progress_percentage' => 0,
        ]);

        // For Inertia requests, redirect back so onSuccess handlers can run
        return redirect()->back()->with('success', 'Enrolled successfully.');
    }

    /**
     * Get random quiz questions for a lesson from database
     */
    public function getQuizQuestions(Request $request, $moduleId, $lessonId)
    {
        $user = Auth::user();

        $module = Module::active()->findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $module->id)->findOrFail($lessonId);

        // Get all quiz questions for this lesson
        $quizzes = LessonQuiz::where('lesson_id', $lesson->id)
            ->inRandomOrder()
            ->limit(10)
            ->get()
            ->map(function ($quiz) {
                // Transform database format to frontend format
                $options = [];
                $correctAnswers = [];
                $correctAnswer = null;

                if (is_array($quiz->options)) {
                    foreach ($quiz->options as $option) {
                        if (is_array($option) && isset($option['text'])) {
                            $options[] = $option['text'];
                            if (isset($option['is_correct']) && $option['is_correct']) {
                                $correctAnswers[] = $option['text'];
                                if ($quiz->type === 'multiple_choice' || $quiz->type === 'true_false') {
                                    $correctAnswer = $option['text'];
                                }
                            }
                        } elseif (is_string($option)) {
                            // Fallback: if options is just an array of strings
                            $options[] = $option;
                        }
                    }
                }

                return [
                    'id' => $quiz->id,
                    'question' => $quiz->question,
                    'type' => $quiz->type ?? 'multiple_choice',
                    'options' => $options,
                    'correct_answer' => $correctAnswer,
                    'correct_answers' => $correctAnswers,
                    'explanation' => $quiz->explanation,
                    'points' => $quiz->points ?? 1,
                ];
            });

        return response()->json([
            'success' => true,
            'quizzes' => $quizzes,
        ]);
    }

}