<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FertilityInsight extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'cycle_start_date',
        'cycle_length',
        'ovulation_date',
        'next_period_date',
        'fertile_window_start',
        'fertile_window_end',
        'prediction_accuracy',
        'prediction_status',
        'insights_data',
        'recommendations',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'cycle_start_date' => 'date',
        'ovulation_date' => 'date',
        'next_period_date' => 'date',
        'fertile_window_start' => 'date',
        'fertile_window_end' => 'date',
        'prediction_accuracy' => 'decimal:2',
        'insights_data' => 'array',
        'recommendations' => 'array',
    ];

    /**
     * Get the user that owns the fertility insight.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Scope a query to only include insights with specific status.
     */
    public function scopeWithStatus($query, string $status)
    {
        return $query->where('prediction_status', $status);
    }

    /**
     * Scope a query to only include insights for a specific user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include recent insights.
     */
    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }
}
