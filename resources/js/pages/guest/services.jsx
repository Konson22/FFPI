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

    return (
        <div className="min-h-screen bg-white">
            <Head title="Our Programs - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <img
                        src="/images/programs/hero-group.jpeg"
                        alt="FFPI Program Participants"
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/50 via-green-600/50 to-green-700/50"></div>
                </div>
                <div className="absolute inset-0 bg-black/30"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-8 inline-flex items-center rounded-full border-2 border-white/50 bg-white/30 px-8 py-4 text-sm font-bold text-white shadow-2xl backdrop-blur-md">
                            <span className="mr-3 text-2xl"></span>
                            <span className="tracking-wide drop-shadow-lg">Our Programs</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-8 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                            <span className="block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)]">FFPI</span>
                            <span className="block text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-5xl lg:text-6xl">
                                Programs
                            </span>
                        </h1>

                        {/* Tagline */}
                        <div className="mb-10">
                            <p className="mb-4 text-2xl font-bold text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] sm:text-3xl lg:text-4xl">
                                Comprehensive Solutions for Reproductive Health
                            </p>
                            <p className="text-xl font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)] sm:text-2xl">
                                Empowering Choices. Building Healthy Futures.
                            </p>
                        </div>

                        {/* Description */}
                        <p className="mx-auto mb-12 max-w-4xl text-lg leading-relaxed text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_2px_rgba(0,0,0,0.9)] sm:text-xl font-medium">
                            Innovative programs advancing sexual and reproductive health and rights across South Sudan and East Africa through digital
                            innovation, community engagement, and expert partnerships.
                        </p>

                        {/* Program Stats */}
                        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:grid-cols-5">
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">5</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Key Programs</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">2K+</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Girls Reached</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">1K+</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">App Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">3</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">States</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-black text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] sm:text-3xl">€15K</div>
                                <div className="text-sm font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] sm:text-base">Funding</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Programs Section */}
            <div className="bg-white py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            <span className="mr-2">🎯</span>
                            Key Programs
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Our Impact Programs</h2>
                        <p className="mx-auto max-w-3xl text-xl text-gray-600">
                            Innovative solutions advancing sexual and reproductive health across South Sudan and East Africa
                        </p>
                    </div>

                    <div className="space-y-16">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className={`grid grid-cols-1 items-center gap-12 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
                            >
                                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                                    <div className="mb-4 flex items-center">
                                        <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl ring-2 ring-green-200 shadow-md">
                                            <img
                                                src={program.icon}
                                                alt={program.title}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-bold text-gray-900">{program.title}</h3>
                                            <div
                                                className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-semibold text-${program.color}-600 bg-${program.color}-100`}
                                            >
                                                {program.users}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mb-6 text-lg text-gray-600">{program.description}</p>
                                    <ul className="space-y-3">
                                        {program.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center">
                                                <svg
                                                    className="mr-3 h-5 w-5 flex-shrink-0 text-green-500"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                                    <div
                                        className="bg-gradient-to-br from-green-50 to-green-100 flex h-80 items-center justify-center rounded-2xl p-8 overflow-hidden relative group"
                                    >
                                        <img
                                            src={program.icon}
                                            alt={program.title}
                                            className="absolute inset-0 h-full w-full object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                                        />
                                        <div className="relative z-10 text-center">
                                            <div className="h-24 w-24 mx-auto mb-4 flex items-center justify-center rounded-2xl overflow-hidden ring-4 ring-white shadow-lg">
                                                <img
                                                    src={program.icon}
                                                    alt={program.title}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                            <h4 className="mb-2 text-lg font-semibold text-gray-900">{program.title}</h4>
                                            <p className="text-sm text-gray-600 font-medium">{program.users}</p>
                                        </div>
                                    </div>
                                </div>
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
