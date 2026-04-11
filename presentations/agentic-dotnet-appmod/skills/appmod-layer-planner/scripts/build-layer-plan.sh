#!/usr/bin/env bash
# Build a phased layer plan from a .NET upgrade assessment.
#
# Parses assessment.json, extracts the project dependency graph,
# assigns projects to dependency layers, splits thick layers that
# exceed --max-per-layer, and generates a phased modernization plan.
#
# Requires: jq
#
# Usage:
#   ./build-layer-plan.sh \
#       --assessment-path .github/upgrades/scenarios/dotnet-version-upgrade/assessment.json \
#       --max-per-layer 10 \
#       --output-path .github/upgrades/scenarios/dotnet-version-upgrade/layer-plan.md

set -euo pipefail

# --- Defaults ---
ASSESSMENT_PATH=""
MAX_PER_LAYER=10
OUTPUT_PATH=""

# --- Parse arguments ---
while [[ $# -gt 0 ]]; do
    case "$1" in
        --assessment-path)
            ASSESSMENT_PATH="$2"; shift 2 ;;
        --max-per-layer)
            MAX_PER_LAYER="$2"; shift 2 ;;
        --output-path)
            OUTPUT_PATH="$2"; shift 2 ;;
        -h|--help)
            echo "Usage: $0 --assessment-path <path> [--max-per-layer <n>] [--output-path <path>]"
            exit 0 ;;
        *)
            echo "Unknown argument: $1" >&2; exit 1 ;;
    esac
done

if [[ -z "$ASSESSMENT_PATH" ]]; then
    echo "Error: --assessment-path is required" >&2
    exit 1
fi

if [[ ! -f "$ASSESSMENT_PATH" ]]; then
    echo "Error: Assessment file not found: $ASSESSMENT_PATH" >&2
    exit 1
fi

# Check for jq
if ! command -v jq &>/dev/null; then
    echo "Error: jq is required but not installed. Install with: sudo apt-get install jq" >&2
    exit 1
fi

# Default output path
if [[ -z "$OUTPUT_PATH" ]]; then
    OUTPUT_PATH="$(dirname "$ASSESSMENT_PATH")/layer-plan.md"
fi

echo "Reading assessment from: $ASSESSMENT_PATH"
echo "Max projects per layer: $MAX_PER_LAYER"

# --- Extract project data as JSON lines ---
# Each line: { path, name, issues, storyPoints, maxLOC, projectKind, deps[] }
PROJECTS_JSON=$(jq -c '
    .projects[] | {
        path: .path,
        name: (.path | split("\\") | last),
        issues: .issues,
        storyPoints: .storyPoints,
        maxLOC: .properties.maxLinesOfCodeToChange,
        projectKind: .properties.projectKind,
        isSdkStyle: .properties.isSdkStyle,
        deps: [.dependencies[]?.path // empty]
    }
' "$ASSESSMENT_PATH")

TOTAL_PROJECTS=$(echo "$PROJECTS_JSON" | wc -l)
TOTAL_SP=$(echo "$PROJECTS_JSON" | jq -s '[.[].storyPoints] | add // 0')

# --- Compute dependency levels ---
# Use jq to build the full graph and compute levels via iterative BFS
LAYERED_JSON=$(echo "$PROJECTS_JSON" | jq -s '
    # Index by path
    (map({key: .path, value: .}) | from_entries) as $byPath |

    # Initialize: all unassigned
    [.[] | . + {level: -1}] |

    # BFS layering
    {projects: ., remaining: [.[].path], level: 0} |
    until(.remaining | length == 0;
        .level as $lvl |
        .projects as $projs |
        .remaining as $rem |

        # Find projects whose deps are all assigned (not in remaining)
        [.remaining[] | select(
            ($byPath[.].deps // []) |
            all(. as $d | $rem | index($d) == null)
        )] as $ready |

        # If no progress, assign all remaining (cycle breaking)
        (if ($ready | length) == 0 then $rem else $ready end) as $assign |

        # Update levels
        .projects = [.projects[] |
            if (.path | IN($assign[])) then .level = $lvl else . end
        ] |
        .remaining = [.remaining[] | select(IN($assign[]) | not)] |
        .level += 1
    ) |
    .projects | sort_by(.level, .storyPoints)
')

# --- Generate markdown output ---
TARGET_FW=$(jq -r '.targetFramework // "net10.0"' "$ASSESSMENT_PATH")
DATE=$(date +%Y-%m-%d)
MAX_LEVEL=$(echo "$LAYERED_JSON" | jq '[.[].level] | max')

{
    echo "# Phased Modernization Plan"
    echo ""
    echo "**Target:** \`$TARGET_FW\`"
    echo "**Projects:** $TOTAL_PROJECTS"
    echo "**Total Story Points:** $TOTAL_SP"
    echo "**Generated:** $DATE"
    echo ""
    echo "## Phase Summary"
    echo ""
    echo "| Phase | Layer | Projects | Story Points | Est. Max LOC | Parallel? |"
    echo "|-------|-------|----------|-------------|-------------|-----------|"
    echo "| 0 | All | $TOTAL_PROJECTS | — | — | No (solution-wide) |"

    PHASE=1
    for LEVEL in $(seq 0 "$MAX_LEVEL"); do
        LEVEL_PROJECTS=$(echo "$LAYERED_JSON" | jq -c "[.[] | select(.level == $LEVEL)]")
        COUNT=$(echo "$LEVEL_PROJECTS" | jq 'length')
        SP=$(echo "$LEVEL_PROJECTS" | jq '[.[].storyPoints] | add // 0')
        LOC=$(echo "$LEVEL_PROJECTS" | jq '[.[].maxLOC] | add // 0')

        if [[ $COUNT -le $MAX_PER_LAYER ]]; then
            PARALLEL=$( [[ $COUNT -gt 1 ]] && echo "Yes" || echo "No" )
            echo "| $PHASE | L$LEVEL | $COUNT | $SP | $LOC | $PARALLEL |"
            PHASE=$((PHASE + 1))
        else
            # Split into sub-layers
            SUB=1
            OFFSET=0
            while [[ $OFFSET -lt $COUNT ]]; do
                BATCH=$(echo "$LEVEL_PROJECTS" | jq -c ".[$OFFSET:$((OFFSET + MAX_PER_LAYER))]")
                BATCH_COUNT=$(echo "$BATCH" | jq 'length')
                BATCH_SP=$(echo "$BATCH" | jq '[.[].storyPoints] | add // 0')
                BATCH_LOC=$(echo "$BATCH" | jq '[.[].maxLOC] | add // 0')
                PARALLEL=$( [[ $BATCH_COUNT -gt 1 ]] && echo "Yes" || echo "No" )
                echo "| $PHASE | L${LEVEL}.${SUB} | $BATCH_COUNT | $BATCH_SP | $BATCH_LOC | $PARALLEL |"
                PHASE=$((PHASE + 1))
                SUB=$((SUB + 1))
                OFFSET=$((OFFSET + MAX_PER_LAYER))
            done
        fi
    done

    echo ""
    echo "## Phase Details"
    echo ""
    echo "### Phase 0: SDK-Style Conversion"
    echo ""
    echo "Convert all $TOTAL_PROJECTS projects from classic to SDK-style format."
    echo "See \`references/PHASING-STRATEGY.md\` for detailed guidance."
    echo ""

    PHASE=1
    for LEVEL in $(seq 0 "$MAX_LEVEL"); do
        LEVEL_PROJECTS=$(echo "$LAYERED_JSON" | jq -c "[.[] | select(.level == $LEVEL)]")
        COUNT=$(echo "$LEVEL_PROJECTS" | jq 'length')
        SP=$(echo "$LEVEL_PROJECTS" | jq '[.[].storyPoints] | add // 0')
        LOC=$(echo "$LEVEL_PROJECTS" | jq '[.[].maxLOC] | add // 0')

        echo "### Phase $PHASE: L$LEVEL ($COUNT projects)"
        echo ""
        echo "**Story Points:** $SP | **Est. Max LOC:** $LOC"
        echo ""
        echo "| Project | Issues | Story Points | Max LOC | Type |"
        echo "|---------|--------|-------------|---------|------|"

        echo "$LEVEL_PROJECTS" | jq -r '.[] | "| \(.name) | \(.issues) | \(.storyPoints) | \(.maxLOC) | \(.projectKind) |"'

        echo ""
        PHASE=$((PHASE + 1))
    done

} > "$OUTPUT_PATH"

echo "Layer plan written to: $OUTPUT_PATH"
echo "Total phases: $((PHASE + 1)) (Phase 0 + $((PHASE - 1)) layers + Final)"
