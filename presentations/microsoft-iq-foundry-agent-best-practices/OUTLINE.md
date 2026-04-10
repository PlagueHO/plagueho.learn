# From Chat to Agents: The Agentic Loop & Work IQ, Fabric IQ and Foundry IQ - Presentation Outline

## Metadata

| Field | Value |
|-------|-------|
| **Title** | From Chat to Agents: The Agentic Loop & Work IQ, Fabric IQ and Foundry IQ |
| **Presenter** | Daniel Scott-Raynsford |
| **Target Duration** | 20 minutes |
| **Target Audience** | CTOs, Heads of Architecture (ISVs & SIs across Asia) |
| **Event / Context** | Microsoft Asia Partner CTO Community — Episode 1 |
| **Created** | 2026-04-02 |
| **Last Updated** | 2026-04-08 |
| **Status** | Draft |

## Objectives

What should attendees take away from this presentation?

1. Understand the fundamental shift from stateless ChatCompletions (request/response) to the autonomous ReAct Loop (Reason → Action → Observe) — and why that shift changes how you build, test, and operate AI solutions.
2. Recognize why tool usage is the critical capability that separates chatbots from enterprise agents.
3. Know the three foundational IQ intelligence layers (Work IQ, Fabric IQ, Foundry IQ) and how they provide agents with enterprise knowledge.
4. See why IQ-backed tools can become a moat and a form of productized, purchasable intelligence for software businesses — substitute your own domain for airports and the pattern holds.
5. Understand Foundry Agent Service v2 as the enterprise runtime and lifecycle choice for tool-using agents.
6. Leave with practical guidance on tool calling design, agent instruction, evaluation using Foundry's agent evaluators, monitoring, governance, and security for tool-using agents.

## Narrative Thread

The running story for this deck is the evolution of an airport operations solution, anchored on a single concrete incident: **the airbridge on Gate 35 fails mid-morning, suddenly taking the gate out of service**.
We start with a basic chat interface that helps an operations supervisor ask simple questions — "What is the SOP for airbridge failure?" and "Which flights are using Gate 35?" — then progressively reveal why those one-shot answers are insufficient
and how the solution must evolve into a governed, tool-using agent that can "Create and execute an operational plan remediating the Gate 35 airbridge failure and continuously respond to changing conditions."

The airbridge failure is deliberately mundane but operationally cascading: flights must be reassigned, passengers re-routed, ground crews redirected, maintenance dispatched, knock-on delays managed, and communications updated — all while conditions keep changing. This makes the case for agentic behavior visceral rather than theoretical.

By the end, the solution has become a governed operational assistant that can coordinate gate reassignment, crew logistics, maintenance dispatch, passenger communications, and continuous recovery planning — all driven by the ReAct loop and IQ-backed tools.

Crucially, the story is not just about building an internal copilot. It is about productizing airport operations intelligence into services customers can consume on demand to improve efficiency, reduce cost, and increase passenger satisfaction. Substitute your domain for airports — healthcare, logistics, finance — and the pattern is the same.

## Slide Outline

### 1. Title / Hero

- **Layout**: cover-style custom hero (reuse hero-shell pattern from agentic-development-evolution)
- **Content**:
  - Session title "From Chat to Agents: The Agentic Loop & Work IQ, Fabric IQ and Foundry IQ", subtitle, event badge, 20-minute visual indicator
  - Presenter card: **Daniel Scott-Raynsford** — Principal Software Engineer, Microsoft; GitHub: [@PlagueHO](https://github.com/PlagueHO)
  - "How this was built" — keep to a single spoken sentence rather than occupying visual real estate on the hero. Use the extra seconds for the airport story seed instead.
  - Framing: this presentation is itself a compact example of an agentic workflow — meeting → recap → outline → slides
- **Narrative**:
  - Introduce the running airport story: an operations control center wants an AI solution to help manage disruptions. Seed the specific incident: the airbridge on Gate 35 has just failed, taking the gate out of service mid-morning with multiple flights affected.
  - Position the audience at the start of the journey: today, that solution is still just an idea, and the question is how it evolves from "a chatbot for ops" into something genuinely operational and commercially valuable.
- **Speaker Notes**: "Before I dive in — a quick note on how this was made. Daphne and I had a Teams call to align on content; I used GitHub Copilot and WorkIQ to pull the recap and build these slides. The whole thing is an agentic workflow in miniature. Now, let me set the scene: imagine you're a CTO building software for airport operations, and the airbridge on Gate 35 just failed."
- **Duration**: ~1 min
- **Discussion / Thoughts**:
  - Compressed the "how this was built" strip into one spoken sentence to free visual space for the airport narrative seed.
  - The airbridge failure is the single incident that drives every slide. It should be seeded here with one concrete phrase, but without competing with the hero content.

### 2. From Chat to the ReAct Loop

- **Layout**: two-stage visual — request/response on the left, ReAct loop on the right
- **Content**:
  - Stage 1: classic ChatCompletions flow (User → API → Response)
  - Stage 2: ReAct loop (Reason → Action → Observe → repeat)
  - One-line contrast: **single-turn answers vs iterative, tool-using agents**
  - Transition callout: **"Everything you know about building chat features is necessary but insufficient. Agent-based solutions need a different operating model."**
- **Narrative**:
  - Our first airport solution is a chat assistant. The supervisor asks: "What is the SOP for airbridge failure?" and "Which flights are using Gate 35?" The system retrieves the answers and stops.
  - That works for two isolated lookups, but it completely misses the real need: the supervisor must reassign those flights to other gates, check crew availability for the new stands, dispatch a maintenance team, notify passengers across multiple flights, and keep adjusting as conditions change (e.g. the maintenance ETA slips, another gate becomes available, a crew shift ends).
  - The real question is: "Create and execute an operational plan remediating the Gate 35 airbridge failure and continuously respond to changing conditions." That requires a loop, not a lookup.
  - Business seed: the loop is what lets you deliver continuous operational intelligence, not just one-shot answers — and that's what makes agents productizable.
- **Speaker Notes**: "Most organizations are still here on the left: request, response, done. The supervisor asks 'What is the SOP?' and 'Which flights use Gate 35?' and gets two answers.
  But the real task is much bigger: reassign flights, redirect crews, dispatch maintenance, update passengers, and keep adapting.
  That requires an agent that loops: reason, act, observe, and continue until the disruption is resolved. The rest of this presentation is about what's different."
- **Duration**: ~2.5 min
- **Animations**: Reveal left side first, then transition to the loop on the right
- **Discussion / Thoughts**:
  - This merges the old problem/setup slide with the ReAct explanation to save time while preserving the strongest transition in the deck.
  - The audience should be able to grasp the shift in one visual glance: linear flow on one side, loop on the other.
  - The airbridge failure example is concrete enough that every CTO can map it to their domain: one incident that cascades into many operational tasks.
  - The "different operating model" transition is now explicit so the audience understands the rest of the deck is about *what's different*, not just *what's new*.
  - This is still the conceptual anchor; the rest of the deck depends on this landing quickly.

### 3. Why Tools Are Everything

- **Layout**: center visual with progression strip
- **Content**:
  - "An agent without tools is just a chatbot with anxiety."
  - Tools = the agent's hands
  - Visual progression: **CRUD tools → smart knowledge tools → agentic tools**
  - Short callout: **smart knowledge tools become a moat** because they combine business context, multiple knowledge sources, governance, and reasoning
  - Business framing: **this is purchasable intelligence** — disruption recovery, gate remediation, and operational coordination delivered as intelligent services on demand
- **Narrative**:
  - To handle the Gate 35 airbridge failure, the agent needs tools: gate status lookup, flight schedule query, crew availability check, maintenance dispatch, passenger notification, and operational plan management.
  - But tool calling is only as good as tool design. Consider a tool named `get_gate_status` — it can tell you Gate 35 is out of service, but the agent has no idea what to do next.
    Compare that to `create_gate_disruption_remediation_plan` with clear parameters (gate number, failure type, time horizon) and a description:
    "Use when a gate becomes unexpectedly unavailable to generate a coordinated remediation plan covering flight reassignment, crew reallocation, maintenance dispatch, and passenger communications."
    Now the agent can reason about the full operational response, not just one data point.
  - This is where the story changes: a thin tool like "get gate status" helps retrieve data, but a smarter tool like "create gate disruption remediation plan" encapsulates real operational reasoning.
  - The deeper opportunity is to package that reasoning as a customer-facing capability, so the product is no longer just software access but intelligent operational outcomes on tap.
- **Speaker Notes**: "The real differentiator is not the model alone. It's the tools. And those tools are evolving from CRUD wrappers into smart, business-aware tools that increasingly look agentic themselves.
  But here's the trap: if your tool is just 'get gate status', the agent can answer questions but can't fix anything.
  A tool like 'create gate disruption remediation plan' lets the agent reason about the full operational response. Tool calling starts with tool design."
- **Duration**: ~2.5 min
- **Animations**: Reveal progression strip left to right
- **Discussion / Thoughts**:
  - This is the slide where the three new principles start to land most clearly.
  - The bad vs good tool name example is the concrete grounding that makes "tool design matters" actionable.
  - Make the commercial implication explicit: the moat is not "we have an agent"; it is "we can sell differentiated intelligence that customers can consume repeatedly."
  - This slide sets up both the runtime discussion and the IQ discussion.

### 4. Foundry Runtime + Agent Choice

- **Layout**: top-half runtime architecture + bottom-half agent type comparison
- **Content**:
  - Top: Foundry Agent Service v2 as the runtime that orchestrates the ReAct loop, tools, and governance
  - Bottom: simple side-by-side cards
    - **Responses Agent** — code-owned, flexible, fast iteration
    - **Foundry Agent** — versioned, governed, service-managed
  - Decision strip: **"Speed and code ownership vs governance and lifecycle control."**
- **Narrative**:
  - The Gate 35 remediation prototype now works well enough that operations leaders want to pilot it in the real control room for the next disruption.
  - That forces the next design decision in the story: do we keep iterating quickly in code as a Responses Agent, or promote the solution into a governed Foundry Agent with managed lifecycle, versioning, and operational controls?
- **Speaker Notes**: "Once you decide tools matter, the next question is where this runs and how the agent is defined. Foundry is the runtime. Then you choose whether the definition lives in code or in the platform."
- **Duration**: ~2 min
- **Animations**: Runtime first, then the two agent cards, then the decision strip
- **Discussion / Thoughts**:
  - Keep the runtime visual very simple so it doesn't fight with the agent-type comparison.
  - The key framing still matters: this is a lifecycle/governance choice, not a power comparison.
  - If this starts to feel crowded in design, drop detail from the runtime, not from the agent comparison.
  - The airport story should make the governance need feel inevitable, not theoretical.

### 5. IQ Layers in Action

- **Layout**: three-column IQ layer summary above or alongside one concrete airport scenario
- **Content**:
  - Work IQ 🏢 — people, meetings, email, organizational context
  - Fabric IQ 📊 — business data, semantic models, graph-aware analytics
  - Foundry IQ 🧠 — enterprise knowledge, retrieval, grounding across sources
  - Airport example: one smart knowledge tool reasons across gate assignments, crew schedules, maintenance status, SOPs, and passenger communications to build a remediation plan for the Gate 35 airbridge failure — rather than acting like a collection of thin CRUD wrappers the supervisor must orchestrate manually
  - Callout: **this is where the moat comes from** — governed, business-aware reasoning across multiple sources
  - Business framing: **sell intelligence, not screens** — offer disruption remediation and operational coordination as intelligent services customers can buy on demand
  - Security callout: an agent that can read shift-manager emails, query maintenance systems, and post passenger communications has a significant blast radius — Foundry's managed runtime, identity, and data boundaries are what keep that blast radius contained
- **Narrative**:
  - Now the Gate 35 agent faces the full complexity of the airbridge failure: flights SQ308 and QF1 need reassignment, but Gate 22 has a maintenance hold expiring in 40 minutes, Gate 18 is available but requires a bus transfer, crew duty windows for the ground team are tightening, and passengers across both flights need updated messaging.
  - Work IQ brings in shift-manager conversations and the maintenance dispatcher's recent emails about the airbridge repair ETA, Fabric IQ exposes real-time gate availability, crew rosters, and flight schedule dependencies, and Foundry IQ grounds the agent in SOPs for airbridge failure remediation, historical incident outcomes, and enterprise knowledge so it can recommend a coordinated recovery plan.
  - This is the point in the story where the solution stops being a helpful Q&A assistant and becomes product-grade intelligence that can reduce disruption cost, improve recovery time, and increase passenger satisfaction.
  - And it's also where security becomes non-negotiable: these tools access people data, operational systems, and enterprise knowledge, so identity, authorization, and data boundaries must be first-class concerns.
- **Speaker Notes**: "These IQ layers are what make the tools smart. They let a tool understand people context, business data, and enterprise knowledge together — which is where differentiated value comes from."
- **Duration**: ~2.5 min
- **Animations**: Reveal each IQ pillar, then show the airport synthesis example
- **Discussion / Thoughts**:
  - This merges the old IQ architecture and airport scenario slides to save time while keeping the concrete example.
  - Keep each IQ pillar to a short label plus one phrase. Most of the meaning should come from the visual and the airport example.
  - This is the best place to land the moat idea in a way that feels tangible rather than abstract.
  - The audience should leave this slide thinking "our advantage is in the governed knowledge/tool layer."
  - This should be the point where the airbridge failure story stops feeling like chatbot Q&A and starts feeling like genuine operations support.
  - Make the business outcome explicit here, not just the architecture: efficiency, cost, customer satisfaction, and differentiated value.

### 6. Governing Intelligent Tool Use

- **Layout**: three expanded cards (one per discipline) + anti-pattern banner + evaluation framework visual
- **Content**:

  **Card 1 — Design tools for calling, not just for humans**

  - Tools must be designed so an agent can reason about *when* and *why* to call them, not just *how*
  - A tool named `route_baggage_cart_to_carousel` is unclear — an agent can't determine when to invoke it. Rename it to `optimise_baggage_delivery_for_flight`, add a description ("Use after aircraft arrival confirmed, when baggage handling has not yet started"), and define clear parameters (flight number, terminal, priority)
  - Anti-pattern: **"1,000 tiny tools kills selection accuracy."** Consolidate related operations into fewer, semantically meaningful tools
  - The tool description and parameter schema are the agent's only documentation — treat them like a public API contract

  **Card 2 — Instruct agents like operators**

  - Agents need operating instructions just like a newly hired controller gets an SOP handbook on day one
  - Concrete airport examples of agent instructions:
    - "When a gate reassignment would affect more than 3 connecting flights, escalate to a human supervisor before executing."
    - "Never reassign to a gate with an active maintenance hold without first calling `check_maintenance_eta` and confirming the hold will be cleared before the aircraft arrives."
    - "When passenger messaging is needed, always call `draft_passenger_notification` before `send_passenger_notification` so ops can review the message."
  - This is tool *calling* governance: not just which tool exists, but under what conditions the agent should (and should not) invoke it

  **Card 3 — Evaluate and monitor tool use continuously**

  - Tools are intelligent apps — they must be tested, evaluated, monitored, and re-checked over time
  - Foundry provides a structured evaluation framework with nine [agent evaluators](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/agent-evaluators) across two categories:
    - **System evaluation** (end-to-end outcomes): Task Completion, Task Adherence, Task Navigation Efficiency, Intent Resolution
    - **Process evaluation** (step-by-step tool use): Tool Call Accuracy, Tool Selection, Tool Input Accuracy, Tool Output Utilization, Tool Call Success
  - Three evaluation stages in the [AI application lifecycle](https://learn.microsoft.com/azure/foundry/concepts/observability#the-three-stages-of-ai-application-lifecycle-evaluation):
    1. **Pre-production** — run evaluation datasets and synthetic scenarios against the agent before deployment; use LLM judges to score tool selection and accuracy at scale
    2. **Post-production monitoring** — continuously sample production traffic and evaluate quality and safety; detect drift in tool selection patterns
    3. **Scheduled red teaming** — use the [AI red teaming agent](https://learn.microsoft.com/azure/foundry/how-to/develop/run-ai-red-teaming-cloud) (PyRIT framework) to probe for safety and security vulnerabilities on a recurring basis
  - Brute-force evaluation approach (Ralph harness pattern): generate a large synthetic evaluation set from your tool definitions and known scenarios, run every permutation through the agent,
    and measure whether the correct tools are selected with correct parameters — then iterate on tool descriptions, agent instructions, and model configuration until accuracy stabilizes.
    This is the "unit test at scale" approach to tool tuning.
  - Link: [End-to-end Foundry agent evaluation sample](https://aka.ms/e2e-agent-eval-sample)
  - Link: [Agent evaluator samples (Python SDK)](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects/samples/evaluations/agentic_evaluators)

- **Narrative**:
  - As the Gate 35 remediation agent grows, the team discovers the common failure modes: too many small tools, weak operating instructions, and no ongoing evaluation make the agent brittle during high-pressure disruption handling.
  - The first fix is tool design: consolidating 40 small airport API wrappers into 12 operationally meaningful tools with clear names, descriptions, and parameters.
  - The second fix is explicit agent instructions: telling the agent when to call `reassign_gate`, when to escalate (e.g. more than 3 connecting flights affected), and when to check maintenance status first — just like training a new ops controller.
  - The third fix is continuous evaluation: running Foundry's agent evaluators against evaluation datasets before every deployment, sampling production traffic for drift, and red-teaming the agent on a schedule.
    The team uses a brute-force harness that generates hundreds of gate-failure scenarios and checks whether the agent selects the right tools with the right parameters every time.
- **Speaker Notes**: "Once tools become smarter, governance shifts from simple access control to operating discipline. You need three things: clear tool contracts so the agent knows *when* to call a tool,
  clear instructions so the agent knows *how* to behave, and continuous evaluation so you have evidence that tool use is still correct.
  Foundry gives you nine built-in evaluators for exactly this — and you should be running them before every deployment and sampling production traffic continuously."
- **Duration**: ~4 min
- **Animations**: Reveal one card at a time, then the evaluation framework visual
- **Discussion / Thoughts**:
  - This is now the most substantive engineering slide in the deck, and it has the time to land properly at 4 minutes.
  - The three cards map cleanly to: tool calling design, agent instruction, and evaluation/monitoring.
  - The concrete airport instruction examples make "instruct agents like operators" tangible rather than metaphorical.
  - The Foundry evaluator framework is now named and linked, resolving the previous placeholder gap.
  - The brute-force (Ralph harness) approach is included as a practical pattern for teams who want to tune tool selection at scale.
  - Security is elevated through the red teaming stage rather than being a single word in a list.

### 7. Key Takeaways / Q&A

- **Layout**: default
- **Content**: Five CTO-level takeaways:
  1. Agents are different from chat — they loop, act, observe, and keep working; that requires a different operating model for build, test, and ops
  2. Tools are evolving — from CRUD wrappers to smart knowledge tools and, increasingly, agentic tools
  3. IQ-backed tools can become a moat and a form of purchasable intelligence for your customers — substitute your domain for airports and the pattern holds
  4. Foundry gives you the runtime, agent lifecycle model, and built-in evaluation framework
  5. Design tools for calling, instruct agents like operators, and evaluate continuously — treat tool-using agents as intelligent apps that need testing, monitoring, governance, security, and scheduled red teaming
- **Narrative**:
  - Close the airport story explicitly: we started with an ops chatbot that could answer "What is the SOP for airbridge failure?" and "Which flights are on Gate 35?",
    and ended with a governed agent system that can create and execute a full remediation plan — reassigning flights, dispatching maintenance, coordinating crews, updating passengers,
    and continuously adapting as conditions change — with Foundry evaluators continuously checking that tool use remains correct and safe.
  - Generalize: "Substitute your domain for airports. Healthcare, logistics, finance — the pattern is the same. Encode your domain intelligence into governed tools, instruct agents on how to use them, evaluate continuously, and you have a product advantage that's hard to copy."
  - That capability stack can be sold as intelligence on tap: faster recovery, lower operating cost, better outcomes, and a harder-to-copy product advantage.
- **Speaker Notes**: "Let me leave you with five things. First, agents need a different operating model — not just a different API. Second, the moat is in the tools, not the model.
  Third, those tools can become purchasable intelligence for your customers. Fourth, Foundry gives you the runtime and the evaluation framework.
  And fifth, treat your agent-and-tool system like an intelligent app: test it, evaluate it, monitor it, secure it, and re-check it on a schedule.
  Substitute your domain for airports — the pattern is the same."
- **Duration**: ~2.5 min
- **Animations**: Progressive reveal
- **Discussion / Thoughts**:
  - The close now lands both business strategy and engineering rigor, which the deck is weaker without.
  - The generalization beyond airports is explicit so every CTO in the room can map it to their own domain.
  - The airport narrative resolves cleanly so the audience remembers one story, not seven disconnected ideas.

## Resources & Links

Links to share with attendees or reference during the talk.

### Foundry Agent Service

- [Azure AI Foundry Agent Service documentation](https://learn.microsoft.com/en-us/azure/ai-services/agents/)
- [Microsoft Agent Framework — Two Agent Types](https://learn.microsoft.com/en-us/agent-framework/agents/providers/microsoft-foundry?pivots=programming-language-csharp#two-agent-types)

### Agent Evaluation

- [Agent evaluators overview](https://learn.microsoft.com/azure/foundry/concepts/evaluation-evaluators/agent-evaluators)
- [Evaluate your AI agents (SDK)](https://learn.microsoft.com/azure/foundry-classic/how-to/develop/agent-evaluate-sdk)
- [Observability in generative AI — evaluation lifecycle stages](https://learn.microsoft.com/azure/foundry/concepts/observability)
- [End-to-end Foundry agent evaluation sample](https://aka.ms/e2e-agent-eval-sample)
- [Agent evaluator samples (Python SDK)](https://github.com/Azure/azure-sdk-for-python/tree/main/sdk/ai/azure-ai-projects/samples/evaluations/agentic_evaluators)
- [AI red teaming agent (PyRIT)](https://learn.microsoft.com/azure/foundry/how-to/develop/run-ai-red-teaming-cloud)

### Model Context Protocol (MCP)

- [Model Context Protocol specification](https://modelcontextprotocol.io/)
- [MCP Introduction](https://modelcontextprotocol.io/introduction)
- [MCP Architecture](https://modelcontextprotocol.io/docs/learn/architecture)

### Agent-to-Agent (A2A) Protocol

- [A2A Protocol documentation](https://google.github.io/A2A/)
- [A2A GitHub repository](https://github.com/google/A2A)

### Microsoft IQ Intelligence Layers

- [Work IQ overview](https://www.microsoft.com/en-us/microsoft-365/blog/2025/05/19/from-ai-ready-to-ai-first-the-agentic-web-and-the-new-microsoft-365/)
- [Fabric IQ overview](https://www.microsoft.com/en-us/microsoft-fabric/blog/2025/05/19/microsoft-fabric-at-build-2025-turn-your-data-into-an-ai-advantage/)
- [Foundry IQ overview](https://azure.microsoft.com/en-us/blog/accelerating-ai-app-development-with-azure-ai-foundry/)

### Presentation Source

- [Presentation source repository](https://github.com/PlagueHO/plagueho.learn)

## Evolution Log

Track changes to the presentation as it evolves.

| Date | Change | Reason |
|------|--------|--------|
| 2026-04-02 | Initial outline created | New presentation for Microsoft Asia Partner CTO Community Episode 1 |
| 2026-04-07 | Expanded Slide 1 with presenter intro (Daniel Scott-Raynsford) and "how this was built" callout (Teams call → WorkIQ recap → outline → Copilot CLI slides) | Requested addition; also frames the presentation itself as an agentic workflow example |
| 2026-04-07 | Moved Foundry Agent Service slide from position 7 to 4; added two-agent-type visual comparison (Responses Agent vs Foundry Agent) with pros/cons and decision guidance; updated Key Takeaways to include agent type selection | Requested addition of visual agent-type comparison sourced from Microsoft Agent Framework docs |
| 2026-04-07 | Reordered the middle of the deck for cleaner narrative flow (tools before runtime), split runtime vs agent-type choice into separate slides, simplified the tool-reliability slide, and merged closing content into Key Takeaways / Q&A | Improve succinctness, slide-to-slide buildup, and visual clarity; reduce risk of wall-of-text slides |
| 2026-04-07 | Compressed the deck from 10 slides to 7 for a 15-minute format by merging adjacent concept slides (problem + loop, runtime + agent choice, IQ layers + airport scenario) and tightening the close | New presentation time limit required a significantly leaner structure with less transition overhead |
| 2026-04-08 | Added a running airport-operations narrative component to every slide and a deck-level story arc that evolves from a simple chat assistant into a governed, IQ-backed operational agent | Requested stronger story continuity so each slide builds the same technical example forward |
| 2026-04-08 | Tightened the outline to more explicitly land the business moat, productized intelligence, and intelligent-tool operating discipline messages across Slides 3, 5, 6, and 7 | Requested alignment review to ensure the slide flow supports both the strategic and engineering takeaways of the session |
| 2026-04-08 | Expanded to 20 minutes; rewrote Slide 6 with three focused disciplines (tool calling design, agent instruction, evaluation/monitoring), integrated Foundry agent evaluators (9 evaluators, 3 lifecycle stages, red teaming), added brute-force evaluation pattern, concrete tool-calling and instruction examples, seeded business motivation in Slide 2, generalized close beyond airports, elevated security in Slide 5, compressed Slide 1 and 4 to redistribute time | Rubber duck review identified 8 structural issues; presentation time extended to 20 minutes |
| 2026-04-08 | Replaced generic storm-disruption scenario with specific Gate 35 airbridge failure incident throughout all slides and narrative thread. Progression now goes from simple Q&A ("What is the SOP?", "Which flights use Gate 35?") to fully agentic ("Create and execute an operational plan remediating the Gate 35 airbridge failure and continuously respond to changing conditions"). Updated tool examples, IQ layer scenario, and takeaways to match. | More concrete, cascading incident makes the case for agentic behavior visceral rather than theoretical |
