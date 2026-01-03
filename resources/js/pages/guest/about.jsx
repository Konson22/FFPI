import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { useEffect, useState, useRef } from 'react';

export default function AboutPage() {
    const teamMembers = [
        {
            name: 'Anok Athor Deng',
            role: 'Founder & Program Director',
            description:
                'Clinical officer by profession, innovator, and entrepreneur with extensive knowledge in healthcare practices and family planning.',
            image: '/images/teams/anok.jpeg',
            tag: 'Leadership',
            social: { linkedin: '#', twitter: '#' },
        },
        {
            name: 'Wai Micheal',
            role: 'Full Stack Software Engineer',
            description:
                'Skilled engineer focused on performance, security, and scalability. Key role in developing the Family Future platform.',
            image: '/images/teams/wai-micheal.jpg',
            tag: 'Engineering',
            social: { linkedin: '#', twitter: '#' },
        },
        {
            name: 'Konson Ak',
            role: 'Software Engineer',
            description:
                'Passionate engineer bringing ideas to life through innovative, user-friendly digital solutions for mobile and web.',
            image: '/images/teams/konson.jpeg',
            tag: 'Engineering',
            social: { linkedin: '#', twitter: '#' },
        },
        {
            name: 'Kuena James Dak',
            role: 'Communication & Cyber Security Expert',
            description:
                'Communication and cyber security expert combining Computer Science background with passion for social impact.',
            image: '/images/teams/kuena-james-dak.jpeg',
            tag: 'Technology',
            social: { linkedin: '#', twitter: '#' },
        },
        {
            name: 'Masudio Gladys',
            role: 'SRHR Expert',
            description:
                "SRHR expert with 5+ years experience. Bachelor's in Medicine, focused on reproductive health, working with UNFPA.",
            image: '/images/teams/masudio-gladys.jpeg',
            tag: 'Healthcare',
            social: { linkedin: '#', twitter: '#' },
        },
        {
            name: 'Nyadak Suzan',
            role: 'SRHR Expert',
            description:
                "SRHR expert with 5+ years experience. Bachelor's in Medicine, focused on reproductive health, working with UNFPA.",
            image: '/images/teams/agnes-juan.jpeg',
            tag: 'Healthcare',
            social: { linkedin: '#', twitter: '#' },
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <GuestNavbar />

            <main>
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-emerald-700 to-green-800 px-6 py-20 sm:px-8 lg:px-16 lg:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="max-w-3xl">
                            <div className="mb-5 inline-block rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                                About FFPI
                            </div>
                            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                                Transforming Reproductive Health in South Sudan
                            </h1>
                            <p className="mb-8 text-lg leading-relaxed text-emerald-50 sm:text-xl">
                                FFPI delivers trusted information, compassionate care, and transformative technology to empower women, youth, and
                                underserved communities across South Sudan.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="#mission"
                                    className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
                                >
                                    Our Mission
                                </a>
                                <a
                                    href="#team"
                                    className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                                >
                                    Meet the Team
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section id="mission" className="px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                            {/* Mission */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-emerald-100 p-3">
                                    <svg className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Mission</h2>
                                <p className="mb-6 text-base leading-relaxed text-gray-600">
                                    To provide accessible, culturally-sensitive sexual and reproductive health services through innovative technology
                                    and community engagement, empowering individuals to make informed decisions about their health and futures.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Evidence-based health education',
                                        'Community-driven solutions',
                                        'Digital health innovation',
                                        'Policy advocacy and rights protection',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <svg className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Vision */}
                            <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm lg:p-10">
                                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-green-100 p-3">
                                    <svg className="h-6 w-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                        />
                                    </svg>
                                </div>
                                <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">Our Vision</h2>
                                <p className="mb-6 text-base leading-relaxed text-gray-600">
                                    A South Sudan where every individual has access to comprehensive reproductive health information and services,
                                    enabling them to exercise their rights and achieve their full potential.
                                </p>
                                <ul className="space-y-3">
                                    {[
                                        'Universal access to SRHR services',
                                        'Empowered and informed communities',
                                        'Reduced maternal and infant mortality',
                                        'Gender equality and youth empowerment',
                                    ].map((item) => (
                                        <li key={item} className="flex items-start gap-3">
                                            <svg className="mt-0.5 h-5 w-5 shrink-0 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="text-gray-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="bg-gray-50 px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-12 text-center">
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Our Core Values</h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                These principles guide our work and define our commitment to the communities we serve.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    title: 'Compassion',
                                    description: 'We approach every interaction with empathy, understanding, and respect for individual circumstances.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Excellence',
                                    description: 'We maintain the highest standards in service delivery, research, and community engagement.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Innovation',
                                    description: 'We leverage technology and creative solutions to overcome barriers to healthcare access.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Integrity',
                                    description: 'We operate with transparency, honesty, and accountability in all our programs and partnerships.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Collaboration',
                                    description: 'We work with communities, partners, and stakeholders to achieve shared health goals.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                    ),
                                },
                                {
                                    title: 'Empowerment',
                                    description: 'We equip individuals with knowledge and resources to make informed health decisions.',
                                    icon: (
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 10V3L4 14h7v7l9-11h-7z"
                                            />
                                        </svg>
                                    ),
                                },
                            ].map((value) => (
                                <div key={value.title} className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md">
                                    <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-emerald-100 p-2.5 text-emerald-700">
                                        {value.icon}
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900">{value.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Impact Statistics */}
                <ImpactSection />

                {/* Team Section */}
                <section id="team" className="bg-gray-50 px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <div className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                                Our Team
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">Meet Our Leadership</h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Dedicated professionals with expertise in healthcare, technology, and community development working together to transform reproductive health.
                            </p>
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {teamMembers.map((member, index) => (
                                <div 
                                    key={member.name} 
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Image Container */}
                                    <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        />
                                        {/* Gradient Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                        
                                        {/* Tag Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-lg backdrop-blur-sm">
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600"></span>
                                                {member.tag}
                                            </span>
                                        </div>

                                        {/* Social Links - Show on Hover */}
                                        <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                            {member.social.linkedin && (
                                                <a
                                                    href={member.social.linkedin}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-emerald-600 hover:text-white hover:scale-110"
                                                    aria-label="LinkedIn"
                                                >
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {member.social.twitter && (
                                                <a
                                                    href={member.social.twitter}
                                                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-gray-700 shadow-lg backdrop-blur-sm transition-all hover:bg-emerald-600 hover:text-white hover:scale-110"
                                                    aria-label="Twitter"
                                                >
                                                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <h3 className="mb-1 text-xl font-bold text-gray-900 transition-colors group-hover:text-emerald-700">
                                            {member.name}
                                        </h3>
                                        <p className="mb-3 text-sm font-semibold text-emerald-600">{member.role}</p>
                                        <p className="text-sm leading-relaxed text-gray-600">{member.description}</p>
                                    </div>

                                    {/* Bottom Accent Line */}
                                    <div className="h-1 w-0 bg-gradient-to-r from-emerald-600 to-green-600 transition-all duration-300 group-hover:w-full"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-emerald-700 px-6 py-16 sm:px-8 lg:px-16">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Partner With Us</h2>
                        <p className="mb-8 text-lg text-emerald-50">
                            Join us in our mission to transform reproductive health across South Sudan. Together, we can create lasting change.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
                            >
                                Get in Touch
                            </a>
                            <a
                                href="/programs"
                                className="inline-flex items-center justify-center rounded-lg border-2 border-white px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white/10"
                            >
                                View Our Programs
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <GuestFooter />
        </div>
    );
}

// Impact Statistics Section
function ImpactSection() {
    const [metrics, setMetrics] = useState([
        { value: 0, target: 87, suffix: '%', label: 'Youth with improved SRHR knowledge' },
        { value: 0, target: 65, suffix: '%', label: 'Participants accessing follow-up care' },
        { value: 0, target: 40, suffix: '%', label: 'Increase in community dialogues' },
        { value: 0, target: 12, suffix: '', label: 'Counties with mobile health platform' },
    ]);
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;

        metrics.forEach((metric, index) => {
            const increment = metric.target / steps;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= metric.target) {
                    setMetrics((prev) => {
                        const newMetrics = [...prev];
                        newMetrics[index] = { ...newMetrics[index], value: metric.target };
                        return newMetrics;
                    });
                    clearInterval(timer);
                } else {
                    setMetrics((prev) => {
                        const newMetrics = [...prev];
                        newMetrics[index] = { ...newMetrics[index], value: Math.floor(current) };
                        return newMetrics;
                    });
                }
            }, duration / steps);
        });
    }, [isVisible]);

    return (
        <section ref={sectionRef} className="bg-emerald-700 px-6 py-16 sm:px-8 lg:px-16 lg:py-24">
            <div className="mx-auto max-w-7xl">
                <div className="mb-12 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl">Our Impact</h2>
                    <p className="mx-auto max-w-2xl text-lg text-emerald-50">
                        Measurable results from our commitment to improving reproductive health outcomes across South Sudan.
                    </p>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {metrics.map((metric, index) => (
                        <div key={index} className="rounded-xl border border-emerald-600 bg-emerald-600/50 p-6 text-center backdrop-blur-sm">
                            <div className="mb-2 text-4xl font-bold text-white sm:text-5xl">
                                {metric.value}
                                {metric.suffix}
                            </div>
                            <div className="text-sm leading-relaxed text-emerald-50">{metric.label}</div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-sm text-emerald-100">
                        <svg className="mr-2 inline h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Data independently evaluated by regional SRHR networks in 2024
                    </p>
                </div>
            </div>
        </section>
    );
}
