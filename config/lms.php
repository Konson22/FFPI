<?php

return [

    /*
    |--------------------------------------------------------------------------
    | LMS Module Enabled
    |--------------------------------------------------------------------------
    |
    | Enable or disable the entire LMS module. When disabled, LMS routes
    | will not be registered and the module will not initialize.
    |
    */

    'enabled' => env('LMS_ENABLE', false),

    /*
    |--------------------------------------------------------------------------
    | LMS Adapter
    |--------------------------------------------------------------------------
    |
    | Specify which adapter to use for LMS functionality
    | Options: 'mvp' (Laravel backend), 'moodle' (Moodle integration)
    |
    */

    'adapter' => env('LMS_ADAPTER', 'mvp'),

    /*
    |--------------------------------------------------------------------------
    | LMS Features
    |--------------------------------------------------------------------------
    |
    | Enable or disable specific LMS features
    |
    */

    'features' => [
        'offline' => env('LMS_OFFLINE_ENABLED', true),
        'gamification' => env('LMS_GAMIFICATION_ENABLED', true),
        'analytics' => env('LMS_ANALYTICS_ENABLED', true),
    ],

    /*
    |--------------------------------------------------------------------------
    | Moodle Configuration
    |--------------------------------------------------------------------------
    |
    | Configuration for Moodle integration (when adapter is 'moodle')
    |
    */

    'moodle' => [
        'base_url' => env('MOODLE_BASE_URL', ''),
        'token' => env('MOODLE_TOKEN', ''),
    ],

    /*
    |--------------------------------------------------------------------------
    | LMS Media Configuration
    |--------------------------------------------------------------------------
    |
    | Storage and media settings for LMS content
    |
    */

    'media' => [
        'disk' => env('LMS_MEDIA_DISK', 'public'),
        'downloads_path' => env('LMS_DOWNLOADS_PATH', 'lms/downloads'),
    ],

];

