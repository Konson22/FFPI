import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ExpertsPage({ user, doctors = [], specializations = [], filters = {} }) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [selectedSpecialization, setSelectedSpecialization] = useState(filters.specialization || 'all');
    const [selectedAvailability, setSelectedAvailability] = useState(filters.availability || 'all');
    const [viewMode, setViewMode] = useState('grid');

    // Filter doctors based on search and filters
    const filteredDoctors = doctors.filter((doctor) => {
        const matchesSearch =
            !searchTerm ||
            doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.specialization?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doctor.bio?.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesSpecialization = selectedSpecialization === 'all' || doctor.specialization === selectedSpecialization;

        const matchesAvailability =
            selectedAvailability === 'all' ||
            (selectedAvailability === 'available' && doctor.is_available) ||
            (selectedAvailability === 'unavailable' && !doctor.is_available);

        return matchesSearch && matchesSpecialization && matchesAvailability;
    });

    // Apply filters
    const applyFilters = () => {
        router.get(
            '/user/experts',
            {
                search: searchTerm || undefined,
                specialization: selectedSpecialization !== 'all' ? selectedSpecialization : undefined,
                availability: selectedAvailability !== 'all' ? selectedAvailability : undefined,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    // Handle search
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        if (e.target.value === '') {
            applyFilters();
        }
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        applyFilters();
    };

    // Render star rating
    const renderStars = (rating, totalReviews = 0) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="flex items-center">
                {[...Array(fullStars)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
                {hasHalfStar && (
                    <svg className="h-4 w-4 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <defs>
                            <linearGradient id="half">
                                <stop offset="50%" stopColor="currentColor" />
                                <stop offset="50%" stopColor="transparent" stopOpacity="1" />
                            </linearGradient>
                        </defs>
                        <path
                            fill="url(#half)"
                            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
                        />
                    </svg>
                )}
                {[...Array(emptyStars)].map((_, i) => (
                    <svg key={i} className="h-4 w-4 fill-current text-gray-300" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                ))}
                {totalReviews > 0 && <span className="ml-2 text-sm text-gray-600">({totalReviews})</span>}
            </div>
        );
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/experts">
            <Head title="Healthcare Experts - Family Planning" />

            <div>
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-lg">
                    <h1 className="text-3xl font-bold">Healthcare Experts</h1>
                    <p className="mt-2 text-blue-100">Connect with verified healthcare professionals and specialists</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            <span>Verified Experts</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span>Expert Team</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="mb-6 rounded-lg bg-white p-4 shadow">
                    <form onSubmit={handleSearchSubmit} className="mb-4">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="🔍 Search by name, specialization, or clinic..."
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                            >
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-3">
                        {/* Specialization Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Specialization:</span>
                            <select
                                value={selectedSpecialization}
                                onChange={(e) => {
                                    setSelectedSpecialization(e.target.value);
                                    applyFilters();
                                }}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Specializations</option>
                                {specializations.map((spec) => (
                                    <option key={spec} value={spec}>
                                        {spec}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Availability Filter */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Availability:</span>
                            <select
                                value={selectedAvailability}
                                onChange={(e) => {
                                    setSelectedAvailability(e.target.value);
                                    applyFilters();
                                }}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="available">Available Now</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="ml-auto flex items-center gap-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`rounded-lg p-2 transition-colors ${
                                    viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg p-2 transition-colors ${
                                    viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        <span className="font-medium">{filteredDoctors.length}</span> expert{filteredDoctors.length !== 1 ? 's' : ''} found
                    </div>
                </div>

                {/* Experts Grid/List */}
                {viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="group rounded-xl bg-white shadow transition-all duration-300 hover:shadow-lg">
                                <div className="p-6">
                                    {/* Doctor Header */}
                                    <div className="mb-4 flex items-start justify-between">
                                        <div className="flex items-center space-x-3">
                                            <div className="relative">
                                                {doctor.profile_picture ? (
                                                    <img
                                                        src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face"
                                                        alt={doctor.name}
                                                        className="h-16 w-16 rounded-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-xl font-bold text-white">
                                                        {doctor.name
                                                            .split(' ')
                                                            .map((n) => n[0])
                                                            .join('')
                                                            .toUpperCase()}
                                                    </div>
                                                )}
                                                {doctor.is_verified && (
                                                    <div className="absolute -right-1 -bottom-1 rounded-full bg-blue-600 p-1">
                                                        <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
                                                <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                doctor.is_available ? 'bg-green-100' : 'bg-gray-100'
                                            }`}
                                        >
                                            <div className={`h-3 w-3 rounded-full ${doctor.is_available ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    {doctor.average_rating > 0 && (
                                        <div className="mb-4">{renderStars(doctor.average_rating, doctor.total_reviews)}</div>
                                    )}

                                    {/* Bio */}
                                    {doctor.bio && <p className="mb-4 line-clamp-2 text-sm text-gray-600">{doctor.bio}</p>}

                                    {/* Experience */}
                                    {doctor.years_of_experience && (
                                        <div className="mb-4 flex items-center text-sm text-gray-600">
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>{doctor.years_of_experience} years of experience</span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="mt-4 flex gap-2">
                                        <Link
                                            href={`/user/appointments?doctor=${doctor.id}`}
                                            className="flex-1 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                                        >
                                            Book Appointment
                                        </Link>
                                        {doctor.phone && (
                                            <a
                                                href={`tel:${doctor.phone}`}
                                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                                            >
                                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredDoctors.map((doctor) => (
                            <div key={doctor.id} className="group rounded-xl bg-white p-6 shadow transition-all duration-300 hover:shadow-lg">
                                <div className="flex flex-col gap-4 md:flex-row">
                                    {/* Doctor Info */}
                                    <div className="flex flex-1 items-start space-x-4">
                                        <div className="relative">
                                            {doctor.profile_picture ? (
                                                <img src={doctor.profile_picture} alt={doctor.name} className="h-20 w-20 rounded-full object-cover" />
                                            ) : (
                                                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 text-2xl font-bold text-white">
                                                    {doctor.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                            {doctor.is_verified && (
                                                <div className="absolute -right-1 -bottom-1 rounded-full bg-blue-600 p-1">
                                                    <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-2 flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
                                                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                                                </div>
                                                <div
                                                    className={`flex items-center space-x-2 rounded-full px-3 py-1 ${
                                                        doctor.is_available ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                                    }`}
                                                >
                                                    <div
                                                        className={`h-2 w-2 rounded-full ${doctor.is_available ? 'bg-green-500' : 'bg-gray-400'}`}
                                                    ></div>
                                                    <span className="text-xs font-medium">{doctor.is_available ? 'Available' : 'Unavailable'}</span>
                                                </div>
                                            </div>
                                            {doctor.average_rating > 0 && (
                                                <div className="mb-2">{renderStars(doctor.average_rating, doctor.total_reviews)}</div>
                                            )}
                                            {doctor.bio && <p className="mb-2 text-sm text-gray-600">{doctor.bio}</p>}
                                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                                {doctor.years_of_experience && (
                                                    <span className="flex items-center">
                                                        <svg className="mr-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                strokeWidth={2}
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                            />
                                                        </svg>
                                                        {doctor.years_of_experience} years
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 md:w-48">
                                        <Link
                                            href={`/user/appointments?doctor=${doctor.id}`}
                                            className="rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-center text-sm font-medium text-white transition-all hover:from-blue-700 hover:to-indigo-700 active:scale-95"
                                        >
                                            Book Appointment
                                        </Link>
                                        {doctor.phone && (
                                            <a
                                                href={`tel:${doctor.phone}`}
                                                className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                                            >
                                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                                    />
                                                </svg>
                                                Call
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {filteredDoctors.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No experts found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or filters.</p>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
