import { useMemo, useState } from 'react';
import UserLayout from '../../../components/Layout/UserLayout';

const CONTACT_FIELD_LABELS = {
    phone: { label: 'Phone' },
    available: { label: 'Availability' },
    type: { label: 'Type' },
    note: { label: 'Note' },
    services: { label: 'Services' },
    location: { label: 'Location' },
};

export default function SupportContacts({ user, supportContacts = [] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categoryFilters = useMemo(() => {
        return [{ id: 'all', name: 'All Categories' }, ...supportContacts.map((item) => ({ id: item.category, name: item.category }))];
    }, [supportContacts]);

    const filteredContacts = useMemo(() => {
        return supportContacts
            .filter((category) => selectedCategory === 'all' || category.category === selectedCategory)
            .map((category) => {
                if (!searchTerm) {
                    return category;
                }

                const term = searchTerm.toLowerCase();
                const matchedContacts = (category.contacts || []).filter((contact) => {
                    return Object.values(contact || {})
                        .filter((value) => typeof value === 'string')
                        .some((value) => value.toLowerCase().includes(term));
                });

                if (category.category.toLowerCase().includes(term) || category.description?.toLowerCase().includes(term)) {
                    return category;
                }

                return {
                    ...category,
                    contacts: matchedContacts,
                };
            })
            .filter((category) => {
                if (searchTerm && selectedCategory === 'all') {
                    // When searching across all categories, hide empty results
                    if (
                        (category.contacts || []).length === 0 &&
                        !category.description?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                        !category.category.toLowerCase().includes(searchTerm.toLowerCase())
                    ) {
                        return false;
                    }
                }
                return true;
            });
    }, [supportContacts, searchTerm, selectedCategory]);

    return (
        <UserLayout user={user} role="user" currentPath="/user/support-contacts">
            <div className="space-y-6">
                {/* Header Section */}
                <header className="rounded-2xl border-2 border-cyan-500 bg-gradient-to-br from-cyan-50 via-emerald-50 to-teal-50 p-6 lg:p-8">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-3xl">
                            <p className="text-xs font-semibold tracking-wider text-cyan-600 uppercase">Safety & Support</p>
                            <h1 className="mt-2 text-2xl font-bold text-gray-900 lg:text-3xl">Support Contacts & Emergency Resources</h1>
                            <p className="mt-3 text-sm leading-relaxed text-gray-600 lg:text-base">
                                Quickly find trusted helplines, clinics, counseling centers, and legal support. All shared resources are confidential
                                and designed to keep you safe and supported.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 lg:w-64">
                            <div className="rounded-xl border-2 border-cyan-200 bg-white p-4 text-center">
                                <div className="text-2xl font-bold text-cyan-600">{supportContacts.length}</div>
                                <p className="mt-1 text-xs font-medium tracking-wide text-gray-600 uppercase">Categories</p>
                            </div>
                            <div className="rounded-xl border-2 border-emerald-200 bg-white p-4 text-center">
                                <div className="text-2xl font-bold text-emerald-600">
                                    {supportContacts.reduce((total, item) => total + (Array.isArray(item.contacts) ? item.contacts.length : 0), 0)}
                                </div>
                                <p className="mt-1 text-xs font-medium tracking-wide text-gray-600 uppercase">Contacts</p>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Search and Filter Section */}
                <section className="rounded-2xl border-2 border-gray-200 bg-white p-5 lg:p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex w-full flex-col gap-3 sm:flex-row">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(event) => setSearchTerm(event.target.value)}
                                    placeholder="Search by name, service, or phone number..."
                                    className="w-full rounded-xl border-2 border-gray-200 bg-gray-50 px-4 py-3 pr-10 text-sm transition-colors focus:border-cyan-500 focus:bg-white focus:outline-none"
                                />
                                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    </svg>
                                </span>
                            </div>
                            <select
                                value={selectedCategory}
                                onChange={(event) => setSelectedCategory(event.target.value)}
                                className="rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition-colors focus:border-cyan-500 focus:outline-none"
                            >
                                {categoryFilters.map((filter) => (
                                    <option key={filter.id} value={filter.id}>
                                        {filter.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="rounded-xl border-2 border-cyan-300 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-900">
                            <strong>Need immediate help?</strong> Call <span className="font-bold">999</span> or your nearest emergency hotline.
                        </div>
                    </div>
                </section>

                {/* Contacts List Section */}
                <section className="space-y-5">
                    {filteredContacts.length === 0 ? (
                        <div className="rounded-2xl border-2 border-gray-200 bg-white p-10 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50 text-gray-400">
                                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707"
                                    />
                                </svg>
                            </div>
                            <h2 className="mt-4 text-xl font-semibold text-gray-900">No contacts found</h2>
                            <p className="mt-2 text-sm text-gray-500">Try adjusting your search or category filters.</p>
                        </div>
                    ) : (
                        filteredContacts.map((category) => (
                            <article key={category.id} className="rounded-2xl border-2 border-gray-200 bg-white p-5 lg:p-6">
                                <div className="flex flex-col gap-4 border-b-2 border-gray-100 pb-5 lg:flex-row lg:items-start lg:justify-between">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-gray-900 lg:text-2xl">{category.category}</h2>
                                        {category.description && (
                                            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-gray-600 lg:text-base">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                    {Array.isArray(category.contacts) && category.contacts.length > 0 && (
                                        <span className="inline-flex items-center rounded-lg border-2 border-cyan-200 bg-cyan-50 px-3 py-1.5 text-xs font-semibold text-cyan-700">
                                            {category.contacts.length} contact{category.contacts.length === 1 ? '' : 's'}
                                        </span>
                                    )}
                                </div>

                                {Array.isArray(category.contacts) && category.contacts.length > 0 ? (
                                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                                        {category.contacts.map((contact, index) => (
                                            <div
                                                key={`${category.id}-${index}`}
                                                className="flex h-full flex-col justify-between rounded-xl border-2 border-gray-200 bg-gray-50 p-5 transition-colors hover:border-cyan-300 hover:bg-cyan-50/50"
                                            >
                                                <div className="space-y-3">
                                                    <div className="flex items-start justify-between gap-3">
                                                        <div className="flex-1">
                                                            <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                                                            {contact.type && (
                                                                <span className="mt-1 inline-flex rounded-lg border border-gray-300 bg-white px-2.5 py-0.5 text-xs font-semibold text-gray-700">
                                                                    {contact.type}
                                                                </span>
                                                            )}
                                                        </div>
                                                        {contact.phone && (
                                                            <a
                                                                href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                                                                className="inline-flex items-center rounded-lg border-2 border-cyan-600 bg-cyan-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-cyan-700 hover:bg-cyan-700"
                                                            >
                                                                Call
                                                            </a>
                                                        )}
                                                    </div>

                                                    <div className="space-y-2.5 text-sm text-gray-600">
                                                        {Object.entries(contact)
                                                            .filter(([key]) => key !== 'name' && key !== 'type')
                                                            .map(([key, value]) => {
                                                                if (!value) {
                                                                    return null;
                                                                }

                                                                const label = CONTACT_FIELD_LABELS[key]?.label || key;

                                                                return (
                                                                    <div key={key} className="flex items-start gap-3">
                                                                        <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-cyan-500"></div>
                                                                        <div className="flex-1">
                                                                            <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                                                                {label}
                                                                            </p>
                                                                            <p className="mt-0.5 text-sm font-medium text-gray-800">{value}</p>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-5 rounded-xl border-2 border-dashed border-cyan-300 bg-cyan-50/50 p-6 text-sm font-medium text-cyan-900">
                                        This section shares an important note. Keep this information in mind when seeking help.
                                    </div>
                                )}
                            </article>
                        ))
                    )}
                </section>
            </div>
        </UserLayout>
    );
}
