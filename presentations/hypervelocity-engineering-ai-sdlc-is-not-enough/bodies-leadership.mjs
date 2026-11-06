/**
 * Leadership slide bodies, plus the adoption slides that close the deeper section.
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { leadershipBodies } from './bodies-leadership.mjs'.
 */
import {
  arrow, node, chip, band, fig, takeaway, grid, chain, ret, icon, crack,
  lane, under, laneGroup, legend,
} from './diagrams.mjs';
import { qrSvg } from './qr.mjs';

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

const reuseTrail = 'M8 52H104C218 52 218 22 332 22C446 22 446 52 560 52C674 52 674 22 788 22C902 22 902 52 1016 52H1112';

const reuseStops = [
  ['person', 'purple', 'Show the way', 'An expert has a practice that works.'],
  ['pencil', 'teal', 'Write it down', 'Make it an agent, skill, instruction, or check.'],
  ['shield', 'warm', 'Review and own', 'A named owner. Checks must pass.'],
  ['team', 'purple', 'Teams adapt it', 'Fit it to the real case.'],
  ['loop', 'teal', 'Update or retire', 'Keep it current or remove it.'],
];

const toolingStages = [
  ['Discover', 'purple'], ['Define', 'teal'], ['Design', 'warm'],
  ['Build', 'purple'], ['Verify', 'teal'], ['Operate', 'warm'],
];

const toolingRoles = [
  ['Business', 'flag', 'warm'], ['Design', 'pencil', 'purple'], ['Architecture', 'layers', 'teal'],
  ['Assurance', 'shield', 'warm'], ['Engineering', 'code', 'purple'], ['Data', 'dashboard', 'teal'],
  ['Operations', 'loop', 'warm'],
];

const toolingBadge = (symbol, tone) =>
  `<span class="tooling-badge tone-${tone}" aria-hidden="true">${icon(symbol)}</span>`;

const contextGuessRoute = 'M216 144C262 144 262 46 312 46C360 46 372 84 420 70C468 56 480 24 540 40C600 56 600 92 660 76C720 60 740 34 800 46H880';
const contextInformedRoute = 'M216 144C262 144 262 188 312 188H880';

const contextGates = [
  ['document', 'teal', 'Relevant context'], ['book', 'teal', 'Recorded decisions'],
  ['shield', 'teal', 'Executable checks'], ['team', 'purple', 'Expert judgment'],
];

const frameworkPrinciples = [
  ['1', 'Multidisciplinary teams', 'Experts share one outcome'],
  ['2', 'Design Thinking', 'Validate value with customers'],
  ['3', 'Reusable accelerators', 'Start from maintained expertise'],
  ['4', 'AI tooling', 'Amplify the crew'],
];

const frameworkStack = [
  ['code', 'HVE-Core', 'Agents, skills, instructions', 'Toolkit'],
  ['spark', 'AI assistants', 'Help each role'],
  ['search', 'AI models', 'Language and reasoning'],
  ['check', 'Automated checks', 'Tests and analysis'],
];

const frameworkRow = ([mark, title, detail, flag], isIcon) => `<li class="framework-row${flag ? ' framework-key' : ''}">
          <span class="framework-chip" aria-hidden="true">${isIcon ? icon(mark) : mark}</span>
          <span class="framework-text"><strong>${title}${flag ? `<b class="framework-flag">${flag}</b>` : ''}</strong><span>${detail}</span></span></li>`;

const frameworkPanel = (tone, title, tag, items, isIcon) => `<article class="framework-panel tone-${tone}">
        <h3 class="framework-head"><span>${title}</span><b class="framework-tag">${tag}</b></h3>
        <ul class="framework-rows">${items.map(item => frameworkRow(item, isIcon)).join('')}</ul>
      </article>`;

const frameworkLoop = `<div class="framework-loop" aria-hidden="true">
        <svg viewBox="0 0 240 312" width="240" height="312" focusable="false">
          <path class="framework-stroke" d="M196 307V112A76 76 0 0 0 44 112V276"/>
          <polygon class="framework-arrowhead" points="21.5,275 44,308 66.5,275"/>
        </svg>
        <p>Tools help<br>apply the<br>principles</p>
      </div>`;

const teamPillars = [
  ['purple', '1', 'Teams'], ['teal', '2', 'Design Thinking'],
  ['warm', '3', 'Accelerators'], ['gold', '4', 'AI tooling'],
];

const teamRoles = [
  ['purple', '1', 'flag', 'Program manager', 'Requirements and backlog planning'],
  ['teal', '2', 'pencil', 'UX designer', 'Design Thinking coach, customer evidence'],
  ['warm', '3', 'layers', 'Architect', 'Decision records, diagrams, security plans'],
  ['warm', '3', 'loop', 'Operations', 'Runbooks and infrastructure checks'],
  ['gold', '4', 'dashboard', 'Data scientist', 'Notebooks and dashboards'],
  ['gold', '4', 'code', 'Engineer', 'Research, plan, implement, review'],
];

const teamCard = ([tone, pillar, symbol, role, job]) => `<li class="team-card tone-${tone}">
          <span class="team-mark" aria-hidden="true"><span class="team-chip">${icon(symbol)}</span><b class="team-badge">${pillar}</b></span>
          <span class="team-text"><strong>${role}</strong><span>${job}</span></span></li>`;

const teamSpoke = ([tone], index) => {
  const y = [44, 144, 244][index % 3];
  const path = index < 3 ? `M350 ${y}C450 ${y} 470 144 540 144` : `M770 ${y}C670 ${y} 650 144 580 144`;
  return `<path class="team-spoke tone-${tone}" d="${path}"/>`;
};

const teamLegend = `<ul class="team-legend" aria-label="Pillars">${teamPillars.map(([tone, number, name]) =>
  `<li class="tone-${tone}"><b class="team-badge team-solid">${number}</b><span>${name}</span></li>`).join('')}</ul>`;

const adoptionCommitments = [
  ['purple', 'flag', 'Sponsorship', 'Leaders own the outcome'],
  ['purple', 'target', 'Authority', 'Teams can decide and act'],
  ['teal', 'team', 'Shared ownership', 'Decisions made together'],
  ['teal', 'clock', 'End user time', 'End users join the work'],
  ['warm', 'search', 'Review capacity', 'Experts review in time'],
  ['warm', 'book', 'Maintained knowledge', 'Practices stay current'],
];

const adoptionCard = ([tone, symbol, title, detail]) => `<li class="adoption-card tone-${tone}">
          <span class="adoption-chip" aria-hidden="true">${icon(symbol)}</span>
          <span class="adoption-text"><strong>${title}</strong><span>${detail}</span></span></li>`;

const aiActivity = [
  ['pencil', 'Prompts sent'],
  ['code', 'Code generated'],
  ['dashboard', 'Seats activated'],
];

const outcomeMeasures = [
  ['purple', 'target', 'Useful value', 'Users benefit'],
  ['purple', 'shield', 'Quality', 'Holds up in use'],
  ['teal', 'clock', 'Waiting', 'Less idle time'],
  ['teal', 'loop', 'Rework', 'Fewer redo loops'],
  ['warm', 'person', 'Experience', 'For users and teams'],
  ['warm', 'coins', 'Total cost', 'All costs counted'],
];

const outcomeCard = ([tone, symbol, title, detail]) => `<li class="outcome-card tone-${tone}">
          <span class="outcome-chip" aria-hidden="true">${icon(symbol)}</span>
          <span class="outcome-text"><strong>${title}</strong><span>${detail}</span></span></li>`;

const activityRow = ([symbol, title]) => `<li class="outcome-act">
          <span class="outcome-chip" aria-hidden="true">${icon(symbol)}</span><strong>${title}</strong></li>`;

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
  </div>`;
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

function drops(columns, active) {
  return grid(columns, active.map(isActive => (isActive ? '<i class="drop"></i>' : '<span></span>')), 'drops');
}

function routes(items) {
  return `<nav class="routes">${items.join('')}</nav>`;
}

const crackLabels = ['Handoffs', 'Decision waits', 'Wrong problem', 'Late feedback', 'Late assurance'];

const closeFields = [
  ['purple', 'team', 'Team', 'One team'],
  ['gold', 'flag', 'Outcome', 'One real outcome'],
  ['teal', 'book', 'Read first', 'Official documentation'],
  ['warm', 'person', 'Then use', 'Your role guide'],
];

const closeField = ([tone, symbol, name, value]) => `<li class="close-field tone-${tone}">` +
  `<span class="close-chip" aria-hidden="true">${icon(symbol)}</span>` +
  `<span class="close-text"><span>${name}</span><strong>${value}</strong></span></li>`;

const closePillars = teamPillars.map(([tone, number]) =>
  `<b class="close-badge tone-${tone}">${number}</b>`).join('');

const openTargets = [
  { tone: 'purple', symbol: 'code', title: 'GitHub repo', host: 'github.com', path: '/microsoft/hve-core',
    url: 'https://github.com/microsoft/hve-core', label: 'QR code for the HVE-Core repository on GitHub' },
  { tone: 'teal', symbol: 'book', title: 'Docs site', host: 'microsoft.github.io', path: '/hve-core/docs',
    url: 'https://microsoft.github.io/hve-core/docs/', label: 'QR code for the HVE-Core documentation site' },
];

const openQrCard = target => `<div class="wr-qr tone-${target.tone}">
  <p class="wr-qr-head"><span class="st-chip" aria-hidden="true">${icon(target.symbol)}</span><strong>${target.title}</strong></p>
  <div class="wr-code">${qrSvg(target.url, { label: target.label, quiet: 2 })}</div>
  <p class="wr-url"><strong>${target.host}</strong><span>${target.path}</span></p>
</div>`;

const openFacts = [
  ['purple', 'team', 'Open source', 'Maintained by Microsoft. Pull requests welcome.'],
  ['teal', 'loop', 'Stay current', 'Fork it. Merge upstream changes when ready.'],
  ['warm', 'pencil', 'Make it yours', 'Use what helps. Drop the rest. Keep your spec-driven and other workflows.'],
];

const openFact = ([tone, symbol, title, detail]) => `<li class="wr-fact tone-${tone}">` +
  `<span class="st-chip" aria-hidden="true">${icon(symbol)}</span>` +
  `<span class="wr-text"><strong>${title}</strong><span>${detail}</span></span></li>`;

export const leadershipBodies = {
  hve: `<div class="cover-presenter" role="group" aria-label="Presenter">
    <img class="cover-photo" src="./images/daniel-scott-raynsford.jpg" alt="Daniel Scott-Raynsford">
    <div class="presenter-copy"><strong>Daniel Scott-Raynsford</strong><span>Sr. Partner Solution Architect • AI &amp; Apps • Microsoft EPS</span></div>
  </div>`,

  'delivery-eras': fig('Delivery changes and responsibilities on a timeline from 1970 to 2026',
    deliveryTimeline(), 'milestone-figure') +
    takeaway('AI is more than a tool rollout. Like earlier shifts in software delivery, it asks us to rethink how teams organize and deliver outcomes.'),

  'outcomes-question': `<img class="section-divider-art" src="./images/good-news.png" width="1536" height="1024"
    alt="An AI engine runs through a broken process while people work nearby. The caption says: Good news, we can now do the wrong thing a thousand times faster.">`,

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

  'feedback-window': fig('More delivery decisions outpace business validation. An agent makes an assumption in the fast implementation loop. The same unvalidated business rule accumulates in behaviour, tests, and later increments. A shared return route runs below the implementation loop and rises to just outside its lower edge.',
    `<div class="amplification-diagram" data-amplification data-copies="3">
      <svg class="amplification-links" viewBox="0 0 1152 332" aria-hidden="true">
        <path class="pending-route" d="M294 160H454"/>
        <path class="pending-stop" d="M454 146V174"/>
        <path class="rule-branch" d="M652 160H802V76H858"/>
        <path class="rule-branch" d="M652 160H858"/>
        <path class="rule-branch" d="M652 160H802V244H858"/>
        <path class="rule-heads" d="M850 68L858 76L850 84M850 152L858 160L850 168M850 236L858 244L850 252"/>
        <path class="rule-return-branches" d="M1142 76H1148M1142 160H1148M1142 244H1148"/>
        <path class="rule-return" d="M1148 76V284Q1148 324 1108 324H614Q574 324 574 284V246"/>
        <path class="rule-heads" d="M568 256L574 246L580 256"/>
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

  'accelerator-example': `<figure class="reuse-scene"
    aria-label="An example of how expert practice becomes a maintained path that teams adapt, with improvements contributed back to its owner">
    <svg class="reuse-trail" viewBox="0 0 1120 84" aria-hidden="true" focusable="false">
      <path class="reuse-ribbon" d="${reuseTrail}"/>
      <path class="reuse-core" d="${reuseTrail}"/>
    </svg>
    <ol class="reuse-stops">
      ${reuseStops.map(([symbol, tone, title, text]) => `<li class="tone-${tone}">
        <span class="reuse-pin" aria-hidden="true">${icon(symbol)}</span>
        <strong>${title}</strong><span>${text}</span></li>`).join('')}
    </ol>
    <svg class="reuse-return" viewBox="0 0 1120 34" aria-hidden="true" focusable="false">
      <path d="M788 2V14Q788 26 776 26H572Q560 26 560 14V8M553 15L560 6L567 15"/>
    </svg>
    <p class="reuse-return-label">Contribute improvements back</p>
  </figure>` + takeaway('Collate, curate, govern, and share expert practice.<br>' +
    '<span class="reuse-why">One example process, not a prescription. Reuse does not replace review.</span>'),

  'lifecycle-ai': `<figure class="tooling-scene"
    aria-label="Security checks and review happen at every lifecycle stage, and AI assists every stage for seven kinds of role. Experts stay accountable.">
    <ol class="tooling-stages">
      ${toolingStages.map(([name, tone]) => `<li class="tone-${tone}"><span>${name}</span></li>`).join('')}
    </ol>
    <ul class="tooling-marks" aria-hidden="true">
      ${toolingStages.map(() => `<li>${toolingBadge('shield', 'teal')}</li>`).join('')}
    </ul>
    <p class="tooling-mark-note">Security and review at every stage, not at the end</p>
    <p class="tooling-ribbon">${icon('spark')}<span>AI assists every stage, not only coding</span></p>
    <ul class="tooling-crew">
      ${toolingRoles.map(([name, symbol, tone]) => `<li class="tone-${tone}">${toolingBadge(symbol, tone)}<span>${name}</span></li>`).join('')}
    </ul>
    <p class="tooling-accountable">${icon('check')}<span>Experts stay accountable and set review to match the risk</span></p>
  </figure>` + takeaway('Continuous checks keep pace only with AI at every stage.<br>' +
    '<span class="tooling-why">More speed needs more direction, from one shared baseline.</span>'),

  'lifecycle-example': `<figure class="context-scene"
    aria-label="From the same request, guessing leads to work that looks right but may fail later. Relevant context, recorded decisions, executable checks, and expert judgment lead to work checked against your rules.">
    <div class="context-map">
      <svg class="context-routes" viewBox="0 0 1088 288" aria-hidden="true" focusable="false">
        <path class="context-ribbon tone-warm" d="${contextGuessRoute}"/>
        <path class="context-core tone-warm" d="${contextGuessRoute}"/>
        <path class="context-ribbon tone-teal" d="${contextInformedRoute}"/>
        <path class="context-core tone-teal" d="${contextInformedRoute}"/>
      </svg>
      <p class="context-start"><span>Same request</span><strong>Add authentication to the checkout flow</strong></p>
      <p class="context-guess">Guesses that look informed</p>
      <p class="context-end context-end-guess tone-warm"><span>Looks right.<br>May fail later.</span></p>
      <ol class="context-gates">
        ${contextGates.map(([symbol, tone, label]) => `<li class="tone-${tone}">
          <span class="context-badge" aria-hidden="true">${icon(symbol)}</span><span>${label}</span></li>`).join('')}
      </ol>
      <p class="context-end context-end-informed tone-teal"><span>Checked against your rules</span></p>
    </div>
  </figure>` + takeaway('The request is the same. The inputs change the work.<br>' +
    '<span class="context-why">Experts still judge whether the result is right.</span>'),

  'outcomes-action': '',

  'framework-toolkit': `<figure class="framework-scene"
    aria-label="HVE principles and methods endure. The enabling technology stack, which includes the HVE-Core toolkit, evolves rapidly. The technology helps apply the principles.">
    <div class="framework-grid">
      ${frameworkPanel('purple', 'Principles and methods', 'Endures', frameworkPrinciples, false)}
      ${frameworkLoop}
      ${frameworkPanel('teal', 'Enabling technology', 'Evolves rapidly', frameworkStack, true)}
    </div>
  </figure>` + takeaway('Principles endure. Technology evolves.<br>' +
    '<span class="framework-why">Choose tools that help. Keep the principles when tools change.</span>'),

  'team-support': `<figure class="team-scene"
    aria-label="HVE-Core is one toolkit of agents, skills, and instructions. It gives six roles a starting point: program manager, UX designer with a Design Thinking coach, architect, operations, data scientist, and engineer. Each role connects to one of the four pillars.">
    <svg class="team-spokes" viewBox="0 0 1120 288" aria-hidden="true" focusable="false">
      ${teamRoles.map(teamSpoke).join('')}
    </svg>
    <div class="team-hub"><span class="team-hub-icon" aria-hidden="true">${icon('team')}</span><strong>HVE-Core</strong><span>Agents, skills, instructions</span></div>
    <ul class="team-side team-left">${teamRoles.slice(0, 3).map(teamCard).join('')}</ul>
    <ul class="team-side team-right">${teamRoles.slice(3).map(teamCard).join('')}</ul>
    ${teamLegend}
  </figure>` + takeaway('Give every role a reusable starting point.<br>' +
    '<span class="team-why">Customize it for your organization.</span>'),

  'hve-core-open': `<figure class="wr-scene"
    aria-label="HVE-Core is open source and maintained by Microsoft. Scan the codes for the GitHub repository and the documentation site. Use what helps, drop the rest, and keep your own workflows.">
    <div class="wr-qrs">${openTargets.map(openQrCard).join('')}</div>
    <ul class="wr-facts">${openFacts.map(openFact).join('')}</ul>
  </figure>` + routes(['<a href="#/deep-dive">Diving deeper into HVE-Core →</a>', '<button type="button" data-action="pause">Pause for questions</button>']),

  'adoption-commitments': `<figure class="adoption-scene"
    aria-label="Installing the toolkit is only the start. Adoption needs six leadership commitments: sponsorship, authority, shared ownership, end user time, review capacity, and maintained knowledge.">
    <div class="adoption-strip">
      <span class="adoption-installed tone-slate"><span class="adoption-tick" aria-hidden="true">${icon('check')}</span>Toolkit installed</span>
      <span class="adoption-next" aria-hidden="true">→</span>
      <strong>Now what? Six commitments.</strong>
    </div>
    <ul class="adoption-grid">${adoptionCommitments.map(adoptionCard).join('')}</ul>
  </figure>` + takeaway('Installation is the easy part.<br>' +
    '<span class="adoption-why">Adoption needs leadership commitments.</span>'),

  'outcome-measures': `<figure class="outcome-scene"
    aria-label="Measure the outcome, not the AI activity. Prompts sent, code generated, and seats activated show use. Useful value, quality, waiting, rework, experience, and total cost show the outcome.">
    <div class="outcome-left tone-slate">
      <p class="outcome-head"><strong>AI activity</strong><span>Shows use, not success</span></p>
      <ul class="outcome-acts">${aiActivity.map(activityRow).join('')}</ul>
    </div>
    <span class="outcome-next" aria-hidden="true">→</span>
    <div class="outcome-right">
      <p class="outcome-head tone-purple"><strong>Outcome</strong><span>Shows what changed</span></p>
      <ul class="outcome-grid">${outcomeMeasures.map(outcomeCard).join('')}</ul>
    </div>
  </figure>` + takeaway('Count outcomes, not activity.<br>' +
    '<span class="outcome-why">Prompts and code volume show use, not success.</span>'),

  'team-pass': `<figure class="close-scene"
    aria-label="Explore HVE-Core through the official documentation, then use your role guide. Apply HVE together with one team on one real outcome, guided by the four numbered pillars. A live demo follows.">
    <div class="close-ticket"><div class="close-pass">
      <div class="close-main">
        <p class="close-band"><span class="close-band-title"><span class="close-chip" aria-hidden="true">${icon('team')}</span>Team pass</span>
          <span class="close-pillars" aria-hidden="true">${closePillars}</span></p>
        <ul class="close-fields">${closeFields.map(closeField).join('')}</ul>
      </div>
      <div class="close-stub tone-slate">
        <span class="close-chip" aria-hidden="true">${icon('layers')}</span>
        <strong>Live demo</strong>
        <span>See one change, end to end.</span>
      </div>
    </div></div>
  </figure>` + takeaway('Start with one team and one real outcome.')
    + routes(['<a href="#/demo-install">Demos →</a>', '<button type="button" data-action="pause">Pause for questions</button>']),
};
