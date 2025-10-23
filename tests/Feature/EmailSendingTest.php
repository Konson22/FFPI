<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\UserRegisteredNotification;
use App\Notifications\VerifyEmailNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class EmailSendingTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        Notification::fake();
    }

    public function test_api_registration_sends_welcome_email()
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->safeEmail,
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(201);
        
        $user = User::where('email', $userData['email'])->first();
        $this->assertNotNull($user);

        // Check if welcome email was sent
        Notification::assertSentTo(
            $user,
            UserRegisteredNotification::class
        );
    }

    public function test_api_registration_sends_verification_email()
    {
        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->safeEmail,
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(201);
        
        $user = User::where('email', $userData['email'])->first();
        $this->assertNotNull($user);

        // Check if verification email was sent
        Notification::assertSentTo(
            $user,
            VerifyEmailNotification::class
        );
    }

    public function test_user_can_send_verification_email_manually()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $user->sendEmailVerificationNotification();

        Notification::assertSentTo(
            $user,
            VerifyEmailNotification::class
        );
    }

    public function test_user_can_send_welcome_email_manually()
    {
        $user = User::factory()->create();

        $user->notify(new UserRegisteredNotification($user));

        Notification::assertSentTo(
            $user,
            UserRegisteredNotification::class
        );
    }

    public function test_verification_email_has_correct_subject()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $notification = new VerifyEmailNotification();
        $mailMessage = $notification->toMail($user);

        $this->assertStringContainsString('Verify Email Address', $mailMessage->subject);
    }

    public function test_welcome_email_has_correct_subject()
    {
        $user = User::factory()->create();

        $notification = new UserRegisteredNotification($user);
        $mailMessage = $notification->toMail($user);

        $this->assertStringContainsString('Welcome to', $mailMessage->subject);
    }

    public function test_verification_email_uses_custom_template()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $notification = new VerifyEmailNotification();
        $mailMessage = $notification->toMail($user);

        $this->assertStringContainsString('emails.verify-email', $mailMessage->view);
    }

    public function test_welcome_email_uses_custom_template()
    {
        $user = User::factory()->create();

        $notification = new UserRegisteredNotification($user);
        $mailMessage = $notification->toMail($user);

        $this->assertStringContainsString('emails.welcome', $mailMessage->view);
    }
}
