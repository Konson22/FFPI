import { Link, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function QuizPage({ user, module, lesson, category, quizResult: initialQuizResult, quizzes = [] }) {
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const [quizResult, setQuizResult] = useState(initialQuizResult || null);
    const items = quizzes;

    // Sync quizResult state when prop changes (after submission)
    useEffect(() => {
        if (initialQuizResult) {
            setQuizResult(initialQuizResult);
        }
    }, [initialQuizResult]);

    const currentQuestion = items[currentQuestionIndex];
    const totalQuestions = items.length;
    const answeredCount = Object.keys(selectedAnswers).filter((quizId) => {
        const answer = selectedAnswers[quizId];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    }).length;

    const handleAnswerChange = (quizId, value, isMultiple) => {
        setSelectedAnswers((prev) => {
            let newAnswers;
            if (isMultiple) {
                // For multiple choice, toggle the value in an array
                const current = prev[quizId] || [];
                newAnswers = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
            } else {
                // For single choice, just set the value
                newAnswers = value;
            }

            const updated = { ...prev, [quizId]: newAnswers };

            // Auto-advance to next question for single choice (not multiple)
            if (!isMultiple && currentQuestionIndex < totalQuestions - 1) {
                setTimeout(() => {
                    setCurrentQuestionIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
                }, 500);
            }

            return updated;
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < totalQuestions - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            // If on last question, submit quiz
            handleSubmitQuiz();
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setSubmitting(true);

        const answers = (items || []).map((q) => {
            const answer = selectedAnswers[q.id];
            // If quiz has options, use selected answer; otherwise use text input as fallback
            if (answer !== undefined && answer !== null && answer !== '') {
                return {
                    quiz_id: q.id,
                    answer: answer,
                };
            }
            return {
                quiz_id: q.id,
                answer: '',
            };
        });

        // Send quizzes with correct answers for grading
        const quizzesForGrading = items.map((q) => ({
            id: q.id,
            question: q.question,
            type: q.type,
            options: q.options,
            correct_answer: q.correct_answer,
            correct_answers: q.correct_answers,
        }));

        router.post(
            `/user/learn/module/${module.id}/lesson/${lesson.id}/complete`,
            {
                answers,
                quizzes: quizzesForGrading, // Send quizzes for grading
            },
            {
                preserveScroll: true,
                onFinish: () => {
                    setSubmitting(false);
                },
            },
        );
    };

    const isCurrentQuestionAnswered = () => {
        if (!currentQuestion) return false;
        const answer = selectedAnswers[currentQuestion.id];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    };

    const allQuestionsAnswered = items.every((q) => {
        const answer = selectedAnswers[q.id];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    });

    // Show results screen if quiz is completed
    if (quizResult) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/learn">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-lg bg-white p-8 shadow">
                        <div className="text-center">
                            {/* Score Display */}
                            <div
                                className={`mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full text-5xl font-bold ${
                                    quizResult.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                                }`}
                            >
                                {quizResult.score}%
                            </div>

                            <h1 className={`mb-4 text-3xl font-bold ${quizResult.passed ? 'text-green-600' : 'text-red-600'}`}>
                                {quizResult.passed ? '🎉 Congratulations!' : 'Keep Trying!'}
                            </h1>

                            <p className="mb-2 text-lg text-gray-700">
                                You scored <span className="font-semibold">{quizResult.score}%</span>
                            </p>

                            <p className="mb-6 text-gray-600">
                                Correct Answers: <span className="font-semibold">{quizResult.correctAnswers}</span> out of{' '}
                                <span className="font-semibold">{quizResult.totalQuestions}</span> questions
                            </p>

                            {quizResult.passed ? (
                                <div className="mb-6 rounded-lg bg-green-50 p-4">
                                    <p className="text-green-800">✅ You passed the quiz! Your score has been saved.</p>
                                </div>
                            ) : (
                                <div className="mb-6 rounded-lg bg-amber-50 p-4">
                                    <p className="text-amber-800">
                                        You need at least {quizResult.passMark}% to pass. Your score has been saved. Try again to improve!
                                    </p>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex justify-center gap-4">
                                <Link
                                    href={`/user/learn/module/${module.id}/lesson/${lesson.id}`}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Back to Lesson
                                </Link>
                                {!quizResult.passed && (
                                    <button
                                        onClick={() => {
                                            setQuizResult(null);
                                            setSelectedAnswers({});
                                            setCurrentQuestionIndex(0);
                                        }}
                                        className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                                    >
                                        Retry Quiz
                                    </button>
                                )}
                                {quizResult.passed && quizResult.nextLesson && (
                                    <Link
                                        href={`/user/learn/module/${module.id}/lesson/${quizResult.nextLesson.id}`}
                                        className="rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Next Lesson →
                                    </Link>
                                )}
                                <Link
                                    href={`/user/learn/module/${module.id}`}
                                    className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    {quizResult.passed && quizResult.nextLesson ? 'Back to Module' : 'Continue Learning'}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    // No questions available
    if (!currentQuestion || items.length === 0) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/learn">
                <div className="mx-auto max-w-4xl">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-medium text-gray-900">No Quiz Questions Available</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                There are no quiz questions available for this lesson at the moment. Please try refreshing the page or contact support
                                if the issue persists.
                            </p>
                            <div className="mt-6 flex justify-center gap-4">
                                <Link
                                    href={`/user/learn/module/${module.id}/lesson/${lesson.id}`}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Back to Lesson
                                </Link>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    Refresh Page
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    const hasOptions = currentQuestion.options && currentQuestion.options.length > 0;
    const isMultiple = currentQuestion.type === 'multiple_choice';
    const selectedAnswer = selectedAnswers[currentQuestion.id];

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

                        {/* Progress Summary */}
                        <div className="mt-4">
                            <div className="mb-2 flex items-center justify-between text-sm">
                                <span className="font-medium text-gray-700">
                                    Progress: {answeredCount} / {totalQuestions} answered
                                </span>
                                <span className="text-gray-500">
                                    Question {currentQuestionIndex + 1} of {totalQuestions}
                                </span>
                            </div>
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full bg-green-600 transition-all duration-300"
                                    style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* Quiz Form */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitQuiz();
                    }}
                    className="rounded-lg bg-white p-6 shadow"
                >
                    {/* Current Question */}
                    <div className="space-y-4">
                        <label className="block text-lg font-semibold text-gray-900">
                            Question {currentQuestionIndex + 1}: {currentQuestion.question}
                        </label>
                        {hasOptions ? (
                            <div className="space-y-2">
                                {currentQuestion.options.map((option, optIdx) => {
                                    const optionKey = `${currentQuestion.id}_${optIdx}`;
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
                                                name={isMultiple ? `quiz_${currentQuestion.id}[]` : `quiz_${currentQuestion.id}`}
                                                className="h-5 w-5 border-gray-300 text-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                                                checked={isSelected}
                                                onChange={() => handleAnswerChange(currentQuestion.id, option, isMultiple)}
                                            />
                                            <span className="flex-1 text-sm text-gray-700">{option}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        ) : (
                            <input
                                type="text"
                                name={`answer_${currentQuestion.id}`}
                                value={selectedAnswer || ''}
                                onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value, false)}
                                className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                placeholder="Your answer"
                                autoComplete="off"
                            />
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                        <div className="flex gap-3">
                            <Link
                                href={`/user/learn/module/${module.id}/lesson/${lesson.id}`}
                                className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            {currentQuestionIndex > 0 && (
                                <button
                                    type="button"
                                    onClick={handlePreviousQuestion}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    ← Previous
                                </button>
                            )}
                        </div>
                        <div className="flex gap-3">
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <button
                                    type="button"
                                    onClick={handleNextQuestion}
                                    disabled={!isCurrentQuestionAnswered()}
                                    className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Next →
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={!allQuestionsAnswered || submitting}
                                    className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? 'Submitting...' : 'Submit Quiz'}
                                </button>
                            )}
                        </div>
                    </div>
                    {!isCurrentQuestionAnswered() && currentQuestionIndex < totalQuestions - 1 && (
                        <p className="mt-2 text-center text-sm text-amber-600">Please answer this question to continue.</p>
                    )}
                </form>
                {/* Question Navigation Dots */}
                <div className="mt-4 flex justify-center gap-2">
                    {items.map((q, idx) => {
                        const isAnswered = (() => {
                            const answer = selectedAnswers[q.id];
                            if (Array.isArray(answer)) {
                                return answer.length > 0;
                            }
                            return answer !== undefined && answer !== null && answer !== '';
                        })();
                        const isCurrent = idx === currentQuestionIndex;

                        return (
                            <button
                                key={q.id}
                                type="button"
                                onClick={() => setCurrentQuestionIndex(idx)}
                                className={`h-3 w-3 rounded-full transition-all ${
                                    isCurrent ? 'bg-green-600 ring-2 ring-green-500 ring-offset-2' : isAnswered ? 'bg-green-400' : 'bg-gray-300'
                                }`}
                                title={`Question ${idx + 1}${isAnswered ? ' (Answered)' : ''}`}
                            />
                        );
                    })}
                </div>
            </div>
        </UserLayout>
    );
}
