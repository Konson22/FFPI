import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function UserUsers() {
    const [searchTerm, setSearchTerm] = useState('');

    const users = [
        {
            id: 1,
            name: 'Sarah Johnson',
            role: 'Health Expert',
            status: 'Online',
            lastActive: '2 minutes ago',
            avatar: '/images/avatars/sarah.jpg',
            specialties: ['Reproductive Health', 'Family Planning'],
        },
        {
            id: 2,
            name: 'Dr. Michael Chen',
            role: 'Gynecologist',
            status: 'Available',
            lastActive: '1 hour ago',
            avatar: '/images/avatars/michael.jpg',
            specialties: ['Women\'s Health', 'Fertility'],
        },
        {
            id: 3,
            name: 'Lisa Rodriguez',
            role: 'Counselor',
            status: 'Busy',
            lastActive: '3 hours ago',
            avatar: '/images/avatars/lisa.jpg',
            specialties: ['Mental Health', 'Support'],
        },
        {
            id: 4,
            name: 'Dr. Ahmed Hassan',
            role: 'Family Medicine',
            status: 'Offline',
            lastActive: '1 day ago',
            avatar: '/images/avatars/ahmed.jpg',
            specialties: ['General Health', 'Preventive Care'],
        },
    ];

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.specialties.some(specialty => 
            specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Health Team - Family Planning" />
            
            {/* Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <h1 className="text-3xl font-bold text-gray-900">Health Team</h1>
                        <p className="mt-2 text-gray-600">Connect with healthcare professionals and experts.</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filters */}
                <div className="mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Search by name, role, or specialty..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                    Filter
                                </button>
                                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                                    Sort
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Users Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                        <div key={user.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                            <div className="p-6">
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                                            <span className="text-lg font-medium text-gray-600">
                                                {user.name.split(' ').map(n => n[0]).join('')}
                                            </span>
                                        </div>
                                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                                            user.status === 'Online' ? 'bg-green-500' :
                                            user.status === 'Available' ? 'bg-yellow-500' :
                                            user.status === 'Busy' ? 'bg-red-500' :
                                            'bg-gray-400'
                                        }`}></div>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                                        <p className="text-sm text-gray-600">{user.role}</p>
                                        <p className="text-xs text-gray-500">{user.lastActive}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <div className="flex flex-wrap gap-1">
                                        {user.specialties.map((specialty, index) => (
                                            <span
                                                key={index}
                                                className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                                            >
                                                {specialty}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-4 flex gap-2">
                                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                                        Message
                                    </button>
                                    <button className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
                                        View Profile
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredUsers.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-500">
                            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
                            <p className="mt-1 text-sm text-gray-500">Try adjusting your search terms.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
