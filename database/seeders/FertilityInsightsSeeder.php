<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class FertilityInsightsSeeder extends Seeder
{
    public function run(): void
    {
        $insights = [
            [
                'user_id' => 1,
                'cycle_start_date' => Carbon::now()->subDays(15),
                'fertile_window_start' => Carbon::now()->subDays(8),
                'fertile_window_end' => Carbon::now()->subDays(4),
                'ovulation_date' => Carbon::now()->subDays(6),
                'safe_days_start' => Carbon::now()->subDays(3),
                'safe_days_end' => Carbon::now()->addDays(10),
                'cycle_length' => 28,
                'period_length' => 5,
                'prediction_status' => 'confirmed',
                'notification_sent' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'cycle_start_date' => Carbon::now()->subDays(43),
                'fertile_window_start' => Carbon::now()->subDays(36),
                'fertile_window_end' => Carbon::now()->subDays(32),
                'ovulation_date' => Carbon::now()->subDays(34),
                'safe_days_start' => Carbon::now()->subDays(31),
                'safe_days_end' => Carbon::now()->subDays(16),
                'cycle_length' => 28,
                'period_length' => 5,
                'prediction_status' => 'confirmed',
                'notification_sent' => true,
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            [
                'user_id' => 2,
                'cycle_start_date' => Carbon::now()->subDays(10),
                'fertile_window_start' => Carbon::now()->subDays(3),
                'fertile_window_end' => Carbon::now()->addDays(1),
                'ovulation_date' => Carbon::now()->subDays(1),
                'safe_days_start' => Carbon::now()->addDays(2),
                'safe_days_end' => Carbon::now()->addDays(17),
                'cycle_length' => 30,
                'period_length' => 6,
                'prediction_status' => 'predicted',
                'notification_sent' => false,
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'user_id' => 3,
                'cycle_start_date' => Carbon::now()->subDays(5),
                'fertile_window_start' => Carbon::now()->addDays(2),
                'fertile_window_end' => Carbon::now()->addDays(6),
                'ovulation_date' => Carbon::now()->addDays(4),
                'safe_days_start' => Carbon::now()->addDays(7),
                'safe_days_end' => Carbon::now()->addDays(22),
                'cycle_length' => 26,
                'period_length' => 4,
                'prediction_status' => 'predicted',
                'notification_sent' => false,
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
        ];

        DB::table('fertility_insights')->insert($insights);
    }
}
