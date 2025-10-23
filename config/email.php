<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Email Configuration
    |--------------------------------------------------------------------------
    |
    | This file contains the email configuration for the application.
    | You can customize the email settings here.
    |
    */

    'from' => [
        'address' => env('MAIL_FROM_ADDRESS', 'noreply@familyplanning.com'),
        'name' => env('MAIL_FROM_NAME', 'Family Planning Platform'),
    ],

    'reply_to' => [
        'address' => env('MAIL_REPLY_TO_ADDRESS', 'support@familyplanning.com'),
        'name' => env('MAIL_REPLY_TO_NAME', 'Family Planning Support Team'),
    ],

    'templates' => [
        'welcome' => 'emails.welcome',
        'user_registered' => 'emails.user-registered',
        'email_verification' => 'emails.verify-email',
        'password_reset' => 'emails.password-reset',
    ],

    'queue' => [
        'enabled' => env('MAIL_QUEUE_ENABLED', true),
        'connection' => env('MAIL_QUEUE_CONNECTION', 'default'),
    ],
];
