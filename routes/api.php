<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\GoogleAuthController;
// use App\Http\Controllers\Api\AppointmentController;
use App\Http\Controllers\Api\DoctorController;
// use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\CycleSymptomController;
// use App\Http\Controllers\Api\CycleTrackingController;
use App\Http\Controllers\Api\CyclePhaseController;
use App\Http\Controllers\Api\FertilityIndicatorController;
use App\Http\Controllers\ResourceController;

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

// Public authentication routes
Route::get('/modules', [ResourceController::class, 'index']);

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

// Google OAuth routes
Route::post('google/login', [GoogleAuthController::class, 'login']); // token-based
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
});

// ===== LMS Module Routes (Isolated, Additive-Only) =====
// Include LMS routes only if LMS is enabled in config
if (config('lms.enabled', false)) {
    require __DIR__.'/lms.php';
}

