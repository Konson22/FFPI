<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // e.g., 'period', 'ovulation', 'contraceptive'
            $table->string('message');
            $table->dateTime('reminder_time');
            $table->boolean('is_sent')->default(false);
            $table->boolean('recurring')->default(false);
            $table->enum('priority', ['low', 'medium', 'high'])->default('medium');
            $table->json('recurring_pattern')->nullable(); // e.g., daily, weekly, monthly
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['reminder_time', 'is_sent']);
            $table->index(['user_id', 'type']);
            $table->index('priority');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};
