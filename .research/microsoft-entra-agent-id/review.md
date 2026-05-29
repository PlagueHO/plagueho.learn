---
reviewed_at: 2026-05-29
status: pass
sections_reviewed: 12
---

# Quality Review: Microsoft Entra Agent ID

## Summary

All 12 output sections were reviewed against the source notes (`concepts-core.md`,
`foundry-notes.md`, `auth-flows-notes.md`, `third-party-mcp-notes.md`) and the
13 checklist requirements.

**Overall assessment: PASS.** The guide is thorough, technically accurate, and
covers every required topic. Token flows match the source protocols exactly.
Mermaid diagrams are present in all key sections. The main systematic weakness
is the absence of explicit cross-references between sections — each section is
written as a standalone document, so readers have no navigational guidance from
one to another. One minor factual concern (OIDC listed as a supported protocol
without a source) is flagged below.

---

## Coverage Check

| Requirement | Covered In | Status |
|---|---|---|
| What Entra Agent ID is (the product) | 01 | ✅ |
| Agent identity types: user OBO, app autonomous, user-account impersonation | 02, 06 | ✅ |
| All the ways Agent ID can be used | 01, 09 | ✅ |
| Agent Identity SDK | 03 | ✅ |
| Sidecar authentication pattern | 03, 07 | ✅ |
| Agent Identity Blueprint (concept + creation) | 08 | ✅ |
| Foundry: prompt-based AND hosted agents + Entra identity | 04 | ✅ |
| Agent Framework: model-only AND Foundry-backed + Entra identity | 05 | ✅ |
| OAuth flow details for all three modes | 06 | ✅ |
| Scenario: Foundry prompt-based agent → 3rd party MCP + non-Entra IDP | 07, 09 (S6) | ✅ |
| Real-world scenarios with diagrams | 09 | ✅ |
| Security best practices | 10 | ✅ |
| Getting started guidance | 11 | ✅ |

---

## Section-by-Section Findings

### 01 - What is Microsoft Entra Agent ID?

**Rating:** pass
**Strengths:** Accurate four-pillar structure (Identity management, Access protection,
Governance, Compliance). Licensing table matches source exactly. The "why not service
principals / why not user accounts" framing is correct and well-argued. The strategic
framing for architects is useful.
**Issues:**
- Lists `"OpenID Connect (OIDC)"` as a supported protocol alongside OAuth 2.0, MCP, and A2A.
  Source notes list only OAuth 2.0, MCP, and A2A — OIDC is not explicitly called out. See
  Factual Concerns below.
- No cross-references to sections 02, 08, or 11.

---

### 02 - The Agent Identity Model

**Rating:** pass
**Strengths:** All three operating modes described accurately. Mermaid object model diagram
correctly shows UAMI → Blueprint → Blueprint Principal → Agent Identity → User Account chain.
FIC chain ASCII diagram is accurate and matches auth-flows source. Comparison table
(agent identity vs. app registration vs. managed identity) is complete and adds real value.
Key concepts (sponsor, inheritable permissions, ephemeral identities, single-tenant
constraint) are all present.
**Issues:**
- No cross-references to section 06 (for protocol details) or section 08 (for blueprint
  creation).

---

### 03 - Agent Identity SDK & Sidecar Pattern

**Rating:** pass
**Strengths:** Comprehensive. All seven HTTP endpoints documented correctly (`/Validate`,
`/AuthorizationHeader/{name}`, `/AuthorizationHeaderUnauthenticated/{name}`,
`/DownstreamApi/{name}`, `/DownstreamApiUnauthenticated/{name}`, `/healthz`,
`/openapi/v1.json`). All three operating modes (autonomous, user-account, OBO) covered with
example HTTP requests. Configuration reference (credential source types for each environment)
is accurate. Sidecar vs. Microsoft.Identity.Web comparison table is helpful.
**Issues:**
- No cross-references to section 06 (auth patterns) or section 07 (third-party scenarios).
- The note "Never expose via `LoadBalancer` or `Ingress`" is important security guidance —
  consider elevating it to a callout or warning block for visibility.

---

### 04 - Foundry Agent Service Integration

**Rating:** pass
**Strengths:** All three agent types (Prompt, Workflow, Hosted) described with a clear
comparison table that matches the foundry-notes source. 4-step runtime token flow sequence
diagram is accurate and maps correctly to the source's description. Five MCP tool
authentication methods listed with selection guidance. A2A authentication options covered.
RBAC assignment guidance is correct (use `agentIdentityId`, not managed identity). Important
`azd` caveat (RBAC for shared identity does not carry over to distinct identity) is present.
Audience value table matches source exactly.
**Issues:**
- Section calls the flow "4-step" but the Mermaid shows Steps 1-4 as: (1) blueprint→T1,
  (2) T1→TR, (3) tool call, (4) token validation. The foundry-notes source describes Steps
  1-3 as the three protocol steps and Step 4 as the tool call. The numbering is internally
  consistent within the section but differs from the source numbering — minor risk of
  confusion for readers cross-referencing the official docs.
- No cross-references to sections 06 or 08.

---

### 05 - Agent Framework Integration

**Rating:** pass
**Strengths:** Both `ChatClientAgent` and `FoundryAgent` covered with accurate identity
model distinction. C# code examples for both agent types are correct (including the
`GetAgentAsync("MyAgent")` pattern for Foundry-backed agents). Identity lifecycle
(shared → distinct on publish, RBAC re-assignment requirement) is accurately described.
A2A hosting via `MapA2A(...)` mentioned.
**Issues:**
- No Mermaid diagram. A simple diagram showing the two agent types and their identity
  paths (calling-app identity vs. Foundry-provisioned agent identity) would significantly
  improve clarity.
- No cross-reference to section 04 for token flow details, which this section explicitly
  defers to ("see Section 04").

---

### 06 - Authentication Patterns & OAuth Flows

**Rating:** pass
**Strengths:** All three flows complete. HTTP protocol sequences match source notes
exactly — `fmi_path=AgentIdentity`, `grant_type=client_credentials` for Flow 1,
`grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer` with `requested_token_use=on_behalf_of`
for Flow 2, and `grant_type=user_fic` with `user_federated_identity_credential={T2}` for Flow 3.
Mermaid sequence diagrams present for all three flows. Token types reference table is
excellent. Supported/unsupported grant types table is comprehensive and accurate.
Background refresh token pattern for OBO covered. `InheritDelegatedPermissions` and the
"same `client_id=AgentIdentity`" constraint for Flow 3 both present.
**Issues:**
- Minor style inconsistency in SDK recommendation code block: `<agent-id-client-ID>` vs
  `<agent-id-client-id>` (mixed casing in parameter placeholders). Cosmetic.

---

### 07 - Third-Party MCP & Non-Entra IDP Scenarios

**Rating:** pass
**Strengths:** Both directions covered clearly (Foundry → non-Entra MCP; non-Foundry
agent → Entra-protected API). OAuth consent flow Mermaid sequence diagram correctly shows
the `*.consent.azure-apihub.net` consent hub as intermediary. Configuration fields for
custom OAuth match source exactly (Client ID, Client Secret, Auth URL, Token URL, Refresh URL,
Scopes). Critical redirect URL post-setup step present. Key constraints table (cross-tenant
limitation, `offline_access` requirement, declined consent handling) is accurate.
Three-container topology for the sidecar pattern is clearly described.
**Issues:**
- Pattern B (sidecar for non-Microsoft agents) describes the sidecar endpoint as
  `GET /AuthorizationHeader?AgentIdentity={agentId}` without the `/{serviceName}` path
  segment that the full API spec requires. Correct form is
  `GET /AuthorizationHeader/{serviceName}?AgentIdentity={agentId}`. Minor but technically
  incorrect.

---

### 08 - Agent Identity Blueprint

**Rating:** pass
**Strengths:** Complete blueprint object model with all key properties. Blueprint principal
distinction (separate object, NOT auto-created) is clearly explained with the exact Graph API
POST call required. The `requiredResourceAccess` vs. inheritable permissions distinction
is handled well with the analogy pair. Single-tenant vs. multi-tenant table is accurate.
Step-by-step creation covers both admin center wizard and Graph API programmatic approach.
`OData-Version: 4.0` header requirement highlighted (critical gotcha — missing it silently
creates a standard app registration). Roles table (Agent ID Developer, Agent ID Administrator,
Privileged Role Administrator) is correct.
**Issues:**
- No cross-references to sections 04 or 06 for how the blueprint is used at runtime.
- The "wizard sets name, owners, and sponsors only" limitation callout is important for
  practitioners — currently in a blockquote but could be more prominently positioned.

---

### 09 - Real-World Scenarios & Architecture Diagrams

**Rating:** pass
**Strengths:** All seven scenarios covered with appropriate Mermaid diagrams. Scenarios
represent a good breadth of patterns: singleton autonomous (S1), domain worker (S2),
ephemeral identities (S3), OBO per-user (S4), digital worker with user account (S5),
GitHub MCP OAuth passthrough (S6), and AWS Bedrock sidecar (S7). S6 is particularly
strong — it exactly matches the key required scenario (Foundry prompt-based agent +
3rd party non-Entra MCP). The GitHub OAuth configuration reference table and the
`*.consent.azure-apihub.net` sequence diagram are accurate and consistent with section 07.
**Issues:**
- S3 (ephemeral identities) correctly notes the latency trade-off — good.
- Scenario-to-section cross-references are present in prose ("see Section 06") but are
  not hyperlinked, making navigation in rendered markdown impossible.

---

### 10 - Security Best Practices

**Rating:** pass
**Strengths:** Threat model table by agent type is accurate and covers prompt injection,
permission escalation, and A2A cascade risks. Zero Trust three-pillar structure is correctly
mapped. CA policy shapes table (OBO vs. application-only vs. agent's user account) with
supported controls is accurate and matches source. Identity Protection risk detection types
match source (all six types present). `agentType` filter values match source exactly.
Log routing by access pattern (service principal logs vs. non-interactive user logs) is
correct. Identity Governance (sponsor requirement, access packages with expiry) is covered.
Credential preference order is correct (FIC > certs > secrets). Security checklist is
comprehensive.
**Issues:**
- GSA section correctly notes it "currently" covers Copilot Studio agents only. Readers
  should be cautioned this scope may expand — a brief note ("scope is limited as of
  2026-05-29") would add temporal clarity.

---

### 11 - Getting Started

**Rating:** pass
**Strengths:** Prerequisites, licensing, and roles are accurate. Three starting paths
(Foundry, Agent Framework, Sidecar) are clearly separated. The quick-start walkthrough
steps are correct and include the post-publish RBAC re-assignment reminder. The common
errors table is excellent — it captures the three most dangerous operational pitfalls:
missing `OData-Version: 4.0`, blueprint principal not auto-created, and RBAC roles not
carrying over on publish.
**Issues:**
- Getting Started links to internal anchors (e.g., `#foundry-agent-service`) but does
  not reference section numbers explicitly — readers coming directly to this section via
  a link won't know where to go for deeper protocol detail.

---

### 12 - Resources & Further Reading

**Rating:** pass
**Strengths:** Comprehensive and well-organized into five categories (Entra Agent ID docs,
Foundry docs, Agent Framework docs, OAuth flow references, Security & Governance). All
URLs follow the `learn.microsoft.com` patterns found in source note frontmatter. The
sidecar container image `mcr.microsoft.com/entra-sdk/auth-sidecar` is correctly listed.
All research-note sources are represented.
**Issues:**
- No link to the Agent Framework Python docs (section 05 covers .NET only; Python
  equivalent exists at the same base URL with `?pivots=programming-language-python`).
  Low priority but worth adding for completeness.

---

## Cross-Reference Gaps

The following section pairs should link to each other but currently do not:

| From | To | Missing link reason |
|---|---|---|
| 01 (overview) | 02 (identity model) | "For identity types, see Section 02" |
| 01 (overview) | 08 (blueprint) | "For how blueprints work, see Section 08" |
| 02 (identity model) | 06 (auth patterns) | "For protocol sequences, see Section 06" |
| 02 (identity model) | 08 (blueprint) | "For blueprint creation, see Section 08" |
| 03 (sidecar) | 06 (auth patterns) | "For underlying flow details, see Section 06" |
| 03 (sidecar) | 07 (third-party) | "For non-Microsoft agent scenarios, see Section 07" |
| 04 (Foundry) | 06 (auth patterns) | "For token flow protocol details, see Section 06" |
| 04 (Foundry) | 08 (blueprint) | "For blueprint management, see Section 08" |
| 05 (Agent Framework) | 04 (Foundry) | "For the token exchange sequence, see Section 04" |
| 08 (blueprint) | 04 (Foundry) | "For Foundry's automatic provisioning, see Section 04" |
| 09 (scenarios) | 06, 07, 08 | Scenario prose references "Section 06" but does not hyperlink |

**Recommended fix:** Add a "Related sections:" line at the end of each section's frontmatter
or as a footer callout. All prose references like "see Section 06" should become
`[Section 06](06-authentication-patterns.md)`.

---

## Missing Topics

1. **Python code examples in section 05**: Agent Framework section covers only C# (.NET).
   A Python equivalent using `azure-ai-projects` would improve the guide's completeness
   given Python is the more common AI agent language. (Low priority — the .NET coverage
   is complete and the Python path is similar.)

2. **Workflow agent type detail in section 04**: Foundry's Workflow agent type is mentioned
   in the comparison table with "YAML optional" but receives no further treatment. The source
   notes include brief coverage of visual authoring and human-in-the-loop steps. A short
   paragraph would close this gap. (Low priority — prompt and hosted agents are the identity-
   critical types.)

3. **AI-guided setup in section 11**: The resources section (12) references
   `ai-guided-setup` (wizard-driven provisioning) but section 11 Getting Started does not
   mention it as an alternative entry point. Practitioners who want a guided wizard flow
   have no pointer. (Low priority — the manual steps are fully documented.)

---

## Factual Concerns

### FC-1: OIDC listed as a supported protocol (Section 01) — MINOR

**Location:** Section 01, "Supported protocols include OAuth 2.0, OpenID Connect (OIDC),
Model Context Protocol (MCP), and Agent-to-Agent (A2A)."

**Issue:** The source note (`concepts-core.md`) lists the supported protocols as:
"OAuth 2.0, Model Context Protocol (MCP), and Agent-to-Agent (A2A)." OIDC is not
explicitly listed in the source. While OIDC is implied by OAuth 2.0 (it adds an
identity layer on top), listing it by name without a source citation introduces an
unverifiable claim.

**Recommended fix:** Either remove OIDC or add a source citation from the official
"What is Microsoft Entra Agent ID?" documentation page confirming its inclusion.

### FC-2: Sidecar endpoint path in Section 07 — MINOR

**Location:** Section 07, Pattern B description: "calls the sidecar's HTTP endpoint
to get a ready-to-use `Authorization` header: `GET /AuthorizationHeader?AgentIdentity={agentId}`"

**Issue:** The correct endpoint form per section 03 (and source docs) is
`GET /AuthorizationHeader/{serviceName}?AgentIdentity={agentId}` — the `{serviceName}`
path segment is required, not optional. Omitting it would result in a 404 in practice.

**Recommended fix:** Update the endpoint example in section 07 to include `{serviceName}`.

---

## Verdict

**PASS — ready to complete.**

The guide is accurate, comprehensive, and production-quality. All 13 checklist items are
covered. OAuth protocol sequences are exact and verified against source notes. Mermaid
diagrams are present in all critical sections (02, 03, 04, 06 ×3, 07, 08, 09 ×7).

**Two items to fix before publication:**

1. **FC-2 (actionable now):** Fix the sidecar endpoint path in Section 07 Pattern B to
   include `/{serviceName}`.
2. **FC-1 (low risk):** Either source the OIDC protocol claim in Section 01 or remove it.

**One improvement strongly recommended (not blocking):**

3. **Cross-references:** Add `[Section XX](XX-filename.md)` hyperlinks wherever prose
   references another section. This is the most impactful quality-of-life improvement
   for the guide as a navigable document.
