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
        Schema::table('health_services', function (Blueprint $table) {
            $table->string('service_category')->nullable()->after('type')->comment('family-planning, sti-testing, counseling, emergency, vaccination, mental-health');
            $table->decimal('rating', 3, 1)->default(0.0)->after('description');
            $table->integer('reviews_count')->default(0)->after('rating');
            $table->text('hours')->nullable()->after('phone')->comment('Operating hours');
            $table->json('services_offered')->nullable()->after('hours')->comment('Array of services offered');
            $table->boolean('is_open')->default(true)->after('is_active')->comment('Current open/closed status');
            $table->string('wait_time')->nullable()->after('is_open')->comment('Estimated wait time');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('health_services', function (Blueprint $table) {
            $table->dropColumn([
                'service_category',
                'rating',
                'reviews_count',
                'hours',
                'services_offered',
                'is_open',
                'wait_time',
            ]);
        });
    }
};
