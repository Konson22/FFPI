<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\GoogleAuthController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\VerifyEmailController;
use Illuminate\Support\Facades\Route;


Route::middleware('guest')->group(function () {
    Route::get('register', [RegisterController::class, 'showRegistrationForm'])
        ->name('register');

    Route::post('register', [RegisterController::class, 'register']);

    Route::get('login', [RegisterController::class, 'showLoginForm'])
        ->name('login');

    Route::post('login', [RegisterController::class, 'login']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
        ->name('auth.password.request');

    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
        ->name('auth.password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
        ->name('auth.password.reset');

    Route::post('reset-password', [NewPasswordController::class, 'store'])
        ->name('auth.password.store');

    // Google OAuth (guest)
    Route::get('auth/google', [GoogleAuthController::class, 'redirectToGoogle'])
        ->name('auth.google');
});

// Google OAuth callback (no middleware - handles authentication internally)
Route::get('auth/google/callback', [GoogleAuthController::class, 'handleGoogleCallback'])
    ->name('auth.google.callback');

// Email verification routes (accessible without auth for initial verification)
Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
    ->middleware(['signed', 'throttle:6,1'])
    ->name('verification.verify');

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
        ->name('verification.notice');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
        ->middleware('throttle:6,1')
        ->name('auth.verification.send');

    Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
        ->name('auth.password.confirm');

    Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

    // Google account link/unlink (authenticated)
    Route::post('auth/google/link', [GoogleAuthController::class, 'linkGoogleAccount'])
        ->name('auth.google.link');
    Route::post('auth/google/unlink', [GoogleAuthController::class, 'unlinkGoogleAccount'])
        ->name('auth.google.unlink');
});

// Logout route (accessible without auth middleware)
Route::post('logout', [RegisterController::class, 'logout'])
    ->name('logout');
