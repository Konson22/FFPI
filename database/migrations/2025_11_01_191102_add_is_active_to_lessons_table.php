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
            if (!Schema::hasColumn('lessons', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('published');
            }
            if (!Schema::hasColumn('lessons', 'objective')) {
                $table->text('objective')->nullable()->after('title');
            }
            if (!Schema::hasColumn('lessons', 'order')) {
                $table->integer('order')->default(0)->after('is_active');
            }
            if (!Schema::hasColumn('lessons', 'pdf_url')) {
                $table->text('pdf_url')->nullable()->after('content');
            }
            if (!Schema::hasColumn('lessons', 'video_url')) {
                $table->text('video_url')->nullable()->after('pdf_url');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            if (Schema::hasColumn('lessons', 'is_active')) {
                $table->dropColumn('is_active');
            }
            if (Schema::hasColumn('lessons', 'objective')) {
                $table->dropColumn('objective');
            }
            if (Schema::hasColumn('lessons', 'order')) {
                $table->dropColumn('order');
            }
            if (Schema::hasColumn('lessons', 'pdf_url')) {
                $table->dropColumn('pdf_url');
            }
            if (Schema::hasColumn('lessons', 'video_url')) {
                $table->dropColumn('video_url');
            }
        });
    }
};
