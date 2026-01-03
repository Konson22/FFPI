<?php

namespace App\Console\Commands;

use App\Models\Answer;
use App\Models\Question;
use App\Models\User;
use Illuminate\Console\Command;
use App\Events\AnswerSubmitted;

class TestAnswerNotification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:answer-notification {question_id?} {answer_id?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test answer notification email';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $questionId = $this->argument('question_id');
        $answerId = $this->argument('answer_id');

        if ($answerId) {
            $answer = Answer::with(['question.user', 'user'])->findOrFail($answerId);
        } elseif ($questionId) {
            $question = Question::with('user')->findOrFail($questionId);
            $answer = Answer::where('question_id', $question->id)->with(['question.user', 'user'])->first();
            if (!$answer) {
                $this->error('No answer found for question ID: ' . $questionId);
                return 1;
            }
        } else {
            // Get the most recent answer
            $answer = Answer::with(['question.user', 'user'])->latest()->first();
            if (!$answer) {
                $this->error('No answers found in database');
                return 1;
            }
        }

        $this->info('Testing notification for:');
        $this->info('Answer ID: ' . $answer->id);
        $this->info('Question ID: ' . $answer->question_id);
        $this->info('Question User: ' . ($answer->question->user ? $answer->question->user->email : 'No user'));
        $this->info('Answer User: ' . $answer->user->email);
        
        if (!$answer->question->user) {
            $this->error('Question has no user (anonymous question)');
            return 1;
        }

        if ($answer->user_id === $answer->question->user_id) {
            $this->warn('Answer author is the same as question author - notification will be skipped');
            return 1;
        }

        // Dispatch the event
        event(new AnswerSubmitted($answer));
        
        $queueConnection = config('queue.default');
        $this->info("\nQueue connection: {$queueConnection}");
        
        if ($queueConnection === 'sync') {
            $this->info('Queue is set to sync - email should be sent immediately');
        } else {
            $this->warn('Queue is set to ' . $queueConnection . ' - make sure queue worker is running!');
            $this->info('Run: php artisan queue:work');
        }

        return 0;
    }
}

