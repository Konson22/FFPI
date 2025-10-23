<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class UserProgressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $progress = [
            ['user_id' => 1, 'lesson_id' => 1, 'is_completed' => true, 'quiz_score' => 85, 'completed_at' => now()->subDays(5)],
            ['user_id' => 1, 'lesson_id' => 2, 'is_completed' => true, 'quiz_score' => 90, 'completed_at' => now()->subDays(3)],
            ['user_id' => 1, 'lesson_id' => 3, 'is_completed' => false, 'quiz_score' => 0, 'completed_at' => null],
            ['user_id' => 2, 'lesson_id' => 1, 'is_completed' => true, 'quiz_score' => 78, 'completed_at' => now()->subDays(7)],
            ['user_id' => 2, 'lesson_id' => 6, 'is_completed' => true, 'quiz_score' => 92, 'completed_at' => now()->subDays(2)],
            ['user_id' => 2, 'lesson_id' => 7, 'is_completed' => false, 'quiz_score' => 0, 'completed_at' => null],
            ['user_id' => 3, 'lesson_id' => 10, 'is_completed' => true, 'quiz_score' => 88, 'completed_at' => now()->subDays(1)],
            ['user_id' => 3, 'lesson_id' => 11, 'is_completed' => true, 'quiz_score' => 95, 'completed_at' => now()->subHours(12)],
        ];

        DB::table('user_progress')->insert($progress);
    }
}
