<?php

echo "=====================================\n";
echo "Database Connection Checker\n";
echo "=====================================\n\n";

// Load environment variables
require __DIR__.'/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

echo "Current Database Configuration:\n";
echo "-------------------------------\n";
echo "Connection: " . ($_ENV['DB_CONNECTION'] ?? 'Not set') . "\n";
echo "Host: " . ($_ENV['DB_HOST'] ?? 'Not set') . "\n";
echo "Port: " . ($_ENV['DB_PORT'] ?? 'Not set') . "\n";
echo "Database: " . ($_ENV['DB_DATABASE'] ?? 'Not set') . "\n";
echo "Username: " . ($_ENV['DB_USERNAME'] ?? 'Not set') . "\n\n";

// Try to connect
if (($_ENV['DB_CONNECTION'] ?? '') === 'mysql') {
    echo "Testing MySQL connection...\n";
    try {
        $host = $_ENV['DB_HOST'] ?? '127.0.0.1';
        $port = $_ENV['DB_PORT'] ?? '3306';
        $dbname = $_ENV['DB_DATABASE'] ?? 'ffpi';
        $username = $_ENV['DB_USERNAME'] ?? 'root';
        $password = $_ENV['DB_PASSWORD'] ?? '';
        
        $dsn = "mysql:host=$host;port=$port";
        $pdo = new PDO($dsn, $username, $password);
        echo "✓ MySQL connection successful!\n\n";
        
        // Check if database exists
        $stmt = $pdo->query("SHOW DATABASES LIKE '$dbname'");
        if ($stmt->rowCount() > 0) {
            echo "✓ Database '$dbname' exists!\n\n";
            
            // Check tables
            $pdo->exec("USE $dbname");
            $stmt = $pdo->query("SHOW TABLES");
            $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            if (count($tables) > 0) {
                echo "✓ Found " . count($tables) . " tables:\n";
                foreach ($tables as $table) {
                    echo "  - $table\n";
                }
            } else {
                echo "⚠ Database exists but has no tables.\n";
                echo "   Run: php artisan migrate\n";
            }
        } else {
            echo "✗ Database '$dbname' does NOT exist!\n";
            echo "   Please create it in phpMyAdmin:\n";
            echo "   1. Open http://localhost/phpmyadmin\n";
            echo "   2. Click 'New'\n";
            echo "   3. Enter database name: $dbname\n";
            echo "   4. Click 'Create'\n";
        }
    } catch (PDOException $e) {
        echo "✗ Connection failed: " . $e->getMessage() . "\n";
        echo "\nPossible issues:\n";
        echo "  - MySQL is not running in XAMPP\n";
        echo "  - Wrong credentials in .env file\n";
        echo "  - Port is blocked or incorrect\n";
    }
} else {
    echo "Current connection is: " . ($_ENV['DB_CONNECTION'] ?? 'Not set') . "\n";
    echo "Change DB_CONNECTION to 'mysql' in your .env file\n";
}

echo "\n=====================================\n";

