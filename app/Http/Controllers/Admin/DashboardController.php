<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Comment;
use App\Models\Appointment;

class DashboardController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        
        // Get comprehensive statistics
        $stats = [
            'total_users' => User::count(),
            'total_experts' => User::where('role', 'expert')->count(),
            'total_comments' => Comment::count(),
            'recent_appointments' => Appointment::with(['user', 'doctor'])
                ->latest()
                ->limit(5)
                ->get(),
            'recent_users' => User::latest()->limit(5)->get(),
        ];

        return Inertia::render('admin/dashboard/index', [
            'admin' => $admin,
            'stats' => $stats
        ]);
    }
}
