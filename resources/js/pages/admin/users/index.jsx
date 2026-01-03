import { Head, Link, useForm } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function AdminUsers({ users, user }) {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const { patch: updateUser, delete: deleteUser } = useForm();

    // Filter users based on search and filters
    const filteredUsers = useMemo(() => {
        if (!users?.data) return [];

        return users.data.filter((userItem) => {
            const matchesSearch =
                userItem.name?.toLowerCase().includes(searchQuery.toLowerCase()) || userItem.email?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesRole = roleFilter === 'all' || userItem.role === roleFilter;
            const matchesStatus =
                statusFilter === 'all' ||
                (statusFilter === 'active' && userItem.is_active !== false) ||
                (statusFilter === 'inactive' && userItem.is_active === false);

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [users?.data, searchQuery, roleFilter, statusFilter]);

    // Calculate stats
    const stats = useMemo(() => {
        if (!users?.data) return { total: 0, active: 0, inactive: 0, admins: 0, experts: 0, regular: 0 };

        return users.data.reduce(
            (acc, userItem) => {
                acc.total++;
                if (userItem.is_active !== false) acc.active++;
                else acc.inactive++;
                if (userItem.role === 'admin') acc.admins++;
                else if (userItem.role === 'expert') acc.experts++;
                else acc.regular++;
                return acc;
            },
            { total: 0, active: 0, inactive: 0, admins: 0, experts: 0, regular: 0 },
        );
    }, [users?.data]);

    const handleRoleChange = (userItem) => {
        setSelectedUser(userItem);
        setShowRoleModal(true);
    };

    const handleStatusToggle = (userItem) => {
        setSelectedUser(userItem);
        setShowStatusModal(true);
    };

    const handleDeleteClick = (userItem) => {
        setSelectedUser(userItem);
        setShowDeleteModal(true);
    };

    const handleRoleUpdate = (newRole) => {
        if (selectedUser) {
            updateUser(`/admin/users/${selectedUser.id}/role`, {
                role: newRole,
                onSuccess: () => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                },
            });
        }
    };

    const handleStatusUpdate = () => {
        if (selectedUser) {
            updateUser(`/admin/users/${selectedUser.id}/status`, {
                onSuccess: () => {
                    setShowStatusModal(false);
                    setSelectedUser(null);
                },
            });
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            deleteUser(`/admin/users/${selectedUser.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                },
            });
        }
    };

    const getRoleBadge = (role) => {
        const styles = {
            admin: 'bg-red-100 text-red-800 border-red-200',
            expert: 'bg-green-100 text-green-800 border-green-200',
            user: 'bg-blue-100 text-blue-800 border-blue-200',
        };

        return (
            <span
                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[role] || 'border-gray-200 bg-gray-100 text-gray-800'}`}
            >
                {role.charAt(0).toUpperCase() + role.slice(1)}
            </span>
        );
    };

    const getStatusBadge = (isActive) => {
        return isActive !== false ? (
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Active
            </span>
        ) : (
            <span className="inline-flex items-center rounded-full border border-red-200 bg-red-100 px-3 py-1 text-xs font-semibold text-red-800">
                <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-red-500"></span>
                Inactive
            </span>
        );
    };

    return (
        <AdminLayout user={user} currentPath="/admin/users">
            <Head title="User Management" />

            <div className="space-y-6">
                {/* Header Section */}
                <div className="relative overflow-hidden rounded-2xl border border-[rgb(4,50,75)]/20 bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] p-6 shadow-xl">
                    <div className="absolute top-0 right-0 h-64 w-64 rounded-full bg-[rgb(210,166,73)]/10 blur-3xl"></div>
                    <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-white">User Management</h1>
                            <p className="mt-2 text-white/90">Manage user accounts, roles, and permissions</p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white/20 bg-gradient-to-br from-[rgb(210,166,73)] to-[rgb(220,180,90)] shadow-lg">
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
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Active</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100">
                                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Inactive</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.inactive}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                                <svg className="h-5 w-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Admins</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.admins}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                <svg className="h-5 w-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Experts</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.experts}</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                        <div className="flex items-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                                <svg className="h-5 w-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Regular</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.regular}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters and Search */}
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 lg:flex-row">
                        {/* Search */}
                        <div className="flex-1">
                            <label htmlFor="search" className="sr-only">
                                Search users
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    id="search"
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-3 pl-10 text-sm placeholder-gray-500 focus:border-[rgb(4,50,75)] focus:ring-2 focus:ring-[rgb(4,50,75)]/20 focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* Role Filter */}
                        <div className="lg:w-48">
                            <label htmlFor="role-filter" className="sr-only">
                                Filter by role
                            </label>
                            <select
                                id="role-filter"
                                value={roleFilter}
                                onChange={(e) => setRoleFilter(e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[rgb(4,50,75)] focus:ring-2 focus:ring-[rgb(4,50,75)]/20 focus:outline-none"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="expert">Expert</option>
                                <option value="user">User</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div className="lg:w-48">
                            <label htmlFor="status-filter" className="sr-only">
                                Filter by status
                            </label>
                            <select
                                id="status-filter"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm focus:border-[rgb(4,50,75)] focus:ring-2 focus:ring-[rgb(4,50,75)]/20 focus:outline-none"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gradient-to-r from-[rgb(4,50,75)]/5 to-[rgb(29,84,114)]/5">
                                <tr>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        User
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Joined
                                    </th>
                                    <th scope="col" className="px-6 py-4 text-right text-xs font-semibold tracking-wider text-gray-700 uppercase">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((userItem) => (
                                        <tr key={userItem.id} className="transition-colors hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 flex-shrink-0">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[rgb(4,50,75)] to-[rgb(29,84,114)] shadow-md">
                                                            <span className="text-sm font-semibold text-white">
                                                                {userItem.name?.charAt(0)?.toUpperCase() || 'U'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{userItem.name || 'Unknown'}</div>
                                                        <div className="text-sm text-gray-500">ID: {userItem.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">{getRoleBadge(userItem.role)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(userItem.is_active)}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{userItem.email}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {userItem.created_at ? new Date(userItem.created_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex items-center justify-end space-x-2">
                                                    <button
                                                        onClick={() => handleRoleChange(userItem)}
                                                        className="inline-flex items-center rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-100"
                                                        title="Change Role"
                                                    >
                                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                            />
                                                        </svg>
                                                        Role
                                                    </button>
                                                    <button
                                                        onClick={() => handleStatusToggle(userItem)}
                                                        className={`inline-flex items-center rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                                                            userItem.is_active !== false
                                                                ? 'border border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100'
                                                                : 'border border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
                                                        }`}
                                                        title={userItem.is_active !== false ? 'Deactivate' : 'Activate'}
                                                    >
                                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            {userItem.is_active !== false ? (
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                                                />
                                                            ) : (
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    strokeWidth={2}
                                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                />
                                                            )}
                                                        </svg>
                                                        {userItem.is_active !== false ? 'Deactivate' : 'Activate'}
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(userItem)}
                                                        className="inline-flex items-center rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition-colors hover:bg-red-100"
                                                        title="Delete User"
                                                    >
                                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                            />
                                                        </svg>
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center">
                                            <div className="flex flex-col items-center">
                                                <svg className="mb-4 h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                                    />
                                                </svg>
                                                <p className="text-sm font-medium text-gray-900">No users found</p>
                                                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filters</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {users?.links && users.links.length > 3 && (
                        <div className="border-t border-gray-200 bg-gray-50 px-4 py-3 sm:px-6">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {users.links.find((link) => link.label === '&laquo; Previous')?.url && (
                                        <Link
                                            href={users.links.find((link) => link.label === '&laquo; Previous').url}
                                            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Previous
                                        </Link>
                                    )}
                                    {users.links.find((link) => link.label === 'Next &raquo;')?.url && (
                                        <Link
                                            href={users.links.find((link) => link.label === 'Next &raquo;').url}
                                            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                        >
                                            Next
                                        </Link>
                                    )}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm text-gray-700">
                                            Showing <span className="font-medium">{users.from || 0}</span> to{' '}
                                            <span className="font-medium">{users.to || 0}</span> of{' '}
                                            <span className="font-medium">{users.total || 0}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                                            {users.links.map((link, index) => {
                                                if (index === 0 || index === users.links.length - 1) return null;
                                                return (
                                                    <Link
                                                        key={index}
                                                        href={link.url || '#'}
                                                        className={`relative inline-flex items-center border px-4 py-2 text-sm font-medium ${
                                                            link.active
                                                                ? 'z-10 border-[rgb(4,50,75)] bg-[rgb(4,50,75)] text-white'
                                                                : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                                                        } ${index === 1 ? 'rounded-l-md' : ''} ${index === users.links.length - 2 ? 'rounded-r-md' : ''}`}
                                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                                    />
                                                );
                                            })}
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Role Change Modal */}
                {showRoleModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity" onClick={() => setShowRoleModal(false)}></div>
                            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 w-full text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Change User Role
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Select a new role for <span className="font-semibold">{selectedUser?.name}</span>
                                                </p>
                                            </div>
                                            <div className="mt-4 grid grid-cols-3 gap-3">
                                                {['user', 'expert', 'admin'].map((role) => (
                                                    <button
                                                        key={role}
                                                        onClick={() => handleRoleUpdate(role)}
                                                        className={`rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                                                            selectedUser?.role === role
                                                                ? 'scale-105 bg-[rgb(4,50,75)] text-white shadow-lg'
                                                                : 'border-2 border-transparent bg-gray-100 text-gray-700 hover:border-gray-300 hover:bg-gray-200'
                                                        }`}
                                                    >
                                                        {role.charAt(0).toUpperCase() + role.slice(1)}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={() => setShowRoleModal(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[rgb(4,50,75)] focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Status Toggle Modal */}
                {showStatusModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
                                onClick={() => setShowStatusModal(false)}
                            ></div>
                            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div
                                            className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                                                selectedUser?.is_active !== false ? 'bg-orange-100' : 'bg-green-100'
                                            }`}
                                        >
                                            <svg
                                                className={`h-6 w-6 ${selectedUser?.is_active !== false ? 'text-orange-600' : 'text-green-600'}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                {selectedUser?.is_active !== false ? (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                                                    />
                                                ) : (
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                )}
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                {selectedUser?.is_active !== false ? 'Deactivate' : 'Activate'} User
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to {selectedUser?.is_active !== false ? 'deactivate' : 'activate'}{' '}
                                                    <span className="font-semibold">{selectedUser?.name}</span>?
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={handleStatusUpdate}
                                        className={`inline-flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm focus:ring-2 focus:ring-offset-2 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm ${
                                            selectedUser?.is_active !== false
                                                ? 'bg-orange-600 hover:bg-orange-700 focus:ring-orange-500'
                                                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                                        }`}
                                    >
                                        {selectedUser?.is_active !== false ? 'Deactivate' : 'Activate'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowStatusModal(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[rgb(4,50,75)] focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <div
                                className="bg-opacity-75 fixed inset-0 bg-gray-500 transition-opacity"
                                onClick={() => setShowDeleteModal(false)}
                            ></div>
                            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
                                &#8203;
                            </span>
                            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="sm:flex sm:items-start">
                                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                                />
                                            </svg>
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                                Delete User
                                            </h3>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete <span className="font-semibold">{selectedUser?.name}</span>? This
                                                    action cannot be undone and will permanently remove the user account.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button
                                        type="button"
                                        onClick={handleDeleteConfirm}
                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setShowDeleteModal(false)}
                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-[rgb(4,50,75)] focus:ring-offset-2 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}
