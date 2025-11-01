import { Head, Link, useForm } from '@inertiajs/react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function TrackPeriod({ user }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        period_start_date: '',
        cycle_length: 28,
        cycle_phase: '',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('user.health.track'), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/health">
            <Head title="Track Period - Family Planning" />

            <div className="mx-auto max-w-3xl">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Track Period</h1>
                        <p className="mt-1 text-sm text-gray-600">Log your latest period to keep your cycle on track</p>
                    </div>
                    <Link href={route('user.health')} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                        Back to Health
                    </Link>
                </div>

                <form onSubmit={submit} className="space-y-6 rounded-lg bg-white p-6 shadow">
                    <div>
                        <label htmlFor="period_start_date" className="block text-sm font-medium text-gray-700">
                            Period start date
                        </label>
                        <input
                            id="period_start_date"
                            type="date"
                            value={data.period_start_date}
                            onChange={(e) => setData('period_start_date', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            required
                        />
                        {errors.period_start_date && <p className="mt-1 text-sm text-red-600">{errors.period_start_date}</p>}
                    </div>

                    <div>
                        <label htmlFor="cycle_length" className="block text-sm font-medium text-gray-700">
                            Cycle length (days)
                        </label>
                        <input
                            id="cycle_length"
                            type="number"
                            min={21}
                            max={45}
                            value={data.cycle_length}
                            onChange={(e) => setData('cycle_length', e.target.value ? parseInt(e.target.value, 10) : '')}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                        {errors.cycle_length && <p className="mt-1 text-sm text-red-600">{errors.cycle_length}</p>}
                    </div>

                    <div>
                        <label htmlFor="cycle_phase" className="block text-sm font-medium text-gray-700">
                            Current cycle phase (optional)
                        </label>
                        <select
                            id="cycle_phase"
                            value={data.cycle_phase}
                            onChange={(e) => setData('cycle_phase', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                        >
                            <option value="">Select phase</option>
                            <option value="menstrual">Menstrual</option>
                            <option value="follicular">Follicular</option>
                            <option value="ovulatory">Ovulatory</option>
                            <option value="luteal">Luteal</option>
                        </select>
                        {errors.cycle_phase && <p className="mt-1 text-sm text-red-600">{errors.cycle_phase}</p>}
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                            Notes (optional)
                        </label>
                        <textarea
                            id="notes"
                            rows={3}
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                            placeholder="e.g., flow, cramps, mood, anything notable"
                        />
                        {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Link
                            href={route('user.health')}
                            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
                        >
                            {processing ? 'Saving...' : 'Save tracking'}
                        </button>
                    </div>
                </form>
            </div>
        </UserLayout>
    );
}
