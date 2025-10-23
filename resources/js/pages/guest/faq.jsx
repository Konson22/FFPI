import GuestFooter from '@/components/GuestFooter';
import GuestNavbar from '@/components/GuestNavbar';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestFAQ() {
    const [openItems, setOpenItems] = useState(new Set());

    const toggleItem = (index) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(index)) {
            newOpenItems.delete(index);
        } else {
            newOpenItems.add(index);
        }
        setOpenItems(newOpenItems);
    };

    const faqCategories = [
        {
            title: 'General Questions',
            icon: '❓',
            items: [
                {
                    question: 'What is the Future of Family Planning Initiative (FFPI)?',
                    answer: 'FFPI is a digital platform dedicated to improving reproductive health outcomes in South Sudan and East Africa. We provide comprehensive family planning services, health education, and community support through innovative digital solutions.',
                },
                {
                    question: 'Who can use the FFPI platform?',
                    answer: 'Our platform is designed for individuals seeking reproductive health information and services, healthcare professionals, and community advocates. We serve women, men, and youth across South Sudan and East Africa.',
                },
                {
                    question: 'Is the platform free to use?',
                    answer: 'Yes, our core services are free to use. We believe in making reproductive health information and basic services accessible to everyone. Some premium features and expert consultations may have associated costs.',
                },
                {
                    question: 'How do I get started?',
                    answer: 'Simply create an account on our platform, complete your profile, and explore our educational resources. You can also schedule a consultation with our healthcare experts for personalized guidance.',
                },
            ],
        },
        {
            title: 'Services & Features',
            icon: '🏥',
            items: [
                {
                    question: 'What services does FFPI offer?',
                    answer: 'We offer digital health tracking, educational resources on sexual and reproductive health, expert consultations, community support forums, and access to family planning services and information.',
                },
                {
                    question: 'How do I schedule a consultation with a healthcare expert?',
                    answer: 'You can schedule consultations through your dashboard. Navigate to the "Expert Consultations" section, choose your preferred expert, and select an available time slot. Consultations can be conducted via video call or in-person at our partner clinics.',
                },
                {
                    question: 'What educational resources are available?',
                    answer: 'We provide comprehensive learning modules on sexual and reproductive health, family planning methods, menstrual health, pregnancy care, and youth SRHR. All content is culturally sensitive and available in multiple local languages.',
                },
                {
                    question: 'Can I track my health data on the platform?',
                    answer: 'Yes, you can track your menstrual cycle, symptoms, medications, and other health indicators. Our platform uses this data to provide personalized insights and recommendations while maintaining your privacy.',
                },
            ],
        },
        {
            title: 'Privacy & Security',
            icon: '🔒',
            items: [
                {
                    question: 'How is my personal health information protected?',
                    answer: 'We use industry-standard encryption and security measures to protect your data. All health information is stored securely and is only accessible to you and healthcare professionals you explicitly authorize. We comply with international health data protection standards.',
                },
                {
                    question: 'Can I use the platform anonymously?',
                    answer: 'While you need to create an account to access most features, you can choose to use a pseudonym and limit the personal information you share. However, for expert consultations, some identification may be required for medical safety.',
                },
                {
                    question: 'Who can see my health data?',
                    answer: 'Your health data is private to you. Healthcare experts can only access your information during scheduled consultations with your explicit consent. We never share your data with third parties without your permission.',
                },
            ],
        },
        {
            title: 'Technical Support',
            icon: '💻',
            items: [
                {
                    question: 'What devices can I use to access the platform?',
                    answer: 'Our platform is accessible on smartphones, tablets, and computers through web browsers. We also have a mobile app available for download on Android and iOS devices.',
                },
                {
                    question: 'What if I have trouble accessing the platform?',
                    answer: 'If you experience technical difficulties, please contact our support team at futurefamilyplanning@gmail.com or call +211 922 618 621. We also provide troubleshooting guides in our help center.',
                },
                {
                    question: 'Do I need internet access to use the platform?',
                    answer: 'Yes, internet access is required for most features. However, we are working on offline capabilities for basic health tracking and educational content. Some features may work with limited connectivity.',
                },
                {
                    question: 'Is the platform available in local languages?',
                    answer: 'Yes, we support multiple local languages including Arabic, Dinka, Nuer, and English. You can change your language preference in your account settings.',
                },
            ],
        },
        {
            title: 'Community & Support',
            icon: '🤝',
            items: [
                {
                    question: 'How can I connect with other users?',
                    answer: 'Our platform includes community forums where you can connect with others on similar health journeys. You can join discussion groups, share experiences, and provide peer support in a safe, moderated environment.',
                },
                {
                    question: 'What if I need immediate medical help?',
                    answer: 'For medical emergencies, please contact emergency services immediately. Our platform is not a substitute for emergency medical care. For non-emergency health concerns, you can schedule a consultation with our healthcare experts.',
                },
                {
                    question: 'How can I provide feedback about the platform?',
                    answer: 'We welcome your feedback! You can submit feedback through your dashboard, email us at futurefamilyplanning@gmail.com, or participate in our user feedback surveys. Your input helps us improve our services.',
                },
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white">
            <Head title="FAQ - Future of Family Planning Initiative" />

            {/* Navigation */}
            <GuestNavbar />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 py-20">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="mb-6 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                            Frequently Asked
                            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">Questions</span>
                        </h1>
                        <p className="mx-auto max-w-3xl text-xl text-green-100">
                            Find answers to common questions about our platform, services, and how we're transforming reproductive health in South
                            Sudan and East Africa.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Content */}
            <div className="py-20">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    {faqCategories.map((category, categoryIndex) => (
                        <div key={categoryIndex} className="mb-16">
                            <div className="mb-8 flex items-center">
                                <span className="mr-4 text-4xl">{category.icon}</span>
                                <h2 className="text-3xl font-bold text-gray-900">{category.title}</h2>
                            </div>

                            <div className="space-y-4">
                                {category.items.map((item, itemIndex) => {
                                    const globalIndex = `${categoryIndex}-${itemIndex}`;
                                    const isOpen = openItems.has(globalIndex);

                                    return (
                                        <div key={itemIndex} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-lg">
                                            <button
                                                onClick={() => toggleItem(globalIndex)}
                                                className="w-full px-6 py-6 text-left transition-all duration-300 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:outline-none"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <h3 className="pr-4 text-lg font-semibold text-gray-900">{item.question}</h3>
                                                    <div className="flex-shrink-0">
                                                        <svg
                                                            className={`h-6 w-6 text-green-600 transition-transform duration-300 ${
                                                                isOpen ? 'rotate-180' : ''
                                                            }`}
                                                            fill="none"
                                                            stroke="currentColor"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </button>

                                            <div
                                                className={`transition-all duration-300 ease-in-out ${
                                                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                                                }`}
                                            >
                                                <div className="px-6 pb-6">
                                                    <div className="border-t border-gray-100 pt-4">
                                                        <p className="leading-relaxed text-gray-700">{item.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-500 to-teal-600 py-16">
                <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
                    <h2 className="mb-4 text-3xl font-bold text-white">Still have questions?</h2>
                    <p className="mb-8 text-xl text-blue-100">Our support team is here to help you with any questions or concerns.</p>
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <a
                            href="mailto:futurefamilyplanning@gmail.com"
                            className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                            Email Us
                        </a>
                        <a
                            href="tel:+211922618621"
                            className="inline-flex items-center justify-center rounded-full border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-white hover:text-blue-600"
                        >
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                            </svg>
                            Call Us
                        </a>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <GuestFooter />
        </div>
    );
}
