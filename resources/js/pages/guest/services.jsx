import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head, Link } from '@inertiajs/react';

export default function GuestServices() {
    // FFPI Programs from the organizational profile
    const programs = [
        {
            title: 'Digital Family Planning Platform (FFPI App)',
            description:
                'AI-powered platform providing comprehensive health education, expert access, fertility tracking, mental health advice, and community forums.',
            features: [
                'AI-powered health education modules',
                'Direct access to healthcare experts',
                'Advanced fertility tracking tools',
                'Mental health support and advice',
                'Community forums and peer support',
                'Privacy-focused data protection',
            ],
            icon: '/images/programs/digital-platform-icon.jpeg',
            color: 'green',
            users: '1,000+ Active Users',
        },
        {
            title: 'Empower-Her Health Program',
            description: 'Youth-led initiative reaching girls and young women across three states with comprehensive SRHR education and support.',
            features: [
                'Comprehensive SRHR education',
                'Peer-to-peer support networks',
                'Leadership development training',
                'Digital literacy programs',
                'Community outreach initiatives',
                'Cultural sensitivity training',
            ],
            icon: '/images/programs/hero-group.jpeg',
            color: 'green',
            users: '2,000+ Girls Reached',
        },
        {
            title: 'Youth Advocacy Labs',
            description: 'Training programs for young SRHR advocates in leadership and digital literacy to drive change in their communities.',
            features: [
                'Leadership development workshops',
                'Digital advocacy training',
                'Policy engagement skills',
                'Community organizing techniques',
                'Public speaking and communication',
                'Project management skills',
            ],
            icon: '/images/programs/youth-advocacy-icon.jpg',
            color: 'green',
            users: 'Active Since 2025',
        },
        {
            title: 'Community Engagement',
            description: 'Partnerships with grassroots networks to promote inclusive family planning approaches across South Sudan.',
            features: [
                'Grassroots community partnerships',
                'Cultural sensitivity training',
                'Local leader engagement',
                'Community-based education',
                'Traditional healer collaboration',
                'Religious leader partnerships',
            ],
            icon: '/images/programs/community-engagement-icon.jpeg',
            color: 'green',
            users: 'Multi-Community Reach',
        },
        {
            title: 'Research & Policy Engagement',
            description: 'Evidence-based studies and advocacy for SRHR policy reforms to create lasting systemic change.',
            features: [
                'Evidence-based research studies',
                'Policy analysis and recommendations',
                'Government engagement',
                'International advocacy',
                'Data collection and analysis',
                'Impact assessment studies',
            ],
            icon: '/images/programs/youth-advocacy-icon.jpg',
            color: 'green',
            users: 'Policy Impact',
        },
    ];

    const heroHighlights = [
        {
            value: '5',
            label: 'Integrated SRHR programs',
            detail: 'Digital health, community engagement, and policy advocacy delivered together.',
        },
        {
            value: '2K+',
            label: 'Girls and young women reached',
            detail: 'Peer-led education and safe spaces active across three South Sudan states.',
        },
        {
            value: '1K+',
            label: 'Platform users onboarded',
            detail: 'In-app counselling, mental wellness support, and fertility tracking resources.',
        },
        {
            value: '€15K',
            label: 'Catalytic funding secured',
            detail: 'Backed by regional innovation partners to accelerate scale and impact.',
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="Our Programs - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <section
                className="relative overflow-hidden bg-gray-950 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.5)), url('/images/programs/hero-group.jpeg')`,
                }}
            >
                <div className="pt-40 pb-14 text-white md:w-[70%] md:px-16">
                    <h1 className="text-4xl leading-tight font-black tracking-tight sm:text-5xl lg:text-6xl">Our Comprehensive programs</h1>
                    <p className="mt-6 text-lg leading-relaxed text-emerald-100 sm:text-xl">
                        From telehealth to grassroots organising, FFPI designs connected programs that equip communities with accurate information,
                        trusted support, and pathways to care across South Sudan and East Africa.
                    </p>
                </div>
            </section>

            {/* Programs Section */}
            <div id="programs" className="bg-gradient-to-b from-white to-gray-50 py-20 sm:py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                            Our Programs
                        </span>
                        <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
                            Transforming Communities Through Innovative Programs
                        </h2>
                        <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-600">
                            Innovative solutions advancing sexual and reproductive health across South Sudan and East Africa
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-lg shadow-emerald-900/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-emerald-900/10"
                            >
                                {/* Image Header */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={program.icon}
                                        alt={program.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-900/40 to-transparent"></div>
                                    <div className="absolute right-0 bottom-0 left-0 p-6">
                                        <div className="mb-2 inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                                            {program.users}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white">{program.title}</h3>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <p className="mb-6 text-base leading-relaxed text-gray-600">{program.description}</p>
                                    <p className="text-base leading-relaxed text-gray-600">{program.features.join(', ')}.</p>
                                </div>

                                {/* Hover Effect Border */}
                                <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact & Achievements Section */}
            <div className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            <span className="mr-2">🏆</span>
                            Our Impact
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Program Impact & Achievements</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Building a healthier future through innovation and community engagement
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-green-600">2023</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Legally Registered</h3>
                            <p className="text-gray-600">FFPI officially registered in South Sudan</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-green-600">2,000+</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Girls Reached</h3>
                            <p className="text-gray-600">Through Empower-Her Health program</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-green-600">1,000+</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">App Users</h3>
                            <p className="text-gray-600">Testing Digital Family Planning Platform</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-4 text-4xl font-bold text-green-600">€15,000</div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">GIZ Funding</h3>
                            <p className="text-gray-600">Awarded at EAC Secretary General Forum</p>
                        </div>
                    </div>

                    {/* Awards Section */}
                    <div className="mt-16 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 p-8">
                        <h3 className="mb-8 text-center text-2xl font-bold text-gray-900">Awards & Recognition</h3>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🥈</div>
                                <h4 className="mb-2 font-semibold text-gray-900">1st Runner-Up</h4>
                                <p className="text-sm text-gray-600">3Zeros Innovate Challenge – Family Planning Track (2024)</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🏆</div>
                                <h4 className="mb-2 font-semibold text-gray-900">National Representative</h4>
                                <p className="text-sm text-gray-600">Youth & Women Hackathon – East Africa (2024)</p>
                            </div>
                            <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                                <div className="mb-3 text-2xl">🎯</div>
                                <h4 className="mb-2 font-semibold text-gray-900">Finalist</h4>
                                <p className="text-sm text-gray-600">Youth-Led Digital Health Innovation Grant by GIZ (2025)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-20 text-white">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">Join Our Mission</h2>
                    <p className="mb-8 text-xl opacity-90">
                        Be part of the movement that's transforming reproductive health across South Sudan and East Africa. Together, we can build
                        healthier futures for all.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href={route('register')}
                            className="transform rounded-full bg-white px-8 py-4 text-lg font-semibold text-green-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-50 hover:shadow-xl"
                        >
                            Get Started Today
                        </Link>
                        <Link
                            href={route('contact')}
                            className="transform rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-green-600"
                        >
                            Partner With Us
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
