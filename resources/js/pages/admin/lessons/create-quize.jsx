import AdminLayout from '@/layouts/AdminLayout';
import { generateQuizQuestions } from '@/services/gemini';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateQuize({ lessons, user, currentPath }) {
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [generatedQuizzes, setGeneratedQuizzes] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState(null);

    const { data, setData, post, processing, errors } = useForm({
        lesson_id: '',
        quizzes: [],
    });

    // Transform Gemini response to database format
    const transformQuizData = (geminiQuizzes) => {
        return geminiQuizzes.map((quiz) => {
            // Map Gemini types to database types
            const typeMap = {
                single_choice: 'multiple_choice',
                multiple_choice: 'multiple_choice',
                true_false: 'true_false',
                multiple_select: 'multiple_select',
                short_answer: 'short_answer',
            };

            const dbType = typeMap[quiz.type] || 'multiple_choice';

            // Transform options array
            let options = [];
            if (dbType === 'true_false') {
                // For true/false, create standard options
                options = [
                    { text: 'True', is_correct: quiz.correct_answer === 'True' || quiz.correct_answer === true },
                    { text: 'False', is_correct: quiz.correct_answer === 'False' || quiz.correct_answer === false },
                ];
            } else if (Array.isArray(quiz.options)) {
                // For multiple choice/select, transform string array to object array
                if (typeof quiz.options[0] === 'string') {
                    const correctAnswers = Array.isArray(quiz.correct_answers)
                        ? quiz.correct_answers
                        : quiz.correct_answer
                          ? [quiz.correct_answer]
                          : [];
                    options = quiz.options.map((opt) => ({
                        text: opt,
                        is_correct: correctAnswers.includes(opt),
                    }));
                } else {
                    // Already in correct format
                    options = quiz.options;
                }
            }

            return {
                question: quiz.question,
                type: dbType,
                options: options,
                explanation: quiz.explanation || '',
                points: quiz.points || 1,
            };
        });
    };

    const handleLessonSelect = (lessonId) => {
        const lesson = lessons.find((l) => l.id === parseInt(lessonId));
        setSelectedLesson(lesson);
        setData('lesson_id', lessonId);
        setGeneratedQuizzes([]);
        setError(null);
    };

    const handleGenerateQuizzes = async () => {
        if (!selectedLesson) {
            setError('Please select a lesson first');
            return;
        }

        setIsGenerating(true);
        setError(null);

        try {
            const cleanContent = selectedLesson.content_markdown
                ? selectedLesson.content_markdown
                      .replace(/```[\s\S]*?```/g, ' ')
                      .replace(/`([^`]+)`/g, '$1')
                      .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
                      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
                      .replace(/[*_>#~-]/g, '')
                      .replace(/\s{2,}/g, ' ')
                      .trim()
                : '';

            const geminiQuizzes = await generateQuizQuestions(selectedLesson.title, cleanContent, 15);

            const transformedQuizzes = transformQuizData(geminiQuizzes);
            setGeneratedQuizzes(transformedQuizzes);
            setData('quizzes', transformedQuizzes);
        } catch (err) {
            console.error('Error generating quizzes:', err);
            setError(err.isRateLimit ? err.message : 'Failed to generate quiz questions. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleQuizChange = (index, field, value) => {
        const updatedQuizzes = [...generatedQuizzes];
        updatedQuizzes[index][field] = value;
        setGeneratedQuizzes(updatedQuizzes);
        setData('quizzes', updatedQuizzes);
    };

    const handleOptionChange = (quizIndex, optionIndex, field, value) => {
        const updatedQuizzes = [...generatedQuizzes];
        updatedQuizzes[quizIndex].options[optionIndex][field] = value;
        setGeneratedQuizzes(updatedQuizzes);
        setData('quizzes', updatedQuizzes);
    };

    const handleAddOption = (quizIndex) => {
        const updatedQuizzes = [...generatedQuizzes];
        updatedQuizzes[quizIndex].options.push({
            text: '',
            is_correct: false,
        });
        setGeneratedQuizzes(updatedQuizzes);
        setData('quizzes', updatedQuizzes);
    };

    const handleRemoveOption = (quizIndex, optionIndex) => {
        const updatedQuizzes = [...generatedQuizzes];
        if (updatedQuizzes[quizIndex].options.length > 1) {
            updatedQuizzes[quizIndex].options.splice(optionIndex, 1);
            setGeneratedQuizzes(updatedQuizzes);
            setData('quizzes', updatedQuizzes);
        }
    };

    const handleRemoveQuiz = (index) => {
        const updatedQuizzes = generatedQuizzes.filter((_, i) => i !== index);
        setGeneratedQuizzes(updatedQuizzes);
        setData('quizzes', updatedQuizzes);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (generatedQuizzes.length === 0) {
            setError('Please generate quiz questions first');
            return;
        }
        post('/admin/lessons/quizzes');
    };

    return (
        <AdminLayout user={user} currentPath={currentPath}>
            <Head title="Create Quiz Questions" />
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-6 shadow-md">
                        <h1 className="mb-6 text-3xl font-bold text-gray-900">Create Quiz Questions</h1>

                        {/* Lesson Selection */}
                        <div className="mb-6">
                            <label htmlFor="lesson" className="mb-2 block text-sm font-medium text-gray-700">
                                Select Lesson
                            </label>
                            <select
                                id="lesson"
                                value={selectedLesson?.id || ''}
                                onChange={(e) => handleLessonSelect(e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            >
                                <option value="">Choose a lesson...</option>
                                {lessons.map((lesson) => (
                                    <option key={lesson.id} value={lesson.id}>
                                        {lesson.module_title} - {lesson.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Lesson Content Preview */}
                        {selectedLesson && (
                            <div className="mb-6 rounded-md bg-gray-50 p-4">
                                <h3 className="mb-2 font-semibold text-gray-900">Lesson Content Preview:</h3>
                                <pre className="max-h-40 overflow-y-auto text-sm whitespace-pre-wrap text-gray-700">
                                    {selectedLesson.content_markdown?.substring(0, 500) || 'No content available'}
                                    {selectedLesson.content_markdown && selectedLesson.content_markdown.length > 500 ? '…' : ''}
                                </pre>
                            </div>
                        )}

                        {/* Generate Button */}
                        {selectedLesson && (
                            <div className="mb-6">
                                <button
                                    type="button"
                                    onClick={handleGenerateQuizzes}
                                    disabled={isGenerating}
                                    className="flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Generating 15 questions...
                                        </>
                                    ) : (
                                        'Generate 15 Quiz Questions with AI'
                                    )}
                                </button>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
                                <p className="text-red-800">{error}</p>
                            </div>
                        )}

                        {/* Generated Quizzes */}
                        {generatedQuizzes.length > 0 && (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="mb-4 flex items-center justify-between">
                                    <h2 className="text-xl font-semibold text-gray-900">Generated Quiz Questions ({generatedQuizzes.length})</h2>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded-md bg-green-600 px-6 py-2 text-white hover:bg-green-700 disabled:bg-gray-400"
                                    >
                                        {processing ? 'Saving...' : 'Save All Questions'}
                                    </button>
                                </div>

                                {generatedQuizzes.map((quiz, quizIndex) => (
                                    <div key={quizIndex} className="rounded-lg border border-gray-200 bg-gray-50 p-6">
                                        <div className="mb-4 flex items-start justify-between">
                                            <h3 className="text-lg font-medium text-gray-900">Question {quizIndex + 1}</h3>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveQuiz(quizIndex)}
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                Remove
                                            </button>
                                        </div>

                                        {/* Question Text */}
                                        <div className="mb-4">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Question</label>
                                            <textarea
                                                value={quiz.question}
                                                onChange={(e) => handleQuizChange(quizIndex, 'question', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                                rows="2"
                                            />
                                        </div>

                                        {/* Question Type */}
                                        <div className="mb-4">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Type</label>
                                            <select
                                                value={quiz.type}
                                                onChange={(e) => handleQuizChange(quizIndex, 'type', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                            >
                                                <option value="multiple_choice">Multiple Choice</option>
                                                <option value="true_false">True/False</option>
                                                <option value="multiple_select">Multiple Select</option>
                                                <option value="short_answer">Short Answer</option>
                                            </select>
                                        </div>

                                        {/* Options */}
                                        <div className="mb-4">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Options</label>
                                            {quiz.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="mb-2 flex items-center gap-2">
                                                    <input
                                                        type="text"
                                                        value={option.text}
                                                        onChange={(e) => handleOptionChange(quizIndex, optionIndex, 'text', e.target.value)}
                                                        className="flex-1 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                                        placeholder="Option text"
                                                    />
                                                    <label className="flex items-center gap-2">
                                                        <input
                                                            type="checkbox"
                                                            checked={option.is_correct}
                                                            onChange={(e) =>
                                                                handleOptionChange(quizIndex, optionIndex, 'is_correct', e.target.checked)
                                                            }
                                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                                                        />
                                                        <span className="text-sm text-gray-700">Correct</span>
                                                    </label>
                                                    {quiz.options.length > 1 && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveOption(quizIndex, optionIndex)}
                                                            className="text-red-600 hover:text-red-800"
                                                        >
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {quiz.type !== 'true_false' && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleAddOption(quizIndex)}
                                                    className="text-sm text-blue-600 hover:text-blue-800"
                                                >
                                                    + Add Option
                                                </button>
                                            )}
                                        </div>

                                        {/* Explanation */}
                                        <div className="mb-4">
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Explanation</label>
                                            <textarea
                                                value={quiz.explanation || ''}
                                                onChange={(e) => handleQuizChange(quizIndex, 'explanation', e.target.value)}
                                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                                rows="2"
                                                placeholder="Explanation for the correct answer"
                                            />
                                        </div>

                                        {/* Points */}
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Points</label>
                                            <input
                                                type="number"
                                                value={quiz.points}
                                                onChange={(e) => handleQuizChange(quizIndex, 'points', parseInt(e.target.value) || 1)}
                                                min="1"
                                                className="w-32 rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-blue-500"
                                            />
                                        </div>
                                    </div>
                                ))}

                                {errors.quizzes && <div className="text-sm text-red-600">{errors.quizzes}</div>}
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
