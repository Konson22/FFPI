<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\User;
use App\Models\Clinic;
use Carbon\Carbon;

class DoctorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if doctors already exist
        if (Doctor::count() > 0) {
            $this->command->info('Doctors already exist. Skipping DoctorSeeder.');
            return;
        }

        // Get all clinics to link doctors to them
        $clinics = Clinic::all();
        if ($clinics->isEmpty()) {
            $this->command->warn('No clinics found. Please run ClinicSeeder first.');
            // Create doctors without clinic_id if no clinics exist
            $clinics = collect([]);
        }

        // Create users with 'expert' role first
        $expertUsers = User::factory(10)->expert()->create();

        $specializations = [
            'Obstetrics and Gynecology',
            'Pediatrics',
            'Family Medicine',
            'Internal Medicine',
            'Cardiology',
            'Dermatology',
            'Psychiatry',
            'Orthopedics',
            'Neurology',
            'Endocrinology'
        ];

        foreach ($expertUsers as $index => $user) {
            Doctor::create([
                'user_id' => $user->id,
                'clinic_id' => $clinics->isNotEmpty() ? $clinics->random()->id : null,
                'doctor_name' => $user->name,
                'phone' => '+1-555-' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT) . '-' . str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                'specialization' => $specializations[$index % count($specializations)],
                'bio' => 'Dr. ' . $user->name . ' is a highly experienced physician specializing in ' . $specializations[$index % count($specializations)] . ' with over ' . rand(5, 20) . ' years of experience in family planning and reproductive health.',
                'license_number' => 'MD' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'years_of_experience' => rand(5, 25),
                'is_available' => rand(0, 1) == 1,
                'status' => ['active', 'inactive', 'suspended'][rand(0, 2)],
                'profile_picture' => 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Dr.' . urlencode($user->name),
                'is_verified' => rand(0, 1) == 1,
                'verified_at' => rand(0, 1) == 1 ? Carbon::now()->subDays(rand(1, 365)) : null,
                'average_rating' => round(rand(300, 500) / 100, 2),
            ]);
        }

        // Create some additional doctors with specific specializations
        $additionalSpecializations = [
            'Reproductive Endocrinology',
            'Maternal-Fetal Medicine',
            'Adolescent Medicine',
            'Urology',
            'Oncology'
        ];

        foreach ($additionalSpecializations as $index => $specialization) {
            $user = User::factory()->expert()->create([
                'name' => 'Dr. ' . ['Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'David Kim', 'Lisa Thompson'][$index]
            ]);

            Doctor::create([
                'user_id' => $user->id,
                'clinic_id' => $clinics->isNotEmpty() ? $clinics->random()->id : null,
                'doctor_name' => $user->name,
                'phone' => '+1-555-' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT) . '-' . str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                'specialization' => $specialization,
                'bio' => 'Dr. ' . $user->name . ' is a specialist in ' . $specialization . ' with extensive experience in family planning and reproductive health services.',
                'license_number' => 'MD' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'years_of_experience' => rand(8, 30),
                'is_available' => true,
                'status' => 'active',
                'profile_picture' => 'https://via.placeholder.com/300x300/2196F3/FFFFFF?text=Dr.' . urlencode(explode(' ', $user->name)[1]),
                'is_verified' => true,
                'verified_at' => Carbon::now()->subDays(rand(30, 180)),
                'average_rating' => round(rand(400, 500) / 100, 2),
            ]);
        }
    }
}
