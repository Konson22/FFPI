import { Link, router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
});

function LessonPageContent({ user, courseId, lessonId, lesson, quizzes }) {
    const [showQuizModal, setShowQuizModal] = useState(false);
    const onSubmitQuiz = (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const answers = (quizzes || []).map((q) => ({
            quiz_id: q.id,
            answer: form.get(`answer_${q.id}`) || '',
        }));
        router.post(
            `/user/learn/module/${courseId}/lesson/${lessonId}/complete`,
            { answers },
            {
                preserveScroll: true,
                onFinish: () => setShowQuizModal(false),
            },
        );
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div className="mb-4 flex items-center justify-between">
                <Link href={`/user/learn/module/${courseId}`} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    ← Back to Module
                </Link>
            </div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">{lesson?.title}</h1>
                {lesson?.objective && <p className="mb-3 text-gray-600">{lesson.objective}</p>}
                {lesson?.content && <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content }} />}
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {lesson?.pdf_url && (
                        <a href={lesson.pdf_url} target="_blank" rel="noreferrer" className="text-red-600 hover:underline">
                            📄 View PDF
                        </a>
                    )}
                    {lesson?.video_url && (
                        <a href={lesson.video_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                            🎥 Watch Video
                        </a>
                    )}
                </div>
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Quick Quiz</h2>
                {!quizzes || quizzes.length === 0 ? (
                    <p className="text-sm text-gray-500">No quiz available for this lesson.</p>
                ) : (
                    <button
                        onClick={() => setShowQuizModal(true)}
                        className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                        Take Quiz
                    </button>
                )}
            </div>

            {showQuizModal && quizzes && quizzes.length > 0 && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-gray-200 p-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Lesson Quiz</h3>
                                <p className="text-sm text-gray-500">Answer all questions to complete the lesson</p>
                            </div>
                            <button
                                onClick={() => setShowQuizModal(false)}
                                className="rounded px-3 py-1 text-sm text-gray-600 hover:bg-gray-100"
                                aria-label="Close"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={onSubmitQuiz} className="space-y-4 p-6">
                            {quizzes.map((q, idx) => (
                                <div key={q.id}>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">
                                        {idx + 1}. {q.question}
                                    </label>
                                    <input
                                        type="text"
                                        name={`answer_${q.id}`}
                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                        placeholder="Your answer"
                                        autoComplete="off"
                                    />
                                </div>
                            ))}
                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowQuizModal(false)}
                                    className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                                    Submit Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}

export default function LessonPage(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <LessonPageContent {...props} />
        </QueryClientProvider>
    );
}
