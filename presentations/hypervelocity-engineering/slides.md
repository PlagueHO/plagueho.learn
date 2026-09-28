---
theme: default
title: "Hypervelocity Engineering"
info: |
  ## Hypervelocity Engineering
  Speed with purpose. Production rigor at AI velocity.
  A 75-minute session for Frontier Transformation Engineers, engineering
  managers, and technical leaders driving agentic development evolution.
  Presented by Daniel Scott-Raynsford.
tags:
  - Hypervelocity Engineering
  - Agentic Engineering
  - Responsible AI
  - GitHub Copilot
duration: 75
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

<div class="hve-hero">
  <div class="hve-hero-copy">
    <h1>Hypervelocity<br>Engineering</h1>
    <p class="hve-hero-sub">Speed with purpose. <strong>Production rigor at AI velocity.</strong></p>
    <p class="hve-hero-thesis">Small expert teams combine design thinking, proven production starting points, and AI across the lifecycle to deliver trustworthy value in days or weeks.</p>
    <div class="hve-presenter"><strong>Daniel Scott-Raynsford</strong><span>Sr. Partner Solution Architect · Microsoft</span></div>
  </div>
  <div class="hve-hero-system" aria-label="The four ingredients of Hypervelocity Engineering">
    <div class="hero-system-core"><LineIcon name="velocity" label="Hypervelocity Engineering" /><strong>One operating model</strong></div>
    <div class="hero-system-node node-team"><LineIcon name="person" /><span>Expert teams</span></div>
    <div class="hero-system-node node-design"><LineIcon name="target" /><span>Design thinking</span></div>
    <div class="hero-system-node node-start"><LineIcon name="layers" /><span>Production starts</span></div>
    <div class="hero-system-node node-ai"><LineIcon name="flow" /><span>AI lifecycle</span></div>
  </div>
  <div class="hve-hero-meta"><span>75 minutes</span><span>Frontier Transformation Engineers · Engineering leaders</span></div>
</div>

<!--
HVE is the subject today—not a product or toolchain. We will examine an
operating model for delivering valuable, trustworthy software faster by making
engineering rigor continuous.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="velocity" /></span><h1>AI collapsed the distance from intent to implementation</h1><span class="app-context">the opportunity</span></header>
  <main class="compression-layout">
    <section class="compression-before">
      <p class="diagram-label">Yesterday’s constraint</p>
      <div class="compression-rail"><span>Idea</span><i></i><span>Specification</span><i></i><span>Code</span><i></i><span>Release</span></div>
      <p>Implementation absorbed much of the schedule.</p>
    </section>
    <section class="compression-now">
      <p class="diagram-label">Today’s constraint</p>
      <div class="compression-rail compressed"><span>Intent</span><i></i><span>Generated implementation</span></div>
      <div class="constraint-stack">
        <span>Right problem?</span>
        <span>Right context?</span>
        <span>Safe and operable?</span>
        <span>Valuable in use?</span>
      </div>
    </section>
    <p class="slide-claim">AI makes implementation cheaper. <strong>Engineering judgment becomes more valuable.</strong></p>
  </main>
</div>

<!--
The bottleneck moved. We can generate an implementation rapidly, but intent,
context, validation, and adoption still determine whether it creates value.
HVE is a response to that changed constraint.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="warning" /></span><h1>Speed without purpose accelerates the wrong outcome</h1><span class="app-context">speed × rigor</span></header>
  <main class="matrix-layout">
    <div class="matrix-axis axis-y"><span>High rigor</span><span>Low rigor</span></div>
    <div class="matrix-axis axis-x"><span>Low speed</span><span>High speed</span></div>
    <div class="purpose-matrix">
      <section class="matrix-cell traditional"><strong>Traditional delivery</strong><span>Reliable, but feedback arrives late</span></section>
      <section class="matrix-cell hve-target"><strong>Hypervelocity Engineering</strong><span>Fast learning and production confidence</span></section>
      <section class="matrix-cell stalled"><strong>Stalled exploration</strong><span>Neither learning nor delivery compounds</span></section>
      <section class="matrix-cell danger"><strong>Uncontrolled generation</strong><span>The wrong answer scales quickly</span></section>
    </div>
    <p class="slide-claim">The goal is not maximum generation. It is <strong>minimum time to trustworthy value.</strong></p>
  </main>
</div>

<!--
Rapid prototypes are useful when they accelerate learning. They become
dangerous when we mistake generated output for a production outcome.
HVE deliberately optimizes speed and rigor together.
-->

---
transition: slide-up
---

<div class="hve-section">
  <div class="section-copy">
    <h1>Replace handoff queues with a continuous learning system</h1>
    <p>Small expert teams keep intent, evidence, implementation, and operations in the same conversation.</p>
  </div>
  <div class="operating-contrast">
    <section>
      <strong>Traditional delivery</strong>
      <div class="handoff-rail"><span>Business</span><i></i><span>Design</span><i></i><span>Build</span><i></i><span>Operate</span></div>
      <small>Large batches · functional queues · late feedback</small>
    </section>
    <section class="operating-loop">
      <strong>HVE</strong>
      <div class="loop-core"><span>User evidence</span><span>Expert crew</span><span>Production system</span></div>
      <small>Small increments · shared context · continuous validation</small>
    </section>
  </div>
</div>

<!--
HVE is not Agile with more automation. It changes where decisions happen and
how quickly evidence returns to the people who can act on it.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="layers" /></span><h1>Four ingredients create one system</h1><span class="app-context">HVE model</span></header>
  <main class="ingredient-system">
    <div class="ingredient-core"><strong>Valuable,<br>trustworthy<br>outcomes</strong></div>
    <section class="ingredient ingredient-team"><LineIcon name="person" /><div><strong>Tight expert teams</strong><span>Deep domain expertise and authority to decide</span></div></section>
    <section class="ingredient ingredient-design"><LineIcon name="target" /><div><strong>Design thinking</strong><span>Evidence that the problem and outcome matter</span></div></section>
    <section class="ingredient ingredient-start"><LineIcon name="layers" /><div><strong>Production starting points</strong><span>Proven foundations instead of blank pages</span></div></section>
    <section class="ingredient ingredient-ai"><LineIcon name="flow" /><div><strong>AI across the lifecycle</strong><span>Acceleration beyond code generation</span></div></section>
    <p class="system-note">Remove any one ingredient and velocity becomes fragile.</p>
  </main>
</div>

<!--
The ingredients constrain and strengthen one another. Tools without user
evidence scale the wrong solution. A strong team without proven foundations
rebuilds commodity infrastructure. Starting points without expertise become
cargo cults.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="person" /></span><h1>Small expert teams reduce coordination latency</h1><span class="app-context">ingredient 1</span></header>
  <main class="crew-layout">
    <section class="crew-orbit" aria-label="A multidisciplinary HVE crew around the user outcome">
      <div class="crew-core"><strong>User outcome</strong><span>One shared measure of value</span></div>
      <div class="crew-role role-domain"><LineIcon name="person" /><strong>Domain</strong><span>How work really happens</span></div>
      <div class="crew-role role-product"><LineIcon name="target" /><strong>Product</strong><span>What outcome matters</span></div>
      <div class="crew-role role-engineer"><LineIcon name="terminal" /><strong>Engineering</strong><span>How it will endure</span></div>
      <div class="crew-role role-trust"><LineIcon name="shield" /><strong>Trust</strong><span>How risk is controlled</span></div>
    </section>
    <section class="crew-message">
      <p class="big-claim">Fewer handoffs.<br><strong>Faster decisions.</strong></p>
      <ul class="signal-list">
        <li>Expertise is present when trade-offs are made.</li>
        <li>Feedback reaches the people who can change the system.</li>
        <li>The team owns value and production behavior together.</li>
      </ul>
      <div class="evidence-caveat"><strong>Internal experience:</strong> 3–4 experts compared with teams of 10+ in selected engagements—not a staffing formula.</div>
    </section>
  </main>
</div>

<!--
Small does not mean developers working alone. It means the few people required
to understand the domain, shape value, build the system, and control risk can
make decisions together. Team shape follows the problem.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="target" /></span><h1>Design thinking keeps velocity pointed at value</h1><span class="app-context">ingredient 2</span></header>
  <main class="space-flow">
    <section class="space-stage problem-space">
      <span class="stage-mark">01</span>
      <h2>Problem</h2>
      <p>Scope conversations<br>Design research<br>Input synthesis</p>
      <strong>Evidence: a problem worth solving</strong>
    </section>
    <span class="space-connector" aria-hidden="true"></span>
    <section class="space-stage solution-space">
      <span class="stage-mark">02</span>
      <h2>Solution</h2>
      <p>Brainstorming<br>User concepts<br>Low-fidelity prototypes</p>
      <strong>Evidence: a concept worth testing</strong>
    </section>
    <span class="space-connector" aria-hidden="true"></span>
    <section class="space-stage implementation-space">
      <span class="stage-mark">03</span>
      <h2>Implementation</h2>
      <p>High-fidelity prototypes<br>User testing<br>Iteration at scale</p>
      <strong>Evidence: an outcome worth operating</strong>
    </section>
    <p class="flow-caption">Move forward on evidence—not on confidence.</p>
    <a class="source-link" href="https://microsoft.github.io/hve-core/docs/design-thinking/" target="_blank">Source: HVE-Core Design Thinking ↗</a>
  </main>
</div>

<!--
The spaces prevent premature fidelity. We learn the problem before polishing a
solution, and we validate the solution before scaling implementation.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="target" /></span><h1>The factory floor changed the backlog</h1><span class="app-context">anonymized internal example</span></header>
  <main class="factory-layout">
    <div class="factory-brief"><strong>Initial brief</strong><span>Build an agent that helps factory workers maintain equipment.</span></div>
    <div class="factory-evidence">
      <section><strong>Observed</strong><span>Greasy fingers and gloves made keyboard and touch interaction impractical.</span><em>→ Design for the working environment</em></section>
      <section><strong>Listened</strong><span>The agent could not answer the questions workers actually asked.</span><em>→ Use real language and end-to-end scenarios</em></section>
      <section><strong>Discovered</strong><span>Maintenance engineers relied on repair manuals the project had never received.</span><em>→ Make hidden knowledge explicit</em></section>
      <section><strong>Measured</strong><span>The existing process could still be faster and cheaper.</span><em>→ Prototype the full task economics</em></section>
    </div>
    <p class="slide-claim">The backlog became accurate only after <strong>the team met reality.</strong></p>
  </main>
</div>

<!--
This is an anonymized internal engagement example supplied by Microsoft
training, not a published customer case study. The key lesson is that backlog
generation cannot replace observation, interviews, telemetry, and prototypes.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="layers" /></span><h1>Start from production, not from zero</h1><span class="app-context">ingredient 3</span></header>
  <main class="foundation-layout">
    <section class="foundation-stack">
      <div class="foundation-layer differentiated"><strong>Differentiated value</strong><span>User experience · domain logic · business model</span></div>
      <div class="foundation-layer adaptable"><strong>Adaptable production patterns</strong><span>Architecture · workflows · controls · observability</span></div>
      <div class="foundation-layer proven"><strong>Proven starting point</strong><span>Secure defaults · deployment · tests · operations</span></div>
    </section>
    <section class="foundation-benefit">
      <p class="big-claim">Spend scarce expertise on<br><strong>what makes the outcome different.</strong></p>
      <div class="benefit-rail"><span>Accelerate delivery</span><span>Increase reliability</span><span>Focus on impact</span><span>Scale learning</span></div>
      <a class="source-link" href="https://learn.microsoft.com/en-us/industry/playbook/" target="_blank">Source: Microsoft HVE Accelerators Hub ↗</a>
    </section>
  </main>
</div>

<!--
A starting point is not a frozen template. It is a maintained production
foundation that lets the team spend more time on the domain-specific outcome.
It should make the right thing easier and remain adaptable.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="flow" /></span><h1>AI belongs across the lifecycle</h1><span class="app-context">ingredient 4</span></header>
  <main class="lifecycle-layout">
    <div class="lifecycle-rail">
      <section><LineIcon name="target" /><strong>Discover</strong><span>Research needs and constraints</span></section>
      <i></i>
      <section><LineIcon name="plan" /><strong>Define</strong><span>Shape outcomes and architecture</span></section>
      <i></i>
      <section><LineIcon name="layers" /><strong>Decompose</strong><span>Create traceable increments</span></section>
      <i></i>
      <section><LineIcon name="terminal" /><strong>Build</strong><span>Implement and verify</span></section>
      <i></i>
      <section><LineIcon name="shield" /><strong>Review</strong><span>Test quality, risk, and intent</span></section>
      <i></i>
      <section><LineIcon name="repeat" /><strong>Operate</strong><span>Observe, learn, and improve</span></section>
    </div>
    <div class="human-rail"><strong>Human accountability</strong><span>Set intent</span><span>Judge evidence</span><span>Approve risk</span><span>Own outcomes</span></div>
    <p class="slide-claim">Code generation is one activity—not the operating model.</p>
  </main>
</div>

<!--
AI can accelerate research, decomposition, implementation, review, operations,
and documentation. Human accountability remains across the system: setting
intent, judging evidence, approving risk, and owning the outcome.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="repeat" /></span><h1>Continuous loops replace staged handoffs</h1><span class="app-context">flow</span></header>
  <main class="continuous-layout">
    <div class="continuous-loop" aria-label="Continuous HVE learning loop">
      <span class="loop-step step-envision">Envision<strong>Value hypothesis</strong></span>
      <span class="loop-step step-explore">Explore<strong>User evidence</strong></span>
      <span class="loop-step step-design">Design<strong>Testable concept</strong></span>
      <span class="loop-step step-build">Build<strong>Small increment</strong></span>
      <span class="loop-step step-validate">Validate<strong>Production evidence</strong></span>
      <span class="loop-step step-learn">Learn<strong>Next decision</strong></span>
      <div class="loop-center"><LineIcon name="repeat" /><strong>Days and weeks</strong><span>not months between decisions</span></div>
    </div>
    <p class="slide-claim">Each loop delivers evidence and an increment of value.</p>
  </main>
</div>

<!--
Envisioning, exploration, design, and development do not disappear. They become
continuous and iterative. The smaller the loop, the sooner assumptions meet
evidence and the cheaper they are to change.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="shield" /></span><h1>Hypervelocity does not trade away rigor</h1><span class="app-context">production quality</span></header>
  <main class="rigor-layout">
    <div class="delivery-stream">
      <span>Intent</span><i></i><span>Increment</span><i></i><span>Production</span><i></i><span>Learning</span>
    </div>
    <div class="quality-rails">
      <section><LineIcon name="shield" /><strong>Security</strong><span>Threats and controls evolve with the increment</span></section>
      <section><LineIcon name="target" /><strong>Testing</strong><span>Acceptance and regression evidence travel with change</span></section>
      <section><LineIcon name="flow" /><strong>Observability</strong><span>Real behavior returns to the team quickly</span></section>
      <section><LineIcon name="layers" /><strong>Maintainability</strong><span>Patterns remain explainable and operable</span></section>
      <section><LineIcon name="plan" /><strong>Governance</strong><span>Controls match risk and remain auditable</span></section>
    </div>
    <p class="slide-claim">AI lowers the cost of fundamentals. <strong>Use the saving to do them continuously.</strong></p>
  </main>
</div>

<!--
The old trade-off was often “ship now or add the fundamentals.” AI and proven
starting points reduce the cost of tests, documentation, controls, and
instrumentation. HVE uses that saving to improve quality, not skip it.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="shield" /></span><h1>Responsible AI is designed in</h1><span class="app-context">trust</span></header>
  <main class="rai-layout">
    <div class="rai-question"><strong>Trust is an engineering property.</strong><span>Make five decisions before production makes them for you.</span></div>
    <div class="rai-decisions">
      <section><strong>Use intentionally</strong><span>Where does AI add value—and where is judgment required?</span></section>
      <section><strong>Make it understandable</strong><span>Can people explain recommendations, evidence, and actions?</span></section>
      <section><strong>Control failure</strong><span>How are bias, hallucination, leakage, misuse, and recovery handled?</span></section>
      <section><strong>Optimize outcomes</strong><span>Does it improve the task, not merely demonstrate novelty?</span></section>
      <section><strong>Operate responsibly</strong><span>Is it secure, observable, auditable, and able to evolve?</span></section>
    </div>
    <div class="source-row"><a href="https://www.microsoft.com/ai/responsible-ai" target="_blank">Microsoft Responsible AI ↗</a><a href="https://github.com/microsoft/hve-core/blob/main/TRANSPARENCY-NOTE.md" target="_blank">HVE-Core Transparency Note ↗</a></div>
  </main>
</div>

<!--
These five decisions translate Microsoft Responsible AI principles into the
engineering conversation. They do not replace Microsoft’s six published
principles. Responsible AI starts during problem framing and continues through
operations.
-->

---
transition: fade-out
---

<div class="impact-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="velocity" /></span><h1>Internal experience shows the shape—not a guarantee</h1><span class="app-context">indicative impact</span></header>
  <main class="impact-layout">
    <section><strong>2–3×</strong><span>velocity increase</span><small>Days or weeks instead of months in selected engagements</small></section>
    <section><strong>50%+</strong><span>smaller teams</span><small>Often 3–4 experts compared with teams of 10+</small></section>
    <section><strong>30%+</strong><span>code written by AI</span><small>A change in implementation mechanics—not a success metric</small></section>
    <div class="impact-caveat"><LineIcon name="warning" /><p><strong>Indicative Microsoft internal engineering experience.</strong> Outcomes vary by product, risk, team capability, and organizational context. These figures are not universal benchmarks or targets.</p></div>
  </main>
</div>

<!--
Use these figures to explain the shape of the transformation, not to promise a
business case. Smaller teams and AI-generated code are inputs. The outcome
still has to be valuable, trustworthy, and sustainable.
-->

---
transition: slide-up
---

<div class="hve-section tooling-section">
  <div class="section-copy">
    <h1>HVE-Core helps teams practice repeatable agentic engineering</h1>
    <p>GitHub Copilot is the execution surface. HVE-Core contributes reusable agents, skills, instructions, and workflow patterns.</p>
  </div>
  <div class="tooling-model">
    <div class="tooling-surface"><LineIcon name="terminal" /><strong>GitHub Copilot</strong><span>Agentic execution surface</span></div>
    <div class="tooling-inputs"><span>Agents</span><span>Skills</span><span>Instructions</span><span>Workflows</span></div>
    <div class="tooling-caveat"><LineIcon name="warning" /><span><strong>Opinionated and rapidly evolving.</strong> Treat HVE-Core as patterns and learning—not a mandatory platform.</span></div>
  </div>
  <a class="dark-source-link" href="https://github.com/microsoft/hve-core" target="_blank">github.com/microsoft/hve-core ↗</a>
</div>

<!--
This slide deliberately positions HVE-Core as one proven starting point inside
the fourth HVE ingredient. It is useful because teams do not have to invent
every agent, instruction, and workflow themselves.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="layers" /></span><h1>Context quality bounds output quality</h1><span class="app-context">context engineering</span></header>
  <main class="context-layout">
    <section class="context-window">
      <div class="context-good"><strong>Relevant evidence</strong><span>Code, user research, APIs, production telemetry</span></div>
      <div class="context-instructions"><strong>Intent and constraints</strong><span>Outcome, conventions, acceptance criteria, risk</span></div>
      <div class="context-history"><strong>Useful history</strong><span>Decisions and artifacts needed for this step</span></div>
      <div class="context-noise"><strong>Noise</strong><span>Stale assumptions, unrelated history, repeated instructions</span></div>
    </section>
    <section class="context-practices">
      <p class="big-claim">The context window is a<br><strong>finite engineering resource.</strong></p>
      <ol>
        <li><span>1</span>Investigate before changing.</li>
        <li><span>2</span>Persist evidence in artifacts.</li>
        <li><span>3</span>Carry only what the next decision needs.</li>
        <li><span>4</span>Reset between distinct phases when appropriate.</li>
      </ol>
    </section>
  </main>
</div>

<!--
This is an engineering principle, not a measured attention formula. Better
models cannot compensate for missing domain evidence or acceptance criteria.
Good context is relevant, intentional, and small enough for the next decision.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="flow" /></span><h1>RPI creates an evidence chain</h1><span class="app-context">one HVE practice</span></header>
  <main class="rpi-layout">
    <div class="rpi-rail">
      <section><span class="rpi-number">1</span><LineIcon name="target" /><strong>Research</strong><p>Investigate the system, users, guidance, and constraints.</p><small>Evidence</small></section>
      <i aria-hidden="true"></i>
      <section><span class="rpi-number">2</span><LineIcon name="plan" /><strong>Plan</strong><p>Turn evidence into sequenced work and acceptance criteria.</p><small>Contract</small></section>
      <i aria-hidden="true"></i>
      <section><span class="rpi-number">3</span><LineIcon name="terminal" /><strong>Implement</strong><p>Execute the contract in small, verifiable increments.</p><small>Change</small></section>
      <i aria-hidden="true"></i>
      <section><span class="rpi-number">4</span><LineIcon name="shield" /><strong>Review</strong><p>Validate behavior, intent, conventions, and risk.</p><small>Decision</small></section>
    </div>
    <p class="slide-claim">Research → plan → changes → review: <strong>a durable explanation of why.</strong></p>
    <a class="source-link" href="https://microsoft.github.io/hve-core/docs/rpi/" target="_blank">Source: HVE-Core RPI ↗</a>
  </main>
</div>

<!--
RPI is one practice within the AI lifecycle ingredient. Its value is not
ceremony. It prevents investigation and implementation from collapsing into a
single guess and leaves a durable evidence chain for the team.
-->

---
transition: slide-up
---

<div class="demo-shell hve-demo-title">
  <div class="demo-mark"><LineIcon name="shield" /></div>
  <h1 class="demo-title">Secure Marginalia’s<br>analysis pipeline</h1>
  <p class="demo-subtitle">A 14–16 minute HVE-Core RPI demonstration</p>
  <div class="demo-risk-flow">
    <span>Untrusted guidance</span>
    <span>Untrusted document text</span>
    <i></i>
    <strong>Foundry-backed editorial analysis</strong>
  </div>
  <div class="demo-outcome"><strong>Outcome</strong><span>Reduce prompt-injection exposure while preserving editorial value, latency, maintainability, and testability.</span></div>
</div>

<!--
Begin with the user and production risk, not a coding instruction. Both user
guidance and document text are untrusted. We want layered risk reduction
without damaging the editorial outcome or operating characteristics.
See DEMO.md for the full script and recovery paths.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="target" /></span><h1>Demo: Research and Plan</h1><span class="app-context">evidence → contract</span></header>
  <main class="demo-movement">
    <section class="demo-phase research-phase">
      <div class="phase-heading"><LineIcon name="target" /><div><strong>Research</strong><span>Do not implement</span></div></div>
      <p>Trace untrusted inputs. Verify existing controls. Compare current OWASP and Microsoft guidance. Recommend one proportionate first increment.</p>
      <div class="phase-output"><strong>Selected approach</strong><span>Prompt isolation · guidance relocation · boundary constraints · adversarial tests</span></div>
    </section>
    <span class="movement-connector" aria-hidden="true"></span>
    <section class="demo-phase plan-phase">
      <div class="phase-heading"><LineIcon name="plan" /><div><strong>Plan</strong><span>Do not implement</span></div></div>
      <p>Sequence localized changes. Define acceptance criteria, tests, configuration, and validation. Link each decision to research.</p>
      <div class="phase-output"><strong>Implementation contract</strong><span>Explicit scope · phased checklist · evidence links · quality gates</span></div>
    </section>
    <div class="demo-live-cue"><span>Live in VS Code</span><strong>Research reduces uncertainty. Planning prevents improvisation.</strong></div>
  </main>
</div>

<!--
Run Movement 1 from DEMO.md. Time box Research to three minutes and use the
prepared artifact immediately if it runs longer. Show evidence and the selected
approach, not every line of agent output.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="terminal" /></span><h1>Demo: Implement and Review</h1><span class="app-context">contract → decision</span></header>
  <main class="demo-movement">
    <section class="demo-phase implement-phase">
      <div class="phase-heading"><LineIcon name="terminal" /><div><strong>Implement</strong><span>Follow the contract</span></div></div>
      <p>Apply prompt isolation, move guidance to the user boundary, enforce configured limits, and add adversarial and regression tests.</p>
      <div class="phase-output"><strong>Controlled change</strong><span>Localized implementation · tests with behavior · durable changes log</span></div>
    </section>
    <span class="movement-connector" aria-hidden="true"></span>
    <section class="demo-phase review-phase">
      <div class="phase-heading"><LineIcon name="shield" /><div><strong>Review</strong><span>Validate independently</span></div></div>
      <p>Check the researched threat paths, acceptance criteria, repository conventions, validation results, and production trade-offs.</p>
      <div class="phase-output"><strong>Engineering decision</strong><span>Verified first increment · separated findings · measured follow-up</span></div>
    </section>
    <div class="demo-live-cue"><span>Live in VS Code</span><strong>Review asks both “does it work?” and “does it solve the researched problem?”</strong></div>
  </main>
</div>

<!--
Run Movement 2 from DEMO.md. Keep the focus on adherence to the contract and
the review decision—not generated code volume. Switch to the completed branch
if implementation threatens the time box.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="layers" /></span><h1>The demo used all four HVE ingredients</h1><span class="app-context">system proof</span></header>
  <main class="proof-layout">
    <section><LineIcon name="person" /><strong>Expert team</strong><span>Application, security, AI, and product constraints shaped the decision.</span><em>Not code generation alone</em></section>
    <section><LineIcon name="target" /><strong>Design thinking</strong><span>The outcome protected editorial value and user trust.</span><em>Not a sanitizer feature</em></section>
    <section><LineIcon name="layers" /><strong>Production starts</strong><span>Existing architecture, tests, and authoritative guidance reduced reinvention.</span><em>Not a blank page</em></section>
    <section><LineIcon name="flow" /><strong>AI lifecycle</strong><span>AI assisted investigation, planning, implementation, and independent review.</span><em>Not coding only</em></section>
    <p class="slide-claim">RPI made the work traceable. <strong>The operating model made it valuable and production-ready.</strong></p>
  </main>
</div>

<!--
This is the key correction to the old deck. RPI is not HVE by itself. The
demonstration worked because expertise, value framing, production foundations,
and lifecycle tools operated together.
-->

---
transition: slide-up
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="repeat" /></span><h1>Lead adoption as an operating-model change</h1><span class="app-context">prove → operationalize → scale</span></header>
  <main class="adoption-layout">
    <section class="adoption-stage prove">
      <span class="adoption-index">1</span>
      <h2>Prove</h2>
      <strong>One valuable workflow</strong>
      <p>Form an empowered multidisciplinary crew. Establish the current baseline. Select one proven starting point.</p>
      <small>Evidence: a trustworthy outcome</small>
    </section>
    <span class="adoption-connector" aria-hidden="true"></span>
    <section class="adoption-stage operationalize">
      <span class="adoption-index">2</span>
      <h2>Operationalize</h2>
      <strong>One repeatable system</strong>
      <p>Standardize the practices that worked. Embed controls, observability, and reusable context. Remove local friction.</p>
      <small>Evidence: repeated outcomes</small>
    </section>
    <span class="adoption-connector" aria-hidden="true"></span>
    <section class="adoption-stage scale">
      <span class="adoption-index">3</span>
      <h2>Scale</h2>
      <strong>Many context-aware teams</strong>
      <p>Share maintained starting points and measures. Grow capability without centralizing every decision.</p>
      <small>Evidence: system-level improvement</small>
    </section>
    <p class="slide-claim">Do not roll out a tool. <strong>Redesign one value stream, learn, then expand.</strong></p>
  </main>
</div>

<!--
Adoption starts with a real workflow, not an enterprise license count. Prove
the complete operating model in one context. Standardize what produces evidence
and remove what does not. Scale principles and maintained starting points while
letting teams adapt to their domains.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar"><span class="app-mark"><LineIcon name="target" /></span><h1>Measure outcomes, not AI activity</h1><span class="app-context">balanced scorecard</span></header>
  <main class="scorecard-layout">
    <section class="scorecard-anchor"><strong>North star</strong><span>Did users and the organization achieve a better outcome?</span></section>
    <div class="scorecard-grid">
      <section><LineIcon name="target" /><strong>Value</strong><span>User task success<br>Business outcome<br>Adoption or avoided cost</span></section>
      <section><LineIcon name="velocity" /><strong>Speed</strong><span>Idea to evidence<br>Evidence to production<br>Feedback latency</span></section>
      <section><LineIcon name="shield" /><strong>Quality</strong><span>Escaped defects<br>Rework and reliability<br>Maintainability</span></section>
      <section><LineIcon name="plan" /><strong>Trust</strong><span>Security findings<br>Explainability<br>Control effectiveness</span></section>
      <section><LineIcon name="repeat" /><strong>Learning</strong><span>Assumptions validated<br>Knowledge captured<br>Starting points improved</span></section>
    </div>
    <div class="anti-metric"><LineIcon name="warning" /><span><strong>AI-generated code percentage is an input signal.</strong> It does not prove value, quality, or transformation.</span></div>
  </main>
</div>

<!--
Use a balanced scorecard from the beginning. A velocity improvement that
increases rework is not hypervelocity. More AI-generated code that does not
improve the user outcome is not transformation.
-->

---
layout: center
class: text-center
transition: fade-out
---

<div class="hve-close">
  <div class="close-mark"><LineIcon name="velocity" /></div>
  <h1>The HVE leadership challenge</h1>
  <p class="close-thesis">Pick one important workflow. Form a small expert crew. Start from production. Apply AI across the lifecycle. Measure speed <strong>and</strong> trust.</p>
  <div class="close-action"><strong>Do not add AI to the old process.</strong><span>Build a better engineering system.</span></div>
  <nav class="close-links" aria-label="Presentation resources">
    <a href="https://learn.microsoft.com/en-us/industry/playbook/" target="_blank">HVE Accelerators Hub ↗</a>
    <a href="https://microsoft.github.io/hve-core/docs/" target="_blank">HVE-Core guidance ↗</a>
    <a href="https://www.microsoft.com/ai/responsible-ai" target="_blank">Responsible AI ↗</a>
  </nav>
  <div class="close-presenter"><strong>Daniel Scott-Raynsford</strong><span>danielscottraynsford.com · github.com/PlagueHO · linkedin.com/in/dscottraynsford</span></div>
  <p class="close-questions">Questions</p>
</div>

<!--
The action is organizational, not tool-specific. Select one workflow where
value matters, create the complete operating model around it, and measure both
speed and trustworthy outcomes. Leave this slide visible for questions.
-->
