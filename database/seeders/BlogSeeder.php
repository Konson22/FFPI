<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class BlogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Skip if blogs already exist
        if (DB::table('blogs')->count() > 0) {
            $this->command->info('Blogs already exist. Skipping BlogSeeder.');
            return;
        }

        // Get the first user (admin) or create a default user
        $user = User::first();
        if (!$user) {
            $this->command->warn('No users found. Please run UserSeeder first.');
            return;
        }

        $blogs = [
            [
                'user_id' => $user->id,
                'title' => 'Understanding Sexual and Reproductive Health Rights',
                'slug' => 'understanding-sexual-and-reproductive-health-rights',
                'content' => 'Sexual and Reproductive Health and Rights (SRHR) are fundamental human rights that encompass the right to make decisions about one\'s own body, sexuality, and reproduction. This comprehensive guide explores the key concepts, principles, and importance of SRHR in promoting individual well-being and social justice.

SRHR includes access to comprehensive sexual and reproductive health services, information, and education. It recognizes that all individuals have the right to make informed choices about their sexual and reproductive lives, free from discrimination, coercion, and violence.

Key components of SRHR include:
- Access to quality healthcare services
- Comprehensive sexuality education
- Family planning and contraception
- Safe abortion services (where legal)
- Prevention and treatment of STIs
- Maternal and child health services

Understanding and advocating for SRHR is crucial for achieving gender equality, reducing poverty, and promoting sustainable development.',
                'excerpt' => 'A comprehensive guide to understanding Sexual and Reproductive Health and Rights (SRHR), their importance, and how they contribute to individual well-being and social justice.',
                'featured_image' => null,
                'category' => 'sexual-health',
                'status' => 'published',
                'is_featured' => true,
                'views_count' => 0,
                'published_at' => Carbon::now()->subDays(5),
                'created_at' => Carbon::now()->subDays(5),
                'updated_at' => Carbon::now()->subDays(5),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Family Planning Methods: A Complete Guide',
                'slug' => 'family-planning-methods-complete-guide',
                'content' => 'Family planning is an essential aspect of reproductive health that allows individuals and couples to decide if and when to have children. This guide covers various family planning methods, their effectiveness, and how to choose the right option for you.

Types of Family Planning Methods

Hormonal Methods
Hormonal contraceptives work by preventing ovulation or thickening cervical mucus. These include:
- Birth control pills
- Contraceptive patches
- Vaginal rings
- Injectable contraceptives
- Implants

Barrier Methods
Barrier methods prevent sperm from reaching the egg:
- Condoms (male and female)
- Diaphragms
- Cervical caps

Long-Acting Reversible Contraceptives (LARCs)
LARCs provide long-term protection and are highly effective:
- Intrauterine devices (IUDs)
- Contraceptive implants

Permanent Methods
For those who have completed their families:
- Vasectomy (for men)
- Tubal ligation (for women)

Consulting with a healthcare provider is essential to choose the method that best fits your lifestyle, health needs, and reproductive goals.',
                'excerpt' => 'Explore different family planning methods, their effectiveness, and how to choose the right contraceptive option for your needs and lifestyle.',
                'featured_image' => null,
                'category' => 'family-planning',
                'status' => 'published',
                'is_featured' => true,
                'views_count' => 0,
                'published_at' => Carbon::now()->subDays(3),
                'created_at' => Carbon::now()->subDays(3),
                'updated_at' => Carbon::now()->subDays(3),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Building Healthy Relationships: Communication and Consent',
                'slug' => 'building-healthy-relationships-communication-consent',
                'content' => 'Healthy relationships are built on a foundation of mutual respect, open communication, and clear consent. This article explores the key principles of healthy relationships and how to foster them.

Communication is Key
Effective communication involves:
- Active listening
- Expressing needs and boundaries clearly
- Respecting different perspectives
- Resolving conflicts constructively

Understanding Consent
Consent is an ongoing, enthusiastic agreement to engage in any activity. Key aspects include:
- Consent must be freely given
- It can be withdrawn at any time
- It must be informed and specific
- Silence does not equal consent

Respect and Boundaries
Healthy relationships respect individual boundaries and autonomy. This includes:
- Respecting personal space and privacy
- Supporting individual goals and aspirations
- Valuing each other\'s opinions and feelings

Remember, healthy relationships should enhance your well-being and support your growth as an individual.',
                'excerpt' => 'Learn about the fundamentals of healthy relationships, including effective communication, understanding consent, and respecting boundaries.',
                'featured_image' => null,
                'category' => 'relationships',
                'status' => 'published',
                'is_featured' => false,
                'views_count' => 0,
                'published_at' => Carbon::now()->subDays(2),
                'created_at' => Carbon::now()->subDays(2),
                'updated_at' => Carbon::now()->subDays(2),
            ],
            [
                'user_id' => $user->id,
                'title' => 'STI Prevention and Treatment: What You Need to Know',
                'slug' => 'sti-prevention-treatment-what-you-need-to-know',
                'content' => 'Sexually Transmitted Infections (STIs) are common and can affect anyone who is sexually active. Understanding prevention, symptoms, and treatment is crucial for maintaining sexual health.

Prevention Methods
The most effective ways to prevent STIs include:
- Consistent and correct use of condoms
- Regular STI testing
- Open communication with partners
- Vaccination (for HPV and Hepatitis B)
- Limiting number of sexual partners

Common STIs
Some common STIs include:
- Chlamydia
- Gonorrhea
- Syphilis
- HIV/AIDS
- Herpes
- HPV (Human Papillomavirus)

Getting Tested
Regular STI testing is important, especially if you:
- Are sexually active
- Have multiple partners
- Have unprotected sex
- Experience symptoms

Treatment
Many STIs are treatable with antibiotics or antiviral medications. Early detection and treatment are crucial for preventing complications and transmission to others.

Remember, there is no shame in having an STI, and seeking medical care is a responsible action for your health and the health of your partners.',
                'excerpt' => 'Essential information about STI prevention, common infections, testing, and treatment options to maintain your sexual health.',
                'featured_image' => null,
                'category' => 'stis',
                'status' => 'published',
                'is_featured' => false,
                'views_count' => 0,
                'published_at' => Carbon::now()->subDays(1),
                'created_at' => Carbon::now()->subDays(1),
                'updated_at' => Carbon::now()->subDays(1),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Mental Health and Sexual Well-being',
                'slug' => 'mental-health-sexual-wellbeing',
                'content' => 'Mental health and sexual well-being are deeply interconnected. This article explores how mental health affects sexual health and vice versa, and provides guidance on maintaining both.

The Connection
Mental health issues can impact sexual function, desire, and relationships. Similarly, sexual health problems can affect mental well-being, leading to stress, anxiety, or depression.

Common Issues
Some mental health conditions that may affect sexual health include:
- Depression
- Anxiety disorders
- Post-traumatic stress disorder (PTSD)
- Body image issues
- Low self-esteem

Seeking Help
If you\'re experiencing challenges with mental health or sexual well-being:
- Talk to a healthcare provider
- Consider counseling or therapy
- Communicate openly with your partner
- Practice self-care and stress management

Self-Care Strategies
Maintaining good mental and sexual health involves:
- Regular exercise
- Healthy sleep patterns
- Stress management techniques
- Open communication
- Seeking professional support when needed

Remember, seeking help is a sign of strength, not weakness.',
                'excerpt' => 'Understanding the connection between mental health and sexual well-being, and learning strategies to maintain both aspects of your health.',
                'featured_image' => null,
                'category' => 'mental-health',
                'status' => 'published',
                'is_featured' => false,
                'views_count' => 0,
                'published_at' => Carbon::now(),
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Reproductive Health Services: Access and Rights',
                'slug' => 'reproductive-health-services-access-rights',
                'content' => 'Access to quality reproductive health services is a fundamental right. This article discusses the types of services available, your rights as a patient, and how to access care.

Types of Services
Reproductive health services include:
- Family planning counseling
- Contraceptive services
- Prenatal and postnatal care
- STI testing and treatment
- Cancer screenings (cervical, breast)
- Infertility services

Your Rights
As a patient, you have the right to:
- Confidential and respectful care
- Informed consent
- Access information about all available options
- Make decisions about your own body
- Refuse any treatment

Finding Services
To find reproductive health services:
- Contact local health centers
- Ask your primary care provider
- Use online directories
- Contact health hotlines

Remember, you deserve quality, respectful, and confidential reproductive health care.',
                'excerpt' => 'Learn about reproductive health services, your rights as a patient, and how to access quality care in your community.',
                'featured_image' => null,
                'category' => 'reproductive-health',
                'status' => 'published',
                'is_featured' => false,
                'views_count' => 0,
                'published_at' => Carbon::now()->subHours(12),
                'created_at' => Carbon::now()->subHours(12),
                'updated_at' => Carbon::now()->subHours(12),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Comprehensive Sexuality Education: Why It Matters',
                'slug' => 'comprehensive-sexuality-education-why-it-matters',
                'content' => 'Comprehensive Sexuality Education (CSE) is an age-appropriate, culturally relevant approach to teaching about sexuality and relationships. This article explains why CSE is important and what it should include.

What is CSE?
Comprehensive Sexuality Education provides accurate, evidence-based information about:
- Human development and anatomy
- Relationships and communication
- Personal skills and values
- Sexual behavior
- Sexual health
- Society and culture

Benefits of CSE
Research shows that comprehensive sexuality education:
- Delays sexual initiation
- Reduces risky sexual behaviors
- Increases use of contraception
- Reduces STI rates
- Promotes gender equality
- Prevents sexual violence

Key Components
Effective CSE programs include:
- Age-appropriate information
- Evidence-based content
- Skills-building activities
- Respect for diversity
- Promotion of human rights

Comprehensive sexuality education empowers young people to make informed decisions about their sexual and reproductive health.',
                'excerpt' => 'Discover the importance of comprehensive sexuality education and how it empowers individuals to make informed decisions about their sexual and reproductive health.',
                'featured_image' => null,
                'category' => 'education',
                'status' => 'published',
                'is_featured' => true,
                'views_count' => 0,
                'published_at' => Carbon::now()->subHours(6),
                'created_at' => Carbon::now()->subHours(6),
                'updated_at' => Carbon::now()->subHours(6),
            ],
            [
                'user_id' => $user->id,
                'title' => 'Contraception Options: Making the Right Choice',
                'slug' => 'contraception-options-making-right-choice',
                'content' => 'Choosing the right contraceptive method is a personal decision that depends on various factors. This guide helps you understand your options and make an informed choice.

Factors to Consider
When choosing contraception, consider:
- Effectiveness
- Side effects
- Convenience
- Cost
- Protection against STIs
- Future fertility plans

Short-Acting Methods
These require regular use:
- Combined pills
- Progestin-only pills
- Patches and rings
- Condoms

Long-Acting Methods
These provide protection for extended periods:
- IUDs (hormonal and copper)
- Implants
- Injections

Emergency Contraception
Available for use after unprotected sex:
- Emergency contraceptive pills
- Copper IUD insertion

Consulting a Healthcare Provider
It\'s important to discuss your options with a healthcare provider who can:
- Assess your health history
- Explain all available options
- Help you choose the best method
- Provide follow-up care

Remember, the best contraceptive is one that you will use consistently and correctly.',
                'excerpt' => 'A comprehensive guide to contraception options, helping you make an informed decision based on your lifestyle, health, and reproductive goals.',
                'featured_image' => null,
                'category' => 'contraception',
                'status' => 'published',
                'is_featured' => false,
                'views_count' => 0,
                'published_at' => Carbon::now()->subHours(3),
                'created_at' => Carbon::now()->subHours(3),
                'updated_at' => Carbon::now()->subHours(3),
            ],
        ];

        DB::table('blogs')->insert($blogs);
        $this->command->info('Successfully seeded ' . count($blogs) . ' blog posts.');
    }
}
