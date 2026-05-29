---
area: sdk-sidecar
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar
  - https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview
  - https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/configuration
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/installation
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/endpoints
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/validate-authorization-header
  - https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/call-downstream-api
extracted_at: 2026-05-29
---

# SDK & Sidecar: Microsoft Entra Agent ID

## Why the Sidecar Pattern Exists

Common approaches to agent authentication are insecure or limiting:

- **Hard-coded secrets in agent code**: Every agent image holds a copy of `client_secret`. Any compromise, log leak, or `.env` file committed to Git exposes the full tenant.
- **Delegated user tokens for everything**: The agent can only act when a human is present. Every call looks like the same service principal — individual auditability is lost.

Microsoft Entra Agent ID gives each agent its own identity. The sidecar pattern makes that identity usable while keeping **all credential handling outside agent code**.

The sidecar also solves a polyglot problem: embedding MSAL or Microsoft.Identity.Web directly in every service requires each service to be .NET (or add per-language identity libraries). The sidecar exposes a **plain HTTP API** that any language (Python, Node.js, Go, Java, etc.) can call.

## Sidecar Architecture

```
Client Application → Your Agent Container → Sidecar Container → Microsoft Entra ID
```

The **Microsoft Entra Auth SDK sidecar** (`mcr.microsoft.com/entra-sdk/auth-sidecar`) runs as a companion container exposing HTTP endpoints on the pod-local network. No host port is exposed — only services in the same network (pod/compose service) can request tokens.

### Responsibilities of the sidecar

| Agent container does | Sidecar does |
|---|---|
| Decide when to call the API | Acquire and cache the right token |
| Build the HTTP request | Perform client-credentials and OBO exchange |
| Pass through user token for OBO | Validate and forward user assertion |
| Handle business logic | Communicate with `login.microsoftonline.com` |

### Identity objects in the sidecar pattern

| Object | Role | Location |
|---|---|---|
| Blueprint application | Template that creates/issues agent identities; holds client credential (secret or federated) | Microsoft Entra tenant |
| Agent identity | Individual AI agent with unique app ID, permission grants, and audit trail | Microsoft Entra tenant |
| Client SPA (OBO only) | Web UI that signs the user in and exchanges the user's token for an agent token | Microsoft Entra tenant |
| Sidecar container | Runs client-credentials and OBO flows; holds the blueprint credential | Next to your agent (pod/compose) |
| Agent container | Application code that requests authorization headers from the sidecar | Your pod, compose service, or App Service |

### Architecture diagram (mermaid — from docs)

```
client[Client Application] --Bearer over HTTP--> webapi[Web API]
  subgraph Pod / Host
    webapi --"/Validate, /AuthorizationHeader/{name}, /DownstreamApi/{name}"--> sidecar[Microsoft Entra SDK for Agent ID]
  end
  sidecar --Token validation & acquisition--> entra[Microsoft Entra ID]
```

### Container image

```
mcr.microsoft.com/entra-sdk/auth-sidecar
```

(Version tags: use `1.0.0` or latest; see [MCR page](https://mcr.microsoft.com/en-us/product/entra-sdk/auth-sidecar/about))

### Security boundary

- The sidecar **must not be publicly accessible** — only reachable by applications in the same trust boundary (same pod or virtual network).
- Never expose via `LoadBalancer` or `Ingress`.
- Bind to `127.0.0.1:5000` or pod-local for maximum isolation.

---

## Sidecar HTTP API Endpoints

Full reference: `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/endpoints`

OpenAPI specification available at `/openapi/v1.json` (development mode) and in the repo:
`https://github.com/AzureAD/microsoft-identity-web/blob/master/src/Microsoft.Identity.Web.Sidecar/OpenAPI/Microsoft.Identity.Web.Sidecar.json`

### Endpoint overview

| Endpoint | Method(s) | Description | Auth required |
|---|---|---|---|
| `/Validate` | GET | Validate inbound bearer token; return claims | Yes |
| `/AuthorizationHeader/{serviceName}` | GET | Validate inbound token (if present) + acquire authorization header for a downstream API | Yes |
| `/AuthorizationHeaderUnauthenticated/{serviceName}` | GET | Acquire authorization header (app/agent identity only); no inbound user token | Yes |
| `/DownstreamApi/{serviceName}` | GET, POST, PUT, PATCH, DELETE | Validate inbound token (if present) + call downstream API with automatic token acquisition | Yes |
| `/DownstreamApiUnauthenticated/{serviceName}` | GET, POST, PUT, PATCH, DELETE | Call downstream API (app/agent identity only); no user token | Yes |
| `/healthz` | GET | Health probe (liveness/readiness) | No |
| `/openapi/v1.json` | GET | OpenAPI 3.0 document | No (dev only) |

---

### `/Validate`

Validates the inbound bearer token and returns its claims.

**Request:**
```http
GET /Validate HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response (200):**
```json
{
  "protocol": "Bearer",
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "claims": {
    "aud": "api://your-api-id",
    "iss": "https://sts.windows.net/tenant-id/",
    "iat": 1234567890,
    "nbf": 1234567890,
    "exp": 1234571490,
    "acr": "1",
    "appid": "client-id",
    "appidacr": "1",
    "idp": "https://sts.windows.net/tenant-id/",
    "oid": "user-object-id",
    "tid": "tenant-id",
    "scp": "access_as_user",
    "sub": "subject",
    "ver": "1.0"
  }
}
```

**Errors:**
```json
// 400 - No token
{ "status": 400, "detail": "No token found" }

// 401 - Invalid token
{ "status": 401 }
```

---

### `/AuthorizationHeader/{serviceName}`

Acquires an access token for the configured downstream API and returns it as an `Authorization` header value. If a user bearer token is provided, OBO (delegated) is used; otherwise app-context patterns apply.

**Path parameter:** `serviceName` — name of the downstream API in configuration.

**Query parameters — standard overrides:**

| Parameter | Type | Description | Example |
|---|---|---|---|
| `optionsOverride.Scopes` | string[] | Override configured scopes (repeatable) | `?optionsOverride.Scopes=User.Read&optionsOverride.Scopes=Mail.Read` |
| `optionsOverride.RequestAppToken` | boolean | Force app-only token (skip OBO) | `?optionsOverride.RequestAppToken=true` |
| `optionsOverride.AcquireTokenOptions.Tenant` | string | Override tenant ID | `?optionsOverride.AcquireTokenOptions.Tenant=tenant-guid` |
| `optionsOverride.AcquireTokenOptions.PopPublicKey` | string | Enable PoP/SHR (base64 public key) | `?optionsOverride.AcquireTokenOptions.PopPublicKey=base64key` |
| `optionsOverride.AcquireTokenOptions.PopClaims` | string | Additional PoP claims (JSON) | `?optionsOverride.AcquireTokenOptions.PopClaims={"nonce":"abc"}` |

**Query parameters — Agent Identity:**

| Parameter | Type | Description | Example |
|---|---|---|---|
| `AgentIdentity` | string | Agent app (client) ID | `?AgentIdentity=11111111-2222-3333-4444-555555555555` |
| `AgentUsername` | string | User principal name (delegated agent) | `?AgentIdentity=<id>&AgentUsername=user@contoso.com` |
| `AgentUserId` | string | User object ID (delegated agent) | `?AgentIdentity=<id>&AgentUserId=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee` |

**Rules:**
- `AgentUsername` or `AgentUserId` **require** `AgentIdentity`.
- `AgentUsername` and `AgentUserId` are **mutually exclusive**.
- `AgentIdentity` alone = autonomous agent.
- `AgentIdentity` + inbound user token = delegated agent.

**Example requests:**
```http
GET /AuthorizationHeader/Graph HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

GET /AuthorizationHeader/Graph?optionsOverride.RequestAppToken=true HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id> HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response (200):**
```json
{ "authorizationHeader": "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..." }
```

**PoP/SHR response:**
```json
{ "authorizationHeader": "PoP eyJ0eXAiOiJhdCtqd3QiLCJhbGc..." }
```

---

### `/AuthorizationHeaderUnauthenticated/{serviceName}`

Same behavior and parameters as `/AuthorizationHeader/{serviceName}` but **no inbound user token is expected**. Used for app-only or autonomous/agent identity acquisition without user context.

```http
GET /AuthorizationHeaderUnauthenticated/Graph HTTP/1.1
```

Response:
```json
{ "authorizationHeader": "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..." }
```

---

### `/DownstreamApi/{serviceName}`

Acquires an access token **and** performs the HTTP request to the downstream API. Returns status code, headers, and body from the downstream response. Supports user OBO, app-only, or agent identity patterns.

**Additional query parameters** (in addition to `/AuthorizationHeader` parameters):

| Parameter | Type | Description | Example |
|---|---|---|---|
| `optionsOverride.HttpMethod` | string | Override HTTP method | `?optionsOverride.HttpMethod=POST` |
| `optionsOverride.RelativePath` | string | Append to configured `BaseUrl` | `?optionsOverride.RelativePath=me/messages` |
| `optionsOverride.CustomHeader.<Name>` | string | Add custom header(s) | `?optionsOverride.CustomHeader.X-Custom=value` |

**Request body forwarding** — body is passed through unchanged:
```http
POST /DownstreamApi/Graph?optionsOverride.RelativePath=me/messages HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
Content-Type: application/json

{ "subject": "Hello", "body": { "contentType": "Text", "content": "Hello world" } }
```

**Response (200):**
```json
{
  "statusCode": 200,
  "headers": { "content-type": "application/json" },
  "content": "{\"@odata.context\":\"...\",\"displayName\":\"...\"}"
}
```

---

### `/DownstreamApiUnauthenticated/{serviceName}`

Same as `/DownstreamApi/{serviceName}` but no inbound user token is validated. Use for app-only or autonomous agent operations.

---

### `/healthz`

Basic health probe endpoint for liveness/readiness.

```http
HTTP/1.1 200 OK      (healthy)
HTTP/1.1 503 Service Unavailable   (unhealthy)
```

---

### Complete override reference (all query params)

```text
optionsOverride.Scopes=<scope>                          # Repeatable
optionsOverride.RequestAppToken=<true|false>
optionsOverride.BaseUrl=<url>
optionsOverride.RelativePath=<path>
optionsOverride.HttpMethod=<method>
optionsOverride.AcquireTokenOptions.Tenant=<tenant-id>
optionsOverride.AcquireTokenOptions.AuthenticationScheme=<scheme>
optionsOverride.AcquireTokenOptions.CorrelationId=<guid>
optionsOverride.AcquireTokenOptions.PopPublicKey=<base64-key>
optionsOverride.AcquireTokenOptions.PopClaims=<json>
optionsOverride.CustomHeader.<Name>=<value>

AgentIdentity=<agent-client-id>
AgentUsername=<user-upn>            # Requires AgentIdentity
AgentUserId=<user-object-id>        # Requires AgentIdentity; mutually exclusive with AgentUsername
```

---

### Common error patterns

```json
// 400 - Missing service name
{ "status": 400, "detail": "Service name is required" }

// 400 - Invalid agent combination
{ "status": 400, "detail": "AgentUsername and AgentUserId are mutually exclusive" }

// 401 - Invalid token
{ "status": 401 }

// 403 - Missing scope
{ "status": 403, "detail": "The scope 'access_as_user' is required" }

// 404 - Service not configured
{ "status": 404, "detail": "Downstream API 'UnknownService' not configured" }

// 500 - Token acquisition failure
{ "status": 500, "detail": "Failed to acquire token for downstream API" }

// 500 - MSAL error
{ "status": 500, "detail": "MSAL.NetCore.invalid_grant: AADSTS50076: ...", "extensions": { "errorCode": "invalid_grant", "correlationId": "..." } }
```

---

## Agent Operating Modes via SDK/Sidecar

Three distinct operating modes, all using the same `/AuthorizationHeader/{serviceName}` endpoint pattern:

### 1. Autonomous agent (app-only)

Agent operates on its own behalf using a service principal created for the agent. Provide `AgentIdentity` (the agent's client ID):

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-ID>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

### 2. Autonomous agent's user account (delegated, no interactive user)

Agent operates on behalf of a specific user account (e.g., agent has its own mailbox). Provide `AgentIdentity` + either `AgentUserId` or `AgentUsername` (not both):

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUserId=<agent-user-object-id>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUsername=<agent-user-principal-name>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

Providing both `AgentUserId` and `AgentUsername` causes a **validation error**.

### 3. Interactive OBO (agent acting on behalf of human user)

Agent acts on behalf of a signed-in human. Two-step flow:

```http
# Step 1: Validate incoming user token
GET /Validate
Authorization: Bearer <user-token>

# Step 2: Get authorization header on behalf of the user (OBO)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id>
Authorization: Bearer <user-token>
```

The `/AuthorizationHeader` + OBO flow: the agent validates the user token via `/Validate`, then passes the same user token in the `Authorization` header when calling `/AuthorizationHeader`. The sidecar internally performs the OBO exchange.

---

## Microsoft Entra SDK for Agent ID

**What it is:** A containerized web service (ASP.NET Core) that handles token acquisition, validation, and secure downstream API calls. Communicates with applications through a **plain HTTP API** — no SDK library required in application code.

**Key benefits:**

| Benefit | Detail |
|---|---|
| Multiple Language Support | Call via HTTP from Python, Node.js, Go, Java, and any other language |
| Centralized Security config | One place for identity configuration, token management, and credential management |
| Container Native | Built for Kubernetes, Docker, AKS, and other modern deployments |
| Zero Trust Ready | Integrates with managed identity and proof-of-possession tokens; keeps sensitive data out of application code |

**Supported token operations:**
- Token **validation**: access tokens and ID tokens issued by Microsoft Entra ID; verifies signatures, expiration, audience
- Token **acquisition**:
  - On-Behalf-Of OAuth 2.0 flow (delegated user context to downstream APIs)
  - Client Credentials (application-to-application)
  - Managed Identity (native Azure service authentication)
  - Agent Identity (autonomous or delegated agent patterns)
- **Downstream API calls**: acquire and attach tokens automatically; optional request overrides; Signed HTTP Requests (PoP/SHR) support

**Scenarios available (with docs links):**

| Scenario | Description |
|---|---|
| Validate Authorization Header | Extract claims from bearer tokens for access control |
| Obtain Authorization Header | Acquire tokens for calling downstream APIs securely |
| Call Downstream API | Make HTTP calls to protected APIs with automatic token attachment |
| Use Managed Identity | Authenticate as an Azure service |
| Implement Long-Running OBO Flow | Handle user context over extended operations with token refresh |
| Use Signed HTTP Requests | Implement proof-of-possession security with PoP tokens |
| Agent Autonomous Batch Processing | Process batch jobs with autonomous agent identity |
| Integrate from TypeScript | Use from Node.js/Express/NestJS |
| Integrate from Python | Use from Flask/FastAPI/Django |

---

## Configuration

The sidecar is configured following **ASP.NET Core conventions** via:
- Environment variables (recommended for Kubernetes)
- `appsettings.json` attached to the container
- Command-line arguments
- Azure App Configuration or Key Vault (advanced)

### Core Entra ID settings

```yaml
env:
- name: AzureAd__Instance
  value: "https://login.microsoftonline.com/"
- name: AzureAd__TenantId
  value: "<your-tenant-id>"
- name: AzureAd__ClientId
  value: "<your-client-id>"
- name: AzureAd__Audience     # Optional; defaults to api://{ClientId}
  value: "api://your-api-id"
- name: AzureAd__Scopes       # Optional; required scopes in incoming tokens (space-separated)
  value: "access_as_user"
```

| Variable | Required | Default |
|---|---|---|
| `AzureAd__Instance` | No | `https://login.microsoftonline.com/` |
| `AzureAd__TenantId` | Yes | — |
| `AzureAd__ClientId` | Yes | — |
| `AzureAd__Audience` | No | `api://{ClientId}` |
| `AzureAd__Scopes` | No | — |

Note on `AzureAd__Audience`: For `requestedAccessTokenVersion=2` use `{ClientId}` directly; for v1 or null use the App ID URI (typically `api://{ClientId}`).

### Client credential types

#### Client secret (dev/test only — NOT for production)
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "ClientSecret"
- name: AzureAd__ClientCredentials__0__ClientSecret
  value: "<your-client-secret>"
```

#### Certificate from Key Vault (production — centralized cert management)
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "KeyVault"
- name: AzureAd__ClientCredentials__0__KeyVaultUrl
  value: "https://<your-keyvault>.vault.azure.net"
- name: AzureAd__ClientCredentials__0__KeyVaultCertificateName
  value: "<certificate-name>"
```

#### Certificate from file (Kubernetes secrets mounted as files)
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "Path"
- name: AzureAd__ClientCredentials__0__CertificateDiskPath
  value: "/path/to/certificate.pfx"
- name: AzureAd__ClientCredentials__0__CertificatePassword
  value: "<certificate-password>"
```

#### Certificate from store (Windows environments)
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "StoreWithThumbprint"
- name: AzureAd__ClientCredentials__0__CertificateStorePath
  value: "CurrentUser/My"
- name: AzureAd__ClientCredentials__0__CertificateThumbprint
  value: "<thumbprint>"
```

#### Workload Identity for containers — **recommended for AKS**
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "SignedAssertionFilePath"
```
The workload identity webhook automatically projects the federated token to `/var/run/secrets/azure/tokens/azure-identity-token` when the pod has the required label and service account annotation.

> **Important:** Do NOT use `SignedAssertionFilePath` for non-AKS containers. For non-containerized Azure VMs/App Services, use `SignedAssertionFromManagedIdentity`.

#### Managed Identity for VMs and App Services (NOT for containers)
```yaml
- name: AzureAd__ClientCredentials__0__SourceType
  value: "SignedAssertionFromManagedIdentity"
- name: AzureAd__ClientCredentials__0__ManagedIdentityClientId
  value: "<managed-identity-client-id>"
```

#### Credential priority (multiple credentials — fallback chain)
```yaml
# First priority
- name: AzureAd__ClientCredentials__0__SourceType
  value: "KeyVault"
# Second priority (fallback)
- name: AzureAd__ClientCredentials__1__SourceType
  value: "ClientSecret"
```
Evaluated in numeric order (0, 1, 2, …). Uses first that successfully authenticates.

### Downstream APIs configuration

```yaml
- name: DownstreamApis__Graph__BaseUrl
  value: "https://graph.microsoft.com/v1.0"
- name: DownstreamApis__Graph__Scopes
  value: "User.Read Mail.Read"
- name: DownstreamApis__Graph__RelativePath
  value: "/me"

- name: DownstreamApis__MyApi__BaseUrl
  value: "https://api.contoso.com"
- name: DownstreamApis__MyApi__Scopes
  value: "api://myapi/.default"
```

| Variable | Required | Default |
|---|---|---|
| `DownstreamApis__<Name>__BaseUrl` | Yes | — |
| `DownstreamApis__<Name>__Scopes` | Yes | — |
| `DownstreamApis__<Name>__HttpMethod` | No | GET |
| `DownstreamApis__<Name>__RelativePath` | No | — |
| `DownstreamApis__<Name>__RequestAppToken` | No | false |

`<Name>` is the `serviceName` used in endpoint paths (e.g., `Graph` → `/AuthorizationHeader/Graph`).

### Credential source abstraction (key pattern)

The sidecar abstracts the credential source from agent code:
- **Development**: use `ClientSecret`
- **Azure production**: switch to `SignedAssertionFromManagedIdentity` or `SignedAssertionFilePath`

Agent code does **not change** — it continues to call the same `/AuthorizationHeader` endpoint regardless of the authentication mechanism. Configuration alone determines the credential source.

### Complete Kubernetes ConfigMap + Secret example

```yaml
# ConfigMap (non-sensitive)
apiVersion: v1
kind: ConfigMap
metadata:
  name: sidecar-config
data:
  ASPNETCORE_ENVIRONMENT: "Production"
  ASPNETCORE_URLS: "http://+:5000"
  AzureAd__Instance: "https://login.microsoftonline.com/"
  AzureAd__TenantId: "common"
  AzureAd__ClientId: "your-app-client-id"
  AzureAd__Scopes: "access_as_user"
  DownstreamApis__Graph__BaseUrl: "https://graph.microsoft.com/v1.0"
  DownstreamApis__Graph__Scopes: "User.Read Mail.Read"
  DownstreamApis__MyApi__BaseUrl: "https://api.contoso.com"
  DownstreamApis__MyApi__Scopes: "api://myapi/.default"
  Logging__LogLevel__Default: "Information"
  Logging__LogLevel__Microsoft.Identity.Web: "Debug"

---
# Secret (sensitive)
apiVersion: v1
kind: Secret
metadata:
  name: sidecar-secrets
type: Opaque
stringData:
  AzureAd__ClientCredentials__0__ClientSecret: "your-client-secret"

---
# Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      containers:
      - name: sidecar
        image: mcr.microsoft.com/entra-sdk/auth-sidecar:1.0.0
        envFrom:
        - configMapRef:
            name: sidecar-config
        - secretRef:
            name: sidecar-secrets
```

### Docker Compose (local development)

```yaml
version: '3.8'
services:
  app:
    image: myregistry/myapp:latest
    ports:
      - "8080:8080"
    environment:
      - SIDECAR_URL=http://sidecar:5000
  sidecar:
    image: mcr.microsoft.com/entra-sdk/auth-sidecar:1.0.0
    environment:
      - AzureAd__TenantId=${TENANT_ID}
      - AzureAd__ClientId=${CLIENT_ID}
      - AzureAd__ClientCredentials__0__SourceType=ClientSecret
      - AzureAd__ClientCredentials__0__ClientSecret=${CLIENT_SECRET}
    networks:
      - app-network
networks:
  app-network:
    driver: bridge
```

Local development: agent calls `localhost:7000/token` (or the configured sidecar URL).

---

## Third-Party Agent Integration (Sidecar Pattern)

Third-party agents (AWS Bedrock, n8n, Ollama, etc.) need to:
- Call Microsoft APIs (Microsoft Graph, Azure services)
- Access internal APIs and resources
- Authenticate securely without storing secrets in code or configuration

### Two integration patterns

#### Pattern 1: Microsoft Entra Auth SDK (sidecar)

Runs the SDK as a companion container. Agent calls the sidecar for tokens; agent **never handles credentials directly**.

**Best for:**
- Containerized agents on Docker or Kubernetes
- AWS Bedrock agents in your own orchestration
- Local development with Docker Compose
- Any containerized agent (language-agnostic)

**Supported platforms:** AWS Bedrock (Claude etc.), local LLMs (Ollama + LangChain), any containerized agent.

**Consideration:** Requires managing a second container.

#### Pattern 2: Workload Identity Federation (direct identity exchange)

Uses Workload Identity Federation to exchange credentials from external identity providers (AWS STS, GCP Workload Identity) directly for Microsoft Entra tokens. **No sidecar required**.

**Best for:** AWS agents using STS and OIDC, organizations with existing federation infrastructure, agents that can't run containers.

**Requirements:** A preconfigured Federated Identity Credential in Microsoft Entra; agent platform that supports OIDC or STS.

### Token flow (both patterns)

1. Agent (or sidecar on its behalf) calls Microsoft Entra Agent ID with authentication credentials.
2. Microsoft Entra validates the agent's identity (client credentials, federated credential, etc.).
3. Microsoft Entra returns an access token.
4. Agent uses the token to authenticate to Microsoft or custom APIs.
5. API checks token signature and claims; grants access.

### Common third-party integration scenarios

#### AWS Bedrock agent calling Microsoft Graph

```
1. Deploy agent and sidecar to AWS or own infrastructure
2. Configure Agent Identity in Microsoft Entra with Microsoft Graph permissions
3. Agent calls sidecar for a token
4. Sidecar acquires token from Microsoft Entra Agent ID
5. Agent uses token to call Microsoft Graph
```

See: `https://learn.microsoft.com/en-us/entra/agent-id/integrate-aws-bedrock-agent`

#### n8n agent calling Microsoft Graph

Uses the `n8n-nodes-entraagentid` community node.

```
1. Deploy n8n to Azure Container Apps using azd
2. Configure Agent Identity in Microsoft Entra
3. n8n workflow uses community node to acquire a token
4. Agent calls Microsoft Graph or MCP Server for Enterprise
```

See: `https://learn.microsoft.com/en-us/entra/agent-id/integrate-n8n-agent`

#### Local development with Ollama

```
1. Run agent and sidecar in Docker Compose
2. Agent calls localhost:7000/token to request token
3. Sidecar acquires token from Microsoft Entra Agent ID
4. Test agent behavior locally before deploying
```

See: `https://learn.microsoft.com/en-us/entra/agent-id/sidecar-local-development`

### Troubleshooting (third-party integration)

| Issue | Likely cause | Resolution |
|---|---|---|
| Agent can't reach sidecar | Network or sidecar not running | Verify sidecar is running; check DNS, networking, port binding (default: 7000) |
| Sidecar fails to acquire token | Entra authentication failed | Verify Agent Identity credentials, check permissions, review tenant ID and client ID |
| Token request returns 401 | Invalid credentials or federated credential not configured | Confirm credentials; verify federated identity credential setup |
| API rejects token | Token lacks required scope | Add required API permissions; request token with correct scope |

---

## Code Examples

### TypeScript — token validation middleware

```typescript
import fetch from 'node-fetch';

interface ValidateResponse {
  protocol: string;
  token: string;
  claims: {
    aud: string; iss: string; oid: string; sub: string; tid: string;
    upn?: string; scp?: string; roles?: string[];
    [key: string]: any;
  };
}

async function validateToken(authorizationHeader: string): Promise<ValidateResponse> {
  const sidecarUrl = process.env.SIDECAR_URL || 'http://localhost:5000';
  const response = await fetch(`${sidecarUrl}/Validate`, {
    headers: { 'Authorization': authorizationHeader }
  });
  if (!response.ok) throw new Error(`Token validation failed: ${response.statusText}`);
  return await response.json() as ValidateResponse;
}

// Express.js middleware
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No authorization token provided' });
  try {
    const validation = await validateToken(authHeader);
    req.user = {
      id: validation.claims.oid,
      upn: validation.claims.upn,
      tenantId: validation.claims.tid,
      scopes: validation.claims.scp?.split(' ') || [],
      roles: validation.claims.roles || [],
      claims: validation.claims
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
```

### Python — token validation with Flask

```python
import os
import requests
from flask import Flask, request, jsonify, g
from functools import wraps

app = Flask(__name__)

def validate_token(authorization_header: str) -> dict:
    sidecar_url = os.getenv('SIDECAR_URL', 'http://localhost:5000')
    response = requests.get(
        f"{sidecar_url}/Validate",
        headers={'Authorization': authorization_header}
    )
    if not response.ok:
        raise Exception(f"Token validation failed: {response.text}")
    return response.json()

def require_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'No authorization token provided'}), 401
        try:
            validation = validate_token(auth_header)
            g.user = {
                'id': validation['claims']['oid'],
                'upn': validation['claims'].get('upn'),
                'tenant_id': validation['claims']['tid'],
                'scopes': validation['claims'].get('scp', '').split(' '),
                'roles': validation['claims'].get('roles', []),
                'claims': validation['claims']
            }
            return f(*args, **kwargs)
        except Exception as e:
            return jsonify({'error': 'Invalid token'}), 401
    return decorated_function
```

### TypeScript — calling downstream API via `/DownstreamApi`

```typescript
async function callDownstreamApi(
  incomingToken: string,
  serviceName: string,
  relativePath: string,
  method: string = 'GET',
  body?: any
): Promise<any> {
  const sdkUrl = process.env.ENTRA_SDK_URL || 'http://localhost:5000';
  const url = new URL(`${sdkUrl}/DownstreamApi/${serviceName}`);
  url.searchParams.append('optionsOverride.RelativePath', relativePath);
  if (method !== 'GET') url.searchParams.append('optionsOverride.HttpMethod', method);
  const requestOptions: any = { method, headers: { 'Authorization': incomingToken } };
  if (body) { requestOptions.headers['Content-Type'] = 'application/json'; requestOptions.body = JSON.stringify(body); }
  const response = await fetch(url.toString(), requestOptions);
  if (!response.ok) throw new Error(`SDK error: ${response.statusText}`);
  const data = await response.json() as { statusCode: number; headers: any; content: string };
  if (data.statusCode >= 400) throw new Error(`API error ${data.statusCode}: ${data.content}`);
  return JSON.parse(data.content);
}

// Usage
const profile = await callDownstreamApi(incomingToken, 'Graph', 'me');
const emails  = await callDownstreamApi(incomingToken, 'Graph', 'me/messages?$top=10');
```

### Python — calling downstream API via `/DownstreamApi`

```python
def call_downstream_api(incoming_token, service_name, relative_path, method='GET', body=None):
    sdk_url = os.getenv('ENTRA_SDK_URL', 'http://localhost:5000')
    params = {'optionsOverride.RelativePath': relative_path}
    if method != 'GET': params['optionsOverride.HttpMethod'] = method
    headers = {'Authorization': incoming_token}
    response = requests.request(
        method, f"{sdk_url}/DownstreamApi/{service_name}",
        params=params, headers=headers, json=body
    )
    if not response.ok: raise Exception(f"SDK error: {response.text}")
    data = response.json()
    if data['statusCode'] >= 400: raise Exception(f"API error {data['statusCode']}: {data['content']}")
    return json.loads(data['content'])
```

### Go — token validation

```go
func validateToken(authHeader string) (*ValidateResponse, error) {
    sidecarURL := os.Getenv("SIDECAR_URL")
    if sidecarURL == "" { sidecarURL = "http://localhost:5000" }
    req, _ := http.NewRequest("GET", fmt.Sprintf("%s/Validate", sidecarURL), nil)
    req.Header.Set("Authorization", authHeader)
    client := &http.Client{}
    resp, err := client.Do(req)
    if err != nil { return nil, err }
    defer resp.Body.Close()
    if resp.StatusCode != http.StatusOK {
        return nil, fmt.Errorf("token validation failed: %s", resp.Status)
    }
    var validation ValidateResponse
    json.NewDecoder(resp.Body).Decode(&validation)
    return &validation, nil
}
```

### Acquiring tokens for three agent modes (from `microsoft-entra-sdk-for-agent-identities`)

```bash
# Autonomous agent (app-only)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-ID>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

# Autonomous agent's user account (by object ID)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUserId=<agent-user-object-id>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

# Autonomous agent's user account (by UPN)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUsername=<agent-user-principal-name>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

# Interactive OBO (step 1: validate incoming user token)
GET /Validate
Authorization: Bearer <user-token>

# Interactive OBO (step 2: get token on behalf of user)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id>
Authorization: Bearer <user-token>
```

### AKS deployment with Workload Identity

```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: myapp-sa
  namespace: default
  annotations:
    azure.workload.identity/client-id: "<MANAGED_IDENTITY_CLIENT_ID>"

---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp-deployment
spec:
  template:
    metadata:
      labels:
        azure.workload.identity/use: "true"
    spec:
      serviceAccountName: myapp-sa
      containers:
      - name: app
        image: myregistry/myapp:latest
        env:
        - name: SIDECAR_URL
          value: "http://localhost:5000"
      - name: sidecar
        image: mcr.microsoft.com/entra-sdk/auth-sidecar:1.0.0
        ports:
        - containerPort: 5000
        env:
        - name: AzureAd__TenantId
          value: "your-tenant-id"
        - name: AzureAd__ClientId
          value: "<MANAGED_IDENTITY_CLIENT_ID>"
        - name: AzureAd__ClientCredentials__0__SourceType
          value: "SignedAssertionFilePath"
        livenessProbe:
          httpGet: { path: /health, port: 5000 }
          initialDelaySeconds: 10
          periodSeconds: 10
        readinessProbe:
          httpGet: { path: /health, port: 5000 }
          initialDelaySeconds: 5
          periodSeconds: 5
```

---

## Comparison: Sidecar vs. In-Process SDK (MSAL / Microsoft.Identity.Web)

| Aspect | Microsoft Entra SDK for Agent ID (sidecar) | Microsoft.Identity.Web (in-process) |
|---|---|---|
| Language Support | Multiple languages (Python, Node.js, Go, Java, etc.) | .NET only |
| Deployment Model | Containers (Kubernetes, Docker, AKS) | Any deployment model |
| Identity Patterns | Consistent patterns across all services | Deep .NET framework integration |
| Agent Identity | Available in all supported languages | .NET only |
| Token Validation | Available in all supported languages | .NET only |
| Security Model | Secrets and tokens isolated from application code | Integrated with application |
| Performance | Additional network hop required | Direct in-process calls |
| Framework Integration | HTTP API integration | Native .NET integration |
| Containerization | Designed for containerized environments | Works with or without containers |

### `/DownstreamApi` vs `/AuthorizationHeader` within the sidecar

| Scenario | Endpoint | Reason |
|---|---|---|
| Standard REST API calls | `/DownstreamApi` | SDK handles both token acquisition and HTTP; reduces boilerplate |
| Complex HTTP clients needing custom config | `/AuthorizationHeader` | Specialized request/response handling; fine-grained control |
| Direct access to HTTP error codes/headers | `/AuthorizationHeader` | Low-level HTTP behavior control |
| Simplicity and quick integration | `/DownstreamApi` | Applications prioritizing simplicity |

### When to choose each approach

**Use the sidecar when:**
- Your services are multi-language
- You are containerized (Kubernetes, Docker, AKS)
- You want credential isolation from application code
- You are integrating third-party agents (AWS Bedrock, n8n, Ollama)
- You want consistent auth patterns across polyglot microservices

**Use Microsoft.Identity.Web (in-process) when:**
- All services are .NET
- You need native ASP.NET Core integration without an extra network hop
- You are not containerized or don't want to manage a second container
- Performance of token acquisition is critical (no additional network hop)

---

## Resource Requirements for Sidecar Container

| Scenario | Memory | CPU |
|---|---|---|
| Minimum | 128Mi | 100m |
| Recommended | 256Mi | 250m |
| High Traffic | 512Mi | 500m |

**Scaling:** Each SDK instance maintains its own token cache. Scale horizontally by adding more application pods (each with its own SDK instance). Stateless design.

---

## Security Best Practices

- **Never expose sidecar externally** (no `LoadBalancer`, no `Ingress`); bind to `127.0.0.1:5000`.
- Use Kubernetes Network Policies to restrict traffic.
- Use **Workload Identity** (`SignedAssertionFilePath`) for AKS; **never** use client secrets in production for blueprint credentials.
- Store client secrets and certificates in Kubernetes Secrets or Azure Key Vault.
- Never embed credentials in agent code.
- Use least privilege — grant Agent Identities only the permissions they need.
- Monitor token usage via Microsoft Entra logs.
- Keep the Microsoft Entra SDK updated.

---

## Source Citations

1. **Authentication with Microsoft Entra Auth SDK (sidecar)** (updated 2026-05-02)
   `https://learn.microsoft.com/en-us/entra/agent-id/authentication-with-auth-sdk-sidecar`

2. **Acquire tokens and call downstream APIs with Microsoft Entra SDK for Agent ID** (updated 2026-04-09)
   `https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities`

3. **Overview of the Microsoft Entra SDK for Agent ID** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/overview`

4. **Integrate third-party agents with Microsoft Entra Agent ID** (updated 2026-05-02)
   `https://learn.microsoft.com/en-us/entra/agent-id/configure-third-party-agents`

5. **Configuration reference: Microsoft Entra SDK for Agent ID settings** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/configuration`

6. **Installation guide: Deploy the Microsoft Entra SDK for AgentID** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/installation`

7. **Endpoints reference: Microsoft Entra SDK for Agent ID HTTP API** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/endpoints`

8. **Scenario: Validate an authorization header** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/validate-authorization-header`

9. **Scenario: Call a downstream API** (updated 2026-04-19)
   `https://learn.microsoft.com/en-us/entra/msidweb/agent-id-sdk/scenarios/call-downstream-api`
