<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Post;
use App\Models\PostComments;
use App\Models\Appointment;
use App\Models\Course;
use App\Models\CourseEnrollment;
use App\Models\FertilityInsight;
use App\Models\EducationResource;
use App\Models\Reminder;
use App\Models\FertilityTracking;
use App\Models\Symptom;
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
            'total_posts' => $this->getPostsCount(),
            'total_comments' => $this->getCommentsCount(),
            'total_courses' => Course::count(),
            'total_enrollments' => CourseEnrollment::count(),
            'total_appointments' => $this->getAppointmentsCount(),
            'total_fertility_insights' => $this->getFertilityInsightsCount(),
            'total_education_resources' => $this->getEducationResourcesCount(),
            'total_reminders' => $this->getRemindersCount(),
            'total_tracking_records' => $this->getTrackingRecordsCount(),
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

    private function getPostsCount()
    {
        try {
            if (Schema::hasTable('posts')) {
                return Post::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
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

    private function getFertilityInsightsCount()
    {
        try {
            if (Schema::hasTable('fertility_insights')) {
                return FertilityInsight::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getEducationResourcesCount()
    {
        try {
            if (Schema::hasTable('education_resources')) {
                return EducationResource::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getRemindersCount()
    {
        try {
            if (Schema::hasTable('reminders')) {
                return Reminder::count();
            }
            return 0;
        } catch (\Exception $e) {
            return 0;
        }
    }

    private function getTrackingRecordsCount()
    {
        try {
            if (Schema::hasTable('fertility_tracking')) {
                return FertilityTracking::count();
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

            // Recent posts
            if (Schema::hasTable('posts')) {
                $recentPosts = Post::with('user')->latest()->limit(5)->get()->map(function ($post) {
                    return [
                        'type' => 'post_created',
                        'message' => "New post created: {$post->title}",
                        'time' => $post->created_at,
                        'user' => $post->user
                    ];
                });
                $activities = $activities->merge($recentPosts);
            }

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
                'posts_today' => Schema::hasTable('posts') ? Post::whereDate('created_at', today())->count() : 0,
                'comments_today' => Schema::hasTable('post_comments') ? PostComments::whereDate('created_at', today())->count() : 0,
                'appointments_today' => Schema::hasTable('appointments') ? Appointment::whereDate('created_at', today())->count() : 0,
                'enrollments_today' => Schema::hasTable('course_enrollments') ? CourseEnrollment::whereDate('created_at', today())->count() : 0,
            ];
        } catch (\Exception $e) {
            return [
                'posts_today' => 0,
                'comments_today' => 0,
                'appointments_today' => 0,
                'enrollments_today' => 0,
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
            if (!Schema::hasTable('posts')) {
                return [];
            }

            return Post::withCount('comments', 'reactions', 'shares')
                ->orderByDesc('comments_count')
                ->limit(10)
                ->get()
                ->map(function ($post) {
                    return [
                        'id' => $post->id,
                        'title' => $post->title,
                        'comments_count' => $post->comments_count,
                        'reactions_count' => $post->reactions_count,
                        'shares_count' => $post->shares_count,
                        'created_at' => $post->created_at,
                    ];
                });
        } catch (\Exception $e) {
            return [];
        }
    }

    private function getExpertActivityData()
    {
        try {
            return User::where('role', 'expert')
                ->withCount(['appointments', 'posts'])
                ->orderByDesc('appointments_count')
                ->limit(10)
                ->get()
                ->map(function ($expert) {
                    return [
                        'id' => $expert->id,
                        'name' => $expert->name,
                        'email' => $expert->email,
                        'appointments_count' => $expert->appointments_count,
                        'posts_count' => $expert->posts_count,
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
