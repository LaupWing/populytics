<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'title' => 'DIY Participation Toolkit',
                'description' => 'Complete kit for schools and organizations to run their own citizen participation workshops. Includes facilitator guide, worksheets, and interactive exercises.',
                'price' => 89.00,
                'image_url' => 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
            ],
            [
                'title' => 'Policy Making Board Game',
                'description' => 'An engaging board game that teaches players about trade-offs in policy decisions. Perfect for classrooms, team buildings, and civic education.',
                'price' => 49.00,
                'image_url' => 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=400&h=300&fit=crop',
            ],
        ];

        foreach ($products as $product) {
            Product::firstOrCreate(
                ['title' => $product['title']],
                $product
            );
        }
    }
}
