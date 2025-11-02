import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

function LearnHubContent({ user, enrolledCourse, availableCourses, enrolledCourseIds, canEnrollMore }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('enrolled'); // 'enrolled' or 'available'
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [enrolledCourseTitle, setEnrolledCourseTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    // Handle flash messages
    useEffect(() => {
        if (flash?.error) {
            setErrorMessage(flash.error);
            setTimeout(() => setErrorMessage(''), 5000);
        }
        if (flash?.success) {
            setSuccessMessage(flash.success);
            setTimeout(() => setSuccessMessage(''), 5000);
            // Reload page to show updated enrollment
            if (flash.success.includes('Enrolled')) {
                setTimeout(() => router.reload(), 1000);
            }
        }
    }, [flash]);

    // Convert single enrolled course to array format for consistency
    const filteredEnrolledCourses = enrolledCourse ? [enrolledCourse] : [];

    const filteredAvailableCourses = availableCourses || [];

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
                {/* Flash Messages */}
                {errorMessage && (
                    <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p className="font-medium text-red-800">{errorMessage}</p>
                            <button onClick={() => setErrorMessage('')} className="ml-auto text-red-400 hover:text-red-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                {successMessage && (
                    <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="font-medium text-green-800">{successMessage}</p>
                            <button onClick={() => setSuccessMessage('')} className="ml-auto text-green-400 hover:text-green-600">
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div className="w-full sm:w-auto">
                            <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
                            <p className="mt-2 text-gray-600">Continue your enrolled courses and discover new ones</p>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-3 sm:flex sm:w-auto sm:items-center sm:space-x-6">
                            <div className="text-center sm:text-right">
                                <div className="text-xl font-bold text-gray-900 sm:text-2xl">{enrolledCourse ? 1 : 0}</div>
                                <div className="text-xs text-gray-500 sm:text-sm">Enrolled</div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-xl font-bold text-green-600 sm:text-2xl">
                                    {enrolledCourse?.pivot?.status === 'completed' ? 1 : 0}
                                </div>
                                <div className="text-xs text-gray-500 sm:text-sm">Completed</div>
                            </div>
                            <div className="text-center sm:text-right">
                                <div className="text-xl font-bold text-blue-600 sm:text-2xl">{availableCourses?.length || 0}</div>
                                <div className="text-xs text-gray-500 sm:text-sm">Available</div>
                            </div>
                            {!canEnrollMore && enrolledCourse && (
                                <div className="mt-2 rounded-md bg-yellow-50 p-2 text-xs text-yellow-800">
                                    <span className="font-medium">Note:</span> Complete your current module to unlock new enrollments
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="mb-6 sm:mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex gap-4 overflow-x-auto px-1 whitespace-nowrap sm:gap-8">
                            <button
                                onClick={() => setActiveTab('enrolled')}
                                className={`border-b-2 px-1 py-2 text-sm font-medium sm:px-2 ${
                                    activeTab === 'enrolled'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                My Enrolled Module ({enrolledCourse ? 1 : 0})
                            </button>
                            <button
                                onClick={() => setActiveTab('available')}
                                className={`border-b-2 px-1 py-2 text-sm font-medium sm:px-2 ${
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

                {/* Enrolled Module - Detailed View */}
                {activeTab === 'enrolled' && filteredEnrolledCourses.length > 0 && (
                    <div className="rounded-lg bg-white shadow-lg">
                        {filteredEnrolledCourses.map((course) => (
                            <div key={course.id} className="p-6">
                                {/* Status Badge */}
                                <div className="mb-4 flex items-center justify-end">
                                    <span
                                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                                            getStatusColor(course.pivot?.status || 'enrolled') === 'blue'
                                                ? 'bg-blue-100 text-blue-800'
                                                : getStatusColor(course.pivot?.status || 'enrolled') === 'green'
                                                  ? 'bg-green-100 text-green-800'
                                                  : getStatusColor(course.pivot?.status || 'enrolled') === 'yellow'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                        }`}
                                    >
                                        {course.pivot?.status || 'Enrolled'}
                                    </span>
                                </div>

                                {/* Module Title and Description */}
                                <div className="mb-6">
                                    <h2 className="mb-2 text-2xl font-bold text-gray-900">{course.title}</h2>
                                    <p className="text-gray-600">{course.description}</p>
                                </div>

                                {/* Progress Overview */}
                                <div className="mb-6 rounded-lg bg-gray-50 p-4">
                                    <div className="mb-3">
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-700">Overall Progress</span>
                                            <span className="font-bold text-gray-900">{getProgressPercentage(course)}%</span>
                                        </div>
                                        <div className="h-3 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-3 rounded-full bg-green-600 transition-all duration-300"
                                                style={{ width: `${getProgressPercentage(course)}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <span className="text-gray-500">Completed Lessons</span>
                                            <div className="text-lg font-semibold text-gray-900">
                                                {getCompletedLessons(course)} / {getTotalLessons(course)}
                                            </div>
                                        </div>
                                        <div>
                                            <span className="text-gray-500">Difficulty</span>
                                            <div className="text-lg font-semibold text-gray-900">{course.difficulty_level || 'Beginner'}</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Lessons List */}
                                <div className="mb-6">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Lessons</h3>
                                    <div className="space-y-3">
                                        {course.modules?.[0]?.lessons?.map((lesson, index) => (
                                            <div
                                                key={lesson.id}
                                                className={`flex items-center justify-between rounded-lg border p-4 ${
                                                    lesson.is_completed ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                                                }`}
                                            >
                                                <div className="flex flex-1 items-start gap-4">
                                                    <div
                                                        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                                                            lesson.is_completed ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                                                        }`}
                                                    >
                                                        {index + 1}
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-gray-900">{lesson.title}</h4>
                                                        {lesson.objective && <p className="mt-1 text-sm text-gray-600">{lesson.objective}</p>}
                                                    </div>
                                                </div>
                                                <div className="ml-4 flex items-center gap-4">
                                                    {lesson.quiz_score !== null && (
                                                        <div className="text-right">
                                                            <div className="text-xs text-gray-500">Score</div>
                                                            <div
                                                                className={`text-sm font-semibold ${
                                                                    lesson.quiz_score >= 75
                                                                        ? 'text-green-600'
                                                                        : lesson.quiz_score >= 50
                                                                          ? 'text-yellow-600'
                                                                          : 'text-red-600'
                                                                }`}
                                                            >
                                                                {lesson.quiz_score}%
                                                            </div>
                                                        </div>
                                                    )}
                                                    {lesson.is_completed && (
                                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    )}
                                                </div>
                                            </div>
                                        )) || <p className="text-center text-gray-500">No lessons available</p>}
                                    </div>
                                </div>

                                {/* Action Button */}
                                <div className="flex justify-end">
                                    <Link
                                        href={`/user/learn/module/${course.id}`}
                                        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
                                    >
                                        <span>
                                            {course.pivot?.status === 'completed'
                                                ? 'Review Module'
                                                : course.pivot?.status === 'started'
                                                  ? 'Continue Learning'
                                                  : 'Start Learning'}
                                        </span>
                                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Available Courses - Grid View */}
                {activeTab === 'available' && (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {filteredAvailableCourses.map((course) => (
                            <div key={course.id} className="rounded-lg bg-white shadow transition-all hover:shadow-lg">
                                <div className="p-4 sm:p-6">
                                    {/* Status Badge */}
                                    <div className="mb-3 flex items-center justify-end">
                                        <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                            Available
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900 sm:text-lg">{course.title}</h3>
                                        <p className="line-clamp-3 text-sm text-gray-600">{course.description}</p>
                                    </div>

                                    {/* Course Stats */}
                                    <div className="mb-4 space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Duration</span>
                                            <span className="font-medium text-gray-900">{course.duration || '2 hours'}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Lessons</span>
                                            <span className="font-medium text-gray-900">{getTotalLessons(course)}</span>
                                        </div>
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
                                            {canEnrollMore ? (
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
                                            ) : (
                                                <button
                                                    disabled
                                                    className="inline-flex cursor-not-allowed items-center justify-center rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-500"
                                                    title="Please complete your current module before enrolling in a new one"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                        />
                                                    </svg>
                                                    Complete Current Module First
                                                </button>
                                            )}
                                        </div>
                                    </div>
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
                                {activeTab === 'enrolled' ? 'No enrolled module found' : 'No available courses found'}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                                {activeTab === 'enrolled'
                                    ? "You haven't enrolled in any module yet. Switch to Available Courses to discover new ones."
                                    : 'No available courses found.'}
                            </p>
                            {activeTab === 'enrolled' && !enrolledCourse && (
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
                                            enrolledCourse?.title === enrolledCourseTitle
                                                ? enrolledCourse.id
                                                : availableCourses?.find((c) => c.title === enrolledCourseTitle)?.id,
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
