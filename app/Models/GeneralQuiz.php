<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralQuiz extends Model
{
    protected $table = 'general_quizzes';

    protected $fillable = [
        'title',
        'category',
        'question',
        'type',
        'options',
        'correct_answers',
        'difficulty',
        'points',
        'time_limit_seconds',
        'shuffle_options',
        'display_order',
        'explanation',
        'metadata',
        'is_active',
    ];

    protected $casts = [
        'options' => 'array',
        'correct_answers' => 'array',
        'metadata' => 'array',
        'is_active' => 'boolean',
        'points' => 'integer',
        'difficulty' => 'integer',
        'time_limit_seconds' => 'integer',
        'display_order' => 'integer',
        'shuffle_options' => 'boolean',
    ];
}


