---
theme: default
title: "From Chat to Agents: The Agentic Loop & Microsoft IQ"
info: |
  ## From Chat to Agents: The Agentic Loop & Microsoft IQ
  A 20-minute session by Daniel Scott-Raynsford on the fundamental shift from
  ChatCompletions to the ReAct loop, why tools are critical for enterprise agents,
  and how Work IQ, Fabric IQ, and Foundry IQ provide the intelligence layer.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 1 — TITLE HERO                                ~30 sec
     ═══════════════════════════════════════════════════════════ -->

<div class="hero-shell">
  <p class="eyebrow">ReAct Loop · Foundry Agent Service v2 · Work IQ · Fabric IQ · Foundry IQ</p>
  <h1 class="hero-heading">From Chat<br/>to Agents</h1>
  <p class="hero-sub">
    The fundamental shift from stateless <strong>ChatCompletions</strong> to the autonomous
    <strong>ReAct Loop</strong> — and why <strong>three IQ intelligence layers</strong> make agents enterprise-ready.
  </p>
  <div class="hero-meta">
    <span>Daniel Scott-Raynsford (DSR)</span>
    <span>Sr. Partner Solution Architect · Cloud &amp; AI Apps · Microsoft EPS</span>
    <span>20 minutes · visual &amp; interactive</span>
  </div>
  <div class="hero-badge-grid">
    <div class="badge-card">
      <strong>🔄 ReAct Loop</strong>
      <span>Reason → Action → Observe</span>
    </div>
    <div class="badge-card">
      <strong>🛠️ Tools are everything</strong>
      <span>MCP, functions, knowledge</span>
    </div>
    <div class="badge-card">
      <strong>🧠 Three IQ layers</strong>
      <span>Work · Fabric · Foundry</span>
    </div>
    <div class="badge-card">
      <strong>🏗️ Foundry Agent v2</strong>
      <span>Enterprise runtime at scale</span>
    </div>
  </div>
</div>

<!--
In 20 minutes we'll cover the biggest architectural shift in AI:
from single-turn request/response to the autonomous agentic loop.
Most organisations haven't understood just how fundamentally different
this is. By the end you'll know WHY tools and the IQ layers are the
foundation of every enterprise agent.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 2 — THE PROBLEM: STUCK AT REQUEST/RESPONSE    ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>The Problem: AI Stopped at Request/Response</h1>
  </div>
  <div style="flex:1;display:flex;align-items:center;padding:1rem 2rem;">
    <div class="comparison-grid" style="width:100%">
      <div class="comparison-col before">
        <span class="comparison-label before">TODAY — CHATCOMPLETIONS</span>
        <h3>Single-Turn, Stateless</h3>
        <div class="flow-pipeline" style="justify-content:center;margin:0.6rem 0;">
          <span class="flow-step">👤 User</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">prompt</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">🤖 LLM API</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">response</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">👤 User</span>
        </div>
        <ul class="dense-list">
          <li>One question → one answer → done</li>
          <li>No memory between calls</li>
          <li>No tools — can't look things up</li>
          <li>Can't take actions in the real world</li>
          <li>Hallucination is the only option for unknown facts</li>
        </ul>
      </div>
      <v-click>
      <div class="comparison-col after">
        <span class="comparison-label after">WHAT ENTERPRISES NEED</span>
        <h3>Multi-Step, Tool-Augmented, Autonomous</h3>
        <div class="flow-pipeline" style="justify-content:center;margin:0.6rem 0;">
          <span class="flow-step">👤 User</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step flow-step-active">🤖 Agent</span>
          <span class="flow-arrow">⇄</span>
          <span class="flow-step">🔧 Tool 1</span>
          <span class="flow-step">📊 Tool 2</span>
          <span class="flow-step">📢 Tool 3</span>
          <span class="flow-arrow">→</span>
          <span class="flow-step">✅ Result</span>
        </div>
        <ul class="dense-list">
          <li>Complex task → iterative reasoning</li>
          <li>Tools for real data and real actions</li>
          <li>Memory and context across steps</li>
          <li>Grounded in enterprise knowledge</li>
          <li>Autonomous multi-step execution</li>
        </ul>
      </div>
      </v-click>
    </div>
  </div>
</div>

<!--
Most organisations I work with are still in the left column. They've
built a chatbot that calls the ChatCompletions API, gets an answer,
and shows it. That's 2023 architecture. The right column is where we
need to be — and the bridge is the ReAct loop.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 3 — THE REACT LOOP (INTERACTIVE)              ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>The ReAct Loop: Reason → Action → Observe</h1>
    <div style="position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);display:flex;gap:0.5rem;">
      <span class="react-phase reason">REASON</span>
      <span class="react-phase action">ACTION</span>
      <span class="react-phase observe">OBSERVE</span>
    </div>
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.5rem 1rem;">
    <ReActLoopAnimation />
  </div>
</div>

<!--
This is the heart of the session. Click through the animation to show
how the agent REASONS about what it needs, takes an ACTION by calling
a tool, then OBSERVES the result and uses it to reason about the next
step. This isn't a predefined workflow — the agent decides what to do
next based on what it learns. Show all 9 steps. The airport scenario
makes it tangible: flight schedules, maintenance logs, operations.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 4 — WHY TOOLS ARE EVERYTHING                  ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Why Tools Are Everything</h1>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1rem 2rem;gap:1rem;">
    <div class="callout" style="font-size:1.4rem;text-align:center;max-width:42rem;padding:1rem 1.5rem;">
      💡 <strong>An agent without tools is just a chatbot with anxiety.</strong>
    </div>
    <v-click>
    <div class="comparison-grid" style="max-width:56rem;width:100%;">
      <div class="comparison-col before" style="text-align:center;">
        <span class="comparison-label before">WITHOUT TOOLS</span>
        <div style="font-size:3.5rem;margin:0.5rem 0;">🧠</div>
        <ul class="dense-list" style="text-align:left;">
          <li>Makes things up when it doesn't know</li>
          <li>Can't verify its own answers</li>
          <li>Can't take action in real systems</li>
          <li>Limited to training data knowledge</li>
        </ul>
      </div>
      <div class="comparison-col after" style="text-align:center;">
        <span class="comparison-label after">WITH TOOLS</span>
        <div style="font-size:3.5rem;margin:0.5rem 0;">🧠🛠️</div>
        <ul class="dense-list" style="text-align:left;">
          <li>Retrieves real data from enterprise systems</li>
          <li>Validates answers against ground truth</li>
          <li>Executes actions (notify, update, create)</li>
          <li>Grounded in current, authoritative knowledge</li>
        </ul>
      </div>
    </div>
    </v-click>
    <v-click>
    <div class="callout-teal callout" style="max-width:56rem;font-size:0.9rem;">
      Tools are to agents what <strong>APIs</strong> are to applications — without them, the agent has no way to interact with the real world.
    </div>
    </v-click>
  </div>
</div>

<!--
This is the key mental model shift: tools aren't an add-on. They're
the entire point. The ACTION step in the ReAct loop is meaningless
without real tool integrations. MCP standardises how agents discover
and call tools — we'll see that in Foundry Agent Service shortly.
-->

---
transition: slide-left
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 5 — THE THREE IQ LAYERS                       ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>The Three IQ Layers: Enterprise Intelligence</h1>
  </div>
  <div style="flex:1;display:flex;flex-direction:column;justify-content:center;padding:0.8rem 2rem;gap:0.8rem;">
    <p style="text-align:center;color:var(--theme-muted);font-size:1rem;margin:0;">
      Agents need <strong>knowledge</strong> to act reliably. These three intelligence layers are the foundation.
    </p>
    <div class="iq-grid">
      <v-click>
      <div class="iq-pillar iq-work">
        <div class="iq-icon">🏢</div>
        <h3>Work IQ</h3>
        <p><strong>Organizational context</strong> from Microsoft 365</p>
        <ul class="dense-list" style="font-size:0.78rem;">
          <li>Emails, meetings, chats, documents</li>
          <li>Relationship maps and work patterns</li>
          <li>APIs for custom agent access</li>
          <li>Always in sync with real work</li>
        </ul>
      </div>
      </v-click>
      <v-click>
      <div class="iq-pillar iq-fabric">
        <div class="iq-icon">📊</div>
        <h3>Fabric IQ</h3>
        <p><strong>Business data intelligence</strong> from Microsoft Fabric</p>
        <ul class="dense-list" style="font-size:0.78rem;">
          <li>Business ontology and semantic models</li>
          <li>Native graph engine for multi-hop reasoning</li>
          <li>Data Agents for structured AI answers</li>
          <li>Operations Agents for real-time action</li>
        </ul>
      </div>
      </v-click>
      <v-click>
      <div class="iq-pillar iq-foundry">
        <div class="iq-icon">🧠</div>
        <h3>Foundry IQ</h3>
        <p><strong>Enterprise knowledge integration</strong> across all sources</p>
        <ul class="dense-list" style="font-size:0.78rem;">
          <li>Cross-source knowledge retrieval</li>
          <li>Grounding agents in authoritative facts</li>
          <li>Anti-hallucination by design</li>
          <li>Spans M365, Fabric, Azure, web, custom apps</li>
        </ul>
      </div>
      </v-click>
    </div>
    <v-click>
    <div class="callout" style="text-align:center;font-size:0.9rem;">
      These aren't products — they're <strong>intelligence layers</strong>. Without them, your agent is operating blind in the enterprise.
    </div>
    </v-click>
  </div>
</div>

<!--
Walk through each pillar with a click. Work IQ = the people and process
context. Fabric IQ = the data and business logic. Foundry IQ = the
unified knowledge retrieval across everything. Together they give agents
the enterprise knowledge they need to act reliably. Stress that these
are layers, not products. They work together.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 6 — IQ IN ACTION: AIRPORT SCENARIO            ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>IQ in Action: Airport Operations</h1>
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.5rem 2rem;">
    <div style="width:100%;max-width:60rem;">
      <div class="callout" style="text-align:center;font-size:1rem;margin-bottom:0.8rem;">
        🎯 Task: Assess runway 27L maintenance status and impact on flight schedule
      </div>
      <div class="iq-grid">
        <div class="iq-pillar iq-work">
          <div class="iq-icon">🏢</div>
          <h3>Work IQ</h3>
          <p style="font-size:0.75rem;color:var(--theme-muted);">Ops team schedules, recent comms on runway closures, stakeholder contacts</p>
        </div>
        <div class="iq-pillar iq-fabric">
          <div class="iq-icon">📊</div>
          <h3>Fabric IQ</h3>
          <p style="font-size:0.75rem;color:var(--theme-muted);">Flight operations data, maintenance schedules, weather impact models</p>
        </div>
        <div class="iq-pillar iq-foundry">
          <div class="iq-icon">🧠</div>
          <h3>Foundry IQ</h3>
          <p style="font-size:0.75rem;color:var(--theme-muted);">Standard operating procedures, regulatory compliance docs, incident history</p>
        </div>
      </div>
      <div style="text-align:center;margin:0.6rem 0;">
        <div class="flow-pipeline" style="justify-content:center;">
          <span class="flow-step">🏢 Work IQ</span>
          <span class="flow-arrow">+</span>
          <span class="flow-step">📊 Fabric IQ</span>
          <span class="flow-arrow">+</span>
          <span class="flow-step">🧠 Foundry IQ</span>
          <span class="flow-arrow">=</span>
          <span class="flow-step flow-step-active">🤖 Agent Reasoning</span>
          <span class="flow-arrow">=</span>
          <span class="flow-step" style="background:var(--iq-foundry);color:white;border-color:var(--iq-foundry);">✅ Redirect to 09R</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This brings together the previous two slides. The airport agent draws
from ALL three IQ layers simultaneously: Work IQ for people context,
Fabric IQ for operational data, Foundry IQ for SOPs and compliance.
This is what enterprise-grade agentic AI looks like — not a single
tool call, but an orchestrated set of knowledge retrievals grounded
in authoritative sources.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 7 — FOUNDRY AGENT SERVICE V2                  ~2.5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Foundry Agent Service v2: The Runtime</h1>
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:0.5rem 2rem;">
    <div style="width:100%;max-width:60rem;">
      <div style="display:flex;gap:0.8rem;margin-bottom:0.6rem;">
        <div class="panel" style="flex:2;text-align:center;">
          <p class="kicker" style="color:var(--theme-accent2);">FOUNDRY AGENT SERVICE V2</p>
          <div class="flow-pipeline" style="justify-content:center;margin:0.4rem 0;">
            <span class="react-phase react-phase-lg reason">💭 Reason</span>
            <span class="flow-arrow">→</span>
            <span class="react-phase react-phase-lg action">⚡ Action</span>
            <span class="flow-arrow">→</span>
            <span class="react-phase react-phase-lg observe">👁️ Observe</span>
            <span class="flow-arrow">↩</span>
          </div>
          <p style="font-size:0.78rem;color:var(--theme-muted);margin:0.3rem 0 0;">Built-in ReAct Loop Engine — you define tools and guardrails</p>
        </div>
      </div>
      <div class="iq-grid" style="margin-bottom:0.6rem;">
        <div class="section-card">
          <p class="section-number">TOOLS VIA MCP</p>
          <div class="tool-grid" style="grid-template-columns:1fr 1fr;">
            <div class="tool-card"><span class="tool-icon">🔧</span><span class="tool-name">Custom APIs</span></div>
            <div class="tool-card"><span class="tool-icon">📊</span><span class="tool-name">Data queries</span></div>
            <div class="tool-card"><span class="tool-icon">📧</span><span class="tool-name">Notifications</span></div>
            <div class="tool-card"><span class="tool-icon">🌐</span><span class="tool-name">Web search</span></div>
          </div>
        </div>
        <div class="section-card">
          <p class="section-number">AGENT-TO-AGENT (A2A)</p>
          <div class="tool-grid" style="grid-template-columns:1fr;">
            <div class="tool-card"><span class="tool-icon">🤖</span><span class="tool-name">Specialist Agent 1</span></div>
            <div class="tool-card"><span class="tool-icon">🤖</span><span class="tool-name">Specialist Agent 2</span></div>
          </div>
        </div>
        <div class="section-card">
          <p class="section-number">ENTERPRISE GOVERNANCE</p>
          <div class="tool-grid" style="grid-template-columns:1fr;">
            <div class="tool-card"><span class="tool-icon">🔐</span><span class="tool-name">Identity &amp; RBAC</span></div>
            <div class="tool-card"><span class="tool-icon">📋</span><span class="tool-name">Audit &amp; tracing</span></div>
            <div class="tool-card"><span class="tool-icon">👤</span><span class="tool-name">Human-in-the-loop</span></div>
          </div>
        </div>
      </div>
      <div class="highlight-strip">
        <div class="highlight-pill">
          <span class="hl-icon">🔄</span>
          <span class="hl-label">Built-in ReAct</span>
          <span class="hl-desc">You don't build the loop</span>
        </div>
        <div class="highlight-pill">
          <span class="hl-icon">🔌</span>
          <span class="hl-label">MCP + A2A</span>
          <span class="hl-desc">Standard tool protocols</span>
        </div>
        <div class="highlight-pill">
          <span class="hl-icon">🧩</span>
          <span class="hl-label">Multi-model</span>
          <span class="hl-desc">GPT-4o, Claude, Llama, etc.</span>
        </div>
        <div class="highlight-pill">
          <span class="hl-icon">🏢</span>
          <span class="hl-label">Enterprise-grade</span>
          <span class="hl-desc">Identity, audit, compliance</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Key message: You don't build the ReAct loop — the platform runs it.
Foundry Agent Service v2 handles orchestration. You define the tools
(via MCP), the knowledge sources (via IQ layers), and the guardrails
(via governance). MCP is the Model Context Protocol — think of it as
USB-C for AI tools. A2A is Agent-to-Agent protocol for when agents
need to collaborate. Multi-model means you're not locked in.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 8 — ENSURING AGENTS CALL THE RIGHT TOOLS      ~2.5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Ensuring Agents Call the Right Tools</h1>
  </div>
  <div style="flex:1;display:flex;align-items:center;padding:0.8rem 2rem;">
    <div class="two-col-grid" style="width:100%;">
      <div>
        <v-clicks>
        <div class="takeaway-item" style="margin-bottom:0.4rem;">
          <span class="takeaway-num">1</span>
          <span class="takeaway-text"><strong>Clear descriptions</strong> — The agent selects tools based on natural language. Precision in your tool description = precision in selection.</span>
        </div>
        <div class="takeaway-item" style="margin-bottom:0.4rem;">
          <span class="takeaway-num">2</span>
          <span class="takeaway-text"><strong>Schema validation</strong> — Define input/output schemas so the agent knows exactly what each tool expects and returns.</span>
        </div>
        <div class="takeaway-item" style="margin-bottom:0.4rem;">
          <span class="takeaway-num">3</span>
          <span class="takeaway-text"><strong>Intelligent tools, not tool sprawl</strong> — 1,000 tiny tools (GetCustomer, GetInvoices, GetBalance…) kills selection accuracy. Build intelligent tools: <em>"What is my outstanding invoice value for Customer X?"</em></span>
        </div>
        <div class="takeaway-item" style="margin-bottom:0.4rem;">
          <span class="takeaway-num">4</span>
          <span class="takeaway-text"><strong>Fallback strategies</strong> — Circuit breakers, health checks, retry logic. Tools fail — plan for it.</span>
        </div>
        <div class="takeaway-item" style="margin-bottom:0.4rem;">
          <span class="takeaway-num">5</span>
          <span class="takeaway-text"><strong>Evaluate continuously</strong> — Test tool selection accuracy as part of your CI/CD. Treat it like API testing.</span>
        </div>
        </v-clicks>
      </div>
      <div>
        <div class="callout" style="font-size:0.82rem;margin-bottom:0.6rem;">
          💡 Treat tool definitions like <strong>API contracts</strong> — they're the interface between the agent and the real world.
        </div>
        <div class="callout-teal callout" style="font-size:0.78rem;margin-bottom:0.6rem;">
          ⚠️ <strong>Tool sprawl is real.</strong> Don't wrap every REST endpoint as a tool. Instead of <code>GetCustomer</code> + <code>GetInvoices</code> + <code>GetBalance</code>, build one intelligent tool: <em>"What is my outstanding invoice value for Customer X?"</em>
        </div>
        <div style="font-size:0.7rem;color:var(--theme-muted);margin-bottom:0.3rem;font-weight:600;">MCP TOOL REGISTRATION EXAMPLE</div>
        <div style="background:#1e1e1e;color:#d4d4d4;padding:0.8rem 1rem;border-radius:6px;font-size:0.72rem;font-family:monospace;line-height:1.5;margin:0;overflow:hidden;white-space:pre;">&#123;
  "name": "get_flight_schedule",
  "description": "Retrieves the current flight
    schedule for a specific runway",
  "parameters": &#123;
    "type": "object",
    "properties": &#123;
      "runway": &#123;
        "type": "string",
        "description": "Runway identifier (e.g. 27L)"
      &#125;
    &#125;,
    "required": ["runway"]
  &#125;
&#125;</div>
        <div class="callout-teal callout" style="font-size:0.78rem;margin-top:0.5rem;">
          The <code>description</code> field is the single most important factor in tool selection accuracy.
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the practical slide. Tool reliability is an engineering
discipline, not a prompt trick. Walk through each principle with a
click. Emphasise tool sprawl — the anti-pattern of wrapping every
REST endpoint as a separate tool. Instead, build intelligent tools
that accept natural language and handle orchestration internally.
Example: instead of GetCustomer + GetInvoices + GetBalance (3 tool
calls the agent must chain), build one tool that answers "What is my
outstanding invoice value for Customer X?" directly. The code example
shows MCP tool registration — the description field is how the model
decides which tool to call. Bad description = wrong tool selected.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 9 — KEY TAKEAWAYS                             ~1.5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col">
  <div class="slide-banner">
    <h1>Key Takeaways for Your Architecture</h1>
  </div>
  <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:1rem 2.5rem;">
    <div class="takeaway-grid" style="max-width:54rem;width:100%;">
      <v-clicks>
      <div class="takeaway-item">
        <span class="takeaway-num">1</span>
        <span class="takeaway-text"><strong>The loop changes everything</strong> — Single-turn ChatCompletions ≠ Agentic AI. The ReAct loop is the new runtime model.</span>
      </div>
      <div class="takeaway-item">
        <span class="takeaway-num">2</span>
        <span class="takeaway-text"><strong>Tools are the interface</strong> — MCP standardises how agents access enterprise capabilities. No tools = no autonomy.</span>
      </div>
      <div class="takeaway-item">
        <span class="takeaway-num">3</span>
        <span class="takeaway-text"><strong>IQ layers are non-negotiable</strong> — Work IQ + Fabric IQ + Foundry IQ = enterprise-ready agents grounded in real knowledge.</span>
      </div>
      <div class="takeaway-item">
        <span class="takeaway-num">4</span>
        <span class="takeaway-text"><strong>The platform runs the loop</strong> — Foundry Agent Service v2 handles orchestration. You handle domain, tools, and guardrails.</span>
      </div>
      <div class="takeaway-item">
        <span class="takeaway-num">5</span>
        <span class="takeaway-text"><strong>Evaluate tool reliability</strong> — Treat tool selection and execution as a first-class engineering concern, not an afterthought.</span>
      </div>
      </v-clicks>
    </div>
  </div>
</div>

<!--
Five things to take back to your teams:
1. The architecture has fundamentally changed — stop building chatbots.
2. Tools are the core capability — invest in MCP.
3. The IQ layers are Microsoft's answer to enterprise grounding.
4. Foundry Agent Service v2 handles the hard parts.
5. Test your tool selection like you test your code.
-->

---
layout: center
class: text-center
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 10 — THANK YOU / Q&amp;A                      ~30 sec
     ═══════════════════════════════════════════════════════════ -->

<div style="display:flex;flex-direction:column;align-items:center;gap:1.2rem;">
  <h1>Thank You</h1>
  <p style="font-size:1.2rem;color:var(--theme-muted);max-width:32rem;">
    These slides and the interactive ReAct demo are open source.
  </p>
  <div class="highlight-strip" style="max-width:38rem;">
    <div class="highlight-pill">
      <span class="hl-icon">🐙</span>
      <span class="hl-label">GitHub</span>
      <span class="hl-desc">PlagueHO</span>
    </div>
    <div class="highlight-pill">
      <span class="hl-icon">📧</span>
      <span class="hl-label">Email</span>
      <span class="hl-desc">dascottr@microsoft.com</span>
    </div>
    <div class="highlight-pill">
      <span class="hl-icon">📂</span>
      <span class="hl-label">Slides</span>
      <span class="hl-desc">github.com/PlagueHO/plagueho.learn</span>
    </div>
  </div>
  <div style="margin-top:0.5rem;">
    <a href="https://github.com/PlagueHO" target="_blank">GitHub</a> ·
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank">Slides Source</a> ·
    <a href="https://learn.microsoft.com/azure/foundry/agents/" target="_blank">Foundry Agent Docs</a>
  </div>
</div>

<!--
Thank the audience. Point them to the repo for slides and the ReAct
animation component. Open for Q&A — this is part of the broader
15-minute discussion slot that follows.
-->
