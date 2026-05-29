---
area: blueprint
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint
  - https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-id-ai-guided-setup
  - https://learn.microsoft.com/en-us/entra/agent-id/create-delete-agent-identities
extracted_at: 2026-05-29
---

# Agent Identity Blueprint: Microsoft Entra Agent ID

## What is an Agent Identity Blueprint?

An agent identity blueprint is an object in Microsoft Entra ID that serves as a
template for creating agent identities. It is more than just a template — like an
architectural blueprint that includes plumbing, electrical, and structural details,
an agent identity blueprint includes critical information about authentication,
permissions, and activity logs.

**Problem it solves:** Organizations that deploy multiple AI agents of the same type
need a consistent configuration. Blueprints let you define credentials, permissions,
and app roles once and provision multiple agent identities from that single definition —
each agent gets its own identity and credentials, but they share common characteristics
defined by the blueprint.

**Blueprint vs. agent identity relationship:**
- One blueprint → N agent identities
- All agent identities in a Microsoft Entra ID tenant must be created from an agent
  identity blueprint
- Disabling a blueprint prevents ALL its agent identities from authenticating
- Deleting a blueprint triggers automatic cleanup of all child agent identities

**Key capabilities:**
- Holds authentication config (OAuth client ID, credentials, scopes)
- Defines inheritable permissions that flow down to all agent identities
- Container for applying Conditional Access policies across all agent identities
- Audits all operations performed by the blueprint's agent identities

Full Graph API schema: <https://learn.microsoft.com/en-us/graph/api/resources/agentidentityblueprint>

---

## Blueprint Object Model

An agent identity blueprint has the following properties shared across all its
agent identities:

| Property | Description |
|---|---|
| `displayName` | Human-readable name for the blueprint |
| `description` | Brief summary of the agent's purpose and functions |
| `appId` | OAuth client ID — unique ID used to request access tokens from Entra ID |
| `identifierUris` | Array of URIs that identify the blueprint; must be set explicitly (e.g., `api://{appId}`) |
| `app roles` | Roles that can be assigned to users and other principals when using the agent |
| `verifiedPublisher` | Organization that built the agent |
| `api.oauth2PermissionScopes` | OAuth2 scopes the blueprint exposes for incoming requests |
| `requiredResourceAccess` | Declares APIs and permissions the agent needs (visible during consent review) |
| `keyCredentials` / `passwordCredentials` | Certificate/secret credentials (not recommended for production) |
| `federatedIdentityCredentials` | Managed identity federation (recommended for production) |
| `optionalClaims` | Settings for auth protocol / which information is included in access tokens |

**Special Graph permission on the blueprint object:**
- `AgentIdentity.CreateAsManager` — special Microsoft Graph permission that enables the
  blueprint to create agent identities in the tenant

The blueprint **does not** have `passwordCredentials` on individual agent identities;
credentials live exclusively on the blueprint.

---

## Blueprint Principal

An **agent identity blueprint principal** is an object in Microsoft Entra Agent ID
that represents the presence of an agent identity blueprint within a specific tenant.

**How it differs from a regular service principal:**
- Created via typed endpoint: `POST /servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal`
- It is NOT autocreated when you create the blueprint application — must be provisioned
  as an explicit separate step
- Removing the principal removes the blueprint from the tenant (for multi-tenant scenarios)

**Roles in the trust chain:**

1. **Token Issuance:** When the blueprint acquires tokens in a tenant, the resulting
   token's `oid` (object ID) claim references the blueprint principal — ensuring all
   authentication and authorization by the blueprint is traceable to its principal
2. **Audit Logging:** Actions performed by the blueprint (e.g., creating agent identities)
   are recorded in audit logs as being executed by the blueprint principal — provides
   accountability and traceability
3. **Permission Grant Target:** Admins grant permissions on the blueprint principal;
   those permissions are then inherited by all agent identities created from the blueprint

**API to create the principal:**

```http
POST https://graph.microsoft.com/v1.0/servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "appId": "<agent-blueprint-app-id>"
}
```

---

## Inheritable Permissions vs Required Resource Access

The blueprint includes two distinct permission-related configurations:

### Required Resource Access (`requiredResourceAccess`)

- **What:** Declares the APIs and permissions the agent needs to function
- **Who sees it:** Visible to administrators during consent review — helps them evaluate
  whether to approve the agent
- **Does it grant permissions?** No — it is a declaration only; admins must still consent
- **Analogous to:** The `requiredResourceAccess` array on any app registration

### Inheritable Permissions

- **What:** Defines which resource apps can have their permissions automatically inherited
  by agent identities created from the blueprint
- **How inheritance works:** When an administrator grants permissions on the blueprint
  principal from an "inheritable resource app," all agent identities in that organization
  receive those permissions automatically — no per-identity consent required
- **Does it grant permissions?** No — admins must still consent on the blueprint principal,
  but once consented, all child agent identities inherit
- **Analogous to:** A policy that propagates downward to all instances

**Key distinction:**
- `requiredResourceAccess` = "here's what this agent needs" (informational/governance)
- Inheritable permissions = "automatically flow these permissions to all instances once
  consented at the blueprint level"

For more details: <https://learn.microsoft.com/en-us/entra/agent-id/concept-inheritable-permissions>

---

## Single-Tenant vs Multi-Tenant Blueprints

| Aspect | Single-Tenant | Multi-Tenant |
|---|---|---|
| Definition | Blueprint created in and used within the same tenant | Blueprint published for use by external customer tenants |
| Blueprint principal location | Same tenant as the blueprint application | Exists in each customer tenant that adds the blueprint |
| How customers add it | N/A (same tenant) | Customers add blueprint to their tenant; Entra creates a blueprint principal in the customer tenant |
| How customers remove it | Delete the blueprint | Delete the blueprint principal from their tenant |
| Use case | Internal enterprise agents, first-party development | ISV agents, marketplace distribution via Microsoft catalogs |
| Admin center navigation | Entra ID > Agents > Agent blueprints | Blueprint principal visible in each adopting tenant |

In both cases, an agent identity blueprint principal is always created when a blueprint
is added to a tenant. The presence of this principal indicates a blueprint exists and
can be used to create agent identities in that tenant.

---

## Creating a Blueprint (Step-by-Step)

### Prerequisites

**Required roles (at minimum one of):**
- **Agent ID Developer** — create blueprints, principals, FICs; *cannot* add secrets/certs
- **Agent ID Administrator** — full administrative access including secrets/certs

**Additional roles needed for permission grants:**
- **Privileged Role Administrator** — to grant Microsoft Graph *application* permissions
- **Cloud Application Administrator** OR **Application Administrator** — to grant Microsoft Graph *delegated* permissions

**Note:** Blueprint creators are automatically set as owners of both the blueprint
and the associated blueprint principal. Owners of a blueprint can create agent
identities without an Agent ID role.

### Required Microsoft Graph Permissions (for programmatic creation)

| Permission | Purpose |
|---|---|
| `AgentIdentityBlueprint.Create` | Create new agent identity blueprints |
| `AgentIdentityBlueprint.AddRemoveCreds.All` | Configure credentials (FIC, secrets, certs) |
| `AgentIdentityBlueprint.UpdateAuthProperties.All` | Update identifier URIs, scopes |
| `AgentIdentityBlueprintPrincipal.Create` | Create the blueprint's service principal |
| `AgentIdentity.Create.All` | Create agent identities under a blueprint |
| `AgentIdentity.ReadWrite.All` | Read and update agent identities |
| `Application.ReadWrite.All` | Blueprint CRUD on application objects |
| `AppRoleAssignment.ReadWrite.All` | Grant application permissions to agent identities |
| `DelegatedPermissionGrant.ReadWrite.All` | Grant delegated permissions to agent identities |
| `User.Read` | Read signed-in user's profile (for sponsor assignment) |

**Connect-MgGraph (PowerShell):**

```powershell
Connect-MgGraph -Scopes "AgentIdentityBlueprint.Create", "AgentIdentityBlueprint.AddRemoveCreds.All", "AgentIdentityBlueprint.UpdateAuthProperties.All", "AgentIdentityBlueprintPrincipal.Create", "User.Read" -TenantId <your-tenant-id>
```

### Option A: Admin Center Wizard

The admin center wizard creates both the blueprint AND its principal automatically.

1. Sign in to the Microsoft Entra admin center (<https://entra.microsoft.com/>)
2. Browse to **Entra ID > Agents > Agent blueprints**
3. Select **New agent blueprint (Preview)**
4. **Basics tab:** Enter a name in the *Agent blueprint name* field → **Next**
5. **Owners & Sponsors tab:**
   - Owners: users who can manage the blueprint (pencil icon to edit)
   - Sponsors: users/groups accountable for the agent (pencil icon to edit)
   - Note: Sponsors can be users, dynamic membership groups, or Microsoft 365 groups.
     Security groups and role-assignable groups are **not** supported as sponsors.
6. **Next** → review settings → **Create** → **Done** (or Go to agent blueprint)

**Limitation:** The wizard sets name, owners, and sponsors only. Credentials,
identifier URIs, scopes, and permissions must be configured via Graph API/PowerShell
or through the blueprint's detail pages after creation.

### Option B: Microsoft Graph API (Programmatic — Full Workflow)

#### Step 1: Create the Blueprint

```http
POST https://graph.microsoft.com/v1.0/applications/
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "@odata.type": "Microsoft.Graph.AgentIdentityBlueprint",
  "displayName": "My Agent Identity Blueprint",
  "sponsors@odata.bind": [
    "https://graph.microsoft.com/v1.0/users/<user-object-id>"
  ],
  "owners@odata.bind": [
    "https://graph.microsoft.com/v1.0/users/<user-object-id>"
  ]
}
```

Record the `appId` from the response for subsequent steps.

#### Step 2a: Configure Credentials — Managed Identity (Recommended for Production)

Requires: `AgentIdentityBlueprint.AddRemoveCreds.All`

```http
POST https://graph.microsoft.com/v1.0/applications/<agent-blueprint-id>/federatedIdentityCredentials
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "my-managed-identity",
  "issuer": "https://login.microsoftonline.com/<your-tenant-id>/v2.0",
  "subject": "<managed-identity-principal-id>",
  "audiences": [
    "api://AzureADTokenExchange"
  ]
}
```

**Note:** The agent-specific FIC path is:
`POST /applications/{blueprint-obj-id}/microsoft.graph.agentIdentityBlueprint/federatedIdentityCredentials`
(raw `/applications/{id}/federatedIdentityCredentials` may work but is not supported
and not recommended)

#### Step 2b: Configure Credentials — Client Secret (Local Dev / Testing Only)

Requires: `AgentIdentityBlueprint.AddRemoveCreds.All` (Agent ID Administrator role required)

```http
POST https://graph.microsoft.com/v1.0/applications/<agent-blueprint-id>/addPassword
Content-Type: application/json
Authorization: Bearer <token>

{
  "passwordCredential": {
    "displayName": "My Secret",
    "endDateTime": "2026-08-05T23:59:59Z"
  }
}
```

Store `passwordCredential` values securely — cannot be retrieved after initial creation.

#### Step 3: Configure Identifier URI and Scope

Requires: `AgentIdentityBlueprint.UpdateAuthProperties.All`

```http
PATCH https://graph.microsoft.com/v1.0/applications/<agent-blueprint-id>
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "identifierUris": ["api://<agent-blueprint-id>"],
  "api": {
    "oauth2PermissionScopes": [
      {
        "adminConsentDescription": "Allow the application to access the agent on behalf of the signed-in user.",
        "adminConsentDisplayName": "Access agent",
        "id": "<generate-a-guid>",
        "isEnabled": true,
        "type": "User",
        "value": "access_agent"
      }
    ]
  }
}
```

Successful response: `204 No Content`. Scope is required only if the agent receives
incoming requests from users or other agents (interactive agents).

#### Step 4: Create the Blueprint Principal

```http
POST https://graph.microsoft.com/v1.0/serviceprincipals/microsoft.graph.agentIdentityBlueprintPrincipal
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>

{
  "appId": "<agent-blueprint-app-id>"
}
```

**Critical:** This must be done as a separate explicit step — the principal is NOT
autocreated when you POST the blueprint application.

#### Step 5: Register in Agent 365 Registry

Three options (in priority order):

1. **Microsoft 365 Agents SDK (Recommended):** Handles agent identity creation and
   registration automatically — no extra code needed
2. **Agent 365 CLI:** `a365 setup all` (retry-safe: `a365 setup all --agent-registration-only`)
3. **Agent Registry API directly:** POST blueprint creation + POST to Agent Registry API
   for the agent card; must handle both calls in a retry-safe pattern

---

## Common Pitfalls When Creating Blueprints

### 1. OData-Version Header is Required

**Problem:** All Agent ID API calls require `OData-Version: 4.0`. If omitted, the API
may silently create a *standard application* instead of an agent identity blueprint —
no error is returned.

**Fix:** Always include `OData-Version: 4.0`. Use typed endpoints
(`/applications/microsoft.graph.agentIdentityBlueprint`) instead of raw `/applications`
with `@odata.type` properties to further reduce risk.

### 2. Blueprint Principal Is Not Autocreated

**Problem:** Creating an agent identity blueprint does NOT automatically create its
blueprint principal. Without the principal, all subsequent agent identity creation fails:

```
400: The Agent Blueprint Principal for the Agent Blueprint does not exist.
```

**Fix:** Always explicitly `POST /servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal`
immediately after creating the blueprint. The AI-guided setup also handles the idempotent
case — if the blueprint was created but the setup crashed before creating the principal.

### 3. Sponsors Are Required

**Problem:** Both blueprint and agent identity creation require a `sponsors@odata.bind`
field. Without it:

```
400: No sponsor specified. Please provide at least one sponsor.
```

**Fix:**
- Sponsors must be users, dynamic membership groups, or unified (Microsoft 365) groups
- Security groups and role-assignable groups are NOT supported
- Use `/users/{objectId}` URL format (NOT `/directoryObjects/` or `/servicePrincipals/`)
- To assign a group as sponsor for a blueprint, use Microsoft Graph API directly
  (admin center and AI-guided setup use signed-in user as default)

### 4. Permission Propagation Delay (30–120+ Seconds)

**Problem:** After granting admin consent for Agent ID permissions, newly granted
permissions don't appear in tokens immediately (cached claims). Results in 403 errors
immediately after consent.

**Fix:** Implement retry with exponential backoff and reconnect for fresh tokens:

```powershell
$maxRetries = 5
for ($i = 0; $i -lt $maxRetries; $i++) {
    try {
        $result = Invoke-MgGraphRequest -Method POST -Uri $uri -Body $body
        break
    } catch {
        if ($_.Exception.Response.StatusCode -eq 403 -and $i -lt $maxRetries - 1) {
            $wait = 20 * ($i + 1)
            Write-Host "Permission not yet propagated. Retrying in $wait seconds..."
            Start-Sleep -Seconds $wait
            Disconnect-MgGraph
            Connect-MgGraph -Scopes $scopes
        } else {
            throw
        }
    }
}
```

### 5. Agent Identities Cannot Have Password Credentials

**Problem:** Agent identities are service principals without backing application objects.
Adding a `passwordCredential` directly to an agent identity results in:

```
PropertyNotCompatibleWithAgentIdentity
```

**Fix:** All credentials must be configured on the **blueprint**, not on individual
agent identities. Agent identities inherit credentials from the blueprint through
impersonation.

### 6. Identifier URI Must Be Set Explicitly

**Problem:** The blueprint's `identifierUris` field is not set by default. Without it,
the OAuth2 scope `api://{appId}/.default` won't resolve and token acquisition fails.

**Fix:** Always configure `identifierUris` as `api://{appId}` via PATCH on the blueprint.

### 7. Federated Identity Credential Path for Blueprints

**Problem:** Using `/applications/{id}/federatedIdentityCredentials` for FIC on blueprints
is not officially supported.

**Fix:** Use the agent-specific path:
```
POST /applications/{blueprint-obj-id}/microsoft.graph.agentIdentityBlueprint/federatedIdentityCredentials
```

### 8. Azure CLI / DefaultAzureCredential Tokens Rejected

**Problem:** `DefaultAzureCredential` and Azure CLI (`az login`) tokens include
`Directory.AccessAsUser.All`, which Agent Identity APIs reject with a 403 error.

**Fix:**
- PowerShell: use `Connect-MgGraph` with explicit delegated scopes
- Python: use a dedicated app registration with `client_credentials`
- Never use `az login` tokens for Agent ID provisioning

### 9. Token Issuer Varies by Endpoint Version

**Problem:** When validating tokens in agent backend code, the issuer claim differs:
- v1.0 tokens: `https://sts.windows.net/{tenant-id}/`
- v2.0 tokens: `https://login.microsoftonline.com/{tenant-id}/v2.0`

**Fix:** Accept both issuer formats in token validation logic.

### 10. Credential Lifetime Policy Errors

**Problem:** Tenant credential lifecycle policies may restrict maximum secret lifetime.
Error when setting `endDateTime` beyond the allowed maximum.

**Fix:** Reduce `endDateTime` value to align with your organization's policy.

---

## Creating and Deleting Agent Identity Instances

### Prerequisites

- An agent identity blueprint with its `appId` recorded
- A web service or application (local or Azure-hosted) that hosts identity creation logic
  (for programmatic creation)

### Step 1: Acquire an Access Token Using the Blueprint

**With managed identity credential:**

```http
# 1. Get managed identity token from IMDS
GET http://169.254.169.254/metadata/identity/oauth2/token?api-version=2019-08-01&resource=api://AzureADTokenExchange/.default
Metadata: True

# 2. Exchange for blueprint token
POST https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=<agent-blueprint-id>
scope=https://graph.microsoft.com/.default
client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
client_assertion=<msi-token>
grant_type=client_credentials
```

**With client secret (local dev/testing):**

Replace `client_assertion` and `client_assertion_type` with `client_secret=<your-secret>`.

### Step 2: Create an Agent Identity

```http
POST https://graph.microsoft.com/beta/servicePrincipals/Microsoft.Graph.AgentIdentity
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <blueprint-token>

{
  "displayName": "My Agent Identity",
  "agentIdentityBlueprintId": "<agent-blueprint-id>",
  "sponsors@odata.bind": [
    "https://graph.microsoft.com/v1.0/users/<user-object-id>",
    "https://graph.microsoft.com/v1.0/groups/<group-id>"
  ]
}
```

**Notes:**
- Use `beta` endpoint for agent identity creation
- `OData-Version: 4.0` header required
- Groups as sponsors must be supported types (dynamic membership or Microsoft 365 groups)
- Groups **cannot** be owners
- Recommended pattern: one agent identity per agent (but can vary by use case)

### Step 3: Delete an Agent Identity

When an agent is deallocated or destroyed, delete the agent identity:

```http
DELETE https://graph.microsoft.com/beta/servicePrincipals/<agent-identity-id>
OData-Version: 4.0
Content-Type: application/json
Authorization: Bearer <token>
```

### Admin Center Path (Manual / Individual)

1. Sign in to Microsoft Entra admin center
2. Browse to **Entra ID > Agents > Agent identities**
3. Select **New agent identity (Preview)**
4. **Basics tab:** Select blueprint → enter name → **Next**
5. **Owners & Sponsors tab:** Optionally add owners/sponsors → **Next**
6. Review → **Create**

### Testing Helper

For quick testing: <https://aka.ms/agentidpowershell> — Microsoft Entra PowerShell
module for creating and using agent identities.

---

## AI-Guided Setup (Copilot Skill)

### What It Does

The AI-guided setup automates the entire Agent ID provisioning workflow (blueprint
creation through agent identity creation) using an AI coding agent (GitHub Copilot
in VS Code) that follows a structured skill/instruction file. It replaces manual
navigation between multiple documentation pages.

### How to Access It

**Option 1 (Recommended):** Install the
[GitHub Copilot for Azure VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azure-github-copilot).
The Agent ID skill activates automatically.

**Option 2 (Standalone):** Reference the skill directly in Copilot Chat:
`Follow the steps in https://github.com/microsoft/GitHub-Copilot-for-Azure/blob/main/plugin/skills/entra-agent-id/SKILL.md`

### How to Invoke It

```text
@azure Use the Agent ID Skill to set up an agent identity blueprint and create agent identities for my project using Microsoft Entra Agent ID.
```

**Important:** Must use **Agent mode** (not Ask or Edit mode). Agent mode provides
terminal command execution required by the setup.

### Automated Stages

| Stage | What It Automates |
|---|---|
| Prerequisites | Validates Entra roles, PowerShell module, and Graph permissions |
| Environment setup | Connects to Microsoft Graph with correct scopes |
| Blueprint creation | Creates blueprint with sponsor and owner |
| Credential config | Adds managed identity FIC or client secret |
| Scope config | Sets identifier URI and OAuth2 permission scope |
| Principal creation | Creates the blueprint principal (separate explicit step) |
| Agent identities | Creates N agent identity service principals |

### User Input Prompts During Setup

- **Display name:** Blueprint display name (e.g., "Contoso Budget Agent")
- **Sponsor:** User or group accountable for the agent (defaults to signed-in user)
- **Owner:** User/SP who can make technical changes (optional, recommended)
- **Credential type:** Managed identity (production) or client secret/cert (dev)
- **Agent identity count:** How many identities to create
- **Derived value confirmation:** Review autogenerated names and URIs before creation

### Key Benefits

- Single entry point (one instruction file)
- Automated prerequisite validation (roles, tools, permissions, admin consent)
- Smart defaults using actual tenant data
- Derived naming conventions from a single display name
- Inline error handling with retry logic (handles OData header, principal missing,
  sponsor requirements, permission propagation delays)
- Idempotent — safe to rerun if interrupted

### Tool Requirements

- VS Code + GitHub Copilot + GitHub Copilot Chat extensions
- GitHub Copilot for Azure extension
- PowerShell path: PowerShell 7+ with `Microsoft.Graph.Applications` module
  (`Install-Module Microsoft.Graph.Applications -Scope CurrentUser -Force`)
- Python path: Python 3.8+ with `azure-identity` and `requests`
  (`pip install azure-identity requests`)

### What It Does NOT Cover

The AI-guided setup creates identity infrastructure only. You still need to:
- Integrate Agent ID token acquisition into your agent code
- Understand how your agent acquires and uses tokens

### Troubleshooting the AI-Guided Setup

| Issue | Cause / Fix |
|---|---|
| AI doesn't run terminal commands | Using Ask/Edit mode instead of Agent mode |
| AI skips validation steps | Instruct: "Please start from Step 1 in order" |
| 403-Forbidden on Graph commands | Azure CLI token in use, permission propagation delay, or missing admin consent |
| Blueprint creation returns standard app | Missing `OData-Version: 4.0` header |
| "Blueprint Principal does not exist" | Run `POST /servicePrincipals/microsoft.graph.agentIdentityBlueprintPrincipal` explicitly |
| Credential lifetime policy error | Reduce `endDateTime` in secret creation |
| Configuration changes needed | Rerun setup (idempotent) or use PATCH via Graph PowerShell |

---

## Blueprint Lifecycle Management

### Versioning and Updates

- Blueprints do not have explicit versioning built-in
- Update blueprint properties via `PATCH /applications/{appId}` with `OData-Version: 4.0`
- Configuration changes (identifier URI, scopes, credentials) must be done via Graph API
  or PowerShell — not all properties are editable in admin center wizard

### Deletion

**Delete a blueprint:**
- Go to **Entra ID > Agents > Agent blueprints** in admin center
- Deleting a blueprint triggers **automatic cleanup of all child agent identities
  and agents' user accounts**
- For step-by-step deletion and restore: see
  <https://learn.microsoft.com/en-us/entra/agent-id/howto-delete-agent-identity>

**Multi-tenant scenarios — customer removing a blueprint:**
- Customer deletes the blueprint principal from their tenant
- This removes the blueprint from that tenant without deleting the blueprint application
  in the owning tenant

### Impact of Disabling a Blueprint

Disabling an agent identity blueprint (not deleting) prevents **all** its agent
identities from authenticating — useful for temporarily suspending all agents of
a given type without permanent deletion.

### Conditional Access on Blueprints

Administrators can apply Conditional Access policies targeting an agent identity
blueprint; policies take effect for all agent identities created from that blueprint.

---

## Source Citations

1. **Agent identity blueprints in Microsoft Entra Agent ID** (conceptual reference)
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-blueprint>
   Last updated: 2026-05-02

2. **Create an agent identity blueprint** (how-to guide)
   <https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint>
   Last updated: 2026-05-09

3. **AI-guided setup for Microsoft Entra Agent ID** (how-to guide)
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-id-ai-guided-setup>
   Last updated: 2026-05-14

4. **Create agent identities in agent identity platform** (how-to guide)
   <https://learn.microsoft.com/en-us/entra/agent-id/create-delete-agent-identities>
   Last updated: 2026-05-02
