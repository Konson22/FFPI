<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\PostComments;
use App\Models\Appointment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        
        // Get basic statistics
        $stats = [
            'total_users' => User::count(),
            'total_experts' => User::where('role', 'expert')->count(),
            'total_comments' => $this->getCommentsCount(),
            'total_appointments' => $this->getAppointmentsCount(),
        ];

        // Get recent activities
        $recentActivities = $this->getRecentActivities();
        
        // Get user growth data for charts
        $userGrowthData = $this->getUserGrowthData();
        
        // Get content statistics
        $contentStats = $this->getContentStats();
        
        // Get expert performance data
        $expertPerformance = $this->getExpertPerformance();

        return Inertia::render('admin/dashboard/index', [
            'admin' => $admin,
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'userGrowthData' => $userGrowthData,
            'contentStats' => $contentStats,
            'expertPerformance' => $expertPerformance,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    public function experts()
    {
        $admin = Auth::user();
        $experts = User::where('role', 'expert')
            ->with(['healthLogs', 'cycleTrackings'])
            ->latest()
            ->paginate(15);
            
        return Inertia::render('admin/experts/index', [
            'experts' => $experts,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    public function analytics()
    {
        $admin = Auth::user();
        
        // Get analytics data
        $analytics = [
            'userEngagement' => $this->getUserEngagementData(),
            'contentPerformance' => $this->getContentPerformanceData(),
            'expertActivity' => $this->getExpertActivityData(),
            'platformUsage' => $this->getPlatformUsageData(),
        ];

        return Inertia::render('admin/analytics/index', [
            'analytics' => $analytics,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    public function settings()
    {
        $admin = Auth::user();
        
        return Inertia::render('admin/settings/index', [
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

    private function getAppointmentsCount()
    {
        try {
            if (Schema::hasTable('appointments')) {
                return Appointment::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getRecentActivities()
    {
        $activities = collect();

        try {
            // Recent users
            $recentUsers = User::latest()->limit(5)->get()->map(function ($user) {
                return [
                    'type' => 'user_registered',
                    'message' => "New user registered: {$user->name}",
                    'time' => $user->created_at,
                    'user' => $user
                ];
            });

            // Recent appointments
            if (Schema::hasTable('appointments')) {
                $recentAppointments = Appointment::with(['patient', 'doctor'])
                    ->latest()
                    ->limit(5)
                    ->get()
                    ->map(function ($appointment) {
                        return [
                            'type' => 'appointment_scheduled',
                            'message' => "Appointment scheduled with {$appointment->doctor->name}",
                            'time' => $appointment->created_at,
                            'user' => $appointment->patient
                        ];
                    });
                $activities = $activities->merge($recentAppointments);
            }

            $activities = $activities->merge($recentUsers);
        } catch (\Exception $e) {
            // Return empty collection on error
        }

        return $activities->sortByDesc('time')->take(10)->values();
    }

    private function getUserGrowthData()
    {
        try {
            $userGrowth = User::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

            return $userGrowth->map(function ($item) {
                return [
                    'date' => $item->date,
                    'users' => $item->count
                ];
            });
        } catch (\Exception $e) {
            return collect();
        }
    }

    private function getContentStats()
    {
        try {
            return [
                'comments_today' => Schema::hasTable('post_comments') ? PostComments::whereDate('created_at', today())->count() : 0,
                'appointments_today' => Schema::hasTable('appointments') ? Appointment::whereDate('created_at', today())->count() : 0,
            ];
        } catch (\Exception $e) {
            return [
                'comments_today' => 0,
                'appointments_today' => 0,
            ];
        }
    }

    private function getExpertPerformance()
    {
        try {
            if (!Schema::hasTable('appointments')) {
                return collect();
            }

            return User::where('role', 'expert')
                ->withCount(['appointments as total_appointments'])
                ->withCount(['appointments as this_month_appointments' => function ($query) {
                    $query->whereMonth('created_at', now()->month);
                }])
                ->orderByDesc('total_appointments')
                ->limit(5)
                ->get();
        } catch (\Exception $e) {
            return collect();
        }
    }

    private function getUserEngagementData()
    {
        try {
            return [
                'daily_active_users' => User::whereDate('last_login_at', today())->count(),
                'weekly_active_users' => User::where('last_login_at', '>=', now()->subWeek())->count(),
                'monthly_active_users' => User::where('last_login_at', '>=', now()->subMonth())->count(),
            ];
        } catch (\Exception $e) {
            return [
                'daily_active_users' => 0,
                'weekly_active_users' => 0,
                'monthly_active_users' => 0,
            ];
        }
    }

    private function getContentPerformanceData()
    {
        try {
            return [];
        } catch (\Exception $e) {
            return [];
        }
    }

    private function getExpertActivityData()
    {
        try {
            return User::where('role', 'expert')
                ->withCount(['appointments'])
                ->orderByDesc('appointments_count')
                ->limit(10)
                ->get()
                ->map(function ($expert) {
                    return [
                        'id' => $expert->id,
                        'name' => $expert->name,
                        'email' => $expert->email,
                        'appointments_count' => $expert->appointments_count,
                        'last_login_at' => $expert->last_login_at,
                    ];
                });
        } catch (\Exception $e) {
            return [];
        }
    }

    private function getPlatformUsageData()
    {
        try {
            return [
                'total_sessions' => User::whereNotNull('last_login_at')->count(),
                'average_session_duration' => 0, // This would need session tracking
                'bounce_rate' => 0, // This would need session tracking
                'pages_per_session' => 0, // This would need session tracking
            ];
        } catch (\Exception $e) {
            return [
                'total_sessions' => 0,
                'average_session_duration' => 0,
                'bounce_rate' => 0,
                'pages_per_session' => 0,
            ];
        }
    }
}
