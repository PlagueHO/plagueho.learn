## Hypervelocity Engineering presentation outline

### Metadata

| Field | Value |
|---|---|
| Title | Hypervelocity Engineering - *Why adding AI to the SDLC is not enough* |
| Subtitle | Why adding AI to the SDLC is not enough |
| Presenter | Daniel Scott-Raynsford |
| Audience | Technical leaders, engineering managers, and senior engineers |
| Format | Standalone leadership section, "Diving deeper into HVE-Core" practitioner section, then separate demos |
| Content duration | 27 minutes leadership + 34.5 minutes diving deeper into HVE-Core |
| Demo and Q&A duration | 30 minutes live demo; Q&A allocation not yet set |
| Last updated | 2026-11-06 |
| Status | Executive revision in progress; slides 12-23 and the chapter structure are updated locally; later individual slide reviews remain pending |

This outline has 41 slides: 23 leadership slides, 13 slides for diving deeper into HVE-Core, and five demo support slides. Each pillar has a practice slide and an example slide. Organizational and cultural change is central throughout the story. The leadership section has three chapters, and every leadership slide after the cover names its chapter in the top bar.

The independent Reveal.js deck implements this outline. The original [Slidev presentation](../hypervelocity-engineering/slides.md) remains unchanged.

The [slide-by-slide visual and animation plan](#slide-by-slide-visual-and-animation-plan) specifies the treatment for all 41 slides. It identifies where a diagram helps, where a presenter-controlled build explains change, and where a static visual or live artifact is enough.

## Audience outcome

Attendees can explain why responsible AI coding and efficient token use are necessary but not sufficient. They can use the four pillars to organize teams around outcomes, improve decision and validation capacity, provide maintained production-ready starting points, and enable every role with suitable AI tools. They can plan a measured change in how work is owned and delivered, not merely a tool rollout.

The "Diving deeper into HVE-Core" section is a practitioner guide for teams that make the change real. It answers the practical question left by the leadership section: how do we turn these principles into shared, repeatable work? It maps HVE-Core capabilities to the delivery problems already established, then returns to adoption commitments and outcome measures for leaders who stay.

The demos connect problem understanding to a bounded implementation through one public teaching scenario.

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

The leadership section closes with the difference between the framework and the toolkit, the roles the toolkit supports, and one wrap slide with two QR codes. HVE-Core is open source and maintained by Microsoft. Teams can customize it and keep their own spec-driven workflows.

It is reusable process support, not a substitute for organizational change or a production application foundation. The leadership commitments and outcome measures follow in the deeper section for those who want them.

### Subtitle framing

The subtitle challenges adding AI across delivery while leaving ownership, customer participation, decision authority, specialist engagement, and governance unchanged. Do not define "AI SDLC" as coding alone. Lifecycle-wide AI assistance remains one of the four pillars.

If an audience's AI SDLC already includes these organizational changes, acknowledge the overlap. HVE explains the practices needed for that change; it is not an argument for replacing a label or a working toolkit.

## Narrative alignment

Lead with a question: what must change when implementation moves faster than the organization can decide, validate, and deliver? Keep proven discipline. Distinguish output from outcomes. Expose missing ownership, unvalidated assumptions, and late readiness work. Then show how the model and pillars change responsibility and behavior. Organizational change is needed for the loop to work.

| Story movement | Slides | Audience question | Purpose |
|---|---|---|---|
| Act 1: a proven discipline meets a changed capability | 1-5 | Does faster code deliver better outcomes, and what must adapt? | Start with responsible AI use and token value. Connect delivery changes to responsibility, retain engineering fundamentals, and expose the unchanged operating model |
| Act 2: faster output can expose three delivery gaps | 6-8 | Are we solving the right problem, validating business choices, and preparing work for release? | Separate a shipped feature from its outcome, show an agent assumption spreading before business input arrives, and explain readiness demand exceeding late-process capacity |
| Act 3: change how work is owned, validated, and produced | 9-19 | Who must work differently for the short learning loop to succeed? | Introduce the outcome-led response on slides 9-10. Then explain the four pillars through changed responsibilities, examples, evidence, and limits |
| Act 4: make it real | 20-23 | What do we remember, and what do we do next? | Separate the framework from the toolkit, show the whole team the toolkit supports, and wrap up with two QR codes and three facts about HVE-Core |
| Diving deeper into HVE-Core | 24-36 | How do these principles become daily work, and what must leaders still commit? | Map toolkit capabilities to the constraints, artifacts, and human decisions already explained. Then show that installation is not adoption, measure the outcome, and close with one team action |
| Separate demonstration | 37-41 | Can we follow the evidence through one real workflow? | Show one labelled teaching scenario, a reviewed handoff, controlled change, and remaining gaps |

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

FDE remains supporting context and needs no separate leadership slide. Capability transfer is visible in the history, customer co-ownership example, and leadership commitments. Keep AI-assisted delivery versus an AI-powered product in the fourth pillar speaker notes; using AI to build does not require adding AI to the delivered product.

## Learning objectives

1. Explain why AI adoption and code output alone establish neither customer value nor improved delivery.
1. Connect the four pillars to changed ownership, continuous value validation, distributed expertise, and one customer-and-engineering loop.
1. Identify leadership commitments for customer participation, decisions, specialist assurance, and retained customer capability.
1. Start with one team and one real outcome, and measure value, quality, waiting, rework, experience, and total cost instead of AI activity.
1. In the "Diving deeper into HVE-Core" section, connect each selected HVE-Core capability to a principle, a reviewed artifact, and a human decision. Then name the leadership commitments and outcome measures that a toolkit cannot supply.

## Section structure and timing

| Section | Slides | Duration | End condition |
|---|---|---:|---|
| A: HVE leadership section | 1-23 | 27 min | Complete leadership argument, worked pillar examples, the framework-toolkit comparison, and a wrap slide with two QR codes |
| B: Diving deeper into HVE-Core | 24-36 | 34.5 min | Practical concepts, leadership commitments, outcome measures, and one team action understood before live work |
| C: separate demos | 37-41 | 30 min | Installation, problem understanding, handoff, PRD, one bounded RPI pass, and recap |
| Questions and reference material | Separate route | Not yet set | Does not consume the content or demo allocations |

The revised sequence uses concrete pillar support to introduce HVE-Core before the framework/toolkit comparison on slide 21. Keep setup, commands, and demonstrations in the deeper section. The leadership session must stand alone. No installation is required to understand or adopt the operating model.

The three chapter dividers on slides 3, 9, and 20 receive 0.25 minutes each. The combined loop slide receives 2.5 minutes and the HVE model introduction receives 0.5 minutes. The wrap slide receives 1.75 minutes, which keeps the leadership allocation at 27 minutes. Act 3 retains 14 minutes, with three minutes per pillar. Keep explanation and examples separate. Keep toolkit commands in the deeper section.

The three leadership slides that state commitments and measures (adoption needs more than installation, measure the outcome, and the team boarding pass) now sit at the end of the deeper section, before the demo route. They can move after the demo route if the presenter prefers to end the session on them.

The leadership wrap slide names open source, maintenance by Microsoft, and pull requests, then points to the deeper section for those who want to continue.

Slides 1-5 move from responsible AI use and token value to changed delivery responsibilities, the output-versus-outcome question, and the unchanged operating model. Slides 6-8 explain the three failure patterns. Slide 9 marks the response. Slide 10 introduces the short customer-and-crew learning loop before the four pillars.

### Chapters and top bar

The leadership section has three chapters. Chapter 1, "The outcome gap", covers slides 2-8. Chapter 2, "How HVE changes the work", covers slides 9-19. Chapter 3, "Making it real", covers slides 20-23.

Every slide except the cover carries a top bar with the title *Hypervelocity Engineering • Why adding AI to the SDLC is not enough* and the part label. On leadership slides the label names the chapter and shows three progress marks. In the deeper section the label reads "Diving deeper into HVE-Core". In the demos it reads "Demos".

Slides 3, 9, and 20 are the chapter dividers. Each carries a "Chapter n of 3" kicker above its key phrase.

## Four pillars

Use the same short names throughout. Explain the longer meaning once.

| Pillar | Meaning | Delivery constraint addressed |
|---|---|---|
| 1. Multidisciplinary teams | A focused team and customer co-own an outcome, decisions, and operation, with access to relevant expertise | Serial responsibility, lost context, and decisions between functions |
| 2. Design Thinking | Keep users involved; define the question, evidence, criteria, and decision owner before testing an option | Building convincing solutions before validating the need |
| 3. Reusable accelerators | Build, collect, share, and govern agents, Agent Skills, tools, and organizational knowledge across roles; review each adaptation | Repeated work, isolated expertise, stale guidance, and missing shared capability |
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
| Adoption is measured through tools or code volume | Each team baselines its own workflow, then measures value, quality, waiting, rework, experience, and total cost | Usage is evidence of adoption, not improvement |

Decision rights, protected customer time, and the outcome measures are audience-specific ways to apply the source themes. The transcript does not prescribe one delegation model, staffing formula, or governance design. Use the arrangement appropriate to the work and its risk.

## Source alignment and claim boundaries

The private references are still available. No re-upload is needed for this revision. The supplied research report is a secondary account, not the primary onboarding material it cites. Use its preparation, co-creation, expertise, reuse, and feedback themes as planning context, subject to the limits below.

| Supplied reference theme | Place in this story | Boundary |
|---|---|---|
| Packaged software, cloud, co-engineering, and shared playbook | Slides 2-5 | Use original wording, no private dates or organizational claims; show Agile and DevOps as overlapping developments |
| Faster output exposed requirements, architecture, handoff, and governance gaps | Slides 5-8 | Keep the failure modes; omit private code-volume figures and customer anecdotes |
| Whole-system improvement matters more than coding alone | Slide 5 | Use a conceptual flow, not unsupported coding-time percentages or copied arithmetic |
| Experiments connected delivery problems to changed practices | Slides 10-11 | Explain the problem-to-practice reasoning; do not claim we ran the speakers' experiments or publish their scale or results |
| Small expert crews, customer co-creation, and prepared starting points | Slides 12-19 | No fixed roster, fixed sprint length, or production-delivery guarantee |
| Explicit requirements, architecture, standards, and reviewed summaries | Slide 19 and slide 26 | Preserve the legibility lesson; use approved evidence, not private transcripts in a public repository |
| Short spikes, frequent feedback, and measurement of production value | Slides 14-15 and 34 | Do not equate prototypes with accepted production changes |
| Enduring principles and changing enabling technology | Slides 21 and 24-25 | HVE-Core supports selected practices; it cannot grant decision authority or replace customer participation |
| Q&A on organizational bottlenecks and distributed specialist knowledge | Slides 30 and 33-35 | Turn the issue into a leadership responsibility, not a promise that a plugin removes governance |

The main talk supports shared team duties, specialist knowledge in the crew, co-engineering, experimentation, and retained customer capability. The Q&A makes executive sponsorship and wider organizational change especially explicit. Bringing those themes forward is a deliberate adaptation for this leadership audience, not a claim that they formed the speakers' original opening.

Use the source comparison to strengthen emphasis, not invent evidence. Some organizations already review quickly. Identify an observed constraint rather than blaming every control. The Friday-to-Monday case explains missing ownership; slides 7-8 show general risks. None proves organizational transformation. A public or approved change case would help a later revision, but none is asserted here.

The slide-10 source check used the supplied research summary, not the original white paper. It supports frequent feedback, customer participation, shared ownership, multidisciplinary work, preparation, and testing during delivery. Do not claim direct verification of the original paper.

Aligning all production delivery functions around that learning loop is this presentation's wider application, not a verified source mandate. Rapid POC/MVP work still needs suitable operational and assurance work before production. The slide presents a model to test, not a measured result, fixed formula, or production-readiness guarantee.

Public support includes the [DORA 2024 findings](https://dora.dev/research/2024/dora-report/), the [Engineering Fundamentals Playbook](https://microsoft.github.io/code-with-engineering-playbook/), and the [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/).

DORA reports individual productivity benefits alongside delivery tradeoffs. This supports separating code output from delivery performance; it does not prove a universal causal result.

The [current HVE-Core guidance](https://github.com/microsoft/hve-core#readme) retains human judgment and warns that its assets change. Its agents, skills, instructions, and workflows are practical examples of reusable accelerators across roles. They do not provision an application or guarantee its readiness. See [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the evidence map.

## Part A: HVE leadership section

The 23 slides total 27 minutes, including transitions. A separate Q&A slot is not included. Act 3 receives 14 minutes; 12 of those minutes explain the four pillars and their examples.

| Slide | Title | Main message and narrative role | Visual | Minutes |
|---|---|---|---|---:|
| 1 | Hypervelocity Engineering - *Why adding AI to the SDLC is not enough* | Start from leaders' questions about responsible AI-tool use and token value. Then ask what the business must change when building becomes faster than deciding. Put this opening and the standalone leadership scope in notes, not another cover subtitle. GitHub Copilot cannot supply ownership or customer evidence. | Selected A: wide title, one plain subtitle, presenter photo beside name and role, Microsoft logo | 1 |
| 2 | Software delivery changed. So did responsibility. | Delivery changes alter responsibilities, not just tools. Keep Agile 2001 distinct from DevOps 2009. Earlier practices continue. AI assists across delivery; like earlier shifts, it asks leaders to rethink how teams organize and deliver outcomes. | Selected timeline arrow B: five main labels plus the separate DevOps 2009 marker on a linear 1970-2026 scale; responsibility labels above and below. Close with the leadership implication. | 0.75 |
| 3 | We’re delivering code faster. Are we delivering better outcomes? | Introduce the problem section by separating faster code output from useful customer and business outcomes. | Selected C: one centered line, with better outcomes in warm ink; existing background, no header or footer | 0.25 |
| 4 | More code does not mean better outcomes. | More code and prototypes do not supply customer evidence or decision ownership. An unchanged delivery model can still create handoffs, decision waits, wrong-problem delivery, late feedback, and late assurance. Slides 5-8 explain those gaps. Do not blame AI or propose a central approval queue. | Selected B: box-free fault line. More code and more prototypes sit above the same delivery model. Five cracks name the unresolved gaps. No statistics or statistical source footnote | 0.75 |
| 5 | Development got faster. The operating model did not. | Long implementation cycles shape planning and decisions in the teaching model. Only implementation then shrinks and accelerates; planning, review, and human handoffs keep their pace. Decision waits and review queues become visible. Faster implementation needs faster learning and decisions, not fewer checks. | Selected A: Sweeping arcs; three fixed-label loops, a shrinking implementation loop, its dashed former outline, and exposed waits. Three native presenter states; conceptual sizes and speeds | 2.5 |
| 6 | Delivering software faster. But not delivering the outcome. | The requested chatbot ships and works as specified. The carrier changes delivery from Friday to Monday, but the order record keeps Friday because no team owns passing the update through. The chatbot repeats stale information: no hallucination or coding defect is needed. The missing outcome is a trustworthy revised date and clear next action. | Selected A: requested solution versus unresolved customer problem, separated by the "not equal" link. The green check means shipped, not validated value. Full story and proposed success criteria in notes; no visible scenario label | 1.25 |
| 7 | Unanswered questions become business decisions in code. | If business validation cannot keep pace with more decision points, the agent can fill an unanswered business choice with an assumption. Follow that same unvalidated rule into behaviour, tests, later increments, and reuse. Passing tests do not validate the business need. The question is still open; the product already contains an answer. | Slow PM/SME/customer planning wheel, stopped input route, fast developer/agent implementation wheel, rule copies, and curved reuse arc. General problem, no order-status callback. Roughly 75-second talk track | 1.25 |
| 8 | Features arrive faster. Production readiness falls behind. | Feature arrivals can exceed the capacity of acceptance tests, assurance checks, and release-readiness work whose timing and capacity have not changed. Too much work arrives after implementation. Features and value wait; late findings can create rework. More finished code means more unfinished readiness work in this risk pattern. Keep the response for the next section. | Fast implementation wheel, separate-feature backlog, active but slower readiness wheel, and late-rework line with equal rounded corners. Work labels, not team names or fixed gates. Roughly 75-second talk track | 1.25 |
| 9 | From faster code delivery to better business outcomes. | Mark the move from the three problem patterns to the response. Shared outcome ownership, customer validation, maintained foundations, and lifecycle-wide AI support connect implementation speed to useful value. These are practices to test, not a guarantee or a tool rollout. | Selected C: one centered line, with better business outcomes in warm ink; existing background, no header or footer | 0.25 |
| 10 | Hypervelocity Engineering - *How we change the delivery operating model* | Replace serial handoffs with idea, validation, engineering, and feedback around the customer and expert crew. Align supporting delivery work to short learning cycles. Keep suitable assurance continuous and required review independent. Optimize for the right outcome, not maximum code output. This wider production model is a proposal to test; a POC or MVP is not a production-ready release. | One advance replaces Request -> Build -> Review -> Reveal with the large static circle and connected delivery functions. Four purple compass-point arrowheads show the clockwise sequence. No assurance caption; limits stay in the roughly 30-second notes | 0.5 |
| 11 | Four pillars address the challenges exposed by AI-accelerated delivery. | Briefly credit Microsoft Industry Solutions Engineering experience and lessons from applying Forward Deployed Engineering over recent years. Introduce established practices that support slide 10's loop; leave pillar detail to the next slides. Faster implementation exposes existing challenges; AI does not create every challenge. The columns are not exclusive one-to-one solutions. | Selected B: four unnumbered structural pillars, revealed one complete column per advance. Lower labels use 27px type with space inside dashed edges. Bottom credit to ISE delivery, customer co-engineering, and FDE experience stays visible. No lower improvement flow | 1.25 |
| 12 | Multidisciplinary teams: shared work, shared decisions | The crew and customer co-own the outcome and team duties. Relevant expertise, clear decision ownership, and continuous alignment support shared work. Support, escalation, and required assurance remain in the notes. | Customer engineers and disciplines around one jointly owned outcome, with a full-width Continuous alignment foundation | 1.5 |
| 13 | Expertise stays. Handoffs change. | Close multidisciplinary work helps people decide sooner with checked assumptions, build alignment and buy-in through shared choices, and adjust continuously. Fewer unnecessary handoffs can reduce waiting and rework; expertise and required review stay. | Approved two-panel comic with presenter-supplied PNGs, a shared goal, and three cause-and-effect points | 1.5 |
| 14 | Design Thinking: use AI speed to test assumptions | Faster coding and lower coding barriers do not validate a request. Explore the problem, compare alternatives, use fast prototypes to test assumptions, and check real use. Leaders provide customer access, domain expertise, and decision authority throughout delivery. | Complete presenter-supplied illustration, compact one-line title, and an explicit AI-speed implication below. Forward arrows are a reading path; evidence can reopen any space | 1.5 |
| 15 | Validate value, not just delivery. | Keep one principle in the body: test the chatbot against the customer's task. Put the action and AI-speed risk below: test value early, then change or stop options that do not help. No full date recap or completed research is claimed. | A request in pencil, one customer task, and an action-led takeaway explaining potential rework with faster AI coding | 1.5 |
| 16 | Reusable accelerators: broader capability for every team | Make reviewed expertise available without requiring every specialist on the team. Build, collect, share, and govern reusable assets. Retain adaptation and assurance. | Selected A2: assets feed Agentic capabilities; matching icons arc above the supplied people image; no oval | 1.5 |
| 17 | Pillar 3: Reusable accelerators. Reuse expertise, not just infrastructure. | Show one example of how expert practice becomes a maintained asset: write it down as an agent, skill, instruction, or check; give it a named owner and checks; let teams adapt it; teams contribute improvements back so the owner can update or retire it. The process is an example, not a prescription. Any organization needs a way to collate, curate, govern, and share expertise. Reuse does not replace review. | Selected B, the marked trail: five stops, a "Contribute improvements back" arrow, and a short takeaway | 1.5 |
| 18 | Pillar 4: AI tooling. Amplify the crew across the lifecycle. | Put AI help at every lifecycle stage for every role: business, design, architecture, assurance, engineering, data, and operations. Show security and review at every stage, shifted left and run continuously, not as a gate at the end. More speed needs more direction: experts stay accountable, review depth matches the risk, and teams start from one shared baseline. Keep AI-assisted delivery versus an AI-powered product in the speaker notes only. | Selected E: six lifecycle stages, a shield marker under each stage joined by a line, one AI ribbon, seven role chips, and an accountability band | 1.5 |
| 19 | Give AI context, checks, and expert judgment | One request, two routes. Without the right inputs, AI fills each gap with a guess that looks informed. With relevant context, recorded decisions, and executable checks, the work is checked against your rules. Experts still judge the result. Inputs improve the odds; they do not guarantee correct or secure output, and required independent assurance still applies. | Selected C: one request splits into a guess route and an informed route with four gates, ending in "Looks right. May fail later." versus "Checked against your rules" | 1.5 |
| 20 | How do we make HVE *real in our teams?* | Mark the move from the four pillars to practice. Introduce chapter 3, "Making it real": the framework and the toolkit, the whole team the toolkit supports, and where to start. This is a section transition, not evidence of results. | Selected D: chapter divider matching slides 3 and 9, with a "Chapter 3 of 3" kicker and three progress marks; existing background, no header or footer | 0.25 |
| 21 | HVE is the framework. HVE-Core is the toolkit. | Give the direct comparison attendees must remember. HVE is the framework: principles and methods you commit to, which endure. HVE-Core is the toolkit: enabling technology you choose, which evolves rapidly. The toolkit helps apply the framework and is one part of a wider stack of AI tools. HVE-Core is optional and replaceable, and installing it does not supply organizational commitments. | Selected B with the gold arrow from C: two panels ("Principles and methods", "Endures"; "Enabling technology", "Evolves rapidly"), one gold loop arrow, and a short takeaway | 1 |
| 22 | HVE-Core supports the whole team | Show a few concrete examples across roles, including at least three non-developer roles. One HVE-Core hub (agents, skills, instructions) connects to six role examples: program manager, UX designer with the Design Thinking coach, architect, operations, data scientist, and engineer. Numbers link each role to a pillar. The bottom line is that each role gets a production-ready starting point to customize for the organization. | Selected B (hub and spokes) with six role cards, a pillar legend, and a short takeaway | 1 |
| 23 | HVE-Core is open source. *Make it yours.* | Close the leadership section with what a team needs to start. HVE-Core is open source and maintained by Microsoft; pull requests are welcome. Keep your copy current by merging upstream changes, and try in-place customization before a fork. Customize freely and keep existing spec-driven and PRD workflows. The next step is one team and one real outcome. HVE-Core cannot supply sponsorship, customer time, authority, or review capacity. | Selected A: Codes and facts. Two QR cards (the GitHub repository and the documentation site) with their addresses, three fact cards (open source, stay current, make it yours), a route to the deeper section, and a pause for questions. No product names | 1.75 |

### Act 3: detailed pillar treatment and examples

Each pillar gets three minutes across two visual slides. The first explains meaning and changed practice. The second makes that meaning concrete. Do not replace these examples with four definitions, tool names, or a dense summary grid.

Slides 13, 15, 16, 17, 18, and 19 now use their selected distinct treatments. Slide 19 no longer uses the Friday-to-Monday case. The manufacturing tutorial stays in the deeper section. No customer results are claimed.

For each example, ask: *Who must work differently for this to succeed?* Show the question, changed responsibility, action, review evidence, and next decision. Show an expected artifact where useful, but do not invent findings, completed checks, or measured gains.

| Pillar and slides | Meaning and changed practice | Worked example | Evidence and leadership requirement |
|---|---|---|---|
| Multidisciplinary teams, 12-13 | The crew and customer co-own the outcome. Relevant specialists shape work early. Shared responsibility is not separate queues sharing a meeting. | Trace why the carrier's Monday update never replaces Friday in the order record. Propose an order-team owner, customer decision-maker, and open questions. | A proposed decision record, protected customer time, suitable authority, and specialist escalation. The owner must be agreed. Champions do not replace independent assurance. |
| Design Thinking, 14-15 | Use faster implementation for repeated learning, not faster delivery of untested requests. Lower coding barriers do not replace customer or domain expertise. Evidence can change or stop work. | A faster chatbot can still repeat the stale date. Test whether customers get a trustworthy revised date and clear next action. Compare the update path and interface options. | Leaders provide customer access, expert time, and decision authority. Test representative tasks against proposed criteria. Baseline repeat contacts per delayed order; do not claim a reduction. The 10x-50x illustration is hypothetical, not measured. |
| Reusable accelerators, 16-17 | Reuse expertise across roles through agents, Agent Skills, tools, and knowledge. | Slide 16 extends a small team's capability. Slide 17 shows how one expert practice becomes a maintained asset that teams adapt and that returns lessons to its owner. | Build, collect, share, and govern assets. Name owners, review access and changes, adapt to the task, and retain assurance. |
| AI tooling, 18-19 | Assist across delivery with reviewed context and qualified human checks. AI in the product remains optional. | Slide 18 puts AI help across the lifecycle. Slide 19 takes one request, add authentication to the checkout flow, and contrasts guesses that look informed with work informed by context, recorded decisions, and executable checks. | Focused, current context, decisions kept in files, and checks that run as work is written. Leaders provide data boundaries and review capacity. A passing check is evidence for the rule it tests, not proof of business value. |

Keep each visible treatment focused on a distinct lesson. Slide 16 uses a capability library to extend a small team's work, not a roster of people or a production-foundation cutaway. Slide 17 follows one expert practice along a marked trail, not another integration diagram.

Put detailed coverage and governance limits in speaker notes. The leadership examples must remain understandable without the deeper HVE-Core section.

Expertise describes the crew's ability to judge and validate, not a seniors-only staffing policy. Include mentoring and capability development in slide 12's notes. Shared duties do not erase distinct expertise, risk ownership, or required separation of duties.

Slide 20 opens chapter 3, "Making it real". Slide 21 gives the framework-versus-toolkit comparison. Slide 22 shows that HVE-Core supports the whole team, not only developers. It uses a hub-and-spokes view with six role examples and a pillar legend. The examples are illustrative, so the leadership message works without the deeper HVE-Core section.

Slide 23 is the leadership wrap slide: two QR codes, three facts, and a small next step. The commitments that a toolkit does not supply (slide 33) and the outcome measures (slide 34) follow in the deeper section.

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
| Act 3 -> Act 4, after slide 19 | The crew can change its practices. Making that real needs a toolkit that supports the whole team and leaders who act on cross-team constraints. | The framework endures; the toolkit evolves; leaders must act on demonstrated cross-team constraints |
| Leadership -> deeper HVE-Core section, after slide 23 | Tools can make practices repeatable. They cannot supply authority, customer availability, or organizational change. | HVE-Core supports selected practices; it is not the transformation |

Slides 1-5 total 5.25 minutes. Slides 6-8 total 3.75 minutes. Slides 9-19 total 14 minutes. Slides 20-23 total 4 minutes. Protect the three minutes for each pillar; do not let history, framework setup, or tool discussion consume the worked examples.

Use progressive reveals only for cause and effect: the original flow, the shortened code segment, exposed queues, the four responses and examples, and the reassembled loop. Each slide has one visible message. Put the concrete example on screen; keep its detailed explanation and qualifications in speaker notes.

Keep slide 8 focused on the cause: late readiness work receives more features than it can absorb. Do not show the solution lane or suggest that reviewers should work harder or skip checks. Tens or hundreds of features in days is a conditional planning scenario, not a measured throughput claim.

Introduce the response on slides 9-10 and develop it through the pillars. Explain "shift left" as doing suitable work earlier and continuously, including security-agent support during design, planning, and coding. It does not mean deciding everything upfront or automating every approval. Prepared foundations support the work; independent review, separation of duties, and operational ownership remain.

On slide 11, use a brief talk track. Expand ISE as Industry Solutions Engineering. Credit Microsoft ISE delivery experience and FDE learning over recent years; leave pillar detail to later slides. Established practices do not prove that this grouping guarantees results. Show the four connected practices without adding a separate improvement process or attributing one to the white paper.

On slide 33, show that installing the toolkit is only the start. Six leadership commitments follow: sponsorship, authority, shared ownership, end user time, review capacity, and maintained knowledge. Group them by who leads them (leaders, the team, the organization) and say the grouping is a teaching synthesis. Do not describe the commitments as a customer result or a guarantee.

On slide 34, contrast AI activity with outcomes. Prompts sent, code generated, and seats activated show use, not success. Measure useful value, quality, waiting, rework, experience, and total cost. Each team baselines its own workflow first. Show no chart and no result. If something is not measured, say so.

Customer representatives need time and authority. Specialists need a workable review path. Platform and access owners need readiness plans. Use decision windows that fit the work and risk; continuous alignment does not require everyone to remain in meetings all day. Keep these commitments concrete without inventing a universal engagement template.

Slide 23 must make a useful stop point. Leaders can act without the deeper section. Those who continue should expect an applied workflow, not an inventory of agents. HVE-Core cannot create customer evidence, assign decision rights, remove legal obligations, or provision a production-ready solution simply through installation.

Slide 23 is also where the presenter says that HVE-Core is open source and maintained by Microsoft, that pull requests are welcome, that teams should keep their copy current, and that teams can customize freely and keep existing spec-driven and PRD workflows. The slide names no products.

Suggested spoken bridge: *Tools can make a practice repeatable. They cannot assign authority, make customers available, or change an approval policy. We will now examine one toolkit that supports the work, not mistake it for the transformation.*

## Part B: Diving deeper into HVE-Core

The 13 slides total 34.5 minutes. This is our practical extension, not a reconstruction of the speakers' main presentation. Each slide answers a requirement established in Part A. Do not restart the session with a disconnected product introduction.

| Slide | Title | Main message | Visual | Minutes |
|---|---|---|---|---:|
| 24 | From operating model to daily work | Build on the leadership wrap slide. HVE-Core offers reusable process support, not organizational transformation. People retain judgment and responsibility. Useful capabilities can be adopted alongside existing tools. | Same method-to-mechanism bridge, with people and tools kept distinct | 1 |
| 25 | Give each practice a repeatable mechanism | Map the pillars to capabilities, artifacts, reviewers, and decisions. Introduce DT Coach for discovery and the RPI (Research, Plan, Implement, Review) workflow for controlled engineering execution. Explain agents, skills, instructions, and workflows through their purpose. Distinguish process acceleration from production solution foundations; adopt selectively. | Leadership requirement -> capability (including DT Coach and RPI) -> artifact -> reviewer and decision | 4 |
| 26 | Keep the team and agents working from shared evidence | Show reviewed requirements, architecture, standards, decisions, and scoped task context. Check freshness and access. Apply slide 19 through a public repository example rather than a new abstract context lecture. | Repository evidence to bounded task to durable artifact | 3 |
| 27 | Validate the problem with DT Coach support | Apply slides 14-15 to the public manufacturing request. Support scope, research planning, and synthesis. An agent organizes evidence; it does not replace interviews, user observation, or customer decisions. | User evidence to reviewed problem framing, with a customer return loop | 3 |
| 28 | Carry Design Thinking evidence into RPI | Connect slide 14's three Design Thinking spaces (Problem, Solution, Implementation) to the three structured exits (`Problem Statement Complete`, `Concept Validated`, `Implementation Spec Ready`) and confidence markers. Every DT exit enters `rpi-research`. Return to DT when evidence invalidates the problem framing. | Three DT space exits converging on `rpi-research`, with confidence markers and a return loop | 4 |
| 29 | RPI connects evidence to controlled change | Explain Research, Plan, Implement, Review, and follow-up through artifacts and decisions. Keep concepts distinct from command names. | Evidence chain with human checkpoints | 4 |
| 30 | Build controls into the workflow | Apply slides 8 and 19: involve relevant specialists early, generate reviewable evidence, and use deterministic checks. Match review depth to uncertainty and risk. Requirements, tests, specialist review, and human acceptance have different jobs. | Uncertainty to controls, review evidence, and an accountable decision | 3 |
| 31 | Check whether the mechanism improved delivery | Apply slide 34: compare the outcome measures for value, quality, waiting, rework, human time, and AI cost. Include time spent managing tool limits. Use available evidence, not a universal token budget or an adoption percentage. | Task-level cost, human effort, and delivery outcome view | 3 |
| 32 | Install and maintain the CLI plugin correctly | Explain marketplace registration and installation. The documented plugin tracks main. Its instruction files are not automatically applied by path. | Marketplace to plugin to verified capabilities | 3 |
| 33 | Adoption needs more than installation | State the leadership commitments that a toolkit does not supply: sponsorship, authority, shared ownership, end user time, review capacity, and maintained knowledge. The grouping of the six commitments is a teaching synthesis. Each organization decides its own commitments. Do not present them as a customer result or a guarantee. | Toolkit installed -> six commitment cards, grouped by who leads them | 1.25 |
| 34 | Measure the outcome, not the AI activity. | Contrast AI activity (prompts sent, code generated, seats activated), which shows use, with six outcome measures: useful value, quality, waiting, rework, experience, and total cost. Each team baselines its own workflow first. | AI activity beside six outcome cards; no chart and no result | 1.25 |
| 35 | Explore HVE-Core. Apply HVE together. | Give a clear team action: start with one team and one real outcome. Point to the official documentation and role guides. The live demo that follows shows one change, end to end; it is not required to act. Tools cannot supply the organizational commitments. | Selected C: Team boarding pass. One ticket with a "Team pass" band, four numbered pillar badges, four fields (team, outcome, official documentation, role guide), and a "Live demo" stub | 2 |
| 36 | From problem understanding to implementation | Introduce the demo route through artifacts, reviewers, and decisions. The route is install, DT Coach, a short PRD with no BRD, then one bounded RPI pass. Completing the workflow does not establish customer validation, organizational adoption, production readiness, or improved delivery. State fallback and return paths. | Four connected demo stages with review and decision points | 2 |

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

The deeper section's manufacturing tutorial on slides 27 and 28 stays separate from the leadership order-status case and the Apex Dynamics demonstration. [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) holds the demo time plan, commands, prompts, and fallbacks.

The demo scenario is the application's single-save decision. A coin flip picks the city that the AI agent saves, with no reason given. The demo asks who can defend that choice. It uses the fictional stakeholder documents in the repository as evidence. Label them as teaching material, not customer research, new interviews, or live user validation.

The route is a 30 minute pass: install, DT Coach, PRD Builder with no BRD, then one bounded RPI phase. A BRD is the right artifact when a business case is needed. The demo skips it to save time.

| Slide | Demo stage | Action | Evidence to show |
|---|---|---|---|
| 37 | Install HVE-Core through the CLI marketplace | Register `microsoft/hve-core`, install `hve-core@hve-core`, and confirm DT Coach, PRD Builder, and the RPI skills load. Recommend this route even for VS Code users. | Discoverable capabilities and the limits of plugin instruction loading |
| 38 | Understand the problem with DT Coach | Start a project in plain language. Run two short rounds: who relies on the decision, then the stakeholder evidence in the repository. Stop at Method 3. | Reviewed problem statement, stakeholders, and open gaps |
| 39 | Hand off, then write a short PRD | Ask for the Problem Statement Complete handoff and review it. Run PRD Builder from the handoff with no BRD. | Confidence markers, marked gaps, and a PRD with scope, success criteria, and exclusions |
| 40 | Follow the RPI process | Research, plan with an approval point, implement the first phase only, then review. Run `/clear` between stages. Name what phase two still needs. | Traceable artifacts, actual diff and test results, and open work |
| 41 | What did the evidence establish? | Return to the opening question and pillars. Explain what was checked and what still needs a decision. Separate demonstrated process support from unproven customer validation, organizational adoption, production readiness, and delivery gains. | Practical evidence, limits, and next decisions; no transformation or readiness guarantee |

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
| Must we replace our current development toolkit? | Slide 21 and deeper slide 25: separate method from tools; adopt useful capabilities selectively |
| Does better AI remove the need for explicit context? | Slide 19 and deeper slide 26: keep relevant knowledge and decisions clear; do not predict future model limits |
| Who checks the growing volume of output? | Slides 18-19, 21, and deeper slide 30: risk-based review, deterministic checks, independent review, and accountable humans |
| What happens when organizational approvals remain slow? | Slides 33-34: make waiting visible and secure leadership support; a fast team cannot remove every constraint alone |
| How do we keep capability after an engagement? | Slides 12-13, 17, and 33: co-work, shared practices, maintained artifacts, and customer ownership |
| Are toolkit instructions current and evaluated? | Deeper slide 25: verify the selected artifact and its evidence; curation is not proof of current accuracy or fitness |
| How do we estimate or control AI cost? | Deeper slide 31: inspect available telemetry, compare task outcomes and rework, and explain estimate uncertainty |
| Does the method apply beyond code or AI products? | Slides 18-19: discovery, documentation, advisory work, and deterministic solutions can use the same delivery principles |
| Does FDE mean a fixed role or team roster? | Slide 4 and slide 12 notes: explain the delivery motion and needed expertise, not a universal job definition or staffing ratio |
| Must we abandon Agile, DevOps, or two-week planning? | Slides 2 and 7: retain useful practices; allow decisions, feedback, and release at the pace the work needs |
| Does HVE reject AI SDLC approaches? | Slide 4, opening subtitle framing, and slide 35: reject tool adoption without changed practices, not a label; acknowledge approaches that already include the required organizational changes |

Keep private customer examples, unverified performance figures, predictions about model capabilities, and unresolved product comparisons out of the public story. Do not repeat mathematical errors or anecdotal results as general evidence.

## Visual direction

Use an independent light presentation with large left-aligned headings, restrained purple and warm accents, open diagrams, and a horizontal four-pillar model. The reference material informs topic emphasis, not copied layouts or artwork. Use original public wording and diagrams. Keep private reference images out of the repository.

The selected background is *E: Flowing blend*. It combines Mist's diffuse lavender, peach, and rose haze with Silk's pale ribbon bands and fine lines. Use it across all 41 slides with a quiet central content area and no automatic motion. Keep the existing type, purple and warm accents, navigation, and 1280 x 720 canvas.

The selected cover layout is *A: Wide title*. Use the full subtitle *Why adding AI to the SDLC is not enough* in plain type. Do not add a second subtitle, question, or scope line. Put Daniel Scott-Raynsford's GitHub photo beside his name and role, with the Microsoft logo above. Keep the business question and session scope in speaker notes.

Slides 3 and 9 use selected *C: Warm key phrase* as matching section separators. Use the approved output-to-outcome titles on one centered line in 40px semibold type. Emphasize better outcomes and better business outcomes in warm ink. Keep the Flowing blend background and omit visible headers, footers, and body content. Do not add animation, subtitles, or section numbers.

Slide 20 is the third chapter divider. It uses selected *D* and matches slides 3 and 9, with one difference: each divider carries a small "Chapter n of 3" kicker and three progress marks above its key phrase. The title is "How do we make HVE real in our teams?" with the final phrase in warm ink.

The top bar uses selected *C*. It appears on every slide except the cover and the dividers.

The left side shows the title *Hypervelocity Engineering • Why adding AI to the SDLC is not enough*. The right side shows the part label in the same font, slightly smaller than before. On leadership slides the label names the chapter ("Chapter n of 3" and the chapter name) with three progress marks. In the deeper section it reads "Diving deeper into HVE-Core". In the demos it reads "Demos".

Slide 23 uses selected *A: Codes and facts*. Two QR cards sit beside three short fact cards. The codes link to the HVE-Core repository and the documentation site, and each card prints its address. A small route sends the viewer to the deeper section, and a pause supports questions. The page names no products.

Slide 5 uses selected B for its changing caption. Keep the warm key phrases and muted supporting text. Match the takeaway's 26px semibold type. Omit the phase counter. Leave at least 24px between the caption and the cycles. Fade the caption once over 260ms when the phase changes; keep the text fixed and visible. Show static text for reduced-motion and print views.

Slide 11 uses four unnumbered structural pillars. Slides 12-19 use a bottom-left numeral: 585px at 7% opacity, above the swirl and below all content. Each pair shares its pillar number. The numeral is decorative and hidden from accessibility reading. Slides 12, 14, 16, and 18 use "Pillar n: Title." and a second-line subtitle. Number the four pillars in the close when reviewed.

- Use one clear message per slide and consistent markers for the four pillars.
- Start with the three working loops on slide 5. Shrink and accelerate implementation, then expose unchanged human handoffs and waits. Later introduce the shared customer-and-crew loop.
- Reuse that loop when explaining HVE, the combined pillars, leadership action, the practical bridge, and the demo recap.
- Put the customer inside the loop, not at the end of a one-way pipeline.
- Explain flow, evidence, relationships, and decision ownership with diagrams.
- Make shared ownership, customer participation, distributed expertise, and retained capability visible inside the pillar examples.
- Contrast code output with a useful customer outcome; show an observed constraint and its owner before proposing organizational action.
- Separate leadership, the deeper HVE-Core section, and demos visually.
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
| Delivery work and waiting | 5, 7-8, 10, and 33 | Reuse the wheel and return-path language without treating every diagram as the same process. Slide 5 shows the speed gap; slide 7 shows one rule spreading; slide 8 shows separate features waiting. Slide 10 integrates the response. Retain required assurance. |
| Customer-and-crew learning loop | 10, 18, 22, and 41 | Use slide 10's clockwise reading order: idea upper left, validation upper right, engineering lower right, feedback lower left. Keep the customer and expert crew inside the loop. Supporting functions connect to it; they are not four serial gates. Later applications remain subject to review. |
| Shared ownership and reviewed evidence | 12-13, 19, 21, and 26-30 | Distinguish the question, evidence or artifact, responsible people, and decision. Reuse the same ownership labels in concept and example slides. |
| Maintained production foundation | 16-17, responding to late work on 8 | Slide 8 establishes the readiness problem, not the foundation solution. Later, distinguish inherited capability, business-specific work, maintenance ownership, and remaining assurance. Do not place HVE-Core inside the production foundation. |
| Delivery measurement | 31 and 34 | Reuse the same outcome measures and each team's own baseline. Add human effort and AI cost in the practical section rather than introduce an unrelated dashboard. |
| Method, tools, and demonstration route | 21, 24-25, 35, and 36-40 | Keep human commitments separate from optional process support. Reuse a small four-stage route marker during demos; it is navigation, not a second explanatory diagram. |

### Act 1 visual plan: slides 1-5

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 1 | Static visual. Establish the executive topic and presenter without several subtitle layers. | Dominant one-line title, one plain executive subtitle, presenter photo beside name and role, Microsoft logo. Put the business question in notes. | No animation. Show the complete cover at once. |
| 2 | Animated timeline. Show the sequence of delivery changes and their responsibilities. | Use selected B: a broad arrow with milestones at ~1970, 2001, 2006, ~2015, and ~2023. Label 2001 as Agile only. Keep DevOps at its separate 2009 marker for the first DevOpsDays. Space points linearly by year through 2026. End with the leadership implication. No grid, duration bars, or visible qualification line; explain date limits in notes. | Draw the arrow left to right in 3.6 seconds. Slide labels from above or below as its tip reaches their year; each arrival takes 0.5 seconds. Show the complete static timeline in overview, reduced-motion, print, and script-failure views. Repeat on re-entry, not in a loop. |
| 3 | Static section title. Pause on code output versus outcomes before examining the problems. | One centered line: We’re delivering code faster. Are we delivering better outcomes? Use selected C with better outcomes in warm ink. Retain the background only. | No animation, subtitle, number, or visible slide chrome. Keep the complete title in overview, print, reduced-motion, and script-failure views. |
| 4 | Static visual. Explain why more output is not enough before inspecting the delivery flow. | Use selected B: Fault line, without statistics. Open text, More code and More prototypes, sits above Same delivery model and a fractured line. Five cracks lead to Handoffs, Decision waits, Wrong problem, Late feedback, and Late assurance. No boxes or statistical footnote. Close on evidence and decision ownership. | No animation. Keep all gaps visible together. Explain in notes that this is a teaching model, not measured failure rates. Faster output can expose existing gaps; AI does not cause them. |
| 5 | Animated diagram. Combine long cycles, faster implementation, and the exposed process mismatch. | Selected A: Sweeping arcs. Keep planning + decisions and review + learning fixed. Shrink implementation + testing to 0.48 of its diameter and run it five times faster. Retain its dashed former outline, human handoffs, and required checks. | Three presenter-controlled states. Each advance starts at most six seconds of motion. Labels stay fixed. A lap means another increment, not an accepted outcome. Overview, reduced-motion, print, and script-failure views show the full comparison. Sizes and speeds are illustrative. |

### Act 2 visual plan: slides 6-8

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 6 | Static visual. Use selected A to separate a shipped feature from its intended customer outcome. | Left: "Reduce order calls. Build an AI chatbot.", shipped against the same order record. Right: carrier now Monday, chatbot still Friday, missing update and no owner. Keep the "not equal" link and the outcome of a trustworthy revised date and next action. | No animation. Notes explain the stale record and missing handoff owner, not a hallucination or coding defect. The green check marks software delivery only. Use the case in appropriate later examples, not slides 7-8. |
| 7 | One animated amplification sequence using slide 5's sweeping wheels. | Slow PM/SME/customer planning holds the open question. Centre More decisions / Validation lags over the stopped input line. The fast developer/agent wheel continues; the agent makes an assumption. The same rule spreads into product behaviour, tests, and later increments. A curved return arc carries it back for reuse. | Freeze after six active seconds with the question still open and three conceptual copies per output. Preserve replay, pause, and complete static views. Passing tests do not validate the need. Unvalidated does not mean wrong. No order-status callback or solution lane. |
| 8 | One animated backlog sequence using the established sweeping wheels. | Fast implementation feeds separate features into a queue before a slower but active readiness wheel. Name Acceptance tests / Assurance checks / Release readiness inside it. Align headings and captions. Connect Late rework between the bottom centres using straight segments and equal rounded corners behind the lower labels. | Freeze after six active seconds: one of eight conceptual arrivals enters readiness; seven wait. Preserve replay, pause, and complete static views. Counts and speeds are not measured throughput. Explain late work and capacity, not idle teams. Do not show the solution lane. |

### Act 3 visual plan: slides 9-19

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 9 | Static section title. Introduce the operating-model and four-pillar response. | One centered line: From faster code delivery to better business outcomes. Use selected C with better business outcomes in warm ink. Retain the background only. | No animation, subtitle, number, or visible slide chrome. Keep the complete title in overview, print, reduced-motion, and script-failure views. |
| 10 | Selected A: Connected delivery loop. Replace serial handoffs with short shared learning cycles. | Title: Hypervelocity Engineering. Subtitle: How we change the delivery operating model. Use the 332px circle and 220px centre. Connect Product + design, Engineering + testing, Security + operations, and Release + service. Keep Validation / Customer evidence transparent. No assurance caption. | One native advance replaces the serial view; backward navigation restores it. Four fixed purple compass-point arrowheads show clockwise order, not measured speed. Overview, reduced motion, print, and script failure show both models. Notes retain required review and POC-to-production limits. |
| 11 | Four presenter-controlled reveals. Introduce practices grounded in delivery experience, not a second process framework. | Title: Four pillars address / the challenges exposed by AI-accelerated delivery. Use selected B: four structural columns without numbers, purple caps and bases, dashed inner edges, and 27px practice labels. Keep the ISE/FDE provenance line and brief notes. | Reveal each complete challenge-arrow-practice column from left to right on four native advances. Reverse with Left Arrow. Overview, print, and script failure show all four. Reduced motion removes the fade, not the steps. Retain the route and timing. No lower process flow or guaranteed results. |
| 12 | Static diagram. Shared ownership is a relationship, not a sequence of role arrivals. | Put one outcome inside a shared customer-and-crew boundary. Place relevant expertise on the left and shared responsibilities on the right. One full-width Continuous alignment box underpins the whole arrangement. | No animation or fixed roster. Notes walk through the center, left, right, and foundation. Keep support, escalation, and required independent assurance in the notes. |
| 13 | Static comic with visible cause-and-effect points. Explain why close teamwork helps. | Keep the handoff joke on the left. On the right, cluster the crew around one piece of work and one shared goal. Explain faster decisions with checked assumptions, alignment and buy-in, and continuous adjustment. | No animation, fixed roster, automatic approval, or guaranteed result. Required expertise and review stay. Keep pillar 1's bottom-left numeral. |
| 14 | Static exploration-and-focus illustration. Show three connected learning spaces, not sign-off gates. | Selected B: two diamond shapes with search and idea objects, then a working-result screen. Keep the three questions, customer evidence, and two-way feedback visible. | No animation or completed-test claims. Notes walk through both diamonds, the screen, and return arrows. This is an original HVE interpretation, not the four-phase Double Diamond. |
| 15 | Selected paper-and-pencil treatment, refined to one principle and one bottom-line action. | Treat the chatbot request as revisable. Test for a trustworthy revised date and clear next action. Keep change/stop actions and the risk of more rework from faster AI coding below the body. | No full date recap, competing slogans, em dashes, winning interface, or completed testing. Keep pillar 2's bottom-left numeral. |
| 16 | Static diagram. Selected A2: reviewed assets feed a library of agentic capabilities that extends a small team. | Show agents, skills, instructions, and tools as a library. Matching icons arc above the supplied people image to show the team drawing on capabilities. Do not show a roster of people or a production-foundation cutaway. | No animation, oval, or claim that assets make every person an expert. Required review and assurance stay. Keep pillar 3's bottom-left numeral. |
| 17 | Static marked trail. Follow one example expert practice from first use to update or retirement. | Five stops: show the way, write it down, review and own, teams adapt it, update or retire. A return arrow labelled "Contribute improvements back" closes the loop. The takeaway is collate, curate, govern, and share. State that this is one example process, not a prescription. | No animation, carrier example, or readiness guarantee. Reuse does not replace review. Keep pillar 3's bottom-left numeral. |
| 18 | Static diagram. Lifecycle-wide support must be visible at once so AI is not mistaken for a coding stage. | Six stages from discover to operate. A shield marker under each stage, joined by a line, shows security and review at every stage, not at the end. One AI ribbon spans every stage. Seven role chips span the lifecycle and are not tied to single stages. An accountability band reads "Experts stay accountable and set review to match the risk". The takeaway is that continuous checks keep pace only with AI at every stage, with a shared baseline. | No animation. No visible AI-powered product point; keep it in the notes. Add Responsible AI review only where the solution uses AI. Slide 19 owns context, decisions, and checks. |
| 19 | Static two-route diagram. One request must show the difference between a plausible answer and work informed by inputs. | A "Same request" card holds "Add authentication to the checkout flow". A warm route ("Guesses that look informed") ends in "Looks right. May fail later." A teal route passes four gates (relevant context, recorded decisions, executable checks, expert judgment) and ends in "Checked against your rules". Takeaway: the request is the same, the inputs change the work, and experts still judge the result. | No animation, carrier example, guarantee, or measured result. Notes say better inputs improve the odds, keep context current, review model summaries before recording a decision, retain independent assurance, and add Responsible AI review when the solution uses AI. Keep pillar 4's bottom-left numeral. |

### Act 4 visual plan: slides 20-23

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 20 | Static section title. Open chapter 3 before the framework, toolkit, and wrap slides. | Selected D. One centered line: How do we make HVE real in our teams? with the last phrase in warm ink. A "Chapter 3 of 3" kicker with three progress marks sits above it. Retain the background only. | No animation, subtitle, or visible header and footer. Keep the complete title and kicker in overview, print, reduced-motion, and script-failure views. |
| 21 | Static two-panel comparison with a loop arrow. Attendees must leave knowing the difference between the framework and the toolkit. | A left panel "Principles and methods" ("Endures") lists the four pillars with numbered chips 1 to 4. A right panel "Enabling technology" ("Evolves rapidly") lists HVE-Core (marked "Toolkit"), AI assistants, AI models, and automated checks with icon chips. A gold loop arrow runs from the technology panel back to the principles panel, labelled "Tools help apply the principles". Takeaway: principles endure, technology evolves; choose tools that help and keep the principles when tools change. | No animation, product names, asset counts, guarantee, or measured result. Notes say HVE-Core is optional, replaceable, and one part of a wider stack; installing it does not supply sponsorship, end user time, authority, or review capacity, and it does not replace expert judgment or required independent assurance. |
| 22 | Static hub-and-spokes diagram. Attendees must leave knowing that HVE-Core serves the whole team, not only developers. | One central "HVE-Core" hub ("Agents, skills, instructions") with six role cards joined by coloured spokes: Program manager (requirements and backlog planning), UX designer (Design Thinking coach, customer evidence), Architect (decision records, diagrams, security plans), Operations (runbooks and infrastructure checks), Data scientist (notebooks and dashboards), and Engineer (research, plan, implement, review). Each card has a numbered pillar badge. A pillar legend sits below. Takeaway: every role gets a production-ready starting point; customize it for your organization. | No animation, product names, asset counts, guarantee, or measured result. The pillar mapping is illustrative. Notes say coverage varies by role, security outputs need qualified human review, HVE-Core is optional and replaceable, and it does not supply sponsorship, end user time, authority, or review capacity or replace required independent assurance. |
| 23 | Static card pair with a short facts column. The leadership section must end on a clear stopping point and a concrete way to start. | Selected A: Codes and facts. Two QR cards sit side by side: the HVE-Core GitHub repository and the documentation site, each with its printed address. Three fact cards follow: Open source (maintained by Microsoft, pull requests welcome), Stay current (merge upstream changes into your copy), and Make it yours (customize freely, keep existing workflows). A small route leads to the deeper section, and a pause supports questions. | No animation, product names, guarantee, or measured result. The QR codes come from a self-contained encoder with fixture tests. Notes cover the fork maintenance cost, the repository README warning that HVE-Core may change in ways that are not backward compatible, and the limits: no sponsorship, customer time, authority, or review capacity comes with the toolkit. |

### Deeper section visual plan: slides 24-36

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 24 | Static diagram. Preserve the bridge instead of restarting with a product introduction. | Show a human-responsibility band above optional process support (agents, skills, instructions, and workflows). Focus the practical discussion on the support layer without hiding the human obligations. | No animation. The change in depth is marked by the section-break styling; no logo reveal or new framework is needed. |
| 25 | Animated diagram. Follow one practice into a mechanism, define DT Coach and RPI (`Research -> Plan -> Implement -> Review`), and distinguish artifact production from a human decision. | Four short requirement-to-support mappings that name DT Coach for discovery and RPI for controlled engineering delivery. Expand only one at a time into capability -> artifact -> reviewer and decision. Use agents, skills, instructions, and workflows as types of support, not a feature inventory. | Three states: requirements and named support (including DT Coach and RPI), one worked artifact path, then its reviewer and decision. Static version: compact mappings plus the complete worked path. Keep production solution foundations in a separately labelled external dependency. |
| 26 | Animated diagram. Selecting relevant evidence is a transformation, not a claim that more context is always better. | Reviewed public repository evidence feeds one bounded task. Mark access, freshness, and assumptions before the task. Its durable output returns to the shared evidence with a reviewer and decision. Do not expose private source material. | Three states: available evidence, selected task context, then reviewed output and return. Static version: numbered selection-to-output flow. Do not animate evidence disappearing as if it were discarded or treat the output as automatically trusted. |
| 27 | Static diagram. Separate human-supplied evidence from agent support and customer judgment. | User or supplied teaching evidence -> DT Coach-supported organization and synthesis -> reviewed problem framing. Keep the customer decision and return path visible. Label evidence origin; place the coach in a support role, not at the source of user findings. | No animation. A clear role-and-evidence map is enough; live interaction belongs in slide 38. |
| 28 | Animated diagram. Connect slide 14's three Design Thinking spaces to the three exits into `rpi-research`, and show the return path to DT. | Map Problem Space (Methods 1-3 -> `Problem Statement Complete`), Solution Space (Methods 4-6 -> `Concept Validated`), and Implementation Space (Methods 7-9 -> `Implementation Spec Ready`) converging on `rpi-research`. Mark the Methods 1-3 route as the selected demonstration. Attach validated, assumed, unknown, and conflicting labels to the handoff, not color-only badges. | Three states: three DT space exits into `rpi-research`, selected Methods 1-3 handoff with confidence markers, then the research-to-DT return path. Static version: full routing diagram with the selected path labelled. Use the linked integration reference; do not imply later methods occurred. |
| 29 | Animated diagram. Explain controlled progress and a return path without turning RPI into an automatic pipeline. | Research -> Plan and critique -> approved Implement -> Review -> follow-up. Put evidence or artifacts beneath the work and the implementation decision between planning and change. Show one review gap returning to the appropriate earlier work. | Three states: research and planning evidence, approved change and review, then follow-up or return. Static version: full flow with the decision and labelled return path. Do not present every task as needing every phase or treat a skill call as approval. |
| 30 | Static diagram. Different controls answer different questions; fast tests cannot replace specialist or customer judgment. | Build a compact evidence-to-decision map. Add a risk-and-uncertainty input that selects suitable checks, specialist review, and customer acceptance. Keep required independent assurance visible. Each branch states what it can establish. | No animation. Show controls in parallel, not as interchangeable green gates. Use no fictional risk score or implied automatic acceptance. |
| 31 | Static visual. Evaluation needs real evidence, not a new visualization with invented data. | Reuse slide 34's outcome measures and each team's baseline. Add human review effort, rework, AI spend, and time managing tool limits to total cost. Connect cost to the same user outcome and quality evidence. Label missing data explicitly. | No diagram or animation. Use an evidence table, not a token counter or an unsupported cost curve. Only add a chart later if actual comparable measurements justify it. |
| 32 | Static diagram. Installation and maintenance relationships are clearer together than as animated command output. | Show marketplace registration -> selected plugin installation -> verified agents and skills. Use a separate maintenance branch for marketplace refresh and installed-plugin update. Add a short instruction-loading limit: explicit references, not automatic path application. | No animation. Do not simulate a terminal or mark installation complete. State the main-tracking limit; verify exact commands during demo preparation. |
| 33 | Static card grid with a short lead-in. Attendees must leave knowing that installing the toolkit does not create adoption. | A slate "Toolkit installed" check pill, an arrow, and "Now what? Six commitments." Below it, six icon cards in a 3 by 2 grid, paired by colour as leaders, team, and organization: Sponsorship (leaders own the outcome), Authority (teams can decide and act), Shared ownership (decisions made together), End user time (end users join the work), Review capacity (experts review in time), and Maintained knowledge (practices stay current). Takeaway: installation is the easy part; adoption needs leadership commitments. | No animation, product names, guarantee, or measured result. Notes say the colour grouping is a teaching synthesis and each organization decides its own commitments. HVE-Core cannot supply sponsorship, end user time, authority, or review capacity. |
| 34 | Static visual with a clear contrast. An honest measurement frame is better than a chart without data. Attendees must leave knowing that AI activity shows use, not success. | A slate "AI activity" panel (prompts sent, code generated, seats activated; "Shows use, not success"), an arrow, and an "Outcome" panel ("Shows what changed") with six icon cards: useful value, quality, waiting, rework, experience, and total cost. Colour pairs group them as value and quality, flow, and people and cost. Takeaway: count outcomes, not activity. | No animation, chart, percentage, or product name. Do not add rising bars, countdowns, or a fabricated dashboard. Notes say the colour grouping is a teaching aid, each team baselines its own workflow, and unmeasured items are stated as not measured. |
| 35 | Static visual. The deeper section must close with a clear stopping point and a clear starting point. A team boarding pass makes the action concrete and personal. | One wide ticket. A purple "Team pass" band carries four numbered badges for the pillars. Four fields follow: Team (one team), Outcome (one real outcome), Read first (official documentation), and Then use (your role guide). A stub on the right says "Live demo" and "See one change, end to end." Takeaway: start with one team and one real outcome. Routes: demos and pause for questions. | No animation. The pass is a metaphor, not a required process. Notes keep the beta, security, and certification caveats and state that expert judgment and required independent review stay in place. Do not make the toolkit appear to complete the organizational change. |
| 36 | Static diagram. Give the audience a route map before switching to live work. | Four stages: install -> DT Coach problem -> PRD with no BRD -> one bounded RPI phase. Place the expected artifact and human checkpoint under each stage. Include a research-to-DT return and a clearly labelled prepared-fallback route. | No animation. Use the same compact route marker on slides 37-40, with only the current stage marked. Completing the route must not be drawn as a production-readiness badge. |

### Demo visual plan: slides 37-41

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 37 | Live demo. Real discovery and installation are clearer than a second diagram of the steps. | Full-size CLI view and the small route marker from slide 36. Show the marketplace registration, the plugin install, and capability discovery. Keep the recommended-route note short and visible. | No added diagram or animation. If the live path fails, use clearly labelled prepared capture and output. Do not present the capture as a successful live install. |
| 38 | Live demo. Reviewing the evidence and framing is the visual explanation. | DT Coach interaction for two short rounds. Show the coin-flip quote and the stakeholder evidence one at a time. Keep source labels and open gaps visible. | No added diagram or animation. The route marker shows the current stage. The stakeholder documents are fictional teaching material, not new interviews or live customer validation. |
| 39 | Live demo. The actual handoff and PRD show what carries forward better than an animated file transfer. | Readable Problem Statement Complete handoff beside the PRD Builder entry. Inspect confidence markers and marked gaps. Show the PRD scope, success criteria, and exclusions. | No added diagram or animation. Use a labelled prepared handoff or PRD if needed. Do not animate a transfer or show acceptance ticks before the real review. |
| 40 | Live demo. The artifact and checks, not a progress animation, establish what happened. | Show one current RPI artifact or check result at a time. Make the plan approval, the phase one diff, the test results, the review findings, and the open phase two readable. The chain shows a `/clear` command on each hop between stages. | Static `/clear` connectors on the RPI chain. No added animation. Show actual results and failures. Label fallback artifacts and incomplete work; do not run a simulated success sequence behind the live tool. |
| 41 | Static diagram. Return to the opening model while keeping demonstrated evidence and unproven claims distinct. | Reuse the customer-and-crew loop. Attach a few concise evidence callouts from the actual demonstration and a separate remaining-decisions area. Leave customer validation, organizational adoption, production readiness, and delivery gains unproven unless evidence establishes them. | No animation. Keep evidence and limits visible together for questions. Fill callouts only after rehearsal or the actual run; do not use decorative completion ticks. |

## Evidence and publication policy

Use public sources and original wording for public content. Private photos, transcripts, and the supplied internal-source research guide are planning references only. Do not publish them, non-public quotations, internal customer figures, or their local file paths.

The supplied guide contains secondary interpretations, internal references without public links, and speculative case descriptions. Do not treat those as verified evidence. Do not adopt fixed delivery durations, staffing formulas, customer results, or the suggestion that security and compliance can simply wait until after a prototype.

The four-pillar framing is this presentation's methodology structure, not an external industry standard. Keep public source support separate from teaching synthesis. Do not turn private experience into general claims.

Use [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the claim-to-source map and current technical limits. Do not use the demonstration as evidence of organization-wide delivery gains.

## Current status

The 41-slide deck is implemented. Slides 1-23 form the locked leadership section; slides 24-36 cover HVE-Core; slides 37-41 support the demos. The outline records the approved narrative, slide order, and visual intent.

Further refinement of the deeper HVE-Core section and speaker notes is tracked in separate issues. Keep those changes out of the leadership section unless a later decision explicitly reopens it. Live demo rehearsal and runbook preparation remain separate from this presentation issue.
