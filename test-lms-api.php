<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

echo "=====================================\n";
echo "LMS API Test\n";
echo "=====================================\n\n";

// Test database connection
try {
    $modules = DB::table('modules')->count();
    echo "✓ Database connected\n";
    echo "  Modules in database: $modules\n\n";
    
    $lessons = DB::table('lessons')->count();
    echo "  Lessons in database: $lessons\n\n";
    
    // Check module columns
    echo "Module columns:\n";
    $moduleColumns = Schema::getColumnListing('modules');
    foreach (['id', 'title', 'published', 'slug', 'summary', 'featured'] as $col) {
        $exists = in_array($col, $moduleColumns) ? '✓' : '✗';
        echo "  $exists $col\n";
    }
    echo "\n";
    
    // Check lesson columns
    echo "Lesson columns:\n";
    $lessonColumns = Schema::getColumnListing('lessons');
    foreach (['id', 'title', 'module_id', 'published', 'slug'] as $col) {
        $exists = in_array($lessonColumns, $lessonColumns) ? '✓' : '✗';
        echo "  $exists $col\n";
    }
    echo "\n";
    
    // Sample module
    if ($modules > 0) {
        $module = DB::table('modules')->first();
        echo "Sample module:\n";
        echo "  ID: {$module->id}\n";
        echo "  Title: {$module->title}\n";
        echo "  Published: " . (isset($module->published) ? ($module->published ? 'Yes' : 'No') : 'N/A') . "\n";
        echo "\n";
    }
    
} catch (\Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
}

echo "=====================================\n";

