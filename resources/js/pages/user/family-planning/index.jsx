import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function FamilyPlanning({ user }) {
    const [expandedCard, setExpandedCard] = useState(null);
    const [expandedFAQ, setExpandedFAQ] = useState(null);
    const pregnancyTools = [
        {
            id: 1,
            title: 'Male Condoms',
            description:
                'Male condoms are thin sheaths made of latex, polyurethane, or polyisoprene that are worn over the penis during sexual intercourse. They act as a physical barrier that prevents sperm from entering the vagina, thereby reducing the chance of pregnancy. They also offer strong protection against sexually transmitted infections (STIs), including HIV. When used correctly and consistently, condoms are up to 98% effective.',
            how_it_works:
                'The condom blocks sperm from entering the vagina, preventing it from meeting an egg. It is a simple, accessible, and non-hormonal method of contraception.',
            usage_instructions: [
                'Check the expiry date before use.',
                'Open the package carefully without using teeth or sharp objects.',
                'Put it on before any genital contact begins.',
                'Hold the base of the condom while withdrawing to prevent slipping.',
            ],
            benefits: [
                'Prevents pregnancy effectively.',
                'Protects against STIs, including HIV.',
                'Affordable and easily accessible.',
                'No hormonal side effects.',
            ],
            drawbacks: ['Can break or slip off if not used correctly.', 'Some users may experience reduced sensitivity.'],
            image: 'https://example.com/images/male-condom.png',
            video: 'https://www.youtube.com/watch?v=EowM2Jv9s4E',
        },
        {
            id: 2,
            title: 'Female Condoms',
            description:
                'Female condoms are soft, loose-fitting pouches that are inserted into the vagina before sex. They act as a barrier to stop sperm from entering the uterus. Female condoms are a great option for women who prefer to have more control over protection. When used correctly, they are about 95% effective.',
            how_it_works:
                'The female condom lines the vaginal walls and blocks sperm from entering the uterus, providing a barrier that prevents pregnancy and reduces STI transmission.',
            usage_instructions: [
                'Insert into the vagina before sex.',
                'Ensure the inner ring is deep inside and the outer ring stays outside the vagina.',
                'After sex, twist and gently pull out the condom before disposing of it.',
            ],
            benefits: [
                'Gives women control over protection.',
                'Provides dual protection against pregnancy and STIs.',
                'Can be inserted hours before sex.',
            ],
            drawbacks: ['Less available and more expensive than male condoms.', 'Can be noisy or take practice to use correctly.'],
            image: 'https://example.com/images/female-condom.png',
            video: 'https://www.youtube.com/watch?v=5rhF5U9w7tY',
        },
        {
            id: 3,
            title: 'Birth Control Pills',
            description:
                'Birth control pills are hormonal tablets taken daily by women to prevent pregnancy. They work by stopping ovulation (the release of an egg) and thickening cervical mucus to block sperm. When used correctly, they are over 99% effective. They also regulate menstrual cycles and reduce menstrual cramps.',
            how_it_works:
                'The hormones in the pill stop ovulation and make it harder for sperm to reach an egg. They must be taken every day for maximum effectiveness.',
            usage_instructions: [
                'Take one pill every day at the same time.',
                'If you miss a pill, take it as soon as possible.',
                'Use backup protection if you miss multiple pills.',
            ],
            benefits: [
                'Highly effective when used correctly.',
                'Regulates menstrual cycles and reduces cramps.',
                'Can improve acne and reduce menstrual bleeding.',
            ],
            drawbacks: ['Does not protect against STIs.', 'Can cause mild side effects like nausea or mood changes.'],
            image: 'https://example.com/images/birth-control-pill.png',
            video: 'https://www.youtube.com/watch?v=ZxU2PpGQK7c',
        },
        {
            id: 4,
            title: 'Injectable Contraceptives',
            description:
                'Injectable contraceptives are hormone shots given every 2 or 3 months to prevent pregnancy. They release a hormone (progestin) that stops ovulation and thickens cervical mucus. They are highly effective (over 94%) and convenient for women who don’t want a daily pill.',
            how_it_works: 'The injection prevents ovulation and creates an environment that prevents sperm from reaching the egg.',
            usage_instructions: [
                'Administered by a healthcare provider every 8–12 weeks.',
                'Keep appointments on time for continuous protection.',
                'Report any side effects to your healthcare provider.',
            ],
            benefits: ['Highly effective and convenient.', 'Can reduce menstrual pain and bleeding.', 'Discreet and private method.'],
            drawbacks: ['Does not protect against STIs.', 'May cause irregular bleeding or delayed return to fertility.'],
            image: 'https://example.com/images/injectable.png',
            video: 'https://www.youtube.com/watch?v=gnl1JXl8rX0',
        },
        {
            id: 5,
            title: 'Implants',
            description:
                'Implants are small, flexible rods placed under the skin of a woman’s upper arm. They release hormones that prevent ovulation and thicken cervical mucus to block sperm. Implants provide protection for 3–5 years and are over 99% effective.',
            how_it_works:
                'The implant slowly releases hormones that prevent ovulation and change the cervical mucus, making it difficult for sperm to reach the egg.',
            usage_instructions: [
                'Inserted by a trained health professional.',
                'No daily action required after insertion.',
                'Can be removed anytime if pregnancy is desired.',
            ],
            benefits: ['Long-term and highly effective protection.', 'Reversible and easy to remove.', 'Suitable for women who can’t use estrogen.'],
            drawbacks: ['Does not protect against STIs.', 'May cause irregular bleeding in some users.'],
            image: 'https://example.com/images/implant.png',
            video: 'https://www.youtube.com/watch?v=Q0gXJoAqW8Q',
        },
        {
            id: 6,
            title: 'Intrauterine Device (IUD)',
            description:
                'An IUD is a small, T-shaped device inserted into the uterus by a healthcare provider. It can be hormonal or non-hormonal (copper). It prevents sperm from fertilizing an egg and can last between 5–10 years. It is one of the most effective reversible contraceptives.',
            how_it_works:
                'The IUD prevents sperm from reaching and fertilizing an egg. Hormonal IUDs also thicken cervical mucus, while copper IUDs create an environment toxic to sperm.',
            usage_instructions: [
                'Inserted and removed by a healthcare professional.',
                "Check for the IUD string regularly to ensure it's in place.",
                'Can be removed anytime if you wish to conceive.',
            ],
            benefits: ['Long-lasting (up to 10 years).', 'Highly effective and low maintenance.', 'Reversible at any time.'],
            drawbacks: ['Does not protect against STIs.', 'May cause cramps or spotting after insertion.'],
            image: 'https://example.com/images/iud.png',
            video: 'https://www.youtube.com/watch?v=ccL0k2PpIXo',
        },
        {
            id: 7,
            title: 'Emergency Contraceptive Pills (ECP)',
            description:
                "Emergency contraceptive pills, often called 'morning-after pills,' are used after unprotected sex or contraceptive failure. They contain hormones that delay ovulation or prevent fertilization. They are most effective when taken within 72 hours (3 days) after unprotected sex.",
            how_it_works: 'ECPs prevent or delay ovulation, stopping fertilization. They do not terminate an existing pregnancy.',
            usage_instructions: [
                'Take as soon as possible after unprotected sex.',
                'Follow the dosage instructions carefully.',
                'Do not use as a regular contraceptive method.',
            ],
            benefits: ['Provides backup protection after unprotected sex.', 'Easily accessible without prescription in many areas.'],
            drawbacks: ['Does not protect against STIs.', 'Less effective than regular contraception.', 'May cause temporary nausea or fatigue.'],
            image: 'https://example.com/images/emergency-pill.png',
            video: 'https://www.youtube.com/watch?v=VQG6uN3ITmY',
        },
        {
            id: 8,
            title: 'Withdrawal Method',
            description:
                "The withdrawal method (also called 'pulling out') involves the man withdrawing his penis from the vagina before ejaculation to prevent sperm from entering. It’s a natural method but requires great control and timing. It’s about 78% effective on average.",
            how_it_works:
                'By withdrawing before ejaculation, sperm are prevented from reaching the egg. However, pre-ejaculate fluid may still contain sperm, leading to pregnancy risk.',
            usage_instructions: ['Requires strong self-control and timing.', 'Best used with another method like condoms for added protection.'],
            benefits: ['Free and immediately available.', 'No hormonal side effects.'],
            drawbacks: ['High failure rate due to timing errors.', 'Does not protect against STIs.'],
            image: 'https://example.com/images/withdrawal.png',
            video: 'https://www.youtube.com/watch?v=HZw8zC0Xv_Y',
        },
    ];

    const pregnancyFAQ = [
        {
            question: 'What should I do if a condom breaks?',
            answer: 'If a condom breaks during sex, stop immediately and replace it with a new one. If you’re concerned about pregnancy, consider using emergency contraception within 72 hours. If STI exposure is possible, visit a health clinic for testing.',
        },
        {
            question: 'Can I reuse a condom?',
            answer: 'No. Condoms are designed for single use only. Reusing one can cause it to break or tear, increasing the risk of pregnancy and STIs.',
        },
        {
            question: 'Do birth control pills protect against STIs?',
            answer: 'No. Birth control pills only prevent pregnancy. To protect against STIs, use condoms in addition to the pill.',
        },
        {
            question: 'What if I miss my birth control pill?',
            answer: 'Take the missed pill as soon as you remember. If you miss more than one, take the most recent missed pill and use backup protection like condoms for the next 7 days.',
        },
        {
            question: 'Is it safe to use emergency pills more than once?',
            answer: 'Yes, it’s safe, but it should not be used as a regular contraceptive. Frequent use can cause irregular periods.',
        },
        {
            question: 'Do I need to rest after getting an IUD or implant?',
            answer: 'You can resume normal activities immediately after the procedure, but mild cramping or soreness may occur for a few days.',
        },
        {
            question: 'Can contraception cause infertility?',
            answer: 'No. Most contraceptive methods are fully reversible. Fertility usually returns soon after stopping them, although injectables may take a few months longer.',
        },
        {
            question: 'What’s the best method for young couples?',
            answer: 'Condoms are recommended as they protect against both pregnancy and STIs. Other methods like pills or injectables can be considered after consulting a healthcare provider.',
        },
    ];

    const getMethodIcon = (title) => {
        const icons = {
            'Male Condoms': '🛡️',
            'Female Condoms': '🛡️',
            'Birth Control Pills': '💊',
            'Injectable Contraceptives': '💉',
            Implants: '📌',
            'Intrauterine Device (IUD)': '🔷',
            'Emergency Contraceptive Pills (ECP)': '⚡',
            'Withdrawal Method': '⏸️',
        };
        return icons[title] || '💊';
    };

    const getMethodColor = (id) => {
        const colors = [
            'from-blue-500 to-blue-600',
            'from-pink-500 to-pink-600',
            'from-purple-500 to-purple-600',
            'from-green-500 to-green-600',
            'from-orange-500 to-orange-600',
            'from-teal-500 to-teal-600',
            'from-red-500 to-red-600',
            'from-indigo-500 to-indigo-600',
        ];
        return colors[(id - 1) % colors.length];
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/family-planning">
            <Head title="Pregnancy Prevention methods/tools" />

            <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600">
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                        <div className="text-center">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                                Pregnancy Prevention Methods & Tools
                            </h1>
                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-green-50">
                                Comprehensive guide to safe, effective contraception methods. Learn about each method, how they work, and choose
                                what's right for you.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    {/* Methods Grid */}
                    <div className="mb-16">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Available Methods</h2>
                            <p className="mt-2 text-gray-600">Explore different contraception options to find what works best for you</p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {pregnancyTools.map((tool) => (
                                <div
                                    key={tool.id}
                                    className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl"
                                >
                                    {/* Gradient Header */}
                                    <div className={`bg-gradient-to-r ${getMethodColor(tool.id)} p-6`}>
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-white/20 text-3xl backdrop-blur-sm">
                                                {getMethodIcon(tool.title)}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-white">{tool.title}</h3>
                                                <p className="mt-1 text-sm text-white/90">{tool.description.substring(0, 60)}...</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6">
                                        <div className="mb-4">
                                            <h4 className="mb-2 text-sm font-semibold text-gray-700">How it works:</h4>
                                            <p className="text-sm text-gray-600">{tool.how_it_works}</p>
                                        </div>

                                        {/* Expandable Content */}
                                        {expandedCard === tool.id ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <h4 className="mb-2 text-sm font-semibold text-gray-700">Usage Instructions:</h4>
                                                    <ul className="space-y-1 text-sm text-gray-600">
                                                        {tool.usage_instructions.map((instruction, idx) => (
                                                            <li key={idx} className="flex items-start gap-2">
                                                                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500"></span>
                                                                <span>{instruction}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                <div className="grid gap-4 md:grid-cols-2">
                                                    <div>
                                                        <h4 className="mb-2 text-sm font-semibold text-green-700">Benefits:</h4>
                                                        <ul className="space-y-1 text-sm text-gray-600">
                                                            {tool.benefits.map((benefit, idx) => (
                                                                <li key={idx} className="flex items-start gap-2">
                                                                    <span className="text-green-500">✓</span>
                                                                    <span>{benefit}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="mb-2 text-sm font-semibold text-amber-700">Considerations:</h4>
                                                        <ul className="space-y-1 text-sm text-gray-600">
                                                            {tool.drawbacks.map((drawback, idx) => (
                                                                <li key={idx} className="flex items-start gap-2">
                                                                    <span className="text-amber-500">•</span>
                                                                    <span>{drawback}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {tool.video && (
                                                    <div className="mt-4">
                                                        <a
                                                            href={tool.video}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-2 rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-200"
                                                        >
                                                            <span>▶</span>
                                                            Watch Video Guide
                                                        </a>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="mb-4 text-sm text-gray-600">{tool.description}</p>
                                            </div>
                                        )}

                                        {/* Toggle Button */}
                                        <button
                                            onClick={() => setExpandedCard(expandedCard === tool.id ? null : tool.id)}
                                            className="mt-4 w-full rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
                                        >
                                            {expandedCard === tool.id ? 'Show Less' : 'Learn More'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* FAQ Section */}
                    <div className="mb-16 rounded-2xl bg-white p-8 shadow-lg">
                        <div className="mb-8 text-center">
                            <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
                            <p className="mt-2 text-gray-600">Get answers to common questions about contraception</p>
                        </div>

                        <div className="space-y-4">
                            {pregnancyFAQ.map((faq, index) => (
                                <div
                                    key={index}
                                    className="overflow-hidden rounded-xl border border-gray-200 transition-all hover:border-green-300 hover:shadow-md"
                                >
                                    <button
                                        onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                        className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-gray-50"
                                    >
                                        <span className="flex-1 pr-4 font-semibold text-gray-900">{faq.question}</span>
                                        <span className="flex-shrink-0 text-2xl text-green-600">{expandedFAQ === index ? '−' : '+'}</span>
                                    </button>
                                    {expandedFAQ === index && (
                                        <div className="border-t border-gray-200 bg-gray-50 p-6">
                                            <p className="text-gray-700">{faq.answer}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-8 text-center shadow-xl">
                        <h3 className="text-2xl font-bold text-white">Need Personalized Guidance?</h3>
                        <p className="mt-2 text-green-50">Consult with a healthcare provider to find the best method for your needs</p>
                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                            <a
                                href="/user/services"
                                className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-700 shadow-md transition-all hover:bg-green-50 hover:shadow-lg"
                            >
                                Find Services Near You
                            </a>
                            <a
                                href="/user/ask"
                                className="rounded-lg border-2 border-white/60 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-all hover:border-white hover:bg-white/20"
                            >
                                Ask an Expert
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
