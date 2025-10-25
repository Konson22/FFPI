<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Post;


class CommunityController extends Controller
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

        return Inertia::render('user/community/index', [
            'data' =>$data
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
