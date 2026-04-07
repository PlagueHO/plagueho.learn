# From Chat to Agents: The Agentic Loop & Microsoft IQ - Presentation Outline

## Metadata

| Field | Value |
|-------|-------|
| **Title** | From Chat to Agents: The Agentic Loop & Microsoft IQ |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 15 minutes |
| **Target Audience** | CTOs, Heads of Architecture (ISVs & SIs across Asia) |
| **Event / Context** | Microsoft Asia Partner CTO Community — Episode 1 |
| **Created** | 2026-04-02 |
| **Last Updated** | 2026-04-07 |
| **Status** | Draft |

## Objectives

What should attendees take away from this presentation?

1. Understand the fundamental shift from stateless ChatCompletions (request/response) to the autonomous ReAct Loop (Reason → Action → Observe).
2. Recognize why tool usage is the critical capability that separates chatbots from enterprise agents.
3. Know the three foundational IQ intelligence layers (Work IQ, Fabric IQ, Foundry IQ) and how they provide agents with enterprise knowledge.
4. Leave with practical guidance on tool design, selection reliability, and Foundry Agent Service v2 as the enterprise runtime.

## Slide Outline

### 1. Title / Hero

- **Layout**: cover-style custom hero (reuse hero-shell pattern from agentic-development-evolution)
- **Content**:
  - Session title "From Chat to Agents: The Agentic Loop & Microsoft IQ", subtitle, event badge, 15-minute visual indicator
  - Presenter card: **Daniel Scott-Raynsford** — Principal Software Engineer, Microsoft; GitHub: [@PlagueHO](https://github.com/PlagueHO)
  - "How this was built" micro-callout as a **single horizontal workflow strip** at the bottom of the hero (keep it light and visual, not text-heavy):
    1. 📞 Teams call with Daphne to outline the content
    2. 🤖 GitHub Copilot + WorkIQ extracted the meeting recap
    3. 📝 Recap used to shape this outline
    4. ⚡ GitHub Copilot CLI constructed the slides from the outline
  - Framing: this presentation is itself a compact example of an agentic workflow — meeting → recap → outline → slides
- **Speaker Notes**: "Before I dive in — a quick note on how this was made. Daphne and I had a Teams call to align on content. I used GitHub Copilot and WorkIQ to pull the meeting recap, shaped it into an outline, then used Copilot CLI to build the slides from that outline. The whole thing is an agentic workflow in miniature — which is exactly what we're here to talk about."
- **Duration**: ~45 sec
- **Discussion / Thoughts**:
  - This slide now does two jobs intentionally: quick presenter introduction and a short meta-story showing the content itself was created via an agentic workflow.
  - We discussed keeping the "how this was built" content small and visual so the hero slide does not become busy; the horizontal workflow strip is the key constraint here.
  - This is useful as a credibility device: it grounds the talk in lived practice rather than abstract platform theory.
  - When refining the final slide, prefer a compact presenter card and avoid turning the build story into a paragraph.

### 2. From Chat to the ReAct Loop

- **Layout**: two-stage visual — request/response on the left, ReAct loop on the right
- **Content**:
  - Stage 1: classic ChatCompletions flow (User → API → Response)
  - Stage 2: ReAct loop (Reason → Action → Observe → repeat)
  - One-line contrast: **single-turn answers vs iterative, tool-using agents**
- **Speaker Notes**: "Most organizations are still here on the left: request, response, done. Agents are different because they run a loop: reason, act, observe, and continue until the task is complete."
- **Duration**: ~2.5 min
- **Animations**: Reveal left side first, then transition to the loop on the right
- **Discussion / Thoughts**:
  - This merges the old problem/setup slide with the ReAct explanation to save time while preserving the strongest transition in the deck.
  - The audience should be able to grasp the shift in one visual glance: linear flow on one side, loop on the other.
  - Keep the airport scenario implied or lightly referenced here, but don't spend time on implementation details yet.
  - This is still the conceptual anchor; the rest of the deck depends on this landing quickly.

### 3. Why Tools Are Everything

- **Layout**: center visual with progression strip
- **Content**:
  - "An agent without tools is just a chatbot with anxiety."
  - Tools = the agent's hands
  - Visual progression: **CRUD tools → smart knowledge tools → agentic tools**
  - Short callout: **smart knowledge tools become a moat** because they combine business context, multiple knowledge sources, governance, and reasoning
- **Speaker Notes**: "The real differentiator is not the model alone. It's the tools. And those tools are evolving from CRUD wrappers into smart, business-aware tools that increasingly look agentic themselves."
- **Duration**: ~2 min
- **Animations**: Reveal progression strip left to right
- **Discussion / Thoughts**:
  - This is the slide where the three new principles start to land most clearly.
  - Keep this visual and directional rather than encyclopedic; the audience should remember the evolution and the moat idea.
  - Avoid too many tool categories or protocols here. The point is the operating model change.
  - This slide sets up both the runtime discussion and the IQ discussion.

### 4. Foundry Runtime + Agent Choice

- **Layout**: top-half runtime architecture + bottom-half agent type comparison
- **Content**:
  - Top: Foundry Agent Service v2 as the runtime that orchestrates the ReAct loop, tools, and governance
  - Bottom: simple side-by-side cards
    - **Responses Agent** — code-owned, flexible, fast iteration
    - **Foundry Agent** — versioned, governed, service-managed
  - Decision strip: **"Speed and code ownership vs governance and lifecycle control."**
- **Speaker Notes**: "Once you decide tools matter, the next question is where this runs and how the agent is defined. Foundry is the runtime. Then you choose whether the definition lives in code or in the platform."
- **Duration**: ~2.5 min
- **Animations**: Runtime first, then the two agent cards, then the decision strip
- **Discussion / Thoughts**:
  - This re-merges runtime and agent choice because the 15-minute version needs fewer slide transitions.
  - Keep the runtime visual very simple so it doesn't fight with the agent-type comparison.
  - The key framing still matters: this is a lifecycle/governance choice, not a power comparison.
  - If this starts to feel crowded in design, drop detail from the runtime, not from the agent comparison.

### 5. IQ Layers in Action

- **Layout**: three-column IQ layer summary above or alongside one concrete airport scenario
- **Content**:
  - Work IQ 🏢 — people, meetings, email, organizational context
  - Fabric IQ 📊 — business data, semantic models, graph-aware analytics
  - Foundry IQ 🧠 — enterprise knowledge, retrieval, grounding across sources
  - Airport example: one smart knowledge tool reasons across schedules, maintenance, SOPs, and communications rather than acting like a thin CRUD wrapper
  - Callout: **this is where the moat comes from** — governed, business-aware reasoning over multiple sources
- **Speaker Notes**: "These IQ layers are what make the tools smart. They let a tool understand people context, business data, and enterprise knowledge together — which is where differentiated value comes from."
- **Duration**: ~2.5 min
- **Animations**: Reveal each IQ pillar, then show the airport synthesis example
- **Discussion / Thoughts**:
  - This merges the old IQ architecture and airport scenario slides to save time while keeping the concrete example.
  - Keep each IQ pillar to a short label plus one phrase. Most of the meaning should come from the visual and the airport example.
  - This is the best place to land the moat idea in a way that feels tangible rather than abstract.
  - The audience should leave this slide thinking "our advantage is in the governed knowledge/tool layer."

### 6. Governing Intelligent Tool Use

- **Layout**: three-card visual + one compact anti-pattern callout
- **Content**:
  - Card 1 — **Describe tools clearly**: precise names, purpose, and input/output shape
  - Card 2 — **Prefer intelligent knowledge tools**: avoid wrapping every REST endpoint as a separate tool; encode business context and reasoning where it belongs
  - Card 3 — **Govern and measure selection**: guide the agent on which tools to use, when to use them, and measure appropriateness with evaluation harnesses
  - Anti-pattern callout: **"1,000 tiny tools kills selection accuracy."**
  - Optional small footer: **Sensei-style evaluation loop** for measuring whether the right tool was selected
- **Speaker Notes**: "Once tools become smarter, governance shifts from simple access control to deciding which tool should be used, when, and how. That only works if you can measure whether the right tool was selected."
- **Duration**: ~2 min
- **Animations**: Reveal one card at a time, then the anti-pattern banner
- **Discussion / Thoughts**:
  - This is the most important engineering slide in the short version, so keep it sharp and non-verbose.
  - The anti-pattern of tool proliferation and the need for measurement are the two big things to preserve here.
  - Avoid code in the 15-minute version unless it is absolutely tiny.
  - The link to Sensei belongs as a discussion/refinement note or subtle footer, not as a deep detour.

### 7. Key Takeaways / Q&A

- **Layout**: default
- **Content**: Five CTO-level takeaways:
  1. The loop changes everything — move from request/response to Reason → Action → Observe
  2. Tools are evolving — from CRUD wrappers to smart knowledge tools and, increasingly, agentic tools
  3. Smart knowledge tools are a moat — they combine governed business context and multiple knowledge sources
  4. Foundry gives you the runtime and a choice of agent lifecycle model
  5. Govern and measure tool selection — intelligent tool use is an engineering discipline
- **Speaker Notes**: Re-anchor on the operating model shift, then open for questions. Each takeaway maps directly to the section sequence they just saw.
- **Duration**: ~2.25 min
- **Animations**: Progressive reveal
- **Discussion / Thoughts**:
  - The 15-minute version needs a firmer, shorter landing. Five takeaways is enough.
  - Keep this as recap plus Q&A opening, not as another content slide.
  - If time gets squeezed live, this slide can be spoken to selectively rather than line-by-line.

## Resources & Links

Links to share with attendees or reference during the talk.

### Foundry Agent Service

- [Azure AI Foundry Agent Service documentation](https://learn.microsoft.com/en-us/azure/ai-services/agents/)
- [Microsoft Agent Framework — Two Agent Types](https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry?pivots=programming-language-csharp#two-agent-types)

### Model Context Protocol (MCP)

- [Model Context Protocol specification](https://modelcontextprotocol.io/)
- [MCP Introduction](https://modelcontextprotocol.io/introduction)
- [MCP Architecture](https://modelcontextprotocol.io/docs/learn/architecture)

### Agent-to-Agent (A2A) Protocol

- [A2A Protocol documentation](https://google.github.io/A2A/)
- [A2A GitHub repository](https://github.com/google/A2A)

### Microsoft IQ Intelligence Layers

- [Work IQ overview](https://www.microsoft.com/en-us/microsoft-365/blog/2025/05/19/from-ai-ready-to-ai-first-the-agentic-web-and-the-new-microsoft-365/)
- [Fabric IQ overview](https://www.microsoft.com/en-us/microsoft-fabric/blog/2025/05/19/microsoft-fabric-at-build-2025-turn-your-data-into-an-ai-advantage/)
- [Foundry IQ overview](https://azure.microsoft.com/en-us/blog/accelerating-ai-app-development-with-azure-ai-foundry/)

### Presentation Source

- [Presentation source repository](https://github.com/PlagueHO/plagueho.learn)

## Evolution Log

Track changes to the presentation as it evolves.

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-02 | Initial outline created | New presentation for Microsoft Asia Partner CTO Community Episode 1 |
| 2026-04-07 | Expanded Slide 1 with presenter intro (Daniel Scott-Raynsford) and "how this was built" callout (Teams call → WorkIQ recap → outline → Copilot CLI slides) | Requested addition; also frames the presentation itself as an agentic workflow example |
| 2026-04-07 | Moved Foundry Agent Service slide from position 7 to 4; added two-agent-type visual comparison (Responses Agent vs Foundry Agent) with pros/cons and decision guidance; updated Key Takeaways to include agent type selection | Requested addition of visual agent-type comparison sourced from Microsoft Agent Framework docs |
| 2026-04-07 | Reordered the middle of the deck for cleaner narrative flow (tools before runtime), split runtime vs agent-type choice into separate slides, simplified the tool-reliability slide, and merged closing content into Key Takeaways / Q&A | Improve succinctness, slide-to-slide buildup, and visual clarity; reduce risk of wall-of-text slides |
| 2026-04-07 | Compressed the deck from 10 slides to 7 for a 15-minute format by merging adjacent concept slides (problem + loop, runtime + agent choice, IQ layers + airport scenario) and tightening the close | New presentation time limit required a significantly leaner structure with less transition overhead |
