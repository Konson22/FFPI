import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function EditLesson({ course, module, lesson, user }) {
    const { data, setData, put, processing, errors } = useForm({
        title: lesson?.title || '',
        content: lesson?.content || '',
        pdf_url: lesson?.pdf_url || '',
        video_url: lesson?.video_url || '',
        is_active: lesson?.is_active ?? true,
    });

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}`);
    };

    return (
        <AdminLayout user={user} currentPath={`/admin/courses/${course.id}/modules/${module.id}/lessons/${lesson.id}/edit`}>
            <Head title="Edit Lesson" />
            
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex mb-6" aria-label="Breadcrumb">
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
                                <Link href={`/admin/courses/${course.id}/modules`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    {course.title}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <Link href={`/admin/courses/${course.id}/modules/${module.id}/lessons`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    {module.title}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="flex-shrink-0 h-5 w-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Edit Lesson</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="bg-white shadow rounded-lg p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Lesson</h2>
                        <p className="mt-2 text-gray-600">
                            Update lesson in <span className="font-semibold">{module.title}</span>
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Course and Module Info */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Course & Module Information</h3>
                            <div className="text-sm text-gray-600">
                                <p><span className="font-medium">Course:</span> {course.title}</p>
                                <p><span className="font-medium">Module:</span> {module.title}</p>
                                <p><span className="font-medium">Status:</span> {module.is_active ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>

                        {/* Order (Read Only) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order
                            </label>
                            <input
                                type="text"
                                value={lesson?.order || ''}
                                disabled
                                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-500"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Lesson Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter lesson title"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Content */}
                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                                Lesson Content *
                            </label>
                            <textarea
                                id="content"
                                rows={8}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter lesson content (supports markdown)"
                                required
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        {/* PDF URL */}
                        <div>
                            <label htmlFor="pdf_url" className="block text-sm font-medium text-gray-700 mb-2">
                                PDF URL (Optional)
                            </label>
                            <input
                                type="url"
                                id="pdf_url"
                                value={data.pdf_url}
                                onChange={(e) => setData('pdf_url', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://example.com/lesson.pdf"
                            />
                            {errors.pdf_url && <p className="mt-1 text-sm text-red-600">{errors.pdf_url}</p>}
                        </div>

                        {/* Video URL */}
                        <div>
                            <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-2">
                                Video URL (Optional)
                            </label>
                            <input
                                type="url"
                                id="video_url"
                                value={data.video_url}
                                onChange={(e) => setData('video_url', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="https://youtube.com/watch?v=..."
                            />
                            {errors.video_url && <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>}
                        </div>

                        {/* Active Status */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="is_active"
                                checked={data.is_active}
                                onChange={(e) => setData('is_active', e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                                Make this lesson active (visible to users)
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3">
                            <Link
                                href={`/admin/courses/${course.id}/modules/${module.id}/lessons`}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
