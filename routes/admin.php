<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\ModuleController;
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
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    // Dashboard
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    
    // Module Management
    Route::get('/modules', [ModuleController::class, 'index'])->name('admin.modules.index');
    Route::get('/modules/create', [ModuleController::class, 'create'])->name('admin.modules.create');
    Route::post('/modules', [ModuleController::class, 'store'])->name('admin.modules.store');
    // Lessons inside a Module (define before generic {moduleId} show route)
    Route::get('/modules/{moduleId}/lessons/create', [ModuleController::class, 'createLesson'])->whereNumber('moduleId')->name('admin.lessons.create');
    Route::post('/modules/{moduleId}/lessons', [ModuleController::class, 'storeLesson'])->whereNumber('moduleId')->name('admin.lessons.store');

    Route::get('/modules/{moduleId}', [ModuleController::class, 'show'])->whereNumber('moduleId')->name('admin.modules.show');
    Route::get('/modules/{moduleId}/edit', [ModuleController::class, 'edit'])->whereNumber('moduleId')->name('admin.modules.edit');
    Route::put('/modules/{moduleId}', [ModuleController::class, 'update'])->whereNumber('moduleId')->name('admin.modules.update');
    Route::delete('/modules/{moduleId}', [ModuleController::class, 'destroy'])->whereNumber('moduleId')->name('admin.modules.delete');
    Route::patch('/modules/{moduleId}/toggle-status', [ModuleController::class, 'toggleStatus'])->whereNumber('moduleId')->name('admin.modules.toggle-status');
    Route::patch('/modules/order', [ModuleController::class, 'updateOrder'])->name('admin.modules.update-order');
    
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