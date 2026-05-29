---
area: third-party-mcp
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents
  - https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent
  - https://learn.microsoft.com/en-us/entra/agent-id/integrate-n8n-agent
  - https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication
extracted_at: 2026-05-29
---

# 3rd Party MCP & Non-Entra IDP Scenarios

## Overview: The Challenge

Third-party AI agents (AWS Bedrock, n8n, Ollama, etc.) and Foundry prompt-based
agents connecting to non-Microsoft MCP servers face a fundamental identity
problem: they originate outside the Microsoft Entra trust boundary. Three
specific challenges arise:

1. **Agents outside Azure** (e.g., AWS Bedrock Claude) need to call Microsoft
   APIs (Graph, Azure services) but have no native Entra credentials. They
   cannot use Managed Identity or Workload Identity Federation without extra
   infrastructure.

2. **Foundry agents calling non-Entra-protected MCP servers** (e.g., a GitHub
   MCP server authenticated via GitHub OAuth, or an Okta-protected MCP server)
   cannot use the Entra token they already hold — the MCP server's IDP is
   different and won't accept an Entra JWT.

3. **User context preservation** — when an operation must act *on behalf of an
   individual user* (not a shared app identity), a plain client-credentials or
   API-key approach is insufficient. A consent flow and per-user token storage
   are required.

The Microsoft Entra Agent ID documentation addresses these three challenges with
two primary patterns:

- **Sidecar / Entra Auth SDK** for non-Foundry agents that need *inbound*
  Entra tokens to call Microsoft APIs.
- **OAuth Identity Passthrough (managed or custom OAuth app)** for Foundry
  agents that need *outbound* tokens to call MCP servers protected by any
  OAuth 2.0-compliant IDP, including non-Entra providers.

---

## Pattern 1: Foundry OAuth Passthrough (Custom OAuth App)

### What It Is

OAuth Identity Passthrough is the Foundry Agent Service mechanism that allows a
prompt-based agent to call an MCP server (or A2A endpoint) whose IDP is *any*
OAuth 2.0-compliant provider — including non-Entra providers such as GitHub
OAuth, Okta, Auth0, or a custom OAuth server.

Agent Service supports two sub-variants:

| Sub-variant | Who manages the OAuth app | When to use |
|---|---|---|
| **Managed OAuth** | Microsoft or the MCP server publisher | Use when available — simplest setup |
| **Custom OAuth** | You bring your own OAuth app registration (from Entra *or any other IDP*) | Use for non-Microsoft IDPs or when you need custom scopes/branding |

### How It Works (Conceptual)

When the agent first tries to invoke an MCP tool that requires OAuth:

1. Agent Service detects the tool requires user authorization.
2. Agent Service generates a **consent link** and surfaces it to the calling
   application as `oauth_consent_request` in `response.output_item`.
3. The application surfaces the consent link to the user.
4. The user opens the link, signs in to the **3rd party IDP** (e.g., GitHub,
   Okta), and grants the requested scopes.
5. Agent Service completes the OAuth authorization code flow and **securely
   stores** the user's access token and refresh token.
6. On subsequent invocations, Agent Service retrieves the stored token and
   passes it to the MCP server. Refresh tokens are used automatically when
   access tokens expire.
7. The user's consent is remembered — they are not re-prompted on future
   invocations of the same tool connection in the same Foundry project.

Scope of consent: **per tool (connection) name per Foundry project**. Each new
user using a new tool connection in a project triggers the consent flow once.

### What "Custom OAuth App" Means in Foundry

Custom OAuth means you register an OAuth application with the 3rd party IDP
(e.g., GitHub, Okta, Auth0, your own OAuth server) and provide Foundry with the
registration details. Foundry acts as the OAuth *client* that drives the
authorization code flow on behalf of your agent.

**Required configuration fields when setting up a custom OAuth MCP connection:**

| Field | Required? | Description |
|---|---|---|
| Client ID | Required | Application ID from your OAuth app registration |
| Client secret | Optional (depends on OAuth app) | Secret associated with the app registration |
| Auth URL | Required | Authorization endpoint where users authorize access |
| Token URL | Required | Endpoint where Agent Service exchanges auth code for tokens |
| Refresh URL | Required | Endpoint for refreshing expired access tokens (can be same as Token URL) |
| Scopes | Optional (recommended) | Permissions your agent needs; include `offline_access` to enable automatic token refresh |

**Critical post-setup step:** After you complete the custom OAuth configuration,
Agent Service generates a **redirect URL**. You *must* add this redirect URL to
your OAuth app registration's allowed redirect URIs. Without it, Agent Service
cannot complete the authorization flow.

### Step-by-Step: Configure Custom OAuth for a Non-Entra MCP Server

1. Register an OAuth application with the 3rd party IDP (GitHub, Okta, etc.):
   - Note the **Client ID** and **Client Secret**.
   - Leave redirect URI blank for now (you get it from Foundry after setup).

2. In the [Foundry portal](https://ai.azure.com/build/tools), go to **Tools >
   Custom > MCP**. Provide:
   - A name and the MCP server endpoint URL.
   - Select **OAuth Identity Passthrough**.
   - Select **Custom OAuth**.
   - Fill in the fields: Client ID, Client Secret, Auth URL, Token URL,
     Refresh URL, and Scopes.

3. After saving, Foundry displays a **redirect URL**. Copy it.

4. Return to your 3rd party IDP's app registration and add the redirect URL to
   the allowed redirect URIs.

5. Create or update an agent that references this MCP connection via
   `project_connection_id`.

6. Run the agent. On first use per user, the response includes an
   `oauth_consent_request` item with a `consent_link`. Surface this to the
   user.

7. After the user consents, resubmit with the previous response ID to continue
   the agent run:

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

8. Subsequent requests from the same user succeed without re-prompting.

### Consent Link Payload

When OAuth is required and the user has not yet consented, the Responses API
returns:

```json
"type": "response.output_item.done",
"sequence_number": 7,
"output_index": 1,
"item": {
    "type": "oauth_consent_request",
    "id": "oauthreq_10b0f026610e2b76006981547b53d48190840179e52f39a0aa",
    "created_by": {},
    "consent_link": "https://logic-swedencentral-001.consent.azure-apihub.net/login?data=xxxx"
}
```

The `consent_link` URL is where the user is redirected to complete the OAuth
flow with the 3rd party IDP. The consent hub is hosted by Azure API Management /
Logic Apps consent infrastructure (`*.consent.azure-apihub.net`), not directly
by the IDP — Foundry intermediates the flow.

### Special Case: Bring Your Own Microsoft Entra App Registration

When the MCP server *is* a Microsoft service (Agent 365 MCP servers, Graph MCP,
etc.) but you want to control the exact permissions granted, you can use the
"Bring your own Microsoft Entra app registration" variant of OAuth passthrough:

1. Create a Microsoft Entra app registration and get client ID and secret.
2. Grant scoped API permissions (e.g., `McpServers.Mail.All` for Outlook Mail
   MCP; use app ID `ea9ffc3e-8a23-4a7d-836d-234d7c7565c1` to find Agent 365
   permissions). Grant admin consent.
3. In Foundry portal > Custom > MCP, select **OAuth Identity Passthrough** and
   provide:
   - Client ID, Client Secret
   - Token URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
   - Auth URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/authorize`
   - Refresh URL: `https://login.microsoftonline.com/{tenantId}/oauth2/v2.0/token`
   - Scopes: `ea9ffc3e-8a23-4a7d-836d-234d7c7565c1/{permission},offline_access`
4. Add the Foundry-provided redirect URL to the Entra app registration.

Agent 365 MCP server permissions by service (all Frontier tenants only):

| MCP Server | Permission |
|---|---|
| Microsoft Outlook Mail | `McpServers.Mail.All` |
| Microsoft Outlook Calendar | `McpServers.Calendar.All` |
| Microsoft Teams | `McpServers.Teams.All` |
| Microsoft 365 User Profile | `McpServers.Me.All` |
| Microsoft SharePoint and OneDrive | `McpServers.OneDriveSharepoint.All` |
| Microsoft SharePoint Lists | `McpServers.SharepointLists.All` |
| Microsoft Word | `McpServers.Word.All` |
| Microsoft 365 Copilot (Search) | `McpServers.CopilotMCP.All` |
| Microsoft 365 Admin Center | `McpServers.M365Admin.All` |
| Microsoft Dataverse | `McpServers.Dataverse.All` |

### Constraints and Notes

- OAuth identity passthrough users must have at least the **Foundry User** role
  on the project.
- The user's Microsoft Entra tenant must match the Foundry project's tenant.
  **Cross-tenant token exchange is not supported** for the Entra-hosted consent
  infrastructure. (This constraint applies to the Entra variant; for 3rd party
  IDPs, the user signs in to the 3rd party IDP directly, so this restriction
  does not apply in the same way.)
- Add `offline_access` to scopes to enable automatic token refresh without
  re-prompting users.
- If the user declines consent, the MCP tool call fails. Handle this gracefully.
- If the refresh token expires (user inactive for extended period), the user
  must re-consent.

---

## Pattern 2: Sidecar Pattern for Non-Microsoft Agents

### What It Is

The **Sidecar** (Microsoft Entra Auth SDK) pattern is for *non-Foundry* agents
(e.g., AWS Bedrock, Ollama-based agents, n8n alternative flow, custom
containerized agents) that need to call *Microsoft APIs* (Graph, Azure services,
custom APIs protected by Entra). It solves the opposite direction from Pattern 1:
the agent is external but needs Entra tokens *outbound* to Microsoft APIs.

The sidecar runs as a **companion container** alongside the agent. The agent
never touches credentials — it asks the sidecar for an `Authorization` header,
and the sidecar manages all OAuth 2.0 flows with Entra ID.

### Architecture

Three containers on a Docker bridge network (reference: AWS Bedrock sample):

| Container | Role | Network exposure |
|---|---|---|
| `llm-agent-aws` | Flask app with LangGraph ReAct agent + Bedrock (Claude) | Port 3001 exposed to host |
| `agent-id-sidecar-aws` | Microsoft Entra Auth SDK container | Internal only (Docker network) |
| `weather-api-aws` (or your protected API) | Downstream API validating JWT | Internal only |

The agent never talks to Entra ID directly and never manages credentials.

### Token Flow (Three Tokens)

| Token | Represents | Who acquires it | When used |
|---|---|---|---|
| **Tc** | Signed-in user | MSAL.js in browser | OBO flow only |
| **T1** | Blueprint app (intermediate) | Sidecar using client credentials | Both flows |
| **TR** | Agent (downstream API access) | Sidecar — OBO exchange or client creds | Both flows |

**Autonomous (app-only) flow:**
1. Sidecar uses Blueprint app client credentials → acquires **T1**.
2. Sidecar exchanges T1 for **TR** scoped to the downstream API.
3. Agent calls downstream API with `Authorization: Bearer TR`.

**On-Behalf-Of (OBO) flow:**
1. Browser authenticates user via MSAL.js → **Tc** (user token).
2. Tc passed to agent/sidecar.
3. Sidecar acquires **T1** via client credentials.
4. Sidecar performs OBO exchange: T1 + Tc → **TR** acting on behalf of the
   signed-in user.
5. Agent calls downstream API with `Authorization: Bearer TR`.

### Sidecar API

The agent requests a token from the sidecar by calling:

```
GET /AuthorizationHeader?AgentIdentity={agentId}
```

The sidecar returns the header value (e.g., `Bearer <token>`). The agent
passes this header directly to the downstream API.

### Supported Credential Types (Sidecar Container)

Configured via `AzureAd__ClientCredentials__0__SourceType` in
`docker-compose.yml`:

| SourceType | Use case |
|---|---|
| `ClientSecret` | Local development only |
| `SignedAssertionFromManagedIdentity` | Deployed on Azure (zero secrets, recommended for production) |
| `KeyVault` | Certificate from Azure Key Vault |
| `StoreWithThumbprint` | Certificate from local machine store |

### Entra Objects Required for the Sidecar Pattern

| Object | Purpose |
|---|---|
| **Blueprint app** | App registration that issues tokens on behalf of Agent Identities via Federated Identity Credentials |
| **Agent Identity** (service principal) | The AI agent's identity in Entra |
| **SPA app registration** (OBO only) | Client app for browser-based OBO sign-in, preconfigured with redirect URIs |

### Workload Identity Federation as Alternative to Sidecar

The **federation pattern** (Workload Identity Federation) is an alternative that
does *not* require a sidecar container. It exchanges credentials from an external
IDP (AWS STS, GCP Workload Identity, etc.) directly for Microsoft Entra tokens.

Best for:
- AWS agents that use STS and OIDC natively.
- Organizations that already have WIF infrastructure.
- Agents that cannot run containers.

Requires a pre-configured **Federated Identity Credential** in the Microsoft
Entra app registration pointing to the AWS/GCP OIDC issuer.

---

## Scenario: AWS Bedrock Agent Calling Microsoft APIs

**Platform:** AWS Bedrock (Claude via LangGraph ReAct)
**Pattern:** Sidecar (Microsoft Entra Auth SDK as companion container)
**Sample repo:** `github.com/microsoft/entra-agentid-samples` → `sidecar/aws/`

### End-to-End Flow

1. User types a query in the chat UI (`http://localhost:3001`).
2. Flask app sends the query to AWS Bedrock (Claude) via LangGraph ReAct agent.
3. Claude decides it needs external data → calls the `get_weather` tool.
4. The tool calls the sidecar: `GET /AuthorizationHeader?AgentIdentity={agentId}`.
5. Sidecar authenticates to Entra ID using OAuth 2.0 (client credentials or OBO).
6. Entra ID returns token TR to the sidecar.
7. Agent calls the downstream API with `Authorization: Bearer TR`.
8. Downstream API validates TR (signature, issuer, expiry, audience) and returns data.

### Execution Modes

| Mode | Description |
|---|---|
| Direct (no LLM) | Fast demo: token fetched and API called directly (no Bedrock required) |
| Bedrock + LangChain | Full agent: LangGraph ReAct decides when to call the tool |

### Identity Flows

| Flow | Description |
|---|---|
| Autonomous | App-only token — sidecar uses client credentials |
| OBO | User signs in via MSAL.js; sidecar performs OBO exchange |

### AWS Authentication Tiers

| Tier | Method | Notes |
|---|---|---|
| A | Temporary STS credentials (`AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_SESSION_TOKEN`) | Local dev; expire ~1 hour |
| B | Bedrock API key (`AWS_BEARER_TOKEN_BEDROCK`) | Demo/workshops; configurable lifetime |
| C | OIDC federation (`AWS_ROLE_ARN`, `AWS_WEB_IDENTITY_TOKEN_FILE`) | Production on Azure App Service; no stored secrets |

### Required Environment Variables

| Variable | Description |
|---|---|
| `TENANT_ID` | Entra tenant ID |
| `BLUEPRINT_APP_ID` | Blueprint app registration; sidecar authenticates as this app |
| `BLUEPRINT_CLIENT_SECRET` | Blueprint client secret (local dev only) |
| `AGENT_CLIENT_ID` | Agent ID (appears as `AgentIdentity` query parameter) |
| `CLIENT_SPA_APP_ID` | SPA app ID for MSAL.js OBO sign-in (OBO flow only) |
| `AWS_REGION` | AWS region for Bedrock |
| `BEDROCK_MODEL_ID` | Default: `us.anthropic.claude-3-haiku-20240307-v1:0` |
| `VALIDATE_TOKEN_SIGNATURE` | Default `true`; set `false` only for debugging |

### Setup Steps (First-Time per Tenant)

1. Create Blueprint app and Agent ID:
   - Follow `Create an agent identity blueprint` and `Create agent identities` docs.
   - Collect: `TENANT_ID`, `BLUEPRINT_APP_ID`, `BLUEPRINT_CLIENT_SECRET`, `AGENT_CLIENT_ID`.

2. (OBO only) Create SPA app:
   ```powershell
   pwsh ../../scripts/setup-obo-client-app.ps1
   pwsh ../../scripts/setup-obo-blueprint.ps1 `
       -TenantId        '<TENANT_ID>' `
       -BlueprintAppId  '<BLUEPRINT_APP_ID>' `
       -AgentAppId      '<AGENT_CLIENT_ID>' `
       -ClientSpaAppId  '<CLIENT_SPA_APP_ID>'
   ```
   SPA redirect URI for this sample: `http://localhost:3001`.

3. Copy `.env.example` to `.env`, fill in the variables above.

4. Start the stack: `docker compose up --build -d`.

---

## Scenario: n8n Agent Calling Microsoft APIs

**Platform:** n8n on Azure Container Apps
**Pattern:** Community node (`@astaykov/n8n-nodes-entraagentid`) — NOT the
sidecar container. Token acquisition is managed directly within n8n workflows
by the community node. The sidecar pattern is documented as an *alternative*;
n8n's recommended integration uses the community node instead.
**Sample repo:** `github.com/astaykov/n8n-aca`

### Deployment

Single `azd up` command provisions all Azure infrastructure and configures n8n
automatically:

```bash
git clone https://github.com/astaykov/n8n-aca.git
cd n8n-aca
azd auth login
azd up
```

Prompted for: environment name, Azure subscription, region, n8n admin email/password.

### Azure Infrastructure Provisioned

| Resource | Purpose |
|---|---|
| Container Apps Environment | Hosts n8n and test SPA |
| n8n Container App | Official `n8nio/n8n` image with HTTPS ingress |
| Static Web App | Test SPA for OBO webhook flow |
| PostgreSQL Flexible Server | Persistent store for workflows, credentials, execution history |
| Storage Account + File Share | Persistent `/home/node/.n8n` (survives restarts) |
| Azure OpenAI | GPT model deployment for AI agent workflows |
| Log Analytics Workspace | Diagnostics and monitoring |

### Entra Identity Objects Created

| Object | Purpose |
|---|---|
| Agent identity blueprint | App registration issuing tokens via Federated Identity Credentials |
| Agent identity service principal | The AI agent's service principal; acquires Graph and MCP tokens autonomously |
| Agent user account | Cloud-only user enabling delegated (OBO) token flows |
| SPA app registration | Client app for webhook demo; preconfigured redirect URIs + Blueprint API permissions |

### n8n Credentials Configured Automatically

| Credential | Purpose |
|---|---|
| EntraAgentID - Autonomous | App-only Microsoft Graph API token (no user context) |
| EntraAgentID - Agent User OBO | Delegated token on behalf of the Agent User |
| Azure OpenAI | Connection to deployed GPT model |
| AgentID Auth Manager - Access Token | Token forwarding from Auth Manager to downstream nodes |
| Bearer from AuthManager | Bearer token forwarding for MCP calls |

### Workflows Deployed

| Workflow | Description |
|---|---|
| Agent ID Auth Manager - Agent User with MCP Enterprise | Acquires delegated MCP token for Agent User; forwards to subworkflow |
| HTTP Request with autonomous agent token | Autonomous agent calling Microsoft Graph directly with app-only token |
| Webhook - assistive agent (on-behalf-of) | Webhook entry point; receives bearer token from SPA, calls Auth Manager, responds via Graph MCP Server on behalf of signed-in user |

### Token Flow Patterns

**Autonomous (app-only):**
- n8n workflow uses Agent Identity Blueprint credentials with Federated Identity
  Credentials to acquire an app-only token for the Agent Identity service
  principal.
- Workflow calls Microsoft Graph directly with this token. No user context.

**On-Behalf-Of (OBO) with MCP:**
- Browser-based SPA sends a bearer token to an n8n webhook.
- Webhook calls the Auth Manager workflow, which uses Blueprint credentials to
  acquire a delegated token on behalf of the Agent User.
- Auth Manager forwards the token to a subworkflow that calls the Microsoft
  Graph MCP Server for Enterprise (`https://mcp.svc.cloud.microsoft/enterprise`).
- MCP Server translates MCP tool calls into Microsoft Graph API requests using
  the delegated token.

The Auth Manager community node handles token acquisition with **AES-256-GCM
caching** within each workflow run.

**Important constraint:** The Microsoft Graph MCP Server for Enterprise only
supports **delegated** permission flows. Use the autonomous credential for
app-only Microsoft Graph calls that bypass MCP.

### MCP Server Scopes Granted

All delegated `MCP.*` scopes mirror their Microsoft Graph counterparts:

| Scope | Purpose |
|---|---|
| `MCP.User.Read.All` | Read all users |
| `MCP.Organization.Read.All` | Read tenant org info |
| `MCP.Group.Read.All` | Read all groups |
| `MCP.GroupMember.Read.All` | Read group memberships |
| `MCP.Application.Read.All` | Read app registrations and service principals |
| `MCP.AuditLog.Read.All` | Read sign-in and audit logs |
| `MCP.Reports.Read.All` | Read Microsoft 365 usage reports |
| `MCP.Policy.Read.All` | Read conditional access policies |
| `MCP.Domain.Read.All` | Read verified domains |
| `MCP.Device.Read.All` | Read Entra-registered devices |

To add more scopes: edit `$MCP_SCOPES` array in `scripts/Setup-EntraAgentId.ps1`
and rerun `azd provision`.

---

## Scenario: Foundry Agent Calling 3rd Party MCP Server (non-Entra OAuth IDP)

> **CRITICAL SCENARIO** — full detail extracted from source documentation.

This scenario covers a **Foundry prompt-based agent** calling an MCP server
that uses a **non-Entra OAuth IDP** (e.g., GitHub OAuth, Okta, Auth0, a custom
OAuth 2.0 authorization server).

### How It Differs from Entra-Only Scenarios

When the MCP server's IDP is Entra, Foundry can use the agent's own Entra
identity (agent identity or project managed identity) directly. When the IDP is
external, Foundry has no pre-existing trust relationship — it needs the *user*
to authorize access via the 3rd party IDP's OAuth flow. This is the **custom
OAuth** variant of OAuth Identity Passthrough.

### Step-by-Step: Foundry Prompt-Based Agent → 3rd Party MCP Server

#### Phase 1: Register OAuth App with 3rd Party IDP

1. Go to the 3rd party IDP's developer portal (e.g., GitHub.com > Settings >
   Developer settings > OAuth Apps).
2. Create a new OAuth application:
   - Set the application name and homepage URL.
   - Leave the **callback/redirect URL blank** for now — you get it from Foundry.
   - Note the **Client ID**.
   - Generate a **Client Secret** (if the IDP requires one).
3. Identify the IDP's OAuth 2.0 endpoints:
   - **Authorization URL** (where users authorize): e.g.,
     `https://github.com/login/oauth/authorize` (GitHub)
   - **Token URL** (code → token exchange): e.g.,
     `https://github.com/login/oauth/access_token` (GitHub)
   - **Refresh URL** (token refresh): may be same as Token URL, or a separate
     endpoint.
4. Identify the required **scopes** for your MCP server tools (e.g., `repo`,
   `read:user` for GitHub).

#### Phase 2: Configure the MCP Connection in Foundry

1. Open the [Foundry portal](https://ai.azure.com/build/tools).
2. Navigate to **Tools > Custom > MCP**.
3. Provide:
   - **Name**: A unique identifier for this MCP server connection.
   - **MCP server endpoint**: The URL of the MCP server (e.g.,
     `https://api.githubcopilot.com/mcp/`).
   - **Authentication**: Select **OAuth Identity Passthrough**.
   - **OAuth type**: Select **Custom OAuth**.
4. Fill in the OAuth configuration fields:
   - **Client ID**: From your IDP app registration.
   - **Client secret**: From your IDP app registration (if required).
   - **Auth URL**: The IDP's authorization endpoint.
   - **Token URL**: The IDP's token endpoint.
   - **Refresh URL**: The IDP's refresh endpoint (can match Token URL).
   - **Scopes**: The scopes required by the MCP server. Include `offline_access`
     if the IDP supports it and you want automatic token refresh.
5. Save the configuration. Foundry displays a **redirect URL** (e.g., something
   under `*.consent.azure-apihub.net`).

#### Phase 3: Register the Redirect URL with the 3rd Party IDP

1. Return to the 3rd party IDP's OAuth app settings.
2. Add the Foundry-provided redirect URL to the list of **allowed redirect
   URIs** / callback URLs.
3. Save the IDP app settings.

This step is **required** — without it, the authorization code callback from
the IDP's authorization server will be rejected, and the consent flow will fail.

#### Phase 4: Connect the MCP Server to an Agent

1. In the Foundry portal, open or create a **Foundry Agent**.
2. Add the MCP server as a tool, referencing the project connection created in
   Phase 2 via `project_connection_id`.
3. Configure `server_url`, `server_label`, and `require_approval` as needed.

Agent creation example (SDK):

```python
from azure.ai.projects import AIProjectClient
from azure.identity import DefaultAzureCredential

client = AIProjectClient(
    endpoint="https://<your-project>.api.azureml.ms",
    credential=DefaultAzureCredential()
)

agent = client.agents.create_agent(
    model="gpt-4o",
    name="my-github-agent",
    instructions="Use GitHub MCP tools to answer questions about repositories.",
    tools=[{
        "type": "mcp",
        "server_url": "https://api.githubcopilot.com/mcp/",
        "server_label": "github",
        "require_approval": "never",
        "project_connection_id": "<your-connection-name>"
    }]
)
```

#### Phase 5: Handle the Consent Flow at Runtime

On the **first run per user** (or first run after consent is revoked):

1. Create a response:

   ```python
   response = client.responses.create(
       agent_id=agent.id,
       input=user_message,
       extra_body={"stream": True}
   )
   ```

2. Inspect the response output for an `oauth_consent_request` item:

   ```json
   {
     "type": "oauth_consent_request",
     "id": "oauthreq_...",
     "consent_link": "https://<region>.consent.azure-apihub.net/login?data=..."
   }
   ```

3. **Surface the `consent_link` to the user.** The user clicks it, is redirected
   to the 3rd party IDP's login page, signs in, and approves the requested
   scopes.

4. After the user closes the consent dialog, **resubmit** with the previous
   response ID to continue:

   ```python
   response = client.responses.create(
       previous_response_id=previous_response.id,
       input=user_message,
       extra_body={
           "agent_reference": {"name": agent.name, "type": "agent_reference"},
           "tool_choice": "required",
           "stream": True
       }
   )
   ```

5. Agent Service retrieves the stored token and calls the MCP server with the
   user's access token. The tool executes and returns results.

6. **On subsequent requests from the same user**, no consent is required. Agent
   Service uses the stored access token (or refreshes it via the refresh token
   if expired).

### Token Storage and Lifecycle

- Agent Service stores the access token and refresh token **per user per tool
  connection per Foundry project**.
- Access tokens are short-lived (typically 1 hour). Agent Service uses the
  refresh token to obtain new access tokens automatically.
- If the refresh token expires or is revoked (extended inactivity, user revokes
  access in the IDP), the user must re-consent.
- Tokens are stored securely within Agent Service — not accessible to the
  agent code or users.

### What Agent Service Does NOT Do

- Agent Service does **not** perform token exchange between Entra and the 3rd
  party IDP. It drives the 3rd party IDP's own OAuth 2.0 authorization code
  flow directly.
- There is no SAML or OIDC token mapping from Entra JWT to a 3rd party IDP
  token. The user authenticates directly with the 3rd party IDP during the
  consent flow.
- There is no automatic "silent consent" based on existing Entra sessions — the
  user must separately authorize with each 3rd party IDP.

---

## Configuration Reference

### Custom OAuth App Fields (Foundry MCP / A2A Connection)

| Field | Required | Notes |
|---|---|---|
| Client ID | Yes | Application ID from OAuth app registration |
| Client secret | No (depends on IDP) | Secret for confidential clients |
| Auth URL | Yes | OAuth 2.0 authorization endpoint |
| Token URL | Yes | OAuth 2.0 token endpoint (code exchange) |
| Refresh URL | Yes | OAuth 2.0 refresh endpoint; use Token URL if no separate one |
| Scopes | No (recommended) | Space-separated scope list; add `offline_access` for refresh token support |

**After saving:** copy the Foundry-generated redirect URL and register it with
the 3rd party OAuth app.

### Agent MCP Tool Fields (SDK / API)

| Field | Description |
|---|---|
| `server_url` | URL of the MCP server (e.g., `https://api.githubcopilot.com/mcp/`) |
| `server_label` | Unique identifier for the MCP server within the agent |
| `require_approval` | `always` (default), `never`, `{"never":[tools]}`, or `{"always":[tools]}` |
| `project_connection_id` | Connection name storing endpoint, auth type, and credentials |

### Supported Authentication Methods for MCP and A2A (Summary)

| Method | User context | Secrets managed by |
|---|---|---|
| Key-based (API key / PAT) | No (shared) | Developer (project connection) |
| Microsoft Entra - agent identity | No (shared) | Agent Service (auto token rotation) |
| Microsoft Entra - project managed identity | No (shared) | Agent Service (auto token rotation) |
| OAuth identity passthrough (managed OAuth) | Yes (per-user) | Agent Service (IDP-managed app) |
| OAuth identity passthrough (custom OAuth) | Yes (per-user) | Developer (custom app) + Agent Service (token storage) |
| Unauthenticated | N/A | N/A |

---

## Security Considerations for 3rd Party IDPs

### Risks

- **Secret exposure:** Custom OAuth client secrets are stored in project
  connections. Anyone with project access can read them. Use least-privilege
  app registrations and restrict project membership.
- **Consent scope creep:** Users may over-consent if scopes are too broad.
  Request only the minimum scopes required.
- **Refresh token theft:** Refresh tokens are long-lived. If the Agent Service
  token store were compromised, an attacker could use refresh tokens until they
  expire. Mitigate by using short-lived tokens where possible and revoking
  tokens when access is no longer needed.
- **Redirect URL hijacking:** If you fail to register the Foundry redirect URL
  with the OAuth app, someone could register it and intercept authorization
  codes. Always register the redirect URL immediately after configuration.
- **Cross-tenant risk:** OAuth Identity Passthrough with Entra-hosted consent
  infrastructure does not support cross-tenant token exchange. For non-Entra
  IDPs, the user authenticates directly with the 3rd party IDP, so Entra tenant
  matching is not a constraint — but the 3rd party IDP's own tenant/org
  isolation must be relied on.
- **IDP trust:** You are trusting the 3rd party IDP's security. If the IDP is
  compromised, attacker-issued tokens could reach your MCP server.

### Best Practices

- **Never embed credentials in agent code.** Use project connections to store
  API keys and OAuth credentials.
- **Use least privilege.** Request only the minimum OAuth scopes needed.
  Monitor and revoke unused tokens.
- **Rotate client secrets regularly.** If the IDP requires a client secret,
  rotate it on a schedule. Prefer PKCE flows (no client secret) where supported.
- **Validate all tokens on the MCP server.** The MCP server must verify token
  signature, issuer, expiry, and audience — even when using OAuth passthrough.
- **Use `offline_access`.** Include it in scopes so Agent Service can refresh
  tokens silently, reducing how often users need to re-consent.
- **Monitor consent and token usage.** Review IDP-side audit logs for unusual
  authorization events.
- **Restrict project access.** Limit Foundry project membership to users who
  need agent access, since project connections (including OAuth client secrets)
  are accessible to all project members.
- **For sidecar deployments in production:** Use
  `SignedAssertionFromManagedIdentity` instead of `ClientSecret` to eliminate
  secret management entirely.
- **Keep the Entra Auth SDK (sidecar) updated.** Security and compatibility
  updates are released regularly.

---

## Source Citations

| # | URL | Title | Last Updated |
|---|---|---|---|
| 1 | https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents | Integrate third-party agents with Microsoft Entra Agent ID | 2026-05-02 |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent | Secure an Amazon Bedrock agent with Microsoft Entra Agent ID | 2026-05-02 |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/integrate-n8n-agent | Secure an n8n agent with Microsoft Entra Agent ID | 2026-05-02 |
| 4 | https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/mcp-authentication | Set up authentication for Model Context Protocol (MCP) tools | 2026-04-09 |
| 5 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-to-agent-authentication | Agent2Agent (A2A) authentication | 2026-02-28 |
