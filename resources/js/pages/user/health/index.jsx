import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserHealth({ user }) {
    const [activeTab, setActiveTab] = useState('overview');

    const healthMetrics = [
        { title: 'Cycle Length', value: '28 days', status: 'Regular', color: 'green' },
        { title: 'Last Period', value: '15 days ago', status: 'On track', color: 'blue' },
        { title: 'Next Period', value: 'In 13 days', status: 'Predicted', color: 'purple' },
        { title: 'Fertility Window', value: 'In 3 days', status: 'High', color: 'emerald' },
    ];

    const symptoms = [
        { name: 'Mood changes', severity: 'Mild', date: 'Today' },
        { name: 'Cramps', severity: 'Moderate', date: 'Yesterday' },
        { name: 'Headache', severity: 'Mild', date: '2 days ago' },
    ];

    const medications = [
        { name: 'Iron supplement', dosage: '100mg', frequency: 'Daily', nextDose: 'In 2 hours' },
        { name: 'Folic acid', dosage: '400mcg', frequency: 'Daily', nextDose: 'In 2 hours' },
    ];

    return (
        <UserLayout user={user} role="user" currentPath="/user/health">
            <Head title="Health Tracking - Family Planning" />
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Health Tracking</h1>
                    <p className="mt-2 text-gray-600">Monitor your reproductive health and wellness</p>
                </div>

                {/* Health Metrics */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {healthMetrics.map((metric, index) => (
                        <div key={index} className="rounded-lg bg-white p-6 shadow">
                            <div className="flex items-center">
                                <div className={`rounded-lg p-2 bg-${metric.color}-100`}>
                                    <div className={`h-6 w-6 bg-${metric.color}-500 rounded`}></div>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                    <p className="text-sm text-gray-500">{metric.status}</p>
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
                            <div className="space-y-4">
                                {symptoms.map((symptom, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{symptom.name}</p>
                                            <p className="text-sm text-gray-500">{symptom.date}</p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                symptom.severity === 'Mild'
                                                    ? 'bg-green-100 text-green-800'
                                                    : symptom.severity === 'Moderate'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {symptom.severity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Medications */}
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Current Medications</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {medications.map((med, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{med.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {med.dosage} - {med.frequency}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Next dose:</p>
                                            <p className="text-sm font-medium text-gray-900">{med.nextDose}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8">
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Health Actions</h3>
                        </div>
                        <div className="p-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Log Symptoms</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Track Period</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Add Medication</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">View History</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
