<?php

namespace App\Console\Commands;

use App\Models\User;
use App\Notifications\UserRegisteredNotification;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Notification;

class SendWelcomeEmail extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'email:send-welcome {email : The email address of the user}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Send a welcome email to a specific user';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $email = $this->argument('email');
        
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            $this->error("User with email {$email} not found.");
            return 1;
        }

        try {
            $user->notify(new UserRegisteredNotification());
            $this->info("Welcome email sent successfully to {$user->name} ({$user->email})");
            return 0;
        } catch (\Exception $e) {
            $this->error("Failed to send welcome email: " . $e->getMessage());
            return 1;
        }
    }
}
