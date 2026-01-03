export default function BadgeCard({ title }) {
    return (
        <div className="mb-6 flex justify-center">
            <div className="group relative inline-flex items-center">
                {/* Decorative elements */}
                <div className="absolute -left-4 h-px w-8 bg-gradient-to-r from-transparent to-green-600"></div>
                <div className="absolute -right-4 h-px w-8 bg-gradient-to-l from-transparent to-green-600"></div>

                {/* Badge with polygon shape */}
                <div className="relative overflow-hidden bg-gradient-to-r from-green-600 via-green-700 to-green-600 px-8 py-3 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                    {/* Text */}
                    <span className="relative text-sm font-bold tracking-wider text-white uppercase">{title}</span>
                </div>
            </div>
        </div>
    );
}
