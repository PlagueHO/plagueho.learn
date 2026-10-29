## Hypervelocity Engineering research notes

Public sources checked on 2026-10-29. These notes support the [presentation outline](./OUTLINE.md) and the separate Reveal.js deck. A live demo runbook is not yet prepared.

## Scope and source boundary

The leadership section presents HVE as an engineering operating model: a small expert multidisciplinary crew works with the customer in a tight idea, validation, engineering, and feedback loop. The four pillars make this model work. FDE is supporting delivery context. A separate optional section explains HVE-Core, followed by the agreed public teaching demo.

Private photos, transcripts, and the supplied internal-source research guide are for planning only. Do not publish those files, non-public quotations, internal customer figures, or local source paths. Public wording and original diagrams must rest on public evidence. Do not reproduce private slide designs.

Distinguish public source statements from presentation synthesis. The four-pillar structure and the concise HVE-to-FDE explanation are the presentation's framing, not a universal industry definition.

## Narrative alignment revision

The first outline covered themes without preserving their argument. The next revision restored the history but delayed the central definition. The user's latest direction establishes the operating model and its continuous customer-and-engineering loop as the thesis. History explains the need for change; it is not the thesis itself.

The revised outline follows this progression:

1. Define HVE as an operating model, not simply faster coding with AI.
1. Show idea -> validation -> engineering -> feedback as a continuous loop, with the customer inside it.
1. Briefly explain the software evolution, shared playbook, co-engineering, and capability-transfer background.
1. Explain why new AI capabilities exposed existing delivery weaknesses and why coding-only improvement is insufficient.
1. Connect experimentation and the four pillars to those delivery problems.
1. Explain how a small expert crew, Design Thinking, production-ready accelerators, and lifecycle-wide AI shorten the shared loop.
1. Preserve the expertise needed to review and validate generated outputs; AI amplifies people rather than replacing engineering discipline.
1. Keep security, observability, testing, and continuous integration/deployment in the starting point.
1. Use frequent customer decisions, small increments, and measured outcomes to shorten time toward production value.
1. Separate the enduring operating model from its changing enabling technology.

This is a planning synthesis in original wording. It is not a public account of private experiments or their results. Use the public sources below for publishable claims; the private references establish the requested narrative emphasis, not permission to publish their content.

The revised leadership section has 20 sparse slides over 30 minutes. The optional practical section has 10 slides over 30 minutes, followed by five demo support slides. Context management now has a leadership slide; the practical section applies it instead of introducing it for the first time.

The optional DT Coach, DT-to-RPI, installation, and manufacturing demo sequence is our agreed extension. Do not imply that it reconstructs the speakers' presentation. The 35-slide Reveal.js draft implements the revised operating-model narrative, with the customer-and-expert-crew loop repeated across the leadership story and demo recap.

The Q&A supplies qualifications rather than a second main narrative: selective toolkit adoption, instruction freshness, review responsibility, organizational constraints, capability transfer, cost visibility, and uses beyond code. Do not convert an unanswered evaluation question into an assurance that the toolkit meets a standard.

### Use of the supplied guide

The user supplied the fundamental message and a secondary research guide. The user-directed message sets the presentation's emphasis. The guide adds planning context on expert teams, customer co-creation, preparation, small increments, reuse, and feedback.

The guide cites internal material without public source links. Its customer descriptions include speculation. Its staffing and duration examples do not define a universal model. Its claim that information is shareable does not establish permission. Do not publish its customer stories, internal assets, figures, forecasts, or organizational details.

The primary onboarding material cited by the guide was not supplied directly. Do not state that this review independently verified its wording. Use the user's approved expert-amplification message and the public engineering sources for the public narrative.

Adopt these distinctions in the outline:

- Small and expert describes how the crew works; it is not a fixed headcount or a workforce-reduction target.
- AI across the lifecycle means useful assistance under expert direction, not a requirement to automate every task or put an LLM in the product.
- Production-ready accelerators remove repeated setup work and include engineering controls; they do not prove that the new business solution is ready for production.
- Short cycles aim to compress time from idea toward production; they do not guarantee a five-day production delivery or require a fixed sprint ceremony.
- Customer collaboration includes problem framing, validation, design choices, working increments, and acceptance, not only a final demonstration.
- Prototype scope and readiness must be explicit. Do not teach the guide's suggestion that security or compliance can simply be deferred until after prototyping.
- Readiness includes customer time, bounded scope, data, access, maintained foundations, and known dependencies. Make these conditions visible without turning them into a rigid engagement template.

Keep the recurring loop in the optional DT-to-RPI route. It is one pass with reviewed evidence and return paths, not a claim that research, engineering, and customer feedback happen only once.

### Quantitative cautions

Preserve the whole-system and cumulative-error lessons without copying unsupported figures or incorrect arithmetic. Amdahl's law needs explicit workload assumptions for a numerical example. Multiplying stage success probabilities needs a defined success condition and suitable dependency assumptions. Neither calculation establishes real project performance.

Do not repeat a universal exponential context-cost claim, a guaranteed first-pass success claim, or the suggestion that passing tests proves production correctness. Explain relevant context, executable checks, and human review as controls, not guarantees.

## Public evidence map

| Topic | Supported use | Primary source |
|---|---|---|
| Microsoft FDE delivery model | Experts embedded with customers to co-design, deploy, and improve systems tied to business outcomes | [Microsoft Frontier Company](https://www.microsoft.com/en-us/frontier-company) |
| FDE teams and capability transfer | Multidisciplinary delivery, operational responsibility, co-engineering, and customer capability transfer; attribute as Microsoft's perspective | [Microsoft FDE perspective](https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/) |
| Engineering fundamentals | Shared context, high quality, incremental customer value, and collective ownership | [ISE Engineering Fundamentals Playbook](https://microsoft.github.io/code-with-engineering-playbook/) |
| Reusable production starts | Proven starting points for AI-driven development | [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/) |
| Current HVE-Core toolkit | Agents, executable skills, instructions, and structured workflows; do not copy old prompt inventories | [HVE-Core documentation](https://microsoft.github.io/hve-core/docs/) |
| Lifecycle and roles | Assistance across delivery stages and team responsibilities | [HVE guide](https://microsoft.github.io/hve-core/docs/hve-guide/) |
| CLI plugin behavior | Marketplace registration, installation, updates, discovery, and instruction-loading limits | [CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/) |
| Design Thinking | Three spaces, nine methods, DT Coach, and supported handoffs | [Design Thinking guide](https://microsoft.github.io/hve-core/docs/design-thinking/) |
| Manufacturing teaching scenario | Dashboard request reframed as knowledge accessibility across shifts | [Using DT methods together](https://microsoft.github.io/hve-core/docs/design-thinking/using-together/) |
| Handoff contract | Three exits, confidence markers, research entry, and return paths | [DT-to-RPI integration](https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/) |
| Handoff procedure | Generate and review artifacts before research; tutorial illustrates the implementation-space exit | [Handoff tutorial](https://microsoft.github.io/hve-core/docs/design-thinking/tutorial-handoff-to-rpi/) |
| RPI behavior | Evidence readiness, research, plan and critique, approved implementation, review, follow-up, and context management | [RPI workflow](https://microsoft.github.io/hve-core/docs/rpi/) |
| Responsible AI | Fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability | [Microsoft Responsible AI](https://www.microsoft.com/ai/responsible-ai) |
| Delivery measurement | Throughput and instability measures interpreted at application or service level | [DORA metrics](https://dora.dev/guides/dora-metrics/) |

The FDE sources support the delivery relationship, not an exclusive claim that FDE requires this particular toolkit. The HVE-Core sources describe a current implementation, not a fixed platform that defines the method.

## Four-pillar teaching synthesis

| Pillar | Meaning to preserve |
|---|---|
| Multidisciplinary teams | A small expert crew with customer participation, informed decisions, and shared ownership |
| Design thinking | Establish actual business value through customer and user evidence throughout the loop |
| Reusable accelerators | Adapt production-ready foundations with security, observability, tests, and CI/CD already included |
| AI tooling | Amplify the crew across the lifecycle while retaining expert review and validation |

Use this structure to explain the operating model and make HVE concrete behind FDE. Explain the model before the tool. Customer collaboration and continuous feedback connect all four pillars. Do not turn team composition into a staffing formula or make headcount reduction the outcome.

The leadership section can discuss AI-assisted delivery without requiring AI in the delivered solution. This is a teaching distinction, not a claim that Microsoft Frontier Company accepts every type of non-AI engagement.

## Current CLI plugin limits

The installation demo must follow the current CLI plugin guide rather than the old extension-first walkthrough:

- Register `microsoft/hve-core` as the marketplace and install `hve-core@hve-core`.
- The documented registration tracks `main`. It has no release gate or release attestation.
- Stable and PreRelease are VS Code extension channels, not CLI plugin channel choices.
- Marketplace catalog refresh and installed-plugin update are separate operations.
- Agents and skills are discoverable after installation.
- Plugin instruction files are available through explicit references. The CLI does not auto-apply their path patterns as repository instructions.
- The guide documents shell commands and the interactive `/plugin` entry point. Verify exact interactive marketplace syntax against the installed CLI during demo preparation.
- Distinguish direct phase skills from explicit custom-agent selection. Do not claim that a skill silently switches the CLI into an agent mode.

Installed CLI shell help confirms the plugin and marketplace command surface. No HVE-Core installation or interactive marketplace rehearsal has been performed for this content draft. Recheck exact slash syntax before recording commands or screenshots.

## Manufacturing tutorial and selected DT exit

Use the public tutorial's quality-dashboard request to introduce the knowledge-accessibility problem across shifts. Treat its observations and outcomes as supplied teaching material, not a customer case or findings gathered live.

The selected route stops DT after:

1. Scope Conversations.
1. Design Research.
1. Input Synthesis.

Use the *Problem Statement Complete* handoff. Carry the problem statement, stakeholder map, scope, research themes, constraints, and assumptions into research. Preserve `validated`, `assumed`, `unknown`, and `conflicting` confidence markers.

Only mark a tutorial item as validated relative to the supplied scenario evidence. Do not imply new interviews or real user validation occurred during the demonstration. Missing evidence must remain visible.

All three DT exits enter `rpi-research`. Later exits supply more evidence; they do not bypass research. The linked handoff tutorial illustrates Methods 7-9, so do not copy its later-stage artifact names or readiness claim into the Methods 1-3 demonstration.

The problem-statement exit leaves broad questions about solution approaches, technology options, and feasibility. A voice-guided repair system is a later tutorial concept, not a predetermined outcome of the selected exit. Return to DT if research invalidates the framing or reveals missing stakeholders.

## Current RPI behavior

- Assess whether the existing evidence is adequate before doing new research.
- Use the DT handoff as research input and investigate actual gaps. Do not discard it and recreate the same evidence.
- Planning records sequenced work, requirements, dependencies, acceptance criteria, and a critique disposition.
- Implementation follows approved work and records real changes and validation.
- Review compares the implementation evidence with requirements and decisions. Keep completed execution separate from acceptance.
- Follow-up routes defects, decisions, evidence gaps, and residual work to the correct next action.
- Direct phase skills and the user-selected RPI Agent are different entry surfaces.
- A new chat or `/clear` can improve clarity. It does not require restarting the lifecycle or repeating adequate research.
- The demo intentionally shows the full process. Do not imply every task must run every phase.

Use current `rpi-*` skills instead of the old `task-*` prompt-command walkthrough. Verify exact names, paths, and host behavior again during demo preparation.

## Content limits applied to the slide draft

- Remove the vibe-coding comparison. Explain delivery constraints without a caricature.
- Remove private customer savings figures and internal productivity, staffing, and AI-code percentages.
- Remove fixed tool inventory counts that do not help explain the method.
- Do not use prompt-to-context token ratios as measured model attention.
- Do not claim that context cost always grows exponentially.
- Do not present universal context-reset rules or arbitrary line-count thresholds for RPI.
- Avoid unsupported coding-time percentages. A delivery-flow illustration does not need a numerical claim.
- If an Amdahl's law example is added later, label its assumed workload fractions and calculate the complete system effect correctly.
- Do not describe tests or agent review as proof that every requirement or production risk is covered.
- Do not treat reuse, installation, a generated artifact, or a successful demo as a production-readiness guarantee.
- Remove the Marginalia and separate backlog demonstrations from the new main route.

The Reveal.js deck applies these limits. The original Slidev deck and its demo script are preserved separately and are not the runbook for this route.

## Responsible AI and measurement

Use Microsoft's six published Responsible AI principles accurately. Practical questions about intended use, transparency, risk controls, and operations are teaching aids, not replacement principles.

Select measures that test the desired outcome and expose the next delivery constraint:

| Dimension | Example measures |
|---|---|
| Value | User task success, business outcome, adoption, avoided cost |
| Speed | Idea to evidence, evidence to production, waiting time |
| Quality | Escaped defects, rework, reliability, maintainability |
| Trust | Security findings, control effectiveness, accountable review |
| Learning | Assumptions tested, decisions captured, starting points improved |
| Cost | Total task cost, operational cost, AI usage, and rework together |

AI usage and generated code volume are not success measures by themselves. DORA measures can support delivery analysis; do not replace them with a tool-adoption target. Apply them in the context of the application or service. Keep SPACE as an optional measurement framework, not a new HVE-specific metric set.

## Remaining preparation

- Agree demo and Q&A allocations separately from the two 30-minute sections.
- Select a bounded implementation outcome that follows the actual problem-space handoff and research.
- Prepare labelled tutorial evidence and fallback artifacts without inventing interviews or test results.
- Verify the installed CLI and plugin behavior before writing the final runbook.
- Refine visual design separately from this content draft.
- Prepare a new runbook and live artifacts in a separate demo-preparation step.
