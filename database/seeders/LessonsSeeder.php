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
					'content' => 'This lesson introduces the key ideas, scope, and expected outcomes of the module: '.$baseTitle.'.',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 1,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Key Methods & Usage',
					'objective' => 'Identify and compare main approaches related to '.$baseTitle.'.',
					'content' => 'Deep dive into practical methods, decision factors, and real-world usage considerations.',
					'pdf_url' => null,
					'video_url' => null,
					'order' => 2,
					'is_active' => true,
				],
				[
					'title' => $baseTitle.' - Safety, Myths, and FAQs',
					'objective' => 'Address safety, common misconceptions, and frequently asked questions.',
					'content' => 'Review safety guidance, bust common myths, and clarify frequent questions for learners.',
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


