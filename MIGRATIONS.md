<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fertility_insights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('cycle_start_date');
            $table->date('fertile_window_start')->nullable();
            $table->date('fertile_window_end')->nullable();
            $table->date('ovulation_date')->nullable();
            $table->date('safe_days_start')->nullable();
            $table->date('safe_days_end')->nullable();
            $table->integer('cycle_length')->default(28);
            $table->integer('period_length')->default(5);
            $table->string('prediction_status')->default('predicted'); // predicted or confirmed
            $table->boolean('notification_sent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fertility_insights');
    }
};



<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('education_resources', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('category')->nullable(); // e.g., Fertility, Menstrual Health, Family Planning
            $table->string('image')->nullable();
            $table->string('video_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('education_resources');
    }
};


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('reminders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('type'); // e.g., 'period', 'ovulation', 'contraceptive'
            $table->string('message');
            $table->dateTime('reminder_time');
            $table->boolean('is_sent')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('reminders');
    }
};


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('symptoms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fertility_tracking_id')->constrained('fertility_tracking')->onDelete('cascade');
            $table->string('name'); // e.g., headache, cramps, fatigue
            $table->string('severity')->nullable(); // mild, moderate, severe
            $table->string('note')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('symptoms');
    }
};


<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fertility_tracking', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->date('period_start_date');
            $table->integer('cycle_length')->default(28);
            $table->integer('period_length')->default(5);
            $table->date('ovulation_date')->nullable();
            $table->date('next_period_date')->nullable();
            $table->json('symptoms')->nullable(); // e.g., mood swings, cramps, bloating
            $table->string('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fertility_tracking');
    }
};
