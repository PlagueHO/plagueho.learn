# Agentic Development Evolution: A View of the Last 6 Months - Presentation Outline

## Metadata

| Field | Value |
|-------|-------|
| **Title** | Agentic Development Evolution: A View of the Last 6 Months |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 40 minutes |
| **Target Audience** | Developers, engineering leads, architects, and AI automation practitioners |
| **Event / Context** | Conference/session draft; final event details TBD |
| **Created** | 2026-03-26 |
| **Last Updated** | 2026-03-26 |
| **Status** | Draft |

## Objectives

What should attendees take away from this presentation?

1. Understand how GitHub Copilot has evolved from chat assistance into a governed agentic platform centered on skills, MCP, and orchestration.
2. See how subagents, squad-style coordination, and spec-driven workflows improve determinism, scale, and engineering outcomes.
3. Leave with concrete actions for adopting current agentic patterns across engineering and adjacent roles.

## Slide Outline

### 1. Title Slide

- **Layout**: cover-style custom hero
- **Content**: Session title, subtitle, presenter, four framing themes
- **Speaker Notes**: Introduce the thesis that the real shift is operational, not cosmetic
- **Duration**: ~1 min

### 2. About Me

- **Layout**: default two-column
- **Content**: Bio, links, and framing for a demo-heavy session
- **Speaker Notes**: Explain that the deck is intentionally light because live demos carry most of the proof
- **Duration**: ~2 min
- **Animations**: Progressive reveal on session framing

### 3. Table of Contents

- **Layout**: default grid
- **Content**: Four sections and demo jump points
- **Speaker Notes**: Set expectations for pacing and where demos will happen
- **Duration**: ~1 min

### 4. Agentic First Means Operating Model, Not Prompt Tricks

- **Layout**: default two-column
- **Image**: section-1-vscode-top-committers.png
- **Content**:
  - 1.1 VS Code Insiders and GitHub Copilot CLI as the minimum viable toolchain
  - 1.2 The seven-layer Copilot customization hierarchy (instructions → prompts → agents → subagents → skills → hooks → MCP)
  - 1.3 Skills over prompts — demand-loading, agentskills.io standard, Sensei frontmatter quality
  - 1.4 The skills ecosystem — federated distribution (community, vendor/team, personal)
  - 1.5 Model Context Protocol (MCP) — the USB-C analogy, N×M → N+M, three primitives
- **Speaker Notes**: Position skills, plugins, and governance as the new foundation. Emphasize that this is an operating model shift, not a prompt trick. The customization hierarchy is the structural change.
- **Duration**: ~6 min
- **Animations**: Progressive bullet reveal

### 5. Better Outcomes Came From Determinism, Visibility, and Orchestration

- **Layout**: default two-column with Mermaid diagram
- **Image**: section-2-troubleshoot.jpg
- **Content**:
  - 2.1 The /troubleshoot observability layer — JSONL debug logs, event types (discovery, tool_call, llm_request, subagent), event hierarchy
  - 2.2 Spec Kit and Spec-Driven Development (SDD) — specs generate implementations, SDD vs. vibe coding, constitutional foundation, 8 workflow commands
  - 2.3 GitHub Agentic Workflows (gh-aw) — natural-language markdown workflows compiled to Actions, three-layer security architecture, Agent Workflow Firewall, CLI commands
  - 2.4 WorkIQ and enterprise context — MCP bridge to Microsoft 365 data
- **Speaker Notes**: Show how better workflows and tool visibility changed outcomes beyond model quality. Contrast SDD with vibe coding. Show the /troubleshoot event hierarchy.
- **Duration**: ~5 min
- **Animations**: Static diagram with demo hand-off

### 6. Scaling Intelligence Out: From Subagents to Squads

- **Layout**: default two-column with Mermaid diagram
- **Content**:
  - 3.1 Subagents as a primitive — three types (search_subagent, execution_subagent, runSubagent), isolation model, when to use vs. inline work
  - 3.2 Squad — durable multi-agent teams with `.squad/` directory, parallel execution, memory persistence in git, governance in code, SDK-first mode
  - 3.3 When multi-agent routing is worth it — context cost vs. coordination cost
- **Speaker Notes**: Emphasize cost of coordination versus cost of giant context windows. Squad is not a chatbot wearing hats — each agent has its own context and knowledge.
- **Duration**: ~5 min
- **Animations**: Progressive bullet reveal

### 7. The New Surface Area Is Monitoring, Memory, and Recovery

- **Layout**: default two-column with terminal snippet
- **Content**:
  - 3.4 Three operational surfaces: monitoring (/status, gh aw logs), memory (decisions.md, history.md, wisdom.md in git), recovery (checkpoint-based session recovery, SafeOutputs rollback)
- **Speaker Notes**: Explain why monitoring surfaces make multi-agent work practical for real teams. Memory compounds across sessions — the team gets smarter the more it works.
- **Duration**: ~4 min
- **Animations**: None

### 8. Agentic Development Is Expanding Beyond Development

- **Layout**: default two-column
- **Content**:
  - 4.1 HVE Core and the RPI workflow — Research → Plan → Implement → Review pipeline, context clearing between phases, rpi-agent autonomous mode
  - 4.2 Design Thinking integration — nine-method, three-space framework (Problem → Solution → Validation), handoff artifacts with confidence markers
  - 4.3 Role-specific participation — 10 engineering disciplines, 9-stage AI-assisted project lifecycle
- **Speaker Notes**: Expand the discussion to PMs, designers, analysts, and reviewers. The key insight: AI can't tell the difference between investigating and implementing, so RPI constrains it.
- **Duration**: ~4 min
- **Animations**: None

### 9. Prototype-First Workflows Shrink the Distance to a Working Demo

- **Layout**: default two-column with CLI snippet
- **Content**:
  - 5.1 Azure CLI `az prototype` — init → design → build → deploy, 11 built-in agent team, supporting commands (analyze costs, analyze error, generate speckit/docs/backlog)
  - 5.2 The SDD connection — `az prototype generate speckit` bridges prototypes to spec-driven workflows
  - 5.3 Why prototypes beat mockups — cost calculus has changed, cross-role participation (PM, business stakeholder, anyone)
- **Speaker Notes**: Tie prototypes to faster validation and better conversations with stakeholders. A working app beats a beautiful mockup because generation cost has dropped.
- **Duration**: ~4 min
- **Animations**: None

### 10. What To Do Now

- **Layout**: default grid
- **Content**:
  - 6.1 Adopt VS Code Insiders and Copilot CLI
  - 6.2 Convert repeatable behavior into skills (agentskills.io spec, canonical layout)
  - 6.3 Scale deliberately — start with subagents, move to squads only when persistent coordination pays off
  - 6.4 Include more roles — PMs, designers, business managers, analysts into the same visible artifact chain
  - 6.5 Build demos of everything — a working slice teaches faster than a polished plan
- **Speaker Notes**: Give the audience a concrete adoption checklist. Each item maps to a section they just saw.
- **Duration**: ~3 min
- **Animations**: None

### 11. Key Takeaways

- **Layout**: default
- **Content**: Five cross-cutting principles:
  1. The constraint changes the goal — preventing AI from doing everything at once makes each thing better
  2. Governance must be in code, not in prompts — prompts can be ignored, code cannot
  3. Memory makes teams compound — knowledge persists across sessions in git
  4. The workflow belongs to more roles than engineering — research, planning, review are first-class outputs
  5. Standardization enables the ecosystem — MCP, agentskills.io, canonical plugin layout
- **Speaker Notes**: Re-anchor the talk around operating model, determinism, and scale. These five principles connect all sections.
- **Duration**: ~2 min
- **Animations**: Progressive reveal

### 12. Thank You / Q&A

- **Layout**: center
- **Content**: Thank you, contact links, source repo
- **Speaker Notes**: Open for questions and offer live follow-up demos
- **Duration**: ~3 min

## Demos

List any live demos planned for this presentation.

| # | Demo Title | Description | Slide Reference | Prep Required |
|---|------------|-------------|-----------------|---------------|
| 1 | Troubleshoot an agent run | Use `/troubleshoot` to inspect tool usage, activation, and why a workflow behaved the way it did | After slide 5 | Prepare a saved session with clear tool activity |
| 2 | Scale out with subagents or Squad | Show parallel task execution, team roster, or session visibility | After slide 7 | Have a repo ready for a short multi-agent task |
| 3 | Cross-role workflow with HVE / sessions | Show research-plan-implement or role-based review flow | After slide 8 | Prepare a spec or artifact for review |
| 4 | Prototype a complete slice | Walk through `az prototype` design/build/deploy commands | After slide 9 | Have Azure CLI extension installed and a sample concept ready |

## Resources & Links

Links to share with attendees or reference during the talk.

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
- [Sensei](https://spboyer.github.io/sensei/)

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

## Evolution Log

Track changes to the presentation as it evolves.

| Date | Change | Reason |
|------|--------|--------|
| 2026-03-26 | Initial outline created | New presentation scaffold based on provided session themes |
| 2026-03-26 | Aligned with EXTENDED-OUTLINE.md | Updated slide content to match detailed subsections (1.1-1.5, 2.1-2.4, 3.1-3.4, 4.1-4.3, 5.1-5.3, 6.1-6.5), added cross-cutting principles to takeaways, expanded resources with categorized links, added image references |
