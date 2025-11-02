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
        // Skip if modules already exist
        if (DB::table('modules')->count() > 0) {
            $this->command->info('Modules already exist. Skipping ModulesSeeder.');
            return;
        }
        
        $modules = [
            [
                'module_code' => 'MOD-001',
                'title' => 'Introduction to Family Planning',
                'description' => 'A comprehensive introduction to family planning concepts, benefits, and the importance of reproductive health. This module covers the fundamentals of making informed decisions about family planning methods.',
                'order' => 1,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-002',
                'title' => 'Contraceptive Methods Overview',
                'description' => 'Explore various contraceptive methods including hormonal, barrier, intrauterine devices (IUDs), implants, and natural methods. Learn about effectiveness rates, side effects, and how to choose the right method for you.',
                'order' => 2,
                'is_active' => true,
                'published' => true,
                'featured' => true,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-003',
                'title' => 'Fertility Awareness and Natural Methods',
                'description' => 'Understand fertility awareness methods (FAM) including tracking basal body temperature, cervical mucus, and calendar methods. Learn how natural family planning can be used for both preventing and achieving pregnancy.',
                'order' => 3,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-004',
                'title' => 'Hormonal Contraceptives',
                'description' => 'Detailed information about hormonal contraceptive methods including birth control pills, patches, rings, injections, and implants. Learn how they work, their benefits, potential side effects, and how to use them correctly.',
                'order' => 4,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-005',
                'title' => 'Barrier Methods and STI Prevention',
                'description' => 'Learn about barrier methods like condoms, diaphragms, and cervical caps. Understand their dual role in preventing pregnancy and protecting against sexually transmitted infections (STIs).',
                'order' => 5,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-006',
                'title' => 'Long-Acting Reversible Contraceptives (LARC)',
                'description' => 'Explore long-acting reversible contraceptives including IUDs (copper and hormonal) and contraceptive implants. Learn about insertion procedures, effectiveness, duration, and when to consider these options.',
                'order' => 6,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-007',
                'title' => 'Emergency Contraception',
                'description' => 'Learn about emergency contraception options, when to use them, how they work, and their effectiveness. Understand the importance of timely access and how to obtain emergency contraception.',
                'order' => 7,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'module_code' => 'MOD-008',
                'title' => 'Menstrual Health and Cycles',
                'description' => 'Comprehensive guide to understanding menstrual cycles, tracking your period, recognizing normal vs. abnormal patterns, and maintaining menstrual health throughout different life stages.',
                'order' => 8,
                'is_active' => true,
                'published' => true,
                'featured' => false,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('modules')->insert($modules);
    }
}

