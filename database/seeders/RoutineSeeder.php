<?php

namespace Database\Seeders;

use App\Models\Routine;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoutineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Routine::factory(12)->create();
    }
}
