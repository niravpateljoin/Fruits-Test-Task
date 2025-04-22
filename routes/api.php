<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\FruitController;

Route::get('/ping', function () {
    return response()->json(['message' => 'API is working ✅']);
});

Route::get('/fruits', [FruitController::class, 'index']);
