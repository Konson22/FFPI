import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: '',
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters long';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        // Simulate API call - replace with actual contact form submission
        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsSubmitted(true);
            setFormData({
                name: '',
                email: '',
                message: '',
            });
        } catch (error) {
            console.error('Contact form submission failed:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = {
        email: 'futurefamilyplanning@gmail.com',
        phone: '+211 922 618 621',
        location: 'Hai Thongpiny, Juba – South Sudan',
    };

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">We're here to help you on your health journey.</p>
                </div>

                <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-8">
                        <div className="mb-6">
                            <h3 className="mb-2 text-2xl font-bold text-gray-900">Send us a message</h3>
                            <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
                        </div>

                        {isSubmitted ? (
                            <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                                    <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h4 className="mb-2 text-2xl font-bold text-green-800">Message Sent Successfully!</h4>
                                <p className="mb-4 text-green-600">Thank you for contacting us. We'll get back to you soon.</p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
                                >
                                    Send Another Message
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-green-500/20 ${
                                            errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                        }`}
                                        placeholder="Your name"
                                        disabled={isSubmitting}
                                    />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-green-500/20 ${
                                            errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                        }`}
                                        placeholder="your.email@example.com"
                                        disabled={isSubmitting}
                                    />
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                                        rows={5}
                                        className={`w-full resize-none rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-green-500/20 ${
                                            errors.message ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-green-500'
                                        }`}
                                        placeholder="How can we help you?"
                                        disabled={isSubmitting}
                                    ></textarea>
                                    {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Sending...' : 'Send Message'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Get in Touch</h3>
                            <p className="text-gray-600">Reach out to us through any of these channels and we'll get back to you promptly.</p>
                        </div>

                        <div className="space-y-4">
                            {/* Email */}
                            <div className="flex items-start space-x-4 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-1 text-lg font-semibold text-gray-900">Email</h4>
                                    <a href={`mailto:${contactInfo.email}`} className="text-green-600 transition-colors hover:text-green-800">
                                        {contactInfo.email}
                                    </a>
                                    <p className="mt-1 text-sm text-gray-500">We'll respond within 24 hours</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-start space-x-4 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                        />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-1 text-lg font-semibold text-gray-900">Phone</h4>
                                    <a href={`tel:${contactInfo.phone}`} className="text-green-600 transition-colors hover:text-green-800">
                                        {contactInfo.phone}
                                    </a>
                                    <p className="mt-1 text-sm text-gray-500">Available Monday to Friday, 9 AM - 5 PM</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-start space-x-4 p-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                        />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="mb-1 text-lg font-semibold text-gray-900">Location</h4>
                                    <p className="text-gray-600">{contactInfo.location}</p>
                                    <p className="mt-1 text-sm text-gray-500">Visit us at our main office</p>
                                </div>
                            </div>
                        </div>

                        {/* Social Media Links */}
                        <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-6">
                            <h4 className="mb-4 text-lg font-semibold text-gray-900">Follow Us</h4>
                            <div className="flex space-x-4">
                                <a
                                    href="#"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-600 text-white transition-all hover:scale-105 hover:bg-green-700"
                                >
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-white transition-all hover:scale-105 hover:bg-green-800"
                                >
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a
                                    href="#"
                                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-800 text-white transition-all hover:scale-105 hover:bg-green-900"
                                >
                                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
