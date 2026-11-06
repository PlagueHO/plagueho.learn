/**
 * Leadership section slide bodies (slides 1 to 25).
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { leadershipBodies } from './bodies-leadership.mjs'.
 */
import {
  arrow, node, inode, chip, band, fig, takeaway, grid, chain, ret, icon, crack,
  lane, under, laneGroup, legend, loop, evidenceTable,
} from './diagrams.mjs';

const acceleratorCapabilities = [
  ['Security', 'shield', 'purple'], ['SRE / Operations', 'loop', 'teal'],
  ['UX design', 'pencil', 'warm'], ['Architecture', 'layers', 'purple'],
  ['Technical programs', 'clock', 'teal'], ['Business programs', 'flag', 'warm'],
  ['Data science', 'dashboard', 'teal'], ['Engineering', 'code', 'purple'],
  ['Contributor onboarding', 'question', 'warm'], ['Cross-role utilities', 'spark', 'teal'],
  ['Product management', 'target', 'purple'], ['Other capabilities', 'plus', 'warm'],
];

function acceleratorCapabilityIcon(label, symbol, tone, announce = false) {
  const accessibility = announce ? `role="img" aria-label="${label} capability"` : 'aria-hidden="true"';
  return `<span class="accelerator-capability-icon tone-${tone}" data-capability="${symbol}" ${accessibility}>
    ${icon(symbol).replace('aria-hidden="true"', 'aria-hidden="true" focusable="false"')}</span>`;
}

function panel(iconName, caption, big, status, state, cls = '') {
  return `<div class="panel${cls ? ` ${cls}` : ''}">${icon(iconName)}<em>${caption}</em><strong>${big}</strong><b class="status ${state}">${icon(state === 'met' ? 'check' : 'question')}${status}</b></div>`;
}

function deliveryTimeline() {
  const start = 1970;
  const end = 2026;
  const duration = 3600;
  const milestones = [
    { year: 1970, date: '~1970', title: 'Packaged software', duty: 'Coordinate releases',
      side: 'above', offset: 0, width: 256 },
    { year: 2001, date: '2001', title: 'Agile', duty: 'Own delivery + feedback',
      side: 'above', offset: -210, width: 248 },
    { year: 2006, date: '2006', title: 'Cloud services', duty: 'Own the running service',
      side: 'below', offset: -170, width: 248 },
    { year: 2009, title: 'DevOps 2009', secondary: true },
    { year: 2015, date: '~2015', title: 'Co-engineering', duty: 'Own the outcome with customers',
      side: 'above', offset: -100, width: 264 },
    { year: 2023, date: '~2023', title: 'AI SDLC emerges', duty: 'Assist across delivery',
      side: 'below', offset: -90, width: 180, kind: 'ai' },
  ];
  const events = milestones.map(milestone => {
    const fraction = (milestone.year - start) / (end - start);
    const position = `left:${fraction * 100}%;--delay:${fraction * duration}ms`;
    if (milestone.secondary) {
      return `<li class="milestone-secondary" data-year="${milestone.year}" style="${position}">${milestone.title}</li>`;
    }
    return `<li class="milestone-item ${milestone.side}${milestone.kind ? ` ${milestone.kind}` : ''}"
      data-year="${milestone.year}" style="${position};--label-offset:${milestone.offset}px;--label-width:${milestone.width}px">
      <span class="milestone-stem" aria-hidden="true"></span><span class="milestone-point" aria-hidden="true"></span>
      <div class="milestone-copy"><span class="milestone-date">${milestone.date}</span>
        <strong>${milestone.title}</strong><span class="milestone-duty">${milestone.duty}</span></div>
    </li>`;
  });
  return `<div class="milestone-timeline" data-start="${start}" data-end="${end}" style="--duration:${duration}ms">
    <svg class="milestone-arrow" viewBox="0 0 1088 28" preserveAspectRatio="none" aria-hidden="true">
      <path class="milestone-shaft" d="M0 8H1072V20H0Z"/>
      <path class="milestone-tip" d="M1072 0L1088 14L1072 28Z"/>
    </svg>
    <ol class="milestone-events" aria-label="Delivery milestones spaced by year; earlier practices continue">${events.join('')}</ol>
    <span class="milestone-end" style="--delay:${duration}ms" aria-hidden="true">${end}</span>
  </div>
  <div class="time-foundation"><strong>Engineering fundamentals</strong><span>Quality · security · customer learning</span></div>`;
}

function stackNode(iconName, title, detail = '', cls = '') {
  return `<div class="node stack${cls ? ` ${cls}` : ''}">${icon(iconName)}<strong>${title}</strong>${detail ? `<span>${detail}</span>` : ''}</div>`;
}

function cadenceRing(kind, label) {
  return `<div class="cadence-loop loop-${kind}" data-loop="${kind}">
    ${kind === 'build' ? `<svg class="former-disc" viewBox="0 0 300 300" aria-hidden="true">
      <circle cx="150" cy="150" r="140"/></svg>` : ''}
    <div class="loop-disc"><svg viewBox="0 0 300 300" aria-hidden="true">
      <circle class="cycle-track" cx="150" cy="150" r="140"/>
      <g class="cycle-runner">
        <circle class="cycle-sweep" cx="150" cy="150" r="140" pathLength="100"/>
        <circle class="cycle-marker" cx="150" cy="10" r="8"/>
      </g>
    </svg></div>
  </div><strong class="loop-name name-${kind}">${label}</strong>`;
}

function layer(caption, cells, cls = '') {
  return `<div class="layer${cls ? ` ${cls}` : ''}"><em>${caption}</em><div class="layer-cells">${cells.map(cell => `<span>${cell}</span>`).join('')}</div></div>`;
}

function drops(columns, active) {
  return grid(columns, active.map(isActive => (isActive ? '<i class="drop"></i>' : '<span></span>')), 'drops');
}

function routes(items) {
  return `<nav class="routes">${items.join('')}</nav>`;
}

const crackLabels = ['Handoffs', 'Decision waits', 'Wrong problem', 'Late feedback', 'Late assurance'];

const commitments = [
  ['team', 'Customer time', 'Participation + evidence'],
  ['person', 'Decision ownership', 'Crew + specialist + sponsor'],
  ['layers', 'Prepared foundations', 'Maintained + fit for purpose'],
  ['dashboard', 'Measured change', 'Value + quality + total cost'],
];

export const leadershipBodies = {
  hve: `<div class="cover-presenter" role="group" aria-label="Presenter">
    <img class="cover-photo" src="./images/daniel-scott-raynsford.jpg" alt="Daniel Scott-Raynsford">
    <div class="presenter-copy"><strong>Daniel Scott-Raynsford</strong><span>Sr. Partner Solution Architect • AI &amp; Apps • Microsoft EPS</span></div>
  </div>`,

  'delivery-eras': fig('Delivery changes and responsibilities on a timeline from 1970 to 2026',
    deliveryTimeline(), 'milestone-figure') +
    takeaway('AI is not just the next tool rollout. Revisit who owns the outcome.'),

  'outcomes-question': '',

  'agentic-cracks': fig('More output above an unchanged delivery model with five unresolved gaps',
    `<div class="cracks-composition">
      <div class="output-copy"><span>${icon('code')}More code</span><span>${icon('layers')}More prototypes</span></div>
      <div class="model-rule">Same delivery model
        <svg class="fault-beam" viewBox="0 0 1152 20" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 10H100l10 -7 10 14 10 -7H331l10 -7 10 14 10 -7H561l10 -7 10 14 10 -7H791l10 -7 10 14 10 -7H1022l10 -7 10 14 10 -7H1152"/>
        </svg>
      </div>
      <div class="fracture-row">${crackLabels.map((label, i) =>
        `<div class="fracture">${crack(i)}<strong class="fracture-label">${label}</strong></div>`).join('')}</div>
    </div>`) +
    takeaway('More code and prototypes do not guarantee better outcomes.<br>Evidence and clear decision ownership are required.'),

  handoffs: `<div class="fig cadence-figure" data-cadence data-phase="2" role="group"
    aria-label="Implementation shrinks and accelerates while planning, decisions, review, and human handoffs keep their old pace. The dashed ring shows the earlier implementation cycle.">
    <span class="fragment custom cadence-step" data-fragment-index="0" data-cadence-phase="1" aria-hidden="true"></span>
    <span class="fragment custom cadence-step" data-fragment-index="1" data-cadence-phase="2" aria-hidden="true"></span>
    <p class="phase-caption" role="status" aria-live="polite"><strong>Decision waits, review queues, and handoff overhead</strong> now set the pace.</p>
    <div class="cadence-diagram">
      <svg class="handoff-links" viewBox="0 0 1152 310" aria-hidden="true">
        <path class="handoff-path" d="M258 124H430M420 116L430 124L420 132M722 124H896M886 116L896 124L886 132"/>
        <path class="handoff-gate" d="M344 114L354 124L344 134L334 124ZM810 114L820 124L810 134L800 124Z"/>
        <g class="increment-queue">
          <rect class="increment" x="746" y="118" width="12" height="12" rx="2" style="--arrival:0ms"/>
          <rect class="increment" x="764" y="118" width="12" height="12" rx="2" style="--arrival:350ms"/>
          <rect class="increment" x="782" y="118" width="12" height="12" rx="2" style="--arrival:700ms"/>
        </g>
      </svg>
      <span class="handoff-label handoff-first">Human handoff<small class="handoff-constraint">Decision wait</small></span>
      <span class="handoff-label handoff-second">Human handoff<small class="handoff-constraint">Review queue</small></span>
      ${cadenceRing('plan', 'Planning<br>+ decisions')}
      ${cadenceRing('build', 'Implementation<br>+ testing')}
      ${cadenceRing('review', 'Review<br>+ learning')}
    </div>
    <div class="cadence-notes"><span>Security, quality, and operations checks stay.</span><span>Illustrative rhythms, not measured durations.</span></div>
  </div>` + takeaway('Faster implementation needs faster learning and decisions, not fewer checks.'),

  'dashboard-request': fig('A delivered chatbot still uses an unchanged order record and misses the carrier update from Friday to Monday',
    grid('1fr 96px 1fr', [
      panel('spark', 'The requested solution', '“Reduce order calls.<br>Build an AI chatbot.”', 'Chatbot shipped. Same order record.', 'met'),
      '<div class="gap-link" aria-hidden="true"><i></i><b>≠</b><i></i></div>',
      panel('person', 'The unresolved customer problem', 'Carrier: now Monday.<br>Chatbot: still Friday.', 'Missing update. No owner.', 'open', 'warm'),
    ], 'panels')) + takeaway('Faster implementation can multiply solutions to the wrong problem.<br>The outcome: customers know the revised date and what to do next.'),

  'feedback-window': fig('More delivery decisions outpace business validation. An agent makes an assumption in the fast implementation loop. The same unvalidated business rule accumulates in behaviour, tests, and later increments, then returns on a curved arc as the starting point for more work.',
    `<div class="amplification-diagram" data-amplification data-copies="3">
      <svg class="amplification-links" viewBox="0 0 1152 332" aria-hidden="true">
        <path class="pending-route" d="M294 160H454"/>
        <path class="pending-stop" d="M454 146V174"/>
        <path class="rule-branch" d="M652 160H802V76H858"/>
        <path class="rule-branch" d="M652 160H858"/>
        <path class="rule-branch" d="M652 160H802V244H858"/>
        <path class="rule-heads" d="M850 68L858 76L850 84M850 152L858 160L850 168M850 236L858 244L850 252"/>
        <path class="rule-return" d="M1136 284C1136 328 930 324 790 324C762 324 766 198 646 198"/>
        <path class="rule-heads" d="M656 192L646 198L656 204"/>
        ${[0, 1, 2].map(() => '<path class="rule-token" d="M0 -6L6 0L0 6L-6 0Z"/>').join('')}
        <path class="return-token" d="M0 -6L6 0L0 6L-6 0Z"/>
      </svg>
      ${cadenceRing('plan', 'Design + planning')}
      ${cadenceRing('build', 'Implementation + testing')}
      <div class="business-question"><strong>Business question</strong><span>Still open</span></div>
      <span class="business-roles">PM / SME / customer</span>
      <span class="pending-label">More decisions.<br>Validation lags.</span>
      <div class="choice-actor"><strong>Developer<br>/ agent</strong></div>
      <div class="rule-choice"><strong>Agent makes an assumption</strong><span class="rule-tag">Unvalidated rule</span></div>
      <span class="rule-stream-label">Business rule<br>in code</span>
      <span class="propagation-heading">Same assumption spreads</span>
      ${['Product behaviour', 'Tests', 'Later increments'].map((label, index) =>
        `<div class="rule-output" style="top:${36 + index * 84}px"><strong>${label}</strong><span class="rule-tag">Unvalidated rule</span>
          <span class="copy-stack" aria-hidden="true">${[1, 2, 3].map(pass => `<i class="rule-copy" data-pass="${pass}"></i>`).join('')}</span></div>`).join('')}
      <span class="return-label">Reused as the starting point</span>
    </div>`, 'amplification-figure') +
    takeaway('The question is still open.<br>The product already contains an answer.'),

  'production-early': fig('Features arrive faster than late production-readiness work can absorb them. A backlog grows between implementation and acceptance tests, assurance checks, and release readiness. Late findings create rework; release and customer value wait.',
    `<div class="readiness-diagram" data-readiness data-pending="7">
      <svg class="readiness-links" viewBox="0 0 1152 332" aria-hidden="true">
        <path class="feature-arrival" d="M262 150H388"/>
        <path class="readiness-route" d="M678 150H802"/>
        <path class="readiness-heads" d="M380 142L388 150L380 158M794 142L802 150L794 158"/>
        <rect class="backlog-boundary" x="388" y="94" width="290" height="112" rx="12"/>
        ${Array.from({ length: 7 }, (_, index) =>
          `<rect class="queued-feature" x="${424 + index % 4 * 58}" y="${116 + Math.floor(index / 4) * 44}" width="44" height="24" rx="4"/>`).join('')}
        <path class="readiness-return" d="M920 260V300Q920 320 900 320H204Q184 320 184 300V226"/>
        <path class="rework-head" d="M178 236L184 226L190 236"/>
        <path class="arrival-token" d="M-9 -6H9V6H-9Z"/>
        <path class="readiness-token" d="M-9 -6H9V6H-9Z"/>
        <path class="rework-token" d="M0 -6L6 0L0 6L-6 0Z"/>
      </svg>
      ${cadenceRing('build', 'Implementation')}
      ${cadenceRing('review', 'Production readiness')}
      <div class="feature-centre"><strong>Build + test</strong></div>
      <strong class="backlog-heading">Waiting features</strong>
      <div class="readiness-centre"><strong>Acceptance tests<br>Assurance checks<br>Release readiness</strong></div>
      <strong class="feature-caption"><span>Faster arrivals</span></strong>
      <strong class="backlog-caption">Value waits</strong>
      <strong class="readiness-caption"><span>Work still arrives late</span></strong>
      <span class="rework-caption">Late rework</span>
    </div>`, 'readiness-figure') +
    takeaway('More finished code.<br>More unfinished readiness work.'),

  'outcomes-response': '',

  'hve-model': fig('From serial handoffs to a short circular learning loop around the customer and expert crew, supported by delivery functions', `<div class="model operating-model" data-operating-model data-stage="complete">
    <span class="model-step fragment" data-fragment-index="0" aria-hidden="true"></span>
    <div class="serial"><em>Serial handoffs</em>${['Request', 'Build', 'Review', 'Reveal'].map((item, index) => `${index ? arrow('d') : ''}${node(item, '', 'ghost compact')}`).join('')}</div>
    ${arrow('r', 'arr-big model-change')}<div class="model-learning"><div class="circular-model">
      <svg class="model-route" viewBox="0 0 1152 364" aria-hidden="true">
        <path class="delivery-links" d="M310 123H421M731 123H842M310 245H422M730 245H842"/>
        <circle class="learning-circle" cx="576" cy="182" r="166"/>
        ${[0, 90, 180, 270].map(angle => `<path class="model-arrowhead" d="M566 6L576 16L566 26" transform="rotate(${angle} 576 182)"/>`).join('')}
      </svg>
      <div class="learning-centre"><strong>Customer +<br>expert crew</strong><span>Short feedback<br>cycles</span></div>
      <div class="learning-stage idea"><strong>Idea</strong><span>Business need</span></div>
      <div class="learning-stage validation"><strong>Validation</strong><span>Customer evidence</span></div>
      <div class="learning-stage engineering"><strong>Engineering</strong><span>Working increment</span></div>
      <div class="learning-stage feedback"><strong>Feedback</strong><span>Learn + decide</span></div>
      <strong class="delivery-function product">Product + design</strong>
      <strong class="delivery-function build">Engineering + testing</strong>
      <strong class="delivery-function assurance">Security + operations</strong>
      <strong class="delivery-function release">Release + service</strong>
    </div></div></div>`, 'operating-figure') +
    takeaway('Optimize for the right outcome, not maximum code output.'),

  'constraints-pillars': fig('Delivery challenges and four connected practices that help address them', `
    <div class="pillar-columns">${[
      ['Handoffs +<br>decision waits', 'team', 'Multidisciplinary<br>teams'],
      ['Unvalidated<br>requests', 'search', 'Design<br>Thinking'],
      ['Repeated setup +<br>late assurance', 'layers', 'Reusable<br>accelerators'],
      ['Non-coding<br>lifecycle work', 'spark', 'AI<br>throughout'],
    ].map(([challenge, iconName, pillar], index) => `<div class="pillar-column fragment" data-fragment-index="${index}">
      <div class="pillar-challenge">${challenge}</div>
      <div class="pillar-direction">${arrow('d')}</div>
      <div class="pillar-practice">${icon(iconName)}<strong>${pillar}</strong></div>
    </div>`).join('')}</div>`, 'pillar-figure') +
    takeaway('Established practices, refined through Microsoft ISE delivery.<br>Built on customer co-engineering and Forward Deployed Engineering experience.'),

  teams: fig('One team with distributed expertise around one outcome, underpinned by continuous alignment', `
    <div class="boundary">${grid('1fr 230px 1fr', [
      `<div class="col">${node('Customer + domain', '', 'compact')}${node('Product + engineering', '', 'compact')}${node('Relevant specialists', '', 'compact')}</div>`,
      '<div class="orb"><strong>One jointly owned outcome</strong></div>',
      `<div class="col">${node('Decision owner', '', 'compact')}${node('Shared team duties', '', 'compact')}${node('Mentoring + pairing', '', 'compact')}</div>`,
    ])}</div>
    ${band('Continuous alignment', 'purple')}`) + takeaway('Distributed expertise. Not separate queues.'),

  'team-example': `<div class="team-story">
    <figure class="team-figure" aria-label="Separate handoffs compared with close multidisciplinary work">
      <div class="team-comparison">
        <div class="team-scene"><h3>“My part is done.”</h3>
          <img class="team-scene-art" src="./images/my-part-is-done.png" width="1536" height="1024"
            alt="Work is thrown over a wall to someone who lacks its context.">
        </div>
        <div class="team-scene shared"><h3>“Our outcome works.”</h3>
          <img class="team-scene-art" src="./images/shared-goal.png" width="1024" height="1024"
            alt="A close multidisciplinary crew shares one goal and one piece of work, with expert review retained.">
        </div>
      </div>
    </figure>
    <ul class="team-reasons" aria-label="Why close teamwork helps">
      <li><strong>Decide sooner</strong><p>Ask experts directly.<br>Check assumptions together.</p></li>
      <li><strong>Build alignment and buy-in</strong><p>Share context and decisions.<br>Build agreement as you work.</p></li>
      <li><strong>Adjust continuously</strong><p>Check and adapt throughout,<br>not after a long delivery cycle.</p></li>
    </ul>
  </div>` + takeaway('Keep the expertise and required review. Shorten the feedback loop.'),

  'design-thinking': `<figure class="dt-figure"
      aria-label="Design Thinking: customer evidence can reopen the Problem, Solution, and Implementation spaces">
    <img class="dt-art" src="./images/design-thinking-customer-evidence.png" width="1536" height="1024"
      alt="Customer evidence can change any decision.
        Problem: Explore and Focus. Are we solving the right problem?
        Solution: Explore and Focus. Does this idea help people?
        Implementation: Test in real use. Does it work in real use?">
  </figure>` + takeaway('Use AI speed to test assumptions, not build the wrong thing faster.<br>' +
    '<span class="dt-context">Lower coding barriers do not replace customer and domain expertise.</span>'),

  'design-example': `<figure class="value-figure" aria-label="Test the requested chatbot against the customer's task">
    <div class="value-draft">
      <div class="value-sheet">
        <p class="value-request">&ldquo;Build an AI chatbot.&rdquo;</p>
        <p class="value-principle">Test the option against the customer's task:<br>
          <strong>a trustworthy revised date and a clear next action.</strong></p>
      </div>
      <svg class="value-pencil" viewBox="0 0 160 160" aria-hidden="true" focusable="false">
        <g transform="rotate(39 80 80)">
          <path d="M62 36H98V125L80 150L62 125Z" fill="#ffd7a6" stroke="#b85a20"
            stroke-width="3" stroke-linejoin="round"/>
          <path d="M62 36H98V125H62Z" fill="#f4a44b"/>
          <path d="M72 38V123M88 38V123" stroke="#ffdda5" stroke-width="4"/>
          <path d="M62 36V20Q62 10 72 10H88Q98 10 98 20V36Z" fill="#d8c6f0" stroke="#7651aa"
            stroke-width="3"/>
          <path d="M62 34H98V47H62Z" fill="#f2edf8" stroke="#7651aa" stroke-width="3"/>
          <path d="M73 140L80 150L87 140Z" fill="#292239"/>
        </g>
      </svg>
    </div>
  </figure>` + takeaway('Test value early. Change or stop options that do not help.<br>' +
    '<span class="value-why">Faster AI coding can mean more rework when the idea is wrong.</span>'),

  accelerators: `<figure class="accelerator-figure"
    aria-label="Reusable assets feed a capability library, and matching capability icons extend a small team">
    <div class="accelerator-assets" role="group" aria-label="Four reusable asset types">
      <h3>Reusable assets</h3>
      <div class="accelerator-asset">
        <svg class="accelerator-asset-art" viewBox="0 0 96 88" aria-hidden="true" focusable="false">
          <path d="M16 78Q17 51 46 51Q75 51 76 78Z" fill="#d8c6f0" stroke="#7651aa" stroke-width="2"/>
          <circle cx="46" cy="31" r="18" fill="#f3edfc" stroke="#7651aa" stroke-width="2"/>
          <path d="M78 8L81 18L91 21L81 24L78 34L75 24L65 21L75 18Z" fill="#f4a44b" stroke="#b85a20" stroke-width="2"/>
        </svg>
        <span>AI agents</span>
      </div>
      <div class="accelerator-asset">
        <svg class="accelerator-asset-art" viewBox="0 0 96 88" aria-hidden="true" focusable="false">
          <path d="M23 8H66L79 21V78H23Z" fill="#fff3ea" stroke="#b85a20" stroke-width="2"/>
          <path d="M66 8V21H79" fill="#ffd7a6" stroke="#b85a20" stroke-width="2"/>
          <path d="M36 34H65M36 43H55M36 64H64" stroke="#b85a20" stroke-width="3" stroke-linecap="round"/>
          <path d="M62 47L68 53L62 59M68 53H44" fill="none" stroke="#7651aa" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <span>Agent Skills</span>
      </div>
      <div class="accelerator-asset">
        <svg class="accelerator-asset-art" viewBox="0 0 96 88" aria-hidden="true" focusable="false">
          <path d="M75 10Q89 27 72 41Q66 45 60 43L30 75Q22 83 15 75Q8 68 16 60L48 30Q46 18 57 11L60 27L72 25Z"
            fill="#d9efe8" stroke="#1b786e" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="23" cy="68" r="3" fill="#1b786e"/>
        </svg>
        <span>Tools</span>
      </div>
      <div class="accelerator-knowledge">
        <svg class="accelerator-book" viewBox="0 0 96 88" aria-hidden="true" focusable="false">
          <path d="M48 20Q30 8 8 14V69Q30 63 48 76Q66 63 88 69V14Q66 8 48 20Z"
            fill="#ffffff" stroke="#7651aa" stroke-width="2" stroke-linejoin="round"/>
          <path d="M48 20V76M19 29Q30 26 38 32M19 41Q30 38 38 44M59 32Q70 26 79 29M59 44Q70 38 79 41"
            fill="none" stroke="#7651aa" stroke-width="2" stroke-linecap="round"/>
          <path d="M65 13V34L71 29L77 34V12" fill="#ffd7a6" stroke="#b85a20" stroke-width="2"/>
        </svg>
        <span>Organizational<br>knowledge and guidance</span>
      </div>
    </div>
    <svg class="accelerator-arrow" viewBox="0 0 48 40" aria-hidden="true" focusable="false">
      <path d="M4 20H44M34 10L44 20L34 30"/>
    </svg>
    <div class="accelerator-library" role="group" aria-labelledby="accelerator-library-title">
      <div class="accelerator-library-heading">
        <span class="accelerator-library-icon" aria-hidden="true">${icon('book')}</span>
        <h3 id="accelerator-library-title">Agentic capabilities</h3>
      </div>
      <ul class="accelerator-capabilities" aria-label="Examples of shared capabilities">
        ${acceleratorCapabilities.map(capability => `<li class="tone-${capability[2]}">
          ${acceleratorCapabilityIcon(...capability)}<span>${capability[0]}</span></li>`).join('')}
      </ul>
    </div>
    <svg class="accelerator-arrow" viewBox="0 0 48 40" aria-hidden="true" focusable="false">
      <path d="M4 20H44M34 10L44 20L34 30"/>
    </svg>
    <div class="accelerator-team" role="group" aria-labelledby="accelerator-team-title">
      <h3 id="accelerator-team-title">One small team</h3>
      <ul class="accelerator-team-icons" aria-label="Examples of shared capabilities used by the team">
        ${[0, 2, 3, 6, 10].map(index => `<li>${
          acceleratorCapabilityIcon(...acceleratorCapabilities[index], true)}</li>`).join('')}
      </ul>
      <img class="accelerator-team-art" src="./images/team-with-ai-capabilities.png" width="1536" height="1024"
        alt="Two people working together at a laptop.">
      <p>People stay accountable.</p>
    </div>
  </figure>` + takeaway('Give every team access to reusable expertise.<br>' +
    '<span class="accelerator-why">Build, collect, share, and govern capabilities teams can draw on.</span>'),

  'accelerator-example': fig('The carrier-update increment on a reused foundation', `<div class="outline-box">
    <span class="tab">Still verify: late updates · access · operation · recovery</span>
    ${node('Changed: carrier update to order record', 'Friday becomes Monday; confirm the next action', 'warm wide')}
    ${layer('Reused', ['Approved environment', 'Identity', 'Logging', 'CI/CD'])}
  </div>`) + takeaway('Separate inherited controls, changed behavior, and remaining assurance.'),

  'lifecycle-ai': fig('AI assistance across the lifecycle with expert review', `
    ${band('AI assists each stage', 'tint', 'spark')}
    ${chain([
      stackNode('target', 'Research'), stackNode('document', 'Requirements'), stackNode('layers', 'Architecture'),
      stackNode('code', 'Build + test'), stackNode('loop', 'Operations'),
    ], 'five')}
    ${band('Experts review + accept', 'purple', 'check')}
    ${ret('Gaps return to the crew', 5)}
    <div class="contrast">${node('AI-assisted delivery', '', 'tint compact')}<b aria-hidden="true">≠</b>${node('AI-powered product', '', 'ghost compact')}<p>The delivered solution need not contain AI.</p></div>`),

  'lifecycle-example': fig('Friday-to-Monday evidence carried through expert review', `<div class="cols7">
    <em class="span7">AI-assisted drafts: Friday becomes Monday</em>
    ${node('Trace carrier update', '', 'compact')}${arrow()}${node('Date + next action', '', 'compact')}${arrow()}${node('Update path + tests', '', 'compact')}${arrow()}${node('Late-update runbook', '', 'compact')}
    ${['<i class="drop"></i>', '<span></span>', '<i class="drop"></i>', '<span></span>', '<i class="drop"></i>', '<span></span>', '<i class="drop"></i>'].join('')}
    <em class="span7">Expert review</em>
    ${[['Support lead', 'checks evidence'], ['Product owner', 'checks customer need'], ['Engineer', 'checks update rules'], ['Operations', 'checks recovery']].map(([who, check], index) => `${index ? '<span></span>' : ''}${inode('check', who, check, 'tint')}`).join('')}
  </div>${ret('Unresolved assumption → back to the crew', 4)}`),

  'evidence-judgment': fig('Evidence converging on an owner decision', `<div class="converge">
    <div class="col evidence">${node('Reviewed intent', 'Requirements + architecture')}${node('Repeatable checks', 'Tests + build + analysis')}${node('Human review', 'Specialist + customer')}</div>
    <svg class="gutter" viewBox="0 0 110 328" aria-hidden="true"><path d="M0 48C55 48 55 164 110 164M0 164H110M0 280C55 280 55 164 110 164M100 156L110 164L100 172"/></svg>
    ${node('Owner decides', 'Evidence + judgment', 'tint')}
    <svg class="gutter" viewBox="0 0 90 328" aria-hidden="true"><path d="M0 164C45 164 45 70 90 70M80 62L90 70L80 78M0 164C45 164 45 258 90 258M80 250L90 258L80 266"/></svg>
    <div class="col outcomes">${node('Accept with an owner', 'Evidence is sufficient', 'purple')}${node('Return for more work', 'A gap or doubt remains', 'warm')}</div>
  </div>`) + takeaway('Plausible output and passing tests alone do not prove correctness.'),

  'supported-loop': fig('The delivery loop and what the organization provides', `<div class="split-loop">
    ${loop({ scale: 0.9, fragile: true })}
    <div class="col provides"><em>The organization provides</em>${[['team', 'Shared ownership'], ['clock', 'Customer time'], ['layers', 'Maintained foundations'], ['check', 'Review capacity']].map(([iconName, text]) => inode(iconName, text, '', 'compact')).join('')}</div>
  </div>
  <div class="callout">${icon('flag')}<span>Fragile boundary: customer decisions need organizational support</span></div>`),

  'organization-boundary': fig('From a waiting increment to a sponsored change', chain([
    node('Ready increment', 'Waits for required risk decision', 'warm'),
    node('Name reviewer + policy owner', '', 'tint'),
    node('Sponsored change', 'Participation · capacity · escalation · approved policy', 'purple'),
    node('Reassess', 'Keep required assurance'),
  ]) + ret('Repeat for the next wait', 4)) + takeaway('Name the owner. Measure the next wait.'),

  experiment: fig('Baseline and experiment evidence for one outcome', `
    ${band('One outcome: named customer owner + sponsor', 'tint', 'target')}
    ${evidenceTable(['Value', 'Quality', 'Waiting', 'Rework', 'Cost'])}
    <p class="foot">AI-written-code share measures adoption, not success.</p>`),

  'capability-transfer': fig('From a principle to a customer-owned capability', `<div class="cols7">
    ${stackNode('document', 'Principle', 'Understand')}${arrow()}${stackNode('team', 'Owned practice', 'Co-work')}${arrow()}${stackNode('layers', 'Maintained mechanism', 'Review + update')}${arrow()}${stackNode('flag', 'Customer capability', 'Continue independently')}
    <span></span><span></span><i class="drop"></i><span></span><i class="drop"></i><span></span><span></span>
    <span></span><span></span><div class="band purple span3"><span>Customer engineers co-own and maintain</span></div><span></span><span></span>
  </div>`) + takeaway('Capability stays after co-engineering ends.'),

  'leadership-close': fig('Four organizational commitments and optional process support', `
    <em class="cap">Organizational commitments</em>
    <div class="commit">${commitments.map(([iconName, title, detail]) => stackNode(iconName, title, detail)).join('')}</div>
    <div class="support"><strong>Optional process support: HVE-Core</strong><span>Tools do not supply organizational commitments.</span></div>
    <em class="cap">Stop here or continue</em>`)
    + routes(['<a href="#/deep-dive">Optional HVE-Core →</a>', '<a href="#/demo-install">Demos →</a>', '<button type="button" data-action="pause">Pause for questions</button>']),
};
