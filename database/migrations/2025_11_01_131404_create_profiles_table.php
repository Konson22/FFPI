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
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('marital_status', ['single', 'married', 'divorced', 'widowed', 'in_a_relationship'])->nullable();
            $table->unsignedTinyInteger('cycle_length')->nullable()->comment('Menstrual cycle length in days (for females only)');
            $table->unsignedTinyInteger('period_length')->nullable()->comment('Period duration in days');
            $table->text('health_notes')->nullable()->comment('Additional health information');
            $table->json('preferences')->nullable()->comment('User preferences for notifications, reminders, etc.');
            $table->timestamps();
            
            $table->unique('user_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
