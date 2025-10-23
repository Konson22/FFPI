<?php

namespace Tests\Feature;

use App\Models\User;
use App\Mail\WelcomeEmail;
use App\Notifications\UserRegisteredNotification;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class WelcomeEmailTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        Mail::fake();
        Notification::fake();
    }

    public function test_welcome_email_has_correct_subject()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);

        $this->assertEquals('Welcome to Family Planning Platform!', $mail->envelope()->subject);
    }

    public function test_welcome_email_has_correct_reply_to()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);

        $this->assertEquals(config('email.reply_to.address'), $mail->envelope()->replyTo);
    }

    public function test_welcome_email_uses_correct_view()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);

        $this->assertEquals('emails.welcome', $mail->content()->view);
    }

    public function test_welcome_email_passes_correct_data()
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'account_type' => 'user',
        ]);

        $mail = new WelcomeEmail($user);
        $data = $mail->content()->with;

        $this->assertEquals($user, $data['user']);
        $this->assertEquals(config('app.name', 'Family Planning Platform'), $data['appName']);
    }

    public function test_welcome_email_renders_without_errors()
    {
        $user = User::factory()->create([
            'name' => 'Jane Smith',
            'email' => 'jane@example.com',
            'account_type' => 'premium',
        ]);

        $mail = new WelcomeEmail($user);
        
        // This should not throw an exception
        $rendered = $mail->render();
        $this->assertIsString($rendered);
        $this->assertStringContainsString('Welcome, Jane Smith!', $rendered);
        $this->assertStringContainsString('jane@example.com', $rendered);
    }

    public function test_user_registration_sends_welcome_email()
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

        Notification::assertSentTo(
            $user,
            UserRegisteredNotification::class
        );
    }

    public function test_welcome_email_contains_platform_features()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);
        $rendered = $mail->render();

        $this->assertStringContainsString('Cycle Tracking', $rendered);
        $this->assertStringContainsString('Expert Consultations', $rendered);
        $this->assertStringContainsString('Health Monitoring', $rendered);
        $this->assertStringContainsString('Community Support', $rendered);
        $this->assertStringContainsString('Appointment Scheduling', $rendered);
        $this->assertStringContainsString('Educational Resources', $rendered);
    }

    public function test_welcome_email_contains_account_details()
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'account_type' => 'user',
        ]);

        $mail = new WelcomeEmail($user);
        $rendered = $mail->render();

        $this->assertStringContainsString('Test User', $rendered);
        $this->assertStringContainsString('test@example.com', $rendered);
        $this->assertStringContainsString('User', $rendered);
    }

    public function test_welcome_email_has_proper_styling()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);
        $rendered = $mail->render();

        // Check for CSS classes and styling
        $this->assertStringContainsString('email-container', $rendered);
        $this->assertStringContainsString('welcome-text', $rendered);
        $this->assertStringContainsString('cta-button', $rendered);
        $this->assertStringContainsString('features', $rendered);
        $this->assertStringContainsString('account-info', $rendered);
    }

    public function test_welcome_email_has_call_to_action_button()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);
        $rendered = $mail->render();

        $this->assertStringContainsString('Start Your Journey', $rendered);
        $this->assertStringContainsString(config('app.url'), $rendered);
    }

    public function test_welcome_email_has_footer_information()
    {
        $user = User::factory()->create();
        $mail = new WelcomeEmail($user);
        $rendered = $mail->render();

        $this->assertStringContainsString('Thank you for trusting us', $rendered);
        $this->assertStringContainsString('Support Center', $rendered);
        $this->assertStringContainsString('Privacy Policy', $rendered);
        $this->assertStringContainsString('Terms of Service', $rendered);
        $this->assertStringContainsString(date('Y'), $rendered);
    }
}
