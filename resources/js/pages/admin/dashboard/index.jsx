import AdminLayout from '@/components/AdminLayout';
import Chart from '@/components/admin/Chart';
import RecentActivity from '@/components/admin/RecentActivity';
import StatsCard from '@/components/admin/StatsCard';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Dashboard({ admin, stats, recentActivities, userGrowthData, contentStats, expertPerformance, user, role, currentPath }) {
    const [timeRange, setTimeRange] = useState('7d');

    const chartData = {
        '7d': {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            users: userGrowthData?.slice(-7).map((item) => item.users) || [0, 0, 0, 0, 0, 0, 0],
            appointments: [4, 6, 2, 3, 1, 2, 5], // Static data for now
        },
        '30d': {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            users: userGrowthData?.slice(-4).map((item) => item.users) || [0, 0, 0, 0],
            appointments: [18, 24, 15, 28], // Static data for now
        },
        '90d': {
            labels: ['Month 1', 'Month 2', 'Month 3'],
            users: userGrowthData?.slice(-3).map((item) => item.users) || [0, 0, 0],
            appointments: [67, 78, 89], // Static data for now
        },
    };

    const currentChartData = chartData[timeRange];

    return (
        <AdminLayout user={user} role={role} currentPath={currentPath}>
            <Head title="Admin Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Welcome back, {admin.name}!</h1>
                        <p className="mt-1 text-gray-600">Here's what's happening with your family planning platform.</p>
                    </div>
                    <div className="flex space-x-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                        </select>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <StatsCard title="Total Users" value={stats.total_users || 0} change="+12%" changeType="positive" icon="👥" color="blue" />
                    <StatsCard
                        title="Healthcare Experts"
                        value={stats.total_experts || 0}
                        change="+5%"
                        changeType="positive"
                        icon="👨‍⚕️"
                        color="green"
                    />
                    <StatsCard title="Total Posts" value={stats.total_posts || 0} change="+23%" changeType="positive" icon="📝" color="purple" />
                    <StatsCard
                        title="Total Appointments"
                        value={stats.total_appointments || 0}
                        change="+8%"
                        changeType="positive"
                        icon="📅"
                        color="orange"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* User Growth Chart */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
                            <div className="flex space-x-2">
                                <button className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">Users</button>
                                <button className="rounded-full px-3 py-1 text-sm text-gray-500 hover:bg-gray-100">Appointments</button>
                            </div>
                        </div>
                        <Chart data={currentChartData} type="line" height={300} />
                    </div>

                    {/* Activity Distribution */}
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-lg font-semibold text-gray-900">Activity Distribution</h3>
                        <Chart
                            data={{
                                labels: ['Users', 'Experts', 'Appointments', 'Comments'],
                                datasets: [
                                    {
                                        data: [stats.total_users, stats.total_experts, stats.total_appointments || 0, stats.total_comments],
                                        backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'],
                                    },
                                ],
                            }}
                            type="doughnut"
                            height={300}
                        />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <RecentActivity title="Recent Activities" data={recentActivities || []} type="activities" />
                    <RecentActivity title="Expert Performance" data={expertPerformance || []} type="experts" />
                </div>

                {/* Quick Actions */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                        <button className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50">
                            <div className="mb-2 text-2xl">👥</div>
                            <div className="text-sm font-medium text-gray-900">Manage Users</div>
                        </button>
                        <button className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50">
                            <div className="mb-2 text-2xl">👨‍⚕️</div>
                            <div className="text-sm font-medium text-gray-900">Manage Experts</div>
                        </button>
                        <button className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50">
                            <div className="mb-2 text-2xl">📊</div>
                            <div className="text-sm font-medium text-gray-900">View Analytics</div>
                        </button>
                        <button className="rounded-lg border border-gray-200 p-4 text-center transition-colors hover:bg-gray-50">
                            <div className="mb-2 text-2xl">⚙️</div>
                            <div className="text-sm font-medium text-gray-900">Settings</div>
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
