@echo off
title Shakti Yatra - Public Social Media Sharing Tunnel
color 0B

echo =========================================================================
echo       SHAKTI YATRA - PUBLIC SOCIAL MEDIA SHARING LINK GENERATOR
echo       Developed by Karan Yadav
echo =========================================================================
echo.
echo Connecting Shakti Yatra to the global Cloudflare Edge Network...
echo This will generate a public HTTPS URL accessible to anyone on mobile or PC.
echo.

cd /d "%~dp0"

if not exist "%~dp0cloudflared.exe" (
    echo Downloading cloudflared.exe...
    curl.exe -s -L -o "%~dp0cloudflared.exe" https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe
)

echo.
echo Starting Cloudflare Public Tunnel for http://localhost:3000 ...
echo Look below for your public URL (e.g. https://xxxx.trycloudflare.com)
echo Copy and share that URL on WhatsApp, Instagram, Facebook, LinkedIn, Twitter!
echo.
echo =========================================================================
echo Press Ctrl+C in this window whenever you wish to stop sharing online.
echo =========================================================================
echo.

"%~dp0cloudflared.exe" tunnel --url http://localhost:3000
