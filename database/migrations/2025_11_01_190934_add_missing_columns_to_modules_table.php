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
            if (!Schema::hasColumn('modules', 'is_active')) {
                $table->boolean('is_active')->default(true)->after('published');
            }
            if (!Schema::hasColumn('modules', 'order')) {
                $table->integer('order')->default(0)->after('description');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            if (Schema::hasColumn('modules', 'is_active')) {
                $table->dropColumn('is_active');
            }
            if (Schema::hasColumn('modules', 'order')) {
                $table->dropColumn('order');
            }
        });
    }
};
