import { useEffect, useRef, useState } from 'react';

export default function ImpactSection() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            {/* Subtle Background Effects */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.08),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(5,150,105,0.06),transparent_50%)]"></div>
            </div>

            {/* Refined Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:80px_80px]"></div>

            <div className="relative">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
                    <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center">
                        {/* Content */}
                        <div className="space-y-8">
                            <div className="inline-flex items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/5 px-4 py-2 backdrop-blur-sm">
                                <div className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                </div>
                                <span className="text-sm font-medium text-emerald-300">Transforming Lives</span>
                            </div>
                            
                            <h2 className="text-5xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl">
                                Creating
                                <span className="block bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                                    Measurable Impact
                                </span>
                            </h2>
                            
                            <p className="text-lg leading-relaxed text-slate-300 max-w-xl">
                                Through innovation, dedication, and community partnership, we're revolutionizing reproductive health access across South Sudan.
                            </p>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-4">
                                <QuickStat number="20K+" label="Lives Reached" />
                                <QuickStat number="5" label="States" />
                                <QuickStat number="€15K" label="Funding" />
                            </div>
                        </div>

                        {/* Visual */}
                        <div className="relative lg:h-[500px]">
                            <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-green-500/5 backdrop-blur-sm">
                                <div className="flex h-full items-center justify-center p-12">
                                    <div className="text-center space-y-4">
                                        <svg className="mx-auto h-32 w-32 text-emerald-400/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                        </svg>
                                        <p className="text-sm text-emerald-300/50">Impact Visualization</p>
                                    </div>
                                </div>
                                
                                {/* Floating Stats */}
                                <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-3">
                                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-white">20K+</div>
                                        <div className="text-xs text-emerald-300">Women Empowered</div>
                                    </div>
                                    <div className="rounded-xl border border-white/10 bg-slate-900/90 p-4 backdrop-blur-md">
                                        <div className="text-2xl font-bold text-white">100%</div>
                                        <div className="text-xs text-emerald-300">Commitment</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
                    <div className="mb-16 text-center space-y-3">
                        <h3 className="text-3xl font-bold text-white sm:text-4xl">
                            Our Impact in Numbers
                        </h3>
                        <p className="text-slate-400">Real results, real change</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-6 md:grid-rows-2">
                        <BentoStatCard
                            className="md:col-span-4 md:row-span-2"
                            value={20000}
                            suffix="+"
                            label="Lives Positively Impacted"
                            description="Women and girls empowered with access to reproductive health information and services"
                            icon={<UsersIcon />}
                            gradient="from-emerald-500 to-green-500"
                            featured
                        />

                        <BentoStatCard
                            className="md:col-span-2"
                            value={5}
                            label="States Covered"
                            description="Expanding our reach"
                            icon={<LocationIcon />}
                            gradient="from-green-500 to-teal-500"
                        />

                        <BentoStatCard
                            className="md:col-span-2"
                            value={15000}
                            prefix="€"
                            label="GIZ Funding"
                            description="Innovation support"
                            icon={<FundingIcon />}
                            gradient="from-teal-500 to-emerald-500"
                        />
                    </div>
                </div>

                {/* Timeline Section */}
                <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
                    <div className="mb-16 text-center space-y-3">
                        <h3 className="text-3xl font-bold text-white sm:text-4xl">
                            Recognition & Milestones
                        </h3>
                        <p className="text-slate-400">Our journey of innovation and achievement</p>
                    </div>

                    <div className="relative">
                        <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-emerald-500/50">
                            <HorizontalTimelineCard
                                year="2024"
                                title="3Zeros Innovate Challenge"
                                badge="First Runner-Up"
                                description="Family Planning Track - Recognized for innovative digital solutions in reproductive health."
                                icon={<TrophyIcon />}
                            />
                            <HorizontalTimelineCard
                                year="2024"
                                title="Youth & Women Hackathon"
                                badge="National Representative"
                                description="Selected to represent South Sudan in East Africa - showcasing youth leadership."
                                icon={<StarIcon />}
                            />
                            <HorizontalTimelineCard
                                year="2025"
                                title="GIZ Digital Health Grant"
                                badge="Finalist"
                                description="Youth-Led Digital Health Innovation Grant - Recognized for transformative solutions."
                                icon={<LightningIcon />}
                            />
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 to-green-500/5 backdrop-blur-sm">
                        <div className="grid lg:grid-cols-2">
                            {/* Content */}
                            <div className="p-12 lg:p-16 space-y-8">
                                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 backdrop-blur-sm">
                                    <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                                    </svg>
                                    <span className="text-sm font-medium text-emerald-300">Join Our Mission</span>
                                </div>
                                
                                <h3 className="text-4xl font-bold text-white lg:text-5xl">
                                    Be Part of the Change
                                </h3>
                                
                                <p className="text-lg text-slate-300 leading-relaxed">
                                    Partner with us to expand reproductive health access and create lasting impact across communities.
                                </p>

                                <div className="space-y-3">
                                    <CTAFeature text="Community-driven initiatives" />
                                    <CTAFeature text="Innovative digital solutions" />
                                    <CTAFeature text="Youth leadership programs" />
                                </div>
                                
                                <div className="flex flex-col gap-4 sm:flex-row pt-4">
                                    <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-8 py-4 font-semibold text-white shadow-lg shadow-emerald-500/25 transition-all hover:shadow-xl hover:shadow-emerald-500/40 hover:scale-105">
                                        <span>Get Involved</span>
                                        <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                                        </svg>
                                    </button>
                                    <button className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-emerald-400/30 bg-emerald-400/5 px-8 py-4 font-semibold text-emerald-100 backdrop-blur-sm transition-all hover:border-emerald-400/50 hover:bg-emerald-400/10">
                                        <span>Learn More</span>
                                    </button>
                                </div>
                            </div>

                            {/* Visual Grid */}
                            <div className="relative hidden lg:block bg-gradient-to-br from-emerald-600/5 to-green-700/5">
                                <div className="grid h-full grid-cols-2 gap-4 p-8">
                                    <div className="space-y-4">
                                        <FeatureCard
                                            icon={<CheckIcon />}
                                            title="Community Impact"
                                            description="Grassroots change"
                                            gradient="from-emerald-500 to-green-600"
                                        />
                                        <FeatureCard
                                            icon={<LightningIcon />}
                                            title="Innovation"
                                            description="Digital solutions"
                                            gradient="from-green-500 to-teal-600"
                                        />
                                    </div>
                                    <div className="mt-8 space-y-4">
                                        <FeatureCard
                                            icon={<UsersIcon />}
                                            title="Leadership"
                                            description="Youth empowerment"
                                            gradient="from-teal-500 to-emerald-600"
                                        />
                                        <FeatureCard
                                            icon={<GlobeIcon />}
                                            title="Global Reach"
                                            description="Expanding impact"
                                            gradient="from-emerald-500 to-green-600"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Components
function QuickStat({ number, label }) {
    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10">
            <div className="text-2xl font-bold text-white sm:text-3xl">{number}</div>
            <div className="text-xs text-slate-400 sm:text-sm">{label}</div>
        </div>
    );
}

// Bento Stat Card Component
function BentoStatCard({ className, value, suffix = '', prefix = '', label, description, icon, gradient, featured = false }) {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div
            ref={cardRef}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:shadow-emerald-500/20 ${className} ${featured ? 'p-10 sm:p-12' : 'p-6 sm:p-8'}`}
        >
            {/* Gradient Glow */}
            <div className={`absolute ${featured ? '-right-20 -top-20 h-64 w-64' : '-right-10 -top-10 h-40 w-40'} rounded-full bg-gradient-to-br ${gradient} opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-30`}></div>
            
            <div className="relative">
                <div className={`${featured ? 'mb-8' : 'mb-6'} inline-flex ${featured ? 'h-20 w-20' : 'h-14 w-14'} items-center justify-center rounded-xl bg-gradient-to-br ${gradient} p-0.5 shadow-lg`}>
                    <div className="flex h-full w-full items-center justify-center rounded-xl bg-slate-900/90 backdrop-blur-sm">
                        {icon}
                    </div>
                </div>
                <div className={`mb-2 ${featured ? 'text-6xl sm:text-7xl' : 'text-4xl sm:text-5xl'} font-bold text-white`}>
                    {prefix}{count.toLocaleString()}{suffix}
                </div>
                <div className={`mb-2 ${featured ? 'text-2xl' : 'text-lg'} font-semibold text-emerald-300`}>{label}</div>
                <div className={`${featured ? 'text-base' : 'text-sm'} text-emerald-100/60`}>{description}</div>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}></div>
        </div>
    );
}

// Feature Card Component
function FeatureCard({ icon, title, description, gradient }) {
    return (
        <div className="group rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-lg">
            <div className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${gradient} shadow-lg`}>
                <div className="text-white [&>svg]:h-5 [&>svg]:w-5">
                    {icon}
                </div>
            </div>
            <h4 className="mb-1 font-bold text-white transition-colors group-hover:text-emerald-300">{title}</h4>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
    );
}

// Horizontal Timeline Card
function HorizontalTimelineCard({ year, title, badge, description, icon }) {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className={`group min-w-[340px] transition-all duration-700 sm:min-w-[380px] ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
        >
            <div className="relative overflow-hidden rounded-2xl border border-emerald-500/20 bg-white/5 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/40 hover:bg-white/10 hover:shadow-xl hover:shadow-emerald-500/20">
                {/* Year Badge */}
                <div className="absolute right-4 top-4 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 backdrop-blur-sm">
                    <span className="text-xs font-bold text-emerald-300">{year}</span>
                </div>

                <div className="p-6">
                    {/* Icon */}
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 shadow-lg shadow-emerald-500/30">
                        {icon}
                    </div>

                    {/* Content */}
                    <h4 className="mb-2 text-xl font-bold text-white">{title}</h4>
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-400/10 px-3 py-1">
                        <span className="text-xs font-medium text-emerald-300">{badge}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-100/70">{description}</p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </div>
        </div>
    );
}

// CTA Feature Item
function CTAFeature({ text }) {
    return (
        <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20">
                <svg className="h-4 w-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
            </div>
            <span className="text-emerald-100/80">{text}</span>
        </div>
    );
}

// Icon Components
function UsersIcon() {
    return (
        <svg className="h-10 w-10 text-white sm:h-12 sm:w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
    );
}

function FundingIcon() {
    return (
        <svg className="h-7 w-7 text-white sm:h-8 sm:w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.657 0-3-.895-3-2s1.343-2 3-2 3 .895 3 2-1.343 2-3 2z"></path>
        </svg>
    );
}

function TrophyIcon() {
    return (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
    );
}

function StarIcon() {
    return (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
        </svg>
    );
}

function LightningIcon() {
    return (
        <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
    );
}

function CheckIcon() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
    );
}

function GlobeIcon() {
    return (
        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
        </svg>
    );
}