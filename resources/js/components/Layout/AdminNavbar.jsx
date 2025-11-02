import { Link, router } from '@inertiajs/react';
import { Bell, HelpCircle, LogOut, Menu, Search, Settings, User, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AdminNavbar({ user, role, onToggleSidebar }) {
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

    const handleLogout = () => {
        router.post(
            '/logout',
            {},
            {
                onStart: () => {
                    console.log('Logging out...');
                },
                onSuccess: () => {
                    console.log('Logged out successfully');
                },
                onError: (errors) => {
                    console.error('Logout error:', errors);
                },
            },
        );
    };

    return (
        <nav className="sticky top-0 z-50 border-b border-[rgb(4,50,75)]/10 bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] shadow-lg backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile sidebar toggle */}
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-lg p-2 text-white/90 hover:bg-white/10 hover:text-white lg:hidden transition-colors"
                            aria-label="Open sidebar"
                            onClick={() => onToggleSidebar && onToggleSidebar(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                        {/* Logo and Brand */}
                        <Link href="/admin/dashboard" className="group flex items-center space-x-3">
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-200 group-hover:scale-105 group-hover:shadow-xl group-hover:bg-white/20">
                                <img
                                    src="/images/ffpi-logo.jpg"
                                    alt="FFPI Logo"
                                    className="h-full w-full object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'block';
                                    }}
                                />
                                <span className="hidden text-sm font-bold text-white">FP</span>
                            </div>
                            <div className="hidden sm:block">
                                <span className="text-xl font-bold text-white">FFPI Admin</span>
                                <p className="-mt-1 text-xs text-white/80">Family Planning Portal</p>
                            </div>
                        </Link>
                    </div>

                    {/* User Menu */}
                    <div className="flex items-center space-x-3">
                        {/* Notifications */}
                        <button className="relative rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                            <Bell className="h-5 w-5" />
                            <span className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-gradient-to-r from-[rgb(210,166,73)] to-[rgb(220,180,90)] border-2 border-[rgb(4,50,75)]"></span>
                        </button>

                        {/* Search */}
                        <button className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 hover:text-white">
                            <Search className="h-5 w-5" />
                        </button>

                        {/* User Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-[rgb(210,166,73)] focus:ring-offset-2 focus:ring-offset-[rgb(4,50,75)]"
                            >
                                <div className="hidden text-left md:block">
                                    <p className="font-semibold text-white">{user?.name || 'Admin'}</p>
                                    <p className="text-xs text-white/70 capitalize">{role || 'Administrator'}</p>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] font-semibold text-[rgb(4,50,75)] shadow-lg border-2 border-white/30">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] min-w-[280px] rounded-xl border border-[rgb(4,50,75)]/20 bg-white py-2 shadow-2xl backdrop-blur-sm sm:right-0 sm:w-64">
                                    <div className="border-b border-gray-200/60 bg-gradient-to-r from-[rgb(4,50,75)] to-[rgb(29,84,114)] px-4 py-3">
                                        <p className="text-sm font-semibold text-white">{user?.name || 'Admin'}</p>
                                        <p className="text-xs text-white/80 capitalize">{role || 'Administrator'}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href="/admin/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[rgb(4,50,75)]/5"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <UserIcon className="h-4 w-4" />
                                            <span>Admin Profile</span>
                                        </Link>
                                        <Link
                                            href="/admin/settings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[rgb(4,50,75)]/5"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>System Settings</span>
                                        </Link>
                                        <Link
                                            href="/help"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-[rgb(4,50,75)]/5"
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
