<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Reaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'reactable_type',
        'reactable_id',
        'type',
        'note',
        'is_anonymous',
        'ip_address',
        'user_agent',
        'is_expert_reaction',
        'expertise_level',
    ];

    protected $casts = [
        'is_anonymous' => 'boolean',
        'is_expert_reaction' => 'boolean',
    ];

    // Relationships
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function reactable(): MorphTo
    {
        return $this->morphTo();
    }

    // Scopes
    public function scopeByType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeExpertReactions($query)
    {
        return $query->where('is_expert_reaction', true);
    }

    public function scopeByUser($query, $userId)
    {
        return $query->where('user_id', $userId);
    }

    public function scopeByReactable($query, $reactableType, $reactableId)
    {
        return $query->where('reactable_type', $reactableType)
                    ->where('reactable_id', $reactableId);
    }

    // Accessors & Mutators
    public function getReactionEmojiAttribute()
    {
        $emojis = [
            'like' => '👍',
            'dislike' => '👎',
            'love' => '❤️',
            'laugh' => '😂',
            'wow' => '😮',
            'sad' => '😢',
            'angry' => '😠',
            'helpful' => '✅',
            'not_helpful' => '❌',
            'agree' => '👍',
            'disagree' => '👎',
            'support' => '🤝',
            'celebrate' => '🎉',
            'insightful' => '💡',
            'confused' => '😕',
            'expert_verified' => '✅',
        ];

        return $emojis[$this->type] ?? '👍';
    }

    public function getIsPositiveAttribute()
    {
        $positiveTypes = [
            'like', 'love', 'helpful', 'agree', 'support', 
            'celebrate', 'insightful', 'expert_verified'
        ];

        return in_array($this->type, $positiveTypes);
    }

    public function getIsNegativeAttribute()
    {
        $negativeTypes = [
            'dislike', 'not_helpful', 'disagree', 'angry', 'confused'
        ];

        return in_array($this->type, $negativeTypes);
    }

    // Methods
    public function isFromExpert()
    {
        return $this->is_expert_reaction || $this->user->role === 'expert';
    }

    public function canUserModify($user)
    {
        return $this->user_id === $user->id || $user->role === 'admin';
    }

    public function getReactionDescription()
    {
        $descriptions = [
            'like' => 'liked',
            'dislike' => 'disliked',
            'love' => 'loved',
            'laugh' => 'laughed at',
            'wow' => 'was amazed by',
            'sad' => 'was saddened by',
            'angry' => 'was angered by',
            'helpful' => 'found helpful',
            'not_helpful' => 'found not helpful',
            'agree' => 'agreed with',
            'disagree' => 'disagreed with',
            'support' => 'supported',
            'celebrate' => 'celebrated',
            'insightful' => 'found insightful',
            'confused' => 'was confused by',
            'expert_verified' => 'verified as expert advice',
        ];

        return $descriptions[$this->type] ?? 'reacted to';
    }
}
