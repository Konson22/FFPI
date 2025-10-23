<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Module extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'module_code',
        'title',
        'description',
        'category',
        'category_id',
        'duration',
        'target_audience',
        'order',
        'is_active',
        'icon',
        'color',
        'duration_hours',
        'difficulty_level',
        'prerequisites',
        'learning_objectives',
        'completion_criteria',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'prerequisites' => 'array',
        'learning_objectives' => 'array',
        'completion_criteria' => 'array',
        'target_audience' => 'array',
        'is_active' => 'boolean',
        'duration_hours' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Get the lessons for the module.
     */
    public function lessons(): HasMany
    {
        return $this->hasMany(Lesson::class);
    }

    /**
     * Get the category that owns the module.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(ModuleCategory::class, 'category_id');
    }

    /**
     * Scope a query to only include active modules.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by difficulty level.
     */
    public function scopeByDifficulty($query, $level)
    {
        return $query->where('difficulty_level', $level);
    }

    /**
     * Scope a query to order modules by order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }

    /**
     * Get the module's learning objectives as an array.
     */
    public function getLearningObjectivesArrayAttribute()
    {
        return is_string($this->learning_objectives) ? json_decode($this->learning_objectives, true) : $this->learning_objectives;
    }

    /**
     * Get the module's completion criteria as an array.
     */
    public function getCompletionCriteriaArrayAttribute()
    {
        return is_string($this->completion_criteria) ? json_decode($this->completion_criteria, true) : $this->completion_criteria;
    }

    /**
     * Get the module's prerequisites as an array.
     */
    public function getPrerequisitesArrayAttribute()
    {
        return is_string($this->prerequisites) ? json_decode($this->prerequisites, true) : $this->prerequisites;
    }
}
