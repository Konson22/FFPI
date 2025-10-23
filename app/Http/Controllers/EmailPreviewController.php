<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Mail\WelcomeEmail;
use App\Notifications\VerifyEmailNotification;
use App\Notifications\UserRegisteredNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailPreviewController extends Controller
{
    /**
     * Show welcome email preview
     */
    public function welcome()
    {
        // Create a sample user for preview
        $user = new User([
            'id' => 1,
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'account_type' => 'user',
            'created_at' => now(),
        ]);

        $mail = new WelcomeEmail($user);
        
        return $mail->render();
    }

    /**
     * Show verification email preview
     */
    public function verifyEmail()
    {
        $user = new User([
            'id' => 1,
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'email_verified_at' => null,
            'created_at' => now(),
        ]);

        $notification = new VerifyEmailNotification();
        $mail = $notification->toMail($user);
        
        return $mail->render();
    }

    /**
     * Show user registered email preview
     */
    public function userRegistered()
    {
        $user = new User([
            'id' => 1,
            'name' => 'Jane Doe',
            'email' => 'jane.doe@example.com',
            'user_type' => 'user',
            'created_at' => now(),
        ]);

        $notification = new UserRegisteredNotification();
        $mail = $notification->toMail($user);
        
        return $mail->render();
    }
}
