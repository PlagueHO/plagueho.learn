---
area: security
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview
  - https://learn.microsoft.com/en-us/entra/agent-id/best-practices-agent-id
  - https://learn.microsoft.com/en-us/entra/agent-id/sign-in-audit-logs-agents
  - https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id
  - https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents
  - https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview
  - https://learn.microsoft.com/en-us/entra/global-secure-access/concept-secure-web-ai-gateway-agents
extracted_at: 2026-05-29
---

# Security: Microsoft Entra Agent ID

## Threat Model for AI Agents

### Agent Types and Their Risk Profiles

| Agent Type | Operating Model | Key Risk |
|---|---|---|
| Assistive (interactive) | Acts on behalf of a signed-in user via OBO/delegated flow | Compromised agent performs unauthorized actions as the user (read files, send communications, manipulate data) |
| Autonomous | Operates with its own identity; client credentials flow; no user in loop | Compromised agent operates without constraint — unauthorized orders, data modification, access to sensitive information |
| Agent's user account | Agent paired 1:1 with a user object (mailbox, calendar, Teams); licensed like a human | Compromised agent accesses documents, participates in meetings under false pretenses, sends communications as a trusted team member |
| Agent-to-agent (A2A) | Orchestration agent delegates tasks to specialist agents | Unsecured communication allows adversary injection of malicious agents or interception/manipulation of agent interactions |

### Unique Attack Surfaces

- **External accessibility**: Many agents interact with external users, third-party systems, or the public internet — direct adversary pathways into org systems.
- **Permission escalation risk**: Agents are often over-provisioned (e.g., full financial data access instead of scoped read).
- **Autonomous decision-making**: Compromised autonomous agents can place unauthorized orders, delete critical systems, modify data without any human gate.
- **Prompt injection attacks**: Adversaries insert malicious instructions into data *processed by* the agent, manipulating its behavior in ways that don't affect traditional apps.
- **Agent-to-agent propagation**: A compromised orchestration agent can target downstream specialist agents, spreading the compromise.
- **Agent sprawl ("shadow AI")**: Business units create agents without IT oversight; temporary agents remain in production; permissions exceed requirements and are never reviewed. Leads to: over-privileged agents with unclear ownership, compliance failures, incident response difficulties.

### Agent Security Scenario Summary

| Scenario | Security Goal | Compromise Risk |
|---|---|---|
| User-initiated agent | Prevent misuse of inherited user permissions; enable revocation | Unauthorized file access, communications, data manipulation as the user |
| Autonomous agent | Grant only necessary app permissions; prevent scope creep | Unauthorized orders, data modification, sensitive data access — no user oversight |
| Agent's user account | Maintain permission scope; prevent collaborative system abuse | Malware spread via team channels, meeting impersonation, trusted-identity communications |
| Agent-to-agent | Authenticated A2A communication; audit trails; only legitimate agents interact | Malicious agent injection; interception/manipulation of agent interactions |

---

## Zero Trust Controls for Agents

Microsoft Entra extends Zero Trust to AI agent identities through three pillars:

### Verify Explicitly
- All agent authentications flow through Microsoft Entra ID — no bypass.
- Conditional Access policies re-evaluate on every token acquisition (not just initial sign-in).
- `Continuous Access Evaluation` triggers policy re-evaluation when a critical event occurs even mid-session.
- Access tokens are scoped per-resource: each resource audience requires a separate token, preventing lateral reuse.
- CA policies apply across all access patterns: OBO (delegated), application-only (client credentials), and agent's user account flows.

### Least Privilege Access
- Use the `authorization-agent-id` guidance to grant only required permissions per agent.
- Prefer delegated permissions over app permissions when an OBO flow suffices.
- For autonomous agents with no user context, use client credentials flow with *only* the required app permissions.
- Limit permissions to specific API scopes, resources, or sites — never grant broad permissions as convenience.
- Use blueprints to centralize permission definitions; instances inherit from blueprint and cannot exceed it.
- Review and right-size permissions periodically to prevent privilege creep.

### Assume Breach
- Deploy Identity Protection for agents (see below) to auto-detect compromised agent behavior.
- Block high-risk agents automatically via Conditional Access policy tied to agent risk level.
- Disabling a blueprint immediately kills all agent instances derived from it — rapid kill-switch.
- Monitor sign-in logs for sudden token-request spikes, access to unexpected APIs, sign-ins from unfamiliar IPs.
- Include agent identities in incident response post-mortems: check agent access to affected resources during the incident window.

---

## Conditional Access for Agent Identities

### Organizing Agents for Scalable Policy

**Custom Security Attributes** (key-value pairs, business-specific) are the primary mechanism for attribute-driven CA at scale:

| Attribute Name | Type | Example Values |
|---|---|---|
| `AgentClassification` | String | `Orchestrator`, `SubAgent`, `Connector` |
| `DataSensitivity` | String | `Public`, `Internal`, `Confidential`, `Restricted` |
| `AgentOrigin` | String | `Copilot Studio`, `MicrosoftFoundry`, `non-Microsoft` |
| `ForPublicUse` | Boolean | `true`, `false` |

- Attributes assigned to agent identities act as filter conditions in CA policy evaluation.
- Example rule: "If `DataSensitivity = Confidential`, then block access." Applies automatically to all current and future agents with that attribute.
- Attributes can also classify *resources* (not just agents) for consistent labeling across the entire access chain.
- Reference: [Assign custom security attributes](https://learn.microsoft.com/en-us/entra/identity/users/users-custom-security-attributes)

**Agent Identity Blueprint targeting**: Applying a CA policy to a blueprint automatically covers all derived agent identities — including future ones. Blueprint targeting does *not* cover agents' user accounts.

### Three Access Patterns and Their CA Policy Shape

#### 1. On-Behalf-Of (OBO) / Delegated Flow
- The access token subject is the *user* (not the agent).
- **Assignments**: Target users or groups — not the agent identity or agent's user account.
- **Target resources**: "All resources", "All agents", or specific named resources.
- **Network assignment**: Refers to where the *user* signs in, not where the agent runs.
- **Conditions**: User risk, sign-in risk, or other user-context signals.
- **Access control**: Grant, deny, limit access, or require step-up MFA from the user.
- Token exchange for resource access (OBO exchange) is also evaluated by CA — enables granular control over which resources agents can access on the user's behalf.
- OBO token exchange can occur at: agent application, custom middleware API, AI platform (Copilot Studio, Azure AI Foundry), or MCP server layer.

#### 2. Application-Only (Client Credentials) Flow
- The access token subject is the *agent identity*.
- **Assignments**: Target agent identities or their agent identity blueprint.
- **Conditions**: Agent identity risk (from ID Protection).
- **Access control**: Block-only — no interactive remediation exists for autonomous agents.
- Applies to: autonomous background agents, interactive agents using their own identity for backend calls, web-published agents with no user delegation.

#### 3. Agent's User Account Flow
- The access token subject is the *agent's user account*.
- **Assignments**: Select "Select agents acting as users" → "All agent users".
- **Target resources**: All resources.
- **Access control**: Block-only at this time — no other configurations currently supported.
- Human-centric controls (MFA, device compliance) do NOT apply — agents can't satisfy interactive auth challenges; agents don't run from managed client devices. This is a deliberate design decision.

### Where CA Policies Log
- Agent identities accessing resources → **Service principal sign-in logs** (`agentType: agenticAppInstance`)
- Agent's user accounts accessing resources → **Non-interactive user sign-in logs** (`agentType: agentIDuser`)
- Users accessing agents → **User sign-in logs**
- Filter sign-in logs with `agentType` field to isolate agent-specific CA policy evaluation events.

### CA Boundaries and Limitations

CA policies do **not** apply when:
- An agent identity blueprint acquires a token for Microsoft Graph to *create* agent identities or agent's user accounts (blueprints have limited functionality; they cannot act independently).
- An agent identity blueprint or agent identity performs an intermediate token exchange at the `AAD Token Exchange Endpoint: Public` (Resource ID: `fb60f99c-7a34-4190-8149-302f77469936`) — tokens scoped to this endpoint cannot call Microsoft Graph.
- Security defaults are enabled (Security defaults and CA policies are mutually exclusive).
- An agent accesses resources using an **API key** — bypasses Entra authentication pipeline entirely.

Currently unsupported CA configurations:
- Scoping a CA policy to include/exclude agent's user account based on group membership or Custom Security Attributes.
- CA policy targeting agent identities in A2A scenario using Custom Security Attributes does not apply to the agent's user account.
- CA policy targeting agent identities in A2A scenario using agent identity blueprint covers only the agent identity, not the agent's user account.

### Policy Templates (direct links)
- Block high-risk agent identities: `https://aka.ms/CreateAgentRiskPolicy`
- [Block high-risk agent identities policy](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-agent-block-high-risk)
- [Configure policy for autonomous agent access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-autonomous-agents)
- [Configure policy for on-behalf-of agent access](https://learn.microsoft.com/en-us/entra/identity/conditional-access/policy-on-behalf-of-agents)

---

## Identity Protection for Agents

> Feature status: Preview (as of 2026-05-29)

### Prerequisites

**Required Roles for Risky Agent Reports:**
- `Security Administrator`
- `Security Operator`
- `Security Reader`

**Required Role for Configuring Agent Risk CA Policies:**
- `Conditional Access Administrator`

**Required License:** Microsoft Entra ID P2

### How It Works
- ID Protection establishes a behavioral baseline per agent, then continuously monitors for anomalies in Microsoft Entra ID.
- All risk detections for risky agents are currently **offline** (not real-time).
- Flagged agents appear in the Risky Agents report on the ID Protection Dashboard.

### Risk Detection Types

| Detection Name | Type | Description | Detection ID |
|---|---|---|---|
| Unfamiliar resource access | Offline | Agent targeted resources outside its usual access pattern — attacker accessing sensitive resources beyond intended scope | `unfamiliarResourceAccess` |
| Sign-in spike | Offline | Higher number of sign-ins than usual frequency — attacker using automation or toolkit | `signInSpike` |
| Failed access attempt | Offline | Agent attempted and failed to access unauthorized resources — token replay attack indicator | `failedAccessAttempt` |
| Sign-in by risky user | Offline | Agent signed in on behalf of a risky user during delegated auth — attacker using compromised user credentials to exploit agent | `riskyUserSignIn` |
| Confirmed compromised | Offline | Admin manually confirmed agent compromise | `adminConfirmedAgentCompromised` |
| Microsoft Entra threat intelligence | Offline | Activity consistent with known attack patterns per Microsoft internal/external threat intelligence | `threatIntelligenceAccount` |

### Risky Agent Report Actions

From the Risky Agents report (ID Protection Dashboard → "View risky agents"):
- **Confirm compromise**: Manually confirms compromise; sets risk level to `High`; creates a Risk Detection event; triggers risk-based CA policies configured to block on High Agent Risk.
- **Confirm safe**: Marks as safe; clears active risk state (sets risk level to `None`); signals false positive to improve future detection.
- **Dismiss risk**: Marks risk as no longer relevant; risk remains as a benign true positive; system continues flagging similar activity.
- **Disable**: Prevents all sign-ins for that agent across Microsoft Entra ID and connected apps.

### Risky Agent Details Include
- Agent display name and ID
- Risk state and risk level
- Agent type and sponsors (if specified)

### Risk Detections Report
- Navigate to Risk Detections report → "Agent detections" tab for full list.
- Risk detections retained for up to **90 days** for investigation.

### Microsoft Graph API Resources

Two new collections in ID Protection APIs:
- `riskyAgents`
- `agentRiskDetections`

### Export Risk Data
Configure diagnostic settings to send risk data to:
- Log Analytics workspace
- Storage account archive
- Event hub streaming
- SIEM solution

---

## Audit and Sign-In Logs

### Audit Log: Agent Identity Mapping

Agent activities log under their base identity type:

| Agent Activity | Audit Event Type | `agentType` value |
|---|---|---|
| Create agent identity blueprint | Add application | `agenticApp` |
| Create agent identity | Add service principal | `agenticAppInstance` |
| Create agent's user account | Add user | `agentIDuser` |
| Update agent identity blueprint | Update application | `agenticApp` |
| Update agent identity | Update service principal | `agenticAppInstance` |
| Delete agent identity blueprint | Delete application | `agenticApp` |
| Delete agent identity | Delete service principal | `agenticAppInstance` |

### `agentType` Property Values

The `agentType` property appears on: `auditAppIdentity`, `auditUserIdentity`, `targetResource`, `auditActivityPerformer`.

| Value | Meaning |
|---|---|
| `notAgentic` | Standard app, user, or service principal — not an agent |
| `agenticApp` | Agent identity blueprint (template/definition, analogous to app registration) |
| `agenticAppInstance` | Agent identity (specific running instance, analogous to service principal) |
| `agentIdentityBlueprintPrincipal` | The service principal representing the blueprint itself |
| `agentIDuser` | Agent's user account — lets agent act as a user with delegated permissions |
| `unknownFutureValue` | Evolvable enumeration sentinel — do not use |

> **Note**: To receive `agentIdentityBlueprintPrincipal` and `agentIDuser` values in Microsoft Graph responses, include the request header: `Prefer: include-unknown-enum-members`

### `blueprintId` Property
- Present on: `auditAppIdentity`, `targetResource`, `auditActivityPerformer`
- Object ID of the `agentIdentityBlueprint` associated with the event
- Use to correlate an agent identity (instance) back to its blueprint (template)
- Relationship is analogous to app registration ↔ service principal

### Audit Log Schema Changes (new fields added for agent tracking)

- `initiatedBy.app` now uses the `auditAppIdentity` resource type, which adds `agentType` and `blueprintId` alongside existing `appId`, `displayName`, `servicePrincipalId`, `servicePrincipalName`.
- `targetResource` resource type now includes `agentType` and `blueprintId`.
- `auditUserIdentity` resource type now includes `agentType`.
- New `auditActivityPerformer` resource type: provides `agentType`, `appId`, and `blueprintId` for the actor of an audit event.

### Detecting Agent Involvement in Audit Events
- Check `agentType` on `initiatedBy`, `performedBy`, and `targetResources` fields.
- Any value other than `notAgentic` indicates agent involvement.
- Both agent identity and agent's user account can appear in `initiatedBy` and `performedBy` events.

### Sign-In Logs

- `agentSignIn` sign-in event type contains agent-specific properties (app vs. instance, delegated vs. app-only).
- Available in Microsoft Entra admin center and Microsoft Graph API.
- Sign-ins can appear across all four sign-in log types depending on auth pattern.

**Filtering in Entra Admin Center** (Entra ID → Monitoring & health → Sign-in logs):
- Filter by **Agent type**: `Agent ID user`, `Agent Identity`, `Agent Identity Blueprint`, `Not Agentic`
- Filter by **Is Agent**: `No` or `Yes`

**Sign-in log location by access pattern:**
- Agent identities (actor) accessing resources → Service principal sign-in logs (`agentType: agenticAppInstance`)
- Agent's user account accessing resources → Non-interactive user sign-ins (`agentType: agentIDuser`)
- Users accessing agents → User sign-ins

---

## Identity Governance for Agents

### License Requirements Summary

| Feature | Required License |
|---|---|
| Agent ID (base platform) | Available for all Microsoft Entra customers |
| Conditional Access for agents | Microsoft Entra ID P1 |
| ID Protection for agents | Microsoft Entra ID P2 |
| ID Governance for agents | Microsoft Entra ID P1 |
| Network controls for agents (Global Secure Access) | Microsoft Entra Internet Access (standalone or via Microsoft Entra Suite) |
| Microsoft Agent 365 integration | Microsoft Agent 365 license per user |
| Full security feature set | Microsoft 365 E5 |

### Agent Identity Object Types

Four new object types introduced by the Agent identity platform:
1. **Agent identity blueprint** — template/definition (analogous to app registration)
2. **Agent identity blueprint principal** — the service principal representing the blueprint (used in multi-tenant scenarios)
3. **Agent identity** — specific running instance (analogous to service principal)
4. **Agent user** — optional user object paired 1:1 with an agent identity

Multi-tenant: An agent identity blueprint principal can be brought into a tenant with resources to create agent identities in that tenant — analogous to how a multitenant application has a service principal in each tenant.

### Access Packages for Agent Identities

When created, agent identities have limited permissions — only OAuth 2 delegated scopes inherited from their blueprint. Additional access is assigned via access packages.

**Access packages can grant:**
- Security Group memberships
- Application OAuth API permissions (including Graph application permissions)
- Microsoft Entra role assignments

**Access package assignment policy setting:** In the "Who can get access" section, select "For users, service principals, and agent identities in your directory" → "All agents". (If agents aren't using Entra Agent IDs, also create a policy with "All Service principals".)

**Three access request pathways:**
1. Agent identity self-requests programmatically via `accessPackageAssignmentRequest` Graph API.
2. Agent's sponsor requests on behalf of the agent (human oversight pathway).
3. Administrator directly assigns the agent identity or agent user to the access package.

**Expiry and renewal:** As an access package assignment approaches its expiry, the sponsor receives notifications. Sponsor can request extension (triggers new approval cycle) or allow expiry. If no action taken, assignment automatically expires and agent loses access.

### Management Portals

- **My Account portal** (`myaccount.microsoft.com`): Sponsors/owners manage agent identity lifecycle (enable/disable), view access, activity, and lifecycle details.
- **My Access portal** (`myaccess.microsoft.com`): Sponsors/owners request access packages on behalf of their agent identities.

### Sponsor Administration and Lifecycle

- Every agent identity must have a **sponsor** — a human user accountable for lifecycle and access decisions.
- If a sponsor leaves the organization, sponsorship automatically transfers to the sponsor's manager.
- Lifecycle Workflows can be configured to notify co-sponsors and managers of sponsors about impending sponsorship changes.
- Reference: [Agent identity sponsor tasks in Lifecycle Workflows](https://learn.microsoft.com/en-us/entra/id-governance/agent-sponsor-tasks)

### Integration with Microsoft Products

- **Microsoft Foundry**: Auto-provisions a default blueprint + agent identity per project on first agent creation; publishing an agent creates a dedicated blueprint + agent identity. Supports MCP and A2A authentication.
- **Azure App Service / Azure Functions**: Can be configured to use agent identity platform for secure resource connectivity.
- **Microsoft Copilot Studio**: Can be configured for automatic Entra agent identity assignment per agent. Creates a Copilot Studio agent identity blueprint and blueprint principal on first creation.
- **Microsoft Teams Developer Portal**: Developers can create and manage agent identity blueprints for Teams-platform agents.
- **Microsoft Agent 365**: Each AI agent gets its own Entra Agent ID for identity, lifecycle, and access management.

---

## Credential Management Best Practices

### Preferred Credential Types (in priority order)

1. **Federated identity credentials (managed identities)** — eliminates stored secrets entirely; preferred for production.
2. **Certificates** — stored in Azure Key Vault or HSM; rotate at least annually.
3. **Client secrets** — acceptable only for initial development/testing; rotate out before production.

### Key Rules
- **Isolate credentials per blueprint** — never reuse credentials across unrelated blueprints. Separate dev/test/prod with separate blueprints or environment-specific federated credentials.
- **Store certificate private keys in Azure Key Vault or HSM** — not in code or configuration files.
- If using federated credentials tied to a managed identity, **limit the managed identity's scope**.
- **Establish a rotation schedule** — rotate certificates at least annually.

### OAuth Flow Alignment

| Agent Operating Model | Correct OAuth Flow |
|---|---|
| Autonomous agents with no user context | Client credentials flow with only required app permissions |
| Interactive agents acting on behalf of a user | On-behalf-of (OBO) flow — user access policies and consent apply |
| General rule | Avoid granting app permissions when delegated permissions would suffice |

### Monitoring Token Usage
- Review sign-in logs to confirm agents are using the intended authentication method and credential type.
- Periodically audit API permissions consented on each blueprint to prevent privilege creep.

---

## Network-Level Controls (Global Secure Access / AI Gateway)

### Overview

Global Secure Access (GSA) provides network security controls for AI agents, currently focused on **Microsoft Copilot Studio agents**. Applies the same security policies to agents as are applied to users.

### Traffic Forwarding Architecture

Agent traffic is forwarded from Power Platform Admin Center to GSA's globally distributed proxy service. Forwarding is configured per-environment or per-environment-group.

**Traffic types covered:**
- HTTP Node traffic
- Custom connectors
- MCP Server Connector

### Security Policies

Applied via the **baseline profile** in Global Secure Access (tenant-level, ensuring consistent controls across all agent traffic):

| Policy Type | Description |
|---|---|
| Web content filtering | Control agent access to APIs and MCP servers by web category |
| Threat intelligence filtering | Automatically block and alert on malicious destinations using threat intelligence |
| Network file filtering | Restrict file uploads and downloads using file-type policies |
| Prompt injection detection | Detect and block prompt injection attacks — malicious instructions embedded in data processed by agent |
| Agent network activity logging | Log agent traffic to remote tools for audit and threat detection |

### Configuration Path
1. Enable traffic forwarding in Power Platform Admin Center (per-environment or per-environment-group).
2. Configure security policies via GSA baseline profile.
3. Reference: [Configure network security for Microsoft Copilot Studio agents](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-secure-web-ai-gateway-agents)

### Broader Entra Security Architecture Integration
- GSA enforces consistent network security policies across users and agents.
- Works in conjunction with CA and ID Protection for layered Zero Trust.
- Log agent network activity to remote tools for audit and threat detection.

---

## Security Best Practices Reference

### Blueprint Design
- [ ] Plan blueprints before deploying agents — define required settings, permissions, and metadata upfront.
- [ ] Provision a unique identity per agent instance — never share identities between agents.
- [ ] Assign a sponsor and an owner at creation time; verify periodically (especially after personnel changes).
- [ ] Provide descriptive metadata (description, tags, verified publisher) for each blueprint.
- [ ] Apply CA rules, API permissions, and governance controls at blueprint level — instances inherit automatically.
- [ ] Use the Agent ID framework for all agents — never create AI agents as plain app registrations or service principals outside the framework.
- [ ] Create agent's user accounts only when truly required (mailbox, Teams presence).

### Credential Management
- [ ] Use managed identities (FIC) or certificates in production; never client secrets.
- [ ] Isolate credentials per blueprint and per environment (dev/test/prod).
- [ ] Store certificate private keys in Azure Key Vault or HSM.
- [ ] Establish certificate rotation schedule (at least annually).
- [ ] Use OBO flow for user-context agents; client credentials only for autonomous agents.
- [ ] Avoid granting app permissions when delegated suffice.
- [ ] Review sign-in logs periodically to audit credential type usage.

### Access Controls
- [ ] Segment agents with custom security attributes (`Environment`, `Department`, `DataSensitivity`).
- [ ] Deploy CA policy blocking agents flagged with high risk level by Identity Protection.
- [ ] Create agent-specific CA policies — do not rely on user-targeted policies (agents can't satisfy MFA).
- [ ] Use report-only mode to test CA policies before enforcing them.
- [ ] Audit broad policies ("All users must use MFA") to ensure they don't inadvertently block agent flows.
- [ ] Implement least-privilege permissions; review and right-size periodically.

### Lifecycle Governance
- [ ] Register all agents in Microsoft Entra (including Copilot Studio, Azure, external platform agents).
- [ ] Standardize display name conventions (e.g., `Agent-HROnboardingBot` with department/function prefix).
- [ ] Configure periodic access reviews for agent identities (sponsor attestation every 6–12 months).
- [ ] Develop quarterly process to identify orphaned agents (missing sponsors, outdated metadata, no recent activity).
- [ ] Use access packages for common-access-pattern agent fleets (time-bound, auditable access via approval workflow).

### Monitoring and Alerting
- [ ] Set up alerts for:
  - Sudden spikes in token requests
  - Access to unexpected APIs
  - Sign-ins from unfamiliar IP ranges
  - Credential expiration (certificates or secrets approaching end date)
  - Agent blocked by CA or Identity Protection
  - Excessive failed token acquisition attempts
  - Unexpected permission or role changes
- [ ] Monitor audit logs for blueprint changes, credential additions, permission grants, role assignments outside normal deployment pipeline.
- [ ] Include agent identity checks in incident response post-mortems.
- [ ] Set log retention to cover agent activity for the organization's compliance framework duration.
- [ ] Export high-volume agent logs to secure archive if needed.

### Development/IT Coordination
- [ ] Build agents through supported creation channels (Copilot Studio, Graph APIs, Agent 365 CLI) — not manual Graph calls.
- [ ] Establish a production handshake process: identity admin verifies Entra Agent ID settings before production go-live.
- [ ] Test in a non-production tenant or sandbox before production.
- [ ] Treat agent configurations as code — check blueprint definitions, permission configurations, and setup scripts into source control.

---

## Source Citations

1. **Microsoft Entra security for AI overview** — threat model, agent types, Zero Trust overview, governance overview, GSA overview.
   `https://learn.microsoft.com/en-us/entra/agent-id/security-for-ai-overview`
   Last updated: 2026-05-08

2. **Best practices for Microsoft Entra Agent ID** — comprehensive operational best practices across all security domains.
   `https://learn.microsoft.com/en-us/entra/agent-id/best-practices-agent-id`
   Last updated: 2026-04-09

3. **Microsoft Entra Agent ID logs** — audit log schema, `agentType` values, `blueprintId`, sign-in log filtering.
   `https://learn.microsoft.com/en-us/entra/agent-id/sign-in-audit-logs-agents`
   Last updated: 2026-05-02

4. **Conditional Access for agent identities** — CA policy patterns, attribute-driven CA, OBO/app-only/user-account flows, boundaries and limitations.
   `https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id`
   Last updated: 2026-05-19

5. **ID Protection for agents (Preview)** — risk detection types, risky agent report, remediation actions, Graph API resources.
   `https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents`
   Last updated: 2026-05-12

6. **Governing Agent Identities** — license requirements, access packages, management portals, sponsor administration, multi-product integration.
   `https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview`
   Last updated: 2026-05-02

7. **Secure Web and AI Gateway for Microsoft Copilot Studio agents** — GSA traffic forwarding, baseline profile, security policy types, prompt injection detection.
   `https://learn.microsoft.com/en-us/entra/global-secure-access/concept-secure-web-ai-gateway-agents`
   Last updated: 2026-05-02
