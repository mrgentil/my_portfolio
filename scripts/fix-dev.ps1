param(
  [string]$Path = (Get-Location).Path,
  [switch]$Start
)

Write-Host "== Fix Next.js dev in $Path ==" -ForegroundColor Cyan

# 1) Stop Node (free ports 3000/3001)
Write-Host "• Arrêt des processus Node..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

Write-Host "• Libération des ports 3000/3001 (si utilisés)..." -ForegroundColor Yellow
$ports = 3000,3001
foreach ($p in $ports) {
  try {
    $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    $pids = $conns | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($pid in $pids) {
      if ($pid) { Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue }
    }
  } catch {}
}

# 2) Unlock and remove .next
$nextPath = Join-Path $Path ".next"
if (Test-Path $nextPath) {
  Write-Host "• Déverrouillage des attributs sur .next..." -ForegroundColor Yellow
  cmd /c "attrib -R -S -H `"$nextPath`" /S /D" | Out-Null

  Write-Host "• Suppression du dossier .next..." -ForegroundColor Yellow
  Remove-Item -Recurse -Force $nextPath -ErrorAction SilentlyContinue

  if (Test-Path $nextPath) {
    Write-Host "• Prise de possession/permissions .next..." -ForegroundColor Yellow
    cmd /c "takeown /F `"$nextPath`" /R /D Y" | Out-Null
    cmd /c "icacls `"$nextPath`" /grant `"$env:USERNAME`":(OI)(CI)F /T" | Out-Null
    Remove-Item -Recurse -Force $nextPath -ErrorAction SilentlyContinue
  }
} else {
  Write-Host "• .next n'existe pas (ok)" -ForegroundColor DarkGray
}

# 3) Restart dev server (optional)
if ($Start) {
  Write-Host "• Lancement du serveur: npm run dev" -ForegroundColor Green
  Push-Location $Path
  try { npm run dev } finally { Pop-Location }
} else {
  Write-Host "• Terminé. Lance: npm run dev" -ForegroundColor Green
}

