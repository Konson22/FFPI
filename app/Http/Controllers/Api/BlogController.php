<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;

class BlogController extends Controller
{
    /**
     * Display a listing of blogs.
     */
    public function index(Request $request): JsonResponse
    {
        try {
            $query = Blog::with(['user:id,name,email']);

            // Filter by status (default: published for public, all for authenticated)
            $status = $request->get('status');
            if ($status) {
                if ($status === 'published') {
                    $query->published();
                } else {
                    $query->where('status', $status);
                }
            } else {
                // If not authenticated, only show published blogs
                if (!Auth::check()) {
                    $query->published();
                }
            }

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

            return response()->json([
                'success' => true,
                'message' => 'Blogs retrieved successfully',
                'blogs' => $blogs->items(),
                'pagination' => [
                    'current_page' => $blogs->currentPage(),
                    'last_page' => $blogs->lastPage(),
                    'per_page' => $blogs->perPage(),
                    'total' => $blogs->total(),
                ]
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blogs',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified blog.
     */
    public function show($id): JsonResponse
    {
        try {
            // Try to find by ID first, then by slug
            $blog = Blog::where('id', $id)
                ->orWhere('slug', $id)
                ->with(['user:id,name,email'])
                ->firstOrFail();

            // Increment views count for published blogs
            if ($blog->status === 'published') {
                $blog->incrementViews();
            }

            return response()->json([
                'success' => true,
                'message' => 'Blog retrieved successfully',
                'data' => [
                    'id' => $blog->id,
                    'title' => $blog->title,
                    'slug' => $blog->slug,
                    'content' => $blog->content,
                    'excerpt' => $blog->excerpt,
                    'featured_image' => $blog->featured_image,
                    'category' => $blog->category,
                    'status' => $blog->status,
                    'is_featured' => $blog->is_featured,
                    'views_count' => $blog->views_count,
                    'published_at' => $blog->published_at,
                    'author' => [
                        'id' => $blog->user->id,
                        'name' => $blog->user->name,
                        'email' => $blog->user->email,
                    ],
                    'created_at' => $blog->created_at,
                    'updated_at' => $blog->updated_at,
                ]
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve blog',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created blog.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'content' => 'required|string',
                'excerpt' => 'nullable|string|max:500',
                'featured_image' => 'nullable|string|max:255',
                'category' => 'required|in:general,sexual-health,reproductive-health,contraception,relationships,mental-health,stis,family-planning,education',
                'status' => 'nullable|in:draft,published,archived',
                'is_featured' => 'nullable|boolean',
                'published_at' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Generate slug from title
            $slug = Blog::generateSlug($request->title);

            // Set published_at if status is published and published_at is not provided
            $publishedAt = $request->published_at;
            if ($request->status === 'published' && !$publishedAt) {
                $publishedAt = now();
            }

            $blog = Blog::create([
                'user_id' => $user->id,
                'title' => $request->title,
                'slug' => $slug,
                'content' => $request->content,
                'excerpt' => $request->excerpt,
                'featured_image' => $request->featured_image,
                'category' => $request->category,
                'status' => $request->status ?? 'draft',
                'is_featured' => $request->is_featured ?? false,
                'published_at' => $publishedAt,
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Blog created successfully',
                'data' => $blog->load('user:id,name,email')
            ], 201);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create blog',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified blog.
     */
    public function update(Request $request, $id): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Try to find by ID first, then by slug
            $blog = Blog::where('id', $id)
                ->orWhere('slug', $id)
                ->firstOrFail();

            // Check if user owns the blog or is admin
            if ($blog->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to update this blog'
                ], 403);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'excerpt' => 'nullable|string|max:500',
                'featured_image' => 'nullable|string|max:255',
                'category' => 'sometimes|required|in:general,sexual-health,reproductive-health,contraception,relationships,mental-health,stis,family-planning,education',
                'status' => 'nullable|in:draft,published,archived',
                'is_featured' => 'nullable|boolean',
                'published_at' => 'nullable|date',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 422);
            }

            // Update slug if title changed
            if ($request->has('title') && $request->title !== $blog->title) {
                $slug = Blog::generateSlug($request->title);
                $request->merge(['slug' => $slug]);
            }

            // Set published_at if status is being changed to published
            if ($request->has('status') && $request->status === 'published' && !$blog->published_at) {
                $request->merge(['published_at' => $request->published_at ?? now()]);
            }

            $blog->update($request->only([
                'title',
                'slug',
                'content',
                'excerpt',
                'featured_image',
                'category',
                'status',
                'is_featured',
                'published_at',
            ]));

            return response()->json([
                'success' => true,
                'message' => 'Blog updated successfully',
                'data' => $blog->fresh()->load('user:id,name,email')
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update blog',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified blog.
     */
    public function destroy($id): JsonResponse
    {
        try {
            $user = Auth::user();
            
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized'
                ], 401);
            }

            // Try to find by ID first, then by slug
            $blog = Blog::where('id', $id)
                ->orWhere('slug', $id)
                ->firstOrFail();

            // Check if user owns the blog or is admin
            if ($blog->user_id !== $user->id) {
                return response()->json([
                    'success' => false,
                    'message' => 'You do not have permission to delete this blog'
                ], 403);
            }

            $blog->delete();

            return response()->json([
                'success' => true,
                'message' => 'Blog deleted successfully'
            ], 200);

        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found'
            ], 404);
        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete blog',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    /**
     * Get all available categories.
     */
    public function categories(): JsonResponse
    {
        try {
            $categories = [
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

            return response()->json([
                'success' => true,
                'message' => 'Categories retrieved successfully',
                'data' => $categories
            ], 200);

        } catch (\Throwable $th) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $th->getMessage()
            ], 500);
        }
    }
}

