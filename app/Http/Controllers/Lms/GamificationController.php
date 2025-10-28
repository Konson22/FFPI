<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class GamificationController extends Controller
{
    /**
     * Get user's wallet (XP, level, etc.)
     */
    public function wallet(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        
        // Calculate XP from completed lessons (50 XP per lesson)
        $completedLessons = DB::table('user_progress')
            ->where('user_id', $userId)
            ->where('completed', true)
            ->count();
        
        $totalXP = $completedLessons * 50;
        
        // Calculate level (logarithmic)
        $level = max(1, floor(log($totalXP / 100 + 1, 2)) + 1);
        $currentLevelXP = $totalXP - (pow(2, $level - 1) * 100);
        $nextLevelXP = pow(2, $level) * 100;
        
        // Calculate streak (consecutive days with activity)
        $streak = $this->calculateStreak($userId);
        
        // Get recent XP events (stub)
        $recentEvents = [];
        
        return response()->json([
            'userId' => $userId,
            'totalXP' => $totalXP,
            'level' => $level,
            'currentLevelXP' => max(0, $currentLevelXP),
            'nextLevelXP' => $nextLevelXP,
            'streak' => $streak,
            'recent' => $recentEvents,
        ]);
    }
    
    /**
     * Post XP earning event
     */
    public function postXP(Request $request): JsonResponse
    {
        $request->validate([
            'type' => 'required|string',
            'amount' => 'required|integer|min:0',
            'context' => 'nullable|array',
        ]);
        
        // TODO: Store XP event in database
        // For MVP, XP is calculated from completed lessons
        
        return response()->json(['message' => 'XP recorded']);
    }
    
    /**
     * Get user's badges
     */
    public function badges(Request $request): JsonResponse
    {
        $userId = $request->user()->id;
        
        // Calculate badge awards based on achievements
        $badges = [];
        
        // First Lesson badge
        $firstLesson = DB::table('user_progress')
            ->where('user_id', $userId)
            ->where('completed', true)
            ->first();
        
        if ($firstLesson) {
            $badges[] = [
                'id' => 'first_lesson',
                'name' => 'First Steps',
                'description' => 'Complete your first lesson',
                'iconUrl' => '/images/badges/first_lesson.png',
                'rarity' => 'common',
                'awardedAt' => $firstLesson->created_at,
            ];
        }
        
        // Course Completionist badge
        $completedCourses = DB::table('user_progress as up')
            ->join('lessons', 'up.lesson_id', '=', 'lessons.id')
            ->join('modules', 'lessons.module_id', '=', 'modules.id')
            ->where('up.user_id', $userId)
            ->where('up.completed', true)
            ->select('modules.id')
            ->groupBy('modules.id')
            ->havingRaw('COUNT(DISTINCT lessons.id) = (SELECT COUNT(*) FROM lessons l WHERE l.module_id = modules.id AND l.published = 1)')
            ->count();
        
        if ($completedCourses >= 1) {
            $badges[] = [
                'id' => 'course_master',
                'name' => 'Course Master',
                'description' => 'Complete your first course',
                'iconUrl' => '/images/badges/course_master.png',
                'rarity' => 'rare',
                'awardedAt' => now()->toISOString(),
            ];
        }
        
        return response()->json($badges);
    }
    
    /**
     * Calculate user's streak
     */
    private function calculateStreak(int $userId): int
    {
        // Get dates of user activity
        $activityDates = DB::table('user_progress')
            ->where('user_id', $userId)
            ->selectRaw('DATE(updated_at) as activity_date')
            ->distinct()
            ->orderBy('activity_date', 'desc')
            ->pluck('activity_date')
            ->toArray();
        
        if (empty($activityDates)) {
            return 0;
        }
        
        $streak = 1;
        $today = now()->toDateString();
        $yesterday = now()->subDay()->toDateString();
        
        // Check if user was active today or yesterday
        if (!in_array($today, $activityDates) && !in_array($yesterday, $activityDates)) {
            return 0;
        }
        
        // Count consecutive days
        $currentDate = now();
        foreach ($activityDates as $date) {
            if ($date === $currentDate->toDateString()) {
                $streak++;
                $currentDate->subDay();
            } else {
                break;
            }
        }
        
        return max(1, $streak);
    }
}

