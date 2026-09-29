@echo off
title Shakti Yatra - Platform Launcher by Karan Yadav
color 0E

echo =========================================================================
echo       SHAKTI YATRA - SMART PILGRIMAGE ASSISTANCE PLATFORM
echo       First Sanctum: Maa Vindhyavasini Dham, Vindhyachal (UP)
echo       Platform Developed by Karan Yadav
echo =========================================================================
echo.

cd /d "%~dp0"

echo [1/3] Launching FastAPI Backend on http://127.0.0.1:8000 ...
start "Shakti Yatra - Backend (Port 8000)" cmd /k "cd /d %~dp0backend && .\venv\Scripts\activate.bat && uvicorn app.main:app --host 127.0.0.1 --port 8000"

timeout /t 3 /nobreak >nul

echo [2/3] Launching Next.js Production Frontend on http://localhost:3000 ...
start "Shakti Yatra - Frontend (Port 3000)" cmd /k "cd /d %~dp0frontend && npm run start"

timeout /t 3 /nobreak >nul

echo [3/3] Opening Shakti Yatra in your default Web Browser...
start http://localhost:3000

echo.
echo =========================================================================
echo  SUCCESS! Shakti Yatra is now LIVE and running on your system!
echo.
echo  Localhost Website:  http://localhost:3000
echo  History of Maa:     http://localhost:3000/history
echo  Vindhyachal Guide:  http://localhost:3000/destinations/vindhyachal
echo  Backend API Docs:   http://127.0.0.1:8000/docs
echo =========================================================================
echo.
echo Would you like to generate a live public internet link to share on social media?
echo (Press Y to launch Cloudflare Public Tunnel, or any other key to finish)
set /p share="Enter choice [Y/N]: "
if /i "%share%"=="Y" (
    call "%~dp0SHARE_ONLINE_PUBLIC_LINK.bat"
)

echo.
echo Keep the backend and frontend terminal windows open while browsing.
echo To stop the platform at any time, run: STOP_SHAKTI_YATRA.bat
pause
