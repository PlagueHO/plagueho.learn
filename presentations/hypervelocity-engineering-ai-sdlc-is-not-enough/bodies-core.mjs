/**
 * HVE-Core practitioner and demo slide bodies (slides 24 to 41, except the team pass).
 * Parameters: none. Each key is a slide id; each value is the slide body HTML.
 * Usage: import { coreBodies } from './bodies-core.mjs'.
 */
import {
  arrow, node, inode, chip, band, fig, takeaway, grid, chain, ret,
  loop, rpiChain, confidence,
} from './diagrams.mjs';
import { sources } from './sources.mjs';

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
  'deep-dive': '',

  'plugin-model': fig('Install the CLI plugin, then confirm discovery in a new session', `
    ${band('First: Copilot CLI + authorized GitHub Copilot access')}
    <div class="node tint practitioner-commands"><strong>Run in your terminal</strong>
      <pre><code>copilot plugin marketplace add microsoft/hve-core
copilot plugin install hve-core@hve-core</code></pre></div>
    ${chain([
      node('Open a new session', '<code>copilot</code> in your project', 'compact'),
      node('Find the entries', '<code>/agent</code> · DT Coach · RPI Agent', 'compact'),
      node('Browse skills', 'Type <code>/</code> · find <code>rpi-research</code>', 'tint compact'),
    ], 'small')}`)
    + takeaway('One route. CLI and VS Code. Instructions load by applyTo.'),

  rpi: fig('A bounded starter request followed by evidence, plan, changes, and review', `
    ${node('Select RPI Agent · illustrative starter request',
      'Use the agreed order-update criteria. Investigate gaps, plan one bounded change, and wait for approval before implementation.', 'tint practitioner-prompt')}
    ${rpiChain([
      ['Research', 'Evidence + gaps', 'Readiness'],
      ['Plan', 'Work + acceptance', 'Critique + approval'],
      ['Implement', 'Changes + checks', 'Approved scope'],
      ['Review', 'Results + gaps', 'Human decision'],
    ])}
    ${ret('Follow-up routes defects, decisions, evidence gaps, and residual work', 4)}`)
    + takeaway('Reuse adequate evidence. Not every task needs every phase.'),

  context: fig('Saved files carry reviewed knowledge into later sessions', `
    ${grid('1fr 1fr', [
      inode('search', 'Research', 'Sources · assumptions · unknowns', 'compact'),
      inode('document', 'Plan', 'Scope · criteria · decision owner', 'compact'),
      inode('code', 'Changes', 'What changed · checks run', 'compact'),
      inode('shield', 'Review', 'Findings · acceptance still open', 'compact'),
    ], 'practitioner-artifacts')}
    ${node('Resume from files, not memory', 'Read the saved plan and review. Summarize open decisions before proposing the next step.', 'tint practitioner-prompt')}`)
    + takeaway('Shared does not mean public. Check access, freshness, and ownership.'),

  toolkit: fig('Choose cross-role support by need, not by a full inventory', `
    ${mapRow(inode('search', 'Understand people', '', 'tint compact'), 'DT Coach · UX UI Designer')}
    ${mapRow(inode('shield', 'Assess risk', '', 'tint compact'), 'Security + RAI planners and reviewers')}
    ${mapRow(inode('document', 'Organize work', '', 'tint compact'), 'BRD / PRD · Azure DevOps / GitHub backlog')}
    ${mapRow(inode('dashboard', 'Analyze and reuse', '', 'tint compact'), 'Data Science and Engineering Coach · utilities')}`)
    + takeaway('AI tools for everyone. Reusable accelerators, not only coding.'),

  'dt-coach': fig('Illustrative DT and UX requests use supplied order-update evidence', `
    <div class="duo practitioner-prompts">
      ${node('Select DT Coach',
        'Use the Friday-to-Monday case. Frame the customer problem. Prepare questions for the customer and carrier expert. Keep gaps visible.', 'tint practitioner-prompt')}
      ${node('Select UX UI Designer',
        'Use our reviewed framing artifact to map the current order-update journey. Mark stale-date and recovery gaps. Save it; do not publish.', 'practitioner-prompt')}
    </div>
    ${band('Co-work · email replies · supplied documents · permitted WorkIQ transcripts')}
    ${ret('New evidence can change the framing, journey, or next question', 2)}`)
    + takeaway('People supply evidence. Agents help organize it.'),

  'handoff-contract': fig('Illustrative requirements and UX evidence enter a reviewed DT handoff', `
    <div class="duo">
      <div class="col">
        ${node('BRD Builder · why invest?', 'Business objective: a trustworthy revised date.', 'compact')}
        ${node('PRD Builder · what must work?', 'Proposed criterion: changed date + clear next action.', 'compact')}
        ${node('UX artifact · what is still missing?', 'Stale date → recovery state → next action.', 'tint compact')}
      </div>
      <div class="col">
        ${node('Reviewed DT handoff', 'Source: supplied teaching case<br>Assumed: update path<br>Unknown: confirmed owner', 'warm')}
        ${node('Target: rpi-research', 'Carry evidence, constraints, and gaps.', 'tint compact')}
      </div>
    </div>
    ${confidence()}`)
    + takeaway('Use the documents you need. A handoff is not approval to build.'),

  review: fig('Security and Responsible AI support planning and review throughout the work', `
    <div class="duo practitioner-prompts">
      ${node('Security Planner → Reviewer',
        'Input: update path + access rules<br>Plan: threats + controls + backlog<br>Review: scoped findings + evidence<br>Decision: security owner', 'practitioner-prompt')}
      ${node('RAI Planner → Reviewer',
        'When the product uses AI<br>Input: purpose + affected people<br>Output: risks + controls + evidence gaps<br>Decision: qualified human review', 'tint practitioner-prompt')}
    </div>
    ${chain([
      node('Start early', 'Revisit changed scope', 'compact'),
      node('Run checks', 'Record failed, skipped, and blocked', 'compact'),
      node('Keep expert judgment', 'No automatic acceptance', 'warm compact'),
    ], 'small')}`)
    + takeaway('Planning, tests, specialist review, and acceptance do different jobs.'),

  'practitioner-workflow': fig('One illustrative order-update route with human decisions and feedback', `
    ${band('Outcome: a trustworthy revised date + a clear next action')}
    ${chain([
      node('Evidence + DT/UX', 'Customer + carrier expert', 'compact'),
      node('Requirements', 'BRD / PRD where useful', 'compact'),
      node('Reviewed handoff', 'DT → rpi-research', 'tint compact'),
    ], 'small')}
    ${chain([
      node('RPI', 'Approve one bounded change', 'compact'),
      node('Checks + assurance', 'Specialists throughout', 'compact'),
      node('Acceptance', 'Customer / product owner', 'warm compact'),
    ], 'small')}
    ${ret('Feedback can reopen the problem, options, or implementation', 3)}`)
    + takeaway('One example route. Passing tests do not prove customer value.'),

  customize: fig('Keep organizational knowledge beside the maintained upstream plugin', `
    <div class="duo">
      ${node('Upstream HVE-Core plugin', 'Agents · skills · instructions<br>OWASP guidance and shared methods', 'tint')}
      ${node('Your reviewed knowledge', '<code>.github/copilot-instructions.md</code><br>Path-specific instructions · domain skills<br>Example: your security requirements')}
    </div>
    ${chain([
      node('Scope the context', 'Relevant, access-controlled sources', 'compact'),
      node('Review and check', 'Named expert owner', 'compact'),
      node('Update or retire', 'Keep the shared knowledge useful', 'warm compact'),
    ], 'small')}`)
    + takeaway('Do not edit installed files. Keep workflows that already work.'),

  'maintain-toolkit': fig('Refresh the catalog and update the installed plugin as separate actions', `
    <div class="node tint practitioner-commands"><strong>Two separate update actions</strong>
      <pre><code>copilot plugin marketplace update hve-core
copilot plugin update hve-core@hve-core</code></pre></div>
    ${chain([
      node('Review changes', 'Marketplace tracks main', 'compact'),
      node('Run local checks', 'Owners review compatibility', 'compact'),
      node('Share improvements', 'Contribute suitable fixes upstream', 'compact'),
    ], 'small')}
    ${ret('Update sources, owners, and checks for local assets too', 3)}`)
    + takeaway('Rapidly evolving patterns, not a stable production dependency.'),

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
      '<a href="#/team-pass">Team pass + resources</a>',
      `<a href="${sources.core[1]}">HVE-Core documentation</a>`,
      '<button type="button" data-action="pause">Questions</button>',
    ]),
};
