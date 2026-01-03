<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use App\Models\Blog;
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

    public function privacy()
    {
        return Inertia::render('privacy');
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

    public function climateSrhr()
    {
        return Inertia::render('guest/climate-srhr');
    }

    public function faq()
    {
        return Inertia::render('guest/faq');
    }

    public function reports()
    {
        return Inertia::render('guest/reports');
    }

    public function blog(Request $request)
    {
        $query = Blog::with(['user:id,name,email'])->published();

        // Filter by category
        if ($request->has('category') && $request->category !== 'all') {
            $query->byCategory($request->category);
        }

        // Filter by featured
        if ($request->has('featured') && $request->featured == '1') {
            $query->featured();
        }

        // Sort blogs
        $sort = $request->get('sort', 'latest');
        switch ($sort) {
            case 'popular':
                $query->mostViewed();
                break;
            case 'featured':
                $query->featured()->latest();
                break;
            case 'latest':
            default:
                $query->latest();
                break;
        }

        // Search by title or content
        if ($request->has('search')) {
            $search = $request->get('search');
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('content', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        // Pagination
        $perPage = $request->get('per_page', 12);
        $blogs = $query->paginate($perPage);

        // Format blogs data
        $formattedBlogs = $blogs->map(function ($blog) {
            return [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'excerpt' => $blog->excerpt,
                'featured_image' => $blog->featured_image,
                'category' => $blog->category,
                'is_featured' => $blog->is_featured,
                'views_count' => $blog->views_count,
                'published_at' => $blog->published_at?->toDateString(),
                'author' => [
                    'id' => $blog->user->id,
                    'name' => $blog->user->name,
                    'email' => $blog->user->email,
                ],
            ];
        });

        $categories = [
            'all',
            'general',
            'sexual-health',
            'reproductive-health',
            'contraception',
            'relationships',
            'mental-health',
            'stis',
            'family-planning',
            'education'
        ];

        return Inertia::render('guest/blog/index', [
            'blogs' => $formattedBlogs,
            'categories' => $categories,
            'pagination' => [
                'current_page' => $blogs->currentPage(),
                'last_page' => $blogs->lastPage(),
                'per_page' => $blogs->perPage(),
                'total' => $blogs->total(),
            ],
            'filters' => [
                'category' => $request->get('category', 'all'),
                'search' => $request->get('search', ''),
                'sort' => $request->get('sort', 'latest'),
            ],
        ]);
    }

    public function blogShow($slug)
    {
        try {
            // Try to find by slug first, then by ID
            $blog = Blog::where('slug', $slug)
                ->orWhere('id', $slug)
                ->with(['user:id,name,email'])
                ->published()
                ->firstOrFail();

            // Increment views count
            $blog->incrementViews();

            // Format blog data
            $formattedBlog = [
                'id' => $blog->id,
                'title' => $blog->title,
                'slug' => $blog->slug,
                'content' => $blog->content,
                'excerpt' => $blog->excerpt,
                'featured_image' => $blog->featured_image,
                'category' => $blog->category,
                'is_featured' => $blog->is_featured,
                'views_count' => $blog->views_count + 1, // Incremented
                'published_at' => $blog->published_at?->toDateString(),
                'author' => [
                    'id' => $blog->user->id,
                    'name' => $blog->user->name,
                    'email' => $blog->user->email,
                ],
            ];

            // Get related blogs (same category, excluding current blog)
            $relatedBlogs = Blog::with(['user:id,name,email'])
                ->published()
                ->where('category', $blog->category)
                ->where('id', '!=', $blog->id)
                ->latest()
                ->limit(3)
                ->get()
                ->map(function ($relatedBlog) {
                    return [
                        'id' => $relatedBlog->id,
                        'title' => $relatedBlog->title,
                        'slug' => $relatedBlog->slug,
                        'excerpt' => $relatedBlog->excerpt,
                        'featured_image' => $relatedBlog->featured_image,
                        'category' => $relatedBlog->category,
                        'published_at' => $relatedBlog->published_at?->toDateString(),
                    ];
                });

            return Inertia::render('guest/blog/show', [
                'blog' => $formattedBlog,
                'relatedBlogs' => $relatedBlogs,
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return Inertia::render('guest/blog/show', [
                'blog' => null,
                'relatedBlogs' => [],
            ]);
        }
    }
}
