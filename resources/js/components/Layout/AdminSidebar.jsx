import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminSidebar({ user, role, currentPath = '', onToggle, variant = 'desktop' }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
        if (onToggle) onToggle();
    };

    const adminRoutes = [
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
            name: 'Healthcare Experts',
            href: '/admin/experts',
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
            description: 'Manage healthcare professionals',
            color: 'text-green-600',
            bgColor: 'bg-green-50',
        },
        {
            name: 'Content Management',
            href: '/admin/content',
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
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50',
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
            name: 'System Settings',
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

    const isActive = (href) => {
        if (!currentPath) return false;
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const containerClass =
        variant === 'mobile'
            ? `fixed top-0 left-0 z-50 h-screen w-64 border-r border-[rgb(4,50,75)]/20 bg-gradient-to-b from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-xl transition-all duration-300`
            : `fixed top-0 left-0 z-40 h-screen border-r border-[rgb(4,50,75)]/20 bg-gradient-to-b from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-xl transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} hidden lg:block`;

    return (
        <div className={containerClass}>
            {/* Sidebar Toggle Button */}
            <div className="border-b border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center justify-center">
                    <button onClick={handleToggle} className="rounded-lg p-2 transition-all duration-200 hover:bg-white/10 hover:shadow-md text-white/80 hover:text-white">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-2 p-4">
                {adminRoutes.map((route) => (
                    <Link
                        key={route.name}
                        href={route.href}
                        className={`group flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                            isActive(route.href)
                                ? 'bg-gradient-to-r from-[rgb(210,166,73)] to-[rgb(220,180,90)] text-[rgb(4,50,75)] shadow-lg shadow-[rgb(210,166,73)]/30'
                                : 'text-white/80 hover:bg-white/10 hover:text-white hover:shadow-sm'
                        }`}
                    >
                        <div
                            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                                isActive(route.href) ? 'bg-[rgb(4,50,75)]/20' : 'bg-white/5 group-hover:bg-white/10'
                            }`}
                        >
                            <div className={isActive(route.href) ? 'text-[rgb(4,50,75)]' : 'text-white/60 group-hover:text-white'}>{route.icon}</div>
                        </div>
                        {!isCollapsed && (
                            <div className="min-w-0 flex-1">
                                <div className="font-medium truncate">{route.name}</div>
                                <div className="truncate text-xs text-white/60">{route.description}</div>
                            </div>
                        )}
                        {isActive(route.href) && !isCollapsed && <div className="h-2 w-2 rounded-full bg-[rgb(4,50,75)]"></div>}
                    </Link>
                ))}
            </nav>

            {/* Admin Info */}
            {!isCollapsed && (
                <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] border-2 border-white/30">
                            <span className="text-sm font-semibold text-[rgb(4,50,75)]">{user?.name?.charAt(0).toUpperCase() || 'A'}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                            <p className="truncate text-xs text-white/60">Administrator</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
