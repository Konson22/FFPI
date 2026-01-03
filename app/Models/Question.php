<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Question extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'question',
        'category',
        'is_anonymous',
        'status',
        'views_count',
        'answers_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_anonymous' => 'boolean',
        'views_count' => 'integer',
        'answers_count' => 'integer',
    ];

    /**
     * Get the user that asked the question.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the answers for the question.
     */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    /**
     * Get the approved answers for the question.
     */
    public function approvedAnswers(): HasMany
    {
        return $this->hasMany(Answer::class)->where('is_approved', true);
    }

    /**
     * Get the accepted answer for the question.
     */
    public function acceptedAnswer()
    {
        return $this->hasOne(Answer::class)->where('is_accepted', true);
    }

    /**
     * Scope a query to only include pending questions.
     */
    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }

    /**
     * Scope a query to only include answered questions.
     */
    public function scopeAnswered($query)
    {
        return $query->where('status', 'answered');
    }

    /**
     * Scope a query to filter by category.
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('category', $category);
    }

    /**
     * Scope a query to order questions by views.
     */
    public function scopePopular($query)
    {
        return $query->orderBy('views_count', 'desc');
    }

    /**
     * Scope a query to order questions by answers count.
     */
    public function scopeMostAnswered($query)
    {
        return $query->orderBy('answers_count', 'desc');
    }

    /**
     * Increment the views count.
     */
    public function incrementViews()
    {
        $this->increment('views_count');
    }

    /**
     * Increment the answers count.
     */
    public function incrementAnswers()
    {
        $this->increment('answers_count');
        $this->updateStatus();
    }

    /**
     * Decrement the answers count.
     */
    public function decrementAnswers()
    {
        $this->decrement('answers_count');
        $this->updateStatus();
    }

    /**
     * Update question status based on answers.
     */
    protected function updateStatus()
    {
        if ($this->answers_count > 0 && $this->status === 'pending') {
            $this->update(['status' => 'answered']);
        } elseif ($this->answers_count === 0 && $this->status === 'answered') {
            $this->update(['status' => 'pending']);
        }
    }
}
