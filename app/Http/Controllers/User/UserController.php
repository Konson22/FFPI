<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        return Inertia::render('user/dashboard', [
            'user' => $user,
            'stats' => [
                'comments_made' => $user->comments()->count(),
            ]
        ]);
    }

    public function profile()
    {
        $user = Auth::user();
        
        return Inertia::render('user/profile', [
            'user' => $user
        ]);
    }

    public function updateProfile(Request $request)
    {
        $user = Auth::user();
        
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'gender' => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date|before:today',
            'marital_status' => 'nullable|in:single,married,divorced,widowed',
        ]);

        $user->update($request->only([
            'name', 'email', 'gender', 'date_of_birth', 'marital_status'
        ]));

        return redirect()->back()->with('success', 'Profile updated successfully.');
    }

}
