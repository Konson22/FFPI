<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmailPreviewController;
use App\Http\Controllers\Guest\PageController;
use App\Http\Controllers\User\DashboardController as UserDashboardController;
use App\Http\Controllers\User\LearnController as UserLearnController;
use App\Http\Controllers\User\PostController as UserPostController;
use App\Http\Controllers\User\BlogController as UserBlogController;
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
Route::get('/privacy', [PageController::class, 'privacy'])->name('privacy');
Route::get('/learn/srhr', [PageController::class, 'srhr'])->name('learn.srhr');
Route::get('/climate-srhr', [PageController::class, 'climateSrhr'])->name('climate.srhr');
Route::get('/reports', [PageController::class, 'reports'])->name('reports');
Route::get('/blog', [PageController::class, 'blog'])->name('blog');
Route::get('/blog/{slug}', [PageController::class, 'blogShow'])->name('blog.show');


// User Routes (Authenticated Users)
Route::middleware(['auth', 'verified', 'role:user'])->prefix('user')->group(function () {
    Route::get('/dashboard', [UserDashboardController::class, 'index'])->name('user.dashboard');
    
    
    Route::get('/learn', [UserLearnController::class, 'index'])->name('user.learn');
    Route::post('/learn/enroll/{id}', [UserLearnController::class, 'enroll'])->name('user.learn.enroll');
    Route::get('/learn/course/{id}', [UserLearnController::class, 'showCourse'])->name('user.learn.course');
    Route::get('/learn/moodle/{id}', [UserLearnController::class, 'moodleCourse'])->name('user.learn.moodle');
    Route::get('/learn/module/{id}', [UserLearnController::class, 'showModule'])->name('user.learn.module');
    Route::get('/learn/{id}', [UserLearnController::class, 'show'])->name('user.learn.show'); // Legacy route

    // Lessons inside a module
    // More specific routes first
    Route::get('/learn/module/{moduleId}/lesson/{lessonId}/quiz/questions', [UserLearnController::class, 'getQuizQuestions'])
        ->whereNumber('moduleId')->whereNumber('lessonId')->name('user.learn.lesson.quiz.questions');
    Route::get('/learn/module/{moduleId}/lesson/{lessonId}/quiz', [UserLearnController::class, 'quiz'])
        ->whereNumber('moduleId')->whereNumber('lessonId')->name('user.learn.lesson.quiz');
    Route::get('/learn/module/{moduleId}/lesson/{lessonId}/complete', [UserLearnController::class, 'redirectFromComplete'])
        ->whereNumber('moduleId')->whereNumber('lessonId');
    Route::post('/learn/module/{moduleId}/lesson/{lessonId}/complete', [UserLearnController::class, 'completeLesson'])
        ->whereNumber('moduleId')->whereNumber('lessonId')->name('user.learn.lesson.complete');
    Route::get('/learn/module/{moduleId}/lesson/{lessonId}', [UserLearnController::class, 'lesson'])
        ->whereNumber('moduleId')->whereNumber('lessonId')->name('user.learn.lesson');
    
    // Quiz and Challenges
    Route::get('/quiz', [UserDashboardController::class, 'quiz'])->name('user.quiz');
    
    // Ask a Question
    Route::get('/ask', [UserDashboardController::class, 'ask'])->name('user.ask');
    Route::post('/ask/submit', [UserDashboardController::class, 'submitQuestion'])->name('user.ask.submit');
    Route::post('/ask/{questionId}/answer', [UserDashboardController::class, 'submitAnswer'])->name('user.ask.answer');
    Route::post('/ask/answer/{answerId}/accept', [UserDashboardController::class, 'acceptAnswer'])->name('user.ask.accept');
    
    // Services Near You
    Route::get('/services', [UserDashboardController::class, 'services'])->name('user.services');
    Route::get('/support-contacts', [UserDashboardController::class, 'supportContacts'])->name('user.support-contacts');
    
    // Relationship Zone
    Route::get('/relationships', [UserDashboardController::class, 'relationships'])->name('user.relationships');
    
    // Blogs
    Route::get('/blogs', [UserBlogController::class, 'index'])->name('user.blogs.index');
    Route::get('/blogs/{slug}', [UserBlogController::class, 'show'])->name('user.blogs.show');
    
    // Posts
    Route::resource('posts', UserPostController::class)->names([
        'index' => 'user.posts.index',
        'create' => 'user.posts.create',
        'store' => 'user.posts.store',
        'show' => 'user.posts.show',
        'edit' => 'user.posts.edit',
        'update' => 'user.posts.update',
        'destroy' => 'user.posts.destroy',
    ]);
    Route::post('/posts/{post}/comments', [UserPostController::class, 'storeComment'])->name('user.posts.comments.store');
    
    // Health Tracking
    Route::get('/health', [UserDashboardController::class, 'health'])->name('user.health');
    
    // Profile
    Route::get('/profile', [UserDashboardController::class, 'profile'])->name('user.profile');
    Route::get('/profile/setup', [UserDashboardController::class, 'profileSetup'])->name('user.profile.setup');
    Route::post('/profile/setup', [UserDashboardController::class, 'profileSetupStore'])->name('user.profile.setup.store');
    Route::delete('/delete-profile', [UserDashboardController::class, 'destroy'])->name('user.profile.destroy');
    
    Route::get('/users', [UserDashboardController::class, 'users'])->name('user.users');
    Route::get('/experts', [UserDashboardController::class, 'experts'])->name('user.experts');
    Route::get('/family-planning', [UserDashboardController::class, 'familyPlanning'])->name('user.family-planning');
    Route::get('/appointments', [UserDashboardController::class, 'appointments'])->name('user.appointments');
    Route::post('/appointments', [UserDashboardController::class, 'storeAppointment'])->name('user.appointments.store');
    Route::get('/resources', [UserDashboardController::class, 'resources'])->name('user.resources');
    
    // Simple admin route
    Route::get('/admin', function () {
        return Inertia::render('admin/simple-dashboard', [
            'user' => auth()->user()
        ]);
    })->name('admin.simple');
});

// Expert Routes (Healthcare Professionals)
Route::middleware(['auth', 'verified', 'role:expert'])->prefix('expert')->group(function () {
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