## Hypervelocity Engineering presentation outline

### Metadata

| Field | Value |
|---|---|
| Title | Hypervelocity Engineering |
| Subtitle | Why adding AI to the SDLC is not enough |
| Presenter | Daniel Scott-Raynsford |
| Audience | Technical leaders, engineering managers, and senior engineers |
| Format | Standalone leadership section, optional HVE-Core deep dive, then separate demos |
| Content duration | 30 minutes leadership + 30 minutes optional deep dive |
| Demo and Q&A duration | 30 minutes live demo; Q&A allocation not yet set |
| Last updated | 2026-10-30 |
| Status | ISE-aligned narrative and per-slide visual plans implemented in the independent Reveal.js deck |

This outline has 40 slides: 25 leadership slides, 10 optional HVE-Core slides, and five demo support slides. Each pillar has a practice slide and an example slide. Organizational and cultural change is central throughout the story.

The independent Reveal.js deck implements this outline. The original [Slidev presentation](../hypervelocity-engineering/slides.md) remains unchanged.

The [slide-by-slide visual and animation plan](#slide-by-slide-visual-and-animation-plan) specifies the treatment for all 40 slides. It identifies where a diagram helps, where a presenter-controlled build explains change, and where a static visual or live artifact is enough.

## Audience outcome

Attendees can explain why faster code and lifecycle-wide AI assistance do not by themselves establish customer value or faster delivery. They can describe the required changes in ownership, customer participation, decisions, specialist involvement, and retained capability. They can use the four pillars to plan a measured delivery experiment, not merely a tool rollout.

The optional section answers the practical question left by the leadership section: how do we turn these principles into shared, repeatable work? It maps HVE-Core capabilities to the delivery problems already established. The demos connect problem understanding to a bounded implementation through one public teaching scenario.

## Narrative thesis

Our delivery practices evolved with the way we built and released software. Packaged releases, cloud delivery, Agile, and DevOps changed the work and shortened feedback cycles. These developments overlap. Co-engineering also built customer capability and shared practices. Keep those successful engineering fundamentals; change the handoffs and responsibilities that no longer serve the work.

AI-assisted and agentic engineering can now make some implementation work much faster. If decisions, problem validation, review, and production preparation keep their old pace, faster code becomes a queue of unreviewed output. The constraint moves. We can build more things before we know which thing is useful, correct, safe, and ready to operate.

There are two failures to prevent: delivering too slowly and delivering something that does not create business value. Working software, even in production, does not by itself prove a useful outcome. Faster implementation and more prototypes do not settle which problem matters or which solution helps.

The leadership challenge is to change the whole delivery system, not just buy AI tools. Shared ownership, customer availability, decision rights, specialist knowledge, and operational responsibility must support the work. Cultural change means changing these daily behaviors and commitments, not adding meetings, adopting new role names, or asking people to work longer.

Make the change observable. The crew and customer share responsibility for an outcome. Evidence can change or stop work. Specialist knowledge shapes decisions early. Maintained foundations and reviewed artifacts preserve that knowledge. Leaders act on demonstrated cross-team constraints while retaining necessary controls.

HVE is the response: a small expert multidisciplinary crew works with the customer in a tight idea -> validation -> engineering -> feedback loop. Design Thinking tests business value. Production-ready accelerators remove repeated setup work. AI assists throughout the lifecycle. These four pillars work together; none can repair the delivery system alone.

AI amplifies expertise; people still need the expertise to review and validate its outputs. Security, observability, testing, continuous integration/deployment, and operational planning belong in the starting point and throughout delivery. A prototype is evidence for a decision, not proof of production readiness.

The intended change is from months of serial delivery toward useful outcomes in weeks or days where scope and readiness permit. This is an ambition, not a delivery promise. Test the changed way of working, identify the next constraint, and use that evidence to support organizational action. Co-work must leave the customer able to maintain the system and continue the practices.

The leadership section closes with those commitments and the shared mechanisms they need. HVE-Core then enters as optional reusable process support, not a substitute for organizational change or a production application foundation.

### Subtitle framing

The subtitle challenges adding AI across delivery while leaving ownership, customer participation, decision authority, specialist engagement, and governance unchanged. Do not define "AI SDLC" as coding alone. Lifecycle-wide AI assistance remains one of the four pillars.

If an audience's AI SDLC already includes these organizational changes, acknowledge the overlap. HVE explains the practices needed for that change; it is not an argument for replacing a label or a working toolkit.

## Narrative alignment

Lead with a question: what must change when implementation moves faster than the organization can decide, validate, and deliver? Retain the proven discipline, expose waiting and wrong assumptions, and show how the pillars change ownership and behavior. Organizational change is a condition for the loop to work, not a final recommendation after the framework.

| Story movement | Slides | Audience question | Purpose |
|---|---|---|---|
| Act 1: a proven discipline meets a changed capability | 1-5 | What stays valuable, and what must adapt? | Retain engineering fundamentals, co-engineering, and customer capability while introducing faster implementation |
| Act 2: faster output amplifies waiting and wrong assumptions | 6-9 | Are we delivering slowly, or delivering the wrong thing? | Give delayed delivery and missing business value equal weight; expose decisions and late specialist involvement |
| Act 3: change how work is owned, validated, and produced | 10-21 | Who must work differently for each pillar to succeed? | Teach each pillar through meaning, changed responsibilities, an example, evidence, and limits; reassemble the loop |
| Act 4: prove the loop, then change the organization around it | 22-25 | What evidence and commitments will support wider change? | Test a changed workflow, expose constraints and owners, secure sponsorship, and retain customer capability |
| Optional practical extension | 26-35 | How do these principles become daily work? | Map toolkit capabilities to the constraints, artifacts, and human decisions already explained |
| Separate demonstration | 36-40 | Can we follow the evidence through one real workflow? | Show one labelled teaching scenario, a reviewed handoff, controlled change, and remaining gaps |

The progression is recognition -> opportunity -> tension -> changed responsibilities -> evidence -> action. The four pillars connect delivery problems to changes in practice. Present this as a coherent operating model to test and adapt, not a proven necessary-and-sufficient formula for every organization.

Keep the history brief. Give Agile and DevOps credit for continuous feedback, small batches, automation, and shared responsibility. HVE extends that direction under changed conditions; it does not establish that Agile requires slow decisions or that DevOps failed. A two-week planning cadence need not prevent feedback or release within the sprint.

Do not claim that coding was the slowest task in every organization for 30 years. The supplied transcript itself describes substantial non-coding work. The defensible point is that faster implementation does not remove other delivery constraints. Do not use "six sprints in a few hours" as a measured result without a publishable source, comparable scope, and a stated readiness level.

Use one hypothetical delivery flow across the opening acts. First show its working and waiting stages. Then shorten only implementation while leaving other stages unchanged. Finally, replace serial handoffs with the continuous customer-and-expert-crew loop. Label this as a conceptual illustration; bar lengths are not measured workload shares.

Use the public manufacturing scenario on slide 7 to introduce the recurring teaching case (a plant requests a quality dashboard while operators lose troubleshooting knowledge across shift changes). Return to it in the pillar examples, the practical section, and the demos. A dashboard request is not a validated problem. Ten prototypes are an illustrative evaluation challenge, not measured evidence.

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

The leadership section gains four slides without extending its 30 minutes. Act 3 grows from 14 to 16 minutes, with three minutes per pillar. Shorter history, framing, and transitions make room. Use the extra slides to separate explanation from examples, not to add text. Keep toolkit commands and detailed context mechanics in the optional section.

A fifth opening slide names the Agentic SDLC and Forward Deployed Engineering labels and shows the first cracks. Slides 2, 3, 4, and 5 take 0.75 minutes each to make room.

## Four pillars

Use the same short names throughout. Explain the longer meaning once.

| Pillar | Meaning | Delivery constraint addressed |
|---|---|---|
| Multidisciplinary teams | A small expert crew and customer co-own the outcome; relevant specialist knowledge shapes shared decisions | Serial responsibility, lost context, and decision delays between disciplines or with the customer |
| Design thinking | Validate business value with users throughout idea, solution, and implementation decisions | Building a requested solution without understanding the need |
| Reusable accelerators | Production-ready starting points with security, observability, tests, and CI/CD built in; adapt and validate them | Repeated setup work and controls added too late |
| AI tooling | Amplify the expert team across the lifecycle, with informed human review and validation | Treating coding as the only activity that can improve |

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
| Packaged software, cloud, co-engineering, and shared playbook | Slides 2-4 | Use original wording, no private dates or organizational claims; show Agile and DevOps as overlapping developments |
| Faster output exposed requirements, architecture, handoff, and governance gaps | Slides 6-9 | Keep the failure modes; omit private code-volume figures and customer anecdotes |
| Whole-system improvement matters more than coding alone | Slide 6 | Use a conceptual flow, not unsupported coding-time percentages or copied arithmetic |
| Experiments connected delivery problems to changed practices | Slides 10-11 | Explain the problem-to-practice reasoning; do not claim we ran the speakers' experiments or publish their scale or results |
| Small expert crews, customer co-creation, and prepared starting points | Slides 12-19 | No fixed roster, fixed sprint length, or production-delivery guarantee |
| Explicit requirements, architecture, standards, and reviewed summaries | Slide 20 and optional slide 28 | Preserve the legibility lesson; use approved evidence, not private transcripts in a public repository |
| Short spikes, frequent feedback, and measurement of production value | Slides 21-23 | Do not equate prototypes with accepted production changes |
| Enduring principles and changing enabling technology | Slides 24-27 | HVE-Core supports selected practices; it cannot grant decision authority or replace customer participation |
| Q&A on organizational bottlenecks and distributed specialist knowledge | Slides 22, 24, and 32 | Turn the issue into a leadership responsibility, not a promise that a plugin removes governance |

The main talk supports shared team duties, specialist knowledge in the crew, co-engineering, experimentation, and retained customer capability. The Q&A makes executive sponsorship and wider organizational change especially explicit. Bringing those themes forward is a deliberate adaptation for this leadership audience, not a claim that they formed the speakers' original opening.

Use the source comparison to strengthen emphasis, not invent new evidence. Some organizations already review quickly. Identify an observed constraint rather than blaming every control. The manufacturing scenario explains the mechanism; it is not proof of organizational transformation. A public or approved change case would strengthen a later revision, but none is asserted here.

Public support includes the [DORA 2024 findings](https://dora.dev/research/2024/dora-report/), the [Engineering Fundamentals Playbook](https://microsoft.github.io/code-with-engineering-playbook/), and the [HVE Accelerators Hub](https://learn.microsoft.com/en-us/industry/playbook/).

DORA reports individual productivity benefits alongside delivery tradeoffs. This supports separating code output from delivery performance; it does not prove a universal causal result.

The [current HVE-Core guidance](https://github.com/microsoft/hve-core#readme) retains human judgment and warns that the framework changes rapidly. Describe it as patterns and learning to evaluate, not a stable platform or a production solution foundation. Keep it separate from the accelerator pillar. See [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for the evidence map.

## Part A: HVE leadership section

The 25 slides total 30 minutes, including transitions. A separate Q&A slot is not included. Act 3 receives 16 minutes; 12 of those minutes explain the four pillars and their examples.

| Slide | Title | Main message and narrative role | Visual | Minutes |
|---|---|---|---|---:|
| 1 | Hypervelocity Engineering: Why adding AI to the SDLC is not enough | Open with the title and the line *Why adding AI to the SDLC is not enough*. The subtitle asks the organizational question: *When code moves faster, what must change?* The subject is organizational delivery, not tool proficiency. Adding AI without changing how people own, validate, and decide work is the challenge. | Typography-led opening: title, second line, and question subtitle; no diagram or animation | 1 |
| 2 | Each delivery era changed how we worked | Connect packaged software, cloud, and overlapping Agile and DevOps practices. Include co-engineering and leaving customer capability behind. Technology changed, but engineering fundamentals and learning with customers remain valuable. | Delivery eras over a retained engineering foundation and shared customer capability | 0.75 |
| 3 | New words arrive. The cracks start to show. | Agentic SDLC and Forward Deployed Engineering become common labels. They name a direction; they do not change the delivery process by themselves. As delivery speeds up, cracks appear in handoffs, waiting, delivered value, feedback, and assurance. Slides 4-9 take each crack in turn. Do not claim that these approaches cause the cracks, and do not claim that no organization has already addressed them. | Two large label badges above one delivery-process slab. Five jagged cracks fall from the slab to short labels: handoffs, waiting, wrong value, late feedback, late assurance | 0.75 |
| 4 | Keep the fundamentals. Change the handoffs. | Retain the successful discipline. Show where serial responsibility, lost context, or fixed review windows now constrain the work. Change how people coordinate around fundamentals rather than reject Agile, DevOps, or necessary controls. | Same delivery flow with retained checks and handoffs marked for redesign | 0.75 |
| 5 | Then AI changed implementation speed | Show the first response: use assistants and agents to produce code faster. Some bounded tasks can change dramatically. Do not imply that a generated prototype has completed the whole delivery lifecycle. | Shorten only the implementation segment of the same flow | 0.75 |
| 6 | The code is faster. The outcome is still waiting. | Leave decisions, access, review, release queues, and non-coding lifecycle work (research, requirements, testing, documentation, and operational preparation) unchanged. The constraint has moved, not disappeared. Establish why optimizing coding alone does not optimize the whole system. | Before-and-after flow; highlight unchanged waiting and non-coding work, not invented percentages | 1.25 |
| 7 | Working software can still miss the business need | Introduce the recurring manufacturing scenario: a plant requests a quality dashboard while operators lose troubleshooting knowledge across shifts. Show that the request can be delivered in full and the operators' question stays unanswered. Give wrong value equal weight with slow delivery. | A delivered dashboard request, marked as met, opposite the operator's shift-handover question, marked as unanswered, with a "not equal" link between them | 1.25 |
| 8 | Feedback cannot wait for the next ceremony | Give customer representatives time and authority to decide while choices remain cheap. Feedback can happen within the planning period. Keep useful ceremonies, but do not make a meeting the only route to a decision. | A needed customer decision and available owner beside the fast iteration loop | 1.25 |
| 9 | Production work cannot arrive at the end | Security, data, infrastructure, operations, accessibility, and documentation need early owners and participation. Use prepared foundations and repeatable checks alongside expertise. Automation alone cannot supply assurance or operational responsibility. | People, prepared foundations, and ongoing evidence replacing late-only involvement | 1.25 |
| 10 | HVE changes the delivery operating model | Resolve the tension. The goal is the right customer outcome and an engineered, operable solution, not maximum code output. Introduce the operating model; the following examples explain how it works. | Old serial flow becoming a shared customer-and-engineering loop | 0.75 |
| 11 | Four constraints explain the four pillars | Show inspect -> compare -> adapt. Map the Act 2 constraints 1-to-1 to the four pillars: handoff and decision waits (slides 6, 8) to multidisciplinary teams, unvalidated requests (slides 7, 8) to Design Thinking, repeated setup and late assurance (slide 9) to reusable accelerators, and non-coding lifecycle effort (slide 6) to AI tooling. | Four Act 2 constraints mapped 1-to-1 to the four pillars with an inspect -> compare -> adapt loop | 1.25 |
| 12 | Multidisciplinary teams: shared work, shared decisions | The crew and customer co-own the outcome and team duties. Bring relevant specialist knowledge into the work, with support and escalation. Shared responsibility is more than separate departments coordinating handoffs. | Customer engineers and disciplines around one jointly owned outcome | 1.5 |
| 13 | Example: resolve the question with the people who know | Start at the arrival of the plant's dashboard request. Before assuming the dashboard is the right solution, customer engineers co-own an initial scoping and assumption check with the operator, domain expert, and product owner. A security or Responsible AI champion brings relevant knowledge, with specialist support when needed. Record the decision, owner, and open questions. | Initial request question, shared evidence, distributed expertise, a customer co-owner, and a decision to investigate shift handover | 1.5 |
| 14 | Design Thinking: validate value throughout delivery | Explain problem, solution, and implementation spaces. Gather evidence, compare options, test assumptions, and revisit the framing. This is a continuous discipline, not an opening workshop or a request-to-backlog conversion. | Three spaces connected by evidence and return paths | 1.5 |
| 15 | Example: the dashboard is a request, not the problem | Build directly on slide 13's crew check. Investigate knowledge access across shifts, define user success before choosing an interface or technology, and compare options. Evidence may change the request or stop it. Show proposed evaluation, not a claim that user tests have occurred. | Request -> shift-handover evidence -> user success -> options -> test or stop | 1.5 |
| 16 | Reusable accelerators: production foundations from the start | Explain maintained starting points with infrastructure, identity, security, observability, tests, CI/CD, and operational guidance. Name maintenance ownership. Verify actual fit and the assurance still needed; a foundation is not a finished solution. | Owned production foundation below business-specific work and remaining checks | 1.5 |
| 17 | Example: build the useful slice on a prepared foundation | Illustrate how an approved starting point removes repeated environment and pipeline work. Show inherited controls, business-specific work, and remaining assurance separately. The new increment still needs validation and operational acceptance. | Reused foundation, changed increment, checks, and remaining readiness work | 1.5 |
| 18 | AI tooling: amplify the crew across the lifecycle | Assist research, requirements, architecture, implementation, testing, documentation, and operations with reviewed context and checks. Experts remain accountable. Make AI-assisted delivery versus an AI-powered product explicit: the delivered solution need not contain AI. | Whole delivery loop with AI assistance and human checkpoints; product choice remains open | 1.5 |
| 19 | Example: carry evidence through the whole increment | Illustrate AI-assisted evidence synthesis, acceptance criteria, implementation and tests, then a runbook draft. Show who checks each output and returns gaps to the team. No toolkit commands or claim that AI validates its own work. | Evidence -> assisted outputs -> named reviewers -> next decision | 1.5 |
| 20 | Faster output needs explicit evidence and expert judgment | Focus on technical and quality verification inside the crew: reviewed requirements, architecture, decisions, deterministic checks, specialist review, and customer acceptance. Maintain and review that knowledge; document volume is not the goal. Neither plausible output nor passing tests alone proves correctness. | Maintained shared evidence and accountable review inside the crew | 1 |
| 21 | Replace the long handoff with a tight learning loop | Focus on how the four pillars lock together into one continuous team loop: idea -> validation -> engineering -> feedback. Attach each pillar's commitment (shared ownership, customer time, maintained foundations, review capacity) and highlight the fragile boundary where the crew depends on external organizational support. | Supported customer-and-crew loop with the external organizational dependency boundary highlighted | 1 |
| 22 | The organization must make the loop possible | Focus on the external boundary the crew cannot cross alone: a ready increment waiting for a required organizational risk or policy decision. Identify the owner and a sponsored change in participation, capacity, escalation, or policy. Reassess the wait while retaining required assurance. Do not assume all governance is slow. | Observed wait -> accountable owner -> sponsored change -> reassessment | 1.25 |
| 23 | Test the way of working. Measure the outcome. | Baseline one delivery workflow and test changed responsibilities and practices, not just AI access. Contrast AI-written-code share with user success and accepted production value. Track waiting, quality, rework, and total cost to find the next constraint. | One measured delivery experiment with output and outcome measures contrasted | 1.25 |
| 24 | Principles need shared mechanisms and owners | Focus on capability transfer and repeatability after co-engineering ends: pair reviewed context, evidence capture, workflows, and checks with customer engineers who co-own and maintain them so capability stays with the customer. | Principles -> owned practices -> maintained mechanisms -> retained customer capability | 1.25 |
| 25 | HVE is the operating model. HVE-Core helps apply it. | Ask leaders to sponsor one outcome with customer participation, decision and review ownership, and support for cross-team constraints. Then introduce optional reusable process support. Tools cannot supply the organizational commitments. | Leadership commitments above an optional, replaceable process-support layer | 1.25 |

### Act 3: detailed pillar treatment and examples

Each pillar gets three minutes across two visual slides. The first explains meaning and changed practice. The second makes that meaning concrete. Do not replace these examples with four definitions, tool names, or a dense summary grid.

Use the same manufacturing thread throughout. The public tutorial supplies the dashboard request and knowledge-accessibility theme. Team decisions, evaluation steps, foundation contents, and AI-assisted outputs below are illustrative teaching extensions, not published customer results or completed tutorial evidence.

For each example, ask: *Who must work differently for this to succeed?* Show the question, changed responsibility, action, review evidence, and next decision. Show an expected artifact where useful, but do not invent findings, completed checks, or measured gains.

| Pillar and slides | Meaning and changed practice | Worked example | Evidence and leadership requirement |
|---|---|---|---|
| Multidisciplinary teams, 12-13 | The crew and customer co-own team duties and the outcome. Relevant security and Responsible AI knowledge shapes the work, supported by specialists and escalation. This is distributed responsibility, not separate queues sharing a meeting. | Start when the plant's dashboard request arrives. Before assuming a dashboard is the right solution, customer engineers co-work with the operator, domain expert, and product owner to check what happens at shift handover. A champion contributes relevant security or Responsible AI knowledge. The crew records initial evidence, the needed customer decision, when it is needed, and open questions for Design Thinking. | A co-owned decision record and a named customer decision-maker. Leaders protect customer time, give suitable authority, and support specialist escalation. Champions are an example, not a fixed roster or a replacement for independent assurance. Customer engineers retain the practice after the engagement. |
| Design Thinking, 14-15 | Discover the need before committing to a solution. Validate problem, solution, and implementation choices repeatedly. Evidence can change the backlog or stop the work. More prototypes do not create more validation by themselves. | Build on slide 13's scoping check and investigate knowledge access across shifts. Compare a dashboard with other ways to make relevant knowledge available. Select a small test using representative tasks; define success before comparing the options. Do not predetermine a voice interface or any other solution. | A problem statement, evidence-linked assumptions, evaluation criteria, and a proceed, change, investigate, or stop decision. Possible measures include finding the correct procedure and knowing when to escalate; these are proposed criteria, not measured results. Leaders make users and decision-makers available. |
| Reusable accelerators, 16-17 | Reuse owned, maintained foundations for repeated engineering work. Bring infrastructure, identity, controls, telemetry, tests, delivery automation, and operational guidance into the starting point. Verify actual fit rather than treating reuse as certification. | Start from an approved environment, identity pattern, logging, and CI/CD with known maintenance owners. Add the business-specific behavior, check deployment and access, and review operation and recovery with the customer engineers. Separate inherited capability, changes, and assurance still required. | An ownership and readiness view, not just an available template. Leaders fund maintenance, access, and platform readiness. HVE-Core can accelerate processes; installation does not supply these production solution foundations or certify an increment. |
| AI tooling, 18-19 | Apply assistance across delivery with reviewed context, bounded tasks, and suitable checks. Experts validate meaning, implementation, and operation. AI-assisted delivery does not require an AI-powered product. More AI activity is not the outcome. | Follow an increment through assisted research synthesis, acceptance criteria, implementation and tests, and operating guidance. A domain expert, product owner, engineer, and operations reviewer check relevant outputs. Each artifact has a reviewer and decision; unresolved assumptions return to the crew. | Traceable outputs, actual review findings, and acceptance or further work. Leaders provide approved tools, data boundaries, review capacity, and time for learning. AI-generated tests and another model's approval are not independent proof of correctness. Measure human time and rework as well as AI spend. |

Keep the visible example simple: one decision vignette, one request-to-test path, one foundation cutaway, and one assisted-work sequence. Put the detailed explanation above in speaker notes. The examples must remain understandable without the optional HVE-Core section.

Expertise describes the crew's ability to judge and validate, not a seniors-only staffing policy. Include mentoring and capability development in slide 12's notes. Shared duties do not erase distinct expertise, risk ownership, or required separation of duties.

Close Act 3 with a two-state view on slide 21: first show the complete loop with all four pillars and commitments locked together, then highlight the fragile boundary where the crew depends on external organizational commitment (such as customer decision availability), setting up slide 22. Do not animate four separate failures.

Keep the other counterexamples in speaker notes: without the crew, decisions queue; without Design Thinking, the wrong need can be served; without foundations, setup and controls return as late work; without lifecycle-wide assistance, other work can remain the limiting step. This is a teaching model, not a promise that every activity needs AI.

### Act transitions and speaker-note intent

| Transition | Spoken connection | What the audience should now understand |
|---|---|---|
| Act 1 -> Act 2, after slide 5 | We kept the discipline and changed implementation speed. Now look at the decisions, ownership, and assumptions around it. | Faster code does not change the organization by itself |
| Act 2 -> Act 3, after slide 9 | We must prevent slow delivery and delivery of the wrong thing. That requires changes in how people own and validate the work. | Waiting and wrong value are distinct failures |
| Inside Act 3, slide 11 | Inspect the constraint, compare changed practices, and adapt. The pillars connect these changes into one model. | HVE supports learning about the way of working, not simply deploying a framework |
| Act 3 -> Act 4, after slide 21 | The crew can change its practices. It cannot independently change another function's priorities, capacity, or policy. | Leaders must act on demonstrated cross-team constraints |
| Leadership -> optional practical section, after slide 25 | Tools can make practices repeatable. They cannot supply authority, customer availability, or organizational change. | HVE-Core supports selected practices; it is not the transformation |

Slides 1-5 total 4 minutes. Slides 6-9 total 5 minutes. Slides 10-21 total 16 minutes. Slides 22-25 total 5 minutes. Protect the three minutes for each pillar; do not let history, framework setup, or tool discussion consume the worked examples.

Use progressive reveals only for cause and effect: the original flow, the shortened code segment, exposed queues, the four responses and examples, and the reassembled loop. Each slide has one visible message. Put the concrete example on screen; keep its detailed explanation and qualifications in speaker notes.

On slide 9, explain "shift left" as earlier participation, prepared foundations, and continuous evidence. It does not mean completing every design decision upfront, automating every approval, or postponing security until after a prototype. Some independent reviews and separation-of-duty requirements remain necessary.

On slide 11, make inspect -> compare -> adapt visible rather than leaving experimentation only in notes. Do not invent an experiment history, borrow the speakers' results, or claim that four pillars are a universal industry standard.

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
| 32 | Build controls into the workflow | Apply slides 9 and 20: involve relevant specialists early, generate reviewable evidence, and use deterministic checks. Match review depth to uncertainty and risk. Requirements, tests, specialist review, and human acceptance have different jobs. | Uncertainty to controls, review evidence, and an accountable decision | 3 |
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

The recurring manufacturing scenario on slides 7, 29, and 30 stays as the teaching case. The demo uses a separate, small scenario. [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) holds the time plan, commands, prompts, and fallbacks.

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
| Does FDE mean a fixed role or team roster? | Slide 3 and slide 12 notes: explain the delivery motion and needed expertise, not a universal job definition or staffing ratio |
| Must we abandon Agile, DevOps, or two-week planning? | Slides 2 and 8: retain useful practices; allow decisions, feedback, and release at the pace the work needs |
| Does HVE reject AI SDLC approaches? | Slide 3, opening subtitle framing, and slide 25: reject tool adoption without changed practices, not a label; acknowledge approaches that already include the required organizational changes |

Keep private customer examples, unverified performance figures, predictions about model capabilities, and unresolved product comparisons out of the public story. Do not repeat mathematical errors or anecdotal results as general evidence.

## Visual direction

Use an independent light presentation with large left-aligned headings, restrained purple and warm accents, open diagrams, and a horizontal four-pillar model. The reference material informs topic emphasis, not copied layouts or artwork. Use original public wording and diagrams. Keep private reference images out of the repository.

- Use one clear message per slide and consistent markers for the four pillars.
- Start with one familiar delivery-flow visual. Shorten its code segment, reveal the remaining waits, and then transform it into the customer-and-expert-crew loop.
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

These are design specifications, not implemented assets. The slide tables above retain the narrative and timing. Use the decisions below when revising the Reveal.js deck. Do not add a diagram merely to fill space or animate a relationship that is clearer when shown at once.

### Treatment rules

| Decision | Required treatment |
|---|---|
| Animated diagram | A diagram is needed, and a change of state helps explain cause, sequence, or a return path. Use the specified presenter-controlled build. |
| Static diagram | A relationship, structure, or comparison needs a diagram. Show it at once; motion would add steps without adding meaning. |
| Static visual | No diagram or animation is needed. Use the specified illustration, typography, or evidence table. |
| Live demo | No added explanatory diagram or animation is needed. The real interaction and reviewed artifact supply the evidence. |

Use at most three states, including the opening state, for each animated diagram. Advance only when the presenter chooses. Prefer a simple reveal, highlight, or replacement to a complex morph. Do not add automatic playback, looping arrows, moving particles, typing effects, animated counters, or decorative slide transitions.

All builds fit within the current slide allocations; they do not add speaking time. Static slides provide pauses between explanations. Keep labels short and place qualifications in speaker notes. The detailed tables below are production instructions, not text to copy onto slides.

Every animated diagram needs an explicit static version for reduced-motion viewing and print. Where the argument depends on a change, show labelled before-and-after panels or numbered states. Do not export overlapping states or hide the earlier evidence. Do not merely freeze an incomplete build.

Use labels, arrowheads, line styles, and position as well as color. Keep the meaning clear without motion. Provide a short text description for each diagram. Presenters must be able to reveal or show the complete argument without waiting for an effect.

Label conceptual delivery flows as illustrative and not to scale. Do not encode invented durations, productivity gains, or measured results in bar lengths, charts, check marks, or animation speed. Label proposed decisions and teaching evidence. An animated step is not evidence that the work occurred.

### Reusable visual threads

Reuse these compositions rather than introduce a new visual language on every slide. Keep matching labels and positions where comparison matters. Reuse does not mean repeating the same animation.

| Visual thread | Slides | Continuity requirement |
|---|---|---|
| Delivery work and waiting | 4-6, then 9-10 and 22 | Use the same named activities and waits. Only the implementation work changes on slide 5. Retain required assurance when redesigning the flow. |
| Customer-and-crew learning loop | 10, 18, 21, and 40 | Keep idea, validation, engineering, and feedback in the same positions. Keep the customer and expert crew inside the loop. AI and tooling support it; neither replaces its owners. |
| Shared ownership and reviewed evidence | 12-13, 19-20, 24, and 28-32 | Distinguish the question, evidence or artifact, responsible people, and decision. Reuse the same ownership labels in concept and example slides. |
| Maintained production foundation | 9 and 16-17 | Keep inherited capability, business-specific work, maintenance ownership, and remaining assurance distinct. Do not place HVE-Core inside the production foundation. |
| Delivery measurement | 23 and 33 | Reuse the same outcome, baseline, and experiment comparison. Add human effort and AI cost in the practical section rather than introduce an unrelated dashboard. |
| Method, tools, and demonstration route | 25-27 and 35-39 | Keep human commitments separate from optional process support. Reuse a small four-stage route marker during demos; it is navigation, not a second explanatory diagram. |

### Act 1 visual plan: slides 1-5

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 1 | Static visual. The opening question needs attention, not an explanation before the story starts. | Large opening question, session title, and subtitle. Leave open space. Do not preview a detailed process, toolkit, or four-pillar diagram. | No animation. Show the complete opening at once. |
| 2 | Static diagram. Overlapping developments and retained fundamentals are clearer together than as a rigid sequence. | Packaged software and cloud delivery across the top. Show overlapping Agile, DevOps, and co-engineering bands beneath them. A continuous foundation carries engineering discipline and customer capability. Avoid dated boundaries or measured spacing. | No animation. Keep the full history visible so overlap remains clear. Do not imply that one practice replaced the preceding one. |
| 3 | Static visual. The new labels and the first cracks need one glance, not a build. | Two big-word badges (Agentic SDLC, Forward Deployed Engineering) above one delivery-process slab. Five crack glyphs fall from the slab to the short labels that slides 4-9 explain. | No animation. Show every crack at once; label the scene as a general framing. Show no failure rates or measured results, and do not imply the named approaches cause the cracks. |
| 4 | Static diagram. Establish the reference flow that the next slides will change. | One conceptual request-to-outcome flow with implementation, review, release, feedback, and visible waits. Mark handoffs separately from required checks. Keep the retained engineering foundation below it. | No animation. Show the whole system before changing one activity. Use short labels; explain activities in notes rather than draw a full value-stream map. |
| 5 | Animated diagram. Changing only implementation makes the local-versus-system distinction visible. | Reuse slide 4 exactly. Keep decisions, waits, checks, and their positions fixed. Show the old implementation outline while its active work block becomes shorter. Label the comparison as conceptual, not a performance result. | Two states: original flow, then shorter implementation work. One presenter advance. Static version: aligned before-and-after rows with the unchanged waits and checks clearly labelled. |

### Act 2 visual plan: slides 6-9

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 6 | Static diagram. Hold the comparison so the audience can inspect the remaining constraints. | Reuse the two aligned flow states from slide 5. Emphasize unchanged decision, access, review, and release waits alongside unchanged non-coding lifecycle work (research, requirements, testing, documentation, and operational preparation). Connect the unresolved outcome to those constraints, not to an invented percentage. | No further animation. The static comparison is the conclusion of slide 5's change, not a second speed demonstration. |
| 7 | Static visual. A human question next to a met request makes the missing value clearer than another process diagram. | Two panels joined by a "not equal" link. Left: "What was asked", the quote "We need a quality dashboard", marked "Delivered. Works as specified." Right: "At shift handover, operators ask", the quote "What did the last shift already try?", marked "Still unanswered." Label the slide an illustrative scenario. Avoid a detailed dashboard interface or fictional metrics. | No animation. Keep the met request and the unanswered need visible together. State the unmet need as the premise of the illustrative scenario. Do not display measured results. Slides 14 and 15 test whether knowledge access is the real need. |
| 8 | Animated diagram. Show the difference between a meeting-dependent decision and access to a responsible customer representative. | One open question beside the iteration loop. Keep the planning ceremony visible as a useful coordination point. Add a direct route to a named customer decision owner with time and suitable authority. | Two states: question waiting for the next meeting, then a decision route inside the work. Static version: labelled routes compared side by side. Do not show invented response times or permanent customer availability. |
| 9 | Animated diagram. Earlier participation must be distinguished from simply deleting a late check. | Reuse the delivery flow with a late-only assurance point. Add early specialist participation, prepared controls, and operational ownership across the work. Keep any required independent review visible at the end. | Two states: late-only involvement, then continuous participation and evidence with required review retained. Static version: aligned before-and-after flows. Do not imply all design is completed upfront or every approval is automated. |

### Act 3 visual plan: slides 10-21

| Slide | Decision and reason | Required composition | Build and static treatment |
|---|---|---|---|
| 10 | Animated diagram. This is the narrative change from serial handoffs to shared learning. | Begin with the familiar serial flow. Replace it with idea -> validation -> engineering -> feedback around the customer and expert crew. Keep assurance present. Do not add toolkit logos or pillar detail yet. | Two states with one presenter advance. A simple replacement is sufficient; a complex shape morph is not required. Static version: labelled serial flow and learning loop with a clear change in ownership. |
| 11 | Animated diagram. The pillars must follow from the Act 2 constraints rather than appear as an unexplained framework. | Align the four Act 2 constraints 1-to-1 with their practice responses: handoff and decision waits (slides 6, 8) with multidisciplinary teams, unvalidated requests (slides 7, 8) with Design Thinking, repeated setup and late assurance (slide 9) with reusable accelerators, and non-coding lifecycle effort (slide 6) with AI tooling. Add one shared inspect -> compare -> adapt return path. | Three states: Act 2 constraints, aligned pillar responses, then the shared learning path. Static version: complete pairs and labelled return path. Do not reveal twelve small cards or animate each label separately. |
| 12 | Static diagram. Shared ownership is a relationship, not a sequence of role arrivals. | Put one outcome inside a shared customer-and-crew boundary. Place customer engineering, product/domain knowledge, engineering, and relevant specialist support around it. Distinguish escalation and independent assurance without drawing a fixed organization chart. | No animation. Customer participation is visible from the start. Label the arrangement as illustrative, not a mandatory roster or seniors-only team. |
| 13 | Animated diagram. Trace how the people in slide 12 perform the initial scoping check when the dashboard request arrives. | Keep the shared-ownership composition. Place the incoming dashboard request and shift-handover assumption at its center. Connect relevant evidence contributions to a customer decision owner and a short decision record to investigate shift-change knowledge access. Keep specialist support distinct from automatic approval. | Three states: incoming request question, relevant contributions, then the proposed decision record and owner. Static version: numbered question, contributions, and decision structure. Do not imply the example has resolved real customer questions. |
| 14 | Static diagram. Seeing all three spaces and return paths prevents a workshop-then-build interpretation. | Three connected spaces: problem, solution, and implementation. Show evidence links and return paths between them. Place the customer alongside all three. Avoid a one-way funnel or nine tiny method boxes. | No animation. Keep the complete non-linear model visible while the presenter explains it. |
| 15 | Animated diagram. Show how slide 13's crew check reframes the dashboard request into an evaluable user need. | Begin with the dashboard request questioned in slide 13. Add teaching evidence and a user-success question about knowledge access across shifts. Then connect success criteria to alternative options and a test, change, investigate, or stop decision. Do not select an interface. | Three states: request, evidence and user need, then criteria and options with the decision branch. Static version: three numbered panels. Label proposed evaluation; do not animate a preferred option into a winning solution. |
| 16 | Static diagram. A foundation cutaway explains inherited capability and unfinished work at the same time. | Show an owned, maintained production foundation under business-specific work. Group infrastructure and identity, security and observability, and testing and delivery automation. Mark operational guidance, maintenance ownership, and remaining solution assurance without filling the slide with components. | No animation. Use clear layer labels, not a claim that the foundation is a complete or certified application. Keep HVE-Core outside this diagram. |
| 17 | Animated diagram. Separate what is reused from what still has to be engineered and accepted. | Reuse slide 16's foundation and owner labels. Add one bounded business increment above it. Keep inherited controls, changed behavior, and remaining deployment, access, operation, and recovery checks distinct. | Two states: selected foundation, then the increment with required checks. Static version: complete cutaway labelled reused, changed, and still to verify. Do not animate remaining assurance into completed ticks. |
| 18 | Static diagram. Lifecycle-wide support must be visible at once so AI is not mistaken for a coding stage. | Reuse the customer-and-crew loop. Mark AI assistance around research, engineering, review, and operation, with human judgment visible. Add a separate short label: AI in the product is optional. Do not put AI in place of the customer or crew. | No animation. Keep the whole lifecycle and the delivery-versus-product distinction visible together. |
| 19 | Animated diagram. Follow evidence through assistance, review, and correction rather than show autonomous completion. | Four linked outputs: evidence synthesis, acceptance criteria, increment and tests, and operating guidance. Put named human review responsibilities beside them. Use one labelled unresolved-assumption return to the relevant earlier work. | Three states: assisted outputs, accountable reviewers, then one return path. Static version: the complete chain and return path, numbered in reading order. Outputs remain illustrative drafts unless actual review evidence is supplied. |
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

## Draft status

The approved 40-slide outline is implemented in the independent Reveal.js deck. Organizational and cultural change connects the opening, pillar examples, leadership experiment, and practical bridge. The subtitle targets adding AI without changing practices, not lifecycle-wide AI assistance or a competing methodology label.

The audience, 30 + 30 minute format, optional toolkit boundary, and agreed demo route remain unchanged. The deck uses 25/10/5 slides. Act 3 has 16 minutes, including three minutes per pillar. The outline-alignment test checks section timing and ordering.

All 40 slides have an explicit diagram, animation, static-visual, or live-demo decision. The deck uses original diagrams and a restrained, static 8-S2 wave background. Slides that the plan marks as animated currently ship in the specified static version, with every state visible at once. The presenter-controlled builds are not yet implemented.

The demo support slides do not establish that a live demo is ready. The demo route and prompts are in [DEMO-SCRIPT.md](./DEMO-SCRIPT.md). Rehearsal, labelled fallback artifacts, and the open verification items remain future preparation. This work is local and uncommitted.
