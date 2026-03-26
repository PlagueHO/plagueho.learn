# Agentic Development Evolution: A View of the Last 6 Months

A 40-minute Slidev presentation by Daniel Scott-Raynsford covering how GitHub Copilot,
skills, MCP, subagents, squads, and prototype-first workflows changed the engineering
operating model over the last 6 months.

**Audience:** Developers, engineering leads, architects, and AI automation practitioners.

## Quick Start

```bash
# Preview with hot reload (opens browser automatically)
pnpm slidev presentations/agentic-development-evolution/slides.md

# Preview on a specific port without auto-open
pnpm exec slidev presentations/agentic-development-evolution/slides.md --port 3031 --open false
```

## Build

```bash
# Build a static SPA for hosting
pnpm exec slidev build presentations/agentic-development-evolution/slides.md
```

> **Note:** Use `pnpm exec slidev build` rather than `pnpm slidev build` — the `pnpm slidev`
> script prepends `--open`, which conflicts with the `build` subcommand.

## Export

```bash
# Export to PDF (requires Chrome or Edge)
pnpm exec slidev export presentations/agentic-development-evolution/slides.md
```

## Files

| File | Purpose |
|------|---------|
| `slides.md` | Slide content and Slidev front matter |
| `style.css` | Custom CSS overrides for the presentation |
| `images/` | Images referenced in slides |
| `OUTLINE.md` | Talk structure and timing breakdown |
| `EXTENDED-OUTLINE.md` | Detailed per-slide speaker notes and content plan |
