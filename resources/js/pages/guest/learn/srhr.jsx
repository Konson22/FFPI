import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';

export default function SRHRPage() {
    return (
        <div>
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-50 via-teal-50 to-green-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                            Sexual and Reproductive Health and Rights
                        </h1>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                            Understanding SRHR is fundamental to making informed decisions about your reproductive health, family planning, and
                            overall well-being.
                        </p>
                    </div>
                </div>
            </section>

            {/* What is SRHR Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">What is SRHR?</h2>
                            <p className="mt-6 text-lg text-gray-600">
                                Sexual and Reproductive Health and Rights (SRHR) encompasses the fundamental human rights related to sexuality and
                                reproduction. It includes the right to make informed decisions about your body, relationships, and family planning.
                            </p>
                            <p className="mt-4 text-lg text-gray-600">
                                SRHR is not just about physical health—it's about dignity, equality, and the freedom to make choices that affect your
                                life and future.
                            </p>
                        </div>
                        <div className="rounded-lg bg-gradient-to-br from-blue-100 to-teal-100 p-8">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Key Components</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <svg className="mt-0.5 mr-3 h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Access to comprehensive sexual and reproductive health services</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mt-0.5 mr-3 h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Right to make informed decisions about reproduction</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mt-0.5 mr-3 h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Freedom from discrimination and violence</span>
                                </li>
                                <li className="flex items-start">
                                    <svg className="mt-0.5 mr-3 h-6 w-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                    <span className="text-gray-700">Access to accurate information and education</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why SRHR Matters Section */}
            <section className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Why SRHR Matters</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            SRHR is essential for individual well-being, gender equality, and sustainable development
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                    <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Individual Health</h3>
                            <p className="text-gray-600">
                                Access to SRHR services improves physical and mental health outcomes for individuals and families.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Gender Equality</h3>
                            <p className="text-gray-600">
                                SRHR empowers women and girls to make informed choices, promoting gender equality and social justice.
                            </p>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow-sm">
                            <div className="mb-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                    <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Economic Development</h3>
                            <p className="text-gray-600">
                                When women can plan their families, they can pursue education and careers, boosting economic growth.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SRHR Services Section */}
            <section className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">SRHR Services We Provide</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Our platform offers comprehensive SRHR services to support your reproductive health journey
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Family Planning Counseling</h3>
                            <p className="mb-4 text-gray-600">
                                Professional guidance on contraceptive methods, fertility awareness, and family planning options tailored to your
                                needs and circumstances.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Contraceptive method selection and education</li>
                                <li>• Fertility awareness and natural family planning</li>
                                <li>• Preconception counseling and planning</li>
                                <li>• Postpartum family planning support</li>
                            </ul>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Health Education</h3>
                            <p className="mb-4 text-gray-600">
                                Comprehensive education on sexual and reproductive health topics to help you make informed decisions.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Menstrual health and cycle tracking</li>
                                <li>• STI prevention and awareness</li>
                                <li>• Pregnancy and childbirth education</li>
                                <li>• Menopause and aging health</li>
                            </ul>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Expert Consultations</h3>
                            <p className="mb-4 text-gray-600">
                                One-on-one consultations with certified healthcare professionals specializing in reproductive health.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Gynecological consultations</li>
                                <li>• Fertility assessments and treatments</li>
                                <li>• Sexual health counseling</li>
                                <li>• Mental health support</li>
                            </ul>
                        </div>

                        <div className="rounded-lg border border-gray-200 p-6">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Community Support</h3>
                            <p className="mb-4 text-gray-600">
                                Connect with others on similar journeys and access peer support in a safe, confidential environment.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li>• Support groups and forums</li>
                                <li>• Peer mentoring programs</li>
                                <li>• Success story sharing</li>
                                <li>• Anonymous Q&A sessions</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white">Ready to Take Control of Your Reproductive Health?</h2>
                        <p className="mb-8 text-xl text-blue-100">
                            Join thousands of women who are making informed decisions about their SRHR with our platform.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href={route('register')}
                                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Get Started Today
                            </a>
                            <a
                                href={route('contact')}
                                className="inline-flex items-center rounded-full border-2 border-white/20 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
