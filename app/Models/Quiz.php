<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'lesson_id',
        'question',
        'correct_answer',
    ];

    /**
     * Relationships
     */
    public function lesson()
    {
        return $this->belongsTo(Lesson::class);
    }
}


