<?php

namespace App\Services\Moodle;

use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\UserProgress;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;

class MoodleLmsAdapter
{
    protected $moodleApi;

    public function __construct(MoodleApiService $moodleApi)
    {
        $this->moodleApi = $moodleApi;
    }

    /**
     * Sync courses from Moodle to local database
     */
    public function syncCourses(): array
    {
        try {
            $moodleCourses = $this->moodleApi->getCourses();
            $syncedCourses = [];

            foreach ($moodleCourses as $moodleCourse) {
                if ($moodleCourse['id'] == 1) continue; // Skip site course

                $course = Course::updateOrCreate(
                    ['moodle_id' => $moodleCourse['id']],
                    [
                        'title' => $moodleCourse['fullname'],
                        'description' => $moodleCourse['summary'] ?? '',
                        'category' => $this->getCategoryName($moodleCourse['categoryid']),
                        'course_code' => 'MOODLE-' . $moodleCourse['id'],
                        'is_active' => $moodleCourse['visible'] == 1,
                        'order' => $moodleCourse['sortorder'] ?? 0,
                        'moodle_data' => json_encode($moodleCourse)
                    ]
                );

                $syncedCourses[] = $course;
                
                // Sync course content
                $this->syncCourseContent($course->id, $moodleCourse['id']);
            }

            Log::info('Moodle courses synced', ['count' => count($syncedCourses)]);
            return $syncedCourses;

        } catch (\Exception $e) {
            Log::error('Failed to sync Moodle courses', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Sync course content (modules and lessons) from Moodle
     */
    public function syncCourseContent(int $courseId, int $moodleCourseId): void
    {
        try {
            $courseContent = $this->moodleApi->getCourseContent($moodleCourseId);

            foreach ($courseContent as $section) {
                if (empty($section['modules'])) continue;

                // Create module for each section
                $module = Module::updateOrCreate(
                    [
                        'course_id' => $courseId,
                        'moodle_id' => $section['id']
                    ],
                    [
                        'title' => $section['name'] ?: 'Section ' . $section['id'],
                        'description' => $section['summary'] ?? '',
                        'module_code' => 'MOD-' . $section['id'],
                        'order' => $section['section'] ?? 0,
                        'is_active' => true,
                        'moodle_data' => json_encode($section)
                    ]
                );

                // Create lessons for each activity
                foreach ($section['modules'] as $activity) {
                    $this->createLessonFromActivity($module->id, $activity);
                }
            }

        } catch (\Exception $e) {
            Log::error('Failed to sync course content', [
                'course_id' => $courseId,
                'moodle_course_id' => $moodleCourseId,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Create lesson from Moodle activity
     */
    protected function createLessonFromActivity(int $moduleId, array $activity): Lesson
    {
        $lessonType = $this->mapActivityType($activity['modname']);
        
        return Lesson::updateOrCreate(
            [
                'module_id' => $moduleId,
                'moodle_id' => $activity['id']
            ],
            [
                'title' => $activity['name'],
                'content' => $activity['description'] ?? '',
                'lesson_type' => $lessonType,
                'order' => $activity['position'] ?? 0,
                'is_active' => $activity['visible'] == 1,
                'duration_sec' => $activity['duration'] ?? null,
                'media_url' => $this->extractMediaUrl($activity),
                'moodle_data' => json_encode($activity)
            ]
        );
    }

    /**
     * Map Moodle activity type to lesson type
     */
    protected function mapActivityType(string $modname): string
    {
        $mapping = [
            'video' => 'video',
            'resource' => 'document',
            'page' => 'html',
            'quiz' => 'quiz',
            'forum' => 'discussion',
            'assign' => 'assignment',
            'url' => 'link',
            'book' => 'book',
            'lesson' => 'lesson',
            'scorm' => 'scorm',
            'hvp' => 'interactive'
        ];

        return $mapping[$modname] ?? 'content';
    }

    /**
     * Extract media URL from activity
     */
    protected function extractMediaUrl(array $activity): ?string
    {
        if (isset($activity['contents'])) {
            foreach ($activity['contents'] as $content) {
                if ($content['type'] === 'file' && $this->isVideoFile($content['filename'])) {
                    return $content['fileurl'];
                }
            }
        }

        return null;
    }

    /**
     * Check if file is a video
     */
    protected function isVideoFile(string $filename): bool
    {
        $videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'webm', 'mkv'];
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));
        return in_array($extension, $videoExtensions);
    }

    /**
     * Get category name by ID
     */
    protected function getCategoryName(int $categoryId): string
    {
        try {
            $categories = $this->moodleApi->getCategories();
            foreach ($categories as $category) {
                if ($category['id'] == $categoryId) {
                    return $category['name'];
                }
            }
        } catch (\Exception $e) {
            Log::warning('Failed to get category name', ['category_id' => $categoryId]);
        }

        return 'General';
    }

    /**
     * Enroll user in Moodle course
     */
    public function enrollUser(int $userId, int $courseId): bool
    {
        try {
            $user = User::find($userId);
            $course = Course::find($courseId);

            if (!$user || !$course || !$course->moodle_id) {
                return false;
            }

            // Create Moodle user if doesn't exist
            $moodleUserId = $this->ensureMoodleUser($user);

            // Enroll in Moodle
            $this->moodleApi->enrollUser($course->moodle_id, $moodleUserId);

            // Create local enrollment
            $user->enrolledCourses()->syncWithoutDetaching([
                $courseId => [
                    'status' => 'enrolled',
                    'enrolled_at' => now(),
                    'progress_percentage' => 0,
                    'moodle_enrolled' => true
                ]
            ]);

            Log::info('User enrolled in Moodle course', [
                'user_id' => $userId,
                'course_id' => $courseId,
                'moodle_user_id' => $moodleUserId
            ]);

            return true;

        } catch (\Exception $e) {
            Log::error('Failed to enroll user in Moodle course', [
                'user_id' => $userId,
                'course_id' => $courseId,
                'error' => $e->getMessage()
            ]);
            return false;
        }
    }

    /**
     * Ensure user exists in Moodle
     */
    protected function ensureMoodleUser(User $user): int
    {
        try {
            // Check if user exists in Moodle
            $moodleUsers = $this->moodleApi->getUserByEmail($user->email);
            
            if (!empty($moodleUsers['users'])) {
                $moodleUserId = $moodleUsers['users'][0]['id'];
                
                // Update user's Moodle ID
                $user->update(['moodle_id' => $moodleUserId]);
                
                return $moodleUserId;
            }

            // Create new user in Moodle
            $userData = [
                'username' => $user->email,
                'email' => $user->email,
                'firstname' => explode(' ', $user->name)[0],
                'lastname' => substr($user->name, strpos($user->name, ' ') + 1) ?: '',
                'password' => 'TempPassword123!', // User will need to reset
                'createpassword' => 1
            ];

            $result = $this->moodleApi->createUser($userData);
            $moodleUserId = $result[0]['id'];

            // Update user's Moodle ID
            $user->update(['moodle_id' => $moodleUserId]);

            return $moodleUserId;

        } catch (\Exception $e) {
            Log::error('Failed to create Moodle user', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Sync user progress from Moodle
     */
    public function syncUserProgress(int $userId): void
    {
        try {
            $user = User::find($userId);
            if (!$user || !$user->moodle_id) return;

            $moodleCourses = $this->moodleApi->getUserCourses($user->moodle_id);

            foreach ($moodleCourses as $moodleCourse) {
                $course = Course::where('moodle_id', $moodleCourse['id'])->first();
                if (!$course) continue;

                // Get completion status
                $completion = $this->moodleApi->getCourseCompletion($moodleCourse['id'], $user->moodle_id);
                
                if (isset($completion['completionstatus']['completed'])) {
                    $progressPercentage = $completion['completionstatus']['completed'] ? 100 : 0;
                    
                    // Update enrollment progress
                    $user->enrolledCourses()->updateExistingPivot($course->id, [
                        'progress_percentage' => $progressPercentage,
                        'completed_at' => $completion['completionstatus']['completed'] ? now() : null
                    ]);
                }
            }

        } catch (\Exception $e) {
            Log::error('Failed to sync user progress', [
                'user_id' => $userId,
                'error' => $e->getMessage()
            ]);
        }
    }

    /**
     * Get Moodle course URL for external access
     */
    public function getCourseUrl(int $courseId): ?string
    {
        $course = Course::find($courseId);
        if (!$course || !$course->moodle_id) {
            return null;
        }

        return config('lms.moodle.base_url') . '/course/view.php?id=' . $course->moodle_id;
    }

    /**
     * Test Moodle connection
     */
    public function testConnection(): bool
    {
        return $this->moodleApi->testConnection();
    }
}

