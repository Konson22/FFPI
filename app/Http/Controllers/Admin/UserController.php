<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $admin = Auth::user();
        $users = User::with(['healthLogs', 'cycleTrackings'])
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'user' => $admin,
            'role' => 'admin',
            'currentPath' => request()->path()
        ]);
    }

    public function show(User $user)
    {
        $user->load(['healthLogs', 'cycleTrackings', 'medications', 'topics', 'comments']);
        
        return Inertia::render('admin/users/show', [
            'user' => $user
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        $request->validate([
            'role' => 'required|in:user,expert,admin'
        ]);

        $user->update(['role' => $request->role]);

        return redirect()->back()->with('success', 'User role updated successfully.');
    }

    public function toggleStatus(User $user)
    {
        $user->update(['is_active' => !$user->is_active ?? true]);

        $status = $user->is_active ? 'activated' : 'deactivated';
        
        return redirect()->back()->with('success', "User {$status} successfully.");
    }

    public function destroy(User $user)
    {
        $user->delete();

        return redirect()->route('admin.users.index')
            ->with('success', 'User deleted successfully.');
    }
}
