---
title: "Session Persistence and Memory Management"
source_url: "https://learn.microsoft.com/en-us/agent-framework/agents/conversations"
source_title: "Microsoft Learn - Conversations & Memory Overview"
source_date: "2026-06-18"
area: "advanced-features"
type: "state-management"
dimensions:
  - "session-persistence"
  - "conversation-history"
  - "memory-management"
  - "state-recovery"
extracted: "2026-06-18"
quality: "draft"
---

# Session Persistence and Memory Management

## Overview

`AgentSession` provides **conversation context persistence** between agent invocations, enabling multi-turn conversations with state management. Sessions can be serialized, stored, and restored to maintain conversation history and context across time and service boundaries.

## Core Concepts

### AgentSession

The fundamental state container for agent conversations:
- Maintains conversation history across multiple invocations
- Supports serialization for external persistence
- Can be rehydrated by service conversation ID or from serialized state
- Integrates with context providers for memory management

### Session Lifecycle

1. **Create**: Initialize a new session for a conversation
2. **Reuse**: Pass the session to each agent invocation
3. **Persist**: Serialize session state to external storage
4. **Restore**: Rehydrate from stored state for later resumption

## Python Implementation

### Creating and Reusing Sessions

```python
# Create a new session
session = agent.create_session()

# Reuse session across multiple invocations
first = await agent.run("My name is Alice.", session=session)
second = await agent.run("What is my name?", session=session)
# Agent remembers "Alice" from first invocation
```

### Session Serialization and Restoration

```python
# Persist session to external storage
serialized = session.to_dict()
# Save serialized dict to database, file, etc.

# Later: Restore from serialized state
from agent_framework import AgentSession
resumed = AgentSession.from_dict(serialized)
```

### Service-based Session Recovery

```python
# When agent provider maintains conversation server-side
# (e.g., Azure AI, OpenAI, Anthropic)
service_session = agent.get_session(
    service_session_id="<service-conversation-id>"
)
```

## .NET Implementation

### Creating and Reusing Sessions

```csharp
// Create and reuse a session
AgentSession session = await agent.CreateSessionAsync();

var first = await agent.RunAsync("My name is Alice.", session);
var second = await agent.RunAsync("What is my name?", session);
// Agent remembers "Alice" from first invocation
```

### Session Serialization and Restoration

```csharp
// Persist session state
var serialized = agent.SerializeSession(session);
// Save serialized data to database, blob storage, etc.

// Later: Restore from serialized state
AgentSession resumed = await agent.DeserializeSessionAsync(serialized);
```

## Memory Management Architecture

### Context Providers

Built-in and custom context/history provider patterns manage conversation memory:
- **Chat History**: Message history stored in session
- **Custom Context**: Domain-specific memory patterns
- **Knowledge Sources**: External knowledge graphs, vector stores
- **Semantic Memory**: Embeddings and similarity-based recall

### Context Compaction

Efficiently manage conversation growth as history accumulates:
- Summarization of older messages
- Sliding window techniques
- Token budget management for LLM context windows
- Pruning strategies for irrelevant history

### Storage Strategies

**Built-in storage modes:**
- In-memory session (development/testing)
- Service-side storage (Azure AI, OpenAI, Anthropic)
- Custom external storage (database, blob, cache)

**External persistence patterns:**
- Serialize to database (SQL, NoSQL)
- Store in blob storage (Azure Storage, S3)
- Cache in Redis or similar
- File-based persistence (development)

## Advanced Patterns

### Long-Running Conversations

Sessions maintain state across extended conversations with:
- Automatic history compaction
- Token budget management
- Memory retention policies
- Graceful degradation when context limits are approached

### Conversation Recovery

Restore conversation state after failure or disconnect:
```python
# Check for interrupted conversations
recent_sessions = await agent.get_recent_sessions()
for session_id in recent_sessions:
    session = await agent.get_session(session_id)
    # Resume from checkpoint
```

### Multi-Session Management

Manage multiple concurrent conversations:
```python
# Create separate sessions per conversation
sessions = {}
user_id = "user-123"
sessions[user_id] = agent.create_session()

# Invoke with appropriate session
result = await agent.run(user_message, session=sessions[user_id])
```

## Use Cases

**Session persistence enables:**
- Multi-turn conversational agents
- Context preservation across user sessions
- Long-running background agents
- Conversation recovery after failures
- Audit trails and conversation logging
- User-specific personalization and memory

## Framework Integration

### With Workflows

Sessions work within workflow executors:
- Each executor can access session context
- Message history available for decision-making
- Context providers fed to agents within workflows

### With Context Providers

Context providers enrich session state:
- Retrieve relevant historical context
- Inject domain knowledge
- Manage memory growth
- Support semantic search over history

### With Storage Backends

Flexible storage architecture:
- Service-native (Azure AI, OpenAI)
- Custom implementations
- Multi-tier caching strategies

## Limitations and Constraints

- **Token context limits**: LLM context windows constrain how much history can be passed
- **Serialization format**: Service-specific session formats may not be portable
- **Consistency**: Distributed sessions require careful synchronization
- **Storage costs**: Long conversation histories increase storage overhead

## Questions for Further Research

1. What are the recommended compaction strategies for 100+ turn conversations?
2. How do context providers handle semantic memory without vector databases?
3. What's the performance impact of deserializing large sessions?
4. How are concurrent modifications to a session handled?

## Related Concepts

- **Conversations & Memory**: Storage and context management
- **Human-in-the-Loop**: Checkpoint integration with request/response
- **Workflows**: Checkpoint mechanism for durability
- **Observability**: Tracing session state changes

## References

- Learn: [Conversations & Memory Overview](https://learn.microsoft.com/en-us/agent-framework/agents/conversations)
- Learn: [Context Providers](https://learn.microsoft.com/en-us/agent-framework/agents/context-providers)
- Learn: [Context Compaction](https://learn.microsoft.com/en-us/agent-framework/agents/compaction)
- Learn: [Storage](https://learn.microsoft.com/en-us/agent-framework/agents/storage)
- GitHub: [Session samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/02-agents)
