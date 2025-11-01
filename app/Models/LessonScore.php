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
        'quiz_score',
        'completed_at',
    ];

    protected $casts = [
        'completed_at' => 'datetime',
        'quiz_score' => 'integer',
    ];

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


