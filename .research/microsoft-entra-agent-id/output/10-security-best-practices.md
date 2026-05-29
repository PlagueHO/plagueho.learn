---
section_id: "10-security-best-practices"
title: "Security Best Practices"
status: complete
areas: [security, concepts]
---

# Security Best Practices

AI agents introduce attack surfaces that differ fundamentally from traditional applications. Unlike deterministic services, agents make autonomous decisions, call external APIs, and can propagate compromise across a multi-agent graph. This section maps the threat model to concrete Entra controls.

## Threat Model for AI Agents

| Agent type | Primary risk |
|---|---|
| Assistive (OBO) | Compromised agent performs unauthorized actions as the signed-in user — file access, communications, data manipulation |
| Autonomous | No human approval gate — compromised agent places orders, deletes records, or exfiltrates without intervention |
| Agent's user account | Trusted identity used to spread malware via team channels or impersonate a human in meetings |
| Agent-to-agent (A2A) | Malicious agent injected into the orchestration graph; upstream compromise cascades to downstream agents |

Additional surfaces unique to agents: **prompt injection** (adversaries embed malicious instructions in data *processed by* the agent); **permission escalation** (agents over-provisioned beyond their operational scope); **agent sprawl** ("shadow AI" — unmanaged agents with excessive, never-reviewed permissions); and **autonomous decision-making** (no human approval gate on a compromised agent's actions).

## Zero Trust Controls for Agents

Microsoft Entra Agent ID operationalizes Zero Trust across three pillars:

- **Verify explicitly** — all agent authentication flows through Entra ID. CA re-evaluates on every token acquisition; Continuous Access Evaluation triggers re-evaluation mid-session. Access tokens are scoped per resource; each downstream API requires a separate audience-scoped token.
- **Least privilege access** — prefer delegated (OBO) permissions over application permissions when user context is available. For autonomous agents, grant only minimum app permissions. Blueprints centralize permission definitions; instances cannot exceed blueprint scope.
- **Assume breach** — use Identity Protection to auto-detect anomalous behavior and block high-risk agents via CA. Disabling a blueprint is an instant kill-switch for all derived identities. Include agent identities in incident response post-mortems.

## Conditional Access for Agent Identities

### Organizing Agents at Scale

Use **custom security attributes** (`AgentClassification`, `DataSensitivity`, `AgentOrigin`, `ForPublicUse`) to classify agents for attribute-driven CA policies. Apply CA policies to an **agent identity blueprint** to automatically cover all current and future derived identities — no per-instance configuration required.

### Policy Shape by Access Pattern

| Access pattern | Policy target | Supported controls |
|---|---|---|
| OBO / delegated | Users or groups | Grant, deny, limit access, require step-up MFA from the user |
| Application-only (client credentials) | Agent identities or blueprint | Block only — no interactive remediation for autonomous agents |
| Agent's user account | Select "All agent users" | Block only |

Human-centric controls (MFA, device compliance) deliberately do *not* apply to agent's user
accounts — agents cannot satisfy interactive auth challenges and do not run from managed devices.

**CA policy templates:**

- [Block high-risk agent identities](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-agent-block-high-risk)
  (`https://aka.ms/CreateAgentRiskPolicy`)
- [Configure policy for autonomous agent access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-autonomous-agents)
- [Configure policy for OBO agent access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-on-behalf-of-agents)

> **Important:** CA does not apply when an agent accesses a resource using an **API key** — the Entra authentication pipeline is bypassed entirely. Prefer Entra-authenticated MCP connections over key-based wherever the MCP server supports it.

## Identity Protection for Agents

> *Preview feature (2026-05-29). Requires Microsoft Entra ID P2. Roles: `Security Administrator`, `Security Operator`, or `Security Reader` for reports; `Conditional Access Administrator` for risk-based CA policies.*

All risk detections are currently **offline** (not real-time). Detected risk surfaces in the **Risky Agents** report on the ID Protection Dashboard.

| Detection | Signal |
|---|---|
| `unfamiliarResourceAccess` | Agent targeted resources outside its normal access pattern |
| `signInSpike` | Higher-than-usual sign-in frequency — possible automation or attacker toolkit |
| `failedAccessAttempt` | Agent attempted and failed to access unauthorized resources — possible token replay |
| `riskyUserSignIn` | Agent acted on behalf of a user who is themselves flagged as risky |
| `adminConfirmedAgentCompromised` | Manually confirmed; sets risk level to High |
| `threatIntelligenceAccount` | Activity consistent with Microsoft threat intelligence patterns |

From the Risky Agents report: **Confirm compromise** sets risk to High and triggers risk-based CA block policies; **Disable** immediately blocks all sign-ins. Risk detections are retained for **90 days**.

## Audit and Sign-In Logs

All agent operations are logged. Use the `agentType` field to filter agent-specific events:

| `agentType` value | Meaning |
|---|---|
| `agenticApp` | Agent identity blueprint |
| `agenticAppInstance` | Agent identity (running instance) |
| `agentIdentityBlueprintPrincipal` | Blueprint's service principal in a tenant |
| `agentIDuser` | Agent's user account |
| `notAgentic` | Standard app or user — not an agent |

> To receive `agentIdentityBlueprintPrincipal` and `agentIDuser` in Graph API responses,
> include the request header `Prefer: include-unknown-enum-members`.

**Log routing by access pattern:**

- Agent identities accessing resources → **Service principal sign-in logs**
- Agent's user accounts accessing resources → **Non-interactive user sign-in logs**
- Users accessing agents → **User sign-in logs**

In the Entra admin center (Monitoring & health → Sign-in logs), filter by **Is Agent: Yes** or by **Agent type**. Use `blueprintId` on audit events to correlate any agent identity back to its parent blueprint. The `agentType` and `blueprintId` fields appear on `initiatedBy.app`, `targetResource`, and the new `auditActivityPerformer` resource type.

## Identity Governance

Every agent identity requires a **sponsor** — a human accountable for lifecycle and access decisions. Sponsorship transfers to the manager automatically when a sponsor leaves. Configure Lifecycle Workflows to notify co-sponsors of impending changes.

**Access packages** grant additional permissions beyond blueprint inheritance (security group memberships, Graph app permissions, Entra role assignments). Assignments carry expiry dates; sponsors receive renewal notifications and expired assignments auto-revoke access. Agents can self-request via `accessPackageAssignmentRequest` Graph API, sponsors can request on the agent's behalf, or admins assign directly. Manage lifecycle at `myaccount.microsoft.com` and request packages at `myaccess.microsoft.com`.

## Credential Management

Preferred credential types in order:

1. **Federated identity credentials (managed identities)** — no stored secrets; the Azure
   platform manages rotation automatically; strongly recommended for production.
2. **Certificates** — stored in Azure Key Vault or HSM; rotate at least annually.
3. **Client secrets** — acceptable for initial development and testing only; rotate before
   any production deployment.

**Key rules:**

- Never reuse credentials across unrelated blueprints.
- Separate dev, test, and production environments with separate blueprints or
  environment-specific federated credentials.
- Limit the scope of any managed identity used as a federated credential.
- Periodically audit API permissions consented on each blueprint to prevent privilege creep.
- Use the correct OAuth flow per operating model: OBO for agents with user context, client
  credentials for fully autonomous agents. Never grant application permissions when
  delegated permissions would suffice.

## Network-Level Controls (Global Secure Access)

Global Secure Access (GSA) currently provides network controls for Microsoft Copilot Studio agents. Agent traffic forwards from Power Platform Admin Center to GSA's globally distributed proxy. Configure policies via the **baseline profile**: web content filtering, threat intelligence filtering, network file filtering, **prompt injection detection** (blocks malicious instructions embedded in data the agent processes), and agent network activity logging.

Enable per-environment in Power Platform Admin Center, then configure the baseline profile in GSA.
Reference: [Configure network security for Copilot Studio agents](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-secure-web-ai-gateway-agents)

## Security Best Practices Checklist

- [ ] Use **agent identities** — not service principals or regular user accounts — for all AI agents
- [ ] Assign a **sponsor** to every agent identity at creation
- [ ] Use **federated identity credentials** (managed identity) for blueprint authentication in production
- [ ] Apply **Conditional Access policies** to blueprints, not individual instances — covers all derived identities automatically
- [ ] Enable **Identity Protection** (P2) and create a risk-based CA policy to block high-risk agents
- [ ] Apply **least-privilege permissions**: delegated (OBO) where user context exists; minimum app permissions for autonomous agents
- [ ] Avoid API key authentication to resources that support Entra authentication
- [ ] Configure **access packages with expiry** for additional permissions; ensure sponsors receive and act on renewal notifications
- [ ] Export sign-in logs to Log Analytics, Event Hub, or a SIEM for retention beyond the 90-day default
- [ ] Enable **prompt injection detection** in Global Secure Access for Copilot Studio agents
- [ ] Separate dev, test, and production with distinct blueprints and credentials
- [ ] Use the blueprint **disable** action as an immediate kill-switch when an agent is suspected compromised
