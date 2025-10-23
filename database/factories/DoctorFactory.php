<?php

namespace Database\Factories;

use App\Models\Doctor;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Doctor>
 */
class DoctorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $specializations = [
            'Obstetrics and Gynecology',
            'Pediatrics',
            'Family Medicine',
            'Internal Medicine',
            'Cardiology',
            'Dermatology',
            'Psychiatry',
            'Orthopedics',
            'Neurology',
            'Endocrinology',
            'Urology',
            'Ophthalmology',
            'Radiology',
            'Anesthesiology',
            'Emergency Medicine'
        ];

        $workingHours = [
            'monday' => ['09:00', '17:00'],
            'tuesday' => ['09:00', '17:00'],
            'wednesday' => ['09:00', '17:00'],
            'thursday' => ['09:00', '17:00'],
            'friday' => ['09:00', '17:00'],
            'saturday' => ['10:00', '14:00'],
            'sunday' => ['closed']
        ];

        $certifications = [
            ['name' => 'Board Certification in ' . $this->faker->randomElement($specializations), 'year' => $this->faker->numberBetween(2015, 2023)],
            ['name' => 'Advanced Life Support (ALS)', 'year' => $this->faker->numberBetween(2018, 2023)],
            ['name' => 'Basic Life Support (BLS)', 'year' => $this->faker->numberBetween(2019, 2023)],
            ['name' => 'Neonatal Resuscitation Program (NRP)', 'year' => $this->faker->numberBetween(2020, 2023)]
        ];

        $awards = [
            ['title' => 'Best Doctor Award ' . $this->faker->year(), 'organization' => 'Medical Association', 'year' => $this->faker->numberBetween(2020, 2023)],
            ['title' => 'Excellence in Patient Care', 'organization' => 'Healthcare Excellence', 'year' => $this->faker->numberBetween(2021, 2023)],
            ['title' => 'Outstanding Service Award', 'organization' => 'Hospital Board', 'year' => $this->faker->numberBetween(2022, 2023)]
        ];

        $clinicNames = [
            'Green Health Clinic', 'Family Care Center', 'Wellness Medical Center',
            'Health Plus Clinic', 'CareFirst Medical', 'Prime Health Center',
            'Family Planning Clinic', 'Women\'s Health Center', 'Community Medical'
        ];

        return [
            'user_id' => User::factory()->expert(),
            'doctor_name' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'email' => $this->faker->unique()->safeEmail(),
            'specialization' => $this->faker->randomElement($specializations),
            'bio' => $this->faker->paragraphs(rand(2, 4), true),
            'license_number' => 'DR-' . $this->faker->unique()->numberBetween(100000, 999999),
            'years_of_experience' => $this->faker->numberBetween(1, 30),
            'working_hours' => $workingHours,
            'is_available' => $this->faker->boolean(85),
            'status' => $this->faker->randomElement(['active', 'inactive', 'suspended']),
            'clinic_name' => $this->faker->randomElement($clinicNames),
            'clinic_address' => $this->faker->address(),
            'latitude' => $this->faker->latitude(-90, 90),
            'longitude' => $this->faker->longitude(-180, 180),
            'certifications' => $this->faker->randomElements($certifications, rand(1, 3)),
            'awards' => $this->faker->randomElements($awards, rand(0, 2)),
            'accepts_online_consultation' => $this->faker->boolean(70),
            'accepts_emergency_calls' => $this->faker->boolean(60),
            'profile_picture' => $this->faker->optional(0.8)->imageUrl(400, 400, 'people'),
            'is_verified' => $this->faker->boolean(80),
            'verified_at' => $this->faker->optional(0.8)->dateTimeBetween('-2 years', 'now'),
            'average_rating' => $this->faker->randomFloat(1, 3.0, 5.0),
            'total_reviews' => $this->faker->numberBetween(0, 200),
        ];
    }

    /**
     * Indicate that the doctor is available.
     */
    public function available(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_available' => true,
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the doctor is unavailable.
     */
    public function unavailable(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_available' => false,
            'status' => $this->faker->randomElement(['inactive', 'suspended']),
        ]);
    }

    /**
     * Indicate that the doctor is verified.
     */
    public function verified(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_verified' => true,
            'verified_at' => $this->faker->dateTimeBetween('-2 years', 'now'),
        ]);
    }

    /**
     * Indicate that the doctor accepts online consultations.
     */
    public function acceptsOnline(): static
    {
        return $this->state(fn (array $attributes) => [
            'accepts_online_consultation' => true,
        ]);
    }

    /**
     * Indicate that the doctor accepts emergency calls.
     */
    public function acceptsEmergency(): static
    {
        return $this->state(fn (array $attributes) => [
            'accepts_emergency_calls' => true,
        ]);
    }

    /**
     * Indicate that the doctor specializes in family planning.
     */
    public function familyPlanning(): static
    {
        return $this->state(fn (array $attributes) => [
            'specialization' => 'Obstetrics and Gynecology',
            'accepts_online_consultation' => true,
            'accepts_emergency_calls' => true,
        ]);
    }

    /**
     * Indicate that the doctor has high ratings.
     */
    public function highlyRated(): static
    {
        return $this->state(fn (array $attributes) => [
            'average_rating' => $this->faker->randomFloat(1, 4.5, 5.0),
            'total_reviews' => $this->faker->numberBetween(50, 200),
        ]);
    }
}
