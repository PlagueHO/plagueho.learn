---
post_title: "Workshop Notes: Agentic .NET AppMod"
author1: Daniel Scott-Raynsford
post_slug: agentic-dotnet-appmod-workshop-notes
microsoft_alias: dascottr
featured_image: ""
categories:
  - AI
tags:
  - dotnet
  - appmod
  - copilot
  - skills
  - mcp
ai_note: "AI was used to extract and organize these notes from meeting transcripts."
summary: "Raw workshop notes, observations, and direct quotes from a 4-day .NET App Modernization engagement with the Microsoft AppMod CAT team."
post_date: 2026-04-11
---

## Raw Workshop Notes: Agentic .NET App Modernization

These are raw thoughts, notes, and observations from a 4-day .NET App Modernization workshop with the Microsoft AppMod CAT team (Jay Schmelzer, Director DevDiv CoreAI AppMod; Taylor Southwick, Principal Engineer AppMod). The goal: modernize a large-scale .NET Framework application (10M LOC, 30 years old) using agentic AI tools.

This document captures what was actually said, observed, and learned — not polished guidance. Use it as a reference for building presentations, playbooks, and customer workshop plans.

## The Hard Truth — No Magic Buttons

- Jay Schmelzer was blunt: **"Everybody wants push a button… but the reality is it's not."**
- The AppMod CAT team is frustrated with "sizzle reels" showing magic single-click AI AppMod.
- For apps small enough for single-click migration, you might as well just rebuild them entirely with AI.
- For non-trivial apps (50K+ LOC), you MUST follow the standard .NET AppMod approach, then layer AI on top for automation and repeatability.
- Attempting to modernize an entire solution at once leads to PRs nobody can review, loss of confidence, and late regression discovery.
- Jay on large PRs: **"No one's gonna review that."**

## Incremental Migration Principles

Core philosophy: **"Maintain confidence at every step."**

- Project-by-project, dependency-aware progression.
- Stabilize and validate after each step.
- Ship partial progress rather than waiting for full completion.
- Every phase must result in a working application.
- Each phase must be small enough to review in a PR — a 10K LOC PR is unacceptable.

## Dependency Layers — The Sequencing Strategy

- Build a dependency tree of all projects and libraries in the solution.
- Identify leaf nodes — projects with the fewest downstream dependencies.
- Modernize leaf nodes first.
- Work upward using breadth-first / layered traversal.
- Projects within the same dependency layer can be modernized in parallel.
- Layers themselves are sequential — you must complete layer N before starting layer N+1.
- This avoids repeated breakage of dependent projects and massive cross-cutting PRs.

## Building the Layer Extraction Skill — The Full Story

This was the first skill the team built and it exemplifies the entire prompt→skill pipeline. It consumed significant effort across Day 1 and Day 2.

### Day 1: Starting as a Prompt

- The dependency layer extraction started as a prompt asking Copilot to analyze a solution, extract project references, and produce a layered dependency report.
- The original output included a dependency graph picture, per-project breakdowns, and tables of compatible APIs.
- Quote: **"Remember, in the original it came, it had the picture like a dependency graph and it broke it down by project…"**
- The intent was pure discovery: **"We just want this to have the information — not necessarily the choice of what we're going to [do]."**
- The team framed this as using GitHub Copilot Spaces to centralize context for an "AppMod Space" that could "Perform dependency assessment report for .NET app mod."

### The First Version Choked

The initial version tried to ingest everything at once, reasoning over the entire dependency graph in a single pass. This failed for several reasons:

- **Context window pressure** — processing too many projects at once overwhelmed the context. Some project files were 150K lines.
- **Overly coarse execution** — the agent tried to handle an entire large layer as a single unit instead of incrementally.
- **Output too large to validate** — Jay: "You will be overwhelmed by what it did." and "I can review it and I don't understand it. It's too much."
- **No staging or control** — the plan said "scaffold → one controller → iterate" but the agent generated everything in one go.
- **Poor alignment with real workflows** — it assumed too much up-front correctness. No one gets it right on the first try.

What was NOT the cause:

- Circular dependencies (handled by layering)
- Tool bugs in dependency detection
- Too many projects overall (the issue was batching, not count)

### Day 2: Refined into an Incremental Skill

On Day 2, the team refined it into the `sdc-mod-build-dependency-layers` agent. Key refinements:

1. **Moved from monolithic prompt to incremental, loop-based execution.**
2. **Made output human-reviewable at each step** — not "fire-and-forget."
3. **Narrowed scope** — excluded unrelated analysis (e.g., unit test behavior).
4. **Added pattern-based guidance** — recognize common architectural patterns, avoid hard framework assumptions at every layer, treat framework usage as application-level not project-wide.
5. **Separated concerns** — dependency extraction became a pure discovery skill, no longer expected to make modernization decisions or enforce migration strategies.
6. **Broke thick layers into sub-tasks** — some layers had many projects and needed sub-agent handling.
7. **Decoupled from execution** — results passed into planning/orchestration agents rather than driving changes directly.

Key insight from the meeting: **"The tool is not to modernize the code — the tool is to help you build the process to modernize the code."**

### The Refinement Loop

The team followed a tight feedback loop, repeated multiple times:

1. Do work interactively with Copilot.
2. Ask Copilot to create/update a skill based on what just worked.
3. Try the skill on a real solution.
4. Inspect mismatches, noise, or missing relationships.
5. Adjust scope and re-run.

Quote: **"They're asking Copilot to go create a skill based on what we did. And then we're working through that again, like we're doing that little loop a few times."**

This was the natural graduation: **"After lunch, I will look at taking our plan prompt and turning it into an agent."**

The pattern was: prompt first (lighter weight, fast iteration) → agent/skill second (stateful, resumable, orchestratable).

### The Final "Layer Doc" Output

Tested on the MasterData service:

- **Took 12 minutes to generate.**
- **Produced 12 dependency layers** — "looks sane."
- Layers varied in "thickness" — some had many projects, others just one or two.
- Layers are numbered, ordered, and used as planning boundaries for parallel execution.
- Each layer represents projects with no dependencies on each other — can be modernized in parallel.
- "Thicker" layers = more projects = more potential token/context load when passed to an agent.

### How the Layer Doc Feeds Downstream

The final architecture:

1. **Extract dependency information as a standalone step** — focus on discovery, no code modification.
2. **Persist results into session/state** — so other agents can reason over them.
3. **Hand off to a planning/orchestration agent** — which decides what to modernize, when, and how.
4. **Iterate incrementally** — reviewable outputs, refinement loops instead of one-shot execution.

The dependency extraction became a foundational input into the broader agentic modernization workflow — not a push-button solution.

Quote from meeting tasks: **"Update the migration agent to follow the intended stepwise process… and run build fixes after each addition, instead of executing all steps at once."**

## SDK-Style Conversion — The Hardest Step

- SDK-style project conversion is the **first mandatory step** in the migration flow.
- It is consistently the **largest single PR** and the **hardest to decompose**.
- SDK-style conversion and `packages.config → PackageReference` are tightly coupled in current tooling — cannot be cleanly separated today.
- Mixing SDK-style and non-SDK projects in the same solution is "hit or miss" — causes weird build and restore issues.
- Old format explicitly listed transitive dependencies; new format relies on inferred versions — leads to version collisions and "things that used to work by accident" breaking.
- Even converting just the project SDK (no .NET Core changes yet) produced a very large PR and took reviewers ~a week to get through.
- Once SDK-style conversion is complete, further modernization becomes dramatically easier and more incremental.
- Possible workaround discussed (experimental, not productized): run conversion tooling, then use an agent to undo everything except package changes to reduce PR noise.

## Package Management Observations

- Package upgrades should be treated as solution-wide concerns.
- Inconsistent versions across projects are a very common source of migration pain.
- Group upgrades logically (e.g., all Azure SDKs together) to keep PRs reviewable.
- Package update skills help reconcile, upgrade, and replace incompatible packages consistently.

## The Build-Fix Loop

This is the inner engine of the migration:

1. Add a new target (e.g., `net8.0`) to a project.
2. The build will fail — this is expected and useful.
3. Build failures reveal missing APIs or incompatible calls.
4. Agent runs builds automatically via `dotnet` CLI.
5. Agent observes failures and applies fixes iteratively.
6. Repeat until the project builds cleanly.
7. Commit and stabilize.
8. Move to the next project in dependency order.

Key quote from transcript: **"You can do a build-fix loop where you can just have the agent do it for you… it'll just go through and fix a bunch of them, and then once you get that project done, you can commit that, stabilize it…"**

- This loop is especially effective once SDK-style projects and PackageReference are in place — failures are clearer and easier to isolate.
- In VS Code, enable auto-approval for safe commands (e.g., commands starting with `dotnet`) to let agents execute builds and fixes without manual confirmation on every iteration.
- Taylor Southwick: **"Make changes that are required to get you to modern .NET. Don't do all sorts of nice fluffy things."** — focus on what's necessary, defer optimization.

## Strangler Fig Pattern for ASP.NET Migration

Strongly recommended for ASP.NET Framework → ASP.NET Core migration:

1. Create a **new ASP.NET Core project** — do NOT attempt in-place conversion.
2. The Core app sits in front and is the "source of truth".
3. If an endpoint has been migrated → Core handles it directly.
4. If not yet migrated → Core proxies the request back to the legacy Framework app.
5. Migrate controllers and views incrementally — one endpoint/flow at a time.
6. Framework app remains fully deployed and functional as a fallback.
7. Test end-to-end continuously — Core endpoints can be validated even while most traffic still flows to Framework.
8. As more endpoints move to Core, proxied routes shrink until Framework can be fully retired.

Explicit quote: **"It's a strangler fig pattern is what that is."**

This avoids the "turn it on at the end and hope" anti-pattern.

- YARP was NOT explicitly prescribed — proxy discussed conceptually only. Use whatever reverse proxy fits the environment.
- Adding deployment complexity is acknowledged but the tradeoff is worth it for incremental rollout and early validation.
- This is described as the **only practical way** to tackle very large solutions (100+ projects) without long "big bang" freezes.

## Skills Over Prompts — The Core Operating Model Shift

### The Transition

- Most engineers started the week building prompts.
- By mid-week, everyone was building skills.
- By end of week: 20+ skills for specialized AppMod edge cases, only ~2 prompts remaining (to "build new skills").

### Why Skills Win

- Prompts are flexible but fragile — struggled with long context, repeatability, and resumability.
- Skills are deterministic, reusable units of work.
- Project-specific logic belongs in skills, not prompts — encapsulate framework-specific or org-specific migration quirks.
- Agents orchestrate skills and maintain state across steps, enabling pause/resume and iterative progress.
- Prompts become inputs to agents, not the execution mechanism.
- Incremental workflow demanded skill boundaries — scaffold, migrate one controller, build-fix, verify — this structure could not be enforced reliably with prompts alone.

### Jay on Skill Adoption

**"I've not seen one customer open up a markdown editor and just start typing the skill and it's done. It doesn't happen."** — Use agent conversations to construct and refine skills iteratively.

### Specific Skills Built or Discussed

- **Build-fix skills** — resolve compiler and dependency errors after each migration step.
- **Package update skills** — upgrade, reconcile, and replace incompatible NuGet packages.
- **System.Web adapter skills** — wrap System.Web functionality for ASP.NET Core using the System Web Adapters repo.
- **Route inventory skills** — extract and analyze legacy ASP.NET routes (including ASPX pages acting as APIs).
- **Migration verification skills** — compare old vs. new implementations and summarize deltas.
- **Performance profiling skills** (planned) — capture performance before and after migration, flag regressions.

### Edge Cases Requiring Custom Skills

1. **Legacy ASPX pages acting as APIs** — some ASPX files were not true Web Forms but acted as REST-like endpoints. Required custom skills to analyze behavior, convert to controllers, and preserve query patterns and routes.
2. **Backward-compatibility routing** — legacy consumers depended on `.aspx` routes. Skills generated dual routes (modern + legacy) automatically.
3. **System.Web dependencies that could not be rewritten immediately** — required encapsulation via System.Web adapter skills instead of prompt-based refactors.
4. **Context-window blowouts during large migrations** — agents attempting full migrations in one pass exceeded context limits. Drove creation of smaller, step-scoped skills (scaffold, migrate one controller, build-fix, verify).
5. **Bugs discovered during agent runs** — logged and converted into new or enhanced skills in the shared repository.

## Async Execution & Parallelization

### The Mindset Shift

- Day 1-2: engineers watched every agent step.
- Day 3-4: they fired off parallel tasks and reviewed results.
- Jay: **"Just shove it to the background. Let's go do something else, right?"**
- Jay: **"You can't watch it."**
- **"We got a backlog of stuff, just assign it to the coding agent."**

### Sub-Agents & Context Isolation

- Sub-agents isolate heavy analysis or search work into separate context windows.
- **"They can do sub agents for that… so that way it can be in a separate context window."**
- **"Anytime it needs to search or analyze things that could cause a lot of output, use the plan agent."**
- Multiple sub-agents running concurrently, with explicit hand-off instructions between agents.

### Async Conversion (sync→async) Is Deferred

- Daniel explicitly raised: **"I want an agent to do an async to async."**
- Taylor cautioned: **"That's probably a good one for like the deferred… having the agent continue on after you've done that core side."**
- Strong consensus: **async conversion should be a follow-on agent**, not part of the initial modernization pass.
- Modernization is agent-orchestrated, not agent-monolithic.
- Async, performance, security, and cleanup work are separate, deferred agents.

## Tool Wrangling & MCP Configuration

### Tool Discipline

- When things went wrong, often tools had been disabled/enabled by different agents.
- Jay on blind trust: **"We don't just trust the stuff… You will be overwhelmed by what it did."**
- Jay: **"I can review it and I don't understand it. It's too much."**
- The group deliberately restricted which tools were enabled in MCP to reduce noise and performance issues, rather than enabling everything by default.

### MCP Setup Steps (from Taylor)

Taylor provided explicit setup steps in the meeting chat:

1. Set up `mcp.json`
2. Set up connection with skills repo
3. Add a `custom-instructions.md`
4. Start with prompts!

### NuGet MCP Server Config

Taylor shared an actual MCP server configuration for NuGet:

```json
{
  "servers": {
    "nuget": {
      "type": "stdio",
      "command": "dnx",
      "args": [
        "NuGet.Mcp.Server",
        "--source",
        "https://api.nuget.org/v3/index.json",
        "--yes"
      ]
    }
  }
}
```

### Workspace-Level Configuration

- Workspace-scoped `mcp.json`, shared prompt files in `.github/prompts`, repo-level `custom-instructions.md`.
- Critical for repeatability across repos — not a per-developer setup.
- Microsoft Learn MCP is critical, but everyone needs the same MCP server names → rely on Workspace MCPs.

## Observability — Chat Debug & The 100× Pattern

### Chat Debug View

- "Show chat debug view" in the Copilot UI exposes:
  - The top-level user prompt
  - The system prompt used by the agent
  - Each intermediate step the agent takes
  - Tool invocations and their inputs/outputs
- Transcript quote: **"This is what it's basically doing – every little thing it does… you can literally see the entire prompt… and how all your stuff starts later again, if it's using a tool."**
- On day 4, VS Code Insiders enabled enhanced Chat Debug — game changing!

### The /troubleshoot Pattern

- Goal is **diagnosis and understanding**, not just remediation.
- `/troubleshoot` — "Why did you do X rather than Y?" → 10× improvement.
- "/troubleshoot Why did you do X rather than Y **and then update Skill Z so that you don't do that again?**" → 100× improvement.
- The 100× pattern: observe → diagnose → update skill → permanently fix the behavior.

### The 100× Multiplier

- Real leverage: agents operate in tight inner loops (build → fail → fix → rebuild).
- Humans intervene at review and decision points, not at every step.
- This was described as an order-of-magnitude productivity shift for repetitive modernization work, large dependency graphs, and API-level fixes that are deterministic but time-consuming.
- Observability is essential for debugging unexpected outcomes, necessary for safe scaling of agent workflows, and a prerequisite for letting agents run with more autonomy.

## Testing Strategy

- Testing was repeatedly described as the **primary constraint** on safe modernization.
- Many legacy projects lack sufficient automated tests.
- Refactoring solely to make code testable can undermine baseline confidence — avoid during migration pass.
- Focus on **integration and end-to-end tests** rather than perfect unit coverage.
- Validate **behavioral parity** rather than internal implementation.
- Use tools like Aspire (even with limited Framework support) to launch legacy apps and run endpoint-level tests.
- Manual performance and integration testing gates are a reality — but also a bottleneck to reduce over time.
- Build migration verification skills to compare old vs. new implementations and summarize deltas.

## Multi-Tenancy vs Modernization

These were explicitly distinguished as **parallel but separate streams** to avoid scope explosion:

- **Modernization**: Framework → Core, SDK style, dependency cleanup.
- **Multi-tenancy**: JWT claims, per-tenant databases, elastic pools.

Do not conflate them. Run them as separate workstreams.

## Key Quotes Summary

| Speaker | Quote | Context |
|---------|-------|---------|
| Jay Schmelzer | "Everybody wants push a button… but the reality is it's not." | On push-button modernization expectations |
| Jay Schmelzer | "No one's gonna review that." | On large, unreviewed PRs |
| Jay Schmelzer | "I've not seen one customer open up a markdown editor and just start typing the skill and it's done. It doesn't happen." | On skill adoption needing agent-assisted creation |
| Jay Schmelzer | "We don't just trust the stuff… You will be overwhelmed by what it did." | On blind trust in tool output |
| Jay Schmelzer | "I can review it and I don't understand it. It's too much." | On breaking tool output into inspectable steps |
| Jay Schmelzer | "Just shove it to the background. Let's go do something else, right?" | On async agent execution |
| Jay Schmelzer | "You can't watch it." | On agent autonomy |
| Taylor Southwick | "Make changes that are required to get you to modern .NET. Don't do all sorts of nice fluffy things." | On staying focused during migration |
| Taylor Southwick | "That's probably a good one for the deferred… having the agent continue on after you've done that core side." | On deferring async conversion |
| Transcript | "You can do a build-fix loop where you can just have the agent do it for you… it'll just go through and fix a bunch of them, and then once you get that project done, you can commit that, stabilize it…" | On the build-fix loop |
| Transcript | "This is what it's basically doing – every little thing it does… you can literally see the entire prompt…" | On Chat Debug observability |
| Transcript | "It's a strangler fig pattern is what that is." | On ASP.NET migration pattern |
| Transcript | "Anytime it needs to search or analyze things that could cause a lot of output, use the plan agent." | On sub-agent context isolation |
| Transcript | "We got a backlog of stuff, just assign it to the coding agent." | On agent-driven backlog execution |

## Final Alignment — What Was Agreed

By the end of the workshop, there was strong alignment on:

- An **incremental, dependency-aware modernization approach**.
- AI as an **assistant and orchestrator**, not an unchecked code generator.
- **Skills as the unit of reuse; agents as the unit of execution.**
- **Confidence, testing, and reviewability as non-negotiable constraints.**
- A foundation for reusable agent + skill libraries and scaled rollout to additional engineering teams.
