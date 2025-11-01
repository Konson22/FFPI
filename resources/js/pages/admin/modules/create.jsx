import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function CreateModule({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        is_active: true,
        published: true,
        featured: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/modules');
    };

    return (
        <AdminLayout user={user} currentPath="/admin/modules/create">
            <Head title="Create Module" />

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
                                <span className="ml-4 text-sm font-medium text-gray-500">Create Module</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Create New Module</h2>
                        <p className="mt-2 text-gray-600">Add a new learning module to your platform</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-700">
                                Module Title *
                            </label>
                            <input
                                type="text"
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter module title"
                                required
                            />
                            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                rows={5}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Enter module description"
                                required
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Flags */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.is_active}
                                    onChange={(e) => setData('is_active', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Active</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.published}
                                    onChange={(e) => setData('published', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Published</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={data.featured}
                                    onChange={(e) => setData('featured', e.target.checked)}
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                />
                                <span className="text-sm text-gray-700">Featured</span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end space-x-3">
                            <Link href="/admin/modules" className="rounded-md border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50">
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Module'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}

