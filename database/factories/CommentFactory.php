<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $content = $this->faker->paragraphs(rand(1, 4), true);
        
        return [
            'topic_id' => \App\Models\Topic::factory(),
            'user_id' => \App\Models\User::factory(),
            'parent_id' => null,
            'content' => $content,
            'content_type' => $this->faker->randomElement(['text', 'image', 'video']),
            'attachments' => $this->faker->optional(0.1)->randomElements([
                ['name' => 'comment-image.jpg', 'url' => '/uploads/comments/image.jpg'],
                ['name' => 'document.pdf', 'url' => '/uploads/comments/document.pdf']
            ], rand(1, 2)),
            'status' => $this->faker->randomElement(['pending', 'approved', 'rejected', 'hidden', 'deleted']),
            'is_anonymous' => $this->faker->boolean(10),
            'is_edited' => $this->faker->boolean(15),
            'edited_at' => $this->faker->optional(0.15)->dateTimeBetween('-1 month', 'now'),
            'mentions' => $this->faker->optional(0.2)->randomElements(
                \App\Models\User::pluck('id')->toArray(), 
                rand(1, 3)
            ),
            'hashtags' => $this->faker->optional(0.3)->words(rand(1, 4)),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
            'likes_count' => $this->faker->numberBetween(0, 50),
            'dislikes_count' => $this->faker->numberBetween(0, 10),
            'replies_count' => 0,
            'reactions_count' => 0,
            'is_flagged' => $this->faker->boolean(5),
            'flag_count' => $this->faker->numberBetween(0, 3),
            'flag_reason' => $this->faker->optional(0.05)->randomElement([
                'Inappropriate content', 'Spam', 'Harassment', 'Misinformation'
            ]),
            'moderated_by' => $this->faker->optional(0.1)->randomElement(\App\Models\User::where('role', 'admin')->pluck('id')),
            'moderated_at' => $this->faker->optional(0.1)->dateTimeBetween('-1 month', 'now'),
            'moderation_notes' => $this->faker->optional(0.1)->sentence(),
            'is_expert_comment' => $this->faker->boolean(15),
            'expertise_level' => $this->faker->optional(0.2)->randomElement(['beginner', 'intermediate', 'advanced', 'expert']),
            'medical_disclaimer' => $this->faker->optional(0.1)->randomElement([
                ['text' => 'This is not medical advice. Please consult a healthcare professional.'],
                ['text' => 'Individual experiences may vary. Seek professional guidance.']
            ]),
            'is_verified_medical_advice' => $this->faker->boolean(5),
            'depth' => 0,
            'path' => null,
            'sort_order' => 0,
            'visibility' => $this->faker->randomElement(['public', 'private', 'followers_only']),
        ];
    }

    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'approved',
            'is_flagged' => false,
            'flag_count' => 0,
        ]);
    }

    public function flagged(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_flagged' => true,
            'flag_count' => $this->faker->numberBetween(1, 5),
            'flag_reason' => $this->faker->randomElement([
                'Inappropriate content', 'Spam', 'Harassment', 'Misinformation', 'Off-topic'
            ]),
        ]);
    }

    public function expertComment(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_expert_comment' => true,
            'expertise_level' => $this->faker->randomElement(['intermediate', 'advanced', 'expert']),
            'user_id' => \App\Models\User::where('role', 'expert')->inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
            'is_verified_medical_advice' => $this->faker->boolean(30),
        ]);
    }

    public function reply(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => \App\Models\Comment::factory(),
            'depth' => $this->faker->numberBetween(1, 3),
            'path' => $this->faker->numerify('#.#.#'),
        ]);
    }

    public function anonymous(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_anonymous' => true,
        ]);
    }

    public function withMentions(): static
    {
        return $this->state(fn (array $attributes) => [
            'mentions' => $this->faker->randomElements(
                \App\Models\User::pluck('id')->toArray(), 
                rand(1, 3)
            ),
        ]);
    }

    public function withHashtags(): static
    {
        return $this->state(fn (array $attributes) => [
            'hashtags' => $this->faker->words(rand(2, 5)),
        ]);
    }
}
