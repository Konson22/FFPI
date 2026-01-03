<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Skip if modules already exist
        if (DB::table('modules')->count() > 0) {
            $this->command->info('Modules already exist. Skipping ModulesSeeder.');
            return;
        }
        
        $modules = [
            [
                'title' => 'SRHR',
                'description' => 'Comprehensive Sexual and Reproductive Health and Rights (SRHR) education covering fundamental concepts, reproductive health services, family planning, healthy relationships, and rights-based approaches to sexual and reproductive health.',
                'order' => 1,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Family Planning and Contraception',
                'description' => 'Learn about various family planning methods, contraception options, their effectiveness, benefits, and how to make informed decisions about reproductive health. This module covers natural and modern contraceptive methods, emergency contraception, and family planning counseling.',
                'order' => 2,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'title' => 'Healthy Relationships and Communication',
                'description' => 'Develop essential skills for building and maintaining healthy relationships. This module covers effective communication, consent, boundaries, conflict resolution, respect, and understanding healthy vs. unhealthy relationship dynamics.',
                'order' => 3,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('modules')->insert($modules);
    }
}

