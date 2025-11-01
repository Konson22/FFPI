import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';

export default function FamilyPlanningPage() {
    return (
        <div>
            <GuestNavbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 py-16 sm:py-20">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 via-teal-500/20 to-cyan-500/20"></div>
                <div className="absolute -top-4 -right-4 h-32 w-32 rounded-full bg-white/10"></div>
                <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/5"></div>
                <div className="absolute top-1/2 right-1/4 h-16 w-16 rounded-full bg-white/5"></div>

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        {/* Badge */}
                        <div className="mb-6 inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm">
                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Climate Change & SRHR
                        </div>

                        {/* Main Heading */}
                        <h1 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                            Climate Change and Sexual &
                            <span className="block bg-gradient-to-r from-white via-emerald-100 to-teal-100 bg-clip-text text-transparent">
                                Reproductive Health & Rights
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-white/90 sm:text-lg">
                            Toward realization of rights and resilience. Climate resilience and gender equality are inextricably linked, and SRHR are
                            an essential element of gender equality.
                        </p>
                    </div>
                </div>
            </section>

            {/* Introduction Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Understanding the Intersection</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            The impacts of climate change negatively affect people's SRHR, creating complex challenges that require integrated
                            solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
                        <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 p-8">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">What is Climate Change?</h3>
                            <p className="mb-4 text-lg text-gray-700">
                                Climate change is an increase in the average global temperature caused by increases in the concentration of greenhouse
                                gases in the atmosphere due to human activities.
                            </p>
                            <div className="mt-6 space-y-3">
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-emerald-500"></div>
                                    <p className="text-gray-700">Rising temperatures</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-teal-500"></div>
                                    <p className="text-gray-700">Sea-level rise</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-cyan-500"></div>
                                    <p className="text-gray-700">More frequent and severe extreme weather events</p>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                                    <p className="text-gray-700">Changing weather patterns</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="mb-4 text-2xl font-bold text-gray-900">What is SRHR?</h3>
                            <p className="mb-4 text-lg text-gray-700">
                                The realization of SRHR enables people to achieve a state of well-being in relation to sexual and reproductive health.
                                This is grounded in human rights, including the right to make decisions about sex and reproduction and to freely
                                define sexual orientation and gender identity.
                            </p>
                            <p className="mb-6 text-lg text-gray-700">
                                SRHR comprises issues such as maternal and newborn health, access to contraception, safe abortion and post-abortion
                                care, and gender-based violence (GBV).
                            </p>
                            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-6">
                                <p className="text-sm font-semibold text-emerald-900">
                                    SRHR is essential for living free from discrimination, coercion, and violence.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Impacts Section */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">⚠️</span>
                            How Climate Change Affects SRHR
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Direct and Indirect Impacts</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Climate change creates both direct and indirect impacts on sexual and reproductive health and rights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {/* Direct Impacts */}
                        <div className="rounded-xl border border-red-200 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                    <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Direct Impacts</h3>
                            </div>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Disruptions in sexual and reproductive health services caused by extreme weather events</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Effects of climate-sensitive diseases on pregnant women</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Heat stress and extreme weather events affecting maternal and child health outcomes</span>
                                </li>
                            </ul>
                        </div>

                        {/* Indirect Impacts */}
                        <div className="rounded-xl border border-orange-200 bg-white p-8 shadow-sm">
                            <div className="mb-4 flex items-center space-x-3">
                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                                    <svg className="h-6 w-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Indirect Impacts</h3>
                            </div>
                            <ul className="space-y-4 text-gray-700">
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Increased incidence of gender-based violence—including early marriage, sexual violence, and sex
                                        trafficking—during times of scarcity and crisis
                                    </span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>
                                        Financial difficulties caused by climate shocks and stresses acting as barriers to accessing sexual and
                                        reproductive health services
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 rounded-xl border border-yellow-200 bg-yellow-50 p-6">
                        <p className="text-center font-semibold text-yellow-900">
                            ⚠️ These impacts affect people who already face barriers to realizing their SRHR more significantly than others.
                        </p>
                    </div>
                </div>
            </section>

            {/* Vulnerable Groups Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">👥</span>
                            Vulnerable Groups
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">Who is Most Affected?</h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Certain groups face greater barriers to realizing their SRHR, especially in the context of climate change
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg border border-pink-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                                <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Girls and Women</h3>
                            <p className="text-gray-600">
                                Face greater barriers due to persistent gender inequalities that limit decision-making power and access to information
                                and services.
                            </p>
                        </div>

                        <div className="rounded-lg border border-purple-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">SOGIESC Groups</h3>
                            <p className="text-gray-600">
                                People of underrepresented sexual orientations, gender identities, and/or expression face barriers due to social
                                stigma, legal discrimination, and criminalization.
                            </p>
                        </div>

                        <div className="rounded-lg border border-blue-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Racial & Ethnic Minorities</h3>
                            <p className="text-gray-600">
                                Racial discrimination and denial of rights negatively impact the sexual and reproductive health of ethnic and racial
                                minorities and Indigenous peoples.
                            </p>
                        </div>

                        <div className="rounded-lg border border-teal-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                                <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">People with Disabilities</h3>
                            <p className="text-gray-600">
                                Sexual and reproductive health information and services may not be accessible, and they may be more at risk of
                                gender-based violence.
                            </p>
                        </div>

                        <div className="rounded-lg border border-red-200 bg-white p-6 shadow-sm md:col-span-2 lg:col-span-1">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Humanitarian Settings</h3>
                            <p className="text-gray-600">
                                Climate change compounds other crises, including conflict and fragility, making it even more difficult for people
                                living in humanitarian settings to realize their SRHR.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solutions Section */}
            <section className="bg-gradient-to-br from-emerald-50 to-teal-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
                            <span className="mr-2">✅</span>
                            How SRHR Supports Climate Resilience
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                            Realization of SRHR Can Support Climate Resilience
                        </h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            When people can realize their SRHR, they are better equipped to adapt to and mitigate the impacts of climate change
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                        <div className="rounded-xl bg-white p-8 shadow-lg">
                            <h3 className="mb-4 text-xl font-bold text-gray-900">Without SRHR</h3>
                            <p className="mb-6 text-gray-700">
                                When people are not able to realize their SRHR, they cannot live their full potential. This results in:
                            </p>
                            <ul className="space-y-3 text-gray-700">
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Decreased opportunities to pursue education</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Reduced ability to improve livelihoods</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Less access to resources and services</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Reduced ability to participate in politics and community affairs</span>
                                </li>
                            </ul>
                        </div>

                        <div className="rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 p-8 text-white shadow-lg">
                            <h3 className="mb-4 text-xl font-bold">With SRHR Realized</h3>
                            <p className="mb-6 text-emerald-50">
                                When people have realized their SRHR, their capacity to engage in climate change adaptation actions is greater. They
                                can:
                            </p>
                            <ul className="space-y-3 text-emerald-50">
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Make decisions to better manage risks</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Pursue new livelihood strategies</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Participate in politics and collective action</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Be more resilient to climate change impacts</span>
                                </li>
                                <li className="flex items-start space-x-3">
                                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Actively contribute to climate solutions</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gender-Responsive Approaches Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">🔧</span>
                            Solutions & Approaches
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                            Gender-Responsive Approaches to Climate Action
                        </h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            How can SRHR be addressed through climate adaptation planning?
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Gender-Disaggregated Analysis</h3>
                            <p className="text-gray-700">
                                Recognition of gender differences in adaptation needs and capacities, addressing particular groups including pregnant
                                women, people living with HIV/AIDS, adolescents, and people of underrepresented SOGIESC.
                            </p>
                        </div>

                        <div className="rounded-xl border border-purple-200 bg-purple-50 p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Gender-Equitable Participation</h3>
                            <p className="text-gray-700">
                                Involve gender, women's health, and underrepresented SOGIESC actors and advocates in adaptation planning,
                                implementation, monitoring & evaluation to ensure SRHR issues are addressed.
                            </p>
                        </div>

                        <div className="rounded-xl border border-green-200 bg-green-50 p-6">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-gray-900">Gender-Equitable Access to Finance</h3>
                            <p className="text-gray-700">
                                Design funding mechanisms and implementation strategies for adaptation actions in ways that recognize barriers faced
                                by people denied SRHR, for example by channeling funds to women's organizations working to address GBV.
                            </p>
                        </div>
                    </div>

                    {/* Case Study */}
                    <div className="mt-12 rounded-xl border border-emerald-200 bg-emerald-50 p-8">
                        <div className="mb-4 flex items-center space-x-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                                <svg className="h-6 w-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Case Study: Kiribati</h3>
                        </div>
                        <p className="text-gray-700">
                            In Kiribati, a gender analysis was completed to inform the update to their national plan for climate change adaptation.
                            The analysis highlighted SRHR-related issues, such as the fact that high fertility and low rates of contraceptive use
                            contribute to population growth, which in turn exacerbates vulnerability to climate change impacts. As a result, the plan
                            includes activities focused on women's health. This example demonstrates how a gender-responsive approach to adaptation
                            planning can support increased attention to SRHR issues.
                        </p>
                    </div>
                </div>
            </section>

            {/* What is Needed Section */}
            <section className="bg-gray-50 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center sm:mb-16">
                        <div className="mb-4 inline-flex items-center rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                            <span className="mr-2">💡</span>
                            What is Needed
                        </div>
                        <h2 className="mb-6 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
                            Better Linking Climate Change Adaptation and SRHR
                        </h2>
                        <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg lg:text-xl">
                            Key actions needed to strengthen the connection between climate adaptation and sexual and reproductive health rights
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Data Collection</h3>
                            <p className="text-gray-600">
                                Strengthen the evidence base on the linkages between climate change and SRHR through collection and analysis of
                                disaggregated data.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100">
                                <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Gender Analysis</h3>
                            <p className="text-gray-600">
                                Use gender analysis to inform adaptation planning, applying a gender lens to highlight SRHR issues that inhibit
                                resilience.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Collaboration</h3>
                            <p className="text-gray-600">
                                Promote collaboration among actors focusing on gender, women's health, and adaptation to increase the likelihood of
                                SRHR issues being addressed.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Resilient Health Systems</h3>
                            <p className="text-gray-600">
                                Support development of resilient health systems through a holistic approach that addresses climate risks while
                                addressing SRHR and other health concerns.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Disaster Risk Management</h3>
                            <p className="text-gray-600">
                                Address SRHR in mechanisms to prepare for, respond to, and recover from climate-related disasters, ensuring continued
                                provision of SRHR services throughout crises.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-yellow-100">
                                <svg className="h-6 w-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Finance</h3>
                            <p className="text-gray-600">
                                Strategically combine different sources of finance to promote integrated approaches to resilience, supporting
                                adaptation finance with health funding to address underlying causes of vulnerability.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Monitoring & Evaluation</h3>
                            <p className="text-gray-600">
                                Integrate gender and SRHR in M&E systems for adaptation, applying a gender lens to identify impacts of climate change
                                and adaptation actions on SRHR.
                            </p>
                        </div>

                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                                <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-gray-900">Policy Alignment</h3>
                            <p className="text-gray-600">
                                Align adaptation planning processes with other gender- and health-related policies to ensure adaptation actions
                                connect with and build on efforts to promote SRHR.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="bg-gradient-to-r from-emerald-600 to-teal-600 py-12 sm:py-16">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-white sm:text-3xl">Working Together for Rights and Resilience</h2>
                        <p className="mb-8 text-lg text-emerald-100 sm:text-xl">
                            Climate resilience and gender equality are inextricably linked. Let's ensure that climate action works hand in hand with
                            efforts to realize SRHR.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <a
                                href="https://napglobalnetwork.org/srhr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-full bg-white px-8 py-3 text-lg font-semibold text-emerald-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                Learn More on NAP Global Network
                            </a>
                            <a
                                href={route('contact')}
                                className="inline-flex items-center rounded-full border-2 border-white/20 px-8 py-3 text-lg font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10"
                            >
                                Get Involved
                            </a>
                        </div>
                        <p className="mt-8 text-sm text-emerald-100">
                            Source:{' '}
                            <a
                                href="https://napglobalnetwork.org/srhr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline hover:text-white"
                            >
                                NAP Global Network - Climate Change and SRHR
                            </a>
                        </p>
                    </div>
                </div>
            </section>

            <GuestFooter />
        </div>
    );
}
