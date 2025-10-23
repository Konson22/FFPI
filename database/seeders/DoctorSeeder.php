<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Doctor;
use App\Models\User;
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

        $workingHours = [
            'monday' => ['09:00', '17:00'],
            'tuesday' => ['09:00', '17:00'],
            'wednesday' => ['09:00', '17:00'],
            'thursday' => ['09:00', '17:00'],
            'friday' => ['09:00', '17:00'],
            'saturday' => ['10:00', '14:00'],
            'sunday' => ['closed']
        ];

        $certifications = [
            ['name' => 'Board Certification in Obstetrics and Gynecology', 'year' => 2020],
            ['name' => 'Advanced Life Support (ALS)', 'year' => 2021],
            ['name' => 'Neonatal Resuscitation Program (NRP)', 'year' => 2022]
        ];

        $awards = [
            ['title' => 'Best Doctor Award 2023', 'organization' => 'Medical Association', 'year' => 2023],
            ['title' => 'Excellence in Patient Care', 'organization' => 'Healthcare Excellence', 'year' => 2022]
        ];

        foreach ($expertUsers as $index => $user) {
            Doctor::create([
                'user_id' => $user->id,
                'doctor_name' => $user->name,
                'phone' => '+1-555-' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT) . '-' . str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                'email' => 'dr.' . strtolower(str_replace(' ', '.', $user->name)) . '@familyplanning.com',
                'specialization' => $specializations[$index % count($specializations)],
                'bio' => 'Dr. ' . $user->name . ' is a highly experienced physician specializing in ' . $specializations[$index % count($specializations)] . ' with over ' . rand(5, 20) . ' years of experience in family planning and reproductive health.',
                'license_number' => 'MD' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'years_of_experience' => rand(5, 25),
                'working_hours' => $workingHours,
                'is_available' => rand(0, 1) == 1,
                'status' => ['active', 'inactive', 'suspended'][rand(0, 2)],
                'clinic_name' => ['Family Health Center', 'Women\'s Wellness Clinic', 'Reproductive Health Center', 'Family Planning Clinic', 'Health Plus Medical'][rand(0, 4)],
                'clinic_address' => rand(100, 9999) . ' ' . ['Main St', 'Oak Ave', 'Health Blvd', 'Medical Dr', 'Wellness Way'][rand(0, 4)] . ', ' . ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix'][rand(0, 4)],
                'latitude' => round(40.7128 + (rand(-100, 100) / 1000), 8),
                'longitude' => round(-74.0060 + (rand(-100, 100) / 1000), 8),
                'certifications' => $certifications,
                'awards' => $awards,
                'profile_picture' => 'https://via.placeholder.com/300x300/4CAF50/FFFFFF?text=Dr.' . urlencode($user->name),
                'is_verified' => rand(0, 1) == 1,
                'verified_at' => rand(0, 1) == 1 ? Carbon::now()->subDays(rand(1, 365)) : null,
                'average_rating' => round(rand(300, 500) / 100, 2),
                'total_reviews' => rand(0, 100),
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
                'doctor_name' => $user->name,
                'phone' => '+1-555-' . str_pad(rand(100, 999), 3, '0', STR_PAD_LEFT) . '-' . str_pad(rand(1000, 9999), 4, '0', STR_PAD_LEFT),
                'email' => 'dr.' . strtolower(str_replace([' ', '.'], ['.', ''], $user->name)) . '@familyplanning.com',
                'specialization' => $specialization,
                'bio' => 'Dr. ' . $user->name . ' is a specialist in ' . $specialization . ' with extensive experience in family planning and reproductive health services.',
                'license_number' => 'MD' . str_pad(rand(100000, 999999), 6, '0', STR_PAD_LEFT),
                'years_of_experience' => rand(8, 30),
                'working_hours' => $workingHours,
                'is_available' => true,
                'status' => 'active',
                'clinic_name' => ['Advanced Reproductive Center', 'Specialized Health Clinic', 'Expert Medical Center'][rand(0, 2)],
                'clinic_address' => rand(100, 9999) . ' ' . ['Specialist Ave', 'Expert Blvd', 'Advanced Dr'][rand(0, 2)] . ', ' . ['Boston', 'San Francisco', 'Seattle'][rand(0, 2)],
                'latitude' => round(42.3601 + (rand(-50, 50) / 1000), 8),
                'longitude' => round(-71.0589 + (rand(-50, 50) / 1000), 8),
                'certifications' => $certifications,
                'awards' => $awards,
                'profile_picture' => 'https://via.placeholder.com/300x300/2196F3/FFFFFF?text=Dr.' . urlencode(explode(' ', $user->name)[1]),
                'is_verified' => true,
                'verified_at' => Carbon::now()->subDays(rand(30, 180)),
                'average_rating' => round(rand(400, 500) / 100, 2),
                'total_reviews' => rand(20, 150),
            ]);
        }
    }
}
