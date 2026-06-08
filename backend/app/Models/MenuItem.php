<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'name',
        'category',
        'sub_category',
        'ingredients',
        'base',
        'price',
        'price_senior',
        'price_mega',
        'price_super_mega',
        'available',
    ];

    protected $casts = [
        'ingredients' => 'array',
        'available' => 'boolean',
    ];
}