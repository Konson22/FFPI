<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get filter parameters
        $category = $request->get('category', 'all');
        $sort = $request->get('sort', 'latest'); // latest, popular, featured
        
        // Build query for blogs
        $query = Blog::with(['user:id,name'])
            ->published();
        
        // Filter by category
        if ($category !== 'all') {
            $query->byCategory($category);
        }
        
        // Sort blogs
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
        
        // Get blogs with pagination
        $blogs = $query->paginate(12)
            ->through(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'excerpt' => $blog->excerpt,
                    'featured_image' => $blog->featured_image,
                    'category' => $blog->category,
                    'is_featured' => $blog->is_featured,
                    'views_count' => $blog->views_count,
                    'published_at' => $blog->published_at?->diffForHumans(),
                    'published_at_formatted' => $blog->published_at?->format('M d, Y'),
                    'user' => [
                        'id' => $blog->user->id,
                        'name' => $blog->user->name,
                    ],
                ];
            });
        
        // Get unique categories for filter
        $categories = Blog::published()
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->unique()
            ->values()
            ->toArray();
        
        // Get featured blogs
        $featuredBlogs = Blog::with(['user:id,name'])
            ->published()
            ->featured()
            ->latest()
            ->limit(3)
            ->get()
            ->map(function ($blog) {
                return [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'excerpt' => $blog->excerpt,
                    'featured_image' => $blog->featured_image,
                    'category' => $blog->category,
                    'views_count' => $blog->views_count,
                    'published_at' => $blog->published_at?->diffForHumans(),
                    'user' => [
                        'id' => $blog->user->id,
                        'name' => $blog->user->name,
                    ],
                ];
            });
        
        return Inertia::render('user/blogs/index', [
            'user' => $user,
            'blogs' => $blogs,
            'featuredBlogs' => $featuredBlogs,
            'filters' => [
                'category' => $category,
                'sort' => $sort,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Display the specified blog.
     */
    public function show($slug)
    {
        $user = Auth::user();
        
        $blog = Blog::with(['user:id,name'])
            ->published()
            ->where('slug', $slug)
            ->firstOrFail();
        
        // Increment views
        $blog->incrementViews();
        
        // Get related blogs (same category, excluding current)
        $relatedBlogs = Blog::with(['user:id,name'])
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
                    'views_count' => $relatedBlog->views_count,
                    'published_at' => $relatedBlog->published_at?->diffForHumans(),
                    'user' => [
                        'id' => $relatedBlog->user->id,
                        'name' => $relatedBlog->user->name,
                    ],
                ];
            });
        
        // Format blog data
        $blogData = [
            'id' => $blog->id,
            'title' => $blog->title,
            'slug' => $blog->slug,
            'content' => $blog->content,
            'excerpt' => $blog->excerpt,
            'featured_image' => $blog->featured_image,
            'category' => $blog->category,
            'is_featured' => $blog->is_featured,
            'views_count' => $blog->views_count + 1, // Incremented
            'published_at' => $blog->published_at?->diffForHumans(),
            'published_at_formatted' => $blog->published_at?->format('M d, Y'),
            'user' => [
                'id' => $blog->user->id,
                'name' => $blog->user->name,
            ],
        ];
        
        return Inertia::render('user/blogs/show', [
            'user' => $user,
            'blog' => $blogData,
            'relatedBlogs' => $relatedBlogs,
        ]);
    }
}
