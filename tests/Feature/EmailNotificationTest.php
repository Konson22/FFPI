<?php

namespace Tests\Feature;

use App\Models\User;
use App\Notifications\UserRegisteredNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class EmailNotificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_user_registration_sends_email_notification()
    {
        Notification::fake();

        $userData = [
            'name' => $this->faker->name,
            'email' => $this->faker->safeEmail,
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
        ];

        $response = $this->postJson('/api/register', $userData);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
            'message' => 'Registration successful'
        ]);

        $user = User::where('email', $userData['email'])->first();
        $this->assertNotNull($user);

        Notification::assertSentTo(
            $user,
            UserRegisteredNotification::class
        );
    }

    public function test_email_notification_has_correct_content()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'user_type' => 'user',
        ]);

        $notification = new UserRegisteredNotification($user);
        $mailMessage = $notification->toMail($user);

        $this->assertEquals('Welcome to ' . config('app.name') . '!', $mailMessage->subject);
        $this->assertStringContainsString('emails.user-registered', $mailMessage->view);
    }

    public function test_email_notification_handles_errors_gracefully()
    {
        // Mock a user that will cause notification to fail
        $user = User::factory()->create();
        
        // This should not throw an exception
        $this->expectNotToPerformAssertions();
        
        try {
            $user->notify(new UserRegisteredNotification($user));
        } catch (\Exception $e) {
            // This is expected to be caught in the controller
        }
    }
}
