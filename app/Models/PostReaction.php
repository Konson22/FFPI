<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PostReaction extends Model
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
        'reaction_type',
    ];

    /**
     * Get the post that was reacted to.
     */
    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }

    /**
     * Get the user who reacted.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to filter by reaction type.
     */
    public function scopeByType($query, $type)
    {
        return $query->where('reaction_type', $type);
    }

    /**
     * Scope a query to filter by user.
     */
    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Get the reaction emoji.
     */
    public function getEmojiAttribute(): string
    {
        $emojis = [
            'like' => '👍',
            'love' => '❤️',
            'support' => '🤝',
            'informative' => '💡',
            'disagree' => '👎',
            'concerned' => '😟',
        ];

        return $emojis[$this->reaction_type] ?? '👍';
    }

    /**
     * Check if reaction is positive.
     */
    public function getIsPositiveAttribute(): bool
    {
        return in_array($this->reaction_type, ['like', 'love', 'support', 'informative']);
    }

    /**
     * Check if reaction is negative.
     */
    public function getIsNegativeAttribute(): bool
    {
        return in_array($this->reaction_type, ['disagree', 'concerned']);
    }
}
