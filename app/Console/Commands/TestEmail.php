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
            
            Mail::to($email)->send(new VerificationWelcomeEmail($user));
            
            $this->info('✅ Email sent successfully!');
            $this->info('Check your email inbox or Mailtrap dashboard.');
            
        } catch (\Exception $e) {
            $this->error('❌ Error sending email: ' . $e->getMessage());
        }
    }
}
