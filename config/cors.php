<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'auth/google/url', 'auth/google/exchange', 'auth/google/callback', 'mobile/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => ['*'],

    'allowed_origins_patterns' => [
        '*', // Allow all origins for mobile apps
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

    /*
    |--------------------------------------------------------------------------
    | Development CORS Settings
    |--------------------------------------------------------------------------
    |
    | For development environments, you might want to be more permissive
    | with CORS settings. Uncomment the following lines for development.
    |
    */
    
    // Uncomment for development - allows all origins
    // 'allowed_origins' => ['*'],
    // 'allowed_origins_patterns' => ['*'],

];
