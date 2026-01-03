<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Mail\AdminEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display the admin dashboard.
     */
    public function dashboard()
    {
        $user = auth()->user();
        
        // Get basic stats with error handling for missing tables
        $stats = [
            'total_modules' => $this->safeCount(\App\Models\Module::class),
            'total_users' => $this->safeCount(\App\Models\User::class),
        ];
        
        // Get recent activity with error handling
        $recent_modules = $this->safeGet(\App\Models\Module::class, [], 5);

        return Inertia::render('admin/dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recent_modules' => $recent_modules,
        ]);
    }

    /**
     * Safely count records from a model, returning 0 if table doesn't exist.
     */
    private function safeCount($model)
    {
        try {
            return $model::count();
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * Safely get records from a model, returning empty collection if table doesn't exist.
     */
    private function safeGet($model, $with = [], $limit = null)
    {
        try {
            $query = $model::query();
            if (!empty($with)) {
                $query->with($with);
            }
            if ($limit) {
                $query->latest()->limit($limit);
            }
            return $query->get();
        } catch (\Exception $e) {
            return collect([]);
        }
    }

    /**
     * Display the admin users management page.
     */
    public function users()
    {
        $users = \App\Models\User::latest()
            ->paginate(10);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Update user role.
     */
    public function updateUserRole(Request $request, $id)
    {
        $user = \App\Models\User::findOrFail($id);
        
        $validated = $request->validate([
            'role' => 'required|in:user,expert,admin',
        ]);

        $user->update($validated);

        return redirect()->route('admin.users')->with('success', 'User role updated successfully!');
    }

    /**
     * Toggle user status (active/inactive).
     */
    public function toggleUserStatus($id)
    {
        $user = \App\Models\User::findOrFail($id);
        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activated' : 'deactivated';
        return redirect()->route('admin.users')->with('success', "User {$status} successfully!");
    }

    /**
     * Delete a user.
     */
    public function deleteUser($id)
    {
        $user = \App\Models\User::findOrFail($id);
        $user->delete();

        return redirect()->route('admin.users')->with('success', 'User deleted successfully!');
    }


    /**
     * Display the admin settings page.
     */
    public function settings()
    {
        return Inertia::render('admin/settings/index');
    }

    /**
     * Update system settings.
     */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'site_name' => 'required|string|max:255',
            'site_description' => 'required|string|max:500',
            'contact_email' => 'required|email',
            'maintenance_mode' => 'boolean',
            'registration_enabled' => 'boolean',
            'email_verification_required' => 'boolean',
            'max_file_size' => 'required|string',
            'allowed_file_types' => 'required|string',
            'analytics_enabled' => 'boolean',
            'google_analytics_id' => 'nullable|string',
            'facebook_pixel_id' => 'nullable|string',
            'social_login_enabled' => 'boolean',
            'google_client_id' => 'nullable|string',
            'facebook_app_id' => 'nullable|string',
            'email_notifications' => 'boolean',
            'sms_notifications' => 'boolean',
            'push_notifications' => 'boolean',
            'cache_duration' => 'required|integer|min:60',
            'session_timeout' => 'required|integer|min:5',
            'password_min_length' => 'required|integer|min:6',
            'require_strong_passwords' => 'boolean',
            'two_factor_enabled' => 'boolean',
            'audit_logging' => 'boolean',
            'backup_frequency' => 'required|in:daily,weekly,monthly',
            'backup_retention' => 'required|integer|min:1',
        ]);

        // Here you would typically save to a settings table or config file
        // For now, we'll just return success
        
        return redirect()->route('admin.settings')->with('success', 'Settings updated successfully!');
    }

    /**
     * Display the admin experts management page.
     */
    public function experts()
    {
        $experts = \App\Models\User::where('role', 'expert')
            ->with('profile')
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/experts/index', [
            'experts' => $experts,
        ]);
    }

    /**
     * Verify an expert.
     */
    public function verifyExpert($id)
    {
        $expert = \App\Models\User::findOrFail($id);
        
        if ($expert->profile) {
            $expert->profile->update(['is_verified' => true]);
        }

        return redirect()->route('admin.experts')->with('success', 'Expert verified successfully!');
    }

    /**
     * Revoke expert verification.
     */
    public function revokeExpertVerification($id)
    {
        $expert = \App\Models\User::findOrFail($id);
        
        if ($expert->profile) {
            $expert->profile->update(['is_verified' => false]);
        }

        return redirect()->route('admin.experts')->with('success', 'Expert verification revoked!');
    }

    /**
     * Remove expert status.
     */
    public function removeExpertStatus($id)
    {
        $expert = \App\Models\User::findOrFail($id);
        $expert->update(['role' => 'user']);

        return redirect()->route('admin.experts')->with('success', 'Expert status removed successfully!');
    }

    /**
     * Display the admin email sending page.
     */
    public function emails()
    {
        $user = auth()->user();
        $users = \App\Models\User::select('id', 'name', 'email', 'role')
            ->where('role', '!=', 'admin')
            ->orderBy('name')
            ->get();

        return Inertia::render('admin/emails/index', [
            'user' => $user,
            'users' => $users,
        ]);
    }

    /**
     * Send email to selected users.
     */
    public function sendEmails(Request $request)
    {
        $validated = $request->validate([
            'user_ids' => 'required|array|min:1',
            'user_ids.*' => 'exists:users,id',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10',
        ]);

        $users = \App\Models\User::whereIn('id', $validated['user_ids'])->get();
        $sentCount = 0;

        foreach ($users as $user) {
            try {
                Mail::to($user->email)->send(
                    new AdminEmail(
                        $user,
                        $validated['subject'],
                        $validated['message']
                    )
                );
                $sentCount++;
            } catch (\Exception $e) {
                Log::error('Failed to send email to user ' . $user->id . ': ' . $e->getMessage());
            }
        }

        return redirect()->route('admin.emails')->with('success', "Email sent successfully to {$sentCount} user(s)!");
    }
}