# Learning Pathway: Microsoft Agent Framework for Python with Microsoft Foundry

> A structured technical learning pathway for Microsoft Partners to build
> expertise in **Microsoft Agent Framework for Python** when used with
> **Microsoft Foundry Agent Service**, progressing from foundational concepts
> (L100) through expert-level skills (L400).

| | |
|---|---|
| **Topic** | Microsoft Agent Framework for Python with Microsoft Foundry Agent Service |
| **Goal** | Enable Microsoft Services Partner engineers to build, evaluate, and deploy production-grade agentic AI applications using the Microsoft Agent Framework for Python with Microsoft Foundry Agent Service. |
| **Generated** | 2026-03-11 |
| **Target Audience** | Microsoft Partners, AI Engineers, Python Developers |
| **Estimated Total Duration** | 60-80 hours |

> **Important — Microsoft Agent Framework (Preview)**: Microsoft Agent
> Framework is currently in public preview. It combines AutoGen's simple agent
> abstractions with Semantic Kernel's enterprise features and adds graph-based
> workflows for explicit multi-agent orchestration. The framework is the direct
> successor to both Semantic Kernel and AutoGen, created by the same teams.
> Some Microsoft Learn training modules still reference Semantic Kernel or
> Azure AI Foundry Agent Service SDK directly — where these remain relevant
> for Agent Framework concepts (the `agent-framework` Python package wraps
> the same underlying providers), they are included with a note. Always use
> the latest `agent-framework` package from PyPI and the documentation at
> [learn.microsoft.com/agent-framework/](https://learn.microsoft.com/agent-framework/).

## How to Use This Pathway

This pathway is organized into four progressive levels. Start at L100 and
work through each level sequentially. Each level builds on knowledge from
the previous one:

- **L100 — Foundational**: Start here if you are new to generative AI,
  AI agents, or Microsoft Foundry
- **L200 — Intermediate**: Move here once you understand core concepts —
  build your first agents using Agent Framework for Python with Foundry
- **L300 — Advanced**: Tackle these after hands-on experience — multi-agent
  workflows, MCP integration, hosting, and evaluation
- **L400 — Expert**: For deep specialization — production governance,
  security, enterprise-scale operations, and advanced orchestration patterns

Within each level, resources are ordered from simpler to more complex.

---

## L100 — Foundational

> **Goal**: Understand what generative AI is, what AI agents are, what
> Microsoft Foundry provides, and how Microsoft Agent Framework fits into
> the ecosystem.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Introduction to generative AI concepts](https://learn.microsoft.com/training/modules/fundamentals-generative-ai/) | Module | 40 min | Explore how language models enable AI applications to generate original content. Covers transformers, prompt basics, and responsible AI concepts. | Establishes the foundational understanding of LLMs and generative AI that underpins all agent development. |
| 2 | [Microsoft Azure AI Fundamentals: Generative AI](https://learn.microsoft.com/training/paths/introduction-generative-ai/) | Learning Path (4 Modules) | 3 hr | Comprehensive beginner path covering generative AI concepts, Azure AI development preparation, responsible AI, and initial agent development concepts. | Provides the complete beginner on-ramp to Azure AI and introduces Foundry for the first time with hands-on exercises. |
| 3 | [Get started with AI agent development on Azure](https://learn.microsoft.com/training/modules/ai-agent-fundamentals/) | Module | 30 min | Learn what AI agents are, explore development options on Azure, and create and test a basic agent in the Foundry portal. | Directly introduces the agent concepts and Foundry Agent Service that this entire pathway builds upon. |
| 4 | [Introduction to Microsoft AI agent solutions](https://learn.microsoft.com/training/modules/introduction-microsoft-ai-agent-solutions/) | Module | 45 min | Explore the Microsoft AI agent ecosystem, compare Microsoft 365 Copilot extensibility with custom agent development, and identify when to build custom agents. | Helps learners understand the broader Microsoft agent ecosystem and where Microsoft Agent Framework fits among development options. |
| 5 | [Choose a custom AI agent development path](https://learn.microsoft.com/training/modules/choose-ai-agent-development-path/) | Module | 45 min | Compare development paths for custom AI agents including Copilot Studio, Azure AI Foundry, and Microsoft 365 Agents SDK. Evaluate trade-offs between approaches. | Clarifies why and when to choose Microsoft Agent Framework for Python over other development options — critical decision-making context. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | 21-lesson comprehensive course covering fundamentals of building Generative AI apps. Covers LLMs, prompt engineering, RAG, and building AI apps. | Provides a self-paced, hands-on foundation in generative AI concepts before diving into Agent Framework-specific development. | 2026-03 |
| 2 | [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | 10-lesson course covering fundamentals of building AI agents, including agent design patterns, tool use, agentic RAG, and multi-agent systems. | Directly covers the agentic AI concepts learners will implement with Agent Framework later in the pathway. | 2026-03 |

---

## L200 — Intermediate

> **Goal**: Build hands-on skills with Microsoft Agent Framework for Python,
> creating agents with tools, multi-turn conversations, memory, and
> Foundry Agent Service integration.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Apply prompt engineering with Azure OpenAI Service](https://learn.microsoft.com/training/modules/apply-prompt-engineering-azure-openai/) | Module | 1 hr | Learn prompt engineering techniques including clear instructions, output composition, and contextual content to optimize Azure OpenAI model responses. | Effective prompt engineering is critical for crafting agent instructions that drive reliable agent behavior in Agent Framework. |
| 2 | [Get started with Agent Framework (6-step tutorial)](https://learn.microsoft.com/agent-framework/get-started/) | Tutorial (6 Steps) | 4 hr | Build an AI agent from scratch, step by step: create your first agent, add tools, multi-turn conversations, memory and persistence, workflows, and hosting. All steps have Python samples. | **Core hands-on tutorial for this pathway.** Walks through the complete Agent Framework Python development experience from first agent to hosted deployment. |
| 3 | [Microsoft Agent Framework overview (Python)](https://learn.microsoft.com/agent-framework/overview/) | Documentation | 30 min | Overview of Agent Framework capabilities: agents, workflows, model clients, session management, context providers, middleware, and MCP support. Includes Python quickstart code. | Essential orientation to the framework's architecture and capabilities — required reading before building production agents. |
| 4 | [Microsoft Foundry Agents provider (Python)](https://learn.microsoft.com/agent-framework/agents/providers/azure-ai-foundry) | Documentation | 30 min | Use existing Foundry agents by ID, create persistent agents, configure reasoning and RAI options, function tools, code interpreter, and streaming with the Foundry provider. | Teaches how to connect Agent Framework Python agents to Microsoft Foundry Agent Service — the core integration this pathway focuses on. |
| 5 | [Azure OpenAI Agents provider (Python)](https://learn.microsoft.com/agent-framework/agents/providers/azure-openai) | Documentation | 30 min | Use Azure OpenAI Responses, Chat Completion, and Assistants clients with Agent Framework. Covers function tools, multi-turn conversations, and streaming. | Azure OpenAI is the primary model backend for Foundry agents — this teaches using all three client types from Agent Framework Python. |
| 6 | [Develop AI Agents on Azure (AI-3026)](https://learn.microsoft.com/training/paths/develop-ai-agents-on-azure/) | Learning Path (7 Modules) | 8 hr | Core learning path covering agent fundamentals, Foundry Agent Service, custom tools, Semantic Kernel agents, multi-agent orchestration, connected agents, and MCP tool integration. | Comprehensive training path that covers the complete agent development lifecycle. Note: Modules use Semantic Kernel SDK examples but concepts apply directly to Agent Framework which builds on Semantic Kernel. |
| 7 | [Develop an AI agent with Azure AI Foundry Agent Service](https://learn.microsoft.com/training/modules/develop-ai-agent-azure/) | Module | 1 hr | Build an agent using Foundry Agent Service including describing agent purpose, using key features, building with the SDK, and integrating into applications. | Teaches the foundational SDK patterns for creating and managing agents in Foundry (New) that Agent Framework wraps. |
| 8 | [Integrate custom tools into your agent](https://learn.microsoft.com/training/modules/build-agent-with-custom-tools/) | Module | 1 hr | Extend agent capabilities by integrating custom tools including Azure Functions, OpenAPI endpoints, and code interpreter. | Agents need tools to take actions — this module teaches how to connect agents to enterprise systems and custom logic. |
| 9 | [Tools overview (Python)](https://learn.microsoft.com/agent-framework/agents/tools/) | Documentation | 30 min | Complete guide to Agent Framework tool types: function tools, code interpreter, file search, web search, image generation, hosted MCP tools, and local MCP tools. Includes provider support matrix. | Reference for all tool capabilities available in Agent Framework Python — essential for knowing what's possible when designing agents. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [microsoft/agent-framework (Python samples)](https://github.com/microsoft/agent-framework/tree/main/python/samples) | Official Python samples for Agent Framework organized by topic: getting started (01), agents and providers (02), workflows (03), and hosting (04). Includes runnable examples for all framework features. | The primary hands-on reference for Agent Framework Python development — every code sample in the documentation links back to this repository. | 2026-03 |
| 2 | [Azure-Samples/azure-search-openai-demo](https://github.com/Azure-Samples/azure-search-openai-demo) | End-to-end Python reference solution for RAG using Azure AI Search with Azure OpenAI. Includes chat and Q&A interfaces with enterprise data. Deployable via `azd`. | Demonstrates RAG patterns that agents use for knowledge grounding — directly applicable to building knowledge-augmented Agent Framework agents. | 2026-03 |

---

## L300 — Advanced

> **Goal**: Master multi-agent workflows, orchestration patterns, MCP
> integration, declarative agents, Azure Functions hosting, and agent
> evaluation with Microsoft Foundry.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Agent Framework Workflows](https://learn.microsoft.com/agent-framework/workflows/) | Documentation | 1 hr | Core concepts for graph-based workflows: executors, edges, events, and workflow builder. Links to Python getting-started samples for all orchestration patterns. | Workflows are the Agent Framework mechanism for multi-agent orchestration — essential for building complex agentic applications. |
| 2 | [Orchestrate a multi-agent solution using Semantic Kernel](https://learn.microsoft.com/training/modules/orchestrate-semantic-kernel-multi-agent-solution/) | Module | 1.5 hr | Build multi-agent solutions with agent group chat, custom selection strategies, and termination strategies. | Multi-agent orchestration concepts apply directly to Agent Framework workflows — this training module provides structured learning with exercises. |
| 3 | [Develop a multi-agent solution with Azure AI Foundry Agent Service](https://learn.microsoft.com/training/modules/develop-multi-agent-azure-ai-foundry/) | Module | 1 hr | Design multi-agent solutions using connected agents in Foundry Agent Service, defining main agent tools and connected agent roles. | Connected agents in Foundry enable modular, collaborative workflows — teaches the Foundry-native approach to multi-agent systems. |
| 4 | [Integrate MCP Tools with Azure AI Agents](https://learn.microsoft.com/training/modules/connect-agent-to-mcp-tools/) | Module | 1 hr | Enable dynamic tool access for Azure AI agents by connecting MCP-hosted tools and integrating them into agent workflows. | MCP (Model Context Protocol) is the standard for agent-tool interoperability — essential for extensible agent architectures. |
| 5 | [Using local MCP tools with Agents (Python)](https://learn.microsoft.com/agent-framework/agents/tools/local-mcp-tools) | Documentation | 30 min | Connect to MCP servers via stdio, HTTP/SSE, and WebSocket. Covers MCPStdioTool, MCPStreamableHTTPTool, MCPWebsocketTool, and exposing an agent as an MCP server. | Teaches all three MCP connection types in Agent Framework Python — foundational for building interoperable agent systems. |
| 6 | [Using hosted MCP tools with Foundry Agents (Python)](https://learn.microsoft.com/agent-framework/agents/tools/hosted-mcp-tools) | Documentation | 30 min | Extend Foundry agent capabilities with hosted MCP tools managed by the Foundry service. Covers basic and multi-tool MCP configuration with tool approval workflows. | Hosted MCP tools eliminate infrastructure management — teaches the Foundry-managed approach to MCP integration. |
| 7 | [Declarative Agents (Python)](https://learn.microsoft.com/agent-framework/agents/declarative) | Documentation | 30 min | Define agent configuration using YAML or JSON files instead of programmatic code. Supports inline YAML and loading from files. | Declarative agents enable portable, auditable agent definitions — critical for enterprise deployment and configuration management. |
| 8 | [Workflow orchestration patterns (Python)](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent) | Documentation Series | 2 hr | Complete guide to orchestration patterns: Sequential, Concurrent, Handoff, Group Chat, and Magentic. Each pattern includes Python code samples and architecture diagrams. | Provides the orchestration pattern knowledge needed to design complex agentic solutions for different use cases. |
| 9 | [Azure Functions Durable Agents (Python)](https://learn.microsoft.com/agent-framework/integrations/azure-functions) | Documentation + Tutorial | 2 hr | Host agents as durable Azure Functions with built-in HTTP endpoints, automatic state persistence, failure recovery, and deterministic multi-agent orchestrations including human-in-the-loop. | Azure Functions hosting is a key production deployment pattern — teaches serverless agent hosting with durable state management. |
| 10 | [Implement a responsible generative AI solution in Azure AI Foundry](https://learn.microsoft.com/training/modules/responsible-ai-studio/) | Module | 1 hr | Configure content filters, implement responsible AI practices, and use safety evaluation tools in Foundry. | Responsible AI configuration is mandatory for production agents — teaches the content safety and filtering controls in Foundry. |

### Product Documentation (Supplementary)

> Only included where training modules and workshops do not cover a critical
> topic.

| # | Resource | Description | Relevance |
|---|----------|-------------|-----------|
| 1 | [Tutorial: Idea to prototype — Build and evaluate an enterprise agent](https://learn.microsoft.com/azure/foundry/tutorials/developer-journey-idea-to-prototype) | End-to-end tutorial building a Modern Workplace Assistant combining SharePoint knowledge, MCP tools, batch evaluation, and error handling using the Microsoft Foundry SDK. | The most complete first-party tutorial demonstrating enterprise agent patterns with evaluation — essential hands-on practice for building production agents. |
| 2 | [Tutorial: Build an agentic web app in Azure App Service (Python)](https://learn.microsoft.com/azure/app-service/tutorial-ai-agent-web-app-langgraph-foundry-python) | Add agentic capability to an existing Python web application using Microsoft Agent Framework and Foundry Agent Service with OpenAPI tools. | Demonstrates integrating agents into existing web applications — a common enterprise scenario for partners. |
| 3 | [Use Agent Framework in a Python app with Azure App Configuration](https://learn.microsoft.com/azure/azure-app-configuration/howto-ai-agent-config-python) | Build an agent chat application using Azure App Configuration to load agent YAML specifications that define behavior, prompts, and model configurations. | Shows how to externalize agent configuration for enterprise environments using declarative specs and Azure App Configuration. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [microsoft/agent-framework (Python workflow samples)](https://github.com/microsoft/agent-framework/tree/main/python/samples/03-workflows) | Official workflow samples: sequential, concurrent, handoff, group chat, and Magentic orchestrations. Includes human-in-the-loop and checkpointing patterns. | Primary hands-on reference for implementing multi-agent workflows in Agent Framework Python. | 2026-03 |
| 2 | [microsoft/agent-framework (Python hosting samples)](https://github.com/microsoft/agent-framework/tree/main/python/samples/04-hosting) | Official hosting samples: Azure Functions single and multi-agent hosting, durable agent tutorials, and orchestration patterns. | Teaches production-ready hosting patterns for deploying Agent Framework agents on Azure. | 2026-03 |
| 3 | [Azure-Samples/agent-openai-python-prompty](https://github.com/Azure-Samples/agent-openai-python-prompty) | Build, run, and evaluate a customer support agent using Azure AI Foundry, Azure OpenAI, and Prompty. Includes multi-turn conversation and evaluation workflows. | Demonstrates the complete agent lifecycle from development through evaluation — directly applicable to the Foundry development workflow. | 2026-01 |

---

## L400 — Expert

> **Goal**: Achieve deep specialization in production governance, security
> architecture, enterprise-scale agent operations, observability, advanced
> orchestration patterns, and model optimization.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Configure AI-ready infrastructure with Microsoft Foundry](https://learn.microsoft.com/training/modules/configure-ai-ready-infrastructure/) | Module | 1.5 hr | Configure hub-and-project governance models, networking, identity, and security for enterprise Foundry deployments. | Enterprise-scale Foundry deployments require proper infrastructure governance — critical for partners delivering production solutions. |
| 2 | [Implement secure AI-ready infrastructure with Azure services](https://learn.microsoft.com/training/modules/implement-secure-ai-infrastructure/) | Module | 2 hr | Implement identity, networking, and governance controls for AI workloads using Azure services, including private endpoints and managed identities. | Security hardening is mandatory for enterprise AI deployments — covers the infrastructure security patterns. |
| 3 | [Operationalize AI responsibly with Azure AI Foundry](https://learn.microsoft.com/training/paths/operationalize-ai-responsibly/) | Learning Path | 4 hr | Learn to operationalize responsible AI practices including evaluation, monitoring, and governance workflows in Foundry. | Bridges the gap between development and production by teaching how to operationalize responsible AI controls for deployed agents. |
| 4 | [Observability (Python)](https://learn.microsoft.com/agent-framework/agents/observability) | Documentation | 1 hr | Enable OpenTelemetry integration for Agent Framework Python agents. Emit traces, logs, and metrics according to OpenTelemetry GenAI Semantic Conventions. | Production observability is non-negotiable — this covers the tracing and metrics infrastructure for monitoring Agent Framework agents. |
| 5 | [AutoGen to Agent Framework Migration Guide](https://learn.microsoft.com/agent-framework/migration-guide/from-autogen/) | Documentation | 1 hr | Comprehensive mapping from AutoGen patterns to Agent Framework equivalents: single-agent, multi-agent, tools, MCP, human-in-the-loop, and checkpointing. | Essential for teams migrating from AutoGen — provides feature-by-feature mapping and code translation guidance. |

### Product Documentation (Supplementary)

> Only included where training modules and workshops do not cover a critical
> topic.

| # | Resource | Description | Relevance |
|---|----------|-------------|-----------|
| 1 | [Publish and share agents in Microsoft Foundry](https://learn.microsoft.com/azure/foundry/agents/how-to/publish-agent) | Complete guide to publishing agents as Agent Applications with stable endpoints, dedicated Entra agent identity, RBAC, and Azure Policy integration. | Publishing agents is a critical production step — learners must understand Agent Applications, deployments, and identity management. |
| 2 | [Configure tracing for AI agent frameworks](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-framework) | Set up OpenTelemetry tracing for Agent Framework and Semantic Kernel with Foundry. Native integration — no additional code needed when tracing is enabled for your project. | Foundry-native tracing for Agent Framework agents — critical for production debugging and monitoring. |
| 3 | [AI agent orchestration design patterns](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Architecture Center reference covering agent orchestration patterns including single-agent, multi-agent, supervisor, hierarchical, concurrent, handoff, and Magentic patterns. | Advanced orchestration patterns are essential for designing complex agentic solutions in customer engagements. |
| 4 | [Connect an AI gateway to Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/how-to/ai-gateway) | Use Azure API Management as an AI gateway for Foundry agents to implement rate limiting, token management, content safety, and load balancing. | API Management as an AI Gateway is an enterprise pattern for governing agent traffic at scale. |
| 5 | [Responsible AI for Microsoft Foundry](https://learn.microsoft.com/azure/foundry/responsible-use-of-ai-overview) | Comprehensive overview of building trustworthy AI agents: Discover, Protect, and Govern patterns for content risks, safety evaluations, guardrails, and compliance. | Partners must demonstrate responsible AI competency — covers the Discover/Protect/Govern framework. |
| 6 | [Cloud Adoption Framework: AI Agents](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/) | Enterprise adoption guidance covering business strategy, technology planning, organizational readiness, governance, security, and build processes for AI agents at scale. | The CAF AI Agents guidance provides the enterprise-level planning framework that partners need for customer engagements. |
| 7 | [Governance and security for AI agents across the organization](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization) | Enterprise governance including data governance, compliance, Purview integration, Azure Policy for model deployment, agent identity management, and responsible AI enforcement. | Partners delivering enterprise AI solutions must understand organizational governance for production agent deployments. |
| 8 | [Microsoft Foundry SDK overview](https://learn.microsoft.com/azure/foundry/how-to/develop/sdk-overview) | Explains when to use Foundry SDK, OpenAI SDK, Foundry Tools SDKs, and Agent Framework — including `azure-ai-projects` 2.x and `azure-ai-agents` 1.x. | Clarifies the SDK landscape which is essential for making correct architecture decisions when integrating Agent Framework with Foundry. |
| 9 | [Python 2026 Significant Changes Guide](https://learn.microsoft.com/agent-framework/support/upgrade/python-2026-significant-changes) | Breaking changes and API evolution for Agent Framework Python: renamed types, declarative workflow runtime, MCP improvements, and new provider patterns. | Staying current with API changes is essential for maintaining production Agent Framework applications during the preview period. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [microsoft/agent-framework (Python agent provider samples)](https://github.com/microsoft/agent-framework/tree/main/python/samples/02-agents) | Advanced agent samples covering all providers (Azure OpenAI, Foundry, Anthropic, Ollama), custom agents, observability with OpenTelemetry, and tool integration patterns. | Provides production-quality reference implementations for all Agent Framework provider patterns in Python. | 2026-03 |

---

## Adjacent Learning Pathways

The following related technology topics complement this pathway. Consider
creating Learning Pathways for these topics as next steps:

| # | Technology | Relationship | Why It's Relevant |
|---|------------|--------------|-------------------|
| 1 | Microsoft Foundry & Agentic AI on Azure | Complementary | Broader Foundry ecosystem coverage including Azure AI Search, RAG patterns, and Foundry Agent Service features beyond Agent Framework. |
| 2 | Azure API Management (AI Gateway) | Complementary | Governs AI model traffic with rate limiting, caching, content safety, and load balancing — essential for production agent deployments at enterprise scale. |
| 3 | Azure AI Search & RAG Patterns | Complementary | Knowledge grounding for agents using vector search, semantic ranking, and retrieval augmented generation — a key capability for enterprise agents. |
| 4 | Azure Functions & Durable Functions | Prerequisite | Deeper Azure Functions expertise helps with serverless agent hosting, durable orchestrations, and event-driven agent architectures. |
| 5 | Responsible AI & Azure Content Safety | Complementary | Content filtering, jailbreak detection, and safety evaluation services that protect agents in production environments. |
| 6 | Microsoft 365 Copilot Extensibility | Next Step | Extend agents built with Agent Framework and Foundry to Microsoft 365 Copilot and Teams, reaching users in their daily productivity tools. |

---

## Next Steps

- **Certifications**:
  [AI-3026 Applied Skills: Develop AI Agents on Azure](https://learn.microsoft.com/credentials/applied-skills/develop-ai-agents-azure/),
  [AI-102: Azure AI Engineer Associate](https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/)
- **Community**:
  [Microsoft Agent Framework GitHub Discussions](https://github.com/microsoft/agent-framework/discussions),
  [Microsoft Foundry Tech Community](https://techcommunity.microsoft.com/category/azure-ai-services),
  [Semantic Kernel GitHub Discussions](https://github.com/microsoft/semantic-kernel/discussions)
- **Stay Current**: Bookmark the
  [Microsoft Agent Framework documentation](https://learn.microsoft.com/agent-framework/)
  and
  [Foundry Agent Service documentation](https://learn.microsoft.com/azure/foundry/agents/overview)
  for the latest updates. This is a rapidly evolving area — Agent Framework
  is in public preview. Verify links periodically as content may be updated
  or reorganized.
- **Key Python Packages**:
  [`agent-framework`](https://pypi.org/project/agent-framework/) — the core
  framework,
  [`agent-framework-azurefunctions`](https://pypi.org/project/agent-framework-azurefunctions/) —
  Azure Functions hosting,
  [`agent-framework-declarative`](https://pypi.org/project/agent-framework-declarative/) —
  declarative YAML agents,
  [`azure-ai-projects`](https://pypi.org/project/azure-ai-projects/) —
  Foundry project access,
  [`azure-ai-agents`](https://pypi.org/project/azure-ai-agents/) —
  Foundry agent lifecycle management
