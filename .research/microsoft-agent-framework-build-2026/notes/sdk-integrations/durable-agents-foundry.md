---
title: Durable Agents with Foundry & Durable Task
source_url: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
source_title: Durable Task extension for Microsoft Agent Framework
source_date: 2026-06-18
area: sdk-integrations
type: integration-guide
dimensions:
  - durable-agents
  - durable-task-integration
  - foundry-integration
  - azure-functions
  - session-persistence
extracted: 2026-06-18T00:00:00Z
quality: draft
---

## What

The Durable Task extension for Microsoft Agent Framework brings durable execution directly into the framework, enabling agents with persistent sessions, automatic checkpointing, failure recovery, and distributed scaling—without changes to agent logic. Agents can be registered with the extension to make them automatically durable and deployable to Azure Functions or custom compute.

## Key Facts

### When to Use Durable Agents

- **Persistent conversation state** — Sessions survive process crashes, restarts, scaling without losing context
- **Multi-agent orchestration** — Coordinate specialized agents in deterministic workflows with automatic checkpointing
- **Long-running workflows** — Support human-in-the-loop approvals or timed waits lasting hours/days/weeks
- **Scalable, serverless hosting** — Scale to thousands of concurrent sessions (or to zero) on Azure Functions Flex Consumption

### Architecture

Internally implements **entity-based agent loops**, where each agent session is a durable entity that automatically manages conversation state and checkpointing.

Two hosting approaches:
1. **Azure Functions** — using Azure Functions integration package
2. **Bring your own compute** — using base package

### Session Lifecycle

- Sessions created via orchestration or direct client call
- Each session is a durable entity with checkpointing
- Conversations persist across process restarts
- Completed agent calls not re-executed on recovery

## How — C# Azure Functions

### Basic Durable Agent Setup

```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.DurableTask.Client;
using Microsoft.DurableTask.Orchestration;

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4o-mini";

// Create standard Agent Framework agent
AIAgent agent = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a professional content writer who creates engaging, well-structured documents.",
        name: "DocumentPublisher");

// One line to make agent durable with serverless hosting
using IHost app = FunctionsApplication
    .CreateBuilder(args)
    .ConfigureFunctionsWebApplication()
    .ConfigureDurableAgents(options => options.AddAIAgent(agent))
    .Build();
app.Run();
```

### Multi-Agent Orchestration

```csharp
[Function(nameof(DocumentPublishingOrchestration))]
public async Task<string> DocumentPublishingOrchestration(
    [OrchestrationTrigger] TaskOrchestrationContext context)
{
    var docRequest = context.GetInput<DocumentRequest>();

    DurableAIAgent researchAgent = context.GetAgent("ResearchAgent");
    DurableAIAgent writerAgent = context.GetAgent("DocumentPublisherAgent");

    // Step 1: Research the topic
    AgentResponse<ResearchResult> researchResult = await researchAgent
        .RunAsync<ResearchResult>(
            $"Research the following topic: {docRequest.Topic}");

    // Step 2: Write the document using research findings
    AgentResponse<DocumentResponse> document = await writerAgent
        .RunAsync<DocumentResponse>(
            $"""Create a document about {docRequest.Topic}.
            Research findings: {researchResult.Result.Findings}""");

    // Step 3: Publish
    return await context.CallActivityAsync<string>(
        nameof(PublishDocument),
        new { docRequest.Topic, document.Result.Text });
}

[Function(nameof(PublishDocument))]
public async Task<string> PublishDocument([ActivityTrigger] dynamic input)
{
    // Publish the document
    return $"Published document: {input.title}";
}
```

### Sequential Workflow with Durable Checkpointing

```csharp
OrderLookup orderLookup = new();
OrderCancel orderCancel = new();
SendEmail sendEmail = new();

Workflow cancelOrder = new WorkflowBuilder(orderLookup)
    .WithName("CancelOrder")
    .WithDescription("Cancel an order and notify the customer")
    .AddEdge(orderLookup, orderCancel)
    .AddEdge(orderCancel, sendEmail)
    .Build();

using IHost app = FunctionsApplication
    .CreateBuilder(args)
    .ConfigureFunctionsWebApplication()
    .ConfigureDurableWorkflows(workflows => workflows.AddWorkflows(cancelOrder))
    .Build();
app.Run();
```

### Fan-Out/Fan-In (Concurrent) Workflow

```csharp
ChatClient chatClient = new AzureOpenAIClient(
    new Uri(endpoint), new DefaultAzureCredential()).GetChatClient(deploymentName);

AIAgent physicist = chatClient.AsAIAgent(
    "You are a physics expert. Be concise (2-3 sentences).", "Physicist");
AIAgent chemist = chatClient.AsAIAgent(
    "You are a chemistry expert. Be concise (2-3 sentences).", "Chemist");

ParseQuestionExecutor parseQuestion = new();
AggregatorExecutor aggregator = new();

Workflow workflow = new WorkflowBuilder(parseQuestion)
    .WithName("ExpertReview")
    .AddFanOutEdge(parseQuestion, [physicist, chemist])
    .AddFanInBarrierEdge([physicist, chemist], aggregator)
    .Build();

using IHost app = FunctionsApplication
    .CreateBuilder(args)
    .ConfigureFunctionsWebApplication()
    .ConfigureDurableWorkflows(workflows => workflows.AddWorkflows(workflow))
    .Build();
app.Run();
```

## How — Python Azure Functions

### Basic Durable Agent with Foundry

```python
import os
from agent_framework.azure import FoundryChatClient, AgentFunctionApp
from azure.identity import DefaultAzureCredential

endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT") or "gpt-4o-mini"

client = FoundryChatClient(
    endpoint=endpoint,
    credential=DefaultAzureCredential()
)

agent = client.as_agent(
    model=deployment_name,
    instructions="You are a professional content writer who creates engaging, well-structured documents.",
    name="DocumentPublisher"
)

# One line to make agent durable with serverless hosting
app = AgentFunctionApp(agents=[agent])
```

### Multi-Agent Orchestration

```python
from agent_framework.azure import DurableAIAgentOrchestrationContext

def document_publishing_orchestration(ctx, doc_request: dict):
    agent_context = DurableAIAgentOrchestrationContext(ctx)

    research = agent_context.get_agent("ResearchAgent")
    writer = agent_context.get_agent("DocumentPublisherAgent")

    research_session = research.create_session()
    writer_session = writer.create_session()

    # Step 1: Research the topic
    research_result = yield research.run(
        messages=f"Research the following topic: {doc_request['topic']}",
        session=research_session,
    )

    # Step 2: Write the document using research findings
    document = yield writer.run(
        messages=f"""Create a document about {doc_request['topic']}.
        Research findings: {research_result.text}""",
        session=writer_session,
    )

    # Step 3: Publish
    return (yield ctx.call_activity("publish_document", input={
        "title": doc_request["topic"],
        "content": document.text
    }))
```

### Sequential Workflow with Durable Checkpointing

```python
from agent_framework import Workflow, WorkflowBuilder, WorkflowContext, executor
from agent_framework.azure import AgentFunctionApp

@executor(id="store_email")
async def store_email(email_text: str, ctx: WorkflowContext) -> None:
    ctx.set_state("current_email", email_text)
    await ctx.send_message(email_text)

@executor(id="process_email")
async def process_email(email_text: str, ctx: WorkflowContext) -> None:
    result = f"Processed: {email_text[:50]}..."
    await ctx.send_message(result)

@executor(id="finalize")
async def finalize(result: str, ctx: WorkflowContext[None, str]) -> None:
    await ctx.yield_output(f"Complete: {result}")

workflow = (
    WorkflowBuilder(start_executor=store_email)
    .add_edge(store_email, process_email)
    .add_edge(process_email, finalize)
    .build()
)

app = AgentFunctionApp(workflow=workflow)
```

### Fan-Out/Fan-In (Concurrent) Workflow

```python
from agent_framework import Agent, AgentExecutorResponse, Workflow, WorkflowBuilder, executor
from agent_framework.azure import AgentFunctionApp

sentiment_agent = Agent(
    client=chat_client,
    name="SentimentAnalysisAgent",
    instructions="You are a sentiment analysis expert.",
)

keyword_agent = Agent(
    client=chat_client,
    name="KeywordExtractionAgent",
    instructions="You are a keyword extraction expert.",
)

@executor(id="input_router")
async def input_router(doc: str, ctx: WorkflowContext) -> None:
    await ctx.send_message(doc)

@executor(id="prepare_for_output")
async def prepare_for_output(
    analyses: list[AgentExecutorResponse], ctx: WorkflowContext[None, str]
) -> None:
    parts = [f"[{a.executor_id}]: {a.agent_response.text}" for a in analyses]
    await ctx.yield_output("\n\n".join(parts))

workflow = (
    WorkflowBuilder(start_executor=input_router)
    .add_fan_out_edges(source=input_router, targets=[sentiment_agent, keyword_agent])
    .add_fan_in_edges(sources=[sentiment_agent, keyword_agent], target=prepare_for_output)
    .build()
)

app = AgentFunctionApp(workflow=workflow)
```

## How — Bring Your Own Compute (C#)

```csharp
var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT") ?? "gpt-4o-mini";

AIAgent agent = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a professional content writer.",
        name: "DocumentPublisher");

// Host agent with Durable Task Scheduler
string connectionString = "Endpoint=http://localhost:8080;TaskHub=default;Authentication=None";

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.ConfigureDurableAgents(
            options => options.AddAIAgent(agent),
            workerBuilder: builder => builder.UseDurableTaskScheduler(connectionString),
            clientBuilder: builder => builder.UseDurableTaskScheduler(connectionString));
    })
    .Build();

await host.StartAsync();
```

## How — Bring Your Own Compute (Python)

```python
from agent_framework.azure import FoundryChatClient, DurableAIAgentWorker
from durabletask.azuremanaged.worker import DurableTaskSchedulerWorker

endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
deployment_name = os.getenv("AZURE_OPENAI_DEPLOYMENT") or "gpt-4o-mini"

client = FoundryChatClient(endpoint=endpoint, credential=AzureCliCredential())

agent = client.as_agent(
    model=deployment_name,
    name="DocumentPublisher",
    instructions="You are a professional content writer.",
)

# Create worker connected to Durable Task Scheduler
worker = DurableTaskSchedulerWorker(
    host_address="http://localhost:8080",
    secure_channel=False,
    taskhub="default",
)

# Register agent and start processing
agent_worker = DurableAIAgentWorker(worker)
agent_worker.add_agent(agent)
worker.start()
```

## Checkpointing Behavior

- Each agent call in an orchestration/workflow is checkpointed
- On failure, orchestration recovers from last checkpoint
- Completed agent calls are not re-executed (idempotent)
- Session state persists between checkpoint recovery
- All conversation history preserved

## Use Cases

1. **Long-running document generation** — Multi-hour research + writing with session persistence
2. **Multi-step approval workflows** — Human-in-the-loop with durable checkpoints
3. **Distributed agent coordination** — Multiple specialized agents with failure recovery
4. **Scalable conversational AI** — Thousands of concurrent agent sessions on serverless
5. **Workflow automation** — Order processing, customer service, content generation

## Configuration

### Azure Functions

Built-in support via `ConfigureDurableAgents()` and `ConfigureDurableWorkflows()`.

### Durable Task Scheduler

```
Endpoint=http://localhost:8080
TaskHub=default
Authentication=None
```

## Links

- [Durable Task Extension Documentation](https://learn.microsoft.com/en-us/agent-framework/integrations/azure-functions)
- [Tutorial: Create and Run a Durable Agent](https://learn.microsoft.com/en-us/agent-framework/integrations/azure-functions#tutorial-create-and-run-a-durable-agent)
- [Durable Task Scheduler](https://learn.microsoft.com/en-us/azure/durable-task/durable-task-scheduler)
- [Azure Functions Flex Consumption Plan](https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan)
- [GitHub Samples](https://github.com/microsoft/agent-framework/tree/main/samples)

## Questions & Follow-ups

- How is session state serialized across checkpoints?
- What is the maximum size for agent conversation history?
- How does checkpointing impact latency?
- Can orchestrations be updated without losing active sessions?
- What monitoring/observability is available for durable agents?
