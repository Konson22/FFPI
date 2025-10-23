<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Doctor;
use App\Http\Requests\Api\RegisterRequest;
use App\Http\Requests\Api\LoginRequest;
use App\Http\Requests\Api\UpdateProfileRequest;
use App\Http\Requests\Api\ChangePasswordRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    /**
     * Register a new user
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        try {
            // Create new user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => $request->role ?? 'user',
                'date_of_birth' => $request->date_of_birth,
                'marital_status' => $request->marital_status
            ]);

            // Fire the Registered event (this will trigger the welcome email listener)
            event(new Registered($user));

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully. Welcome email sent!',
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Registration failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Login user
     */
    public function login(LoginRequest $request): JsonResponse
    {
        try {
            // Check credentials
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Invalid credentials'
                ], 401);
            }

            // Generate API token
            $token = $user->createToken('API Token')->plainTextToken;

            $user->load('profile');

            // Calculate age from date_of_birth
            $age = null;
            $isUnderage = null;
            if ($user->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Check if user has profile
            $hasProfile = $user->profile !== null;

            // Add age, is_underage, is_expert and has_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_profile'] = $hasProfile;

            return response()->json([
                'success' => true,
                'message' => 'Login successful',
                'user' => $userData,
                'token' => $token,
            ], 200);


        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Login failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get authenticated user profile
     */
    public function profile(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'error' => 'User not authenticated'
                ], 401);
            }

            // Load the doctor relationship
            $user->load('profile');
            
            // Calculate age from date_of_birth
            $age = null;
            $isUnderage = null;
            if ($user->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Check if user has profile
            $hasProfile = $user->profile !== null;

            // Add age, is_underage, is_expert and has_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_profile'] = $hasProfile;
            
            $responseData = [
                'success' => true,
                'message' => 'Profile retrieved successfully',
                'user' => $userData,
            ];

            // Check if user role is 'expert' and get doctor data
            if ($user->role === 'expert') {
                $doctor = Doctor::where('user_id', $user->id)->first();
                if ($doctor) {
                    $responseData['profile'] = $doctor;
                }
            }

            return response()->json($responseData, 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to get user profile',
                'details' => $th->getMessage()
            ], 500);
        }
    }
   
   
    public function test(Request $request): JsonResponse
    {
        try {
            return response()->json([
                'SRHR Basic' => 'Learn'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to get user profile',
                'details' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update user profile
     */
    public function updateProfile(UpdateProfileRequest $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Update user
            $user->update($request->only(['name', 'email', 'phone', 'role', 'date_of_birth', 'marital_status']));

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully',
                'data' => [
                    'user' => $user->fresh()
                ]
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update profile',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Change password
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        try {
            $user = $request->user();

            // Check current password
            if (!Hash::check($request->current_password, $user->password)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Current password is incorrect'
                ], 400);
            }

            // Update password
            $user->update([
                'password' => Hash::make($request->password)
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Password changed successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to change password',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Logout user (revoke current token)
     */
    public function logout(Request $request): JsonResponse
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Logged out successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Logout failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Logout from all devices (revoke all tokens)
     */
    public function logoutAll(Request $request): JsonResponse
    {
        try {
            $request->user()->tokens()->delete();

            return response()->json([
                'status' => true,
                'message' => 'Logged out from all devices successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Logout failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Refresh token (logout and login again)
     */
    public function refresh(Request $request): JsonResponse
    {
        try {
            $user = $request->user();
            
            // Revoke current token
            $request->user()->currentAccessToken()->delete();
            
            // Generate new token
            $token = $user->createToken('API Token')->plainTextToken;

            return response()->json([
                'status' => true,
                'message' => 'Token refreshed successfully',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                    'token_type' => 'Bearer'
                ]
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Token refresh failed',
                'error' => $th->getMessage()
            ], 500);
        }
    }

}
