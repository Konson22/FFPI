<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fertility_tracking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('period_start_date');
            $table->integer('cycle_length')->default(28);
            $table->integer('period_length')->default(5);
            $table->date('ovulation_date')->nullable();
            $table->date('next_period_date')->nullable();
            $table->enum('cycle_phase', ['menstrual', 'follicular', 'ovulatory', 'luteal'])->nullable();
            $table->json('symptoms')->nullable(); // e.g., mood swings, cramps, bloating
            $table->string('notes')->nullable();
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['user_id', 'period_start_date']);
            $table->index('cycle_phase');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fertility_tracking');
    }
};
