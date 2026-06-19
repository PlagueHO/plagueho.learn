---
title: "Iteration 1: 12-minute talk-fit structure cues from official docs and samples"
source_url: "https://learn.microsoft.com/agent-framework/get-started/your-first-agent"
source_title: "Step 1: Your First Agent"
source_date: "2026-06-19"
area: "orchestration-patterns"
type: "presentation-structure"
dimensions:
  - "talk-structure"
  - "official-sample-flow"
  - "pattern-selection"
  - "demo-scoping"
extracted: "2026-06-19"
quality: "draft"
---

## Key facts

- Official docs already present a compact progression that fits short technical talks: first runnable agent, then pattern-choice framing, then workflow core concepts and samples. (Sources: https://learn.microsoft.com/agent-framework/get-started/your-first-agent, https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern, https://learn.microsoft.com/agent-framework/workflows/#core-concepts)
- The journey guide explicitly recommends starting simple and only escalating to workflows when explicit execution control is required. (Source: https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern)
- The orchestration samples index provides curated scenario slices (baseline + guardrail variants) that support tight demo scope for time-boxed delivery. (Source: https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/orchestrations/README.md)

## Exact claim support text

> "Create an agent and get a response - in just a few lines of code."

> "Before reaching for workflows, we recommend you first try simpler patterns ... Workflows are most useful when you need guaranteed execution order that a single agent can't reliably provide on its own."

> "Choosing the right pattern" table: model-directed vs developer-directed boundaries.

> "Core Concepts: Executors, Edges, Events, Workflow Builder & Execution"

> Magentic sample set includes: `magentic.py`, `magentic_human_plan_review.py`, `magentic_checkpoint.py`.

## Safe-to-claim

- A 12-minute narrative can be grounded in official structure: minimal hello-agent, pattern-choice decision point, one orchestrated sample + one guardrail variant.
- Use official comparison language (model decides vs developer decides) for architecture decision framing.
- Use sample taxonomy to justify selecting only one baseline and one guardrail scenario.

## Do-not-claim

- Do not claim official docs prescribe exact minute-by-minute presentation timing.
- Do not imply all orchestrations should be demoed in a short slot; the official structure supports selective depth.

No official numeric metric found in reviewed primary sources.

## Suggested talk-fit cue stack (source-grounded)

1. Open with "first agent" runnable minimal example.
2. Introduce "who decides next step" decision boundary.
3. Show workflow core concepts with one diagram.
4. Demo one orchestration baseline.
5. Add one guardrail variant (HITL approval, plan review, or checkpoint resume).

## Questions raised

- Which single orchestration pattern best matches the target audience's production concerns for this specific Build 2026 session?
