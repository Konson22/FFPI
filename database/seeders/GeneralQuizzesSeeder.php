<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class GeneralQuizzesSeeder extends Seeder
{
    public function run(): void
    {
        $now = Carbon::now();

        $items = [
            [
                'title' => 'Cycle Basics',
                'category' => 'sexual-health',
                'question' => 'What is a typical menstrual cycle length?',
                'type' => 'single_choice',
                'options' => json_encode(['10-15 days', '21-45 days', '60-90 days', 'No fixed range']),
                'correct_answers' => json_encode(['21-45 days']),
                'difficulty' => 1,
                'points' => 1,
                'shuffle_options' => true,
                'display_order' => 1,
                'explanation' => 'Typical cycles vary person-to-person; 21–45 days covers common ranges.',
                'metadata' => json_encode(['source' => 'WHO'] ),
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Fertility Window',
                'category' => 'family-planning',
                'question' => 'Around which time does ovulation generally occur in a 28-day cycle?',
                'type' => 'single_choice',
                'options' => json_encode(['Day 1-3', 'Around day 14', 'Day 25-28', 'No ovulation occurs']),
                'correct_answers' => json_encode(['Around day 14']),
                'difficulty' => 2,
                'points' => 2,
                'shuffle_options' => true,
                'display_order' => 2,
                'explanation' => 'Ovulation commonly occurs mid-cycle in a 28-day pattern.',
                'metadata' => json_encode(['topic' => 'fertility'] ),
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
            [
                'title' => 'Symptom Awareness',
                'category' => 'sexual-health',
                'question' => 'Which of the following can be a normal premenstrual symptom?',
                'type' => 'multiple_choice',
                'options' => json_encode(['Headache', 'Cramps', 'Mood changes', 'All of the above']),
                'correct_answers' => json_encode(['All of the above']),
                'difficulty' => 1,
                'points' => 1,
                'shuffle_options' => false,
                'display_order' => 3,
                'explanation' => 'Many individuals experience some combination of these symptoms.',
                'metadata' => null,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ],
        ];

        DB::table('general_quizzes')->insert($items);
    }
}


