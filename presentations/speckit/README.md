# Spec-Driven Development with AI: Spec Kit

A 30-minute Slidev presentation by Daniel Scott-Raynsford covering an introduction to SpecKit.

**Audience:** Developers, engineering leads, architects, and AI automation practitioners.

## Quick Start

```bash
# Preview with hot reload (opens browser automatically)
pnpm slidev presentations/speckit/slides.md

# Preview on a specific port without auto-open
pnpm exec slidev presentations/speckit/slides.md --port 3031 --open false
```

## Build

```bash
# Build a static SPA for hosting
pnpm exec slidev build presentations/speckit/slides.md
```

> **Note:** Use `pnpm exec slidev build` rather than `pnpm slidev build` — the `pnpm slidev`
> script prepends `--open`, which conflicts with the `build` subcommand.

## Export

```bash
# Export to PDF (requires Chrome or Edge)
pnpm exec slidev export presentations/speckit/slides.md
```

## Files

| File | Purpose |
|------|---------|
| `slides.md` | Slide content and Slidev front matter |
| `style.css` | Custom CSS overrides for the presentation |
| `images/` | Images referenced in slides |
| `OUTLINE.md` | Talk structure and timing breakdown |
| `EXTENDED-OUTLINE.md` | Detailed per-slide speaker notes and content plan |
