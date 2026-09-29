@echo off
echo ========================================================
echo Seeding Shakti Yatra Database with Verified Records
echo ========================================================

cd ..\backend
call venv\Scripts\activate.bat
python app\seed\runner.py
pause
