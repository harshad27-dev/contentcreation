@echo off
echo ╔═══════════════════════════════════════════════════════════╗
echo ║                                                           ║
echo ║   🎬 ScriptAI - Starting Development Environment          ║
echo ║                                                           ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    echo Visit: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js found: 
node --version
echo.

REM Check if dependencies are installed
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed
    echo.
)

REM Check if .env file exists
if not exist "Backend\.env" (
    echo ⚙️  Creating Backend .env file...
    copy Backend\.env.example Backend\.env >nul
    echo ⚠️  Please configure Backend\.env with your API keys
    echo.
)

REM Check if .env.local exists
if not exist "frontend\.env.local" (
    echo ⚙️  Creating frontend .env.local file...
    copy frontend\.env.example frontend\.env.local >nul
    echo.
)

REM Start development servers
echo 🚀 Starting development servers...
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop all servers
echo.

call npm run dev

pause
