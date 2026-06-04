---
note_type: iteration-currency
iteration: 1
trigger: Microsoft Build 2026 (2026-06-02) currency refresh
area: security
topic_slug: microsoft-entra-agent-id
extracted: 2026-06-04
quality: draft
dimensions:
  - conditional-access
  - identity-protection
  - os-enforced-identity
  - cloud-pc-agent-identity
  - agent-365-governance
  - runtime-governance-adjacent
sources:
  - url: https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id
    title: Conditional Access for agents
    updated: 2026-06-04
    status: GA (sub-features Preview)
  - url: https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents
    title: ID Protection for agents (Preview)
    updated: 2026-05-12
    status: Preview
  - url: https://learn.microsoft.com/en-us/windows-365/agents/identity-security
    title: Identity security overview (Windows 365 for Agents)
    updated: 2026-06-03
    status: GA
  - url: https://learn.microsoft.com/en-us/windows-365/agents/introduction-windows-365-for-agents
    title: What is Windows 365 for Agents?
    updated: 2026-06-04
    status: GA
  - url: https://learn.microsoft.com/en-us/security/security-for-ai/agent-365-security
    title: Secure AI agents at scale using Microsoft Agent 365
    updated: 2026-05-01
    status: GA/Preview mix
  - url: https://blogs.windows.com/windowsdeveloper/2026/06/02/build-2026-furthering-windows-as-the-trusted-platform-for-development/
    title: "Build 2026: Furthering Windows as the trusted platform for development"
    updated: 2026-06-02
    status: blog-only
  - url: https://commandline.microsoft.com/agent-control-specification-runtime-governance/
    title: "Introducing Agent Control Specification (ACS)"
    updated: 2026-06-02
    status: blog-only / open-source
  - url: https://commandline.microsoft.com/assert-written-intent-executable-evals/
    title: Turn specs into evals for any agent with ASSERT
    updated: 2026-06-02
    status: blog-only / open-source
  - url: https://github.com/microsoft/agent-governance-toolkit
    title: Agent Governance Toolkit (AGT)
    updated: 2026-06-04
    status: Public Preview / open-source
---

# Iteration 1 — Build 2026 security & governance currency

Iteration-scoped verification of security/governance status for Microsoft Entra
Agent ID, refreshed against Build 2026 (2026-06-02). Compares against the
existing security section authored 2026-05-29. Every fact carries an inline
source URL, the documented "Last updated" date, and a preview/GA status.

No 404s or sign-in walls encountered. `https://aka.ms/Windows-Build2026`
redirected to the canonical Windows Developer blog URL (captured above).

## CA currency

- **Conditional Access for agents is now GA** — the page title dropped the
  "(Preview)" suffix and now reads simply "Conditional Access for agents".
  This is the status change versus 2026-05-29. (Source:
  <https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id>,
  Last updated 06/04/2026.) The page itself does not print an explicit "GA"
  badge; GA is inferred from the removal of the Preview label (and corroborated
  by the iteration source-discovery log).
- **Sub-features that remain Preview** (targeting an agent's *user account*):
  - "All agent users (Preview)" — targets all agent user accounts in the directory.
  - "Select agent users (Preview)" — targets specific agent user accounts individually.
  - "Agent execution environments (Preview)" — condition used to scope policies
    to endpoint-based (Cloud PC) sessions only, enabling device compliance and
    compliant network controls.
  (Same source + date as above.)
- **GA (no Preview label) targeting options** for agents *acting as applications*:
  "All agent identities" and "Select agent identities". Blueprint-level targeting
  and custom-security-attribute-driven targeting are also documented without a
  Preview label.
- **Windows 365 Cloud PCs for Agents reference**: agents running on managed
  endpoints like Windows 365 Cloud PCs for Agents can be subject to device
  compliance and compliant network controls; scope with the "Agent execution
  environments (Preview)" condition. (Same source.) Links to
  <https://learn.microsoft.com/en-us/windows-365/agents/introduction-windows-365-for-agents>.
- **Licensing**: Conditional Access for agents requires Microsoft Entra ID P1
  plus a Microsoft Agent 365 license per user; "Enforcement of Agent 365
  licensing is coming soon." Network controls require Microsoft Entra Internet
  Access. (Same source.)
- **Boundaries (unchanged, still documented)**: policies targeting "all users"
  do **not** include agent user accounts; a policy targeting agent identities
  does not apply to the agent's user account; token exchange at the `AAD Token
  Exchange Endpoint: Public` (Resource ID `fb60f99c-7a34-4190-8149-302f77469936`)
  is exempt; Conditional Access only protects Entra-secured resources (API-key
  access bypasses it). Investigate via sign-in logs filtered on `agentType`.
  (Same source.)

## ID Protection currency

- **ID Protection for agents is STILL Preview** — the page title remains "ID
  Protection for agents (Preview)". No status change versus 2026-05-29.
  (Source: <https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents>,
  Last updated 05/12/2026.) Requires Microsoft Entra ID P2.
- **Two new Microsoft Graph collections** (confirmed) in the ID Protection APIs:
  - `riskyAgents`
  - `agentRiskDetections`
  (Same source; section "Microsoft Graph", links to the identityprotection
  overview.)
- **OBO risk is attributed to the user, not the agent**: "In OBO flows, where an
  agent acts using a user's delegated permissions, risky activity is attributed
  to the user rather than the agent... Risk detections in this table apply
  specifically to autonomous agent activity." (Same source.)
- **Risk detections (all offline at this time)**: `unfamiliarResourceAccess`,
  `signInSpike`, `failedAccessAttempt`, `adminConfirmedAgentCompromised`,
  `threatIntelligenceAccount`. Risk detections retained up to 90 days.
  (Same source.)
- **Risk-based Conditional Access**: "Confirm compromise" sets risk level to
  High and triggers risk-based CA policies configured to block on High Agent
  Risk; a Conditional Access template is provided at
  <https://aka.ms/CreateAgentRiskPolicy>. (Same source.) Cross-references the
  now-GA Conditional Access for agents page.
- **Adjacent governance status**: the same page's licensing block lists "ID
  Governance for agents: Microsoft Entra ID P1" and links "Governing Agent
  Identities" — agent-identity governance (access packages, sponsor oversight)
  is referenced as Preview. (Same source; and
  <https://learn.microsoft.com/en-us/entra/id-governance/agent-id-governance-overview>.)

## OS-enforced / Cloud PC agent identity

Distinguish **Learn-documented** Cloud PC agent-*user* identity (GA) from the
**blog-only** OS-enforced on-device "local ID" claim (MXC, early preview).

- **Learn-documented (GA)** — Windows 365 for Agents binds each session to a
  *dedicated Microsoft Entra agent user identity*, separate from human users:
  "Each agent uses a dedicated Microsoft Entra agent user identity... Resource
  access is explicitly assigned to each agent identity, with lifecycle
  management... centrally managed in Agent 365." The identity is **bound to the
  session, not the device**; agents check out a Cloud PC from a pool per task and
  check it back in (triggering a reset); "Agents never reuse or impersonate user
  credentials." Cloud PCs are Microsoft Entra-joined and Intune-enrolled.
  (Source: <https://learn.microsoft.com/en-us/windows-365/agents/identity-security>,
  Last updated 06/03/2026.)
- **Audit attribution (Learn-documented)** — because the human user and the
  agent user each have distinct Entra identities, every action is attributed
  across the full delegation chain, correlated across: **Agent 365** (originating
  prompt + task execution), **Microsoft Entra sign-in logs** (auth events for both
  human and agent user), **Microsoft Defender** (threat signals), and **Microsoft
  Purview** (data access/compliance/governance). (Same source.)
- **Policy enforcement across the lifecycle (Learn-documented)** — Entra as
  centralized identity/policy plane; Intune pool assignment determines which
  agent identities can acquire Cloud PCs; Conditional Access evaluates identity +
  context before permitting session connection; agent user identities are
  "treated just like human users" for CA. (Same source.)
- **Windows 365 for Agents platform (Learn)** — provisions domain-joined,
  Intune-managed Cloud PCs governed by Entra ID; check-out/check-in model;
  managed via Intune admin center with a provisioning policy (agents). The Learn
  page does not itself print a "GA" badge. (Source:
  <https://learn.microsoft.com/en-us/windows-365/agents/introduction-windows-365-for-agents>,
  Last updated 06/04/2026.)
- **GA confirmed by blog** — "Windows 365 for Agents, now generally available
  within Agent 365." (Source: Build 2026 Windows Developer blog,
  <https://blogs.windows.com/windowsdeveloper/2026/06/02/build-2026-furthering-windows-as-the-trusted-platform-for-development/>,
  2026-06-02. **blog-only GA assertion**; the Learn pages describe the capability
  but do not state GA explicitly.)
- **BLOG-ONLY: OS-enforced Agent Identity / "local ID"** — "Windows assigns
  agents a local ID or a cloud provisioned identity backed by Entra and
  attributes all activity from the container to that identity, so you can clearly
  differentiate human from agent." This local on-device identity is delivered via
  **Microsoft Execution Containers (MXC)**, announced in **early preview**.
  (Same Build blog.) **Not documented on Learn** — the "local ID" / OS-enforced
  on-device identity claim is blog-only; only the cloud-provisioned Entra agent
  *user* identity for Cloud PC sessions is Learn-documented.
- **BLOG-ONLY: Agent 365 native integration with MXC** — "available in preview
  in July"; will deliver Defender, Entra, Intune and Purview protections to
  constrain and secure local agents. (Same Build blog. Do not overstate — this is
  a roadmap/preview date, not a shipped Learn-documented feature.)

## Agent 365 SDK governance

- The Agent 365 security surface is documented at the **platform** level (not as
  a discrete "SDK" page). Microsoft Defender, Microsoft Entra, and Microsoft
  Purview "now provide purpose-built controls for agents," with centralized
  visibility in the Microsoft 365 admin center. (Source:
  <https://learn.microsoft.com/en-us/security/security-for-ai/agent-365-security>,
  Last updated 05/01/2026.) **Flag**: this Learn page does not confirm an "Agent
  365 SDK GA"; the iteration candidate-delta "Agent 365 SDK (GA)" is not
  substantiated on this security page and should be verified separately if needed.
- **Access control (Microsoft Entra)** — visibility into all agent identities
  (Entra Agent ID agents, self-registered agents, and shadow agents); extend
  Conditional Access and Identity Protection from users to agents; SASE to
  monitor/block agent network traffic; agent governance + lifecycles with
  responsible sponsors. (Same source.)
- **Data security (Microsoft Purview)** — DSPM for agents, sensitivity-label
  inheritance, DLP, insider risk management/communication compliance, auditing
  of all agent interactions, data lifecycle management, eDiscovery, and
  Compliance Manager assessments against AI regulations. (Same source.)
- **Threat protection (Microsoft Defender)** — agent security posture management
  (attack-path visualization), real-time threat detection and blocking of
  malicious tool invocations, and unified agent-observability logs for hunting.
  (Same source.)
- Governance is template-driven: security teams author policy templates (e.g.,
  Entra access packages); IT applies them during onboarding so governance and
  compliance are enforced from the start. (Same source.)

## ACS / ASSERT (adjacent)

These are **runtime-governance / evaluation tooling adjacent to** Entra Agent ID,
**not core identity features**. Both are blog-announced and open-source with **no
Learn documentation**. Do not present as part of the Entra Agent ID identity
platform.

- **Agent Control Specification (ACS)** — an open, vendor-neutral specification
  and reference implementation for the *runtime governance* layer of AI agents.
  It is a module within Microsoft's Agent Governance Toolkit (AGT), defining a
  portable manifest with **eight interception points** (`agent_startup`, `input`,
  `pre_model_call`, `post_model_call`, `pre_tool_call`, `post_tool_call`,
  `output`, `agent_shutdown`) that return allow/warn/deny/escalate verdicts;
  framework-independent, policy-engine-agnostic (works with Rego/OPA, Cedar).
  MIT-licensed, developed in the open. (Source:
  <https://commandline.microsoft.com/agent-control-specification-runtime-governance/>,
  2026-06-02. Blog-only; no Learn doc.)
- **ASSERT (Adaptive Spec-driven Scoring for Evaluation and Regression Testing)**
  — an open-source framework that turns natural-language behavior specifications
  into executable evaluations of models and agents (systematize → taxonomize →
  generate stratified test cases → run + record traces → score with rationale +
  policy citation). MIT-licensed; repo at
  <https://github.com/responsibleai/ASSERT>. It is an *evaluation* framework, not
  an identity or access-control feature. (Source:
  <https://commandline.microsoft.com/assert-written-intent-executable-evals/>,
  2026-06-02. Blog-only; no Learn doc.)
- **Agent Governance Toolkit (AGT)** — the parent open-source project
  (Microsoft-signed, **Public Preview**, MIT, latest release v4.0.0): policy
  enforcement, zero-trust identity, execution sandboxing, and SRE for autonomous
  agents; maps OWASP Agentic Top 10, NIST AI RMF, EU AI Act, SOC 2. ACS is its
  policy-language module. (Source:
  <https://github.com/microsoft/agent-governance-toolkit>, fetched 2026-06-04.)
  Adjacent tooling — not a Microsoft Entra Agent ID identity capability.

## Questions raised for follow-up

- Is there a dedicated Learn page asserting "Windows 365 for Agents GA" (the
  GA claim is currently blog-only)? The Learn intro page describes the service
  without a GA badge.
- Is "Agent 365 SDK (GA)" documented anywhere on Learn? Not confirmed on the
  Agent 365 security page; the candidate delta remains unsubstantiated here.
- When MXC / OS-enforced on-device "local ID" reaches Learn documentation
  (Agent 365 native integration preview targeted for July), revisit to move it
  from blog-only to Learn-documented.
