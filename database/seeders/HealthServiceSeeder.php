<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\HealthService;

class HealthServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $healthServices = [
            [
                'name' => 'Family Health Center',
                'type' => 'family-planning',
                'address' => '123 Main Street, City Center',
                'rating' => 4.5,
                'reviews' => 120,
                'phone' => '+1-555-0123',
                'hours' => 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
                'services_offered' => ['contraception', 'pregnancy testing', 'counseling'],
                'latitude' => 40.7128,
                'longitude' => -74.0060,
                'is_active' => true,
                'is_open' => true,
            ],
            [
                'name' => 'Women\'s Wellness Clinic',
                'type' => 'family-planning',
                'address' => '456 Health Avenue, Downtown',
                'rating' => 4.8,
                'reviews' => 95,
                'phone' => '+1-555-0456',
                'hours' => 'Mon-Thu: 7AM-7PM, Fri: 7AM-5PM',
                'services_offered' => ['contraception', 'STI testing', 'prenatal care'],
                'latitude' => 40.7589,
                'longitude' => -73.9851,
                'is_active' => true,
                'is_open' => true,
            ],
            [
                'name' => 'Community Health Services',
                'type' => 'sti-testing',
                'address' => '789 Wellness Blvd, Midtown',
                'rating' => 4.2,
                'reviews' => 78,
                'phone' => '+1-555-0789',
                'hours' => 'Mon-Fri: 9AM-5PM',
                'services_offered' => ['STI testing', 'HIV testing', 'counseling'],
                'latitude' => 40.7505,
                'longitude' => -73.9934,
                'is_active' => true,
                'is_open' => true,
            ],
            [
                'name' => 'Reproductive Health Center',
                'type' => 'family-planning',
                'address' => '321 Care Street, Uptown',
                'rating' => 4.7,
                'reviews' => 156,
                'phone' => '+1-555-0321',
                'hours' => 'Mon-Wed: 8AM-6PM, Thu-Fri: 8AM-8PM, Sat: 10AM-4PM',
                'services_offered' => ['contraception', 'fertility counseling', 'pregnancy testing'],
                'latitude' => 40.7831,
                'longitude' => -73.9712,
                'is_active' => true,
                'is_open' => true,
            ],
            [
                'name' => 'Emergency Health Clinic',
                'type' => 'emergency',
                'address' => '555 Emergency Lane, Medical District',
                'rating' => 4.0,
                'reviews' => 203,
                'phone' => '+1-555-0555',
                'hours' => '24/7 Emergency Services',
                'services_offered' => ['emergency contraception', 'emergency care', 'crisis counseling'],
                'latitude' => 40.7614,
                'longitude' => -73.9776,
                'is_active' => true,
                'is_open' => true,
            ],
        ];

        foreach ($healthServices as $service) {
            HealthService::create($service);
        }
    }
}
