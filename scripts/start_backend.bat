@echo off
echo ========================================================
echo Starting Shakti Yatra FastAPI Backend
echo Developer: Karan Yadav
echo API Docs: http://localhost:8000/docs
echo ========================================================

cd ..\backend
call venv\Scripts\activate.bat
uvicorn app.main:app --reload --port 8000
