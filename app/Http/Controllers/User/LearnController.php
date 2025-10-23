<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class LearnController extends Controller
{
    /**
     * Display the learn hub page with modules and lessons.
     */
    public function index()
    {
        $user = Auth::user();
        
        // Fetch modules with their lessons
        $modules = Module::with('lessons')
            ->orderBy('id')
            ->get();
        
        // Get categories from modules
        $categories = Module::select('category')
            ->distinct()
            ->pluck('category')
            ->filter()
            ->map(function ($category) {
                return [
                    'id' => strtolower(str_replace(' ', '-', $category)),
                    'name' => $category,
                    'icon' => $this->getCategoryIcon($category)
                ];
            })
            ->prepend(['id' => 'all', 'name' => 'All Topics', 'icon' => '📚'])
            ->values();
        
        // Get target audiences from modules
        $audiences = Module::get()
            ->pluck('target_audience')
            ->flatten()
            ->unique()
            ->filter()
            ->map(function ($audience) {
                return [
                    'id' => $audience,
                    'name' => ucfirst($audience)
                ];
            })
            ->prepend(['id' => 'all', 'name' => 'All Audiences'])
            ->values();
        
        return Inertia::render('user/learn/index', [
            'user' => $user,
            'modules' => $modules,
            'categories' => $categories,
            'audiences' => $audiences
        ]);
    }
    
    /**
     * Display a specific module with its lessons.
     */
    public function show($id)
    {
        $user = Auth::user();
        
        $module = Module::with('lessons')
            ->findOrFail($id);
        
        return Inertia::render('user/learn/module', [
            'user' => $user,
            'module' => $module
        ]);
    }
    
    /**
     * Display a specific lesson.
     */
    public function lesson($moduleId, $lessonId)
    {
        $user = Auth::user();
        
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::where('module_id', $moduleId)
            ->findOrFail($lessonId);
        
        return Inertia::render('user/learn/lesson', [
            'user' => $user,
            'module' => $module,
            'lesson' => $lesson
        ]);
    }
    
    /**
     * Get icon for category.
     */
    private function getCategoryIcon($category)
    {
        $icons = [
            'Sexual Health' => '❤️',
            'Family Planning' => '👶',
            'Relationships' => '💕',
            'Gender Equality' => '⚖️',
            'Mental Health' => '🧠',
            'Reproductive Rights' => '✊',
            'Contraception' => '💊',
            'Pregnancy' => '🤱',
            'STI Prevention' => '🛡️',
            'Consent' => '🤝'
        ];
        
        return $icons[$category] ?? '📚';
    }
}