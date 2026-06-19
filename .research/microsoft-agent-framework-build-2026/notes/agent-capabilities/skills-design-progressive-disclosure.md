---
title: Agent Skills Design & Progressive Disclosure Pattern
source_url: https://learn.microsoft.com/agent-framework/agents/skills
source_title: Agent Skills - Agent Framework
source_date: 2025-06-18
area: agent-capabilities
type: concept
dimensions:
  - skills_and_tools
  - progressive_disclosure
  - skill_structure
  - code_examples
extracted: 2026-06-18
quality: draft
---

## What Are Agent Skills?

Agent Skills are portable packages of instructions, scripts, and resources that give agents specialized capabilities and domain expertise. Skills follow an open specification ([agentskills.io](https://agentskills.io/)) and implement a progressive disclosure pattern so agents load only the context they need, when they need it.

Skills are reusable across Agent Skills-compatible products and enable:

- **Package domain expertise** — Capture specialized knowledge (expense policies, legal workflows, data analysis pipelines) as reusable packages
- **Extend agent capabilities** — Give agents new abilities without changing core instructions
- **Ensure consistency** — Turn multi-step tasks into repeatable, auditable workflows
- **Enable interoperability** — Reuse the same skill across different Agent Skills-compatible products

## Skill Structure

A skill is a directory containing a `SKILL.md` file with optional subdirectories for resources:

```
expense-report/
├── SKILL.md                          # Required - frontmatter + instructions
├── scripts/
│   └── validate.py                   # Executable code agents can run
├── references/
│   └── POLICY_FAQ.md                 # Reference documents loaded on demand
└── assets/
    └── expense-report-template.md    # Templates and static resources
```

### SKILL.md Frontmatter Format

```yaml
---
name: expense-report
description: File and validate employee expense reports according to company policy. Use when asked about expense submissions, reimbursement rules, or spending limits.
license: Apache-2.0
compatibility: Requires python3
metadata:
  author: contoso-finance
  version: "2.1"
allowed-tools: read_file write_file send_email
---

# Skill Instructions
Step-by-step guidance, examples, common edge cases...
```

| Field | Required | Description |
|-------|----------|-------------|
| `name` | Yes | Max 64 chars, lowercase with hyphens, must match directory name |
| `description` | Yes | What the skill does and when to use it (max 1024 chars) |
| `license` | No | License name or reference to bundled license file |
| `compatibility` | No | Environment requirements (max 500 chars) |
| `metadata` | No | Arbitrary key-value mapping for additional data |
| `allowed-tools` | No | Space-delimited list of pre-approved tools (experimental) |

## Progressive Disclosure Pattern

Agent Skills use a **four-stage progressive disclosure pattern** to minimize context usage:

### Stage 1: Advertise (~100 tokens per skill)

Skill names and descriptions are injected into the system prompt at the start of each run, so the agent knows what skills are available without loading them all.

```yaml
# Agent system prompt excerpt
You have access to the following skills:
- expense-report: File and validate employee expense reports according to company policy
- travel-policy: Look up travel approval limits and booking procedures
- it-helpdesk: Resolve common IT issues and request support tickets
```

### Stage 2: Load (< 5000 tokens recommended)

When a task matches a skill's domain, the agent calls the `load_skill` tool to retrieve the full `SKILL.md` body with detailed instructions.

**Agent calls:** `load_skill("expense-report")`

**Agent receives:** Full skill instructions + references to available resources/scripts

### Stage 3: Read Resources (as needed)

The agent calls the `read_skill_resource` tool to fetch supplementary files (references, templates, assets) only when required.

**Agent calls:** `read_skill_resource("expense-report", "POLICY_FAQ.md")`

**Agent receives:** Detailed policy FAQ for edge case handling

### Stage 4: Run Scripts (as needed)

The agent calls the `run_skill_script` tool to execute scripts bundled with a skill.

**Agent calls:** `run_skill_script("expense-report", "validate.py", ["report.xlsx"])`

**Agent receives:** Validation results

## How This Pattern Works

With 10 registered skills:
- **Without progressive disclosure** — ~50,000 tokens of context upfront
- **With progressive disclosure** — ~1,000 tokens initial context + on-demand loading

This keeps the agent's context window lean while giving it access to deep domain knowledge on demand.

## Providing Skills to an Agent

### Python: File-Based Skills

```python
import os
from pathlib import Path
from agent_framework import Agent, SkillsProvider
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

# Discover skills from the 'skills' directory
skills_provider = SkillsProvider.from_paths(
    skill_paths=Path(__file__).parent / "skills",
)

# Create an agent with the skills provider
client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ.get("FOUNDRY_MODEL", "gpt-4o-mini"),
    credential=AzureCliCredential(),
)

agent = Agent(
    client=client,
    instructions="You are a helpful assistant.",
    context_providers=[skills_provider],
)
```

### .NET: File-Based Skills

```csharp
using Azure.AI.OpenAI;
using Azure.Identity;
using Microsoft.Agents.AI;
using OpenAI.Responses;

string endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!;
string deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") ?? "gpt-4o-mini";

// Discover skills from the 'skills' directory
var skillsProvider = new AgentSkillsProvider(
    Path.Combine(AppContext.BaseDirectory, "skills"));

// Create an agent with the skills provider
AIAgent agent = new AzureOpenAIClient(new Uri(endpoint), new DefaultAzureCredential())
    .GetResponsesClient()
    .AsAIAgent(new ChatClientAgentOptions
    {
        Name = "SkillsAgent",
        ChatOptions = new() { Instructions = "You are a helpful assistant." },
        AIContextProviders = [skillsProvider],
    },
    model: deploymentName);
```

### Multiple Skill Directories

```python
# Python: Search multiple directories
skills_provider = SkillsProvider.from_paths(
    skill_paths=[
        Path(__file__).parent / "company-skills",
        Path(__file__).parent / "team-skills",
    ]
)
```

```csharp
// C#: Search multiple directories
var skillsProvider = new AgentSkillsProvider([
    Path.Combine(AppContext.BaseDirectory, "company-skills"),
    Path.Combine(AppContext.BaseDirectory, "team-skills"),
]);
```

## Code-Defined Skills

You can define skills entirely in code when:

1. Skill content is generated dynamically (from database or environment)
2. You want to keep skill definitions alongside application code
3. You need resources that execute logic at read time
4. Skill definitions must be constructed at runtime (e.g., personalized per user)

### Python Inline Skills

```python
from pathlib import Path
from agent_framework import Agent, InlineSkill, InlineSkillResource
from agent_framework.foundry import FoundryChatClient

# Create an inline skill programmatically
code_style_skill = InlineSkill(
    frontmatter={
        "name": "code-style",
        "description": "Coding style guidelines for the team"
    },
    instructions="""
        Use this skill when answering questions about coding style.
        1. Read the style-guide resource
        2. Answer based on those rules, quoting relevant guidelines
    """
)

# Add static resource
code_style_skill.add_resource(
    "style-guide",
    """
    # Team Coding Style Guide
    - Use 4-space indentation (no tabs)
    - Maximum line length: 120 characters
    - Use type annotations on all public methods
    """
)

# Add dynamic resource
@code_style_skill.resource(name="project-standards")
def get_project_standards():
    """Fetch standards from database at runtime."""
    return "Project-specific standards loaded dynamically..."

# Add executable script
@code_style_skill.script
def check_style(file_path: str) -> str:
    """Check a file against style guidelines."""
    return f"Linting {file_path}..."

skills_provider = SkillsProvider([code_style_skill])
```

### C# Inline Skills

```csharp
using Microsoft.Agents.AI;

var codeStyleSkill = new AgentInlineSkill(
    name: "code-style",
    description: "Coding style guidelines for the team",
    instructions: """
        Use this skill when answering questions about coding style.
        1. Read the style-guide resource
        2. Answer based on those rules
    """
)
.AddResource(
    "style-guide",
    """
    # Team Coding Style Guide
    - Use 4-space indentation
    - Maximum line length: 120 characters
    - Use type annotations
    """
)
.AddResource(
    "project-standards",
    factory: (serviceProvider) =>
    {
        // Compute content at runtime
        return "Dynamic project standards...";
    }
)
.AddScript(
    "check-style",
    (filePath, serviceProvider) =>
    {
        // Execute script with DI-injected services
        return $"Linting {filePath}...";
    }
);

var skillsProvider = new AgentSkillsProvider(codeStyleSkill);
```

## Script Execution

File-based skills can include executable scripts that agents invoke via the `run_skill_script` tool.

### Python Script Runner

```python
from pathlib import Path
from agent_framework import FileSkill, FileSkillScript, SkillsProvider
import subprocess
import sys

def my_runner(
    skill: FileSkill,
    script: FileSkillScript,
    args: dict | list[str] | None = None,
) -> str:
    """Run a file-based script as a subprocess."""
    script_path = Path(script.full_path)
    cmd = [sys.executable, str(script_path)]
    if isinstance(args, list):
        cmd.extend(args)
    result = subprocess.run(
        cmd, capture_output=True, text=True, timeout=30, cwd=str(script_path.parent)
    )
    return result.stdout.strip()

skills_provider = SkillsProvider.from_paths(
    skill_paths=Path(__file__).parent / "skills",
    script_runner=my_runner,  # Pass script runner
)
```

### .NET Script Runner

```csharp
using System.Diagnostics;
using Microsoft.Agents.AI;

var skillsProvider = new AgentSkillsProvider(
    Path.Combine(AppContext.BaseDirectory, "skills"),
    SubprocessScriptRunner.RunAsync);  // Built-in subprocess runner

// For production, add:
// - Sandboxing (containers, isolated environments)
// - Resource limits (CPU, memory, timeout)
// - Input validation and allow-listing
// - Structured logging and audit trails
```

## Caching Behavior

By default, skill tools and instructions are cached after the first build. Disable for development:

**Python:**
```python
skills_provider = SkillsProvider.from_paths(
    skill_paths=Path(__file__).parent / "skills",
    disable_caching=True,  # Force rebuild on every invocation
)
```

**C#:**
```csharp
var skillsProvider = new AgentSkillsProvider(
    Path.Combine(AppContext.BaseDirectory, "skills"),
    options: new AgentSkillsProviderOptions
    {
        DisableCaching = true,  // Useful during development
    });
```

## Skill Composition

You can mix multiple skill sources in one provider:

```python
# Mix file-based, inline, and class-based skills
skills_provider = SkillsProvider.from_paths(
    skill_paths=Path(__file__).parent / "skills",  # File-based
)
skills_provider.add(inline_skill)  # Add inline skill
skills_provider.add(class_skill)   # Add class-based skill
```

## Security Best Practices

- **Review skills like dependencies** — Treat skills as third-party code
- **Validate skill scripts** — Scripts execute with agent permissions
- **Limit allowed resources** — Use allow-listing for executable scripts
- **Use sandboxing** — Run scripts in isolated environments
- **Audit skill actions** — Log all skill invocations and modifications

## Common Pitfalls

| Pitfall | Guidance |
|---------|----------|
| **Overly broad skills** | Keep skills focused on one domain; "everything-finance" is too broad |
| **Skipping security review** | Treat skills like third-party code; review before deploying |
| **Not using progressive disclosure** | Load all skill content upfront defeats the purpose |
| **Hardcoding secrets in skills** | Use environment variables or DI for sensitive values |

## Key Facts Extracted

1. **Progressive Disclosure** — Skills use 4-stage pattern (advertise, load, read resources, run scripts) to minimize context
2. **Standard Structure** — SKILL.md with frontmatter + optional scripts/ references/ assets/ subdirectories
3. **Multiple Sources** — Skills can be file-based, code-defined, or class-based in the same provider
4. **Dynamic Content** — Skills support runtime resource generation and dynamic skill construction
5. **Composition Pattern** — Agent Skills are interoperable across different products via agentskills.io spec
6. **Caching** — Framework caches skill content by default for performance; disable during development

## Links & References

- [Agent Skills Specification](https://agentskills.io/)
- [Microsoft Learn: Agent Skills](https://learn.microsoft.com/agent-framework/agents/skills)
- [Skills Design Decision](https://github.com/microsoft/agent-framework/blob/main/docs/decisions/0021-agent-skills-design.md)
- [Adding Skills Journey](https://learn.microsoft.com/agent-framework/journey/adding-skills)
