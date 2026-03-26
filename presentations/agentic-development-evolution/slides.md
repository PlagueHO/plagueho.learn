---
theme: default
title: "Agentic Development Evolution: A View of the Last 6 Months"
info: |
  ## Agentic Development Evolution
  A 40-minute session by Daniel Scott-Raynsford on how GitHub Copilot,
  skills, agentic workflows, subagents, squads, and prototype-first workflows changed
  the Agentic engineering operating model.
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 1 — TITLE HERO                                ~1 min
     ═══════════════════════════════════════════════════════════ -->

<div class="hero-shell">
  <div class="hero-qr-block">
    <img src="./images/presentation-qr-code.png" class="hero-qr" alt="Presentation QR code" />
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" class="hero-qr-url">github.com/PlagueHO/plagueho.learn</a>
  </div>
  <p class="eyebrow">GitHub Copilot · Skills · SpecKit · Squads · Hypervelocity Engineering</p>
  <h1 class="hero-heading">Agentic<br>Development<br>Evolution</h1>
  <p class="hero-sub">
    A view of the last 6 months — how the workflow shifted from prompts and
    chat assistance to <strong>governed skills</strong>, <strong>agent team coordination</strong>, and <strong>spec-driven determinism</strong>.
  </p>

  <div class="hero-meta">
    <span>Daniel Scott-Raynsford (DSR)</span>
    <span>Sr. Partner Solution Architect · Cloud & AI Apps · Microsoft EPS</span>
    <span>40 minutes · demo-heavy</span>
  </div>

  <div class="hero-badge-grid">
    <div class="badge-card">
      <strong>🛠️ Skills over prompts</strong>
      <span>Reusable, governed, portable behavior</span>
    </div>
    <div class="badge-card">
      <strong>🧠 Memory compounds</strong>
      <span>Teams get smarter every session</span>
    </div>
    <div class="badge-card">
      <strong>📐 Determinism beats vibe</strong>
      <span>Specs, guardrails, and observability</span>
    </div>
    <div class="badge-card">
      <strong>🤖 Scale the work out</strong>
      <span>Subagents → Squads → Fleets</span>
    </div>
  </div>
</div>

<!--
Open with the thesis: the biggest change in the last 6 months is NOT better
autocomplete. It's the move from isolated assistance to a governed operating
model. Slides are signposts — demos carry the proof.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 2 — ABOUT ME                                  ~1 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>About Me</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div style="flex:1;display:flex;align-items:stretch;padding:0.65rem 1.35rem 0.75rem;min-height:0;">
    <div class="vscode-window">
      <div class="vscode-titlebar">
        <div class="vscode-dots">
          <span class="dot dot-red"></span>
          <span class="dot dot-yellow"></span>
          <span class="dot dot-green"></span>
        </div>
        <span class="vscode-wintitle">daniel-scott-raynsford — Visual Studio Code Insiders</span>
      </div>
      <div class="vscode-tabbar">
        <div class="vscode-tab vscode-tab-json"><span>📄</span> about.json</div>
        <div style="flex:1;background:#252526;"></div>
      </div>
      <div class="vscode-editor-area">
        <div class="vscode-editor-pane">
          <div class="vscode-line-nums">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8<br>9<br>10<br>11<br>12<br>13</div>
          <div class="vscode-code-content"><span class="type-line" style="--li:0;"><span class="j-brace">{</span></span><span class="type-line" style="--li:1;">  <span class="j-key">"👤 name"</span><span class="j-colon">:</span> <span class="j-str">"Daniel Scott-Raynsford"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:2;">  <span class="j-key">"🏷️ alias"</span><span class="j-colon">:</span> <span class="j-str">"PlagueHO"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:3;">  <span class="j-key">"💼 role"</span><span class="j-colon">:</span> <span class="j-str">"Partner Solution Architect"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:4;">  <span class="j-key">"🏢 team"</span><span class="j-colon">:</span> <span class="j-str">"Cloud &amp; AI Apps · Microsoft EPS"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:5;">  <span class="j-key">"💻 origin"</span><span class="j-colon">:</span> <span class="j-str">"Recovering software engineer"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:6;">  <span class="j-key">"🔗 links"</span><span class="j-colon">:</span> <span class="j-brace">{</span></span><span class="type-line" style="--li:7;">    <span class="j-key">"🌐 web"</span><span class="j-colon">:</span> <a href="https://danielscottraynsford.com" target="_blank" class="j-link">"danielscottraynsford.com"</a><span class="j-punc">,</span></span><span class="type-line" style="--li:8;">    <span class="j-key">"💼 linkedin"</span><span class="j-colon">:</span> <a href="https://www.linkedin.com/in/dscottraynsford/" target="_blank" class="j-link">"linkedin.com/in/dscottraynsford"</a><span class="j-punc">,</span></span><span class="type-line" style="--li:9;">    <span class="j-key">"🐙 github"</span><span class="j-colon">:</span> <a href="https://github.com/PlagueHO" target="_blank" class="j-link">"github.com/PlagueHO"</a></span><span class="type-line" style="--li:10;">  <span class="j-brace">}</span></span><span class="type-line" style="--li:11;"><span class="j-brace">}</span><span class="cs-cursor"></span></span></div>
        </div>
      </div>
      <div class="vscode-statusbar">
        <span>⎇ main</span>
        <span>✓ GitHub Copilot</span>
        <span style="margin-left:auto;">JSON</span>
        <span>UTF-8</span>
        <span>Ln 12, Col 1</span>
      </div>
    </div>
  </div>
</div>

<!--
Keep this quick — 60 seconds max. The goal is to set expectations:
short slides, frequent demos, and a focus on operating patterns not features.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 3 — AGENDA                                  ~30 sec
     ═══════════════════════════════════════════════════════════ -->

<div class="agenda-shell">
  <div class="agenda-orbs-layer">
    <div class="agenda-orb agenda-orb-1"></div>
    <div class="agenda-orb agenda-orb-2"></div>
    <div class="agenda-orb agenda-orb-3"></div>
  </div>

  <div class="agenda-header">
    <p class="agenda-eyebrow">40 MINUTES · 4 LIVE DEMOS</p>
    <h1 class="agenda-title">Agenda</h1>
  </div>

  <div class="agenda-grid">
    <a href="/4" class="agenda-card agenda-card-1">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">01</span>
      <h2>Agentic Operating Model</h2>
      <p>Customization hierarchy, skills, MCP, the ecosystem</p>
    </a>
    <a href="/6" class="agenda-card agenda-card-2">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">02</span>
      <h2>Determinism &amp; Orchestration</h2>
      <p>/troubleshoot, Spec Kit, gh-aw, WorkIQ</p>
    </a>
    <a href="/7" class="agenda-card agenda-card-3">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">03</span>
      <h2>Scaling Intelligence Out</h2>
      <p>Subagents &rarr; Squads &rarr; Monitoring &amp; Memory</p>
    </a>
    <a href="/9" class="agenda-card agenda-card-4">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">04</span>
      <h2>Beyond Dev + Prototypes</h2>
      <p>HVE Core, RPI, Design Thinking, az&nbsp;prototype</p>
    </a>
  </div>

  <div class="agenda-demos">
    <a href="/5" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 1</span>
        <span class="agenda-demo-desc">Insiders + Skills + /Troubleshoot</span>
      </span>
    </a>
    <a href="/8" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 2</span>
        <span class="agenda-demo-desc">Squads &amp; Fleets</span>
      </span>
    </a>
    <a href="/10" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 3</span>
        <span class="agenda-demo-desc">Sessions + RPI / HVE</span>
      </span>
    </a>
    <a href="/12" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 4</span>
        <span class="agenda-demo-desc">az prototype</span>
      </span>
    </a>
  </div>
</div>

<!--
Quick scan of the agenda — don't dwell. Point out the 4 demo markers so people
know when to pay extra attention. "We'll be jumping out to live code 4 times."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 4 — THE AGENTIC OPERATING MODEL               ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Agentic Operating Model</h1>
    <img src="./images/vscode-insiders.png" class="banner-icon" alt="VS Code Insiders" />
  </div>
  <div style="padding: 0.3rem 1.8rem 0; display: flex; align-items: baseline; gap: 0.7rem;">
    <span style="color: var(--theme-muted); font-size: 1.6rem; line-height: 1.3;">The baseline for all developers using Agentic Engineering</span>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0; align-items: stretch; padding: 0.5rem 1.8rem 1rem;">
    <div class="content-panel" style="gap: 1rem; flex: 1; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column;">
        <h3 style="background: linear-gradient(135deg, #114D8B 0%, #38A4DC 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1.15em; margin: 0 0 0.45rem; font-weight: 700;">7-Layer Customization Stack</h3>
        <div style="flex: 1; display: flex; align-items: center; justify-content: center;">
        <div class="pyramid-stack" style="width: 82%;">
          <div class="pyramid-layer" style="margin: 0 0; background: linear-gradient(90deg, #0a2e4a, #103954);">
            <span class="pyramid-num">1</span>
            <span class="pyramid-name">Instructions</span>
            <span class="pyramid-desc">Always-on repo/path conventions</span>
          </div>
          <div class="pyramid-layer pyramid-layer-faded" style="margin: 0 0.5rem; background: linear-gradient(90deg, #114D8B, #1a5ea8);">
            <span class="pyramid-num">2</span>
            <span class="pyramid-name">Prompts</span>
            <span class="pyramid-desc">Reusable task templates</span>
          </div>
          <div class="pyramid-layer" style="margin: 0 1.1rem; background: linear-gradient(90deg, #085f92, #0d83c0);">
            <span class="pyramid-num">3</span>
            <span class="pyramid-name">MCP</span>
            <span class="pyramid-desc">External tool & API surface (N+M)</span>
          </div>
          <div class="pyramid-layer" style="margin: 0 1.8rem; background: linear-gradient(90deg, #0c6484, #1088ac);">
            <span class="pyramid-num">4</span>
            <span class="pyramid-name">Agents</span>
            <span class="pyramid-desc">Specialist personas with tool scopes</span>
          </div>
          <div class="pyramid-layer" style="margin: 0 2.7rem; background: linear-gradient(90deg, #077769, #08a08d);">
            <span class="pyramid-num">5</span>
            <span class="pyramid-name">Skills</span>
            <span class="pyramid-desc">Demand-loaded expertise bundles</span>
          </div>
          <div class="pyramid-layer" style="margin: 0 3.7rem; background: linear-gradient(90deg, #0a7f59, #0da977);">
            <span class="pyramid-num">6</span>
            <span class="pyramid-name">Hooks</span>
            <span class="pyramid-desc">Deterministic lifecycle commands</span>
          </div>
          <div class="pyramid-layer" style="margin: 0 4.8rem; background: linear-gradient(90deg, #5635a0, #7850c0);">
            <span class="pyramid-num">7</span>
            <span class="pyramid-name">Plugins</span>
            <span class="pyramid-desc">Composable: agents, skills, hooks & MCPs</span>
          </div>
        </div>
        </div>
      </div>
      <div style="width: 28%; display: flex; flex-direction: column; justify-content: flex-end; gap: 0.6rem;">
        <div class="card" style="border-color: var(--theme-accent2); border-width: 2px;">
          <h3 style="background: linear-gradient(135deg, #114D8B 0%, #38A4DC 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.95em; margin: 0 0 0.3em; font-weight: 700;">🧩 Skills Ecosystem</h3>
          <p><a href="https://agentskills.io/" target="_blank">agentskills.io</a> — open standard adopted by 15+ agent products.
          Three distribution tiers: community (<a href="https://github.com/github/awesome-copilot" target="_blank">awesome-copilot</a>),
          vendor (<a href="https://github.com/dotnet/skills" target="_blank">dotnet/skills</a>),
          personal (<a href="https://github.com/PlagueHO/plagueho.skills" target="_blank">plagueho.skills</a>).</p>
        </div>
        <div class="card" style="border-color: #5635a0; border-width: 2px;">
          <h3 style="background: linear-gradient(135deg, #5635a0 0%, #9c79e0 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 0.95em; margin: 0 0 0.3em; font-weight: 700;">🧩 Plugins = Team in a Box</h3>
          <p>A composable bundle of agents, skills, hooks & MCPs. One install, full engineering culture for any domain.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Walk through the 7-layer stack top to bottom. Emphasize the spectrum from
"always-on / low-detail" (instructions) to "on-demand / high-detail" (MCP).

Key points:
- Skills are demand-loaded — the agent reads the description and decides
- agentskills.io is open, adopted by GitHub, Claude Code, Cursor, Codex, etc.
- MCP reduces N×M integrations to N+M
- This replaces hope-based prompting with governed behavior

Point at the VS Code top committers chart: "Look who's writing the code now."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 5 — DEMO 1: Insiders + Skills + /Troubleshoot  ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔬</div>
  <h1 class="demo-title">Demo 1: Insiders + Skills + /Troubleshoot</h1>
  <p class="demo-subtitle">See the customization stack in action — and observe why things happen</p>

  <div class="demo-badge">🎬 ~5 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Show VS Code Insiders agent panel & skill discovery</div>
    <div class="demo-item"><span class="check">▸</span> Trigger a skill via chat — watch demand-loading</div>
    <div class="demo-item"><span class="check">▸</span> Run /troubleshoot — inspect tool calls & activation</div>
    <div class="demo-item"><span class="check">▸</span> Show Sensei improving skill frontmatter quality</div>
  </div>

  <img src="./images/section-2-troubleshoot.jpg" style="position: absolute; bottom: 1.2rem; right: 1.5rem; height: 420px; border-radius: 14px; opacity: 0.85; box-shadow: 0 8px 32px rgba(0,0,0,0.5);" alt="/troubleshoot meme" />
</div>

<!--
DEMO SCRIPT — Insiders + Skills + /Troubleshoot (~5 min)
═════════════════════════════════════════════════════════

SETUP: VS Code Insiders open with a repo that has .github/skills/ configured.
Pre-run a task that uses a skill so /troubleshoot has data.

1. SKILL DISCOVERY (1 min)
   - Open a repo with skills in .github/skills/
   - Chat: "migrate this project to .NET 10"
   - Point out: Copilot reads SKILL.md descriptions, picks the right skill
   - Show the skill's YAML frontmatter — triggers, anti-triggers

2. /TROUBLESHOOT (2 min)
   - Run: /troubleshoot why did the migration skill activate?
   - Walk through the JSONL event tree:
     * discovery events — which files scanned, loaded, skipped
     * tool_call events — what tools fired, args, results
     * llm_request — which model, token count, time-to-first-token
   - Key message: "This is the observability layer for the entire agentic stack"

3. SENSEI (1.5 min)
   - Run: "run sensei on my-skill-name"
   - Show before/after frontmatter (vague → routed)
   - Point out: triggers, anti-triggers, INVOKES declarations
   - Key message: "Skill reliability is a frontmatter quality problem"

4. WRAP (30 sec)
   - "Skills replaced ad-hoc prompting. /troubleshoot tells you why.
      Sensei makes the descriptions good enough for routing."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 6 — DETERMINISM & ORCHESTRATION                ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Determinism, Visibility & Orchestration</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body">
    <div class="content-panel">
      <div class="card-grid" style="flex: 1;">
        <div class="card">
          <div class="icon-circle">📐</div>
          <h3>Spec Kit & SDD</h3>
          <p>Specifications become executable — code serves specs, not the other way around. 8 slash commands: <code>/speckit.specify</code> → <code>.plan</code> → <code>.implement</code>. "Unit tests for English."</p>
        </div>
        <div class="card">
          <div class="icon-circle">⚙️</div>
          <h3>GitHub Agentic Workflows</h3>
          <p>Write <code>.md</code> workflows, compile to guarded Actions with <code>gh aw compile</code>. Three-layer security: substrate, configuration, plan-level trust with SafeOutputs.</p>
        </div>
        <div class="card">
          <div class="icon-circle">🔍</div>
          <h3>/troubleshoot</h3>
          <p>The observability layer — JSONL debug logs, event trees, discovery/tool_call/llm_request tracing. Answers: "Why did the AI do what it did?"</p>
        </div>
        <div class="card">
          <div class="icon-circle">💼</div>
          <h3>WorkIQ & Enterprise Context</h3>
          <p>MCP bridge to Microsoft 365 — meetings, emails, Teams. Makes prompts like "build me a demo from the Zava meeting" operational.</p>
        </div>
      </div>
      <div style="width: 28%; display: flex; flex-direction: column; gap: 0.5rem; justify-content: center;">
        <div class="callout" style="font-size: 0.78em;">
          <strong>SDD vs. Vibe Coding</strong><br/>
          Vibe: one-shot → code. No traceability.<br/>
          SDD: spec → plan → tasks → code. Every step auditable.
        </div>
        <div class="callout callout-teal" style="font-size: 0.78em;">
          <strong>Key insight</strong><br/>
          Better models helped, but <strong>better process helped more</strong>.
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Four pillars of determinism. Don't try to cover everything — hit the thesis
for each:

- Spec Kit: "Specs generate code, not the other way around"
- gh-aw: "Markdown → compiled Actions with security baked in"
- /troubleshoot: "You covered this in the demo — just reference it"
- WorkIQ: "Enterprise context makes prompts real, not hypothetical"

Close with: "Better models helped. Better process helped more."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 7 — SCALING INTELLIGENCE OUT                   ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Scaling Intelligence Out</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem;">
    <div class="content-panel two-col-grid" style="align-items: stretch;">
      <div style="display: flex; flex-direction: column; gap: 0.6rem;">
        <p class="kicker" style="margin: 0;">From subagents to squads</p>
        <div class="card" style="flex: 1;">
          <h3>🔀 Subagents as a Primitive</h3>
          <p>Three types: <code>search_subagent</code> (fast read-only), <code>execution_subagent</code> (command runner), <code>runSubagent</code> (general delegation). Each runs in its own context — parallel-safe, no contamination.</p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>📂 Squad — Durable Multi-Agent Teams</h3>
          <p><code>.squad/</code> lives in your repo: team.md, routing.md, decisions.md, agent charters + history. Parallel fan-out. Memory persists in git — the team gets smarter the more you use it.</p>
        </div>
        <div class="callout" style="font-size: 0.78em; margin: 0;">
          <strong>When does multi-agent pay off?</strong> When the context cost of one giant agent exceeds the coordination cost of several focused ones.
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <p class="kicker" style="margin: 0;">Monitoring, memory & recovery</p>
        <div class="three-col-grid" style="flex: 1;">
          <div class="card" style="text-align: center;">
            <div class="icon-circle">📊</div>
            <h3>Monitor</h3>
            <p>Observe active, blocked, completed work. <code>/status</code>, <code>gh aw logs</code></p>
          </div>
          <div class="card" style="text-align: center;">
            <div class="icon-circle">🧠</div>
            <h3>Memory</h3>
            <p>decisions.md, history.md, wisdom.md — all in git, all searchable</p>
          </div>
          <div class="card" style="text-align: center;">
            <div class="icon-circle">🔄</div>
            <h3>Recovery</h3>
            <p>Checkpoint resume, SafeOutputs rollback, session persistence</p>
          </div>
        </div>
        <pre class="terminal-snippet" style="font-size: 0.72rem;">&#35; Squad parallel fan-out — You: "Team, build the login page"
🏗️ Lead    — analyzing requirements
⚛️ Frontend — building login form         all launched
🔧 Backend  — setting up auth endpoints   in parallel
🧪 Tester   — writing tests from spec
📋 Scribe   — logging everything</pre>
      </div>
    </div>
  </div>
</div>

<!--
Two halves:
LEFT — the progression from subagents to squads.
  - Subagents: "One agent splits work into focused parallel tasks"
  - Squad: "Persistent multi-agent team that lives in your repo"
  - The key question: "Context cost vs. coordination cost"

RIGHT — the three operational surfaces.
  - Without these, multi-agent is academic
  - With these, it's practical for real teams
  - Point at the terminal snippet: "This is what 'team, build X' looks like"

Transition: "Let me show you this live..."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 8 — DEMO 2: Squads & Fleets                    ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🤖</div>
  <h1 class="demo-title">Demo 2: Squads & Fleets</h1>
  <p class="demo-subtitle">Persistent multi-agent teams with parallel execution and memory</p>

  <div class="demo-badge">🎬 ~5 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Init a Squad from scratch — roster, routing, casting</div>
    <div class="demo-item"><span class="check">▸</span> Give a team task — watch parallel fan-out</div>
    <div class="demo-item"><span class="check">▸</span> Inspect .squad/ — decisions.md, history.md, orchestration log</div>
    <div class="demo-item"><span class="check">▸</span> Show memory persistence across sessions</div>
  </div>
</div>

<!--
DEMO SCRIPT — Squads & Fleets (~5 min)
═══════════════════════════════════════

SETUP: Fresh repo (or existing one without .squad/).
Have Squad agent mode available in VS Code Insiders.

1. SQUAD INIT (1.5 min)
   - Switch to Squad mode in Copilot chat
   - Say: "I'm building a Node.js REST API for a task manager"
   - Watch: coordinator proposes 4-5 named agents + Scribe
   - Confirm the roster → .squad/ directory created
   - Quick tour: team.md, routing.md, ceremonies.md, agents/

2. PARALLEL FAN-OUT (2 min)
   - Say: "Team, set up the project structure with Express and tests"
   - Watch: multiple agents spawn simultaneously
   - Point out: each agent runs in its own context
   - Show the launch table: who's working, what model, what task
   - Wait for results — show coordinator synthesizing

3. MEMORY & DECISIONS (1 min)
   - Open .squad/decisions.md — team decisions recorded
   - Open an agent's history.md — learnings about YOUR project
   - Key message: "This is in git. Clone the repo, get the team."

4. WRAP (30 sec)
   - "Not a chatbot wearing hats. Each agent has its own context,
      knowledge, and writes back what it learned."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 9 — BEYOND DEVELOPMENT                         ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Beyond Development: More Roles, More Artifacts</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem;">
    <div class="content-panel" style="flex-direction: column; gap: 0.6rem;">
      <div class="two-col-grid" style="gap: 0.8rem;">
        <div>
          <p class="kicker" style="margin-bottom: 0.3rem;">HVE Core — RPI Workflow</p>
          <p style="font-size: 0.82em; color: var(--theme-muted); margin: 0 0 0.5rem;">
            "AI can't tell the difference between investigating and implementing.
            The solution isn't teaching AI to be smarter — it's <strong>preventing AI from
            doing certain things at certain times</strong>."
          </p>
          <div class="flow-pipeline">
            <div class="flow-step">🔍 Research</div>
            <span class="flow-arrow">→</span>
            <div class="flow-step">📋 Plan</div>
            <span class="flow-arrow">→</span>
            <div class="flow-step flow-step-active">⚡ Implement</div>
            <span class="flow-arrow">→</span>
            <div class="flow-step">✅ Review</div>
          </div>
          <p style="font-size: 0.75em; color: var(--theme-muted); margin: 0.3rem 0 0; font-style: italic;">
            Each phase produces artifacts. Context cleared between phases. The constraint changes the goal.
          </p>
        </div>
        <div>
          <p class="kicker" style="margin-bottom: 0.3rem;">Design Thinking + 10 Roles</p>
          <div class="three-col-grid" style="gap: 0.35rem;">
            <div style="padding: 0.3rem 0.5rem; border-radius: 8px; background: rgba(221, 107, 32, 0.08); font-size: 0.72em; text-align: center;">
              <strong>Problem</strong><br/>Scope · Research · Synthesize
            </div>
            <div style="padding: 0.3rem 0.5rem; border-radius: 8px; background: rgba(15, 108, 141, 0.08); font-size: 0.72em; text-align: center;">
              <strong>Solution</strong><br/>Brainstorm · Concept · Prototype
            </div>
            <div style="padding: 0.3rem 0.5rem; border-radius: 8px; background: rgba(232, 185, 49, 0.12); font-size: 0.72em; text-align: center;">
              <strong>Validation</strong><br/>Hi-Fi · Test · Scale
            </div>
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin-top: 0.4rem;">
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">👨‍💻 Engineer</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">📊 TPM</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">🏗️ Architect</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">🔒 Security</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">📈 Data</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">⚙️ SRE</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">💼 BPM</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">🆕 New</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">🎨 UX</span>
            <span style="padding: 0.15rem 0.45rem; border-radius: 6px; background: rgba(21, 48, 71, 0.06); font-size: 0.68em;">🔧 Utility</span>
          </div>
        </div>
      </div>
      <div class="callout" style="margin: 0; font-size: 0.82em;">
        <strong>The important shift:</strong> Better agentic systems don't just generate code faster. They make
        <strong>research</strong>, <strong>planning</strong>, and <strong>review</strong> first-class outputs that more roles can work on.
      </div>
    </div>
  </div>
</div>

<!--
Two key stories:

LEFT — HVE Core RPI:
  - The core insight: AI writes first, thinks never. The fix is constraints.
  - Walk the pipeline: Research → Plan → Implement → Review
  - Each produces artifacts, context cleared between phases
  - "When AI knows it can't implement during research, it optimizes for truth"

RIGHT — Design Thinking + 10 Roles:
  - Three spaces (Problem, Solution, Validation)
  - 10 role-specific entry points — PMs, architects, analysts, UX, security
  - Not just engineering anymore

Bottom callout: "Research, planning, and review are first-class outputs"
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 10 — DEMO 3: Sessions + RPI / HVE              ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🧪</div>
  <h1 class="demo-title">Demo 3: Sessions + RPI Workflow</h1>
  <p class="demo-subtitle">VS Code sessions make multi-role collaboration visible — RPI shows constrained AI</p>

  <div class="demo-badge">🎬 ~4 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Show VS Code sessions — multiple roles in one surface</div>
    <div class="demo-item"><span class="check">▸</span> Run RPI Research phase — AI investigates, doesn't implement</div>
    <div class="demo-item"><span class="check">▸</span> Show research artifact — citations, file references, evidence</div>
    <div class="demo-item"><span class="check">▸</span> Transition to Plan phase — clear context, structured output</div>
  </div>
</div>

<!--
DEMO SCRIPT — Sessions + RPI / HVE (~4 min)
═══════════════════════════════════════════

SETUP: VS Code with HVE Core configured and a repo with existing code.
Pre-create a research artifact so you have a fallback.

1. VS CODE SESSIONS (1 min)
   - Show the sessions panel / experience
   - Point out: multiple participants, shared artifacts, visible state
   - "This is how PMs and architects participate in the same surface"

2. RPI RESEARCH PHASE (2 min)
   - Chat: use the Task Researcher agent
   - Give it a task: "Add error handling to the export function"
   - Watch: agent SEARCHES for existing patterns, CITES file+line
   - Show output: research document with evidence, not code
   - Key message: "It stopped optimizing for 'plausible code' and
     started optimizing for 'verified truth'"

3. PLAN PHASE (1 min)
   - Clear context (/clear or new chat)
   - Switch to Task Planner agent
   - Feed it the research document
   - Show: structured plan with success criteria, checkboxes
   - "Every step traces back to research"

4. WRAP (30 sec)
   - "The constraint changes the goal. Separate investigating from
     implementing, and both get better."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 11 — PROTOTYPE-FIRST WORKFLOWS                 ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Prototype-First: Concept to Deploy</h1>
    <img src="./images/azure.png" class="banner-icon" alt="Azure" />
  </div>
  <div style="padding: 0.3rem 1.8rem 0; display: flex; align-items: baseline; gap: 0.7rem;">
    <strong style="font-size: 1.85rem; color: var(--theme-deep); font-weight: 700; letter-spacing: -0.02em;">az prototype</strong>
    <span style="color: var(--theme-muted); font-size: 1.6rem; line-height: 1.3;">— AI-powered Azure prototype CLI &nbsp;·&nbsp;
      <a href="https://learn.microsoft.com/cli/azure/prototype?view=azure-cli-latest" target="_blank" style="font-size: 1.6rem;">docs on Microsoft Learn ↗</a>
    </span>
  </div>
  <div class="slide-body" style="align-items: stretch; padding: 0.5rem 1.8rem 1rem;">
    <div class="content-panel" style="gap: 1rem; flex: 1; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.7rem; min-width: 0;">
        <div class="callout" style="font-size: 1.0em;">
          <strong>A working app beats a beautiful mockup</strong> — because the cost of
          generating the first useful slice is now lower than reviewing a slide deck.
        </div>
        <pre class="terminal-snippet" style="font-size: 1.19rem; flex: 1;">az extension add --name prototype
az prototype init --name retail-assistant --template ai-app
az prototype design --interactive
az prototype build
az prototype deploy
az prototype analyze costs        &#35; T-shirt pricing (S/M/L)
az prototype analyze error        &#35; Even accepts screenshots!
az prototype generate speckit     &#35; Bridge to SDD
az prototype generate backlog     &#35; to GitHub Issues</pre>
      </div>
      <div style="width: 33%; display: flex; flex-direction: column; gap: 0.5rem; min-width: 0;">
        <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.55rem 0.85rem; border-radius: 10px; background: linear-gradient(135deg, var(--theme-accent5) 0%, var(--theme-accent2) 100%); margin-bottom: 0.35rem; box-shadow: 0 4px 14px rgba(17,77,139,0.3);">
          <span style="font-size: 1.5rem; line-height: 1;">🤖</span>
          <div style="display: flex; flex-direction: column; gap: 0.05rem;">
            <span style="font-size: 1.1rem; font-weight: 700; color: white; letter-spacing: -0.01em; line-height: 1.2;">11 built-in agents</span>
            <span style="font-size: 0.7rem; color: rgba(255,255,255,0.75); text-transform: uppercase; letter-spacing: 0.12em;">AI-powered specialists</span>
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.3rem; font-size: 1.08em; flex: 1;">
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(221, 107, 32, 0.08);">
            <span>📋</span><strong>biz-analyst</strong> — always engaged
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(21, 48, 71, 0.05);">
            <span>🏗️</span><strong>cloud-architect</strong> — design
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(221, 107, 32, 0.08);">
            <span>💰</span><strong>cost-analyst</strong> — pricing
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(21, 48, 71, 0.05);">
            <span>🔒</span><strong>security-reviewer</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(221, 107, 32, 0.08);">
            <span>👨‍💻</span><strong>app-developer</strong> — code
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(21, 48, 71, 0.05);">
            <span>🧱</span><strong>terraform / bicep</strong> — IaC
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(221, 107, 32, 0.08);">
            <span>🧪</span><strong>qa-engineer</strong> — testing
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(21, 48, 71, 0.05);">
            <span>📝</span><strong>documentation</strong>
          </div>
          <div style="display: flex; align-items: center; gap: 0.45rem; padding: 0.28rem 0.55rem; border-radius: 7px; background: rgba(221, 107, 32, 0.08);">
            <span>📡</span><strong>monitoring-agent</strong> — observability
          </div>
        </div>
        <div class="callout callout-teal" style="font-size: 0.95em; margin: 0;">
          <strong>Cross-role:</strong> PMs run <code>design</code>, finance runs <code>analyze costs</code>, anyone runs <code>generate backlog</code>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Focus on two things:

1. The 4-step flow: init → design → build → deploy
   - Each stage re-entrant — you can go back
   - design has --interactive for refinement loops
   - Supporting commands extend it: costs, error analysis, speckit, backlog

2. Cross-role participation:
   - PM: "az prototype design" — gets architecture, no dev needed to start
   - Finance: "az prototype analyze costs" — real Azure pricing before code
   - Anyone: "az prototype generate backlog --provider github" — Issues with criteria
   - The team can dry-run before committing resources

Close with: "A working app beats a beautiful mockup."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 12 — DEMO 4: az prototype                      ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">⚡</div>
  <h1 class="demo-title">Demo 4: az prototype</h1>
  <p class="demo-subtitle">From concept to deployed Azure resources in one iterative flow</p>

  <div class="demo-badge">🎬 ~4 minutes</div>

  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> az prototype init — scaffold with AI provider</div>
    <div class="demo-item"><span class="check">▸</span> az prototype design --interactive — refine architecture</div>
    <div class="demo-item"><span class="check">▸</span> az prototype analyze costs — T-shirt pricing</div>
    <div class="demo-item"><span class="check">▸</span> az prototype build + deploy — staged output to Azure</div>
  </div>
</div>

<!--
DEMO SCRIPT — az prototype (~4 min)
════════════════════════════════════

SETUP: Azure CLI with prototype extension installed. Azure subscription
ready. Have a concept in mind (e.g., "retail AI assistant").

1. INIT (30 sec)
   - Run: az prototype init --name retail-assistant --template ai-app
   - Show: prototype.yaml created, project scaffolded
   - Point out: AI provider choice (copilot, azure-openai, github-models)

2. DESIGN (1.5 min)
   - Run: az prototype design --interactive
   - Watch: biz-analyst agent engages, asks clarifying questions
   - Answer 2-3 questions to shape the architecture
   - Show output: architecture documentation generated
   - "A PM could do this without a developer"

3. COSTS (30 sec)
   - Run: az prototype analyze costs
   - Show: three consumption tiers (S/M/L) with real Azure pricing
   - "Finance gets this before any code exists"

4. BUILD + DEPLOY (1 min)
   - Run: az prototype build (show staged output, progress indicators)
   - Run: az prototype deploy --dry-run (show preflight checks)
   - If time: deploy for real, show slash commands (/status, /plan)
   - "From concept to deployed Azure in under 5 minutes"

5. WRAP (30 sec)
   - "This is why prototypes beat mockups. The cost calculus changed."
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 13 — WHAT TO DO NOW                            ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>What To Do Now</h1>
    <img src="./images/vscode-insiders.png" class="banner-icon" alt="VS Code Insiders" />
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.7rem; align-items: stretch;">
    <div class="action-grid" style="width: 100%; flex: 1;">
      <div v-click class="action-card">
        <img src="./images/vscode-insiders.png" class="action-icon" alt="VS Code Insiders" />
        <span class="action-num">01</span>
        <h3>🚀 Adopt Insiders + CLI</h3>
        <p>When your team can handle preview cadence. Agent features land here weeks before stable.</p>
      </div>
      <div v-click class="action-card">
        <img src="./images/agentskills.svg" class="action-icon" alt="agentskills.io" />
        <span class="action-num">02</span>
        <h3>🧩 Convert to Skills</h3>
        <p>If you'll do it more than once and it needs determinism — make it a skill. Use agentskills.io for portability.</p>
      </div>
      <div v-click class="action-card">
        <img src="./images/github-copilot.png" class="action-icon" alt="GitHub Copilot" />
        <span class="action-num">03</span>
        <h3>📐 Scale Deliberately</h3>
        <p>Start with subagents. Move to squads only when persistent coordination beats one giant context window.</p>
      </div>
      <div v-click class="action-card">
        <img src="./images/github-mark.png" class="action-icon" alt="GitHub" />
        <span class="action-num">04</span>
        <h3>👥 Include More Roles</h3>
        <p>PMs, designers, analysts, business managers — into the same visible artifact chain. RPI and az prototype make this real.</p>
      </div>
      <div v-click class="action-card">
        <img src="./images/azure.png" class="action-icon" alt="Azure" />
        <span class="action-num">05</span>
        <h3>🏗️ Build Demos of Everything</h3>
        <p>A working slice teaches faster than a polished plan. <code>az prototype init</code> is the fastest path from concept to proof.</p>
      </div>
    </div>
  </div>
</div>

<!--
Concrete adoption checklist. Each item maps to a section they just saw:
01 → Slide 4 (Operating Model)
02 → Slide 4+5 (Skills + Demo)
03 → Slide 7+8 (Scaling + Demo)
04 → Slide 9+10 (Beyond Dev + Demo)
05 → Slide 11+12 (Prototype-First + Demo)
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 14 — KEY TAKEAWAYS                             ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Key Takeaways</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body" style="align-items: stretch; padding: 0.8rem 1.8rem;">
    <div class="takeaway-grid" style="width: 100%; flex: 1;">
      <div v-click class="takeaway-item">
        <span class="takeaway-num">1</span>
        <div class="takeaway-text"><strong>The constraint changes the goal.</strong> Preventing AI from doing everything at once makes each thing better. Squad constrains by role. gh-aw constrains by security. RPI constrains research from implementation.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">2</span>
        <div class="takeaway-text"><strong>Governance must be in code, not prompts.</strong> Prompts can be ignored; code cannot. SDK hooks, compiled workflows, and the customization hierarchy enforce behavior.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">3</span>
        <div class="takeaway-text"><strong>Memory makes teams compound.</strong> .squad/ is committed to git. Research documents accumulate. Skills persist organizational knowledge. The team gets smarter the more it works.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">4</span>
        <div class="takeaway-text"><strong>The workflow belongs to more roles than engineering.</strong> Research, planning, cost analysis, security review, and documentation are all first-class outputs.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">5</span>
        <div class="takeaway-text"><strong>Standardization enables the ecosystem.</strong> MCP solves N x M. agentskills.io enables portability. Canonical layouts enable federated distribution.</div>
      </div>
    </div>
  </div>
</div>

<!--
Progressive reveal — build each takeaway one click at a time.
These connect ALL the sections:
1. Constraint → Squad, gh-aw, RPI, Spec Kit
2. Governance → Hooks, SDK, compiled workflows
3. Memory → .squad/, research docs, skills
4. More roles → HVE 10 roles, az prototype, Design Thinking
5. Standards → MCP, agentskills.io, plugin layout
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 15 — CHEAT SHEET (photographable reference card)
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>📸 Cheat Sheet — Photograph This!</h1>
    <img src="./images/github-copilot.png" class="banner-icon" alt="GitHub Copilot" />
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; padding: 0.8rem 1.5rem;">
    <div class="two-col-grid" style="width: 100%; gap: 0.6rem; align-items: stretch;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>1. The constraint changes the goal</h3>
          <p>Prevent AI from doing everything at once. Squad constrains by role. gh-aw by security. RPI separates research from implementation. <strong>The constraint is the feature.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>2. Governance in code, not prompts</h3>
          <p>Prompts can be ignored; code cannot. SDK hooks, compiled workflows, the 7-layer customization hierarchy. <strong>Enforce, don't suggest.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>3. Memory makes teams compound</h3>
          <p><code>.squad/</code> committed to git. Research docs accumulate. Skills persist org knowledge. <strong>The team gets smarter every session.</strong></p>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>4. More roles than engineering</h3>
          <p>Research, planning, cost analysis, security review, and docs are first-class outputs. PMs, architects, analysts — same artifact chain. <strong>Not just code faster.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>5. Standards enable the ecosystem</h3>
          <p>MCP solves N x M. agentskills.io enables portability. Canonical plugin layout enables federated distribution. <strong>Open standards are the foundation.</strong></p>
        </div>
        <div class="callout" style="font-size: 0.78em; margin: 0;">
          <strong>Start here (links): </strong>
          <a href="https://agentskills.io">agentskills.io</a> ·
          <a href="https://github.com/github/spec-kit">Spec Kit</a> ·
          <a href="https://github.com/bradygaster/squad">Squad</a> ·
          <a href="https://github.com/dotnet/skills">dotnet/skills</a> ·
          <a href="https://github.com/github/gh-aw">gh-aw</a> ·
          <a href="https://microsoft.github.io/hve-core/">HVE Core</a> ·
          <a href="https://learn.microsoft.com/en-us/cli/azure/prototype">az prototype</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the "photograph this" slide — pause here and let people take photos.
It's a condensed reference card of the 5 cross-cutting principles plus the
key links from the talk. Everything they need to get started after the session.
-->

---
layout: center
class: text-center
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 16 — THANK YOU / Q&A                           ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="thankyou-shell">
  <h1 style="font-size: 2.8rem;">Thank You!</h1>
  <p style="color: var(--theme-muted); font-size: 1.1rem; max-width: 32rem;">
    Questions? Let's go deeper on anything you saw — or I can spin up a live demo on the spot.
  </p>

  <div class="thankyou-links">
    <a href="https://github.com/PlagueHO" target="_blank">GitHub</a>
    <a href="https://danielscottraynsford.com" target="_blank">Website</a>
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank">Slides Source</a>
  </div>

  <div class="cta-box" style="max-width: 40rem; margin-top: 0.8rem;">
    <div>
      <p style="font-weight: 600;">Dive deeper — all the links</p>
      <p style="font-size: 0.8em; opacity: 0.8;">
        <a href="https://github.com/github/spec-kit" target="_blank" style="color: rgba(255,255,255,0.85);">Spec Kit</a> ·
        <a href="https://github.com/bradygaster/squad" target="_blank" style="color: rgba(255,255,255,0.85);">Squad</a> ·
        <a href="https://agentskills.io/" target="_blank" style="color: rgba(255,255,255,0.85);">agentskills.io</a> ·
        <a href="https://github.com/dotnet/skills" target="_blank" style="color: rgba(255,255,255,0.85);">dotnet/skills</a> ·
        <a href="https://github.com/PlagueHO/plagueho.skills" target="_blank" style="color: rgba(255,255,255,0.85);">plagueho.skills</a> ·
        <a href="https://github.com/github/awesome-copilot" target="_blank" style="color: rgba(255,255,255,0.85);">awesome-copilot</a> ·
        <a href="https://github.com/github/gh-aw" target="_blank" style="color: rgba(255,255,255,0.85);">gh-aw</a> ·
        <a href="https://microsoft.github.io/hve-core/" target="_blank" style="color: rgba(255,255,255,0.85);">HVE Core</a> ·
        <a href="https://learn.microsoft.com/en-us/cli/azure/prototype" target="_blank" style="color: rgba(255,255,255,0.85);">az prototype</a>
      </p>
    </div>
  </div>
</div>

<!--
Open for questions. Offer to do another live demo if time allows.
"Everything in this talk is in the repo — clone it, use it, extend it."
-->
