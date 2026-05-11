## Research source discovery report

## Topic

- Topic slug: microsoft-foundry-hosted-agents
- Discovery date: 2026-05-11
- Source preference applied: Official Microsoft sources first (Microsoft Learn, Azure Architecture Center, Cloud Adoption Framework, Azure security baseline)

## Top 12 prioritized sources overall

1. [What are hosted agents?](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents) - Canonical concepts, runtime model, identity, scaling, state, and platform boundaries.
2. [Foundry Hosted Agents (Agent Framework hosting)](https://learn.microsoft.com/en-us/agent-framework/hosting/foundry-hosted-agent?pivots=programming-language-csharp) - Framework-level implementation path and deployment flow for hosted agents.
3. [Deploy a hosted agent](https://learn.microsoft.com/azure/foundry/agents/how-to/deploy-hosted-agent) - Authoritative deployment lifecycle (build, version, activate, invoke) and container requirements.
4. [Deep dive into Foundry Agent Service networking](https://learn.microsoft.com/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts) - Isolation architecture, data proxy model, and private networking details.
5. [Agent identity concepts in Microsoft Foundry](https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity) - Dedicated agent identity model, tool authentication modes, and constraints.
6. [Role-based access control for Microsoft Foundry](https://learn.microsoft.com/azure/foundry/concepts/rbac-foundry) - RBAC roles and authorization boundaries across Foundry resources.
7. [Foundry Agent Service limits, quotas, and regional support](https://learn.microsoft.com/azure/foundry/agents/concepts/limits-quotas-regions) - Capacity limits, scaling constraints, and regional availability.
8. [Memory in Microsoft Foundry Agent Service (preview)](https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-memory) - Persistent memory concepts and lifecycle semantics.
9. [Create and use memory in Foundry Agent Service (preview)](https://learn.microsoft.com/azure/foundry/agents/how-to/memory-usage#create-a-memory-store) - Practical API/SDK implementation details for memory stores.
10. [AI agent orchestration patterns](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview) - Architecture patterns for orchestrating single and multi-agent workflows.
11. [Single agent or multiple agents](https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents#when-to-start-with-a-multi-agent-system) - Decision framework for decomposition and orchestration strategy.
12. [Multitenancy and Azure OpenAI](https://learn.microsoft.com/azure/architecture/guide/multitenant/service/openai#isolation-models) - Isolation models and multitenancy tradeoffs relevant to hosted agent backends.

## Core concepts and deployment architecture

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| What are hosted agents? | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents | Primary concept page for hosted agents, architecture, lifecycle, and platform responsibilities. | High |
| Foundry Hosted Agents (programming-language-csharp) | https://learn.microsoft.com/en-us/agent-framework/hosting/foundry-hosted-agent?pivots=programming-language-csharp | Required source that maps Agent Framework code to Foundry hosting model and deployment mechanics. | High |
| Deploy a hosted agent | https://learn.microsoft.com/azure/foundry/agents/how-to/deploy-hosted-agent | Definitive deployment lifecycle and operational flow for hosted agents. | High |
| Quickstart: Deploy your first hosted agent (azd) | https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-hosted-agent | End-to-end baseline path and runtime behavior checkpoints for first deployment. | High |
| Microsoft Foundry architecture | https://learn.microsoft.com/azure/foundry/concepts/architecture#security-driven-separation-of-concerns | Broader Foundry system architecture and separation of concerns around hosted services. | High |
| What is Microsoft Foundry Agent Service? | https://learn.microsoft.com/azure/foundry/agents/overview#agent-types | Clarifies agent service types and where hosted agents fit in the platform model. | High |

## Persistence and state management

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| What are hosted agents? (platform details) | https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents#platform-details | Documents session persistence, immutable version configuration, and operational runtime behavior. | High |
| Memory in Microsoft Foundry Agent Service (preview) | https://learn.microsoft.com/azure/foundry/agents/concepts/what-is-memory | Core conceptual model for persisted memory and state across interactions. | High |
| Create and use memory in Foundry Agent Service (preview) | https://learn.microsoft.com/azure/foundry/agents/how-to/memory-usage#create-a-memory-store | Implementation-level guidance for memory store creation and usage patterns. | High |
| Quickstart: Deploy your first hosted agent (runtime behavior) | https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-hosted-agent | Explicitly states scale-to-zero and stateful session persistence duration behavior. | High |
| High availability and resiliency for Microsoft Foundry projects and Agent Services | https://learn.microsoft.com/azure/foundry/how-to/high-availability-resiliency#back-up-and-restore-agent-data | Resiliency and backup/restore guidance for persisted agent data. | Medium |

## Data isolation and security boundaries

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| Deep dive into Foundry Agent Service networking | https://learn.microsoft.com/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts | Defines isolation primitives such as single-tenant data proxy and delegated subnet boundaries. | High |
| Microsoft Foundry architecture | https://learn.microsoft.com/azure/foundry/concepts/architecture#security-driven-separation-of-concerns | Explains service boundary model and security-oriented architectural separation. | High |
| Governance and security for AI agents across the organization | https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/governance-security-across-organization#agent-security | Governance controls and security boundary recommendations for enterprise agent deployments. | High |
| Secure Azure platform services (PaaS) for AI | https://learn.microsoft.com/azure/cloud-adoption-framework/ai/platform/security#secure-ai-data | Data security controls for AI PaaS patterns that directly affect hosted agent data paths. | Medium |
| Azure security baseline for Microsoft Foundry | https://learn.microsoft.com/security/benchmark/azure/baselines/azure-ai-foundry-security-baseline#identity-management | Security baseline controls that define required posture for isolation and hardening. | High |

## Identity and access control

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| Agent identity concepts in Microsoft Foundry | https://learn.microsoft.com/azure/foundry/agents/concepts/agent-identity | Primary source for dedicated agent identity, permissions, and authentication behavior. | High |
| Role-based access control for Microsoft Foundry | https://learn.microsoft.com/azure/foundry/concepts/rbac-foundry | Canonical RBAC role definitions and scope model for Foundry resources. | High |
| Role-based access control for Azure OpenAI in Azure AI Foundry Models | https://learn.microsoft.com/azure/ai-foundry/openai/how-to/role-based-access-control | Required when hosted agents call model deployments with least-privilege access. | High |
| Configure Azure OpenAI with Microsoft Entra ID authentication | https://learn.microsoft.com/azure/ai-foundry/openai/how-to/managed-identity | Identity-based auth path for model access and managed identity patterns. | High |
| Deploy hosted agent quickstart (RBAC assignment note) | https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-hosted-agent#step-3-deploy-to-foundry-agent-service | Documents deployment-time role assignment permissions required for agent identity enablement. | High |

## Scalability and performance characteristics

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| Foundry Agent Service limits, quotas, and regional support | https://learn.microsoft.com/azure/foundry/agents/concepts/limits-quotas-regions | Primary scaling constraints, hard limits, and regional support matrix. | High |
| What are hosted agents? (platform details) | https://learn.microsoft.com/azure/foundry/agents/concepts/hosted-agents#platform-details | Sandbox sizing, versioning behavior, and operational platform details. | High |
| Quickstart: Deploy your first hosted agent | https://learn.microsoft.com/azure/foundry/agents/quickstarts/quickstart-hosted-agent | Runtime characteristics including scale-to-zero and cold-start expectations. | High |
| High availability and resiliency for Microsoft Foundry projects and Agent Services | https://learn.microsoft.com/azure/foundry/how-to/high-availability-resiliency | Reliability and continuity guidance for resilient performance architecture. | Medium |
| Azure OpenAI in Azure AI Foundry Models quotas and limits | https://learn.microsoft.com/azure/ai-foundry/openai/quotas-limits | Throughput and token limits that bound hosted-agent model-side performance. | High |

## Multi-agent patterns and orchestration with hosted agents

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| AI agent orchestration patterns | https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview | Authoritative architecture patterns for orchestrated, collaborative agent systems. | High |
| Single agent or multiple agents | https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents#when-to-start-with-a-multi-agent-system | Decision criteria and tradeoffs for decomposing capabilities into multiple agents. | High |
| Process to build agents across your organization | https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/build-secure-process#1-agent-orchestration | Enterprise orchestration and operating model guidance for agent portfolios. | High |
| What is Microsoft Foundry Agent Service? | https://learn.microsoft.com/azure/foundry/agents/overview#agent-types | Distinguishes agent types and helps frame orchestration with hosted and prompt agents. | High |
| Technology plan for AI agents | https://learn.microsoft.com/azure/cloud-adoption-framework/ai-agents/technology-solutions-plan-strategy#build-ai-agents | Strategic technology selection inputs for orchestration architecture choices. | Medium |

## Multitenant architecture and single-tenant vs multi-tenant implementation patterns

| Title | URL | Why relevant | Confidence |
|---|---|---|---|
| Architectural approaches for AI and machine learning in multitenant solutions | https://learn.microsoft.com/azure/architecture/guide/multitenant/approaches/ai-machine-learning#key-considerations-and-requirements | Broad multitenant reference architecture and design criteria for AI workloads. | High |
| Multitenancy and Azure OpenAI | https://learn.microsoft.com/azure/architecture/guide/multitenant/service/openai#isolation-models | Isolation model options and tradeoffs for shared vs dedicated model resources. | High |
| Design a secure multitenant RAG inferencing solution | https://learn.microsoft.com/azure/architecture/ai-ml/guide/secure-multitenant-rag#single-tenant-rag-architecture-with-direct-data-access | Concrete secure multi-tenant patterns for retrieval and inference separation. | High |
| Deep dive into Foundry Agent Service networking | https://learn.microsoft.com/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts | Includes single-tenant data proxy concepts useful for tenant-level isolation implementation. | High |
| Microsoft Foundry architecture | https://learn.microsoft.com/azure/foundry/concepts/architecture#security-driven-separation-of-concerns | Security-driven partitioning model that informs tenant boundary design choices. | Medium |

## Notes on coverage

- Discovery emphasized official Microsoft sources. No non-Microsoft sources were needed to meet requested depth and breadth.
- Some pages remain in preview or evolve rapidly; validate preview limits and behavior before design freeze.
