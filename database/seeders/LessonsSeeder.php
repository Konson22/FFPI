<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LessonsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = [
            // Module 1: Introduction to Family Planning
            ['module_id' => 1, 'title' => 'Understanding Family Planning', 'content' => 'Introduction to family planning concepts, benefits, and importance for reproductive health.', 'key_points' => json_encode(['Definition of family planning', 'Benefits for individuals and families', 'Role in reproductive health', 'Cultural considerations']), 'media_type' => 'video', 'media_url' => '/videos/family-planning-intro.mp4'],
            ['module_id' => 1, 'title' => 'Reproductive Rights', 'content' => 'Understanding reproductive rights and decision-making in family planning.', 'key_points' => json_encode(['Right to choose', 'Informed consent', 'Access to services', 'Gender equality']), 'media_type' => 'presentation', 'media_url' => '/presentations/reproductive-rights.pdf'],
            
            // Module 2: Contraceptive Methods
            ['module_id' => 2, 'title' => 'Hormonal Methods', 'content' => 'Comprehensive overview of hormonal contraceptive methods including pills, patches, and injections.', 'key_points' => json_encode(['Birth control pills', 'Hormonal patches', 'Injectable contraceptives', 'Hormonal IUDs', 'Effectiveness rates']), 'media_type' => 'video', 'media_url' => '/videos/hormonal-methods.mp4'],
            ['module_id' => 2, 'title' => 'Barrier Methods', 'content' => 'Understanding barrier contraceptive methods and their proper use.', 'key_points' => json_encode(['Condoms (male and female)', 'Diaphragms', 'Cervical caps', 'Spermicides', 'Proper usage techniques']), 'media_type' => 'interactive', 'media_url' => '/interactive/barrier-methods-demo'],
            ['module_id' => 2, 'title' => 'Long-Acting Methods', 'content' => 'Introduction to long-acting reversible contraceptives (LARCs).', 'key_points' => json_encode(['IUDs (copper and hormonal)', 'Implants', 'Advantages and considerations', 'Insertion and removal']), 'media_type' => 'video', 'media_url' => '/videos/larc-methods.mp4'],
            
            // Module 3: Reproductive Health for Teens
            ['module_id' => 3, 'title' => 'Understanding Puberty', 'content' => 'Age-appropriate education about physical and emotional changes during puberty.', 'key_points' => json_encode(['Physical changes in boys and girls', 'Emotional changes', 'Timeline of puberty', 'Normal variations']), 'media_type' => 'animation', 'media_url' => '/animations/puberty-changes.swf'],
            ['module_id' => 3, 'title' => 'Healthy Relationships', 'content' => 'Building healthy relationships and communication skills for teenagers.', 'key_points' => json_encode(['Communication skills', 'Consent and boundaries', 'Respect and equality', 'Recognizing unhealthy relationships']), 'media_type' => 'interactive', 'media_url' => '/interactive/healthy-relationships'],
            
            // Module 4: Pregnancy Planning
            ['module_id' => 4, 'title' => 'Preconception Care', 'content' => 'Essential health preparations before becoming pregnant.', 'key_points' => json_encode(['Folic acid supplementation', 'Health check-ups', 'Lifestyle modifications', 'Genetic counseling']), 'media_type' => 'checklist', 'media_url' => '/checklists/preconception-care.pdf'],
            ['module_id' => 4, 'title' => 'Fertility Awareness', 'content' => 'Understanding fertility cycles and natural family planning methods.', 'key_points' => json_encode(['Menstrual cycle basics', 'Fertility signs', 'Natural family planning', 'Tracking methods']), 'media_type' => 'interactive', 'media_url' => '/interactive/fertility-tracker'],
            
            // Module 5: STI Prevention
            ['module_id' => 5, 'title' => 'STI Basics', 'content' => 'Understanding sexually transmitted infections and their prevention.', 'key_points' => json_encode(['Common STIs', 'Transmission methods', 'Symptoms and testing', 'Prevention strategies']), 'media_type' => 'video', 'media_url' => '/videos/sti-prevention.mp4'],
            ['module_id' => 5, 'title' => 'Safe Sex Practices', 'content' => 'Practical guidance on safe sex practices and protection methods.', 'key_points' => json_encode(['Condom use', 'Regular testing', 'Communication with partners', 'Risk reduction']), 'media_type' => 'demonstration', 'media_url' => '/demos/safe-sex-practices'],
            
            // Module 6: Menstrual Health
            ['module_id' => 6, 'title' => 'Menstrual Cycle Basics', 'content' => 'Understanding the menstrual cycle and its phases.', 'key_points' => json_encode(['Cycle phases', 'Hormonal changes', 'Normal variations', 'Cycle tracking']), 'media_type' => 'animation', 'media_url' => '/animations/menstrual-cycle.swf'],
            ['module_id' => 6, 'title' => 'Menstrual Health Management', 'content' => 'Managing menstrual health and addressing common concerns.', 'key_points' => json_encode(['Hygiene practices', 'Pain management', 'When to seek help', 'Product options']), 'media_type' => 'guide', 'media_url' => '/guides/menstrual-health.pdf'],
        ];

        DB::table('lessons')->insert($lessons);
    }
}
