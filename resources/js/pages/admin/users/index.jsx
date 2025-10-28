import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminUsers({ users, user }) {
    const [showRoleModal, setShowRoleModal] = useState(false);
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    
    const { patch: updateUser, delete: deleteUser } = useForm();

    const handleRoleChange = (user) => {
        setSelectedUser(user);
        setShowRoleModal(true);
    };

    const handleStatusToggle = (user) => {
        setSelectedUser(user);
        setShowStatusModal(true);
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user);
        setShowDeleteModal(true);
    };

    const handleRoleUpdate = (newRole) => {
        if (selectedUser) {
            updateUser(`/admin/users/${selectedUser.id}/role`, {
                role: newRole,
                onSuccess: () => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                }
            });
        }
    };

    const handleStatusUpdate = () => {
        if (selectedUser) {
            updateUser(`/admin/users/${selectedUser.id}/status`, {
                onSuccess: () => {
                    setShowStatusModal(false);
                    setSelectedUser(null);
                }
            });
        }
    };

    const handleDeleteConfirm = () => {
        if (selectedUser) {
            deleteUser(`/admin/users/${selectedUser.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                }
            });
        }
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin': return 'red';
            case 'expert': return 'green';
            case 'user': return 'blue';
            default: return 'gray';
        }
    };

    const getStatusColor = (isActive) => {
        return isActive ? 'green' : 'red';
    };

    return (
        <AdminLayout user={user} currentPath="/admin/users">
            <Head title="Manage Users" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
                        <p className="mt-2 text-gray-600">Manage user accounts, roles, and permissions</p>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Users</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage user accounts and their roles
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {users.data?.map((userItem) => (
                            <li key={userItem.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                                                    <span className="text-purple-600 text-sm font-medium">
                                                        {userItem.name?.charAt(0) || 'U'}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">{userItem.name}</p>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getRoleColor(userItem.role)}-100 text-${getRoleColor(userItem.role)}-800`}>
                                                        {userItem.role}
                                                    </span>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(userItem.is_active !== false)}-100 text-${getStatusColor(userItem.is_active !== false)}-800`}>
                                                        {userItem.is_active !== false ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <p>{userItem.email}</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{userItem.enrolled_courses?.length || 0} courses enrolled</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <button
                                                onClick={() => handleRoleChange(userItem)}
                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                            >
                                                Change Role
                                            </button>
                                            <button
                                                onClick={() => handleStatusToggle(userItem)}
                                                className="text-green-600 hover:text-green-900 text-sm font-medium"
                                            >
                                                {userItem.is_active !== false ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(userItem)}
                                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) || (
                            <li>
                                <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                                    No users found
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Pagination */}
                {users.links && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {users.prev_page_url && (
                                <Link
                                    href={users.prev_page_url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {users.next_page_url && (
                                <Link
                                    href={users.next_page_url}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Role Change Modal */}
                {showRoleModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h3 className="text-lg font-medium text-gray-900">Change User Role</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Change role for "{selectedUser?.name}"?
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-2 mt-4">
                                    {['user', 'expert', 'admin'].map((role) => (
                                        <button
                                            key={role}
                                            onClick={() => handleRoleUpdate(role)}
                                            className={`px-4 py-2 text-sm font-medium rounded-md ${
                                                selectedUser?.role === role
                                                    ? 'bg-gray-300 text-gray-800'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                            }`}
                                        >
                                            {role.charAt(0).toUpperCase() + role.slice(1)}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-4">
                                    <button
                                        onClick={() => setShowRoleModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
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
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <h3 className="text-lg font-medium text-gray-900">
                                    {selectedUser?.is_active !== false ? 'Deactivate' : 'Activate'} User
                                </h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to {selectedUser?.is_active !== false ? 'deactivate' : 'activate'} "{selectedUser?.name}"?
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        onClick={() => setShowStatusModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleStatusUpdate}
                                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                                            selectedUser?.is_active !== false
                                                ? 'bg-red-600 text-white hover:bg-red-700'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                        }`}
                                    >
                                        {selectedUser?.is_active !== false ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Delete User</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete "{selectedUser?.name}"? This action cannot be undone.
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        onClick={() => setShowDeleteModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDeleteConfirm}
                                        className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Delete
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