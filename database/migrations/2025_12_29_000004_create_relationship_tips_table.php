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
        Schema::create('relationship_tips', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->text('full_description');
            $table->string('category'); // communication, consent, conflict, tips
            $table->string('difficulty'); // Beginner, Intermediate, Advanced
            $table->json('key_points'); // Array of key points
            $table->json('tips'); // Array of practical tips
            $table->text('example')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('relationship_tips');
    }
};
