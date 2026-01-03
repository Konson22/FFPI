<?php

namespace App\Notifications;

use App\Mail\QuestionAnsweredEmail;
use App\Models\Answer;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class QuestionAnsweredNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $answer;

    /**
     * Create a new notification instance.
     */
    public function __construct(Answer $answer)
    {
        $this->answer = $answer;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable)
    {
        return new QuestionAnsweredEmail($this->answer, $notifiable);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Your question has been answered',
            'question_id' => $this->answer->question_id,
            'answer_id' => $this->answer->id,
        ];
    }
}

