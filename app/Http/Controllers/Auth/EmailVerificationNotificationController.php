<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EmailVerificationNotificationController extends Controller
{
    /**
     * Send a new email verification notification.
     */
    public function store(Request $request): RedirectResponse
    {
        if ($request->user()->hasVerifiedEmail()) {
            $user = $request->user();
            $redirectRoute = match($user->role) {
                'admin' => 'admin.dashboard',
                'expert' => 'expert.dashboard',
                'user' => 'user.dashboard',
                default => 'user.dashboard'
            };
            
            return redirect()->intended(route($redirectRoute, absolute: false));
        }

        try {
            $request->user()->sendEmailVerificationNotification();
            Log::info('Verification email sent', ['user_id' => $request->user()->id, 'email' => $request->user()->email]);
        } catch (\Exception $e) {
            Log::error('Failed to send verification email', [
                'user_id' => $request->user()->id,
                'email' => $request->user()->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return back()->with('error', 'Failed to send verification email. Please try again or contact support.');
        }

        return back()->with('status', 'verification-link-sent');
    }
}
