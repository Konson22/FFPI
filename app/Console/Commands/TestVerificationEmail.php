<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\VerificationWelcomeNotification;
use Illuminate\Console\Command;

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
    protected $description = 'Test the verification and welcome email by sending it to a specified email address';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        // Create a temporary user for testing
        $user = new User([
            'name' => 'Test User',
            'email' => $email,
            'account_type' => 'user',
        ]);
        $user->id = 999; // Temporary ID for testing
        
        try {
            $user->notify(new VerificationWelcomeNotification());
            $this->info("Verification and welcome email sent successfully to {$email}");
            $this->info("Check your email inbox and spam folder for the message.");
        } catch (\Exception $e) {
            $this->error("Failed to send email: " . $e->getMessage());
            return 1;
        }
        
        return 0;
    }
}
