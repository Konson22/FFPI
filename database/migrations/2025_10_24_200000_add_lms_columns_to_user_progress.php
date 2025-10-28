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
        Schema::table('user_progress', function (Blueprint $table) {
            // Add timestamps if not exists
            if (!Schema::hasColumn('user_progress', 'created_at')) {
                $table->timestamps();
            }
            
            // Add LMS-specific columns
            if (!Schema::hasColumn('user_progress', 'completed')) {
                $table->boolean('completed')->default(false)->after('is_completed');
            }
            
            if (!Schema::hasColumn('user_progress', 'progress_percentage')) {
                $table->integer('progress_percentage')->default(0)->after('completed');
            }
            
            if (!Schema::hasColumn('user_progress', 'time_spent')) {
                $table->integer('time_spent')->nullable()->after('progress_percentage');
            }
            
            if (!Schema::hasColumn('user_progress', 'last_position')) {
                $table->integer('last_position')->nullable()->after('time_spent');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_progress', function (Blueprint $table) {
            $table->dropColumn(['completed', 'progress_percentage', 'time_spent', 'last_position']);
            if (Schema::hasColumn('user_progress', 'created_at')) {
                $table->dropTimestamps();
            }
        });
    }
};

