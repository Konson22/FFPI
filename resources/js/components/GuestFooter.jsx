import { Link } from '@inertiajs/react';

export default function GuestFooter() {
    return (
        <footer className="bg-gray-900 py-12 text-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center">
                            <img src="/images/ffpi-logo.jpg" alt="Family Future" className="mr-3 h-8 w-8 rounded-full" />
                            <h3 className="text-lg font-semibold">Family Future</h3>
                        </div>
                        <p className="text-gray-400">Empowering your health journey with expert guidance and community support.</p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Product</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href={route('services')} className="hover:text-white">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href={route('faq')} className="hover:text-white">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Company</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#about" className="scroll-smooth hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#team" className="scroll-smooth hover:text-white">
                                    Our Team
                                </a>
                            </li>
                            <li>
                                <a href="#programs" className="scroll-smooth hover:text-white">
                                    Programs
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="scroll-smooth hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:text-white">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                    <p>&copy; 2024 Family Future. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
