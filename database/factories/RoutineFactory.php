<?php

namespace Database\Factories;

use App\Models\User;
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
    if($hours >= 24)
    {
      $minutes = 0;
    }
    $end_time = sprintf("%02d:%02d", $hours, $minutes);

    $users = User::all();
    $userIds = $users->map(function ($user) {
      return $user->id;
    });

    $randomDays = collect(range(1, 7))->random(mt_rand(1, 3))->map(function ($day) {
      return fake()->dayOfWeek('1 week');
    })->toArray();

    return [
      'title' => fake()->sentence(),
      'description' => fake()->paragraph(),
      'category_id' => mt_rand(1, 10),
      'user_id' => $userIds->random(),
      'start_time' => $start_time,
      'end_time' => $end_time,
      'days' => json_encode($randomDays),
    ];
  }
}
