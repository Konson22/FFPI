<?php

namespace App\Services\Moodle;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Cache;

class MoodleApiService
{
    protected $baseUrl;
    protected $token;
    protected $timeout;

    public function __construct()
    {
        $this->baseUrl = config('lms.moodle.base_url');
        $this->token = config('lms.moodle.token');
        $this->timeout = 30;
    }

    /**
     * Make a request to Moodle Web Services API
     */
    protected function makeRequest(string $function, array $params = []): array
    {
        $url = $this->baseUrl . '/webservice/rest/server.php';
        
        $requestParams = array_merge([
            'wstoken' => $this->token,
            'wsfunction' => $function,
            'moodlewsrestformat' => 'json',
        ], $params);

        try {
            $response = Http::timeout($this->timeout)
                ->get($url, $requestParams);

            if ($response->successful()) {
                $data = $response->json();
                
                // Check for Moodle API errors
                if (isset($data['exception'])) {
                    Log::error('Moodle API Error', [
                        'function' => $function,
                        'error' => $data['message'] ?? 'Unknown error',
                        'errorcode' => $data['errorcode'] ?? 'unknown'
                    ]);
                    throw new \Exception($data['message'] ?? 'Moodle API error');
                }

                return $data;
            } else {
                Log::error('Moodle API HTTP Error', [
                    'function' => $function,
                    'status' => $response->status(),
                    'body' => $response->body()
                ]);
                throw new \Exception('Failed to connect to Moodle API');
            }
        } catch (\Exception $e) {
            Log::error('Moodle API Request Failed', [
                'function' => $function,
                'error' => $e->getMessage()
            ]);
            throw $e;
        }
    }

    /**
     * Get all courses from Moodle
     */
    public function getCourses(array $options = []): array
    {
        $cacheKey = 'moodle_courses_' . md5(serialize($options));
        
        return Cache::remember($cacheKey, 300, function () use ($options) {
            $params = [];
            
            if (isset($options['categoryid'])) {
                $params['criteria'][0]['key'] = 'category';
                $params['criteria'][0]['value'] = $options['categoryid'];
            }
            
            if (isset($options['search'])) {
                $params['criteria'][1]['key'] = 'search';
                $params['criteria'][1]['value'] = $options['search'];
            }

            return $this->makeRequest('core_course_get_courses', $params);
        });
    }

    /**
     * Get course content (modules and activities)
     */
    public function getCourseContent(int $courseId): array
    {
        $cacheKey = "moodle_course_content_{$courseId}";
        
        return Cache::remember($cacheKey, 600, function () use ($courseId) {
            return $this->makeRequest('core_course_get_contents', [
                'courseid' => $courseId
            ]);
        });
    }

    /**
     * Get course categories
     */
    public function getCategories(): array
    {
        $cacheKey = 'moodle_categories';
        
        return Cache::remember($cacheKey, 1800, function () {
            return $this->makeRequest('core_course_get_categories');
        });
    }

    /**
     * Enroll user in a course
     */
    public function enrollUser(int $courseId, int $userId, int $roleId = 5): array
    {
        return $this->makeRequest('enrol_manual_enrol_users', [
            'enrolments' => [
                [
                    'roleid' => $roleId, // Student role
                    'userid' => $userId,
                    'courseid' => $courseId
                ]
            ]
        ]);
    }

    /**
     * Unenroll user from a course
     */
    public function unenrollUser(int $courseId, int $userId): array
    {
        return $this->makeRequest('enrol_manual_unenrol_users', [
            'enrolments' => [
                [
                    'userid' => $userId,
                    'courseid' => $courseId
                ]
            ]
        ]);
    }

    /**
     * Get user's enrolled courses
     */
    public function getUserCourses(int $userId): array
    {
        return $this->makeRequest('core_enrol_get_users_courses', [
            'userid' => $userId
        ]);
    }

    /**
     * Get course completion status
     */
    public function getCourseCompletion(int $courseId, int $userId): array
    {
        return $this->makeRequest('core_completion_get_course_completion_status', [
            'courseid' => $courseId,
            'userid' => $userId
        ]);
    }

    /**
     * Get activity completion status
     */
    public function getActivityCompletion(int $courseId, int $userId): array
    {
        return $this->makeRequest('core_completion_get_activities_completion_status', [
            'courseid' => $courseId,
            'userid' => $userId
        ]);
    }

    /**
     * Create or update user in Moodle
     */
    public function createUser(array $userData): array
    {
        return $this->makeRequest('core_user_create_users', [
            'users' => [$userData]
        ]);
    }

    /**
     * Get user by email
     */
    public function getUserByEmail(string $email): array
    {
        return $this->makeRequest('core_user_get_users', [
            'criteria' => [
                [
                    'key' => 'email',
                    'value' => $email
                ]
            ]
        ]);
    }

    /**
     * Update user password
     */
    public function updateUserPassword(int $userId, string $password): array
    {
        return $this->makeRequest('core_user_update_users', [
            'users' => [
                [
                    'id' => $userId,
                    'password' => $password
                ]
            ]
        ]);
    }

    /**
     * Get course grades
     */
    public function getCourseGrades(int $courseId, int $userId): array
    {
        return $this->makeRequest('gradereport_user_get_grades_table', [
            'courseid' => $courseId,
            'userid' => $userId
        ]);
    }

    /**
     * Test Moodle connection
     */
    public function testConnection(): bool
    {
        try {
            $this->makeRequest('core_webservice_get_site_info');
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }
}
