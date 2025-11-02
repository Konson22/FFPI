<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PostReactionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Skip if reactions already exist
        if (DB::table('post_reactions')->count() > 0) {
            $this->command->info('Post reactions already exist. Skipping PostReactionsSeeder.');
            return;
        }
        
        // Get actual post IDs from the database
        $postIds = DB::table('posts')->pluck('id')->toArray();
        if (empty($postIds)) {
            $this->command->warn('No posts found. Skipping PostReactionsSeeder.');
            return;
        }
        
        // Use actual post IDs or default to first 8 posts
        $postsToUse = array_slice($postIds, 0, 8);
        $reactions = [];
        
        // Post 1 reactions
        if (isset($postsToUse[0])) {
            $reactions[] = ['post_id' => $postsToUse[0], 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
            $reactions[] = ['post_id' => $postsToUse[0], 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
            $reactions[] = ['post_id' => $postsToUse[0], 'user_id' => 1, 'reaction_type' => 'support', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)];
        }
        
        // Post 2 reactions
        if (isset($postsToUse[1])) {
            $reactions[] = ['post_id' => $postsToUse[1], 'user_id' => 1, 'reaction_type' => 'like', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)];
            $reactions[] = ['post_id' => $postsToUse[1], 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)];
        }
        
        // Post 3 reactions
        if (isset($postsToUse[2])) {
            $reactions[] = ['post_id' => $postsToUse[2], 'user_id' => 1, 'reaction_type' => 'love', 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)];
            $reactions[] = ['post_id' => $postsToUse[2], 'user_id' => 2, 'reaction_type' => 'support', 'created_at' => now()->subHours(3), 'updated_at' => now()->subHours(3)];
        }
        
        // Post 4 reactions
        if (isset($postsToUse[3])) {
            $reactions[] = ['post_id' => $postsToUse[3], 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subHours(10), 'updated_at' => now()->subHours(10)];
            $reactions[] = ['post_id' => $postsToUse[3], 'user_id' => 3, 'reaction_type' => 'support', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)];
        }
        
        // Post 5 reactions
        if (isset($postsToUse[4])) {
            $reactions[] = ['post_id' => $postsToUse[4], 'user_id' => 1, 'reaction_type' => 'like', 'created_at' => now()->subHours(16), 'updated_at' => now()->subHours(16)];
            $reactions[] = ['post_id' => $postsToUse[4], 'user_id' => 3, 'reaction_type' => 'support', 'created_at' => now()->subHours(14), 'updated_at' => now()->subHours(14)];
        }
        
        // Post 6 reactions
        if (isset($postsToUse[5])) {
            $reactions[] = ['post_id' => $postsToUse[5], 'user_id' => 1, 'reaction_type' => 'love', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)];
            $reactions[] = ['post_id' => $postsToUse[5], 'user_id' => 2, 'reaction_type' => 'support', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)];
        }
        
        // Post 7 reactions
        if (isset($postsToUse[6])) {
            $reactions[] = ['post_id' => $postsToUse[6], 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)];
            $reactions[] = ['post_id' => $postsToUse[6], 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)];
        }
        
        // Post 8 reactions
        if (isset($postsToUse[7])) {
            $reactions[] = ['post_id' => $postsToUse[7], 'user_id' => 1, 'reaction_type' => 'support', 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)];
            $reactions[] = ['post_id' => $postsToUse[7], 'user_id' => 3, 'reaction_type' => 'like', 'created_at' => now()->subHours(1), 'updated_at' => now()->subHours(1)];
        }
        
        if (!empty($reactions)) {
            DB::table('post_reactions')->insert($reactions);
        }
    }
}
