<?php

namespace Database\Factories;

use App\Models\HealthLog;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\HealthLog>
 */
class HealthLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $moods = ['excellent', 'good', 'fair', 'poor', 'terrible'];
        $energyLevels = ['high', 'medium', 'low', 'very low'];
        $activities = ['walking', 'running', 'cycling', 'swimming', 'yoga', 'gym', 'dancing', 'hiking', 'rest'];

        return [
            'user_id' => User::factory(),
            'date' => $this->faker->dateTimeBetween('-30 days', 'now'),
            'mood' => $this->faker->randomElement($moods),
            'energy' => $this->faker->randomElement($energyLevels),
            'sleep_hours' => $this->faker->randomFloat(2, 4, 12),
            'activity' => $this->faker->randomElement($activities),
            'notes' => $this->faker->optional(0.7)->paragraph(2),
        ];
    }

    /**
     * Indicate that the health log is for today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => now()->toDateString(),
        ]);
    }

    /**
     * Indicate that the health log is for yesterday.
     */
    public function yesterday(): static
    {
        return $this->state(fn (array $attributes) => [
            'date' => now()->subDay()->toDateString(),
        ]);
    }

    /**
     * Indicate that the health log has excellent mood and energy.
     */
    public function excellent(): static
    {
        return $this->state(fn (array $attributes) => [
            'mood' => 'excellent',
            'energy' => 'high',
            'sleep_hours' => $this->faker->randomFloat(2, 7, 9),
        ]);
    }

    /**
     * Indicate that the health log has poor mood and energy.
     */
    public function poor(): static
    {
        return $this->state(fn (array $attributes) => [
            'mood' => 'poor',
            'energy' => 'low',
            'sleep_hours' => $this->faker->randomFloat(2, 4, 6),
        ]);
    }

    /**
     * Indicate that the health log has good sleep.
     */
    public function goodSleep(): static
    {
        return $this->state(fn (array $attributes) => [
            'sleep_hours' => $this->faker->randomFloat(2, 7, 9),
        ]);
    }

    /**
     * Indicate that the health log has poor sleep.
     */
    public function poorSleep(): static
    {
        return $this->state(fn (array $attributes) => [
            'sleep_hours' => $this->faker->randomFloat(2, 3, 5),
        ]);
    }
}
