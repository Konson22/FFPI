<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Fix the id column to ensure it's AUTO_INCREMENT
        // This handles cases where the table was created without AUTO_INCREMENT
        if (Schema::hasTable('profiles')) {
            DB::statement('ALTER TABLE `profiles` MODIFY COLUMN `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT');
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Note: We can't really "undo" AUTO_INCREMENT without potentially breaking things
        // This migration is meant to fix a structural issue, so down() is a no-op
    }
};
