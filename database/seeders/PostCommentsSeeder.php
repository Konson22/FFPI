<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PostCommentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $comments = [
            // Post 1 comments
            ['post_id' => 1, 'user_id' => 2, 'parent_id' => null, 'content' => 'Great information! I found this really helpful when I was choosing my contraceptive method.', 'status' => 'published', 'reactions_count' => 3, 'replies_count' => 1, 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            ['post_id' => 1, 'user_id' => 3, 'parent_id' => 1, 'content' => 'Same here! It\'s so important to have all the information before making such an important decision.', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(20), 'updated_at' => now()->subHours(20)],
            
            // Post 2 comments
            ['post_id' => 2, 'user_id' => 1, 'parent_id' => null, 'content' => 'Regular testing is so important. I make it a habit to get tested annually.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)],
            ['post_id' => 2, 'user_id' => 3, 'parent_id' => null, 'content' => 'Communication with your partner is key. Thanks for sharing this!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)],
            
            // Post 3 comments
            ['post_id' => 3, 'user_id' => 1, 'parent_id' => null, 'content' => 'This is so important! Everyone deserves access to quality reproductive healthcare.', 'status' => 'published', 'reactions_count' => 5, 'replies_count' => 1, 'created_at' => now()->subHours(5), 'updated_at' => now()->subHours(5)],
            ['post_id' => 3, 'user_id' => 2, 'parent_id' => 5, 'content' => 'Absolutely! We need to keep advocating for these rights.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(3), 'updated_at' => now()->subHours(3)],
            
            // Post 4 comments
            ['post_id' => 4, 'user_id' => 2, 'parent_id' => null, 'content' => 'This would have been so helpful when I was going through puberty. Great resource!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)],
            
            // Post 5 comments
            ['post_id' => 5, 'user_id' => 1, 'parent_id' => null, 'content' => 'Mental health is often overlooked in these discussions. Thank you for bringing this up.', 'status' => 'published', 'reactions_count' => 3, 'replies_count' => 0, 'created_at' => now()->subHours(15), 'updated_at' => now()->subHours(15)],
            ['post_id' => 5, 'user_id' => 3, 'parent_id' => null, 'content' => 'It\'s so important to take care of both physical and mental health.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)],
            
            // Post 6 comments
            ['post_id' => 6, 'user_id' => 1, 'parent_id' => null, 'content' => 'Thank you for sharing your story. It takes courage to speak up about these experiences.', 'status' => 'published', 'reactions_count' => 4, 'replies_count' => 1, 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)],
            ['post_id' => 6, 'user_id' => 2, 'parent_id' => 10, 'content' => 'Your story will help so many others who might be going through similar experiences.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            
            // Post 7 comments
            ['post_id' => 7, 'user_id' => 2, 'parent_id' => null, 'content' => 'Evidence-based education is crucial. This study supports what we\'ve been advocating for.', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)],
            
            // Post 8 comments
            ['post_id' => 8, 'user_id' => 1, 'parent_id' => null, 'content' => 'Irregular periods can be normal, especially in your teens and early 20s. However, if you\'re concerned, it\'s always good to talk to a healthcare provider.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)],
            ['post_id' => 8, 'user_id' => 3, 'parent_id' => null, 'content' => 'I had similar experiences at your age. Tracking your cycle might help you see patterns. Don\'t hesitate to reach out to a healthcare provider if you\'re worried!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(1), 'updated_at' => now()->subHours(1)],
        ];

        DB::table('post_comments')->insert($comments);
    }
}
