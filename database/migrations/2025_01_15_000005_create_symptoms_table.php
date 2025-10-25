<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('symptoms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fertility_tracking_id')->constrained('fertility_tracking')->onDelete('cascade');
            $table->string('name'); // e.g., headache, cramps, fatigue
            $table->enum('severity', ['mild', 'moderate', 'severe'])->nullable();
            $table->string('note')->nullable();
            $table->timestamps();
            
            // Add indexes for better performance
            $table->index('fertility_tracking_id');
            $table->index('name');
            $table->index('severity');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('symptoms');
    }
};
