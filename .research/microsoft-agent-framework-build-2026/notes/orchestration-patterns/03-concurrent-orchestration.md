---
title: "Concurrent Orchestration - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent"
source_title: "Concurrent Orchestration | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "pattern-implementation"
dimensions:
  - "patterns:concurrent"
  - "parallel-execution"
  - "result-aggregation"
  - "custom-aggregators"
extracted: "2026-06-18"
quality: "draft"
---

## What Concurrent Orchestration Is

Concurrent orchestration enables **multiple agents to work on the same task in parallel**. Each agent processes the input independently, and their results are collected and aggregated.

> "Concurrent orchestration enables multiple agents to work on the same task in parallel. Each agent processes the input independently, and their results are collected and aggregated. This approach is well-suited for scenarios where diverse perspectives or solutions are valuable, such as brainstorming, ensemble reasoning, or voting systems."

## Key Facts

### Fact 1: Parallel Independent Execution
- **All agents process input simultaneously** — no waiting, no context sharing
- **Independent Processing**: Each agent sees only the initial user input
- **Automatic Aggregation**: Results from all agents collected into final output
- **Diverse Perspectives**: Each agent brings unique expertise to same problem

### Fact 2: Default Aggregator Behavior
> "The default aggregator produces a single `AgentResponse` containing one assistant message per participant."

- Default aggregator: combines all agent outputs into single `AgentResponse`
- Each participant's final response becomes one assistant message
- Terminal output includes contributions from all agents

```python
# Python output structure
if outputs:
    final: AgentResponse = outputs[0]
    for msg in final.messages:
        name = msg.author_name or "assistant"  # Each agent's name
        print(f"[{name}]:\n{msg.text}")
```

### Fact 3: Custom Aggregator Support
Custom aggregators can **synthesize, summarize, or transform results** beyond simple concatenation.

```python
async def summarize_results(results: list[AgentExecutorResponse]) -> str:
    # Extract expert outputs
    expert_sections: list[str] = []
    for r in results:
        messages = getattr(r.agent_response, "messages", [])
        final_text = messages[-1].text if messages else "(no content)"
        expert_sections.append(f"{r.executor_id}:\n{final_text}")

    # Ask model to synthesize
    prompt = "\n\n".join(expert_sections)
    response = await summarizer_agent.run(prompt)
    return response.messages[-1].text if response.messages else ""

# Build with custom aggregator
workflow = (
    ConcurrentBuilder(participants=[researcher, marketer, legal])
    .with_aggregator(summarize_results)
    .build()
)
```

## Use Cases

- **Ensemble Reasoning**: Get diverse expert perspectives on same problem
- **Multi-Perspective Analysis**: Researcher, marketer, legal all analyzing launch strategy
- **Brainstorming**: Multiple agents generating ideas simultaneously
- **Voting Systems**: Agents vote or score options independently
- **Parallel Translation**: Translate to multiple languages at once
- **Multi-Domain Problem-Solving**: Subject matter experts in parallel

## C# Implementation

### Basic Setup
```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI.Workflows;
using Microsoft.Extensions.AI;
using Microsoft.Agents.AI;

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") 
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") 
    ?? "gpt-4o-mini";
var client = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .GetProjectOpenAIClient()
    .GetProjectResponsesClient()
    .AsIChatClient(deploymentName);
```

### Define Multiple Specialized Agents
```csharp
// Helper method to create translation agents
static ChatClientAgent GetTranslationAgent(string targetLanguage, IChatClient chatClient) =>
    new(chatClient,
        $"You are a translation assistant who only responds in {targetLanguage}. " +
        $"Respond to any input by outputting the name of the input language and " +
        $"then translating the input to {targetLanguage}.");

// Create translation agents for concurrent processing
var translationAgents = (from lang in (string[])["French", "Spanish", "English"]
                         select GetTranslationAgent(lang, client));
```

### Build Concurrent Workflow
```csharp
// Build concurrent workflow — all agents run in parallel
var workflow = AgentWorkflowBuilder.BuildConcurrent(translationAgents);
```

### Execute and Collect Aggregated Results
```csharp
var messages = new List<ChatMessage> { new(ChatRole.User, "Hello, world!") };

await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, messages);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

List<ChatMessage> result = new();
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is AgentResponseUpdateEvent e)
    {
        Console.WriteLine($"{e.ExecutorId}: {e.Update.Text}");
    }
    else if (evt is WorkflowOutputEvent outputEvt)
    {
        result = outputEvt.As<List<ChatMessage>>()!;
        break;
    }
}

// Display aggregated results from all agents
Console.WriteLine("===== Final Aggregated Results =====");
foreach (var message in result)
{
    Console.WriteLine($"{message.Role}: {message.Text}");
}
```

### Sample Output
```plaintext
French_Agent: English detected. Bonjour, le monde !
Spanish_Agent: English detected. ¡Hola, mundo!
English_Agent: English detected. Hello, world!

===== Final Aggregated Results =====
User: Hello, world!
Assistant: English detected. Bonjour, le monde !
Assistant: English detected. ¡Hola, mundo!
Assistant: English detected. Hello, world!
```

## Python Implementation

### Basic Setup
```python
import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

chat_client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ["FOUNDRY_MODEL"],
    credential=AzureCliCredential(),
)
```

### Define Multiple Domain Experts
```python
# Create three domain agents
researcher = chat_client.as_agent(
    instructions=(
        "You're an expert market and product researcher. Provide concise, factual insights, "
        "opportunities, and risks."
    ),
    name="researcher",
)

marketer = chat_client.as_agent(
    instructions=(
        "You're a creative marketing strategist. Craft compelling value propositions and "
        "target messaging."
    ),
    name="marketer",
)

legal = chat_client.as_agent(
    instructions=(
        "You're a cautious legal/compliance reviewer. Highlight constraints, disclaimers, "
        "and policy concerns."
    ),
    name="legal",
)
```

### Build Concurrent Workflow
```python
from agent_framework.orchestrations import ConcurrentBuilder

# Participants are either Agents or Executors
workflow = ConcurrentBuilder(participants=[researcher, marketer, legal]).build()
```

### Execute and Process Results
```python
from agent_framework import AgentResponse

# Run with single prompt and print aggregated responses
events = await workflow.run("We are launching a new budget-friendly electric bike for urban commuters.")
outputs = events.get_outputs()

if outputs:
    print("===== Final Aggregated Results =====")
    final: AgentResponse = outputs[0]
    for msg in final.messages:
        name = msg.author_name or "assistant"
        print(f"{'-' * 60}\n\n[{name}]:\n{msg.text}")
```

### Sample Output
```plaintext
===== Final Aggregated Results =====
------------------------------------------------------------

[researcher]:
**Insights:**
- **Target Demographic:** Urban commuters seeking affordable, eco-friendly transport
- **Market Trends:** E-bike sales growing globally with increasing urbanization
...

------------------------------------------------------------

[marketer]:
**Value Proposition:**
"Empowering your city commute: Our new electric bike combines affordability, reliability, 
and sustainable design."
...

------------------------------------------------------------

[legal]:
**Constraints, Disclaimers, & Policy Concerns:**
1. **Regulatory Compliance** — Verify e-bike meets federal, state, and local regulations
...
```

## Custom Aggregator Implementation

### Define Summarizer Agent
```python
from agent_framework import AgentExecutorResponse

# Create a summarizer agent
summarizer_agent = chat_client.as_agent(
    instructions=(
        "You are a helpful assistant that consolidates multiple domain expert outputs "
        "into one cohesive, concise summary with clear takeaways. Keep it under 200 words."
    ),
    name="summarizer",
)

# Define custom aggregator callback
async def summarize_results(results: list[AgentExecutorResponse]) -> str:
    # Extract expert sections
    expert_sections: list[str] = []
    for r in results:
        try:
            messages = getattr(r.agent_response, "messages", [])
            final_text = messages[-1].text if messages and hasattr(messages[-1], "text") else "(no content)"
            expert_sections.append(f"{r.executor_id}:\n{final_text}")
        except Exception as e:
            expert_sections.append(f"{r.executor_id}: (error: {type(e).__name__}: {e})")

    # Ask model to synthesize
    prompt = "\n\n".join(expert_sections)
    response = await summarizer_agent.run(prompt)
    return response.messages[-1].text if response.messages else ""
```

### Build with Custom Aggregator
```python
workflow = (
    ConcurrentBuilder(participants=[researcher, marketer, legal])
    .with_aggregator(summarize_results)
    .build()
)

output = None
async for event in workflow.run("We are launching a new budget-friendly electric bike.", stream=True):
    if event.type == "output":
        output = event.data

if output:
    print("===== Final Consolidated Output =====")
    print(output)
```

### Custom Aggregator Sample Output
```plaintext
===== Final Consolidated Output =====
Urban e-bike demand is rising rapidly due to eco-awareness and urban congestion, 
with ~10% CAGR projected through 2030. Key customer concerns are affordability, 
maintenance, charging convenience, and theft protection. Opportunities include 
smart features (GPS, app connectivity), subscription/leasing options, and 
portable designs. Regulatory compliance on speed, wattage, and safety certification 
is mandatory. Effective messaging should target young professionals, students, and 
eco-conscious commuters with slogan: "Charge Ahead—City Commutes Made Affordable."
```

## Advanced: Custom Agent Executors

Wrap agents with additional logic for more control:

```python
from agent_framework import (
    AgentExecutorRequest,
    AgentExecutorResponse,
    Executor,
    WorkflowContext,
    handler,
)

class ResearcherExec(Executor):
    def __init__(self, chat_client: FoundryChatClient, id: str = "researcher"):
        self.agent = chat_client.as_agent(
            instructions=(
                "You're an expert market researcher. Provide concise, factual insights, "
                "opportunities, and risks."
            ),
            name=id,
        )
        super().__init__(id=id)

    @handler
    async def run(self, request: AgentExecutorRequest, ctx: WorkflowContext[AgentExecutorResponse]) -> None:
        response = await self.agent.run(request.messages)
        full_conversation = list(request.messages) + list(response.messages)
        await ctx.send_message(AgentExecutorResponse(self.id, response, full_conversation=full_conversation))

# Build with custom executors
researcher = ResearcherExec(chat_client)
marketer = MarketerExec(chat_client)
legal = LegalExec(chat_client)

workflow = ConcurrentBuilder(participants=[researcher, marketer, legal]).build()
```

## Intermediate Outputs

By default, **only aggregator output surfaces as terminal `"output"` event**. Pass `intermediate_output_from` to surface individual participant outputs as `"intermediate"` events:

```python
workflow = ConcurrentBuilder(
    participants=[researcher, marketer, legal],
    intermediate_output_from=[researcher, marketer, legal],
).build()

# Handle both intermediate and final outputs
from agent_framework import AgentResponseUpdate

last_author: str | None = None

async for event in workflow.run("Analyze product launch strategy.", stream=True):
    if event.type == "intermediate" and isinstance(event.data, AgentResponseUpdate):
        update = event.data
        author = update.author_name
        if author != last_author:
            if last_author is not None:
                print()
            print(f"{author}: {update.text}", end="", flush=True)
            last_author = author
        else:
            print(update.text, end="", flush=True)
```

## Key Concepts

- **Parallel Execution**: All agents work simultaneously and independently
- **AgentResponse Output**: Default aggregator yields single response with one message per participant
- **Diverse Perspectives**: Each agent brings unique expertise
- **Custom Aggregators**: Override default behavior to synthesize results
- **Intermediate Outputs**: Designate participants for intermediate event emissions
- **Flexible Participants**: Use agents or custom executors

## Links

- [GroupChatToolApproval Sample](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Agents/GroupChatToolApproval)
- [Concurrent Orchestration Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Orchestration)
- [Python Samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows)
