<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Topic>
 */
class TopicFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->sentence(6);
        $content = $this->faker->paragraphs(rand(3, 8), true);
        
        return [
            'user_id' => \App\Models\User::factory(),
            'category_id' => \App\Models\TopicCategory::factory(),
            'title' => $title,
            'content' => $content,
            'slug' => \Str::slug($title) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'status' => $this->faker->randomElement(['draft', 'published', 'archived', 'hidden']),
            'is_pinned' => $this->faker->boolean(10),
            'is_locked' => $this->faker->boolean(5),
            'is_anonymous' => $this->faker->boolean(15),
            'tags' => $this->faker->words(rand(2, 6)),
            'featured_image' => $this->faker->optional(0.3)->imageUrl(800, 600, 'health'),
            'attachments' => $this->faker->optional(0.2)->randomElements([
                ['name' => 'document.pdf', 'url' => '/uploads/documents/document.pdf'],
                ['name' => 'image.jpg', 'url' => '/uploads/images/image.jpg'],
                ['name' => 'chart.png', 'url' => '/uploads/charts/chart.png']
            ], rand(1, 3)),
            'views_count' => $this->faker->numberBetween(0, 1000),
            'comments_count' => 0,
            'reactions_count' => 0,
            'likes_count' => 0,
            'dislikes_count' => 0,
            'is_approved' => $this->faker->boolean(85),
            'approved_by' => $this->faker->optional(0.8)->randomElement(\App\Models\User::where('role', 'admin')->pluck('id')),
            'approved_at' => $this->faker->optional(0.8)->dateTimeBetween('-1 month', 'now'),
            'moderation_notes' => $this->faker->optional(0.1)->sentence(),
            'is_expert_post' => $this->faker->boolean(20),
            'expertise_level' => $this->faker->optional(0.3)->randomElement(['beginner', 'intermediate', 'advanced', 'expert']),
            'medical_disclaimer' => $this->faker->optional(0.2)->randomElement([
                ['text' => 'This information is for educational purposes only and should not replace professional medical advice.'],
                ['text' => 'Please consult with a healthcare provider before making any medical decisions.'],
                ['text' => 'Individual results may vary. Always seek professional medical advice.']
            ]),
            'visibility' => $this->faker->randomElement(['public', 'private', 'followers_only', 'doctors_only']),
            'allow_comments' => $this->faker->boolean(90),
            'allow_reactions' => $this->faker->boolean(95),
            'meta_description' => $this->faker->sentence(15),
            'meta_keywords' => $this->faker->words(5),
            'published_at' => $this->faker->optional(0.8)->dateTimeBetween('-6 months', 'now'),
            'last_activity_at' => $this->faker->optional(0.7)->dateTimeBetween('-1 month', 'now'),
        ];
    }

    public function published(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'published',
            'is_approved' => true,
            'published_at' => $this->faker->dateTimeBetween('-6 months', 'now'),
        ]);
    }

    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'draft',
            'is_approved' => false,
            'published_at' => null,
        ]);
    }

    public function pinned(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_pinned' => true,
            'status' => 'published',
            'is_approved' => true,
        ]);
    }

    public function expertPost(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_expert_post' => true,
            'expertise_level' => $this->faker->randomElement(['intermediate', 'advanced', 'expert']),
            'user_id' => \App\Models\User::where('role', 'expert')->inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
        ]);
    }

    public function anonymous(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_anonymous' => true,
        ]);
    }

    public function withAttachments(): static
    {
        return $this->state(fn (array $attributes) => [
            'attachments' => $this->faker->randomElements([
                ['name' => 'medical-report.pdf', 'url' => '/uploads/documents/medical-report.pdf', 'type' => 'pdf'],
                ['name' => 'lab-results.jpg', 'url' => '/uploads/images/lab-results.jpg', 'type' => 'image'],
                ['name' => 'prescription.png', 'url' => '/uploads/prescriptions/prescription.png', 'type' => 'image'],
                ['name' => 'chart.pdf', 'url' => '/uploads/charts/chart.pdf', 'type' => 'pdf']
            ], rand(1, 3)),
        ]);
    }
}
