---
title: SDK Integrations (Copilot, Foundry, Durable Task, M365)
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers"
---

## SDK integrations for a 12-minute talk

Build 2026 integration coverage in this section is intentionally scoped to four announcement entries: GitHub Copilot provider integration, Microsoft Foundry provider integration, Durable Task extension integration, and Microsoft 365 Copilot integration. [GitHub Copilot Agents](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [Microsoft Foundry provider](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [Durable Task extension](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [Bring agents to Microsoft 365 Copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

Use this section to explain one path per audience persona, then point people to runnable samples in [sample-code-patterns](../sample-code-patterns/section.md).

## Capability comparison (source-grounded)

| Integration | What it is | How it works | What it is used for |
|---|---|---|---|
| GitHub Copilot SDK | Agent Framework provider that uses Copilot CLI-backed agent runtime. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) | `CopilotClient` or `GitHubCopilotAgent` runs turns; shell/file/URL actions are permission-gated; MCP servers can be attached in session config. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) | Developer-centric coding and automation assistants that need local execution and MCP connectivity. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) |
| Microsoft Foundry | Agent Framework provider for Foundry-backed responses agents and service-managed Foundry agents. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) | Use `AIProjectClient.AsAIAgent(...)` for code-first responses, or bind to a service-managed Foundry agent definition for versioned management. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) | Enterprise app agents that need managed tooling, versioned definitions, and Foundry-hosted capabilities. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) |
| Durable Task extension | Durability layer for Agent Framework agents/workflows with checkpointing and recovery semantics. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) | Register agents/workflows with durable hosting (Azure Functions or custom compute); sessions become durable entities and resume after failures from persisted state. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) | Operations platform workloads that require long-running orchestration, reliability, and resumability. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) |
| Microsoft 365 Copilot integration | Channel/surface integration path to expose agents inside M365 Copilot. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) | Add M365 Agents Toolkit/SDK integration, configure Bot Service and manifest package, optionally OAuth scopes for user-on-behalf access. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) | Productivity-facing agents deployed to enterprise users through the M365 Copilot UX. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) |

## Tooling/approval matrix (only explicit source claims)

| Capability | Copilot SDK | Foundry | Durable Task extension | M365 Copilot integration |
|---|---|---|---|---|
| Function tools | Supported. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) | Supported. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) | Not a tool provider; durability host layer. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) | Surface/channel integration, not tool hosting. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) |
| Tool approval / execution gating | Permission handler model for shell/file/URL operations. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) | Tool approval support is documented in provider matrix. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) | Durable workflows support long-running/HITL-friendly execution patterns but are not the approval mechanism themselves. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) | OAuth consent/user permissions are via M365/Bot integration path. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) |
| MCP integration | Local (stdio) and remote (HTTP) MCP supported via session configuration. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) | Hosted MCP is documented as supported. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) | No standalone MCP claim in durable extension docs. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) | No standalone MCP claim in M365 integration doc. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) |

## Persona path 1: Developer team (GitHub Copilot)

### What it is

GitHub Copilot provider gives Agent Framework agents access to Copilot CLI-driven runtime capabilities, including shell/file/URL operations and MCP wiring under a permissions model. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### How it works

You start a Copilot client, project an `AIAgent`, and optionally set a permission callback and MCP server configuration in session config. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### What it is used for

Use this path when the audience needs local developer workflow automation and coding copilots with explicit guardrails around execution permissions. [Source](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### Conceptual snippet (non-runnable)

```csharp
// Conceptual snippet: illustrates provider wiring, not full production setup.
await using var copilot = new CopilotClient();
await copilot.StartAsync();
var agent = copilot.AsAIAgent(new SessionConfig { OnPermissionRequest = PromptPermission });
var result = await agent.RunAsync("List modified files and summarize risk");
```

Runnable references: [sample-code-patterns integration example](../sample-code-patterns/section.md), [Copilot provider docs](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot).

## Persona path 2: Enterprise app team (Microsoft Foundry)

### What it is

Foundry integration offers two patterns: code-first responses agents and service-managed Foundry agents with centrally managed definitions. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)

### How it works

For code-first usage, create an `AIProjectClient` and call `AsAIAgent(...)`; for managed usage, bind to a Foundry agent record/version and run through the same `AIAgent` style interface. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)

### What it is used for

Use this path when you need enterprise-managed model/tool configurations, versioning boundaries, and Foundry-native hosted capabilities. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)

### Conceptual snippet (non-runnable)

```csharp
// Conceptual snippet: illustrates responses-agent pattern.
var project = new AIProjectClient(new Uri("<project-endpoint>"), new DefaultAzureCredential());
var agent = project.AsAIAgent(model: "gpt-4o-mini", name: "AppAgent", instructions: "Enterprise assistant");
var reply = await agent.RunAsync("Summarize incident backlog");
```

Runnable references: [sample-code-patterns integration example](../sample-code-patterns/section.md), [Foundry provider docs](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry).

## Persona path 3: Operations platform team (Durable Task extension)

### What it is

Durable Task extension adds durable execution semantics to Agent Framework agents/workflows, including checkpointing, session durability, and recovery behavior. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

### How it works

You register agents and/or workflows with durable hosting (Azure Functions or custom compute); execution state is persisted so resumed runs continue from durable state instead of replaying completed calls. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

### What it is used for

Use this path for long-running, multi-step, or approval-dependent operations where resilience across restarts and scale events is required. [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

### Conceptual snippet (non-runnable)

```csharp
// Conceptual snippet: illustrates durable registration shape.
using IHost app = FunctionsApplication.CreateBuilder(args)
    .ConfigureFunctionsWebApplication()
    .ConfigureDurableAgents(options => options.AddAIAgent(agent))
    .Build();
```

Runnable references: [sample-code-patterns integration example](../sample-code-patterns/section.md), [Durable Task extension docs](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework).

## Persona path 4: M365 productivity team (Microsoft 365 Copilot)

### What it is

M365 integration is the path for bringing existing agents into Microsoft 365 Copilot surfaces using Agents Toolkit/SDK plus Bot Service and manifest packaging. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

### How it works

Connect the agent endpoint through Azure Bot Service, define manifest metadata/action endpoints, and optionally configure OAuth scopes for user-on-behalf scenarios. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

### What it is used for

Use this path to distribute productivity agents in the M365 Copilot UX with enterprise app packaging and consent controls. [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

### Conceptual snippet (non-runnable)

```json
{
  "name": "MyAgent",
  "actions": [{ "id": "action1", "actionUrl": "https://myagent.example.com/api/actions/action1" }],
  "auth": { "type": "oauth2", "scopes": ["User.Read"] }
}
```

Runnable references: [sample-code-patterns integration example](../sample-code-patterns/section.md), [M365 integration docs](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot).

## Talk-close: composition pattern

A composable path supported by the documented integration set is: define a Foundry-based agent, apply durable hosting for long-running reliability, and publish the resulting experience through Microsoft 365 Copilot channels where needed. [Source](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [Source](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [Source](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

For runnable snippets and step-by-step demos, use [sample-code-patterns](../sample-code-patterns/section.md).
