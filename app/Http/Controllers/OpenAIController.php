<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use OpenAI\Laravel\Facades\OpenAI;

class OpenAIController extends Controller
{
    /**
     * Test OpenAI connection and make a simple request
     */
    public function test()
    {
        try {
            $response = OpenAI::chat()->create([
                'model' => 'gpt-3.5-turbo',
                'messages' => [
                    ['role' => 'user', 'content' => 'Hello! Can you confirm you are working?']
                ],
                'max_tokens' => 50,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'OpenAI is working correctly!',
                'response' => $response->choices[0]->message->content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'OpenAI error: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Generate text using OpenAI
     */
    public function generateText(Request $request)
    {
        $request->validate([
            'prompt' => 'required|string|max:1000',
            'model' => 'string|in:gpt-3.5-turbo,gpt-4,gpt-4-turbo'
        ]);

        try {
            $response = OpenAI::chat()->create([
                'model' => $request->input('model', 'gpt-3.5-turbo'),
                'messages' => [
                    ['role' => 'user', 'content' => $request->input('prompt')]
                ],
                'max_tokens' => 500,
            ]);

            return response()->json([
                'success' => true,
                'response' => $response->choices[0]->message->content
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error generating text: ' . $e->getMessage()
            ], 500);
        }
    }
}
