---
area: auth-flows
sources:
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-oauth-protocols
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-autonomous-app-oauth-flow
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-on-behalf-of-oauth-flow
  - https://learn.microsoft.com/en-us/entra/agent-id/agent-user-oauth-flow
  - https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities
extracted_at: 2026-05-29
---

# Authentication Flows: Microsoft Entra Agent ID

## Authentication Protocol Overview

All agent auth flows are based on OAuth 2.0 with specialized token exchange
patterns enabled by Federated Identity Credentials (FIC). Key architectural
constraints:

- All agent entities are **confidential clients** — no public client flows.
- All authentication occurs **programmatically** — no interactive/redirect flows.
- All auth flows involve multi-stage token exchanges where the **agent identity
  blueprint impersonates the agent identity** to perform operations.
- Agents can also serve as **API resource applications** (support
  `OAuth2Permissions`, `AppURI`) for OBO scenarios where they are the upstream API.
- All agent identities are **single-tenant** regardless of the parent blueprint's
  tenancy model.
- Agent identity blueprints can only impersonate their own child agent identities.
- Only one blueprint can own/impersonate a given agent identity (no shared
  ownership).

### Three primary agent operating modes

| Mode | Identity type | Description |
|------|--------------|-------------|
| Autonomous | Service principal (agent identity) | Agent acts on its own behalf using app-only access |
| Interactive / OBO | Service principal (agent identity) | Agent acts on behalf of a signed-in user via OBO delegation |
| User-account impersonation | User principal (agent's user account) | Agent acts using a dedicated user account (e.g., to have a mailbox) |

### SDK Recommendation

Microsoft recommends using approved SDKs (`Microsoft.Identity.Web`, Microsoft
Agent ID SDK) rather than implementing these protocol steps manually. The
**Microsoft Entra SDK for Agent ID** is a containerized sidecar service that
abstracts all token acquisition and validation complexity.

---

## Flow 1: Autonomous App-Only (Client Credentials)

**Use when**: Agent must operate without any user context — fully autonomous
background tasks, scheduled jobs, proactive notifications.

**Principals involved**: Agent identity blueprint (actor/delegator) → Agent
identity (actor/subject → resource token recipient)

**Grant types used**: `client_credentials` (both steps)

**Validation rule**: `T1.aud == Agent identity blueprint client ID`

### Exact protocol sequence

**Step 1 — Blueprint acquires FIC exchange token T1 by presenting managed
identity credential:**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentBlueprint
&scope=api://AzureADTokenExchange/.default
&fmi_path=AgentIdentity
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=TUAMI
&grant_type=client_credentials
```

- `TUAMI` = managed identity token for the User Assigned Managed Identity (UAMI)
  used as the FIC credential.
- `fmi_path=AgentIdentity` identifies which child agent identity the blueprint is
  impersonating.
- `scope=api://AzureADTokenExchange/.default` is the fixed scope for FIC exchange
  tokens.
- Returns **T1** (FIC exchange token).

**Step 2 — Agent identity exchanges T1 for an app-only resource access token:**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentIdentity
&scope=https://resource.example.com/.default
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={T1}
&grant_type=client_credentials
```

- `client_assertion={T1}` — the FIC exchange token from step 1 is the agent
  identity's credential.
- `scope` — the actual downstream resource scope (.default for app-only).
- Microsoft Entra ID validates `T1.aud == Agent identity blueprint client ID`.
- Returns **TR** (app-only resource access token for the downstream API).

### Key constraints

- Tenant admins must pre-consent all application permissions.
- Agent identity uses app-only access and should have minimum necessary permissions.
- Agent identity blueprint can impersonate many agent identities; each agent
  identity is owned by exactly one blueprint.

---

## Flow 2: On-Behalf-Of (OBO) — User Delegated

**Use when**: Agent is acting as an API/middleware on behalf of a signed-in user;
combines standard OBO delegation with agent FIC impersonation.

**Principals involved**: User → Client app → Agent identity blueprint (delegator)
→ Agent identity (delegated actor) → Resource

**Grant types used**: `client_credentials` (step 3), `urn:ietf:params:oauth:grant-type:jwt-bearer` (step 4 OBO exchange)

**Validation rules**:
- `T1.aud == Agent identity blueprint client ID` (T1 audience check)
- `Tc.aud == Agent identity blueprint client ID` (user token audience check)

### Exact protocol sequence

**Step 1 — User authenticates with the client application:**

The user signs in and the calling client application obtains a user access token
**Tc** scoped to the agent identity blueprint (the `aud` of Tc must be the agent
identity blueprint's client ID).

**Step 2 — Client sends Tc to the agent to act on behalf of the user:**

The calling application forwards `Tc` to the agent identity blueprint as the
assertion for the OBO request.

**Step 3 — Blueprint acquires FIC exchange token T1 using managed identity:**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentBlueprint
&scope=api://AzureADTokenExchange/.default
&fmi_path=AgentIdentity
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=TUAMI
&grant_type=client_credentials
```

- `TUAMI` = managed identity token for the UAMI used as FIC.
- Returns **T1** (FIC exchange token scoped to agent identity blueprint).

**Step 4 — Agent identity performs OBO exchange presenting both T1 and Tc:**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentIdentity
&scope=https://resource.example.com/scope1
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={T1}
&grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
&assertion={Tc(aud=AgentIdentity Blueprint, oid=User)}
&requested_token_use=on_behalf_of
```

- `client_assertion={T1}` — agent identity proves its identity via the FIC exchange
  token (T1 acts as the agent identity's client credential in this step).
- `assertion={Tc}` — the original user token forwarded as the OBO assertion.
- `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer` — standard OBO grant
  type.
- `requested_token_use=on_behalf_of` — signals OBO semantics.
- Returns **TR** (delegated resource access token carrying user context).

**Step 5 — Entra ID validates and issues token:**

Microsoft Entra ID validates:
- `T1.aud == Agent identity parent app == Agent identity blueprint client ID`
- `Tc.aud == Agent identity blueprint client ID`

### Refresh token support (for async/background continuation)

After acquiring an initial OBO token, refresh tokens can be used to maintain
user context for asynchronous/background operations without requiring the user
to re-authenticate:

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentIdentity
&scope=https://resource.example.com/scope1
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={T1}
&grant_type=refresh_token
&refresh_token={AgentIdentityRefreshToken}
```

### Permission inheritance (`InheritDelegatedPermissions`)

Agent identities can inherit delegated permissions from their parent agent
identity blueprint when the `InheritDelegatedPermissions` property is enabled.
This reduces consent complexity for multi-instance scenarios (multiple agent
identity instances sharing a blueprint). Constraints:

- Inheritance applies **only** when FIC impersonation is used.
- Inheritance works **only within tenant boundaries**.
- Reduces need for per-agent-identity consent flows.

### OBO-specific constraints

- Agents are **not supported** for OBO via the `/authorize` endpoint — all
  authentication is programmatic.
- User must consent to delegated permissions on the agent identity.
- Redirect URIs are not supported.

---

## Flow 3: User Account Impersonation

**Use when**: Agent needs to act as a specific user principal (e.g., has its own
mailbox, calendar, Teams presence). The agent's user account is a dedicated user
principal in Entra ID created specifically for the agent — not a human user.

**Principals involved**: Agent identity blueprint (actor 1) → Agent identity
(actor 2) → Agent's user account (subject)

**Grant types used**: `client_credentials` (steps 1 & 2), `user_fic` (step 3)

**Key constraint**: The same client ID must be used across both phase transitions
to prevent privilege escalation.

**Validation rules**:
- Step 2: `T1.aud == Agent identity blueprint client ID` (validates blueprint
  delegation)
- Step 3: `T2.aud == Agent identity` (validates agent identity delegation to user
  account)

### Exact protocol sequence (three-stage FIC chain)

**Step 1 — Blueprint acquires FIC exchange token T1 (blueprint → agent identity):**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentBlueprint
&scope=api://AzureADTokenExchange/.default
&fmi_path=AgentIdentity
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion=TUAMI
&grant_type=client_credentials
```

- `TUAMI` = managed identity token for UAMI.
- Returns **T1** (blueprint → agent identity FIC exchange token).

**Step 2 — Agent identity acquires FIC exchange token T2 (agent identity → user account):**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentIdentity
&scope=api://AzureADTokenExchange/.default
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={T1}
&grant_type=client_credentials
```

- `client_assertion={T1}` — agent identity uses T1 as its credential.
- Microsoft Entra ID validates `T1.aud == Agent identity blueprint client ID`.
- Returns **T2** (agent identity → user account FIC exchange token).
- `T2.aud == agent identity`.

**Step 3 — Agent identity acquires resource token impersonating the user account:**

```http
POST /oauth2/v2.0/token
Content-Type: application/x-www-form-urlencoded

client_id=AgentIdentity
&scope=https://resource.example.com/scope1
&client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer
&client_assertion={T1}
&user_federated_identity_credential={T2}
&username=agentuser@contoso.com
&grant_type=user_fic
&requested_token_use=on_behalf_of
```

- `client_assertion={T1}` — agent identity still proves itself via T1.
- `user_federated_identity_credential={T2}` — the second FIC token proving
  delegation to the user account.
- `username=agentuser@contoso.com` — the UPN of the agent's user account.
- `grant_type=user_fic` — the agent-specific grant type for user account FIC.
- `requested_token_use=on_behalf_of` — signals OBO semantics for user context.

**Step 4 — Entra ID issues resource token:**

Microsoft Entra ID validates the full FIC chain and issues a resource access
token with the user account's context.

### User account ownership constraints

- An agent's user account can be impersonated by **only a single agent identity**.
- The agent identity is owned by a single blueprint.
- This creates a strict 1:1:1 chain: one blueprint → one agent identity → one
  user account (though a blueprint may own many agent identities, each with their
  own user account).

---

## FIC (Federated Identity Credential) Chain

### What FIC is

A **Federated Identity Credential (FIC)** is a trust relationship configured on
an application or user account that allows an external identity token to act as
the credential. In the agent model, FIC enables a parent entity (blueprint) to
impersonate a child entity (agent identity) without requiring a shared secret.

### How the chain works

The FIC chain establishes a cryptographically verifiable delegation pathway:

```
Managed Identity (UAMI)
    ↓  TUAMI token (UAMI's access token)
Agent Identity Blueprint
    ↓  T1 = FIC exchange token (aud = blueprint client ID)
Agent Identity
    ↓  TR = resource access token (app-only) OR
    ↓  T2 = second FIC exchange token (aud = agent identity) [user-account flow]
Agent's User Account (user principal)
    ↓  TR = resource access token (user context)
```

### The `api://AzureADTokenExchange/.default` scope

All intermediate FIC exchange steps use the fixed scope
`api://AzureADTokenExchange/.default`. This is the well-known scope for
token exchange/FIC operations in Microsoft Entra ID — it signals that the
resulting token (T1, T2) is a non-resource exchange credential, not a resource
access token.

### Blueprint → agent identity FIC (used in all three flows)

In all three flows, the first step is identical: the blueprint presents a UAMI
token (`TUAMI`) as `client_assertion` with `grant_type=client_credentials` to
obtain T1. The `fmi_path=AgentIdentity` parameter on the blueprint's token
request identifies which child agent identity is being impersonated.

### Agent identity → user account FIC (user-account flow only)

In the user-account flow, a second FIC token exchange (T2) is required. The
agent identity presents T1 as its credential to obtain T2 scoped to the user
account. T2 is then presented as `user_federated_identity_credential` in the
final `user_fic` grant.

---

## Token Types

| Token | Symbol | Description | Scope / Audience |
|-------|--------|-------------|-----------------|
| UAMI token | TUAMI | Managed identity access token from Azure IMDS | `api://AzureADTokenExchange/.default` |
| FIC exchange token (level 1) | T1 | Blueprint-level impersonation credential; proves blueprint is acting as agent identity | `aud = agent identity blueprint client ID` |
| FIC exchange token (level 2) | T2 | Agent identity-level impersonation credential; proves agent identity is acting as user account | `aud = agent identity` |
| User access token | Tc | Token issued to the calling client app for the signed-in user | `aud = agent identity blueprint client ID` |
| App-only resource token | TR | Final access token for the downstream API; carries agent identity context | `aud = downstream resource` |
| Delegated resource token | TR | Final access token for the downstream API; carries user context via OBO | `aud = downstream resource` |
| Agent identity refresh token | AgentIdentityRefreshToken | Enables background operations with preserved user context | n/a |

---

## Managed Identity as Credential Source

Managed identities are the **preferred and recommended** credential type for
agent identity blueprints. Client secrets should **not** be used in production
environments due to security risks.

### How managed identity plugs into the FIC chain

1. A **User Assigned Managed Identity (UAMI)** is configured as a Federated
   Identity Credential on the agent identity blueprint.
2. The agent's compute (VM, container, App Service, ACA) is assigned the UAMI.
3. The agent acquires `TUAMI` from the Azure Instance Metadata Service (IMDS):
   ```
   GET http://169.254.169.254/metadata/identity/oauth2/token
       ?api-version=2018-02-01
       &resource=api://AzureADTokenExchange
   Metadata: true
   ```
4. `TUAMI` is submitted as `client_assertion` in the blueprint's token request
   (step 1 of all flows).
5. All subsequent steps use the derived FIC tokens (T1, T2) rather than the UAMI
   directly.

### Benefits

- **Automatic credential rotation** — Azure manages UAMI keys.
- **No secret storage** — no secrets in app configuration or environment variables.
- **Secure by default** — uses MSI infrastructure security.

### Alternative credentials (not recommended for production)

- Client certificates (acceptable, but require certificate management).
- Client secrets (explicitly discouraged; security risk).

---

## Grant Types Reference

### Supported grant types

| Entity | Grant type | Use case |
|--------|-----------|----------|
| Agent identity blueprint | `client_credentials` | Acquire FIC exchange token T1 via UAMI/cert/secret credential |
| Agent identity blueprint | `jwt-bearer` | OBO token exchange using incoming user token |
| Agent identity blueprint | `refresh_token` | Background user-delegated operations |
| Agent identity | `client_credentials` | App-only autonomous token acquisition (Flow 1); also FIC exchange for T2 in user-account flow (Flow 3) |
| Agent identity | `urn:ietf:params:oauth:grant-type:jwt-bearer` | OBO token exchange carrying user context (Flow 2) |
| Agent identity | `refresh_token` | Async/background continuation with user context (Flow 2 continuation) |
| Agent identity | `user_fic` | User account impersonation — agent-specific grant type (Flow 3) |

### Unsupported flows and grant types

| Flow / grant type | Why not supported |
|-------------------|------------------|
| Authorization code flow (`/authorize`) | Interactive flows not supported; all auth is programmatic |
| Device code flow | Public client; not supported |
| ROPC (Resource Owner Password Credentials) | Public client; not supported |
| Implicit flow | No redirect URIs supported |
| Any public client flow | All agents must operate as confidential clients |
| Redirect URIs | Not supported for any agent entity type |
| OBO via `/authorize` endpoint | Agents don't support OBO through the auth endpoint |

---

## SDK Token Acquisition

The **Microsoft Entra SDK for Agent ID** is a containerized sidecar web service
that abstracts all token acquisition, validation, and downstream API call
orchestration. Applications communicate with it via HTTP — no language-specific
SDK dependency required.

### Deployment

Deploy the SDK as a containerized service alongside the agent application.
Configure it with:
1. Agent identity client ID
2. Agent identity blueprint client ID
3. Client credential (UAMI/managed identity, certificate, or secret — managed
   identity preferred)
4. Downstream API definitions (name → scope/endpoint mapping)

### API Endpoints

#### `/AuthorizationHeader/{serviceName}` — Get auth header for downstream API

`serviceName` maps to a downstream API configured in the SDK settings.

**Autonomous agent (app-only, Flow 1):**

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-ID>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Autonomous agent's user account (Flow 3):**

Provide `AgentUserId` (object ID) OR `AgentUsername` (UPN) — not both:

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUserId=<agent-user-object-id>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

```http
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-id-client-id>&AgentUsername=<agent-user-principal-name>
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

> Providing both `AgentUserId` and `AgentUsername` is a **validation error**.
> `AgentIdentity` is required; omitting it is also a validation error.

**Interactive agent / OBO (Flow 2):**

Two-step interaction — validate the incoming user token first, then exchange:

```http
# Step 1: Validate incoming user token
GET /Validate
Authorization: Bearer <user-token>

# Step 2: Get authorization header on behalf of the user
GET /AuthorizationHeader/Graph?AgentIdentity=<agent-client-id>
Authorization: Bearer <user-token>
```

#### `/Validate` — Validate an incoming token

Used by agent web APIs to validate tokens received from callers. Returns token
claims that can be used for further authorization decisions. The downstream API
being called by the agent should also validate the token it receives via this
endpoint.

### SDK architecture summary

```
Agent Application
    ↕ HTTP (standard requests)
Microsoft Entra SDK for Agent ID (containerized sidecar)
    ↕ OIDC / OAuth 2.0
Microsoft Entra ID (token endpoint)
    ↕ Access tokens
Downstream APIs (Graph, custom APIs, etc.)
```

---

## Source Citations

1. **Authentication protocols in agents** — overview of all flows, supported/unsupported grant types, operating modes, managed identity integration.
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-oauth-protocols>
   Last updated: 2026-04-09

2. **Agent autonomous app OAuth flow** — app-only/client credentials flow, blueprint impersonation, FIC exchange steps with exact HTTP requests.
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-autonomous-app-oauth-flow>
   Last updated: 2026-04-09

3. **Agent OAuth flows: On behalf of flow** — OBO flow with user delegation, FIC + OBO combined protocol, refresh token support, `InheritDelegatedPermissions`.
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-on-behalf-of-oauth-flow>
   Last updated: 2026-04-09

4. **Agent's user account impersonation protocol** — three-stage FIC chain, `user_fic` grant type, blueprint → agent identity → user account delegation.
   <https://learn.microsoft.com/en-us/entra/agent-id/agent-user-oauth-flow>
   Last updated: 2026-04-09

5. **Acquire tokens and call downstream APIs with Microsoft Entra SDK for Agent ID** — SDK sidecar architecture, HTTP API endpoints, all three flow patterns via SDK.
   <https://learn.microsoft.com/en-us/entra/agent-id/microsoft-entra-sdk-for-agent-identities>
   Last updated: 2026-04-09
