@echo off
echo =====================================
echo FFPI - MySQL Database Setup
echo =====================================
echo.

echo Step 1: Please update your .env file manually:
echo.
echo Open FFPI\.env in Notepad and change:
echo   FROM: DB_CONNECTION=sqlite
echo   TO:   DB_CONNECTION=mysql
echo.
echo And add these lines if not present:
echo   DB_HOST=127.0.0.1
echo   DB_PORT=3306
echo   DB_DATABASE=ffpi
echo   DB_USERNAME=root
echo   DB_PASSWORD=
echo.
pause

echo.
echo Step 2: Create Database in XAMPP
echo.
echo 1. Open XAMPP Control Panel
echo 2. Start MySQL (if not running)
echo 3. Click Admin next to MySQL
echo 4. Click New to create database
echo 5. Enter database name: ffpi
echo 6. Click Create
echo.
pause

echo.
echo Step 3: Running Laravel migrations...
echo.

php artisan config:clear
php artisan migrate:fresh --seed

echo.
echo =====================================
echo Setup Complete! 🎉
echo =====================================
echo.
echo Your database is now in MySQL!
echo View it at: http://localhost/phpmyadmin
echo.
pause

