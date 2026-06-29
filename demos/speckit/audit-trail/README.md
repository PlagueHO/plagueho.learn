# Immutable Audit Trail — SpecKit SDD Demo

A complete, copy-paste-ready walkthrough for demonstrating **Spec-Driven Development (SDD)** using [SpecKit](https://github.github.io/spec-kit/) in GitHub Copilot. The scenario builds a compliance-grade, immutable audit trail service for **Lawvu** — a legal SaaS company operating on Microsoft Azure.

> **Audience:** ISV partners, engineering leads, architects, and compliance stakeholders who want to see how SDD eliminates vibe-coding and produces auditable, traceable code from day one.

---

## Scenario

Lawvu's legal platform serves law firms and enterprise legal teams. Every user action — viewing a contract, signing a document, revoking access — must be permanently recorded and tamper-proof for GDPR, SOC 2 Type II, and ISO 27001 compliance.

This demo builds a production-ready **Immutable Audit Trail Service** using the full SpecKit workflow:

- **/speckit.constitution** — encode Lawvu's engineering and compliance principles
- **/speckit.specify** — describe *what* to build and *why* (no tech stack yet)
- **/speckit.clarify** — resolve ambiguities before a line of code is written
- **/speckit.plan** — define the tech stack and architecture
- **/speckit.checklist** — validate the spec and plan for completeness
- **/speckit.tasks** — break the plan into traceable, actionable tasks
- **/speckit.analyze** — cross-artifact consistency check before implementation
- **/speckit.implement** — generate the code, guided by the spec
- **/speckit.converge** — verify all planned work is complete

**Total demo time:** ~25 minutes with live implementation. See the [Quick Path](#quick-demo-path-10-minutes) for a 10-minute version.

---

## Prerequisites

Ensure these tools are installed before the demo:

| Tool | Version | Install |
|------|---------|---------|
| [uv](https://docs.astral.sh/uv/) | Latest | `winget install astral-sh.uv` |
| Python | 3.11+ | `winget install Python.Python.3.11` |
| .NET SDK | 10.0+ | `winget install Microsoft.DotNet.SDK.10` |
| Git | Latest | `winget install Git.Git` |
| VS Code Insiders | Latest | `winget install Microsoft.VisualStudioCode.Insiders` |
| GitHub Copilot extension | Latest | Installed in VS Code Insiders |

Verify SpecKit can reach GitHub (required for initial install). Enterprise/air-gapped environments should follow the [offline installation guide](https://github.github.io/spec-kit/install/air-gapped.html).

---

## Setup

Run these commands in a PowerShell terminal.

### Step 1 — Create the project directory

```powershell
# Create a clean working directory for the demo
New-Item -ItemType Directory -Path "$env:USERPROFILE\demos\lawvu-audit-trail" -Force
Set-Location "$env:USERPROFILE\demos\lawvu-audit-trail"
```

### Step 2 — Initialize a Git repository

```powershell
git init
git checkout -b main
```

### Step 3 — Initialize SpecKit

```powershell
# Install SpecKit and initialize the project for GitHub Copilot on Windows (PowerShell scripts)
uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot --script ps
```

> **What this creates:** A `.specify/` directory containing prompt templates, PowerShell scripts, and context rules that GitHub Copilot will pick up automatically. You'll see new slash commands appear in the Copilot chat panel.

### Step 4 — Open in VS Code Insiders

```powershell
code-insiders .
```

Switch to the **GitHub Copilot chat panel** in VS Code Insiders. All subsequent steps are Copilot chat commands — nothing goes in the terminal until verification.

---

## Phase 0: Define the Constitution

The constitution establishes non-negotiable principles that govern every decision Copilot makes throughout this project. This is the single most important step in SDD — it replaces "hope the AI knows your standards" with explicit, auditable constraints.

**In the Copilot chat panel, paste:**

```text
/speckit.constitution Lawvu is a legal-technology SaaS company building on Microsoft Azure. We serve law firms, in-house legal teams, and enterprises across New Zealand, Australia, and globally. Our platform handles sensitive legal data, contracts, and personally identifiable information on behalf of our customers. Every engineering decision must be defensible to a regulatory auditor.

**Security:** We are Security-First. Apply OWASP Top 10 mitigations by default. All boundaries — API, data, inter-service — must validate and sanitize inputs. Secrets never appear in source code, configuration files, or logs — Key Vault and Managed Identity only. TLS 1.2+ on all network communications. Principle of least-privilege for every identity and service.

**Compliance:** We design for GDPR, SOC 2 Type II, ISO 27001, and the New Zealand Privacy Act 2020. Data residency must be configurable. Retention policies must be enforced programmatically. Personal data must be identifiable so it can be purged on request. Any design that could fail a compliance audit must be rejected.

**Responsible AI:** If AI features are added in future, apply data minimisation — never send PII to external AI models without explicit tenant consent. Log all AI-influenced decisions at audit level. Prefer explainable, deterministic outputs over opaque model results.

**Governance and Auditability:** Every mutation to significant data must produce an audit event. Immutability of audit records is non-negotiable — once written, events cannot be modified or deleted. Data lineage must be fully traceable end to end.

**Architecture:** Follow Clean Architecture strictly — Domain, Application, Infrastructure, API layers. Dependencies flow inward only. The Domain layer has zero infrastructure dependencies. Apply SOLID, YAGNI, DRY. No gold-plating: implement only what the specification requires, nothing more.

**Code Quality:** Target .NET 10 with C# 13. Use Minimal API endpoints — no MVC controllers. No magic strings or magic numbers — use constants or enums. All public APIs have XML documentation comments. Prefer readability and maintainability over cleverness. Use record types for immutable value objects and DTOs.

**Testing:** Unit tests with xUnit, FluentAssertions, and NSubstitute are mandatory — not optional — for all Application and Domain logic. Integration tests cover all API endpoints and infrastructure interactions. No code ships without tests. Aim for meaningful coverage, not coverage theatre.

**Multi-Tenancy:** Tenant isolation is enforced at the repository/infrastructure layer. Application code never constructs cross-tenant queries. Tenant identity is derived from a verified JWT claim and never from client-supplied request bodies. A tenant data leak is a P0 incident.

**API Design:** All APIs are versioned from day one using URL path versioning (/v1/). Errors use RFC 9457 Problem Details format. All endpoints are documented via OpenAPI/Swagger. Pagination is mandatory for all collection endpoints — no unbounded result sets.

**Azure Infrastructure:** Target Azure Container Apps for hosting. Use Azure Cosmos DB for primary storage. Authenticate to all Azure services via Managed Identity — no connection strings in configuration. Secrets via Azure Key Vault references. Observability via structured logging with Serilog and an Azure Monitor sink.
```

> **Presenter talking point:** "Notice we haven't described a single class or table yet. The constitution is about *principles*, not implementation. Every subsequent step — spec, plan, tasks, code — will be constrained by these rules. This is the difference between SDD and vibe-coding: we write the constitution once and it governs everything."

**Expected output:** Copilot generates or updates `constitution.md` in the `.specify/` directory. Briefly open this file and show the audience that their principles are now a persistent artifact — not a chat message that scrolls away.

---

## Phase 1: Create the Specification

The specification describes *what* to build and *why*. No technology choices yet — those come in the plan. The goal is an unambiguous description of the problem.

**In the Copilot chat panel, paste:**

```text
/speckit.specify Build an Immutable Audit Trail Service for Lawvu's legal SaaS platform. This service is the compliance backbone — it records every significant action taken by users, API clients, and internal system processes across all tenant accounts.

The purpose of the audit trail is twofold: first, to enable Lawvu's customers — law firms and legal teams — to demonstrate to regulators that their data was handled correctly and completely; second, to enable Lawvu's own security and compliance team to investigate incidents and anomalies.

Every recordable action must produce an event that captures: who performed the action (a user ID, a service account identifier, or a named system process); what action was performed (a namespaced action name such as "document.viewed" or "contract.signed"); what resource was affected (its type and unique identifier); what changed (a snapshot of the before and after state where applicable — not all actions have a state change); when it happened (a precise UTC timestamp); where the request originated (source IP address); and a correlation ID linking it to the originating HTTP request or background workflow.

Once written, events are permanent and unalterable. The service must detect and prove any tampering. This is achieved through a cryptographic hash chain: each event stores a hash that seals the content of that event combined with the hash of the immediately preceding event for that tenant. Any modification or deletion of an event breaks the chain, and this must be detectable via a dedicated verification endpoint.

The service must enforce strict per-tenant data isolation. One tenant's events must never be visible or accessible to another tenant under any circumstances — not through misconfigured queries, not through API design gaps, not through any other means.

Compliance officers must be able to query the audit trail by date and time range, by actor, by action name, and by resource type or resource ID. All query results must be paginated. Compliance teams must also be able to export a tenant's full audit history in JSON and CSV formats for submission to external auditors and regulatory bodies.

The service must handle high write throughput — every user action in the Lawvu platform emits an audit event, so write latency must be low and the write path must never block or degrade the originating user-facing request. The system must remain fully operational for writes even during heavy read and export operations.
```

> **Presenter talking point:** "Notice the spec uses business language — 'compliance officers', 'regulatory bodies', 'law firms'. There is no mention of Cosmos DB, C#, or REST APIs. The spec captures the *intent*. This is what makes it durable — the technology can change, but the requirement to prove tamper-evidence to a regulator doesn't."

**Expected output:** Copilot generates `spec.md` in the `.specify/` directory. This is a structured, detailed requirements document. Show the audience that it's a *readable artifact* — not a code comment, not a prompt, not a Jira ticket. It lives in version control next to the code.

---

## Phase 2: Clarify Ambiguities

The clarify step finds and resolves ambiguities in the specification before any planning or implementation begins. Ambiguities found here cost nothing to fix. Ambiguities found after implementation cost everything.

**In the Copilot chat panel, paste:**

```text
/speckit.clarify Focus on six areas where the specification needs greater precision before we can plan or implement:

1. Hash chain algorithm and genesis event: Specify the exact cryptographic algorithm for the hash chain — recommend SHA-256. Define the exact formula showing what inputs are included in the hash (event content fields and the previous event hash). Define the genesis event — since the first event for a tenant has no predecessor, define the well-known constant seed value used as the "previous hash" for a tenant's very first event. Define what the chain verification endpoint returns and how a caller proves chain integrity across a specific date range.

2. Mandatory versus optional AuditEvent fields: Clarify which fields are required on every event — actorId, action, resourceType, resourceId, occurredAt, tenantId, correlationId, sourceIp, previousHash, eventHash — versus which are optional — beforeState and afterState are optional because not all actions have an observable state change. For example, a "document.viewed" event has no meaningful afterState. Clarify the maximum payload size for beforeState and afterState JSON to prevent abuse.

3. Tenant isolation at the storage layer: Define how the partitioning strategy enforces tenant isolation. For any partitioned storage system, every query must include the tenant identifier as a partition filter. The repository must assert that the tenant in the verified JWT claim matches the partition key on every read and write operation — this must be a hard, enforced constraint, not an informal convention.

4. Data retention and legal hold: Define a standard retention period — suggest seven years for legal records consistent with common legal regulatory requirements. Define how a compliance officer places a legal hold on a tenant's data, preventing automatic expiry while the hold is active. Define what happens at retention expiry — events are removed from the live store but a cryptographic summary proving the chain existed is retained as a permanent receipt.

5. Write throughput target and read consistency model: Define the expected peak write throughput — suggest 500 events per second per tenant. Clarify the consistency model: eventual consistency is acceptable for queries and exports (reads may lag by a few seconds), but the hash chain previous-hash lookup must use strong consistency to prevent chain forks when concurrent writes occur for the same tenant.

6. Cryptographically signed exports for legal admissibility: Clarify whether exported files must be signed so that the recipient — an auditor or regulator — can verify the file has not been modified since it was generated by Lawvu. Define the signature approach — a detached RSA signature file alongside the export file, using a signing key stored in Azure Key Vault.
```

> **Presenter talking point:** "These questions look obvious in hindsight, but they're exactly the kinds of decisions that get made implicitly during implementation — buried in a variable name or a database column default. SDD surfaces them explicitly, before the code is written, when they're cheapest to resolve."

**Expected output:** Copilot updates `spec.md` with answers and clarifications to each question. Show the audience that the spec is now denser and more precise — it has a hash algorithm, a genesis constant, a TPS target, a retention period. This is specification evolution, not requirement drift.

---

## Phase 3: Create the Technical Plan

With an unambiguous specification in hand, we now define the technology stack and architectural approach. This is the first time we mention .NET, Cosmos DB, or any specific technology.

**In the Copilot chat panel, paste:**

```text
/speckit.plan Build using .NET 10 and C# 14. Structure the solution as a Clean Architecture solution with four class library projects and two test projects:

LawVu.AuditTrail.Domain — the innermost layer. Contains the AuditEvent entity, strongly-typed value objects (TenantId, EventId, EventHash), the HashChainService as a pure static class with no infrastructure dependencies, and the IAuditEventRepository interface. No NuGet dependencies beyond the .NET runtime.

LawVu.AuditTrail.Application — use cases implemented as MediatR commands and queries. Commands: RecordAuditEventCommand. Queries: QueryAuditEventsQuery, ExportAuditEventsQuery, VerifyHashChainQuery. Each command and query has a corresponding FluentValidation validator. The application layer depends only on Domain — never on Infrastructure.

LawVu.AuditTrail.Infrastructure — implements IAuditEventRepository using the Microsoft.Azure.Cosmos SDK directly — no Entity Framework Core. Partition key is tenantId. The previous-hash lookup before every write uses the Cosmos DB SDK's strong consistency option to prevent hash chain forks. Implements export signing using Azure.Security.KeyVault.Keys and DefaultAzureCredential. Implements retention expiry and legal hold management.

LawVu.AuditTrail.Api — .NET 10 Minimal API using MapGroup for endpoint groups under /v1/audit-events. JWT bearer authentication middleware extracts and validates the tenant claim — tenant identity is never accepted from the request body. Problem Details error handling via IProblemDetailsService. OpenAPI documentation via Microsoft.AspNetCore.OpenApi. Structured logging via Serilog with WriteTo.AzureMonitor sink.

LawVu.AuditTrail.Domain.Tests — xUnit unit tests for HashChainService and all domain value objects. No mocking required — Domain is pure.

LawVu.AuditTrail.Application.Tests — xUnit unit tests for all MediatR command and query handlers. Use NSubstitute to mock IAuditEventRepository. Use FluentAssertions for all assertions.

LawVu.AuditTrail.Api.Tests — xUnit integration tests using WebApplicationFactory with a substituted in-memory repository. Tests cover authentication, tenant isolation enforcement, pagination, and error response format.

Local development: use a .NET Aspire AppHost project to orchestrate the API service and a Cosmos DB emulator resource. This eliminates manual Docker Compose and emulator configuration.

Containerization: multi-stage Dockerfile using mcr.microsoft.com/dotnet/sdk:10.0 for build and mcr.microsoft.com/dotnet/aspnet:10.0 for runtime. Target Azure Container Apps for deployment.

SHA-256 hash chain formula: eventHash = SHA256( tenantId + "|" + actorId + "|" + action + "|" + resourceType + "|" + resourceId + "|" + occurredAt.ToString("O") + "|" + previousHash ). The genesis previous hash constant is the SHA-256 hash of the string "GENESIS-LAWVU-AUDIT-TRAIL-V1".
```

> **Presenter talking point:** "Compare this to how most teams make architecture decisions — in a Slack thread, or in someone's head. Here the plan is a version-controlled artifact. When a new engineer joins, they can read `plan.md` and understand *why* we chose Cosmos DB and *why* there's no Entity Framework. The decision is auditable."

**Expected output:** Copilot generates `plan.md` in the `.specify/` directory. Show the audience the project structure and the hash chain formula — concrete, unambiguous, implementation-ready.

---

## Phase 4: Generate Quality Checklist

The checklist validates that the specification and plan are complete, consistent, and ready for implementation. It often surfaces gaps that were invisible until this moment.

**In the Copilot chat panel, paste:**

```text
/speckit.checklist
```

> **Presenter talking point:** "This is the 'unit tests for English' moment. Just as unit tests check that code does what it claims, the checklist checks that the spec and plan say what they need to say. If the checklist flags something, fixing it now takes 30 seconds. Fixing it after implementation takes hours."

**Expected output:** A structured checklist of validation items — requirements completeness, plan consistency, edge cases, security considerations, compliance checkpoints. Walk the audience through two or three flagged items to show that even a carefully written spec has gaps. Resolve the flagged items by running `/speckit.clarify` again with the specific gaps as input.

---

## Phase 5: Generate Tasks

The tasks step transforms the plan into a traceable, ordered list of implementation work items — each task is explicitly linked to a requirement in the spec.

**In the Copilot chat panel, paste:**

```text
/speckit.tasks
```

> **Presenter talking point:** "Every task you're about to see traces back to a line in the spec. When a developer asks 'why are we building this?', the answer is one click away. When an auditor asks 'did you implement what you said you would?', the answer is in the commit history."

**Expected output:** Copilot generates `tasks.md` listing all implementation tasks organized by layer: Domain, Application, Infrastructure, API, Tests, Infrastructure-as-Code. Show the audience the traceability — each task references the spec requirement it satisfies.

---

## Phase 6: Pre-Implementation Analysis

Before writing a single line of code, run a cross-artifact consistency check. This catches contradictions between the spec, plan, and tasks — conflicts that would produce broken or mismatched code if left undetected.

**In the Copilot chat panel, paste:**

```text
/speckit.analyze
```

> **Presenter talking point:** "This is the quality gate that vibe-coding skips entirely. The AI is checking its own plan against its own spec for internal consistency. If `plan.md` describes a Cosmos DB partition strategy that contradicts a tenant isolation requirement in `spec.md`, this step surfaces it now — before any code exists."

**Expected output:** A consistency report listing any contradictions, gaps, or ambiguities found across `constitution.md`, `spec.md`, `plan.md`, and `tasks.md`. Resolve any flagged issues before proceeding. If the report is clean, proceed with confidence.

---

## Phase 7: Implement

Implementation is broken into five phases to prevent context saturation and to allow validation between phases. Run each phase separately and verify the output before proceeding to the next.

> **Important:** For each phase, tell GitHub Copilot to focus only on that phase's scope. This keeps the context clean and the output high quality.

### Phase 7a: Domain layer and hash chain

**In the Copilot chat panel, paste:**

```text
/speckit.implement Focus exclusively on Phase 1: implement the Domain layer only. Create the solution structure, the LawVu.AuditTrail.Domain project, and the LawVu.AuditTrail.Domain.Tests project. Implement the AuditEvent entity, all value objects (TenantId, EventId, EventHash), the HashChainService with the SHA-256 formula defined in plan.md, and the IAuditEventRepository interface. Write comprehensive unit tests for HashChainService covering the genesis event, chained events, and tamper detection. Do not implement any other layer yet.
```

> **Presenter talking point:** "The domain is pure — no Cosmos DB, no HTTP, no configuration. HashChainService is a static function. We can prove it works correctly with unit tests before any infrastructure exists. This is SOLID in practice: the domain doesn't know it's running on Azure."

**Verify before continuing:**

```powershell
dotnet test LawVu.AuditTrail.Domain.Tests --verbosity minimal
```

### Phase 7b: Application layer

**In the Copilot chat panel, paste:**

```text
/speckit.implement Focus exclusively on Phase 2: implement the Application layer. Create the LawVu.AuditTrail.Application project and the LawVu.AuditTrail.Application.Tests project. Implement RecordAuditEventCommand, QueryAuditEventsQuery, ExportAuditEventsQuery, and VerifyHashChainQuery as MediatR commands and queries. Add FluentValidation validators for each. Implement all corresponding MediatR handlers using the IAuditEventRepository interface. Write unit tests for all handlers using NSubstitute mocks for IAuditEventRepository. Do not implement Infrastructure or API yet.
```

**Verify before continuing:**

```powershell
dotnet test LawVu.AuditTrail.Application.Tests --verbosity minimal
```

### Phase 7c: Infrastructure layer

**In the Copilot chat panel, paste:**

```text
/speckit.implement Focus exclusively on Phase 3: implement the Infrastructure layer. Create the LawVu.AuditTrail.Infrastructure project. Implement IAuditEventRepository using the Microsoft.Azure.Cosmos SDK — partition key is tenantId. Implement the strongly-consistent previous-hash lookup before every write. Implement export signing using Azure.Security.KeyVault.Keys with DefaultAzureCredential. Implement retention expiry and legal hold logic. Register all services in an IServiceCollection extension method named AddAuditTrailInfrastructure. Do not implement the API layer yet.
```

### Phase 7d: API layer

**In the Copilot chat panel, paste:**

```text
/speckit.implement Focus exclusively on Phase 4: implement the API layer. Create the LawVu.AuditTrail.Api project and the LawVu.AuditTrail.Api.Tests project. Implement Minimal API endpoints under the /v1/audit-events route group: POST /v1/audit-events (record an event), GET /v1/audit-events (query with filters and pagination), GET /v1/audit-events/export (trigger export), GET /v1/audit-events/verify (verify hash chain integrity). Implement JWT bearer middleware that extracts and validates the tenantId claim. Implement RFC 9457 Problem Details error handling. Add OpenAPI/Swagger via Microsoft.AspNetCore.OpenApi. Add Serilog with console and Azure Monitor sinks. Write integration tests using WebApplicationFactory for all endpoints — including tenant isolation and authentication failure scenarios.
```

**Verify before continuing:**

```powershell
dotnet test LawVu.AuditTrail.Api.Tests --verbosity minimal
```

### Phase 7e: Local development and containerization

**In the Copilot chat panel, paste:**

```text
/speckit.implement Focus exclusively on Phase 5: add local development tooling and containerization. Create a .NET Aspire AppHost project that orchestrates the API and a Cosmos DB emulator resource. Create a multi-stage Dockerfile using mcr.microsoft.com/dotnet/sdk:10.0 for build and mcr.microsoft.com/dotnet/aspnet:10.0 for runtime. Add a .dockerignore file. Add a README.md at the solution root documenting prerequisites and how to run the service locally using the Aspire AppHost. Do not add any new features — only infrastructure tooling.
```

---

## Phase 8: Converge

After implementation, converge checks the codebase against the spec and tasks to confirm everything was built. If gaps are found, it appends new tasks and you run `/speckit.implement` again.

**In the Copilot chat panel, paste:**

```text
/speckit.converge
```

> **Presenter talking point:** "This closes the loop. SDD is not just 'spec then code' — it's 'spec then code then verify the code matches the spec'. Converge is the automated audit that proves the implementation is complete. If it comes back clean, we have machine-verified traceability from requirement to code."

**Expected output:** Either a "feature has converged" confirmation (all tasks implemented), or a list of remaining tasks appended to `tasks.md`. If new tasks are appended, run `/speckit.implement` targeting the remaining tasks, then run `/speckit.converge` again. Repeat until convergence is confirmed.

---

## Verification

Once convergence is confirmed, run the service locally to prove it works end to end.

### Run all tests

```powershell
dotnet test --verbosity minimal
```

All tests must pass before proceeding.

### Start the service using Aspire

```powershell
dotnet run --project LawVu.AuditTrail.AppHost
```

The Aspire dashboard opens in your browser. Click the API resource to see its logs and endpoint URL.

### Open the OpenAPI explorer

Navigate to `http://localhost:5000/swagger` (or the port shown in the Aspire dashboard). You should see all four endpoints documented — POST, GET, export, and verify.

### Record an audit event

```powershell
# Replace <TOKEN> with a valid JWT bearing a tenantId claim
$headers = @{ Authorization = "Bearer <TOKEN>"; "Content-Type" = "application/json" }
$body = @{
  action = "document.viewed"
  resourceType = "Contract"
  resourceId = "CTR-001"
  sourceIp = "203.0.113.42"
  correlationId = [System.Guid]::NewGuid().ToString()
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/v1/audit-events" -Method POST -Headers $headers -Body $body
```

**Expected:** HTTP 201 with the created event, including `eventHash` and `previousHash` fields populated.

### Verify the hash chain

```powershell
Invoke-RestMethod -Uri "http://localhost:5000/v1/audit-events/verify" -Method GET -Headers $headers
```

**Expected:** HTTP 200 with `"chainValid": true` and the event count.

### Confirm tenant isolation

Obtain a second JWT with a *different* `tenantId` claim and attempt to query the first tenant's events. **Expected:** HTTP 200 with an empty result set — not a 403, because the tenant exists in the system but has no events visible to the second tenant. This demonstrates that isolation is enforced at the data layer, not through access denial.

---

## Quick Demo Path (10 minutes)

For a shortened demonstration, skip the checklist, clarify, and analyze steps. Use this condensed workflow:

| Step | Command | Time |
|------|---------|------|
| 1 | Setup and `specify init` | 2 min |
| 2 | `/speckit.constitution` | 1 min |
| 3 | `/speckit.specify` | 2 min |
| 4 | `/speckit.plan` | 1 min |
| 5 | `/speckit.tasks` | 1 min |
| 6 | `/speckit.implement` (Domain layer only) | 2 min |
| 7 | `dotnet test` verification | 1 min |

**Key talking points for the quick path:**

- Show `constitution.md`, `spec.md`, and `plan.md` as the three artifacts that govern the implementation.
- Emphasize that the Domain layer unit tests pass *before any database or API exists* — the spec drove testable design.
- Ask the audience: "What would this have looked like if we'd started by writing a `AuditController.cs` class?"

---

## Demo Tips

**Before the demo:**

- [ ] Run the full setup once offline to verify SpecKit installs cleanly
- [ ] Pre-install uv and Python so the `uvx` command is instant
- [ ] Have a valid JWT for the verification steps ready (use [jwt.io](https://jwt.io) to generate a test token with a `tenantId` claim)
- [ ] Commit the `.specify/` directory after each phase so you can `git show HEAD` to reveal what each step produced

**During the demo:**

- [ ] After each `/speckit.*` command, open the generated artifact in the editor and scroll through it — let the audience see that real structured content was produced, not just a chat reply
- [ ] Pause at Phase 6 (analyze) — this is the most counterintuitive moment. Let the audience absorb the idea that the AI is reviewing its *own* plan for consistency
- [ ] When implementation runs, keep the editor visible so the audience can watch files being created — this is the "wow" moment
- [ ] If Copilot pauses or asks a clarifying question during implementation, engage with it — this demonstrates that the spec provides enough context for the AI to ask *intelligent* questions rather than making silent wrong assumptions

**Common questions to anticipate:**

| Question | Answer |
|----------|--------|
| "Why not just prompt Copilot directly?" | The spec is a version-controlled artifact. Prompts are ephemeral. When the team grows or the requirement changes, the spec is still there. |
| "Can the spec drift from the code?" | Yes — that's what `/speckit.converge` is for. It's the automated check that the code matches the spec. Run it in CI. |
| "Is the constitution reusable?" | Yes. Copy `constitution.md` to every new Lawvu service. All services inherit the same compliance and architecture standards. |
| "What if we disagree with what the AI planned?" | Edit `plan.md` directly, then rerun `/speckit.tasks` and `/speckit.analyze`. The plan is yours — the AI is the implementer, not the decision-maker. |
