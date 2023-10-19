<?php

namespace Database\Seeders;

use App\Models\News;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class NewsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        // Assuming category IDs for your 5 categories are 1 to 5
        $categoryIds = range(1, 7);
        $reporterId = 1; // As
        $imgUrl = 'https://via.placeholder.com/400x400';

        foreach ($categoryIds as $categoryId) {
            for ($i = 0; $i < 50; $i++) { // Adjust the number of entries as needed
                News::create([
                    'title' => $faker->sentence(3),
                    'img' => $imgUrl,
                    'location' => $faker->city,
                    'description' => $faker->paragraph(5),
                    'category_id' => $categoryId,
                    'reporter_id' => $reporterId,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}