---
title: "Iteration 1: Durable reliability claim boundary (verified support + explicit absence)"
source_url: "https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework"
source_title: "Durable Task extension for Microsoft Agent Framework"
source_date: "2026-06-19"
area: "sdk-integrations"
type: "claim-boundary"
dimensions:
  - "durability"
  - "checkpointing"
  - "failure-recovery"
  - "attribution-precision"
extracted: "2026-06-19"
quality: "draft"
---

## Key facts

- Durable execution support is explicitly documented for Agent Framework integration, including persistent sessions and recovery semantics. (Source: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)
- The integration states that completed agent calls are not re-executed during recovery, which supports cost/time preservation claims without numeric percentages. (Source: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)
- Durable Task framing documents automatic checkpointing and resume behavior, but does not provide a numeric recovery success percentage in reviewed primary pages. (Sources: https://learn.microsoft.com/azure/durable-task/sdks/durable-task-for-ai-agents, https://learn.microsoft.com/azure/durable-task/common/what-is-durable-task)

## Exact claim support text

> "Persistent conversation state — Agent sessions survive process crashes, restarts, and scaling events without losing context."

> "Each agent call is checkpointed, and the orchestration recovers automatically if any step fails. Completed agent calls aren't re-executed on recovery."

> "Automatic checkpointing — The Durable Task runtime checkpoints every state transition (LLM responses, tool call results, control flow decisions) to durable storage."

> "Resume from last checkpoint — When a failure occurs, execution resumes automatically on a healthy VM."

> "Durable Task workflows can run for hours, days, or even months, reliably resuming from the last completed step after any crash, restart, or redeployment."

## Safe-to-claim

- Durable Task + Agent Framework supports persistent sessions, automatic checkpointing, and automatic recovery/resume behavior.
- Completed calls are not re-executed on recovery (as documented in integration guidance).
- Reliability claims should be phrased as qualitative runtime guarantees documented in product guidance.

## Do-not-claim

- Do not claim any numeric recovery reliability percentage (for example, "99.x% recovery success") from these sources.
- Do not imply a formal SLA percentage from these pages.

No official numeric metric found in reviewed primary sources.

## Limitations and constraints

- Numeric reliability/SLA statements require an official SLA document that exactly matches the deployed service/runtime scope.
- The reviewed pages provide behavior guarantees and patterns, not benchmarked percentage outcomes.

## Questions raised

- Is there an official Azure SLA page that explicitly covers the exact Durable Task Scheduler + Agent Framework scenario intended for the presentation claim?
