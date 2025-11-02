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
		if (Schema::hasTable('general_quiz_attempts')) {
			return;
		}
		
		Schema::create('general_quiz_attempts', function (Blueprint $table) {
			$table->id();
			$table->foreignId('user_id')->constrained()->cascadeOnDelete();
			$table->string('category')->nullable()->index();
			$table->json('answers');
			$table->unsignedInteger('total_points_awarded')->default(0);
			$table->unsignedInteger('max_points')->default(0);
			$table->unsignedTinyInteger('score_percent')->default(0);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('general_quiz_attempts');
	}
};


