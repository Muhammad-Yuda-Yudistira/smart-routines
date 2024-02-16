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

        $urlSimbol = '/assets/icons/simbol/';
        // 10 categories
        Category::create([
            'name' => 'Main',
            'explanation' => 'Profession / Study',
            'simbol' => $urlSimbol . 'main.svg'
        ]);
        Category::create([
            'name' => 'Hobby',
            'simbol' => $urlSimbol . 'hobby.svg',
        ]);
        Category::create([
            'name' => 'Healty',
            'explanation' => 'Diet & Workout',
            'simbol' => $urlSimbol . 'healty.svg'
        ]);
        Category::create([
            'name' => 'Skincare',
            'simbol' => $urlSimbol . 'skincare.svg'
        ]);
        Category::create([
            'name' => 'Financial',
            'explanation' => 'Tabungan, Investasi',
            'simbol' => $urlSimbol . 'financial.svg'
        ]);
        Category::create([
            'name' => 'Science',
            'simbol' => $urlSimbol . 'science.svg'
        ]);
        Category::create([
            'name' => 'Art',
            'simbol' => $urlSimbol . 'art.svg'
        ]);
        Category::create([
            'name' => 'Spiritual',
            'simbol' => $urlSimbol . 'spiritual.svg'
        ]);
        Category::create([
            'name' => 'Psychology',
            'simbol' => $urlSimbol . 'psychology.svg'
        ]);
        Category::create([
            'name' => 'Social',
            'simbol' => $urlSimbol . 'social.svg'
        ]);
    }
}
