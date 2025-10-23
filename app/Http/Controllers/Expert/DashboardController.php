<?php

namespace App\Http\Controllers\Expert;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        $expert = Auth::user();
        
        // Get expert-specific data
        $stats = [
            'welcome_message' => "Welcome back, Dr. {$expert->name}!",
            'total_patients' => 0, // Will be implemented when patient system is ready
            'upcoming_appointments' => [],
            'recent_consultations' => [],
            'pending_reviews' => []
        ];

        return Inertia::render('expert/dashboard/index', [
            'expert' => $expert,
            'stats' => $stats
        ]);
    }

    public function patients()
    {
        $expert = Auth::user();
        
        return Inertia::render('expert/patients/index', [
            'expert' => $expert
        ]);
    }

    public function appointments()
    {
        $expert = Auth::user();
        
        return Inertia::render('expert/appointments/index', [
            'expert' => $expert
        ]);
    }

    public function resources()
    {
        $expert = Auth::user();
        
        return Inertia::render('expert/resources/index', [
            'expert' => $expert
        ]);
    }

    public function reports()
    {
        $expert = Auth::user();
        
        return Inertia::render('expert/reports/index', [
            'expert' => $expert
        ]);
    }
}
