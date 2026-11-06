/**
 * Check the presentation structure, content, visual direction, build, and server.
 * Parameters: none. Build the deck first.
 * Usage: npm run build && npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { once } from 'node:events';
import { slides, sources, chapters, renderSlides, escapeHtml } from './deck.mjs';
import { qrMatrix, qrSvg } from './qr.mjs';
import { createPreviewServer } from './serve.mjs';
import { normalizeRect, toSlidePoint } from './annotations.mjs';
import { trackRelativeWindowPosition } from './speaker-window.mjs';
import { waveBackground } from './waves.mjs';
import { mergedSlideHash, setupCadence } from './cadence.mjs';
import { amplificationFrame, setupAmplification } from './amplification.mjs';
import { readinessFrame, setupReadiness } from './readiness.mjs';
import { setupOperatingModel } from './operating-model.mjs';

const text = html => html.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').trim();
const byId = Object.fromEntries(slides.map(slide => [slide.id, slide]));

test('41 slides split into 27 leadership minutes and 34.5 deeper minutes', () => {
  assert.equal(slides.length, 41);
  assert.equal(new Set(slides.map(slide => slide.id)).size, 41);
  for (const [part, count, minutes] of [['leadership', 23, 27], ['deep-dive', 13, 34.5], ['demos', 5]]) {
    const section = slides.filter(slide => slide.part === part);
    assert.equal(section.length, count);
    if (part !== 'demos') assert.equal(section.reduce((sum, item) => sum + item.minutes, 0), minutes);
    else assert.ok(section.every(item => item.minutes === undefined));
  }
  assert.equal(slides[22].id, 'hve-core-open');
  assert.equal(slides[23].id, 'deep-dive');
  assert.equal(slides[34].id, 'team-pass');
  assert.equal(slides[35].id, 'demo-route');
  assert.equal(slides[36].id, 'demo-install');
  assert.equal(slides[40].id, 'recap');
  assert.doesNotMatch(renderSlides(), /\u2014|&mdash;|&#(?:8212|x2014);/i);
});

test('slide order follows the approved narrative and pillar examples', () => {
  assert.deepEqual(slides.map(item => item.id), [
    'hve', 'delivery-eras', 'outcomes-question', 'agentic-cracks', 'handoffs', 'dashboard-request',
    'feedback-window', 'production-early', 'outcomes-response', 'hve-model', 'constraints-pillars', 'teams', 'team-example',
    'design-thinking', 'design-example', 'accelerators', 'accelerator-example', 'lifecycle-ai',
    'lifecycle-example', 'outcomes-action', 'framework-toolkit', 'team-support', 'hve-core-open',
    'deep-dive', 'toolkit', 'context', 'dt-coach',
    'handoff-contract', 'rpi', 'review', 'cost', 'plugin-model', 'adoption-commitments', 'outcome-measures',
    'team-pass', 'demo-route', 'demo-install',
    'demo-discovery', 'demo-handoff', 'demo-rpi', 'recap',
  ]);
  assert.equal(byId.hve.title, 'Hypervelocity Engineering<em>Why adding AI to the SDLC is not enough</em>');
  assert.equal((byId.hve.title.match(/<em>/g) ?? []).length, 1);
  assert.match(text(byId.hve.body), /Daniel Scott-Raynsford/);
  assert.match(byId.hve.body, /<span>Sr\. Partner Solution Architect • AI &amp; Apps • Microsoft EPS<\/span>/);
  assert.doesNotMatch(byId.hve.body, /cover-sub|cover-scope/);
  assert.match(byId.hve.notes, /when building becomes faster than deciding/);
  assert.match(text(byId['dashboard-request'].body), /Reduce order calls\.\s+Build an AI chatbot/);
  assert.match(text(byId['team-example'].body), /Decide sooner/);
  assert.match(text(byId['design-example'].body), /Change or stop options that do not help/);
  assert.match(text(byId['accelerator-example'].body), /Show the way[\s\S]*Write it down[\s\S]*Review and own[\s\S]*Teams adapt it[\s\S]*Update or retire/);
  assert.match(text(byId['lifecycle-ai'].body), /Discover[\s\S]*Operate[\s\S]*Security and review at every stage, not at the end[\s\S]*AI assists every stage, not only coding/);
  for (const role of ['Business', 'Design', 'Architecture', 'Assurance', 'Engineering', 'Data', 'Operations']) {
    assert.ok(text(byId['lifecycle-ai'].body).includes(role));
  }
  assert.match(text(byId['lifecycle-ai'].body), /Experts stay accountable and set review to match the risk/);
  assert.match(text(byId['lifecycle-ai'].body), /More speed needs more direction, from one shared baseline/);
  assert.doesNotMatch(text(byId['lifecycle-ai'].body), /AI-powered product|Responsible AI/);
  assert.match(byId['lifecycle-ai'].notes, /AI-assisted delivery does not require an AI-powered product/);
  assert.match(byId['lifecycle-ai'].notes, /Shift them as far left as you can and run them continuously/);
});

test('pillar details explain distinct practices while unreviewed examples retain the order-status case', async () => {
  const teams = byId.teams;
  assert.match(teams.body, /<div class="band purple"><span>Continuous alignment<\/span><\/div>/);
  assert.doesNotMatch(teams.body, /Support \+ escalation|Independent assurance|class="drop/);
  assert.match(teams.notes, /center[\s\S]*left side[\s\S]*right side[\s\S]*long foundation: Continuous alignment/);
  assert.match(teams.notes, /outcome, priorities, assumptions, and decisions/);
  assert.match(teams.notes, /Required independent review and separation of duties stay/);
  assert.ok(teams.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  const design = byId['design-thinking'];
  assert.equal(design.minutes, 1.5);
  assert.equal(design.title, 'Pillar 2: Design Thinking. <em>Validate value throughout.</em>');
  for (const phrase of ['Customer evidence can change any decision.', 'Explore', 'Focus', 'Test in real use',
    'Problem', 'Are we solving the right problem?', 'Solution', 'Does this idea help people?',
    'Implementation', 'Does it work in real use?',
    'Use AI speed to test assumptions, not build the wrong thing faster.',
    'Lower coding barriers do not replace customer and domain expertise.']) {
    assert.ok(design.body.includes(phrase), phrase);
  }
  assert.match(design.body,
    /aria-label="Design Thinking: customer evidence can reopen the Problem, Solution, and Implementation spaces"/);
  assert.match(design.body,
    /src="\.\/images\/design-thinking-customer-evidence\.png" width="1536" height="1024"[^>]+alt="[^"]+"/);
  assert.doesNotMatch(design.body, /fragment|Desirability|Viability|10x|50x|two-way|dt-space|method-note/);
  const designArt = await readFile(new URL('./images/design-thinking-customer-evidence.png', import.meta.url));
  assert.deepEqual(designArt.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(designArt.toString('ascii', 12, 16), 'IHDR');
  assert.equal(designArt.readUInt32BE(16), 1536);
  assert.equal(designArt.readUInt32BE(20), 1024);
  assert.deepEqual(await readFile(new URL('./dist/images/design-thinking-customer-evidence.png', import.meta.url)),
    designArt);
  assert.match(design.notes, /first diamond[\s\S]*second diamond[\s\S]*implementation[\s\S]*forward arrows/);
  assert.match(design.notes, /not three sign-off gates/);
  assert.match(design.notes, /Use faster coding for small prototypes and experiments/);
  assert.match(design.notes, /customers and domain experts/);
  assert.match(design.notes, /chatbot[\s\S]*Friday[\s\S]*Monday[\s\S]*trustworthy revised date and clear next action/);
  assert.match(design.notes, /Leaders must provide customer access, expert time, and decision authority/);
  assert.match(design.notes, /10x-50x[\s\S]*hypothetical illustration, not a measured result/);
  assert.match(design.notes, /not the Design Council's four-phase Double Diamond/);
  assert.match(design.notes, /Technical checks and required assurance still apply/);
  assert.ok(design.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  assert.ok(design.sources.includes('designcouncil'));
  const team = byId['team-example'];
  assert.equal(team.title, 'Expertise stays.<br><em>Handoffs change.</em>');
  assert.equal(team.minutes, 1.5);
  assert.equal((team.body.match(/<li>/g) ?? []).length, 3);
  for (const phrase of ['My part is done.', 'Our outcome works.', 'Decide sooner', 'Ask experts directly.',
    'Check assumptions together.', 'Build alignment and buy-in', 'Share context and decisions.',
    'Build agreement as you work.', 'Adjust continuously', 'not after a long delivery cycle.',
    'Keep the expertise and required review. Shorten the feedback loop.']) {
    assert.ok(text(team.body).includes(phrase), phrase);
  }
  assert.doesNotMatch(team.body, /Friday|Monday|A useful customer outcome|fragment/);
  assert.match(team.body, /aria-label="Why close teamwork helps"/);
  for (const [name, width, height] of [['my-part-is-done', 1536, 1024], ['shared-goal', 1024, 1024]]) {
    assert.match(team.body, new RegExp(
      `src="\\./images/${name}\\.png" width="${width}" height="${height}"[^>]+alt="[^"]+"`));
    const asset = await readFile(new URL(`./images/${name}.png`, import.meta.url));
    assert.deepEqual(asset.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    assert.equal(asset.toString('ascii', 12, 16), 'IHDR');
    assert.equal(asset.readUInt32BE(16), width);
    assert.equal(asset.readUInt32BE(20), height);
    assert.deepEqual(await readFile(new URL(`./dist/images/${name}.png`, import.meta.url)), asset);
  }
  assert.match(team.notes, /small multidisciplinary team/);
  assert.match(team.notes, /not measured customer evidence/);
  assert.match(team.notes, /Required independent review and separation of duties stay/);
  assert.ok(team.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  const value = byId['design-example'];
  assert.equal(value.title, 'Validate value,<br><em>not just delivery.</em>');
  assert.equal(value.minutes, 1.5);
  for (const phrase of ['Build an AI chatbot.', "Test the option against the customer's task:",
    'a trustworthy revised date and a clear next action.',
    'Test value early. Change or stop options that do not help.',
    'Faster AI coding can mean more rework when the idea is wrong.']) {
    assert.ok(text(value.body).includes(phrase), phrase);
  }
  assert.equal((value.body.match(/<p class="value-principle">/g) ?? []).length, 1);
  assert.equal((value.body.match(/class="takeaway"/g) ?? []).length, 1);
  assert.match(value.body, /<svg class="value-pencil"[^>]+aria-hidden="true" focusable="false"/);
  assert.doesNotMatch(value.body,
    /Friday|Monday|fragment|value-hypothesis|value-decision|value-test|promise to ship|Validation must/);
  assert.doesNotMatch(value.notes, /Friday|Monday/);
  assert.match(value.notes, /No user tests have occurred here/);
  assert.match(value.notes, /named customer or product decision owner makes and records the decision/);
  assert.match(value.notes, /Stop an unsuitable option, not responsibility for the outcome/);
  assert.match(value.notes, /conditional risk, not a measured productivity or cost claim/);
  assert.ok(value.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  assert.ok(!value.sources.includes('tutorial'));
  const accelerators = byId.accelerators;
  assert.equal(accelerators.title, 'Pillar 3: Reusable accelerators.<br><em>Broader capability for every team.</em>');
  assert.equal(accelerators.minutes, 1.5);
  for (const phrase of ['AI agents', 'Agent Skills', 'Tools', 'Organizational', 'knowledge and guidance',
    'Security', 'SRE / Operations', 'UX design', 'Architecture', 'Technical programs',
    'Business programs', 'Data science', 'Engineering', 'Contributor onboarding',
    'Cross-role utilities', 'Product management', 'Other capabilities', 'Agentic capabilities',
    'One small team', 'People stay accountable.', 'Give every team access to reusable expertise.',
    'Build, collect, share, and govern capabilities teams can draw on.']) {
    assert.ok(text(accelerators.body).includes(phrase), phrase);
  }
  const capabilityList = accelerators.body.match(/<ul class="accelerator-capabilities"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(capabilityList);
  assert.equal((capabilityList.match(/<li class=/g) ?? []).length, 12);
  assert.equal((capabilityList.match(/<svg class="ico"/g) ?? []).length, 12);
  assert.equal((capabilityList.match(/aria-hidden="true" focusable="false"/g) ?? []).length, 12);
  const librarySymbols = [...capabilityList.matchAll(/data-capability="([^"]+)"/g)].map(match => match[1]);
  assert.equal(new Set(librarySymbols).size, 12);
  assert.match(accelerators.body, /aria-labelledby="accelerator-library-title"/);
  assert.match(accelerators.body, /<h3 id="accelerator-library-title">Agentic capabilities<\/h3>/);
  const teamGroup = accelerators.body.match(/<div class="accelerator-team"[^>]*>([\s\S]*?)<\/div>/)?.[1];
  assert.ok(teamGroup);
  const teamIcons = teamGroup.match(/<ul class="accelerator-team-icons"[^>]*>([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(teamIcons);
  const teamSymbols = [...teamIcons.matchAll(/data-capability="([^"]+)"/g)].map(match => match[1]);
  assert.deepEqual(teamSymbols, ['shield', 'pencil', 'layers', 'dashboard', 'target']);
  assert.ok(teamSymbols.every(symbol => librarySymbols.includes(symbol)));
  assert.equal((teamIcons.match(/role="img" aria-label="[^"]+ capability"/g) ?? []).length, 5);
  assert.match(teamGroup, /class="accelerator-team-art" src="\.\/images\/team-with-ai-capabilities\.png"/);
  assert.match(teamGroup, /<img[^>]+alt="[^"]+"/);
  assert.doesNotMatch(text(teamGroup), /Security|Data science/);
  assert.match(accelerators.body, /class="accelerator-arrow"[^>]+aria-hidden="true" focusable="false"/);
  assert.doesNotMatch(accelerators.body, /Examples of capabilities|accelerator-team-note|accelerator-roles/);
  assert.match(accelerators.body, /class="accelerator-book"[^>]+aria-hidden="true" focusable="false"/);
  const acceleratorArt = await readFile(new URL('./images/team-with-ai-capabilities.png', import.meta.url));
  assert.deepEqual(acceleratorArt.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
  assert.equal(acceleratorArt.readUInt32BE(16), 1536);
  assert.equal(acceleratorArt.readUInt32BE(20), 1024);
  assert.deepEqual(await readFile(new URL('./dist/images/team-with-ai-capabilities.png', import.meta.url)),
    acceleratorArt);
  assert.doesNotMatch(accelerators.body, /\bFund\b|cutaway|Secure platform baseline|Engineering baseline|fragment/);
  assert.match(accelerators.notes, /build, collect, share, and govern/);
  assert.match(accelerators.notes, /Utility is a shared capability, not a job/);
  assert.match(accelerators.notes, /Coverage varies by role and lifecycle stage/);
  assert.match(accelerators.notes, /required independent assurance/);
  assert.match(accelerators.notes, /A team may have one person or several, with any mix of disciplines/);
  assert.match(accelerators.notes, /not extra team members/);
  assert.match(accelerators.notes, /They do not make every person an expert or remove specialist review/);
  assert.match(accelerators.notes, /Five matching icons form an arc above the supplied people image/);
  assert.doesNotMatch(accelerators.notes, /HVE-Core is not in this diagram/);
  assert.ok(accelerators.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  assert.ok(accelerators.sources.includes('core'));
  assert.ok(accelerators.sources.includes('guide'));
  assert.ok(accelerators.sources.includes('roles'));
  const reuse = byId['accelerator-example'];
  assert.equal(reuse.title.replace(/<[^>]+>/g, ''),
    'Pillar 3: Reusable accelerators.Reuse expertise, not just infrastructure.');
  assert.equal(reuse.minutes, 1.5);
  assert.ok(!reuse.sources.includes('tutorial'));
  assert.equal((reuse.body.match(/<li class="tone-/g) ?? []).length, 5);
  assert.equal((reuse.body.match(/class="reuse-pin"[^>]+aria-hidden="true"/g) ?? []).length, 5);
  assert.match(reuse.body, /<figure class="reuse-scene"\s+aria-label="[^"]+"/);
  assert.match(text(reuse.body), /Contribute improvements back/);
  assert.doesNotMatch(text(reuse.body), /Lessons return/);
  assert.match(text(reuse.body), /Collate, curate, govern, and share expert practice\./);
  assert.match(text(reuse.body), /One example process, not a prescription\. Reuse does not replace review\./);
  assert.doesNotMatch(`${reuse.body} ${reuse.notes}`, /Friday|Monday|carrier integration|outline-box|dashed|fragment|completed|certified by/i);
  assert.match(reuse.notes, /Reusable infrastructure[\s\S]*necessary/);
  assert.match(reuse.notes, /agent, skill, instruction, or check/);
  assert.match(reuse.notes, /named owner and checks that must pass/);
  assert.match(reuse.notes, /this is an example, not a prescription/);
  assert.match(reuse.notes, /collate, curate, govern, and share its expertise/);
  assert.match(reuse.notes, /Teams contribute improvements back to the owner/);
  assert.match(reuse.notes, /It does not certify output or replace review/);
  assert.match(reuse.notes, /required independent assurance/);
  assert.ok(reuse.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
  const lifecycleExample = byId['lifecycle-example'];
  assert.equal(lifecycleExample.title.replace(/<[^>]+>/g, ''), 'Give AI context, checks,and expert judgment.');
  assert.equal(lifecycleExample.minutes, 1.5);
  assert.ok(!lifecycleExample.sources.includes('tutorial'));
  assert.match(lifecycleExample.body, /<figure class="context-scene"\s+aria-label="[^"]+"/);
  assert.equal((lifecycleExample.body.match(/<li class="tone-/g) ?? []).length, 4);
  assert.equal((lifecycleExample.body.match(/class="context-badge"[^>]+aria-hidden="true"/g) ?? []).length, 4);
  assert.equal((lifecycleExample.body.match(/<path class="context-core /g) ?? []).length, 2);
  assert.match(text(lifecycleExample.body), /Same request\s+Add authentication to the checkout flow/);
  assert.match(text(lifecycleExample.body), /Guesses that look informed/);
  assert.match(text(lifecycleExample.body), /Looks right\.\s+May fail later\./);
  for (const gate of ['Relevant context', 'Recorded decisions', 'Executable checks', 'Expert judgment']) {
    assert.ok(text(lifecycleExample.body).includes(gate));
  }
  assert.match(text(lifecycleExample.body), /Checked against your rules/);
  assert.match(text(lifecycleExample.body), /The request is the same\. The inputs change the work\.\s+Experts still judge whether the result is right\./);
  assert.doesNotMatch(`${lifecycleExample.title} ${lifecycleExample.body} ${lifecycleExample.notes}`,
    /Friday|Monday|dashboard|shift.handov|plant|voice interface|dashed|fragment|certified|—/i);
  assert.match(lifecycleExample.notes, /add authentication to the checkout flow/);
  assert.match(lifecycleExample.notes, /guess that looks informed/);
  assert.match(lifecycleExample.notes, /Relevant context[\s\S]*Recorded decisions[\s\S]*Executable checks/);
  assert.match(lifecycleExample.notes, /kept in files, not in an old chat/);
  assert.match(lifecycleExample.notes, /A passing check is evidence for the rule it tests\. It does not prove business value/);
  assert.match(lifecycleExample.notes, /Review any model summary before it becomes a recorded decision/);
  assert.match(lifecycleExample.notes, /They do not guarantee correct or secure output/);
  assert.match(lifecycleExample.notes, /Required independent assurance still applies/);
  assert.match(lifecycleExample.notes, /Add Responsible AI review when the solution itself uses AI/);
  assert.ok(lifecycleExample.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
});

test('slide 21 gives one direct comparison of the framework and the toolkit', () => {
  const slide = byId['framework-toolkit'];
  assert.equal(slides[20].id, 'framework-toolkit');
  assert.equal(slide.title.replace(/<[^>]+>/g, ''), 'HVE is the framework.HVE-Core is the toolkit.');
  assert.equal(slide.minutes, 1);
  assert.ok(slide.sources.includes('core'));
  assert.match(slide.body, /<figure class="framework-scene"\s+aria-label="[^"]+"/);
  assert.equal((slide.body.match(/<article class="framework-panel tone-/g) ?? []).length, 2);
  assert.equal((slide.body.match(/<li class="framework-row/g) ?? []).length, 8);
  assert.equal((slide.body.match(/class="framework-chip" aria-hidden="true"/g) ?? []).length, 8);
  assert.equal((slide.body.match(/<div class="framework-loop" aria-hidden="true">/g) ?? []).length, 1);
  const content = text(slide.body);
  assert.match(content, /Principles and methods\s+Endures/);
  assert.match(content, /Enabling technology\s+Evolves rapidly/);
  assert.match(content, /1\s+Multidisciplinary teams[\s\S]*2\s+Design Thinking[\s\S]*3\s+Reusable accelerators[\s\S]*4\s+AI tooling/);
  assert.match(content, /HVE-Core\s+Toolkit\s+Agents, skills, instructions[\s\S]*AI assistants[\s\S]*AI models[\s\S]*Automated checks/);
  assert.match(content, /Tools help\s+apply the\s+principles/);
  assert.match(content, /Principles endure\. Technology evolves\.\s+Choose tools that help\. Keep the principles when tools change\./);
  assert.doesNotMatch(`${slide.title} ${slide.body} ${slide.notes}`, /dashed|certified|guarantee[sd]?\s+(results|savings)|—/i);
  assert.match(slide.notes, /HVE is the framework\./);
  assert.match(slide.notes, /HVE-Core is the toolkit\./);
  assert.match(slide.notes, /one part of a wider stack of AI tools and models/);
  assert.match(slide.notes, /The toolkit helps apply the framework\. It does not replace it\./);
  assert.match(slide.notes, /HVE-Core is optional and replaceable/);
  assert.match(slide.notes, /does not supply sponsorship, customer time, authority, or review capacity/);
  assert.match(slide.notes, /does not replace expert judgment or required independent assurance/);
  assert.ok(slide.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
});

test('slide 22 shows reusable HVE-Core starting points for six roles', () => {
  const slide = byId['team-support'];
  assert.equal(slides[21].id, 'team-support');
  assert.equal(slide.title.replace(/<[^>]+>/g, ''), 'HVE-Core supportsthe whole team.');
  assert.equal(slide.minutes, 1);
  assert.ok(slide.sources.includes('core'));
  assert.match(slide.body, /<figure class="team-scene"\s+aria-label="[^"]+"/);
  assert.equal((slide.body.match(/<li class="team-card tone-/g) ?? []).length, 6);
  assert.equal((slide.body.match(/class="team-chip"/g) ?? []).length, 6);
  assert.equal((slide.body.match(/<path class="team-spoke tone-/g) ?? []).length, 6);
  assert.equal((slide.body.match(/<div class="team-hub">/g) ?? []).length, 1);
  const content = text(slide.body);
  assert.match(content, /HVE-Core\s+Agents, skills, instructions/);
  for (const role of ['Program manager', 'UX designer', 'Architect', 'Operations', 'Data scientist', 'Engineer']) {
    assert.match(content, new RegExp(role));
  }
  assert.match(content, /Design Thinking coach, customer evidence/);
  assert.match(content, /Research, plan, implement, review/);
  assert.match(content, /Teams\s+2\s+Design Thinking\s+3\s+Accelerators\s+4\s+AI tooling/);
  assert.match(content, /Give every role a reusable starting point\.\s+Customize it for your organization\./);
  assert.doesNotMatch(`${slide.title} ${slide.body} ${slide.notes}`, /Examples only|dashed|certified|guarantee[sd]?\s+(results|savings)|—/i);
  assert.match(slide.notes, /production-ready starting point that can be customized to your organization/);
  assert.match(slide.notes, /Design Thinking coach/);
  assert.match(slide.notes, /research, plan, implement, and review/);
  assert.match(slide.notes, /mapping is illustrative/);
  assert.match(slide.notes, /HVE-Core is optional and replaceable/);
  assert.match(slide.notes, /does not supply sponsorship, end user time, authority, or review capacity/);
  assert.match(slide.notes, /does not replace expert judgment or required independent assurance/);
  assert.match(slide.notes, /coverage varies by role/);
  assert.ok(slide.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
});

test('slide 33 shows that adoption needs six leadership commitments beyond installation', () => {
  const slide = byId['adoption-commitments'];
  assert.equal(slides[32].id, 'adoption-commitments');
  assert.equal(slide.part, 'deep-dive');
  assert.match(slide.notes, /toolkit cannot supply/);
  assert.equal(slide.title.replace(/<[^>]+>/g, ''), 'Adoption needs morethan installation.');
  assert.equal(slide.minutes, 1.25);
  assert.ok(slide.sources.includes('core'));
  assert.match(slide.body, /<figure class="adoption-scene"\s+aria-label="[^"]+"/);
  assert.equal((slide.body.match(/<li class="adoption-card tone-/g) ?? []).length, 6);
  assert.equal((slide.body.match(/class="adoption-chip"/g) ?? []).length, 6);
  assert.equal((slide.body.match(/class="adoption-installed tone-slate"/g) ?? []).length, 1);
  const content = text(slide.body);
  assert.match(content, /Toolkit installed/);
  assert.match(content, /Now what\? Six commitments\./);
  for (const commitment of ['Sponsorship', 'Authority', 'Shared ownership', 'End user time', 'Review capacity', 'Maintained knowledge']) {
    assert.match(content, new RegExp(commitment));
  }
  assert.doesNotMatch(content, /Customer time/);
  assert.match(content, /Installation is the easy part\.\s+Adoption needs leadership commitments\./);
  assert.ok(content.split(/\s+/).length <= 85);
  assert.doesNotMatch(`${slide.title} ${slide.body} ${slide.notes}`, /dashed|certified|guarantee[sd]?\s+(results|savings)|—/i);
  assert.match(slide.notes, /End user time/);
  assert.match(slide.notes, /teaching synthesis/);
  assert.match(slide.notes, /Each organization decides/);
  assert.match(slide.notes, /not a customer result/);
  assert.match(slide.notes, /cannot supply sponsorship, end user time, authority, or review capacity/);
  assert.ok(slide.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
});

test('slide 34 contrasts AI activity with six outcome measures', () => {
  const slide = byId['outcome-measures'];
  assert.equal(slides[33].id, 'outcome-measures');
  assert.equal(slide.part, 'deep-dive');
  assert.equal(slide.title.replace(/<[^>]+>/g, ''), 'Measure the outcome,not the AI activity.');
  assert.equal(slide.minutes, 1.25);
  assert.match(slide.body, /<figure class="outcome-scene"\s+aria-label="[^"]+"/);
  assert.equal((slide.body.match(/<li class="outcome-act"/g) ?? []).length, 3);
  assert.equal((slide.body.match(/<li class="outcome-card tone-/g) ?? []).length, 6);
  assert.equal((slide.body.match(/class="outcome-chip"/g) ?? []).length, 9);
  const content = text(slide.body);
  assert.match(content, /AI activity\s+Shows use, not success/);
  assert.match(content, /Outcome\s+Shows what changed/);
  for (const activity of ['Prompts sent', 'Code generated', 'Seats activated']) {
    assert.match(content, new RegExp(activity));
  }
  for (const measure of ['Useful value', 'Quality', 'Waiting', 'Rework', 'Experience', 'Total cost']) {
    assert.match(content, new RegExp(measure));
  }
  assert.match(content, /Count outcomes, not activity\.\s+Prompts and code volume show use, not success\./);
  assert.ok(content.split(/\s+/).length <= 85);
  assert.doesNotMatch(`${slide.title} ${slide.body} ${slide.notes}`, /dashed|certified|guarantee[sd]?\s+(results|savings)|—/i);
  assert.match(slide.notes, /show use, not success/);
  assert.match(slide.notes, /More code is not more value/);
  assert.match(slide.notes, /teaching aid, not a standard/);
  assert.match(slide.notes, /Each team picks its own baseline/);
  assert.match(slide.notes, /this slide shows no results/);
  assert.match(slide.notes, /Invent no chart or percentage/);
  assert.ok(slide.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 220);
});

test('section breaks preserve the approved output-to-outcome titles and selected C treatment', async () => {
  const expected = [
    ['outcomes-question', 2, 'We’re delivering code faster. Are we delivering better outcomes?'],
    ['outcomes-response', 8, 'From faster code delivery to better business outcomes.'],
  ];
  for (const [id, index, title] of expected) {
    const slide = byId[id];
    assert.equal(slides[index].id, id);
    assert.equal(slide.title.replace(/<[^>]+>/g, ''), title);
    assert.equal(slide.className, 'section-divider');
    assert.equal(slide.body, '');
    assert.equal(slide.minutes, 0.25);
    assert.match(slide.title, /<strong>better (?:business )?outcomes[?.]<\/strong>/);
    assert.doesNotMatch(slide.title, /<br|fragment/);
  }
  assert.equal(slides[1].id, 'delivery-eras');
  assert.equal(slides[3].id, 'agentic-cracks');
  assert.equal(slides[7].id, 'production-early');
  assert.equal(slides[9].id, 'hve-model');
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.reveal \.section-divider h2\s*\{[^}]*top: 50%;[^}]*text-align: center;[^}]*white-space: nowrap;/);
  assert.match(theme, /\.section-divider h2 strong\s*\{ color: var\(--warm-ink\); font-weight: inherit; \}/);
  assert.match(theme, /\.section-divider :is\(\.chrome-top, \.chrome-bottom, \.slide-content\) \{ display: none; \}/);
});

test('slide 6 separates a delivered chatbot from the customer outcome', () => {
  const slide = byId['dashboard-request'];
  assert.equal(slides[5].id, slide.id);
  assert.equal(slide.minutes, 1.25);
  assert.equal(slide.title, 'Delivering software faster.<br><em>But not delivering the outcome.</em>');
  assert.doesNotMatch(slide.title, /chatbot|customer|Friday|Monday/i);
  const content = text(slide.body);
  for (const phrase of ['The requested solution', 'Reduce order calls.', 'Build an AI chatbot.',
    'Chatbot shipped. Same order record.', 'The unresolved customer problem',
    'Carrier: now Monday.', 'Chatbot: still Friday.', 'Missing update. No owner.',
    'Faster implementation can multiply solutions to the wrong problem.',
    'The outcome: customers know the revised date and what to do next.']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.equal((slide.body.match(/class="panel(?: warm)?"/g) ?? []).length, 2);
  assert.match(slide.body, /class="gap-link" aria-hidden="true"/);
  assert.doesNotMatch(slide.body, /quality dashboard|shift handover|fragment|class="legend"|Illustrative|unreliable|Faster code/);
  assert.match(slide.notes, /The carrier moves a delivery from Friday to Monday\. The order record still says Friday/);
  assert.match(slide.notes, /No team owns passing the carrier update through to the order system and the customer/);
  assert.match(slide.notes, /The chatbot reads that unchanged record and repeats Friday/);
  assert.match(slide.notes, /green check confirms a shipped chatbot, not accurate order information or proven business value/);
  assert.match(slide.notes, /Faster implementation did not create this problem/);
  assert.match(slide.notes, /unchanged learning and decision cycles can allow more unvalidated requests/);
  assert.match(slide.notes, /not an argument for slower engineering or a new central approval queue/);
  assert.match(slide.notes, /proposed success criteria, not measured outcomes/);
  assert.match(slide.notes, /Use this same Friday-to-Monday story for the later leadership pillar examples/);
  assert.match(slide.notes, /Do not select an interface before the evidence is available/);
  assert.deepEqual(slide.sources, ['engineering', 'dt']);
});

test('slide 7 shows business decisions made by default and carried through implementation', async () => {
  const slide = byId['feedback-window'];
  assert.equal(slides[6].id, slide.id);
  assert.equal(slide.minutes, 1.25);
  assert.equal(slide.title, 'Unanswered questions become<br><em>business decisions in code.</em>');
  const content = text(slide.body);
  for (const phrase of ['Business question', 'Still open', 'PM / SME / customer',
    'Design + planning', 'Implementation + testing', 'More decisions.', 'Validation lags.',
    'Developer / agent', 'Agent makes an assumption', 'Business rule in code',
    'Unvalidated rule', 'Same assumption spreads', 'Reused as the starting point',
    'Product behaviour', 'Tests', 'Later increments',
    'The question is still open.', 'The product already contains an answer.']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.equal((slide.body.match(/class="business-question"/g) ?? []).length, 1);
  assert.equal((slide.body.match(/class="cycle-runner"/g) ?? []).length, 2);
  assert.equal((slide.body.match(/class="rule-output"/g) ?? []).length, 3);
  assert.equal((slide.body.match(/class="rule-tag">Unvalidated rule/g) ?? []).length, 4);
  assert.equal((slide.body.match(/class="rule-copy"/g) ?? []).length, 9);
  assert.match(slide.body, /class="pending-stop"/);
  assert.equal((slide.body.match(/class="rule-branch"/g) ?? []).length, 3);
  assert.match(slide.body, /class="rule-return"/);
  const returnPath = slide.body.match(/class="rule-return" d="([^"]+)"/)[1];
  assert.equal((returnPath.match(/C/g) ?? []).length, 2);
  assert.doesNotMatch(returnPath, /[HLV]/);
  assert.match(slide.body, /data-amplification data-copies="3"/);
  assert.doesNotMatch(slide.body, /choice-icon|lane-row|decision-transfer|Chooses a default/);
  assert.doesNotMatch(slide.body, /Illustrative|not to scale|Keep useful ceremonies|Direct route|Customer decision owner|time \+ authority|fragment|Friday|Monday|chatbot|carrier/i);
  assert.doesNotMatch(slide.notes, /Friday|Monday|order-status|carrier|chatbot/i);
  assert.ok(slide.notes.startsWith('Talk track (about 75 seconds):\n'));
  const talkTrack = slide.notes.split('Presenter guidance:\n')[0];
  assert.ok(talkTrack.trim().split(/\s+/).length <= 190, 'Talk track fits the slide allocation');
  assert.match(talkTrack, /slow purple planning loop[\s\S]*dashed line[\s\S]*agent[\s\S]*product behaviour, tests, and later increments[\s\S]*return arc/);
  assert.match(talkTrack, /If business validation cannot keep pace/);
  assert.match(talkTrack, /The question is still open\. The product already contains an answer\./);
  assert.match(slide.notes, /choice made by default, not an explicit transfer of decision authority/);
  assert.match(slide.notes, /When delivery accelerates but business validation does not keep pace/);
  assert.match(slide.notes, /conditional capacity gap, not evidence that faster delivery inevitably produces more assumptions/);
  assert.match(slide.notes, /The agent makes the illustrated assumption/);
  assert.match(slide.notes, /not a count of distinct new assumptions/);
  assert.match(slide.notes, /not three independently validated decisions/);
  assert.match(slide.notes, /not three independently validated decisions or sequential lifecycle stages/);
  assert.match(slide.notes, /Unvalidated does not mean that the chosen rule is necessarily wrong/);
  assert.match(slide.notes, /amplification is the reach of one unchecked choice/);
  assert.match(slide.notes, /Engineering owns legitimate technical decisions within its scope/);
  assert.match(slide.notes, /Leave the response for the next section/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.amplification-diagram \{ position: relative; width: 1152px; height: 332px;/);
  assert.match(theme, /\.amplification-diagram \.loop-build \{ left: 574px; --diameter: 156px;/);
  const rendered = renderSlides().match(/<section id="feedback-window"[\s\S]*?<\/section>/)[0];
  assert.match(rendered, /data-amplification-action="replay"/);
  assert.match(rendered, /data-amplification-action="pause"/);
});

test('slide 8 explains late readiness, excess arrivals, and rework without presenting the response', async () => {
  const slide = byId['production-early'];
  assert.equal(slide.title, 'Features arrive faster.<br><em>Production readiness falls behind.</em>');
  assert.equal(slide.minutes, 1.25);
  assert.match(slide.body, /data-readiness data-pending="7"/);
  assert.equal((slide.body.match(/class="cycle-runner"/g) ?? []).length, 2);
  assert.equal((slide.body.match(/class="queued-feature"/g) ?? []).length, 7);
  for (const phrase of [
    'Waiting features', 'Acceptance tests', 'Assurance checks', 'Release readiness', 'Work still arrives late',
    'Faster arrivals', 'Value waits', 'Late rework', 'More unfinished readiness work.',
  ]) assert.ok(text(slide.body).includes(phrase), phrase);
  assert.match(slide.body, /class="readiness-return" d="M920 260V300Q920 320 900 320H204Q184 320 184 300V226"/);
  assert.match(slide.body, /class="feature-caption"><span>Faster arrivals<\/span>/);
  assert.match(slide.body, /class="readiness-caption"><span>Work still arrives late<\/span>/);
  assert.doesNotMatch(slide.body, /Illustrative|not to scale|Involved from the start|Shift assurance|participate throughout|Security \+ ops|Release \+ SRE/);
  const talkTrack = slide.notes.split('Presenter guidance:\n')[0];
  assert.ok(talkTrack.trim().split(/\s+/).length <= 190);
  assert.match(talkTrack, /fast implementation wheel[\s\S]*old cycle[\s\S]*backlog grows[\s\S]*return line/);
  assert.match(slide.notes, /conditional capacity gap/);
  assert.match(slide.notes, /The right wheel names work, not teams/);
  assert.match(slide.notes, /not three required serial gates/);
  assert.match(slide.notes, /does not imply that tests and reviews belong only after build/);
  assert.match(slide.notes, /separate pieces of work, not copies of one business assumption/);
  assert.match(slide.notes, /required independent review/);
  assert.match(slide.notes, /security-agent support during design, planning, and coding/);
  assert.match(slide.notes, /Leave the response for the next section/);
  const rendered = renderSlides().match(/<section id="production-early"[\s\S]*?<\/section>/)[0];
  assert.match(rendered, /data-readiness-action="replay"/);
  assert.match(rendered, /data-readiness-action="pause"/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.readiness-diagram :is\(\.loop-name, \.backlog-heading\) \{ top: 10px;/);
  assert.match(theme, /\.readiness-diagram :is\(\.feature-caption, \.backlog-caption, \.readiness-caption\) \{ top: 274px;/);
  assert.match(theme, /\.readiness-diagram \.rework-caption \{[^}]*background: var\(--paper\)/);
  assert.match(theme, /\.readiness-diagram :is\(\.feature-caption, \.readiness-caption\) span \{[^}]*background: var\(--paper\)/);
});

test('slide 10 uses the selected large circular model and keeps assurance in notes', async () => {
  const slide = byId['hve-model'];
  assert.equal(slide.minutes, .5);
  assert.equal(slide.title,
    'Hypervelocity Engineering<br><em>How we change the delivery operating model</em>');
  assert.equal((slide.body.match(/class="model-step fragment"/g) ?? []).length, 1);
  assert.match(slide.body, /data-fragment-index="0"/);
  assert.match(slide.body, /data-operating-model data-stage="complete"/);
  assert.match(slide.body, /class="learning-circle" cx="576" cy="182" r="166"/);
  assert.equal((slide.body.match(/class="model-arrowhead"/g) ?? []).length, 4);
  for (const angle of [0, 90, 180, 270]) {
    assert.ok(slide.body.includes(
      `class="model-arrowhead" d="M566 6L576 16L566 26" transform="rotate(${angle} 576 182)"`,
    ));
  }
  assert.doesNotMatch(slide.body, /model-sweep/);
  assert.match(slide.body, /viewBox="0 0 1152 364"/);
  assert.match(text(slide.body), /Customer \+ expert crew/);
  assert.match(text(slide.body), /Short feedback cycles/);
  for (const name of ['Product + design', 'Engineering + testing', 'Security + operations', 'Release + service']) {
    assert.ok(text(slide.body).includes(name));
  }
  assert.doesNotMatch(slide.body, /model-assurance|AI \+ prepared foundations|Continuous assurance/);
  assert.match(slide.notes, /independent review where required/);
  assert.match(slide.notes, /not a measured result or a mandated formula/);
  assert.match(slide.notes, /a POC or MVP is not a production-ready release/);
  assert.doesNotMatch(slide.body, /HVE-Core|GitHub Copilot|Multidisciplinary teams|Design Thinking/);
  assert.ok(slide.notes.split('Presenter guidance:\n')[0].trim().split(/\s+/).length <= 80);
  assert.match(slide.notes, /Advance once with Right Arrow or Space/);
  assert.match(slide.notes, /Four fixed purple arrowheads/);
  assert.match(slide.notes, /The circle does not animate/);
  assert.doesNotMatch(slide.notes, /six active seconds|Motion pauses/);
  for (const file of ['operating-model.mjs']) {
    assert.equal(
      await readFile(new URL(`./dist/${file}`, import.meta.url), 'utf8'),
      await readFile(new URL(`./${file}`, import.meta.url), 'utf8'),
    );
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.match(presentation, /setupOperatingModel\(deck\)/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.operating-model \.learning-centre \{[^}]*width: 220px; height: 220px;/);
  assert.match(theme, /#hve-model h2 em \{ font-size: 36px; font-weight: 500;/);
  assert.match(theme, /\.operating-model \.model-arrowhead \{ stroke: var\(--purple\); stroke-width: 4;/);
  assert.match(theme, /\.operating-model \.learning-stage\.validation \{[^}]*background: transparent;/);
  assert.doesNotMatch(theme, /\.operating-model \.model-sweep/);
});

test('slide 11 reveals four unnumbered structural pillars without the extra improvement flow', async () => {
  const slide = byId['constraints-pillars'];
  assert.equal(slide.title, 'Four pillars address<br><em>the challenges exposed by AI-accelerated delivery.</em>');
  assert.equal(slide.minutes, 1.25);
  assert.equal((slide.body.match(/class="pillar-column fragment"/g) ?? []).length, 4);
  assert.deepEqual([...slide.body.matchAll(/data-fragment-index="(\d)"/g)].map(match => Number(match[1])), [0, 1, 2, 3]);
  assert.equal((slide.body.match(/class="pillar-practice"/g) ?? []).length, 4);
  assert.doesNotMatch(slide.body, /column-number|pillar-number|class="grid pair"/);
  for (const pillar of ['Multidisciplinary teams', 'Design Thinking', 'Reusable accelerators', 'AI throughout']) {
    assert.ok(text(slide.body).includes(pillar));
  }
  assert.doesNotMatch(slide.body, /Inspect|Compare practices|Adapt|Then inspect again|class="strip"/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /#constraints-pillars \.pillar-practice strong \{[^}]*font-size: 27px/);
  assert.match(theme, /#constraints-pillars \.pillar-practice \{[^}]*padding: 20px 24px/);
  assert.match(theme, /border-left: 1px dashed var\(--edge\)/);
  assert.match(theme, /body:not\(\.deck-ready\) #constraints-pillars \.pillar-column.fragment/);
  assert.match(theme, /\.reveal.overview #constraints-pillars \.pillar-column.fragment/);
  assert.match(theme, /html.print-pdf #constraints-pillars \.pillar-column.fragment \{ opacity: 1; visibility: visible; transition: none;/);
  assert.match(slide.notes, /Advance four times/);
  assert.doesNotMatch(slide.title, /constraints/i);
  assert.match(slide.body, /Established practices, refined through Microsoft ISE delivery/);
  assert.match(slide.body, /customer co-engineering and Forward Deployed Engineering experience/);
  assert.doesNotMatch(slide.body, /proven|guaranteed/i);
  const talkTrack = slide.notes.split('Presenter guidance:\n')[0];
  assert.ok(talkTrack.trim().split(/\s+/).length <= 70);
  assert.match(talkTrack, /Microsoft Industry Solutions Engineering \(ISE\)/);
  assert.match(talkTrack, /Forward Deployed Engineering over recent years/);
  assert.match(talkTrack, /short customer-and-crew learning loop/);
  assert.doesNotMatch(talkTrack, /Multidisciplinary|Design Thinking|accelerators|AI assistance/);
  assert.match(slide.notes, /not an exclusive one-to-one mapping/);
  assert.match(slide.notes, /required independent review/);
  assert.match(slide.notes, /not that AI creates every challenge/);
  assert.ok(slide.sources.includes('fde'));
});

test('pillar details share the approved bottom-left number and numbered introduction headings', async () => {
  const html = renderSlides();
  const ids = ['teams', 'team-example', 'design-thinking', 'design-example',
    'accelerators', 'accelerator-example', 'lifecycle-ai', 'lifecycle-example'];
  assert.equal((html.match(/class="pillar-backdrop"/g) ?? []).length, 8);
  for (const [index, id] of ids.entries()) {
    const section = html.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))[0];
    const number = Math.floor(index / 2) + 1;
    assert.match(section, new RegExp(`font-size="585" font-weight="650">${number}</text>`));
    assert.match(section, /class="pillar-backdrop"[^>]*aria-hidden="true" focusable="false"/);
    assert.match(section, /x="64" y="700" text-anchor="start"/);
    assert.ok(section.indexOf('class="slide-wave"') < section.indexOf('class="pillar-backdrop"'));
    assert.ok(section.indexOf('class="pillar-backdrop"') < section.indexOf('<h2>'));
    if (index % 2 === 0) {
      const separator = id === 'design-thinking' ? ' ' : '<br>';
      assert.match(byId[id].title, new RegExp(`^Pillar ${number}: [^<]+\\.${separator}<em>[^<]+\\.</em>$`));
    }
    else if (!['team-example', 'design-example', 'accelerator-example', 'lifecycle-example'].includes(id)) {
      assert.match(byId[id].title, /^Example:/);
    }
  }
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.pillar-backdrop \{[^}]*z-index: 1;[^}]*opacity: 0.07;[^}]*pointer-events: none;/);
  assert.match(theme, /\.pillar-backdrop ~ \.slide-content \{ z-index: 2; \}/);
});

test('delivery shifts connect technology changes to responsibility and outcome ownership', () => {
  const slide = byId['delivery-eras'];
  assert.equal(slide.title, 'Software delivery changed.<br><em>So did responsibility.</em>');
  const content = text(slide.body);
  assert.match(content, /Packaged software\s+Coordinate releases/);
  assert.match(content, /Cloud services\s+Own the running service/);
  assert.match(content, /Agile\s+Own delivery \+ feedback/);
  assert.match(content, /Co-engineering\s+Own the outcome with customers/);
  assert.match(content, /Quality · security · customer learning/);
  assert.match(content, /AI is not just the next tool rollout\. Revisit who owns the outcome\./);
  assert.match(content, /AI SDLC emerges\s+Assist across delivery/);
  assert.doesNotMatch(content, /Approximate milestones|Overlapping eras|not to scale/);
  assert.match(slide.notes, /Responsible coding-tool use and token value matter/);
  assert.match(slide.notes, /Reference milestones, not invention or adoption dates/);
  assert.match(slide.notes, /not measured evidence of organizational change/);
  for (const key of ['cics', 'agile', 'devops', 'cloud', 'coengineering', 'copilotx']) {
    assert.ok(slide.sources.includes(key), key);
  }
});

test('Agile and DevOps have distinct dated milestones', () => {
  const slide = byId['delivery-eras'];
  const milestones = new Map([...slide.body.matchAll(/<li[^>]+data-year="(\d+)"[^>]*>([\s\S]*?)<\/li>/g)]
    .map(([, year, html]) => [year, text(html)]));
  assert.match(milestones.get('2001'), /^2001\s+Agile\s+Own delivery \+ feedback$/);
  assert.doesNotMatch(milestones.get('2001'), /DevOps/);
  assert.equal(milestones.get('2009'), 'DevOps 2009');
  assert.match(slide.notes, /2001 milestone is Agile only/);
  assert.match(slide.notes, /2009 marker for the first DevOpsDays in Ghent/);
});

test('timeline positions and arrival delays use the same linear year scale', () => {
  const body = byId['delivery-eras'].body;
  const [, start, end, duration] = body.match(/data-start="(\d+)" data-end="(\d+)" style="--duration:(\d+)ms"/);
  assert.equal(Number(start), 1970);
  assert.equal(Number(end), 2026);
  assert.equal(Number(duration), 3600);
  const stops = [...body.matchAll(/<li class="(milestone-item[^"]*|milestone-secondary)"\s+data-year="(\d+)" style="left:([\d.]+)%;--delay:([\d.]+)ms/g)];
  assert.deepEqual(stops.map(([, , year]) => Number(year)), [1970, 2001, 2006, 2009, 2015, 2023]);
  assert.equal(stops.filter(([, cls]) => cls.startsWith('milestone-item')).length, 5);
  for (const [, cls, year, position, delay] of stops) {
    const fraction = (Number(year) - Number(start)) / (Number(end) - Number(start));
    assert.ok(Math.abs(Number(position) / 100 - fraction) < 1e-10, `${year}: position`);
    assert.ok(Math.abs(Number(delay) / Number(duration) - fraction) < 1e-10, `${year}: arrival`);
    if ([1970, 2001, 2015].includes(Number(year))) assert.match(cls, /above/);
    if ([2006, 2023].includes(Number(year))) assert.match(cls, /below/);
  }
  const completion = Math.max(...stops.map(([, , , , delay]) => Number(delay))) + 500;
  assert.ok(completion > 3500 && completion < 4500);
  assert.match(body, /<svg class="milestone-arrow" viewBox="0 0 1088 28"/);
  assert.doesNotMatch(body, /class="gantt"|class="bar|time-guides|time-caveat/);
});

test('the AI milestone caption is centered on its timeline marker', async () => {
  const body = byId['delivery-eras'].body;
  const caption = body.match(/class="milestone-item below ai"[\s\S]*?--label-offset:([-\d.]+)px;--label-width:([\d.]+)px/);
  assert.ok(caption);
  assert.equal(Number(caption[1]) + Number(caption[2]) / 2, 0);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.ai \.milestone-copy\s*\{\s*text-align: center;\s*\}/);
});

test('timeline motion is active-slide-only with complete static alternatives', async () => {
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  const rules = [...theme.matchAll(/([^{}]+)\{\s*animation:\s*hve-[^}]+\}/g)];
  assert.equal(rules.length, 4);
  for (const [, selector] of rules) {
    assert.match(selector, /html:not\(\.print-pdf\) body\.deck-ready/);
    assert.match(selector, /\.reveal:not\(\.overview\) #delivery-eras\.present/);
  }
  assert.match(theme, /hve-timeline-shaft var\(--duration\) linear both/);
  assert.match(theme, /hve-timeline-tip var\(--duration\) linear both/);
  assert.match(theme, /hve-milestone-arrive 500ms cubic-bezier\(0\.16, 1, 0\.3, 1\) var\(--delay\) both/);
  assert.match(theme, /\.milestone-item\s*\{[^}]*--arrival-y: -28px;/);
  assert.match(theme, /\.milestone-item\.below\s*\{[^}]*--arrival-y: 28px;/);
  for (const cls of ['milestone-copy', 'milestone-point', 'milestone-shaft', 'milestone-tip']) {
    const baseRule = theme.match(new RegExp(`\\.${cls}[^{}]*\\{([^}]+)\\}`))?.[1] ?? '';
    assert.doesNotMatch(baseRule, /opacity:\s*0|visibility:\s*hidden|display:\s*none/);
  }
  assert.match(theme, /@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*animation: none !important;/);
  assert.match(theme, /@media print\s*\{\s*\.milestone-timeline \* \{ animation: none !important; \}/);
});

test('slide 4 uses the selected fault line without statistics or boxes', () => {
  const slide = byId['agentic-cracks'];
  assert.equal(slide.title, 'More code does not mean<br><em>better outcomes.</em>');
  const content = text(slide.body);
  for (const phrase of ['More code', 'More prototypes', 'Same delivery model', 'Handoffs',
    'Decision waits', 'Wrong problem', 'Late feedback', 'Late assurance']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.match(content, /More code and prototypes do not guarantee better outcomes\. Evidence and clear decision ownership are required\./);
  assert.match(slide.body, /better outcomes\.<br>Evidence and clear decision ownership/);
  assert.equal((slide.body.match(/class="fracture"/g) ?? []).length, 5);
  assert.equal((slide.body.match(/class="crack"/g) ?? []).length, 5);
  assert.match(slide.body, /<svg class="fault-beam"/);
  assert.doesNotMatch(slide.body, /bigword|class="slab"|class="mark|code-evidence|clone-stat/);
  assert.doesNotMatch(content, /\d|%|GitClear|DORA/);
  assert.doesNotMatch(content, /Big words|New names|Forward Deployed Engineering/);
  assert.match(slide.notes, /planning scenario, not a forecast/);
  assert.match(slide.notes, /not slower engineering or a new central approval queue/);
  assert.match(slide.notes, /AI does not cause them/);
});

test('slide 5 combines the approved sweeping loops and retains assurance', () => {
  const slide = byId.handoffs;
  assert.equal(slide.title, 'Development got faster.<br><em>The operating model did not.</em>');
  assert.equal(slide.minutes, 2.5);
  const content = text(slide.body);
  for (const phrase of ['Planning + decisions', 'Implementation + testing', 'Review + learning',
    'Human handoff', 'Decision wait', 'Review queue', 'Security, quality, and operations checks stay.',
    'Illustrative rhythms, not measured durations.',
    'Faster implementation needs faster learning and decisions, not fewer checks.']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.equal((slide.body.match(/class="cycle-runner"/g) ?? []).length, 3);
  assert.equal((slide.body.match(/class="increment"/g) ?? []).length, 3);
  assert.match(slide.body, /data-cadence data-phase="2"/);
  assert.match(slide.body, /class="former-disc"/);
  assert.deepEqual([...slide.body.matchAll(/data-fragment-index="(\d)" data-cadence-phase="(\d)"/g)]
    .map(([, index, phase]) => [Number(index), Number(phase)]), [[0, 1], [1, 2]]);
  assert.equal(byId['ai-implementation'], undefined);
  assert.equal(byId['outcome-waiting'], undefined);
  assert.match(slide.notes, /Retain independent review and separation of duties where required/);
  assert.match(slide.notes, /customer and team jointly responsible for the outcome/);
  assert.match(slide.notes, /not accepted customer outcomes/);
  assert.match(slide.notes, /not measured durations or workload shares/);
  assert.doesNotMatch(slide.body, /class="lane|Time saved|\d+%/);
});

function motionTarget() {
  const listeners = new Map();
  const classes = new Set();
  return {
    dataset: {},
    attributes: {},
    style: {},
    classList: {
      add: value => classes.add(value),
      remove: value => classes.delete(value),
      contains: value => classes.has(value),
      toggle(value, enabled) { enabled ? classes.add(value) : classes.delete(value); },
    },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, callback) {
      const callbacks = listeners.get(name) ?? [];
      callbacks.push(callback);
      listeners.set(name, callbacks);
    },
    emit(name, event = {}) { listeners.get(name)?.forEach(callback => callback(event)); },
  };
}

function operatingModelHarness({ reducedMotion = false, pdf = false } = {}) {
  const step = motionTarget();
  const serial = motionTarget();
  const learning = motionTarget();
  const figure = motionTarget();
  figure.querySelector = selector => ({
    '.model-step': step, '.serial': serial, '.model-learning': learning,
  })[selector];
  const slide = { querySelector: selector => ({
    '[data-operating-model]': figure,
  })[selector] };
  const document = Object.assign(motionTarget(), {
    documentElement: motionTarget(), querySelector: () => slide, hidden: false,
  });
  if (pdf) document.documentElement.classList.add('print-pdf');
  const reduced = Object.assign(motionTarget(), { matches: reducedMotion });
  const view = Object.assign(motionTarget(), { document, matchMedia: () => reduced });
  const deck = Object.assign(motionTarget(), {
    current: slide, overview: false, paused: false,
    getCurrentSlide() { return this.current; },
    isOverview() { return this.overview; },
    isPaused() { return this.paused; },
  });
  deck.on = deck.addEventListener;
  setupOperatingModel(deck, view);
  return { deck, view, reduced, step, serial, learning, figure, slide };
}

test('operating model uses one native fragment to replace serial handoffs with shared learning', () => {
  const h = operatingModelHarness();
  assert.equal(h.figure.dataset.stage, 'serial');
  assert.equal(h.learning.attributes['aria-hidden'], 'true');
  h.step.classList.add('visible');
  h.deck.emit('fragmentshown');
  assert.equal(h.figure.dataset.stage, 'learning');
  assert.equal(h.serial.attributes['aria-hidden'], 'true');
  assert.equal(h.learning.attributes['aria-hidden'], 'false');
  h.step.classList.remove('visible');
  h.deck.emit('fragmenthidden');
  assert.equal(h.figure.dataset.stage, 'serial');
});

test('operating model static modes show both views and preserve native fragment state', () => {
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    const h = operatingModelHarness(options);
    assert.equal(h.figure.dataset.stage, 'complete');
    assert.equal(h.step.classList.contains('disabled'), true);
    assert.equal(h.serial.attributes['aria-hidden'], 'false');
    assert.equal(h.learning.attributes['aria-hidden'], 'false');
  }
  const h = operatingModelHarness();
  h.step.classList.add('visible');
  h.deck.emit('fragmentshown');
  h.deck.overview = true;
  h.deck.emit('overviewshown');
  assert.equal(h.figure.dataset.stage, 'complete');
  h.deck.overview = false;
  h.deck.emit('overviewhidden');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.view.emit('beforeprint');
  assert.equal(h.figure.dataset.stage, 'complete');
  assert.equal(h.step.classList.contains('disabled'), true);
  h.view.emit('afterprint');
  assert.equal(h.figure.dataset.stage, 'learning');
  assert.equal(h.step.classList.contains('disabled'), false);
  h.reduced.matches = true;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.stage, 'complete');
  h.reduced.matches = false;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.deck.current = {};
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.stage, 'complete');
  h.deck.current = h.slide;
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.stage, 'learning');
});

test('operating model keeps its static circle across pause, visibility and page lifecycle changes', async () => {
  const source = await readFile(new URL('./operating-model.mjs', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /\.animate\(|requestAnimationFrame|setInterval|model-sweep/);
  const h = operatingModelHarness();
  h.step.classList.add('visible');
  h.deck.emit('fragmentshown');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.deck.paused = true;
  h.deck.emit('paused');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.deck.paused = false;
  h.deck.emit('resumed');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.view.document.hidden = true;
  h.view.document.emit('visibilitychange');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.view.document.hidden = false;
  h.view.document.emit('visibilitychange');
  assert.equal(h.figure.dataset.stage, 'learning');
  h.view.emit('pagehide');
  assert.equal(h.figure.dataset.stage, 'complete');
  assert.equal(h.step.classList.contains('disabled'), true);
  h.view.emit('pageshow');
  assert.equal(h.figure.dataset.stage, 'learning');
  assert.equal(h.step.classList.contains('disabled'), false);
});

function cadenceHarness({ reducedMotion = false, pdf = false } = {}) {
  const target = motionTarget;
  const animations = [];
  const captionCues = [];
  const runners = Array.from({ length: 3 }, () => ({
    animate(keyframes, options) {
      assert.equal(options.duration, 6000);
      assert.equal(options.iterations, Infinity);
      assert.deepEqual(keyframes, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }]);
      const animation = {
        playbackRate: 1,
        playState: 'running',
        play() { this.playState = 'running'; },
        pause() { this.playState = 'paused'; },
        cancel() { this.playState = 'idle'; },
        updatePlaybackRate(rate) { this.playbackRate = rate; },
      };
      animations.push(animation);
      return animation;
    },
  }));
  const figure = target();
  const caption = target();
  caption.replaceChildren = (...children) => {
    caption.children = children;
    caption.textContent = children.map(child => child.textContent).join('');
  };
  caption.animate = (keyframes, options) => {
    const animation = {
      keyframes,
      options,
      playState: 'running',
      play() { this.playState = 'running'; },
      pause() { this.playState = 'paused'; },
      cancel() { this.playState = 'idle'; },
    };
    captionCues.push(animation);
    return animation;
  };
  const replay = target();
  const pause = target();
  const steps = [1, 2].map(phase => Object.assign(target(), { dataset: { cadencePhase: String(phase) } }));
  figure.querySelector = selector => selector === '.phase-caption' ? caption : null;
  figure.querySelectorAll = selector => ({ '.cadence-step': steps, '.cycle-runner': runners })[selector] ?? [];
  const slide = {
    querySelector: selector => ({
      '[data-cadence]': figure,
      '[data-cadence-action="replay"]': replay,
      '[data-cadence-action="pause"]': pause,
    })[selector] ?? null,
  };
  const document = Object.assign(target(), {
    hidden: false,
    documentElement: target(),
    querySelector: selector => selector === '#handoffs' ? slide : null,
    createElement: name => Object.assign(target(), { tagName: name.toUpperCase() }),
    createTextNode: textContent => ({ textContent }),
  });
  if (pdf) document.documentElement.classList.add('print-pdf');
  const reduced = Object.assign(target(), { matches: reducedMotion });
  const frames = new Map();
  let nextFrame = 0;
  let now = 0;
  const view = Object.assign(target(), {
    document,
    matchMedia: () => reduced,
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  const deck = Object.assign(target(), {
    current: slide,
    overview: false,
    paused: false,
    getCurrentSlide() { return this.current; },
    isOverview() { return this.overview; },
    isPaused() { return this.paused; },
  });
  deck.on = deck.addEventListener;
  setupCadence(deck, view);
  return {
    deck, view, document, reduced, figure, caption, steps, replay, pause, animations, captionCues, slide, frames,
    advance(milliseconds) {
      now += milliseconds;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(now));
    },
    phase(value) {
      steps.forEach((step, index) => step.classList.toggle('visible', index < value));
      deck.emit(value ? 'fragmentshown' : 'fragmenthidden');
    },
  };
}

test('phase captions keep their words and emphasize the selected phrases without a counter', () => {
  const h = cadenceHarness();
  const phrases = ['Long build cycles', 'Implementation accelerates.',
    'Decision waits, review queues, and handoff overhead'];
  assert.equal(h.captionCues.length, 0);
  for (let phase = 0; phase < 3; phase++) {
    h.phase(phase);
    assert.equal(h.caption.children[0].tagName, 'STRONG');
    assert.equal(h.caption.children[0].textContent, phrases[phase]);
    assert.doesNotMatch(h.caption.textContent, /\d/);
  }
  assert.equal(h.captionCues.length, 2);
  for (const cue of h.captionCues) {
    assert.deepEqual(cue.keyframes, [{ opacity: .7 }, { opacity: 1 }]);
    assert.deepEqual(cue.options, { duration: 260, easing: 'ease-out' });
  }
  h.deck.emit('fragmentshown');
  h.replay.emit('click');
  assert.equal(h.captionCues.length, 2);
  assert.match(byId.handoffs.body, /<strong>Decision waits, review queues, and handoff overhead<\/strong> now set the pace/);
  assert.doesNotMatch(byId.handoffs.body, /phase-count|caption-row|1\s*\/\s*3/);
});

test('caption cues pause with the deck and remain absent in complete static views', () => {
  const h = cadenceHarness();
  h.phase(1);
  const cue = h.captionCues.at(-1);
  h.pause.emit('click');
  assert.equal(cue.playState, 'paused');
  h.pause.emit('click');
  assert.equal(cue.playState, 'running');
  cue.playState = 'finished';
  h.document.emit('visibilitychange');
  assert.equal(cue.playState, 'finished');
  h.view.emit('beforeprint');
  assert.equal(cue.playState, 'idle');
  assert.equal(h.captionCues.length, 1);
  assert.match(h.caption.textContent, /^Decision waits/);
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    assert.equal(cadenceHarness(options).captionCues.length, 0);
  }
});

test('native fragment changes preserve rotation position and only accelerate implementation', () => {
  const h = cadenceHarness();
  assert.equal(h.figure.dataset.phase, '0');
  assert.match(h.caption.textContent, /^Long build cycles/);
  const original = [...h.animations];
  assert.deepEqual(h.animations.map(animation => animation.playbackRate), [1, 1, 1]);
  for (const phase of [1, 2, 1, 0]) {
    h.phase(phase);
    assert.equal(h.figure.dataset.phase, String(phase));
    assert.deepEqual(h.animations, original);
    assert.deepEqual(h.animations.map(animation => animation.playbackRate), [1, phase ? 5 : 1, 1]);
  }
  h.phase(2);
  assert.match(h.caption.textContent, /^Decision waits, review queues/);
});

test('each loop phase settles after six active seconds and replay preserves its phase', () => {
  const h = cadenceHarness();
  h.phase(2);
  h.advance(0);
  h.advance(5999);
  assert.equal(h.pause.disabled, false);
  h.advance(1);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
  assert.equal(h.pause.disabled, true);
  assert.equal(h.frames.size, 0);
  h.replay.emit('click');
  assert.equal(h.figure.dataset.phase, '2');
  assert.ok(h.animations.every(animation => animation.currentTime === 0 && animation.playState === 'running'));
  assert.equal(h.pause.disabled, false);
});

test('manual pause, hidden pages, and deck pause freeze motion and its time budget', () => {
  const h = cadenceHarness();
  h.advance(0);
  h.advance(1000);
  h.pause.emit('click');
  assert.equal(h.pause.textContent, 'Resume motion');
  assert.equal(h.pause.attributes['aria-pressed'], 'true');
  assert.equal(h.frames.size, 0);
  h.advance(10000);
  h.pause.emit('click');
  h.advance(0);
  h.advance(1000);
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
  h.advance(10000);
  h.document.hidden = false;
  h.document.emit('visibilitychange');
  h.advance(0);
  h.deck.paused = true;
  h.deck.emit('paused');
  assert.equal(h.frames.size, 0);
  h.advance(10000);
  h.deck.paused = false;
  h.deck.emit('resumed');
  h.advance(0);
  h.advance(3999);
  assert.equal(h.pause.disabled, false);
  h.advance(1);
  assert.equal(h.pause.disabled, true);
});

test('overview and print show the full comparison and restore the presenter phase', () => {
  const h = cadenceHarness();
  h.phase(1);
  h.deck.overview = true;
  h.deck.emit('overviewshown');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.replay.hidden, true);
  assert.equal(h.frames.size, 0);
  h.deck.overview = false;
  h.deck.emit('overviewhidden');
  assert.equal(h.figure.dataset.phase, '1');
  assert.equal(h.replay.hidden, false);
  h.pause.emit('click');
  h.view.emit('beforeprint');
  assert.equal(h.figure.dataset.phase, '2');
  assert.ok(h.steps.every(step => step.classList.contains('disabled')));
  h.view.emit('afterprint');
  assert.equal(h.figure.dataset.phase, '1');
  assert.equal(h.pause.textContent, 'Resume motion');
  assert.equal(h.frames.size, 0);
  assert.ok(h.steps.every(step => !step.classList.contains('disabled')));
});

test('reduced motion and PDF layout have a complete static view without extra phase steps', () => {
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    const h = cadenceHarness(options);
    assert.equal(h.figure.dataset.phase, '2');
    assert.equal(h.animations.length, 0);
    assert.equal(h.frames.size, 0);
    assert.equal(h.pause.hidden, true);
    assert.ok(h.steps.every(step => step.classList.contains('disabled')));
  }
  const h = cadenceHarness({ reducedMotion: true });
  h.reduced.matches = false;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.phase, '0');
  assert.equal(h.animations.length, 3);
  h.reduced.matches = true;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
});

test('leaving the slide or page cancels motion and re-entry restores native fragment state', () => {
  const h = cadenceHarness();
  h.phase(2);
  h.deck.current = {};
  h.deck.emit('slidechanged');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'idle'));
  h.deck.current = h.slide;
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.animations.length, 6);
  h.view.emit('pagehide');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'idle'));
  h.view.emit('pageshow', { persisted: true });
  assert.equal(h.animations.length, 9);
  assert.equal(h.figure.dataset.phase, '2');
});

test('merged slide hashes preserve the corresponding phase without adding sections', async () => {
  assert.equal(mergedSlideHash('#/ai-implementation'), '#/handoffs/0');
  assert.equal(mergedSlideHash('#/outcome-waiting'), '#/handoffs/1');
  for (const hash of ['', '#/handoffs', '#/handoffs/0', '#/teams', '#/unknown']) {
    assert.equal(mergedSlideHash(hash), hash);
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.ok(presentation.indexOf("window.addEventListener('hashchange', canonicalizeHash)") <
    presentation.indexOf('const deck = new Reveal'));
  assert.match(presentation, /setupCadence\(deck\)/);
  assert.match(presentation, /setupAmplification\(deck\)/);
});

function amplificationHarness({ reducedMotion = false, pdf = false, readiness = false } = {}) {
  const target = motionTarget;
  const runners = [target(), target()];
  const tokens = [target(), target(), target()];
  const copies = Array.from({ length: readiness ? 7 : 9 }, (_, index) =>
    Object.assign(target(), { dataset: { pass: String(index % 3 + 1) } }));
  const path = () => Object.assign(target(), {
    getTotalLength: () => 100,
    getPointAtLength: value => ({ x: value, y: value / 2 }),
  });
  const branches = [path(), path(), path()];
  const returnPath = path();
  const returnToken = target();
  const figure = target();
  figure.querySelectorAll = selector => ({
    '.cycle-runner': runners, '.rule-branch': branches, '.rule-token': tokens, '.rule-copy': copies,
    '.queued-feature': copies,
  })[selector] ?? [];
  figure.querySelector = selector => ({
    '.rule-return': returnPath, '.return-token': returnToken,
    '.feature-arrival': branches[0], '.arrival-token': tokens[0],
    '.readiness-route': branches[1], '.readiness-token': tokens[1],
    '.readiness-return': returnPath, '.rework-token': returnToken,
  })[selector];
  const replay = target();
  const pause = target();
  const controls = readiness ? 'readiness' : 'amplification';
  const slide = { querySelector: selector => ({
    [`[data-${controls}]`]: figure,
    [`[data-${controls}-action="replay"]`]: replay,
    [`[data-${controls}-action="pause"]`]: pause,
  })[selector] };
  const document = Object.assign(target(), {
    hidden: false, documentElement: target(), querySelector: () => slide,
  });
  if (pdf) document.documentElement.classList.add('print-pdf');
  const reduced = Object.assign(target(), { matches: reducedMotion });
  const frames = new Map();
  let id = 0;
  let now = 0;
  const view = Object.assign(target(), {
    document, matchMedia: () => reduced,
    requestAnimationFrame(callback) { frames.set(++id, callback); return id; },
    cancelAnimationFrame(key) { frames.delete(key); },
  });
  const deck = Object.assign(target(), {
    current: slide, overview: false, paused: false,
    getCurrentSlide() { return this.current; },
    isOverview() { return this.overview; },
    isPaused() { return this.paused; },
  });
  deck.on = deck.addEventListener;
  (readiness ? setupReadiness : setupAmplification)(deck, view);
  return {
    deck, view, document, figure, runners, tokens, copies, returnToken, replay, pause, reduced, frames, slide,
    advance(milliseconds) {
      now += milliseconds;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(now));
    },
  };
}

test('amplification copies one rule on each fast turn and returns it before the next emission', () => {
  for (const [time, count] of [[0, 0], [999, 0], [1000, 1], [2999, 1], [3000, 2], [5000, 3], [6000, 3]]) {
    assert.equal(amplificationFrame(time).copies, count);
  }
  assert.equal(amplificationFrame(750).outward, .5);
  assert.equal(amplificationFrame(1400).returning, .5);
  assert.equal(amplificationFrame(1800).returning, null);
  assert.equal(amplificationFrame(2500).outward, 0);
  assert.deepEqual(amplificationFrame(6000), {
    planningAngle: 90, implementationAngle: 1080, copies: 3, outward: null, returning: null,
  });
  assert.deepEqual(amplificationFrame(16000), amplificationFrame(6000));
});

test('amplification moves matching tokens, accumulates copies, freezes, and replays', () => {
  const h = amplificationHarness();
  h.advance(0);
  h.advance(750);
  assert.ok(h.tokens.every(token => token.style.opacity === '1' && token.style.transform === 'translate(50px, 25px)'));
  assert.equal(h.figure.dataset.copies, '0');
  h.advance(650);
  assert.equal(h.figure.dataset.copies, '1');
  assert.equal(h.copies.filter(copy => copy.style.opacity === '1').length, 3);
  assert.equal(h.returnToken.style.transform, 'translate(50px, 25px)');
  h.advance(4600);
  assert.equal(h.figure.dataset.copies, '3');
  assert.ok(h.copies.every(copy => copy.style.opacity === '1'));
  assert.equal(h.runners[0].style.transform, 'rotate(90deg)');
  assert.equal(h.runners[1].style.transform, 'rotate(1080deg)');
  assert.equal(h.frames.size, 0);
  assert.equal(h.pause.disabled, true);
  h.replay.emit('click');
  assert.equal(h.figure.dataset.copies, '0');
  assert.equal(h.pause.disabled, false);
  assert.equal(h.frames.size, 1);
});

test('amplification pauses the whole scene and excludes hidden or paused time', () => {
  const h = amplificationHarness();
  h.advance(0);
  h.advance(1000);
  const position = h.runners[1].style.transform;
  h.pause.emit('click');
  assert.equal(h.pause.textContent, 'Resume motion');
  assert.equal(h.frames.size, 0);
  h.advance(10000);
  assert.equal(h.runners[1].style.transform, position);
  h.pause.emit('click');
  h.advance(0);
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  h.advance(10000);
  assert.equal(h.frames.size, 0);
  h.document.hidden = false;
  h.document.emit('visibilitychange');
  h.advance(0);
  h.deck.paused = true;
  h.deck.emit('paused');
  h.advance(10000);
  assert.equal(h.frames.size, 0);
  h.deck.paused = false;
  h.deck.emit('resumed');
  h.advance(0);
  h.advance(4999);
  assert.equal(h.pause.disabled, false);
  h.advance(1);
  assert.equal(h.pause.disabled, true);
});

test('amplification static modes show all consequences and restore the saved sequence', () => {
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    const h = amplificationHarness(options);
    assert.equal(h.figure.dataset.copies, '3');
    assert.equal(h.frames.size, 0);
    assert.equal(h.replay.hidden, true);
    assert.ok(h.copies.every(copy => copy.style.opacity === '1'));
    h.replay.emit('click');
    assert.equal(h.frames.size, 0);
  }
  const h = amplificationHarness();
  h.advance(0);
  h.advance(1400);
  h.pause.emit('click');
  const position = h.runners[1].style.transform;
  h.deck.overview = true;
  h.deck.emit('overviewshown');
  assert.equal(h.figure.dataset.copies, '3');
  h.deck.overview = false;
  h.deck.emit('overviewhidden');
  assert.equal(h.figure.dataset.copies, '1');
  assert.equal(h.runners[1].style.transform, position);
  h.view.emit('beforeprint');
  assert.equal(h.figure.dataset.copies, '3');
  h.view.emit('afterprint');
  assert.equal(h.figure.dataset.copies, '1');
  assert.equal(h.pause.textContent, 'Resume motion');
  h.reduced.matches = true;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.copies, '3');
  assert.equal(h.frames.size, 0);
  h.reduced.matches = false;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.copies, '1');
  assert.equal(h.frames.size, 0);
});

test('amplification stops on exit and restarts on slide or persisted-page re-entry', () => {
  const h = amplificationHarness();
  h.advance(0);
  h.advance(1400);
  h.deck.current = {};
  h.deck.emit('slidechanged');
  assert.equal(h.frames.size, 0);
  assert.equal(h.figure.dataset.copies, '3');
  h.deck.current = h.slide;
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.copies, '0');
  assert.equal(h.frames.size, 1);
  h.view.emit('pagehide');
  assert.equal(h.frames.size, 0);
  assert.equal(h.figure.dataset.copies, '3');
  h.view.emit('pageshow', { persisted: true });
  assert.equal(h.figure.dataset.copies, '0');
  assert.equal(h.frames.size, 1);
});

test('amplification has a complete no-script view and its controller is built locally', async () => {
  const body = byId['feedback-window'].body;
  assert.match(body, /data-copies="3"/);
  assert.equal((body.match(/class="rule-copy"/g) ?? []).length, 9);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.doesNotMatch(theme, /\.rule-copy[^{}]*\{[^}]*opacity:\s*0/);
  const source = await readFile(new URL('./amplification.mjs', import.meta.url), 'utf8');
  const built = await readFile(new URL('./dist/amplification.mjs', import.meta.url), 'utf8');
  assert.equal(built, source);
});

test('readiness arrivals exceed service capacity and preserve feature accounting', () => {
  assert.equal(readinessFrame(425).incoming, .5);
  assert.equal(readinessFrame(599).pending, 0);
  assert.equal(readinessFrame(600).pending, 1);
  assert.equal(readinessFrame(4200).servicing, .5);
  assert.equal(readinessFrame(5000).returning, .5);
  for (let time = 0; time <= 6000; time += 50) {
    const state = readinessFrame(time);
    assert.ok(state.pending >= 0 && state.pending <= 7);
    assert.equal(state.arrived, state.pending + state.completed + (state.servicing === null ? 0 : 1));
  }
  assert.deepEqual(readinessFrame(6000), {
    implementationAngle: 2880, readinessAngle: 240, arrived: 8, pending: 7, completed: 1,
    incoming: null, servicing: null, returning: null,
  });
  assert.deepEqual(readinessFrame(-1), readinessFrame(0));
  assert.deepEqual(readinessFrame(16000), readinessFrame(6000));
});

test('readiness moves features and rework, accumulates a backlog, freezes, and replays', () => {
  const h = amplificationHarness({ readiness: true });
  h.advance(0);
  h.advance(425);
  assert.equal(h.tokens[0].style.transform, 'translate(50px, 25px)');
  assert.equal(h.figure.dataset.pending, '0');
  h.advance(1775);
  assert.equal(h.figure.dataset.pending, '3');
  assert.equal(h.copies.filter(copy => copy.style.opacity === '1').length, 3);
  h.advance(2000);
  assert.equal(h.tokens[1].style.transform, 'translate(50px, 25px)');
  h.advance(800);
  assert.equal(h.returnToken.style.transform, 'translate(50px, 25px)');
  h.advance(1000);
  assert.equal(h.figure.dataset.pending, '7');
  assert.ok(h.copies.every(copy => copy.style.opacity === '1'));
  assert.equal(h.runners[0].style.transform, 'rotate(2880deg)');
  assert.equal(h.runners[1].style.transform, 'rotate(240deg)');
  assert.equal(h.frames.size, 0);
  assert.equal(h.pause.disabled, true);
  h.replay.emit('click');
  assert.equal(h.figure.dataset.pending, '0');
  assert.equal(h.frames.size, 1);
  h.advance(0);
  h.advance(1000);
  h.pause.emit('click');
  const angle = h.runners[0].style.transform;
  h.advance(10000);
  assert.equal(h.runners[0].style.transform, angle);
  assert.equal(h.frames.size, 0);
  assert.equal(h.pause.textContent, 'Resume motion');
});

test('readiness static modes retain the backlog and restore saved active time', () => {
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    const h = amplificationHarness({ readiness: true, ...options });
    assert.equal(h.figure.dataset.pending, '7');
    assert.equal(h.frames.size, 0);
    assert.equal(h.replay.hidden, true);
    assert.ok(h.copies.every(copy => copy.style.opacity === '1'));
  }
  const h = amplificationHarness({ readiness: true });
  h.advance(0);
  h.advance(2200);
  h.deck.overview = true;
  h.deck.emit('overviewshown');
  assert.equal(h.figure.dataset.pending, '7');
  h.deck.overview = false;
  h.deck.emit('overviewhidden');
  assert.equal(h.figure.dataset.pending, '3');
  h.view.emit('beforeprint');
  assert.equal(h.figure.dataset.pending, '7');
  h.view.emit('afterprint');
  assert.equal(h.figure.dataset.pending, '3');
  h.advance(0);
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  h.advance(10000);
  assert.equal(h.frames.size, 0);
  h.document.hidden = false;
  h.document.emit('visibilitychange');
  h.advance(0);
  h.advance(3800);
  assert.equal(h.figure.dataset.pending, '7');
  assert.equal(h.pause.disabled, true);
  h.deck.current = {};
  h.deck.emit('slidechanged');
  assert.equal(h.frames.size, 0);
  h.deck.current = h.slide;
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.pending, '0');
  h.view.emit('pagehide');
  assert.equal(h.frames.size, 0);
  h.view.emit('pageshow', { persisted: true });
  assert.equal(h.figure.dataset.pending, '0');
  assert.equal(h.frames.size, 1);
});

test('readiness and shared motion ship locally with complete no-script meaning', async () => {
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.doesNotMatch(theme, /\.queued-feature[^{}]*\{[^}]*opacity:\s*0/);
  for (const file of ['readiness.mjs', 'finite-motion.mjs']) {
    const source = await readFile(new URL(`./${file}`, import.meta.url), 'utf8');
    const built = await readFile(new URL(`./dist/${file}`, import.meta.url), 'utf8');
    assert.equal(built, source);
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.match(presentation, /setupReadiness\(deck\)/);
});

test('presentation title, shared headers, and single-subtitle cover match source and build', async () => {
  const title = 'Hypervelocity Engineering - Why adding AI to the SDLC is not enough';
  const headerTitle = 'Hypervelocity Engineering • Why adding AI to the SDLC is not enough';
  const checkHeaders = html => {
    const headers = [...html.matchAll(/<a class="wordmark" href="#\/hve">([\s\S]*?)<\/a>/g)];
    assert.equal(headers.length, slides.length - 1);
    for (const [, label] of headers) assert.equal(text(label).replace(/\s+/g, ' '), headerTitle);
    assert.doesNotMatch(html, /Expert teams\. Shared outcomes\./);
  };
  const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.presentation.title, title);
  assert.equal(text(byId.hve.title).replace(/\s+/g, ' '), 'Hypervelocity Engineering Why adding AI to the SDLC is not enough');
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.opening h2 em\s*\{[^}]*font-style:\s*normal;/);
  const heading = `<h2>${byId.hve.title}</h2>`;
  assert.ok(renderSlides().includes(heading));
  checkHeaders(renderSlides());
  for (const file of ['./index.html', './dist/index.html']) {
    const html = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], title, file);
    if (file === './dist/index.html') {
      assert.ok(html.includes(heading));
      checkHeaders(html);
    }
  }
});

test('the cover includes the Microsoft mark and a locally built presenter photo', async () => {
  const opening = renderSlides().match(/<section id="hve"[\s\S]*?<\/section>/)?.[0];
  assert.match(opening, /class="cover-brand" role="img" aria-label="Microsoft"/);
  for (const color of ['#F25022', '#7FBA00', '#00A4EF', '#FFB900']) assert.ok(opening.includes(color));
  assert.match(opening, /src="\.\/images\/daniel-scott-raynsford\.jpg" alt="Daniel Scott-Raynsford"/);
  assert.doesNotMatch(opening, /https:\/\/avatars\.githubusercontent\.com/);
  const original = await readFile(new URL('./images/daniel-scott-raynsford.jpg', import.meta.url));
  const built = await readFile(new URL('./dist/images/daniel-scott-raynsford.jpg', import.meta.url));
  assert.deepEqual(built, original);
  assert.deepEqual([...built.subarray(0, 3)], [0xff, 0xd8, 0xff]);
});

test('the customer stays inside the loop and the team pass works alone', () => {
  assert.match(text(byId.recap.body), /Customer \+ expert crew/);
  assert.match(byId.recap.body, /data-hve-loop/);
  for (const id of ['recap']) {
    assert.match(byId[id].body, /data-hve-loop/);
    assert.match(byId[id].body, /Idea/);
    assert.match(byId[id].body, /Validation/);
    assert.match(byId[id].body, /Engineering/);
    assert.match(byId[id].body, /Feedback/);
  }
  const pass = byId['team-pass'];
  const close = text(pass.body);
  assert.match(pass.title, /Explore HVE-Core/);
  assert.match(pass.title, /Apply HVE together/);
  for (const phrase of ['One team', 'One real outcome', 'Official documentation', 'Your role guide',
    'Live demo', 'See one change, end to end.', 'Start with one team and one real outcome']) {
    assert.ok(close.includes(phrase), `team pass names "${phrase}"`);
  }
  assert.equal((pass.body.match(/class="close-badge /g) ?? []).length, 4);
  for (const route of ['#/demo-install', 'data-action="pause"']) {
    assert.ok(pass.body.includes(route), `team pass routes to ${route}`);
  }
  assert.ok(!pass.body.includes('#/deep-dive'));
  assert.doesNotMatch(`${pass.title} ${pass.body} ${pass.notes}`, /Optional session|Not required to board/);
});

test('the three chapters label every leadership header and mark each divider', () => {
  assert.deepEqual(chapters, ['The outcome gap', 'How HVE changes the work', 'Making it real']);
  const rendered = renderSlides();
  const section = id => rendered.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`))[0];
  const chapterOf = new Map();
  slides.slice(1, 8).forEach(slide => chapterOf.set(slide.id, 1));
  slides.slice(8, 19).forEach(slide => chapterOf.set(slide.id, 2));
  slides.slice(19, 23).forEach(slide => chapterOf.set(slide.id, 3));
  assert.equal(chapterOf.size, 22);
  for (const [id, chapter] of chapterOf) {
    const html = section(id);
    const header = html.match(/<header class="chrome-top">[\s\S]*?<\/header>/)[0];
    assert.equal(text(header.match(/<span class="part-label">([\s\S]*?)<\/span>/)[1]).replace(/\s+/g, ' '),
      `Chapter ${chapter} of 3 · ${chapters[chapter - 1]}`, id);
    assert.equal((header.match(/<u class="on"><\/u>/g) ?? []).length, chapter, `${id}: filled marks`);
    assert.equal((header.match(/<u/g) ?? []).length, 3, `${id}: total marks`);
    assert.match(header, /<i class="hdr-bar" aria-hidden="true">/);
  }
  for (const [id, chapter] of [['outcomes-question', 1], ['outcomes-response', 2], ['outcomes-action', 3]]) {
    const html = section(id);
    const kicker = html.match(/<p class="kicker">([\s\S]*?)<\/p>/)[1];
    assert.equal(text(kicker.match(/<b>([\s\S]*?)<\/b>/)[1]), `Chapter ${chapter} of 3`);
    assert.equal((kicker.match(/<u class="on"><\/u>/g) ?? []).length, 1);
    assert.match(kicker, /^<b>[^<]+<\/b><i class="kicker-bar" aria-hidden="true">(?:<u(?: class="on")?><\/u>){3}<\/i>$/);
    assert.equal((kicker.match(/<u/g) ?? []).length, 3);
    assert.ok(html.indexOf('class="kicker"') < html.indexOf('<h2>'));
    assert.equal(byId[id].className, 'section-divider');
  }
  assert.equal((rendered.match(/class="kicker"/g) ?? []).length, 3);
  const deeper = section('deep-dive').match(/<header class="chrome-top">[\s\S]*?<\/header>/)[0];
  assert.match(deeper, /<span class="part-label"><b>Diving deeper into HVE-Core<\/b><\/span>/);
  const demos = section('demo-install').match(/<header class="chrome-top">[\s\S]*?<\/header>/)[0];
  assert.match(demos, /<span class="part-label"><b>Demos<\/b> · Public teaching scenario<\/span>/);
  for (const header of [deeper, demos, section('team-pass').match(/<header class="chrome-top">[\s\S]*?<\/header>/)[0]]) {
    assert.doesNotMatch(header, /hdr-bar|Chapter \d of 3/);
  }
  assert.match(section('hve'), /class="cover-brand"/);
  assert.doesNotMatch(section('hve'), /class="chrome-top"|class="kicker"/);
  assert.match(rendered, /<a href="#\/deep-dive"[^>]*>Diving deeper into HVE-Core<\/a>/);
  assert.doesNotMatch(rendered, /Optional HVE-Core/);
});

test('the chapter header, kicker, and wrap slide styles ship in the theme', async () => {
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  for (const selector of ['.hdr-bar', '.hdr-bar u.on', '.section-divider .kicker', '.kicker-bar', '.kicker-bar u.on',
    '#hve-core-open .wr-scene', '#hve-core-open .wr-qr', '#hve-core-open .wr-code svg', '#hve-core-open .wr-facts',
    '#team-pass .close-scene']) {
    assert.ok(theme.includes(selector), `theme defines ${selector}`);
  }
  assert.doesNotMatch(theme, /leadership-close/);
  assert.match(theme, /\.chrome-top\s*\{[^}]*font-size:\s*14px;/);
});

test('slide 23 wraps up for leaders with two QR codes and three facts about HVE-Core', () => {
  const slide = byId['hve-core-open'];
  assert.equal(slides[22].id, slide.id);
  assert.equal(slide.part, 'leadership');
  assert.equal(slide.minutes, 1.75);
  assert.equal(slide.className, 'closing');
  assert.equal(slide.title, 'HVE-Core is open source.<br><em>Make it yours.</em>');
  assert.deepEqual(slide.sources, ['repo', 'core', 'guide', 'roles']);
  assert.equal(sources.repo[1], 'https://github.com/microsoft/hve-core');
  const content = text(slide.body);
  for (const phrase of ['GitHub repo', 'Docs site', 'github.com', '/microsoft/hve-core', 'microsoft.github.io',
    '/hve-core/docs', 'Open source', 'Maintained by Microsoft. Pull requests welcome.', 'Stay current',
    'Fork it. Merge upstream changes when ready.', 'Make it yours',
    'Use what helps. Drop the rest. Keep your spec-driven and other workflows.']) {
    assert.ok(content.includes(phrase), `wrap slide names "${phrase}"`);
  }
  assert.equal((slide.body.match(/<svg class="qr"/g) ?? []).length, 2);
  assert.equal((slide.body.match(/class="wr-qr /g) ?? []).length, 2);
  assert.equal((slide.body.match(/class="wr-fact /g) ?? []).length, 3);
  assert.ok(slide.body.includes('aria-label="QR code for the HVE-Core repository on GitHub"'));
  assert.ok(slide.body.includes('aria-label="QR code for the HVE-Core documentation site"'));
  for (const route of ['href="#/deep-dive"', 'Diving deeper into HVE-Core', 'data-action="pause"']) {
    assert.ok(slide.body.includes(route), `wrap slide includes ${route}`);
  }
  assert.ok(text(`${slide.title} ${slide.body}`).split(/\s+/).length <= 85);
  assert.doesNotMatch(`${slide.title} ${slide.body} ${slide.notes}`, /dashed|certified|guarantee[sd]?\s+(results|savings)|—/i);
  assert.match(slide.notes, /Scan the left code for the GitHub repository/);
  assert.match(slide.notes, /fork has an ongoing maintenance cost/i);
  assert.match(slide.notes, /not as a stable platform or a production dependency/);
  assert.match(slide.notes, /does not supply sponsorship, customer time, authority, or review capacity/);
});

test('slide 20 opens chapter three as a quiet divider', () => {
  const slide = byId['outcomes-action'];
  assert.equal(slides[19].id, slide.id);
  assert.equal(slide.part, 'leadership');
  assert.equal(slide.className, 'section-divider');
  assert.equal(slide.body, '');
  assert.equal(slide.minutes, 0.25);
  assert.equal(text(slide.title).replace(/\s+/g, ' '), 'How do we make HVE real in our teams?');
  assert.match(slide.title, /<strong>real in our teams\?<\/strong>/);
  assert.doesNotMatch(slide.title, /<br|fragment/);
  assert.equal(slides[20].id, 'framework-toolkit');
});

test('the encoder draws valid QR codes without a package dependency', async () => {
  const digest = value => createHash('sha256').update(value).digest('hex');
  const rows = ({ modules }) => modules.map(row => row.map(dark => (dark ? '1' : '0')).join('')).join('\n');
  const fixtures = [
    ['https://github.com/microsoft/hve-core', 3, 29, 0, '26b85f59f274695081588cd53e9c8bb9fd9971a520afe50761658fe38a70aa71'],
    ['https://microsoft.github.io/hve-core/docs/', 3, 29, 3, 'dd608c6403860e02a837a7c7ad2c8932f56558c3ec19e7a02128b1e133d48fb1'],
  ];
  for (const [url, version, size, mask, hash] of fixtures) {
    const matrix = qrMatrix(url);
    assert.equal(matrix.version, version);
    assert.equal(matrix.size, size);
    assert.equal(matrix.mask, mask);
    assert.equal(digest(rows(matrix)), hash, url);
    assert.equal(rows(qrMatrix(url, { mask })), rows(matrix));
  }
  const { modules, size } = qrMatrix('https://example.com/');
  const dark = (row, col) => modules[row][col];
  for (const [top, left] of [[0, 0], [0, size - 7], [size - 7, 0]]) {
    for (let i = 0; i < 7; i++) {
      for (const [r, c] of [[top, left + i], [top + 6, left + i], [top + i, left], [top + i, left + 6]]) {
        assert.ok(dark(r, c), `finder ring at ${r},${c}`);
      }
    }
    assert.ok(dark(top + 3, left + 3));
    assert.ok(!dark(top + 1, left + 1));
  }
  for (let i = 8; i < size - 8; i++) {
    assert.equal(dark(6, i), i % 2 === 0, `row timing at ${i}`);
    assert.equal(dark(i, 6), i % 2 === 0, `column timing at ${i}`);
  }
  assert.ok(dark(size - 8, 8), 'dark module');
  const generatorBits = 0b10100110111;
  const remainder = value => {
    let result = value << 10;
    for (let bit = 14; bit >= 10; bit--) if ((result >>> bit) & 1) result ^= generatorBits << (bit - 10);
    return result;
  };
  for (const mask of [0, 3, 7]) {
    const { modules: grid } = qrMatrix('https://example.com/', { mask });
    let bits = 0;
    for (let i = 0; i < 15; i++) {
      const [row, col] = i < 6 ? [i, 8] : i < 8 ? [i + 1, 8] : i === 8 ? [8, 7] : [8, 14 - i];
      bits |= (grid[row][col] ? 1 : 0) << i;
    }
    const word = bits ^ 0b101010000010010;
    assert.equal(remainder(word >>> 10) ^ (word & 0x3ff), 0, `format information for mask ${mask}`);
    assert.equal((word >>> 13) & 0b11, 0b00, 'error correction level M');
    assert.equal((word >>> 10) & 0b111, mask);
  }
  assert.equal(qrMatrix('a'.repeat(14)).version, 1);
  assert.equal(qrMatrix('a'.repeat(15)).version, 2);
  assert.equal(qrMatrix('a'.repeat(106)).version, 6);
  assert.throws(() => qrMatrix('a'.repeat(107)), RangeError);
  for (const mask of [-1, 8, 1.5, '1']) assert.throws(() => qrMatrix('hello', { mask }), RangeError);
  const svg = qrSvg('https://example.com/?a=1&b="2"', { label: 'A <b> & "c"' });
  assert.match(svg, /^<svg class="qr" [^>]*role="img" aria-label="A &#60;b&#62; &#38; &#34;c&#34;"/);
  assert.match(svg, /viewBox="0 0 37 37"/);
  assert.match(qrSvg('https://example.com/'), /aria-label="QR code for https:\/\/example\.com\/"/);
  assert.match(qrSvg('https://example.com/', { quiet: 2 }), /viewBox="0 0 29 29"/);
  for (const file of ['bodies-leadership.mjs', 'deck.mjs', 'qr.mjs', 'build.mjs', 'slides.mjs']) {
    const source = await readFile(new URL(`./${file}`, import.meta.url), 'utf8');
    assert.doesNotMatch(source, /from ['"](?:qrcode|uqr|qrcode-generator|qr-image)['"]/, file);
  }
});

test('the selected Flowing blend uses haze and fine ribbons across all 41 slides', async () => {
  const rendered = renderSlides();
  for (const preset of ['cover-cradle', 'split-diagonal', 'stream-progression', 'center-halo', 'dual-column-contrast', 'rising-twist']) {
    assert.match(rendered, new RegExp(`slide-wave-${preset}|data-wave="${preset}"`));
  }
  assert.equal((rendered.match(/data-style="flowing-blend"/g) ?? []).length, 41);
  assert.match(rendered, /stop-color="#f8c49c" stop-opacity="\.36"/);
  assert.match(rendered, /stop-color="#c9b3ed" stop-opacity="\.36"/);
  assert.match(rendered, /<feGaussianBlur stdDeviation="30"\/>/);
  assert.match(rendered, /stroke-width="1\.5" opacity="\.95"/);
  assert.doesNotMatch(rendered, /<animate|<set\b/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /prefers-reduced-motion/);
});

test('background SVG definitions are unique and resolve inside each slide', () => {
  const rendered = renderSlides();
  const ids = [...rendered.matchAll(/id="(wave-[^"]+)"/g)].map(([, id]) => id);
  assert.equal(ids.length, slides.length * 5);
  assert.equal(new Set(ids).size, ids.length);
  const backgrounds = [...rendered.matchAll(/<svg class="slide-wave"[\s\S]*?<\/svg>/g)];
  assert.equal(backgrounds.length, slides.length);
  for (const [html] of backgrounds) {
    const definitions = new Set([...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => id));
    for (const [, reference] of html.matchAll(/url\(#([^)]+)\)/g)) assert.ok(definitions.has(reference), reference);
    assert.match(html, /aria-hidden="true"/);
  }
  assert.throws(() => waveBackground('unknown'), /Unknown wave preset/);
  assert.throws(() => waveBackground('__proto__'), /Unknown wave preset/);
  assert.throws(() => waveBackground('cover-cradle', 'bad" id'), /Wave instance id/);
});

test('visible content is concise and every slide has notes and public sources', () => {
  for (const item of slides) {
    const words = text(`${item.title} ${item.body}`).split(/\s+/);
    assert.ok(words.length <= 85, `${item.id}: ${words.length} visible words`);
    assert.ok(item.notes.length >= 100, `${item.id}: presenter guidance is missing`);
    assert.ok(item.sources.length > 0);
    for (const key of item.sources) assert.ok(sources[key]?.[1].startsWith('https://'));
  }
  assert.doesNotMatch(renderedContent(), /youtube|simpsons|vibe.?cod|OneDrive|20261006_|pasted-text/i);
  assert.equal((renderSlides().match(/<aside class="notes">/g) ?? []).length, 41);
});

function renderedContent() {
  return renderSlides();
}

test('slide timings match the approved outline allocations', async () => {
  const outline = await readFile(new URL('./OUTLINE.md', import.meta.url), 'utf8');
  const currentOutline = outline.split('## Evolution log')[0];
  const numberedRows = [...currentOutline.matchAll(/^\| (\d+) \|/gm)].map(([, number]) => Number(number));
  const slideNumbers = slides.map((_, index) => index + 1);
  assert.deepEqual(numberedRows, [...slideNumbers, ...slideNumbers]);
  for (const [letter, part] of [['A', 'leadership'], ['B', 'deep-dive']]) {
    const section = outline.split(`## Part ${letter}:`)[1].split('\n## ')[0];
    const timings = section.split('\n').filter(row => /^\| \d+ \|/.test(row))
      .map(row => Number(row.split('|').at(-2).trim()));
    assert.deepEqual(slides.filter(item => item.part === part).map(item => item.minutes), timings);
  }
});

test('internal routes resolve to actual slides', () => {
  const ids = new Set(slides.map(item => item.id));
  for (const [, id] of renderSlides().matchAll(/href="#\/([^"]+)"/g)) assert.ok(ids.has(id), id);
});

test('speaker notes escape text and the build uses local runtime assets', async () => {
  assert.equal(escapeHtml('<&"\'>'), '&lt;&amp;&quot;&#39;&gt;');
  const html = await readFile(new URL('./dist/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/<section id=/g) ?? []).length, 41);
  assert.doesNotMatch(html, /<!-- SLIDES -->|<script[^>]+src="https?:|<link[^>]+href="https?:/);
  const assets = [
    'vendor/reveal.mjs',
    'vendor/reveal.css',
    'vendor/plugin/notes.mjs',
    'vendor/LICENSE',
    'theme.css',
    'presentation.mjs',
    'annotations.mjs',
    'speaker-window.mjs',
    'cadence.mjs',
  ];
  for (const asset of assets) {
    assert.ok((await readFile(new URL(`./dist/${asset}`, import.meta.url))).length > 0, asset);
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.match(presentation, /trackRelativeWindowPosition\(window, speakerWindow\)/);
  assert.match(presentation, /if \(!speakerWindow\) \{\s+toggleNotesPanel\(true\)/);
  const lock = JSON.parse(await readFile(new URL('./package-lock.json', import.meta.url), 'utf8'));
  assert.equal(lock.packages['node_modules/reveal.js'].version, '6.0.2');
  assert.ok(Object.values(lock.packages).every(pkg => !('resolved' in pkg)));
});

test('speaker popup follows deck movement and preserves its initial offset', () => {
  const sourceWindow = { screenX: 100, screenY: 70, closed: false };
  const moves = [];
  const speakerWindow = {
    screenX: 420,
    screenY: 90,
    closed: false,
    moveTo: (x, y) => moves.push([x, y]),
  };
  let tick;
  let timerId;
  let cancelledTimerId;
  const stop = trackRelativeWindowPosition(sourceWindow, speakerWindow, (callback, delay) => {
    assert.equal(delay, 100);
    tick = callback;
    timerId = 7;
    return timerId;
  }, id => {
    cancelledTimerId = id;
  });

  tick();
  assert.deepEqual(moves, []);
  sourceWindow.screenX = 160;
  sourceWindow.screenY = 95;
  tick();
  assert.deepEqual(moves, [[480, 115]]);
  tick();
  assert.deepEqual(moves, [[480, 115]]);
  stop();
  assert.equal(cancelledTimerId, timerId);
});

test('speaker popup tracking stops when either window closes', () => {
  for (const closedWindow of ['sourceWindow', 'speakerWindow']) {
    const sourceWindow = { screenX: 0, screenY: 0, closed: false };
    const speakerWindow = {
      screenX: 10,
      screenY: 10,
      closed: false,
      moveTo() { assert.fail('closed window must not move'); },
    };
    let tick;
    let cancelled = false;
    const windows = { sourceWindow, speakerWindow };
    const stop = trackRelativeWindowPosition(sourceWindow, speakerWindow, callback => {
      tick = callback;
      return 1;
    }, () => {
      cancelled = true;
    });

    windows[closedWindow].closed = true;
    tick();
    assert.equal(cancelled, true);
    stop();
  }
});

test('presentation tools map pointer positions to slide units at any scale', () => {
  assert.deepEqual(toSlidePoint(960, 540, { left: 0, top: 0, width: 1920, height: 1080 }), { x: 640, y: 360 });
  assert.deepEqual(toSlidePoint(420, 230, { left: 100, top: 50, width: 640, height: 360 }), { x: 640, y: 360 });
  assert.deepEqual(normalizeRect({ x: 50, y: 90 }, { x: 10, y: 20 }), { x: 10, y: 20, width: 40, height: 70 });
});

test('preview serves HTML and modules, rejects missing files, bad URLs, and writes', async t => {
  const server = createPreviewServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  const base = `http://127.0.0.1:${server.address().port}`;
  const home = await fetch(`${base}/?print-pdf`);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Hypervelocity/);
  const module = await fetch(`${base}/vendor/reveal.mjs`);
  assert.equal(module.status, 200);
  assert.match(module.headers.get('content-type'), /javascript/);
  const photo = await fetch(`${base}/images/daniel-scott-raynsford.jpg`);
  assert.equal(photo.status, 200);
  assert.match(photo.headers.get('content-type'), /image\/jpeg/);
  assert.deepEqual(Buffer.from(await photo.arrayBuffer()),
    await readFile(new URL('./dist/images/daniel-scott-raynsford.jpg', import.meta.url)));
  for (const name of ['my-part-is-done.png', 'shared-goal.png']) {
    const image = await fetch(`${base}/images/${name}`);
    assert.equal(image.status, 200);
    assert.equal(image.headers.get('content-type'), 'image/png');
    assert.deepEqual(Buffer.from(await image.arrayBuffer()),
      await readFile(new URL(`./dist/images/${name}`, import.meta.url)));
    const head = await fetch(`${base}/images/${name}`, { method: 'HEAD' });
    assert.equal(head.status, 200);
    assert.equal(head.headers.get('content-type'), 'image/png');
    assert.equal((await head.arrayBuffer()).byteLength, 0);
  }
  for (const path of ['/vendor%2freveal.mjs', '/vendor%5creveal.mjs']) {
    const asset = await fetch(`${base}${path}`);
    assert.equal(asset.status, 200, path);
    assert.match(asset.headers.get('content-type'), /javascript/);
    assert.equal(await asset.text(), await readFile(new URL('./dist/vendor/reveal.mjs', import.meta.url), 'utf8'));
    const head = await fetch(`${base}${path}`, { method: 'HEAD' });
    assert.equal(head.status, 200, path);
    assert.match(head.headers.get('content-type'), /javascript/);
    assert.equal(await head.text(), '');
  }
  assert.equal((await fetch(`${base}/missing-file`)).status, 404);
  assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${base}/%zz`)).status, 400);
  for (const path of [
    '/..%5cpackage.json',
    '/..%2fpackage.json',
    '/vendor%5c..%2f..%5cpackage.json',
    '/..%2fdist-sibling%2findex.html',
  ]) {
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(`${base}${path}`, { method });
      assert.equal(response.status, 403, `${method} ${path}`);
      assert.equal(await response.text(), method === 'HEAD' ? '' : 'Path is outside the presentation');
    }
  }
});
