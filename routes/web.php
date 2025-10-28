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

// Include admin routes
require __DIR__.'/admin.php';

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
    
    // Debug route
    Route::get('/learn-debug', function() {
        try {
            $user = auth()->user();
            $courses = \App\Models\Course::active()->get();
            return response()->json([
                'user' => $user->id,
                'courses_count' => $courses->count(),
                'enrolled_count' => $user->enrolledCourses()->count()
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    });
    
    Route::get('/learn', [UserLearnController::class, 'index'])->name('user.learn');
    Route::get('/learn/browse', [UserLearnController::class, 'browse'])->name('user.learn.browse');
    Route::post('/learn/enroll/{id}', [UserLearnController::class, 'enroll'])->name('user.learn.enroll');
    Route::get('/learn/course/{id}', [UserLearnController::class, 'showCourse'])->name('user.learn.course');
    Route::get('/learn/moodle/{id}', [UserLearnController::class, 'moodleCourse'])->name('user.learn.moodle');
    Route::get('/learn/module/{id}', [UserLearnController::class, 'showModule'])->name('user.learn.module');
    Route::get('/learn/{id}', [UserLearnController::class, 'show'])->name('user.learn.show'); // Legacy route
    Route::get('/learn/{moduleId}/lesson/{lessonId}', [UserLearnController::class, 'lesson'])->name('user.learn.lesson');
    
    // Quiz and Challenges
    Route::get('/quiz', [UserDashboardController::class, 'quiz'])->name('user.quiz');
    
    // Ask a Question
    Route::get('/ask', [UserDashboardController::class, 'ask'])->name('user.ask');
    
    // Services Near You
    Route::get('/services', [UserDashboardController::class, 'services'])->name('user.services');
    
    // Relationship Zone
    Route::get('/relationships', [UserDashboardController::class, 'relationships'])->name('user.relationships');
    
    // Community Stories
    Route::get('/community', [UserDashboardController::class, 'community'])->name('user.community');
    
    // Health Tracking
    Route::get('/health', [UserDashboardController::class, 'health'])->name('user.health');
    
    // Profile
    Route::get('/profile', [UserDashboardController::class, 'profile'])->name('user.profile');
    
    Route::get('/users', [UserDashboardController::class, 'users'])->name('user.users');
    Route::get('/family-planning', [UserDashboardController::class, 'familyPlanning'])->name('user.family-planning');
    Route::get('/appointments', [UserDashboardController::class, 'appointments'])->name('user.appointments');
    Route::get('/resources', [UserDashboardController::class, 'resources'])->name('user.resources');
    
    // Simple admin route
    Route::get('/admin', function () {
        return Inertia::render('admin/simple-dashboard', [
            'user' => auth()->user()
        ]);
    })->name('admin.simple');
});

// Expert Routes (Healthcare Professionals)
Route::middleware(['auth', 'role:expert'])->prefix('expert')->group(function () {
    Route::get('/dashboard', [ExpertDashboardController::class, 'index'])->name('expert.dashboard');
    Route::get('/patients', [ExpertDashboardController::class, 'patients'])->name('expert.patients');
    Route::get('/appointments', [ExpertDashboardController::class, 'appointments'])->name('expert.appointments');
    Route::get('/resources', [ExpertDashboardController::class, 'resources'])->name('expert.resources');
    Route::get('/reports', [ExpertDashboardController::class, 'reports'])->name('expert.reports');
});

// Admin Routes are now handled in routes/admin.php


// Email preview routes (only in development)
if (app()->environment('local', 'development')) {
    Route::get('/email-preview/welcome', [EmailPreviewController::class, 'welcome'])->name('email.preview.welcome');
    Route::get('/email-preview/verify-email', [EmailPreviewController::class, 'verifyEmail'])->name('email.preview.verify');
    Route::get('/email-preview/user-registered', [EmailPreviewController::class, 'userRegistered'])->name('email.preview.user-registered');
}