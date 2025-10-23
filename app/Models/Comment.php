<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Comment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'post_id',
        'user_id',
        'parent_id',
        'content',
        'status',
        'reactions_count',
        'replies_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'reactions_count' => 'integer',
        'replies_count' => 'integer',
    ];

    /**
     * Get the post that owns the comment.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Get the user that owns the comment.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the parent comment.
     */
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_id');
    }

    /**
     * Get the replies for the comment.
     */
    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_id');
    }

    /**
     * Scope a query to only include published comments.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    /**
     * Scope a query to only include root comments.
     */
    public function scopeRoot($query)
    {
        return $query->whereNull('parent_id');
    }

    /**
     * Scope a query to filter by post.
     */
    public function scopeByPost($query, $postId)
    {
        return $query->where('post_id', $postId);
    }

    /**
     * Scope a query to filter by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Check if comment is a root comment.
     */
    public function getIsRootAttribute(): bool
    {
        return is_null($this->parent_id);
    }

    /**
     * Check if comment has replies.
     */
    public function getHasRepliesAttribute(): bool
    {
        return $this->replies_count > 0;
    }

    /**
     * Increment reactions count.
     */
    public function incrementReactions()
    {
        $this->increment('reactions_count');
    }

    /**
     * Decrement reactions count.
     */
    public function decrementReactions()
    {
        $this->decrement('reactions_count');
    }

    /**
     * Update replies count.
     */
    public function updateRepliesCount()
    {
        $this->update(['replies_count' => $this->replies()->count()]);
    }

    /**
     * Check if user can edit this comment.
     */
    public function canUserEdit($user): bool
    {
        return $this->user_id === $user->id || $user->role === 'admin';
    }

    /**
     * Check if user can delete this comment.
     */
    public function canUserDelete($user): bool
    {
        return $this->user_id === $user->id || $user->role === 'admin';
    }
}