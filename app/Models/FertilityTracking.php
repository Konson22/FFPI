<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class FertilityTracking extends Model
{
    use HasFactory;

    protected $table = 'fertility_tracking';

    protected $fillable = [
        'user_id',
        'period_start_date',
        'period_end_date',
        'cycle_length',
        'flow_intensity',
        'cycle_phase',
        'basal_body_temperature',
        'cervical_mucus',
        'cervical_position',
        'ovulation_test_result',
        'pregnancy_test_result',
        'mood',
        'energy_level',
        'sleep_quality',
        'stress_level',
        'exercise_frequency',
        'diet_notes',
        'medication_notes',
        'symptoms',
        'notes',
        'created_at',
        'updated_at',
    ];

    protected $casts = [
        'period_start_date' => 'date',
        'period_end_date' => 'date',
        'basal_body_temperature' => 'decimal:2',
        'symptoms' => 'array',
        'ovulation_test_result' => 'boolean',
        'pregnancy_test_result' => 'boolean',
    ];

    /**
     * Get the user that owns the fertility tracking record.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the symptoms for the fertility tracking record.
     */
    public function symptoms(): HasMany
    {
        return $this->hasMany(Symptom::class);
    }

    /**
     * Scope a query to only include records for a specific user.
     */
    public function scopeForUser($query, int $userId)
    {
        return $query->where('user_id', $userId);
    }

    /**
     * Scope a query to only include records by cycle phase.
     */
    public function scopeByPhase($query, string $phase)
    {
        return $query->where('cycle_phase', $phase);
    }

    /**
     * Scope a query to only include recent records.
     */
    public function scopeRecent($query, int $days = 30)
    {
        return $query->where('created_at', '>=', now()->subDays($days));
    }

    /**
     * Scope a query to only include records with positive ovulation test.
     */
    public function scopeWithPositiveOvulationTest($query)
    {
        return $query->where('ovulation_test_result', true);
    }

    /**
     * Scope a query to only include records with positive pregnancy test.
     */
    public function scopeWithPositivePregnancyTest($query)
    {
        return $query->where('pregnancy_test_result', true);
    }

    /**
     * Get the cycle length in days.
     */
    public function getCycleLengthInDaysAttribute(): ?int
    {
        if ($this->period_start_date && $this->period_end_date) {
            return $this->period_start_date->diffInDays($this->period_end_date) + 1;
        }
        return null;
    }

    /**
     * Check if the cycle is currently active.
     */
    public function isActiveCycle(): bool
    {
        return $this->period_start_date && 
               $this->period_start_date <= now() && 
               (!$this->period_end_date || $this->period_end_date >= now());
    }
}
