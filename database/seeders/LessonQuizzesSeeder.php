<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LessonQuizzesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $lessons = DB::table('lessons')->select('id', 'title')->get();

        if ($lessons->isEmpty()) {
            $this->command?->warn('No lessons found. Skipping LessonQuizzesSeeder.');
            return;
        }

        $allQuizzes = [];
        $now = Carbon::now();

        foreach ($lessons as $lesson) {
            // Create 20 quizzes per lesson
            $quizzes = $this->getQuizzesForLesson($lesson->title, $lesson->id);

            foreach ($quizzes as $quiz) {
                $allQuizzes[] = [
                    'lesson_id' => $lesson->id,
                    'question' => $quiz['question'],
                    'type' => $quiz['type'],
                    'options' => json_encode($quiz['options']),
                    'explanation' => $quiz['explanation'] ?? null,
                    'points' => $quiz['points'] ?? 1,
                    'created_at' => $now,
                    'updated_at' => $now,
                ];
            }
        }

        if (!empty($allQuizzes)) {
            DB::table('lesson_quizzes')->insert($allQuizzes);
            $this->command?->info('Created ' . count($allQuizzes) . ' quiz questions.');
        }
    }

    /**
     * Get 20 quiz questions for a specific lesson
     */
    private function getQuizzesForLesson(string $lessonTitle, int $lessonId): array
    {
        $quizzes = [];
        $questionTemplates = $this->getQuestionTemplates($lessonTitle);
        
        // Generate 20 unique quizzes
        for ($i = 1; $i <= 20; $i++) {
            $template = $questionTemplates[($i - 1) % count($questionTemplates)];
            $quizzes[] = [
                'question' => str_replace('{num}', $i, $template['question']),
                'type' => $template['type'],
                'options' => $template['options'],
                'explanation' => $template['explanation'],
                'points' => $template['points'],
            ];
        }
        
        return $quizzes;
    }

    /**
     * Get question templates based on lesson title
     */
    private function getQuestionTemplates(string $lessonTitle): array
    {
        $templates = [];
        
        // SRHR-specific templates
        if (stripos($lessonTitle, 'SRHR') !== false || stripos($lessonTitle, 'Sexual and Reproductive') !== false) {
            $templates = array_merge($templates, $this->getSRHRTemplates());
        }
        
        // Family Planning templates
        if (stripos($lessonTitle, 'Family Planning') !== false || stripos($lessonTitle, 'Contraception') !== false) {
            $templates = array_merge($templates, $this->getFamilyPlanningTemplates());
        }
        
        // Relationship templates
        if (stripos($lessonTitle, 'Relationship') !== false || stripos($lessonTitle, 'Communication') !== false) {
            $templates = array_merge($templates, $this->getRelationshipTemplates());
        }
        
        // Add generic templates to reach at least 20
        $templates = array_merge($templates, $this->getGenericTemplates());
        
        return array_slice($templates, 0, 20);
    }

    private function getSRHRTemplates(): array
    {
        return [
            ['question' => 'What does SRHR stand for?', 'type' => 'multiple_choice', 'options' => [['text' => 'Sexual and Reproductive Health and Rights', 'is_correct' => true], ['text' => 'Social and Reproductive Health Resources', 'is_correct' => false], ['text' => 'Sexual and Reproductive Health Resources', 'is_correct' => false], ['text' => 'Social Rights and Health Resources', 'is_correct' => false]], 'explanation' => 'SRHR stands for Sexual and Reproductive Health and Rights.', 'points' => 1],
            ['question' => 'SRHR includes the right to make informed decisions about your body.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'Yes, SRHR includes fundamental rights to make informed decisions.', 'points' => 1],
            ['question' => 'Which are core components of SRHR?', 'type' => 'multiple_select', 'options' => [['text' => 'Access to healthcare', 'is_correct' => true], ['text' => 'Right to privacy', 'is_correct' => true], ['text' => 'Right to information', 'is_correct' => true], ['text' => 'Restricted access', 'is_correct' => false]], 'explanation' => 'SRHR includes access to healthcare, privacy, and information.', 'points' => 2],
        ];
    }

    private function getFamilyPlanningTemplates(): array
    {
        return [
            ['question' => 'What is the primary purpose of family planning?', 'type' => 'multiple_choice', 'options' => [['text' => 'To control the number and spacing of children', 'is_correct' => true], ['text' => 'To prevent all pregnancies', 'is_correct' => false], ['text' => 'To limit family size only', 'is_correct' => false], ['text' => 'To delay marriage', 'is_correct' => false]], 'explanation' => 'Family planning allows control over number and spacing of children.', 'points' => 1],
            ['question' => 'Which methods protect against STIs?', 'type' => 'multiple_select', 'options' => [['text' => 'Male condoms', 'is_correct' => true], ['text' => 'Female condoms', 'is_correct' => true], ['text' => 'Birth control pills', 'is_correct' => false], ['text' => 'IUDs', 'is_correct' => false]], 'explanation' => 'Only condoms protect against STIs.', 'points' => 2],
        ];
    }

    private function getRelationshipTemplates(): array
    {
        return [
            ['question' => 'What are key components of healthy relationships?', 'type' => 'multiple_select', 'options' => [['text' => 'Respect and trust', 'is_correct' => true], ['text' => 'Open communication', 'is_correct' => true], ['text' => 'Equality', 'is_correct' => true], ['text' => 'Control', 'is_correct' => false]], 'explanation' => 'Healthy relationships require respect, trust, communication, and equality.', 'points' => 2],
            ['question' => 'Consent can be withdrawn at any time.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'Yes, consent must be freely given and can be withdrawn.', 'points' => 1],
        ];
    }

    private function getGenericTemplates(): array
    {
        return [
            ['question' => 'What is the main topic covered in this lesson?', 'type' => 'multiple_choice', 'options' => [['text' => 'The lesson covers fundamental concepts and importance', 'is_correct' => true], ['text' => 'The lesson discusses unrelated topics', 'is_correct' => false], ['text' => 'The lesson only provides basic definitions', 'is_correct' => false], ['text' => 'The lesson focuses on advanced topics only', 'is_correct' => false]], 'explanation' => 'This lesson provides comprehensive coverage of the main topic.', 'points' => 1],
            ['question' => 'The information in this lesson is essential for making informed decisions.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson emphasizes the importance of this information.', 'points' => 1],
            ['question' => 'What are key benefits discussed in this lesson?', 'type' => 'multiple_select', 'options' => [['text' => 'Improved health outcomes', 'is_correct' => true], ['text' => 'Better decision-making', 'is_correct' => true], ['text' => 'Increased knowledge', 'is_correct' => true], ['text' => 'No benefits', 'is_correct' => false]], 'explanation' => 'The lesson discusses multiple benefits.', 'points' => 2],
            ['question' => 'This lesson provides practical information that can be applied in daily life.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson includes practical, applicable information.', 'points' => 1],
            ['question' => 'Which statement best describes the lesson content?', 'type' => 'multiple_choice', 'options' => [['text' => 'Comprehensive and well-structured', 'is_correct' => true], ['text' => 'Incomplete and confusing', 'is_correct' => false], ['text' => 'Only theoretical', 'is_correct' => false], ['text' => 'Outdated information', 'is_correct' => false]], 'explanation' => 'The lesson is comprehensive and well-structured.', 'points' => 1],
            ['question' => 'The concepts in this lesson are important for personal development.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'These concepts contribute to personal development.', 'points' => 1],
            ['question' => 'What should you do after learning from this lesson?', 'type' => 'multiple_choice', 'options' => [['text' => 'Apply the knowledge in real-life situations', 'is_correct' => true], ['text' => 'Forget the information', 'is_correct' => false], ['text' => 'Ignore the advice', 'is_correct' => false], ['text' => 'Share misinformation', 'is_correct' => false]], 'explanation' => 'Apply the knowledge gained in real-life situations.', 'points' => 1],
            ['question' => 'This lesson addresses common misconceptions.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson helps clarify common misconceptions.', 'points' => 1],
            ['question' => 'Which resources are mentioned in this lesson?', 'type' => 'multiple_select', 'options' => [['text' => 'Healthcare services', 'is_correct' => true], ['text' => 'Support networks', 'is_correct' => true], ['text' => 'Educational materials', 'is_correct' => true], ['text' => 'No resources', 'is_correct' => false]], 'explanation' => 'The lesson mentions various helpful resources.', 'points' => 2],
            ['question' => 'The lesson emphasizes the importance of seeking professional help when needed.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'Professional help is important when needed.', 'points' => 1],
            ['question' => 'What is the recommended approach discussed in this lesson?', 'type' => 'multiple_choice', 'options' => [['text' => 'Evidence-based and informed approach', 'is_correct' => true], ['text' => 'Random decisions', 'is_correct' => false], ['text' => 'Ignoring facts', 'is_correct' => false], ['text' => 'Following myths', 'is_correct' => false]], 'explanation' => 'The lesson recommends an evidence-based approach.', 'points' => 1],
            ['question' => 'This lesson promotes respect for individual choices.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson emphasizes respecting individual choices.', 'points' => 1],
            ['question' => 'Which values are promoted in this lesson?', 'type' => 'multiple_select', 'options' => [['text' => 'Respect', 'is_correct' => true], ['text' => 'Informed consent', 'is_correct' => true], ['text' => 'Dignity', 'is_correct' => true], ['text' => 'Discrimination', 'is_correct' => false]], 'explanation' => 'The lesson promotes respect, consent, and dignity.', 'points' => 2],
            ['question' => 'The lesson content is based on scientific evidence.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson is based on scientific evidence.', 'points' => 1],
            ['question' => 'What makes this lesson valuable?', 'type' => 'multiple_choice', 'options' => [['text' => 'Accurate information and practical guidance', 'is_correct' => true], ['text' => 'Misleading content', 'is_correct' => false], ['text' => 'Outdated facts', 'is_correct' => false], ['text' => 'No value', 'is_correct' => false]], 'explanation' => 'The lesson provides accurate information and practical guidance.', 'points' => 1],
            ['question' => 'This lesson encourages open communication.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'Open communication is encouraged in the lesson.', 'points' => 1],
            ['question' => 'Which topics are covered in this lesson?', 'type' => 'multiple_select', 'options' => [['text' => 'Core concepts', 'is_correct' => true], ['text' => 'Practical applications', 'is_correct' => true], ['text' => 'Important considerations', 'is_correct' => true], ['text' => 'Irrelevant topics', 'is_correct' => false]], 'explanation' => 'The lesson covers core concepts, applications, and considerations.', 'points' => 2],
            ['question' => 'The lesson provides actionable steps you can take.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson includes actionable steps.', 'points' => 1],
            ['question' => 'What is the overall message of this lesson?', 'type' => 'multiple_choice', 'options' => [['text' => 'Empowerment through knowledge and informed choices', 'is_correct' => true], ['text' => 'Limitation of options', 'is_correct' => false], ['text' => 'Promotion of misinformation', 'is_correct' => false], ['text' => 'No clear message', 'is_correct' => false]], 'explanation' => 'The lesson promotes empowerment through knowledge.', 'points' => 1],
            ['question' => 'This lesson is suitable for all audiences seeking this information.', 'type' => 'true_false', 'options' => [['text' => 'True', 'is_correct' => true], ['text' => 'False', 'is_correct' => false]], 'explanation' => 'The lesson is designed to be accessible to all.', 'points' => 1],
        ];
    }
}
