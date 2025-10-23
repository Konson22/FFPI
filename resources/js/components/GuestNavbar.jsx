import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function GuestNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="sticky top-0 z-50">
            {/* Top Contact Bar - Hidden on mobile */}
            <div className="hidden bg-gradient-to-r from-green-800 to-emerald-800 py-2 text-white lg:block">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                                <span className="text-green-100">+211 922618621</span>
                            </div>
                            <div className="flex items-center">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-green-100">futurefamilyplanning@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <a href="#" className="text-green-100 transition-colors hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a href="#" className="text-green-100 transition-colors hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                                </svg>
                            </a>
                            <a href="#" className="text-green-100 transition-colors hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            <a href="#" className="text-green-100 transition-colors hover:text-white">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.357-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Navigation */}
            <nav className="border-b border-gray-100 bg-white/95 shadow-lg backdrop-blur-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        {/* Logo */}
                        <div className="flex items-center">
                            <img src="/images/ffpi-logo.jpg" alt="FFPI" className="mr-3 h-10 w-10 rounded-full ring-2 ring-green-100" />
                            <div>
                                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                                    <span className="text-green-600">FFPI</span>
                                </h1>
                                <p className="hidden text-xs text-gray-500 sm:block">Future of Family Planning Initiative</p>
                            </div>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex md:items-center md:space-x-8">
                            <a
                                href={route('home')}
                                className="transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:scale-105 hover:text-green-600"
                            >
                                Home
                            </a>
                            <a
                                href={route('about')}
                                className="transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:scale-105 hover:text-green-600"
                            >
                                About
                            </a>
                            <a
                                href={route('services')}
                                className="transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:scale-105 hover:text-green-600"
                            >
                                Programs
                            </a>
                            <a
                                href={route('contact')}
                                className="transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:scale-105 hover:text-green-600"
                            >
                                Contact
                            </a>
                            <a
                                href={route('faq')}
                                className="transform text-sm font-medium text-gray-700 transition-colors duration-200 hover:scale-105 hover:text-green-600"
                            >
                                FAQ
                            </a>
                            <div className="flex items-center space-x-3">
                                <Link
                                    href={route('register')}
                                    className="transform rounded-full border border-green-600 px-6 py-2 text-sm font-medium text-green-600 shadow-md transition-all duration-200 hover:scale-105 hover:bg-green-50 hover:shadow-lg"
                                >
                                    Sign Up
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="transform rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-md transition-all duration-200 hover:scale-105 hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                                >
                                    Login
                                </Link>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-colors duration-200 hover:bg-gray-100 hover:text-green-600 focus:ring-2 focus:ring-green-500 focus:outline-none focus:ring-inset"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isMenuOpen ? (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden">
                            <div className="mt-2 space-y-1 rounded-lg bg-gray-50 px-2 pt-2 pb-3 shadow-lg sm:px-3">
                                <a
                                    href={route('home')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </a>
                                <a
                                    href={route('about')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </a>
                                <a
                                    href={route('services')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Programs
                                </a>
                                <a
                                    href={route('contact')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </a>
                                <a
                                    href={route('faq')}
                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-green-50 hover:text-green-600"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    FAQ
                                </a>
                                <div className="space-y-2 pt-2">
                                    <Link
                                        href={route('register')}
                                        className="block w-full rounded-md border border-green-600 bg-white px-3 py-2 text-center text-base font-medium text-green-600 shadow-md transition-all hover:bg-green-50 hover:shadow-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Sign Up
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="block w-full rounded-md bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 text-center text-base font-medium text-white shadow-md transition-all hover:from-green-700 hover:to-emerald-700 hover:shadow-lg"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                </div>

                                {/* Mobile Contact Info */}
                                <div className="mt-3 border-t border-gray-200 pt-3">
                                    <div className="space-y-2">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="mr-2 h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                />
                                            </svg>
                                            <span>+211 922618621</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <svg className="mr-2 h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span className="text-xs">futurefamilyplanning@gmail.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
