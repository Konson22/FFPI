export default function StorySection({ filteredStories, categories, selectedCategory, setSelectedCategory, getCategoryName }) {
    return (
        <div>
            {/* Category Filter */}
            <div className="mb-8 rounded-lg bg-white p-6 shadow">
                <h3 className="mb-4 text-lg font-medium text-gray-900">Filter by Category</h3>
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
                            {category.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stories List */}
            <div className="space-y-6">
                {filteredStories.map((story) => (
                    <div key={story.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
                        <div className="p-6">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center space-x-2">
                                        {/* <span className="text-lg">{story.category}</span> */}
                                        <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                                    </div>
                                    <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                                        <span>By {story.author}</span>
                                        <span>•</span>
                                        <span>{story.date}</span>
                                        {/* <span>•</span> */}
                                        {/* <span>{getCategoryName(story.category)}</span> */}
                                    </div>
                                    <p className="mb-4 text-gray-600">{story.excerpt}</p>
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {story.tags.map((tag, index) => (
                                            <span key={index} className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-red-500">
                                        <span>❤️</span>
                                        <span className="text-sm">{story.likes}</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-500">
                                        <span>💬</span>
                                        <span className="text-sm">{story.comments}</span>
                                    </button>
                                </div>
                                <button className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">Read Full Story</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredStories.length === 0 && (
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
                        <h3 className="mt-2 text-sm font-medium text-gray-900">No stories found</h3>
                        <p className="mt-1 text-sm text-gray-500">Try adjusting your category filter.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
