# Setup MySQL Database for FFPI
# This script will help you migrate from SQLite to MySQL

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "FFPI - MySQL Database Setup" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env file exists
if (-Not (Test-Path ".env")) {
    Write-Host "ERROR: .env file not found!" -ForegroundColor Red
    Write-Host "Please make sure you're running this from the FFPI directory." -ForegroundColor Yellow
    exit 1
}

Write-Host "Step 1: Updating .env file..." -ForegroundColor Yellow

# Read .env file
$envContent = Get-Content ".env" -Raw

# Replace SQLite with MySQL configuration
$envContent = $envContent -replace 'DB_CONNECTION=sqlite', 'DB_CONNECTION=mysql'

# Add MySQL configuration if not present
if ($envContent -notmatch 'DB_HOST=') {
    $envContent += "`nDB_HOST=127.0.0.1"
}
if ($envContent -notmatch 'DB_PORT=') {
    $envContent += "`nDB_PORT=3306"
}
if ($envContent -notmatch 'DB_DATABASE=') {
    $envContent += "`nDB_DATABASE=ffpi"
}
if ($envContent -notmatch 'DB_USERNAME=') {
    $envContent += "`nDB_USERNAME=root"
}
if ($envContent -notmatch 'DB_PASSWORD=') {
    $envContent += "`nDB_PASSWORD="
}

# Write back to .env
Set-Content ".env" $envContent

Write-Host "✓ .env file updated successfully!" -ForegroundColor Green
Write-Host ""

Write-Host "Step 2: Please create the database in XAMPP:" -ForegroundColor Yellow
Write-Host "  1. Open XAMPP Control Panel" -ForegroundColor White
Write-Host "  2. Start MySQL (if not running)" -ForegroundColor White
Write-Host "  3. Click 'Admin' next to MySQL" -ForegroundColor White
Write-Host "  4. Click 'New' to create database" -ForegroundColor White
Write-Host "  5. Enter database name: ffpi" -ForegroundColor White
Write-Host "  6. Click 'Create'" -ForegroundColor White
Write-Host ""

$confirmation = Read-Host "Have you created the 'ffpi' database in phpMyAdmin? (y/n)"

if ($confirmation -ne 'y') {
    Write-Host "Please create the database first, then run this script again." -ForegroundColor Yellow
    exit 0
}

Write-Host ""
Write-Host "Step 3: Clearing Laravel configuration cache..." -ForegroundColor Yellow
php artisan config:clear

Write-Host ""
Write-Host "Step 4: Running migrations..." -ForegroundColor Yellow
php artisan migrate:fresh --seed

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "Setup Complete! 🎉" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your database has been migrated to MySQL!" -ForegroundColor Green
Write-Host "You can view it at: http://localhost/phpmyadmin" -ForegroundColor Cyan
Write-Host ""
Write-Host "Database: ffpi" -ForegroundColor White
Write-Host "Username: root" -ForegroundColor White
Write-Host "Password: (empty)" -ForegroundColor White
Write-Host ""

