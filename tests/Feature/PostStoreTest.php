<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;

class PostStoreTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function test_authenticated_user_can_create_post()
    {
        // Create a user
        $user = User::factory()->create();
        
        // Create post data
        $postData = [
            'title' => 'Test Post Title',
            'content' => 'This is a test post content.',
            'category' => 'Health',
            'type' => 'article',
            'status' => 'published',
            'allow_comments' => true,
            'allow_sharing' => true,
        ];

        // Make authenticated request
        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/posts', $postData);

        // Assert response
        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Post created successfully.',
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'id',
                    'title',
                    'content',
                    'category',
                    'author',
                    'comments',
                    'comments_count',
                    'allow_comments',
                    'allow_sharing',
                    'views_count',
                    'likes',
                    'timestamp',
                ]
            ]);

        // Assert post was created in database
        $this->assertDatabaseHas('posts', [
            'user_id' => $user->id,
            'title' => 'Test Post Title',
            'content' => 'This is a test post content.',
            'category' => 'Health',
        ]);
    }

    public function test_unauthenticated_user_cannot_create_post()
    {
        $postData = [
            'title' => 'Test Post Title',
            'content' => 'This is a test post content.',
            'category' => 'Health',
        ];

        $response = $this->postJson('/api/posts', $postData);

        $response->assertStatus(401);
    }

    public function test_post_creation_requires_required_fields()
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/posts', []);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'content', 'category']);
    }

    public function test_post_creation_with_minimal_data()
    {
        $user = User::factory()->create();

        $postData = [
            'title' => 'Minimal Post',
            'content' => 'Minimal content.',
            'category' => 'General',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/posts', $postData);

        $response->assertStatus(201)
            ->assertJson([
                'success' => true,
                'message' => 'Post created successfully.',
            ]);

        // Check default values
        $this->assertDatabaseHas('posts', [
            'user_id' => $user->id,
            'title' => 'Minimal Post',
            'type' => 'article', // default value
            'status' => 'published', // default value
            'allow_comments' => true, // default value
            'allow_sharing' => true, // default value
            'is_featured' => false, // default value
        ]);
    }

    public function test_post_creation_with_invalid_type()
    {
        $user = User::factory()->create();

        $postData = [
            'title' => 'Test Post',
            'content' => 'Test content.',
            'category' => 'Health',
            'type' => 'invalid_type',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/posts', $postData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['type']);
    }

    public function test_post_creation_with_invalid_status()
    {
        $user = User::factory()->create();

        $postData = [
            'title' => 'Test Post',
            'content' => 'Test content.',
            'category' => 'Health',
            'status' => 'invalid_status',
        ];

        $response = $this->actingAs($user, 'sanctum')
            ->postJson('/api/posts', $postData);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['status']);
    }
}
