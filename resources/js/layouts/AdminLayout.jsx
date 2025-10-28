import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLayout({ children, user, currentPath }) {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [collapsedSections, setCollapsedSections] = useState({});
    const [showFeedback, setShowFeedback] = useState(false);
    const { post } = useForm();

    const handleLogout = () => {
        post('/admin/logout');
    };

    const toggleSection = (sectionId) => {
        setCollapsedSections(prev => ({
            ...prev,
            [sectionId]: !prev[sectionId]
        }));
    };

    const handleFeedback = (rating, comment) => {
        console.log('Feedback:', { rating, comment });
        setShowFeedback(false);
    };

    const isActive = (href) => {
        return currentPath === href || currentPath.startsWith(href + '/');
    };

    const navigationSections = [
        {
            id: 'overview',
            title: 'Overview',
            icon: '📊',
            items: [
                {
                    name: 'Dashboard',
                    href: '/admin/dashboard',
                    icon: '📈'
                }
            ]
        },
        {
            id: 'content',
            title: 'Content',
            icon: '📚',
            items: [
                {
                    name: 'Manage Courses',
                    href: '/admin/courses',
                    icon: '🎓'
                },
                {
                    name: 'Manage Posts',
                    href: '/admin/posts',
                    icon: '💬'
                }
            ]
        },
        {
            id: 'users',
            title: 'Users',
            icon: '👥',
            items: [
                {
                    name: 'User Management',
                    href: '/admin/users',
                    icon: '👤'
                },
                {
                    name: 'Expert Management',
                    href: '/admin/experts',
                    icon: '🏥'
                }
            ]
        },
        {
            id: 'system',
            title: 'Settings',
            icon: '⚙️',
            items: [
                {
                    name: 'System Settings',
                    href: '/admin/settings',
                    icon: '🔧'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title="Admin Dashboard" />
            
            {/* Top Navigation Bar */}
            <nav className="sticky top-0 z-50 border-b border-green-100 bg-white/90 backdrop-blur-lg shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo and Brand */}
                        <div className="flex items-center">
                            <Link href="/admin/dashboard" className="group flex items-center space-x-3">
                                                                 <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-all duration-200 group-hover:shadow-xl group-hover:scale-105">
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
                                    <span className="text-lg font-bold text-gray-900">Admin Panel</span>
                                    <p className="-mt-0.5 text-xs text-gray-500">Family Planning</p>
                                </div>
                            </Link>
                        </div>

                        {/* Mobile menu button */}
                        <div className="flex items-center lg:hidden">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>

                        {/* User Menu */}
                        <div className="flex items-center space-x-4">
                                                         <div className="hidden sm:flex items-center space-x-3">
                                 <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white font-semibold shadow-md">
                                    {user?.name?.charAt(0) || 'A'}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {user?.name || 'Admin User'}
                                    </p>
                                    <p className="text-xs text-gray-500">Administrator</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                title="Logout"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex">
                {/* Desktop Sidebar */}
                <aside className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-slate-800 backdrop-blur-sm border-r border-slate-700 shadow-lg transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-72' : 'w-20'} hidden lg:block`}>
                    {/* Brand Header */}
                    <div className="h-20 flex items-center justify-center border-b border-slate-700">
                                                                                                         <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)} 
                            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                        >
                            <svg className={`h-5 w-5 transition-transform duration-300 ${sidebarOpen ? '' : 'rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                                                                                                   {!sidebarOpen && (
                              <div className="h-12 w-12 rounded-xl bg-green-500 flex items-center justify-center text-2xl">
                                <img
                                    src="/images/ffpi-logo.jpg"
                                    alt="FFPI"
                                    className="h-full w-full object-cover rounded-xl"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
                        {navigationSections.map((section) => (
                            <div key={section.id} className="space-y-1">
                                {/* Section Header */}
                                {!sidebarOpen ? (
                                    <div className="py-2 px-3 flex justify-center">
                                        <span className="text-2xl" title={section.title}>{section.icon}</span>
                                    </div>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => toggleSection(section.id)}
                                            className="w-full flex items-center justify-between px-3 py-2 rounded-xl hover:bg-slate-700 text-sm font-semibold text-slate-300 transition-colors group"
                                        >
                                            <div className="flex items-center space-x-3">
                                                <span className="text-xl">{section.icon}</span>
                                                <span className="text-slate-200 group-hover:text-white">{section.title}</span>
                                            </div>
                                            <svg 
                                                className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${collapsedSections[section.id] ? 'rotate-180' : ''}`} 
                                                fill="none" 
                                                stroke="currentColor" 
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Section Items */}
                                                                                 {!collapsedSections[section.id] && (
                                             <div className="ml-2 pl-6 border-l-2 border-slate-600 space-y-1">
                                                {section.items.map((item) => (
                                                    <Link
                                                        key={item.href}
                                                        href={item.href}
                                                        className={`group relative flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm transition-all duration-200 ${
                                                            isActive(item.href)
                                                                ? 'bg-blue-600 text-white font-medium shadow-sm'
                                                                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                                                        }`}
                                                    >
                                                        <span className="text-lg">{item.icon}</span>
                                                        <span className="flex-1">{item.name}</span>
                                                        {isActive(item.href) && (
                                                            <div className="h-2 w-2 rounded-full bg-blue-300"></div>
                                                        )}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </nav>
                    
                    {/* Footer Section */}
                    <div className="border-t border-slate-700 p-4">
                        {sidebarOpen ? (
                            <div className="space-y-3">
                                {/* User Profile */}
                                <div className="flex items-center space-x-3 p-3 rounded-xl bg-slate-700 border border-slate-600 shadow-sm">
                                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold shadow-md">
                                        {user?.name?.charAt(0) || 'A'}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-semibold text-white truncate">
                                            {user?.name || 'Admin User'}
                                        </div>
                                        <div className="text-xs text-slate-400 truncate">
                                            System Administrator
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Logout Button */}
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 hover:text-white border border-slate-600 hover:border-slate-500 transition-all duration-200 font-medium text-sm"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        ) : (
                                                                                                                   <div className="flex justify-center">
                                  <button
                                      onClick={handleLogout}
                                      className="p-2 rounded-xl hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                                    title="Logout"
                                >
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>
                </aside>

                {/* Mobile Sidebar Overlay */}
                {sidebarOpen && (
                    <div className="fixed inset-0 z-30 lg:hidden">
                        <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
                        <aside className="fixed inset-y-0 left-0 flex w-80 flex-col bg-white shadow-2xl">
                            <div className="flex h-16 items-center justify-between px-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">Navigation</h2>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                                >
                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                            <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-2">
                                {navigationSections.map((section) => (
                                    <div key={section.id} className="space-y-1">
                                        <div className="flex items-center space-x-3 px-3 py-2">
                                            <span className="text-2xl">{section.icon}</span>
                                            <span className="text-sm font-semibold text-gray-700">{section.title}</span>
                                        </div>
                                        <div className="ml-2 pl-6 border-l-2 border-gray-100 space-y-1">
                                            {section.items.map((item) => (
                                                <Link
                                                    key={item.href}
                                                    href={item.href}
                                                    className={`flex items-center space-x-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                                                        isActive(item.href)
                                                            ? 'bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 font-medium'
                                                            : 'text-gray-600 hover:bg-gray-50'
                                                    }`}
                                                    onClick={() => setSidebarOpen(false)}
                                                >
                                                    <span className="text-lg">{item.icon}</span>
                                                    <span>{item.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </nav>
                            <div className="border-t border-gray-200 px-6 py-4 space-y-3">
                                <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-semibold">
                                        {user?.name?.charAt(0) || 'A'}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">{user?.name || 'Admin User'}</div>
                                        <div className="text-xs text-gray-500">System Administrator</div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-medium"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </aside>
                    </div>
                )}

                {/* Main Content */}
                <main className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}