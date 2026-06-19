---
title: "Sequential Orchestration - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential"
source_title: "Sequential Orchestration | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "pattern-implementation"
dimensions:
  - "patterns:sequential"
  - "context-control"
  - "human-in-the-loop:approval"
  - "human-in-the-loop:request-info"
  - "error-handling"
extracted: "2026-06-18"
quality: "draft"
---

## What Sequential Orchestration Is

Sequential orchestration models a **pipeline where agents execute one after another in a defined order**. Each agent processes the task in turn, passing its output to the next agent in sequence.

> "In sequential orchestration, agents are organized in a pipeline. Each agent processes the task in turn, passing its output to the next agent in the sequence. This is ideal for workflows where each step builds upon the previous one, such as document review, data processing pipelines, or multi-stage reasoning."

## Key Facts

### Fact 1: Default Context Behavior
> "By default, each agent in the sequence consumes the previous agent's full conversation — both the input messages provided to the previous agent and its response messages."

- **Full Context Mode** (default): Each agent sees input messages AND previous agent's responses
- **Chain-Only Mode**: Each agent sees ONLY the previous agent's response messages
- Useful for translation pipelines, progressive refinement, where each stage transforms output

**Configuration**:
```csharp
// C# - Configure context flow
// Default: agents see full conversation
var workflow = AgentWorkflowBuilder.BuildSequential(translationAgents);

// Python - Chain only previous agent responses
workflow = SequentialBuilder(
    participants=[writer, translator, reviewer],
    chain_only_agent_responses=True,
).build()
```

### Fact 2: Terminal Output Source
> "By default, `SequentialBuilder` designates the **last participant** as the terminal output source (`final_output_from`). Only that participant's output surfaces as an `"output"` event."

- **Only the last agent's response** becomes the workflow's terminal output by default
- **Intermediate Outputs**: Set `intermediate_output_from` to surface earlier participants' outputs as `"intermediate"` events

```python
# Python - Capture intermediate outputs
workflow = SequentialBuilder(
    participants=[writer, reviewer, editor],
    intermediate_output_from=[writer, reviewer],  # These emit "intermediate" events
).build()
```

### Fact 3: Custom Executors in Sequential Workflows
Sequential orchestrations **support mixing agents with custom executors** for specialized processing without LLM involvement.

```python
# Python - Custom terminator executor
class Summarizer(Executor):
    @handler
    async def summarize(
        self,
        agent_response: AgentExecutorResponse,
        ctx: WorkflowContext[Never, AgentResponse]
    ) -> None:
        if not agent_response.full_conversation:
            await ctx.yield_output(AgentResponse(
                messages=[Message("assistant", ["No conversation to summarize."])]
            ))
            return

        users = sum(1 for m in agent_response.full_conversation if m.role == "user")
        assistants = sum(1 for m in agent_response.full_conversation if m.role == "assistant")
        summary = Message("assistant", [f"Summary -> users:{users} assistants:{assistants}"])
        await ctx.yield_output(AgentResponse(messages=[summary]))

# Build with custom executor at end
summarizer = Summarizer(id="summarizer")
workflow = SequentialBuilder(participants=[content, summarizer]).build()
```

## Use Cases

- **Document Review Pipelines**: Draft → Review → Finalize
- **Content Creation**: Research → Write → Edit
- **Data Processing**: Extract → Transform → Validate
- **Language Translation**: Source → Lang1 → Lang2 → Lang3
- **Code Analysis**: Parse → Analyze → Suggest → Document

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

### Define Specialized Agents
```csharp
// Create translation agents
static ChatClientAgent GetTranslationAgent(string targetLanguage, IChatClient chatClient) =>
    new(chatClient,
        $"You are a translation assistant who only responds in {targetLanguage}. " +
        $"Respond to any input by outputting the name of the input language and " +
        $"then translating the input to {targetLanguage}.");

var translationAgents = (from lang in (string[])["French", "Spanish", "English"]
                         select GetTranslationAgent(lang, client)).ToList();
```

### Build Sequential Workflow
```csharp
// Build sequential pipeline
var workflow = AgentWorkflowBuilder.BuildSequential(translationAgents);
```

### Execute and Stream Results
```csharp
var messages = new List<ChatMessage> { new(ChatRole.User, "Hello, world!") };

await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, messages);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

string? lastExecutorId = null;
List<ChatMessage> result = [];
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is AgentResponseUpdateEvent e)
    {
        if (e.ExecutorId != lastExecutorId)
        {
            lastExecutorId = e.ExecutorId;
            Console.WriteLine();
            Console.Write($"{e.ExecutorId}: ");
        }
        Console.Write(e.Update.Text);
    }
    else if (evt is WorkflowOutputEvent outputEvt)
    {
        result = outputEvt.As<List<ChatMessage>>()!;
        break;
    }
}
```

### Sample Output
```plaintext
French_Translation: User: Hello, world!
French_Translation: Assistant: English detected. Bonjour, le monde !
Spanish_Translation: Assistant: French detected. ¡Hola, mundo!
English_Translation: Assistant: Spanish detected. Hello, world!
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

### Define Agents
```python
writer = chat_client.as_agent(
    instructions="You are a concise copywriter. Provide a single, punchy marketing sentence.",
    name="writer",
)

reviewer = chat_client.as_agent(
    instructions="You are a thoughtful reviewer. Give brief feedback on the previous response.",
    name="reviewer",
)
```

### Build Sequential Workflow
```python
from agent_framework.orchestrations import SequentialBuilder

workflow = SequentialBuilder(participants=[writer, reviewer]).build()
```

### Execute and Stream
```python
from agent_framework import AgentResponse

events = await workflow.run("Write a tagline for a budget-friendly eBike.")
outputs = events.get_outputs()

if outputs:
    print("===== Final Response =====")
    final: AgentResponse = outputs[0]
    for msg in final.messages:
        name = msg.author_name or "assistant"
        print(f"[{name}]\n{msg.text}")
```

## Human-in-the-Loop (HITL) Integration

### Tool Approval Pattern

**C# Implementation**:
```csharp
ChatClientAgent deployAgent = new(
    client,
    "You are a DevOps engineer. Check staging status first, then deploy.",
    "DeployAgent",
    tools: [
        AIFunctionFactory.Create(CheckStagingStatus),
        new ApprovalRequiredAIFunction(AIFunctionFactory.Create(DeployToProduction))
    ]);

ChatClientAgent verifyAgent = new(
    client,
    "You are a QA engineer. Verify deployment success.",
    "VerifyAgent");

var workflow = AgentWorkflowBuilder.BuildSequential([deployAgent, verifyAgent]);

// Handle approval in stream
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is RequestInfoEvent e &&
        e.Request.TryGetDataAs(out ToolApprovalRequestContent? approvalRequest))
    {
        await run.SendResponseAsync(
            e.Request.CreateResponse(approvalRequest.CreateResponse(approved: true)));
    }
}
```

**Python Implementation**:
```python
from agent_framework import tool

@tool(approval_mode="always_require")
def execute_database_query(query: str) -> str:
    return f"Query executed: {query}"

database_agent = Agent(
    client=chat_client,
    name="DatabaseAgent",
    instructions="You are a database assistant.",
    tools=[execute_database_query],
)

workflow = SequentialBuilder(participants=[database_agent]).build()

# Handle approval in stream
async for event in workflow.run("Check schema and update orders", stream=True):
    if event.type == "request_info" and event.data.type == "function_approval_request":
        responses[event.request_id] = event.data.to_function_approval_response(approved=True)
```

### Request Info Pattern (Agent Feedback)

**Python Implementation**:
```python
drafter = Agent(
    client=chat_client,
    name="drafter",
    instructions="You are a document drafter. Create a brief draft.",
)

editor = Agent(
    client=chat_client,
    name="editor",
    instructions="You are an editor. Review and improve the draft.",
)

finalizer = Agent(
    client=chat_client,
    name="finalizer",
    instructions="You are a finalizer. Create a polished final version.",
)

# Enable request info for editor only
workflow = (
    SequentialBuilder(participants=[drafter, editor, finalizer])
    .with_request_info(agents=["editor"])
    .build()
)

# Handle request events
async for event in workflow.run("Write a brief introduction to AI", stream=True):
    if event.type == "request_info":
        responses[event.request_id] = AgentRequestInfoResponse.approve()
```

## Key Concepts

- **Pipeline Model**: Agents process sequentially in defined order
- **Context Modes**: Full conversation vs. chain-only previous responses
- **Terminal Output**: By default, only last participant's output surfaces
- **Intermediate Outputs**: Designate earlier participants for intermediate event emissions
- **Custom Executors**: Mix agents with non-LLM processing steps
- **Tool Approval**: Pause execution for human review of sensitive operations
- **Request Info**: Agents request external feedback/review before continuing
- **Streaming**: Real-time monitoring via `AgentResponseUpdateEvent`, `WorkflowOutputEvent`

## Links

- [Controlling Context Between Agents](../advanced/context-modes)
- [Human-in-the-Loop Guide](../human-in-the-loop)
- [GroupChatToolApproval Sample](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Agents/GroupChatToolApproval)
- [Sequential Chain-Only Sample](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/orchestrations/sequential_chain_only_agent_responses.py)
- [Sequential Tool Approval Sample](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/tool-approval/sequential_builder_tool_approval.py)
- [Sequential Request Info Sample](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/human-in-the-loop/sequential_request_info.py)
