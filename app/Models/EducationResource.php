<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class EducationResource extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'content',
        'excerpt',
        'category',
        'tags',
        'author_id',
        'featured_image',
        'video_url',
        'audio_url',
        'document_url',
        'status',
        'published_at',
        'meta_title',
        'meta_description',
        'view_count',
        'like_count',
        'share_count',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'published_at' => 'datetime',
        'view_count' => 'integer',
        'like_count' => 'integer',
        'share_count' => 'integer',
    ];

    /**
     * Get the author that owns the education resource.
     */
    public function author(): BelongsTo
    {
        return $this->belongsTo(User::class, 'author_id');
    }

    /**
     * Scope a query to only include published resources.
     */
    public function scopePublished($query)
    {
        return $query->where('status', 'published')
                    ->whereNotNull('published_at')
                    ->where('published_at', '<=', now());
    }

    /**
     * Scope a query to only include resources by category.
     */
    public function scopeByCategory($query, string $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to only include resources by status.
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('status', $status);
    }

    /**
     * Scope a query to search resources by title or content.
     */
    public function scopeSearch($query, string $search)
    {
        return $query->where(function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%")
              ->orWhere('content', 'like', "%{$search}%")
              ->orWhere('excerpt', 'like', "%{$search}%");
        });
    }

    /**
     * Scope a query to order by popularity.
     */
    public function scopePopular($query)
    {
        return $query->orderByDesc('view_count')
                    ->orderByDesc('like_count')
                    ->orderByDesc('share_count');
    }
}
