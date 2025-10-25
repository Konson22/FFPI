import { useState } from 'react';

export default function BlogSection() {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsSubmitting(true);

        // Simulate API call - replace with actual subscription logic
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay
            setIsSubscribed(true);
            setEmail('');
        } catch (error) {
            console.error('Subscription failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };
    const blogPosts = [
        {
            id: 1,
            title: 'Digital Innovation in Reproductive Health: A Game Changer for South Sudan',
            excerpt: 'Exploring how technology is transforming access to family planning services across South Sudan and East Africa.',
            image: '/images/founder-speaking.jpeg',
            category: 'Digital Health',
            date: 'March 15, 2024',
            readTime: '5 min read',
            author: 'Anok Athor Deng',
            featured: true,
        },
        {
            id: 2,
            title: 'Empowering Women Through Technology: The FFPI Story',
            excerpt: 'How our digital platform is breaking barriers and empowering women to make informed reproductive health choices.',
            image: '/images/WhatsApp Image 2025-10-15 at 20.04.36(1).jpeg',
            category: "Women's Health",
            date: 'March 10, 2024',
            readTime: '4 min read',
            author: 'Masudio Gladys',
            featured: false,
        },
        {
            id: 3,
            title: "Youth Leadership in SRHR: Building Tomorrow's Advocates",
            excerpt: 'The importance of youth engagement in sexual and reproductive health and rights advocacy.',
            image: '/images/WhatsApp Image 2025-10-15 at 20.04.34(1).jpeg',
            category: 'Youth Advocacy',
            date: 'March 5, 2024',
            readTime: '6 min read',
            author: 'Kuena James Dak',
            featured: false,
        },
        {
            id: 4,
            title: 'Breaking Stigma: Digital Solutions for SRHR Education',
            excerpt: 'How digital platforms are helping to overcome cultural barriers and stigma around reproductive health.',
            image: '/images/WhatsApp Image 2025-10-15 at 20.04.34(1).jpeg',
            category: 'Education',
            date: 'February 28, 2024',
            readTime: '7 min read',
            author: 'Agnes Juan',
            featured: false,
        },
    ];

    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 px-4 py-2 text-sm font-medium text-blue-600">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        Latest Insights
                    </div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                        Stories of
                        <span className="block bg-gradient-to-r from-blue-500 via-teal-500 to-green-600 bg-clip-text text-transparent">
                            Impact & Innovation
                        </span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        Discover the latest insights, stories, and innovations in reproductive health, digital solutions, and community impact across
                        South Sudan and East Africa.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-16">
                    {blogPosts
                        .filter((post) => post.featured)
                        .map((post) => (
                            <div
                                key={post.id}
                                className="group relative overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-500 hover:shadow-2xl"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2">
                                    {/* Image */}
                                    <div className="relative h-80 lg:h-auto">
                                        <img
                                            src={post.image}
                                            alt={post.title}
                                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                                                Featured
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-8 lg:p-12">
                                        <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-blue-600">{post.category}</span>
                                            <span>{post.date}</span>
                                            <span>{post.readTime}</span>
                                        </div>
                                        <h3 className="mb-4 text-2xl font-bold text-gray-900 lg:text-3xl">{post.title}</h3>
                                        <p className="mb-6 text-lg leading-relaxed text-gray-600">{post.excerpt}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-teal-600"></div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">{post.author}</p>
                                                    <p className="text-sm text-gray-500">Author</p>
                                                </div>
                                            </div>
                                            <button className="rounded-full bg-gradient-to-r from-blue-500 to-teal-600 px-6 py-3 text-white transition-all duration-300 hover:scale-105 hover:shadow-lg">
                                                Read More
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Blog Grid */}
                <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts
                        .filter((post) => !post.featured)
                        .map((post) => (
                            <div
                                key={post.id}
                                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 left-4">
                                        <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-3 flex items-center space-x-3 text-sm text-gray-500">
                                        <span>{post.date}</span>
                                        <span>•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <h3 className="mb-3 line-clamp-2 text-lg font-bold text-gray-900">{post.title}</h3>
                                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-gray-600">{post.excerpt}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-teal-600"></div>
                                            <span className="text-sm font-medium text-gray-900">{post.author}</span>
                                        </div>
                                        <button className="text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800">
                                            Read →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Stay Updated Section */}
                <div className="text-center">
                    <div className="relative mx-auto max-w-4xl overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-teal-500 to-green-600 p-8 text-white shadow-2xl">
                        {/* Background Pattern */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-green-500/20"></div>
                        <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10"></div>
                        <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"></div>
                        <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                        <div className="relative">
                            <div className="mb-8">
                                <div className="mb-4 inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                    Newsletter
                                </div>
                                <h3 className="mb-4 text-3xl font-bold sm:text-4xl">Stay Updated</h3>
                                <p className="mx-auto max-w-2xl text-lg opacity-90">
                                    Get the latest insights on reproductive health, digital innovation, and community impact delivered to your inbox.
                                </p>
                            </div>

                            {isSubscribed ? (
                                <div className="mb-8 rounded-2xl border border-green-400/30 bg-green-500/20 p-6 backdrop-blur-sm">
                                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/30">
                                        <svg className="h-8 w-8 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h4 className="mb-2 text-2xl font-bold text-green-100">Thank you for subscribing!</h4>
                                    <p className="mb-4 text-green-200">You'll receive our latest updates and insights soon.</p>
                                    <button
                                        onClick={() => setIsSubscribed(false)}
                                        className="rounded-lg bg-green-500/30 px-6 py-2 font-medium text-green-100 backdrop-blur-sm transition-colors hover:bg-green-500/40"
                                    >
                                        Subscribe Another Email
                                    </button>
                                </div>
                            ) : (
                                <div className="mb-8">
                                    <form onSubmit={handleEmailSubmit} className="mx-auto max-w-md">
                                        <div className="flex flex-col gap-4 sm:flex-row">
                                            <div className="flex-1">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="Enter your email address"
                                                    className="w-full rounded-xl border-2 border-white/20 bg-white/10 px-6 py-4 text-lg text-white placeholder-white/70 backdrop-blur-sm transition-all duration-300 focus:border-white focus:bg-white/20 focus:outline-none"
                                                    required
                                                    disabled={isSubmitting}
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting || !email}
                                                className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                            >
                                                <span className="relative z-10 flex items-center justify-center">
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                            Subscribing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                                />
                                                            </svg>
                                                            Subscribe
                                                        </>
                                                    )}
                                                </span>
                                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
