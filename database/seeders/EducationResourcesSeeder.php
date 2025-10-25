<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Str;

class EducationResourcesSeeder extends Seeder
{
    public function run(): void
    {
        $resources = [
            [
                'title' => 'Understanding Your Menstrual Cycle',
                'slug' => 'understanding-menstrual-cycle',
                'content' => 'Your menstrual cycle is a complex process that prepares your body for pregnancy each month. It typically lasts 28 days but can range from 21 to 35 days. The cycle consists of four phases: menstrual, follicular, ovulatory, and luteal. Understanding these phases can help you track your fertility and overall health.',
                'category' => 'Menstrual Health',
                'image' => 'menstrual-cycle-guide.jpg',
                'video_url' => 'https://example.com/videos/menstrual-cycle',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(30),
                'created_at' => Carbon::now()->subDays(30),
                'updated_at' => Carbon::now()->subDays(30),
            ],
            [
                'title' => 'Fertility Awareness Methods',
                'slug' => 'fertility-awareness-methods',
                'content' => 'Fertility awareness methods (FAM) are natural family planning techniques that help you identify when you are most likely to conceive. These methods include tracking basal body temperature, cervical mucus changes, and cervical position. When used correctly, FAM can be up to 99% effective for avoiding pregnancy.',
                'category' => 'Fertility',
                'image' => 'fertility-awareness.jpg',
                'video_url' => null,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(25),
                'created_at' => Carbon::now()->subDays(25),
                'updated_at' => Carbon::now()->subDays(25),
            ],
            [
                'title' => 'Contraceptive Options Guide',
                'slug' => 'contraceptive-options-guide',
                'content' => 'There are many contraceptive options available, each with different effectiveness rates and side effects. Options include hormonal methods (pills, patches, rings), barrier methods (condoms, diaphragms), long-acting reversible contraceptives (IUDs, implants), and permanent methods (tubal ligation, vasectomy).',
                'category' => 'Family Planning',
                'image' => 'contraceptive-guide.jpg',
                'video_url' => 'https://example.com/videos/contraceptive-options',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(20),
                'created_at' => Carbon::now()->subDays(20),
                'updated_at' => Carbon::now()->subDays(20),
            ],
            [
                'title' => 'Tracking Ovulation Symptoms',
                'slug' => 'tracking-ovulation-symptoms',
                'content' => 'Ovulation symptoms can help you identify your most fertile days. Common signs include changes in cervical mucus (becoming clear and stretchy), slight increase in basal body temperature, mild pelvic pain (mittelschmerz), breast tenderness, and increased libido. Tracking these symptoms can improve your fertility awareness.',
                'category' => 'Fertility',
                'image' => 'ovulation-symptoms.jpg',
                'video_url' => null,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(15),
                'created_at' => Carbon::now()->subDays(15),
                'updated_at' => Carbon::now()->subDays(15),
            ],
            [
                'title' => 'Menstrual Health and Nutrition',
                'slug' => 'menstrual-health-nutrition',
                'content' => 'Proper nutrition plays a crucial role in maintaining regular menstrual cycles and overall reproductive health. Key nutrients include iron (for blood loss), calcium and vitamin D (for bone health), omega-3 fatty acids (for hormone regulation), and B vitamins (for energy and mood). A balanced diet can help reduce PMS symptoms and support fertility.',
                'category' => 'Menstrual Health',
                'image' => 'nutrition-guide.jpg',
                'video_url' => 'https://example.com/videos/nutrition-menstrual-health',
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(10),
                'created_at' => Carbon::now()->subDays(10),
                'updated_at' => Carbon::now()->subDays(10),
            ],
            [
                'title' => 'Preparing for Pregnancy',
                'slug' => 'preparing-for-pregnancy',
                'content' => 'Preconception care is important for both partners when planning a pregnancy. This includes taking folic acid supplements, maintaining a healthy weight, avoiding alcohol and tobacco, managing chronic conditions, and getting up-to-date vaccinations. Both partners should also consider genetic counseling if there\'s a family history of genetic conditions.',
                'category' => 'Family Planning',
                'image' => 'preparing-pregnancy.jpg',
                'video_url' => null,
                'status' => 'published',
                'published_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'title' => 'Managing PMS Symptoms',
                'slug' => 'managing-pms-symptoms',
                'content' => 'Premenstrual syndrome (PMS) affects many women in the days leading up to their period. Common symptoms include mood swings, bloating, breast tenderness, fatigue, and food cravings. Management strategies include regular exercise, stress reduction techniques, dietary changes, and in some cases, hormonal treatments or supplements.',
                'category' => 'Menstrual Health',
                'image' => 'pms-management.jpg',
                'video_url' => 'https://example.com/videos/pms-management',
                'status' => 'draft',
                'published_at' => null,
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
        ];

        DB::table('education_resources')->insert($resources);
    }
}
