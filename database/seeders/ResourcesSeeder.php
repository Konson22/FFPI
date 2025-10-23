<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ResourcesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $resources = [
            // Resources for Module 1
            ['lesson_id' => 1, 'title' => 'DSW Training Manual', 'link' => 'https://thecompassforsbc.org/wp-content/uploads/Sexual_and_Reproductive_Health_Training.pdf'],
            ['lesson_id' => 1, 'title' => 'UNFPA Family Planning Guide', 'link' => 'https://www.unfpa.org/family-planning'],
            ['lesson_id' => 2, 'title' => 'WHO Reproductive Rights', 'link' => 'https://www.who.int/reproductivehealth/topics/rights/en/'],
            
            // Resources for Module 2
            ['lesson_id' => 3, 'title' => 'Contraceptive Technology Guide', 'link' => 'https://www.contraceptivetechnology.org/'],
            ['lesson_id' => 4, 'title' => 'CDC Barrier Methods', 'link' => 'https://www.cdc.gov/reproductivehealth/contraception/barrier-methods.htm'],
            ['lesson_id' => 5, 'title' => 'ACOG LARC Guidelines', 'link' => 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2017/05/long-acting-reversible-contraception'],
            
            // Resources for Module 3
            ['lesson_id' => 6, 'title' => 'Teen Health Guide', 'link' => 'https://www.cdc.gov/healthyyouth/sexualbehaviors/'],
            ['lesson_id' => 7, 'title' => 'Healthy Relationships Toolkit', 'link' => 'https://www.cdc.gov/violenceprevention/intimatepartnerviolence/resources.html'],
            
            // Resources for Module 4
            ['lesson_id' => 8, 'title' => 'Preconception Care Guidelines', 'link' => 'https://www.cdc.gov/preconception/'],
            ['lesson_id' => 9, 'title' => 'Fertility Awareness Methods', 'link' => 'https://www.acog.org/womens-health/faqs/fertility-awareness-based-methods-of-family-planning'],
            
            // Resources for Module 5
            ['lesson_id' => 10, 'title' => 'CDC STI Information', 'link' => 'https://www.cdc.gov/std/default.htm'],
            ['lesson_id' => 11, 'title' => 'Safe Sex Guidelines', 'link' => 'https://www.plannedparenthood.org/learn/birth-control'],
            
            // Resources for Module 6
            ['lesson_id' => 12, 'title' => 'Menstrual Health Guide', 'link' => 'https://www.who.int/news-room/fact-sheets/detail/menstrual-health'],
            ['lesson_id' => 13, 'title' => 'Cycle Tracking Apps', 'link' => 'https://www.healthline.com/health/best-period-tracking-apps'],
        ];

        DB::table('resources')->insert($resources);
    }
}
