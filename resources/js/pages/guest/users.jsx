import BackToTop from '@/components/BackToTop';
import GetInTouch from '@/components/GetInTouch';
import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';

export default function Users() {
    const teamMembers = [
        {
            name: 'Anok Athor Deng',
            role: 'Founder & Executive Director',
            description:
                'Clinical officer by profession, innovator, and entrepreneur. Extensive knowledge in healthcare practices and family planning, with a passion for addressing reproductive health issues through innovative solutions.',
            image: '/images/team/anok-athor-deng.jpg',
        },
        {
            name: 'Kuena James Dak',
            role: 'Communication & Cyber Security Expert',
            description:
                'Communication, cyber security and Visibility Expert from South Sudan, combining his background in Computer Science with a passion for social impact. An alumnus of the UNITAR Great Ideas Space.',
            image: '/images/team/kuena-james-dak.jpg',
        },
        {
            name: 'Dut Kulang',
            role: 'Software Engineer',
            description:
                'Freelance software engineer with over 6 years of experience in API-driven systems and automation. He has developed a sexual reproductive health chatbot for AMREF and contributed code to the Brave Browser and Mozilla Developer Network.',
            image: '/images/team/dut-kulang.jpg',
        },
        {
            name: 'Masudio Gladys',
            role: 'SRHR Expert',
            description:
                "Skilled SRHR expert with over 5 years of experience in the field. Holding a Bachelor's degree in Medicine, with a focus on reproductive health, she is currently working as an SRHR expert with UNFPA.",
            image: '/images/team/masudio-gladys.jpg',
        },
    ];

    const advisoryBoard = [
        {
            name: 'Peter Garang Ngor',
            role: 'SRHR & Public Health Expert',
            description:
                'SRHR and public health expert with 9 years of experience, currently serving as an independent national consultant for HIV prevention. He has a strong background in sexual and reproductive health.',
            image: '/images/team/peter-garang-ngor.jpg',
        },
        {
            name: 'Bidali John',
            role: 'Community Engagement Specialist',
            description:
                'Dedicated community engagement and outreach specialist with extensive experience in mobilizing local communities and fostering impactful health advocacy initiatives.',
            image: '/images/team/bidali-john.jpg',
        },
        {
            name: 'Chuol Tap',
            role: 'Innovative Educator & Social Entrepreneur',
            description:
                'Innovative educator, social entrepreneur, and geoscientist. He is the Co-founder and Team Lead at East Africa Institute of Science and Technology, Juba, South Sudan.',
            image: '/images/team/chuol-tap.jpg',
        },
    ];

    const achievements = [
        {
            year: '2024',
            title: 'First Runner-Up, 3Zeros Innovate Challenge',
            category: 'Family Planning Track',
        },
        {
            year: '2024',
            title: 'National Representative',
            category: 'Youth & Women Hackathon – East Africa',
        },
        {
            year: '2025',
            title: 'Finalist – Youth-Led Digital Health Innovation Grant',
            category: 'GIZ',
        },
    ];

    const programs = [
        {
            title: 'Digital Health Platform',
            description:
                'A tech-driven solution that delivers real-time access to family planning information, SRH education, and service directories. Available via mobile and web, this platform empowers users with confidential, localized, and life-saving resources.',
            icon: '🌐',
        },
        {
            title: 'Empower-Her Health',
            description:
                'A targeted initiative focusing on women and girls in underserved areas. It provides SRHR education, menstrual hygiene kits, and referral pathways while building confidence and decision-making power for safer reproductive choices.',
            icon: '💪',
        },
        {
            title: 'SRHR in Climate-Affected Areas',
            description:
                'We work at the intersection of climate resilience and reproductive health by mapping services, supporting displaced women and girls, and adapting digital tools for communities affected by floods, droughts, and displacement.',
            icon: '🌱',
        },
        {
            title: 'Youth Advocacy Labs',
            description:
                'A capacity-building program nurturing young leaders in SRHR advocacy, digital innovation, and social entrepreneurship. Labs provide mentorship, toolkits, and platforms to amplify youth voices in national and regional dialogues.',
            icon: '🧠',
        },
        {
            title: 'Community Storytelling for Social Norms Change',
            description:
                'This program uses participatory media—radio, short films, poetry, and theatre—to challenge stigma, amplify lived experiences, and reshape attitudes around family planning, gender, and reproductive health.',
            icon: '📢',
        },
    ];

    const coreValues = [
        {
            title: 'Inclusivity',
            description:
                'We believe in reaching everyone—regardless of age, gender, ability, or background—with equitable access to information and services.',
            icon: '✅',
        },
        {
            title: 'Youth Empowerment',
            description:
                'We value the leadership, creativity, and resilience of young people. We create spaces for youth voices to lead the SRHR movement.',
            icon: '💬',
        },
        {
            title: 'Innovation',
            description:
                'We harness the power of digital technology and forward-thinking ideas to revolutionize access to family planning and reproductive health.',
            icon: '🧠',
        },
        {
            title: 'Evidence-Based Action',
            description: 'Our work is rooted in research, data, and community-driven insights. We listen, learn, and adapt to ensure impact.',
            icon: '📊',
        },
        {
            title: 'Community Engagement',
            description:
                'We work hand-in-hand with communities, healthcare providers, and local leaders to deliver culturally relevant and sustainable solutions.',
            icon: '🤝',
        },
        {
            title: 'Accountability',
            description: 'Transparency and responsibility are central to our operations, partnerships, and service delivery.',
            icon: '🎯',
        },
        {
            title: 'Respect and Dignity',
            description: 'We treat every individual with compassion, upholding human rights and bodily autonomy at all levels of our work.',
            icon: '💚',
        },
    ];

    return (
        <div id="top" className="min-h-screen bg-white">
            <Head title="Family Future - Your Health Journey Starts Here" />
            <style jsx global>{`
                html {
                    scroll-behavior: smooth;
                }
            `}</style>

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
                    }}
                ></div>

                {/* Dark Green Overlay */}
                <div className="absolute inset-0 bg-green-900/85"></div>

                {/* Content */}
                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Main Headline */}
                        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Innovate. Family Planning's Most Valuable Resource.
                        </h1>

                        {/* Sub-headline */}
                        <p className="mx-auto mt-8 max-w-3xl text-xl text-green-100 sm:text-2xl">
                            Empowering communities through digital innovation, youth leadership, and evidence-driven advocacy across South Sudan and
                            East Africa.
                        </p>

                        {/* CTA Button */}
                        <div className="mt-12">
                            <a
                                href="#about"
                                className="inline-flex items-center rounded-lg bg-emerald-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-emerald-600 hover:shadow-xl"
                            >
                                Learn More
                                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </div>

                        {/* Scroll Indicator */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
                            <a
                                href="#about"
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30"
                            >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div id="about" className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                        <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-100 p-8">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Vision</h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To lead in digital innovation for equitable access to reproductive health and family planning services across South
                                Sudan and East Africa.
                            </p>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br from-emerald-50 to-green-100 p-8">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Mission</h2>
                            <p className="text-lg leading-relaxed text-gray-700">
                                To empower young people, women, and underserved communities with inclusive, tech-enabled reproductive health solutions
                                through awareness, innovation, and collaboration.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Core Values Section */}
            <div className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 text-center">
                        <div className="mb-4 inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                            <span className="mr-2">💎</span>
                            Our Foundation
                        </div>
                        <h2 className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl lg:text-5xl">Our Core Values</h2>
                        <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-600">
                            At our organization, our actions and decisions are guided by a set of core values that define who we are and how we
                            operate. These principles shape our culture of excellence and innovation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {coreValues.map((value, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:ring-green-200"
                            >
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                <div className="relative">
                                    {/* Icon Container */}
                                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 transition-all duration-300 group-hover:scale-110 group-hover:from-green-200 group-hover:to-emerald-200">
                                        <span className="text-3xl transition-transform duration-300 group-hover:scale-110">{value.icon}</span>
                                    </div>

                                    {/* Content */}
                                    <h3 className="mb-4 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-green-700">
                                        {value.title}
                                    </h3>
                                    <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                                        {value.description}
                                    </p>

                                    {/* Decorative Element */}
                                    <div className="mt-6 h-1 w-0 bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 group-hover:w-full"></div>
                                </div>

                                {/* Floating Elements */}
                                <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-green-200 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-60"></div>
                                <div className="absolute -bottom-2 -left-2 h-6 w-6 rounded-full bg-emerald-200 opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-60"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-16 text-center">
                        <div className="rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white shadow-xl">
                            <h3 className="mb-4 text-2xl font-bold">Living Our Values Every Day</h3>
                            <p className="mb-6 text-lg text-green-100">
                                These values aren't just words on a page—they're the foundation of everything we do. From our daily interactions to
                                our strategic decisions, we're committed to upholding these principles.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6">
                                <button className="rounded-xl bg-white px-8 py-3 font-semibold text-green-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-green-50">
                                    Learn More About Us
                                </button>
                                <button className="rounded-xl border-2 border-white px-8 py-3 font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-white hover:text-green-600">
                                    Join Our Mission
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Team Members Section */}
            <div id="team" className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Team</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Guiding the mission of Family Future in transforming SRHR access in South Sudan and beyond.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl">
                                <div className="flex h-48 items-center justify-center bg-gradient-to-br from-green-100 to-emerald-100">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-green-600 to-emerald-600">
                                        <span className="text-2xl font-bold text-white">
                                            {member.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{member.name}</h3>
                                    <p className="mb-3 text-sm font-medium text-green-600">{member.role}</p>
                                    <p className="text-sm leading-relaxed text-gray-600">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Advisory Board Section */}
            <div className="bg-gray-50 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Advisory Board</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Our advisory board brings together experts from various fields to guide our strategic direction.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {advisoryBoard.map((member, index) => (
                            <div key={index} className="overflow-hidden rounded-xl bg-white shadow-lg transition-shadow hover:shadow-xl">
                                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-emerald-100 to-green-100">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-green-600">
                                        <span className="text-xl font-bold text-white">
                                            {member.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{member.name}</h3>
                                    <p className="mb-3 text-sm font-medium text-emerald-600">{member.role}</p>
                                    <p className="text-sm leading-relaxed text-gray-600">{member.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Programs Section */}
            <div id="programs" className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Programs & Projects</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Our flagship programs reflect Family Future's commitment to innovation, equity, and youth-led action.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {programs.map((program, index) => (
                            <div
                                key={index}
                                className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 transition-shadow hover:shadow-lg"
                            >
                                <div className="mb-4 text-4xl">{program.icon}</div>
                                <h3 className="mb-3 text-xl font-semibold text-gray-900">{program.title}</h3>
                                <p className="leading-relaxed text-gray-600">{program.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Awards & Recognition</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Our impact reflects our commitment to innovation, youth leadership, and community-centered programming.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {achievements.map((achievement, index) => (
                            <div key={index} className="rounded-xl bg-white p-6 text-center shadow-lg">
                                <div className="mb-2 text-3xl font-bold text-green-600">{achievement.year}</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">{achievement.title}</h3>
                                <p className="text-sm text-gray-600">{achievement.category}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Impact Statistics */}
            <div className="bg-white py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-3xl font-bold text-gray-900">Our Impact</h2>
                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                            Since its inception, Family Future has made measurable strides in advancing reproductive health and rights in South Sudan.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-green-600">20,000+</div>
                            <p className="text-gray-600">Beneficiaries to be reached by 2027</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-emerald-600">5</div>
                            <p className="text-gray-600">States across South Sudan</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-green-700">2023</div>
                            <p className="text-gray-600">Year of registration as NGO</p>
                        </div>
                        <div className="text-center">
                            <div className="mb-2 text-4xl font-bold text-emerald-700">€15,000</div>
                            <p className="text-gray-600">Funding from GIZ</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Section */}
            <GetInTouch
                variant="minimal"
                contactInfo={{
                    email: 'futurefamilyplanning@gmail.com',
                    phone: '+211 922618621',
                    address: 'Hai Thongpiny, Juba, South Sudan',
                }}
            />

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 py-16">
                <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-bold text-white">Your health, Your plan, Your future.</h2>
                    <p className="mx-auto mb-8 max-w-2xl text-xl text-green-100">
                        Join us in pioneering digital innovations for family planning and reproductive health across South Sudan and East Africa.
                    </p>
                    <div className="flex flex-col justify-center gap-4 sm:flex-row">
                        <button className="rounded-lg bg-white px-8 py-3 font-semibold text-green-600 transition-colors hover:bg-green-50">
                            Learn More About Our Work
                        </button>
                        <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors hover:bg-white hover:text-green-600">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <BackToTop />

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
