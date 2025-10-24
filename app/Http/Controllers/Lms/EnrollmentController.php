<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class EnrollmentController extends Controller
{
    /**
     * List user's enrollments
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        
        // Get enrollments from user_progress table (track which courses user has started)
        $enrollments = DB::table('user_progress')
            ->join('lessons', 'user_progress.lesson_id', '=', 'lessons.id')
            ->join('modules', 'lessons.module_id', '=', 'modules.id')
            ->where('user_progress.user_id', $userId)
            ->select('modules.*', DB::raw('MIN(user_progress.created_at) as enrolled_at'))
            ->groupBy('modules.id')
            ->get()
            ->map(function ($module) use ($userId) {
                return [
                    'id' => uniqid(), // Generate unique enrollment ID
                    'userId' => $userId,
                    'courseId' => $module->id,
                    'enrolledAt' => $module->enrolled_at,
                    'progress' => $this->calculateProgress($module->id, $userId),
                ];
            });
        
        return response()->json($enrollments);
    }
    
    /**
     * Enroll user in a course
     */
    public function enroll(Request $request, $id): JsonResponse
    {
        $module = Module::findOrFail($id);
        
        if (!$module->published) {
            return response()->json(['message' => 'Course not available'], 403);
        }
        
        // For MVP, enrollment is implicit - just return success
        // In future, create actual enrollment records
        
        return response()->json(['message' => 'Enrolled successfully']);
    }
    
    /**
     * Unenroll user from a course
     */
    public function unenroll(Request $request, $id): JsonResponse
    {
        $userId = $request->user()->id;
        
        // Remove all progress for this course
        DB::table('user_progress')
            ->whereIn('lesson_id', function ($query) use ($id) {
                $query->select('id')
                    ->from('lessons')
                    ->where('module_id', $id);
            })
            ->where('user_id', $userId)
            ->delete();
        
        return response()->json(['message' => 'Unenrolled successfully']);
    }
    
    /**
     * Calculate progress
     */
    private function calculateProgress(int $moduleId, int $userId): int
    {
        $totalLessons = DB::table('lessons')
            ->where('module_id', $moduleId)
            ->where('published', true)
            ->count();
        
        if ($totalLessons === 0) {
            return 0;
        }
        
        $completedLessons = DB::table('user_progress')
            ->whereIn('lesson_id', function ($query) use ($moduleId) {
                $query->select('id')
                    ->from('lessons')
                    ->where('module_id', $moduleId)
                    ->where('published', true);
            })
            ->where('user_id', $userId)
            ->where('completed', true)
            ->count();
        
        return (int) round(($completedLessons / $totalLessons) * 100);
    }
}

