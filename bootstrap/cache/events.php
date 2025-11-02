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
  ),
  'Illuminate\\Foundation\\Support\\Providers\\EventServiceProvider' => 
  array (
    'Illuminate\\Auth\\Events\\Registered' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailListener@handle',
    ),
    'Illuminate\\Auth\\Events\\Verified' => 
    array (
      0 => 'App\\Listeners\\SendWelcomeEmailAfterVerificationListener@handle',
    ),
  ),
);