---
theme: default
title: "From Chat to Agents: The Agentic Loop & Work IQ, Fabric IQ and Foundry IQ"
info: |
  ## From Chat to Agents: The Agentic Loop & Work IQ, Fabric IQ and Foundry IQ
  A 20-minute session by Daniel Scott-Raynsford on the shift from chat to
  tool-using agents, the role of Work IQ, Fabric IQ and Foundry IQ intelligence layers, and why
  Foundry is the governed runtime for enterprise agent systems.
tags:
  - Microsoft IQ
  - Foundry
  - Agents
  - Work IQ
  - Fabric IQ
duration: 20
class: text-center
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<div class="hero-shell">
  <div class="hero-qr-block">
    <img src="./images/presentation-qr-code.png" class="hero-qr" alt="Presentation QR code" />
    <a href="https://danielscottraynsford.com/plagueho.learn/microsoft-iq-foundry-agent-best-practices" target="_blank" class="hero-qr-url">danielscottraynsford.com/plagueho.learn/microsoft-iq-foundry-agent-best-practices</a>
  </div>
  <p class="eyebrow">Work IQ, Fabric IQ and Foundry IQ · ReAct Loop · Foundry Agent Service · Airport Operations</p>
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
  <div class="slide-body" style="flex-direction:column;gap:0.3rem;align-items:stretch;justify-content:center;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.25rem;">
      <div class="thought-bubble">
        <span class="thought-bubble-emoji">😰</span>
        <span>An agent without tools is just a <em>chatbot with anxiety.</em></span>
      </div>
      <div class="thought-dots"><span></span><span></span><span></span></div>
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
    <div class="callout-teal callout" style="font-size:1.08rem;max-width:none;text-align:center;white-space:nowrap;" v-click="5">
      Don't ship tools — ship intelligence 🧠. → Model + tools + instructions = outcomes customers can't build themselves.
    </div>
  </div>
</div>

---
transition: fade-out
---

<div class="absolute inset-0 flex flex-col slide-compact-layout" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Three Ways* to Build Agents with Foundry</h1>
    <img src="./images/azure.png" class="banner-icon" alt="Azure" />
  </div>
  <div class="slide-body" style="flex-direction:column;align-items:stretch;">
    <div style="display:flex;align-items:center;justify-content:center;gap:1.2rem;margin:10px 0;" v-click>
      <img src="./images/microsoft-foundry-icon.png" alt="Microsoft Foundry" style="width:55px;height:55px;flex-shrink:0;" />
      <div style="background:rgba(0,120,212,0.08);border:2px solid #0078d4;border-radius:24px;padding:0.6rem 1.4rem;font-size:0.95rem;line-height:1.5;color:var(--theme-ink);">
        <strong>With Microsoft Foundry and Microsoft Agent Framework…</strong><br/>
        The ReAct loop (Reason → Act → Observe) can be implemented at different levels — from fully code-owned to fully platform-managed.
      </div>
    </div>
    <div class="agent-pattern-grid">
      <div class="agent-pattern-card pattern-responses" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/overview" target="_blank" class="agent-pattern-label" style="text-decoration:none;">Responses Agent</a>
        <p class="agent-pattern-subtitle">Your App calls Tools and Manages Agent State and uses Foundry Models</p>
        <div class="agent-pattern-diagram" style="gap:0.15rem;">
          <span class="apd-box apd-you" style="border: 2px solid rgba(16,57,84,0.2); padding: 0.3rem 0.35rem; flex-direction: column; gap: 0.1rem;">
            <strong style="font-size: 0.60rem; color: var(--theme-deep);">Your App (Your Infra)</strong>
            <span class="apd-box apd-framework" style="font-size:0.60rem;width:100%;padding:0.15rem;">Agent Framework</span>
            <div style="display:flex;gap:0.15rem;width:100%;">
              <span class="apd-box apd-tools" style="font-size:0.58rem;flex:1;padding:0.15rem;">Your Tools</span>
              <span class="apd-box" style="font-size:0.58rem;flex:1;padding:0.15rem;background:rgba(16,57,84,0.06);border-color:rgba(16,57,84,0.15);color:var(--theme-deep);">State Management</span>
            </div>
          </span>
          <span class="apd-arrow">↕</span>
          <span class="apd-box apd-foundry" style="font-size:0.63rem;padding:0.2rem 0.3rem;">Foundry Models (Chat Completions API)</span>
          <span class="apd-box apd-mcp" style="font-size:0.60rem;padding:0.2rem 0.4rem;width:100%;border:1.5px dashed rgba(120,144,156,0.3);">External Tools / MCP Servers<br/><span style="font-size:0.52rem;color:var(--theme-muted);">(Work IQ · Fabric IQ · Custom)</span></span>
        </div>
        <div class="agent-pattern-traits">
          <ul>
            <li>Full orchestration control — you own the loop, state, and retry logic</li>
            <li>Tool calling by your app — any tool, any protocol, full flexibility</li>
            <li>No built-in governance — you manage identity, auth, and security</li>
            <li>No built-in versioning — you handle deployment and rollback</li>
            <li>Host anywhere — your infra, your cloud, your rules</li>
            <li>Observability, evaluation, and monitoring are your responsibility</li>
          </ul>
        </div>
      </div>
      <div class="agent-pattern-card pattern-hosted" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents" target="_blank" class="agent-pattern-label agent-pattern-label-highlight" style="text-decoration:none;">Hosted Agent (preview)</a>
        <p class="agent-pattern-subtitle">Your App calls Foundry Agent Service • Your App hosted in Agent Service • Tools called by Agent Service</p>
        <div class="agent-pattern-diagram" style="gap:0.15rem;">
          <span class="apd-box apd-config" style="font-size:0.63rem;padding:0.2rem 0.3rem;background:rgba(56,164,220,0.06);border-color:rgba(56,164,220,0.18);color:var(--theme-accent5);">Your App calls Hosted Agent</span>
          <span class="apd-arrow">↕</span>
          <span class="apd-box apd-agentsvc" style="border: 2px solid rgba(56, 164, 220, 0.3); padding: 0.3rem 0.35rem; flex-direction: column; gap: 0.1rem;">
            <strong style="font-size: 0.60rem; color: var(--theme-accent2);">Foundry Agent Service</strong>
            <span class="apd-box apd-you" style="font-size: 0.60rem; width: 100%; padding: 0.2rem 0.3rem;">Hosted Agent (Container)
              <div style="display:flex;flex-direction:column;align-items:center;gap:0.05rem;width:100%;margin-top:0.08rem;border-top:1px solid rgba(16,57,84,0.1);padding-top:0.08rem;">
                <span class="apd-box apd-framework" style="margin:0;font-size:0.55rem;width:100%;padding:0.12rem;">Agent Framework</span>
                <span class="apd-box" style="margin:0;font-size:0.55rem;width:100%;padding:0.12rem;background:rgba(91,95,199,0.06);border-color:rgba(91,95,199,0.15);color:var(--react-reason);">Hosting Adapter</span>
              </div>
            </span>
            <div style="display:flex;gap:0.15rem;width:100%;">
              <span class="apd-box apd-foundry" style="font-size:0.58rem;flex:1;padding:0.15rem;">Foundry Models</span>
              <span class="apd-box apd-tools" style="font-size:0.58rem;flex:1;padding:0.15rem;">Foundry Tools</span>
            </div>
          </span>
          <span class="apd-box apd-mcp" style="font-size:0.60rem;padding:0.2rem 0.4rem;width:100%;border:1.5px dashed rgba(56,164,220,0.3);">External Tools / MCP Servers<br/><span style="font-size:0.52rem;color:var(--theme-muted);">(Work IQ · Fabric IQ · Custom)</span></span>
        </div>
        <div class="agent-pattern-traits">
          <ul>
            <li>Custom orchestration code — your logic runs inside Foundry Agent Service</li>
            <li>Tool calling by Agent Service — Foundry tools + external tools / MCP</li>
            <li>Foundry identity, scaling, and observability built-in</li>
            <li>Publishable with versioned endpoints via Agent ID</li>
            <li>You still manage orchestration code complexity and testing</li>
            <li>Currently in preview — some features still evolving</li>
          </ul>
        </div>
      </div>
      <div class="agent-pattern-card pattern-prompt" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/overview#prompt-agents" target="_blank" class="agent-pattern-label agent-pattern-label-governed" style="text-decoration:none;">Prompt Agent</a>
        <p class="agent-pattern-subtitle">Your App calls Foundry Agent Service • Fully hosted by Foundry • Tools called by Agent Service</p>
        <div class="agent-pattern-diagram" style="gap:0.15rem;">
          <span class="apd-box apd-config" style="font-size:0.63rem;padding:0.2rem 0.3rem;">Your App calls Agent Service (Responses API)</span>
          <span class="apd-arrow">↕</span>
          <span class="apd-box apd-agentsvc" style="border: 2px solid rgba(16,124,16,0.3); padding: 0.3rem 0.35rem; flex-direction: column; gap: 0.1rem;">
            <strong style="font-size: 0.60rem; color: #0a5e0a;">Foundry Agent Service (Fully Managed)</strong>
            <span class="apd-box" style="font-size:0.60rem;width:100%;padding:0.15rem;background:rgba(16,124,16,0.06);border-color:rgba(16,124,16,0.18);color:#0a5e0a;">Instructions + Model + Tools Config</span>
            <div style="display:flex;gap:0.15rem;width:100%;">
              <span class="apd-box apd-foundry" style="font-size:0.58rem;flex:1;padding:0.15rem;">Foundry Models</span>
              <span class="apd-box apd-tools" style="font-size:0.58rem;flex:1;padding:0.15rem;">Foundry Tools</span>
            </div>
          </span>
          <span class="apd-box apd-mcp" style="font-size:0.60rem;padding:0.2rem 0.4rem;width:100%;border:1.5px dashed rgba(16,124,16,0.3);">External Tools / MCP Servers<br/><span style="font-size:0.52rem;color:var(--theme-muted);">(Work IQ · Fabric IQ · Custom)</span></span>
        </div>
        <div class="agent-pattern-traits">
          <ul>
            <li>No orchestration code required — configure via portal or API/SDK</li>
            <li>Tool calling by Foundry Agent Service — but tools can't be assigned at runtime</li>
            <li>Strong governance and security provided by Agent ID</li>
            <li>Built-in versioning support</li>
            <li>Good fit for M365 Copilot &amp; Copilot Studio integration</li>
            <li>Limited orchestration control — no custom logic</li>
          </ul>
        </div>
      </div>
    </div>
    <p style="margin:0;text-align:right;font-size:0.62rem;color:var(--theme-muted);position:absolute;bottom:0.5rem;right:1rem;">
      * There is a 4th way: <a href="https://learn.microsoft.com/azure/foundry/agents/concepts/workflow" target="_blank">Workflow Agent (preview)</a>, but we aren't covering those in this session.
    </p>
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
  <div class="slide-body" style="flex-direction:column;gap:0.4rem;align-items:stretch;">
    <div class="iq-grid iq-grid-five">
      <div class="iq-pillar iq-work" v-click>
        <a href="https://learn.microsoft.com/microsoft-agent-365/tooling-servers-overview" target="_blank" class="iq-header-pill iq-header-work"><span class="iq-header-icon"><img src="./images/microsoft-work-iq.avif" alt="Work IQ" /></span><span class="iq-header-copy"><span class="iq-header-title">Work IQ</span><span class="iq-header-subtitle">Org context</span></span></a>
        <p class="iq-card-summary">Organizational knowledge and information from Microsoft 365, including email, Teams, calendars, and docs that show who is doing what right now.</p>
      </div>
      <div class="iq-pillar iq-fabric" v-click>
        <a href="https://learn.microsoft.com/fabric/iq/overview" target="_blank" class="iq-header-pill iq-header-fabric"><span class="iq-header-icon"><img src="./images/fabric_48_color.svg" alt="Fabric IQ" /></span><span class="iq-header-copy"><span class="iq-header-title">Fabric IQ</span><span class="iq-header-subtitle">Business data</span></span></a>
        <p class="iq-card-summary">Organizational business data, ontology, and business rules with semantic context, such as schedules, resources, constraints, and policy logic the agent can reason over.</p>
      </div>
      <div class="iq-pillar iq-foundry" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-foundry-iq" target="_blank" class="iq-header-pill iq-header-foundry"><span class="iq-header-icon"><img src="./images/microsoft-foundry-icon.png" alt="Foundry IQ" /></span><span class="iq-header-copy"><span class="iq-header-title">Foundry IQ</span><span class="iq-header-subtitle">Enterprise knowledge</span></span></a>
        <p class="iq-card-summary">Enterprise knowledge and grounding across internal sources, including SOPs and policies needed for governed decisions.</p>
      </div>
      <div class="iq-pillar iq-tool-foundry-card" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/concepts/tool-catalog" target="_blank" class="iq-header-pill iq-header-foundry"><span class="iq-header-icon"><img src="./images/microsoft-foundry-icon.png" alt="Foundry Tools" /></span><span class="iq-header-copy"><span class="iq-header-title">Foundry Tools</span><span class="iq-header-subtitle">Built-in</span></span></a>
        <p class="iq-card-summary">Native agent capabilities like search, code execution, and action connectors for safe, managed tool use.</p>
      </div>
      <div class="iq-pillar iq-tool-mcp-card" v-click>
        <a href="https://learn.microsoft.com/azure/foundry/agents/how-to/tools/model-context-protocol" target="_blank" class="iq-header-pill iq-header-mcp"><span class="iq-header-icon">🔌</span><span class="iq-header-copy"><span class="iq-header-title">MCP Tools</span><span class="iq-header-subtitle">Connect anything</span></span></a>
        <p class="iq-card-summary">External integrations via MCP servers to bring in custom APIs, databases, legacy systems, and workflow endpoints.</p>
      </div>
    </div>
    <div class="panel" style="padding:0.25rem 0.8rem;" v-click="6">
      <span class="iq-header-pill iq-header-diagram" style="margin-bottom:0.1rem;font-size:0.97rem;">Our example: Gate 35 airbridge failure — agent calls IQ tools, MCP tools and Foundry Tools via agentic loop</span>
      <div style="display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:0.3rem;">
        <div style="display:flex;align-items:center;justify-content:center;">
          <IQReActLoopDiagram />
        </div>
        <div style="margin:0;color:var(--theme-ink);font-size:1.04rem;line-height:1.25;flex:1;display:flex;flex-direction:column;justify-content:center;gap:0.12rem;" v-click="7">
          <div class="thought-step thought-problem">
            <span>⚠️ Problem: Gate 35 airbridge has failed. 4 hour repair time expected. Implement remediation plan.</span>
          </div>
          <div class="thought-step thought-reason">
            <span>💭 <strong>Reason:</strong> I need to come up with a plan to remediate the gate disruption. I need to understand what assets are affected by a gate disruption.</span>
          </div>
          <div class="thought-step thought-action">
            <span>🛠️ <strong>Action:</strong> Call <strong>Fabric IQ</strong> to understand operations impact for Gates.</span>
          </div>
          <div class="thought-step thought-observe">
            <span>👀 <strong>Observe:</strong> Gates affect flights, passengers, crew, ground staff and baggage.</span>
          </div>
          <div class="thought-ellipsis-only" aria-hidden="true">
            <span>⋮</span>
          </div>
          <div class="thought-step thought-reason">
            <span>💭 <strong>Reason:</strong> SQ308 is urgent; I need duty windows, SOP constraints, and repair ETA.</span>
          </div>
          <div class="thought-step thought-action">
            <span>🛠️ <strong>Action:</strong> Query <strong>Work IQ</strong> for crew shifts and <strong>Foundry IQ</strong> for disruption SOP guidance.</span>
          </div>
          <div class="thought-step thought-observe">
            <span>👀 <strong>Observe:</strong> Crew coverage confirmed and SOP supports reassignment within target time.</span>
          </div>
          <div class="thought-step thought-complete">
            <span>✅ Remediation plan implemented.</span>
          </div>
        </div>
      </div>
    </div>
    <div class="callout-teal callout" style="font-size:0.68rem;max-width:none;padding:0.2rem 0.6rem;" v-click="6">
      The moat is governed, business-aware reasoning across IQ layers and MCP tools. Because the agent touches people data and operations systems, security is non-negotiable.
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
  <div class="slide-body" style="flex-direction:column;gap:0.45rem;align-items:stretch;">
    <div class="three-col-grid">
      <div class="section-card" v-click="1">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-1">1 · Design tools for calling</span>
        <ul class="dense-list">
          <li>Design for when and why, not just how</li>
          <li>Consolidate tiny wrappers into semantic tools</li>
          <li>Treat descriptions and schema like API contracts</li>
        </ul>
      </div>
      <div class="section-card" v-click="1">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-2">2 · Instruct agents like operators</span>
        <ul class="dense-list">
          <li>Write operating rules, not vague aspirations</li>
          <li>Define escalation and pre-check conditions</li>
          <li>Govern when the agent must not act alone</li>
        </ul>
      </div>
      <div class="section-card" v-click="1">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-3">3 · Evaluate and monitor</span>
        <ul class="dense-list">
          <li>Pre-production datasets and synthetic scenarios</li>
          <li>Post-production monitoring for drift</li>
          <li>Scheduled red teaming for security and safety</li>
        </ul>
      </div>
    </div>
    <div class="comparison-grid" style="gap:0.45rem;align-items:stretch;">
      <div class="comparison-col before" style="padding:0.7rem 0.8rem;" v-click="2">
        <span class="iq-header-pill iq-header-bad slide6-header slide6-header-4">Bad tool contract</span>
        <div class="panel" style="padding:0.45rem 0.6rem;">
          <p style="margin:0 0 0.25rem;font-family:monospace;font-size:0.8rem;color:var(--theme-deep);">get_gate_status</p>
          <ul class="dense-list" style="margin:0;">
            <li>Returns data, but agent can't act on it</li>
            <li>Supervisor still plans the response manually</li>
            <li>Weak semantic signal for the model</li>
          </ul>
        </div>
      </div>
      <div class="comparison-col after" style="padding:0.7rem 0.8rem;" v-click="2">
        <span class="iq-header-pill iq-header-good slide6-header slide6-header-5">Good tool contract</span>
        <div class="panel" style="padding:0.45rem 0.6rem;">
          <p style="margin:0 0 0.25rem;font-family:monospace;font-size:0.8rem;color:var(--theme-deep);">create_gate_disruption_remediation_plan</p>
          <ul class="dense-list" style="margin:0;">
            <li>Description explains when to invoke it</li>
            <li>Parameters: gate, failure type, time horizon</li>
            <li>Agent reasons about full operational response</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="highlight-strip" style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:0.45rem;">
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click="3">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-6"><span class="hl-icon">📘</span> Instruction example</span>
        <span class="hl-desc">When a gate disruption affects ≥ 2 connecting flights within a 3-hour window, call <code>create_gate_disruption_remediation_plan</code> with gate ID, affected flights, and time horizon. Route the plan to the Flight Ops Approval Agent. Do not execute reassignments until approved.</span>
      </div>
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click="3">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-7"><span class="hl-icon">🧪</span> Foundry agent evaluators</span>
        <span class="hl-desc"><strong>System:</strong> <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#task-completion" target="_blank">Task Completion</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#task-adherence" target="_blank">Task Adherence</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#task-navigation-efficiency" target="_blank">Navigation Efficiency</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#intent-resolution" target="_blank">Intent Resolution</a><br /><strong>Process:</strong> <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#tool-call-accuracy" target="_blank">Tool Call Accuracy</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#tool-selection" target="_blank">Tool Selection</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#tool-input-accuracy" target="_blank">Tool Input Accuracy</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#tool-output-utilization" target="_blank">Tool Output Utilization</a>, <a href="https://learn.microsoft.com/azure/ai-foundry/concepts/evaluation-evaluators/agent-evaluators#tool-call-success" target="_blank">Tool Call Success</a></span>
      </div>
      <div class="highlight-pill slide-in-row" style="align-items:flex-start;" v-click="3">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-8"><span class="hl-icon">🔗</span> References</span>
        <ul class="dense-list hl-desc" style="margin:0;padding-left:1.1rem;">
          <li><a href="https://aka.ms/e2e-agent-eval-sample" target="_blank">aka.ms/e2e-agent-eval-sample</a></li>
          <li><a href="https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/agent-evaluators" target="_blank">learn.microsoft.com/.../agent-evaluators</a></li>
          <li><a href="https://gorilla.cs.berkeley.edu/leaderboard.html" target="_blank">BFCL-v4 Leaderboard</a> — Tool Use to Agentic Evaluation</li>
        </ul>
      </div>
    </div>
    <div class="panel ralph-loop-panel" v-click="4">
      <div class="ralph-loop-copy">
        <span class="iq-header-pill iq-header-diagram slide6-header slide6-header-9">Ralph Loop: Iterative Tool Contract Refinement</span>
        <div class="ralph-step-flow">
          <div class="ralph-step-box"><strong><span class="ralph-step-icon">📖</span> Read</strong><span class="ralph-step-desc">Load current tool contract</span></div>
          <span class="ralph-step-arrow">→</span>
          <div class="ralph-step-box"><strong><span class="ralph-step-icon">🧪</span> Test</strong><span class="ralph-step-desc">Run agent against prompt suite</span></div>
          <span class="ralph-step-arrow">→</span>
          <div class="ralph-step-box"><strong><span class="ralph-step-icon">📊</span> Evaluate</strong><span class="ralph-step-desc">Score tool-call compliance</span></div>
          <span class="ralph-step-arrow">→</span>
          <div class="ralph-step-box"><strong><span class="ralph-step-icon">🔍</span> Diagnose</strong><span class="ralph-step-desc">Identify why calls missed or misfired</span></div>
          <span class="ralph-step-arrow">→</span>
          <div class="ralph-step-box"><strong><span class="ralph-step-icon">🔧</span> Refine</strong><span class="ralph-step-desc">Update contract &amp; repeat</span></div>
        </div>
      </div>
      <div class="ralph-loop-image-shell">
        <img src="./images/ralph.jpg" alt="Ralph Loop iterative refinement illustration" class="ralph-loop-image" />
      </div>
    </div>
    <div class="model-warning-callout" v-click="5">
      <span class="model-warning-icon">⚠️</span>
      <span class="model-warning-text"><strong>Different models, versions, and prompts produce different tool-call behavior</strong> — re-evaluate after every change.</span>
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
