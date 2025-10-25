<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'module_code' => 'SRHR101',
                'title' => 'Understanding SRHR',
                'description' => 'Comprehensive introduction to Sexual and Reproductive Health and Rights, covering rights-based approaches to health education.',
                'course_id' => 1, // SRHR Fundamentals
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP101',
                'title' => 'Introduction to Family Planning',
                'description' => 'A comprehensive introduction to family planning methods, benefits, and considerations for reproductive health.',
                'course_id' => 2, // Family Planning Basics
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP102',
                'title' => 'Contraceptive Methods Overview',
                'description' => 'Detailed overview of various contraceptive methods including hormonal, barrier, and natural methods.',
                'course_id' => 3, // Contraceptive Methods
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP103',
                'title' => 'Understanding Puberty',
                'description' => 'Age-appropriate education about reproductive health, puberty, and safe practices for teenagers.',
                'course_id' => 4, // Youth Reproductive Health
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP104',
                'title' => 'Preconception Care',
                'description' => 'Guidance on preparing for pregnancy, preconception care, and healthy pregnancy practices.',
                'course_id' => 5, // Pregnancy Planning
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP105',
                'title' => 'STI Prevention Basics',
                'description' => 'Education about sexually transmitted infections, prevention methods, and safe practices.',
                'course_id' => 6, // STI Prevention
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP106',
                'title' => 'Menstrual Cycle Basics',
                'description' => 'Comprehensive guide to menstrual health, cycle tracking, and related health issues.',
                'course_id' => 7, // Menstrual Health
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Use upsert to handle existing records gracefully
        DB::table('modules')->upsert(
            $modules,
            ['module_code'], // unique identifier
            ['title', 'description', 'course_id', 'order', 'is_active', 'updated_at'] // fields to update if record exists
        );
    }
}
