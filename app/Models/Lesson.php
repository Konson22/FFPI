<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'content_markdown',
        'video_url',
        'pdf_url',
        'status',
    ];

    protected $appends = [
        'content_html',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }

    public function quizzes()
    {
        return $this->hasMany(LessonQuiz::class);
    }

    public function scores()
    {
        return $this->hasMany(LessonScore::class);
    }

    public function getContentHtmlAttribute(): ?string
    {
        return $this->content_markdown
            ? Str::markdown($this->content_markdown)
            : null;
    }
}
