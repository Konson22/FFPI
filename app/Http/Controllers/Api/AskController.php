<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\QuestionRequest;
use App\Http\Requests\Api\AnswerRequest;
use App\Models\Question;
use App\Models\Answer;
use App\Events\AnswerSubmitted;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AskController extends Controller
{
    /**
     * Display a listing of questions.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            // Get query parameters
            $category = $request->get('category', 'all');
            $status = $request->get('status', 'all');
            $perPage = $request->get('per_page', 10);
            $page = $request->get('page', 1);
            
            // Build query
            $query = Question::with(['user', 'answers.user'])
                ->withCount('answers');
            
            // Filter by category
            if ($category !== 'all') {
                $query->where('category', $category);
            }
            
            // Filter by status
            if ($status !== 'all') {
                $query->where('status', $status);
            }
            
            // Order by creation date (newest first)
            $query->orderBy('created_at', 'desc');
            
            // Paginate results
            $questions = $query->paginate($perPage, ['*'], 'page', $page);
            
            // Format questions for response
            $formattedQuestions = $questions->map(function ($question) use ($user) {
                return [
                    'id' => $question->id,
                    'question' => $question->question,
                    'category' => $question->category,
                    'is_anonymous' => $question->is_anonymous,
                    'status' => $question->status,
                    'views_count' => $question->views_count,
                    'answers_count' => $question->answers_count,
                    'created_at' => $question->created_at->toISOString(),
                    'created_at_formatted' => $question->created_at->format('M d, Y'),
                    'user' => $question->is_anonymous ? null : [
                        'id' => $question->user->id,
                        'name' => $question->user->name,
                    ],
                    'is_owner' => $user && $question->user_id === $user->id,
                    'answers' => $question->answers->map(function ($answer) use ($question, $user) {
                        return [
                            'id' => $answer->id,
                            'answer' => $answer->answer,
                            'is_expert' => $answer->is_expert,
                            'is_accepted' => $answer->is_accepted,
                            'reactions_count' => $answer->reactions_count,
                            'created_at' => $answer->created_at->toISOString(),
                            'created_at_formatted' => $answer->created_at->format('M d, Y'),
                            'user' => [
                                'id' => $answer->user->id,
                                'name' => $answer->user->name,
                            ],
                            'is_owner' => $user && $answer->user_id === $user->id,
                            'can_accept' => $user && $question->user_id === $user->id && !$answer->is_accepted,
                        ];
                    }),
                ];
            });
            
            // Get user's questions and answers count if authenticated
            $userQuestionsCount = $user ? Question::where('user_id', $user->id)->count() : 0;
            $userAnswersCount = $user ? Answer::where('user_id', $user->id)->count() : 0;
            
            return response()->json([
                'success' => true,
                'message' => 'Questions retrieved successfully.',
                'data' => $formattedQuestions,
                'meta' => [
                    'current_page' => $questions->currentPage(),
                    'last_page' => $questions->lastPage(),
                    'per_page' => $questions->perPage(),
                    'total' => $questions->total(),
                    'from' => $questions->firstItem(),
                    'to' => $questions->lastItem(),
                ],
                'stats' => [
                    'user_questions_count' => $userQuestionsCount,
                    'user_answers_count' => $userAnswersCount,
                    'total_questions' => $questions->total(),
                ],
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve questions.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created question (RESTful method).
     */
    public function store(QuestionRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();
            
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }
            
            // Create question
            $question = Question::create([
                'user_id' => $user->id,
                'question' => $request->question,
                'category' => $request->category,
                'is_anonymous' => $request->is_anonymous ?? false,
                'status' => 'pending',
            ]);
            
            // Load relationships
            $question->load(['user', 'answers.user']);
            
            // Format response
            $formattedQuestion = [
                'id' => $question->id,
                'question' => $question->question,
                'category' => $question->category,
                'is_anonymous' => $question->is_anonymous,
                'status' => $question->status,
                'views_count' => $question->views_count,
                'answers_count' => $question->answers_count,
                'created_at' => $question->created_at->toISOString(),
                'created_at_formatted' => $question->created_at->format('M d, Y'),
                'user' => $question->is_anonymous ? null : [
                    'id' => $question->user->id,
                    'name' => $question->user->name,
                ],
                'is_owner' => true,
                'answers' => [],
            ];
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Question submitted successfully.',
                'data' => $formattedQuestion
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit question.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created question (legacy method for backward compatibility).
     */
    public function storeQuestion(QuestionRequest $request): JsonResponse
    {
        return $this->store($request);
    }

    /**
     * Display the specified question.
     */
    public function show(string $id): JsonResponse
    {
        try {
            $user = Auth::user();
            
            $question = Question::with(['user', 'answers.user'])
                ->withCount('answers')
                ->findOrFail($id);
            
            // Increment view count
            $question->incrementViews();
            $question->refresh();
            
            // Format question for response
            $formattedQuestion = [
                'id' => $question->id,
                'question' => $question->question,
                'category' => $question->category,
                'is_anonymous' => $question->is_anonymous,
                'status' => $question->status,
                'views_count' => $question->views_count,
                'answers_count' => $question->answers_count,
                'created_at' => $question->created_at->toISOString(),
                'created_at_formatted' => $question->created_at->format('M d, Y'),
                'user' => $question->is_anonymous ? null : [
                    'id' => $question->user->id,
                    'name' => $question->user->name,
                ],
                'is_owner' => $user && $question->user_id === $user->id,
                'answers' => $question->answers->map(function ($answer) use ($question, $user) {
                    return [
                        'id' => $answer->id,
                        'answer' => $answer->answer,
                        'is_expert' => $answer->is_expert,
                        'is_accepted' => $answer->is_accepted,
                        'reactions_count' => $answer->reactions_count,
                        'created_at' => $answer->created_at->toISOString(),
                        'created_at_formatted' => $answer->created_at->format('M d, Y'),
                        'user' => [
                            'id' => $answer->user->id,
                            'name' => $answer->user->name,
                        ],
                        'is_owner' => $user && $answer->user_id === $user->id,
                        'can_accept' => $user && $question->user_id === $user->id && !$answer->is_accepted,
                    ];
                }),
            ];
            
            return response()->json([
                'success' => true,
                'message' => 'Question retrieved successfully.',
                'data' => $formattedQuestion
            ], 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve question.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created answer for a question.
     */
    public function storeAnswer(AnswerRequest $request, string $questionId): JsonResponse
    {
        try {
            DB::beginTransaction();
            
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }
            
            // Find question
            $question = Question::findOrFail($questionId);
            
            // Check if user is an expert
            $isExpert = $user->role === 'expert' || ($user->doctorProfile && $user->doctorProfile->is_verified);
            
            // Create answer
            $answer = Answer::create([
                'question_id' => $question->id,
                'user_id' => $user->id,
                'answer' => $request->answer,
                'is_expert' => $isExpert,
                'is_approved' => $isExpert, // Auto-approve expert answers
            ]);
            
            // Increment question's answers count and update status
            $question->incrementAnswers();
            
            // Reload question to ensure it has the latest data
            $question->refresh();
            
            // Load relationships for the event - ensure question.user is loaded
            $answer->load(['question.user', 'user']);
            
            // Refresh the answer to ensure relationships are loaded
            $answer->refresh();
            $answer->load(['question.user', 'user']);
            
            // Dispatch event to notify question author
            event(new AnswerSubmitted($answer));
            
            // Format response
            $formattedAnswer = [
                'id' => $answer->id,
                'answer' => $answer->answer,
                'is_expert' => $answer->is_expert,
                'is_accepted' => $answer->is_accepted,
                'reactions_count' => $answer->reactions_count,
                'created_at' => $answer->created_at->toISOString(),
                'created_at_formatted' => $answer->created_at->format('M d, Y'),
                'user' => [
                    'id' => $answer->user->id,
                    'name' => $answer->user->name,
                ],
                'is_owner' => true,
                'can_accept' => $question->user_id === $user->id && !$answer->is_accepted,
                'question' => [
                    'id' => $question->id,
                    'question' => $question->question,
                    'answers_count' => $question->answers_count,
                    'status' => $question->status,
                ],
            ];
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Answer submitted successfully.',
                'data' => $formattedAnswer
            ], 201);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit answer.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Accept an answer for a question.
     */
    public function acceptAnswer(string $answerId): JsonResponse
    {
        try {
            DB::beginTransaction();
            
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }
            
            $answer = Answer::with('question')->findOrFail($answerId);
            
            // Check if user owns the question
            if ($answer->question->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You can only accept answers to your own questions.',
                    'data' => null
                ], 403);
            }
            
            // Use the model's accept method which handles unaccepting other answers
            $answer->accept();
            
            // Update question status to answered if not already
            if ($answer->question->status !== 'answered') {
                $answer->question->update(['status' => 'answered']);
            }
            
            // Reload relationships
            $answer->load(['question.user', 'user']);
            
            // Format response
            $formattedAnswer = [
                'id' => $answer->id,
                'answer' => $answer->answer,
                'is_expert' => $answer->is_expert,
                'is_accepted' => $answer->is_accepted,
                'reactions_count' => $answer->reactions_count,
                'created_at' => $answer->created_at->toISOString(),
                'created_at_formatted' => $answer->created_at->format('M d, Y'),
                'user' => [
                    'id' => $answer->user->id,
                    'name' => $answer->user->name,
                ],
                'is_owner' => $answer->user_id === $user->id,
                'can_accept' => false,
                'question' => [
                    'id' => $answer->question->id,
                    'question' => $answer->question->question,
                    'status' => $answer->question->status,
                ],
            ];
            
            DB::commit();
            
            return response()->json([
                'success' => true,
                'message' => 'Answer accepted successfully.',
                'data' => $formattedAnswer
            ], 200);
            
        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to accept answer.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}

