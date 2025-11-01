<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Reminder;
use App\Models\FertilityTracking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ReminderController extends Controller
{
    /**
     * List reminders for the authenticated user.
     */
    public function index(Request $request)
    {
        $reminders = Reminder::query()
            ->forUser(Auth::id())
            ->orderBy('reminder_time', 'asc')
            ->get();

        return response()->json([
            'success' => true,
            'data' => $reminders,
        ]);
    }

    /**
     * Create a new reminder for the authenticated user.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'type' => 'required|string|max:100',
            'message' => 'required|string|max:255',
            'reminder_time' => 'required|date',
            'recurring' => 'sometimes|boolean',
            'recurring_pattern' => 'sometimes|array',
            'priority' => 'sometimes|in:low,medium,high',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $reminder = Reminder::create([
            'user_id' => Auth::id(),
            'type' => $request->type,
            'message' => $request->message,
            'reminder_time' => Carbon::parse($request->reminder_time),
            'is_sent' => false,
            'recurring' => (bool) ($request->recurring ?? false),
            'recurring_pattern' => $request->recurring_pattern ?? null,
            'priority' => $request->priority ?? 'medium',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Reminder created',
            'data' => $reminder,
        ], 201);
    }

    /**
     * Update a reminder belonging to the authenticated user.
     */
    public function update(Request $request, int $id)
    {
        $reminder = Reminder::where('user_id', Auth::id())->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'type' => 'sometimes|string|max:100',
            'message' => 'sometimes|string|max:255',
            'reminder_time' => 'sometimes|date',
            'is_sent' => 'sometimes|boolean',
            'recurring' => 'sometimes|boolean',
            'recurring_pattern' => 'sometimes|array|nullable',
            'priority' => 'sometimes|in:low,medium,high',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors(),
            ], 422);
        }

        $data = $validator->validated();
        if (isset($data['reminder_time'])) {
            $data['reminder_time'] = Carbon::parse($data['reminder_time']);
        }

        $reminder->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Reminder updated',
            'data' => $reminder,
        ]);
    }

    /**
     * Delete a reminder belonging to the authenticated user.
     */
    public function destroy(int $id)
    {
        $reminder = Reminder::where('user_id', Auth::id())->findOrFail($id);
        $reminder->delete();

        return response()->json([
            'success' => true,
            'message' => 'Reminder deleted',
        ]);
    }

    /**
     * Create reminders automatically from the latest fertility tracking prediction.
     * Generates: next period, fertile window start, ovulation day.
     */
    public function createFromFertility()
    {
        $latest = FertilityTracking::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$latest) {
            return response()->json([
                'success' => false,
                'message' => 'No fertility tracking data found',
            ], 404);
        }

        $cycleLength = $latest->cycle_length ?: 28;
        $start = Carbon::parse($latest->period_start_date)->startOfDay();
        $nextPeriod = (clone $start)->addDays($cycleLength);
        $ovulationDay = (clone $start)->addDays(max(1, $cycleLength - 14));
        $fertileStart = (clone $ovulationDay)->subDays(5);

        $userId = Auth::id();

        $created = [];
        $created[] = Reminder::create([
            'user_id' => $userId,
            'type' => 'period',
            'message' => 'Your next period is expected today',
            'reminder_time' => $nextPeriod->copy()->setTime(9, 0),
            'is_sent' => false,
            'recurring' => false,
            'priority' => 'medium',
        ]);

        $created[] = Reminder::create([
            'user_id' => $userId,
            'type' => 'fertile_window',
            'message' => 'Fertile window begins today',
            'reminder_time' => $fertileStart->copy()->setTime(9, 0),
            'is_sent' => false,
            'recurring' => false,
            'priority' => 'medium',
        ]);

        $created[] = Reminder::create([
            'user_id' => $userId,
            'type' => 'ovulation',
            'message' => 'Estimated ovulation is today',
            'reminder_time' => $ovulationDay->copy()->setTime(9, 0),
            'is_sent' => false,
            'recurring' => false,
            'priority' => 'high',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Fertility reminders created',
            'data' => $created,
        ], 201);
    }
}


