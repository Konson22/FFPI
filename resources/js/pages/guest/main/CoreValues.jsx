export default function CoreValues() {
    return (
        <div className="mb-16">
            <div className="mb-12 text-center">
                <h3 className="mb-4 text-3xl font-bold text-gray-900">Our Core Values</h3>
                <p className="mx-auto max-w-3xl text-lg text-gray-600">
                    At FFPI, our actions and decisions are guided by a set of core values that define who we are and how we operate. Our commitment to
                    these values sets the foundation for a culture of excellence and innovation.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Inclusivity */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-pink-500 to-rose-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Inclusivity</h4>
                        </div>
                        <p className="text-gray-600">
                            We believe in reaching everyone—regardless of age, gender, ability, or background—with equitable access to information and
                            services.
                        </p>
                    </div>
                </div>

                {/* Youth Empowerment */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Youth Empowerment</h4>
                        </div>
                        <p className="text-gray-600">
                            We value the leadership, creativity, and resilience of young people. We create spaces for youth voices to lead the SRHR
                            movement.
                        </p>
                    </div>
                </div>

                {/* Innovation */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Innovation</h4>
                        </div>
                        <p className="text-gray-600">
                            We harness the power of digital technology and forward-thinking ideas to revolutionize access to family planning and
                            reproductive health.
                        </p>
                    </div>
                </div>

                {/* Evidence-Based Action */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-green-500 to-emerald-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Evidence-Based Action</h4>
                        </div>
                        <p className="text-gray-600">
                            Our work is rooted in research, data, and community-driven insights. We listen, learn, and adapt to ensure impact.
                        </p>
                    </div>
                </div>

                {/* Community Engagement */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-red-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    ></path>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Community Engagement</h4>
                        </div>
                        <p className="text-gray-600">
                            We work hand-in-hand with communities, healthcare providers, and local leaders to deliver culturally relevant and
                            sustainable solutions.
                        </p>
                    </div>
                </div>

                {/* Respect and Dignity */}
                <div className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="p-6">
                        <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-teal-500 to-green-600">
                                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    ></path>
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">Respect and Dignity</h4>
                        </div>
                        <p className="text-gray-600">
                            We treat every individual with compassion, upholding human rights and bodily autonomy at all levels of our work.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
