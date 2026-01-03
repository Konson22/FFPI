<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('support_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('category')->unique();
            $table->text('description')->nullable();
            $table->json('contacts');
            $table->timestamps();
        });

        DB::table('support_contacts')->insert([
            'category' => 'Police and Legal Aid Contacts',
            'description' => 'For legal and protective services in cases of sexual abuse, harassment, or violence.',
            'contacts' => json_encode([
                [
                    'name' => 'Police Gender Desk',
                    'phone' => '100',
                    'location' => 'All major police stations',
                    'services' => 'Reporting sexual assault, protection support',
                ],
                [
                    'name' => 'Legal Aid Clinic - South Sudan Law Society',
                    'phone' => '0912 789 456',
                    'location' => null,
                    'services' => 'Legal advice, survivor support, rights advocacy',
                ],
            ]),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('support_contacts');
    }
};

