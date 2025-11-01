<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Api\FertilityTrackingRequest;
use App\Models\FertilityTracking;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class FertilityTrackingController extends Controller
{
    /**
     * Store a newly created fertility tracking record.
     */
    public function store(FertilityTrackingRequest $request)
    {

        // Parse period_start date
        $periodStart = Carbon::parse($request->period_start);
        
        // Get cycle length from user profile, request, or default to 28 days
        $user = Auth::user();
        $cycleLength = $request->cycle_length 
            ?? ($user->profile ? $user->profile->cycle_length : null)
            ?? 28;
        
        // Calculate next period date (period_start + cycle_length)
        $nextPeriod = (clone $periodStart)->addDays($cycleLength);
        
        // Calculate ovulation date (typically 14 days before next period)
        $ovulationDate = (clone $nextPeriod)->subDays(14);
        
        // Calculate fertile window (5 days before ovulation to 1 day after)
        $fertileWindowStart = (clone $ovulationDate)->subDays(5);
        $fertileWindowEnd = (clone $ovulationDate)->addDay();

        $tracking = FertilityTracking::create([
            'user_id' => Auth::id(),
            'period_start' => $periodStart->toDateString(),
            'period_end' => $request->period_end ? Carbon::parse($request->period_end)->toDateString() : null,
            'ovulation_date' => $ovulationDate->toDateString(),
            'next_period' => $nextPeriod->toDateString(),
            'fertile_window_start' => $fertileWindowStart->toDateString(),
            'fertile_window_end' => $fertileWindowEnd->toDateString(),
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
        try {
            // $userId = Auth::id();
            $userId = User::find(1)->id;
            
            if (!$userId) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthenticated. Please log in.',
                ], 401);
            }

            $today = Carbon::today();
            
            // Get all tracking records ordered by period_start (newest first)
            $allTracking = FertilityTracking::where('user_id', $userId)
                ->orderBy('period_start', 'desc')
                ->get();

            // Find current cycle (most recent period that hasn't ended yet)
            $currentCycle = null;
            foreach ($allTracking as $record) {
                $periodStart = Carbon::parse($record->period_start);
                $nextPeriod = $record->next_period ? Carbon::parse($record->next_period) : null;
                $periodEnd = $record->period_end ? Carbon::parse($record->period_end) : null;
                
                // Current cycle if: period started and (next period hasn't come yet OR period hasn't ended)
                if ($periodStart <= $today) {
                    if ($nextPeriod && $nextPeriod >= $today) {
                        $currentCycle = $record;
                        break;
                    } elseif (!$periodEnd || $periodEnd >= $today) {
                        $currentCycle = $record;
                        break;
                    }
                }
            }

            if (!$currentCycle) {
                return response()->json([
                    'success' => true,
                    'message' => 'No active cycle found',
                    'current_cycle' => null,
                ]);
            }

            return response()->json([
                'success' => true,
                'current_cycle' => $currentCycle,
                'predictions' => $this->computePredictions($currentCycle),
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch fertility tracking data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Compute fertility predictions based on a single tracking record.
     */
    private function computePredictions(FertilityTracking $record): array
    {
        // Validate period_start exists
        if (!$record->period_start) {
            throw new \InvalidArgumentException('period_start is required for predictions');
        }
        
        // Use the stored period_start from the record
        $start = Carbon::parse($record->period_start)->startOfDay();
        $today = Carbon::today();

        // Get cycle length from stored next_period, user profile, or default
        $cycleLength = 28;
        if ($record->next_period) {
            $nextPeriod = Carbon::parse($record->next_period)->startOfDay();
            $cycleLength = $start->diffInDays($nextPeriod);
        } else {
            // Get cycle length from user profile if available
            $user = $record->user;
            if ($user && $user->profile && $user->profile->cycle_length) {
                $cycleLength = $user->profile->cycle_length;
            }
            $nextPeriod = (clone $start)->addDays($cycleLength);
        }

        // Use stored ovulation_date if available, otherwise calculate
        if ($record->ovulation_date) {
            $ovulationDay = Carbon::parse($record->ovulation_date)->startOfDay();
        } else {
            $ovulationDay = (clone $start)->addDays(max(1, $cycleLength - 14));
        }

        // Use stored fertile window if available, otherwise calculate
        if ($record->fertile_window_start && $record->fertile_window_end) {
            $fertileStart = Carbon::parse($record->fertile_window_start)->startOfDay();
            $fertileEnd = Carbon::parse($record->fertile_window_end)->startOfDay();
        } else {
            $fertileStart = (clone $ovulationDay)->subDays(5);
            $fertileEnd = (clone $ovulationDay)->addDay();
        }

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
            'period_start' => $start->toDateString(),
            'period_end' => $record->period_end ? Carbon::parse($record->period_end)->toDateString() : null,
            'next_period' => $nextPeriod->toDateString(),
            'ovulation_date' => $ovulationDay->toDateString(),
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
