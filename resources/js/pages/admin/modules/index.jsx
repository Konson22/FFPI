import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminModules({ course, modules, user }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [moduleToDelete, setModuleToDelete] = useState(null);
    const { delete: deleteModule } = useForm();

    const toggleStatus = (module) => {
        router.patch(`/admin/courses/${course.id}/modules/${module.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDeleteClick = (module) => {
        setModuleToDelete(module);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (moduleToDelete) {
            deleteModule(`/admin/courses/${course.id}/modules/${moduleToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setModuleToDelete(null);
                }
            });
        }
    };

    return (
        <AdminLayout user={user} currentPath={`/admin/courses/${course.id}/modules`}>
            <Head title={`Manage Modules - ${course.title}`} />
            
            <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <Link href="/admin/courses" className="text-gray-400 hover:text-gray-500">
                                <svg className="flex-shrink-0 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span className="sr-only">Home</span>
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <Link href="/admin/courses" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    Courses
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">
                                    {course.title}
                                </span>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Modules</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Modules</h1>
                        <p className="mt-2 text-gray-600">
                            Course: <span className="font-semibold">{course.title}</span>
                        </p>
                    </div>
                    <Link
                        href={`/admin/courses/${course.id}/modules/create`}
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Module
                    </Link>
                </div>

                {/* Course Info Card */}
                <div className="bg-white shadow rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{course.description}</p>
                            <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                                <span>Category: {course.category}</span>
                                <span>•</span>
                                <span>Status: {course.is_active ? 'Active' : 'Inactive'}</span>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-2xl font-bold text-blue-600">{modules.data?.length || 0}</div>
                            <div className="text-sm text-gray-500">Modules</div>
                        </div>
                    </div>
                </div>

                {/* Modules Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Modules</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage and organize your course modules
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {modules.data?.map((module) => (
                            <li key={module.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                                                    <span className="text-green-600 text-sm font-medium">📚</span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">{module.title}</p>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                        module.is_active 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                        {module.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <p>{module.description}</p>
                                                </div>
                                                <div className="mt-1 text-xs text-gray-400">
                                                    Order: {module.order} • Code: {module.module_code}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/admin/courses/${course.id}/modules/${module.id}/lessons`}
                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                            >
                                                Manage Lessons
                                            </Link>
                                            <Link
                                                href={`/admin/courses/${course.id}/modules/${module.id}/edit`}
                                                className="text-green-600 hover:text-green-900 text-sm font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => toggleStatus(module)}
                                                className={`text-sm font-medium px-3 py-1 rounded ${
                                                    module.is_active 
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                            >
                                                {module.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(module)}
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
                                    No modules found. <Link href={`/admin/courses/${course.id}/modules/create`} className="text-blue-600 hover:text-blue-900">Create the first module</Link>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Pagination */}
                {modules.links && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {modules.prev_page_url && (
                                <Link
                                    href={modules.prev_page_url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {modules.next_page_url && (
                                <Link
                                    href={modules.next_page_url}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Next
                                </Link>
                            )}
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
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Module</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete "{moduleToDelete?.title}"? This will also delete all associated lessons. This action cannot be undone.
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
