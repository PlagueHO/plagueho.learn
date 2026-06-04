---
source_urls:
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
  - https://learn.microsoft.com/en-us/azure/foundry/agents/overview
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
  - https://aka.ms/FoundryBuildNews
source_titles:
  - What are hosted agents?
  - What is Microsoft Foundry Agent Service?
  - Agent identity concepts in Microsoft Foundry
  - "What's new in Microsoft Foundry | Build Edition"
source_dates:
  - 2026-06-03  # hosted-agents (Last updated)
  - 2026-06-03  # overview (Last updated)
  - 2026-04-13  # agent-identity (Last updated)
  - 2026-06-02  # Build blog (published)
area: foundry
dimensions:
  - foundry-agent-service
  - hosted-agents
  - agent-identity
  - rbac
  - auth-flows
extracted: 2026-06-04
quality: draft
iteration: 1
note: Build 2026 currency refresh — verifying section 04 (Foundry Agent Service Integration)
---

# Iteration 1 — Hosted agents & Entra identity model (Build 2026)

Iteration-scoped deep read to verify the CURRENT status of hosted agents in
Foundry Agent Service and their Entra agent identity model against the existing
guide (section 04, written 2026-05-29). All four target sources were reachable —
**no 404 or sign-in wall encountered**.

## Key facts

1. **Hosted agents are STILL in preview as of Build 2026 — NOT GA.** The
   concepts page section is explicitly titled "Limits, pricing, and availability
   (preview)" and states "Hosted agents are currently in preview."
   (<https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents>,
   updated 2026-06-03, status: **preview**)

2. **GA is announced for "early July 2026."** The Build blog states "[hosted
   agents] are expected to reach general availability by early July 2026, with
   sandboxed sessions, state, filesystem access, and framework flexibility."
   (<https://aka.ms/FoundryBuildNews>, published 2026-06-02, status: **preview →
   GA expected early July 2026**)

3. **The overview page labels the type "Hosted agents (preview)"** and notes
   "Hosted agents are currently in public preview."
   (<https://learn.microsoft.com/en-us/azure/foundry/agents/overview>, updated
   2026-06-03, status: **public preview**)

4. **Per-agent Entra identity is auto-created at deploy; a separate project
   managed identity handles infra.** "Every Hosted agent deployed to a Foundry
   project gets its own dedicated Microsoft Entra ID (agent identity) and
   dedicated endpoint—both created automatically at deploy time."
   (<https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents>,
   updated 2026-06-03, status: preview)

5. **The Foundry RBAC roles were RENAMED** (documented on both the hosted-agents
   page, updated 2026-06-03, and the agent-identity page, updated 2026-04-13).
   See dedicated section below.

6. **The runtime four-step token exchange model is UNCHANGED** from the existing
   guide.
   (<https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity>,
   updated 2026-04-13, status: stable)

## Hosted-agents identity model (current)

Two identities are involved per the hosted-agents concepts page (updated
2026-06-03, preview):

| Identity | Lifecycle | Purpose |
| --- | --- | --- |
| Microsoft Entra ID (agent identity, **per-agent**) | Created automatically at deploy time | The identity the agent container authenticates with at runtime — model invocation, tool access, downstream Azure services. |
| Project managed identity (**project-wide**) | System-assigned on the Foundry project | Used by the platform for infrastructure operations (e.g., Container Registry Repository Reader on the registry). **Not** the agent's runtime identity. |

> Quote (hosted-agents, 2026-06-03): "When you deploy with azd, the required
> RBAC role (Foundry User at account scope) is assigned to the agent's Microsoft
> Entra ID automatically. For external resources (for example, your own Azure
> Storage), you assign RBAC manually to the agent's Microsoft Entra ID."

### OBO vs managed identity (invocation mode)

When integrated via Microsoft 365 channels (e.g., Teams), hosted agents operate
in two identity modes depending on how they are invoked (hosted-agents,
2026-06-03, preview):

- **User-invoked scenarios (interactive):** If a user token is present, the
  platform supports OAuth 2.0 **On-Behalf-Of (OBO)** flows — the agent calls
  downstream services on behalf of the user using the user's delegated
  permissions, subject to Entra tenant policies.
- **Autonomous or background scenarios:** If no user token is available, the
  agent authenticates using its own Microsoft Entra ID (agent identity),
  **typically via managed identity**, to access downstream services.

> Quote: "In both cases, the agent retains its dedicated Microsoft Entra ID for
> authentication, authorization, and auditability."

This maps to the agent-identity page's two named authentication capabilities
(2026-04-13, stable): **Attended (delegated / OBO)** and **Unattended
(application-only / client credentials)**.

## Foundry RBAC role rename (verified on TWO pages)

Identical "Important" callout on both the hosted-agents page (2026-06-03) and the
agent-identity page (2026-04-13):

> "The Foundry RBAC roles were recently renamed. **Foundry User, Foundry Owner,
> Foundry Account Owner, and Foundry Project Manager** were previously named
> **Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI Project
> Manager.** You might still see the previous names in some places while the
> rename rolls out. **The role IDs and core permissions are unchanged by the
> rename.**"

| Old name | New name |
| --- | --- |
| Azure AI User | Foundry User |
| Azure AI Owner | Foundry Owner |
| Azure AI Account Owner | Foundry Account Owner |
| Azure AI Project Manager | Foundry Project Manager |

- Role IDs: **unchanged**.
- Core permissions: **unchanged**.
- Rollout: in progress — old names may still appear.
- azd behavior (agent-identity, 2026-04-13): "azd automatically assigns **Foundry
  User** to the shared project agent identity for unpublished agents." Published
  agents get distinct identities requiring **manual** role assignments. azd does
  NOT configure Container Registry, Application Insights, or custom-resource
  permissions.

## Runtime token exchange (unchanged — cross-check)

The four-stage OAuth 2.0 exchange on the agent-identity page (2026-04-13) matches
the existing guide:

1. **Blueprint authentication** — Agent Service presents the blueprint's OAuth
   credentials to Entra ID.
2. **Agent identity token issuance** — Entra ID validates and issues a token for
   the specific agent identity (distinct from user/managed-identity tokens).
3. **Scoped token request** — Agent Service exchanges the agent identity token
   for an access token scoped to the downstream service's audience (e.g.,
   `https://storage.azure.com`).
4. **Authenticated tool call** — scoped token passed to the MCP server / A2A
   endpoint; resource validates token and checks the agent identity's RBAC role
   assignments.

Federated-credential model (agent-identity, 2026-04-13): the blueprint has a
**federated credential trust relationship with the project's managed identity**;
at runtime Agent Service uses that managed identity to authenticate the blueprint
to Entra ID (no client secret/cert). The agent identity — not the managed
identity — is the principal requiring RBAC on the target resource.

## Impact on existing section 04 (Foundry Agent Service Integration)

Items that would make the existing 2026-05-29 section stale or inaccurate:

- **STATUS LABEL:** Section must clearly label hosted agents as **public preview
  (as of Build 2026)** with **GA expected early July 2026**. Do not state or
  imply GA yet.
- **AGENT TYPE COUNT:** The existing guide describes **three** Foundry agent
  types (prompt, workflow, hosted). The CURRENT overview page (2026-06-03) lists
  only **two main agent types**: "Prompt agents — author in portal or code …"
  and "Hosted agents (preview) — your agent code, run by Foundry." Workflow
  agents are **no longer listed as a top-level agent type** on the overview.
  ⚠️ Flag for correction / verification.
- **RBAC ROLE NAMES:** Any reference to "Azure AI User/Owner/Account
  Owner/Project Manager" should be updated to the new "Foundry …" names (note
  role IDs/permissions unchanged; old names may still surface during rollout).
- **azd ROLE:** If the guide says azd assigns "Azure AI User," update to
  "**Foundry User** at account scope."
- **IDENTITY SPLIT:** Ensure section 04 distinguishes the **per-agent Entra
  agent identity** (runtime) from the **project managed identity** (infra only) —
  the current docs are explicit that the managed identity is NOT the agent's
  runtime identity.
- **INVOCATION MODE:** Confirm the OBO (user-invoked) vs managed-identity
  (autonomous/background) distinction is captured for hosted agents.

## Questions raised (for follow-up)

- Has the "workflow agent" type been removed/renamed, or relocated to a separate
  doc? The current overview only enumerates prompt + hosted. Verify before
  editing section 04's "three agent types" claim.
- Does the GA milestone (early July 2026) change the RBAC default-role guidance
  or the preview region list? (Region list is currently 20 regions; preview-only
  concurrency cap of 50 active sessions/subscription/region.)
- Confirm whether "public preview" (overview) vs "preview" (concepts page) is a
  meaningful distinction or just wording.
