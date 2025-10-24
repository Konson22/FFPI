<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Lms\CourseController;
use App\Http\Controllers\Lms\LessonController;
use App\Http\Controllers\Lms\EnrollmentController;
use App\Http\Controllers\Lms\ProgressController;
use App\Http\Controllers\Lms\GamificationController;
use App\Http\Controllers\Lms\QuizController;
use App\Http\Controllers\Lms\CertificateController;
use App\Http\Controllers\Lms\FeedbackController;
use App\Http\Controllers\Lms\CategoryController;

/*
|--------------------------------------------------------------------------
| LMS API Routes
|--------------------------------------------------------------------------
|
| Isolated routes for the LMS module
| All routes are prefixed with /api/lms and require authentication
|
*/

Route::middleware(['auth:sanctum'])->prefix('lms')->group(function () {
    
    // Categories
    Route::get('/categories', [CategoryController::class, 'index']);
    Route::get('/categories/{id}', [CategoryController::class, 'show']);
    
    // Courses & Discovery
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/search', [CourseController::class, 'search']);
    Route::get('/courses/{id}', [CourseController::class, 'show']);
    Route::get('/courses/{id}/reviews', [CourseController::class, 'reviews']);
    Route::post('/courses/{id}/reviews', [CourseController::class, 'submitReview']);
    
    // Lessons
    Route::get('/courses/{courseId}/lessons', [LessonController::class, 'index']);
    Route::get('/lessons/{id}', [LessonController::class, 'show']);
    Route::get('/lessons/{id}/quiz', [QuizController::class, 'show']);
    Route::get('/lessons/{id}/quiz/attempts', [QuizController::class, 'attempts']);
    
    // Quizzes
    Route::post('/quizzes/{id}/submit', [QuizController::class, 'submit']);
    
    // Enrollments
    Route::get('/enrollments', [EnrollmentController::class, 'index']);
    Route::post('/courses/{id}/enroll', [EnrollmentController::class, 'enroll']);
    Route::delete('/courses/{id}/enroll', [EnrollmentController::class, 'unenroll']);
    
    // Progress Tracking
    Route::get('/courses/{courseId}/progress', [ProgressController::class, 'show']);
    Route::post('/progress', [ProgressController::class, 'update']);
    Route::get('/progress/resume', [ProgressController::class, 'resume']);
    
    // Gamification
    Route::get('/wallet', [GamificationController::class, 'wallet']);
    Route::post('/xp', [GamificationController::class, 'postXP']);
    Route::get('/badges', [GamificationController::class, 'badges']);
    
    // Certificates
    Route::get('/certificates', [CertificateController::class, 'index']);
    Route::post('/certificates', [CertificateController::class, 'generate']);
    
    // Feedback & Reviews
    Route::post('/feedback', [FeedbackController::class, 'submit']);
    
    // Downloads (stub - track on frontend)
    Route::get('/downloads', function () {
        return response()->json([]);
    });
    Route::post('/downloads', function () {
        return response()->json(['message' => 'Download tracked']);
    });
    Route::delete('/downloads/{id}', function () {
        return response()->json(['message' => 'Download removed']);
    });
    
    // Analytics (optional - log events)
    Route::post('/analytics/track', function () {
        return response()->json(['status' => 'ok']);
    });
    Route::post('/analytics/identify', function () {
        return response()->json(['status' => 'ok']);
    });
    Route::post('/analytics/page', function () {
        return response()->json(['status' => 'ok']);
    });
    
    // Cohorts
    Route::get('/cohorts', function () {
        return response()->json([]);
    });
});

