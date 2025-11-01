import { Link, usePage } from '@inertiajs/react';

export default function HeroSection() {
    const { auth } = usePage().props;

    const handleAccessPlatform = () => {
        if (auth.user) {
            // User is logged in, navigate to dashboard
            window.location.href = route('user.dashboard');
        } else {
            // User not logged in, redirect to login page
            window.location.href = route('login');
        }
    };

    return (
        <>
            <section
                className="relative py-16"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.1)), url('/images/pexels-pnw-prod-7328539.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                {/* Main Content */}
                <div className="px-4 lg:w-[70%] lg:px-8">
                    {/* Main Heading */}
                    <h1 className="text-4xl leading-tight font-extrabold text-white drop-shadow-2xl sm:text-5xl lg:text-7xl">
                        Transforming
                        <span className="block bg-gradient-to-r from-white via-green-50 to-green-100 bg-clip-text text-transparent drop-shadow-lg">
                            Reproductive Health
                        </span>
                        Through Digital Innovation
                    </h1>

                    {/* Subheading */}
                    <p className="text-lg leading-relaxed text-white drop-shadow-lg sm:text-xl font-medium">
                        Empowering over 20,000 women and girls across South Sudan with accessible, technology-driven family planning solutions. We're breaking down barriers to reproductive health information and services, ensuring every woman and girl can make informed decisions about their health, family, and future.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
                        <button
                            onClick={handleAccessPlatform}
                            className="group relative overflow-hidden rounded-full bg-white px-8 py-4 text-lg font-bold text-green-700 transition-all duration-300 hover:scale-110 hover:shadow-2xl shadow-xl"
                        >
                            <span className="relative z-10">Access Our Platform</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-green-100 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        </button>
                        <Link
                            href={route('learn.srhr')}
                            className="group hidden rounded-full border-2 border-white/40 bg-white/10 backdrop-blur-md px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-white hover:bg-white/20 hover:scale-110 shadow-xl sm:block"
                        >
                            <span className="flex items-center">
                                Learn More
                                <svg
                                    className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </span>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
