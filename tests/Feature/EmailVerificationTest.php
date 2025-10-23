<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Auth\Events\Verified;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\URL;
use Tests\TestCase;

class EmailVerificationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_user_can_verify_email_via_api()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->get($verificationUrl);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Email verified successfully',
            'verified' => true
        ]);

        $this->assertTrue($user->fresh()->hasVerifiedEmail());
    }

    public function test_user_cannot_verify_with_invalid_hash()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => 'invalid-hash']
        );

        $response = $this->get($verificationUrl);

        $response->assertStatus(400);
        $response->assertJson([
            'success' => false,
            'message' => 'Invalid verification link'
        ]);

        $this->assertFalse($user->fresh()->hasVerifiedEmail());
    }

    public function test_already_verified_user_returns_success()
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->get($verificationUrl);

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Email already verified',
            'verified' => true
        ]);
    }

    public function test_authenticated_user_can_check_verification_status()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/user/email/verify');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'verified' => false,
            'email' => $user->email,
            'message' => 'Email verification required'
        ]);
    }

    public function test_verified_user_returns_verified_status()
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->getJson('/api/user/email/verify');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'verified' => true,
            'email' => $user->email,
            'message' => 'Email is verified'
        ]);
    }

    public function test_user_can_resend_verification_email()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/user/email/verify/resend');

        $response->assertStatus(200);
        $response->assertJson([
            'success' => true,
            'message' => 'Verification email sent successfully'
        ]);
    }

    public function test_verified_user_cannot_resend_verification()
    {
        $user = User::factory()->create([
            'email_verified_at' => now(),
        ]);

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/user/email/verify/resend');

        $response->assertStatus(400);
        $response->assertJson([
            'success' => false,
            'message' => 'Email already verified'
        ]);
    }

    public function test_unauthenticated_user_cannot_check_verification_status()
    {
        $response = $this->getJson('/api/user/email/verify');

        $response->assertStatus(401);
    }

    public function test_verification_fires_verified_event()
    {
        Event::fake();

        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->addMinutes(60),
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $this->get($verificationUrl);

        Event::assertDispatched(Verified::class, function ($event) use ($user) {
            return $event->user->id === $user->id;
        });
    }

    public function test_verification_url_expires_after_timeout()
    {
        $user = User::factory()->create([
            'email_verified_at' => null,
        ]);

        $verificationUrl = URL::temporarySignedRoute(
            'verification.verify',
            now()->subMinutes(1), // Expired 1 minute ago
            ['id' => $user->id, 'hash' => sha1($user->email)]
        );

        $response = $this->get($verificationUrl);

        $response->assertStatus(401); // Unauthorized due to expired signature
    }
}
