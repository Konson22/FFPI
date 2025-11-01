import { Link } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Lesson Quiz</h2>
                {!quizzes || quizzes.length === 0 ? (
                    <p className="text-sm text-gray-500">No quiz available for this lesson.</p>
                ) : (
                    <div className="space-y-3">
                        <p className="text-sm text-gray-600">
                            This lesson has {quizzes.length} question{quizzes.length !== 1 ? 's' : ''}. Answer all questions correctly to complete the
                            lesson.
                        </p>
                        <Link
                            href={`/user/learn/module/${courseId}/lesson/${lessonId}/quiz`}
                            className="inline-block rounded bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                        >
                            Take Quiz
                        </Link>
                    </div>
                )}
            </div>
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
