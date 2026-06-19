---
title: Quality review - microsoft-agent-framework-build-2026
date: 2026-06-19
reviewer: research-quality-reviewer
purpose: 12-minute technical presentation
verdict: FAIL
confidence: medium
---

## Summary

- Scope reviewed: all requested output sections, `sources.md`, and sampled notes across core loop, capabilities, advanced features, orchestration, and SDK integrations.
- Overall verdict: FAIL.
- Why fail: attribution precision is inconsistent, several high-impact claims are weakly supported or unsupported, and current content volume is far beyond a 12-minute delivery format.
- Source spot-check status:
  - Passed: orchestration pattern names and Magentic terminology; Foundry and GitHub Copilot integration capability/status matrices.
  - Failed: durability claim of "99.99% recovery" is not supported by the cited Durable Task source.
  - Partial: tool-approval page extraction failed during fetch; approval mode naming in content remains unverified.

## Findings By Severity

### Critical

- Unsupported reliability statistic is presented as fact.
  - Location: `output/introduction/section.md`
  - Claim: "99.99% recovery from transient failures."
  - Risk: high credibility/regulatory risk for architecture audiences; likely to be challenged live.
  - Evidence: Durable Task source confirms checkpointing/recovery patterns, but no 99.99% metric was found.
  - Remediation: remove numeric reliability claim unless backed by a direct official benchmark URL and quote.

- Talk-fit failure: package is not consumable as a 12-minute technical session in current form.
  - Location: primarily `output/advanced-capabilities/section.md`, `output/sdk-integrations/section.md`, `output/core-components/section.md`
  - Risk: presenter overload, narrative fragmentation, and audience drop-off.
  - Evidence: multi-thousand-word sections plus many code blocks and diagrams exceed practical delivery constraints.
  - Remediation: reduce to 5-7 core messages, 2 short code snippets, 1 architecture diagram, 1 decision matrix.

### High

- Attribution granularity is inconsistent for factual statements.
  - Locations: `output/introduction/section.md`, `output/agent-harness-architecture/section.md`, `output/use-cases/section.md`, `output/sample-code-patterns/section.md`
  - Risk: claims cannot be quickly traced during review/Q&A.
  - Evidence: many factual paragraphs rely on end-of-section link bundles rather than claim-level inline attribution.
  - Remediation: add claim-adjacent citations for non-obvious facts (execution guarantees, defaults, limits, feature status).

- Component model appears over-specified relative to official framing.
  - Locations: `output/introduction/section.md`, `output/agent-harness-architecture/section.md`
  - Risk: conceptual drift from docs and confusion in technical audience.
  - Evidence: official pipeline framing emphasizes layered architecture; content presents rigid "9 components" and a broader "13 components" taxonomy as if canonical.
  - Remediation: relabel as "presentation taxonomy" or align terminology directly with source layer model.

- Approval semantics may conflate provider/runtime models.
  - Locations: `output/introduction/section.md`, `output/core-components/section.md`, `output/sample-code-patterns/section.md`
  - Risk: implementation errors when audiences apply examples across providers.
  - Evidence: Copilot permission decisions and tool-approval modes are both referenced; boundaries are not always explicit.
  - Remediation: add a short matrix separating: tool approval, runtime permission handler, and workflow HITL request/response.

### Medium

- Some code examples are illustrative but not clearly marked as pseudo/non-runnable.
  - Locations: `output/agent-harness-architecture/section.md`, `output/use-cases/section.md`, `output/sample-code-patterns/section.md`
  - Risk: copy/paste failures reduce trust.
  - Evidence: placeholder types/functions (`...`, undefined models/types) mixed with runnable-looking snippets.
  - Remediation: label snippets as "conceptual" where needed; keep exactly one runnable C# and one runnable Python sample.

- Risk posture around Magentic could be clearer.
  - Locations: `output/orchestration-patterns/section.md`, `output/advanced-capabilities/section.md`
  - Risk: overconfidence in experimental behavior.
  - Evidence: docs note Magentic caveats/untested behavior outside original design assumptions.
  - Remediation: add explicit caveat line and recommended production guardrails.

- Sources quality is strong overall but includes low-signal entries.
  - Location: `sources.md`
  - Risk: weakens evidence posture if cited in final deck.
  - Evidence: generic/supporting links (for example broad blog/video) mixed with primary technical references.
  - Remediation: mark non-authoritative sources as secondary and avoid using them for factual claims.

### Low

- Cross-references exist but section-to-section dependency can be tightened.
  - Locations: `output/orchestration-patterns/section.md`, `output/use-cases/section.md`
  - Risk: minor narrative repetition.
  - Remediation: define one canonical decision matrix section and link to it from other sections.

## Coverage Quality Assessment (What/How/Use/Sample)

- Introduction: strong "what" and "why"; weak claim-level attribution on "how" details.
- Agent harness architecture: good "how it works" with layered flow; needs clearer canonical vs presentation taxonomy.
- Core components: good breadth and code density; needs stricter separation of approval/permission mechanisms.
- Advanced capabilities: comprehensive but oversized for target session.
- SDK integrations: good comparative coverage and practical selection guidance.
- Orchestration patterns: strong fit for architecture audience and pattern-selection framing.
- Sample code patterns: useful narrative sequence; trim to fewer, verified snippets.
- Use cases: strong decision framing; reduce repetition and tighten direct source mapping for assertions.

## Remediation Plan Mapped To Section Files

| File | Required remediation |
| --- | --- |
| `output/introduction/section.md` | Remove unsupported 99.99% claim; convert "13 components" to source-aligned or explicitly presentation-defined taxonomy; add inline citations per key claim. |
| `output/agent-harness-architecture/section.md` | Align pipeline vocabulary to official layer model; tag conceptual code as conceptual; keep one verified runnable sample per language. |
| `output/core-components/section.md` | Clarify boundaries between tool approval, Copilot permission handlers, and workflow HITL; add source-adjacent citations for approval mode semantics. |
| `output/advanced-capabilities/section.md` | Cut to talk core: 1 orchestration concept, 1 persistence concept, 1 HITL concept, 1 planning caveat; move deep detail to appendix. |
| `output/sdk-integrations/section.md` | Keep capability matrices; remove or down-rank claims not explicitly sourced; keep one integration path per audience persona. |
| `output/orchestration-patterns/section.md` | Keep current structure; add explicit Magentic caveat and production guardrail note. |
| `output/sample-code-patterns/section.md` | Reduce to two verified demo snippets total (one Python, one C#); mark all others as pseudocode or move to appendix. |
| `output/use-cases/section.md` | Compress repeated architecture framing; retain one decision table and one example per deployment target. |
| `sources.md` | Tag each source as primary/secondary; avoid secondary sources for factual claims in final talk track. |

## Talk-Readiness (12-Minute Session)

Current state: not talk-ready.

Recommended trim/highlight strategy:

1. Highlight: one-slide architecture (pipeline + orchestration pattern map).
2. Highlight: one decision matrix (planning vs orchestration vs durable vs HITL).
3. Highlight: one integration slide (Copilot, Foundry, Durable, M365 with "when to use").
4. Highlight: two short code snippets max (one core loop + one approval/orchestration).
5. Trim: deep API walkthroughs, duplicate pattern examples, and long implementation variants.

Suggested timing:

1. 1.5 min: Build 2026 changes and why they matter.
2. 3 min: Agent pipeline + core component model.
3. 2.5 min: Orchestration pattern selection.
4. 2.5 min: Integrations and deployment choices.
5. 1.5 min: Production guardrails and risks.
6. 1 min: closing and Q&A handoff.

## Residual Risks And Confidence

- Residual risks:
  - Tool-approval mode naming remains partially unverified due fetch extraction failure on one source page.
  - API churn risk exists (preview/experimental features), especially in Magentic and some Foundry tool factories.
- Confidence: medium.
  - High confidence in major fail reasons (unsupported metric, talk-fit mismatch, attribution granularity issues).
  - Medium confidence on a subset of fine-grained API semantics that should be revalidated directly in latest docs before final speaker notes.
