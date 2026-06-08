<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MenuItemSeeder extends Seeder
{
    public function run(): void
    {
        $pizzas = [
            ['name' => 'Classique', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Jambon']), 'base' => 'tomate'],
            ['name' => 'Méditerranéenne', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Anchois', 'Olives']), 'base' => 'tomate'],
            ['name' => 'Thonata', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Thon', 'Champignons', 'Oeuf']), 'base' => 'tomate'],
            ['name' => 'Fermière', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Jambon', 'Champignons', 'Olives']), 'base' => 'tomate'],
            ['name' => 'Bolognaise', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Viande hachée', 'Oignons', 'Poivrons']), 'base' => 'tomate'],
            ['name' => '4 fromages', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Bleu', 'Chèvre', 'Emmental']), 'base' => 'tomate'],
            ['name' => 'Orientale', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Merguez', 'Oeuf', 'Champignons']), 'base' => 'tomate'],
            ['name' => 'Végétarienne', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Pommes de terre', 'Poivrons', 'Olives']), 'base' => 'tomate'],
            ['name' => 'Calzone', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Crème fraîche', 'Champignons', 'Oeuf']), 'base' => 'tomate'],
            ['name' => 'Soufiya', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Chorizo', 'Merguez', 'Oeuf']), 'base' => 'tomate'],
            ['name' => 'Maxi', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Viande hachée', 'Merguez', 'Oeuf']), 'base' => 'tomate'],
            ['name' => 'Buffalo', 'ingredients' => json_encode(['Sauce barbecue', 'Mozzarella', 'Viande hachée épicée', 'Oignons']), 'base' => 'tomate'],
            ['name' => 'Américaine', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Viande hachée', 'Frites', 'Oeuf']), 'base' => 'tomate'],
            ['name' => 'Reine', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Jambon', 'Lardons', 'Crème fraîche']), 'base' => 'tomate'],
            ['name' => 'Raclette', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Jambon', 'Pommes de terre', 'Raclette']), 'base' => 'tomate'],
            ['name' => 'Suprême', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Viande hachée', 'Pepperoni', 'Oignons']), 'base' => 'tomate'],
            ['name' => 'Mexicaine', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Tabasco', 'Viande hachée', 'Chorizo']), 'base' => 'tomate'],
            ['name' => 'Fruits de mer', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Cocktail de fruits de mer', 'Olives']), 'base' => 'tomate'],
            ['name' => 'Extravagante', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Jambon', 'Viande hachée', 'Merguez']), 'base' => 'tomate'],
            ['name' => 'Cheddar', 'ingredients' => json_encode(['Tomate', 'Mozzarella', 'Viande hachée', 'Cheddar']), 'base' => 'tomate'],
            ['name' => 'Chèvre', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Chèvre', 'Pommes de terre', 'Olives']), 'base' => 'crème fraîche'],
            ['name' => 'Chicken', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Poulet fumé', 'Pommes de terre']), 'base' => 'crème fraîche'],
            ['name' => 'Savoyarde', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Jambon', 'Pommes de terre']), 'base' => 'crème fraîche'],
            ['name' => 'Tartiflette', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Lardons', 'Pommes de terre', 'Reblochon']), 'base' => 'crème fraîche'],
            ['name' => 'Saumona', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Saumon fumé', 'Citron']), 'base' => 'crème fraîche'],
            ['name' => 'La Kebab', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Tomate fraîche', 'Viande kebab']), 'base' => 'crème fraîche'],
            ['name' => 'Mieleuse', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Poulet', 'Chèvre', 'Miel']), 'base' => 'crème fraîche'],
            ['name' => 'Chicken Tikka', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Chicken Tikka', 'Pommes de terre', 'Oeuf']), 'base' => 'crème fraîche'],
            ['name' => 'Paysanne', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Jambon', 'Camembert', 'Champignons', 'Persillade']), 'base' => 'crème fraîche'],
            ['name' => 'Délicieuse', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Thon', 'Chèvre', 'Oignons', 'Persillade']), 'base' => 'crème fraîche'],
            ['name' => 'Gourmande', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Poulet', 'Jambon', 'Pommes de terre', 'Oignons', 'Persillade']), 'base' => 'crème fraîche'],
            ['name' => 'Montagnarde', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Viande hachée', 'Bleu', 'Chèvre', 'Oeuf', 'Persillade']), 'base' => 'crème fraîche'],
            ['name' => 'Western', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Blanc de poulet', 'Poivrons', 'Champignons']), 'base' => 'crème fraîche'],
            ['name' => 'Boursin', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Viande hachée', 'Boursin']), 'base' => 'crème fraîche'],
            ['name' => 'Andalouse', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Sauce andalouse', 'Poulet tikka', 'Viande hachée', 'Poivrons']), 'base' => 'crème fraîche'],
            ['name' => 'Biggy Burger', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Cheddar', 'Sauce Biggy', 'Viande hachée', 'Oignon', 'Oeuf']), 'base' => 'crème fraîche'],
            ['name' => 'La Curry', 'ingredients' => json_encode(['Crème fraîche', 'Mozzarella', 'Sauce curry', 'Poulet tikka', 'Pommes de terre', 'Cheddar']), 'base' => 'crème fraîche'],
        ];

        foreach ($pizzas as $pizza) {
            DB::table('menu_items')->insert([
                'name' => $pizza['name'],
                'category' => 'pizzas',
                'ingredients' => $pizza['ingredients'],
                'base' => $pizza['base'],
                'price_senior' => 17,
                'price_mega' => 23,
                'price_super_mega' => 30,
                'available' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }

        $others = [
            // TACOS
            ['category' => 'tacos', 'sub_category' => null, 'name' => 'Tacos 1 Viande', 'ingredients' => ['1 Viande', 'Frites', 'Sauce'], 'price' => 7],
            ['category' => 'tacos', 'sub_category' => null, 'name' => 'Tacos 2 Viandes', 'ingredients' => ['2 Viandes', 'Frites', 'Sauce'], 'price' => 8],
            ['category' => 'tacos', 'sub_category' => null, 'name' => 'Tacos 3 Viandes', 'ingredients' => ['3 Viandes', 'Frites', 'Sauce'], 'price' => 9.5],

            // BURGERS
            ['category' => 'burgers', 'sub_category' => 'Boeuf', 'name' => 'Cheese Burger', 'ingredients' => ['Steak 45g', 'Cornichons', 'Cheddar'], 'price' => 4.5],
            ['category' => 'burgers', 'sub_category' => 'Boeuf', 'name' => 'Double Cheese', 'ingredients' => ['2 Steaks 45g', 'Cornichons', 'Cheddar'], 'price' => 5.5],
            ['category' => 'burgers', 'sub_category' => 'Boeuf', 'name' => 'Burger Normand', 'ingredients' => ['Steak 80g', 'Camembert', 'Cheddar'], 'price' => 7],
            ['category' => 'burgers', 'sub_category' => 'Poulet', 'name' => 'Chicken Burger', 'ingredients' => ['Poulet pané', 'Cornichons', 'Cheddar'], 'price' => 6],

            // SANDWICHS
            ['category' => 'sandwichs', 'sub_category' => 'Boeuf', 'name' => 'Américain x2', 'ingredients' => ['2 Steaks', 'Fromage', 'Crudités'], 'price' => 5.5],
            ['category' => 'sandwichs', 'sub_category' => 'Boeuf', 'name' => 'Américain x3', 'ingredients' => ['3 Steaks', 'Fromage', 'Crudités'], 'price' => 6.5],
            ['category' => 'sandwichs', 'sub_category' => 'Boeuf', 'name' => 'Cordon Bleu', 'ingredients' => ['Cordon Bleu', 'Fromage', 'Crudités'], 'price' => 6],
            ['category' => 'sandwichs', 'sub_category' => 'Boeuf', 'name' => 'Kefta', 'ingredients' => ['Kefta', 'Fromage', 'Crudités'], 'price' => 6.5],
            ['category' => 'sandwichs', 'sub_category' => 'Boeuf', 'name' => 'Merguez', 'ingredients' => ['Merguez', 'Fromage', 'Crudités'], 'price' => 6],
            ['category' => 'sandwichs', 'sub_category' => 'Poulet', 'name' => 'Chicken', 'ingredients' => ['Poulet', 'Curry ou Tandoori', 'Fromage', 'Crudités'], 'price' => 6.5],
            ['category' => 'sandwichs', 'sub_category' => 'Spécial', 'name' => 'Gourmand', 'ingredients' => ['Escalope', 'Boursin', 'Fromage', 'Crudités'], 'price' => 6.5],
            ['category' => 'sandwichs', 'sub_category' => 'Spécial', 'name' => 'Royal', 'ingredients' => ['2 Viandes au choix', 'Fromage', 'Crudités'], 'price' => 7],

            // TEX MEX
            ['category' => 'texmex', 'sub_category' => 'Poulet', 'name' => 'Tenders', 'ingredients' => ['6 Pièces'], 'price' => 7],
            ['category' => 'texmex', 'sub_category' => 'Poulet', 'name' => 'Chicken Wings', 'ingredients' => ['6 Pièces'], 'price' => 6],
            ['category' => 'texmex', 'sub_category' => 'Fromage', 'name' => 'Mozza Sticks', 'ingredients' => ['8 Pièces'], 'price' => 6],
            ['category' => 'texmex', 'sub_category' => 'Fromage', 'name' => 'Camembert Balls', 'ingredients' => ['8 Pièces'], 'price' => 6],
            ['category' => 'texmex', 'sub_category' => 'Légumes', 'name' => 'Onion Rings', 'ingredients' => ['10 Pièces'], 'price' => 6],
            ['category' => 'texmex', 'sub_category' => 'Légumes', 'name' => 'Jalapeños', 'ingredients' => ['8 Pièces'], 'price' => 6],
            ['category' => 'texmex', 'sub_category' => 'Divers', 'name' => 'Nuggets', 'ingredients' => ['8 Pièces'], 'price' => 6],

            // PANINIS
            ['category' => 'paninis', 'sub_category' => 'Fromage', 'name' => 'Panini 3 Fromages', 'ingredients' => ['Fromages'], 'price' => 5.5],
            ['category' => 'paninis', 'sub_category' => 'Poisson', 'name' => 'Panini Saumon', 'ingredients' => ['Saumon', 'Fromage'], 'price' => 6.5],
            ['category' => 'paninis', 'sub_category' => 'Viande', 'name' => 'Panini Steak', 'ingredients' => ['Steak', 'Fromage'], 'price' => 6.5],
            ['category' => 'paninis', 'sub_category' => 'Viande', 'name' => 'Panini Jambon', 'ingredients' => ['Jambon', 'Fromage'], 'price' => 6.5],

            // MENU ENFANT
            ['category' => 'menuenfant', 'sub_category' => null, 'name' => 'Menu Enfant', 'ingredients' => ['6 Nuggets ou 1 Cheese Burger', 'Frites', 'Compote', 'Boisson'], 'price' => 6.30],
            
            // DESSERTS
            ['category' => 'desserts', 'sub_category' => 'Maison', 'name' => 'Tiramisu Maison', 'ingredients' => ['Oreo', 'Speculoos', 'Café'], 'price' => 4.5],
            ['category' => 'desserts', 'sub_category' => 'Maison', 'name' => 'Calzone Sucrée', 'ingredients' => ['Nutella', 'Banane', 'Brownie'], 'price' => 6.5],
            ['category' => 'desserts', 'sub_category' => 'Gâteaux', 'name' => 'Brownie', 'ingredients' => [], 'price' => 3],
            ['category' => 'desserts', 'sub_category' => 'Gâteaux', 'name' => 'Tartes', 'ingredients' => ['Daims', 'Snickers'], 'price' => 3],
            ['category' => 'desserts', 'sub_category' => 'Glaces', 'name' => 'Glaces 100ml', 'ingredients' => [], 'price' => 3.5],
            ['category' => 'desserts', 'sub_category' => 'Glaces', 'name' => 'Glaces 500ml', 'ingredients' => [], 'price' => 7.5],

            // BOISSONS
            ['category' => 'boissons', 'sub_category' => 'Canettes', 'name' => 'Canette 33cl', 'ingredients' => ['Coca', 'Fanta', 'Oasis'], 'price' => 1.2],
            ['category' => 'boissons', 'sub_category' => 'Bouteilles', 'name' => 'Bouteille 1.5L', 'ingredients' => ['Coca', 'Fanta', 'Oasis'], 'price' => 3],
            ['category' => 'boissons', 'sub_category' => 'Bouteilles', 'name' => 'Bouteille 2L', 'ingredients' => [], 'price' => 3.5],
        ];

        foreach ($others as $item) {
            DB::table('menu_items')->insert([
                'name' => $item['name'],
                'category' => $item['category'],
                'sub_category' => $item['sub_category'],
                'ingredients' => json_encode($item['ingredients']),
                'base' => null,
                'price' => $item['price'],
                'available' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}