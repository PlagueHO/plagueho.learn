---
topic: Microsoft Entra Agent ID
topic_slug: microsoft-entra-agent-id
iteration: 1
trigger: Microsoft Build 2026 currency refresh
discovered_at: 2026-06-04
---

# Iteration 1 Sources — Build 2026 Deltas

Source discovery scoped to the seven Build 2026 deltas (announced 2026-06-02)
that may affect the completed guide (finalized 2026-05-29). Priority order:
`learn.microsoft.com` > official Microsoft / GitHub blogs > product docs.

> Tooling note: the Microsoft Learn MCP search endpoint was unavailable during
> this iteration. Sources were verified by direct page fetch of canonical Learn
> URLs, GitHub keyword search, and the Build 2026 announcement index
> (`microsoft/Build26-news`). Blog `aka.ms` links resolve to official Microsoft
> Build 2026 posts.

## Delta 1: Autopilot agents

New agent category — always-on, autonomous agents that act independently with
their own Entra Agent ID, email address, Microsoft Teams presence, and a place
in the org chart. Microsoft Scout is the first Autopilot.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://aka.ms/BuildFoundryAgents | Microsoft Agent Platform — Foundry Agents (Build 2026) — "Autopilot agents (public preview): act independently with Entra Agent ID, email address, Microsoft Teams presence, and place in the org chart" | 5/5 | High | blog-only |
| 2 | https://aka.ms/ProjectLobster-Blog | Microsoft Scout — First Autopilot Agent — "Autopilots are always-on agents that work autonomously, with their own identity... Every agent operates under its own governed Entra identity, not a shared, anonymous service account" | 5/5 | High | blog-only |
| 3 | https://learn.microsoft.com/en-us/entra/agent-id/agent-users | The agent's user account in Microsoft Entra Agent ID — digital-worker identity model that underpins Autopilot agents (mailbox, chat, org membership) | 4/5 | High | Learn |

Coverage: No dedicated Learn doc names "Autopilot agents" yet. The identity
mechanism (agent user account / digital worker) is documented on Learn
(`agent-users`, last updated 04/09/2026, pre-Build). Treat the feature itself as
blog-only for now.

## Delta 2: Agent 365 SDK (GA)

Generally available SDK that layers Entra-backed Agent Identity, OpenTelemetry
observability, governed MCP / Work IQ tool access, and blueprint governance onto
agents built on any framework. Distinct from (and complementary to) the
Microsoft 365 Agents SDK, which hosts agents.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://learn.microsoft.com/en-us/microsoft-agent-365/developer/ | Microsoft Agent 365 SDK and CLI (updated 05/01/2026) — clarifies Agent 365 SDK vs Microsoft 365 Agents SDK | 5/5 | High | Learn |
| 2 | https://learn.microsoft.com/en-us/microsoft-agent-365/developer/agent-365-sdk | Agent 365 SDK ("Learn more" reference) | 5/5 | High | Learn |
| 3 | https://learn.microsoft.com/en-us/microsoft-agent-365/overview | Overview of Microsoft Agent 365 (updated 06/04/2026; GA for Commercial since 2026-05-01) | 4/5 | High | Learn |
| 4 | https://learn.microsoft.com/en-us/microsoft-agent-365/admin/capabilities-entra | Protect agent identities with Microsoft Entra (updated 05/13/2026) — Agent 365 ↔ Entra Agent ID convergence | 4/5 | High | Learn |
| 5 | https://aka.ms/BUILD_SecurityBlog | Microsoft Security at Build 2026 — "With the general availability of the Agent 365 SDK, developers can integrate controls directly into their development workflows" | 4/5 | Medium | blog-only |

Coverage: Authoritative Learn docs exist. Note the new `developer/` and
`admin/` Agent 365 doc trees plus an Entra Agent ID restructure surfacing
`entra/agent-id/identity-platform/...` and
`entra/agent-id/identity-professional/...` subpaths (e.g.
`identity-platform/agent-registry-convergence`).

## Delta 3: OS-enforced Agent Identity + Agent 365 native integration

Windows assigns agents a local ID or an Entra-backed, cloud-provisioned identity
and attributes all container activity to that identity, differentiating human
from agent. Agent 365 native integration (Defender, Entra, Intune, Purview) is
in preview from July 2026.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://learn.microsoft.com/en-us/windows-365/agents/identity-security | Identity security overview (updated 06/03/2026) — ties Cloud PC agent sessions to a dedicated Entra agent user identity with audit attribution across Agent 365, Entra sign-in logs, Defender, Purview | 5/5 | High | Learn |
| 2 | https://learn.microsoft.com/en-us/security/security-for-ai/agent-365-security | Secure AI agents at scale using Microsoft Agent 365 (updated 05/01/2026) — Entra / Purview / Defender control mapping | 4/5 | High | Learn |
| 3 | https://aka.ms/Windows-Build2026 | HERO: Windows (Build 2026) — "OS-enforced Agent Identity: Windows assigns agents a local ID or a cloud provisioned identity backed by Entra and attributes all activity from the container to that identity"; "Agent 365 native integration... available in preview in July" | 5/5 | High | blog-only |
| 4 | https://blogs.windows.com/windowsdeveloper/?p=57808 | Making Windows the trustworthy OS for agents — MXC SDK process/session isolation binding agents to a strong user identity | 3/5 | Medium | blog-only |

Coverage: Cloud PC identity binding is documented on Learn. The OS-level
"Windows assigns a local ID" claim and the July-preview Agent 365 native
integration are currently blog-only.

## Delta 4: Windows 365 for Agents (GA)

Generally available Cloud PCs that give computer-using agents secure, managed,
Entra-joined, Intune-managed environments (check-out / check-in pooling) to
execute multi-step enterprise workflows.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://learn.microsoft.com/en-us/windows-365/agents/introduction-windows-365-for-agents | What is Windows 365 for Agents? (updated 06/04/2026) — Entra-joined, Intune-managed, pooled Cloud PCs | 5/5 | High | Learn |
| 2 | https://learn.microsoft.com/en-us/windows-365/agents/identity-security | Identity security overview (updated 06/03/2026) — agent identity intersection (shared with Delta 3) | 4/5 | High | Learn |
| 3 | https://aka.ms/W365Build26Blog | Windows 365 at Build 2026 — "Windows 365 for Agents is now generally available... secured, managed, and available Cloud PCs that run within real business environments" | 4/5 | Medium | blog-only |

Coverage: Authoritative Learn docs exist and confirm GA.

## Delta 5: Hosted agents in Foundry Agent Service

Managed runtime for production agents: instant-on sandbox per session, isolated
execution, persistent memory, elastic scale. Each hosted agent gets a dedicated
Entra agent identity auto-created at deploy (plus the project managed identity).
Still PREVIEW as of this iteration; GA expected early July 2026.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents | What are hosted agents? (updated 06/03/2026) — "Hosted agents are currently in preview"; per-agent Entra identity + project managed identity; OBO for user-invoked, managed identity for autonomous | 5/5 | High | Learn |
| 2 | https://learn.microsoft.com/en-us/azure/foundry/agents/overview | What is Microsoft Foundry Agent Service? (updated 06/03/2026) — lists "Hosted agents (preview)" | 4/5 | High | Learn |
| 3 | https://aka.ms/FoundryBuildNews | Microsoft Foundry — Build 2026 Recap — "Hosted agents in Foundry Agent Service, expected to reach general availability by early July 2026" | 4/5 | High | blog-only |

Coverage: Authoritative Learn docs exist (status still preview). Also note the
Foundry RBAC role rename surfaced on the hosted-agents page — Foundry
User/Owner/Account Owner/Project Manager (previously Azure AI
User/Owner/Account Owner/Project Manager); role IDs and permissions unchanged.

## Delta 6: Agent Control Specification (ACS) + ASSERT

ACS — open specification and reference implementation for the agent runtime
governance layer (portable manifest defining where/when/how policies are
enforced; eight interception points); part of the Agent Governance Toolkit
(AGT). ASSERT — Adaptive Spec-driven Scoring for Evaluation and Regression
Testing; open-source spec-driven agent evaluation framework.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://github.com/microsoft/agent-governance-toolkit | Agent Governance Toolkit (AGT) — deterministic application-layer interception; hosts ACS module and specs (Agent OS Policy Engine, Framework Adapter Contract, Agent Hypervisor Execution Control) | 5/5 | High | none (open-source repo) |
| 2 | https://commandline.microsoft.com/agent-control-specification-runtime-governance/ | Agent Control Specification — Runtime Governance for AI Agents (official Microsoft blog) | 5/5 | High | blog-only |
| 3 | https://commandline.microsoft.com/assert-written-intent-executable-evals/ | ASSERT — Written Intent, Executable Evals (official Microsoft blog) | 5/5 | High | blog-only |
| 4 | https://aka.ms/BuildFoundryRAI | Responsible AI for Agents — ASSERT and Agent Control Specification (Build 2026); ACS "deterministic safety and security controls at checkpoints throughout agentic workflows" | 4/5 | Medium | blog-only |

Coverage: No Learn documentation located. Coverage is open-source (GitHub) plus
official Microsoft blogs. ACS/ASSERT are governance/eval tooling adjacent to
Entra Agent ID rather than core identity features.

## Delta 7: Preview-label currency for existing guide features

Verification of preview/GA status for features already covered in the guide.

| # | URL | Title | Relevance | Priority | Doc status (Learn / blog-only / none) |
|---|-----|-------|-----------|----------|---------------------------------------|
| 1 | https://learn.microsoft.com/en-us/entra/id-protection/concept-risky-agents | ID Protection for agents (Preview) (updated 05/12/2026) — STILL PREVIEW; new Graph collections `riskyAgents` and `agentRiskDetections`; OBO risk attributed to the user | 5/5 | High | Learn |
| 2 | https://learn.microsoft.com/en-us/entra/agent-id/create-blueprint | Create an agent blueprint (updated 05/09/2026) — wizard step "New agent blueprint (Preview)" STILL PREVIEW; now recommends Microsoft 365 Agents SDK (GA) for registration; Agent 365 CLI `a365 setup all` | 5/5 | High | Learn |
| 3 | https://learn.microsoft.com/en-us/entra/identity/conditional-access/agent-id | Conditional Access for Agent ID (updated 06/04/2026) — now GA (title dropped "(Preview)"); sub-features still preview ("All agent users", "Select agent users", "Agent execution environments"); references Windows 365 Cloud PCs for Agents | 5/5 | High | Learn |

Coverage: All three verified on Learn. Net status changes since 2026-05-29:
Conditional Access for agents moved Preview → GA; Identity Protection for agents
and the agent blueprint wizard remain Preview.

## Coverage summary

### Authoritative Learn docs available

- **Delta 2 — Agent 365 SDK (GA)**: Learn (`microsoft-agent-365/developer/`,
  `/overview`, `admin/capabilities-entra`) + supporting blog.
- **Delta 3 — OS-enforced Agent Identity**: partial Learn (Cloud PC identity
  binding via `windows-365/agents/identity-security`,
  `security-for-ai/agent-365-security`); OS-level local-ID claim is blog-only.
- **Delta 4 — Windows 365 for Agents (GA)**: Learn
  (`windows-365/agents/introduction-windows-365-for-agents`,
  `/identity-security`).
- **Delta 5 — Hosted agents in Foundry**: Learn
  (`foundry/agents/concepts/hosted-agents`, `/overview`) — status still preview.
- **Delta 7 — Preview/GA currency**: Learn (id-protection, create-blueprint,
  conditional-access/agent-id).

### Blog-only / no Learn coverage yet

- **Delta 1 — Autopilot agents**: blog-only (`BuildFoundryAgents`,
  `ProjectLobster-Blog`); underlying identity model is on Learn (`agent-users`),
  but the "Autopilot agents" feature has no dedicated Learn doc.
- **Delta 6 — ACS / ASSERT (AGT)**: GitHub repo + official Microsoft blogs only;
  no Learn documentation located. Adjacent governance/eval tooling, not core
  Entra Agent ID.

### Recommended guide sections to update (map to output 01–12)

- **01-what-is-entra-agent-id** — Add Agent 365 GA framing and the Autopilot
  agents category as a real-world manifestation of governed agent identity.
- **02-identity-model** — Reinforce the agent user account / digital-worker
  subtype as the basis for Autopilot agents; add OS-enforced / Cloud PC-bound
  agent identity (Windows 365 for Agents).
- **04-foundry-integration** — Add hosted agents (preview, GA expected early
  July 2026): dual identity (per-agent Entra agent identity + project managed
  identity), OBO vs managed-identity invocation; note the Foundry RBAC role
  rename (Azure AI → Foundry User/Owner/Account Owner/Project Manager).
- **08-agent-identity-blueprint** — Confirm the new agent blueprint wizard is
  still Preview; note Microsoft 365 Agents SDK (GA) as the recommended
  registration path and the Agent 365 CLI (`a365 setup all`).
- **10-security-best-practices** — Conditional Access for agents now GA (drop
  "Preview"); Identity Protection for agents still Preview (new `riskyAgents` /
  `agentRiskDetections` Graph collections); add Windows 365 for Agents and
  Agent 365 SDK governance surface; optionally reference ACS/ASSERT (AGT) as
  emerging runtime governance / evaluation tooling.
- **11-getting-started** — Add Agent 365 SDK + CLI (GA) onboarding path
  alongside the existing SDK/sidecar flow.
- **12-resources** — Add new URLs: Agent 365 developer/admin docs, Windows 365
  for Agents, Foundry hosted agents, plus ACS/ASSERT blog references.

> Restructure note (cross-cutting): the Entra Agent ID doc tree now exposes
> `entra/agent-id/identity-platform/...` and
> `entra/agent-id/identity-professional/...` subpaths. Existing guide links use
> the older flat `entra/agent-id/...` URLs (which still resolve). A link audit
> in a later phase may be warranted.
