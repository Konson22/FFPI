<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'content',
        'key_points',
        'media_type',
        'media_url',
        'order',
        'is_active',
        'duration_minutes',
        'difficulty_level',
        'prerequisites',
        'learning_objectives',
        'assessment_questions',
        'completion_criteria',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'key_points' => 'array',
        'prerequisites' => 'array',
        'learning_objectives' => 'array',
        'assessment_questions' => 'array',
        'completion_criteria' => 'array',
        'is_active' => 'boolean',
        'duration_minutes' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Get the module that owns the lesson.
     */
    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }

    /**
     * Get the resources for the lesson.
     */
    public function resources(): HasMany
    {
        return $this->hasMany(Resource::class);
    }

    /**
     * Scope a query to only include active lessons.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to filter by module.
     */
    public function scopeByModule($query, $moduleId)
    {
        return $query->where('module_id', $moduleId);
    }

    /**
     * Scope a query to filter by difficulty level.
     */
    public function scopeByDifficulty($query, $level)
    {
        return $query->where('difficulty_level', $level);
    }

    /**
     * Scope a query to order lessons by order.
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('id');
    }

    /**
     * Get the lesson's key points as an array.
     */
    public function getKeyPointsArrayAttribute()
    {
        return is_string($this->key_points) ? json_decode($this->key_points, true) : $this->key_points;
    }

    /**
     * Get the lesson's learning objectives as an array.
     */
    public function getLearningObjectivesArrayAttribute()
    {
        return is_string($this->learning_objectives) ? json_decode($this->learning_objectives, true) : $this->learning_objectives;
    }

    /**
     * Get the lesson's assessment questions as an array.
     */
    public function getAssessmentQuestionsArrayAttribute()
    {
        return is_string($this->assessment_questions) ? json_decode($this->assessment_questions, true) : $this->assessment_questions;
    }

    /**
     * Get the lesson's completion criteria as an array.
     */
    public function getCompletionCriteriaArrayAttribute()
    {
        return is_string($this->completion_criteria) ? json_decode($this->completion_criteria, true) : $this->completion_criteria;
    }

    /**
     * Get the lesson's prerequisites as an array.
     */
    public function getPrerequisitesArrayAttribute()
    {
        return is_string($this->prerequisites) ? json_decode($this->prerequisites, true) : $this->prerequisites;
    }
}
