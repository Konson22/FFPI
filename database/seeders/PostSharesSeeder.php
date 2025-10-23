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
        $shares = [
            // Post 1 shares
            ['post_id' => 1, 'user_id' => 2, 'platform' => 'internal', 'message' => 'Sharing this helpful information!', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            ['post_id' => 1, 'user_id' => 3, 'platform' => 'facebook', 'message' => 'Great resource for anyone looking for contraceptive information', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)],
            
            // Post 2 shares
            ['post_id' => 2, 'user_id' => 1, 'platform' => 'whatsapp', 'message' => 'Important information about STI prevention', 'created_at' => now()->subHours(8), 'updated_at' => now()->subHours(8)],
            ['post_id' => 2, 'user_id' => 3, 'platform' => 'internal', 'message' => 'Everyone should read this', 'created_at' => now()->subHours(6), 'updated_at' => now()->subHours(6)],
            
            // Post 3 shares
            ['post_id' => 3, 'user_id' => 1, 'platform' => 'twitter', 'message' => 'Reproductive rights matter! #SRHR', 'created_at' => now()->subHours(4), 'updated_at' => now()->subHours(4)],
            ['post_id' => 3, 'user_id' => 2, 'platform' => 'internal', 'message' => 'Sharing this important message', 'created_at' => now()->subHours(3), 'updated_at' => now()->subHours(3)],
            
            // Post 4 shares
            ['post_id' => 4, 'user_id' => 2, 'platform' => 'internal', 'message' => 'Helpful for young people', 'created_at' => now()->subHours(10), 'updated_at' => now()->subHours(10)],
            
            // Post 5 shares
            ['post_id' => 5, 'user_id' => 1, 'platform' => 'internal', 'message' => 'Mental health is so important', 'created_at' => now()->subHours(15), 'updated_at' => now()->subHours(15)],
            ['post_id' => 5, 'user_id' => 3, 'platform' => 'telegram', 'message' => 'Great discussion about mental health and sexual well-being', 'created_at' => now()->subHours(12), 'updated_at' => now()->subHours(12)],
            
            // Post 6 shares
            ['post_id' => 6, 'user_id' => 1, 'platform' => 'facebook', 'message' => 'Thank you for sharing your story', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)],
            ['post_id' => 6, 'user_id' => 2, 'platform' => 'internal', 'message' => 'Courageous story that will help others', 'created_at' => now()->subDays(1), 'updated_at' => now()->subDays(1)],
            
            // Post 7 shares
            ['post_id' => 7, 'user_id' => 2, 'platform' => 'internal', 'message' => 'Important research findings', 'created_at' => now()->subDays(3), 'updated_at' => now()->subDays(3)],
            ['post_id' => 7, 'user_id' => 3, 'platform' => 'twitter', 'message' => 'Evidence-based education works! #SexEd', 'created_at' => now()->subDays(2), 'updated_at' => now()->subDays(2)],
            
            // Post 8 shares
            ['post_id' => 8, 'user_id' => 1, 'platform' => 'internal', 'message' => 'Hope this helps someone with similar concerns', 'created_at' => now()->subHours(2), 'updated_at' => now()->subHours(2)],
        ];

        DB::table('post_shares')->insert($shares);
    }
}
