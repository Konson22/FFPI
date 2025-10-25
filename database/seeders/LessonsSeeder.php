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
            // Module 1: Understanding SRHR
            ['module_id' => 1, 'title' => 'SRHR Fundamentals', 'content' => 'Introduction to Sexual and Reproductive Health and Rights, covering rights-based approaches to health education.', 'pdf_url' => '/pdfs/srhr-fundamentals.pdf', 'video_url' => '/videos/srhr-fundamentals.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 1, 'title' => 'Rights-Based Approach', 'content' => 'Understanding rights-based approaches to sexual and reproductive health education and services.', 'pdf_url' => '/pdfs/rights-based-approach.pdf', 'video_url' => '/videos/rights-based-approach.mp4', 'order' => 2, 'is_active' => true],
            
            // Module 2: Introduction to Family Planning
            ['module_id' => 2, 'title' => 'Understanding Family Planning', 'content' => 'Introduction to family planning concepts, benefits, and importance for reproductive health.', 'pdf_url' => '/pdfs/family-planning-intro.pdf', 'video_url' => '/videos/family-planning-intro.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 2, 'title' => 'Reproductive Rights', 'content' => 'Understanding reproductive rights and decision-making in family planning.', 'pdf_url' => '/pdfs/reproductive-rights.pdf', 'video_url' => null, 'order' => 2, 'is_active' => true],
            
            // Module 3: Contraceptive Methods
            ['module_id' => 3, 'title' => 'Hormonal Methods', 'content' => 'Comprehensive overview of hormonal contraceptive methods including pills, patches, and injections.', 'pdf_url' => '/pdfs/hormonal-methods.pdf', 'video_url' => '/videos/hormonal-methods.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 3, 'title' => 'Barrier Methods', 'content' => 'Understanding barrier contraceptive methods and their proper use.', 'pdf_url' => '/pdfs/barrier-methods.pdf', 'video_url' => '/videos/barrier-methods.mp4', 'order' => 2, 'is_active' => true],
            ['module_id' => 3, 'title' => 'Long-Acting Methods', 'content' => 'Introduction to long-acting reversible contraceptives (LARCs).', 'pdf_url' => '/pdfs/larc-methods.pdf', 'video_url' => '/videos/larc-methods.mp4', 'order' => 3, 'is_active' => true],
            
            // Module 4: Reproductive Health for Teens
            ['module_id' => 4, 'title' => 'Understanding Puberty', 'content' => 'Age-appropriate education about physical and emotional changes during puberty.', 'pdf_url' => '/pdfs/puberty-guide.pdf', 'video_url' => '/videos/puberty-changes.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 4, 'title' => 'Healthy Relationships', 'content' => 'Building healthy relationships and communication skills for teenagers.', 'pdf_url' => '/pdfs/healthy-relationships.pdf', 'video_url' => '/videos/healthy-relationships.mp4', 'order' => 2, 'is_active' => true],
            
            // Module 5: Pregnancy Planning
            ['module_id' => 5, 'title' => 'Preconception Care', 'content' => 'Essential health preparations before becoming pregnant.', 'pdf_url' => '/pdfs/preconception-care.pdf', 'video_url' => '/videos/preconception-care.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 5, 'title' => 'Fertility Awareness', 'content' => 'Understanding fertility cycles and natural family planning methods.', 'pdf_url' => '/pdfs/fertility-awareness.pdf', 'video_url' => '/videos/fertility-tracker.mp4', 'order' => 2, 'is_active' => true],
            
            // Module 6: STI Prevention
            ['module_id' => 6, 'title' => 'STI Basics', 'content' => 'Understanding sexually transmitted infections and their prevention.', 'pdf_url' => '/pdfs/sti-prevention.pdf', 'video_url' => '/videos/sti-prevention.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 6, 'title' => 'Safe Sex Practices', 'content' => 'Practical guidance on safe sex practices and protection methods.', 'pdf_url' => '/pdfs/safe-sex-practices.pdf', 'video_url' => '/videos/safe-sex-practices.mp4', 'order' => 2, 'is_active' => true],
            
            // Module 7: Menstrual Health
            ['module_id' => 7, 'title' => 'Menstrual Cycle Basics', 'content' => 'Understanding the menstrual cycle and its phases.', 'pdf_url' => '/pdfs/menstrual-cycle.pdf', 'video_url' => '/videos/menstrual-cycle.mp4', 'order' => 1, 'is_active' => true],
            ['module_id' => 7, 'title' => 'Menstrual Health Management', 'content' => 'Managing menstrual health and addressing common concerns.', 'pdf_url' => '/pdfs/menstrual-health.pdf', 'video_url' => '/videos/menstrual-health.mp4', 'order' => 2, 'is_active' => true],
        ];

        DB::table('lessons')->insert($lessons);
    }
}
