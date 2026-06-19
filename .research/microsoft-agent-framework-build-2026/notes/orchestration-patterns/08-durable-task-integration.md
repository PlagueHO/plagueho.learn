---
title: "Durable Task Integration with Agent Framework"
source_url: "https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework"
source_title: "Durable Task Extension for Microsoft Agent Framework | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "distributed-execution"
dimensions:
  - "durable-execution"
  - "checkpointing"
  - "failure-recovery"
  - "multi-agent-orchestration"
extracted: "2026-06-18"
quality: "draft"
---

## What Durable Task Integration Is

The **Durable Task extension for Microsoft Agent Framework** brings **durable execution directly into Agent Framework** with persistent sessions, built-in API endpoints, and distributed scaling — without changes to agent logic.

> "The Durable Task extension for Microsoft Agent Framework brings durable execution directly into the Microsoft Agent Framework. You can register agents with the extension to make them automatically durable with persistent sessions, built-in API endpoints, and distributed scaling — without changes to your agent logic."

## When to Use Durable Agents

Choose the Durable Task extension when you need:

- **Persistent Conversation State**: Agent sessions survive process crashes, restarts, scaling events without losing context
- **Multi-Agent Orchestration**: Coordinate specialized agents in deterministic workflows with automatic checkpointing and failure recovery
- **Long-Running Workflows**: Support human-in-the-loop approvals or timed waits lasting hours, days, weeks without consuming compute
- **Scalable Serverless Hosting**: Scale to thousands of concurrent agent sessions (or to zero) on Azure Functions Flex Consumption plan

If you don't need durable state or multi-agent coordination, standard Agent Framework may be sufficient.

## Architecture

The extension internally implements **entity-based agent loops** where each agent session is a durable entity that automatically manages conversation state and checkpointing.

Two hosting approaches:

1. **Azure Functions** (Recommended) — using Azure Functions integration package
2. **Bring Your Own Compute** — using base package

## Single Agent with Durable Hosting

### C# — Azure Functions

```csharp
var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT")
    ?? "gpt-4o-mini";

// Create an AI agent using standard Agent Framework pattern
AIAgent agent = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .AsAIAgent(
        model: deploymentName,
        instructions: "You are a professional content writer who creates engaging, "
                    + "well-structured documents for any given topic.",
        name: "DocumentPublisher");

// One line to make the agent durable with serverless hosting
using IHost app = FunctionsApplication
    .CreateBuilder(args)
    .ConfigureFunctionsWebApplication()
    .ConfigureDurableAgents(options => options.AddAIAgent(agent))
    .Build();
app.Run();
```

### Python — Azure Functions

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
    instructions="You are a professional content writer who creates engaging, "
                 "well-structured documents for any given topic.",
    name="DocumentPublisher"
)

# One line to make the agent durable with serverless hosting
app = AgentFunctionApp(agents=[agent])
```

## Multi-Agent Orchestration with Durable Checkpointing

Coordinate multiple specialized agents as steps in a durable orchestration. Each agent call is checkpointed; orchestration recovers automatically if any step fails. Completed calls aren't re-executed.

Use `context.GetAgent()` (C#) or `app.get_agent()` (Python) to retrieve registered agents inside orchestration. Returned `DurableAIAgent` wrapper ensures calls are tracked and checkpointed.

### C# — Document Publishing Orchestration

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
```

### Python — Document Publishing Orchestration

```python
@app.orchestration_trigger(context_name="context")
def document_publishing_orchestration(context: DurableOrchestrationContext):
    doc_request = context.get_input()

    research_agent = app.get_agent(context, "ResearchAgent")
    writer_agent = app.get_agent(context, "DocumentPublisherAgent")

    research_session = research_agent.create_session()
    writer_session = writer_agent.create_session()

    # Step 1: Research the topic
    research_result = yield research_agent.run(
        messages=f"Research the following topic: {doc_request['topic']}",
        session=research_session,
    )

    # Step 2: Write the document using research findings
    document = yield writer_agent.run(
        messages=f"""Create a document about {doc_request['topic']}.
        Research findings: {research_result.text}""",
        session=writer_session,
    )

    # Step 3: Publish
    return (yield context.call_activity("publish_document", {
        "title": doc_request["topic"],
        "content": document.text
    }))
```

## Graph-Based Workflows with Durable Checkpointing

The Durable Task extension also supports **Microsoft Agent Framework workflows** using declarative, graph-based programming model (`WorkflowBuilder`). Each step in graph is automatically checkpointed; orchestration recovers from failures.

### Sequential Workflow Example

**C# — Order Cancellation Workflow**:
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

**Python — Email Processing Workflow**:
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

Send question to multiple expert agents in parallel, then aggregate responses.

**C# — Expert Review Workflow**:
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

**Python — Sentiment & Keyword Analysis Workflow**:
```python
from agent_framework import (
    Agent, AgentExecutorResponse, Workflow,
    WorkflowBuilder, WorkflowContext, executor,
)
from agent_framework.azure import AgentFunctionApp

chat_client = ...  # OpenAIChatCompletionClient or FoundryChatClient

sentiment_agent = Agent(
    client=chat_client,
    name="SentimentAnalysisAgent",
    instructions="You are a sentiment analysis expert. Analyze sentiment of the given text.",
)

keyword_agent = Agent(
    client=chat_client,
    name="KeywordExtractionAgent",
    instructions="You are a keyword extraction expert. Extract important keywords.",
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

## Key Concepts

- **Durable Entities**: Each agent session is durable entity managing state/checkpointing
- **Automatic Checkpointing**: Each agent call tracked; failed steps recover without re-execution
- **Persistent State**: Sessions survive process crashes, restarts, scaling events
- **Serverless Hosting**: Azure Functions Flex Consumption for zero-to-scale-up elasticity
- **Multi-Agent Checkpointing**: Coordinate agents with failure recovery in deterministic workflows
- **Graph Workflows**: Declarative topology with automatic step checkpointing
- **Fan-Out/Fan-In**: Parallel execution with automatic result aggregation
- **Long-Running Support**: Human-in-the-loop approvals, timed waits without compute consumption

## Advantages

✓ **Automatic State Management**: No manual persistence needed
✓ **Failure Recovery**: Completed steps skip re-execution
✓ **Scalability**: Serverless hosting scales elastically
✓ **Long-Running**: Support human-in-the-loop indefinitely
✓ **Zero Code Changes**: Existing Agent Framework code works unchanged
✓ **Deterministic Execution**: Orchestrations reproduce consistent results
✓ **Real-Time Monitoring**: Track orchestration progress

## Links

- [Tutorial: Create and Run a Durable Agent](https://learn.microsoft.com/agent-framework/integrations/azure-functions#tutorial-create-and-run-a-durable-agent)
- [Agent Framework Documentation](https://learn.microsoft.com/agent-framework/)
- [Durable Task Patterns](../durable-agents-patterns)
- [Azure Functions Flex Consumption](https://learn.microsoft.com/azure/azure-functions/flex-consumption-plan)
- [GitHub Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows)
