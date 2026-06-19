---
title: "Group Chat Orchestration - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat"
source_title: "Group Chat Orchestration | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "pattern-implementation"
dimensions:
  - "patterns:group-chat"
  - "collaborative-refinement"
  - "speaker-selection"
  - "context-synchronization"
extracted: "2026-06-18"
quality: "draft"
---

## What Group Chat Orchestration Is

Group chat orchestration models **a collaborative conversation among multiple agents, coordinated by an orchestrator that determines speaker selection and conversation flow**.

> "Group chat orchestration models a collaborative conversation among multiple agents, coordinated by an orchestrator that determines speaker selection and conversation flow. This pattern is ideal for scenarios requiring iterative refinement, collaborative problem-solving, or multi-perspective analysis."

The orchestrator maintains a **star topology** with the orchestrator in the middle. Different speaker selection strategies can determine which agent speaks next.

## Key Facts

### Fact 1: Centralized Coordination vs. Direct Transfer
> "Unlike handoff patterns where agents directly transfer control, group chat uses an orchestrator to coordinate who speaks next"

| Aspect | Group Chat | Handoff |
|--------|-----------|---------|
| Control Flow | Orchestrator decides next speaker | Agents decide who receives handoff |
| Context | All agents see full conversation | All agents see full conversation (mesh) |
| Flexibility | Orchestrator implements speaker selection | Direct agent-to-agent control |

### Fact 2: Context Synchronization
> "All agents in a group chat see the full conversation history. The orchestrator broadcasts responses to all agents, making sure all participants have the latest context for their next turn."

**Implementation Details**:
- Agents **do not share same session instance** (different agent types have different session implementations)
- After each agent's turn, orchestrator **broadcasts response to all other agents**
- Each agent's session synchronized with complete conversation history before turn
- All participants have latest context for next turn

```
Orchestrator Synchronization Flow:
1. Orchestrator sends request to selected agent
2. Agent responds
3. Orchestrator broadcasts response to all other agents
4. All agents now synchronized with full conversation
5. Orchestrator selects next speaker
```

### Fact 3: Speaker Selection Strategies
Multiple strategies for selecting which agent speaks next:

**Round-Robin** (C#):
```csharp
var workflow = AgentWorkflowBuilder
    .CreateGroupChatBuilderWith(agents =>
        new RoundRobinGroupChatManager(agents)
        {
            MaximumIterationCount = 5  // Max number of turns
        })
    .AddParticipants(writer, reviewer)
    .Build();
```

**Agent-Based Orchestrator** (Python) — Intelligent decision-making:
```python
orchestrator_agent = Agent(
    name="Orchestrator",
    instructions="""
You coordinate a team conversation to solve tasks.

Guidelines:
- Start with Researcher to gather information
- Then have Writer synthesize the final answer
- Finish after both have contributed meaningfully
""",
    client=client,
)

workflow = GroupChatBuilder(
    participants=[researcher, writer],
    orchestrator_agent=orchestrator_agent,
).build()
```

**Custom Selection Function** (Python):
```python
def round_robin_selector(state: GroupChatState) -> str:
    """Select next speaker based on round index."""
    participant_names = list(state.participants.keys())
    return participant_names[state.current_round % len(participant_names)]

workflow = GroupChatBuilder(
    participants=[researcher, writer],
    selection_func=round_robin_selector,
).build()
```

**Smart Custom Selector** (Python):
```python
def smart_selector(state: GroupChatState) -> str:
    """Select based on conversation content and context."""
    conversation = state.conversation
    last_message = conversation[-1] if conversation else None

    if not last_message:
        return "Researcher"  # Start with researcher

    last_text = last_message.text.lower()

    # If researcher finished, switch to writer
    if "i have finished" in last_text and last_message.author_name == "Researcher":
        return "Writer"

    return "Researcher"

workflow = GroupChatBuilder(
    participants=[researcher, writer],
    selection_func=smart_selector,
).build()
```

## Use Cases

- **Iterative Refinement**: Writer-reviewer workflows for document improvement
- **Collaborative Problem-Solving**: Agents with complementary expertise working together
- **Content Creation**: Multiple rounds of review and enhancement
- **Multi-Perspective Analysis**: Getting diverse viewpoints with refinement
- **Quality Assurance**: Automated review and approval processes
- **Brainstorming with Critique**: Idea generation with immediate feedback loops

## C# Implementation

### Setup and Agent Definition
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

// Create specialized agents
ChatClientAgent writer = new(client,
    "You are a creative copywriter. Generate catchy slogans and marketing copy. Be concise and impactful.",
    "CopyWriter",
    "A creative copywriter agent");

ChatClientAgent reviewer = new(client,
    "You are a marketing reviewer. Evaluate slogans for clarity, impact, and brand alignment.",
    "Reviewer",
    "A marketing review agent");
```

### Build with Round-Robin Manager
```csharp
// Round-robin speaker selection
var workflow = AgentWorkflowBuilder
    .CreateGroupChatBuilderWith(agents =>
        new RoundRobinGroupChatManager(agents)
        {
            MaximumIterationCount = 5
        })
    .AddParticipants(writer, reviewer)
    .Build();
```

### Execute and Stream Results
```csharp
var messages = new List<ChatMessage> {
    new(ChatRole.User, "Create a slogan for an eco-friendly electric vehicle.")
};

await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, messages);
await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

await foreach (WorkflowEvent evt in run.WatchStreamAsync().ConfigureAwait(false))
{
    if (evt is AgentResponseUpdateEvent update)
    {
        AgentResponse response = update.AsResponse();
        foreach (ChatMessage message in response.Messages)
        {
            Console.WriteLine($"[{update.ExecutorId}]: {message.Text}");
        }
    }
    else if (evt is WorkflowOutputEvent output)
    {
        var conversationHistory = output.As<List<ChatMessage>>();
        Console.WriteLine("\n=== Final Conversation ===");
        foreach (var message in conversationHistory)
        {
            Console.WriteLine($"{message.AuthorName}: {message.Text}");
        }
        break;
    }
}
```

### Sample Interaction
```plaintext
[CopyWriter]: "Green Dreams, Zero Emissions" - Drive the future with style and sustainability.

[Reviewer]: The slogan is good, but "Green Dreams" might be too abstract. Consider "Pure Power, 
Zero Impact" to emphasize performance and environmental benefit.

[CopyWriter]: "Pure Power, Zero Impact" - Experience electric excellence without compromise.

[Reviewer]: Excellent! This slogan is clear, impactful, and directly communicates key benefits.
The tagline reinforces the message perfectly. Approved for use.
```

## Python Implementation

### Setup and Agent Definition
```python
import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ["FOUNDRY_MODEL"],
    credential=AzureCliCredential(),
)

# Create specialized agents
researcher = Agent(
    client=client,
    name="Researcher",
    description="Collects relevant background information.",
    instructions="Gather concise facts that help answer the question. Be brief and factual.",
)

writer = Agent(
    client=client,
    name="Writer",
    description="Synthesizes polished answers.",
    instructions="Compose clear, structured answers using notes provided. Be comprehensive.",
)
```

### Build with Round-Robin Selector
```python
from agent_framework.orchestrations import GroupChatBuilder, GroupChatState

def round_robin_selector(state: GroupChatState) -> str:
    """Select next speaker in round-robin fashion."""
    participant_names = list(state.participants.keys())
    return participant_names[state.current_round % len(participant_names)]

workflow = GroupChatBuilder(
    participants=[researcher, writer],
    termination_condition=lambda conversation: len(conversation) >= 4,
    selection_func=round_robin_selector,
).build()
```

### Build with Agent-Based Orchestrator
```python
# Create orchestrator agent
orchestrator_agent = Agent(
    name="Orchestrator",
    instructions="""
You coordinate a team conversation to solve the user's task.

Guidelines:
- Start with Researcher to gather information
- Then have Writer synthesize the final answer
- Only finish after both have contributed meaningfully
""",
    client=client,
)

# Build with agent orchestrator
workflow = GroupChatBuilder(
    participants=[researcher, writer],
    termination_condition=lambda messages: sum(1 for msg in messages if msg.role == "assistant") >= 4,
    orchestrator_agent=orchestrator_agent,
).build()
```

### Execute and Stream
```python
from agent_framework import AgentResponse, AgentResponseUpdate

task = "What are the key benefits of async/await in Python?"

print(f"Task: {task}\n")
print("=" * 80)

last_author: str | None = None
final_response: AgentResponse | None = None

async for event in workflow.run(task, stream=True):
    if event.type == "output" and isinstance(event.data, AgentResponseUpdate):
        author = event.data.author_name
        if author != last_author:
            if last_author is not None:
                print()
            print(f"[{author}]:", end=" ", flush=True)
            last_author = author
        print(event.data.text, end="", flush=True)
    elif event.type == "output" and isinstance(event.data, AgentResponse):
        final_response = event.data

if final_response:
    print("\n\n" + "=" * 80)
    print("Final Response:")
    for msg in final_response.messages:
        print(f"\n[{msg.author_name}]\n{msg.text}")
```

### Sample Output
```plaintext
Task: What are the key benefits of async/await in Python?

================================================================================

[Researcher]: Async/await in Python provides non-blocking I/O operations, enabling
concurrent execution without threading overhead. Key benefits include improved
performance for I/O-bound tasks, better resource utilization, and simplified
concurrent code structure using native coroutines.

[Writer]: The key benefits of async/await in Python are:

1. **Non-blocking Operations**: Allows I/O operations to run concurrently without
   blocking the main thread, significantly improving performance for network
   requests, file I/O, and database queries.

2. **Resource Efficiency**: Avoids the overhead of thread creation and context
   switching, making it more memory-efficient than traditional threading.

3. **Simplified Concurrency**: Provides a clean, synchronous-looking syntax for
   asynchronous code, making concurrent programs easier to write and maintain.

4. **Scalability**: Enables handling thousands of concurrent connections with
   minimal resource consumption, ideal for high-performance web servers and APIs.
```

## Custom Speaker Selection Logic

```python
def smart_selector(state: GroupChatState) -> str:
    """Select speakers based on conversation content."""
    conversation = state.conversation

    last_message = conversation[-1] if conversation else None

    # If no messages yet, start with Researcher
    if not last_message:
        return "Researcher"

    # Check last message content
    last_text = last_message.text.lower()

    # If researcher finished gathering info, switch to writer
    if "i have finished" in last_text and last_message.author_name == "Researcher":
        return "Writer"

    # Continue with researcher until completion indicated
    return "Researcher"

workflow = GroupChatBuilder(
    participants=[researcher, writer],
    selection_func=smart_selector,
).build()
```

## Intermediate Outputs

By default, only orchestrator's final output surfaces. Pass `intermediate_output_from` to surface participant outputs:

```python
workflow = GroupChatBuilder(
    participants=[researcher, writer],
    termination_condition=lambda conversation: len(conversation) >= 4,
    selection_func=round_robin_selector,
    intermediate_output_from=[researcher, writer],
).build()
```

## Key Concepts

- **Centralized Manager**: Orchestrator coordinates speaker selection and flow
- **Flexible Orchestrators**: Round-robin, agent-based, or custom selection logic
- **Context Synchronization**: All agents synchronized before each turn
- **Iterative Collaboration**: Agents review and improve each other's work
- **Speaker Selection**: Strategies (round-robin, prompt-based, custom) for next speaker
- **MaximumIterationCount**: Controls max turns before termination
- **Termination Conditions**: Stop conversation based on criteria
- **Event Streaming**: Real-time updates via `AgentResponseUpdate`

## When to Use vs. Alternatives

**Use Group Chat when:**
- Iterative refinement needed
- Collaborative problem-solving required
- Multiple rounds of review/improvement
- Agents have complementary expertise

**Use Sequential when:**
- Strict ordering needed
- Linear pipeline (no iteration)

**Use Handoff when:**
- Direct agent-to-agent control needed
- Agents decide who handles next phase

**Use Concurrent when:**
- Independent processing desired
- No need for iteration/collaboration

## Links

- [Orchestration Patterns Overview](orchestrations/)
- [Human-in-the-Loop Guide](../human-in-the-loop)
- [GitHub Group Chat Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Agents/GroupChatToolApproval)
- [Python Samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows)
