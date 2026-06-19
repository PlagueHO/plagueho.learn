# Agent Framework Build 2026 — Discovered Sources

## Research Area 1: Agent Harness Core Loop

### Source 1 — Agent Pipeline Architecture
- **URL**: https://learn.microsoft.com/agent-framework/agents/agent-pipeline
- **Type**: Official Docs
- **Relevance**: 5/5 — Complete execution pipeline showing context providers, middleware, and chat client layers
- **Snippet**: Details the full agent invocation flow including telemetry, context loading, function invocation, and provider-specific communication

### Source 2 — Default Agent Runtime Execution Model
- **URL**: https://learn.microsoft.com/agent-framework/agents/
- **Type**: Official Docs
- **Relevance**: 5/5 — Core agent types and execution model diagram showing the structured runtime loop
- **Snippet**: Explains all agent types (simple agents, Foundry agents, specialized providers) derived from AIAgent base class with consistent interface

### Source 3 — Session Management & Context Providers
- **URL**: https://learn.microsoft.com/agent-framework/agents/conversations/
- **Type**: Official Docs
- **Relevance**: 5/5 — AgentSession structure and context provider lifecycle patterns
- **Snippet**: Shows session creation, rehydration, context provider hooks (before/after), and multi-turn conversation state management

### Source 4 — Runtime Context & Middleware
- **URL**: https://learn.microsoft.com/agent-framework/agents/middleware/runtime-context
- **Type**: Official Docs
- **Relevance**: 5/5 — Shared state management via StateBag, middleware invocation context, session access patterns
- **Snippet**: Explains type-safe, thread-safe storage that persists across runs and is accessible from middleware and tools

### Source 5 — Adding Context Providers
- **URL**: https://learn.microsoft.com/agent-framework/journey/adding-context-providers
- **Type**: Official Docs
- **Relevance**: 5/5 — Context provider two-phase lifecycle and window management strategies
- **Snippet**: Context providers participate automatically in each invocation with "before" (inject) and "after" (extract) hooks

### Source 6 — GitHub Repository: Core Samples
- **URL**: https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/01-get-started
- **Type**: GitHub Code
- **Relevance**: 4/5 — Progressive tutorial from hello-agent to hosting with working examples
- **Snippet**: Get-started samples showing agent creation patterns and progressive capability building

---

## Research Area 2: Agent Capabilities

### Source 1 — Adding Tools
- **URL**: https://learn.microsoft.com/agent-framework/journey/adding-tools
- **Type**: Official Docs
- **Relevance**: 5/5 — Tool types (function, MCP, provider-hosted), descriptions, error handling, and approval patterns
- **Snippet**: Comprehensive guide on function tools, MCP server integration, and choosing the right tool type

### Source 2 — Tool Approval (Human-in-the-Loop)
- **URL**: https://learn.microsoft.com/agent-framework/agents/tools/tool-approval
- **Type**: Official Docs
- **Relevance**: 5/5 — Tool approval mechanisms for sensitive operations and approval workflows
- **Snippet**: Explains how approval-required tools pause execution and return approval requests to the user

### Source 3 — Agent Skills
- **URL**: https://learn.microsoft.com/agent-framework/agents/skills
- **Type**: Official Docs
- **Relevance**: 5/5 — Four-stage progressive disclosure pattern, skill sources, and security best practices
- **Snippet**: Skills package domain expertise with instructions, references, scripts while minimizing context overhead

### Source 4 — Adding Skills
- **URL**: https://learn.microsoft.com/agent-framework/journey/adding-skills
- **Type**: Official Docs
- **Relevance**: 5/5 — Skills vs tools comparison, progressive disclosure implementation, and common pitfalls
- **Snippet**: Skills provide domain expertise (instructions + references + scripts), tools provide single actions

### Source 5 — Python 2026 Significant Changes — Skills & Tools
- **URL**: https://learn.microsoft.com/agent-framework/support/upgrade/python-2026-significant-changes
- **Type**: Official Docs
- **Relevance**: 4/5 — Recent changes including ClassSkill, McpSkillsSource, and info-flow control for prompt injection defense
- **Snippet**: Shows latest skill registration patterns and security enhancements in Python implementation

### Source 6 — GitHub Repository: Agent Samples
- **URL**: https://github.com/microsoft/agent-framework/tree/main/python/samples/02-agents
- **Type**: GitHub Code
- **Relevance**: 4/5 — Deep-dive samples by topic: tools, middleware, providers, observability
- **Snippet**: Topic-specific samples showing tools, providers, middleware, and observability patterns

---

## Research Area 3: Advanced Features

### Source 1 — Human-in-the-Loop (HITL)
- **URL**: https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop
- **Type**: Official Docs
- **Relevance**: 5/5 — Tool approval, request/response patterns, checkpoint integration with HITL
- **Snippet**: RequestPort pattern and ToolApprovalRequestContent enable workflow pause/resume with human input

### Source 2 — Checkpoints & Persistence
- **URL**: https://learn.microsoft.com/agent-framework/workflows/checkpoints
- **Type**: Official Docs
- **Relevance**: 5/5 — FileCheckpointStorage, checkpoint creation/restoration, security considerations
- **Snippet**: Automatic persistence of executor state, cross-executor state, and message queues with restricted unpickler

### Source 3 — Session Persistence & Serialization
- **URL**: https://learn.microsoft.com/agent-framework/agents/conversations/session
- **Type**: Official Docs
- **Relevance**: 5/5 — AgentSession structure, serialization, service-managed continuity patterns
- **Snippet**: Sessions maintain conversation context with optional persistence and service-managed continuity

### Source 4 — Context Compaction Strategies
- **URL**: https://learn.microsoft.com/agent-framework/agents/conversations/compaction
- **Type**: Official Docs
- **Relevance**: 5/5 — Token management and context window efficiency for long-running agents
- **Snippet**: Compaction strategies summarize or trim history while preserving key information

### Source 5 — Anthropic Claude Integration & Advanced Patterns
- **URL**: https://learn.microsoft.com/agent-framework/agents/providers/anthropic
- **Type**: Official Docs
- **Relevance**: 4/5 — Claude model support, structured outputs, streaming, extended thinking
- **Snippet**: Integration with Anthropic APIs including response format and thinking modes

### Source 6 — GitHub Repository: Workflow & HITL Samples
- **URL**: https://github.com/microsoft/agent-framework/tree/main/python/samples/03-workflows
- **Type**: GitHub Code
- **Relevance**: 4/5 — Workflow creation, orchestration patterns, and human-in-the-loop implementations
- **Snippet**: Complete workflow samples with checkpointing and HITL approval patterns

---

## Research Area 4: SDK Integrations

### Source 1 — GitHub Copilot SDK Integration
- **URL**: https://learn.microsoft.com/agent-framework/agents/providers/github-copilot
- **Type**: Official Docs
- **Relevance**: 5/5 — CopilotClient, GitHubCopilotAgent, shell/file/URL capabilities, permissions
- **Snippet**: GitHub Copilot agents enable shell command execution, file operations, MCP server integration

### Source 2 — Copilot Studio Integration
- **URL**: https://learn.microsoft.com/microsoft-copilot-studio/publication-integrate-web-or-native-app-m365-agents-sdk
- **Type**: Official Docs
- **Relevance**: 4/5 — Integration patterns with Microsoft 365 Agents SDK, authentication, configuration
- **Snippet**: Connect Copilot Studio agents to web/native apps or surface custom agents in Copilot

### Source 3 — Foundry Agent Service & Azure OpenAI Integration
- **URL**: https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry
- **Type**: Official Docs
- **Relevance**: 5/5 — Foundry Agent Service, AIProjectClient, streaming, session management
- **Snippet**: Foundry integration via AIProjectClient.AsAIAgent() with built-in session management

### Source 4 — Python 2026 GitHub Copilot & Foundry Updates
- **URL**: https://learn.microsoft.com/agent-framework/support/upgrade/python-2026-significant-changes
- **Type**: Official Docs
- **Relevance**: 4/5 — Latest SDK integrations including Monty CodeAct, Foundry Adaptive Evals, GitHub Copilot v1.0.0b2
- **Snippet**: Recent additions include agent-framework-monty for CodeAct, enhanced Foundry integrations

### Source 5 — Building Durable Agents with Foundry
- **URL**: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
- **Type**: Official Docs
- **Relevance**: 4/5 — Durable Functions + Agent Framework, serverless hosting, scheduler integration
- **Snippet**: Durable agents provide session persistence and state management through Durable Task Scheduler

### Source 6 — Microsoft 365 Agents & Copilot Integration
- **URL**: https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot
- **Type**: Official Docs
- **Relevance**: 4/5 — M365 Agents Toolkit, channel adapters, enterprise agent store integration
- **Snippet**: Surface agents in Microsoft 365 Copilot using channel adapters and enterprise policies

---

## Research Area 5: Orchestration Patterns

### Source 1 — Workflow Orchestrations Overview
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/
- **Type**: Official Docs
- **Relevance**: 5/5 — All 5 built-in patterns: Sequential, Concurrent, Handoff, Group Chat, Magentic
- **Snippet**: Orchestrations handle boilerplate agent coordination with support for human-in-the-loop

### Source 2 — Sequential Orchestration
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential
- **Type**: Official Docs
- **Relevance**: 5/5 — Sequential agent execution with tool approval and request info patterns
- **Snippet**: Agents execute one after another, each building on previous output with optional human review

### Source 3 — Group Chat Orchestration
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat
- **Type**: Official Docs
- **Relevance**: 5/5 — Collaborative multi-agent patterns with speaker selection strategies
- **Snippet**: Agents collaborate in shared conversation with orchestrator determining speaker selection

### Source 4 — Handoff Orchestration
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff
- **Type**: Official Docs
- **Relevance**: 5/5 — Agent handoff patterns, specialist routing, autonomous mode, approval workflows
- **Snippet**: Agents transfer control based on context with support for autonomous operation and approval gates

### Source 5 — Magentic Orchestration
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic
- **Type**: Official Docs
- **Relevance**: 5/5 — Dynamic manager-based coordination for open-ended complex tasks
- **Snippet**: Magentic manager dynamically coordinates specialists with planning, balancing structure and flexibility

### Source 6 — Concurrent Orchestration
- **URL**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent
- **Type**: Official Docs
- **Relevance**: 5/5 — Parallel agent execution for independent tasks and latency reduction
- **Snippet**: Agents execute in parallel with results aggregation, useful for independent subtasks

### Source 7 — Multiple-Agent Workflow Automation Architecture
- **URL**: https://learn.microsoft.com/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation
- **Type**: Azure Architecture
- **Relevance**: 5/5 — Enterprise scenarios, orchestration pattern selection guidance, implementation patterns
- **Snippet**: Real-world use cases across IT, finance, healthcare, manufacturing with orchestration guidance

### Source 8 — Workflows as Agents (Composition)
- **URL**: https://learn.microsoft.com/agent-framework/workflows/as-agents
- **Type**: Official Docs
- **Relevance**: 5/5 — Composing workflows to look like agents, nested orchestrations, tool exposure
- **Snippet**: Wrap workflows to expose them as standard agent interface for composition and tool calling

### Source 9 — Durable Task Integration with Agent Framework
- **URL**: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
- **Type**: Official Docs
- **Relevance**: 4/5 — Distributed orchestration, fault tolerance, automatic checkpointing at workflow level
- **Snippet**: Durable Task extends Agent Framework workflows with distributed execution and checkpointing

### Source 10 — GitHub Repository: Workflow Samples
- **URL**: https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows
- **Type**: GitHub Code
- **Relevance**: 4/5 — Complete implementations of all orchestration patterns with type-safe routing
- **Snippet**: Working samples for sequential, concurrent, handoff, group chat, and Magentic patterns

---

## Supporting Resources (Cross-Area)

### Source 1 — GitHub Repository README & Main Docs
- **URL**: https://github.com/microsoft/agent-framework
- **Type**: GitHub Official
- **Relevance**: 5/5 — Overview, key features, quickstart, learning resources, design decisions
- **Snippet**: Complete framework overview with section on when to use agents vs workflows

### Source 2 — Microsoft Agent Framework Overview
- **URL**: https://learn.microsoft.com/agent-framework/overview/
- **Type**: Official Docs
- **Relevance**: 5/5 — Framework positioning, key features, provider support matrix, architecture overview
- **Snippet**: Successor to Semantic Kernel and AutoGen combining their strengths with workflows

### Source 3 — Agent Framework Tutorials & Quick Start
- **URL**: https://learn.microsoft.com/agent-framework/tutorials/
- **Type**: Official Docs
- **Relevance**: 4/5 — Guided tutorials for getting started with agents and workflows
- **Snippet**: Step-by-step tutorials covering agent creation, tool addition, workflow orchestration

### Source 4 — AutoGen to Agent Framework Migration Guide
- **URL**: https://learn.microsoft.com/agent-framework/migration-guide/from-autogen/
- **Type**: Official Docs
- **Relevance**: 4/5 — Feature mapping, checkpointing advantages, multi-agent transition patterns
- **Snippet**: Detailed migration from AutoGen showing checkpoint persistence and workflow benefits

### Source 5 — Semantic Kernel to Agent Framework Migration
- **URL**: https://learn.microsoft.com/agent-framework/migration-guide/from-semantic-kernel/
- **Type**: Official Docs
- **Relevance**: 4/5 — API changes, plugin to skill migration, orchestration enhancements
- **Snippet**: Transition guide for Semantic Kernel users highlighting workflow orchestration additions

### Source 6 — DevUI & Interactive Development
- **URL**: https://www.youtube.com/watch?v=mOAaGY4WPvc
- **Type**: YouTube Video
- **Relevance**: 3/5 — Visual tool for agent development, testing, and debugging workflows
- **Snippet**: DevUI provides interactive interface for agent development and workflow visualization

### Source 7 — Official Blog & Announcements
- **URL**: https://devblogs.microsoft.com/agent-framework/
- **Type**: Official Blog
- **Relevance**: 4/5 — Feature announcements, Build 2026 updates, case studies, best practices
- **Snippet**: Latest features and real implementation patterns from Microsoft teams

---

## Summary

**Total Sources Discovered**: 40+ sources
**Coverage**: 
- Official Documentation: 32 sources
- GitHub Code Samples: 6 repositories
- Azure Architecture: 1 reference architecture
- Supporting Resources: 7 supplemental sources

**Key Gaps**: 
- Third-party benchmarks or external evaluations (limited availability)
- Non-Microsoft agentic framework comparisons (intentionally scoped to Agent Framework)

## Iteration 1: Gap-focused source refresh (2026-06-19)

### Gap 1: Unsupported reliability metric claim around Durable Task recovery

1. **Durable Task for AI agents**
	- URL: https://learn.microsoft.com/azure/durable-task/sdks/durable-task-for-ai-agents
	- Why relevant: Primary Durable Task framing for AI workloads; establishes what durability guarantees are documented.
	- Exact claim support notes: States durable execution provides automatic checkpointing and resume/recovery behavior. Does **not** publish a numeric reliability percentage or SLA for "recovery success rate."

2. **Durable Task extension for Microsoft Agent Framework**
	- URL: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
	- Why relevant: Canonical integration doc for Agent Framework + Durable Task.
	- Exact claim support notes: Supports claims for persistent sessions, checkpointing, and recovery after failures; includes statements that completed calls are not re-executed during recovery. No numeric reliability metric is documented.

3. **Agentic application patterns (agent loops)**
	- URL: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-patterns#agent-loops
	- Why relevant: Explains durable entity wrapping model for existing agent loops.
	- Exact claim support notes: Supports "durability as hosting concern" and automatic persistence/recovery mechanics. No percentage reliability claim.

4. **What is Durable Task?**
	- URL: https://learn.microsoft.com/azure/durable-task/common/what-is-durable-task
	- Why relevant: Product-level statement of guarantees and scope.
	- Exact claim support notes: Supports "reliably resumes from last completed step after crash/restart/redeployment." Does not define a formal SLA percentage in this doc.

**Explicit absence note:** No official Microsoft Learn source found in this refresh that supports a numeric reliability claim (for example, any "X% recovery" statement) for Durable Task recovery in Agent Framework scenarios. Remove numeric reliability/SLA figures unless separately backed by an official Azure SLA document with exact scope.

### Gap 2: Approval semantics boundaries (Tool Approval vs runtime permission handlers vs workflow HITL)

1. **Tool approval**
	- URL: https://learn.microsoft.com/agent-framework/agents/tools/tool-approval
	- Why relevant: Canonical Tool Approval behavior for Agent Framework tools.
	- Exact claim support notes: Supports that approval is a per-tool execution gate where execution pauses until user decision; defines approval-mode usage for tools.

2. **Human-in-the-loop (HITL) for workflows**
	- URL: https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations
	- Why relevant: Defines workflow-level request/response pause/resume model and relation to tool approval events.
	- Exact claim support notes: Supports that orchestrations surface requests as `RequestInfoEvent`; tool approval in orchestrations uses the workflow request/response mechanism and can be checkpointed/resumed.

3. **Sequential orchestration with human-in-the-loop**
	- URL: https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential#sequential-orchestration-with-human-in-the-loop
	- Why relevant: Explicitly distinguishes two HITL paths inside workflow execution.
	- Exact claim support notes: Supports boundary that sequential workflows can use (a) tool approval for sensitive calls and (b) request-info pauses for human feedback between agents.

4. **GitHub Copilot provider permissions**
	- URL: https://learn.microsoft.com/agent-framework/agents/providers/github-copilot
	- Why relevant: Documents provider/runtime permission handler model for shell/file/URL capabilities.
	- Exact claim support notes: Supports that Copilot runtime permissions are capability-surface controls, distinct from per-tool approval semantics.

5. **Tools overview (provider support matrix note)**
	- URL: https://learn.microsoft.com/agent-framework/agents/tools/
	- Why relevant: Cross-cutting tool semantics and provider caveats.
	- Exact claim support notes: Supports separation of framework Tool Approval from provider/runtime permission handling behaviors and surfaces.

### Gap 3: Magentic caveats and production guardrails

1. **Magentic orchestration (Agent Framework)**
	- URL: https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic
	- Why relevant: Primary Magentic implementation guidance in Agent Framework.
	- Exact claim support notes: Supports guardrails such as plan-signoff option, round/stall/reset limits, and recommendation to consider simpler Group Chat when complex planning is unnecessary; includes caveat text around applicability outside original Magentic-One task envelope.

2. **Magentic build configuration details**
	- URL: https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic#build-the-magentic-workflow
	- Why relevant: Concrete control knobs for operational safety.
	- Exact claim support notes: Supports explicit controls `WithMaxRounds`, `WithMaxStalls`, `WithMaxResets`, and plan review/signoff behavior.

3. **AI agent orchestration patterns (when to avoid Magentic)**
	- URL: https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns#magentic-orchestration
	- Why relevant: Architecture-center guidance on selection and anti-patterns.
	- Exact claim support notes: Supports specific "when to avoid" criteria (deterministic paths, low complexity, time-sensitive work, loop/stall risk).

4. **Python orchestration samples index (repo)**
	- URL: https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/orchestrations/README.md
	- Why relevant: Primary sample inventory proving production-minded patterns are demonstrated as separate scenarios.
	- Exact claim support notes: Supports availability of Magentic baseline, human plan review, and checkpoint-resume samples as distinct guardrail patterns.

### Gap 4: Canonical terminology for agent pipeline/layer model

1. **Agent pipeline architecture**
	- URL: https://learn.microsoft.com/agent-framework/agents/agent-pipeline
	- Why relevant: Canonical "pipeline" terminology and layer names.
	- Exact claim support notes: Supports official terms including agent middleware layer, context providers/context layer, function invocation loop, chat client layer, and raw provider client.

2. **Agent types and default runtime execution model**
	- URL: https://learn.microsoft.com/agent-framework/agents/
	- Why relevant: Canonical runtime-loop terminology across agent types.
	- Exact claim support notes: Supports "Default Agent Runtime Execution Model" language and deterministic runtime-loop framing.

3. **Framework overview (Agents vs Workflows + building blocks)**
	- URL: https://learn.microsoft.com/agent-framework/overview/
	- Why relevant: High-level canonical vocabulary for capability taxonomy.
	- Exact claim support notes: Supports two top-level categories (Agents, Workflows) plus foundational terms (model clients, session, context providers, middleware, MCP clients).

4. **Workflows core concepts**
	- URL: https://learn.microsoft.com/agent-framework/workflows/#core-concepts
	- Why relevant: Canonical workflow-side terminology.
	- Exact claim support notes: Supports official workflow terms: executors, edges, events, workflow builder/execution.

**Terminology guardrail:** Avoid presenting custom layer taxonomies as canonical. Prefer Microsoft terms above and map any custom model to them explicitly.

### Gap 5: 12-minute talk-fit guidance grounded in official docs/examples structure

1. **Get started: Your first agent**
	- URL: https://learn.microsoft.com/agent-framework/get-started/your-first-agent
	- Why relevant: Fastest official entry point with direct sample linkage.
	- Exact claim support notes: Supports a concise opening demo arc with a minimal runnable example and direct link to repo sample `01_hello_agent`.

2. **Journey: Choosing the right pattern**
	- URL: https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern
	- Why relevant: Compact decision table suited to short-talk architecture guidance.
	- Exact claim support notes: Supports a crisp comparison of model-directed delegation vs developer-directed workflows, including where to place human gates.

3. **Workflows core concepts and starter samples**
	- URL: https://learn.microsoft.com/agent-framework/workflows/#core-concepts
	- Why relevant: Official four-concept structure maps cleanly to a short middle section.
	- Exact claim support notes: Supports a tight "concepts + sample links" narrative for executors, edges, events, and workflow execution.

4. **.NET workflow samples index (repo)**
	- URL: https://github.com/microsoft/agent-framework/blob/main/dotnet/samples/03-workflows/README.md
	- Why relevant: Curated, scenario-tagged sample structure for selecting one or two high-impact demos.
	- Exact claim support notes: Supports specific demo candidates like Group Chat with Tool Approval and Workflow as an Agent for short presentation segments.

5. **Python orchestration samples index (repo)**
	- URL: https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/orchestrations/README.md
	- Why relevant: Mirrors .NET sample taxonomy and includes Magentic guardrail variants.
	- Exact claim support notes: Supports selecting one orchestration baseline plus one guardrail variant (checkpoint or human plan review) to stay within time.

### Claims requiring removal or rewrite

- Remove any numeric reliability/SLA claim for Durable Task recovery that is not backed by an official SLA source scoped to the same service/runtime context.
- Rewrite approval semantics so three boundaries are explicit:
  - Tool Approval = per-tool execution gate.
  - Runtime permission handlers = provider/capability access control (for example, Copilot shell/file/url permissions).
  - Workflow HITL = request/response pause-resume gates at workflow orchestration level.
- Avoid presenting a custom "canonical" pipeline/layer taxonomy unless it is explicitly mapped to official Agent Framework terminology.

