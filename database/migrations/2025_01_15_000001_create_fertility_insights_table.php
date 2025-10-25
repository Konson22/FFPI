<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fertility_insights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('cycle_start_date');
            $table->date('fertile_window_start')->nullable();
            $table->date('fertile_window_end')->nullable();
            $table->date('ovulation_date')->nullable();
            $table->date('safe_days_start')->nullable();
            $table->date('safe_days_end')->nullable();
            $table->integer('cycle_length')->default(28);
            $table->integer('period_length')->default(5);
            $table->enum('prediction_status', ['predicted', 'confirmed'])->default('predicted');
            $table->boolean('notification_sent')->default(false);
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['user_id', 'cycle_start_date']);
            $table->index('prediction_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fertility_insights');
    }
};
