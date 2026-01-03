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
            ProfileSeeder::class,
            DoctorSeeder::class,
            AppointmentSeeder::class,
            ModulesSeeder::class,
			LessonsSeeder::class,
            LessonQuizzesSeeder::class,
            ModuleEnrollmentsSeeder::class,
            HealthServicesSeeder::class,
            SupportContactsSeeder::class,
        ]);
    }
}
