<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Symptom extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'date',
        'mood',
        'pain_level',
        'discharge',
        'temperature',
    ];

    protected $casts = [
        'date' => 'date',
        'pain_level' => 'integer',
        'temperature' => 'decimal:2',
    ];

    /**
     * Get the user that owns the symptom entry.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
