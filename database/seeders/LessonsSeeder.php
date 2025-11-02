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
			// SRHR Topics as Lessons
			if ($module->title === 'SRHR') {
				$srhrLessons = [
					[
						'title' => 'Understanding SRHR',
						'objective' => 'Learn what Sexual and Reproductive Health and Rights (SRHR) means and why it matters.',
						'content' => '<p>Sexual and Reproductive Health and Rights (SRHR) encompasses the fundamental human rights related to sexuality and reproduction. It includes the right to make informed decisions about your body, relationships, and family planning.</p>
<p>SRHR ensures that everyone has access to information and services related to their bodies, sexuality, and reproduction. This includes access to comprehensive sexual and reproductive health services, the right to make informed decisions about reproduction, freedom from discrimination and violence, and access to accurate information and education.</p>
<p>SRHR is not just about physical health—it\'s about dignity, equality, and the freedom to make choices that affect your life and future.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 1,
						'is_active' => true,
					],
					[
						'title' => 'Why SRHR Matters',
						'objective' => 'Understand the importance of SRHR for individual well-being, gender equality, and sustainable development.',
						'content' => '<p>SRHR promotes health, equality, and dignity by empowering individuals to make informed choices about their bodies and relationships.</p>
<p>Access to SRHR services improves physical and mental health outcomes for individuals and families. SRHR empowers women and girls to make informed choices, promoting gender equality and social justice. When women can plan their families, they can pursue education and careers, boosting economic growth.</p>
<p>SRHR is essential for individual well-being, gender equality, and sustainable development. It helps reduce maternal and infant mortality, prevents unintended pregnancies, and protects against sexually transmitted infections.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 2,
						'is_active' => true,
					],
					[
						'title' => 'Family Planning and Contraception',
						'objective' => 'Understand different methods of contraception, how they work, and their benefits.',
						'content' => '<p>Family planning allows individuals and couples to achieve their desired number of children and determine the spacing of pregnancies. It is achieved through use of contraceptive methods and treatment of infertility.</p>
<p>Modern contraceptives include pills, condoms, injectables, implants, and IUDs. Each method works differently to prevent pregnancy. Hormonal methods work by regulating hormones to prevent ovulation and thicken cervical mucus. Barrier methods provide physical protection and offer the added benefit of protection against sexually transmitted infections.</p>
<p>Long-acting reversible contraceptives (LARCs) like IUDs and implants are highly effective and provide protection for several years with minimal user intervention. When choosing a method, consider factors such as effectiveness, side effects, convenience, cost, health conditions, and whether you want future fertility options.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 3,
						'is_active' => true,
					],
					[
						'title' => 'Healthy Relationships',
						'objective' => 'Explore how to build and maintain healthy, respectful, and supportive relationships.',
						'content' => '<p>Healthy relationships are based on respect, trust, communication, and equality. They involve mutual support, understanding, and the freedom to express yourself without fear.</p>
<p>Key components of healthy relationships include: open and honest communication, respect for boundaries and personal space, equality and shared decision-making, trust and reliability, support for each other\'s goals and well-being.</p>
<p>Unhealthy relationships may involve control, jealousy, manipulation, or abuse. It\'s important to recognize warning signs and seek help when needed. Healthy relationships contribute to positive mental and physical health outcomes.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 4,
						'is_active' => true,
					],
					[
						'title' => 'Reproductive Rights',
						'objective' => 'Learn about fundamental reproductive rights and how they protect individual autonomy.',
						'content' => '<p>Reproductive rights are human rights related to reproduction and reproductive health. They include the right to decide if and when to have children, access to safe and effective contraceptive methods, access to quality reproductive healthcare services, and the right to make decisions about your body without coercion or discrimination.</p>
<p>These rights are grounded in the principles of autonomy, dignity, equality, and non-discrimination. They ensure that everyone can make informed choices about their reproductive lives based on accurate information and quality services.</p>
<p>Reproductive rights are essential for achieving gender equality and empowering individuals to control their own destinies.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 5,
						'is_active' => true,
					],
					[
						'title' => 'STI Prevention and Awareness',
						'objective' => 'Understand sexually transmitted infections, how to prevent them, and the importance of regular testing.',
						'content' => '<p>Sexually transmitted infections (STIs) are infections that spread through sexual contact. Common STIs include chlamydia, gonorrhea, syphilis, HPV, and HIV.</p>
<p>Prevention methods include: consistent and correct use of condoms, regular STI testing, open communication with partners, vaccination (for HPV and Hepatitis B), and limiting number of sexual partners.</p>
<p>Many STIs have no symptoms, so regular testing is important even if you feel healthy. Early detection and treatment can prevent serious health complications. If you test positive, it\'s important to inform your partners and seek treatment promptly.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 6,
						'is_active' => true,
					],
					[
						'title' => 'Menstrual Health',
						'objective' => 'Learn about menstrual cycles, tracking your period, and maintaining menstrual health.',
						'content' => '<p>Menstrual health is a fundamental aspect of reproductive health. Understanding your menstrual cycle helps you make informed decisions about fertility, contraception, and overall health.</p>
<p>Key aspects include: tracking your cycle length and patterns, recognizing normal vs. abnormal bleeding, understanding premenstrual symptoms, maintaining hygiene during menstruation, and knowing when to seek medical attention.</p>
<p>Menstrual health affects your overall well-being. Irregular periods, severe pain, or heavy bleeding may indicate underlying health issues that require medical attention. Access to menstrual products and education is also a matter of reproductive rights.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 7,
						'is_active' => true,
					],
					[
						'title' => 'Consent and Sexual Rights',
						'objective' => 'Understand the importance of consent, bodily autonomy, and sexual rights.',
						'content' => '<p>Consent is a crucial aspect of all sexual and reproductive interactions. It must be informed, voluntary, and can be withdrawn at any time.</p>
<p>Key principles include: clear and enthusiastic agreement, ongoing communication, the right to say no without consequences, respect for boundaries, and understanding that consent cannot be given under coercion or when impaired.</p>
<p>Bodily autonomy means you have the right to make decisions about your own body without interference from others. This includes decisions about contraception, pregnancy, sexual activity, and medical treatment. Respecting consent and bodily autonomy is fundamental to healthy relationships and SRHR.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 8,
						'is_active' => true,
					],
					[
						'title' => 'Gender Equality and SRHR',
						'objective' => 'Explore how SRHR contributes to gender equality and social justice.',
						'content' => '<p>SRHR and gender equality are deeply interconnected. When individuals have control over their reproductive health, they can pursue education, careers, and personal goals without discrimination.</p>
<p>Key connections include: equal access to health services regardless of gender, elimination of gender-based violence, women\'s economic empowerment through family planning, equal participation in decision-making about reproduction, and challenging harmful gender norms and stereotypes.</p>
<p>Gender equality in SRHR means that all individuals, regardless of their gender identity or sexual orientation, have equal rights to information, services, and the ability to make autonomous decisions about their reproductive lives.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 9,
						'is_active' => true,
					],
					[
						'title' => 'Access to SRHR Services',
						'objective' => 'Learn about accessing comprehensive SRHR services and overcoming barriers.',
						'content' => '<p>Access to quality SRHR services is a fundamental right. These services should be available, affordable, acceptable, and of good quality for everyone.</p>
<p>SRHR services include: family planning counseling and methods, sexual health screening and treatment, pregnancy care and services, safe abortion care (where legal), mental health support, and health education.</p>
<p>Barriers to access may include: cost, geographic location, stigma and discrimination, lack of information, cultural or religious restrictions, and provider biases. It\'s important to know your rights and seek support from trusted healthcare providers and advocacy organizations.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 10,
						'is_active' => true,
					],
				];

				$now = Carbon::now();
				foreach ($srhrLessons as $lesson) {
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
			} else {
				// Fallback for other modules (if any exist in future)
				$baseTitle = $module->title;
				$lessonsForModule = [
					[
						'title' => $baseTitle.' - Overview',
						'objective' => 'Understand the core concepts of '.$baseTitle.'.',
						'content' => '<p>This comprehensive lesson introduces you to the fundamental concepts, scope, and expected outcomes related to '.$baseTitle.'.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 1,
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
		}

		if (!empty($allLessons)) {
			DB::table('lessons')->insert($allLessons);
		}
	}
}


