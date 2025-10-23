import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function UserLayout({ children, user, role, currentPath }) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-green-50/20">
            <Head title="Family Planning" />

            {/* Navbar */}
            <Navbar user={user} role={role} />

            <div className="relative flex">
                {/* Sidebar */}
                <Sidebar user={user} role={role} currentPath={currentPath} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

                {/* Main Content */}
                <main className={`min-h-screen flex-1 transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'ml-16' : 'ml-72'}`}>
                    <div className="p-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
