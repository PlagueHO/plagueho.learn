---
section_id: "12-resources"
title: "Resources & Further Reading"
status: complete
areas: [all]
---

# Resources & Further Reading

All URLs were verified against research notes extracted on 2026-05-29.

## Microsoft Entra Agent ID Documentation

Core concepts, identity model, and blueprint management.

| Resource | Description |
|---|---|
| [What is Microsoft Entra Agent ID?](https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id) | Platform overview, licensing, and supported protocols |
| [Agent identity types](https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities) | Agent identity, agent's user account, and why not service principals |
| [The agent identity platform](https://learn.microsoft.com/en-us/entra/agent-id/what-is-agent-id-platform) | Architecture of the authentication and authorization service |
| [Design patterns](https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns) | Architectural patterns for common agent scenarios |
| [Plan agent identity architecture](https://learn.microsoft.com/en-us/entra/agent-id/how-to-plan-agent-identity-architecture) | Decision guide for choosing identity types and flows |
| [Agent identity blueprint (concept)](https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint) | What blueprints are, object model, single- vs multi-tenant |
| [Create an agent identity blueprint](https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint) | Step-by-step admin center and Graph API creation |
| [AI-guided setup](https://learn.microsoft.com/en-us/entra/agent-id/agent-id-ai-guided-setup) | Wizard-driven blueprint and principal provisioning |
| [Create and delete agent identities](https://learn.microsoft.com/en-us/entra/agent-id/create-delete-agent-identities) | Lifecycle operations for agent identity instances |
| [Inheritable permissions](https://learn.microsoft.com/en-us/entra/agent-id/concept-inheritable-permissions) | How permissions propagate from blueprint to all instances |
| [Configure third-party agents](https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents) | Giving non-Microsoft agents an Entra agent identity |
| [Integrate AWS Bedrock agents](https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent) | Step-by-step for AWS Bedrock agents calling Microsoft APIs |
| [Integrate n8n agents](https://learn.microsoft.com/en-us/entra/agent-id/integrate-n8n-agent) | Step-by-step for n8n agents calling Microsoft APIs |
| [Graph API: agentIdentityBlueprint resource](https://learn.microsoft.com/en-us/graph/api/resources/agentidentityblueprint) | Full Graph API schema for blueprint objects |

## Microsoft Foundry Agent Service Documentation

| Resource | Description |
|---|---|
| [Foundry Agent Service overview](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) | Platform capabilities, agent types, and development lifecycle |
| [Agent identity in Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity) | How Foundry provisions blueprints and agent identities; shared vs distinct identity |
| [MCP tool authentication](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication) | All five auth methods for MCP tools; OAuth passthrough for non-Entra IDPs |
| [Agent-to-agent authentication](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication) | How A2A token exchange works in Foundry |

## Microsoft Agent Framework Documentation

| Resource | Description |
|---|---|
| [Agent Framework overview (.NET/C#)](https://learn.microsoft.com/en-us/agent-framework/overview/?pivots=programming-language-csharp) | Framework capabilities, successor to Semantic Kernel and AutoGen |
| [Foundry provider](https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry) | `ChatClientAgent` vs `FoundryAgent`; auth credential patterns |
| [Agent providers index](https://learn.microsoft.com/en-us/agent-framework/agents/providers/index) | All supported model providers |
| [A2A integration](https://learn.microsoft.com/en-us/agent-framework/integrations/a2a) | Agent-to-Agent protocol setup in Agent Framework |

## Authentication & OAuth Flow References

| Resource | Description |
|---|---|
| [Agent OAuth protocols](https://learn.microsoft.com/en-us/entra/agent-id/agent-oauth-protocols) | Protocol overview, FIC exchange, all three operating modes |
| [Autonomous app-only flow](https://learn.microsoft.com/en-us/entra/agent-id/agent-autonomous-app-oauth-flow) | Client credentials flow with FIC impersonation; exact token request sequences |
| [On-behalf-of (OBO) flow](https://learn.microsoft.com/en-us/entra/agent-id/agent-on-behalf-of-oauth-flow) | OBO delegation combined with agent FIC impersonation; refresh token support |
| [Agent user OAuth flow](https://learn.microsoft.com/en-us/entra/agent-id/agent-user-oauth-flow) | Token acquisition for agent's user account scenarios |
| [Auth SDK for agent identities](https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities) | Overview of the Microsoft Entra SDK / sidecar pattern |
| [Authentication with Auth SDK sidecar](https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar) | Sidecar container architecture and integration guide |

## Security & Governance References

| Resource | Description |
|---|---|
| [Security for AI agents overview](https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview) | Threat model and Zero Trust controls for agents |
| [Best practices for Agent ID](https://learn.microsoft.com/en-us/entra/agent-id/best-practices-agent-id) | Prescriptive guidance on credential, permission, and lifecycle management |
| [Sign-in and audit logs for agents](https://learn.microsoft.com/en-us/entra/agent-id/sign-in-audit-logs-agents) | `agentType` values, new schema fields, log routing by access pattern |
| [Conditional Access for agents](https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id) | Policy configuration for all three agent access patterns |
| [Block high-risk agent identities (CA policy)](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-agent-block-high-risk) | Policy template for risk-based blocking |
| [CA policy: autonomous agents](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-autonomous-agents) | CA policy template for application-only agent access |
| [CA policy: OBO agents](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-on-behalf-of-agents) | CA policy template for delegated agent access |
| [Identity Protection for agents (risky agents)](https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents) | Risk detection types, Risky Agents report, remediation actions |
| [Identity Governance for agents](https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview) | Access packages, lifecycle workflows, sponsor management |
| [Agent sponsor tasks (Lifecycle Workflows)](https://learn.microsoft.com/en-us/entra/id-governance/agent-sponsor-tasks) | How to configure Lifecycle Workflows for sponsor transitions |
| [Custom security attributes](https://learn.microsoft.com/en-us/entra/identity/users/users-custom-security-attributes) | Assigning attributes to agent identities for CA policy targeting |
| [Global Secure Access — AI gateway for agents (concept)](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-secure-web-ai-gateway-agents) | Network-level controls overview: content filtering, prompt injection detection |
| [Global Secure Access — configure AI gateway for agents (how-to)](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-secure-web-ai-gateway-agents) | Step-by-step configuration for Copilot Studio agent traffic |

## Code Samples & Tools

| Resource | Description |
|---|---|
| [Auth SDK sidecar overview](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview) | Architecture, responsibilities, and key concepts for the sidecar |
| [Auth SDK sidecar installation](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/installation) | Container image, deployment options (Docker Compose, Kubernetes) |
| [Auth SDK sidecar configuration](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/configuration) | Configuration schema, downstream API registration, credential setup |
| [Auth SDK sidecar endpoints reference](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/endpoints) | Full OpenAPI reference for all sidecar HTTP endpoints |
| [Scenario: validate authorization header](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/validate-authorization-header) | Code walkthrough for inbound token validation via sidecar |
| [Scenario: call downstream API](https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/call-downstream-api) | Code walkthrough for outbound authenticated API calls via sidecar |
| Sidecar container image | `mcr.microsoft.com/entra-sdk/auth-sidecar` — pull directly from MCR |
