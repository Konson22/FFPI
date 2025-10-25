<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Course;
use App\Models\CourseEnrollment;

class CourseEnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a user to enroll in courses
        $user = User::where('role', 'user')->first();
        
        if (!$user) {
            $this->command->info('No user found. Please create a user first.');
            return;
        }

        // Get all active courses
        $courses = Course::active()->get();
        
        if ($courses->isEmpty()) {
            $this->command->info('No courses found. Please run course seeders first.');
            return;
        }

        // Create enrollments for the user
        foreach ($courses as $index => $course) {
            $status = ['enrolled', 'in_progress', 'completed'][$index % 3];
            $progress = $status === 'completed' ? 100 : ($status === 'in_progress' ? rand(20, 80) : 0);
            
            CourseEnrollment::create([
                'user_id' => $user->id,
                'course_id' => $course->id,
                'status' => $status,
                'enrolled_at' => now()->subDays(rand(1, 30)),
                'started_at' => $status !== 'enrolled' ? now()->subDays(rand(1, 20)) : null,
                'completed_at' => $status === 'completed' ? now()->subDays(rand(1, 10)) : null,
                'progress_percentage' => $progress,
            ]);
        }

        $this->command->info('Course enrollments created successfully!');
    }
}
