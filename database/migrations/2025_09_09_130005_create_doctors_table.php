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
        if (Schema::hasTable('doctors')) {
            return;
        }
        
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('clinic_id')->nullable()->constrained()->onDelete('set null');
            $table->string('doctor_name');
            $table->string('phone', 20)->nullable();
            $table->string('specialization');
            $table->text('bio')->nullable();
            $table->string('license_number')->unique();
            $table->integer('years_of_experience')->default(0);
            $table->boolean('is_available')->default(true);
            $table->enum('status', ['active', 'inactive', 'suspended'])->default('active');
            $table->string('profile_picture')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->timestamp('verified_at')->nullable();
            $table->decimal('average_rating', 3, 2)->default(0.00);
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['specialization', 'is_available', 'clinic_id']);
            $table->index(['status', 'is_verified']);
            $table->index('average_rating');
            $table->index('clinic_id');
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
