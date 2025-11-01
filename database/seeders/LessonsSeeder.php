<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LessonsSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 */
	public function run(): void
	{
		$modules = DB::table('modules')->select('id', 'title')->get();

		if ($modules->isEmpty()) {
			$this->command?->warn('No modules found. Skipping LessonsSeeder.');
			return;
		}

		$allLessons = [];

		foreach ($modules as $module) {
			$baseTitle = $module->title;
			$lessonsForModule = [
				[
					'title' => $baseTitle.' - Overview',
					'objective' => 'Understand the core concepts of '.$baseTitle.'.',
					'content' => '<p>This comprehensive lesson introduces you to the fundamental concepts, scope, and expected outcomes related to '.$baseTitle.'.</p>
<p>Family planning is a crucial aspect of reproductive health that empowers individuals and couples to make informed decisions about when and how many children to have.</p>
<p>Throughout this module, you will gain essential knowledge about various contraceptive methods, their mechanisms, effectiveness rates, and suitability for different individuals.</p>
<p>Understanding these concepts is vital for making responsible choices that align with your personal circumstances, health status, and life goals.</p>
<p>This lesson will cover the basic principles of reproductive health, the importance of family planning, and how it contributes to overall well-being and quality of life.</p>
<p>We will explore the social, economic, and health benefits of effective family planning, including improved maternal and child health outcomes.</p>
<p>By the end of this overview, you will have a solid foundation to build upon as we delve deeper into specific methods and practices in subsequent lessons.</p>
<p>Remember, making informed decisions about family planning requires understanding your options and consulting with qualified healthcare professionals who can provide personalized guidance.</p>
<p>This educational content aims to provide you with accurate, evidence-based information to support your decision-making process.</p>
<p>Let\'s begin this journey towards better reproductive health awareness and empowered family planning choices.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 1,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Key Methods & Usage',
					'objective' => 'Identify and compare main approaches related to '.$baseTitle.'.',
					'content' => '<p>This lesson provides a comprehensive deep dive into practical methods, decision factors, and real-world usage considerations for '.$baseTitle.'.</p>
<p>There are various family planning methods available, each with unique characteristics, effectiveness rates, and suitability for different individuals and life circumstances.</p>
<p>Hormonal methods include birth control pills, patches, injections, and implants, which work by regulating hormones to prevent ovulation and thicken cervical mucus.</p>
<p>Barrier methods such as condoms, diaphragms, and cervical caps provide physical protection and offer the added benefit of protection against sexually transmitted infections.</p>
<p>Long-acting reversible contraceptives (LARCs) like IUDs and implants are highly effective and provide protection for several years with minimal user intervention.</p>
<p>Natural family planning methods involve tracking fertility cycles, but require careful monitoring and may have higher failure rates compared to other methods.</p>
<p>Permanent methods like tubal ligation and vasectomy offer long-term solutions but should be considered carefully as they are typically irreversible.</p>
<p>When choosing a method, consider factors such as effectiveness, side effects, convenience, cost, health conditions, and whether you want future fertility options.</p>
<p>It is essential to consult with healthcare providers who can assess your medical history, discuss potential side effects, and help you select the most appropriate method.</p>
<p>Regular follow-ups and adherence to usage instructions are crucial for maximizing effectiveness and managing any potential side effects that may arise.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 2,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Safety, Myths, and FAQs',
					'objective' => 'Address safety, common misconceptions, and frequently asked questions.',
					'content' => '<p>This lesson reviews essential safety guidance, addresses common myths and misconceptions, and clarifies frequently asked questions about '.$baseTitle.'.</p>
<p>Safety is paramount when it comes to family planning methods, and understanding potential side effects, contraindications, and proper usage is crucial for your well-being.</p>
<p>Common myths include misconceptions that birth control causes infertility, makes you gain significant weight, or increases your risk of certain cancers without considering protective benefits.</p>
<p>It is important to know that most modern contraceptive methods are safe for the majority of users when used correctly and under proper medical supervision.</p>
<p>Side effects vary by method and individual, and may include changes in menstrual patterns, mood fluctuations, or temporary physical discomfort, which often subside with time.</p>
<p>Certain medical conditions, medications, or lifestyle factors may influence which methods are safe and appropriate for you, highlighting the importance of medical consultation.</p>
<p>Frequently asked questions often concern effectiveness rates, how quickly methods take effect, what to do if you miss a dose, and when to seek medical attention.</p>
<p>Emergency contraception is available for unplanned situations, but should not be relied upon as a regular method of family planning.</p>
<p>Understanding the difference between user-dependent and provider-administered methods helps set realistic expectations about adherence requirements and effectiveness.</p>
<p>Remember that reliable information from credible sources and healthcare providers is essential for making safe, informed decisions about your reproductive health.</p>',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 3,
					'is_active' => true,
				],
			];

			$now = Carbon::now();
			foreach ($lessonsForModule as $lesson) {
				$allLessons[] = [
					'module_id' => $module->id,
					'title' => $lesson['title'],
					'objective' => $lesson['objective'],
					'content' => $lesson['content'],
					'pdf_url' => $lesson['pdf_url'],
					'video_url' => $lesson['video_url'],
					'order' => $lesson['order'],
					'is_active' => $lesson['is_active'],
					'created_at' => $now,
					'updated_at' => $now,
				];
			}
		}

		if (!empty($allLessons)) {
			DB::table('lessons')->insert($allLessons);
		}
	}
}


