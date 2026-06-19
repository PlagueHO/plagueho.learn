---
title: GitHub Copilot SDK Integration for Agents
source_url: https://learn.microsoft.com/agent-framework/agents/providers/github-copilot
source_title: GitHub Copilot Agents | Microsoft Agent Framework
source_date: 2026-06-18
area: sdk-integrations
type: provider-integration
dimensions:
  - copilot-sdk-integration
  - shell-execution
  - file-operations
  - mcp-integration
  - permissions-model
extracted: 2026-06-18T00:00:00Z
quality: draft
---

## What

GitHub Copilot agents provide access to powerful coding-oriented AI capabilities through the GitHub Copilot SDK integrated with the Microsoft Agent Framework. These agents can execute shell commands, perform file operations, fetch URLs, and integrate with Model Context Protocol (MCP) servers.

## Key Facts

1. **Prerequisites**: GitHub Copilot agents require the GitHub Copilot CLI to be installed and authenticated. For security, it is recommended to run agents with shell or file permissions in a containerized environment (Docker/Dev Container).

2. **SDK Setup**: 
   - .NET: `dotnet add package Microsoft.Agents.AI.GitHub.Copilot`
   - Python: `pip install agent-framework-github-copilot --pre`

3. **Capabilities Matrix**:
   - Function Tools: ✅ Supported
   - Tool Approval: ✅ Supported
   - Code Interpreter: ❌ Not available
   - File Search: ❌ Not available
   - Web Search: ❌ Not exposed as hosted tool
   - Shell/File/URL execution: ✅ Built into Copilot CLI, gated by permissions handler
   - Hosted MCP Tools: ✅ Remote (HTTP) MCP servers via SessionConfig
   - Local MCP Tools: ✅ Local (stdio) MCP servers via SessionConfig

4. **Permissions Model**: By default, agents cannot execute shell commands, read/write files, or fetch URLs. Permission handlers provide granular control with approval types: `ApproveOnce()`, `Reject()`, `ApproveAll()`, and `PermissionDecisionUserNotAvailable()`.

5. **Session Management**: Agents support `AgentSession` (C#) or `session` (Python) for maintaining conversation context across multiple interactions with full memory.

## How — C# Example

```csharp
using GitHub.Copilot;
using Microsoft.Agents.AI;

// Basic agent
await using CopilotClient copilotClient = new();
await copilotClient.StartAsync();
AIAgent agent = copilotClient.AsAIAgent();
Console.WriteLine(await agent.RunAsync("What is Microsoft Agent Framework?"));

// With permissions and MCP servers
static Task<PermissionDecision> PromptPermission(
    PermissionRequest request, PermissionInvocation invocation)
{
    Console.WriteLine($"\n[Permission Request: {request.Kind}]");
    Console.Write("Approve? (y/n): ");
    string? input = Console.ReadLine()?.Trim().ToUpperInvariant();
    return Task.FromResult(
        input is "Y" or "YES"
            ? PermissionDecision.ApproveOnce()
            : PermissionDecision.Reject());
}

SessionConfig sessionConfig = new()
{
    OnPermissionRequest = PromptPermission,
    McpServers = new Dictionary<string, object>
    {
        ["filesystem"] = new McpLocalServerConfig
        {
            Type = "stdio",
            Command = "npx",
            Args = ["-y", "@modelcontextprotocol/server-filesystem", "."],
            Tools = ["*"],
        },
        ["microsoft-learn"] = new McpRemoteServerConfig
        {
            Type = "http",
            Url = "https://learn.microsoft.com/api/mcp",
            Tools = ["*"],
        },
    },
};

AIAgent agent = copilotClient.AsAIAgent(sessionConfig);
Console.WriteLine(await agent.RunAsync("Search Microsoft Learn and summarize"));
```

## How — Python Example

```python
import asyncio
from agent_framework.github import GitHubCopilotAgent, GitHubCopilotOptions
from copilot.session import PermissionHandler, PermissionRequestResult
from copilot.session_events import PermissionRequest

# Basic agent
async def basic_example():
    agent = GitHubCopilotAgent(
        default_options={"instructions": "You are a helpful assistant."},
    )
    async with agent:
        result = await agent.run("What is Microsoft Agent Framework?")
        print(result)

# With permissions and streaming
async def permissions_example():
    async def prompt_permission(
        request: PermissionRequest, context: dict[str, str]
    ) -> PermissionRequestResult:
        print(f"\n[Permission Request: {request.kind}]")
        response = (await asyncio.to_thread(input, "Approve? (y/n): ")).strip().lower()
        if response in ("y", "yes"):
            return PermissionHandler.approve_all(request, context)
        return PermissionDecisionDeniedInteractivelyByUser()

    agent = GitHubCopilotAgent(
        default_options={
            "instructions": "You are a helpful assistant.",
            "on_permission_request": prompt_permission,
        },
    )

    async with agent:
        print("Agent: ", end="", flush=True)
        async for chunk in agent.run("List Python files.", stream=True):
            if chunk.text:
                print(chunk.text, end="", flush=True)
        print()

# With MCP servers
async def mcp_example():
    mcp_servers: dict[str, MCPServerConfig] = {
        "filesystem": {
            "type": "stdio",
            "command": "npx",
            "args": ["-y", "@modelcontextprotocol/server-filesystem", "."],
            "tools": ["*"],
        },
        "microsoft-learn": {
            "type": "http",
            "url": "https://learn.microsoft.com/api/mcp",
            "tools": ["*"],
        },
    }

    agent = GitHubCopilotAgent(
        default_options={
            "instructions": "You have access to filesystem and Microsoft Learn.",
            "on_permission_request": PermissionHandler.approve_all,
            "mcp_servers": mcp_servers,
        },
    )

    async with agent:
        result = await agent.run("Search Microsoft Learn for 'Azure Functions'")
        print(result)
```

## Use Cases

1. **Coding Assistance**: Agents that execute shell commands for build/test automation, file system operations for code generation and refactoring, and URL fetching for documentation lookup.

2. **Development Automation**: Shell command execution for CI/CD-like tasks, file search and analysis, project scaffolding.

3. **Interactive Development**: Real-time coding assistance with permission-based safety model, streaming responses for responsiveness.

4. **Extended Capabilities via MCP**: Connect to specialized MCP servers (stdio or HTTP) for filesystem access, Microsoft Learn search, custom tools.

## Code Examples

### Function Tools with Weather Data

```csharp
AIFunction weatherTool = AIFunctionFactory.Create((string location) =>
{
    return $"The weather in {location} is sunny with a high of 25C.";
}, "GetWeather", "Get the weather for a given location.");

AIAgent agent = copilotClient.AsAIAgent(
    tools: [weatherTool],
    instructions: "You are a helpful weather agent.");

Console.WriteLine(await agent.RunAsync("What's the weather like in Seattle?"));
```

```python
from typing import Annotated
from pydantic import Field

def get_weather(
    location: Annotated[str, Field(description="The location to get weather for.")],
) -> str:
    """Get the weather for a given location."""
    return f"The weather in {location} is sunny with a high of 25C."

agent = GitHubCopilotAgent(
    default_options={"instructions": "You are a helpful weather agent."},
    tools=[get_weather],
)

async with agent:
    result = await agent.run("What's the weather like in Seattle?")
    print(result)
```

### Session Management

```csharp
await using GitHubCopilotAgent agent = new(
    copilotClient,
    instructions: "You are a helpful assistant. Keep your answers short.");

AgentSession session = await agent.CreateSessionAsync();

// First turn
await agent.RunAsync("My name is Alice.", session);

// Second turn - agent remembers the context
AgentResponse response = await agent.RunAsync("What is my name?", session);
Console.WriteLine(response); // Should mention "Alice"
```

```python
agent = GitHubCopilotAgent(
    default_options={"instructions": "You are a helpful assistant."},
)

async with agent:
    session = agent.create_session()

    # First interaction
    result1 = await agent.run("My name is Alice.", session=session)
    print(f"Agent: {result1}")

    # Second interaction - remembers context
    result2 = await agent.run("What's my name?", session=session)
    print(f"Agent: {result2}")  # Should remember "Alice"
```

### Streaming Responses

```csharp
await foreach (AgentResponseUpdate update in agent.RunStreamingAsync("Tell me a short story."))
{
    Console.Write(update);
}
```

```python
async with agent:
    print("Agent: ", end="", flush=True)
    async for chunk in agent.run("Tell me a short story.", stream=True):
        if chunk.text:
            print(chunk.text, end="", flush=True)
    print()
```

## Environment Variables (Python)

- `GITHUB_COPILOT_CLI_PATH`: Path to the Copilot CLI executable
- `GITHUB_COPILOT_MODEL`: Model to use (e.g., `gpt-5`, `claude-sonnet-4`)
- `GITHUB_COPILOT_TIMEOUT`: Request timeout in seconds
- `GITHUB_COPILOT_LOG_LEVEL`: CLI log level
- `GITHUB_COPILOT_BASE_DIRECTORY`: Directory for CLI session state and config (defaults to `~/.copilot`)

## Links

- [GitHub Copilot SDK Repository](https://github.com/github/copilot-sdk)
- [.NET Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples)
- [Agent Framework Documentation](../../get-started/your-first-agent)

## Questions & Follow-ups

- What is the authentication flow for GitHub Copilot CLI in CI/CD environments?
- How do permissions persist across sessions?
- What are the failure modes when MCP servers are unavailable?
- How does tool approval work with multiple concurrent tool calls?
