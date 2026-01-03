<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class TestVerificationEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:verification-email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test sending verification email to a user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info('=== Testing Verification Email ===');
        $this->newLine();
        
        // Find user
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User with email {$email} not found!");
            return 1;
        }
        
        $this->info("User found: {$user->name} (ID: {$user->id})");
        $this->newLine();
        
        // Check if email template exists
        $templatePath = resource_path('views/emails/verification-welcome.blade.php');
        if (!file_exists($templatePath)) {
            $this->error("❌ Email template not found: {$templatePath}");
            $this->warn("This might cause the email to fail!");
        } else {
            $this->info("✅ Email template exists");
        }
        
        $this->newLine();
        
        // Try sending verification email
        $this->info('Sending verification email...');
        
        try {
            // Send using the notification
            $user->sendEmailVerificationNotification();
            
            $this->info('✅ Verification email notification sent!');
            $this->newLine();
            
            // Check logs
            $this->info('Checking logs for any errors...');
            $logFile = storage_path('logs/laravel.log');
            if (file_exists($logFile)) {
                $lastLines = file_get_contents($logFile);
                if (strpos($lastLines, 'Verification email sent') !== false) {
                    $this->info('✅ Found "Verification email sent" in logs');
                }
                if (strpos($lastLines, 'Failed to send verification email') !== false) {
                    $this->error('❌ Found "Failed to send verification email" in logs');
                    $this->warn('Check storage/logs/laravel.log for details');
                }
            }
            
            $this->newLine();
            $this->info('Check your inbox (and spam folder) for the verification email.');
            $this->info("If you don't receive it, check storage/logs/laravel.log for errors.");
            
        } catch (\Exception $e) {
            $this->error('❌ Failed to send verification email!');
            $this->error('Error: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
            
            Log::error('Verification email test failed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            return 1;
        }
        
        return 0;
    }
}
