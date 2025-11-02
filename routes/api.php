<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
use App\Http\Controllers\Api\DoctorController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\ModulesController;
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
    
    // Modules routes
    Route::prefix('modules')->group(function () {
        Route::get('/', [ModulesController::class, 'index']); // Get all modules
        Route::get('/browse', [ModulesController::class, 'browse']); // Browse all modules
        Route::get('/{id}', [ModulesController::class, 'show']); // Get specific module
    });
    
});
Route::get('modules2', [ModulesController::class, 'index']);
Route::get('doctors2', [DoctorController::class, 'index']);
