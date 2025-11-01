<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class ModuleController extends Controller
{
    /**
     * Display a listing of modules for a specific course.
     */
    public function index($courseId)
    {
        $course = Course::findOrFail($courseId);
        $modules = Module::where('course_id', $courseId)
            ->orderBy('order')
            ->paginate(15);

        return Inertia::render('admin/modules/index', [
            'course' => $course,
            'modules' => $modules,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for creating a new module.
     */
    public function create($courseId)
    {
        $course = Course::findOrFail($courseId);
        
        return Inertia::render('admin/modules/create', [
            'course' => $course,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Store a newly created module.
     */
    public function store(Request $request, $courseId)
    {
        $course = Course::findOrFail($courseId);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $validated['course_id'] = $courseId;
        $validated['module_code'] = 'MOD-' . strtoupper(Str::random(6));
        $validated['order'] = Module::where('course_id', $courseId)->max('order') + 1;

        $module = Module::create($validated);

        return redirect()->route('admin.modules.index', $courseId)
            ->with('success', 'Module created successfully!');
    }

    /**
     * Display the specified module.
     */
    public function show($courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::with(['lessons' => function($query) {
            $query->orderBy('order');
        }])->findOrFail($moduleId);

        return Inertia::render('admin/modules/show', [
            'course' => $course,
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for editing the specified module.
     */
    public function edit($courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);

        return Inertia::render('admin/modules/edit', [
            'course' => $course,
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Update the specified module.
     */
    public function update(Request $request, $courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $module->update($validated);

        return redirect()->route('admin.modules.index', $courseId)
            ->with('success', 'Module updated successfully!');
    }

    /**
     * Remove the specified module.
     */
    public function destroy($courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        
        // Delete associated lessons first
        $module->lessons()->delete();
        $module->delete();

        return redirect()->route('admin.modules.index', $courseId)
            ->with('success', 'Module deleted successfully!');
    }

    /**
     * Toggle module status
     */
    public function toggleStatus($courseId, $moduleId)
    {
        $module = Module::findOrFail($moduleId);
        $module->update(['is_active' => !$module->is_active]);

        $status = $module->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Module {$status} successfully!");
    }

    /**
     * Update module order
     */
    public function updateOrder(Request $request, $courseId)
    {
        $validated = $request->validate([
            'modules' => 'required|array',
            'modules.*.id' => 'required|exists:modules,id',
            'modules.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['modules'] as $moduleData) {
            Module::where('id', $moduleData['id'])
                ->where('course_id', $courseId)
                ->update(['order' => $moduleData['order']]);
        }

        return response()->json(['success' => true]);
    }
}

