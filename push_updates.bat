@echo off
setlocal
cls
echo ========================================================
echo        🚀 QA PORTFOLIO AUTO-PUSH TOOL
echo ========================================================
echo.

:: 1. Add all changes
echo [1/3] Adding changes to Git...
git add .
if %ERRORLEVEL% neq 0 (
    echo ❌ Error: Failed to add files.
    pause
    exit /b %ERRORLEVEL%
)

:: 2. Ask for Commit Message
echo.
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg="Update QA Portfolio: Senior artifacts and website docs"

echo.
echo [2/3] Committing changes...
git commit -m "%commit_msg%"
if %ERRORLEVEL% neq 0 (
    echo.
    echo ⚠️  Note: No changes to commit or commit failed.
)

:: 3. Push to GitHub
echo.
echo [3/3] Pushing to GitHub (main branch)...
git push origin main
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error: Failed to push to GitHub. Check your connection/credentials.
    pause
    exit /b %ERRORLEVEL%
)

echo.
echo ========================================================
echo        🎉 PORTFOLIO UPDATED SUCCESSFULLY!
echo ========================================================
echo.
pause
