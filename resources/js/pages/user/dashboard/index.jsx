import { Link } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserDashboard({ user, learningStats, upcomingAppointments = [] }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [predictions, setPredictions] = useState(null);
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;
        async function load() {
            try {
                setLoading(true);
                const [fertilityRes, remindersRes] = await Promise.all([
                    fetch('/api/fertility-tracking', { credentials: 'include' }),
                    fetch('/api/reminders', { credentials: 'include' }),
                ]);
                const fertilityJson = fertilityRes.ok ? await fertilityRes.json() : null;
                const remindersJson = remindersRes.ok ? await remindersRes.json() : null;
                if (!isMounted) return;
                setPredictions(fertilityJson?.predictions ?? null);
                setReminders(Array.isArray(remindersJson?.data) ? remindersJson.data : []);
            } catch (e) {
                if (!isMounted) return;
                setError('Failed to load dashboard data');
            } finally {
                if (isMounted) setLoading(false);
            }
        }
        load();
        return () => {
            isMounted = false;
        };
    }, []);

    const quickLinks = [
        { title: 'Learn Hub', description: 'Educational content on SRHR', icon: '📚', href: '/user/learn', color: 'blue' },
        { title: 'Quiz & Challenges', description: 'Test your knowledge', icon: '🧠', href: '/user/quiz', color: 'purple' },
        { title: 'Ask a Question', description: 'Get expert answers', icon: '❓', href: '/user/ask', color: 'green' },
        { title: 'Services Near You', description: 'Find local SRHR services', icon: '📍', href: '/user/services', color: 'orange' },
    ];

    const healthTip = useMemo(() => {
        if (!predictions) {
            return {
                title: 'Daily Health Tip',
                content:
                    'Regular exercise can help regulate your menstrual cycle and reduce PMS symptoms. Aim for at least 30 minutes of moderate activity most days of the week.',
                category: 'Physical Health',
            };
        }
        const phase = predictions.current_phase;
        const tipsByPhase = {
            menstrual: {
                title: 'Care during Period',
                content: 'Stay hydrated and consider light movement like walking or yoga to ease cramps.',
                category: 'Cycle Support',
            },
            follicular: {
                title: 'Energy Boost Phase',
                content: 'A great time to learn and be active. Consider starting a new module today.',
                category: 'Learning',
            },
            ovulatory: {
                title: 'Fertility Peak',
                content: 'Ovulation estimated. If avoiding pregnancy, use protection. If trying to conceive, this is your window.',
                category: 'Family Planning',
            },
            luteal: {
                title: 'Pre-period Care',
                content: 'Focus on sleep and balanced meals. Track any PMS symptoms for patterns.',
                category: 'Wellness',
            },
        };
        return (
            tipsByPhase[phase] ?? {
                title: 'Your Health',
                content: 'Track your cycle to get personalized insights on your dashboard.',
                category: 'Overview',
            }
        );
    }, [predictions]);

    const recentActivity = [
        { id: 1, action: 'Completed "Understanding Contraception" quiz', time: '2 hours ago', type: 'quiz', points: 15 },
        { id: 2, action: 'Read article on "Healthy Communication"', time: '1 day ago', type: 'learn', points: 10 },
        { id: 3, action: 'Asked question about menstrual health', time: '2 days ago', type: 'ask', points: 5 },
        { id: 4, action: 'Found nearby family planning clinic', time: '3 days ago', type: 'service', points: 8 },
    ];

    const upcomingEvents = useMemo(() => {
        const list = [];
        if (predictions?.next_period) {
            list.push({
                title: 'Expected period',
                date: predictions.next_period,
                type: 'reminder',
            });
        }
        if (predictions?.fertile_window?.start) {
            list.push({
                title: 'Fertile window starts',
                date: predictions.fertile_window.start,
                type: 'reminder',
            });
        }
        if (predictions?.ovulation_day) {
            list.push({ title: 'Estimated ovulation', date: predictions.ovulation_day, type: 'reminder' });
        }
        const reminderEvents = reminders
            .filter((r) => r?.reminder_time)
            .map((r) => ({ title: r.message ?? r.type ?? 'Reminder', date: (r.reminder_time || '').slice(0, 10), type: 'reminder' }))
            .slice(0, 5);
        return [...list, ...reminderEvents];
    }, [predictions, reminders]);

    const stats = useMemo(() => {
        const toDays = (dateStr) => {
            try {
                const d = new Date(dateStr);
                const now = new Date();
                const diff = Math.ceil((d.setHours(0, 0, 0, 0) - now.setHours(0, 0, 0, 0)) / (1000 * 60 * 60 * 24));
                return diff;
            } catch {
                return null;
            }
        };
        const daysToPeriod = predictions?.next_period ? toDays(predictions.next_period) : null;
        const items = [];

        if (predictions?.next_period) {
            items.push({
                title: 'Next Period',
                value: predictions.next_period,
                change:
                    daysToPeriod === null
                        ? ''
                        : daysToPeriod === 0
                          ? 'today'
                          : `${daysToPeriod > 0 ? 'in ' + daysToPeriod : Math.abs(daysToPeriod) + ' days ago'}`,
                color: 'purple',
            });
        }

        if (predictions?.fertile_window?.start && predictions?.fertile_window?.end) {
            items.push({
                title: 'Fertile Window',
                value: `${predictions.fertile_window.start} → ${predictions.fertile_window.end}`,
                change: predictions?.ovulation_day ? `Ovulation ${predictions.ovulation_day}` : '',
                color: 'emerald',
            });
        }

        if (predictions?.current_phase && predictions.current_phase !== 'unknown') {
            items.push({
                title: 'Cycle Phase',
                value: predictions.current_phase,
                change: 'based on latest log',
                color: 'indigo',
            });
        }

        return items;
    }, [predictions, reminders]);

    return (
        <UserLayout user={user} role="user" currentPath="/user/dashboard">
            <div className="">
                {/* Welcome Header */}
                <div className="mb-6 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'User'}!</h1>
                                <p className="mt-2 text-green-100">
                                    {loading
                                        ? 'Loading your insights…'
                                        : error
                                          ? 'Unable to load your latest insights'
                                          : 'Your personalized health insights are ready'}
                                </p>
                            </div>
                            <div className="hidden md:block">
                                <div className="text-right">
                                    <p className="text-sm text-green-100">Learning Streak</p>
                                    <p className="text-2xl font-bold">
                                        {learningStats?.learning_streak_days ?? 0} {learningStats?.learning_streak_days === 1 ? 'day' : 'days'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    {/* Learning Stats */}
                    {learningStats && (
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-blue-100 p-2">
                                        <div className="h-6 w-6 rounded bg-blue-500"></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Average Score</p>
                                        <p className="text-2xl font-bold text-gray-900">{learningStats.average_score}%</p>
                                        <p className="text-sm text-gray-500">{learningStats.completed_lessons} lessons completed</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-purple-100 p-2">
                                        <div className="h-6 w-6 rounded bg-purple-500"></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Overall Progress</p>
                                        <p className="text-2xl font-bold text-gray-900">{learningStats.overall_progress}%</p>
                                        <p className="text-sm text-gray-500">
                                            {learningStats.completed_modules}/{learningStats.total_modules_enrolled} modules
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-emerald-100 p-2">
                                        <div className="h-6 w-6 rounded bg-emerald-500"></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Lessons Completed</p>
                                        <p className="text-2xl font-bold text-gray-900">{learningStats.completed_lessons}</p>
                                        <p className="text-sm text-gray-500">{learningStats.total_lessons_attempted} attempted</p>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div className="rounded-lg bg-orange-100 p-2">
                                        <div className="h-6 w-6 rounded bg-orange-500"></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                                        <p className="text-2xl font-bold text-gray-900">{learningStats.learning_streak_days}</p>
                                        <p className="text-sm text-gray-500">{learningStats.learning_streak_days === 1 ? 'day' : 'days'} in a row</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <div key={index} className="rounded-lg bg-white p-6 shadow">
                                <div className="flex items-center">
                                    <div
                                        className={`rounded-lg p-2 ${stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'purple' ? 'bg-purple-100' : stat.color === 'emerald' ? 'bg-emerald-100' : 'bg-indigo-100'}`}
                                    >
                                        <div
                                            className={`h-6 w-6 rounded ${stat.color === 'blue' ? 'bg-blue-500' : stat.color === 'purple' ? 'bg-purple-500' : stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                                        ></div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                                        <p className="text-sm text-gray-500">{stat.change}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Main Content - Appointments & Other Content */}
                        <div className="space-y-6 lg:order-1 lg:col-span-3">
                            {/* Upcoming Appointments - Center */}
                            <div className="rounded-lg bg-white shadow-lg">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h3>
                                            <p className="mt-1 text-sm text-gray-500">Your scheduled appointments</p>
                                        </div>
                                        <Link
                                            href="/user/appointments"
                                            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                                        >
                                            View All
                                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                                <div className="p-6">
                                    {upcomingAppointments.length === 0 ? (
                                        <div className="py-12 text-center">
                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                                                <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                    />
                                                </svg>
                                            </div>
                                            <p className="mt-4 text-sm font-medium text-gray-900">No upcoming appointments</p>
                                            <p className="mt-1 text-sm text-gray-500">Schedule your next appointment to get started</p>
                                            <Link
                                                href="/user/appointments"
                                                className="mt-4 inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                Book an appointment
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {upcomingAppointments.map((appointment) => (
                                                <Link
                                                    key={appointment.id}
                                                    href="/user/appointments"
                                                    className="group block rounded-xl border-2 border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:bg-blue-50 hover:shadow-md"
                                                >
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <div className="mb-2 flex items-center gap-3">
                                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                                                                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                                        />
                                                                    </svg>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="flex items-center gap-2">
                                                                        <h4 className="text-base font-semibold text-gray-900">
                                                                            {appointment.doctor_name}
                                                                        </h4>
                                                                        <span
                                                                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                                                appointment.status === 'confirmed'
                                                                                    ? 'bg-green-100 text-green-800'
                                                                                    : 'bg-blue-100 text-blue-800'
                                                                            }`}
                                                                        >
                                                                            {appointment.status}
                                                                        </span>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-600">{appointment.specialization}</p>
                                                                </div>
                                                            </div>
                                                            <div className="mt-4 flex items-center gap-6 text-sm">
                                                                <div className="flex items-center text-gray-600">
                                                                    <svg
                                                                        className="mr-2 h-4 w-4 text-gray-400"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">{appointment.appointment_date_formatted}</span>
                                                                </div>
                                                                <div className="flex items-center text-gray-600">
                                                                    <svg
                                                                        className="mr-2 h-4 w-4 text-gray-400"
                                                                        fill="none"
                                                                        stroke="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path
                                                                            strokeLinecap="round"
                                                                            strokeLinejoin="round"
                                                                            strokeWidth={2}
                                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                        />
                                                                    </svg>
                                                                    <span className="font-medium">{appointment.appointment_time_formatted}</span>
                                                                </div>
                                                            </div>
                                                            {appointment.reason && (
                                                                <div className="mt-3 rounded-lg bg-gray-50 p-3">
                                                                    <p className="text-sm text-gray-700">
                                                                        <span className="font-medium">Reason:</span> {appointment.reason}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {appointment.days_until !== null && appointment.days_until >= 0 && (
                                                            <div className="ml-4 text-right">
                                                                <div
                                                                    className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                                                                        appointment.days_until === 0
                                                                            ? 'bg-red-100 text-red-800'
                                                                            : appointment.days_until === 1
                                                                              ? 'bg-orange-100 text-orange-800'
                                                                              : 'bg-blue-100 text-blue-800'
                                                                    }`}
                                                                >
                                                                    {appointment.days_until === 0
                                                                        ? 'Today'
                                                                        : appointment.days_until === 1
                                                                          ? 'Tomorrow'
                                                                          : `${appointment.days_until} days`}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Health Tip & Upcoming Events */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Health Tip */}
                                <div className="rounded-lg bg-white shadow-lg">
                                    <div className="border-b border-gray-200 px-6 py-4">
                                        <h3 className="text-lg font-semibold text-gray-900">{healthTip.title}</h3>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                                                    <span className="text-lg">💡</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-sm leading-relaxed text-gray-700">{healthTip.content}</p>
                                                <p className="mt-3 text-xs font-medium text-green-600">{healthTip.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Upcoming Events */}
                                {upcomingEvents.length > 0 && (
                                    <div className="rounded-lg bg-white shadow-lg">
                                        <div className="border-b border-gray-200 px-6 py-4">
                                            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                                        </div>
                                        <div className="p-6">
                                            <div className="space-y-4">
                                                {upcomingEvents.map((event, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <div
                                                            className={`h-3 w-3 flex-shrink-0 rounded-full ${event.type === 'reminder' ? 'bg-blue-500' : event.type === 'quiz' ? 'bg-purple-500' : 'bg-green-500'}`}
                                                        ></div>
                                                        <div className="min-w-0 flex-1">
                                                            <p className="truncate text-sm font-medium text-gray-900">{event.title}</p>
                                                            <p className="text-xs text-gray-500">{event.date}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Links - Right Sidebar */}
                        <div className="lg:order-2 lg:col-span-1">
                            <div className="sticky top-6 rounded-lg bg-white shadow-lg">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-gray-900">Quick Links</h3>
                                    <p className="mt-1 text-xs text-gray-500">Quick access to features</p>
                                </div>
                                <div className="p-4">
                                    <div className="space-y-3">
                                        {quickLinks.map((link, index) => (
                                            <Link
                                                key={index}
                                                href={link.href}
                                                className={`group flex items-center space-x-3 rounded-lg border-2 border-transparent p-3 transition-all duration-200 ${link.color === 'blue' ? 'hover:border-blue-200 hover:bg-blue-50' : link.color === 'purple' ? 'hover:border-purple-200 hover:bg-purple-50' : link.color === 'green' ? 'hover:border-green-200 hover:bg-green-50' : link.color === 'orange' ? 'hover:border-orange-200 hover:bg-orange-50' : link.color === 'pink' ? 'hover:border-pink-200 hover:bg-pink-50' : 'hover:border-indigo-200 hover:bg-indigo-50'}`}
                                            >
                                                <div
                                                    className={`flex-shrink-0 rounded-lg p-2 text-xl ${link.color === 'blue' ? 'bg-blue-100' : link.color === 'purple' ? 'bg-purple-100' : link.color === 'green' ? 'bg-green-100' : link.color === 'orange' ? 'bg-orange-100' : link.color === 'pink' ? 'bg-pink-100' : 'bg-indigo-100'}`}
                                                >
                                                    {link.icon}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <h4 className="text-sm font-medium text-gray-900 group-hover:text-gray-700">{link.title}</h4>
                                                    <p className="mt-0.5 truncate text-xs text-gray-500">{link.description}</p>
                                                </div>
                                                <svg
                                                    className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-gray-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="rounded-lg bg-white shadow">
                        <div className="border-b border-gray-200 px-6 py-4">
                            <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {/* Show learning completions first if available */}
                                {learningStats?.recent_completions && learningStats.recent_completions.length > 0 && (
                                    <>
                                        {learningStats.recent_completions.map((completion) => (
                                            <div key={completion.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Completed: {completion.lesson_title}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {completion.module_title} • {completion.time_ago} • Score: {completion.score}%
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                                                        Completed
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Show reminders if available */}
                                {reminders.length > 0 && (
                                    <>
                                        {reminders.slice(0, 6 - (learningStats?.recent_completions?.length || 0)).map((r) => (
                                            <div key={r.id} className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-2 w-2 rounded-full bg-orange-500"></div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{r.message ?? r.type}</p>
                                                        <p className="text-xs text-gray-500">
                                                            {(r.reminder_time || '').replace('T', ' ').replace('Z', '')}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span
                                                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${r.is_sent ? 'bg-gray-100 text-gray-800' : 'bg-green-100 text-green-800'}`}
                                                    >
                                                        {r.is_sent ? 'sent' : 'pending'}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                )}

                                {/* Show message if no activity */}
                                {(!learningStats?.recent_completions || learningStats.recent_completions.length === 0) && reminders.length === 0 && (
                                    <p className="text-sm text-gray-500">No recent activity.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
