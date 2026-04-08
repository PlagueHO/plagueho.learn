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
| **Last Updated** | 2026-04-08 |
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
  - 4-day SDC engagement in New Zealand with partner Vista
  - Hosted with Steve Hornblow
  - Collaborated with Jay Schmelzer (Director, DevDiv CoreAI AppMod) and Taylor Southwick (Principal Engineer, AppMod)
  - Target: 10M LOC, 30-year-old .NET application
  - "Completely game changing" experience — all 4 days recorded
- **Speaker Notes**: Establish credibility — this isn't theoretical. We did it, we learned, we're sharing.
- **Duration**: ~2 min

### 4. The Hard Truth About Large-Scale AppMod

- **Layout**: default two-column
- **Content**:
  - 4.1 The AppMod CAT team is frustrated with "sizzle reels" showing magic single-click AI AppMod
  - 4.2 Reality: if your app is small enough for single-click AppMod, it's small enough to rebuild entirely with AI
  - 4.3 For non-trivial apps (50K+ LOC), follow the standard .NET AppMod approach and techniques — then leverage AI to automate and make it repeatable
  - 4.4 You MUST understand standard .NET AppMod before starting (link to Auckland .NET User Group recording)
- **Speaker Notes**: This is the "what doesn't work" part of the title. Set expectations correctly. AppMod CAT team's own words: stop promising magic.
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
  - 6.2 Very few use cases where a skill isn't a better fit than a prompt. DevDiv expects prompts to "fade away"
  - 6.3 By end of week: 20+ skills for specialized AppMod edge cases, only ~2 prompts remaining (to "build new skills")
  - 6.4 Use agent conversations to construct and refine skills — skills are repeatable process building blocks called like tools
  - 6.5 Sensei for skill quality validation
  - 6.6 Skill Creator Skill and Convert-Prompt-to-Skill tool
  - 6.7 Once engineers got comfortable → became a "Skill and Agent factory", amplifying the entire team
- **Speaker Notes**: This is the core operating model shift. Skills are deterministic, portable, discoverable. Prompts are throwaway. The workshop proved this over 4 days with real engineers.
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
  - 7.1 AppMod MUST be broken into phases that result in a working application at each step
  - 7.2 Each phase must be small enough to review in a PR — a 10K LOC PR is unacceptable and will never get merged → AppMod stalls
  - 7.3 Use AI AppMod tools/agents/skills to build a multi-layer dependency upgrade plan
  - 7.4 Start at leaf projects, work up through the dependency tree
  - 7.5 Continuous small incremental change: AI tools + agents + skills ensure change is reviewable and mergeable
- **Speaker Notes**: This is the "how to fix it" part. The key insight: break the problem into dependency layers, start at the leaves, keep PRs small. AI makes this repeatable, not magical.
- **Duration**: ~5 min
- **Animations**: Mermaid diagram build
- **Demo handoff**: → Demo 2

### DEMO 2: Dependency Analysis & Upgrade Planning

- Use AppMod MCP to analyze a project dependency tree
- Generate a multi-layer upgrade plan
- Show leaf-first approach
- **After slide**: 7

### 8. Go Async — Stop Watching Agents

- **Layout**: default two-column
- **Content**:
  - 8.1 Once engineers realized they could parallelize: Agent Panel, #runSubagent, Fleets, Squads → massive acceleration
  - 8.2 But it took 2-3 days to build confidence (and other practices below helped)
  - 8.3 Agent plugins in VS Code — package agentic assets and create a private marketplace for your org
  - 8.4 Discoverability and sharing of capabilities within an organization
- **Speaker Notes**: Day 1-2: engineers watched every agent step. Day 3-4: they fired off parallel tasks and reviewed results. The acceleration was dramatic.
- **Duration**: ~4 min
- **Animations**: Progressive reveal
- **Demo handoff**: → Demo 3

### DEMO 3: Async Parallel Execution

- Fire off multiple AppMod tasks in parallel using Agent Panel / subagents
- Show how to review results async
- **After slide**: 8

### 9. Tool Wrangling & Workspace MCP

- **Layout**: default
- **Content**:
  - 9.1 Tool Wrangling is a real discipline — when things went wrong, often tools had been disabled/enabled by different agents
  - 9.2 Spend time rationalizing: ensure agents have only the tools they need
  - 9.3 Microsoft Learn MCP is critical — but everyone needs the same MCP server names → rely on Workspace MCPs
  - 9.4 Practical tip: workspace-level MCP config in `mcp.json` ensures consistency
- **Speaker Notes**: This is one of the "what doesn't work" items. Tool wrangling catches experienced teams off guard. Make it a discipline.
- **Duration**: ~3 min

### 10. Observability — Chat Debug & The 100× Pattern

- **Layout**: default two-column with terminal snippet
- **Content**:
  - 10.1 Chat Debug started the week as one of the most useful tools for understanding when/why AppMod MCP and skills "go astray"
  - 10.2 `/troubleshoot` — "Why did you do X rather than Y?" → 10×
  - 10.3 "/troubleshoot Why did you do X rather than Y **and then update Skill Z so that you don't do that again?**" → 100×
  - 10.4 On day 4, VS Code Insiders enabled enhanced Chat Debug — game changing!
  - 10.5 The 100× pattern: observe → diagnose → update skill → permanently fix the behavior
- **Speaker Notes**: This is the most important operational pattern. The 100× multiplier comes from closing the feedback loop: don't just fix the immediate problem, update the skill so it never happens again.
- **Duration**: ~5 min
- **Animations**: Progressive reveal (10× → 100×)
- **Demo handoff**: → Demo 4

### DEMO 4: /troubleshoot & The 100× Pattern

- Trigger an AppMod task that goes astray
- Use /troubleshoot to diagnose
- Ask "Why did you do X rather than Y and update Skill Z"
- Show the skill being updated and the behavior permanently fixed
- **After slide**: 10

### 11. What To Do Now — Partner Playbook

- **Layout**: default grid
- **Content**:
  - 11.1 Set up VS Code Insiders + update daily
  - 11.2 Install `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet — remove competing extensions
  - 11.3 Convert prompts to skills immediately — use Sensei to validate
  - 11.4 Build a dependency-layer upgrade plan before touching code
  - 11.5 Go async: Agent Panel, subagents, fleets — stop watching
  - 11.6 Implement the 100× pattern: /troubleshoot → diagnose → update skill
  - 11.7 Create an org plugin marketplace for skill sharing
  - 11.8 Run this workshop format with your customers
- **Speaker Notes**: This is the actionable checklist. Each item maps to a section they just saw. Emphasize that this entire approach is teachable and repeatable.
- **Duration**: ~3 min

### 12. Key Takeaways

- **Layout**: default
- **Content**: Five principles from the workshop:
  1. There is no single-click AppMod for real apps — stop promising it, start structuring it
  2. Skills > Prompts — the team that builds skills accelerates the entire org
  3. Break the monster into layers — leaf-first, small PRs, always shippable
  4. Go async or go home — parallelization is where the 10× comes from
  5. Close the feedback loop — /troubleshoot + skill update = 100× compounding improvement
- **Speaker Notes**: These five principles map directly to the workshop experience. They're battle-tested.
- **Duration**: ~2 min
- **Animations**: Progressive reveal

### 13. The Partner Opportunity

- **Layout**: default
- **Content**:
  - Many customers claim AI Dev expertise but are months out of date — "months = years" at current pace
  - Running workshops like this for customers is a huge opportunity for partners
  - Reusable learnings, recorded workshops, skill libraries — all shareable
  - This is a partner product opportunity: AppMod-as-a-service using agentic tools
- **Speaker Notes**: The call to action for partners: this is your opportunity to differentiate. You can run this workshop format. The tools and skills are reusable.
- **Duration**: ~2 min

### 14. Thank You / Q&A

- **Layout**: center
- **Content**: Thank you, contact links, source repo, Auckland .NET User Group recording link
- **Speaker Notes**: Open for questions. Offer to walk through any demo in more detail.
- **Duration**: ~5 min

## Demos

| # | Demo Title | Description | After Slide | Prep Required |
|---|-----------|-------------|-------------|---------------|
| 1 | Building & Refining Skills | Build a skill from an agent conversation, validate with Sensei, convert-prompt-to-skill | 6 | Have a sample prompt to convert, Sensei installed |
| 2 | Dependency Analysis & Upgrade Planning | Use AppMod MCP to analyze dependency tree, generate multi-layer upgrade plan | 7 | Sample .NET app with complex dependencies, AppMod MCP NuGet installed |
| 3 | Async Parallel Execution | Fire off multiple AppMod tasks in parallel using Agent Panel/subagents | 8 | Multiple leaf projects ready for parallel modernization |
| 4 | /troubleshoot & The 100× Pattern | Trigger a misbehavior, diagnose with /troubleshoot, update skill to permanently fix | 10 | Prepared scenario where an AppMod skill makes a known mistake |

## Sample .NET App

A sample "legacy" .NET Framework application structured to demonstrate:

- Multi-project solution with dependency layers (leaf → intermediate → top-level)
- Common AppMod patterns (ASP.NET Framework → ASP.NET Core)
- Pre-built skills for common AppMod edge cases
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
| 2026-04-08 | Initial outline created | New presentation based on Vista AppMod workshop learnings |
