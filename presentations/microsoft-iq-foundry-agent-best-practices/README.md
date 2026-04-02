# Microsoft IQ & Foundry Agent Best Practices

## Session Details

| Field | Value |
|-------|-------|
| **Title** | From Chat to Agents: The Agentic Loop & Microsoft IQ |
| **Event** | Microsoft Asia Partner CTO Community — Episode 1 |
| **Presenter** | Daniel Scott-Raynsford |
| **Duration** | 20 minutes |
| **Audience** | CTOs, Heads of Architecture (ISVs & SIs across Asia) |
| **Date** | 10 April 2026, 11:00–12:00 SGT |
| **Level** | L100–L200 |

## Running the Presentation

```bash
# Dev server with hot reload
pnpm exec slidev presentations/microsoft-iq-foundry-agent-best-practices/slides.md

# Build static SPA
pnpm exec slidev build presentations/microsoft-iq-foundry-agent-best-practices/slides.md

# Export to PDF
pnpm exec slidev export presentations/microsoft-iq-foundry-agent-best-practices/slides.md
```

## Session Abstract

This session introduces the fundamental architectural shift from stateless ChatCompletions (simple request/response) to the autonomous **ReAct Loop** (Reason → Action → Observe) that powers modern AI agents. Through an interactive animated demo and an airport management scenario, attendees will understand why tool usage is the critical capability that separates chatbots from agents, and how Microsoft's three foundational intelligence layers — **Foundry IQ**, **Work IQ**, and **Fabric IQ** — provide the enterprise knowledge agents need to perform tasks reliably. The session closes with practical guidance on tool design, selection reliability, and Foundry Agent Service v2 as the enterprise runtime.

## Key Topics

1. The shift from ChatCompletions to the Agentic Loop
2. The ReAct pattern: Reason → Action → Observe
3. Why tools are the critical capability for agents
4. The three IQ layers: Work IQ, Fabric IQ, Foundry IQ
5. Foundry Agent Service v2 architecture
6. Tool selection and reliability fundamentals
