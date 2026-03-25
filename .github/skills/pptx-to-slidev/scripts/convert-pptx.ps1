<#
.SYNOPSIS
    Orchestrate PPTX-to-Slidev conversion by extracting PowerPoint content.

.DESCRIPTION
    Runs the extract_pptx.py script against a PowerPoint file and stages the
    output for Slidev conversion. Validates prerequisites, extracts content,
    copies images, and reports the results.

    After running this script the agent should read the extracted JSON files
    and generate slides.md and style.css following the SKILL.md instructions.

.PARAMETER SourcePptx
    Absolute path to the source .pptx file.

.PARAMETER OutputName
    Kebab-case name for the presentation folder (e.g., "my-talk").
    The folder will be created under presentations/.

.PARAMETER RepoRoot
    Root directory of the repository. Defaults to the current directory.

.PARAMETER SkipCleanup
    If set, keeps the _extracted/ temporary directory after conversion.

.EXAMPLE
    .\convert-pptx.ps1 -SourcePptx "C:\Decks\keynote.pptx" -OutputName "keynote-2025"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$SourcePptx,

    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$OutputName,

    [Parameter()]
    [string]$RepoRoot = '.',

    [Parameter()]
    [switch]$SkipCleanup
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Resolve paths
$RepoRoot = Resolve-Path $RepoRoot
$skillScriptsDir = $PSScriptRoot
$extractScript = Join-Path $skillScriptsDir 'extract_pptx.py'
$requirementsFile = Join-Path $skillScriptsDir 'requirements.txt'
$presentationsDir = Join-Path $RepoRoot 'presentations' $OutputName
$extractedDir = Join-Path $presentationsDir '_extracted'
$imagesDir = Join-Path $presentationsDir 'images'

# -- Validate prerequisites --
Write-Host '=== PPTX to Slidev Conversion ===' -ForegroundColor Cyan
Write-Host ''

# Check source file
if (-not (Test-Path $SourcePptx)) {
    Write-Error "Source PPTX not found: $SourcePptx"
    return
}
Write-Host "[OK] Source: $SourcePptx" -ForegroundColor Green

# Check extraction script
if (-not (Test-Path $extractScript)) {
    Write-Error "Extraction script not found: $extractScript"
    return
}
Write-Host "[OK] Extraction script: $extractScript" -ForegroundColor Green

# Check Python
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) {
    Write-Error 'Python is not installed or not on PATH. Install Python 3.9+ and python-pptx.'
    return
}
Write-Host "[OK] Python: $($python.Source)" -ForegroundColor Green

# Check python-pptx
$pptxCheck = python -c 'import pptx; print(pptx.__version__)' 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host 'python-pptx not found. Installing from requirements.txt...' -ForegroundColor Yellow
    python -m pip install -r $requirementsFile
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Failed to install Python dependencies from: $requirementsFile"
        return
    }
    $pptxCheck = python -c 'import pptx; print(pptx.__version__)' 2>&1
}
Write-Host "[OK] python-pptx: $pptxCheck" -ForegroundColor Green

# -- Create output directories --
Write-Host ''
Write-Host 'Creating output directories...' -ForegroundColor Yellow

New-Item -ItemType Directory -Path $presentationsDir -Force | Out-Null
New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null

# -- Run extraction --
Write-Host ''
Write-Host 'Extracting PPTX content...' -ForegroundColor Yellow

python $extractScript $SourcePptx $extractedDir
if ($LASTEXITCODE -ne 0) {
    Write-Error 'Extraction failed. Check the output above for details.'
    return
}

# -- Copy images --
$extractedImages = Join-Path $extractedDir 'images'
if (Test-Path $extractedImages) {
    $imageFiles = Get-ChildItem -Path $extractedImages -File
    foreach ($img in $imageFiles) {
        Copy-Item -Path $img.FullName -Destination $imagesDir -Force
    }
    Write-Host "[OK] Copied $($imageFiles.Count) images to $imagesDir" -ForegroundColor Green
} else {
    Write-Host '[INFO] No images found in extraction output.' -ForegroundColor DarkYellow
}

# -- Report results --
Write-Host ''
Write-Host '=== Extraction Complete ===' -ForegroundColor Cyan
Write-Host ''
Write-Host "Extracted files in: $extractedDir" -ForegroundColor White
Write-Host '  theme.json   - Color scheme, fonts, slide dimensions'
Write-Host '  slides.json  - Slide content with shapes and formatting'
Write-Host '  layouts.json - Slide layout definitions'
Write-Host "  images/      - Media files (copied to $imagesDir)"
Write-Host ''
Write-Host 'Next steps:' -ForegroundColor Yellow
Write-Host '  1. Read theme.json to build style.css'
Write-Host '  2. Read slides.json to generate slides.md'
Write-Host '  3. Review and refine the output'
Write-Host "  4. Run: pnpm slidev presentations/$OutputName/slides.md"

if (-not $SkipCleanup) {
    Write-Host ''
    Write-Host "Temporary extraction dir retained at: $extractedDir" -ForegroundColor DarkGray
    Write-Host 'Delete after slides.md and style.css are finalized.' -ForegroundColor DarkGray
}

Write-Host ''
Write-Host 'Done.' -ForegroundColor Green
