---
title: Tool Approval, Permissions & Human-in-the-Loop Gating
source_url: https://learn.microsoft.com/agent-framework/agents/tool-approval
source_title: Tool Approval - Agent Framework
source_date: 2025-06-18
area: agent-capabilities
type: concept
dimensions:
  - permissions_and_safety
  - tool_approval
  - human_in_the_loop
  - approval_modes
  - code_examples
extracted: 2026-06-18
quality: draft
---

## What Is Tool Approval?

Tool Approval is a framework feature that lets you gate every tool invocation — function tools, hosted tools, MCP tool calls — through a human-in-the-loop decision before the model receives the result. It is handled by the framework's function-invoking chat client in both .NET and Python, so it works with any provider whose client invokes tools locally.

Tool Approval is essential for:

- **Side-effect operations** — Tools that modify data, send communications, make purchases
- **Data-sensitive operations** — Tools that access PII, financial data, credentials
- **Irreversible operations** — Deletions, sending emails, permanent changes
- **High-impact operations** — Bulk operations or operations with broad scope

## Approval Modes

### Python: approval_mode Decorator Parameter

```python
from typing import Annotated
from agent_framework import tool

# Tool that always requires approval
@tool(approval_mode="always_require")
def send_email(
    recipient: Annotated[str, "Email recipient"],
    subject: Annotated[str, "Email subject"],
    body: Annotated[str, "Email body"]
) -> str:
    """Send an email (requires approval)."""
    return f"Email sent to {recipient}"

# Tool that never requires approval
@tool(approval_mode="never_require")
def get_weather(location: Annotated[str, "Location"]) -> str:
    """Get weather (automatic, no approval needed)."""
    return f"Weather in {location}"
```

### .NET: ApprovalRequiredAIFunction

```csharp
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

// Wrap a tool to require approval
var sendEmailTool = new ApprovalRequiredAIFunction(
    AIFunctionFactory.Create(
        (string recipient, string subject, string body) =>
        {
            // Send email logic
            return $"Email sent to {recipient}";
        },
        name: "send_email"
    )
);

var agent = new AzureOpenAIClient(endpoint, credential)
    .GetChatClient(deploymentName)
    .AsAIAgent(
        instructions: "You are a helpful assistant",
        tools: [sendEmailTool]  // This tool now requires approval
    );
```

## Handling Approval Requests

### Python: Approval Flow with Sessions

```python
import asyncio
from typing import Annotated
from agent_framework import Agent, tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

@tool(approval_mode="always_require")
def add_to_calendar(
    event_name: Annotated[str, "Name of the event"],
    date: Annotated[str, "Date of the event"]
) -> str:
    """Add an event to the calendar (requires approval)."""
    return f"Added {event_name} on {date}"

async def main():
    agent = Agent(
        client=FoundryChatClient(credential=AzureCliCredential()),
        instructions="You are a helpful calendar assistant.",
        tools=[add_to_calendar],
    )

    session = agent.create_session()

    # User request
    query = "Add a dentist appointment on March 15th"
    print(f"User: {query}")
    result = await agent.run(query, session=session)

    # Check for approval requests
    if result.user_input_requests:
        for request in result.user_input_requests:
            print(f"\nApproval needed: {request.function_call.name}")
            print(f"Arguments: {request.function_call.arguments}")

            # User decides to approve or reject
            approved = True  # In real app, get user input
            
            # Send response back to agent
            response = request.create_approval_response(approved)
            result = await agent.run([response], session=session)

    print(f"Agent: {result.text}")

if __name__ == "__main__":
    asyncio.run(main())
```

### .NET: Approval Flow

```csharp
using System.ComponentModel;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

static string GetWeather(
    [Description("The location to get weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15°C.";

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") ?? 
    throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";

// Wrap the function tool to require approval
ApprovalRequiredAIFunction approvalTool = new(
    AIFunctionFactory.Create(GetWeather, name: nameof(GetWeather))
);

AIAgent agent = new AzureOpenAIClient(
    new Uri(endpoint),
    new DefaultAzureCredential())
    .GetChatClient(deploymentName)
    .AsAIAgent(
        instructions: "You are a helpful assistant that can get weather information.",
        tools: [approvalTool]
    );

// Run the agent
AgentSession session = await agent.CreateSessionAsync();
AgentResponse response = await agent.RunAsync("What is the weather in Amsterdam?", session);

// Check for approval requests
List<ToolApprovalRequestContent> approvalRequests = response.Messages
    .SelectMany(m => m.Contents)
    .OfType<ToolApprovalRequestContent>()
    .ToList();

while (approvalRequests.Count > 0)
{
    // Ask user to approve each request
    List<ChatMessage> userInputResponses = approvalRequests
        .ConvertAll(approvalRequest =>
        {
            Console.WriteLine($"Approve: {((FunctionCallContent)approvalRequest.ToolCall).Name}?");
            bool approved = Console.ReadLine()?.Equals("Y", StringComparison.OrdinalIgnoreCase) ?? false;
            return new ChatMessage(ChatRole.User, [approvalRequest.CreateResponse(approved)]);
        });

    response = await agent.RunAsync(userInputResponses, session);
    approvalRequests = response.Messages
        .SelectMany(m => m.Contents)
        .OfType<ToolApprovalRequestContent>()
        .ToList();
}

Console.WriteLine($"\nAgent: {response}");
```

## ToolApprovalAgent Middleware

The `ToolApprovalAgent` middleware provides advanced approval workflows including auto-approval rules and standing approvals.

### .NET: Auto-Approval Rules

```csharp
using Microsoft.Agents.AI;

// Define auto-approval rules
var approvalOptions = new ToolApprovalAgentOptions
{
    AutoApprovalRules = new[]
    {
        // Auto-approve read-only tools
        (FunctionCallContent fc) => new ValueTask<bool>(
            fc.Name == "ReadFile" || fc.Name == "GetWeather"
        ),
        
        // Auto-approve specific tool with specific arguments
        (FunctionCallContent fc) => new ValueTask<bool>(
            fc.Name == "WriteLog" && fc.Arguments?["level"]?.ToString() == "info"
        ),
    }
};

// Create agent with approval middleware
AIAgent innerAgent = new AzureOpenAIClient(endpoint, credential)
    .GetChatClient(deploymentName)
    .AsAIAgent(
        instructions: "You are a helpful assistant",
        tools: [approvalTool]
    );

var approvalAgent = new ToolApprovalAgent(innerAgent, approvalOptions);

// This agent will auto-approve matching tools, surface others for user decision
var response = await approvalAgent.RunAsync("What is the weather?", session);
```

### Python: Approval with Manual Flow

```python
import asyncio
from agent_framework import Agent, AgentResponse, Message, tool
from agent_framework.openai import OpenAIChatClient
from dotenv import load_dotenv

@tool(approval_mode="always_require")
def deploy_service(service_name: str) -> str:
    """Deploy a service to production (requires approval)."""
    return f"Deployed {service_name} to production"

async def main():
    client = OpenAIChatClient()
    agent = Agent(
        client=client,
        instructions="You are a deployment assistant.",
        tools=[deploy_service]
    )

    # Initial request
    response = await agent.run("Deploy the API service")

    # Handle approval flow
    while response.user_input_requests:
        for request in response.user_input_requests:
            # Display approval request
            print(f"Approval needed: {request.function_call.name}")
            print(f"Service: {request.function_call.arguments.get('service_name')}")

            # Get user decision (in real app, from UI or user input)
            user_approved = input("Approve? (y/n): ").lower() == 'y'

            # Create response
            approval_response = request.create_approval_response(user_approved)

            # Continue agent run with approval
            response = await agent.run([approval_response])

    print(f"Result: {response.text}")

if __name__ == "__main__":
    asyncio.run(main())
```

## MCP Tool Approval

MCP tools can also require approval:

```csharp
using Microsoft.Agents.AI;

// Create MCP tool with approval requirement
var mcpToolWithApproval = new HostedMcpServerTool(
    serverName: "microsoft_learn",
    serverAddress: "https://learn.microsoft.com/api/mcp")
{
    AllowedTools = ["microsoft_docs_search"],
    ApprovalMode = HostedMcpServerToolApprovalMode.AlwaysRequire
};

// Agent will request approval before calling this MCP tool
var agent = new AzureOpenAIClient(endpoint, credential)
    .GetResponsesClient()
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a helpful assistant.",
        tools: [mcpToolWithApproval]
    );
```

## CodeAct with Approval

When using CodeAct (code execution), you can require approval for the entire `execute_code` invocation:

```csharp
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Hyperlight;

// Sensitive tool that requires approval
var sendEmailTool = new ApprovalRequiredAIFunction(
    AIFunctionFactory.Create(SendEmail, name: "send_email")
);

// Create CodeAct provider with approval-required tools
var codeact = new HyperlightCodeActProvider(new HyperlightCodeActProviderOptions
{
    Tools = [fetchDocs, sendEmailTool],  // sendEmailTool triggers approval
});

// When sendEmailTool is accessed in code, entire execute_code requires approval
var agent = chatClient.AsAIAgent(
    instructions: "You are a helpful assistant.",
    options: new ChatClientAgentOptions
    {
        AIContextProviders = [codeact],
    }
);
```

## Approval Request Content Structure

### Python Approval Request

```python
class ApprovalRequest:
    """Represents a request for tool approval."""
    request_id: str          # Unique identifier for this request
    function_call: FunctionCall  # The tool being requested
    function_call.name: str  # Tool name
    function_call.arguments: dict  # Tool arguments
```

### C# Approval Request

```csharp
public class ToolApprovalRequestContent : AIContent
{
    public string RequestId { get; }           // Unique identifier
    public ToolCallContent ToolCall { get; }   // FunctionCallContent with tool details
}

// Create response
ToolApprovalResponseContent response = approvalRequest.CreateResponse(approved: true);
```

## Security & Governance

### Approval Strategy Matrix

| Operation Type | Approval Mode | Reasoning |
|---|---|---|
| **Read-only** (get_weather, read_file) | Never require | No side effects, safe to execute |
| **Write-limited** (add_note, log_event) | Conditional | Requires context-aware rules |
| **Side effects** (send_email, delete) | Always require | Irreversible; requires explicit user decision |
| **Data access** (PII, financial) | Always require | Sensitive data; strict controls needed |
| **External systems** (3rd party APIs) | Always require | Out-of-control systems; requires oversight |

### Best Practices

1. **Default to caution** — Use `approval_mode="always_require"` unless there's a clear reason not to
2. **Document approval rationale** — Explain why a tool requires or doesn't require approval
3. **Use standing approvals** — `AlwaysApproveToolApprovalResponseContent` stores approval rules for repeated operations
4. **Audit approvals** — Log all approval requests and decisions for compliance
5. **Progressive narrowing** — Start with all tools requiring approval; narrow based on confidence

## Limitations & Constraints

- **Streaming interaction** — Approval requests pause the conversation until user responds
- **Session persistence** — Approval decisions are stored per session for repeated operations
- **Tool-level granularity** — Approval is per-tool, not per specific arguments (use auto-approval rules for argument-level control)
- **No built-in denying** — If user rejects, agent must handle the refusal gracefully

## Key Facts Extracted

1. **Framework Feature** — Tool Approval works with any provider that invokes tools locally (OpenAI, Azure OpenAI, Foundry, etc.)
2. **Multiple Modes** — Python uses `@tool(approval_mode="...")` decorator; .NET uses `ApprovalRequiredAIFunction`
3. **Auto-Approval Rules** — `ToolApprovalAgent` middleware supports conditional auto-approval based on tool name/arguments
4. **Standing Approvals** — Once user approves a pattern, matching future approvals are auto-granted
5. **MCP & CodeAct Support** — Approval works with MCP tools and CodeAct execute_code invocations
6. **Human-in-the-Loop** — Pauses agent execution, surfaces approval to caller, resumes on user decision

## Links & References

- [Microsoft Learn: Tool Approval](https://learn.microsoft.com/agent-framework/agents/tool-approval)
- [Tool Approval Samples (Python)](https://github.com/microsoft/agent-framework/blob/main/python/samples/02-agents/tools/function_tool_with_approval_and_sessions.py)
- [Tool Approval Samples (.NET)](https://github.com/microsoft/agent-framework/blob/main/dotnet/samples/02-agents/Agents/Agent_Step01_UsingFunctionToolsWithApprovals)
- [ToolApprovalAgent (.NET)](https://github.com/microsoft/agent-framework/blob/main/dotnet/src/Microsoft.Agents.AI/Harness/ToolApproval/ToolApprovalAgent.cs)
