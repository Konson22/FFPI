<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Socialite\Facades\Socialite;

class GoogleAuthController extends Controller
{
    public function login(Request $request)
    {
        Log::info('Google API login attempt started', [
            'ip' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'timestamp' => now()->toISOString(),
        ]);

        $request->validate([
            'token' => ['required', 'string'],
            'user' => ['sometimes', 'array'], // Optional user data from mobile app
        ]);

        $token = $request->input('token');
        $mobileUserData = $request->input('user', []);

        Log::info('Google API login validation passed', [
            'token_length' => strlen($token),
            'has_mobile_user_data' => !empty($mobileUserData),
            'mobile_user_fields' => array_keys($mobileUserData),
        ]);

        try {
            Log::info('Attempting to verify Google token');
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($token);

            Log::info('Google token verified successfully', [
                'google_user_id' => $googleUser->getId(),
                'google_email' => $googleUser->getEmail(),
                'google_name' => $googleUser->getName(),
            ]);

            // Use mobile app user data if available, otherwise use Google data
            $userData = [
                'name' => $mobileUserData['name'] ?? $googleUser->getName() ?? ($googleUser->user['given_name'] ?? 'Google User'),
                'google_id' => $googleUser->getId(),
                'avatar' => $mobileUserData['avatar'] ?? $googleUser->getAvatar(),
                'email' => $googleUser->getEmail(),
            ];

            // Add additional mobile app user data if provided
            if (isset($mobileUserData['phone'])) {
                $userData['phone'] = $mobileUserData['phone'];
            }
            if (isset($mobileUserData['date_of_birth'])) {
                $userData['date_of_birth'] = $mobileUserData['date_of_birth'];
            }
            if (isset($mobileUserData['role'])) {
                $userData['role'] = $mobileUserData['role'];
            }

            Log::info('Creating or updating user', [
                'email' => $googleUser->getEmail(),
                'user_data_fields' => array_keys($userData),
            ]);

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                $userData
            );

            Log::info('User created/updated successfully', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'was_new_user' => $user->wasRecentlyCreated,
            ]);

            if (empty($user->email_verified_at)) {
                $user->forceFill(['email_verified_at' => now()])->save();
                Log::info('Email verified for user', ['user_id' => $user->id]);
            }

            Auth::login($user);

            Log::info('Google API login successful', [
                'user_id' => $user->id,
                'user_email' => $user->email,
                'login_time' => now()->toISOString(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $user,
                'token' => $user->createToken('Mobile App Token')->plainTextToken,
            ]);
        } catch (\Throwable $e) {
            Log::error('Google API login failed', [
                'error_message' => $e->getMessage(),
                'error_code' => $e->getCode(),
                'error_file' => $e->getFile(),
                'error_line' => $e->getLine(),
                'token_length' => strlen($token),
                'token_preview' => substr($token, 0, 20) . '...',
                'ip' => $request->ip(),
                'user_agent' => $request->userAgent(),
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Invalid Google token',
                'error' => app()->hasDebugModeEnabled() ? $e->getMessage() : null,
            ], 401);
        }
    }

    // Optional: return the Google OAuth URL (useful if you support redirect-based auth)
    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    // Handle Google OAuth callback (redirect flow)
    public function handleGoogleCallbackWithCode(Request $request)
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::updateOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName() ?: ($googleUser->user['given_name'] ?? 'Google User'),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                ]
            );

            if (empty($user->email_verified_at)) {
                $user->forceFill(['email_verified_at' => now()])->save();
            }

            Auth::login($user);

            // For web routes, redirect to intended page or home
            return redirect()->intended('/');
        } catch (\Throwable $e) {
            Log::warning('Google OAuth callback failed', [
                'message' => $e->getMessage(),
            ]);

            return redirect()->route('login')->with('error', 'Google authentication failed');
        }
    }

    // Link Google account to the authenticated user
    public function linkGoogleAccount(Request $request)
    {
        $request->validate([
            'token' => ['required', 'string'],
        ]);

        $user = $request->user();

        try {
            $googleUser = Socialite::driver('google')->stateless()->userFromToken($request->input('token'));

            // Prevent linking if another account is using this google_id
            if (User::where('google_id', $googleUser->getId())->where('id', '!=', $user->id)->exists()) {
                return response()->json(['message' => 'This Google account is already linked to another user'], 422);
            }

            $user->forceFill([
                'google_id' => $googleUser->getId(),
                'avatar' => $user->avatar ?: $googleUser->getAvatar(),
            ])->save();

            return response()->json(['message' => 'Google account linked successfully', 'user' => $user]);
        } catch (\Throwable $e) {
            return response()->json(['message' => 'Failed to link Google account'], 400);
        }
    }

    // Unlink Google account
    public function unlinkGoogleAccount(Request $request)
    {
        $user = $request->user();
        $user->forceFill(['google_id' => null])->save();
        return response()->json(['message' => 'Google account unlinked successfully', 'user' => $user]);
    }
}

