# Agentic .NET AppMod – What works, what doesn't and how to fix it

## Metadata

| Field | Value |
|-------|-------|
| **Title** | Agentic .NET AppMod – What works, what doesn't and how to fix it |
| **Subtitle** | Lessons from a week with the Microsoft .NET AppMod CAT team modernizing a 10M LOC, 30-year-old app at scale |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 45 minutes |
| **Target Audience** | Agentic DevOps partners |
| **Format** | Small group, unplugged, interactive, demo-heavy |
| **Event / Context** | Partner enablement session; details TBD |
| **Created** | 2026-04-08 |
| **Last Updated** | 2026-04-11 |
| **Status** | Draft |

## Objectives

What should attendees take away from this presentation?

1. Understand that large-scale .NET AppMod (50K+ LOC) requires a structured, incremental approach — there is no "single click" magic.
2. Learn the toolchain, techniques, and operating model (Skills, MCP, dependency layers, async execution) that the Microsoft AppMod CAT team actually uses.
3. Leave with a concrete playbook for running similar AppMod workshops for their own customers.

## Slide Outline

### 1. Title Slide

- **Layout**: cover-style custom hero (reused from agentic-development-evolution)
- **Content**: Title, tightened subtitle, presenter, four framing badges:
  - 🔧 Skills > Prompts
  - 📦 Break it down (dependency layers)
  - ⚡ Go async
  - 🔍 /troubleshoot everything
- **Speaker Notes**: Frame this as a candid, lessons-learned session — not a sizzle reel. Everything here was earned over 4 days of real work on a real 10M LOC app.
- **Duration**: ~1 min

### 2. About Me

- **Layout**: default two-column
- **Content**: Bio, links, session framing (unplugged, interactive, ask questions anytime)
- **Speaker Notes**: Set the tone — this is a conversation, not a lecture. Demo-heavy.
- **Duration**: ~1 min

### 3. The Workshop Context

- **Layout**: default
- **Content**:
  - 4-day SDC engagement in New Zealand with Microsoft SDC Partner
  - Hosted with Steve Hornblow
  - Collaborated with Jay Schmelzer (Director, DevDiv CoreAI AppMod) and Taylor Southwick (Principal Engineer, AppMod)
  - Target: 10M LOC, 30-year-old .NET application
  - "Completely game changing" experience — all 4 days recorded
- **Speaker Notes**: Establish credibility — this isn't theoretical. We did it, we learned, we're sharing.
- **Duration**: ~2 min

### 4. The Hard Truth About Large-Scale AppMod

- **Layout**: default two-column
- **Content**:
  - 4.1 The AppMod CAT team is frustrated with "sizzle reels" showing magic single-click AI AppMod — Jay Schmelzer: "Everybody wants push a button… but the reality is it's not."
  - 4.2 Reality: if your app is small enough for single-click AppMod, it's small enough to rebuild entirely with AI
  - 4.3 For non-trivial apps (50K+ LOC), follow the standard .NET AppMod approach and techniques — then leverage AI to automate and make it repeatable
  - 4.4 AI is an acceleration and orchestration mechanism, not a blind code-rewriter — attempting to modernize an entire solution at once leads to unreviewable PRs, loss of confidence, and late regression discovery
  - 4.5 Jay on unreviewed PRs: "No one's gonna review that." — if the output is too large for a human to validate, the migration stalls
  - 4.6 You MUST understand standard .NET AppMod before starting (link to Auckland .NET User Group recording)
- **Speaker Notes**: This is the "what doesn't work" part of the title. Set expectations correctly. AppMod CAT team's own words: stop promising magic. The incremental approach was repeatedly stressed — "maintain confidence at every step".
- **Duration**: ~4 min
- **Animations**: Progressive reveal

### 5. The Right Toolchain

- **Layout**: default two-column
- **Content**:
  - 5.1 VS Code Insiders — mandatory. Jay Schmelzer quote: "Everyone in DevDiv uses Insiders, no one uses stable. We recommend all customers use Insiders unless they have some compliance reason not to."
  - 5.2 Update aggressively — every day we started with an update. Solutions to yesterday's problems often arrived in today's update.
  - 5.3 Use `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet MCP package — the official App Mod tools and agents
  - 5.4 Be careful with AppMod extensions — multiple competing extensions confuse agents. Remove all extensions, use NuGet MCP only.
- **Speaker Notes**: "When developers complain 'Claude does X but Copilot doesn't' — it's because they're on old builds." This is about staying current.
- **Duration**: ~3 min
- **Animations**: Progressive bullet reveal

### 6. Skills Over Prompts — The Shift That Changed Everything

- **Layout**: default two-column
- **Content**:
  - 6.1 Most engineers started the week building prompts → by mid-week everyone was building skills
  - 6.2 Prompts are flexible but fragile — skills are deterministic, reusable units of work. Prompts struggled with long context, repeatability, and resumability
  - 6.3 Very few use cases where a skill isn't a better fit than a prompt. DevDiv expects prompts to "fade away"
  - 6.4 Project-specific logic belongs in skills, not prompts — encapsulate framework-specific or org-specific migration quirks
  - 6.5 By end of week: 20+ skills for specialized AppMod edge cases, only ~2 prompts remaining (to "build new skills")
  - 6.6 Specific skill categories that emerged:
    - **Build-fix skills** — resolve compiler and dependency errors after each migration step
    - **Package update skills** — upgrade, reconcile, and replace incompatible NuGet packages
    - **System.Web adapter skills** — wrap System.Web functionality for ASP.NET Core using the System Web Adapters repo
    - **Route inventory skills** — extract and analyze legacy ASP.NET routes (including ASPX-as-API endpoints)
    - **Migration verification skills** — compare old vs. new implementations and summarize deltas
    - **Performance profiling skills** (planned) — capture perf before and after migration, flag regressions
  - 6.7 Jay on skill adoption: "I've not seen one customer open up a markdown editor and just start typing the skill and it's done. It doesn't happen." — Use agent conversations to construct and refine skills iteratively
  - 6.8 Sensei for skill quality validation
  - 6.9 Skill Creator Skill and Convert-Prompt-to-Skill tool
  - 6.10 Once engineers got comfortable → became a "Skill and Agent factory", amplifying the entire team
  - 6.11 Agents orchestrate skills and maintain state across steps, enabling pause/resume and iterative progress — prompts become inputs to agents, not the execution mechanism
- **Speaker Notes**: This is the core operating model shift. Skills are deterministic, portable, discoverable. Prompts are throwaway. Proved over 4 days with real engineers. Repeated or failure-prone prompt logic was moved into skills. The incremental workflow demanded skill boundaries — scaffold, migrate one controller, build-fix, verify — could not be enforced with prompts alone.
- **Duration**: ~5 min
- **Animations**: Progressive reveal
- **Demo handoff**: → Demo 1

### DEMO 1: Building & Refining Skills

- Build a skill from an agent conversation
- Use Sensei to validate quality
- Show convert-prompt-to-skill flow
- **After slide**: 6

### 7. Breaking Down the Monster — Dependency Layers

- **Layout**: default two-column with Mermaid dependency diagram
- **Content**:
  - 7.1 AppMod MUST be broken into phases that result in a working application at each step — ship partial progress rather than waiting for full completion
  - 7.2 Each phase must be small enough to review in a PR — a 10K LOC PR is unacceptable and will never get merged → AppMod stalls
  - 7.3 Build a dependency tree of projects and libraries, then identify leaf nodes (projects with the fewest downstream dependencies)
  - 7.4 Modernize leaf nodes first, work upward using breadth-first/layered traversal — avoids repeated breakage of dependent projects and massive cross-cutting PRs
  - 7.5 Projects within the same dependency layer can be modernized in parallel, while layers themselves remain sequential
  - 7.6 Use AI AppMod tools/agents/skills to generate the multi-layer dependency upgrade plan
  - 7.7 SDK-style conversion is the first mandatory step — convert projects to SDK-style + PackageReference
    - This is often the largest single PR and the hardest to decompose
    - SDK-style conversion and `packages.config → PackageReference` are tightly coupled in current tooling and cannot be cleanly separated
    - Mixing SDK-style and non-SDK projects in the same solution is "hit or miss" and causes build/restore issues
    - Old format explicitly listed transitive dependencies; new format relies on inferred versions — leads to version collisions and "things that used to work by accident" breaking
    - Once SDK-style conversion is complete, further modernization becomes easier and more incremental
  - 7.8 Package upgrades are solution-wide concerns — inconsistent versions across projects are a common source of migration pain. Group upgrades logically (e.g., Azure SDKs together) to keep PRs reviewable
  - 7.9 Continuous small incremental change: AI tools + agents + skills ensure change is reviewable and mergeable
- **Speaker Notes**: This is the "how to fix it" part. The key insight: break the problem into dependency layers, start at the leaves, keep PRs small. AI makes this repeatable, not magical. SDK-style conversion is the biggest hurdle — acknowledge it will be a large PR and plan accordingly. The layered approach also enables parallelization of work within each layer.
- **Duration**: ~5 min
- **Animations**: Mermaid diagram build
- **Demo handoff**: → Demo 2

### 8. Building the Layer Extraction Skill — From Prompt to Agent

- **Layout**: default two-column
- **Content**:
  - 8.1 The dependency layer extraction was the **first skill the team built** — and it exemplifies the entire prompt→skill pipeline
  - 8.2 **Day 1: Started as a prompt** — asked Copilot to analyze a solution, extract project references, and produce a layered dependency report
    - The original output included a dependency graph picture, per-project breakdowns, and tables of compatible APIs
    - Quote: "Remember, in the original it came, it had the picture like a dependency graph and it broke it down by project…"
  - 8.3 **The first version choked** — the agent tried to ingest everything at once, reasoning over the entire dependency graph in a single pass
    - Root cause: context window pressure from processing too many projects at once
    - Large project files (e.g., 150K line project files) overwhelmed the context
    - The output was too large to validate — Jay: "You will be overwhelmed by what it did"
  - 8.4 **Day 2: Refined into an incremental, loop-based skill** (`sdc-mod-build-dependency-layers` agent)
    - Moved from monolithic prompt to incremental execution
    - Narrowed scope: "We just want this to have the information — not necessarily the choice of what we're going to [do]"
    - Key insight: "The tool is not to modernize the code — the tool is to help you build the process to modernize the code"
  - 8.5 **The refinement loop** (repeated multiple times):
    1. Do work interactively with Copilot
    2. Ask Copilot to create/update a skill based on what just worked
    3. Try the skill on a real solution
    4. Inspect mismatches, noise, or missing relationships
    5. Adjust scope and re-run
    - Quote: "They're asking Copilot to go create a skill based on what we did. And then we're working through that again, like we're doing that little loop a few times."
  - 8.6 **Specific refinements applied**:
    - Narrowed scope — excluded unrelated analysis (e.g., unit test behavior)
    - Added pattern-based guidance — recognize common architectural patterns, avoid hard framework assumptions at every layer
    - Separated concerns — dependency extraction became a pure discovery skill, not a decision-maker
    - Broke thick layers into sub-tasks — some layers had many projects, needed sub-agent handling
  - 8.7 **The final "layer doc" output** (tested on MasterData service):
    - Took 12 minutes to generate
    - Produced 12 dependency layers — "looks sane"
    - Layers varied in "thickness" (number of projects per layer)
    - Layers are numbered, ordered, and used as planning boundaries for parallel execution
  - 8.8 **Dependency extraction feeds everything downstream**: planning → build-fix loop → modernization execution
    - Results persisted into session/state so other agents can reason over them
    - Handed off to orchestration agents that decide what to modernize, when, and how
  - 8.9 Quote: "After lunch, I will look at taking our plan prompt and turning it into an agent" — the natural graduation from ad-hoc prompt to durable skill
- **Speaker Notes**: This slide tells the story of how the first skill was born. It's a microcosm of the entire workshop learning. Emphasize: no one got it right on the first try. The "little loop" of create→test→refine is normal and expected. The final agent ran in 12 minutes and produced a usable 12-layer plan. Jay: "We're breaking it down into more incremental steps."
- **Duration**: ~6 min
- **Animations**: Progressive reveal showing the evolution: prompt → choke → refine → working skill
- **Demo handoff**: → Demo 2

### DEMO 2: Dependency Layer Extraction — The Skill in Action

- Run the dependency layer extraction skill against a sample .NET solution
- Show the 12-layer output and explain what each layer represents
- Demonstrate the prompt→skill refinement loop live
- Show how the layer doc feeds into the build-fix loop
- **After slide**: 8

### 9. The Build-Fix Loop — Let Agents Drive

- **Layout**: default two-column with terminal snippet
- **Content**:
  - 9.1 Once a project is multi-targeted (e.g., framework + core), build failures become expected and useful signals
  - 9.2 The pattern: add new target → build fails → reveals missing APIs/incompatible calls → agent fixes iteratively → project builds cleanly → commit and move on
  - 9.3 Agents run builds automatically via `dotnet` CLI, observe failures, apply fixes, and repeat until stable
  - 9.4 In VS Code, enable auto-approval for safe commands (e.g., commands starting with `dotnet`) to let agents execute builds and fixes without manual confirmation on every iteration
  - 9.5 Taylor Southwick: "Make changes that are required to get you to modern .NET. Don't do all sorts of nice fluffy things." — focus on what's necessary, defer optimization
  - 9.6 This loop is especially effective once SDK-style projects and PackageReference are in place — failures are clearer and easier to isolate
  - 9.7 Humans intervene at review and commit boundaries, not at every step
- **Speaker Notes**: The build-fix loop is the inner engine of the migration. Once you trust it, you can let agents churn through dozens of projects. Scope it: one project at a time, commit at each boundary. Quote: "You can do a build-fix loop where you can just have the agent do it for you… and once you get that project done, you can commit that, stabilize it…"
- **Duration**: ~4 min
- **Animations**: Progressive reveal

### 10. The Strangler Fig — Incremental ASP.NET Migration

- **Layout**: default two-column with architecture diagram
- **Content**:
  - 10.1 For ASP.NET Framework → ASP.NET Core migration, use the Strangler Fig pattern
  - 10.2 Create a new ASP.NET Core project — do NOT attempt in-place conversion of the existing MVC app
  - 10.3 The Core app sits in front and is the "source of truth" — if an endpoint has been migrated, Core handles it; otherwise, it proxies the request back to the legacy Framework app
  - 10.4 Migrate controllers and views incrementally — one endpoint/flow at a time, each becomes available directly in Core
  - 10.5 Framework app remains fully deployed and functional as a fallback
  - 10.6 Test end-to-end continuously — Core endpoints can be validated even while most traffic still flows to Framework
  - 10.7 As more endpoints move to Core, the number of proxied routes shrinks until the Framework app can be fully retired
  - 10.8 This avoids the "turn it on at the end and hope" anti-pattern
  - 10.9 Use route inventory skills to analyze legacy routes (including ASPX pages acting as APIs) and plan the migration order
  - 10.10 Backward-compatibility routing: skills generate dual routes (modern + legacy) automatically for consumers dependent on `.aspx` routes
- **Speaker Notes**: The Strangler Fig was explicitly and strongly recommended. This is the only practical way to migrate very large ASP.NET solutions (100+ projects) without long "big bang" freezes. It enables production deployments before full completion and reduces risk through incremental rollout. Note: YARP was not prescribed — use whatever reverse proxy fits the environment.
- **Duration**: ~4 min
- **Animations**: Architecture diagram build showing Core growing / Framework shrinking

### 11. Go Async — Stop Watching Agents

- **Layout**: default two-column
- **Content**:
  - 11.1 Once engineers realized they could parallelize: Agent Panel, #runSubagent, Fleets, Squads → massive acceleration
  - 11.2 Jay Schmelzer: "Just shove it to the background. Let's go do something else, right?" and "You can't watch it."
  - 11.3 Sub-agents isolate heavy analysis or search work into separate context windows — "Anytime it needs to search or analyze things that could cause a lot of output, use the plan agent."
  - 11.4 Assign backlog items to agents and let them run — "We got a backlog of stuff, just assign it to the coding agent."
  - 11.5 Dependency layers enable parallelization: projects within the same layer can be modernized simultaneously, while layers are sequential
  - 11.6 Async conversion (sync→async) should be a separate, deferred agent — not part of the initial modernization pass. Taylor: "That's probably a good one for the deferred… having the agent continue on after you've done that core side."
  - 11.7 But it took 2-3 days to build confidence (and other practices below helped)
  - 11.8 Agent plugins in VS Code — package agentic assets and create a private marketplace for your org
  - 11.9 Discoverability and sharing of capabilities within an organization
- **Speaker Notes**: Day 1-2: engineers watched every agent step. Day 3-4: they fired off parallel tasks and reviewed results. The acceleration was dramatic. The key mindset shift: modernization is agent-orchestrated, not agent-monolithic. Async, performance, security, and cleanup work are separate, deferred agents.
- **Duration**: ~4 min
- **Animations**: Progressive reveal
- **Demo handoff**: → Demo 3

### DEMO 3: Async Parallel Execution

- Fire off multiple AppMod tasks in parallel using Agent Panel / subagents
- Show sub-agent context isolation for heavy analysis
- Show how to review results async
- **After slide**: 11

### 12. Tool Wrangling & Workspace MCP

- **Layout**: default
- **Content**:
  - 12.1 Tool Wrangling is a real discipline — when things went wrong, often tools had been disabled/enabled by different agents
  - 12.2 Jay on blind trust in tools: "We don't just trust the stuff… You will be overwhelmed by what it did." — tool output must be broken into smaller, inspectable steps
  - 12.3 The group deliberately restricted which tools were enabled in MCP to reduce noise and performance issues, rather than enabling everything by default
  - 12.4 Taylor provided explicit MCP setup steps: "Set up mcp.json… Set up connection with skills repo… Add a custom-instructions.md… Start with prompts!"
  - 12.5 Workspace-level `mcp.json`, shared prompt files in `.github/prompts`, repo-level `custom-instructions.md` — critical for repeatability across repos, not a per-developer setup
  - 12.6 Microsoft Learn MCP is critical — but everyone needs the same MCP server names → rely on Workspace MCPs
  - 12.7 Practical tip: NuGet MCP server config example for workspace `mcp.json`
- **Speaker Notes**: This is one of the "what doesn't work" items. Tool wrangling catches experienced teams off guard. Make it a discipline. Jay explicitly warned: "I can review it and I don't understand it. It's too much." — minimize tool surface area to what agents actually need.
- **Duration**: ~3 min

### 13. Observability — Chat Debug & The 100× Pattern

- **Layout**: default two-column with terminal snippet
- **Content**:
  - 13.1 Chat Debug started the week as one of the most useful tools for understanding when/why AppMod MCP and skills "go astray"
  - 13.2 "Show chat debug view" in the Copilot UI exposes: the top-level user prompt, the system prompt, each intermediate step, tool invocations and their inputs/outputs
  - 13.3 Transcript quote: "This is what it's basically doing – every little thing it does… you can literally see the entire prompt… and how all your stuff starts later again, if it's using a tool."
  - 13.4 `/troubleshoot` — "Why did you do X rather than Y?" — goal is diagnosis and understanding, not just remediation → 10×
  - 13.5 "/troubleshoot Why did you do X rather than Y **and then update Skill Z so that you don't do that again?**" → 100×
  - 13.6 On day 4, VS Code Insiders enabled enhanced Chat Debug — game changing!
  - 13.7 The 100× pattern: observe → diagnose → update skill → permanently fix the behavior
  - 13.8 Observability is essential for debugging unexpected outcomes, necessary for safe scaling of agent workflows, and a prerequisite for letting agents run with more autonomy
  - 13.9 Real leverage: agents operate in tight inner loops (build → fail → fix → rebuild), humans intervene at review and decision points, not at every step
- **Speaker Notes**: This is the most important operational pattern. The 100× multiplier comes from closing the feedback loop: don't just fix the immediate problem, update the skill so it never happens again. Observability makes agent behavior inspectable, not opaque — critical for trust, especially in production-adjacent workflows.
- **Duration**: ~5 min
- **Animations**: Progressive reveal (10× → 100×)
- **Demo handoff**: → Demo 4

### DEMO 4: /troubleshoot & The 100× Pattern

- Trigger an AppMod task that goes astray
- Use /troubleshoot to diagnose — show the Chat Debug view
- Ask "Why did you do X rather than Y and update Skill Z"
- Show the skill being updated and the behavior permanently fixed
- **After slide**: 13

### 14. Testing Strategy & Confidence Building

- **Layout**: default two-column
- **Content**:
  - 14.1 Testing is the primary constraint on safe modernization — many legacy projects lack sufficient automated tests
  - 14.2 Refactoring solely to make code testable can undermine baseline confidence — avoid it during the migration pass
  - 14.3 Focus on integration and end-to-end tests rather than perfect unit coverage
  - 14.4 Validate behavioral parity rather than internal implementation — the migrated app should behave the same, not be structured the same
  - 14.5 Use tools like Aspire (even with limited Framework support) to launch legacy apps and run endpoint-level tests
  - 14.6 Manual performance and integration testing gates are a reality — but also a bottleneck to reduce over time
  - 14.7 Build migration verification skills to compare old vs. new implementations and summarize deltas
- **Speaker Notes**: Testing was repeatedly described as the primary constraint. Don't chase unit coverage on legacy code — focus on behavioral parity at the integration level. The goal is confidence, not coverage metrics.
- **Duration**: ~3 min

### 15. What To Do Now — Partner Playbook

- **Layout**: default grid
- **Content**:
  - 15.1 Set up VS Code Insiders + update daily
  - 15.2 Install `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet — remove competing extensions
  - 15.3 Set up workspace-level `mcp.json` + `custom-instructions.md` for consistency
  - 15.4 Convert prompts to skills immediately — use Sensei to validate
  - 15.5 Build a dependency-layer upgrade plan before touching code — SDK-style conversion first
  - 15.6 Use the build-fix loop: add target → build → fix → commit → next project
  - 15.7 Plan Strangler Fig for ASP.NET apps — Core in front, proxy back to Framework
  - 15.8 Go async: Agent Panel, subagents, fleets — stop watching
  - 15.9 Implement the 100× pattern: /troubleshoot → diagnose → update skill
  - 15.10 Create an org plugin marketplace for skill sharing
  - 15.11 Keep modernization and multi-tenancy as parallel but separate streams — avoid scope explosion
  - 15.12 Run this workshop format with your customers
- **Speaker Notes**: This is the actionable checklist. Each item maps to a section they just saw. Emphasize that this entire approach is teachable and repeatable.
- **Duration**: ~3 min

### 16. Key Takeaways

- **Layout**: default
- **Content**: Seven principles from the workshop:
  1. There is no single-click AppMod for real apps — stop promising it, start structuring it
  2. Skills > Prompts — the team that builds skills accelerates the entire org
  3. Break the monster into layers — leaf-first, small PRs, always shippable
  4. SDK-style conversion is the hardest step — plan for a large PR and get it done first
  5. Strangler Fig for ASP.NET — Core in front, proxy back to Framework, shrink incrementally
  6. Go async or go home — parallelization is where the 10× comes from
  7. Close the feedback loop — /troubleshoot + skill update = 100× compounding improvement
- **Speaker Notes**: These seven principles map directly to the workshop experience. They're battle-tested. Strong alignment was reached: AI is an assistant and orchestrator, not an unchecked code generator. Skills are the unit of reuse; agents are the unit of execution. Confidence, testing, and reviewability are non-negotiable constraints.
- **Duration**: ~2 min
- **Animations**: Progressive reveal

### 17. The Partner Opportunity

- **Layout**: default
- **Content**:
  - Many customers claim AI Dev expertise but are months out of date — "months = years" at current pace
  - Running workshops like this for customers is a huge opportunity for partners
  - Reusable learnings, recorded workshops, skill libraries — all shareable
  - This is a partner product opportunity: AppMod-as-a-service using agentic tools
  - The entire approach is teachable and repeatable — build a modernization playbook with reusable agent + skill libraries
- **Speaker Notes**: The call to action for partners: this is your opportunity to differentiate. You can run this workshop format. The tools and skills are reusable.
- **Duration**: ~2 min

### 18. Thank You / Q&A

- **Layout**: center
- **Content**: Thank you, contact links, source repo, Auckland .NET User Group recording link
- **Speaker Notes**: Open for questions. Offer to walk through any demo in more detail.
- **Duration**: ~5 min

## Demos

| # | Demo Title | Description | After Slide | Prep Required |
|---|-----------|-------------|-------------|---------------|
| 1 | Building & Refining Skills | Build a skill from an agent conversation, validate with Sensei, convert-prompt-to-skill | 6 | Have a sample prompt to convert, Sensei installed |
| 2 | Dependency Layer Extraction | Run the layer extraction skill against a sample .NET solution, show prompt→skill refinement loop, demonstrate layer doc output feeding build-fix loop | 8 | Sample .NET app with complex dependencies, AppMod MCP NuGet installed |
| 3 | Async Parallel Execution | Fire off multiple AppMod tasks in parallel using Agent Panel/subagents | 11 | Multiple leaf projects ready for parallel modernization |
| 4 | /troubleshoot & The 100× Pattern | Trigger a misbehavior, diagnose with /troubleshoot and Chat Debug view, update skill to permanently fix | 13 | Prepared scenario where an AppMod skill makes a known mistake |

## Edge Cases Requiring Custom Skills

Specific edge cases identified during the workshop that required custom skills (not solvable by generic prompts):

1. **Legacy ASPX pages acting as APIs** — some ASPX files were not true Web Forms but acted as REST-like endpoints. Required custom skills to analyze behavior, convert to controllers, and preserve query patterns and routes.
2. **Backward-compatibility routing** — legacy consumers depended on `.aspx` routes. Skills generated dual routes (modern + legacy) automatically.
3. **System.Web dependencies that could not be rewritten immediately** — required encapsulation via System.Web adapter skills instead of prompt-based refactors.
4. **Context-window blowouts during large migrations** — agents attempting full migrations in one pass exceeded context limits. Drove creation of smaller, step-scoped skills (scaffold, migrate one controller, build-fix, verify).
5. **Bugs discovered during agent runs** — logged and converted into new or enhanced skills in the shared repository.

## Sample .NET App

A sample "legacy" .NET Framework application structured to demonstrate:

- Multi-project solution with dependency layers (leaf → intermediate → top-level)
- Common AppMod patterns (ASP.NET Framework → ASP.NET Core)
- Strangler Fig pattern with proxy between Core and Framework
- Pre-built skills for common AppMod edge cases (build-fix, route inventory, System.Web adapters)
- Workspace MCP config (`mcp.json`) for AppMod NuGet
- Designed to be usable in live demos within 5-10 minutes

## Resources & Links

### AppMod Tools

- [Microsoft.GitHubCopilot.AppModernization.Mcp NuGet](https://www.nuget.org/packages/Microsoft.GitHubCopilot.AppModernization.Mcp)
- [Auckland .NET User Group – Modernizing ASP.NET Framework to Core in 2026](https://microsoftapc-my.sharepoint.com/personal/chbonhom_microsoft_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fchbonhom_microsoft_com%2FDocuments%2FRecordings%2FAuckland%20.NET%20User%20Group%20%20Modernizing%20ASP.NET%20Framework%20to%20Core%20in%202026%20%20Daniel%20Scott-Raynsford-20260311_174556-Meeting%20Recording.mp4)

### Skills Ecosystem

- [Sensei](https://github.com/spboyer/sensei)
- [Convert Prompt to Skill](https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/convert-prompt-to-skill)
- [Skill Creator Skill](https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/skill-creator)
- [Agent Plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)

### Copilot Platform

- [About Agent Skills](https://docs.github.com/en/copilot/concepts/agents/about-agent-skills)
- [Copilot customization cheat sheet](https://docs.github.com/en/copilot/reference/customization-cheat-sheet)
- [MCP in VS Code](https://code.visualstudio.com/docs/copilot/customization/mcp-servers)
- [Microsoft Learn MCP](https://learn.microsoft.com/en-us/training/support/mcp)

### From agentic-development-evolution (reusable content)

- Skills over prompts section (1.3)
- MCP overview (1.5)
- /troubleshoot observability (2.1)
- Subagents and async execution (3.1-3.2)

## Evolution Log

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-08 | Initial outline created | New presentation based on AppMod workshop learnings |
| 2026-04-11 | Major expansion with detailed workshop guidance | Enriched from March 10 meeting transcript: added Strangler Fig pattern, build-fix loop, testing strategy, expanded skills detail, dependency layers, async/parallel, tool wrangling, observability, edge cases section |
| 2026-04-11 | Added Layer Extraction Skill creation slide (8) | Enriched from March 10-11 meeting transcripts: detailed prompt→skill pipeline story, choking problem and fix, refinement loop, 12-layer output, `sdc-mod-build-dependency-layers` agent evolution. Renumbered slides 9-18 |
