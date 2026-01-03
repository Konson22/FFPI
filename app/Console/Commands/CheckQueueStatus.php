<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;

class CheckQueueStatus extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'queue:status';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Check the status of the queue system';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('=== Queue Status Check ===');
        $this->newLine();

        // Check queue connection
        $connection = config('queue.default');
        $this->info("Queue Connection: {$connection}");

        if ($connection === 'sync') {
            $this->warn('⚠️  Queue is set to SYNC mode. Emails will send immediately but may slow down requests.');
        } else {
            $this->info('✓ Queue is configured for background processing.');
        }

        $this->newLine();

        // Check pending jobs
        try {
            $pendingJobs = DB::table('jobs')->count();
            $this->info("Pending Jobs: {$pendingJobs}");

            if ($pendingJobs > 0) {
                $this->warn("⚠️  You have {$pendingJobs} pending job(s). Make sure queue workers are running!");
            } else {
                $this->info('✓ No pending jobs.');
            }
        } catch (\Exception $e) {
            $this->error("✗ Could not check jobs table: " . $e->getMessage());
            $this->warn('Run: php artisan queue:table && php artisan migrate');
        }

        $this->newLine();

        // Check failed jobs
        try {
            $failedJobs = DB::table('failed_jobs')->count();
            $this->info("Failed Jobs: {$failedJobs}");

            if ($failedJobs > 0) {
                $this->error("✗ You have {$failedJobs} failed job(s).");
                $this->warn('Run: php artisan queue:failed to see details');
                $this->warn('Run: php artisan queue:retry all to retry them');
            } else {
                $this->info('✓ No failed jobs.');
            }
        } catch (\Exception $e) {
            $this->error("✗ Could not check failed_jobs table: " . $e->getMessage());
        }

        $this->newLine();

        // Check mail configuration
        $this->info('=== Mail Configuration ===');
        $mailer = config('mail.default');
        $this->info("Mail Driver: {$mailer}");

        if ($mailer === 'log') {
            $this->warn('⚠️  Mail is set to LOG mode. Emails are being written to logs only.');
        } elseif ($mailer === 'array') {
            $this->warn('⚠️  Mail is set to ARRAY mode. Emails are not being sent.');
        } else {
            $this->info('✓ Mail driver is configured.');
        }

        $this->newLine();

        // Recommendations
        $this->info('=== Recommendations ===');
        if ($connection !== 'sync' && $pendingJobs > 0) {
            $this->warn('1. Start queue workers: php artisan queue:work');
            $this->warn('2. Or set up Supervisor for production (see QUEUE_TROUBLESHOOTING.md)');
        }

        if ($failedJobs > 0) {
            $this->warn('3. Review and retry failed jobs: php artisan queue:failed');
        }

        if ($mailer === 'log' || $mailer === 'array') {
            $this->warn('4. Configure SMTP in .env file for production');
        }

        $this->newLine();
        $this->info('For detailed troubleshooting, see: QUEUE_TROUBLESHOOTING.md');
    }
}

