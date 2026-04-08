param(
  [int]$Port = 8085
)

$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if ($listener) {
  $owner = $listener.OwningProcess
  Write-Host "Stopping process $owner on port $Port..."
  Stop-Process -Id $owner -Force
}

Set-Location $projectRoot
Write-Host "Starting backend on port $Port..."
.\gradlew.bat bootRun
