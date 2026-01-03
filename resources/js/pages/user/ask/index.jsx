import { Link, router, useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function AskQuestion({ user, questions, userQuestionsCount, userAnswersCount, filters }) {
    const { flash } = usePage().props;
    const [activeTab, setActiveTab] = useState('browse');
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [showAnswerForm, setShowAnswerForm] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [chatMessages, setChatMessages] = useState([
        {
            id: 1,
            type: 'bot',
            message: "Hello! I'm here to help with your sexual and reproductive health questions. What would you like to know?",
            timestamp: new Date().toISOString(),
        },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Handle ESC key to close modal
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    const { data, setData, post, processing, errors } = useForm({
        question: '',
        category: 'general',
        is_anonymous: true,
    });

    const answerForm = useForm({
        answer: '',
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
                setData('category', 'general');
                setData('is_anonymous', true);
                setActiveTab('browse');
            },
            onError: (errors) => {
                console.log('Validation errors:', errors);
            },
        });
    };

    const handleSubmitAnswer = (e, questionId) => {
        e.preventDefault();
        answerForm.post(route('user.ask.answer', questionId), {
            onSuccess: () => {
                answerForm.reset();
                setShowAnswerForm(null);
            },
        });
    };

    const handleAcceptAnswer = (answerId) => {
        router.post(
            route('user.ask.accept', answerId),
            {},
            {
                preserveScroll: true,
            },
        );
    };

    const handleCategoryFilter = (category) => {
        router.get(
            route('user.ask'),
            { category, status: filters?.status || 'all' },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    const handleStatusFilter = (status) => {
        router.get(
            route('user.ask'),
            { category: filters?.category || 'all', status },
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/ask">
            <div>
                {/* Flash Messages */}
                {flash?.success && (
                    <div className="mb-4 rounded-lg border border-green-300 bg-green-50 p-4">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p className="font-medium text-green-800">{flash.success}</p>
                        </div>
                    </div>
                )}
                {flash?.error && (
                    <div className="mb-4 rounded-lg border border-red-300 bg-red-50 p-4">
                        <div className="flex items-center">
                            <svg className="mr-3 h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            <p className="font-medium text-red-800">{flash.error}</p>
                        </div>
                    </div>
                )}
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                    <h1 className="text-3xl font-bold">Ask a Question</h1>
                    <p className="mt-2 text-green-100">Get expert answers to your sexual and reproductive health questions</p>
                    <div className="mt-4 flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span>24/7 AI Support</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                                />
                            </svg>
                            <span>Expert Reviewed</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                            </svg>
                            <span>Privacy Protected</span>
                        </div>
                    </div>
                </div>
                {/* Tabs */}
                <div className="mb-8 rounded-lg bg-white shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            <button
                                onClick={() => {
                                    // On lg screens, open modal; on smaller screens, switch to tab
                                    if (window.innerWidth >= 1024) {
                                        setIsModalOpen(true);
                                    } else {
                                        setActiveTab('chatbot');
                                    }
                                }}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'chatbot' || isModalOpen
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                🤖 AI Assistant
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('expert');
                                    setIsModalOpen(false);
                                }}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'expert'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                👩‍⚕️ Ask Expert
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('browse');
                                    setIsModalOpen(false);
                                }}
                                className={`border-b-2 px-1 py-4 text-sm font-medium ${
                                    activeTab === 'browse'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                }`}
                            >
                                📚 Browse Questions
                            </button>
                            <button
                                onClick={() => {
                                    setActiveTab('faq');
                                    setIsModalOpen(false);
                                }}
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

                {/* Chatbot Tab - Only visible on smaller screens */}
                {activeTab === 'chatbot' && (
                    <div className="block lg:hidden">
                        <div className="grid grid-cols-1 gap-8">
                            <div>
                                <div className="rounded-lg bg-white shadow">
                                    <div className="border-b border-gray-200 px-6 py-4">
                                        <h3 className="text-lg font-medium text-gray-900">AI Health Assistant</h3>
                                        <p className="text-sm text-gray-500">Ask me anything about sexual and reproductive health</p>
                                    </div>

                                    <div className="h-96 space-y-4 overflow-y-auto p-6">
                                        {chatMessages.map((message) => (
                                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                <div
                                                    className={`max-w-xs rounded-xl px-4 py-3 shadow-sm ${
                                                        message.type === 'user'
                                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                                            : 'bg-gray-100 text-gray-900'
                                                    }`}
                                                >
                                                    <p className="text-sm leading-relaxed">{message.message}</p>
                                                    <p className="mt-2 text-xs opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef}></div>
                                    </div>

                                    <div className="border-t border-gray-200 px-6 py-4">
                                        <form onSubmit={handleSendMessage} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                                            <input
                                                type="text"
                                                value={newMessage}
                                                onChange={(e) => setNewMessage(e.target.value)}
                                                placeholder="Type your question here..."
                                                className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                                            />
                                            <button
                                                type="submit"
                                                disabled={processing || !newMessage.trim()}
                                                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                    />
                                                </svg>
                                                Send
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
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
                    </div>
                )}

                {/* AI Assistant Modal - Only visible on lg screens */}
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 hidden lg:flex">
                        {/* Backdrop */}
                        <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsModalOpen(false)}></div>

                        {/* Modal */}
                        <div className="relative z-10 flex min-h-full w-full items-center justify-center p-4">
                            <div
                                className="relative w-full max-w-4xl transform rounded-lg bg-white shadow-xl transition-all"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Modal Header */}
                                <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">AI Health Assistant</h3>
                                        <p className="text-sm text-gray-500">Ask me anything about sexual and reproductive health</p>
                                    </div>
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                                    >
                                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Modal Body */}
                                <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-3">
                                    <div className="lg:col-span-2">
                                        <div className="h-96 space-y-4 overflow-y-auto rounded-lg border border-gray-200 p-6">
                                            {chatMessages.map((message) => (
                                                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                                    <div
                                                        className={`max-w-xs rounded-xl px-4 py-3 shadow-sm lg:max-w-md ${
                                                            message.type === 'user'
                                                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
                                                                : 'bg-gray-100 text-gray-900'
                                                        }`}
                                                    >
                                                        <p className="text-sm leading-relaxed">{message.message}</p>
                                                        <p className="mt-2 text-xs opacity-75">{new Date(message.timestamp).toLocaleTimeString()}</p>
                                                    </div>
                                                </div>
                                            ))}
                                            <div ref={messagesEndRef}></div>
                                        </div>

                                        <div className="mt-4 border-t border-gray-200 pt-4">
                                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                                <input
                                                    type="text"
                                                    value={newMessage}
                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                    placeholder="Type your question here..."
                                                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm transition-all focus:border-transparent focus:ring-2 focus:ring-green-500 focus:ring-offset-1"
                                                />
                                                <button
                                                    type="submit"
                                                    disabled={processing || !newMessage.trim()}
                                                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                                >
                                                    <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                                        />
                                                    </svg>
                                                    Send
                                                </button>
                                            </form>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Categories */}
                                        <div className="rounded-lg bg-gray-50 p-6">
                                            <h3 className="mb-4 text-lg font-medium text-gray-900">Browse by Category</h3>
                                            <div className="space-y-2">
                                                {categories.map((category) => (
                                                    <button
                                                        key={category.id}
                                                        className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-gray-600 transition-all hover:bg-white hover:shadow-sm"
                                                    >
                                                        <span className="mr-2">{category.icon}</span>
                                                        {category.name}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
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
                                        className={`w-full rounded-lg border px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500 ${
                                            errors.question ? 'border-red-300' : 'border-gray-300'
                                        }`}
                                        placeholder="Please describe your question in detail..."
                                        required
                                    />
                                    {errors.question && <p className="mt-1 text-sm text-red-600">{errors.question}</p>}
                                    {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
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

                {/* Browse Questions Tab */}
                {activeTab === 'browse' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="text-2xl font-bold text-green-600">{userQuestionsCount || 0}</div>
                                <div className="text-sm text-gray-600">Your Questions</div>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="text-2xl font-bold text-blue-600">{userAnswersCount || 0}</div>
                                <div className="text-sm text-gray-600">Your Answers</div>
                            </div>
                            <div className="rounded-lg bg-white p-6 shadow">
                                <div className="text-2xl font-bold text-purple-600">{questions?.total || 0}</div>
                                <div className="text-sm text-gray-600">Total Questions</div>
                            </div>
                        </div>

                        {/* Filters */}
                        <div className="rounded-lg bg-white p-4 shadow">
                            <div className="flex flex-wrap gap-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                    <select
                                        value={filters?.category || 'all'}
                                        onChange={(e) => handleCategoryFilter(e.target.value)}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="all">All Categories</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.icon} {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={filters?.status || 'all'}
                                        onChange={(e) => handleStatusFilter(e.target.value)}
                                        className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-green-500"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="answered">Answered</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4">
                            {questions?.data && questions.data.length > 0 ? (
                                questions.data.map((question) => (
                                    <div key={question.id} className="rounded-lg bg-white p-6 shadow">
                                        <div className="mb-4 flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center gap-2">
                                                    <span className="text-xl">{categories.find((c) => c.id === question.category)?.icon}</span>
                                                    <span className="text-xs font-medium text-gray-500">
                                                        {categories.find((c) => c.id === question.category)?.name}
                                                    </span>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium ${
                                                            question.status === 'answered'
                                                                ? 'bg-green-100 text-green-800'
                                                                : question.status === 'closed'
                                                                  ? 'bg-gray-100 text-gray-800'
                                                                  : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {question.status}
                                                    </span>
                                                </div>
                                                <h3 className="mb-2 text-lg font-semibold text-gray-900">{question.question}</h3>
                                                <div className="mb-4 flex items-center gap-4 text-sm text-gray-500">
                                                    {question.user ? <span>Asked by {question.user.name}</span> : <span>Asked anonymously</span>}
                                                    <span>•</span>
                                                    <span>{question.created_at}</span>
                                                    <span>•</span>
                                                    <span>{question.views_count} views</span>
                                                    <span>•</span>
                                                    <span>{question.answers_count} answers</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Answers */}
                                        {question.answers && question.answers.length > 0 && (
                                            <div className="mb-4 space-y-4 border-t border-gray-200 pt-4">
                                                {question.answers.map((answer) => (
                                                    <div
                                                        key={answer.id}
                                                        className={`rounded-lg p-4 ${
                                                            answer.is_accepted
                                                                ? 'border-2 border-green-200 bg-green-50'
                                                                : answer.is_expert
                                                                  ? 'border border-blue-200 bg-blue-50'
                                                                  : 'border border-gray-200 bg-gray-50'
                                                        }`}
                                                    >
                                                        <div className="mb-2 flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-gray-900">{answer.user.name}</span>
                                                                {answer.is_expert && (
                                                                    <span className="rounded-full bg-blue-600 px-2 py-1 text-xs font-medium text-white">
                                                                        Expert
                                                                    </span>
                                                                )}
                                                                {answer.is_accepted && (
                                                                    <span className="rounded-full bg-green-600 px-2 py-1 text-xs font-medium text-white">
                                                                        ✓ Accepted
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <span className="text-xs text-gray-500">{answer.created_at}</span>
                                                        </div>
                                                        <p className="mb-2 text-gray-700">{answer.answer}</p>
                                                        {question.is_owner && answer.can_accept && (
                                                            <button
                                                                onClick={() => handleAcceptAnswer(answer.id)}
                                                                className="text-sm text-green-600 hover:text-green-700"
                                                            >
                                                                Accept Answer
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Answer Form */}
                                        {showAnswerForm === question.id ? (
                                            <div className="border-t border-gray-200 pt-4">
                                                <form onSubmit={(e) => handleSubmitAnswer(e, question.id)} className="space-y-4">
                                                    <div>
                                                        <label className="mb-2 block text-sm font-medium text-gray-700">Your Answer</label>
                                                        <textarea
                                                            value={answerForm.data.answer}
                                                            onChange={(e) => answerForm.setData('answer', e.target.value)}
                                                            rows={4}
                                                            className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                                                            placeholder="Provide a helpful answer..."
                                                            required
                                                        />
                                                        {answerForm.errors.answer && (
                                                            <p className="mt-1 text-sm text-red-600">{answerForm.errors.answer}</p>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button
                                                            type="submit"
                                                            disabled={answerForm.processing}
                                                            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
                                                        >
                                                            {answerForm.processing ? 'Submitting...' : 'Submit Answer'}
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => {
                                                                setShowAnswerForm(null);
                                                                answerForm.reset();
                                                            }}
                                                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        ) : (
                                            <div className="border-t border-gray-200 pt-4">
                                                <button
                                                    onClick={() => setShowAnswerForm(question.id)}
                                                    className="text-sm text-green-600 hover:text-green-700"
                                                >
                                                    + Add Answer
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-lg bg-white p-12 text-center shadow">
                                    <p className="text-gray-500">No questions found. Be the first to ask a question!</p>
                                </div>
                            )}
                        </div>

                        {/* Pagination */}
                        {questions?.links && questions.links.length > 3 && (
                            <div className="flex justify-center">
                                <div className="flex gap-2">
                                    {questions.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`rounded-lg px-4 py-2 text-sm ${
                                                link.active ? 'bg-green-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'
                                            } ${!link.url ? 'cursor-not-allowed opacity-50' : ''}`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
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
