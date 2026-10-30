/**
 * Optional HVE-Core and demo slide bodies (slides 26 to 40).
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { coreBodies } from './bodies-core.mjs'.
 */
import {
  arrow, node, inode, chip, band, fig, takeaway, grid, chain, ret, icon,
  loop, rpiChain, evidenceTable, confidence,
} from './diagrams.mjs';
import { sources } from './sources.mjs';

function stackNode(iconName, title, detail = '', cls = '') {
  return `<div class="node stack${cls ? ` ${cls}` : ''}">${icon(iconName)}<strong>${title}</strong>${detail ? `<span>${detail}</span>` : ''}</div>`;
}

function routes(items) {
  return `<nav class="routes">${items.join('')}</nav>`;
}

function mapRow(left, right, rightCls = '') {
  return grid('1fr 56px 1.3fr', [left, arrow(), right.startsWith('<') ? right : node(right, '', `${rightCls} compact`)], 'pair');
}

const stops = [
  ['Install', 'HVE-Core ready'],
  ['DT Coach', 'Problem + handoff'],
  ['PRD', 'Short · no BRD'],
  ['RPI', 'One reviewed change'],
];

export const coreBodies = {
  'deep-dive': fig('Human responsibility with optional process support', `
    <div class="band tint tall"><span><strong>Human responsibility remains</strong>judgment · decisions · accountability</span></div>
    <div class="support open"><strong>Optional process support: HVE-Core</strong>
      <div class="chain-4">${['Agents', 'Skills', 'Instructions', 'Workflows'].map(item => node(item, '', 'compact')).join('')}</div></div>`)
    + routes(['<a href="#/demo-install">Skip to demos →</a>']),

  toolkit: fig('Each practice paired with a repeatable mechanism', `
    ${mapRow(inode('team', 'Shared crew', '', 'tint compact'), 'Artifacts + decision checkpoints')}
    ${mapRow(inode('search', 'Value validation', '', 'tint compact'), 'DT Coach + reviewed evidence')}
    ${mapRow(inode('layers', 'Prepared foundations', '', 'tint compact'), node('Maintained solution accelerators', 'Separate · not HVE-Core', 'ghost compact'))}
    ${mapRow(inode('spark', 'Lifecycle support', '', 'tint compact'), 'RPI: Research · Plan · Implement · Review')}
    <div class="strip">${chain([node('Capability', '', 'compact'), node('Artifact', '', 'compact'), node('Reviewer', '', 'compact'), node('Decision', '', 'compact')], 'small')}</div>`),

  context: fig('Repository evidence feeding a bounded task context', `
    ${chain([
      node('Repository', 'Requirements · architecture · standards · decisions'),
      `<div class="node purple"><strong>Bounded task context</strong><div class="chips">${['Access', 'Freshness', 'Assumptions'].map(item => chip(item, 'light')).join('')}</div></div>`,
      node('Reviewed artifact', 'Acceptance evidence · gaps · next decision', 'tint'),
    ])}
    ${ret('Reviewed output returns to the evidence', 3)}`) + takeaway('Check freshness, access, and ownership.'),

  'dt-coach': fig('Evidence organized by DT Coach and decided by people', `
    ${chain([
      node('User evidence', 'Observation + interviews'),
      node('DT Coach', 'Scope + plan + synthesize', 'purple'),
      node('Reviewed framing', 'Problem + open questions', 'tint'),
      node('Customer decision', '', 'warm'),
    ])}
    ${ret('Reopen the framing if evidence changes', 4)}`) + takeaway('An agent organizes evidence. It does not replace people.'),

  'handoff-contract': fig('Design Thinking exits feeding rpi-research', `
    <div class="handoff">
      <div class="col">${node('Problem space', '', 'compact')}${node('Solution space', '', 'compact')}${node('Implementation space', '', 'compact')}</div>
      <div class="col">${arrow()}${arrow()}${arrow()}</div>
      <div class="col">${node('Problem Statement Complete', 'Methods 1–3 selected <b class="tag">Used in demos</b>', 'purple compact')}${node('Concept Validated', 'Methods 4–6', 'tint compact')}${node('Implementation Spec Ready', 'Methods 7–9', 'tint compact')}</div>
      <svg class="gutter" viewBox="0 0 100 246" aria-hidden="true"><path d="M0 37C50 37 50 123 100 123M0 123H100M0 209C50 209 50 123 100 123M90 115L100 123L90 131"/></svg>
      <div class="col mid"><div class="node code"><strong><code>rpi-research</code></strong></div></div>
    </div>
    ${confidence()}
    ${ret('Return to DT when evidence changes the framing', 5)}`),

  rpi: fig('Research, plan, implement, and review with a decision at each stage', `
    ${rpiChain([
      ['Research', 'Evidence + gaps', 'Readiness'],
      ['Plan', 'Work + acceptance', 'Critique + approval'],
      ['Implement', 'Changes + checks', 'Approved scope'],
      ['Review', 'Results + follow-up', 'Acceptance'],
    ])}
    ${ret('Customer feedback can reopen the framing or plan', 4)}`) + takeaway('Each stage produces an artifact and needs a decision.'),

  review: fig('Uncertainty selects controls, then a human decides', `
    ${chain([
      node('Uncertainty', 'Identify gaps + risk', 'warm'),
      `<div class="node purple"><strong>Controls</strong><div class="chips">${['Deterministic checks', 'Specialist review'].map(item => chip(item, 'light')).join('')}</div></div>`,
      node('Decision', 'Human owner + evidence', 'tint'),
    ])}
    ${ret('Failed, skipped, and blocked checks stay visible', 3)}`) + takeaway('Requirements, tests, review, and acceptance have different jobs.'),

  cost: fig('Baseline and experiment evidence for total cost', evidenceTable(['Outcome', 'Quality', 'Waiting', 'Rework', 'Human time', 'AI cost']))
    + takeaway('Include time managing tool limits. Do not use adoption as the result.'),

  'plugin-model': fig('Install, verify, and maintain the plugin separately', `<div class="cols5">
    ${node('Marketplace', 'Register + browse <b class="tag">Tracks main</b>')}${arrow()}${node('Plugin', 'Install + update')}${arrow()}${node('Capabilities', 'Verify discovery', 'tint')}
    <div class="maint span3"><em>Maintain separately</em>${chip('Refresh marketplace')}<b aria-hidden="true">≠</b>${chip('Update plugin')}</div><span></span>
    <div class="maint">${chip('Reference instructions explicitly')}</div>
  </div>`) + takeaway('Installation is a starting point, not a readiness check.'),

  'demo-route': fig('Demo route from problem evidence to the next decision', `
    <div class="route">${stops.map(([title, detail], index) => `<div class="stop"><b>${index + 1}</b><strong>${title}</strong><span>${detail}</span></div>`).join('')}</div>
    ${ret('Return when evidence changes', 4)}`) + takeaway('One small change on a mocked app. Return when evidence changes.'),

  'demo-install': fig('Marketplace registration, installation, and confirmation', `
    <div class="command"><span class="live">Live demo</span><code>/plugin</code><span>Recommended route, even for VS Code users</span></div>
    ${chain([
      node('Register', '<code>microsoft/hve-core</code>'),
      node('Install', '<code>hve-core@hve-core</code>'),
      node('Confirm', 'DT Coach · PRD Builder · RPI', 'tint'),
    ])}`) + takeaway('Show what loads. Explain what does not.'),

  'demo-discovery': fig('A coin-flip decision reframed as an accountability question', `<div class="duo">
    <div class="col"><div class="quote">“The agent picks a city. No reason given.”</div>${arrow('d')}${node('Who can defend that choice?', '', 'warm')}</div>
    <div class="col"><em>DT Coach methods 1–3</em>${['Scope Conversations', 'Design Research', 'Input Synthesis'].map((item, index) => `<div class="node row compact"><b class="num">${index + 1}</b><div><strong>${item}</strong></div></div>`).join('')}</div>
  </div>`) + takeaway('Two rounds. Fictional stakeholder notes, not customer research.'),

  'demo-handoff': fig('Evidence and confidence crossing the handoff into a short PRD', `
    ${chain([
      node('DT handoff', 'Problem Statement Complete'),
      node('Human review', 'Gaps marked', 'purple'),
      node('PRD Builder', 'No BRD · short Q&A', 'tint'),
      node('PRD', 'Scope · success · exclusions'),
    ])}
    ${confidence()}`) + takeaway('Evidence and confidence cross the handoff together.'),

  'demo-rpi': fig('One bounded phase through research, plan, implement, and review', rpiChain([
    ['Research', 'Existing code + gaps', 'Evidence'],
    ['Plan', 'Phases + decisions', 'Approved scope'],
    ['Implement', 'Phase 1 only', 'Tests + diff'],
    ['Review', 'Findings', 'Phase 2 still open', 'flag'],
  ], { clear: true })) + takeaway('Completed execution ≠ accepted work.'),

  recap: fig('The loop with what the demo established and what stays open', `<div class="split-loop recap">
    ${loop({ scale: 0.85 })}
    <div class="col">${inode('check', 'Established evidence', 'Only what the run showed', 'tint')}${inode('question', 'Open decisions', 'Validation · adoption · readiness', 'warm')}${inode('flag', 'Next increment', 'Confirm or override gate')}</div>
  </div>`)
    + routes([
      '<a href="#/leadership-close">Leadership close + resources</a>',
      `<a href="${sources.core[1]}">HVE-Core documentation</a>`,
      '<button type="button" data-action="pause">Questions</button>',
    ]),
};
