import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function AdminEmails({ users, user }) {
    const { flash } = usePage().props;
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [filterRole, setFilterRole] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        user_ids: [],
        subject: '',
        message: '',
    });

    // Filter users based on role and search query
    const filteredUsers = users.filter((user) => {
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        const matchesSearch =
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesRole && matchesSearch;
    });

    // Handle select all
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        if (isChecked) {
            const allIds = filteredUsers.map((u) => u.id);
            setSelectedUsers(allIds);
            setData('user_ids', allIds);
        } else {
            setSelectedUsers([]);
            setData('user_ids', []);
        }
    };

    // Handle individual user selection
    const handleUserSelect = (userId) => {
        const newSelection = selectedUsers.includes(userId) ? selectedUsers.filter((id) => id !== userId) : [...selectedUsers, userId];
        setSelectedUsers(newSelection);
        setData('user_ids', newSelection);
        setSelectAll(newSelection.length === filteredUsers.length && filteredUsers.length > 0);
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedUsers.length === 0) {
            alert('Please select at least one user to send the email to.');
            return;
        }
        post('/admin/emails/send', {
            onSuccess: () => {
                setSelectedUsers([]);
                setSelectAll(false);
                setData({
                    user_ids: [],
                    subject: '',
                    message: '',
                });
            },
        });
    };

    const getRoleColor = (role) => {
        switch (role) {
            case 'admin':
                return 'bg-red-100 text-red-800';
            case 'expert':
                return 'bg-green-100 text-green-800';
            case 'user':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    // Show success message
    useEffect(() => {
        if (flash?.success) {
            alert(flash.success);
        }
    }, [flash]);

    return (
        <AdminLayout user={user} currentPath="/admin/emails">
            <Head title="Send Emails to Users" />

            <div className="space-y-6">
                {/* Success Message */}
                {flash?.success && (
                    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                        <p className="text-sm text-green-800">{flash.success}</p>
                    </div>
                )}
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Send Emails to Users</h1>
                        <p className="mt-2 text-gray-600">Compose and send emails to registered users</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* User Selection Panel */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Select Users</h2>

                            {/* Search and Filter */}
                            <div className="mb-4 space-y-4">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[rgb(4,50,75)]"
                                />
                                <select
                                    value={filterRole}
                                    onChange={(e) => setFilterRole(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[rgb(4,50,75)]"
                                >
                                    <option value="all">All Roles</option>
                                    <option value="user">Users</option>
                                    <option value="expert">Experts</option>
                                </select>
                            </div>

                            {/* Select All */}
                            <div className="mb-4 border-b border-gray-200 pb-4">
                                <label className="flex cursor-pointer items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                        className="h-4 w-4 rounded border-gray-300 text-[rgb(4,50,75)] focus:ring-[rgb(4,50,75)]"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Select All ({filteredUsers.length})</span>
                                </label>
                            </div>

                            {/* Users List */}
                            <div className="max-h-96 space-y-2 overflow-y-auto">
                                {filteredUsers.length === 0 ? (
                                    <p className="py-4 text-center text-sm text-gray-500">No users found</p>
                                ) : (
                                    filteredUsers.map((userItem) => (
                                        <label
                                            key={userItem.id}
                                            className="flex cursor-pointer items-center space-x-3 rounded-lg border border-gray-200 p-3 hover:bg-gray-50"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedUsers.includes(userItem.id)}
                                                onChange={() => handleUserSelect(userItem.id)}
                                                className="h-4 w-4 rounded border-gray-300 text-[rgb(4,50,75)] focus:ring-[rgb(4,50,75)]"
                                            />
                                            <div className="min-w-0 flex-1">
                                                <p className="truncate text-sm font-medium text-gray-900">{userItem.name}</p>
                                                <p className="truncate text-xs text-gray-500">{userItem.email}</p>
                                                <span
                                                    className={`mt-1 inline-block rounded px-2 py-0.5 text-xs font-medium ${getRoleColor(
                                                        userItem.role,
                                                    )}`}
                                                >
                                                    {userItem.role}
                                                </span>
                                            </div>
                                        </label>
                                    ))
                                )}
                            </div>

                            {/* Selected Count */}
                            {selectedUsers.length > 0 && (
                                <div className="mt-4 border-t border-gray-200 pt-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        {selectedUsers.length} user{selectedUsers.length !== 1 ? 's' : ''} selected
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Email Composition Panel */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
                            <h2 className="mb-4 text-xl font-semibold text-gray-900">Compose Email</h2>

                            {/* Subject */}
                            <div>
                                <label htmlFor="subject" className="mb-2 block text-sm font-medium text-gray-700">
                                    Subject <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)}
                                    required
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[rgb(4,50,75)]"
                                    placeholder="Email subject..."
                                />
                                {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-700">
                                    Message <span className="text-red-500">*</span>
                                </label>
                                <textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    required
                                    rows={12}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-[rgb(4,50,75)]"
                                    placeholder="Write your message here... You can use plain text or basic formatting."
                                />
                                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                <p className="mt-2 text-xs text-gray-500">Minimum 10 characters required. New lines will be preserved.</p>
                            </div>

                            {/* Preview Info */}
                            {selectedUsers.length > 0 && (
                                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                    <p className="text-sm text-blue-800">
                                        <strong>Preview:</strong> This email will be sent to {selectedUsers.length} user
                                        {selectedUsers.length !== 1 ? 's' : ''}.
                                    </p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSelectedUsers([]);
                                        setSelectAll(false);
                                        setData({
                                            user_ids: [],
                                            subject: '',
                                            message: '',
                                        });
                                    }}
                                    className="rounded-lg border border-gray-300 px-6 py-2 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:outline-none"
                                    disabled={processing}
                                >
                                    Clear
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing || selectedUsers.length === 0 || !data.subject || !data.message}
                                    className="rounded-lg bg-gradient-to-r from-[rgb(4,50,75)] to-[rgb(29,84,114)] px-6 py-2 text-white transition-all hover:from-[rgb(29,84,114)] hover:to-[rgb(4,50,75)] focus:ring-2 focus:ring-[rgb(4,50,75)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Sending...' : `Send Email${selectedUsers.length > 0 ? ` (${selectedUsers.length})` : ''}`}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
