---
title: Sample code patterns
date: 2026-06-18
status: complete
purpose: 12-minute technical presentation for senior architects and solution engineers
target_audience: senior architects and solution engineers
source_notes:
  - notes/agent-harness-core-loop/microsoft-learn-agent-loop-architecture.md
  - notes/agent-harness-core-loop/github-repository-patterns.md
  - notes/agent-capabilities/tools-function-registration.md
  - notes/agent-capabilities/skills-design-progressive-disclosure.md
  - notes/agent-capabilities/tool-approval-permissions-gating.md
  - notes/advanced-features/sub-agents-orchestration.md
  - notes/advanced-features/session-persistence-memory.md
  - notes/advanced-features/human-in-the-loop-approval.md
  - notes/sdk-integrations/github-copilot-sdk-integration.md
  - notes/sdk-integrations/microsoft-foundry-agent-service.md
  - notes/sdk-integrations/durable-agents-foundry.md
  - notes/sdk-integrations/m365-agents-copilot-integration.md
---

## Demo-ready sample code patterns

Build 2026 messaging emphasizes one programming model across agent runtime, tools, sessions, approvals, and provider integrations. [Agent Framework blog](https://devblogs.microsoft.com/agent-framework/), [Agent runtime model](https://learn.microsoft.com/agent-framework/agents/), [Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)

### Primary snippet 1 (Runnable): Python tool + approval + session

- What (announcement tie-in): Tool approval and session-aware conversations are first-class runtime features. [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval), [Conversations](https://learn.microsoft.com/agent-framework/agents/conversations/)
- How: Register a Python function with `@tool`, require approval, then continue the same session with an approval response. [Adding tools](https://learn.microsoft.com/agent-framework/journey/adding-tools), [HITL workflows](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop)
- Used for: Governed side-effecting actions in real-time demos and production assistants.

```python
import asyncio
from typing import Annotated

from agent_framework import Agent, tool
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential


@tool(approval_mode="always_require")
def add_to_calendar(
    title: Annotated[str, "Calendar event title"],
    date: Annotated[str, "Event date"],
) -> str:
    return f"Added '{title}' on {date}."


async def main() -> None:
    agent = Agent(
        client=FoundryChatClient(credential=AzureCliCredential()),
        instructions="You are a calendar assistant.",
        tools=[add_to_calendar],
    )

    session = agent.create_session()
    result = await agent.run("Add a dentist appointment on March 15", session=session)

    for request in result.user_input_requests or []:
        result = await agent.run([request.create_approval_response(True)], session=session)

    print(result.text)


asyncio.run(main())
```

### Primary snippet 2 (Runnable): C# function tool + agent run

- What (announcement tie-in): Function tools and provider-backed agents share the same `RunAsync` model in .NET. [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools/), [Microsoft Foundry provider](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)
- How: Create an `AIAgent` from Azure OpenAI client, register a typed C# function tool, run one user turn. [Agent tutorials](https://learn.microsoft.com/agent-framework/tutorials/), [GitHub samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/01-get-started)
- Used for: Fast, reliable conference demos that map cleanly to production code paths.

```csharp
using System.ComponentModel;
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Extensions.AI;

static string GetWeather([Description("The location to get weather for.")] string location)
    => $"The weather in {location} is cloudy with a high of 15 C.";

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";

AIAgent agent = new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential())
    .GetChatClient(deploymentName)
    .AsAIAgent(
        instructions: "You are a helpful assistant.",
        tools: [AIFunctionFactory.Create(GetWeather)]);

var response = await agent.RunAsync("What is the weather in Amsterdam?");
Console.WriteLine(response.Text);
```

### Appendix (Conceptual only, links)

- Durable orchestration with Agent Framework: <https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework>
- Workflow orchestration patterns (sequential, concurrent, handoff, group chat, Magentic): <https://learn.microsoft.com/agent-framework/workflows/orchestrations/>
- GitHub Copilot provider integration: <https://learn.microsoft.com/agent-framework/agents/providers/github-copilot>
- Bring agents into Microsoft 365 Copilot: <https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot>