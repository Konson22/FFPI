<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'content',
        'slug',
        'excerpt',
        'status',
        'is_featured',
        'is_anonymous',
        'is_edited',
        'edited_at',
        'tags',
        'featured_image',
        'attachments',
        'mentions',
        'hashtags',
        'views_count',
        'comments_count',
        'reactions_count',
        'likes_count',
        'dislikes_count',
        'shares_count',
        'story_type',
        'mood',
        'is_approved',
        'approved_by',
        'approved_at',
        'moderation_notes',
        'is_flagged',
        'flag_count',
        'flag_reason',
        'is_expert_story',
        'expertise_level',
        'medical_disclaimer',
        'is_verified_medical_advice',
        'visibility',
        'allow_comments',
        'allow_reactions',
        'allow_sharing',
        'meta_description',
        'meta_keywords',
        'reading_time',
        'related_stories',
        'is_helpful',
        'helpful_count',
        'published_at',
        'last_activity_at'
    ];

    protected $casts = [
        'tags' => 'array',
        'attachments' => 'array',
        'mentions' => 'array',
        'hashtags' => 'array',
        'medical_disclaimer' => 'array',
        'meta_keywords' => 'array',
        'related_stories' => 'array',
        'is_featured' => 'boolean',
        'is_anonymous' => 'boolean',
        'is_edited' => 'boolean',
        'is_approved' => 'boolean',
        'is_flagged' => 'boolean',
        'is_expert_story' => 'boolean',
        'is_verified_medical_advice' => 'boolean',
        'allow_comments' => 'boolean',
        'allow_reactions' => 'boolean',
        'allow_sharing' => 'boolean',
        'is_helpful' => 'boolean',
        'edited_at' => 'datetime',
        'approved_at' => 'datetime',
        'published_at' => 'datetime',
        'last_activity_at' => 'datetime'
    ];

    // Relationship: Story belongs to a user
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Relationship: Story approved by a user (moderator)
    public function approver(): BelongsTo
    {
        return $this->belongsTo(User::class, 'approved_by');
    }

    // Relationship: Story has many comments (using existing comments table)
    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, 'topic_id')->where('parent_id', null);
    }

    // Relationship: Story has many reactions (using existing reactions table)
    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable');
    }

    // Relationship: Story has many likes (filtered reactions)
    public function likes(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable')->where('type', 'like');
    }

    // Relationship: Story has many dislikes (filtered reactions)
    public function dislikes(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'reactable')->where('type', 'dislike');
    }

    // Scope: Published stories
    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    // Scope: Featured stories
    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    // Scope: Public stories
    public function scopePublic($query)
    {
        return $query->where('visibility', 'public');
    }

    // Scope: Stories by type
    public function scopeByType($query, $type)
    {
        return $query->where('story_type', $type);
    }

    // Scope: Stories by mood
    public function scopeByMood($query, $mood)
    {
        return $query->where('mood', $mood);
    }

    // Scope: Helpful stories
    public function scopeHelpful($query)
    {
        return $query->where('is_helpful', true);
    }

    // Scope: Expert stories
    public function scopeExpert($query)
    {
        return $query->where('is_expert_story', true);
    }

    // Accessor: Get reading time in minutes
    public function getReadingTimeAttribute($value)
    {
        if ($value) {
            return $value;
        }
        
        // Calculate reading time based on content length (average 200 words per minute)
        $wordCount = str_word_count(strip_tags($this->content));
        return max(1, round($wordCount / 200));
    }

    // Accessor: Get excerpt or truncated content
    public function getExcerptAttribute($value)
    {
        if ($value) {
            return $value;
        }
        
        return \Str::limit(strip_tags($this->content), 200);
    }

    // Method: Increment view count
    public function incrementViews()
    {
        $this->increment('views_count');
        $this->update(['last_activity_at' => now()]);
    }

    // Method: Update engagement counts
    public function updateEngagementCounts()
    {
        $this->update([
            'comments_count' => $this->comments()->count(),
            'reactions_count' => $this->reactions()->count(),
            'likes_count' => $this->likes()->count(),
            'dislikes_count' => $this->dislikes()->count(),
            'last_activity_at' => now()
        ]);
    }

    // Method: Mark as helpful
    public function markAsHelpful()
    {
        $this->update([
            'is_helpful' => true,
            'helpful_count' => $this->helpful_count + 1
        ]);
    }

    // Method: Check if user can edit
    public function canEdit($userId)
    {
        return $this->user_id === $userId || auth()->user()->hasRole('admin');
    }

    // Method: Check if user can delete
    public function canDelete($userId)
    {
        return $this->user_id === $userId || auth()->user()->hasRole('admin');
    }
}