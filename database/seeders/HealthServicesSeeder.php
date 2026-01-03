<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class HealthServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $facilities = [
            [
                'name' => 'Juba Teaching Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => 'Major referral hospital in South Sudan.',
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Juba',
                'city' => 'Juba',
                'state' => 'Central Equatoria',
                'county' => 'Juba',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 4.8517,
                'longitude' => 31.5825,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Bor State Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => 'Primary hospital serving Jonglei State.',
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Bor',
                'city' => 'Bor',
                'state' => 'Jonglei',
                'county' => 'Bor South',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 6.2079,
                'longitude' => 31.5580,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Malakal Teaching Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => 'Referral hospital for Upper Nile.',
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Malakal',
                'city' => 'Malakal',
                'state' => 'Upper Nile',
                'county' => 'Malakal',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 9.5286,
                'longitude' => 31.6550,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Bentiu Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Bentiu',
                'city' => 'Bentiu',
                'state' => 'Unity',
                'county' => 'Rubkona',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 9.2570,
                'longitude' => 29.7983,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Wau Teaching Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Wau',
                'city' => 'Wau',
                'state' => 'Western Bahr el Ghazal',
                'county' => 'Wau',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 7.7011,
                'longitude' => 27.9897,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Aweil State Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Aweil',
                'city' => 'Aweil',
                'state' => 'Northern Bahr el Ghazal',
                'county' => 'Aweil',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 8.7619,
                'longitude' => 27.3914,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Kuajok Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Kuajok',
                'city' => 'Kuajok',
                'state' => 'Warrap',
                'county' => 'Gogrial East',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 8.3037,
                'longitude' => 28.1317,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Rumbek State Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Rumbek',
                'city' => 'Rumbek',
                'state' => 'Lakes',
                'county' => 'Rumbek Central',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 6.8062,
                'longitude' => 29.6770,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Yambio State Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Yambio',
                'city' => 'Yambio',
                'state' => 'Western Equatoria',
                'county' => 'Yambio',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 4.5708,
                'longitude' => 28.3956,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Torit State Hospital',
                'type' => 'hospital',
                'ownership' => 'government',
                'description' => null,
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Torit',
                'city' => 'Torit',
                'state' => 'Eastern Equatoria',
                'county' => 'Torit',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 4.4117,
                'longitude' => 32.5700,
                'is_public' => true,
                'is_active' => true,
            ],
            [
                'name' => 'Private Clinic Juba',
                'type' => 'clinic',
                'ownership' => 'private',
                'description' => 'General outpatient services.',
                'phone' => null,
                'email' => null,
                'website' => null,
                'address' => 'Juba',
                'city' => 'Juba',
                'state' => 'Central Equatoria',
                'county' => 'Juba',
                'payam' => null,
                'boma' => null,
                'country' => 'South Sudan',
                'latitude' => 4.8590,
                'longitude' => 31.5710,
                'is_public' => false,
                'is_active' => true,
            ],
        ];

        $rows = [];
        foreach ($facilities as $facility) {
            $slugSource = $facility['name'] . '-' . ($facility['city'] ?? $facility['state'] ?? 'ss');
            $rows[] = array_merge(
                $facility,
                [
                    'slug' => Str::slug($slugSource),
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }

        // Avoid duplicate insertions if already seeded
        $existing = DB::table('health_services')->count();
        if ($existing === 0) {
            DB::table('health_services')->insert($rows);
        } else {
            $this->command?->info('health_services already seeded. Skipping HealthServicesSeeder.');
        }
    }

    /**
     * Reverse the database seeds (rollback).
     */
    public function down(): void
    {
        DB::table('health_services')->where('country', 'South Sudan')->delete();
    }
}


