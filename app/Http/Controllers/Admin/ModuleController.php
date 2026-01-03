<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Lesson;
use App\Models\LessonQuiz;
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
                $q->orderBy('title')->orderBy('id');
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
            'content_markdown' => 'nullable|string',
            'video_url' => 'nullable|string|url',
            'pdf_url' => 'nullable|string|url',
        ]);

        Lesson::create([
            'module_id' => $module->id,
            'title' => $validated['title'],
            'content_markdown' => $validated['content_markdown'] ?? null,
            'video_url' => $validated['video_url'] ?? null,
            'pdf_url' => $validated['pdf_url'] ?? null,
        ]);

        return redirect()->route('admin.modules.show', ['moduleId' => $module->id])
            ->with('success', 'Lesson created successfully!');
    }

    /**
     * Display the specified lesson.
     */
    public function showLesson($lessonId)
    {
        $lesson = Lesson::with('module')->findOrFail($lessonId);

        return Inertia::render('admin/lessons/show', [
            'lesson' => $lesson,
            'module' => $lesson->module,
            'user' => auth()->user(),
            'currentPath' => request()->path(),
        ]);
    }

    /**
     * Show form to create quizzes for a lesson.
     */
    public function createQuiz()
    {
        $lessons = Lesson::with('module')
            ->orderBy('module_id')
            ->orderBy('id')
            ->get()
            ->map(function ($lesson) {
                return [
                    'id' => $lesson->id,
                    'title' => $lesson->title,
                    'module_title' => $lesson->module->title ?? 'N/A',
                    'content_markdown' => $lesson->content_markdown,
                    'content_html' => $lesson->content_html,
                    'video_url' => $lesson->video_url,
                    'pdf_url' => $lesson->pdf_url,
                ];
            });

        return Inertia::render('admin/lessons/create-quize', [
            'lessons' => $lessons,
            'user' => auth()->user(),
            'currentPath' => request()->path(),
        ]);
    }

    /**
     * Store quiz questions for a lesson.
     */
    public function storeQuiz(Request $request)
    {
        $validated = $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'quizzes' => 'required|array|min:1',
            'quizzes.*.question' => 'required|string',
            'quizzes.*.type' => 'required|in:multiple_choice,true_false,multiple_select,short_answer',
            'quizzes.*.options' => 'required|array',
            'quizzes.*.options.*.text' => 'required|string',
            'quizzes.*.options.*.is_correct' => 'required|boolean',
            'quizzes.*.explanation' => 'nullable|string',
            'quizzes.*.points' => 'nullable|integer|min:1',
        ]);

        $lesson = Lesson::findOrFail($validated['lesson_id']);

        $quizzes = [];
        foreach ($validated['quizzes'] as $quizData) {
            $quizzes[] = [
                'lesson_id' => $lesson->id,
                'question' => $quizData['question'],
                'type' => $quizData['type'],
                'options' => json_encode($quizData['options']),
                'explanation' => $quizData['explanation'] ?? null,
                'points' => $quizData['points'] ?? 1,
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        LessonQuiz::insert($quizzes);

        return redirect()->back()
            ->with('success', count($quizzes) . ' quiz questions created successfully!');
    }
}

