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
        $user->load('profile');
        
        return Inertia::render('user/profile/index', [
            'user' => $user,
            'profile' => $user->profile
        ]);
    }

    public function profileSetup()
    {
        $user = Auth::user();
        $user->load('profile');
        
        // If profile already exists, redirect to profile page
        if ($user->profile) {
            return redirect()->route('user.profile');
        }
        
        return Inertia::render('user/profile/setup', [
            'user' => $user
        ]);
    }

    public function profileSetupStore(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date|before:today',
            'marital_status' => 'nullable|in:single,married,divorced,widowed',
            'cycle_length' => 'nullable|integer|min:21|max:35',
            'period_length' => 'nullable|integer|min:1|max:10',
            'health_notes' => 'nullable|string|max:1000',
        ]);

        // Create or update profile
        $profile = \App\Models\Profile::updateOrCreate(
            ['user_id' => $user->id],
            array_merge($validated, [
                'cycle_length' => $request->gender === 'female' ? ($request->cycle_length ?? 28) : null,
                'period_length' => $request->gender === 'female' ? ($request->period_length ?? 5) : null,
                'preferences' => [
                    'notifications' => true,
                    'reminders' => true,
                    'privacy_level' => 'normal',
                ],
            ])
        );

        return redirect()->route('user.dashboard')->with('success', 'Profile created successfully!');
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

        return Inertia::render('user/health/index', [
            'user' => $user,
            'healthMetrics' => [],
            'symptoms' => [],
            'medications' => [],
            'recentTracking' => [],
            'appointments' => $appointments,
            'reminders' => [],
            'health' => [
                'cycle_length' => null,
                'last_period_start' => null,
                'symptoms' => [],
                'medications' => [],
                'period_logs' => [],
            ],
        ]);
    }

    public function trackPeriodForm()
    {
        $user = Auth::user();

        return Inertia::render('user/health/track', [
            'user' => $user,
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
