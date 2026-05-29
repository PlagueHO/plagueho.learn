---
topic: Microsoft Entra Agent ID
topic_slug: microsoft-entra-agent-id
purpose: deep-guide
target_audience: Solution architects, developers building AI agents with Microsoft Foundry Agent Service and Agent Framework
created_at: 2026-05-29
---

# Research Plan: Microsoft Entra Agent ID

## Topic & Boundaries

**Topic**: Microsoft Entra Agent ID — how AI agents acquire, use, and present identity through Microsoft Entra, and how this integrates with Microsoft Foundry Agent Service (prompt-based and hosted agents) and Microsoft Agent Framework (model-only and Foundry-backed agents).

**Scope**:
- What Microsoft Entra Agent ID is and the agent identity model (service principals, managed identities, workload identities for agents)
- **Agent identity types**: application identity (app/managed identity), **user identity** (acting on behalf of a user), and the different ways Agent ID can be used
- Identity lifecycle for agents: creation, trust, delegation
- **Agent Identity SDK** (`microsoft-entra-sdk-for-agent-identities`) — how to use it to acquire and present agent identity tokens
- **Sidecar authentication** (`authentication-with-auth-sdk-sidecar`) — sidecar pattern for agent identity acquisition without SDK code changes
- How Foundry Agent Service (prompt-based agents and hosted agents) uses Entra Agent ID
- How Microsoft Agent Framework (model-only and Foundry-backed agents) uses Entra Agent ID
- Authentication flows: OAuth 2.0 On-Behalf-Of (user identity), client credentials (app identity), delegated permissions
- Scenarios where agents call 3rd party MCP servers that use a non-Entra IDP for OAuth
- Real-world scenarios with diagrams
- Setup and best practices

**Out of scope**: General Azure AD/Entra configuration not specific to agents; full implementation walkthroughs (code samples at concept level only).

**User-provided source URLs**:
1. https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id
2. https://learn.microsoft.com/en-us/azure/foundry/agents/overview
3. https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp
4. https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities
5. https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar

## Purpose & Target Audience

**Purpose**: Deep technical guide — comprehensive, concise, and easy to consume reference covering identity concepts, integration patterns, real-world scenarios, and diagrams.

**Target Audience**:
- Solution architects designing AI agent systems on Azure
- Developers building agents with Microsoft Foundry Agent Service
- Developers using Microsoft Agent Framework (C#/Python)
- Security engineers validating agent identity posture
- Cloud engineers configuring Entra for agent workloads

**Desired Outcomes**:
- Clear explanation of what Entra Agent ID is and why it matters
- Concrete understanding of how Foundry and Agent Framework agents get and use identity
- Diagrams illustrating identity flows and authentication patterns
- Real-world scenario walkthroughs including non-Entra IDP (3rd party MCP)
- Getting started guidance and links to authoritative docs

## Research Areas & Search Terms

### 1. **Concepts & Core Identity Model**
Focus: What is Entra Agent ID, service principals for agents, workload identity, agent trust model, user identity vs application identity.

Search terms:
- "Microsoft Entra Agent ID overview"
- "what is Microsoft Entra Agent ID"
- "agent identity service principal Entra"
- "workload identity agents Azure"
- "agent managed identity Entra"
- "Entra Agent ID trust model"
- "agent user identity delegated"
- "ways to use Microsoft Entra Agent ID"

Primary sources:
- https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id
- Entra Agent ID documentation subtree

### 2. **Agent Identity SDK & Sidecar**
Focus: The Microsoft Entra Agent Identity SDK, the sidecar authentication pattern, how agents acquire tokens without in-process SDK changes.

Search terms:
- "Microsoft Entra SDK for agent identities"
- "agent identity SDK overview"
- "authentication with auth SDK sidecar"
- "sidecar agent identity pattern"
- "agent token acquisition SDK"
- "Entra Agent ID SDK usage"

Primary sources:
- https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities
- https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar

### 2. **Foundry Agent Service Integration**
Focus: How prompt-based agents and hosted agents in Foundry Agent Service acquire and use Entra Agent ID.

Search terms:
- "Microsoft Foundry Agent Service identity"
- "Foundry Agent Service prompt-based agent Entra"
- "hosted agent Foundry identity configuration"
- "Foundry Agent Service overview"
- "Azure Foundry agents authentication"
- "agent service managed identity Foundry"

Primary sources:
- https://learn.microsoft.com/en-us/azure/foundry/agents/overview
- Foundry Agent Service documentation subtree

### 3. **Agent Framework Integration**
Focus: How Microsoft Agent Framework (model-only and Foundry-backed agents) uses Entra Agent ID.

Search terms:
- "Microsoft Agent Framework overview"
- "Agent Framework Entra identity"
- "Agent Framework Foundry backed agent"
- "model-only agent identity Agent Framework"
- "Microsoft Agent Framework C# authentication"
- "Agent Framework workload identity"

Primary sources:
- https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp
- Agent Framework documentation subtree

### 4. **Authentication & OAuth Flows**
Focus: OAuth 2.0 patterns agents use (client credentials, OBO, delegated), token acquisition, permission scopes.

Search terms:
- "OAuth 2.0 on-behalf-of agent Azure"
- "agent client credentials OAuth Entra"
- "delegated permissions agent identity"
- "agent token acquisition Entra"
- "managed identity OAuth agent"
- "Entra agent permissions scopes"

### 5. **3rd Party MCP & Non-Entra IDP Scenarios**
Focus: Agents calling MCP servers that require OAuth from a non-Entra identity provider (e.g., Okta, Auth0, GitHub).

Search terms:
- "MCP server OAuth non-Entra IDP"
- "agent calling MCP server third party authentication"
- "Model Context Protocol OAuth integration"
- "agent identity non-Microsoft IDP"
- "Okta OAuth agent MCP server"
- "token exchange agent third party IDP"
- "Foundry agent MCP OAuth"

### 6. **Security Architecture & Best Practices**
Focus: Trust boundaries, least privilege, guardrails, audit, token handling, agent identity lifecycle.

Search terms:
- "Entra Agent ID security best practices"
- "agent identity least privilege"
- "agent workload identity security"
- "agent trust boundaries Azure"
- "audit agent identity Entra"
- "agent credential management best practices"

### 8. **Agent Identity Blueprint**
Focus: The Agent Identity Blueprint reference architecture — what it is, what it prescribes, how to apply it to Foundry and Agent Framework workloads.

Search terms:
- "Microsoft Entra Agent Identity Blueprint"
- "agent identity blueprint reference architecture"
- "Entra agent identity blueprint pattern"
- "agent identity blueprint implementation"
- "agent identity blueprint Foundry"
- "agent identity blueprint best practices"

### 9. **Real-World Scenarios & Architecture Patterns**
Focus: End-to-end scenario walkthroughs, architecture diagrams, pattern libraries.

Search terms:
- "Entra Agent ID real world scenario"
- "agent identity architecture patterns"
- "Foundry agent identity scenario walkthrough"
- "AI agent authentication end to end"
- "agent calling downstream APIs with identity"

## Output Sections

| # | Section ID | Title | Primary Research Areas |
|---|-----------|-------|----------------------|
| 01 | `01-what-is-entra-agent-id` | What is Microsoft Entra Agent ID? | concepts |
| 02 | `02-identity-model` | The Agent Identity Model (User, App, & Modes) | concepts, auth-flows |
| 03 | `03-agent-identity-sdk-sidecar` | Agent Identity SDK & Sidecar Pattern | sdk-sidecar |
| 04 | `04-foundry-integration` | Foundry Agent Service Integration | foundry, auth-flows |
| 05 | `05-agent-framework-integration` | Agent Framework Integration | agent-framework, auth-flows |
| 06 | `06-authentication-patterns` | Authentication Patterns & OAuth Flows | auth-flows, security |
| 07 | `07-third-party-mcp-scenarios` | 3rd Party MCP & Non-Entra IDP Scenarios | third-party-mcp, auth-flows |
| 08 | `08-agent-identity-blueprint` | Agent Identity Blueprint | blueprint, scenarios |
| 09 | `09-scenarios-and-diagrams` | Real-World Scenarios & Architecture Diagrams | scenarios, all |
| 10 | `10-security-best-practices` | Security Best Practices | security, concepts |
| 11 | `11-getting-started` | Getting Started | foundry, agent-framework, sdk-sidecar |
| 12 | `12-resources` | Resources & Further Reading | all |

## Estimated Source Counts

| Research Area | Min Sources | Target Sources |
|--------------|-------------|----------------|
| concepts | 3 | 6 |
| sdk-sidecar | 2 | 4 |
| foundry | 3 | 6 |
| agent-framework | 3 | 5 |
| auth-flows | 2 | 5 |
| third-party-mcp | 2 | 4 |
| security | 2 | 4 |
| blueprint | 2 | 5 |
| scenarios | 2 | 4 |

**Total target**: 30–43 sources
