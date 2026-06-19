---
title: Agent Loop Architecture, Lifecycle Hooks, and Context Management
source_url: https://learn.microsoft.com/agent-framework/agents/agent-pipeline
source_title: Agent pipeline architecture
source_date: 2026-01-15
source_organization: Microsoft Learn
area: agent-harness-core-loop
type: Architecture Documentation
dimensions:
  - agent-loop-architecture
  - lifecycle-hooks
  - context-management
  - execution-flow
extracted: 2026-06-18T00:00:00Z
quality: draft
extracted_by: research-deep-reader
---

## What is the Agent Loop and How Does It Work?

The Agent Framework implements an agent loop as a **layered pipeline architecture** that processes requests through multiple execution stages. The agent loop is not a traditional imperative loop but rather a **request/response pipeline** where the request flows down through context enrichment and middleware layers, then back up through response processing.

### Agent Loop Definition

From Microsoft Learn documentation:
> "Agents in Microsoft Agent Framework use a layered pipeline architecture to process requests. Understanding this architecture helps you customize agent behavior by adding middleware, context providers, or client-level modifications at the appropriate layer."

The agent loop enables the LLM to:
1. Receive user input with injected context
2. Call tools/functions (function calling loop)
3. Observe tool results
4. Make decisions about next actions
5. Return final responses

Unlike traditional control flow loops, the agent loop is **declarative and event-driven**, with each layer responsible for specific concerns.

## Agent Loop Lifecycle and Phases

### C# Execution Flow

```
User Call: RunAsync(messages, session)
    ↓
[Agent Middleware] - Inspect/modify inputs/outputs
    ↓
[ChatHistoryProvider] - Load conversation history
    ↓
[AIContextProviders] - Add context, tools, instructions
    ↓
[IChatClient Middleware] - Pre-LLM processing
    ↓
[RawChatClient] - Provider-specific LLM communication
    ↓
[Function Invocation Loop]
    ├─→ LLM Response with Tool Calls
    ├─→ [Function Middleware] - Per-tool execution hooks
    ├─→ Execute Tools
    └─→ Iterate until no more tool calls
    ↓
[Response Flow Back Up] - ChatHistoryProvider & AIContextProviders notified
    ↓
Return AgentResponse with messages
```

**Key phases:**
1. **Pre-execution**: Middleware + context assembly
2. **LLM Inference**: Chat client communication
3. **Tool Calling**: Function invocation loop
4. **Post-execution**: Response storage and notification

### Python Execution Flow

```
User Call: agent.run(user_input, session)
    ↓
[Agent Middleware + Telemetry] - Observe & modify
    ↓
[RawAgent] - Core logic
    ├─→ Invoke context_providers (before hook)
    ├─→ Collect provider-added chat/function middleware
    └─→ Load history + inject context
    ↓
[ChatClient Pipeline]
    ├─→ [FunctionInvocation] - Manages tool calling
    │   ├─→ Tool Call Decision
    │   ├─→ [Function Middleware + Telemetry]
    │   └─→ Execute Tool
    │
    ├─→ [Chat Middleware + Telemetry]
    └─→ [RawChatClient] - Provider communication
    ↓
[Post-execution]
    └─→ Context providers receive after_run callback
    ↓
Return AgentResponse or stream updates
```

## State Management and Transitions

### AgentSession: The State Container

**C# definition:**
```csharp
// Abstract base class
public abstract class AgentSession
{
    public Dictionary<string, object> StateBag { get; set; }
}
```

**Python definition:**
```python
class AgentSession:
    session_id: str  # Local unique identifier
    service_session_id: Optional[str]  # Remote service ID
    state: Dict[str, Any]  # Mutable state shared with providers
```

### State Lifecycle

1. **Creation**: `session = await agent.CreateSessionAsync()`
2. **Persistence**: Session ID persists across multiple `RunAsync()` calls
3. **Context Provider Access**: All context providers receive session reference
4. **State Storage**: Provider-specific state stored in `session.state` (Python) or `session.StateBag` (C#)
5. **Serialization**: Sessions can be serialized/deserialized for resumption

**Key fact from documentation:**
> "Context providers receive the current session, so they can load and store data scoped to a specific conversation."

### Transitions and Resumption

From service conversation ID (continuing existing conversations):
```csharp
// C# - ChatClientAgent
AgentSession session = await chatClientAgent.CreateSessionAsync(conversationId);

// C# - A2AAgent
AgentSession session = await a2aAgent.CreateSessionAsync(contextId, taskId);
```

```python
# Python - Resume from service session ID
session = agent.get_session(service_session_id="<service-conversation-id>")
response = await agent.run("Continue this conversation.", session=session)
```

**Important constraint from documentation:**
> "Sessions are agent/service-specific. Reusing a session with a different agent configuration or provider can lead to invalid context."

## Error Handling and Recovery

### Function Calling Middleware: Error Interception

Function calling middleware can terminate the loop on errors:

```csharp
async ValueTask<object?> ErrorHandlingMiddleware(
    AIAgent agent,
    FunctionInvocationContext context,
    Func<FunctionInvocationContext, CancellationToken, ValueTask<object?>> next,
    CancellationToken cancellationToken)
{
    try
    {
        var result = await next(context, cancellationToken);
        return result;
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Tool failed: {context.Function.Name} - {ex.Message}");
        // Set to terminate further tool invocations
        context.Terminate = true;
        throw;  // Or suppress and continue
    }
}
```

### Pipeline-Level Error Handling

Agent middleware at the outermost layer can catch and handle all exceptions:

```csharp
async Task<AgentResponse> ResilientAgentMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    try
    {
        return await innerAgent.RunAsync(messages, session, options, cancellationToken);
    }
    catch (HttpRequestException ex) when (ex.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
    {
        // Implement backoff/retry logic
        await Task.Delay(5000);
        return await innerAgent.RunAsync(messages, session, options, cancellationToken);
    }
}
```

**Key design principle:**
> "Warning: Terminating the function call loop might result in your chat history being left in an inconsistent state, for example, containing function call content with no function result content. This might result in the chat history being unusable for further runs."

---

## Lifecycle Hooks: Agent Middleware

Agent Framework provides **three categories of middleware** that serve as lifecycle hooks:

### 1. Agent Run Middleware

**When it fires:** Before/after entire agent execution (before context providers, after response finalized)

**What you can do:** 
- Inspect/modify user input messages
- Validate session state
- Transform final responses
- Implement rate limiting or auth checks
- Audit all agent invocations

**C# signature:**
```csharp
async Task<AgentResponse> AgentRunMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    // Pre-execution: inspect input
    var messageCount = messages.Count();
    Console.WriteLine($"Agent run with {messageCount} messages");
    
    // Invoke the agent
    var response = await innerAgent.RunAsync(messages, session, options, cancellationToken);
    
    // Post-execution: inspect/modify output
    Console.WriteLine($"Agent returned {response.Messages.Count} messages");
    return response;
}
```

**Registration (C#):**
```csharp
var agent = originalAgent
    .AsBuilder()
    .Use(runFunc: AgentRunMiddleware, runStreamingFunc: StreamingAgentRunMiddleware)
    .Build();
```

**Registration (Python):**
```python
from agent_framework import Agent

agent = Agent(
    client=my_client,
    instructions="You are helpful.",
    middleware=[my_agent_middleware_func],
)
```

### 2. Function Calling Middleware

**When it fires:** Before/after each tool call within the function invocation loop

**What you can do:**
- Audit tool usage by name, input, or parameters
- Block specific tools or validate inputs
- Modify tool results or inject additional context
- Terminate the tool calling loop
- Measure execution time per tool

**C# signature:**
```csharp
async ValueTask<object?> FunctionCallingMiddleware(
    AIAgent agent,
    FunctionInvocationContext context,
    Func<FunctionInvocationContext, CancellationToken, ValueTask<object?>> next,
    CancellationToken cancellationToken)
{
    // Pre-execution
    Console.WriteLine($"Calling tool: {context.Function.Name}");
    
    // Execute the tool
    var result = await next(context, cancellationToken);
    
    // Post-execution
    Console.WriteLine($"Tool returned: {result}");
    
    // Can terminate further calls
    if (ShouldTerminate(context))
    {
        context.Terminate = true;
    }
    
    return result;
}
```

**Registration (C#):**
```csharp
var agent = originalAgent
    .AsBuilder()
    .Use(FunctionCallingMiddleware)
    .Build();
```

**Key detail from documentation:**
> "It is possible to terminate the function call loop with function calling middleware by setting the provided `FunctionInvocationContext.Terminate` to true. This will prevent the function calling loop from issuing a request to the inference service containing the function call results after function invocation."

### 3. Chat Client Middleware

**When it fires:** Before/after LLM inference (chat completion or response call)

**What you can do:**
- Inspect/modify message list before sending to LLM
- Modify model options (temperature, max tokens, etc.)
- Intercept LLM responses
- Implement response filtering or transformation
- Log all LLM invocations

**C# signature:**
```csharp
async Task<ChatResponse> ChatClientMiddleware(
    IEnumerable<ChatMessage> messages,
    ChatOptions? options,
    IChatClient innerChatClient,
    CancellationToken cancellationToken)
{
    // Pre-LLM: modify options
    if (options == null) options = new ChatOptions();
    options.Temperature = 0.5f;  // Force conservative responses
    
    // Call LLM
    var response = await innerChatClient.GetResponseAsync(
        messages, options, cancellationToken);
    
    // Post-LLM: filter response
    // ... validation logic ...
    
    return response;
}
```

**Registration (C#):**
```csharp
var chatClient = new OpenAIClient(apiKey)
    .GetChatClient("gpt-4o-mini")
    .AsBuilder()
    .Use(getResponseFunc: ChatClientMiddleware, getStreamingResponseFunc: null)
    .Build();

var agent = new ChatClientAgent(chatClient, instructions: "You are helpful.");
```

### Middleware Execution Order and Composition

**Middleware forms a chain:**
```
Original Agent/Client
    ↓ (wrapped by)
Middleware1
    ↓ (wraps)
Middleware2
    ↓ (wraps)
...Core Implementation

On execution, call flows:
Middleware1.Pre → Middleware2.Pre → Core → Middleware2.Post → Middleware1.Post
```

**Important design constraint from documentation:**
> "Ideally both `runFunc` and `runStreamingFunc` should be provided. When providing just the non-streaming middleware, the agent will use it for both streaming and non-streaming invocations. Streaming will only run in non-streaming mode to suffice the middleware expectations."

---

## Context Management

Context management determines **what information the agent can access** and **when that information is available**.

### What is Agent Context?

**From documentation:**
> "Context providers run before and after each agent invocation, proactively injecting relevant information into the context window and optionally extracting state from the response to be stored for future use. They give your agent memory, personalization, and access to external knowledge."

### Types of Context

#### 1. Conversation History

**Managed by:** `ChatHistoryProvider` (C#) or `InMemoryHistoryProvider` (Python)

**Lifecycle:**
- **Load phase**: Provider loads previous messages from storage
- **Append phase**: New user message added
- **Execute phase**: All messages sent to LLM
- **Store phase**: New assistant/tool messages stored for next turn

```csharp
// C# - Built-in provider
var agent = new ChatClientAgent(
    chatClient, 
    new ChatClientAgentOptions
    {
        ChatHistoryProvider = new InMemoryChatHistoryProvider(),
    });
```

```python
# Python - Built-in provider
agent = Agent(
    client=my_client,
    context_providers=[
        InMemoryHistoryProvider(),  # Or your custom provider
    ],
)
```

#### 2. Custom Context (Memories, User Data, Dynamic Instructions)

**Managed by:** `AIContextProvider` (C#) or custom `ContextProvider` (Python)

**Two-phase lifecycle (per invocation):**

1. **Before hook** - `ProvideAIContextAsync()` (C#) or `get_context()` (Python)
   - Load user preferences from database
   - Query RAG system for relevant documents
   - Retrieve long-term memories
   - Inject dynamic instructions based on session state

2. **After hook** - `StoreAIContextAsync()` (C#) or `after_run()` (Python)
   - Extract new memories from conversation
   - Update user profile based on learned facts
   - Store tool usage patterns
   - Log interactions for audit

**Context provider interface (C#):**
```csharp
public abstract class AIContextProvider
{
    // Called before each agent invocation
    public virtual async Task<AIContextProviderResult> ProvideAIContextAsync(
        AIAgent agent,
        AgentSession session)
    {
        var result = new AIContextProviderResult();
        
        // Inject additional messages
        result.Messages = [
            new ChatMessage(ChatRole.User, "Additional context here")
        ];
        
        // Inject system instructions
        result.Instructions = "Remember this: [fact]";
        
        // Inject tools
        result.Functions = [myToolDefinition];
        
        return result;
    }
    
    // Called after agent invocation with new messages
    public virtual async Task StoreAIContextAsync(
        AIAgent agent,
        AgentSession session,
        IReadOnlyList<ChatMessage> newMessages)
    {
        // Extract and store any relevant data from responses
        // Update long-term memory, user profile, etc.
    }
}
```

**Context provider interface (Python):**
```python
from agent_framework import ContextProvider

class UserMemoryProvider(ContextProvider):
    async def get_context(self, session: AgentSession, **kwargs):
        # Load user data, inject instructions
        return {
            "messages": [SystemMessage("User context here")],
            "instructions": "Personalization instructions",
        }
    
    async def after_run(self, response: AgentResponse, session: AgentSession, **kwargs):
        # Extract memories from response and store
        pass
```

**Registration (C#):**
```csharp
var agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        AIContextProviders = [
            new UserMemoryProvider(),
            new RAGProvider(),
            new DynamicInstructionsProvider(),
        ],
    });
```

**Registration (Python):**
```python
agent = Agent(
    client=my_client,
    context_providers=[
        InMemoryHistoryProvider(),
        UserMemoryProvider(),
        RAGProvider(),
    ],
)
```

### Context Window Management

**Critical constraint from documentation:**
> "Every piece of context you inject consumes tokens from the model's context window. History grows with each turn. RAG results add document chunks. User profiles add metadata. If the total exceeds the model's limit, the oldest or least relevant information gets truncated — potentially losing important context."

**Context window lifecycle:**
1. **Initialization**: Model's max token window is fixed (e.g., 128K for GPT-4o)
2. **Assembly**: Each provider adds messages, tools, instructions sequentially
3. **Calculation**: Total tokens counted (messages + context + tools + response budget)
4. **Truncation**: If over limit, oldest messages or lower-priority context trimmed
5. **LLM Call**: Remaining messages sent to model

**Compaction strategy** (from documentation) addresses this:
> "Compaction strategies summarize or trim older history to stay within token limits while preserving key information."

### Context Lifecycle and Persistence

**Per-invocation context lifecycle:**
```
1. Session created or resumed
   ↓
2. User input provided
   ↓
3. [BEFORE PHASE]
   ├─→ ChatHistoryProvider.LoadAsync() - Get previous messages
   ├─→ AIContextProvider1.ProvideAIContextAsync() - Get context
   └─→ AIContextProvider2.ProvideAIContextAsync() - Get context
   ↓
4. Merge all inputs into single message list
   ↓
5. LLM Inference + Function Calling
   ↓
6. [AFTER PHASE]
   ├─→ ChatHistoryProvider.SaveAsync() - Store all messages
   └─→ AIContextProvider1.StoreAIContextAsync(newMessages)
       AIContextProvider2.StoreAIContextAsync(newMessages)
   ↓
7. Return response
   ↓
8. Session state persists until next invocation
```

**State persistence patterns (Python):**
```python
# Session state is mutable and shared with providers
session.state["user_id"] = "alice"
session.state["conversation_phase"] = "problem_gathering"

# Providers can read and modify session state
class MyProvider(ContextProvider):
    async def get_context(self, session: AgentSession, **kwargs):
        user_id = session.state.get("user_id")
        # Load user-specific context
        
    async def after_run(self, response: AgentResponse, session: AgentSession, **kwargs):
        session.state["last_tool_used"] = "calculator"  # Persist for next turn
```

---

## Code Examples

### Python: Complete Agent with Lifecycle Hooks and Context

```python
import asyncio
from agent_framework import Agent, ContextProvider, AgentSession, InMemoryHistoryProvider
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential
from typing import Optional, Dict, Any


# Custom context provider for user memory
class UserMemoryProvider(ContextProvider):
    """Injects user-specific context into each agent invocation"""
    
    async def get_context(self, session: AgentSession, **kwargs):
        """Before hook: Load user data and inject into context"""
        user_id = session.state.get("user_id")
        
        if user_id:
            # Load user preferences from storage
            user_prefs = await self.load_user_preferences(user_id)
            
            # Inject personalized instructions
            return {
                "instructions": f"Remember: {user_prefs['name']} prefers {user_prefs['style']}.",
                "messages": [],  # Could add memory messages here
            }
        return {"messages": [], "instructions": ""}
    
    async def after_run(self, response: AgentResponse, session: AgentSession, **kwargs):
        """After hook: Extract and store memories from response"""
        # Extract facts mentioned in response
        # Update user profile
        session.state["last_interaction_date"] = datetime.now().isoformat()
    
    async def load_user_preferences(self, user_id: str) -> Dict[str, Any]:
        # Implementation would query actual storage
        return {
            "name": "Alice",
            "style": "concise and professional",
        }


# Agent middleware for logging and audit
async def audit_middleware(messages, session, options, inner_agent, cancellation_token):
    """Log all agent invocations for audit/compliance"""
    import logging
    logger = logging.getLogger(__name__)
    
    # Pre-execution logging
    logger.info(f"Agent run: session={session.session_id}, msg_count={len(messages)}")
    
    # Execute agent
    response = await inner_agent.run_async(messages, session, options, cancellation_token)
    
    # Post-execution logging
    logger.info(f"Agent response: msg_count={len(response.messages)}")
    return response


async def main():
    # Initialize client and agent
    credential = AzureCliCredential()
    client = FoundryChatClient(
        project_endpoint="https://your-foundry.services.ai.azure.com/api/projects/your-project",
        model="gpt-4o-mini",
        credential=credential,
    )
    
    # Create agent with context providers and middleware
    agent = Agent(
        client=client,
        name="PersonalizedAssistant",
        instructions="You are a helpful assistant that remembers user preferences.",
        context_providers=[
            InMemoryHistoryProvider(),
            UserMemoryProvider(),
        ],
        middleware=[audit_middleware],
    )
    
    # Create session - maintains state across turns
    session = agent.create_session()
    session.state["user_id"] = "alice123"
    
    # Multi-turn conversation using same session
    msg1 = await agent.run("My name is Alice.", session=session)
    print(f"Response 1: {msg1}")
    
    msg2 = await agent.run("What's my name?", session=session)
    print(f"Response 2: {msg2}")  # Agent recalls "Alice" from context


if __name__ == "__main__":
    asyncio.run(main())
```

### C#: Agent with Middleware Pipeline

```csharp
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Extensions.Logging;


// Custom context provider for RAG
public class RAGContextProvider : AIContextProvider
{
    private readonly ILogger<RAGContextProvider> _logger;
    
    public RAGContextProvider(ILogger<RAGContextProvider> logger)
    {
        _logger = logger;
    }
    
    public override async Task<AIContextProviderResult> ProvideAIContextAsync(
        AIAgent agent, AgentSession session)
    {
        // Load relevant documents from vector database
        var documents = await RetrieveRelevantDocuments(session);
        
        var result = new AIContextProviderResult();
        
        // Inject document context as system message
        result.Messages.Add(new ChatMessage(
            ChatRole.System,
            $"Relevant documents:\n{string.Join("\n", documents)}"));
        
        return result;
    }
    
    public override async Task StoreAIContextAsync(
        AIAgent agent, AgentSession session, 
        IReadOnlyList<ChatMessage> newMessages)
    {
        // Log interactions for RAG quality improvement
        _logger.LogInformation($"Stored {newMessages.Count} messages for session {session.StateBag["session_id"]}");
    }
    
    private async Task<List<string>> RetrieveRelevantDocuments(AgentSession session)
    {
        // Call vector database with query from latest message
        return new List<string> { "Retrieved document..." };
    }
}


// Agent run middleware for rate limiting
public static class RateLimitMiddleware
{
    private static readonly Dictionary<string, DateTime> LastCallTime = new();
    private const int MinIntervalSeconds = 2;
    
    public static async Task<AgentResponse> RateLimitRunAsync(
        IEnumerable<ChatMessage> messages,
        AgentSession? session,
        AgentRunOptions? options,
        AIAgent innerAgent,
        CancellationToken cancellationToken)
    {
        var sessionId = session?.StateBag["session_id"]?.ToString() ?? "anonymous";
        
        // Check rate limit
        if (LastCallTime.TryGetValue(sessionId, out var lastCall))
        {
            var elapsed = DateTime.UtcNow - lastCall;
            if (elapsed.TotalSeconds < MinIntervalSeconds)
            {
                await Task.Delay((int)((MinIntervalSeconds - elapsed.TotalSeconds) * 1000));
            }
        }
        
        LastCallTime[sessionId] = DateTime.UtcNow;
        
        // Invoke agent
        return await innerAgent.RunAsync(messages, session, options, cancellationToken);
    }
}


// Function calling middleware for tool auditing
public static class ToolAuditMiddleware
{
    public static async ValueTask<object?> AuditToolUseAsync(
        AIAgent agent,
        FunctionInvocationContext context,
        Func<FunctionInvocationContext, CancellationToken, ValueTask<object?>> next,
        CancellationToken cancellationToken)
    {
        Console.WriteLine($"[AUDIT] Tool called: {context.Function.Name}");
        
        // Log tool parameters
        foreach (var param in context.Function.Parameters)
        {
            Console.WriteLine($"  Param: {param.Name} = {context.Arguments[param.Name]}");
        }
        
        // Execute tool
        var result = await next(context, cancellationToken);
        
        Console.WriteLine($"[AUDIT] Tool result: {result}");
        return result;
    }
}


class Program
{
    static async Task Main(string[] args)
    {
        var loggerFactory = LoggerFactory.Create(builder => builder.AddConsole());
        var logger = loggerFactory.CreateLogger<RAGContextProvider>();
        
        var endpoint = new Uri("https://your-foundry.services.ai.azure.com/api/projects/your-project");
        var credential = new DefaultAzureCredential();
        
        // Create base agent
        AIAgent agent = new AIProjectClient(endpoint, credential)
            .AsAIAgent(
                model: "gpt-4o",
                instructions: "You are a helpful assistant with access to documents.");
        
        // Add context provider
        var ragProvider = new RAGContextProvider(logger);
        var agentWithContext = agent
            .AsBuilder()
            .UseAIContextProviders(ragProvider)
            .Build();
        
        // Add middleware pipeline
        var agentWithMiddleware = agentWithContext
            .AsBuilder()
            .Use(
                runFunc: RateLimitMiddleware.RateLimitRunAsync)
            .Use(ToolAuditMiddleware.AuditToolUseAsync)
            .Build();
        
        // Create session and run agent
        AgentSession session = await agentWithMiddleware.CreateSessionAsync();
        session.StateBag["session_id"] = Guid.NewGuid().ToString();
        
        var response = await agentWithMiddleware.RunAsync(
            "What are the key points from the documents?", session);
        
        Console.WriteLine(response);
    }
}
```

### Python: Streaming with Middleware

```python
async def stream_with_monitoring():
    """Demonstrate streaming response with function call monitoring"""
    
    # Function middleware tracks every tool call in real-time
    async def monitoring_middleware(agent, context, next_func, cancellation_token):
        print(f"→ Calling tool: {context.function.name}")
        
        result = await next_func(context, cancellation_token)
        
        print(f"← Tool result received")
        return result
    
    # Create agent
    agent = Agent(
        client=my_client,
        instructions="Use tools to solve the problem.",
        middleware=[monitoring_middleware],
    )
    
    session = agent.create_session()
    
    # Stream response
    async for update in agent.run_streaming("Analyze this data", session=session):
        print(f"Update: {update}")
        # Each update includes:
        # - text chunks as model generates
        # - tool call events (function called)
        # - tool result events (function returned)
```

---

## Cross-References and Related Topics

### In This Research Area
- **Agent Loop Architecture** (this document)
- Agent Provider Integration
- Tool/Function Calling Patterns
- Workflow Orchestration

### Related Research Areas
- **Context Enrichment**: RAG, memory management, compaction strategies
- **Observability**: OpenTelemetry integration, telemetry layers in pipeline
- **Durability & Persistence**: Durable entities, session serialization
- **Error Handling**: Recovery patterns, function termination

### External Resources
- GitHub: https://github.com/microsoft/agent-framework
- Documentation: https://learn.microsoft.com/agent-framework/
- Blog: https://devblogs.microsoft.com/agent-framework/

---

## Questions for Follow-Up Research

1. **Build 2026 Announcements**: What new lifecycle hooks or context management features were announced at Build 2026?
2. **Streaming Behavior**: How does streaming modify the context lifecycle? Are context providers notified incrementally?
3. **Distributed Execution**: How does the agent loop change when using A2A agent or durable task integration?
4. **Provider Composition**: What are best practices for composing multiple context providers when they depend on each other?
5. **Observability Integration**: How do OpenTelemetry spans map to the pipeline layers described here?

