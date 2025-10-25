<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use App\Models\User;
use App\Models\PostComments;
use App\Models\Appointment;

class DashboardController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        
        // Get comprehensive statistics with error handling
        $stats = [
            'total_users' => User::count(),
            'total_experts' => User::where('role', 'expert')->count(),
            'total_comments' => $this->getCommentsCount(),
            'recent_appointments' => $this->getRecentAppointments(),
            'recent_users' => User::latest()->limit(5)->get(),
        ];

        return Inertia::render('admin/dashboard/index', [
            'admin' => $admin,
            'stats' => $stats,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    private function getCommentsCount()
    {
        try {
            if (Schema::hasTable('post_comments')) {
                return PostComments::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getRecentAppointments()
    {
        try {
            if (Schema::hasTable('appointments')) {
                return Appointment::with(['patient', 'doctor'])
                    ->latest()
                    ->limit(5)
                    ->get();
            }
            return collect([]);
        } catch (\Exception $e) {
            return collect([]);
        }
    }
}
