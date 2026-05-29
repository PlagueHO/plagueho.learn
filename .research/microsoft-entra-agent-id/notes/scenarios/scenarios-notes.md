---
area: scenarios
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
  - https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication
  - https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents
  - https://github.com/microsoft/entra-agentid-samples
  - https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent
extracted_at: 2026-05-29
---

# Real-World Scenarios: Microsoft Entra Agent ID

## Scenario 1: Singleton Autonomous Agent (Foundry Hosted Agent)

### Description

A single agent that assists with a specific task, commonly built on a
low-code/no-code platform like Microsoft Copilot Studio, or as a Foundry hosted
agent. The agent either always acts on behalf of a signed-in user (interactive)
or always acts as itself (autonomous / unattended).

### Identity Model

- **Structure**: One blueprint → one agent identity
- The blueprint gives the agent consistent Conditional Access policies,
  monitoring, governance, and audit entries — the same infrastructure needed
  for multi-agent systems, with minimal setup.
- Permissions are granted directly on the agent identity.
- Blueprint-level inheritable permissions are not typically needed for singleton
  cases (no other agents to share a baseline with).
- **Agent's user account**: Not required unless the agent needs access to
  Exchange, Teams, or another system that requires a user object.

### Token Flow (Unattended / Application-Only)

1. Agent Service authenticates the blueprint to Microsoft Entra ID using the
   blueprint's OAuth credentials (client secret, certificate, or federated
   managed identity).
2. Microsoft Entra ID issues a token for the specific agent identity (the
   service principal). This token is distinct from human user or managed
   identity tokens.
3. Agent Service presents the agent identity token back to Entra ID and
   requests a scoped access token for the downstream service audience (e.g.,
   `https://storage.azure.com`).
4. Agent Service passes the scoped token to the MCP server or A2A endpoint.
5. The downstream resource validates the token and checks RBAC role assignments.

### Trust Boundaries

- All operations are under one blueprint → one agent identity, so the blast
  radius of a compromise is limited to that single identity's permissions.

### Foundry Specifics

- For Foundry: when the first agent in a project is created, the system
  provisions a **default (shared) agent identity blueprint** and a **default
  agent identity** for the project.
- Unpublished agents use the **shared project agent identity**.
- Publishing an agent creates a **distinct agent identity** bound to the agent
  application resource. RBAC permissions must be re-assigned to the new
  distinct identity — shared project identity permissions do **not** carry over.

### RBAC Assignment Example

```bash
az role assignment create \
    --assignee "<agentIdentityId>" \
    --role "Storage Blob Data Contributor" \
    --scope "/subscriptions/<sub>/resourceGroups/<rg>/providers/Microsoft.Storage/storageAccounts/<sa>"
```

---

## Scenario 2: Domain Worker Agents (Multiple Instances)

### Description

Multiple agents work together in a tightly coupled, **sequential workflow** to
serve a common domain goal. The agents share a codebase, run in the same runtime
environment (e.g., the same Kubernetes namespace or container), and have the same
security posture. Each agent has distinct responsibilities and different access to
downstream resources. This maps to **sequential orchestration** in multi-agent
design.

### Example

A retail product management system with three agents:
- Store inventory agent
- Product comparison agent
- Supplier inventory agent

All three run in the same Kubernetes namespace and are built by the same team.

### Identity Model

- **Structure**: One blueprint → multiple agent identities (one per agent role)
- Using a **single blueprint** is appropriate because all agents share the same
  trust boundary.
- Each agent gets its own agent identity so that actions can be attributed to
  a specific agent in audit and sign-in logs, and each can hold different
  permissions on downstream resources.
- **Blueprint-level permissions**: Set shared baseline permissions as
  *inheritable* on the blueprint, providing a common minimum permission set for
  all agent identities.
- **Agent identity-level permissions**: Assign role-specific permissions
  directly to each agent identity for differentiated access.
- **Agent's user account**: Not typically required for domain worker agents.

### Token Flow

Same as Scenario 1 (unattended / application-only) per agent identity. Each
identity independently acquires scoped access tokens for its downstream resources.

### Trust Boundaries

- All agents in the same Kubernetes namespace / container share a trust
  boundary → one blueprint is appropriate.
- A compromise of one agent identity does not grant access to resources scoped
  to sibling agent identities (least-privilege per role).

---

## Scenario 3: Orchestrator + Worker Pattern

### Description

An orchestrator agent **dynamically activates** different domain workers based
on the incoming task. Domain workers may run on **different platforms**, be
operated by **different teams**, and **cross trust boundaries**. This maps to
**concurrent orchestration** in multi-agent design.

### Identity Model

- **Structure**:
  - Blueprint A → orchestrator agent identity
  - Blueprint B → domain worker agent identities (one per role, cross-trust-boundary group)
  - Blueprint C → another domain worker group if operated by a separate team or
    platform
- Because domain workers **cross trust boundaries** (separate runtimes, secrets,
  or teams), they require **separate blueprints**. Blueprint credentials are
  scoped to their trust domain, so a compromise in one domain does not affect
  peer agents.

### Ephemeral Agent Identities (Variant)

The orchestrator can create a **temporary agent identity at runtime** to
facilitate a specific interaction (e.g., coordinating with a maintenance
subsystem):

1. Orchestrator creates a temporary agent identity, inheriting permissions from
   the blueprint.
2. Grants it the minimum permissions needed for the task.
3. Deletes the identity when the session ends.

> **Trade-off**: Ephemeral identity creation introduces nondeterministic latency
> at runtime. Evaluate this for latency-sensitive scenarios.

### Token Flow

- Orchestrator authenticates with Blueprint A credentials to get its agent
  identity token, then acquires scoped tokens for each worker endpoint.
- Domain workers each authenticate independently using their respective Blueprint
  B or C credentials.
- Agent-to-agent calls use **A2A authentication** (auth type: `AgenticIdentity`,
  connection type: `RemoteA2A`).

### Permissions

- Orchestrator and each domain worker group have their own permission sets,
  scoped to their respective blueprints and agent identities.
- **Agent's user account**: Not typically required at the orchestrator or
  domain worker level, unless a specific domain worker must access a
  user-object-dependent resource.

---

## Scenario 4: Per-User Agent (Acting on Behalf of User)

### Description

A separate agent identity is created for each user or organizational unit. For
example:
- A SOC analyst agent with one instance per cloud environment.
- An audit agent with one instance per department.

The number of agent identities is **moderate** (tens to low hundreds) — not one
per directory user. Each agent instance may need **delegated (OBO) access** to
act on behalf of a specific user or department, or **per-identity permissions**
scoped to that user's organizational unit.

### Identity Model

- **Structure**: One blueprint → one agent identity per user, department, or environment
- Appropriate when each agent instance needs different permissions, different
  auditing boundaries, or an independent lifecycle (e.g., disabling one
  department's agent without affecting others).
- **Blueprint-level permissions**: Set minimum baseline as inheritable.
- **Agent identity-level permissions**: Each identity is granted additional
  permissions scoped to its user or organizational unit.
- **Agent's user account**: Consider pairing each agent identity with an agent's
  user account when each agent acts as a named representative for its user or
  department (e.g., a dedicated sales agent that receives email on behalf of a
  territory).

### OBO Token Flow (Attended / Delegated Access)

1. The user first authenticates to the application. The application holds the
   user's token (Tc, issued by MSAL or similar).
2. The application passes the user's token to Agent Service.
3. Agent Service exchanges that token for one that carries **both the agent
   identity and the user's delegated permissions** (OAuth 2.0 On-Behalf-Of flow).
4. The resulting token (TR) scoped to the downstream resource audience allows
   the agent to call APIs with the user's identity and consent in effect.
5. The agent can only access resources that the user has consented to and is
   authorized for.

### Token Names (from AWS Bedrock sample, same pattern)

| Token | Held by | Flow |
|-------|---------|------|
| Tc | Signed-in user | OBO flow only — acquired by MSAL.js in the browser |
| T1 | Blueprint app | Both flows — acquired by sidecar/Agent Service via client credentials |
| TR | Agent identity (downstream API scoped) | Both flows — final access token used against target resource |

In the **OBO flow**: sidecar/Agent Service also receives Tc and performs an OBO
exchange to produce TR that acts on behalf of the signed-in user.

---

## Scenario 5: Digital Worker (Impersonating a User Account)

### Description

A fully autonomous agent acting as a **digital employee**, provisioned with
resources typically reserved for human employees:
- An Exchange mailbox
- OneDrive share
- Teams presence

This is the **highest level of agent autonomy**. Example: an AI sales
representative with a real mailbox, listed in the Global Address List, that
responds to email and is assigned a human manager in the org chart.

### Identity Model

- **Structure**: One blueprint → one agent identity → one agent's user account
- The **1:1 relationship** between agent identity and agent's user account is
  fixed — you **cannot share** an agent's user account across multiple agent
  identities.
- Each digital worker **requires its own** agent's user account.

### Permissions

- Grant the **agent's user account** the specific Exchange, Teams, and OneDrive
  permissions it needs.
- Grant the **agent identity** application-level permissions for systems that
  don't require a user object.
- See: [Grant agent access to Microsoft 365](https://learn.microsoft.com/en-us/entra/agent-id/grant-agent-access-microsoft-365).

### When to Use

- When the agent must be addressable as a named person (mailbox, org chart
  presence, Teams DMs).
- When Exchange or similar systems require a user object (not just a service
  principal) for mailbox provisioning.
- When the agent needs to send/receive email that appears from a named address
  in the GAL.

### User_fic Flow

The agent's user account provides a `user_fic` (fictional user) token path —
the agent acts *as* the user account using the identity (not OBO a real human),
but the user account represents the agent in directory terms.

---

## Scenario 6: Foundry Prompt-Based Agent Calling Entra-Protected MCP Server

### Description

A Foundry Agent Service agent (published or unpublished) needs to call a remote
MCP server whose **underlying service is protected by Microsoft Entra** (e.g.,
an MCP server backed by Azure Storage, Cosmos DB, Logic Apps, or Azure Key
Vault).

### Identity Flow

1. Agent is configured in Foundry with an MCP tool pointing to the remote MCP
   server URL.
2. A **project connection** is created that stores the MCP server endpoint,
   authentication type (`AgenticIdentityToken`), and the target audience for
   the downstream service.
3. When the agent invokes the tool, **Agent Service uses the agent identity**
   (shared project identity for unpublished; distinct identity for published) to
   request an authorization token from Entra ID scoped to the downstream
   service's audience value.
4. Agent Service passes the scoped access token to the MCP server as the
   `Authorization` header.
5. The MCP server (or its underlying Azure service) validates the JWT token
   (signature, issuer, expiry, audience) and checks the agent identity's RBAC
   role assignments before granting access.

### Configuration Requirements

- Connection type: `RemoteTool`
- Auth type: `AgenticIdentityToken`
- **Audience** must match the resource identifier of the downstream service, NOT
  the URL of the MCP server itself.

Common audience values:

| Service | Audience |
|---------|----------|
| Azure Storage | `https://storage.azure.com` |
| Azure Logic Apps | `https://logic.azure.com` |
| Azure Cosmos DB | `https://cosmos.azure.com` |
| Microsoft Graph | `https://graph.microsoft.com` |
| Azure Key Vault | `https://vault.azure.net` |

- **RBAC roles** must be assigned to the `agentIdentityId` on the target
  resource scope (not subscription-wide).

### End-to-End Configuration Steps

1. Go to Foundry project → JSON View → copy `agentIdentityId`.
2. Assign RBAC role to the agent identity on the target resource:
   ```bash
   az role assignment create \
       --assignee "<agentIdentityId>" \
       --role "Storage Blob Data Contributor" \
       --scope "<storage-account-resource-id>"
   ```
3. In the Foundry portal, connect the MCP tool using Microsoft Entra
   authentication → agent identity authentication.
4. Set the audience to `https://storage.azure.com` (matching the resource).
5. Deploy/publish the agent. If publishing, re-assign RBAC to the new distinct
   identity.

### Common Failure Modes

- **Roles assigned to wrong identity**: Shared project identity used during
  development, distinct identity used after publishing — must re-assign.
- **Incorrect audience**: A wrong audience causes auth failures even when RBAC
  is correct.
- **Missing role assignments**: Agent identity must have the required RBAC role
  on the target resource.

---

## Scenario 7: Foundry Prompt-Based Agent Calling Non-Entra MCP Server (OAuth)

### Description (CRITICAL)

A Foundry Agent Service agent needs to call a remote MCP server that does **not**
use Microsoft Entra for authentication — instead using a third-party OAuth
provider (GitHub, Salesforce, custom OAuth app, or Microsoft 365 services
with user-delegated consent via a custom Entra app registration). This is the
**OAuth Identity Passthrough** pattern, which preserves per-user identity.

### When to Use

- Each user of the agent must authenticate with their **own account** to the
  MCP server.
- The underlying service is OAuth-compliant (including non-Entra providers).
- You want to preserve individual user context and permissions downstream.

### Agent Setup

1. In the Foundry portal → Tools → Custom → MCP.
2. Provide:
   - Name (a unique identifier for this tool/connection within the project)
   - MCP server endpoint URL
   - Auth type: **OAuth Identity Passthrough**
3. For **Custom OAuth** (non-Entra or custom Entra app), provide:
   - `Client ID` (required)
   - `Client Secret` (optional, depends on OAuth app)
   - `Auth URL` (required) — e.g., `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
   - `Token URL` (required) — e.g., `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
   - `Refresh URL` (required; can be same as Token URL if provider does not
     provide separate endpoint)
   - `Scopes` (optional; **strongly recommend including `offline_access`** for
     automatic token refresh)
4. After configuration, receive a **redirect URL** → add it to your OAuth app
   registration.

### MCP Server OAuth Config (Non-Entra IDP)

The MCP server's OAuth provider can be any standards-compliant OAuth 2.0
provider. The MCP server itself must support standard Bearer token validation.

For Microsoft 365 MCP servers (Frontier), the custom Entra app registration
approach:
- Token URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
- Auth URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
- Refresh URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
- Scopes: `ea9ffc3e-8a23-4a7d-836d-234d7c7565c1/{permission},offline_access`

M365 Frontier MCP Server permissions:
| MCP Server | Permission Scope |
|------------|-----------------|
| Outlook Mail (Frontier) | `McpServers.Mail.All` |
| Outlook Calendar (Frontier) | `McpServers.Calendar.All` |
| Microsoft Teams (Frontier) | `McpServers.Teams.All` |
| M365 User Profile (Frontier) | `McpServers.Me.All` |
| SharePoint and OneDrive (Frontier) | `McpServers.OneDriveSharepoint.All` |
| SharePoint Lists (Frontier) | `McpServers.SharepointLists.All` |
| Microsoft Word (Frontier) | `McpServers.Word.All` |
| M365 Copilot Search (Frontier) | `McpServers.CopilotMCP.All` |
| M365 Admin Center (Frontier) | `McpServers.M365Admin.All` |
| Microsoft Dataverse (Frontier) | `McpServers.Dataverse.All` |

### Consent Flow (Per User, Per Tool)

The scope of OAuth consent is **per tool (connection) name per Foundry project**.

1. First time a particular user tries to use a new tool in a project, Agent
   Service returns a consent link in the response output:
   ```json
   {
     "type": "oauth_consent_request",
     "id": "oauthreq_...",
     "consent_link": "https://logic-swedencentral-001.consent.azure-apihub.net/login?data=xxxx"
   }
   ```
2. The application surfaces this `consent_link` to the user.
3. The user signs in to the OAuth provider and grants consent, reviewing the
   requested access permissions.
4. After consent, the application must **submit another response** referencing
   the previous response ID to continue:
   ```python
   # Requires: azure-ai-projects >= 2.0.0
   from azure.ai.projects import AIProjectClient
   from azure.identity import DefaultAzureCredential

   response = client.responses.create(
       previous_response_id="YOUR_PREVIOUS_RESPONSE_ID",
       input=user_input,
       extra_body={
           "agent_reference": {"name": agent.name, "type": "agent_reference"},
           "tool_choice": "required",
           "stream": True
       },
   )
   ```
5. After a user has consented once, they do not need to consent again for that
   tool/project combination.

### Token Handling

- Agent Service **securely stores** the user's credentials.
- Uses them only within the context of the agent communicating with the MCP
  server.
- Managed OAuth: Microsoft or MCP server publisher manages the OAuth app.
- Custom OAuth: Operator brings their own OAuth app registration.
- With `offline_access` in scopes, Agent Service auto-refreshes expired tokens.

### Constraints

- User must have at least **Foundry User role** on the project.
- User's Microsoft Entra tenant must **match the tenant** of the Foundry project
  (cross-tenant token exchange is not supported).
- If the user declines consent, the MCP tool call fails. Applications should
  handle this gracefully.

### Troubleshooting

| Issue | Cause | Resolution |
|-------|-------|-----------|
| No `oauth_consent_request` returned | Tool not configured for OAuth passthrough, or prompt didn't trigger tool | Confirm project connection is configured for OAuth passthrough; check prompt |
| Consent completes but tool calls still fail | User lacks access to the underlying service or missing Foundry User role | Confirm user access + role |
| Tokens expire after time | Missing `offline_access` scope or incorrect refresh URL | Add `offline_access` to scopes; verify refresh URL |
| Cross-tenant user tries to use tool | Cross-tenant token exchange not supported | User's tenant must match Foundry project tenant |

---

## Scenario 8: AWS Bedrock Agent Calling Microsoft APIs

### Description

An AWS Bedrock agent (using Claude or another foundation model with tool
calling) needs to query Microsoft 365 data or call Azure services through
Microsoft Graph or other Microsoft APIs. Because the agent runs outside Azure,
it cannot use managed identity directly. The **sidecar pattern** solves this by
running the Microsoft Entra Auth SDK as a companion container.

### Architecture (Sidecar Pattern)

Three containers run on a shared Docker bridge network (or equivalent in
Kubernetes / Azure Container Apps):

| Container | Role | Exposure |
|-----------|------|---------|
| `llm-agent-aws` | Flask app with chat UI + LangGraph ReAct agent calling Amazon Bedrock (Claude) for reasoning | Port 3001 (exposed to host) |
| `agent-id-sidecar-aws` | Official Microsoft Entra Auth SDK container. Acquires and caches tokens. Never talks directly to Entra — agent never manages credentials. | Internal only (Docker network) |
| `weather-api-aws` (or target API) | Downstream API that validates the agent's JWT (signature, issuer, expiry, audience) on every request | Internal only (Docker network) |

The agent **never talks to Microsoft Entra ID directly** and **never handles
credentials**. It asks the sidecar for an `Authorization` header.

### Token Flow (Detailed, 8 Steps)

1. User types a query in the chat UI at `http://localhost:3001`.
2. Flask app sends the query to AWS Bedrock (Claude) via the LangGraph ReAct
   agent.
3. Claude decides it needs data (e.g., weather, Graph data) and calls a tool
   (e.g., `get_weather`).
4. The tool calls the sidecar:
   `GET /AuthorizationHeader?AgentIdentity={agentId}`
5. The sidecar authenticates to Microsoft Entra ID using OAuth 2.0 (client
   credentials flow for autonomous, or OBO exchange for attended).
6. Microsoft Entra ID returns the requested scoped token (TR) to the sidecar.
7. The agent calls the target API with `Authorization: Bearer TR`.
8. The target API validates TR (signature, issuer, expiry, audience) and returns
   the response.

### Three-Token Model

| Token | Held by | Used in |
|-------|---------|---------|
| Tc | Signed-in user | OBO flow only — from MSAL.js in the browser |
| T1 | Blueprint app | Both flows — sidecar acquires via client credentials |
| TR | Agent identity scoped to downstream API | Both flows — final token passed to the target API |

In the **autonomous flow**: sidecar uses client credentials → T1 → exchanges for
TR scoped to the downstream API.

In the **OBO flow**: sidecar also receives Tc (user's token) → performs OBO
exchange → TR acts on behalf of the signed-in user.

### Entra Objects Required

- Blueprint app registration (with client credentials: secret, cert, or managed
  identity federation)
- Agent identity (created from the blueprint)
- RBAC permissions assigned to the agent identity on the target resource
- (Optional, for OBO) SPA app registration for browser sign-in

### AWS Authentication Tiers

| Tier | Method | Best For |
|------|--------|---------|
| A | Temporary STS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`) | Local development with AWS SSO; expires ~1 hour |
| B | Bedrock API key (`AWS_BEARER_TOKEN_BEDROCK`) | Demos and workshops |
| C | OIDC federation (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | Production on Azure App Service; zero stored secrets |

### Sidecar Credential Configuration

The sidecar's credential type is set via `AzureAd__ClientCredentials__0__SourceType`:

| Source Type | Description | Use Case |
|-------------|-------------|---------|
| `ClientSecret` | Client secret string | Local development only |
| `SignedAssertionFromManagedIdentity` | Azure managed identity | Production on Azure; zero secrets |
| `KeyVault` | Certificate from Azure Key Vault | Production with cert rotation |
| `StoreWithThumbprint` | Certificate from local machine store | On-premises |

### Integration with Other Platforms (Same Sidecar Pattern)

- **n8n**: Uses `n8n-nodes-entraagentid` community node for token acquisition
  within n8n workflows on Azure Container Apps. Agent acquires token → calls
  Microsoft Graph or Graph MCP Server for Enterprise.
- **Local LLM (Ollama)**: Agent calls `localhost:7000/token` to request a token
  from the sidecar running in Docker Compose. Test locally before deploying.

### Workload Identity Federation Alternative (No Sidecar)

For agents that can't run containers or already have federation infrastructure:

1. An AWS agent authenticates through AWS STS, receiving an OIDC token.
2. The OIDC token is exchanged directly for a Microsoft Entra token via a
   preconfigured **Federated Identity Credential** on the blueprint.
3. The agent uses the Microsoft Entra token to call Microsoft or custom APIs.

Supported: GCP Workload Identity → Entra; AWS STS → Entra.

### Sample Repository

[github.com/microsoft/entra-agentid-samples](https://github.com/microsoft/entra-agentid-samples)

Key directories:
- `sidecar/` — sidecar-pattern samples (local-LLM + AWS Bedrock editions)
- `sidecar/dev/` — Local-LLM (Ollama, offline) development
- `sidecar/aws/` — AWS Bedrock (Claude) sample
- `scripts/` — PowerShell + bash to provision Blueprint, Agent Identity, Client
  SPA in tenant
- `deploy/azure/container-apps/` — Deploy to Azure Container Apps
- `n8n/` — Full end-to-end n8n platform deployment on Azure Container Apps

---

## Scenario 9: Agent Framework Foundry-Backed Agent

### Description

An agent built using the Azure AI Agent Framework (or Azure AI Projects SDK)
that is backed by Microsoft Foundry's hosted agent infrastructure. Foundry
**automatically provisions and manages** agent identities throughout the agent
development lifecycle.

### How Foundry Provisions Identity

1. When the **first agent is created** in a Foundry project, the system
   automatically provisions:
   - A **default agent identity blueprint** for the project.
   - A **default (shared) agent identity** for the project.
2. All **unpublished/in-development agents** within the same project share this
   common identity.
3. When an agent is **published** (agent application created), Foundry
   automatically creates a **dedicated agent identity blueprint** and **agent
   identity**, both bound to the agent application resource.

### Shared vs. Distinct Identity

| Stage | Identity Used | Permissions |
|-------|--------------|------------|
| Development / Unpublished | Shared project agent identity | Managed centrally; same permissions for all in-project agents |
| Published / Production | Distinct agent identity (per agent application) | Independent permissions; must re-assign RBAC from shared identity |

### How Agent Framework Uses the Identity

- The Azure Developer CLI (`azd`) automatically assigns **Foundry User** role
  to the shared project agent identity for unpublished agents during development.
- For production (published agents), role assignments are **manual** — azd does
  not configure Container Registry, Application Insights, or custom resource
  permissions automatically.
- Find the `agentIdentityId` in the Azure portal:
  - For shared identity: Foundry project → Overview → JSON View → latest API
    version → copy `agentIdentityId`.
  - For distinct identity: Agent application resource → Overview → JSON View →
    latest API version → copy `agentIdentityId`.

### Identity Lifecycle

- Agent identities persist as long as the associated Foundry project or agent
  application resource exists.
- Deleting a Foundry project removes the associated blueprint and shared agent
  identity.
- Deleting an agent application removes its distinct identity.

### Governance via Entra Admin Center

All Foundry agent identities can be inventoried and managed in:
**Microsoft Entra admin center → Entra ID → Agent ID → All agent identities**

This shows Foundry agents, Copilot Studio agents, and others in a unified view
with controls for:
- **Conditional Access**: Apply access policies to agent identities.
- **Identity Protection**: Monitor and protect from threats.
- **Network Access**: Control network-based access.
- **Governance**: Manage expiration, owners, and sponsors.

### Blueprint Credential Types (Foundry-Specific)

| Credential Type | Description | Recommendation |
|-----------------|-------------|---------------|
| Client secret | Shared secret in blueprint registration | Simplest; requires manual rotation |
| Certificate | X.509 cert for assertion-based auth | Stronger; requires cert lifecycle management |
| Federated credential (managed identity) | Trust relationship with project's managed identity; no stored secret | **Recommended for production** |

**Federated credential chain** (recommended):
1. Blueprint has a federated credential trust relationship with the **project's
   managed identity**.
2. At runtime, Agent Service uses the managed identity to authenticate the
   blueprint to Entra ID — no client secret or certificate needed.
3. Entra ID validates the federated credential → issues a token for the agent
   identity (the service principal).
4. Agent identity token → exchanged for a scoped access token → used against
   the downstream resource.

> **Note**: The managed identity authenticates the blueprint to Entra ID. It
> does NOT directly access the downstream resource. The agent identity — not the
> managed identity — is the principal that requires RBAC role assignments on the
> target resource.

---

## Architecture Diagram Notes

### Key Elements for Scenario 1 (Singleton)

- Single box: **Agent Identity** (Entra object, service principal)
- Single box: **Agent Identity Blueprint** (template/governance object)
- Arrow: Blueprint → authenticates to → Entra ID
- Arrow: Entra ID → issues token for → Agent Identity
- Arrow: Agent Identity token → scoped to → Downstream Resource
- Box: **Downstream Resource** with RBAC role assigned to agentIdentityId

### Key Elements for Scenario 2 (Domain Workers)

- One **Blueprint** box connecting to multiple **Agent Identity** boxes (one
  per role: inventory, comparison, supplier)
- Each Agent Identity box has its own **RBAC permissions** block
- All within a single **Trust Boundary** perimeter
- Shared baseline permissions shown on Blueprint as "inheritable"

### Key Elements for Scenario 3 (Orchestrator + Workers)

- **Orchestrator** → Blueprint A → Agent Identity (orchestrator)
- Multiple **Worker groups** → Blueprint B/C → Agent Identity (per role)
- **Trust boundaries** as dashed perimeter boxes separating each blueprint group
- A2A authentication arrows between orchestrator and workers
- Optional: ephemeral agent identity lifecycle (create → use → delete)

### Key Elements for Scenario 4 (Per-User / OBO)

- **User** → authenticates → **Application** → holds Tc (user token)
- Application → passes Tc to → **Agent Service**
- Agent Service → OBO exchange → **Entra ID** → issues TR (agent + user claims)
- TR used against **Downstream Resource** (respects user's permissions/consent)
- Blueprint A → n Agent Identities (one per department/user)

### Key Elements for Scenario 5 (Digital Worker)

- Blueprint → Agent Identity → **Agent's User Account** (1:1 fixed)
- Agent User Account → Exchange Mailbox, OneDrive, Teams Presence
- Agent Identity → application-level permissions (Azure services)
- Both paths to downstream resources shown

### Key Elements for Scenario 6 (Foundry → Entra MCP)

- **Foundry Agent** → invokes MCP tool
- **Agent Service** → requests agent identity token → **Entra ID**
- Entra ID → issues scoped token (audience = `https://storage.azure.com` etc.)
- Scoped token → passed to → **MCP Server** (as Authorization Bearer header)
- MCP Server → validates JWT → calls **Azure Resource** (respects RBAC)
- RBAC assignment shown: agentIdentityId → role → Azure Resource scope

### Key Elements for Scenario 7 (Foundry → OAuth/Non-Entra MCP)

- **User** → first-time consent → **OAuth Provider** (non-Entra or custom)
- Consent flow: Agent Service → returns `oauth_consent_request` → Application
  → surfaces consent link → User consents
- Agent Service → stores user credentials securely
- Subsequent calls: Agent Service → presents user token → **MCP Server**
- Note: Cross-tenant not supported; user's tenant must match Foundry project tenant

### Key Elements for Scenario 8 (AWS Bedrock + Sidecar)

- **Browser / User** → Chat UI (port 3001)
- LangGraph ReAct Agent → **AWS Bedrock (Claude)** for reasoning
- Tool call → **Sidecar** (GET /AuthorizationHeader?AgentIdentity=...)
- Sidecar → client credentials → **Microsoft Entra ID** → T1 → TR (scoped)
- Agent → `Authorization: Bearer TR` → **Target API / Microsoft Graph**
- Target API → validates JWT → response
- All within **Docker bridge network** security boundary
- AWS Bedrock shown externally; Entra ID shown externally; sidecar shown internally

### Key Elements for Scenario 9 (Agent Framework Foundry)

- Foundry Project creation → auto-provisions **Shared Blueprint** + **Shared
  Agent Identity**
- Development phase: all unpublished agents → **Shared Agent Identity**
- Publish action → provisions **Distinct Blueprint** + **Distinct Agent
  Identity** bound to agent application
- **azd** automation arrows (limited: assigns Foundry User role for dev phase)
- Entra Admin Center inventory shown as governance overlay

---

## Source Citations

1. **Microsoft Entra Agent ID design patterns** (design patterns for singleton,
   domain worker, orchestrator, per-user, digital worker):
   https://learn.microsoft.com/en-us/entra/agent-id/concept-agent-id-design-patterns
   (Last updated: 2026-04-04)

2. **Agent identity concepts in Microsoft Foundry** (Foundry-specific identity
   lifecycle, token exchange, RBAC, shared vs. distinct identity, federated
   credentials):
   https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
   (Last updated: 2026-04-13)

3. **Set up authentication for MCP tools** (MCP auth methods, OAuth identity
   passthrough, consent flow, key-based, agent identity, managed identity):
   https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication
   (Last updated: 2026-04-09)

4. **Integrate third-party agents with Microsoft Entra Agent ID** (sidecar
   pattern, workload identity federation, AWS Bedrock, n8n, Ollama scenarios):
   https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents
   (Last updated: 2026-05-02)

5. **entra-agentid-samples GitHub repository** (runnable samples: sidecar,
   n8n, deployment scripts, Azure Container Apps deployment):
   https://github.com/microsoft/entra-agentid-samples
   (Last commit: ~28 days before 2026-05-29)

6. **Secure an Amazon Bedrock agent with Microsoft Entra Agent ID** (detailed
   AWS Bedrock + sidecar architecture, three-token model, step-by-step flow,
   deployment tiers):
   https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent
   (Last updated: 2026-05-02)
