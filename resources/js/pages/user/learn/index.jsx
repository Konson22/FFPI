import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function LearnHub({ user, modules, categories, audiences }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedAudience, setSelectedAudience] = useState('all');

    // Use categories and audiences from props (passed from controller)

    // Use modules data from database instead of hardcoded content

    const filteredContent =
        modules?.filter((module) => {
            const categoryMatch = selectedCategory === 'all' || module.category?.toLowerCase().replace(/\s+/g, '-') === selectedCategory;
            const audienceMatch =
                selectedAudience === 'all' || (Array.isArray(module.target_audience) && module.target_audience.includes(selectedAudience));
            return categoryMatch && audienceMatch;
        }) || [];

    const getTypeIcon = (type) => {
        switch (type) {
            case 'video':
                return '🎥';
            case 'infographic':
                return '📊';
            case 'article':
                return '📄';
            default:
                return '📚';
        }
    };

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
                                        <span className="mr-2">{category.icon}</span>
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

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {filteredContent.map((module) => (
                        <div key={module.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
                            <div className="aspect-w-16 aspect-h-9">
                                <div className="flex h-48 w-full items-center justify-center rounded-t-lg bg-gray-200">
                                    <span className="text-4xl">📚</span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-2xl">📚</span>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-yellow-400">⭐</span>
                                        <span className="text-sm text-gray-600">4.5</span>
                                    </div>
                                </div>

                                <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900">{module.title}</h3>

                                <p className="mb-4 line-clamp-3 text-sm text-gray-600">{module.description}</p>

                                <div className="mb-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(module.difficulty_level || 'Beginner')}-100 text-${getDifficultyColor(module.difficulty_level || 'Beginner')}-800`}
                                        >
                                            {module.difficulty_level || 'Beginner'}
                                        </span>
                                        <span className="text-xs text-gray-500">{module.duration || '30 min'}</span>
                                    </div>
                                    <span className="text-xs text-gray-500">{module.lessons?.length || 0} lessons</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-1">
                                        {Array.isArray(module.target_audience) &&
                                            module.target_audience.map((aud, index) => (
                                                <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                    {aud}
                                                </span>
                                            ))}
                                    </div>
                                    <button className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white transition-colors hover:bg-green-700">
                                        Start Learning
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredContent.length === 0 && (
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
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No content found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to see more content.</p>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
