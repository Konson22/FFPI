<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HealthService extends Model
{
    protected $fillable = [
        'name',
        'type',
        'address',
        'distance',
        'rating',
        'reviews',
        'phone',
        'hours',
        'services_offered',
        'is_open',
        'wait_time',
        'latitude',
        'longitude',
        'is_active'
    ];

    protected $casts = [
        'rating' => 'decimal:2',
        'services_offered' => 'array',
        'is_open' => 'boolean',
        'is_active' => 'boolean',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];
}
