# Agentic .NET AppMod – What works, what doesn't and how to fix it

A 45-minute, unplugged, demo-heavy presentation on lessons learned from a week
with the Microsoft .NET AppMod CAT team (Jay Schmelzer, Taylor Southwick)
modernizing a 10M LOC, 30-year-old application at scale with partner Vista in
New Zealand.

## Target Audience

Agentic DevOps partners

## Running

```bash
# Dev server with hot reload (from repo root)
pnpm exec slidev presentations/agentic-dotnet-appmod/slides.md

# Build static SPA
pnpm exec slidev build presentations/agentic-dotnet-appmod/slides.md

# Export to PDF
pnpm exec slidev export presentations/agentic-dotnet-appmod/slides.md
```

## Structure

| File/Folder | Purpose |
|-------------|---------|
| `slides.md` | Main Slidev presentation (21 slides including 4 demo markers) |
| `OUTLINE.md` | Living outline tracking content evolution |
| `style.css` | Custom theme (adapted from agentic-development-evolution) |
| `images/` | Slide images (QR code, diagrams) |
| `demos/` | Demo scripts for 4 live demos |
| `sample-app/` | Sample .NET Framework app for demo purposes |

## Key Themes

1. **No magic single-click** — large-scale AppMod requires structured approach
2. **Skills > Prompts** — 20+ skills built in 4 days, prompts fading away
3. **Dependency layers** — leaf-first, small PRs, always shippable
4. **Go async** — parallelization is where the 10× comes from
5. **The 100× pattern** — /troubleshoot + update skill = compounding improvement
