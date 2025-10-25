export default function PurposeSection() {
    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-blue-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-16 text-center lg:px-52">
                    <div className="mb-4 inline-flex items-center rounded-full bg-gradient-to-r from-blue-500/10 to-teal-500/10 px-4 py-2 text-sm font-medium text-blue-600">
                        <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                        Our Purpose & Mission
                    </div>
                    <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                        Empowering Communities Through
                        <span className="block bg-gradient-to-r from-blue-500 via-teal-500 to-green-600 bg-clip-text text-transparent">
                            Digital SRHR Access
                        </span>
                    </h2>
                    <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                        We believe that informed reproductive choices are key to equity, dignity, and sustainable development. Our mission is to
                        transform sexual and reproductive health access through digital innovation.
                    </p>
                </div>

                {/* Mission & Vision Cards */}
                <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Mission Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-teal-500/5 to-green-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative p-8">
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-teal-600">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                            </div>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600">
                                To empower young people, women, and underserved communities with inclusive, tech-enabled reproductive health solutions
                                through awareness, innovation, and collaboration.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-blue-500"></div>
                                    <p className="text-gray-600">
                                        Expand access to sexual and reproductive health education and services through digital platforms
                                    </p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-teal-500"></div>
                                    <p className="text-gray-600">Build capacity of healthcare providers and community champions</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-green-500"></div>
                                    <p className="text-gray-600">Promote data-driven advocacy and policy engagement</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-red-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative p-8">
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        ></path>
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                            </div>
                            <p className="mb-6 text-lg leading-relaxed text-gray-600">
                                To lead in digital innovation for equitable access to reproductive health and family planning services across South
                                Sudan and East Africa.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-purple-500"></div>
                                    <p className="text-gray-600">Foster youth-led innovation in health and social behavior change</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-pink-500"></div>
                                    <p className="text-gray-600">Strengthen partnerships with government, civil society, and donors</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-2 h-2 w-2 rounded-full bg-red-500"></div>
                                    <p className="text-gray-600">Create sustainable, scalable solutions for reproductive health access</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
