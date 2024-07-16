@echo off
setlocal

:: Paths to your backend and frontend directories
set BACKEND_DIR=".\backend"
set FRONTEND_DIR=".\frontend"

:: Commands to start your backend and frontend servers
set BACKEND_COMMAND=npm start
set FRONTEND_COMMAND=npm start

:: Open backend in a new Command Prompt window
start cmd /k "cd /d %BACKEND_DIR% && %BACKEND_COMMAND%"

:: Open frontend in a new Command Prompt window
start cmd /k "cd /d %FRONTEND_DIR% && %FRONTEND_COMMAND%"

endlocal