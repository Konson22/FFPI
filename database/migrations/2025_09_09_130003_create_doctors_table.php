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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            
            // Foreign key relationship with users table
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            
            // Basic doctor information
            $table->string('doctor_name');
            $table->string('phone', 20)->nullable();
            $table->string('email')->unique();
            
            // Professional information
            $table->string('specialization');
            $table->text('bio')->nullable();
            $table->string('license_number')->unique();
            $table->integer('years_of_experience')->default(0);
            
            // Working hours (stored as JSON for flexibility)
            $table->json('working_hours')->nullable();
            
            // Availability and status
            $table->boolean('is_available')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            
            // Location information
            $table->string('clinic_name')->nullable();
            $table->string('clinic_address')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            
            // Additional professional details
            $table->json('certifications')->nullable();
            $table->json('awards')->nullable();
            
            // Profile and media
            $table->string('profile_picture')->nullable();
            
            // Verification and approval
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            
            // Rating and reviews
            $table->decimal('average_rating', 3, 2)->default(0.00);
            $table->integer('total_reviews')->default(0);
            
            // Timestamps
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['specialization', 'is_available']);
            $table->index(['status', 'is_verified']);
            $table->index('average_rating');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('doctors');
    }
};
