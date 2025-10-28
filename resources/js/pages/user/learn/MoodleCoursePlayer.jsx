import { useState, useEffect } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function MoodleCoursePlayer({ user, courseId }) {
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCourseContent();
    }, [courseId]);

    const fetchCourseContent = async () => {
        try {
            const response = await fetch(`/api/lms/moodle/courses/${courseId}/content`);
            const data = await response.json();
            
            if (response.ok) {
                setCourse(data);
            } else {
                setError(data.message || 'Failed to load course content');
            }
        } catch (err) {
            setError('Failed to load course content');
        } finally {
            setLoading(false);
        }
    };

    const openInMoodle = () => {
        if (course?.course?.moodle_url) {
            window.open(course.course.moodle_url, '_blank');
        }
    };

    if (loading) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/learn">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading course content...</p>
                    </div>
                </div>
            </UserLayout>
        );
    }

    if (error) {
        return (
            <UserLayout user={user} role="user" currentPath="/user/learn">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-center">
                        <div className="text-red-600 text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Course</h2>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={() => window.history.back()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </UserLayout>
        );
    }

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div className="max-w-6xl mx-auto p-6">
                {/* Course Header */}
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                {course?.course?.title}
                            </h1>
                            <p className="text-gray-600 mb-4">
                                {course?.course?.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                    <span className="mr-1">🌐</span>
                                    Moodle Course
                                </span>
                                <span className="flex items-center">
                                    <span className="mr-1">📚</span>
                                    {course?.modules?.length || 0} Modules
                                </span>
                                <span className="flex items-center">
                                    <span className="mr-1">📖</span>
                                    {course?.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0} Lessons
                                </span>
                            </div>
                        </div>
                        <div className="ml-6">
                            <button
                                onClick={openInMoodle}
                                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                Open in Moodle
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Modules List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg">
                            <div className="p-6 border-b border-gray-200">
                                <h2 className="text-xl font-semibold text-gray-900">Course Modules</h2>
                                <p className="text-gray-600 mt-1">Click to expand and view lessons</p>
                            </div>
                            <div className="p-6">
                                {course?.modules?.length > 0 ? (
                                    <div className="space-y-4">
                                        {course.modules.map((module, index) => (
                                            <div key={module.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                                            <span className="text-blue-600 font-semibold text-sm">
                                                                {index + 1}
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium text-gray-900">{module.title}</h3>
                                                            <p className="text-sm text-gray-600">{module.description}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {module.lessons?.length || 0} lessons
                                                    </div>
                                                </div>
                                                
                                                {/* Lessons */}
                                                {module.lessons && module.lessons.length > 0 && (
                                                    <div className="mt-4 ml-11">
                                                        <div className="space-y-2">
                                                            {module.lessons.map((lesson, lessonIndex) => (
                                                                <div key={lesson.id} className="flex items-center text-sm text-gray-600">
                                                                    <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs">
                                                                        {lessonIndex + 1}
                                                                    </span>
                                                                    <span className="flex-1">{lesson.title}</span>
                                                                    <span className="text-xs text-gray-400">
                                                                        {lesson.lesson_type}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">📚</div>
                                        <p>No modules available</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Course Info Sidebar */}
                    <div className="space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <button
                                    onClick={openInMoodle}
                                    className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                    </svg>
                                    Open in Moodle
                                </button>
                                <button
                                    onClick={() => window.history.back()}
                                    className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                    Back to Learning Hub
                                </button>
                            </div>
                        </div>

                        {/* Course Stats */}
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Course Statistics</h3>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Modules</span>
                                    <span className="font-medium">{course?.modules?.length || 0}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Total Lessons</span>
                                    <span className="font-medium">
                                        {course?.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Platform</span>
                                    <span className="font-medium text-blue-600">Moodle</span>
                                </div>
                            </div>
                        </div>

                        {/* Help */}
                        <div className="bg-blue-50 rounded-lg p-6">
                            <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
                            <p className="text-blue-800 text-sm mb-3">
                                This course is hosted on Moodle. Click "Open in Moodle" to access the full course experience.
                            </p>
                            <p className="text-blue-700 text-xs">
                                You'll need to be enrolled in the course to access all content.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
