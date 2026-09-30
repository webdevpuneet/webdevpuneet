# Adds Windows Defender exclusions for this project's build output so Defender
# doesn't scan thousands of freshly written files during `npm run build` / deploy.
# Only generated folders are excluded — source code and node_modules stay scanned.
#
# Usage (from the project root, any PowerShell window):
#   powershell -ExecutionPolicy Bypass -File scripts\defender-exclusions.ps1
#   powershell -ExecutionPolicy Bypass -File scripts\defender-exclusions.ps1 -Remove
# It re-launches itself as Administrator (UAC prompt) when needed.

param([switch]$Remove)

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole(
  [Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
  $argList = @('-NoProfile', '-ExecutionPolicy', 'Bypass', '-NoExit', '-File', "`"$PSCommandPath`"")
  if ($Remove) { $argList += '-Remove' }
  Start-Process powershell -Verb RunAs -ArgumentList $argList
  exit
}

$root  = Split-Path -Parent $PSScriptRoot
$paths = @('.next', 'out', 'tools', 'tools.zip') | ForEach-Object { Join-Path $root $_ }

if ($Remove) {
  Remove-MpPreference -ExclusionPath $paths
  Write-Host 'Removed Defender exclusions:' -ForegroundColor Yellow
} else {
  Add-MpPreference -ExclusionPath $paths
  Write-Host 'Added Defender exclusions:' -ForegroundColor Green
}
$paths | ForEach-Object { Write-Host "  $_" }

Write-Host "`nAll current exclusion paths:"
(Get-MpPreference).ExclusionPath | ForEach-Object { Write-Host "  $_" }
