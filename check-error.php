<?php

echo "=====================================\n";
echo "Latest Laravel Error\n";
echo "=====================================\n\n";

$logFile = __DIR__ . '/storage/logs/laravel.log';

if (!file_exists($logFile)) {
    echo "No log file found at: $logFile\n";
    exit;
}

// Get last 100 lines of log
$lines = file($logFile);
$lastLines = array_slice($lines, -100);

echo implode('', $lastLines);
echo "\n=====================================\n";

