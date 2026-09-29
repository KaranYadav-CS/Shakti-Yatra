@echo off
title Shakti Yatra - Backend Server
color 0A
cd /d "%~dp0backend"
echo Starting FastAPI Backend on http://127.0.0.1:8000 ...
call .\venv\Scripts\activate.bat
uvicorn app.main:app --host 127.0.0.1 --port 8000
