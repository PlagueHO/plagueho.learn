# Agentic Development Evolution — Extended Outline

This document is the deep-reference companion to [OUTLINE.md](OUTLINE.md). It covers every concept in the presentation in detail, with supporting principles, direct documentation quotes, and reference links. Use it to distill content back into slides, speaker notes, and demo scripts.

---

## Section 1 — Agentic First Means Operating Model, Not Prompt Tricks

Use imnage: section-1-vscode-top-committers.png

### 1.1 VS Code Insiders and GitHub Copilot CLI as Defaults

Teams with tolerance for preview cadence default to **VS Code Insiders** because the agent platform moves faster than the stable release cycle. New skills, MCP features, subagent capabilities, and hook behaviors land in Insiders weeks before stable. For teams adopting agentic patterns at the operating-model level, the preview channel becomes the pragmatic default.

**GitHub Copilot CLI** has become the second essential default. It is evolving from a shell wrapper into an orchestration layer for the entire agent ecosystem — plugin marketplace management, agent selection and routing, model choice and configuration, skill discovery and installation, and workflow execution with `--yolo` for auto-approval of tool calls.

Key CLI commands include `/plugin marketplace add <repo>` and `/plugin install <plugin>` for skill and plugin management.

The CLI connects to the same skills, agents, and MCP infrastructure that VS Code uses, creating a unified orchestration surface regardless of whether you work in an IDE or a terminal.

Together, VS Code Insiders and Copilot CLI form the **minimum viable toolchain** for teams operating at the agentic level. Insiders is where you author, debug, and observe; the CLI is where you orchestrate, install, and automate.

### 1.2 The Copilot Customization Hierarchy

The single most important structural change in the last six months is the emergence of a **seven-layer customization stack** that transforms Copilot from a chat assistant into a governed engineering platform.

| Layer | File / Asset | Trigger | Purpose |
|-------|-------------|---------|---------|
| Custom instructions | `.github/copilot-instructions.md`, `.github/instructions/*.instructions.md` | **Automatic** — always injected | Repo-wide or path-scoped coding standards, conventions, and context. Less is more. Don't overload. |
| Prompt files | `.github/prompts/*.prompt.md` | **Manual** — user references in chat | Reusable task templates with input variables |
| Custom agents | `.github/agents/AGENT-NAME.md` (repo), org/enterprise via `.github-private` | **Manual** — user selects from dropdown | Specialist persona with tool restrictions and scoped instructions |
| Subagents | Runtime process, not a file | **Automatic** or direct prompt reference | Isolated child agents spawned for delegated tasks, have their own context window |
| Agent skills | `.github/skills/<skill-name>/SKILL.md` or `~/.copilot/skills/` | **Automatic** — Copilot selects when relevant | Demand-loaded expertise bundles with scripts and assets, enable greater Determinism |
| Hooks | `.github/hooks/*.json` | **Automatic** — lifecycle event trigger | Deterministic shell commands at specific agent workflow points |
| MCP servers | `mcp.json` (workspace or user) | **Automatic** or by name | External system, API, and database integration |

**Source**: [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)

#### Why this hierarchy matters

The hierarchy represents a spectrum from **always-on / low-detail** to **on-demand / high-detail**:

- **Instructions** = what the AI always knows
- **Prompts and agents** = what the AI can be asked to do
- **Skills** = what the AI can discover it needs
- **Hooks** = what must deterministically happen
- **MCP** = what external systems the AI can reach

This replaces the old model where a developer configured AI with custom instructions and hoped for the best. The new model is: **the AI loads the right expertise for each task, executes multi-step workflows with bundled tools, and enforces deterministic lifecycle events**.

### 1.3 Skills over Prompts — The Operating Model Shift

#### What is a skill?

> "Agent skills are folders of instructions, scripts, and resources that Copilot can load when relevant to improve its performance in specialized tasks." — [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

A skill is a **directory** containing a `SKILL.md` (required) plus optional scripts, examples, templates, and reference docs. The `SKILL.md` has YAML frontmatter with `name` and `description` fields that act as semantic triggers for demand-loading.

#### Skills vs. instructions vs. prompts

> "We recommend using custom instructions for simple instructions relevant to almost every task (for example information about your repository's coding standards), and skills for more detailed instructions that Copilot should only access when relevant." — [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)

| Dimension | Instructions | Prompt files | Skills |
|-----------|-------------|-------------|--------|
| Activation | Always on | Manual invocation | Demand-loaded by agent |
| Scope | Broad standards | Single-task template | Multi-step workflow |
| Content | Text only | Text with variables | Directory with scripts, examples, assets |
| Context cost | Always in window | On-demand | Only when relevant |
| Best for | Conventions, style | Checklists, reviews | Complex workflows, bundled tools |

#### Why demand-loading matters

Skills are **not always injected**. The agent reads the skill description and decides whether to load the full content based on the current task. This means:

1. No wasted context window on irrelevant instructions
2. The agent self-selects expertise it needs
3. Scales to hundreds of capabilities without bloating every interaction
4. Context remains focused and relevant

#### The agentskills.io open standard

> "A simple, open format for giving agents new capabilities and expertise." — [agentskills.io](https://agentskills.io/)

Originally developed by Anthropic and released as an open standard, now adopted by 15+ agent products: GitHub, VS Code, Claude Code, Cursor, OpenAI Codex, Roo Code, Amp, OpenHands, Qodo, and others.

Four capability areas:

1. **Domain expertise** — package specialized knowledge
2. **New capabilities** — give agents new abilities
3. **Repeatable workflows** — consistent, auditable multi-step tasks
4. **Interoperability** — same skill works across different agent products

> "For teams and enterprises: Capture organizational knowledge in portable, version-controlled packages." — [agentskills.io](https://agentskills.io/)

#### The fundamental shift

- **Old model**: Developer writes instructions → AI follows them every time
- **New model**: Developer packages domain expertise into skills → AI discovers and loads the right expertise per task → AI executes multi-step workflows with bundled tools

#### Increasing reliability with Sensei

Demand-loading only works if the agent can reliably match the right skill to the current task. Poor frontmatter — vague descriptions, missing triggers, missing anti-triggers — causes **skill collision**: the agent invokes the wrong skill, or fails to invoke the right one.

[Sensei](https://spboyer.github.io/sensei/) is a skill-quality tool that iteratively improves frontmatter compliance using the **Ralph loop** pattern (Read → Score → Improve → Verify → Check → Summary). It targets a **Medium-High** compliance level — the sweet spot between routing accuracy and token efficiency.

**What bad frontmatter looks like:**

```yaml
---
name: pdf-processor
description: 'Process PDF files for various tasks'
---
```

Problems: no triggers (agent does not know when to activate), no anti-triggers (agent does not know when NOT to use it), description too brief for accurate matching.

**After one Sensei pass:**

```yaml
---
name: pdf-processor
description: |
  Process PDF files including text extraction,
  rotation, and merging.
  USE FOR: "extract PDF text", "rotate PDF",
  "merge PDFs", "split PDF", "PDF to text",
  "combine PDF files".
  DO NOT USE FOR: creating new PDFs
  (use document-creator), extracting images
  (use image-extractor), or OCR on scanned
  documents (use ocr-processor).
---
```

**Scoring levels:**

| Level | Criteria |
|-------|---------|
| Low | No triggers, short description |
| Medium | Has triggers, missing anti-triggers |
| Medium-High | Triggers + anti-triggers present (target) |
| High | Full routing clarity with INVOKES declarations |

**Usage:**

```bash
npx skills add spboyer/sensei          # Install
# Then in Copilot Chat:
Run sensei on my-skill-name            # Improve a single skill
Run sensei on my-skill-name --fast     # Skip tests for faster iteration
Run sensei on all skills               # Batch-improve every skill
```

The key insight is that **skill reliability is a frontmatter quality problem, not a model intelligence problem**. Sensei makes the description field do the routing work so the agent can self-select accurately.

**Sources**:

- [Sensei](https://spboyer.github.io/sensei/)
- [Sensei on GitHub](https://github.com/spboyer/sensei)
- [Ralph loop pattern](https://github.com/soderlund/ralph)

### 1.4 The Skills Ecosystem — Federated Distribution

Three-tier distribution model:

| Tier | Repository | Purpose |
|------|-----------|---------|
| Community | [github/awesome-copilot](https://github.com/github/awesome-copilot) | Open marketplace — community contributed, curated |
| Vendor/team | [dotnet/skills](https://github.com/dotnet/skills) | Official team-maintained skills for a technology domain |
| Personal | [PlagueHO/plagueho.skills](https://github.com/PlagueHO/plagueho.skills) | Individual curated marketplace, upstream contribution pipeline |

All three tiers follow the same canonical layout:

```text
plugins/<plugin-name>/
  plugin.json
  skills/
    <skill-name>/
      SKILL.md
```

#### dotnet/skills — team-maintained example

10 plugin bundles covering .NET core, data, diagnostics, MSBuild, NuGet, upgrades, MAUI, AI/ML, template engine, and testing. 704 stars, 39 contributors, 57 forks.

Distribution paths:

- Copilot CLI / Claude Code: `/plugin marketplace add dotnet/skills`
- VS Code: Add `"chat.plugins.marketplaces": ["dotnet/skills"]` to settings
- OpenAI Codex CLI: `skill-installer install <url>`

**Source**: [dotnet/skills](https://github.com/dotnet/skills)

#### PlagueHO/plagueho.skills — personal marketplace example

8 plugin bundles covering Azure architecture, infrastructure deployment, content and learning, developer environment, .NET modernization, GitHub workflows, skill lifecycle, and awesome-copilot discovery.

Demonstrates the **federated governance model**: individuals curate and test skills locally, then promote proven ones upstream to community repos.

**Source**: [PlagueHO/plagueho.skills](https://github.com/PlagueHO/plagueho.skills)

#### awesome-copilot — the community hub

27k stars, 313 contributors. Curates agents, instructions, skills, plugins, hooks, agentic workflows, cookbook recipes, and a learning hub. Machine-readable `llms.txt` for AI agent consumption.

**Source**: [github/awesome-copilot](https://github.com/github/awesome-copilot)

### 1.5 Model Context Protocol (MCP) — The Tool Integration Standard

#### What is MCP?

> "MCP (Model Context Protocol) is an open-source standard for connecting AI applications to external systems."
>
> — [modelcontextprotocol.io](https://modelcontextprotocol.io/)

The analogy that best captures MCP's role:

> "Think of MCP like a USB-C port for AI applications. Just as USB-C provides a standardized way to connect electronic devices, MCP provides a standardized way to connect AI applications to external systems."
>
> — [MCP Introduction](https://modelcontextprotocol.io/introduction)

#### Why MCP matters: the N×M problem

Without a standard, every AI application (N) must build custom integrations for every tool/data source (M). MCP reduces this to N+M: build the tool integration once as an MCP server, and every MCP-capable AI app can use it.

#### Architecture

| Component | Role |
|-----------|------|
| **Host** | The AI application (VS Code, Claude Desktop) that manages MCP clients |
| **Client** | A connector maintained by the host, one per MCP server |
| **Server** | A program that provides tools, resources, and prompts to clients |

#### Three core server-side primitives

1. **Tools** — executable functions the AI can invoke (file ops, API calls, database queries)
2. **Resources** — read-only data sources providing contextual information (file contents, database records, API responses)
3. **Prompts** — reusable templates for structuring LLM interactions

#### Transport layer

- **stdio** — local process communication over stdin/stdout (no network overhead)
- **Streamable HTTP** — remote communication with SSE streaming, OAuth-compatible auth

#### Protocol design

- JSON-RPC 2.0 underneath
- Stateful with capability negotiation handshake
- Dynamic discovery via `notifications/tools/list_changed`
- Open standard under Linux Foundation governance

#### MCP in VS Code / Copilot

Configuration via `.vscode/mcp.json` (team-shared) or user-level config:

```json
{
  "servers": {
    "github": {
      "type": "http",
      "url": "https://api.githubcopilot.com/mcp"
    },
    "playwright": {
      "command": "npx",
      "args": ["-y", "@microsoft/mcp-server-playwright"]
    }
  }
}
```

Security: explicit trust confirmation, macOS/Linux sandboxing, organization policy management, secret management via input variables.

**Sources**:

- [MCP specification](https://modelcontextprotocol.io/)
- [MCP in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

---

## Section 2 — Better Outcomes Came From Determinism, Visibility, and Orchestration

### 2.1 The /troubleshoot Observability Layer

#### The problem

Agentic AI systems are opaque by default. When tools fire (or don't), when instructions load (or don't), when skills activate (or don't), developers have no visibility into why.

Use image: section-2-troubleshoot.jpg

#### What /troubleshoot does

`/troubleshoot` is a built-in VS Code Copilot Chat skill that investigates unexpected agent behavior by analyzing structured **debug log files** (JSONL format).

> "Base conclusions on evidence from logs. Do not guess."

#### Supported investigations

- Why did this request take so long?
- Why was a tool or subagent called?
- Why did instruction, skill, or agent files not load?
- Why was a tool call blocked or failed?
- Why did the model not follow expectations?

#### Event types tracked

| Event | What it captures |
|-------|-----------------|
| `discovery` | Customization file loading — which files were scanned, loaded, skipped and why |
| `tool_call` | Tool invocations with args, results, and errors |
| `llm_request` | Model round-trips with token counts, model name, time-to-first-token |
| `agent_response` | Model output including text and tool calls |
| `user_message` | User input text |
| `subagent` | Subagent invocations with agent name and duration |

#### Event hierarchy

Events form a tree via `spanId`/`parentSpanId`:

```text
user_message
  → llm_request
    → agent_response
      → tool_call
        → next llm_request
```

#### Why this matters

`/troubleshoot` is the **observability layer** for the entire Copilot agentic stack. It answers "Why did the AI do what it did?" — critical because:

- Instructions, skills, and agents are loaded from multiple directories — discovery events show exactly which files were found, loaded, or skipped
- Tool calls can fail silently — logs capture every invocation with args and results
- LLM behavior is non-deterministic — but the decision chain is fully logged
- Performance is observable — every event has `dur` and LLM requests have `ttft` (time-to-first-token)

### 2.2 Spec Kit and Spec-Driven Development (SDD)

#### The core thesis

> "Spec-Driven Development flips the script on traditional software development. For decades, code has been king — specifications were just scaffolding we built and discarded once the 'real work' of coding began. Spec-Driven Development changes this: specifications become executable, directly generating working implementations rather than just guiding them." — [Spec Kit — spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)

#### The power inversion

> "Spec-Driven Development (SDD) inverts this power structure. Specifications don't serve code — code serves specifications. The Product Requirements Document (PRD) isn't a guide for implementation; it's the source that generates implementation." — [Spec Kit — spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)

#### SDD vs. vibe coding

The contrast is fundamental:

- **Vibe coding**: One-shot prompt → code. No structure, no traceability, no determinism.
- **SDD**: Multi-step refinement: specification → plan → tasks → implementation. Each step is structured, traceable, and auditable.

> "This isn't an incremental improvement to how we build software. It's a fundamental rethinking of what drives development." — [Spec Kit — spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)

#### The SDD workflow via Spec Kit commands

| Command | Purpose |
|---------|---------|
| `/speckit.constitution` | Create project governing principles and constraints |
| `/speckit.specify` | Define requirements and user stories — auto-creates feature branch |
| `/speckit.clarify` | Resolve underspecified areas before planning |
| `/speckit.plan` | Create technical implementation plan with rationale |
| `/speckit.tasks` | Generate actionable task list with parallelization markers |
| `/speckit.implement` | Execute all tasks to build the feature |
| `/speckit.analyze` | Cross-artifact consistency and coverage analysis |
| `/speckit.checklist` | Generate quality checklists — "unit tests for English" |

#### The constitutional foundation

The constitution (`memory/constitution.md`) establishes immutable principles:

- **Library-First**: Every feature starts as a standalone library
- **CLI Interface Mandate**: Everything accessible via text-based interfaces
- **Test-First Imperative**: No code before tests (NON-NEGOTIABLE)
- **Simplicity and Anti-Abstraction**: Max 3 projects, use frameworks directly
- **Integration-First Testing**: Real databases over mocks

#### Why specs matter for determinism

> "In this new world, maintaining software means evolving specifications. Debugging means fixing specifications and their implementation plans that generate incorrect code. Refactoring means restructuring for clarity." — [Spec Kit — spec-driven.md](https://github.com/github/spec-kit/blob/main/spec-driven.md)

Templates constrain LLM behavior to enforce:

1. No premature implementation details — focus on WHAT/WHY, not HOW
2. Explicit uncertainty markers — `[NEEDS CLARIFICATION]` instead of guessing
3. Structured checklists — "unit tests for English"
4. Constitutional compliance gates — principles enforced pre-implementation
5. Test-first thinking — contracts and tests before source files
6. No speculative features — everything traces to concrete user stories

**Source**: [Spec Kit](https://github.com/github/spec-kit) — 82.3k stars, 128 contributors

### 2.3 GitHub Agentic Workflows (gh-aw)

#### What are agentic workflows?

> "Write agentic workflows in natural language markdown, and run them in GitHub Actions."
>
> — [GitHub Agentic Workflows](https://github.com/github/gh-aw)

The deeper value proposition:

> "GitHub Agentic Workflows hosts coding agents in GitHub Actions, to perform complex, multi-step tasks automatically. This enables Continuous AI — systematic, automated application of AI to software collaboration."
>
> — [GitHub Agentic Workflows](https://github.com/github/gh-aw)

#### The compilation model

1. Write a `.md` file in `.github/workflows/` with YAML frontmatter (triggers, permissions, tools) + natural-language instructions
2. Run `gh aw compile` to generate a `.lock.yml` — the compiled Actions workflow with security hardening
3. The `.md` is the editable source of truth; `.lock.yml` is the artifact
4. Both are committed to the repo

#### Security architecture — three-layer defense in depth

**Layer 1 — Substrate-Level Trust**: GitHub Actions runner VM, container runtime, AWF network controls (iptables), MCP sandboxing

**Layer 2 — Configuration-Level Trust**: Schema validation, expression allowlists, action SHA pinning, security scanners (actionlint, zizmor, poutine), pre-activation checks

**Layer 3 — Plan-Level Trust**:

- **SafeOutputs**: Agent jobs run with read-only permissions. Write operations are buffered as artifacts and executed by separate jobs with scoped write permissions.
- **Threat Detection Pipeline**: A separate AI agent with a security-focused prompt analyzes outputs before any writes are externalized.
- **Content Sanitization**: @mention neutralization, bot trigger protection, URI filtering, content limits.
- **Secret Redaction**: Automatic scanning and masking before artifact upload.

#### Agent Workflow Firewall (AWF)

Containerizes the agent, routes all HTTP/HTTPS through a Squid proxy with domain allowlisting. Separates filesystem (chroot) from network (proxy).

#### Multi-engine support

Workflows run on GitHub Copilot (default), Claude by Anthropic, or Codex.

#### CLI commands

```bash
gh aw compile                  # Compile markdown to YAML lock file
gh aw compile --watch          # Watch mode for development
gh aw run                      # Trigger a workflow run
gh aw logs                     # Download and analyze run logs
gh aw audit <run-id>           # Investigate a specific run
gh aw status                   # Check workflow health
gh aw init                     # Initialize repository for agentic workflows
```

#### Patterns library

IssueOps, LabelOps, ChatOps, DailyOps, DataOps, MultiRepoOps, Orchestration, SpecOps, TaskOps, and more.

**Source**: [GitHub Agentic Workflows](https://github.com/github/gh-aw)

### 2.4 WorkIQ and Enterprise Context

MCP tools like WorkIQ connect the agentic development surface to enterprise data sources — meetings, emails, documents, Teams messages, and people information from Microsoft 365. This makes prompts like "build me a demo from the meeting about Zava" operational instead of hypothetical because the context is real, current, and accessible via MCP.

---

## Section 3 — Scaling Intelligence Out: From Subagents to Squads

### 3.1 Subagents as a Primitive

#### What are subagents?

Subagents are **specialized, isolated child agents** spawned by a parent agent to perform focused tasks. Three primary types:

| Type | Purpose | Isolation |
|------|---------|-----------|
| `search_subagent` | Fast, read-only codebase exploration | Gets only search query, returns file/snippet locations |
| `execution_subagent` | Iterative command execution with output filtering | Gets only task description, returns command results |
| `runSubagent` | General-purpose delegation to specialized agents | Gets only prompt, returns structured results |

#### The isolation model

- Each subagent runs in its own context — receives only what it needs
- No context contamination between subagents
- Parallel-safe because they are isolated
- Focused tools per subagent type (search tools vs. terminal tools)
- Parent agent acts as orchestrator, deciding what to delegate and how to combine results
- Subagents do NOT share the parent's conversation history
- Subagents do NOT persist state between invocations

#### When to use subagents vs. inline work

| Use subagents when | Do work inline when |
|-------------------|---------------------|
| Exploring or searching a large codebase | You know exactly which file to read |
| Running commands and filtering output | You need full, untruncated output |
| Task can be parallelized | Work has sequential dependencies |
| You need focused, specialized execution | Task is simple enough for one call |

#### Why subagents matter

The key insight is that the context cost of one giant agent handling everything is often higher than the coordination cost of several focused ones. Subagents let the primary agent:

1. **Decompose** — break complex work into specialized units
2. **Parallelize** — execute independent units simultaneously
3. **Isolate** — prevent cross-contamination between unrelated tasks
4. **Focus** — each subagent has tools optimized for its purpose

### 3.2 Squad — Durable Multi-Agent Teams

#### What is Squad?

> "Squad gives you an AI development team through GitHub Copilot. Describe what you're building. Get a team of specialists — frontend, backend, tester, lead — that live in your repo as files. They persist across sessions, learn your codebase, share decisions, and get better the more you use it."
>
> — [Squad](https://github.com/bradygaster/squad)

The key differentiator:

> "It's not a chatbot wearing hats. Each team member runs in its own context, reads only its own knowledge, and writes back what it learned."
>
> — [Squad](https://github.com/bradygaster/squad)

#### The `.squad/` directory structure

```text
.squad/
├── team.md              # Roster — who is on the team
├── routing.md           # Routing — who handles what
├── decisions.md         # Shared brain — team decisions
├── ceremonies.md        # Sprint ceremonies config
├── agents/
│   ├── {name}/
│   │   ├── charter.md   # Identity, expertise, voice
│   │   └── history.md   # What they know about YOUR project
│   └── scribe/
│       └── charter.md   # Silent memory manager
├── skills/              # Compressed learnings from work
├── identity/
│   ├── now.md           # Current team focus
│   └── wisdom.md        # Reusable patterns
└── log/                 # Session history (searchable archive)
```

#### Parallel execution

> "Squad doesn't work on a human schedule. When you give a task, the coordinator launches every agent that can usefully start — simultaneously."
>
> — [Squad](https://github.com/bradygaster/squad)

```text
You: "Team, build the login page"
Lead — analyzing requirements            ⎤
Frontend — building login form           ⎥ all launched
Backend — setting up auth endpoints      ⎥ in parallel
Tester — writing test cases from spec    ⎥
Scribe — logging everything              ⎦
```

#### Memory persistence

> "Knowledge compounds across sessions. Every time an agent works, it writes lasting learnings to its history.md. After a few sessions, agents know your conventions, your preferences, your architecture."
>
> — [Squad](https://github.com/bradygaster/squad)

And critically, it travels with the code:

> "And it's all in git. Anyone who clones your repo gets the team — with all their accumulated knowledge."
>
> — [Squad](https://github.com/bradygaster/squad)

Key persistence mechanisms:

- `decisions.md` — every decision any agent made
- `orchestration-log/` — what was spawned, why, and outcome
- `log/` — full session history, searchable
- Session persistence — if an agent crashes, it resumes from checkpoint

#### Governance in code

File-write guards, PII scrubbing, reviewer lockout — rules enforced in code via the SDK, not just prompt suggestions.

#### SDK-first mode

Teams can define Squad configuration in TypeScript via `squad.config.ts` with `defineSquad()`, `defineTeam()`, `defineAgent()` — typed, testable, version-controlled.

#### Key design principles

1. **Separation of concerns** — each agent has its own context and knowledge
2. **Persistence through git** — `.squad/` is committed; team travels with code
3. **Parallel-first** — coordinator fans out to all relevant agents
4. **Memory compounds** — agents accumulate knowledge across sessions
5. **Governance in code** — SDK hooks enforce rules, not prompts

**Source**: [Squad](https://github.com/bradygaster/squad)

### 3.3 When Multi-Agent Routing Is Worth It

The right question is no longer "which model?" but "what operating shape fits this task?"

Multi-agent coordination adds overhead. It pays off when:

- **Context cost exceeds coordination cost** — if a single agent's context window would need to hold incompatible domains (frontend + backend + testing + security), splitting is cheaper
- **Parallelism has real payoff** — if tasks can run simultaneously and the wall-clock time matters more than the total token cost
- **Persistence matters** — if the team needs to accumulate knowledge across sessions and carry it forward in version control
- **Governance requires separation** — if different roles need different access levels, tool restrictions, or review gates

It does NOT pay off when:

- The task fits comfortably in one context window
- Sequential execution is good enough
- The coordination overhead exceeds the work itself

### 3.4 The New Surface Area: Monitoring, Memory, and Recovery

Multi-agent work becomes practical for real teams when three operational surfaces exist:

1. **Monitoring** — one place to observe active, blocked, and completed work. Squad provides `/status`, `/agents`, `/sessions`. GitHub Agentic Workflows provide `gh aw logs` and `gh aw audit`.

2. **Memory** — persistent team memory and decision logs instead of one-off chat state. Squad persists `decisions.md`, `history.md`, and `wisdom.md` in git. HVE Core accumulates research documents as institutional memory.

3. **Recovery** — paths when a spawned task fails or loses response context. Squad supports checkpoint-based session recovery. GitHub Agentic Workflows support rollback via SafeOutputs.

---

## Section 4 — Agentic Development Is Expanding Beyond Development

### 4.1 HVE Core and the RPI Workflow

#### The core insight

> "AI coding assistants are brilliant at simple tasks and break everything they touch on complex ones. The root cause: AI can't tell the difference between investigating and implementing. When you ask for code, it writes code."
>
> — [HVE Core — RPI](https://microsoft.github.io/hve-core/docs/rpi/)

The root cause diagnosis:

> "AI writes first and thinks never. Not because it's broken, but because that's the only mode it has when you give it unrestricted access to both research and implementation."
>
> — [HVE Core — RPI](https://microsoft.github.io/hve-core/docs/rpi/)

#### The counterintuitive insight

> "The solution isn't teaching AI to be smarter. It's preventing AI from doing certain things at certain times."
>
> — [HVE Core — RPI](https://microsoft.github.io/hve-core/docs/rpi/)

This leads to the most important behavioral insight:

> "When AI knows it cannot implement during research, it stops optimizing for 'plausible code' and starts optimizing for 'verified truth.' The constraint changes the goal."
>
> — [HVE Core — RPI](https://microsoft.github.io/hve-core/docs/rpi/)

#### The four phases

The RPI pipeline is a type transformation:
**Uncertainty → Knowledge → Strategy → Working Code → Validated Code**

1. **Research** (Task Researcher) — "Investigating, Not Guessing"
   - Searches for existing patterns instead of inventing new ones
   - Cites specific files and line numbers as evidence
   - Output: `{{YYYY-MM-DD}}-<topic>-research.md`

2. **Plan** (Task Planner) — "Sequencing, Not Improvising"
   - Transforms verified research into actionable steps
   - Defines clear success criteria for each step
   - Output: Plan and details files with checkboxes

3. **Implement** (Task Implementor) — "Following, Not Inventing"
   - Executes plan task by task using patterns from research
   - No "creative" decisions that break existing patterns
   - Output: Working code + changes log

4. **Review** (Task Reviewer) — "Validating, Not Assuming"
   - Validates implementation against research and plan
   - Runs validation commands (lint, build, test)
   - Can trigger iteration back to earlier phases
   - Output: Review document with findings

#### The critical rule: context clearing

> "Always use /clear or start a new chat between phases. Each custom agent has different instructions. Accumulated context causes confusion."
>
> — [HVE Core — RPI](https://microsoft.github.io/hve-core/docs/rpi/)

#### Quality comparison

| Dimension | Traditional AI | RPI |
|-----------|---------------|-----|
| Pattern matching | Invents plausible patterns | Uses verified existing patterns |
| Traceability | "The AI wrote it this way" | "Research cites lines 47-52" |
| Knowledge transfer | Tribal knowledge in your head | Research documents anyone can follow |
| Rework | Frequent | Rare — assumptions verified first |

#### Practical example

Without RPI, AI thinks: "This looks like a reasonable variable name. I'll use `prefix`."

With RPI, Task Researcher finds: "12 existing modules in this repository use `resource_prefix`, not `prefix`. See `variables.tf#L47` for the established pattern."

#### rpi-agent: autonomous single-session mode

> "rpi-agent requires the runSubagent tool to be available."
>
> — HVE Core docs

The rpi-agent orchestrates all four phases in a single session using subagent dispatch, connecting back to the subagent primitive from Section 3.1.

**Source**: [HVE Core getting started](https://microsoft.github.io/hve-core/docs/getting-started/)

### 4.2 Design Thinking Integration

HVE Core includes a **nine-method, three-space Design Thinking framework**:

> "Most projects fail not because the code is wrong, but because the team solved the wrong problem."
>
> — [HVE Core — Design Thinking](https://microsoft.github.io/hve-core/docs/design-thinking/)

#### The three spaces

1. **Problem Space** (Methods 1-3): Scope Conversations, Design Research, Input Synthesis — rough and exploratory
2. **Solution Space** (Methods 4-6): Brainstorming, User Concepts, Low-Fidelity Prototypes — scrappy and concept-grade; **polish is explicitly discouraged**
3. **Validation Space** (Methods 7-9): High-Fidelity Prototypes, User Testing, Iteration at Scale — functionally rigorous

Three exit points produce handoff artifacts with confidence markers that feed directly into RPI workflows. The DT Coach agent can return work to Design Thinking when assumptions need revision during RPI.

#### Why this matters for expanding beyond development

Design Thinking gives product managers, UX designers, and business stakeholders their own entry point into AI-assisted workflows — before any code is written. The handoff artifacts carry forward into RPI, ensuring continuity from problem definition through implementation.

### 4.3 Role-Specific Participation (10 Engineering Disciplines)

HVE Core supports 10 distinct roles, each with its own guide and entry point:

| Role | Focus |
|------|-------|
| Engineer | Implementation, code quality |
| TPM | Project coordination, milestone tracking |
| Tech Lead / Architect | Architecture decisions, system design |
| Security Architect | Security review, threat modeling |
| Data Scientist | Data analysis, ML integration |
| SRE / Operations | Reliability, monitoring, incident response |
| Business Program Manager | Business requirements, stakeholder alignment |
| New Contributor | Onboarding, learning the codebase |
| UX Designer | User experience, design patterns |
| Utility | Cross-cutting tasks |

#### 9-Stage AI-Assisted Project Lifecycle

Setup → Discovery → Product Definition → Decomposition → Sprint Planning → Implementation → Review → Delivery → Operations

#### The important shift

Better agentic systems do not just generate code faster. They make **research**, **planning**, and **review** first-class outputs that more roles can work on.

**Sources**:

- [HVE Core getting started](https://microsoft.github.io/hve-core/docs/getting-started/)
- [RPI workflow](https://microsoft.github.io/hve-core/docs/rpi/)
- [Design Thinking](https://microsoft.github.io/hve-core/docs/design-thinking/)

---

## Section 5 — Prototype-First Workflows Shrink the Distance to a Working Demo

### 5.1 Azure CLI `az prototype` — Concept to Deploy

#### What it is

> "Rapidly create Azure prototypes using AI-driven agent teams. The az prototype extension empowers you to build functional Azure prototypes using intelligent agent teams powered by GitHub Copilot or Azure OpenAI."
>
> — [az prototype docs](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)

#### The core workflow

```bash
az prototype init --name retail-assistant --template ai-app
az prototype design --interactive
az prototype build
az prototype deploy
```

> "Each stage can be run independently (with prerequisite guards) and most stages are re-entrant — you can return to refine your design or rebuild specific components."
>
> — [az prototype docs](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)

#### Command details

**`init`** — Scaffold project, create `prototype.yaml`, configure AI provider (`copilot`, `azure-openai`, `github-models`), choose IaC (`terraform` or `bicep`), set environment (`dev`, `staging`, `prod`), select template (`web-app`, `data-pipeline`, `ai-app`, etc.)

**`design`** — Analyze requirements, engage biz-analyst agent, generate architecture documentation. `--interactive` enters a refinement loop. Can ingest artifacts directory (`--artifacts ./requirements/`).

> "Reads artifacts (documents, diagrams, specs), engages the biz-analyst agent to identify gaps, and generates architecture documentation."
>
> — [az prototype design](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest#az-prototype-design)

**`build`** — Generate infrastructure and application code in staged output. Interactive by default with bordered prompts, progress indicators, slash commands (`/status`, `/stages`, `/files`, `/policy`).

**`deploy`** — Deploy to Azure with preflight checks, staged deployment, progress tracking, and conversational loop. Slash commands include `/rollback N`, `/redeploy N`, `/plan N` (what-if), `/outputs`.

#### The built-in agent team

11 specialized agents, each mapped to an organizational role:

| Agent | Role |
|-------|------|
| `biz-analyst` | PMs, business stakeholders — always engaged |
| `cloud-architect` | Architects — architecture design |
| `cost-analyst` | Finance — t-shirt-sized cost estimates |
| `security-reviewer` | Security — security review |
| `project-manager` | PMs — project coordination |
| `qa-engineer` | QA — error diagnosis, testing |
| `app-developer` | Developers — application code |
| `terraform` / `bicep` | Platform engineers — IaC |
| `documentation` | Technical writers — doc generation |
| `monitoring-agent` | SRE/Ops — observability setup |

Agent resolution order: custom > override > built-in.

#### Supporting commands

**`analyze costs`** — Queries Azure Retail Prices API, produces cost reports at three consumption tiers (S/M/L).

**`analyze error`** — Accepts inline error, log file, or **screenshot image**. QA agent identifies root cause and proposes fix.

**`generate speckit`** — Creates spec-kit documentation bundle from the architecture design.

**`generate docs`** — Generates architecture, deployment, development, configuration, as-built, and cost estimate documents.

**`generate backlog`** — Creates structured backlog and pushes to GitHub Issues or Azure DevOps (Features → User Stories → Tasks).

**`knowledge contribute`** — Submit patterns/pitfalls to community knowledge base.

**`launch`** — Interactive TUI dashboard that auto-detects current stage.

**Source**: [az prototype](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)

### 5.2 The Specification-Driven Development Connection

> "The Specification becomes the system: SDD flips the traditional hierarchy: instead of writing code and using specs as optional documentation, code now serves the specification, not the other way around." — [SDD on Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/experimental/ai-assisted-sol-dev/sdd/)

The practical consequence:

> "This paradigm shift elevates the developer's role from code writer to solution architect. Instead of spending time ensuring compliance with specifications manually, developers can: Design at a higher level, Compose solutions faster, Maintain quality effortlessly, Scale best practices." — [SDD on Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/experimental/ai-assisted-sol-dev/sdd/)

`az prototype generate speckit` bridges the prototype workflow to the spec-driven workflow — producing formal documentation from the working prototype, inverting the traditional flow where docs come first and code follows.

### 5.3 Why Prototypes Beat Mockups in the AI Era

#### The cost calculus has changed

When code generation is near-free, the cost of producing a working prototype drops below the cost of producing and reviewing detailed mockups/plans. The `az prototype` workflow embodies this: `init` → `design` → `build` → `deploy` takes you from concept to deployed Azure resources faster than you would finish a PowerPoint.

#### Cross-role participation

- A **PM** can run `az prototype design` to articulate requirements and get architecture back — no developer needed to start
- A **business stakeholder** can run `az prototype analyze costs` to get real Azure pricing before any code exists
- **Anyone** can run `az prototype generate backlog --provider github` to create GitHub Issues with acceptance criteria from the design
- The team can run `az prototype deploy --dry-run` to see exactly what would deploy before committing resources
- Even non-developers can diagnose issues with `az prototype analyze error --input ./error-screenshot.png`

#### The argument

A working app now beats a beautiful mockup more often than ever, because the cost of generating the first useful slice is dropping fast. The prototype becomes the communication artifact, not a slide deck.

---

## Section 6 — What To Do Now (Adoption Checklist)

### 6.1 Adopt VS Code Insiders and Copilot CLI

When the team can tolerate preview cadence, Insiders gives access to skills, MCP features, subagent capabilities, and hook behaviors weeks before stable.

### 6.2 Convert Repeatable Behavior into Skills

If you will do it more than once and it needs determinism, turn it into a skill. Follow the canonical layout:

```text
.github/skills/<skill-name>/SKILL.md
```

Use the agentskills.io spec for interoperability across agent products.

### 6.3 Scale Deliberately

Start with subagents. Move to squads or fleets only when persistent coordination pays off — when the context cost of one giant agent exceeds the coordination cost of several focused ones.

### 6.4 Include More Roles

Bring PMs, designers, business managers, and analysts into the same visible artifact chain. HVE Core's RPI workflow and `az prototype` make this possible because research, planning, and review are first-class outputs.

### 6.5 Build Demos of Everything

A working slice teaches faster than a polished plan alone. `az prototype init` → `design` → `build` → `deploy` is the fastest path from concept to proof.

---

## Cross-Cutting Principles

These five principles connect all sections:

### Principle 1 — The constraint changes the goal

When you prevent AI from doing everything at once, it does each thing better. Squad constrains each agent to its role. gh-aw constrains agents to read-only execution. RPI constrains research from implementation. Spec Kit constrains implementation to specifications. **The constraint is the feature.**

### Principle 2 — Governance must be in code, not in prompts

Prompts can be ignored; code cannot. Squad enforces file-write guards via SDK hooks. gh-aw enforces security through a three-layer architecture with compilation-time validation, runtime isolation, and plan-level trust. The customization hierarchy puts deterministic hooks and MCP configuration in the stack, not just advisory text.

### Principle 3 — Memory makes teams compound

Squad's `.squad/` is committed to git. HVE Core's research documents accumulate into institutional memory. Agent skills persist organizational knowledge in version-controlled packages. In all cases, knowledge persists across sessions and compounds over time — the team gets smarter the more it works.

### Principle 4 — The workflow belongs to more roles than engineering

HVE Core's 10 role guides, Design Thinking integration, and `az prototype` agent team show that agentic development is not just about writing code faster. Research, planning, cost analysis, security review, and documentation are all first-class outputs that more roles can participate in.

### Principle 5 — Standardization enables the ecosystem

MCP solves the N×M integration problem. The agentskills.io spec enables cross-product skill portability. The canonical plugin layout enables federated distribution. Open standards are the foundation that makes everything else composable.

---

## Complete Reference Links

### Copilot Platform

- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [agentskills.io specification](https://agentskills.io/)
- [MCP in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)

### MCP

- [Model Context Protocol](https://modelcontextprotocol.io/)
- [MCP Introduction](https://modelcontextprotocol.io/introduction)
- [MCP Architecture](https://modelcontextprotocol.io/docs/learn/architecture)

### Skills Ecosystem

- [dotnet/skills](https://github.com/dotnet/skills)
- [PlagueHO/plagueho.skills](https://github.com/PlagueHO/plagueho.skills)
- [github/awesome-copilot](https://github.com/github/awesome-copilot)

### Determinism and Observability

- [Spec Kit](https://github.com/github/spec-kit)
- [Spec-Driven Development](https://github.com/github/spec-kit/blob/main/spec-driven.md)
- [SDD on Azure Verified Modules](https://azure.github.io/Azure-Verified-Modules/experimental/ai-assisted-sol-dev/sdd/)

### Agentic Workflows

- [GitHub Agentic Workflows](https://github.com/github/gh-aw)

### Multi-Agent Coordination

- [Squad](https://github.com/bradygaster/squad)
- [Squad documentation](https://bradygaster.github.io/squad/)

### Beyond Development

- [HVE Core getting started](https://microsoft.github.io/hve-core/docs/getting-started/)
- [HVE Core RPI workflow](https://microsoft.github.io/hve-core/docs/rpi/)
- [HVE Core Design Thinking](https://microsoft.github.io/hve-core/docs/design-thinking/)

### Prototype-First

- [az prototype CLI reference](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)
- [az prototype agent reference](https://learn.microsoft.com/en-us/cli/azure/prototype/agent?view=azure-cli-latest)
- [az prototype analyze reference](https://learn.microsoft.com/en-us/cli/azure/prototype/analyze?view=azure-cli-latest)
- [az prototype generate reference](https://learn.microsoft.com/en-us/cli/azure/prototype/generate?view=azure-cli-latest)
- [AI-Assisted IaC Solution Development](https://azure.github.io/Azure-Verified-Modules/experimental/ai-assisted-sol-dev/)
