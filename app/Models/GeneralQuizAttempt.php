<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class GeneralQuizAttempt extends Model
{
    protected $table = 'general_quiz_attempts';

    protected $fillable = [
        'user_id',
        'category',
        'answers',
        'total_points_awarded',
        'max_points',
        'score_percent',
    ];

    protected $casts = [
        'answers' => 'array',
        'total_points_awarded' => 'integer',
        'max_points' => 'integer',
        'score_percent' => 'integer',
    ];
}


