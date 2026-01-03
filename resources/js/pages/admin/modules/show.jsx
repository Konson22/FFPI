import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function ShowModule({ module, user }) {
    return (
        <AdminLayout user={user} currentPath={`/admin/modules/${module.id}`}>
            <Head title={`Module: ${module.title}`} />

            <div className="space-y-6">
                {/* Breadcrumb */}
                <nav className="flex" aria-label="Breadcrumb">
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
                                <span className="ml-4 text-sm font-medium text-gray-500">{module.title}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{module.title}</h1>
                        <p className="mt-2 text-gray-600">{module.description}</p>
                        <div className="mt-2 text-sm text-gray-500">
                            Order: {module.order} · {module.is_active ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href={`/admin/modules/${module.id}/lessons/create`}
                            className="inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            + Create Lesson
                        </Link>
                        <Link href={`/admin/modules/${module.id}/edit`} className="text-sm font-medium text-green-600 hover:text-green-900">
                            Edit Module
                        </Link>
                        <Link href="/admin/modules" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                            Back to Modules
                        </Link>
                    </div>
                </div>

                {/* Lessons List */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Lessons</h3>
                        <p className="mt-1 max-w-2xl text-sm text-gray-500">All lessons inside this module</p>
                    </div>
                    <ul className="divide-y divide-gray-200">
                        {module.lessons?.length ? (
                            module.lessons.map((lesson) => (
                                <li key={lesson.id} className="px-4 py-5 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center">
                                                <Link
                                                    href={`/admin/lessons/${lesson.id}`}
                                                    className="truncate text-sm font-medium text-gray-900 hover:text-green-600"
                                                >
                                                    #{lesson.id} · {lesson.title}
                                                </Link>
                                            </div>
                                            {lesson.content_markdown && (
                                                <p className="mt-2 line-clamp-3 text-sm whitespace-pre-line text-gray-600">
                                                    {lesson.content_markdown}
                                                </p>
                                            )}
                                            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                                                <span>Created: {new Date(lesson.created_at).toLocaleString?.() || lesson.created_at}</span>
                                                <span>Updated: {new Date(lesson.updated_at).toLocaleString?.() || lesson.updated_at}</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 shrink-0 text-right">
                                            <Link
                                                href={`/admin/lessons/${lesson.id}`}
                                                className="text-sm font-medium text-green-600 hover:text-green-900"
                                            >
                                                View
                                            </Link>
                                        </div>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-6 text-center text-gray-500 sm:px-6">No lessons yet.</li>
                        )}
                    </ul>
                </div>
            </div>
        </AdminLayout>
    );
}
