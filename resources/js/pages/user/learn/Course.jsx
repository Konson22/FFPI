import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLayout from '../../../components/Layout/UserLayout';
import CourseScreen from '../../../lms/features/course/CourseScreen';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
});

function CoursePageContent({ user, courseId }) {
    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <CourseScreen courseId={courseId} />
        </UserLayout>
    );
}

export default function CoursePage(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <CoursePageContent {...props} />
        </QueryClientProvider>
    );
}

