import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

export default function BlogShowPage({ blog, relatedBlogs }) {
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

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    if (!blog) {
        return (
            <div className="min-h-screen bg-white">
                <GuestNavbar />
                <div className="flex min-h-[60vh] items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900">Blog Post Not Found</h1>
                        <p className="mt-2 text-gray-600">The blog post you're looking for doesn't exist.</p>
                        <Link
                            href={route('blog')}
                            className="mt-4 inline-flex items-center rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
                        >
                            Back to Blog
                        </Link>
                    </div>
                </div>
                <GuestFooter />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            <Head title={`${blog.title} - Blog | Future Family Planning Initiative`} />

            <GuestNavbar />

            {/* Hero Section with Featured Image */}
            {blog.featured_image && (
                <section className="relative h-96 overflow-hidden bg-gray-900">
                    <img src={blog.featured_image} alt={blog.title} className="h-full w-full object-cover opacity-80" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="w-full px-4 pb-12 sm:px-6 lg:px-8">
                            <div className="mx-auto max-w-4xl">
                                <div className="mb-4">
                                    <span className="inline-flex items-center rounded-full bg-emerald-600/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                                        {categoryLabels[blog.category] || blog.category}
                                    </span>
                                    {blog.is_featured && (
                                        <span className="ml-3 inline-flex items-center rounded-full bg-yellow-500/90 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                <h1 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl">{blog.title}</h1>
                                <div className="mt-6 flex items-center gap-4 text-white/90">
                                    {blog.author && (
                                        <>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                                    <span className="text-sm font-semibold text-white">
                                                        {blog.author.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{blog.author.name}</p>
                                                    <p className="text-xs text-white/70">{formatDate(blog.published_at)}</p>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                    <div className="ml-auto flex items-center gap-2 text-sm">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                        <span>{blog.views_count || 0} views</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Article Content */}
            <article className="py-12 sm:py-16">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {/* Header (if no featured image) */}
                    {!blog.featured_image && (
                        <header className="mb-8">
                            <div className="mb-4">
                                <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                                    {categoryLabels[blog.category] || blog.category}
                                </span>
                                {blog.is_featured && (
                                    <span className="ml-3 inline-flex items-center rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <h1 className="mb-6 text-4xl font-black text-gray-900 sm:text-5xl">{blog.title}</h1>
                            <div className="flex flex-wrap items-center gap-6 border-b border-gray-200 pb-6">
                                {blog.author && (
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                                            <span className="text-lg font-semibold text-emerald-700">{blog.author.name.charAt(0).toUpperCase()}</span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{blog.author.name}</p>
                                            <p className="text-sm text-gray-500">{formatDate(blog.published_at)}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="ml-auto flex items-center gap-2 text-sm text-gray-600">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                    <span>{blog.views_count || 0} views</span>
                                </div>
                            </div>
                        </header>
                    )}

                    {/* Article Content */}
                    <div
                        className="prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700 prose-img:rounded-xl prose-img:shadow-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: blog.content }}
                    />

                    {/* Back to Blog Link */}
                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <Link href={route('blog')} className="inline-flex items-center text-emerald-600 transition-colors hover:text-emerald-700">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Blog
                        </Link>
                    </div>
                </div>
            </article>

            {/* Related Posts */}
            {relatedBlogs && relatedBlogs.length > 0 && (
                <section className="border-t border-gray-200 bg-gray-50 py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h2 className="mb-8 text-3xl font-bold text-gray-900">Related Articles</h2>
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {relatedBlogs.map((relatedBlog) => (
                                <Link
                                    key={relatedBlog.id}
                                    href={`/blog/${relatedBlog.slug || relatedBlog.id}`}
                                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                                >
                                    {relatedBlog.featured_image && (
                                        <div className="relative h-48 overflow-hidden">
                                            <img
                                                src={relatedBlog.featured_image}
                                                alt={relatedBlog.title}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-1 flex-col p-6">
                                        <div className="mb-3">
                                            <span className="inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                                                {categoryLabels[relatedBlog.category] || relatedBlog.category}
                                            </span>
                                        </div>
                                        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-600">
                                            {relatedBlog.title}
                                        </h3>
                                        {relatedBlog.excerpt && (
                                            <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-600">{relatedBlog.excerpt}</p>
                                        )}
                                        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                            <p className="text-xs text-gray-500">{formatDate(relatedBlog.published_at)}</p>
                                            <span className="text-sm font-semibold text-emerald-600">Read More →</span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <GuestFooter />
        </div>
    );
}
