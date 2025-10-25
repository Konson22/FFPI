<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerificationWelcomeEmail;
use App\Models\User;

class TestEmail extends Command
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
    protected $description = 'Send a test verification email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        // Create a test user
        $user = new User();
        $user->name = 'Test User';
        $user->email = $email;
        $user->role = 'user';
        $user->id = 1;
        $user->email_verified_at = null;
        
        try {
            $this->info("Sending test email to: {$email}");
            
            // Send a simple test email first
            Mail::raw('This is a test email from your Laravel application!', function ($message) use ($email) {
                $message->to($email)
                        ->subject('Test Email from Family Planning App');
            });
            
            $this->info('✅ Simple test email sent successfully!');
            $this->info('Check your email inbox or Mailtrap dashboard.');
            
        } catch (\Exception $e) {
            $this->error('❌ Error sending email: ' . $e->getMessage());
            $this->error('Stack trace: ' . $e->getTraceAsString());
        }
    }
}
