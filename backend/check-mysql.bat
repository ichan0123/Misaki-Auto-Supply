@echo off
echo ========================================
echo MySQL Connection Test
echo ========================================
echo.

REM Try to connect to MySQL
echo Testing MySQL connection...
mysql -u root -e "SELECT VERSION();" 2>nul

if %errorlevel% equ 0 (
    echo.
    echo [SUCCESS] MySQL is running and accessible!
    echo.
    echo You can now run: setup-database.bat
) else (
    echo.
    echo [ERROR] Cannot connect to MySQL!
    echo.
    echo Troubleshooting:
    echo.
    echo 1. Is XAMPP/WAMP running?
    echo    - Open XAMPP Control Panel
    echo    - Click Start on MySQL
    echo.
    echo 2. Is MySQL in your PATH?
    echo    - Try running from: C:\xampp\mysql\bin
    echo    - Or add to PATH: C:\xampp\mysql\bin
    echo.
    echo 3. Check MySQL port (default 3306)
    echo    - Make sure no other service is using it
    echo.
)

echo.
pause
