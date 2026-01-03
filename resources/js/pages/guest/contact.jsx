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

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50/30">
            <Head title="Contact Us - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 py-20 sm:py-28">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-white/10 blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-2xl"></div>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            We're Here to Help
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-6 text-4xl font-extrabold text-white drop-shadow-2xl sm:text-5xl lg:text-6xl">
                            Let's Start a Conversation
                            <span className="mt-2 block bg-gradient-to-r from-white via-emerald-50 to-teal-50 bg-clip-text text-transparent">
                                Get in Touch Today
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
                            Have questions about our programs? Need support? Want to partner with us? We're here to help you on your health journey.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Methods Section */}
            <section className="relative z-20 -mt-12 pb-16 sm:pb-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
                        {/* Email Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative">
                                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Email Us</h3>
                                <p className="mb-4 text-sm text-gray-600">We respond within 24 hours</p>
                                <a
                                    href="mailto:info@ffpi-ss.org"
                                    className="inline-flex items-center text-base font-semibold text-blue-600 transition-colors hover:text-blue-700"
                                >
                                    info@ffpi-ss.org
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Phone Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative">
                                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Call Us</h3>
                                <p className="mb-4 text-sm text-gray-600">Mon-Fri 9AM-6PM EST</p>
                                <a
                                    href="tel:+211922618621"
                                    className="inline-flex items-center text-base font-semibold text-green-600 transition-colors hover:text-green-700"
                                >
                                    +211 922 618 621
                                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative">
                                <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Visit Us</h3>
                                <p className="mb-4 text-sm text-gray-600">Come say hello</p>
                                <p className="text-base font-semibold text-gray-700">Hai Thongpiny, Juba – South Sudan</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
                        {/* Left Side - Form */}
                        <div className="lg:col-span-3">
                            <div className="rounded-3xl bg-white p-8 shadow-2xl sm:p-10">
                                <div className="mb-8">
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Send us a message</h2>
                                    <p className="text-lg text-gray-600">
                                        Fill out the form below and we'll get back to you as soon as possible. We typically respond within 24 hours.
                                    </p>
                                </div>

                                {/* Success Message */}
                                {submitStatus === 'success' && (
                                    <div className="mb-6 rounded-xl border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 p-5 shadow-lg">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500">
                                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold text-green-900">Message sent successfully!</h3>
                                                <p className="mt-1 text-sm text-green-700">
                                                    We've received your message and will get back to you within 24 hours.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Error Message */}
                                {submitStatus === 'error' && (
                                    <div className="mb-6 rounded-xl border-2 border-red-200 bg-gradient-to-r from-red-50 to-pink-50 p-5 shadow-lg">
                                        <div className="flex items-start">
                                            <div className="flex-shrink-0">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500">
                                                    <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="ml-4">
                                                <h3 className="text-lg font-semibold text-red-900">Failed to send message</h3>
                                                <p className="mt-1 text-sm text-red-700">
                                                    Please try again later or contact us directly via email or phone.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="group">
                                            <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                                                Full Name <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="John Doe"
                                                required
                                            />
                                        </div>

                                        <div className="group">
                                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                                Email Address <span className="text-red-500">*</span>
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="group">
                                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 focus:outline-none"
                                                placeholder="+211 922 618 621"
                                            />
                                        </div>

                                        <div className="group">
                                            <label htmlFor="subject" className="mb-2 block text-sm font-semibold text-gray-700">
                                                Subject <span className="text-red-500">*</span>
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 focus:outline-none"
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

                                    <div className="group">
                                        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Message <span className="text-red-500">*</span>
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full resize-none rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 text-base transition-all duration-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-500/20 focus:outline-none"
                                            placeholder="Tell us how we can help you..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-green-700 hover:to-emerald-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                                    >
                                        <span className="relative z-10 flex items-center justify-center">
                                            {isSubmitting ? (
                                                <>
                                                    <svg className="mr-3 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                                        <circle
                                                            className="opacity-25"
                                                            cx="12"
                                                            cy="12"
                                                            r="10"
                                                            stroke="currentColor"
                                                            strokeWidth="4"
                                                        ></circle>
                                                        <path
                                                            className="opacity-75"
                                                            fill="currentColor"
                                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                        ></path>
                                                    </svg>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <svg
                                                        className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                                        />
                                                    </svg>
                                                </>
                                            )}
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-700 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Right Side - Info Cards */}
                        <div className="space-y-6 lg:col-span-2">
                            {/* Why Contact Us */}
                            <div className="rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 p-8 shadow-xl">
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Why Contact Us?</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-md">
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
                                            <h4 className="mb-1 text-lg font-bold text-gray-900">Get Information</h4>
                                            <p className="text-sm text-gray-600">
                                                Learn about our programs, services, and how we can support your health journey.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-md">
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
                                            <h4 className="mb-1 text-lg font-bold text-gray-900">Get Support</h4>
                                            <p className="text-sm text-gray-600">
                                                Access confidential support and guidance from our trained professionals.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-white text-green-600 shadow-md">
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
                                            <h4 className="mb-1 text-lg font-bold text-gray-900">Join Our Community</h4>
                                            <p className="text-sm text-gray-600">
                                                Become part of our growing community of health advocates and changemakers.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Social Media */}
                            <div className="rounded-3xl bg-white p-8 shadow-xl">
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Follow Us</h3>
                                <p className="mb-6 text-sm text-gray-600">Stay connected with us on social media for updates and news.</p>
                                <div className="flex flex-wrap gap-4">
                                    <a
                                        href="#"
                                        className="group flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="group flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="group flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-blue-800 text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
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
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <span className="mr-2">❓</span>
                            Common Questions
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                        <p className="mx-auto max-w-3xl text-lg text-gray-600 sm:text-xl">
                            Find answers to the most common questions about FFPI programs and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:border-green-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-gray-900">How can I join FFPI programs?</h3>
                            <p className="text-gray-600">
                                You can join our programs by contacting us directly or participating in our community outreach initiatives. We offer
                                various entry points for different age groups and interests.
                            </p>
                        </div>

                        <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:border-green-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Is my information confidential?</h3>
                            <p className="text-gray-600">
                                Yes, we maintain strict confidentiality and privacy standards. All personal information and health data shared with
                                FFPI is protected and never shared without explicit consent.
                            </p>
                        </div>

                        <div className="group rounded-2xl border-2 border-gray-100 bg-white p-8 transition-all duration-300 hover:border-green-300 hover:shadow-xl">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 text-green-600 transition-transform duration-300 group-hover:scale-110">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Can I access healthcare professionals?</h3>
                            <p className="text-gray-600">
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
