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
        $reactions = [
            // Post 1 reactions
            ['post_id' => 1, 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            ['post_id' => 1, 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            ['post_id' => 1, 'user_id' => 1, 'reaction_type' => 'support', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)],
            
            // Post 2 reactions
            ['post_id' => 2, 'user_id' => 1, 'reaction_type' => 'like', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)],
            ['post_id' => 2, 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)],
            
            // Post 3 reactions
            ['post_id' => 3, 'user_id' => 1, 'reaction_type' => 'love', 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)],
            ['post_id' => 3, 'user_id' => 2, 'reaction_type' => 'support', 'created_at' => now()->subHours(3), 'updated_at' => now()->subHours(3)],
            
            // Post 4 reactions
            ['post_id' => 4, 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subHours(10), 'updated_at' => now()->subHours(10)],
            ['post_id' => 4, 'user_id' => 3, 'reaction_type' => 'support', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)],
            
            // Post 5 reactions
            ['post_id' => 5, 'user_id' => 1, 'reaction_type' => 'like', 'created_at' => now()->subHours(16), 'updated_at' => now()->subHours(16)],
            ['post_id' => 5, 'user_id' => 3, 'reaction_type' => 'support', 'created_at' => now()->subHours(14), 'updated_at' => now()->subHours(14)],
            
            // Post 6 reactions
            ['post_id' => 6, 'user_id' => 1, 'reaction_type' => 'love', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)],
            ['post_id' => 6, 'user_id' => 2, 'reaction_type' => 'support', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            
            // Post 7 reactions
            ['post_id' => 7, 'user_id' => 2, 'reaction_type' => 'like', 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)],
            ['post_id' => 7, 'user_id' => 3, 'reaction_type' => 'informative', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)],
            
            // Post 8 reactions
            ['post_id' => 8, 'user_id' => 1, 'reaction_type' => 'support', 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)],
            ['post_id' => 8, 'user_id' => 3, 'reaction_type' => 'like', 'created_at' => now()->subHours(1), 'updated_at' => now()->subHours(1)],
        ];

        DB::table('post_reactions')->insert($reactions);
    }
}
