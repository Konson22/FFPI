<?php

namespace App\Http\Controllers\Lms;

use App\Http\Controllers\Controller;
use App\Models\ModuleCategory;
use Illuminate\Http\JsonResponse;

class CategoryController extends Controller
{
    public function index(): JsonResponse
    {
        $categories = ModuleCategory::orderBy('order')->get()->map(function ($category) {
            return [
                'id' => $category->id,
                'name' => $category->name,
                'description' => $category->description,
                'slug' => $category->slug,
                'icon' => $category->icon,
                'order' => $category->order,
            ];
        });
        
        return response()->json($categories);
    }
    
    public function show($id): JsonResponse
    {
        $category = ModuleCategory::findOrFail($id);
        
        return response()->json([
            'id' => $category->id,
            'name' => $category->name,
            'description' => $category->description,
            'slug' => $category->slug,
            'icon' => $category->icon,
            'order' => $category->order,
        ]);
    }
}

