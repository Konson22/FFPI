@echo off
echo Clearing Laravel cache...
php artisan route:clear
php artisan config:clear
php artisan cache:clear
php artisan view:clear
php artisan optimize:clear
echo.
echo Cache cleared successfully!
echo.
echo Checking routes...
php artisan route:list --path=user
echo.
pause

