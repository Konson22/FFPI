<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HealthService extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'slug',
        'type',
        'service_category',
        'description',
        'ownership',
        'phone',
        'email',
        'website',
        'address',
        'city',
        'state',
        'county',
        'payam',
        'boma',
        'country',
        'latitude',
        'longitude',
        'is_public',
        'is_active',
        'rating',
        'reviews_count',
        'hours',
        'services_offered',
        'is_open',
        'wait_time',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'is_public' => 'boolean',
        'is_active' => 'boolean',
        'is_open' => 'boolean',
        'rating' => 'decimal:1',
        'reviews_count' => 'integer',
        'services_offered' => 'array',
    ];

    /**
     * Scope a query to only include active services.
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope a query to only include public services.
     */
    public function scopePublic($query)
    {
        return $query->where('is_public', true);
    }

    /**
     * Scope a query to filter by service category.
     */
    public function scopeByCategory($query, $category)
    {
        if ($category === 'all') {
            return $query;
        }
        return $query->where('service_category', $category);
    }

    /**
     * Scope a query to search by location or name.
     */
    public function scopeSearch($query, $search)
    {
        if (!$search) {
            return $query;
        }
        
        return $query->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('address', 'like', "%{$search}%")
              ->orWhere('city', 'like', "%{$search}%")
              ->orWhere('state', 'like', "%{$search}%");
        });
    }
}

