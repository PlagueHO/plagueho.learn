---
section_id: "11-getting-started"
title: "Getting Started"
status: complete
areas: [foundry, agent-framework, sdk-sidecar, blueprint]
---

# Getting Started

## Prerequisites and Licensing

**Required roles:** `Agent ID Developer` (create blueprints and FICs; no secrets/certs) or `Agent ID Administrator` (full access). Blueprint creators are auto-set as owners. Additional roles for permission grants: `Privileged Role Administrator` (Graph app permissions), `Cloud Application Administrator` or `Application Administrator` (delegated permissions).

**Key Graph permissions (programmatic):** `AgentIdentityBlueprint.Create`, `AgentIdentityBlueprintPrincipal.Create`, `AgentIdentity.Create.All`, `AppRoleAssignment.ReadWrite.All`

**Licensing:**

| Capability | Minimum license |
|---|---|
| Agent identities and blueprints | All Microsoft Entra customers |
| Conditional Access for agents | Microsoft Entra ID P1 |
| Identity Protection for agents | Microsoft Entra ID P2 |
| Identity Governance for agents | Microsoft Entra ID P1 |
| Network controls (Global Secure Access) | Microsoft Entra Internet Access or Entra Suite |
| Full security feature set | Microsoft 365 E5 |

## Choose Your Starting Path

| Your scenario | Starting path |
|---|---|
| Building an agent using **Foundry Agent Service** (portal, API, or SDK) | [Foundry Agent Service path](#foundry-agent-service) |
| Building an agent in code using **Microsoft Agent Framework** (.NET or Python) | [Agent Framework path](#microsoft-agent-framework) |
| Integrating a **non-Microsoft agent** (AWS Bedrock, n8n, custom container) | [Sidecar path](#non-microsoft-agents-with-the-sidecar) |

---

### Foundry Agent Service

Foundry automatically provisions a **default blueprint + default agent identity** on first agent creation — no manual blueprint setup required during development.

1. Create or open an Azure AI Foundry project and build your agent.
2. Configure MCP tool authentication for each connected server.
3. Assign RBAC roles to the **agent identity** (`agentIdentityId`) — not the managed identity — on every target resource.
4. When ready for production: **publish** the agent. Publishing creates a distinct blueprint and agent identity. **Repeat all RBAC assignments** for the new `agentIdentityId` — shared project identity roles do not carry over.

---

### Microsoft Agent Framework

For **model-only agents** (`ChatClientAgent`), no separate Entra Agent ID is created — the calling application's credential is used throughout. For **Foundry-backed agents** (`FoundryAgent`), Foundry provisions an Entra Agent ID for the agent.

1. Install: `Microsoft.Agents.AI.Foundry` (prerelease), `Azure.AI.Projects` (prerelease), `Azure.Identity`.
2. Use `AzureCliCredential` for local dev, `ManagedIdentityCredential` for production.
3. Publish the agent in the Foundry portal to provision a distinct agent identity.
4. Assign RBAC permissions to the agent identity on all target resources.

> In production, prefer `ManagedIdentityCredential` over `DefaultAzureCredential` to avoid latency from credential probing and unintended fallback.

---

### Non-Microsoft Agents with the Sidecar

For agents built outside Azure (AWS Bedrock, n8n, custom containers) that need to call Microsoft APIs as a governed Entra agent identity:

1. Create a blueprint in Microsoft Entra ID (admin center or Graph API).
2. Explicitly create the blueprint principal — it is NOT auto-created.
3. Configure a federated identity credential (managed identity recommended).
4. Deploy `mcr.microsoft.com/entra-sdk/auth-sidecar` as a companion container bound to the pod-local network only. Never expose it via a public load balancer or ingress.
5. From agent code, call `/AuthorizationHeaderUnauthenticated/{serviceName}` on the sidecar for each downstream API token. Zero credential handling in agent code.
6. Assign the agent identity the required RBAC roles on every target resource.

---

## Quick Start: Foundry Hosted Agent with Entra Agent ID

The most common production scenario — a Foundry-hosted agent calling Azure services (Storage,
Cosmos DB, Graph) via MCP tools.

### Step 1: Create a Blueprint

**Admin center (recommended for first-time setup):**

1. Sign in to [entra.microsoft.com](https://entra.microsoft.com/).
2. Go to **Entra ID > Agents > Agent blueprints > New agent blueprint (Preview)**.
3. Enter a display name; assign at least one owner and one sponsor. Select **Create**.
4. After creation, configure identifier URIs, OAuth permission scopes, and federated credentials
   in the blueprint's detail pages or via Graph API.

> Always include the `OData-Version: 4.0` header on all Graph API calls. Without it, the API
> may silently create a standard app registration instead of an agent identity blueprint —
> no error is returned.

### Step 2: Deploy a Foundry Hosted Agent

1. Open your Azure AI Foundry project.
2. Create and publish an agent (portal or SDK). Publishing creates a distinct blueprint and
   agent identity automatically.
3. Locate the agent identity ID: portal → agent application resource → Overview → **JSON View**
   → latest API version → copy `agentIdentityId`.

### Step 3: Configure MCP Tool Authentication

In the Foundry portal (**Tools > Custom > MCP**), choose the authentication method for each
connected MCP server:

| Scenario | Recommended method |
|---|---|
| Different agents need different access levels | Microsoft Entra — agent identity (`AgenticIdentityToken`) |
| All project agents share the same access level | Microsoft Entra — project managed identity |
| Per-user authorization required (user's data, not a shared identity) | OAuth identity passthrough |
| MCP server has no Entra support | Key-based (API key/PAT) |

Prefer Entra-based authentication — it eliminates secret management and provides built-in
token rotation via managed identity.

### Step 4: Assign RBAC Permissions

Assign RBAC roles to the **agent identity** (`agentIdentityId`) on each target resource —
for example, `Storage Blob Data Reader` on a storage account or `Cosmos DB Built-in Data
Reader` on a Cosmos DB account.

> `azd` automatically assigns the **Foundry User** role to the shared project identity for
> unpublished agents. Published agents receive distinct identities that require **manual**
> role assignments. `azd` does not configure Container Registry, Application Insights,
> or custom resource permissions.

## Common Errors and Fixes

| Error | Root cause | Fix |
|---|---|---|
| API creates a standard app instead of a blueprint | Missing `OData-Version: 4.0` header on Graph API call | Add `OData-Version: 4.0` to every Graph API request; use the typed endpoint `/applications/microsoft.graph.agentIdentityBlueprint` |
| `400: The Agent Blueprint Principal does not exist` | Blueprint principal is not auto-created | Explicitly `POST /servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal` immediately after creating the blueprint |
| `400: No sponsor specified` | `sponsors@odata.bind` missing from blueprint creation payload | Provide at least one sponsor using `/users/{objectId}` format; security groups and role-assignable groups are not supported as sponsors |
| `403` immediately after granting admin consent | Permission propagation delay of 30–120+ seconds | Retry with exponential backoff; disconnect and reconnect to Graph between retries to get a fresh token |
| Agent can't access resource after publishing | Shared project identity RBAC roles do not carry over to the new distinct identity | Locate the new `agentIdentityId` after publish and repeat all RBAC role assignments |
