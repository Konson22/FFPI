<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ModulesController extends Controller
{
    /**
     * Get all available modules.
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $modules = Module::with(['lessons'])->get()->map(function($module) {
                return [
                    'id' => $module->id,
                    'order' => $module->order,
                    'featured' => $module->featured,
                    'title' => $module->title,
                    'description' => $module->description,
                    'lessons_count' => $module->lessons->count(),
                    'created_at' => $module->created_at,
                    'updated_at' => $module->updated_at,
                ];
            });

        $categories = $this->getCategories();
        
        return response()->json([
            'success' => true,
            'modules' => $modules,
            'categories' => $categories,
        ], 200);
    }

    /**
     * Browse all available modules (with optional filtering).
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function browse()
    {
        $modules = Module::active()
            ->ordered()
            ->get();
        
        $categories = $this->getCategories();
        
        return response()->json([
            'success' => true,
            'data' => [
                'modules' => $modules,
                'categories' => $categories,
            ]
        ], 200);
    }

    /**
     * Get a specific module.
     * 
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $module = Module::with(['lessons'])
            ->findOrFail($id);
        
        return response()->json([
            'success' => true,
            'module' => $module,
        ], 200);
    }

    /**
     * Get available categories for modules.
     * 
     * @return array
     */
    private function getCategories()
    {
        return [
            ['id' => 'all', 'name' => 'All Topics', 'icon' => '📚'],
            ['id' => 'sexual-health', 'name' => 'Sexual Health', 'icon' => '❤️'],
            ['id' => 'family-planning', 'name' => 'Family Planning', 'icon' => '👶'],
            ['id' => 'relationships', 'name' => 'Relationships', 'icon' => '💕'],
            ['id' => 'reproductive-rights', 'name' => 'Reproductive Rights', 'icon' => '✊'],
            ['id' => 'contraception', 'name' => 'Contraception', 'icon' => '💊'],
            ['id' => 'pregnancy', 'name' => 'Pregnancy', 'icon' => '🤱'],
            ['id' => 'sti-prevention', 'name' => 'STI Prevention', 'icon' => '🛡️'],
            ['id' => 'consent', 'name' => 'Consent', 'icon' => '✋'],
            ['id' => 'mental-health', 'name' => 'Mental Health', 'icon' => '🧠']
        ];
    }
}

