## Hypervelocity Engineering presentation outline

### Metadata

| Field | Value |
|---|---|
| Title | Hypervelocity Engineering - *Why adding AI to the SDLC is not enough* |
| Subtitle | Why adding AI to the SDLC is not enough |
| Presenter | Daniel Scott-Raynsford |
| Audience | Technical leaders, engineering managers, and senior engineers |
| Format | Standalone leadership section, optional HVE-Core deep dive, then separate demos |
| Content duration | 30 minutes leadership + 30 minutes optional deep dive |
| Demo and Q&A duration | 30 minutes live demo; Q&A allocation not yet set |
| Last updated | 2026-11-05 |
| Status | Executive revision in progress; slides 1-10 refined through individual review; later slide reviews pending |

This outline has 40 slides: 25 leadership slides, 10 optional HVE-Core slides, and five demo support slides. Each pillar has a practice slide and an example slide. Organizational and cultural change is central throughout the story.

The independent Reveal.js deck implements this outline. The original [Slidev presentation](../hypervelocity-engineering/slides.md) remains unchanged.

The [slide-by-slide visual and animation plan](#slide-by-slide-visual-and-animation-plan) specifies the treatment for all 40 slides. It identifies where a diagram helps, where a presenter-controlled build explains change, and where a static visual or live artifact is enough.

## Audience outcome

Attendees can explain why responsible AI coding and efficient token use are necessary but not sufficient. They can use the four pillars to organize teams around outcomes, improve decision and validation capacity, provide maintained production-ready starting points, and enable every role with suitable AI tools. They can plan a measured change in how work is owned and delivered, not merely a tool rollout.

The optional section answers the practical question left by the leadership section: how do we turn these principles into shared, repeatable work? It maps HVE-Core capabilities to the delivery problems already established. The demos connect problem understanding to a bounded implementation through one public teaching scenario.

## Narrative thesis

Our delivery practices evolved with the way we built and released software. Packaged releases, cloud delivery, Agile, and DevOps changed the work and shortened feedback cycles. These developments overlap. Co-engineering also built customer capability and shared practices. Keep those successful engineering fundamentals; change the handoffs and responsibilities that no longer serve the work.

AI-assisted and agentic engineering can make some implementation work much faster. If decision and readiness demand exceeds the capacity of unchanged delivery processes, work can proceed before business answers arrive or wait before release. The constraint moves. More finished code does not establish a useful customer outcome.

Start with leaders' current questions: are people using AI coding tools well, and does token spend produce value? Then ask: when building becomes faster than deciding, how must the business change? The session is not a harness comparison. GitHub Copilot is the preferred development direction, but no coding tool can supply outcome ownership or customer evidence.

Use the next two to three years as a planning scenario, not a forecast. If agents perform most implementation work, how will the business choose, validate, adopt, and operate the right work? More POCs do not help when reviewers lack agreed criteria, time, or decision authority. Do not solve this with slower engineering or a new central approval queue.

Slides 6-8 explain three distinct gaps. A correctly built feature can miss the customer problem. An unanswered business question can become an unvalidated rule that spreads through dependent work. Features can arrive faster than late readiness work can absorb them. Keep these causes distinct: wrong-problem delivery, assumption propagation, and a readiness backlog.

Faster delivery does not inevitably create these gaps. The order-update failure predates AI. The assumption and readiness patterns depend on learning, decision capacity, and readiness work not keeping pace. Working software and passing tests do not by themselves prove a useful customer outcome.

The leadership challenge is to change the whole delivery system, not just buy AI tools. Shared ownership, customer availability, decision rights, specialist knowledge, and operational responsibility must support the work. Cultural change means changing these daily behaviors and commitments, not adding meetings, adopting new role names, or asking people to work longer.

Make the change observable. The crew and customer share responsibility for an outcome. Evidence can change or stop work. Specialist knowledge shapes decisions early. Maintained foundations and reviewed artifacts preserve that knowledge. Leaders act on demonstrated cross-team constraints while retaining necessary controls.

Slides 9-10 introduce HVE as the response: the customer and expert crew work through a short idea -> validation -> engineering -> feedback loop. Product, design, engineering, testing, security, operations, release, and service work support that cycle. The goal is the right outcome, not maximum code output. A loop turn advances learning and decisions; it is not necessarily a release.

The four pillars explain how to support that loop. Multidisciplinary teams share ownership. Design Thinking tests business value. Maintained accelerators reduce repeated setup work. AI assists throughout delivery. Keep suitable readiness work close to the learning cycle and perform it continuously. Required independent review, specialist judgment, and operational ownership remain.

AI amplifies expertise; people still need the expertise to review and validate its outputs. Security, observability, testing, continuous integration/deployment, and operational planning belong in the starting point and throughout delivery. A prototype is evidence for a decision, not proof of production readiness.

The intended change is from months of serial delivery toward useful outcomes in weeks or days where scope and readiness permit. This is an ambition, not a delivery promise. Test the changed way of working, identify the next constraint, and use that evidence to support organizational action. Co-work must leave the customer able to maintain the system and continue the practices.

The leadership section closes with those commitments and the shared mechanisms they need. HVE-Core then enters as optional reusable process support, not a substitute for organizational change or a production application foundation.

### Subtitle framing

The subtitle challenges adding AI across delivery while leaving ownership, customer participation, decision authority, specialist engagement, and governance unchanged. Do not define "AI SDLC" as coding alone. Lifecycle-wide AI assistance remains one of the four pillars.

If an audience's AI SDLC already includes these organizational changes, acknowledge the overlap. HVE explains the practices needed for that change; it is not an argument for replacing a label or a working toolkit.

## Narrative alignment

Lead with a question: what must change when implementation moves faster than the organization can decide, validate, and deliver? Keep proven discipline. Distinguish output from outcomes. Expose missing ownership, unvalidated assumptions, and late readiness work. Then show how the model and pillars change responsibility and behavior. Organizational change is needed for the loop to work.

| Story movement | Slides | Audience question | Purpose |
|---|---|---|---|
| Act 1: a proven discipline meets a changed capability | 1-5 | Does faster code deliver better outcomes, and what must adapt? | Start with responsible AI use and token value. Connect delivery changes to responsibility, retain engineering fundamentals, and expose the unchanged operating model |
| Act 2: faster output can expose three delivery gaps | 6-8 | Are we solving the right problem, validating business choices, and preparing work for release? | Separate a shipped feature from its outcome, show an agent assumption spreading before business input arrives, and explain readiness demand exceeding late-process capacity |
| Act 3: change how work is owned, validated, and produced | 9-21 | Who must work differently for the short learning loop to succeed? | Introduce the outcome-led response on slides 9-10. Then explain the four pillars through changed responsibilities, examples, evidence, and limits |
| Act 4: prove the loop, then change the organization around it | 22-25 | What evidence and commitments will support wider change? | Test a changed workflow, expose constraints and owners, secure sponsorship, and retain customer capability |
| Optional practical extension | 26-35 | How do these principles become daily work? | Map toolkit capabilities to the constraints, artifacts, and human decisions already explained |
| Separate demonstration | 36-40 | Can we follow the evidence through one real workflow? | Show one labelled teaching scenario, a reviewed handoff, controlled change, and remaining gaps |

The progression is recognition -> opportunity -> tension -> changed responsibilities -> evidence -> action. The four pillars connect delivery problems to changes in practice. Present this as a coherent operating model to test and adapt, not a proven necessary-and-sufficient formula for every organization.

Keep the history brief. Give Agile and DevOps credit for continuous feedback, small batches, automation, and shared responsibility. HVE extends that direction under changed conditions; it does not establish that Agile requires slow decisions or that DevOps failed. A two-week planning cadence need not prevent feedback or release within the sprint.

Do not claim that coding was the slowest task in every organization for 30 years. The supplied transcript itself describes substantial non-coding work. The defensible point is that faster implementation does not remove other delivery constraints. Do not use "six sprints in a few hours" as a measured result without a publishable source, comparable scope, and a stated readiness level.

Use the selected three-loop comparison on slide 5. Long implementation cycles first set the pace in this teaching model. Then only implementation shrinks and accelerates while planning, decisions, review, and human handoffs keep their old pace. Finally, expose decision waits and review queues. Faster implementation needs faster learning and decisions, not fewer checks. Sizes and speeds are conceptual.

The business requests an AI chatbot to reduce order calls. The carrier moves delivery from Friday to Monday, but the order record keeps Friday. No team owns passing on the update. The chatbot repeats Friday. The customer still cannot plan. The outcome is a trustworthy revised date and clear next action, not a shipped chatbot.

The failure predates AI. Where implementation becomes much faster, unchanged learning and decision cycles can let more unvalidated requests reach delivery. More software can leave the same customer problem unsolved. Use the speed to test the problem and repair the handoff, not to repeat the requested solution.

Test the update path with the people who know it before choosing a response. A trustworthy answer and a clear next action are proposed success criteria, not findings. A chatbot, tracking view, and notification are hypothetical options, not instructions to build three POCs. Keep the teaching boundary in notes, not a visible scenario label on slide 6.

Use the Friday-to-Monday case in suitable later pillar examples as each is reviewed. Do not force it into the general risk patterns on slides 7-8. Keep the manufacturing tutorial and Apex Dynamics demo separate. Explain the change of teaching scenario. Later entries retain the previous draft until review. The order-status case is not customer research or a Microsoft result.

On slide 7, distinguish increasing decision demand from the spread of one assumption. PM, SME, and customer input remains in the slower planning loop. The agent fills an unanswered business choice while implementation continues. That same rule spreads into product behaviour, tests, and later increments, then returns as the starting point for more work. Unvalidated does not necessarily mean wrong.

On slide 8, distinguish separate incoming features from slide 7's copies of one rule. Acceptance tests, assurance checks, and release-readiness work still receive too much work late. The backlog grows when arrivals exceed that work's capacity. Late findings can require rework. These are work groups, not three fixed gates or a claim that specialists are idle. Leave the response for slides 9-10.

FDE remains supporting context and needs no separate leadership slide. Capability transfer is visible in the history, customer co-ownership example, and leadership commitments. Make AI-assisted delivery versus an AI-powered product explicit in the fourth pillar; using AI to build does not require adding AI to the delivered product.

## Learning objectives

1. Explain why AI adoption and code output alone establish neither customer value nor improved delivery.
1. Connect the four pillars to changed ownership, continuous value validation, distributed expertise, and one customer-and-engineering loop.
1. Identify leadership commitments for customer participation, decisions, specialist assurance, and retained customer capability.
1. Define an experiment that tests changed delivery practices and measures value, quality, waiting, rework, and total cost.
1. In the optional section, connect each selected HVE-Core capability to a principle, a reviewed artifact, and a human decision.

## Section structure and timing

| Section | Slides | Duration | End condition |
|---|---|---:|---|
| A: HVE leadership section | 1-25 | 30 min | Complete leadership argument, worked pillar examples, and commitments for one measured delivery experiment |
| B: optional HVE-Core deep dive | 26-35 | 30 min | Practical concepts understood before live work |
| C: separate demos | 36-40 | 30 min | Installation, problem understanding, handoff, PRD, one bounded RPI pass, and recap |
| Questions and reference material | Separate route | Not yet set | Does not consume the content or demo allocations |

Introduce HVE-Core by name only at the leadership close. Its specific capabilities, setup, commands, and demonstrations follow in the optional section. A presenter can stop after slide 25 with a complete leadership message. No installation is required to understand or adopt the operating model.

The two section separators receive 0.25 minutes each. The combined loop slide receives 2.5 minutes and the HVE model introduction receives 0.5 minutes, keeping the leadership allocation at 30 minutes. Act 3 retains 16 minutes, with three minutes per pillar. Keep explanation and examples separate. Keep toolkit commands in the optional section.

Slides 1-5 move from responsible AI use and token value to changed delivery responsibilities, the output-versus-outcome question, and the unchanged operating model. Slides 6-8 explain the three failure patterns. Slide 9 marks the response. Slide 10 introduces the short customer-and-crew learning loop before the four pillars.

## Four pillars

Use the same short names throughout. Explain the longer meaning once.

| Pillar | Meaning | Delivery constraint addressed |
|---|---|---|
| 1. Multidisciplinary teams | A focused team and customer co-own an outcome, decisions, and operation, with access to relevant expertise | Serial responsibility, lost context, and decisions between functions |
| 2. Design Thinking | Keep users involved; define the question, evidence, criteria, and decision owner before testing an option | Building convincing solutions before validating the need |
| 3. Reusable accelerators | Provide maintained production-ready starting points; fund owners and validate each team's adaptation | Repeated setup, missing shared capability, and late assurance |
| 4. AI tooling | Enable every role and team with suitable tools, approved access, learning time, and expert review | Treating coding as the only activity that can improve |

These are connected parts of the operating model, not four HVE-Core feature groups. Customer collaboration and tight feedback loops connect all four; they are not an optional fifth tool. Team composition follows the problem. Keep the small, expert team emphasis without prescribing a headcount or a reduction target.

### Observable organizational and cultural changes

Use these changes throughout the examples. They are not a separate culture-change lecture.

| From | To | Why AI output is not enough |
|---|---|---|
| Functions complete separate contributions | The crew and customer co-own one outcome | More completed tasks cannot resolve conflicting goals or missing ownership |
| A request becomes a commitment to build | Evidence can change scope, solution, or the decision to continue | Faster implementation cannot validate the request |
| Specialists receive finished work to approve | Relevant expertise shapes work early, with required independent assurance retained | More output can increase the specialist queue rather than remove it |
| Feedback waits for a milestone | Customer representatives have time and authority to participate while choices remain cheap | A prototype cannot validate itself with users |
| Expertise stays with an individual or visiting crew | Customer engineers own maintained practices, artifacts, and decisions | Delivered software does not establish retained capability |
| Adoption is measured through tools or code volume | A delivery experiment measures value, quality, waiting, rework, and total cost | Usage is evidence of adoption, not improvement |

Decision rights, protected customer time, and the proposed leadership experiment are audience-specific ways to apply the source themes. The transcript does not prescribe one delegation model, staffing formula, or governance design. Use the arrangement appropriate to the work and its risk.

## Source alignment and claim boundaries

The private references are still available. No re-upload is needed for this revision. The supplied research report is a secondary account, not the primary onboarding material it cites. Use its preparation, co-creation, expertise, reuse, and feedback themes as planning context, subject to the limits below.

| Supplied reference theme | Place in this story | Boundary |
|---|---|---|
| Packaged software, cloud, co-engineering, and shared playbook | Slides 2-5 | Use original wording, no private dates or organizational claims; show Agile and DevOps as overlapping developments |
| Faster output exposed requirements, architecture, handoff, and governance gaps | Slides 5-8 | Keep the failure modes; omit private code-volume figures and customer anecdotes |
| Whole-system improvement matters more than coding alone | Slide 5 | Use a conceptual flow, not unsupported coding-time percentages or copied arithmetic |
| Experiments connected delivery problems to changed practices | Slides 10-11 | Explain the problem-to-practice reasoning; do not claim we ran the speakers' experiments or publish their scale or results |
| Small expert crews, customer co-creation, and prepared starting points | Slides 12-19 | No fixed roster, fixed sprint length, or production-delivery guarantee |
| Explicit requirements, architecture, standards, and reviewed summaries | Slide 20 and optional slide 28 | Preserve the legibility lesson; use approved evidence, not private transcripts in a public repository |
| Short spikes, frequent feedback, and measurement of production value | Slides 21-23 | Do not equate prototypes with accepted production changes |
| Enduring principles and changing enabling technology | Slides 24-27 | HVE-Core supports selected practices; it cannot grant decision authority or replace customer participation |
| Q&A on organizational bottlenecks and distributed specialist knowledge | Slides 22, 24, and 32 | Turn the issue into a leadership responsibility, not a promise that a plugin removes governance |

The main talk supports shared team duties, specialist knowledge in the crew, co-engineering, experimentation, and retained customer capability. The Q&A makes executive sponsorship and wider organizational change especially explicit. Bringing those themes forward is a deliberate adaptation for this leadership audience, not a claim that they formed the speakers' original opening.

Use the source comparison to strengthen emphasis, not invent evidence. Some organizations already review quickly. Identify an observed constraint rather than blaming every control. The Friday-to-Monday case explains missing ownership; slides 7-8 show general risks. None proves organizational transformation. A public or approved change case would help a later revision, but none is asserted here.

The slide-10 source check used the supplied research summary, not the original white paper. It supports frequent feedback, customer participation, shared ownership, multidisciplinary work, preparation, and testing during delivery. Do not claim direct verification of the original paper.

Aligning all production delivery functions around that learning loop is this presentation's wider application, not a verified source mandate. Rapid POC/MVP work still needs suitable operational and assurance work before production. The slide presents a model to test, not a measured result, fixed formula, or production-readiness guarantee.

Public support includes the [DORA 2024 findings](https://dora.dev/research/2024/dora-report/), the [Engineering Fundamentals Playbook](https://microsoft.github.io/code-with-engineering-playbook/), and the [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/).

DORA reports individual productivity benefits alongside delivery tradeoffs. This supports separating code output from delivery performance; it does not prove a universal causal result.

The [current HVE-Core guidance](https://github.com/microsoft/hve-core#readme) retains human judgment and warns that the framework changes rapidly. Describe it as patterns and learning to evaluate, not a stable platform or a production solution foundation. Keep it separate from the accelerator pillar. See [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the evidence map.

## Part A: HVE leadership section

The 25 slides total 30 minutes, including transitions. A separate Q&A slot is not included. Act 3 receives 16 minutes; 12 of those minutes explain the four pillars and their examples.

| Slide | Title | Main message and narrative role | Visual | Minutes |
|---|---|---|---|---:|
| 1 | Hypervelocity Engineering - *Why adding AI to the SDLC is not enough* | Start from leaders' questions about responsible AI-tool use and token value. Then ask what the business must change when building becomes faster than deciding. Put this opening and the standalone leadership scope in notes, not another cover subtitle. GitHub Copilot cannot supply ownership or customer evidence. | Selected A: wide title, one plain subtitle, presenter photo beside name and role, Microsoft logo | 1 |
| 2 | Software delivery changed. So did responsibility. | Delivery changes alter responsibilities, not just tools. Keep Agile 2001 distinct from DevOps 2009. Earlier practices continue. AI assists across delivery; leaders must revisit who chooses the problem and owns the outcome through operation. Keep engineering fundamentals. | Selected timeline arrow B: five main labels plus the separate DevOps 2009 marker on a linear 1970-2026 scale; responsibility labels above and below; shared foundation beneath | 0.75 |
| 3 | We’re delivering code faster. Are we delivering better outcomes? | Introduce the problem section by separating faster code output from useful customer and business outcomes. | Selected C: one centered line, with better outcomes in warm ink; existing background, no header or footer | 0.25 |
| 4 | More code does not mean better outcomes. | More code and prototypes do not supply customer evidence or decision ownership. An unchanged delivery model can still create handoffs, decision waits, wrong-problem delivery, late feedback, and late assurance. Slides 5-8 explain those gaps. Do not blame AI or propose a central approval queue. | Selected B: box-free fault line. More code and more prototypes sit above the same delivery model. Five cracks name the unresolved gaps. No statistics or statistical source footnote | 0.75 |
| 5 | Development got faster. The operating model did not. | Long implementation cycles shape planning and decisions in the teaching model. Only implementation then shrinks and accelerates; planning, review, and human handoffs keep their pace. Decision waits and review queues become visible. Faster implementation needs faster learning and decisions, not fewer checks. | Selected A: Sweeping arcs; three fixed-label loops, a shrinking implementation loop, its dashed former outline, and exposed waits. Three native presenter states; conceptual sizes and speeds | 2.5 |
| 6 | Delivering software faster. But not delivering the outcome. | The requested chatbot ships and works as specified. The carrier changes delivery from Friday to Monday, but the order record keeps Friday because no team owns passing the update through. The chatbot repeats stale information: no hallucination or coding defect is needed. The missing outcome is a trustworthy revised date and clear next action. | Selected A: requested solution versus unresolved customer problem, separated by the "not equal" link. The green check means shipped, not validated value. Full story and proposed success criteria in notes; no visible scenario label | 1.25 |
| 7 | Unanswered questions become business decisions in code. | If business validation cannot keep pace with more decision points, the agent can fill an unanswered business choice with an assumption. Follow that same unvalidated rule into behaviour, tests, later increments, and reuse. Passing tests do not validate the business need. The question is still open; the product already contains an answer. | Slow PM/SME/customer planning wheel, stopped input route, fast developer/agent implementation wheel, rule copies, and curved reuse arc. General problem, no order-status callback. Roughly 75-second talk track | 1.25 |
| 8 | Features arrive faster. Production readiness falls behind. | Feature arrivals can exceed the capacity of acceptance tests, assurance checks, and release-readiness work whose timing and capacity have not changed. Too much work arrives after implementation. Features and value wait; late findings can create rework. More finished code means more unfinished readiness work in this risk pattern. Keep the response for the next section. | Fast implementation wheel, separate-feature backlog, active but slower readiness wheel, and late-rework line with equal rounded corners. Work labels, not team names or fixed gates. Roughly 75-second talk track | 1.25 |
| 9 | From faster code delivery to better business outcomes. | Mark the move from the three problem patterns to the response. Shared outcome ownership, customer validation, maintained foundations, and lifecycle-wide AI support connect implementation speed to useful value. These are practices to test, not a guarantee or a tool rollout. | Selected C: one centered line, with better business outcomes in warm ink; existing background, no header or footer | 0.25 |
| 10 | Hypervelocity Engineering - *How we change the delivery operating model* | Replace serial handoffs with idea, validation, engineering, and feedback around the customer and expert crew. Align supporting delivery work to short learning cycles. Keep suitable assurance continuous and required review independent. Optimize for the right outcome, not maximum code output. This wider production model is a proposal to test; a POC or MVP is not a production-ready release. | One advance replaces Request -> Build -> Review -> Reveal with the large static circle and connected delivery functions. Four purple compass-point arrowheads show the clockwise sequence. No assurance caption; limits stay in the roughly 30-second notes | 0.5 |
| 11 | Four pillars address the challenges exposed by AI-accelerated delivery. | Briefly credit Microsoft Industry Solutions Engineering experience and lessons from applying Forward Deployed Engineering over recent years. Introduce established practices that support slide 10's loop; leave pillar detail to the next slides. Faster implementation exposes existing challenges; AI does not create every challenge. The columns are not exclusive one-to-one solutions. | Selected B: four unnumbered structural pillars, revealed one complete column per advance. Lower labels use 27px type with space inside dashed edges. Bottom credit to ISE delivery, customer co-engineering, and FDE experience stays visible. No lower improvement flow | 1.25 |
| 12 | Multidisciplinary teams: shared work, shared decisions | The crew and customer co-own the outcome and team duties. Bring relevant specialist knowledge into the work, with support and escalation. Shared responsibility is more than separate departments coordinating handoffs. | Customer engineers and disciplines around one jointly owned outcome | 1.5 |
| 13 | Example: resolve the question with the people who know | Revisit the chatbot request. Customer, support, carrier, order team, product, and engineering trace the Friday-to-Monday update together. Propose order-team ownership of the update path, with a customer decision-maker, relevant security expertise, and open questions. | Request, crew checks, update-path ownership, and a proposed decision record | 1.5 |
| 14 | Design Thinking: validate value throughout delivery | Explain problem, solution, and implementation spaces. Gather evidence, compare options, test assumptions, and revisit the framing. This is a continuous discipline, not an opening workshop or a request-to-backlog conversion. | Three spaces connected by evidence and return paths | 1.5 |
| 15 | Example: the chatbot is a request, not the problem | Build on slide 13. The carrier says Monday, but the order record still says Friday. Propose customer tests for a trustworthy date and next action. Compare the update path and interface options; a new interface alone does not fix stale information. No completed user research or measured benefit is claimed. | Chatbot request -> stale date -> customer success -> options -> test, change, investigate, or stop | 1.5 |
| 16 | Reusable accelerators: production foundations from the start | Explain maintained starting points with infrastructure, identity, security, observability, tests, CI/CD, and operational guidance. Name maintenance ownership. Verify actual fit and the assurance still needed; a foundation is not a finished solution. | Owned production foundation below business-specific work and remaining checks | 1.5 |
| 17 | Example: build the useful slice on a prepared foundation | Test the carrier-to-order update on a maintained foundation. Separate inherited environment, identity, logging, and CI/CD from changed business rules and remaining checks. Verify late updates, access, operation, and recovery. Reuse does not make the date correct or prove readiness. | Reused controls, Friday-to-Monday increment, and remaining assurance | 1.5 |
| 18 | AI tooling: amplify the crew across the lifecycle | Assist research, requirements, architecture, implementation, testing, documentation, and operations with reviewed context and checks. Experts remain accountable. Make AI-assisted delivery versus an AI-powered product explicit: the delivered solution need not contain AI. | Whole delivery loop with AI assistance and human checkpoints; product choice remains open | 1.5 |
| 19 | Example: carry evidence through the whole increment | Carry the Friday-to-Monday evidence into AI-assisted acceptance criteria, update-path code and tests, and a late-update runbook. Support, product, engineering, and operations review their relevant outputs. Return gaps to the crew. These are drafts, not completed review or proof of customer value. | Carrier evidence -> date and next action -> update path and tests -> runbook, with named reviewers and a return path | 1.5 |
| 20 | Faster output needs explicit evidence and expert judgment | Focus on technical and quality verification inside the crew: reviewed requirements, architecture, decisions, deterministic checks, specialist review, and customer acceptance. Maintain and review that knowledge; document volume is not the goal. Neither plausible output nor passing tests alone proves correctness. | Maintained shared evidence and accountable review inside the crew | 1 |
| 21 | Replace the long handoff with a tight learning loop | Focus on how the four pillars lock together into one continuous team loop: idea -> validation -> engineering -> feedback. Attach each pillar's commitment (shared ownership, customer time, maintained foundations, review capacity) and highlight the fragile boundary where the crew depends on external organizational support. | Supported customer-and-crew loop with the external organizational dependency boundary highlighted | 1 |
| 22 | The organization must make the loop possible | Focus on the external boundary the crew cannot cross alone: a ready increment waiting for a required organizational risk or policy decision. Identify the owner and a sponsored change in participation, capacity, escalation, or policy. Reassess the wait while retaining required assurance. Do not assume all governance is slow. | Observed wait -> accountable owner -> sponsored change -> reassessment | 1.25 |
| 23 | Test the way of working. Measure the outcome. | Baseline one delivery workflow and test changed responsibilities and practices, not just AI access. Contrast AI-written-code share with user success and accepted production value. Track waiting, quality, rework, and total cost to find the next constraint. | One measured delivery experiment with output and outcome measures contrasted | 1.25 |
| 24 | Principles need shared mechanisms and owners | Focus on capability transfer and repeatability after co-engineering ends: pair reviewed context, evidence capture, workflows, and checks with customer engineers who co-own and maintain them so capability stays with the customer. | Principles -> owned practices -> maintained mechanisms -> retained customer capability | 1.25 |
| 25 | HVE is the operating model. HVE-Core helps apply it. | Ask leaders to sponsor one outcome with customer participation, decision and review ownership, and support for cross-team constraints. Then introduce optional reusable process support. Tools cannot supply the organizational commitments. | Leadership commitments above an optional, replaceable process-support layer | 1.25 |

### Act 3: detailed pillar treatment and examples

Each pillar gets three minutes across two visual slides. The first explains meaning and changed practice. The second makes that meaning concrete. Do not replace these examples with four definitions, tool names, or a dense summary grid.

Slides 13, 15, 17, and 19 carry slide 6's Friday-to-Monday order-status thread. The manufacturing tutorial stays in the optional section. Team decisions, evaluation, foundation contents, and AI-assisted outputs are teaching illustrations, not customer results.

For each example, ask: *Who must work differently for this to succeed?* Show the question, changed responsibility, action, review evidence, and next decision. Show an expected artifact where useful, but do not invent findings, completed checks, or measured gains.

| Pillar and slides | Meaning and changed practice | Worked example | Evidence and leadership requirement |
|---|---|---|---|
| Multidisciplinary teams, 12-13 | The crew and customer co-own the outcome. Relevant specialists shape work early. Shared responsibility is not separate queues sharing a meeting. | Trace why the carrier's Monday update never replaces Friday in the order record. Propose an order-team owner, customer decision-maker, and open questions. | A proposed decision record, protected customer time, suitable authority, and specialist escalation. The owner must be agreed. Champions do not replace independent assurance. |
| Design Thinking, 14-15 | Validate problem, solution, and implementation choices repeatedly. Evidence can change or stop work. | Test whether delayed-order customers can get a trustworthy revised date and clear next action. Compare the update path with tracking, notification, and chatbot options. | Proposed criteria, representative customer tasks, and a decision to test, change, investigate, or stop. Baseline repeat contacts per delayed order; do not claim a reduction. |
| Reusable accelerators, 16-17 | Reuse maintained foundations; verify fit rather than treat reuse as certification. | Add the carrier-to-order update on reused environment, identity, logging, and CI/CD. Test late updates, access, operation, and recovery. | Separate inherited controls, changed rules, and remaining assurance. Leaders fund maintenance and readiness. Neither HVE-Core nor a template certifies the increment. |
| AI tooling, 18-19 | Assist across delivery with reviewed context and qualified human checks. AI in the product remains optional. | Carry Friday-to-Monday evidence into criteria, update-path code and tests, and a late-update runbook. Support, product, engineering, and operations review the outputs. | Traceable drafts, review findings, and acceptance or further work. Leaders provide data boundaries and review capacity. AI does not validate its own work. |

Keep the visible example simple: one decision vignette, one request-to-test path, one foundation cutaway, and one assisted-work sequence. Put the detailed explanation above in speaker notes. The examples must remain understandable without the optional HVE-Core section.

Expertise describes the crew's ability to judge and validate, not a seniors-only staffing policy. Include mentoring and capability development in slide 12's notes. Shared duties do not erase distinct expertise, risk ownership, or required separation of duties.

Close Act 3 with a two-state view on slide 21: first show the complete loop with all four pillars and commitments locked together, then highlight the fragile boundary where the crew depends on external organizational commitment (such as customer decision availability), setting up slide 22. Do not animate four separate failures.

Keep the other counterexamples in speaker notes: without the crew, decisions queue; without Design Thinking, the wrong need can be served; without foundations, setup and controls return as late work; without lifecycle-wide assistance, other work can remain the limiting step. This is a teaching model, not a promise that every activity needs AI.

### Act transitions and speaker-note intent

| Transition | Spoken connection | What the audience should now understand |
|---|---|---|
| Act 1 -> Act 2, after slide 5 | Faster implementation needs faster learning and decisions, not fewer checks. First, see how a working feature can still miss the customer problem. | A shipped feature is not proof of a useful outcome |
| Within Act 2, after slide 6 | The chatbot repeats stale information. Now consider a different risk: an unanswered business question becomes a rule before business input arrives. | Missing outcome ownership and an unvalidated rule are distinct causes |
| Within Act 2, after slide 7 | That rule can spread through dependent work. Separately, faster feature arrivals can exceed the capacity of readiness work that still arrives late. | Rule copies on slide 7 are not the separate features waiting on slide 8 |
| Act 2 -> Act 3, after slide 8 | We have three gaps: the wrong outcome, unchecked assumptions, and work that cannot yet reach production. Now change the operating model, not just the coding tool. | The response must connect customer evidence, business decisions, and readiness work |
| Within Act 3, slides 9-10 | Bring the customer and expert crew into short learning cycles. Align supporting delivery work to that loop. The four pillars explain how. | A fast learning loop is not a release guarantee or a substitute for required review |
| Inside Act 3, slide 11 | The four pillars support the short customer-and-crew learning loop together. The next slides explain each practice and example. | The columns show useful connections, not four exclusive solutions or a new improvement cycle |
| Act 3 -> Act 4, after slide 21 | The crew can change its practices. It cannot independently change another function's priorities, capacity, or policy. | Leaders must act on demonstrated cross-team constraints |
| Leadership -> optional practical section, after slide 25 | Tools can make practices repeatable. They cannot supply authority, customer availability, or organizational change. | HVE-Core supports selected practices; it is not the transformation |

Slides 1-5 total 5.25 minutes. Slides 6-8 total 3.75 minutes. Slides 9-21 total 16 minutes. Slides 22-25 total 5 minutes. Protect the three minutes for each pillar; do not let history, framework setup, or tool discussion consume the worked examples.

Use progressive reveals only for cause and effect: the original flow, the shortened code segment, exposed queues, the four responses and examples, and the reassembled loop. Each slide has one visible message. Put the concrete example on screen; keep its detailed explanation and qualifications in speaker notes.

Keep slide 8 focused on the cause: late readiness work receives more features than it can absorb. Do not show the solution lane or suggest that reviewers should work harder or skip checks. Tens or hundreds of features in days is a conditional planning scenario, not a measured throughput claim.

Introduce the response on slides 9-10 and develop it through the pillars. Explain "shift left" as doing suitable work earlier and continuously, including security-agent support during design, planning, and coding. It does not mean deciding everything upfront or automating every approval. Prepared foundations support the work; independent review, separation of duties, and operational ownership remain.

On slide 11, use a brief talk track. Expand ISE as Industry Solutions Engineering. Credit Microsoft ISE delivery experience and FDE learning over recent years; leave pillar detail to later slides. Established practices do not prove that this grouping guarantees results. Show the four connected practices without adding a separate improvement process or attributing one to the white paper.

On slide 22, use a labelled illustration of a ready increment waiting for a required risk decision. Identify the reviewer and policy owner. Consider earlier specialist participation, prepared evidence, review capacity, or an approved policy change. Retain the required assurance and measure the result. Do not describe a hypothetical improvement as an observed customer result.

On slide 23, propose one measured delivery experiment. Name the outcome, customer owner, crew decision rights, review responsibilities, and sponsor. Baseline value, quality, waiting, rework, and total cost. Test changed responsibilities and practices, inspect the next constraint, then seek the required organizational change. Installation and AI usage are not the experiment's success measures.

Customer representatives need time and authority. Specialists need a workable review path. Platform and access owners need readiness plans. Use decision windows that fit the work and risk; continuous alignment does not require everyone to remain in meetings all day. Keep these commitments concrete without inventing a universal engagement template.

Slides 24-25 must make a useful stop point. Leaders can act without the optional section. Those who continue should expect an applied workflow, not an inventory of agents. HVE-Core cannot create customer evidence, assign decision rights, remove legal obligations, or provision a production-ready solution simply through installation.

Suggested spoken bridge: *Tools can make a practice repeatable. They cannot assign authority, make customers available, or change an approval policy. We will now examine one toolkit that supports the work, not mistake it for the transformation.*

## Part B: optional HVE-Core deep dive

The 10 slides total 30 minutes. This is our practical extension, not a reconstruction of the speakers' main presentation. Each slide answers a requirement established in Part A. Do not restart the session with a disconnected product introduction.

| Slide | Title | Main message | Visual | Minutes |
|---|---|---|---|---:|
| 26 | From operating model to daily work | Reuse slide 25's model. HVE-Core offers reusable process support, not organizational transformation. People retain judgment and responsibility. Useful capabilities can be adopted alongside existing tools. | Same method-to-mechanism bridge, with people and tools kept distinct | 1 |
| 27 | Give each practice a repeatable mechanism | Map the pillars to capabilities, artifacts, reviewers, and decisions. Introduce DT Coach for discovery and the RPI (Research, Plan, Implement, Review) workflow for controlled engineering execution. Explain agents, skills, instructions, and workflows through their purpose. Distinguish process acceleration from production solution foundations; adopt selectively. | Leadership requirement -> capability (including DT Coach and RPI) -> artifact -> reviewer and decision | 4 |
| 28 | Keep the team and agents working from shared evidence | Show reviewed requirements, architecture, standards, decisions, and scoped task context. Check freshness and access. Apply slide 20 through a public repository example rather than a new abstract context lecture. | Repository evidence to bounded task to durable artifact | 3 |
| 29 | Validate the problem with DT Coach support | Apply slides 14-15 to the public manufacturing request. Support scope, research planning, and synthesis. An agent organizes evidence; it does not replace interviews, user observation, or customer decisions. | User evidence to reviewed problem framing, with a customer return loop | 3 |
| 30 | Carry Design Thinking evidence into RPI | Connect slide 14's three Design Thinking spaces (Problem, Solution, Implementation) to the three structured exits (`Problem Statement Complete`, `Concept Validated`, `Implementation Spec Ready`) and confidence markers. Every DT exit enters `rpi-research`. Return to DT when evidence invalidates the problem framing. | Three DT space exits converging on `rpi-research`, with confidence markers and a return loop | 4 |
| 31 | RPI connects evidence to controlled change | Explain Research, Plan, Implement, Review, and follow-up through artifacts and decisions. Keep concepts distinct from command names. | Evidence chain with human checkpoints | 4 |
| 32 | Build controls into the workflow | Apply slides 8 and 20: involve relevant specialists early, generate reviewable evidence, and use deterministic checks. Match review depth to uncertainty and risk. Requirements, tests, specialist review, and human acceptance have different jobs. | Uncertainty to controls, review evidence, and an accountable decision | 3 |
| 33 | Check whether the mechanism improved delivery | Apply slide 23: compare the delivery experiment's outcome, quality, waiting, rework, human time, and AI cost. Include time spent managing tool limits. Use available evidence, not a universal token budget or an adoption percentage. | Task-level cost, human effort, and delivery outcome view | 3 |
| 34 | Install and maintain the CLI plugin correctly | Explain marketplace registration and installation. The documented plugin tracks main. Its instruction files are not automatically applied by path. | Marketplace to plugin to verified capabilities | 3 |
| 35 | From problem understanding to implementation | Introduce the demo route through artifacts, reviewers, and decisions. The route is install, DT Coach, a short PRD with no BRD, then one bounded RPI pass. Completing the workflow does not establish customer validation, organizational adoption, production readiness, or improved delivery. State fallback and return paths. | Four connected demo stages with review and decision points | 2 |

Use the current [HVE-Core documentation](https://microsoft.github.io/hve-core/docs/) for capability names. Use the [CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/) for installation behavior. Explain that marketplace refresh and plugin update are separate actions.

### Principle-to-mechanism map

| Leadership requirement | Practical support to examine | What still needs people or other systems |
|---|---|---|
| A shared expert crew and customer decisions | Shared artifacts, explicit context, role-focused assistance, and review checkpoints | Team composition, customer participation, decision rights, and escalation |
| Continuous problem and value validation | DT Coach, evidence synthesis, confidence markers, and reviewed DT-to-RPI handoffs | Real user evidence, testable success criteria, and the decision to proceed or stop |
| Prepared production foundations | Reusable guidance and checks, used with a separately selected and maintained solution accelerator | Infrastructure, access, approved architecture, operational readiness, and solution-specific assurance |
| AI throughout delivery under expert direction | Research, planning, implementation, review, and follow-up workflows | Judgment, tradeoffs, specialist accountability, and customer acceptance |

End this section by returning to the same loop. The demo shows one pass with reviewed evidence and return paths. It does not prove that the organization has adopted all four pillars.

## Part C: separate demos

Use the public [Apex Dynamics Response Systems](https://github.com/PlagueHO/Apex-Dynamics-Response-Systems) repository for all five demo stages. It is a fully mocked React Kaiju Defense Network dashboard.

The optional manufacturing tutorial on slides 29 and 30 stays separate from the leadership order-status case and the Apex Dynamics demonstration. [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) holds the demo time plan, commands, prompts, and fallbacks.

The demo scenario is the application's single-save decision. A coin flip picks the city that the AI agent saves, with no reason given. The demo asks who can defend that choice. It uses the fictional stakeholder documents in the repository as evidence. Label them as teaching material, not customer research, new interviews, or live user validation.

The route is a 30 minute pass: install, DT Coach, PRD Builder with no BRD, then one bounded RPI phase. A BRD is the right artifact when a business case is needed. The demo skips it to save time.

| Slide | Demo stage | Action | Evidence to show |
|---|---|---|---|
| 36 | Install HVE-Core through the CLI marketplace | Register `microsoft/hve-core`, install `hve-core@hve-core`, and confirm DT Coach, PRD Builder, and the RPI skills load. Recommend this route even for VS Code users. | Discoverable capabilities and the limits of plugin instruction loading |
| 37 | Understand the problem with DT Coach | Start a project in plain language. Run two short rounds: who relies on the decision, then the stakeholder evidence in the repository. Stop at Method 3. | Reviewed problem statement, stakeholders, and open gaps |
| 38 | Hand off, then write a short PRD | Ask for the Problem Statement Complete handoff and review it. Run PRD Builder from the handoff with no BRD. | Confidence markers, marked gaps, and a PRD with scope, success criteria, and exclusions |
| 39 | Follow the RPI process | Research, plan with an approval point, implement the first phase only, then review. Run `/clear` between stages. Name what phase two still needs. | Traceable artifacts, actual diff and test results, and open work |
| 40 | What did the evidence establish? | Return to the opening question and pillars. Explain what was checked and what still needs a decision. Separate demonstrated process support from unproven customer validation, organizational adoption, production readiness, and delivery gains. | Practical evidence, limits, and next decisions; no transformation or readiness guarantee |

The [handoff tutorial](https://microsoft.github.io/hve-core/docs/design-thinking/tutorial-handoff-to-rpi/) illustrates the later implementation-space exit. Use the [integration reference](https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/) for the selected Methods 1-3 exit. Do not imply that concept validation, prototype testing, or Methods 4-9 have occurred.

The handoff enters PRD Builder and then research with broad questions about the design. It does not authorize production implementation. If research invalidates the framing, return to DT rather than force progress.

Show this route as one pass through the continuous HVE loop, not a one-way delivery pipeline. Pause at the problem statement, the PRD, and the plan approval. Do not invent live customer validation. Return new evidence to the next problem or plan.

### Installation demonstration

Recommend the Copilot CLI `/plugin` marketplace route for every surface, including VS Code and VS Code Insiders. The stated rationale is that one plugin install makes HVE-Core available in Copilot CLI, the Copilot app, and VS Code.

The public docs do not state this cross-tool behavior, and they name the VS Code extension as the main VS Code route. Verify the claim on the demo machine. Soften it if it does not hold. The slide says only that this is the recommended route.

Verify the exact `/plugin marketplace` syntax against the installed CLI help during preparation. Do not assume shell and slash commands have identical syntax. The shell equivalents are:

```text
copilot plugin marketplace add microsoft/hve-core
copilot plugin install hve-core@hve-core
```

The documented registration tracks `main`, without a release gate or release attestation. Do not describe it as a stable extension channel or a pinned release. Plugin instructions remain available for explicit references; they are not automatically applied through repository path patterns.

### RPI demonstration

Follow the current [RPI guide](https://microsoft.github.io/hve-core/docs/rpi/). Explain research readiness, planning and critique, approved implementation, review, and follow-up. Reuse adequate evidence instead of repeating research.

The live demo implements the first plan phase only. Phase two is a human confirm or override gate. It stays open and is named in the recap. This demonstration deliberately shows the full process.

The demo runs `/clear` between the research, plan, implement, and review stages so that each stage reads the previous artifact, not the chat history. This is a demo choice, not a universal reset rule. Do not make every task execute every lifecycle stage.

### Preparation still required

- Set the Q&A allocation. The demo has a 30 minute budget.
- Rehearse the whole flow twice and save labelled fallback artifacts for each live stage.
- Verify the CLI syntax, the plugin contents, the agent names, and the cross-tool install claim.
- Confirm the phase ID in the generated plan before running `rpi-implement`.
- Fill the recap callouts from the rehearsal or the actual run.
- Use [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) as the runbook. The original deck's demo script is not this route.

Marginalia, the memory-agent walkthrough, and the separate backlog demonstration are outside this route. Keep long prompts and output excerpts in presenter support or fallback material, not dense main-path slides.

## Q&A and emphasis

Use the Q&A to qualify the main story, not to turn every question into a main-path slide. These are paraphrased topics, not a record of private answers or a claim that all concerns were resolved.

| Question | Treatment |
|---|---|
| Must we replace our current development toolkit? | Slide 25 and optional slide 27: separate method from tools; adopt useful capabilities selectively |
| Does better AI remove the need for explicit context? | Slide 20 and optional slide 28: keep relevant knowledge and decisions clear; do not predict future model limits |
| Who checks the growing volume of output? | Slides 18-20 and optional slide 32: risk-based review, deterministic checks, independent review, and accountable humans |
| What happens when organizational approvals remain slow? | Slides 22-23: make waiting visible and secure leadership support; a fast team cannot remove every constraint alone |
| How do we keep capability after an engagement? | Slides 12-13 and 24-25: co-work, shared practices, maintained artifacts, and customer ownership |
| Are toolkit instructions current and evaluated? | Optional slide 27: verify the selected artifact and its evidence; curation is not proof of current accuracy or fitness |
| How do we estimate or control AI cost? | Optional slide 33: inspect available telemetry, compare task outcomes and rework, and explain estimate uncertainty |
| Does the method apply beyond code or AI products? | Slides 18-19: discovery, documentation, advisory work, and deterministic solutions can use the same delivery principles |
| Does FDE mean a fixed role or team roster? | Slide 4 and slide 12 notes: explain the delivery motion and needed expertise, not a universal job definition or staffing ratio |
| Must we abandon Agile, DevOps, or two-week planning? | Slides 2 and 7: retain useful practices; allow decisions, feedback, and release at the pace the work needs |
| Does HVE reject AI SDLC approaches? | Slide 4, opening subtitle framing, and slide 25: reject tool adoption without changed practices, not a label; acknowledge approaches that already include the required organizational changes |

Keep private customer examples, unverified performance figures, predictions about model capabilities, and unresolved product comparisons out of the public story. Do not repeat mathematical errors or anecdotal results as general evidence.

## Visual direction

Use an independent light presentation with large left-aligned headings, restrained purple and warm accents, open diagrams, and a horizontal four-pillar model. The reference material informs topic emphasis, not copied layouts or artwork. Use original public wording and diagrams. Keep private reference images out of the repository.

The selected background is *E: Flowing blend*. It combines Mist's diffuse lavender, peach, and rose haze with Silk's pale ribbon bands and fine lines. Use it across all 40 slides with a quiet central content area and no automatic motion. Keep the existing type, purple and warm accents, navigation, and 1280 x 720 canvas.

The selected cover layout is *A: Wide title*. Use the full subtitle *Why adding AI to the SDLC is not enough* in plain type. Do not add a second subtitle, question, or scope line. Put Daniel Scott-Raynsford's GitHub photo beside his name and role, with the Microsoft logo above. Keep the business question and session scope in speaker notes.

Slides 3 and 9 use selected *C: Warm key phrase* as matching section separators. Use the approved output-to-outcome titles on one centered line in 40px semibold type. Emphasize better outcomes and better business outcomes in warm ink. Keep the Flowing blend background and omit visible headers, footers, and body content. Do not add animation, subtitles, or section numbers.

Slide 5 uses selected B for its changing caption. Keep the warm key phrases and muted supporting text. Match the takeaway's 26px semibold type. Omit the phase counter. Leave at least 24px between the caption and the cycles. Fade the caption once over 260ms when the phase changes; keep the text fixed and visible. Show static text for reduced-motion and print views.

Slide 11 uses four unnumbered structural pillars. Slides 12-19 use a bottom-left numeral: 585px at 7% opacity, above the swirl and below all content. Each pair shares its pillar number. The numeral is decorative and hidden from accessibility reading. Slides 12, 14, 16, and 18 use "Pillar n: Title." and a second-line subtitle. Number the four pillars in the close when reviewed.

- Use one clear message per slide and consistent markers for the four pillars.
- Start with the three working loops on slide 5. Shrink and accelerate implementation, then expose unchanged human handoffs and waits. Later introduce the shared customer-and-crew loop.
- Reuse that loop when explaining HVE, the combined pillars, leadership action, the practical bridge, and the demo recap.
- Put the customer inside the loop, not at the end of a one-way pipeline.
- Explain flow, evidence, relationships, and decision ownership with diagrams.
- Make shared ownership, customer participation, distributed expertise, and retained capability visible inside the pillar examples.
- Contrast code output with a useful customer outcome; show an observed constraint and its owner before proposing organizational action.
- Separate leadership, optional practical content, and demos visually.
- Prefer short labels and readable type over dense lists and repeated card grids.
- Use progressive reveals only to explain sequence.
- Keep essential content understandable without color, hover, motion, or audio.
- Use a 1280 x 720 canvas, accessible section links, speaker notes, keyboard controls, overview, and print support.

Retain useful foundation, lifecycle, continuous-loop, and quality visuals. Remove the vibe-coding comparison, duplicate narratives, decorative interface emoji, unsupported attention percentages, fixed staffing ratios, private impact figures, and retired commands.

## Slide-by-slide visual and animation plan

The rows for slides 1-10 record the selected implementation and messaging. Slide 11 records its revised title, selected B columns, four reveals, and removal of the lower flow. Later rows remain design targets. Historical evolution entries describe earlier drafts, not current wording. Do not add a diagram merely to fill space or animate a relationship that is clearer when shown at once.

### Treatment rules

| Decision | Required treatment |
|---|---|
| Animated diagram | A diagram is needed, and a change of state helps explain cause, sequence, or a return path. Use the specified presenter-controlled build. |
| Static diagram | A relationship, structure, or comparison needs a diagram. Show it at once; motion would add steps without adding meaning. |
| Static visual | No diagram or animation is needed. Use the specified illustration, typography, or evidence table. |
| Live demo | No added explanatory diagram or animation is needed. The real interaction and reviewed artifact supply the evidence. |

Use at most three states for each presenter-controlled diagram. Prefer a simple reveal to a complex morph. Slide 2 plays its timeline once on entry over about four seconds. Slide 5 uses bounded sweeping arcs with replay and pause controls. Each phase has at most six seconds of motion. Do not add unbounded loops, particles, typing effects, animated counters, or decorative transitions.

All builds fit within the current slide allocations; they do not add speaking time. Static slides provide pauses between explanations. Keep labels short and place qualifications in speaker notes. The detailed tables below are production instructions, not text to copy onto slides.

Every animated diagram needs an explicit static version for reduced-motion viewing and print. Where the argument depends on a change, show labelled before-and-after panels or numbered states. Do not export overlapping states or hide the earlier evidence. Do not merely freeze an incomplete build.

Use labels, arrowheads, line styles, and position as well as color. Keep the meaning clear without motion. Provide a short text description for each diagram. Presenters must be able to reveal or show the complete argument without waiting for an effect.

Label conceptual delivery flows as illustrative and not to scale. Do not encode invented durations, productivity gains, or measured results in bar lengths, charts, check marks, or animation speed. Label proposed decisions and teaching evidence. An animated step is not evidence that the work occurred.

### Reusable visual threads

Reuse these compositions rather than introduce a new visual language on every slide. Keep matching labels and positions where comparison matters. Reuse does not mean repeating the same animation.

| Visual thread | Slides | Continuity requirement |
|---|---|---|
| Delivery work and waiting | 5, 7-8, 10, and 22 | Reuse the wheel and return-path language without treating every diagram as the same process. Slide 5 shows the speed gap; slide 7 shows one rule spreading; slide 8 shows separate features waiting. Slide 10 integrates the response. Retain required assurance. |
| Customer-and-crew learning loop | 10, 18, 21, and 40 | Use slide 10's clockwise reading order: idea upper left, validation upper right, engineering lower right, feedback lower left. Keep the customer and expert crew inside the loop. Supporting functions connect to it; they are not four serial gates. Later applications remain subject to review. |
| Shared ownership and reviewed evidence | 12-13, 19-20, 24, and 28-32 | Distinguish the question, evidence or artifact, responsible people, and decision. Reuse the same ownership labels in concept and example slides. |
| Maintained production foundation | 16-17, responding to late work on 8 | Slide 8 establishes the readiness problem, not the foundation solution. Later, distinguish inherited capability, business-specific work, maintenance ownership, and remaining assurance. Do not place HVE-Core inside the production foundation. |
| Delivery measurement | 23 and 33 | Reuse the same outcome, baseline, and experiment comparison. Add human effort and AI cost in the practical section rather than introduce an unrelated dashboard. |
| Method, tools, and demonstration route | 25-27 and 35-39 | Keep human commitments separate from optional process support. Reuse a small four-stage route marker during demos; it is navigation, not a second explanatory diagram. |

### Act 1 visual plan: slides 1-5

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 1 | Static visual. Establish the executive topic and presenter without several subtitle layers. | Dominant one-line title, one plain executive subtitle, presenter photo beside name and role, Microsoft logo. Put the business question in notes. | No animation. Show the complete cover at once. |
| 2 | Animated timeline. Show the sequence of delivery changes and their responsibilities. | Use selected B: a broad arrow with milestones at ~1970, 2001, 2006, ~2015, and ~2023. Label 2001 as Agile only. Keep DevOps at its separate 2009 marker for the first DevOpsDays. Space points linearly by year through 2026. Keep the foundation and takeaway. No grid, duration bars, or visible qualification line; explain date limits in notes. | Draw the arrow left to right in 3.6 seconds. Slide labels from above or below as its tip reaches their year; each arrival takes 0.5 seconds. Show the complete static timeline in overview, reduced-motion, print, and script-failure views. Repeat on re-entry, not in a loop. |
| 3 | Static section title. Pause on code output versus outcomes before examining the problems. | One centered line: We’re delivering code faster. Are we delivering better outcomes? Use selected C with better outcomes in warm ink. Retain the background only. | No animation, subtitle, number, or visible slide chrome. Keep the complete title in overview, print, reduced-motion, and script-failure views. |
| 4 | Static visual. Explain why more output is not enough before inspecting the delivery flow. | Use selected B: Fault line, without statistics. Open text, More code and More prototypes, sits above Same delivery model and a fractured line. Five cracks lead to Handoffs, Decision waits, Wrong problem, Late feedback, and Late assurance. No boxes or statistical footnote. Close on evidence and decision ownership. | No animation. Keep all gaps visible together. Explain in notes that this is a teaching model, not measured failure rates. Faster output can expose existing gaps; AI does not cause them. |
| 5 | Animated diagram. Combine long cycles, faster implementation, and the exposed process mismatch. | Selected A: Sweeping arcs. Keep planning + decisions and review + learning fixed. Shrink implementation + testing to 0.48 of its diameter and run it five times faster. Retain its dashed former outline, human handoffs, and required checks. | Three presenter-controlled states. Each advance starts at most six seconds of motion. Labels stay fixed. A lap means another increment, not an accepted outcome. Overview, reduced-motion, print, and script-failure views show the full comparison. Sizes and speeds are illustrative. |

### Act 2 visual plan: slides 6-8

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 6 | Static visual. Use selected A to separate a shipped feature from its intended customer outcome. | Left: "Reduce order calls. Build an AI chatbot.", shipped against the same order record. Right: carrier now Monday, chatbot still Friday, missing update and no owner. Keep the "not equal" link and the outcome of a trustworthy revised date and next action. | No animation. Notes explain the stale record and missing handoff owner, not a hallucination or coding defect. The green check marks software delivery only. Use the case in appropriate later examples, not slides 7-8. |
| 7 | One animated amplification sequence using slide 5's sweeping wheels. | Slow PM/SME/customer planning holds the open question. Centre More decisions / Validation lags over the stopped input line. The fast developer/agent wheel continues; the agent makes an assumption. The same rule spreads into product behaviour, tests, and later increments. A curved return arc carries it back for reuse. | Freeze after six active seconds with the question still open and three conceptual copies per output. Preserve replay, pause, and complete static views. Passing tests do not validate the need. Unvalidated does not mean wrong. No order-status callback or solution lane. |
| 8 | One animated backlog sequence using the established sweeping wheels. | Fast implementation feeds separate features into a queue before a slower but active readiness wheel. Name Acceptance tests / Assurance checks / Release readiness inside it. Align headings and captions. Connect Late rework between the bottom centres using straight segments and equal rounded corners behind the lower labels. | Freeze after six active seconds: one of eight conceptual arrivals enters readiness; seven wait. Preserve replay, pause, and complete static views. Counts and speeds are not measured throughput. Explain late work and capacity, not idle teams. Do not show the solution lane. |

### Act 3 visual plan: slides 9-21

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 9 | Static section title. Introduce the operating-model and four-pillar response. | One centered line: From faster code delivery to better business outcomes. Use selected C with better business outcomes in warm ink. Retain the background only. | No animation, subtitle, number, or visible slide chrome. Keep the complete title in overview, print, reduced-motion, and script-failure views. |
| 10 | Selected A: Connected delivery loop. Replace serial handoffs with short shared learning cycles. | Title: Hypervelocity Engineering. Subtitle: How we change the delivery operating model. Use the 332px circle and 220px centre. Connect Product + design, Engineering + testing, Security + operations, and Release + service. Keep Validation / Customer evidence transparent. No assurance caption. | One native advance replaces the serial view; backward navigation restores it. Four fixed purple compass-point arrowheads show clockwise order, not measured speed. Overview, reduced motion, print, and script failure show both models. Notes retain required review and POC-to-production limits. |
| 11 | Four presenter-controlled reveals. Introduce practices grounded in delivery experience, not a second process framework. | Title: Four pillars address / the challenges exposed by AI-accelerated delivery. Use selected B: four structural columns without numbers, purple caps and bases, dashed inner edges, and 27px practice labels. Keep the ISE/FDE provenance line and brief notes. | Reveal each complete challenge-arrow-practice column from left to right on four native advances. Reverse with Left Arrow. Overview, print, and script failure show all four. Reduced motion removes the fade, not the steps. Retain the route and timing. No lower process flow or guaranteed results. |
| 12 | Static diagram. Shared ownership is a relationship, not a sequence of role arrivals. | Put one outcome inside a shared customer-and-crew boundary. Place customer engineering, product/domain knowledge, engineering, and relevant specialist support around it. Distinguish escalation and independent assurance without drawing a fixed organization chart. | No animation. Customer participation is visible from the start. Label the arrangement as illustrative, not a mandatory roster or seniors-only team. |
| 13 | Static decision vignette. Show who owns the carrier update, not just the requested chatbot. | Keep the request, crew checks, decision, and record composition. Use the Friday-to-Monday case, order-team ownership proposal, customer participation, and relevant security expertise. | Show the complete proposed record. No completed discovery or automatic approval is implied. Keep pillar 1's bottom-left numeral. |
| 14 | Static diagram. Seeing all three spaces and return paths prevents a workshop-then-build interpretation. | Three connected spaces: problem, solution, and implementation. Show evidence links and return paths between them. Place the customer alongside all three. Avoid a one-way funnel or nine tiny method boxes. | No animation. Keep the complete non-linear model visible while the presenter explains it. |
| 15 | Static request-to-test path. Reframe the chatbot request into customer success. | Show Friday becoming Monday while the order record remains stale. Define proposed date and next-action criteria, then compare options and the test, change, investigate, or stop branch. | Do not select a winning interface or imply completed testing. Keep pillar 2's bottom-left numeral. |
| 16 | Static diagram. A foundation cutaway explains inherited capability and unfinished work at the same time. | Show an owned, maintained production foundation under business-specific work. Group infrastructure and identity, security and observability, and testing and delivery automation. Mark operational guidance, maintenance ownership, and remaining solution assurance without filling the slide with components. | No animation. Use clear layer labels, not a claim that the foundation is a complete or certified application. Keep HVE-Core outside this diagram. |
| 17 | Static foundation cutaway. Separate reuse, the changed carrier update, and required checks. | Put the Friday-to-Monday update above environment, identity, logging, and CI/CD. Keep late-update, access, operation, and recovery checks visible. | No completed checks or readiness guarantee. Keep pillar 3's bottom-left numeral. |
| 18 | Static diagram. Lifecycle-wide support must be visible at once so AI is not mistaken for a coding stage. | Reuse the customer-and-crew loop. Mark AI assistance around research, engineering, review, and operation, with human judgment visible. Add a separate short label: AI in the product is optional. Do not put AI in place of the customer or crew. | No animation. Keep the whole lifecycle and the delivery-versus-product distinction visible together. |
| 19 | Static assisted-work sequence. Follow the same order update through expert review. | Four drafts: carrier evidence, date and next action, update path and tests, late-update runbook. Support, product, engineering, and operations check relevant outputs. Keep the unresolved-assumption return. | No autonomous acceptance or measured result. Keep pillar 4's bottom-left numeral. |
| 20 | Static diagram. Focus on technical and quality verification inside the crew; different evidence sources are not interchangeable approval stages. | A compact crew-level evidence-to-decision map. Reviewed requirements and architecture, executable checks, and specialist/customer review converge on accept or more work. Include an owner and freshness marker. Do not draw a tower of documents or a single tests-passed gate. | No animation. Show the evidence sources together so their different jobs inside the crew remain clear. |
| 21 | Animated diagram. Lock the four pillars into one team loop, then highlight the boundary where external organizational commitment is required. | Reuse the complete loop with four short commitments: shared ownership, customer time, maintained foundations, and review capacity. Keep the customer and crew inside it. Highlight the fragile customer-decision link that requires leadership support, setting up slide 22. | Two states: complete supported loop, then highlighted external commitment dependency. Static version: complete loop plus a labelled callout on the external dependency boundary. This is a counterfactual, not a measured improvement. |

### Act 4 visual plan: slides 22-25

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 22 | Animated diagram. Focus on the external organizational boundary the crew cannot cross alone without suggesting a team can bypass required assurance. | A ready increment reaches a required external risk or policy decision. Name the reviewer and policy owner. Show an approved change in participation, capacity, escalation, or policy, followed by reassessment. Keep the required decision and evidence visible. | Three states: observed wait in the labelled illustration, sponsored change, then measure the next wait. Static version: three numbered steps. The last state is reassessment, not an invented successful result. |
| 23 | Static visual. A measurement brief is more honest and useful than a chart without data. | One outcome and a baseline-versus-experiment evidence table for value, quality, waiting, rework, and total cost. Contrast these with AI activity as an adoption measure. Leave unmeasured entries explicitly not measured. | No diagram or animation. Do not add rising bars, percentages, countdowns, or a fabricated dashboard. Keep the outcome and required evidence visible during discussion. |
| 24 | Static diagram. Focus on capability transfer and repeatability after co-engineering ends. | A short chain: principle -> owned practice -> maintained mechanism -> retained customer capability. Put customer co-owners above the practice and mechanism. Keep the people-to-ownership links visible so the tool does not appear to create capability by itself. | No animation. The simultaneous ownership relationships are more important than a sequence of boxes appearing. |
| 25 | Static diagram. The leadership close must work as a clear stopping point. | Human commitments and the operating model above a separate optional process-support layer named HVE-Core. Keep customer time, decision authority, and review ownership outside the tool boundary. Include a clear choice to stop or continue. | No animation. Hold the complete method-versus-tools distinction for the closing statement and audience decision. Do not make optional tooling appear to complete the organizational change. |

### Optional practical visual plan: slides 26-35

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 26 | Static diagram. Preserve the bridge instead of restarting with a product introduction. | Reuse slide 25's human-commitment and process-support layers in the same positions. Focus the practical discussion on the support layer without hiding the human obligations. | No animation. The visual continuity marks the optional change in depth; no logo reveal or new framework is needed. |
| 27 | Animated diagram. Follow one practice into a mechanism, define DT Coach and RPI (`Research -> Plan -> Implement -> Review`), and distinguish artifact production from a human decision. | Four short requirement-to-support mappings that name DT Coach for discovery and RPI for controlled engineering delivery. Expand only one at a time into capability -> artifact -> reviewer and decision. Use agents, skills, instructions, and workflows as types of support, not a feature inventory. | Three states: requirements and named support (including DT Coach and RPI), one worked artifact path, then its reviewer and decision. Static version: compact mappings plus the complete worked path. Keep production solution foundations in a separately labelled external dependency. |
| 28 | Animated diagram. Selecting relevant evidence is a transformation, not a claim that more context is always better. | Reviewed public repository evidence feeds one bounded task. Mark access, freshness, and assumptions before the task. Its durable output returns to the shared evidence with a reviewer and decision. Do not expose private source material. | Three states: available evidence, selected task context, then reviewed output and return. Static version: numbered selection-to-output flow. Do not animate evidence disappearing as if it were discarded or treat the output as automatically trusted. |
| 29 | Static diagram. Separate human-supplied evidence from agent support and customer judgment. | User or supplied teaching evidence -> DT Coach-supported organization and synthesis -> reviewed problem framing. Keep the customer decision and return path visible. Label evidence origin; place the coach in a support role, not at the source of user findings. | No animation. A clear role-and-evidence map is enough; live interaction belongs in slide 37. |
| 30 | Animated diagram. Connect slide 14's three Design Thinking spaces to the three exits into `rpi-research`, and show the return path to DT. | Map Problem Space (Methods 1-3 -> `Problem Statement Complete`), Solution Space (Methods 4-6 -> `Concept Validated`), and Implementation Space (Methods 7-9 -> `Implementation Spec Ready`) converging on `rpi-research`. Mark the Methods 1-3 route as the selected demonstration. Attach validated, assumed, unknown, and conflicting labels to the handoff, not color-only badges. | Three states: three DT space exits into `rpi-research`, selected Methods 1-3 handoff with confidence markers, then the research-to-DT return path. Static version: full routing diagram with the selected path labelled. Use the linked integration reference; do not imply later methods occurred. |
| 31 | Animated diagram. Explain controlled progress and a return path without turning RPI into an automatic pipeline. | Research -> Plan and critique -> approved Implement -> Review -> follow-up. Put evidence or artifacts beneath the work and the implementation decision between planning and change. Show one review gap returning to the appropriate earlier work. | Three states: research and planning evidence, approved change and review, then follow-up or return. Static version: full flow with the decision and labelled return path. Do not present every task as needing every phase or treat a skill call as approval. |
| 32 | Static diagram. Different controls answer different questions; fast tests cannot replace specialist or customer judgment. | Reuse slide 20's evidence-to-decision map. Add a risk-and-uncertainty input that selects suitable checks, specialist review, and customer acceptance. Keep required independent assurance visible. Each branch states what it can establish. | No animation. Show controls in parallel, not as interchangeable green gates. Use no fictional risk score or implied automatic acceptance. |
| 33 | Static visual. Evaluation needs real evidence, not a new visualization with invented data. | Reuse slide 23's baseline-versus-experiment brief. Add human review effort, rework, AI spend, and time managing tool limits to total cost. Connect cost to the same user outcome and quality evidence. Label missing data explicitly. | No diagram or animation. Use an evidence table, not a token counter or an unsupported cost curve. Only add a chart later if actual comparable measurements justify it. |
| 34 | Static diagram. Installation and maintenance relationships are clearer together than as animated command output. | Show marketplace registration -> selected plugin installation -> verified agents and skills. Use a separate maintenance branch for marketplace refresh and installed-plugin update. Add a short instruction-loading limit: explicit references, not automatic path application. | No animation. Do not simulate a terminal or mark installation complete. State the main-tracking limit; verify exact commands during demo preparation. |
| 35 | Static diagram. Give the audience a route map before switching to live work. | Four stages: install -> DT Coach problem -> PRD with no BRD -> one bounded RPI phase. Place the expected artifact and human checkpoint under each stage. Include a research-to-DT return and a clearly labelled prepared-fallback route. | No animation. Use the same compact route marker on slides 36-39, with only the current stage marked. Completing the route must not be drawn as a production-readiness badge. |

### Demo visual plan: slides 36-40

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 36 | Live demo. Real discovery and installation are clearer than a second diagram of the steps. | Full-size CLI view and the small route marker from slide 35. Show the marketplace registration, the plugin install, and capability discovery. Keep the recommended-route note short and visible. | No added diagram or animation. If the live path fails, use clearly labelled prepared capture and output. Do not present the capture as a successful live install. |
| 37 | Live demo. Reviewing the evidence and framing is the visual explanation. | DT Coach interaction for two short rounds. Show the coin-flip quote and the stakeholder evidence one at a time. Keep source labels and open gaps visible. | No added diagram or animation. The route marker shows the current stage. The stakeholder documents are fictional teaching material, not new interviews or live customer validation. |
| 38 | Live demo. The actual handoff and PRD show what carries forward better than an animated file transfer. | Readable Problem Statement Complete handoff beside the PRD Builder entry. Inspect confidence markers and marked gaps. Show the PRD scope, success criteria, and exclusions. | No added diagram or animation. Use a labelled prepared handoff or PRD if needed. Do not animate a transfer or show acceptance ticks before the real review. |
| 39 | Live demo. The artifact and checks, not a progress animation, establish what happened. | Show one current RPI artifact or check result at a time. Make the plan approval, the phase one diff, the test results, the review findings, and the open phase two readable. The chain shows a `/clear` command on each hop between stages. | Static `/clear` connectors on the RPI chain. No added animation. Show actual results and failures. Label fallback artifacts and incomplete work; do not run a simulated success sequence behind the live tool. |
| 40 | Static diagram. Return to the opening model while keeping demonstrated evidence and unproven claims distinct. | Reuse the customer-and-crew loop. Attach a few concise evidence callouts from the actual demonstration and a separate remaining-decisions area. Leave customer validation, organizational adoption, production readiness, and delivery gains unproven unless evidence establishes them. | No animation. Keep evidence and limits visible together for questions. Fill callouts only after rehearsal or the actual run; do not use decorative completion ticks. |

## Evidence and publication policy

Use public sources and original wording for public content. Private photos, transcripts, and the supplied internal-source research guide are planning references only. Do not publish them, non-public quotations, internal customer figures, or their local file paths.

The supplied guide contains secondary interpretations, internal references without public links, and speculative case descriptions. Do not treat those as verified evidence. Do not adopt fixed delivery durations, staffing formulas, customer results, or the suggestion that security and compliance can simply wait until after a prototype.

The four-pillar framing is this presentation's methodology structure, not an external industry standard. Keep public source support separate from teaching synthesis. Do not turn private experience into general claims.

Use [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the claim-to-source map and current technical limits. Do not use the demonstration as evidence of organization-wide delivery gains.

## Evolution log

| Date | Change | Reason |
|---|---|---|
| 2026-10-29 | Implemented the previous 35-slide operating-model outline and saved it as a work-in-progress commit | Preserve an independent Reveal.js draft beside the original Slidev deck |
| 2026-10-30 | Proposed a history -> shifted constraint -> four-pillar response -> leadership challenge -> practical mechanisms story | Make the framework an earned response to delivery problems and create a clear handoff into HVE-Core |
| 2026-10-30 | Expanded Act 3 to two slides per pillar, with definitions, changed practices, examples, evidence, and leadership responsibilities | Give the pillars practical depth without dense slides; retain 30 minutes by shortening framing and transitions |
| 2026-10-30 | Applied the ISE comparison recommendations and the subtitle Why adding AI to the SDLC is not enough | Make organizational and cultural change central through shared ownership, value validation, distributed expertise, retained capability, and a sponsored delivery experiment |
| 2026-10-30 | Specified a visual treatment for every slide, including diagram purpose, presenter-controlled builds, static alternatives, and cases needing no added diagram | Make relationships and narrative changes clear without decorative motion, invented evidence, or extra speaking time |
| 2026-10-30 | Refined narrative flow across slides 5-6, 10, 12, 14, 19-23, 26, and 29 | Introduce the manufacturing scenario before the pillar vignettes, fix the slide 12/14 chronology, align Act 2 constraints 1-to-1 with Act 3 pillars, sharpen slides 19-23, and define RPI before the handoff slide |
| 2026-10-30 | Implemented the approved 39-slide outline and locked Quantum Wave 8-S2 visual direction | Align the standalone Reveal.js deck to the leadership story and optional practical section while keeping the original Slidev deck unchanged |
| 2026-10-30 | Redesigned the layout and diagrams for all 39 slides on a shared 1280 x 720 grid with in-slide header and footer, shared diagram parts, and one takeaway line per slide | The first build had weak alignment, uneven spacing, and diagrams that did not follow the visual plan; palette, titles, notes, and sources are unchanged |
| 2026-10-30 | Moved the demo (slides 34-39) to the public Apex Dynamics Response Systems repository with a 30 minute route: install, DT Coach, PRD Builder with no BRD, one bounded RPI phase; added DEMO-SCRIPT.md | The demo needs a small app, a short DT round, and a tested prompt flow; the recurring manufacturing scenario on slides 6, 28, and 29 is unchanged |
| 2026-10-30 | Added slide 3, which names the Agentic SDLC and Forward Deployed Engineering labels and shows the first cracks; the deck now has 40 slides (25 leadership); slides 2, 3, 4, and 5 take 0.75 minutes each | Show that new labels arrive before the process changes and introduce the cracks that slides 4-9 discuss; keep the leadership section at 30 minutes |
| 2026-11-04 | Began the executive revision with the selected Flowing blend background and a new slide 1 question | Move beyond coding-tool use and token efficiency to outcome-led teams, decision capacity, shared foundations, and AI for every role; review one slide at a time |
| 2026-11-05 | Approved the presenter cover and selected timeline arrow B for slide 2 | Keep rough dates to scale, animate the arrow and milestone arrivals, and move date qualifications to speaker notes |
| 2026-11-05 | Combined former slides 4-6 into selected A: Sweeping arcs | Show faster implementation against unchanged human handoffs and decision cycles. Keep 30 leadership minutes across 23 slides; the deck now has 38 slides. |
| 2026-11-05 | Added approved output-to-outcome section titles on slides 3 and 9 with selected C: Warm key phrase | Separate problems from the HVE response. Restore 40 slides and 25 leadership slides while retaining both 30-minute allocations. |
| 2026-11-05 | Drafted the order-status teaching case on slide 6 without changing its comparison layout | Make the gap concrete: a working chatbot does not fix unreliable order information or establish a useful customer outcome. |
| 2026-11-05 | Selected the missed carrier update and missing owner as the slide-6 cause; removed its visible scenario label | Show why faster implementation can deliver more solutions to the wrong problem. Keep the focus on a trustworthy customer outcome. |
| 2026-11-05 | Selected slide-6 sample A, broadened the title, and added the full Friday-to-Monday walkthrough to notes | Establish a shared example for the later pillars: faster software delivery is not the same as a trustworthy customer outcome. |
| 2026-11-05 | Refocused slide 7 on the impact of feedback lag while retaining its two-row layout | Show implementation progressing on an unconfirmed assumption and the risk of rework. Remove the scale label and premature solution wording. |
| 2026-11-05 | Made the slide-7 decision made by default and its propagation explicit | A developer or agent fills an unanswered business question; the same choice spreads through behaviour, tests, and later increments. Keep the message general without revisiting the order example. |
| 2026-11-05 | Rebuilt slide 7 as one question, a stopped business-input branch, a default decision, and a fan-out | Align the flow with the title: implementation chooses an answer before business validation, then spreads the same rule across dependent work. |
| 2026-11-05 | Animated slide 7 with a slow planning wheel, fast implementation wheel, accumulating rule copies, and reuse | Show amplification rather than only a handoff: an unchecked rule becomes the starting point for later work before business input arrives. |
| 2026-11-05 | Named the agent assumption, added decision-load pressure, and curved the return arc on slide 7 | Explain more unanswered decisions separately from the downstream reuse of one assumption. |
| 2026-11-05 | Selected and enlarged the circular operating-model diagram on slide 10; reversed title/subtitle order and removed its assurance caption | Put short customer feedback at the centre. Align delivery functions to the loop. Retain required assurance and distinguish the wider production proposal from rapid POC/MVP work in notes. |
| 2026-11-05 | Replaced slide 10's rotating sweep with four fixed purple arrowheads at the circle's compass points | Show the clockwise learning sequence without animation. Keep the selected layout, single presenter advance, and complete static comparison. |
| 2026-11-05 | Aligned the outline's opening, slide 1-10 summaries, transitions, and visual specifications with the reviewed deck | Separate wrong-problem delivery, agent-assumption propagation, and late readiness work before introducing the short customer-and-crew loop. Preserve timing, source limits, and later review scope. |
| 2026-11-05 | Renamed slide 11 to Four pillars address the delivery challenges and removed its lower improvement flow | Introduce connected practices without implying four proven constraints or attributing a separate three-step process to the white paper. |
| 2026-11-05 | Shortened slide 11's talk track and added visible credit to Microsoft ISE delivery and FDE experience | Establish the practices' experience base without explaining each pillar early or claiming that the four-pillar grouping guarantees results. |
| 2026-11-05 | Changed slide 11's title to Four pillars address the challenges exposed by AI-accelerated delivery | Name the effect of faster implementation without treating AI SDLC as coding alone or claiming that AI creates every delivery challenge. |

## Draft status

Slides 1-10 now reflect the individual reviews and selected visual treatments. Slides 1-5 establish the output-versus-outcome question and delivery-speed gap. Slides 6-8 explain missing outcome ownership, unvalidated assumption propagation, and late readiness work. Slides 9-10 introduce the response through short customer-and-crew learning cycles.

The Friday-to-Monday case is the baseline for appropriate later leadership examples. Those examples, numbered pillars, later transitions, and leadership close still need individual review. Do not replace the optional manufacturing tutorial or Apex Dynamics demo with that case.

The audience, 30 + 30 minute format, optional toolkit boundary, and agreed demo route remain unchanged. The deck uses 25/10/5 slides. Act 3 has 16 minutes, including three minutes per pillar. The outline-alignment test checks section timing and ordering.

All 40 slides have a visual treatment. The Flowing blend background is static. Slide 2 has a timeline animation. Slide 5 has three native fragment phases with bounded motion. Slides 7-8 have bounded amplification and backlog sequences. Slide 10 has one native model replacement and a static circle. Slide 11 has four column reveals. Complete static views remain. Later animation plans need review.

The demo support slides do not establish that a live demo is ready. The demo route and prompts are in [DEMO-SCRIPT.md](./DEMO-SCRIPT.md). Rehearsal, labelled fallback artifacts, and the open verification items remain future preparation.
