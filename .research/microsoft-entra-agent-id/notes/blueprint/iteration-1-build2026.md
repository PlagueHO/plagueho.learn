---
source_url:
  - https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint
  - https://learn.microsoft.com/en-us/microsoft-agent-365/developer/
source_title: "Agent identity blueprint — creation, object model & Agent 365 registration (Build 2026 currency check)"
source_date:
  create-blueprint: "2026-05-09"   # \"Last updated on 05/09/2026\"
  agent-blueprint: "2026-05-02"    # \"Last updated on 05/02/2026\"
  agent-365-developer: "2026-05-01" # \"Last updated on 05/01/2026\"
area: blueprint
dimensions:
  - blueprint-creation-channels
  - blueprint-object-model
  - agent-365-registration
  - getting-started
extracted: "2026-06-04"
quality: draft
iteration: 1
trigger: "Microsoft Build 2026 currency refresh — verify sections 08 & 11"
access_notes: "All three pages fetched successfully (no 404 / no sign-in wall). Content read from public, unauthenticated render."
---

# Iteration 1 — Build 2026 currency check: blueprint creation & registration

## Scope

Verify, against current Learn docs, whether the portal wizard "New agent
blueprint (Preview)" is still preview, capture the newly recommended
registration tooling (Microsoft 365 Agents SDK GA, Agent 365 CLI
`a365 setup all`), and detect any drift in the blueprint object model, required
roles, or the OData-Version header gotcha since the guide was written
(2026-05-29).

---

## Key facts

### Portal wizard — STILL Preview

1. The portal wizard step is **still labelled "New agent blueprint (Preview)"**.
   Exact navigation: *Entra ID > Agents > Agent blueprints > select **New agent
   blueprint (Preview)***.
   — `create-blueprint`, updated **2026-05-09**, status: **Preview**.
   <https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint>
2. The wizard creates **both the blueprint and its blueprint principal
   automatically**, but only sets the name, owners, and sponsors. Credentials,
   identifier URIs, scopes, and permissions must still be configured afterward
   via Graph API / PowerShell or the blueprint detail pages.
   — `create-blueprint`, 2026-05-09, Preview.
3. Two creation channels remain: **(a) Microsoft Entra admin center wizard**
   (quick setup) and **(b) Microsoft Graph API / PowerShell** (full programmatic
   config in one workflow). No change to this two-channel model since 2026-05-29.
   — `create-blueprint`, 2026-05-09.

### Required roles — EXPANDED (new dedicated Agent ID roles)

4. Two **dedicated Agent ID roles now exist** and are the least-privileged path:
   **Agent ID Developer** and **Agent ID Administrator** — both can create agent
   identity blueprints and blueprint principals. Agent ID Developer can configure
   federated identity credentials (FIC); Agent ID Administrator can configure FIC
   **and** is required to add a secret or certificate credential.
   — `create-blueprint`, 2026-05-09, status: **GA roles in permissions
   reference** (linked to permissions-reference).
5. Classic directory roles still listed as alternatives: **Privileged Role
   Administrator** (least-privileged to grant Graph *application* permissions),
   and **Cloud Application Administrator** / **Application Administrator** (to
   grant Graph *delegated* permissions). PowerShell path requires **version 7**.
   — `create-blueprint`, 2026-05-09.
6. **Owners of a blueprint or blueprint principal can create agent identities
   without any Entra Agent ID role.** Blueprint creators are automatically set as
   owners of both the blueprint and its principal.
   — `create-blueprint`, 2026-05-09.

### OData-Version header gotcha — UNCHANGED

7. The **`OData-Version: 4.0` header is still required** on the programmatic
   Graph calls (`POST /v1.0/applications/`, the `federatedIdentityCredentials`
   add, the `PATCH` for identifier URI/scope, and the blueprint-principal `POST`).
   No change from 2026-05-29.
   — `create-blueprint`, 2026-05-09.

### NEW: Agent 365 registry registration step (the major delta)

8. There is a **new section "Register agents in the Agent 365 registry"** that
   did not factor into the 2026-05-29 guide. After creating a blueprint, you
   register it in the Agent 365 registry so admins can discover/govern the agent
   from the Microsoft 365 admin center.
   — `create-blueprint`, 2026-05-09.
9. **Recommended path #1 — Microsoft 365 Agents SDK (GA):** "The Microsoft 365
   Agents SDK is now generally available and is the recommended way to build and
   provision agents. The SDK handles agent identity creation and registration in
   the Agent 365 registry for you, so your agent identities appear automatically
   with no extra code." Recommended for new projects or where code can migrate.
   — `create-blueprint`, 2026-05-09, status: **GA**.
   SDK home: <https://learn.microsoft.com/en-us/microsoft-365/agents-sdk/>
10. **Recommended path #2 — Agent 365 CLI:** handles setup including registration.
    Exact command: `a365 setup all`. Retry-only registration:
    `a365 setup all --agent-registration-only`.
    — `create-blueprint`, 2026-05-09.
    CLI setup ref:
    <https://learn.microsoft.com/en-us/microsoft-agent-365/developer/reference/cli/setup>
11. **Fallback path #3 — direct Graph + Agent Registry API:** if you must create
    blueprints with the Graph API (e.g. existing identity-issuance workflows), you
    must add an **explicit second call to the Agent Registry API** to POST the
    agent card after creating the blueprint, handled in a retry-safe two-call
    pattern. Existing blueprints not visible in the registry can be back-filled
    (batch endpoint for bulk).
    — `create-blueprint`, 2026-05-09.

### Naming nuance — two similarly named SDKs (do not conflate)

12. **Microsoft 365 Agents SDK** (GA) is the recommended build/provision/register
    path on the create-blueprint page. It is **different from** the **Agent 365
    SDK**, which "does not create or host agents" — it *enhances* already-built
    agents with Entra-backed identity, governed Work IQ tool access, OpenTelemetry
    observability, notifications, and governance. The Agent 365 SDK *complements*
    (does not replace) the Microsoft 365 Agents SDK.
    — `agent-365-developer`, updated **2026-05-01**.
    <https://learn.microsoft.com/en-us/microsoft-agent-365/developer/>
13. The **Agent 365 CLI** is positioned as the lifecycle "command-line backbone":
    it can **create agent blueprints and all supporting resources**, manage Work IQ
    tools/permissions, deploy agent code to Azure, publish app packages to the
    admin center, and clean up blueprints/identities/Azure resources.
    — `agent-365-developer`, 2026-05-01.

### Blueprint object model — UNCHANGED since 2026-05-29

14. Shared blueprint properties remain: **Description, App roles, Verified
    publisher, authentication-protocol settings (e.g. OptionalClaims)**, plus
    **Required resource access** and **Inheritable permissions**. To provision
    identities a blueprint has an OAuth client ID, credentials, and the special
    `AgentIdentity.CreateAsManager` Graph permission. Full schema unchanged at the
    Graph reference.
    — `agent-blueprint`, updated **2026-05-02**.
    <https://learn.microsoft.com/en-us/graph/api/resources/agentidentityblueprint>
15. **Blueprint principal** semantics unchanged: token `oid` references the
    principal; audit log actions attributed to the principal; single-tenant vs
    multitenant (catalog-published) blueprints; a principal is always created when
    a blueprint is added to a tenant.
    — `agent-blueprint`, 2026-05-02.

---

## Quotable passages

> "Select **New agent blueprint (Preview)**." — create-blueprint, 2026-05-09.

> "The Microsoft 365 Agents SDK is now generally available and is the recommended
> way to build and provision agents. The SDK handles agent identity creation and
> registration in the Agent 365 registry for you, so your agent identities will
> appear automatically with no extra code." — create-blueprint, 2026-05-09.

> "The OData-Version header must be set to 4.0." — create-blueprint, 2026-05-09.

> "Although very similar in name, it doesn't replace the Microsoft 365 Agents SDK
> ... On the contrary, the Agent 365 SDK complements it by layering governance,
> compliance, and lifecycle controls on top of agents built with it or other
> platforms." — agent-365-developer, 2026-05-01.

---

## Code snippets (current)

Connect for blueprint creation (PowerShell):

```powershell
Connect-MgGraph -Scopes "AgentIdentityBlueprint.Create", "AgentIdentityBlueprint.AddRemoveCreds.All", "AgentIdentityBlueprint.UpdateAuthProperties.All", "AgentIdentityBlueprintPrincipal.Create", "User.Read" -TenantId <your-tenant-id>
```

Create blueprint (Graph — note OData-Version header):

```http
POST https://graph.microsoft.com/v1.0/applications/
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "@odata.type": "Microsoft.Graph.AgentIdentityBlueprint",
  "displayName": "My Agent Identity Blueprint",
  "sponsors@odata.bind": ["https://graph.microsoft.com/v1.0/users/<id>"],
  "owners@odata.bind": ["https://graph.microsoft.com/v1.0/users/<id>"]
}
```

Agent 365 registry registration (CLI — recommended):

```bash
a365 setup all
# retry only the registration step:
a365 setup all --agent-registration-only
```

---

## Relationships to other dimensions

- **Section 08 (Agent Identity Blueprint):** object model is current, but the
  *creation/registration narrative* is now incomplete — add the Agent 365 registry
  step and the new Agent ID Developer / Agent ID Administrator roles.
- **Section 11 (Getting Started):** the recommended on-ramp has shifted from
  "portal wizard or Graph" to "Microsoft 365 Agents SDK (GA) → auto-registers" or
  "Agent 365 CLI `a365 setup all`", with raw Graph relegated to a fallback that
  now requires an extra Agent Registry API call.
- Cross-links to Agent 365 SDK (governance) and Conditional Access for blueprints.

---

## Limitations / constraints

- Portal wizard cannot set credentials, identifier URIs, scopes, or permissions —
  still post-creation only.
- Sponsors cannot be security groups or role-assignable groups (users, dynamic
  membership groups, or M365 groups only).
- Managed identity (FIC) recommended for production; secrets/certs for
  local/dev only; tenant credential-lifetime policies may cap `endDateTime`.

---

## Questions raised for follow-up

- Is the portal **wizard** preview expected to GA on a published timeline? The
  page gives no GA date for the wizard itself (only the SDK is GA).
- Does the `a365 setup all` flow internally use the Microsoft 365 Agents SDK or
  call Graph + Agent Registry API directly? (Setup reference not fetched this
  iteration.)
- Confirm whether the new **Agent ID Developer / Agent ID Administrator** roles
  are GA or preview in the permissions-reference page (not fetched this iteration).

---

## Staleness flags for the published guide

- **STALE (08 & 11):** guide presents portal wizard + Graph as the two paths with
  no mention of the Agent 365 registry registration step or the GA Microsoft 365
  Agents SDK as the *recommended* path. Must add.
- **STALE (08 & 11):** roles section should add **Agent ID Developer** and
  **Agent ID Administrator** as the least-privileged dedicated roles.
- **CURRENT:** wizard still "(Preview)"; OData-Version 4.0 header still required;
  blueprint object model and principal semantics unchanged.
