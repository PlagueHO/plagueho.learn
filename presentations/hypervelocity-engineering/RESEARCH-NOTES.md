# Hypervelocity Engineering — Research Notes

Collected 2026-04-13. Sources: WorkIQ Loop document, HVE-Core public docs.

## Source 1 — WorkIQ: "HVE-Core Training Materials Search"

### What is HVE (from Loop doc)

- A practical way of working to deliver high-value AI outcomes
- Focuses on right problems, context, people, and responsible AI
- Applies to FDE and non-FDE teams alike

### Four Pillars of HVE

1. Tight multidisciplinary teams with deep domain expertise
2. Design thinking focused on business value
3. Proven, production-ready starting points (HVE Accelerators)
4. AI agents and tools across the full lifecycle

### Principles in Action

- Iterate in small steps
- Validate and verify
- Include users in the team
- Prioritize business value
- Embed security and quality
- Leverage team expertise

### Engineering Fundamentals

- Security, observability, and responsible AI embedded throughout
- Automated testing, monitoring, and governance
- AI + accelerators drastically reduce cost of fundamentals

### Challenges of the AI Engineering Age

- Risks of low-rigor vibe coding
- Solving the wrong problem faster
- Using AI without reliable context or data

### Measuring Success & Avoiding Pitfalls

- Outcome-driven metrics from day one
- Avoid activity without impact
- Rebuild processes, don't just bolt AI onto Scrum

---

## Source 2 — HVE-Core Public Documentation

### What is HVE-Core

AI-Driven Software Development Across the Full Lifecycle. Gives teams production-ready agents, reusable prompts, coding instructions, and executable skills for GitHub Copilot. Provides structured workflows (Research → Plan → Implement), schema-enforced quality gates, and role-specific tooling across 10 engineering disciplines.

### Installation

- VS Code Marketplace extension: `ise-hve-essentials.hve-core`
- Two options: HVE Core All (221 artifacts) or HVE Installer (selective)
- Add `.copilot-tracking/` to `.gitignore`

### Collections (12 domain-specific bundles)

| Collection | Status | Artifacts |
|---|---|---|
| ado | STABLE | 21 |
| coding-standards | STABLE | 22 |
| data-science | STABLE | 18 |
| design-thinking | PREVIEW | 58 |
| experimental | EXPERIMENTAL | 8 |
| github | STABLE | 13 |
| gitlab | EXPERIMENTAL | 2 |
| hve-core | STABLE | 40 |
| jira | EXPERIMENTAL | 13 |
| project-planning | STABLE | 48 |
| rai-planning | EXPERIMENTAL | 12 |
| security | EXPERIMENTAL | 48 |

### 10 Engineering Roles

Engineer, TPM, Tech Lead/Architect, Security Architect, Data Scientist, SRE/Operations, Business Program Manager, New Contributor, UX Designer, Utility

### AI-Assisted Project Lifecycle — 9 Stages

1. Setup — hve-core-installer
2. Discovery — task-researcher, brd-builder, security-planner, dt-coach
3. Product Definition — prd-builder, adr-creation, arch-diagram-builder
4. Decomposition — ado-prd-to-wit, github-backlog-manager
5. Sprint Planning — github-backlog-manager, agile-coach
6. Implementation — RPI agents, prompt-builder, coding-standards (35% of all assignments)
7. Review — task-reviewer, pr-review
8. Delivery — git-merge (prompts/instructions only, zero agents)
9. Operations — doc-ops, incident-response

### RPI Methodology (Research → Plan → Implement → Review)

**Core insight**: AI writes first and thinks never. RPI solves this by preventing AI from doing certain things at certain times.

**Four phases:**

1. **Research** (Task Researcher) — Investigates codebase, external APIs, docs. Documents findings with evidence and sources. Creates ONE recommended approach. Output: `research.md`
2. **Plan** (Task Planner) — Creates coordinated planning files with checkboxes and details. Links specs to research with line numbers. Output: `plan.instructions.md` + `details.md`
3. **Implement** (Task Implementor) — Executes plan task by task with verification. Tracks changes. Supports stop controls. Output: working code + `changes.md`
4. **Review** (Task Reviewer) — Validates implementation against research and plan. Checks convention compliance. Runs lint/build/test. Output: `review.md`

**Critical rule**: Clear context between phases (`/clear` or new chat).

**Why it works**: Without RPI, AI invents plausible patterns. With RPI, AI uses verified existing patterns because it's constrained. The Task Researcher finds "12 existing modules use `resource_prefix`, not `prefix`" because it's in research-only mode.

### Quality comparison

| Aspect | Without RPI | With RPI |
|---|---|---|
| Pattern matching | Invents plausible patterns | Uses verified existing patterns |
| Traceability | "The AI wrote it" | "Research cites lines 47-52" |
| Knowledge transfer | Tribal knowledge | Research docs anyone can follow |
| Rework | Frequent | Rare |

### Context Engineering

- LLM recency bias: 3K system prompt dominates at start, drowns at 50K-200K tokens
- `/clear` eliminates accumulated context, restores system prompt dominance
- Artifacts carry context through files on disk, not chat history
- `/compact` summarizes mid-phase; `/clear` between phases
- Signs of degradation: skipped phases, ignored instructions, shallow analysis

### Strict RPI vs rpi-agent

| Aspect | Strict RPI | rpi-agent |
|---|---|---|
| Research depth | Deep, verified, cited | Moderate, inline |
| Context contamination | Eliminated via /clear | Possible |
| Audit trail | Complete artifacts | Summary only |
| Best for | Complex, unfamiliar, team | Simple, familiar, solo |

### GitHub Backlog Manager

Automates issue lifecycle with five workflows:

1. **Discovery** — Finds/categorizes issues from multiple sources
2. **Triage** — 17-label taxonomy, priority assessment, duplicate detection
3. **Sprint Planning** — Milestones with capacity awareness
4. **Execution** — Creates/updates/closes issues via handoff files
5. **Quick Add** — Single-issue shortcut

Autonomy levels: Full, Partial (default), Manual

### Design Thinking Integration

9-method, 3-space framework: Problem → Solution → Validation
Three exit points to RPI at methods 3, 6, and 9
Two agents: dt-coach, dt-learning-tutor

### Agent Systems

- RPI Orchestration: 5 agents
- Code Review: 3 agents
- GitHub Backlog: 1 agent
- ADO Backlog: 1 agent
- Project Planning: 5 agents
- Security Planning: 2 agents
- RAI Planning: 1 agent
- Design Thinking: 2 agents
- Utility: 1 agent

---

## Source 3 — Key URLs

- HVE-Core home: <https://microsoft.github.io/hve-core/>
- HVE-Core docs: <https://microsoft.github.io/hve-core/docs/>
- HVE Guide: <https://microsoft.github.io/hve-core/docs/hve-guide/>
- RPI methodology: <https://microsoft.github.io/hve-core/docs/rpi/>
- Why RPI works: <https://microsoft.github.io/hve-core/docs/rpi/why-rpi>
- Context engineering: <https://microsoft.github.io/hve-core/docs/rpi/context-engineering>
- Task Researcher: <https://microsoft.github.io/hve-core/docs/rpi/task-researcher>
- Task Planner: <https://microsoft.github.io/hve-core/docs/rpi/task-planner>
- Task Implementor: <https://microsoft.github.io/hve-core/docs/rpi/task-implementor>
- Using RPI together: <https://microsoft.github.io/hve-core/docs/rpi/using-together>
- GitHub Backlog Manager: <https://microsoft.github.io/hve-core/docs/agents/github-backlog/>
- Getting started: <https://microsoft.github.io/hve-core/docs/getting-started/>
- Installation: <https://microsoft.github.io/hve-core/docs/getting-started/install>
- Collections: <https://microsoft.github.io/hve-core/docs/getting-started/collections>
- Architecture: <https://microsoft.github.io/hve-core/docs/architecture/>
- Design Thinking: <https://microsoft.github.io/hve-core/docs/design-thinking/>
- GitHub repo: <https://github.com/microsoft/hve-core>
- VS Code extension: `ise-hve-essentials.hve-core`
