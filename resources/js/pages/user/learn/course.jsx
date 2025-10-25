import { Link } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function CourseView({ user, course, modules }) {
    const [selectedModule, setSelectedModule] = useState(null);
    const [progress, setProgress] = useState(0); // This would come from user progress data

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'green';
            case 'Intermediate':
                return 'yellow';
            case 'Advanced':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return '🎥';
            case 'infographic':
                return '📊';
            case 'article':
                return '📄';
            case 'quiz':
                return '❓';
            default:
                return '📚';
        }
    };

    const calculateProgress = () => {
        if (!modules || modules.length === 0) return 0;
        const completedModules = modules.filter((module) => module.is_completed).length;
        return Math.round((completedModules / modules.length) * 100);
    };

    const totalLessons = modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;
    const completedLessons =
        modules?.reduce((total, module) => total + (module.lessons?.filter((lesson) => lesson.is_completed).length || 0), 0) || 0;

    return (
        <UserLayout user={user} role="user" currentPath="/user/learn">
            <div>
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li>
                            <Link href="/user/learn" className="hover:text-gray-700">
                                Learn Hub
                            </Link>
                        </li>
                        <li className="flex items-center">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="ml-2">{course.title}</span>
                        </li>
                    </ol>
                </nav>

                {/* Course Header */}
                <div className="mb-8 rounded-lg bg-white p-8 shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="mb-4 flex items-center space-x-3">
                                <span className="text-4xl">{course.icon || '📚'}</span>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                                    <p className="text-lg text-gray-600">{course.category}</p>
                                </div>
                            </div>

                            <p className="mb-6 leading-relaxed text-gray-700">{course.description}</p>

                            <div className="mb-6 flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Duration:</span>
                                    <span className="font-medium text-gray-900">{course.duration || '2 hours'}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Difficulty:</span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium bg-${getDifficultyColor(course.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(course.difficulty_level || 'Beginner')}-800`}
                                    >
                                        {course.difficulty_level || 'Beginner'}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Modules:</span>
                                    <span className="font-medium text-gray-900">{modules?.length || 0}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Lessons:</span>
                                    <span className="font-medium text-gray-900">{totalLessons}</span>
                                </div>

                                {course.target_audience && Array.isArray(course.target_audience) && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">Audience:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {course.target_audience.map((audience, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {audience}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-medium text-gray-700">Course Progress</span>
                                    <span className="text-sm text-gray-500">{calculateProgress()}% Complete</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-2 rounded-full bg-green-600 transition-all duration-300"
                                        style={{ width: `${calculateProgress()}%` }}
                                    ></div>
                                </div>
                                <div className="mt-1 text-xs text-gray-500">
                                    {completedLessons} of {totalLessons} lessons completed
                                </div>
                            </div>
                        </div>

                        <div className="ml-6 flex flex-col space-y-3">
                            <button className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700">
                                {calculateProgress() > 0 ? 'Continue Learning' : 'Start Course'}
                            </button>
                            <button className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50">
                                Bookmark
                            </button>
                        </div>
                    </div>
                </div>

                {/* Course Modules */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Course Modules</h2>

                    {modules && modules.length > 0 ? (
                        <div className="space-y-4">
                            {modules.map((module, index) => (
                                <div
                                    key={module.id}
                                    className={`rounded-lg border p-6 transition-all hover:shadow-md ${
                                        selectedModule === module.id ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                                                <span className="text-2xl">{module.icon || '📚'}</span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-500">Module {index + 1}</span>
                                                    {module.is_completed && (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                                                    )}
                                                </div>

                                                <h3 className="mb-2 text-lg font-semibold text-gray-900">{module.title}</h3>

                                                <p className="mb-3 text-gray-600">{module.description || 'No description available'}</p>

                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>{module.lessons?.length || 0} lessons</span>
                                                    <span>•</span>
                                                    <span>{module.duration || '30 min'}</span>
                                                    <span>•</span>
                                                    <span className="capitalize">{module.difficulty_level || 'Beginner'}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setSelectedModule(module.id)}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                            >
                                                View Details
                                            </button>

                                            <Link
                                                href={`/user/learn/module/${module.id}`}
                                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                            >
                                                Start Module
                                            </Link>
                                        </div>
                                    </div>

                                    {selectedModule === module.id && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <h4 className="mb-2 font-medium text-gray-900">Learning Objectives</h4>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {module.objectives && module.objectives.length > 0 ? (
                                                            module.objectives.map((objective, objIndex) => (
                                                                <li key={objIndex} className="flex items-start">
                                                                    <span className="mr-2">•</span>
                                                                    {objective}
                                                                </li>
                                                            ))
                                                        ) : (
                                                            <li className="text-gray-400">No objectives specified</li>
                                                        )}
                                                    </ul>
                                                </div>

                                                <div>
                                                    <h4 className="mb-2 font-medium text-gray-900">Lessons Preview</h4>
                                                    <div className="text-sm text-gray-600">
                                                        {module.lessons && module.lessons.length > 0 ? (
                                                            <ul className="space-y-1">
                                                                {module.lessons.slice(0, 3).map((lesson, lessonIndex) => (
                                                                    <li key={lessonIndex} className="flex items-center">
                                                                        <span className="mr-2">{getTypeIcon(lesson.type || 'article')}</span>
                                                                        {lesson.title}
                                                                    </li>
                                                                ))}
                                                                {module.lessons.length > 3 && (
                                                                    <li className="text-gray-400">+{module.lessons.length - 3} more lessons</li>
                                                                )}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-gray-400">No lessons available</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
                            <div className="mb-4 text-gray-400">
                                <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-medium text-gray-900">No modules available</h3>
                            <p className="text-gray-500">This course doesn't have any modules yet.</p>
                        </div>
                    )}
                </div>

                {/* Course Statistics */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Total Lessons</p>
                                <p className="text-2xl font-semibold text-gray-900">{totalLessons}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Completed</p>
                                <p className="text-2xl font-semibold text-gray-900">{completedLessons}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-500">Time Spent</p>
                                <p className="text-2xl font-semibold text-gray-900">{course.duration || '2h'}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Courses */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Courses</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* This would typically be populated with related courses from the backend */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center space-x-3">
                                <span className="text-2xl">📚</span>
                                <h3 className="text-lg font-semibold text-gray-900">Related Course 1</h3>
                            </div>
                            <p className="mb-4 text-gray-600">Description of related course...</p>
                            <Link href="#" className="font-medium text-blue-600 hover:text-blue-700">
                                View Course →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
