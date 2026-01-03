<?php

namespace App\Mail;

use App\Models\Answer;
use App\Models\User;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Symfony\Component\Mime\Address;

class QuestionAnsweredEmail extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public $answer;
    public $question;
    public $answerUser;
    public $questionUser;
    public $appName;

    /**
     * Create a new message instance.
     */
    public function __construct(Answer $answer, User $questionUser)
    {
        // Ensure relationships are loaded
        if (!$answer->relationLoaded('question')) {
            $answer->load('question');
        }
        if (!$answer->relationLoaded('user')) {
            $answer->load('user');
        }
        if ($answer->question && !$answer->question->relationLoaded('user')) {
            $answer->question->load('user');
        }
        
        $this->answer = $answer;
        $this->question = $answer->question;
        $this->answerUser = $answer->user;
        $this->questionUser = $questionUser;
        $this->appName = config('app.name', 'Future of Family Planning Initiative');
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            to: [new Address($this->questionUser->email, $this->questionUser->name ?? '')],
            subject: 'Your question has been answered - ' . $this->appName,
            replyTo: [new Address(config('mail.from.address'), config('mail.from.name'))],
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.question-answered',
            with: [
                'answer' => $this->answer,
                'question' => $this->question,
                'answerUser' => $this->answerUser,
                'questionUser' => $this->questionUser,
                'appName' => $this->appName,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}

