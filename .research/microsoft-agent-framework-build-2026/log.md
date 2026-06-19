# Research Extraction Log

## microsoft-agent-framework-build-2026

**Topic:** Microsoft Agent Framework Build 2026 Announcements
**Research Area Focus:** Agent Harness Core Loop
**Started:** 2026-06-18

---

## Writing Output

- [2026-06-19T00:00:00Z] WRITE: output/sdk-integrations/section.md — concise rewrite for 12-minute talk; claim-level citations added; persona paths + matrixes + conceptual snippets + sample-code-patterns cross-reference

- [2026-06-19T00:00:00Z] WRITE: output/orchestration-patterns/section.md — synthesized from 7 notes (concise rewrite with Magentic caveat, guardrails, matrix, and conceptual diagram)

- [2026-06-19T00:00:00Z] WRITE: output/sample-code-patterns/section.md — reduced to two runnable primary snippets (Python, C#), conceptual appendix links only, with source-linked claims

- [2026-06-19T00:00:00Z] WRITE: output/advanced-capabilities/section.md — rewritten for 12-minute fit with 4 subsections, Magentic caveat + guardrails, and claim-strength trim

- **[2026-06-18]** WRITE: `output/use-cases/section.md` — synthesized from 12 notes
  - **Section:** Use Cases and Decision Guidance
  - **Purpose:** 12-minute technical presentation
  - **Target Audience:** Senior architects, solution engineers
  - **Status:** draft — ready for quality review

- **[2026-06-18]** WRITE: `output/orchestration-patterns/section.md` — synthesized from 7 notes
  - **Section:** Orchestration Patterns
  - **Purpose:** 12-minute technical presentation
  - **Target Audience:** Senior architects, solution engineers
  - **Sources:**
    - sub-agents-orchestration.md
    - human-in-the-loop-approval.md
    - planning-capabilities.md
    - durable-agents-foundry.md
    - microsoft-foundry-agent-service.md
    - microsoft-learn-agent-loop-architecture.md
    - github-repository-patterns.md
  - **Status:** draft — ready for quality review
- [2026-06-18T00:00:00Z] WRITE: output/sample-code-patterns/section.md — synthesized from 12 notes# Research Extraction Log

## microsoft-agent-framework-build-2026

**Topic:** Microsoft Agent Framework Build 2026 Announcements
**Research Area Focus:** Agent Harness Core Loop
**Started:** 2026-06-18

---

## Writing Output

- **[2026-06-19]** WRITE: `output/introduction/section.md` — rewritten for review fixes and presentation scope
  - **Section:** Introduction to Build 2026 updates
  - **Status:** draft
  - **Changes:** Removed unsupported numeric reliability claim, aligned canonical terminology, added claim-adjacent citations, added explicit bridge to code sections

- **[2026-06-19]** DISCOVER: Gap-focused source refresh completed for review fail items
  - **Scope:** 5 targeted gaps only (no broad rediscovery)
  - **Sources added:** 22 high-confidence references (Microsoft Learn + microsoft/agent-framework)
  - **Critical finding:** No official source found supporting a numeric Durable Task recovery reliability percentage/SLA for Agent Framework scenarios
  - **Output updated:** `sources.md` appended with "Iteration 1: Gap-focused source refresh (2026-06-19)"

- **[2026-06-18]** RESUME: session recovered after crash; verified `.initiated`, `plan.md`, `sources.md`, and existing drafts in `output/`
  - **Current State:** Phase 4 in progress
  - **Completed Drafts:** introduction, agent-harness-architecture, core-components, advanced-capabilities, sdk-integrations
  - **Remaining Drafts:** orchestration-patterns, sample-code-patterns, use-cases

- **[2026-06-18]** WRITE: `output/advanced-capabilities/section.md` — synthesized from 4 advanced-features notes
  - **Section:** Advanced Capabilities (Sub-Agents, Persistence, HIL, Planning)
  - **Word Count:** ~5,800 words (target 5500–6500)
  - **Purpose:** 12-minute technical presentation
  - **Target Audience:** Senior architects, solution engineers
  - **Sources:**
    - sub-agents-orchestration.md
    - session-persistence-memory.md
    - human-in-the-loop-approval.md
    - planning-capabilities.md
  - **Code Examples:** 8 (4 Python, 4 .NET; split across 4 subsections)
  - **Diagrams:** 4 conceptual (orchestration patterns, persistence flow, HIL workflow, planning loop)
  - **Subsections:**
    1. Sub-Agents and Multi-Agent Orchestration (1.5 pages)
    2. Session Persistence and Memory Management (1.5 pages)
    3. Human-in-the-Loop and Approval Workflows (1.5 pages)
    4. Planning Capabilities and Autonomous Reasoning (1 page)
  - **Status:** draft — ready for quality review

- **[2026-06-18]** WRITE: `output/core-components/section.md` — synthesized from 4 agent-capabilities notes
  - **Section:** Core Components Breakdown (Skills, Tools, Permissions, Safety)
  - **Word Count:** ~3,200 words
  - **Purpose:** 12-minute technical presentation
  - **Target Audience:** Senior architects, solution engineers
  - **Sources:** 
    - tools-function-registration.md
    - skills-design-progressive-disclosure.md
    - tool-approval-permissions-gating.md
    - safety-security-guardrails.md
  - **Code Examples:** 9 (Python + .NET)
  - **Diagrams:** 3 conceptual (trust boundaries, approval flow, progressive disclosure pattern)
  - **Status:** draft — ready for quality review

- **[2026-06-18]** WRITE: `output/sdk-integrations/section.md` — synthesized from 5 sdk-integrations notes
  - **Section:** SDK Integrations (Copilot, Foundry, Durable Task, M365)
  - **Word Count:** ~5,200 words (target 4,500–5,500)
  - **Purpose:** 12-minute technical presentation
  - **Target Audience:** Senior architects, solution engineers
  - **Sources:**
    - github-copilot-sdk-integration.md
    - microsoft-foundry-agent-service.md
    - durable-agents-foundry.md
    - m365-agents-copilot-integration.md
    - python-2026-sdk-changes.md
  - **Code Examples:** 8 (Python + .NET; 2 per section)
  - **Architecture Diagrams:** 1 integration matrix showing ecosystem composition
  - **Subsections:**
    1. GitHub Copilot SDK Integration (1 page)
    2. Microsoft Foundry Agent Service (1.5 pages)
    3. Durable Task Framework Integration (1 page)
    4. Microsoft 365 Agents Integration (1 page)
    5. Integration Patterns & Selection Criteria (summary table)
    6. Key Python Changes for Build 2026 (0.5 pages)
  - **Status:** draft — ready for quality review

---

## Extracted Notes

### Agent Harness Core Loop Area

- **[2026-06-18]** NOTE: `agent-harness-core-loop/microsoft-learn-agent-loop-architecture`
  - **Source:** https://learn.microsoft.com/agent-framework/agents/agent-pipeline
  - **Source Title:** Agent pipeline architecture (Microsoft Learn)
  - **Dimensions Covered:**
    - Agent loop architecture (pipeline model, execution flow)
    - Lifecycle hooks (Agent Run, Function Calling, Chat Client middleware)
    - Context management (history, context providers, state lifecycle)
    - Error handling & recovery
  - **Code Examples:** 4 complete implementations (Python + C#)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `agent-harness-core-loop/github-repository-patterns`
  - **Source:** https://github.com/microsoft/agent-framework
  - **Source Title:** microsoft/agent-framework GitHub Repository
  - **Dimensions Covered:**
    - Repository sample organization (01-get-started through 05-end-to-end)
    - Progressive complexity patterns
    - Extension patterns (context providers, middleware)
    - Integration examples
    - Best practices and constraints
  - **Code Examples:** 8+ patterns from actual samples
  - **Quality:** draft
  - **Status:** Ready for content reviewer

### Advanced Features Area

- **[2026-06-18]** NOTE: `advanced-features/sub-agents-orchestration`
  - **Source:** https://github.com/microsoft/agent-framework
  - **Source Title:** Microsoft Agent Framework Repository
  - **Dimensions Covered:**
    - Workflow builder patterns (fluent API, graph construction)
    - Superstep execution model (BSP, synchronization barriers)
    - Orchestration patterns (sequential, concurrent, handoff, group chat)
    - Multi-agent communication
  - **Code Examples:** 6 complete implementations (3 Python, 3 .NET)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `advanced-features/session-persistence-memory`
  - **Source:** https://learn.microsoft.com/en-us/agent-framework/agents/conversations
  - **Source Title:** Microsoft Learn - Conversations & Memory Overview
  - **Dimensions Covered:**
    - AgentSession lifecycle and management
    - Session serialization/deserialization patterns
    - Context providers and memory patterns
    - Storage strategies and persistence
  - **Code Examples:** 6 complete implementations (3 Python, 3 .NET)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `advanced-features/human-in-the-loop-approval`
  - **Source:** https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop
  - **Source Title:** Microsoft Learn - Human-in-the-Loop (HITL)
  - **Dimensions Covered:**
    - RequestPort pattern and bidirectional communication
    - Request/response mechanisms
    - Tool approval workflows
    - Checkpoint integration and recovery
  - **Code Examples:** 8 complete implementations (4 Python, 4 .NET)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `advanced-features/planning-capabilities`
  - **Source:** https://github.com/microsoft/agent-framework
  - **Source Title:** Microsoft Agent Framework Repository
  - **Dimensions Covered:**
    - Autonomous agent planning and reasoning
    - Tool calling iteration patterns
    - Planning vs. orchestration tradeoffs
    - Adaptive execution and replanning
  - **Code Examples:** 7 complete implementations (3 Python, 3 .NET, 1 pattern)
  - **Quality:** draft
  - **Status:** Ready for content reviewer
  2. `Agent Framework Build 2026 new features` → 6 results on 2026 updates and changes
  3. `Agent Framework SDK integration Copilot` → 7 results on integrations
  4. `Agent Framework code examples` → 8 code samples (C#, Python)
  5. `Agent Framework orchestration workflows patterns multi-agent` → 8 results on orchestrations
  6. `Agent Framework tools skills registration` → 9 results on capabilities
  7. `Agent Framework middleware context providers session` → 9 results on core loop
  8. `Agent Framework Copilot SDK GitHub integration` → 9 results on SDK integrations
  9. `Agent Framework human-in-the-loop approval checkpoint` → 9 results on advanced features

### SDK Integrations Area

- **[2026-06-18]** NOTE: `sdk-integrations/github-copilot-sdk-integration`
  - **Source:** https://learn.microsoft.com/agent-framework/agents/providers/github-copilot
  - **Source Title:** GitHub Copilot Agents | Microsoft Agent Framework
  - **Dimensions Covered:**
    - CopilotClient API and basic agent creation
    - Shell command execution, file operations, URL fetching
    - MCP server integration (stdio and HTTP)
    - Permissions model and handlers
    - Session management
    - Streaming responses
  - **Code Examples:** 12 complete implementations (6 C#, 6 Python)
  - **Environment Variables:** 5 documented (Python configuration)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `sdk-integrations/microsoft-foundry-agent-service`
  - **Source:** https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry
  - **Source Title:** Microsoft Foundry | Microsoft Agent Framework
  - **Dimensions Covered:**
    - Responses Agent pattern (direct inference, code-first)
    - Foundry Agent pattern (service-managed, versioned)
    - Tool support matrix (17 tools, multiple statuses)
    - Python FoundryChatClient and FoundryAgent
    - FoundryEmbeddingClient for embeddings
    - Tool factories and configuration
    - FoundryAgent behavior constraints
  - **Code Examples:** 15 complete implementations (7 C#, 8 Python)
  - **Configuration:** Project endpoint, model, embeddings setup
  - **Tool Status Tracking:** GA, experimental, preview tools documented
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `sdk-integrations/python-2026-sdk-changes`
  - **Source:** https://learn.microsoft.com/agent-framework/support/upgrade/python-2026-significant-changes
  - **Source Title:** Python 2026 Significant Changes Guide | Microsoft Agent Framework
  - **Dimensions Covered:**
    - github-copilot-sdk v1.0.0 breaking changes (SubprocessConfig removal, import path migration)
    - Foundry embeddings ownership and migration
    - Message construction API removal
    - Checkpoint security (FileCheckpointStorage, CosmosCheckpointStorage)
    - Instrumentation enabled by default
    - Orchestration output standardization
    - Multiple package promotion timeline (1.0.0 through 1.8.0)
  - **Code Examples:** 12 before/after migration patterns
  - **Breaking Changes:** 10+ documented across releases
  - **Enhancements:** 15+ new capabilities tracked
  - **Release Timeline:** python-1.0.0 (Apr 2) through python-1.8.0 (Jun 4)
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `sdk-integrations/durable-agents-foundry`
  - **Source:** https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
  - **Source Title:** Durable Task extension for Microsoft Agent Framework
  - **Dimensions Covered:**
    - Durable agent architecture (entity-based agent loops)
    - Session persistence and checkpointing
    - Azure Functions hosting (ConfigureDurableAgents, ConfigureDurableWorkflows)
    - Bring-your-own-compute pattern (custom DurableTaskScheduler)
    - Multi-agent orchestration with failure recovery
    - Sequential and fan-out/fan-in workflow patterns
    - Workflow builders and graph-based execution
  - **Code Examples:** 12 complete implementations (6 C#, 6 Python)
  - **Patterns:** Sequential, fan-out/fan-in, multi-agent, concurrent, HITL
  - **Integration Points:** Foundry agents, workflow builders, Azure Functions
  - **Quality:** draft
  - **Status:** Ready for content reviewer

- **[2026-06-18]** NOTE: `sdk-integrations/m365-agents-copilot-integration`
  - **Source:** https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot
  - **Source Title:** Bring your agents into Microsoft 365 Copilot
  - **Dimensions Covered:**
    - Microsoft 365 Agents Toolkit and Agents SDK
    - Channel adapter pattern (Azure Bot Service intermediary)
    - Manifest configuration and deployment
    - OAuth permissions and user-on-behalf access
    - Event listener configuration (OnActivity)
    - App registration and Bot Service setup
  - **Code Examples:** 3 implementation examples (C#, JavaScript, Python)
  - **Manifest Structure:** JSON schema documented
  - **Permissions:** OAuth flow, scope examples, consent management
  - **Languages Supported:** C#, JavaScript, Python
  - **Quality:** draft
  - **Status:** Ready for content reviewer

---

- **Sources Found**: 40+ unique sources

- [2026-06-19T00:00:00Z] REVIEW: Re-review after iteration-1 rewrites completed; 8 sections reviewed, 8 passed, 0 need work (verdict: PASS)
- **Coverage by Area**:
  - Agent Harness Core Loop: 6 sources (5/5 relevance)
  - SDK Integrations: 5 sources (5/5 relevance)
  - Agent Capabilities: 6 sources (5/5 relevance)
  - Advanced Features: 6 sources (5/5 relevance)
  - SDK Integrations: 6 sources (4-5/5 relevance)
  - Orchestration Patterns: 10 sources (4-5/5 relevance)
  - Supporting Resources: 7 sources (3-5/5 relevance)

#### Phase 2: Source Ranking & Deduplication (18:45 UTC)
- **Ranking Criteria Applied**:
  1. Official Microsoft sources prioritized (Microsoft Learn, GitHub org, Azure Architecture)
  2. Relevance scored 1-5 based on topic match and depth
  3. Code sample availability weighted for implementation patterns
  4. Recency checked (Build 2026 era sources preferred)
  5. Duplicates removed (same URL deduped)

- **High-Quality Sources Identified**: 32/40 (80% official docs)
- **Code Examples**: 6 GitHub repositories with working samples

- [2026-06-19T00:00:00Z] REVIEW: 8 sections reviewed, 0 passed, 8 need work, 1 unsupported high-risk claim, talk-readiness FAIL
- [2026-06-19T00:20:00Z] ITERATION-1 START: Phase 6 triggered after FAIL verdict.
  - Focus gaps: unsupported reliability metric, attribution precision, approval semantics boundaries, Magentic caveats, 12-minute talk-fit reduction.
  - Plan: rerun Phase 2 (gap-focused discovery) -> Phase 3 (targeted deep reads) -> Phase 4 (section rewrites) -> Phase 5 (re-review).
- [2026-06-19T00:48:00Z] ITERATION-1 PHASE-4 COMPLETE: Targeted rewrites finished for all output sections.
  - Updated sections: introduction, agent-harness-architecture, core-components, advanced-capabilities, sdk-integrations, orchestration-patterns, sample-code-patterns, use-cases.
  - Next: Phase 5 re-review for pass/fail gate.
- [2026-06-19T01:00:00Z] ITERATION-1 PHASE-5 COMPLETE: Quality re-review verdict PASS.
  - Acceptance criteria passed: unsupported numeric claim removed, approval boundaries clarified, Magentic caveats/guardrails explicit, canonical terminology aligned, 12-minute talk-fit achieved.
- [2026-06-19T01:02:00Z] PHASE-6 COMPLETE: Project finalized.
  - Created output index: `output/README.md`.
  - Final state: all 8 sections marked `status: complete`, review verdict PASS.
- [2026-06-19T00:35:00Z] WRITE: output/core-components/section.md — rewritten for approval-boundary clarity, talk-length focus, and stronger claim-level attribution (iteration-1 boundary sources primary).
- **Architecture Patterns**: 1 Azure Architecture reference
- **Blog/Community**: 7 supplemental sources

#### Phase 3: Structured Output Generation (19:00 UTC)
- **Output Format**: Markdown table by research area
- **File Created**: `sources.md` (47KB, 600 lines)
- **Structure**:
  - 5 primary research areas with 6-10 sources each
  - Supporting resources cross-area (7 sources)
  - Summary table with source counts and types

#### Key Findings by Area

**Research Area 1: Agent Harness Core Loop**
- All 6 sources are 5/5 relevance (official docs, comprehensive)
- Coverage: pipeline architecture, execution model, session management, middleware, context providers
- Gap: No third-party execution model comparisons found

**Research Area 2: Agent Capabilities**
- Strong tooling documentation (tools, skills, approvals)
- Recent Python 2026 updates included (security enhancements, ClassSkill)
- Coverage: tool types, skill progressive disclosure, approval workflows
- Gap: Limited cost-benefit analysis of tool vs skill overhead

**Research Area 3: Advanced Features**
- Excellent HITL and checkpoint documentation
- Session persistence patterns well-documented
- Coverage: human-in-the-loop, checkpoints, session serialization, compaction
- Gap: Long-running agent performance benchmarks not found

**Research Area 4: SDK Integrations**
- GitHub Copilot and Foundry integrations prominent (5/5)
- Copilot Studio and M365 Agents well-documented (4/5)
- Coverage: provider diversity, authentication patterns, session management

---

### Agent Capabilities Area (Deep Reader Extraction - 2026-06-18)

#### Extracted Notes (2026-06-18)

1. **[2026-06-18]** NOTE: `agent-capabilities/tools-function-registration`
   - **Source:** https://learn.microsoft.com/agent-framework/agents/tools
   - **Source Title:** Tools Overview - Agent Framework
   - **Dimensions Covered:**
     - Tool types and classification
     - Function definition and registration patterns
     - Parameter handling and validation
     - Error handling for tool calls
     - Agent composition (agent-as-tool pattern)
     - Provider support matrix
   - **Code Examples:** 10+ (Python @tool decorator, .NET AIFunctionFactory, tool invocation patterns)
   - **Language Coverage:** Python, C#
   - **Quality:** draft
   - **Status:** Ready for content reviewer

2. **[2026-06-18]** NOTE: `agent-capabilities/skills-design-progressive-disclosure`
   - **Source:** https://learn.microsoft.com/agent-framework/agents/skills
   - **Source Title:** Agent Skills - Agent Framework
   - **Dimensions Covered:**
     - Skill structure (SKILL.md format, directory layout)
     - Progressive disclosure pattern (4 stages: advertise, load, read, run)
     - File-based skills registration
     - Code-defined and inline skills
     - Script execution and runners
     - Resource discovery customization
     - Caching behavior
     - Skill composition and aggregation
   - **Code Examples:** 12+ (SkillsProvider.from_paths, AgentSkillsProvider, inline skills, script runners)
   - **Language Coverage:** Python, C#
   - **Quality:** draft
   - **Status:** Ready for content reviewer

3. **[2026-06-18]** NOTE: `agent-capabilities/tool-approval-permissions-gating`
   - **Source:** https://learn.microsoft.com/agent-framework/agents/tool-approval
   - **Source Title:** Tool Approval - Agent Framework
   - **Dimensions Covered:**
     - Tool approval mechanism (human-in-the-loop gating)
     - Approval modes (always_require, never_require)
     - Approval request handling patterns
     - Auto-approval rules and standing approvals
     - MCP tool approval
     - CodeAct approval integration
     - Approval strategy matrix
     - Limitations and constraints
   - **Code Examples:** 15+ (approval flow patterns, auto-approval rules, MCP approval, approval response handling)
   - **Language Coverage:** Python, C#
   - **Quality:** draft
   - **Status:** Ready for content reviewer

4. **[2026-06-18]** NOTE: `agent-capabilities/safety-security-guardrails`
   - **Source:** https://learn.microsoft.com/agent-framework/agents/safety
   - **Source Title:** Agent Safety - Agent Framework
   - **Dimensions Covered:**
     - Trust boundaries in agent data flow
     - Input validation best practices (allow-listing, type/range, path traversal, parameterized queries)
     - Tool approval as safety gate
     - System message control and developer ownership
     - Extension provider vetting
     - LLM output validation and sanitization
     - Sensitive data in logs (Trace level, telemetry)
     - Session data security
     - Resource limits (input/output, rate limiting)
     - Threat model (prompt injection, exfiltration, indirect injection, path traversal, SQL injection, DoS)
     - FIDES deterministic defense
     - Foundry guardrails
   - **Code Examples:** 13+ (input validation patterns, output sanitization, session encryption, rate limiting)
   - **Language Coverage:** Python, C#
   - **Threat Categories:** 10+ (prompt injection, data exfiltration, indirect injection, etc.)
   - **Quality:** draft
   - **Status:** Ready for content reviewer

#### Extraction Summary

- **Total Notes Created:** 4
- **Total Code Examples:** 50+
- **Code Examples by Language:** Python 25+, C# 25+
- **Key Facts Extracted:** 32
- **Threat Categories Covered:** 10+
- **Security Best Practices:** 8
- **Tool Approval Patterns:** 5
- **Safety Guardrails:** 12

#### Findings by Dimension

**Skills and Tools Registration:**
- Multiple tool types supported across providers (function tools, code interpreter, file search, web search, MCP tools, Foundry toolboxes)
- Framework automatically handles type marshalling and argument validation
- Agent composition enables nested workflows via agent-as-tool pattern
- Progressive disclosure pattern keeps initial context minimal (~1,000 tokens for 10 skills vs ~50,000 without)

**Tool Approval & Permissions:**
- Human-in-the-loop approval gates high-risk operations (side effects, data access, irreversible actions)
- Python: `@tool(approval_mode="...")` decorator; C#: `ApprovalRequiredAIFunction` wrapper
- Auto-approval rules support conditional approval based on tool name and arguments
- Standing approvals remember user decisions for repeated operations
- Works with function tools, MCP tools, and CodeAct (code execution)

**Safety & Guardrails:**
- Shared responsibility: Framework provides patterns; developers implement controls
- 6+ trust boundaries in agent data flow (input → history → context providers → LLM → tools → output)
- Input validation via allow-listing (preferred), type/range constraints, length limits, path traversal prevention, parameterized queries
- Output validation: sanitize for HTML/code execution, validate structure before using in interpreted contexts
- Session security: encrypt at rest, treat restored sessions as untrusted input
- Threat model covers: prompt injection, data exfiltration, indirect injection, path traversal, SQL injection, DoS
- FIDES provides deterministic defense for advanced scenarios
- Foundry guardrails operate at 4 intervention points (input, tool call, tool response, output)

#### Cross-Dimensional Insights

**Skills vs Tools Tradeoff:**
- Tools for immediate operations (get_weather); Skills for domain expertise packages (expense-report policy, legal workflow)
- Skills use progressive disclosure; tools are always available
- Skills recommended max 500 lines; tools are lighter weight

**Approval & Safety Integration:**
- Approval is one layer of defense; input validation is mandatory for all tools
- Approval prevents execution; validation prevents injection
- Combined: validation catches malformed arguments before approval is requested

**Progressive Disclosure Efficiency:**
- Without: 50,000 tokens for 10 skills upfront
- With: 1,000 tokens initial + on-demand loading
- Reduces token waste for unused skills by 98%

#### Questions Raised

1. How does system prompt assembly work beyond progressive disclosure? What is the exact prompt construction algorithm?
2. What are Build 2026-specific announcements about tools, skills, or permissions?
3. Performance implications: upfront validation vs lazy validation for LLM arguments?
4. FIDES + Foundry guardrails: how do they layer? Order of precedence?
5. Cost-benefit: when to use skills vs tools vs custom context providers?
6. Rate limiting best practices: per-user? per-tool? per-operation?

#### Status

**Notes Quality:** Draft (extracted, not yet reviewed/edited)
**Ready for:** Content synthesis phase (combine with other research areas)
**Next Phase:** Quality review, then content assembly for presentations/learning pathways
- Gap: Performance comparison across providers not in official docs

**Research Area 5: Orchestration Patterns**
- All 5 built-in patterns fully documented (Sequential, Concurrent, Handoff, Group Chat, Magentic)
- Enterprise scenario mapping available (architecture reference)
- Coverage: pattern selection, implementation samples, composition patterns
- Gap: Pattern performance under scale not in primary sources

#### Source Type Distribution
| Type | Count | Examples |
|------|-------|----------|
| Official Docs | 32 | learn.microsoft.com/agent-framework/ |
| GitHub Code | 6 | microsoft/agent-framework samples |
| Architecture | 1 | Azure Architecture Center |
| Blog/Community | 7 | devblogs.microsoft.com, YouTube, Discord |

#### Completeness Assessment
- **Target**: 4-8 sources per area = 20-40 total ✅
- **Achieved**: 40+ across all areas with depth ✅
- **Authority**: Official Microsoft sources dominate (80%) ✅
- **Recency**: Build 2026 updates and Python 1.8.0 (June 2026) included ✅
- **Code Examples**: Available for all major topics ✅

#### Next Phase Recommendation
**Deep Reading Phase**: Top sources for detailed analysis in priority order:
1. Agent Pipeline Architecture (core loop understanding)
2. Orchestration patterns docs (multi-agent coordination)
3. GitHub Copilot Integration (SDK capabilities)
4. Checkpoint & HITL (advanced state management)
5. GitHub samples (implementation patterns)

---

**Session Status**: COMPLETE
**Time**: 30 minutes (18:30–19:00 UTC)
**Output Files**: 
- `sources.md` (complete source list with annotations)
- `log.md` (this file, activity record)

---

## Orchestration Patterns Research Session

**Session Date**: 2026-06-18
**Research Area**: Orchestration Patterns — Multi-Agent Coordination
**Target**: Extract structured notes on 5 built-in orchestration patterns + enterprise architecture + composition patterns

### Completed Notes

1. **[2026-06-18]** NOTE: `orchestration-patterns/01-orchestration-patterns-overview`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/
   - **Dimensions**: Pattern selection matrix, topology comparison, HITL overview, use case mapping
   - **Code Examples**: Sequential, Concurrent, Group Chat, Handoff patterns (C#/Python)
   - **Status**: ✅ Complete (6500+ words)

2. **[2026-06-18]** NOTE: `orchestration-patterns/02-sequential-orchestration`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential
   - **Dimensions**: Context control (full/chain-only), intermediate outputs, custom executors, HITL approval, request info patterns
   - **Code Examples**: Pipeline workflows, translation, document review, request handling (C#/Python)
   - **Status**: ✅ Complete (7500+ words)

3. **[2026-06-18]** NOTE: `orchestration-patterns/03-concurrent-orchestration`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent
   - **Dimensions**: Parallel execution, aggregators (default/custom), intermediate outputs, fan-out patterns
   - **Code Examples**: Multi-expert analysis, custom summarizer, streaming setup (C#/Python)
   - **Status**: ✅ Complete (6000+ words)

4. **[2026-06-18]** NOTE: `orchestration-patterns/04-group-chat-orchestration`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat
   - **Dimensions**: Orchestrator-mediated collaboration, speaker selection (round-robin/agent-based/custom), context synchronization
   - **Code Examples**: Writer-reviewer workflow, custom selectors, iterative refinement (C#/Python)
   - **Status**: ✅ Complete (5500+ words)

5. **[2026-06-18]** NOTE: `orchestration-patterns/05-handoff-orchestration`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff
   - **Dimensions**: Agent-to-agent handoff, mesh topology, interactive/autonomous modes, tool approval, turn limits
   - **Code Examples**: Triage workflow, specialist routing, autonomous mode, tool approval handlers (C#/Python)
   - **Status**: ✅ Complete (6000+ words)

6. **[2026-06-18]** NOTE: `orchestration-patterns/06-multiple-agent-workflow-architecture`
   - **Source**: https://learn.microsoft.com/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation
   - **Dimensions**: Azure enterprise architecture, Container Apps, Foundry integration, Cosmos DB, code modernization use cases
   - **Code Examples**: None (architectural reference only)
   - **Status**: ✅ Complete (3000+ words)

7. **[2026-06-18]** NOTE: `orchestration-patterns/07-workflows-as-agents`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/as-agents
   - **Dimensions**: Composition pattern, unified agent API, session management, streaming, event conversion
   - **Code Examples**: Workflow.AsAIAgent(), session creation, serialization/resumption (C#/Python)
   - **Status**: ✅ Complete (5000+ words)

8. **[2026-06-18]** NOTE: `orchestration-patterns/08-durable-task-integration`
   - **Source**: https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework
   - **Dimensions**: Durable execution, checkpointing, failure recovery, multi-agent orchestration, Azure Functions hosting
   - **Code Examples**: Document publishing workflow, fan-out/fan-in patterns, Azure Functions setup (C#/Python)
   - **Status**: ✅ Complete (5800+ words)

9. **[2026-06-18]** NOTE: `orchestration-patterns/09-magentic-orchestration`
   - **Source**: https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic
   - **Dimensions**: Dynamic manager-based coordination, planning/replanning, stall detection, progress tracking, HITL plan review
   - **Code Examples**: Manager setup, specialized agents, workflow building, plan review patterns (C#/Python)
   - **Status**: ✅ Complete (5500+ words)

### Extraction Summary

**Total Output**: 9 structured research notes, ~40,000+ words
**Code Examples**: 16+ complete C# implementations, 16+ complete Python implementations
**Dimensions Covered**: 20+ unique research dimensions

**Pattern Statistics**:
- Sequential Pattern: Core for linear workflows; default behavior
- Concurrent Pattern: Parallel expert analysis; flexible aggregation
- Handoff Pattern: Agent-initiated mesh topology; specialist routing
- Group Chat Pattern: Orchestrator-mediated collaboration; flexible speaker selection
- Magentic Pattern: Planning + dynamic coordination; stall detection + replanning
- Durable Execution: Applies to any pattern; persistence + recovery
- Workflows as Agents: Meta-pattern for composition

**Coverage Matrix**:
| Dimension | Sequential | Concurrent | Handoff | Group Chat | Magentic | Durable | As-Agent |
|-----------|-----------|-----------|---------|-----------|---------|---------|----------|
| HITL | ✅ | ❌ | ✅ | ❌ | ✅ | ✅ | ✅ |
| Streaming | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| C# | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Python | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

### Key Findings

1. **HITL Integration**: 5 different HITL mechanisms across patterns (approval, tool-approval, plan-review, request-info)
2. **Streaming Architecture**: All patterns support event-based streaming for real-time visibility
3. **Composition**: Workflows can wrap orchestration and expose as agents for recursive composition
4. **Durable Execution**: Enterprise-grade fault tolerance requires durable task integration
5. **Progress Tracking**: Only Magentic has built-in stall detection + progress ledger
6. **Context Control**: Sequential offers full conversation vs. chain-only context options
7. **Aggregation**: Concurrent pattern supports pluggable aggregators beyond default

### Quality Assessment

- **Completeness**: All 9 planned notes completed ✅
- **Code Coverage**: Both C# and Python for all core patterns ✅
- **Architecture**: Enterprise reference included ✅
- **HITL Support**: Human oversight patterns documented ✅
- **Streaming**: Event architecture covered ✅

### Next Steps for Content Writer

1. Synthesize notes into learning pathway (L100–L400 progression)
2. Create architecture guide with pattern comparison matrix
3. Generate implementation tutorials per pattern
4. Build quick-reference decision flowchart
5. Develop cost/performance tradeoff analysis

**Session Completed**: 2026-06-18 15:30 UTC

---

## Content Writing Session — Introduction Section

**Session Date**: 2026-06-18  
**Phase**: Content Synthesis (Phase 4)  
**Target**: Write introduction section for 12-minute technical presentation

### Writing Activity

- **[2026-06-18]** WRITE: `output/introduction/section.md`
  - **Title**: Introduction to Microsoft Agent Framework Build 2026 Updates
  - **Status**: draft
  - **Purpose**: 12-minute technical presentation
  - **Target Audience**: Senior architects, solution engineers, code-first practitioners
  - **Word Count**: ~2,400 words
  - **Source Notes Used**: 16 research notes
    - 2 agent-harness-core-loop notes
    - 4 agent-capabilities notes
    - 4 advanced-features notes
    - 5 sdk-integrations notes
    - 9 orchestration-patterns notes
  - **Components Documented**: 13 (9 harness + 4 SDK)
  - **Key Themes**: 4 (safety, orchestration, persistence, ecosystem)
  - **Source Citations**: 11 official Microsoft Learn + GitHub URLs
  - **Diagrams Described**: 2 (pipeline flow, orchestration topologies)
  - **Quality**: Draft (ready for content reviewer)

### Content Structure

1. **Opening** (2 paragraphs) — Why Build 2026 matters: convergence of orchestration, integration, safety
2. **13 Components Overview** (2 tables) — 9 harness layers + 4 SDK integrations with status/capability
3. **Key Themes** (4 sections) — Safety, orchestration patterns, session persistence, ecosystem
4. **Architecture Visualization Guidance** (2 diagrams described) — Pipeline and orchestration topology
5. **12-Minute Deep-Dive Preview** (5 sections) — How content unfolds across presentation
6. **Call to Action** (1 paragraph) — Transition to detailed exploration
7. **Attribution** (11 sources) — Full source list from research notes

### Synthesis Method

- Extracted facts from 16 research notes across 5 areas
- Validated all claims against source URLs in research log
- Integrated component names and capabilities from multiple notes
- Cross-referenced orchestration patterns with agent harness layers
- Synthesized themes from safety, persistence, and ecosystem integration notes
- Maintained technical precision and direct tone for senior audience
- Used markdown formatting consistent with repo standards

### Notes Quality

- **Extracted**: 16 research notes (all in draft status)
- **Synthesized**: Introduction section (draft)
- **Citations**: 100% attribution (11 sources)
- **Code Examples**: 0 (introduction is narrative/overview only)
- **Tables**: 2 (components matrix)

### Next Steps

1. Quality review by content reviewer (accuracy, completeness, tone)
2. Copy editing (if needed)
3. Integration into presentation deck (slides.md)
4. Progression to remaining output sections:
   - Agent Harness Architecture Overview
   - Core Components Breakdown
   - Advanced Capabilities
   - SDK Integrations & Orchestration
   - Production Patterns & Implementation Guide
   - Use Cases and Architecture Examples

**Session Status**: COMPLETE  
**Time**: Content writing session (synthesis from 16 notes)  
**Output File**: `output/introduction/section.md` (2.4K words, draft status)

---

## Output Sections Written

### Section 1: Agent Harness Architecture Overview

**[2026-06-18]** WRITE: `output/agent-harness-architecture/section.md`

- **Synthesized from:**
  - `microsoft-learn-agent-loop-architecture.md` (agent loop lifecycle, context management, middleware)
  - `github-repository-patterns.md` (implementation patterns, extensibility model)
  
- **Content Structure:**
  1. Layered Pipeline Architecture (9 components, flow diagram, context providers)
  2. Agent Loop Lifecycle (4 phases: pre-execution, inference, tool invocation, post-execution)
  3. Key Design Decisions (composition over inheritance, state management, deterministic execution)
  4. Code Examples (basic creation, multi-turn sessions, custom context provider, function middleware)

- **Word Count:** 2,850 words
- **Code Examples:** 4 complete (2 C#, 2 Python, 1 multi-language pattern)
- **Diagrams Described:** 2 (request/response pipeline flow, middleware composition chain)
- **Source Citations:** 12 inline links to research notes
- **Status:** Draft (ready for content reviewer)
- **Target Audience Match:** Senior architects, solution engineers ✓
- **Purpose Fit:** 12-minute presentation section ✓

**Quality Notes:**
- All factual claims attributed to source URLs
- Code examples span both C# and Python
- Architecture explained at strategic (not tactical) level
- Practical extensibility guidance provided
- Within target page count (2-3 pages)

---

## Iteration 1 gap-fix extraction (deep reader)

- [2026-06-19T00:35:00Z] NOTE: sdk-integrations/iteration-1-durable-reliability-claim-boundary — Durable reliability claim boundary (verified support + explicit absence) (https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)
- [2026-06-19T00:36:00Z] NOTE: advanced-features/iteration-1-approval-boundaries-matrix — Approval boundaries matrix: tool approval vs runtime permissions vs workflow HITL (https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)
- [2026-06-19T00:37:00Z] NOTE: orchestration-patterns/iteration-1-magentic-caveats-guardrails — Magentic caveats and production guardrails (https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- [2026-06-19T00:38:00Z] NOTE: agent-harness-core-loop/iteration-1-canonical-pipeline-terminology-alignment — Canonical pipeline terminology alignment (https://learn.microsoft.com/agent-framework/agents/agent-pipeline)
- [2026-06-19T00:39:00Z] NOTE: orchestration-patterns/iteration-1-talk-fit-structure-cues — 12-minute talk-fit structure cues from official docs/samples (https://learn.microsoft.com/agent-framework/get-started/your-first-agent)

