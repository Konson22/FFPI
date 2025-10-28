<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RelationshipTip extends Model
{
    protected $fillable = [
        'title',
        'description',
        'full_description',
        'category',
        'difficulty',
        'key_points',
        'tips',
        'example',
        'is_active'
    ];

    protected $casts = [
        'key_points' => 'array',
        'tips' => 'array',
        'is_active' => 'boolean',
    ];
}
