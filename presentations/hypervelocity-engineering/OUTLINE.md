# Hypervelocity Engineering: From Concept to Code with HVE-Core — Presentation Outline

## Metadata

| Field | Value |
|-------|-------|
| **Title** | Hypervelocity Engineering: From Concept to Code with HVE-Core |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 90 minutes |
| **Target Audience** | Engineers, architects, engineering leads, and AI-assisted development practitioners |
| **Event / Context** | Technical deep-dive session; suitable for internal engineering groups, partner workshops, and conference breakouts |
| **Created** | 2026-04-13 |
| **Last Updated** | 2026-04-13 |
| **Status** | Draft |

## Objectives

What should attendees take away from this presentation?

1. Understand why traditional engineering processes break down in the AI-assisted coding era and how Hypervelocity Engineering (HVE) addresses these challenges through disciplined, outcome-driven practices.
2. Know the four pillars of HVE, its principles, and how HVE-Core operationalizes them with production-ready agents, collections, and a 9-stage AI-assisted project lifecycle.
3. Deeply understand the RPI (Research → Plan → Implement → Review) methodology, including why constraining AI by phase produces dramatically better outcomes than unconstrained "vibe coding."
4. Be able to install HVE-Core, run a complete RPI workflow soup-to-nuts on a real task, and use GitHub Backlog Manager for issue lifecycle management.
5. Leave with a concrete adoption path: install the extension, try RPI on a real task, and scale to team-level adoption.

## Narrative Thread

The presentation follows a "concept → hands-on" arc split into two distinct halves:

**Part 1 — HVE as a Concept (30 min)**: Opens with the real-world problem (AI tools making teams faster at building the wrong thing), introduces HVE as the disciplined response, walks through the four pillars and principles, then bridges to HVE-Core as the tooling that operationalizes these ideas.

**Part 2 — HVE-Core Deep Dive (60 min)**: Dives into the RPI methodology with a live soup-to-nuts demo building a Node.js CLI app using the full Research → Plan → Implement → Review cycle. Then covers GitHub Backlog Manager with a live demo, and closes with adoption guidance.

The throughline: *"AI doesn't need to be smarter — it needs to be constrained. HVE-Core constrains AI at exactly the right moments to produce verified, traceable, production-quality outcomes."*

---

## Slide Outline

### 1. Title Slide

- **Template Slide**: 1 — Title Hero
- **Layout**: Full-screen dark hero with title, subtitle, presenter metadata, and theme badges
- **Content**:
  - Eyebrow: `HVE · HVE-Core · RPI · GitHub Copilot`
  - Title: "Hypervelocity Engineering" / "From Concept to Code with HVE-Core"
  - Subtitle: "A 90-minute deep dive into disciplined AI-assisted engineering — from the *why* of HVE to hands-on RPI workflows and GitHub Backlog Manager."
  - Presenter: Daniel Scott-Raynsford (DSR), Sr. Partner Solution Architect, Cloud & AI Apps, Microsoft EPS
  - Badges:
    - 🧠 HVE Concepts — Principles & pillars
    - 🛠️ HVE-Core — Agents, collections, lifecycle
    - 🔬 RPI Workflow — Research → Plan → Implement → Review
    - 🎬 Live Demos — Soup-to-nuts app build
- **Speaker Notes**: Welcome everyone. This is a 90-minute session split into two halves. First 30 minutes covers HVE as a concept — why it exists and what it means. Last 60 minutes is hands-on with HVE-Core: we'll do a full RPI workflow building a real app, then look at GitHub Backlog Manager. This is demo-heavy by design.
- **Duration**: ~1 min
- **Animations**: None

### 2. About Me

- **Template Slide**: 2 — About Me (VS Code Card)
- **Layout**: VS Code window-style presenter card
- **Content**: Standard DSR bio in VS Code JSON format (reuse from template)
- **Speaker Notes**: Quick intro — 60 seconds max. Mention background as a recovering software engineer, now focused on helping engineering teams adopt AI-assisted practices.
- **Duration**: ~1 min
- **Animations**: Typewriter effect on JSON lines

### 3. Agenda

- **Template Slide**: 3 — Agenda Cards
- **Layout**: Multi-card agenda with demo pills
- **Content**:
  - Card 01: **The AI Engineering Problem** — Why speed without rigor is dangerous
  - Card 02: **What is HVE?** — Four pillars, principles, and engineering fundamentals
  - Card 03: **HVE-Core Overview** — Collections, lifecycle, roles, and tooling
  - Card 04: **RPI Deep Dive** — The methodology that makes AI reliable
  - Card 05: **Getting Started** — Install, adopt, scale
  - Demo pills:
    - 🎬 Demo 1: RPI Soup-to-Nuts — Build a Node.js CLI app with full RPI
    - 🎬 Demo 2: GitHub Backlog Manager — Automated issue lifecycle
- **Speaker Notes**: Quick scan of the agenda. Flag that Part 2 (cards 04-05) is demo-heavy. The RPI demo is the centerpiece — 20 minutes of live workflow.
- **Duration**: ~1 min
- **Animations**: Cards appear sequentially

---

### PART 1 — HVE AS A CONCEPT (30 minutes)

---

### 4. Section Divider — Part 1: Why HVE?

- **Template Slide**: 16 — Hero Quote
- **Layout**: Single quote with visual emphasis
- **Content**:
  - Quote: *"The most dangerous outcome of AI-assisted engineering isn't bad code — it's solving the wrong problem faster than ever before."*
  - Attribution: Opening framing for HVE
- **Speaker Notes**: Set the tone. This isn't about AI being bad — it's about AI being fast and confidently wrong without the right guardrails. That's the problem HVE was built to solve.
- **Duration**: ~1 min
- **Animations**: Fade-in quote

### 5. The AI Engineering Problem

- **Template Slide**: 5 — Before/After Comparison
- **Layout**: Two-column comparison: "Vibe Coding" vs "Disciplined AI Engineering"
- **Content**:
  - **Left — "Vibe Coding" (the problem)**:
    - AI writes first, thinks never
    - Invents plausible patterns instead of using verified ones
    - No traceability — "the AI wrote it this way"
    - Tribal knowledge stays in your head
    - Frequent rework when assumptions fail
    - Solving wrong problems faster
  - **Right — "Disciplined AI Engineering" (the goal)**:
    - Research before implementing
    - Uses verified existing patterns with file/line citations
    - Full traceability through research documents
    - Knowledge transfer through artifacts anyone can follow
    - Rare rework because assumptions are validated
    - Solving the right problems with confidence
  - Callout: *"The gap isn't model quality — it's process quality."*
- **Speaker Notes**: The core insight: AI coding assistants can't tell the difference between investigating and implementing. When you ask for code, they write code — without verifying patterns match existing modules or APIs actually exist. This is the fundamental problem HVE addresses. Reference the MLADS+ session framing: reliability, governance, auditability.
- **Duration**: ~5 min
- **Animations**: v-clicks on each bullet pair, callout last

### 6. What is Hypervelocity Engineering?

- **Template Slide**: 4 — Banner Content
- **Layout**: Banner with content body
- **Content**:
  - HVE is *a practical way of working to deliver high-value AI outcomes*
  - Not a framework to impose — a set of principles and practices to adopt
  - Focuses on: right problems, right context, right people, responsible AI
  - Applies to any engineering team, not just FDE/ISE
  - Originated from Microsoft ISE (Industry Solutions Engineering) field experience
  - Key distinction: HVE is the *methodology*; HVE-Core is the *tooling* that operationalizes it
- **Speaker Notes**: Emphasize that HVE is a way of working, not a product. It emerged from real project delivery at Microsoft ISE. The four pillars coming next are the structural foundation. The tooling (HVE-Core) came later to codify these practices into reusable agents and workflows.
- **Duration**: ~3 min
- **Animations**: v-clicks on each bullet

### 7. The Four Pillars of HVE

- **Template Slide**: 8 — Product Pillar Grid
- **Layout**: Branded three-pillar grid (adapted to four pillars)
- **Content**:
  - **Pillar 1 — Multidisciplinary Teams**: Tight teams with deep domain expertise. Not just developers — includes designers, PMs, security architects, data scientists. The "crew model."
  - **Pillar 2 — Design Thinking**: Focused on business value, not technology features. Understand the problem before building the solution. Human-centered design integrated into engineering.
  - **Pillar 3 — Production-Ready Starting Points**: HVE Accelerators — proven, battle-tested templates and patterns. Don't start from scratch; start from something that works.
  - **Pillar 4 — AI Agents & Tools**: AI across the full lifecycle — not just code generation. Research, planning, implementation, review, backlog management, security assessment, documentation.
- **Speaker Notes**: Walk through each pillar. Pillar 4 is where HVE-Core lives, but emphasize that the tooling only works because Pillars 1-3 provide the foundation. Without the right team (P1), the right problem (P2), and the right starting point (P3), even the best AI tooling (P4) will produce the wrong outcome faster.
- **Duration**: ~5 min
- **Animations**: Each pillar card appears on click

### 8. Principles in Action

- **Template Slide**: 12 — 2×2 Overview Grid
- **Layout**: Four-card grid for the six principles
- **Content**:
  - **Iterate in small steps** — Small, verifiable increments. Each step produces a testable artifact.
  - **Validate and verify** — Don't assume AI output is correct. Check against reality.
  - **Prioritize business value** — Every engineering decision ties back to a business outcome.
  - **Embed security and quality** — Not bolted on at the end. Security, observability, and responsible AI are woven into every phase.
  - Supporting text: Also includes "Include users in the team" and "Leverage team expertise"
- **Speaker Notes**: These principles sound obvious, but they're the ones most often violated when teams adopt AI tooling without discipline. "Iterate in small steps" is directly why RPI breaks work into separate phases. "Validate and verify" is why the Task Reviewer exists as a separate agent.
- **Duration**: ~3 min
- **Animations**: v-clicks on each card

### 9. Engineering Fundamentals & Measuring Success

- **Template Slide**: 14 — Governance Grid
- **Layout**: Three governance columns with good/bad examples
- **Content**:
  - **Column 1 — Engineering Fundamentals**:
    - Security, observability, and responsible AI embedded throughout
    - Automated testing, monitoring, and governance
    - AI + accelerators drastically reduce the cost of fundamentals
  - **Column 2 — Measuring Success**:
    - Outcome-driven metrics from day one
    - Avoid activity without impact
    - Measure what matters: business value delivered, not story points
  - **Column 3 — Avoiding Pitfalls**:
    - ❌ Don't bolt AI onto Scrum and call it done
    - ❌ Don't skip research and jump to implementation
    - ✅ Rebuild processes around AI capabilities
    - ✅ Use guardrails that make AI reliable, not just fast
- **Speaker Notes**: The cost reduction point is key. When AI handles boilerplate (tests, docs, CI config), teams can afford engineering fundamentals they previously skipped due to time pressure. The pitfalls column is the transition to HVE-Core — the tooling that prevents these anti-patterns.
- **Duration**: ~4 min
- **Animations**: Columns reveal sequentially

### 10. HVE-Core: The Tooling Layer

- **Template Slide**: 4 — Banner Content
- **Layout**: Banner content slide
- **Content**:
  - **HVE-Core** = AI-Driven Software Development Across the Full Lifecycle
  - Production-ready agents, reusable prompts, coding instructions, and executable skills for GitHub Copilot
  - Structured workflows (RPI), schema-enforced quality gates, role-specific tooling
  - Install from VS Code Marketplace: `ise-hve-essentials.hve-core`
  - Two options: **HVE Core All** (221 artifacts) or **HVE Installer** (selective)
  - Open source: <https://github.com/microsoft/hve-core>
- **Speaker Notes**: This is the bridge slide. Everything we've discussed as principles (HVE) is now operationalized as tooling (HVE-Core). The extension installs agents, prompts, instructions, and skills directly into your GitHub Copilot environment. It's not a separate product — it enhances GitHub Copilot with structured workflows.
- **Duration**: ~3 min
- **Animations**: v-clicks on bullets

### 11. Transition to Part 2

- **Template Slide**: 16 — Hero Quote
- **Layout**: Quote emphasis
- **Content**:
  - Quote: *"The solution isn't teaching AI to be smarter. It's preventing AI from doing certain things at certain times."*
  - Subtext: Part 2 — Let's see how this works in practice.
- **Speaker Notes**: This is the key insight from the RPI methodology. It's counterintuitive: you make AI better by giving it *less* freedom, not more. When the Task Researcher knows it cannot implement, it stops optimizing for "plausible code" and starts optimizing for "verified truth." Now let's go hands-on.
- **Duration**: ~1 min
- **Animations**: Quote fade-in

---

### PART 2 — HVE-CORE DEEP DIVE (60 minutes)

---

### 12. Section Divider — RPI: Research → Plan → Implement → Review

- **Template Slide**: 16 — Hero Quote
- **Layout**: Section transition
- **Content**:
  - "RPI: Research → Plan → Implement → Review"
  - "Transforming uncertainty into verified, traceable, production-quality code"
- **Speaker Notes**: We're now in the hands-on half. Everything from here is about how RPI actually works and why it produces better outcomes.
- **Duration**: ~0.5 min
- **Animations**: Fade-in

### 13. Why RPI Works — The Core Insight

- **Template Slide**: 5 — Before/After Comparison
- **Layout**: Two-column comparison
- **Content**:
  - **Without RPI** (left column):
    - AI writes first, thinks never — it's the only mode when research and implementation aren't separated
    - "This looks like a reasonable variable name. I'll use `prefix`."
    - Invents plausible patterns
    - No traceability
    - Frequent rework
  - **With RPI** (right column):
    - Task Researcher finds: "12 existing modules in this repository use `resource_prefix`, not `prefix`. See `variables.tf#L47`."
    - Uses verified existing patterns
    - Every decision traced to specific files and line numbers
    - Research documents anyone can follow
    - Rare rework
  - Quality comparison table:

    | Aspect | Without RPI | With RPI |
    |---|---|---|
    | Pattern matching | Invents plausible | Uses verified existing |
    | Traceability | "The AI wrote it" | "Research cites lines 47-52" |
    | Knowledge transfer | Tribal knowledge | Research docs anyone follows |
    | Rework | Frequent | Rare |

- **Speaker Notes**: The `prefix` vs `resource_prefix` example is the killer demo-ready anecdote. When the Task Researcher is constrained to research-only mode, it actually reads the codebase and finds existing patterns. When it's in unconstrained mode, it guesses — and guesses plausibly but incorrectly. That's the insight. RPI makes this structural, not accidental.
- **Duration**: ~4 min
- **Animations**: v-clicks alternating columns, table last

### 14. The Four Phases of RPI

- **Template Slide**: 11 — Workflow Pipeline
- **Layout**: Horizontal process flow with detail cards
- **Content**:
  - Flow: **Research** → `/clear` → **Plan** → `/clear` → **Implement** → `/clear` → **Review**
  - Phase cards:
    1. **Research** (Task Researcher): Investigate codebase, external APIs, documentation. Document findings with evidence. Create ONE recommended approach. Output: `research.md`
    2. **Plan** (Task Planner): Create coordinated planning files with checkboxes. Link specs to research with line numbers. Output: `plan.instructions.md` + `details.md`
    3. **Implement** (Task Implementor): Execute plan task by task with verification. Track changes in changes log. Stop controls for review. Output: code + `changes.md`
    4. **Review** (Task Reviewer): Validate against research and plan specs. Check convention compliance. Run lint/build/test. Output: `review.md`
  - Critical rule callout: **Clear context between phases** — `/clear` or new chat session
- **Speaker Notes**: Walk through each phase. Emphasize the `/clear` between phases — this is context engineering. Each agent has different instructions; accumulated context from earlier phases causes the model to drift. The artifacts (research.md, plan.md, etc.) carry context through files on disk, not chat history. This is the key architectural decision.
- **Duration**: ~5 min
- **Animations**: Pipeline flow left-to-right, detail cards on click

### 15. Context Engineering — Why `/clear` Matters

- **Template Slide**: 19 — Mermaid Diagram
- **Layout**: Diagram with supporting callout
- **Content**:
  - Mermaid: Token ratio degradation diagram
    - At start: 3K system prompt = 30% of 10K conversation → instructions dominate
    - After RPI: 3K system prompt = 1.5% of 200K conversation → instructions drowned
  - LLM recency bias: model pattern-matches to dominant behavior in context window
  - Why `/clear` works:
    - Eliminates 50K-200K tokens of accumulated context
    - Restores token ratio so system prompt instructions dominate
    - Artifacts carry context through files, not chat
  - Signs of context degradation:
    - Agent skips phases
    - Agent ignores system prompt instructions
    - Output quality drops
    - Agent echoes earlier conversation patterns
  - When to use `/compact` vs `/clear`:
    - `/compact`: Mid-phase when conversation is long but you need to continue
    - `/clear`: Always between phases
- **Speaker Notes**: This is the technical explanation for why RPI uses separate agents and context clearing. It's not a workaround — it's deliberate context engineering. The model's attention mechanism gives progressively less weight to system instructions as the conversation grows. By clearing between phases, each agent starts fresh with its own instructions at full strength.
- **Duration**: ~3 min
- **Animations**: Diagram builds, then callout

### 16. When to Use RPI

- **Template Slide**: 5 — Before/After Comparison
- **Layout**: Two-column: "Use RPI" vs "Don't Need RPI"
- **Content**:
  - **Use RPI when**:
    - Changes span multiple files
    - Learning new patterns or APIs
    - External dependencies involved
    - Requirements are unclear
    - Team needs knowledge transfer
  - **Don't need RPI when**:
    - Fixing a typo
    - Adding a log statement
    - Refactoring < 50 lines
    - Change is obvious and self-contained
  - **Rule of thumb**: *"If you need to understand something before implementing, use RPI."*
  - **Escalation path**: Start with `rpi-agent` for speed; if complexity appears, hand off to Task Researcher for strict RPI.
  - **Strict RPI vs rpi-agent**:
    - Strict: Deep research, no context contamination, complete audit trail. Best for complex/unfamiliar/team work.
    - rpi-agent: Moderate research, inline context, summary only. Best for simple/familiar/solo work.
- **Speaker Notes**: Be honest about when RPI is overkill. The rule of thumb is the key message. Also mention the escalation path — many teams start with rpi-agent for everything and escalate to strict RPI when they hit complexity. That's fine.
- **Duration**: ~2 min
- **Animations**: v-clicks on bullets

### 17. Demo 1 Title — RPI Soup-to-Nuts: Building a Node.js CLI App

- **Template Slide**: 13 — Demo Title Slide
- **Layout**: Dramatic demo transition with checklist and timing
- **Content**:
  - Demo title: "RPI Soup-to-Nuts: Build a Node.js CLI App"
  - What we'll build: A simple Node.js CLI tool that fetches and summarizes GitHub repository stats
  - What you'll see:
    - ✅ Task Researcher investigates GitHub API, existing patterns, and CLI frameworks
    - ✅ `/clear` → Task Planner creates implementation plan with checkboxes
    - ✅ `/clear` → Task Implementor builds the app following the plan
    - ✅ `/clear` → Task Reviewer validates against research and plan
  - Timing: ~20 min
  - Prerequisites shown: VS Code with HVE-Core extension, GitHub Copilot, Node.js 18+
- **Speaker Notes**: Frame the demo. We're going to build a real (small) app from scratch using the full RPI cycle. The audience should watch for: (1) how the Task Researcher discovers real patterns instead of guessing, (2) the quality of the plan output with line references, (3) how the Implementor follows the plan systematically, (4) the Review phase catching anything we missed.
- **Duration**: ~1 min
- **Animations**: Checklist items appear sequentially

### 18. Demo 1 — Research Phase

- **Template Slide**: 15 — Code and Terminal Panels
- **Layout**: Side-by-side code and terminal
- **Content**: LIVE DEMO
  - Show VS Code with HVE-Core extension installed
  - Run: `/task-research GitHub repo stats CLI tool using Node.js`
  - Talk through the Task Researcher's autonomous investigation:
    - Searching for existing CLI patterns in the workspace
    - Investigating GitHub REST API endpoints
    - Evaluating CLI frameworks (Commander, yargs, etc.)
    - Documenting findings with sources and line references
  - Show the output: `research.md` with evidence-backed recommendations
  - Highlight: ONE recommended approach with rationale
- **Speaker Notes**: Let the audience see the researcher work. Point out the specific line references and file citations. Call out when it discovers existing patterns vs. when it would have guessed without research. Show the research.md artifact — this is the knowledge transfer document that persists long after the chat session ends.
- **Duration**: ~5 min
- **Animations**: None (live demo)
- **Discussion / Thoughts**: If time is tight, pre-record this segment. Have a fallback research.md to show if the live demo has issues.

### 19. Demo 1 — Plan Phase

- **Template Slide**: 15 — Code and Terminal Panels
- **Layout**: Side-by-side
- **Content**: LIVE DEMO
  - Show `/clear` — emphasize the context clearing
  - Run: `/task-plan` (auto-switches to Task Planner)
  - Talk through the planner reading research.md and creating:
    - `plan.instructions.md` — phased checklist with tasks
    - `details.md` — detailed specifications linked to research
  - Highlight: Line number references back to research findings
  - Highlight: Dependency ordering between tasks
- **Speaker Notes**: Point out that the planner validates research exists before proceeding — it won't plan without evidence. Show the checkbox structure — this is what the Implementor will follow. The line references are the traceability chain: Plan → Research → Source.
- **Duration**: ~4 min
- **Animations**: None (live demo)

### 20. Demo 1 — Implement Phase

- **Template Slide**: 15 — Code and Terminal Panels
- **Layout**: Side-by-side
- **Content**: LIVE DEMO
  - Show `/clear` — second context clearing
  - Run: `/task-implement` (auto-switches to Task Implementor)
  - Talk through implementation:
    - Reads plan phase by phase, task by task
    - Implements following workspace conventions from research
    - Tracks changes in `changes.md`
    - Pauses at phase stops for review (phaseStop=true by default)
  - Show the working CLI tool: `node cli.js --repo microsoft/hve-core`
- **Speaker Notes**: The key moment is when the Implementor follows the plan systematically rather than improvising. Point out the changes log — every modification is tracked. If there's a phaseStop pause, explain that this is the governance checkpoint. The audience should see that the code follows the patterns identified in research, not invented ones.
- **Duration**: ~6 min
- **Animations**: None (live demo)

### 21. Demo 1 — Review Phase

- **Template Slide**: 15 — Code and Terminal Panels
- **Layout**: Side-by-side
- **Content**: LIVE DEMO
  - Show `/clear` — third context clearing
  - Run: `/task-review` (auto-switches to Task Reviewer)
  - Talk through the review:
    - Validates implementation against research and plan specs
    - Checks convention compliance using instruction files
    - Runs validation commands (lint, build, test)
    - Identifies any follow-up work
  - Show the output: `review.md` with findings
  - Highlight iteration paths: Complete → Commit, Needs Rework → Implement, Research Gap → Research, Plan Gap → Plan
- **Speaker Notes**: The Review phase is the quality gate. Show the reviewer checking against the actual research findings — not just "does the code work" but "does the code match what we learned." If there are findings, show the iteration path. The handoff buttons (📋 Create Plan, ⚡ Implement, ✅ Review) make it easy to loop back.
- **Duration**: ~4 min
- **Animations**: None (live demo)

### 22. RPI Recap — What Just Happened

- **Template Slide**: 11 — Workflow Pipeline
- **Layout**: Pipeline summary
- **Content**:
  - Recap the full cycle:
    - **Research**: 20-60 min autonomous investigation → `research.md`
    - **Plan**: Structured implementation plan → `plan.instructions.md` + `details.md`
    - **Implement**: Systematic execution → working code + `changes.md`
    - **Review**: Validation against specs → `review.md`
  - Artifacts persist in `.copilot-tracking/` — knowledge transfer, audit trail, onboarding material
  - Session persistence: 💾 Save → resume with `/checkpoint continue`
  - Quick start commands: `/task-research`, `/task-plan`, `/task-implement`, `/task-review`
- **Speaker Notes**: Brief recap — consolidate what the demo showed. Emphasize the artifact chain as the lasting value. These files outlive the chat session and serve as documentation, onboarding material, and audit trail. The `.copilot-tracking/` directory is gitignored by convention but the artifacts are invaluable.
- **Duration**: ~2 min
- **Animations**: v-clicks on each phase

### 23. GitHub Backlog Manager

- **Template Slide**: 4 — Banner Content
- **Layout**: Banner content
- **Content**:
  - Automates issue lifecycle management across GitHub repositories
  - **Five workflows**:
    1. **Discovery** — Finds and categorizes issues from multiple sources (user-centric, artifact-driven, search-based)
    2. **Triage** — Assigns labels (17-label taxonomy), assesses priority, detects duplicates (4-aspect similarity)
    3. **Sprint Planning** — Organizes triaged issues into milestones with capacity awareness (6-step milestone discovery)
    4. **Execution** — Creates/updates/closes issues, tracks operations with checkboxes via handoff files
    5. **Quick Add** — Single-issue shortcut for filing one issue with standard labels/milestone
  - **Autonomy levels**: Full (all auto), Partial (default — gates on create/close), Manual (gates on everything)
- **Speaker Notes**: The Backlog Manager is one of the most mature agents in HVE-Core. It handles the full issue lifecycle — from discovering what needs to be done (Discovery) through organizing it into sprints (Sprint Planning) to actually creating and managing GitHub issues (Execution). The autonomy levels let teams tune how much control they retain vs. delegate to the agent.
- **Duration**: ~5 min
- **Animations**: v-clicks on each workflow

### 24. GitHub Backlog Manager — When to Use

- **Template Slide**: 5 — Before/After Comparison
- **Layout**: Two-column fit/not-needed
- **Content**:
  - **Good fit**:
    - Managing 20+ open issues across a repository
    - Multiple contributors need consistent triage
    - Sprint planning requires milestones and capacity tracking
    - Cross-repo issue discovery needed
  - **Not needed**:
    - Fewer than 10 issues
    - Single maintainer with full context
    - No milestone-based planning
    - All issues come from a single source
- **Speaker Notes**: Be honest about scope. The Backlog Manager shines at scale — when you have enough issues that manual triage becomes a bottleneck. For small repos with a single maintainer, it's overkill. The sweet spot is teams with 20-100 open issues across one or more repos.
- **Duration**: ~2 min
- **Animations**: v-clicks

### 25. Demo 2 Title — GitHub Backlog Manager in Action

- **Template Slide**: 13 — Demo Title Slide
- **Layout**: Demo transition
- **Content**:
  - Demo title: "GitHub Backlog Manager — Automated Issue Lifecycle"
  - What you'll see:
    - ✅ Discovery: Finding issues from a sample repo
    - ✅ Triage: Label assignment and priority assessment
    - ✅ Sprint Planning: Milestone organization
    - ✅ Quick Add: Filing a single issue
  - Timing: ~8 min
- **Speaker Notes**: This demo shows the Backlog Manager's workflows in sequence. We'll use a real GitHub repo and show how the agent discovers, triages, and organizes issues. The Quick Add at the end shows the single-issue shortcut for when you just need to file one thing.
- **Duration**: ~1 min
- **Animations**: Checklist appears

### 26. Demo 2 — GitHub Backlog Manager Live

- **Template Slide**: 15 — Code and Terminal Panels
- **Layout**: Side-by-side
- **Content**: LIVE DEMO
  - Show the Backlog Manager workflows in VS Code:
    - Discovery: Agent scans repo for issues from multiple sources
    - Triage: Show the 17-label taxonomy being applied
    - Sprint Planning: Milestone assignment with capacity awareness
    - Quick Add: Single issue creation
  - Highlight: Autonomy level controls (Partial default — gates on create/close)
  - Show the handoff files used between workflows
- **Speaker Notes**: Talk through the autonomy levels as you demo. Show that the agent proposes but waits for approval at gates (Partial mode). If time allows, show how switching to Full autonomy mode changes the experience. Point out the handoff files — these are the mechanism for workflow chaining.
- **Duration**: ~8 min
- **Animations**: None (live demo)
- **Discussion / Thoughts**: Have a pre-prepared repo with existing issues for the demo. If live GitHub access is unreliable, have screenshots/recording as fallback.

### 27. Design Thinking Integration (Brief)

- **Template Slide**: 11 — Workflow Pipeline
- **Layout**: Pipeline showing DT → RPI connection
- **Content**:
  - HVE-Core includes Design Thinking as a first-class collection (58 artifacts)
  - 9-method, 3-space framework: Problem → Solution → Validation
  - Three exit points from Design Thinking into RPI:
    - After Method 3 (Input Synthesis) → Problem statement → Task Researcher
    - After Method 6 (Lo-Fi Prototypes) → Validated concept → Task Researcher
    - After Method 9 (Iteration at Scale) → Implementation spec → Task Researcher
  - Two DT agents: `dt-coach` (guides all 9 methods), `dt-learning-tutor` (teaches curriculum)
- **Speaker Notes**: Quick mention — don't go deep. The point is that HVE-Core isn't just about implementation. Design Thinking helps teams understand the problem before RPI helps them solve it. The exit points ensure a clean handoff from "understanding the problem" to "building the solution."
- **Duration**: ~2 min
- **Animations**: v-clicks on exit points

### 28. Getting Started — Your First 15 Minutes

- **Template Slide**: 17 — Action Grid
- **Layout**: Three action cards
- **Content**:
  - **Action 1 — Install (1 min)**:
    - Install the HVE-Core extension from VS Code Marketplace
    - Extension ID: `ise-hve-essentials.hve-core`
    - Add `.copilot-tracking/` to your `.gitignore`
  - **Action 2 — First Research (5 min)**:
    - Pick a real task from your backlog
    - Run `/task-research <describe your task>`
    - Read the output `research.md` — see the difference from unconstrained AI
  - **Action 3 — Full RPI Workflow (15 min)**:
    - Continue with `/task-plan` → `/task-implement` → `/task-review`
    - Remember: `/clear` between each phase
    - Compare the result to what you'd get from a single unstructured prompt
- **Speaker Notes**: Make this actionable. The goal is that every attendee can do this within 15 minutes of returning to their desk. The "compare" step in Action 3 is important — it makes the value concrete. When people see the difference between RPI output and unstructured output on the same task, they're converted.
- **Duration**: ~3 min
- **Animations**: Action cards appear sequentially

### 29. Scaling Adoption

- **Template Slide**: 6 — Evolution Strip
- **Layout**: Progression strip with maturity arrow
- **Content**:
  - **Level 1 — Individual**: One engineer uses RPI on personal tasks. Install extension, try it, see the difference.
  - **Level 2 — Team**: Team adopts hve-core + github collections. Shared `.copilot-tracking/` conventions. Research artifacts become team knowledge.
  - **Level 3 — Organization**: Multiple teams use HVE-Core with governance. Collections curated per role. Ambassador program for evangelism and feedback.
  - Supporting resources:
    - HVE Foundations (L100 Viva Learning course)
    - HVE and FDE Essentials (L200 Viva Learning course)
    - HVE-Core Ambassador Program
- **Speaker Notes**: Adoption is progressive. Don't try to roll out all 221 artifacts to an entire org at once. Start with one engineer, one task, one RPI cycle. The ambassador program exists to help scale from Level 1 to Level 3 — ambassadors evangelize, collect use cases, and provide feedback.
- **Duration**: ~3 min
- **Animations**: Progression levels appear left-to-right

### 30. Key Takeaways

- **Template Slide**: 18 — Key Takeaways
- **Layout**: Numbered takeaway list with progressive reveal
- **Content**:
  1. **HVE is a way of working**, not a product — four pillars of multidisciplinary teams, design thinking, production-ready starting points, and AI tooling.
  2. **HVE-Core operationalizes HVE** with 221 artifacts across 12 collections, covering 10 engineering roles and a 9-stage project lifecycle.
  3. **RPI constrains AI by phase** — when AI can't implement, it stops guessing and starts verifying. This produces dramatically better, traceable outcomes.
  4. **Context engineering matters** — `/clear` between phases isn't a workaround, it's the architectural decision that makes RPI work.
  5. **Start small**: Install the extension, try RPI on one real task, then scale to your team.
- **Speaker Notes**: Reinforce the key messages. The paradigm shift: "Stop asking AI 'write this code.' Start asking 'help me research, plan, then implement with evidence.'" The learning curve is real — the first workflow feels slower. By the third feature, it's natural. The value compounds over time.
- **Duration**: ~3 min
- **Animations**: v-clicks on each takeaway

### 31. Resources & Links

- **Template Slide**: 10 — Tools and Resources Grid
- **Layout**: Linkable resource cards
- **Content**:
  - **HVE-Core Documentation**: <https://microsoft.github.io/hve-core/docs/>
  - **HVE Guide**: <https://microsoft.github.io/hve-core/docs/hve-guide/>
  - **RPI Methodology**: <https://microsoft.github.io/hve-core/docs/rpi/>
  - **GitHub Backlog Manager**: <https://microsoft.github.io/hve-core/docs/agents/github-backlog/>
  - **Getting Started**: <https://microsoft.github.io/hve-core/docs/getting-started/>
  - **GitHub repo**: <https://github.com/microsoft/hve-core>
  - **VS Code Extension**: `ise-hve-essentials.hve-core` (VS Code Marketplace)
  - **Context Engineering**: <https://microsoft.github.io/hve-core/docs/rpi/context-engineering>
- **Speaker Notes**: Show the QR code or links slide. Encourage attendees to start with the Getting Started page — it has a 1-min → 5-min → 15-min progressive path.
- **Duration**: ~1 min
- **Animations**: Cards appear

### 32. Thank You / Q&A

- **Template Slide**: 21 — Thank You / Q&A
- **Layout**: Closing slide with links and call-to-action
- **Content**:
  - Thank you message
  - Contact: Daniel Scott-Raynsford
  - Links: GitHub (@PlagueHO), LinkedIn, Web
  - Call to action: "Install HVE-Core today. Try RPI on your next task. See the difference."
  - Q&A open
- **Speaker Notes**: Open for questions. Keep answers concise. For deep technical questions, offer to follow up offline. Remind people of the "install → try → scale" path.
- **Duration**: ~5 min
- **Animations**: Fade-in

---

## Demos

| # | Demo Title | Description | Slide Reference | Prep Required |
|---|-----------|-------------|-----------------|---------------|
| 1 | RPI Soup-to-Nuts: Node.js CLI App | Full Research → Plan → Implement → Review cycle building a GitHub repo stats CLI tool | Slides 17-21 | Node.js 18+ installed, HVE-Core extension, GitHub Copilot, empty project directory, GitHub token for API access. Pre-build a fallback version of each artifact (research.md, plan.md, working CLI) in case live demo has issues. |
| 2 | GitHub Backlog Manager | Discovery → Triage → Sprint Planning → Quick Add workflows on a real GitHub repository | Slides 25-26 | A GitHub repo with 10+ existing issues of varying quality. Pre-label a few, leave most unlabeled. Ensure GitHub MCP server is configured. Have screenshots as fallback. |

## Demo 1 — Detailed Script: RPI Soup-to-Nuts

### Scenario

Build a Node.js CLI tool (`gh-repo-stats`) that fetches GitHub repository statistics (stars, forks, issues, contributors) and displays them in a formatted table.

### Step-by-step

1. **Setup** (pre-demo):
   - Create empty directory: `mkdir gh-repo-stats && cd gh-repo-stats`
   - Run `npm init -y`
   - Open in VS Code with HVE-Core extension active

2. **Research Phase** (~5 min):
   - Open Copilot Chat, invoke: `/task-research Create a Node.js CLI tool that fetches GitHub repository stats (stars, forks, issues, top contributors) and displays them in a formatted terminal table. Should use the GitHub REST API without authentication for public repos.`
   - Talk through the researcher's actions:
     - Investigating GitHub REST API endpoints (`/repos/{owner}/{repo}`, `/repos/{owner}/{repo}/contributors`)
     - Evaluating CLI frameworks (Commander.js recommended)
     - Evaluating table formatting (cli-table3 or similar)
     - Documenting API response shapes and rate limits
   - Show the output `research.md` — point out evidence and line references

3. **Plan Phase** (~4 min):
   - `/clear` — emphasize this is mandatory
   - Invoke: `/task-plan`
   - Show the planner reading research.md
   - Show output: `plan.instructions.md` with phased tasks:
     - Phase 1: Project setup and dependencies
     - Phase 2: GitHub API client module
     - Phase 3: CLI argument parsing
     - Phase 4: Table formatting and display
     - Phase 5: Error handling and edge cases
   - Show `details.md` with specifications linked back to research

4. **Implement Phase** (~6 min):
   - `/clear`
   - Invoke: `/task-implement`
   - Show the implementor working through the plan:
     - Installing dependencies (commander, cli-table3, node-fetch)
     - Creating the API client module
     - Building the CLI entry point
     - Adding table formatting
   - Run the tool: `node cli.js --repo microsoft/hve-core`
   - Show the formatted output

5. **Review Phase** (~4 min):
   - `/clear`
   - Invoke: `/task-review`
   - Show the reviewer checking:
     - Does the implementation match research findings?
     - Are coding conventions followed?
     - Does it handle edge cases identified in research?
   - Show `review.md` output

6. **Wrap-up** (~1 min):
   - Show the full `.copilot-tracking/` directory with all artifacts
   - Highlight: These artifacts are the lasting value — documentation, audit trail, onboarding

### Fallback Plan

If the live demo fails at any phase:

- Have pre-built artifacts (`research.md`, `plan.instructions.md`, `details.md`, `changes.md`, `review.md`) ready in a backup directory
- Have a working version of `gh-repo-stats` pre-built to show the end result
- Can switch to showing pre-recorded video segments

---

## Resources & Links

- HVE-Core home: <https://microsoft.github.io/hve-core/>
- HVE-Core documentation: <https://microsoft.github.io/hve-core/docs/>
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
- VS Code extension: `ise-hve-essentials.hve-core` (Marketplace)
- HVE Foundations (L100): Viva Learning course
- HVE and FDE Essentials (L200): Viva Learning course

## Evolution Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-13 | Initial outline created | New presentation — HVE concept + HVE-Core deep dive with RPI demos |
