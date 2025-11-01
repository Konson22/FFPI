<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fertility_tracking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('period_start');
            $table->date('period_end')->nullable();
            $table->date('ovulation_date')->nullable();
            $table->date('next_period')->nullable();
            $table->date('fertile_window_start')->nullable();
            $table->date('fertile_window_end')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['user_id', 'period_start']);
            $table->index('ovulation_date');
        });

        // Ensure the id column is explicitly set to AUTO_INCREMENT
        // This fixes the error: "Field 'id' doesn't have a default value"
        DB::statement('ALTER TABLE `fertility_tracking` MODIFY COLUMN `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
    }

    public function down(): void
    {
        Schema::dropIfExists('fertility_tracking');
    }
};
