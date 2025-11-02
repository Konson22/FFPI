import { Head } from '@inertiajs/react';
import { useState } from 'react';
import AdminNavbar from './Layout/AdminNavbar';
import AdminSidebar from './Layout/AdminSidebar';

export default function AdminLayout({ children, user, role, currentPath = '' }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
            <Head title="Admin Panel" />

            {/* Navbar */}
            <AdminNavbar user={user} role={role} onToggleSidebar={() => setMobileSidebarOpen(true)} />

            <div className="flex">
                {/* Sidebar - Hidden on mobile */}
                <div className="hidden lg:block">
                    <AdminSidebar user={user} role={role} currentPath={currentPath} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
                </div>
                {/* Mobile Sidebar Drawer */}
                {mobileSidebarOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
                            onClick={() => setMobileSidebarOpen(false)}
                            aria-hidden="true"
                        ></div>
                        <AdminSidebar
                            variant="mobile"
                            user={user}
                            role={role}
                            currentPath={currentPath}
                            onToggle={() => setMobileSidebarOpen(false)}
                        />
                    </>
                )}

                {/* Main Content */}
                <main className={`min-h-screen flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
                    <div className="p-6 bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-100 min-h-screen">{children}</div>
                </main>
            </div>
        </div>
    );
}
