import AdminLayout from '../../../layouts/AdminLayout';
import Chart from '../../../components/admin/Chart';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Analytics({ analytics, user }) {
    const [timeRange, setTimeRange] = useState('30d');

    const engagementData = analytics?.userEngagement || {};
    const contentData = analytics?.contentPerformance || [];
    const expertData = analytics?.expertActivity || [];
    const platformData = analytics?.platformUsage || {};

    // User growth over time (simulated based on available data)
    const userGrowthChart = {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        users: [150, 230, 310, 420],
        engagements: [1200, 1800, 2400, 3000],
    };

    // Content performance chart
    const contentChartData = {
        labels: contentData.slice(0, 5).map((item) => item.title?.substring(0, 20) || 'Post'),
        datasets: [
            {
                data: contentData.slice(0, 5).map((item) => item.comments_count || 0),
                backgroundColor: [
                    'rgb(4, 50, 75)',
                    'rgb(29, 84, 114)',
                    'rgb(210, 166, 73)',
                    'rgb(4, 50, 75)',
                    'rgb(29, 84, 114)',
                ],
            },
        ],
    };

    // Platform usage distribution
    const platformDistribution = {
        labels: ['Active Users', 'Experts', 'Content', 'Engagements'],
        datasets: [
            {
                data: [
                    engagementData.monthly_active_users || 0,
                    expertData.length || 0,
                    contentData.length || 0,
                    platformData.total_sessions || 0,
                ],
                backgroundColor: [
                    'rgb(4, 50, 75)',
                    'rgb(29, 84, 114)',
                    'rgb(210, 166, 73)',
                    'rgb(220, 180, 90)',
                ],
            },
        ],
    };

    return (
        <AdminLayout user={user} currentPath="/admin/analytics">
            <Head title="Analytics Dashboard" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-[rgb(4,50,75)]">Analytics Dashboard</h1>
                        <p className="mt-1 text-gray-600">Comprehensive insights into your platform performance</p>
                    </div>
                    <div className="flex space-x-3">
                        <select
                            value={timeRange}
                            onChange={(e) => setTimeRange(e.target.value)}
                            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-[rgb(210,166,73)] focus:ring-2 focus:ring-[rgb(210,166,73)]/20 bg-white"
                        >
                            <option value="7d">Last 7 days</option>
                            <option value="30d">Last 30 days</option>
                            <option value="90d">Last 90 days</option>
                            <option value="1y">Last year</option>
                        </select>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Daily Active Users */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(29,84,114)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(29,84,114)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Daily Active Users</dt>
                                        <dd className="text-2xl font-bold text-[rgb(4,50,75)]">{engagementData.daily_active_users || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Weekly Active Users */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(29,84,114)]/10 to-[rgb(4,50,75)]/10 group-hover:from-[rgb(29,84,114)]/20 group-hover:to-[rgb(4,50,75)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(29,84,114)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Weekly Active Users</dt>
                                        <dd className="text-2xl font-bold text-[rgb(29,84,114)]">{engagementData.weekly_active_users || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Monthly Active Users */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(210,166,73)]/20 to-[rgb(220,180,90)]/20 group-hover:from-[rgb(210,166,73)]/30 group-hover:to-[rgb(220,180,90)]/30 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(210,166,73)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Monthly Active Users</dt>
                                        <dd className="text-2xl font-bold text-[rgb(210,166,73)]">{engagementData.monthly_active_users || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Sessions */}
                    <div className="bg-white overflow-hidden shadow-lg rounded-xl border border-gray-100 hover:shadow-xl transition-all duration-200 hover:border-[rgb(210,166,73)]/30 group">
                        <div className="p-6">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[rgb(4,50,75)]/10 to-[rgb(210,166,73)]/10 group-hover:from-[rgb(4,50,75)]/20 group-hover:to-[rgb(210,166,73)]/20 transition-colors">
                                        <svg className="h-6 w-6 text-[rgb(4,50,75)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="ml-5 w-0 flex-1">
                                    <dl>
                                        <dt className="text-sm font-medium text-gray-500 truncate">Total Sessions</dt>
                                        <dd className="text-2xl font-bold text-[rgb(4,50,75)]">{platformData.total_sessions || 0}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* User Growth Chart */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold text-[rgb(4,50,75)]">User Growth</h3>
                                <p className="mt-1 text-sm text-gray-500">Growth over the last 4 weeks</p>
                            </div>
                        </div>
                        <Chart data={userGrowthChart} type="line" height={300} />
                    </div>

                    {/* Platform Distribution */}
                    <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-lg">
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-[rgb(4,50,75)]">Platform Distribution</h3>
                            <p className="mt-1 text-sm text-gray-500">Overview of platform activity</p>
                        </div>
                        <Chart data={platformDistribution} type="doughnut" height={300} />
                    </div>
                </div>

                {/* Content Performance */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-[rgb(4,50,75)]">Top Performing Content</h3>
                        <p className="mt-1 text-sm text-gray-500">Most engaged posts and articles</p>
                    </div>
                    <div className="p-6">
                        {contentData.length > 0 ? (
                            <div className="space-y-4">
                                {contentData.slice(0, 10).map((item, index) => (
                                    <div
                                        key={item.id || index}
                                        className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-[rgb(210,166,73)]/30 hover:shadow-md transition-all duration-200"
                                    >
                                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                                            <div className="flex-shrink-0">
                                                <div
                                                    className={`flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white ${
                                                        index < 3
                                                            ? 'bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] text-[rgb(4,50,75)]'
                                                            : 'bg-gradient-to-br from-[rgb(4,50,75)] to-[rgb(29,84,114)]'
                                                    }`}
                                                >
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <h4 className="text-sm font-medium text-gray-900 truncate">{item.title || 'Untitled Post'}</h4>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-6 ml-4">
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-[rgb(4,50,75)]">{item.comments_count || 0}</div>
                                                <div className="text-xs text-gray-500">Comments</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-[rgb(29,84,114)]">{item.reactions_count || 0}</div>
                                                <div className="text-xs text-gray-500">Reactions</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-[rgb(210,166,73)]">{item.shares_count || 0}</div>
                                                <div className="text-xs text-gray-500">Shares</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mx-auto">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">No content data available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Expert Activity */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-lg">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-[rgb(4,50,75)]">Expert Activity</h3>
                        <p className="mt-1 text-sm text-gray-500">Top performing healthcare experts</p>
                    </div>
                    <div className="p-6">
                        {expertData.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expert</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointments</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {expertData.map((expert, index) => (
                                            <tr key={expert.id || index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="flex-shrink-0 h-10 w-10">
                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] font-semibold text-[rgb(4,50,75)]">
                                                                {expert.name?.charAt(0) || 'E'}
                                                            </div>
                                                        </div>
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">{expert.name || 'Unknown'}</div>
                                                            <div className="text-sm text-gray-500">{expert.email || 'N/A'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[rgb(4,50,75)] font-semibold">{expert.appointments_count || 0}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-[rgb(29,84,114)] font-semibold">{expert.posts_count || 0}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {expert.last_login_at ? new Date(expert.last_login_at).toLocaleDateString() : 'Never'}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 mx-auto">
                                    <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <p className="mt-2 text-sm text-gray-500">No expert data available</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

