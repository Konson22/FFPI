<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    /**
     * Display a listing of modules.
     */
    public function index()
    {
        $modules = Module::withCount('lessons')
            ->orderBy('order')
            ->orderBy('id')
            ->paginate(15);

        return Inertia::render('admin/modules/index', [
            'modules' => $modules,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for creating a new module.
     */
    public function create()
    {
        return Inertia::render('admin/modules/create', [
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Store a newly created module.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
            'published' => 'boolean',
            'featured' => 'boolean',
        ]);
        
        if (!isset($validated['order'])) {
            $validated['order'] = Module::max('order') ?? 0;
            $validated['order'] += 1;
        }

        $module = Module::create($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module created successfully!');
    }

    /**
     * Display the specified module.
     */
    public function show($moduleId)
    {
        $module = Module::with(['lessons' => function ($q) {
                $q->orderBy('order')->orderBy('id');
            }])
            ->findOrFail($moduleId);

        return Inertia::render('admin/modules/show', [
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for editing the specified module.
     */
    public function edit($moduleId)
    {
        $module = Module::findOrFail($moduleId);

        return Inertia::render('admin/modules/edit', [
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Update the specified module.
     */
    public function update(Request $request, $moduleId)
    {
        $module = Module::findOrFail($moduleId);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
            'published' => 'boolean',
            'featured' => 'boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        $module->update($validated);

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module updated successfully!');
    }

    /**
     * Remove the specified module.
     */
    public function destroy($moduleId)
    {
        $module = Module::findOrFail($moduleId);
        $module->delete();

        return redirect()->route('admin.modules.index')
            ->with('success', 'Module deleted successfully!');
    }

    /**
     * Toggle module status
     */
    public function toggleStatus($moduleId)
    {
        $module = Module::findOrFail($moduleId);
        $module->update(['is_active' => !$module->is_active]);

        $status = $module->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Module {$status} successfully!");
    }

    /**
     * Update module order
     */
    public function updateOrder(Request $request)
    {
        $validated = $request->validate([
            'modules' => 'required|array',
            'modules.*.id' => 'required|exists:modules,id',
            'modules.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['modules'] as $moduleData) {
            Module::where('id', $moduleData['id'])
                ->update(['order' => $moduleData['order']]);
        }

        return response()->json(['success' => true]);
    }

    /**
     * Show form to create a new lesson within a module.
     */
    public function createLesson($moduleId)
    {
        $module = Module::findOrFail($moduleId);

        return Inertia::render('admin/lessons/create', [
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path(),
        ]);
    }

    /**
     * Store newly created lesson within a module.
     */
    public function storeLesson(Request $request, $moduleId)
    {
        $module = Module::findOrFail($moduleId);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'objective' => 'nullable|string',
            'content' => 'nullable|string',
            'pdf_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'is_active' => 'boolean',
            'order' => 'nullable|integer|min:0',
        ]);

        if (!isset($validated['order'])) {
            $nextOrder = Lesson::where('module_id', $module->id)->max('order');
            $validated['order'] = ($nextOrder ?? 0) + 1;
        }

        $validated['module_id'] = $module->id;

        Lesson::create($validated);

        return redirect()->route('admin.modules.show', ['moduleId' => $module->id])
            ->with('success', 'Lesson created successfully!');
    }
}
