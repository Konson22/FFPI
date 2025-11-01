<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
            'total_posts' => $this->safeCount(\App\Models\Post::class),
        ];
        
        // Get recent activity with error handling
        $recent_modules = $this->safeGet(\App\Models\Module::class, [], 5);
        $recent_posts = $this->safeGet(\App\Models\Post::class, ['user'], 5);

        return Inertia::render('admin/dashboard', [
            'user' => $user,
            'stats' => $stats,
            'recent_modules' => $recent_modules,
            'recent_posts' => $recent_posts,
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
     * Display the admin posts management page.
     */
    public function posts()
    {
        $posts = \App\Models\Post::with(['user', 'reactions', 'comments'])
            ->latest()
            ->paginate(10);

        return Inertia::render('admin/posts/index', [
            'posts' => $posts,
        ]);
    }

    /**
     * Approve a post.
     */
    public function approvePost($id)
    {
        $post = \App\Models\Post::findOrFail($id);
        $post->update(['status' => 'approved']);

        return redirect()->route('admin.posts')->with('success', 'Post approved successfully!');
    }

    /**
     * Reject a post.
     */
    public function rejectPost(Request $request, $id)
    {
        $post = \App\Models\Post::findOrFail($id);
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string|max:500',
        ]);

        $post->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason']
        ]);

        return redirect()->route('admin.posts')->with('success', 'Post rejected successfully!');
    }

    /**
     * Delete a post.
     */
    public function deletePost($id)
    {
        $post = \App\Models\Post::findOrFail($id);
        $post->delete();

        return redirect()->route('admin.posts')->with('success', 'Post deleted successfully!');
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
}