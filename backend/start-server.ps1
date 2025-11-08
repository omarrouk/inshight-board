Push-Location C:\Users\OMEN\Desktop\inshight-board\backend
$env:NODE_ENV = "development"
Write-Host "Starting InsightBoard Backend Server..." -ForegroundColor Green
node server.js
Pop-Location
