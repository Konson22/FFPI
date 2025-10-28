import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminPosts({ posts, user }) {
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [rejectionReason, setRejectionReason] = useState('');
    
    const { patch: updatePost, delete: deletePost } = useForm();

    const handleApprove = (post) => {
        updatePost(`/admin/posts/${post.id}/approve`, {
            onSuccess: () => {
                // Success handled by redirect
            }
        });
    };

    const handleRejectClick = (post) => {
        setSelectedPost(post);
        setShowRejectModal(true);
    };

    const handleRejectConfirm = () => {
        if (selectedPost && rejectionReason) {
            updatePost(`/admin/posts/${selectedPost.id}/reject`, {
                rejection_reason: rejectionReason,
                onSuccess: () => {
                    setShowRejectModal(false);
                    setSelectedPost(null);
                    setRejectionReason('');
                }
            });
        }
    };

    const handleDeleteClick = (post) => {
        setSelectedPost(post);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (selectedPost) {
            deletePost(`/admin/posts/${selectedPost.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setSelectedPost(null);
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved': return 'green';
            case 'pending': return 'yellow';
            case 'rejected': return 'red';
            default: return 'gray';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved': return '✅';
            case 'pending': return '⏳';
            case 'rejected': return '❌';
            default: return '📝';
        }
    };

    return (
        <AdminLayout user={user} currentPath="/admin/posts">
            <Head title="Manage Posts" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Posts</h1>
                        <p className="mt-2 text-gray-600">Moderate community posts and content</p>
                    </div>
                </div>

                {/* Posts Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Posts</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Review and moderate community content
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {posts.data?.map((post) => (
                            <li key={post.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center flex-1">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                                                    <span className="text-orange-600 text-sm font-medium">💬</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 flex-1">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900 line-clamp-1">{post.title}</p>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(post.status || 'pending')}-100 text-${getStatusColor(post.status || 'pending')}-800`}>
                                                        <span className="mr-1">{getStatusIcon(post.status || 'pending')}</span>
                                                        {post.status || 'Pending'}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <p>by {post.user?.name}</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{post.reactions?.length || 0} reactions</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{post.comments?.length || 0} comments</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{new Date(post.created_at).toLocaleDateString()}</p>
                                                </div>
                                                {post.rejection_reason && (
                                                    <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                                                        <strong>Rejection reason:</strong> {post.rejection_reason}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            {post.status !== 'approved' && (
                                                <button
                                                    onClick={() => handleApprove(post)}
                                                    className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                >
                                                    Approve
                                                </button>
                                            )}
                                            {post.status !== 'rejected' && (
                                                <button
                                                    onClick={() => handleRejectClick(post)}
                                                    className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                                                >
                                                    Reject
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteClick(post)}
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
                                    No posts found
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Pagination */}
                {posts.links && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {posts.prev_page_url && (
                                <Link
                                    href={posts.prev_page_url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {posts.next_page_url && (
                                <Link
                                    href={posts.next_page_url}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Reject Modal */}
                {showRejectModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3">
                                <h3 className="text-lg font-medium text-gray-900">Reject Post</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500 mb-4">
                                        Reject "{selectedPost?.title}"?
                                    </p>
                                    <textarea
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Please provide a reason for rejection..."
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                        rows={3}
                                    />
                                </div>
                                <div className="flex justify-end space-x-4 mt-4">
                                    <button
                                        onClick={() => {
                                            setShowRejectModal(false);
                                            setSelectedPost(null);
                                            setRejectionReason('');
                                        }}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRejectConfirm}
                                        disabled={!rejectionReason.trim()}
                                        className="px-4 py-2 bg-yellow-600 text-white text-sm font-medium rounded-md hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Reject
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
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Post</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete "{selectedPost?.title}"? This action cannot be undone.
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
