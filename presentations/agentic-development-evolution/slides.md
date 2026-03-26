---
theme: seriph
title: "Agentic Development Evolution: A View of the Last 6 Months"
info: |
  ## Agentic Development Evolution: A View of the Last 6 Months
  A 40-minute presentation by Daniel Scott-Raynsford on how GitHub Copilot,
  skills, MCP, subagents, and prototype-first workflows have changed the
  engineering operating model.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<!-- Slide 1: Title -->

<div class="hero-shell">
  <p class="eyebrow">GitHub Copilot, skills, MCP, orchestration</p>
  <h1 class="hero-heading">Agentic Development Evolution</h1>
  <p class="hero-sub">
    A view of the last 6 months: how the workflow shifted from prompts and
    chat assistance to governed skills, agents, MCP tools, and coordinated
    execution.
  </p>

  <div class="hero-meta">
    <span>Daniel Scott-Raynsford</span>
    <span>40 minutes</span>
    <span>Slides are anchors, demos do the proof</span>
  </div>

  <div class="hero-badge-grid">
    <div class="badge-card">
      <strong>Skills over prompts</strong>
      <span>Reusable, governed, portable behavior</span>
    </div>
    <div class="badge-card">
      <strong>MCP everywhere</strong>
      <span>Tools are now first-class context</span>
    </div>
    <div class="badge-card">
      <strong>Determinism beats vibe</strong>
      <span>Specs and workflow guardrails matter</span>
    </div>
    <div class="badge-card">
      <strong>Scale out the work</strong>
      <span>Subagents, squads, sessions, fleets</span>
    </div>
  </div>
</div>

<!-- Speaker notes: Open with the claim that the big change is not better autocomplete. It is the move from isolated assistance to an operating model for governed AI work. -->

---
transition: fade-out
---

<!-- Slide 2: About / framing -->

# About Me

<div class="slide-shell">
  <div class="panel two-col-grid">
    <div>
      <ul class="dense-list">
        <li><strong>Daniel Scott-Raynsford</strong> (PlagueHO)</li>
        <li>Partner Solution Architect, Cloud and AI Apps, Microsoft EPS</li>
        <li>Open source contributor and recovering software engineer</li>
        <li><a href="https://danielscottraynsford.com" target="_blank">danielscottraynsford.com</a></li>
        <li><a href="https://github.com/PlagueHO" target="_blank">github.com/PlagueHO</a></li>
      </ul>
    </div>

    <div>
      <p class="kicker">Session framing</p>
      <ul class="dense-list">
        <li>This is not a feature dump. It is a workflow shift.</li>
        <li>We will stay close to tools, frameworks, and concrete operating patterns.</li>
        <li>Each section is intentionally short so we can jump out to live code and demos.</li>
        <li>If a pattern is repeatable and needs better outcomes, it probably wants to become a skill.</li>
      </ul>
    </div>
  </div>
</div>

<!-- Speaker notes: Set the expectation that most value comes from the examples between slides, not from reading bullet lists. -->

---
transition: slide-up
---

<!-- Slide 3: Table of contents -->

# Table of Contents

<div class="slide-shell">
  <div class="section-grid">
    <div class="section-card">
      <p class="section-number">01</p>
      <h2>Agentic first</h2>
      <p>Governance, skills, MCP, troubleshooting, Spec Kit, Copilot CLI.</p>
    </div>
    <div class="section-card">
      <p class="section-number">02</p>
      <h2>Scaling intelligence out</h2>
      <p>From <code>runSubagent</code> to squads, fleets, and monitored sessions.</p>
    </div>
    <div class="section-card">
      <p class="section-number">03</p>
      <h2>Beyond development</h2>
      <p>RPI workflows, HVE Core, and prototype-driven cross-role collaboration.</p>
    </div>
    <div class="section-card">
      <p class="section-number">04</p>
      <h2>Wrap</h2>
      <p>What to install, what to build, and where to invest next.</p>
    </div>
  </div>

  <p class="demo-note">
    Demo jump points: <code>/troubleshoot</code>, WorkIQ prompt-to-demo flow,
    subagent scale-out, Squad shell, and <a href="https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest" target="_blank">az prototype</a>.
  </p>
</div>

<!-- Speaker notes: Tell the audience these slides are there to keep the thread coherent while the demos show the actual behavior. -->

---
transition: fade-out
---

<!-- Slide 4: Section 1A -->

# Agentic First Means Operating Model, Not Prompt Tricks

<div class="slide-shell">
  <div class="panel two-col-grid">
    <div>
      <ul class="dense-list">
        <li>Teams now govern <strong>agents, tools, and skills</strong> at both the workspace and organization level.</li>
        <li>The transition from prompt files to <a href="https://docs.github.com/en/copilot/concepts/agents/about-agent-skills" target="_blank">skills</a> is underway because reusable behavior scales better than chat folklore.</li>
        <li><a href="https://modelcontextprotocol.io/" target="_blank">MCP</a> has become the common tool layer for enterprise data, services, and workflows.</li>
        <li>State of the art is moving fast enough that many teams default to <strong>VS Code Insiders</strong> when they can.</li>
      </ul>
    </div>

    <div>
      <p class="kicker">Useful ecosystem anchors</p>
      <ul class="dense-list compact-links">
        <li><a href="https://github.com/dotnet/skills" target="_blank">dotnet/skills</a> - curated agent skills and plugin marketplace patterns</li>
        <li><a href="https://github.com/PlagueHO/plagueho.skills" target="_blank">PlagueHO/plagueho.skills</a> - portable plugin bundles and skill lifecycle workflows</li>
        <li><a href="https://github.com/github/awesome-copilot" target="_blank">github/awesome-copilot</a> - community agents, skills, hooks, plugins, and learning hub</li>
        <li><a href="https://docs.github.com/en/copilot/reference/customization-cheat-sheet" target="_blank">Copilot customization cheat sheet</a> - fast comparison of agents, skills, instructions, and prompt files</li>
      </ul>

      <div class="callout">
        Placeholder: add the screenshot showing how much code in VS Code is now
        committed by Copilot versus humans.
      </div>
    </div>
  </div>
</div>

<!-- Speaker notes: Make the point that the center of gravity moved from one person's prompting style to shared assets that can be versioned, reviewed, and distributed. -->

---
transition: fade-out
layout: two-cols
layoutClass: gap-10
---

<!-- Slide 5: Section 1B -->

# Better Outcomes Came From Determinism, Visibility, and Orchestration

- `/troubleshoot` helps explain why an agent, instruction, tool, or skill did
  or did not activate.
- [Spec Kit](https://github.com/github/spec-kit) and other SDD patterns move
  teams away from vibe-coding and toward clearer engineering outcomes.
- GitHub Copilot CLI is becoming an orchestration layer for plugins, agents,
  skills, and model choice instead of just a shell wrapper.
- [GitHub Agentic Workflows](https://github.com/github/gh-aw) extends that
  shift into repository automation by compiling natural-language markdown
  workflows into guarded GitHub Actions with `gh aw compile`.
- MCP tools like WorkIQ make prompts like "build me a demo from the meeting
  about Zava" operational instead of hypothetical.

> Demo jump: show `/troubleshoot`, a Spec Kit flow, and a WorkIQ-style
> enterprise query that turns meeting context into a build task.

::right::

## Execution Stack

1. Prompt or request
2. Skill or workflow
3. Agent or coordinator
4. MCP tools plus specs and policy
5. Org systems, context, and deterministic execution

<!-- Speaker notes: The key argument here is that better models helped, but better process helped more. -->

---
transition: slide-left
layout: two-cols
layoutClass: gap-10
---

<!-- Slide 6: Section 2A -->

# Scaling Intelligence Out: From Subagents to Squads

- `runSubagent` normalized the idea that one agent can split work into
  specialized parallel tasks.
- Persistent team patterns such as
  [Squad](https://github.com/bradygaster/squad) extend that into repo-resident
  rosters, routing, history, and decisions.
- Fleets and squad-style coordination make sense when the context cost of one
  giant agent is higher than the coordination cost of several focused ones.
- The right question is no longer "which model?" but "what operating shape fits
  this task?"

::right::

## Routing Shape

1. User task
2. Primary agent
3. `runSubagent`
4. Research, code, and review in parallel
5. Shared result
6. Squad or fleet coordination when persistence matters

<!-- Speaker notes: Keep this grounded in practical routing. Use more agents only when the seams between tasks are real. -->

---
transition: fade-out
layout: two-cols
layoutClass: gap-10
---

<!-- Slide 7: Section 2B -->

# The New Surface Area Is Monitoring, Memory, and Recovery

- One place to observe active work, blocked work, and completed work.
- Persistent team memory and decision logs instead of one-off chat state.
- Recovery paths when a spawned task fails or loses response context.
- Lower friction for non-developers to supervise agent work.

::right::

```text
squad
/status
/agents
/sessions
```

Squad describes itself as an AI development team that lives in your repo,
persists across sessions, shares decisions, and gets better the more you use
it.

<!-- Speaker notes: Contrast this with the older pattern where one chat thread had to carry everything. -->

---
transition: slide-up
layout: two-cols
layoutClass: gap-10
---

<!-- Slide 8: Section 3A -->

# Agentic Development Is Expanding Beyond Development

- [HVE Core](https://microsoft.github.io/hve-core/docs/getting-started/)
  reframes AI collaboration around **Research, Plan, Implement** instead of
  "just write the code".
- The RPI constraint improves reviewability because artifacts are produced in
  sequence and can be challenged before implementation.
- Role guides, design-thinking flows, and MCP configuration make the workflow
  accessible to PMs, architects, and analysts.
- VS Code sessions make those roles visible participants in the same operating
  surface.

::right::

## The Important Shift

Better agentic systems do not just generate code faster. They make
**research**, **planning**, and **review** first-class outputs that more roles
can work on.

Useful reading:
[RPI workflow](https://microsoft.github.io/hve-core/docs/rpi/)
and
[design-thinking path](https://microsoft.github.io/hve-core/docs/design-thinking/)

<!-- Speaker notes: This is where you widen the frame beyond software engineers and show why sessions and artifacts matter. -->

---
transition: fade-out
layout: two-cols
layoutClass: gap-10
---

<!-- Slide 9: Section 3B -->

# Prototype-First Workflows Shrink the Distance to a Working Demo

```bash
az prototype init --name retail-assistant --template ai-app
az prototype design --interactive
az prototype build
az prototype deploy
```

From the docs: `init` scaffolds the project, `design` engages a biz-analyst
agent, `build` generates staged outputs, and `deploy` adds preflight checks
plus slash-command control.

::right::

- [Azure CLI prototype](https://learn.microsoft.com/en-us/cli/azure/prototype?view=azure-cli-latest)
  turns architecture, code generation, and deployment into one iterative flow.
- That makes demos easier to build for PMs, solution architects, and business
  stakeholders, not just app developers.
- A working app now beats a beautiful mock-up more often than ever, because the
  cost of generating the first useful slice is dropping fast.

<!-- Speaker notes: Use this slide to pivot from engineering workflow to prototype economics. -->

---
transition: slide-left
layout: default
---

<!-- Slide 10: Section 4 -->

# What To Do Now

1. Use VS Code Insiders and Copilot CLI when your team can tolerate preview cadence.
2. If you will do it more than once and it needs determinism, turn it into a skill.
3. Start with subagents. Move to squads or fleets only when persistent coordination pays off.
4. Bring PMs, designers, business managers, and analysts into the same visible artifact chain.
5. Build demos of everything. A working slice now teaches faster than a polished plan alone.

<!-- Speaker notes: Close the argument by making the adoption steps small and concrete. -->

---
class: px-20
transition: fade-out
---

<!-- Slide 11: Key takeaways -->

# Key Takeaways

<v-clicks>

1. The biggest change was moving from isolated prompting to governed AI work.
2. Skills, plugins, and MCP tools are now the reusable leverage layer.
3. Determinism comes from specs, plans, and observability, not optimism.
4. Multi-agent scale only works when monitoring, memory, and recovery exist.
5. The agentic workflow now belongs to more roles than engineering alone.

</v-clicks>

<p class="resource-line">
  Follow-up links: <a href="https://github.com/github/spec-kit" target="_blank">Spec Kit</a>,
  <a href="https://github.com/bradygaster/squad" target="_blank">Squad</a>,
  <a href="https://github.com/dotnet/skills" target="_blank">dotnet/skills</a>,
  <a href="https://github.com/PlagueHO/plagueho.skills" target="_blank">plagueho.skills</a>,
  <a href="https://github.com/github/awesome-copilot" target="_blank">awesome-copilot</a>
</p>

<!-- Speaker notes: Re-state that the workflow shift matters more than any one launch. -->

---
layout: center
class: text-center
---

<!-- Slide 12: Thank you -->

# Thank You

Questions?

<p class="resource-line">
  <a href="https://github.com/PlagueHO" target="_blank">GitHub</a>
  ·
  <a href="https://danielscottraynsford.com" target="_blank">Website</a>
  ·
  <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank">Slides source</a>
</p>

<!-- Speaker notes: Invite questions, then offer to stay in the repo and show a real workflow rather than returning to theory. -->