<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\User;
use App\Models\Doctor;
use Illuminate\Database\Seeder;

class AppointmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get some users and doctors to create appointments
        $users = User::where('role', 'user')->take(10)->get();
        $doctors = Doctor::take(5)->get();

        if ($users->isEmpty() || $doctors->isEmpty()) {
            $this->command->warn('No users or doctors found. Please run UserSeeder and DoctorSeeder first.');
            return;
        }

        // Create appointments
        foreach ($users as $user) {
            $doctor = $doctors->random();
            
            Appointment::factory()
                ->count(rand(1, 3))
                ->create([
                    'patient_id' => $user->id,
                    'doctor_id' => $doctor->id,
                ]);
        }
    }
}
