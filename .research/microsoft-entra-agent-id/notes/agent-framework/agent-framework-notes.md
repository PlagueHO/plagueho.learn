---
area: agent-framework
sources:
  - https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp
  - https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry
  - https://learn.microsoft.com/en-us/agent-framework/agents/providers/index
  - https://learn.microsoft.com/en-us/agent-framework/integrations/a2a
extracted_at: 2026-05-29
---

# Microsoft Agent Framework: Entra Agent ID Integration

## What is Microsoft Agent Framework?

Microsoft Agent Framework is the **next-generation successor to both Semantic Kernel and AutoGen**, created by the same teams. It is a unified framework for building AI agents and multi-agent workflows in .NET (C#) and Python.

**Relationship to predecessors:**

- **AutoGen** pioneered simple agent abstractions and multi-agent patterns.
- **Semantic Kernel** provided enterprise-grade features: session-based state management, type safety, filters, telemetry, and extensive model/embedding support.
- **Agent Framework** combines both: AutoGen's simple abstractions + Semantic Kernel's enterprise features, and adds graph-based workflows for explicit multi-agent orchestration, plus a robust state management system for long-running and human-in-the-loop scenarios.

Migration guides exist for both Semantic Kernel and AutoGen users.

**Supported languages:** .NET (C#), Python

**Two primary capability categories:**

| Category | Description |
|----------|-------------|
| **Agents** | Individual agents that use LLMs to process inputs, call tools and MCP servers, and generate responses. Supports Microsoft Foundry, Anthropic, Azure OpenAI, OpenAI, Ollama, and more. |
| **Workflows** | Graph-based workflows connecting agents and functions for multi-step tasks with type-safe routing, checkpointing, and human-in-the-loop support. |

**Foundational building blocks:**

- Model clients (chat completions and responses APIs)
- Agent session for state management
- Context providers for agent memory
- Middleware for intercepting agent actions
- MCP clients for tool integration

## Agent Framework Architecture

**Core base classes:**

- `.NET`: `AIAgent` (all agents derive from this)
- **Python**: `BaseAgent` (all agents derive from this)

**Key components:**

- `AIProjectClient` — connects to Microsoft Foundry project endpoints
- `AgentSession` — manages multi-turn conversation state
- `AgentAdministrationClient` — manages versioned Foundry agent definitions server-side

**NuGet packages (C#):**

```
Microsoft.Agents.AI.Foundry        (--prerelease)
Microsoft.Agents.AI.Hosting.A2A    (--prerelease)
Microsoft.Agents.AI.Hosting.A2A.AspNetCore  (--prerelease)
Azure.AI.Projects                  (--prerelease)
Azure.Identity
```

**Integrations:**

- A2A (Agent-to-Agent protocol) — via `Microsoft.Agents.AI.Hosting.A2A.AspNetCore`
- AG-UI protocol
- Azure Functions
- Microsoft 365
- OpenAI-compatible endpoints

## Agent Types: Model-Only vs Foundry-Backed

### Model-Only Agents (Responses Agent / `ChatClientAgent`)

- **Description:** Code-first pattern; the application programmatically provides the model, instructions, and tools at runtime via `AIProjectClient.AsAIAgent(...)`.
- **Server-side resource:** No server-side agent resource is created — everything is ephemeral and defined in code.
- **When to use:** You own the agent definition and want a simple, flexible setup. This is the pattern used in most samples.
- **Identity:** The calling application's identity (e.g., `DefaultAzureCredential` or `AzureCliCredential`) is used to authenticate to the Foundry endpoint. No separate agent identity is created in Entra ID.
- **Class:** `ChatClientAgent`
- **Tools:** Supports the full standard Agent Framework tool surface (function tools, tool approval, code interpreter, file search, hosted MCP tools, local MCP tools, Foundry Toolboxes).
- **Instructions/Tools mutability:** Can be set and modified at runtime.

### Foundry-Backed Agents (`FoundryAgent`)

- **Description:** Server-managed agent definitions created and versioned through the Foundry portal or programmatically via `AIProjectClient.AgentAdministrationClient`. Retrieved by name or version and wrapped with `AsAIAgent(...)`.
- **Server-side resource:** Yes — a persistent agent definition exists in the Foundry Agent Service.
- **When to use:** When you need strict, versioned agent definitions managed in the Foundry portal or through service APIs.
- **Identity:** The agent definition lives in Azure AI Foundry. The agent can be provisioned with an Entra Agent ID (a service principal registered in Entra ID that represents the agent itself).
- **Class:** `FoundryAgent`
- **Tools/Instructions mutability:** **Strict** — tools and instructions are fixed to those the agent was created with. Attempting to modify tooling or instructions at runtime is **not supported**.
- **Retrieval:** Use `AIProjectClient.AgentAdministrationClient.GetAgentAsync("AgentName")` to retrieve a `ProjectsAgentRecord`, then pass to `AIProjectClient.AsAIAgent(jokerRecord)`.

## Foundry Provider: Responses Agent vs Foundry Agent

Both are created via `AIProjectClient.AsAIAgent(...)` but with different arguments:

| | Class | How Created | Server Resource | Versioned | Tools Mutable |
|---|---|---|---|---|---|
| **Responses Agent** | `ChatClientAgent` | `AsAIAgent(model, name, instructions)` | ❌ No | ❌ No | ✅ Yes |
| **Foundry Agent** | `FoundryAgent` | `AsAIAgent(ProjectsAgentRecord)` or `AsAIAgent(ProjectsAgentVersion)` or `AsAIAgent(AgentReference)` | ✅ Yes | ✅ Yes | ❌ No |

Both `ChatClientAgent` and `FoundryAgent` are standard `AIAgent` instances and support all standard operations: sessions, tools, middleware, and streaming.

**Foundry Agent tools support:**

| Tool Type | Supported |
|-----------|-----------|
| Function Tools | ✅ |
| Tool Approval | ✅ |
| Code Interpreter | ✅ |
| File Search | ✅ |
| Hosted MCP Tools | ✅ |
| Local MCP Tools | ✅ |
| Foundry Toolboxes | ✅ (docs coming soon) |

## Authentication in Agent Framework

### `DefaultAzureCredential` Pattern

The primary authentication mechanism is `DefaultAzureCredential` from the `Azure.Identity` package. It is used when constructing `AIProjectClient`:

```csharp
var aiProjectClient = new AIProjectClient(
    new Uri("<your-foundry-project-endpoint>"),
    new DefaultAzureCredential());
```

`DefaultAzureCredential` attempts the following credential chain at runtime:
- Environment variables
- Workload Identity (in Kubernetes/Azure)
- Managed Identity
- Visual Studio / VS Code credentials
- Azure CLI credentials
- Azure PowerShell credentials
- Interactive browser (last resort)

**Important production warning from docs:**

> `DefaultAzureCredential` is convenient for development but requires careful consideration in production. In production, consider using a specific credential (e.g., `ManagedIdentityCredential`) to avoid latency issues, unintended credential probing, and potential security risks from fallback mechanisms.

### `AzureCliCredential`

Used in quick-start samples for local development:

```csharp
AIAgent agent = new AIProjectClient(
        new Uri("https://your-foundry-service.services.ai.azure.com/api/projects/your-foundry-project"),
        new AzureCliCredential())
    .AsAIAgent(
        model: "gpt-5.4-mini",
        instructions: "You are a friendly assistant.");
```

### `ManagedIdentityCredential`

Recommended for production deployments to Azure (App Service, Container Apps, AKS, etc.):

```csharp
var aiProjectClient = new AIProjectClient(
    new Uri("<endpoint>"),
    new ManagedIdentityCredential());
```

### Workload Identity (for Kubernetes / GitHub Actions)

Supported via `DefaultAzureCredential` when the `AZURE_FEDERATED_TOKEN_FILE`, `AZURE_CLIENT_ID`, `AZURE_TENANT_ID` environment variables are set. In AKS, this is configured via the Azure Workload Identity mutating webhook.

### Entra Agent ID Integration

When using **Foundry-backed agents** (`FoundryAgent`), the agent definition exists as a resource in Azure AI Foundry, and Foundry can provision an **Entra Agent ID** (a service principal in Entra ID) that represents the agent itself. This allows the agent to:

- Authenticate as its own identity (not the application's identity)
- Acquire tokens scoped to the agent
- Be granted RBAC permissions independently of the hosting app

For **model-only agents** (Responses Agent / `ChatClientAgent`), there is no separate Entra identity for the agent — the calling application's credential is used throughout.

## MCP Client in Agent Framework

Agent Framework provides built-in MCP client support, allowing agents to consume tools from MCP servers.

**MCP tool types supported by Foundry provider:**

- **Hosted MCP Tools** — MCP servers hosted in Azure/cloud, accessed remotely
- **Local MCP Tools** — MCP servers running locally (e.g., `stdio` transport)

MCP tool integration uses the same `Azure.Identity` credential chain for authentication to MCP servers that require it.

The framework's MCP client is exposed as part of the agent's tool surface — tools from MCP servers appear as callable functions in the agent's tool loop.

**Note:** Specific MCP client authentication configuration details (e.g., passing credentials to remote MCP servers) are not documented in the pages fetched; additional sources covering MCP tool setup are needed.

## A2A Protocol Integration

### What is A2A?

A2A (Agent-to-Agent) is a standardized protocol for inter-agent communication supporting:

- **Agent discovery** through agent cards
- **Message-based communication** between agents
- **Long-running agentic processes** via tasks
- **Cross-platform interoperability** between different agent frameworks

A2A specification: <https://a2a-protocol.org/latest/>

### Hosting Agents via A2A (ASP.NET Core)

**NuGet packages required:**

```bash
dotnet add package Microsoft.Agents.AI.Hosting.A2A.AspNetCore --prerelease
dotnet add package Azure.AI.Projects --prerelease
dotnet add package Azure.Identity
dotnet add package Microsoft.Agents.AI.Foundry --prerelease
```

**Configuration (user-secrets recommended for dev):**

```bash
dotnet user-secrets set "AZURE_OPENAI_ENDPOINT" "https://<your-openai-resource>.openai.azure.com/"
dotnet user-secrets set "AZURE_OPENAI_DEPLOYMENT_NAME" "gpt-4o-mini"
```

**Full `Program.cs` example:**

```csharp
using A2A.AspNetCore;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Hosting;
using Microsoft.Extensions.AI;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();

string endpoint = builder.Configuration["AZURE_OPENAI_ENDPOINT"]
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
string deploymentName = builder.Configuration["AZURE_OPENAI_DEPLOYMENT_NAME"]
    ?? throw new InvalidOperationException("AZURE_OPENAI_DEPLOYMENT_NAME is not set.");

// Register the chat client
IChatClient chatClient = new AIProjectClient(
        new Uri(endpoint),
        new DefaultAzureCredential())
        .GetProjectOpenAIClient()
        .GetProjectResponsesClient()
        .AsIChatClient(deploymentName);

builder.Services.AddSingleton(chatClient);

// Register an agent
var pirateAgent = builder.AddAIAgent("pirate", instructions: "You are a pirate. Speak like a pirate.");

var app = builder.Build();

app.MapOpenApi();
app.UseSwagger();
app.UseSwaggerUI();

// Expose the agent via A2A protocol
app.MapA2A(pirateAgent, path: "/a2a/pirate", agentCard: new()
{
    Name = "Pirate Agent",
    Description = "An agent that speaks like a pirate.",
    Version = "1.0"
});

app.Run();
```

### `AgentCard` Configuration

```csharp
app.MapA2A(agent, "/a2a/my-agent", agentCard: new()
{
    Name = "My Agent",
    Description = "A helpful agent that assists with tasks.",
    Version = "1.0",
});
```

**AgentCard properties:**

| Property | Description |
|----------|-------------|
| `Name` | Display name of the agent |
| `Description` | Brief description of the agent |
| `Version` | Version string |
| `Url` | Endpoint URL (auto-assigned if not specified) |
| `Capabilities` | Optional metadata about streaming, push notifications, etc. |

**Retrieve agent card:**

```http
GET {{baseAddress}}/a2a/pirate/v1/card
```

**Send an A2A message:**

```http
POST {{baseAddress}}/a2a/pirate/v1/message:stream
Content-Type: application/json
{
  "message": {
    "kind": "message",
    "role": "user",
    "parts": [
      {
        "kind": "text",
        "text": "Hey pirate! Tell me where have you been",
        "metadata": {}
      }
    ],
    "messageId": null,
    "contextId": "foo"
  }
}
```

**Response format:**

```json
{
    "kind": "message",
    "role": "agent",
    "parts": [
        {
            "kind": "text",
            "text": "Arrr, ye scallywag!"
        }
    ],
    "messageId": "chatcmpl-CXtJbisgIJCg36Z44U16etngjAKRk",
    "contextId": "foo"
}
```

- `contextId`: conversation identifier — reuse to maintain conversation history
- `messageId`: unique message identifier — can be `null` to auto-generate

### Exposing Multiple Agents

```csharp
var mathAgent = builder.AddAIAgent("math", instructions: "You are a math expert.");
var scienceAgent = builder.AddAIAgent("science", instructions: "You are a science expert.");

app.MapA2A(mathAgent, "/a2a/math");
app.MapA2A(scienceAgent, "/a2a/science");
```

### A2A as a Provider (consuming remote A2A agents)

Agent Framework also exposes an **A2A provider** that allows an Agent Framework agent to act as a client connecting to remote agents exposed via A2A:

- Provider: `A2A` (see `https://learn.microsoft.com/en-us/agent-framework/agents/providers/agent-to-agent`)
- Allows building multi-agent systems where one agent delegates to another via A2A protocol

## Provider Comparison

All providers use `AIAgent` (or `BaseAgent` in Python) as the base class. Any `IChatClient` implementation can back a simple agent.

**Available providers (.NET):**

| Provider | Description |
|----------|-------------|
| **Azure OpenAI** | Full-featured: chat completion, responses API, tool support |
| **OpenAI** | Direct OpenAI API access, chat completion and responses API |
| **Microsoft Foundry** | Persistent server-side agents with managed chat history |
| **Anthropic** | Claude models with function tools and streaming support |
| **Ollama** | Run open-source models locally |
| **GitHub Copilot** | GitHub Copilot SDK integration with shell and file access |
| **Copilot Studio** | Integration with Microsoft Copilot Studio agents |
| **A2A** | Connect to remote agents via A2A protocol |
| **Custom** | Build your own by implementing the `AIAgent` base class |

**Capability matrix** (column headers not captured by web scraper — pattern is 6 capability columns):

| Provider | Col 1 | Col 2 | Col 3 | Col 4 | Col 5 | Col 6 |
|----------|-------|-------|-------|-------|-------|-------|
| Azure OpenAI | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| OpenAI | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Microsoft Foundry | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Anthropic | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Ollama | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Foundry Local | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| GitHub Copilot | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| Copilot Studio | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Custom | Varies | Varies | Varies | Varies | Varies | Varies |

*Based on the data pattern, inferred columns are likely: Basic Inference, Streaming, Function/Tool Calling, Responses API, MCP Tools, File Search/Code Interpreter — but column headers were not extractable from the page.*

**Identity/auth model by provider:**

| Provider | Auth Mechanism | Agent Identity |
|----------|---------------|----------------|
| **Microsoft Foundry** (Responses Agent) | `DefaultAzureCredential` / `AzureCliCredential` to Foundry endpoint | Application identity only |
| **Microsoft Foundry** (Foundry Agent) | `DefaultAzureCredential` to Foundry endpoint; agent may have its own Entra Agent ID | Application identity + optional agent Entra identity |
| **Azure OpenAI** | `DefaultAzureCredential` or API key | Application identity |
| **OpenAI** | API key | N/A |
| **Anthropic** | API key | N/A |
| **Ollama** | None (local) | N/A |
| **Foundry Local** | None (local) | N/A |
| **GitHub Copilot** | OAuth / GitHub token | N/A |
| **Copilot Studio** | Azure AD / Entra | N/A |

## Code Examples (C#)

### Minimal Agent (Responses / ChatClientAgent)

```csharp
using System;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AIProjectClient(
        new Uri("https://your-foundry-service.services.ai.azure.com/api/projects/your-foundry-project"),
        new AzureCliCredential())
    .AsAIAgent(
        model: "gpt-5.4-mini",
        instructions: "You are a friendly assistant. Keep your answers brief.");

Console.WriteLine(await agent.RunAsync("What is the largest city in France?"));
```

### Responses Agent (Production Pattern)

```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;

AIAgent agent = new AIProjectClient(
    new Uri("<your-foundry-project-endpoint>"),
    new DefaultAzureCredential())
        .AsAIAgent(
            model: "gpt-4o-mini",
            name: "Joker",
            instructions: "You are good at telling jokes.");

Console.WriteLine(await agent.RunAsync("Tell me a joke about a pirate."));
```

### Foundry Agent (Versioned / Server-Managed)

```csharp
using Azure.AI.Projects;
using Azure.AI.Projects.Agents;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Foundry;

var aiProjectClient = new AIProjectClient(
    new Uri("<your-foundry-project-endpoint>"),
    new DefaultAzureCredential());

// Retrieve an existing agent by name (uses the latest version automatically)
ProjectsAgentRecord jokerRecord = await aiProjectClient.AgentAdministrationClient.GetAgentAsync("Joker");
FoundryAgent agent = aiProjectClient.AsAIAgent(jokerRecord);

Console.WriteLine(await agent.RunAsync("Tell me a joke about a pirate."));
```

### Multi-Turn Session

```csharp
AgentSession session = await agent.CreateSessionAsync();
Console.WriteLine(await agent.RunAsync("Tell me a joke.", session));
Console.WriteLine(await agent.RunAsync("Now make it funnier.", session));
```

### A2A Hosting (Full Program.cs)

*(See A2A Protocol Integration section above for the complete example.)*

### Accessing the Responses Client Directly

```csharp
IChatClient chatClient = new AIProjectClient(
        new Uri(endpoint),
        new DefaultAzureCredential())
        .GetProjectOpenAIClient()
        .GetProjectResponsesClient()
        .AsIChatClient(deploymentName);
```

## Configuration

### Environment Variables / User Secrets

Recommended approach — use `dotnet user-secrets` in development:

```bash
dotnet user-secrets set "AZURE_OPENAI_ENDPOINT" "https://<your-openai-resource>.openai.azure.com/"
dotnet user-secrets set "AZURE_OPENAI_DEPLOYMENT_NAME" "gpt-4o-mini"
```

Environment variable equivalents (ENV Windows):

```powershell
$env:AZURE_OPENAI_ENDPOINT = "https://..."
$env:AZURE_OPENAI_DEPLOYMENT_NAME = "gpt-4o-mini"
```

### `AIProjectClient` Constructor

```csharp
new AIProjectClient(
    new Uri("<foundry-project-endpoint>"),
    <TokenCredential>   // DefaultAzureCredential, AzureCliCredential, ManagedIdentityCredential, etc.
)
```

**Endpoint format:**

```
https://<foundry-service>.services.ai.azure.com/api/projects/<project-name>
```

### NuGet Package Installation

```bash
# Core Foundry provider
dotnet add package Microsoft.Agents.AI.Foundry --prerelease

# Azure Identity (required for DefaultAzureCredential)
dotnet add package Azure.Identity

# Azure AI Projects SDK
dotnet add package Azure.AI.Projects --prerelease

# A2A hosting (ASP.NET Core)
dotnet add package Microsoft.Agents.AI.Hosting.A2A.AspNetCore --prerelease
dotnet add package Microsoft.Agents.AI.Hosting.A2A --prerelease
```

## When to Use Agents vs Workflows

| Use Agents When | Use Workflows When |
|----------------|-------------------|
| Task is open-ended or conversational | Process has well-defined steps |
| You need autonomous tool use and planning | You need explicit control over execution order |
| A single LLM call (possibly with tools) suffices | Multiple agents or functions must coordinate |

**Principle:** If you can write a function to handle the task, do that instead of using an AI agent.

## Gaps / Additional Sources Needed

- **Provider comparison table column headers** — the web scraper did not capture the column header row; verify at the [Providers Overview page](https://learn.microsoft.com/en-us/agent-framework/agents/providers/).
- **MCP client authentication detail** — how Agent Framework passes credentials to remote MCP servers requiring auth (e.g., `Authorization: Bearer` headers or Azure token injection). Source: MCP tools documentation (`/agent-framework/agents/tools/`).
- **Entra Agent ID provisioning flow** — the explicit steps for how a Foundry Agent gets an Entra Agent ID service principal provisioned. Source: Foundry Agent Service docs and Entra ID agent registration docs.
- **Foundry Toolbox docs** — marked as "coming soon" in the Microsoft Foundry provider page.
- **AG-UI protocol integration** — linked from A2A page as the next step but not fetched.

## Source Citations

1. **Microsoft Agent Framework Overview** — <https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp> — Last updated: 2026-04-07
2. **Microsoft Foundry Provider** — <https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry> — Last updated: 2026-05-27
3. **Providers Overview** — <https://learn.microsoft.com/en-us/agent-framework/agents/providers/index> — Last updated: 2026-04-07
4. **A2A Integration** — <https://learn.microsoft.com/en-us/agent-framework/integrations/a2a> — Last updated: 2026-05-21
