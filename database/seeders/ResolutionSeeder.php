<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Resolution;
use App\Models\User;

class ResolutionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Resolution::factory()->count(12)->configure()->create();

        // Resolution::create([
        //     'title' => 'Resolusi 2024',
        //     'type' => 'Obligation',
        //     'period' => 'Yearly',
        //     'category_id' => 3,
        //     'goal' => 'Jadi fullstack dari PM sampai Digital marketing bisa',
        //     'description' => 'Mulai dari pembuatan brand, desain, coding, deploy, maintenance, SEO, security, digital marketing. dan bisa koding desktop, apk untuk multi-platform.',
        //     'user_id' => 23,
        //     'image' => 'htpps:\\source.unsplash.com/300x300',
        // ]);
    }
}
