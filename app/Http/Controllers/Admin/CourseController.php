<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Module;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CourseController extends Controller
{
    /**
     * Display a listing of courses.
     */
    public function index()
    {
        // Temporarily removed withCount to prevent errors until course_id column is added
        $courses = Course::latest()->paginate(15);

        return Inertia::render('admin/courses/index', [
            'courses' => $courses,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for creating a new course.
     */
    public function create()
    {
        return Inertia::render('admin/courses/create', [
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Store a newly created course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $validated['course_code'] = 'COURSE-' . strtoupper(Str::random(6));
        $validated['order'] = Course::max('order') + 1;

        $course = Course::create($validated);

        return redirect()->route('admin.courses')->with('success', 'Course created successfully!');
    }

    /**
     * Display the specified course.
     */
    public function show($id)
    {
        $course = Course::with(['modules.lessons'])->findOrFail($id);

        return Inertia::render('admin/courses/show', [
            'course' => $course,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Show the form for editing the specified course.
     */
    public function edit($id)
    {
        // Temporarily removed eager loading to prevent errors until course_id column is added
        $course = Course::findOrFail($id);

        return Inertia::render('admin/courses/edit', [
            'course' => $course,
            'user' => auth()->user(),
            'currentPath' => request()->path()
        ]);
    }

    /**
     * Update the specified course.
     */
    public function update(Request $request, $id)
    {
        $course = Course::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'is_active' => 'boolean',
        ]);

        $course->update($validated);

        return redirect()->route('admin.courses')->with('success', 'Course updated successfully!');
    }

    /**
     * Remove the specified course.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return redirect()->route('admin.courses')->with('success', 'Course deleted successfully!');
    }

    /**
     * Toggle course status
     */
    public function toggleStatus($id)
    {
        $course = Course::findOrFail($id);
        $course->update(['is_active' => !$course->is_active]);

        $status = $course->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Course {$status} successfully!");
    }
}
