import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../../layouts/AdminLayout';
import { useState } from 'react';

export default function AdminSettings({ user }) {
    const [activeTab, setActiveTab] = useState('general');
    const { data, setData, put, processing, errors } = useForm({
        site_name: 'FFPI Family Planning Platform',
        site_description: 'Comprehensive family planning education and support platform',
        contact_email: 'admin@ffpi.com',
        maintenance_mode: false,
        registration_enabled: true,
        email_verification_required: true,
        max_file_size: '10MB',
        allowed_file_types: 'jpg,jpeg,png,pdf,doc,docx',
        analytics_enabled: true,
        google_analytics_id: '',
        facebook_pixel_id: '',
        social_login_enabled: true,
        google_client_id: '',
        facebook_app_id: '',
        email_notifications: true,
        sms_notifications: false,
        push_notifications: true,
        cache_duration: '3600',
        session_timeout: '120',
        password_min_length: '8',
        require_strong_passwords: true,
        two_factor_enabled: false,
        audit_logging: true,
        backup_frequency: 'daily',
        backup_retention: '30',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/admin/settings/update', {
            onSuccess: () => {
                // Show success message
            }
        });
    };

    const tabs = [
        { id: 'general', name: 'General', icon: '⚙️' },
        { id: 'appearance', name: 'Appearance', icon: '🎨' },
        { id: 'security', name: 'Security', icon: '🔒' },
        { id: 'notifications', name: 'Notifications', icon: '🔔' },
        { id: 'integrations', name: 'Integrations', icon: '🔗' },
        { id: 'backup', name: 'Backup & Maintenance', icon: '💾' },
    ];

    return (
        <AdminLayout user={user} currentPath="/admin/settings">
            <Head title="System Settings" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
                        <p className="mt-2 text-gray-600">Manage your platform configuration and preferences</p>
                    </div>
                </div>

                {/* Settings Form */}
                <div className="bg-white shadow rounded-lg">
                    {/* Tab Navigation */}
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`${
                                        activeTab === tab.id
                                            ? 'border-blue-500 text-blue-600'
                                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                                >
                                    <span className="mr-2">{tab.icon}</span>
                                    {tab.name}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Tab Content */}
                    <form onSubmit={handleSubmit} className="p-6">
                        {activeTab === 'general' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">General Settings</h3>
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Site Name</label>
                                        <input
                                            type="text"
                                            value={data.site_name}
                                            onChange={(e) => setData('site_name', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.site_name && <p className="mt-1 text-sm text-red-600">{errors.site_name}</p>}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                                        <input
                                            type="email"
                                            value={data.contact_email}
                                            onChange={(e) => setData('contact_email', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.contact_email && <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>}
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">Site Description</label>
                                        <textarea
                                            rows={3}
                                            value={data.site_description}
                                            onChange={(e) => setData('site_description', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                        {errors.site_description && <p className="mt-1 text-sm text-red-600">{errors.site_description}</p>}
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.maintenance_mode}
                                            onChange={(e) => setData('maintenance_mode', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Maintenance Mode</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.registration_enabled}
                                            onChange={(e) => setData('registration_enabled', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Enable User Registration</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Security Settings</h3>
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Password Minimum Length</label>
                                        <input
                                            type="number"
                                            value={data.password_min_length}
                                            onChange={(e) => setData('password_min_length', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Session Timeout (minutes)</label>
                                        <input
                                            type="number"
                                            value={data.session_timeout}
                                            onChange={(e) => setData('session_timeout', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.require_strong_passwords}
                                            onChange={(e) => setData('require_strong_passwords', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Require Strong Passwords</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.two_factor_enabled}
                                            onChange={(e) => setData('two_factor_enabled', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Enable Two-Factor Authentication</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.audit_logging}
                                            onChange={(e) => setData('audit_logging', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Enable Audit Logging</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'notifications' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Notification Settings</h3>
                                
                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.email_notifications}
                                            onChange={(e) => setData('email_notifications', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Email Notifications</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.sms_notifications}
                                            onChange={(e) => setData('sms_notifications', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">SMS Notifications</label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.push_notifications}
                                            onChange={(e) => setData('push_notifications', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Push Notifications</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'integrations' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Third-Party Integrations</h3>
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Google Analytics ID</label>
                                        <input
                                            type="text"
                                            value={data.google_analytics_id}
                                            onChange={(e) => setData('google_analytics_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Facebook Pixel ID</label>
                                        <input
                                            type="text"
                                            value={data.facebook_pixel_id}
                                            onChange={(e) => setData('facebook_pixel_id', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={data.social_login_enabled}
                                            onChange={(e) => setData('social_login_enabled', e.target.checked)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-900">Enable Social Login</label>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'backup' && (
                            <div className="space-y-6">
                                <h3 className="text-lg font-medium text-gray-900">Backup & Maintenance</h3>
                                
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Backup Frequency</label>
                                        <select
                                            value={data.backup_frequency}
                                            onChange={(e) => setData('backup_frequency', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Backup Retention (days)</label>
                                        <input
                                            type="number"
                                            value={data.backup_retention}
                                            onChange={(e) => setData('backup_retention', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Cache Duration (seconds)</label>
                                        <input
                                            type="number"
                                            value={data.cache_duration}
                                            onChange={(e) => setData('cache_duration', e.target.value)}
                                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Save Button */}
                        <div className="flex justify-end pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                            >
                                {processing ? 'Saving...' : 'Save Settings'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
