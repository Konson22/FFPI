import { Link, usePage } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function BlogShow({ user, blog, relatedBlogs }) {
    const { flash } = usePage().props;

    const formatCategory = (category) => {
        const categoryLabels = {
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
        return categoryLabels[category] || category?.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/blogs">
            <div className="min-h-screen bg-gray-50">
                {/* Flash Messages */}
                {(flash?.success || flash?.error) && (
                    <div className={`mb-6 rounded-lg p-4 ${flash.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                        {flash.success || flash.error}
                    </div>
                )}

                <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link href={route('user.blogs.index')} className="mb-6 inline-flex items-center text-indigo-600 hover:text-indigo-800">
                        <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to Blog
                    </Link>

                    {/* Blog Content */}
                    <article className="overflow-hidden rounded-lg bg-white shadow-md">
                        {/* Featured Image */}
                        {blog.featured_image && (
                            <div className="h-96 overflow-hidden bg-gray-200">
                                <img src={blog.featured_image} alt={blog.title} className="h-full w-full object-cover" />
                            </div>
                        )}

                        <div className="p-8">
                            {/* Category and Featured Badge */}
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-sm font-semibold text-indigo-600 uppercase">{formatCategory(blog.category)}</span>
                                {blog.is_featured && (
                                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">Featured</span>
                                )}
                            </div>

                            {/* Title */}
                            <h1 className="mb-4 text-4xl font-bold text-gray-900">{blog.title}</h1>

                            {/* Meta Information */}
                            <div className="mb-6 flex items-center gap-6 border-b pb-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <span>{blog.user.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                    <span>{blog.published_at_formatted}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                    <span>{blog.views_count} views</span>
                                </div>
                            </div>

                            {/* Excerpt */}
                            {blog.excerpt && (
                                <div className="mb-6 border-l-4 border-indigo-500 bg-indigo-50 p-4">
                                    <p className="text-gray-700 italic">{blog.excerpt}</p>
                                </div>
                            )}

                            {/* Content */}
                            <div className="prose prose-lg mb-8 max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>
                    </article>

                    {/* Related Blogs */}
                    {relatedBlogs && relatedBlogs.length > 0 && (
                        <div className="mt-12">
                            <h2 className="mb-6 text-2xl font-bold text-gray-900">Related Articles</h2>
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                {relatedBlogs.map((relatedBlog) => (
                                    <Link
                                        key={relatedBlog.id}
                                        href={route('user.blogs.show', relatedBlog.slug)}
                                        className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
                                    >
                                        {relatedBlog.featured_image && (
                                            <div className="h-48 overflow-hidden bg-gray-200">
                                                <img
                                                    src={relatedBlog.featured_image}
                                                    alt={relatedBlog.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6">
                                            <span className="text-xs font-semibold text-indigo-600 uppercase">
                                                {formatCategory(relatedBlog.category)}
                                            </span>
                                            <h3 className="mt-2 mb-2 line-clamp-2 text-lg font-bold text-gray-900">{relatedBlog.title}</h3>
                                            {relatedBlog.excerpt && <p className="mb-4 line-clamp-2 text-sm text-gray-600">{relatedBlog.excerpt}</p>}
                                            <div className="flex items-center justify-between text-sm text-gray-500">
                                                <span>{relatedBlog.user.name}</span>
                                                <span>{relatedBlog.published_at}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
