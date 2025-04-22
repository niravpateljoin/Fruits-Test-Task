<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Fruit;
use Illuminate\Http\Request;

class FruitController extends Controller
{
    public function index(Request $request)
    {
        
        $query = Fruit::query();

        if ($request->filled('name')) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }
    
        if ($request->filled('family')) {
            $query->where('family', 'like', '%' . $request->family . '%');
        }
    
        return $query->paginate(10);
    }
}
