@echo off
title Stop Shakti Yatra Platform
color 0C

echo =========================================================================
echo       STOPPING ALL SHAKTI YATRA PLATFORM SERVICES
echo =========================================================================
echo.

echo [1/3] Terminating any process on port 8000 (FastAPI Backend)...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 8000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo [2/3] Terminating any process on port 3000 (Next.js Frontend)...
powershell -NoProfile -Command "Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue }"

echo [3/3] Stopping any running Cloudflare Tunnel instances...
taskkill /F /IM cloudflared.exe >nul 2>&1

echo.
echo =========================================================================
echo All Shakti Yatra servers and tunnels have been cleanly stopped.
echo You can restart anytime by double-clicking: START_SHAKTI_YATRA.bat
echo =========================================================================
timeout /t 4
