import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
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

function LearnHubContent({ user, enrolledCourses, availableCourses, categories, enrolledCourseIds }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' or 'available'

    const filteredEnrolledCourses =
        enrolledCourses?.filter((course) => {
            const categoryMatch = selectedCategory === 'all' || course.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
            const statusMatch = selectedStatus === 'all' || course.pivot?.status === selectedStatus;
            return categoryMatch && statusMatch;
        }) || [];

    const filteredAvailableCourses =
        availableCourses?.filter((course) => {
            const categoryMatch = selectedCategory === 'all' || course.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
            return categoryMatch;
        }) || [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'enrolled':
                return 'blue';
            case 'in_progress':
                return 'yellow';
            case 'completed':
                return 'green';
            case 'dropped':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'enrolled':
                return '📚';
            case 'in_progress':
                return '🚀';
            case 'completed':
                return '✅';
            case 'dropped':
                return '❌';
            default:
                return '📖';
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

    const getProgressPercentage = (course) => {
        return course.pivot?.progress_percentage || 0;
    };

    const getTotalLessons = (course) => {
        return course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;
    };

    const getCompletedLessons = (course) => {
        // This would be calculated based on user progress
        return Math.floor((getProgressPercentage(course) / 100) * getTotalLessons(course));
    };

    const handleEnroll = (courseId) => {
        router.post(
            `/user/learn/enroll/${courseId}`,
            {},
            {
                onSuccess: () => {
                    // Refresh the page to update enrollment status
                    router.reload();
                },
                onError: (errors) => {
                    console.error('Enrollment failed:', errors);
                },
            },
        );
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div>
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
                            <p className="mt-2 text-gray-600">Continue your enrolled courses and discover new ones</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">{enrolledCourses?.length || 0}</div>
                                <div className="text-sm text-gray-500">Enrolled Courses</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-green-600">
                                    {enrolledCourses?.filter((c) => c.pivot?.status === 'completed').length || 0}
                                </div>
                                <div className="text-sm text-gray-500">Completed</div>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-blue-600">{availableCourses?.length || 0}</div>
                                <div className="text-sm text-gray-500">Available</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab('enrolled')}
                                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                                    activeTab === 'enrolled'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                My Enrolled Courses ({enrolledCourses?.length || 0})
                            </button>
                            <button
                                onClick={() => setActiveTab('available')}
                                className={`border-b-2 px-1 py-2 text-sm font-medium ${
                                    activeTab === 'available'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                Available Courses ({availableCourses?.length || 0})
                            </button>
                        </nav>
                    </div>
                </div>
                {/* Filters */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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

                        {/* Status Filter - Only show for enrolled courses */}
                        {activeTab === 'enrolled' && (
                            <div>
                                <label className="mb-3 block text-sm font-medium text-gray-700">Status</label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: 'all', name: 'All', icon: '📚' },
                                        { id: 'enrolled', name: 'Enrolled', icon: '📚' },
                                        { id: 'in_progress', name: 'In Progress', icon: '🚀' },
                                        { id: 'completed', name: 'Completed', icon: '✅' },
                                    ].map((status) => (
                                        <button
                                            key={status.id}
                                            onClick={() => setSelectedStatus(status.id)}
                                            className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                                                selectedStatus === status.id
                                                    ? 'border-2 border-blue-200 bg-blue-100 text-blue-800'
                                                    : 'border-2 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                        >
                                            <span className="mr-2">{status.icon}</span>
                                            {status.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Course Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {(activeTab === 'enrolled' ? filteredEnrolledCourses : filteredAvailableCourses).map((course) => (
                        <div key={course.id} className="rounded-lg bg-white shadow transition-all hover:shadow-lg">
                            {/* Course Header */}
                            <div className="relative">
                                <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-blue-50 to-green-50">
                                    <span className="text-6xl">{course.icon || '📚'}</span>
                                </div>

                                {/* Status Badge */}
                                <div className="absolute top-4 right-4">
                                    {activeTab === 'enrolled' ? (
                                        <span
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-${getStatusColor(course.pivot?.status || 'enrolled')}-100 text-${getStatusColor(course.pivot?.status || 'enrolled')}-800`}
                                        >
                                            <span className="mr-1">{getStatusIcon(course.pivot?.status || 'enrolled')}</span>
                                            {course.pivot?.status || 'Enrolled'}
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                            <span className="mr-1">📚</span>
                                            Available
                                        </span>
                                    )}
                                </div>

                                {/* Progress Bar - Only for enrolled courses */}
                                {activeTab === 'enrolled' && (
                                    <div className="absolute right-0 bottom-0 left-0 h-2 rounded-b-lg bg-gray-200">
                                        <div
                                            className="h-2 rounded-b-lg bg-green-600 transition-all duration-300"
                                            style={{ width: `${getProgressPercentage(course)}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">{course.title}</h3>
                                    <p className="line-clamp-2 text-sm text-gray-600">{course.description}</p>
                                </div>

                                {/* Course Stats */}
                                <div className="mb-4 space-y-2">
                                    {activeTab === 'enrolled' ? (
                                        <>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Progress</span>
                                                <span className="font-medium text-gray-900">{getProgressPercentage(course)}%</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Lessons</span>
                                                <span className="font-medium text-gray-900">
                                                    {getCompletedLessons(course)} of {getTotalLessons(course)} completed
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Modules</span>
                                                <span className="font-medium text-gray-900">{course.modules?.length || 0}</span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Duration</span>
                                                <span className="font-medium text-gray-900">{course.duration || '2 hours'}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Lessons</span>
                                                <span className="font-medium text-gray-900">{getTotalLessons(course)}</span>
                                            </div>
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-500">Modules</span>
                                                <span className="font-medium text-gray-900">{course.modules?.length || 0}</span>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/* Course Meta */}
                                <div className="mb-4 flex items-center justify-between">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(course.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(course.difficulty_level || 'Beginner')}-800`}
                                    >
                                        {course.difficulty_level || 'Beginner'}
                                    </span>
                                    <span className="text-xs text-gray-500">{course.duration || '2 hours'}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {Array.isArray(course.target_audience) &&
                                            course.target_audience.slice(0, 2).map((aud, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {aud}
                                                </span>
                                            )}
                                    </div>
                                    {activeTab === 'enrolled' ? (
                                        <Link
                                            href={`/user/learn/course/${course.id}`}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                        >
                                            {course.pivot?.status === 'completed'
                                                ? 'Review'
                                                : course.pivot?.status === 'in_progress'
                                                  ? 'Continue'
                                                  : 'Start'}
                                        </Link>
                                    ) : (
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/user/learn/course/${course.id}`}
                                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() => handleEnroll(course.id)}
                                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                            >
                                                Enroll Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {(activeTab === 'enrolled' ? filteredEnrolledCourses : filteredAvailableCourses).length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">
                                {activeTab === 'enrolled' ? 'No enrolled courses found' : 'No available courses found'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {activeTab === 'enrolled'
                                    ? enrolledCourses?.length === 0
                                        ? "You haven't enrolled in any courses yet. Switch to Available Courses to discover new ones."
                                        : 'Try adjusting your filters to see more content.'
                                    : 'Try adjusting your filters to see more content.'}
                            </p>
                            {activeTab === 'enrolled' && enrolledCourses?.length === 0 && (
                                <div className="mt-4">
                                    <button
                                        onClick={() => setActiveTab('available')}
                                        className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                    >
                                        Browse Available Courses
                                    </button>
                                </div>
                            )}
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
