param(
  [int]$Port = 8085
)

$listener = Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue
if (-not $listener) {
  Write-Host "No listener found on port $Port"
  exit 0
}

$owner = $listener.OwningProcess
Write-Host "Stopping process $owner on port $Port..."
Stop-Process -Id $owner -Force
Write-Host "Stopped."
