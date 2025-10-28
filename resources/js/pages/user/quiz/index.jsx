import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function QuizHub({ user }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [activeQuiz, setActiveQuiz] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizScore, setQuizScore] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [answers, setAnswers] = useState([]);

    const categories = [
        { id: 'all', name: 'All Topics', icon: '🧠' },
        { id: 'contraception', name: 'Contraception', icon: '💊' },
        { id: 'sexual-health', name: 'Sexual Health', icon: '❤️' },
        { id: 'relationships', name: 'Relationships', icon: '💕' },
        { id: 'consent', name: 'Consent & Boundaries', icon: '✋' },
        { id: 'reproductive-rights', name: 'Reproductive Rights', icon: '✊' },
    ];

    const difficulties = [
        { id: 'all', name: 'All Levels' },
        { id: 'beginner', name: 'Beginner' },
        { id: 'intermediate', name: 'Intermediate' },
        { id: 'advanced', name: 'Advanced' },
    ];

    const quizzes = [
        {
            id: 1,
            title: 'Contraception Basics',
            description: 'Test your knowledge about different contraceptive methods and their effectiveness.',
            category: 'contraception',
            difficulty: 'beginner',
            questions: 10,
            timeLimit: 15,
            points: 100,
            completed: true,
            score: 85,
            badge: 'Contraception Expert',
            attempts: 2,
        },
        {
            id: 2,
            title: 'Understanding Consent',
            description: 'Learn about consent, boundaries, and healthy communication in relationships.',
            category: 'consent',
            difficulty: 'intermediate',
            questions: 15,
            timeLimit: 20,
            points: 150,
            completed: false,
            score: null,
            badge: 'Consent Champion',
            attempts: 0,
        },
        {
            id: 3,
            title: 'Sexual Health & STIs',
            description: 'Comprehensive quiz about sexually transmitted infections and prevention.',
            category: 'sexual-health',
            difficulty: 'intermediate',
            questions: 12,
            timeLimit: 18,
            points: 120,
            completed: true,
            score: 92,
            badge: 'Health Advocate',
            attempts: 1,
        },
        {
            id: 4,
            title: 'Healthy Relationships',
            description: 'Test your understanding of what makes relationships healthy and fulfilling.',
            category: 'relationships',
            difficulty: 'beginner',
            questions: 8,
            timeLimit: 12,
            points: 80,
            completed: false,
            score: null,
            badge: 'Relationship Guru',
            attempts: 0,
        },
        {
            id: 5,
            title: 'Reproductive Rights & Advocacy',
            description: 'Advanced quiz on reproductive rights, gender equality, and advocacy.',
            category: 'reproductive-rights',
            difficulty: 'advanced',
            questions: 20,
            timeLimit: 30,
            points: 200,
            completed: false,
            score: null,
            badge: 'Rights Advocate',
            attempts: 0,
        },
        {
            id: 6,
            title: 'Menstrual Health',
            description: 'Everything you need to know about menstrual cycles and health.',
            category: 'sexual-health',
            difficulty: 'beginner',
            questions: 10,
            timeLimit: 15,
            points: 100,
            completed: true,
            score: 78,
            badge: 'Cycle Expert',
            attempts: 3,
        },
    ];

    const userStats = {
        totalQuizzes: 3,
        averageScore: 85,
        totalPoints: 1250,
        badges: 2,
        streak: 5,
    };

    const recentBadges = [
        { name: 'Contraception Expert', icon: '💊', earned: '2 days ago' },
        { name: 'Health Advocate', icon: '❤️', earned: '1 week ago' },
    ];

    const filteredQuizzes = quizzes.filter((quiz) => {
        const categoryMatch = selectedCategory === 'all' || quiz.category === selectedCategory;
        const difficultyMatch = selectedDifficulty === 'all' || quiz.difficulty === selectedDifficulty;
        return categoryMatch && difficultyMatch;
    });

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'beginner':
                return 'green';
            case 'intermediate':
                return 'yellow';
            case 'advanced':
                return 'red';
            default:
                return 'gray';
        }
    };

    const getScoreColor = (score) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 70) return 'text-yellow-600';
        return 'text-red-600';
    };

    // Quiz Questions Data
    const quizQuestions = {
        1: [
            {
                question: "What is the effectiveness rate of hormonal birth control pills with typical use?",
                options: ["91%", "95%", "99%", "85%"],
                correct: 0,
                explanation: "With typical use, birth control pills are about 91% effective. Perfect use (99%) means taking it at the same time every day without missing doses."
            },
            {
                question: "What is an IUD?",
                options: ["An injection given every 3 months", "A small device inserted into the uterus", "A daily pill", "A patch worn on the skin"],
                correct: 1,
                explanation: "An IUD (Intrauterine Device) is a small T-shaped device that is inserted into the uterus by a healthcare provider. It can last 3-10 years depending on the type."
            },
            {
                question: "How do condoms help prevent pregnancy?",
                options: ["By stopping ovulation", "By blocking sperm from reaching the egg", "By thickening cervical mucus", "By changing hormone levels"],
                correct: 1,
                explanation: "Condoms create a physical barrier that prevents sperm from reaching the egg. They also provide protection against sexually transmitted infections (STIs)."
            }
        ],
        2: [
            {
                question: "What is the most important aspect of consent?",
                options: ["It can be given while intoxicated", "It must be freely given, informed, and can be withdrawn at any time", "Once given, it cannot be taken back", "It is only needed for the first time"],
                correct: 1,
                explanation: "Consent must be freely given without pressure, informed about what you're consenting to, enthusiastic, and can be withdrawn at any time. It's required every single time."
            },
            {
                question: "What is enthusiastic consent?",
                options: ["Saying yes when asked directly", "Actively showing you want to participate through words and actions", "Not saying no", "Assuming consent from past experiences"],
                correct: 1,
                explanation: "Enthusiastic consent is when someone actively and positively shows they want to engage through their words and actions, not just the absence of a 'no'."
            }
        ]
    };

    const startQuiz = (quizId) => {
        setActiveQuiz(quizId);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setQuizScore(0);
        setShowResults(false);
        setAnswers([]);
    };

    const handleAnswer = (answerIndex) => {
        if (!activeQuiz) return;
        const questions = quizQuestions[activeQuiz] || [];
        const isCorrect = answerIndex === questions[currentQuestion].correct;
        
        setAnswers([...answers, { question: currentQuestion, answer: answerIndex, correct: isCorrect }]);
        if (isCorrect) setQuizScore(quizScore + 1);
        
        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
            } else {
                setShowResults(true);
            }
        }, 1500);
        setSelectedAnswer(answerIndex);
    };

    const resetQuiz = () => {
        setActiveQuiz(null);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setQuizScore(0);
        setShowResults(false);
        setAnswers([]);
    };

    const currentQuestions = activeQuiz ? (quizQuestions[activeQuiz] || []) : [];
    const currentQuestionData = currentQuestions[currentQuestion];

    return (
        <UserLayout user={user} role="user" currentPath="/user/quiz">
            <div>
                {/* Active Quiz Interface */}
                {activeQuiz && !showResults && currentQuestionData && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                            {/* Progress Bar */}
                            <div className="border-b border-gray-200 p-4">
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-gray-700">Question {currentQuestion + 1} of {currentQuestions.length}</span>
                                    <span className="text-gray-500">{quizzes.find(q => q.id === activeQuiz)?.title}</span>
                                </div>
                                <div className="h-2 w-full rounded-full bg-gray-200">
                                    <div 
                                        className="h-2 rounded-full bg-green-600 transition-all duration-300"
                                        style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Question */}
                            <div className="p-6">
                                <h2 className="mb-6 text-xl font-semibold text-gray-900">{currentQuestionData.question}</h2>
                                
                                <div className="space-y-3">
                                    {currentQuestionData.options.map((option, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleAnswer(index)}
                                            disabled={selectedAnswer !== null}
                                            className={`w-full rounded-lg border-2 p-4 text-left transition-all ${
                                                selectedAnswer === index
                                                    ? index === currentQuestionData.correct
                                                        ? 'border-green-500 bg-green-50'
                                                        : 'border-red-500 bg-red-50'
                                                    : selectedAnswer !== null && index === currentQuestionData.correct
                                                    ? 'border-green-500 bg-green-50'
                                                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-medium text-gray-900">{option}</span>
                                                {selectedAnswer !== null && (
                                                    <span>
                                                        {index === currentQuestionData.correct ? '✓' : index === selectedAnswer ? '✗' : ''}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {/* Explanation */}
                                {selectedAnswer !== null && (
                                    <div className={`mt-4 rounded-lg p-4 ${
                                        selectedAnswer === currentQuestionData.correct ? 'bg-green-50' : 'bg-blue-50'
                                    }`}>
                                        <p className="text-sm text-gray-700">
                                            <strong>{selectedAnswer === currentQuestionData.correct ? 'Correct! ' : 'Incorrect. '}</strong>
                                            {currentQuestionData.explanation}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Screen */}
                {activeQuiz && showResults && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                        <div className="w-full max-w-2xl rounded-lg bg-white shadow-2xl">
                            <div className="p-8 text-center">
                                <div className="mb-6 text-6xl">
                                    {quizScore === currentQuestions.length ? '🎉' : quizScore >= currentQuestions.length * 0.7 ? '🎊' : '📚'}
                                </div>
                                <h2 className="mb-2 text-3xl font-bold text-gray-900">Quiz Complete!</h2>
                                <p className="mb-6 text-gray-600">You scored {quizScore} out of {currentQuestions.length}</p>
                                
                                <div className="mb-6">
                                    <div className="mx-auto inline-block rounded-full bg-green-100 px-6 py-2">
                                        <span className="text-3xl font-bold text-green-600">
                                            {Math.round((quizScore / currentQuestions.length) * 100)}%
                                        </span>
                                    </div>
                                </div>

                                <div className="mb-6 space-y-2 text-left">
                                    {currentQuestions.map((q, index) => {
                                        const userAnswer = answers[index];
                                        return (
                                            <div key={index} className={`rounded-lg p-3 ${
                                                userAnswer?.correct ? 'bg-green-50' : 'bg-red-50'
                                            }`}>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm font-medium">
                                                        Question {index + 1}
                                                    </span>
                                                    <span>{userAnswer?.correct ? '✓ Correct' : '✗ Incorrect'}</span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={resetQuiz}
                                        className="flex-1 rounded-lg bg-gray-600 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-700"
                                    >
                                        Close
                                    </button>
                                    <button
                                        onClick={() => {
                                            setCurrentQuestion(0);
                                            setQuizScore(0);
                                            setShowResults(false);
                                            setSelectedAnswer(null);
                                            setAnswers([]);
                                        }}
                                        className="flex-1 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition-colors hover:bg-green-700"
                                    >
                                        Retake Quiz
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-lg">
                    <h1 className="text-3xl font-bold">Quiz & Learning Challenges</h1>
                    <p className="mt-2 text-green-100">Test your knowledge and earn badges for your progress</p>
                </div>
                {/* User Stats */}
                <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-4">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-blue-100 p-2">
                                <div className="h-6 w-6 rounded bg-blue-500"></div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Quizzes Completed</p>
                                <p className="text-2xl font-bold text-gray-900">{userStats.totalQuizzes}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-green-100 p-2">
                                <div className="h-6 w-6 rounded bg-green-500"></div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Average Score</p>
                                <p className="text-2xl font-bold text-gray-900">{userStats.averageScore}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-purple-100 p-2">
                                <div className="h-6 w-6 rounded bg-purple-500"></div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Points</p>
                                <p className="text-2xl font-bold text-gray-900">{userStats.totalPoints}</p>
                            </div>
                        </div>
                    </div>
                    <div className="rounded-lg bg-white p-6 shadow">
                        <div className="flex items-center">
                            <div className="rounded-lg bg-yellow-100 p-2">
                                <div className="h-6 w-6 rounded bg-yellow-500"></div>
                            </div>
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                                <p className="text-2xl font-bold text-gray-900">{userStats.badges}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Filters & Recent Badges */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Filters */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Filters</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Category</label>
                                    <div className="space-y-2">
                                        {categories.map((category) => (
                                            <button
                                                key={category.id}
                                                onClick={() => setSelectedCategory(category.id)}
                                                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors ${
                                                    selectedCategory === category.id
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span className="mr-2">{category.icon}</span>
                                                {category.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700">Difficulty</label>
                                    <div className="space-y-2">
                                        {difficulties.map((difficulty) => (
                                            <button
                                                key={difficulty.id}
                                                onClick={() => setSelectedDifficulty(difficulty.id)}
                                                className={`w-full rounded-lg px-3 py-2 text-sm transition-colors ${
                                                    selectedDifficulty === difficulty.id
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {difficulty.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Badges */}
                        <div className="rounded-lg bg-white p-6 shadow">
                            <h3 className="mb-4 text-lg font-medium text-gray-900">Recent Badges</h3>
                            <div className="space-y-3">
                                {recentBadges.map((badge, index) => (
                                    <div key={index} className="flex items-center space-x-3">
                                        <div className="text-2xl">{badge.icon}</div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{badge.name}</p>
                                            <p className="text-xs text-gray-500">Earned {badge.earned}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quiz List */}
                    <div className="lg:col-span-3">
                        <div className="space-y-6">
                            {filteredQuizzes.map((quiz) => (
                                <div key={quiz.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
                                    <div className="p-6">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="mb-2 flex items-center space-x-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{quiz.title}</h3>
                                                    {quiz.completed && (
                                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Completed</span>
                                                    )}
                                                </div>

                                                <p className="mb-4 text-sm text-gray-600">{quiz.description}</p>

                                                <div className="mb-4 flex items-center space-x-4 text-sm text-gray-500">
                                                    <span>{quiz.questions} questions</span>
                                                    <span>•</span>
                                                    <span>{quiz.timeLimit} min</span>
                                                    <span>•</span>
                                                    <span>{quiz.points} points</span>
                                                    <span>•</span>
                                                    <span
                                                        className={`rounded-full px-2 py-1 text-xs font-medium bg-${getDifficultyColor(quiz.difficulty)}-100 text-${getDifficultyColor(quiz.difficulty)}-800`}
                                                    >
                                                        {quiz.difficulty}
                                                    </span>
                                                </div>

                                                {quiz.completed && (
                                                    <div className="mb-4 flex items-center space-x-4">
                                                        <div>
                                                            <p className="text-sm text-gray-600">Best Score</p>
                                                            <p className={`text-lg font-semibold ${getScoreColor(quiz.score)}`}>{quiz.score}%</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">Attempts</p>
                                                            <p className="text-lg font-semibold text-gray-900">{quiz.attempts}</p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-600">Badge</p>
                                                            <p className="text-sm font-medium text-yellow-600">{quiz.badge}</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="ml-4">
                                                <button
                                                    onClick={() => startQuiz(quiz.id)}
                                                    className={`inline-flex items-center rounded-lg px-6 py-2.5 font-medium transition-all ${
                                                        quiz.completed
                                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                                                            : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl'
                                                    } active:scale-95`}
                                                >
                                                    <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {quiz.completed ? 'Retake Quiz' : 'Start Quiz'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {filteredQuizzes.length === 0 && (
                            <div className="py-12 text-center">
                                <div className="text-gray-500">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.291A7.962 7.962 0 0012 5c-2.34 0-4.29 1.009-5.824 2.709"
                                        />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No quizzes found</h3>
                                    <p className="mt-1 text-sm text-gray-500">Try adjusting your filters to see more quizzes.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
