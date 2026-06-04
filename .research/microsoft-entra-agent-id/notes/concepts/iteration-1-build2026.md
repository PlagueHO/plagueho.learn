---
area: concepts
iteration: 1
trigger: Microsoft Build 2026 currency refresh
extracted_at: 2026-06-04
quality: draft
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-users
  - https://learn.microsoft.com/en-us/microsoft-agent-365/overview
  - https://learn.microsoft.com/en-us/microsoft-agent-365/developer/
  - https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra
  - https://aka.ms/BuildFoundryAgents
  - https://aka.ms/ProjectLobster-Blog
  - https://aka.ms/BUILD_SecurityBlog
dimensions:
  - autopilot-agents
  - agent-365-sdk
  - entra-agent-id-convergence
  - identity-terminology
  - doc-tree-restructure
---

# Iteration 1 Notes — concepts (Build 2026)

Scope: two Microsoft Build 2026 (2026-06-02) deltas as they relate to **Microsoft
Entra Agent ID** — (1) Autopilot agents and (2) Agent 365 SDK GA + Agent 365 ↔
Entra Agent ID convergence. Every fact carries an inline source URL with
`doc_status`, preview/GA `status`, and the doc `updated` date where available.

## Autopilot agents

- An **Autopilot agent** is a newly introduced **third category** of agent
  surfacing in Microsoft 365 (after *assistive* agents that act on the user's
  behalf inside Copilot/chat, and *autonomous* agents that act on their own
  behalf in the background with no collaborative surface). Autopilot agents "act
  independently with Entra Agent ID, email address, Microsoft Teams presence, and
  place in the org chart. They can initiate conversations, work on shared files,
  follow up on action items, and collaborate with humans over time." — [Foundry Build 2026 blog](https://aka.ms/BuildFoundryAgents) (doc_status: blog-announced, references a Learn Foundry how-to; status: public preview; published: 06/02/2026)
- The Foundry blog points to a Learn how-to for creating Autopilot agents:
  `https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates`
  ("Create AI teammates"). This means Autopilot agents are **not strictly
  blog-only** — there is a Foundry how-to reference — but the canonical
  *concept/identity* definition was found only in blog prose, not on an Entra
  Agent ID Learn page. — [Foundry Build 2026 blog](https://aka.ms/BuildFoundryAgents) (doc_status: blog-announced + Foundry Learn how-to link, not independently verified this iteration; status: public preview)
- "Every action is attributable, auditable, and governed via Agent 365 in
  Microsoft Admin Center." Autopilot governance is anchored in Agent 365, and
  setup (provisioning, identity, admin approval) is handled by the Azure
  Developer CLI in a single workflow. — [Foundry Build 2026 blog](https://aka.ms/BuildFoundryAgents) (doc_status: blog-only for governance detail; status: public preview)
- **Microsoft Scout** is Microsoft's **first Autopilot agent** — described in a
  separate blog as the first in "a new category of agents called Autopilots …
  always-on agents that work autonomously, with their own identity, and act on
  your behalf." — [Microsoft Scout blog (Project Lobster)](https://aka.ms/ProjectLobster-Blog) (doc_status: blog-only; status: private preview / Frontier experimental; published: 06/02/2026)
- Scout's identity model: "Every agent operates under its own governed Entra
  identity, not a shared, anonymous service account, so the work it does is
  attributable to a known actor your directory already understands." Credentials
  are "scoped to the task at hand, redacted from logs or diagnostics, and managed
  with the same rigor you expect from any first-party Microsoft service." — [Microsoft Scout blog](https://aka.ms/ProjectLobster-Blog) (doc_status: blog-only; status: preview)
- Scout is powered by **OpenClaw** open-source technology; Microsoft is
  contributing policy conformance upstream to OpenClaw. Access requires Frontier
  enrollment, Intune policy configuration, and an opt-in attestation; users with
  a GitHub Copilot license can install it. Setup docs:
  `https://learn.microsoft.com/microsoft-scout`. — [Microsoft Scout blog](https://aka.ms/ProjectLobster-Blog) (doc_status: blog-only; status: private preview)
- **Identity distinction (agent identity vs agent's user account):** The
  Autopilot "email address, Teams presence, org-chart placement" capabilities map
  directly to the **agent's user account** subtype documented in Entra Agent ID —
  a "digital worker" identity for scenarios where "an agent needs to act as a
  user … with mailboxes, chat access, and inclusion in HR systems." The blogs do
  not name this subtype explicitly, but the Learn doc is the underlying identity
  primitive. — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)

## Agent's user account / digital worker identity model (Learn-documented foundation)

- The **agent's user account** is "a subtype of user identity within Microsoft
  Entra," created so an agent can "act as a user, functioning essentially as a
  digital worker." It receives tokens with claim **`idtyp=user`**, letting it
  access APIs/services that require user identities. — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)
- The relationship between an agent's user account and its parent **agent
  identity** is a **1:1 immutable mapping**: "Each agent identity can have at most
  one associated agent's user account, and each agent's user account is linked to
  exactly one parent agent identity, itself linked to exactly one agent identity
  blueprint application." — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)
- The agent's user account is **optional**, created only when an agent must act as
  a user; it is created via an **agent identity blueprint** (which needs an
  explicitly granted permission, not default), and "Can only authenticate by
  presenting a token issued to the associated agent identity." — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)
- Security constraints: no passwords/passkeys (only the parent agent-identity
  reference credential — a confidential client credential); cannot hold
  privileged admin roles; cannot use custom role assignment or role-assignable
  groups; permissions "typically similar to guest users." Production auth uses
  **Federated Identity Credentials (FIC)**. — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)
- Capabilities: can be added to Entra groups (including dynamic groups, but **not**
  role-assignable groups), added to administrative units, and **assigned licenses**
  (often needed to provision Microsoft 365 resources). This licensing capability
  underpins Autopilot mailbox/Teams presence. — [Entra agent users (Learn)](https://learn.microsoft.com/en-us/entra/agent-id/agent-users) (doc_status: Learn; updated: 04/09/2026)

## Agent 365 SDK & Entra Agent ID convergence

- **Agent 365 SDK general availability** was announced at Build 2026: "With the
  general availability of the Agent 365 SDK, developers can integrate controls
  directly into their development workflows, bringing observability, access
  controls, and compliance enforcement into how agents are designed and deployed."
  — [Microsoft Security Build 2026 blog](https://aka.ms/BUILD_SecurityBlog) (doc_status: blog-announced; status: GA; published: 06/02/2026)
- **CAUTION / possible mislink:** The Security blog's "Agent 365 SDK" GA link
  resolves to `https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/agents-sdk-overview`
  (the **Microsoft 365 Agents SDK**), but the Agent 365 developer Learn page
  explicitly states the Agent 365 SDK "doesn't replace the Microsoft 365 Agents
  SDK … On the contrary, the Agent 365 SDK complements it." Treat the GA claim as
  referring to the **Agent 365 SDK** per the blog text; the inline link target is
  a different (similarly named) SDK. — [Security blog](https://aka.ms/BUILD_SecurityBlog) vs [Agent 365 developer (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) (doc_status: Learn; updated: 05/01/2026)
- **What the Agent 365 SDK is:** it "does not create or host agents. Instead, it
  enhances agents you've already built — regardless of the underlying stack — by
  adding enterprise capabilities such as Entra-based Agent identity, governed Work
  IQ tool access, OpenTelemetry (OTel) based observability, notifications through
  the Activity protocol, and agent ID-driven governance." Works with agents built
  on any SDK/platform (Copilot Studio, Azure AI Foundry, Microsoft Agent
  Framework, Microsoft Agents SDK, OpenAI Agents SDK, Claude Code SDK, LangChain)
  on any cloud (Azure, AWS, GCP). — [Agent 365 developer (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) (doc_status: Learn; updated: 05/01/2026)
- With the Agent 365 SDK, agents "Use Entra-backed Agent Identity with their own
  user resources like mailbox for secure authentication and controlled access to
  tools and data" and "Function within an IT-approved blueprint system, ensuring
  each agent instance inherits compliance, governance, and security policies."
  The blueprint comes from **Microsoft Entra agent blueprint**
  (`entra/agent-id/identity-platform/agent-blueprint`). — [Agent 365 developer (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) (doc_status: Learn; updated: 05/01/2026)
- **Separation of concerns (Agent 365 vs Entra Agent ID):** "Agent 365 focus[es]
  on discovering and inventorying all agents, while Entra Agent ID enables
  customers to manage agents at scale with the right identities, permissions, and
  protections required for enterprise deployment." Agents discovered through Agent
  365 "can be assigned a first-class identity in Entra Agent ID." This convergence
  is documented at `entra/agent-id/identity-platform/agent-registry-convergence`
  ("Agent Registry convergence with Microsoft Agent 365"). — [Agent 365 capabilities-entra (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra) (doc_status: Learn; updated: 05/13/2026)
- **Microsoft Agent 365 itself is GA:** "As of May 1, 2026, Microsoft Agent 365
  is generally available for the Commercial segment on a per user basis." Best
  with Microsoft E5 prerequisite; at least one user needs a qualifying Agent 365
  license. — [Agent 365 overview (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/overview) (doc_status: Learn; updated: 06/04/2026; status: GA since 05/01/2026)
- Agent 365's three pillars — **Observe, Govern, Secure** — converge identity,
  governance, and observability: Entra enforces risk-based access controls for
  agents, Purview provides DLP/information protection, Defender adds runtime
  threat detection. The Agent Registry (Microsoft 365 admin center) gives a
  centralized inventory. — [Agent 365 overview (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/overview) (doc_status: Learn; updated: 06/04/2026)
- **Agent 365 CLI** complements the SDK across the lifecycle: create agent
  blueprints and supporting resources, manage Work IQ tools/permissions, deploy
  agent code to Azure, publish app packages to Microsoft admin center, and clean
  up blueprints/identities. — [Agent 365 developer (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/) (doc_status: Learn; updated: 05/01/2026)
- **Entra-side governance controls** referenced from Agent 365: agent sponsorship/
  ownership and lifecycle workflows (`entra/id-governance/agent-id-governance-overview`),
  **Conditional Access for agents** (`entra/identity/conditional-access/agent-id`),
  **Entra ID Protection for agents** (risky-agent detection,
  `entra/id-protection/concept-risky-agents`), and Secure Web & AI Gateway for
  Copilot Studio agents. — [Agent 365 capabilities-entra (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra) (doc_status: Learn; updated: 05/13/2026)

## Net-new identity terminology / status changes vs a guide written 2026-05-29

- **NEW term — "Autopilot agent" (Autopilots):** a third agent category with its
  own Entra Agent ID, email, Teams presence, and org-chart placement. Not present
  in a 2026-05-29 guide; introduced 2026-06-02. — [Foundry blog](https://aka.ms/BuildFoundryAgents) / [Scout blog](https://aka.ms/ProjectLobster-Blog) (status: public preview / private preview)
- **NEW term — "Microsoft Scout":** first Autopilot agent; "AI teammate" / "digital
  worker" framing; powered by OpenClaw. — [Scout blog](https://aka.ms/ProjectLobster-Blog) (status: private preview / Frontier experimental)
- **STATUS CHANGE — Agent 365 SDK → GA** at Build 2026 (was not GA on 2026-05-29).
  — [Security blog](https://aka.ms/BUILD_SecurityBlog) (status: GA, 06/02/2026)
- **CONFIRMED — Microsoft Agent 365 GA since 05/01/2026** (predates the prior
  guide; verify the guide reflects GA, not preview). — [Agent 365 overview (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/overview)
- **"AI teammates"** appears as Learn anchor text for Autopilot creation
  (`#create-ai-teammates` on the Foundry agent-365 how-to) — emerging synonym for
  Autopilot agents. — [Foundry blog link](https://aka.ms/BuildFoundryAgents) (doc_status: Foundry Learn how-to, not independently verified this iteration)

## Entra Agent ID doc-tree restructure (observed)

The new `entra/agent-id/identity-platform/...` and `identity-professional/...`
subpaths from the prior iteration are **confirmed** via cross-links on the Agent
365 Learn pages:

- `entra/agent-id/identity-platform/agent-blueprint` — "Microsoft Entra agent
  blueprint". — referenced from [Agent 365 developer (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/developer/)
- `entra/agent-id/identity-platform/what-is-agent-id-platform` — "Microsoft Entra
  agent identity platform". — referenced from [capabilities-entra (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra)
- `entra/agent-id/identity-platform/agent-registry-convergence` — "Agent Registry
  convergence with Microsoft Agent 365". — referenced from [capabilities-entra (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra)
- `entra/agent-id/identity-professional/microsoft-entra-agent-identities-for-ai-agents`
  — landing concept "Microsoft Entra Agent ID". — referenced from [capabilities-entra (Learn)](https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra)

Implication: the guide's Entra Agent ID links should be re-pathed to the
`identity-platform/` (developer/platform) and `identity-professional/` (concept)
subtrees. (Subpaths observed via inbound links; pages not fetched this iteration.)

## Questions raised for follow-up

- Verify the Foundry how-to `azure/foundry/agents/how-to/agent-365#create-ai-teammates`
  directly to confirm whether Autopilot agents have a canonical Entra Agent ID /
  agent's-user-account mapping documented on Learn (vs blog narrative only).
- Confirm the canonical Learn landing page for the **Agent 365 SDK** GA (the
  Security blog link appears to point at the Microsoft 365 Agents SDK instead).
- Fetch `entra/agent-id/identity-platform/agent-registry-convergence` to extract
  the precise Agent 365 ↔ Entra Agent ID registry-sync identity-assignment flow.

## Access notes

- Learn MCP fetch endpoint (`learn.microsoft.com/api/mcp`) was unavailable;
  all Learn pages were retrieved via `fetch_webpage` fallback instead.
- No URL returned a 404 or sign-in wall this iteration; all 7 sources loaded.
