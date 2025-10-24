<?php

echo "=====================================\n";
echo "LMS Configuration Checker\n";
echo "=====================================\n\n";

// Load environment
require __DIR__.'/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "Environment Variables:\n";
echo "---------------------\n";
echo "LMS_ENABLE: " . ($_ENV['LMS_ENABLE'] ?? 'NOT SET') . "\n";
echo "LMS_ADAPTER: " . ($_ENV['LMS_ADAPTER'] ?? 'NOT SET') . "\n";
echo "VITE_LMS_ENABLE: " . ($_ENV['VITE_LMS_ENABLE'] ?? 'NOT SET') . "\n";
echo "VITE_LMS_ADAPTER: " . ($_ENV['VITE_LMS_ADAPTER'] ?? 'NOT SET') . "\n\n";

// Load Laravel config
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "Laravel Config:\n";
echo "---------------------\n";
echo "config('lms.enabled'): " . (config('lms.enabled') ? 'TRUE' : 'FALSE') . "\n";
echo "config('lms.adapter'): " . config('lms.adapter') . "\n\n";

if (!config('lms.enabled')) {
    echo "⚠️  LMS is DISABLED!\n\n";
    echo "To enable LMS:\n";
    echo "1. Add to .env file:\n";
    echo "   LMS_ENABLE=true\n";
    echo "   VITE_LMS_ENABLE=true\n\n";
    echo "2. Clear config cache:\n";
    echo "   php artisan config:clear\n\n";
    echo "3. Restart servers\n";
} else {
    echo "✓ LMS is ENABLED!\n";
    echo "API routes should be available at /api/lms/*\n";
}

echo "\n=====================================\n";

