import GetInTouch from '@/components/GetInTouch';
import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';

export default function GuestContact() {
    // FFPI Contact Information from the organizational profile
    const contactInfo = {
        email: 'futurefamilyplanning@gmail.com',
        phone: '+211 922 618 621',
        location: 'Hai Thongpiny, Juba – South Sudan',
        website: 'Coming Soon',
    };

    return (
        <div className="min-h-screen bg-white">
            <Head title="Contact Us - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600"></div>
                <div className="absolute inset-0 bg-black/20"></div>

                {/* Floating Elements */}
                <div className="absolute top-16 left-16 h-16 w-16 animate-pulse rounded-full bg-white/10"></div>
                <div className="absolute top-32 right-24 h-12 w-12 animate-bounce rounded-full bg-emerald-300/20"></div>
                <div className="absolute bottom-24 left-1/3 h-10 w-10 animate-pulse rounded-full bg-teal-300/30"></div>
                <div className="absolute right-1/4 bottom-16 h-8 w-8 animate-bounce rounded-full bg-green-300/25"></div>

                {/* Contact Icons Pattern */}
                <div className="absolute top-1/3 right-16 flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-white/5">
                    <span className="text-3xl">💬</span>
                </div>
                <div className="absolute bottom-1/3 left-16 flex h-16 w-16 animate-bounce items-center justify-center rounded-full bg-emerald-300/10">
                    <span className="text-2xl">📧</span>
                </div>
                <div className="absolute top-1/2 left-1/4 flex h-14 w-14 animate-pulse items-center justify-center rounded-full bg-teal-300/15">
                    <span className="text-xl">📞</span>
                </div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full border border-white/30 bg-white/20 px-8 py-4 text-sm font-semibold text-white shadow-lg backdrop-blur-md">
                            <span className="mr-3 text-2xl">💬</span>
                            <span className="tracking-wide">We're Here to Help</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white drop-shadow-2xl">Contact</span>
                            <span className="block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent drop-shadow-2xl">
                                FFPI
                            </span>
                        </h1>

                        {/* Tagline */}
                        <div className="mb-10">
                            <p className="mb-4 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl lg:text-4xl">Get in Touch</p>
                            <p className="text-xl font-semibold text-emerald-100 drop-shadow-lg sm:text-2xl">We're Here to Help You</p>
                        </div>

                        {/* Description */}
                        <p className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-green-100 drop-shadow-md sm:text-xl">
                            Get in touch with our team for support, questions, or to learn more about our programs. We're here to help advance sexual
                            and reproductive health across South Sudan and East Africa.
                        </p>

                        {/* Contact Quick Info */}
                        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                                <div className="mb-3 text-3xl">📧</div>
                                <div className="mb-2 text-sm font-semibold text-emerald-100">Email</div>
                                <div className="text-sm font-medium text-white">futurefamilyplanning@gmail.com</div>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                                <div className="mb-3 text-3xl">📞</div>
                                <div className="mb-2 text-sm font-semibold text-emerald-100">Phone</div>
                                <div className="text-sm font-medium text-white">+211 922 618 621</div>
                            </div>
                            <div className="rounded-2xl border border-white/20 bg-white/10 p-6 text-center backdrop-blur-sm">
                                <div className="mb-3 text-3xl">📍</div>
                                <div className="mb-2 text-sm font-semibold text-emerald-100">Location</div>
                                <div className="text-sm font-medium text-white">Juba, South Sudan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section with Form */}
            <GetInTouch variant="detailed" showForm={true} contactInfo={contactInfo} />

            {/* FAQ Section */}
            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            <span className="mr-2">❓</span>
                            Common Questions
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Frequently Asked Questions</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Find answers to the most common questions about FFPI programs and services
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                        <div className="rounded-2xl bg-white p-8 shadow-lg">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            </div>

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
