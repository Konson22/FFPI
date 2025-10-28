<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class StandaloneQuiz extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'difficulty',
        'time_limit',
        'points',
        'badge',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    /**
     * Get the questions for the quiz.
     */
    public function questions(): HasMany
    {
        return $this->hasMany(QuizQuestion::class, 'standalone_quiz_id')->orderBy('order');
    }
}
