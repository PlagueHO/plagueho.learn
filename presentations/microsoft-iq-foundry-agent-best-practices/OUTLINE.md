# From Chat to Agents: The Agentic Loop & Microsoft IQ - Presentation Outline

## Metadata

| Field | Value |
|-------|-------|
| **Title** | From Chat to Agents: The Agentic Loop & Microsoft IQ |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 20 minutes |
| **Target Audience** | CTOs, Heads of Architecture (ISVs & SIs across Asia) |
| **Event / Context** | Microsoft Asia Partner CTO Community — Episode 1 |
| **Created** | 2026-04-02 |
| **Last Updated** | 2026-04-02 |
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
- **Content**: Session title "From Chat to Agents: The Agentic Loop & Microsoft IQ", subtitle, presenter name/role, event badge, 20-minute visual indicator
- **Speaker Notes**: Brief intro — set the thesis that most orgs are still in stateless AI mode and the ReAct loop changes everything
- **Duration**: ~30 sec

### 2. The Problem: AI Stopped at Request/Response

- **Layout**: default two-column with Mermaid diagrams
- **Content**:
  - Left = Simple ChatCompletions flow (User → API → Response)
  - Right = What enterprises actually need (multi-step, tool-using, context-aware)
  - Key comparison: single-turn vs iterative, stateless vs stateful, no tools vs tool-augmented
- **Speaker Notes**: "Most organizations are still building single-turn integrations. The model answers, then forgets. No tools, no memory, no autonomy."
- **Duration**: ~2 min
- **Animations**: Progressive reveal — show simple first, then enterprise reality

### 3. The Shift: Introducing the ReAct Loop

- **Layout**: full-width with interactive Vue component
- **Content**: The ReAct loop: Reason → Action → Observe → (repeat until done). Uses embedded `ReActLoopAnimation.vue` component showing an airport management scenario with tool calls (get_flight_schedule, get_maintenance_log, notify_operations)
- **Speaker Notes**: "The agent doesn't just answer — it thinks, acts, observes, and iterates. This is the fundamental loop that makes autonomy possible."
- **Duration**: ~3 min
- **Animations**: Interactive click-driven Vue component

### 4. Why Tools Are Everything

- **Layout**: center visual with comparison
- **Content**: "An agent without tools is just a chatbot with anxiety." Tools = the agent's hands (APIs, databases, functions, services). Without tools: hallucination, inability to act. With tools: grounded responses, real actions, verified data.
- **Speaker Notes**: Bridge from the loop concept to why tools matter — the ACTION step is meaningless without real tool integrations.
- **Duration**: ~2 min
- **Animations**: Progressive reveal of tool categories

### 5. The Three IQ Layers: Enterprise Intelligence

- **Layout**: default three-column architecture with Mermaid diagram
- **Content**:
  - Work IQ 🏢 — organizational context from M365
  - Fabric IQ 📊 — business data intelligence with ontology, semantic models, graph engine
  - Foundry IQ 🧠 — enterprise knowledge integration, cross-source retrieval, grounding
- **Speaker Notes**: "These aren't products — they're intelligence layers. Without them, your agent is operating blind in the enterprise."
- **Duration**: ~3 min
- **Animations**: Each IQ pillar animates in sequence with v-clicks

### 6. IQ in Action: Airport Operations

- **Layout**: full-width Mermaid scenario diagram
- **Content**: Airport management agent using all three IQ layers: Work IQ retrieves ops team schedules/comms. Fabric IQ queries flight ops data, maintenance schedules. Foundry IQ grounds in SOPs, regulatory docs, historical incidents.
- **Speaker Notes**: "In a real enterprise scenario, the agent draws from ALL three intelligence layers simultaneously to make reliable decisions."
- **Duration**: ~2 min
- **Animations**: None (static reference diagram)

### 7. Foundry Agent Service v2: The Runtime

- **Layout**: default with architecture diagram (Mermaid)
- **Content**: How Foundry Agent Service v2 orchestrates the ReAct loop at scale: Built-in ReAct execution, MCP tool registration, A2A agent communication, enterprise governance (identity, tracing, audit, human-in-the-loop), multi-model support.
- **Speaker Notes**: "You don't build the loop — the platform runs it. You define the tools, the guardrails, and the knowledge sources."
- **Duration**: ~2.5 min
- **Animations**: Progressive reveal of capability layers

### 8. Ensuring Agents Call the Right Tools

- **Layout**: default two-column with code snippet
- **Content**:
  - (1) Clear tool descriptions — precision matters
  - (2) Schema validation — define inputs/outputs
  - (3) Scoped tool sets — don't overload
  - (4) Fallback strategies — circuit breakers, retries
  - (5) Evaluation — test tool selection in CI
  - Code snippet showing MCP tool registration example
- **Speaker Notes**: "Tool reliability is an engineering discipline, not a prompt trick. Treat tool definitions like API contracts."
- **Duration**: ~2.5 min
- **Animations**: Progressive reveal of fundamentals

### 9. Key Takeaways

- **Layout**: default
- **Content**: Five CTO-level takeaways:
  1. The loop changes everything — move from request/response to Reason → Action → Observe
  2. Tools are the interface via MCP — agents act through well-defined tool contracts
  3. IQ layers are non-negotiable — Work IQ, Fabric IQ, and Foundry IQ ground agents in enterprise reality
  4. The platform runs the loop — Foundry Agent Service v2 handles orchestration, governance, and scale
  5. Evaluate tool reliability — treat tool selection as a testable, measurable engineering concern
- **Speaker Notes**: Re-anchor on the operating model shift. Each takeaway maps to a section they just saw.
- **Duration**: ~1.5 min
- **Animations**: Progressive reveal

### 10. Thank You / Q&A

- **Layout**: center
- **Content**: Thank you, contact info, links to resources, QR code to repo
- **Speaker Notes**: "These slides and the interactive ReAct demo are open source. Scan the QR code."
- **Duration**: ~30 sec

## Resources & Links

Links to share with attendees or reference during the talk.

### Foundry Agent Service

- [Azure AI Foundry Agent Service documentation](https://learn.microsoft.com/en-us/azure/ai-services/agents/)
- [Foundry Agent Service overview](https://learn.microsoft.com/en-us/azure/ai-services/agents/overview)

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
