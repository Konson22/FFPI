<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class QuizzesSeeder extends Seeder
{
    public function run(): void
    {
        $lessons = DB::table('lessons')->select('id', 'title')->orderBy('id')->limit(10)->get();

        if ($lessons->isEmpty()) {
            $this->command?->warn('No lessons found. Skipping QuizzesSeeder.');
            return;
        }

        $now = Carbon::now();
        $rows = [];

        foreach ($lessons as $lesson) {
            // Question 1: Single choice question about key concepts
            $rows[] = [
                'lesson_id' => $lesson->id,
                'question' => 'What is the key takeaway from "'.$lesson->title.'"?',
                'type' => 'single_choice',
                'options' => json_encode([
                    'Understanding the core concepts and importance of family planning',
                    'Learning about all available contraceptive methods',
                    'Knowing when to consult a healthcare provider',
                    'Understanding the legal aspects of reproductive health',
                ]),
                'correct_answers' => json_encode([
                    'Understanding the core concepts and importance of family planning',
                ]),
                'correct_answer' => null,
                'explanation' => 'The key takeaway emphasizes understanding fundamental concepts and the importance of informed decision-making in family planning.',
                'created_at' => $now,
                'updated_at' => $now,
            ];

            // Question 2: Single choice question about safety
            $rows[] = [
                'lesson_id' => $lesson->id,
                'question' => 'Which statement best reflects a safe practice discussed in this lesson?',
                'type' => 'single_choice',
                'options' => json_encode([
                    'Consulting with healthcare providers before making decisions',
                    'Self-medicating without professional advice',
                    'Following advice from friends and family only',
                    'Making decisions without considering personal health history',
                ]),
                'correct_answers' => json_encode([
                    'Consulting with healthcare providers before making decisions',
                ]),
                'correct_answer' => null,
                'explanation' => 'It is essential to consult healthcare providers to receive personalized advice based on your medical history and individual needs.',
                'created_at' => $now,
                'updated_at' => $now,
            ];

            // Question 3: Multiple choice question about benefits
            $rows[] = [
                'lesson_id' => $lesson->id,
                'question' => 'Which of the following are benefits of proper family planning? (Select all that apply)',
                'type' => 'multiple_choice',
                'options' => json_encode([
                    'Prevents unintended pregnancies',
                    'Improves maternal and child health',
                    'Allows individuals to plan their families',
                    'Has no impact on personal well-being',
                    'Enables better educational and career opportunities',
                ]),
                'correct_answers' => json_encode([
                    'Prevents unintended pregnancies',
                    'Improves maternal and child health',
                    'Allows individuals to plan their families',
                    'Enables better educational and career opportunities',
                ]),
                'correct_answer' => null,
                'explanation' => 'Proper family planning provides numerous benefits including preventing unintended pregnancies, improving health outcomes, and enabling individuals to achieve their life goals.',
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('quizzes')->insert($rows);
    }
}


