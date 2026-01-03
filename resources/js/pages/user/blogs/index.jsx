import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function BlogIndex({ user, blogs, featuredBlogs, filters, categories }) {
    const { flash } = usePage().props;
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [selectedSort, setSelectedSort] = useState(filters?.sort || 'latest');

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        router.get(
            route('user.blogs.index'),
            {
                category: category,
                sort: selectedSort,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const handleSortChange = (sort) => {
        setSelectedSort(sort);
        router.get(
            route('user.blogs.index'),
            {
                category: selectedCategory,
                sort: sort,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    const categoryLabels = {
        all: 'All Categories',
        general: 'General',
        'sexual-health': 'Sexual Health',
        'reproductive-health': 'Reproductive Health',
        contraception: 'Contraception',
        relationships: 'Relationships',
        'mental-health': 'Mental Health',
        stis: 'STIs',
        'family-planning': 'Family Planning',
        education: 'Education',
    };

    const formatCategory = (category) => {
        return categoryLabels[category] || category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/blogs">
            <div className="min-h-screen bg-gray-50">
                {/* Flash Messages */}
                {(flash?.success || flash?.error) && (
                    <div className={`mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8`}>
                        <div className={`mb-6 rounded-lg p-4 ${flash.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            {flash.success || flash.error}
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="border-b border-gray-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-4xl font-bold text-gray-900">Latest News & Articles</h1>
                        <p className="mt-2 text-lg text-gray-600">Stay informed about sexual and reproductive health</p>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Main Content - Left Side */}
                        <div className="lg:col-span-2">
                            {/* Sort Options */}
                            <div className="mb-6 flex items-center justify-between border-b border-gray-200 pb-4">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedCategory === 'all' ? 'All Articles' : formatCategory(selectedCategory)}
                                </h2>
                                <select
                                    value={selectedSort}
                                    onChange={(e) => handleSortChange(e.target.value)}
                                    className="rounded-md border-gray-300 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                                >
                                    <option value="latest">Latest</option>
                                    <option value="popular">Most Popular</option>
                                    <option value="featured">Featured</option>
                                </select>
                            </div>

                            {/* Featured Blog - Large Card */}
                            {featuredBlogs && featuredBlogs.length > 0 && (
                                <div className="mb-8">
                                    <Link
                                        href={route('user.blogs.show', featuredBlogs[0].slug)}
                                        className="group block overflow-hidden rounded-lg bg-white"
                                    >
                                        {featuredBlogs[0].featured_image && (
                                            <div className="h-80 overflow-hidden bg-gray-200">
                                                <img
                                                    src={featuredBlogs[0].featured_image}
                                                    alt={featuredBlogs[0].title}
                                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <div className="mb-3 flex items-center gap-3">
                                                <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                    {formatCategory(featuredBlogs[0].category)}
                                                </span>
                                                {featuredBlogs[0].is_featured && (
                                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
                                                        Featured
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="mb-3 text-3xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                                                {featuredBlogs[0].title}
                                            </h3>
                                            {featuredBlogs[0].excerpt && (
                                                <p className="mb-4 line-clamp-2 text-lg text-gray-600">{featuredBlogs[0].excerpt}</p>
                                            )}
                                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                                <span className="font-medium">{featuredBlogs[0].user.name}</span>
                                                <span>•</span>
                                                <span>{featuredBlogs[0].published_at_formatted}</span>
                                                <span>•</span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                    {featuredBlogs[0].views_count} views
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )}

                            {/* Blog List */}
                            {blogs.data && blogs.data.length > 0 ? (
                                <>
                                    <div className="space-y-6">
                                        {blogs.data.map((blog) => (
                                            <Link
                                                key={blog.id}
                                                href={route('user.blogs.show', blog.slug)}
                                                className="group flex gap-6 overflow-hidden rounded-lg bg-white p-4"
                                            >
                                                {blog.featured_image && (
                                                    <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-lg bg-gray-200">
                                                        <img
                                                            src={blog.featured_image}
                                                            alt={blog.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}
                                                <div className="flex-1">
                                                    <div className="mb-2 flex items-center gap-3">
                                                        <span className="text-xs font-semibold text-indigo-600 uppercase">
                                                            {formatCategory(blog.category)}
                                                        </span>
                                                        {blog.is_featured && (
                                                            <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                                                Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h3 className="mb-2 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                                                        {blog.title}
                                                    </h3>
                                                    {blog.excerpt && <p className="mb-3 line-clamp-2 text-sm text-gray-600">{blog.excerpt}</p>}
                                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                                        <span>{blog.user.name}</span>
                                                        <span>•</span>
                                                        <span>{blog.published_at}</span>
                                                        <span>•</span>
                                                        <span className="flex items-center gap-1">
                                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                                            {blog.views_count}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>

                                    {/* Pagination */}
                                    {blogs.links && blogs.links.length > 3 && (
                                        <div className="mt-8 flex justify-center">
                                            <nav className="flex gap-2">
                                                {blogs.links.map((link, index) => (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`rounded-md px-4 py-2 ${
                                                            link.active ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                                        } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                ))}
                                            </nav>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="rounded-lg bg-white p-12 text-center">
                                    <p className="text-lg text-gray-500">No blog posts found.</p>
                                </div>
                            )}
                        </div>

                        {/* Sidebar - Right Side */}
                        <div className="lg:col-span-1">
                            {/* Categories Container */}
                            <div className="rounded-lg bg-white p-6">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Categories</h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => handleCategoryChange('all')}
                                        className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                                            selectedCategory === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        All Categories
                                    </button>
                                    {categories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                                                selectedCategory === category
                                                    ? 'bg-indigo-600 text-white'
                                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                            }`}
                                        >
                                            {formatCategory(category)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Featured Articles Sidebar */}
                            {featuredBlogs && featuredBlogs.length > 1 && (
                                <div className="mt-6 rounded-lg bg-white p-6">
                                    <h3 className="mb-4 text-xl font-bold text-gray-900">Featured Articles</h3>
                                    <div className="space-y-4">
                                        {featuredBlogs.slice(1).map((blog) => (
                                            <Link key={blog.id} href={route('user.blogs.show', blog.slug)} className="group block">
                                                {blog.featured_image && (
                                                    <div className="mb-2 h-32 overflow-hidden rounded-lg bg-gray-200">
                                                        <img
                                                            src={blog.featured_image}
                                                            alt={blog.title}
                                                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                        />
                                                    </div>
                                                )}
                                                <h4 className="line-clamp-2 text-sm font-bold text-gray-900 transition-colors group-hover:text-indigo-600">
                                                    {blog.title}
                                                </h4>
                                                <p className="mt-1 text-xs text-gray-500">{blog.published_at}</p>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
