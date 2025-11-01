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
                    // Human-readable for the list on the page
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

        // Helpers to humanize day values
        $formatDaysAgo = function ($days) {
            if ($days === null) {
                return '—';
            }
            $d = (int) round($days);
            if ($d <= 0) {
                return 'Today';
            }
            return $d === 1 ? '1 day ago' : ($d . ' days ago');
        };

        $formatInDays = function ($days) {
            if ($days === null) {
                return '—';
            }
            $d = (int) round(max(0, $days));
            if ($d === 0) {
                return 'Today';
            }
            return $d === 1 ? 'In 1 day' : ('In ' . $d . ' days');
        };

        // Build health metrics cards for UI
        $metricsCards = [
            [
                'title' => 'Cycle Length',
                'value' => $cycleLength . ' days',
                'status' => 'Regular',
                'color' => 'green',
            ],
        ];

        $metricsCards[] = [
            'title' => 'Last Period',
            'value' => $formatDaysAgo($lastPeriodDaysAgo),
            'status' => isset($lastPeriodDaysAgo) ? 'On track' : 'Unknown',
            'color' => 'blue',
        ];

        $metricsCards[] = [
            'title' => 'Next Period',
            'value' => $formatInDays($nextPeriodInDays),
            'status' => 'Predicted',
            'color' => 'purple',
        ];

        $fertilityStatus = 'High';
        if (isset($fertilityWindowInDays)) {
            $fertilityStatus = $fertilityWindowInDays <= 3 ? 'High' : ($fertilityWindowInDays <= 7 ? 'Moderate' : 'Low');
        }

        $metricsCards[] = [
            'title' => 'Fertility Window',
            'value' => $formatInDays($fertilityWindowInDays),
            'status' => $fertilityStatus,
            'color' => 'emerald',
        ];

        // Build data for calendar highlights from DB
        $calendarSymptoms = \App\Models\Symptom::whereHas('fertilityTracking', function($query) use ($user) {
                $query->where('user_id', $user->id);
            })
            ->orderBy('created_at', 'desc')
            ->limit(120)
            ->get()
            ->map(function ($symptom) {
                return [
                    'name' => $symptom->name,
                    'severity' => ucfirst($symptom->severity ?? 'Mild'),
                    // ISO date string for calendar
                    'date' => $symptom->created_at->format('Y-m-d'),
                ];
            });

        $periodLogs = \App\Models\FertilityTracking::where('user_id', $user->id)
            ->orderBy('period_start_date', 'desc')
            ->limit(24)
            ->get()
            ->filter(fn($t) => !empty($t->period_start_date))
            ->map(function ($t) {
                return [
                    'date' => $t->period_start_date->format('Y-m-d'),
                ];
            })
            ->values();

        return Inertia::render('user/health/index', [
            'user' => $user,
            // Frontend expects an array of metric cards
            'healthMetrics' => $metricsCards,
            // Normalize recent symptoms to 'symptoms' for the UI
            'symptoms' => $recentSymptoms,
            // Provide medications if available; fallback to empty list
            'medications' => [],
            // Keep additional useful data if needed elsewhere
            'recentTracking' => $recentTracking,
            'appointments' => $appointments,
            'reminders' => $reminders,
            // Structured health data for calendar and other widgets
            'health' => [
                'cycle_length' => $cycleLength,
                'last_period_start' => $latestTracking?->period_start_date?->format('Y-m-d'),
                'symptoms' => $calendarSymptoms,
                'medications' => [],
                'period_logs' => $periodLogs,
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
