<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\StandaloneQuiz;
use App\Models\QuizQuestion;
use App\Models\QuizQuestionOption;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    /**
     * Display a listing of quizzes.
     */
    public function index()
    {
        $quizzes = StandaloneQuiz::withCount('questions')
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/quizzes/index', [
            'quizzes' => $quizzes,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for creating a new quiz.
     */
    public function create()
    {
        return Inertia::render('admin/quizzes/create', [
            'user' => auth()->user(),
        ]);
    }

    /**
     * Store a newly created quiz.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'difficulty' => 'required|string',
            'time_limit' => 'required|integer|min:1',
            'points' => 'required|integer|min:1',
            'badge' => 'nullable|string',
            'is_active' => 'boolean',
            'questions' => 'required|array|min:1',
            'questions.*.question' => 'required|string',
            'questions.*.explanation' => 'nullable|string',
            'questions.*.options' => 'required|array|min:2',
            'questions.*.options.*.option_text' => 'required|string',
            'questions.*.options.*.is_correct' => 'required|boolean',
        ]);

        // Create the quiz
        $quiz = StandaloneQuiz::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'category' => $validated['category'],
            'difficulty' => $validated['difficulty'],
            'time_limit' => $validated['time_limit'],
            'points' => $validated['points'],
            'badge' => $validated['badge'],
            'is_active' => $validated['is_active'] ?? true,
        ]);

        // Create questions and options
        foreach ($validated['questions'] as $index => $questionData) {
            $question = QuizQuestion::create([
                'standalone_quiz_id' => $quiz->id,
                'question' => $questionData['question'],
                'explanation' => $questionData['explanation'],
                'order' => $index + 1,
            ]);

            foreach ($questionData['options'] as $optIndex => $optionData) {
                QuizQuestionOption::create([
                    'question_id' => $question->id,
                    'option_text' => $optionData['option_text'],
                    'is_correct' => $optionData['is_correct'],
                    'order' => $optIndex,
                ]);
            }
        }

        return redirect()->route('admin.quizzes')->with('success', 'Quiz created successfully!');
    }

    /**
     * Display the specified quiz.
     */
    public function show($id)
    {
        $quiz = StandaloneQuiz::with(['questions.options'])
            ->findOrFail($id);

        return Inertia::render('admin/quizzes/show', [
            'quiz' => $quiz,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Show the form for editing the specified quiz.
     */
    public function edit($id)
    {
        $quiz = StandaloneQuiz::with(['questions.options'])
            ->findOrFail($id);

        return Inertia::render('admin/quizzes/edit', [
            'quiz' => $quiz,
            'user' => auth()->user(),
        ]);
    }

    /**
     * Update the specified quiz.
     */
    public function update(Request $request, $id)
    {
        $quiz = StandaloneQuiz::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'difficulty' => 'required|string',
            'time_limit' => 'required|integer|min:1',
            'points' => 'required|integer|min:1',
            'badge' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $quiz->update($validated);

        return redirect()->route('admin.quizzes')->with('success', 'Quiz updated successfully!');
    }

    /**
     * Remove the specified quiz.
     */
    public function destroy($id)
    {
        $quiz = StandaloneQuiz::findOrFail($id);
        $quiz->delete();

        return redirect()->route('admin.quizzes')->with('success', 'Quiz deleted successfully!');
    }

    /**
     * Toggle quiz status
     */
    public function toggleStatus($id)
    {
        $quiz = StandaloneQuiz::findOrFail($id);
        $quiz->update(['is_active' => !$quiz->is_active]);

        $status = $quiz->is_active ? 'activated' : 'deactivated';
        return redirect()->back()->with('success', "Quiz {$status} successfully!");
    }
}
