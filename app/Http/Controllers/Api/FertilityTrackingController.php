<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FertilityTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class FertilityTrackingController extends Controller
{
    /**
     * Store a newly created fertility tracking record.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'period_start_date' => 'required|date',
            'cycle_length' => 'nullable|integer|min:21|max:45',
            'cycle_phase' => 'nullable|in:menstrual,follicular,ovulatory,luteal',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $tracking = FertilityTracking::create([
            'user_id' => Auth::id(),
            'period_start_date' => $request->period_start_date,
            'cycle_length' => $request->cycle_length ?? 28,
            'cycle_phase' => $request->cycle_phase,
            'notes' => $request->notes,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Period tracked successfully',
            'data' => $tracking
        ], 201);
    }

    /**
     * Get all fertility tracking records for the authenticated user.
     */
    public function index()
    {
        $tracking = FertilityTracking::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $tracking
        ]);
    }
}
