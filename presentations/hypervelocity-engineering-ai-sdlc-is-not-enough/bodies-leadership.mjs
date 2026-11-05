/**
 * Leadership section slide bodies (slides 1 to 25).
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { leadershipBodies } from './bodies-leadership.mjs'.
 */
import {
  arrow, node, inode, chip, band, fig, takeaway, grid, chain, ret, icon, crack,
  lane, under, laneGroup, legend, loop, evidenceTable,
} from './diagrams.mjs';

const meetingRoute = [['Question', 1.2, 'work'], ['Waits for the next planning ceremony', 3.6, 'wait'], ['Decision', 1.2, 'work']];
const directRoute = [['Question', 1.2, 'work'], ['Customer decision owner', 2.0, 'key', 'time + authority'],
  ['Decision', 1.2, 'work'], ['', 1.6, 'space']];

const lateAssurance = [['Start', 1.0, 'work'], ['Build', 3.4, 'impl'], ['Release', 1.6, 'work']];
const earlyAssurance = [['Start', 1.0, 'work'], ['Build', 3.4, 'impl'], ['Release', 1.6, 'check', 'Required review']];

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

  'dashboard-request': fig('A delivered dashboard request beside the operator need it does not answer',
    grid('1fr 96px 1fr', [
      panel('dashboard', 'What was asked', '“We need a quality dashboard.”', 'Delivered. Works as specified.', 'met'),
      '<div class="gap-link" aria-hidden="true"><i></i><b>≠</b><i></i></div>',
      panel('person', 'At shift handover, operators ask', '“What did the last shift already try?”', 'Still unanswered', 'open', 'warm'),
    ], 'panels')
    + legend([], 'Illustrative scenario, not a customer case')) + takeaway('A delivered request is not a solved problem.'),

  'feedback-window': fig('Two routes to a customer decision',
    laneGroup('Meeting-only route', lane(meetingRoute)) + laneGroup('Direct route', lane(directRoute))
    + legend(['work', 'wait'])) + takeaway('Keep useful ceremonies. Add a direct route to decisions.'),

  'production-early': fig('Assurance only at the end compared with assurance throughout',
    laneGroup('Late-only involvement', lane(lateAssurance), under(lateAssurance, [[3, 1, 'check', 'Security · data · operations']]))
    + laneGroup('Involved from the start', lane(earlyAssurance), under(earlyAssurance, [[1, 3, 'check', 'Security · data · operations participate throughout']]))
    + legend([])) + takeaway('Shift assurance earlier. Keep independent reviews where required.'),

  'outcomes-response': '',

  'hve-model': fig('From serial handoffs to a customer-and-crew loop', `<div class="model">
    <div class="serial"><em>Serial handoffs</em>${['Request', 'Build', 'Review', 'Reveal'].map((item, index) => `${index ? arrow('d') : ''}${node(item, '', 'ghost compact')}`).join('')}</div>
    ${arrow('r', 'arr-big')}${loop({ scale: 0.9 })}</div>`) + takeaway('Optimize for the right outcome, not maximum code output.'),

  'constraints-pillars': fig('Four constraints and the four pillars that answer them', `
    ${[
      ['Handoffs + decision waits', 'team', 'Multidisciplinary teams'],
      ['Unvalidated requests', 'search', 'Design Thinking'],
      ['Repeated setup + late assurance', 'layers', 'Reusable accelerators'],
      ['Non-coding lifecycle work', 'spark', 'AI throughout'],
    ].map(([constraint, iconName, pillar]) => grid('1fr 56px 1fr', [node(constraint, '', 'warm compact'), arrow(), inode(iconName, pillar, '', 'tint compact')], 'pair')).join('')}
    <div class="strip">${chain([node('Inspect', '', 'compact'), node('Compare practices', '', 'compact'), node('Adapt', '', 'compact')])}${ret('Then inspect again', 3)}</div>`),

  teams: fig('One team with distributed expertise around one outcome', `
    <div class="boundary">${grid('1fr 230px 1fr', [
      `<div class="col">${node('Customer + domain', '', 'compact')}${node('Product + engineering', '', 'compact')}${node('Relevant specialists', '', 'compact')}</div>`,
      '<div class="orb"><strong>One jointly owned outcome</strong></div>',
      `<div class="col">${node('Decision owner', '', 'compact')}${node('Shared team duties', '', 'compact')}${node('Mentoring + pairing', '', 'compact')}</div>`,
    ])}</div>
    ${grid('1fr 230px 1fr', [
      `<div class="col reach"><i class="drop dashed"></i>${node('Support + escalation', '', 'ghost compact')}</div>`,
      '<span></span>',
      `<div class="col reach"><i class="drop dashed"></i>${node('Independent assurance', '', 'ghost compact')}</div>`,
    ])}`) + takeaway('Distributed expertise. Not separate queues.'),

  'team-example': fig('A dashboard request resolved by the crew', `
    <div class="cols4">
      <em>Trigger</em><span></span><em>Crew checks</em><span></span><em>Decision</em><span></span><em>Record</em>
      ${node('Dashboard request', '', 'ghost tall')}${arrow()}
      <div class="col">${node('Operator', '', 'compact')}${node('Domain expert', '', 'compact')}${node('Product owner', '', 'compact')}${node('Security / Responsible AI champion', '', 'ghost compact')}</div>${arrow()}
      ${node('Investigate shift handover', '', 'warm tall')}${arrow()}
      <div class="record"><strong>Decision record</strong><ul><li>Initial evidence</li><li>Customer co-owner</li><li>Decision needed</li><li>Open questions</li></ul></div>
    </div>`),

  'design-thinking': fig('Design Thinking spaces with the crew alongside', `
    ${band('Customer + expert crew alongside', 'purple', 'team')}
    ${chain([
      stackNode('search', 'Problem', 'Who needs what, and why?'),
      stackNode('layers', 'Solution', 'What could help? What to test?'),
      stackNode('code', 'Implementation', 'Does it work for people?'),
    ])}
    ${drops('1fr 44px 1fr 44px 1fr', [true, false, true, false, true])}
    ${band('Evidence links the spaces', 'tint')}
    ${ret('Feedback can reopen any decision', 3)}`) + takeaway('A request is not proof of value.'),

  'design-example': fig('From a dashboard request to compared options', `<div class="example">
    <div class="col wide">${node('Dashboard request', '', 'ghost compact')}${arrow('d')}${node('Investigate shift-handover knowledge', '', 'tint')}${arrow('d')}${node('Define user success', 'Proposed: find the right procedure; know when to escalate')}</div>
    ${arrow('r', 'arr-big')}
    <div class="col">${node('Compare options', '', 'purple compact')}<div class="quad">${['Test', 'Change', 'Investigate', 'Stop'].map(item => node(item, '', 'compact')).join('')}</div></div>
  </div>`),

  accelerators: fig('Reusable foundations beneath business-specific work', `<div class="cutaway">
    <div class="tip">${node('Business-specific work', 'Useful to this customer', 'warm')}</div>
    <div class="layers">${layer('Secure platform baseline', ['Infrastructure', 'Identity', 'Security', 'Observability'], 'purple')}${layer('Engineering baseline', ['Tests', 'CI/CD', 'Ownership', 'Guidance'])}</div>
    <div class="owner"><svg viewBox="0 0 28 100" preserveAspectRatio="none" aria-hidden="true"><path d="M4 2H20V98H4" vector-effect="non-scaling-stroke"/></svg>${node('Named owner maintains the foundation', '', 'ghost')}</div>
  </div>`) + takeaway('A starting point is not a finished or certified solution.'),

  'accelerator-example': fig('A changed increment on a reused foundation', `<div class="outline-box">
    <span class="tab">Still verify: access · deployment · operation · recovery</span>
    ${node('Changed: business-specific increment', '', 'warm wide')}
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

  'lifecycle-example': fig('Outputs carried through expert review', `<div class="cols7">
    <em class="span7">AI-assisted drafts</em>
    ${node('Evidence synthesis', '', 'compact')}${arrow()}${node('Acceptance criteria', '', 'compact')}${arrow()}${node('Increment + tests', '', 'compact')}${arrow()}${node('Operating guidance', '', 'compact')}
    ${['<i class="drop"></i>', '<span></span>', '<i class="drop"></i>', '<span></span>', '<i class="drop"></i>', '<span></span>', '<i class="drop"></i>'].join('')}
    <em class="span7">Expert review</em>
    ${[['Domain expert', 'checks meaning'], ['Product owner', 'checks value'], ['Engineer', 'checks behavior'], ['Operations', 'checks readiness']].map(([who, check], index) => `${index ? '<span></span>' : ''}${inode('check', who, check, 'tint')}`).join('')}
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
    ${band('One outcome — Named customer owner + sponsor', 'tint', 'target')}
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
