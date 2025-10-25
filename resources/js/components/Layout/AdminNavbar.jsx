import { Link, router } from '@inertiajs/react';
import { Bell, HelpCircle, LogOut, Search, Settings, User, User as UserIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function AdminNavbar({ user, role }) {
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
        <nav className="sticky top-0 z-50 border-b border-gray-200/60 bg-gradient-to-r from-white via-gray-50 to-blue-50 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo and Brand */}
                    <div className="flex items-center">
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
                                <span className="text-xl font-bold text-gray-900">Admin Panel</span>
                                <p className="-mt-1 text-xs text-gray-500">System Management</p>
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
                                    <p className="font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                                    <p className="text-xs text-gray-500 capitalize">{role || 'Administrator'}</p>
                                </div>
                                <User className="h-4 w-4 text-gray-400" />
                            </button>

                            {/* Dropdown Menu */}
                            {isUserMenuOpen && (
                                <div className="absolute right-0 z-50 mt-2 w-72 max-w-[calc(100vw-1rem)] min-w-[280px] rounded-xl border border-gray-200/60 bg-white/95 py-2 shadow-xl backdrop-blur-sm sm:right-0 sm:w-64">
                                    <div className="border-b border-gray-200/60 px-4 py-3">
                                        <p className="text-sm font-semibold text-gray-900">{user?.name || 'Admin'}</p>
                                        <p className="text-xs text-gray-500 capitalize">{role || 'Administrator'}</p>
                                    </div>
                                    <div className="py-1">
                                        <Link
                                            href="/admin/profile"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <UserIcon className="h-4 w-4" />
                                            <span>Admin Profile</span>
                                        </Link>
                                        <Link
                                            href="/admin/settings"
                                            className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
                                            onClick={() => setIsUserMenuOpen(false)}
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span>System Settings</span>
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
