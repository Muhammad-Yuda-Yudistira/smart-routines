<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Resolution;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resolution>
 */
class ResolutionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = ['Obligation', 'Lifestyle'];
        $period = ['Weekly', 'Monthly', 'Yearly'];
        return [
            'title' => fake()->sentence(),
            'type' => $type[mt_rand(1,2) - 1],
            'period' => $period[mt_rand(1,3) - 1],
            'category_id' => mt_rand(1,11),
            'goal' => fake()->sentence(mt_rand(10,20)),
            'description' => fake()->paragraph(mt_rand(3,10)),
            'image' => 'htpps:\\source.unsplash.com/300x300'
        ];
    }
    public function configure()
    {
        return $this->afterCreating(function (Resolution $resolution) {
            // Logika setelah menciptakan Resolusi, termasuk menambahkan user_id
            $user = User::inRandomOrder()->first();
            $resolution->user_id = $user->id;
            $resolution->save();
        });
    }
}
