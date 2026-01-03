<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Log;

class TestEmailSending extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:email {email}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test email sending configuration';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $this->info('=== Email Configuration Test ===');
        $this->newLine();
        
        // Check queue connection
        $queueConnection = config('queue.default');
        $this->info("Queue Connection: {$queueConnection}");
        
        if ($queueConnection !== 'sync') {
            $this->warn('⚠️  Queue is not set to SYNC. Emails may be queued.');
        }
        
        $this->newLine();
        
        // Check mail configuration
        $this->info('=== Mail Configuration ===');
        $mailer = config('mail.default');
        $this->info("Mail Driver: {$mailer}");
        
        if ($mailer === 'smtp') {
            $this->info("SMTP Host: " . config('mail.mailers.smtp.host'));
            $this->info("SMTP Port: " . config('mail.mailers.smtp.port'));
            $this->info("SMTP Encryption: " . config('mail.mailers.smtp.encryption'));
            $this->info("SMTP Username: " . (config('mail.mailers.smtp.username') ?: 'Not set'));
            $this->info("SMTP Password: " . (config('mail.mailers.smtp.password') ? '***' : 'Not set'));
        }
        
        $this->info("From Address: " . config('mail.from.address'));
        $this->info("From Name: " . config('mail.from.name'));
        
        $this->newLine();
        
        // Test sending email
        $this->info('=== Testing Email Send ===');
        $this->info("Sending test email to: {$email}");
        
        try {
            Mail::raw('This is a test email from your Laravel application. If you receive this, your email configuration is working!', function ($message) use ($email) {
                $message->to($email)
                        ->subject('Test Email - Family Planning Platform');
            });
            
            $this->info('✅ Email sent successfully!');
            $this->info('Check your inbox (and spam folder) for the test email.');
            
        } catch (\Exception $e) {
            $this->error('❌ Failed to send email!');
            $this->error('Error: ' . $e->getMessage());
            $this->error('File: ' . $e->getFile() . ':' . $e->getLine());
            
            Log::error('Email test failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            $this->newLine();
            $this->warn('Check storage/logs/laravel.log for more details.');
            
            return 1;
        }
        
        return 0;
    }
}

