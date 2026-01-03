<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class ProcessPendingEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'queue:process-pending {--limit=10 : Number of jobs to process}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Process pending email jobs from the queue';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $limit = (int) $this->option('limit');
        
        $this->info("Processing up to {$limit} pending jobs...");
        
        // Process jobs using queue:work
        $this->call('queue:work', [
            '--once' => true,
            '--tries' => 3,
            '--timeout' => 60,
        ]);
        
        $pending = DB::table('jobs')->count();
        
        if ($pending > 0) {
            $this->warn("Still {$pending} jobs remaining. Run this command again or set up queue workers.");
        } else {
            $this->info('✓ All pending jobs processed!');
        }
        
        return 0;
    }
}

