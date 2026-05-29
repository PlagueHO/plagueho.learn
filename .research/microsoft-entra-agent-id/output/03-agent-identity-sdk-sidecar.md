---
section_id: "03-agent-identity-sdk-sidecar"
title: "Agent Identity SDK & Sidecar Pattern"
status: complete
areas: [sdk-sidecar]
---

## Agent Identity SDK & Sidecar Pattern

### Why the sidecar pattern exists

Without the sidecar, common approaches to agent authentication introduce problems that are difficult
to recover from at scale:

- **Hard-coded secrets in agent code** — every agent image holds a copy of `client_secret`. Any
  log leak, `.env` file committed to Git, or container image extraction exposes the full tenant.
- **Per-language identity libraries** — embedding MSAL or Microsoft.Identity.Web directly in each
  service requires .NET (or equivalent per-language identity libraries) in every agent. Python,
  Node.js, Go, and Java agents each need separate, maintained integrations.
- **Delegated user tokens for everything** — the agent can only act when a human is present, and
  every call traces back to the same service principal, losing per-agent audit fidelity.

The **Microsoft Entra Auth SDK sidecar** solves these problems by:

1. Moving all credential handling *outside* of agent code — agent containers never hold secrets.
2. Exposing a **plain HTTP API** that any language can call.
3. Handling all FIC token exchange steps internally, including the multi-stage chains required for
   OBO and user-account impersonation.
4. Integrating with managed identity and workload identity federation so there are no secrets in
   configuration at all in production deployments.

---

### Sidecar architecture

```mermaid
graph LR
    CLIENT["Client Application\n(user token)"]
    AGENT["Agent Container\n(Python / Node.js / Go / Java)"]
    SIDECAR["Entra Auth SDK Sidecar\nmcr.microsoft.com/entra-sdk/auth-sidecar\n:5000 (pod-local only)"]
    ENTRA["Microsoft Entra ID\nlogin.microsoftonline.com"]
    DS1["Downstream API 1\n(e.g., Microsoft Graph)"]
    DS2["Downstream API 2\n(e.g., Custom API)"]

    CLIENT -->|"Bearer token (user)"| AGENT
    AGENT -->|"GET /Validate\nGET /AuthorizationHeader/{name}\nPOST /DownstreamApi/{name}"| SIDECAR
    SIDECAR -->|"client_credentials + FIC chain\nOBO exchange\ntoken validation"| ENTRA
    SIDECAR -->|"Authorization: Bearer …\n(automatic)"| DS1
    SIDECAR -->|"Authorization: Bearer …\n(automatic)"| DS2

    style SIDECAR fill:#0078D4,color:#fff
```

The sidecar runs as a **companion container** in the same pod or Docker Compose service. No host
port is exposed — only services on the pod-local network can reach it. Bind to `127.0.0.1:5000`
or the pod-internal network for maximum isolation. Never expose via `LoadBalancer` or `Ingress`.

#### Division of responsibility

| Agent container does | Sidecar does |
|---|---|
| Decides when to call a downstream API | Acquires and caches the right token |
| Builds the HTTP request payload | Performs client-credentials and OBO exchange |
| Passes the user token for OBO | Validates user assertion; performs FIC chain |
| Implements business logic | Communicates with `login.microsoftonline.com` |
| Calls `/AuthorizationHeader` or `/DownstreamApi` | Returns an `Authorization` header or a full API response |

---

### HTTP API endpoints

The full OpenAPI spec is available at `/openapi/v1.json` (development mode).

| Endpoint | Methods | What it does |
|---|---|---|
| `/Validate` | GET | Validates an inbound bearer token; returns its claims as JSON. Use to authenticate callers before executing business logic. |
| `/AuthorizationHeader/{serviceName}` | GET | Validates the inbound user token (if present) and acquires an `Authorization` header value for the named downstream API. Chooses OBO or app-only based on whether a user token is present. |
| `/AuthorizationHeaderUnauthenticated/{serviceName}` | GET | Same as above but *no inbound user token is expected*. Use for autonomous/agent-identity-only operations where no user is involved. |
| `/DownstreamApi/{serviceName}` | GET, POST, PUT, PATCH, DELETE | Acquires a token *and* performs the HTTP request to the configured downstream API. Returns status code, response headers, and body. |
| `/DownstreamApiUnauthenticated/{serviceName}` | GET, POST, PUT, PATCH, DELETE | Same as above, app-only (no user token). |
| `/healthz` | GET | Liveness/readiness probe. Returns `200 OK` when healthy, `503` when unhealthy. No auth required. |
| `/openapi/v1.json` | GET | OpenAPI 3.0 document. Available in development mode only. |

The `{serviceName}` path segment maps to a named downstream API configured in the sidecar's
`DownstreamApis` settings (e.g., `Graph`, `MyApi`).

---

### Three operating modes

All three modes use `/AuthorizationHeader/{serviceName}` (or `/DownstreamApi/{serviceName}`).
The difference is in the query parameters supplied.

#### Mode 1: Autonomous agent (app-only)

Agent operates on its own behalf using the agent identity's application permissions. Supply
`AgentIdentity` (the agent's client ID):

```http
GET /AuthorizationHeader/Graph?AgentIdentity=11111111-2222-3333-4444-555555555555 HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

Response:

```json
{ "authorizationHeader": "Bearer eyJ0eXAiOiJKV1QiLCJhbGc..." }
```

#### Mode 2: Agent's user account (delegated, no interactive user)

Agent operates as a specific user account (e.g., the agent has its own mailbox). Supply
`AgentIdentity` *and* either `AgentUserId` (object ID) or `AgentUsername` (UPN) — not both:

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id>&AgentUserId=aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...

GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id>&AgentUsername=salesagent@contoso.com HTTP/1.1
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

> Providing both `AgentUserId` and `AgentUsername` returns a `400` validation error.

#### Mode 3: Interactive OBO (agent acting on behalf of a human user)

Agent validates the incoming user token, then requests a downstream header carrying the user's
delegated context. Two-step interaction:

```http
# Step 1: Validate incoming user token and extract claims
GET /Validate HTTP/1.1
Authorization: Bearer <user-token>

# Step 2: Acquire authorization header for downstream API (OBO)
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id> HTTP/1.1
Authorization: Bearer <user-token>
```

The sidecar detects the user token in the `Authorization` header of the `/AuthorizationHeader`
call and performs the OBO exchange internally. The agent code does not implement the OBO protocol.

---

### Configuration reference

The sidecar follows ASP.NET Core conventions. In Kubernetes, set configuration as environment
variables. In Docker Compose, use the `environment:` block.

#### Core identity settings

| Variable | Required | Default | Description |
|---|---|---|---|
| `AzureAd__TenantId` | Yes | — | Microsoft Entra tenant ID |
| `AzureAd__ClientId` | Yes | — | Blueprint (or agent identity) client ID |
| `AzureAd__Instance` | No | `https://login.microsoftonline.com/` | Authority base URL |
| `AzureAd__Audience` | No | `api://{ClientId}` | Expected audience in inbound tokens. For `requestedAccessTokenVersion=2`, use `{ClientId}` directly. |
| `AzureAd__Scopes` | No | — | Required scopes in inbound tokens (space-separated) |

#### Credential source (choose one per environment)

| Environment | `SourceType` value | Notes |
|---|---|---|
| Development / test | `ClientSecret` | Set `AzureAd__ClientCredentials__0__ClientSecret`. *Never use in production.* |
| AKS with Workload Identity | `SignedAssertionFilePath` | Webhook projects federated token automatically. Recommended for AKS. |
| Azure VMs / App Service | `SignedAssertionFromManagedIdentity` | Set `ManagedIdentityClientId` to the UAMI client ID. *Do not use for containers.* |
| Azure Key Vault certificate | `KeyVault` | Set `KeyVaultUrl` and `KeyVaultCertificateName`. Recommended for non-AKS production. |

Multiple credentials can be configured (indexed `__0__`, `__1__`, …) — the sidecar tries them in
numeric order and uses the first that succeeds.

#### Downstream API settings

```yaml
env:
- name: DownstreamApis__Graph__BaseUrl
  value: "https://graph.microsoft.com/v1.0"
- name: DownstreamApis__Graph__Scopes
  value: "User.Read Mail.Read"
- name: DownstreamApis__MyApi__BaseUrl
  value: "https://api.contoso.com"
- name: DownstreamApis__MyApi__Scopes
  value: "api://myapi/.default"
```

The `<Name>` segment (e.g., `Graph`, `MyApi`) becomes the `{serviceName}` path parameter in all
endpoint calls. Agent code does not change when credential sources are swapped — only configuration
changes.

---

### When to use sidecar vs. Microsoft.Identity.Web

| Factor | Microsoft Entra Auth SDK (sidecar) | Microsoft.Identity.Web (.NET library) |
|---|---|---|
| Agent language | Any (Python, Node.js, Go, Java, …) | .NET only |
| Credential isolation | Credentials stay in sidecar container, never in agent code | Credentials configured in agent application |
| Configuration changes | No code change required; swap env vars | Requires code/config changes in agent project |
| Deployment model | Kubernetes / Docker Compose / multi-container | In-process; suited for single-container or App Service |
| Token caching | Handled by sidecar (MSAL in-process) | Handled by MSAL in-process |
| FIC chain complexity | Fully abstracted | Must implement manually or via extension packages |
| Operational overhead | Additional container per agent | No extra containers |
| Best for | Polyglot microservices, greenfield agents, non-.NET runtimes | Existing .NET services adopting agent identity |
