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
        Schema::table('lessons', function (Blueprint $table) {
            if (!Schema::hasColumn('lessons', 'published')) {
                $table->boolean('published')->default(true);
            }
            
            if (!Schema::hasColumn('lessons', 'slug')) {
                $table->string('slug')->nullable();
            }
            
            if (!Schema::hasColumn('lessons', 'is_preview')) {
                $table->boolean('is_preview')->default(false);
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropColumn(['published', 'slug', 'is_preview']);
        });
    }
};

