# GitHub Agentic Workflows — Presentation Outline

*Introduction deck for GitHub DevDays 2026 workshop. 8 slides. High-level, L200.*
*To be converted to slides using the "Agentic DevOps L200 deck" PowerPoint template via Cowork.*

---

## Slide 1 — Title / Intro

**Layout**: Full-bleed hero slide

**Title**: GitHub Agentic Workflows

**Subtitle**: Automate your repository with AI — on a schedule, on an event, or on demand.

**Visual**: Full-width atmospheric image — a developer's repository represented as a living system;
morning light, issues being triaged and PRs reviewed automatically in the background.
GitHub Octocat logo + GitHub Next / Microsoft Research attribution in footer.

**Speaker notes**: Welcome the audience. Set the scene — *"Imagine waking up each morning to find
your repository already triaged, CI failures already diagnosed, and a daily health report waiting
for you."*

---

## Slide 2 — Agenda

**Layout**: Clean agenda card with numbered list

**Title**: What we'll cover

**Content** (numbered list):
1. What are GitHub Agentic Workflows?
2. How they work — the compilation model & security
3. Practical examples — what you can build
4. GitHub integration — triggers, tools, safe outputs
5. Workshop exercises (hands-on today!)
6. Resources & next steps

**Visual**: Minimal icon strip — one icon per agenda item (e.g. robot, shield, workflows, GitHub
logo, hands-on keyboard, link). No decorative clutter.

---

## Slide 3 — What Are GitHub Agentic Workflows?

**Layout**: Split layout — definition left, comparison table right

**Title**: Automation that *understands* your repository

**Left panel — definition block**:
> GitHub Agentic Workflows let you define repository automation in **Markdown files**
> that run as AI-powered agents inside GitHub Actions. Write natural language instructions
> — let Copilot, Claude, or Codex understand context, make decisions, and take action —
> all with built-in security guardrails.

Key points (bullet list):
- Written in **Markdown**, not complex YAML
- Triggered by **any GitHub Actions event** — schedule, issue opened, PR, `/command`, and more
- Powered by **GitHub Copilot, Claude, or OpenAI Codex**
- Part of the **Copilot Customization** ecosystem — the automated tier of GitHub AI

**Right panel — comparison table**:

| | Traditional Workflows | Agentic Workflows |
|---|---|---|
| Authored in | YAML + shell scripts | Markdown + natural language |
| Decision-making | Fixed if/then logic | AI understands context and adapts |
| Write operations | Direct API calls | Buffered via Safe Outputs |
| Security model | Token-based | 5-layer defense-in-depth |
| Maintenance | Update scripts | Edit natural language |

**Visual**: Small Copilot Customization hierarchy diagram at the bottom showing where Agentic
Workflows sit: *Custom Instructions → Prompt Files → Custom Agents → Agent Skills → MCP Servers →
**Agentic Workflows** (automated, unattended)*

---

## Slide 4 — How They Work

**Layout**: Three-step flow diagram with supporting annotations

**Title**: Write it. Compile it. Run it.

**Central visual — horizontal 3-step flow**:

```
┌──────────────────┐    gh aw compile    ┌────────────────────┐    GitHub Actions   ┌──────────────────┐
│  workflow.md     │ ─────────────────→  │  workflow.lock.yml │ ─────────────────→  │  AI Agent Runs   │
│  (Markdown)      │                     │  (Secure YAML)     │                     │  (Copilot, etc.) │
│  Frontmatter +   │                     │  SHA-pinned,       │                     │  Read-only token │
│  Natural Language│                     │  security-hardened │                     │  Sandboxed       │
└──────────────────┘                     └────────────────────┘                     └──────────────────┘
                                                                                            │
                                                                                            ↓
                                                                             ┌──────────────────────────┐
                                                                             │  Safe Outputs Artifact   │
                                                                             └──────────────┬───────────┘
                                                                                            │
                                                                              ┌─────────────▼──────────┐
                                                                              │  Threat Detection Job  │
                                                                              │  (AI-powered scan)     │
                                                                              └─────────────┬──────────┘
                                                                                   ✓ safe  │  ✗ blocked
                                                                              ┌────────────▼──────────┐
                                                                              │  Write Job             │
                                                                              │  (Scoped token, gated) │
                                                                              └───────────────────────┘
```

**Annotations alongside flow**:
- *Step 1*: The `.md` file is the human-editable source of truth. Only frontmatter changes need recompilation.
- *Step 2*: `gh aw compile` validates schema, pins action SHAs, and enforces security policies.
- *Step 3*: The agent runs **read-only**. All writes are buffered as artifacts, scanned, then applied by a separate scoped job.

**Key security callout box** (right side):
> **5 Security Layers**
> 1. Read-only agent token
> 2. Zero secrets in agent process
> 3. Network firewall (domain allowlist)
> 4. Safe Outputs (buffered, gated writes)
> 5. AI-powered threat detection

---

## Slide 5 — Practical Examples

**Layout**: 2×3 card grid (or 3-column tiles)

**Title**: What can you automate?

**6 example tiles** (icon + title + one-line description each):

| Tile | Icon | Title | Description |
|------|------|-------|-------------|
| 1 | 📋 | **Issue Triage** | Auto-label and comment on new issues by type and priority |
| 2 | 🩺 | **CI Doctor** | When a build fails, diagnose root cause and create a fix report |
| 3 | 📰 | **Daily Status Report** | Morning summary of repo activity, PRs, and recommendations |
| 4 | 🔍 | **Code Review Assistant** | Automated PR review comments and nitpick suggestions |
| 5 | 📚 | **Documentation Updater** | Keep docs in sync with code changes automatically |
| 6 | 🔒 | **Security Scanner** | Daily malicious code scan across the repository |

**Bottom callout**:
> 🧩 **Agentics Collection** — 30+ ready-to-use workflows from GitHub Next at
> [github.com/githubnext/agentics](https://github.com/githubnext/agentics).
> Install in one command: `gh aw add-wizard githubnext/agentics/<name>`

**Visual note**: Each tile should be a clean card with a coloured icon and short label. The callout
is a highlighted box at the bottom spanning full width.

---

## Slide 6 — GitHub Integration

**Layout**: Two-column layout — Triggers left, Safe Outputs right — with a small tools callout below

**Title**: Native GitHub integration — triggers, tools, and safe outputs

**Left column — Triggers**:

> Agentic Workflows support all GitHub Actions triggers plus extensions:

| Pattern | Trigger | Example use |
|---------|---------|-------------|
| DailyOps | `schedule: daily` | Status reports, code improvements |
| IssueOps | `issues: [opened]` | Triage, moderation |
| ChatOps | `/command` comment | On-demand maintainer actions |
| LabelOps | `issues: [labeled]` | React to label changes |
| Monitoring | `workflow_run` | CI failure diagnosis |
| Manual | `workflow_dispatch` | Testing, ad-hoc runs |

**Right column — Safe Outputs**:

> The agent **never writes directly**. All write operations are pre-approved types:

- `create-issue` — Create GitHub issues
- `add-comment` — Comment on issues / PRs
- `create-pull-request` — Open a pull request
- `add-labels` — Apply labels from an allowlist
- `dispatch-workflow` — Trigger another workflow

**Bottom tools callout**:
> **Tools & MCP**: Workflows access GitHub capabilities via the GitHub MCP server
> (issues, PRs, code search, workflow runs). Custom MCP servers and inline `mcp-scripts:`
> let you connect to external APIs and services.

---

## Slide 7 — Workshop Exercises

**Layout**: Workshop-style slide with exercise table and callout

**Title**: Today's workshop — build it yourself

**Intro text**:
> In the hands-on lab following this talk, you will build three real workflows from scratch:

**Exercise table**:

| # | Exercise | What you'll build | Time |
|---|----------|-------------------|------|
| 0 | **Prerequisites** | Install `gh aw`, authenticate, init repo | 10 min |
| 1 | **Quick Start** | Daily issue & PR digest workflow | 20 min |
| 2 | **Hacker News Digest** | Custom workflow surfacing HN stories as issues | 20 min |
| 3 | **ChatOps Sentiment Analysis** | Slash command for inline HN comment analysis | 20 min |
| 4 | **Review & Next Steps** | Recap and further reading | 5 min |

**Tips callout box**:
> **Tips for success**
> - Be specific in your prompts — context improves agent output
> - Read the generated workflow file — it helps you tune it
> - Iterate — add constraints and re-run if needed
> - Watch for new issues — that's where the agent posts its results

**Workshop link**: `https://copilot-dev-days.github.io/agentic-workflows-workshop/`

---

## Slide 8 — Resources & Next Steps

**Layout**: Resource card grid with a "next steps" action strip at the bottom

**Title**: Where to go next

**Resource cards** (2-column grid):

| Resource | URL |
|----------|-----|
| 📖 Official Docs | https://github.github.com/gh-aw/ |
| ⚡ Quick Start Guide | https://github.github.com/gh-aw/setup/quick-start/ |
| 🔐 Security Architecture | https://github.github.com/gh-aw/introduction/architecture/ |
| 🧩 Agentics Sample Collection | https://github.com/githubnext/agentics |
| 📝 Frontmatter Reference | https://github.github.com/gh-aw/reference/frontmatter/ |
| 🛡️ Safe Outputs Reference | https://github.github.com/gh-aw/reference/safe-outputs/ |
| 📓 Peli's Agent Factory Blog | https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/ |
| 💬 GitHub Blog Announcement | https://github.blog/ai-and-ml/automate-repository-tasks-with-github-agentic-workflows/ |
| 🗣️ Community Feedback | https://github.com/orgs/community/discussions/186451 |
| 🏫 Copilot Academy | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows |

**Bottom action strip**:
> **Get started in 3 steps:**
> 1. `gh extension install github/gh-aw`
> 2. `gh aw init` in your repository
> 3. `gh aw add-wizard githubnext/agentics/daily-repo-status`

**Footer note**: *GitHub Agentic Workflows is in early development — use with caution and human supervision.*

---

*End of outline. 8 slides total.*
*Ready for conversion to Markdown and submission to Cowork using the "Agentic DevOps L200 deck" template.*
