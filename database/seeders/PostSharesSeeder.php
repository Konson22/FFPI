<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PostSharesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Skip if shares already exist
        if (DB::table('post_shares')->count() > 0) {
            $this->command->info('Post shares already exist. Skipping PostSharesSeeder.');
            return;
        }
        
        // Get actual post IDs from the database
        $postIds = DB::table('posts')->pluck('id')->toArray();
        if (empty($postIds)) {
            $this->command->warn('No posts found. Skipping PostSharesSeeder.');
            return;
        }
        
        // Use actual post IDs (first 8 posts)
        $postsToUse = array_slice($postIds, 0, 8);
        $shares = [];
        
        // Post 1 shares
        if (isset($postsToUse[0])) {
            $shares[] = ['post_id' => $postsToUse[0], 'user_id' => 2, 'platform' => 'internal', 'message' => 'Sharing this helpful information!', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
            $shares[] = ['post_id' => $postsToUse[0], 'user_id' => 3, 'platform' => 'facebook', 'message' => 'Great resource for anyone looking for contraceptive information', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)];
        }
        
        // Post 2 shares
        if (isset($postsToUse[1])) {
            $shares[] = ['post_id' => $postsToUse[1], 'user_id' => 1, 'platform' => 'whatsapp', 'message' => 'Important information about STI prevention', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)];
            $shares[] = ['post_id' => $postsToUse[1], 'user_id' => 3, 'platform' => 'internal', 'message' => 'Everyone should read this', 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)];
        }
        
        // Post 3 shares
        if (isset($postsToUse[2])) {
            $shares[] = ['post_id' => $postsToUse[2], 'user_id' => 1, 'platform' => 'twitter', 'message' => 'Reproductive rights matter! #SRHR', 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)];
            $shares[] = ['post_id' => $postsToUse[2], 'user_id' => 2, 'platform' => 'internal', 'message' => 'Sharing this important message', 'created_at' => now()->subHours(3), 'updated_at' => now()->subHours(3)];
        }
        
        // Post 4 shares
        if (isset($postsToUse[3])) {
            $shares[] = ['post_id' => $postsToUse[3], 'user_id' => 2, 'platform' => 'internal', 'message' => 'Helpful for young people', 'created_at' => now()->subHours(10), 'updated_at' => now()->subHours(10)];
        }
        
        // Post 5 shares
        if (isset($postsToUse[4])) {
            $shares[] = ['post_id' => $postsToUse[4], 'user_id' => 1, 'platform' => 'internal', 'message' => 'Mental health is so important', 'created_at' => now()->subHours(15), 'updated_at' => now()->subHours(15)];
            $shares[] = ['post_id' => $postsToUse[4], 'user_id' => 3, 'platform' => 'telegram', 'message' => 'Great discussion about mental health and sexual well-being', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)];
        }
        
        // Post 6 shares
        if (isset($postsToUse[5])) {
            $shares[] = ['post_id' => $postsToUse[5], 'user_id' => 1, 'platform' => 'facebook', 'message' => 'Thank you for sharing your story', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)];
            $shares[] = ['post_id' => $postsToUse[5], 'user_id' => 2, 'platform' => 'internal', 'message' => 'Courageous story that will help others', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
        }
        
        // Post 7 shares
        if (isset($postsToUse[6])) {
            $shares[] = ['post_id' => $postsToUse[6], 'user_id' => 2, 'platform' => 'internal', 'message' => 'Important research findings', 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)];
            $shares[] = ['post_id' => $postsToUse[6], 'user_id' => 3, 'platform' => 'twitter', 'message' => 'Evidence-based education works! #SexEd', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)];
        }
        
        // Post 8 shares
        if (isset($postsToUse[7])) {
            $shares[] = ['post_id' => $postsToUse[7], 'user_id' => 1, 'platform' => 'internal', 'message' => 'Hope this helps someone with similar concerns', 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)];
        }
        
        if (!empty($shares)) {
            DB::table('post_shares')->insert($shares);
        }
    }
}
