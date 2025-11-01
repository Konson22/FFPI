import { Head, useForm } from '@inertiajs/react';

export default function VerifyEmail({ status }) {
    const { post, processing } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('auth.verification.send'));
    };

    return (
        <div className="flex min-h-screen">
            <Head title="Verify Email - Family Planning" />

            {/* Left Section - Image with Gradient */}
            <div className="relative hidden lg:flex lg:flex-1">
                <div
                    className="h-full w-full bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url('/images/pexels-pixabay-51953.jpg')`,
                    }}
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-black/50"></div>
                    <div className="relative z-10 flex h-full items-center justify-center">
                        <div className="p-8 text-center text-white">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h2 className="mb-4 text-3xl font-bold">Verify Your Email</h2>
                            <p className="text-lg opacity-90">Please verify your email address to continue</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Verification Form */}
            <div className="flex w-full items-center justify-center p-8 lg:w-[40%]">
                <div className="w-full max-w-md">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                            <svg className="h-8 w-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                            </svg>
                        </div>
                        <h1 className="mb-2 text-center text-3xl font-bold text-gray-900">Verify Your Email</h1>
                        <p className="text-center text-sm text-gray-600">
                            Before continuing, please verify your email address by clicking the link in the email we sent you.
                        </p>
                        <div className="mx-auto mt-4 h-1 w-12 rounded bg-emerald-600"></div>
                    </div>

                    {/* Status Message */}
                    {status === 'verification-link-sent' && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                            <div className="flex items-start">
                                <svg className="mr-3 h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-green-800">A new verification link has been sent to your email address.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Information Box */}
                    <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start">
                            <svg className="mr-3 h-5 w-5 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="flex-1">
                                <p className="text-sm text-amber-800">
                                    <strong>Didn't receive the email?</strong> Check your spam folder or click the button below to request a new
                                    verification link.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Resend Verification Email Form */}
                    <form onSubmit={submit} className="space-y-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-medium text-white transition-colors hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <svg
                                        className="mr-2 inline-block h-5 w-5 animate-spin"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Sending...
                                </>
                            ) : (
                                'Resend Verification Email'
                            )}
                        </button>
                    </form>

                    {/* Help Text */}
                    <div className="mt-6 rounded-lg bg-gray-50 p-4">
                        <p className="text-center text-sm text-gray-600">
                            If you continue to have issues, please{' '}
                            <a href={route('contact')} className="font-medium text-emerald-600 hover:text-emerald-500">
                                contact support
                            </a>
                            .
                        </p>
                    </div>

                    {/* Back to Home */}
                    <div className="mt-8 text-center">
                        <a href={route('home')} className="text-sm text-gray-600 transition-colors hover:text-emerald-600">
                            ← Back to home
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
