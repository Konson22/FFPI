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
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('question_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->text('answer');
            $table->boolean('is_expert')->default(false);
            $table->boolean('is_approved')->default(true);
            $table->boolean('is_accepted')->default(false);
            $table->integer('reactions_count')->default(0);
            $table->timestamps();
            
            // Indexes for better performance
            $table->index(['question_id', 'is_approved']);
            $table->index(['user_id', 'is_expert']);
            $table->index('is_accepted');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('answers');
    }
};
