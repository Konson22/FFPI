<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = [
            [
                'title' => 'SRHR',
                'description' => 'Comprehensive Sexual and Reproductive Health and Rights (SRHR) education covering fundamental concepts, reproductive health services, family planning, healthy relationships, and rights-based approaches to sexual and reproductive health.',
                'order' => 1,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('modules')->insert($modules);
    }
}

