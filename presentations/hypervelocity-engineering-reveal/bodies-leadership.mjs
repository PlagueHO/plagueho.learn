/**
 * Leadership section slide bodies (slides 1 to 25).
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { leadershipBodies } from './bodies-leadership.mjs'.
 */
import {
  arrow, node, inode, chip, band, fig, takeaway, grid, chain, ret, icon, crack,
  HOP, lane, under, laneGroup, legend, loop, evidenceTable,
} from './diagrams.mjs';

const flow = [['Request', 1.1, 'work'], HOP, ['Implement', 3.4, 'impl'], HOP, ['Review', 1.3, 'work'],
  ['Wait', 0.9, 'wait'], ['Release', 1.1, 'work'], ['Feedback', 1.2, 'work']];
const flowWithAi = [['Request', 1.1, 'work'], HOP, ['Implement', 1.1, 'impl'], HOP, ['Review', 1.3, 'work'],
  ['Wait', 0.9, 'wait'], ['Release', 1.1, 'work'], ['Feedback', 1.2, 'work'], ['', 2.3, 'space']];
const flowSaved = [['Request', 1.1, 'work'], HOP, ['Implement', 1.1, 'fast'], ['Time saved', 2.3, 'gap'], HOP,
  ['Review', 1.3, 'work'], ['Wait', 0.9, 'wait'], ['Release', 1.1, 'work'], ['Feedback', 1.2, 'work']];

const meetingRoute = [['Question', 1.2, 'work'], ['Waits for the next planning ceremony', 3.6, 'wait'], ['Decision', 1.2, 'work']];
const directRoute = [['Question', 1.2, 'work'], ['Customer decision owner', 2.0, 'key', 'time + authority'],
  ['Decision', 1.2, 'work'], ['', 1.6, 'space']];

const lateAssurance = [['Start', 1.0, 'work'], ['Build', 3.4, 'impl'], ['Release', 1.6, 'work']];
const earlyAssurance = [['Start', 1.0, 'work'], ['Build', 3.4, 'impl'], ['Release', 1.6, 'check', 'Required review']];

function panel(iconName, caption, big, status, state, cls = '') {
  return `<div class="panel${cls ? ` ${cls}` : ''}">${icon(iconName)}<em>${caption}</em><strong>${big}</strong><b class="status ${state}">${icon(state === 'met' ? 'check' : 'question')}${status}</b></div>`;
}

function bar(columns, row, title, detail, cls = '') {
  return `<div class="bar${cls ? ` ${cls}` : ''}" style="grid-column:${columns};grid-row:${row}"><strong>${title}</strong><span>${detail}</span></div>`;
}

function stackNode(iconName, title, detail = '', cls = '') {
  return `<div class="node stack${cls ? ` ${cls}` : ''}">${icon(iconName)}<strong>${title}</strong>${detail ? `<span>${detail}</span>` : ''}</div>`;
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

const crackLabels = ['Handoffs', 'Waiting', 'Wrong value', 'Late feedback', 'Late assurance'];

const commitments = [
  ['team', 'Customer time', 'Participation + evidence'],
  ['person', 'Decision ownership', 'Crew + specialist + sponsor'],
  ['layers', 'Prepared foundations', 'Maintained + fit for purpose'],
  ['dashboard', 'Measured change', 'Value + quality + total cost'],
];

export const leadershipBodies = {
  hve: `<p class="cover-sub">When code moves faster,<br>what must change?</p>`,

  'delivery-eras': fig('Delivery eras, overlapping over time', `<div class="gantt">
    ${bar('1 / 8', 1, 'Packaged software', 'Planned releases', 'tint')}
    ${bar('3 / 14', 2, 'Cloud services', 'Continuous operation', 'tint')}
    ${bar('5 / 14', 3, 'Agile + DevOps', 'Shorter feedback; shared responsibility', 'tint')}
    ${bar('7 / 14', 4, 'Co-engineering', 'Customer learning + capability', 'purple')}
    ${bar('1 / 14', 5, 'Engineering fundamentals', '+ shared customer capability', 'ghost')}
  </div>${legend([], 'Overlapping eras, not to scale')}`) + takeaway('Keep the engineering discipline. Keep learning with customers.'),

  'agentic-cracks': fig('Agentic SDLC and Forward Deployed Engineering above a delivery process that starts to crack', `<div class="bigwords">
    <div class="bigword">${icon('spark')}<span>Agentic SDLC</span></div>
    <div class="bigword">${icon('team')}<span>Forward Deployed Engineering</span></div>
  </div>
  <div class="slab"><span>Delivery process</span></div>
  ${grid('repeat(5, 1fr)', crackLabels.map((label, i) => `<div class="crack-col">${crack(i)}<span class="mark warm">${label}</span></div>`), 'cracks')}
  ${legend([], 'General framing, not to scale')}`) + takeaway('New names do not fix the process. They expose it.'),

  handoffs: fig('Delivery flow with handoffs and required checks',
    lane(flow, { tall: true })
    + under(flow, [[1, 8, 'check', 'Required checks stay: security · quality · operations']])
    + legend(['work', 'hop', 'wait', 'check'])) + takeaway('Redesign coordination around the work. Keep necessary checks.'),

  'ai-implementation': fig('Delivery flow before and after AI-assisted coding',
    laneGroup('Before', lane(flow)) + laneGroup('With AI-assisted coding', lane(flowWithAi)) + legend([])) +
    takeaway('Some bounded tasks can change dramatically. The whole lifecycle has not disappeared.'),

  'outcome-waiting': fig('Delivery flow where only implementation time changes',
    laneGroup('Before', lane(flow))
    + laneGroup('After AI-assisted coding', lane(flowSaved), under(flowSaved, [[6, 4, 'warm', 'Unchanged: access · review queues · testing · documentation · operations']]))
    + legend(['work', 'hop', 'wait'])) + takeaway('The constraint moves. It does not disappear.'),

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
