<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clinics', function (Blueprint $table) {
            $table->id();
            
            // Clinic basic information
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            
            // Contact information
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();
            
            // Location information
            $table->string('address');
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            
            // Operating hours (stored as JSON)
            $table->json('working_hours')->nullable();
            
            // Clinic details
            $table->string('facility_type')->nullable(); // e.g., hospital, clinic, private practice
            $table->json('specializations')->nullable(); // Array of specializations offered
            $table->json('amenities')->nullable(); // Array of available amenities
            $table->json('insurance_accepted')->nullable(); // Array of accepted insurance providers
            
            // Media
            $table->string('logo')->nullable();
            $table->json('images')->nullable(); // Array of clinic images
            
            // Status and verification
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_active')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            
            // Ratings and reviews
            $table->decimal('average_rating', 3, 2)->default(0.00);
            $table->integer('total_reviews')->default(0);
            
            // Timestamps
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['status', 'is_verified']);
            $table->index(['city', 'state']);
            $table->index('average_rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clinics');
    }
};

