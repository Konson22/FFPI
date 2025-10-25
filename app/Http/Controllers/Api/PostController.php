<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Requests\Api\PostRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Post::with(['user', 'comments.user'])->get()->map(function($post){
            return [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'category' => $post->category,
                'content' => $post->content,
                'author' => $post->user->name,
                'comments' => $post->comments->map(function($comment){
                    return [
                        'id' => $comment->id,
                        'content' => $comment->content,
                        'reactions_count' => $comment->reactions_count,
                        'replies_count' => $comment->replies_count,
                        'commented_at' => $comment->created_at,
                    ];
                }),
                'comments_count' => $post->comments->count(),
                'allow_comments' => $post->allow_comments,
                'allow_sharing' => $post->allow_sharing,
                'views_count' => $post->views_count,
                'likes' => $post->reactions_count,
                'timestamp' => $post->created_at,
            ];
        });

        return response()->json($data, 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(PostRequest $request)
    {
        try {
            DB::beginTransaction();

            // Get the authenticated user
            $user = Auth::user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated.',
                    'data' => null
                ], 401);
            }

            // Prepare post data
            $postData = [
                'user_id' => $user->id,
                'title' => $request->title,
                'content' => $request->content,
                'category' => $request->category,
                'type' => $request->type ?? 'article',
                'status' => $request->status ?? 'published',
                'allow_comments' => $request->allow_comments ?? true,
                'allow_sharing' => $request->allow_sharing ?? true,
                'is_featured' => $request->is_featured ?? false,
                'views_count' => 0,
                'reactions_count' => 0,
            ];

            // Create the post
            $post = Post::create($postData);

            // Load relationships for response
            $post->load(['user', 'comments.user']);

            // Format the response data to match the index method format
            $formattedPost = [
                'id' => $post->id,
                'title' => $post->title,
                'content' => $post->content,
                'category' => $post->category,
                'author' => $post->user->name,
                'comments' => $post->comments->map(function($comment){
                    return [
                        'id' => $comment->id,
                        'content' => $comment->content,
                        'reactions_count' => $comment->reactions_count,
                        'replies_count' => $comment->replies_count,
                        'commented_at' => $comment->created_at,
                    ];
                }),
                'comments_count' => $post->comments->count(),
                'allow_comments' => $post->allow_comments,
                'allow_sharing' => $post->allow_sharing,
                'views_count' => $post->views_count,
                'likes' => $post->reactions_count,
                'timestamp' => $post->created_at,
            ];

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Post created successfully.',
                'data' => $formattedPost
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create post.',
                'error' => $e->getMessage(),
                'data' => null
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
