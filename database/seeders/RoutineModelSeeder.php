<?php

namespace Database\Seeders;

use App\Models\RoutineModel;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoutineModelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RoutineModel::factory(12)->create();
    }
}
