#!/usr/bin/env bash
# convert-pptx.sh — Orchestrate PPTX-to-Slidev conversion
#
# Usage:
#   ./convert-pptx.sh <source.pptx> <output-name> [repo-root]
#
# Arguments:
#   source.pptx   Path to the source PowerPoint file
#   output-name   Kebab-case name for the presentation folder
#   repo-root     Repository root directory (default: current directory)
#
# After running, read the extracted JSON files and generate slides.md and
# style.css following the SKILL.md instructions.

set -euo pipefail

# -- Parse arguments --
if [ $# -lt 2 ]; then
    echo "Usage: $0 <source.pptx> <output-name> [repo-root]"
    exit 1
fi

SOURCE_PPTX="$1"
OUTPUT_NAME="$2"
REPO_ROOT="${3:-.}"

# Resolve paths
REPO_ROOT="$(cd "$REPO_ROOT" && pwd)"
SKILL_SCRIPTS_DIR="$(cd "$(dirname "$0")" && pwd)"
EXTRACT_SCRIPT="$SKILL_SCRIPTS_DIR/extract_pptx.py"
REQUIREMENTS_FILE="$SKILL_SCRIPTS_DIR/requirements.txt"
PRESENTATIONS_DIR="$REPO_ROOT/presentations/$OUTPUT_NAME"
EXTRACTED_DIR="$PRESENTATIONS_DIR/_extracted"
IMAGES_DIR="$PRESENTATIONS_DIR/images"

echo "=== PPTX to Slidev Conversion ==="
echo ""

# -- Validate prerequisites --

# Check source file
if [ ! -f "$SOURCE_PPTX" ]; then
    echo "ERROR: Source PPTX not found: $SOURCE_PPTX"
    exit 1
fi
echo "[OK] Source: $SOURCE_PPTX"

# Check extraction script
if [ ! -f "$EXTRACT_SCRIPT" ]; then
    echo "ERROR: Extraction script not found: $EXTRACT_SCRIPT"
    exit 1
fi
echo "[OK] Extraction script: $EXTRACT_SCRIPT"

# Check Python
if ! command -v python3 &>/dev/null && ! command -v python &>/dev/null; then
    echo "ERROR: Python is not installed or not on PATH."
    exit 1
fi
PYTHON_CMD="$(command -v python3 || command -v python)"
echo "[OK] Python: $PYTHON_CMD"

# Check python-pptx (auto-install if missing)
if ! "$PYTHON_CMD" -c 'import pptx; print(pptx.__version__)' 2>/dev/null; then
    echo "python-pptx not found. Installing from requirements.txt..."
    "$PYTHON_CMD" -m pip install -r "$REQUIREMENTS_FILE"
    if ! "$PYTHON_CMD" -c 'import pptx; print(pptx.__version__)' 2>/dev/null; then
        echo "ERROR: Failed to install Python dependencies from: $REQUIREMENTS_FILE"
        exit 1
    fi
fi

# -- Create output directories --
echo ""
echo "Creating output directories..."
mkdir -p "$PRESENTATIONS_DIR"
mkdir -p "$IMAGES_DIR"

# -- Run extraction --
echo ""
echo "Extracting PPTX content..."
"$PYTHON_CMD" "$EXTRACT_SCRIPT" "$SOURCE_PPTX" "$EXTRACTED_DIR"

# -- Copy images --
EXTRACTED_IMAGES="$EXTRACTED_DIR/images"
if [ -d "$EXTRACTED_IMAGES" ]; then
    IMAGE_COUNT=$(find "$EXTRACTED_IMAGES" -maxdepth 1 -type f | wc -l)
    if [ "$IMAGE_COUNT" -gt 0 ]; then
        cp "$EXTRACTED_IMAGES"/* "$IMAGES_DIR/"
        echo "[OK] Copied $IMAGE_COUNT images to $IMAGES_DIR"
    fi
else
    echo "[INFO] No images found in extraction output."
fi

# -- Report results --
echo ""
echo "=== Extraction Complete ==="
echo ""
echo "Extracted files in: $EXTRACTED_DIR"
echo "  theme.json   - Color scheme, fonts, slide dimensions"
echo "  slides.json  - Slide content with shapes and formatting"
echo "  layouts.json - Slide layout definitions"
echo "  images/      - Media files (copied to $IMAGES_DIR)"
echo ""
echo "Next steps:"
echo "  1. Read theme.json to build style.css"
echo "  2. Read slides.json to generate slides.md"
echo "  3. Review and refine the output"
echo "  4. Run: pnpm slidev presentations/$OUTPUT_NAME/slides.md"
echo ""
echo "Temporary extraction dir retained at: $EXTRACTED_DIR"
echo "Delete after slides.md and style.css are finalized."
echo ""
echo "Done."
