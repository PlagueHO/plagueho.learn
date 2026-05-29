---
topic: Microsoft Entra Agent ID
topic_slug: microsoft-entra-agent-id
total_sources: 35
discovered_at: 2026-05-29
---

# Sources: Microsoft Entra Agent ID

## Area: concepts

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id | What is Microsoft Entra Agent ID? | Primary entry point — defines the product, identity management, security, governance and licensing overview | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities | What are agent identities | Deep explanation of agent identities vs. app identities vs. user identities; why they exist; what they enable | high |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/what-is-agent-id-platform | What is the Microsoft agent identity platform | Architecture overview: authentication service, SDKs, agent registry, OAuth/OIDC, integration patterns | high |
| 4 | https://learn.microsoft.com/en-us/entra/agent-id/agent-identities | Agent identities in Microsoft Entra Agent ID | Anatomy of an agent identity, credential model, blueprint relationship, FIC authorization chain | high |
| 5 | https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns | Microsoft Entra Agent ID design patterns | Maps real-world deployment patterns (singleton, domain worker, orchestrator, per-user, digital worker) to identity constructs | high |
| 6 | https://learn.microsoft.com/en-us/entra/agent-id/how-to-plan-agent-identity-architecture | Plan your agent identity architecture | Decision guide for identity type, operation pattern, number of blueprints, number of agent identities | high |
| 7 | https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint | Agent identity blueprints in Microsoft Entra Agent ID | Blueprint object model: credentials, inheritable permissions, blueprint principals, single vs. multi-tenant | high |

## Area: sdk-sidecar

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar | Authentication with Microsoft Entra Auth SDK (sidecar) | Sidecar pattern design: why it exists, how it works, identity objects, credential source abstraction | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities | Acquire tokens and call downstream APIs with Microsoft Entra SDK for Agent ID | HTTP API usage: acquiring tokens for autonomous, user-account, and interactive (OBO) agent scenarios | high |
| 3 | https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview | Overview of the Microsoft Entra SDK for Agent ID | SDK overview: sidecar architecture, key benefits, when to use vs. Microsoft.Identity.Web, language support matrix | high |
| 4 | https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents | Integrate third-party agents with Microsoft Entra Agent ID | Sidecar pattern for AWS Bedrock, n8n, Ollama; federation pattern for cross-cloud token exchange | medium |
| 5 | https://github.com/microsoft/entra-agentid-samples | Microsoft Entra Agent ID sidecar samples | GitHub sample repo demonstrating blueprint vs. agent identity, /AuthorizationHeader, /DownstreamApi, OBO, credential swap | medium |

## Area: foundry

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/azure/foundry/agents/overview | What is Microsoft Foundry Agent Service? | Foundry agent types (prompt, workflow, hosted), MCP tool authentication options including OBO, Entra identity | high |
| 2 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity | Agent identity concepts in Microsoft Foundry | How Foundry provisions and manages Entra agent identities; runtime 4-step token exchange; shared vs. distinct identity lifecycle | high |
| 3 | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication | Set up authentication for Model Context Protocol (MCP) tools | All MCP auth options: key-based, agent identity, project managed identity, OAuth passthrough, unauthenticated; custom OAuth app setup | high |
| 4 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication | Agent2Agent (A2A) authentication | A2A authentication methods: agent identity, project MI, OAuth passthrough (Entra + non-Entra); managed vs. custom OAuth | medium |

## Area: agent-framework

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp | Microsoft Agent Framework | Overview of Agent Framework: agents, workflows, MCP clients, providers, successor to Semantic Kernel and AutoGen | high |
| 2 | https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry | Microsoft Foundry (Agent Framework provider) | Foundry provider: two agent types (Responses Agent vs. Foundry Agent), DefaultAzureCredential usage, MCP tools support | high |
| 3 | https://learn.microsoft.com/en-us/agent-framework/agents/providers/index | Providers Overview | Provider comparison table (Azure OpenAI, OpenAI, Foundry, Anthropic, Ollama, GitHub Copilot, Copilot Studio, A2A) | medium |
| 4 | https://learn.microsoft.com/en-us/agent-framework/integrations/a2a | A2A Protocol integration | Agent Framework A2A integration — connecting Agent Framework agents to remote agents via A2A protocol | medium |
| 5 | https://learn.microsoft.com/en-us/agent-framework/ | Agent Framework documentation | Full TOC navigation — get-started steps, agents, workflows, integrations, support pages | low |

## Area: auth-flows

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/agent-oauth-protocols | Authentication protocols in agents | Summary of all three OAuth patterns, supported grant types (client_credentials, jwt-bearer, refresh_token), unsupported flows, managed identity integration | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/agent-autonomous-app-oauth-flow | Agent autonomous app OAuth flow — App-only protocol | App-only (client credentials) flow: blueprint → agent identity FIC token exchange; sequence diagram; managed identity as FIC | high |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/agent-on-behalf-of-oauth-flow | Agent OAuth flows: On behalf of flow | OBO flow: user token → blueprint exchange → agent identity OBO; sequence diagram; refresh token; permission inheritance | high |
| 4 | https://learn.microsoft.com/en-us/entra/agent-id/agent-user-oauth-flow | Agent's user account impersonation protocol | Three-stage FIC chain: blueprint → agent identity → agent's user account; user_fic grant type; sequence diagram | high |
| 5 | https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities | Acquire tokens and call downstream APIs with Microsoft Entra SDK for Agent ID | SDK-level token acquisition for all three operating modes (autonomous, user-account, interactive OBO) via HTTP endpoints | medium |
| 6 | https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview | Overview of the Microsoft Entra SDK for Agent ID | Managed Identity, OBO, client credentials, agent identity — all token acquisition patterns via sidecar HTTP API | medium |

## Area: third-party-mcp

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents | Integrate third-party agents with Microsoft Entra Agent ID | Sidecar + workload identity federation patterns for AWS Bedrock, n8n, Ollama; security best practices for non-Entra agents | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent | Secure an Amazon Bedrock agent with Microsoft Entra Agent ID | Step-by-step: AWS Bedrock (Claude) + sidecar pattern calling Microsoft Graph | high |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/integrate-n8n-agent | Secure an n8n agent with Microsoft Entra Agent ID | Step-by-step: n8n community node for Entra Agent ID, calling Graph + MCP Server for Enterprise | medium |
| 4 | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication | Set up authentication for Model Context Protocol (MCP) tools | OAuth identity passthrough for non-Entra MCP servers; custom OAuth app registration (GitHub, Logic Apps connectors etc.) | high |
| 5 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication | Agent2Agent (A2A) authentication | Custom OAuth (Okta, GitHub OAuth, Auth0 etc.) in A2A connections; managed vs. custom OAuth configuration | medium |
| 6 | https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview | Overview of the Microsoft Entra SDK for Agent ID | Polyglot sidecar architecture enables non-.NET agents (Python, Node.js, Go, Java) from any platform to acquire Entra tokens | medium |

## Area: security

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview | Microsoft Entra security for AI overview | Agent security threat model; interactive vs. autonomous vs. user-account risks; Zero Trust controls; agent sprawl governance | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/best-practices-agent-id | Best practices for Microsoft Entra Agent ID | Blueprint design, credential management, Conditional Access, lifecycle governance, monitoring; actionable recommendations | high |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/sign-in-audit-logs-agents | Microsoft Entra Agent ID logs | Sign-in and audit log schema for agent identities; agentType values; blueprintId correlation; how to query in admin center and Graph | high |
| 4 | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id | Conditional Access for agents | Applying CA policies to agent identities at blueprint level; risk-based blocking; custom security attributes for segmentation | high |
| 5 | https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents | Identity Protection for agents | Risk detection and remediation for agent identities; risk-signal integration with Conditional Access | medium |
| 6 | https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview | Identity governance for agents | Access reviews, entitlement management, and lifecycle controls for agent identities | medium |
| 7 | https://learn.microsoft.com/en-us/entra/global-secure-access/concept-secure-web-ai-gateway-agents | Secure Web and AI Gateway for agents | Network-level controls: log agent traffic, web categorization for MCP APIs, prompt injection detection, file-type policies | medium |

## Area: blueprint

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint | Agent identity blueprints in Microsoft Entra Agent ID | Blueprint concept, key characteristics, inheritable permissions, blueprint principals, single vs. multi-tenant deployment | high |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint | Create an agent identity blueprint | Step-by-step: admin center wizard + Graph API/PowerShell; credentials (managed identity FIC vs. secret); identifier URI; scope; principal; Agent 365 registry | high |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/agent-id-ai-guided-setup | AI-guided setup for Microsoft Entra Agent ID | GitHub Copilot skill that automates full blueprint provisioning workflow; documents common pitfalls (OData header, principal not autocreated, sponsor required) | high |
| 4 | https://learn.microsoft.com/en-us/entra/agent-id/create-delete-agent-identities | Create and delete agent identities | How to provision and deprovision agent identity instances from a blueprint; get access token using agent identity blueprint | medium |

## Area: scenarios

| # | URL | Title | Relevance | Priority |
|---|-----|-------|-----------|----------|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns | Microsoft Entra Agent ID design patterns | Five real-world patterns (singleton, domain worker, orchestrator, per-user, digital worker) with trust boundaries, permissions, user-account decisions | high |
| 2 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity | Agent identity concepts in Microsoft Foundry | End-to-end Foundry scenario: 4-step token exchange, shared vs. distinct identity lifecycle, RBAC assignment, MCP + A2A tool auth | high |
| 3 | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication | Set up authentication for Model Context Protocol (MCP) tools | Practical scenario: connecting MCP server (Entra or non-Entra) to Foundry agent with full OAuth consent flow walkthrough | medium |
| 4 | https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents | Integrate third-party agents with Microsoft Entra Agent ID | Cross-platform scenario: AWS Bedrock / n8n / Ollama agent calling Microsoft Graph via Entra Agent ID | medium |
| 5 | https://github.com/microsoft/entra-agentid-samples | Microsoft Entra Agent ID sidecar samples | Code samples for all three OAuth flows, credential swap (dev vs. prod), downstream API validation | medium |
