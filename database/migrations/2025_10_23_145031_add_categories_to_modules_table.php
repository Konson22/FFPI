<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // First, let's add a category_id column to link to a categories table
        Schema::create('module_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100)->unique();
            $table->string('slug', 100)->unique();
            $table->text('description')->nullable();
            $table->string('color', 7)->default('#3B82F6'); // Hex color for UI
            $table->string('icon', 50)->nullable(); // Icon class or name
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add category_id to modules table
        Schema::table('modules', function (Blueprint $table) {
            $table->unsignedBigInteger('category_id')->nullable()->after('category');
            $table->foreign('category_id')->references('id')->on('module_categories')->onDelete('set null');
        });

        // Insert the comprehensive category system
        $categories = [
            // Core Education Categories
            [
                'name' => 'Basic Education',
                'slug' => 'basic-education',
                'description' => 'Foundational concepts and introduction modules for family planning and reproductive health',
                'color' => '#3B82F6',
                'icon' => 'book-open',
                'sort_order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'SRHR',
                'slug' => 'srhr',
                'description' => 'Sexual and Reproductive Health and Rights - Rights-based approach to health education',
                'color' => '#10B981',
                'icon' => 'heart',
                'sort_order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Youth Education',
                'slug' => 'youth-education',
                'description' => 'Age-appropriate content for teenagers and young adults',
                'color' => '#F59E0B',
                'icon' => 'users',
                'sort_order' => 3,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Adult Education',
                'slug' => 'adult-education',
                'description' => 'Comprehensive content for adults and couples',
                'color' => '#8B5CF6',
                'icon' => 'user-group',
                'sort_order' => 4,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Health & Wellness Categories
            [
                'name' => 'Women\'s Health',
                'slug' => 'womens-health',
                'description' => 'Menstrual health, reproductive health, pregnancy care, and women-specific health topics',
                'color' => '#EC4899',
                'icon' => 'user',
                'sort_order' => 5,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Men\'s Health',
                'slug' => 'mens-health',
                'description' => 'Male reproductive health, contraception, and wellness',
                'color' => '#06B6D4',
                'icon' => 'user',
                'sort_order' => 6,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Mental Health',
                'slug' => 'mental-health',
                'description' => 'Psychological aspects of reproductive health and wellness',
                'color' => '#84CC16',
                'icon' => 'brain',
                'sort_order' => 7,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Preventive Care',
                'slug' => 'preventive-care',
                'description' => 'STI prevention, health screenings, wellness practices, and preventive measures',
                'color' => '#EF4444',
                'icon' => 'shield-check',
                'sort_order' => 8,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Family Planning Categories
            [
                'name' => 'Contraceptive Methods',
                'slug' => 'contraceptive-methods',
                'description' => 'Detailed coverage of all contraceptive options and methods',
                'color' => '#F97316',
                'icon' => 'shield',
                'sort_order' => 9,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Pregnancy Planning',
                'slug' => 'pregnancy-planning',
                'description' => 'Preconception care, pregnancy preparation, and planning for families',
                'color' => '#22C55E',
                'icon' => 'baby',
                'sort_order' => 10,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Fertility Awareness',
                'slug' => 'fertility-awareness',
                'description' => 'Natural family planning, cycle tracking, and fertility education',
                'color' => '#A855F7',
                'icon' => 'chart-line',
                'sort_order' => 11,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Postpartum Care',
                'slug' => 'postpartum-care',
                'description' => 'Post-birth family planning, health recovery, and newborn care',
                'color' => '#F43F5E',
                'icon' => 'heart-pulse',
                'sort_order' => 12,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Relationships & Communication
            [
                'name' => 'Healthy Relationships',
                'slug' => 'healthy-relationships',
                'description' => 'Building and maintaining healthy partnerships and relationships',
                'color' => '#8B5CF6',
                'icon' => 'heart',
                'sort_order' => 13,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Communication Skills',
                'slug' => 'communication-skills',
                'description' => 'Talking about reproductive health with partners, family, and healthcare providers',
                'color' => '#06B6D4',
                'icon' => 'chat-bubble-left-right',
                'sort_order' => 14,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Consent & Boundaries',
                'slug' => 'consent-boundaries',
                'description' => 'Understanding and respecting personal limits, consent, and healthy boundaries',
                'color' => '#F59E0B',
                'icon' => 'hand-raised',
                'sort_order' => 15,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Gender & Sexuality',
                'slug' => 'gender-sexuality',
                'description' => 'Inclusive education about diverse identities and sexual orientations',
                'color' => '#EC4899',
                'icon' => 'rainbow',
                'sort_order' => 16,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Specialized Topics
            [
                'name' => 'Healthcare Provider Training',
                'slug' => 'healthcare-provider-training',
                'description' => 'Professional development for medical staff and healthcare workers',
                'color' => '#10B981',
                'icon' => 'user-md',
                'sort_order' => 17,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Community Health',
                'slug' => 'community-health',
                'description' => 'Public health approaches and community education initiatives',
                'color' => '#3B82F6',
                'icon' => 'building-office',
                'sort_order' => 18,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Cultural Sensitivity',
                'slug' => 'cultural-sensitivity',
                'description' => 'Culturally appropriate family planning education and practices',
                'color' => '#8B5CF6',
                'icon' => 'globe',
                'sort_order' => 19,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Emergency Situations',
                'slug' => 'emergency-situations',
                'description' => 'Emergency contraception, crisis support, and urgent health situations',
                'color' => '#EF4444',
                'icon' => 'exclamation-triangle',
                'sort_order' => 20,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Life Stage Categories
            [
                'name' => 'Adolescent Health',
                'slug' => 'adolescent-health',
                'description' => 'Puberty, teen relationships, and early reproductive health education',
                'color' => '#F59E0B',
                'icon' => 'user-group',
                'sort_order' => 21,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Young Adult',
                'slug' => 'young-adult',
                'description' => 'College-age reproductive health, planning, and decision-making',
                'color' => '#06B6D4',
                'icon' => 'academic-cap',
                'sort_order' => 22,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Family Building',
                'slug' => 'family-building',
                'description' => 'Planning for children, pregnancy, parenting, and family development',
                'color' => '#22C55E',
                'icon' => 'home',
                'sort_order' => 23,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Midlife Health',
                'slug' => 'midlife-health',
                'description' => 'Perimenopause, aging, and continued reproductive health in later years',
                'color' => '#8B5CF6',
                'icon' => 'clock',
                'sort_order' => 24,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Technical & Professional
            [
                'name' => 'Healthcare Systems',
                'slug' => 'healthcare-systems',
                'description' => 'Understanding healthcare access, navigation, and system utilization',
                'color' => '#3B82F6',
                'icon' => 'building-hospital',
                'sort_order' => 25,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Policy & Advocacy',
                'slug' => 'policy-advocacy',
                'description' => 'Reproductive rights advocacy, policy awareness, and legal aspects',
                'color' => '#10B981',
                'icon' => 'scale',
                'sort_order' => 26,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Research & Evidence',
                'slug' => 'research-evidence',
                'description' => 'Evidence-based practices, current research, and scientific approaches',
                'color' => '#8B5CF6',
                'icon' => 'beaker',
                'sort_order' => 27,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Technology & Innovation',
                'slug' => 'technology-innovation',
                'description' => 'Digital health tools, telemedicine, and modern technological approaches',
                'color' => '#06B6D4',
                'icon' => 'computer-desktop',
                'sort_order' => 28,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],

            // Specialized Categories
            [
                'name' => 'Accessibility',
                'slug' => 'accessibility',
                'description' => 'Content for people with disabilities and accessibility considerations',
                'color' => '#84CC16',
                'icon' => 'accessibility',
                'sort_order' => 29,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'LGBTQ+ Health',
                'slug' => 'lgbtq-health',
                'description' => 'Inclusive reproductive health for LGBTQ+ individuals and communities',
                'color' => '#EC4899',
                'icon' => 'rainbow',
                'sort_order' => 30,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Rural Health',
                'slug' => 'rural-health',
                'description' => 'Addressing challenges and solutions for rural community health',
                'color' => '#F97316',
                'icon' => 'home',
                'sort_order' => 31,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Digital Health',
                'slug' => 'digital-health',
                'description' => 'Online resources, telemedicine, and digital health applications',
                'color' => '#3B82F6',
                'icon' => 'device-phone-mobile',
                'sort_order' => 32,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'name' => 'Crisis Support',
                'slug' => 'crisis-support',
                'description' => 'Emergency situations, crisis support, and urgent health resources',
                'color' => '#EF4444',
                'icon' => 'phone',
                'sort_order' => 33,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        DB::table('module_categories')->insert($categories);

        // Update existing modules to use the new category system
        $this->updateExistingModules();
    }

    /**
     * Update existing modules to use the new category system
     */
    private function updateExistingModules(): void
    {
        // Map old categories to new category IDs
        $categoryMapping = [
            'Basic Education' => 1,
            'Methods' => 9, // Contraceptive Methods
            'Youth Education' => 3,
            'Pregnancy Planning' => 10,
            'Health & Safety' => 8, // Preventive Care
            'Women\'s Health' => 5,
        ];

        // Update existing modules
        foreach ($categoryMapping as $oldCategory => $newCategoryId) {
            DB::table('modules')
                ->where('category', $oldCategory)
                ->update(['category_id' => $newCategoryId]);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('modules', function (Blueprint $table) {
            $table->dropForeign(['category_id']);
            $table->dropColumn('category_id');
        });
        
        Schema::dropIfExists('module_categories');
    }
};