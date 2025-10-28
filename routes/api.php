<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\LearnController;
use App\Http\Controllers\Api\EducationalResourseController;
use App\Http\Controllers\Api\FertilityTrackingController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes

Route::get('learn', [EducationalResourseController::class, 'index']);




Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Google OAuth routes
Route::post('auth/google', [GoogleAuthController::class, 'login']); // token-based
Route::get('google/redirect', [GoogleAuthController::class, 'redirectToGoogle']);
Route::post('google/callback', [GoogleAuthController::class, 'handleGoogleCallbackWithCode']);


// Protected authentication routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('profile', [AuthController::class, 'profile']);
    Route::put('profile', [AuthController::class, 'updateProfile']);
    Route::post('change-password', [AuthController::class, 'changePassword']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('logout-all', [AuthController::class, 'logoutAll']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    
    // Post management routes
    Route::get('posts', [PostController::class, 'index']);
    Route::post('posts', [PostController::class, 'store']);
    Route::get('posts/{id}', [PostController::class, 'show']);
    Route::put('posts/{id}', [PostController::class, 'update']);
    Route::delete('posts/{id}', [PostController::class, 'destroy']);


    Route::get('doctors', [DoctorController::class, 'index']);
    
    // Fertility tracking routes
    Route::post('fertility-tracking', [FertilityTrackingController::class, 'store']);
    Route::get('fertility-tracking', [FertilityTrackingController::class, 'index']);
    
    // Course management routes
    Route::post('courses', [CoursesController::class, 'store']);
    Route::get('courses/{id}', [CoursesController::class, 'show']);
    Route::put('courses/{id}', [CoursesController::class, 'update']);
    Route::delete('courses/{id}', [CoursesController::class, 'destroy']);
    Route::post('courses/{id}/enroll', [CoursesController::class, 'enroll']);
    Route::get('courses/my/enrolled', [CoursesController::class, 'myCourses']);
    Route::put('courses/{id}/progress', [CoursesController::class, 'updateProgress']);
});

// ===== LMS Module Routes (Isolated, Additive-Only) =====
// Include LMS routes only if LMS is enabled in config
if (config('lms.enabled', false)) {
    require __DIR__.'/lms.php';
}

