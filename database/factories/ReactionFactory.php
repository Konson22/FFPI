<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reaction>
 */
class ReactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reactableType = $this->faker->randomElement(['App\Models\Topic', 'App\Models\Comment']);
        
        return [
            'user_id' => \App\Models\User::factory(),
            'reactable_type' => $reactableType,
            'reactable_id' => $reactableType::factory(),
            'type' => $this->faker->randomElement([
                'like', 'dislike', 'love', 'laugh', 'wow', 'sad', 'angry',
                'helpful', 'not_helpful', 'agree', 'disagree', 'support',
                'celebrate', 'insightful', 'confused', 'expert_verified'
            ]),
            'note' => $this->faker->optional(0.1)->sentence(),
            'is_anonymous' => $this->faker->boolean(5),
            'ip_address' => $this->faker->ipv4(),
            'user_agent' => $this->faker->userAgent(),
            'is_expert_reaction' => $this->faker->boolean(10),
            'expertise_level' => $this->faker->optional(0.15)->randomElement(['beginner', 'intermediate', 'advanced', 'expert']),
        ];
    }

    public function like(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'like',
        ]);
    }

    public function dislike(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'dislike',
        ]);
    }

    public function love(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'love',
        ]);
    }

    public function helpful(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'helpful',
        ]);
    }

    public function expertVerified(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'expert_verified',
            'is_expert_reaction' => true,
            'expertise_level' => $this->faker->randomElement(['advanced', 'expert']),
            'user_id' => \App\Models\User::where('role', 'expert')->inRandomOrder()->first()?->id ?? \App\Models\User::factory(),
        ]);
    }

    public function expertReaction(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_expert_reaction' => true,
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

    public function withNote(): static
    {
        return $this->state(fn (array $attributes) => [
            'note' => $this->faker->sentence(),
        ]);
    }

    public function positive(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => $this->faker->randomElement([
                'like', 'love', 'helpful', 'agree', 'support', 'celebrate', 'insightful'
            ]),
        ]);
    }

    public function negative(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => $this->faker->randomElement([
                'dislike', 'not_helpful', 'disagree', 'angry', 'confused'
            ]),
        ]);
    }
}
