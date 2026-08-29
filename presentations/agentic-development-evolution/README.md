## Agentic Development: From Code Completion to Hypervelocity

A 40-minute Slidev presentation by Daniel Scott-Raynsford about the adoption journey from individual AI-assisted development to governed, organization-wide engineering flow.

The deck is designed for developers, architects, engineering leads, and AI practitioners. It uses a visual maturity model, a seven-layer operating model, and three demonstrations to show how teams move beyond faster code generation.

## Preview

```powershell
pnpm slidev presentations/agentic-development-evolution/slides.md
```

To use a specific port without opening a browser:

```powershell
pnpm exec slidev presentations/agentic-development-evolution/slides.md --port 3031 --open false
```

The repository also includes the **Slidev Presentation Studio** canvas, which discovers every deck under `presentations/` and provides build and preview controls.

## Build

```powershell
pnpm exec slidev build presentations/agentic-development-evolution/slides.md
```

Use `pnpm exec slidev build` rather than `pnpm slidev build`. The repository's `pnpm slidev` script includes `--open`, which conflicts with the build command.

## Export

```powershell
pnpm exec slidev export presentations/agentic-development-evolution/slides.md
```

## Structure

| File | Purpose |
|---|---|
| `slides.md` | Slide content, speaker notes, sources, and navigation |
| `style.css` | Fluent-inspired presentation visual system |
| `components/LineIcon.vue` | Reusable line-icon component |
| `images/` | QR code and supporting demonstration assets |
| `OUTLINE.md` | Slide order, timing, and narrative structure |
| `EXTENDED-OUTLINE.md` | Detailed speaker cues, evidence, and demo flow |

## Design principles

- One concept per slide.
- Prefer paths, rails, layers, and feedback loops over repeated card grids.
- Keep essential meaning visible without hover or animation.
- Use progressive reveal only when it supports the spoken narrative.
- Link factual milestones and product signals to authoritative sources.
- Preserve keyboard focus, readable contrast, and the native 1280 × 720 canvas.

## Key sources

- [GitHub Changelog](https://github.blog/changelog/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Agent Skills](https://agentskills.io/)
- [HVE Core](https://microsoft.github.io/hve-core/)
