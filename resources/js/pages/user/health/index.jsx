import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

<<<<<<< Updated upstream
export default function UserHealth({ user }) {
=======
export default function UserHealth({ user, healthMetrics: metricsData, recentSymptoms, appointments, reminders }) {
>>>>>>> Stashed changes
    const [activeTab, setActiveTab] = useState('overview');
    const [showPeriodModal, setShowPeriodModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [formData, setFormData] = useState({
        period_start_date: '',
        cycle_length: 28,
        cycle_phase: '',
        notes: '',
    });

    const handleTrackPeriod = (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        fetch('/api/fertility-tracking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content'),
                'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setShowPeriodModal(false);
                setFormData({
                    period_start_date: '',
                    cycle_length: 28,
                    cycle_phase: '',
                    notes: '',
                });
                // Reload the page to show updated data
                router.reload({ only: ['healthMetrics', 'recentTracking'] });
            }
            setIsSubmitting(false);
        })
        .catch(error => {
            console.error('Error:', error);
            setIsSubmitting(false);
        });
    };

    const getMetrics = () => {
        const cycleLength = metricsData?.cycle_length ?? 28;
        const lastPeriodAgo = metricsData?.last_period_days_ago ?? null;
        const nextPeriodIn = metricsData?.next_period_in_days ?? null;
        const fertilityWindow = metricsData?.fertility_window_days ?? null;

        return [
            {
                title: 'Cycle Length',
                value: `${cycleLength} days`,
                status: 'Regular',
                color: 'green',
                icon: '🔄',
            },
            {
                title: 'Last Period',
                value: lastPeriodAgo !== null ? `${lastPeriodAgo} days ago` : 'Not tracked',
                status: lastPeriodAgo !== null ? 'Tracked' : 'Not set',
                color: lastPeriodAgo !== null ? 'blue' : 'gray',
                icon: '📅',
            },
            {
                title: 'Next Period',
                value: nextPeriodIn !== null ? `In ${nextPeriodIn} days` : 'Not predicted',
                status: nextPeriodIn !== null ? 'Predicted' : 'Not set',
                color: nextPeriodIn !== null ? 'purple' : 'gray',
                icon: '📆',
            },
            {
                title: 'Fertility Window',
                value: fertilityWindow !== null ? `In ${fertilityWindow} days` : 'Not predicted',
                status: fertilityWindow !== null && fertilityWindow >= 0 ? 'Predicted' : 'Not set',
                color: fertilityWindow !== null && fertilityWindow >= 0 ? 'emerald' : 'gray',
                icon: '🌸',
            },
        ];
    };

    const healthMetrics = getMetrics();

    return (
        <UserLayout user={user} role="user" currentPath="/user/health">
            <Head title="Health Tracking - Family Planning" />
<<<<<<< Updated upstream
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Health Tracking</h1>
                    <p className="mt-2 text-gray-600">Monitor your reproductive health and wellness</p>
=======

            {/* Header */}
            <div className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">Health Tracking</h1>
                        <p className="mt-2 text-gray-600">Monitor your reproductive health and wellness.</p>
                    </div>
>>>>>>> Stashed changes
                </div>

<<<<<<< Updated upstream
=======
            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
>>>>>>> Stashed changes
                {/* Health Metrics */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {healthMetrics.map((metric, index) => (
                        <div key={index} className="group rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="mb-2 flex items-center gap-2">
                                        <span className="text-2xl">{metric.icon}</span>
                                        <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                                    </div>
                                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                    <p className="mt-1 text-sm text-gray-500">{metric.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Symptoms Tracking */}
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Recent Symptoms</h3>
                        </div>
                        <div className="p-6">
                            {recentSymptoms && recentSymptoms.length > 0 ? (
                                <div className="space-y-4">
                                    {recentSymptoms.map((symptom, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{symptom.name}</p>
                                                <p className="text-sm text-gray-500">{symptom.date}</p>
                                            </div>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    symptom.severity?.toLowerCase() === 'mild'
                                                        ? 'bg-green-100 text-green-800'
                                                        : symptom.severity?.toLowerCase() === 'moderate'
                                                          ? 'bg-yellow-100 text-yellow-800'
                                                          : 'bg-red-100 text-red-800'
                                                }`}
                                            >
                                                {symptom.severity}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">No symptoms tracked yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Appointments */}
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                        </div>
                        <div className="p-6">
                            {appointments && appointments.length > 0 ? (
                                <div className="space-y-4">
                                    {appointments.map((appointment, index) => (
                                        <div key={index} className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50">
                                            <div className="mb-2 flex items-center justify-between">
                                                <p className="font-medium text-gray-900">{appointment.doctor_name}</p>
                                                <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">{appointment.status}</span>
                                            </div>
                                            <p className="text-sm text-gray-600">{appointment.reason}</p>
                                            <p className="mt-2 text-sm text-gray-500">
                                                {appointment.date} at {appointment.time}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-gray-500">No upcoming appointments</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reminders Section */}
                {reminders && reminders.length > 0 && (
                    <div className="mt-8">
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <h3 className="text-lg font-medium text-gray-900">Active Reminders</h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-3">
                                    {reminders.map((reminder, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{reminder.message}</p>
                                                <p className="text-sm text-gray-500">{reminder.type}</p>
                                            </div>
                                            <p className="text-sm text-gray-600">{reminder.time}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <button
                                    onClick={() => setShowPeriodModal(true)}
                                    className="group flex items-center justify-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-3 transition-all hover:border-green-400 hover:bg-green-100"
                                >
                                    <span className="text-lg">➕</span>
                                    <span className="text-sm font-medium text-gray-700">Track Period</span>
                                </button>
                                <button className="group flex items-center justify-center gap-2 rounded-lg border border-blue-300 bg-blue-50 px-4 py-3 transition-all hover:border-blue-400 hover:bg-blue-100">
                                    <span className="text-lg">🏥</span>
                                    <span className="text-sm font-medium text-gray-700">Log Symptoms</span>
                                </button>
                                <button className="group flex items-center justify-center gap-2 rounded-lg border border-purple-300 bg-purple-50 px-4 py-3 transition-all hover:border-purple-400 hover:bg-purple-100">
                                    <span className="text-lg">💊</span>
                                    <span className="text-sm font-medium text-gray-700">Add Reminder</span>
                                </button>
                                <button className="group flex items-center justify-center gap-2 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-3 transition-all hover:border-emerald-400 hover:bg-emerald-100">
                                    <span className="text-lg">📊</span>
                                    <span className="text-sm font-medium text-gray-700">View History</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<<<<<<< Updated upstream
=======

            {/* Track Period Modal */}
            {showPeriodModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        <div className="mb-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Track Period</h2>
                            <button
                                onClick={() => setShowPeriodModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                ✕
                            </button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleTrackPeriod(); }} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Period Start Date *
                                </label>
                                <input
                                    type="date"
                                    value={data.period_start_date}
                                    onChange={(e) => setData('period_start_date', e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                />
                                {errors.period_start_date && (
                                    <p className="mt-1 text-sm text-red-600">{errors.period_start_date}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Cycle Length (days)
                                </label>
                                <input
                                    type="number"
                                    value={data.cycle_length}
                                    onChange={(e) => setData('cycle_length', parseInt(e.target.value))}
                                    min="21"
                                    max="45"
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Cycle Phase
                                </label>
                                <select
                                    value={data.cycle_phase}
                                    onChange={(e) => setData('cycle_phase', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                >
                                    <option value="">Select phase</option>
                                    <option value="menstrual">Menstrual</option>
                                    <option value="follicular">Follicular</option>
                                    <option value="ovulatory">Ovulatory</option>
                                    <option value="luteal">Luteal</option>
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Notes (optional)
                                </label>
                                <textarea
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
                                    placeholder="Add any notes about your period..."
                                />
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setShowPeriodModal(false)}
                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-lg bg-green-600 px-4 py-2 text-white transition-colors hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing ? 'Saving...' : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
>>>>>>> Stashed changes
        </UserLayout>
    );
}
