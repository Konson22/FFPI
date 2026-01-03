<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class LessonsSeeder extends Seeder
{
	/**
	 * Convert HTML content to Markdown format
	 */
	private function htmlToMarkdown($html): string
	{
		// Remove HTML tags and convert to Markdown
		$text = strip_tags($html);
		// Replace multiple newlines with double newlines for paragraphs
		$text = preg_replace('/\n\s*\n\s*\n+/', "\n\n", $text);
		// Trim and clean up
		$text = trim($text);
		return $text;
	}

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
						'content' => '<p>Sexual and Reproductive Health and Rights (SRHR) encompasses the fundamental human rights related to sexuality and reproduction. It includes the right to make informed decisions about your body, relationships, and family planning.</p>
<p>SRHR ensures that everyone has access to information and services related to their bodies, sexuality, and reproduction. This includes access to comprehensive sexual and reproductive health services, the right to make informed decisions about reproduction, freedom from discrimination and violence, and access to accurate information and education.</p>
<p>SRHR is not just about physical health—it\'s about dignity, equality, and the freedom to make choices that affect your life and future.</p>',
					],
					[
						'title' => 'Why SRHR Matters',
						'content' => '<p>SRHR promotes health, equality, and dignity by empowering individuals to make informed choices about their bodies and relationships.</p>
<p>Access to SRHR services improves physical and mental health outcomes for individuals and families. SRHR empowers women and girls to make informed choices, promoting gender equality and social justice. When women can plan their families, they can pursue education and careers, boosting economic growth.</p>
<p>SRHR is essential for individual well-being, gender equality, and sustainable development. It helps reduce maternal and infant mortality, prevents unintended pregnancies, and protects against sexually transmitted infections.</p>',
					],
					[
						'title' => 'Family Planning and Contraception',
						'content' => '<p>Family planning allows individuals and couples to achieve their desired number of children and determine the spacing of pregnancies. It is achieved through use of contraceptive methods and treatment of infertility.</p>
<p>Modern contraceptives include pills, condoms, injectables, implants, and IUDs. Each method works differently to prevent pregnancy. Hormonal methods work by regulating hormones to prevent ovulation and thicken cervical mucus. Barrier methods provide physical protection and offer the added benefit of protection against sexually transmitted infections.</p>
<p>Long-acting reversible contraceptives (LARCs) like IUDs and implants are highly effective and provide protection for several years with minimal user intervention. When choosing a method, consider factors such as effectiveness, side effects, convenience, cost, health conditions, and whether you want future fertility options.</p>',
					],
					[
						'title' => 'Healthy Relationships',
						'content' => '<p>Healthy relationships are based on respect, trust, communication, and equality. They involve mutual support, understanding, and the freedom to express yourself without fear.</p>
<p>Key components of healthy relationships include: open and honest communication, respect for boundaries and personal space, equality and shared decision-making, trust and reliability, support for each other\'s goals and well-being.</p>
<p>Unhealthy relationships may involve control, jealousy, manipulation, or abuse. It\'s important to recognize warning signs and seek help when needed. Healthy relationships contribute to positive mental and physical health outcomes.</p>',
					],
					[
						'title' => 'Reproductive Rights',
						'content' => '<p>Reproductive rights are human rights related to reproduction and reproductive health. They include the right to decide if and when to have children, access to safe and effective contraceptive methods, access to quality reproductive healthcare services, and the right to make decisions about your body without coercion or discrimination.</p>
<p>These rights are grounded in the principles of autonomy, dignity, equality, and non-discrimination. They ensure that everyone can make informed choices about their reproductive lives based on accurate information and quality services.</p>
<p>Reproductive rights are essential for achieving gender equality and empowering individuals to control their own destinies.</p>',
					],
					[
						'title' => 'STI Prevention and Awareness',
						'content' => '<p>Sexually transmitted infections (STIs) are infections that spread through sexual contact. Common STIs include chlamydia, gonorrhea, syphilis, HPV, and HIV.</p>
<p>Prevention methods include: consistent and correct use of condoms, regular STI testing, open communication with partners, vaccination (for HPV and Hepatitis B), and limiting number of sexual partners.</p>
<p>Many STIs have no symptoms, so regular testing is important even if you feel healthy. Early detection and treatment can prevent serious health complications. If you test positive, it\'s important to inform your partners and seek treatment promptly.</p>',
					],
					[
						'title' => 'Menstrual Health',
						'content' => '<p>Menstrual health is a fundamental aspect of reproductive health. Understanding your menstrual cycle helps you make informed decisions about fertility, contraception, and overall health.</p>
<p>Key aspects include: tracking your cycle length and patterns, recognizing normal vs. abnormal bleeding, understanding premenstrual symptoms, maintaining hygiene during menstruation, and knowing when to seek medical attention.</p>
<p>Menstrual health affects your overall well-being. Irregular periods, severe pain, or heavy bleeding may indicate underlying health issues that require medical attention. Access to menstrual products and education is also a matter of reproductive rights.</p>',
					],
					[
						'title' => 'Consent and Sexual Rights',
						'content' => '<p>Consent is a crucial aspect of all sexual and reproductive interactions. It must be informed, voluntary, and can be withdrawn at any time.</p>
<p>Key principles include: clear and enthusiastic agreement, ongoing communication, the right to say no without consequences, respect for boundaries, and understanding that consent cannot be given under coercion or when impaired.</p>
<p>Bodily autonomy means you have the right to make decisions about your own body without interference from others. This includes decisions about contraception, pregnancy, sexual activity, and medical treatment. Respecting consent and bodily autonomy is fundamental to healthy relationships and SRHR.</p>',
					],
					[
						'title' => 'Gender Equality and SRHR',
						'content' => '<p>SRHR and gender equality are deeply interconnected. When individuals have control over their reproductive health, they can pursue education, careers, and personal goals without discrimination.</p>
<p>Key connections include: equal access to health services regardless of gender, elimination of gender-based violence, women\'s economic empowerment through family planning, equal participation in decision-making about reproduction, and challenging harmful gender norms and stereotypes.</p>
<p>Gender equality in SRHR means that all individuals, regardless of their gender identity or sexual orientation, have equal rights to information, services, and the ability to make autonomous decisions about their reproductive lives.</p>',
					],
					[
						'title' => 'Access to SRHR Services',
						'content' => '<p>Access to quality SRHR services is a fundamental right. These services should be available, affordable, acceptable, and of good quality for everyone.</p>
<p>SRHR services include: family planning counseling and methods, sexual health screening and treatment, pregnancy care and services, safe abortion care (where legal), mental health support, and health education.</p>
<p>Barriers to access may include: cost, geographic location, stigma and discrimination, lack of information, cultural or religious restrictions, and provider biases. It\'s important to know your rights and seek support from trusted healthcare providers and advocacy organizations.</p>',
					],
				];

				$now = Carbon::now();
				foreach ($srhrLessons as $lesson) {
					$allLessons[] = [
						'module_id' => $module->id,
						'title' => $lesson['title'],
						'content_markdown' => $this->htmlToMarkdown($lesson['content']),
						'created_at' => $now,
						'updated_at' => $now,
					];
				}
			} elseif ($module->title === 'Family Planning and Contraception') {
				$familyPlanningLessons = [
					[
						'title' => 'Introduction to Family Planning',
						'content' => '<p>Family planning is the practice of controlling the number of children in a family and the intervals between their births. It empowers individuals and couples to make informed decisions about when to have children and how many children to have.</p>
<p>Family planning is essential for: improving maternal and child health, reducing unintended pregnancies, enabling women to pursue education and careers, reducing poverty and improving economic outcomes, and promoting gender equality.</p>
<p>Effective family planning requires access to accurate information, quality contraceptive methods, and supportive healthcare services. It is a fundamental human right that enables individuals to control their reproductive lives.</p>',
					],
					[
						'title' => 'Hormonal Contraceptive Methods',
						'content' => '<p>Hormonal contraceptives work by using synthetic hormones to prevent ovulation and thicken cervical mucus, making it difficult for sperm to reach the egg.</p>
<p>Common hormonal methods include: birth control pills (combined and progestin-only), contraceptive patches, vaginal rings, contraceptive injections, and hormonal implants and IUDs.</p>
<p>Each method has different effectiveness rates, side effects, and requirements. It\'s important to consult with a healthcare provider to find the method that best suits your needs, health status, and lifestyle. Hormonal methods are highly effective when used correctly and consistently.</p>',
					],
					[
						'title' => 'Barrier Methods and Condoms',
						'content' => '<p>Barrier methods prevent pregnancy by physically blocking sperm from reaching the egg. They also provide protection against sexually transmitted infections (STIs).</p>
<p>Types of barrier methods include: male condoms, female condoms, diaphragms, cervical caps, and spermicides. Male and female condoms are the only methods that provide protection against both pregnancy and STIs.</p>
<p>Barrier methods are widely available, have few side effects, and can be used on demand. They require correct and consistent use to be effective. Condoms should be used every time you have sex to maximize protection.</p>',
					],
					[
						'title' => 'Long-Acting Reversible Contraceptives (LARCs)',
						'content' => '<p>Long-acting reversible contraceptives (LARCs) are highly effective methods that provide protection for several years with minimal user intervention.</p>
<p>LARCs include: intrauterine devices (IUDs) - both hormonal and copper, and contraceptive implants. These methods are over 99% effective and can last from 3 to 12 years depending on the type.</p>
<p>Benefits include: high effectiveness, long-lasting protection, no daily or frequent action required, and rapid return to fertility after removal. LARCs are suitable for most people and can be used by those who have or haven\'t had children. A healthcare provider must insert and remove LARCs.</p>',
					],
					[
						'title' => 'Emergency Contraception',
						'content' => '<p>Emergency contraception (EC) can prevent pregnancy after unprotected sex or contraceptive failure. It should be used as soon as possible after the incident, ideally within 72 hours, though some methods work up to 5 days later.</p>
<p>Types of emergency contraception include: emergency contraceptive pills (levonorgestrel or ulipristal acetate), and copper IUD insertion (most effective method).</p>
<p>Emergency contraception is not intended for regular use but is an important backup option. It does not protect against STIs. If you need emergency contraception, seek it as soon as possible from a pharmacy, clinic, or healthcare provider. It is not an abortion method and will not work if you are already pregnant.</p>',
					],
					[
						'title' => 'Natural Family Planning Methods',
						'content' => '<p>Natural family planning (NFP) methods involve tracking fertility signs to identify fertile and infertile days in the menstrual cycle. These methods require education, commitment, and consistent tracking.</p>
<p>Common methods include: calendar/rhythm method, basal body temperature method, cervical mucus method, and symptothermal method (combining multiple signs).</p>
<p>Natural methods have no side effects and can be used for both preventing and achieving pregnancy. However, they require abstinence or barrier methods during fertile periods and have higher failure rates than modern contraceptives. They do not protect against STIs. Proper training and support are essential for effective use.</p>',
					],
					[
						'title' => 'Choosing the Right Contraceptive Method',
						'content' => '<p>Choosing a contraceptive method is a personal decision that should be based on accurate information, your health status, lifestyle, and preferences.</p>
<p>Consider these factors: effectiveness rate, side effects and health considerations, convenience and ease of use, cost and availability, protection against STIs, future fertility plans, and partner involvement.</p>
<p>Consult with a healthcare provider who can help you understand your options, assess your health needs, and provide guidance. Remember that you can change methods if your current one doesn\'t work well for you. The best method is one that you will use consistently and correctly.</p>',
					],
					[
						'title' => 'Family Planning Counseling and Support',
						'content' => '<p>Family planning counseling provides personalized information and support to help individuals and couples make informed decisions about contraception and reproductive health.</p>
<p>Counseling covers: method options and effectiveness, how to use methods correctly, managing side effects, addressing concerns and questions, and follow-up care and support.</p>
<p>Quality counseling is non-judgmental, confidential, and respects individual choices. You can access family planning services at: public health clinics, private healthcare providers, family planning centers, community health centers, and online resources. Don\'t hesitate to ask questions and seek support when making decisions about your reproductive health.</p>',
					],
				];

				$now = Carbon::now();
				foreach ($familyPlanningLessons as $lesson) {
					$allLessons[] = [
						'module_id' => $module->id,
						'title' => $lesson['title'],
						'content_markdown' => $this->htmlToMarkdown($lesson['content']),
						'created_at' => $now,
						'updated_at' => $now,
					];
				}
			} elseif ($module->title === 'Healthy Relationships and Communication') {
				$relationshipsLessons = [
					[
						'title' => 'Foundations of Healthy Relationships',
						'objective' => 'Learn the key components that make relationships healthy, respectful, and fulfilling.',
						'content' => '<p>Healthy relationships are built on a foundation of mutual respect, trust, communication, and equality. They contribute positively to your well-being and personal growth.</p>
<p>Key foundations include: respect for each other\'s individuality and boundaries, trust and honesty, open and effective communication, equality and shared decision-making, support for each other\'s goals and well-being, and the ability to resolve conflicts constructively.</p>
<p>Healthy relationships allow both partners to maintain their independence while building a strong connection. They are characterized by feeling safe, valued, and free to express yourself without fear of judgment or harm.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 1,
						'is_active' => true,
					],
					[
						'title' => 'Effective Communication Skills',
						'objective' => 'Develop skills for clear, honest, and respectful communication in relationships.',
						'content' => '<p>Effective communication is the cornerstone of healthy relationships. It involves both speaking honestly and listening actively to understand your partner\'s perspective.</p>
<p>Key communication skills include: active listening (paying full attention and showing understanding), using "I" statements to express feelings without blame, being clear and direct about your needs and boundaries, asking questions to understand rather than assume, expressing appreciation and positive feedback, and choosing appropriate times and places for important conversations.</p>
<p>Good communication helps prevent misunderstandings, builds trust, and strengthens emotional connection. It requires practice, patience, and a willingness to be vulnerable and honest with your partner.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 2,
						'is_active' => true,
					],
					[
						'title' => 'Understanding and Setting Boundaries',
						'objective' => 'Learn how to establish and respect personal boundaries in relationships.',
						'content' => '<p>Boundaries are the limits and rules we set for ourselves in relationships. They define what we are comfortable with and how we want to be treated by others.</p>
<p>Types of boundaries include: physical boundaries (personal space and touch), emotional boundaries (protecting your feelings and energy), time boundaries (how you spend your time), digital boundaries (social media and communication), and sexual boundaries (consent and preferences).</p>
<p>Setting boundaries is healthy and necessary. Clear boundaries help prevent resentment, maintain respect, and create a safe environment. It\'s important to communicate your boundaries clearly and respect your partner\'s boundaries as well. Boundaries can change over time and should be discussed regularly.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 3,
						'is_active' => true,
					],
					[
						'title' => 'Consent in Relationships',
						'objective' => 'Understand the importance of consent and how to practice it in all aspects of relationships.',
						'content' => '<p>Consent is an ongoing, enthusiastic, and clear agreement to engage in any activity. It is fundamental to healthy relationships and must be present in all interactions, especially sexual ones.</p>
<p>Key principles of consent include: it must be given freely without coercion or pressure, it can be withdrawn at any time, it requires clear communication and understanding, it cannot be given when someone is impaired (by alcohol, drugs, or other factors), and silence or lack of resistance does not mean consent.</p>
<p>Consent is about respect, communication, and ensuring that all parties feel safe and comfortable. It\'s important to check in with your partner regularly, respect their decisions, and never pressure or guilt someone into doing something they don\'t want to do.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 4,
						'is_active' => true,
					],
					[
						'title' => 'Conflict Resolution and Problem-Solving',
						'objective' => 'Learn healthy ways to handle disagreements and resolve conflicts in relationships.',
						'content' => '<p>Conflict is a normal part of relationships. How you handle disagreements can either strengthen or damage your relationship. Healthy conflict resolution focuses on understanding and finding solutions together.</p>
<p>Effective conflict resolution strategies include: staying calm and taking breaks when needed, focusing on the issue rather than attacking the person, listening to understand your partner\'s perspective, expressing your feelings and needs clearly, looking for compromise and win-win solutions, apologizing when you\'re wrong, and forgiving and moving forward.</p>
<p>Avoid unhealthy conflict behaviors like: name-calling, bringing up past issues, stonewalling or shutting down, using threats or ultimatums, and physical or emotional abuse. Healthy relationships work through problems together and come out stronger.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 5,
						'is_active' => true,
					],
					[
						'title' => 'Recognizing Unhealthy Relationship Patterns',
						'objective' => 'Identify warning signs of unhealthy relationships and know when to seek help.',
						'content' => '<p>It\'s important to recognize unhealthy relationship patterns early to protect your well-being and safety. Unhealthy relationships can cause emotional, physical, and psychological harm.</p>
<p>Warning signs include: controlling behavior and isolation from friends/family, jealousy and possessiveness, verbal abuse, insults, or constant criticism, physical violence or threats, manipulation and guilt-tripping, disrespect for boundaries, lack of trust and constant accusations, and feeling afraid, anxious, or walking on eggshells.</p>
<p>If you recognize these patterns, it\'s important to seek support. Talk to trusted friends, family, or professionals. You deserve to be in a relationship where you feel safe, respected, and valued. Remember that abuse is never your fault, and help is available.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 6,
						'is_active' => true,
					],
					[
						'title' => 'Building Trust and Intimacy',
						'objective' => 'Understand how to build and maintain trust and emotional intimacy in relationships.',
						'content' => '<p>Trust and intimacy are essential components of healthy, fulfilling relationships. They develop over time through consistent actions, open communication, and mutual respect.</p>
<p>Building trust involves: keeping your promises and commitments, being honest and transparent, respecting confidentiality and privacy, being reliable and consistent, admitting mistakes and taking responsibility, and showing that you care about your partner\'s well-being.</p>
<p>Emotional intimacy grows through: sharing your thoughts, feelings, and experiences, being vulnerable and authentic, showing empathy and understanding, spending quality time together, supporting each other\'s growth, and creating shared experiences and memories. Trust and intimacy require ongoing effort and cannot be rushed or forced.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 7,
						'is_active' => true,
					],
					[
						'title' => 'Maintaining Independence in Relationships',
						'objective' => 'Learn how to maintain your individuality and personal growth while in a relationship.',
						'content' => '<p>Healthy relationships allow both partners to maintain their independence, pursue personal goals, and continue growing as individuals while building a life together.</p>
<p>Maintaining independence includes: pursuing your own interests and hobbies, maintaining friendships and social connections, having personal goals and aspirations, taking time for yourself, making decisions about your own life, and respecting your partner\'s independence as well.</p>
<p>Independence in relationships strengthens the partnership by bringing new experiences, perspectives, and growth to share with each other. It prevents codependency and ensures that both partners contribute to the relationship from a place of personal fulfillment rather than neediness or dependency.</p>',
						'pdf_url' => null,
						'video_url' => null,
						'order' => 8,
						'is_active' => true,
					],
				];

				$now = Carbon::now();
				foreach ($relationshipsLessons as $lesson) {
					$allLessons[] = [
						'module_id' => $module->id,
						'title' => $lesson['title'],
						'objective' => $lesson['objective'],
						'content' => $lesson['content'],
						'pdf_url' => $lesson['pdf_url'],
						'video_url' => $lesson['video_url'],
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


