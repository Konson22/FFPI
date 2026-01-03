<?php return array (
  'App\\Providers\\EventServiceProvider' => 
  array (
    'Illuminate\\Auth\\Events\\Registered' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailListener',
    ),
    'Illuminate\\Auth\\Events\\Verified' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailAfterVerificationListener',
    ),
    'App\\Events\\AnswerSubmitted' => 
    array (
      0 => 'App\\Listeners\\SendAnswerNotificationListener',
    ),
  ),
  'Illuminate\\Foundation\\Support\\Providers\\EventServiceProvider' => 
  array (
    'App\\Events\\AnswerSubmitted' => 
    array (
      0 => 'App\\Listeners\\SendAnswerNotificationListener@handle',
    ),
    'Illuminate\\Auth\\Events\\Verified' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailAfterVerificationListener@handle',
    ),
    'Illuminate\\Auth\\Events\\Registered' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailListener@handle',
    ),
  ),
);