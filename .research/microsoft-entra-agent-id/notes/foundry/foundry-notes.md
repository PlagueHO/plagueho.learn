---
area: foundry
sources:
  - https://learn.microsoft.com/en-us/azure/foundry/agents/overview
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
  - https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication
extracted_at: 2026-05-29
---

# Foundry Agent Service: Entra Agent ID Integration

## Foundry Agent Service Overview

Microsoft Foundry Agent Service is a fully managed platform for building, deploying, and
scaling AI agents. It supports any framework and many models from the Foundry model catalog
(GPT-4o, Llama, DeepSeek, etc.). It handles hosting, scaling, identity, observability, and
enterprise security so developers focus on agent logic.

**Core capabilities:**

| Component | Description |
|-----------|-------------|
| Agent Runtime | Hosts and scales both prompt agents and Hosted agents. Manages conversations, tool calls, and agent lifecycle. |
| Tools | Built-in tools: web search, file search, memory, code interpreter, MCP servers, custom functions. Managed authentication including service-managed credentials and OBO. |
| Models | Works with many models from the Foundry model catalog. Models are swappable without changing agent code. |
| Observability | End-to-end tracing, metrics, Application Insights integration. |
| Identity & Security | Microsoft Entra identity, RBAC, content filters, virtual network isolation. |
| Publishing | Version agents, stable endpoints, share through Teams, M365 Copilot, Entra Agent Registry. |

**Development lifecycle:**

1. Create — define a prompt agent in portal or build a Hosted agent in code
2. Test — chat in agents playground or run locally; MCP integrations can be exercised in playground
3. Trace — inspect every model call, tool invocation, and decision with agent tracing
4. Evaluate — run evaluations to measure quality and catch regressions
5. Publish — promote agent to managed resource with stable endpoint; gets distinct identity
6. Monitor — track performance and reliability with service metrics and dashboards

---

## Agent Types in Foundry

Foundry Agent Service supports **three agent types**:

### Prompt Agents (standard/no-code)

- Defined entirely through configuration: instructions, model selection, tools
- Created in the Foundry portal, API, or SDKs; Agent Service handles orchestration and hosting
- No code required
- **Best for:** Rapid prototyping, internal tools, agents that don't need custom orchestration
- Identity: share the **shared project agent identity** when unpublished; receive a **distinct identity** when published

### Workflow Agents (preview)

- Orchestrate sequences of actions or coordinate multiple agents using declarative definitions
- Build visually in Foundry portal or define in YAML through VS Code
- Support branching logic, human-in-the-loop steps, sequential or group-chat patterns
- No code required (YAML optional)
- **Best for:** Multi-step orchestration, A2A coordination, approval workflows, repeatable automation

### Hosted Agents (preview)

- Code-based agents built with a framework of choice (Agent Framework, LangGraph, or custom code)
- Deployed as containers on Agent Service
- Developer writes orchestration logic (tool calls, multi-step reasoning, A2A coordination)
- Foundry manages runtime, scaling, and infrastructure using isolated **Micro VMs** that independently scale out
- **Best for:** Complex workflows, custom tool integrations, multi-agent systems, full control over behavior

**Comparison table:**

| Attribute | Prompt Agent | Workflow Agent | Hosted Agent |
|-----------|-------------|---------------|--------------|
| Code required | No | No (YAML optional) | Yes |
| Hosting | Fully managed | Fully managed | Container-based, Micro VMs |
| Orchestration | Single agent | Multi-agent, branching | Custom logic |
| Best for | Prototyping, simple tasks | Multi-step automation | Full control, custom frameworks |

---

## How Foundry Agents Get Identity

Foundry automatically integrates with Microsoft Entra Agent ID throughout the agent
development lifecycle.

**At project creation / first agent creation:**

Foundry provisions:
1. A **default agent identity blueprint** for the project
2. A **default agent identity** (service principal) for the project

**Key terms:**

| Term | Definition |
|------|-----------|
| Agent identity | A Microsoft Entra ID service principal that represents the agent at runtime. |
| Agent identity blueprint | A Microsoft Entra ID object that governs a class of agent identities; used for lifecycle operations. The management object for all agent identity instances of that class. |
| agentIdentityId | The identifier used when assigning permissions (RBAC) to the agent identity. |
| Audience | The resource identifier for the downstream service the token is meant for (e.g., `https://storage.azure.com`). |

**Agent identity = special service principal:**

- Represents an identity that the blueprint created and is authorized to impersonate
- Distinct from human user or managed identity tokens — identifies the agent as an independent actor in the directory

**Agent identity blueprint:**

- Serves as the reusable, governing template from which all associated agent identities are created
- Corresponds to a *kind*, *type*, or *class* of agents
- Establishes category of agent (e.g., "Contoso Sales Agent")
- Blueprint metadata: name, publisher/organization, roles the agent might perform, Graph permissions/delegated scopes

**Blueprint capabilities:**

1. **Type classification:** enables Conditional Access policies, disable/revoke at scale, audit by class
2. **Identity creation authority:** services use the blueprint's OAuth credentials to create/update/delete agent identities
3. **Runtime authentication platform:** hosting service uses blueprint credentials during runtime authentication

**Blueprint credential types (federated identity credentials):**

| Type | Description | Notes |
|------|-------------|-------|
| Client secret | Shared secret string stored in blueprint's Entra ID registration | Simple to configure; requires manual rotation and secure storage |
| Certificate | X.509 certificate for assertion-based authentication | Stronger than secrets; requires lifecycle management |
| Federated credential (managed identity) | Trust relationship between blueprint and a managed identity; no stored secret | **Recommended for production**; Azure manages rotation automatically |

**Federated credential chain (how Foundry does it):**

1. Blueprint has federated credential trust with the **project's managed identity**
2. At runtime, Agent Service uses the managed identity to authenticate the blueprint to Entra ID (no client secret or certificate needed)
3. Entra ID validates the federated credential and issues a token for the **agent identity** (the service principal)
4. The agent identity token is exchanged for a scoped access token targeting the downstream resource's audience

> **Important:** The managed identity authenticates the blueprint to Entra ID. It does NOT directly access the downstream resource. The agent identity — not the managed identity — is the principal that requires RBAC role assignments on the target resource.

**Authentication capabilities (two flows):**

- **Attended (delegated access / on-behalf-of / OBO):**
  - Agent operates on behalf of a human user
  - User authenticates to the application; application passes user token to Agent Service
  - Agent Service exchanges for token carrying both agent identity AND user's delegated permissions
  - Agent can only access resources the user has consented to and is authorized for

- **Unattended (application-only / client credentials):**
  - Agent acts under its own authority
  - Agent Service authenticates blueprint to Entra ID, obtains agent identity token, requests scoped access token
  - Access governed entirely by agent's own RBAC role assignments, Graph app-level permissions, or other authorization policies
  - No human user involved

---

## Runtime Token Exchange (4-step flow)

When an agent invokes a tool, a multi-step OAuth 2.0 token exchange occurs automatically
between Agent Service, Microsoft Entra ID, and the downstream resource. Developers do NOT
manage tokens directly — Agent Service handles the entire exchange.

**Step 1 — Blueprint authentication:**

Agent Service presents the blueprint's OAuth credentials to Microsoft Entra ID.
This proves that Agent Service is authorized to act on behalf of the blueprint and its agent
identities.

**Step 2 — Agent identity token issuance:**

Microsoft Entra ID validates the blueprint credentials and issues a token for the specific
agent identity. This token is distinct from human user or managed identity tokens — it
identifies the agent as an independent actor in the directory.

**Step 3 — Scoped token request:**

Agent Service presents the agent identity token back to Microsoft Entra ID and requests a new
access token scoped to the **audience** of the downstream service. The audience is the OAuth
resource identifier for the target service.

**Step 4 — Authenticated tool call:**

Agent Service passes the scoped access token to the MCP server or A2A endpoint. The downstream
resource validates the token and checks the agent identity's RBAC role assignments before
granting or denying access.

**Common audience values:**

| Service | Audience |
|---------|----------|
| Azure Storage | `https://storage.azure.com` |
| Azure Logic Apps | `https://logic.azure.com` |
| Azure Cosmos DB | `https://cosmos.azure.com` |
| Microsoft Graph | `https://graph.microsoft.com` |
| Azure Key Vault | `https://vault.azure.net` |

> **Important:** An incorrect audience value causes authentication failures even when RBAC roles
> are correctly assigned. The audience must match the resource identifier of the downstream
> service, not the URL of the MCP server itself.

---

## Shared vs Distinct Agent Identity

### Shared project identity

- All **unpublished or in-development** agents within the same project share a single common identity
- Automatically provisioned when the first agent is created in a project
- **Benefits:**
  - Simplified administration: centrally manage permissions for all in-development agents
  - Reduced identity sprawl: prevents unnecessary identity creation during early experimentation
  - Developer autonomy: after shared identity is configured, developers can build/test independently

**How to find shared identity:**

Azure portal → Foundry project → Overview pane → **JSON View** → choose latest API version → view and copy the identities (agentIdentityBlueprintId and agentIdentityId).

### Distinct agent identity

- Created automatically when an agent is **published**
- Both a dedicated blueprint and a dedicated agent identity are created, bound to the agent application resource
- Represents the agent's system authority for accessing its own resources

**Scenarios requiring distinct identity:**

- Agents ready for integration testing
- Agents prepared for production consumption
- Agents requiring unique permission sets
- Agents needing independent audit trails

**How to find distinct identity:**

Azure portal → agent application resource → Overview pane → **JSON View** → choose latest API version → copy the identities.

### Identity after publishing

When an agent is published, it receives a **new distinct `agentIdentityId`**. All RBAC role
assignments that were made to the shared project identity must be **repeated** for the new
distinct identity. Shared project identity roles do NOT carry over to the published agent's
identity.

### Automation and deployment tooling (azd)

- **Development:** `azd` automatically assigns the **Foundry User** role to the shared project agent identity for unpublished agents
- **Production:** published agents receive distinct identities that require **manual** role assignments
- `azd` does NOT configure Container Registry, Application Insights, or custom resource permissions

> **RBAC rename note:** Foundry User, Foundry Owner, Foundry Account Owner, and Foundry Project
> Manager were previously named Azure AI User, Azure AI Owner, Azure AI Account Owner, and Azure AI
> Project Manager. Role IDs and core permissions are unchanged.

---

## MCP Tool Authentication Options

Five supported authentication methods for connecting MCP servers:

| Method | Description | Preserves user context |
|--------|-------------|----------------------|
| Key-based | Provide an API key or access token | No |
| Microsoft Entra - agent identity | Use the specific agent's identity (AgenticIdentityToken) | No |
| Microsoft Entra - project managed identity | Use the project's managed identity | No |
| OAuth identity passthrough | Prompt users to sign in and authorize (per-user) | Yes |
| Unauthenticated access | No authentication; open/public MCP servers only | No |

### Choosing an authentication method

| Scenario | Method |
|----------|--------|
| Use one shared identity for all users | Key-based or Microsoft Entra authentication |
| Preserve each user's identity and permissions | OAuth identity passthrough |
| Avoid managing secrets when service supports Entra | Microsoft Entra authentication |
| MCP server doesn't require auth | Unauthenticated access |

> **Tip:** Start with Microsoft Entra authentication if the MCP server supports it — it eliminates
> secret management and provides built-in token rotation. Particularly suited for private MCP
> servers within a virtual network.

### Key-based authentication

- Provide API key, PAT, or similar credential stored in a project connection
- Project connection stores credential name (HTTP header name) and credential value
- Example: `Authorization: Bearer <your-personal-access-token>` for GitHub MCP
- Agent Service retrieves credentials from the project connection and passes to MCP server
- **Security:** use least-privilege credentials; rotate tokens regularly; restrict project access to secrets

> **Note:** Anyone with access to the project can access API keys stored in a project connection.
> For user-specific access, use OAuth identity passthrough.

### Microsoft Entra — agent identity

- Used when authentication should be **scoped to a specific agent**
- Ideal when multiple agents need different levels of access to the same MCP server
- Before publishing: all project agents share the same agent identity
- After publishing: each agent gets a unique agent identity
- Agent identity must have required role assignments on the underlying service
- Agent Service requests authorization token using agent identity and passes to MCP server
- Connection auth type: **`AgenticIdentityToken`**; connection type: `RemoteTool`

### Microsoft Entra — project managed identity

- Used when all agents in a project share the same access level, or MCP server requires managed identity
- Project managed identity must have required role assignments on the underlying service
- Agent Service uses project's managed identity to request authorization token
- Connection auth type: uses the project MI directly; connection type: `RemoteTool`

### OAuth identity passthrough

- Prompts users interacting with the agent to sign in and authorize access to the MCP server
- Agent Service securely stores user credentials and uses them only in context of the agent communicating with MCP server
- **Scope:** per tool (connection) name per Foundry project; each new user using a new tool in a project is prompted to consent
- Two options: **managed OAuth** (Microsoft or MCP server publisher manages app) and **custom OAuth** (bring your own app registration)

### Unauthenticated access

- Use only when MCP server doesn't require authentication
- Appropriate for: public MCP servers with open access, or private MCP servers within VNet relying on network-level isolation
- Always confirm MCP server's terms of service and rate limits before connecting

---

## MCP OAuth Passthrough for Non-Entra IDPs

### OAuth passthrough flow

1. **Consent trigger:** When a user first tries to use a new tool in a Foundry project, Agent Service returns `oauth_consent_request` in `response.output_item`. Surface the `consent_link` to the user (found in item type `oauth_consent_request`, under `consent_link`).
2. **User consent:** User opens the link, signs in, and authorizes access. After successful consent, a confirmation dialog is shown.
3. **Resume:** Submit another response with the previous `response_id`:

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

4. **Subsequent requests:** Once consented, user doesn't need to consent again for the same tool in the same project.

### Custom OAuth configuration fields

When using custom OAuth, provide:

- **Client ID** (required)
- **Client secret** (optional, depends on OAuth app)
- **Auth URL** (required)
- **Token URL** (required)
- **Refresh URL** (required; can use Token URL if no separate refresh URL)
- **Scopes** (optional; include `offline_access` to enable automatic token refresh)

After configuration, a **redirect URL** is returned — add it to your OAuth app registration.

### Bring your own Entra app registration (example: Agent 365 MCP)

> Agent 365 MCP servers are only available to Frontier tenants.

**Steps:**

1. Follow the app registration guide to create a Microsoft Entra app; get client ID and client secret.
2. Go to **Manage > API Permissions**, search for **Agent 365 Tools** (or app ID `ea9ffc3e-8a23-4a7d-836d-234d7c7565c1`). Assign permissions and grant admin consent.

   Available permissions per MCP server:
   - Microsoft Outlook Mail MCP Server: `McpServers.Mail.All`
   - Microsoft Outlook Calendar MCP Server: `McpServers.Calendar.All`
   - Microsoft Teams MCP Server: `McpServers.Teams.All`
   - Microsoft 365 User Profile MCP Server: `McpServers.Me.All`
   - Microsoft SharePoint and OneDrive MCP Server: `McpServers.OneDriveSharepoint.All`
   - Microsoft SharePoint Lists MCP Server: `McpServers.SharepointLists.All`
   - Microsoft Word MCP Server: `McpServers.Word.All`
   - Microsoft 365 Copilot (Search) MCP Server: `McpServers.CopilotMCP.All`
   - Microsoft 365 Admin Center MCP Server: `McpServers.M365Admin.All`
   - Microsoft Dataverse MCP Server: `McpServers.Dataverse.All`

3. In Foundry portal, configure MCP server → Custom → MCP → OAuth Identity Passthrough. Provide:
   - Client ID and client secret
   - Token URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
   - Auth URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
   - Refresh URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
   - Scopes: `ea9ffc3e-8a23-4a7d-836d-234d7c7565c1/{permission},offline_access`

4. Receive redirect URL → add to Microsoft Entra app registration.

### Requirements and constraints

- Users need at least the **Foundry User** role on the project
- User's Entra tenant must match the tenant of the Foundry project — **cross-tenant token exchange is not supported**
- Highly recommended: include `offline_access` in scopes to auto-refresh tokens on expiry

---

## A2A Authentication

The Agent2Agent (A2A) protocol enables agents to invoke other agents. Authentication ensures
only authorized users can invoke A2A tools in Foundry Agent Service.

### Authentication scenarios

- **Shared authentication:** All users of the agent use the same identity; user context doesn't persist. Use for: all users accessing the same shared resource (e.g., Cosmos DB container for all org users).
- **Individual authentication:** Each user authenticates with their own account; user context persists. Use for: per-user scoped actions (e.g., accessing personal repos on GitHub).

### Supported A2A authentication methods

| Method | Description | Preserves user context |
|--------|-------------|----------------------|
| Key-based | API key or access token | No |
| Microsoft Entra ID - agent identity | Agent's managed identity; requires role assignments | No |
| Microsoft Entra ID - project managed identity | Project's managed identity; all agents in project share identity | No |
| OAuth identity passthrough | Per-user sign-in and consent | Yes |
| Unauthenticated access | Publicly accessible endpoints only | No |

### Key-based authentication (A2A)

- Store shared credentials in project connection; connection stores HTTP header name and value
- Common formats:

| Format | Header name | Header value |
|--------|-------------|--------------|
| Bearer token | `Authorization` | `Bearer <your-token>` |
| API key in header | `x-api-key` | `<your-api-key>` |
| Custom header | `<custom-header-name>` | `<your-secret-value>` |

- Agent Service retrieves credentials from project connection and includes in request headers
- Best practices: least-privilege, rotate regularly, restrict project access, audit credential usage in Azure activity logs

### Microsoft Entra ID — agent identity (A2A)

- Before publishing: all agents in same project share a common identity (simplifies dev/test)
- After publishing: each agent receives a unique identity (isolation and granular access control)
- Configuration steps:
  1. Identify the underlying service powering the A2A endpoint (e.g., Cosmos DB, Azure Storage)
  2. Assign required roles to the agent identity on that service
  3. Configure the A2A connection to use agent identity authentication
- Agent Service uses agent identity to request authorization token from Entra ID and includes in request

### Microsoft Entra ID — project managed identity (A2A)

- Useful when all agents in project should share the same identity for resource access
- Configuration steps:
  1. Identify underlying service
  2. Assign required roles to project's managed identity on that service
  3. Configure A2A connection to use project managed identity authentication
- Agent Service uses project's managed identity to request authorization token from Entra ID

### OAuth identity passthrough (A2A) — 4-step flow

1. **First interaction:** Agent Service generates a consent link
2. **User consent:** User opens the link, signs in to the underlying service, and authorizes the agent
3. **Token storage:** Agent Service securely stores the user's OAuth tokens (access token + refresh token), scoped to that specific user and agent combination
4. **Subsequent requests:** Agent Service includes access token in requests; if access token expires, Agent Service uses refresh token to obtain a new one automatically

**OAuth token types:**

| Token type | Purpose | Lifetime |
|------------|---------|---------|
| Access token | Authorizes API calls | Short-lived (~1 hour) |
| Refresh token | Obtains new access tokens without user re-auth | Longer-lived (hours to weeks, or until revoked) |

**Managed vs custom OAuth for A2A:**

| Option | Description | When to use |
|--------|-------------|-------------|
| Managed OAuth | Microsoft or the A2A endpoint publisher manages the OAuth app registration | Use when available; simplifies setup |
| Custom OAuth | You provide your own OAuth app registration (Entra ID or another IdP) | When managed OAuth isn't available, or when you need custom scopes or branding |

**Custom OAuth A2A configuration fields:**

- Client ID (required)
- Client secret (if required)
- Authorization URL
- Token URL
- Refresh URL
- Scopes (e.g., `repo` for GitHub, `Files.Read` for Microsoft Graph)

> After configuring custom OAuth, Agent Service provides a **redirect URL** that must be added to
> the OAuth app registration's allowed redirect URIs.

### Unauthenticated access (A2A)

- Only for publicly accessible A2A endpoints with no authentication requirement
- Rare in production; may be appropriate for: public APIs, internal dev/test endpoints, endpoints protected by network-level security (private endpoints)

---

## RBAC and Permission Assignment

### Assigning permissions to the agent identity

The agent identity is a service principal in Entra ID. Assign RBAC roles to it the same way as
any other service principal or managed identity. Use `agentIdentityId` from the JSON view as the
assignee.

**Example — grant Storage Blob Data Contributor:**

```bash
az role assignment create \
    --assignee "<agentIdentityId>" \
    --role "Storage Blob Data Contributor" \
    --scope "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/<storage-account>"
```

**Verify assignment:**

```bash
az role assignment list \
    --assignee "<agentIdentityId>" \
    --scope "/subscriptions/<subscription-id>/resourceGroups/<resource-group>/providers/Microsoft.Storage/storageAccounts/<storage-account>" \
    --output table
```

**Common role assignments for agent tools:**

| Scenario | Role | Scope |
|----------|------|-------|
| MCP server reads/writes blobs | Storage Blob Data Contributor | Storage account |
| MCP server triggers Logic Apps | Logic Apps Standard Operator (Preview) | Logic App resource |
| A2A tool queries Cosmos DB | Cosmos DB Built-in Data Reader | Cosmos DB account |

### Tool connection configuration types

| Tool | Connection auth type | Connection type |
|------|---------------------|-----------------|
| MCP server (agent identity) | `AgenticIdentityToken` | `RemoteTool` |
| A2A endpoint (agent identity) | `AgenticIdentity` | `RemoteA2A` |

> **Note:** When a tool call leaves Microsoft services, data handling and retention depend on
> the external provider.

### Managing agent identities in Entra admin center

All agent identities (Foundry agents, Copilot Studio agents, and others) can be viewed at:

**Entra admin center → Entra ID → Agent ID → All agent identities**

Available security controls:

- **Conditional Access:** apply access policies to agent identities
- **Identity protection:** monitor and protect from threats
- **Network access:** control network-based access
- **Governance:** manage expiration, owners, and sponsors

### Identity lifecycle

- Foundry project deletion → removes the project's agent identity blueprint and shared agent identity
- Published agent application deletion → removes its distinct identity
- Note: publishing an agent changes which identity is used (shared → distinct); plan for RBAC role reassignment

---

## Configuration Steps

### MCP server authentication — full setup

1. **Identify** the remote MCP server endpoint URL
2. **Create or select a project connection** that stores MCP server endpoint, authentication type, and required credentials. (Foundry portal creates this automatically when connecting via the portal.)
3. **Create or update an agent** with an `mcp` tool specifying:
   - `server_url`: URL of the MCP server (e.g., `https://api.githubcopilot.com/mcp/`)
   - `server_label`: unique identifier for this MCP server to the agent (e.g., `github`)
   - `require_approval`: controls whether approval is required:
     - `always` — developer must approve every call (default)
     - `never` — no approval required
     - `{"never": ["<tool_name_1>", "<tool_name_2>"]}` — specific tools require no approval
     - `{"always": ["<tool_name_1>", "<tool_name_2>"]}` — specific tools always require approval
   - `project_connection_id`: connection name storing endpoint, auth selection, and credentials (endpoint in connection takes precedence over `server_url`)
4. **Run the agent**
5. **Handle** `oauth_consent_request` (for OAuth passthrough) or `mcp_approval_request` (for approval-required tools)
6. **Validate:** trigger an MCP tool call; confirm no auth errors; for OAuth, confirm new users get consent link and subsequent calls succeed

### A2A authentication — full setup

1. **Identify** A2A endpoint and which authentication methods it supports
2. **Gather credentials** for chosen method (API key, role assignments needed, or OAuth app details)
3. **Create project connection** in Foundry portal (stores A2A endpoint URL, auth method, credentials)
4. **Configure role assignments** (for Microsoft Entra ID auth only) on the underlying service
5. **Add A2A tool** to agent, referencing the project connection

### Assign permissions after publishing

When an agent is published, it receives a new distinct `agentIdentityId`. **Repeat all role
assignments** for the new identity — shared project identity roles do not carry over.

### Hosting custom/local MCP servers in cloud

Agent Service runtime only accepts a remote MCP server endpoint. To use a local MCP server,
host it on:

- **Azure Container Apps** (samples: [mcp-container-ts](https://learn.microsoft.com/en-us/samples/azure-samples/mcp-container-ts/mcp-container-ts/))
- **Azure Functions** (samples: [mcp-sdk-functions-hosting-python](https://github.com/Azure-Samples/mcp-sdk-functions-hosting-python/tree/main))

For private MCP servers: deploy Container App with internal-only ingress on a dedicated MCP
subnet delegated to `Microsoft.App/environments`. Use the
[19-hybrid-private-resources-agent-setup](https://github.com/microsoft-foundry/foundry-samples/tree/main/infrastructure/infrastructure-setup-bicep/19-hybrid-private-resources-agent-setup)
template.

| Attribute | Azure Container Apps | Azure Functions |
|-----------|---------------------|-----------------|
| Transport | HTTP POST/GET endpoints | HTTP streamable (chunked/SSE) |
| Code changes | Container rebuild | Functions-specific config files in root |
| Authentication | Custom implementation | Built-in auth or custom code (key required by default; can disable in host.json) |
| Language stack | Any Linux language (Python, Node.js, .NET, TypeScript, Go) | Python, Node.js, TypeScript, Java, .NET only |
| State | Stateless only | Stateless only |
| UVX/NPX | Supported | Not supported |

---

## Source Citations

- [What is Microsoft Foundry Agent Service?](https://learn.microsoft.com/en-us/azure/foundry/agents/overview) — last updated 2026-04-29
- [Agent identity concepts in Microsoft Foundry](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity) — last updated 2026-04-13
- [Set up authentication for Model Context Protocol (MCP) tools](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication) — last updated 2026-04-09
- [Agent2Agent (A2A) authentication](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication) — last updated 2026-02-28
