<#
.SYNOPSIS
    Build a phased layer plan from a .NET upgrade assessment.

.DESCRIPTION
    Parses assessment.json, extracts the project dependency graph,
    assigns projects to dependency layers, splits thick layers that
    exceed MaxPerLayer, and generates a phased modernization plan
    as Markdown with Mermaid diagrams.

.PARAMETER AssessmentPath
    Path to the assessment.json file from the .NET upgrade tools.

.PARAMETER MaxPerLayer
    Maximum number of projects allowed in a single phase/sub-layer.
    Layers exceeding this are split. Default: 10.

.PARAMETER OutputPath
    Where to write the generated plan. Defaults to layer-plan.md
    next to the assessment file.

.EXAMPLE
    ./Build-LayerPlan.ps1 -AssessmentPath ".github/upgrades/scenarios/dotnet-version-upgrade/assessment.json"
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateScript({ Test-Path $_ })]
    [string]$AssessmentPath,

    [Parameter()]
    [ValidateRange(1, 100)]
    [int]$MaxPerLayer = 10,

    [Parameter()]
    [string]$OutputPath
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# Default output path to same directory as assessment
if (-not $OutputPath) {
    $OutputPath = Join-Path (Split-Path $AssessmentPath -Parent) 'layer-plan.md'
}

Write-Host "Reading assessment from: $AssessmentPath"
$assessment = Get-Content -Path $AssessmentPath -Raw | ConvertFrom-Json

# --- Extract project data ---
$projects = @{}
foreach ($proj in $assessment.projects) {
    $name = Split-Path $proj.path -Leaf
    $projects[$proj.path] = @{
        Path            = $proj.path
        Name            = $name
        Issues          = $proj.issues
        StoryPoints     = $proj.storyPoints
        MinLOC          = $proj.properties.minLinesOfCodeToChange
        MaxLOC          = $proj.properties.maxLinesOfCodeToChange
        IsSdkStyle      = $proj.properties.isSdkStyle
        Framework       = ($proj.properties.frameworks | Select-Object -First 1)
        ProjectKind     = $proj.properties.projectKind
        Dependencies    = @()
        UsedBy          = @()
        Level           = -1
    }
}

# --- Build dependency edges from assessment dependencies field ---
foreach ($proj in $assessment.projects) {
    if ($proj.PSObject.Properties['dependencies']) {
        foreach ($dep in $proj.dependencies) {
            $depPath = $dep.path
            if ($depPath -and $projects.ContainsKey($depPath)) {
                $projects[$proj.path].Dependencies += $depPath
            }
        }
    }
}

# --- Compute levels via BFS (topological layering) ---
$remaining = [System.Collections.Generic.HashSet[string]]::new([string[]]$projects.Keys)
$level = 0

while ($remaining.Count -gt 0) {
    # Find projects whose dependencies are all already assigned
    $currentLevel = @()
    foreach ($path in @($remaining)) {
        $allDepsAssigned = $true
        foreach ($dep in $projects[$path].Dependencies) {
            if ($remaining.Contains($dep)) {
                $allDepsAssigned = $false
                break
            }
        }
        if ($allDepsAssigned) {
            $currentLevel += $path
        }
    }

    # Safety: if no progress, break cycles by assigning remaining
    if ($currentLevel.Count -eq 0) {
        Write-Warning "Possible circular dependency detected. Assigning remaining $($remaining.Count) projects to level $level."
        $currentLevel = @($remaining)
    }

    foreach ($path in $currentLevel) {
        $projects[$path].Level = $level
        [void]$remaining.Remove($path)
    }
    $level++
}

$maxLevel = ($projects.Values | Measure-Object -Property Level -Maximum).Maximum

# --- Populate UsedBy ---
foreach ($path in $projects.Keys) {
    foreach ($dep in $projects[$path].Dependencies) {
        if ($projects.ContainsKey($dep)) {
            $projects[$dep].UsedBy += $path
        }
    }
}

# --- Split thick layers ---
$phases = [System.Collections.Generic.SortedDictionary[string, System.Collections.Generic.List[hashtable]]]::new()

for ($l = 0; $l -le $maxLevel; $l++) {
    $layerProjects = $projects.Values | Where-Object { $_.Level -eq $l } | Sort-Object { $_.UsedBy.Count } -Descending

    if ($layerProjects.Count -le $MaxPerLayer) {
        $key = "L$l"
        $phases[$key] = [System.Collections.Generic.List[hashtable]]::new()
        foreach ($p in $layerProjects) { $phases[$key].Add($p) }
    }
    else {
        # Split into sub-layers
        $subLayer = 1
        $batch = [System.Collections.Generic.List[hashtable]]::new()
        foreach ($p in $layerProjects) {
            $batch.Add($p)
            if ($batch.Count -ge $MaxPerLayer) {
                $key = "L$l.$subLayer"
                $phases[$key] = $batch
                $batch = [System.Collections.Generic.List[hashtable]]::new()
                $subLayer++
            }
        }
        if ($batch.Count -gt 0) {
            $key = "L$l.$subLayer"
            $phases[$key] = $batch
        }
    }
}

# --- Extract target framework from assessment ---
$targetFramework = 'net10.0'
if ($assessment.PSObject.Properties['targetFramework']) {
    $targetFramework = $assessment.targetFramework
}

$totalProjects = $projects.Count
$totalIssues = ($projects.Values | Measure-Object -Property Issues -Sum).Sum
$totalSP = ($projects.Values | Measure-Object -Property StoryPoints -Sum).Sum

# --- Generate Markdown ---
$sb = [System.Text.StringBuilder]::new()

[void]$sb.AppendLine("# Phased Modernization Plan")
[void]$sb.AppendLine()
[void]$sb.AppendLine("**Target:** ``$targetFramework``")
[void]$sb.AppendLine("**Projects:** $totalProjects")
[void]$sb.AppendLine("**Total Story Points:** $totalSP")
[void]$sb.AppendLine("**Generated:** $(Get-Date -Format 'yyyy-MM-dd')")
[void]$sb.AppendLine()

# Mermaid diagram
[void]$sb.AppendLine('## Dependency Diagram')
[void]$sb.AppendLine()
[void]$sb.AppendLine('```mermaid')
[void]$sb.AppendLine('graph TD')
[void]$sb.AppendLine('    SDK["Phase 0: SDK-Style Conversion<br/>All ' + $totalProjects + ' projects"]')

$phaseNum = 1
$prevNodes = @('SDK')
foreach ($key in $phases.Keys) {
    $phaseProjects = $phases[$key]
    $count = $phaseProjects.Count
    $sp = ($phaseProjects | Measure-Object -Property StoryPoints -Sum).Sum
    $nodeId = "P$phaseNum"
    [void]$sb.AppendLine("    $nodeId[""Phase $phaseNum`: $key<br/>$count projects, $sp SP""]")

    foreach ($prev in $prevNodes) {
        [void]$sb.AppendLine("    $prev --> $nodeId")
    }
    $prevNodes = @($nodeId)
    $phaseNum++
}

$finalNode = "PF"
[void]$sb.AppendLine("    $finalNode[""Final: Integration & Validation""]")
foreach ($prev in $prevNodes) {
    [void]$sb.AppendLine("    $prev --> $finalNode")
}
[void]$sb.AppendLine('```')
[void]$sb.AppendLine()

# Phase summary table
[void]$sb.AppendLine('## Phase Summary')
[void]$sb.AppendLine()
[void]$sb.AppendLine('| Phase | Layer | Projects | Story Points | Est. Max LOC | Parallel? |')
[void]$sb.AppendLine('|-------|-------|----------|-------------|-------------|-----------|')
[void]$sb.AppendLine("| 0 | All | $totalProjects | — | — | No (solution-wide) |")

$phaseNum = 1
foreach ($key in $phases.Keys) {
    $phaseProjects = $phases[$key]
    $count = $phaseProjects.Count
    $sp = ($phaseProjects | Measure-Object -Property StoryPoints -Sum).Sum
    $loc = ($phaseProjects | Measure-Object -Property MaxLOC -Sum).Sum
    $parallel = if ($count -gt 1) { 'Yes' } else { 'No' }
    [void]$sb.AppendLine("| $phaseNum | $key | $count | $sp | $loc | $parallel |")
    $phaseNum++
}
[void]$sb.AppendLine()

# Phase details
[void]$sb.AppendLine('## Phase Details')
[void]$sb.AppendLine()
[void]$sb.AppendLine('### Phase 0: SDK-Style Conversion')
[void]$sb.AppendLine()
[void]$sb.AppendLine("Convert all $totalProjects projects from classic to SDK-style format.")
[void]$sb.AppendLine('See `references/PHASING-STRATEGY.md` for detailed guidance.')
[void]$sb.AppendLine()

$phaseNum = 1
foreach ($key in $phases.Keys) {
    $phaseProjects = $phases[$key]
    $count = $phaseProjects.Count
    $sp = ($phaseProjects | Measure-Object -Property StoryPoints -Sum).Sum
    $loc = ($phaseProjects | Measure-Object -Property MaxLOC -Sum).Sum

    [void]$sb.AppendLine("### Phase $phaseNum`: $key ($count projects)")
    [void]$sb.AppendLine()
    [void]$sb.AppendLine("**Story Points:** $sp | **Est. Max LOC:** $loc")
    [void]$sb.AppendLine()
    [void]$sb.AppendLine('| Project | Issues | Story Points | Max LOC | Type |')
    [void]$sb.AppendLine('|---------|--------|-------------|---------|------|')

    foreach ($p in ($phaseProjects | Sort-Object { $_.StoryPoints } -Descending)) {
        $name = $p.Name
        [void]$sb.AppendLine("| $name | $($p.Issues) | $($p.StoryPoints) | $($p.MaxLOC) | $($p.ProjectKind) |")
    }
    [void]$sb.AppendLine()
    $phaseNum++
}

# Write output
$sb.ToString() | Set-Content -Path $OutputPath -Encoding UTF8
Write-Host "Layer plan written to: $OutputPath"
Write-Host "Phases: $($phases.Count + 2) (Phase 0 + $($phases.Count) layers + Final)"
