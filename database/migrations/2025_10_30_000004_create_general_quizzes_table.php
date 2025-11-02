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
		if (Schema::hasTable('general_quizzes')) {
			return;
		}
		
		Schema::create('general_quizzes', function (Blueprint $table) {
			$table->id();
			$table->string('title')->nullable();
			$table->string('category')->nullable()->index();
			$table->text('question');
			$table->string('type', 32)->default('single_choice');
			$table->json('options')->nullable();
			$table->json('correct_answers')->nullable();
			$table->unsignedTinyInteger('difficulty')->default(1);
			$table->unsignedSmallInteger('points')->default(1);
			$table->unsignedInteger('time_limit_seconds')->nullable();
			$table->boolean('shuffle_options')->default(false);
			$table->unsignedInteger('display_order')->nullable()->index();
			$table->text('explanation')->nullable();
			$table->json('metadata')->nullable();
			$table->boolean('is_active')->default(true);
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('general_quizzes');
	}
};


