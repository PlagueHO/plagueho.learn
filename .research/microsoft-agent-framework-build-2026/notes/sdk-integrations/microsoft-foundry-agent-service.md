---
title: Microsoft Foundry Agent Service Integration
source_url: https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry
source_title: Microsoft Foundry | Microsoft Agent Framework
source_date: 2026-06-18
area: sdk-integrations
type: provider-integration
dimensions:
  - foundry-service-integration
  - azure-openai-integration
  - service-managed-agents
  - foundry-toolboxes
  - response-agents
extracted: 2026-06-18T00:00:00Z
quality: draft
---

## What

Microsoft Foundry integration enables two distinct agent patterns within the Microsoft Agent Framework: **Responses Agents** (code-first, direct inference) and **Foundry Agents** (service-managed, versioned). Both patterns support model deployment, tools, and streaming while leveraging Azure AI Foundry infrastructure.

## Key Facts

### Two Agent Types

1. **Responses Agent** (`ChatClientAgent`):
   - Code-first model and instructions provided at runtime
   - No server-side agent resource created
   - Use when you own the agent definition and want simple, flexible setup
   - Supported in .NET and Python

2. **Foundry Agent** (`FoundryAgent`):
   - Server-managed, versioned agent definition
   - Created/configured in Foundry portal or via APIs
   - Recommended for strict versioning and Foundry portal management
   - Agent definition is source of truth

### C# Setup

```csharp
dotnet add package Azure.Identity
dotnet add package Microsoft.Agents.AI.Foundry --prerelease
```

### Python Setup

```bash
pip install agent-framework-foundry
pip install azure-identity
```

### Tool Support

| Tool | Status | Notes |
|------|--------|-------|
| Function Tools | ✅ GA | Standard callables or `@ai_function` |
| Tool Approval | ✅ GA | Works with hosted MCP and function tools |
| Code Interpreter | ✅ GA | Sandboxed execution on Foundry |
| File Search | ✅ GA | Search uploaded files via vector stores |
| Hosted MCP | ✅ GA | Remote MCP servers via Foundry |
| Local MCP | ✅ GA | Runs in-process |
| Web Search | ✅ GA | Bing-backed, Azure OpenAI models only |
| Image Generation | ✅ GA | Hosted on Foundry |
| Foundry Toolboxes | ✅ GA | Managed tool configurations |
| Bing Grounding | ⚡ Experimental | Bring-your-own Bing Search resource |
| Bing Custom Search | ⚠️ Preview | Restricted to curated domain list |
| Azure AI Search | ⚡ Experimental | Search Azure AI Search index |
| SharePoint | ⚠️ Preview | Ground answers in SharePoint |
| Microsoft Fabric | ⚠️ Preview | Query Fabric data agent |
| Memory Search | ⚠️ Preview | Search Foundry-managed memory |
| Computer Use | ⚠️ Preview | Drive desktop/browser environment |
| Browser Automation | ⚠️ Preview | Drive browser via Playwright |
| Agent-to-Agent (A2A) | ⚠️ Preview | Call another A2A agent as tool |

## How — C# Responses Agent

```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;

// Direct inference pattern — recommended for most scenarios
AIAgent agent = new AIProjectClient(
    new Uri("<your-foundry-project-endpoint>"),
    new DefaultAzureCredential())
        .AsAIAgent(
            model: "gpt-4o-mini",
            name: "Joker",
            instructions: "You are good at telling jokes.");

Console.WriteLine(await agent.RunAsync("Tell me a joke about a pirate."));
```

**Warning**: `DefaultAzureCredential` is convenient for development but in production, use a specific credential (e.g., `ManagedIdentityCredential`) to avoid latency and security risks.

### Sessions & Streaming

```csharp
AgentSession session = await agent.CreateSessionAsync();
Console.WriteLine(await agent.RunAsync("Tell me a joke.", session));
Console.WriteLine(await agent.RunAsync("Now make it funnier.", session));

// Streaming
await foreach (AgentResponseUpdate update in agent.RunStreamingAsync("Tell a story"))
{
    Console.Write(update);
}
```

## How — C# Foundry Agent (Versioned)

```csharp
using Azure.AI.Projects;
using Azure.AI.Projects.Agents;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Foundry;

var aiProjectClient = new AIProjectClient(
    new Uri("<your-foundry-project-endpoint>"),
    new DefaultAzureCredential());

// Retrieve versioned agent from Foundry
ProjectsAgentRecord jokerRecord = await aiProjectClient
    .AgentAdministrationClient.GetAgentAsync("Joker");
FoundryAgent agent = aiProjectClient.AsAIAgent(jokerRecord);

Console.WriteLine(await agent.RunAsync("Tell me a joke about a pirate."));
```

**Important**: Foundry Agent tools and instructions are strict to the ones defined in Foundry. Attempting to modify tools or instructions at runtime is not supported.

## How — Python Responses Agent

```python
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

agent = Agent(
    client=FoundryChatClient(
        project_endpoint="https://your-project.services.ai.azure.com",
        model="gpt-4o-mini",
        credential=AzureCliCredential(),
    ),
    name="FoundryWeatherAgent",
    instructions="You are a helpful assistant.",
)

result = await agent.run("What's the weather like?")
```

### Python Tool Factories

```python
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient

agent = Agent(
    client=FoundryChatClient(credential=AzureCliCredential()),
    instructions="You can search the web and run code.",
    tools=[
        FoundryChatClient.get_web_search_tool(),
        FoundryChatClient.get_code_interpreter_tool(),
    ],
)
```

### Python Web Search Variants

```python
# Default (GA): minimal configuration
web_search = client.get_web_search_tool(
    user_location={"city": "Amsterdam", "country": "NL"},
    search_context_size="medium",
)

# Bring-your-own Bing Search (experimental)
bing = FoundryChatClient.get_bing_grounding_tool(
    connection_id="/subscriptions/.../connections/my-bing",
    market="en-US",
    freshness="Day",
    count=10,
)

# Bing Custom Search (preview)
bing_custom = FoundryChatClient.get_bing_custom_search_tool(
    connection_id="/subscriptions/.../connections/my-bing-custom",
    instance_name="docs-only",
    market="en-US",
)
```

### Python Service-Managed Agents

```python
from agent_framework.foundry import FoundryAgent
from azure.identity import AzureCliCredential

# Prompt Agent with versioning
agent = FoundryAgent(
    project_endpoint="https://your-project.services.ai.azure.com",
    agent_name="my-prompt-agent",
    agent_version="1.0",
    credential=AzureCliCredential(),
)

# Hosted Agent (no version)
agent = FoundryAgent(
    project_endpoint="https://your-project.services.ai.azure.com",
    agent_name="my-hosted-agent",
    credential=AzureCliCredential(),
)

result = await agent.run("Hello!")
```

### Python Hosted Agent with Service Sessions

```python
from azure.ai.projects.aio import AIProjectClient
from azure.ai.projects.models import VersionRefIndicator

service_session = await project_client.beta.agents.create_session(
    agent_name="my-hosted-agent",
    isolation_key="user-123",
    version_indicator=VersionRefIndicator(agent_version="1.0"),
)
session = agent.get_session(service_session.agent_session_id)

response = await agent.run("Hello!", session=session)
```

## Python Embeddings

```python
from agent_framework.foundry import FoundryEmbeddingClient

async with FoundryEmbeddingClient() as client:
    result = await client.get_embeddings(["hello from Agent Framework"])
    print(result[0].dimensions)
```

**Environment Variables**:
- `FOUNDRY_MODELS_ENDPOINT`: Models endpoint URL
- `FOUNDRY_MODELS_API_KEY`: API key for models endpoint
- `FOUNDRY_EMBEDDING_MODEL`: Embedding model name (e.g., `text-embedding-3-small`)
- `FOUNDRY_IMAGE_EMBEDDING_MODEL`: Image embedding model (optional)

## FoundryAgent Behavior Constraints

### Tools with FoundryAgent

| Tool Type | Behavior |
|-----------|----------|
| `FunctionTool` (local callable) | Supported only if matching function exists on Foundry agent. Framework invokes locally when model calls it. Passing client-side only supplies implementation — doesn't register new tools. |
| Hosted tools (web search, code interpreter, etc.) | Ignored. Must be configured on Foundry agent definition. Passing client-side has no effect. |

### Context Providers with FoundryAgent

| Provider Behavior | Works? |
|-------------------|--------|
| Adds extra context as messages (RAG, memory) | ✅ Yes |
| Persists conversation (writes to store) | ✅ Yes |
| Adds tools dynamically | ❌ No — unless already on Foundry agent definition |

### Run Options with FoundryAgent

Options like `temperature`, `top_p`, `max_tokens`, `instructions`, `tool_choice` are **not all honored**. Foundry agent definition is source of truth:

| Option | Behavior |
|--------|----------|
| `model` | Ignored — taken from agent definition |
| `tools`, `tool_choice`, `parallel_tool_calls` | Stripped from request; tools must be on agent definition |
| `instructions`, system messages | Ignored — agent's instructions are authoritative |
| Sampling parameters (`temperature`, `top_p`, etc.) | Forwarded but agent may override |

## Configuration (Python)

```bash
# FoundryChatClient
FOUNDRY_PROJECT_ENDPOINT="https://<your-project>.services.ai.azure.com"
FOUNDRY_MODEL="gpt-4o-mini"

# FoundryAgent (Prompt Agent)
FOUNDRY_PROJECT_ENDPOINT="https://<your-project>.services.ai.azure.com"
FOUNDRY_AGENT_NAME="my-agent"
FOUNDRY_AGENT_VERSION="1.0"

# FoundryEmbeddingClient
FOUNDRY_MODELS_ENDPOINT="https://<apim-instance>.azure-api.net/<foundry-instance>/models"
FOUNDRY_MODELS_API_KEY="<api-key>"
FOUNDRY_EMBEDDING_MODEL="text-embedding-3-small"
```

## Links

- [Azure AI Foundry Documentation](https://aka.ms/AIFoundry)
- [AIProjectClient API](https://learn.microsoft.com/en-us/python/api/azure-ai-projects/)
- [Foundry Agent Service Overview](https://learn.microsoft.com/azure/ai-foundry/agents/overview)
- [Agent Framework Samples](https://github.com/microsoft/agent-framework/tree/main/samples)

## Questions & Follow-ups

- How does `FoundryAgent` handle concurrent requests to the same agent definition?
- What is the performance difference between Responses Agent and Foundry Agent?
- How are custom types handled in Foundry Toolboxes?
- Can `FoundryAgent` tools be updated without redeploying the agent?
