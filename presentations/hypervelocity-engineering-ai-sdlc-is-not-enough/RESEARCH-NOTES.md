## Hypervelocity Engineering research notes

Public evidence and claim limits for the Reveal.js presentation. The approved slide sequence and content are in [OUTLINE.md](./OUTLINE.md). This file records source support and version-sensitive HVE-Core behavior; slide-specific presenter notes remain in `slide-meta.mjs`. Public sources were checked on 2026-10-29, with focused narrative checks on 2026-10-30.

## Scope and source boundary

The leadership section presents HVE as an engineering operating model: a small expert multidisciplinary crew works with the customer in a tight idea, validation, engineering, and feedback loop. The four pillars make this model work. FDE is supporting delivery context. A separate section, Diving deeper into HVE-Core, explains the toolkit, followed by the agreed public teaching demo.

Private photos, transcripts, and the supplied internal-source research guide are for planning only. Do not publish those files, non-public quotations, internal customer figures, or local source paths. Public wording and original diagrams must rest on public evidence. Do not reproduce private slide designs.

Distinguish public source statements from presentation synthesis. The four-pillar structure and the concise HVE-to-FDE explanation are the presentation's framing, not a universal industry definition.

## Narrative and scope

The deck presents HVE as an operating model for shared ownership, continuous value validation, reusable expertise, and expert-led AI support. It distinguishes AI-assisted delivery from an AI-powered product and keeps customer evidence, human judgment, and required assurance visible.

The 41-slide deck has a locked leadership section (slides 1-23), a deeper HVE-Core section (slides 24-36), and demo support (slides 37-41). The deeper section is a practical extension, not a reconstruction of the source presentation. Further HVE-Core refinement and speaker-note work are tracked separately.

### Use of the supplied guide

The initial brief sets the presentation's emphasis. A secondary research guide adds planning context on expert teams, customer co-creation, preparation, small increments, reuse, and feedback.

The guide cites internal material without public source links. Its customer descriptions include speculation. Its staffing and duration examples do not define a universal model. Its claim that information is shareable does not establish permission. Do not publish its customer stories, internal assets, figures, forecasts, or organizational details.

The primary onboarding material cited by the guide was not supplied directly. Do not state that this review independently verified its wording. Use the user's approved expert-amplification message and the public engineering sources for the public narrative.

Adopt these distinctions in the outline:

- Small and expert describes how the crew works; it is not a fixed headcount or a workforce-reduction target.
- AI across the lifecycle means useful assistance under expert direction, not a requirement to automate every task or put an LLM in the product.
- Reusable accelerators can carry reviewed expertise across roles. They need maintenance, task-specific adaptation, and suitable checks. Reuse does not prove that a business solution is ready for production.
- Short cycles aim to compress time from idea toward production; they do not guarantee a five-day production delivery or require a fixed sprint ceremony.
- Customer collaboration includes problem framing, validation, design choices, working increments, and acceptance, not only a final demonstration.
- Prototype scope and readiness must be explicit. Do not teach the guide's suggestion that security or compliance can simply be deferred until after prototyping.
- Readiness includes customer time, bounded scope, data, access, maintained foundations, and known dependencies. Make these conditions visible without turning them into a rigid engagement template.

Keep the recurring loop in the DT-to-RPI route of the deeper section. It is one pass with reviewed evidence and return paths, not a claim that research, engineering, and customer feedback happen only once.

### Quantitative cautions

Do not claim that coding was universally the slowest part of delivery for 30 years. The source talk itself emphasizes substantial non-coding work. Explain the changed constraint without rewriting industry history. Likewise, "six sprints in a few hours" is not a verified public result or a comparison of equal production scope.

Agile and DevOps already support short feedback loops, shared ownership, and continuous delivery. They overlap with cloud adoption rather than following it in a fixed sequence. The problem is waiting and poor coordination in a specific implementation, not a requirement of Agile, DevOps, or a two-week planning period.

Preserve the whole-system and cumulative-error lessons without copying unsupported figures or incorrect arithmetic. Amdahl's law needs explicit workload assumptions for a numerical example. Multiplying stage success probabilities needs a defined success condition and suitable dependency assumptions. Neither calculation establishes real project performance.

Do not repeat a universal exponential context-cost claim, a guaranteed first-pass success claim, or the suggestion that passing tests proves production correctness. Explain relevant context, executable checks, and human review as controls, not guarantees.

## Public evidence map

| Topic | Supported use | Primary source |
|---|---|---|
| Microsoft FDE delivery model | Experts embedded with customers to co-design, deploy, and improve systems tied to business outcomes | [Microsoft Frontier Company](https://www.microsoft.com/en-us/frontier-company) |
| FDE teams and capability transfer | Multidisciplinary delivery, operational responsibility, co-engineering, and customer capability transfer; attribute as Microsoft's perspective | [Microsoft FDE perspective](https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/) |
| Engineering fundamentals | Shared context, high quality, incremental customer value, and collective ownership | [ISE Engineering Fundamentals Playbook](https://microsoft.github.io/code-with-engineering-playbook/) |
| Code productivity versus delivery performance | DORA 2024 reports individual productivity benefits alongside delivery stability and throughput tradeoffs; use as a dated finding, not a universal causal rule | [DORA 2024 findings](https://dora.dev/research/2024/dora-report/) |
| Reusable production starts | Proven starting points for AI-driven development | [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/) |
| Current HVE-Core toolkit | Agents, executable skills, instructions, and structured workflows; do not copy old prompt inventories | [HVE-Core documentation](https://microsoft.github.io/hve-core/docs/) |
| Toolkit limits and human judgment | Current README retains human responsibility and describes a rapidly changing framework to evaluate as patterns and learning, not a stable platform or production dependency | [HVE-Core README](https://github.com/microsoft/hve-core#readme) |
| Lifecycle and roles | Assistance across delivery stages and team responsibilities | [HVE guide](https://microsoft.github.io/hve-core/docs/hve-guide/) |
| Documented role paths | Role-specific entry points plus cross-role utilities, not a fixed team roster or complete business-wide coverage | [HVE-Core role index](https://github.com/microsoft/hve-core/blob/main/docs/hve-guide/roles/README.md) |
| CLI plugin behavior | Marketplace registration, installation, updates, discovery, and instruction-loading limits | [CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/) |
| Design Thinking | Three spaces, nine methods, DT Coach, and supported handoffs | [Design Thinking guide](https://microsoft.github.io/hve-core/docs/design-thinking/) |
| Manufacturing teaching scenario | Dashboard request reframed as knowledge accessibility across shifts | [Using DT methods together](https://microsoft.github.io/hve-core/docs/design-thinking/using-together/) |
| Handoff contract | Three exits, confidence markers, research entry, and return paths | [DT-to-RPI integration](https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/) |
| Handoff procedure | Generate and review artifacts before research; tutorial illustrates the implementation-space exit | [Handoff tutorial](https://microsoft.github.io/hve-core/docs/design-thinking/tutorial-handoff-to-rpi/) |
| RPI behavior | Evidence readiness, research, plan and critique, approved implementation, review, follow-up, and context management | [RPI workflow](https://microsoft.github.io/hve-core/docs/rpi/) |
| Responsible AI | Fairness, reliability and safety, privacy and security, inclusiveness, transparency, and accountability | [Microsoft Responsible AI](https://www.microsoft.com/ai/responsible-ai) |
| Delivery measurement | Throughput and instability measures interpreted at application or service level | [DORA metrics](https://dora.dev/guides/dora-metrics/) |

The FDE sources support the delivery relationship, not an exclusive claim that FDE requires this particular toolkit. The HVE-Core sources describe a current implementation, not a fixed platform that defines the method.

The ISE playbook and FDE perspective support an experience-based introduction. They do not show that ISE invented every practice or prove that this four-pillar grouping guarantees outcomes.

The public findings support the whole-system argument. They do not prove the full historical narrative, the independent effect of each pillar, or a necessary-and-sufficient formula. These remain teaching synthesis. HVE-Core can accelerate processes; that does not make it a production solution foundation. Installing it does not supply infrastructure, customer evidence, authority, or readiness.

The leadership measures track changed responsibilities and practices, not tool access alone. Identify an actual wait and its owner before seeking a change in participation, capacity, escalation, or policy. Some organizations already review quickly. Keep the manufacturing illustration separate from evidence of organizational transformation; no public change case or measured result is asserted here.

## Slide content boundaries

The approved outline is the source of truth for the four pillars and role examples. The pillar grouping is this presentation's teaching synthesis, not an external standard or a claim of complete toolkit coverage. Keep public source statements separate from illustrative examples.

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

Installed CLI shell help confirms the plugin and marketplace command surface. The outline does not claim that installation or interactive marketplace behavior was rehearsed. Verify exact slash syntax before recording commands or screenshots.

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

## Follow-up scope

Further refinement of the deeper HVE-Core section and speaker notes is tracked in separate issues. Recheck CLI plugin, Design Thinking Coach, and RPI behavior against the official documentation before demo rehearsal. Update the runbook when rehearsal or verified behavior changes its instructions.
