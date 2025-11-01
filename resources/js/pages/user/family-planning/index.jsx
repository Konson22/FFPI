import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function FamilyPlanning({ user }) {
    const categories = ['All', 'Short-acting', 'Long-acting', 'Permanent', 'Natural & emergency'];
    const tabs = ['Overview', 'Long-acting', 'Permanent', 'Emergency'];
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedTab, setSelectedTab] = useState('Overview');

    const methodGroups = [
        {
            key: 'short',
            title: 'Short-acting Methods',
            subtitle: 'Pills, condoms, injectables',
            icon: '💊',
            bullets: [
                'Pills: Daily tablets. Most combined pills also improve cramps/flow. Must take around the same time each day.',
                'Condoms: Only method that also protects against STIs. Use every time, from start to finish.',
                'Injectables: Given every 2–3 months at a clinic. Very effective if injections are on time.',
                'Pros: Quick to start/stop; widely available; low upfront cost.',
                'Considerations: Need routine adherence (daily pills/on-time shots). Side effects can include spotting, nausea, or weight/appetite changes.',
            ],
        },
        {
            key: 'long',
            title: 'Long-acting Methods',
            subtitle: 'Implants, IUDs',
            icon: '⏰',
            bullets: [
                'Implants: Tiny rods in the arm. >99% effective for 3–5 years. Light, irregular bleeding is common.',
                'IUDs: Copper (non‑hormonal) or hormonal. Lasts 3–10+ years depending on type. Inserted by a provider.',
                'Pros: "Set and forget," highest effectiveness, rapid return to fertility after removal.',
                'Considerations: Requires insertion/removal procedure; copper IUD may increase period flow/cramps initially.',
            ],
        },
        {
            key: 'perm',
            title: 'Permanent Methods',
            subtitle: 'Tubal ligation, vasectomy',
            icon: '🔒',
            bullets: [
                'Effectiveness: >99% after confirmation. Intended for those who are sure they don't want future pregnancy.',
                'Procedures: Outpatient, quick recovery for most. Does not affect hormones or sexual function.',
                'Considerations: Generally not reversible; does not protect against STIs.',
            ],
        },
        {
            key: 'natural',
            title: 'Natural & Emergency Methods',
            subtitle: 'FAMs, emergency pills',
            icon: '📅',
            bullets: [
                'Fertility awareness (FAM): Track cycle length, temperature, and cervical mucus. Requires training, daily tracking, and partner cooperation.',
                'Withdrawal/abstinence: Can reduce risk when used correctly; typical‑use failure rates are higher.',
                'Emergency contraception: Pills within 3–5 days after unprotected sex; sooner is better. Copper IUD works as emergency contraception and ongoing protection.',
                'Considerations: Natural methods demand consistency; EC is for emergencies, not a regular method. Condoms recommended for STI protection.',
            ],
        },
    ];

    const larc = {
        similarities: [
            'Both are long-acting reversible contraception (LARC) with <1% first-year pregnancy risk.',
            'Inserted and removed by a clinician; fertility returns quickly after removal.',
            'Higher upfront cost but cost-effective over time; do not protect against STIs (use condoms).',
        ],
        howTheyWork: {
            iud: [
                'Hormonal IUD: releases progestin to thicken cervical mucus, suppress ovulation, and thin uterine lining.',
                'Copper IUD: copper is toxic to sperm and prevents implantation.',
            ],
            implant: ['Small rod under upper arm skin releases progestin; suppresses ovulation and thickens cervical mucus.'],
        },
        duration: {
            iud: [
                'Copper (Paragard): up to 10 years',
                'Hormonal: Mirena (8y), Liletta (up to 8y), Kyleena (5y), Skyla (3y) — provider may individualize longer use',
            ],
            implant: ['Up to 3 years (brand dependent)'],
        },
        startWorking: {
            iud: [
                'Copper IUD: immediate upon insertion',
                'Hormonal IUD: immediate if placed in first 7 days of period; otherwise use backup for up to 7 days',
            ],
            implant: ['Immediate if inserted in first 5 days of period; otherwise use condoms for at least 7 days'],
        },
        sideEffects: {
            iud: [
                'Hormonal: lighter periods, cramps may improve; irregular bleeding/spotting in first 3–6 months',
                'Copper: heavier bleeding, cramps, and spotting may occur initially',
                'Strings may feel stiff at first, usually soften over time',
            ],
            implant: [
                'Very light or absent periods common; spotting in first 6–12 months most common',
                'Possible headaches, breast tenderness, acne, mood changes (generally uncommon)',
            ],
        },
        safety: {
            avoidIudIf: [
                'Unexplained vaginal bleeding',
                'Cervical or uterine cancer',
                'AIDS (uncontrolled), pregnancy, or high risk for STD/PID',
                'Severe liver disease/tumors, certain uterine anatomical issues',
            ],
            avoidImplantIf: ['Pregnancy', 'Liver disease', 'History of breast cancer', 'Unexplained vaginal bleeding'],
        },
        complications: {
            iud: [
                'Expulsion (device comes out); check if strings are not palpable or symptoms occur',
                'Uterine perforation during insertion (rare)',
                'Infection risk mainly within first 20 days post-insertion',
                'Ectopic pregnancy risk is higher if pregnancy occurs with IUD in place (rare overall)',
            ],
            implant: [
                'Migration/partial extrusion (more likely in first month)',
                'Device damage with arm trauma; rare breakage',
                'Minor scarring at insertion site',
                'Ectopic pregnancy risk higher if pregnancy occurs (rare overall)',
            ],
        },
        removal: [
            'IUD: strings grasped and device removed in clinic; quick procedure; can replace same visit',
            'Implant: local anesthesia, small incision to remove; quick; can replace same procedure',
        ],
        cost: [
            'Insurance or clinics may cover fully or partially; verify with insurer/clinic',
            'Implant: around $1,000 plus placement/removal fees; lasts up to 3 years',
            'IUD: up to about $1,300 depending on type; lasts 3–10+ years',
        ],
        takeaways: [
            'Both methods are very effective, long-lasting, and reversible',
            'Consider duration preference, pain relief goals, and comfort with pelvic exam',
            'Discuss side effects and insertion experience expectations with your provider',
        ],
    };

    const emergency = {
        overview: [
            'All listed options are safe and effective for a single episode of unprotected intercourse',
            'Most effective within 5 days; sooner is better',
        ],
        options: [
            'Mifepristone (one-time dose): more effective than levonorgestrel; moderate dose (25–50 mg) > low dose',
            'Ulipristal (30 mg one-time): more effective than levonorgestrel',
            'Levonorgestrel (1.5 mg one-time or split dose): effective and widely available',
            'Copper IUD: at least as effective as mifepristone in limited comparisons; also provides ongoing contraception',
        ],
        adverse: [
            'Oral medications: nausea/vomiting most common; mifepristone may delay menses; ulipristal may delay menses vs. levonorgestrel',
            'Copper IUD: abdominal pain, heavier bleeding possible; rare uterine perforation/expulsion',
        ],
        guidance: [
            'Guidelines support ulipristal, levonorgestrel, and copper IUD as effective EC options',
            'If only combined ethinyl estradiol/levonorgestrel is available, dosing familiarity is important',
        ],
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/family-planning">
            <Head title="Family Planning" />
            <div className="mx-auto max-w-6xl">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900">Family Planning</h1>
                    <p className="mt-3 text-lg text-gray-600">Comprehensive guide to methods, best practices, and how to choose what works for you</p>
                </div>

                {/* Tabs */}
                <div className="mb-6 flex flex-wrap gap-2 border-b border-gray-200">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            type="button"
                            onClick={() => setSelectedTab(tab)}
                            className={`rounded-t-lg px-4 py-3 text-sm font-semibold transition-colors ${
                                selectedTab === tab
                                    ? 'border-b-2 border-green-600 bg-white text-green-600'
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Category filter (Overview tab only) */}
                {selectedTab === 'Overview' && (
                    <div className="mb-6 flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                type="button"
                                onClick={() => setSelectedCategory(cat)}
                                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                                    selectedCategory === cat
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Methods overview */}
                {selectedTab === 'Overview' && (
                    <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                        {(selectedCategory === 'All' ? methodGroups : methodGroups.filter((g) => g.title.includes(selectedCategory))).map((group) => (
                            <div
                                key={group.key}
                                className="group rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-green-300 hover:shadow-md"
                            >
                                <div className="mb-4 flex items-center gap-4">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-green-50 text-3xl">
                                        {group.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{group.title}</h3>
                                        <p className="mt-1 text-sm text-gray-600">{group.subtitle}</p>
                                    </div>
                                </div>
                                <ul className="space-y-2.5 text-sm text-gray-700">
                                    {group.bullets.map((text, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{text}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {/* Permanent methods: in-depth */}
                {(selectedTab === 'Overview' && (selectedCategory === 'All' || selectedCategory === 'Permanent')) || selectedTab === 'Permanent' ? (
                    <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-50 text-2xl">
                                    🔒
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Tubal Ligation</h3>
                            </div>
                            <ul className="space-y-2.5 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Permanent contraception: blocks or removes fallopian tubes so egg and sperm can't meet.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Effectiveness: about 1% failure overall; near-zero with complete tube removal (bilateral salpingectomy).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Hormones/periods: no change to hormones, periods, libido, or sexual function.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>
                                    Approaches: after birth (vaginal or C‑section) or laparoscopic as outpatient; skin closed with dissolvable
                                    sutures.
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Recovery: typically 2 weeks for interval laparoscopy; 6 weeks if done at C‑section.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Eligibility: generally age ≥18; some insurers require age ≥21 and advance consent.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Ovarian cancer: removing tubes can reduce lifetime risk (≈50% with bilateral salpingectomy; ≈25% partial).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>Reversal: possible but not guaranteed (live birth ≈50%; ectopic risk 2–3%); consider permanence carefully.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                    <span>STIs: does not protect; use condoms for STI prevention.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center gap-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-2xl">
                                    🔒
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Vasectomy</h3>
                            </div>
                            <ul className="space-y-2.5 text-sm text-gray-700">
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Permanent contraception for men: cuts/seals the vas deferens to block sperm.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Technique: no‑scalpel approach via tiny opening; local anesthesia; outpatient ≈20 minutes.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Effectiveness: among the lowest failure rates of all methods (≈0.03–0.05%).</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Not immediately sterile: backup needed until semen test at ≈3 months confirms no sperm.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Recovery: light activity same day; avoid sex/heavy lifting for ≈7 days; quick return to work.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>
                                    Sexual function: no effect on erections, libido, orgasm, or testosterone; semen volume unchanged (without sperm).
                                    </span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Risks: no increased risk of prostate cancer or testicular atrophy; sperm reabsorbed naturally.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>Reversal: possible but costly and often not covered; choose only if quite certain.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                    <span>STIs: does not protect; condoms recommended for STI prevention.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : null}

                {/* IUD vs Implant organized content */}
                {(selectedTab === 'Overview' && (selectedCategory === 'All' || selectedCategory === 'Long-acting')) ||
                selectedTab === 'Long-acting' ? (
                    <div className="mb-8 space-y-6">
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">IUD vs Implant: Similarities</h3>
                                <ul className="space-y-2.5 text-sm text-gray-700">
                                    {larc.similarities.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">How They Work</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">IUD</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.howTheyWork.iud.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">Implant</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.howTheyWork.implant.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Duration</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">IUD</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.duration.iud.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">Implant</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.duration.implant.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">When They Start Working</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">IUD</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.startWorking.iud.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">Implant</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.startWorking.implant.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Side Effects</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">IUD</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.sideEffects.iud.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">Implant</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.sideEffects.implant.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Safety Considerations</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-amber-700">Avoid IUD if</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.safety.avoidIudIf.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-amber-700">Avoid Implant if</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.safety.avoidImplantIf.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Possible Complications</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">IUD</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.complications.iud.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-800">Implant</p>
                                        <ul className="space-y-1.5 text-sm text-gray-700">
                                            {larc.complications.implant.map((t, i) => (
                                                <li key={i} className="flex items-start gap-2">
                                                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                                                    <span>{t}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Removal Process</h3>
                                <ul className="space-y-2.5 text-sm text-gray-700">
                                    {larc.removal.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Cost Information</h3>
                                <ul className="space-y-2.5 text-sm text-gray-700">
                                    {larc.cost.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-xl font-bold text-gray-900">Key Takeaways</h3>
                                <ul className="space-y-2.5 text-sm text-gray-700">
                                    {larc.takeaways.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ) : null}

                {/* Emergency Contraception */}
                {(selectedTab === 'Overview' && (selectedCategory === 'All' || selectedCategory === 'Natural & emergency')) ||
                selectedTab === 'Emergency' ? (
                    <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-amber-50 text-2xl">
                                ⚠️
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Emergency Contraception</h3>
                        </div>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            <div>
                                <p className="mb-3 text-sm font-semibold text-gray-800">Overview</p>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {emergency.overview.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-6 mb-3 text-sm font-semibold text-gray-800">Options</p>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {emergency.options.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="mb-3 text-sm font-semibold text-gray-800">Adverse Effects</p>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {emergency.adverse.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-6 mb-3 text-sm font-semibold text-gray-800">Guidance</p>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    {emergency.guidance.map((t, i) => (
                                        <li key={i} className="flex items-start gap-2">
                                            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500"></span>
                                            <span>{t}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <p className="mt-6 text-xs text-gray-500 italic">Note: Copper IUD also serves as ongoing contraception after EC use.</p>
                    </div>
                ) : null}

                {/* CTA */}
                <div className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white shadow-lg">
                    <h3 className="text-2xl font-bold">Need Personalized Guidance?</h3>
                    <p className="mt-2 text-green-100">Talk to a trusted provider to choose or change a method that fits you.</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <a
                            href="/user/services"
                            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-emerald-700 shadow-md transition-all hover:bg-green-50 hover:shadow-lg"
                        >
                            Find Services Near You
                        </a>
                        <a
                            href="/user/ask"
                            className="rounded-lg border-2 border-white/60 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:border-white"
                        >
                            Ask an Expert
                        </a>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
