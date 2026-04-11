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

- **Layout**: Template 1 — Title Hero
- **Content**: Title, tightened subtitle, presenter, four framing badges:
  - 🔧 Skills > Prompts
  - 📦 Break it down (dependency layers)
  - ⚡ Go async
  - 🔍 /troubleshoot everything
- **Speaker Notes**: Frame this as a candid, lessons-learned session — not a sizzle reel. Everything here was earned over 4 days of real work on a real 10M LOC app.
- **Duration**: ~1 min

### 2. About Me

- **Layout**: Template 2 — About Me (VS Code Card)
- **Content**: Bio, links, session framing (unplugged, interactive, ask questions anytime)
- **Speaker Notes**: Set the tone — this is a conversation, not a lecture. Demo-heavy.
- **Duration**: ~1 min

### 3. The Workshop Context

- **Layout**: Template 4 — Banner Content
- **Content**:
  - 4-day SDC engagement in New Zealand with Microsoft SDC Partner
  - Collaborated with Jay Schmelzer (Director, DevDiv CoreAI AppMod) and Taylor Southwick (Principal Engineer, AppMod)
  - Target: 10M LOC, 30-year-old .NET application
  - "Completely game changing" experience — all 4 days recorded
- **Speaker Notes**: Establish credibility — this isn't theoretical. We did it, we learned, we're sharing.
- **Duration**: ~2 min

### 4. The Hard Truth About Large-Scale AppMod

- **Layout**: Template 5 — Before/After Comparison (expectation vs reality)
- **Content**:
  - 4.1 There are lots of "sizzle reels" showing magic single-click AI AppMod — "Everybody wants push a button… but the reality is it's not for any large or complex applications."
    - 4.1.1 Problem isn't code conversion — it's package support, ability to validate existing app, low understanding of existing app, technical debt etc.
    - 4.1.2 Just because we can convert some Cobol to Java doesn't address the actual problem at that complexity (millions of lines of code, incomplete functional spec, non linear pathway)
  - 4.2 Reality: if your app is small enough for single-click AppMod, it's small enough to rebuild entirely with AI
  - 4.3 For non-trivial apps (50K+ LOC), follow the standard .NET AppMod approach and techniques — then leverage AI to automate and make it repeatable
  - 4.4 AI is an acceleration and orchestration mechanism, not a blind code-rewriter — attempting to modernize an entire solution at once leads to unreviewable PRs, loss of confidence, and late regression discovery
  - 4.5 Jay on unreviewed PRs: "No one's gonna review that." — if the output is too large for a human to validate, the migration stalls
  - 4.6 You MUST understand standard .NET AppMod before starting — **recommended prerequisite**: watch the [Auckland .NET User Group recording](https://www.youtube.com/watch?v=umcl-Ooaay4) to get the most out of this presentation
  - 4.7 Show the primary .NET upgrade process ([images/upgrade-process.png](images/upgrade-process.png)) — this is the standard process for upgrading a .NET app and frames the entire presentation
- **Speaker Notes**: This is the "what doesn't work" part of the title. Set expectations correctly. AppMod CAT team's own words: stop promising magic. The incremental approach was repeatedly stressed — "maintain confidence at every step". Point attendees to the Auckland recording as essential prep.
- **Duration**: ~4 min
- **Animations**: Progressive reveal

### 5. The Right Toolchain & Tool Discipline

- **Layout**: Template 10 — Tools and Resources Grid
- **Content**:
  - 5.1 VS Code Insiders — mandatory. Jay Schmelzer: "Everyone in DevDiv uses Insiders, no one uses stable. We recommend all customers use Insiders unless they have some compliance reason not to."
  - 5.2 Update aggressively — every day we started with an update. Solutions to yesterday's problems often arrived in today's update
  - 5.3 Use `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet MCP package — the official AppMod tools and agents
  - 5.4 **WARNING**: Do NOT use the `GitHub Copilot modernization for .NET` VS Code extension ([marketplace link](https://marketplace.visualstudio.com/items?itemName=ms-dotnettools.vscode-dotnet-modernize)) — it depends on the deprecated `GitHub Copilot Chat` extension. Use the NuGet MCP package instead. Remove all other competing AppMod extensions
  - 5.5 Configure MCP servers in your workspace `.vscode/mcp.json` — ensures the entire team uses the same tool configuration:

    ```json
    {
      "inputs": [],
      "servers": {
        "context7": {
          "type": "stdio",
          "command": "npx",
          "args": ["-y", "@upstash/context7-mcp@latest"]
        },
        "Microsoft.GitHubCopilot.AppModernization.Mcp": {
          "type": "stdio",
          "command": "dotnet",
          "args": ["Microsoft.GitHubCopilot.AppModernization.Mcp@1.0.1026-preview1", "--yes"]
        }
      }
    }
    ```

  - 5.6 Tool wrangling is a real discipline — when things went wrong, often tools had been disabled/enabled by different agents. Restrict which tools are enabled to reduce noise. Taylor: "I can review it and I don't understand it. It's too much." — minimize tool surface area
  - 5.7 Workspace-level `mcp.json`, shared prompt files in `.github/prompts`, repo-level `custom-instructions.md` — critical for repeatability across repos, not a per-developer setup
  - 5.8 First step of any AppMod engagement: run a **Modernization Assessment** using `#generate_dotnet_upgrade_assessment` — this gives you the baseline report before any code changes
- **Speaker Notes**: "When developers complain 'Claude does X but Copilot doesn't' — it's because they're on old builds." DO NOT install both the extension and the NuGet MCP — pick one. Jay on blind trust in tools: "We don't just trust the stuff… You will be overwhelmed by what it did." — tool output must be broken into smaller, inspectable steps.
- **Duration**: ~3 min
- **Animations**: Progressive bullet reveal
- **Demo handoff**: → Demo 1

### DEMO 1: Modernization Assessment — First Steps

- Show the workspace `.vscode/mcp.json` configuration with `Microsoft.GitHubCopilot.AppModernization.Mcp` server
- Run `#discover_upgrade_scenarios` to identify available upgrade paths and scenarios
- Respond with `Yes, target .NET 10` — creates the `.github/upgrades/scenarios/dotnet-version-upgrade` folder with `assessment.csv`, `assessment.md`, `assessment.json` and `scenario.json` files
- Walk through the assessment report — project inventory, framework targets, dependency analysis, migration complexity
- Key metrics from the Orchard CMS assessment (see [dotnet-version-upgrade/assessment.md](dotnet-version-upgrade/assessment.md)):
  - 88 projects, all require upgrade (all net48, all non-SDK-style)
  - 93 NuGet packages (41 need upgrade)
  - 286K LOC across 4,549 code files — 5,016 issues found
  - Estimated 4,316+ LOC to modify (~1.5% of codebase)
  - Most modules rated 🔴 High difficulty (WAP project type), tests/libraries rated 🟢 Low
- Reference files in `dotnet-version-upgrade/`: [assessment.md](dotnet-version-upgrade/assessment.md), [assessment.json](dotnet-version-upgrade/assessment.json), [assessment.csv](dotnet-version-upgrade/assessment.csv), [scenario.json](dotnet-version-upgrade/scenario.json)
- This baseline report drives all subsequent planning: dependency layers, skill selection, and migration ordering
- **After slide**: 5

### 6. Breaking Down the Monster — Dependency Layers

- **Layout**: Template 9 — Pyramid Stack (dependency layers + Mermaid diagram)
- **Content**:
  - 6.1 AppMod MUST be broken into phases that result in a working application at each step — ship partial progress rather than waiting for full completion
  - 6.2 Each phase must be small enough to review in a PR — a 10K LOC PR is unacceptable and will never get merged → AppMod stalls
  - 6.3 Build a dependency tree, identify leaf nodes (fewest downstream dependencies), modernize leaves first using breadth-first/layered traversal
  - 6.4 Projects within the same dependency layer can be modernized in parallel; layers themselves remain sequential
  - 6.5 Use AI AppMod tools/agents/skills to generate the multi-layer dependency upgrade plan
  - 6.5a **Orchard CMS example**: `Orchard.sln` contains ~87 projects organized as Modules → Core → Framework → Web. NHibernate.Linq at the base, Orchard.Framework as the core hub, ~50 modules in the middle layers, Orchard.Web at the top
  - 6.6 SDK-style conversion is the first mandatory step — convert projects to SDK-style + PackageReference
    - Often the largest single PR and the hardest to decompose — SDK-style and `packages.config → PackageReference` are tightly coupled in current tooling
    - Mixing SDK-style and non-SDK projects in the same solution is "hit or miss" and causes build/restore issues
    - Old format explicitly listed transitive dependencies; new format uses inferred versions — leads to version collisions
    - Once SDK-style conversion is complete, further modernization becomes easier and more incremental
    - **Orchard CMS example**: all ~87 projects use `packages.config` — this is the critical gating step before any module-level work
  - 6.7 Package upgrades are solution-wide concerns — group logically (e.g., Azure SDKs together) to keep PRs reviewable
  - 6.8 For ASP.NET Framework → Core migration, plan a Strangler Fig: new Core app sits in front, proxies unmigrated routes to legacy Framework app, migrate endpoints incrementally — avoids the "turn it on at the end and hope" anti-pattern
- **Speaker Notes**: Break the problem into dependency layers, start at the leaves, keep PRs small. AI makes this repeatable. SDK-style conversion is the biggest hurdle. The layered approach enables parallelization within each layer. For web apps, Strangler Fig was explicitly and strongly recommended by the CAT team — Core in front, proxy to Framework, migrate incrementally.
- **Duration**: ~4 min
- **Animations**: Mermaid diagram build
- **Demo handoff**: → Demo 2

### DEMO 2: Dependency Layer Extraction — Orchard CMS

- Run the `appmod-layer-planner` skill (in [skills/appmod-layer-planner/](skills/appmod-layer-planner/)) against Orchard CMS's `Orchard.sln` (~88 projects)
- Show the generated output: [dotnet-version-upgrade/layer-plan.md](dotnet-version-upgrade/layer-plan.md) — a phased modernization plan with:
  - Mermaid dependency diagram showing Phase 0 (SDK-style) through Phase 15 (integration)
  - Phase summary table with story points and estimated LOC per layer
  - Per-phase project tables with issue counts and difficulty ratings
- Highlight key findings from the plan:
  - Phase 0 (SDK-style conversion) covers all 88 projects as a single gating step
  - Phase 1 foundation: 5 leaf projects (NHibernate.Linq, WarmupStarter, CLI tools) — all parallelizable
  - Phase 2: **Orchard.Framework** is the critical path bottleneck (1,682 story points, 709 mandatory issues)
  - Phases 4a/4b: 20 modules split into parallel batches — demonstrates the thick middle layers
  - Phase 15: integration tests as the final validation gate
- Show how the layer plan feeds into the build-fix loop and parallel execution planning
- **After slide**: 6

### 7. Skills Over Prompts — The Shift That Changed Everything

- **Layout**: Template 6 — Evolution Strip (prompts → skills progression)
- **Content**:
  - 7.1 Most engineers started the week building prompts → by mid-week everyone was building skills
  - 7.2 Prompts are flexible but fragile — skills are deterministic, reusable units of work. Prompts struggled with long context, repeatability, and resumability
  - 7.3 Very few use cases where a skill isn't a better fit. DevDiv expects prompts to "fade away"
  - 7.4 By end of week: 20+ skills for specialized AppMod edge cases, only ~2 prompts remaining (to "build new skills")
  - 7.5 Jay: "I've not seen one customer open up a markdown editor and just start typing the skill and it's done. It doesn't happen." — Use agent conversations to construct and refine skills iteratively
  - 7.6 **The prompt→skill pipeline** (the dependency layer extraction exemplifies this):
    1. Day 1: Started as a prompt — asked Copilot to analyze a solution and produce a layered dependency report
    2. First version choked — agent ingested everything at once, context window pressure, output too large to validate. Jay: "You will be overwhelmed by what it did"
    3. Day 2: Refined into an incremental, loop-based skill — narrowed scope, separated discovery from decision-making
    4. The refinement loop: do work interactively → ask Copilot to create/update a skill → try on real solution → inspect mismatches → adjust and re-run
    5. Final output: 12 dependency layers generated in 12 minutes — "looks sane"
  - 7.7 Key insight: "The tool is not to modernize the code — the tool is to help you build the process to modernize the code"
  - 7.8 Once engineers got comfortable → became a "Skill and Agent factory", amplifying the entire team
  - 7.9 Agents orchestrate skills and maintain state across steps — prompts become inputs to agents, not the execution mechanism
  - 7.10 Every organization should create their own agent plugin repo — a private marketplace for internal skills and agents. This was the primary collaboration mechanism by day 3
- **Speaker Notes**: This is the core operating model shift. Skills are deterministic, portable, discoverable. Prompts are throwaway. The prompt→choke→refine story is a microcosm of the workshop: no one got it right on the first try. The "little loop" of create→test→refine is normal and expected.
  Use [Sensei](https://github.com/spboyer/sensei) for skill quality validation and [Skill Creator](https://github.com/PlagueHO/plagueho.skills/tree/main/plugins/skill-lifecycle/skills/skill-creator) to scaffold new skills.
- **Duration**: ~5 min
- **Animations**: Progressive reveal showing evolution: prompt → choke → refine → working skill
- **Demo handoff**: → Demo 3

### DEMO 3: The Prompt→Skill Pipeline — Creating & Refining Skills

- **Step 1: Create a skill using Copilot**
  - Use a "skill creator" skill to scaffold a new skill (e.g., "analyze Orchard CMS's NHibernate usage and recommend EF Core equivalents")
  - Show the skill scaffold output, validate with [Sensei](https://github.com/spboyer/sensei)
  - **Concrete example**: the `appmod-layer-planner` skill in [skills/appmod-layer-planner/](skills/appmod-layer-planner/) was created this way
- **Step 2: Demonstrate the prompt→skill refinement loop live**
  - Show how the layer planner evolved from a naive prompt into a working skill
  - Show the iterative refinement: run → inspect → adjust → re-run
- **Step 3: Introduce Agent Plugins**
  - [Agent Plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins) let you package and share skills as installable units
  - Show: how to install a plugin from a repo, how the `.github/` structure maps to discoverable skills
  - [github/awesome-copilot](https://github.com/github/awesome-copilot) — community marketplace for skills, prompts, agents, and instructions
- **After slide**: 7

### 8. The Build-Fix Loop & Testing

- **Layout**: Template 15 — Code and Terminal Panels (build → fail → fix → rebuild cycle)
- **Content**:
  - 8.1 The pattern: add new target → build fails → reveals missing APIs/incompatible calls → agent fixes iteratively → project builds cleanly → commit and move on
  - 8.2 Agents run builds automatically via `dotnet` CLI, observe failures, apply fixes, and repeat until stable
  - 8.2a **Orchard CMS example**: convert Orchard.Tags (leaf module) to SDK-style → `dotnet build` fails on NHibernate references and missing System.Web types → agent resolves package references and adds compatibility shims → builds clean → commit and move to next module
  - 8.3 Enable auto-approval for safe commands (e.g., commands starting with `dotnet`) to let agents execute without manual confirmation on every iteration
  - 8.4 Taylor Southwick: "Make changes that are required to get you to modern .NET. Don't do all sorts of nice fluffy things." — focus on what's necessary, defer optimization
  - 8.5 Humans intervene at review and commit boundaries, not at every step
  - 8.6 **Testing is the primary constraint** on safe modernization — many legacy projects lack sufficient automated tests
  - 8.7 Focus on integration and end-to-end tests rather than perfect unit coverage — validate behavioral parity, not internal implementation
  - 8.8 Avoid refactoring solely to make code testable during the migration pass — this undermines baseline confidence
  - 8.9 Build migration verification skills to compare old vs. new implementations and summarize deltas
- **Speaker Notes**: The build-fix loop is the inner engine of the migration. Once you trust it, agents can churn through dozens of projects. Scope it: one project at a time, commit at each boundary. Testing was repeatedly described as the primary constraint — don't chase unit coverage on legacy code, focus on behavioral parity at the integration level. The goal is confidence, not coverage metrics.
- **Duration**: ~4 min
- **Animations**: Progressive reveal

### 9. Go Async — Stop Watching Agents

- **Layout**: Template 12 — 2x2 Overview Grid (Agent Panel, subagents, fleets, parallelization)
- **Content**:
  - 9.1 Once engineers realized they could parallelize: Agent Panel, #runSubagent, Fleets, Squads → massive acceleration
  - 9.2 Jay Schmelzer: "Just shove it to the background. Let's go do something else, right?" and "You can't watch it."
  - 9.3 Sub-agents isolate heavy analysis or search work into separate context windows — avoids blowing the main agent's context
  - 9.4 Assign backlog items to agents and let them run — "We got a backlog of stuff, just assign it to the coding agent."
  - 9.5 Dependency layers enable parallelization: projects within the same layer can be modernized simultaneously
  - 9.5a **Orchard CMS example**: leaf-layer modules like Orchard.Tags, Orchard.AntiSpam, Markdown, Lucene, and SysCache have no inter-dependencies — five agents can modernize all five simultaneously, each producing an independent PR
  - 9.6 Async conversion (sync→async), performance, security, and cleanup are separate, deferred agents — not part of the initial modernization pass
  - 9.7 It took 2-3 days to build confidence — the other practices (skills, layers, observability) are what enable trust
- **Speaker Notes**: Day 1-2: engineers watched every agent step. Day 3-4: they fired off parallel tasks and reviewed results. The acceleration was dramatic. The key mindset shift: modernization is agent-orchestrated, not agent-monolithic.
- **Duration**: ~3 min
- **Animations**: Progressive reveal
- **Demo handoff**: → Demo 4

### DEMO 4: Async Parallel Execution — Orchard Modules

- From the Orchard CMS [layer-plan.md](dotnet-version-upgrade/layer-plan.md), identify Phase 1 leaf projects (NHibernate.Linq, WarmupStarter, Orchard CLI, Orchard.Profile, MSBuild.Orchard.Tasks)
- Open multiple Agent Panels and fire off parallel modernization prompts — one per leaf project:

  **Agent 1:**
  > Using the assessment in `dotnet-version-upgrade/assessment.md` and the layer plan in `dotnet-version-upgrade/layer-plan.md`, modernize `Libraries\NHibernate\NHibernate.Linq\NHibernate.Linq.csproj` to SDK-style and resolve all API compatibility issues for net10.0. Create a branch `appmod/phase1-nhibernate-linq` and commit when building cleanly.

  **Agent 2:**
  > Using the assessment in `dotnet-version-upgrade/assessment.md` and the layer plan in `dotnet-version-upgrade/layer-plan.md`, modernize `Orchard.WarmupStarter\Orchard.WarmupStarter.csproj` to SDK-style and resolve all System.Web dependencies for net10.0. Create a branch `appmod/phase1-warmupstarter` and commit when building cleanly.

  **Agent 3:**
  > Using the assessment in `dotnet-version-upgrade/assessment.md` and the layer plan in `dotnet-version-upgrade/layer-plan.md`, modernize `Tools\Orchard\Orchard.csproj` (CLI) to SDK-style and resolve System.Web.Hosting and Remoting issues for net10.0. Create a branch `appmod/phase1-orchard-cli` and commit when building cleanly.

- Show sub-agent context isolation — each agent works independently without polluting the others' context
- Show how to review results async — each produces an independent, reviewable PR
- **Caveat**: in practice, generate a per-layer modernization plan first and review it before firing off execution agents — another skill opportunity
- **After slide**: 9

### 10. Observability & The 100× Pattern

- **Layout**: Template 11 — Workflow Pipeline (observe → diagnose → update skill → permanent fix)
- **Content**:
  - 10.1 "Show chat debug view" in the Copilot UI exposes: user prompt, system prompt, each intermediate step, tool invocations and their inputs/outputs
  - 10.2 `/troubleshoot` — "Why did you do X rather than Y?" — diagnosis and understanding, not just remediation → 10×
  - 10.3 "/troubleshoot Why did you do X rather than Y **and then update Skill Z so that you don't do that again?**" → 100×
  - 10.4 The 100× pattern: observe → diagnose → update skill → permanently fix the behavior. This is where compounding improvement lives
  - 10.5 On day 4, VS Code Insiders enabled enhanced Chat Debug — game changing
  - 10.6 Observability is essential for safe scaling of agent workflows and a prerequisite for letting agents run with more autonomy
- **Speaker Notes**: This is the most important operational pattern. The 100× multiplier comes from closing the feedback loop: don't just fix the immediate problem, update the skill so it never happens again. Observability makes agent behavior inspectable, not opaque — critical for trust.
- **Duration**: ~3 min
- **Animations**: Progressive reveal (10× → 100×)
- **Demo handoff**: → Demo 5

### DEMO 5: /troubleshoot & The 100× Pattern

- Trigger an AppMod task on an Orchard module that goes astray (e.g., agent incorrectly rewrites NHibernate session management or mishandles Autofac→DI conversion)
- Use /troubleshoot to diagnose — show the Chat Debug view
- Ask "Why did you do X rather than Y and update Skill Z"
- Show the skill being updated and the behavior permanently fixed
- **After slide**: 10

### 11. What To Do Now & Key Takeaways

- **Layout**: Template 17 — Action Grid + Key Takeaways
- **Content — Actions**:
  - 11.1 Set up VS Code Insiders + `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet — update daily, remove competing extensions
  - 11.2 Configure workspace `mcp.json` + `custom-instructions.md` for team consistency
  - 11.3 Start with [Orchard CMS](https://github.com/OrchardCMS/Orchard) as a practice target — experience the full workflow before a customer engagement
  - 11.4 Convert prompts to skills immediately — use [Sensei](https://github.com/spboyer/sensei) to validate, create an org plugin marketplace for sharing
  - 11.5 Build a dependency-layer plan before touching code, then use the build-fix loop: add target → build → fix → commit → next
  - 11.6 Implement the 100× pattern: /troubleshoot → diagnose → update skill → permanently fix
- **Content — Seven Key Principles**:
  1. There is no single-click AppMod for real apps — stop promising it, start structuring it
  2. Skills > Prompts — the team that builds skills accelerates the entire org
  3. Break the monster into layers — leaf-first, small PRs, always shippable
  4. SDK-style conversion is the hardest step — plan for a large PR and get it done first
  5. Strangler Fig for ASP.NET — Core in front, proxy back to Framework, shrink incrementally
  6. Go async or go home — parallelization is where the 10× comes from
  7. Close the feedback loop — /troubleshoot + skill update = 100× compounding improvement
- **Speaker Notes**: Each action maps to a section they just saw. The seven principles are battle-tested from the workshop. This entire approach is teachable and repeatable — many customers claim AI Dev expertise but are months out of date. Running workshops like this is a huge opportunity to differentiate.
- **Duration**: ~3 min
- **Animations**: Progressive reveal

### 12. Thank You / Q&A

- **Layout**: Template 21 — Thank You / Q&A
- **Content**: Thank you, contact links, source repo, Auckland .NET User Group recording link
- **Speaker Notes**: Open for questions. Offer to walk through any demo in more detail.
- **Duration**: ~5 min

## Demos

| # | Demo Title | Description | After Slide | Prep Required |
|---|-----------|-------------|-------------|---------------|
| 1 | Modernization Assessment — First Steps | Configure `.vscode/mcp.json` with `Microsoft.GitHubCopilot.AppModernization.Mcp`, run assessment against Orchard CMS, walk through baseline report | 5 | Orchard CMS repo cloned, VS Code Insiders, MCP NuGet installed |
| 2 | Dependency Layer Extraction — Orchard CMS | Run `appmod-layer-planner` skill against Orchard CMS, show generated `layer-plan.md` with 15-phase plan, Mermaid diagram, story points per layer | 6 | `appmod-layer-planner` skill in `skills/`, assessment from Demo 1, Orchard CMS repo cloned |
| 3 | The Prompt→Skill Pipeline | Create a skill with skill-creator, validate with Sensei, demonstrate prompt→skill refinement loop, introduce Agent Plugins | 7 | Skill-creator skill installed, Sensei installed, assessment from Demo 1 available |
| 4 | Async Parallel Execution — Orchard Modules | Fire off parallel AppMod tasks across multiple Orchard leaf modules using Agent Panel/subagents | 9 | Orchard CMS layer doc generated, leaf-layer modules identified for parallel modernization |
| 5 | /troubleshoot & The 100× Pattern | Trigger a misbehavior during Orchard module migration, diagnose with /troubleshoot and Chat Debug view, update skill to permanently fix | 10 | Prepared scenario where an AppMod skill makes a known mistake on an Orchard module |

## Edge Cases Requiring Custom Skills

Specific edge cases identified during the workshop that required custom skills (not solvable by generic prompts):

1. **Legacy ASPX pages acting as APIs** — some ASPX files were not true Web Forms but acted as REST-like endpoints. Required custom skills to analyze behavior, convert to controllers, and preserve query patterns and routes.
2. **Backward-compatibility routing** — legacy consumers depended on `.aspx` routes. Skills generated dual routes (modern + legacy) automatically.
3. **System.Web dependencies that could not be rewritten immediately** — required encapsulation via System.Web adapter skills instead of prompt-based refactors.
4. **Context-window blowouts during large migrations** — agents attempting full migrations in one pass exceeded context limits. Drove creation of smaller, step-scoped skills (scaffold, migrate one controller, build-fix, verify).
5. **Bugs discovered during agent runs** — logged and converted into new or enhanced skills in the shared repository.

## Sample .NET App — Orchard CMS 1.x

We use [Orchard CMS 1.x](https://github.com/OrchardCMS/Orchard) (`OrchardCMS/Orchard`, `dev` branch) as the live demo target:

- **~87 projects** in `src/Orchard.sln` — modules, core framework, tests, tools, themes, and libraries
- Pure **.NET Framework** (ASP.NET MVC 5.x) — explicitly "the older, .NET Framework-based version"
- **BSD-3-Clause** license, .NET Foundation member, 2.4K stars, 186 contributors
- Rich module system (~50 modules: Blogs, Workflows, Taxonomies, DynamicForms, Search, Caching, Redis, Azure, etc.) — ideal dependency layer analysis material
- **NHibernate ORM** — creates realistic ORM-to-EF-Core migration scenarios
- Uses `packages.config` everywhere — perfect for SDK-style conversion demos
- Test projects included (Orchard.Framework.Tests, Orchard.Core.Tests, Orchard.Tests.Modules, etc.)
- Solution folders organized into Modules, Tests, Tools, Themes, Libraries — mirrors the dependency layer extraction story
- A clear successor exists: [Orchard Core](https://github.com/OrchardCMS/OrchardCore) on ASP.NET Core — gives a real-world reference for what "done" looks like
- Workspace MCP config (`mcp.json`) for AppMod NuGet

### Why Orchard CMS?

| Criterion | Orchard CMS 1.x |
|-----------|------------------|
| Projects in solution | ~87 |
| Framework | .NET Framework 4.x (ASP.NET MVC) |
| License | BSD-3-Clause |
| ORM | NHibernate (→ EF Core migration story) |
| Package format | `packages.config` (→ SDK-style + PackageReference) |
| Module architecture | ~50 decoupled modules with clear dependency graph |
| ASP.NET migration path | Strangler Fig → Orchard Core |
| Test coverage | Unit + integration + spec tests |
| Community & docs | .NET Foundation, extensive docs, active Discord |

## Resources & Links

### Demo App

- [Orchard CMS 1.x](https://github.com/OrchardCMS/Orchard) — ~87 project .NET Framework CMS, BSD-3-Clause, .NET Foundation
- [Orchard Core](https://github.com/OrchardCMS/OrchardCore) — the ASP.NET Core successor (reference for "what done looks like")

### AppMod Tools

- [Microsoft.GitHubCopilot.AppModernization.Mcp NuGet](https://www.nuget.org/packages/Microsoft.GitHubCopilot.AppModernization.Mcp)
- [Auckland .NET User Group – Modernizing ASP.NET Framework to Core in 2026](https://microsoftapc-my.sharepoint.com/personal/chbonhom_microsoft_com/_layouts/15/stream.aspx?id=%2Fpersonal%2Fchbonhom_microsoft_com%2FDocuments%2FRecordings%2FAuckland%20.NET%20User%20Group%20%20Modernizing%20ASP.NET%20Framework%20to%20Core%20in%202026%20%20Daniel%20Scott-Raynsford-20260311_174556-Meeting%20Recording.mp4)

### Skills Ecosystem

- [Sensei](https://github.com/spboyer/sensei)
- [Convert Prompt to Skill](https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/convert-prompt-to-skill)
- [Skill Creator Skill (PlagueHO)](https://github.com/PlagueHO/plagueho.skills/tree/main/plugins/skill-lifecycle/skills/skill-creator)
- [Agent Plugins in VS Code](https://code.visualstudio.com/docs/copilot/customization/agent-plugins)
- [github/awesome-copilot](https://github.com/github/awesome-copilot) — community plugin marketplace for skills, prompts, agents, and instructions

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
| 2026-04-11 | Adopted Orchard CMS 1.x as demo app | Replaced generic "sample .NET app" with Orchard CMS (OrchardCMS/Orchard, ~87 projects, .NET Framework, BSD-3-Clause). Updated all demos, slide examples, and resources to reference Orchard CMS |
| 2026-04-11 | Structural tightening pass | Merged slides 7+8 (Skills), 9+14 (Build-Fix+Testing), 15+16+17 (Actions+Takeaways). Folded Strangler Fig into dependency layers, tool wrangling into toolchain. Reordered demos for narrative consistency. Reduced from 18 to 12 slides to fit 45-minute slot. Fixed MCP package name inconsistency, duplicate 4.1.1 numbering, `dnx` typo, Demo 1 path typo |
