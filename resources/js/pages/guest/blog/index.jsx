import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

export default function BlogPage({ blogs, categories, pagination, filters }) {
    const [selectedCategory, setSelectedCategory] = useState(filters?.category || 'all');
    const [searchQuery, setSearchQuery] = useState(filters?.search || '');
    const [sortBy, setSortBy] = useState(filters?.sort || 'latest');

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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    const truncateContent = (content, maxLength = 150) => {
        if (!content) return '';
        const text = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleFilter = () => {
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') params.append('category', selectedCategory);
        if (searchQuery) params.append('search', searchQuery);
        if (sortBy !== 'latest') params.append('sort', sortBy);

        window.location.href = `/blog?${params.toString()}`;
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Blog - Future Family Planning Initiative" />

            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 py-20 sm:py-24">
                <div className="absolute inset-0 opacity-60">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_rgba(15,66,52,0))]"></div>
                    <div className="absolute -top-20 right-10 h-64 w-64 rounded-full bg-emerald-500/20 blur-3xl"></div>
                    <div className="absolute bottom-0 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-500/20 blur-2xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-emerald-100 backdrop-blur-sm">
                            📚 Our Blog
                        </span>
                        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                            Insights & Stories on Reproductive Health
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-emerald-100 sm:text-xl">
                            Explore articles, expert insights, and community stories about sexual and reproductive health and rights
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="border-b border-gray-200 bg-gray-50 py-8">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-gray-900 placeholder-gray-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                                />
                                <svg
                                    className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-4">
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {categoryLabels[cat] || cat}
                                    </option>
                                ))}
                            </select>

                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                            >
                                <option value="latest">Latest</option>
                                <option value="popular">Most Popular</option>
                                <option value="featured">Featured</option>
                            </select>

                            <button
                                onClick={handleFilter}
                                className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Blog Posts Section */}
            <section className="py-16 sm:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {blogs && blogs.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {blogs.map((blog) => (
                                    <article
                                        key={blog.id}
                                        className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                    >
                                        {/* Featured Image */}
                                        {blog.featured_image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={blog.featured_image}
                                                    alt={blog.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                                {blog.is_featured && (
                                                    <div className="absolute top-4 right-4">
                                                        <span className="inline-flex items-center rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                                                            Featured
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex flex-1 flex-col p-6">
                                            {/* Category Badge */}
                                            <div className="mb-3">
                                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                    {categoryLabels[blog.category] || blog.category}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h2 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                                                {blog.title}
                                            </h2>

                                            {/* Excerpt */}
                                            {blog.excerpt && (
                                                <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{blog.excerpt}</p>
                                            )}

                                            {/* Meta Info */}
                                            <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                                <div className="flex items-center gap-3">
                                                    {blog.author && (
                                                        <>
                                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                                                <span className="text-xs font-semibold">
                                                                    {blog.author.name.charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <p className="text-xs font-medium text-gray-900">{blog.author.name}</p>
                                                                <p className="text-xs text-gray-500">{formatDate(blog.published_at)}</p>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-gray-500">
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
                                                    <span>{blog.views_count || 0}</span>
                                                </div>
                                            </div>

                                            {/* Read More Link */}
                                            <Link
                                                href={`/blog/${blog.slug || blog.id}`}
                                                className="mt-4 inline-flex items-center text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                                            >
                                                Read More
                                                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.last_page > 1 && (
                                <div className="mt-12 flex items-center justify-center gap-2">
                                    {pagination.current_page > 1 && (
                                        <Link
                                            href={`/blog?page=${pagination.current_page - 1}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${sortBy !== 'latest' ? `&sort=${sortBy}` : ''}`}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}

                                    {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => {
                                        if (
                                            page === 1 ||
                                            page === pagination.last_page ||
                                            (page >= pagination.current_page - 1 && page <= pagination.current_page + 1)
                                        ) {
                                            return (
                                                <Link
                                                    key={page}
                                                    href={`/blog?page=${page}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${sortBy !== 'latest' ? `&sort=${sortBy}` : ''}`}
                                                    className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                                                        page === pagination.current_page
                                                            ? 'border-emerald-500 bg-emerald-600 text-white'
                                                            : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                                    }`}
                                                >
                                                    {page}
                                                </Link>
                                            );
                                        } else if (page === pagination.current_page - 2 || page === pagination.current_page + 2) {
                                            return (
                                                <span key={page} className="px-2 text-gray-500">
                                                    ...
                                                </span>
                                            );
                                        }
                                        return null;
                                    })}

                                    {pagination.current_page < pagination.last_page && (
                                        <Link
                                            href={`/blog?page=${pagination.current_page + 1}${selectedCategory !== 'all' ? `&category=${selectedCategory}` : ''}${searchQuery ? `&search=${searchQuery}` : ''}${sortBy !== 'latest' ? `&sort=${sortBy}` : ''}`}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="py-20 text-center">
                            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <h3 className="mt-4 text-lg font-semibold text-gray-900">No blog posts found</h3>
                            <p className="mt-2 text-gray-600">
                                {searchQuery || selectedCategory !== 'all'
                                    ? 'Try adjusting your filters or search query.'
                                    : 'Check back soon for new articles!'}
                            </p>
                        </div>
                    )}
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
