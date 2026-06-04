# Quality Review: microsoft-foundry-hosted-agents

## Summary

- Sections reviewed: 5
- Sections passing: 5
- Sections with gaps: 0
- Broken sources: 0

## Section results

### 01-overview-and-deployment

- **Status**: pass
- **Attribution**: sufficient for factual claims and key tables (inline source statements now present)
- **Completeness**: 2/2 primary areas covered (overview, deployment)
- **Source validity**: 2/2 spot-checks passed
- **Issues**:
  - None blocking.

### 02-persistence-isolation-identity

- **Status**: pass
- **Attribution**: sufficient; persistence, memory, identity, and networking guidance now tied to inline sources
- **Completeness**: 3/3 primary areas covered (persistence, isolation, identity)
- **Source validity**: 2/2 spot-checks passed
- **Issues**:
  - None blocking.

### 03-scalability-and-operations

- **Status**: pass
- **Attribution**: sufficient for limits and quotas claims; synthesized sections are explicitly labeled
- **Completeness**: 2/2 primary areas covered (scalability, operations)
- **Source validity**: 2/2 spot-checks passed
- **Issues**:
  - None blocking.

### 04-multiagent-multitenant-patterns

- **Status**: pass
- **Attribution**: sufficient; pattern references and multitenant caveats are source-backed, and custom patterns are clearly labeled as synthesized
- **Completeness**: 3/3 primary areas covered (multi-agent, multitenant, single-vs-multi)
- **Source validity**: 2/2 spot-checks passed
- **Issues**:
  - None blocking.

### output/README

- **Status**: pass
- **Attribution**: sufficient for package-level claims and required source links
- **Completeness**: 6/6 requested coverage themes listed
- **Source validity**: 2/2 required source checks passed
- **Issues**:
  - None blocking.

## Spot-check details

- 01-overview-and-deployment:
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents (accessible; hosted model, protocol guidance, preview caveat confirmed)
  - https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent (accessible; deployment lifecycle and active-status flow confirmed)
- 02-persistence-isolation-identity:
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory (accessible; long-term memory model and preview caveats confirmed)
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity (accessible; shared-vs-distinct identity lifecycle and reassignment guidance confirmed)
- 03-scalability-and-operations:
  - https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions (accessible; artifact limits, 400/429 handling, and retry guidance confirmed)
  - https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits (accessible; TPM/RPM constraints and rate-limit guidance confirmed)
- 04-multiagent-multitenant-patterns:
  - https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview (accessible; orchestration pattern taxonomy and single-vs-multi complexity guidance confirmed)
  - https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/service/openai#isolation-models (accessible; isolation model tradeoffs and app-layer tenant enforcement caveat confirmed)

## Recommendation

- Promote reviewed sections to complete.
- Continue periodic freshness checks because hosted-agent and memory capabilities remain preview-sensitive.

---

## Update cycle: Build 2026 (reviewed 2026-06-04)

Scope: new sections 05 and 06, plus Build 2026 revisions to 01, 02, 03, 04 and the
README index. Backing sources: `notes/06-build2026-updates-notes.md`,
`notes/07-publishing-channels-notes.md`, `notes/08-agent365-ai-teammates-notes.md`.

### Update-cycle summary

- Sections reviewed: 7 (01, 02, 03, 04, 05, 06, README)
- Sections passing: 6
- Sections needing work: 1 (03 — non-attribution markdown defect)
- Broken sources: 0 (all three new source URLs accessible and content matches notes)

### Spot-check of the three new sources

- `https://devblogs.microsoft.com/foundry/agent-service-build2026/` — accessible.
  Confirmed: hosted agents "reaching general availability in the next 30 days"; sandbox
  per session with dedicated compute/memory/filesystem; framework-agnostic; Responses +
  Invocations protocols; routines (public preview); long-running agents (OpenClaw,
  Hermes); autopilot agents (public preview) with Entra Agent ID, email, Teams presence,
  org chart; incoming A2A (public preview); three memory types with procedural +7–14%
  Tau-bench; tracing/eval GA later in June 2026; agent optimizer public preview in next
  30 days; Voice Live GA (prompt) / public preview (hosted); Foundry IQ GA; Foundry
  Toolkit for VS Code GA; publishing GA "next month".
- `https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry`
  — accessible. Confirmed: "Early Access Preview"; Foundry User role + RBAC rename;
  `Microsoft.BotService` registration; metadata fields; Just you / People in your
  organization scopes; Download & customize manifest; limitations (no file upload/image
  gen in M365, no Private Link, no streaming/citations); `agent.identity` requirement;
  `Azure Bot Service Contributor` for the 403. Page last updated 05/06/2026.
- `https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry`
  — accessible. Confirmed: A365 as IT admin control plane; five capabilities; Entra
  network controls + Conditional Access GA in Agent 365; auto-registration of Foundry
  agents; hosted agents pushed as autopilots, no UI, code sample only; `samples/csharp/
  FoundryA365`; E7 license + Owner + Foundry/Cognitive Services User; azd flow; 100-
  blueprint Teams Developer Portal limit. Section retitled "Create autopilots"; page last
  updated 06/03/2026.

### Section results

#### 05-build2026-and-publishing-updates (new)

- **Status**: pass
- **Attribution**: every table row, status, number, and claim carries an inline link to
  the Build 2026 blog, publish-copilot, or agent-365 source. No unsourced assertions.
- **Accuracy**: statuses and time-relative wording match the notes and live sources
  ("within ~30 days", "GA next month", "GA later in June 2026", public preview vs Early
  Access Preview). Tau-bench +7–14%, 100-blueprint limit, sample path, RBAC renames, and
  prerequisites all correct.
- **Consistency**: frontmatter uses `section_status` (promoted draft → complete);
  pipe tables have leading/trailing pipes; headings sentence case; code fences tagged
  (`azurecli`, `bash`).
- **Completeness**: satisfies all three deliverables — publishing how-to detail, Agent
  365 autopilots, and a Build 2026 at-a-glance table.
- **Issues**: none blocking. Note (non-blocking): the GA-vs-Early-Access-Preview tension
  between the Build blog ("GA next month") and the publish-copilot doc ("Early Access
  Preview") is real in the sources; the section correctly attributes each phrasing to its
  own source, which is the right handling.

#### 06-build-2026-change-log (new)

- **Status**: pass
- **Attribution**: every changelog row and the RBAC rename table are inline-sourced; the
  "Not specified in Build 2026 sources" block is correctly attributed as gaps.
- **Accuracy**: prior-state / change / new-status columns match the notes; no invented
  numbers or dates; time-relative phrasing reproduced verbatim with a re-validation caveat.
- **Consistency**: frontmatter uses `section_status` (promoted draft → complete); tables
  well-formed.
- **Completeness**: satisfies the dedicated-changelog deliverable.
- **Issues**: none blocking.

#### 01-overview-and-deployment (revised)

- **Status**: pass
- **Attribution**: new "Build 2026 updates" bullets each carry an inline Build 2026 blog
  link; GA statement sourced.
- **Accuracy**: GA-within-~30-days, framework-agnostic, dual protocols, autopilot mode
  (public preview), routines (public preview), incoming A2A (public preview) all correct.
- **Issues**: none blocking. Minor (non-blocking): the routines bullet folds long-running
  autonomous agents into the same sentence as routines; in the source these are two
  distinct capabilities (long-running support is a hosted-agent property; routines add the
  timer/schedule). Consider splitting for precision.

#### 02-persistence-isolation-identity (revised)

- **Status**: pass
- **Attribution**: three memory types, publishing identity/RBAC, the Azure AI User →
  Foundry User rename, and Agent 365 Conditional Access GA are inline-sourced.
- **Accuracy**: memory types and Tau-bench figure correct; RBAC rename correct; "Entra
  network controls + Conditional Access GA in Agent 365, applying to both Foundry-hosted
  and endpoint-hosted agents" matches the agent-365 source.
- **Issues**: none blocking.

#### 03-scalability-and-operations (revised)

- **Status**: needs-work
- **Attribution**: the new "Build 2026 operations updates" bullets are correctly
  inline-sourced (tracing/eval GA later June 2026, agent optimizer public preview within
  ~30 days, Voice Live GA/preview split, scale-to-zero), and the validation caveat points
  to the limits doc. Attribution is sound.
- **Accuracy**: Build 2026 statuses match the notes and source.
- **Blocking issue (markdown convention)**: the "Scalability dimensions" pipe table is
  malformed — it has no header row and no blank line before the separator. The paragraph
  "...four independent constraints:" is immediately followed by `|---|---|---|`. This
  violates repo table conventions, will fail markdownlint (blanks-around-tables / table
  header), and will not render as a table. Writer must add a header row (for example,
  `| Dimension | Constraint | Failure signal |`) and a preceding blank line. This defect
  pre-dates the Build 2026 content but sits in a revised section, so it is flagged now.

#### 04-multiagent-multitenant-patterns (revised)

- **Status**: pass
- **Attribution**: incoming A2A, autopilots/AI teammates, Agent 365 control plane, and
  Teams/M365 publishing distribution scopes are inline-sourced to the Build blog,
  agent-365, and publish-copilot.
- **Accuracy**: five A365 capabilities, autopilot identity attributes (Entra Agent ID,
  email, Teams presence, org chart), and the Just you / People in your organization scope
  semantics match the sources.
- **Issues**: none blocking.

#### README (index, updated)

- **Status**: pass
- **Attribution**: required-sources list includes all three new URLs; coverage themes
  list publishing, Agent 365, and Build 2026 changes.
- **Cross-references**: index lists both 05 and 06; the four cross-reference bullets
  resolve to existing files. All inter-section links across 01, 02, 04, 05, 06 resolve.
- **Issues**: none blocking. Minor (non-blocking): the README frontmatter uses `status:`
  rather than `section_status:`. The six content sections all correctly use
  `section_status`; only the index uses the older `status` key. Optional alignment.

### Update-cycle recommendation

- Promote 05 and 06 to complete (done).
- One blocking fix required before the cycle is fully clean: repair the malformed
  "Scalability dimensions" table in 03. This is a writer task (markdown structure), not a
  reviewer edit.
- Optional polish: split the routines / long-running sentence in 01, and align the README
  frontmatter key to `section_status`.
