import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

function LearnHubContent({ user, enrolledCourse, enrolledCourses, availableCourses, enrolledCourseIds, canEnrollMore }) {
    const { flash } = usePage().props;
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

    // Use enrolledCourses array if available, otherwise fallback to enrolledCourse
    const enrolledModules = enrolledCourses && enrolledCourses.length > 0 ? enrolledCourses : enrolledCourse ? [enrolledCourse] : [];
    const availableModules = availableCourses || [];

    const getStatusColor = (status) => {
        switch (status) {
            case 'enrolled':
                return 'bg-blue-100 text-blue-800';
            case 'started':
                return 'bg-yellow-100 text-yellow-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getProgressPercentage = (module) => {
        return module.pivot?.progress_percentage || 0;
    };

    const getTotalLessons = (module) => {
        return module.modules?.reduce((total, mod) => total + (mod.lessons?.length || 0), 0) || 0;
    };

    const getCompletedLessons = (module) => {
        const lessons = module.modules?.[0]?.lessons || [];
        return lessons.filter((l) => l.is_completed).length;
    };

    const handleEnroll = (moduleId, moduleTitle) => {
        router.post(
            `/user/learn/enroll/${moduleId}`,
            {},
            {
                onSuccess: () => {
                    setSuccessMessage(`Successfully enrolled in ${moduleTitle}`);
                },
                onError: (errors) => {
                    console.error('Enrollment failed:', errors);
                    setErrorMessage('Failed to enroll in the module. Please try again.');
                },
            },
        );
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
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
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
                    <p className="mt-2 text-gray-600">Continue your enrolled modules and discover new ones</p>
                </div>

                {/* Main Content - Two Column Layout */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left Column - Enrolled Modules (2/3 width on large screens) */}
                    <div className="lg:col-span-2">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-900">My Enrolled Modules</h2>
                            <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                {enrolledModules.length} {enrolledModules.length === 1 ? 'Module' : 'Modules'}
                            </span>
                        </div>

                        {enrolledModules.length > 0 ? (
                            <div className="space-y-6">
                                {enrolledModules.map((module) => {
                                    const progress = getProgressPercentage(module);
                                    const totalLessons = getTotalLessons(module);
                                    const completedLessons = getCompletedLessons(module);
                                    const lessons = module.modules?.[0]?.lessons || [];
                                    const firstIncompleteIndex = lessons.findIndex((l) => !l.is_completed);

                                    return (
                                        <div key={module.id} className="rounded-lg border border-gray-200 bg-white shadow-sm">
                                            <div className="p-6">
                                                {/* Module Header */}
                                                <div className="mb-4 flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <div className="mb-2 flex items-center gap-3">
                                                            <h3 className="text-xl font-bold text-gray-900">{module.title}</h3>
                                                            <span
                                                                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(module.pivot?.status || 'enrolled')}`}
                                                            >
                                                                {module.pivot?.status || 'Enrolled'}
                                                            </span>
                                                        </div>
                                                        <p className="text-sm text-gray-600">{module.description}</p>
                                                    </div>
                                                </div>

                                                {/* Progress Bar */}
                                                <div className="mb-6">
                                                    <div className="mb-2 flex items-center justify-between text-sm">
                                                        <span className="font-medium text-gray-700">Progress</span>
                                                        <span className="font-semibold text-gray-900">{progress}%</span>
                                                    </div>
                                                    <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                                                            style={{ width: `${progress}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                                                        <span>
                                                            {completedLessons} of {totalLessons} lessons completed
                                                        </span>
                                                        <span>{totalLessons - completedLessons} remaining</span>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="flex items-center justify-between gap-4">
                                                    <Link
                                                        href={`/user/learn/module/${module.id}`}
                                                        className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-center text-sm font-medium text-white transition-colors hover:bg-green-700"
                                                    >
                                                        {module.pivot?.status === 'completed' ? 'Review Module' : 'Continue Learning'}
                                                    </Link>
                                                    {firstIncompleteIndex !== -1 && lessons[firstIncompleteIndex] && (
                                                        <Link
                                                            href={`/user/learn/module/${module.id}/lesson/${lessons[firstIncompleteIndex].id}`}
                                                            className="rounded-lg border border-green-600 px-4 py-2 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
                                                        >
                                                            Start Next Lesson
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center shadow-sm">
                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                                <h3 className="mt-4 text-lg font-medium text-gray-900">No enrolled modules</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Start your learning journey by enrolling in a module from the available courses.
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Available Modules (1/3 width on large screens) */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="mb-4 flex items-center justify-between">
                                <h2 className="text-xl font-semibold text-gray-900">Available Modules</h2>
                                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
                                    {availableModules.length}
                                </span>
                            </div>

                            {availableModules.length > 0 ? (
                                <div className="space-y-4">
                                    {availableModules
                                        .filter((module) => !enrolledCourseIds.includes(module.id))
                                        .map((module) => {
                                            const totalLessons = getTotalLessons(module);
                                            return (
                                                <div
                                                    key={module.id}
                                                    className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                                                >
                                                    <h3 className="mb-2 line-clamp-2 text-base font-semibold text-gray-900">{module.title}</h3>
                                                    <p className="mb-3 line-clamp-2 text-xs text-gray-600">{module.description}</p>

                                                    <div className="mb-3 flex items-center justify-between text-xs text-gray-500">
                                                        <span>{totalLessons} lessons</span>
                                                        <span className="rounded-full bg-gray-100 px-2 py-1 text-xs font-medium">
                                                            {module.difficulty_level || 'Beginner'}
                                                        </span>
                                                    </div>

                                                    <button
                                                        onClick={() => handleEnroll(module.id, module.title)}
                                                        className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                                    >
                                                        Enroll Now
                                                    </button>
                                                </div>
                                            );
                                        })}

                                    {availableModules.filter((module) => !enrolledCourseIds.includes(module.id)).length === 0 && (
                                        <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                                            <p className="text-sm text-gray-500">All available modules have been enrolled.</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-gray-200 bg-white p-6 text-center">
                                    <p className="text-sm text-gray-500">No available modules at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}

export default LearnHubContent;
