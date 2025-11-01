<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FertilityTracking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

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
            // If this is a web/Inertia request, redirect back with errors and old input
            if (!$request->wantsJson()) {
                return back()->withErrors($validator)->withInput();
            }

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

        // If this is a web/Inertia request, redirect with a success flash
        if (!$request->wantsJson()) {
            return redirect()
                ->route('user.health')
                ->with('success', 'Period tracked successfully');
        }

        $predictions = $this->computePredictions($tracking);

        return response()->json([
            'success' => true,
            'message' => 'Period tracked successfully',
            'data' => $tracking,
            'predictions' => $predictions,
        ], 201);
    }

    /**
     * Get all fertility tracking records for the authenticated user.
     */
    public function index()
    {
        $userId =  Auth::id();
        $tracking = FertilityTracking::where('user_id', $userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $latest = $tracking->first();
        $predictions = $latest ? $this->computePredictions($latest) : null;

        return response()->json([
            'success' => true,
            'data' => $tracking,
            'predictions' => $predictions,
        ]);
    }

    /**
     * Compute fertility predictions based on a single tracking record.
     */
    private function computePredictions(FertilityTracking $record): array
    {
        $cycleLength = $record->cycle_length ?: 28;
        $start = Carbon::parse($record->period_start_date)->startOfDay();
        $today = Carbon::today();

        $nextPeriod = (clone $start)->addDays($cycleLength);
        $ovulationDay = (clone $start)->addDays(max(1, $cycleLength - 14));

        $fertileStart = (clone $ovulationDay)->subDays(5);
        $fertileEnd = (clone $ovulationDay)->addDay();

        // Safe windows within the current cycle
        $safeBefore = [
            'start' => $start->toDateString(),
            'end' => (clone $fertileStart)->subDay()->toDateString(),
        ];
        $safeAfter = [
            'start' => (clone $fertileEnd)->addDay()->toDateString(),
            'end' => (clone $nextPeriod)->subDay()->toDateString(),
        ];

        // Current phase heuristic
        $currentPhase = null;
        if ($today->between($start, (clone $start)->addDays(4), true)) {
            $currentPhase = 'menstrual';
        } elseif ($today->lessThan($ovulationDay)) {
            $currentPhase = 'follicular';
        } elseif ($today->isSameDay($ovulationDay)) {
            $currentPhase = 'ovulatory';
        } elseif ($today->lessThan($nextPeriod)) {
            $currentPhase = 'luteal';
        }

        return [
            'cycle_length' => $cycleLength,
            'period_start_date' => $start->toDateString(),
            'next_period' => $nextPeriod->toDateString(),
            'ovulation_day' => $ovulationDay->toDateString(),
            'fertile_window' => [
                'start' => $fertileStart->toDateString(),
                'end' => $fertileEnd->toDateString(),
            ],
            'safe_days' => [
                'before_fertile' => $safeBefore,
                'after_fertile' => $safeAfter,
            ],
            'current_phase' => $currentPhase,
            'generated_at' => Carbon::now()->toIso8601String(),
        ];
    }
}
