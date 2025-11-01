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
        Schema::create('symptoms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('date');
            $table->string('mood', 100)->nullable();
            $table->unsignedTinyInteger('pain_level')->nullable()->comment('Scale 1-10');
            $table->string('discharge', 100)->nullable();
            $table->decimal('temperature', 5, 2)->nullable()->comment('Basal body temperature');
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index(['user_id', 'date']);
            $table->index('date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('symptoms');
    }
};
