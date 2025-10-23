<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class QuizOptionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $options = [
            // Quiz 1 options
            ['quiz_id' => 1, 'option_text' => 'To help individuals and couples achieve their desired number of children'],
            ['quiz_id' => 1, 'option_text' => 'To prevent all pregnancies'],
            ['quiz_id' => 1, 'option_text' => 'To increase population growth'],
            ['quiz_id' => 1, 'option_text' => 'To reduce healthcare costs'],
            
            // Quiz 2 options
            ['quiz_id' => 2, 'option_text' => 'Improved maternal health'],
            ['quiz_id' => 2, 'option_text' => 'Better child health outcomes'],
            ['quiz_id' => 2, 'option_text' => 'Increased risk of pregnancy complications'],
            ['quiz_id' => 2, 'option_text' => 'Economic benefits for families'],
            
            // Quiz 3 options
            ['quiz_id' => 3, 'option_text' => 'Making decisions based on complete and accurate information'],
            ['quiz_id' => 3, 'option_text' => 'Getting permission from family members'],
            ['quiz_id' => 3, 'option_text' => 'Signing a legal document'],
            ['quiz_id' => 3, 'option_text' => 'Following doctor recommendations only'],
            
            // Quiz 4 options
            ['quiz_id' => 4, 'option_text' => '95%'],
            ['quiz_id' => 4, 'option_text' => '99%'],
            ['quiz_id' => 4, 'option_text' => '85%'],
            ['quiz_id' => 4, 'option_text' => '75%'],
            
            // Quiz 5 options
            ['quiz_id' => 5, 'option_text' => 'Diaphragm'],
            ['quiz_id' => 5, 'option_text' => 'Male and female condoms'],
            ['quiz_id' => 5, 'option_text' => 'Cervical cap'],
            ['quiz_id' => 5, 'option_text' => 'Spermicide alone'],
        ];

        DB::table('quiz_options')->insert($options);
    }
}
