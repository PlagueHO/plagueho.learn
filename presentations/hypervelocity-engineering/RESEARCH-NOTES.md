# Hypervelocity Engineering — Research Notes

Research refreshed 2026-08-30. This file distinguishes public Microsoft guidance from internal-experience material supplied for the presentation.

## Scope

The presentation teaches Hypervelocity Engineering as an engineering operating model. Forward Deployed Engineering is deliberately out of scope. HVE-Core and RPI appear only as practical examples of the “AI agents and tools across the full lifecycle” ingredient.

## Public Microsoft evidence

| Topic | Supported use in the presentation | Primary source |
|---|---|---|
| Proven starting points | The HVE Accelerators Hub provides proven starting points for AI-driven development. | [Microsoft HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/) |
| HVE-Core | Reusable agents, skills, prompts, instructions, and workflow patterns for GitHub Copilot. | [HVE-Core repository](https://github.com/microsoft/hve-core) and [documentation](https://microsoft.github.io/hve-core/docs/) |
| HVE lifecycle | AI support can span setup, discovery, product definition, decomposition, planning, implementation, review, delivery, and operations. | [HVE guide](https://microsoft.github.io/hve-core/docs/hve-guide/) |
| Design thinking | A three-space, nine-method approach connects problem evidence, solution validation, and implementation learning. | [HVE-Core Design Thinking](https://microsoft.github.io/hve-core/docs/design-thinking/) |
| RPI | Research, Plan, Implement, and Review separate investigation from execution and produce durable artifacts. | [HVE-Core RPI](https://microsoft.github.io/hve-core/docs/rpi/) |
| RPI rationale | Constraining research from implementation changes the goal from plausible code to verified truth. | [Why RPI works](https://microsoft.github.io/hve-core/docs/rpi/why-rpi/) |
| Responsible AI | Fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability guide AI system design. | [Microsoft Responsible AI](https://www.microsoft.com/ai/responsible-ai) |
| HVE-Core limitations | HVE-Core has intended uses, limitations, and a responsibility boundary with its host platform. | [HVE-Core Transparency Note](https://github.com/microsoft/hve-core/blob/main/TRANSPARENCY-NOTE.md) |

## HVE operating-model synthesis

The supplied Frontier Transformation training organizes HVE around four ingredients:

1. Tight multidisciplinary teams with deep domain expertise.
1. Design thinking methods that create business value.
1. Proven, mission-critical, production starting points.
1. AI agents and tools across the full lifecycle.

The public sources support each underlying element, but the four-ingredient framing should be presented as Microsoft training language rather than an external industry standard.

## Claims retained as internal experience

| Claim | Presentation treatment |
|---|---|
| 2–3× velocity increase | Label as indicative Microsoft internal engineering experience. Do not present as a guaranteed target. |
| 3–4 experts versus teams of 10+ | Use to illustrate reduced coordination latency, not as a universal staffing prescription. |
| 50%+ team reduction | Express through the 3–4 versus 10+ comparison; avoid implying headcount reduction is the goal. |
| 30%+ code written by AI | Use as a signal that implementation mechanics are shifting; explicitly state that code volume is not the success measure. |

The slide caveat is:

> Indicative Microsoft internal engineering experience. Outcomes vary by product, risk, team capability, and organizational context; these figures are not universal benchmarks.

## Claims intentionally removed or qualified

- Remove the previous “30% attention at 10K tokens / 1.5% at 200K tokens” visualization. Context-window ratios do not measure model attention.
- Present “context quality bounds output quality” as an engineering principle, not a direct Microsoft quotation.
- Avoid fixed HVE-Core artifact, collection, or role counts because the project is rapidly evolving and the inventory does not advance the HVE narrative.
- Describe HVE-Core as an opinionated, rapidly evolving source of patterns and learning, not a stable platform or mandatory implementation.
- Do not use the Marginalia demonstration as evidence of organization-wide velocity gains.
- Do not call the factory-maintenance scenario a public customer case study. Present it as an anonymized internal engagement example supplied by Microsoft training.

## Factory-maintenance scenario

The scenario demonstrates why backlog generation cannot substitute for direct user evidence:

- Factory workers may have greasy fingers or wear gloves, invalidating keyboard or touch-first assumptions.
- The agent may not answer the questions workers actually ask; observation and interviews reveal the real language and workflow.
- Undisclosed repair manuals create hidden knowledge gaps.
- A working prototype must be timed and costed against the existing maintenance process.

The teaching point is not the final interface. It is that design research changes problem framing, solution criteria, and backlog priorities before engineering scales the wrong assumptions.

## Responsible AI interpretation for HVE

The presentation translates public Microsoft principles into five engineering decisions:

1. **Intentional use**: Define where AI adds value and where human judgment remains required.
1. **Transparency**: Make recommendations, evidence, and actions understandable.
1. **Risk controls**: Address bias, hallucination, leakage, misuse, and failure modes with layered controls.
1. **Outcome quality**: Optimize for user and business impact rather than novelty or AI usage.
1. **Production readiness**: Build systems that are secure, observable, auditable, maintainable, and able to evolve.

These five decisions are a presentation synthesis, not a replacement for Microsoft’s six Responsible AI principles.

## Measurement model

HVE success should be discussed as a balanced system:

| Dimension | Example measures |
|---|---|
| Value | User task success, business outcome, adoption, avoided cost |
| Speed | Idea-to-evidence, evidence-to-production, feedback latency |
| Quality | Escaped defects, rework, reliability, maintainability |
| Trust | Security findings, explainability, control effectiveness, auditability |
| Learning | Assumptions validated, knowledge captured, starting points improved |

AI-generated code percentage is an input signal, not an outcome measure.

## Current reference links

- [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/)
- [HVE-Core](https://github.com/microsoft/hve-core)
- [HVE-Core documentation](https://microsoft.github.io/hve-core/docs/)
- [HVE guide](https://microsoft.github.io/hve-core/docs/hve-guide/)
- [Design Thinking](https://microsoft.github.io/hve-core/docs/design-thinking/)
- [RPI](https://microsoft.github.io/hve-core/docs/rpi/)
- [Why RPI works](https://microsoft.github.io/hve-core/docs/rpi/why-rpi/)
- [Microsoft Responsible AI](https://www.microsoft.com/ai/responsible-ai)
- [HVE-Core Transparency Note](https://github.com/microsoft/hve-core/blob/main/TRANSPARENCY-NOTE.md)
