import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestContact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setSubmitStatus('success');
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactMethods = [
        {
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
            ),
            title: 'Email Us',
            value: 'futurefamilyplanning@gmail.com',
            description: 'We respond within 24 hours',
            action: 'mailto:futurefamilyplanning@gmail.com',
            color: 'blue',
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                </svg>
            ),
            title: 'Call Us',
            value: '+211 922 618 621',
            description: 'Mon-Fri 9AM-6PM EST',
            action: 'tel:+211922618621',
            color: 'green',
        },
        {
            icon: (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            title: 'Visit Us',
            value: 'Hai Thongpiny, Juba – South Sudan',
            description: 'Come say hello',
            action: '#',
            color: 'purple',
        },
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: 'bg-blue-100 text-blue-600 group-hover:bg-blue-200',
            green: 'bg-green-100 text-green-600 group-hover:bg-green-200',
            purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-200',
        };
        return colors[color] || colors.blue;
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Contact Us - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-teal-500 to-green-600 py-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-teal-500/20 to-green-500/20"></div>
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"></div>
                <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Main Heading */}
                        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            Get in Touch with
                            <span className="block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                                FFPI Team
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Ready to transform reproductive health access? We're here to help you on your journey. Reach out to us for support,
                            questions, or to learn more about our programs.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Information Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Get in Touch</h2>
                        <p className="text-lg text-gray-600">Choose your preferred way to reach us</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8">
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-200 sm:h-16 sm:w-16">
                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">Email Us</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">We respond within 24 hours</p>
                            <a
                                href="mailto:futurefamilyplanning@gmail.com"
                                className="text-xs font-semibold break-all text-gray-700 transition-colors hover:text-gray-900 sm:text-sm"
                            >
                                futurefamilyplanning@gmail.com
                            </a>
                        </div>

                        <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8">
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-200 sm:h-16 sm:w-16">
                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">Call Us</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">Mon-Fri 9AM-6PM EST</p>
                            <a
                                href="tel:+211922618621"
                                className="text-xs font-semibold text-gray-700 transition-colors hover:text-gray-900 sm:text-sm"
                            >
                                +211 922 618 621
                            </a>
                        </div>

                        <div className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg sm:p-8">
                            <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-all duration-300 group-hover:scale-110 group-hover:bg-gray-200 sm:h-16 sm:w-16">
                                <svg className="h-6 w-6 sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-gray-900 sm:text-xl">Visit Us</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">Come say hello</p>
                            <p className="text-xs font-semibold text-gray-700 sm:text-sm">Hai Thongpiny, Juba – South Sudan</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Information Section */}
            <section id="contact-form" className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        {/* Contact Form */}
                        <div className="rounded-2xl bg-white p-6 shadow-lg sm:p-8">
                            <div className="mb-6 sm:mb-8">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Send us a message</h2>
                                <p className="text-base text-gray-600 sm:text-lg">
                                    Have a question or need support? We're here to help you on your health journey.
                                </p>
                            </div>

                            {submitStatus === 'success' && (
                                <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        <p className="font-medium text-green-800">Message sent successfully! We'll get back to you soon.</p>
                                    </div>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
                                    <div className="flex items-center">
                                        <svg className="mr-3 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        <p className="font-medium text-red-800">Failed to send message. Please try again.</p>
                                    </div>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div>
                                        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Email Address *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div>
                                        <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                            placeholder="+211 922 618 621"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Subject *
                                        </label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                            required
                                        >
                                            <option value="">Select a subject</option>
                                            <option value="general">General Inquiry</option>
                                            <option value="programs">Program Information</option>
                                            <option value="support">Technical Support</option>
                                            <option value="partnership">Partnership</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="sm:rows-6 w-full resize-none rounded-xl border border-gray-300 px-3 py-2 text-sm transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 sm:px-4 sm:py-3 sm:text-base"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:px-8 sm:py-4 sm:text-base"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        'Send Message'
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <div className="mb-8">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900">Why Contact Us?</h2>
                                <p className="text-lg text-gray-600">
                                    We're here to support your reproductive health journey. Whether you need information, support, or want to get
                                    involved, we're ready to help.
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Get Information</h3>
                                            <p className="text-gray-600">
                                                Learn about our programs, services, and how we can support your health journey.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Get Support</h3>
                                            <p className="text-gray-600">Access confidential support and guidance from our trained professionals.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
                                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Join Our Community</h3>
                                            <p className="text-gray-600">
                                                Become part of our growing community of health advocates and changemakers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-12">
                                <h3 className="mb-6 text-xl font-bold text-gray-900">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:text-gray-800"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:text-gray-800"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-600 transition-all duration-300 hover:scale-110 hover:bg-gray-200 hover:text-gray-800"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">❓</span>
                            Common Questions
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Frequently Asked Questions</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Find answers to the most common questions about FFPI programs and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-gray-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">How can I join FFPI programs?</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                You can join our programs by contacting us directly or participating in our community outreach initiatives. We offer
                                various entry points for different age groups and interests.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-gray-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Is my information confidential?</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Yes, we maintain strict confidentiality and privacy standards. All personal information and health data shared with
                                FFPI is protected and never shared without explicit consent.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 transition-colors group-hover:bg-gray-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-gray-500 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Can I access healthcare professionals?</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Yes, through our FamWell App and various programs, you can connect with certified healthcare experts and SRHR
                                specialists for consultations and guidance.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
