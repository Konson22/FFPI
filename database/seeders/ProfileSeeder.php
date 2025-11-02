<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ProfileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Skip if profiles already exist
        if (DB::table('profiles')->count() > 0) {
            $this->command->info('Profiles already exist. Skipping ProfileSeeder.');
            return;
        }
        $users = DB::table('users')->select('id')->get();
        
        if ($users->isEmpty()) {
            $this->command->warn('No users found. Please run UserSeeder first.');
            return;
        }

        $profiles = [];
        $now = Carbon::now();
        
        foreach ($users as $index => $user) {
            $userId = $user->id;
            
            // Determine gender - alternate or set specific users as female for testing
            $gender = $index % 3 === 0 ? 'female' : ($index % 3 === 1 ? 'male' : 'other');
            
            // For female users, add cycle-related data
            $cycleLength = null;
            $periodLength = null;
            if ($gender === 'female') {
                $cycleLength = rand(26, 32); // Typical cycle length between 26-32 days
                $periodLength = rand(3, 7); // Typical period length between 3-7 days
            }
            
            $profiles[] = [
                'user_id' => $userId,
                'gender' => $gender,
                'date_of_birth' => Carbon::now()->subYears(rand(18, 45)),
                'marital_status' => ['single', 'married', 'divorced', 'widowed'][rand(0, 3)],
                'cycle_length' => $cycleLength,
                'period_length' => $periodLength,
                'health_notes' => $gender === 'female' ? 'Regular cycle, no known health issues' : null,
                'preferences' => json_encode([
                    'notifications' => true,
                    'reminders' => true,
                    'privacy_level' => 'normal',
                ]),
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }

        DB::table('profiles')->insert($profiles);
    }
}
