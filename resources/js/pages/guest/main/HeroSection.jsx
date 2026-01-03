import { Link, usePage } from '@inertiajs/react';

export default function HeroSection() {
    const { auth } = usePage().props;

    const handleAccessPlatform = () => {
        if (auth.user) {
            window.location.href = route('user.dashboard');
        } else {
            window.location.href = route('login');
        }
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-green-700 to-emerald-800">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_25%,rgba(255,255,255,0.1)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.1)_75%,rgba(255,255,255,0.1))] bg-[length:60px_60px]"></div>
            </div>

            {/* Gradient Orbs */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-emerald-400/20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-green-500/20 blur-3xl"></div>
            </div>

            {/* Content */}
            <div className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-16 lg:py-32">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    {/* Left Column - Text Content */}
                    <div className="text-center lg:text-left">
                        
                        <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                            Transforming Lives Through
                            <span className="block bg-gradient-to-r from-emerald-200 to-white bg-clip-text text-transparent">
                                Reproductive Health Innovation
                            </span>
                        </h1>
                        
                        <p className="mb-8 text-lg leading-relaxed text-emerald-50 sm:text-xl">
                            Breaking barriers to reproductive health information and services with accessible, technology-driven solutions for women and girls.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                            <button
                                onClick={handleAccessPlatform}
                                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
                            >
                                <span>Access Platform</span>
                                <svg
                                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                </svg>
                            </button>
                            <Link
                                href={route('learn.srhr')}
                                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10"
                            >
                                <span>Learn More</span>
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                                </svg>
                            </Link>
                        </div>

                        {/* Trust Indicators - Hidden on mobile, shown on desktop */}
                        <div className="mt-12 hidden flex-wrap items-center justify-center gap-8 lg:flex lg:justify-start">
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">20K+</div>
                                <div className="text-sm text-emerald-100">Lives Impacted</div>
                            </div>
                            <div className="h-12 w-px bg-white/30"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">5</div>
                                <div className="text-sm text-emerald-100">States Covered</div>
                            </div>
                            <div className="h-12 w-px bg-white/30"></div>
                            <div className="text-center">
                                <div className="text-3xl font-bold text-white">24/7</div>
                                <div className="text-sm text-emerald-100">Support Available</div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Element */}
                    <div className="relative hidden lg:block">
                        <div className="relative">
                            {/* Main Image Card */}
                            <div className="relative overflow-hidden rounded-2xl bg-white/10 p-2 shadow-2xl backdrop-blur-sm">
                                <img
                                    src="/images/pexels-pnw-prod-7328539.png"
                                    alt="Family Planning Services"
                                    className="h-[500px] w-full rounded-xl object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>

                            {/* Floating Feature Cards */}
                            <div className="absolute -left-6 top-1/4 rounded-xl bg-white p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Expert Care</div>
                                        <div className="text-xs text-gray-600">Professional Support</div>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -right-6 bottom-1/4 rounded-xl bg-white p-4 shadow-xl">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                                        <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-gray-900">Mobile Access</div>
                                        <div className="text-xs text-gray-600">Anytime, Anywhere</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -bottom-4 -right-4 h-32 w-32 rounded-full bg-emerald-400/20 blur-2xl"></div>
                            <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-green-400/20 blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave Separator */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg className="w-full text-white" viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <path d="M0 48h1440V0S1140 48 720 48 0 0 0 0v48z" fill="currentColor"/>
                </svg>
            </div>
        </section>
    );
}
