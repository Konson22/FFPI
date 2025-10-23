<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class RegistrationValidationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_api_registration_requires_valid_name()
    {
        $response = $this->postJson('/api/register', [
            'name' => '',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    public function test_api_registration_requires_valid_email()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'invalid-email',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_api_registration_requires_strong_password()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'weak',
            'password_confirmation' => 'weak',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_api_registration_prevents_duplicate_emails()
    {
        User::factory()->create(['email' => 'test@example.com']);

        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['email']);
    }

    public function test_api_registration_validates_phone_number_format()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => 'invalid-phone',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['phone']);
    }

    public function test_api_registration_accepts_valid_data()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'phone' => '+1234567890',
            'address' => '123 Main St',
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'success' => true,
            'message' => 'Registration successful'
        ]);
    }

    public function test_web_registration_requires_organization_name()
    {
        $response = $this->post('/register', [
            'name' => '',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertSessionHasErrors(['name']);
    }

    public function test_web_registration_validates_avatar_file()
    {
        Storage::fake('public');

        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'avatar' => UploadedFile::fake()->create('document.pdf', 1000),
        ]);

        $response->assertSessionHasErrors(['avatar']);
    }

    public function test_web_registration_accepts_valid_avatar()
    {
        Storage::fake('public');

        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'avatar' => UploadedFile::fake()->image('avatar.jpg', 200, 200),
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_validates_social_media_urls_when_provided()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'social_media' => [
                'facebook' => 'invalid-url',
                'twitter' => 'https://twitter.com/valid',
            ],
        ]);

        $response->assertSessionHasErrors(['social_media.facebook']);
    }

    public function test_web_registration_accepts_empty_social_media()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'social_media' => [],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_prevents_same_organization_and_user_email()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'same@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'same@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertSessionHasErrors(['email']);
    }

    public function test_web_registration_validates_website_url_when_provided()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'website' => 'not-a-valid-url',
        ]);

        $response->assertSessionHasErrors(['website']);
    }

    public function test_web_registration_accepts_empty_website()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'website' => '',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_accepts_valid_website_url()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'website' => 'https://example.com',
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_password_validation_requires_mixed_case()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'password123!',
            'password_confirmation' => 'password123!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_password_validation_requires_numbers()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'Password!',
            'password_confirmation' => 'Password!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_password_validation_requires_special_characters()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John Doe',
            'email' => 'test@example.com',
            'password' => 'Password123',
            'password_confirmation' => 'Password123',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['password']);
    }

    public function test_name_validation_rejects_invalid_characters()
    {
        $response = $this->postJson('/api/register', [
            'name' => 'John123@Doe',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
        ]);

        $response->assertStatus(422);
        $response->assertJsonValidationErrors(['name']);
    }

    public function test_phone_validation_accepts_valid_formats()
    {
        $validPhones = ['+1234567890', '1234567890', '+44123456789'];

        foreach ($validPhones as $phone) {
            $response = $this->postJson('/api/register', [
                'name' => 'John Doe',
                'email' => 'test' . uniqid() . '@example.com',
                'password' => 'Password123!',
                'password_confirmation' => 'Password123!',
                'phone' => $phone,
            ]);

            $response->assertStatus(201);
        }
    }
}
