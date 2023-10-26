<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoutineModel>
 */
class RoutineModelFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'category_id' => mt_rand(1, 11),
            'user_id' => mt_rand(1, 3),
            'start_time' => fake()->time(),
            'end_time' => fake()->time(),
            'days' => json_encode(fake()->words(mt_rand(1, 7))),
        ];
    }
}
