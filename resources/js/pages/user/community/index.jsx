import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function CommunityStories({ user }) {
    const [activeTab, setActiveTab] = useState('stories');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const tabs = [
        { id: 'stories', name: 'Community Stories', icon: '📖' },
        { id: 'share', name: 'Share Your Story', icon: '✍️' },
        { id: 'support', name: 'Support Groups', icon: '🤝' },
    ];

    const categories = [
        { id: 'all', name: 'All Stories', icon: '📚' },
        { id: 'contraception', name: 'Contraception', icon: '💊' },
        { id: 'relationships', name: 'Relationships', icon: '💕' },
        { id: 'health', name: 'Health Journey', icon: '🏥' },
        { id: 'support', name: 'Support & Recovery', icon: '🤗' },
        { id: 'education', name: 'Education & Learning', icon: '🎓' },
    ];

    const stories = [
        {
            id: 1,
            title: 'My Journey with IUD Insertion',
            author: 'Sarah M.',
            category: 'contraception',
            excerpt: "I was nervous about getting an IUD, but the process was much easier than I expected. Here's what I learned...",
            content:
                "I was nervous about getting an IUD, but the process was much easier than I expected. The healthcare provider was very supportive and explained everything step by step. The insertion was uncomfortable but not painful, and I'm so glad I made this choice for my reproductive health.",
            likes: 45,
            comments: 12,
            date: '2 days ago',
            isAnonymous: false,
            tags: ['IUD', 'contraception', 'positive experience'],
        },
        {
            id: 2,
            title: 'Learning to Communicate About Boundaries',
            author: 'Anonymous',
            category: 'relationships',
            excerpt: 'It took me a long time to learn how to set and communicate my boundaries in relationships...',
            content:
                'It took me a long time to learn how to set and communicate my boundaries in relationships. I used to think that saying "no" would make me seem difficult or unlovable. But I\'ve learned that healthy relationships require clear communication about what we\'re comfortable with.',
            likes: 38,
            comments: 8,
            date: '1 week ago',
            isAnonymous: true,
            tags: ['boundaries', 'communication', 'relationships'],
        },
        {
            id: 3,
            title: 'Finding the Right Contraceptive Method',
            author: 'Maria L.',
            category: 'contraception',
            excerpt: 'After trying several different methods, I finally found what works for me and my body...',
            content:
                "After trying several different methods, I finally found what works for me and my body. It's important to remember that what works for one person might not work for another. Don't be afraid to try different options and advocate for yourself with your healthcare provider.",
            likes: 52,
            comments: 15,
            date: '3 days ago',
            isAnonymous: false,
            tags: ['contraception', 'healthcare', 'advocacy'],
        },
        {
            id: 4,
            title: 'Supporting a Friend Through STI Testing',
            author: 'Anonymous',
            category: 'support',
            excerpt: 'When my friend was nervous about getting tested, I learned how to be a supportive ally...',
            content:
                'When my friend was nervous about getting tested, I learned how to be a supportive ally. I went with them to the clinic, listened without judgment, and helped them understand that getting tested is a responsible and normal part of taking care of your health.',
            likes: 29,
            comments: 6,
            date: '5 days ago',
            isAnonymous: true,
            tags: ['STI testing', 'support', 'friendship'],
        },
        {
            id: 5,
            title: 'Understanding My Menstrual Cycle',
            author: 'Jessica K.',
            category: 'health',
            excerpt: 'Tracking my cycle helped me understand my body better and advocate for my health...',
            content:
                'Tracking my cycle helped me understand my body better and advocate for my health. I learned to recognize patterns and symptoms, which helped me have more informed conversations with my healthcare provider about my reproductive health.',
            likes: 41,
            comments: 9,
            date: '1 week ago',
            isAnonymous: false,
            tags: ['menstrual health', 'cycle tracking', 'self-advocacy'],
        },
    ];

    const supportGroups = [
        {
            id: 1,
            name: "Young Women's Health Circle",
            description: 'A supportive space for women aged 18-25 to discuss reproductive health topics.',
            members: 45,
            nextMeeting: 'Tomorrow, 7:00 PM',
            category: 'health',
        },
        {
            id: 2,
            name: 'Contraception Support Group',
            description: 'Share experiences and get support about different contraceptive methods.',
            members: 32,
            nextMeeting: 'Friday, 6:30 PM',
            category: 'contraception',
        },
        {
            id: 3,
            name: 'Relationship Communication Workshop',
            description: 'Learn healthy communication skills for relationships.',
            members: 28,
            nextMeeting: 'Next Tuesday, 7:30 PM',
            category: 'relationships',
        },
    ];

    const filteredStories = stories.filter((story) => selectedCategory === 'all' || story.category === selectedCategory);

    const getCategoryIcon = (category) => {
        return categories.find((c) => c.id === category)?.icon || '📚';
    };

    const getCategoryName = (category) => {
        return categories.find((c) => c.id === category)?.name || 'Story';
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/community">
            <div className="">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Community Stories</h1>
                    <p className="mt-2 text-gray-600">Share experiences, find support, and learn from others</p>
                </div>
                {/* Tabs */}
                <div className="mb-8 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                        activeTab === tab.id
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Stories Tab */}
                {activeTab === 'stories' && (
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
                                        <span className="mr-2">{category.icon}</span>
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
                                                    <span className="text-lg">{getCategoryIcon(story.category)}</span>
                                                    <h3 className="text-lg font-semibold text-gray-900">{story.title}</h3>
                                                </div>
                                                <div className="mb-3 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>By {story.author}</span>
                                                    <span>•</span>
                                                    <span>{story.date}</span>
                                                    <span>•</span>
                                                    <span>{getCategoryName(story.category)}</span>
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
                                            <button className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
                                                Read Full Story
                                            </button>
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
                )}

                {/* Share Story Tab */}
                {activeTab === 'share' && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mx-auto max-w-2xl">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Share Your Story</h3>
                            <p className="mb-6 text-sm text-gray-600">
                                Your experiences can help others. Share your story anonymously or with your name.
                            </p>

                            <form className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Story Title</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        placeholder="Give your story a descriptive title"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                    <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500">
                                        {categories.slice(1).map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.icon} {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Your Story</label>
                                    <textarea
                                        rows={8}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        placeholder="Share your experience, what you learned, and any advice you have for others..."
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Tags (optional)</label>
                                    <input
                                        type="text"
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        placeholder="Add tags separated by commas (e.g., contraception, positive experience, advice)"
                                    />
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="anonymous"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                                        Share anonymously
                                    </label>
                                </div>

                                <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">Share Story</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Support Groups Tab */}
                {activeTab === 'support' && (
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Join Support Groups</h3>
                            <p className="mb-6 text-sm text-gray-600">Connect with others who share similar experiences and challenges.</p>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {supportGroups.map((group) => (
                                    <div key={group.id} className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md">
                                        <div className="mb-3 flex items-start justify-between">
                                            <h4 className="font-medium text-gray-900">{group.name}</h4>
                                            <span className="text-sm text-gray-500">{group.members} members</span>
                                        </div>
                                        <p className="mb-3 text-sm text-gray-600">{group.description}</p>
                                        <div className="mb-4 text-sm text-gray-500">Next meeting: {group.nextMeeting}</div>
                                        <button className="w-full rounded-lg bg-green-600 px-3 py-2 text-sm text-white hover:bg-green-700">
                                            Join Group
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
