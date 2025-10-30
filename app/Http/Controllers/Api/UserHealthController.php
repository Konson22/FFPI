<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FertilityTracking;
use App\Models\HealthService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

class UserHealthController extends Controller
{
    /**
     * Get user's health dashboard data
     */
    public function dashboard(Request $request)
    {
        // $user = $request->user();
        $user = User::find(41);
        
        try {
            // Get recent fertility tracking data
            $recentTracking = FertilityTracking::forUser($user->id)
                ->orderBy('created_at', 'desc')
                ->limit(5)
                ->get();

            // Get cycle statistics
            $cycleStats = $this->getCycleStatistics($user->id);

            // Get health insights
            $healthInsights = $this->getHealthInsights($user->id);

            return response()->json([
                'success' => true,
                'data' => [
                    'recent_tracking' => $recentTracking,
                    'cycle_statistics' => $cycleStats,
                    'health_insights' => $healthInsights,
                    'user_health_summary' => [
                        'total_cycles_tracked' => FertilityTracking::forUser($user->id)->count(),
                        'average_cycle_length' => $cycleStats['average_cycle_length'] ?? 0,
                        'last_period_date' => $recentTracking->first()?->period_start_date,
                        'next_predicted_period' => $this->predictNextPeriod($user->id),
                    ]
                ]
            ]);
        } catch (\Exception $e) {

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store fertility tracking data
     */
    public function storeFertilityTracking(Request $request)
    {
        $user = $request->user();

        $validator = Validator::make($request->all(), [
            'period_start_date' => 'required|date',
            'period_end_date' => 'nullable|date|after_or_equal:period_start_date',
            'cycle_length' => 'nullable|integer|min:20|max:40',
            'flow_intensity' => 'nullable|in:light,normal,heavy',
            'cycle_phase' => 'nullable|in:menstrual,follicular,ovulation,luteal',
            'basal_body_temperature' => 'nullable|numeric|min:35|max:40',
            'cervical_mucus' => 'nullable|in:dry,sticky,creamy,egg-white',
            'cervical_position' => 'nullable|in:low,medium,high',
            'ovulation_test_result' => 'nullable|boolean',
            'pregnancy_test_result' => 'nullable|boolean',
            'mood' => 'nullable|in:happy,sad,anxious,calm,irritable',
            'energy_level' => 'nullable|integer|min:1|max:10',
            'sleep_quality' => 'nullable|integer|min:1|max:10',
            'stress_level' => 'nullable|integer|min:1|max:10',
            'exercise_frequency' => 'nullable|in:none,light,moderate,heavy',
            'diet_notes' => 'nullable|string|max:500',
            'medication_notes' => 'nullable|string|max:500',
            'symptoms' => 'nullable|array',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $trackingData = $validator->validated();
            $trackingData['user_id'] = $user->id;

            $fertilityTracking = FertilityTracking::create($trackingData);

            Log::info('Fertility tracking data stored', [
                'user_id' => $user->id,
                'tracking_id' => $fertilityTracking->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Fertility tracking data saved successfully',
                'data' => $fertilityTracking
            ], 201);
        } catch (\Exception $e) {
            Log::error('Fertility tracking storage error', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to save fertility tracking data'
            ], 500);
        }
    }

    /**
     * Get fertility tracking history
     */
    public function getFertilityHistory(Request $request)
    {
        // $user = $request->user();
        $user = User::find(41);

        $perPage = $request->get('per_page', 15);
        $phase = $request->get('phase');
        $startDate = $request->get('start_date');
        $endDate = $request->get('end_date');

        try {
            $query = FertilityTracking::forUser($user->id);

            if ($phase) {
                $query->byPhase($phase);
            }

            if ($startDate) {
                $query->where('created_at', '>=', $startDate);
            }

            if ($endDate) {
                $query->where('created_at', '<=', $endDate);
            }

            $history = $query->orderBy('created_at', 'desc')
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $history
            ]);
        } catch (\Exception $e) {
            Log::error('Fertility history retrieval error', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve fertility history'
            ], 500);
        }
    }

    /**
     * Update fertility tracking data
     */
    public function updateFertilityTracking(Request $request, $id)
    {

        // $user = $request->user();
        $user = User::find(41);
        
        $fertilityTracking = FertilityTracking::forUser($user->id)->findOrFail($id);

        $validator = Validator::make($request->all(), [
            'period_start_date' => 'sometimes|date',
            'period_end_date' => 'nullable|date|after_or_equal:period_start_date',
            'cycle_length' => 'nullable|integer|min:20|max:40',
            'flow_intensity' => 'nullable|in:light,normal,heavy',
            'cycle_phase' => 'nullable|in:menstrual,follicular,ovulation,luteal',
            'basal_body_temperature' => 'nullable|numeric|min:35|max:40',
            'cervical_mucus' => 'nullable|in:dry,sticky,creamy,egg-white',
            'cervical_position' => 'nullable|in:low,medium,high',
            'ovulation_test_result' => 'nullable|boolean',
            'pregnancy_test_result' => 'nullable|boolean',
            'mood' => 'nullable|in:happy,sad,anxious,calm,irritable',
            'energy_level' => 'nullable|integer|min:1|max:10',
            'sleep_quality' => 'nullable|integer|min:1|max:10',
            'stress_level' => 'nullable|integer|min:1|max:10',
            'exercise_frequency' => 'nullable|in:none,light,moderate,heavy',
            'diet_notes' => 'nullable|string|max:500',
            'medication_notes' => 'nullable|string|max:500',
            'symptoms' => 'nullable|array',
            'notes' => 'nullable|string|max:1000',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $fertilityTracking->update($validator->validated());

            Log::info('Fertility tracking data updated', [
                'user_id' => $user->id,
                'tracking_id' => $fertilityTracking->id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Fertility tracking data updated successfully',
                'data' => $fertilityTracking->fresh()
            ]);
        } catch (\Exception $e) {
            Log::error('Fertility tracking update error', [
                'user_id' => $user->id,
                'tracking_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to update fertility tracking data'
            ], 500);
        }
    }

    /**
     * Delete fertility tracking data
     */
    public function deleteFertilityTracking(Request $request, $id)
    {
        $user = $request->user();

        try {
            $fertilityTracking = FertilityTracking::forUser($user->id)->findOrFail($id);
            $fertilityTracking->delete();

            Log::info('Fertility tracking data deleted', [
                'user_id' => $user->id,
                'tracking_id' => $id
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Fertility tracking data deleted successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Fertility tracking deletion error', [
                'user_id' => $user->id,
                'tracking_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete fertility tracking data'
            ], 500);
        }
    }

    /**
     * Get nearby health services
     */
    public function getNearbyServices(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'latitude' => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'radius' => 'nullable|numeric|min:1|max:100', // in kilometers
            'type' => 'nullable|string',
            'limit' => 'nullable|integer|min:1|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $latitude = $request->get('latitude');
            $longitude = $request->get('longitude');
            $radius = $request->get('radius', 10);
            $type = $request->get('type');
            $limit = $request->get('limit', 20);

            $query = HealthService::where('is_active', true);

            if ($type) {
                $query->where('type', $type);
            }

            if ($latitude && $longitude) {
                // Calculate distance using Haversine formula
                $query->selectRaw("*, (
                    6371 * acos(
                        cos(radians(?)) * cos(radians(latitude)) * 
                        cos(radians(longitude) - radians(?)) + 
                        sin(radians(?)) * sin(radians(latitude))
                    )
                ) AS distance", [$latitude, $longitude, $latitude])
                ->having('distance', '<=', $radius)
                ->orderBy('distance');
            } else {
                $query->orderBy('rating', 'desc');
            }

            $services = $query->limit($limit)->get();

            return response()->json([
                'success' => true,
                'data' => $services
            ]);
        } catch (\Exception $e) {
            Log::error('Nearby services retrieval error', [
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve nearby services'
            ], 500);
        }
    }

    /**
     * Get health analytics and insights
     */
    public function getHealthAnalytics(Request $request)
    {
        // $user = $request->user();
        $user = User::find(41);
        $period = $request->get('period', '3months'); // 1month, 3months, 6months, 1year

        try {
            $dateRange = $this->getDateRange($period);
            
            $analytics = [
                'cycle_patterns' => $this->analyzeCyclePatterns($user->id, $dateRange),
                'symptom_trends' => $this->analyzeSymptomTrends($user->id, $dateRange),
                'mood_patterns' => $this->analyzeMoodPatterns($user->id, $dateRange),
                'health_metrics' => $this->calculateHealthMetrics($user->id, $dateRange),
                'recommendations' => $this->generateHealthRecommendations($user->id, $dateRange)
            ];

            return response()->json([
                'success' => true,
                'data' => $analytics
            ]);
        } catch (\Exception $e) {
            Log::error('Health analytics error', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to generate health analytics'
            ], 500);
        }
    }

    /**
     * Export health data
     */
    public function exportHealthData(Request $request)
    {
        $user = $request->user();
        $format = $request->get('format', 'json'); // json, csv, pdf

        try {
            $healthData = [
                'user_info' => [
                    'name' => $user->name,
                    'email' => $user->email,
                    'export_date' => now()->toISOString()
                ],
                'fertility_tracking' => FertilityTracking::forUser($user->id)
                    ->orderBy('created_at', 'desc')
                    ->get(),
                'health_summary' => $this->getHealthSummary($user->id)
            ];

            if ($format === 'csv') {
                return $this->exportAsCsv($healthData);
            }

            return response()->json([
                'success' => true,
                'data' => $healthData
            ]);
        } catch (\Exception $e) {
            Log::error('Health data export error', [
                'user_id' => $user->id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'message' => 'Failed to export health data'
            ], 500);
        }
    }

    // Private helper methods

    private function getCycleStatistics($userId)
    {
        $cycles = FertilityTracking::forUser($userId)
            ->whereNotNull('cycle_length')
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        if ($cycles->isEmpty()) {
            return [
                'average_cycle_length' => 0,
                'cycle_variability' => 0,
                'total_cycles' => 0
            ];
        }

        $cycleLengths = $cycles->pluck('cycle_length')->filter();
        $averageLength = $cycleLengths->avg();
        $variability = $cycleLengths->max() - $cycleLengths->min();

        return [
            'average_cycle_length' => round($averageLength, 1),
            'cycle_variability' => $variability,
            'total_cycles' => $cycles->count(),
            'shortest_cycle' => $cycleLengths->min(),
            'longest_cycle' => $cycleLengths->max()
        ];
    }

    private function getHealthInsights($userId)
    {
        $recentTracking = FertilityTracking::forUser($userId)
            ->orderBy('created_at', 'desc')
            ->limit(3)
            ->get();

        $insights = [];

        if ($recentTracking->isNotEmpty()) {
            $latest = $recentTracking->first();
            
            if ($latest->stress_level && $latest->stress_level > 7) {
                $insights[] = [
                    'type' => 'warning',
                    'message' => 'High stress levels detected. Consider stress management techniques.',
                    'icon' => 'warning'
                ];
            }

            if ($latest->sleep_quality && $latest->sleep_quality < 5) {
                $insights[] = [
                    'type' => 'info',
                    'message' => 'Poor sleep quality noted. Focus on sleep hygiene.',
                    'icon' => 'moon'
                ];
            }

            if ($latest->energy_level && $latest->energy_level > 8) {
                $insights[] = [
                    'type' => 'success',
                    'message' => 'Great energy levels! Keep up the good work.',
                    'icon' => 'energy'
                ];
            }
        }

        return $insights;
    }

    private function predictNextPeriod($userId)
    {
        $lastPeriod = FertilityTracking::forUser($userId)
            ->whereNotNull('period_start_date')
            ->orderBy('period_start_date', 'desc')
            ->first();

        if (!$lastPeriod || !$lastPeriod->cycle_length) {
            return null;
        }

        return $lastPeriod->period_start_date->addDays($lastPeriod->cycle_length);
    }

    private function getDateRange($period)
    {
        $ranges = [
            '1month' => now()->subMonth(),
            '3months' => now()->subMonths(3),
            '6months' => now()->subMonths(6),
            '1year' => now()->subYear()
        ];

        return $ranges[$period] ?? $ranges['3months'];
    }

    private function analyzeCyclePatterns($userId, $startDate)
    {
        $cycles = FertilityTracking::forUser($userId)
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('cycle_length')
            ->get();

        return [
            'average_length' => $cycles->avg('cycle_length'),
            'regularity_score' => $this->calculateRegularityScore($cycles),
            'phase_distribution' => $cycles->groupBy('cycle_phase')->map->count()
        ];
    }

    private function analyzeSymptomTrends($userId, $startDate)
    {
        $tracking = FertilityTracking::forUser($userId)
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('symptoms')
            ->get();

        $symptomCounts = [];
        foreach ($tracking as $record) {
            if (is_array($record->symptoms)) {
                foreach ($record->symptoms as $symptom) {
                    $symptomCounts[$symptom] = ($symptomCounts[$symptom] ?? 0) + 1;
                }
            }
        }

        return [
            'most_common_symptoms' => collect($symptomCounts)->sortDesc()->take(5),
            'symptom_frequency' => $symptomCounts
        ];
    }

    private function analyzeMoodPatterns($userId, $startDate)
    {
        $tracking = FertilityTracking::forUser($userId)
            ->where('created_at', '>=', $startDate)
            ->whereNotNull('mood')
            ->get();

        return [
            'mood_distribution' => $tracking->groupBy('mood')->map->count(),
            'average_mood_score' => $this->calculateMoodScore($tracking)
        ];
    }

    private function calculateHealthMetrics($userId, $startDate)
    {
        $tracking = FertilityTracking::forUser($userId)
            ->where('created_at', '>=', $startDate)
            ->get();

        return [
            'average_energy_level' => $tracking->whereNotNull('energy_level')->avg('energy_level'),
            'average_sleep_quality' => $tracking->whereNotNull('sleep_quality')->avg('sleep_quality'),
            'average_stress_level' => $tracking->whereNotNull('stress_level')->avg('stress_level'),
            'exercise_frequency' => $tracking->groupBy('exercise_frequency')->map->count()
        ];
    }

    private function generateHealthRecommendations($userId, $startDate)
    {
        $metrics = $this->calculateHealthMetrics($userId, $startDate);
        $recommendations = [];

        if ($metrics['average_stress_level'] > 7) {
            $recommendations[] = [
                'type' => 'stress_management',
                'title' => 'Manage Stress',
                'description' => 'Consider meditation, deep breathing, or yoga to reduce stress levels.',
                'priority' => 'high'
            ];
        }

        if ($metrics['average_sleep_quality'] < 6) {
            $recommendations[] = [
                'type' => 'sleep_improvement',
                'title' => 'Improve Sleep Quality',
                'description' => 'Establish a consistent sleep schedule and create a relaxing bedtime routine.',
                'priority' => 'medium'
            ];
        }

        return $recommendations;
    }

    private function getHealthSummary($userId)
    {
        $totalRecords = FertilityTracking::forUser($userId)->count();
        $lastRecord = FertilityTracking::forUser($userId)->latest()->first();

        return [
            'total_tracking_records' => $totalRecords,
            'last_update' => $lastRecord?->updated_at,
            'tracking_streak' => $this->calculateTrackingStreak($userId)
        ];
    }

    private function calculateTrackingStreak($userId)
    {
        // Simple streak calculation - can be enhanced
        $records = FertilityTracking::forUser($userId)
            ->orderBy('created_at', 'desc')
            ->get();

        $streak = 0;
        $currentDate = now()->startOfDay();

        foreach ($records as $record) {
            $recordDate = $record->created_at->startOfDay();
            if ($recordDate->equalTo($currentDate->subDays($streak))) {
                $streak++;
            } else {
                break;
            }
        }

        return $streak;
    }

    private function calculateRegularityScore($cycles)
    {
        if ($cycles->count() < 2) return 0;

        $lengths = $cycles->pluck('cycle_length');
        $average = $lengths->avg();
        $variance = $lengths->map(function ($length) use ($average) {
            return pow($length - $average, 2);
        })->avg();

        $standardDeviation = sqrt($variance);
        
        // Score from 0-100, where 100 is perfectly regular
        return max(0, 100 - ($standardDeviation * 10));
    }

    private function calculateMoodScore($tracking)
    {
        $moodScores = [
            'happy' => 5,
            'calm' => 4,
            'anxious' => 2,
            'sad' => 1,
            'irritable' => 2
        ];

        $totalScore = 0;
        $count = 0;

        foreach ($tracking as $record) {
            if (isset($moodScores[$record->mood])) {
                $totalScore += $moodScores[$record->mood];
                $count++;
            }
        }

        return $count > 0 ? round($totalScore / $count, 2) : 0;
    }

    private function exportAsCsv($healthData)
    {
        // Implementation for CSV export
        // This would generate a CSV file and return it as a download response
        return response()->json([
            'success' => true,
            'message' => 'CSV export not implemented yet',
            'data' => $healthData
        ]);
    }
}
