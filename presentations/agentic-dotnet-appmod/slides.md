---
theme: default
title: "Agentic .NET AppMod – What works, what doesn't and how to fix it"
info: |
  ## Agentic .NET AppMod
  A 45-minute unplugged session by Daniel Scott-Raynsford on lessons learned
  from a week with the Microsoft .NET AppMod CAT team modernizing a 10M LOC,
  30-year-old application at scale.
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
    <a href="https://danielscottraynsford.com/plagueho.learn/agentic-dotnet-appmod" target="_blank" class="hero-qr-url">danielscottraynsford.com/plagueho.learn/agentic-dotnet-appmod</a>
  </div>
  <p class="eyebrow">AppMod MCP · Skills · Dependency Layers · /troubleshoot · Async Execution</p>
  <h1 class="hero-heading">Agentic .NET<br>AppMod</h1>
  <p class="hero-sub">
    What works, what doesn't and how to fix it — lessons from a week with the
    Microsoft .NET AppMod CAT team modernizing a <strong>10M LOC, 30-year-old app</strong>
    using <strong>AppMod MCP</strong>, <strong>dependency layers</strong>, and <strong>reusable skills</strong>.
  </p>
  <div class="hero-meta">
    <span>Daniel Scott-Raynsford (DSR)</span>
    <span>Sr. Partner Solution Architect · Cloud &amp; AI Apps · Microsoft EPS</span>
    <span>45 minutes · unplugged · demo-heavy</span>
  </div>
  <div class="hero-badge-grid">
    <div class="badge-card">
      <strong>🔧 Skills &gt; Prompts</strong>
      <span>20+ skills built in 4 days</span>
    </div>
    <div class="badge-card">
      <strong>📦 Break it down</strong>
      <span>Dependency layers, leaf-first</span>
    </div>
    <div class="badge-card">
      <strong>⚡ Go async</strong>
      <span>Stop watching agents</span>
    </div>
    <div class="badge-card">
      <strong>🔍 100× pattern</strong>
      <span>/troubleshoot + update skill</span>
    </div>
  </div>
</div>

<!--
Frame this as a candid, lessons-learned session — not a sizzle reel. Everything
here was earned over 4 days of real work on a real 10M LOC app with the
Microsoft AppMod CAT team. "We did it, we learned, we're sharing."
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
          <div class="vscode-code-content"><span class="type-line" style="--li:0;"><span class="j-brace">{</span></span><span class="type-line" style="--li:1;">  <span class="j-key">"👤 name"</span><span class="j-colon">:</span> <span class="j-str">"Daniel Scott-Raynsford"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:2;">  <span class="j-key">"🏷️ alias"</span><span class="j-colon">:</span> <span class="j-str">"PlagueHO"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:3;">  <span class="j-key">"💼 role"</span><span class="j-colon">:</span> <span class="j-str">"Partner Solution Architect"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:4;">  <span class="j-key">"🏢 team"</span><span class="j-colon">:</span> <span class="j-str">"Cloud &amp; AI Apps · Microsoft EPS"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:5;">  <span class="j-key">"💻 origin"</span><span class="j-colon">:</span> <span class="j-str">"Recovering software engineer"</span><span class="j-punc">,</span></span><span class="type-line" style="--li:6;">  <span class="j-key">"🔗 links"</span><span class="j-colon">:</span> <span class="j-brace">{</span></span><span class="type-line" style="--li:7; padding-left: 2ch;">  <span class="j-key">"🌐 web"</span><span class="j-colon">:</span> <a href="https://danielscottraynsford.com" target="_blank" class="j-link">"danielscottraynsford.com"</a><span class="j-punc">,</span></span><span class="type-line" style="--li:8; padding-left: 2ch;">  <span class="j-key">"💼 linkedin"</span><span class="j-colon">:</span> <a href="https://www.linkedin.com/in/dscottraynsford/" target="_blank" class="j-link">"linkedin.com/in/dscottraynsford"</a><span class="j-punc">,</span></span><span class="type-line" style="--li:9; padding-left: 2ch;">  <span class="j-key">"🐙 github"</span><span class="j-colon">:</span> <a href="https://github.com/PlagueHO" target="_blank" class="j-link">"github.com/PlagueHO"</a></span><span class="type-line" style="--li:10;">  <span class="j-brace">}</span></span><span class="type-line" style="--li:11;"><span class="j-brace">}</span><span class="cs-cursor"></span></span></div>
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
Keep this quick — 60 seconds max. Set the tone: this is a conversation, not
a lecture. Ask questions anytime. Demo-heavy. "I'm going to share things that
actually happened, not things I think should happen."
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 3 — AGENDA                                    ~30 sec
     ═══════════════════════════════════════════════════════════ -->

<div class="agenda-shell">
  <div class="agenda-orbs-layer">
    <div class="agenda-orb agenda-orb-1"></div>
    <div class="agenda-orb agenda-orb-2"></div>
    <div class="agenda-orb agenda-orb-3"></div>
  </div>
  <div class="agenda-header">
    <p class="agenda-eyebrow">45 MINUTES · 5 LIVE DEMOS · UNPLUGGED</p>
    <h1 class="agenda-title">Agenda</h1>
  </div>
  <div class="agenda-grid">
    <div @click="$slidev.nav.go(5)" class="agenda-card agenda-card-1" style="cursor:pointer;">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">01</span>
      <h2>The Hard Truth</h2>
      <p>No sizzle reels — what large-scale AppMod actually looks like</p>
    </div>
    <div @click="$slidev.nav.go(6)" class="agenda-card agenda-card-2" style="cursor:pointer;">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">02</span>
      <h2>Toolchain &amp; Tool Discipline</h2>
      <p>VS Code Insiders, AppMod MCP, workspace config, tool hygiene</p>
    </div>
    <div @click="$slidev.nav.go(8)" class="agenda-card agenda-card-3" style="cursor:pointer;">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">03</span>
      <h2>Layers, Skills &amp; Build-Fix</h2>
      <p>Dependency layers, skills over prompts, the build-fix loop</p>
    </div>
    <div @click="$slidev.nav.go(13)" class="agenda-card agenda-card-4" style="cursor:pointer;">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">04</span>
      <h2>Async &amp; Observability</h2>
      <p>Go async, the 100× pattern, what to do now</p>
    </div>
  </div>
  <div class="agenda-demos">
    <div @click="$slidev.nav.go(7)" class="agenda-demo-pill" style="cursor:pointer;">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 1</span>
        <span class="agenda-demo-desc">Assessment</span>
      </span>
    </div>
    <div @click="$slidev.nav.go(9)" class="agenda-demo-pill" style="cursor:pointer;">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 2</span>
        <span class="agenda-demo-desc">Dependency Layers</span>
      </span>
    </div>
    <div @click="$slidev.nav.go(11)" class="agenda-demo-pill" style="cursor:pointer;">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 3</span>
        <span class="agenda-demo-desc">Prompt→Skill</span>
      </span>
    </div>
    <div @click="$slidev.nav.go(14)" class="agenda-demo-pill" style="cursor:pointer;">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 4</span>
        <span class="agenda-demo-desc">Async Execution</span>
      </span>
    </div>
    <div @click="$slidev.nav.go(16)" class="agenda-demo-pill" style="cursor:pointer;">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 5</span>
        <span class="agenda-demo-desc">/troubleshoot &amp; 100×</span>
      </span>
    </div>
  </div>
</div>

<!--
Quick scan of the agenda — don't dwell. Point out the 5 demo markers so
people know when we'll jump to live code. "This is an unplugged session —
ask questions anytime, challenge anything, let's make it a conversation."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 4 — THE WORKSHOP CONTEXT                       ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Workshop Context</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div class="callout callout-teal" style="text-align: center; font-size: 1.1em; padding: 0.7rem 1.2rem;">
      <strong>"Completely game changing"</strong> — 4 days, all recorded, learnings we want every partner to have
    </div>
    <div class="agent-pattern-grid">
      <div class="agent-pattern-card" style="border-top: 4px solid var(--theme-accent);">
        <span class="agent-pattern-label" style="color: var(--theme-accent); background: rgba(254,91,56,0.1);">🏢 Who</span>
        <ul class="agent-pattern-list">
          <li>Microsoft Director, DevDiv CoreAI AppMod</li>
          <li>Microsoft Principal Engineer, AppMod</li>
          <li>Microsoft EPS, Partner Solution Architects, Cloud and AI Apps</li>
        </ul>
      </div>
      <div class="agent-pattern-card" style="border-top: 4px solid var(--theme-accent2);">
        <span class="agent-pattern-label">🎯 What</span>
        <ul class="agent-pattern-list">
          <li>SDC engagement with partner a in New Zealand</li>
          <li>Target: <strong>10M LOC, 30-year-old .NET application</strong></li>
          <li>Goal: realistic AppMod at enterprise scale using AI</li>
        </ul>
      </div>
      <div class="agent-pattern-card" style="border-top: 4px solid #0d6e6e;">
        <span class="agent-pattern-label" style="color: #0d6e6e; background: rgba(13,110,110,0.1);">💡 Why This Talk</span>
        <ul class="agent-pattern-list">
          <li>The AppMod CAT team brought techniques customers rarely see</li>
          <li>We want to enable any organization to run workshops like this</li>
          <li>These learnings are <strong>directly applicable</strong> to any organization performing app modernization</li>
        </ul>
      </div>
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 5 — THE HARD TRUTH                             ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Hard Truth About Large-Scale AppMod</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.4rem 1.8rem 0.8rem;">
    <div class="callout" style="background: #fff0ec; border-left: 4px solid var(--theme-accent); padding: 0.5rem 1rem; font-size: 0.92em;">
      <strong>⚠️</strong> "Everybody wants push a button… but the reality is it's not for any large or complex applications."
    </div>
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #dc2626;">
          <span class="agent-pattern-label" style="color: #b91c1c; background: rgba(220,38,38,0.1);">❌ What Doesn't Work</span>
          <ul class="agent-pattern-list" style="font-size: 1.03rem; margin-top: 0.15rem;">
            <li>"Single-click" AI AppMod for non-trivial apps</li>
            <li>Problem isn't code conversion — it's package support, validation, tech debt</li>
            <li>If your app is <strong>small enough for single-click</strong>, it's small enough to <strong>rebuild entirely with AI</strong></li>
          </ul>
        </div>
        <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #16a34a;">
          <span class="agent-pattern-label" style="color: #15803d; background: rgba(22,163,74,0.1);">✅ What Does Work</span>
          <ul class="agent-pattern-list" style="font-size: 1.03rem; margin-top: 0.15rem;">
            <li>Follow <strong>standard .NET AppMod approach</strong> — then leverage AI to automate and make it repeatable</li>
            <li>AI is an acceleration mechanism, <strong>not a blind code-rewriter</strong></li>
            <li>On big PRs: <strong>"No one's gonna review that."</strong></li>
          </ul>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem; align-items: center; justify-content: center;">
        <span class="agent-pattern-label" style="align-self: flex-start;">🗺️ Upgrade process</span>
        <img src="./images/upgrade-process.png" alt=".NET upgrade process" style="max-width: 100%; border-radius: 10px; border: 1px solid var(--theme-line); box-shadow: 0 2px 8px rgba(0,0,0,0.08);" />
        <div class="callout callout-teal" style="font-size: 0.82em; width: 100%;">
          <strong>📺 Pre-requisite:</strong> You MUST understand standard .NET AppMod before starting.
          <a href="https://www.youtube.com/watch?v=umcl-Ooaay4" target="_blank">Auckland .NET User Group recording</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the "what doesn't work" part of the title. Set expectations correctly.
The AppMod CAT team's own words: stop promising magic. The incremental approach
was repeatedly stressed — "maintain confidence at every step". Point attendees
to the Auckland recording as essential prep.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 6 — THE RIGHT TOOLCHAIN & TOOL DISCIPLINE      ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Right Toolchain &amp; Tool Discipline</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.45rem; align-items: stretch; padding: 0.35rem 1.8rem 0.7rem;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.2rem;">
      <div class="thought-bubble" style="font-size:1.25rem;white-space:normal;max-width:100%;text-align:center;justify-content:center;">
        <span class="thought-bubble-emoji" style="font-size:1.5rem;">💬</span>
        <span>"Everyone in DevDiv uses Insiders, no one uses stable. We recommend all customers use Insiders if they can."</span>
      </div>
      <div class="thought-dots"><span></span><span></span><span></span></div>
    </div>
    <div style="display: flex; gap: 0.6rem; align-items: stretch;">
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid var(--theme-accent2);">
        <span class="agent-pattern-label">💻 VS Code Insiders</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">AI Dev moves so fast that by the time a feature reaches Stable, <strong>the state of the art has moved on</strong></p>
      </div>
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #16a34a;">
        <span class="agent-pattern-label" style="color: #15803d; background: rgba(22,163,74,0.1);">⬆️ Update Aggressively</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Every day we started with an update. Solutions to <strong>yesterday's problems</strong> often arrived in <strong>today's update</strong></p>
      </div>
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #5635a0;">
        <span class="agent-pattern-label" style="color: #5635a0; background: rgba(86,53,160,0.1);">📦 AppMod MCP NuGet</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Use <code>Microsoft.GitHubCopilot.AppModernization.Mcp</code> — the official AppMod tools and agents</p>
      </div>
    </div>
    <div style="display: flex; gap: 0.6rem; align-items: stretch;">
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #dc2626;">
        <span class="agent-pattern-label" style="color: #b91c1c; background: rgba(220,38,38,0.1);">⚠️ Extension Hygiene</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);"><strong>Remove all</strong> AppMod extensions. Use <strong>only</strong> the NuGet MCP package. Multiple competing extensions confuse agents.</p>
      </div>
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #d97706;">
        <span class="agent-pattern-label" style="color: #b45309; background: rgba(217,119,6,0.1);">🔧 Tool Wrangling Is a Discipline</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">When things went wrong, tools had been disabled/enabled by different agents. <strong>Restrict tool surface area.</strong></p>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">💭 <em>"I can review it and I don't understand it. It's too much."</em></p>
      </div>
      <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #0d6e6e;">
        <span class="agent-pattern-label" style="color: #0d6e6e; background: rgba(13,110,110,0.1);">📋 Workspace Config</span>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Commit <code>mcp.json</code>, shared prompts in <code>.github/skills</code>, <code>.github/agents</code>, <code>custom-instructions.md</code></p>
        <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);"><strong>Repeatability across repos</strong>, not per-developer setup</p>
      </div>
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 7 — DEMO 1: MODERNIZATION ASSESSMENT           ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">📋</div>
  <h1 class="demo-title">Demo 1: Modernization Assessment — First Steps</h1>
  <p class="demo-subtitle">Configure the toolchain, run the baseline assessment, understand your starting point</p>
  <div class="demo-badge">🎬 ~3 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Show workspace <code>.vscode/mcp.json</code> with AppMod MCP server configured</div>
    <div class="demo-item"><span class="check">▸</span> Run <code>#discover_upgrade_scenarios</code> → target .NET 10</div>
    <div class="demo-item"><span class="check">▸</span> Walk through assessment: 88 projects, 286K LOC, 5,016 issues</div>
    <div class="demo-item"><span class="check">▸</span> Show how the baseline report drives all subsequent planning</div>
  </div>
</div>

<!--
DEMO SCRIPT — Modernization Assessment (~3 min)
═════════════════════════════════════════════════

SETUP: VS Code Insiders with Orchard CMS repo, AppMod MCP NuGet installed.

1. SHOW CONFIG (30 sec)
   - Open .vscode/mcp.json — show the Microsoft.GitHubCopilot.AppModernization.Mcp
     server configuration plus context7 MCP
   - Point out: workspace-level config, committed to repo, same for everyone

2. RUN ASSESSMENT (1 min)
   - Run: #discover_upgrade_scenarios
   - Respond: "Yes, target .NET 10"
   - Show generated files: assessment.csv, assessment.md, assessment.json, scenario.json

3. WALK THROUGH REPORT (1.5 min)
   - 88 projects, all require upgrade (all net48, all non-SDK-style)
   - 93 NuGet packages (41 need upgrade)
   - 286K LOC across 4,549 code files — 5,016 issues found
   - Most modules rated 🔴 High difficulty (WAP project type)
   - "This baseline drives everything: layers, skill selection, migration ordering"
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 8 — BREAKING DOWN THE MONSTER                   ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Breaking Down the Monster — Dependency Layers</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.4rem; align-items: stretch; justify-content: center; padding: 0.35rem 1.8rem 0.65rem;">
    <div style="display: flex; gap: 0.8rem; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.4rem;">
        <div class="callout" style="background: #fff0ec; border-left: 4px solid var(--theme-accent); font-size: 0.85em;">
          <strong>⚠️ A 10K LOC PR is unacceptable and will never get merged</strong> — AppMod stalls.
        </div>
        <div class="agent-pattern-card" style="border-top: 4px solid var(--theme-accent2); padding: 0.5rem 0.65rem;">
          <span class="agent-pattern-label">📋 The Approach</span>
          <p style="margin: 0.15rem 0 0; font-size: 0.8rem; color: var(--theme-muted);"><strong>1.</strong> Build a <strong>dependency tree</strong>, identify leaf nodes</p>
          <p style="margin: 0.1rem 0 0; font-size: 0.8rem; color: var(--theme-muted);"><strong>2.</strong> Modernize leaves first — breadth-first layered traversal</p>
          <p style="margin: 0.1rem 0 0; font-size: 0.8rem; color: var(--theme-muted);"><strong>3.</strong> Each phase = <strong>working app + reviewable PR</strong></p>
          <p style="margin: 0.1rem 0 0; font-size: 0.8rem; color: var(--theme-muted);"><strong>4.</strong> Projects within the same layer can be modernized <strong>in parallel</strong></p>
        </div>
        <div class="agent-pattern-card" style="border-top: 4px solid #d97706;">
          <span class="agent-pattern-label" style="color: #b45309; background: rgba(217,119,6,0.1);">🔄 SDK-Style Conversion First</span>
          <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Convert to SDK-style + PackageReference is the <strong>mandatory gating step</strong></p>
          <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Often the largest single PR — mixing old/new format is "hit or miss"</p>
        </div>
        <div class="agent-pattern-card" style="border-top: 4px solid #0d6e6e;">
          <span class="agent-pattern-label" style="color: #0d6e6e; background: rgba(13,110,110,0.1);">🌿 Strangler Fig for ASP.NET</span>
          <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Core app sits in front, proxies unmigrated routes to legacy Framework app, migrate incrementally</p>
        </div>
      </div>
      <div style="flex: 1; display: flex; align-items: stretch;">
        <div style="background: white; border-radius: 12px; padding: 0.8rem; border: 1px solid var(--theme-line); box-shadow: 0 2px 8px rgba(0,0,0,0.05); width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">

```mermaid {theme: 'neutral', scale: 0.65}
graph TD
    A[🌿 Leaf Project A<br/>Utilities] -->|Phase 1| B[📦 Shared Lib B<br/>Data Access]
    C[🌿 Leaf Project C<br/>Logging] -->|Phase 1| B
    B -->|Phase 2| D[🔧 Service Layer D<br/>Business Logic]
    E[🌿 Leaf Project E<br/>Auth] -->|Phase 2| D
    D -->|Phase 3| F[🎯 Web App F<br/>ASP.NET Core]
    style A fill:#dcfce7,stroke:#16a34a
    style C fill:#dcfce7,stroke:#16a34a
    style E fill:#dcfce7,stroke:#16a34a
    style B fill:#e0f2fe,stroke:#0284c7
    style D fill:#fef3c7,stroke:#d97706
    style F fill:#fce7f3,stroke:#db2777
```

</div>
      </div>
    </div>
  </div>
</div>

<!--
Break the problem into dependency layers, start at the leaves, keep PRs small.
AI makes this repeatable. SDK-style conversion is the biggest hurdle — plan for
a large PR and get it done first. The layered approach enables parallelization
within each layer. For web apps, Strangler Fig was explicitly and strongly
recommended by the CAT team — Core in front, proxy to Framework, migrate
incrementally. Avoids the "turn it on at the end and hope" anti-pattern.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 9 — DEMO 2: DEPENDENCY LAYER EXTRACTION         ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">📦</div>
  <h1 class="demo-title">Demo 2: Dependency Layer Extraction — Orchard CMS</h1>
  <p class="demo-subtitle">Run the appmod-layer-planner skill against Orchard CMS (~88 projects)</p>
  <div class="demo-badge">🎬 ~5 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Run appmod-layer-planner skill against Orchard.sln</div>
    <div class="demo-item"><span class="check">▸</span> Show generated layer-plan.md — Mermaid diagram, 15 phases</div>
    <div class="demo-item"><span class="check">▸</span> Phase 0: SDK-style conversion (all 88 projects, gating step)</div>
    <div class="demo-item"><span class="check">▸</span> Phase 2: Orchard.Framework — critical path bottleneck (1,682 story pts)</div>
    <div class="demo-item"><span class="check">▸</span> Show how the layer plan feeds into build-fix and parallel execution</div>
  </div>
</div>

<!--
DEMO SCRIPT — Dependency Layer Extraction (~5 min)
═══════════════════════════════════════════════════

SETUP: Orchard CMS repo with assessment from Demo 1 already generated.

1. RUN THE SKILL (2 min)
   - Run the appmod-layer-planner skill against Orchard.sln
   - Show the generated layer-plan.md with Mermaid dependency diagram
   - Walk through: Phase 0 (SDK-style) → Phase 1 (5 leaf projects) →
     Phase 2 (Orchard.Framework bottleneck) → Phases 4a/4b (20 modules)

2. KEY FINDINGS (2 min)
   - Phase 0: all 88 projects must convert to SDK-style first (gating step)
   - Phase 1 foundation: NHibernate.Linq, WarmupStarter, CLI tools — parallelizable
   - Phase 2: Orchard.Framework is the critical path (709 mandatory issues)
   - Phase 15: integration tests as the final validation gate

3. WRAP (1 min)
   - "This plan drives everything — which agents to launch, what skills to
     build, how to parallelize. Without it, you're flying blind."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 10 — SKILLS OVER PROMPTS                        ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Skills Over Prompts — The Shift That Changed Everything</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.35rem; align-items: stretch; padding: 0.3rem 1.8rem 0.6rem;">
    <div style="display: flex; gap: 0.65rem; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0;">
        <div class="agent-pattern-card" style="border-top: 4px solid var(--theme-accent); padding: 0.45rem 0.65rem; height: 100%;">
          <span class="agent-pattern-label" style="color: var(--theme-accent); background: rgba(254,91,56,0.1);">📈 The Workshop Arc</span>
          <ul class="agent-pattern-list" style="font-size: 1.1rem; line-height: 1.35; margin-top: 0.1rem;">
            <li><strong>Day 1:</strong> Engineers build prompts (familiar, comfortable)</li>
            <li><strong>Day 2:</strong> Prompts hit limits — skills emerge as better fit</li>
            <li><strong>Day 3-4:</strong> Team becomes a "Skill &amp; Agent factory"</li>
            <li><strong>End of week:</strong> 20+ skills, only ~2 prompts remain</li>
          </ul>
        </div>
      </div>
      <div style="flex: 0.85; display: flex; flex-direction: column; align-items: center; justify-content: flex-start; gap: 0.45rem;">
        <div class="pyramid-stack" style="width: 100%;">
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/custom-instructions" target="_blank" style="margin: 0 0; background: linear-gradient(90deg, #0a2e4a, #103954); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">1</span>
            <span class="pyramid-name">Instructions</span>
            <span class="pyramid-desc">Always-on repo/path conventions</span>
          </a>
          <a class="pyramid-layer pyramid-layer-faded" href="https://code.visualstudio.com/docs/copilot/customization/prompt-files" target="_blank" style="margin: 0 0.5rem; background: linear-gradient(90deg, #114D8B, #1a5ea8); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">2</span>
            <span class="pyramid-name">Prompts</span>
            <span class="pyramid-desc">Fading away — convert to skills</span>
          </a>
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/mcp-servers" target="_blank" style="margin: 0 1.1rem; background: linear-gradient(90deg, #085f92, #0d83c0); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">3</span>
            <span class="pyramid-name">MCP</span>
            <span class="pyramid-desc">AppMod MCP NuGet — core tooling</span>
          </a>
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/custom-agents" target="_blank" style="margin: 0 1.8rem; background: linear-gradient(90deg, #0c6484, #1088ac); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">4</span>
            <span class="pyramid-name">Agents</span>
            <span class="pyramid-desc">Specialist personas with tool scopes</span>
          </a>
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/agent-skills" target="_blank" style="margin: 0 2.7rem; background: linear-gradient(90deg, #077769, #08a08d); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">5</span>
            <span class="pyramid-name">Skills</span>
            <span class="pyramid-desc">★ 20+ built during workshop</span>
          </a>
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/hooks" target="_blank" style="margin: 0 3.7rem; background: linear-gradient(90deg, #0a7f59, #0da977); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">6</span>
            <span class="pyramid-name">Hooks</span>
            <span class="pyramid-desc">Deterministic lifecycle commands</span>
          </a>
          <a class="pyramid-layer" href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank" style="margin: 0 4.8rem; background: linear-gradient(90deg, #5635a0, #7850c0); text-decoration: none; cursor: pointer;">
            <span class="pyramid-num">7</span>
            <span class="pyramid-name">Plugins</span>
            <span class="pyramid-desc">Package &amp; share via org marketplace</span>
          </a>
        </div>
        <div style="display: flex; gap: 0.5rem; width: 100%;">
          <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #077769;">
            <span class="agent-pattern-label" style="color: #077769; background: rgba(7,119,105,0.1);">🧩 Skills = Building Blocks</span>
            <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Deterministic, portable, discoverable</p>
            <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);"><a href="https://agentskills.io/" target="_blank">agentskills.io</a> open standard</p>
          </div>
          <div class="agent-pattern-card" style="flex: 1; border-top: 4px solid #5635a0;">
            <span class="agent-pattern-label" style="color: #5635a0; background: rgba(86,53,160,0.1);">🏢 Org Marketplace</span>
            <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);"><a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank">Agent Plugins</a> for sharing</p>
            <p style="margin: 0.2rem 0 0; font-size: 0.82rem; color: var(--theme-muted);">Private marketplace at scale</p>
          </div>
        </div>
      </div>
    </div>
    <div class="callout callout-teal" style="font-size: 0.82em;">
      <strong>Key insight:</strong> "The tool is not to modernize the code — the tool is to help you build the <em>process</em> to modernize the code."
    </div>
  </div>
</div>

<!--
This is the core operating model shift. Skills are deterministic, portable,
discoverable. Prompts are throwaway. The workshop proved this over 4 days.

Show the 7-layer customization stack but highlight where the workshop focused:
Skills (layer 5) and MCP (layer 3) did 90% of the heavy lifting. Prompts
(layer 2) faded. Plugins (layer 7) are how you share everything with your org.

Key tools: Sensei for skill quality validation, Skill Creator for scaffolding,
Prompt→Skill converter for migrating existing prompts.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 11 — DEMO 3: THE PROMPT→SKILL PIPELINE          ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔧</div>
  <h1 class="demo-title">Demo 3: The Prompt→Skill Pipeline</h1>
  <p class="demo-subtitle">Create, refine, and share skills — the workflow the team used every day</p>
  <div class="demo-badge">🎬 ~5 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Create a skill using skill-creator (scaffold + validate with Sensei)</div>
    <div class="demo-item"><span class="check">▸</span> Show the prompt→skill refinement loop: run → inspect → adjust → re-run</div>
    <div class="demo-item"><span class="check">▸</span> Introduce Agent Plugins — package and share skills as installable units</div>
    <div class="demo-item"><span class="check">▸</span> Show agent selecting the skill automatically</div>
  </div>
</div>

<!--
DEMO SCRIPT — The Prompt→Skill Pipeline (~5 min)
═════════════════════════════════════════════════════════

SETUP: VS Code Insiders with .github/skills/ configured, Sensei installed.

1. CREATE A SKILL (2 min)
   - Use skill-creator to scaffold a new skill
   - Show the generated SKILL.md with frontmatter
   - Run Sensei to validate — show before/after improvements
   - The appmod-layer-planner was created this way

2. REFINEMENT LOOP (1.5 min)
   - Show how the layer planner evolved from a naive prompt into a skill
   - Day 1: prompt choked — context window pressure, output too large
   - Day 2: refined into incremental, loop-based skill
   - "The little loop of create→test→refine is normal and expected"

3. AGENT PLUGINS (1 min)
   - Show Agent Plugins for packaging and sharing
   - Show github/awesome-copilot — the community marketplace
   - "Every org should create their own agent plugin repo"

4. WRAP (30 sec)
   - "By day 3, the team was a Skill & Agent factory.
     Each skill amplified everyone."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 12 — THE BUILD-FIX LOOP & TESTING               ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Build-Fix Loop &amp; Testing</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.6rem;align-items:stretch;justify-content:center;">
    <div class="flow-pipeline" style="justify-content: center; gap: 0.6rem;">
      <div class="flow-step">🎯 Add Target</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">🔴 Build Fails</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step flow-step-active">🤖 Agent Fixes</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">🟢 Build Clean</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">✅ Commit</div>
      <span class="flow-arrow">→</span>
      <div class="flow-step">➡️ Next Project</div>
    </div>
    <div class="iq-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr)); align-items: stretch;">
      <div class="iq-pillar iq-work">
        <span class="iq-header-pill iq-header-work"><span class="iq-header-icon">🔄</span><span>The Inner Engine</span></span>
        <p class="iq-card-summary">Agents run <code>dotnet build</code>, observe failures, apply fixes, and repeat until stable.</p>
        <p class="iq-card-summary">Enable <strong>auto-approval</strong> for safe commands and intervene at <strong>review + commit boundaries</strong>.</p>
      </div>
      <div class="iq-pillar iq-fabric">
        <span class="iq-header-pill iq-header-fabric"><span class="iq-header-icon">🧪</span><span>Testing Strategy</span></span>
        <p class="iq-card-summary"><strong>Testing is the primary constraint</strong> on safe modernization when legacy suites are thin.</p>
        <p class="iq-card-summary">Prioritize <strong>integration and end-to-end tests</strong> for behavioral parity over implementation-level rewrites.</p>
      </div>
      <div class="iq-pillar iq-foundry">
        <span class="iq-header-pill iq-header-foundry"><span class="iq-header-icon">🏗️</span><span>Orchard CMS Example</span></span>
        <p class="iq-card-summary">Convert Orchard.Tags to SDK-style, fix NHibernate package failures, build clean, commit, and move to the next module.</p>
      </div>
    </div>
    <div class="callout-teal callout" style="text-align:center;">
      <strong>💬</strong> "Make changes that are required to get you to modern .NET. Don't do all sorts of nice fluffy things."
    </div>
  </div>
</div>

<!--
The build-fix loop is the inner engine of the migration. Once you trust it,
agents can churn through dozens of projects. Scope it: one project at a time,
commit at each boundary. Testing was repeatedly described as the primary
constraint — don't chase unit coverage on legacy code, focus on behavioral
parity at the integration level. The goal is confidence, not coverage metrics.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 13 — GO ASYNC                                   ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Go Async — Stop Watching Agents</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.4rem 1.8rem 0.7rem;">
    <div class="callout" style="background: #e8f4fd; border-left: 4px solid var(--theme-accent2); padding: 0.5rem 1rem; font-size: 1.32em; margin-bottom: 0.3rem;">
      <strong>💬</strong> "Just shove it to the background. Let's go do something else, right?" and "You can't watch it."
    </div>
    <div class="iq-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0.6rem; align-items: stretch;">
      <div class="iq-pillar iq-fabric">
        <span class="iq-header-pill iq-header-fabric"><span class="iq-header-icon">📈</span><span style="font-size: 1.05rem;">The Confidence Curve</span></span>
        <ul class="agent-pattern-list" style="margin-top: 0.2rem; font-size: 1.26rem;">
          <li><strong>Day 1-2:</strong> Engineers watched every step.</li>
          <li><strong>Day 3:</strong> First attempts at parallelization.</li>
          <li><strong>Day 4:</strong> Async execution drove massive acceleration.</li>
        </ul>
      </div>
      <div class="iq-pillar iq-foundry">
        <span class="iq-header-pill iq-header-foundry"><span class="iq-header-icon">⚡</span><span style="font-size: 1.05rem;">Parallelization Tools</span></span>
        <ul class="agent-pattern-list" style="margin-top: 0.2rem; font-size: 1.26rem;">
          <li><strong>Agent Panel:</strong> multiple agent conversations.</li>
          <li><strong>#runSubagent:</strong> delegate subtasks to isolated contexts.</li>
          <li><strong>Fleets / Squads:</strong> coordinated multi-agent teams.</li>
        </ul>
      </div>
      <div class="iq-pillar iq-work">
        <span class="iq-header-pill iq-header-work"><span class="iq-header-icon">📦</span><span style="font-size: 1.05rem;">Layer-Based Parallelization</span></span>
        <ul class="agent-pattern-list" style="margin-top: 0.2rem; font-size: 1.26rem;">
          <li>Dependency layers unlock safe concurrency.</li>
          <li>Projects in the same layer can run in parallel.</li>
          <li><strong>Orchard CMS:</strong> 5 leaf modules modernized as independent PRs.</li>
        </ul>
      </div>
    </div>
    <div class="callout-teal callout" style="text-align:center; font-size: 1.32em;">
      <strong>💡 Key insight:</strong> confidence took 2-3 days to build, enabled by skills, dependency layers, and /troubleshoot.
    </div>
  </div>
</div>

<!--
The acceleration from async execution was dramatic. But it didn't happen on
day 1. Engineers needed the confidence that comes from skills (deterministic
behavior), dependency layers (bounded scope), and /troubleshoot (diagnosis when
things go wrong). Once those were in place, going async was natural. The
dependency layer plan is what makes parallelization possible — projects in
the same layer have no inter-dependencies.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 14 — DEMO 4: ASYNC PARALLEL EXECUTION           ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">⚡</div>
  <h1 class="demo-title">Demo 4: Async Parallel Execution — Orchard Modules</h1>
  <p class="demo-subtitle">Fire off parallel AppMod tasks across Orchard CMS leaf modules</p>
  <div class="demo-badge">🎬 ~3 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Identify Phase 1 leaf projects from the layer plan</div>
    <div class="demo-item"><span class="check">▸</span> Open multiple Agent Panels — one per leaf module</div>
    <div class="demo-item"><span class="check">▸</span> Fire off parallel modernizations (NHibernate.Linq, WarmupStarter, Orchard CLI)</div>
    <div class="demo-item"><span class="check">▸</span> Show context isolation — each agent works independently</div>
    <div class="demo-item"><span class="check">▸</span> Review results — each produces an independent, reviewable PR</div>
  </div>
</div>

<!--
DEMO SCRIPT — Async Parallel Execution (~3 min)
═════════════════════════════════════════════════

SETUP: Orchard CMS with layer plan generated. Leaf modules identified.

1. PARALLEL LAUNCH (1 min)
   - Open 3 Agent Panel conversations
   - Agent 1: "Modernize NHibernate.Linq to SDK-style for net10.0"
   - Agent 2: "Modernize WarmupStarter to SDK-style for net10.0"
   - Agent 3: "Modernize Orchard CLI to SDK-style for net10.0"

2. CONTEXT ISOLATION (1 min)
   - Show that each agent runs independently
   - No shared context pollution
   - Each creates its own branch and commit

3. WRAP (1 min)
   - "Day 4 looked like this. Fire and forget. Review and merge.
     The parallelization is where the 10× comes from."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 15 — OBSERVABILITY & THE 100× PATTERN           ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The 100× Pattern</h1>
  </div>
  <div class="slide-body" style="flex-direction:column;gap:0.5rem;align-items:stretch;justify-content:center;">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0.25rem;">
      <div class="thought-bubble">
        <span class="thought-bubble-emoji">🧠</span>
        <span>When agents fail, how do we fix it <em>and ensure it never happens again?</em></span>
      </div>
      <div class="thought-dots"><span></span><span></span><span></span></div>
    </div>
    <div class="highlight-strip">
      <div class="highlight-pill" v-click="1">
        <span class="iq-header-pill iq-header-work iq-header-pill-outline"><span class="iq-header-icon">🔍</span><span>Observe</span></span>
        <span class="hl-desc"><strong>Chat Debug / /troubleshoot</strong> — Started the week as the <em>most useful tool</em> for understanding when/why AppMod MCP and skills "go astray". On day 4, VS Code Insiders enabled enhanced Chat Debug — <strong>game changing!</strong></span>
      </div>
      <div class="highlight-pill" v-click="2">
        <span class="iq-header-pill iq-header-foundry iq-header-pill-outline"><span class="iq-header-icon">🔧</span><span>Diagnose</span></span>
        <span class="hl-desc"><strong>10×: /troubleshoot</strong> — Ask why:<br/><code>/troubleshoot Why did you do X rather than Y?</code><br/>Understand the agent's reasoning and pinpoint mistakes.</span>
      </div>
      <div class="highlight-pill" v-click="3">
        <span class="iq-header-pill iq-header-fabric iq-header-pill-outline"><span class="iq-header-icon">⚡</span><span>Fix Permanently</span></span>
        <span class="hl-desc"><strong>100×: /troubleshoot + Update Skill</strong> — Ask and fix:<br/><code>/troubleshoot Why did you do X rather than Y and then update Skill Z so you don't do that again?</code><br/>Feedback loop that <strong>permanently fixes behavior</strong>.</span>
      </div>
    </div>
    <div class="callout-teal callout" style="text-align:center;" v-click="4">
      <strong>This is the most important operational pattern from the entire workshop.</strong> The 100× comes from compounding — every fix makes the system permanently smarter.
    </div>
  </div>
</div>

<!--
Build this progressively: /troubleshoot alone is 10× because you can diagnose.
Adding "and update the skill" makes it 100× because the fix is permanent.
Every time you close this loop, the system gets smarter. Over 4 days, the
team closed dozens of these loops — the cumulative effect was extraordinary.
Observability is essential for safe scaling — a prerequisite for agent autonomy.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 16 — DEMO 5: /troubleshoot & 100× PATTERN      ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔍</div>
  <h1 class="demo-title">Demo 5: /troubleshoot &amp; The 100× Pattern</h1>
  <p class="demo-subtitle">Observe, diagnose, update the skill — permanently fix the behavior</p>
  <div class="demo-badge">🎬 ~5 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Trigger an AppMod task that makes a known mistake</div>
    <div class="demo-item"><span class="check">▸</span> Use /troubleshoot to diagnose WHY</div>
    <div class="demo-item"><span class="check">▸</span> Ask: "update Skill Z so you don't do that again"</div>
    <div class="demo-item"><span class="check">▸</span> Re-run — show the behavior is permanently fixed</div>
  </div>
</div>

<!--
DEMO SCRIPT — /troubleshoot & The 100× Pattern (~5 min)
════════════════════════════════════════════════════════

SETUP: A skill that has a known edge case it handles incorrectly.

1. TRIGGER THE MISTAKE (1 min)
   - Run an AppMod task on an Orchard module that goes astray
   - e.g., agent incorrectly rewrites NHibernate session management
   - Show the incorrect behavior in the output

2. DIAGNOSE WITH /TROUBLESHOOT (1.5 min)
   - Run: /troubleshoot why did you use X approach rather than Y?
   - Walk through the diagnosis output
   - Show the Chat Debug view

3. THE 100× FIX (2 min)
   - Ask: "Why did you do X rather than Y and update Skill Z"
   - Show the skill being updated with new instructions
   - Re-run the same task — show correct behavior

4. WRAP (30 sec)
   - "This loop is the 100× multiplier. Every fix is permanent.
     The team gets smarter every session."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 17 — WHAT TO DO NOW                             ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>What To Do Now</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.5rem 1.8rem 0.7rem;">
    <div class="card-grid" style="gap: 0.5rem; flex: 1;">
      <div class="iq-pillar iq-work">
        <span class="iq-header-pill iq-header-work"><span class="iq-header-icon">💻</span><span>1. VS Code Insiders + MCP</span></span>
        <p class="iq-card-summary">Install <code>Microsoft.GitHubCopilot.AppModernization.Mcp</code> NuGet. Update daily. Remove competing extensions.</p>
      </div>
      <div class="iq-pillar iq-fabric">
        <span class="iq-header-pill iq-header-fabric"><span class="iq-header-icon">📋</span><span>2. Workspace Config</span></span>
        <p class="iq-card-summary">Configure <code>mcp.json</code> + <code>custom-instructions.md</code> for team consistency and repeatability.</p>
      </div>
      <div class="iq-pillar iq-foundry">
        <span class="iq-header-pill iq-header-foundry"><span class="iq-header-icon">🎯</span><span>3. Practice on Orchard CMS</span></span>
        <p class="iq-card-summary">Start with <a href="https://github.com/OrchardCMS/Orchard" target="_blank">Orchard CMS</a> — experience the full workflow before a customer engagement.</p>
      </div>
      <div class="iq-pillar iq-foundry">
        <span class="iq-header-pill iq-header-foundry"><span class="iq-header-icon">🔧</span><span>4. Convert Prompts to Skills</span></span>
        <p class="iq-card-summary">Use <a href="https://github.com/spboyer/sensei" target="_blank">Sensei</a> to validate. Create an org plugin marketplace for sharing.</p>
      </div>
      <div class="iq-pillar iq-work">
        <span class="iq-header-pill iq-header-work"><span class="iq-header-icon">📦</span><span>5. Dependency Plan First</span></span>
        <p class="iq-card-summary">Build the layer plan before touching code. Add target → build → fix → commit → next.</p>
      </div>
      <div class="iq-pillar iq-fabric">
        <span class="iq-header-pill iq-header-fabric"><span class="iq-header-icon">🔍</span><span>6. Implement 100× Pattern</span></span>
        <p class="iq-card-summary">/troubleshoot → diagnose → update skill → permanently fix. Close the feedback loop.</p>
      </div>
    </div>
    <div class="callout" style="background: #e8f4fd; border-left: 4px solid var(--theme-accent2); font-size: 0.88em; text-align: center;">
      Many customers claim AI Dev expertise but are <strong>months out of date</strong> — and in Agentic AI, <strong>months = years</strong>. Running workshops like this is a huge opportunity to differentiate.
    </div>
  </div>
</div>

<!--
Each action maps to a section they just saw. This entire approach is teachable
and repeatable. Emphasize: many customers claim expertise but are months behind.
Running workshops like this is the partner opportunity.
-->

---
transition: slide-up
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 18 — KEY TAKEAWAYS                              ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Key Takeaways — Seven Learnings</h1>
  </div>
  <div class="slide-body" style="align-items: stretch; padding: 0.5rem 1.8rem;">
    <div class="takeaway-grid" style="width: 100%; flex: 1;">
      <div v-click class="takeaway-item">
        <span class="takeaway-num">1</span>
        <div class="takeaway-text"><strong>There is no single-click AppMod for real apps.</strong> Stop promising it. Start structuring it.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">2</span>
        <div class="takeaway-text"><strong>Skills &gt; Prompts.</strong> The team that builds skills accelerates the entire org.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">3</span>
        <div class="takeaway-text"><strong>Break the monster into layers.</strong> Leaf-first, small PRs, always shippable.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">4</span>
        <div class="takeaway-text"><strong>SDK-style conversion is the hardest step.</strong> Plan for a large PR and get it done first.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">5</span>
        <div class="takeaway-text"><strong>Strangler Fig for ASP.NET.</strong> Core in front, proxy back to Framework, shrink incrementally.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">6</span>
        <div class="takeaway-text"><strong>Go async or go home.</strong> Parallelization is where the 10× comes from.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">7</span>
        <div class="takeaway-text"><strong>Close the feedback loop.</strong> /troubleshoot + skill update = 100× compounding improvement.</div>
      </div>
    </div>
  </div>
</div>

<!--
Progressive reveal — build each principle one click at a time.
These seven principles are battle-tested on a 10M LOC app with the Microsoft
AppMod CAT team. They map directly to the workshop experience.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 19 — CHEAT SHEET (photographable reference card)
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>📸 Cheat Sheet — Photograph This!</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; padding: 0.6rem 1.5rem;">
    <div class="two-col-grid" style="width: 100%; gap: 0.5rem; align-items: stretch;">
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>1. No magic single-click</h3>
          <p>Standard .NET AppMod + AI automation. Phases, leaf-first, small PRs. <strong>Structure, not sizzle.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>2. Skills &gt; Prompts</h3>
          <p>Convert prompts to skills. Validate with Sensei. Build an org skill library. <strong>Deterministic, portable.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>3. Dependency layers</h3>
          <p>Multi-layer upgrade plan. Start at leaves. Each phase = working app + mergeable PR.</p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>4. SDK-style first</h3>
          <p>Mandatory gating step. Largest single PR. Once done, everything else gets easier.</p>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.4rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>5. Strangler Fig</h3>
          <p>Core in front, proxy to Framework, migrate incrementally. Never "turn it on and hope."</p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>6. Go async</h3>
          <p>Agent Panel, subagents, fleets. Stop watching. <strong>Parallelization = 10×.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>7. The 100× pattern</h3>
          <p>/troubleshoot → diagnose → update skill → permanent fix. <strong>Compounding improvement.</strong></p>
        </div>
        <div class="callout" style="font-size: 0.78em; margin: 0;">
          <strong>Start here: </strong>
          <a href="https://www.nuget.org/packages/Microsoft.GitHubCopilot.AppModernization.Mcp">AppMod MCP NuGet</a> ·
          <a href="https://github.com/spboyer/sensei">Sensei</a> ·
          <a href="https://agentskills.io/">agentskills.io</a> ·
          <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins">Agent Plugins</a> ·
          <a href="https://learn.microsoft.com/en-us/training/support/mcp">MS Learn MCP</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the "photograph this" slide — pause here and let people take photos.
Condensed reference card of the 7 principles plus key links. Everything they
need to get started after the session.
-->

---
layout: center
class: text-center
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 20 — THANK YOU / Q&A                           ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="thankyou-shell">
  <h1 style="font-size: 2.8rem;">Thank You!</h1>
  <p style="color: var(--theme-muted); font-size: 1.1rem; max-width: 32rem;">
    Questions? Let's go deeper on anything — or I can spin up a live demo on the spot.
  </p>
  <div class="thankyou-links">
    <a href="https://github.com/PlagueHO" target="_blank">GitHub</a>
    <a href="https://danielscottraynsford.com" target="_blank">Website</a>
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank">Slides Source</a>
  </div>
  <div class="cta-box" style="max-width: 40rem; margin-top: 0.8rem;">
    <div>
      <p style="font-weight: 600;">Key Links</p>
      <p style="font-size: 0.8em; opacity: 0.8;">
        <a href="https://www.nuget.org/packages/Microsoft.GitHubCopilot.AppModernization.Mcp" target="_blank" style="color: rgba(255,255,255,0.85);">AppMod MCP NuGet</a> ·
        <a href="https://github.com/spboyer/sensei" target="_blank" style="color: rgba(255,255,255,0.85);">Sensei</a> ·
        <a href="https://agentskills.io/" target="_blank" style="color: rgba(255,255,255,0.85);">agentskills.io</a> ·
        <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank" style="color: rgba(255,255,255,0.85);">Agent Plugins</a> ·
        <a href="https://learn.microsoft.com/en-us/training/support/mcp" target="_blank" style="color: rgba(255,255,255,0.85);">MS Learn MCP</a> ·
        <a href="https://www.youtube.com/watch?v=umcl-Ooaay4" target="_blank" style="color: rgba(255,255,255,0.85);">Auckland .NET UG</a> ·
        <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" style="color: rgba(255,255,255,0.85);">Slides Source</a>
      </p>
    </div>
  </div>
</div>

<!--
Open for questions. Offer to walk through any demo in more detail.
Encourage partners to reach out about running workshops for their customers.
-->
