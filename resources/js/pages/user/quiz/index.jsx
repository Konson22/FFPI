import { useEffect, useMemo, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserQuizPage({ user }) {
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [quiz, setQuiz] = useState(null);
    const [category, setCategory] = useState('');
    const [selectedAnswer, setSelectedAnswer] = useState('');
    const [result, setResult] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(null);
    const [timerActive, setTimerActive] = useState(false);

    const authHeaders = useMemo(() => {
        // Check both localStorage and sessionStorage for token (supporting different auth methods)
        const token =
            window?.localStorage?.getItem('token') || window?.sessionStorage?.getItem('ffpi_toekn') || window?.sessionStorage?.getItem('token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    }, []);

    const generateQuiz = async () => {
        setLoading(true);
        setError('');
        setResult(null);
        setSelectedAnswer('');
        setQuiz(null);
        setTimeRemaining(null);
        setTimerActive(false);
        try {
            const params = new URLSearchParams();
            if (category) params.set('category', category);
            const res = await fetch(`/api/general-quizzes/generate?${params.toString()}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...authHeaders,
                },
                credentials: 'include',
            });

            const contentType = res.headers.get('content-type') || '';
            let data;

            // Check if response is JSON
            if (contentType.includes('application/json')) {
                data = await res.json();

                // Check for error in JSON response
                if (!res.ok) {
                    throw new Error(data.error || data.message || `Request failed with status ${res.status}`);
                }

                // Check if quiz data exists
                if (data.quiz) {
                    setQuiz(data.quiz);
                    // Start timer if time limit exists
                    if (data.quiz.time_limit_seconds) {
                        setTimeRemaining(data.quiz.time_limit_seconds);
                        setTimerActive(true);
                    } else {
                        setTimeRemaining(null);
                        setTimerActive(false);
                    }
                } else if (data.error) {
                    throw new Error(data.error);
                } else {
                    throw new Error('No quiz received from server');
                }
            } else {
                // Non-JSON response - likely HTML redirect or error page
                const text = await res.text();

                if (res.status === 401 || res.status === 403) {
                    throw new Error('Please log in to generate quizzes.');
                }

                // Try to parse as JSON anyway
                try {
                    data = JSON.parse(text);
                    if (data.error || data.message) {
                        throw new Error(data.error || data.message);
                    }
                } catch (parseError) {
                    // Not JSON, likely HTML
                    throw new Error('Server returned an unexpected response. Please ensure you are logged in.');
                }
            }
        } catch (e) {
            setError(e?.message || 'Unable to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        generateQuiz();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (timerActive && timeRemaining !== null && timeRemaining > 0 && !result && !submitting) {
            interval = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        setTimerActive(false);
                        // Auto-submit when time runs out (if answer is selected, submit it)
                        if (selectedAnswer && quiz && !submitting) {
                            setTimeout(() => {
                                handleAutoSubmit();
                            }, 100);
                        }
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (timeRemaining === 0) {
            setTimerActive(false);
        }
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timerActive, timeRemaining, result, selectedAnswer, submitting]);

    const handleAutoSubmit = async () => {
        if (!quiz || !selectedAnswer || submitting) return;
        setSubmitting(true);
        setTimerActive(false);
        setError('');
        try {
            const payload = {
                quiz_id: quiz.id,
                answer: selectedAnswer,
            };
            const res = await fetch('/api/general-quizzes/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...authHeaders,
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const contentType = res.headers.get('content-type') || '';
            let data;

            if (contentType.includes('application/json')) {
                data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || data.message || `Submission failed with status ${res.status}`);
                }
            } else {
                const text = await res.text();
                if (res.status === 401 || res.status === 403) {
                    throw new Error('Please log in to submit answers.');
                }
                try {
                    data = JSON.parse(text);
                    if (data.error || data.message) {
                        throw new Error(data.error || data.message);
                    }
                } catch (parseError) {
                    throw new Error('Server returned an unexpected response. Please ensure you are logged in.');
                }
            }
            setResult(data);
        } catch (e) {
            setError(e?.message || 'Unable to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!quiz || !selectedAnswer) return;
        setSubmitting(true);
        setTimerActive(false); // Stop timer when manually submitting
        setError('');
        try {
            const payload = {
                quiz_id: quiz.id,
                answer: selectedAnswer,
            };
            const res = await fetch('/api/general-quizzes/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    ...authHeaders,
                },
                body: JSON.stringify(payload),
                credentials: 'include',
            });

            const contentType = res.headers.get('content-type') || '';
            let data;

            if (contentType.includes('application/json')) {
                data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error || data.message || `Submission failed with status ${res.status}`);
                }
            } else {
                const text = await res.text();
                if (res.status === 401 || res.status === 403) {
                    throw new Error('Please log in to submit answers.');
                }
                try {
                    data = JSON.parse(text);
                    if (data.error || data.message) {
                        throw new Error(data.error || data.message);
                    }
                } catch (parseError) {
                    throw new Error('Server returned an unexpected response. Please ensure you are logged in.');
                }
            }
            setResult(data);
        } catch (e) {
            setError(e?.message || 'Unable to submit');
        } finally {
            setSubmitting(false);
        }
    };

    const handleNextQuiz = () => {
        setResult(null);
        setSelectedAnswer('');
        setTimeRemaining(null);
        setTimerActive(false);
        generateQuiz();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/quiz">
            <div className="mx-auto max-w-3xl p-6">
                <div className="mb-6 flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-gray-900">Quiz & Challenges</h1>
                    <button
                        type="button"
                        onClick={generateQuiz}
                        className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Loading…' : 'New Quiz'}
                    </button>
                </div>

                <div className="mb-4 flex gap-3">
                    <input
                        type="text"
                        placeholder="Category (optional, e.g., contraception, reproductive health)"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                    />
                    <button
                        type="button"
                        onClick={generateQuiz}
                        className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                        disabled={loading}
                    >
                        Generate
                    </button>
                </div>

                {error && <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-700">{error}</div>}

                {loading && (
                    <div className="rounded-md border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">Loading quiz...</div>
                )}

                {!loading && !quiz && !error && (
                    <div className="rounded-md border border-gray-200 bg-white px-4 py-6 text-center text-sm text-gray-500">
                        Click "New Quiz" to get a random quiz.
                    </div>
                )}

                {!loading && quiz && !result && (
                    <form onSubmit={onSubmit} className="space-y-6">
                        {/* Timer Display */}
                        {timeRemaining !== null && (
                            <div className="flex items-center justify-center">
                                <div
                                    className={`rounded-lg border-2 px-6 py-3 ${
                                        timeRemaining <= 10
                                            ? 'border-red-500 bg-red-50 text-red-700'
                                            : timeRemaining <= 30
                                              ? 'border-orange-500 bg-orange-50 text-orange-700'
                                              : 'border-purple-500 bg-purple-50 text-purple-700'
                                    }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-2xl font-bold">{formatTime(timeRemaining)}</span>
                                    </div>
                                    {timeRemaining <= 10 && <div className="mt-1 text-center text-xs">Time running out!</div>}
                                </div>
                            </div>
                        )}

                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="mb-2 text-sm text-gray-500">Question</div>
                            <div className="mb-4 text-base font-medium text-gray-900">{quiz.question}</div>
                            <div className="space-y-2">
                                {(quiz.options || []).map((opt, oi) => (
                                    <label
                                        key={oi}
                                        className={`flex cursor-pointer items-center gap-2 text-sm text-gray-800 ${
                                            timeRemaining === 0 ? 'cursor-not-allowed opacity-50' : ''
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="quiz_answer"
                                            className="h-4 w-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                                            checked={selectedAnswer === opt}
                                            onChange={() => setSelectedAnswer(opt)}
                                            disabled={timeRemaining === 0}
                                        />
                                        <span>{opt}</span>
                                    </label>
                                ))}
                            </div>
                            <div className="mt-3 text-xs text-gray-500">Points: {quiz.points || 10}</div>
                            {quiz.category && <div className="mt-1 text-xs text-gray-500">Category: {quiz.category}</div>}
                        </div>

                        <div className="flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setSelectedAnswer('')}
                                className="rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50"
                                disabled={submitting || !selectedAnswer || timeRemaining === 0}
                            >
                                Clear
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:opacity-50"
                                disabled={submitting || !selectedAnswer || timeRemaining === 0}
                            >
                                {submitting ? 'Submitting…' : timeRemaining === 0 ? 'Time Up!' : 'Submit Answer'}
                            </button>
                        </div>
                        {timeRemaining === 0 && !submitting && !result && (
                            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-2 text-center text-sm text-red-700">
                                {selectedAnswer ? "Time's up! Your answer has been automatically submitted." : "Time's up! No answer was selected."}
                            </div>
                        )}
                    </form>
                )}

                {result && (
                    <div className="mt-6 space-y-4">
                        <div className="rounded-lg border border-gray-200 bg-white p-4">
                            <div className="text-lg font-semibold text-gray-900">Your Result</div>
                            <div className="mt-2 text-sm text-gray-800">
                                Score:{' '}
                                <span className={`font-medium ${result.is_correct ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.score_percent}%
                                </span>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                                Points: {result.total_points_awarded} / {result.max_points}
                            </div>
                            <div
                                className={`mt-3 rounded-md px-3 py-2 text-sm ${result.is_correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
                            >
                                {result.is_correct ? (
                                    <span>✓ Correct! Well done.</span>
                                ) : (
                                    <span>
                                        ✗ Incorrect. The correct answer is: <strong>{result.correct_answer}</strong>
                                    </span>
                                )}
                                {result.explanation && (
                                    <div className="mt-2 text-xs">
                                        <strong>Explanation:</strong> {result.explanation}
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            type="button"
                            onClick={handleNextQuiz}
                            className="w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
                        >
                            Next Quiz
                        </button>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
