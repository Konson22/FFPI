import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function Sidebar({ user, role, currentPath, onToggle, variant = 'desktop' }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        if (onToggle) onToggle();
    };

    const getRoleRoutes = () => {
        switch (role) {
            case 'admin':
                return [
                    {
                        name: 'Dashboard',
                        href: '/admin/dashboard',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        description: 'Overview and analytics',
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'User Management',
                        href: '/admin/users',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                            </svg>
                        ),
                        description: 'Manage users and roles',
                        color: 'text-purple-600',
                        bgColor: 'bg-purple-50',
                    },
                    {
                        name: 'Content Management',
                        href: '/admin/content/topics',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        ),
                        description: 'Manage educational content',
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        name: 'Analytics',
                        href: '/admin/analytics',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                />
                            </svg>
                        ),
                        description: 'Platform analytics',
                        color: 'text-orange-600',
                        bgColor: 'bg-orange-50',
                    },
                    {
                        name: 'Settings',
                        href: '/admin/settings',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ),
                        description: 'System settings',
                        color: 'text-gray-600',
                        bgColor: 'bg-gray-50',
                    },
                ];
            case 'expert':
                return [
                    {
                        name: 'Dashboard',
                        href: '/experts/dashboard',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        description: 'Your expert dashboard',
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Answer Questions',
                        href: '/experts/questions',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                        description: 'Answer user questions',
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                    {
                        name: 'Create Content',
                        href: '/experts/content',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        ),
                        description: 'Create educational content',
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        name: 'Moderation',
                        href: '/experts/moderation',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        ),
                        description: 'Moderate community content',
                        color: 'text-red-600',
                        bgColor: 'bg-red-50',
                    },
                    {
                        name: 'Profile',
                        href: '/experts/profile',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        ),
                        description: 'Expert profile',
                        color: 'text-indigo-600',
                        bgColor: 'bg-indigo-50',
                    },
                ];
            case 'user':
                return [
                    {
                        name: 'Dashboard',
                        href: '/user/dashboard',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        description: 'Your personal dashboard',
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Learn Hub',
                        href: '/user/learn',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        ),
                        description: 'Educational content',
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        name: 'Quiz & Challenges',
                        href: '/user/quiz',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        ),
                        description: 'Test your knowledge',
                        color: 'text-purple-600',
                        bgColor: 'bg-purple-50',
                    },
                    {
                        name: 'Ask a Question',
                        href: '/user/ask',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                        description: 'Get expert answers',
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                    {
                        name: 'Family Planning',
                        href: '/user/family-planning',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                        description: 'Get expert answers',
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                    {
                        name: 'Services Near You',
                        href: '/user/services',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ),
                        description: 'Find local services',
                        color: 'text-red-600',
                        bgColor: 'bg-red-50',
                    },
                    {
                        name: 'Relationship Zone',
                        href: '/user/relationships',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        ),
                        description: 'Healthy relationships',
                        color: 'text-pink-600',
                        bgColor: 'bg-pink-50',
                    },
                    {
                        name: 'Community Stories',
                        href: '/user/community',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                        ),
                        description: 'Share and read stories',
                        color: 'text-indigo-600',
                        bgColor: 'bg-indigo-50',
                    },
                    {
                        name: 'Health Tracking',
                        href: '/user/health',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                        ),
                        description: 'Track your health',
                        color: 'text-emerald-600',
                        bgColor: 'bg-emerald-50',
                    },
                    {
                        name: 'Profile',
                        href: '/user/profile',
                        icon: (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                        ),
                        description: 'Your profile',
                        color: 'text-gray-600',
                        bgColor: 'bg-gray-50',
                    },
                ];
            default:
                return [];
        }
    };

    const roleRoutes = getRoleRoutes();

    const isActive = (href) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const containerClass =
        variant === 'mobile'
            ? `fixed top-0 left-0 z-50 h-screen w-64 border-r border-gray-200/60 bg-gray-800 shadow-xl transition-all duration-300`
            : `fixed top-0 left-0 z-40 h-screen border-r border-gray-200/60 bg-gray-800 shadow-xl transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden lg:block`;

    return (
        <div className={containerClass}>
            {/* Sidebar Toggle Button */}
            <div className="border-b border-gray-200/60 p-4">
                <div className="flex items-center justify-center">
                    <button onClick={handleToggle} className="rounded-lg p-2 transition-all duration-200 hover:bg-white/20 hover:shadow-md">
                        <svg className="h-5 w-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1 p-4">
                {roleRoutes.map((route) => (
                    <Link
                        key={route.name}
                        href={route.href}
                        className={`group flex items-center space-x-3 rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 ${
                            isActive(route.href)
                                ? `${route.bgColor} ${route.color} border-l-4 border-l-current shadow-md`
                                : 'text-white hover:bg-white/20 hover:text-white hover:shadow-sm'
                        }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                isActive(route.href) ? route.bgColor : 'bg-gray-700 group-hover:bg-gray-600'
                            }`}
                        >
                            <div className={isActive(route.href) ? route.color : 'text-gray-300 group-hover:text-white'}>{route.icon}</div>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <div className="font- truncate">{route.name}</div>
                            </div>
                        )}
                        {isActive(route.href) && !isCollapsed && <div className="h-2 w-2 animate-pulse rounded-full bg-current"></div>}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
