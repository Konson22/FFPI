<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SupportContactsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $now = now();

        $emergencyContacts = [
            [
                'category' => 'Emergency Hotlines',
                'description' => 'Call these numbers immediately in case of a medical or sexual emergency.',
                'contacts' => [
                    [
                        'name' => 'National Health Emergency Line',
                        'phone' => '999',
                        'available' => '24/7',
                        'type' => 'Toll-Free',
                        'note' => 'For medical emergencies, ambulance, or urgent reproductive health issues.',
                    ],
                    [
                        'name' => 'Reproductive Health Helpline (MoH / NGO)',
                        'phone' => '0912 345 678',
                        'available' => '8:00 AM - 8:00 PM',
                        'type' => 'Hotline',
                        'note' => 'For family planning, safe sex, and SRHR information.',
                    ],
                ],
            ],
            [
                'category' => 'Health Facilities / Clinics',
                'description' => 'Find clinics offering SRHR services including family planning, emergency contraception, and STI testing.',
                'contacts' => [
                    [
                        'name' => 'Juba Teaching Hospital SRHR Unit',
                        'phone' => '0921 234 567',
                        'location' => 'Juba, South Sudan',
                        'services' => 'Emergency contraception, post-abortion care, STI treatment',
                    ],
                    [
                        'name' => 'Marie Stopes South Sudan',
                        'phone' => '0920 123 456',
                        'location' => 'Across major towns',
                        'services' => 'Family planning, sexual health, pregnancy support',
                    ],
                ],
            ],
            [
                'category' => 'Counseling & Psychosocial Support',
                'description' => 'Free and confidential counseling for trauma, stress, or sexual assault survivors.',
                'contacts' => [
                    [
                        'name' => 'Lifeline Counseling Center',
                        'phone' => '0987 654 321',
                        'available' => 'Mon - Fri, 9 AM - 6 PM',
                        'services' => 'Trauma therapy, emotional support, youth counseling',
                    ],
                    [
                        'name' => 'Community Mental Health Network',
                        'phone' => '0945 678 901',
                        'services' => 'Mental health counseling, crisis support',
                    ],
                ],
            ],
            [
                'category' => 'Gender-Based Violence (GBV) Support Centers',
                'description' => 'If you or someone you know is experiencing violence, contact these organizations for immediate help and protection.',
                'contacts' => [
                    [
                        'name' => 'UNFPA GBV Helpline',
                        'phone' => '0970 123 987',
                        'available' => '24/7',
                        'services' => 'GBV case management, protection services',
                    ],
                    [
                        'name' => 'UN Women Support Line',
                        'phone' => '0950 222 333',
                        'services' => 'Women\'s protection and legal referral services',
                    ],
                ],
            ],
            [
                'category' => 'Youth & Reproductive Health Organizations',
                'description' => 'Organizations supporting young people with SRHR education, counseling, and outreach programs.',
                'contacts' => [
                    [
                        'name' => 'Youth Empowerment Initiative (YEI)',
                        'phone' => '0920 789 012',
                        'location' => 'Juba, South Sudan',
                        'services' => 'SRHR awareness, youth counseling, reproductive rights',
                    ],
                    [
                        'name' => 'Plan International South Sudan',
                        'phone' => '0911 555 777',
                        'services' => 'Youth SRHR programs, adolescent girls’ empowerment',
                    ],
                ],
            ],
            [
                'category' => 'Police and Legal Aid Contacts',
                'description' => 'For legal and protective services in cases of sexual abuse, harassment, or violence.',
                'contacts' => [
                    [
                        'name' => 'Police Gender Desk',
                        'phone' => '100',
                        'location' => 'All major police stations',
                        'services' => 'Reporting sexual assault, protection support',
                    ],
                    [
                        'name' => 'Legal Aid Clinic - South Sudan Law Society',
                        'phone' => '0912 789 456',
                        'services' => 'Legal advice, survivor support, rights advocacy',
                    ],
                ],
            ],
            [
                'category' => 'Important Note',
                'description' => 'All calls and visits are confidential. If you are in immediate danger, move to a safe place and call for help immediately. You are not alone - support is available.',
                'contacts' => [],
            ],
        ];

        foreach ($emergencyContacts as $entry) {
            // Ensure contacts is always a valid JSON array (never null)
            $contacts = $entry['contacts'] ?? [];
            $contactsJson = is_array($contacts) ? json_encode($contacts, JSON_UNESCAPED_UNICODE) : json_encode([], JSON_UNESCAPED_UNICODE);
            
            DB::table('support_contacts')->updateOrInsert(
                ['category' => $entry['category']],
                [
                    'description' => $entry['description'] ?? null,
                    'contacts' => $contactsJson,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]
            );
        }
    }
}


