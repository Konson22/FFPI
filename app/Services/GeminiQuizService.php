<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class GeminiQuizService
{
    private $apiKey;
    private $apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    public function __construct()
    {
        $this->apiKey = env('GEMINI_API_KEY');
    }

    /**
     * Generate a quiz using Gemini AI
     *
     * @param string|null $category Optional category for the quiz
     * @return array|null Quiz data or null on failure
     */
    public function generateQuiz(?string $category = null): ?array
    {
        if (!$this->apiKey) {
            Log::error('Gemini API key not configured');
            return null;
        }

        $prompt = $this->buildPrompt($category);

        try {
            $response = Http::timeout(30)->post(
                $this->apiUrl . '?key=' . $this->apiKey,
                [
                    'contents' => [
                        [
                            'parts' => [
                                ['text' => $prompt]
                            ]
                        ]
                    ],
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'topK' => 40,
                        'topP' => 0.95,
                        'maxOutputTokens' => 2048,
                    ]
                ]
            );

            if (!$response->successful()) {
                Log::error('Gemini API error', [
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                return null;
            }

            $data = $response->json();
            $text = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;

            if (!$text) {
                Log::error('Empty response from Gemini');
                return null;
            }

            return $this->parseQuizResponse($text, $category);
        } catch (\Exception $e) {
            Log::error('Gemini quiz generation failed', ['error' => $e->getMessage()]);
            return null;
        }
    }

    /**
     * Build the prompt for Gemini
     */
    private function buildPrompt(?string $category): string
    {
        $categoryPart = $category ? " about {$category}" : '';
        
        return "Generate a single quiz question{$categoryPart} related to family planning, reproductive health, or sexual education. 

Return ONLY a valid JSON object in this exact format (no markdown, no code blocks, no extra text):
{
    \"question\": \"The question text here\",
    \"type\": \"single_choice\",
    \"options\": [\"Option 1\", \"Option 2\", \"Option 3\", \"Option 4\"],
    \"correct_answer\": \"The correct option text exactly as it appears in options\",
    \"points\": 10,
    \"category\": \"" . ($category ?: "general") . "\"
}

The question should be educational and appropriate. Ensure the correct_answer matches exactly one of the options array values.";
    }

    /**
     * Parse Gemini's response into quiz format
     */
    private function parseQuizResponse(string $text, ?string $category): ?array
    {
        // Clean the response - remove markdown code blocks if present
        $text = trim($text);
        $text = preg_replace('/^```json\s*/', '', $text);
        $text = preg_replace('/^```\s*/', '', $text);
        $text = preg_replace('/\s*```$/', '', $text);
        $text = trim($text);

        try {
            $data = json_decode($text, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                Log::error('Failed to parse Gemini JSON', ['text' => $text]);
                return null;
            }

            // Validate required fields
            if (!isset($data['question']) || !isset($data['options']) || !isset($data['correct_answer'])) {
                return null;
            }

            // Ensure correct_answer matches one of the options
            $options = $data['options'];
            $correctAnswer = $data['correct_answer'];
            if (!in_array($correctAnswer, $options)) {
                return null;
            }

            return [
                'question' => $data['question'],
                'type' => $data['type'] ?? 'single_choice',
                'options' => $options,
                'correct_answer' => $correctAnswer,
                'correct_answers' => [$correctAnswer], // For compatibility
                'points' => $data['points'] ?? 10,
                'category' => $data['category'] ?? $category ?? 'general',
                'difficulty' => $data['difficulty'] ?? 1,
            ];
        } catch (\Exception $e) {
            Log::error('Error parsing quiz response', ['error' => $e->getMessage(), 'text' => $text]);
            return null;
        }
    }
}

