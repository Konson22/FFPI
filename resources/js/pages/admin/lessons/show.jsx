import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function ShowLesson({ lesson, module, user, currentPath }) {
    return (
        <AdminLayout user={user} currentPath={currentPath || `/admin/lessons/${lesson?.id}`}>
            <Head title={`Lesson: ${lesson?.title || 'Lesson Details'}`} />

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
                        {module && (
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
                        )}
                        <li>
                            <div className="flex items-center">
                                <svg className="h-5 w-5 flex-shrink-0 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-4 text-sm font-medium text-gray-500">{lesson?.title || 'Lesson'}</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{lesson?.title || 'Lesson'}</h1>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Link
                            href="/admin/lessons/quizzes/create"
                            className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                            + Create Quiz
                        </Link>
                        {module && (
                            <Link href={`/admin/modules/${module.id}`} className="text-sm font-medium text-gray-600 hover:text-gray-900">
                                Back to Module
                            </Link>
                        )}
                    </div>
                </div>

                {/* Lesson Content */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Lesson Content</h3>
                    </div>
                    <div className="px-4 py-5 sm:px-6">
                        {lesson?.content_html ? (
                            <article className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: lesson.content_html }} />
                        ) : lesson?.content_markdown ? (
                            <article className="prose max-w-none whitespace-pre-wrap text-gray-800">{lesson.content_markdown}</article>
                        ) : (
                            <p className="text-gray-500">No content available.</p>
                        )}
                    </div>
                </div>

                {/* Lesson Metadata */}
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-4 py-5 sm:px-6">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">Lesson Information</h3>
                    </div>
                    <dl className="divide-y divide-gray-200 px-4 py-5 sm:px-6">
                        <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                            <dt className="text-sm font-medium text-gray-500">Lesson ID</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{lesson?.id || 'N/A'}</dd>
                        </div>
                        {lesson?.created_at && (
                            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">Created</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{new Date(lesson.created_at).toLocaleString()}</dd>
                            </div>
                        )}
                        {lesson?.updated_at && (
                            <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
                                <dt className="text-sm font-medium text-gray-500">Last Updated</dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{new Date(lesson.updated_at).toLocaleString()}</dd>
                            </div>
                        )}
                    </dl>
                </div>
            </div>
        </AdminLayout>
    );
}
