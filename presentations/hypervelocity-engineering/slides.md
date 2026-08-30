---
theme: default
title: "Hypervelocity Engineering: From Concept to Code with HVE-Core"
info: |
  ## Hypervelocity Engineering: From Concept to Code with HVE-Core
  A 90-minute deep dive into disciplined AI-assisted engineering —
  from the why of HVE to hands-on RPI workflows and GitHub Backlog Manager.
  A presentation by Daniel Scott-Raynsford.
tags:
  - HVE-Core
  - AI Engineering
  - RPI
  - GitHub
duration: 90
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
routerMode: hash
codeCopy: true
shiki:
  themes:
    light: dracula-soft
    dark: dracula
---

<div class="hero">
  <div class="hero-glow"></div>
  <div class="hero-copy">
    <h1>Hypervelocity Engineering</h1>
    <p class="hero-title-tail">From Concept to Code with HVE-Core</p>
    <p class="hero-thesis">Disciplined AI-assisted engineering that turns uncertainty into verified, traceable, production-quality outcomes.</p>
    <div class="hero-presenter">
      <strong>Daniel Scott-Raynsford</strong>
      <span>Sr. Partner Solution Architect · Microsoft</span>
    </div>
  </div>
  <a
    class="hero-qr-block"
    href="https://danielscottraynsford.com/plagueho.learn/hypervelocity-engineering"
    target="_blank"
    rel="noreferrer"
    aria-label="Open the Hypervelocity Engineering presentation online"
  >
    <img src="./images/presentation-qr-code.png" alt="QR code for the Hypervelocity Engineering presentation" class="hero-qr" />
    <span class="hero-qr-url">Open the live deck ↗</span>
  </a>
  <div class="hero-path" aria-label="Presentation route">
    <span>Understand HVE</span>
    <i></i>
    <span>Adopt HVE-Core</span>
    <i></i>
    <span>Practice RPI</span>
    <i></i>
    <span>Scale safely</span>
  </div>
</div>

<!--
Welcome everyone. This is a 90-minute session split into two halves.
First 30 minutes covers HVE as a concept — why it exists and what it means.
Last 60 minutes is hands-on with HVE-Core: we'll do a full RPI workflow
to fix a prompt injection vulnerability in Marginalia, then look at GitHub Backlog Manager.
This is demo-heavy by design.
-->

---
transition: slide-up
---

<div class="agenda">
  <header class="agenda-heading">
    <h1>Agenda</h1>
    <p>90 minutes · Two live demos · From principles to practice</p>
  </header>
  <nav class="agenda-route" aria-label="Presentation sections">
    <a href="/4" @click.prevent="$router.push('/4')">
      <span class="agenda-index">01</span>
      <LineIcon name="warning" />
      <strong>The AI Engineering Problem</strong>
      <small>Why speed without rigor is dangerous</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/5" @click.prevent="$router.push('/5')">
      <span class="agenda-index">02</span>
      <LineIcon name="target" />
      <strong>What is HVE?</strong>
      <small>Four pillars, principles, fundamentals</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/10" @click.prevent="$router.push('/10')">
      <span class="agenda-index">03</span>
      <LineIcon name="layers" />
      <strong>HVE-Core Overview</strong>
      <small>Collections, lifecycle, roles, tooling</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/11" @click.prevent="$router.push('/11')">
      <span class="agenda-index">04</span>
      <LineIcon name="repeat" />
      <strong>RPI Deep Dive</strong>
      <small>The methodology that makes AI reliable</small>
    </a>
  </nav>
  <footer class="agenda-demo-links">
    <a href="/16" @click.prevent="$router.push('/16')"><LineIcon name="terminal" /><span><strong>Demo 1</strong>RPI on Marginalia</span></a>
    <a href="/26" @click.prevent="$router.push('/26')"><LineIcon name="plan" /><span><strong>Demo 2</strong>GitHub Backlog Manager</span></a>
  </footer>
</div>

<!--
Quick scan of the agenda. Part 1 is concepts (30 min), Part 2 is hands-on (60 min).
The RPI demo is the centerpiece — 20 minutes of live workflow.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 4 — PART 1 SECTION DIVIDER: Why HVE?
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Part 1 — Why HVE?</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 1.2rem; align-items: center; justify-content: center;">
    <div class="hero-quote">
      <span class="hero-quote-emoji">⚡</span>
      <span>The most dangerous outcome of AI-assisted engineering isn't bad code — it's <em>solving the wrong problem faster than ever before.</em></span>
    </div>
    <v-click>
      <Youtube id="7P0JM3h7IQk" width="560" height="315" />
    </v-click>
  </div>
</div>

<!--
Set the tone. This isn't about AI being bad — it's about AI being fast and
confidently wrong without the right guardrails.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 5 — THE AI ENGINEERING PROBLEM
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The AI Engineering Problem</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;align-items:stretch;">
    <div class="scenario-banner problem-scenario-banner">
      <span>The gap isn't model quality — it's process quality.</span>
    </div>
    <div class="comparison-grid problem-comparison-grid" style="width:100%;">
      <div class="comparison-col before">
        <span class="comparison-label before">😰 Vibe Coding</span>
        <ul class="dense-list">
          <li>AI writes first, thinks never</li>
          <li>Invents <em>plausible</em> patterns instead of verified ones</li>
          <li>No traceability — "the AI wrote it this way"</li>
          <li>Tribal knowledge stays in your head</li>
          <li>Frequent rework when assumptions fail</li>
          <li>Solving the <strong>wrong</strong> problem faster</li>
        </ul>
      </div>
      <div class="comparison-col after">
        <span class="comparison-label after">🎯 Disciplined AI Engineering</span>
        <ul class="dense-list">
          <li>Research before implementing</li>
          <li>Uses verified existing patterns with file/line citations</li>
          <li>Full traceability through research documents</li>
          <li>Knowledge transfer through artifacts</li>
          <li>Rare rework — assumptions are validated</li>
          <li>Solving the <strong>right</strong> problems with confidence</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!--
AI coding assistants can't tell the difference between investigating and
implementing. When you ask for code, they write code — without verifying
patterns match existing modules or APIs actually exist.
This is the fundamental problem HVE addresses.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 6 — WHAT IS HVE?
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>What is Hypervelocity Engineering?</h1>
  </div>
  <div class="slide-body hve-what-slide">
    <div class="hve-definition-layout">
      <section class="hve-definition">
        <p>A <strong>practical way of working</strong> to deliver <strong>high-value AI outcomes</strong> — not a product, not a framework, a set of principles and practices.</p>
      </section>
      <div class="hve-evidence-list">
        <div class="hve-evidence-row"><span aria-hidden="true">01</span><p>Focuses on <strong>right problems, right context, right people</strong>, and responsible AI</p></div>
        <div class="hve-evidence-row"><span aria-hidden="true">02</span><p>Originated from Microsoft ISE (Industry Solutions Engineering) field experience</p></div>
        <div class="hve-evidence-row"><span aria-hidden="true">03</span><p>Applies to <strong>any engineering team</strong>, not just FDE/ISE</p></div>
        <div class="hve-evidence-row"><span aria-hidden="true">04</span><p>Not a replacement for existing processes — an evolution of how teams work with AI</p></div>
        <div class="hve-evidence-row"><span aria-hidden="true">05</span><p>Key distinction: <strong>HVE = the methodology</strong>; <strong>HVE-Core = the tooling</strong> that operationalizes it</p></div>
      </div>
    </div>
    <div class="hve-conclusion">
      HVE is about disciplined speed — going fast <em>and</em> going right. The four pillars coming next are the structural foundation.
    </div>
  </div>
</div>

<!--
Emphasize that HVE is a way of working, not a product.
It emerged from real project delivery at Microsoft ISE.
The tooling (HVE-Core) came later to codify these practices.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 7 — FOUR PILLARS OF HVE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>The Four Pillars of HVE</h1>
  </div>
  <div class="slide-body pillars-slide" style="flex-direction:column;gap:0.4rem;align-items:stretch;">
    <div class="section-grid">
      <div class="section-card" v-click>
        <div class="section-card-bar">
          <span class="section-number">01</span>
          <h2>Multidisciplinary Teams</h2>
        </div>
        <p>Tight teams with deep domain expertise — developers, designers, PMs, security architects, data scientists. The "crew model."</p>
      </div>
      <div class="section-card" v-click>
        <div class="section-card-bar">
          <span class="section-number">02</span>
          <h2>Design Thinking</h2>
        </div>
        <p>Focused on business value, not technology features. Understand the problem before building the solution. Human-centered design.</p>
      </div>
      <div class="section-card" v-click>
        <div class="section-card-bar">
          <span class="section-number">03</span>
          <h2>Production-Ready Starting Points</h2>
        </div>
        <p>HVE Accelerators — proven, battle-tested templates and patterns. Don't start from scratch; start from something that works.</p>
      </div>
      <div class="section-card" v-click>
        <div class="section-card-bar">
          <span class="section-number">04</span>
          <h2>AI Agents &amp; Tools</h2>
        </div>
        <p>AI across the full lifecycle — research, planning, implementation, review, backlog management, security assessment, documentation.</p>
      </div>
    </div>
  </div>
</div>

<!--
Walk through each pillar. Without the right team (P1), problem (P2),
and starting point (P3), even the best AI tooling (P4)
will produce the wrong outcome faster.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 8 — PRINCIPLES IN ACTION
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Principles in Action</h1>
  </div>
  <div class="slide-body principles-slide" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.5rem 1.8rem 0.8rem;">
    <div class="iq-grid" style="grid-template-columns: repeat(4, minmax(0, 1fr));">
      <div class="iq-pillar iq-work" v-click>
        <div class="iq-header-wrap"><span class="iq-header-pill iq-header-work"><span>Iterate in Small Steps</span></span></div>
        <p class="iq-card-summary">Small, verifiable increments. Each step produces a testable artifact. This is why RPI breaks work into separate phases.</p>
      </div>
      <div class="iq-pillar iq-fabric" v-click>
        <div class="iq-header-wrap"><span class="iq-header-pill iq-header-fabric"><span>Validate and Verify</span></span></div>
        <p class="iq-card-summary">Don't assume AI output is correct. Check against reality. This is why the <a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank">Task Reviewer</a> exists as a separate agent.</p>
      </div>
      <div class="iq-pillar iq-foundry" v-click>
        <div class="iq-header-wrap"><span class="iq-header-pill iq-header-foundry"><span>Prioritize Business Value</span></span></div>
        <p class="iq-card-summary">Every engineering decision ties back to a business outcome. Outcome-driven metrics from day one, not story points.</p>
      </div>
      <div class="iq-pillar iq-orange" v-click>
        <div class="iq-header-wrap"><span class="iq-header-pill iq-header-orange"><span>Embed Security &amp; Quality</span></span></div>
        <p class="iq-card-summary">Not bolted on at the end. Security, observability, and responsible AI are woven into every phase of the lifecycle.</p>
      </div>
    </div>
  </div>
</div>

<!--
These principles sound obvious, but they're the ones most often violated
when teams adopt AI tooling without discipline.
-->

---
transition: fade-out
hide: true
---

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Fundamentals &amp; Measuring Success</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.45rem;align-items:stretch;justify-content:flex-start;">
    <div class="three-col-grid">
      <div class="section-card" v-click>
        <span class="section-number">Foundation</span>
        <h2>Engineering Fundamentals</h2>
        <ul class="dense-list" style="font-size: 0.82rem;">
          <li>Security, observability, responsible AI embedded throughout</li>
          <li>Automated testing, monitoring, governance</li>
          <li>AI + accelerators reduce cost of fundamentals</li>
        </ul>
      </div>
      <div class="section-card" v-click>
        <span class="section-number">Metrics</span>
        <h2>Measuring Success</h2>
        <ul class="dense-list" style="font-size: 0.82rem;">
          <li>Outcome-driven metrics from day one</li>
          <li>Avoid activity without impact</li>
          <li>Measure business value delivered</li>
        </ul>
      </div>
      <div class="section-card" v-click>
        <span class="section-number">Pitfalls</span>
        <h2>What to Avoid</h2>
        <ul class="dense-list" style="font-size: 0.82rem;">
          <li>❌ Bolt AI onto Scrum and call it done</li>
          <li>❌ Skip research, jump to implementation</li>
          <li>✅ Rebuild processes around AI capabilities</li>
        </ul>
      </div>
    </div>
    <div class="model-warning-callout" v-click>
      <span class="model-warning-icon">💡</span>
      <span class="model-warning-text"><strong>When AI handles boilerplate</strong> (tests, docs, CI config), teams can afford engineering fundamentals they previously skipped due to time pressure.</span>
    </div>
  </div>
</div>

<!--
The cost reduction point is key. AI handling boilerplate means teams can
afford proper fundamentals. The pitfalls column transitions us to HVE-Core —
the tooling that prevents these anti-patterns.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 10 — FROM METHODOLOGY TO ADOPTION
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>From Methodology to Adoption</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 1.2rem; align-items: center; justify-content: center;">
    <div class="hero-quote">
      <span class="hero-quote-emoji">🧠</span>
      <span>A methodology only matters if teams can <em>adopt it consistently and repeat it safely.</em></span>
    </div>
    <p style="color: var(--theme-muted); font-size: 0.92rem; max-width: 40rem; text-align: center;">
      Part 2 is about operationalizing HVE with HVE-Core, RPI, live demos, and GitHub Backlog Manager.
    </p>
  </div>
</div>

<!--
This is the handoff from abstract principles to practical adoption.
Part 1 explained HVE as the way of working.
Part 2 shows the enablement layer that helps teams practice it consistently inside GitHub Copilot.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 11 — INTRODUCING HVE-CORE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Introducing HVE-Core</h1>
  </div>
  <div class="slide-body tooling-layer-slide hve-core-stack">
    <div class="hve-core-relationship">
      <div class="hve-core-route" aria-hidden="true">
        <span>HVE practice</span><b>→</b><span>HVE-Core starter kit</span><b>→</b><span>GitHub Copilot</span>
      </div>
      <p><strong><a href="https://microsoft.github.io/hve-core/docs/hve-guide/" target="_blank">HVE</a> is the practice. <a href="https://microsoft.github.io/hve-core/docs/" target="_blank">HVE-Core</a> is the starter kit for practicing it in <a href="https://code.visualstudio.com/docs/copilot/overview" target="_blank">GitHub Copilot</a>.</strong></p>
    </div>
    <div class="hve-core-bands">
      <section class="hve-core-band">
        <h2>What it contains</h2>
        <div class="hve-core-band-content">
          <p v-click>Curated <strong>agents, skills, prompts, and coding instructions</strong> for GitHub Copilot</p>
          <p v-click>Encodes <strong><a href="https://microsoft.github.io/hve-core/docs/rpi/" target="_blank">RPI</a></strong>, role guidance, and quality guardrails into ready-to-use starting points</p>
        </div>
      </section>
      <section class="hve-core-band">
        <h2>What it operationalizes</h2>
        <div class="hve-core-band-content">
          <p v-click>Operationalizes two HVE pillars: <strong>Production-Ready Starting Points</strong> and <strong>AI Agents &amp; Tools</strong></p>
          <p v-click>Supports <strong>10 roles</strong> across a <strong>9-stage lifecycle</strong></p>
        </div>
      </section>
      <section class="hve-core-band">
        <h2>How teams adopt it</h2>
        <div class="hve-core-band-content">
          <p v-click>Open source, runs in VS Code, install from Marketplace: <a href="https://marketplace.visualstudio.com/items?itemName=ise-hve-essentials.hve-core" target="_blank"><code>ise-hve-essentials.hve-core</code></a></p>
          <p v-click>Choose <strong>HVE Core All</strong> or the selective <strong>HVE Installer</strong></p>
        </div>
      </section>
    </div>
    <div class="hve-core-analogy" v-click>
      <strong>Helpful analogy:</strong> If HVE is like DevOps, HVE-Core is the platform team's golden paths, templates, and automation for adopting it consistently.
    </div>
  </div>
</div>

<!--
This is the bridge slide from methodology to adoption.
Avoid framing HVE-Core as "the tool" or a separate product.
GitHub Copilot in VS Code is the execution surface; HVE-Core is the curated starter kit inside that surface.
The point is adoption speed and consistency: teams do not start from zero.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
  SLIDE 12 — RPI
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>RPI Deep Dive</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 1.2rem; align-items: center; justify-content: center;">
    <div class="hero-quote">
      <span class="hero-quote-emoji">🔬</span>
      <span>
        <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank" style="color: inherit; text-decoration: underline;">Research</a> →
        <a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank" style="color: inherit; text-decoration: underline;">Plan</a> →
        <a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank" style="color: inherit; text-decoration: underline;">Implement</a> →
        <a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank" style="color: inherit; text-decoration: underline;">Review</a>
      </span>
    </div>
    <p style="color: var(--theme-muted); font-size: 0.92rem; max-width: 40rem; text-align: center;">
      Transforming uncertainty into verified, traceable, production-quality code.
    </p>
  </div>
</div>

<!--
We're now in the hands-on half. Everything from here is about
how RPI actually works and why it produces better outcomes.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 16 — WHY RPI WORKS
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Why RPI Works — The Core Insight</h1>
  </div>
  <div class="slide-body rpi-core-insight-slide" style="flex-direction:column;align-items:stretch;">
    <div class="comparison-grid" style="width:100%;">
      <div class="comparison-col before" v-click>
        <span class="comparison-label before">Without RPI</span>
        <ul class="dense-list">
          <li>"This looks like a reasonable variable name. I'll use <code>prefix</code>."</li>
          <li>Invents plausible patterns</li>
          <li>"The AI wrote it this way" — no traceability</li>
          <li>Frequent rework</li>
        </ul>
      </div>
      <div class="comparison-col after" v-click>
        <span class="comparison-label after">With RPI</span>
        <ul class="dense-list">
          <li><a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a> finds: <em>"12 existing modules use <code>resource_prefix</code>, not <code>prefix</code>. See <code>variables.tf#L47</code>."</em></li>
          <li>Uses verified existing patterns</li>
          <li>Every decision traced to files and line numbers</li>
          <li>Rare rework</li>
        </ul>
      </div>
    </div>
  </div>
</div>

<!--
The prefix vs resource_prefix example is the killer anecdote.
When constrained to research-only mode, the AI actually reads
the codebase and finds existing patterns.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 17 — THE FOUR PHASES OF RPI
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Four Phases of RPI</h1>
  </div>
  <div class="slide-body rpi-phases-slide" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div class="flow-pipeline" style="justify-content: center; gap: 0.5rem;">
      <div class="flow-step">🔍 <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank" style="color: inherit; text-decoration: underline;">Research</a></div>
      <span class="flow-arrow" style="color:var(--theme-accent);" v-click="1">→ <code>/clear</code> →</span>
      <div class="flow-step" v-click="2">📋 <a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank" style="color: inherit; text-decoration: underline;">Plan</a></div>
      <span class="flow-arrow" style="color:var(--theme-accent);" v-click="3">→ <code>/clear</code> →</span>
      <div class="flow-step flow-step-active" v-click="4">⚡ <a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank" style="color: inherit; text-decoration: underline;">Implement</a></div>
      <span class="flow-arrow" style="color:var(--theme-accent);" v-click="5">→ <code>/clear</code> →</span>
      <div class="flow-step" v-click="6">✅ <a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank" style="color: inherit; text-decoration: underline;">Review</a></div>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: stretch;">
      <div class="card" style="flex: 1;">
        <h3><span class="phase-icon">🔍</span><a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank" style="color: inherit; text-decoration: underline;"><span class="phase-label">Research</span></a></h3>
        <p style="font-size:0.78rem;"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a> investigates codebase, APIs, docs. Documents with evidence. ONE recommended approach.<br><code>→ research.md</code></p>
      </div>
      <div class="card" style="flex: 1;" v-click="2">
        <h3><span class="phase-icon">📋</span><a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank" style="color: inherit; text-decoration: underline;"><span class="phase-label">Plan</span></a></h3>
        <p style="font-size:0.78rem;"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank">Task Planner</a> creates phased checklist linked to research with line numbers.<br><code>→ plan.instructions.md + details.md</code></p>
      </div>
      <div class="card" style="flex: 1;" v-click="4">
        <h3><span class="phase-icon">⚡</span><a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank" style="color: inherit; text-decoration: underline;"><span class="phase-label">Implement</span></a></h3>
        <p style="font-size:0.78rem;"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank">Task Implementor</a> executes plan task by task. Tracks changes. Stop controls for review.<br><code>→ code + changes.md</code></p>
      </div>
      <div class="card" style="flex: 1;" v-click="6">
        <h3><span class="phase-icon">✅</span><a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank" style="color: inherit; text-decoration: underline;"><span class="phase-label">Review</span></a></h3>
        <p style="font-size:0.78rem;"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank">Task Reviewer</a> validates against specs. Runs lint/build/test. Identifies follow-up work.<br><code>→ review.md</code></p>
      </div>
    </div>
    <div class="model-warning-callout" v-click="7">
      <span class="model-warning-icon">⚠️</span>
      <span class="model-warning-text"><strong>Critical rule: Clear context between phases</strong> — <code>/clear</code> or new chat. Artifacts carry context through files, not chat history.</span>
    </div>
  </div>
</div>

<!--
Walk through each phase. The /clear between phases is context engineering.
Each agent has different instructions; accumulated context causes drift.
The artifacts carry context through files on disk.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 18 — CONTEXT ENGINEERING
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Context Engineering — Why /clear Matters</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.8rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div style="display: flex; align-items: center; justify-content: center; gap: 0.6rem;">
      <div class="card" style="flex: 1; text-align: center; border-color: #28ca41; border-width: 2px; padding: 0.9rem;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--theme-muted); text-transform: uppercase; letter-spacing: 0.06em;">Start</div>
        <div style="font-size: 2.4rem; font-weight: 800; color: #28ca41; line-height: 1.1; margin: 0.3rem 0;">30%</div>
        <div style="font-size: 0.8rem; color: var(--theme-muted);">attention on prompt</div>
        <div style="font-size: 0.7rem; color: var(--theme-muted); margin-top: 0.5rem; opacity: 0.7;">3K prompt · 10K context</div>
      </div>
      <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 0.15rem;">
        <div style="font-size: 0.68rem; color: var(--theme-muted);">Full RPI cycle</div>
        <div style="font-size: 1.6rem; color: var(--theme-accent);">→</div>
      </div>
      <div class="card" style="flex: 1; text-align: center; border-color: #ff5f57; border-width: 2px; padding: 0.9rem;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--theme-muted); text-transform: uppercase; letter-spacing: 0.06em;">End of Cycle</div>
        <div style="font-size: 2.4rem; font-weight: 800; color: #ff5f57; line-height: 1.1; margin: 0.3rem 0;">1.5%</div>
        <div style="font-size: 0.8rem; color: var(--theme-muted);">attention on prompt</div>
        <div style="font-size: 0.7rem; color: var(--theme-muted); margin-top: 0.5rem; opacity: 0.7;">3K prompt · 200K context</div>
      </div>
      <div style="text-align: center; flex-shrink: 0; display: flex; flex-direction: column; align-items: center; gap: 0.15rem;">
        <div style="font-size: 0.85rem; font-weight: 800; color: #28ca41;"><code>/clear</code></div>
        <div style="font-size: 1.6rem; color: var(--theme-accent);">→</div>
      </div>
      <div class="card" style="flex: 1; text-align: center; border-color: #28ca41; border-width: 2px; padding: 0.9rem;">
        <div style="font-size: 0.72rem; font-weight: 700; color: var(--theme-muted); text-transform: uppercase; letter-spacing: 0.06em;">After /clear</div>
        <div style="font-size: 2.4rem; font-weight: 800; color: #28ca41; line-height: 1.1; margin: 0.3rem 0;">30%</div>
        <div style="font-size: 0.8rem; color: var(--theme-muted);">attention restored</div>
        <div style="font-size: 0.7rem; color: var(--theme-muted); margin-top: 0.5rem; opacity: 0.7;">3K prompt · 10K context</div>
      </div>
    </div>
    <div style="display: flex; gap: 0.65rem; align-items: stretch;">
      <div class="card" style="flex: 1;" v-click>
        <h3>Signs of Degradation</h3>
        <ul class="dense-list" style="font-size:0.78rem;">
          <li>Agent skips phases</li>
          <li>Ignores system prompt</li>
          <li>Output quality drops</li>
        </ul>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>/clear vs /compact</h3>
        <ul class="dense-list" style="font-size:0.78rem;">
          <li><code>/clear</code>: Between phases (always)</li>
          <li><code>/compact</code>: Mid-phase when long</li>
          <li>Artifacts persist on disk either way</li>
        </ul>
      </div>
    </div>
    <div class="model-warning-callout" v-click>
      <span class="model-warning-icon">💡</span>
      <span class="model-warning-text">The model gives less weight to system instructions as context grows. Clearing between phases restores each agent's instructions to full strength.</span>
    </div>
  </div>
</div>

<!--
Technical explanation for why RPI uses separate agents and context clearing.
The model's attention gives less weight to system instructions as context grows.
Clearing between phases restores each agent's instructions to full strength.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 19 — WHEN TO USE RPI
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>When to Use RPI</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;align-items:stretch;justify-content:flex-start;">
    <div class="scenario-banner problem-scenario-banner">
      <span>Match the tool to the complexity — not every task needs the full ceremony.</span>
    </div>
    <div class="comparison-grid problem-comparison-grid" style="width:100%;">
      <div class="comparison-col before">
        <span class="comparison-label before">⏭️ Skip RPI</span>
        <ul class="dense-list">
          <li v-click>Fixing a typo or renaming a variable</li>
          <li v-click>Adding a log statement</li>
          <li v-click>Refactoring &lt; 50 lines</li>
          <li v-click>Change is obvious and self-contained</li>
        </ul>
      </div>
      <div class="comparison-col after">
        <span class="comparison-label after">✅ Use RPI</span>
        <ul class="dense-list">
          <li v-click>Changes span multiple files or modules</li>
          <li v-click>Learning new patterns or APIs</li>
          <li v-click>External dependencies involved</li>
          <li v-click>Requirements are unclear or contested</li>
          <li v-click>Team needs knowledge transfer</li>
        </ul>
      </div>
    </div>
    <div class="model-warning-callout" v-click style="margin-top:auto;">
      <span class="model-warning-icon">💡</span>
      <span class="model-warning-text"><strong>Rule of thumb:</strong> <em>"If you need to understand something before implementing, use RPI."</em> — Start with <strong>rpi-agent</strong> (inline, lightweight); escalate to <strong>strict RPI</strong> (deep research, full audit trail) when complexity or team scope demands it.</span>
    </div>
  </div>
</div>

<!--
Be honest about when RPI is overkill. The rule of thumb is the key message.
Many teams start with rpi-agent and escalate to strict RPI when they hit complexity.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 20 — DEMO 1 TITLE
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔬</div>
  <h1 class="demo-title">Demo: RPI on a Real Security Fix</h1>
  <p class="demo-subtitle">Following the HVE-Core Getting Started journey to fix a prompt injection vulnerability in Marginalia</p>

  <div class="demo-badge">🎬 ~20 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Step 1: First Interaction — verify HVE-Core works with the memory agent</div>
    <div class="demo-item"><span class="check">▸</span> Step 2: Initial research — first research to investigate the vulnerability</div>
    <div class="demo-item"><span class="check">▸</span> Step 3: Deeper research — deeper research to perform deeper investigation of issue</div>
    <div class="demo-item"><span class="check">▸</span> Step 4: Full RPI — Research → /clear → Plan → /clear → Implement → /clear → Review</div>
  </div>

  <p style="color: rgba(255,255,255,0.4); font-size: 0.75rem; margin-top: 0.8rem;">
    Fixing: <code>Marginalia</code> — protect Azure AI Foundry analysis prompts from prompt injection in user guidance and document text
  </p>
</div>

<!--
DEMO SCRIPT (see DEMO.md for full details):
Following the HVE-Core Getting Started journey to fix a real security issue.
Step 1: Verify HVE-Core with the memory agent (~2 min).
Step 2: First research to investigate the vulnerability (~3 min).
Step 3: Deeper research to perform deeper investigation of issue (~2 min).
Step 4: Full RPI cycle — Research → Plan → Implement → Review (~15 min).
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     DEMO 1: FIRST INTERACTION
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — First Interaction</h1>
  </div>
  <p class="slide-subtitle">Verify HVE-Core: Talk to the Memory Agent</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Store Demo Context</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code → memory agent</span>
</div>

```text
@memory Remember that I am a senior software
engineer demonstrating HVE-Core's RPI workflow
using the Marginalia application. The demo feature
is adding prompt injection protection to the
analysis pipeline.
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Verify Memory Persists</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code → new thread</span>
</div>

```text
  Explain what this repository does and how it helps someone in my role?
```

<div style="margin-top:1rem; font-size: 0.82rem; color: var(--theme-muted);">
<strong>Expected:</strong> Response references your role and demo context — without you repeating it.<br><br>
<strong>This proves:</strong> HVE-Core installed ✓ Agents respond ✓ Memory persists ✓ Context carries across sessions ✓
</div>

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    Agents produce <strong>artifacts</strong> — files that persist — not just chat messages. The memory agent is the simplest example. Same pattern scales to research docs, plans, and change logs.
  </div>
</div>

<!--
Step 1 of the Getting Started journey.
Quick verification that HVE-Core is working.
Show the audience that agents create real files in the workspace.
Open the memory file in the file explorer to show the audience.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     DEMO 1: FIRST RESEARCH
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — Initial Research</h1>
  </div>
  <p class="slide-subtitle">Investigate the Vulnerability Before Fixing It</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Invoke <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a> for Initial Research</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code → <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a></span>
</div>

```text
/task-research Research the analysis functionality in
this codebase. How does user-supplied text flow from
the the API into LLM? Identify wher untrusted input
could enter prompt construction.
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Output → research.md</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Markdown</span>
  <span class="code-panel-file">.copilot-tracking/research/</span>
</div>

```markdown
...
User-supplied text flows into LLM prompts through two primary channels:

* Analysis guidance channel:
  * API request fields are normalized in AnalysisRequest and CombineGuidance, then interpolated directly into the system prompt.
* Document content channel:
  * Pasted/uploaded/stored paragraph text (including re-analysis merged user edits and prior model output) is inserted directly into user prompt bodies.

Untrusted input can enter prompt construction at:

* AnalysisRequest guidance fields and legacy aliases.
* Paste and upload ingestion paths.
* Stored paragraph reload paths.
* Re-analysis merge paths (userSteeringInput and accepted proposedChange).

No dedicated prompt-injection hardening layer currently sits between these sources and prompt assembly.
```

<div style="margin-top:0.5rem; font-size: 0.82rem; color: var(--theme-muted);">
Every fact cited with <strong>file paths and line numbers</strong>. Not guessing — searching, reading, citing.
</div>

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    RPI separates <strong>investigation</strong> from <strong>implementation</strong>. Research produces a real file — not chat history that vanishes when you close the window.
  </div>
</div>

<!--
Step 2 of the Getting Started journey — standalone research before the full RPI cycle.
Key point: the agent investigates rather than implements.
Point out file references with line numbers — this is verified truth.
Open the research.md artifact to show the audience.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     DEMO 1: FULL RPI — DEEPER RESEARCH
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — Deeper Research</h1>
  </div>
  <p class="slide-subtitle"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a>: Investigating, Not Guessing</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Invoke <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a> for Deeper Research</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code</span>
</div>

```text
/task-research Research how to add prompt injection
protection to Marginalia's analysis process as determined
by previous research.

Research:
1. Existing analysis flow in this codebase
2. OWASP LLM Top 10 (LLM01) guidance
3. Azure AI Content Safety Prompt Shields
4. Delimiter-based isolation patterns
5. Recommend ONE balanced approach for this app
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Output → research.md</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Markdown</span>
  <span class="code-panel-file">.copilot-tracking/research/</span>
</div>

```markdown
**Requirements:**

* Close OWASP LLM01 Control gaps 1, 3, and 6 in the first increment.
* Preserve existing API contracts and frontend compatibility.
* Keep implementation localized and testable.
* Provide a clear path for adding Azure Prompt Shields as a second increment.

**Preferred Approach: Multi-Layer Prompt Hardening (First Increment)**

This approach combines three defense layers in a single implementation increment:

1. **Prompt template hardening** — Security meta-instructions + XML delimiter isolation in `FoundrySuggestionService`.
2. **User guidance relocation** — Move untrusted guidance from system prompt to user message with `<untrusted_user_guidance>` tags.
3. **Input boundary constraints** — Per-field length limits and control character normalization at the controller boundary.
```

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a> works <strong>autonomously for 2-5 minutes</strong> — investigating the codebase and external guidance (via MCP servers if configured), documenting with evidence, and recommending ONE approach.
  </div>
</div>

<!--
LIVE DEMO (Step 3, Phase 1): Let the audience see the researcher work.
This is the full RPI research — broader than the Initial Research standalone exercise.
Point out specific line references, file citations, and MCP-powered external research.
Show the research.md artifact — this persists long after the chat ends.
See DEMO.md "Phase 1: Research" for detailed prompts and expected output.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 22 — DEMO 1: PLAN PHASE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — Plan Phase</h1>
  </div>
  <p class="slide-subtitle"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank">Task Planner</a>: Sequencing, Not Improvising</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Invoke <a href="https://microsoft.github.io/hve-core/docs/rpi/task-planner" target="_blank">Task Planner</a></div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code (after /clear)</span>
</div>

```text
/clear
```

<div style="margin-top:0.6rem; font-size: 0.82rem; color: var(--theme-muted);">
Open <code>research.md</code> in the editor — Task Planner auto-detects the research.
</div>

```text
/task-plan
Focus on:
- The multi-layer prompt hardening approach
  recommended in the research
- Phased rollout: template hardening first,
  then guidance relocation, then input constraints
- Include unit tests in each phase
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Output → plan.instructions.md</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Markdown</span>
  <span class="code-panel-file">.copilot-tracking/plans/</span>
</div>

```markdown
## Implementation Checklist

### [ ] Implementation Phase 1: Prompt Template Hardening

<!-- parallelizable: false -->

* [ ] Step 1.1: Create PromptHardeningOptions configuration class
  * Details: .copilot-tracking/details/2026-04-15/prompt-injection-protection-details.md (Lines 14-44)
* [ ] Step 1.2: Register PromptHardeningOptions in Program.cs
  * Details: .copilot-tracking/details/2026-04-15/prompt-injection-protection-details.md (Lines 46-68)
* [ ] Step 1.3: Harden BuildSystemPrompt — add security policy, remove userGuidance parameter
  * Details: .copilot-tracking/details/2026-04-15/prompt-injection-protection-details.md (Lines 70-131)
...
```

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    The planner <strong>auto-detects research</strong> from the open editor tab and <strong>validates it exists</strong> before proceeding — it won't plan without evidence. Line references create the traceability chain: Plan → Research → Source.
  </div>
</div>

<!--
LIVE DEMO (Step 3, Phase 2): Point out that the planner validates research exists.
Show the checkbox structure — this is what the Implementor follows.
The line references back to research.md are the traceability chain: Plan → Research → Source.
See DEMO.md "Phase 2: Plan" for detailed prompts and expected output.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 23 — DEMO 1: IMPLEMENT PHASE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — Implement Phase</h1>
  </div>
  <p class="slide-subtitle"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank">Task Implementor</a>: Following, Not Inventing</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Invoke <a href="https://microsoft.github.io/hve-core/docs/rpi/task-implementor" target="_blank">Task Implementor</a></div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code (after /clear)</span>
</div>

```text
/clear
```

<div style="margin-top:0.6rem; font-size: 0.82rem; color: var(--theme-muted);">
Open <code>plan.instructions.md</code> in the editor — Task Implementor auto-detects the plan.
</div>

```text
/task-implement
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Tracked Changes</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Markdown</span>
  <span class="code-panel-file">.copilot-tracking/changes/</span>
</div>

```markdown
# Release Changes: Prompt Injection Protection for Marginalia Analysis Pipeline

**Related Plan**: prompt-injection-protection-plan.instructions.md
**Implementation Date**: 2026-04-15

## Summary

Harden the Marginalia editorial analysis pipeline against OWASP LLM01 prompt injection by adding security meta-instructions to system prompts, XML delimiter isolation for untrusted content, relocating user guidance from system to user messages, and enforcing input boundary constraints at the controller layer.

## Changes

### Added

* marginalia-service/src/Domain/Configuration/PromptHardeningOptions.cs - New options class for prompt hardening configuration (MaxGuidanceLength default 2000)
* marginalia-service/tests/unit/Infrastructure/Services/FoundrySuggestionServicePromptHardeningTests.cs - 12 unit tests for prompt hardening (security policy, XML delimiter isolation, adversarial wrapping)
* marginalia-service/tests/unit/Api/Controllers/DocumentsControllerGuidanceValidationTests.cs - 5 unit tests for guidance length validation
```

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    The Implementor <strong>auto-detects the plan</strong> from the open editor tab and follows it <strong>systematically</strong> — no improvisation. Every change is tracked in <code>changes.md</code>. Phase stops provide governance checkpoints.
  </div>
</div>

<!--
LIVE DEMO (Step 3, Phase 3): Key moment — the Implementor follows the plan rather than improvising.
Point out the changes log and the multi-file nature of the fix.
The implementation matches the mitigation patterns identified in research, not new inventions.
Confirm each tool call when prompted.
See DEMO.md "Phase 3: Implement" for detailed prompts and expected output.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 24 — DEMO 1: REVIEW PHASE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 1 — Review Phase</h1>
  </div>
  <p class="slide-subtitle"><a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank">Task Reviewer</a>: Validating, Not Assuming</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Invoke <a href="https://microsoft.github.io/hve-core/docs/rpi/task-reviewer" target="_blank">Task Reviewer</a></div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code (after /clear)</span>
</div>

```text
/clear
```

<div style="margin-top:0.6rem; font-size: 0.82rem; color: var(--theme-muted);">
Task Reviewer auto-locates research, plan, and changes artifacts.
</div>

```text
/task-review
Review the prompt injection protection
implementation completed today.
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Output → review.md</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Markdown</span>
  <span class="code-panel-file">.copilot-tracking/reviews/</span>
</div>

```markdown
## Overall Status

✅ **Complete** — All plan items verified. No critical or major findings introduced by this change.

## Severity Counts

| Severity | Count | Notes |
|---|---|---|
| Critical | 0 | |
| Major | 1 | Pre-existing (not introduced by this change) |
| Minor | 8 | 6 from quality review, 2 from RPI validation |

## RPI Validation Findings

### Phase 1: Prompt Template Hardening — ✅ Passed

All 6 steps verified. Key outcomes:
...
```

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    The Reviewer <strong>auto-locates</strong> research, plan, and changes artifacts — then checks against <strong>actual research findings</strong>, not just "does it work" but "does it match what we learned." Handoff buttons make iteration loops seamless.
  </div>
</div>

<!--
LIVE DEMO (Step 3, Phase 4): Show the reviewer checking against research findings.
The handoff buttons make it easy to loop back if needed.
Emphasize: review validates against actual research, not just "does it compile".
See DEMO.md "Phase 4: Review" for detailed prompts and expected output.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 25 — RPI RECAP
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>RPI Recap — What Just Happened</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div class="flow-pipeline" style="justify-content: center; gap: 0.5rem;">
      <div class="flow-step">🔍 Research</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">📋 Plan</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">⚡ Implement</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">✅ Review</div>
    </div>
    <div style="display: flex; gap: 0.5rem; align-items: stretch;">
      <div class="card" style="flex: 1;">
        <h3>Artifacts Persist</h3>
        <p style="font-size:0.78rem;">All outputs live in <code>.copilot-tracking/</code> — knowledge transfer, audit trail, onboarding material. These outlive the chat session.</p>
      </div>
      <div class="card" style="flex: 1;">
        <h3>Quick Start Commands</h3>
        <p style="font-size:0.78rem;"><code>@task-researcher &lt;topic&gt;</code><br><code>@task-planner</code><br><code>@task-implementor</code><br><code>@task-reviewer</code></p>
      </div>
      <div class="card" style="flex: 1;">
        <h3>Session Persistence</h3>
        <p style="font-size:0.78rem;">💾 Save → resume with <code>/checkpoint continue</code>. Perfect for multi-day workflows.</p>
      </div>
    </div>
    <div class="callout" style="text-align:center;">
      <strong>The paradigm shift:</strong> Stop asking AI <em>"Write this code."</em> Start asking <em>"Help me research, plan, then implement with evidence."</em>
    </div>
  </div>
</div>

<!--
Brief recap. Emphasize the artifact chain as the lasting value.
These files outlive the chat session and serve as documentation,
onboarding material, and audit trail.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 26 — GITHUB BACKLOG MANAGER
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>GitHub Backlog Manager</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.55rem; align-items: stretch; padding: 0.4rem 1.8rem 0.8rem;">
    <p style="font-size: 1rem; color: var(--theme-ink); margin: 0;">
      Automates issue lifecycle management across GitHub repositories with <strong>five workflows</strong>.
    </p>
    <div style="display: flex; gap: 0.5rem; align-items: stretch;">
      <div class="card" style="flex: 1;" v-click>
        <h3>1. Discovery</h3>
        <p style="font-size:0.75rem;">Finds &amp; categorizes issues from multiple sources — user-centric, artifact-driven, search-based</p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>2. Triage</h3>
        <p style="font-size:0.75rem;">17-label taxonomy, priority assessment, duplicate detection (4-aspect similarity)</p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>3. Sprint Planning</h3>
        <p style="font-size:0.75rem;">Organizes triaged issues into milestones with capacity awareness (6-step discovery)</p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>4. Execution</h3>
        <p style="font-size:0.75rem;">Creates/updates/closes issues via handoff files, tracks operations with checkboxes</p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>5. Quick Add</h3>
        <p style="font-size:0.75rem;">Single-issue shortcut for filing one issue with standard labels &amp; milestone</p>
      </div>
    </div>
    <div class="card" v-click>
      <h3>Autonomy Levels</h3>
      <p style="font-size:0.8rem;"><strong>Full</strong>: All auto · <strong>Partial</strong> (default): Gates on create/close · <strong>Manual</strong>: Gates on everything. Teams tune how much control they retain vs. delegate.</p>
    </div>
  </div>
</div>

<!--
The Backlog Manager handles the full issue lifecycle — from discovering
what needs to be done through organizing sprints to managing GitHub issues.
The autonomy levels are the governance layer.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 27 — WHEN TO USE BACKLOG MANAGER
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>GitHub Backlog Manager — When to Use</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;align-items:stretch;">
    <div class="comparison-grid" style="width:100%;">
      <div class="comparison-col after">
        <span class="comparison-label after">✅ Good Fit</span>
        <ul class="dense-list" style="font-size: 0.85rem;">
          <li v-click>Managing 20+ open issues</li>
          <li v-click>Multiple contributors need consistent triage</li>
          <li v-click>Sprint planning requires milestones &amp; capacity</li>
          <li v-click>Cross-repo issue discovery needed</li>
        </ul>
      </div>
      <div class="comparison-col before">
        <span class="comparison-label before">⏭️ Not Needed</span>
        <ul class="dense-list" style="font-size: 0.85rem;">
          <li v-click>Fewer than 10 issues</li>
          <li v-click>Single maintainer with full context</li>
          <li v-click>No milestone-based planning</li>
          <li v-click>All issues from a single source</li>
        </ul>
      </div>
    </div>
    <div class="callout" style="text-align:center;" v-click>
      Sweet spot: teams with <strong>20-100 open issues</strong> across one or more repos where manual triage is a bottleneck.
    </div>
  </div>
</div>

<!--
Be honest about scope. The Backlog Manager shines at scale.
For small repos with a single maintainer, it's overkill.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 28 — DEMO 2 TITLE
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">📋</div>
  <h1 class="demo-title">Demo: GitHub Backlog Manager</h1>
  <p class="demo-subtitle">Automated issue lifecycle — Discovery, Triage, Sprint Planning, and Quick Add</p>

  <div class="demo-badge">🎬 ~8 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Discovery: Agent scans repo for issues from multiple sources</div>
    <div class="demo-item"><span class="check">▸</span> Triage: 17-label taxonomy applied with priority assessment</div>
    <div class="demo-item"><span class="check">▸</span> Sprint Planning: Milestone assignment with capacity awareness</div>
    <div class="demo-item"><span class="check">▸</span> Quick Add: Single issue creation shortcut</div>
  </div>
</div>

<!--
DEMO SCRIPT:
Show Backlog Manager workflows in VS Code using a real GitHub repo.
Highlight autonomy level controls (Partial default — gates on create/close).
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 29 — DEMO 2: LIVE
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Demo 2 — GitHub Backlog Manager Live</h1>
  </div>
  <p class="slide-subtitle">Discovery → Triage → Sprint Planning → Quick Add</p>
</div>

<div style="position:absolute;top:150px;left:50px;right:660px;bottom:90px;">
<div class="code-card-title">Backlog Manager Workflows</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Copilot Chat</span>
  <span class="code-panel-file">VS Code</span>
</div>

```bash
# Discovery — find issues from all sources
@github-backlog-manager discover issues

# Triage — categorize and prioritize
@github-backlog-manager triage

# Sprint Planning — organize into milestones
@github-backlog-manager plan sprint

# Quick Add — file a single issue
@github-backlog-manager quick-add
  "Add rate limit retry logic"
```

</div>

<div style="position:absolute;top:150px;left:660px;right:50px;bottom:90px;">
<div class="code-card-title">Autonomy Controls</div>
<div class="code-panel-header">
  <span class="code-panel-lang">Config</span>
  <span class="code-panel-file">Governance</span>
</div>

```yaml
Autonomy Levels:
  Full:
    Create: Auto    Label: Auto
    Close:  Auto    Milestone: Auto

  Partial (default):
    Create: ⛔ Gate  Label: Auto
    Close:  ⛔ Gate  Milestone: Auto

  Manual:
    Create: ⛔ Gate  Label: ⛔ Gate
    Close:  ⛔ Gate  Milestone: ⛔ Gate

# Gates require human approval
# before the action executes
```

</div>

<div style="position:absolute;left:50px;right:50px;bottom:30px;">
  <div class="callout" style="font-size: 0.82rem; padding: 0.55rem 0.9rem;">
    The agent <strong>proposes and waits for approval</strong> at gates (Partial mode). Handoff files chain workflows together.
  </div>
</div>

<!--
LIVE DEMO: Show the Backlog Manager workflows.
Talk through autonomy levels. Show handoff files between workflows.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 30 — DESIGN THINKING INTEGRATION
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Design Thinking → RPI Integration</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.8rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div class="flow-pipeline" style="justify-content: center; gap: 0.4rem;">
      <div class="flow-step">🎯 Problem</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">💡 Solution</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">🧪 Validation</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step flow-step-active">🔬 RPI</div>
    </div>
    <div style="display: flex; gap: 0.65rem; align-items: stretch;">
      <div class="card" style="flex: 1;" v-click>
        <h3>Exit 1 — After Method 3</h3>
        <p style="font-size:0.78rem;">Input Synthesis → problem statement → <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a></p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>Exit 2 — After Method 6</h3>
        <p style="font-size:0.78rem;">Lo-Fi Prototypes → validated concept → <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a></p>
      </div>
      <div class="card" style="flex: 1;" v-click>
        <h3>Exit 3 — After Method 9</h3>
        <p style="font-size:0.78rem;">Iteration at Scale → implementation spec → <a href="https://microsoft.github.io/hve-core/docs/rpi/task-researcher" target="_blank">Task Researcher</a></p>
      </div>
    </div>
    <div class="callout" style="text-align:center;" v-click>
      58 artifacts in the Design Thinking collection. Two agents: <strong>dt-coach</strong> (guides all 9 methods) and <strong>dt-learning-tutor</strong> (teaches curriculum).
    </div>
  </div>
</div>

<!--
Quick mention — Design Thinking helps teams understand the problem
before RPI helps them solve it. The exit points ensure a clean handoff.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 31 — GETTING STARTED: YOUR FIRST 15 MINUTES
     ═══════════════════════════════════════════════════════════ -->

<div class="agenda-shell">
  <div class="agenda-orbs-layer">
    <div class="agenda-orb agenda-orb-1"></div>
    <div class="agenda-orb agenda-orb-2"></div>
    <div class="agenda-orb agenda-orb-3"></div>
  </div>

  <div class="agenda-header">
    <p class="agenda-eyebrow">NEXT STEPS</p>
    <h1 class="agenda-title">Your First 15 Minutes</h1>
  </div>

  <div class="agenda-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
    <div class="agenda-card agenda-card-1" v-click>
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">01</span>
      <h2>Install (1 min)</h2>
      <p>Install HVE-Core from VS Code Marketplace: <code>ise-hve-essentials.hve-core</code>. Add <code>.copilot-tracking/</code> to <code>.gitignore</code>.</p>
    </div>
    <div class="agenda-card agenda-card-2" v-click>
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">02</span>
      <h2>First Research (5 min)</h2>
      <p>Pick a real task from your backlog. Run <code>/task-research &lt;task&gt;</code>. Read the output — see the difference from unconstrained AI.</p>
    </div>
    <div class="agenda-card agenda-card-3" v-click>
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">03</span>
      <h2>Full RPI (15 min)</h2>
      <p>Continue: <code>/task-plan</code> → <code>/task-implement</code> → <code>/task-review</code>. Remember: <code>/clear</code> between phases. Compare the result.</p>
    </div>
  </div>
</div>

<!--
Make this actionable. Every attendee can do this within 15 minutes
of returning to their desk. The "compare" step makes the value concrete.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 32 — SCALING ADOPTION
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Scaling Adoption</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.5rem;align-items:stretch;justify-content:center;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.25rem;">
      <div class="thought-bubble">
        <span class="thought-bubble-emoji">🚀</span>
        <span>Start with one engineer, one task, <em>one RPI cycle.</em></span>
      </div>
      <div class="thought-dots"><span></span><span></span><span></span></div>
    </div>
    <div class="highlight-strip">
      <div class="highlight-pill" v-click="1">
        <span class="hl-icon">👤</span>
        <span class="hl-label">Individual</span>
        <span class="hl-desc">One engineer uses RPI on personal tasks. Install, try, see the difference.</span>
      </div>
      <div class="highlight-pill" v-click="2">
        <span class="hl-icon">👥</span>
        <span class="hl-label">Team</span>
        <span class="hl-desc">Team adopts hve-core + github collections. Shared conventions. Research as team knowledge.</span>
      </div>
      <div class="highlight-pill" v-click="3">
        <span class="hl-icon">🏢</span>
        <span class="hl-label">Organization</span>
        <span class="hl-desc">Multiple teams with governance. Collections curated per role. Ambassador program.</span>
      </div>
    </div>
    <div class="intelligence-arrow" v-click="4">
      <div class="ia-track">
        <div class="ia-gradient"></div>
        <div class="ia-arrowhead"></div>
      </div>
      <div class="ia-labels">
        <span class="ia-label ia-low">Try it</span>
        <span class="ia-label ia-mid">Adopt it</span>
        <span class="ia-label ia-high">Scale it</span>
      </div>
      <div class="ia-caption">Progressive adoption → compound value</div>
    </div>
    <div class="callout-teal callout" style="text-align:center;" v-click="5">
      Supporting resources: <strong>HVE Foundations</strong> (L100) · <strong>HVE &amp; FDE Essentials</strong> (L200) · <strong>Ambassador Program</strong>
    </div>
  </div>
</div>

<!--
Adoption is progressive. Don't try to roll out 221 artifacts to an org at once.
The ambassador program helps scale from Level 1 to Level 3.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 33 — KEY TAKEAWAYS
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Key Takeaways</h1>
  </div>
  <div class="slide-body" style="align-items: stretch; padding: 0.8rem 1.8rem;">
    <div class="takeaway-grid" style="width: 100%; flex: 1;">
      <div class="takeaway-item" v-click>
        <span class="takeaway-num">1</span>
        <span class="takeaway-text"><strong>HVE is a way of working</strong> — four pillars of multidisciplinary teams, design thinking, production-ready starting points, and AI tooling.</span>
      </div>
      <div class="takeaway-item" v-click>
        <span class="takeaway-num">2</span>
        <span class="takeaway-text"><strong>HVE-Core operationalizes HVE</strong> — 221 artifacts across 12 collections, 10 roles, and a 9-stage project lifecycle.</span>
      </div>
      <div class="takeaway-item" v-click>
        <span class="takeaway-num">3</span>
        <span class="takeaway-text"><strong>RPI constrains AI by phase</strong> — when AI can't implement, it stops guessing and starts verifying. Dramatically better, traceable outcomes.</span>
      </div>
      <div class="takeaway-item" v-click>
        <span class="takeaway-num">4</span>
        <span class="takeaway-text"><strong>Context engineering matters</strong> — <code>/clear</code> between phases isn't a workaround; it's the architectural decision that makes RPI work.</span>
      </div>
      <div class="takeaway-item" v-click>
        <span class="takeaway-num">5</span>
        <span class="takeaway-text"><strong>Start small</strong> — install the extension, try RPI on one real task, then scale to your team.</span>
      </div>
    </div>
  </div>
</div>

<!--
Reinforce the key messages. The paradigm shift:
Stop asking AI "write this code." Start asking
"help me research, plan, then implement with evidence."
First workflow feels slower. By the third feature, it's natural.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 34 — RESOURCES & LINKS
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Resources &amp; Links</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.55rem; align-items: stretch; padding: 0.4rem 1.8rem 0.8rem;">
    <div style="display: flex; gap: 0.65rem; align-items: stretch; flex: 1;">
      <a href="https://microsoft.github.io/hve-core/docs/" target="_blank" class="card card-link" style="flex: 1; display: flex; flex-direction: row; align-items: flex-start; gap: 0.9rem; padding: 0.95rem 1.1rem; border-color: color-mix(in srgb, var(--theme-accent2) 50%, white); border-width: 2px;">
        <div class="icon-circle" style="flex-shrink: 0; margin: 0; background: linear-gradient(135deg, #085f92, #38A4DC);">📚</div>
        <div>
          <h3 style="background: linear-gradient(135deg, #085f92 0%, #38A4DC 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 0.35em; font-size: 1.05em;">HVE-Core Docs</h3>
          <p style="margin: 0; font-size: 0.82em;">Full documentation, guides, and references</p>
        </div>
        <span class="card-link-arrow">↗</span>
      </a>
      <a href="https://microsoft.github.io/hve-core/docs/rpi/" target="_blank" class="card card-link" style="flex: 1; display: flex; flex-direction: row; align-items: flex-start; gap: 0.9rem; padding: 0.95rem 1.1rem; border-color: color-mix(in srgb, #c2410c 50%, white); border-width: 2px;">
        <div class="icon-circle" style="flex-shrink: 0; margin: 0; background: linear-gradient(135deg, #c2410c, #f97316);">🔬</div>
        <div>
          <h3 style="background: linear-gradient(135deg, #c2410c 0%, #f97316 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 0.35em; font-size: 1.05em;">RPI Methodology</h3>
          <p style="margin: 0; font-size: 0.82em;">Deep dive into Research → Plan → Implement → Review</p>
        </div>
        <span class="card-link-arrow">↗</span>
      </a>
      <a href="https://github.com/microsoft/hve-core" target="_blank" class="card card-link" style="flex: 1; display: flex; flex-direction: row; align-items: flex-start; gap: 0.9rem; padding: 0.95rem 1.1rem; border-color: color-mix(in srgb, #5635a0 50%, white); border-width: 2px;">
        <div class="icon-circle" style="flex-shrink: 0; margin: 0; background: linear-gradient(135deg, #5635a0, #7850c0);">🐙</div>
        <div>
          <h3 style="background: linear-gradient(135deg, #5635a0 0%, #9c79e0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0 0 0.35em; font-size: 1.05em;">GitHub Repo</h3>
          <p style="margin: 0; font-size: 0.82em;">Open source — star it, fork it, contribute</p>
        </div>
        <span class="card-link-arrow">↗</span>
      </a>
    </div>
    <div class="card" style="border-color: color-mix(in srgb, var(--theme-accent5) 50%, white); border-width: 2px; display: flex; flex-direction: row; align-items: center; gap: 0.9rem; padding: 0.85rem 1.1rem;">
      <div class="icon-circle" style="flex-shrink: 0; margin: 0;">⚡</div>
      <div>
        <h3 style="font-size: 1.05em; margin: 0 0 0.3em;">Install Now</h3>
        <p style="margin: 0; font-size: 0.88em;">VS Code Marketplace: <code>ise-hve-essentials.hve-core</code> — start with the Getting Started page for a 1-min → 5-min → 15-min progressive path.</p>
      </div>
    </div>
  </div>
</div>

<!--
Encourage attendees to start with the Getting Started page.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 35 — THANK YOU / Q&A
     ═══════════════════════════════════════════════════════════ -->

<div class="closing-slide">
  <div class="closing-message">
    <LineIcon name="velocity" />
    <h1>The first RPI cycle feels slower.<br>By the third, it is how you work.</h1>
    <p>Install HVE-Core, run one real task through Research → Plan → Implement → Review, then scale it.</p>
  </div>
  <div class="closing-wave" aria-label="Adoption compounds from installing the extension to scaling across an organisation">
    <span><LineIcon name="terminal" /><b>Install</b></span>
    <span><LineIcon name="repeat" /><b>One RPI cycle</b></span>
    <span><LineIcon name="layers" /><b>Team</b></span>
    <span><LineIcon name="velocity" /><b>Organisation</b></span>
  </div>
  <footer class="closing-next">
    <span>Questions — or a live demo on the spot</span>
    <a href="https://microsoft.github.io/hve-core/docs/getting-started/" target="_blank">Get started with HVE-Core <b>→</b></a>
  </footer>
</div>

<!--
Open for questions. Keep answers concise.
Remind people of the install → try → scale path.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="person" /></span>
    <h1>About Me</h1>
    <span class="app-context">profile</span>
  </header>
  <main class="profile-layout">
    <section class="profile-identity">
      <div class="profile-avatar">DSR</div>
      <div>
        <h2>Daniel Scott-Raynsford</h2>
        <p>Sr. Partner Solution Architect</p>
        <p>Cloud &amp; AI Apps · Microsoft</p>
      </div>
    </section>
    <section class="profile-focus">
      <p class="profile-statement">I turn emerging platform capabilities into practical engineering systems.</p>
      <div class="profile-tags" aria-label="Areas of focus">
        <span>Agentic engineering</span>
        <span>Azure</span>
        <span>GitHub</span>
      </div>
    </section>
    <nav class="profile-links" aria-label="Daniel Scott-Raynsford links">
      <a href="https://danielscottraynsford.com" target="_blank">
        <span>Website</span><strong>danielscottraynsford.com ↗</strong>
      </a>
      <a href="https://www.linkedin.com/in/dscottraynsford/" target="_blank">
        <span>LinkedIn</span><strong>/in/dscottraynsford ↗</strong>
      </a>
      <a href="https://github.com/PlagueHO" target="_blank">
        <span>GitHub</span><strong>@PlagueHO ↗</strong>
      </a>
    </nav>
  </main>
</div>

<!--
Close with a short introduction and leave contact details visible after Q&A.
-->
