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

function LessonPageContent({ user, moduleId, lessonId, lesson }) {
    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div className="mb-4 flex items-center justify-between">
                <Link href={`/user/learn/module/${moduleId}`} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                    ← Back to Module
                </Link>
            </div>
            <div className="mb-6 rounded-lg bg-white p-6 shadow">
                <h1 className="mb-2 text-2xl font-bold text-gray-900">{lesson?.title}</h1>
                {lesson?.content_html ? (
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.content_html }} />
                ) : lesson?.content_markdown ? (
                    <div className="prose max-w-none whitespace-pre-wrap text-gray-800">{lesson.content_markdown}</div>
                ) : (
                    <p className="text-sm text-gray-500">No content available for this lesson.</p>
                )}
            </div>
            <div className="rounded-lg bg-white p-6 shadow">
                <h2 className="mb-4 text-xl font-semibold text-gray-900">Lesson Quiz</h2>
                <div className="space-y-3">
                    <p className="text-sm text-gray-600">Complete the quiz to finish this lesson and unlock the next one.</p>
                    <Link
                        href={`/user/learn/module/${moduleId}/lesson/${lessonId}/quiz`}
                        className="inline-block rounded bg-green-600 px-6 py-2 text-sm font-medium text-white hover:bg-green-700"
                    >
                        Take Quiz
                    </Link>
                </div>
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
