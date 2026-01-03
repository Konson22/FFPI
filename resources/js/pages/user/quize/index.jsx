import { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';
import { generateQuizQuestions } from '../../../services/gemini';

const QUIZ_CATEGORIES = [
    { id: 'general', name: 'General Health', icon: '🏥', color: 'blue' },
    { id: 'sexual-health', name: 'Sexual Health', icon: '💊', color: 'purple' },
    { id: 'reproductive-health', name: 'Reproductive Health', icon: '🌸', color: 'pink' },
    { id: 'contraception', name: 'Contraception', icon: '💉', color: 'green' },
    { id: 'relationships', name: 'Relationships', icon: '💑', color: 'red' },
    { id: 'mental-health', name: 'Mental Health', icon: '🧠', color: 'indigo' },
    { id: 'stis', name: 'STIs', icon: '🦠', color: 'orange' },
    { id: 'family-planning', name: 'Family Planning', icon: '👨‍👩‍👧‍👦', color: 'teal' },
    { id: 'education', name: 'Education', icon: '📚', color: 'yellow' },
];

export default function QuizePage({ user }) {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [quizResult, setQuizResult] = useState(null);
    const [timeStarted, setTimeStarted] = useState(null);
    const [timeElapsed, setTimeElapsed] = useState(0);

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (timeStarted && !quizResult) {
            interval = setInterval(() => {
                setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
            }, 1000);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [timeStarted, quizResult]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCategorySelect = async (category) => {
        setSelectedCategory(category);
        setLoading(true);
        setError(null);
        setQuizQuestions([]);
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setQuizResult(null);
        setTimeStarted(null);
        setTimeElapsed(0);

        try {
            const questions = await generateQuizQuestions(category.name, '', 10);
            setQuizQuestions(questions);
            setTimeStarted(Date.now());
        } catch (err) {
            console.error('Error generating quiz:', err);
            const isRateLimit =
                err.isRateLimit ||
                err.message?.includes('429') ||
                err.message?.includes('Resource exhausted') ||
                err.message?.includes('high demand');

            if (isRateLimit) {
                setError(
                    'The AI service is currently experiencing high demand. Please wait a moment and try again. If the issue persists, please try again in a few minutes.',
                );
            } else {
                setError(err.message || 'Failed to generate quiz questions. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (questionId, value, isMultiple) => {
        setSelectedAnswers((prev) => {
            if (isMultiple) {
                const current = prev[questionId] || [];
                const newAnswers = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
                return { ...prev, [questionId]: newAnswers };
            } else {
                return { ...prev, [questionId]: value };
            }
        });
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const handleSubmitQuiz = () => {
        setSubmitting(true);

        // Calculate score
        let correctCount = 0;
        let totalPoints = 0;
        let earnedPoints = 0;

        const results = quizQuestions.map((question) => {
            const userAnswer = selectedAnswers[question.id];
            const isCorrect = Array.isArray(question.correct_answers)
                ? Array.isArray(userAnswer) &&
                  userAnswer.length === question.correct_answers.length &&
                  userAnswer.every((ans) => question.correct_answers.includes(ans))
                : userAnswer === question.correct_answer;

            if (isCorrect) {
                correctCount++;
                earnedPoints += question.points || 10;
            }
            totalPoints += question.points || 10;

            return {
                question: question.question,
                userAnswer: userAnswer,
                correctAnswer: question.correct_answer || question.correct_answers,
                isCorrect,
                explanation: question.explanation,
            };
        });

        const score = Math.round((correctCount / quizQuestions.length) * 100);
        const passed = score >= 70;

        setTimeout(() => {
            setQuizResult({
                score,
                correctCount,
                totalQuestions: quizQuestions.length,
                earnedPoints,
                totalPoints,
                passed,
                results,
                timeElapsed: formatTime(timeElapsed),
            });
            setSubmitting(false);
        }, 500);
    };

    const handleRetry = () => {
        setQuizResult(null);
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setTimeStarted(Date.now());
        setTimeElapsed(0);
    };

    const handleNewQuiz = () => {
        setSelectedCategory(null);
        setQuizQuestions([]);
        setSelectedAnswers({});
        setCurrentQuestionIndex(0);
        setQuizResult(null);
        setTimeStarted(null);
        setTimeElapsed(0);
        setError(null);
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const totalQuestions = quizQuestions.length;
    const answeredCount = Object.keys(selectedAnswers).filter((qId) => {
        const answer = selectedAnswers[qId];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    }).length;

    const isCurrentQuestionAnswered = () => {
        if (!currentQuestion) return false;
        const answer = selectedAnswers[currentQuestion.id];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    };

    const allQuestionsAnswered = quizQuestions.every((q) => {
        const answer = selectedAnswers[q.id];
        if (Array.isArray(answer)) {
            return answer.length > 0;
        }
        return answer !== undefined && answer !== null && answer !== '';
    });

    // Category Selection Screen
    if (!selectedCategory && !loading) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/quiz">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <h1 className="text-4xl font-bold text-gray-900">Quiz & Challenges</h1>
                        <p className="mt-2 text-lg text-gray-600">Test your knowledge on various health topics</p>
                    </div>

                    {/* Category Grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {QUIZ_CATEGORIES.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategorySelect(category)}
                                className={`group relative overflow-hidden rounded-xl border-2 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-lg ${
                                    category.color === 'blue'
                                        ? 'border-blue-200 hover:border-blue-400 hover:bg-blue-50'
                                        : category.color === 'purple'
                                          ? 'border-purple-200 hover:border-purple-400 hover:bg-purple-50'
                                          : category.color === 'pink'
                                            ? 'border-pink-200 hover:border-pink-400 hover:bg-pink-50'
                                            : category.color === 'green'
                                              ? 'border-green-200 hover:border-green-400 hover:bg-green-50'
                                              : category.color === 'red'
                                                ? 'border-red-200 hover:border-red-400 hover:bg-red-50'
                                                : category.color === 'indigo'
                                                  ? 'border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50'
                                                  : category.color === 'orange'
                                                    ? 'border-orange-200 hover:border-orange-400 hover:bg-orange-50'
                                                    : category.color === 'teal'
                                                      ? 'border-teal-200 hover:border-teal-400 hover:bg-teal-50'
                                                      : 'border-yellow-200 hover:border-yellow-400 hover:bg-yellow-50'
                                }`}
                            >
                                <div className="flex items-center space-x-4">
                                    <div className="text-4xl">{category.icon}</div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                                        <p className="mt-1 text-sm text-gray-500">10 questions</p>
                                    </div>
                                </div>
                                <div className="mt-4 flex items-center text-sm font-medium text-gray-600 group-hover:text-gray-900">
                                    Start Quiz
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </UserLayout>
        );
    }

    // Loading State
    if (loading) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/quiz">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-12 shadow-lg">
                        <div className="text-center">
                            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-green-600"></div>
                            <h3 className="text-xl font-semibold text-gray-900">Generating Quiz Questions</h3>
                            <p className="mt-2 text-sm text-gray-500">Creating personalized questions for {selectedCategory?.name}...</p>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    // Error State
    if (error && quizQuestions.length === 0) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/quiz">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-8 shadow-lg">
                        <div className="text-center">
                            <svg className="mx-auto h-12 w-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">Error Generating Quiz</h3>
                            <p className="mt-2 text-sm text-gray-500">{error}</p>
                            <div className="mt-6 flex justify-center gap-4">
                                <button
                                    onClick={handleNewQuiz}
                                    className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Choose Different Category
                                </button>
                                <button
                                    onClick={() => handleCategorySelect(selectedCategory)}
                                    className="rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    // Results Screen
    if (quizResult) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/quiz">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg bg-white p-8 shadow-lg">
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
                                {quizResult.passed ? '🎉 Congratulations!' : 'Keep Learning!'}
                            </h1>

                            <p className="mb-2 text-lg text-gray-700">
                                You scored <span className="font-semibold">{quizResult.score}%</span>
                            </p>

                            <p className="mb-4 text-gray-600">
                                {quizResult.correctCount} out of {quizResult.totalQuestions} questions correct
                            </p>

                            <div className="mb-6 flex justify-center gap-6 text-sm text-gray-500">
                                <div>
                                    <span className="font-semibold">Time:</span> {quizResult.timeElapsed}
                                </div>
                                <div>
                                    <span className="font-semibold">Points:</span> {quizResult.earnedPoints}/{quizResult.totalPoints}
                                </div>
                            </div>

                            {quizResult.passed ? (
                                <div className="mb-6 rounded-lg bg-green-50 p-4">
                                    <p className="text-green-800">✅ Great job! You passed the quiz!</p>
                                </div>
                            ) : (
                                <div className="mb-6 rounded-lg bg-amber-50 p-4">
                                    <p className="text-amber-800">You need at least 70% to pass. Review the answers below and try again!</p>
                                </div>
                            )}

                            {/* Detailed Results */}
                            <div className="mt-8 border-t border-gray-200 pt-6">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Review Your Answers</h3>
                                <div className="space-y-4 text-left">
                                    {quizResult.results.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`rounded-lg border-2 p-4 ${
                                                result.isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                                            }`}
                                        >
                                            <div className="mb-2 flex items-start justify-between">
                                                <p className="font-medium text-gray-900">
                                                    Q{index + 1}: {result.question}
                                                </p>
                                                {result.isCorrect ? (
                                                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                        ✓ Correct
                                                    </span>
                                                ) : (
                                                    <span className="ml-2 rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-800">
                                                        ✗ Incorrect
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-2 space-y-1 text-sm">
                                                <p>
                                                    <span className="font-medium text-gray-700">Your answer:</span>{' '}
                                                    <span className={result.isCorrect ? 'text-green-700' : 'text-red-700'}>
                                                        {Array.isArray(result.userAnswer)
                                                            ? result.userAnswer.join(', ')
                                                            : result.userAnswer || 'No answer'}
                                                    </span>
                                                </p>
                                                {!result.isCorrect && (
                                                    <p>
                                                        <span className="font-medium text-gray-700">Correct answer:</span>{' '}
                                                        <span className="text-green-700">
                                                            {Array.isArray(result.correctAnswer)
                                                                ? result.correctAnswer.join(', ')
                                                                : result.correctAnswer}
                                                        </span>
                                                    </p>
                                                )}
                                                {result.explanation && (
                                                    <p className="mt-2 text-gray-600">
                                                        <span className="font-medium">Explanation:</span> {result.explanation}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex justify-center gap-4">
                                <button
                                    onClick={handleNewQuiz}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    New Quiz
                                </button>
                                {!quizResult.passed && (
                                    <button
                                        onClick={handleRetry}
                                        className="rounded-md bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                                    >
                                        Retry Quiz
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </UserLayout>
        );
    }

    // Quiz Taking Screen
    if (currentQuestion) {
        const hasOptions = currentQuestion.options && currentQuestion.options.length > 0;
        const isMultiple = currentQuestion.type === 'multiple_choice';
        const selectedAnswer = selectedAnswers[currentQuestion.id];

        return (
            <UserLayout user={user} role="user" currentPath="/user/quiz">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="mb-4 flex items-center justify-between">
                            <button
                                onClick={handleNewQuiz}
                                className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
                            >
                                ← Back to Categories
                            </button>
                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Time:</span> {formatTime(timeElapsed)}
                            </div>
                        </div>
                        <div className="rounded-lg bg-white p-6 shadow">
                            <div className="mb-4 flex items-center justify-between">
                                <h1 className="text-2xl font-bold text-gray-900">{selectedCategory.name} Quiz</h1>
                                <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    {selectedCategory.icon}
                                </span>
                            </div>

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
                                <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                    <div
                                        className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-300"
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
                                <button
                                    type="button"
                                    onClick={handleNewQuiz}
                                    className="rounded-md border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
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
                        {quizQuestions.map((q, idx) => {
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

    return null;
}
