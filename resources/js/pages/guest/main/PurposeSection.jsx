import BadgeCard from '../../../components/BadgeCard';

export default function PurposeSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-green-50/50 py-24">
            {/* Background Decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-gradient-to-br from-green-100/40 to-emerald-100/40 blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gradient-to-tr from-green-50/60 to-emerald-50/60 blur-3xl"></div>
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <HeaderCard />

                {/* Mission & Vision Cards */}
                <div className="mb-16 space-y-12">
                    <MissionCard />
                    <VisionCard />
                </div>
            </div>
        </section>
    );
}

function HeaderCard() {
    return (
        <div className="mb-16 text-center lg:px-52">
            <BadgeCard title="Our Purpose & Mission" />
            <h2 className="mb-6 text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl">
                Empowering Communities Through
                <span className="block bg-gradient-to-r from-green-600 via-green-700 to-green-800 bg-clip-text text-transparent">
                    Digital SRHR Access
                </span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
                We believe that informed reproductive choices are key to equity, dignity, and sustainable development. Our mission is to transform
                sexual and reproductive health access through digital innovation.
            </p>
        </div>
    );
}

function VisionCard() {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 via-emerald-500/0 to-green-600/0 opacity-0 transition-opacity duration-500 group-hover:from-green-500/5 group-hover:via-emerald-500/5 group-hover:to-green-600/5 group-hover:opacity-100"></div>
            
            <div className="relative flex flex-col lg:flex-row">
                {/* Image Section - Left Side */}
                <div className="relative h-80 w-full overflow-hidden lg:h-auto lg:w-2/5">
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-600/30 to-green-800/30"></div>
                    <img
                        src="/images/mother-with-chiild.jpg"
                        alt="Our Vision - Digital Innovation for Reproductive Health"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.className += ' bg-gradient-to-br from-green-400 via-green-500 to-green-600';
                        }}
                    />
                    {/* Decorative Corner */}
                    <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-bl from-white/20 to-transparent"></div>
                </div>

                {/* Text Section - Right Side */}
                <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-green-50/30 to-white p-10 lg:p-14">
                    <div className="mb-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 px-5 py-2 text-xs font-bold tracking-wide text-green-700 uppercase shadow-sm">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                            </svg>
                            Vision
                        </span>
                    </div>
                    <h3 className="mb-6 text-4xl font-black leading-tight text-gray-900 lg:text-5xl">Our Vision</h3>
                    <p className="mb-10 text-xl leading-relaxed text-gray-700">
                        To lead in digital innovation for equitable access to reproductive health and family planning services across South Sudan and
                        East Africa.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Foster youth-led innovation in health and social behavior change
                            </p>
                        </div>
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Strengthen partnerships with government, civil society, and donors
                            </p>
                        </div>
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Create sustainable, scalable solutions for reproductive health access
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MissionCard() {
    return (
        <div className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)]">
            {/* Hover Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-green-500/0 to-green-600/0 opacity-0 transition-opacity duration-500 group-hover:from-emerald-500/5 group-hover:via-green-500/5 group-hover:to-green-600/5 group-hover:opacity-100"></div>
            
            <div className="relative flex flex-col lg:flex-row-reverse">
                {/* Image Section - Right Side (reversed for Mission) */}
                <div className="relative h-80 w-full overflow-hidden lg:h-auto lg:w-2/5">
                    <div className="absolute inset-0 z-10 bg-gradient-to-br from-green-600/30 to-green-800/30"></div>
                    <img
                        src="/images/hero-group.jpeg"
                        alt="Our Mission - Empowering Communities"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.parentElement.className += ' bg-gradient-to-br from-green-400 via-green-500 to-green-600';
                        }}
                    />
                    {/* Decorative Corner */}
                    <div className="absolute top-0 left-0 h-32 w-32 bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>

                {/* Text Section - Left Side */}
                <div className="flex flex-1 flex-col justify-center bg-gradient-to-br from-white to-green-50/20 p-10 lg:p-14">
                    <div className="mb-5">
                        <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 px-5 py-2 text-xs font-bold tracking-wide text-green-700 uppercase shadow-sm">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                            </svg>
                            Mission
                        </span>
                    </div>
                    <h3 className="mb-6 text-4xl font-black leading-tight text-gray-900 lg:text-5xl">Our Mission</h3>
                    <p className="mb-10 text-xl leading-relaxed text-gray-700">
                        To empower young people, women, and underserved communities with inclusive, tech-enabled reproductive health solutions through
                        awareness, innovation, and collaboration.
                    </p>
                    <div className="space-y-6">
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">
                                Expand access to sexual and reproductive health education and services through digital platforms
                            </p>
                        </div>
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">Build capacity of healthcare providers and community champions</p>
                        </div>
                        <div className="flex items-start gap-4 group/item">
                            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg transition-transform duration-300 group-hover/item:scale-110">
                                <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path>
                                </svg>
                            </div>
                            <p className="text-lg leading-relaxed text-gray-700">Promote data-driven advocacy and policy engagement</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
