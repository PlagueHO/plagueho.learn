---
theme: default
title: "From Chat to Agents: The Agentic Loop & Microsoft IQ"
info: |
  ## From Chat to Agents: The Agentic Loop & Microsoft IQ
  A 20-minute session by Daniel Scott-Raynsford on the shift from chat to
  tool-using agents, the role of Microsoft IQ intelligence layers, and why
  Foundry is the governed runtime for enterprise agent systems.
class: text-center
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<div class="hero-shell">
  <div class="hero-qr-block">
    <img src="./images/presentation-qr-code.png" class="hero-qr" alt="Presentation QR code" />
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" class="hero-qr-url">github.com/PlagueHO/plagueho.learn</a>
  </div>
  <p class="eyebrow">Microsoft IQ · ReAct Loop · Foundry Agent Service · Airport Operations</p>
  <h1 class="hero-heading">From Chat<br />to Agents</h1>
  <p class="hero-sub">
    How a simple ops chatbot becomes a <strong>governed, tool-using agent system</strong> with
    <strong>Work IQ</strong>, <strong>Fabric IQ</strong>, and <strong>Foundry IQ</strong>.
  </p>
  <div class="hero-meta">
    <span>Daniel Scott-Raynsford (DSR)</span>
    <span>Sr. Partner Solution Architect · Cloud &amp; AI Apps · Microsoft EPS</span>
    <span>20 minutes · CTO focus · airport story</span>
  </div>
  <div class="hero-badge-grid">
    <div class="badge-card">
      <strong>🔄 ReAct Loop</strong>
      <span>Reason → Action → Observe instead of one-shot answers</span>
    </div>
    <div class="badge-card">
      <strong>🛠️ Tools create value</strong>
      <span>From CRUD wrappers to governed operational intelligence</span>
    </div>
    <div class="badge-card">
      <strong>🧠 IQ-backed moat</strong>
      <span>Sell intelligence on tap, not just another software screen</span>
    </div>
    <div class="badge-card">
      <strong>🏗️ Foundry runtime</strong>
      <span>Governed lifecycle, evaluation, and enterprise controls</span>
    </div>
  </div>
  <div class="airport-banner">
    <strong>Running example:</strong> The airbridge on Gate 35 just failed — flights must be reassigned, crews redirected, maintenance dispatched, and passengers updated
  </div>
</div>

---
transition: fade-out
---

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>From Chat to the ReAct Loop</h1>
    <img src="./images/azure.png" class="banner-icon" alt="Azure" />
  </div>
  <div class="slide-body" style="flex-direction:column;align-items:stretch;flex:0 1 auto;">
    <div class="scenario-banner">
      <span>Scenario: an airbridge on <strong>Gate 35</strong> has a fault — the gate is suddenly unusable.</span>
    </div>
    <div class="comparison-grid" style="width:100%;">
      <div class="comparison-col before">
        <span class="comparison-label before">RAG / Chat Completions API</span>
        <div class="chat-flow-diagram">
          <span class="chat-pill">👤 Question</span>
          <span class="chat-flow-arrow">↓</span>
          <span class="chat-pill">📄 Retrieve data</span>
          <span class="chat-flow-arrow">↓</span>
          <span class="chat-pill">🧠 LLM + data → answer</span>
          <span class="chat-flow-arrow">↓</span>
          <span class="chat-pill">💬 Response</span>
        </div>
        <ul class="dense-list" style="font-size:1.05rem;">
          <li>"What is the SOP for an airbridge failure?"</li>
          <li>"Which flights are assigned to Gate 35?"</li>
          <li>"Who is the on-duty maintenance supervisor?"</li>
        </ul>
        <p class="approach-message">💬 Three separate questions, three isolated answers. The supervisor still has to plan, coordinate, and act.</p>
      </div>
      <div class="comparison-col after" v-click>
        <span class="comparison-label after">Agentic Loop / Responses API</span>
        <AgenticLoopDiagram />
        <ul class="dense-list" style="font-size:1.05rem;">
          <li>"Create a remediation plan for the Gate 35 airbridge failure and execute it"</li>
        </ul>
        <p class="approach-message">🎯 One goal. The agent reasons, calls tools, observes results, and loops — reassigning flights, dispatching maintenance, redirecting crews, and updating passengers autonomously. Tool calls can require a human to approve (👤 human in the loop).</p>
      </div>
    </div>
  </div>
</div>

---
transition: slide-up
---

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Agentic Tool Evolution</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.3rem;align-items:stretch;">
    <div class="hero-quote" style="align-self:center;padding:0.35rem 1.2rem;font-size:1.2rem;">
      <span class="hero-quote-emoji">😰</span>
      <span>An agent without tools is just a <em>chatbot with anxiety.</em></span>
    </div>
    <div class="highlight-strip">
      <div class="highlight-pill" v-click="2">
        <span class="hl-icon">🔌</span>
        <span class="hl-label">CRUD tools</span>
        <span class="hl-desc">Thin wrappers over APIs and records</span>
      </div>
      <div class="highlight-pill" v-click="3">
        <span class="hl-icon">🧠</span>
        <span class="hl-label">Smart knowledge tools</span>
        <span class="hl-desc">Business-aware reasoning over multiple sources</span>
      </div>
      <div class="highlight-pill" v-click="4">
        <span class="hl-icon">🤖</span>
        <span class="hl-label">Agentic tools</span>
        <span class="hl-desc">Outcome-oriented intelligence as a service</span>
      </div>
    </div>
    <div class="intelligence-arrow" v-click="1">
      <div class="ia-track">
        <div class="ia-gradient"></div>
        <div class="ia-arrowhead"></div>
      </div>
      <div class="ia-labels">
        <span class="ia-label ia-low">Simple, low intelligence</span>
        <span class="ia-label ia-mid">Smart tools</span>
        <span class="ia-label ia-high">Sub-agents</span>
      </div>
      <div class="ia-caption">Higher intelligence → higher value &amp; capability</div>
    </div>
    <div class="comparison-grid" style="align-items:stretch;">
      <div class="comparison-col before" v-click="5">
        <span class="comparison-label before">Bad tool contract</span>
        <div class="panel" style="padding:0.5rem 0.8rem;">
          <p style="margin:0 0 0.3rem;font-family:monospace;font-size:1.35rem;color:var(--theme-deep);">get_gate_status</p>
          <ul class="dense-list" style="margin:0;">
            <li>Returns data, but agent can't act on it</li>
            <li>Supervisor still plans the response manually</li>
            <li>Weak semantic signal for the model</li>
          </ul>
        </div>
      </div>
      <div class="comparison-col after" v-click="6">
        <span class="comparison-label after">Good tool contract</span>
        <div class="panel" style="padding:0.5rem 0.8rem;">
          <p style="margin:0 0 0.3rem;font-family:monospace;font-size:1.35rem;color:var(--theme-deep);">create_gate_disruption_remediation_plan</p>
          <ul class="dense-list" style="margin:0;">
            <li>Description explains when to invoke it</li>
            <li>Parameters: gate, failure type, time horizon</li>
            <li>Agent reasons about full operational response</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="callout-teal callout" style="font-size:1.44rem;max-width:none;" v-click="7">
      The moat is not that you have an agent. The moat is that your smart knowledge tools encode governed operational reasoning customers can consume repeatedly.
    </div>
  </div>
</div>

---
transition: fade-out
---

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Foundry Runtime + Agent Choice</h1>
    <img src="./images/azure.png" class="banner-icon" alt="Azure" />
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.8rem;align-items:stretch;">
    <div class="panel" style="padding:1rem 1.1rem;">
      <p class="kicker" style="color:var(--theme-accent2);">Foundry Agent Service v2</p>
      <div class="flow-pipeline" style="justify-content:center;flex-wrap:wrap;row-gap:0.45rem;margin:0.35rem 0 0.55rem;">
        <span class="flow-step flow-step-active">Ops request</span>
        <span class="flow-arrow">→</span>
        <span class="react-phase reason">Reason</span>
        <span class="flow-arrow">→</span>
        <span class="react-phase action">Tool calls</span>
        <span class="flow-arrow">→</span>
        <span class="react-phase observe">Observe</span>
        <span class="flow-arrow">↺</span>
        <span class="flow-step">Governance</span>
      </div>
      <p style="margin:0;text-align:center;color:var(--theme-muted);font-size:0.88rem;">Foundry orchestrates the loop, tool access, and enterprise controls so the airport pilot can move from prototype to real control-room usage.</p>
    </div>
    <div class="comparison-grid" style="align-items:stretch;">
      <div class="comparison-col before" v-click>
        <span class="comparison-label before">Responses Agent</span>
        <h3>Code-owned and fast</h3>
        <ul class="dense-list">
          <li>Rapid iteration in application code</li>
          <li>Flexible for prototyping and experiments</li>
          <li>Best when speed and ownership dominate</li>
        </ul>
      </div>
      <div class="comparison-col after" v-click>
        <span class="comparison-label after">Foundry Agent</span>
        <h3>Versioned and governed</h3>
        <ul class="dense-list">
          <li>Managed lifecycle and platform controls</li>
          <li>Clearer versioning and operational governance</li>
          <li>Best when piloting into production operations</li>
        </ul>
      </div>
    </div>
    <div class="callout" style="font-size:0.94rem;text-align:center;max-width:none;" v-click>
      <strong>Decision:</strong> speed and code ownership versus governance and lifecycle control.
    </div>
  </div>
</div>

---
transition: slide-left
---

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>IQ Layers in Action</h1>
    <img src="./images/azure.png" class="banner-icon" alt="Azure" />
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.75rem;align-items:stretch;">
    <div class="iq-grid">
      <div class="iq-pillar iq-work" v-click>
        <div class="iq-icon">🏢</div>
        <h3>Work IQ</h3>
        <p><strong>People context</strong></p>
        <ul class="dense-list" style="font-size:0.82rem;">
          <li>Maintenance dispatcher emails about repair ETA</li>
          <li>Shift-manager conversations on crew availability</li>
          <li>Organizational coordination signals</li>
        </ul>
      </div>
      <div class="iq-pillar iq-fabric" v-click>
        <div class="iq-icon">📊</div>
        <h3>Fabric IQ</h3>
        <p><strong>Business data</strong></p>
        <ul class="dense-list" style="font-size:0.82rem;">
          <li>Gate availability and flight schedules</li>
          <li>Crew rosters and duty windows</li>
          <li>Semantic understanding of operations data</li>
        </ul>
      </div>
      <div class="iq-pillar iq-foundry" v-click>
        <div class="iq-icon">🧠</div>
        <h3>Foundry IQ</h3>
        <p><strong>Enterprise knowledge</strong></p>
        <ul class="dense-list" style="font-size:0.82rem;">
          <li>Airbridge failure SOPs and incident history</li>
          <li>Grounding across knowledge sources</li>
          <li>Retrieval that contains blast radius</li>
        </ul>
      </div>
    </div>
    <div class="panel" style="padding:1rem 1.1rem;" v-click>
      <p class="kicker">Gate 35 airbridge failure</p>
      <p style="margin:0 0 0.55rem;color:var(--theme-ink);font-size:0.94rem;line-height:1.55;">Flights SQ308 and QF1 need reassignment, Gate 22 has a maintenance hold expiring in 40 min, crew duty windows are tightening, and passengers across both flights need updated messaging.</p>
      <div class="flow-pipeline" style="justify-content:center;flex-wrap:wrap;row-gap:0.45rem;">
        <span class="flow-step">Work IQ</span>
        <span class="flow-arrow">+</span>
        <span class="flow-step">Fabric IQ</span>
        <span class="flow-arrow">+</span>
        <span class="flow-step">Foundry IQ</span>
        <span class="flow-arrow">→</span>
        <span class="flow-step flow-step-active">Remediation plan</span>
      </div>
    </div>
    <div class="callout-teal callout" style="font-size:0.9rem;max-width:none;" v-click>
      This is where the moat comes from: governed, business-aware reasoning across multiple sources. It is also where security becomes non-negotiable because the agent now touches people data, operational systems, and enterprise knowledge.
    </div>
  </div>
</div>

---
transition: slide-up
---

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Governing Intelligent Tool Use</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.65rem;align-items:stretch;">
    <div class="three-col-grid">
      <div class="section-card" v-click>
        <p class="section-number">1 · Design tools for calling</p>
        <ul class="dense-list" style="font-size:0.82rem;line-height:1.55;">
          <li>Design for when and why, not just how</li>
          <li>Consolidate tiny wrappers into semantic tools</li>
          <li>Treat descriptions and schema like API contracts</li>
        </ul>
      </div>
      <div class="section-card" v-click>
        <p class="section-number">2 · Instruct agents like operators</p>
        <ul class="dense-list" style="font-size:0.82rem;line-height:1.55;">
          <li>Write operating rules, not vague aspirations</li>
          <li>Define escalation and pre-check conditions</li>
          <li>Govern when the agent must not act alone</li>
        </ul>
      </div>
      <div class="section-card" v-click>
        <p class="section-number">3 · Evaluate and monitor</p>
        <ul class="dense-list" style="font-size:0.82rem;line-height:1.55;">
          <li>Pre-production datasets and synthetic scenarios</li>
          <li>Post-production monitoring for drift</li>
          <li>Scheduled red teaming for security and safety</li>
        </ul>
      </div>
    </div>
    <div class="comparison-grid" style="gap:0.65rem;align-items:stretch;">
      <div class="comparison-col before" style="padding:0.8rem 0.9rem;" v-click>
        <span class="comparison-label before">Example · tool naming</span>
        <p style="margin:0.45rem 0 0.3rem;font-family:monospace;font-size:0.76rem;color:var(--theme-deep);">get_gate_status</p>
        <p style="margin:0;color:var(--theme-muted);font-size:0.74rem;line-height:1.45;">Returns data, but the agent cannot plan a response or coordinate actions.</p>
      </div>
      <div class="comparison-col after" style="padding:0.8rem 0.9rem;" v-click>
        <span class="comparison-label after">Example · better contract</span>
        <p style="margin:0.45rem 0 0.3rem;font-family:monospace;font-size:0.76rem;color:var(--theme-deep);">create_gate_disruption_remediation_plan</p>
        <p style="margin:0;color:var(--theme-muted);font-size:0.74rem;line-height:1.45;">Description: use when a gate becomes unexpectedly unavailable to generate a coordinated remediation plan.</p>
      </div>
    </div>
    <div class="highlight-strip" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.65rem;">
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click>
        <span class="hl-icon">📘</span>
        <span class="hl-label">Instruction example</span>
        <span class="hl-desc">Escalate gate reassignment if more than 3 connecting flights are affected.</span>
      </div>
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click>
        <span class="hl-icon">🧪</span>
        <span class="hl-label">Foundry evaluators</span>
        <span class="hl-desc">Task Completion, Task Adherence, Tool Selection, Tool Call Accuracy, and related agent evaluators.</span>
      </div>
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click>
        <span class="hl-icon">🔗</span>
        <span class="hl-label">On-screen references</span>
        <span class="hl-desc"><a href="https://aka.ms/e2e-agent-eval-sample" target="_blank">aka.ms/e2e-agent-eval-sample</a><br /><a href="https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/agent-evaluators" target="_blank">learn.microsoft.com/.../agent-evaluators</a></span>
      </div>
    </div>
    <div class="callout" style="font-size:0.84rem;max-width:none;" v-click>
      Brute-force harness pattern: generate many synthetic gate-failure scenarios from tool definitions, run the agent across the permutations, and tune descriptions, instructions, and model settings until tool selection stabilizes.
    </div>
  </div>
</div>

---
transition: fade-out
---

<div class="hero-shell" style="padding-top:1.8rem;padding-bottom:1.8rem;justify-content:space-between;">
  <div class="hero-qr-block">
    <img src="./images/presentation-qr-code.png" class="hero-qr" alt="Presentation QR code" />
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" class="hero-qr-url">github.com/PlagueHO/plagueho.learn</a>
  </div>
  <div>
    <p class="eyebrow">Q&amp;A · Takeaways · Substitute your own domain</p>
    <h1 class="hero-heading" style="max-width:12ch;">Key Takeaways</h1>
    <p class="hero-sub" style="max-width:42rem;">
      We started with an ops chatbot that could answer "What is the SOP?" and "Which flights use Gate 35?" and ended with a
      <strong>governed agent system</strong> that can create and execute a full remediation plan —
      reassigning flights, dispatching maintenance, coordinating crews, and continuously adapting.
    </p>
  </div>
  <div class="takeaway-grid" style="display:grid;grid-template-columns:1fr;gap:0.55rem;max-width:52rem;">
    <div class="takeaway-item takeaway-item-dark" v-click>
      <span class="takeaway-num">1</span>
      <span class="takeaway-text"><strong>Agents are different from chat</strong> — they loop, act, observe, and keep working.</span>
    </div>
    <div class="takeaway-item takeaway-item-dark" v-click>
      <span class="takeaway-num">2</span>
      <span class="takeaway-text"><strong>Tools are evolving</strong> — from CRUD wrappers to smart knowledge tools to agentic capabilities.</span>
    </div>
    <div class="takeaway-item takeaway-item-dark" v-click>
      <span class="takeaway-num">3</span>
      <span class="takeaway-text"><strong>IQ-backed tools can become a moat</strong> — sell intelligence, not just screens.</span>
    </div>
    <div class="takeaway-item takeaway-item-dark" v-click>
      <span class="takeaway-num">4</span>
      <span class="takeaway-text"><strong>Foundry gives you the runtime and lifecycle model</strong> for governed tool-using agents.</span>
    </div>
    <div class="takeaway-item takeaway-item-dark" v-click>
      <span class="takeaway-num">5</span>
      <span class="takeaway-text"><strong>Design tools for calling, instruct agents like operators, and evaluate continuously.</strong></span>
    </div>
  </div>
</div>
