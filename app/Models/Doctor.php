<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Doctor extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'clinic_id',
        'doctor_name',
        'phone',
        'email',
        'specialization',
        'bio',
        'license_number',
        'years_of_experience',
        'working_hours',
        'is_available',
        'status',
        'clinic_name',
        'clinic_address',
        'latitude',
        'longitude',
        'certifications',
        'awards',
        'profile_picture',
        'is_verified',
        'verified_at',
        'average_rating',
        'total_reviews',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'working_hours' => 'array',
        'certifications' => 'array',
        'awards' => 'array',
        'is_available' => 'boolean',
        'is_verified' => 'boolean',
        'verified_at' => 'datetime',
        'average_rating' => 'decimal:2',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    /**
     * Get the user that owns the doctor profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the clinic that the doctor belongs to.
     */
    public function clinic(): BelongsTo
    {
        return $this->belongsTo(Clinic::class);
    }

    /**
     * Scope a query to only include available doctors.
     */
    public function scopeAvailable($query)
    {
        return $query->where('is_available', true)
                    ->where('status', 'active');
    }

    /**
     * Scope a query to only include verified doctors.
     */
    public function scopeVerified($query)
    {
        return $query->where('is_verified', true);
    }

    /**
     * Scope a query to filter by specialization.
     */
    public function scopeBySpecialization($query, $specialization)
    {
        return $query->where('specialization', $specialization);
    }

    /**
     * Scope a query to filter by location (within radius).
     */
    public function scopeNearby($query, $latitude, $longitude, $radiusKm = 10)
    {
        return $query->selectRaw("*, 
            (6371 * acos(cos(radians(?)) 
            * cos(radians(latitude)) 
            * cos(radians(longitude) - radians(?)) 
            + sin(radians(?)) 
            * sin(radians(latitude)))) AS distance", 
            [$latitude, $longitude, $latitude])
            ->having('distance', '<', $radiusKm)
            ->orderBy('distance');
    }

    /**
     * Get the doctor's full profile with user information.
     */
    public function getFullProfileAttribute()
    {
        return [
            'id' => $this->id,
            'doctor_name' => $this->doctor_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'specialization' => $this->specialization,
            'bio' => $this->bio,
            'profile_picture' => $this->profile_picture,
            'average_rating' => $this->average_rating,
            'total_reviews' => $this->total_reviews,
            'is_verified' => $this->is_verified,
            'user' => $this->user,
        ];
    }
}
