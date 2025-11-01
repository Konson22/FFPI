import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    const handleGoogleLogin = () => {
        setIsGoogleLoading(true);
        // Redirect to Google OAuth
        window.location.href = route('auth.google');
    };

    return (
        <div className="flex min-h-screen">
            <Head title="Login - Family Planning" />

            {/* Left Section - Image with Gradient */}
            <div className="relative hidden lg:flex lg:flex-1">
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/images/pexels-pixabay-51953.jpg')`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 via-green-800/85 to-green-700/80"></div>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 flex h-full items-center justify-center">
                        <div className="p-8 text-center text-white">
                            <div className="mb-6 inline-flex items-center justify-center rounded-full bg-white/30 p-4 backdrop-blur-md shadow-lg ring-2 ring-white/20">
                                <svg className="h-12 w-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h2 className="mb-4 text-3xl font-extrabold text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] [text-shadow:_2px_2px_4px_rgba(0,0,0,0.9)] lg:text-4xl">Welcome Back</h2>
                            <p className="text-lg font-medium text-white drop-shadow-[0_3px_6px_rgba(0,0,0,0.8)] [text-shadow:_1px_1px_3px_rgba(0,0,0,0.9)] opacity-90">Sign in to continue your journey with us</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="flex w-full items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-8 lg:w-1/2">
                <div className="w-full max-w-md">
                    {/* Status Message */}
                    {status && <div className="mb-6 rounded-lg border border-green-300 bg-green-500/20 p-4 text-green-100 backdrop-blur-sm">{status}</div>}

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="mb-2 text-3xl font-bold text-white">LOGIN</h1>
                        <div className="h-1 w-12 rounded bg-green-600"></div>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={submit}>
                        {/* Username Field */}
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-white">
                                Username
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 text-white placeholder:text-white/70 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                placeholder="Enter your username"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            {errors.email && <p className="mt-2 text-sm text-red-300">{errors.email}</p>}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-white">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="current-password"
                                    required
                                    className="w-full rounded-lg border border-white/30 bg-white/10 px-4 py-3 pr-12 text-white placeholder:text-white/70 transition-colors focus:border-green-500 focus:ring-2 focus:ring-green-500"
                                    placeholder="Enter your password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 transition-colors hover:text-white"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && <p className="mt-2 text-sm text-red-300">{errors.password}</p>}
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center">
                            <input
                                id="remember"
                                name="remember"
                                type="checkbox"
                                className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                            />
                            <label htmlFor="remember" className="ml-2 block text-sm text-white">
                                Remember me
                            </label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-green-600 px-4 py-3 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-white">
                            Don't have an account?{' '}
                            <Link href={route('register')} className="font-medium text-green-400 transition-colors hover:text-green-300">
                                Sign up
                            </Link>
                        </p>
                    </div>

                    {/* Google Login Button */}
                    <div className="mt-8">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isGoogleLoading}
                            className="flex w-full items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all duration-200 hover:bg-gray-50 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isGoogleLoading ? (
                                <>
                                    <svg className="mr-3 h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <svg className="mr-3 h-5 w-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Continue with Google
                                </>
                            )}
                        </button>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <Link href={route('home')} className="text-sm text-white transition-colors hover:text-green-400">
                            ← Back to home
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
