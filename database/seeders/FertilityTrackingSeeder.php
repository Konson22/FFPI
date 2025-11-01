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
                'period_start' => Carbon::now()->subDays(15),
                'period_end' => Carbon::now()->subDays(11),
                'ovulation_date' => Carbon::now()->subDays(6),
                'next_period' => Carbon::now()->addDays(13),
                'fertile_window_start' => Carbon::now()->subDays(8),
                'fertile_window_end' => Carbon::now()->subDays(4),
                'notes' => 'Feeling more emotional than usual, some mild cramping on day 2-3',
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            // Previous cycle for user 1
            [
                'user_id' => 1,
                'period_start' => Carbon::now()->subDays(43),
                'period_end' => Carbon::now()->subDays(39),
                'ovulation_date' => Carbon::now()->subDays(34),
                'next_period' => Carbon::now()->subDays(15),
                'fertile_window_start' => Carbon::now()->subDays(36),
                'fertile_window_end' => Carbon::now()->subDays(32),
                'notes' => 'Regular cycle, heavier flow on days 2-3',
                'created_at' => Carbon::now()->subDays(43),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            // Current cycle for user 2
            [
                'user_id' => 2,
                'period_start' => Carbon::now()->subDays(10),
                'period_end' => Carbon::now()->subDays(5),
                'ovulation_date' => Carbon::now()->subDays(1),
                'next_period' => Carbon::now()->addDays(20),
                'fertile_window_start' => Carbon::now()->subDays(3),
                'fertile_window_end' => Carbon::now()->addDays(1),
                'notes' => 'Peak fertility window, cervical mucus is clear and stretchy',
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now(),
            ],
            // Current cycle for user 3
            [
                'user_id' => 3,
                'period_start' => Carbon::now()->subDays(5),
                'period_end' => Carbon::now()->subDays(2),
                'ovulation_date' => Carbon::now()->addDays(4),
                'next_period' => Carbon::now()->addDays(21),
                'fertile_window_start' => Carbon::now()->addDays(2),
                'fertile_window_end' => Carbon::now()->addDays(6),
                'notes' => 'Feeling energetic and positive, no significant symptoms',
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now(),
            ],
            // Previous cycle for user 3
            [
                'user_id' => 3,
                'period_start' => Carbon::now()->subDays(31),
                'period_end' => Carbon::now()->subDays(28),
                'ovulation_date' => Carbon::now()->subDays(20),
                'next_period' => Carbon::now()->subDays(5),
                'fertile_window_start' => Carbon::now()->subDays(22),
                'fertile_window_end' => Carbon::now()->subDays(18),
                'notes' => 'Heavy period with severe cramps, needed pain relief on day 1-2',
                'created_at' => Carbon::now()->subDays(31),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            // Historical data for user 1 (older cycle)
            [
                'user_id' => 1,
                'period_start' => Carbon::now()->subDays(71),
                'period_end' => Carbon::now()->subDays(67),
                'ovulation_date' => Carbon::now()->subDays(62),
                'next_period' => Carbon::now()->subDays(43),
                'fertile_window_start' => Carbon::now()->subDays(64),
                'fertile_window_end' => Carbon::now()->subDays(60),
                'notes' => 'Normal cycle, no unusual symptoms',
                'created_at' => Carbon::now()->subDays(71),
                'updated_at' => Carbon::now()->subDays(43),
            ],
        ];

        DB::table('fertility_tracking')->insert($trackingData);
    }
}
