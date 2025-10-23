<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TopicCategory>
 */
class TopicCategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->randomElement([
            'Family Planning', 'Pregnancy & Birth', 'Contraception', 'Fertility',
            'Women\'s Health', 'Men\'s Health', 'Sexual Health', 'Mental Health',
            'Nutrition & Wellness', 'Relationships', 'Parenting', 'General Health'
        ]);

        return [
            'parent_id' => null,
            'name' => $name,
            'slug' => \Str::slug($name),
            'description' => $this->faker->paragraph(3),
            'icon' => $this->faker->randomElement([
                'fas fa-heart', 'fas fa-baby', 'fas fa-pills', 'fas fa-seedling',
                'fas fa-female', 'fas fa-male', 'fas fa-heartbeat', 'fas fa-brain',
                'fas fa-apple-alt', 'fas fa-users', 'fas fa-child', 'fas fa-stethoscope'
            ]),
            'color' => $this->faker->randomElement([
                '#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444',
                '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
            ]),
            'image' => null,
            'is_active' => true,
            'is_featured' => $this->faker->boolean(30),
            'sort_order' => $this->faker->numberBetween(0, 100),
            'posting_permission' => $this->faker->randomElement(['all', 'verified_users', 'doctors_only']),
            'require_approval' => $this->faker->boolean(20),
            'allow_anonymous' => $this->faker->boolean(40),
            'topics_count' => 0,
            'comments_count' => 0,
            'followers_count' => 0,
            'meta_description' => $this->faker->sentence(15),
            'meta_keywords' => $this->faker->words(5),
        ];
    }

    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
            'sort_order' => $this->faker->numberBetween(0, 10),
        ]);
    }

    public function doctorsOnly(): static
    {
        return $this->state(fn (array $attributes) => [
            'posting_permission' => 'doctors_only',
            'require_approval' => false,
        ]);
    }

    public function withParent(): static
    {
        return $this->state(fn (array $attributes) => [
            'parent_id' => \App\Models\TopicCategory::factory(),
        ]);
    }
}
