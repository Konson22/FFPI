<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class LessonScore extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'module_id',
        'lesson_id',
        'total_points',
        'percentage',
    ];

    protected $casts = [
        'total_points' => 'integer',
        'percentage' => 'decimal:2',
    ];

    /**
     * Check if lesson is completed (score >= 75%)
     */
    public function getIsCompletedAttribute()
    {
        return $this->percentage >= 75;
    }

    /**
     * Get the completion date (updated_at when percentage >= 75)
     */
    public function getCompletedAtAttribute()
    {
        return $this->is_completed ? $this->updated_at : null;
    }

    /**
     * Get quiz score as integer (percentage rounded)
     */
    public function getQuizScoreAttribute()
    {
        return (int) round($this->percentage);
    }

    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}


