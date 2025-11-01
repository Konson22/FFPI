<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmailVerificationPromptController extends Controller
{
    /**
     * Show the email verification prompt page.
     */
    public function __invoke(Request $request): Response|RedirectResponse
    {
        $user = $request->user();
        
        // If user is already verified, redirect based on their role
        if ($user->hasVerifiedEmail()) {
            $redirectRoute = match($user->role) {
                'admin' => 'admin.dashboard',
                'expert' => 'expert.dashboard',
                'user' => 'user.dashboard',
                default => 'user.dashboard'
            };
            
            return redirect()->intended(route($redirectRoute, absolute: false));
        }
        
        return Inertia::render('auth/verify-email', ['status' => $request->session()->get('status')]);
    }
}
