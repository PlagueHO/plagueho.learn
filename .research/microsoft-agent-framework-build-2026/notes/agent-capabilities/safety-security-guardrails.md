---
title: Safety, Security & Guardrails Design
source_url: https://learn.microsoft.com/agent-framework/agents/safety
source_title: Agent Safety - Agent Framework
source_date: 2025-06-18
area: agent-capabilities
type: concept
dimensions:
  - permissions_and_safety
  - security_guardrails
  - threat_model
  - best_practices
  - code_examples
extracted: 2026-06-18
quality: draft
---

## Safety Philosophy

Building secure AI agents is a **shared responsibility** between Agent Framework and application developers:

- **Agent Framework provides** — Abstractions, providers, orchestration patterns
- **Developers provide** — Input validation, data flow security, tool configuration

Agent Framework provides building blocks; developers must implement guardrails for their specific scenarios.

## Trust Boundaries

Data flows through several components when an agent runs. Each boundary represents a potential attack surface:

```
User Input
    ↓
Chat History Storage (providers may load/persist via external storage)
    ↓
Context Providers (may retrieve from external services: memories, RAG, user profiles)
    ↓
LLM Service (external endpoint receiving chat messages, returning output)
    ↓
Function Tools (execute developer code, call external APIs/databases)
    ↓
Agent Output
```

**Key trust boundaries:**

1. **AI Service Boundary** — Receives chat messages (potentially including PII and system instructions), returns LLM-generated output
2. **Chat History Storage** — External storage may persist sensitive conversation data
3. **Context Services** — Context providers may retrieve compromised data from external systems
4. **Tool-Accessed Services** — Function tools execute developer code that may call untrusted APIs

**Critical principle:** All external service communication is handled by developer-chosen SDKs. Agent Framework does NOT manage authentication, encryption, or connection details.

## Best Practices

### 1. Validate Function Inputs

The AI can call any function you provide and choose the arguments. **Treat LLM-provided arguments as untrusted input**, similar to user input in a web API.

**Use allow-listing:**
```python
@tool
def read_file(filepath: Annotated[str, "Path to file"]) -> str:
    """Read a file with validation."""
    import os
    
    # Allow-list approach: verify path is within safe directory
    allowed_dir = "/safe/data"
    full_path = os.path.abspath(filepath)
    
    if not full_path.startswith(allowed_dir):
        raise ValueError(f"Access denied: {filepath} is outside allowed directory")
    
    with open(full_path) as f:
        return f.read()
```

**Enforce type and range constraints:**
```csharp
// Validate argument types and ranges
static string ProcessRecords(int count, string batchId)
{
    // Range validation
    if (count < 1 || count > 1000)
        throw new ArgumentException("Count must be between 1 and 1000");
    
    // Pattern validation
    if (!Guid.TryParse(batchId, out _))
        throw new ArgumentException("Invalid batch ID format");
    
    // Safe to process
    return $"Processed {count} records from batch {batchId}";
}
```

**Limit string lengths:**
```python
@tool
def process_message(message: Annotated[str, "User message"]) -> str:
    """Process message with length validation."""
    max_length = 10000
    if len(message) > max_length:
        raise ValueError(f"Message exceeds {max_length} character limit")
    return f"Processed: {message[:100]}..."
```

**Prevent path traversal:**
```python
import os
from pathlib import Path

@tool
def read_document(filename: Annotated[str, "Document filename"]) -> str:
    """Safely read document with path traversal protection."""
    # Resolve to absolute path
    base_dir = Path("/documents")
    target = (base_dir / filename).resolve()
    
    # Verify target is within base directory
    if not str(target).startswith(str(base_dir)):
        raise ValueError("Path traversal not allowed")
    
    return target.read_text()
```

**Use parameterized queries:**
```python
import sqlite3

@tool
def query_database(user_id: Annotated[str, "User ID"]) -> str:
    """Query database safely with parameterized query."""
    conn = sqlite3.connect("app.db")
    cursor = conn.cursor()
    
    # SAFE: Parameterized query
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    
    # UNSAFE: String concatenation (DO NOT USE)
    # cursor.execute(f"SELECT * FROM users WHERE id = {user_id}")
    
    return str(cursor.fetchall())
```

### 2. Require Approval for High-Risk Tools

Use the [Tool Approval](tool-approval-permissions-gating.md) mechanism to gate high-risk operations behind human confirmation.

**Approval criteria:**

| Risk Factor | Action |
|---|---|
| **Side effects** | Tools that modify data, send communications, make purchases require approval |
| **Data sensitivity** | Tools accessing PII, financial data, credentials require approval |
| **Reversibility** | Irreversible operations (deletion, external sends) require approval |
| **Scope of impact** | Bulk operations or broad-impact tools require approval |

```python
from agent_framework import tool

@tool(approval_mode="always_require")
def delete_records(record_ids: list[str]) -> str:
    """Delete records (requires approval for each invocation)."""
    # Cannot proceed without approval
    return f"Deleted {len(record_ids)} records"

@tool(approval_mode="never_require")
def list_records() -> str:
    """List records (read-only, automatic)."""
    return "Record 1, Record 2, Record 3"
```

### 3. Keep System Messages Developer-Controlled

Chat message roles determine how the AI service interprets them:

| Role | Trust Level | Guidance |
|---|---|---|
| `system` | **Highest** — Directly shapes LLM behavior | Must NEVER contain untrusted input |
| `user` | **Untrusted** — May contain prompt injection attempts | Be careful with dynamic content |
| `assistant` | **Untrusted** — Generated by external LLM service | Validate before using in security contexts |
| `tool` | **Untrusted** — May contain data from external systems | Sanitize before trusting |

**Anti-pattern:**
```python
# UNSAFE: Never put user input in system role
user_input = get_user_input()
system_message = f"You are a {user_input} assistant"  # INJECTION RISK
agent = Agent(
    client=client,
    instructions=system_message,  # User controls agent behavior!
)
```

**Safe pattern:**
```python
# SAFE: Keep system message developer-controlled
agent = Agent(
    client=client,
    instructions="You are a helpful assistant.",  # Fixed by developer
    tools=[tool1, tool2],  # Only tools vary based on user context
)
```

### 4. Vet Extension Providers

Context providers and history providers can inject messages with any role, including `system`. **Only attach providers you trust.**

**Indirect prompt injection risk:**
```
Developer trusts Provider A
    ↓
Provider A queries RAG system
    ↓
RAG documents are compromised
    ↓
Attacker embeds hidden instructions in retrieved document
    ↓
Instructions injected into agent context
    ↓
Agent behavior changes unexpectedly
```

**Mitigation:**
- Review provider source code before using
- Validate that external data sources are protected
- Monitor for unusual agent behavior patterns
- Use FIDES for deterministic defense against prompt injection (see [Agent Security with FIDES](https://learn.microsoft.com/agent-framework/agents/security))

### 5. Validate and Sanitize LLM Output

LLM responses are untrusted output from an external service.

**Threats:**
- **Hallucination** — LLMs generate plausible but false information
- **Indirect injection** — Compromised retrieved data influences LLM output
- **Malicious payloads** — LLM output may contain harmful content if rendered/executed

```python
import re
import html

def sanitize_output(lm_output: str) -> str:
    """Sanitize LLM output before rendering."""
    # Remove HTML/script tags if rendering in HTML
    sanitized = html.escape(lm_output)
    
    # Check for suspicious patterns
    if re.search(r'<script|javascript:|onclick', lm_output):
        return "[Suspicious content detected - output blocked]"
    
    return sanitized

def validate_database_output(output: str) -> bool:
    """Validate output before using in SQL/shell contexts."""
    # If output will be used in interpreted contexts, validate structure
    return output.isalnum() or output in ["valid", "options"]
```

### 6. Protect Sensitive Data in Logs

Agent Framework supports logging via [OpenTelemetry](../observability). Sensitive data is only logged when explicitly enabled.

**Logging levels:**
- **`Trace` level** — Full `ChatMessages` collection is logged (may include PII)
- **Telemetry `EnableSensitiveData`** — Full chat messages including function calls and results

**Never enable `Trace` or `EnableSensitiveData` in production.**

```python
import logging

# SAFE: Disable sensitive logging in production
if environment == "production":
    logging.getLogger("agent_framework").setLevel(logging.WARNING)
else:
    logging.getLogger("agent_framework").setLevel(logging.DEBUG)
```

```csharp
// SAFE: Only enable sensitive telemetry in development
var options = new AgentRunOptions
{
    EnableSensitiveData = environment == "development"
};
var response = await agent.RunAsync(message, session, options);
```

### 7. Secure Session Data

Sessions represent conversation context and can be serialized for persistence.

**Critical principle:** Restoring a session from an untrusted source is equivalent to accepting untrusted input.

```python
import json
from pathlib import Path
from cryptography.fernet import Fernet

def save_session_secure(session, filename: str, key: bytes):
    """Encrypt session before persisting."""
    cipher = Fernet(key)
    session_json = json.dumps(session_to_dict(session))
    encrypted = cipher.encrypt(session_json.encode())
    Path(filename).write_bytes(encrypted)

def load_session_secure(filename: str, key: bytes):
    """Decrypt session from storage."""
    cipher = Fernet(key)
    encrypted = Path(filename).read_bytes()
    session_json = cipher.decrypt(encrypted).decode()
    return session_from_dict(json.loads(session_json))
```

```csharp
// SAFE: Store sessions with access controls and encryption
using var credential = new DefaultAzureCredential();
var sessionStore = new EncryptedSessionStore(
    connectionString: "...",
    encryptionKey: await GetKeyFromKeyVault(credential)
);

AgentSession session = await sessionStore.LoadAsync(sessionId);
// Use session...
await sessionStore.SaveAsync(session);
```

### 8. Implement Resource Limits

Agent Framework does NOT impose constraints on input/output length or request rates. Developers must implement these.

```python
from functools import wraps
import time

def rate_limit(max_calls: int, time_window: int):
    """Rate limit decorator to prevent DoS."""
    def decorator(func):
        calls = []
        
        @wraps(func)
        async def wrapper(*args, **kwargs):
            now = time.time()
            # Remove old calls outside time window
            calls[:] = [c for c in calls if c > now - time_window]
            
            if len(calls) >= max_calls:
                raise RuntimeError(f"Rate limit exceeded: {max_calls} calls per {time_window}s")
            
            calls.append(now)
            return await func(*args, **kwargs)
        
        return wrapper
    return decorator

@rate_limit(max_calls=10, time_window=60)
async def query_expensive_api(query: str) -> str:
    """Limited to 10 calls per minute."""
    return await api.query(query)
```

```csharp
// Limit input and output
var chatOptions = new ChatOptions
{
    MaxInputTokens = 2000,     // Prevent context overflow
    MaxOutputTokens = 1000,    // Limit response length
};

var response = await agent.RunAsync(
    userMessage,
    session,
    new AgentRunOptions { ChatOptions = chatOptions }
);
```

## Threat Model

**Common attack vectors:**

| Threat | Example | Mitigation |
|---|---|---|
| **Prompt Injection** | `"Ignore instructions, do X"` embedded in user input | Use role-based message structure; keep system messages developer-controlled |
| **Data Exfiltration** | Tool returns sensitive data; malicious context provider surfaces it | Validate tool output; vet providers; use FIDES for deterministic control |
| **Indirect Injection** | Compromised RAG document contains hidden instructions | Validate external data sources; implement content moderation |
| **Path Traversal** | File tool receives `../../../etc/passwd` | Use allow-listing and absolute path resolution |
| **SQL Injection** | Tool concatenates user input into SQL query | Use parameterized queries |
| **DoS via Context Overflow** | Attacker sends huge message to exhaust tokens | Implement input length limits |
| **Tool Abuse** | Attacker loops tool calls to incur high costs | Implement rate limiting and approval gates |

## Foundry Guardrails

Microsoft Foundry provides additional safety guardrails:

```csharp
// Foundry guardrails cover:
// - Harmful content detection
// - Jailbreak attempts
// - XPIA (cross-prompt injection attacks)
// - Data loss prevention
// - Custom blocklists

// Guardrails operate at multiple intervention points:
// 1. User Input — Block malicious prompts
// 2. Tool Call (Preview) — Prevent injection attacks in tool invocation
// 3. Tool Response (Preview) — Validate tool responses for safety
// 4. Output — Content moderation before returning to user
```

See [Guardrails and Controls Overview](https://learn.microsoft.com/azure/foundry/guardrails/guardrails-overview) for Foundry-specific configuration.

## FIDES: Deterministic Defense

For label-based defense against prompt injection and data exfiltration, use [Agent Security with FIDES](https://learn.microsoft.com/agent-framework/agents/security).

FIDES provides **information-flow control middleware** that enforces policies before sensitive tools run, complementing heuristic best practices.

## Key Facts Extracted

1. **Shared Responsibility** — Framework provides patterns; developers implement guardrails for their scenarios
2. **Trust Boundaries** — Multiple data flow boundaries; each represents an attack surface
3. **Input Validation** — Treat LLM-provided arguments as untrusted; use allow-listing
4. **Tool Approval** — Gate high-risk operations behind human confirmation
5. **Message Roles** — System messages must be developer-controlled; never trust user input in system role
6. **Output Sanitization** — LLM output is untrusted; validate before rendering/executing
7. **Session Security** — Encrypted storage with access controls; treat restored sessions as untrusted input
8. **Resource Limits** — Implement input/output length limits and rate limiting
9. **Logging Caution** — Never enable Trace level or EnableSensitiveData in production
10. **Provider Vetting** — Context and history providers control message roles; only use trusted providers

## Common Vulnerabilities

| Pattern | Risk | Fix |
|---|---|---|
| `f"SELECT * FROM users WHERE id = {user_input}"` | SQL Injection | Use parameterized queries |
| `system_prompt = f"Act as: {user_input}"` | Prompt Injection | Keep system prompt developer-controlled |
| `eval(lm_output)` | Code Execution | Never execute LLM output |
| `Path("/files/" + user_input)` | Path Traversal | Resolve and verify path within safe directory |
| Logging at `Trace` level in prod | Information Disclosure | Use `WARNING` level; never log sensitive data |
| Unrestricted tool calls | Abuse/Cost Overruns | Implement rate limiting and approval gates |

## Links & References

- [Microsoft Learn: Agent Safety](https://learn.microsoft.com/agent-framework/agents/safety)
- [Agent Security with FIDES](https://learn.microsoft.com/agent-framework/agents/security)
- [Windows Agentic Security](https://learn.microsoft.com/windows/security/book/operating-system-agentic-security)
- [Foundry Guardrails](https://learn.microsoft.com/azure/foundry/guardrails/guardrails-overview)
- [OWASP: Prompt Injection](https://owasp.org/www-community/attacks/Prompt_Injection)
- [Cross-Prompt Injection Attacks (XPIA)](https://blogs.windows.com/windowsexperience/2025/05/19/securing-the-model-context-protocol-building-a-safer-agentic-future-on-windows/)
