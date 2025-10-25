<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Lesson extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'module_id',
        'title',
        'content',
        'pdf_url',
        'video_url',
        'order',
        'is_active',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    /**
     * Get the module that owns the lesson.
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    /**
     * Get the resources for the lesson.
     */
    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

    /**
     * Get the quiz for this lesson.
     */
    public function quiz()
    {
        return $this->hasOne(\App\Models\Quiz::class, 'lesson_id');
    }

    /**
     * Scope a query to only include active lessons.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by module.
     */
    public function scopeByModule($query, $moduleId)
    {
        return $query->where('module_id', $moduleId);
    }

    /**
     * Scope a query to filter by difficulty level.
     */
    public function scopeByDifficulty($query, $level)
    {
        return $query->where('difficulty_level', $level);
    }

    /**
     * Scope a query to order lessons by order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }

    /**
     * Check if lesson has a PDF.
     */
    public function hasPdf(): bool
    {
        return !empty($this->pdf_url);
    }

    /**
     * Check if lesson has a video.
     */
    public function hasVideo(): bool
    {
        return !empty($this->video_url);
    }

    /**
     * Get the lesson's media type based on available content.
     */
    public function getMediaTypeAttribute(): string
    {
        if ($this->hasVideo()) return 'video';
        if ($this->hasPdf()) return 'pdf';
        if (!empty($this->content)) return 'article';
        return 'text';
    }
}
