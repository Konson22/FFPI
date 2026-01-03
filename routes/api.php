<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ModulesController;
use App\Http\Controllers\Api\UserHealthController;
use App\Http\Controllers\Api\HealthServiceController;
use App\Http\Controllers\Api\AskController;
use App\Http\Controllers\Api\SupportContactController;
use App\Http\Controllers\Api\BlogController;

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
    Route::post('expo-token', [AuthController::class, 'storeExpoToken']);
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
    Route::post('doctor-profile', [AuthController::class, 'storeDoctor']);
    Route::get('doctors/{id}', [DoctorController::class, 'show']);
    
    // Modules routes
    Route::prefix('modules')->group(function () {
        Route::get('/', [ModulesController::class, 'index']); // Get all modules
        Route::get('/{moduleId}/lessons/{lessonId}/quizzes', [ModulesController::class, 'getLessonQuizzes']); // Get quiz questions for a lesson (more specific route first)
        Route::post('/{moduleId}/lessons/{lessonId}/quiz-score', [ModulesController::class, 'submitQuizScore']); // Submit quiz answers and get score
        Route::post('/{id}/enroll', [ModulesController::class, 'enroll']); // Enroll in a module
        Route::get('/{id}', [ModulesController::class, 'show']); // Get specific module
    });
    
    // Ask/Questions routes (protected)
    Route::prefix('ask')->group(function () {
        Route::get('/', [AskController::class, 'index']); // List questions with filters
        Route::post('/questions', [AskController::class, 'storeQuestion']); // Submit a question
        Route::get('/questions/{id}', [AskController::class, 'show']); // Get a specific question
        Route::post('/questions/{questionId}/answers', [AskController::class, 'storeAnswer']); // Submit an answer
        Route::post('/answers/{answerId}/accept', [AskController::class, 'acceptAnswer']); // Accept an answer
    });
    
    // Support Contacts routes (protected - create, update, delete)
    Route::get('support-contacts', [SupportContactController::class, 'index']); 
    
    // Blog routes (protected - create, update, delete)
    Route::prefix('blogs')->group(function () {
        Route::get('/', [BlogController::class, 'index']);
        Route::get('/categories', [BlogController::class, 'categories']);
        Route::get('/{id}', [BlogController::class, 'show']);
        Route::post('/', [BlogController::class, 'store']);
        Route::put('/{id}', [BlogController::class, 'update']);
    });
    
});

// Health Services routes (public)
Route::prefix('health-services')->group(function () {
    Route::get('/', [HealthServiceController::class, 'index']); // List all health services with filters
    Route::get('/nearby', [HealthServiceController::class, 'nearby']); // Get nearby services
    Route::get('/{id}', [HealthServiceController::class, 'show']); // Get specific health service
});

// Support Contacts routes (public - read only)
Route::prefix('support-contacts')->group(function () {
    Route::get('/', [SupportContactController::class, 'index']); // List all support contacts with filters
    Route::get('/categories', [SupportContactController::class, 'categories']); // Get all categories
    Route::get('/{id}', [SupportContactController::class, 'show']); // Get specific support contact
});

// Blog routes (public - read only)
Route::prefix('blogs')->group(function () {
    Route::get('/', [BlogController::class, 'index']); // List all blogs with filters
    Route::get('/categories', [BlogController::class, 'categories']); // Get all categories
    Route::get('/{id}', [BlogController::class, 'show']); // Get specific blog
});

