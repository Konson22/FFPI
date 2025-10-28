<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Services\Moodle\MoodleLmsAdapter;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class MoodleController extends Controller
{
    protected $moodleAdapter;

    public function __construct(MoodleLmsAdapter $moodleAdapter)
    {
        $this->moodleAdapter = $moodleAdapter;
    }

    /**
     * Sync courses from Moodle
     */
    public function syncCourses(): JsonResponse
    {
        try {
            $courses = $this->moodleAdapter->syncCourses();
            
            return response()->json([
                'success' => true,
                'message' => 'Courses synced successfully',
                'courses_count' => count($courses)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to sync courses: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Moodle courses for user
     */
    public function getMoodleCourses(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $courses = Course::whereNotNull('moodle_id')
                ->where('is_active', true)
                ->with(['modules.lessons'])
                ->get()
                ->map(function ($course) use ($user) {
                    $enrollment = $user->enrolledCourses()
                        ->wherePivot('course_id', $course->id)
                        ->first();
                    
                    return [
                        'id' => $course->id,
                        'title' => $course->title,
                        'description' => $course->description,
                        'category' => $course->category,
                        'moodle_id' => $course->moodle_id,
                        'is_enrolled' => $enrollment ? true : false,
                        'enrollment_status' => $enrollment ? $enrollment->pivot->status : null,
                        'progress_percentage' => $enrollment ? $enrollment->pivot->progress_percentage : 0,
                        'moodle_url' => $this->moodleAdapter->getCourseUrl($course->id),
                        'modules_count' => $course->modules->count(),
                        'lessons_count' => $course->modules->sum(function ($module) {
                            return $module->lessons->count();
                        })
                    ];
                });

            return response()->json($courses);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get Moodle courses: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Enroll user in Moodle course
     */
    public function enrollInMoodleCourse(Request $request, int $courseId): JsonResponse
    {
        try {
            $user = Auth::user();
            $course = Course::findOrFail($courseId);

            if (!$course->moodle_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'This course is not available in Moodle'
                ], 400);
            }

            $success = $this->moodleAdapter->enrollUser($user->id, $courseId);

            if ($success) {
                return response()->json([
                    'success' => true,
                    'message' => 'Successfully enrolled in Moodle course',
                    'moodle_url' => $this->moodleAdapter->getCourseUrl($courseId)
                ]);
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to enroll in Moodle course'
                ], 500);
            }
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to enroll: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Sync user progress from Moodle
     */
    public function syncProgress(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            $this->moodleAdapter->syncUserProgress($user->id);

            return response()->json([
                'success' => true,
                'message' => 'Progress synced successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to sync progress: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Test Moodle connection
     */
    public function testConnection(): JsonResponse
    {
        try {
            $isConnected = $this->moodleAdapter->testConnection();
            
            return response()->json([
                'success' => $isConnected,
                'message' => $isConnected ? 'Moodle connection successful' : 'Moodle connection failed'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Moodle connection test failed: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get Moodle course content
     */
    public function getCourseContent(Request $request, int $courseId): JsonResponse
    {
        try {
            $course = Course::findOrFail($courseId);
            
            if (!$course->moodle_id) {
                return response()->json([
                    'success' => false,
                    'message' => 'This course is not available in Moodle'
                ], 400);
            }

            $course->load(['modules.lessons']);
            
            $content = [
                'course' => [
                    'id' => $course->id,
                    'title' => $course->title,
                    'description' => $course->description,
                    'moodle_url' => $this->moodleAdapter->getCourseUrl($courseId)
                ],
                'modules' => $course->modules->map(function ($module) {
                    return [
                        'id' => $module->id,
                        'title' => $module->title,
                        'description' => $module->description,
                        'order' => $module->order,
                        'lessons' => $module->lessons->map(function ($lesson) {
                            return [
                                'id' => $lesson->id,
                                'title' => $lesson->title,
                                'content' => $lesson->content,
                                'lesson_type' => $lesson->lesson_type,
                                'order' => $lesson->order,
                                'duration_sec' => $lesson->duration_sec,
                                'media_url' => $lesson->media_url
                            ];
                        })
                    ];
                })
            ];

            return response()->json($content);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get course content: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user's Moodle enrollment status
     */
    public function getEnrollmentStatus(Request $request, int $courseId): JsonResponse
    {
        try {
            $user = Auth::user();
            $course = Course::findOrFail($courseId);

            $enrollment = $user->enrolledCourses()
                ->wherePivot('course_id', $courseId)
                ->first();

            return response()->json([
                'is_enrolled' => $enrollment ? true : false,
                'status' => $enrollment ? $enrollment->pivot->status : null,
                'progress_percentage' => $enrollment ? $enrollment->pivot->progress_percentage : 0,
                'enrolled_at' => $enrollment ? $enrollment->pivot->enrolled_at : null,
                'completed_at' => $enrollment ? $enrollment->pivot->completed_at : null,
                'moodle_enrolled' => $enrollment ? $enrollment->pivot->moodle_enrolled : false,
                'moodle_url' => $course->moodle_id ? $this->moodleAdapter->getCourseUrl($courseId) : null
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to get enrollment status: ' . $e->getMessage()
            ], 500);
        }
    }
}
