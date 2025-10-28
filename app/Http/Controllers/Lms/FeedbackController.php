<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class FeedbackController extends Controller
{
    /**
     * Submit feedback for a lesson or course
     */
    public function submit(Request $request): JsonResponse
    {
        $request->validate([
            'lesson_id' => 'nullable|exists:lessons,id',
            'course_id' => 'nullable|exists:modules,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string|max:1000',
        ]);
        
        $userId = $request->user()->id;
        
        // TODO: Store feedback in database
        // For now, just return success
        
        return response()->json(['message' => 'Feedback submitted successfully']);
    }
}

