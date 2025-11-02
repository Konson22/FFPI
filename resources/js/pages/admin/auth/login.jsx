import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function AdminLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <Head title="Admin Login" />
            
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-[rgb(4,50,75)]/5 via-transparent to-[rgb(29,84,114)]/5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[rgb(210,166,73)]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[rgb(29,84,114)]/5 rounded-full blur-3xl"></div>
            
            <div className="max-w-md w-full space-y-8 relative z-10">
                <div>
                    <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[rgb(4,50,75)] to-[rgb(29,84,114)] shadow-xl border-4 border-white">
                        <img
                            src="/images/ffpi-logo.jpg"
                            alt="FFPI Logo"
                            className="h-12 w-12 rounded-lg object-cover"
                            onError={(e) => {
                                e.target.style.display = 'none';
                            }}
                        />
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-[rgb(4,50,75)]">
                        FFPI Admin Portal
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Sign in to access the admin dashboard
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={submit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-[rgb(210,166,73)] focus:border-[rgb(4,50,75)] focus:z-10 sm:text-sm transition-colors"
                                placeholder="Email address"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-[rgb(210,166,73)] focus:border-[rgb(4,50,75)] focus:z-10 sm:text-sm transition-colors"
                                    placeholder="Password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 text-[rgb(4,50,75)] focus:ring-[rgb(210,166,73)] border-gray-300 rounded"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                                Remember me
                            </label>
                        </div>

                        <div className="text-sm">
                            <a href="#" className="font-medium text-[rgb(4,50,75)] hover:text-[rgb(29,84,114)] transition-colors">
                                Forgot your password?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-gradient-to-r from-[rgb(4,50,75)] via-[rgb(29,84,114)] to-[rgb(4,50,75)] hover:shadow-lg hover:shadow-[rgb(4,50,75)]/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(210,166,73)] disabled:opacity-50 transition-all duration-200 transform hover:scale-[1.02]"
                        >
                            {processing ? 'Signing in...' : 'Sign in to Admin'}
                        </button>
                    </div>

                    <div className="text-center">
                        <Link
                            href="/"
                            className="font-medium text-[rgb(4,50,75)] hover:text-[rgb(29,84,114)] transition-colors inline-flex items-center"
                        >
                            <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Main Site
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
