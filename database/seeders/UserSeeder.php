<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a batch of regular users
        User::factory()
            ->count(20)
            ->create([
                'role' => 'user',
            ]);
    }
}
