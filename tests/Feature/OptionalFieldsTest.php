<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class OptionalFieldsTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_web_registration_works_without_website()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            // No website field
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_works_without_social_media()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            // No social_media field
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_works_with_empty_social_media()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'social_media' => [
                'facebook' => '',
                'twitter' => '',
                'instagram' => '',
                'linkedin' => '',
            ],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_works_with_partial_social_media()
    {
        $response = $this->post('/register', [
            'name' => 'Test Organization',
            'email' => 'org@example.com',
            'user_name' => 'John Doe',
            'user_email' => 'user@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'social_media' => [
                'facebook' => 'https://facebook.com/test',
                'twitter' => '', // Empty
                'instagram' => 'https://instagram.com/test',
                'linkedin' => '', // Empty
            ],
        ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('users', ['email' => 'user@example.com']);
    }

    public function test_web_registration_accepts_valid_website()
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

    public function test_web_registration_rejects_invalid_website_when_provided()
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

    public function test_web_registration_rejects_invalid_social_media_when_provided()
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
}
