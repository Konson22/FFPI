<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Profile;
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
use Illuminate\Support\Facades\Storage;
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
            ]);

            // Fire the Registered event (this will trigger the welcome email listener)
            event(new Registered($user));

            // Generate API token
            $token = $user->createToken('API Token')->plainTextToken;

            // Load relationships based on user role
            if ($user->role === 'expert') {
                $user->load('profile', 'doctorProfile');
            } else {
                $user->load('profile');
            }

            // Calculate age from date_of_birth (from profile)
            $age = null;
            $isUnderage = null;
            if ($user->profile && $user->profile->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->profile->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Check if user has profile
            $hasProfile = $user->profile !== null;

            // Add age, is_underage, is_expert, has_profile and has_expert_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_profile'] = $hasProfile;
            $userData['has_expert_profile'] = (bool) $user->doctorProfile;
            
            // Remove doctorProfile from response (only need has_expert_profile boolean)
            unset($userData['doctorProfile']);

            return response()->json([
                'success' => true,
                'message' => 'User registered successfully. Welcome email sent!',
                'user' => $userData,
                'token' => $token,
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

            // Load relationships based on user role
            if ($user->role === 'expert') {
                $user->load('profile', 'doctorProfile');
            } else {
                $user->load('profile');
            }

            // Calculate age from date_of_birth (from profile)
            $age = null;
            $isUnderage = null;
            if ($user->profile && $user->profile->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->profile->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Add age, is_underage, is_expert and has_expert_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_expert_profile'] = (bool) $user->doctorProfile;
            
            // Remove doctorProfile from response (only need has_expert_profile boolean)
            unset($userData['doctorProfile']);

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

            // Load relationships based on user role
            if ($user->role === 'expert') {
                $user->load('profile', 'doctorProfile');
            } else {
                $user->load('profile');
            }
            
            // Calculate age from date_of_birth (from profile)
            $age = null;
            $isUnderage = null;
            if ($user->profile && $user->profile->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->profile->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Add age, is_underage, is_expert and has_expert_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_expert_profile'] = (bool) $user->doctorProfile;
            
            // Remove doctorProfile from response (only need has_expert_profile boolean)
            unset($userData['doctorProfile']);

            return response()->json([
                'success' => true,
                'message' => 'Profile retrieved successfully',
                'user' => $userData,
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
     * Store or update doctor profile for authenticated expert
     */
    public function storeDoctor(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            if ($user->role !== 'expert') {
                return response()->json([
                    'success' => false,
                    'message' => 'Only experts can create doctor profiles'
                ], 403);
            }

            $doctorProfile = $user->doctorProfile;

            $validator = Validator::make($request->all(), [
                'doctor_name' => 'required|string|max:255',
                'phone' => 'nullable|string|max:20',
                'specialization' => 'required|string|max:255',
                'bio' => 'nullable|string',
                'license_number' => 'required|string|max:255|unique:doctors,license_number' . ($doctorProfile ? ',' . $doctorProfile->id : ''),
                'years_of_experience' => 'nullable|integer|min:0',
                'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $data = $validator->validated();

            if ($request->hasFile('profile_picture')) {
                if ($doctorProfile && $doctorProfile->profile_picture) {
                    Storage::disk('public')->delete($doctorProfile->profile_picture);
                }

                $data['profile_picture'] = $request->file('profile_picture')
                    ->store('doctor-profile-pictures', 'public');
            } else {
                unset($data['profile_picture']);
            }

            if (!array_key_exists('is_available', $data)) {
                $data['is_available'] = true;
            }

            if (!array_key_exists('status', $data)) {
                $data['status'] = 'active';
            }

            $doctor = Doctor::updateOrCreate(
                ['user_id' => $user->id],
                array_merge($data, ['user_id' => $user->id])
            );

            // Reload user with relationships based on role
            if ($user->role === 'expert') {
                $user->load('profile', 'doctorProfile');
            } else {
                $user->load('profile');
            }

            // Calculate age from date_of_birth (from profile)
            $age = null;
            $isUnderage = null;
            if ($user->profile && $user->profile->date_of_birth) {
                $age = \Carbon\Carbon::parse($user->profile->date_of_birth)->age;
                $isUnderage = $age < 18;
            }

            // Check if user is expert
            $isExpert = $user->role === 'expert';

            // Add age, is_underage, is_expert and has_expert_profile to user data
            $userData = $user->toArray();
            $userData['age'] = $age;
            $userData['is_underage'] = $isUnderage;
            $userData['is_expert'] = $isExpert;
            $userData['has_expert_profile'] = (bool) $user->doctorProfile;
            
            // Remove doctorProfile from response (only need has_expert_profile boolean)
            unset($userData['doctorProfile']);

            return response()->json([
                'success' => true,
                'message' => 'Doctor profile saved successfully',
                'user' => $userData,
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to store doctor profile',
                'error' => $th->getMessage()
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

            // Separate user fields from profile fields
            $userFields = $request->only(['name', 'email', 'phone', 'role']);
            $profileFields = $request->only(['gender', 'date_of_birth', 'marital_status', 'cycle_length', 'period_length', 'health_notes', 'preferences']);

            // Update user if user fields are provided
            if (!empty($userFields)) {
                $user->update($userFields);
            }

            // Handle profile update/create
            if (!empty(array_filter($profileFields, fn($value) => $value !== null))) {
                // Decode preferences if it's a JSON string
                if (isset($profileFields['preferences'])) {
                    if (is_string($profileFields['preferences'])) {
                        $decoded = json_decode($profileFields['preferences'], true);
                        $profileFields['preferences'] = json_last_error() === JSON_ERROR_NONE ? $decoded : null;
                    }
                    // If it's already an array or null, leave it as is
                }

                // Get or create profile
                $profile = $user->profile;
                
                if ($profile) {
                    // Update existing profile
                    $profile->update($profileFields);
                } else {
                    // Create new profile
                    $profileFields['user_id'] = $user->id;
                    $profile = Profile::create($profileFields);
                }
            }

            // Reload user with relationships based on role
            if ($user->role === 'expert') {
                $user->load('profile', 'doctorProfile');
            } else {
                $user->load('profile');
            }

            // Prepare user data
            $userData = $user->toArray();
            
            // Remove doctorProfile from response (only need has_expert_profile boolean)
            unset($userData['doctorProfile']);

            return response()->json([
                'status' => true,
                'message' => 'Profile updated successfully',
                'user' => $userData
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
     * Delete authenticated user's account
     */
    public function deleteAccount(Request $request): JsonResponse
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json([
                    'status' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Revoke all tokens before deleting the account
            $user->tokens()->delete();

            // Remove related profile if it exists
            if ($user->profile) {
                $user->profile->delete();
            }

            // Remove doctor profile if user is an expert
            if ($user->role === 'expert') {
                Doctor::where('user_id', $user->id)->delete();
            }

            $user->delete();

            return response()->json([
                'status' => true,
                'message' => 'Account deleted successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete account',
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

    /**
     * Store or update Expo push token
     */
    public function storeExpoToken(Request $request): JsonResponse
    {
        try {
            $validator = Validator::make($request->all(), [
                'expo_token' => 'required|string',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors()
                ], 422);
            }

            $user = $request->user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated'
                ], 401);
            }

            // Update user's expo token
            $user->update([
                'expo_token' => $request->expo_token
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Expo token stored successfully',
                'user' => $user->fresh()
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to store expo token',
                'error' => $th->getMessage()
            ], 500);
        }
    }

}

