<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Fruit;
use App\Mail\FruitsFetched;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class FetchFruits extends Command
{
    protected $signature = 'fruits:fetch';
    protected $description = 'Fetch all fruits from API and save to database';

    public function handle()
    {
        $this->info('Fetching fruits...');

        $response = Http::get('https://fruityvice.com/api/fruit/all');

        if ($response->successful()) {
            $fruits = $response->json();
            $totalFruits = 0;

            foreach ($fruits as $fruitData) {
                Fruit::updateOrCreate(
                    ['name' => $fruitData['name']],
                    [
                        'family' => $fruitData['family'],
                        'genus' => $fruitData['genus'],
                        'order' => $fruitData['order'],
                        'nutritions' => json_encode($fruitData['nutritions']),
                    ]
                );
                $totalFruits++;
            }

            Mail::to('test@gmail.com')->send(new FruitsFetched($totalFruits));

            $this->info('Fruits saved and email sent!');
        } else {
            $this->error('Failed to fetch fruits.');
        }
    }
}
