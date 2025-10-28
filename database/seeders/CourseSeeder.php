<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\Post;
use App\Models\User;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create sample courses
        $courses = [
            [
                'course_code' => 'FP001',
                'title' => 'Introduction to Family Planning',
                'description' => 'Learn the basics of family planning methods and their effectiveness.',
                'category' => 'Family Planning',
                'order' => 1,
                'is_active' => true
            ],
            [
                'course_code' => 'FP002',
                'title' => 'Contraceptive Methods Guide',
                'description' => 'Comprehensive guide to different contraceptive methods and their pros and cons.',
                'category' => 'Contraception',
                'order' => 2,
                'is_active' => true
            ],
            [
                'course_code' => 'FP003',
                'title' => 'Fertility Awareness Methods',
                'description' => 'Learn about natural family planning and fertility awareness methods.',
                'category' => 'Natural Methods',
                'order' => 3,
                'is_active' => true
            ]
        ];

        foreach ($courses as $courseData) {
            Course::create($courseData);
        }

        // Create sample posts
        $users = User::limit(3)->get();
        if ($users->count() > 0) {
            $posts = [
                [
                    'title' => 'Welcome to our Community!',
                    'content' => 'Welcome to our family planning community. Share your experiences and learn from others.',
                    'user_id' => $users->first()->id,
                    'status' => 'approved'
                ],
                [
                    'title' => 'Tips for New Parents',
                    'content' => 'Here are some helpful tips for new parents navigating family planning decisions.',
                    'user_id' => $users->count() > 1 ? $users[1]->id : $users->first()->id,
                    'status' => 'approved'
                ],
                [
                    'title' => 'Understanding Contraceptive Options',
                    'content' => 'A comprehensive overview of different contraceptive methods available.',
                    'user_id' => $users->count() > 2 ? $users[2]->id : $users->first()->id,
                    'status' => 'pending'
                ]
            ];

            foreach ($posts as $postData) {
                Post::create($postData);
            }
        }
    }
}