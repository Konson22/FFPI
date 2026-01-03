import { Link, router } from '@inertiajs/react';
import { Bell, HelpCircle, LogOut, Menu, Search, Settings, User, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function Navbar({ user, role, onToggleSidebar }) {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsUserMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getRoleRoutes = () => {
        switch (role) {
            case 'admin':
                return [
                    {
                        name: 'Dashboard',
                        href: '/admin/dashboard',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Users',
                        href: '/admin/users',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                />
                            </svg>
                        ),
                        color: 'text-purple-600',
                        bgColor: 'bg-purple-50',
                    },
                    {
                        name: 'Content',
                        href: '/admin/content/topics',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        ),
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                ];
            case 'expert':
                return [
                    {
                        name: 'Dashboard',
                        href: '/experts/dashboard',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Questions',
                        href: '/experts/questions',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                    {
                        name: 'Content',
                        href: '/experts/content',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                            </svg>
                        ),
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        name: 'Moderation',
                        href: '/experts/moderation',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                        ),
                        color: 'text-red-600',
                        bgColor: 'bg-red-50',
                    },
                ];
            case 'user':
                return [
                    {
                        name: 'Dashboard',
                        href: '/user/dashboard',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z" />
                            </svg>
                        ),
                        color: 'text-blue-600',
                        bgColor: 'bg-blue-50',
                    },
                    {
                        name: 'Learn',
                        href: '/user/learn',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        ),
                        color: 'text-green-600',
                        bgColor: 'bg-green-50',
                    },
                    {
                        name: 'Quiz',
                        href: '/user/quiz',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                        ),
                        color: 'text-purple-600',
                        bgColor: 'bg-purple-50',
                    },
                    {
                        name: 'Ask',
                        href: '/user/ask',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        ),
                        color: 'text-yellow-600',
                        bgColor: 'bg-yellow-50',
                    },
                    {
                        name: 'Services',
                        href: '/user/services',
                        icon: (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ),
                        color: 'text-red-600',
                        bgColor: 'bg-red-50',
                    },
                ];
            default:
                return [];
        }
    };

    const roleRoutes = getRoleRoutes();

    const handleLogout = () => {
        router.post(
            '/logout',
            {},
            {
                onStart: () => {
                    // Optional: Add loading state
                    console.log('Logging out...');
                },
                onSuccess: () => {
                    // Optional: Add success feedback
                    console.log('Logged out successfully');
                },
                onError: (errors) => {
                    // Optional: Handle errors
                    console.error('Logout error:', errors);
                },
            },
        );
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-gradient-to-r from-white via-gray-50 to-blue-50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile sidebar toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg p-2 text-gray-700 hover:bg-white/60 lg:hidden"
                            aria-label="Open sidebar"
                            onClick={() => onToggleSidebar && onToggleSidebar(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        {/* Logo and Brand */}
                        <Link href="/" className="group flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full shadow-lg transition-all duration-200 group-hover:shadow-xl">
                                <img
                                    src="/images/ffpi-logo.jpg"
                                    alt="FFPI Logo"
                                    className="h-8 w-8 object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-sm font-bold text-white">FP</span>
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-bold text-gray-900">Family Planning</span>
                                <p className="-mt-1 text-xs text-gray-500">Your Health Journey</p>
                            </div>
                        </Link>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        {/* Notifications */}
                        <button className="relative rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/60 hover:text-gray-600">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-red-500 to-pink-500"></span>
                        </button>

                        {/* Search */}
                        <button className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/60 hover:text-gray-600">
                            <Search className="h-5 w-5" />
                        </button>

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-white/60 hover:text-gray-900 focus:outline-none"
                            >
                                <div className="hidden text-left md:block">
                                    <p className="font-semibold text-gray-900">{user?.name || 'User'}</p>
                                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                                </div>
                                <User className="h-4 w-4 text-gray-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] min-w-[280px] rounded-xl border border-gray-200/60 bg-white/95 py-2 shadow-xl backdrop-blur-sm sm:right-0 sm:w-64">
                                    <div className="border-b border-gray-200/60 px-4 py-3">
                                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-500 capitalize">{role}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <UserIcon className="h-4 w-4" />
                                            <span>Profile Settings</span>
                                        </Link>
                                        <Link
                                            href="/settings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>Account Settings</span>
                                        </Link>
                                        <Link
                                            href="/help"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <HelpCircle className="h-4 w-4" />
                                            <span>Help & Support</span>
                                        </Link>
                                    </div>
                                    <div className="border-t border-gray-200/60"></div>
                                    <button
                                        onClick={handleLogout}
                                        className="flex w-full items-center space-x-3 px-4 py-2 text-sm text-red-600 transition-colors hover:bg-red-50"
                                    >
                                        <LogOut className="h-4 w-4" />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
