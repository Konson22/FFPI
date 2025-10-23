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
                'module_code' => 'FP101',
                'title' => 'Introduction to Family Planning',
                'description' => 'A comprehensive introduction to family planning methods, benefits, and considerations for reproductive health.',
                'category' => 'Basic Education',
                'category_id' => 1, // Basic Education
                'duration' => '2 hours',
                'target_audience' => json_encode(['youth', 'adults', 'couples']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP102',
                'title' => 'Contraceptive Methods',
                'description' => 'Detailed overview of various contraceptive methods including hormonal, barrier, and natural methods.',
                'category' => 'Methods',
                'category_id' => 9, // Contraceptive Methods
                'duration' => '3 hours',
                'target_audience' => json_encode(['adults', 'couples', 'healthcare_workers']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP103',
                'title' => 'Reproductive Health for Teens',
                'description' => 'Age-appropriate education about reproductive health, puberty, and safe practices for teenagers.',
                'category' => 'Youth Education',
                'category_id' => 3, // Youth Education
                'duration' => '1.5 hours',
                'target_audience' => json_encode(['youth', 'teens', 'students']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP104',
                'title' => 'Pregnancy Planning',
                'description' => 'Guidance on preparing for pregnancy, preconception care, and healthy pregnancy practices.',
                'category' => 'Pregnancy Planning',
                'category_id' => 10, // Pregnancy Planning
                'duration' => '2.5 hours',
                'target_audience' => json_encode(['adults', 'couples', 'women']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP105',
                'title' => 'STI Prevention and Awareness',
                'description' => 'Education about sexually transmitted infections, prevention methods, and safe practices.',
                'category' => 'Health & Safety',
                'category_id' => 8, // Preventive Care
                'duration' => '2 hours',
                'target_audience' => json_encode(['youth', 'adults', 'students']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'module_code' => 'FP106',
                'title' => 'Menstrual Health Management',
                'description' => 'Comprehensive guide to menstrual health, cycle tracking, and related health issues.',
                'category' => 'Women\'s Health',
                'category_id' => 5, // Women's Health
                'duration' => '1.5 hours',
                'target_audience' => json_encode(['women', 'teens', 'youth']),
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Use upsert to handle existing records gracefully
        DB::table('modules')->upsert(
            $modules,
            ['module_code'], // unique identifier
            ['title', 'description', 'category', 'category_id', 'duration', 'target_audience', 'updated_at'] // fields to update if record exists
        );
    }
}
