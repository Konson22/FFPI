export default function BackToTop() {
    return (
        <div className="fixed right-6 bottom-6 z-50">
            <a
                href="#top"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition-all hover:bg-green-700 hover:shadow-xl"
                aria-label="Back to top"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </a>
        </div>
    );
}
