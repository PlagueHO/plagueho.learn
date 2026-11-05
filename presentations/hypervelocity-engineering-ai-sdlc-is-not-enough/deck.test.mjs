/**
 * Check the presentation structure, content, visual direction, build, and server.
 * Parameters: none. Build the deck first.
 * Usage: npm run build && npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { slides, sources, renderSlides, escapeHtml } from './deck.mjs';
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

test('40 slides preserve the 30 + 30 minute structure', () => {
  assert.equal(slides.length, 40);
  assert.equal(new Set(slides.map(slide => slide.id)).size, 40);
  for (const [part, count] of [['leadership', 25], ['deep-dive', 10], ['demos', 5]]) {
    const section = slides.filter(slide => slide.part === part);
    assert.equal(section.length, count);
    if (part !== 'demos') assert.equal(section.reduce((sum, item) => sum + item.minutes, 0), 30);
    else assert.ok(section.every(item => item.minutes === undefined));
  }
  assert.equal(slides[24].id, 'leadership-close');
  assert.equal(slides[25].id, 'deep-dive');
  assert.equal(slides[35].id, 'demo-install');
  assert.equal(slides[39].id, 'recap');
});

test('slide order follows the approved narrative and pillar examples', () => {
  assert.deepEqual(slides.map(item => item.id), [
    'hve', 'delivery-eras', 'outcomes-question', 'agentic-cracks', 'handoffs', 'dashboard-request',
    'feedback-window', 'production-early', 'outcomes-response', 'hve-model', 'constraints-pillars', 'teams', 'team-example',
    'design-thinking', 'design-example', 'accelerators', 'accelerator-example', 'lifecycle-ai',
    'lifecycle-example', 'evidence-judgment', 'supported-loop', 'organization-boundary', 'experiment',
    'capability-transfer', 'leadership-close', 'deep-dive', 'toolkit', 'context', 'dt-coach',
    'handoff-contract', 'rpi', 'review', 'cost', 'plugin-model', 'demo-route', 'demo-install',
    'demo-discovery', 'demo-handoff', 'demo-rpi', 'recap',
  ]);
  assert.equal(byId.hve.title, 'Hypervelocity Engineering<em>Why adding AI to the SDLC is not enough</em>');
  assert.equal((byId.hve.title.match(/<em>/g) ?? []).length, 1);
  assert.match(text(byId.hve.body), /Daniel Scott-Raynsford/);
  assert.match(byId.hve.body, /<span>Sr\. Partner Solution Architect • AI &amp; Apps • Microsoft EPS<\/span>/);
  assert.doesNotMatch(byId.hve.body, /cover-sub|cover-scope/);
  assert.match(byId.hve.notes, /when building becomes faster than deciding/);
  assert.match(text(byId['dashboard-request'].body), /Reduce order calls\.\s+Build an AI chatbot/);
  assert.match(text(byId['team-example'].body), /shift handover/);
  assert.match(text(byId['design-example'].body), /Compare options/);
  assert.match(text(byId['accelerator-example'].body), /Still verify/);
  assert.match(text(byId['lifecycle-ai'].body), /AI-powered product/);
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
    if (index % 2 === 0) assert.match(byId[id].title, new RegExp(`^Pillar ${number}: [^<]+\\.<br><em>[^<]+\\.</em>$`));
    else assert.match(byId[id].title, /^Example:/);
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

test('presentation title and single-subtitle cover match source and build', async () => {
  const title = 'Hypervelocity Engineering - Why adding AI to the SDLC is not enough';
  const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.presentation.title, title);
  assert.equal(text(byId.hve.title).replace(/\s+/g, ' '), 'Hypervelocity Engineering Why adding AI to the SDLC is not enough');
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.opening h2 em\s*\{[^}]*font-style:\s*normal;/);
  const heading = `<h2>${byId.hve.title}</h2>`;
  assert.ok(renderSlides().includes(heading));
  for (const file of ['./index.html', './dist/index.html']) {
    const html = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], title, file);
    if (file === './dist/index.html') assert.ok(html.includes(heading));
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

test('the customer stays inside the loop and the leadership close works alone', () => {
  assert.match(text(byId['supported-loop'].body), /Customer \+ expert crew/);
  assert.match(byId['supported-loop'].body, /data-hve-loop/);
  for (const id of ['supported-loop', 'recap']) {
    assert.match(byId[id].body, /data-hve-loop/);
    assert.match(byId[id].body, /Idea/);
    assert.match(byId[id].body, /Validation/);
    assert.match(byId[id].body, /Engineering/);
    assert.match(byId[id].body, /Feedback/);
  }
  assert.match(text(byId['leadership-close'].body), /HVE-Core/);
  assert.match(byId['leadership-close'].body, /Tools do not supply organizational commitments/);
  assert.match(text(byId['leadership-close'].body), /Customer time/);
  assert.match(text(byId['leadership-close'].body), /Decision ownership/);
  assert.match(byId['organization-boundary'].notes, /not an observed customer result/);
  assert.match(byId.experiment.notes, /AI usage are not success measures/);
});

test('the selected Flowing blend uses haze and fine ribbons across all 40 slides', async () => {
  const rendered = renderSlides();
  for (const preset of ['cover-cradle', 'split-diagonal', 'stream-progression', 'center-halo', 'dual-column-contrast', 'rising-twist']) {
    assert.match(rendered, new RegExp(`slide-wave-${preset}|data-wave="${preset}"`));
  }
  assert.equal((rendered.match(/data-style="flowing-blend"/g) ?? []).length, 40);
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
  assert.equal((renderSlides().match(/<aside class="notes">/g) ?? []).length, 40);
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
  assert.equal((html.match(/<section id=/g) ?? []).length, 40);
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
