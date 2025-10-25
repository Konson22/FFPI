<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailPreviewController;
use App\Http\Controllers\Guest\PageController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\LearnController as UserLearnController;
use App\Http\Controllers\User\CommunityController;
use App\Http\Controllers\Expert\DashboardController as ExpertDashboardController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;

// Include auth routes
require __DIR__.'/auth.php';

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

// Guest Routes (Public)

Route::get('/', [PageController::class, 'index'])->name('home');
Route::get('/about', [PageController::class, 'about'])->name('about');
Route::get('/services', [PageController::class, 'services'])->name('services');
Route::get('/contact', [PageController::class, 'contact'])->name('contact');
Route::get('/faq', [PageController::class, 'faq'])->name('faq');
Route::get('/team', [PageController::class, 'team'])->name('team');
Route::get('/learn/srhr', [PageController::class, 'srhr'])->name('learn.srhr');
Route::get('/reports', [PageController::class, 'reports'])->name('reports');


// User Routes (Authenticated Users)
Route::middleware(['auth', 'role:user'])->prefix('user')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    Route::get('/learn', [UserLearnController::class, 'index'])->name('user.learn');
    Route::get('/learn/browse', [UserLearnController::class, 'browse'])->name('user.learn.browse');
    Route::post('/learn/enroll/{id}', [UserLearnController::class, 'enroll'])->name('user.learn.enroll');
    Route::get('/learn/course/{id}', [UserLearnController::class, 'showCourse'])->name('user.learn.course');
    Route::get('/learn/module/{id}', [UserLearnController::class, 'showModule'])->name('user.learn.module');
    Route::get('/learn/{id}', [UserLearnController::class, 'show'])->name('user.learn.show'); // Legacy route
    Route::get('/learn/{moduleId}/lesson/{lessonId}', [UserLearnController::class, 'lesson'])->name('user.learn.lesson');
    Route::get('/community', [CommunityController::class, 'index'])->name('user.community.index');
    Route::get('/health', [UserDashboardController::class, 'health'])->name('user.health.index');
    Route::get('/profile', [UserDashboardController::class, 'profile'])->name('user.profile.index');
    Route::get('/users', [UserDashboardController::class, 'users'])->name('user.users');
    Route::get('/family-planning', [UserDashboardController::class, 'familyPlanning'])->name('user.family-planning');
    Route::get('/appointments', [UserDashboardController::class, 'appointments'])->name('user.appointments');
    Route::get('/resources', [UserDashboardController::class, 'resources'])->name('user.resources');
});

// Expert Routes (Healthcare Professionals)
Route::middleware(['auth', 'role:expert'])->prefix('expert')->group(function () {
    Route::get('/dashboard', [ExpertDashboardController::class, 'index'])->name('expert.dashboard');
    Route::get('/patients', [ExpertDashboardController::class, 'patients'])->name('expert.patients');
    Route::get('/appointments', [ExpertDashboardController::class, 'appointments'])->name('expert.appointments');
    Route::get('/resources', [ExpertDashboardController::class, 'resources'])->name('expert.resources');
    Route::get('/reports', [ExpertDashboardController::class, 'reports'])->name('expert.reports');
});

// Admin Routes (System Administrators)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/dashboard', [AdminDashboardController::class, 'index'])->name('admin.dashboard');
    Route::get('/users', [AdminDashboardController::class, 'users'])->name('admin.users');
    Route::get('/experts', [AdminDashboardController::class, 'experts'])->name('admin.experts');
    Route::get('/analytics', [AdminDashboardController::class, 'analytics'])->name('admin.analytics');
    Route::get('/settings', [AdminDashboardController::class, 'settings'])->name('admin.settings');
});


// Email preview routes (only in development)
if (app()->environment('local', 'development')) {
    Route::get('/email-preview/welcome', [EmailPreviewController::class, 'welcome'])->name('email.preview.welcome');
    Route::get('/email-preview/verify-email', [EmailPreviewController::class, 'verifyEmail'])->name('email.preview.verify');
    Route::get('/email-preview/user-registered', [EmailPreviewController::class, 'userRegistered'])->name('email.preview.user-registered');
}