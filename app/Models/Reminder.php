<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Reminder extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'type',
        'message',
        'reminder_time',
        'is_sent',
        'recurring',
        'recurring_pattern',
        'priority',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'reminder_time' => 'datetime',
        'is_sent' => 'boolean',
        'recurring' => 'boolean',
        'recurring_pattern' => 'array',
    ];

    /**
     * Get the user that owns the reminder.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include active reminders.
     */
    public function scopeActive($query)
    {
        return $query->where('is_sent', false);
    }

    /**
     * Scope a query to only include sent reminders.
     */
    public function scopeSent($query)
    {
        return $query->where('is_sent', true);
    }

    /**
     * Scope a query to only include pending reminders.
     */
    public function scopePending($query)
    {
        return $query->where('is_sent', false)
                    ->where('reminder_time', '<=', now());
    }

    /**
     * Scope a query to only include reminders by type.
     */
    public function scopeByType($query, string $type)
    {
        return $query->where('type', $type);
    }

    /**
     * Scope a query to only include reminders by priority.
     */
    public function scopeByPriority($query, string $priority)
    {
        return $query->where('priority', $priority);
    }

    /**
     * Scope a query to only include recurring reminders.
     */
    public function scopeRecurring($query)
    {
        return $query->where('recurring', true);
    }

    /**
     * Scope a query to only include reminders for a specific user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Mark reminder as sent.
     */
    public function markAsSent(): void
    {
        $this->update(['is_sent' => true]);
    }
}
