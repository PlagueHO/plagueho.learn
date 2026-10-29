## Hypervelocity Engineering presentation outline

### Metadata

| Field | Value |
|---|---|
| Title | Hypervelocity Engineering |
| Subtitle | Expert teams. AI throughout. Customers in the loop. |
| Presenter | Daniel Scott-Raynsford |
| Audience | Technical leaders, engineering managers, and senior engineers |
| Format | Standalone leadership section, optional HVE-Core deep dive, then separate demos |
| Content duration | 30 minutes leadership + 30 minutes optional deep dive |
| Demo and Q&A duration | Separate allocations; not yet set |
| Last updated | 2026-10-29 |
| Status | Operating-model narrative implemented in the Reveal.js slide draft |

The Reveal.js deck implements this 35-slide outline: 20 leadership slides, 10 optional HVE-Core slides, and five demo support slides. `deck.mjs` holds the sparse visible content, original diagrams, public sources, and speaker notes. The original [Slidev presentation](../hypervelocity-engineering/slides.md) remains unchanged.

## Audience outcome

Attendees can explain HVE as an engineering operating model, not simply faster coding with AI. They can describe how an expert team and its customer use the four pillars to shorten the continuous loop from idea to validated production value. They can identify what must change in their own operating model and select one workflow for a measured adoption experiment.

The optional section explains how HVE-Core supports the methodology today. The demos connect problem understanding to a bounded implementation through one public teaching scenario.

## Narrative thesis

HVE is an engineering operating model in which a small, expert, multidisciplinary team works with the customer to move from idea toward production in radically compressed timescales. AI assists throughout the lifecycle. Design Thinking keeps the work focused on business value. Production-ready accelerators remove repeated setup work.

The fundamental shift is a tight continuous loop: idea -> validation -> engineering -> feedback -> next idea. The customer is part of the crew throughout, not an audience waiting for a final demonstration. Each loop creates evidence and informs the next decision; accepted increments move toward production.

AI amplifies expert people; it does not replace engineering discipline or the expertise needed to review and validate generated outputs. Security, observability, testing, and continuous integration/deployment belong in the starting point. Fast prototypes and production-ready systems remain different outcomes.

The four pillars explain how this operating model works. HVE makes the delivery approach behind Forward Deployed Engineering (FDE) concrete, but FDE terminology is supporting context, not the main message. HVE-Core is one current enabling toolkit, not the operating model itself.

Compressed timescales are the intended effect of changing the whole operating model, not a fixed delivery promise or a reason to postpone controls. Scope, access, data, customer availability, and organizational dependencies affect the result. Measure the actual cycle time and value.

Use the public [Microsoft Frontier Company](https://www.microsoft.com/en-us/frontier-company) description and [Microsoft FDE perspective](https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/) for context. Do not claim that every organization defines FDE in the same way.

## Narrative alignment

State the operating model and its continuous loop first. Then use the delivery history to explain why it became necessary. The four pillars are the connected mechanisms that make the loop work, not four separate topics or a list of tools.

| Story movement | Slides | Purpose |
|---|---|---|
| The fundamental shift | 1-2 | Establish an expert team amplified by AI, with the customer inside a tight idea, validation, engineering, and feedback loop |
| How we got here | 3-4 | Briefly connect packaged software, cloud, the shared engineering playbook, co-engineering, and capability transfer |
| Why the established approach needed to change | 5-8 | Connect AI opportunity, speed without sufficient controls, existing delivery weaknesses, whole-system constraints, and experimentation |
| The response: four connected pillars | 9-12 | Explain how a small expert team, Design Thinking, and production-ready foundations support the shared loop |
| What AI-assisted delivery requires | 13-16 | Explain lifecycle-wide assistance, explicit project knowledge, focused task context, executable checks, and human judgment |
| How the way of working changes | 17-18 | Connect shorter learning loops to production value and measurement, not code volume |
| What lasts and what changes | 19-20 | Reassemble the method, distinguish it from its enabling technology, and close with a leadership action |
| Optional practical extension | 21-35 | Explain HVE-Core and the selected demo route without presenting either as the original talk's main argument |

Keep co-engineering and capability transfer together on slide 4. It supplies the focused FDE relationship before the four pillars. Do not start a separate debate about job titles.

The opening history is a short public framing, not a claim to have worked on the speakers' projects. Do not reproduce private organizational dates, project counts, results, or anecdotes. Explain the engineering lessons in original wording with public sources.

The distinction between AI in a product and AI in delivery belongs in the AI opportunity slide and its notes. It is an important qualification, but not the opening thesis. Context management, expert validation, and engineering discipline belong in the leadership talk, not only in the optional toolkit section.

Customer participation must recur in problem framing, validation, working increments, feedback, and acceptance. Do not confine it to the history slide. Use the continuous-loop visual on slides 2, 9, 17, 19, and 20 so the audience can connect the pillars to the operating model.

## Learning objectives

1. Explain HVE as an engineering operating model, not simply faster coding with AI.
1. Describe the continuous idea, validation, engineering, and feedback loop with the customer inside it.
1. Explain how the four pillars shorten that loop and keep it focused on business value.
1. Explain why AI amplifies a small expert team rather than replacing its expertise or accountability.
1. Keep security, observability, continuous integration/deployment, testing, and Responsible AI in the starting point and throughout delivery.
1. Distinguish the enduring method from the changing HVE-Core toolkit.
1. Define a measured adoption experiment based on outcomes, quality, time, and cost.
1. In the optional section, explain how DT Coach and RPI carry evidence into controlled change.

## Section structure and timing

| Section | Slides | Duration | End condition |
|---|---|---:|---|
| A: HVE leadership section | 1-20 | 30 min | Complete leadership talk with an adoption action |
| B: optional HVE-Core deep dive | 21-30 | 30 min | Practical concepts understood before live work |
| C: separate demos | 31-35 | Not yet set | Installation, problem understanding, handoff, RPI, and recap |
| Questions and reference material | Separate route | Not yet set | Does not consume the two content allocations |

All HVE-Core-specific explanations, setup, commands, and demonstrations follow the leadership close. A presenter can stop after slide 20 or navigate directly to questions or demos. Keep leadership and practical resources accessible from their respective sections.

The revised leadership section uses more slides to preserve the story without making individual slides dense. It does not extend the 30-minute allocation. The optional section combines overlapping context, review, and cost material into fewer practical slides because their general principles now have proper space in the leadership talk.

## Four pillars

Use the same short names throughout. Explain the longer meaning once.

| Pillar | Meaning | Delivery constraint addressed |
|---|---|---|
| Multidisciplinary teams | A small expert crew with customer participation, deep domain knowledge, and shared decisions | Lost context and delay between disciplines or between the team and customer |
| Design thinking | Validate business value with users throughout idea, solution, and implementation decisions | Building a requested solution without understanding the need |
| Reusable accelerators | Production-ready starting points with security, observability, tests, and CI/CD built in; adapt and validate them | Repeated setup work and controls added too late |
| AI tooling | Amplify the expert team across the lifecycle, with informed human review and validation | Treating coding as the only activity that can improve |

These are connected parts of the operating model, not four HVE-Core feature groups. Customer collaboration and tight feedback loops connect all four; they are not an optional fifth tool. Team composition follows the problem. Keep the small, expert team emphasis without prescribing a headcount or a reduction target.

## Part A: HVE leadership section

The 20 slides total 30 minutes, including transitions. A separate Q&A slot is not included.

| Slide | Title | Main message | Visual | Minutes |
|---|---|---|---|---:|
| 1 | HVE changes how we engineer, not just how fast we code | Introduce the operating model: a small expert team, amplified by AI, working with the customer toward production value. Mark HVE-Core as optional. | Expert crew and customer, with AI extending their capability | 1 |
| 2 | The customer is part of the continuous loop | Establish idea -> validation -> engineering -> feedback as a tight repeating loop. Work with the customer at every step; shorten the path toward production without skipping validation or controls. | Customer inside the loop, with accepted increments moving toward production | 1 |
| 3 | New capabilities, enduring engineering discipline | Briefly connect packaged software, cloud, and AI. Shared engineering playbooks made quality repeatable. HVE changes the operating model while retaining those fundamentals. | Short evolution timeline above a continuous engineering foundation | 1.5 |
| 4 | Co-engineer with the customer, then leave capability behind | Explain shared problem solving, frequent customer decisions, and capability transfer. Connect this delivery motion to FDE without making the job title the thesis. | One shared crew and artifacts, with customer ownership continuing after the engagement | 1 |
| 5 | AI opportunity is not yet business value | New capabilities make more solutions feasible. Start from the business need, not a request to add AI. Distinguish AI in the solution from AI in delivery; an LLM is not always needed in the product. | Business need to solution choice to observed outcome | 1.5 |
| 6 | Faster creation exposed existing weaknesses | Plausible output can conceal unclear requirements, architecture drift, lost context, and controls added too late. AI amplifies these weaknesses rather than inventing them. | Small delivery gaps expanding as output grows | 1.5 |
| 7 | Improve the whole delivery system | Coding is only one part of delivery. Requirements, decisions, deployment, and operations still constrain production value. Introduce Amdahl's law qualitatively, without unsupported workload percentages. | End-to-end flow with coding highlighted as one segment | 1.5 |
| 8 | Test the way of working, not just the tool | Compare delivery approaches and inspect where work stalls. Connect each observed failure mode to a response: validate the problem, share ownership, make constraints explicit, reuse foundations, involve specialists early. | Failure mode to practice to evidence loop | 1 |
| 9 | Four pillars make the loop work | Present the pillars as the connected response to delivery problems. Show how each shortens the customer-and-engineering loop. AI tooling alone is not HVE. | Four pillars supporting the shared continuous loop | 1.5 |
| 10 | Pillar 1: a small expert crew, amplified by AI | Replace serial handoffs with shared work across disciplines and with the customer. AI broadens contribution; domain expertise, security and Responsible AI participation, and the ability to validate outputs remain essential. | Expert disciplines and customer around one problem, with AI extending their reach | 2 |
| 11 | Pillar 2: validate business value with the customer | Meeting a feature request is not the same as solving the problem. Use Design Thinking across problem, solution, and implementation spaces. Customer and user evidence can change scope, direction, or the decision to continue. | Three spaces with repeated customer validation and return paths | 2 |
| 12 | Pillar 3: production foundations from the start | Use production-ready accelerators to remove repeated setup work. Build security, observability, tests, and CI/CD into the baseline. Adapt and verify it for the actual system; an accelerator does not make every new increment production-ready. | Built-in engineering foundation below the smallest useful business increment | 1.5 |
| 13 | Pillar 4: AI throughout the lifecycle | Assist research, requirements, design, architecture, implementation, testing, review, and operations. The expert crew directs and validates the work. AI reduces effort throughout the loop, not only in coding. | Continuous loop with AI assistance and expert decisions throughout | 1.5 |
| 14 | Make project knowledge explicit | Agents need the actual system's requirements, schemas, architecture, constraints, stakeholders, and reviewed evidence. Human-vetted summaries preserve decisions; plausible guesses do not. Keep sensitive source material in approved locations. | Missing knowledge leading to guesses versus approved knowledge guiding work | 2 |
| 15 | Give each task the context it needs | Separate durable project knowledge from the current task's working context. Select relevant evidence, separate unrelated work, and save decisions for reuse. Larger context is not automatically better; avoid universal cost formulas. | Controlled knowledge store feeding a focused task, with decisions written back | 1.5 |
| 16 | Expert validation is part of the operating model | People need the expertise to review and validate generated requirements, designs, tests, and code. Combine executable checks with risk-based expert review and customer acceptance. AI review supports that responsibility; it does not replace it. | AI-assisted output to checks, expert validation, and customer acceptance | 2 |
| 17 | Tighten the loop, not the deadline | Think big and start with a small useful increment. Use short spikes, disposable prototypes, and frequent customer feedback to choose the next step. Aim for radically shorter idea-to-value cycles, not longer hours, skipped controls, or a fixed sprint length. | The same idea, validation, engineering, and feedback loop with shorter waits | 1.5 |
| 18 | Measure production value and the next constraint | Track time to value, quality, reliability, team experience, and total cost. Code volume, prompts, AI-written percentage, and token use are not success measures. Retain relevant DORA or SPACE measures and expose review queues. | Outcome measures beside the next delivery constraint | 1.5 |
| 19 | Keep the operating model; evolve the tools | Reassemble the expert crew, customer, four pillars, continuous loop, and built-in discipline. Tools and models can change. HVE-Core supports this model; it does not define or replace it. | Shared loop and durable principles above a replaceable enabling stack | 1.5 |
| 20 | Make one customer-and-engineering loop work | Baseline a bounded workflow. Form the crew, secure customer time, access, data, and a maintained starting point. Compare value and cycle time, remove approval delays, and capture learning. Leave capability, not dependence on a visiting team. | One shared loop, with readiness conditions and leadership support | 1.5 |

The sequence is deliberate: operating model and loop, short origin, pressure, failure modes, whole-system limit, experiment, four-pillar mechanisms, expert practice, evidence, and synthesis. History supports the argument; it must not delay the definition of HVE. Do not reduce the story to a generic AI productivity pitch or a sequence of tools.

Slide 19 is the final composition view, not a new list of ideas. Bring back rapid iteration, built-in quality, workflow redesign, durable artifacts, engineering foundations, measured outcomes, and subject-matter expertise. Explain each earlier; keep this synthesis sparse.

## Part B: optional HVE-Core deep dive

The 10 slides total 30 minutes. This is our practical extension, not a reconstruction of the speakers' main presentation. It applies the leadership principles through a current toolkit before the separate live demonstrations.

| Slide | Title | Main message | Visual | Minutes |
|---|---|---|---|---:|
| 21 | Optional: HVE-Core deep dive | Establish the section boundary. The toolkit supports the method; it is not mandatory. | Methodology above the tool layer | 1 |
| 22 | Curated practices, not a replacement methodology | Explain agents, skills, instructions, and workflows. Map them to team needs and show selective adoption alongside existing tools. Avoid inventories and production guarantees. | Lifecycle-to-capability map with responsibilities | 4 |
| 23 | Apply legibility and focused context in a repository | Show a public example of requirements, architecture, standards, decisions, and scoped task evidence. Check freshness and access. Apply the principles from slides 14-15 rather than repeat them abstractly. | Repository evidence to bounded task to durable artifact | 3 |
| 24 | Support design thinking without replacing users | Use DT Coach to support the customer-and-team loop through scope, research planning, and synthesis. Review findings against supplied or real evidence; an agent does not replace observation, interviews, or customer decisions. | User evidence to reviewed synthesis to a testable concept, with a customer return loop | 3 |
| 25 | Carry Design Thinking evidence into RPI | Explain the three exits and confidence markers. Every DT exit enters research. Return to DT when evidence invalidates the problem framing. | Reviewed DT handoff to research, with a return loop | 4 |
| 26 | RPI connects evidence to controlled change | Explain Research, Plan, Implement, Review, and follow-up through artifacts and decisions. Keep concepts distinct from command names. | Evidence chain with human checkpoints | 4 |
| 27 | Match effort and review to uncertainty | Reuse adequate evidence. Choose deeper investigation for real gaps and risks. Combine tests, acceptance checks, independent review, and human decisions. Do not promise that passing tests covers every risk. | Uncertainty to workflow depth to review decision | 3 |
| 28 | Observe quality, time, and AI cost | Inspect available task telemetry and rework. Use focused context and deterministic tools for repeatable checks. Discuss estimates as measured ranges, not a universal token budget. | Task-level cost and outcome view | 3 |
| 29 | Install and maintain the CLI plugin correctly | Explain marketplace registration and installation. The documented plugin tracks main. Its instruction files are not automatically applied by path. | Marketplace to plugin to verified capabilities | 3 |
| 30 | From problem understanding to implementation | Introduce installation, DT Coach, reviewed handoff, and RPI. State the expected evidence, human decisions, and fallback route. | Four connected demo stages and their artifacts | 2 |

Use the current [HVE-Core documentation](https://microsoft.github.io/hve-core/docs/) for capability names. Use the [CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/) for installation behavior. Explain that marketplace refresh and plugin update are separate actions.

## Part C: separate demos

Use one continuous [public manufacturing tutorial scenario](https://microsoft.github.io/hve-core/docs/design-thinking/using-together/) for DT Coach, the handoff, and RPI. Start from the quality-dashboard request and examine knowledge loss across shifts.

Label the material as a teaching scenario, not a customer case study. Supplied observations and prepared artifacts do not represent new interviews or live user validation.

| Slide | Demo stage | Action | Evidence to show |
|---|---|---|---|
| 31 | Install HVE-Core through the CLI marketplace | Register the official marketplace, browse, install, and confirm the required agents and skills are available. | Discoverable capabilities and the limits of plugin instruction loading |
| 32 | Understand the problem with DT Coach | Work through Scope Conversations, Design Research, and Input Synthesis using labelled tutorial evidence. | Reviewed problem statement, stakeholders, constraints, themes, and assumptions |
| 33 | Hand off the problem statement to RPI | Use the Problem Statement Complete exit after Methods 1-3. Review the handoff and pass the research-topic artifact into `rpi-research`. | Confidence markers, evidence gaps, and clear research targets |
| 34 | Follow the RPI process | Research remaining questions, plan and critique, obtain the implementation decision, implement a bounded increment, review, and route follow-up. | Traceable artifacts, actual checks, and accepted versus remaining work |
| 35 | What changed from problem to production? | Return to the four pillars and explain what the demonstration established. | Practical evidence, limits, and next decisions; no productivity or production-readiness guarantee |

The [handoff tutorial](https://microsoft.github.io/hve-core/docs/design-thinking/tutorial-handoff-to-rpi/) illustrates the later implementation-space exit. Use the [integration reference](https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/) for the selected Methods 1-3 exit. Do not imply that concept validation, prototype testing, or Methods 4-9 have occurred.

The handoff enters research with broad questions about solution approaches, technology options, and feasibility. It does not predetermine a voice interface or authorize production implementation. If research invalidates the framing, return to DT rather than force progress.

Show this route as one pass through the continuous HVE loop, not a one-way delivery pipeline. Pause at the problem statement, research decision, and increment review for a labelled customer decision or supplied scenario response. Do not invent live customer validation. Return new evidence to the next problem or plan.

### Installation demonstration

Use the supported interactive `/plugin` marketplace route. Verify the exact `/plugin marketplace` syntax against the installed CLI help during preparation. Do not assume shell and slash commands have identical syntax.

The public guide documents these shell equivalents:

```text
copilot plugin marketplace add microsoft/hve-core
copilot plugin marketplace browse hve-core
copilot plugin install hve-core@hve-core
```

The documented registration tracks `main`, without a release gate or release attestation. Do not describe it as a stable extension channel or a pinned release. Plugin instructions remain available for explicit references; they are not automatically applied through repository path patterns.

### RPI demonstration

Follow the current [RPI guide](https://microsoft.github.io/hve-core/docs/rpi/). Explain research readiness, planning and critique, approved implementation, review, and follow-up. Reuse adequate evidence instead of repeating research.

Use fresh context when needed to keep the task clear. Durable artifacts carry evidence forward. Do not teach a universal reset rule or make every task execute every lifecycle stage. This demonstration deliberately shows the full process.

### Preparation still required

- Set the separate demo and Q&A allocations.
- Select a bounded implementation outcome after reviewing the tutorial handoff and research questions.
- Prepare clearly labelled tutorial evidence and fallback artifacts for each live stage.
- Verify current CLI syntax, plugin contents, agent names, and phase entry points.
- Prepare a new runbook for this deck before live delivery. The original deck's demo script is not this route.

Marginalia, the memory-agent walkthrough, and the separate backlog demonstration are outside this route. Keep long prompts and output excerpts in presenter support or fallback material, not dense main-path slides.

## Q&A and emphasis

Use the Q&A to qualify the main story, not to turn every question into a main-path slide. These are paraphrased topics, not a record of private answers or a claim that all concerns were resolved.

| Question | Treatment |
|---|---|
| Must we replace our current development toolkit? | Slide 19 and optional slide 22: separate method from tools; adopt useful capabilities selectively |
| Does better AI remove the need for explicit context? | Slide 15: keep relevant knowledge and decisions clear; do not make predictions about future model limits |
| Who checks the growing volume of output? | Slide 16 and optional slide 27: risk-based review, deterministic checks, independent review, and accountable humans |
| What happens when organizational approvals remain slow? | Slides 18 and 20: make waiting visible and secure leadership support; a fast team cannot remove every constraint alone |
| How do we keep capability after an engagement? | Slides 4 and 20: co-work, shared practices, maintained artifacts, and customer ownership |
| Are toolkit instructions current and evaluated? | Optional slide 22: verify the selected artifact and its evidence; curation is not proof of current accuracy or fitness |
| How do we estimate or control AI cost? | Optional slide 28: inspect available telemetry, compare task outcomes and rework, and explain estimate uncertainty |
| Does the method apply beyond code or AI products? | Slides 5 and 13: discovery, documentation, advisory work, and deterministic solutions can use the same delivery principles |
| Does FDE mean a fixed role or team roster? | Slides 4 and 10: explain the delivery motion and needed expertise, not a universal job definition or staffing ratio |

Keep private customer examples, unverified performance figures, predictions about model capabilities, and unresolved product comparisons out of the public story. Do not repeat mathematical errors or anecdotal results as general evidence.

## Visual direction

Use an independent light presentation with large left-aligned headings, restrained purple and warm accents, open diagrams, and a horizontal four-pillar model. The reference material informs topic emphasis, not copied layouts or artwork. Use original public wording and diagrams. Keep private reference images out of the repository.

- Use one clear message per slide and consistent markers for the four pillars.
- Make the customer-and-expert-crew loop the recurring visual. Show AI throughout and foundations beneath it.
- Return to that same loop when explaining the four pillars, shorter cycles, synthesis, and leadership action.
- Put the customer inside the loop, not at the end of a one-way pipeline.
- Explain flow, evidence, relationships, and decision ownership with diagrams.
- Separate leadership, optional practical content, and demos visually.
- Prefer short labels and readable type over dense lists and repeated card grids.
- Use progressive reveals only to explain sequence.
- Keep essential content understandable without color, hover, motion, or audio.
- Use a 1280 x 720 canvas, accessible section links, speaker notes, keyboard controls, overview, and print support.

Retain useful foundation, lifecycle, continuous-loop, and quality visuals. Remove the vibe-coding comparison, duplicate narratives, decorative interface emoji, unsupported attention percentages, fixed staffing ratios, private impact figures, and retired commands.

## Evidence and publication policy

Use public sources and original wording for public content. Private photos, transcripts, and the supplied internal-source research guide are planning references only. Do not publish them, non-public quotations, internal customer figures, or their local file paths.

The supplied guide contains secondary interpretations, internal references without public links, and speculative case descriptions. Do not treat those as verified evidence. Do not adopt fixed delivery durations, staffing formulas, customer results, or the suggestion that security and compliance can simply wait until after a prototype.

The four-pillar framing is this presentation's methodology structure, not an external industry standard. Keep public source support separate from teaching synthesis. Do not turn private experience into general claims.

Use [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the claim-to-source map and current technical limits. Do not use the demonstration as evidence of organization-wide delivery gains.

## Draft status

This outline follows the user's stated fundamental message and the supplied guide, with the photos and transcript retained as narrative references. It leads with HVE as an operating model: a small expert crew, customer participation, AI throughout, business-value validation, production foundations, and a continuous feedback loop.

The historical progression, experimentation-to-pillars transition, and leadership-level context discussion remain, but they support this central message. The audience, 30 + 30 minute format, optional toolkit boundary, and demo route are unchanged.

The 35-slide Reveal.js draft follows this operating-model narrative. Its notes, timing, structure tests, and README use the same section allocations. The customer-and-expert-crew loop returns in the opening, pillars, iteration, synthesis, leadership action, and demo recap. A new demo runbook, live artifacts, and rehearsal remain future preparation.
