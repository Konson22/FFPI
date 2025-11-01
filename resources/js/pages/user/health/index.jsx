import { Head, Link, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserHealth({ user, healthMetrics: healthMetricsProp, symptoms: symptomsProp, medications: medicationsProp }) {
    const { props } = usePage();
    const successMessage = props?.flash?.success;
    const [activeTab, setActiveTab] = useState('symptoms');

    // Tailwind needs explicit class names for colors; map known colors safely
    const colorClassMap = {
        green: { bgLight: 'bg-green-100', bg: 'bg-green-500' },
        blue: { bgLight: 'bg-blue-100', bg: 'bg-blue-500' },
        yellow: { bgLight: 'bg-yellow-100', bg: 'bg-yellow-500' },
        red: { bgLight: 'bg-red-100', bg: 'bg-red-500' },
        emerald: { bgLight: 'bg-emerald-100', bg: 'bg-emerald-500' },
        indigo: { bgLight: 'bg-indigo-100', bg: 'bg-indigo-500' },
        violet: { bgLight: 'bg-violet-100', bg: 'bg-violet-500' },
        orange: { bgLight: 'bg-orange-100', bg: 'bg-orange-500' },
        teal: { bgLight: 'bg-teal-100', bg: 'bg-teal-500' },
        pink: { bgLight: 'bg-pink-100', bg: 'bg-pink-500' },
    };
    const getColorClasses = (color) => colorClassMap[color] || colorClassMap.green;

    const healthMetrics = useMemo(() => {
        const metrics = healthMetricsProp ?? props?.healthMetrics ?? props?.metrics ?? props?.health?.metrics ?? [];
        const normalize = (m) => ({
            title: m?.title ?? '',
            value: m?.value ?? '',
            status: m?.status ?? '',
            color: m?.color ?? 'green',
        });
        return Array.isArray(metrics) ? metrics.map(normalize) : [];
    }, [props]);

    const symptoms = useMemo(() => {
        const list = symptomsProp ?? props?.symptoms ?? props?.health?.symptoms ?? [];
        const normalize = (s) => ({
            name: s?.name ?? s?.title ?? '',
            severity: s?.severity ?? s?.level ?? 'Mild',
            date: s?.date ?? s?.logged_at ?? s?.created_at ?? '',
        });
        return Array.isArray(list) ? list.map(normalize) : [];
    }, [props]);

    const medications = useMemo(() => {
        const list = medicationsProp ?? props?.medications ?? props?.health?.medications ?? [];
        const normalize = (m) => ({
            name: m?.name ?? '',
            dosage: m?.dosage ?? '',
            frequency: m?.frequency ?? '',
            nextDose: m?.nextDose ?? m?.next_dose ?? '',
        });
        return Array.isArray(list) ? list.map(normalize) : [];
    }, [props]);

    // Cycle data for calendar
    const cycleLength = props?.cycle_length ?? props?.health?.cycle_length ?? 28;
    const lastPeriodStartRaw = props?.last_period_start ?? props?.health?.last_period_start ?? null;
    const lastPeriodStart = useMemo(() => {
        if (!lastPeriodStartRaw) return null;
        const d = new Date(lastPeriodStartRaw);
        return isNaN(d.getTime()) ? null : d;
    }, [lastPeriodStartRaw]);

    // Calendar computations
    const today = new Date();
    const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));

    const addDays = (date, days) => {
        const d = new Date(date);
        d.setDate(d.getDate() + days);
        return d;
    };

    const isSameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

    const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const parseDate = (value) => {
        if (!value) return null;
        const d = new Date(value);
        return isNaN(d.getTime()) ? null : d;
    };

    // User-data-driven highlights
    const symptomDateKeys = useMemo(() => {
        const keys = new Set();
        for (const s of symptoms) {
            const d = parseDate(s?.date);
            if (d) keys.add(dateKey(d));
        }
        return keys;
    }, [symptoms]);

    const medicationDateKeys = useMemo(() => {
        const keys = new Set();
        for (const m of medications) {
            const d = parseDate(m?.nextDose);
            if (d) keys.add(dateKey(d));
        }
        return keys;
    }, [medications]);

    const periodLogsRaw = props?.health?.period_logs ?? props?.period_logs ?? props?.health?.periods ?? [];
    const periodLogDateKeys = useMemo(() => {
        const keys = new Set();
        if (Array.isArray(periodLogsRaw)) {
            for (const p of periodLogsRaw) {
                const d = parseDate(p?.date ?? p?.start_date ?? p?.period_start_date ?? p?.logged_at);
                if (d) keys.add(dateKey(d));
            }
        }
        if (lastPeriodStart) keys.add(dateKey(lastPeriodStart));
        return keys;
    }, [periodLogsRaw, lastPeriodStart]);

    const phaseByDate = useMemo(() => {
        if (!lastPeriodStart || !cycleLength) return () => 'unknown';
        // Simple model:
        // Period days: day 0-4 from lastPeriodStart
        // Ovulation: day 14 from lastPeriodStart (for 28-day cycle; approximate shift for other lengths)
        // Fertile window: ovulation-5 to ovulation+1
        // Safe days: all others in the cycle
        return (date) => {
            // Find the most recent cycle start on/before date
            const cycleStart = (() => {
                const diffDays = Math.floor((date - lastPeriodStart) / (1000 * 60 * 60 * 24));
                if (diffDays < 0) return lastPeriodStart; // before recorded start
                const cyclesPassed = Math.floor(diffDays / cycleLength);
                return addDays(lastPeriodStart, cyclesPassed * cycleLength);
            })();

            const dayIndex = Math.floor((date - cycleStart) / (1000 * 60 * 60 * 24));
            if (dayIndex >= 0 && dayIndex <= 4) return 'period';
            const ovulationDay = Math.round(cycleLength - 14);
            if (dayIndex >= ovulationDay - 5 && dayIndex <= ovulationDay + 1) return 'fertile';
            if (dayIndex === ovulationDay) return 'ovulation';
            return 'safe';
        };
    }, [lastPeriodStart, cycleLength]);

    return (
        <UserLayout user={user} role="user" currentPath="/user/health">
            <Head title="Health Tracking - Family Planning" />
            <div>
                {successMessage && (
                    <div className="mb-4 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">{successMessage}</div>
                )}
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Health Tracking</h1>
                    <p className="mt-2 text-gray-600">Monitor your reproductive health and wellness</p>
                </div>

                {/* Health Metrics */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {healthMetrics.map((metric, index) => (
                        <div key={index} className="rounded-lg bg-white p-4 shadow">
                            <div className="flex items-center">
                                {(() => {
                                    const classes = getColorClasses(metric.color);
                                    return (
                                        <div className={`rounded-lg p-2 ${classes.bgLight}`}>
                                            <div className={`h-6 w-6 rounded ${classes.bg}`}></div>
                                        </div>
                                    );
                                })()}
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                                    <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                                    <p className="text-sm text-gray-500">{metric.status}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Cycle Calendar */}
                <div className="mb-6 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-base font-semibold text-gray-900 md:text-lg">Cycle Calendar</h3>
                            {!lastPeriodStart && (
                                <Link href={route('user.health.track.form')} className="text-sm font-medium text-emerald-700 hover:text-emerald-800">
                                    Add last period
                                </Link>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">Estimated safe days, fertile window, and ovulation</p>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="mb-3 flex items-center justify-between">
                            <div className="text-sm text-gray-700">{month.toLocaleString(undefined, { month: 'long', year: 'numeric' })}</div>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded bg-red-200"></span> Period
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded bg-yellow-200"></span> Fertile
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded bg-emerald-200"></span> Safe
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded border-2 border-violet-500"></span> Ovulation
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded bg-blue-200"></span> Symptom
                                </span>
                                <span className="inline-flex items-center gap-1">
                                    <span className="h-3 w-3 rounded bg-orange-200"></span> Medication
                                </span>
                            </div>
                        </div>
                        {!lastPeriodStart && (
                            <div className="mb-3 text-sm text-gray-600">
                                Provide your last period start date to see your personalized highlights.{' '}
                                <Link href={route('user.health.track.form')} className="font-medium text-emerald-700 hover:text-emerald-800">
                                    Track now
                                </Link>
                            </div>
                        )}
                        <DayPicker
                            mode="single"
                            showOutsideDays
                            fixedWeeks
                            month={month}
                            onMonthChange={setMonth}
                            selected={today}
                            modifiers={{
                                ...(lastPeriodStart
                                    ? {
                                          period: (date) => phaseByDate(date) === 'period',
                                          fertile: (date) => phaseByDate(date) === 'fertile',
                                          ovulation: (date) => phaseByDate(date) === 'ovulation',
                                          safe: (date) => phaseByDate(date) === 'safe',
                                      }
                                    : {}),
                                symptom: (date) => symptomDateKeys.has(dateKey(date)),
                                medication: (date) => medicationDateKeys.has(dateKey(date)),
                                periodlog: (date) => periodLogDateKeys.has(dateKey(date)),
                            }}
                            modifiersClassNames={{
                                period: 'bg-red-100 text-red-900',
                                fertile: 'bg-yellow-100 text-yellow-900',
                                safe: 'bg-emerald-100 text-emerald-900',
                                ovulation: 'bg-violet-50 text-violet-700 ring-2 ring-violet-500',
                                today: 'ring-1 ring-gray-400',
                                symptom: 'bg-blue-100 text-blue-900',
                                medication: 'bg-orange-100 text-orange-900',
                                periodlog: 'ring-2 ring-red-400',
                            }}
                            className="rdp-custom rounded-md border border-gray-200 p-2 !text-sm"
                        />
                    </div>
                </div>

                {/* Mobile tabs for details */}
                <div className="mb-6 lg:hidden">
                    <div role="tablist" aria-label="Health detail sections" className="flex gap-2">
                        {['symptoms', 'medications'].map((tab) => (
                            <button
                                key={tab}
                                role="tab"
                                aria-selected={activeTab === tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                    activeTab === tab ? 'bg-emerald-600 text-white' : 'bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {tab === 'symptoms' ? 'Symptoms' : 'Medications'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Details: stacked on mobile via tabs, side-by-side on desktop */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Symptoms Tracking */}
                    <div className={`${activeTab === 'symptoms' ? '' : 'hidden lg:block'} rounded-lg bg-white shadow`}>
                        <div className="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
                            <h3 className="text-base font-semibold text-gray-900 md:text-lg">Recent Symptoms</h3>
                        </div>
                        <div className="p-4 md:p-6">
                            <div className="space-y-4">
                                {symptoms.length === 0 && <p className="text-sm text-gray-500">No symptoms logged yet.</p>}
                                {symptoms.map((symptom, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{symptom.name}</p>
                                            <p className="text-sm text-gray-500">{symptom.date}</p>
                                        </div>
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${
                                                symptom.severity === 'Mild'
                                                    ? 'bg-green-100 text-green-800'
                                                    : symptom.severity === 'Moderate'
                                                      ? 'bg-yellow-100 text-yellow-800'
                                                      : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {symptom.severity}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Medications */}
                    <div className={`${activeTab === 'medications' ? '' : 'hidden lg:block'} rounded-lg bg-white shadow`}>
                        <div className="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
                            <h3 className="text-base font-semibold text-gray-900 md:text-lg">Current Medications</h3>
                        </div>
                        <div className="p-4 md:p-6">
                            <div className="space-y-4">
                                {medications.length === 0 && <p className="text-sm text-gray-500">No medications added yet.</p>}
                                {medications.map((med, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{med.name}</p>
                                            <p className="text-sm text-gray-500">
                                                {med.dosage} - {med.frequency}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-gray-500">Next dose:</p>
                                            <p className="text-sm font-medium text-gray-900">{med.nextDose}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6">
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-4 py-3 md:px-6 md:py-4">
                            <h3 className="text-base font-semibold text-gray-900 md:text-lg">Health Actions</h3>
                        </div>
                        <div className="p-4 md:p-6">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Log Symptoms</span>
                                </button>
                                <Link
                                    href={route('user.health.track.form')}
                                    className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                                >
                                    <span className="text-sm font-medium text-gray-700">Track Period</span>
                                </Link>
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">Add Medication</span>
                                </button>
                                <button className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 text-sm transition-colors hover:bg-gray-50">
                                    <span className="text-sm font-medium text-gray-700">View History</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
