---
title: Agent Framework GitHub Repository — Core Loop Implementation Patterns
source_url: https://github.com/microsoft/agent-framework
source_title: microsoft/agent-framework GitHub Repository
source_date: 2026-06-18
source_organization: Microsoft Open Source
area: agent-harness-core-loop
type: Code Examples & Repository Documentation
dimensions:
  - agent-loop-architecture
  - lifecycle-hooks
  - context-management
  - code-patterns
  - implementation-reference
extracted: 2026-06-18T00:00:00Z
quality: draft
extracted_by: research-deep-reader
---

## What This Repository Teaches About the Agent Loop

The Microsoft Agent Framework GitHub repository demonstrates the agent loop through **progressive sample patterns** organized in `python/samples/` and `dotnet/samples/` directories. Each sample tier progressively adds complexity and introduces core loop concepts.

### Repository Organization

```
agent-framework/
├── python/
│   ├── packages/               # Installable packages
│   │   ├── agent-framework    # Core agents + workflows
│   │   ├── integrations/      # Pre-built providers (RAG, memory, etc.)
│   │   └── lab/               # Experimental features
│   └── samples/
│       ├── 01-get-started/    # Hello world to hosting
│       ├── 02-agents/         # Tools, middleware, providers
│       ├── 03-workflows/      # Multi-agent patterns
│       ├── 04-hosting/        # A2A, Azure Functions, Durable
│       └── 05-end-to-end/     # Full applications
│
├── dotnet/
│   ├── src/                    # Source code
│   └── samples/
│       ├── 01-get-started/    # Progressive tutorial
│       ├── 02-agents/         # Agent concepts
│       │   ├── Agents/        # Basic + middleware
│       │   ├── AgentProviders/ # Different LLM providers
│       │   └── Agent_Step*.* # Numbered progression (Step 1→11)
│       ├── 03-workflows/      # Graph-based orchestration
│       ├── 04-hosting/        # Durable agents, A2A
│       └── 05-end-to-end/     # Complete demos
│
├── docs/
│   ├── decisions/              # ADRs (Architectural Decision Records)
│   ├── design/                 # Design documents
│   └── assets/                 # Diagrams, images
│
└── declarative-agents/         # YAML-based agent definitions
```

## Key Loop Concepts from Samples

### 1. Basic Agent Loop (Samples 01: Get Started)

**What it demonstrates:**
- Minimal agent creation
- Single invocation
- No session persistence
- No context providers

**Pattern:**
```python
# python/samples/01-get-started/01_hello_world.py
agent = Agent(client=client, instructions="...")
response = await agent.run(user_input)
```

**Key insight:** The agent loop at its simplest is just `input → LLM → output`. No state, no context, no middleware.

### 2. Tool Calling Loop (Samples 02-agents)

**What it demonstrates:**
- Function invocation loop
- Tool definition and registration
- Tool result injection
- Multiple LLM calls within single `run()`

**From documentation in samples:**
> The tool calling loop iterates: LLM generates tool calls → functions execute → results injected → LLM generates next response until no more tool calls.

**Pattern example (C#):**
```csharp
// From dotnet/samples/02-agents/Agents/Agent_Step02_Tools.cs
var tools = new List<string>
{
    "get_weather",
    "calculate"
};

var agent = new ChatClientAgent(
    chatClient,
    new ChatClientAgentOptions
    {
        ChatOptions = new ChatOptions
        {
            Tools = [GetWeatherTool(), CalculateTool()]
        }
    });

// Single run() call orchestrates entire tool loop
var response = await agent.RunAsync("What's the weather? Then calculate 2+2.");
```

### 3. Multi-Turn Sessions (Samples 02-agents)

**What it demonstrates:**
- Session creation and reuse
- State bag for session-scoped data
- Conversation context persistence
- Multiple invocations with shared session

**Pattern (Python):**
```python
# python/samples/02-agents/00_chat.py
session = agent.create_session()

# Multiple turns, same session
response1 = await agent.run("My name is Alice", session=session)
response2 = await agent.run("What's my name?", session=session)  # Remembers from session
```

### 4. Middleware Patterns (Samples 02-agents)

**What the samples show:**
- Agent-level middleware registration
- Function-level middleware
- Chat client middleware
- Middleware composition/chaining

**C# Middleware Example from samples:**
```csharp
// dotnet/samples/02-agents/Agents/Agent_Step11_Middleware.cs
var middlewareEnabledAgent = agent
    .AsBuilder()
    .Use(AgentMiddleware)
    .Use(FunctionCallingMiddleware)
    .Build();

async Task<AgentResponse> AgentMiddleware(
    IEnumerable<ChatMessage> messages,
    AgentSession? session,
    AgentRunOptions? options,
    AIAgent innerAgent,
    CancellationToken cancellationToken)
{
    // Log, validate, or modify messages
    var response = await innerAgent.RunAsync(messages, session, options, cancellationToken);
    // Process response
    return response;
}
```

### 5. Context Providers (Samples 02-agents)

**What the samples demonstrate:**
- Custom context provider implementation
- Memory/RAG injection before LLM
- State extraction after response
- Multiple providers composition

**Python Pattern from samples:**
```python
# python/samples/02-agents/03_memory.py or 04_rag.py
class UserMemoryProvider(ContextProvider):
    async def get_context(self, session: AgentSession, **kwargs):
        # Before: inject personalization
        return {
            "instructions": f"User prefers: {user_prefs}",
            "messages": []
        }
    
    async def after_run(self, response: AgentResponse, session: AgentSession, **kwargs):
        # After: extract and store facts
        await store_memories(extract_facts(response))

agent = Agent(
    client=client,
    context_providers=[
        InMemoryHistoryProvider(),
        UserMemoryProvider(),
        RAGProvider(),
    ]
)
```

### 6. Workflows (Samples 03: Multi-Agent Orchestration)

**What this demonstrates:**
- Sequential agent composition
- Handoff patterns
- Group collaboration
- Alternative to single agent loop

**From workflow samples:**
> "When the agent loop isn't enough, use workflows. Workflows give explicit control over multi-agent execution paths."

**Pattern (C#):**
```csharp
// dotnet/samples/03-workflows/
var workflow = new Workflow()
    .AddAgent(researchAgent, "Research")
    .AddAgent(writerAgent, "WriteContent")
    .AddTransition("Research", "WriteContent")
    .AddFinal("WriteContent");

var result = await workflow.RunAsync("Research and write about X");
```

## Architectural Insights from Repository

### 1. Provider-Based Extensibility

**Key pattern:** Context providers and middleware are the primary extension points, not agent subclassing.

```
Agent (sealed/final in many implementations)
  ↓
+ ContextProviders (list, ordered, composable)
+ Middleware (list, ordered, composable)
+ ChatClient (swappable)
```

**From repo structure:** Integration packages (Neo4j, Pinecone, OpenAI, etc.) all implement `ContextProvider` or `AIContextProvider`, not agent subclasses.

### 2. Session as Mutable State Container

**Key pattern:** `AgentSession.state` (Python) / `StateBag` (C#) is the **only** place to store per-conversation state.

```
session.state["user_id"] = "alice"
session.state["phase"] = "problem_gathering"

# Persists until:
# - Explicitly serialized
# - Session abandoned
# - Agent recreated
```

**From samples:** All multi-turn examples follow this pattern religiously. No alternative state management shown.

### 3. Execution Flow is Deterministic Within a Turn

**Key insight from samples:**
1. Context providers run in registration order
2. Middleware runs as nested wraps (pre-order traversal on way down, post-order on way up)
3. Tool calls execute serially (one at a time, awaited)
4. All operations are cancellation-token-aware

**Code evidence:**
```python
# python/samples/02-agents/00_chat.py
context_providers=[
    InMemoryHistoryProvider(),  # Runs first
    UserMemoryProvider(),         # Runs second, reads session
    RAGProvider(),               # Runs third, uses context from previous
]
```

### 4. Error Handling Requires Middleware

**Key pattern from samples:**
- No built-in retry on tool failure
- No built-in backoff on LLM error
- **You must** implement via middleware

```csharp
// From advanced samples
var resilientAgent = agent
    .AsBuilder()
    .Use(RetryMiddleware)  // You write this
    .Build();
```

## Code Example Progression

### Repository Example Levels

**Level 1: Hello World**
```python
# Just client and agent
agent = Agent(client=client, instructions="...")
await agent.run("Hello")
```

**Level 2: Tools**
```python
# Add tool definitions
agent = Agent(client=client, tools=[tool1, tool2])
# Agent automatically calls tools as needed
```

**Level 3: Sessions**
```python
# Add session for state
session = agent.create_session()
await agent.run(msg1, session=session)
await agent.run(msg2, session=session)  # Remembers msg1
```

**Level 4: Context Providers**
```python
# Add custom context injection
agent = Agent(
    client=client,
    context_providers=[CustomMemoryProvider()]
)
# Provider called before/after each run
```

**Level 5: Middleware**
```python
# Add execution hooks
agent = Agent(
    client=client,
    middleware=[logging_middleware]
)
# Middleware wraps entire execution
```

**Level 6: Workflows**
```python
# Multi-agent orchestration
workflow = Workflow()
workflow.add_agent(agent1)
workflow.add_agent(agent2)
# Explicit control over agent sequencing
```

## Key Files in Repository

### Design Documents
- `docs/decisions/0021-agent-skills-design.md` - Explains Skills concept
- `docs/decisions/` - ADRs covering major architectural decisions
- `docs/design/` - Design rationale documents

### Integration Examples
- `python/packages/integrations/` - Pre-built context providers
  - Neo4j memory provider
  - Pinecone RAG provider
  - Azure AI Search integration
  - etc.

### Hosting Patterns
- `python/samples/04-hosting/` - Deployment patterns
  - Azure Functions
  - Durable Task
  - A2A (Agent-to-Agent)
  - Foundry-hosted agents

## Constraints and Best Practices from Repository

### DO ✅
1. **Use sessions for multi-turn** - Every example does this consistently
2. **Register context providers in order** - Order matters, they compose
3. **Use middleware for cross-cutting concerns** - All non-business logic goes here
4. **Keep agent instructions simple** - Complex logic → middleware or context providers
5. **Always provide streaming support** - Both `run()` and `run_streaming()` shown

### DON'T ❌
1. **Don't subclass Agent** - Not a pattern in any sample
2. **Don't store session data outside session.state** - Will be lost on serialization
3. **Don't call run() without session if you need memory** - SessionID required for persistence
4. **Don't write complex logic in context providers** - Keep to context injection
5. **Don't ignore cancellation tokens** - All samples use them

## Integration Patterns Demonstrated

### Memory Providers
- In-memory (development)
- Neo4j (knowledge graph)
- Custom (database-backed)

### RAG Providers
- Azure AI Search
- Pinecone
- Custom implementations

### Chat Clients
- Azure OpenAI
- OpenAI
- Anthropic
- Ollama
- Generic provider interface

### Middleware Examples
- Logging and audit
- Rate limiting
- Caching
- Retry policies
- Input validation

---

## Questions Raised by Repository

1. **Breaking Changes on 1.0**: Repository has recent ADRs about `0.8.22` and obsoletions - what's the upgrade path?
2. **Observability Depth**: Samples show basic logging - where's the OpenTelemetry instrumentation details?
3. **Serialization Format**: How are sessions serialized for persistence? Any schema versioning?
4. **Determinism**: Are agent runs deterministic for the same session/input? (Not shown in samples)

