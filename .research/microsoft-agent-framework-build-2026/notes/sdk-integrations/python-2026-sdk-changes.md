---
title: Python 2026 SDK Breaking Changes & Enhancements
source_url: https://learn.microsoft.com/agent-framework/support/upgrade/python-2026-significant-changes
source_title: Python 2026 Significant Changes Guide | Microsoft Agent Framework
source_date: 2026-06-18
area: sdk-integrations
type: upgrade-guide
dimensions:
  - python-sdk-changes
  - breaking-changes
  - github-copilot-sdk-v1
  - foundry-changes
  - checkpoint-security
extracted: 2026-06-18T00:00:00Z
quality: draft
---

## What

Comprehensive guide to breaking changes and enhancements in Microsoft Agent Framework Python releases from January 2026 through June 2026. Each change is marked as 🔴 **Breaking** (requires code changes) or 🟡 **Enhancement** (new capability, existing code continues to work).

## Python 1.8.0 (June 4, 2026)

### 🔴 Breaking: `github-copilot-sdk` upgraded to v1.0.0

**PR**: [#6292](https://github.com/microsoft/agent-framework/pull/6292)

Upgrades `agent-framework-github-copilot` from `github-copilot-sdk` 1.0.0b2 to stable **1.0.0** with major API changes.

#### Changes Required

**1. SubprocessConfig removed** — use `RuntimeConnection.for_stdio(path=...)`:

```python
# Before
from copilot import CopilotClient, SubprocessConfig
client = CopilotClient(SubprocessConfig(
    cli_path="/path/to/cli",
    log_level="debug",
    copilot_home="/custom/home"))

# After
from copilot import CopilotClient, RuntimeConnection
client = CopilotClient(
    connection=RuntimeConnection.for_stdio(path="/path/to/cli"),
    log_level="debug",
    base_directory="/custom/home")
```

**2. Import paths moved**:
- `copilot.generated.session_events` → `copilot.session_events`

**3. Settings renamed**:
- `copilot_home` → `base_directory`
- Environment var: `GITHUB_COPILOT_COPILOT_HOME` → `GITHUB_COPILOT_BASE_DIRECTORY`

**4. Permission handlers** — use concrete decision types:

```python
# Before
from copilot.generated.session_events import PermissionRequest
from copilot.session import PermissionRequestResult

def approve_shell(request: PermissionRequest, context: dict[str, str]) -> PermissionRequestResult:
    if request.kind == "shell":
        return PermissionRequestResult(kind="approved")
    return PermissionRequestResult(kind="denied-interactively-by-user")

# After
from copilot.session_events import PermissionRequest
from copilot.session import PermissionHandler, PermissionRequestResult
from copilot.generated.rpc import PermissionDecisionDeniedInteractivelyByUser, PermissionDecisionUserNotAvailable

def approve_shell(request: PermissionRequest, context: dict[str, str]) -> PermissionRequestResult:
    if request.kind == "shell":
        return PermissionHandler.approve_all(request, context)
    return PermissionDecisionUserNotAvailable()
```

**5. Default deny handler** — now returns `PermissionDecisionUserNotAvailable()` matching SDK fallback.

**6. Permission handler type** — supports both sync and async:
```python
Callable[..., PermissionRequestResult | Awaitable[PermissionRequestResult]]
```

### 🟡 Enhancement: Progressive tool exposure via `FunctionInvocationContext`

Tools can now be dynamically added or removed based on prior tool results within the same agent run.

### 🟡 Enhancement: MCP-based skills discovery (`McpSkillsSource`)

Adds `McpSkillsSource` to `agent-framework-core` for skill discovery and loading via MCP servers.

### 🟡 Enhancement: Bedrock native structured output support

`agent-framework-bedrock` implements structured output through AWS Bedrock Converse API.

### 🟡 Enhancement: Foundry Adaptive Evals integration

Adds rubric-generation to `agent-framework-foundry` for evaluation workflows.

### 🟡 New: Mistral AI embedding client package

New `agent-framework-mistral` package for Mistral AI embeddings.

### 🟡 Enhancement: `agent-framework-declarative` promoted to RC

Promoted from beta to release candidate stage.

## Python 1.7.0 (May 28, 2026)

### 🔴 Breaking: Declarative actions restructure

**PR**: [#6126](https://github.com/microsoft/agent-framework/pull/6126)

- Python-only declarative action types removed
- Action alias kinds renamed to match C# canonical names

**Action**: Update existing declarative YAML/JSON files to use canonical names.

### 🟡 Enhancement: `HarnessAgent` and background-agents harness provider

New `HarnessAgent` for harness-backed agent patterns (background processing).

### 🟡 Enhancement: `A2AAgentSession` with referenced task IDs

Added to both `agent-framework-a2a` and `agent-framework-core`.

### 🟡 Enhancement: Experimental prompt-agent conversion/deployment APIs

`agent-framework-foundry` now supports programmatic prompt definition conversion and deployment.

## Python 1.6.0 (May 21, 2026)

### 🔴 Breaking: Instrumentation enabled by default

**PR**: [#5865](https://github.com/microsoft/agent-framework/pull/5865)

Agent runs now emit OpenTelemetry telemetry spans automatically **without explicit opt-in**.

```python
# Before — had to explicitly enable
from agent_framework.observability import configure_otel_providers
configure_otel_providers(enable_console_exporters=True)
agent = Agent(client=client, enable_instrumentation=True)

# After — enabled automatically
agent = Agent(client=client)

# To disable explicitly:
agent = Agent(client=client, enable_instrumentation=False)
```

### 🟡 Enhancement: Shell tool with Docker support

Built-in shell tool now supports both local and Docker-based sandboxed execution.

### 🟡 New: `agent-framework-monty` CodeAct provider

New `agent-framework-monty` package for Monty-backed CodeAct integrations (alpha).

## Python 1.4.0 (May 14, 2026)

### 🔴 Breaking: Experimental Skills API — file discovery

**PR**: [#5807](https://github.com/microsoft/agent-framework/pull/5807)

Skill folder resolution logic changed to align with `agentskills.io` specification. Update custom skill directory layouts if using experimental skills API.

### 🔴 Breaking: Skills API metadata extraction

**PR**: [#5775](https://github.com/microsoft/agent-framework/pull/5775)

Skill metadata moved to `SkillFrontmatter` dataclass. Update references to use `SkillFrontmatter` attributes instead of direct field access.

### 🔴 Breaking: DevUI tightened access controls

**PR**: [#5740](https://github.com/microsoft/agent-framework/pull/5740)

Default CORS origins now more restrictive. Explicitly configure allowed origins if relying on cross-origin access.

### 🔴 Breaking: A2A migrated to a2a-sdk v1.0

**PR**: [#5752](https://github.com/microsoft/agent-framework/pull/5752)

A2A protocol types and transport APIs follow `a2a-sdk 1.0` conventions. Update code that directly interacts with A2A types.

### 🟡 Enhancement: AG-UI tool result display & RC promotion

Added tool result display channel and promoted to release candidate.

## Python 1.3.0 (May 7, 2026)

### 🔴 Breaking: Skills API multi-source restructure

**PR**: [#5584](https://github.com/microsoft/agent-framework/pull/5584)

Experimental skills API restructured to support multi-source loading. Review new multi-source loading conventions.

### 🟡 Enhancement: `ClassSkill` for class-based skills

New `ClassSkill` for class-based skill definitions with automatic method discovery.

### 🟡 Enhancement: Information-flow control prompt injection defense

New information-flow control mechanism in `agent-framework-core`.

### 🟡 Enhancement: `github-copilot-sdk` upgraded to 1.0.0b2

**PR**: [#5665](https://github.com/microsoft/agent-framework/pull/5665)

Adds `instruction_directories`, `copilot_home` configuration, and runtime options forwarding.

### 🟡 Enhancement: `approval_mode` enforcement

`agent-framework-claude` and `agent-framework-github-copilot` now enforce `approval_mode` decorator.

### 🟡 Enhancement: OpenAI & Gemini `allowed_tools` support

`agent-framework-openai` supports constrained tool choice.

## Python 1.2.2 (April 29, 2026)

### 🔴 Breaking: Orchestration outputs standardized as `AgentResponse`

**PR**: [#5301](https://github.com/microsoft/agent-framework/pull/5301)

`Workflow.as_agent()` now returns final answer only as `AgentResponse`.

```python
# Before — mixed types
result = await workflow.as_agent().run("Draft a report")
text = str(result)

# After — consistent AgentResponse
result = await workflow.as_agent().run("Draft a report")
text = result.text
```

### 🟡 New: Azure AI Content Understanding context provider

Alpha package `agent-framework-azure-contentunderstanding` auto-analyzes file attachments.

### 🟡 Enhancement: Hosted Durable Workflow support

`agent-framework-foundry-hosting` now supports hosted Durable Workflows.

## Python 1.1.0 (April 21, 2026)

### 🔴 Breaking: `CosmosCheckpointStorage` restricted pickle deserialization

**PR**: [#5200](https://github.com/microsoft/agent-framework/issues/5200)

Now uses restricted pickle deserialization by default. Pass custom types via `allowed_checkpoint_types`:

```python
# Before
from agent_framework.azure.cosmos import CosmosCheckpointStorage
storage = CosmosCheckpointStorage(endpoint=endpoint, database="mydb", container="checkpoints")

# After
storage = CosmosCheckpointStorage(
    endpoint=endpoint,
    database="mydb",
    container="checkpoints",
    allowed_checkpoint_types=["my_app.models:MyState"],
)
```

### 🟡 New: `GeminiChatClient`

New `agent-framework-gemini` package with Google Gemini API and Vertex AI support.

### 🟡 New: Hyperlight CodeAct package

New `agent-framework-hyperlight` package for Hyperlight-based sandboxed execution.

### 🟡 Enhancement: Foundry Toolboxes support

`agent-framework-foundry` adds Foundry Toolboxes support.

### 🟡 Enhancement: `finish_reason` on responses

`AgentResponse` and `AgentResponseUpdate` now include `finish_reason`.

### 🟡 Enhancement: Hosted agent V2 support

`agent-framework-foundry` adds hosted agent V2 support.

## Python 1.0.1 (April 9, 2026)

### 🔴 Breaking: `FileCheckpointStorage` restricted pickle deserialization

**PR**: [#4941](https://github.com/microsoft/agent-framework/pull/4941)

Security hardening — restricted unpickler only permits safe types and `agent_framework` types:

```python
# Before
storage = FileCheckpointStorage(directory="./checkpoints")

# After
storage = FileCheckpointStorage(
    directory="./checkpoints",
    allowed_checkpoint_types=["my_app.models:MyState", "my_app.models:TaskResult"],
)
```

### 🔴 Breaking: Handoff workflow context management fix

**PR**: [#5136](https://github.com/microsoft/agent-framework/pull/5136)

Handoff agents now correctly maintain isolated context across transitions (behavioral change).

### 🟡 New: Cosmos DB checkpoint storage

New `agent-framework-azure-cosmos` package for Cosmos DB NoSQL-backed checkpoint storage.

## Python 1.0.0 (April 2, 2026)

### 🔴 Breaking: `Message(..., text=...)` construction fully removed

**PR**: [#5062](https://github.com/microsoft/agent-framework/pull/5062)

All framework code paths removed:

```python
# Before
message = Message(role="assistant", text="Hello")

# After
message = Message(role="assistant", contents=["Hello"])
```

### 🔴 Breaking: Foundry owns Python embeddings

**PR**: [#5056](https://github.com/microsoft/agent-framework/pull/5056)

`agent-framework-azure-ai` removed. Move to `agent_framework.foundry`:

```python
# Before
from agent_framework.azure import AzureAIInferenceEmbeddingClient
client = AzureAIInferenceEmbeddingClient(endpoint=..., model=..., credential=...)

# After
from agent_framework.foundry import FoundryEmbeddingClient
client = FoundryEmbeddingClient(
    endpoint=os.environ["FOUNDRY_MODELS_ENDPOINT"],
    api_key=os.environ["FOUNDRY_MODELS_API_KEY"],
    model=os.environ["FOUNDRY_EMBEDDING_MODEL"],
)
```

### 🟡 Enhancement: Released packages no longer require `--pre`

Main packages (`agent-framework`, `agent-framework-core`, `agent-framework-openai`, `agent-framework-foundry`) are now GA. Beta connectors still require `--pre`.

## Links

- [GitHub Copilot SDK v1.0.0 Release Notes](https://github.com/github/copilot-sdk/releases/tag/v1.0.0)
- [Agent Framework Release Notes](https://github.com/microsoft/agent-framework/releases)
- [Python Upgrade Guides](https://learn.microsoft.com/agent-framework/support/upgrade)

## Questions & Follow-ups

- How should migration from `SubprocessConfig` be handled for CLI path discovery?
- Are there performance implications of default instrumentation?
- What is the rollback strategy for code using deprecated checkpoint types?
- How do checkpoint migrations work across versions?
