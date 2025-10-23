<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $posts = [
            [
                'user_id' => 1,
                'category' => 'Basic Education',
                'title' => 'Understanding Different Contraceptive Methods',
                'content' => 'There are many contraceptive options available today, each with its own benefits and considerations. From hormonal methods like birth control pills and IUDs to barrier methods like condoms, it\'s important to choose what works best for your lifestyle and health needs. Always consult with a healthcare provider to discuss your options and any potential side effects.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => true,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 245,
                'reactions_count' => 18,
                'created_at' => now()->subDays(2),
                'updated_at' => now()->subDays(2),
            ],
            [
                'user_id' => 2,
                'category' => 'SRHR',
                'title' => 'STI Prevention: What You Need to Know',
                'content' => 'Sexually transmitted infections (STIs) are more common than many people think. The good news is that most STIs are preventable with proper protection and regular testing. Remember: communication with your partner, consistent condom use, and regular health check-ups are key to maintaining sexual health.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 189,
                'reactions_count' => 12,
                'created_at' => now()->subDays(1),
                'updated_at' => now()->subDays(1),
            ],
            [
                'user_id' => 3,
                'category' => 'Youth Education',
                'title' => 'Your Reproductive Rights Matter',
                'content' => 'Every person has the right to make informed decisions about their reproductive health. This includes access to comprehensive healthcare, information, and services without discrimination. Know your rights and don\'t hesitate to advocate for yourself and others in your community.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 156,
                'reactions_count' => 25,
                'created_at' => now()->subHours(6),
                'updated_at' => now()->subHours(6),
            ],
            [
                'user_id' => 1,
                'category' => 'Adult Education',
                'title' => 'Puberty Changes: What to Expect',
                'content' => 'Puberty is a normal part of growing up, but it can feel overwhelming. Your body is changing in many ways - this is completely normal! Remember that everyone goes through puberty at their own pace, and it\'s okay to have questions. Don\'t hesitate to talk to trusted adults or healthcare providers.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 98,
                'reactions_count' => 8,
                'created_at' => now()->subHours(12),
                'updated_at' => now()->subHours(12),
            ],
            [
                'user_id' => 2,
                'category' => 'Women\'s Health',
                'title' => 'Mental Health and Sexual Well-being',
                'content' => 'Your mental health and sexual well-being are closely connected. It\'s important to prioritize both physical and emotional aspects of your health. If you\'re struggling with anxiety, depression, or other mental health concerns related to your sexual health, remember that help is available and you\'re not alone.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 134,
                'reactions_count' => 15,
                'created_at' => now()->subHours(18),
                'updated_at' => now()->subHours(18),
            ],
            [
                'user_id' => 3,
                'category' => 'Mental Health',
                'title' => 'Sharing My Story: Overcoming Stigma',
                'content' => 'I want to share my experience with seeking reproductive healthcare and how I overcame the stigma around it. It wasn\'t easy, but finding a supportive healthcare provider and connecting with others who had similar experiences made all the difference. Your health matters, and you deserve compassionate care.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => true,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 312,
                'reactions_count' => 42,
                'created_at' => now()->subDays(3),
                'updated_at' => now()->subDays(3),
            ],
            [
                'user_id' => 1,
                'category' => 'Research & Evidence',
                'title' => 'New Study: Impact of Comprehensive Sex Education',
                'content' => 'A recent study shows that comprehensive sex education programs lead to better health outcomes for young people. Students who received comprehensive education were more likely to use protection and make informed decisions about their sexual health. This highlights the importance of evidence-based education in our communities.',
                'type' => 'text',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => true,
                'views_count' => 178,
                'reactions_count' => 9,
                'created_at' => now()->subDays(4),
                'updated_at' => now()->subDays(4),
            ],
            [
                'user_id' => 2,
                'category' => 'Preventive Care',
                'title' => 'Q: Is it normal to have irregular periods?',
                'content' => 'I\'m 19 and my periods have been irregular for the past year. Sometimes I skip a month, sometimes they\'re very heavy. Is this normal? I\'m worried something might be wrong. Any advice would be appreciated!',
                'type' => 'question',
                'status' => 'published',
                'is_featured' => false,
                'allow_comments' => true,
                'allow_sharing' => false,
                'views_count' => 67,
                'reactions_count' => 3,
                'created_at' => now()->subHours(3),
                'updated_at' => now()->subHours(3),
            ],
        ];

        DB::table('posts')->insert($posts);
    }
}
