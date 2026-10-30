## Visual style catalog for Hypervelocity Engineering

This document records the 10 visual style variations created for the Reveal.js Hypervelocity Engineering presentation (`presentations/hypervelocity-engineering-ai-sdlc-is-not-enough/`).

**Selected direction:** **Variation 8 — Quantum Wave, refined as 8-S2 Dual-Swirl Twist** (locked).

## Shared design brief constraints

- **Light backgrounds:** Warm pearl, cool porcelain, alabaster, stone, or lavender-white canvases (never dark mode or sterile flat white).
- **Subtle flowing shapes:** Layered SVG ribbons, harmonic sine waves, aerodynamic streamlines, or topographic contours at low opacity (`6%` to `20%`).
- **Restrained vibrant palette:** Two bright brand accents per theme (one primary, one secondary) paired with deep ink and tinted secondary text. Multi-category semantic hues (amber, rose, teal, cobalt) are reserved strictly for complex diagrams.
- **Modern Microsoft flavor with theme divergence:** Retains Fluent 2 duotone/layered SVG icon geometry and `Segoe UI Variable Display` / `Cascadia Code` typography while diverging from standard corporate slide templates.
- **Subtle slide numbering:** Tabular numerals integrated cleanly into the header or footer chrome.

## Summary of all 10 variations

| # | Variation name | Subtitle | Canvas (`--bg`) | Ink (`--ink`) | Primary (`--accent-1`) | Secondary (`--accent-2`) | Soft tint (`--surface-tint`) | Subtle numbering style |
| - | -------------- | -------- | --------------- | ------------- | ---------------------- | ------------------------ | ---------------------------- | ---------------------- |
| 1 | **Fluent Aero Silk** | Copilot Violet & Electric Cobalt | `#FAF9FE` | `#17122B` | `#005FB8` | `#7B2CBF` | `#E8F2FC` | Top-right monospace pill (`04 / 24`) |
| 2 | **Azure Kinetic Ribbon** | Bright Cerulean & Signal Coral | `#F5FAFE` | `#0D1E36` | `#0078D4` | `#E63B2E` | `#E5F3FF` | Bottom-right bold `04` over `2px` coral rule |
| 3 | **Fabric Prism Contours** | Emerald Teal & Warm Amber | `#F7FBF9` | `#102820` | `#00805A` | `#D97706` | `#E3F7F0` | Top-right amber tick + monospace `04 / 24` |
| 4 | **Sunlit Mica & Magenta** | Viva Magenta & Warm Marigold | `#FFFDF9` | `#261621` | `#C80064` | `#D96B00` | `#FCE7F1` | Oversized subtle corner numeral `04` (`38%` opacity) |
| 5 | **Copilot Aurora Editorial** | Ultraviolet & Cyan Pulse | `#F6F8FC` | `#13182B` | `#5B21B6` | `#0086C9` | `#EDE9FE` | Framed header tabular index (`04 — 24`) |
| 6 | **Nordic Fluent Studio** | Hyper Cobalt & Electric Olive-Lime | `#F9FAFB` | `#111827` | `#1D4ED8` | `#4D7C0F` | `#DBEAFE` | Bottom-right `Bahnschrift` decimal index (`.04`) |
| 7 | **Surface Studio Terracotta** | Ultramarine & Terracotta Vermilion | `#FBF9F5` | `#1B1F3B` | `#1E40AF` | `#C2410C` | `#E0E7FF` | Footer segmented mini progress bar + `04 / 24` |
| 8 | **Quantum Wave** *(Selected)* | Royal Purple & Vivid Tangerine | `#FAF8FF` | `#211533` | `#6B29C6` | `#D95D00` | `#F1E8FF` | Top-right rounded white ghost chip (`04 / 24`) |
| 9 | **Velocity Streamline** | Bright Sapphire & Crimson Spark | `#F5F7FA` | `#0D1B2A` | `#0055D4` | `#BE123C` | `#E3EEFF` | Bottom-right monospace bracket (`[04 / 24]`) |
| 10 | **Solstice Fluent Glass** | Electric Indigo & Deep Teal | `#F5FAFA` | `#102A32` | `#4338CA` | `#0F766E` | `#E0E7FF` | Footer hairline em-dash counter (`— 04 / 24`) |

## Detailed variation specifications

### 1. Fluent Aero Silk

- **Flowing background geometry:** Two translucent silk S-ribbons sweeping from bottom-left to top-right (`linearGradient` between `#005FB8` at `10%` opacity and `#7B2CBF` at `6%` opacity).
- **Surface and layout architecture:** Frosted glass stage (`backdrop-filter: blur(10px)`), `22px` border radius, circular pill icon badges, and a 4-row horizontal pillar ledger.
- **Secondary tint & border tokens:** `--surface-tint-2: #F3E8FF`, `--border: #DFD9EE`, `--muted: #5B5373`.

### 2. Azure Kinetic Ribbon

- **Flowing background geometry:** Aerodynamic vector streamlines (`Q420,660 760,500 T1320,180`) with solid cerulean (`22%` opacity) and dashed coral (`22%` opacity) flow paths.
- **Surface and layout architecture:** Horizontal top loop banner above 4 tall vertical pillar columns with `4px` alternating top accent bars and `8px` corners.
- **Secondary tint & border tokens:** `--surface-tint-2: #FFEAE8`, `--border: #D2E3F3`, `--muted: #4A5E78`.

### 3. Fabric Prism Contours

- **Flowing background geometry:** Soft radial washes paired with three vertical S-curve topographic contour lines (`#00805A` and `#D97706` at `12%`–`15%` opacity).
- **Surface and layout architecture:** Reversed split layout (2x2 pillar matrix on left, radial-dot-grid loop stage on right) with rounded-square icon tiles.
- **Secondary tint & border tokens:** `--surface-tint-2: #FEF3C7`, `--border: #CDE4DC`, `--muted: #4B665D`.

### 4. Sunlit Mica & Magenta

- **Flowing background geometry:** Overlapping biomorphic Fluent acrylic petal shapes anchored to the top-right and bottom-left corners.
- **Surface and layout architecture:** Editorial serif italic emphasis (`"Sitka Display", "Georgia", serif`) on headline key terms, `24px` pill cards, and `46px` circular icon medallions.
- **Secondary tint & border tokens:** `--surface-tint-2: #FFF0DB`, `--border: #EAD6E0`, `--muted: #6B5263`.

### 5. Copilot Aurora Editorial

- **Flowing background geometry:** Continuous diagonal S-curve aurora ribbon blending `#5B21B6` (`11%`) into `#0086C9` (`10%`).
- **Surface and layout architecture:** Subtle vertical-gradient white cards (`16px` radius) with dual-tint gradient icon containers (`135deg` from `#EDE9FE` to `#E0F2FE`).
- **Secondary tint & border tokens:** `--surface-tint-2: #E0F2FE`, `--border: #D8E0F0`, `--muted: #515A78`.

### 6. Nordic Fluent Studio

- **Flowing background geometry:** Precision compass-arc Bézier circles (`r="460"` and `r="340"`) anchored in the bottom-right over a soft olive-lime wedge.
- **Surface and layout architecture:** Zero-shadow architectural blueprint grid (`border-width: 1.5px`, `border-radius: 4px`) with `Bahnschrift` semi-condensed headlines.
- **Secondary tint & border tokens:** `--surface-tint-2: #ECFCCB`, `--border: #DFE4EC`, `--muted: #4B5563`.

### 7. Surface Studio Terracotta

- **Flowing background geometry:** Warm stone paper canvas (`#FBF9F5`) with sweeping sand (`#EFE9DE`) and terracotta (`7%` opacity) horizon waves across the lower third.
- **Surface and layout architecture:** 4-column horizontal pillar bridge on top, full-width continuous loop horizon bar below, and outlined squircle icon badges.
- **Secondary tint & border tokens:** `--surface-tint-2: #FFEDD5`, `--border: #E5DFD3`, `--muted: #5C607D`.

### 8. Quantum Wave (Selected — Refined as 8-S2 Soft-Serve Twist)

- **Core color tokens:** Canvas `#FAF8FF`, Ink `#1A1429`, Muted `#564D6E`, Royal Purple `#5C2D91` (`#6B29C6` highlight), Vivid Tangerine `#F7630C` (`#D95D00` dark stop), Border `#E4DCFA`.
- **Soft-serve 3D fluted wave shading (`8-S2` at 50% lighter subtlety):**
  - Parallel extruded soft-serve ribbons with crisp white specular ridge crests, whisper-light pastel bodies (`22%`–`38%` opacity), and subtle crease drop-shadows (`feDropShadow dx="0" dy="4" stdDeviation="7"` at `4.5%` opacity).
  - **Warm Apricot-Rose coil flutes:** Flute 1 (`#FFF7F0` → `#FDE5D2` → `#F9CFB0`), Flute 2 (`#FFF2EB` → `#FCDAD0` → `#F5C2B8`), Flute 3 (`#FDF0F7` → `#F7D9EC` → `#ECC2DF`).
  - **Cool Lavender-Orchid fold flutes:** Flute 1 (`#F6F1FF` → `#E7DBFC` → `#D7C4F8`), Flute 2 (`#F3F0FF` → `#E1DCFE` → `#CCC5FA`), Flute 3 (`#FBF2FA` → `#F2DCF3` → `#E5C6EA`).
- **Content-aligned swirl choreography per slide layout:**
  1. `cover-cradle` (Cover / Hero): Sweeping Apricot-Rose swirl behind the right 4-Pillar stack; Violet-Orchid swirl cradling the bottom-left title anchor.
  2. `split-diagonal` (Split Architecture / Loop + Pillars): Violet-Orchid swirl under the left Co-Engineering Loop; Apricot swirl framing the top-right 4-Pillar grid.
  3. `stream-progression` (Horizontal Timelines / Flows): Continuous horizontal S-stream flowing left-to-right behind timeline bars (Cool Violet on left → Warm Apricot on right).
  4. `center-halo` (Center Hub / Venn / Radial): Soft-serve curls hug top-left and bottom-right corners, leaving an open central halo for radial or 3-space diagrams.
  5. `dual-column-contrast` (Before vs. After Comparisons): Cool Periwinkle-Violet folds anchor the left column (Legacy / AI SDLC); Warm Apricot-Tangerine folds anchor the right column (HVE Model).
  6. `rising-twist` (Section Dividers / Bridges): Sweeping diagonal twist across the right third leaves the left two-thirds clean for section titles.
- **Surface and layout architecture:** Frosted glass cards (`rgba(255, 255, 255, 0.88)`, `backdrop-filter: blur(8px)`, `18px` radius), original duotone SVG icons, and a quiet footer slide counter (`04 / 39`). The static backgrounds use the six content-aligned compositions above; they do not add automatic motion.
- **Slide grid (1280 by 720):** The header and footer sit inside each slide. The title is fixed at 72 px from the top. The content area is 1152 by 432 px. It holds one diagram and one takeaway line. Diagram parts (nodes, chains, loops, lanes, return paths) share one spacing scale. Purple marks the focus node. Tangerine marks the customer or decision point. Dashed lines mark return paths.

### 9. Velocity Streamline

- **Flowing background geometry:** Swept parabolic wind-tunnel arcs compressing toward the right edge in sapphire (`#0055D4`) and crimson (`#BE123C`).
- **Surface and layout architecture:** Left-hand 4-row technical stack with bracketed monospace tags (`[PILLAR 01]`) paired with a right-hand loop schematic (`6px` radius).
- **Secondary tint & border tokens:** `--surface-tint-2: #FFE4E6`, `--border: #D5DFEC`, `--muted: #4A5A6E`.

### 10. Solstice Fluent Glass

- **Flowing background geometry:** Layered translucent wave crests along the bottom-left (`#0F766E` at `8%`) and top-right (`#4338CA` at `8%`).
- **Surface and layout architecture:** Asymmetric leaf-contoured surfaces (`border-radius: 24px 6px 24px 6px`) with M365-inspired indigo and teal duotone icons.
- **Secondary tint & border tokens:** `--surface-tint-2: #CCFBF1`, `--border: #CBE0E0`, `--muted: #49656E`.
