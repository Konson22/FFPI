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
        // Skip if comments already exist
        if (DB::table('post_comments')->count() > 0) {
            $this->command->info('Post comments already exist. Skipping PostCommentsSeeder.');
            return;
        }
        
        // Get actual post IDs from the database
        $postIds = DB::table('posts')->pluck('id')->toArray();
        if (empty($postIds)) {
            $this->command->warn('No posts found. Skipping PostCommentsSeeder.');
            return;
        }
        
        // Use actual post IDs (first 8 posts)
        $postsToUse = array_slice($postIds, 0, 8);
        $comments = [];
        
        // Post 1 comments
        if (isset($postsToUse[0])) {
            $comments[] = ['post_id' => $postsToUse[0], 'user_id' => 2, 'parent_id' => null, 'content' => 'Great information! I found this really helpful when I was choosing my contraceptive method.', 'status' => 'published', 'reactions_count' => 3, 'replies_count' => 1, 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
        }
        if (isset($postsToUse[1])) {
            $comments[] = ['post_id' => $postsToUse[1], 'user_id' => 1, 'parent_id' => null, 'content' => 'Regular testing is so important. I make it a habit to get tested annually.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)];
            $comments[] = ['post_id' => $postsToUse[1], 'user_id' => 3, 'parent_id' => null, 'content' => 'Communication with your partner is key. Thanks for sharing this!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)];
        }
        if (isset($postsToUse[2])) {
            $comments[] = ['post_id' => $postsToUse[2], 'user_id' => 1, 'parent_id' => null, 'content' => 'This is so important! Everyone deserves access to quality reproductive healthcare.', 'status' => 'published', 'reactions_count' => 5, 'replies_count' => 1, 'created_at' => now()->subHours(5), 'updated_at' => now()->subHours(5)];
        }
        if (isset($postsToUse[3])) {
            $comments[] = ['post_id' => $postsToUse[3], 'user_id' => 2, 'parent_id' => null, 'content' => 'This would have been so helpful when I was going through puberty. Great resource!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)];
        }
        if (isset($postsToUse[4])) {
            $comments[] = ['post_id' => $postsToUse[4], 'user_id' => 1, 'parent_id' => null, 'content' => 'Mental health is often overlooked in these discussions. Thank you for bringing this up.', 'status' => 'published', 'reactions_count' => 3, 'replies_count' => 0, 'created_at' => now()->subHours(15), 'updated_at' => now()->subHours(15)];
            $comments[] = ['post_id' => $postsToUse[4], 'user_id' => 3, 'parent_id' => null, 'content' => 'It\'s so important to take care of both physical and mental health.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)];
        }
        if (isset($postsToUse[5])) {
            $comments[] = ['post_id' => $postsToUse[5], 'user_id' => 1, 'parent_id' => null, 'content' => 'Thank you for sharing your story. It takes courage to speak up about these experiences.', 'status' => 'published', 'reactions_count' => 4, 'replies_count' => 1, 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)];
        }
        if (isset($postsToUse[6])) {
            $comments[] = ['post_id' => $postsToUse[6], 'user_id' => 2, 'parent_id' => null, 'content' => 'Evidence-based education is crucial. This study supports what we\'ve been advocating for.', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)];
        }
        if (isset($postsToUse[7])) {
            $comments[] = ['post_id' => $postsToUse[7], 'user_id' => 1, 'parent_id' => null, 'content' => 'Irregular periods can be normal, especially in your teens and early 20s. However, if you\'re concerned, it\'s always good to talk to a healthcare provider.', 'status' => 'published', 'reactions_count' => 2, 'replies_count' => 0, 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)];
            $comments[] = ['post_id' => $postsToUse[7], 'user_id' => 3, 'parent_id' => null, 'content' => 'I had similar experiences at your age. Tracking your cycle might help you see patterns. Don\'t hesitate to reach out to a healthcare provider if you\'re worried!', 'status' => 'published', 'reactions_count' => 1, 'replies_count' => 0, 'created_at' => now()->subHours(1), 'updated_at' => now()->subHours(1)];
        }
        
        // Insert parent comments first
        if (!empty($comments)) {
            foreach ($comments as $comment) {
                DB::table('post_comments')->insert($comment);
            }
            
            // Now insert replies with parent_id references
            if (isset($postsToUse[0])) {
                $parentComment1 = DB::table('post_comments')->where('post_id', $postsToUse[0])->where('parent_id', null)->first();
                if ($parentComment1) {
                    DB::table('post_comments')->insert([
                        'post_id' => $postsToUse[0],
                        'user_id' => 3,
                        'parent_id' => $parentComment1->id,
                        'content' => 'Same here! It\'s so important to have all the information before making such an important decision.',
                        'status' => 'published',
                        'reactions_count' => 1,
                        'replies_count' => 0,
                        'created_at' => now()->subHours(20),
                        'updated_at' => now()->subHours(20),
                    ]);
                }
            }
            
            if (isset($postsToUse[2])) {
                $parentComment5 = DB::table('post_comments')->where('post_id', $postsToUse[2])->where('parent_id', null)->first();
                if ($parentComment5) {
                    DB::table('post_comments')->insert([
                        'post_id' => $postsToUse[2],
                        'user_id' => 2,
                        'parent_id' => $parentComment5->id,
                        'content' => 'Absolutely! We need to keep advocating for these rights.',
                        'status' => 'published',
                        'reactions_count' => 2,
                        'replies_count' => 0,
                        'created_at' => now()->subHours(3),
                        'updated_at' => now()->subHours(3),
                    ]);
                }
            }
            
            if (isset($postsToUse[5])) {
                $parentComment10 = DB::table('post_comments')->where('post_id', $postsToUse[5])->where('parent_id', null)->first();
                if ($parentComment10) {
                    DB::table('post_comments')->insert([
                        'post_id' => $postsToUse[5],
                        'user_id' => 2,
                        'parent_id' => $parentComment10->id,
                        'content' => 'Your story will help so many others who might be going through similar experiences.',
                        'status' => 'published',
                        'reactions_count' => 2,
                        'replies_count' => 0,
                        'created_at' => now()->subDays(1),
                        'updated_at' => now()->subDays(1),
                    ]);
                }
            }
        }
    }
}
