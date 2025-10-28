<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Moodle\MoodleLmsAdapter;

class SyncMoodleCourses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'moodle:sync-courses {--force : Force sync even if recently synced}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Sync courses from Moodle LMS';

    /**
     * Execute the console command.
     */
    public function handle(MoodleLmsAdapter $moodleAdapter)
    {
        $this->info('Starting Moodle course synchronization...');

        try {
            // Test connection first
            if (!$moodleAdapter->testConnection()) {
                $this->error('Failed to connect to Moodle. Please check your configuration.');
                return 1;
            }

            $this->info('✓ Moodle connection successful');

            // Sync courses
            $courses = $moodleAdapter->syncCourses();

            $this->info("✓ Successfully synced {count($courses)} courses from Moodle");

            foreach ($courses as $course) {
                $this->line("  - {$course->title} (ID: {$course->id})");
            }

            $this->info('Moodle course synchronization completed successfully!');
            return 0;

        } catch (\Exception $e) {
            $this->error('Failed to sync Moodle courses: ' . $e->getMessage());
            return 1;
        }
    }
}
