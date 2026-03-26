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
- **Content**: Governance at workspace/org level, shift from prompts to skills, MCP normalization, VS Code Insiders adoption
- **Speaker Notes**: Position skills, plugins, and governance as the new foundation
- **Duration**: ~6 min
- **Animations**: Progressive bullet reveal

### 5. Better Outcomes Came From Determinism, Visibility, and Orchestration

- **Layout**: default two-column with Mermaid diagram
- **Content**: /troubleshoot, SpecKit, Copilot CLI orchestration, GitHub Agentic Workflows, WorkIQ-style enterprise tasks
- **Speaker Notes**: Show how better workflows and tool visibility changed outcomes beyond model quality
- **Duration**: ~5 min
- **Animations**: Static diagram with demo hand-off

### 6. Scaling Intelligence Out: From Subagents to Squads

- **Layout**: default two-column with Mermaid diagram
- **Content**: runSubagent as primitive, Squad as durable team abstraction, when multi-agent routing is worth it
- **Speaker Notes**: Emphasize cost of coordination versus cost of giant context windows
- **Duration**: ~5 min
- **Animations**: Progressive bullet reveal

### 7. The New Surface Area Is Monitoring, Memory, and Recovery

- **Layout**: default two-column with terminal snippet
- **Content**: sessions, team memory, recovery, and operational monitoring
- **Speaker Notes**: Explain why monitoring surfaces make multi-agent work practical for real teams
- **Duration**: ~4 min
- **Animations**: None

### 8. Agentic Development Is Expanding Beyond Development

- **Layout**: default two-column
- **Content**: HVE Core, RPI workflow, design-thinking path, visible artifact chain for more roles
- **Speaker Notes**: Expand the discussion to PMs, designers, analysts, and reviewers
- **Duration**: ~4 min
- **Animations**: None

### 9. Prototype-First Workflows Shrink the Distance to a Working Demo

- **Layout**: default two-column with CLI snippet
- **Content**: Azure CLI prototype flow from init through deploy and why prototypes matter for cross-role collaboration
- **Speaker Notes**: Tie prototypes to faster validation and better conversations with stakeholders
- **Duration**: ~4 min
- **Animations**: None

### 10. What To Do Now

- **Layout**: default grid
- **Content**: Adopt Insiders and Copilot CLI, convert repeatable behavior into skills, scale deliberately, include more roles
- **Speaker Notes**: Give the audience a concrete adoption checklist
- **Duration**: ~3 min
- **Animations**: None

### 11. Key Takeaways

- **Layout**: default
- **Content**: Five summary points and follow-up links
- **Speaker Notes**: Re-anchor the talk around operating model, determinism, and scale
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

- [Spec Kit](https://github.com/github/spec-kit)
- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [dotnet/skills](https://github.com/dotnet/skills)
- [PlagueHO/plagueho.skills](https://github.com/PlagueHO/plagueho.skills)
- [github/awesome-copilot](https://github.com/github/awesome-copilot)
- [GitHub Agentic Workflows](https://github.com/github/gh-aw)
- [Squad](https://github.com/bradygaster/squad)
- [HVE Core getting started](https://microsoft.github.io/hve-core/docs/getting-started/)
- [Azure CLI prototype docs](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)

## Evolution Log

Track changes to the presentation as it evolves.

| Date | Change | Reason |
|------|--------|--------|
| 2026-03-26 | Initial outline created | New presentation scaffold based on provided session themes |
