<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Symptom extends Model
{
    use HasFactory;

    protected $fillable = [
        'fertility_tracking_id',
        'name',
        'description',
        'severity',
        'duration_hours',
        'notes',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'duration_hours' => 'integer',
    ];

    /**
     * Get the fertility tracking record that owns the symptom.
     */
    public function fertilityTracking(): BelongsTo
    {
        return $this->belongsTo(FertilityTracking::class);
    }

    /**
     * Scope a query to only include symptoms by severity.
     */
    public function scopeBySeverity($query, string $severity)
    {
        return $query->where('severity', $severity);
    }

    /**
     * Scope a query to only include symptoms by name.
     */
    public function scopeByName($query, string $name)
    {
        return $query->where('name', 'like', "%{$name}%");
    }

    /**
     * Scope a query to only include symptoms for a specific tracking record.
     */
    public function scopeForTracking($query, int $trackingId)
    {
        return $query->where('fertility_tracking_id', $trackingId);
    }

    /**
     * Scope a query to only include recent symptoms.
     */
    public function scopeRecent($query, int $days = 7)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Get the severity level as a numeric value.
     */
    public function getSeverityLevelAttribute(): int
    {
        return match($this->severity) {
            'mild' => 1,
            'moderate' => 2,
            'severe' => 3,
            default => 0,
        };
    }

    /**
     * Check if the symptom is severe.
     */
    public function isSevere(): bool
    {
        return $this->severity === 'severe';
    }

    /**
     * Check if the symptom is moderate.
     */
    public function isModerate(): bool
    {
        return $this->severity === 'moderate';
    }

    /**
     * Check if the symptom is mild.
     */
    public function isMild(): bool
    {
        return $this->severity === 'mild';
    }
}
