---
theme: default
title: "Agentic Development: From Code Completion to Hypervelocity"
info: |
  ## Agentic Development: From Code Completion to Hypervelocity
  A visual adoption roadmap for moving from individual AI-assisted development
  to governed, organization-wide engineering flow.
tags:
  - GitHub Copilot
  - Agentic Development
  - Agent Skills
  - MCP
  - Hypervelocity Engineering
duration: 28
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
routerMode: hash
---

<!--
THESIS: Agentic development is an adoption journey, not a feature list; this deck refuses dense dashboards of equal-weight cards.
OWN-WORLD: Fluent-inspired application surfaces, cool neutral layers, precise blue and teal signals, thin strokes, and diagram-first composition.
STORY: The audience sees the market shift, recognizes the frustration barrier, and leaves with a path from personal acceleration to governed flow.
FIRST VIEWPORT: A dark horizon holds one decisive title, a short route line, presenter identity, and a quiet QR action.
FORM: A visual roadmap staged as connected rails, layers, feedback loops, and operating surfaces.
-->

<div class="hero">
  <div class="hero-glow"></div>
  <div class="hero-copy">
    <h1>Agentic Development</h1>
    <p class="hero-title-tail">From Code Completion to Hypervelocity</p>
    <p class="hero-thesis">An adoption roadmap from individual acceleration to system-wide flow.</p>
    <div class="hero-presenter">
      <strong>Daniel Scott-Raynsford</strong>
      <span>Sr. Partner Solution Architect · Microsoft</span>
    </div>
  </div>
  <a
    class="hero-qr-link"
    href="https://danielscottraynsford.com/plagueho.learn/agentic-development-evolution"
    target="_blank"
    aria-label="Open the presentation online"
  >
    <img src="./images/presentation-qr-code.png" alt="QR code for this presentation" />
    <span>Open the live deck ↗</span>
  </a>
  <div class="hero-path" aria-hidden="true">
    <span>Complete</span>
    <i></i>
    <span>Delegate</span>
    <i></i>
    <span>Orchestrate</span>
    <i></i>
    <span>Scale</span>
  </div>
</div>

<!--
Open with the destination, not the tools. The story is how organizations move
from faster typing to a delivery system where AI participation is repeatable,
observable, governable, and shared across roles.
-->

---
transition: slide-up
---

<div class="agenda">
  <header class="agenda-heading">
    <h1>Four moves</h1>
    <p>From personal productivity to organizational flow</p>
  </header>

  <nav class="agenda-route" aria-label="Presentation sections">
    <a href="/3" @click.prevent="$router.push('/3')">
      <span class="agenda-index">01</span>
      <LineIcon name="velocity" />
      <strong>See the shift</strong>
      <small>Timeline + adoption journey</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/5" @click.prevent="$router.push('/5')">
      <span class="agenda-index">02</span>
      <LineIcon name="layers" />
      <strong>Build repeatability</strong>
      <small>Operating model + control loop</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/8" @click.prevent="$router.push('/8')">
      <span class="agenda-index">03</span>
      <LineIcon name="branch" />
      <strong>Scale the system</strong>
      <small>Subagents + squads + memory</small>
    </a>
    <span class="agenda-connector" aria-hidden="true"></span>
    <a href="/12" @click.prevent="$router.push('/12')">
      <span class="agenda-index">04</span>
      <LineIcon name="flow" />
      <strong>Move the whole system</strong>
      <small>More roles + faster learning</small>
    </a>
  </nav>
</div>

---
transition: fade-out
---

<div class="app-slide timeline-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="velocity" /></span>
    <h1>How Agentic Development Evolved</h1>
    <span class="app-context">2021 → 2026</span>
  </header>

  <main class="timeline-content">
    <div class="timeline-rail">
      <a href="https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/" target="_blank" class="timeline-node">
        <span class="timeline-year">2021</span>
        <span class="timeline-dot"><LineIcon name="code" /></span>
        <strong>Complete</strong>
        <small>GitHub Copilot technical preview</small>
      </a>
      <span v-click="1" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="1" href="https://github.blog/news-insights/product-news/universe-2023-copilot-transforms-github-into-the-ai-powered-developer-platform/" target="_blank" class="timeline-node">
        <span class="timeline-year">2023</span>
        <span class="timeline-dot"><LineIcon name="chat" /></span>
        <strong>Converse</strong>
        <small>GitHub Copilot Chat</small>
      </a>
      <span v-click="2" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="2" href="https://www.anthropic.com/news/model-context-protocol" target="_blank" class="timeline-node">
        <span class="timeline-year">2024</span>
        <span class="timeline-dot"><LineIcon name="plug" /></span>
        <strong>Connect</strong>
        <small>Model Context Protocol</small>
      </a>
      <span v-click="3" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="3" href="https://github.blog/changelog/2025-05-19-github-copilot-coding-agent-in-public-preview/" target="_blank" class="timeline-node">
        <span class="timeline-year">2025</span>
        <span class="timeline-dot"><LineIcon name="robot" /></span>
        <strong>Delegate</strong>
        <small>Copilot coding agent</small>
      </a>
      <span v-click="4" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="4" href="https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/" target="_blank" class="timeline-node">
        <span class="timeline-year">2025</span>
        <span class="timeline-dot"><LineIcon name="skills" /></span>
        <strong>Standardize</strong>
        <small>Agent Skills</small>
      </a>
      <span v-click="5" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="5" href="https://github.blog/news-insights/company-news/welcome-home-agents/" target="_blank" class="timeline-node">
        <span class="timeline-year">2025</span>
        <span class="timeline-dot"><LineIcon name="branch" /></span>
        <strong>Scale</strong>
        <small>Multi-agent orchestration</small>
      </a>
      <span v-click="6" class="timeline-connector" aria-hidden="true"></span>
      <a v-click="6" href="https://microsoft.github.io/hve-core/" target="_blank" class="timeline-node">
        <span class="timeline-year">2026</span>
        <span class="timeline-dot"><LineIcon name="velocity" /></span>
        <strong>Extend</strong>
        <small>Hypervelocity engineering</small>
      </a>
    </div>
  </main>
</div>

<!--
Sources:
- GitHub Copilot technical preview, 29 June 2021:
  https://github.blog/2021-06-29-introducing-github-copilot-ai-pair-programmer/
- GitHub Copilot Chat announced, 8 November 2023:
  https://github.blog/news-insights/product-news/universe-2023-copilot-transforms-github-into-the-ai-powered-developer-platform/
- MCP announcement, 25 November 2024:
  https://www.anthropic.com/news/model-context-protocol
- Copilot coding agent public preview, 19 May 2025:
  https://github.blog/changelog/2025-05-19-github-copilot-coding-agent-in-public-preview/
- Agent Skills support, 18 December 2025:
  https://github.blog/changelog/2025-12-18-github-copilot-now-supports-agent-skills/
- GitHub Agent HQ, 2025:
  https://github.blog/news-insights/company-news/welcome-home-agents/
- Hypervelocity Engineering:
  https://microsoft.github.io/hve-core/

The point is not feature chronology. Each era increases the scope of work that
can be delegated—and therefore the need for stronger operating controls.
-->

---
transition: slide-left
---

<div class="journey-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="branch" /></span>
    <h1>Agentic Development: The Organizational Adoption Journey</h1>
    <span class="app-context">constraint → capability</span>
  </header>

  <div class="journey-map">
    <a href="/7" @click.prevent="$router.push('/7')" class="journey-stage stage-1" title="Coding agents accelerate code, tests, documentation, and daily developer tasks.">
      <span class="journey-icon"><LineIcon name="person" /></span>
      <strong>Individual<br>productivity</strong>
    </a>
    <a href="/6" @click.prevent="$router.push('/6')" class="journey-stage journey-barrier stage-2" title="Faster output does not guarantee the intended outcome.">
      <span class="journey-icon"><LineIcon name="warning" /></span>
      <strong>Frustration<br>barrier</strong>
      <small>speed ≠ intent</small>
    </a>
    <a href="/7" @click.prevent="$router.push('/7')" class="journey-stage stage-3" title="Context engineering, MCP, specifications, hooks, and orchestration make outcomes repeatable.">
      <span class="journey-icon"><LineIcon name="flow" /></span>
      <strong>Context<br>engineering</strong>
    </a>
    <a href="/5" @click.prevent="$router.push('/5')" class="journey-stage stage-4" title="Repeatable processes become demand-loaded skills.">
      <span class="journey-icon"><LineIcon name="skills" /></span>
      <strong>Skill<br>development</strong>
    </a>
    <a href="/5" @click.prevent="$router.push('/5')" class="journey-stage stage-5" title="Plugins and marketplaces distribute proven AI development assets.">
      <span class="journey-icon"><LineIcon name="store" /></span>
      <strong>Plugins &amp;<br>marketplaces</strong>
    </a>
    <a href="/6" @click.prevent="$router.push('/6')" class="journey-stage stage-6" title="Paved workflows, evaluations, observability, security policy, ownership, and adoption measures enable team scale.">
      <span class="journey-icon"><LineIcon name="shield" /></span>
      <strong>Governed<br>team scale</strong>
    </a>
    <a href="/12" @click.prevent="$router.push('/12')" class="journey-stage journey-barrier stage-7" title="Business flow: product, operations, and security cannot keep pace. Customer outcomes: moving faster does not prove the team is building the right thing.">
      <span class="journey-icon"><LineIcon name="target" /></span>
      <strong>Business<br>barrier</strong>
      <small>Business flow<br>Customer outcomes</small>
    </a>
    <a href="/9" @click.prevent="$router.push('/9')" class="journey-stage stage-8" title="AI extends across the delivery system and every role that shapes value.">
      <span class="journey-icon"><LineIcon name="velocity" /></span>
      <strong>Hypervelocity<br>engineering</strong>
    </a>
    <span class="journey-barrier-line journey-frustration-barrier-line" aria-hidden="true"></span>
    <span class="journey-barrier-line journey-business-barrier-line" aria-hidden="true"></span>
    <div class="journey-line" aria-hidden="true"></div>
  </div>

  <p class="journey-outcome"><span>Code faster</span><i></i><strong>Learn and deliver faster—together</strong></p>
</div>

<!--
This is the core adoption model.

1. Individual productivity creates enthusiasm.
2. The frustration barrier appears when output is fast but wrong, inconsistent,
   or hard to integrate.
3. Context engineering and constraints make outcomes repeatable.
4. Successful processes become skills.
5. Skills and related assets become distributable plugins and marketplaces.
6. Governed Team Scale is the missing bridge: paved workflows, evaluations,
   observability, security policy, clear ownership, and adoption measures.
7. The Business Barrier arrives when the wider organization cannot match delivery
   pace or increasing output fails to improve customer outcomes.
8. Hypervelocity Engineering extends AI across the whole delivery system.

The maturity signal is not more generated code. It is shorter, safer feedback
loops across more of the organization.
-->

---
transition: fade-out
---

<div class="app-slide operating-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="layers" /></span>
    <h1>The Agentic Operating Model</h1>
    <span class="app-context">7-layer customization stack</span>
  </header>

  <main class="operating-content">
    <p class="operating-intro">The stack that turns “not what I expected” into repeatable, more deterministic outcomes.</p>
    <div class="layer-stack">
      <a href="https://code.visualstudio.com/docs/copilot/customization/custom-instructions" target="_blank" class="layer layer-1">
        <span>01</span><strong>Instructions</strong><small>Always-on intent</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/prompt-files" target="_blank" class="layer layer-2">
        <span>02</span><strong>Prompts</strong><small>Reusable entry points</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/mcp-servers" target="_blank" class="layer layer-3">
        <span>03</span><strong>MCP</strong><small>Tools + context</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/custom-agents" target="_blank" class="layer layer-4">
        <span>04</span><strong>Agents</strong><small>Scoped specialists</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/agent-skills" target="_blank" class="layer layer-5">
        <span>05</span><strong>Skills</strong><small>Repeatable expertise</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/hooks" target="_blank" class="layer layer-6">
        <span>06</span><strong>Hooks</strong><small>Deterministic gates</small>
      </a>
      <a href="https://code.visualstudio.com/docs/copilot/customization/agent-plugins" target="_blank" class="layer layer-7">
        <span>07</span><strong>Plugins</strong><small>Portable systems</small>
      </a>
    </div>
    <div class="operating-axis">
      <span>Repository intent</span>
      <i></i>
      <span>Organization capability</span>
    </div>
  </main>
</div>

<!--
Keep this slide to the stack. Each layer is clickable.

Instructions establish durable intent. MCP supplies tools and context. Agents
scope responsibility. Skills capture repeatable process. Hooks enforce
non-negotiable behavior. Plugins package the system for distribution.

The next slide shows the improvement loop that makes the stack better over time;
do not pull that material back onto this slide.
-->

---
transition: slide-up
---

<div class="barrier-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="repeat" /></span>
    <h1>The Agentic Development Improvement Loop</h1>
    <span class="app-context">evidence → better outcomes</span>
  </header>

  <div class="improvement-flow">
    <div class="improvement-node improvement-edge improvement-intent">
      <span>Intent</span>
      <strong>What outcome do we need?</strong>
    </div>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://code.visualstudio.com/docs/copilot/customization/prompt-files" target="_blank" class="improvement-node improvement-prompt">
      <LineIcon name="chat" /><strong>Prompt</strong><small>start context engineering</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://modelcontextprotocol.io/" target="_blank" class="improvement-node">
      <LineIcon name="link" /><strong>Connect</strong><small>MCP tools to get dynamic context</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://github.com/github/spec-kit" target="_blank" class="improvement-node">
      <LineIcon name="plan" /><strong>Constrain</strong><small>Create specifications, use hooks</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://code.visualstudio.com/docs/copilot/chat/chat-debug-view" target="_blank" class="improvement-node">
      <LineIcon name="eye" /><strong>Observe</strong><small>/troubleshoot</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://agentskills.io/" target="_blank" class="improvement-node">
      <LineIcon name="repeat" /><strong>Reuse</strong><small>Build Skills, and Share with Plugins</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <a href="https://docs.github.com/en/copilot/using-github-copilot/code-review/using-copilot-code-review" target="_blank" class="improvement-node">
      <LineIcon name="shield" /><strong>Govern</strong><small>Adopt policies and automated reviews</small>
    </a>
    <span class="improvement-arrow" aria-hidden="true"></span>
    <div class="improvement-node improvement-edge improvement-outcome">
      <strong>Intended outcome</strong>
      <span>Traceable · repeatable · improvable</span>
    </div>
    <svg class="improvement-feedback" viewBox="0 0 1120 76" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <marker id="improvement-feedback-arrowhead" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M 0 0 L 12 6 L 0 12 z" />
        </marker>
      </defs>
      <path d="M 1044 0 V 36 H 76 V 0" marker-end="url(#improvement-feedback-arrowhead)" />
    </svg>
  </div>
  <p class="improvement-evidence">Evidence from this run shapes the next one.</p>
</div>

<!--
This is the operating response to frustration:

- Prompt with the intended outcome and begin context engineering.
- Observe why the agent acted.
- Constrain work with specifications, phases, and deterministic hooks.
- Connect only the tools and context required.
- Reuse proven behavior through skills and plugins.
- Govern access, evaluations, ownership, and change.

The lower feedback arrow makes the point explicit: every intended outcome
shapes the next intent.
-->

---
transition: fade-out
---

<div class="app-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="layers" /></span>
    <h1>Context engineering</h1>
    <span class="app-context">select → ground → guide</span>
  </header>
  <main class="context-balance-content">
    <section class="context-balance" aria-label="Comparison of sufficient, insufficient, and excessive context">
      <div class="context-bar-heading"><span><strong>Just enough context</strong><small>Grounded and focused</small></span><b>Target</b></div>
      <div class="context-reference-bar">
        <a class="context-segment context-segment-files" href="https://code.visualstudio.com/docs/copilot/chat/copilot-chat-context" target="_blank">
          <LineIcon name="code" /><span><strong>Selected evidence</strong><small>Files · references · attachments</small></span>
        </a>
        <a class="context-segment context-segment-repository" href="https://github.com/github/spec-kit" target="_blank">
          <LineIcon name="plan" /><span><strong>Repository knowledge</strong><small>Specifications · ADRs · plans</small></span>
        </a>
        <a class="context-segment context-segment-organization" href="https://docs.github.com/en/copilot/concepts/context/spaces" target="_blank">
          <LineIcon name="shield" /><span><strong>Organizational knowledge</strong><small>Standards · security · guidelines</small></span>
        </a>
        <div class="context-segment context-segment-dynamic">
          <LineIcon name="plug" /><span><strong>Dynamic grounding</strong><small><a href="https://learn.microsoft.com/en-us/training/support/mcp" target="_blank">Learn MCP</a> · <a href="https://aka.ms/workiq" target="_blank">WorkIQ</a></small></span>
        </div>
      </div>
      <div class="context-comparison-row">
        <span class="context-comparison-label"><strong>Too little</strong><small>Assumptions fill the gaps</small></span>
        <div class="context-quantity-bar context-too-little" aria-label="Sparse context with large gaps"><i></i><i></i></div>
      </div>
      <div class="context-comparison-row">
        <span class="context-comparison-label"><strong>Too much</strong><small>Noise, cost, distraction</small></span>
        <div class="context-quantity-bar context-too-much" aria-label="Overloaded context with repeated sources"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
      </div>
    </section>
    <div class="context-takeaway">
      <p>The engineer's job is not to add all context. It is to select the right context.</p>
      <small>Repository instructions such as <a class="context-file-link" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions" target="_blank">AGENTS.md</a> and <a class="context-file-link" href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions" target="_blank">copilot-instructions.md</a> make the right context reusable.</small>
    </div>
  </main>
</div>

<!--
Context engineering evolves through four expanding knowledge sources.

Start by steering the agent to the files that matter. Preserve decisions,
specifications, and plans in the repository so future prompts inherit durable
knowledge. Bring in governed organizational standards through Copilot Spaces.
Use MCP servers for knowledge that changes: Microsoft Learn for current product
grounding and WorkIQ for evolving enterprise context.

The goal is not maximum context. Too little forces assumptions; too much adds
noise, cost, and distraction. Engineers learn to choose the smallest context
set that can solve the problem well. Repository instructions make those choices
reusable across prompts and developers.
-->

---
transition: fade-out
---

<div class="scale-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="branch" /></span>
    <h1>Developer leverage compounds</h1>
    <span class="app-context">serial → parallel → autonomous</span>
  </header>

  <div class="scale-chart">
    <span class="scale-y-label">Concurrent delivery capacity</span>
    <span class="scale-x-start">Individual</span>
    <span class="scale-x-label">Operating model maturity</span>
    <span class="scale-x-end">Team-scale</span>
    <svg class="scale-trajectory" viewBox="0 0 1060 420" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="M 90 340 C 200 340, 270 335, 310 330 C 410 322, 480 310, 530 295 C 640 265, 700 235, 760 210 C 855 165, 935 110, 980 80" />
    </svg>
    <div class="scale-level scale-level-1">
      <div class="leverage-visual leverage-assist" aria-hidden="true">
        <span class="leverage-actor leverage-developer"><LineIcon name="person" /></span>
        <i></i>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
      </div>
      <strong>Assist</strong>
      <small>1 task · 1 agent · serial</small>
    </div>
    <div class="scale-level scale-level-linked scale-level-2">
      <div class="leverage-visual leverage-delegate" aria-hidden="true">
        <span class="leverage-actor leverage-developer"><LineIcon name="person" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
      </div>
      <strong>Delegate</strong>
      <small>1 task · serial agents</small>
      <a class="scale-feature-link" href="https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents" target="_blank">Custom agents ↗</a>
    </div>
    <div class="scale-level scale-level-linked scale-level-3">
      <div class="leverage-visual leverage-parallel" aria-hidden="true">
        <svg viewBox="0 0 130 78" preserveAspectRatio="none"><path d="M 32 39 H 54 M 54 39 C 70 39, 68 13, 94 13 M 54 39 H 94 M 54 39 C 70 39, 68 65, 94 65" /></svg>
        <span class="leverage-actor leverage-developer"><LineIcon name="person" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
        <span class="leverage-actor leverage-agent"><LineIcon name="robot" /></span>
      </div>
      <strong>Parallelize</strong>
      <small>1 task · parallel agents</small>
      <span class="scale-feature-links">
        <a href="https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-custom-agents#running-agents-as-subagents" target="_blank">Subagents ↗</a>
        <a href="https://docs.github.com/en/copilot/concepts/agents/copilot-cli/fleet" target="_blank">Fleet ↗</a>
      </span>
    </div>
    <div class="scale-level scale-level-linked scale-level-4">
      <div class="leverage-visual leverage-orchestrate" aria-hidden="true">
        <svg viewBox="0 0 130 78" preserveAspectRatio="none"><path d="M 32 39 H 57" /></svg>
        <span class="leverage-actor leverage-developer"><LineIcon name="person" /></span>
        <span class="leverage-squad">
          <LineIcon name="branch" />
          <i><LineIcon name="robot" /></i><i><LineIcon name="robot" /></i><i><LineIcon name="robot" /></i>
        </span>
      </div>
      <strong>Orchestrate</strong>
      <small>Autonomous Squad · task queue</small>
      <a class="scale-feature-link" href="https://github.com/bradygaster/squad" target="_blank">Squad ↗</a>
    </div>
    <div class="scale-level scale-level-linked scale-level-5">
      <div class="leverage-visual leverage-scale-out" aria-hidden="true">
        <svg viewBox="0 0 130 78" preserveAspectRatio="none"><path d="M 32 39 H 48 M 48 39 C 57 39, 55 19, 66 19 M 48 39 C 57 39, 55 59, 66 59" /></svg>
        <span class="leverage-actor leverage-developer"><LineIcon name="person" /></span>
        <span class="leverage-team"><i></i><i></i><i></i></span>
        <span class="leverage-team"><i></i><i></i><i></i></span>
      </div>
      <strong>Scale out</strong>
      <small>Many Squads · many solutions</small>
      <a class="scale-feature-link" href="https://github.com/copilot" target="_blank">Copilot app ↗</a>
    </div>
  </div>

  <p class="scale-rule">The developer moves from <strong>doing work</strong> to <strong>directing systems of work.</strong></p>
</div>

<!--
The graph shows a repeatable five-stage adoption path.

1. Assist: one developer and one agent work serially on one task.
2. Delegate: one developer uses several agents serially on one task.
3. Parallelize: one developer distributes work across agents concurrently.
4. Orchestrate: a Squad operates autonomously through roles, routing, and memory.
5. Scale out: one developer oversees multiple Squads across multiple solutions.
-->

---
transition: fade-out
---

<div class="app-slide hve-intro-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="velocity" /></span>
    <h1>Hypervelocity Engineering</h1>
    <span class="app-context">not the end state → the next evolution</span>
  </header>
  <main class="hve-intro-content">
    <h2>Developer acceleration exposes the next constraint: <strong>the delivery system around it.</strong></h2>
    <div class="hve-evolution">
      <section class="hve-stage hve-agentic-stage">
        <div class="hve-agentic-visual" aria-hidden="true">
          <span><LineIcon name="person" /></span><i></i><span><LineIcon name="robot" /></span><span><LineIcon name="robot" /></span><span><LineIcon name="robot" /></span>
        </div>
        <strong>Agentic development</strong>
        <small>Engineering accelerates</small>
      </section>
      <div class="hve-bridge">
        <LineIcon name="warning" />
        <strong>Business barrier</strong>
        <span>Wrong problem</span>
        <span>Slow decisions</span>
        <span>Fragile delivery</span>
      </div>
      <a class="hve-stage hve-system-stage" href="https://medium.com/microsoft/from-idea-to-production-ea25827a4274" target="_blank">
        <div class="hve-system-visual" aria-hidden="true">
          <span><LineIcon name="person" /></span><span><LineIcon name="target" /></span><span class="hve-system-core"><LineIcon name="velocity" /></span><span><LineIcon name="shield" /></span><span><LineIcon name="flow" /></span>
        </div>
        <strong>Hypervelocity Engineering</strong>
        <small>The whole delivery system accelerates</small>
      </a>
    </div>
    <div class="hve-why">
      <span><LineIcon name="shield" /><strong>Disciplined speed</strong><small>Engineering rigor scales what AI starts</small></span>
      <span><LineIcon name="target" /><strong>Purpose</strong><small>Solve the right problem and create value</small></span>
      <span><LineIcon name="link" /><strong>Trusted context</strong><small>Ground decisions in reliable knowledge</small></span>
    </div>
    <p class="hve-foundation"><span>Small expert teams</span><i></i><span>Design thinking</span><i></i><span>Production starting points</span><i></i><span>AI across the lifecycle</span></p>
  </main>
</div>

<!--
HVE is the next evolution, not the end state and not a product.

Agentic development accelerates engineering work. That success exposes the next
constraint: product decisions, domain understanding, security, operations, and
delivery practices must accelerate together.

HVE is a way of working that combines disciplined speed, business purpose, and
trusted context. Small multidisciplinary teams use design thinking, proven
production starting points, and AI across the lifecycle to deliver high-value
outcomes continuously.

Source:
https://medium.com/microsoft/from-idea-to-production-ea25827a4274
-->

---
transition: slide-up
---

<div class="action-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="target" /></span>
    <h1>Five things every organisation should do now</h1>
    <span class="app-context">make adoption possible for every team</span>
  </header>

  <div class="action-ladder">
    <div v-click><span>1</span><LineIcon name="layers" /><strong><a href="/5" @click.prevent="$router.push('/5')">Train every team in the Agentic Operating Model</a></strong><small>Give everyone a shared method for moving from instructions and context to repeatable, governed outcomes.</small></div>
    <div v-click><span>2</span><LineIcon name="plan" /><strong>Standardise guidance in every repository</strong><small>Require maintained <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions" target="_blank">AGENTS.md</a> and <a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions" target="_blank">copilot-instructions.md</a> files that align agents with organisational standards.</small></div>
    <div v-click><span>3</span><LineIcon name="plug" /><strong>Govern access to organisational knowledge</strong><small>Offer approved <a href="https://docs.github.com/en/copilot/concepts/about-mcp" target="_blank">MCP servers</a> and <a href="https://docs.github.com/en/copilot/concepts/spaces" target="_blank">Copilot Spaces</a> for secure access to <a href="https://learn.microsoft.com/en-us/microsoft-365-copilot/extensibility/workiq-overview" target="_blank">Work IQ</a> and other knowledge beyond the repository.</small></div>
    <div v-click><span>4</span><LineIcon name="skills" /><strong>Empower every team to create reusable skills</strong><small>Give teams ownership to capture repeated work as <a href="https://docs.github.com/en/copilot/concepts/agents/about-agent-skills" target="_blank">skills</a>, improve them, and share them across team boundaries.</small></div>
    <div v-click><span>5</span><LineIcon name="store" /><strong><a href="https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-marketplace" target="_blank">Create an organisational plugin marketplace</a></strong><small>Make approved <a href="https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-skills" target="_blank">skills</a>, <a href="https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/plugins-creating" target="_blank">plugins</a>, <a href="https://docs.github.com/en/copilot/tutorials/create-an-extension" target="_blank">extensions</a>, and <a href="https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/use-hooks" target="_blank">hooks</a> easy to find, trust, install, and reuse.</small></div>
  </div>
</div>

<!--
These are five organisational capabilities, not individual developer habits.

Train every team in one shared operating model. Put maintained guidance in
every repository. Provide secure, governed access to organisational knowledge.
Empower teams to capture reusable skills. Then make all approved assets easy
to discover and consume through an organisational marketplace.
-->

---
transition: fade-out
---

<div class="diagnose-slide">
  <header class="app-bar">
    <span class="app-mark"><LineIcon name="plan" /></span>
    <h1>What to reach for next</h1>
    <span class="app-context">match the problem to the smallest useful fix</span>
  </header>

  <div class="diagnose-list">
    <div v-click>
      <p>“We keep typing the same instructions.”</p>
      <i aria-hidden="true"></i>
      <span><LineIcon name="repeat" /><strong><a href="https://agentskills.io/" target="_blank">Save it as a skill</a></strong><small>The agent calls it whenever that task comes up, so the steps run the same way every time.</small></span>
    </div>
    <div v-click>
      <p>“The agent only knows what is in the repository.”</p>
      <i aria-hidden="true"></i>
      <span><LineIcon name="plug" /><strong><a href="https://docs.github.com/en/copilot/concepts/about-mcp" target="_blank">Open up your organisation’s data</a></strong><small>Live tools let the agent go and find the knowledge a task needs, wherever it lives.</small></span>
    </div>
    <div v-click>
      <p>“We get a different answer every time.”</p>
      <i aria-hidden="true"></i>
      <span><LineIcon name="target" /><strong><a href="https://docs.github.com/en/copilot/how-tos/configure-custom-instructions/add-repository-instructions" target="_blank">Constrain the agent</a></strong><small>Specifications and repository guidance stop it filling the gaps with assumptions.</small></span>
    </div>
    <div v-click>
      <p>“We are trying to do too much in one go.”</p>
      <i aria-hidden="true"></i>
      <span><LineIcon name="flow" /><strong><a href="https://docs.github.com/en/copilot/tutorials/customization-library/custom-agents" target="_blank">Break the work down</a></strong><small>Smaller focused tasks, each with a purpose-built agent, are easier to steer and improve.</small></span>
    </div>
    <div v-click>
      <p>“We are moving faster than we can check.”</p>
      <i aria-hidden="true"></i>
      <span><LineIcon name="shield" /><strong><a href="https://github.com/github/gh-aw" target="_blank">Automate everything you can</a></strong><small><a href="https://docs.github.com/en/copilot/concepts/code-review/code-review" target="_blank">Reviews</a>, <a href="https://docs.github.com/en/actions/how-tos/writing-workflows/building-and-testing" target="_blank">tests</a>, <a href="https://github.com/github/gh-aw" target="_blank">hooks and tech-debt fixes</a>, <a href="https://docs.github.com/en/code-security/dependabot/working-with-dependabot/dependabot-options-reference" target="_blank">dependency updates</a>, even checking the <a href="https://github.com/github/spec-kit" target="_blank">specifications</a>.</small></span>
    </div>
  </div>
</div>

<!--
Pause for photographs. Each line pairs a frustration teams recognise with the
smallest useful next step, in plain language.

A skill is for the agent as much as the person: once saved, the agent invokes
it whenever the task recurs.

Connecting tools is about reaching organisational knowledge beyond the
repository, so the agent can discover what a scenario needs.

Inconsistent output is an unconstrained agent. Specifications, AGENTS.md and
copilot-instructions.md remove the need for it to guess.

Organisation-wide flow problems are the Hypervelocity Engineering conversation
from earlier, not a tooling fix.
-->

---
transition: fade-out
---

<div class="closing-slide">
  <div class="closing-message">
    <LineIcon name="velocity" />
    <h1>The destination is not faster developers.<br>It is a faster organisation.</h1>
    <p>Extend AI-enabled learning, decisions, and delivery across the whole value stream.</p>
  </div>
  <div class="closing-wave" aria-label="AI-enabled capability expands from a developer to the whole organisation">
    <span><LineIcon name="person" /><b>Developer</b></span>
    <span><LineIcon name="skills" /><b>Team</b></span>
    <span><LineIcon name="flow" /><b>Delivery system</b></span>
    <span><LineIcon name="velocity" /><b>Organisation</b></span>
  </div>
  <footer class="closing-next">
    <span>Continue the journey</span>
    <a href="https://plagueho.github.io/plagueho.learn/hypervelocity-engineering/" target="_blank">Explore the Hypervelocity Engineering presentation <b>→</b></a>
  </footer>
</div>

<!--
Agentic development begins by making individual developers faster, but that is
not the destination. Hypervelocity Engineering expands AI-enabled learning,
decisions, and delivery across the whole value stream so the organisation can
move together.

Direct the audience to the dedicated Hypervelocity Engineering presentation
for the operating practices that make this possible.
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
