<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\PostComments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        
        // Get filter parameters
        $category = $request->get('category', 'all');
        $type = $request->get('type', 'all');
        $sort = $request->get('sort', 'latest'); // latest, popular, most_reacted
        
        // Build query for posts
        $query = Post::with(['user:id,name', 'media', 'comments' => function($q) {
            $q->published()
              ->with(['user:id,name'])
              ->whereNull('parent_id')
              ->orderBy('created_at', 'asc')
              ->limit(5);
        }])
        ->published();
        
        // Filter by category
        if ($category !== 'all') {
            $query->byCategory($category);
        }
        
        // Filter by type
        if ($type !== 'all') {
            $query->byType($type);
        }
        
        // Sort posts
        switch ($sort) {
            case 'popular':
                $query->popular();
                break;
            case 'most_reacted':
                $query->mostReacted();
                break;
            case 'latest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }
        
        // Get posts with pagination
        $posts = $query->paginate(12)
            ->through(function ($post) use ($user) {
                return [
                    'id' => $post->id,
                    'title' => $post->title,
                    'content' => $post->content,
                    'category' => $post->category,
                    'type' => $post->type,
                    'status' => $post->status,
                    'is_featured' => $post->is_featured,
                    'allow_comments' => $post->allow_comments,
                    'allow_sharing' => $post->allow_sharing,
                    'views_count' => $post->views_count,
                    'reactions_count' => $post->reactions_count,
                    'comments_count' => $post->comments->count(),
                    'created_at' => $post->created_at->diffForHumans(),
                    'created_at_formatted' => $post->created_at->format('M d, Y'),
                    'user' => [
                        'id' => $post->user->id,
                        'name' => $post->user->name,
                    ],
                    'is_owner' => $post->user_id === $user->id,
                    'media' => $post->media->map(function ($media) {
                        return [
                            'id' => $media->id,
                            'media_type' => $media->media_type,
                            'media_url' => $media->media_url,
                            'alt_text' => $media->alt_text,
                        ];
                    }),
                    'comments' => $post->comments->map(function ($comment) {
                        return [
                            'id' => $comment->id,
                            'content' => $comment->content,
                            'reactions_count' => $comment->reactions_count,
                            'created_at' => $comment->created_at->diffForHumans(),
                            'user' => [
                                'id' => $comment->user->id,
                                'name' => $comment->user->name,
                            ],
                        ];
                    }),
                ];
            });
        
        // Get user's posts count
        $userPostsCount = Post::where('user_id', $user->id)->count();
        
        // Get unique categories for filter
        $categories = Post::published()
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category')
            ->unique()
            ->values()
            ->toArray();
        
        return Inertia::render('user/posts/index', [
            'user' => $user,
            'posts' => $posts,
            'userPostsCount' => $userPostsCount,
            'filters' => [
                'category' => $category,
                'type' => $type,
                'sort' => $sort,
            ],
            'categories' => $categories,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $user = Auth::user();
        
        return Inertia::render('user/posts/create', [
            'user' => $user,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = Auth::user();
        
        $validated = $request->validate([
            'title' => 'required|string|min:5|max:200',
            'content' => 'required|string|min:10|max:5000',
            'category' => 'nullable|string|max:50',
            'type' => 'required|in:text,image,video,link,poll,question',
            'allow_comments' => 'boolean',
            'allow_sharing' => 'boolean',
            'status' => 'in:draft,published',
        ]);
        
        try {
            $post = Post::create([
                'user_id' => $user->id,
                'title' => $validated['title'],
                'content' => $validated['content'],
                'category' => $validated['category'] ?? null,
                'type' => $validated['type'],
                'status' => $validated['status'] ?? 'published',
                'allow_comments' => $validated['allow_comments'] ?? true,
                'allow_sharing' => $validated['allow_sharing'] ?? true,
            ]);
            
            return redirect()->route('user.posts.show', $post->id)
                ->with('success', 'Your post has been created successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to create post. Please try again.'])->withInput();
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $user = Auth::user();
        
        $post = Post::with(['user:id,name', 'media', 'comments' => function($q) {
            $q->published()
              ->with(['user:id,name', 'replies' => function($reply) {
                  $reply->published()->with('user:id,name');
              }])
              ->whereNull('parent_id')
              ->orderBy('created_at', 'asc');
        }])
        ->published()
        ->findOrFail($id);
        
        // Increment views
        $post->incrementViews();
        
        // Format post data
        $postData = [
            'id' => $post->id,
            'title' => $post->title,
            'content' => $post->content,
            'category' => $post->category,
            'type' => $post->type,
            'status' => $post->status,
            'is_featured' => $post->is_featured,
            'allow_comments' => $post->allow_comments,
            'allow_sharing' => $post->allow_sharing,
            'views_count' => $post->views_count + 1, // Incremented
            'reactions_count' => $post->reactions_count,
            'comments_count' => $post->comments->count(),
            'created_at' => $post->created_at->diffForHumans(),
            'created_at_formatted' => $post->created_at->format('M d, Y'),
            'user' => [
                'id' => $post->user->id,
                'name' => $post->user->name,
            ],
            'is_owner' => $post->user_id === $user->id,
            'media' => $post->media->map(function ($media) {
                return [
                    'id' => $media->id,
                    'media_type' => $media->media_type,
                    'media_url' => $media->media_url,
                    'alt_text' => $media->alt_text,
                ];
            }),
            'comments' => $post->comments->map(function ($comment) use ($user) {
                return [
                    'id' => $comment->id,
                    'content' => $comment->content,
                    'reactions_count' => $comment->reactions_count,
                    'replies_count' => $comment->replies_count,
                    'created_at' => $comment->created_at->diffForHumans(),
                    'created_at_formatted' => $comment->created_at->format('M d, Y'),
                    'user' => [
                        'id' => $comment->user->id,
                        'name' => $comment->user->name,
                    ],
                    'is_owner' => $comment->user_id === $user->id,
                    'replies' => $comment->replies->map(function ($reply) use ($user) {
                        return [
                            'id' => $reply->id,
                            'content' => $reply->content,
                            'reactions_count' => $reply->reactions_count,
                            'created_at' => $reply->created_at->diffForHumans(),
                            'user' => [
                                'id' => $reply->user->id,
                                'name' => $reply->user->name,
                            ],
                            'is_owner' => $reply->user_id === $user->id,
                        ];
                    }),
                ];
            }),
        ];
        
        return Inertia::render('user/posts/show', [
            'user' => $user,
            'post' => $postData,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);
        
        // Check if user owns the post
        if ($post->user_id !== $user->id && $user->role !== 'admin') {
            return redirect()->route('user.posts.index')
                ->with('error', 'You can only edit your own posts.');
        }
        
        return Inertia::render('user/posts/edit', [
            'user' => $user,
            'post' => $post,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);
        
        // Check if user owns the post
        if ($post->user_id !== $user->id && $user->role !== 'admin') {
            return redirect()->route('user.posts.index')
                ->with('error', 'You can only update your own posts.');
        }
        
        $validated = $request->validate([
            'title' => 'required|string|min:5|max:200',
            'content' => 'required|string|min:10|max:5000',
            'category' => 'nullable|string|max:50',
            'type' => 'required|in:text,image,video,link,poll,question',
            'allow_comments' => 'boolean',
            'allow_sharing' => 'boolean',
            'status' => 'in:draft,published',
        ]);
        
        try {
            $post->update($validated);
            
            return redirect()->route('user.posts.show', $post->id)
                ->with('success', 'Your post has been updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to update post. Please try again.'])->withInput();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $user = Auth::user();
        $post = Post::findOrFail($id);
        
        // Check if user owns the post
        if ($post->user_id !== $user->id && $user->role !== 'admin') {
            return redirect()->route('user.posts.index')
                ->with('error', 'You can only delete your own posts.');
        }
        
        try {
            $post->delete();
            
            return redirect()->route('user.posts.index')
                ->with('success', 'Your post has been deleted successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to delete post. Please try again.']);
        }
    }

    /**
     * Store a comment on a post.
     */
    public function storeComment(Request $request, $postId)
    {
        $user = Auth::user();
        $post = Post::findOrFail($postId);
        
        // Check if comments are allowed
        if (!$post->allow_comments) {
            return back()->with('error', 'Comments are not allowed on this post.');
        }
        
        $validated = $request->validate([
            'content' => 'required|string|min:1|max:1000',
            'parent_id' => 'nullable|exists:post_comments,id',
        ]);
        
        try {
            $comment = PostComments::create([
                'post_id' => $post->id,
                'user_id' => $user->id,
                'content' => $validated['content'],
                'parent_id' => $validated['parent_id'] ?? null,
                'status' => 'published',
            ]);
            
            // Update parent comment replies count if it's a reply
            if ($comment->parent_id) {
                $parent = PostComments::find($comment->parent_id);
                if ($parent) {
                    $parent->updateRepliesCount();
                }
            }
            
            return back()->with('success', 'Your comment has been added successfully!');
        } catch (\Exception $e) {
            return back()->withErrors(['error' => 'Failed to add comment. Please try again.'])->withInput();
        }
    }
}

