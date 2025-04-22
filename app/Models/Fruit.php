<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Fruit extends Model
{
    protected $fillable = ['name', 'family', 'genus', 'order', 'nutritions'];

    protected $casts = [
        'nutritions' => 'array',
    ];
}
