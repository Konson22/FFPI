import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, user, currentPath }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { post } = useForm();

    const handleLogout = () => {
        post('/admin/logout');
    };

    const isActive = (href) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const navigationItems = [
        {
            name: 'Dashboard',
            href: '/admin/dashboard',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                </svg>
            ),
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
        },
        {
            name: 'Expert Management',
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
        },
        {
            name: 'Modules',
            href: '/admin/modules',
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
        },
        {
            name: 'Health Protections',
            href: '/admin/reproductive-health-protections',
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
        },
        {
            name: 'Manage Posts',
            href: '/admin/posts',
            icon: (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
            ),
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
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            <Head title="Admin Dashboard" />

            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 border-b border-[rgb(4,50,75)]/10 bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-lg backdrop-blur-lg">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <Link href="/admin/dashboard" className="group flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-white/20">
                                    <img
                                        src="/images/ffpi-logo.jpg"
                                        alt="FFPI Logo"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.target.src = '';
                                        }}
                                    />
                                </div>
                                <div className="hidden sm:block">
                                    <span className="text-lg font-bold text-white">FFPI Admin</span>
                                    <p className="-mt-0.5 text-xs text-white/80">Family Planning Portal</p>
                                </div>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white focus:ring-2 focus:ring-[rgb(210,166,73)] focus:outline-none focus:ring-inset transition-colors"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                            <div className="hidden items-center space-x-3 sm:flex">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] font-semibold text-[rgb(4,50,75)] shadow-lg border-2 border-white/30">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-white/80">Administrator</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                title="Logout"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className="fixed top-16 left-0 z-30 hidden h-[calc(100vh-4rem)] w-72 border-r border-[rgb(4,50,75)]/20 bg-gradient-to-b from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-2xl lg:block">
                    {/* Brand Header */}
                    <div className="flex h-20 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-sm">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 border border-white/20 shadow-lg">
                                <img
                                    src="/images/ffpi-logo.jpg"
                                    alt="FFPI"
                                    className="h-full w-full rounded-lg object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                            <div>
                                <div className="text-sm font-bold text-white">Navigation</div>
                                <div className="text-xs text-white/70">Admin Portal</div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group relative flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                    isActive(item.href)
                                        ? 'bg-gradient-to-r from-[rgb(210,166,73)] to-[rgb(220,180,90)] text-[rgb(4,50,75)] shadow-lg shadow-[rgb(210,166,73)]/30'
                                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                                }`}
                            >
                                <div className={`flex-shrink-0 ${isActive(item.href) ? 'text-[rgb(4,50,75)]' : 'text-white/60 group-hover:text-white'}`}>
                                    {item.icon}
                                </div>
                                <span className="flex-1 font-medium">{item.name}</span>
                                {isActive(item.href) && <div className="h-2 w-2 rounded-full bg-[rgb(4,50,75)]"></div>}
                            </Link>
                        ))}
                    </nav>

                    {/* Footer Section */}
                    <div className="border-t border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                        <div className="space-y-3">
                            {/* User Profile */}
                            <div className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/10 p-3 backdrop-blur-sm">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] font-semibold text-[rgb(4,50,75)] shadow-lg">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <div className="min-w-0 flex-1">
                                    <div className="truncate text-sm font-semibold text-white">{user?.name || 'Admin User'}</div>
                                    <div className="truncate text-xs text-white/60">System Administrator</div>
                                </div>
                            </div>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center justify-center space-x-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 shadow-sm transition-all duration-200 hover:border-red-400/50 hover:bg-red-500/20 hover:text-white hover:shadow-lg"
                            >
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                    />
                                </svg>
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-30 lg:hidden">
                        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}></div>
                        <aside className="fixed inset-y-0 left-0 flex w-80 flex-col bg-gradient-to-b from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-2xl">
                            <div className="flex h-16 items-center justify-between border-b border-white/10 bg-white/5 px-6 backdrop-blur-sm">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 border border-white/20">
                                        <img
                                            src="/images/ffpi-logo.jpg"
                                            alt="FFPI"
                                            className="h-full w-full rounded-lg object-cover"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                    <h2 className="text-lg font-bold text-white">FFPI Admin</h2>
                                </div>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                                {navigationItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center space-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                            isActive(item.href)
                                                ? 'bg-gradient-to-r from-[rgb(210,166,73)] to-[rgb(220,180,90)] text-[rgb(4,50,75)] shadow-lg'
                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                        }`}
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <div className={`flex-shrink-0 ${isActive(item.href) ? 'text-[rgb(4,50,75)]' : 'text-white/60'}`}>{item.icon}</div>
                                        <span>{item.name}</span>
                                    </Link>
                                ))}
                            </nav>
                            <div className="space-y-3 border-t border-white/10 bg-white/5 px-6 py-4 backdrop-blur-sm">
                                <div className="flex items-center space-x-3 rounded-lg border border-white/20 bg-white/10 p-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] font-semibold text-[rgb(4,50,75)]">
                                        {user?.name?.charAt(0) || 'A'}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-white">{user?.name || 'Admin User'}</div>
                                        <div className="text-xs text-white/60">System Administrator</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center space-x-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white/90 transition-all duration-200 hover:border-red-400/50 hover:bg-red-500/20 hover:text-white"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Main Content */}
                <main className="flex-1 transition-all duration-300 ease-in-out lg:ml-72">
                    <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 min-h-[calc(100vh-4rem)]">{children}</div>
                </main>
            </div>
        </div>
    );
}
