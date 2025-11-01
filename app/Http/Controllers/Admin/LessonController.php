<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LessonController extends Controller
{
    /**
     * Display a listing of lessons for a specific module.
     */
    public function index($courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        $lessons = Lesson::where('module_id', $moduleId)
            ->orderBy('order')
            ->paginate(15);

        return Inertia::render('admin/lessons/index', [
            'course' => $course,
            'module' => $module,
            'lessons' => $lessons,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for creating a new lesson.
     */
    public function create($courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        
        return Inertia::render('admin/lessons/create', [
            'course' => $course,
            'module' => $module,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Store a newly created lesson.
     */
    public function store(Request $request, $courseId, $moduleId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'pdf_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $validated['module_id'] = $moduleId;
        $validated['order'] = Lesson::where('module_id', $moduleId)->max('order') + 1;

        $lesson = Lesson::create($validated);

        return redirect()->route('admin.lessons.index', [$courseId, $moduleId])
            ->with('success', 'Lesson created successfully!');
    }

    /**
     * Display the specified lesson.
     */
    public function show($courseId, $moduleId, $lessonId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::findOrFail($lessonId);

        return Inertia::render('admin/lessons/show', [
            'course' => $course,
            'module' => $module,
            'lesson' => $lesson,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for editing the specified lesson.
     */
    public function edit($courseId, $moduleId, $lessonId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::findOrFail($lessonId);

        return Inertia::render('admin/lessons/edit', [
            'course' => $course,
            'module' => $module,
            'lesson' => $lesson,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Update the specified lesson.
     */
    public function update(Request $request, $courseId, $moduleId, $lessonId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::findOrFail($lessonId);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'pdf_url' => 'nullable|url',
            'video_url' => 'nullable|url',
            'is_active' => 'boolean',
        ]);

        $lesson->update($validated);

        return redirect()->route('admin.lessons.index', [$courseId, $moduleId])
            ->with('success', 'Lesson updated successfully!');
    }

    /**
     * Remove the specified lesson.
     */
    public function destroy($courseId, $moduleId, $lessonId)
    {
        $course = Course::findOrFail($courseId);
        $module = Module::findOrFail($moduleId);
        $lesson = Lesson::findOrFail($lessonId);
        
        $lesson->delete();

        return redirect()->route('admin.lessons.index', [$courseId, $moduleId])
            ->with('success', 'Lesson deleted successfully!');
    }

    /**
     * Toggle lesson status
     */
    public function toggleStatus($courseId, $moduleId, $lessonId)
    {
        $lesson = Lesson::findOrFail($lessonId);
        $lesson->update(['is_active' => !$lesson->is_active]);

        $status = $lesson->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Lesson {$status} successfully!");
    }

    /**
     * Update lesson order
     */
    public function updateOrder(Request $request, $courseId, $moduleId)
    {
        $validated = $request->validate([
            'lessons' => 'required|array',
            'lessons.*.id' => 'required|exists:lessons,id',
            'lessons.*.order' => 'required|integer|min:1',
        ]);

        foreach ($validated['lessons'] as $lessonData) {
            Lesson::where('id', $lessonData['id'])
                ->where('module_id', $moduleId)
                ->update(['order' => $lessonData['order']]);
        }

        return response()->json(['success' => true]);
    }
}

