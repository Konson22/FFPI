import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminDashboard({ user, stats, recent_courses, recent_posts }) {
    return (
        <AdminLayout user={user} currentPath="/admin/dashboard">
            <Head title="Admin Dashboard" />
            
            <div className="space-y-6">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] rounded-2xl p-6 shadow-xl border border-[rgb(4,50,75)]/20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[rgb(210,166,73)]/10 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">Welcome back, {user?.name || 'Admin'}!</h1>
                            <p className="mt-2 text-white/90">Here's what's happening with your family planning platform today.</p>
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] shadow-lg border-4 border-white/20">
                                <span className="text-2xl">👋</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(29,84,114)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(29,84,114)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Courses</dt>
                                        <dd className="text-2xl font-bold text-[rgb(4,50,75)]">{stats?.total_courses || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(29,84,114)]/10 to-[rgb(4,50,75)]/10 group-hover:from-[rgb(29,84,114)]/20 group-hover:to-[rgb(4,50,75)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(29,84,114)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                                        <dd className="text-2xl font-bold text-[rgb(29,84,114)]">{stats?.total_users || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(210,166,73)]/20 to-[rgb(220,180,90)]/20 group-hover:from-[rgb(210,166,73)]/30 group-hover:to-[rgb(220,180,90)]/30 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(210,166,73)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Posts</dt>
                                        <dd className="text-2xl font-bold text-[rgb(210,166,73)]">{stats?.total_posts || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(210,166,73)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(210,166,73)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Lessons</dt>
                                        <dd className="text-2xl font-bold text-[rgb(4,50,75)]">{stats?.total_lessons || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white shadow-lg rounded-xl border border-gray-100">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        <p className="mt-1 text-sm text-gray-500">Common administrative tasks</p>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Link
                                href="/admin/modules/create"
                                className="group relative rounded-lg border border-gray-200 bg-white p-4 hover:border-[rgb(210,166,73)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(29,84,114)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(29,84,114)]/20 transition-colors">
                                        <svg className="h-5 w-5 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-medium text-gray-900">Create Module</h4>
                                        <p className="text-xs text-gray-500">Add new educational content</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href="/admin/users"
                                className="group relative rounded-lg border border-gray-200 bg-white p-4 hover:border-[rgb(210,166,73)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(29,84,114)]/10 to-[rgb(4,50,75)]/10 group-hover:from-[rgb(29,84,114)]/20 group-hover:to-[rgb(4,50,75)]/20 transition-colors">
                                        <svg className="h-5 w-5 text-[rgb(29,84,114)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-medium text-gray-900">Manage Users</h4>
                                        <p className="text-xs text-gray-500">View and manage user accounts</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href="/admin/posts"
                                className="group relative rounded-lg border border-gray-200 bg-white p-4 hover:border-[rgb(210,166,73)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(210,166,73)]/20 to-[rgb(220,180,90)]/20 group-hover:from-[rgb(210,166,73)]/30 group-hover:to-[rgb(220,180,90)]/30 transition-colors">
                                        <svg className="h-5 w-5 text-[rgb(210,166,73)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-medium text-gray-900">Moderate Posts</h4>
                                        <p className="text-xs text-gray-500">Review community content</p>
                                    </div>
                                </div>
                            </Link>

                            <Link
                                href="/admin/settings"
                                className="group relative rounded-lg border border-gray-200 bg-white p-4 hover:border-[rgb(210,166,73)] hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
                            >
                                <div className="flex items-center">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(210,166,73)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(210,166,73)]/20 transition-colors">
                                        <svg className="h-5 w-5 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-4">
                                        <h4 className="text-sm font-medium text-gray-900">Settings</h4>
                                        <p className="text-xs text-gray-500">Configure platform settings</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Recent Courses */}
                    <div className="bg-white shadow-lg rounded-xl border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Courses</h3>
                            <p className="mt-1 text-sm text-gray-500">Latest educational content</p>
                        </div>
                        <div className="p-6">
                            {recent_courses && recent_courses.length > 0 ? (
                                <ul className="space-y-4">
                                    {recent_courses.map((course) => (
                                        <li key={course.id} className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                                <span className="text-green-600 text-sm">📚</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{course.title}</p>
                                                <p className="text-xs text-gray-500">{course.category}</p>
                                            </div>
                                            <Link
                                                href={`/admin/modules/${course.id}/edit`}
                                                className="text-[rgb(4,50,75)] hover:text-[rgb(29,84,114)] text-sm font-medium transition-colors"
                                            >
                                                Edit
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mx-auto">
                                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">No courses yet</p>
                                    <Link
                                        href="/admin/modules/create"
                                        className="mt-2 inline-flex items-center text-sm font-medium text-[rgb(4,50,75)] hover:text-[rgb(29,84,114)] transition-colors"
                                    >
                                        Create your first module
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Recent Posts */}
                    <div className="bg-white shadow-lg rounded-xl border border-gray-100">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-medium text-gray-900">Recent Posts</h3>
                            <p className="mt-1 text-sm text-gray-500">Latest community content</p>
                        </div>
                        <div className="p-6">
                            {recent_posts && recent_posts.length > 0 ? (
                                <ul className="space-y-4">
                                    {recent_posts.map((post) => (
                                        <li key={post.id} className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                                                <span className="text-indigo-600 text-sm">💬</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                                                <p className="text-xs text-gray-500">by {post.user?.name}</p>
                                            </div>
                                            <Link
                                                href={`/admin/posts`}
                                                className="text-[rgb(210,166,73)] hover:text-[rgb(220,180,90)] text-sm font-medium transition-colors"
                                            >
                                                Review
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mx-auto">
                                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">No posts yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}