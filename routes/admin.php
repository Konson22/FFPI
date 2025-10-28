<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\CourseController;
use App\Http\Controllers\Admin\ModuleController;
use App\Http\Controllers\Admin\LessonController;
use App\Http\Controllers\Admin\QuizController;
use App\Http\Controllers\Admin\RelationshipTipController;
use App\Http\Controllers\Admin\HealthServiceController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
|
| Here is where you can register admin routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "admin" middleware group. Make something great!
|
*/

// Admin login page (public)
Route::get('/admin/login', function () {
    return Inertia::render('admin/auth/login');
})->name('admin.login');

// Admin login form submission (public)
Route::post('/admin/login', function (Illuminate\Http\Request $request) {
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();
        
        // Check if user has admin role
        if (Auth::user()->role === 'admin') {
            return redirect()->intended('/admin/dashboard');
        } else {
            Auth::logout();
            return back()->withErrors([
                'email' => 'You do not have admin privileges.',
            ]);
        }
    }

    return back()->withErrors([
        'email' => 'The provided credentials do not match our records.',
    ]);
})->name('admin.login.submit');

// Admin logout
Route::post('/admin/logout', function (Illuminate\Http\Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/admin/login');
})->name('admin.logout');

// Admin routes (protected)
Route::middleware(['auth', 'role:admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Course Management
    Route::get('/courses', [CourseController::class, 'index'])->name('admin.courses');
    Route::get('/courses/create', [CourseController::class, 'create'])->name('admin.courses.create');
    Route::post('/courses', [CourseController::class, 'store'])->name('admin.courses.store');
    Route::get('/courses/{id}', [CourseController::class, 'show'])->name('admin.courses.show');
    Route::get('/courses/{id}/edit', [CourseController::class, 'edit'])->name('admin.courses.edit');
    Route::put('/courses/{id}', [CourseController::class, 'update'])->name('admin.courses.update');
    Route::delete('/courses/{id}', [CourseController::class, 'destroy'])->name('admin.courses.delete');
    Route::patch('/courses/{id}/toggle-status', [CourseController::class, 'toggleStatus'])->name('admin.courses.toggle-status');
    
    // Module Management
    Route::get('/courses/{courseId}/modules', [ModuleController::class, 'index'])->name('admin.modules.index');
    Route::get('/courses/{courseId}/modules/create', [ModuleController::class, 'create'])->name('admin.modules.create');
    Route::post('/courses/{courseId}/modules', [ModuleController::class, 'store'])->name('admin.modules.store');
    Route::get('/courses/{courseId}/modules/{moduleId}', [ModuleController::class, 'show'])->name('admin.modules.show');
    Route::get('/courses/{courseId}/modules/{moduleId}/edit', [ModuleController::class, 'edit'])->name('admin.modules.edit');
    Route::put('/courses/{courseId}/modules/{moduleId}', [ModuleController::class, 'update'])->name('admin.modules.update');
    Route::delete('/courses/{courseId}/modules/{moduleId}', [ModuleController::class, 'destroy'])->name('admin.modules.delete');
    Route::patch('/courses/{courseId}/modules/{moduleId}/toggle-status', [ModuleController::class, 'toggleStatus'])->name('admin.modules.toggle-status');
    Route::patch('/courses/{courseId}/modules/order', [ModuleController::class, 'updateOrder'])->name('admin.modules.update-order');
    
    // Lesson Management
    Route::get('/courses/{courseId}/modules/{moduleId}/lessons', [LessonController::class, 'index'])->name('admin.lessons.index');
    Route::get('/courses/{courseId}/modules/{moduleId}/lessons/create', [LessonController::class, 'create'])->name('admin.lessons.create');
    Route::post('/courses/{courseId}/modules/{moduleId}/lessons', [LessonController::class, 'store'])->name('admin.lessons.store');
    Route::get('/courses/{courseId}/modules/{moduleId}/lessons/{lessonId}', [LessonController::class, 'show'])->name('admin.lessons.show');
    Route::get('/courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/edit', [LessonController::class, 'edit'])->name('admin.lessons.edit');
    Route::put('/courses/{courseId}/modules/{moduleId}/lessons/{lessonId}', [LessonController::class, 'update'])->name('admin.lessons.update');
    Route::delete('/courses/{courseId}/modules/{moduleId}/lessons/{lessonId}', [LessonController::class, 'destroy'])->name('admin.lessons.delete');
    Route::patch('/courses/{courseId}/modules/{moduleId}/lessons/{lessonId}/toggle-status', [LessonController::class, 'toggleStatus'])->name('admin.lessons.toggle-status');
    Route::patch('/courses/{courseId}/modules/{moduleId}/lessons/order', [LessonController::class, 'updateOrder'])->name('admin.lessons.update-order');
    
    // Quiz Management
    Route::get('/quizzes', [QuizController::class, 'index'])->name('admin.quizzes');
    Route::get('/quizzes/create', [QuizController::class, 'create'])->name('admin.quizzes.create');
    Route::post('/quizzes', [QuizController::class, 'store'])->name('admin.quizzes.store');
    Route::get('/quizzes/{id}', [QuizController::class, 'show'])->name('admin.quizzes.show');
    Route::get('/quizzes/{id}/edit', [QuizController::class, 'edit'])->name('admin.quizzes.edit');
    Route::put('/quizzes/{id}', [QuizController::class, 'update'])->name('admin.quizzes.update');
    Route::delete('/quizzes/{id}', [QuizController::class, 'destroy'])->name('admin.quizzes.delete');
    Route::patch('/quizzes/{id}/toggle-status', [QuizController::class, 'toggleStatus'])->name('admin.quizzes.toggle-status');
    
    // Relationship Tips Management
    Route::get('/relationship-tips', [RelationshipTipController::class, 'index'])->name('admin.relationship-tips');
    Route::get('/relationship-tips/create', [RelationshipTipController::class, 'create'])->name('admin.relationship-tips.create');
    Route::post('/relationship-tips', [RelationshipTipController::class, 'store'])->name('admin.relationship-tips.store');
    Route::get('/relationship-tips/{id}/edit', [RelationshipTipController::class, 'edit'])->name('admin.relationship-tips.edit');
    Route::put('/relationship-tips/{id}', [RelationshipTipController::class, 'update'])->name('admin.relationship-tips.update');
    Route::delete('/relationship-tips/{id}', [RelationshipTipController::class, 'destroy'])->name('admin.relationship-tips.delete');
    
    // Health Services Management
    Route::get('/health-services', [HealthServiceController::class, 'index'])->name('admin.health-services');
    Route::get('/health-services/create', [HealthServiceController::class, 'create'])->name('admin.health-services.create');
    Route::post('/health-services', [HealthServiceController::class, 'store'])->name('admin.health-services.store');
    Route::get('/health-services/{id}/edit', [HealthServiceController::class, 'edit'])->name('admin.health-services.edit');
    Route::put('/health-services/{id}', [HealthServiceController::class, 'update'])->name('admin.health-services.update');
    Route::delete('/health-services/{id}', [HealthServiceController::class, 'destroy'])->name('admin.health-services.delete');
    
    // User Management
    Route::get('/users', [AdminController::class, 'users'])->name('admin.users');
    Route::put('/users/{id}/role', [AdminController::class, 'updateUserRole'])->name('admin.users.role');
    Route::patch('/users/{id}/status', [AdminController::class, 'toggleUserStatus'])->name('admin.users.status');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('admin.users.delete');
    
    // Expert Management
    Route::get('/experts', [AdminController::class, 'experts'])->name('admin.experts');
    Route::patch('/experts/{id}/verify', [AdminController::class, 'verifyExpert'])->name('admin.experts.verify');
    Route::patch('/experts/{id}/revoke', [AdminController::class, 'revokeExpertVerification'])->name('admin.experts.revoke');
    Route::patch('/experts/{id}/remove', [AdminController::class, 'removeExpertStatus'])->name('admin.experts.remove');
    
    // Post Management
    Route::get('/posts', [AdminController::class, 'posts'])->name('admin.posts');
    Route::patch('/posts/{id}/approve', [AdminController::class, 'approvePost'])->name('admin.posts.approve');
    Route::patch('/posts/{id}/reject', [AdminController::class, 'rejectPost'])->name('admin.posts.reject');
    Route::delete('/posts/{id}', [AdminController::class, 'deletePost'])->name('admin.posts.delete');
    
    // Settings
    Route::get('/settings', [AdminController::class, 'settings'])->name('admin.settings');
    Route::put('/settings/update', [AdminController::class, 'updateSettings'])->name('admin.settings.update');
});

// Admin root redirect
Route::get('/admin', function () {
    return redirect()->route('admin.dashboard');
});