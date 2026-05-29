---
area: concepts
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/what-is-microsoft-entra-agent-id
  - https://learn.microsoft.com/en-us/entra/agent-id/what-are-agent-identities
  - https://learn.microsoft.com/en-us/entra/agent-id/what-is-agent-id-platform
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-identities
  - https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns
  - https://learn.microsoft.com/en-us/entra/agent-id/how-to-plan-agent-identity-architecture
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint
extracted_at: 2026-05-29
---

# Concepts: Microsoft Entra Agent ID

## What is Microsoft Entra Agent ID?

Microsoft Entra Agent ID is an identity and security framework within the
Microsoft Entra product family that extends Microsoft Entra capabilities to AI
agents. As organizations deploy assistive, autonomous, and user-like agents,
they need purpose-built identity constructs to authenticate, authorize, govern,
and protect these nonhuman identities. Microsoft Entra Agent ID provides a
unified platform for managing agent identities at enterprise scale.

Microsoft Entra Agent ID brings together:

- **Identity management** — create and manage agent identities and blueprints.
- **Access protection** — Conditional Access policies, Identity Protection
  risk detection, and network-level controls apply to agents.
- **Governance** — Identity Governance lifecycle management for agents.
- **Compliance** — all agent authentication and activity is logged for audit.

Agent ID is available for all Microsoft Entra customers. Integration with
**Microsoft Agent 365** enables agents to operate across Microsoft 365
services and enterprise workflows (requires a Microsoft Agent 365 license per
user).

### Licensing requirements for security features

| Capability | License required |
|------------|-----------------|
| Conditional Access for agents | Microsoft Entra ID P1 |
| ID Protection for agents | Microsoft Entra ID P2 |
| ID Governance for agents | Microsoft Entra ID P1 |
| Network controls for agents | Microsoft Entra Internet Access (or Microsoft Entra Suite) |
| Full platform (bundled) | Microsoft 365 E5 |

### Protocols supported

Microsoft Entra Agent ID supports standard protocols including OAuth 2.0,
Model Context Protocol (MCP), and Agent-to-Agent (A2A) for authentication
and agent-to-agent communication.

### Third-party platform integration

Organizations can integrate agents from non-Microsoft platforms (AWS Bedrock,
n8n, and others supporting OAuth 2.0/OIDC) using the **Microsoft Entra Auth
SDK (sidecar)** or **workload identity federation**, giving every agent a
governed identity regardless of where it was built.

*Sources: what-is-microsoft-entra-agent-id, what-are-agent-identities*

---

## Agent Identity Types

### What is an "agent"

An agent is an application that attempts to achieve a goal by understanding
its environment/context, making decisions, and acting on them autonomously
using available tools. Agents can act with or without human intervention.

Key components of an agent:

- **Model** — Language model serving as the centralized decision maker;
  can be general-purpose, multimodal, or fine-tuned.
- **Orchestration Layer** — Cyclical process governing how the agent takes
  in information, performs internal reasoning, and acts; ranges from simple
  decision rules to chained logic.
- **Memory** — Provides dynamic, up-to-date information to the agent;
  differs from static LLMs.
- **Tools** — Enable agents to interact with their environment (web search,
  database access, APIs, file systems, software integrations).

Agent workflows are in whole or in part planned and driven autonomously.
Subcomponents, skills, tools, or APIs used in workflows may or may not
themselves be agents.

### Identity type overview

There are three main identity constructs for an AI agent:

| Identity type | When to use | Key characteristics |
|---------------|-------------|---------------------|
| **Agent identity** | The agent acts on its own behalf or on behalf of users | Enforced sponsorship, distinct audit log entries, blueprint-managed credentials |
| **Agent's user account** | The agent needs access to a resource that requires a user object (e.g., Exchange mailbox, Teams channel) | User account paired 1:1 with an agent identity; has UPN, manager, and other user properties |
| **Service principal** (NOT recommended for agents) | Scripted, predictable operations without autonomous decision-making | Classic application identity without agent-specific governance, transparency, or lifecycle management |
| **Regular user account** (NOT recommended) | — | Causes problems with Conditional Access, ID Protection, and governance; shows agents alongside humans in GAL/Teams |

### Why NOT a service principal for agents

Service principals are designed for deterministic, static workloads. Agent
identities provide agent-specific capabilities unavailable on service
principals:

- Dedicated identity type with explicit sign-in and audit log entries.
- Platform-level restrictions on certain high-privilege authorizations
  (reduced blast radius from a compromised agent).
- Enforced sponsorship — every agent identity has an accountable business
  owner assigned at creation.
- Blueprint-managed credentials and lifecycle — create, rotate, and delete
  agent identities through the parent blueprint, not individually.
- Support for **ephemeral agent identities** created at runtime with
  inheritable permissions already granted and deleted when the task
  completes.

### Why NOT a regular user account for agents

- Conditional Access policies (compliant device, MFA, terms of use) fail —
  they are designed for human interactions.
- Microsoft Entra ID Protection uses ML tuned for human sign-in behavior;
  routing AI agent traffic through user accounts degrades detections.
- Identity governance (joiner-mover-leaver workflows, access packages,
  access reviews) may incorrectly remove agent access.
- Agents would appear in the Global Address List, Teams, and SharePoint
  alongside human employees.

### Operation patterns

An agent's operation pattern determines how it acquires tokens and what
context it acts in. There are two primary patterns:

| Dimension | Autonomous | Interactive |
|-----------|-----------|-------------|
| User context | No user present | User is signed in |
| Permission type | Application permissions | Delegated permissions |
| Consent model | Admin consent required | User or admin consent |
| Token subject | Agent identity | User (with agent as actor) |
| Common scenarios | Background processing, scheduled tasks, system-to-system | Chat assistants, user-facing copilots, agents acting on user data |
| Access scope | Broad, tenant-wide access | Scoped to the signed-in user's data |

Some agents need both patterns (e.g., nightly background sync + responding
to user chat messages). Implement both OAuth flows and select the appropriate
token based on the operation.

*Sources: what-are-agent-identities, how-to-plan-agent-identity-architecture*

---

## How Agent ID Differs from App/User Identity

### vs. Application identities (service principals)

Application identities (service principals) were designed for services built
and maintained by organizations. They carry the expectation of long-term
stability, known ownership, and managed lifecycle.

Agents are often created dynamically through automation, user actions in
tools like Copilot Studio, or API orchestration. An agent might exist for
minutes during a specific task, or be created and destroyed thousands of
times per day as part of an automated workflow. Managing this level of
dynamism with existing application identities creates operational complexity
and security challenges.

Agent identities embrace dynamic nature while providing appropriate security
controls: bulk creation, consistent policies, retirement without orphaned
credentials or permission assignments. The identity model is designed for
scale and ephemerality rather than permanence.

### vs. Human user identities

Human user identities are tied to authentication mechanisms humans use
daily: passwords, multifactor authentication, passkeys. Human users have
mailboxes, teams, and organizational hierarchy.

Agent identities represent software systems, not human beings. They don't
use human authentication mechanisms. However, certain scenarios require
agents to appear and operate as if they're human users. For these scenarios,
agent identities can be paired with an **agent's user account** — a special
Microsoft Entra user account that maintains a 1:1 relationship with its
paired agent identity. This allows organizations to provide agents with a
user identity when necessary for system compatibility, while maintaining
clear separation and appropriate security policies for AI-driven operations.

*Sources: what-are-agent-identities*

---

## The Agent Identity Platform Architecture

The Microsoft agent identity platform is purpose-built for AI agents —
unlike nonagentic application identities (for web services) or user
identities (for humans). It provides authentication, authorization,
governance, and discovery capabilities for agents in enterprise environments.

### Core platform components

**Authentication service**
An OAuth 2.0 and OpenID Connect (OIDC) standard-compliant authentication
service that issues tokens for agents to access resources and APIs. Supports
both application-only and delegated access scenarios. Three objects form the
core identity constructs: agent identity blueprint, agent identity, and
agent's user account.

**SDKs**
Software development kits that abstract token acquisition and protocol
handling. Microsoft agent identity platform includes two SDKs:

- **Microsoft Identity Web** (.NET)
- **Microsoft Entra SDK for agent ID**

**Agent management**
A comprehensive agent metadata store and administrative interface within the
Microsoft Entra admin center. Provides:

- Ability for administrators to discover, view, configure, and manage agents.
- The **agent registry** — a centralized repository for registering and
  managing agents across an organization.

### Authentication and authorization protocols

- **OpenID Connect (OIDC)** — enables agents to authenticate and verify the
  identity of other entities they communicate with, establishing secure
  trust relationships.
- **OAuth 2.0** — allows agents to request access tokens that authorize
  them to access resources on behalf of themselves or users (both
  application-only and delegated access).

Tokens are the fundamental security mechanism. The platform supports
multiple token flow patterns for specific operational scenarios. See
[tokens in Microsoft agent identity platform](https://learn.microsoft.com/en-us/entra/agent-id/agent-tokens).

### Integration and interoperability

| Integration point | Details |
|-------------------|---------|
| Microsoft Entra ID | Platform extends existing identity infrastructure and policies |
| Platforms creating agents | Copilot Studio (Microsoft), AWS Bedrock, n8n, and any OAuth 2.0/OIDC-compatible framework |
| Extended security products | Conditional Access, Identity Protection, Identity Governance, Global Secure Access |

For non-Microsoft agents, use the **Microsoft Entra Auth SDK (sidecar)** or
**workload identity federation**. No platform-specific credential management
is required.

*Sources: what-is-agent-id-platform*

---

## Agent Identity Object Model

### Agent identity anatomy

An agent identity is a special service principal in Microsoft Entra ID. It
represents the identity that the agent identity blueprint created and is
authorized to impersonate. It does NOT have credentials of its own.

Components of an agent identity:

| Component | Description |
|-----------|-------------|
| **id (object ID)** | Unique identifier generated by Microsoft Entra (e.g., `aaaaaaaa-1111-2222-3333-bbbbbbbbbb`). Both `id` and `appId` always have the same value. |
| **Credentials** | Agent identities have NO credentials of their own. They rely on the agent identity blueprint to acquire tokens on their behalf. |
| **Display name** | Human-friendly name surfaced in admin center, Azure portal, Teams, Outlook, etc. Can be changed. |
| **Sponsor** | Optional. Records the human user or group accountable for the agent. Used when a security incident occurs. |
| **Blueprint** | All agent identities are created from a reusable template called an agent identity blueprint. |
| **Agent's user account (optional)** | A second Microsoft Entra user account (user type, decorated as AI agent) paired 1:1 with the agent identity. Has its own distinct `id` but a fixed 1:1 relationship with the agent identity. |

### Credential model and FIC chain

Agent identities authenticate exclusively using **federated identity
credentials (FIC)** issued by the agent identity blueprint. Credentials
reside on the blueprint, NOT on the agent identity. Credential types
configured on the blueprint:

- **Federated identity credentials (FIC)**
- **Certificates / cryptographic keys**
- **Client secrets**

Because credentials are blueprint-managed, credential rotation and
compromise affect all agent identities under a blueprint together.

### Token model

Agent identities support three token contexts:

1. **Agent tokens (autonomous)** — Blueprint acquires a token where the
   subject (`sub`) is the agent identity.
2. **Incoming access tokens** — The agent accepts tokens where the audience
   (`aud`) is the agent identity, allowing it to identify and authorize
   callers.
3. **User tokens (interactive/OBO)** — Blueprint acquires a token where the
   subject is the user and the actor is the agent identity (on-behalf-of
   flow).

### Tenancy model

Agent identities are always **single-tenant** — they can only be issued
tokens in the Microsoft Entra tenant where they're created and cannot access
resources in other tenants. However, agent identity blueprints can be
**multitenant** — a multitenant blueprint can be published and added to
other tenants, where it creates tenant-local agent identities.

### Agent identity blueprint anatomy

An agent identity blueprint is more than a template. It holds authentication
material, defines policies, and can perform provisioning operations.

**Blueprint shared properties (across all child agent identities):**

- **Description** — Brief summary of the agent's purpose and functions.
- **App roles** — Define roles that can be given to users and other
  principals when using the agent.
- **Verified publisher** — The organization that built the agent.
- **Settings for authentication protocols** — Configuration for which
  information is included in access tokens (e.g., `OptionalClaims`).

Full schema: `agentidentityblueprint` resource in Microsoft Graph API.

**Blueprint operational identity (to create agent identities):**

- **OAuth client ID** — unique ID used to request access tokens from
  Microsoft Entra ID.
- **Credentials** — used to request access tokens.
- **`AgentIdentity.CreateAsManager`** — special Microsoft Graph permission
  that enables the blueprint to create agent identities in the tenant.

**Inheritable permissions and required resource access:**

- **Required resource access** — declares the APIs and permissions the agent
  needs to function; visible to administrators during consent review.
- **Inheritable permissions** — define which resource apps can have their
  permissions automatically inherited by agent identities created from the
  blueprint. When an admin grants permissions on the blueprint principal from
  an inheritable resource app, all agent identities automatically receive
  those permissions.

Note: These are declarations only — administrators must still consent to
permissions on the blueprint principal or individual agent identities.

### Agent identity blueprint principal

When a blueprint is added to a tenant, Microsoft Entra creates a
corresponding **agent identity blueprint principal** object. This principal:

- **Token issuance** — When the blueprint acquires tokens within a tenant,
  the resulting token's `oid` (object ID) claim references the blueprint
  principal.
- **Audit logging** — Actions performed by the blueprint (e.g., creating
  agent identities) are recorded in audit logs as executed by the blueprint
  principal.

An agent identity blueprint is initially created in a Microsoft Entra
tenant. "Single-tenant" blueprints are used within that same tenant.
"Multitenant" blueprints can be published to potential customers via
Microsoft catalogs; customers add the blueprint to their tenant (creating a
blueprint principal), use it to create tenant-local agent identities, and
can remove it by deleting the blueprint principal.

*Sources: agent-identities, agent-blueprint*

---

## Agent Identity Design Patterns

### Key identity constructs recap

| Construct | Role in patterns |
|-----------|-----------------|
| **Agent identity blueprint** | Template and authentication foundation for ≥1 agent identities; holds credentials and policies |
| **Agent identity blueprint principal** | Microsoft Entra object created when a blueprint is added to a tenant; acquires tokens, creates agent identities, appears in audit logs |
| **Agent identity** | Runtime identity for a specific AI agent; holds its own permissions on downstream resources |
| **Agent's user account** | Optional 1:1 account paired with an agent identity; needed only when the agent must access systems requiring a user object |

### Permissions model

- **Blueprint permissions (inheritable)** — minimum permissions shared
  across all agent identities from that blueprint. Use for a common
  baseline.
- **Agent identity permissions (differentiated)** — permissions for a
  specific agent. Use when different agents in the same system need
  different access.

### Trust boundary

A trust boundary is the shared risk surface where a single compromise is
assumed to affect the entire perimeter. Agents running on separate
platforms with separate service accounts, secrets, and network segments do
NOT share a trust boundary. Trust boundary is an application threat-modeling
decision, not one that Microsoft Entra Agent ID defines.

### Pattern 1: Low-code singleton agent

- **Use case** — A single agent assisting with a specific task, commonly
  built on low-code/no-code platform (e.g., Copilot Studio). Acts on behalf
  of a signed-in user (interactive) or as itself (autonomous).
- **Structure** — One blueprint → one agent identity
- **Why a blueprint for a single agent?** — Gives consistent Conditional
  Access policies, monitoring, governance, and audit entries; same
  infrastructure as multi-agent systems.
- **Permissions** — Grant directly on the agent identity. Blueprint
  inheritable permissions not typically needed.
- **Agent's user account** — Not required unless the agent needs Exchange,
  Teams, or another system requiring a user object.

### Pattern 2: Domain worker (sequential multi-agent)

- **Use case** — Multiple agents working together in a tightly coupled,
  sequential workflow for a common domain goal. Agents share codebase,
  run in the same runtime (e.g., same Kubernetes namespace), and have the
  same security posture. Each has distinct responsibilities and different
  access to downstream resources. Maps to
  [sequential orchestration](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#sequential-orchestration-example).
- **Structure** — One blueprint → multiple agent identities (one per agent
  role)
- **Why one blueprint?** — All agents share the same trust boundary.
- **Why separate agent identities?** — Actions are attributed to a specific
  agent in audit/sign-in logs; each holds different permissions.
- **Example** — Retail product management system with store inventory,
  product comparison, and supplier inventory agents in one Kubernetes
  namespace.
- **Permissions** — Shared baseline as inheritable on blueprint; role-specific
  permissions directly on each agent identity.
- **Agent's user account** — Not typically required.

### Pattern 3: Concurrent orchestrator with domain workers

- **Use case** — An orchestrator agent dynamically activates different
  domain workers based on the incoming task. Domain workers may run on
  different platforms, be operated by different teams, and cross trust
  boundaries. Maps to
  [concurrent orchestration](https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#concurrent-orchestration).
- **Structure** —
  - Blueprint A → orchestrator agent identity
  - Blueprint B → domain worker agent identities (one per role,
    cross-trust-boundary group)
  - Blueprint C → another domain worker group (separate team or platform)
- **Why separate blueprints for domain workers?** — They cross trust domain
  boundaries (separate runtimes, secrets, teams). Blueprint credentials are
  scoped to a trust domain; a compromise in one domain does not affect
  peer agents.
- **Ephemeral agent identity variant** — The orchestrator creates a
  temporary agent identity at runtime to facilitate a specific interaction
  (e.g., coordinating with a maintenance subsystem), grants it permissions
  inherited from the blueprint, and deletes the identity when the session
  ends. This limits blast radius to the duration of the task. Note:
  ephemeral identity creation introduces nondeterministic latency.
- **Permissions** — Orchestrator and each domain worker group have their
  own permission sets, scoped to their respective blueprints and agent
  identities.
- **Agent's user account** — Not typically required unless a domain worker
  must access a user-object-dependent resource.

### Pattern 4: Per-user agents (small-n)

- **Use case** — A separate agent identity for each user or organizational
  unit. Examples: SOC analyst agent with one instance per cloud environment,
  or audit agent with one instance per department. The number of agent
  identities is moderate (tens to low hundreds) — NOT one per directory
  user.
- **Structure** — One blueprint → one agent identity per user, department,
  or environment
- **When appropriate** — Each agent instance needs different permissions,
  different auditing boundaries, or an independent lifecycle.
- **Permissions** — Each agent identity holds permissions scoped to its
  user/org unit. Inheritable blueprint permissions set minimum baseline;
  additional permissions assigned per agent identity.
- **Agent's user account** — Consider pairing when each agent acts as a
  named representative for its user or department (e.g., a dedicated sales
  agent that receives email on behalf of a territory).

### Pattern 5: Digital worker (fully autonomous agent)

- **Use case** — A fully autonomous agent acting as a digital employee,
  provisioned with resources typically reserved for human employees: an
  Exchange mailbox, OneDrive share, and Teams presence. Highest level of
  agent autonomy.
- **Structure** — One blueprint → one agent identity → one agent's user
  account
- **Key constraint** — The 1:1 relationship between agent identity and
  agent's user account is fixed. An agent's user account cannot be shared
  across multiple agent identities.
- **Example** — An AI sales representative with a real mailbox listed in
  the Global Address List, that responds to email and is assigned a human
  manager in the org chart.
- **Permissions** — Grant the agent's user account the specific Exchange,
  Teams, and OneDrive permissions it needs. Grant the agent identity
  application-level permissions for systems that don't require a user object.
- **Agent's user account** — Required. Create one agent's user account per
  digital worker agent identity.

### Patterns to AVOID

**Scale-out replicas do NOT need separate agent identities**
Running multiple instances of the same agent code (scale-out) doesn't
require separate identities. Scale-out is a runtime concern: the blueprint
acquires tokens as the agent identity, and multiple instances can all run
under the same identity simultaneously. Separate identities per replica adds
directory objects and management overhead without audit, access control, or
accountability benefit.

**Memory and context management do NOT require separate agent identities**
Agent memory is typically a shared data store (e.g., Azure Cache for Redis
or Azure AI Search) where data is filtered by session ID at retrieval time.
Access is controlled by the agent identity's permissions, not by separate
identities per session.

**Do NOT use scaled per-object agent identities in directory**
Creating one agent identity per meeting, document, or ephemeral object at
high volume is not practical with directory-level identities today. For
high-flux scenarios, use shared agent identities and rely on session/context
identifiers at the application layer to distinguish interactions.

*Sources: concept-agent-id-design-patterns*

---

## Planning Your Agent Identity Architecture

Work through these four decisions in order, as earlier choices shape later
ones. Some single-agent deployments may only need the first two steps.

### Step 1: Choose an identity type

- **Default choice: agent identity**
- Add an **agent's user account** when the agent must access systems that
  require a user object (Exchange, Teams, SharePoint).
- **Service principal** — not recommended for agent workloads.
- **Regular user account** — not recommended; breaks Zero Trust enforcement
  across Conditional Access, ID Protection, and Identity Governance.

### Step 2: Choose an operation pattern

**Autonomous** when the agent:

- Runs background or scheduled tasks.
- Processes data across multiple users.
- Performs system-to-system operations without a user present.

**Interactive** when the agent:

- Operates on behalf of a signed-in user.
- Needs access to that user's data (mail, calendar, files).
- Must respect the user's own permission boundaries.

**Both patterns** when the agent does both (e.g., nightly background sync +
user chat). Implement both OAuth flows; select the appropriate token based
on the operation.

Reference:

- Autonomous: [Request agent tokens for autonomous agents](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/autonomous-agent-request-tokens)
- Interactive: [Authenticate users in interactive agents](https://learn.microsoft.com/en-us/entra/agent-id/identity-platform/interactive-agent-authenticate-user)

### Step 3: Decide how many agent identity blueprints

**Default rule: one blueprint per trust boundary.**

A trust boundary is the shared risk surface where a single compromise
affects the entire perimeter. Agents that share a runtime, secrets, file
system, and network share a trust boundary and can share a blueprint.

| Factor | Use the same blueprint | Use separate blueprints |
|--------|----------------------|------------------------|
| Authentication material | Same credentials can be shared; rotation/compromise affects all agents together | Credentials must be cryptographically isolated; compromise must not spread to peer agents |
| Security boundary | Same trust boundary: same runtime, secrets, file system, network | Cross trust domain boundaries: separate environments, runtimes, or isolation domains |

**Factors that are NOT reasons to add more blueprints:**

- Blocking authentication — disable a single agent identity or target it
  with Conditional Access without adding a blueprint.
- Audit separation — each agent identity produces its own sign-in and audit
  log entries under the parent blueprint.
- Scale-out or replicas — running multiple instances doesn't require
  multiple blueprints.
- Memory or context separation — agent memory is filtered by session ID at
  retrieval time.

### Step 4: Decide how many agent identities per blueprint

**Default rule: one agent identity per logical agent.**

A distinct identity per agent gives the highest fidelity of audit trails,
tracing, and access control.

| Factor | Use separate agent identities | Use shared agent identity |
|--------|------------------------------|--------------------------|
| Audit and attribution | Actions must be attributable to a specific agent | "The system" acting is sufficient |
| Lifecycle independence | Agents are created, deleted, or revoked independently | Agents are created, deleted, and governed as one unit |
| Role separation | Agents have distinct responsibilities (e.g., inventory lookup, product comparison) | Agents are interchangeable |

**Factors that are NOT reasons to add more agent identities:**

- Horizontal scale-out — replicas don't require separate identities.
- Memory pools and context management — shared data store filtered by
  session ID; separate identities not needed.

*Sources: how-to-plan-agent-identity-architecture*

---

## Key Terminology Glossary

| Term | Definition |
|------|-----------|
| **Agent** | An application that achieves a goal by understanding its environment, making decisions, and acting autonomously using available tools. |
| **Agent identity** | A special service principal in Microsoft Entra ID used by an AI agent to authenticate and authorize against resources. Has no credentials of its own; relies on its parent blueprint. |
| **Agent identity blueprint** | An object in Microsoft Entra ID that serves as a template for creating agent identities. Holds credentials, policies, app roles, and metadata shared across all child agent identities. |
| **Agent identity blueprint principal** | The Microsoft Entra tenant object created when a blueprint is added to a tenant. The `oid` in tokens issued by the blueprint references this object. |
| **Agent's user account** | A special Microsoft Entra user account paired 1:1 with an agent identity. Required only when the agent must access systems that require a user object (Exchange, Teams, OneDrive). |
| **Sponsor** | A human user or group recorded as accountable for an agent identity. Used for incident response contact. |
| **Federated Identity Credential (FIC)** | A credential type on the blueprint that enables the blueprint to acquire tokens on behalf of agent identities without storing secrets on the agent identity itself. |
| **Inheritable permissions** | Permissions configured on a blueprint that are automatically propagated to all agent identities created from it when an admin consents at the blueprint level. |
| **Required resource access** | A declaration on the blueprint listing the APIs and permissions the agent needs; shown to admins during consent review. |
| **Trust boundary** | The shared risk surface where a single compromise is assumed to affect the entire perimeter. Drives the decision of how many blueprints to use. |
| **Ephemeral agent identity** | An agent identity created at runtime by an orchestrator for a specific task and deleted when the task completes. Limits blast radius to the duration of the task. |
| **Autonomous operation pattern** | Agent acts without a user present, using application permissions and admin consent. Subject of tokens is the agent identity. |
| **Interactive operation pattern** | Agent acts on behalf of a signed-in user, using delegated permissions and user/admin consent. Subject of tokens is the user; actor is the agent identity. |
| **Agent registry** | The centralized repository within the Microsoft Entra admin center for registering and managing agents across an organization. |
| **Digital worker** | A fully autonomous agent provisioned with enterprise resources (Exchange mailbox, OneDrive, Teams) typically reserved for human employees. Requires an agent's user account. |
| **Domain worker** | Multiple agents working in a tightly coupled, sequential workflow for a common domain goal, sharing a codebase and runtime. |
| **`AgentIdentity.CreateAsManager`** | A special Microsoft Graph permission granted to a blueprint that enables it to create agent identities in the tenant. |
| **Microsoft Entra Auth SDK (sidecar)** | SDK enabling non-Microsoft agent platforms to integrate with Microsoft Entra Agent ID for identity management. |
| **Workload identity federation** | Federation mechanism enabling non-Microsoft agent platforms to obtain Microsoft Entra tokens without managing secrets. |
| **Multitenant blueprint** | An agent identity blueprint configured to be added to multiple tenants via Microsoft catalogs. Creates tenant-local agent identities in each customer tenant. |
| **Single-tenant agent identity** | Agent identities are always single-tenant; they can only be issued tokens and access resources within their home tenant. |

*Sources: all*

---

## Source Citations

| Section | Sources |
|---------|---------|
| What is Microsoft Entra Agent ID? | what-is-microsoft-entra-agent-id, what-are-agent-identities |
| Agent Identity Types | what-are-agent-identities, how-to-plan-agent-identity-architecture |
| How Agent ID Differs from App/User Identity | what-are-agent-identities |
| The Agent Identity Platform Architecture | what-is-agent-id-platform |
| Agent Identity Object Model | agent-identities, agent-blueprint |
| Agent Identity Design Patterns | concept-agent-id-design-patterns |
| Planning Your Agent Identity Architecture | how-to-plan-agent-identity-architecture |
| Key Terminology Glossary | all sources |
