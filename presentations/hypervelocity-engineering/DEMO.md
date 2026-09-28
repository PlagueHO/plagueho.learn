# Hypervelocity Engineering — Marginalia Demo

## Purpose

This 14–16 minute demonstration shows how one HVE practice—Research, Plan, Implement, Review (RPI)—turns user and business risk into a traceable production increment. The demo supports the HVE operating model; it is not the definition of HVE.

## Scenario

| Detail | Value |
|---|---|
| Application | [Marginalia](https://github.com/PlagueHO/marginalia), an AI-assisted narrative editor |
| Risk | User guidance and document text can contain prompt-injection instructions |
| Desired outcome | Reduce prompt-injection exposure without degrading editorial value, latency, maintainability, or testability |
| HVE ingredients | Domain expertise, user-centered outcome, proven security guidance, and AI-assisted lifecycle tools |
| Live duration | 14–16 minutes |
| Fallback | Pre-generated research, plan, changes, and review artifacts |

## Presenter framing

> We are not beginning with “write a sanitizer.” We are beginning with a risk to a user and a production system. The job is to understand the flow, choose a proportionate control, implement it consistently, and prove that it works.

## Pre-demo preparation

- [ ] Clone [PlagueHO/marginalia](https://github.com/PlagueHO/marginalia) into a clean demo workspace.
- [ ] Use a clean demo branch prepared before the session.
- [ ] Confirm the current repository build and tests pass.
- [ ] Confirm GitHub Copilot and the required HVE-Core RPI agents or skills are available.
- [ ] Increase editor, chat, and terminal font sizes for room visibility.
- [ ] Pre-run the workflow and keep known-good artifacts ready.
- [ ] Keep the completed implementation on a separate local branch for deterministic recovery.
- [ ] Remove secrets and personal data from all visible terminals, configuration, and history.

## Demonstration route

The live demonstration has two movements:

1. **Research and Plan**: Turn uncertainty into an evidence-backed implementation contract.
1. **Implement and Review**: Execute the contract and validate both behavior and intent.

Do not demonstrate installation, the Memory Agent, standalone research, or backlog management. Those paths repeat concepts without advancing this session’s HVE narrative.

## Movement 1 — Research and Plan

Target: 7 minutes.

### 1. Show the risk in the existing flow

Open the existing prompt-construction path and briefly trace:

```text
User guidance ─┐
               ├─> API boundary ─> prompt construction ─> Foundry model ─> editorial suggestions
Document text ─┘
```

Explain:

- Both inputs are untrusted.
- Structured output can constrain response shape without guaranteeing safe content.
- A production fix must balance security, user experience, cost, latency, and maintainability.

Time box: 1 minute.

### 2. Run Research

Select the current HVE-Core Research agent or skill and use:

```text
Research how to reduce prompt-injection exposure in Marginalia's analysis
pipeline.

Trace user guidance and uploaded document text from the API boundary into the
Foundry prompt construction. Identify existing controls and gaps. Compare the
code with current OWASP and Microsoft guidance. Recommend one proportionate
first production increment that preserves editorial behavior, latency,
maintainability, and testability.

Do not implement.
```

While it works, point out:

- Internal evidence: actual input paths, prompt construction, configuration, and tests.
- External evidence: authoritative security and Microsoft guidance.
- Trade-offs: the recommendation must fit this application rather than repeat a generic checklist.
- One recommendation: the output converges on a first increment.

Open the generated research artifact and highlight:

```markdown
## Recommended first increment

1. Harden the system instruction and isolate untrusted content with explicit
   delimiters.
2. Keep user guidance in the user-message boundary rather than elevating it
   into the system instruction.
3. Add boundary constraints and normalization for user-controlled fields.
4. Add adversarial and regression tests.
5. Leave managed prompt-shield integration as a measured follow-up.
```

Time box: 3 minutes. If research runs longer, switch immediately to the prepared artifact.

### 3. Run Plan

Start a fresh context when the current HVE-Core guidance recommends it, select the Plan agent or skill, and use:

```text
Create a phased implementation plan from the open prompt-injection research.

Keep the first increment localized and reversible. Include acceptance criteria,
adversarial tests, regression tests, configuration changes, and validation
commands. Link every design decision to the research evidence. Do not
implement.
```

Highlight three properties of the plan:

1. The scope is explicit.
1. Tests and production constraints are part of the work, not follow-up tasks.
1. Each decision links back to evidence.

Show a prepared excerpt if needed:

```markdown
## Phase 1 — Prompt boundary hardening

- [ ] Add explicit security instruction and untrusted-content delimiters.
- [ ] Move author guidance to the user-message boundary.
- [ ] Preserve existing editorial criteria and structured output.

## Phase 2 — Input constraints and verification

- [ ] Normalize control characters and enforce configured length limits.
- [ ] Add adversarial prompt-injection tests.
- [ ] Run targeted and full regression validation.
```

Time box: 3 minutes.

### Movement 1 transition

> Research reduced uncertainty. Planning converted the evidence into a contract. We have not written code yet, but we have already prevented several expensive wrong turns.

## Movement 2 — Implement and Review

Target: 7–9 minutes.

### 4. Run Implement

Start a fresh context when appropriate, select the Implement agent or skill, and instruct it to execute the open plan.

Focus the audience on behavior rather than generated volume:

- The implementation follows the agreed sequence.
- Changes stay localized to the identified boundaries.
- Tests arrive with the behavior.
- A durable changes artifact records what happened.
- Human approval remains available at meaningful decisions.

Show the prepared implementation if live generation would consume the time box:

```text
Prompt construction
  + explicit security instruction
  + untrusted-content delimiters
  + user guidance moved out of the system instruction

API boundary
  + configured input limits
  + control-character normalization

Verification
  + adversarial prompt-injection cases
  + editorial regression cases
```

Time box: 4–5 minutes.

### 5. Run Review

Start a fresh context when appropriate, select the Review agent or skill, and use:

```text
Review the prompt-injection hardening implementation against the open research
and plan.

Verify the threat paths, acceptance criteria, adversarial tests, regression
behavior, repository conventions, and validation results. Separate findings
introduced by this change from pre-existing issues.
```

Show that Review asks two different questions:

1. **Does it work?** Build, tests, behavior, and regressions.
1. **Does it solve the researched problem?** Threat paths, selected controls, trade-offs, and acceptance criteria.

Expected review shape:

```markdown
## Status

Complete for the first increment.

## Verified

- Untrusted guidance is no longer elevated into the system instruction.
- Document and guidance content are explicitly isolated.
- Boundary constraints are configurable and tested.
- Adversarial and regression suites pass.

## Follow-up

- Evaluate managed prompt-shield integration using measured latency, cost,
  detection quality, and operational requirements.
```

Time box: 3–4 minutes.

## Demo close

Open the four artifacts together:

```text
research -> plan -> changes -> review
```

Then connect the demonstration to all four HVE ingredients:

| HVE ingredient | Evidence in the demonstration |
|---|---|
| Multidisciplinary expertise | Security, AI, product, and application constraints shaped the decision. |
| Design thinking for value | The outcome protected editorial value and user trust, not merely a code path. |
| Production starting points | Existing architecture, tests, OWASP guidance, Microsoft guidance, and HVE-Core patterns reduced reinvention. |
| AI across the lifecycle | AI assisted investigation, planning, implementation, and independent review. |

Closing line:

> RPI made the work traceable. The HVE operating model made the result valuable, proportionate, and production-ready.

## Recovery paths

| Failure | Recovery |
|---|---|
| Agent or network latency | Show the invocation briefly, then open the prepared artifact. |
| Research exceeds three minutes | Stop waiting and use the prepared research. |
| Generated plan differs from rehearsal | Compare it with the prepared plan and discuss the missing acceptance criterion. |
| Implementation cannot finish live | Switch to the completed local branch and continue with Review. |
| Validation fails | Treat the failure as real review evidence; use the completed branch only if needed to finish the teaching sequence. |
| Product UI or command names have changed | Use the current agent picker and describe the phase by outcome rather than teaching a brittle command. |

## Presenter guardrails

- Keep the demonstration within 16 minutes.
- Never wait silently for an agent.
- Never claim that delimiters or instructions eliminate prompt injection.
- Describe the approach as layered risk reduction.
- Do not expose credentials, endpoints, tenant identifiers, or private customer information.
- Do not turn implementation output into a code-volume spectacle.
- Always finish by mapping the evidence back to all four HVE ingredients.
