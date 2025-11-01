import { Head, useForm } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ProfileSetup({ user }) {
    const { data, setData, post, processing, errors } = useForm({
        gender: '',
        date_of_birth: '',
        marital_status: '',
        cycle_length: '',
        period_length: '',
        health_notes: '',
    });

    const isFemale = data.gender === 'female';

    const submit = (e) => {
        e.preventDefault();
        post(route('user.profile.setup.store'));
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/profile/setup">
            <Head title="Complete Your Profile" />

            <div className="mx-auto max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Complete Your Profile</h1>
                    <p className="mt-2 text-sm text-gray-600">
                        Help us personalize your experience by providing some basic information about yourself.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    {/* Gender Selection */}
                    <div>
                        <label htmlFor="gender" className="mb-2 block text-sm font-medium text-gray-700">
                            Gender
                        </label>
                        <select
                            id="gender"
                            name="gender"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.gender}
                            onChange={(e) => setData('gender', e.target.value)}
                        >
                            <option value="">Select gender</option>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && (
                            <p className="mt-2 flex items-center text-sm text-red-600">
                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {errors.gender}
                            </p>
                        )}
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label htmlFor="date_of_birth" className="mb-2 block text-sm font-medium text-gray-700">
                            Date of Birth <span className="text-gray-400">(Optional)</span>
                        </label>
                        <input
                            id="date_of_birth"
                            name="date_of_birth"
                            type="date"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.date_of_birth}
                            onChange={(e) => setData('date_of_birth', e.target.value)}
                            max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.date_of_birth && (
                            <p className="mt-2 flex items-center text-sm text-red-600">
                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {errors.date_of_birth}
                            </p>
                        )}
                    </div>

                    {/* Marital Status */}
                    <div>
                        <label htmlFor="marital_status" className="mb-2 block text-sm font-medium text-gray-700">
                            Marital Status <span className="text-gray-400">(Optional)</span>
                        </label>
                        <select
                            id="marital_status"
                            name="marital_status"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            value={data.marital_status}
                            onChange={(e) => setData('marital_status', e.target.value)}
                        >
                            <option value="">Select marital status</option>
                            <option value="single">Single</option>
                            <option value="married">Married</option>
                            <option value="divorced">Divorced</option>
                            <option value="widowed">Widowed</option>
                        </select>
                        {errors.marital_status && (
                            <p className="mt-2 flex items-center text-sm text-red-600">
                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {errors.marital_status}
                            </p>
                        )}
                    </div>

                    {/* Cycle Length - Only for Females */}
                    {isFemale && (
                        <div>
                            <label htmlFor="cycle_length" className="mb-2 block text-sm font-medium text-gray-700">
                                Average Cycle Length <span className="text-gray-400">(Days, Optional)</span>
                            </label>
                            <input
                                id="cycle_length"
                                name="cycle_length"
                                type="number"
                                min="21"
                                max="35"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                placeholder="28 (default)"
                                value={data.cycle_length}
                                onChange={(e) => setData('cycle_length', e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500">Typical cycle length is between 21-35 days</p>
                            {errors.cycle_length && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.cycle_length}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Period Length - Only for Females */}
                    {isFemale && (
                        <div>
                            <label htmlFor="period_length" className="mb-2 block text-sm font-medium text-gray-700">
                                Average Period Length <span className="text-gray-400">(Days, Optional)</span>
                            </label>
                            <input
                                id="period_length"
                                name="period_length"
                                type="number"
                                min="1"
                                max="10"
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                                placeholder="5 (default)"
                                value={data.period_length}
                                onChange={(e) => setData('period_length', e.target.value)}
                            />
                            <p className="mt-1 text-xs text-gray-500">Typical period length is between 3-7 days</p>
                            {errors.period_length && (
                                <p className="mt-2 flex items-center text-sm text-red-600">
                                    <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {errors.period_length}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Health Notes */}
                    <div>
                        <label htmlFor="health_notes" className="mb-2 block text-sm font-medium text-gray-700">
                            Additional Health Notes <span className="text-gray-400">(Optional)</span>
                        </label>
                        <textarea
                            id="health_notes"
                            name="health_notes"
                            rows={4}
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500"
                            placeholder="Any additional health information you'd like to share..."
                            value={data.health_notes}
                            onChange={(e) => setData('health_notes', e.target.value)}
                        />
                        {errors.health_notes && (
                            <p className="mt-2 flex items-center text-sm text-red-600">
                                <svg className="mr-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                {errors.health_notes}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-lg bg-emerald-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
