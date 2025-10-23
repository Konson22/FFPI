import { useState } from 'react';
import Layout from '../../../layouts/Layout';

export default function QuizHub({ user }) {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');

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

    return (
        <Layout>
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Quiz & Learning Challenges</h1>
                    <p className="mt-2 text-gray-600">Test your knowledge and earn badges for your progress</p>
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
                                                    className={`rounded-lg px-6 py-2 font-medium transition-colors ${
                                                        quiz.completed
                                                            ? 'bg-green-600 text-white hover:bg-green-700'
                                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                                    }`}
                                                >
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
        </Layout>
    );
}
