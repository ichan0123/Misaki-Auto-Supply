@echo off
echo ========================================
echo Misaki Auto Supply - Database Setup
echo ========================================
echo.

REM Check if MySQL is accessible
echo Checking MySQL connection...
mysql -u root -e "SELECT 1" 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Cannot connect to MySQL!
    echo.
    echo Please make sure:
    echo 1. XAMPP/WAMP is running
    echo 2. MySQL service is started
    echo 3. MySQL is in your PATH or run this from MySQL bin folder
    echo.
    pause
    exit /b 1
)

echo [OK] MySQL is accessible
echo.

REM Create database and tables
echo Creating database and tables...
mysql -u root < database\setup.sql
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create database!
    pause
    exit /b 1
)

echo [OK] Database created successfully
echo.

REM Create admin user
echo Creating admin user...
node scripts\createAdmin.js
if %errorlevel% neq 0 (
    echo [ERROR] Failed to create admin user!
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Database: misaki_auto_supply
echo Admin Email: admin@misaki.com
echo Admin Password: admin123
echo.
echo You can now start the server with: npm run dev
echo.
pause
