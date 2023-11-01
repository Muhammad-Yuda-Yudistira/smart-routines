<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Routine>
 */
class RoutineFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $start_time = fake()->time();

        // konver ke menit dan tambahkan 1 jam
        $timeInSeconds = strtotime($start_time) - strtotime('00:00');
        $inMinute = $timeInSeconds / 60;
        $addOneHour = $inMinute + 60;

        // ubah kembali ke time
        $hours = floor($addOneHour / 60);
        $minutes = $addOneHour % 60;
        $end_time = sprintf("%02d:%02d", $hours, $minutes);

        return [
            'title' => fake()->sentence(),
            'description' => fake()->paragraph(),
            'category_id' => mt_rand(1, 11),
            'user_id' => mt_rand(1, 3),
            'start_time' => $start_time,
            'end_time' => $end_time,
            'days' => json_encode(fake()->words(mt_rand(1, 7))),
        ];
    }
}
