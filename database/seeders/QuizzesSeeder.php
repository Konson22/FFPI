<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class QuizzesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = [
            ['lesson_id' => 1, 'question' => 'What is the primary goal of family planning?', 'correct_answer' => 'To help individuals and couples achieve their desired number of children'],
            ['lesson_id' => 1, 'question' => 'Which of the following is NOT a benefit of family planning?', 'correct_answer' => 'Increased risk of pregnancy complications'],
            ['lesson_id' => 2, 'question' => 'What does informed consent mean in family planning?', 'correct_answer' => 'Making decisions based on complete and accurate information'],
            ['lesson_id' => 3, 'question' => 'What is the effectiveness rate of birth control pills when used correctly?', 'correct_answer' => '99%'],
            ['lesson_id' => 4, 'question' => 'Which barrier method also provides protection against STIs?', 'correct_answer' => 'Male and female condoms'],
            ['lesson_id' => 5, 'question' => 'How long can hormonal IUDs provide contraception?', 'correct_answer' => '3-7 years depending on type'],
            ['lesson_id' => 6, 'question' => 'At what age does puberty typically begin for girls?', 'correct_answer' => '8-13 years'],
            ['lesson_id' => 7, 'question' => 'What is the most important aspect of a healthy relationship?', 'correct_answer' => 'Mutual respect and communication'],
            ['lesson_id' => 8, 'question' => 'When should folic acid supplementation begin for pregnancy planning?', 'correct_answer' => 'At least one month before conception'],
            ['lesson_id' => 9, 'question' => 'What is the fertile window in a menstrual cycle?', 'correct_answer' => '5-6 days around ovulation'],
            ['lesson_id' => 10, 'question' => 'Which STI is most common among young people?', 'correct_answer' => 'Chlamydia'],
            ['lesson_id' => 11, 'question' => 'What is the most effective way to prevent STIs?', 'correct_answer' => 'Consistent and correct condom use'],
            ['lesson_id' => 12, 'question' => 'How long is a typical menstrual cycle?', 'correct_answer' => '21-35 days'],
            ['lesson_id' => 13, 'question' => 'When should you seek medical help for menstrual problems?', 'correct_answer' => 'When symptoms significantly affect daily life'],
        ];

        DB::table('quizzes')->insert($quizzes);
    }
}
