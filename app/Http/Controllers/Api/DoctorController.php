<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use App\Models\User;
use App\Http\Requests\Api\CreateDoctorRequest;
use App\Http\Requests\Api\UpdateDoctorRequest;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class DoctorController extends Controller
{
    /**
     * Display a listing of doctors.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Doctor::all();


            return response()->json([
                'status' => true,
                'message' => 'Doctors retrieved successfully',
                'data' => $query
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve doctors',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created doctor profile.
     */
    public function store(CreateDoctorRequest $request): JsonResponse
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();

            // Check if user already has a doctor profile
            if ($user->doctor) {
                return response()->json([
                    'status' => false,
                    'message' => 'User already has a doctor profile'
                ], 400);
            }

            // Create doctor profile
            $doctor = Doctor::create([
                'user_id' => $user->id,
                'doctor_name' => $request->doctor_name,
                'phone' => $request->phone,
                'email' => $request->email,
                'address' => $request->address,
                'specialization' => $request->specialization,
                'bio' => $request->bio,
                'license_number' => $request->license_number,
                'qualification' => $request->qualification,
                'years_of_experience' => $request->years_of_experience,
                'working_hours' => $request->working_hours,
                'is_available' => $request->is_available ?? true,
                'status' => 'pending', // New profiles need verification
                'consultation_fee' => $request->consultation_fee,
                'consultation_duration_minutes' => $request->consultation_duration_minutes ?? 30,
                'clinic_name' => $request->clinic_name,
                'clinic_address' => $request->clinic_address,
                'latitude' => $request->latitude,
                'longitude' => $request->longitude,
                'languages_spoken' => $request->languages_spoken,
                'certifications' => $request->certifications,
                'awards' => $request->awards,
                'profile_picture' => $request->profile_picture,
                'gallery_images' => $request->gallery_images,
            ]);

            // Update user role to doctor
            $user->update(['role' => 'doctor']);

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Doctor profile created successfully',
                'data' => $doctor->load('user')
            ], 201);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to create doctor profile',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified doctor.
     */
    public function show(Doctor $doctor): JsonResponse
    {
        try {
            $doctor->load(['user', 'appointments' => function($query) {
                $query->where('status', 'completed')
                      ->orderBy('appointment_date', 'desc')
                      ->limit(10);
            }]);

            return response()->json([
                'status' => true,
                'message' => 'Doctor retrieved successfully',
                'data' => $doctor
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve doctor',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified doctor profile.
     */
    public function update(UpdateDoctorRequest $request, Doctor $doctor): JsonResponse
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();

            // Check if user owns this doctor profile
            if ($doctor->user_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access to doctor profile'
                ], 403);
            }

            // Update doctor profile
            $doctor->update($request->validated());

            DB::commit();

            return response()->json([
                'status' => true,
                'message' => 'Doctor profile updated successfully',
                'data' => $doctor->fresh()->load('user')
            ], 200);

        } catch (\Throwable $th) {
            DB::rollBack();
            return response()->json([
                'status' => false,
                'message' => 'Failed to update doctor profile',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update doctor availability.
     */
    public function updateAvailability(Request $request, Doctor $doctor): JsonResponse
    {
        try {
            $user = Auth::user();

            // Check if user owns this doctor profile
            if ($doctor->user_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access to doctor profile'
                ], 403);
            }

            $request->validate([
                'is_available' => 'required|boolean',
                'working_hours' => 'nullable|array',
            ]);

            $doctor->update([
                'is_available' => $request->is_available,
                'working_hours' => $request->working_hours ?? $doctor->working_hours,
            ]);

            return response()->json([
                'status' => true,
                'message' => 'Doctor availability updated successfully',
                'data' => $doctor->fresh()
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to update doctor availability',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get doctor's appointments.
     */
    public function appointments(Request $request, Doctor $doctor): JsonResponse
    {
        try {
            $user = Auth::user();

            // Check if user owns this doctor profile
            if ($doctor->user_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access to doctor appointments'
                ], 403);
            }

            $query = $doctor->appointments()->with(['patient']);

            // Apply filters
            if ($request->has('status')) {
                $query->byStatus($request->status);
            }

            if ($request->has('date_from') && $request->has('date_to')) {
                $query->byDateRange($request->date_from, $request->date_to);
            }

            if ($request->has('upcoming') && $request->upcoming) {
                $query->upcoming();
            }

            // Pagination
            $perPage = $request->get('per_page', 15);
            $appointments = $query->orderBy('appointment_date', 'desc')
                                ->paginate($perPage);

            return response()->json([
                'status' => true,
                'message' => 'Doctor appointments retrieved successfully',
                'data' => $appointments
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve doctor appointments',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get doctor's statistics.
     */
    public function statistics(Doctor $doctor): JsonResponse
    {
        try {
            $user = Auth::user();

            // Check if user owns this doctor profile
            if ($doctor->user_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access to doctor statistics'
                ], 403);
            }

            $statistics = [
                'total_appointments' => $doctor->appointments()->count(),
                'completed_appointments' => $doctor->appointments()->where('status', 'completed')->count(),
                'upcoming_appointments' => $doctor->appointments()->upcoming()->count(),
                'cancelled_appointments' => $doctor->appointments()->where('status', 'cancelled')->count(),
                'average_rating' => $doctor->average_rating,
                'total_reviews' => $doctor->total_reviews,
                'monthly_appointments' => $doctor->appointments()
                    ->whereMonth('appointment_date', now()->month)
                    ->whereYear('appointment_date', now()->year)
                    ->count(),
                'weekly_appointments' => $doctor->appointments()
                    ->whereBetween('appointment_date', [now()->startOfWeek(), now()->endOfWeek()])
                    ->count(),
            ];

            return response()->json([
                'status' => true,
                'message' => 'Doctor statistics retrieved successfully',
                'data' => $statistics
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve doctor statistics',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get available time slots for a doctor on a specific date.
     */
    public function availableSlots(Request $request, Doctor $doctor): JsonResponse
    {
        try {
            $request->validate([
                'date' => 'required|date|after_or_equal:today',
            ]);

            $date = $request->date;
            $workingHours = $doctor->working_hours;
            
            if (!$workingHours || !isset($workingHours[date('l', strtotime($date))])) {
                return response()->json([
                    'status' => false,
                    'message' => 'Doctor is not available on this date'
                ], 400);
            }

            $daySchedule = $workingHours[date('l', strtotime($date))];
            $startTime = $daySchedule['start'] ?? '09:00';
            $endTime = $daySchedule['end'] ?? '17:00';
            $duration = $doctor->consultation_duration_minutes ?? 30;

            // Get booked appointments for the date
            $bookedSlots = $doctor->appointments()
                ->whereDate('appointment_date', $date)
                ->whereIn('status', ['scheduled', 'confirmed'])
                ->get()
                ->map(function($appointment) {
                    return [
                        'start' => $appointment->start_time,
                        'end' => $appointment->end_time,
                    ];
                });

            // Generate available time slots
            $availableSlots = [];
            $currentTime = strtotime($date . ' ' . $startTime);
            $endTimeStamp = strtotime($date . ' ' . $endTime);

            while ($currentTime < $endTimeStamp) {
                $slotStart = date('H:i', $currentTime);
                $slotEnd = date('H:i', $currentTime + ($duration * 60));

                if ($currentTime + ($duration * 60) <= $endTimeStamp) {
                    // Check if slot is available
                    $isAvailable = true;
                    foreach ($bookedSlots as $bookedSlot) {
                        if (($slotStart < $bookedSlot['end'] && $slotEnd > $bookedSlot['start'])) {
                            $isAvailable = false;
                            break;
                        }
                    }

                    if ($isAvailable) {
                        $availableSlots[] = [
                            'start_time' => $slotStart,
                            'end_time' => $slotEnd,
                            'duration_minutes' => $duration,
                        ];
                    }
                }

                $currentTime += ($duration * 60);
            }

            return response()->json([
                'status' => true,
                'message' => 'Available time slots retrieved successfully',
                'data' => [
                    'date' => $date,
                    'doctor' => $doctor->doctor_name,
                    'available_slots' => $availableSlots,
                    'total_slots' => count($availableSlots),
                ]
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve available time slots',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get specializations list.
     */
    public function specializations(): JsonResponse
    {
        try {
            $specializations = Doctor::select('specialization')
                ->distinct()
                ->whereNotNull('specialization')
                ->orderBy('specialization')
                ->pluck('specialization');

            return response()->json([
                'status' => true,
                'message' => 'Specializations retrieved successfully',
                'data' => $specializations
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve specializations',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified doctor profile.
     */
    public function destroy(Doctor $doctor): JsonResponse
    {
        try {
            $user = Auth::user();

            // Check if user owns this doctor profile
            if ($doctor->user_id !== $user->id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Unauthorized access to doctor profile'
                ], 403);
            }

            // Check if doctor has upcoming appointments
            $upcomingAppointments = $doctor->appointments()
                ->whereIn('status', ['scheduled', 'confirmed'])
                ->where('appointment_date', '>=', now())
                ->count();

            if ($upcomingAppointments > 0) {
                return response()->json([
                    'status' => false,
                    'message' => 'Cannot delete doctor profile with upcoming appointments'
                ], 400);
            }

            $doctor->delete();

            // Update user role back to patient
            $user->update(['role' => 'patient']);

            return response()->json([
                'status' => true,
                'message' => 'Doctor profile deleted successfully'
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to delete doctor profile',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
