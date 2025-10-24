import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ServicesNearYou({ user }) {
    const [viewMode, setViewMode] = useState('map');
    const [selectedService, setSelectedService] = useState('all');
    const [searchLocation, setSearchLocation] = useState('');

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
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Services Near You</h1>
                    <p className="mt-2 text-gray-600">Find local sexual and reproductive health services</p>
                </div>
                {/* Search and Filters */}
                <div className="mb-8 rounded-lg bg-white p-6 shadow">
                    <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Search Location</label>
                            <input
                                type="text"
                                placeholder="Enter city, address, or zip code"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">Service Type</label>
                            <select
                                value={selectedService}
                                onChange={(e) => setSelectedService(e.target.value)}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-green-500"
                            >
                                {serviceTypes.map((service) => (
                                    <option key={service.id} value={service.id}>
                                        {service.icon} {service.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700">Search</button>
                        </div>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                            <button
                                onClick={() => setViewMode('list')}
                                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                    viewMode === 'list' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                📋 List View
                            </button>
                            <button
                                onClick={() => setViewMode('map')}
                                className={`rounded-lg px-4 py-2 text-sm font-medium ${
                                    viewMode === 'map' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                🗺️ Map View
                            </button>
                        </div>
                        <div className="text-sm text-gray-500">{filteredServices.length} services found</div>
                    </div>
                </div>

                {/* Map View */}
                {viewMode === 'map' && (
                    <div className="mb-8 rounded-lg bg-white shadow">
                        <div className="flex h-96 items-center justify-center rounded-lg bg-gray-200">
                            <div className="text-center">
                                <div className="mb-4 text-4xl">🗺️</div>
                                <h3 className="mb-2 text-lg font-medium text-gray-900">Interactive Map</h3>
                                <p className="text-gray-600">Map view coming soon! Use list view for now.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Services List */}
                <div className="space-y-6">
                    {filteredServices.map((service) => (
                        <div key={service.id} className="rounded-lg bg-white shadow transition-shadow hover:shadow-lg">
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

                                    <div className="ml-4 space-y-2">
                                        <button className="w-full rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700">
                                            Get Directions
                                        </button>
                                        <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Call Now
                                        </button>
                                        <button className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                            Book Appointment
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
