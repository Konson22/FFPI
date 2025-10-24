<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\UserProgress;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class ProgressController extends Controller
{
    /**
     * Get progress for a course
     */
    public function show(Request $request, $courseId): JsonResponse
    {
        $userId = $request->user()->id;
        
        $progress = UserProgress::where('user_id', $userId)
            ->whereHas('lesson', function ($q) use ($courseId) {
                $q->where('module_id', $courseId);
            })
            ->get()
            ->map(function ($p) use ($courseId) {
                return [
                    'id' => $p->id,
                    'userId' => $p->user_id,
                    'courseId' => $courseId,
                    'lessonId' => $p->lesson_id,
                    'pct' => $p->progress_percentage ?? 0,
                    'completed' => isset($p->completed) ? (bool) $p->completed : (bool) ($p->is_completed ?? false),
                    'timeSpent' => $p->time_spent ?? 0,
                    'updatedAt' => isset($p->updated_at) ? strtotime($p->updated_at) * 1000 : time() * 1000,
                    'createdAt' => isset($p->created_at) ? $p->created_at->toISOString() : now()->toISOString(),
                ];
            });
        
        return response()->json($progress);
    }
    
    /**
     * Update progress for a lesson
     */
    public function update(Request $request): JsonResponse
    {
        $request->validate([
            'course_id' => 'required|exists:modules,id',
            'lesson_id' => 'required|exists:lessons,id',
            'pct' => 'required|integer|min:0|max:100',
            'completed' => 'nullable|boolean',
            'time_spent' => 'nullable|integer',
            'last_position' => 'nullable|integer',
        ]);
        
        $userId = $request->user()->id;
        
        // Verify lesson belongs to course
        $lesson = Lesson::where('id', $request->lesson_id)
            ->where('module_id', $request->course_id)
            ->firstOrFail();
        
        // Prepare update data based on available columns
        $updateData = [
            'is_completed' => $request->completed ?? ($request->pct >= 100),
        ];
        
        // Add new columns if they exist
        if (Schema::hasColumn('user_progress', 'progress_percentage')) {
            $updateData['progress_percentage'] = $request->pct;
        }
        if (Schema::hasColumn('user_progress', 'completed')) {
            $updateData['completed'] = $request->completed ?? ($request->pct >= 100);
        }
        if (Schema::hasColumn('user_progress', 'time_spent')) {
            $updateData['time_spent'] = $request->time_spent;
        }
        if (Schema::hasColumn('user_progress', 'last_position')) {
            $updateData['last_position'] = $request->last_position;
        }
        
        // Update or create progress
        $progress = UserProgress::updateOrCreate(
            [
                'user_id' => $userId,
                'lesson_id' => $request->lesson_id,
            ],
            $updateData
        );
        
        return response()->json(['message' => 'Progress updated']);
    }
    
    /**
     * Get resume context (last accessed lesson)
     */
    public function resume(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        
        $latestProgress = UserProgress::where('user_id', $userId)
            ->where('completed', false)
            ->with(['lesson.module'])
            ->orderBy('updated_at', 'desc')
            ->first();
        
        if (!$latestProgress || !$latestProgress->lesson) {
            return response()->json(null);
        }
        
        $lesson = $latestProgress->lesson;
        $module = $lesson->module;
        
        return response()->json([
            'courseId' => $module->id,
            'courseName' => $module->title,
            'lessonId' => $lesson->id,
            'lessonName' => $lesson->title,
            'progress' => $latestProgress->progress_percentage ?? 0,
        ]);
    }
    
    /**
     * Award XP to user (helper)
     */
    private function awardXP(int $userId, string $type, int $amount, array $context = []): void
    {
        // TODO: Store XP events in database
        // For now, just a placeholder
    }
}

