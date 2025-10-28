import { Head, Link, useForm, router } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminCourses({ courses, user }) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [courseToDelete, setCourseToDelete] = useState(null);
    const { delete: deleteCourse } = useForm();

    const toggleStatus = (course) => {
        router.patch(`/admin/courses/${course.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };

    const handleDeleteClick = (course) => {
        setCourseToDelete(course);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = () => {
        if (courseToDelete) {
            deleteCourse(`/admin/courses/${courseToDelete.id}`, {
                onSuccess: () => {
                    setShowDeleteModal(false);
                    setCourseToDelete(null);
                }
            });
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'green';
            case 'draft': return 'yellow';
            case 'archived': return 'gray';
            default: return 'blue';
        }
    };

    return (
        <AdminLayout user={user} currentPath="/admin/courses">
            <Head title="Manage Courses" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Manage Courses</h1>
                        <p className="mt-2 text-gray-600">Create, edit, and manage your platform courses</p>
                    </div>
                    <Link
                        href="/admin/courses/create"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add New Course
                    </Link>
                </div>

                {/* Courses Table */}
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">All Courses</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">
                            Manage and organize your educational content
                        </p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {courses.data?.map((course) => (
                            <li key={course.id}>
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10">
                                                <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <span className="text-blue-600 text-sm font-medium">{course.icon || '📚'}</span>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <div className="flex items-center">
                                                    <p className="text-sm font-medium text-gray-900">{course.title}</p>
                                                    <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${getStatusColor(course.status || 'draft')}-100 text-${getStatusColor(course.status || 'draft')}-800`}>
                                                        {course.status || 'Draft'}
                                                    </span>
                                                </div>
                                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                                    <p>{course.modules?.length || 0} modules</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{course.modules?.reduce((total, module) => total + (module.lessons?.length || 0), 0) || 0} lessons</p>
                                                    <span className="mx-2">•</span>
                                                    <p>{course.difficulty_level || 'Beginner'}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link
                                                href={`/admin/courses/${course.id}`}
                                                className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                                            >
                                                Manage
                                            </Link>
                                            <Link
                                                href={`/admin/courses/${course.id}/edit`}
                                                className="text-green-600 hover:text-green-900 text-sm font-medium"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => toggleStatus(course)}
                                                className={`text-sm font-medium px-3 py-1 rounded ${
                                                    course.is_active 
                                                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                                                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                                }`}
                                            >
                                                {course.is_active ? 'Active' : 'Inactive'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteClick(course)}
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
                                    No courses found
                                </div>
                            </li>
                        )}
                    </ul>
                </div>

                {/* Pagination */}
                {courses.links && (
                    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {courses.prev_page_url && (
                                <Link
                                    href={courses.prev_page_url}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Previous
                                </Link>
                            )}
                            {courses.next_page_url && (
                                <Link
                                    href={courses.next_page_url}
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
                                <h3 className="text-lg font-medium text-gray-900 mt-2">Delete Course</h3>
                                <div className="mt-2 px-7 py-3">
                                    <p className="text-sm text-gray-500">
                                        Are you sure you want to delete "{courseToDelete?.title}"? This action cannot be undone.
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