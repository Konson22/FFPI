import { Link } from '@inertiajs/react';

export default function RecentActivity({ title, data, type }) {
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderAppointmentItem = (appointment) => (
        <div key={appointment.id} className="flex items-center space-x-3 border-b border-gray-100 py-3 last:border-b-0">
            <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                    <span className="text-sm font-medium text-blue-600">📅</span>
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{appointment.user?.name || 'Unknown User'}</p>
                <p className="text-sm text-gray-500">with {appointment.doctor?.name || 'Dr. Smith'}</p>
            </div>
            <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-500">{formatDate(appointment.created_at)}</p>
                <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">Scheduled</span>
            </div>
        </div>
    );

    const renderUserItem = (user) => (
        <div key={user.id} className="flex items-center space-x-3 border-b border-gray-100 py-3 last:border-b-0">
            <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <span className="text-sm font-medium text-gray-600">{user.name?.charAt(0).toUpperCase() || 'U'}</span>
                </div>
            </div>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex-shrink-0 text-right">
                <p className="text-xs text-gray-500">{formatDate(user.created_at)}</p>
                <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                >
                    {user.is_active ? 'Active' : 'Inactive'}
                </span>
            </div>
        </div>
    );

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                    <Link
                        href={type === 'appointments' ? '/admin/appointments' : '/admin/users'}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                    >
                        View all
                    </Link>
                </div>
            </div>
            <div className="px-6 py-4">
                {data && data.length > 0 ? (
                    <div className="space-y-0">
                        {data.map((item) => (type === 'appointments' ? renderAppointmentItem(item) : renderUserItem(item)))}
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <div className="mb-2 text-4xl text-gray-400">📭</div>
                        <p className="text-sm text-gray-500">No recent {type} found</p>
                    </div>
                )}
            </div>
        </div>
    );
}
