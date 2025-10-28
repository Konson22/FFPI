import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLayout from '../../../components/Layout/UserLayout';
import LessonPlayerScreen from '../../../lms/features/lesson/LessonPlayerScreen';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
});

function LessonPageContent({ user, courseId, lessonId }) {
    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <LessonPlayerScreen courseId={courseId} lessonId={lessonId} />
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

