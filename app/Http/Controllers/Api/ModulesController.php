<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\LessonQuiz;
use App\Models\ModuleEnrollment;
use App\Models\LessonScore;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Models\User;

class ModulesController extends Controller
{
    /**
     * Get all enrolled modules with progress summary.
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get enrollments for quick lookup
        $enrollments = ModuleEnrollment::where('user_id', $user->id)
            ->get()
            ->keyBy('module_id');

        // Get all lesson scores for the user grouped by module
        $lessonScores = LessonScore::where('user_id', $user->id)
            ->get()
            ->groupBy('module_id');

        // Fetch all modules (enrolled or not) with lesson counts
        $allModules = Module::withCount(['lessons' => function($query) {
            $query->where('is_active', true);
        }])
        ->orderBy('order')
        ->orderBy('id')
        ->get();

        // Map modules with progress/enrollment data
        $modules = $allModules->map(function($module) use ($enrollments, $lessonScores) {
            $enrollment = $enrollments->get($module->id);
            $moduleScores = $lessonScores->get($module->id, collect());

            $totalLessons = $module->lessons_count ?? 0;
            $completedLessons = $moduleScores->where('percentage', '>=', 60)->count();
            $progressPercentage = $totalLessons > 0
                ? (int) round(($completedLessons / $totalLessons) * 100)
                : 0;

            if ($enrollment && $enrollment->progress_percentage != $progressPercentage) {
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
                'is_enrolled' => (bool) $enrollment,
                'enrollment' => $enrollment ? [
                    'status' => $enrollment->status,
                    'started_at' => $enrollment->started_at,
                    'completed_at' => $enrollment->completed_at,
                    'progress_percentage' => $progressPercentage,
                    'quiz_score' => $enrollment->quiz_score,
                ] : null,
                'progress' => [
                    'completed_lessons' => $completedLessons,
                    'total_lessons' => $totalLessons,
                    'percentage' => $progressPercentage,
                    'is_completed' => $progressPercentage === 100,
                ],
            ];
        });

        $enrolledModules = $modules->filter(fn ($module) => $module['is_enrolled'])->values();
        $availableModules = $modules->filter(fn ($module) => !$module['is_enrolled'])->values();

        return response()->json([
            'enrolled_modules' => $enrolledModules,
            'available_modules' => $availableModules,
        ], 200);
    }


    /**
     * Get a specific module with lessons and progress.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        // $user = Auth::user();
        $user = User::find(1);

        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized'
            ], 401);
        }

        // Get module with active lessons
        $module = Module::with(['lessons' => function($query) {
            $query->orderBy('id');
        }])->findOrFail($id);

        // Get enrollment for this module
        $enrollment = ModuleEnrollment::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->first();

        // Get all lesson scores for this module
        $lessonScores = LessonScore::where('user_id', $user->id)
            ->where('module_id', $module->id)
            ->get()
            ->keyBy('lesson_id');

        // Map lessons with progress data
        $lessons = $module->lessons->map(function($lesson) use ($lessonScores) {
            $lessonScore = $lessonScores->get($lesson->id);
            
            // Determine status based on score
            $status = 'not_started';
            if ($lessonScore) {
                if ($lessonScore->percentage >= 60) {
                    $status = 'completed';
                } else {
                    $status = 'started';
                }
            }
            
            return [
                'id' => $lesson->id,
                'title' => $lesson->title,
                'content_markdown' => $lesson->content_markdown,
                'pdf_url' => $lesson->pdf_url,
                'video_url' => $lesson->video_url,
                'status' => $status,
                'is_completed' => $lessonScore && $lessonScore->percentage >= 75,
                'score' => $lessonScore ? (float) $lessonScore->percentage : null,
                'quiz_score' => $lessonScore ? (int) round($lessonScore->percentage) : null,
                'completed_at' => $lessonScore && $lessonScore->percentage >= 75
                    ? $lessonScore->updated_at->toDateTimeString() 
                    : null,
            ];
        })->values();

        // Calculate overall progress
        $totalLessons = $module->lessons_count ?? 0;
        $completedLessons = $lessonScores->where('percentage', '>=', 75)->count();
        $progressPercentage = $totalLessons > 0 
            ? (int)round(($completedLessons / $totalLessons) * 100) 
            : 0;

        // Update enrollment progress if enrollment exists and calculated value differs
        if ($enrollment && $enrollment->progress_percentage != $progressPercentage) {
            $enrollment->update([
                'progress_percentage' => $progressPercentage,
                'status' => $progressPercentage === 100 ? 'completed' : ($progressPercentage > 0 ? 'started' : 'enrolled'),
            ]);
        }

        // Build response
        $response = [
            'id' => $module->id,
            'order' => $module->order,
            'featured' => $module->featured,
            'title' => $module->title,
            'description' => $module->description,
            'lessons_count' => $totalLessons,
            'lessons' => $lessons,
            'enrollment' => $enrollment ? [
                'status' => $enrollment->status,
                'started_at' => $enrollment->started_at ? $enrollment->started_at->toDateTimeString() : null,
                'completed_at' => $enrollment->completed_at ? $enrollment->completed_at->toDateTimeString() : null,
                'progress_percentage' => $progressPercentage,
                'quiz_score' => $enrollment->quiz_score,
            ] : null,
            'progress' => [
                'completed_lessons' => $completedLessons,
                'total_lessons' => $totalLessons,
                'percentage' => $progressPercentage,
                'is_completed' => $progressPercentage === 100,
            ],
        ];

        return response()->json([
            'success' => true,
            'module' => $response,
        ], 200);
    }

    /**
     * Enroll user in a module.
     * 
     * @param Request $request
     * @param int $id Module ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function enroll(Request $request, $id): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Check if module exists and is active
            $module = Module::find($id);
            
            if (!$module) {
                return response()->json([
                    'success' => false,
                    'message' => 'Module not found or not available'
                ], 404);
            }

            // Check if user is already enrolled in this specific module
            $existingEnrollment = ModuleEnrollment::where('user_id', $user->id)
                ->where('module_id', $module->id)
                ->first();

            if ($existingEnrollment) {
                return response()->json([
                    'success' => true,
                    'message' => 'You are already enrolled in this module',
                    'enrollment' => [
                        'id' => $existingEnrollment->id,
                        'status' => $existingEnrollment->status,
                        'started_at' => $existingEnrollment->started_at ? $existingEnrollment->started_at->toDateTimeString() : null,
                        'completed_at' => $existingEnrollment->completed_at ? $existingEnrollment->completed_at->toDateTimeString() : null,
                        'progress_percentage' => $existingEnrollment->progress_percentage,
                        'quiz_score' => $existingEnrollment->quiz_score,
                    ],
                    'module' => [
                        'id' => $module->id,
                        'title' => $module->title,
                        'description' => $module->description,
                    ]
                ], 200);
            }

            // Create enrollment
            DB::beginTransaction();
            
            $enrollment = ModuleEnrollment::create([
                'user_id' => $user->id,
                'module_id' => $module->id,
                'status' => 'enrolled',
                'started_at' => now(),
                'progress_percentage' => 0,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Successfully enrolled in module',
                'enrollment' => [
                    'id' => $enrollment->id,
                    'status' => $enrollment->status,
                    'started_at' => $enrollment->started_at->toDateTimeString(),
                    'completed_at' => $enrollment->completed_at ? $enrollment->completed_at->toDateTimeString() : null,
                    'progress_percentage' => $enrollment->progress_percentage,
                    'quiz_score' => $enrollment->quiz_score,
                ],
                'module' => [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'lessons_count' => $module->lessons()->where('is_active', true)->count(),
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to enroll in module',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get quiz questions for a specific lesson.
     * 
     * @param int $moduleId Module ID
     * @param int $lessonId Lesson ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function getLessonQuizzes($moduleId, $lessonId): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Verify module exists and is active
            $module = Module::findOrFail($moduleId);
            
            // Verify lesson exists and belongs to the module
            $lesson = Lesson::where('module_id', $module->id)
                ->findOrFail($lessonId);

            // Get random quiz questions (max 10)
            $quizzes = LessonQuiz::where('lesson_id', $lesson->id)
                ->inRandomOrder()
                ->limit(10)
                ->get()
                ->map(function ($quiz) {
                    // Transform database format to API format
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
                'module' => [
                    'id' => $module->id,
                    'title' => $module->title,
                ],
                'lesson' => [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                ],
                'quizzes' => $quizzes,
                'count' => $quizzes->count(),
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Module or lesson not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch quiz questions',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Submit quiz answers and calculate score.
     * 
     * @param Request $request
     * @param int $moduleId Module ID
     * @param int $lessonId Lesson ID
     * @return \Illuminate\Http\JsonResponse
     */
    public function submitQuizScore(Request $request, $moduleId, $lessonId): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Verify module exists
            $module = Module::findOrFail($moduleId);
            
            // Verify lesson exists and belongs to the module
            $lesson = Lesson::where('module_id', $module->id)
                ->findOrFail($lessonId);

            // Validate request data - only total_points and percentage from frontend
            $data = $request->validate([
                'total_points' => 'required|integer|min:1',
                'percentage' => 'required|numeric|min:0|max:100',
            ]);

            $totalPoints = $data['total_points'];
            $percentage = $data['percentage'];
            $passMark = 60;
            $passed = $percentage >= $passMark;

            // Save or update the score
            $lessonScore = LessonScore::updateOrCreate(
                [
                    'user_id' => $user->id,
                    'module_id' => $module->id,
                    'lesson_id' => $lesson->id,
                ],
                [
                    'total_points' => $totalPoints,
                    'percentage' => $percentage,
                ]
            );

            // Determine lesson status
            $status = 'not_started';
            if ($percentage >= 60) {
                $status = 'completed';
            } elseif ($percentage > 0) {
                $status = 'started';
            }

            // Update lesson status
            $lesson->update(['status' => $status]);

            // Find next lesson if lesson is completed
            $nextLesson = null;
            if ($passed) {
                $nextLesson = Lesson::where('module_id', $module->id)
                    ->where('id', '>', $lesson->id)
                    ->orderBy('id')
                    ->first();
            }

            // Update module enrollment progress if needed
            $enrollment = ModuleEnrollment::where('user_id', $user->id)
                ->where('module_id', $module->id)
                ->first();

            if ($enrollment) {
                // Recalculate overall progress
                $totalLessons = $module->lessons()->count();
                $completedLessons = LessonScore::where('user_id', $user->id)
                    ->where('module_id', $module->id)
                    ->where('percentage', '>=', 60)
                    ->count();
                
                $progressPercentage = $totalLessons > 0 
                    ? (int)round(($completedLessons / $totalLessons) * 100) 
                    : 0;

                $enrollment->update([
                    'progress_percentage' => $progressPercentage,
                    'status' => $progressPercentage === 100 ? 'completed' : ($progressPercentage > 0 ? 'started' : 'enrolled'),
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => $passed ? 'Quiz passed! Lesson completed.' : 'Quiz submitted. Score below passing mark.',
                'score' => [
                    'percentage' => (float) $percentage,
                    'quiz_score' => (int) round($percentage),
                    'total_points' => $totalPoints,
                    'passed' => $passed,
                    'pass_mark' => $passMark,
                ],
                'lesson' => [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'status' => $status,
                    'is_completed' => $passed,
                    'score' => (float) $percentage,
                    'completed_at' => $passed ? $lessonScore->updated_at->toDateTimeString() : null,
                ],
                'next_lesson' => $nextLesson ? [
                    'id' => $nextLesson->id,
                    'title' => $nextLesson->title,
                ] : null,
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Module or lesson not found'
            ], 404);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit quiz score',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

