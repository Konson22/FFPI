import AdminLayout from '@/components/AdminLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Experts({ experts, user, role, currentPath }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterSpecialty, setFilterSpecialty] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');

    const specialties = [
        'Gynecology',
        'Obstetrics',
        'Family Medicine',
        'Endocrinology',
        'Reproductive Health',
        'Mental Health',
        'Nutrition',
        'General Practice',
    ];

    const filteredExperts = experts.data.filter((expert) => {
        const matchesSearch =
            expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expert.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            expert.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSpecialty = filterSpecialty === 'all' || expert.specialty === filterSpecialty;
        const matchesStatus =
            filterStatus === 'all' || (filterStatus === 'active' && expert.is_active) || (filterStatus === 'inactive' && !expert.is_active);

        return matchesSearch && matchesSpecialty && matchesStatus;
    });

    const getStatusBadgeColor = (isActive) => {
        return isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
    };

    const getVerificationBadgeColor = (isVerified) => {
        return isVerified ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800';
    };

    return (
        <AdminLayout user={user} role={role} currentPath={currentPath}>
            <Head title="Manage Experts" />

            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Healthcare Experts</h1>
                        <p className="mt-1 text-gray-600">Manage healthcare professionals and their credentials</p>
                    </div>
                    <button className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">Add New Expert</button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-blue-50 p-3 text-blue-600">
                                <span className="text-2xl">👨‍⚕️</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Experts</p>
                                <p className="text-2xl font-bold text-gray-900">{experts.total}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-green-50 p-3 text-green-600">
                                <span className="text-2xl">✅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Verified</p>
                                <p className="text-2xl font-bold text-gray-900">{experts.data.filter((e) => e.is_verified).length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-orange-50 p-3 text-orange-600">
                                <span className="text-2xl">⏳</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                                <p className="text-2xl font-bold text-gray-900">{experts.data.filter((e) => !e.is_verified).length}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-purple-50 p-3 text-purple-600">
                                <span className="text-2xl">📅</span>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active Today</p>
                                <p className="text-2xl font-bold text-gray-900">{experts.data.filter((e) => e.is_active).length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Search Experts</label>
                            <input
                                type="text"
                                placeholder="Search by name, email, or specialty..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Filter by Specialty</label>
                            <select
                                value={filterSpecialty}
                                onChange={(e) => setFilterSpecialty(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Specialties</option>
                                {specialties.map((specialty) => (
                                    <option key={specialty} value={specialty}>
                                        {specialty}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Filter by Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Experts Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">Healthcare Experts ({filteredExperts.length})</h3>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Expert</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Specialty</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Verification</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Experience</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredExperts.map((expert) => (
                                    <tr key={expert.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                                                        <span className="text-sm font-medium text-blue-600">
                                                            {expert.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">Dr. {expert.name}</div>
                                                    <div className="text-sm text-gray-500">{expert.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">{expert.specialty || 'General Practice'}</div>
                                            <div className="text-sm text-gray-500">{expert.license_number || 'License pending'}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getVerificationBadgeColor(expert.is_verified)}`}
                                            >
                                                {expert.is_verified ? 'Verified' : 'Pending'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeColor(expert.is_active)}`}
                                            >
                                                {expert.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                            {expert.years_experience || 'N/A'} years
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                                            <div className="flex space-x-2">
                                                <button className="text-blue-600 hover:text-blue-900">View</button>
                                                <button className="text-green-600 hover:text-green-900">Verify</button>
                                                <button className="text-red-600 hover:text-red-900">Suspend</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {filteredExperts.length === 0 && (
                        <div className="py-12 text-center">
                            <div className="mb-2 text-4xl text-gray-400">👨‍⚕️</div>
                            <p className="text-gray-500">No experts found matching your criteria</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {experts.links && (
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-700">
                            Showing {experts.from} to {experts.to} of {experts.total} results
                        </div>
                        <div className="flex space-x-2">
                            {experts.links.map((link, index) => (
                                <button
                                    key={index}
                                    disabled={!link.url}
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                        link.active
                                            ? 'bg-blue-600 text-white'
                                            : link.url
                                              ? 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                                              : 'cursor-not-allowed bg-gray-100 text-gray-400'
                                    }`}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
