<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\HealthService;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class HealthServiceController extends Controller
{
    /**
     * Display a listing of health services.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $data = HealthService::all()->map(function($service) {
                return [
                    'id' => $service->id,
                    'name' => $service->name,
                    'description' => $service->description,
                    'type' => $service->type,
                    'service_category' => $service->service_category,
                    'ownership' => $service->ownership,
                    'city' => $service->city,
                    'state' => $service->state,
                    'image' => $service->image,
                ];
            })->values();

            // Pagination

            return response()->json([
                'success' => true,
                'message' => 'Health services retrieved successfully',
                'data' => $data
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve health services',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified health service.
     */
    public function show($id): JsonResponse
    {
        try {
            $service = HealthService::findOrFail($id);

            // Check if service is active and public
            if (!$service->is_active && !request()->get('include_inactive', false)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Health service not found'
                ], 404);
            }

            if (!$service->is_public && !request()->get('include_private', false)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Health service not found'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'message' => 'Health service retrieved successfully',
                'data' => $service
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Health service not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve health service',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get available service categories.
     */
    public function categories(): JsonResponse
    {
        try {
            $categories = HealthService::select('service_category')
                ->distinct()
                ->whereNotNull('service_category')
                ->where('is_active', true)
                ->orderBy('service_category')
                ->pluck('service_category');

            return response()->json([
                'success' => true,
                'message' => 'Service categories retrieved successfully',
                'data' => $categories
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve service categories',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get health services by location (nearby services).
     */
    public function nearby(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'latitude' => 'required|numeric|between:-90,90',
                'longitude' => 'required|numeric|between:-180,180',
                'radius' => 'nullable|numeric|min:1|max:500', // Max 500km
            ]);

            $latitude = $request->latitude;
            $longitude = $request->longitude;
            $radius = $request->get('radius', 25); // Default 25km radius

            $query = HealthService::query()
                ->active()
                ->public();

            // Apply category filter if provided
            if ($request->has('category') && $request->category !== 'all') {
                $query->byCategory($request->category);
            }

            // Apply search filter if provided
            if ($request->has('search')) {
                $query->search($request->search);
            }

            // Haversine formula for distance calculation
            $services = $query->selectRaw(
                '*, (6371 * acos(cos(radians(?)) * cos(radians(latitude)) * cos(radians(longitude) - radians(?)) + sin(radians(?)) * sin(radians(latitude)))) AS distance',
                [$latitude, $longitude, $latitude]
            )
            ->having('distance', '<=', $radius)
            ->orderBy('distance')
            ->orderBy('rating', 'desc')
            ->get();

            return response()->json([
                'success' => true,
                'message' => 'Nearby health services retrieved successfully',
                'data' => [
                    'services' => $services,
                    'total' => $services->count(),
                    'radius_km' => $radius,
                    'location' => [
                        'latitude' => $latitude,
                        'longitude' => $longitude,
                    ]
                ]
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve nearby health services',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}

