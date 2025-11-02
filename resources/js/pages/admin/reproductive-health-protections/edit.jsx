import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';

export default function EditReproductiveHealthProtection({ protection, user }) {
    const [imagePreview, setImagePreview] = useState(null);
    const { data, setData, put, processing, errors } = useForm({
        method: protection?.method || '',
        description: protection?.description || '',
        effectiveness: protection?.effectiveness || '',
        benefits: protection?.benefits || '',
        drawbacks: protection?.drawbacks || '',
        image: null,
    });

    // Set initial image preview if existing image exists
    useEffect(() => {
        if (protection?.image_suggestion && !imagePreview) {
            setImagePreview(`/storage/${protection.image_suggestion}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [protection]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const submit = (e) => {
        e.preventDefault();
        put(`/admin/reproductive-health-protections/${protection.id}`);
    };

    return (
        <AdminLayout user={user} currentPath={`/admin/reproductive-health-protections/${protection.id}/edit`}>
            <Head title={`Edit ${protection?.method || 'Protection Method'}`} />

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
                                <Link
                                    href="/admin/reproductive-health-protections"
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                >
                                    Reproductive Health Protections
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
                                <span className="ml-4 text-sm font-medium text-gray-500">Edit</span>
                            </div>
                        </li>
                    </ol>
                </nav>

                <div className="rounded-lg bg-white p-6 shadow">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Edit Protection Method</h2>
                        <p className="mt-2 text-gray-600">Update the reproductive health protection method information</p>
                    </div>

                    <form onSubmit={submit} className="space-y-6">
                        {/* Method Name */}
                        <div>
                            <label htmlFor="method" className="mb-2 block text-sm font-medium text-gray-700">
                                Method Name *
                            </label>
                            <input
                                type="text"
                                id="method"
                                value={data.method}
                                onChange={(e) => setData('method', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="e.g., Condom, Birth Control Pills, IUD"
                                required
                            />
                            {errors.method && <p className="mt-1 text-sm text-red-600">{errors.method}</p>}
                        </div>

                        {/* Description */}
                        <div>
                            <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-700">
                                Description *
                            </label>
                            <textarea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="Provide a detailed description of the protection method"
                                required
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                        </div>

                        {/* Effectiveness */}
                        <div>
                            <label htmlFor="effectiveness" className="mb-2 block text-sm font-medium text-gray-700">
                                Effectiveness *
                            </label>
                            <input
                                type="text"
                                id="effectiveness"
                                value={data.effectiveness}
                                onChange={(e) => setData('effectiveness', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="e.g., 99% effective when used correctly"
                                required
                            />
                            {errors.effectiveness && <p className="mt-1 text-sm text-red-600">{errors.effectiveness}</p>}
                        </div>

                        {/* Benefits */}
                        <div>
                            <label htmlFor="benefits" className="mb-2 block text-sm font-medium text-gray-700">
                                Benefits *
                            </label>
                            <textarea
                                id="benefits"
                                rows={4}
                                value={data.benefits}
                                onChange={(e) => setData('benefits', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="List the benefits and advantages of this method"
                                required
                            />
                            {errors.benefits && <p className="mt-1 text-sm text-red-600">{errors.benefits}</p>}
                        </div>

                        {/* Drawbacks */}
                        <div>
                            <label htmlFor="drawbacks" className="mb-2 block text-sm font-medium text-gray-700">
                                Drawbacks *
                            </label>
                            <textarea
                                id="drawbacks"
                                rows={4}
                                value={data.drawbacks}
                                onChange={(e) => setData('drawbacks', e.target.value)}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                placeholder="List any potential drawbacks or side effects"
                                required
                            />
                            {errors.drawbacks && <p className="mt-1 text-sm text-red-600">{errors.drawbacks}</p>}
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label htmlFor="image" className="mb-2 block text-sm font-medium text-gray-700">
                                Image (Optional)
                            </label>
                            <div className="space-y-2">
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-md file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                                {imagePreview && (
                                    <div className="mt-3">
                                        <p className="mb-2 text-sm text-gray-700">{data.image ? 'New Image Preview:' : 'Current Image:'}</p>
                                        <img src={imagePreview} alt="Preview" className="h-40 w-40 rounded-lg border border-gray-300 object-cover" />
                                    </div>
                                )}
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Optional: Upload a new image file to replace the current one (JPG, PNG, GIF, WebP - Max 5MB)
                            </p>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 border-t border-gray-200 pt-6">
                            <Link
                                href="/admin/reproductive-health-protections"
                                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Updating...' : 'Update Method'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
