import { Link } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ModuleView({ user, module }) {
    const [selectedLesson, setSelectedLesson] = useState(null);

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
                            <span className="ml-2">{module.title}</span>
                        </li>
                    </ol>
                </nav>

                {/* Module Header */}
                <div className="mb-8 rounded-lg bg-white p-8 shadow">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <div className="mb-4 flex items-center space-x-3">
                                <span className="text-4xl">{module.icon || '📚'}</span>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
                                    <p className="text-lg text-gray-600">{module.category}</p>
                                </div>
                            </div>

                            <p className="mb-6 leading-relaxed text-gray-700">{module.description}</p>

                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Duration:</span>
                                    <span className="font-medium text-gray-900">{module.duration || '30 min'}</span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Difficulty:</span>
                                    <span
                                        className={`rounded-full px-3 py-1 text-sm font-medium bg-${getDifficultyColor(module.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(module.difficulty_level || 'Beginner')}-800`}
                                    >
                                        {module.difficulty_level || 'Beginner'}
                                    </span>
                                </div>

                                <div className="flex items-center space-x-2">
                                    <span className="text-sm text-gray-500">Lessons:</span>
                                    <span className="font-medium text-gray-900">{module.lessons?.length || 0}</span>
                                </div>

                                {module.target_audience && Array.isArray(module.target_audience) && (
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm text-gray-500">Audience:</span>
                                        <div className="flex flex-wrap gap-1">
                                            {module.target_audience.map((audience, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {audience}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="ml-6">
                            <button className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700">
                                Start Learning
                            </button>
                        </div>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Lessons</h2>

                    {module.lessons && module.lessons.length > 0 ? (
                        <div className="space-y-4">
                            {module.lessons.map((lesson, index) => (
                                <div
                                    key={lesson.id}
                                    className={`rounded-lg border p-6 transition-all hover:shadow-md ${
                                        selectedLesson === lesson.id ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
                                    }`}
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
                                                <span className="text-2xl">{getTypeIcon(lesson.type || 'article')}</span>
                                            </div>

                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-gray-500">Lesson {index + 1}</span>
                                                    {lesson.is_completed && (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                                                    )}
                                                </div>

                                                <h3 className="mb-2 text-lg font-semibold text-gray-900">{lesson.title}</h3>

                                                <p className="mb-3 text-gray-600">{lesson.description || 'No description available'}</p>

                                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>
                                                        {lesson.video_duration || lesson.duration_minutes
                                                            ? `${lesson.duration_minutes} min`
                                                            : '10 min'}
                                                    </span>
                                                    <span>•</span>
                                                    <span className="capitalize">{lesson.media_type || 'Article'}</span>
                                                    {lesson.pdf_url && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-red-600">📄 PDF</span>
                                                        </>
                                                    )}
                                                    {lesson.video_url && (
                                                        <>
                                                            <span>•</span>
                                                            <span className="text-blue-600">🎥 Video</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => setSelectedLesson(lesson.id)}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                            >
                                                View Details
                                            </button>

                                            {lesson.pdf_url && (
                                                <a
                                                    href={lesson.pdf_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700"
                                                >
                                                    📄 PDF
                                                </a>
                                            )}

                                            {lesson.video_url && (
                                                <a
                                                    href={lesson.video_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                                >
                                                    🎥 Video
                                                </a>
                                            )}

                                            <Link
                                                href={`/user/learn/${module.id}/lesson/${lesson.id}`}
                                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                            >
                                                Start Lesson
                                            </Link>
                                        </div>
                                    </div>

                                    {selectedLesson === lesson.id && (
                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                <div>
                                                    <h4 className="mb-2 font-medium text-gray-900">Learning Objectives</h4>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {lesson.objectives && lesson.objectives.length > 0 ? (
                                                            lesson.objectives.map((objective, objIndex) => (
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
                                                    <h4 className="mb-2 font-medium text-gray-900">Prerequisites</h4>
                                                    <div className="text-sm text-gray-600">
                                                        {lesson.prerequisites && lesson.prerequisites.length > 0 ? (
                                                            <ul className="space-y-1">
                                                                {lesson.prerequisites.map((prereq, prereqIndex) => (
                                                                    <li key={prereqIndex} className="flex items-start">
                                                                        <span className="mr-2">•</span>
                                                                        {prereq}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <span className="text-gray-400">None</span>
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
                            <h3 className="mb-2 text-lg font-medium text-gray-900">No lessons available</h3>
                            <p className="text-gray-500">This module doesn't have any lessons yet.</p>
                        </div>
                    )}
                </div>

                {/* Related Modules */}
                <div className="mb-8">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Modules</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {/* This would typically be populated with related modules from the backend */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6">
                            <div className="mb-4 flex items-center space-x-3">
                                <span className="text-2xl">📚</span>
                                <h3 className="text-lg font-semibold text-gray-900">Related Module 1</h3>
                            </div>
                            <p className="mb-4 text-gray-600">Description of related module...</p>
                            <Link href="#" className="font-medium text-blue-600 hover:text-blue-700">
                                View Module →
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
