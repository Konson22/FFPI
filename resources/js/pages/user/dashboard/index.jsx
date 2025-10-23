import { Link } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserDashboard({ user }) {
    const [activeTab, setActiveTab] = useState('overview');

    const quickLinks = [
        { title: 'Learn Hub', description: 'Educational content on SRHR', icon: '📚', href: '/user/learn', color: 'blue' },
        { title: 'Quiz & Challenges', description: 'Test your knowledge', icon: '🧠', href: '/user/quiz', color: 'purple' },
        { title: 'Ask a Question', description: 'Get expert answers', icon: '❓', href: '/user/ask', color: 'green' },
        { title: 'Services Near You', description: 'Find local SRHR services', icon: '📍', href: '/user/services', color: 'orange' },
        { title: 'Relationship Zone', description: 'Healthy relationship guidance', icon: '💕', href: '/user/relationships', color: 'pink' },
        { title: 'Community Stories', description: 'Share and read experiences', icon: '👥', href: '/user/community', color: 'indigo' },
    ];

    const healthTip = {
        title: 'Daily Health Tip',
        content:
            'Regular exercise can help regulate your menstrual cycle and reduce PMS symptoms. Aim for at least 30 minutes of moderate activity most days of the week.',
        category: 'Physical Health',
    };

    const recentActivity = [
        { id: 1, action: 'Completed "Understanding Contraception" quiz', time: '2 hours ago', type: 'quiz', points: 15 },
        { id: 2, action: 'Read article on "Healthy Communication"', time: '1 day ago', type: 'learn', points: 10 },
        { id: 3, action: 'Asked question about menstrual health', time: '2 days ago', type: 'ask', points: 5 },
        { id: 4, action: 'Found nearby family planning clinic', time: '3 days ago', type: 'service', points: 8 },
    ];

    const upcomingEvents = [
        { title: 'Weekly Health Check-in', date: 'Tomorrow', type: 'reminder' },
        { title: 'New Quiz Available', date: 'In 2 days', type: 'quiz' },
        { title: 'Expert Q&A Session', date: 'This Friday', type: 'event' },
    ];

    const stats = [
        { title: 'Learning Points', value: '1,250', change: '+150 this week', color: 'blue' },
        { title: 'Quizzes Completed', value: '8', change: '2 this month', color: 'purple' },
        { title: 'Questions Asked', value: '12', change: '3 this week', color: 'green' },
        { title: 'Articles Read', value: '24', change: '+5 this week', color: 'emerald' },
    ];

    return (
        <UserLayout user={user} role="user" currentPath="/user/dashboard">
            <div className="">
                {/* Welcome Header */}
                <div className="mb-6 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
                                <p className="mt-2 text-green-100">Ready to continue your health journey?</p>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-right">
                                    <p className="text-sm text-green-100">Learning Streak</p>
                                    <p className="text-2xl font-bold">7 days</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div className={`rounded-lg p-2 bg-${stat.color}-100`}>
                                        <div className={`h-6 w-6 bg-${stat.color}-500 rounded`}></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.change}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Quick Links */}
                        <div className="lg:col-span-2">
                            <div className="rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Quick Access</h3>
                                    <p className="text-sm text-gray-500">Jump into your favorite activities</p>
                                </div>
                                <div className="p-6">
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {quickLinks.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                className={`group relative rounded-lg border-2 border-transparent p-4 hover:border-${link.color}-200 hover:bg-${link.color}-50 transition-all duration-200`}
                                            >
                                                <div className="flex items-start space-x-3">
                                                    <div className={`rounded-lg p-2 text-2xl bg-${link.color}-100`}>{link.icon}</div>
                                                    <div className="flex-1">
                                                        <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{link.title}</h4>
                                                        <p className="mt-1 text-xs text-gray-500">{link.description}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Health Tip & Upcoming Events */}
                        <div className="space-y-6">
                            {/* Health Tip */}
                            <div className="rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">{healthTip.title}</h3>
                                </div>
                                <div className="p-6">
                                    <div className="flex items-start space-x-3">
                                        <div className="flex-shrink-0">
                                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                                <span className="text-sm text-green-600">💡</span>
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-700">{healthTip.content}</p>
                                            <p className="mt-2 text-xs text-gray-500">{healthTip.category}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Events */}
                            <div className="rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">Upcoming</h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-3">
                                        {upcomingEvents.map((event, index) => (
                                            <div key={index} className="flex items-center space-x-3">
                                                <div
                                                    className={`h-2 w-2 rounded-full bg-${event.type === 'reminder' ? 'blue' : event.type === 'quiz' ? 'purple' : 'green'}-500`}
                                                ></div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                    <p className="text-xs text-gray-500">{event.date}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentActivity.map((activity) => (
                                    <div key={activity.id} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div
                                                className={`h-2 w-2 rounded-full bg-${activity.type === 'quiz' ? 'purple' : activity.type === 'learn' ? 'blue' : activity.type === 'ask' ? 'green' : 'orange'}-500`}
                                            ></div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                +{activity.points} pts
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
