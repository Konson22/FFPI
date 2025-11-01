<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FertilityTracking extends Model
{
    use HasFactory;

    protected $table = 'fertility_tracking';

    protected $fillable = [
        'user_id',
        'period_start',
        'period_end',
        'ovulation_date',
        'next_period',
        'fertile_window_start',
        'fertile_window_end',
        'notes',
    ];

    protected $casts = [
        'period_start' => 'date',
        'period_end' => 'date',
        'ovulation_date' => 'date',
        'next_period' => 'date',
        'fertile_window_start' => 'date',
        'fertile_window_end' => 'date',
    ];

    /**
     * Get the user that owns the fertility tracking record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


    /**
     * Scope a query to only include records for a specific user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }


    /**
     * Scope a query to only include recent records.
     */
    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get the period length in days.
     */
    public function getPeriodLengthInDaysAttribute(): ?int
    {
        if ($this->period_start && $this->period_end) {
            return $this->period_start->diffInDays($this->period_end) + 1;
        }
        return null;
    }

    /**
     * Check if the cycle is currently active.
     */
    public function isActiveCycle(): bool
    {
        return $this->period_start && 
               $this->period_start <= now() && 
               (!$this->period_end || $this->period_end >= now());
    }
}
