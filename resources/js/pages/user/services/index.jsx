import { useCallback, useEffect, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function ServicesNearYou({ user, services = [], serviceCategories = [] }) {
    const [viewMode, setViewMode] = useState('list');
    const [selectedService, setSelectedService] = useState('all');
    const [searchLocation, setSearchLocation] = useState('');
    const [selectedServiceCard, setSelectedServiceCard] = useState(null);
    const [showFilters, setShowFilters] = useState(false);
    const [userLocation, setUserLocation] = useState(null);
    const [locationError, setLocationError] = useState(null);
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    // Service type icons mapping
    const serviceTypeIcons = {
        all: '🏥',
        'family-planning': '👶',
        'sti-testing': '🔬',
        counseling: '💬',
        emergency: '🚨',
        vaccination: '💉',
        'mental-health': '🧠',
    };

    // Service type names mapping
    const serviceTypeNames = {
        all: 'All Services',
        'family-planning': 'Family Planning',
        'sti-testing': 'STI Testing',
        counseling: 'Counseling',
        emergency: 'Emergency Services',
        vaccination: 'Vaccination',
        'mental-health': 'Mental Health',
    };

    // Build service types from database categories
    const serviceTypes = [
        { id: 'all', name: 'All Services', icon: '🏥' },
        ...serviceCategories.map((cat) => ({
            id: cat,
            name: serviceTypeNames[cat] || cat.charAt(0).toUpperCase() + cat.slice(1).replace(/-/g, ' '),
            icon: serviceTypeIcons[cat] || '🏥',
        })),
    ];

    // Calculate distance using Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        if (!lat1 || !lon1 || !lat2 || !lon2) {
            return null;
        }

        const R = 6371; // Earth's radius in kilometers
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        return distance;
    };

    // Use database services, fallback to empty array if none provided
    const allServices = services && services.length > 0 ? services : [];

    const filteredServices = allServices
        .filter((service) => {
            const serviceMatch = selectedService === 'all' || service.type === selectedService;
            const locationMatch =
                !searchLocation ||
                service.name.toLowerCase().includes(searchLocation.toLowerCase()) ||
                service.address.toLowerCase().includes(searchLocation.toLowerCase());
            return serviceMatch && locationMatch;
        })
        .map((service) => {
            // Calculate and add distance to each service
            const distance =
                userLocation && service.coordinates?.lat && service.coordinates?.lng
                    ? calculateDistance(userLocation.lat, userLocation.lng, service.coordinates.lat, service.coordinates.lng)
                    : null;

            return {
                ...service,
                calculatedDistance: distance,
            };
        })
        .sort((a, b) => {
            // Sort by distance if available, otherwise keep original order
            if (a.calculatedDistance === null && b.calculatedDistance === null) return 0;
            if (a.calculatedDistance === null) return 1;
            if (b.calculatedDistance === null) return -1;
            return a.calculatedDistance - b.calculatedDistance;
        });

    const getServiceIcon = (type) => {
        const serviceType = serviceTypes.find((s) => s.id === type);
        return serviceType?.icon || serviceTypeIcons[type] || '🏥';
    };

    const getServiceName = (type) => {
        const serviceType = serviceTypes.find((s) => s.id === type);
        return serviceType?.name || serviceTypeNames[type] || 'Health Service';
    };

    // Format address for display
    const formatAddress = (service) => {
        if (service.coordinates?.lat && service.coordinates?.lng) {
            return service.address || 'Address not available';
        }
        return service.address || 'Address not available';
    };

    // Format distance display
    const formatDistance = (service) => {
        if (!userLocation || !service.coordinates?.lat || !service.coordinates?.lng) {
            return null;
        }

        const distance = calculateDistance(userLocation.lat, userLocation.lng, service.coordinates.lat, service.coordinates.lng);

        if (distance === null) {
            return null;
        }

        // Format distance nicely
        if (distance < 1) {
            return `${Math.round(distance * 1000)}m away`;
        } else if (distance < 10) {
            return `${distance.toFixed(1)}km away`;
        } else {
            return `${Math.round(distance)}km away`;
        }
    };

    // Function to get user's current location
    const getLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setLocationError('Geolocation is not supported by your browser.');
            setIsGettingLocation(false);
            return;
        }

        setIsGettingLocation(true);
        setLocationError(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                });
                setLocationError(null);
                setIsGettingLocation(false);
            },
            (error) => {
                console.error('Error getting location:', error);
                let errorMessage = 'Unable to get your location.';
                let helpText = '';

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage = 'Location access denied.';
                        helpText =
                            'Please enable location permissions in your browser settings. Click the lock icon in your address bar and allow location access.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage = 'Location information is unavailable.';
                        helpText = 'Your device may not have GPS or location services enabled. Please check your device settings.';
                        break;
                    case error.TIMEOUT:
                        errorMessage = 'Location request timed out.';
                        helpText = 'The location request took too long. Please try again.';
                        break;
                    default:
                        errorMessage = 'Unable to get your location.';
                        helpText = 'Please check your browser settings and ensure location services are enabled.';
                        break;
                }

                // Check if running on HTTP (not HTTPS) - geolocation requires HTTPS in production
                if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
                    helpText += ' Note: Geolocation requires HTTPS in production. Your site appears to be running on HTTP.';
                }

                setLocationError(errorMessage + (helpText ? ` ${helpText}` : ''));
                setIsGettingLocation(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 300000, // Cache for 5 minutes
            },
        );
    }, []);

    // Get user's current location on mount
    useEffect(() => {
        getLocation();
    }, [getLocation]);

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
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                            </svg>
                            <span>Verified Providers</span>
                        </div>
                        <div className="flex items-center">
                            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
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
                                    ? 'scale-105 bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                                    : 'border border-gray-200 bg-white text-gray-700 shadow hover:shadow-md'
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                {filteredServices.length} services found
                            </span>
                        </div>
                    </div>
                    {locationError && (
                        <div className="mt-3 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-800">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start">
                                    <svg className="mt-0.5 mr-2 h-4 w-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                    <div className="flex-1">
                                        <p className="font-medium">{locationError.split('. ')[0]}.</p>
                                        {locationError.includes('. ') && (
                                            <p className="mt-1 text-xs text-yellow-700">{locationError.split('. ').slice(1).join('. ')}</p>
                                        )}
                                        <p className="mt-1 text-xs text-yellow-700">Services will still be shown, but without distance sorting.</p>
                                    </div>
                                </div>
                                <div className="ml-3 flex gap-2">
                                    <button
                                        onClick={getLocation}
                                        disabled={isGettingLocation}
                                        className="rounded px-2 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {isGettingLocation ? 'Getting...' : 'Retry'}
                                    </button>
                                    <button
                                        onClick={() => setLocationError(null)}
                                        className="rounded px-2 py-1 text-xs font-medium text-yellow-800 hover:bg-yellow-100"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {userLocation && (
                        <div className="mt-3 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-800">
                            <div className="flex items-center">
                                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Location detected. Services sorted by distance.
                            </div>
                        </div>
                    )}
                </div>

                {/* Services List */}
                <div className="space-y-4">
                    {filteredServices.map((service) => (
                        <div
                            key={service.id}
                            className={`group rounded-xl bg-white shadow transition-all duration-300 ${
                                selectedServiceCard === service.id ? 'ring-opacity-50 shadow-2xl ring-4 ring-green-500' : 'hover:shadow-lg'
                            }`}
                            onClick={() => setSelectedServiceCard(selectedServiceCard === service.id ? null : service.id)}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="mb-2">
                                            <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                                            <p className="text-sm text-gray-600">{getServiceName(service.type)}</p>
                                        </div>

                                        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">📍 Address</p>
                                                <p className="text-sm font-medium text-gray-900">{formatAddress(service)}</p>
                                                {formatDistance(service) && <p className="text-xs text-gray-500">{formatDistance(service)}</p>}
                                            </div>
                                            <div>
                                                <p className="mb-1 text-sm text-gray-600">⭐ Rating</p>
                                                <div className="flex items-center space-x-1">
                                                    <span className="text-sm font-medium text-gray-900">{service.rating}</span>
                                                    <span className="text-xs text-gray-500">({service.reviews} reviews)</span>
                                                </div>
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
                                                const address = formatAddress(service);
                                                if (service.coordinates?.lat && service.coordinates?.lng) {
                                                    window.open(
                                                        `https://maps.google.com/?q=${service.coordinates.lat},${service.coordinates.lng}`,
                                                        '_blank',
                                                    );
                                                } else {
                                                    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`, '_blank');
                                                }
                                            }}
                                            className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-all hover:from-green-700 hover:to-emerald-700 active:scale-95"
                                        >
                                            <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                            Directions
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.location.href = `tel:${service.phone}`;
                                            }}
                                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium whitespace-nowrap text-gray-700 transition-all hover:bg-gray-50 active:scale-95"
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
