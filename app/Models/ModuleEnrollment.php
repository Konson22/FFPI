<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ModuleEnrollment extends Model
{
    /**
     * The table associated with the model.
     */
    protected $table = 'module_enrollments';

    /**
     * The attributes that are mass assignable.
     */
    protected $fillable = [
        'user_id',
        'module_id',
        'status',
        'started_at',
        'completed_at',
        'progress_percentage',
        'quiz_score',
    ];

    /**
     * The attributes that should be cast.
     */
    protected $casts = [
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
        'progress_percentage' => 'integer',
        'quiz_score' => 'integer',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class);
    }
}
