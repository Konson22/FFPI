import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';

export default function ReportsPage() {
    return (
        <div>
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-green-500 via-green-600 to-green-700 py-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-green-600/20 to-green-700/20"></div>
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
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            Research & Reports
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-4 text-3xl font-extrabold text-white drop-shadow-2xl sm:text-4xl lg:text-6xl">
                            SRHR Research
                            <span className="block bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
                                & Reports
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white drop-shadow-lg sm:text-lg font-medium">
                            Access comprehensive research, data insights, and reports on sexual and reproductive health and rights. Stay informed with
                            evidence-based information that drives positive change.
                        </p>

                        {/* Call to Action */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="#latest-reports"
                                className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-green-700 transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-xl"
                            >
                                <span className="relative z-10 flex items-center justify-center">
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                    View Latest Reports
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 transition-opacity group-hover:opacity-100"></div>
                            </a>
                            <a
                                href="#research-areas"
                                className="group rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-110 shadow-xl"
                            >
                                <span className="flex items-center justify-center">
                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    Explore Research
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Latest Reports Section */}
            <section id="latest-reports" className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <span className="mr-2">📊</span>
                            Latest Reports
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Recent Research Publications</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Stay updated with our latest research findings and comprehensive reports on SRHR topics
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Report 1 */}
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">2024</span>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Digital Health Access in Rural Communities</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">
                                A comprehensive study on the impact of digital health platforms on SRHR access in underserved rural areas across South
                                Sudan.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Published: March 2024</span>
                                <a href="#" className="text-sm font-semibold text-green-600 transition-colors hover:text-green-800">
                                    Read Report →
                                </a>
                            </div>
                        </div>

                        {/* Report 2 */}
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-500 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800">2024</span>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Youth SRHR Education Impact Assessment</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">
                                Evaluating the effectiveness of our youth-focused SRHR education programs and their long-term impact on reproductive
                                health outcomes.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Published: February 2024</span>
                                <a href="#" className="text-sm font-semibold text-green-600 transition-colors hover:text-green-800">
                                    Read Report →
                                </a>
                            </div>
                        </div>

                        {/* Report 3 */}
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="mb-4">
                                <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">2023</span>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Community Health Worker Training Outcomes</h3>
                            <p className="mb-4 text-sm text-gray-600 sm:text-base">
                                Analysis of community health worker training programs and their effectiveness in improving SRHR service delivery in
                                local communities.
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">Published: December 2023</span>
                                <a href="#" className="text-sm font-semibold text-green-600 transition-colors hover:text-green-800">
                                    Read Report →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Areas Section */}
            <section id="research-areas" className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <span className="mr-2">🔬</span>
                            Research Focus Areas
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Our Research Focus</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            We conduct research across multiple areas to advance SRHR knowledge and improve health outcomes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Adolescent Health</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Research on sexual and reproductive health needs, education, and service access for adolescents and young people.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-500 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Family Planning</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Studies on contraceptive access, family planning decision-making, and reproductive health service utilization.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Maternal Health</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Research on pregnancy outcomes, maternal mortality, and access to quality maternal health services.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Digital Health</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Evaluation of digital health interventions, mobile health applications, and telemedicine in SRHR service delivery.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Community Health</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Studies on community-based health interventions, community health worker programs, and health system strengthening.
                            </p>
                        </div>

                        <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:border-gray-300 sm:p-8">
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 transition-colors group-hover:bg-green-100 sm:h-12 sm:w-12">
                                <svg className="h-5 w-5 text-green-600 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-4 text-lg font-bold text-gray-900 sm:text-xl">Gender & Rights</h3>
                            <p className="text-sm text-gray-600 sm:text-base">
                                Research on gender equality, reproductive rights, gender-based violence, and women's empowerment in health contexts.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Data & Statistics Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            <span className="mr-2">📈</span>
                            Key Statistics
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Impact by Numbers</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Our research and programs have made measurable impact in improving SRHR outcomes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
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
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <div className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">85%</div>
                            <div className="text-sm text-gray-600 sm:text-base">Program Completion Rate</div>
                        </div>

                        <div className="text-center">
                            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-50 sm:h-20 sm:w-20">
                                <svg className="h-8 w-8 text-green-600 sm:h-10 sm:w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
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
                                        strokeWidth={2}
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
            <section className="bg-gradient-to-r from-green-600 to-green-700 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">Stay Updated with Our Research</h2>
                        <p className="mb-8 text-lg text-white/90 sm:text-xl">
                            Subscribe to receive the latest research findings, reports, and insights directly to your inbox.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-green-700 transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-xl"
                            >
                                Subscribe to Updates
                            </a>
                            <a
                                href="/learn/srhr"
                                className="inline-flex items-center rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-105"
                            >
                                Learn More About SRHR
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
