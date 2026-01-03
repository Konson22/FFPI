import { Head, useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function AppointmentsPage({ user, doctor, doctors = [], appointments = [] }) {
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(!!doctor);
    const [selectedDate, setSelectedDate] = useState('');

    // Generate time slots (9 AM to 5 PM, 30-minute intervals)
    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 9; hour < 17; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                slots.push(time);
            }
        }
        return slots;
    };

    const timeSlots = generateTimeSlots();

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split('T')[0];
    };

    // Get maximum date (3 months from now)
    const getMaxDate = () => {
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        return maxDate.toISOString().split('T')[0];
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        doctor_id: doctor?.id || '',
        appointment_date: '',
        appointment_time: '',
        reason: '',
        notes: '',
    });

    // Set doctor if provided from URL
    useEffect(() => {
        if (doctor) {
            setData('doctor_id', doctor.id);
        }
    }, [doctor]);

    // Set minimum date when form opens
    useEffect(() => {
        if (showForm && !data.appointment_date) {
            setData('appointment_date', getMinDate());
            setSelectedDate(getMinDate());
        }
    }, [showForm]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/user/appointments', {
            onSuccess: () => {
                reset();
                setShowForm(false);
            },
        });
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            scheduled: { color: 'bg-blue-100 text-blue-800', label: 'Scheduled' },
            confirmed: { color: 'bg-green-100 text-green-800', label: 'Confirmed' },
            completed: { color: 'bg-gray-100 text-gray-800', label: 'Completed' },
            cancelled: { color: 'bg-red-100 text-red-800', label: 'Cancelled' },
        };

        const config = statusConfig[status] || statusConfig.scheduled;
        return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${config.color}`}>{config.label}</span>;
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/appointments">
            <Head title="Appointments - Family Planning" />

            <div>
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">Appointments</h1>
                            <p className="mt-2 text-blue-100">Book and manage your healthcare appointments</p>
                        </div>
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="rounded-lg bg-white px-6 py-3 font-medium text-blue-600 transition-all hover:bg-blue-50 active:scale-95"
                            >
                                Book New Appointment
                            </button>
                        )}
                    </div>
                </div>

                {/* Success/Error Messages */}
                {flash?.success && (
                    <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {flash.success}
                        </div>
                    </div>
                )}

                {/* Booking Form */}
                {showForm && (
                    <div className="mb-8 rounded-xl bg-white p-6 shadow-lg">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
                            <button
                                onClick={() => {
                                    setShowForm(false);
                                    reset();
                                }}
                                className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {doctor && (
                            <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <div className="flex items-center">
                                    <svg className="mr-2 h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <div>
                                        <p className="font-medium text-blue-900">Selected Doctor: {doctor.name}</p>
                                        <p className="text-sm text-blue-700">{doctor.specialization}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Doctor Selection */}
                            <div>
                                <label htmlFor="doctor_id" className="mb-2 block text-sm font-medium text-gray-700">
                                    Select Doctor <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="doctor_id"
                                    value={data.doctor_id}
                                    onChange={(e) => setData('doctor_id', e.target.value)}
                                    disabled={!!doctor}
                                    className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                        errors.doctor_id ? 'border-red-300' : 'border-gray-300'
                                    } ${doctor ? 'cursor-not-allowed bg-gray-100' : ''}`}
                                    required
                                >
                                    <option value="">Choose a doctor...</option>
                                    {doctors.map((doc) => (
                                        <option key={doc.id} value={doc.id}>
                                            {doc.name} - {doc.specialization}
                                        </option>
                                    ))}
                                </select>
                                {errors.doctor_id && <p className="mt-1 text-sm text-red-600">{errors.doctor_id}</p>}
                            </div>

                            {/* Date and Time */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <label htmlFor="appointment_date" className="mb-2 block text-sm font-medium text-gray-700">
                                        Appointment Date <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        id="appointment_date"
                                        value={data.appointment_date}
                                        onChange={(e) => {
                                            setData('appointment_date', e.target.value);
                                            setSelectedDate(e.target.value);
                                        }}
                                        min={getMinDate()}
                                        max={getMaxDate()}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                            errors.appointment_date ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        required
                                    />
                                    {errors.appointment_date && <p className="mt-1 text-sm text-red-600">{errors.appointment_date}</p>}
                                </div>

                                <div>
                                    <label htmlFor="appointment_time" className="mb-2 block text-sm font-medium text-gray-700">
                                        Appointment Time <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="appointment_time"
                                        value={data.appointment_time}
                                        onChange={(e) => setData('appointment_time', e.target.value)}
                                        className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                            errors.appointment_time ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        required
                                    >
                                        <option value="">Select time...</option>
                                        {timeSlots.map((time) => (
                                            <option key={time} value={time}>
                                                {new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
                                                    hour: 'numeric',
                                                    minute: '2-digit',
                                                    hour12: true,
                                                })}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.appointment_time && <p className="mt-1 text-sm text-red-600">{errors.appointment_time}</p>}
                                </div>
                            </div>

                            {/* Reason */}
                            <div>
                                <label htmlFor="reason" className="mb-2 block text-sm font-medium text-gray-700">
                                    Reason for Visit
                                </label>
                                <textarea
                                    id="reason"
                                    value={data.reason}
                                    onChange={(e) => setData('reason', e.target.value)}
                                    rows={3}
                                    placeholder="Briefly describe the reason for your appointment..."
                                    className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                        errors.reason ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.reason && <p className="mt-1 text-sm text-red-600">{errors.reason}</p>}
                            </div>

                            {/* Notes */}
                            <div>
                                <label htmlFor="notes" className="mb-2 block text-sm font-medium text-gray-700">
                                    Additional Notes (Optional)
                                </label>
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    rows={3}
                                    placeholder="Any additional information you'd like to share..."
                                    className={`w-full rounded-lg border px-4 py-3 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                                        errors.notes ? 'border-red-300' : 'border-gray-300'
                                    }`}
                                />
                                {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes}</p>}
                            </div>

                            {/* Form Actions */}
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {processing ? 'Booking...' : 'Book Appointment'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        reset();
                                    }}
                                    className="rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Appointments List */}
                <div className="rounded-xl bg-white p-6 shadow-lg">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">Your Appointments</h2>

                    {appointments.length > 0 ? (
                        <div className="space-y-4">
                            {appointments.map((appointment) => (
                                <div key={appointment.id} className="rounded-lg border border-gray-200 p-6 transition-all hover:shadow-md">
                                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center gap-3">
                                                <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor_name}</h3>
                                                {getStatusBadge(appointment.status)}
                                            </div>
                                            <p className="mb-1 text-sm text-gray-600">{appointment.specialization}</p>
                                            <div className="flex items-center gap-4 text-sm text-gray-600">
                                                <div className="flex items-center">
                                                    <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    {appointment.appointment_date_formatted}
                                                </div>
                                            </div>
                                            {appointment.reason && (
                                                <p className="mt-2 text-sm text-gray-700">
                                                    <span className="font-medium">Reason:</span> {appointment.reason}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="py-12 text-center">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Book your first appointment to get started.</p>
                            {!showForm && (
                                <div className="mt-6">
                                    <button
                                        onClick={() => setShowForm(true)}
                                        className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700"
                                    >
                                        Book Appointment
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </UserLayout>
    );
}
