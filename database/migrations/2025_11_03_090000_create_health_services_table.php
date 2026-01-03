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
        Schema::create('health_services', function (Blueprint $table) {
            $table->id();

            // Basic info
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('type', ['hospital', 'clinic']);
            $table->text('description')->nullable();
            $table->enum('ownership', ['ngo', 'government', 'private'])->default('government');

            // Contact
            $table->string('phone', 20)->nullable();
            $table->string('email')->nullable();
            $table->string('website')->nullable();

            // Location (South Sudan scope)
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable(); // e.g., Central Equatoria, Jonglei, etc.
            $table->string('county')->nullable();
            $table->string('payam')->nullable();
            $table->string('boma')->nullable();
            $table->string('country')->default('South Sudan');
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();

            // Flags
            $table->boolean('is_public')->default(true);
            $table->boolean('is_active')->default(true);

            $table->timestamps();

            // Indexes
            $table->index(['type', 'state']);
            $table->index(['state', 'county']);
            $table->index('is_active');
            $table->index(['ownership']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_services');
    }
};


