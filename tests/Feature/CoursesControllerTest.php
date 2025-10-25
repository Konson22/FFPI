<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\Module;
use App\Models\Lesson;

class CoursesControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_authenticated_user_can_create_course()
    {
        // Create a user
        $user = User::factory()->create();
        
        // Create course data
        $courseData = [
            'course_code' => 'SRHR-001',
            'title' => 'Introduction to Sexual and Reproductive Health',
            'description' => 'A comprehensive course covering the basics of SRHR.',
            'category' => 'Health Education',
            'order' => 1,
            'is_active' => true,
        ];

        // Make authenticated request
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/courses', $courseData);

        // Assert response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Course created successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'course_code',
                    'title',
                    'description',
                    'category',
                    'order',
                    'is_active',
                    'modules_count',
                    'lessons_count',
                    'enrollments_count',
                    'created_at',
                    'updated_at',
                ]
            ]);

        // Assert course was created in database
        $this->assertDatabaseHas('courses', [
            'course_code' => 'SRHR-001',
            'title' => 'Introduction to Sexual and Reproductive Health',
            'description' => 'A comprehensive course covering the basics of SRHR.',
            'category' => 'Health Education',
        ]);
    }

    public function test_unauthenticated_user_cannot_create_course()
    {
        $courseData = [
            'course_code' => 'SRHR-001',
            'title' => 'Test Course',
            'description' => 'Test description.',
            'category' => 'Health',
        ];

        $response = $this->postJson('/api/courses', $courseData);

        $response->assertStatus(401);
    }

    public function test_course_creation_requires_required_fields()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/courses', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['course_code', 'title', 'description', 'category']);
    }

    public function test_course_creation_with_duplicate_course_code()
    {
        $user = User::factory()->create();
        
        // Create first course
        Course::factory()->create(['course_code' => 'SRHR-001']);

        $courseData = [
            'course_code' => 'SRHR-001', // Duplicate course code
            'title' => 'Test Course',
            'description' => 'Test description.',
            'category' => 'Health',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/courses', $courseData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['course_code']);
    }

    public function test_can_get_all_courses()
    {
        // Create some courses
        Course::factory()->count(3)->create();

        $response = $this->getJson('/api/courses');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Courses retrieved successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'course_code',
                        'title',
                        'description',
                        'category',
                        'order',
                        'is_active',
                        'modules_count',
                        'lessons_count',
                        'enrollments_count',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);

        $this->assertCount(3, $response->json('data'));
    }

    public function test_can_get_single_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson("/api/courses/{$course->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Course retrieved successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'course_code',
                    'title',
                    'description',
                    'category',
                    'order',
                    'is_active',
                    'modules',
                    'modules_count',
                    'lessons_count',
                    'enrollments_count',
                    'enrollments',
                    'created_at',
                    'updated_at',
                ]
            ]);
    }

    public function test_can_update_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $updateData = [
            'course_code' => 'SRHR-002',
            'title' => 'Updated Course Title',
            'description' => 'Updated description.',
            'category' => 'Updated Category',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/courses/{$course->id}", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Course updated successfully.',
            ]);

        // Assert course was updated in database
        $this->assertDatabaseHas('courses', [
            'id' => $course->id,
            'course_code' => 'SRHR-002',
            'title' => 'Updated Course Title',
            'description' => 'Updated description.',
            'category' => 'Updated Category',
        ]);
    }

    public function test_can_delete_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/courses/{$course->id}");

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Course deleted successfully.',
            ]);

        // Assert course was deleted from database
        $this->assertDatabaseMissing('courses', [
            'id' => $course->id,
        ]);
    }

    public function test_cannot_delete_course_with_enrollments()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        
        // Create an enrollment
        CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->deleteJson("/api/courses/{$course->id}");

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'Cannot delete course with existing enrollments.',
            ]);
    }

    public function test_can_enroll_in_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/courses/{$course->id}/enroll");

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Successfully enrolled in course.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'enrollment_id',
                    'course_id',
                    'course_title',
                    'status',
                    'enrolled_at',
                    'progress_percentage',
                ]
            ]);

        // Assert enrollment was created
        $this->assertDatabaseHas('course_enrollments', [
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => 'enrolled',
        ]);
    }

    public function test_cannot_enroll_twice_in_same_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        
        // Create existing enrollment
        CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson("/api/courses/{$course->id}/enroll");

        $response->assertStatus(400)
            ->assertJson([
                'success' => false,
                'message' => 'User is already enrolled in this course.',
            ]);
    }

    public function test_can_get_my_enrolled_courses()
    {
        $user = User::factory()->create();
        $course1 = Course::factory()->create();
        $course2 = Course::factory()->create();
        
        // Create enrollments
        CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course1->id,
        ]);
        CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course2->id,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/courses/my/enrolled');

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Enrolled courses retrieved successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    '*' => [
                        'id',
                        'course_code',
                        'title',
                        'description',
                        'category',
                        'modules_count',
                        'lessons_count',
                        'enrollment',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);

        $this->assertCount(2, $response->json('data'));
    }

    public function test_can_update_course_progress()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        
        // Create enrollment
        $enrollment = CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => 'enrolled',
            'progress_percentage' => 0,
        ]);

        $updateData = [
            'progress_percentage' => 50,
            'status' => 'started',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/courses/{$course->id}/progress", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Progress updated successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'enrollment_id',
                    'course_id',
                    'status',
                    'progress_percentage',
                    'started_at',
                    'completed_at',
                ]
            ]);

        // Assert enrollment was updated
        $this->assertDatabaseHas('course_enrollments', [
            'id' => $enrollment->id,
            'progress_percentage' => 50,
            'status' => 'started',
        ]);
    }

    public function test_can_complete_course()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();
        
        // Create enrollment
        $enrollment = CourseEnrollment::factory()->create([
            'user_id' => $user->id,
            'course_id' => $course->id,
            'status' => 'started',
            'progress_percentage' => 50,
        ]);

        $updateData = [
            'progress_percentage' => 100,
            'status' => 'completed',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/courses/{$course->id}/progress", $updateData);

        $response->assertStatus(200)
            ->assertJson([
                'success' => true,
                'message' => 'Progress updated successfully.',
            ]);

        // Assert enrollment was updated
        $this->assertDatabaseHas('course_enrollments', [
            'id' => $enrollment->id,
            'progress_percentage' => 100,
            'status' => 'completed',
        ]);
    }

    public function test_course_not_found_returns_404()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/courses/999');

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Course not found.',
            ]);
    }

    public function test_enrollment_not_found_returns_404()
    {
        $user = User::factory()->create();
        $course = Course::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->putJson("/api/courses/{$course->id}/progress", [
                'progress_percentage' => 50,
            ]);

        $response->assertStatus(404)
            ->assertJson([
                'success' => false,
                'message' => 'Enrollment not found.',
            ]);
    }
}
