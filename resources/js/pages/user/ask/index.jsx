import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function AskQuestion({ user }) {
    const [activeTab, setActiveTab] = useState('chatbot');
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            type: 'bot',
            message: "Hello! I'm here to help with your sexual and reproductive health questions. What would you like to know?",
            timestamp: new Date().toISOString(),
        },
    ]);
    const [newMessage, setNewMessage] = useState('');

    const { data, setData, post, processing, errors } = useForm({
        question: '',
        category: 'general',
        is_anonymous: true,
    });

    const categories = [
        { id: 'general', name: 'General Health', icon: '🏥' },
        { id: 'contraception', name: 'Contraception', icon: '💊' },
        { id: 'relationships', name: 'Relationships', icon: '💕' },
        { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
        { id: 'reproductive-health', name: 'Reproductive Health', icon: '👶' },
        { id: 'stis', name: 'STIs & Testing', icon: '🔬' },
    ];

    const faqs = [
        {
            id: 1,
            question: 'What are the most effective contraceptive methods?',
            answer: 'The most effective contraceptive methods include IUDs (99% effective), implants (99% effective), and sterilization (99% effective). Hormonal methods like the pill, patch, and ring are about 91% effective with typical use.',
            category: 'contraception',
            views: 1250,
        },
        {
            id: 2,
            question: 'How often should I get tested for STIs?',
            answer: 'It depends on your sexual activity and risk factors. Generally, sexually active individuals should get tested annually, or more frequently if they have multiple partners or engage in high-risk behaviors.',
            category: 'stis',
            views: 980,
        },
        {
            id: 3,
            question: 'What are the signs of a healthy relationship?',
            answer: 'Healthy relationships are built on mutual respect, trust, communication, and consent. Both partners should feel safe, supported, and able to express their needs and boundaries.',
            category: 'relationships',
            views: 2100,
        },
        {
            id: 4,
            question: 'When should I see a doctor about menstrual irregularities?',
            answer: 'You should consult a healthcare provider if you experience severe pain, very heavy bleeding, irregular cycles for more than 3 months, or any other concerning symptoms.',
            category: 'reproductive-health',
            views: 1450,
        },
    ];

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            type: 'user',
            message: newMessage,
            timestamp: new Date().toISOString(),
        };

        setChatMessages((prev) => [...prev, userMessage]);
        setNewMessage('');

        // Simulate bot response
        setTimeout(() => {
            const botResponse = {
                id: Date.now() + 1,
                type: 'bot',
                message:
                    "Thank you for your question. I'm processing your request and will provide you with accurate, evidence-based information. Please give me a moment...",
                timestamp: new Date().toISOString(),
            };
            setChatMessages((prev) => [...prev, botResponse]);
        }, 1000);
    };

    const handleSubmitQuestion = (e) => {
        e.preventDefault();
        post(route('user.ask.submit'), {
            onSuccess: () => {
                setData('question', '');
                alert('Your question has been submitted successfully!');
            },
        });
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/ask">
            <div>
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Ask a Question</h1>
                    <p className="mt-2 text-gray-600">Get expert answers to your sexual and reproductive health questions</p>
                </div>
                {/* Tabs */}
                <div className="mb-8 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('chatbot')}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'chatbot'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                🤖 AI Assistant
                            </button>
                            <button
                                onClick={() => setActiveTab('expert')}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'expert'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                👩‍⚕️ Ask Expert
                            </button>
                            <button
                                onClick={() => setActiveTab('faq')}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'faq'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                ❓ FAQ
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Chatbot Tab */}
                {activeTab === 'chatbot' && (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        <div className="lg:col-span-2">
                            <div className="rounded-lg bg-white shadow">
                                <div className="border-b border-gray-200 px-6 py-4">
                                    <h3 className="text-lg font-medium text-gray-900">AI Health Assistant</h3>
                                    <p className="text-sm text-gray-500">Ask me anything about sexual and reproductive health</p>
                                </div>

                                <div className="h-96 space-y-4 overflow-y-auto p-6">
                                    {chatMessages.map((message) => (
                                        <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                            <div
                                                className={`max-w-xs rounded-lg px-4 py-2 lg:max-w-md ${
                                                    message.type === 'user' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-900'
                                                }`}
                                            >
                                                <p className="text-sm">{message.message}</p>
                                                <p className="mt-1 text-xs opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray-200 px-6 py-4">
                                    <form onSubmit={handleSendMessage} className="flex space-x-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            placeholder="Type your question here..."
                                            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        />
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                                        >
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Quick Questions */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Questions</h3>
                                <div className="space-y-2">
                                    {[
                                        'What is the most effective contraception?',
                                        'How do I know if I have an STI?',
                                        'What are the signs of a healthy relationship?',
                                        'When should I see a doctor?',
                                    ].map((question, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setNewMessage(question)}
                                            className="w-full rounded-lg px-3 py-2 text-left text-sm text-gray-600 hover:bg-gray-50"
                                        >
                                            {question}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="rounded-lg bg-white p-6 shadow">
                                <h3 className="mb-4 text-lg font-medium text-gray-900">Browse by Category</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
                                        >
                                            <span className="mr-2">{category.icon}</span>
                                            {category.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Expert Tab */}
                {activeTab === 'expert' && (
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="mx-auto max-w-2xl">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Submit a Question to Our Experts</h3>
                            <p className="mb-6 text-sm text-gray-600">
                                Our team of healthcare professionals will review your question and provide a detailed, evidence-based answer within
                                24-48 hours.
                            </p>

                            <form onSubmit={handleSubmitQuestion} className="space-y-6">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                    >
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.icon} {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Your Question</label>
                                    <textarea
                                        value={data.question}
                                        onChange={(e) => setData('question', e.target.value)}
                                        rows={6}
                                        className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                        placeholder="Please describe your question in detail..."
                                        required
                                    />
                                    {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        id="anonymous"
                                        type="checkbox"
                                        checked={data.is_anonymous}
                                        onChange={(e) => setData('is_anonymous', e.target.checked)}
                                        className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                    />
                                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                                        Submit anonymously
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                                >
                                    {processing ? 'Submitting...' : 'Submit Question'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* FAQ Tab */}
                {activeTab === 'faq' && (
                    <div className="space-y-6">
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Frequently Asked Questions</h3>
                            <div className="space-y-4">
                                {faqs.map((faq) => (
                                    <div key={faq.id} className="border-b border-gray-200 pb-4">
                                        <h4 className="mb-2 text-sm font-medium text-gray-900">{faq.question}</h4>
                                        <p className="mb-2 text-sm text-gray-600">{faq.answer}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-gray-500">
                                                {categories.find((c) => c.id === faq.category)?.icon}
                                                {categories.find((c) => c.id === faq.category)?.name}
                                            </span>
                                            <span className="text-xs text-gray-500">{faq.views} views</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
