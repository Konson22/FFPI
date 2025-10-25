import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';

export default function AboutPage() {
    return (
        <div>
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
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            About FFPI
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            About Future Family
                            <span className="block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                                Planning Initiative
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                            We are a dedicated organization committed to improving sexual and reproductive health and rights (SRHR) through innovative
                            digital solutions, community engagement, and evidence-based programs.
                        </p>

                        {/* Call to Action */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="#our-mission"
                                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    Our Mission
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </a>
                            <a
                                href="#our-team"
                                className="group rounded-full border-2 border-white/20 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Meet Our Team
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section id="our-mission" className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">🎯</span>
                            Our Mission
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Empowering Communities Through SRHR</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            We are committed to advancing sexual and reproductive health and rights through innovative solutions and community
                            engagement.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Vision</h3>
                            <p className="mb-6 text-lg text-gray-600">
                                A world where every individual has access to comprehensive sexual and reproductive health services, education, and
                                support, regardless of their background or circumstances.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                    <p className="text-gray-600">Universal access to SRHR services and information</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-teal-500"></div>
                                    <p className="text-gray-600">Empowered communities making informed health decisions</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                                    <p className="text-gray-600">Gender equality and reproductive rights for all</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-blue-50 to-teal-50 p-8">
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">Our Mission</h3>
                            <p className="mb-6 text-lg text-gray-600">
                                To empower young people, women, and underserved communities with inclusive, tech-enabled reproductive health solutions
                                through awareness, innovation, and collaboration.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Community Engagement</h4>
                                        <p className="text-sm text-gray-600">Building strong, supportive communities</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-100">
                                        <svg className="h-5 w-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Innovation</h4>
                                        <p className="text-sm text-gray-600">Leveraging technology for better health outcomes</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                        <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900">Evidence-Based</h4>
                                        <p className="text-sm text-gray-600">Using research and data to drive impact</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Team Section */}
            <section id="our-team" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">👥</span>
                            Our Team
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Meet Our Leadership Team</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Dedicated professionals working together to advance sexual and reproductive health and rights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-teal-100">
                                    <svg className="h-12 w-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Dr. Sarah Johnson</h3>
                                <p className="mb-4 text-sm font-semibold text-blue-600">Chief Medical Officer</p>
                                <p className="text-sm text-gray-600">
                                    Board-certified gynecologist with 15+ years of experience in reproductive health and women's rights advocacy.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-100 to-teal-100">
                                    <svg className="h-12 w-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Dr. Michael Chen</h3>
                                <p className="mb-4 text-sm font-semibold text-green-600">Head of Technology</p>
                                <p className="text-sm text-gray-600">
                                    Technology leader focused on creating accessible health solutions and digital innovation for underserved
                                    communities.
                                </p>
                            </div>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-6 text-center">
                                <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-pink-100">
                                    <svg className="h-12 w-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="mb-2 text-xl font-bold text-gray-900">Dr. Emily Rodriguez</h3>
                                <p className="mb-4 text-sm font-semibold text-purple-600">Community Director</p>
                                <p className="text-sm text-gray-600">
                                    Passionate about creating supportive communities for women's health and advancing reproductive rights.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Impact Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">📊</span>
                            Our Impact
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Making a Difference</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Our programs and initiatives have created meaningful impact in communities across South Sudan
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-blue-500 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">15,000+</div>
                            <div className="text-sm text-gray-600 sm:text-base">Youth Reached</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-green-500 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">85%</div>
                            <div className="text-sm text-gray-600 sm:text-base">Program Success Rate</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-purple-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-purple-500 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">50+</div>
                            <div className="text-sm text-gray-600 sm:text-base">Research Publications</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-orange-500 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">25</div>
                            <div className="text-sm text-gray-600 sm:text-base">Partner Organizations</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Join Us in Our Mission</h2>
                        <p className="mb-8 text-lg text-blue-100 sm:text-xl">
                            Together, we can create a world where everyone has access to comprehensive sexual and reproductive health services.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Get Involved
                            </a>
                            <a
                                href="/reports"
                                className="inline-flex items-center rounded-full border-2 border-white/20 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                            >
                                View Our Research
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
