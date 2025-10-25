<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class RemindersSeeder extends Seeder
{
    public function run(): void
    {
        $reminders = [
            // Period reminders
            [
                'user_id' => 1,
                'type' => 'period',
                'message' => 'Your period is expected to start in 2 days. Make sure you have supplies ready!',
                'reminder_time' => Carbon::now()->addDays(2)->setTime(9, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'monthly', 'day_offset' => -2]),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'type' => 'period',
                'message' => 'Period tracking reminder - log your symptoms and flow intensity.',
                'reminder_time' => Carbon::now()->addDays(3)->setTime(20, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'medium',
                'recurring_pattern' => json_encode(['type' => 'monthly', 'day_offset' => 1]),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Ovulation reminders
            [
                'user_id' => 1,
                'type' => 'ovulation',
                'message' => 'You\'re entering your fertile window! Track your cervical mucus and temperature.',
                'reminder_time' => Carbon::now()->addDays(5)->setTime(8, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'monthly', 'day_offset' => 4]),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 1,
                'type' => 'ovulation',
                'message' => 'Peak fertility day - this is your best chance to conceive!',
                'reminder_time' => Carbon::now()->addDays(7)->setTime(10, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'monthly', 'day_offset' => 6]),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Contraceptive reminders
            [
                'user_id' => 2,
                'type' => 'contraceptive',
                'message' => 'Time to take your birth control pill!',
                'reminder_time' => Carbon::now()->addHours(2)->setTime(21, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'daily', 'time' => '21:00']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 2,
                'type' => 'contraceptive',
                'message' => 'Weekly contraceptive patch change reminder.',
                'reminder_time' => Carbon::now()->addDays(7)->setTime(9, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'weekly', 'day' => 'monday']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // General health reminders
            [
                'user_id' => 3,
                'type' => 'health',
                'message' => 'Time to log your daily symptoms and mood.',
                'reminder_time' => Carbon::now()->addHours(1)->setTime(19, 0),
                'is_sent' => false,
                'recurring' => true,
                'priority' => 'medium',
                'recurring_pattern' => json_encode(['type' => 'daily', 'time' => '19:00']),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => 3,
                'type' => 'health',
                'message' => 'Schedule your annual gynecological exam.',
                'reminder_time' => Carbon::now()->addDays(30)->setTime(10, 0),
                'is_sent' => false,
                'recurring' => false,
                'priority' => 'low',
                'recurring_pattern' => null,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            // Past reminders (sent)
            [
                'user_id' => 1,
                'type' => 'period',
                'message' => 'Your period started yesterday. How are you feeling today?',
                'reminder_time' => Carbon::now()->subDays(1)->setTime(9, 0),
                'is_sent' => true,
                'recurring' => false,
                'priority' => 'medium',
                'recurring_pattern' => null,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => 2,
                'type' => 'contraceptive',
                'message' => 'Time to take your birth control pill!',
                'reminder_time' => Carbon::now()->subHours(2)->setTime(21, 0),
                'is_sent' => true,
                'recurring' => true,
                'priority' => 'high',
                'recurring_pattern' => json_encode(['type' => 'daily', 'time' => '21:00']),
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subHours(2),
            ],
        ];

        DB::table('reminders')->insert($reminders);
    }
}
