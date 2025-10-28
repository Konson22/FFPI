import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ServicesNearYou({ user }) {
    const [viewMode, setViewMode] = useState('list');
    const [selectedService, setSelectedService] = useState('all');
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedServiceCard, setSelectedServiceCard] = useState(null);
    const [showFilters, setShowFilters] = useState(false);

    const serviceTypes = [
        { id: 'all', name: 'All Services', icon: '🏥' },
        { id: 'family-planning', name: 'Family Planning', icon: '👶' },
        { id: 'sti-testing', name: 'STI Testing', icon: '🔬' },
        { id: 'counseling', name: 'Counseling', icon: '💬' },
        { id: 'emergency', name: 'Emergency Services', icon: '🚨' },
        { id: 'vaccination', name: 'Vaccination', icon: '💉' },
        { id: 'mental-health', name: 'Mental Health', icon: '🧠' },
    ];

    const services = [
        {
            id: 1,
            name: 'Central Health Clinic',
            type: 'family-planning',
            address: '123 Main Street, Downtown',
            distance: '0.5 km',
            rating: 4.8,
            reviews: 156,
            phone: '+1 (555) 123-4567',
            hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-2PM',
            services: ['Contraception', 'STI Testing', 'Counseling'],
            isOpen: true,
            waitTime: '15 min',
            coordinates: { lat: 40.7128, lng: -74.006 },
        },
        {
            id: 2,
            name: "Women's Health Center",
            type: 'family-planning',
            address: '456 Oak Avenue, Midtown',
            distance: '1.2 km',
            rating: 4.9,
            reviews: 203,
            phone: '+1 (555) 234-5678',
            hours: 'Mon-Fri: 7AM-7PM, Sun: 10AM-4PM',
            services: ['Prenatal Care', 'Family Planning', 'STI Testing'],
            isOpen: true,
            waitTime: '30 min',
            coordinates: { lat: 40.7589, lng: -73.9851 },
        },
        {
            id: 3,
            name: 'Community Health Hub',
            type: 'counseling',
            address: '789 Pine Street, Uptown',
            distance: '2.1 km',
            rating: 4.6,
            reviews: 89,
            phone: '+1 (555) 345-6789',
            hours: 'Mon-Thu: 9AM-5PM, Fri: 9AM-3PM',
            services: ['Mental Health', 'Counseling', 'Support Groups'],
            isOpen: false,
            waitTime: null,
            coordinates: { lat: 40.7831, lng: -73.9712 },
        },
        {
            id: 4,
            name: 'Rapid Care Clinic',
            type: 'emergency',
            address: '321 Elm Street, Eastside',
            distance: '1.8 km',
            rating: 4.4,
            reviews: 67,
            phone: '+1 (555) 456-7890',
            hours: '24/7 Emergency Services',
            services: ['Emergency Contraception', 'STI Testing', 'Crisis Support'],
            isOpen: true,
            waitTime: '5 min',
            coordinates: { lat: 40.7505, lng: -73.9934 },
        },
        {
            id: 5,
            name: 'Youth Health Center',
            type: 'sti-testing',
            address: '654 Maple Drive, Westside',
            distance: '3.2 km',
            rating: 4.7,
            reviews: 134,
            phone: '+1 (555) 567-8901',
            hours: 'Mon-Fri: 10AM-6PM, Sat: 11AM-3PM',
            services: ['STI Testing', 'Contraception', 'Youth Counseling'],
            isOpen: true,
            waitTime: '20 min',
            coordinates: { lat: 40.7282, lng: -74.0776 },
        },
    ];

    const filteredServices = services.filter((service) => {
        const serviceMatch = selectedService === 'all' || service.type === selectedService;
        const locationMatch =
            !searchLocation ||
            service.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
            service.address.toLowerCase().includes(searchLocation.toLowerCase());
        return serviceMatch && locationMatch;
    });

    const getServiceIcon = (type) => {
        return serviceTypes.find((s) => s.id === type)?.icon || '🏥';
    };

    const getServiceName = (type) => {
        return serviceTypes.find((s) => s.id === type)?.name || 'Health Service';
    };

    return (
        <UserLayout user={user} role="user" currentPath="/user/services">
            <div>
                {/* Header */}
                <div className="mb-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white shadow-lg">
                    <h1 className="text-3xl font-bold">Services Near You</h1>
                    <p className="mt-2 text-green-100">Find trusted local sexual and reproductive health services</p>
                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Verified Providers</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Location Based</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Real-time Availability</span>
                        </div>
                    </div>
                </div>

                {/* Service Type Filters */}
                <div className="mb-6 flex flex-wrap gap-2">
                    {serviceTypes.map((type) => (
                        <button
                            key={type.id}
                            onClick={() => setSelectedService(type.id)}
                            className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all ${
                                selectedService === type.id
                                    ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105'
                                    : 'bg-white text-gray-700 shadow hover:shadow-md border border-gray-200'
                            }`}
                        >
                            <span className="mr-2 text-lg">{type.icon}</span>
                            {type.name}
                        </button>
                    ))}
                </div>
                {/* Search Bar */}
                <div className="mb-6 rounded-lg bg-white p-4 shadow">
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="🔍 Search by location, service, or provider..."
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm transition-all focus:border-green-500 focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div className="text-sm text-gray-600 sm:flex sm:items-center">
                            <span className="inline-flex items-center rounded-lg bg-gray-100 px-4 py-3">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                {filteredServices.length} services found
                            </span>
                        </div>
                    </div>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                    {filteredServices.map((service) => (
                        <div key={service.id} className={`group rounded-xl bg-white shadow transition-all duration-300 ${
                            selectedServiceCard === service.id 
                                ? 'ring-4 ring-green-500 ring-opacity-50 shadow-2xl' 
                                : 'hover:shadow-lg'
                        }`}
                        onClick={() => setSelectedServiceCard(selectedServiceCard === service.id ? null : service.id)}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2 flex items-center space-x-3">
                                            <span className="text-2xl">{getServiceIcon(service.type)}</span>
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                                <p className="text-sm text-gray-600">{getServiceName(service.type)}</p>
                                            </div>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">📍 Address</p>
                                                <p className="text-sm font-medium text-gray-900">{service.address}</p>
                                                <p className="text-xs text-gray-500">{service.distance} away</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">📞 Phone</p>
                                                <p className="text-sm font-medium text-gray-900">{service.phone}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">🕒 Hours</p>
                                                <p className="text-sm font-medium text-gray-900">{service.hours}</p>
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">⭐ Rating</p>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-sm font-medium text-gray-900">{service.rating}</span>
                                                    <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <p className="mb-2 text-sm text-gray-600">Services Offered</p>
                                            <div className="flex flex-wrap gap-2">
                                                {service.services.map((srv, index) => (
                                                    <span key={index} className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                                        {srv}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-4">
                                            <div className={`flex items-center space-x-1 ${service.isOpen ? 'text-green-600' : 'text-red-600'}`}>
                                                <div className={`h-2 w-2 rounded-full ${service.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                <span className="text-sm font-medium">{service.isOpen ? 'Open Now' : 'Closed'}</span>
                                            </div>
                                            {service.isOpen && service.waitTime && (
                                                <span className="text-sm text-gray-600">Wait time: {service.waitTime}</span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="ml-4 flex flex-col gap-2 sm:flex-row lg:flex-col">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.open(`https://maps.google.com/?q=${service.address}`, '_blank');
                                            }}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition-all hover:from-green-700 hover:to-emerald-700 active:scale-95"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Directions
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.location.href = `tel:${service.phone}`;
                                            }}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            Call
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert(`Booking appointment at ${service.name}`);
                                            }}
                                            className="inline-flex items-center justify-center whitespace-nowrap rounded-lg border border-green-600 bg-white px-4 py-2.5 text-sm font-medium text-green-600 transition-all hover:bg-green-50 active:scale-95"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            Book
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredServices.length === 0 && (
                    <div className="py-12 text-center">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No services found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search criteria or location.</p>
                        </div>
                    </div>
                )}
            </div>
        </UserLayout>
    );
}
