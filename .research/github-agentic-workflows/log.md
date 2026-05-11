# Research Log: GitHub Agentic Workflows

Research project started: 2026-05-12  
Purpose: Support 8-slide presentation outline for GitHub DevDays 2026 workshop  
Target: High-level introduction to agentic workflows and principles

## Activity Log

- [2026-05-12 00:00] INITIATE: Research project initiated
- [2026-05-12 15:30] NOTE: examples/agentic-workflows-examples-patterns
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#9-workflow-examples-and-patterns
  - Title: Agentic Workflows Examples and Patterns
  - Key facts extracted: 6 (collection scope, workflow categories, operational patterns, installation, customization)

- [2026-05-12 15:30] NOTE: examples/daily-repository-status-report
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#4-walkthrough-1-daily-repository-status-report
  - Title: Daily Repository Status Report Workflow
  - Key facts extracted: 6 (purpose, trigger config, permissions, safe outputs, report categories)

- [2026-05-12 15:30] NOTE: examples/issue-triage-workflow
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#5-walkthrough-2-issue-triage-workflow
  - Title: Issue Triage Workflow
  - Key facts extracted: 6 (purpose, trigger config, permissions, safe outputs, triage process)

- [2026-05-12 15:30] NOTE: examples/ci-doctor-workflow
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#6-walkthrough-3-ci-doctor
  - Title: CI Doctor — Automated Failure Diagnosis
  - Key facts extracted: 7 (purpose, trigger config, permissions, safe outputs, tool config, diagnostic process)

- [2026-05-12 15:30] NOTE: examples/pelis-agent-factory
  - Source: https://github.github.com/gh-aw/blog/2026-01-12-welcome-to-pelis-agent-factory/
  - Title: Peli's Agent Factory — Production Agentic Workflows
  - Key facts extracted: 5 (collection scope, workflow categories, production use cases, workflow taxonomy, lessons)
  - Topic: GitHub Agentic Workflows
  - Purpose: presentation
  - Slides target: 8-slide outline
  - Audience: GitHub DevDays 2026 workshop participants
  - Plan: APPROVED by user

- [2026-05-12 00:00] SCAFFOLD: Output structure created
  - Note areas: 7 (docs, tech, blogs, arch, samples, solutions, other)
  - Output sections: 7 (mapped to 8 slides)
  - Log and section placeholders initialized
  - Status: Ready for Phase 2 (source discovery)

---

- [2026-05-12 08:30] DISCOVER: Source discovery phase executed
  - Method: Parallel search across 4 tools (fetch_webpage + 3x microsoft_docs_search)
  - Primary sources fetched: 4 (GitHub gh-aw, Copilot Academy, DevDays workshop x2)
  - Microsoft Learn searches: 3 (agentic workflows, patterns, best practices)
  - Sources discovered: 24 across 7 research areas
  - Coverage: 8 official GitHub docs + 8 workshop docs + 3 DevDays exercises + 4 Microsoft Learn + 1 community blog
  - Quality: 80% official sources (GitHub + Microsoft), 20% community/workshop
  - All sources verified for 2025-2026 publication dates
  - Output: sources.md completed with ranked table per research area
  - Status: Phase 2 COMPLETE

---

## Phase Tracker

- ✅ Phase 1: Initiate (COMPLETE)
  - Plan created and approved
  - Output structure scaffolded
  - .initiated marker created

- ✅ Phase 2: Source Discovery (COMPLETE)
  - 24 sources discovered and ranked across 7 areas
  - sources.md published with full source tables
  - All user-provided priority sources included
  - Additional complementary sources identified

- ✅ Phase 3: Deep Read — Concepts & Principles (COMPLETE)

---

## Phase 3: Deep Reading — Concepts & Principles (2026-05-12)

Extraction of 5 structured research notes from "Concepts & Principles" area (top sources):

- [2026-05-12 14:45] NOTE: concepts/github-agentic-workflows-definition
  - Source: https://github.github.com/gh-aw/ (Official GitHub docs)
  - Title: GitHub Agentic Workflows — Definition & Core Concepts
  - Key facts extracted: 8 (definition, core features, security layers, use cases)
  - Dimensions covered: definition, core_features, key_differences, use_cases
  - Quotable passages: 3 (including official definition)
  - Code snippets: 1 (example workflow structure)
  - Questions raised: 3

- [2026-05-12 14:45] NOTE: concepts/agentic-workflow-anatomy
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows (Academy guide)
  - Title: Agentic Workflow Anatomy & Execution Model
  - Key facts extracted: 12 (two-part structure, frontmatter fields, compilation model, safe outputs, triggers)
  - Dimensions covered: anatomy, structure, compilation_model, security_isolation
  - Tables extracted: 5 (fields reference, safe outputs, triggers, examples)
  - Diagrams rendered: 3 (compilation flow, safe outputs flow, directory structure)
  - Questions raised: 3

- [2026-05-12 14:45] NOTE: concepts/agent-system-design-patterns
  - Source: https://learn.microsoft.com/azure/databricks/generative-ai/guide/agent-system-design-patterns (Microsoft Learn)
  - Title: Agent System Design Patterns & Complexity Levels
  - Key facts extracted: 14 (4 design levels, decision workflows, practical guidance)
  - Dimensions covered: design_patterns, complexity_levels, reasoning_loops, tool_calling
  - Design patterns analyzed: 4 (LLM+prompt, deterministic, single-agent, multi-agent)
  - Comparison table: 1 (complexity vs flexibility tradeoff)
  - Production guidance: 3 sections (development, testing, production)
  - Questions raised: 3

- [2026-05-12 14:45] NOTE: concepts/agentic-workflows-positioning
  - Source: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows (Academy guide)
  - Title: Agentic Workflows: Positioning & Conceptual Foundation
  - Key facts extracted: 9 (positioning in ecosystem, continuous AI, philosophy, core advances)
  - Dimensions covered: positioning, continuous_ai, relationship_to_copilot, vs_traditional_automation
  - Comparisons made: 3 (traditional vs. agentic, interactive vs. unattended, conceptual pillars)
  - Example code: 2 (traditional YAML vs. markdown comparison)
  - Questions raised: 3

- [2026-05-12 14:45] NOTE: concepts/workshop-hands-on-overview
  - Source: https://github.com/copilot-dev-days/agentic-workflows-workshop (DevDays workshop repo)
  - Title: GitHub DevDays Agentic Workflows Workshop — Hands-On Overview
  - Key facts extracted: 10 (workshop structure, 3 exercises, prerequisites, progression)
  - Dimensions covered: hands_on_learning, practical_examples, workshop_exercises, getting_started
  - Exercises documented: 3 (Quick Start, HackerNews Digest, ChatOps Sentiment)
  - Estimated learning time: 60 minutes total
  - Accessibility features: 3 (localization, theme toggle, screen reader friendly)
  - Questions raised: 3

**Extraction Summary**:
- Total notes created: 5
- Total key facts extracted: 53
- Total dimensions covered: 13
- Average facts per note: 10.6
- Quality rating: draft (all notes ready for review and integration)
- Cross-references identified: 7 (linking concepts across sources)
- Total questions raised: 15 (for follow-up research or content review)

**Coverage Analysis**:
- ✅ Definition & concepts: Complete (sources 1, 2, 4)
- ✅ Structure & anatomy: Complete (source 2)
- ✅ Design patterns & reasoning: Complete (source 3)
- ✅ Positioning & ecosystem: Complete (source 4)
- ✅ Hands-on learning: Complete (source 5)

**Next Steps**:
1. Content writer reviews notes for integration into presentation outline
2. Additional sources from "Examples & Use Cases" and "Best Practices" areas
3. Architecture & Design Patterns deep reading phase
4. Integration with presentation slide mapping

---

- ⏳ Phase 3: Deep Reading (IN PROGRESS)
  - Status: Pending
  - Target: 18-25 sources across 7 areas

- ⏳ Phase 3: Deep Read (Extract Notes)
  - Status: Pending

- ⏳ Phase 4: Write Output
  - Status: Pending

- ⏳ Phase 5: Quality Review
  - Status: Pending

- ⏳ Phase 6: Complete/Iterate
  - Status: Pending

- [2026-05-12 16:20] NOTE: architecture/security-architecture-layered-model - GitHub Agentic Workflows - Security Architecture (<https://github.github.com/gh-aw/introduction/architecture/>)
- [2026-05-12 16:20] NOTE: architecture/anatomy-compilation-and-safe-outputs - Agentic Workflows Developer Guide - Anatomy of an Agentic Workflow (<https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- [2026-05-12 16:20] NOTE: architecture/key-concepts-tools-mcp-and-guardrails - Agentic Workflows Developer Guide - Key Concepts Deep Dive (<https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#8-key-concepts-deep-dive>)
- [2026-05-12 16:20] NOTE: architecture/central-repo-ops-orchestrator-worker-pattern - CentralRepoOps (<https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- [2026-05-12 16:20] NOTE: architecture/github-tools-integration-patterns - GitHub Tools (for reading from GitHub) (<https://github.github.com/gh-aw/reference/github-tools/>)
- [2026-05-12 16:20] NOTE: architecture/mcp-gateway-specification-architecture - MCP Gateway Specification (<https://github.github.com/gh-aw/reference/mcp-gateway/>)
- [2026-05-12 17:05] NOTE: github-integration/github-tools-read-capabilities-and-access-modes — GitHub Tools (for reading from GitHub) (<https://github.github.com/gh-aw/reference/github-tools/>)
- [2026-05-12 17:05] NOTE: github-integration/safe-outputs-github-write-operations-and-orchestration — Safe Outputs (<https://github.github.com/gh-aw/reference/safe-outputs/>)
- [2026-05-12 17:05] NOTE: github-integration/triggers-events-and-github-native-workflow-syntax — Triggers (<https://github.github.com/gh-aw/reference/triggers/>)
- [2026-05-12 17:05] NOTE: github-integration/frontmatter-github-actions-integration-fields — Frontmatter (<https://github.github.com/gh-aw/reference/frontmatter/>)
- [2026-05-12 17:05] NOTE: github-integration/tools-and-mcp-integration-patterns-in-practice — Agentic Workflows Developer Guide — Tools and MCP (<https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#tools-and-mcp>)
- [2026-05-12 18:10] NOTE: best-practices/best-practices-and-common-pitfalls — Agentic Workflows Developer Guide - Best Practices and Common Pitfalls (<https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
