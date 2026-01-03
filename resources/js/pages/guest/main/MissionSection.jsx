export default function MissionSection() {
    return (
        <section className="bg-gradient-to-br from-gray-50 via-white to-green-50 py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mb-16 text-center lg:px-52">
                    <div
                        className="mb-4 inline-block bg-gradient-to-r from-green-600 to-green-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 93% 51%, 100% 100%, 0 100%, 5% 50%)' }}
                    >
                        Our Mission & Vision
                    </div>
                </div>
                <div className="mb-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <div className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-600/5 to-green-700/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative p-8">
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-green-700">
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
                        </div>
                    </div>
                    <div className="group relative overflow-hidden rounded-3xl bg-white transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-green-600/5 to-green-700/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                        <div className="relative p-8">
                            <div className="mb-6 flex items-center space-x-4">
                                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-green-600 to-green-700">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                        </div>
                        <p className="mb-6 text-lg leading-relaxed text-gray-600">
                            To lead in digital innovation for equitable access to reproductive health and family planning services across South Sudan
                            and East Africa.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
