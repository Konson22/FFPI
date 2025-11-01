<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'google_id',
        'avatar',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

     // Relationship: An event belongs to an organizer (user)
     public function organizer()
     {
        return $this->belongsTo(Event::class, 'user_id');
     }
 
 
     // Relationship: An event can have many bookings
     public function bookings()
     {
        return $this->hasMany(Booking::class);
     }

     // Relationship: A user can have one doctor profile
     public function doctorProfile(): HasOne
     {
        return $this->hasOne(Doctor::class);
     }

     // Relationship: A user can have one profile
     public function profile(): HasOne
     {
        return $this->hasOne(Profile::class);
     }

     // Check if user is a doctor
     public function isDoctor(): bool
     {
        try {
            return $this->doctor !== null;
        } catch (\Exception $e) {
            return false;
        }
     }

    // Check if user is a verified doctor
    public function isVerifiedDoctor(): bool
    {
        try {
            return $this->doctor && $this->doctor->is_verified;
        } catch (\Exception $e) {
            return false;
        }
    }

    // Post relationships
    public function posts(): HasMany
    {
        return $this->hasMany(Post::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function reactions(): MorphMany
    {
        return $this->morphMany(Reaction::class, 'user');
    }

    // Topic moderation relationships
    public function approvedTopics(): HasMany
    {
        return $this->hasMany(Topic::class, 'approved_by');
    }

    public function moderatedComments(): HasMany
    {
        return $this->hasMany(Comment::class, 'moderated_by');
    }

    // User enrollments relationship (learning progress consolidated)
    public function moduleEnrollments(): HasMany
    {
        return $this->hasMany(ModuleEnrollment::class);
    }
}
