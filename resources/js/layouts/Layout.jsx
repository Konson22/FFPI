import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Layout({ children }) {
    const { auth } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const getRoleBasedNavigation = () => {
        if (!auth.user) return [];

        switch (auth.user.role) {
            case 'admin':
                return [
                    { name: 'Dashboard', href: route('admin.dashboard'), icon: 'dashboard' },
                    { name: 'Users', href: route('admin.users.index'), icon: 'users' },
                    { name: 'Content', href: route('admin.content.topics'), icon: 'content' },
                    { name: 'Settings', href: '#', icon: 'settings' },
                ];
            case 'expert':
                return [
                    { name: 'Dashboard', href: route('experts.dashboard'), icon: 'dashboard' },
                    { name: 'My Topics', href: route('experts.topics.index'), icon: 'topics' },
                    { name: 'Create Topic', href: route('experts.topics.create'), icon: 'create' },
                    { name: 'Moderation', href: route('experts.moderation.index'), icon: 'moderation' },
                ];
            case 'user':
            default:
                return [
                    { name: 'Dashboard', href: route('user.dashboard'), icon: 'dashboard' },
                    { name: 'Health Tracking', href: route('user.health.index'), icon: 'health' },
                    { name: 'Our Team', href: route('user.users'), icon: 'users' },
                    { name: 'Profile', href: route('user.profile.index'), icon: 'profile' },
                ];
        }
    };

    const navigation = getRoleBasedNavigation();

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'expert':
                return 'bg-blue-100 text-blue-800';
            case 'user':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar */}
            <div className={`fixed inset-0 z-40 lg:hidden ${sidebarOpen ? 'block' : 'hidden'}`}>
                <div className="bg-opacity-75 fixed inset-0 bg-gray-600" onClick={() => setSidebarOpen(false)}></div>
                <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:ring-2 focus:ring-white focus:outline-none focus:ring-inset"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <h1 className="text-xl font-bold text-gray-900">Family Planning</h1>
                        </div>
                        <nav className="mt-5 space-y-1 px-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="group flex items-center rounded-md px-2 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0">
                <div className="flex w-64 flex-col">
                    <div className="flex h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                        <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
                            <div className="flex flex-shrink-0 items-center px-4">
                                <h1 className="text-xl font-bold text-gray-900">Family Planning</h1>
                            </div>
                            <nav className="mt-5 flex-1 space-y-1 px-2">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className="group flex items-center rounded-md px-2 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                        <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    {auth.user?.avatar ? (
                                        <img className="h-8 w-8 rounded-full" src={auth.user.avatar} alt={auth.user.name} />
                                    ) : (
                                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                            <span className="text-sm font-medium text-gray-700">{auth.user?.name?.charAt(0).toUpperCase()}</span>
                                        </div>
                                    )}
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm font-medium text-gray-700">{auth.user?.name}</p>
                                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getRoleColor(auth.user?.role)}`}>
                                        {auth.user?.role}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col lg:pl-64">
                <div className="sticky top-0 z-10 bg-gray-100 pt-1 pl-1 sm:pt-3 sm:pl-3 lg:hidden">
                    <button
                        type="button"
                        className="-mt-0.5 -ml-0.5 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
