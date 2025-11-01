import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function UserLayout({ children, user, role, currentPath }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20">
            <Head title="Family Planning" />

            {/* Navbar */}
            <Navbar user={user} role={role} onToggleSidebar={() => setMobileSidebarOpen(true)} />

            <div className="flex">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden lg:block">
                    <Sidebar user={user} role={role} currentPath={currentPath} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
                </div>
                {/* Mobile Sidebar Drawer */}
                {mobileSidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileSidebarOpen(false)}
                            aria-hidden="true"
                        ></div>
                        <Sidebar variant="mobile" user={user} role={role} currentPath={currentPath} onToggle={() => setMobileSidebarOpen(false)} />
                    </>
                )}

                {/* Main Content */}
                <main className={`min-h-screen flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
                    <div className="p-2 lg:p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
