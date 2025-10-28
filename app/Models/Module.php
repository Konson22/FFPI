<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'module_code',
        'title',
        'description',
        'course_id',
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
     * Get the course that owns the module.
     */
    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    /**
     * Get the lessons for the module.
     */
    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    /**
     * Get the enrollments for this module (via user progress through lessons).
     * Note: We're using user_progress as a proxy for enrollments.
     */
    public function enrollments()
    {
        return $this->hasManyThrough(
            UserProgress::class,
            Lesson::class,
            'module_id', // Foreign key on lessons table
            'lesson_id', // Foreign key on user_progress table
            'id', // Local key on modules table
            'id'  // Local key on lessons table
        );
    }

    /**
     * Check if a user is enrolled in this module.
     */
    public function isEnrolledBy($userId): bool
    {
        return $this->hasManyThrough(
            UserProgress::class,
            Lesson::class,
            'module_id',
            'lesson_id',
            'id',
            'id'
        )->where('user_progress.user_id', $userId)->exists();
    }

    /**
     * Scope a query to only include active modules.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by difficulty level.
     */
    public function scopeByDifficulty($query, $level)
    {
        return $query->where('difficulty_level', $level);
    }

    /**
     * Scope a query to order modules by order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }

}
