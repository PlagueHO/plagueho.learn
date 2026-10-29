/**
 * Original HVE presentation content and speaker notes.
 * Parameters: none. Import slides and renderSlides() from build.mjs or tests.
 * Usage: npm run build
 */

export const sources = {
  fde: ['Microsoft FDE perspective', 'https://commandline.microsoft.com/thinking-about-the-evolution-of-forward-deployed-engineers-over-the-last-24-months/'],
  frontier: ['Microsoft Frontier Company', 'https://www.microsoft.com/en-us/frontier-company'],
  engineering: ['Engineering Fundamentals Playbook', 'https://microsoft.github.io/code-with-engineering-playbook/'],
  accelerators: ['HVE Accelerators Hub', 'https://learn.microsoft.com/en-us/industry/playbook/'],
  core: ['HVE-Core documentation', 'https://microsoft.github.io/hve-core/docs/'],
  guide: ['HVE guide', 'https://microsoft.github.io/hve-core/docs/hve-guide/'],
  dt: ['Design Thinking guide', 'https://microsoft.github.io/hve-core/docs/design-thinking/'],
  tutorial: ['Manufacturing teaching scenario', 'https://microsoft.github.io/hve-core/docs/design-thinking/using-together/'],
  handoff: ['DT-to-RPI integration', 'https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/'],
  rpi: ['RPI workflow', 'https://microsoft.github.io/hve-core/docs/rpi/'],
  plugin: ['CLI plugin guide', 'https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/'],
  rai: ['Microsoft Responsible AI', 'https://www.microsoft.com/ai/responsible-ai'],
  dora: ['DORA delivery metrics', 'https://dora.dev/guides/dora-metrics/'],
};

const pillars = [
  ['team', 'Multidisciplinary<br>teams', 'Small, expert crew'],
  ['target', 'Design<br>thinking', 'Validated business value'],
  ['layers', 'Reusable<br>accelerators', 'Production-ready starts'],
  ['spark', 'AI<br>tooling', 'Expert-led, lifecycle-wide'],
];

const paths = {
  team: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3M16 4a3 3 0 0 1 0 6M18 14a5 5 0 0 1 3 5v2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  layers: '<path d="m2 7 10-5 10 5-10 5ZM2 12l10 5 10-5M2 17l10 5 10-5"/>',
  spark: '<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3ZM20 2v4M18 4h4"/>',
  loop: '<path d="M20 7a9 9 0 0 0-15-2L2 8m0-6v6h6M4 17a9 9 0 0 0 15 2l3-3m0 6v-6h-6"/>',
  shield: '<path d="M12 2 3 6v6c0 5 9 10 9 10s9-5 9-10V6ZM8 12l3 3 5-6"/>',
  code: '<path d="m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18"/>',
  document: '<path d="M5 2h10l4 4v16H5ZM14 2v5h5M8 11h8M8 15h8M8 19h5"/>',
};

function icon(name) {
  if (!paths[name]) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;
}

function pillarStrip(compact = false) {
  return `<div class="pillars${compact ? ' compact' : ''}">${pillars.map(([name, title, caption]) =>
    `<div>${icon(name)}<h3>${title}</h3>${compact ? '' : `<p>${caption}</p>`}</div>`).join('')}</div>`;
}

function flow(items) {
  return `<div class="flow">${items.map(([title, detail], i) =>
    `${i ? '<span class="arrow" aria-hidden="true">&rarr;</span>' : ''}
    <div><h3>${title}</h3><p>${detail}</p></div>`).join('')}</div>`;
}

function tags(items, className = '') {
  return `<div class="tags ${className}">${items.map(item => `<span>${item}</span>`).join('')}</div>`;
}

function line(text) {
  return `<p class="conclusion">${text}</p>`;
}

function deliveryLoop(compact = false) {
  const stages = [
    ['Idea', 'Business need'],
    ['Validation', 'Customer + user evidence'],
    ['Engineering', 'A working increment'],
    ['Feedback', 'Learn + decide'],
  ];
  return `<div class="loop-model" data-hve-loop>
    <div class="delivery-loop${compact ? ' compact-loop' : ''}">
      <svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">
        <path d="M290 75H710m-12-9 12 9-12 9M850 115v70m-9-12 9 12 9-12M710 225H290m12-9-12 9 12 9M150 185v-70m-9 12 9-12 9 12"/>
      </svg>
      ${stages.map(([title, detail], i) => `<div class="loop-step loop-step-${i + 1}">
        <strong>${title}</strong>${compact ? '' : `<span>${detail}</span>`}</div>`).join('')}
      <div class="loop-crew"><strong>Customer +<br>expert crew</strong><span>AI throughout</span></div>
    </div>
    <p class="loop-outcome">Accepted increments &rarr; production value</p>
  </div>`;
}

const confidence = () => tags(['validated', 'assumed', 'unknown', 'conflicting'], 'confidence');
const resourceLinks = keys => `<nav class="resources" aria-label="Public resources">${keys.map(key =>
  `<a href="${sources[key][1]}">${sources[key][0]}</a>`).join('')}</nav>`;

export const slides = [
  {
    id: 'hve', part: 'leadership', minutes: 1, title: 'Hypervelocity<br>Engineering.',
    className: 'opening',
    body: `<p class="lead">An engineering operating model.<br><em>Not simply faster coding with AI.</em></p>
      ${pillarStrip(true)}
      <div class="byline"><strong>Daniel Scott-Raynsford</strong><span>Microsoft</span></div>
      <p class="session-route">30 min HVE <span>+</span> 30 min optional HVE-Core <span>+</span> demos</p>`,
    notes: `HVE is an engineering operating model. A small, expert, multidisciplinary team works with the customer, uses AI throughout the lifecycle,
      applies Design Thinking to business value, and starts from production-ready accelerators to remove repeated setup work.
      The aim is radically compressed timescales from idea toward production, not faster code output alone.
      AI amplifies expert people; it does not replace engineering discipline or the expertise needed to validate generated outputs.
      The audience is technical leaders, engineering managers, and senior engineers.
      The first 30 minutes stand alone. The optional practical section is another 30 minutes. Demo and Q&A time are separate and not yet allocated.
      The four-pillar framing is this presentation's synthesis, not a universal industry standard.`,
    sources: ['engineering', 'fde'],
  },
  {
    id: 'customer-loop', part: 'leadership', minutes: 1, title: 'The customer is part<br><em>of the crew.</em>',
    body: `${deliveryLoop()}${line('A continuous loop. Not a final reveal.')}`,
    notes: `This is the fundamental shift: idea, validation, engineering, and feedback form a tight continuous loop.
      The customer participates in problem framing, evidence, design choices, working increments, and acceptance.
      The expert team directs AI throughout; the customer is not waiting at the end to see what was built.
      Each loop changes a decision and informs the next increment. Accepted increments move toward production.
      The diagram is an operating model, not a rigid phase gate or a claim that one loop makes a production-ready system.`,
    sources: ['engineering', 'fde'],
  },
  {
    id: 'evolution', part: 'leadership', minutes: 1.5, title: 'Delivery changes.<br><em>Engineering discipline stays.</em>',
    body: `${flow([['Packaged software', 'Long release cycles'], ['Cloud services', 'Continuous operation'], ['AI-assisted work', 'Faster learning + delivery']])}
      <div class="ownership"><strong>Shared engineering playbook</strong><span>Security · Quality · Delivery · Operations</span></div>
      ${line('HVE builds on the fundamentals. It does not discard them.')}`,
    notes: `Keep the history brief. Packaged releases, cloud services, and AI create different delivery opportunities and operating needs.
      Shared engineering practices make quality repeatable across teams and through production.
      HVE changes how the team works while retaining engineering fundamentals.
      This is a general framing, not a private organizational timeline or a claim that we ran the speakers' engagements.`,
    sources: ['engineering'],
  },
  {
    id: 'fde', part: 'leadership', minutes: 1, title: 'Co-engineer the outcome.<br><em>Leave capability behind.</em>',
    body: `<div class="shared-work"><div><span>Customer knowledge</span><span>Engineering expertise</span></div>
      <strong>One crew.<br>Shared decisions.</strong><div><span>Working increments</span><span>Lasting ownership</span></div></div>
      ${line('FDE is the delivery motion. HVE makes the operating model concrete.')}`,
    notes: `FDE means Forward Deployed Engineering. Use Microsoft's public perspective on customer-embedded co-engineering and capability transfer.
      Work with the customer's engineering and domain experts rather than deliver a mystery solution to them.
      Customer participation is part of every loop, not just kickoff and handover.
      Leave the practices, decisions, and maintained artifacts that let the customer continue.
      FDE is supporting context, not a universal job definition, staffing formula, or requirement to use HVE-Core.`,
    sources: ['fde', 'frontier', 'engineering'],
  },
  {
    id: 'two-changes', part: 'leadership', minutes: 1.5, title: 'New AI capability.<br><em>Still a business problem to solve.</em>',
    body: `<div class="two-paths">
      <div>${icon('spark')}<h3>What we build</h3><p>New capabilities for users</p><span>Assist · Predict · Generate</span></div>
      <div>${icon('loop')}<h3>How we build</h3><p>New ways to do the work</p><span>Understand · Build · Operate</span></div>
      </div>${line('A better conversation is not always a better customer outcome.')}`,
    notes: `Start from the business need, not a request to add AI. For example, a more fluent support conversation does not necessarily resolve a problem faster.
      This is a generic illustration, not a private customer case. Validate the desired outcome with users.
      Separate the runtime product decision from the delivery method. AI-assisted delivery can produce a non-AI solution.
      A deterministic workflow can be the best answer.
      Do not make model adoption the business outcome. The software-to-cloud-to-AI story provides context, not a reason to require AI in every system.
      This distinction is a teaching aid, not a claim about the scope of every FDE engagement.`,
    sources: ['frontier', 'engineering'],
  },
  {
    id: 'cracks', part: 'leadership', minutes: 1.5, title: 'Faster output.<br><em>Existing weaknesses, amplified.</em>',
    body: `<div class="evidence-grid">
      <div><h3>Unclear intent</h3><p>Plausible wrong answers</p></div>
      <div><h3>Lost context</h3><p>Repeated handoffs</p></div>
      <div><h3>Design drift</h3><p>Local choices, system costs</p></div>
      <div><h3>Late controls</h3><p>Rework before production</p></div>
      </div>${line('More output does not repair the operating model.')}`,
    notes: `AI did not invent incomplete requirements, undocumented systems, serial handoffs, or late governance.
      Faster output can make their effects harder to contain. A convincing implementation may encode an unvalidated assumption.
      Check intermediate artifacts and decisions, not just the final presentation of the answer.
      Do not cite private PR sizes, agent success rates, staffing figures, or productivity results as public evidence.`,
    sources: ['engineering', 'rai'],
  },
  {
    id: 'whole-flow', part: 'leadership', minutes: 1.5, title: 'Improve the whole flow.<br><em>Not only the code.</em>',
    body: `<div class="value-stream" role="group" aria-label="Understand, code, review, release, and operate">
      <span>Understand</span><strong>Code</strong><span>Review</span><span>Release + operate</span></div>
      ${tags(['Unclear needs', 'Lost context', 'Review queues', 'Late controls'])}
      ${line('A faster segment is not a faster <em>system.</em>')}`,
    notes: `The diagram is not to scale and makes no claim about time spent coding.
      Weak requirements, missing decisions, serial handoffs, repeated foundation work, and late validation can remain constraints.
      More implementation output can make those weaknesses more costly. Ask where work waits.
      Improve the end-to-end system rather than remove necessary controls or optimize code volume.
      No internal customer figures, fixed coding-time percentage, or unverified productivity statistic is used.`,
    sources: ['engineering', 'dora'],
  },
  {
    id: 'experiments', part: 'leadership', minutes: 1, title: 'Experiment with<br><em>the way of working.</em>',
    body: `<div class="work-map">
      <div><strong>Wrong problem?</strong><span>Validate business value with users</span></div>
      <div><strong>Context lost?</strong><span>Work together across disciplines</span></div>
      <div><strong>Repeated setup?</strong><span>Reuse a maintained production start</span></div>
      <div><strong>Slow decisions?</strong><span>Use AI, evidence, and expert review</span></div>
      </div>${line('Compare outcomes. Keep what improves the loop.')}`,
    notes: `The response is not to install a tool and assume the delivery system improved.
      Test changes to ownership, validation, foundations, and AI-supported work. Observe actual constraints and compare outcomes.
      This explains the experimentation-to-pillars transition without publishing private experiment details or results.
      A pilot needs a bounded problem, suitable evidence, and people able to act on what it reveals.`,
    sources: ['engineering', 'dora'],
  },
  {
    id: 'four-pillars', part: 'leadership', minutes: 1.5, title: 'Four pillars.<br><em>One continuous loop.</em>',
    body: `${pillarStrip()}${deliveryLoop(true)}`,
    className: 'pillar-loop',
    notes: `Name the four pillars consistently. Teams address shared ownership and decisions. Design thinking addresses the problem and value.
      Accelerators reduce avoidable foundation work. AI tooling supports the whole lifecycle.
      These are connected parts of the operating model, not four toolkit feature categories. None is sufficient alone.
      Customer collaboration and tight feedback loops connect them all. The crew is small and expert, but there is no universal headcount.
      The accelerators supply production foundations; AI assists the expert team throughout the loop.`,
    sources: ['engineering', 'accelerators'],
  },
  {
    id: 'teams', part: 'leadership', minutes: 2, title: 'A small expert crew.<br><em>Amplified by AI.</em>',
    body: `<div class="shared-work">
      <div><span>Domain + customer</span><span>Product + design</span></div>
      <strong>Shared expertise.<br>Shared ownership.</strong>
      <div><span>Engineering + data</span><span>Security + operations</span></div></div>
      ${line('AI extends capability. It does not replace expertise.')}`,
    notes: `Pillar 1: multidisciplinary teams. These are areas of expertise, not a mandatory list of roles.
      Team composition follows the problem. Include the people who can explain user work, make decisions, build, secure, and operate the system.
      AI lets people contribute beyond a narrow role, but they still need the expertise to review and validate the outputs they accept.
      Small describes a focused crew, not a fixed staffing ratio or a reduction target. Keep career development and specialist judgment.
      Customer experts are part of the crew. Co-engineering should improve the customer's ability to own and change the system.`,
    sources: ['engineering', 'fde'],
  },
  {
    id: 'design-thinking', part: 'leadership', minutes: 2, title: 'Validate value.<br><em>With the customer, throughout.</em>',
    body: `${flow([['Problem', 'Who needs what?<br>Why does it matter?'], ['Solution', 'What could work?<br>What should we test?'], ['Implementation', 'Does it work<br>for people?']])}
      <p class="return-path">&larr; Customer and user feedback can change every decision</p>
      ${line('A requested feature is not proof of value.')}`,
    notes: `Pillar 2: design thinking. A feature request is a proposed answer, not sufficient evidence of a need.
      A technically sound solution that meets a feature request can still fail to create business value.
      Use observation, interviews, synthesis, experiments, and appropriate prototypes. Customer and user evidence can change scope, direction, or whether to continue.
      Design Thinking is not only a workshop at the start; it continues through the operating loop.
      The three spaces are not a one-way waterfall. A prototype that looks convincing is not necessarily a validated concept.`,
    sources: ['engineering'],
  },
  {
    id: 'accelerators', part: 'leadership', minutes: 1.5, title: 'Production foundations.<br><em>From the start.</em>',
    body: `<div class="foundation">
      <div><strong>Business-specific value</strong><span>The work that is different</span></div>
      <div><strong>Adapted patterns</strong><span>Fit the system and its risks</span></div>
      <div><strong>Production-ready start</strong><span>Security · Observability · Tests · CI/CD</span></div>
      </div>${line('Remove repeated setup work. Keep the engineering discipline.')}`,
    notes: `Pillar 3: reusable accelerators. Use maintained starting points for common production concerns.
      These accelerators remove undifferentiated setup work so the crew can focus on the business problem.
      Security, observability, testing, and continuous integration/deployment are built into the baseline, not postponed until the end.
      Check identity, data access, maintenance, licensing, architecture fit, operating needs, and relevant controls.
      Adapt and test them. Reuse is not a production-readiness guarantee or a substitute for security review.
      Keep a path for updates.`,
    sources: ['accelerators', 'engineering'],
  },
  {
    id: 'lifecycle', part: 'leadership', minutes: 1.5, title: 'AI throughout.<br><em>Expert direction throughout.</em>',
    body: `<div class="lifecycle">${['Discover', 'Design', 'Build', 'Review', 'Operate'].map((name, i) =>
      `<div>${icon(['target', 'document', 'code', 'shield', 'loop'][i])}<strong>${name}</strong></div>`).join('')}</div>
      <div class="ownership"><strong>Customer + expert crew</strong><span>Intent · Validation · Trade-offs · Acceptance</span></div>
      ${line('Research, requirements, design, tests, and operations. Not only code.')}`,
    notes: `Pillar 4: AI tooling across the lifecycle. Research synthesis, requirement clarification, architecture options, test design, review, and operations are opportunities for support.
      They are not promises that agents are qualified to decide everything.
      Prefer deterministic checks for repeatable rules. Keep people accountable for intent, access, risk, and acceptance.
      This is AI in delivery, whether or not AI runs in the product.
      Expert review, legible project knowledge, and focused context make that assistance useful.
      Feedback from the customer and operations informs the next loop.`,
    sources: ['engineering', 'rai'],
  },
  {
    id: 'legibility', part: 'leadership', minutes: 2, title: 'Make the system legible.<br><em>To people and agents.</em>',
    body: `<div class="evidence-grid">
      <div><h3>Intent</h3><p>Users + requirements<br>Acceptance criteria</p></div>
      <div><h3>Structure</h3><p>Architecture + schemas<br>Interfaces + decisions</p></div>
      <div><h3>Standards</h3><p>Security + privacy<br>Responsible AI</p></div>
      <div><h3>Evidence</h3><p>Research + tests<br>Reviewed summaries</p></div>
      </div>${line('Approved evidence. Controlled locations. Clear ownership.')}`,
    notes: `Make requirements, schemas, architecture, standards, decisions, and acceptance criteria explicit.
      Store approved evidence in the right controlled location; durable does not mean public.
      Include stakeholder maps and reviewed research where appropriate. Protect sensitive transcripts, customer data, and secrets.
      Useful context reduces ambiguity but does not guarantee a correct model answer.
      This is a new grouping of public engineering practices, not a reproduction of private source material.`,
    sources: ['engineering', 'rai'],
  },
  {
    id: 'task-context', part: 'leadership', minutes: 1.5, title: 'Keep knowledge durable.<br><em>Keep task context focused.</em>',
    body: `<div class="context-model"><div><h3>Project knowledge</h3><p>Approved evidence<br>Standards + decisions</p></div>
      <span class="arrow" aria-hidden="true">&rarr;</span><strong>Relevant<br>task context</strong>
      <span class="arrow" aria-hidden="true">&rarr;</span><div><h3>New evidence</h3><p>Reviewed outputs<br>Decisions + gaps</p></div></div>
      <p class="return-path">&larr; Save decisions. Reuse evidence in the next loop.</p>
      ${line('More context is not automatically better context.')}`,
    notes: `Separate project knowledge from the evidence needed for the current task.
      Select relevant, current, approved sources. Separate unrelated work, preserve open questions, and write reviewed decisions to durable controlled storage.
      This supports people as well as agents. New context can help with a different task; it is not a universal reset rule.
      Do not claim a fixed attention ratio, exponential cost law, or that a model can safely decide with missing requirements.`,
    sources: ['engineering', 'rai'],
  },
  {
    id: 'quality', part: 'leadership', minutes: 2, title: 'Generated is not validated.<br><em>Expertise still matters.</em>',
    body: `${flow([['Checks', 'Tests + architecture<br>Security + operations'], ['Expert validation', 'Requirements, designs,<br>tests, and code'], ['Acceptance', 'Customer evidence<br>Named owner']])}
      <div class="ownership"><strong>Security · Privacy · Responsible AI · Operations</strong><span>Throughout delivery</span></div>
      ${line('Build discipline in. Do not trade it away for speed.')}`,
    notes: `Combine deterministic checks, independent specialist review, and risk-based human approval.
      Microsoft's Responsible AI principles are fairness; reliability and safety; privacy and security; inclusiveness; transparency; and accountability.
      AI-specific runtime risks matter when the delivered system uses AI.
      People still need the expertise to review and validate AI-generated outputs. Review requirements, backlog items, designs, tests, and code.
      Customer acceptance is distinct from implementation completion. Risk determines the review depth, not the amount of generated text.
      Agent review supports accountability; it does not replace it.
      A passing suite is scoped evidence, not proof that every requirement or production risk is covered.`,
    sources: ['engineering', 'rai'],
  },
  {
    id: 'learning', part: 'leadership', minutes: 1.5, title: 'Tighten the loop.<br><em>Not just the deadline.</em>',
    body: `${deliveryLoop()}${line('Smaller increments. Less waiting. Earlier customer decisions.')}`,
    notes: `Use interviews, technical spikes, disposable prototypes, or small production increments to answer a specific question.
      Capture what the evidence changed and bring users and operations back into the work.
      Think big, start small. Use frequent customer feedback to choose the next useful increment.
      Radically compressed idea-to-value cycles are the aim of changing the operating model, not a promise of a fixed number of days.
      Remove waiting and rework rather than increase working hours or skip controls.
      Disposable prototypes answer questions; they are not automatically production increments.
      Do not prescribe one sprint duration. Shorter activity is not better if it produces no useful learning.`,
    sources: ['engineering'],
  },
  {
    id: 'measurement', part: 'leadership', minutes: 1.5, title: 'Measure production value.<br><em>Find the next constraint.</em>',
    body: `<div class="measures">${[['Value', 'User task success'], ['Quality', 'Defects + rework'], ['Time', 'End-to-end flow'], ['Cost', 'Delivery + operation']].map(([a, b]) =>
      `<div><h3>${a}</h3><p>${b}</p></div>`).join('')}</div>
      ${flow([['Baseline', 'Understand today'], ['Experiment', 'Change one workflow'], ['Compare', 'Decide what is next']])}`,
    notes: `Choose measures for the user outcome and the application or service. Include review queues, rework, reliability, control effectiveness, and total cost where relevant.
      DORA or SPACE can help; they are not HVE-specific metric sets. The current DORA model has five delivery metrics.
      Avoid tool-adoption or generated-code targets as substitutes for value. Do not attribute all change to AI when work mix or team conditions also changed.
      Leaders must act on organizational constraints as well as technical ones.`,
    sources: ['dora', 'engineering'],
  },
  {
    id: 'method-and-tools', part: 'leadership', minutes: 1.5, title: 'Keep the operating model.<br><em>Evolve the tools.</em>',
    className: 'model-synthesis',
    body: `${deliveryLoop(true)}<div class="endure-evolve">
      <div><h3>Enduring principles</h3><p>Expertise · Customer evidence<br>Built-in quality · Shared ownership</p></div>
      <div><h3>Changing technology</h3><p>Assistants · Models<br>Platforms · Accelerators</p></div></div>`,
    notes: `Reassemble the operating model: a small expert multidisciplinary crew, customer collaboration, the four pillars, built-in foundations, and a continuous loop.
      Rapid iteration, workflow redesign, durable evidence, measured outcomes, and subject-matter expertise are principles already explained, not a new inventory.
      Tools operationalize the model but do not define it. HVE-Core is one current enabling toolkit, introduced only after the leadership close.
      Avoid claiming that an installation establishes a delivery operating model or makes a system production-ready.`,
    sources: ['engineering', 'accelerators', 'fde'],
  },
  {
    id: 'leadership-close', part: 'leadership', minutes: 1.5, title: 'Make one shared loop work.<br><em>Then measure the change.</em>',
    className: 'closing',
    body: `${deliveryLoop(true)}${tags(['Expert crew', 'Customer time', 'Data + access', 'Production foundations'])}
      ${resourceLinks(['engineering', 'accelerators', 'dora'])}
      <nav class="route-links" aria-label="Continue the session"><a href="#/deep-dive">Optional HVE-Core &rarr;</a><a href="#/demo-install">Demos &rarr;</a><button type="button" data-action="pause">Pause for questions</button></nav>`,
    notes: `Complete the leadership session here. Select a bounded workflow, establish a baseline, and form a small expert crew with the customer.
      Secure customer decision time, access, suitable data, maintained production foundations, and known dependencies before committing to a rapid increment.
      Use all four pillars. Compare production value, quality, cycle time, team experience, and total cost, not code output or AI usage alone.
      Leaders must remove cross-team approval delays and keep the pace sustainable. Leave capability and ownership with the customer.
      No specific toolkit is required.
      Take questions in a separate slot. Resources are accessible here without opening the optional deep dive.
      Pause for questions uses Reveal's pause screen; press B or Escape to resume.`,
    sources: ['engineering', 'accelerators', 'dora'],
  },
  {
    id: 'deep-dive', part: 'deep-dive', minutes: 1, title: 'HVE-Core.<br><em>The optional practical layer.</em>',
    className: 'section-break',
    body: `<p class="lead">Keep the operating model.<br>Choose the support your crew needs.</p>
      ${tags(['Agents', 'Skills', 'Instructions', 'Workflows'])}
      <nav class="route-links"><a href="#/demo-install">Skip to demos &rarr;</a></nav>`,
    notes: `Start the separate optional 30-minute deep dive.
      HVE-Core is a changing, opinionated toolkit for GitHub Copilot, not the method itself and not a production-readiness guarantee.`,
    sources: ['core'],
  },
  {
    id: 'toolkit', part: 'deep-dive', minutes: 4, title: 'Curated practices.<br><em>Not a replacement operating model.</em>',
    body: `<div class="work-map">
      <div><strong>Understand</strong><span>DT Coach + research</span></div>
      <div><strong>Decide</strong><span>Architecture + planning</span></div>
      <div><strong>Change</strong><span>Implementation support</span></div>
      <div><strong>Check</strong><span>Review + specialist assessment</span></div>
      </div>${line('Adopt what helps. Your crew still owns the outcome.')}`,
    notes: `Explain responsibilities rather than count assets. Agents provide roles, skills provide methods, instructions provide guidance, and workflows connect evidence to actions.
      Map capabilities to a real delivery constraint. Use useful parts alongside existing tools rather than replace a working method for a catalog.
      Not every asset loads automatically in every host. Teams control approved evidence, permissions, execution, and acceptance.
      Curation is not independent proof that an instruction is current, evaluated against your requirements, or fit for production.
      Check selected artifacts, documentation, and their evidence. Verify current capability names before a live session.
      These are capability examples, not exact commands or a promise that every specialty is installed.`,
    sources: ['core', 'guide'],
  },
  {
    id: 'context', part: 'deep-dive', minutes: 3, title: 'Relevant context in.<br><em>Durable evidence out.</em>',
    body: `<div class="context-model"><div><h3>Repository</h3><p>Standards<br>Architecture<br>Build + test commands</p></div>
      <span class="arrow" aria-hidden="true">&rarr;</span><strong>Bounded<br>task context</strong>
      <span class="arrow" aria-hidden="true">&rarr;</span><div><h3>Artifacts</h3><p>Decisions<br>Acceptance evidence<br>Open questions</p></div></div>
      ${line('Fresh context when useful. Evidence preserved.')}`,
    notes: `Supply relevant approved sources, scope, and acceptance criteria. Do not add every available file.
      Store sensitive evidence in controlled locations. Plugin instructions are not automatically applied by repository path patterns.
      Use a new chat or clear context when switching concepts or when history becomes unhelpful. Do not discard artifacts or repeat adequate research by habit.
      There is no model-attention percentage or universal context-reset rule.
      Apply the leadership principles with a public repository example: a requirement, architecture decision, known constraint,
      build/test command, and reviewed task artifact. Check freshness and access before using it.`,
    sources: ['rpi', 'plugin'],
  },
  {
    id: 'dt-coach', part: 'deep-dive', minutes: 3, title: 'A coach can structure research.<br><em>It cannot replace people.</em>',
    body: `${flow([['People', 'Observation + interviews'], ['DT Coach', 'Scope, plan, synthesize'], ['Reviewed evidence', 'Problem + gaps']])}
      <p class="return-path">&larr; Take the framing back to the customer</p>
      ${line('A plausible narrative is not user validation.')}`,
    notes: `DT Coach can help structure conversations, research planning, synthesis, and handoff.
      It cannot establish that an interview happened or an assumption is true merely by writing text.
      Check findings against actual evidence. Preserve conflicts and missing stakeholders.
      The customer remains in the loop. Play back the problem, conflicts, and scope before treating the next decision as ready.
      The demo uses supplied public tutorial material, not new field research.`,
    sources: ['dt', 'tutorial'],
  },
  {
    id: 'handoff-contract', part: 'deep-dive', minutes: 4, title: 'Carry the evidence.<br><em>Keep its confidence visible.</em>',
    body: `<div class="handoff-model"><div><p class="selected">Problem Statement Complete <small>Methods 1–3 · Demo route</small></p>
      <p>Concept Validated <small>Methods 4–6</small></p><p>Implementation Spec Ready <small>Methods 7–9</small></p></div>
      <span class="arrow" aria-hidden="true">&rarr;</span><strong>Research</strong></div>
      ${confidence()}<p class="return-path">&larr; Return to DT when the framing changes</p>`,
    notes: `All three DT exits enter rpi-research. Later exits provide richer evidence and narrow the research; they do not bypass it.
      This demo uses Problem Statement Complete after Methods 1-3. It does not claim concept validation, prototype testing, or implementation-space readiness.
      Carry stakeholders, scope, themes, constraints, assumptions, and source references.
      Confidence markers are validated, assumed, unknown, and conflicting. Resolve conflicts before downstream work.
      In a tutorial, validated means supported by supplied scenario evidence, not new customer validation.`,
    sources: ['handoff'],
  },
  {
    id: 'rpi', part: 'deep-dive', minutes: 4, title: 'Evidence into decisions.<br><em>Decisions into controlled change.</em>',
    body: `<div class="rpi">${[['Research', 'Evidence + gaps', 'Readiness'], ['Plan', 'Work + acceptance', 'Critique + approval'], ['Implement', 'Changes + checks', 'Approved scope'], ['Review', 'Requirements + results', 'Acceptance + follow-up']].map(([a, b, c]) =>
      `<div><h3>${a}</h3><p>${b}</p><strong>${c}</strong></div>`).join('')}</div>
      <p class="return-path">&larr; Customer feedback can reopen the framing or plan</p>
      ${line('Artifacts carry evidence. People own decisions.')}`,
    notes: `RPI names Research, Plan, Implement; review and follow-up close the lifecycle.
      Assess evidence readiness. Reuse adequate evidence and investigate actual gaps.
      Planning includes critique and readiness. Implement approved work, then compare real results with requirements.
      Execution completion is not acceptance. Route defects, decisions, evidence gaps, and residual work.
      Treat this as one pass through the HVE loop, not a one-way pipeline. Customer feedback, operations, or a failed assumption can reopen research or problem framing.
      Direct phase skills and explicit custom-agent selection are different entry surfaces.`,
    sources: ['rpi'],
  },
  {
    id: 'review', part: 'deep-dive', minutes: 3, title: 'Match depth to uncertainty.<br><em>Match review to risk.</em>',
    body: `${flow([['Checks', 'Tests · Build · Analysis'], ['Review', 'Requirements + judgment'], ['Acceptance', 'Evidence + named owner']])}
      <div class="dispositions"><span>Defect &rarr; Fix</span><span>Gap &rarr; Investigate</span><span>Decision &rarr; Owner</span></div>`,
    notes: `Use actual repository checks and task acceptance criteria. Inspect their coverage.
      The full demo is not a mandatory ritual for every edit. Reuse adequate evidence; investigate actual gaps in requirements, dependencies, risk, and reversibility.
      Avoid arbitrary line-count limits. A low-risk edit differs from a new high-risk system.
      The DT handoff enters research to assess its evidence, not discard it.
      Agent review can help but may share the implementer's assumptions.
      Record failed, skipped, and blocked checks. Keep execution completion separate from acceptance.
      Distinguish fixing defects from seeking missing evidence or a human decision.`,
    sources: ['rpi', 'engineering'],
  },
  {
    id: 'cost', part: 'deep-dive', minutes: 3, title: 'Optimize the cost<br><em>of a useful outcome.</em>',
    body: `<div class="cost-model"><span>AI usage</span><b>+</b><span>Human time</span><b>+</b><span>Rework</span><b>+</b><span>Operation</span></div>
      ${tags(['Relevant context', 'Deterministic checks', 'Traceable decisions'])}
      ${line('Fewer tokens is not a saving if quality falls.')}`,
    notes: `These are cost categories, not an arithmetic sum of incompatible units such as tokens and hours.
      Convert to comparable units where possible. Evaluate cost alongside user value, quality, and time.
      Avoid repeated agent work that does not change a decision. A small token bill can increase human rework.
      Inspect available task telemetry and compare similar work. Explain estimates as measured ranges with uncertainty, not a universal token budget.
      Do not use unsupported exponential-cost claims or attention ratios.`,
    sources: ['rpi', 'dora'],
  },
  {
    id: 'plugin-model', part: 'deep-dive', minutes: 3, title: 'Install the plugin.<br><em>Understand its limits.</em>',
    body: `${flow([['Marketplace', 'Register + browse'], ['Plugin', 'Install + update'], ['Capabilities', 'Verify discovery']])}
      ${tags(['Tracks main', 'Catalog refresh ≠ plugin update', 'Reference instructions explicitly'])}
      ${line('Installation is a starting point, not a readiness check.')}`,
    notes: `The documented CLI registration tracks main with no release gate or release attestation.
      Stable and PreRelease are VS Code extension channels, not CLI plugin channel choices.
      Marketplace refresh and installed-plugin update are separate actions.
      Agents and skills should be discoverable. Plugin instruction applyTo patterns are not automatically applied like project instructions.
      Verify exact interactive marketplace syntax in the installed CLI before rehearsal.`,
    sources: ['plugin'],
  },
  {
    id: 'demo-route', part: 'deep-dive', minutes: 2, title: 'One problem.<br><em>A traceable path through delivery.</em>',
    body: `${flow([['Install', 'Capabilities'], ['DT Coach', 'Problem evidence'], ['Handoff', 'Reviewed framing'], ['RPI', 'Controlled change']])}
      ${line('Public manufacturing teaching scenario.')}
      <p class="return-path">&larr; Reviewed feedback returns to the next decision</p>
      ${resourceLinks(['core', 'tutorial', 'rpi'])}`,
    notes: `End of the optional 30-minute section. Demo and Q&A time are separate.
      The demo route connects installation, DT Methods 1-3, a problem-statement handoff, and RPI.
      Before live delivery, verify syntax, prepare labelled tutorial evidence and fallback artifacts, choose a bounded implementation outcome, and rehearse.
      This route is one pass through the continuous HVE loop. Pause for a labelled customer decision or supplied scenario response at problem framing,
      the research decision, and increment review. Do not invent live customer validation.
      If execution fails, disclose it and switch to labelled prepared material. Do not present fallback artifacts as a successful live run.`,
    sources: ['core', 'tutorial', 'rpi'],
  },
  {
    id: 'demo-install', part: 'demos', title: 'Make the capabilities<br><em>available.</em>',
    body: `<div class="command"><code>/plugin</code><span>Interactive marketplace route</span></div>
      ${flow([['Register', '<code>microsoft/hve-core</code>'], ['Browse + install', '<code>hve-core@hve-core</code>'], ['Confirm', 'Agents + skills']])}
      ${line('Show what loads. Explain what does not.')}`,
    notes: `Demo support, not proof that installation has been performed.
      Use the supported interactive /plugin marketplace route. Verify exact /plugin marketplace syntax in the installed CLI before rehearsal.
      Do not infer slash syntax from shell commands. Public shell equivalents:
      copilot plugin marketplace add microsoft/hve-core
      copilot plugin marketplace browse hve-core
      copilot plugin install hve-core@hve-core
      Confirm the required DT and RPI capabilities. Explain explicit instruction references and the main-tracking registration.`,
    sources: ['plugin'],
  },
  {
    id: 'demo-discovery', part: 'demos', title: 'A dashboard request.<br><em>A knowledge problem?</em>',
    body: `<div class="reframe"><p>“We need a real-time quality dashboard.”</p><span aria-hidden="true">&darr;</span>
      <strong>What knowledge is lost between shifts?</strong></div>
      ${tags(['1 · Scope Conversations', '2 · Design Research', '3 · Input Synthesis'])}
      ${line('Use labelled tutorial evidence. Do not invent interviews.')}`,
    notes: `This is a public manufacturing teaching scenario, not a customer case.
      The plant manager asks for a real-time quality dashboard. Supplied evidence points toward knowledge accessibility and loss across shifts.
      Use DT Coach to structure scope, research, and synthesis. Review stakeholders, constraints, themes, and assumptions.
      Stop after Methods 1-3. Play the framing back to the customer; in this teaching scenario use a labelled supplied response, not an invented interview.
      Do not imply later concept validation, prototype testing, or a predetermined voice interface.`,
    sources: ['tutorial', 'dt'],
  },
  {
    id: 'demo-handoff', part: 'demos', title: 'A problem statement.<br><em>Not permission to build.</em>',
    body: `${flow([['DT evidence', 'Stakeholders + themes<br>Constraints + assumptions'], ['Human review', 'Problem Statement<br>Complete'], ['Research', 'Options + feasibility<br>Open questions']])}
      ${confidence()}${line('Evidence and confidence cross the handoff together.')}`,
    notes: `Generate and review the Problem Statement Complete handoff after Methods 1-3.
      Pass the research-topic artifact into rpi-research. Preserve scope, sources, assumptions, confidence markers, and gaps.
      Validated refers to the supplied scenario evidence. It does not mean new customer research happened.
      Research broad solution approaches and feasibility. Return to DT if the framing fails.
      Pause at the research targets for a customer decision or labelled scenario response. It is not approval to build a predetermined solution.
      The handoff tutorial's later implementation-space exit does not establish readiness at this earlier exit.`,
    sources: ['handoff'],
  },
  {
    id: 'demo-rpi', part: 'demos', title: 'Follow the evidence.<br><em>Show the decisions.</em>',
    body: `<div class="rpi">${[['Research', 'Resolve actual gaps', 'Evidence'], ['Plan', 'Critique + approve', 'Bounded increment'], ['Implement', 'Change + check', 'Actual results'], ['Review', 'Accept or route back', 'Remaining work']].map(([a, b, c]) =>
      `<div><h3>${a}</h3><p>${b}</p><strong>${c}</strong></div>`).join('')}</div>
      <p class="return-path">&larr; Customer feedback &rarr; next framing or increment</p>
      ${line('Completed execution ≠ accepted work.')}`,
    notes: `The bounded implementation outcome remains to be selected after research and rehearsal.
      Current direct phase skills: /rpi-research, /rpi-plan, /rpi-implement, /rpi-review.
      /agent hve-core:rpi-agent is a separate custom-agent entry surface. Verify installed availability and host behavior.
      Reuse the DT handoff, research gaps, critique a plan, obtain approval, implement, then review real checks.
      Review the increment with the customer and feed evidence back to the next decision. Show a labelled scenario response if no customer is present.
      Keep security, observability, testing, and CI/CD in the chosen starting point; disclose missing controls rather than call a prototype production-ready.
      Do not invent passing tests, acceptance, or production readiness for this presentation.`,
    sources: ['rpi'],
  },
  {
    id: 'recap', part: 'demos', title: 'What did the evidence<br><em>actually establish?</em>',
    className: 'closing',
    body: `${deliveryLoop(true)}${line('Established evidence &nbsp; / &nbsp; Open decisions &nbsp; / &nbsp; Next increment')}
      <nav class="route-links"><a href="#/leadership-close">Leadership close + resources</a><a href="${sources.core[1]}">HVE-Core documentation</a><button type="button" data-action="pause">Questions</button></nav>`,
    notes: `Report only what the actual demo established.
      Distinguish supplied tutorial evidence, prepared fallback artifacts, live actions, passing checks, accepted work, and unresolved production needs.
      A successful installation or demo is not a production-readiness or productivity guarantee.
      Return to the four pillars and the shared loop: expert crew, customer collaboration, lifecycle-wide AI,
      Design Thinking for business value, and production-ready foundations.
      If implementation is incomplete, say so and identify the remaining decision.
      End with one workflow, all four pillars, and measured outcomes.`,
    sources: ['engineering', 'core', 'tutorial'],
  },
];

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

export function renderSlides() {
  return slides.map(slide => `<section id="${slide.id}" data-part="${slide.part}"
    ${slide.minutes ? `data-timing="${slide.minutes * 60}"` : ''}
    class="${slide.className ?? ''}" aria-label="${escapeHtml(slide.title.replace(/<[^>]+>/g, ' '))}">
    <h2>${slide.title}</h2><div class="slide-content">${slide.body}</div>
    <aside class="notes"><p>${escapeHtml(slide.notes)}</p>${resourceLinks(slide.sources)}</aside>
    </section>`).join('\n');
}
