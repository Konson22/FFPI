export default function StatsCard({ title, value, change, changeType, icon, color = 'blue' }) {
    const colorClasses = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        purple: 'bg-purple-50 text-purple-600',
        orange: 'bg-orange-50 text-orange-600',
        red: 'bg-red-50 text-red-600',
    };

    const changeColorClasses = {
        positive: 'text-green-600',
        negative: 'text-red-600',
        neutral: 'text-gray-600',
    };

    return (
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600">{title}</p>
                    <p className="mt-2 text-3xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <div className="mt-2 flex items-center">
                            <span className={`text-sm font-medium ${changeColorClasses[changeType] || changeColorClasses.neutral}`}>{change}</span>
                            <span className="ml-1 text-sm text-gray-500">from last month</span>
                        </div>
                    )}
                </div>
                <div className={`rounded-lg p-3 ${colorClasses[color]}`}>
                    <span className="text-2xl">{icon}</span>
                </div>
            </div>
        </div>
    );
}
