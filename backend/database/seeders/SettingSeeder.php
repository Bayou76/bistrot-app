<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            ['key' => 'promo_active', 'value' => 'true'],
            ['key' => 'promo_text', 'value' => '🎉 1 PIZZA ACHETÉE = 1 PIZZA OFFERTE - À emporter uniquement!'],
            ['key' => 'welcome_title', 'value' => 'Bienvenue au Bistrot des Hauts'],
            ['key' => 'welcome_subtitle', 'value' => 'Pizza artisanale, snack et café à Rouen'],
            ['key' => 'address', 'value' => '6 bis rue François Couperin, 76000 Rouen'],
            ['key' => 'phone', 'value' => '02 78 81 80 83'],
            ['key' => 'hours_lundi', 'value' => 'Fermé'],
            ['key' => 'hours_mardi_jeudi', 'value' => '11h-15h & 18h-22h30'],
            ['key' => 'hours_vendredi_samedi', 'value' => '11h-15h & 18h-23h'],
            ['key' => 'hours_dimanche', 'value' => '11h-15h & 18h-22h30'],
        ];

        foreach ($settings as $setting) {
            DB::table('settings')->insert([
                'key' => $setting['key'],
                'value' => $setting['value'],
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}