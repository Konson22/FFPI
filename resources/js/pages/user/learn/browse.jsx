import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function BrowseCourses({ user, courses, categories, enrolledCourseIds }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredContent =
        courses?.filter((course) => {
            const categoryMatch = selectedCategory === 'all' || course.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
            const difficultyMatch = selectedDifficulty === 'all' || course.difficulty_level?.toLowerCase() === selectedDifficulty;
            const searchMatch =
                searchQuery === '' ||
                course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.description?.toLowerCase().includes(searchQuery.toLowerCase());

            return categoryMatch && difficultyMatch && searchMatch;
        }) || [];

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

    const isEnrolled = (courseId) => {
        return enrolledCourseIds?.includes(courseId) || false;
    };

    const getTotalLessons = (course) => {
        return course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0;
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
                            <h1 className="text-3xl font-bold text-gray-900">Browse Courses</h1>
                            <p className="mt-2 text-gray-600">Discover new courses and expand your knowledge</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/user/learn"
                                className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                            >
                                ← Back to My Learning
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow">
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        {/* Search */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Search Courses</label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 py-2 pr-3 pl-10 text-sm placeholder-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none"
                                />
                            </div>
                        </div>

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
                                        <span className="mr-2">{category.icon}</span>
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Difficulty</label>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    { id: 'all', name: 'All Levels', icon: '📚' },
                                    { id: 'beginner', name: 'Beginner', icon: '🌱' },
                                    { id: 'intermediate', name: 'Intermediate', icon: '🚀' },
                                    { id: 'advanced', name: 'Advanced', icon: '⚡' },
                                ].map((difficulty) => (
                                    <button
                                        key={difficulty.id}
                                        onClick={() => setSelectedDifficulty(difficulty.id)}
                                        className={`inline-flex items-center rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                                            selectedDifficulty === difficulty.id
                                                ? 'border-2 border-blue-200 bg-blue-100 text-blue-800'
                                                : 'border-2 border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        <span className="mr-2">{difficulty.icon}</span>
                                        {difficulty.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results Summary */}
                <div className="mb-6 flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                        Showing {filteredContent.length} of {courses?.length || 0} courses
                    </div>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Sort by:</span>
                        <select className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-none">
                            <option value="newest">Newest First</option>
                            <option value="popular">Most Popular</option>
                            <option value="rating">Highest Rated</option>
                            <option value="duration">Duration</option>
                        </select>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredContent.map((course) => (
                        <div key={course.id} className="rounded-lg bg-white shadow transition-all hover:shadow-lg">
                            {/* Course Header */}
                            <div className="relative">
                                <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-blue-50 to-green-50">
                                    <span className="text-6xl">{course.icon || '📚'}</span>
                                </div>

                                {/* Enrollment Status */}
                                {isEnrolled(course.id) && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                            <span className="mr-1">✅</span>
                                            Enrolled
                                        </span>
                                    </div>
                                )}

                                {/* Course Rating */}
                                <div className="absolute bottom-4 left-4">
                                    <div className="flex items-center space-x-1 rounded-lg bg-white/90 px-2 py-1">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-sm font-medium text-gray-900">4.5</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-4">
                                    <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">{course.title}</h3>
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
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500">Modules</span>
                                        <span className="font-medium text-gray-900">{course.modules?.length || 0}</span>
                                    </div>
                                </div>

                                {/* Course Meta */}
                                <div className="mb-4 flex items-center justify-between">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(course.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(course.difficulty_level || 'Beginner')}-800`}
                                    >
                                        {course.difficulty_level || 'Beginner'}
                                    </span>
                                    <span className="text-xs text-gray-500">{course.category}</span>
                                </div>

                                {/* Target Audience */}
                                {course.target_audience && Array.isArray(course.target_audience) && (
                                    <div className="mb-4">
                                        <div className="flex flex-wrap gap-1">
                                            {course.target_audience.slice(0, 3).map((audience, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {audience}
                                                </span>
                                            ))}
                                            {course.target_audience.length > 3 && (
                                                <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                    +{course.target_audience.length - 3} more
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={`/user/learn/course/${course.id}`}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>

                                    {isEnrolled(course.id) ? (
                                        <Link
                                            href={`/user/learn/course/${course.id}`}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                        >
                                            Continue Learning
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleEnroll(course.id)}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700"
                                        >
                                            Enroll Now
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredContent.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No courses found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters to find more courses.</p>
                        </div>
                    </div>
                )}

                {/* Featured Courses Section */}
                <div className="mt-16">
                    <h2 className="mb-8 text-2xl font-bold text-gray-900">Featured Courses</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {courses?.slice(0, 4).map((course) => (
                            <div key={course.id} className="rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
                                <div className="mb-4 flex items-center space-x-3">
                                    <span className="text-3xl">{course.icon || '📚'}</span>
                                    <div>
                                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                                        <p className="text-sm text-gray-500">{course.category}</p>
                                    </div>
                                </div>
                                <p className="mb-4 line-clamp-2 text-sm text-gray-600">{course.description}</p>
                                <div className="flex items-center justify-between">
                                    <span
                                        className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(course.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(course.difficulty_level || 'Beginner')}-800`}
                                    >
                                        {course.difficulty_level || 'Beginner'}
                                    </span>
                                    <Link href={`/user/learn/course/${course.id}`} className="text-sm font-medium text-blue-600 hover:text-blue-700">
                                        Learn More →
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
