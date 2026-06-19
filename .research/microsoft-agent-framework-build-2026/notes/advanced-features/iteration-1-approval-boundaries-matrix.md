---
title: "Iteration 1: Approval boundaries matrix (tool approval vs permissions vs workflow HITL)"
source_url: "https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations"
source_title: "Microsoft Agent Framework Workflows - Human-in-the-loop (HITL)"
source_date: "2026-06-19"
area: "advanced-features"
type: "boundary-matrix"
dimensions:
  - "tool-approval"
  - "runtime-permissions"
  - "workflow-hitl"
  - "governance-boundaries"
extracted: "2026-06-19"
quality: "draft"
---

## Key facts

- Tool approval is a per-tool execution gate that can pause execution and request a human decision before tool execution continues. (Sources: https://learn.microsoft.com/agent-framework/agents/tools/tool-approval, https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential#sequential-orchestration-with-human-in-the-loop)
- Workflow HITL is a request/response orchestration mechanism (`RequestPort`, `RequestInfoEvent`) for pause/resume checkpoints and external input handling. (Source: https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)
- Runtime permission handlers (for example GitHub Copilot permissions) are capability-surface controls for shell/file/URL access and are distinct from framework tool-approval semantics. (Sources: https://learn.microsoft.com/agent-framework/agents/providers/github-copilot, https://learn.microsoft.com/agent-framework/agents/tools/)

## Exact claim support text

> "Tool Approval is a framework feature that lets you gate every tool invocation ... through a human-in-the-loop decision before the model receives the result."

> "When the agent attempts to call an approval-required tool, the workflow pauses and emits a `RequestInfoEvent` ..."

> "By default, the agent cannot execute shell commands, read/write files, or fetch URLs. To enable these capabilities, provide a permission handler via `SessionConfig`."

> "Shell / file system / URL fetching ... Built into the Copilot CLI runtime and gated by the Permissions handler you supply."

## Boundaries matrix

| Boundary | What it controls | Trigger surface | Pause/resume model |
| --- | --- | --- | --- |
| Tool Approval | Whether a specific tool call is allowed to execute | Agent tool invocation | Yes, per tool call |
| Runtime Permission Handler | Capability access (shell/file/url in runtime) | Provider runtime permission request | Not equivalent to per-tool framework approval |
| Workflow HITL | Explicit workflow request/response gates | `RequestInfoEvent` / request ports / orchestration events | Yes, orchestration-level pause/resume |

## Safe-to-claim

- These are three separate control boundaries and should be described separately.
- Tool Approval can be surfaced through workflow HITL events in orchestrations.
- Copilot permission handlers govern runtime capabilities and are not the same feature as Tool Approval.

## Do-not-claim

- Do not collapse runtime permission handlers and tool approval into one mechanism.
- Do not describe workflow HITL as only "tool approval"; it also covers generic request/response pauses.

No official numeric metric found in reviewed primary sources.

## Limitations and constraints

- Different providers expose different runtime capabilities; the boundary model must stay provider-aware.
- Orchestration and direct agent runs can surface approvals differently while preserving underlying semantics.

## Questions raised

- For presentation simplification, should the matrix be shown as a "who decides" table (human/tool/runtime/orchestrator) to avoid audience confusion?
