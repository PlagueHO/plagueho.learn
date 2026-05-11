---
source_url: https://github.com/copilot-dev-days/agentic-workflows-workshop
source_title: GitHub DevDays Agentic Workflows Workshop
source_date: 2026-05-12
source_type: Workshop Repository
area: concepts
dimensions:
  - hands_on_learning
  - practical_examples
  - workshop_exercises
  - getting_started
extracted: 2026-05-12
quality: draft
---

# GitHub DevDays Agentic Workflows Workshop — Hands-On Overview

## Workshop Purpose & Structure

The **Agentic Workflows Workshop** is a hands-on learning experience provided by GitHub for DevDays 2025+ participants. It bridges the gap between concepts and practical implementation through three structured exercises.

**Repository**: https://github.com/copilot-dev-days/agentic-workflows-workshop

**Delivery Format**:
- Self-paced markdown-based content in `workshop/` directory
- Published interactive site: https://copilot-dev-days.github.io/agentic-workflows-workshop
- Step viewer renders markdown dynamically
- Estimated total time: 60 minutes

## Repository Structure

```
agentic-workflows-workshop/
├── docs/              # Published HTML site (GitHub Pages)
│   ├── index.html     # Landing page
│   ├── step.html      # Step viewer (renders workshop/ markdown)
│   ├── styles.css
│   ├── light-theme.css
│   └── theme-toggle.js
├── workshop/          # Workshop content (markdown)
│   ├── README.md              # Workshop overview
│   ├── 00-prereqs.md          # Prerequisites & tooling
│   ├── 01-first-exercise.md   # Exercise 1 – Quick Start
│   ├── 02-second-exercise.md  # Exercise 2 – Hacker News Digest
│   ├── 03-chatops-sentiment.md # Exercise 3 – ChatOps Sentiment
│   ├── 04-review.md           # Review & Next Steps
│   └── images/                # Screenshots and diagrams
├── .github/
│   ├── copilot-instructions.md
│   └── workflows/deploy.yml
├── README.md
└── LICENSE (MIT)
```

## Three Core Exercises

### Exercise 1: Quick Start (20 minutes)
**Topics**: CLI setup, first workflow creation, understanding the compile-run cycle

**Hands-On Tasks**:
- `gh aw init` — Initialize repository for agentic workflow development
- Create a simple daily digest workflow
- Run `gh aw compile` to generate lock file
- Trigger manual execution with `gh aw run`
- Observe outputs and artifacts

**Learning Outcomes**:
- Basic CLI workflow
- Frontmatter vs. markdown body
- Compilation process
- Manual trigger mechanics

---

### Exercise 2: Hacker News Daily Digest (20 minutes)
**Topics**: Event triggers, MCP integration, external API tools, custom instructions

**Hands-On Tasks**:
- Create a workflow with `schedule: daily` trigger
- Configure MCP tools for external API integration (HackerNews)
- Write natural language instructions for digest generation
- Customize the workflow behavior
- Debug and iterate

**Learning Outcomes**:
- Working with external APIs via MCP
- Scheduling triggers
- Tool configuration in frontmatter
- Customization patterns
- Real-world example combining features

---

### Exercise 3: ChatOps Sentiment Analysis (20 minutes)
**Topics**: Event-driven triggers, command triggers, tool calling, collaboration patterns

**Hands-On Tasks**:
- Create a workflow triggered by `/sentiment` command comments
- Implement multi-tool workflow (GitHub API + sentiment analysis)
- Handle role-based access control
- Use safe outputs for structured responses
- Build collaborative workflow

**Learning Outcomes**:
- Command-based triggers (/command syntax)
- RBAC configuration
- Safe outputs with structured data
- Event-driven patterns
- Team collaboration scenarios

---

## Prerequisites & Setup

**Technical Requirements**:
- GitHub CLI (gh) v2.0.0+
- Write access to GitHub repository
- GitHub Actions enabled in repository
- GitHub Copilot access (subscription)
- Operating system: Linux, macOS, or Windows with WSL
- Terminal comfort level: Intermediate

**Verification Steps**:
```bash
gh --version           # Verify CLI
gh aw --version        # Verify extension installed
```

## Prerequisites Checklist (from workshop)

- [ ] GitHub account created
- [ ] GitHub CLI installed and authenticated
- [ ] Copilot subscription active (required for Copilot engine)
- [ ] Repository with Actions enabled (create test repo if needed)
- [ ] Personal access token with Copilot permissions configured
- [ ] Terminal experience (comfortable with command line)

## Localization & Accessibility

**Available Languages**:
- English (default)
- Portuguese (Brasil) — README.pt_BR.md
- Spanish — README.es.md

**Accessibility Features**:
- Theme toggle (light/dark mode)
- Responsive step viewer
- Markdown-based content (screen reader friendly)

## Getting Started Path

1. **Read Overview**: Start at workshop/README.md
2. **Check Prerequisites**: Review 00-prereqs.md
3. **Exercise 1**: Quick Start (gh aw init, first workflow)
4. **Exercise 2**: HackerNews Digest (external APIs, scheduling)
5. **Exercise 3**: ChatOps Sentiment (events, commands, collaboration)
6. **Review & Next Steps**: Consolidate learning, explore advanced patterns

## Key Takeaways for Workshop Participants

### For Developers
- Agentic workflows are accessible through simple markdown
- Natural language instructions replace shell scripts
- Safe outputs provide write operation validation
- Iterations involve changing markdown, not rewriting YAML

### For DevOps Engineers
- Strong security defaults enable autonomous automation
- Gradual adoption: start simple (daily reports) → add complexity (event triggers, tools)
- Debugging and iteration supported by CLI tools
- Patterns are reusable (install from Agentics collection)

### For Platform Teams
- MCP integration enables extensibility
- Role-based access control fits team structures
- Threat detection customizable per domain
- Network isolation prevents data exfiltration

## Connection to Broader Ecosystem

**Related Resources**:
- Agentics collection: 30+ pre-built workflow examples
- Peli's Agent Factory blog: Community examples and inspiration
- GitHub Copilot documentation: Official SDK and APIs
- DevDays 2026: Additional sessions on advanced patterns

**Post-Workshop Progression**:
1. Complete basic exercises (this workshop)
2. Explore Agentics collection workflows
3. Build custom workflows for your repository
4. Share patterns with your team
5. Contribute examples back to community

---

## Key Conceptual Bridges

**From Theory to Practice**:
- **Concept**: Agentic workflows are markdown + natural language
- **Exercise 1 Demo**: Create and compile your first workflow (30 seconds to working automation)

- **Concept**: Safe outputs prevent direct writes
- **Exercise 2 Demo**: Safely generate and create issues/PRs without write tokens

- **Concept**: Tools enable external integrations
- **Exercise 3 Demo**: Query external APIs and GitHub simultaneously within safe guardrails

## Questions Raised

- How do workshop participants choose which patterns apply to their repositories?
- What's the success rate for developers moving from exercise 3 → building their own workflows?
- How are edge cases (API failures, unexpected outputs) handled in practice?
