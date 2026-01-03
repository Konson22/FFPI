<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Answer extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'question_id',
        'user_id',
        'answer',
        'is_expert',
        'is_approved',
        'is_accepted',
        'reactions_count',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_expert' => 'boolean',
        'is_approved' => 'boolean',
        'is_accepted' => 'boolean',
        'reactions_count' => 'integer',
    ];

    /**
     * Get the question that owns the answer.
     */
    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }

    /**
     * Get the user that provided the answer.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include approved answers.
     */
    public function scopeApproved($query)
    {
        return $query->where('is_approved', true);
    }

    /**
     * Scope a query to only include expert answers.
     */
    public function scopeExpert($query)
    {
        return $query->where('is_expert', true);
    }

    /**
     * Scope a query to only include accepted answers.
     */
    public function scopeAccepted($query)
    {
        return $query->where('is_accepted', true);
    }

    /**
     * Scope a query to filter by question.
     */
    public function scopeByQuestion($query, $questionId)
    {
        return $query->where('question_id', $questionId);
    }

    /**
     * Increment reactions count.
     */
    public function incrementReactions()
    {
        $this->increment('reactions_count');
    }

    /**
     * Decrement reactions count.
     */
    public function decrementReactions()
    {
        $this->decrement('reactions_count');
    }

    /**
     * Accept this answer.
     */
    public function accept()
    {
        // Unaccept any other accepted answers for this question
        $this->question->answers()
            ->where('id', '!=', $this->id)
            ->where('is_accepted', true)
            ->update(['is_accepted' => false]);

        $this->update(['is_accepted' => true]);
    }

    /**
     * Unaccept this answer.
     */
    public function unaccept()
    {
        $this->update(['is_accepted' => false]);
    }
}
