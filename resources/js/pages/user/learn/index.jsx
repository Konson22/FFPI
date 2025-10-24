import { useState } from 'react';
import { router } from '@inertiajs/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import UserLayout from '../../../components/Layout/UserLayout';
import { useCourses, useEnroll } from '../../../lms/hooks/useLmsQuery';
import { lmsAnalytics } from '../../../lms/services/analytics/lmsAnalyticsService';

// Create QueryClient for LMS data
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            retry: 2,
        },
    },
});

function LearnHubContent({ user, categories, audiences }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedAudience, setSelectedAudience] = useState('all');

    // Fetch courses from LMS backend
    const { data: courses, isLoading } = useCourses({
        categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
    });

    const enrollMutation = useEnroll();

    // Filter by audience (client-side for now)
    const filteredContent = courses?.filter((course) => {
        if (selectedAudience === 'all') return true;
        // Add audience filtering logic if needed
        return true;
    }) || [];

    const handleStartLearning = async (course) => {
        if (course.isEnrolled) {
            // Navigate to course
            router.visit(`/user/learn/courses/${course.id}`);
        } else {
            // Enroll first
            try {
                await enrollMutation.mutateAsync(course.id);
                lmsAnalytics.enrollCourse(course.id);
                router.visit(`/user/learn/courses/${course.id}`);
            } catch (error) {
                console.error('Enrollment failed:', error);
            }
        }
    };

    const getDifficultyColor = (difficulty) => {
        const level = difficulty?.toLowerCase();
        switch (level) {
            case 'beginner':
                return 'green';
            case 'intermediate':
                return 'yellow';
            case 'advanced':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Learn Hub</h1>
                    <p className="mt-2 text-gray-600">Educational content on sexual and reproductive health and rights</p>
                </div>

                {/* Filters */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {/* Category Filter */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Category</label>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setSelectedCategory(category.id)}
                                        className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                                            selectedCategory === category.id
                                                ? 'border-2 border-green-200 bg-green-100 text-green-800'
                                                : 'border-2 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <span className="mr-2">{category.icon || '📚'}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Audience Filter */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Audience</label>
                            <div className="flex flex-wrap gap-2">
                                {audiences.map((audience) => (
                                    <button
                                        key={audience.id}
                                        onClick={() => setSelectedAudience(audience.id)}
                                        className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                                            selectedAudience === audience.id
                                                ? 'border-2 border-blue-200 bg-blue-100 text-blue-800'
                                                : 'border-2 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {audience.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex items-center justify-center py-12">
                        <div className="text-center">
                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-green-600 border-r-transparent"></div>
                            <p className="mt-4 text-gray-600">Loading courses...</p>
                        </div>
                    </div>
                )}

                {/* Content Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredContent.map((course) => (
                            <div key={course.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
                                {/* Course Image */}
                                <div className="aspect-w-16 aspect-h-9">
                                    {course.coverUrl ? (
                                        <img src={course.coverUrl} alt={course.title} className="h-48 w-full rounded-t-lg object-cover" />
                                    ) : (
                                        <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-green-400 to-blue-500">
                                            <span className="text-6xl">📚</span>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    {/* Rating */}
                                    <div className="mb-2 flex items-center justify-between">
                                        {course.category && (
                                            <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                {course.category.name}
                                            </span>
                                        )}
                                        {course.rating && (
                                            <div className="flex items-center space-x-1">
                                                <span className="text-yellow-400">⭐</span>
                                                <span className="text-sm text-gray-600">{course.rating}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">{course.title}</h3>

                                    {/* Description */}
                                    <p className="mb-4 line-clamp-3 text-sm text-gray-600">{course.summary || course.description}</p>

                                    {/* Meta Info */}
                                    <div className="mb-4 flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            {course.difficulty && (
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-medium capitalize bg-${getDifficultyColor(course.difficulty)}-100 text-${getDifficultyColor(course.difficulty)}-800`}
                                                >
                                                    {course.difficulty}
                                                </span>
                                            )}
                                            {course.duration && course.duration > 0 && (
                                                <span className="text-xs text-gray-500">{Math.round(course.duration / 60)} min</span>
                                            )}
                                        </div>
                                        {course.enrollmentCount !== undefined && (
                                            <span className="text-xs text-gray-500">{course.enrollmentCount} enrolled</span>
                                        )}
                                    </div>

                                    {/* Progress Bar (if enrolled) */}
                                    {course.isEnrolled && course.progress !== undefined && (
                                        <div className="mb-4">
                                            <div className="mb-1 flex items-center justify-between text-xs">
                                                <span className="text-gray-600">Progress</span>
                                                <span className="font-medium text-green-600">{course.progress}%</span>
                                            </div>
                                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                                                <div
                                                    className="h-full rounded-full bg-green-600 transition-all duration-300"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Action Button */}
                                    <button
                                        onClick={() => handleStartLearning(course)}
                                        disabled={enrollMutation.isPending}
                                        className={`w-full rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors ${
                                            course.isEnrolled
                                                ? 'bg-green-600 hover:bg-green-700'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                        } disabled:opacity-50`}
                                    >
                                        {enrollMutation.isPending ? 'Loading...' : course.isEnrolled ? 'Continue Learning' : 'Start Learning'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && filteredContent.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to see more content.</p>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}

// Wrap with QueryClientProvider
export default function LearnHub(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <LearnHubContent {...props} />
        </QueryClientProvider>
    );
}
