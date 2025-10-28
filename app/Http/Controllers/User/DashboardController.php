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
        
        // Get recent fertility tracking data
        $recentTracking = \App\Models\FertilityTracking::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function ($tracking) {
                return [
                    'id' => $tracking->id,
                    'period_start_date' => $tracking->period_start_date ? $tracking->period_start_date->format('Y-m-d') : null,
                    'cycle_length' => $tracking->cycle_length,
                    'cycle_phase' => $tracking->cycle_phase,
                    'symptoms' => is_array($tracking->symptoms) ? $tracking->symptoms : [],
                    'notes' => $tracking->notes,
                    'created_at' => $tracking->created_at->format('Y-m-d'),
                ];
            });

        // Get the latest tracking to calculate metrics
        $latestTracking = \App\Models\FertilityTracking::where('user_id', $user->id)
            ->orderBy('created_at', 'desc')
            ->first();

        // Calculate cycle metrics
        $cycleLength = $latestTracking?->cycle_length ?? 28;
        $lastPeriodDaysAgo = null;
        $nextPeriodInDays = null;
        
        if ($latestTracking && $latestTracking->period_start_date) {
            $daysSince = now()->diffInDays($latestTracking->period_start_date);
            $lastPeriodDaysAgo = $daysSince;
            $nextPeriodInDays = max(0, $cycleLength - $daysSince);
        } elseif ($latestTracking && $latestTracking->next_period_date) {
            $nextPeriodInDays = now()->diffInDays($latestTracking->next_period_date);
        }

        // Get recent symptoms
        $recentSymptoms = \App\Models\Symptom::whereHas('fertilityTracking', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get()
            ->map(function ($symptom) {
                return [
                    'name' => $symptom->name,
                    'severity' => ucfirst($symptom->severity ?? 'Mild'),
                    'date' => $symptom->created_at->diffForHumans(),
                    'note' => $symptom->note,
                ];
            });

        // Get upcoming appointments
        $appointments = \App\Models\Appointment::where('patient_id', $user->id)
            ->where('appointment_date', '>=', now())
            ->whereIn('status', ['scheduled', 'confirmed'])
            ->orderBy('appointment_date', 'asc')
            ->limit(5)
            ->with('doctor:id,name,specialization')
            ->get()
            ->map(function ($appointment) {
                return [
                    'id' => $appointment->id,
                    'date' => $appointment->appointment_date->format('M d, Y'),
                    'time' => $appointment->appointment_date->format('h:i A'),
                    'reason' => $appointment->reason,
                    'doctor_name' => $appointment->doctor->name,
                    'status' => ucfirst($appointment->status),
                ];
            });

        // Get active reminders
        $reminders = \App\Models\Reminder::where('user_id', $user->id)
            ->where('is_sent', false)
            ->where('reminder_time', '>=', now())
            ->orderBy('reminder_time', 'asc')
            ->limit(5)
            ->get()
            ->map(function ($reminder) {
                return [
                    'message' => $reminder->message,
                    'time' => $reminder->reminder_time->format('M d, h:i A'),
                    'type' => ucfirst($reminder->type ?? 'general'),
                ];
            });

        // Calculate fertility window
        $fertilityWindowInDays = null;
        if ($latestTracking && $latestTracking->period_start_date) {
            $daysSincePeriod = now()->diffInDays($latestTracking->period_start_date);
            $fertilityWindowInDays = max(0, (int)($cycleLength * 0.5) - $daysSincePeriod);
        }

        return Inertia::render('user/health/index', [
            'user' => $user,
            'healthMetrics' => [
                'cycle_length' => $cycleLength,
                'last_period_days_ago' => $lastPeriodDaysAgo,
                'next_period_in_days' => $nextPeriodInDays,
                'fertility_window_days' => $fertilityWindowInDays,
            ],
            'recentTracking' => $recentTracking,
            'recentSymptoms' => $recentSymptoms,
            'appointments' => $appointments,
            'reminders' => $reminders,
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
