# Learning Pathway: Microsoft Foundry & Agentic AI on Azure

> A structured technical learning pathway for Microsoft Partners to build
> expertise in **Microsoft Foundry (New) and Agentic AI on Azure**,
> progressing from foundational concepts (L100) through expert-level skills
> (L400).

| | |
|---|---|
| **Topic** | Microsoft Foundry (New), Foundry Agent Service, Azure AI Search, Semantic Kernel, and Agentic AI on Azure |
| **Goal** | Enable Microsoft SI Partner engineers to build, evaluate, monitor, govern, and publish production-grade AI agents and agentic workflows using Microsoft Foundry (New), Azure AI Search, and key SDKs — to obtain an AI Specialization designation |
| **Generated** | 2026-03-11 |
| **Target Audience** | Microsoft Partners, AI Engineers, Solution Architects |
| **Estimated Total Duration** | 80-100 hours |

> **Important — Foundry (New) vs. Foundry (Classic)**: This pathway targets
> **Microsoft Foundry (New)** exclusively. Foundry Hubs are deprecated and
> Microsoft Foundry (Classic) should be avoided. Some Microsoft Learn content
> may reference "Azure AI Foundry" or "Azure AI Studio" — these names have
> been consolidated into **Microsoft Foundry**. Where training modules still
> use older naming but remain relevant for Foundry (New) concepts, they are
> included with a note. Always use the Foundry (New) portal at
> [ai.azure.com](https://ai.azure.com) and the latest SDKs
> (`azure-ai-projects` 2.x+, `azure-ai-agents` 1.x+).

## How to Use This Pathway

This pathway is organized into four progressive levels. Start at L100 and
work through each level sequentially. Each level builds on knowledge from
the previous one:

- **L100 — Foundational**: Start here if you are new to generative AI,
  Microsoft Foundry, or AI agents
- **L200 — Intermediate**: Move here once you understand core concepts —
  build your first agents and integrate Azure OpenAI and Search
- **L300 — Advanced**: Tackle these after hands-on experience — multi-agent
  solutions, RAG patterns, publishing, and evaluation
- **L400 — Expert**: For deep specialization — production governance,
  security, architecture patterns, and enterprise-scale operations

Within each level, resources are ordered from simpler to more complex.

---

## L100 — Foundational

> **Goal**: Understand what generative AI is, what Microsoft Foundry provides,
> what AI agents are, and how Azure AI Search enables knowledge grounding.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Introduction to generative AI concepts](https://learn.microsoft.com/training/modules/fundamentals-generative-ai/) | Module | 40 min | Explore how language models enable AI applications to generate original content based on natural language input. Covers transformers, prompt basics, and responsible AI concepts. | Establishes the foundational understanding of LLMs and generative AI that underpins all agent development in Foundry. |
| 2 | [Microsoft Azure AI Fundamentals: Generative AI](https://learn.microsoft.com/training/paths/introduction-generative-ai/) | Learning Path (4 Modules) | 3 hr | Comprehensive beginner path covering generative AI concepts, Azure AI development preparation, responsible AI in Foundry, and initial agent development concepts. | Provides the complete beginner on-ramp to Azure AI and introduces Foundry for the first time with hands-on exercises. |
| 3 | [Get started with AI agent development on Azure](https://learn.microsoft.com/training/modules/ai-agent-fundamentals/) | Module | 30 min | Learn what AI agents are, explore development options on Azure, and create and test a basic agent in the Foundry portal. | Directly introduces the agent concepts and Foundry Agent Service that this entire pathway builds upon. |
| 4 | [Build a foundation to build AI agents and extend Microsoft 365 Copilot](https://learn.microsoft.com/training/paths/build-foundation-extend-microsoft-365-copilot/) | Learning Path (4 Modules) | 3 hr | Prepare to build AI agents using Copilot Studio, Azure AI Foundry, Microsoft 365 Agents Toolkit, and more. Explore agent use cases, development paths, and tools. | Helps learners understand the broader Microsoft agent ecosystem and choose the right development path (pro-code vs. low-code) for their scenario. |
| 5 | [Fundamentals of Knowledge Mining and Azure AI Search](https://learn.microsoft.com/training/modules/intro-to-azure-search/) | Module | 45 min | Understand how Azure AI Search implements AI through skillsets, how indexers automate data ingestion, and how to build and query a search index. | Azure AI Search is the primary knowledge grounding service for agents — this module establishes the search foundations needed for RAG patterns. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [microsoft/generative-ai-for-beginners](https://github.com/microsoft/generative-ai-for-beginners) | 21-lesson comprehensive course covering fundamentals of building Generative AI apps, by Microsoft Cloud Advocates. Covers LLMs, prompt engineering, RAG, and building AI apps. | Provides a self-paced, hands-on foundation in generative AI concepts before diving into Foundry-specific agent development. | 2026-03 |
| 2 | [microsoft/ai-agents-for-beginners](https://github.com/microsoft/ai-agents-for-beginners) | 10-lesson course covering fundamentals of building AI agents, including agent design patterns, tool use, agentic RAG, and multi-agent systems. | Directly covers the agentic AI concepts learners will implement in Foundry later in the pathway. | 2026-03 |

---

## L200 — Intermediate

> **Goal**: Build hands-on skills with Foundry Agent Service, Azure OpenAI,
> Semantic Kernel, Azure AI Search, and core agent development patterns.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Develop Generative AI solutions with Azure OpenAI in Foundry Models](https://learn.microsoft.com/training/paths/develop-ai-solutions-azure-openai/) | Learning Path (3 Modules) | 3 hr | Learn to build applications using Azure OpenAI, implement RAG with your own data, and generate images. Covers REST APIs, SDKs, and Azure AI Foundry integration. | Azure OpenAI models are the reasoning core of Foundry agents — this path teaches how to use them programmatically via SDKs. |
| 2 | [Apply prompt engineering with Azure OpenAI Service](https://learn.microsoft.com/training/modules/apply-prompt-engineering-azure-openai/) | Module | 1 hr | Learn prompt engineering techniques including clear instructions, output composition, and contextual content to optimize Azure OpenAI model responses. | Effective prompt engineering is critical for crafting agent system messages and instructions that drive reliable agent behavior. |
| 3 | [Develop AI Agents on Azure (AI-3026)](https://learn.microsoft.com/training/paths/develop-ai-agents-on-azure/) | Learning Path (7 Modules) | 8 hr | **Core learning path** covering agent fundamentals, Foundry Agent Service, custom tools, Semantic Kernel agents, multi-agent orchestration, connected agents, and MCP tool integration. | This is the primary learning path for the pathway — it covers the complete agent development lifecycle using Foundry Agent Service and Semantic Kernel. Note: Some modules may still reference earlier naming but content applies to Foundry (New). |
| 4 | [Develop an AI agent with Azure AI Foundry Agent Service](https://learn.microsoft.com/training/modules/develop-ai-agent-azure/) | Module | 1 hr | Build an agent using Foundry Agent Service including describing agent purpose, using key features, building with the SDK, and integrating into applications. | Teaches the foundational SDK patterns (`azure-ai-projects`, `azure-ai-agents`) for creating and managing agents in Foundry (New). |
| 5 | [Integrate custom tools into your agent](https://learn.microsoft.com/training/modules/build-agent-with-custom-tools/) | Module | 1 hr | Extend agent capabilities by integrating custom tools including Azure Functions, OpenAPI endpoints, and code interpreter. | Agents need tools to take actions — this module teaches how to connect agents to enterprise systems and custom logic. |
| 6 | [Develop an AI agent with Semantic Kernel](https://learn.microsoft.com/training/modules/develop-ai-agent-with-semantic-kernel/) | Module | 1 hr | Use Semantic Kernel to connect to a Foundry project, create agents using the Semantic Kernel SDK, and integrate plugin functions. | Semantic Kernel is a key orchestration SDK for building agents — this module teaches how it integrates with Foundry Agent Service. |
| 7 | [Create a knowledge mining solution with Azure AI Search](https://learn.microsoft.com/training/modules/ai-knowldge-mining/) | Module | 1 hr | Implement indexing with Azure AI Search, use AI skills to enrich data in an index, search an index, and persist extracted information in a knowledge store. | Teaches the AI Search capabilities that power knowledge grounding for agents including indexing, enrichment, and search. |
| 8 | [Develop a RAG-based solution with your own data using Azure AI Foundry](https://learn.microsoft.com/training/modules/build-copilot-ai-studio/) | Module | 1 hr | Ground your language model with RAG, index data with Azure AI Search, and build an agent using RAG on your own data in the Foundry portal. | RAG is the primary pattern for grounding agents with enterprise knowledge — this module connects Azure AI Search to Foundry agents. |
| 9 | [Perform vector search and retrieval in Azure AI Search](https://learn.microsoft.com/training/modules/improve-search-results-vector-search/) | Module | 1 hr | Learn vector search concepts, understand embeddings, and run vector search queries using the REST API. | Vector search enables semantic understanding in agent knowledge retrieval — essential for modern RAG implementations. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [Azure-Samples/azure-search-openai-demo](https://github.com/Azure-Samples/azure-search-openai-demo) | End-to-end reference solution for RAG using Azure AI Search with Azure OpenAI. Includes chat and Q&A interfaces with enterprise data. Deployable via `azd`. | Provides a complete, production-quality RAG reference implementation that demonstrates how Azure AI Search and OpenAI work together — the pattern agents use for knowledge grounding. | 2026-03 |
| 2 | [Azure-Samples/contoso-chat](https://github.com/Azure-Samples/contoso-chat) | Build a retail copilot with Azure AI Foundry, Azure AI Search, and Azure OpenAI. Covers prompt flow, evaluation, and deployment. | Demonstrates an end-to-end AI application using Foundry with RAG, evaluation, and deployment — directly applicable to agent development patterns. | 2026-02 |

---

## L300 — Advanced

> **Goal**: Master multi-agent orchestration, production publishing,
> evaluation frameworks, MCP integration, and advanced search patterns.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Orchestrate a multi-agent solution using Semantic Kernel](https://learn.microsoft.com/training/modules/orchestrate-semantic-kernel-multi-agent-solution/) | Module | 1.5 hr | Build multi-agent solutions with the Semantic Kernel SDK including agent group chat, custom selection strategies, and termination strategies. | Multi-agent orchestration is critical for complex agentic workflows — this teaches the patterns using Semantic Kernel's agent framework. |
| 2 | [Develop a multi-agent solution with Azure AI Foundry Agent Service](https://learn.microsoft.com/training/modules/develop-multi-agent-azure-ai-foundry/) | Module | 1 hr | Design multi-agent solutions using connected agents in Foundry Agent Service, defining main agent tools and connected agent roles. | Connected agents in Foundry enable modular, collaborative workflows — this is the Foundry-native approach to multi-agent systems. |
| 3 | [Integrate MCP Tools with Azure AI Agents](https://learn.microsoft.com/training/modules/connect-agent-to-mcp-tools/) | Module | 1 hr | Enable dynamic tool access for Azure AI agents by connecting MCP-hosted tools and integrating them into agent workflows. | MCP (Model Context Protocol) is the emerging standard for agent-tool interoperability — essential for extensible agent architectures. |
| 4 | [Implement Retrieval Augmented Generation (RAG) with Azure OpenAI models](https://learn.microsoft.com/training/modules/use-own-data-azure-openai/) | Module | 1 hr | Implement RAG using Azure OpenAI on your data to reference specific sources and ground model responses. | Deepens RAG implementation skills specifically with Azure OpenAI integration patterns used in production agents. |
| 5 | [Implement knowledge mining with Azure AI Search](https://learn.microsoft.com/training/paths/implement-knowledge-mining-azure-cognitive-search/) | Learning Path (8 Modules) | 8 hr | Comprehensive path covering custom skills, knowledge stores, advanced search features, semantic ranking, vector search, and solution maintenance. | Provides deep Azure AI Search expertise needed to build sophisticated knowledge grounding for production agents. |
| 6 | [Implement a responsible generative AI solution in Azure AI Foundry](https://learn.microsoft.com/training/modules/responsible-ai-studio/) | Module | 1 hr | Configure content filters, implement responsible AI practices, and use safety evaluation tools in Foundry. | Responsible AI configuration is mandatory for production agents — this teaches the content safety and filtering controls in Foundry. |
| 7 | [Operationalize AI responsibly with Azure AI Foundry](https://learn.microsoft.com/training/paths/operationalize-ai-responsibly/) | Learning Path | 4 hr | Learn to operationalize responsible AI practices including evaluation, monitoring, and governance workflows in Foundry. | Bridges the gap between development and production by teaching how to operationalize responsible AI controls for deployed agents. |

### Product Documentation (Supplementary)

> Only included where training modules and workshops do not cover a critical
> topic.

| # | Resource | Description | Relevance |
|---|----------|-------------|-----------|
| 1 | [Publish and share agents in Microsoft Foundry](https://learn.microsoft.com/azure/foundry/agents/how-to/publish-agent) | Complete guide to publishing agents as Agent Applications with stable endpoints, dedicated Entra agent identity, RBAC, and Azure Policy integration. Covers REST API and Foundry portal workflows. | Publishing agents is a critical production step not covered by any training module — learners must understand Agent Applications, deployments, and identity management. |
| 2 | [Publish agents to Microsoft 365 Copilot and Microsoft Teams](https://learn.microsoft.com/azure/foundry/agents/how-to/publish-copilot) | Distribute Foundry Agent Applications to Microsoft 365 Copilot and Teams channels including package creation and testing. | Extends agent reach to M365 channels — a key differentiator for enterprise agent deployments. |
| 3 | [Tutorial: Idea to prototype — Build and evaluate an enterprise agent](https://learn.microsoft.com/azure/foundry/tutorials/developer-journey-idea-to-prototype) | End-to-end tutorial building a Modern Workplace Assistant combining SharePoint knowledge, MCP tools, batch evaluation, and error handling using the Microsoft Foundry SDK. | The most complete first-party tutorial demonstrating enterprise agent patterns with evaluation — essential hands-on practice. |
| 4 | [Microsoft Foundry SDK overview](https://learn.microsoft.com/azure/foundry/how-to/develop/sdk-overview) | Explains when to use Foundry SDK, OpenAI SDK, Foundry Tools SDKs, and Agent Framework — including `azure-ai-projects` 2.x and `azure-ai-agents` 1.x. | Clarifies the SDK landscape which is essential for making correct architecture decisions when building agents. |
| 5 | [What is Foundry Agent Service?](https://learn.microsoft.com/azure/foundry/agents/overview) | Detailed overview of the agent factory model: models, customizability, knowledge and tools, orchestration, observability, and trust. | Provides the architectural mental model for how agents are assembled in Foundry (New) — required reading before production design. |

### GitHub Workshops & Labs

| # | Repository | Description | Relevance | Last Updated |
|---|------------|-------------|-----------|--------------|
| 1 | [Azure-Samples/azure-search-openai-demo-csharp](https://github.com/Azure-Samples/azure-search-openai-demo-csharp) | C# / .NET reference solution for RAG chat with Azure AI Search and Azure OpenAI. Includes Blazor UI, evaluation, and `azd` deployment. | Provides a .NET-specific enterprise RAG reference that extends the Python sample from L200 — important for partners working in the .NET ecosystem. | 2026-02 |
| 2 | [Azure-Samples/agent-openai-python-prompty](https://github.com/Azure-Samples/agent-openai-python-prompty) | Build, run, and evaluate a customer support agent using Azure AI Foundry, Azure OpenAI, and Prompty. Includes multi-turn conversation and evaluation workflows. | Demonstrates the complete agent lifecycle from development through evaluation — directly applicable to the Foundry (New) development workflow. | 2026-01 |

---

## L400 — Expert

> **Goal**: Achieve deep specialization in production governance, security
> architecture, enterprise-scale agent operations, model optimization, and
> advanced observability.

### Microsoft Learn Training

| # | Resource | Type | Est. Duration | Description | Relevance |
|---|----------|------|---------------|-------------|-----------|
| 1 | [Configure AI-ready infrastructure with Microsoft Foundry](https://learn.microsoft.com/training/modules/configure-ai-ready-infrastructure/) | Module | 1.5 hr | Configure hub-and-project governance models, networking, identity, and security for enterprise Foundry deployments. | Enterprise-scale Foundry deployments require proper infrastructure governance — critical for partners delivering production solutions. |
| 2 | [Implement secure AI-ready infrastructure with Azure services](https://learn.microsoft.com/training/modules/implement-secure-ai-infrastructure/) | Module | 2 hr | Implement identity, networking, and governance controls for AI workloads using Azure services, including private endpoints and managed identities. | Security hardening is mandatory for enterprise AI deployments and AI Specialization — this covers the infrastructure security patterns. |

### Product Documentation (Supplementary)

> Only included where training modules and workshops do not cover a critical
> topic.

| # | Resource | Description | Relevance |
|---|----------|-------------|-----------|
| 1 | [Responsible AI for Microsoft Foundry](https://learn.microsoft.com/azure/foundry/responsible-use-of-ai-overview) | Comprehensive overview of building trustworthy AI agents: Discover, Protect, and Govern patterns for content risks, safety evaluations, guardrails, and compliance. | Responsible AI is a cornerstone of AI Specialization — partners must demonstrate competency in the Discover/Protect/Govern framework. |
| 2 | [Cloud Adoption Framework: AI Agents](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/) | Enterprise adoption guidance covering business strategy, technology planning, organizational readiness, governance, security, and build processes for AI agents at scale. | The CAF AI Agents guidance provides the enterprise-level planning framework that partners need for customer engagements and AI Specialization. |
| 3 | [AI agent orchestration design patterns](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns) | Architecture Center reference covering agent orchestration patterns including single-agent, multi-agent, supervisor, hierarchical, and swarm patterns. | Advanced orchestration patterns are essential for designing complex agentic solutions in customer engagements. |
| 4 | [Configure tracing for AI agent frameworks](https://learn.microsoft.com/azure/foundry/observability/how-to/trace-agent-framework) | Set up OpenTelemetry tracing for Semantic Kernel, Agent Framework, and LangChain agent frameworks with Foundry. | Production observability is non-negotiable — this covers the tracing infrastructure needed for debugging and monitoring agents. |
| 5 | [Connect an AI gateway to Foundry Agent Service](https://learn.microsoft.com/azure/foundry/agents/how-to/ai-gateway) | Use Azure API Management as an AI gateway for Foundry agents to implement rate limiting, token management, content safety, and load balancing. | API Management as an AI Gateway is an enterprise pattern for governing agent traffic at scale — critical for production deployments. |
| 6 | [Microsoft Foundry fine-tuning considerations](https://learn.microsoft.com/azure/foundry/openai/concepts/fine-tuning-considerations) | Guidance on when and how to fine-tune models including distillation, style/tone modification, format optimization, and efficiency strategies. | Model optimization through fine-tuning and distillation reduces cost and latency for production agents — an expert-level capability. |
| 7 | [Microsoft Foundry Models overview](https://learn.microsoft.com/azure/foundry/concepts/foundry-models-overview) | Comprehensive overview of the 1,900+ model catalog including deployment types (Standard, Provisioned, Global, Data Zone), serverless APIs, and managed compute. | Understanding model deployment options and the catalog is essential for making cost-effective, performant architecture decisions. |
| 8 | [Governance and security for AI agents across the organization](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization) | Enterprise governance including data governance, compliance, Purview integration, Azure Policy for model deployment, agent identity management, and responsible AI enforcement. | Partners delivering enterprise AI solutions must understand organizational governance — this is directly relevant to AI Specialization requirements. |
| 9 | [Semantic Kernel Agent Framework](https://learn.microsoft.com/semantic-kernel/frameworks/agent/) | Complete reference for the Semantic Kernel Agent Framework covering agent types (ChatCompletionAgent, AzureAIAgent, OpenAIResponsesAgent), orchestration, plugins, and multi-agent patterns. | Deep Semantic Kernel expertise is required for building sophisticated agent orchestration in production — this is the definitive reference. |
| 10 | [Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/) | The open-source engine combining Semantic Kernel and AutoGen for building agentic AI applications, with providers for Foundry, OpenAI, and more. | Microsoft Agent Framework is the next evolution of the orchestration layer — partners should understand how it relates to and extends Semantic Kernel. |

---

## Adjacent Learning Pathways

The following related technology topics complement this pathway. Consider
creating Learning Pathways for these topics as next steps:

| # | Technology | Relationship | Why It's Relevant |
|---|------------|--------------|-------------------|
| 1 | Azure API Management (AI Gateway) | Complementary | Governs AI model traffic with rate limiting, caching, content safety, and load balancing — essential for production agent deployments. |
| 2 | Prompt Engineering & Prompt Flow | Complementary | Advanced prompt design and flow orchestration improve agent response quality and enable systematic prompt iteration. |
| 3 | Microsoft 365 Copilot Extensibility | Next Step | Extend agents built in Foundry to Microsoft 365 Copilot and Teams, reaching users in their daily productivity tools. |
| 4 | Azure Content Safety | Complementary | Provides the content filtering, jailbreak detection, and safety evaluation services that protect agents in production. |
| 5 | Microsoft Purview (AI Governance) | Complementary | Data governance and classification for AI data assets — required for enterprise compliance and regulatory requirements. |
| 6 | GitHub Copilot for AI Development | Complementary | Accelerates the agent development process itself using AI-assisted coding for Python, C#, and infrastructure code. |

---

## Next Steps

- **Certifications**: [AI-102: Azure AI Engineer Associate](https://learn.microsoft.com/credentials/certifications/azure-ai-engineer/),
  [AI-3026 Applied Skills: Develop AI Agents on Azure](https://learn.microsoft.com/credentials/applied-skills/develop-ai-agents-azure/),
  [AI Specialization designation](https://partner.microsoft.com/partnership/specialization/ai-and-machine-learning)
- **Community**: [Microsoft Foundry Tech Community](https://techcommunity.microsoft.com/category/azure-ai-services),
  [Semantic Kernel GitHub Discussions](https://github.com/microsoft/semantic-kernel/discussions)
- **Stay Current**: Bookmark the
  [Microsoft Foundry documentation](https://learn.microsoft.com/azure/foundry/)
  and
  [Foundry Agent Service documentation](https://learn.microsoft.com/azure/foundry/agents/overview)
  for the latest updates. This is a rapidly evolving area — verify links
  periodically as content may be updated or reorganized.
- **Key SDKs**: Familiarize yourself with
  [`azure-ai-projects`](https://pypi.org/project/azure-ai-projects/) (Python)
  / [`Azure.AI.Projects`](https://www.nuget.org/packages/Azure.AI.Projects)
  (.NET) for project and resource access, and
  [`azure-ai-agents`](https://pypi.org/project/azure-ai-agents/) (Python)
  / [`Azure.AI.Agents`](https://www.nuget.org/packages/Azure.AI.Agents)
  (.NET) for agent lifecycle management. Use
  [`semantic-kernel`](https://pypi.org/project/semantic-kernel/) (Python) /
  [`Microsoft.SemanticKernel`](https://www.nuget.org/packages/Microsoft.SemanticKernel)
  (.NET) for orchestration.
