---
source_url: https://github.github.com/gh-aw/
source_title: GitHub Agentic Workflows — Official Overview
source_date: 2026-05-12
source_type: Official Documentation
area: concepts
dimensions:
  - definition
  - core_features
  - key_differences
  - use_cases
extracted: 2026-05-12
quality: draft
---

# GitHub Agentic Workflows — Definition & Core Concepts

## What Are Agentic Workflows?

**Definition**: GitHub Agentic Workflows enable repository automation using AI-powered agents (GitHub Copilot, Claude, or OpenAI Codex) that run directly in GitHub Actions. Workflows are written in Markdown with natural language instructions rather than complex YAML scripts.

**Key Quote**: "Repository automation, running the coding agents you know and love, in GitHub Actions, with strong guardrails and security-first design principles."

**Core Principle**: They augment existing, deterministic CI/CD pipelines with "Continuous AI"—systematic, automated application of AI to software collaboration tasks.

## Key Features

| Feature | Purpose |
|---------|---------|
| **Markdown Authoring** | Write automation in natural language instead of complex YAML scripts |
| **Multi-Engine Support** | Choose between GitHub Copilot (default), Claude by Anthropic, or OpenAI Codex |
| **Safe Outputs** | Write operations buffered, validated, and executed in separate jobs—agent never gets direct write access |
| **MCP Tool Integration** | Access GitHub operations, external APIs, and custom tools via Model Context Protocol |
| **Network Firewall** | Sandboxed execution with domain allowlists controlling agent egress |
| **Threat Detection** | AI-powered security analysis gates all write operations |

## How They Differ from Traditional Workflows

| Aspect | Traditional Workflows | Agentic Workflows |
|--------|----------------------|-------------------|
| **Authored in** | YAML with shell scripts | Markdown with natural language |
| **Decision-making** | Fixed if/then logic | AI understands context and adapts |
| **Write operations** | Direct API calls with tokens | Buffered through Safe Outputs with validation |
| **Maintenance** | Update scripts when requirements change | Edit natural language instructions |
| **Security model** | Token-based permissions | Layered: sandbox + firewall + safe outputs + threat detection |
| **Flexibility** | Handles predefined scenarios | Adapts to novel situations within guardrails |

## Security Architecture (Defense-in-Depth)

The platform implements **5 security layers**:

1. **Read-only tokens** — AI agent receives GitHub token scoped to read-only permissions; cannot make writes even if instructed
2. **Zero secrets in agent** — Agent process never receives write tokens, API keys, or credentials; secrets isolated in separate jobs
3. **Containerized with network firewall** — Agent runs in isolated container with Squid proxy enforcing explicit domain allowlist; outbound traffic blocked at kernel level
4. **Safe outputs with guardrails** — Agent produces structured artifacts describing intentions; separate jobs with scoped permissions execute only permitted operations
5. **Agentic threat detection** — Dedicated AI-powered threat detection job scans proposed changes for prompt injection, credential leaks, and malicious code patterns before execution

## Example Use Cases

- **Issue Triage**: Auto-label and comment on new issues
- **Daily Status Reports**: Generate upbeat team reports on repository activity
- **CI Failure Analysis**: Analyze failed workflows and create diagnostic issues
- **Code Review**: Automated PR review with specific feedback
- **Documentation Updates**: Maintain consistency and completeness
- **Continuous Improvement**: Daily code simplification and refactoring

## By the Numbers (Supported Capabilities)

- **4** supported AI engines (Copilot, Claude, Codex, custom)
- **5** security layers (read-only, zero secrets, firewall, safe outputs, threat detection)
- **18+** design patterns (IssueOps, ChatOps, DailyOps, BatchOps, etc.)
- **10+** supported GitHub event triggers (issues, PRs, push, schedule, discussion, label, etc.)
- **8+** safe output types (create-issue, create-PR, add-comment, add-label, dispatch-workflow, etc.)

## Installation & Getting Started

**Single command setup**: `gh extension install github/gh-aw`

Workflows live in `.github/workflows/` alongside traditional GitHub Actions, consisting of:
- `.md` file (human-editable source)
- `.lock.yml` file (compiled GitHub Actions YAML with security hardening)

## Key Distinctions from Other Automation

Agentic workflows add **context awareness** and **adaptive decision-making** beyond traditional automation. The agent can:
- Reason about repository state and user intent
- Make dynamic tool-calling decisions (which tools to use, when)
- Adapt to novel situations within configured guardrails
- Iterate through multi-step reasoning loops if needed
- All while operating under strict security constraints

---

## Questions Raised

- How does the threat detection specifically identify prompt injection attacks?
- What are the performance characteristics of nested tool calling?
- How do users debug agent decision-making when workflows behave unexpectedly?
