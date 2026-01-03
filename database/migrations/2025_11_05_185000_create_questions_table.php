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
        Schema::create('questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('question');
            $table->enum('category', [
                'general',
                'contraception',
                'relationships',
                'mental-health',
                'reproductive-health',
                'stis'
            ])->default('general');
            $table->boolean('is_anonymous')->default(false);
            $table->enum('status', ['pending', 'answered', 'closed'])->default('pending');
            $table->integer('views_count')->default(0);
            $table->integer('answers_count')->default(0);
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['user_id', 'status']);
            $table->index(['category', 'status']);
            $table->index('status');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};

