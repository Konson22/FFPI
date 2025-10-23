<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Comment;

class ContentController extends Controller
{
    public function comments()
    {
        $comments = Comment::with(['user'])
            ->latest()
            ->paginate(15);

        return Inertia::render('admin/content/comments', [
            'comments' => $comments
        ]);
    }

    public function approveComment(Comment $comment)
    {
        $comment->update([
            'is_approved' => true,
            'moderated_by' => auth()->id(),
        ]);

        return redirect()->back()->with('success', 'Comment approved successfully.');
    }

    public function rejectComment(Comment $comment)
    {
        $comment->update([
            'is_approved' => false,
            'moderated_by' => auth()->id(),
            'rejection_reason' => request('reason', 'Content does not meet community guidelines'),
        ]);

        return redirect()->back()->with('success', 'Comment rejected successfully.');
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        return redirect()->back()->with('success', 'Comment deleted successfully.');
    }
}