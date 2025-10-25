<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\PostComments;
use App\Models\Appointment;

class AdminController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        
        $stats = [
            'total_users' => User::count(),
            'total_experts' => User::where('role', 'expert')->count(),
            'total_comments' => PostComments::count(),
            'recent_appointments' => Appointment::with(['user', 'doctor'])
                ->latest()
                ->limit(5)
                ->get(),
            'recent_users' => User::latest()->limit(5)->get(),
        ];

        return Inertia::render('admin/dashboard', [
            'admin' => $admin,
            'stats' => $stats
        ]);
    }

    public function users()
    {
        $admin = Auth::user();
        $users = User::with(['healthLogs', 'cycleTrackings'])
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/users', [
            'users' => $users,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    public function showUser(User $user)
    {
        $user->load(['healthLogs', 'cycleTrackings', 'medications', 'topics', 'comments']);
        
        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    public function updateUserRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:user,expert,admin'
        ]);

        $user->update(['role' => $request->role]);

        return redirect()->back()->with('success', 'User role updated successfully.');
    }

    public function toggleUserStatus(User $user)
    {
        $user->update(['is_active' => !$user->is_active ?? true]);

        $status = $user->is_active ? 'activated' : 'deactivated';
        
        return redirect()->back()->with('success', "User {$status} successfully.");
    }

    public function destroyUser(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users')
            ->with('success', 'User deleted successfully.');
    }

    public function contentComments()
    {
        $comments = PostComments::with(['user'])
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/content/comments', [
            'comments' => $comments
        ]);
    }

    public function approveComment(PostComments $comment)
    {
        $comment->update([
            'is_approved' => true,
            'moderated_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Comment approved successfully.');
    }

    public function rejectComment(PostComments $comment)
    {
        $comment->update([
            'is_approved' => false,
            'moderated_by' => auth()->id(),
            'rejection_reason' => request('reason', 'Content does not meet community guidelines'),
        ]);

        return redirect()->back()->with('success', 'Comment rejected successfully.');
    }

    public function deleteComment(PostComments $comment)
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully.');
    }
}
