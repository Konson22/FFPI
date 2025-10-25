<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SymptomsSeeder extends Seeder
{
    public function run(): void
    {
        // Get fertility tracking records to reference
        $trackingRecords = DB::table('fertility_tracking')->get();
        
        if ($trackingRecords->isEmpty()) {
            $this->command->warn('No fertility tracking records found. Please run FertilityTrackingSeeder first.');
            return;
        }

        $symptoms = [];
        
        foreach ($trackingRecords as $tracking) {
            // Add symptoms based on cycle phase and tracking data
            $trackingId = $tracking->id;
            $cyclePhase = $tracking->cycle_phase;
            $periodStartDate = Carbon::parse($tracking->period_start_date);
            $daysSincePeriod = Carbon::now()->diffInDays($periodStartDate);
            
            // Common symptoms for different cycle phases
            if ($cyclePhase === 'menstrual' || $daysSincePeriod <= 5) {
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'cramps',
                    'severity' => 'moderate',
                    'note' => 'Lower abdominal cramping, worse on day 2',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'fatigue',
                    'severity' => 'mild',
                    'note' => 'Feeling more tired than usual',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'bloating',
                    'severity' => 'moderate',
                    'note' => 'Stomach feels swollen and uncomfortable',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
            }
            
            if ($cyclePhase === 'ovulatory' || ($daysSincePeriod >= 10 && $daysSincePeriod <= 16)) {
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'cervical_mucus',
                    'severity' => 'mild',
                    'note' => 'Clear, stretchy, egg-white consistency',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'mittelschmerz',
                    'severity' => 'mild',
                    'note' => 'Mild pain on one side of lower abdomen',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'increased_libido',
                    'severity' => 'mild',
                    'note' => 'Higher than usual sex drive',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
            }
            
            if ($cyclePhase === 'luteal' || ($daysSincePeriod >= 17 && $daysSincePeriod <= 28)) {
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'mood_swings',
                    'severity' => 'moderate',
                    'note' => 'Feeling more emotional and irritable',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'breast_tenderness',
                    'severity' => 'mild',
                    'note' => 'Slight tenderness and sensitivity',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
                $symptoms[] = [
                    'fertility_tracking_id' => $trackingId,
                    'name' => 'bloating',
                    'severity' => 'mild',
                    'note' => 'Mild bloating and water retention',
                    'created_at' => $tracking->created_at,
                    'updated_at' => $tracking->updated_at,
                ];
            }
            
            // Add some general symptoms that can occur at any time
            $symptoms[] = [
                'fertility_tracking_id' => $trackingId,
                'name' => 'headache',
                'severity' => 'mild',
                'note' => 'Occasional mild headaches',
                'created_at' => $tracking->created_at,
                'updated_at' => $tracking->updated_at,
            ];
            
            // Add some cycle-specific symptoms based on the tracking data
            if ($tracking->notes) {
                if (strpos(strtolower($tracking->notes), 'heavy') !== false) {
                    $symptoms[] = [
                        'fertility_tracking_id' => $trackingId,
                        'name' => 'heavy_flow',
                        'severity' => 'moderate',
                        'note' => 'Heavier than normal menstrual flow',
                        'created_at' => $tracking->created_at,
                        'updated_at' => $tracking->updated_at,
                    ];
                }
                if (strpos(strtolower($tracking->notes), 'pain') !== false) {
                    $symptoms[] = [
                        'fertility_tracking_id' => $trackingId,
                        'name' => 'pelvic_pain',
                        'severity' => 'moderate',
                        'note' => 'General pelvic discomfort',
                        'created_at' => $tracking->created_at,
                        'updated_at' => $tracking->updated_at,
                    ];
                }
            }
        }

        // Insert symptoms in batches to avoid memory issues
        $chunks = array_chunk($symptoms, 100);
        foreach ($chunks as $chunk) {
            DB::table('symptoms')->insert($chunk);
        }
    }
}
