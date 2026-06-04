---
status: complete
topic: Microsoft Entra Agent ID
purpose: deep-guide
sections: 12
completed_at: 2026-05-29
last_refreshed: 2026-06-04
---

# Microsoft Entra Agent ID — Research Output

> *Deep guide: how Microsoft Entra Agent ID provides enterprise-grade identity for AI agents across Microsoft Foundry Agent Service and Microsoft Agent Framework.*

## Sections

| # | Title | Status |
|---|-------|--------|
| [01](01-what-is-entra-agent-id.md) | What is Microsoft Entra Agent ID? | complete |
| [02](02-identity-model.md) | The Agent Identity Model (User, App, & Modes) | complete |
| [03](03-agent-identity-sdk-sidecar.md) | Agent Identity SDK & Sidecar Pattern | complete |
| [04](04-foundry-integration.md) | Foundry Agent Service Integration | complete |
| [05](05-agent-framework-integration.md) | Agent Framework Integration | complete |
| [06](06-authentication-patterns.md) | Authentication Patterns & OAuth Flows | complete |
| [07](07-third-party-mcp-scenarios.md) | 3rd Party MCP & Non-Entra IDP Scenarios | complete |
| [08](08-agent-identity-blueprint.md) | Agent Identity Blueprint | complete |
| [09](09-scenarios-and-diagrams.md) | Real-World Scenarios & Architecture Diagrams | complete |
| [10](10-security-best-practices.md) | Security Best Practices | complete |
| [11](11-getting-started.md) | Getting Started | complete |
| [12](12-resources.md) | Resources & Further Reading | complete |

## Key Topics Covered

- *Entra Agent ID* — the product, capabilities, licensing, and platform architecture
- *Identity model* — blueprint, agent identity, blueprint principal, FIC credential chain; three operating modes (autonomous, OBO, user-account impersonation)
- *Agent Identity SDK & Sidecar* — sidecar container pattern, HTTP API endpoints, polyglot support, configuration
- *Foundry Agent Service* — prompt-based and hosted agents; 4-step runtime token exchange; shared vs distinct identity; MCP auth options
- *Agent Framework* — ChatClientAgent vs FoundryAgent; DefaultAzureCredential; A2A integration
- *OAuth flows* — all three grant types with exact HTTP sequences and Mermaid diagrams
- *3rd party MCP scenarios* — OAuth passthrough for non-Entra IDPs (GitHub OAuth, Okta, Auth0); consent hub infrastructure; sidecar for cross-platform agents
- *Agent Identity Blueprint* — object model, creation steps, inheritable permissions, common pitfalls
- *7 real-world scenarios* — with Mermaid architecture and sequence diagrams
- *Security* — threat model, Conditional Access, Identity Protection, audit logs, governance, network controls
- *Getting started* — quick-start paths for Foundry, Agent Framework, and sidecar patterns

## Source Quality

- *35 sources* across 9 research areas
- All sources are official Microsoft Learn documentation or GitHub samples
- Reviewed and passed quality gate (2026-05-29)

## Currency Refresh — Microsoft Build 2026 (2026-06-04)

Iteration 1 refreshed the guide against the Microsoft Build 2026 (2026-06-02)
announcements. Targeted, source-grounded edits were applied to sections **01,
02, 04, 08, 10, 11, and 12**; all other sections were verified as still
current. Key deltas incorporated:

- *Conditional Access for agents* — **now GA** (sub-features "All agent users",
  "Select agent users", and "Agent execution environments" remain preview)
- *Identity Protection for agents* — **still preview**; new Microsoft Graph
  collections `riskyAgents` and `agentRiskDetections`; OBO risk attributed to
  the user
- *Foundry hosted agents* — **public preview, GA expected early July 2026**;
  dual-identity model (per-agent Entra identity + project managed identity);
  Foundry RBAC role rename (Azure AI \* → Foundry \*, IDs/permissions unchanged)
- *Microsoft Agent 365* — **GA (Commercial since 2026-05-01)**; convergence with
  Entra Agent ID; Microsoft 365 Agents SDK (GA) registration path vs the Agent
  365 SDK governance overlay (kept distinct)
- *Autopilot agents* (public preview, blog-announced) — independent agents with
  their own governed Entra Agent ID, mailbox, Teams presence, org-chart placement
- *Windows 365 for Agents* + OS-enforced / Cloud PC-bound agent identity
  (Learn-documented; GA blog-asserted; MXC on-device "local ID" blog-only preview)
- *ACS, ASSERT, Agent Governance Toolkit* — open-source, blog-announced runtime
  governance/evaluation tooling, noted as adjacent to (not part of) Entra Agent ID

- Reviewed and passed quality gate (2026-06-04)