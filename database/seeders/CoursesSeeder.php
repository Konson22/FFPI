<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoursesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = [
            [
                'course_code' => 'SRHR-BASIC',
                'title' => 'SRHR Fundamentals',
                'description' => 'Comprehensive introduction to Sexual and Reproductive Health and Rights, covering rights-based approaches to health education.',
                'category' => 'SRHR',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-BASIC',
                'title' => 'Family Planning Basics',
                'description' => 'A comprehensive introduction to family planning methods, benefits, and considerations for reproductive health.',
                'category' => 'Basic Education',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-METHODS',
                'title' => 'Contraceptive Methods',
                'description' => 'Detailed overview of various contraceptive methods including hormonal, barrier, and natural methods.',
                'category' => 'Methods',
                'order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-YOUTH',
                'title' => 'Youth Reproductive Health',
                'description' => 'Age-appropriate education about reproductive health, puberty, and safe practices for teenagers.',
                'category' => 'Youth Education',
                'order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-PREGNANCY',
                'title' => 'Pregnancy Planning',
                'description' => 'Guidance on preparing for pregnancy, preconception care, and healthy pregnancy practices.',
                'category' => 'Pregnancy Planning',
                'order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-STI',
                'title' => 'STI Prevention',
                'description' => 'Education about sexually transmitted infections, prevention methods, and safe practices.',
                'category' => 'Health & Safety',
                'order' => 6,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'course_code' => 'FP-MENSTRUAL',
                'title' => 'Menstrual Health',
                'description' => 'Comprehensive guide to menstrual health, cycle tracking, and related health issues.',
                'category' => 'Women\'s Health',
                'order' => 7,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        // Use upsert to handle existing records gracefully
        DB::table('courses')->upsert(
            $courses,
            ['course_code'], // unique identifier
            ['title', 'description', 'category', 'order', 'is_active', 'updated_at'] // fields to update if record exists
        );
    }
}