---
title: Tools and Function Definition & Registration
source_url: https://learn.microsoft.com/agent-framework/agents/tools
source_title: Tools Overview - Agent Framework
source_date: 2025-06-18
area: agent-capabilities
type: concept
dimensions:
  - skills_and_tools
  - function_definition
  - tool_registration
  - code_examples
extracted: 2026-06-18
quality: draft
---

## What Is a Tool?

Tools allow agents to interact with external systems, execute code, search data, and more. Agent Framework supports many different types of tools that extend agent capabilities. Tools are functions or services that an agent can invoke during conversations to perform specific actions.

### Tool Types Supported

**Core Tool Types (Cross-Platform):**
- **Function Tools** — Custom code (Python functions or .NET methods) that agents can call during conversations
- **Code Interpreter** — Execute code in a sandboxed environment
- **File Search** — Search through uploaded files
- **Web Search** — Search the web for information
- **Hosted MCP Tools** — MCP servers invoked by the provider runtime
- **Local MCP Tools** — MCP servers running locally or on custom hosts
- **Foundry Toolboxes** — Named, versioned bundles of hosted tool configurations managed in a Foundry project

**Python-specific Tools:**
- **Image Generation** — Hosted image generation on the Foundry / OpenAI Responses runtime
- **Shell** — Hosted shell execution on the OpenAI Responses runtime
- **Bing Grounding** — Web grounding via your own Grounding with Bing Search resource (experimental)
- **Bing Custom Search** — Bing grounding restricted to a curated domain list (preview)
- **Azure AI Search** — Query an Azure AI Search index through a Foundry connection (experimental)
- **SharePoint** — Ground answers in SharePoint content (preview)
- **Microsoft Fabric** — Query a Fabric data agent (preview)
- **Memory Search** — Search a Foundry-managed memory store (preview)
- **Computer Use** — Drive a desktop or browser environment (preview)
- **Browser Automation** — Drive a browser via Azure Playwright (preview)
- **Agent-to-Agent (A2A) tool** — Call a remote A2A agent as a tool from a Foundry agent (preview)

## How Tools Are Registered

### Function Tools in Python

```python
import os
import asyncio
from typing import Annotated
from agent_framework import Agent, tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

# Define a simple function tool
@tool
def get_weather(location: Annotated[str, "The location to get weather for"]) -> str:
    """Get the weather for a location."""
    return f"The weather in {location} is cloudy with a high of 15°C."

# Create an agent with the tool
async def main():
    client = FoundryChatClient(credential=AzureCliCredential())
    agent = Agent(
        client=client,
        name="WeatherAgent",
        instructions="You are a helpful assistant that can get weather information.",
        tools=[get_weather]  # Register tool directly
    )
    
    result = await agent.run("What is the weather in Amsterdam?")
    print(result.text)

if __name__ == "__main__":
    asyncio.run(main())
```

### Function Tools in .NET

```csharp
using System.ComponentModel;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

static string GetWeather([Description("The location to get weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15°C.";

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? 
    throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new DefaultAzureCredential())
    .GetChatClient(deploymentName)
    .AsAIAgent(
        instructions: "You are a helpful assistant",
        tools: [AIFunctionFactory.Create(GetWeather)]
    );

var response = await agent.RunAsync("What is the weather like in Amsterdam?");
Console.WriteLine(response.Text);
```

## Tool Calling Invocation Pattern

When a tool is registered with an agent:

1. **Tool Discovery** — The agent's system prompt includes descriptions of available tools
2. **Tool Selection** — The LLM decides which tool(s) to call based on the user query
3. **Tool Invocation** — Agent Framework automatically calls the function with LLM-provided arguments
4. **Result Handling** — The function result is passed back to the LLM for further processing

**Python tool invocation example:**
```python
@tool
def add_to_calendar(
    event_name: Annotated[str, "Name of the event"],
    date: Annotated[str, "Date of the event"]
) -> str:
    """Add an event to the calendar."""
    return f"Added {event_name} on {date}"

# Agent automatically invokes this when needed
result = await agent.run("Add a dentist appointment on March 15th")
```

**C# tool invocation with AIFunctionFactory:**
```csharp
// Create tool from lambda
var addFunction = AIFunctionFactory.Create(
    (int a, int b) => a + b,
    name: "add",
    description: "Adds two integers."
);

// Tool is automatically invoked when the agent decides to call it
var agent = new AzureOpenAIClient(endpoint, new DefaultAzureCredential())
    .GetChatClient(deploymentName)
    .AsAIAgent(tools: [addFunction]);
```

## Parameter Handling & Validation

### Type Safety

Tools use strongly-typed parameters. The Agent Framework automatically converts LLM-provided arguments to the correct types and validates them.

**Python parameter types:**
```python
@tool
def process_data(
    count: Annotated[int, "Number of items"],
    threshold: Annotated[float, "Minimum threshold"],
    tags: Annotated[list[str], "List of tags"]
) -> str:
    """Process data with validation."""
    return f"Processed {count} items with threshold {threshold}"
```

**C# parameter types via reflection:**
```csharp
static void ProcessData(int count, float threshold, string[] tags)
{
    // Method signature defines the contract
}

var tool = AIFunctionFactory.Create(ProcessData);
// Framework automatically marshals LLM arguments to correct types
```

### Input Validation

Treat LLM-provided arguments as untrusted input:

- **Use allow-listing** — Validate inputs against known-good values
- **Enforce type and range constraints** — Verify arguments are within acceptable bounds
- **Limit string lengths** — Prevent resource exhaustion
- **Prevent path traversal** — If functions accept file paths, validate they're within allowed directories
- **Use parameterized queries** — If arguments are used in SQL or shell contexts

**Validation example:**
```python
@tool
def read_file(filepath: Annotated[str, "Path to file"]) -> str:
    """Read a file with validation."""
    import os
    # Validate path is within allowed directory
    allowed_dir = "/allowed/path"
    full_path = os.path.abspath(filepath)
    if not full_path.startswith(allowed_dir):
        raise ValueError(f"Path {filepath} is not allowed")
    
    with open(full_path) as f:
        return f.read()
```

## Error Handling for Tool Calls

When a tool call fails:

1. **Exception Capture** — Framework catches exceptions from tool execution
2. **Error Reporting** — The error message is formatted and returned to the agent
3. **Retry Capability** — The agent can decide to retry or use an alternative approach
4. **Graceful Degradation** — Agent can continue with partial information

**Python error handling:**
```python
@tool
def call_external_api(endpoint: Annotated[str, "API endpoint"]) -> str:
    """Call external API with error handling."""
    try:
        # Make API call
        response = requests.get(endpoint, timeout=5)
        return response.json()
    except requests.Timeout:
        raise ValueError("API call timed out")
    except requests.RequestException as e:
        raise ValueError(f"API error: {str(e)}")
```

## Agent as a Function Tool

You can use an agent as a function tool for another agent, enabling agent composition:

**Python agent composition:**
```python
# Create inner agent for weather
weather_agent = OpenAIChatClient(...).as_agent(
    name="WeatherAgent",
    description="An agent that answers questions about the weather.",
    instructions="You answer questions about the weather.",
    tools=[get_weather]
)

# Create main agent with inner agent as a tool
main_agent = OpenAIChatClient(...).as_agent(
    instructions="You are a helpful assistant.",
    tools=[weather_agent.as_tool()]  # Inner agent becomes a tool
)

# Main agent can now call weather agent as a tool
result = await main_agent.run("What is the weather like in Amsterdam?")
```

**C# agent composition:**
```csharp
// Create inner agent
AIAgent weatherAgent = new AzureOpenAIClient(endpoint, credential)
    .GetResponsesClient()
    .AsAIAgent(
        model: deploymentName,
        instructions: "You answer questions about the weather.",
        tools: [AIFunctionFactory.Create(GetWeather)]
    );

// Create main agent with inner agent as a function tool
AIAgent agent = new AzureOpenAIClient(endpoint, credential)
    .GetResponsesClient()
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a helpful assistant.",
        tools: [weatherAgent.AsAIFunction()]  // Convert agent to function tool
    );

// Main agent can call inner agent as a tool
Console.WriteLine(await agent.RunAsync("What is the weather in Amsterdam?"));
```

## Provider Support Matrix

Tool support varies by provider and client type:

| Tool Type | OpenAI Responses | Azure OpenAI Responses | Foundry | Anthropic | Ollama | GitHub Copilot |
|---|---|---|---|---|---|---|
| Function Tools | ✅ | ✅ | ✅ | ✅ | ⚠️ | ✅ |
| Code Interpreter | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| File Search | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Web Search | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Hosted MCP Tools | ✅ | ✅ | ✅ | ✅ | ❌ | ✅ |
| Local MCP Tools | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

## Key Facts Extracted

1. **Multiple Tool Types** — Agents can use function tools, code interpreters, file search, web search, MCP tools, and more
2. **Framework-Managed Marshalling** — Agent Framework automatically converts LLM arguments to correct types and validates them
3. **Composition Pattern** — Agents can be used as function tools for other agents, enabling nested workflows
4. **Provider Flexibility** — Different providers support different tool types; the framework abstracts these differences
5. **Error Handling** — Tool execution errors are captured and reported to the agent for retry or alternative actions
6. **Type Safety** — Python type annotations and C# reflection define the contract between the agent and tools

## Use Cases

- **Structured Operations** — Use function tools for deterministic operations with clear inputs/outputs
- **Agent Orchestration** — Use agent-as-tool pattern for complex multi-step workflows with specialized sub-agents
- **External System Integration** — Use MCP tools to connect to external services, databases, or APIs
- **Code Execution** — Use code interpreter for dynamic calculations or data processing

## Links & References

- [Agent Framework Tools Overview](https://learn.microsoft.com/agent-framework/agents/tools)
- [Microsoft Agent Framework GitHub](https://github.com/microsoft/agent-framework)
- [Function Tool Examples (Python)](https://github.com/microsoft/agent-framework/tree/main/python/samples/02-agents/tools)
- [Function Tool Examples (.NET)](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/02-agents/Agents)
