import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const lastUpdated = 'January 3, 2026';

    return (
        <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
            <Head title="Privacy Policy - Family Future Planning Initiative" />
            <GuestNavbar />

            <main>
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-emerald-900 to-green-800 py-20 sm:py-28">
                    <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
                    <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">Privacy Policy</h1>
                            <p className="mx-auto mt-6 max-w-2xl text-xl text-emerald-100">
                                We are committed to protecting your personal information and your right to privacy.
                            </p>
                            <p className="mt-4 text-sm font-medium tracking-widest text-emerald-200 uppercase">Last Updated: {lastUpdated}</p>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative mx-auto -mt-16 max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                    <div className="rounded-2xl bg-white p-8 shadow-xl sm:p-12 lg:p-16">
                        <div className="max-w-none text-gray-600">
                            <p className="mb-6 text-xl text-gray-700">
                                This Privacy Policy describes usage of the <strong>Family Future Planning Initiative (FFPI)</strong> application and
                                website. This policy explains what information we collect, how it is used, and what steps we take to ensure your
                                personal data is secure.
                            </p>

                            <p className="mb-4 leading-relaxed">
                                By accessing or using our Service, you signify that you have read, understood, and agree to our collection, storage,
                                use, and disclosure of your personal information as described in this Privacy Policy. This policy is designed to
                                comply with global privacy standards, including requirements for the Google Play Store.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">1. Information We Collect</h2>
                            <p className="mb-4 leading-relaxed">
                                We collect information to provide better services to all our users. The types of information we collect include:
                            </p>

                            <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">1.1 Personal Information</h3>
                            <p className="mb-4 leading-relaxed">
                                While using our Service, we may ask you to provide us with certain personally identifiable information that can be
                                used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited
                                to:
                            </p>
                            <ul className="mb-6 list-disc space-y-2 pl-6">
                                <li>Email address</li>
                                <li>First name and last name</li>
                                <li>Phone number</li>
                                <li>Demographic information (such as gender and age)</li>
                                <li>Health-related information (only if you explicitly choose to track it within the app)</li>
                            </ul>

                            <h3 className="mt-8 mb-4 text-xl font-semibold text-gray-800">1.2 Usage Data & Device Information</h3>
                            <p className="mb-4 leading-relaxed">
                                When you access the Service by or through a mobile device, we may collect certain information automatically,
                                including, but not limited to, the type of mobile device you use, your mobile device unique ID, the IP address of your
                                mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers
                                and other diagnostic data.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">2. How We Use Your Information</h2>
                            <p className="mb-4 leading-relaxed">We use the collected data for various purposes:</p>
                            <ul className="mb-6 list-disc space-y-2 pl-6">
                                <li>To provide and maintain the Service</li>
                                <li>To notify you about changes to our Service</li>
                                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                                <li>To provide customer care and support</li>
                                <li>To provide analysis or valuable information so that we can improve the Service</li>
                                <li>To monitor the usage of the Service</li>
                                <li>To detect, prevent and address technical issues</li>
                            </ul>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">3. Health Data Privacy</h2>
                            <div className="my-6 rounded-r-lg border-l-4 border-emerald-500 bg-emerald-50 p-6">
                                <p className="m-0 font-medium text-emerald-800">
                                    <strong>Important Note on Sensitive Data:</strong> Your health and family planning data is treated with the
                                    highest level of confidentiality. We do not sell your personal health data to third parties. Any health metrics or
                                    tracking data you input is used solely to provide you with insights and records within the application.
                                </p>
                            </div>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">4. Data Retention</h2>
                            <p className="mb-4 leading-relaxed">
                                We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We
                                will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if
                                we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal
                                agreements and policies.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">5. Disclosure of Data</h2>
                            <p className="mb-4 leading-relaxed">
                                We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the
                                Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not
                                to disclose or use it for any other purpose.
                            </p>
                            <p className="mt-4 mb-2 border-l-4 border-gray-300 pl-4 text-gray-600 italic">
                                <strong>Legal Requirements:</strong> We may disclose your Personal Data in the good faith belief that such action is
                                necessary to:
                            </p>
                            <ul className="mb-6 list-disc space-y-2 pl-6">
                                <li>To comply with a legal obligation</li>
                                <li>To protect and defend the rights or property of FFPI</li>
                                <li>To prevent or investigate possible wrongdoing in connection with the Service</li>
                                <li>To protect the personal safety of users of the Service or the public</li>
                            </ul>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">6. Security of Data</h2>
                            <p className="mb-4 leading-relaxed">
                                The security of your data is important to us, but remember that no method of transmission over the Internet, or method
                                of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal
                                Data, we cannot guarantee its absolute security. We utilize standard encryption protocols (HTTPS/TLS) for data
                                transmission.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">7. Children's Privacy</h2>
                            <p className="mb-4 leading-relaxed">
                                Our Service generally addresses a general audience. However, given the nature of Family Planning, some content may be
                                relevant to young adults. We do not knowingly collect personally identifiable information from anyone under the age of
                                13 without parental consent. If you are a parent or guardian and you are aware that your Children has provided us with
                                Personal Data, please contact us. If we become aware that we have collected Personal Data from children without
                                verification of parental consent, we take steps to remove that information from our servers.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">8. Changes to This Privacy Policy</h2>
                            <p className="mb-4 leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
                                Policy on this page.
                            </p>
                            <p className="mb-4 leading-relaxed">
                                We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and
                                update the "effective date" at the top of this Privacy Policy. You are advised to review this Privacy Policy
                                periodically for any changes.
                            </p>

                            <h2 className="mt-12 mb-6 text-2xl font-bold text-gray-900">9. Contact Us</h2>
                            <p className="mb-4 leading-relaxed">If you have any questions about this Privacy Policy, please contact us:</p>
                            <div className="mt-6 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-base text-gray-600">
                                        <p>
                                            By email:{' '}
                                            <a href="mailto:privacy@ffpi.org" className="font-semibold text-emerald-700 hover:text-emerald-500">
                                                info@ffpi-ss.org
                                            </a>
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                            />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-3 text-base text-gray-600">
                                        <p>Address: Juba, South Sudan</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <GuestFooter />
        </div>
    );
}
