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
        // Create or update admin user
        $user = User::updateOrCreate(
            ['email' => 'admin@gmail.com'],
            [
                'name' => 'admin',
                'password' => bcrypt('Konsonak@github2'), // You should change this password
            ]
        );
        
        // Set email as verified
        $user->email_verified_at = now();
        $user->save();
    }

    /**
     * Reverse the database seeds (rollback).
     * This method will be called when running: php artisan db:seed:rollback --class=UserSeeder
     */
    public function down(): void
    {
        // Delete the admin user
        User::where('email', 'admin@gmail.com')->delete();
    }
}
