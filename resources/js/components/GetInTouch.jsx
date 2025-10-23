import { useState } from 'react';

export default function GetInTouch({
    variant = 'default', // 'default', 'minimal', 'detailed'
    showForm = false,
    contactInfo = {
        email: 'futurefamilyplanning@gmail.com',
        phone: '+211 922618621',
        address: 'Hai Thongpiny, Juba, South Sudan',
    },
}) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        message: '',
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
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
            value: contactInfo.email,
            description: 'We respond within 24 hours',
            action: `mailto:${contactInfo.email}`,
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
            value: contactInfo.phone,
            description: 'Mon-Fri 9AM-6PM EST',
            action: `tel:${contactInfo.phone}`,
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
            value: contactInfo.address,
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

    if (variant === 'minimal') {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            <span className="mr-2">💬</span>
                            Contact Us
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Get in Touch</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Ready to join us in transforming reproductive health access? We'd love to hear from you.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="mb-8">
                                <h3 className="mb-4 text-2xl font-bold text-gray-900">Send us a message</h3>
                                <p className="text-gray-600">Have a question or need support? We're here to help you on your health journey.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                        placeholder="your.email@example.com"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                        placeholder="Tell us how we can help you..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h3>
                                <p className="text-gray-600">
                                    We're here to help you on your health journey. Reach out to us through any of these channels.
                                </p>
                            </div>

                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.action}
                                    className="group flex items-start rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                >
                                    <div
                                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getColorClasses(method.color)} transition-all duration-300 group-hover:scale-110`}
                                    >
                                        {method.icon}
                                    </div>
                                    <div className="ml-6">
                                        <h4 className="text-xl font-bold text-gray-900">{method.title}</h4>
                                        <p className="text-lg font-medium text-gray-700">{method.value}</p>
                                        <p className="text-sm text-gray-500">{method.description}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'detailed') {
        return (
            <div className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        {/* Contact Form */}
                        {showForm && (
                            <div>
                                <div className="mb-8">
                                    <h2 className="mb-4 text-3xl font-bold text-gray-900">Send us a message</h2>
                                    <p className="text-lg text-gray-600">
                                        Have a question or need support? We're here to help you on your health journey.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Full Name
                                        </label>
                                        <input
                                            type="text"
                                            id="fullName"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            placeholder="Your full name"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Email Address
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            placeholder="your.email@example.com"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                            Message
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            rows={6}
                                            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                            placeholder="Tell us how we can help you..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                                    >
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* Contact Information */}
                        <div>
                            <div className="mb-8">
                                <h2 className="mb-4 text-3xl font-bold text-gray-900">Get in touch</h2>
                                <p className="text-lg text-gray-600">
                                    We're here to help you on your health journey. Reach out to us through any of these channels.
                                </p>
                            </div>

                            <div className="space-y-8">
                                {contactMethods.map((method, index) => (
                                    <a
                                        key={index}
                                        href={method.action}
                                        className="group flex items-start rounded-2xl bg-gradient-to-r from-gray-50 to-green-50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                    >
                                        <div
                                            className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getColorClasses(method.color)} transition-all duration-300 group-hover:scale-110`}
                                        >
                                            {method.icon}
                                        </div>
                                        <div className="ml-6">
                                            <h3 className="mb-2 text-xl font-bold text-gray-900">{method.title}</h3>
                                            <p className="mb-1 text-lg font-medium text-gray-700">{method.value}</p>
                                            <p className="text-sm text-gray-500">{method.description}</p>
                                        </div>
                                    </a>
                                ))}
                            </div>

                            {/* Social Media Links */}
                            <div className="mt-12">
                                <h3 className="mb-6 text-xl font-bold text-gray-900">Follow Us</h3>
                                <div className="flex space-x-4">
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-200"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-200"
                                    >
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                        </svg>
                                    </a>
                                    <a
                                        href="#"
                                        className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition-all duration-300 hover:scale-110 hover:bg-blue-200"
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
            </div>
        );
    }

    // Default variant
    return (
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                        <span className="mr-2">💬</span>
                        Contact Us
                    </div>
                    <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Get in Touch</h2>
                    <p className="mx-auto max-w-3xl text-xl text-gray-600">
                        Ready to join us in transforming reproductive health access? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Form */}
                    <div className="rounded-2xl bg-white p-8 shadow-lg">
                        <div className="mb-8">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">Send us a message</h3>
                            <p className="text-gray-600">Have a question or need support? We're here to help you on your health journey.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="fullName" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    placeholder="Your full name"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    placeholder="your.email@example.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="mb-2 block text-sm font-semibold text-gray-700">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    placeholder="Tell us how we can help you..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    {/* Contact Information */}
                    <div className="space-y-8">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Contact Information</h3>
                            <p className="text-gray-600">
                                We're here to help you on your health journey. Reach out to us through any of these channels.
                            </p>
                        </div>

                        {contactMethods.map((method, index) => (
                            <a
                                key={index}
                                href={method.action}
                                className="group flex items-start rounded-2xl bg-white p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <div
                                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getColorClasses(method.color)} transition-all duration-300 group-hover:scale-110`}
                                >
                                    {method.icon}
                                </div>
                                <div className="ml-6">
                                    <h4 className="text-xl font-bold text-gray-900">{method.title}</h4>
                                    <p className="text-lg font-medium text-gray-700">{method.value}</p>
                                    <p className="text-sm text-gray-500">{method.description}</p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
