import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminExperts({ experts, user }) {
    const [showVerifyModal, setShowVerifyModal] = useState(false);
    const [showRevokeModal, setShowRevokeModal] = useState(false);
    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [selectedExpert, setSelectedExpert] = useState(null);
    
    const { patch: updateExpert } = useForm();

    const handleVerifyClick = (expert) => {
        setSelectedExpert(expert);
        setShowVerifyModal(true);
    };

    const handleRevokeClick = (expert) => {
        setSelectedExpert(expert);
        setShowRevokeModal(true);
    };

    const handleRemoveClick = (expert) => {
        setSelectedExpert(expert);
        setShowRemoveModal(true);
    };

    const handleVerifyConfirm = () => {
        if (selectedExpert) {
            updateExpert(`/admin/experts/${selectedExpert.id}/verify`, {
                onSuccess: () => {
                    setShowVerifyModal(false);
                    setSelectedExpert(null);
                }
            });
        }
    };

    const handleRevokeConfirm = () => {
        if (selectedExpert) {
            updateExpert(`/admin/experts/${selectedExpert.id}/revoke`, {
                onSuccess: () => {
                    setShowRevokeModal(false);
                    setSelectedExpert(null);
                }
            });
        }
    };

    const handleRemoveConfirm = () => {
        if (selectedExpert) {
            updateExpert(`/admin/experts/${selectedExpert.id}/remove`, {
                onSuccess: () => {
                    setShowRemoveModal(false);
                    setSelectedExpert(null);
                }
            });
        }
    };

    return (
        <AdminLayout user={user} currentPath="/admin/experts">
            <Head title="Manage Experts" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Experts</h1>
                        <p className="mt-2 text-gray-600">Manage healthcare professionals and experts</p>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Add New Expert
                    </button>
                </div>

                {/* Experts Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Experts</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage healthcare professionals and their profiles
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {experts.data?.map((expert) => (
                            <li key={expert.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-sm font-medium">👨‍⚕️</span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">{expert.name}</p>
                                                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                        Expert
                                                    </span>
                                                    {expert.profile?.is_verified && (
                                                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                            ✅ Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <p>{expert.email}</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{expert.profile?.specialization || 'General Practice'}</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{expert.profile?.license_number || 'No License'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/expert/profile/${expert.id}`}
                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                            >
                                                View Profile
                                            </Link>
                                            {!expert.profile?.is_verified ? (
                                                <button
                                                    onClick={() => handleVerifyClick(expert)}
                                                    className="text-green-600 hover:text-green-900 text-sm font-medium"
                                                >
                                                    Verify
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleRevokeClick(expert)}
                                                    className="text-yellow-600 hover:text-yellow-900 text-sm font-medium"
                                                >
                                                    Revoke Verification
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleRemoveClick(expert)}
                                                className="text-red-600 hover:text-red-900 text-sm font-medium"
                                            >
                                                Remove Expert Status
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )) || (
                            <li>
                                <div className="px-4 py-4 sm:px-6 text-center text-gray-500">
                                    No experts found
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Pagination */}
                {experts.links && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {experts.prev_page_url && (
                                <Link
                                    href={experts.prev_page_url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {experts.next_page_url && (
                                <Link
                                    href={experts.next_page_url}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
                        </div>
                    </div>
                )}

                {/* Verify Modal */}
                {showVerifyModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Verify Expert</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to verify "{selectedExpert?.name}" as a healthcare expert?
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        onClick={() => setShowVerifyModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleVerifyConfirm}
                                        className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Revoke Modal */}
                {showRevokeModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                                    <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Revoke Verification</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to revoke verification for "{selectedExpert?.name}"?
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        onClick={() => setShowRevokeModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRevokeConfirm}
                                        className="px-4 py-2 bg-yellow-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                    >
                                        Revoke
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Remove Modal */}
                {showRemoveModal && (
                    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                            <div className="mt-3 text-center">
                                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Remove Expert Status</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to remove expert status from "{selectedExpert?.name}"? They will become a regular user.
                                    </p>
                                </div>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <button
                                        onClick={() => setShowRemoveModal(false)}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleRemoveConfirm}
                                        className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                    >
                                        Remove Status
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