import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function CreateLesson({ module, user }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        objective: '',
        content: '',
        pdf_url: '',
        video_url: '',
        is_active: true,
        order: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(`/admin/modules/${module.id}/lessons`);
    };

    return (
        <AdminLayout user={user} currentPath={`/admin/modules/${module.id}/lessons/create`}>
            <Head title={`Create Lesson · ${module.title}`} />

            <div className="mx-auto max-w-4xl">
                {/* Breadcrumb */}
                <nav className="mb-6 flex" aria-label="Breadcrumb">
                    <ol className="flex items-center space-x-4">
                        <li>
                            <Link href="/admin/dashboard" className="text-gray-400 hover:text-gray-500">
                                <svg className="h-5 w-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                </svg>
                                <span className="sr-only">Home</span>
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <Link href="/admin/modules" className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    Modules
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <Link href={`/admin/modules/${module.id}`} className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                                    {module.title}
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="flex items-center">
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">Create Lesson</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Create Lesson</h2>
                        <p className="mt-2 text-gray-600">Add a new lesson to the module "{module.title}"</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                                Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                required
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter lesson title"
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        <div>
                            <label htmlFor="objective" className="mb-2 block text-sm font-medium text-gray-700">
                                Objective
                            </label>
                            <textarea
                                id="objective"
                                rows={3}
                                value={data.objective}
                                onChange={(e) => setData('objective', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="What will learners achieve?"
                            />
                            {errors.objective && <p className="mt-1 text-sm text-red-600">{errors.objective}</p>}
                        </div>

                        <div>
                            <label htmlFor="content" className="mb-2 block text-sm font-medium text-gray-700">
                                Content
                            </label>
                            <textarea
                                id="content"
                                rows={8}
                                value={data.content}
                                onChange={(e) => setData('content', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Write lesson content"
                            />
                            {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="pdf_url" className="mb-2 block text-sm font-medium text-gray-700">
                                    PDF URL
                                </label>
                                <input
                                    id="pdf_url"
                                    type="url"
                                    value={data.pdf_url}
                                    onChange={(e) => setData('pdf_url', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="https://example.com/lesson.pdf"
                                />
                                {errors.pdf_url && <p className="mt-1 text-sm text-red-600">{errors.pdf_url}</p>}
                            </div>
                            <div>
                                <label htmlFor="video_url" className="mb-2 block text-sm font-medium text-gray-700">
                                    Video URL
                                </label>
                                <input
                                    id="video_url"
                                    type="url"
                                    value={data.video_url}
                                    onChange={(e) => setData('video_url', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="https://example.com/video.mp4"
                                />
                                {errors.video_url && <p className="mt-1 text-sm text-red-600">{errors.video_url}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label htmlFor="order" className="mb-2 block text-sm font-medium text-gray-700">
                                    Order (optional)
                                </label>
                                <input
                                    id="order"
                                    type="number"
                                    min="0"
                                    value={data.order}
                                    onChange={(e) => setData('order', e.target.value)}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    placeholder="Defaults to next position"
                                />
                                {errors.order && <p className="mt-1 text-sm text-red-600">{errors.order}</p>}
                            </div>
                            <div className="flex items-center pt-7">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        checked={data.is_active}
                                        onChange={(e) => setData('is_active', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="text-sm text-gray-700">Active</span>
                                </label>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Link
                                href={`/admin/modules/${module.id}`}
                                className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Lesson'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

