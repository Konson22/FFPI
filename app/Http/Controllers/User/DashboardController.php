<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        // Get user-specific data
        $stats = [
            'welcome_message' => "Welcome back, {$user->name}!",
            'recent_activities' => [],
            'upcoming_appointments' => [],
            'health_tips' => [
                'Track your cycle regularly for better health insights',
                'Stay hydrated and maintain a balanced diet',
                'Regular exercise helps with hormonal balance'
            ]
        ];

        return Inertia::render('user/dashboard/index', [
            'user' => $user,
            'stats' => $stats
        ]);
    }

    public function profile()
    {
        $user = Auth::user();
        
        return Inertia::render('user/profile/index', [
            'user' => $user
        ]);
    }

    public function familyPlanning()
    {
        $user = Auth::user();
        
        return Inertia::render('user/family-planning/index', [
            'user' => $user
        ]);
    }

    public function appointments()
    {
        $user = Auth::user();
        
        return Inertia::render('user/appointments/index', [
            'user' => $user
        ]);
    }

    public function resources()
    {
        $user = Auth::user();
        
        return Inertia::render('user/resources/index', [
            'user' => $user
        ]);
    }

    public function health()
    {
        $user = Auth::user();
        
        return Inertia::render('user/health/index', [
            'user' => $user
        ]);
    }

    public function users()
    {
        $user = Auth::user();
        
        return Inertia::render('user/users/index', [
            'user' => $user
        ]);
    }

    public function quiz()
    {
        $user = Auth::user();
        
        return Inertia::render('user/quiz/index', [
            'user' => $user
        ]);
    }

    public function ask()
    {
        $user = Auth::user();
        
        return Inertia::render('user/ask/index', [
            'user' => $user
        ]);
    }

    public function services()
    {
        $user = Auth::user();
        
        return Inertia::render('user/services/index', [
            'user' => $user
        ]);
    }

    public function community()
    {
        $user = Auth::user();
        
        return Inertia::render('user/community/index', [
            'user' => $user
        ]);
    }

    public function relationships()
    {
        $user = Auth::user();
        
        return Inertia::render('user/relationships/index', [
            'user' => $user
        ]);
    }

}
