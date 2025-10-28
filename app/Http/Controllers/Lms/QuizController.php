<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class QuizController extends Controller
{
    /**
     * Get quiz for a lesson
     */
    public function show($lessonId): JsonResponse
    {
        $quiz = Quiz::where('lesson_id', $lessonId)
            ->with(['options'])
            ->first();
        
        if (!$quiz) {
            return response()->json(['message' => 'Quiz not found'], 404);
        }
        
        // Group options by question
        $questions = [];
        foreach ($quiz->options as $option) {
            if (!isset($questions[$option->question])) {
                $questions[$option->question] = [
                    'id' => "q_{$quiz->id}_{$option->question}",
                    'quizId' => $quiz->id,
                    'prompt' => $option->question,
                    'type' => 'multiple_choice',
                    'order' => count($questions),
                    'points' => 10,
                    'options' => [],
                ];
            }
            $questions[$option->question]['options'][] = $option->option_text;
            if ($option->is_correct) {
                $questions[$option->question]['correctAnswerIndex'] = count($questions[$option->question]['options']) - 1;
            }
        }
        
        return response()->json([
            'id' => $quiz->id,
            'lessonId' => $quiz->lesson_id,
            'title' => $quiz->title ?? 'Quiz',
            'description' => $quiz->description,
            'passingScore' => $quiz->passing_score ?? 70,
            'timeLimit' => $quiz->time_limit,
            'maxAttempts' => $quiz->max_attempts,
            'questions' => array_values($questions),
        ]);
    }
    
    /**
     * Submit quiz answers
     */
    public function submit(Request $request, $quizId): JsonResponse
    {
        $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'answers' => 'required|array',
            'answers.*.questionId' => 'required|string',
            'answers.*.answer' => 'required',
        ]);
        
        $quiz = Quiz::with(['options'])->findOrFail($quizId);
        $userId = $request->user()->id;
        
        // Calculate score
        $totalPoints = 0;
        $earnedPoints = 0;
        $answers = [];
        
        foreach ($request->answers as $submittedAnswer) {
            // Parse question ID to get question text
            $parts = explode('_', $submittedAnswer['questionId']);
            $questionText = implode('_', array_slice($parts, 2));
            
            // Find correct answer
            $correctOption = $quiz->options
                ->where('question', $questionText)
                ->where('is_correct', true)
                ->first();
            
            $isCorrect = false;
            if ($correctOption) {
                // Get all options for this question
                $questionOptions = $quiz->options
                    ->where('question', $questionText)
                    ->values();
                
                // Find the index of correct option
                $correctIndex = $questionOptions->search(function ($opt) use ($correctOption) {
                    return $opt->id === $correctOption->id;
                });
                
                $isCorrect = $submittedAnswer['answer'] == $correctIndex;
            }
            
            $pointsEarned = $isCorrect ? 10 : 0;
            $totalPoints += 10;
            $earnedPoints += $pointsEarned;
            
            $answers[] = [
                'questionId' => $submittedAnswer['questionId'],
                'answer' => $submittedAnswer['answer'],
                'isCorrect' => $isCorrect,
                'pointsEarned' => $pointsEarned,
            ];
        }
        
        $score = $totalPoints > 0 ? round(($earnedPoints / $totalPoints) * 100) : 0;
        $passed = $score >= ($quiz->passing_score ?? 70);
        
        // TODO: Store quiz attempt in database
        
        $attempt = [
            'id' => uniqid(),
            'userId' => $userId,
            'quizId' => $quiz->id,
            'lessonId' => $request->lesson_id,
            'answers' => $answers,
            'score' => $score,
            'passed' => $passed,
            'startedAt' => now()->subMinutes(5)->toISOString(),
            'completedAt' => now()->toISOString(),
            'timeSpent' => 300, // 5 minutes
        ];
        
        return response()->json($attempt);
    }
    
    /**
     * Get quiz attempts for a lesson
     */
    public function attempts($lessonId): JsonResponse
    {
        // TODO: Retrieve from database
        return response()->json([]);
    }
}

