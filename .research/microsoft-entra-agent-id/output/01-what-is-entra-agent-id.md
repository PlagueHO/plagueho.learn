---
section_id: "01-what-is-entra-agent-id"
title: "What is Microsoft Entra Agent ID?"
status: complete
areas: [concepts]
---

## What is Microsoft Entra Agent ID?

Microsoft Entra Agent ID is an identity and security framework within the Microsoft Entra product family
that extends enterprise-grade identity capabilities to AI agents. As organizations deploy assistive,
autonomous, and user-like agents at scale, they need purpose-built identity constructs that go beyond
what app registrations or user accounts can safely provide. Microsoft Entra Agent ID is that foundation.

### The problem it solves

Traditional identity constructs were not designed for agents:

- **Service principals** are optimized for deterministic, long-lived services. Agents may be created
  dynamically, exist for minutes, or be instantiated thousands of times per day. Managing this with
  service principals creates operational sprawl and unacceptable security exposure: no dedicated audit
  entries, no enforced accountability, and no lifecycle management at scale.
- **Regular user accounts** fail at the policy boundary. Conditional Access policies require compliant
  devices, MFA, and terms-of-use acceptance — all designed for humans. Routing agent traffic through
  user accounts degrades Identity Protection ML models tuned for human sign-in behavior, confuses
  joiner-mover-leaver governance workflows, and makes agents visible in the Global Address List and Teams
  alongside human employees.

Agents need an identity type that is distinct, governable, and built for dynamic scale.

### Core capabilities

Microsoft Entra Agent ID brings together four pillars:

| Pillar | What it provides |
|--------|-----------------|
| *Identity management* | Create and manage agent identities and blueprints; bulk provisioning; ephemeral identity support; dynamic lifecycle |
| *Access protection* | Conditional Access policies, Identity Protection risk detection, and network-level controls applied specifically to agents |
| *Governance* | Identity Governance lifecycle management calibrated for agents — access packages, access reviews, joiner-mover-leaver workflows |
| *Compliance* | All agent authentication and activity is logged in the Microsoft Entra audit and sign-in logs with dedicated agent identity entries |

### Licensing requirements

| Capability | License required |
|------------|-----------------|
| Conditional Access for agents | Microsoft Entra ID P1 |
| Identity Protection for agents | Microsoft Entra ID P2 |
| Identity Governance for agents | Microsoft Entra ID P1 |
| Network controls for agents | Microsoft Entra Internet Access (or Microsoft Entra Suite) |
| Full platform (bundled) | Microsoft 365 E5 |

Agent ID is available for all Microsoft Entra customers. Integration with **Microsoft Agent 365** —
which enables agents to operate across Microsoft 365 services and enterprise workflows — requires a
Microsoft Agent 365 license per user.

### How it relates to Microsoft Entra

Microsoft Entra Agent ID is not a separate product silo — it extends the existing Microsoft Entra
platform. The same tenant, the same admin center, and the same security policies govern agents
alongside humans and workloads. Conditional Access, Identity Protection, and Identity Governance all
gain new agent-aware modes rather than being replaced by new tooling.

Supported protocols include OAuth 2.0, Model Context Protocol (MCP), and Agent-to-Agent (A2A).

For non-Microsoft agents built on AWS Bedrock, n8n, or any platform supporting OAuth 2.0/OIDC, the
**Microsoft Entra Auth SDK (sidecar)** or **workload identity federation** gives every agent a governed
Entra identity regardless of where it was built.

### Why this matters for architects

The stakes of getting agent identity wrong are high. An agent operating as a service principal has no
enforced owner, no dedicated audit trail, and platform-level access that cannot be restricted without
custom policy. A compromised agent credential can escalate silently across every permission the service
principal holds, with no signal that it was an agent that acted. Microsoft Entra Agent ID shifts the
default posture: every agent identity has an accountable sponsor, blueprint-managed credentials,
dedicated sign-in and audit log entries, and platform-level restrictions on high-privilege authorizations
that reduce blast radius. For architects building AI-native systems, this is the governance foundation
that makes enterprise-scale agent deployment safe.
