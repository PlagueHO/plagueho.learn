---
theme: default
title: "Spec-Driven Development with AI: Spec Kit"
info: |
  ## Spec-Driven Development with AI: Spec Kit
  A presentation by Daniel Scott-Raynsford
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: 1280
canvasHeight: 720
---

<!-- Slide 1: Title -->

<div class="title-hero absolute inset-0 flex">
  <div class="title-hero-left">
    <div class="ms-logo">
      <div class="ms-logo-squares">
        <div class="ms-sq" style="background:#F25022"></div>
        <div class="ms-sq" style="background:#7FBA00"></div>
        <div class="ms-sq" style="background:#00A4EF"></div>
        <div class="ms-sq" style="background:#FFB900"></div>
      </div>
      <span class="ms-logo-text">Microsoft</span>
    </div>
    <div class="title-hero-content">
      <h1 class="title-hero-heading">
        <span class="text-accent">Spec-</span>Driven<br>
        Development with AI:<br>
        <span class="text-accent">Spec Kit</span>
      </h1>
      <div class="title-hero-author">
        <p class="author-name">Daniel Scott-Raynsford</p>
        <p class="author-role">Partner Solution Architect | Microsoft EPS</p>
        <p class="author-note">… recovering software engineer</p>
      </div>
    </div>
    <p class="title-hero-date">November 26, 2025</p>
  </div>
  <div class="title-hero-right">
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 2: The Problem with Traditional Development -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <h1>The Problem with Traditional Development</h1>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body">
    <div class="content-panel">
      <div class="card-grid flex-1">
        <div class="card">
          <div class="icon-circle">📋</div>
          <h3>Code-Centric Approach Issues</h3>
          <p>Traditional development focuses heavily on code, often discarding initial specifications during the process.</p>
        </div>
        <div class="card">
          <div class="icon-circle">⚡</div>
          <h3>Limitations of Vibe-Coding</h3>
          <p>Traditional vibe-coding often fails in complex applications due to unclear or incomplete instructions.</p>
        </div>
        <div class="card">
          <div class="icon-circle">🎯</div>
          <h3>Need for Precise Instructions</h3>
          <p>AI coding agents require clear, unambiguous guidance to produce functional and reliable code.</p>
        </div>
        <div class="card">
          <div class="icon-circle">⚠️</div>
          <h3>Technical Debt Accumulation</h3>
          <p>Ignoring clear specifications causes technical debt, complicating maintenance and scalability.</p>
        </div>
      </div>
      <div class="card-image">
        <img src="./images/slide2_img1.jpg" alt="Traditional development challenges" />
      </div>
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 3: What is SDD? -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <h1>What is Spec-Driven Development (SDD)?</h1>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body">
    <div class="content-panel">
      <div class="card-grid flex-1">
        <div class="card">
          <div class="icon-circle">📝</div>
          <h3>Spec-Driven Development</h3>
          <p>Shifts focus from coding to creating executable specifications that directly generate implementations.</p>
        </div>
        <div class="card">
          <div class="icon-circle">👤</div>
          <h3>User-Centered Focus</h3>
          <p>Emphasizes understanding users, their problems, and interactions before technical design decisions.</p>
        </div>
        <div class="card">
          <div class="icon-circle">🔄</div>
          <h3>Dynamic Specification Evolution</h3>
          <p>The specification evolves with insights, guiding the entire development lifecycle adaptively.</p>
        </div>
        <div class="card">
          <div class="icon-circle">✅</div>
          <h3>Improved Code Generation and Validation</h3>
          <p>Starting with specs helps developers and AI generate, test, and validate code accurately.</p>
        </div>
      </div>
      <div class="card-image">
        <img src="./images/slide3_img2.png" alt="Spec-Driven Development concept" />
      </div>
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 4: What is Spec Kit? -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <div class="flex items-center justify-between w-full">
      <h1>What is Spec Kit?</h1>
      <div class="flex items-center gap-3" style="position: relative; z-index: 1;">
        <a href="https://github.com/github/spec-kit" target="_blank" class="!text-sm !text-white/80">https://github.com/github/spec-kit</a>
        <img src="./images/slide4_img3.png" class="w-14 h-14 rounded" alt="Spec Kit QR code" />
      </div>
    </div>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body">
    <div class="content-panel bullet-panel">
      <ul class="bullet-list">
        <li>An <strong>open-source toolkit</strong> that allows you to focus on product scenarios and predictable outcomes instead of vibe coding every piece from scratch.</li>
        <li>Supports <strong>popular AI coding agents</strong>, including of course GitHub Copilot.</li>
        <li>Installs <strong>custom prompts</strong> and <strong>scripts</strong> into repo to help you adopt SDD in a green fields or brown fields project.</li>
      </ul>
    </div>
  </div>
</div>

<!--
AI-Powered Development
Leverages AI to help developers focus on what to build rather than how to build it.
Faster Development Cycles
Eliminates the gap between specification and implementation, accelerating development timelines.
Improved Product Focus
Enables teams to maintain clear focus on product scenarios and business goals.
-->

---
transition: fade-out
---

<!-- Slide 5: Setup -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <div class="flex items-center justify-between w-full">
      <h1>Setup</h1>
      <div class="flex items-center gap-3" style="position: relative; z-index: 1;">
        <a href="https://github.com/github/spec-kit" target="_blank" class="!text-sm !text-white/80">https://github.com/github/spec-kit</a>
        <img src="./images/slide5_img5.png" class="w-14 h-14 rounded" alt="Spec Kit QR code" />
      </div>
    </div>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body" style="flex-direction: column; justify-content: flex-start; gap: 0.4rem; padding-top: 0.5rem; overflow: hidden;">
    <div class="flex gap-3 w-full" style="flex-shrink: 0;">
      <div class="command-box flex-1">
        <span class="command-label">New project</span>
        <code><span class="cmd-bin">uvx</span> --from <span class="cmd-url">git+https://github.com/github/spec-kit.git</span> <span class="cmd-bin">specify</span> init my-app</code>
      </div>
      <div class="command-box flex-1">
        <span class="command-label">Existing project</span>
        <code><span class="cmd-bin">uvx</span> --from <span class="cmd-url">git+https://github.com/github/spec-kit.git</span> <span class="cmd-bin">specify</span> init .</code>
      </div>
    </div>
    <div class="content-panel" style="padding: 0.4rem; flex: 1; min-height: 0; overflow: hidden;">
      <img src="./images/slide5_img4.png" class="rounded-lg w-full h-full object-contain object-top" alt="Spec Kit setup wizard terminal" />
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 6: Setup (cont.) -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <div class="flex items-center justify-between w-full">
      <h1>Setup (cont.)</h1>
      <div class="flex items-center gap-3" style="position: relative; z-index: 1;">
        <a href="https://github.com/github/spec-kit" target="_blank" class="!text-sm !text-white/80">https://github.com/github/spec-kit</a>
        <img src="./images/slide4_img3.png" class="w-14 h-14 rounded" alt="Spec Kit QR code" />
      </div>
    </div>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body">
    <div class="content-panel" style="padding: 0.8rem;">
      <img src="./images/slide6_img6.png" class="rounded-lg w-full h-full object-contain" alt="Spec Kit setup - next steps and enhancement commands" />
    </div>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 7: Spec-Kit Commands -->

<div class="absolute inset-0 flex flex-col" style="background: #EBF0F5;">
  <div class="slide-banner">
    <div class="flex items-center justify-between w-full">
      <h1>Spec-Kit Commands</h1>
      <div class="commands-banner-spacer" aria-hidden="true">
        <span class="!text-sm !text-white/80 whitespace-nowrap">https://github.com/github/spec-kit</span>
        <div class="w-14 h-14"></div>
      </div>
    </div>
    <img src="./images/Picture1.png" class="banner-decoration" alt="" />
  </div>
  <div class="slide-body commands-body">
    <div class="content-panel commands-panel">
      <div class="commands-table-wrap commands-selectable">
        <div class="commands-table">
          <div class="commands-row commands-header">
            <div class="commands-cell">Command</div>
            <div class="commands-cell">Description</div>
            <div class="commands-cell">Usage</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.constitution</code></div>
            <div class="commands-cell">Create project governing principles and development guidelines</div>
            <div class="commands-cell">Run first to establish project standards</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.specify</code></div>
            <div class="commands-cell">Define what you want to build (requirements and user stories)</div>
            <div class="commands-cell">Focus on the what and why, not tech stack</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.clarify</code></div>
            <div class="commands-cell">Clarify underspecified areas through structured questioning</div>
            <div class="commands-cell">Must run before /plan unless explicitly skipped</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.plan</code></div>
            <div class="commands-cell">Create technical implementation plans with chosen tech stack</div>
            <div class="commands-cell">Specify architecture, frameworks, and technical decisions</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.tasks</code></div>
            <div class="commands-cell">Generate actionable task lists for implementation</div>
            <div class="commands-cell">Breaks down plan into executable steps</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.analyze</code></div>
            <div class="commands-cell">Cross-artifact consistency and coverage analysis</div>
            <div class="commands-cell">Run after /tasks, before /implement</div>
          </div>
          <div class="commands-row">
            <div class="commands-cell"><code>/speckit.implement</code></div>
            <div class="commands-cell">Execute all tasks to build the feature according to plan</div>
            <div class="commands-cell">Generates working code from specifications</div>
          </div>
        </div>
        <p class="commands-note commands-selectable">Recently added: <code>/speckit.checklist</code> and <code>/speckit.taskstoissues</code></p>
      </div>
      <div class="commands-flowchart-wrap">
        <img src="./images/slide7_img8.png" class="commands-flowchart" alt="Spec Kit command flow diagram" />
      </div>
    </div>
  </div>
</div>

---
transition: slide-up
---

<!-- Slide 8: Demo -->

<div class="absolute inset-0 flex items-center px-16" style="background-image: url('./images/Picture6.jpg'); background-size: cover; background-position: center;">
  <div>
    <h1 class="!text-6xl" style="color: #103954;">Demo</h1>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 9: Key Takeaways -->

<div class="flex h-full">
  <div class="left-panel w-[29%] h-full">
    <h1 class="!text-2xl !mt-4">Key Takeaways</h1>
    <img src="./images/slide9_img9.png" class="w-48 h-48 mt-auto mb-8 rounded-lg" alt="QR code" />
  </div>
  <div class="flex-1 px-6 py-4 overflow-y-auto">
    <div class="takeaway-item">
      <span class="takeaway-num">1</span>
      <div class="takeaway-text"><strong>Spec-Driven Development: Build Better Software, Faster.</strong></div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">2</span>
      <div class="takeaway-text"><strong>Specs become executable—</strong>Code serves specifications. Stop fighting documentation drift. Specifications generate implementation and stay the single source of truth.</div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">3</span>
      <div class="takeaway-text"><strong>Accelerate feature delivery with structured automation.</strong> Use /speckit.* commands to generate PRDs, design docs, and technical specs—reducing manual documentation effort and keeping artifacts consistent.</div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">4</span>
      <div class="takeaway-text"><strong>Handle requirement changes without rewrites.</strong> Pivots become systematic: update the spec, regenerate implementation. No manual propagation, no technical debt accumulation.</div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">5</span>
      <div class="takeaway-text"><strong>Focus on problem-solving, not translation.</strong> Define what users need and why. Let AI handle mechanical code generation while you architect solutions and make critical decisions.</div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">6</span>
      <div class="takeaway-text"><strong>Tech stack and tool agnostic.</strong> Works with any language, framework, or AI agent (Claude, Copilot, Cursor, Gemini, Windsurf). Version specs like code—branch, review, merge as a team.</div>
    </div>
    <div class="takeaway-item">
      <span class="takeaway-num">7</span>
      <div class="takeaway-text"><strong>Hands-on outcome: Production-ready workflow.</strong> Leave with a working project using the complete SDD lifecycle—immediately applicable to your team's real work.</div>
    </div>
  </div>
</div>

---
transition: slide-up
---

<!-- Slide 10: Q&A -->

<div class="absolute inset-0 flex items-center px-16" style="background-image: url('./images/Picture6.jpg'); background-size: cover; background-position: center;">
  <div>
    <h1 class="!text-6xl" style="color: #103954;">Q&A</h1>
  </div>
</div>

---
transition: fade-out
---

<!-- Slide 11: Thank You -->

<div class="flex h-full" style="background-image: url('./images/slide11_img10.jpg'); background-size: cover; background-position: center;">
  <div class="left-panel w-[29%] h-full">
    <h1 class="!text-xl !mt-2 !leading-snug">Thank you for attending this workshop! Next steps…</h1>
    <img src="./images/slide11_img11.png" class="w-52 mt-auto mb-4 rounded-lg" alt="Decorative image" />
  </div>
  <div class="flex-1 flex flex-col px-8 py-6">
    <div class="flex-1 flex flex-col justify-start gap-4 mt-4">
      <div class="thankyou-item">
        <span class="thankyou-num">1</span>
        <div class="text-base" style="color: #000;">
          <strong>Install Spec Kit</strong> — Run the setup command in your project
        </div>
      </div>
      <div class="thankyou-item">
        <span class="thankyou-num">2</span>
        <div class="text-base" style="color: #000;">
          <strong>Try the workflow</strong> — Start with <code class="!bg-gray-200 !text-gray-900">/speckit.constitution</code> and work through the lifecycle
        </div>
      </div>
      <div class="thankyou-item">
        <span class="thankyou-num">3</span>
        <div class="text-base" style="color: #000;">
          <strong>Adopt SDD in your team</strong> — Share the workflow, version specs alongside code, iterate on specifications
        </div>
      </div>
    </div>
    <div class="cta-box mt-auto">
      <div>
        <p class="!text-white font-semibold">Is this where your learning journey concludes?</p>
        <p class="!text-white/80 !text-sm mt-1">Check out this presentation in my repo</p>
      </div>
      <div class="cta-link">
        <a href="https://github.com/PlagueHO/plagueho.learn" target="_blank">github.com/PlagueHO/plagueho.learn</a>
      </div>
    </div>
  </div>
</div>
