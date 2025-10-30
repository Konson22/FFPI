<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ModulesController;
use App\Http\Controllers\Api\EducationalResourseController;
use App\Http\Controllers\Api\FertilityTrackingController;
use App\Http\Controllers\Api\UserHealthController;

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
Route::get('modules2', [ModulesController::class, 'index']);
Route::get('modules2/{id}', [ModulesController::class, 'show']);
Route::get('nearby-services', [UserHealthController::class, 'getNearbyServices']);
Route::get('export', [UserHealthController::class, 'exportHealthData']);



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
    
    // Health API routes
    Route::prefix('health')->group(function () {
        // Route::get('dashboard', [UserHealthController::class, 'dashboard']);
        // Route::get('analytics', [UserHealthController::class, 'getHealthAnalytics']);
        // Route::get('nearby-services', [UserHealthController::class, 'getNearbyServices']);
        // Route::get('export', [UserHealthController::class, 'exportHealthData']);
        
        // Fertility tracking CRUD
        Route::post('fertility-tracking', [UserHealthController::class, 'storeFertilityTracking']);
        Route::get('fertility-history', [UserHealthController::class, 'getFertilityHistory']);
        Route::put('fertility-tracking/{id}', [UserHealthController::class, 'updateFertilityTracking']);
        Route::delete('fertility-tracking/{id}', [UserHealthController::class, 'deleteFertilityTracking']);
    });
    
    
    // Modules routes
    Route::prefix('modules')->group(function () {
        Route::get('/', [ModulesController::class, 'index']); // Get all modules
        Route::get('/browse', [ModulesController::class, 'browse']); // Browse all modules
        Route::get('/{id}', [ModulesController::class, 'show']); // Get specific module
    });
});
