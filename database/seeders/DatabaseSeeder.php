<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            DoctorSeeder::class,
            AppointmentSeeder::class,
            CoursesSeeder::class,
            ModulesSeeder::class,
            LessonsSeeder::class,
            ResourcesSeeder::class,
            QuizzesSeeder::class,
            QuizOptionsSeeder::class,
            UserProgressSeeder::class,
            PostsSeeder::class,
            PostReactionsSeeder::class,
            PostCommentsSeeder::class,
            PostSharesSeeder::class,
            // Family Planning App Seeders
            EducationResourcesSeeder::class,
            FertilityTrackingSeeder::class,
            SymptomsSeeder::class,
            FertilityInsightsSeeder::class,
            RemindersSeeder::class,
        ]);
    }
}
