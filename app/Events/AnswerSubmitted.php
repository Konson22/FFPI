<?php

namespace App\Events;

use App\Models\Answer;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class AnswerSubmitted
{
    use Dispatchable, SerializesModels;

    public $answer;

    /**
     * Create a new event instance.
     */
    public function __construct(Answer $answer)
    {
        $this->answer = $answer;
    }
}

