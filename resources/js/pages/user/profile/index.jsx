import { Head } from '@inertiajs/react';
import { useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

export default function UserProfile({ user }) {
    const [activeTab, setActiveTab] = useState('personal');
    const [isEditing, setIsEditing] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: 'Sarah',
        lastName: 'Johnson',
        email: 'sarah.johnson@example.com',
        phone: '+1 (555) 123-4567',
        dateOfBirth: '1990-05-15',
        gender: 'Female',
        address: '123 Main St, City, State 12345',
        emergencyContact: 'John Johnson',
        emergencyPhone: '+1 (555) 987-6543',
        medicalHistory: 'No significant medical history',
        allergies: 'None known',
        medications: 'Iron supplement, Folic acid',
    });

    const handleInputChange = (field, value) => {
        setProfileData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSave = () => {
        // Here you would typically save to the backend
        setIsEditing(false);
        console.log('Profile saved:', profileData);
    };

    const tabs = [
        { id: 'personal', name: 'Personal Information', icon: '👤' },
        { id: 'medical', name: 'Medical Information', icon: '🏥' },
        { id: 'emergency', name: 'Emergency Contacts', icon: '🚨' },
        { id: 'preferences', name: 'Preferences', icon: '⚙️' },
    ];

    return (
        <UserLayout user={user} role="user" currentPath="/user/health">
            <Head title="Profile - Family Planning" />

            {/* Header */}
            <div className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                                <p className="mt-2 text-gray-600">Manage your personal and medical information.</p>
                            </div>
                            <div className="flex gap-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                                        >
                                            Save Changes
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                                    >
                                        Edit Profile
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg bg-white shadow">
                            <div className="p-6">
                                <div className="text-center">
                                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-300">
                                        <span className="text-2xl font-medium text-gray-600">
                                            {profileData.firstName[0]}
                                            {profileData.lastName[0]}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900">
                                        {profileData.firstName} {profileData.lastName}
                                    </h3>
                                    <p className="text-sm text-gray-500">{profileData.email}</p>
                                </div>

                                <nav className="mt-6">
                                    <div className="space-y-1">
                                        {tabs.map((tab) => (
                                            <button
                                                key={tab.id}
                                                onClick={() => setActiveTab(tab.id)}
                                                className={`flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                                    activeTab === tab.id ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                <span className="mr-3">{tab.icon}</span>
                                                {tab.name}
                                            </button>
                                        ))}
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="rounded-lg bg-white shadow">
                            <div className="border-b border-gray-200 px-6 py-4">
                                <h2 className="text-lg font-medium text-gray-900">{tabs.find((tab) => tab.id === activeTab)?.name}</h2>
                            </div>

                            <div className="p-6">
                                {activeTab === 'personal' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">First Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.firstName}
                                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Last Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.lastName}
                                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Email</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Phone</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                                disabled={!isEditing}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>

                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Date of Birth</label>
                                                <input
                                                    type="date"
                                                    value={profileData.dateOfBirth}
                                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Gender</label>
                                                <select
                                                    value={profileData.gender}
                                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                >
                                                    <option value="Female">Female</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Other">Other</option>
                                                    <option value="Prefer not to say">Prefer not to say</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Address</label>
                                            <textarea
                                                value={profileData.address}
                                                onChange={(e) => handleInputChange('address', e.target.value)}
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'medical' && (
                                    <div className="space-y-6">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Medical History</label>
                                            <textarea
                                                value={profileData.medicalHistory}
                                                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                                                disabled={!isEditing}
                                                rows={4}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Allergies</label>
                                            <textarea
                                                value={profileData.allergies}
                                                onChange={(e) => handleInputChange('allergies', e.target.value)}
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-gray-700">Current Medications</label>
                                            <textarea
                                                value={profileData.medications}
                                                onChange={(e) => handleInputChange('medications', e.target.value)}
                                                disabled={!isEditing}
                                                rows={3}
                                                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                            />
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'emergency' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Emergency Contact Name</label>
                                                <input
                                                    type="text"
                                                    value={profileData.emergencyContact}
                                                    onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                />
                                            </div>
                                            <div>
                                                <label className="mb-2 block text-sm font-medium text-gray-700">Emergency Contact Phone</label>
                                                <input
                                                    type="tel"
                                                    value={profileData.emergencyPhone}
                                                    onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                                                    disabled={!isEditing}
                                                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'preferences' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="mb-4 text-lg font-medium text-gray-900">Notification Preferences</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Email notifications</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">SMS notifications</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                                    <span className="ml-2 text-sm text-gray-700">Push notifications</span>
                                                </label>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="mb-4 text-lg font-medium text-gray-900">Privacy Settings</h3>
                                            <div className="space-y-3">
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Allow data sharing for research</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="checkbox"
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                        defaultChecked
                                                    />
                                                    <span className="ml-2 text-sm text-gray-700">Share data with healthcare providers</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </UserLayout>
    );
}
