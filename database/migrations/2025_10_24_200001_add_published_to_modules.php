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
        Schema::table('modules', function (Blueprint $table) {
            if (!Schema::hasColumn('modules', 'published')) {
                $table->boolean('published')->default(true);
            }
            
            if (!Schema::hasColumn('modules', 'featured')) {
                $table->boolean('featured')->default(false);
            }
            
            if (!Schema::hasColumn('modules', 'slug')) {
                $table->string('slug')->nullable();
            }
            
            if (!Schema::hasColumn('modules', 'summary')) {
                $table->text('summary')->nullable();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropColumn(['published', 'featured', 'slug', 'summary']);
        });
    }
};

