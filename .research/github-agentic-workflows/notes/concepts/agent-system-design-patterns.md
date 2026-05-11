---
source_url: https://learn.microsoft.com/azure/databricks/generative-ai/guide/agent-system-design-patterns
source_title: Agent System Design Patterns — Azure Databricks
source_date: 2026-05-12
source_type: Microsoft Learn
area: concepts
dimensions:
  - design_patterns
  - complexity_levels
  - reasoning_loops
  - tool_calling
extracted: 2026-05-12
quality: draft
---

# Agent System Design Patterns & Complexity Levels

## Overview

Agent systems range from simple LLM calls to complex multi-agent orchestration. Each pattern represents an increasing level of autonomy, flexibility, and complexity.

**Key Principle**: "Start simple. Introduce more complex agentic behaviors when you truly need them for better flexibility or model-driven decisions."

## Design Pattern Progression

### Level 1: LLM + Prompt (Simplest)

**Definition**: Standalone LLM responds to prompts based on training data knowledge.

**Characteristics**:
- No external tools or data connections
- Customization via system prompts or embedded context
- Deterministic: same input → predictable output

**When to Use**:
- Simple or generic queries
- Quick prototyping for short-term use
- No need for real-world business data

**Advantages**:
- Very simple to implement
- Fast inference
- Easy to understand

**Considerations**:
- Often disconnected from real business data
- Limited to training data knowledge cutoff
- Cannot perform actions or retrieve current information

---

### Level 2: Deterministic Chain (Hard-Coded Steps)

**Definition**: LLM augmented with tool calling, but developer defines which tools run in which order with which parameters. No agent decision-making about tool selection.

**Example**: Basic RAG (Retrieval Augmented Generation) Chain
1. Retrieve top-k results from vector index
2. Augment prompt by combining user request + retrieved context
3. Generate response by sending augmented prompt to LLM

**Characteristics**:
- Predictable workflow for all requests
- Explicit control over execution flow
- No LLM-driven orchestration decisions

**When to Use**:
- Well-defined tasks with predictable workflows
- Consistency and auditing are priorities
- Minimize latency (fewer LLM calls)

**Advantages**:
- Highest predictability and auditability
- Lower latency (fewer LLM calls for orchestration)
- Easier to test and validate

**Considerations**:
- Limited flexibility for diverse requests
- Becomes complex as branches grow
- Requires significant refactoring for new capabilities

---

### Level 3: Single-Agent System (Moderate Autonomy)

**Definition**: LLM orchestrates a single coordinated reasoning loop. Agent adaptively decides which tools to use, when to make LLM calls, and when to stop. Supports dynamic, context-aware decisions.

**How It Works**:
1. Accept requests (user query + relevant context)
2. Reason about best response, deciding whether to call tools
3. Iterate: call LLM or tools repeatedly until objective achieved or condition met
4. Integrate tool outputs into conversation flow
5. Return cohesive response

**Example: Help Desk Agent Adaptive Behavior**
- Simple question ("What is returns policy?"): Respond directly from LLM knowledge
- Status query: Call `lookup_order(customer_id)` function
  - If tool returns "invalid order": Retry or ask for clarification
  - Continue until valid result obtained

**Characteristics**:
- Agent decides which tools to invoke based on reasoning
- Supports iteration and tool calling loops
- Adapts to novel or unexpected queries

**When to Use**:
- Varied queries within cohesive domain/product area
- Certain conditions warrant tool usage
- Need more flexibility than deterministic chains
- Don't need separate specialized agents

**Advantages**:
- Adapts to new/unexpected queries by choosing appropriate tools
- Can loop through repeated LLM calls or tool invocations
- Often the "sweet spot" for enterprise use cases
- Simpler to debug than multi-agent setups

**Considerations**:
- Must guard against infinite loops and repeated invalid tool calls
- Needs carefully designed prompts and constraints
- More complex than deterministic chains
- Iteration limits or timeouts required

---

### Level 4: Multi-Agent System (Complex Autonomy)

**Definition**: Two or more specialized agents with domain expertise, each with distinct tools. A coordinator/supervisor directs requests to appropriate agents or decides handoffs. Supervisor can be LLM or rule-based.

**Example: Customer Assistant Architecture**
```
Supervisor (Router)
  ├── Shopping Assistant Agent
  │   └── Tools: product search, reviews analysis
  └── Customer Support Agent
      └── Tools: returns, shipping, feedback
```

**Characteristics**:
- Each agent owns domain-specific expertise
- Each agent has specialized tool set
- Coordinator manages routing and handoffs
- Supports multi-step, multi-perspective reasoning

**When to Use**:
- Distinct problem areas or skill sets (coding agent vs. finance agent)
- Each agent needs domain-specific conversation history
- Too many tools to fit in single agent schema
- Need reflection, critique, or collaboration among agents

**Advantages**:
- Modular design enables specialized teams per agent
- Handles large, complex enterprise workflows
- Facilitates advanced multi-step or multi-perspective reasoning
- Can implement verification, critique patterns

**Considerations**:
- Requires strategy for routing between agents
- Overhead for logging, tracing, debugging
- Complex decisions about data/API access per agent
- Risk of infinite loops or indefinite task bouncing

---

## Complexity vs. Flexibility Tradeoff

| Pattern | Complexity | Autonomy | Flexibility | Auditability | Latency | Best For |
|---------|-----------|----------|-------------|--------------|---------|----------|
| LLM + prompt | Very low | None | Low | High | Fastest | Generic Q&A |
| Deterministic chain | Low | None | Moderate | High | Low | Well-defined workflows |
| Single agent | Moderate | Moderate | High | Moderate | Moderate | Domain-specific tasks |
| Multi-agent | High | High | Very high | Low | Highest | Complex enterprise workflows |

## Practical Development & Production Guidance

### Key Development Principles

**Prompts and Tools**:
- Keep prompts clear and minimal to avoid contradictions and hallucinations
- Provide only tools/context agent requires, not unbounded APIs
- Choose tool approach deliberately during design phase

**Logging and Observability**:
- Implement detailed logging for each request, agent plan, and tool call
- Store logs securely; be mindful of PII in conversation data
- Use structured tracing to correlate agent decisions with outcomes

### Testing & Iteration

**Evaluation**:
- Use evaluation metrics for both development and production
- Gather human feedback to calibrate automated metrics

**Error Handling**:
- Plan for tool/LLM failures; timeouts and malformed responses break workflows
- Implement retry strategies and fallback logic
- Include simpler fallback chains when advanced features fail

**Iterative Improvement**:
- Expect to refine prompts and agent logic over time
- Version changes to prompts for tracking and rollbacks
- As metrics defined, consider automated optimization methods

### Production Readiness

**Model Updates & Versioning**:
- LLM behavior shifts when providers update models
- Use version pinning and frequent regression tests
- Ensure agent logic remains robust through model updates

**Cost & Latency Optimization**:
- Each additional LLM or tool call increases token usage and latency
- Combine steps or cache repeated queries where possible
- Monitor token usage and optimize prompts for efficiency

**Security & Sandboxing**:
- If agent updates records or runs code, sandbox or require human approval
- Critical in enterprise/regulated environments
- Use sandboxed execution for production tool runs

## Practical Advice: When to Use Each Pattern

**Start Simple**:
1. If only a straightforward chain needed → deterministic chain
2. Gradually add complexity based on requirements
3. As needs grow (dynamic queries, flexible data) → single agent
4. If distinct domains/tasks/contexts → multi-agent system
5. Many real-world systems combine patterns (mostly deterministic with one dynamic step)

---

## Key Distinctions

**From GitHub Agentic Workflows Perspective**:
- GitHub Agentic Workflows typically implement **single-agent** or **multi-agent** patterns
- Safe outputs + threat detection add security layers missing in basic agent systems
- Reasoning loops are constrained by workflow triggers and timeout limits
- Tool access controlled through MCP integration and GitHub toolsets

## Questions Raised

- How do infinite loop detection and iteration limits interact with multi-turn reasoning?
- What's the relationship between agent autonomy and guardrails effectiveness?
- How do specialized agents maintain consistency in multi-perspective reasoning?
