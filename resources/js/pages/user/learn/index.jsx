import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

function LearnHubContent({ user, enrolledCourses, availableCourses, categories, enrolledCourseIds }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' or 'available'
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [enrolledCourseTitle, setEnrolledCourseTitle] = useState('');

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

    const handleEnroll = (courseId, courseTitle) => {
        router.post(
            `/user/learn/enroll/${courseId}`,
            {},
            {
                onSuccess: () => {
                    // Show success popup
                    setEnrolledCourseTitle(courseTitle);
                    setShowSuccessModal(true);
                },
                onError: (errors) => {
                    console.error('Enrollment failed:', errors);
                    alert('❌ Failed to enroll in the course. Please try again.');
                },
            },
        );
    };

    const handleStartLearning = (courseId) => {
        setShowSuccessModal(false);
        router.visit(`/user/learn/course/${courseId}`);
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
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                                getStatusColor(course.pivot?.status || 'enrolled') === 'blue'
                                                    ? 'bg-blue-100 text-blue-800'
                                                    : getStatusColor(course.pivot?.status || 'enrolled') === 'green'
                                                      ? 'bg-green-100 text-green-800'
                                                      : getStatusColor(course.pivot?.status || 'enrolled') === 'yellow'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : getStatusColor(course.pivot?.status || 'enrolled') === 'red'
                                                          ? 'bg-red-100 text-red-800'
                                                          : 'bg-gray-100 text-gray-800'
                                            }`}
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

                            <div className="p-4 sm:p-6">
                                <div className="mb-4">
                                    <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">{course.title}</h3>
                                    <p className="line-clamp-3 text-sm text-gray-600">{course.description}</p>
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
                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                            getDifficultyColor(course.difficulty_level || 'Beginner') === 'green'
                                                ? 'bg-green-100 text-green-800'
                                                : getDifficultyColor(course.difficulty_level || 'Beginner') === 'yellow'
                                                  ? 'bg-yellow-100 text-yellow-800'
                                                  : getDifficultyColor(course.difficulty_level || 'Beginner') === 'red'
                                                    ? 'bg-red-100 text-red-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {course.difficulty_level || 'Beginner'}
                                    </span>
                                    <span className="text-xs text-gray-500">{course.duration || '2 hours'}</span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {Array.isArray(course.target_audience) &&
                                            course.target_audience.slice(0, 2).map((aud, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {aud}
                                                </span>
                                            ))}
                                    </div>
                                    {activeTab === 'enrolled' ? (
                                        <Link
                                            href={`/user/learn/course/${course.id}`}
                                            className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                                        >
                                            <span>
                                                {course.pivot?.status === 'completed'
                                                    ? 'Review Course'
                                                    : course.pivot?.status === 'in_progress'
                                                      ? 'Continue Learning'
                                                      : 'Start Course'}
                                            </span>
                                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                            <Link
                                                href={`/user/learn/course/${course.id}`}
                                                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none active:scale-95"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                    />
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                                    />
                                                </svg>
                                                View Details
                                            </Link>
                                            <button
                                                onClick={() => handleEnroll(course.id, course.title)}
                                                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none active:scale-95"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                    />
                                                </svg>
                                                Enroll Now
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

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
                                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center">
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

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
                    <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="text-center">
                            {/* Success Icon */}
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            {/* Success Message */}
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Enrollment Successful!</h3>
                            <p className="mb-6 text-gray-600">
                                You have successfully enrolled in <span className="font-medium text-green-600">"{enrolledCourseTitle}"</span>
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                                <button
                                    onClick={() => setShowSuccessModal(false)}
                                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Stay Here
                                </button>
                                <button
                                    onClick={() =>
                                        handleStartLearning(
                                            enrolledCourses?.find((c) => c.title === enrolledCourseTitle)?.id ||
                                                availableCourses?.find((c) => c.title === enrolledCourseTitle)?.id,
                                        )
                                    }
                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    Start Learning
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </UserLayout>
    );
}

export default LearnHubContent;
