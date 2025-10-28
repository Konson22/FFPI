<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserProgress extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'user_progress';

    /**
     * Indicates if the model should be timestamped.
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'lesson_id',
        'is_completed',
        'completed',
        'quiz_score',
        'progress_percentage',
        'time_spent',
        'last_position',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'is_completed' => 'boolean',
        'completed' => 'boolean',
        'quiz_score' => 'integer',
        'progress_percentage' => 'integer',
        'time_spent' => 'integer',
        'last_position' => 'integer',
        'completed_at' => 'datetime',
    ];

    /**
     * Get the user that owns the progress.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the lesson that this progress belongs to.
     */
    public function lesson(): BelongsTo
    {
        return $this->belongsTo(Lesson::class);
    }

    /**
     * Get the module through the lesson.
     */
    public function module()
    {
        return $this->lesson->module();
    }
}

