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
        Schema::create('health_services', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('type'); // family-planning, sti-testing, counseling, emergency, etc.
            $table->text('address');
            $table->string('distance')->nullable();
            $table->decimal('rating', 3, 2)->default(0);
            $table->integer('reviews')->default(0);
            $table->string('phone')->nullable();
            $table->text('hours')->nullable();
            $table->json('services_offered'); // Array of services
            $table->boolean('is_open')->default(true);
            $table->string('wait_time')->nullable();
            $table->decimal('latitude', 10, 8)->nullable();
            $table->decimal('longitude', 11, 8)->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('health_services');
    }
};
