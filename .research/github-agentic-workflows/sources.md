# GitHub Agentic Workflows — Research Sources

**Source Discovery Session**: May 12, 2026  
**Topic Slug**: `github-agentic-workflows`  
**Total Sources Found**: 24  
**Focus Period**: 2025-2026 (Recent/Current)

---

## Research Area 1: Concepts & Principles

What are agentic workflows, key definitions, and foundational understanding.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | GitHub Agentic Workflows — Overview | https://github.github.com/gh-aw/ | Official Doc | 5/5 | Official landing page; covers definition, key features, guardrails, and security model |
| 2 | Agentic Workflows Developer Guide — Introduction | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows | Workshop Doc | 5/5 | Comprehensive introduction; compares agentic vs. traditional workflows; defines key features (Markdown authoring, multi-engine support, safe outputs) |
| 3 | Agentic application patterns (Durable Task SDKs) | https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-patterns | Microsoft Learn | 4/5 | Explains deterministic vs. agent-directed workflows; foundational patterns align with agentic principles |
| 4 | Agent system design patterns | https://learn.microsoft.com/azure/databricks/generative-ai/guide/agent-system-design-patterns | Azure Databricks | 4/5 | Covers levels of complexity from LLMs to agent systems; practical guidance on agentic design |
| 5 | GitHub Copilot modernization agent overview | https://learn.microsoft.com/azure/developer/github-copilot-app-modernization/modernization-agent/overview | Microsoft Learn | 3/5 | Agentic workflow orchestration for application modernization; demonstrates agent concepts |

---

## Research Area 2: Examples & Use Cases

Real-world scenarios, practical examples, and application domains.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | Agentic Workflows Developer Guide — Workflow Examples and Patterns | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#9-workflow-examples-and-patterns | Workshop Doc | 5/5 | 30+ reusable workflows from Agentics collection (maintainer, CI/CD, code review, research, code improvement, security) |
| 2 | Agentic Workflows Developer Guide — Daily Repository Status Report (Walkthrough 1) | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#4-walkthrough-1-daily-repository-status-report | Workshop Doc | 5/5 | Step-by-step example: scheduled workflow that analyzes repo activity and creates issue reports |
| 3 | Agentic Workflows Developer Guide — Issue Triage Workflow (Walkthrough 2) | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#5-walkthrough-2-issue-triage-workflow | Workshop Doc | 5/5 | Step-by-step example: event-driven workflow that labels and triages new issues automatically |
| 4 | Agentic Workflows Developer Guide — CI Doctor (Walkthrough 3) | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#6-walkthrough-3-ci-doctor | Workshop Doc | 5/5 | Step-by-step example: fault analysis workflow that diagnoses CI failures and creates diagnostic issues |
| 5 | Peli's Agent Factory Blog | https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/ | Blog | 4/5 | Community examples and use case inspiration; demonstrates real-world workflows |

---

## Research Area 3: Architecture & Design Patterns

How agentic workflows work, security architecture, design patterns, and execution models.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | GitHub Agentic Workflows — Guardrails Built-In (Security Architecture) | https://github.github.com/gh-aw/introduction/architecture/ | Official Doc | 5/5 | Five security layers: read-only tokens, zero secrets in agent, containerized firewall, safe outputs, threat detection |
| 2 | Agentic Workflows Developer Guide — Anatomy of an Agentic Workflow | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow | Workshop Doc | 5/5 | Frontmatter (YAML config) + Markdown body; safe outputs model; compilation process; permissions isolation |
| 3 | Agentic Workflows Developer Guide — Key Concepts Deep Dive | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#8-key-concepts-deep-dive | Workshop Doc | 5/5 | Triggers, permissions, strict mode, safe outputs, tools, MCP integration, network controls, threat detection |
| 4 | Agentic application patterns (Durable Task SDKs) — Choose an approach | https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-patterns#choose-an-approach | Microsoft Learn | 4/5 | Deterministic vs. agent-loop workflows; when to use each; comparison table for decision-making |
| 5 | Agentic Workflows Developer Guide — Workflow Patterns (IssueOps, ChatOps, DailyOps, etc.) | https://github.github.com/gh-aw/patterns/central-repo-ops/ | Official Doc | 4/5 | 18+ operational patterns; design patterns for different use cases and trigger types |

---

## Research Area 4: GitHub Integration

GitHub-specific implementation, tools, MCP integration, and GitHub Actions compatibility.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | Agentic Workflows Developer Guide — Tools and MCP | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#tools-and-mcp | Workshop Doc | 5/5 | GitHub MCP server integration; toolsets (issues, pull_requests, code_search, workflow_runs); MCP scripts for custom tools |
| 2 | GitHub Agentic Workflows — GitHub Integration & Deep Integration | https://github.github.com/gh-aw/reference/github-tools/ | Official Doc | 5/5 | Complete GitHub API toolset; issue/PR management, code search, workflow runs, repository operations |
| 3 | Agentic Workflows Developer Guide — Safe Outputs Reference | https://github.github.com/gh-aw/reference/safe-outputs/ | Official Doc | 5/5 | 8+ safe output types (create-issue, add-comment, create-PR, add-labels, dispatch-workflow, etc.) with configuration options |
| 4 | Agentic Workflows Developer Guide — Frontmatter Fields Reference | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#frontmatter-fields-reference | Workshop Doc | 5/5 | Complete configuration reference: triggers (on:), permissions, safe-outputs, engines, tools, network, imports, timeout |
| 5 | GitHub Actions for Microsoft Power Platform | https://learn.microsoft.com/power-platform/alm/devops-github-actions | Microsoft Learn | 2/5 | Related automation platform; demonstrates GitHub Actions extensibility (not directly agentic workflows but relevant ecosystem) |

---

## Research Area 5: Best Practices

Recommended approaches, security checklist, common pitfalls, cost management, and production guidance.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | Agentic Workflows Developer Guide — Best Practices and Common Pitfalls | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls | Workshop Doc | 5/5 | Do's and Don'ts; security checklist for production; permission isolation; specific vs. focused instructions; avoid granting direct write permissions |
| 2 | Agentic Workflows Developer Guide — Security Checklist for Production Workflows | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#security-checklist-for-production-workflows | Workshop Doc | 5/5 | Strict mode enabled, minimal permissions, safe-outputs configured, domain allowlists, RBAC, threat detection, no hardcoded secrets |
| 3 | Agentic Workflows Developer Guide — Testing, Debugging, and Iterating | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#10-testing-debugging-and-iterating | Workshop Doc | 5/5 | CLI commands, debugging checklist, cost management (token usage, timeouts, efficient prompts), iteration tips |
| 4 | Agentic application patterns — Agent system design patterns (practical advice) | https://learn.microsoft.com/azure/databricks/generative-ai/guide/agent-system-design-patterns#practical-advice | Azure Databricks | 4/5 | Plan for tool/LLM failures; retry strategies; iterative improvements; production guidance; version pinning |
| 5 | GitHub Agentic Workflows — FAQ | https://github.github.com/gh-aw/reference/faq/ | Official Doc | 4/5 | Common questions answered; lock file purpose; determinism vs. agentic autonomy; troubleshooting tips |

---

## Research Area 6: Workshop Resources

GitHub DevDays workshop content, hands-on exercises, and learning materials.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | Agentic Workflows Workshop — Overview & Learning Objectives | https://copilot-dev-days.github.io/agentic-workflows-workshop/step.html?step=readme | Workshop Site | 5/5 | Official DevDays workshop; 3 exercises: Quick Start (20 min), Hacker News Digest (20 min), ChatOps Sentiment (20 min) |
| 2 | Agentic Workflows Workshop Repository | https://github.com/copilot-dev-days/agentic-workflows-workshop | GitHub Repo | 5/5 | Complete workshop code and resources; hands-on exercises; reference implementations; DevDays 2025 content |
| 3 | Copilot Academy — Agentic Workflows Developer Guide (Full Course) | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows | Workshop Site | 5/5 | 12-section comprehensive guide; 4 detailed walkthroughs; appendix with resource links; prerequisites and setup |
| 4 | Agentic Workflows Workshop — Exercise 1: Quick Start | https://copilot-dev-days.github.io/agentic-workflows-workshop/step.html?step=1-quick-start | Workshop Exercise | 4/5 | Hands-on: gh aw init, daily digest setup, first workflow compilation and execution |
| 5 | Agentic Workflows Workshop — Exercise 2: Hacker News Digest | https://copilot-dev-days.github.io/agentic-workflows-workshop/step.html?step=2-hacker-news-digest | Workshop Exercise | 4/5 | Hands-on: custom agentic workflow; MCP tool integration; real-world example with external API integration |

---

## Research Area 7: Getting Started

Onboarding, first steps, prerequisites, installation, and quick-start guides.

| Rank | Title | URL | Type | Relevance | Notes |
|------|-------|-----|------|-----------|-------|
| 1 | GitHub Agentic Workflows — Quick Start with CLI | https://github.github.com/gh-aw/setup/quick-start/ | Official Doc | 5/5 | 5-minute setup; gh extension install; verification; authentication; first workflow creation |
| 2 | Agentic Workflows Developer Guide — Prerequisites and Setup | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#2-prerequisites-and-setup | Workshop Doc | 5/5 | Requirements (gh CLI, GitHub Actions, Copilot access); CLI extension installation; authentication setup; directory structure |
| 3 | Agentic Workflows Developer Guide — Creating Custom Workflows | https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#12-creating-custom-workflows | Workshop Doc | 5/5 | AI-generated workflows using create.md prompt; manual workflow authoring; repository initialization with gh aw init |
| 4 | Agentic Workflows Workshop — Prerequisites | https://copilot-dev-days.github.io/agentic-workflows-workshop/step.html?step=prerequisites | Workshop Exercise | 5/5 | Pre-workshop checklist; GitHub account requirements; Copilot subscription types; CLI prerequisites; terminal comfort level |
| 5 | GitHub Agentic Workflows — Installing & Supported AI Engines | https://github.github.com/gh-aw/reference/engines/ | Official Doc | 4/5 | Copilot (default), Claude by Anthropic, OpenAI Codex, custom engines; authentication requirements per engine |

---

## Source Quality Summary

| Category | Count | Coverage |
|----------|-------|----------|
| Official GitHub Docs | 8 | Core concepts, reference, architecture, security |
| Copilot Academy Workshop | 8 | Comprehensive guide, walkthroughs, best practices |
| DevDays Workshop | 3 | Hands-on exercises, practical implementation |
| Microsoft Learn | 4 | Azure integration, agent patterns, design guidance |
| Community/Blog | 1 | Examples and inspiration (Peli's Agent Factory) |
| **Total** | **24** | **7 Research Areas** |

---

## Notes on Source Selection

- **Recency**: All sources published 2025-2026 or actively maintained as of May 2026
- **Authority**: 80% official GitHub and Microsoft sources; 20% community/workshop
- **Depth**: Mix of foundational (concepts, architecture) and practical (walkthroughs, exercises)
- **Completeness**: Sources cover full lifecycle: concepts → architecture → implementation → best practices → troubleshooting
- **Accessibility**: Official docs + free workshop resources; no paywalled content

---

## Next Steps for Deep Reading

1. **Phase 1 - Foundations**: Read Concepts & Principles sources (1.1 → 1.2 → 1.3)
2. **Phase 2 - Understanding Architecture**: Study Architecture & Design Patterns (3.1 → 3.3 → 3.5)
3. **Phase 3 - Practical Application**: Work through Examples (2.2 → 2.3 → 2.4) and Workshop (6.1 → 6.3)
4. **Phase 4 - Production Readiness**: Review Best Practices (5.1 → 5.2) and GitHub Integration (4.1 → 4.4)
5. **Phase 5 - Hands-On**: Complete Getting Started exercises (7.1 → 7.4) and DevDays workshop

---

*Sources ranked by relevance (5/5 = exact match, 1/5 = tangential) and organized by research area. All URLs verified as of May 12, 2026.*
