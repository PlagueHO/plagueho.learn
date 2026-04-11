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
    <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" class="hero-qr-url">github.com/PlagueHO/plagueho.learn</a>
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
    <p class="agenda-eyebrow">45 MINUTES · 4 LIVE DEMOS · UNPLUGGED</p>
    <h1 class="agenda-title">Agenda</h1>
  </div>
  <div class="agenda-grid">
    <a href="/5" class="agenda-card agenda-card-1">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">01</span>
      <h2>The Hard Truth</h2>
      <p>No sizzle reels — what large-scale AppMod actually looks like</p>
    </a>
    <a href="/7" class="agenda-card agenda-card-2">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">02</span>
      <h2>Toolchain &amp; Skills</h2>
      <p>VS Code Insiders, AppMod MCP, Skills &gt; Prompts</p>
    </a>
    <a href="/10" class="agenda-card agenda-card-3">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">03</span>
      <h2>Break It Down &amp; Go Async</h2>
      <p>Dependency layers, leaf-first, parallel execution</p>
    </a>
    <a href="/14" class="agenda-card agenda-card-4">
      <div class="agenda-card-accent"></div>
      <span class="agenda-num">04</span>
      <h2>Observability &amp; Playbook</h2>
      <p>The 100× pattern, tool wrangling, partner opportunity</p>
    </a>
  </div>
  <div class="agenda-demos">
    <a href="/9" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 1</span>
        <span class="agenda-demo-desc">Building Skills</span>
      </span>
    </a>
    <a href="/12" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 2</span>
        <span class="agenda-demo-desc">Dependency Analysis</span>
      </span>
    </a>
    <a href="/13" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 3</span>
        <span class="agenda-demo-desc">Async Execution</span>
      </span>
    </a>
    <a href="/16" class="agenda-demo-pill">
      <span class="agenda-demo-pulse"></span>
      <span class="agenda-demo-text">
        <span class="agenda-demo-num">🎬 Demo 4</span>
        <span class="agenda-demo-desc">/troubleshoot &amp; 100×</span>
      </span>
    </a>
  </div>
</div>

<!--
Quick scan of the agenda — don't dwell. Point out the 4 demo markers so
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
    <div style="display: flex; gap: 0.8rem; align-items: stretch;">
      <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
        <h3>🏢 Who</h3>
        <p><strong>Jay Schmelzer</strong> — Director, DevDiv CoreAI AppMod</p>
        <p><strong>Taylor Southwick</strong> — Principal Engineer, AppMod</p>
        <p><strong>Steve Hornblow</strong> &amp; <strong>DSR</strong> — Microsoft EPS hosts</p>
      </div>
      <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
        <h3>🎯 What</h3>
        <p>SDC engagement with partner a in New Zealand</p>
        <p>Target: <strong>10M LOC, 30-year-old .NET application</strong></p>
        <p>Goal: realistic AppMod at enterprise scale using AI</p>
      </div>
      <div class="card" style="flex: 1; border-left: 3px solid #0d6e6e;">
        <h3>💡 Why This Talk</h3>
        <p>The AppMod CAT team brought techniques customers rarely see</p>
        <p>We want <strong>every Agentic DevOps partner</strong> running workshops like this</p>
        <p>These learnings are <strong>directly applicable</strong> to your customer engagements</p>
      </div>
    </div>
  </div>
</div>

<!--
Establish credibility — this isn't theoretical. We did it with the actual
Microsoft AppMod engineering team on a real 10M LOC application. Jay Schmelzer
runs the AppMod org. Taylor Southwick is the principal engineer building the
tooling. Everything in this talk comes from that week.
-->

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
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.5rem 1.8rem 0.8rem;">
    <div class="callout" style="background: #fff0ec; border-left: 4px solid var(--theme-accent); padding: 0.6rem 1rem; font-size: 0.95em;">
      <strong>⚠️ From the AppMod CAT team:</strong> "We get frustrated with AppMod sizzle reels that show magic single-click AI-driven modernization. This is generally not the real and lived experience."
    </div>
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.6rem;">
        <div class="card" style="flex: 1; border-left: 3px solid #dc2626;">
          <h3>❌ What Doesn't Work</h3>
          <p>"Single-click" AI AppMod for non-trivial apps</p>
          <p>If your app is <strong>small enough for single-click</strong>, it's small enough to <strong>rebuild entirely with AI</strong></p>
          <p>Promising magic leads to <strong>disappointment</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid #16a34a;">
          <h3>✅ What Does Work</h3>
          <p>Follow <strong>standard .NET AppMod approach</strong> and techniques</p>
          <p>Leverage AI to <strong>automate and make it repeatable</strong></p>
          <p>Break into <strong>phases with small, reviewable PRs</strong></p>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.6rem;">
        <div class="card" style="flex: 1; border-color: var(--theme-accent2); border-width: 2px;">
          <h3>📏 The Scale Threshold</h3>
          <p style="font-size: 0.85em;"><strong>&lt; 50K LOC</strong> — AI can probably handle most of it with guidance</p>
          <p style="font-size: 0.85em;"><strong>50K–500K LOC</strong> — structured AI-assisted approach essential</p>
          <p style="font-size: 0.85em;"><strong>500K+ LOC</strong> — multi-layer dependency planning, custom skills, incremental phases</p>
        </div>
        <div class="callout callout-teal" style="font-size: 0.82em;">
          <strong>📺 Pre-requisite:</strong> You MUST understand standard .NET AppMod before starting. Auckland .NET User Group recording — <em>Modernizing ASP.NET Framework to Core in 2026</em>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the "what doesn't work" part of the title. Set expectations correctly.
The AppMod CAT team's own words: stop promising magic. If your customer has a
50K+ LOC app, single-click won't work. But structured AI-assisted modernization
is incredibly effective — that's the rest of this talk.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 6 — THE RIGHT TOOLCHAIN                        ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Right Toolchain</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.5rem 1.8rem 0.8rem;">
    <div class="callout" style="background: #e8f4fd; border-left: 4px solid var(--theme-accent2); padding: 0.6rem 1rem; font-size: 0.92em;">
      <strong>💬 Jay Schmelzer (Director, DevDiv CoreAI AppMod):</strong> "Everyone in DevDiv uses Insiders, no one uses stable. We recommend all customers use Insiders unless they have some compliance reason not to or are restricted from installing their own tools."
    </div>
    <div style="display: flex; gap: 0.7rem; align-items: stretch; flex: 1;">
      <div class="card" style="flex: 1; border-color: var(--theme-accent2); border-width: 2px;">
        <h3>💻 VS Code Insiders</h3>
        <p>AI Dev moves so fast that by the time a feature reaches Stable, <strong>the state of the art has moved on</strong></p>
        <p>When developers complain "Claude does X but GitHub doesn't" — <strong>it's because they're on old builds</strong></p>
      </div>
      <div class="card" style="flex: 1; border-color: #16a34a; border-width: 2px;">
        <h3>⬆️ Update Aggressively</h3>
        <p>Every day we started with an update</p>
        <p>Solutions to <strong>yesterday's problems</strong> often arrived in <strong>today's update</strong></p>
        <p>New features appeared <strong>every single day</strong> that were beneficial</p>
      </div>
    </div>
    <div style="display: flex; gap: 0.7rem; align-items: stretch;">
      <div class="card" style="flex: 1; border-color: #5635a0; border-width: 2px;">
        <h3>📦 AppMod MCP NuGet</h3>
        <p>Use <code>Microsoft.GitHubCopilot.AppModernization.Mcp</code> NuGet package</p>
        <p>This gives you access to the <strong>official App Mod tools and agents</strong></p>
      </div>
      <div class="card" style="flex: 1; border-color: #dc2626; border-width: 2px;">
        <h3>⚠️ Extension Hygiene</h3>
        <p>Multiple competing AppMod extensions from Microsoft — <strong>they confuse agents</strong></p>
        <p><strong>Remove all</strong> AppMod extensions. Use <strong>only</strong> the NuGet MCP package.</p>
        <p>We ran into far fewer issues this way</p>
      </div>
    </div>
  </div>
</div>

<!--
This is practical, day-1 advice. Before you write a single line of code, get
your toolchain right. Insiders + daily updates + AppMod MCP NuGet + remove
competing extensions. This alone eliminated half our issues in the first two days.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 7 — SKILLS OVER PROMPTS                        ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Skills Over Prompts — The Shift That Changed Everything</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.4rem 1.8rem 0.7rem;">
    <div style="display: flex; gap: 0.7rem; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="border-left: 3px solid var(--theme-accent); flex: 1;">
          <h3>📈 The Workshop Arc</h3>
          <p><strong>Day 1:</strong> Engineers build prompts (familiar, comfortable)</p>
          <p><strong>Day 2:</strong> Prompts hit limits — skills emerge as better fit</p>
          <p><strong>Day 3–4:</strong> Team becomes a "Skill &amp; Agent factory"</p>
          <p><strong>End of week:</strong> 20+ skills, only ~2 prompts remain</p>
        </div>
        <div class="callout callout-teal" style="font-size: 0.85em;">
          <strong>DevDiv note:</strong> "We expect prompts to fade away." Very few use cases where a skill isn't a better fit.
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="border-color: #5635a0; border-width: 2px;">
          <h3>🔄 The Skill Workflow</h3>
          <p>Use your <strong>agent conversation</strong> to construct and refine skills</p>
          <p>Skills are repeatable process building blocks called by agents <strong>like tools</strong></p>
          <p>Once engineers felt comfortable, they <strong>amplified the entire team</strong> — "more repeatable and deterministic"</p>
        </div>
        <div class="card" style="border-color: #0d6e6e; border-width: 2px;">
          <h3>🛠️ Key Tools</h3>
          <p><a href="https://github.com/spboyer/sensei" target="_blank"><strong>Sensei</strong></a> — ensure agents select the correct skill</p>
          <p><a href="https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/skill-creator" target="_blank"><strong>Skill Creator</strong></a> — build skills correctly &amp; optimally</p>
          <p><a href="https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/convert-prompt-to-skill" target="_blank"><strong>Prompt → Skill</strong></a> — convert existing prompts</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
This is the core operating model shift. Skills are deterministic, portable,
discoverable. Prompts are throwaway. The workshop proved this over 4 days with
real engineers working on a real 10M LOC app.

Key insight: once engineers started building skills instead of prompts, they
became a factory — each skill amplified everyone on the team. This is the
multiplier effect.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 8 — SKILLS DEEP DIVE: THE ECOSYSTEM            ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Skills Ecosystem</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.55rem; align-items: stretch; padding: 0.4rem 1.8rem 0.7rem;">
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start;">
      <div class="pyramid-stack" style="width: 58%;">
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
          <span class="pyramid-desc">AppMod MCP NuGet — the core tooling</span>
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
    </div>
    <div style="display: flex; gap: 0.7rem; align-items: stretch;">
      <div class="card" style="flex: 1; border-color: #077769; border-width: 2px;">
        <h3>🧩 Skills = Repeatable Building Blocks</h3>
        <p>Each skill handles a specialized AppMod edge case. Agents call them like tools. <a href="https://agentskills.io/" target="_blank">agentskills.io</a> open standard.</p>
      </div>
      <div class="card" style="flex: 1; border-color: #5635a0; border-width: 2px;">
        <h3>🏢 Organizational Marketplace</h3>
        <p>Package as <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank">Agent Plugins</a>. Create a <strong>private marketplace</strong> for your org. Discoverability &amp; sharing at scale.</p>
      </div>
    </div>
  </div>
</div>

<!--
Show the 7-layer customization stack but highlight where the workshop focused:
Skills (layer 5) and MCP (layer 3) did 90% of the heavy lifting. Prompts
(layer 2) faded. Plugins (layer 7) are how you share everything with your org.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 9 — DEMO 1: Building & Refining Skills         ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔧</div>
  <h1 class="demo-title">Demo 1: Building &amp; Refining Skills</h1>
  <p class="demo-subtitle">From prompt to skill — the workflow the team used every day</p>
  <div class="demo-badge">🎬 ~5 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Start with a prompt that handles an AppMod edge case</div>
    <div class="demo-item"><span class="check">▸</span> Convert it to a skill using convert-prompt-to-skill</div>
    <div class="demo-item"><span class="check">▸</span> Run Sensei to validate skill quality &amp; routing</div>
    <div class="demo-item"><span class="check">▸</span> Show the agent selecting the skill automatically</div>
  </div>
</div>

<!--
DEMO SCRIPT — Building & Refining Skills (~5 min)
═════════════════════════════════════════════════════════

SETUP: VS Code Insiders open with sample .NET app and .github/skills/ configured.

1. PROMPT → SKILL (2 min)
   - Show a prompt that handles a common AppMod edge case
   - Run: "convert this prompt to a skill"
   - Walk through the generated SKILL.md frontmatter
   - Point out: triggers, description, anti-triggers

2. SENSEI VALIDATION (1.5 min)
   - Run: "run sensei on the new skill"
   - Show before/after frontmatter improvements
   - Key message: "Sensei ensures agents route to the right skill"

3. LIVE ROUTING (1 min)
   - Chat: "modernize this WCF service"
   - Watch Copilot discover and select the skill automatically
   - Key message: "The skill IS the repeatable process"

4. WRAP (30 sec)
   - "By day 3, the team was a Skill & Agent factory.
     Each skill amplified everyone."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 10 — BREAKING DOWN THE MONSTER                  ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Breaking Down the Monster — Dependency Layers</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.4rem 1.8rem 0.7rem;">
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="callout" style="background: #fff0ec; border-left: 4px solid var(--theme-accent); font-size: 0.88em;">
          <strong>⚠️ A 10K LOC PR is unacceptable and will never get merged</strong> — AppMod stalls and never makes progress.
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>📋 The Approach</h3>
          <p><strong>1.</strong> Use AI AppMod tools to build a <strong>multi-layer dependency upgrade plan</strong></p>
          <p><strong>2.</strong> Start at <strong>leaf projects</strong> — work up through the dependency tree</p>
          <p><strong>3.</strong> Each phase = <strong>working application + reviewable PR</strong></p>
          <p><strong>4.</strong> Continuous small incremental change using AI tools, agents &amp; skills</p>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; justify-content: center;">
        <div style="background: white; border-radius: 12px; padding: 0.8rem; border: 1px solid var(--theme-line); box-shadow: 0 2px 8px rgba(0,0,0,0.05);">

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
This is the "how to fix it" part. The key insight: break the problem into
dependency layers, start at the leaves, keep PRs small. AI makes this
repeatable, not magical.

Walk through the Mermaid diagram: leaves (green) → shared libs (blue) →
services (orange) → web app (pink). Each arrow is a phase boundary.
Each phase produces a working app and a mergeable PR.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 11 — DEMO 2: Dependency Analysis                ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">📦</div>
  <h1 class="demo-title">Demo 2: Dependency Analysis &amp; Upgrade Planning</h1>
  <p class="demo-subtitle">Use AppMod MCP to build a multi-layer dependency upgrade plan</p>
  <div class="demo-badge">🎬 ~5 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Analyze the sample app's project dependency tree</div>
    <div class="demo-item"><span class="check">▸</span> Generate a multi-layer upgrade plan (leaf-first)</div>
    <div class="demo-item"><span class="check">▸</span> Show how each phase produces a reviewable PR</div>
    <div class="demo-item"><span class="check">▸</span> Start modernizing a leaf project with AppMod MCP</div>
  </div>
</div>

<!--
DEMO SCRIPT — Dependency Analysis & Upgrade Planning (~5 min)
═════════════════════════════════════════════════════════════

SETUP: Sample .NET Framework solution open with multiple projects.
AppMod MCP NuGet installed.

1. DEPENDENCY ANALYSIS (2 min)
   - Chat: "Analyze the dependency tree of this solution and create a
     multi-layer upgrade plan starting from leaf projects"
   - Walk through the generated plan
   - Point out: leaf identification, phase boundaries, PR scope

2. LEAF MODERNIZATION (2 min)
   - Chat: "Modernize the utilities leaf project in Phase 1"
   - Watch AppMod MCP handle the conversion
   - Show the resulting changes are small and reviewable

3. WRAP (1 min)
   - "Each phase is a working app. Each PR is reviewable.
     The AI handles the repetitive work, you handle the review."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 12 — GO ASYNC                                   ~4 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Go Async — Stop Watching Agents</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.5rem 1.8rem 0.8rem;">
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>📈 The Confidence Curve</h3>
          <p><strong>Day 1–2:</strong> Engineers watched every agent step. Slow, cautious, serial.</p>
          <p><strong>Day 3:</strong> Confidence builds. First attempts at parallelization.</p>
          <p><strong>Day 4:</strong> Firing off parallel tasks, reviewing results async. <strong>Massive acceleration.</strong></p>
        </div>
        <div class="callout callout-teal" style="font-size: 0.85em;">
          <strong>Key insight:</strong> It took 2–3 days to build confidence around async execution. The other practices in this talk (skills, dependency layers, /troubleshoot) are what enabled that confidence.
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="border-color: var(--theme-accent2); border-width: 2px;">
          <h3>⚡ Parallelization Tools</h3>
          <p><strong>Agent Panel</strong> — multiple agent conversations</p>
          <p><strong>#runSubagent</strong> — delegate subtasks</p>
          <p><strong>Fleets</strong> — parallel task execution</p>
          <p><strong>Squads</strong> — coordinated multi-agent teams</p>
        </div>
        <div class="card" style="border-color: #5635a0; border-width: 2px;">
          <h3>🏢 Agent Plugins</h3>
          <p>Package agentic assets as <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank">Agent Plugins</a></p>
          <p>Create a <strong>private marketplace</strong> for your org</p>
          <p>Discoverability &amp; sharing of capabilities at scale</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!--
The acceleration from async execution was dramatic. But it didn't happen on
day 1. Engineers needed the confidence that comes from skills (deterministic
behavior), dependency layers (bounded scope), and /troubleshoot (diagnosis when
things go wrong). Once those were in place, going async was natural.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 13 — DEMO 3: Async Execution                   ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">⚡</div>
  <h1 class="demo-title">Demo 3: Async Parallel Execution</h1>
  <p class="demo-subtitle">Fire off multiple AppMod tasks and stop watching — review results later</p>
  <div class="demo-badge">🎬 ~3 minutes</div>
  <div class="demo-checklist">
    <div class="demo-item"><span class="check">▸</span> Open multiple Agent Panel conversations</div>
    <div class="demo-item"><span class="check">▸</span> Fire off parallel leaf project modernizations</div>
    <div class="demo-item"><span class="check">▸</span> Switch away — do other work while agents run</div>
    <div class="demo-item"><span class="check">▸</span> Come back and review completed results</div>
  </div>
</div>

<!--
DEMO SCRIPT — Async Parallel Execution (~3 min)
═════════════════════════════════════════════════

SETUP: Multiple leaf projects ready for modernization.

1. PARALLEL LAUNCH (1 min)
   - Open 2-3 Agent Panel conversations
   - In each: "Modernize leaf project X using the dependency upgrade plan"
   - Point out: each agent runs independently with its own context

2. ASYNC REVIEW (1.5 min)
   - Switch to a different task or show another feature
   - Come back and show all agents have completed
   - Review results — each produced a small, focused change

3. WRAP (30 sec)
   - "Day 4 looked like this. Fire and forget. Review and merge.
     The parallelization is where the 10× comes from."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 14 — TOOL WRANGLING & WORKSPACE MCP             ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Tool Wrangling &amp; Workspace MCP</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.5rem 1.8rem 0.8rem;">
    <div class="callout" style="background: #fff0ec; border-left: 4px solid var(--theme-accent); padding: 0.6rem 1rem; font-size: 0.92em;">
      <strong>‍✈️ Tool Wrangling is a thing.</strong> A lot of times when things went wrong, it was because tools had become disabled/enabled by different agents.
    </div>
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div class="card" style="flex: 1; border-left: 3px solid #dc2626;">
        <h3>❌ What Goes Wrong</h3>
        <p>Different agents enable/disable different tools</p>
        <p>Agents get confused when too many tools are available</p>
        <p>MCP servers with different names across team members break consistency</p>
      </div>
      <div class="card" style="flex: 1; border-left: 3px solid #16a34a;">
        <h3>✅ How to Fix It</h3>
        <p><strong>Rationalize tools:</strong> ensure agents have only what they need</p>
        <p><strong>Workspace MCPs:</strong> use <code>mcp.json</code> for consistent naming</p>
        <p><strong><a href="https://learn.microsoft.com/en-us/training/support/mcp" target="_blank">Microsoft Learn MCP</a></strong> is critical — but everyone must use the same server names</p>
      </div>
      <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
        <h3>🔑 Practical Tips</h3>
        <p>Commit <code>mcp.json</code> to the repo — workspace-level config</p>
        <p>Remove all AppMod extensions — rely on NuGet MCP only</p>
        <p>Check tool state before starting each session</p>
        <p>Make tool wrangling a <strong>team discipline</strong></p>
      </div>
    </div>
  </div>
</div>

<!--
This is one of the "what doesn't work" items that catches even experienced
teams. Tool wrangling is a real discipline. When things go wrong, check what
tools are enabled before looking at anything else.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 15 — OBSERVABILITY & THE 100× PATTERN           ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The 100× Pattern</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.4rem 1.8rem 0.7rem;">
    <div style="display: flex; gap: 0.7rem; align-items: stretch;">
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="border-color: #c2410c; border-width: 2px;">
          <h3>🔍 Chat Debug / /troubleshoot</h3>
          <p>Started the week as the <strong>most useful tool</strong> for understanding when/why AppMod MCP and skills "go astray"</p>
          <p>On day 4, VS Code Insiders enabled enhanced Chat Debug — <strong>game changing!</strong></p>
        </div>
        <div class="card" style="border-left: 3px solid var(--theme-accent2); flex: 1;">
          <h3>🔍 10×: /troubleshoot</h3>
          <p style="font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 0.82em; background: #f0f6fc; padding: 0.5rem; border-radius: 6px;">/troubleshoot Why did you do X rather than Y?</p>
          <p>Understand the agent's reasoning and diagnose mistakes</p>
        </div>
      </div>
      <div style="flex: 1; display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="border-color: #16a34a; border-width: 2px; flex: 1;">
          <h3>🚀 100×: /troubleshoot + Update Skill</h3>
          <p style="font-family: 'Cascadia Code', 'Consolas', monospace; font-size: 0.82em; background: #f0f6fc; padding: 0.5rem; border-radius: 6px;">/troubleshoot Why did you do X rather than Y<br/><strong>and then update Skill Z so you don't do that again?</strong></p>
          <p>The feedback loop that <strong>permanently fixes behavior</strong>:</p>
          <p><strong>Observe</strong> → <strong>Diagnose</strong> → <strong>Update Skill</strong> → <strong>Never happen again</strong></p>
        </div>
        <div class="callout callout-teal" style="font-size: 0.85em;">
          <strong>This is the most important operational pattern from the entire workshop.</strong> The 100× comes from compounding — every fix makes the system permanently smarter.
        </div>
      </div>
    </div>
  </div>
</div>

<!--
Build this progressively: /troubleshoot alone is 10× because you can diagnose.
Adding "and update the skill" makes it 100× because the fix is permanent.
Every time you close this loop, the system gets smarter. Over 4 days, the
team closed dozens of these loops — the cumulative effect was extraordinary.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 16 — DEMO 4: /troubleshoot & 100× Pattern      ~5 min
     ═══════════════════════════════════════════════════════════ -->

<div class="demo-shell">
  <div class="demo-icon">🔍</div>
  <h1 class="demo-title">Demo 4: /troubleshoot &amp; The 100× Pattern</h1>
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
   - Run an AppMod task that hits the known edge case
   - Show the incorrect behavior in the output
   - "This is a real mistake we saw during the workshop"

2. DIAGNOSE WITH /TROUBLESHOOT (1.5 min)
   - Run: /troubleshoot why did you use X approach rather than Y?
   - Walk through the diagnosis output
   - Point out: the skill's instructions led to this choice

3. THE 100× FIX (2 min)
   - Ask: "Update the AppMod skill so you use Y approach instead of X
     for this type of case, and explain why in the skill"
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
     SLIDE 17 — PARTNER PLAYBOOK                           ~3 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>What To Do Now — Partner Playbook</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.5rem; align-items: stretch; padding: 0.5rem 1.8rem 0.7rem;">
    <div class="card-grid" style="grid-template-columns: repeat(2, 1fr); gap: 0.55rem; flex: 1;">
      <div class="card" style="border-left: 3px solid var(--theme-accent);">
        <h3>💻 1. VS Code Insiders + Daily Updates</h3>
        <p>Non-negotiable. Install today, update every morning.</p>
      </div>
      <div class="card" style="border-left: 3px solid var(--theme-accent2);">
        <h3>📦 2. Install AppMod MCP NuGet</h3>
        <p><code>Microsoft.GitHubCopilot.AppModernization.Mcp</code> — remove competing extensions.</p>
      </div>
      <div class="card" style="border-left: 3px solid #077769;">
        <h3>🔧 3. Convert Prompts to Skills</h3>
        <p>Start immediately. Use Sensei to validate. Build a skill library.</p>
      </div>
      <div class="card" style="border-left: 3px solid #5635a0;">
        <h3>📋 4. Dependency-Layer Plan First</h3>
        <p>Build the upgrade plan before touching code. Leaf-first, small PRs.</p>
      </div>
      <div class="card" style="border-left: 3px solid #0c6484;">
        <h3>⚡ 5. Go Async</h3>
        <p>Agent Panel, subagents, fleets — stop watching agents.</p>
      </div>
      <div class="card" style="border-left: 3px solid #c2410c;">
        <h3>🔍 6. Implement the 100× Pattern</h3>
        <p>/troubleshoot → diagnose → update skill → permanent fix.</p>
      </div>
      <div class="card" style="border-left: 3px solid #d97706;">
        <h3>🏢 7. Build an Org Plugin Marketplace</h3>
        <p>Share skills, agents, MCPs across your organization.</p>
      </div>
      <div class="card" style="border-left: 3px solid #db2777;">
        <h3>🎓 8. Run This Workshop</h3>
        <p>Run this format with your customers. Huge partner opportunity.</p>
      </div>
    </div>
  </div>
</div>

<!--
This is the actionable checklist. Each item maps to a section they just saw.
Emphasize that this entire approach is teachable and repeatable — that's why
item 8 is "run this workshop with your customers."
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 18 — KEY TAKEAWAYS                              ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>Key Takeaways</h1>
  </div>
  <div class="slide-body" style="align-items: stretch; padding: 0.8rem 1.8rem;">
    <div class="takeaway-grid" style="width: 100%; flex: 1;">
      <div v-click class="takeaway-item">
        <span class="takeaway-num">1</span>
        <div class="takeaway-text"><strong>There is no single-click AppMod for real apps.</strong> Stop promising it. Start structuring it. Follow standard .NET AppMod, then automate with AI.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">2</span>
        <div class="takeaway-text"><strong>Skills &gt; Prompts.</strong> The team that builds skills accelerates the entire org. 20+ skills in 4 days. DevDiv expects prompts to fade away.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">3</span>
        <div class="takeaway-text"><strong>Break the monster into layers.</strong> Leaf-first dependency planning. Small PRs. Always shippable. A 10K LOC PR will never get merged.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">4</span>
        <div class="takeaway-text"><strong>Go async or go home.</strong> Parallelization is where the 10× comes from. It takes 2–3 days to build confidence — the other practices enable it.</div>
      </div>
      <div v-click class="takeaway-item">
        <span class="takeaway-num">5</span>
        <div class="takeaway-text"><strong>Close the feedback loop.</strong> /troubleshoot + skill update = 100× compounding improvement. Every fix makes the system permanently smarter.</div>
      </div>
    </div>
  </div>
</div>

<!--
Progressive reveal — build each takeaway one click at a time.
These five principles map directly to the workshop experience. They're
battle-tested on a 10M LOC app with the Microsoft AppMod CAT team.
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
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; padding: 0.8rem 1.5rem;">
    <div class="two-col-grid" style="width: 100%; gap: 0.6rem; align-items: stretch;">
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>1. No magic single-click</h3>
          <p>Standard .NET AppMod approach + AI automation. Break into phases, leaf-first, small PRs. <strong>Structure, not sizzle.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>2. Skills &gt; Prompts</h3>
          <p>Convert prompts to skills. Validate with Sensei. Build an org skill library. <strong>Deterministic, portable, discoverable.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent);">
          <h3>3. Dependency layers</h3>
          <p>Multi-layer upgrade plan. Start at leaves. Each phase = working app + mergeable PR. <strong>Never a 10K LOC PR.</strong></p>
        </div>
      </div>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>4. Go async</h3>
          <p>Agent Panel, subagents, fleets. Stop watching. Confidence builds over days, not hours. <strong>Parallelization = 10×.</strong></p>
        </div>
        <div class="card" style="flex: 1; border-left: 3px solid var(--theme-accent2);">
          <h3>5. The 100× pattern</h3>
          <p>/troubleshoot → diagnose → update skill → permanent fix. Every loop makes the system smarter. <strong>Compounding improvement.</strong></p>
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
Condensed reference card of the 5 principles plus key links. Everything they
need to get started after the session.
-->

---
transition: fade-out
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 20 — THE PARTNER OPPORTUNITY                    ~2 min
     ═══════════════════════════════════════════════════════════ -->

<div class="absolute inset-0 flex flex-col" style="background: var(--theme-bg-cool);">
  <div class="slide-banner">
    <h1>The Partner Opportunity</h1>
  </div>
  <div class="slide-body" style="flex-direction: column; gap: 0.6rem; align-items: stretch; padding: 0.6rem 1.8rem 0.8rem;">
    <div class="callout" style="background: #e8f4fd; border-left: 4px solid var(--theme-accent2); padding: 0.7rem 1rem; font-size: 0.95em;">
      <strong>I've seen many customers exclaim that they're experts and extremely capable with AI Dev</strong> — yet I've seen few of them implementing any of the above practices at scale. Their capabilities are often <strong>months out of date</strong> — and when it comes to the rate of Agentic AI change, <strong>months = years</strong>.
    </div>
    <div style="display: flex; gap: 0.8rem; align-items: stretch; flex: 1;">
      <div class="card" style="flex: 1; border-color: #16a34a; border-width: 2px;">
        <h3>🎓 Workshop-as-a-Service</h3>
        <p>Run this workshop format with your customers</p>
        <p>4-day format with the AppMod tools and techniques from this talk</p>
        <p>Reusable skill libraries and demo apps included</p>
        <p><strong>Huge differentiation opportunity for partners</strong></p>
      </div>
      <div class="card" style="flex: 1; border-color: var(--theme-accent2); border-width: 2px;">
        <h3>📈 Customer Impact</h3>
        <p>Level up customers from "months behind" to current best practices</p>
        <p>Build organizational skill libraries that compound over time</p>
        <p>Establish plugin marketplaces for enterprise-wide sharing</p>
        <p><strong>AppMod-as-a-service using agentic tools</strong></p>
      </div>
    </div>
  </div>
</div>

<!--
The call to action for partners: this is your opportunity to differentiate.
You can run this workshop format. The tools and skills are reusable. Your
customers NEED this — most of them are months behind on agentic practices
and don't know it.
-->

---
layout: center
class: text-center
---

<!-- ═══════════════════════════════════════════════════════════
     SLIDE 21 — THANK YOU / Q&A                           ~5 min
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
        <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank" style="color: rgba(255,255,255,0.85);">Slides Source</a>
      </p>
    </div>
  </div>
</div>

<!--
Open for questions. Offer to walk through any demo in more detail.
Encourage partners to reach out about running workshops for their customers.
-->
