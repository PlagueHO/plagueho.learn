---
title: "Iteration 1: Canonical pipeline terminology alignment"
source_url: "https://learn.microsoft.com/agent-framework/agents/agent-pipeline"
source_title: "Agent pipeline architecture"
source_date: "2026-06-19"
area: "agent-harness-core-loop"
type: "terminology-alignment"
dimensions:
  - "pipeline-architecture"
  - "runtime-model"
  - "official-vocabulary"
  - "taxonomy-alignment"
extracted: "2026-06-19"
quality: "draft"
---

## Key facts

- The official docs define a layered agent pipeline and provide canonical layer names that should anchor terminology. (Source: https://learn.microsoft.com/agent-framework/agents/agent-pipeline)
- The agents page defines a "Default Agent Runtime Execution Model" and deterministic loop framing across agent types. (Source: https://learn.microsoft.com/agent-framework/agents/)
- Overview and workflows docs define top-level taxonomy as `Agents` and `Workflows`, with workflow core concepts (`executors`, `edges`, `events`, builder/execution). (Sources: https://learn.microsoft.com/agent-framework/overview/, https://learn.microsoft.com/agent-framework/workflows/#core-concepts)

## Exact claim support text

> "Agents in Microsoft Agent Framework use a layered pipeline architecture to process requests."

> "The `ChatClientAgent` builds a pipeline with three main layers: 1. Agent middleware 2. Context layer 3. Chat client layer"

> "Default Agent Runtime Execution Model"

> "Agent Framework offers two primary categories of capabilities: Agents ... Workflows ..."

> "Core Concepts: Executors, Edges, Events, Workflow Builder & Execution"

## Canonical term map

| Use this canonical term | Avoid presenting as canonical |
| --- | --- |
| Agent middleware layer | Custom renamed top layer without explicit mapping |
| Context layer / context providers | Generic "memory layer" taxonomy without mapping |
| Chat client layer / raw provider client | Custom transport layer labels presented as official |
| Default Agent Runtime Execution Model | Unattributed custom runtime loop name |
| Workflows: executors, edges, events | Bespoke graph terms without crosswalk |

## Safe-to-claim

- Use Microsoft terms as the canonical vocabulary for architecture diagrams and narration.
- If custom abstraction is used for teaching, include an explicit one-to-one mapping to official terms.
- Keep top-level split as Agents vs Workflows.

## Do-not-claim

- Do not present custom layer names as official framework terminology.
- Do not mix provider-specific terms into the canonical framework vocabulary without qualification.

No official numeric metric found in reviewed primary sources.

## Limitations and constraints

- Some specialized agents have pipeline differences; terminology should preserve this caveat.
- Python and .NET implementation details vary, but core canonical terms are shared.

## Questions raised

- For slide clarity, should one canonical diagram be shown with an optional "language-specific nuances" callout rather than separate taxonomies?
