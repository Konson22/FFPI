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
        if (Schema::hasTable('quizzes')) {
            return;
        }
        
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lesson_id')->constrained()->onDelete('cascade');
            $table->text('question');
            $table->string('type', 32)->default('single_choice'); // single_choice, multiple_choice
            $table->json('options')->nullable(); // Array of answer choices
            $table->json('correct_answers')->nullable(); // Array of correct answer(s)
            $table->string('correct_answer')->nullable(); // Keep for backward compatibility
            $table->text('explanation')->nullable(); // Explanation for the correct answer
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quizzes');
    }
};
