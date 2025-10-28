import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function RelationshipZone({ user }) {
    const [activeTab, setActiveTab] = useState('tips');
    const [selectedTip, setSelectedTip] = useState(null);

    const tabs = [
        { id: 'tips', name: 'Healthy Tips', icon: '💡' },
        { id: 'communication', name: 'Communication', icon: '💬' },
        { id: 'consent', name: 'Consent & Boundaries', icon: '✋' },
        { id: 'conflict', name: 'Conflict Resolution', icon: '🤝' },
    ];

    const detailedContent = {
        1: {
            title: 'Active Listening',
            fullDescription: 'Active listening is a fundamental skill in healthy relationships. It involves giving your partner your complete attention, both verbally and non-verbally.',
            keyPoints: [
                'Maintain eye contact and nod to show engagement',
                'Put away distractions like phones and turn off the TV',
                'Avoid interrupting or planning your response while they speak',
                'Ask clarifying questions to ensure understanding',
                'Reflect back what you heard to confirm comprehension',
                'Show empathy and validate their feelings'
            ],
            tips: [
                'Practice "I understand" statements before sharing your own thoughts',
                'Try to see things from their perspective, not just your own',
                'Avoid defensive reactions or taking things personally',
                'Take notes mentally on their key points',
                'Pause and think before responding'
            ],
            example: 'Example: When your partner says they felt ignored, instead of defending yourself, try: "I hear that you felt ignored when I was on my phone. Can you tell me more about what that felt like?"'
        },
        2: {
            title: 'Express Needs Clearly',
            fullDescription: 'Clear communication about your needs prevents misunderstandings and builds mutual respect. Using "I" statements helps express yourself without blame.',
            keyPoints: [
                'Use "I feel..." instead of "You always..." or "You never..."',
                'Be specific about what you need',
                'Choose the right time to have important conversations',
                'Avoid criticizing character - focus on behaviors',
                'Stay calm and composed when expressing needs',
                'Be open to your partner expressing their needs too'
            ],
            tips: [
                'Practice articulating your needs in advance if they\'re difficult',
                'Use specific examples, not generalizations',
                'Express appreciation when your needs are met',
                'Be willing to negotiate and compromise',
                'Remember that expressing needs is healthy, not selfish'
            ],
            example: 'Instead of: "You never help around the house!" Try: "I feel overwhelmed when I have to do all the housework alone. Could we discuss how to divide chores more fairly?"'
        },
        3: {
            title: 'Respect Boundaries',
            fullDescription: 'Understanding and respecting boundaries is crucial for healthy relationships. Boundaries protect both partners physically and emotionally.',
            keyPoints: [
                'Everyone has the right to set boundaries',
                'Boundaries should be communicated clearly and respectfully',
                'Boundaries may change over time - be flexible',
                'Respect physical, emotional, and digital boundaries',
                'It\'s okay to say no without explanation',
                'Apologize if you accidentally cross a boundary'
            ],
            tips: [
                'Ask if unsure about boundaries - don\'t assume',
                'Discuss boundaries regularly as the relationship evolves',
                'Recognize that boundaries are about self-care, not rejection',
                'Set your own boundaries clearly and enforce them kindly',
                'If boundaries keep changing, address the underlying concern'
            ],
            example: 'Physical boundary: "I\'m not comfortable with PDA (public displays of affection) around my family." This is valid and should be respected.'
        }
    };

    const healthyTips = [
        {
            id: 1,
            title: 'Active Listening',
            description:
                'Give your full attention when your partner is speaking. Put away distractions and focus on understanding their perspective.',
            category: 'communication',
            difficulty: 'Beginner',
        },
        {
            id: 2,
            title: 'Express Needs Clearly',
            description: 'Use "I" statements to express your feelings and needs without blaming or criticizing your partner.',
            category: 'communication',
            difficulty: 'Beginner',
        },
        {
            id: 3,
            title: 'Respect Boundaries',
            description: "Always ask for consent and respect your partner's physical and emotional boundaries.",
            category: 'consent',
            difficulty: 'Beginner',
        },
        {
            id: 4,
            title: 'Take Time for Yourself',
            description: 'Maintain your individual identity and interests. Healthy relationships allow space for personal growth.',
            category: 'tips',
            difficulty: 'Intermediate',
        },
        {
            id: 5,
            title: 'Handle Disagreements Constructively',
            description: 'Focus on the issue, not the person. Avoid personal attacks and work together to find solutions.',
            category: 'conflict',
            difficulty: 'Intermediate',
        },
        {
            id: 6,
            title: 'Show Appreciation',
            description: "Regularly express gratitude and appreciation for your partner's efforts and qualities.",
            category: 'tips',
            difficulty: 'Beginner',
        },
    ];

    const communicationSkills = [
        {
            skill: 'Non-Verbal Communication',
            description: 'Pay attention to body language, facial expressions, and tone of voice.',
            tips: [
                'Maintain eye contact when listening',
                'Use open body language',
                'Match your tone to your message',
                "Notice your partner's non-verbal cues",
            ],
        },
        {
            skill: 'Emotional Intelligence',
            description: "Recognize and manage your own emotions while being sensitive to your partner's feelings.",
            tips: [
                'Identify your emotional triggers',
                'Practice empathy and understanding',
                'Take breaks when emotions run high',
                "Validate your partner's feelings",
            ],
        },
        {
            skill: 'Conflict Resolution',
            description: 'Address disagreements in a healthy, constructive manner.',
            tips: [
                'Choose the right time and place',
                'Stay focused on the current issue',
                'Use "I" statements instead of "you" statements',
                'Look for win-win solutions',
            ],
        },
    ];

    const consentGuidelines = [
        {
            title: 'Clear Communication',
            description: "Always communicate clearly about what you want and what you're comfortable with.",
            examples: ['Ask "Is this okay?" before trying something new', 'Use clear, direct language', 'Check in regularly during intimate moments'],
        },
        {
            title: 'Respect "No"',
            description: 'Accept "no" immediately and without pressure or guilt.',
            examples: ["Never try to change someone's mind", "Don't make them feel guilty for saying no", 'Respect their decision without question'],
        },
        {
            title: 'Ongoing Consent',
            description: 'Consent is ongoing and can be withdrawn at any time.',
            examples: [
                'Check in regularly during intimate activities',
                'Be aware that consent can change',
                'Stop immediately if consent is withdrawn',
            ],
        },
    ];

    const filteredTips = healthyTips.filter((tip) => activeTab === 'tips' || tip.category === activeTab);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Beginner':
                return 'green';
            case 'Intermediate':
                return 'yellow';
            case 'Advanced':
                return 'red';
            default:
                return 'gray';
        }
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/relationships">
            <div>
                {/* Learn More Modal */}
                {selectedTip && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-2xl">
                            <div className="sticky top-0 border-b border-gray-200 bg-white px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">{selectedTip.title}</h2>
                                    <button
                                        onClick={() => setSelectedTip(null)}
                                        className="rounded-lg p-1 hover:bg-gray-100"
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="p-6">
                                <p className="mb-6 text-lg text-gray-700">{selectedTip.fullDescription}</p>

                                <div className="mb-6">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Key Points</h3>
                                    <div className="space-y-2">
                                        {selectedTip.keyPoints.map((point, index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                                <p className="text-sm text-gray-700">{point}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="mb-3 text-lg font-semibold text-gray-900">Practical Tips</h3>
                                    <div className="space-y-2">
                                        {selectedTip.tips.map((tip, index) => (
                                            <div key={index} className="flex items-start space-x-2">
                                                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                                                <p className="text-sm text-gray-700">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-lg bg-green-50 p-4">
                                    <h3 className="mb-2 text-sm font-semibold text-gray-900">Example</h3>
                                    <p className="text-sm text-gray-700">{selectedTip.example}</p>
                                </div>

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={() => setSelectedTip(null)}
                                        className="rounded-lg bg-green-600 px-6 py-2 font-medium text-white transition-colors hover:bg-green-700"
                                    >
                                        Got it!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-lg">
                    <h1 className="text-3xl font-bold">Relationship Zone</h1>
                    <p className="mt-2 text-green-100">Build healthy, respectful relationships with guidance and support</p>
                </div>
                {/* Tabs */}
                <div className="mb-8 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                        activeTab === tab.id
                                            ? 'border-green-500 text-green-600'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    }`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Healthy Tips Tab */}
                {activeTab === 'tips' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTips.map((tip) => (
                                <div key={tip.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
                                    <div className="p-6">
                                        <div className="mb-3 flex items-start justify-between">
                                            <h3 className="text-lg font-semibold text-gray-900">{tip.title}</h3>
                                            <span
                                                className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(tip.difficulty)}-100 text-${getDifficultyColor(tip.difficulty)}-800`}
                                            >
                                                {tip.difficulty}
                                            </span>
                                        </div>
                                        <p className="mb-4 text-sm text-gray-600">{tip.description}</p>
                                                                        <button 
                                            onClick={() => setSelectedTip(detailedContent[tip.id] || null)}
                                            className="w-full rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2 text-sm font-medium text-white shadow transition-all hover:from-green-700 hover:to-emerald-700 active:scale-95"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Communication Tab */}
                {activeTab === 'communication' && (
                    <div className="space-y-6">
                        {communicationSkills.map((skill, index) => (
                            <div key={index} className="rounded-lg bg-white shadow">
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{skill.skill}</h3>
                                    <p className="mb-4 text-gray-600">{skill.description}</p>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {skill.tips.map((tip, tipIndex) => (
                                            <div key={tipIndex} className="flex items-start space-x-2">
                                                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-green-500"></div>
                                                <p className="text-sm text-gray-700">{tip}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Consent Tab */}
                {activeTab === 'consent' && (
                    <div className="space-y-6">
                        {consentGuidelines.map((guideline, index) => (
                            <div key={index} className="rounded-lg bg-white shadow">
                                <div className="p-6">
                                    <h3 className="mb-2 text-xl font-semibold text-gray-900">{guideline.title}</h3>
                                    <p className="mb-4 text-gray-600">{guideline.description}</p>
                                    <div className="space-y-2">
                                        {guideline.examples.map((example, exampleIndex) => (
                                            <div key={exampleIndex} className="flex items-start space-x-2">
                                                <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500"></div>
                                                <p className="text-sm text-gray-700">{example}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Conflict Resolution Tab */}
                {activeTab === 'conflict' && (
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Steps to Resolve Conflicts</h3>
                            <div className="space-y-4">
                                {[
                                    'Take a step back and calm down before addressing the issue',
                                    'Choose an appropriate time and place for the conversation',
                                    'Use "I" statements to express your feelings without blaming',
                                    "Listen actively to your partner's perspective",
                                    'Focus on the specific issue, not past grievances',
                                    'Look for common ground and shared goals',
                                    'Brainstorm solutions together',
                                    'Be willing to compromise',
                                    'Agree on a plan and follow through',
                                    'Forgive and move forward',
                                ].map((step, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                            <span className="text-sm font-medium text-green-600">{index + 1}</span>
                                        </div>
                                        <p className="text-sm text-gray-700">{step}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-xl font-semibold text-gray-900">Red Flags to Watch For</h3>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {[
                                    'Name-calling or personal attacks',
                                    'Threats or intimidation',
                                    'Refusing to listen or compromise',
                                    'Bringing up past issues repeatedly',
                                    'Yelling or aggressive behavior',
                                    'Stonewalling or silent treatment',
                                    'Gaslighting or manipulation',
                                    'Physical violence of any kind',
                                ].map((redFlag, index) => (
                                    <div key={index} className="flex items-start space-x-2">
                                        <div className="mt-2 h-2 w-2 flex-shrink-0 rounded-full bg-red-500"></div>
                                        <p className="text-sm text-gray-700">{redFlag}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Resources */}
                <div className="mt-8 rounded-lg bg-white p-6 shadow">
                    <h3 className="mb-4 text-lg font-medium text-gray-900">Additional Resources</h3>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <button className="rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                            <div className="text-center">
                                <div className="mb-2 text-2xl">📚</div>
                                <p className="text-sm font-medium text-gray-900">Relationship Books</p>
                            </div>
                        </button>
                        <button className="rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                            <div className="text-center">
                                <div className="mb-2 text-2xl">🎥</div>
                                <p className="text-sm font-medium text-gray-900">Educational Videos</p>
                            </div>
                        </button>
                        <button className="rounded-lg border border-gray-300 p-4 transition-colors hover:bg-gray-50">
                            <div className="text-center">
                                <div className="mb-2 text-2xl">💬</div>
                                <p className="text-sm font-medium text-gray-900">Support Groups</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
