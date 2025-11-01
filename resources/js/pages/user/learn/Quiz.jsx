import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function QuizPage({ user, module, lesson, quizzes }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [submitting, setSubmitting] = useState(false);

    const handleAnswerChange = (quizId, value, isMultiple) => {
        setSelectedAnswers((prev) => {
            if (isMultiple) {
                // For multiple choice, toggle the value in an array
                const current = prev[quizId] || [];
                const newAnswers = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
                return { ...prev, [quizId]: newAnswers };
            } else {
                // For single choice, just set the value
                return { ...prev, [quizId]: value };
            }
        });
    };

    const onSubmitQuiz = (e) => {
        e.preventDefault();
        setSubmitting(true);

        const answers = (quizzes || []).map((q) => {
            const answer = selectedAnswers[q.id];
            // If quiz has options, use selected answer; otherwise use text input as fallback
            if (answer !== undefined && answer !== null && answer !== '') {
                return {
                    quiz_id: q.id,
                    answer: answer,
                };
            }
            // Fallback to text input for backward compatibility
            const form = new FormData(e.currentTarget);
            return {
                quiz_id: q.id,
                answer: form.get(`answer_${q.id}`) || '',
            };
        });

        router.post(
            `/user/learn/module/${module.id}/lesson/${lesson.id}/complete`,
            { answers },
            {
                preserveScroll: true,
                onFinish: () => {
                    setSubmitting(false);
                },
            },
        );
    };

    const allQuestionsAnswered = quizzes.every((q) => {
        const answer = selectedAnswers[q.id];
        return answer !== undefined && answer !== null && answer !== '';
    });

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div className="mx-auto max-w-4xl">
                {/* Header */}
                <div className="mb-6">
                    <Link
                        href={`/user/learn/module/${module.id}/lesson/${lesson.id}`}
                        className="mb-4 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                        ← Back to Lesson
                    </Link>
                    <div className="mt-4 rounded-lg bg-white p-6 shadow">
                        <h1 className="text-2xl font-bold text-gray-900">Lesson Quiz</h1>
                        <p className="mt-2 text-gray-600">
                            <span className="font-medium">{lesson.title}</span>
                        </p>
                        <p className="mt-1 text-sm text-gray-500">Module: {module.title}</p>
                        <p className="mt-4 text-sm text-gray-600">
                            Please answer all questions to complete this lesson. You need to score at least 70% to pass.
                        </p>
                    </div>
                </div>

                {/* Quiz Form */}
                <form onSubmit={onSubmitQuiz} className="rounded-lg bg-white p-6 shadow">
                    <div className="space-y-8">
                        {quizzes.map((q, idx) => {
                            const hasOptions = q.options && q.options.length > 0;
                            const isMultiple = q.type === 'multiple_choice';
                            const selectedAnswer = selectedAnswers[q.id];

                            return (
                                <div key={q.id} className="space-y-3 border-b border-gray-200 pb-6 last:border-0">
                                    <label className="block text-base font-semibold text-gray-900">
                                        Question {idx + 1}: {q.question}
                                    </label>
                                    {hasOptions ? (
                                        <div className="space-y-2">
                                            {q.options.map((option, optIdx) => {
                                                const optionKey = `${q.id}_${optIdx}`;
                                                const isSelected = isMultiple
                                                    ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
                                                    : selectedAnswer === option;

                                                return (
                                                    <label
                                                        key={optionKey}
                                                        className={`flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-all ${
                                                            isSelected
                                                                ? 'border-green-500 bg-green-50 shadow-sm'
                                                                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                                        }`}
                                                    >
                                                        <input
                                                            type={isMultiple ? 'checkbox' : 'radio'}
                                                            name={isMultiple ? `quiz_${q.id}[]` : `quiz_${q.id}`}
                                                            className="h-5 w-5 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                            checked={isSelected}
                                                            onChange={() => handleAnswerChange(q.id, option, isMultiple)}
                                                        />
                                                        <span className="flex-1 text-sm text-gray-700">{option}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            name={`answer_${q.id}`}
                                            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            placeholder="Your answer"
                                            autoComplete="off"
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Submit Button */}
                    <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                        <Link
                            href={`/user/learn/module/${module.id}/lesson/${lesson.id}`}
                            className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={!allQuestionsAnswered || submitting}
                            className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {submitting ? 'Submitting...' : 'Submit Quiz'}
                        </button>
                    </div>
                    {!allQuestionsAnswered && (
                        <p className="mt-2 text-center text-sm text-amber-600">Please answer all questions before submitting.</p>
                    )}
                </form>
            </div>
        </UserLayout>
    );
}
