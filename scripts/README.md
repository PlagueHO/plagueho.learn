# Scripts

This directory contains utility scripts organized by technology, commonly used across repositories.

## Structure

```text
scripts/
├── README.md         # This file
├── powershell/       # PowerShell scripts
├── python/           # Python scripts
├── bash/             # Bash/shell scripts
└── bicep/            # Azure Bicep and ARM template scripts
```

## Script Standards

All scripts should include a header comment with:

- **Purpose**: What the script does
- **Parameters**: Description of each parameter
- **Usage**: Example command(s)
- **Prerequisites**: Any required tools, modules, or permissions

### PowerShell Example Header

```powershell
<#
.SYNOPSIS
    Brief description of what the script does.

.DESCRIPTION
    More detailed description of the script's functionality.

.PARAMETER ParameterName
    Description of this parameter.

.EXAMPLE
    .\script-name.ps1 -ParameterName "value"

.NOTES
    Author: Daniel Scott-Raynsford
    Requires: PowerShell 7.0+
#>
```

### Python Example Header

```python
"""
Brief description of what the script does.

Usage:
    python script-name.py --parameter value

Parameters:
    --parameter: Description of this parameter

Prerequisites:
    - Python 3.10+
    - required-package (pip install required-package)
"""
```

## Adding a Script

1. Place the script in the appropriate technology subdirectory
2. Follow the header comment standard for your technology
3. Ensure the script handles errors gracefully
4. Test the script before committing
5. Add the script to the table below

## Available Scripts

| Script | Technology | Description |
|--------|-----------|-------------|
| *(none yet — add your first script!)* | | |
