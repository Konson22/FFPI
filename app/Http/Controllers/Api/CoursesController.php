<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Http\Requests\Api\CourseRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class CoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $courses = Course::with(['modules.lessons', 'enrollments'])
                ->active()
                ->ordered()
                ->get()
                ->map(function($course) {
                    return [
                        'id' => $course->id,
                        'course_code' => $course->course_code,
                        'title' => $course->title,
                        'description' => $course->description,
                        'category' => $course->category,
                        'order' => $course->order,
                        'is_active' => $course->is_active,
                        'modules_count' => $course->modules->count(),
                        'lessons_count' => $course->lessons->count(),
                        'enrollments_count' => $course->enrollments->count(),
                        'created_at' => $course->created_at,
                        'updated_at' => $course->updated_at,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Courses retrieved successfully.',
                'data' => $courses
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve courses.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CourseRequest $request)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Prepare course data
            $courseData = [
                'course_code' => $request->course_code,
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'order' => $request->order ?? 0,
                'is_active' => $request->is_active ?? true,
            ];

            // Create the course
            $course = Course::create($courseData);

            // Load relationships for response
            $course->load(['modules.lessons', 'enrollments']);

            // Format the response data
            $formattedCourse = [
                'id' => $course->id,
                'course_code' => $course->course_code,
                'title' => $course->title,
                'description' => $course->description,
                'category' => $course->category,
                'order' => $course->order,
                'is_active' => $course->is_active,
                'modules_count' => $course->modules->count(),
                'lessons_count' => $course->lessons->count(),
                'enrollments_count' => $course->enrollments->count(),
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at,
            ];

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Course created successfully.',
                'data' => $formattedCourse
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create course.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $course = Course::with(['modules.lessons', 'enrollments.user'])
                ->find($id);

            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found.',
                    'data' => null
                ], 404);
            }

            // Format the response data
            $formattedCourse = [
                'id' => $course->id,
                'course_code' => $course->course_code,
                'title' => $course->title,
                'description' => $course->description,
                'category' => $course->category,
                'order' => $course->order,
                'is_active' => $course->is_active,
                'modules' => $course->modules->map(function($module) {
                    return [
                        'id' => $module->id,
                        'module_code' => $module->module_code,
                        'title' => $module->title,
                        'description' => $module->description,
                        'order' => $module->order,
                        'is_active' => $module->is_active,
                        'lessons_count' => $module->lessons->count(),
                        'lessons' => $module->lessons->map(function($lesson) {
                            return [
                                'id' => $lesson->id,
                                'title' => $lesson->title,
                                'description' => $lesson->description,
                                'order' => $lesson->order,
                                'is_active' => $lesson->is_active,
                            ];
                        }),
                    ];
                }),
                'modules_count' => $course->modules->count(),
                'lessons_count' => $course->lessons->count(),
                'enrollments_count' => $course->enrollments->count(),
                'enrollments' => $course->enrollments->map(function($enrollment) {
                    return [
                        'id' => $enrollment->id,
                        'user' => [
                            'id' => $enrollment->user->id,
                            'name' => $enrollment->user->name,
                            'email' => $enrollment->user->email,
                        ],
                        'status' => $enrollment->status,
                        'enrolled_at' => $enrollment->enrolled_at,
                        'started_at' => $enrollment->started_at,
                        'completed_at' => $enrollment->completed_at,
                        'progress_percentage' => $enrollment->progress_percentage,
                    ];
                }),
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at,
            ];

            return response()->json([
                'success' => true,
                'message' => 'Course retrieved successfully.',
                'data' => $formattedCourse
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve course.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CourseRequest $request, string $id)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Find the course
            $course = Course::find($id);
            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found.',
                    'data' => null
                ], 404);
            }

            // Update course data
            $course->update([
                'course_code' => $request->course_code,
                'title' => $request->title,
                'description' => $request->description,
                'category' => $request->category,
                'order' => $request->order ?? $course->order,
                'is_active' => $request->is_active ?? $course->is_active,
            ]);

            // Load relationships for response
            $course->load(['modules.lessons', 'enrollments']);

            // Format the response data
            $formattedCourse = [
                'id' => $course->id,
                'course_code' => $course->course_code,
                'title' => $course->title,
                'description' => $course->description,
                'category' => $course->category,
                'order' => $course->order,
                'is_active' => $course->is_active,
                'modules_count' => $course->modules->count(),
                'lessons_count' => $course->lessons->count(),
                'enrollments_count' => $course->enrollments->count(),
                'created_at' => $course->created_at,
                'updated_at' => $course->updated_at,
            ];

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Course updated successfully.',
                'data' => $formattedCourse
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update course.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Find the course
            $course = Course::find($id);
            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found.',
                    'data' => null
                ], 404);
            }

            // Check if course has enrollments
            if ($course->enrollments()->count() > 0) {
                return response()->json([
                    'success' => false,
                    'message' => 'Cannot delete course with existing enrollments.',
                    'data' => null
                ], 400);
            }

            // Delete the course
            $course->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Course deleted successfully.',
                'data' => null
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete course.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Enroll a user in a course.
     */
    public function enroll(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Find the course
            $course = Course::find($id);
            if (!$course) {
                return response()->json([
                    'success' => false,
                    'message' => 'Course not found.',
                    'data' => null
                ], 404);
            }

            // Check if user is already enrolled
            $existingEnrollment = CourseEnrollment::where('user_id', $user->id)
                ->where('course_id', $course->id)
                ->first();

            if ($existingEnrollment) {
                return response()->json([
                    'success' => false,
                    'message' => 'User is already enrolled in this course.',
                    'data' => null
                ], 400);
            }

            // Create enrollment
            $enrollment = CourseEnrollment::create([
                'user_id' => $user->id,
                'course_id' => $course->id,
                'status' => 'enrolled',
                'enrolled_at' => now(),
                'progress_percentage' => 0,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Successfully enrolled in course.',
                'data' => [
                    'enrollment_id' => $enrollment->id,
                    'course_id' => $course->id,
                    'course_title' => $course->title,
                    'status' => $enrollment->status,
                    'enrolled_at' => $enrollment->enrolled_at,
                    'progress_percentage' => $enrollment->progress_percentage,
                ]
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to enroll in course.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Get user's enrolled courses.
     */
    public function myCourses()
    {
        try {
            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Get user's enrolled courses
            $enrolledCourses = $user->enrolledCourses()
                ->with(['modules.lessons'])
                ->get()
                ->map(function($course) {
                    $enrollment = $course->pivot;
                    return [
                        'id' => $course->id,
                        'course_code' => $course->course_code,
                        'title' => $course->title,
                        'description' => $course->description,
                        'category' => $course->category,
                        'modules_count' => $course->modules->count(),
                        'lessons_count' => $course->lessons->count(),
                        'enrollment' => [
                            'status' => $enrollment->status,
                            'enrolled_at' => $enrollment->enrolled_at,
                            'started_at' => $enrollment->started_at,
                            'completed_at' => $enrollment->completed_at,
                            'progress_percentage' => $enrollment->progress_percentage,
                        ],
                        'created_at' => $course->created_at,
                        'updated_at' => $course->updated_at,
                    ];
                });

            return response()->json([
                'success' => true,
                'message' => 'Enrolled courses retrieved successfully.',
                'data' => $enrolledCourses
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve enrolled courses.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Update course enrollment progress.
     */
    public function updateProgress(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Validate request
            $request->validate([
                'progress_percentage' => 'required|integer|min:0|max:100',
                'status' => 'nullable|string|in:enrolled,started,completed',
            ]);

            // Find the enrollment
            $enrollment = CourseEnrollment::where('user_id', $user->id)
                ->where('course_id', $id)
                ->first();

            if (!$enrollment) {
                return response()->json([
                    'success' => false,
                    'message' => 'Enrollment not found.',
                    'data' => null
                ], 404);
            }

            // Update enrollment
            $updateData = [
                'progress_percentage' => $request->progress_percentage,
            ];

            if ($request->status) {
                $updateData['status'] = $request->status;
                
                if ($request->status === 'started' && !$enrollment->started_at) {
                    $updateData['started_at'] = now();
                }
                
                if ($request->status === 'completed') {
                    $updateData['completed_at'] = now();
                    $updateData['progress_percentage'] = 100;
                }
            }

            $enrollment->update($updateData);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Progress updated successfully.',
                'data' => [
                    'enrollment_id' => $enrollment->id,
                    'course_id' => $id,
                    'status' => $enrollment->status,
                    'progress_percentage' => $enrollment->progress_percentage,
                    'started_at' => $enrollment->started_at,
                    'completed_at' => $enrollment->completed_at,
                ]
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update progress.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }
}
