<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FertilityTrackingSeeder extends Seeder
{
    public function run(): void
    {
        $trackingData = [
            // Current cycle for user 1
            [
                'user_id' => 1,
                'period_start_date' => Carbon::now()->subDays(15),
                'cycle_length' => 28,
                'period_length' => 5,
                'ovulation_date' => Carbon::now()->subDays(6),
                'next_period_date' => Carbon::now()->addDays(13),
                'cycle_phase' => 'luteal',
                'symptoms' => json_encode([
                    'mood_swings' => 'moderate',
                    'cramps' => 'mild',
                    'bloating' => 'severe',
                    'fatigue' => 'mild',
                    'breast_tenderness' => 'moderate'
                ]),
                'notes' => 'Feeling more emotional than usual, some mild cramping on day 2-3',
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            // Previous cycle for user 1
            [
                'user_id' => 1,
                'period_start_date' => Carbon::now()->subDays(43),
                'cycle_length' => 28,
                'period_length' => 5,
                'ovulation_date' => Carbon::now()->subDays(34),
                'next_period_date' => Carbon::now()->subDays(15),
                'cycle_phase' => 'menstrual',
                'symptoms' => json_encode([
                    'mood_swings' => 'mild',
                    'cramps' => 'moderate',
                    'bloating' => 'mild',
                    'fatigue' => 'moderate',
                    'breast_tenderness' => 'mild'
                ]),
                'notes' => 'Regular cycle, heavier flow on days 2-3',
                'created_at' => Carbon::now()->subDays(43),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            // Current cycle for user 2
            [
                'user_id' => 2,
                'period_start_date' => Carbon::now()->subDays(10),
                'cycle_length' => 30,
                'period_length' => 6,
                'ovulation_date' => Carbon::now()->subDays(1),
                'next_period_date' => Carbon::now()->addDays(20),
                'cycle_phase' => 'ovulatory',
                'symptoms' => json_encode([
                    'mood_swings' => 'mild',
                    'cramps' => 'none',
                    'bloating' => 'mild',
                    'fatigue' => 'none',
                    'breast_tenderness' => 'mild',
                    'cervical_mucus' => 'stretchy'
                ]),
                'notes' => 'Peak fertility window, cervical mucus is clear and stretchy',
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now(),
            ],
            // Current cycle for user 3
            [
                'user_id' => 3,
                'period_start_date' => Carbon::now()->subDays(5),
                'cycle_length' => 26,
                'period_length' => 4,
                'ovulation_date' => Carbon::now()->addDays(4),
                'next_period_date' => Carbon::now()->addDays(21),
                'cycle_phase' => 'follicular',
                'symptoms' => json_encode([
                    'mood_swings' => 'none',
                    'cramps' => 'none',
                    'bloating' => 'none',
                    'fatigue' => 'mild',
                    'breast_tenderness' => 'none',
                    'energy_level' => 'high'
                ]),
                'notes' => 'Feeling energetic and positive, no significant symptoms',
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now(),
            ],
            // Previous cycle for user 3
            [
                'user_id' => 3,
                'period_start_date' => Carbon::now()->subDays(31),
                'cycle_length' => 26,
                'period_length' => 4,
                'ovulation_date' => Carbon::now()->subDays(20),
                'next_period_date' => Carbon::now()->subDays(5),
                'cycle_phase' => 'menstrual',
                'symptoms' => json_encode([
                    'mood_swings' => 'moderate',
                    'cramps' => 'severe',
                    'bloating' => 'moderate',
                    'fatigue' => 'severe',
                    'breast_tenderness' => 'moderate',
                    'headaches' => 'mild'
                ]),
                'notes' => 'Heavy period with severe cramps, needed pain relief on day 1-2',
                'created_at' => Carbon::now()->subDays(31),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            // Historical data for user 1 (older cycle)
            [
                'user_id' => 1,
                'period_start_date' => Carbon::now()->subDays(71),
                'cycle_length' => 28,
                'period_length' => 5,
                'ovulation_date' => Carbon::now()->subDays(62),
                'next_period_date' => Carbon::now()->subDays(43),
                'cycle_phase' => 'menstrual',
                'symptoms' => json_encode([
                    'mood_swings' => 'mild',
                    'cramps' => 'mild',
                    'bloating' => 'mild',
                    'fatigue' => 'mild',
                    'breast_tenderness' => 'mild'
                ]),
                'notes' => 'Normal cycle, no unusual symptoms',
                'created_at' => Carbon::now()->subDays(71),
                'updated_at' => Carbon::now()->subDays(43),
            ],
        ];

        DB::table('fertility_tracking')->insert($trackingData);
    }
}
