import { Head, Link } from '@inertiajs/react';
import UserLayout from '../../components/Layout/UserLayout';

export default function SimpleAdminDashboard({ user }) {
    return (
        <UserLayout user={user} role="admin" currentPath="/admin">
            <Head title="Admin Dashboard" />
            
            <div className="min-h-screen bg-gray-50 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">FFPI Admin Dashboard</h1>
                        <p className="mt-2 text-gray-600">Manage your family planning platform</p>
                    </div>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">📚</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Courses</dt>
                                            <dd className="text-lg font-medium text-gray-900">Manage Learning Content</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">👥</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Users</dt>
                                            <dd className="text-lg font-medium text-gray-900">Manage Platform Users</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">💬</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Community</dt>
                                            <dd className="text-lg font-medium text-gray-900">Moderate Content</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white overflow-hidden shadow rounded-lg">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-orange-500 rounded-md flex items-center justify-center">
                                            <span className="text-white text-sm font-medium">⚙️</span>
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">Settings</dt>
                                            <dd className="text-lg font-medium text-gray-900">Platform Configuration</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Admin Actions */}
                    <div className="bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Admin Actions</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Link
                                    href="/user/learn"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-500 rounded-lg border border-gray-200 hover:border-gray-300"
                                >
                                    <div>
                                        <span className="rounded-lg inline-flex p-3 bg-blue-50 text-blue-600 ring-4 ring-white">
                                            📚
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Manage Courses
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Create, edit, and organize educational content
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/user/community"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-green-500 rounded-lg border border-gray-200 hover:border-gray-300"
                                >
                                    <div>
                                        <span className="rounded-lg inline-flex p-3 bg-green-50 text-green-600 ring-4 ring-white">
                                            💬
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            Community Management
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            Moderate posts and community content
                                        </p>
                                    </div>
                                </Link>

                                <Link
                                    href="/user/dashboard"
                                    className="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-purple-500 rounded-lg border border-gray-200 hover:border-gray-300"
                                >
                                    <div>
                                        <span className="rounded-lg inline-flex p-3 bg-purple-50 text-purple-600 ring-4 ring-white">
                                            👥
                                        </span>
                                    </div>
                                    <div className="mt-4">
                                        <h3 className="text-lg font-medium">
                                            <span className="absolute inset-0" aria-hidden="true" />
                                            User Management
                                        </h3>
                                        <p className="mt-2 text-sm text-gray-500">
                                            View and manage platform users
                                        </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* System Status */}
                    <div className="mt-8 bg-white shadow rounded-lg">
                        <div className="px-4 py-5 sm:p-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Laravel Server</p>
                                        <p className="text-sm text-gray-500">Running on port 8000</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Vite Dev Server</p>
                                        <p className="text-sm text-gray-500">Running on port 5173</p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-gray-900">Database</p>
                                        <p className="text-sm text-gray-500">Connected</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
