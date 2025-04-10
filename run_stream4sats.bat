@echo off

REM === Iniciar stream4sats (Windows) ===
echo Iniciando stream4sats...

REM Guardar ruta base del script
set BASEDIR=%~dp0

REM === Backend ===
cd /d "%BASEDIR%backend"
echo Instalando dependencias del backend...
call npm install

echo Ejecutando backend...
start "Backend" cmd /k "cd /d %BASEDIR%backend && node index.js"

REM Esperar unos segundos para que el backend levante
ping 127.0.0.1 -n 4 > nul

REM === Frontend ===
cd /d "%BASEDIR%frontend"
echo Instalando dependencias del frontend...
call npm install

echo Ejecutando frontend...
start "Frontend" cmd /k "cd /d %BASEDIR%frontend && npm start"

echo ✅ Proyecto lanzado correctamente.
pause
