<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Category::factory(11)->create();

        // 10 categories
        Category::create([
            'name' => 'Profession / Study',
        ]);
        Category::create([
            'name' => 'Hobby',
        ]);
        Category::create([
            'name' => 'Healty (Diet & Workout)',
        ]);
        Category::create([
            'name' => 'Skincare',
        ]);
        Category::create([
            'name' => 'Financial (Tabungan, Investasi)',
        ]);
        Category::create([
            'name' => 'Science',
        ]);
        Category::create([
            'name' => 'Art',
        ]);
        Category::create([
            'name' => 'Spiritual',
        ]);
        Category::create([
            'name' => 'Psychology',
        ]);
        Category::create([
            'name' => 'Social',
        ]);
    }
}
