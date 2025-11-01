<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\GeneralQuiz;
use App\Models\GeneralQuizAttempt;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GeneralQuizController extends Controller
{
    /**
     * Get a random quiz from the general_quizzes table
     * Supports optional category filtering
     */
    public function generate(Request $request)
    {
        // Use web guard for session-based authentication
        $user = Auth::guard('web')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized. Please log in.'], 401);
        }

        $data = $request->validate([
            'category' => 'nullable|string',
        ]);

        $query = GeneralQuiz::query()->where('is_active', true);

        if (!empty($data['category'])) {
            $query->where('category', $data['category']);
        }

        // Get a random quiz
        $quiz = $query->inRandomOrder()->first();

        if (!$quiz) {
            return response()->json([
                'error' => 'No quizzes available.'
            ], 404);
        }

        // Shuffle options if configured
        $options = $quiz->options ?? [];
        if ($quiz->shuffle_options && is_array($options)) {
            shuffle($options);
        }

        // Get the correct answer from options for single choice questions
        $correctAnswer = null;
        if ($quiz->type === 'single_choice' && !empty($quiz->correct_answers)) {
            $correctAnswers = $quiz->correct_answers;
            if (is_array($correctAnswers) && count($correctAnswers) > 0) {
                // Find the correct answer in the options array to match exact text
                $correctAnswerText = $correctAnswers[0];
                foreach ($options as $option) {
                    if (mb_strtolower(trim($option)) === mb_strtolower(trim($correctAnswerText))) {
                        $correctAnswer = $option;
                        break;
                    }
                }
                // Fallback to first correct answer if not found in options
                if (!$correctAnswer) {
                    $correctAnswer = $correctAnswers[0];
                }
            }
        }

        return response()->json([
            'quiz' => [
                'id' => $quiz->id,
                'title' => $quiz->title,
                'category' => $quiz->category,
                'question' => $quiz->question,
                'type' => $quiz->type,
                'options' => $options,
                'points' => (int) $quiz->points,
                'difficulty' => (int) $quiz->difficulty,
                'correct_answer' => $correctAnswer,
                'correct_answers' => $quiz->correct_answers,
                'explanation' => $quiz->explanation,
                'time_limit_seconds' => $quiz->time_limit_seconds ? (int) $quiz->time_limit_seconds : null,
            ]
        ]);
    }

    public function index(Request $request)
    {
        $data = $request->validate([
            'category' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:100',
        ]);

        $query = GeneralQuiz::query()->where('is_active', true)->orderBy('display_order')->orderBy('id');
        if (!empty($data['category'])) {
            $query->where('category', $data['category']);
        }
        if (!empty($data['limit'])) {
            $query->limit((int) $data['limit']);
        }

        $items = $query->get()->map(function ($q) {
            return [
                'id' => $q->id,
                'title' => $q->title,
                'category' => $q->category,
                'question' => $q->question,
                'type' => $q->type,
                'options' => $q->options,
                'points' => (int) $q->points,
                'difficulty' => (int) $q->difficulty,
            ];
        });

        return response()->json(['quizzes' => $items]);
    }

    public function submit(Request $request)
    {
        // Use web guard for session-based authentication
        $user = Auth::guard('web')->user();
        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $data = $request->validate([
            'quiz_id' => 'required|integer|exists:general_quizzes,id',
            'answer' => 'required|string', // User's selected answer
        ]);

        // Get the quiz from database
        $quiz = GeneralQuiz::where('id', $data['quiz_id'])
            ->where('is_active', true)
            ->first();

        if (!$quiz) {
            return response()->json(['error' => 'Quiz not found'], 404);
        }

        $userAnswer = trim($data['answer']);
        $correctAnswers = collect($quiz->correct_answers ?? [])
            ->map(function ($v) {
                return mb_strtolower(trim((string) $v));
            })
            ->values();

        // Check if answer is correct (case-insensitive)
        $userAnswerLower = mb_strtolower($userAnswer);
        $isCorrect = $correctAnswers->contains($userAnswerLower);

        $points = (int) $quiz->points;
        $awarded = $isCorrect ? $points : 0;

        // Get the first correct answer for display (match the case from options)
        $firstCorrectAnswer = $correctAnswers->first();
        $options = $quiz->options ?? [];
        foreach ($options as $option) {
            if (mb_strtolower(trim($option)) === $firstCorrectAnswer) {
                $firstCorrectAnswer = $option; // Use the exact option text with correct case
                break;
            }
        }

        // Save attempt to database
        $attempt = GeneralQuizAttempt::create([
            'user_id' => $user->id,
            'category' => $quiz->category ?? 'general',
            'answers' => [
                'quiz_id' => $quiz->id,
                'question' => $quiz->question,
                'user_answer' => $userAnswer,
                'correct_answer' => $firstCorrectAnswer,
                'is_correct' => $isCorrect,
            ],
            'total_points_awarded' => $awarded,
            'max_points' => $points,
            'score_percent' => $isCorrect ? 100 : 0,
        ]);

        return response()->json([
            'score_percent' => $isCorrect ? 100 : 0,
            'total_points_awarded' => $awarded,
            'max_points' => $points,
            'is_correct' => $isCorrect,
            'correct_answer' => $firstCorrectAnswer,
            'explanation' => $quiz->explanation,
            'attempt_id' => $attempt->id,
        ]);
    }
}


