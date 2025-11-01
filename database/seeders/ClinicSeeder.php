<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Clinic;
use Illuminate\Support\Str;

class ClinicSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Check if clinics already exist
        if (Clinic::count() > 0) {
            $this->command->info('Clinics already exist. Skipping ClinicSeeder.');
            return;
        }

        $clinics = [
            [
                'name' => 'Family Health Center',
                'description' => 'A comprehensive family health center providing quality healthcare services.',
                'phone' => '+1-555-0100',
                'email' => 'info@familyhealthcenter.com',
                'address' => '123 Main St',
                'city' => 'New York',
                'state' => 'NY',
                'country' => 'USA',
                'postal_code' => '10001',
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'facility_type' => 'hospital',
            ],
            [
                'name' => 'Women\'s Wellness Clinic',
                'description' => 'Specialized clinic focusing on women\'s health and family planning services.',
                'phone' => '+1-555-0101',
                'email' => 'contact@womenswellness.com',
                'address' => '456 Oak Ave',
                'city' => 'Los Angeles',
                'state' => 'CA',
                'country' => 'USA',
                'postal_code' => '90001',
                'latitude' => 34.0522,
                'longitude' => -118.2437,
                'facility_type' => 'clinic',
            ],
            [
                'name' => 'Reproductive Health Center',
                'description' => 'Leading center for reproductive health and family planning services.',
                'phone' => '+1-555-0102',
                'email' => 'info@reproductivehealth.com',
                'address' => '789 Health Blvd',
                'city' => 'Chicago',
                'state' => 'IL',
                'country' => 'USA',
                'postal_code' => '60601',
                'latitude' => 41.8781,
                'longitude' => -87.6298,
                'facility_type' => 'clinic',
            ],
            [
                'name' => 'Family Planning Clinic',
                'description' => 'Dedicated to providing accessible family planning and reproductive health services.',
                'phone' => '+1-555-0103',
                'email' => 'contact@familyplanning.com',
                'address' => '321 Medical Dr',
                'city' => 'Houston',
                'state' => 'TX',
                'country' => 'USA',
                'postal_code' => '77001',
                'latitude' => 29.7604,
                'longitude' => -95.3698,
                'facility_type' => 'private practice',
            ],
            [
                'name' => 'Health Plus Medical',
                'description' => 'Full-service medical facility offering comprehensive healthcare solutions.',
                'phone' => '+1-555-0104',
                'email' => 'info@healthplus.com',
                'address' => '654 Wellness Way',
                'city' => 'Phoenix',
                'state' => 'AZ',
                'country' => 'USA',
                'postal_code' => '85001',
                'latitude' => 33.4484,
                'longitude' => -112.0740,
                'facility_type' => 'hospital',
            ],
            [
                'name' => 'Advanced Reproductive Center',
                'description' => 'Specialized center for advanced reproductive medicine and fertility services.',
                'phone' => '+1-555-0105',
                'email' => 'contact@advancedreproductive.com',
                'address' => '987 Specialist Ave',
                'city' => 'Boston',
                'state' => 'MA',
                'country' => 'USA',
                'postal_code' => '02101',
                'latitude' => 42.3601,
                'longitude' => -71.0589,
                'facility_type' => 'clinic',
            ],
        ];

        $workingHours = [
            'monday' => ['09:00', '17:00'],
            'tuesday' => ['09:00', '17:00'],
            'wednesday' => ['09:00', '17:00'],
            'thursday' => ['09:00', '17:00'],
            'friday' => ['09:00', '17:00'],
            'saturday' => ['10:00', '14:00'],
            'sunday' => ['closed'],
        ];

        foreach ($clinics as $clinicData) {
            Clinic::create([
                'name' => $clinicData['name'],
                'slug' => Str::slug($clinicData['name']),
                'description' => $clinicData['description'],
                'phone' => $clinicData['phone'],
                'email' => $clinicData['email'],
                'address' => $clinicData['address'],
                'city' => $clinicData['city'],
                'state' => $clinicData['state'],
                'country' => $clinicData['country'],
                'postal_code' => $clinicData['postal_code'],
                'latitude' => $clinicData['latitude'],
                'longitude' => $clinicData['longitude'],
                'working_hours' => $workingHours,
                'facility_type' => $clinicData['facility_type'],
                'specializations' => ['Obstetrics and Gynecology', 'Family Medicine', 'Reproductive Health'],
                'amenities' => ['Parking', 'Wheelchair Accessible', 'Online Booking'],
                'insurance_accepted' => ['Medicare', 'Medicaid', 'Blue Cross'],
                'is_verified' => true,
                'is_active' => true,
                'status' => 'active',
                'average_rating' => round(rand(350, 500) / 100, 2),
                'total_reviews' => rand(10, 150),
            ]);
        }
    }
}

