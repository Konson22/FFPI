<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class SymptomsSeeder extends Seeder
{
    public function run(): void
    {
        // Get users with female gender from profiles
        $users = DB::table('users')
            ->join('profiles', 'users.id', '=', 'profiles.user_id')
            ->where('profiles.gender', 'female')
            ->select('users.id')
            ->get();
        
        if ($users->isEmpty()) {
            $this->command->warn('No female users found. Please create users with profiles first.');
            return;
        }

        $symptoms = [];
        $moodOptions = ['happy', 'sad', 'anxious', 'irritable', 'calm', 'energetic', 'tired', 'emotional'];
        $dischargeTypes = ['none', 'dry', 'sticky', 'creamy', 'watery', 'egg white', 'clear', 'white'];
        
        foreach ($users as $user) {
            $userId = $user->id;
            
            // Generate symptoms for the last 30 days
            for ($day = 0; $day < 30; $day++) {
                $date = Carbon::now()->subDays($day);
                $dayOfMonth = $date->day;
                
                // Vary symptoms based on day of cycle (rough estimation)
                $cycleDay = $dayOfMonth % 28;
                
                // Pain level varies based on cycle phase
                $painLevel = null;
                if ($cycleDay >= 1 && $cycleDay <= 5) {
                    // Menstrual phase
                    $painLevel = rand(3, 7);
                } elseif ($cycleDay >= 12 && $cycleDay <= 16) {
                    // Ovulation phase
                    $painLevel = rand(1, 4);
                } elseif ($cycleDay >= 20 && $cycleDay <= 28) {
                    // Luteal phase
                    $painLevel = rand(1, 5);
                }
                
                // Mood varies
                $mood = $moodOptions[array_rand($moodOptions)];
                
                // Discharge varies based on cycle phase
                $discharge = null;
                if ($cycleDay >= 10 && $cycleDay <= 16) {
                    // Ovulation - more likely to have egg white discharge
                    $discharge = rand(0, 1) ? 'egg white' : $dischargeTypes[array_rand($dischargeTypes)];
                } else {
                    $discharge = rand(0, 2) ? $dischargeTypes[array_rand($dischargeTypes)] : null;
                }
                
                // Temperature (BBT) - typically 96-98°F range, slightly higher around ovulation
                $baseTemp = 97.0;
                if ($cycleDay >= 12 && $cycleDay <= 16) {
                    $baseTemp = 97.5;
                }
                $temperature = round($baseTemp + (rand(-50, 100) / 100), 2);
                
                // Only add symptoms for days with some activity (70% chance)
                if (rand(1, 10) <= 7) {
            $symptoms[] = [
                        'user_id' => $userId,
                        'date' => $date->format('Y-m-d'),
                        'mood' => $mood,
                        'pain_level' => $painLevel,
                        'discharge' => $discharge,
                        'temperature' => $temperature,
                        'created_at' => $date,
                        'updated_at' => $date,
                    ];
                }
            }
        }

        // Insert symptoms in batches to avoid memory issues
        $chunks = array_chunk($symptoms, 100);
        foreach ($chunks as $chunk) {
            DB::table('symptoms')->insert($chunk);
        }
    }
}
