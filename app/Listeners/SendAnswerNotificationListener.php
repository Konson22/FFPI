<?php

namespace App\Listeners;

use App\Events\AnswerSubmitted;
use App\Notifications\QuestionAnsweredNotification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendAnswerNotificationListener implements ShouldQueue
{
    use InteractsWithQueue;

    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(AnswerSubmitted $event): void
    {
        try {
            $answer = $event->answer;
            
            // Reload relationships to ensure they're available
            $answer->load(['question.user', 'user']);
            $question = $answer->question;
            
            // Log for debugging
            Log::info('AnswerSubmitted event received', [
                'answer_id' => $answer->id,
                'question_id' => $question->id,
                'question_user_id' => $question->user_id,
                'answer_user_id' => $answer->user_id,
            ]);
            
            // Only send notification if question has an author (not anonymous)
            if (!$question->user) {
                Log::info('Question has no user (anonymous), skipping notification');
                return;
            }
            
            if (!$question->user->email) {
                Log::warning('Question user has no email address', [
                    'user_id' => $question->user->id,
                ]);
                return;
            }
            
            // Don't notify if the answer author is the same as question author
            if ($answer->user_id === $question->user_id) {
                Log::info('Answer author is the same as question author, skipping notification');
                return;
            }
            
            // Send notification
            $question->user->notify(new QuestionAnsweredNotification($answer));
            Log::info('Answer notification sent successfully', [
                'question_user_id' => $question->user->id,
                'question_user_email' => $question->user->email,
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error sending answer notification', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            
            // Re-throw if not using queue, so it can be caught
            if (config('queue.default') === 'sync') {
                throw $e;
            }
        }
    }
}

