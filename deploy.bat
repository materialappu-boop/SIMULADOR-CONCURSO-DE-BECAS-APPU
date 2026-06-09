@echo off
echo ==============================================
echo   APPU DEPLOYMENT SYSTEM - AUTO SYNCHRONIZER
echo ==============================================
echo.

echo [1/3] Compilando TypeScript (TSX -> JSX)...
call npx tsc --module esnext --jsx preserve
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Fallo en la compilacion de TypeScript.
    exit /b %ERRORLEVEL%
)
echo [OK] Compilacion exitosa.
echo.

echo [2/3] Transpilando a HTML compatible (JSX -> HTML)...
python transpile.py
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Fallo en la transpilacion.
    exit /b %ERRORLEVEL%
)
echo [OK] Transpilacion exitosa (simulador_de_examen_appu.html e index.html generados).
echo.

echo [3/3] Sincronizando con GitHub...
git add .
git commit -m "Auto-deploy: Actualizacion y sincronizacion automatica del simulador"
git push origin main
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Fallo al subir los cambios a GitHub.
    exit /b %ERRORLEVEL%
)
echo [OK] Repositorio de GitHub actualizado.
echo.
echo ==============================================
echo   ¡DESPLIEGUE Y SINCRONIZACION COMPLETADOS!
echo ==============================================
