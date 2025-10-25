<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        return Inertia::render('guest/main/index', [
            'features' => [
                [
                    'title' => 'Health Tracking',
                    'description' => 'Track your menstrual cycle, symptoms, and overall health with our comprehensive tracking tools.',
                    'icon' => 'health'
                ],
                [
                    'title' => 'Expert Guidance',
                    'description' => 'Get professional advice from certified healthcare experts in reproductive health.',
                    'icon' => 'expert'
                ],
                [
                    'title' => 'Community Support',
                    'description' => 'Connect with others on similar journeys and share experiences in a supportive environment.',
                    'icon' => 'community'
                ]
            ],
            'stats' => [
                'users' => 10000,
                'experts' => 150,
                'health_logs' => 50000,
                'success_stories' => 1200
            ]
        ]);
    }
    
    public function about()
    {
        return Inertia::render('guest/about', [
            'team' => [
                [
                    'name' => 'Dr. Sarah Johnson',
                    'role' => 'Chief Medical Officer',
                    'bio' => 'Board-certified gynecologist with 15+ years of experience in reproductive health.',
                    'image' => '/images/team/sarah.jpg'
                ],
                [
                    'name' => 'Dr. Michael Chen',
                    'role' => 'Head of Technology',
                    'bio' => 'Technology leader focused on creating accessible health solutions.',
                    'image' => '/images/team/michael.jpg'
                ],
                [
                    'name' => 'Dr. Emily Rodriguez',
                    'role' => 'Community Director',
                    'bio' => 'Passionate about creating supportive communities for women\'s health.',
                    'image' => '/images/team/emily.jpg'
                ]
            ]
        ]);
    }

    public function contact()
    {
        return Inertia::render('guest/contact', [
            'contact_info' => [
                'email' => 'support@familyfuture.com',
                'phone' => '+1 (555) 123-4567',
                'address' => '123 Health Street, Medical City, MC 12345'
            ]
        ]);
    }

    public function services()
    {
        return Inertia::render('guest/services', [
            'services' => [
                [
                    'title' => 'Cycle Tracking',
                    'description' => 'Advanced menstrual cycle tracking with predictive analytics.',
                    'features' => ['Symptom logging', 'Fertility predictions', 'Health insights']
                ],
                [
                    'title' => 'Expert Consultations',
                    'description' => 'One-on-one consultations with certified healthcare professionals.',
                    'features' => ['Video consultations', 'Personalized advice', 'Follow-up care']
                ],
                [
                    'title' => 'Community Support',
                    'description' => 'Connect with others and share experiences in a safe environment.',
                    'features' => ['Discussion forums', 'Peer support', 'Success stories']
                ]
            ]
        ]);
    }

    public function users()
    {
        return Inertia::render('guest/users', [
            'user_stats' => [
                'total_users' => 10000,
                'active_users' => 8500,
                'new_this_month' => 1200,
                'success_stories' => 1200
            ],
            'testimonials' => [
                [
                    'name' => 'Sarah M.',
                    'location' => 'New York',
                    'quote' => 'This platform has been a game-changer for my reproductive health journey.',
                    'rating' => 5
                ],
                [
                    'name' => 'Maria L.',
                    'location' => 'California',
                    'quote' => 'The expert consultations helped me understand my body better than ever.',
                    'rating' => 5
                ],
                [
                    'name' => 'Jennifer K.',
                    'location' => 'Texas',
                    'quote' => 'The community support here is incredible. I never feel alone in my journey.',
                    'rating' => 5
                ]
            ]
        ]);
    }

    public function srhr()
    {
        return Inertia::render('guest/learn/srhr');
    }

    public function faq()
    {
        return Inertia::render('guest/faq');
    }

    public function reports()
    {
        return Inertia::render('guest/reports');
    }
}
