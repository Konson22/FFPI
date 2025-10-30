<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ModuleEnrollmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = DB::table('users')->pluck('id');
        $modules = DB::table('modules')->pluck('id');

        if ($users->isEmpty() || $modules->isEmpty()) {
            $this->command?->warn('Users or Modules not found. Skipping ModuleEnrollmentsSeeder.');
            return;
        }

        $statuses = ['enrolled', 'started', 'completed'];
        $enrollments = [];

        foreach ($users as $userId) {
            // Enroll each user into up to 3 random modules
            $assigned = $modules->shuffle()->take(min(3, $modules->count()));

            foreach ($assigned as $moduleId) {
                $status = $statuses[array_rand($statuses)];

                $startedAt = null;
                $completedAt = null;
                $progress = 0;

                if ($status === 'started') {
                    $startedAt = Carbon::now()->subDays(rand(1, 14));
                    $progress = rand(10, 90);
                } elseif ($status === 'completed') {
                    $startedAt = Carbon::now()->subDays(rand(7, 30));
                    $completedAt = Carbon::now()->subDays(rand(0, 6));
                    $progress = 100;
                }

                $enrollments[] = [
                    'user_id' => $userId,
                    'module_id' => $moduleId,
                    'status' => $status,
                    'started_at' => $startedAt,
                    'completed_at' => $completedAt,
                    'progress_percentage' => $progress,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ];
            }
        }

        if (!empty($enrollments)) {
            // Use upsert to satisfy unique(user_id, module_id)
            DB::table('module_enrollments')->upsert(
                $enrollments,
                ['user_id', 'module_id'],
                ['status', 'started_at', 'completed_at', 'progress_percentage', 'updated_at']
            );
        }
    }
}
