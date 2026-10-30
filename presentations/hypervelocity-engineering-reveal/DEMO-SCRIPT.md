## Demo script: HVE-Core on the Kaiju Defense Network

This script is the live demo runbook for slides 35-39. It is presenter support, not a slide. The presenter explains each step. The script gives the commands, the prompts, the time budget, and the fallbacks.

### The demo in one paragraph

The demo runs on the public [Apex Dynamics Response Systems](https://github.com/PlagueHO/Apex-Dynamics-Response-Systems) repository. It is a mocked React dashboard for a kaiju defense network. One panel, the Single-Save Decision, lets an AI agent choose which of two cities to save. Today `chooseCityToSave()` in `src/components/LastStandScene.tsx` is a coin flip.

The demo moves from a vague problem to one small, reviewed change in about 30 minutes. Install HVE-Core, understand the problem with DT Coach, write a short PRD, then run RPI (Research, Plan, Implement, Review).

The chosen feature is an **accountable single-save decision**. The coin flip becomes a transparent score. The panel shows why it recommends a city and what it does not know. A person confirms or overrides the recommendation, and the reason is recorded.

This is teaching material on a mocked application. It is not a customer case study. It does not prove customer validation, production readiness, or delivery gains.

### Time plan

| Step | Slide | What happens | Minutes | Cut-off |
|---|---:|---|---:|---|
| 1 | 35 | Install HVE-Core with the Copilot CLI plugin route | 3 | 0:03 |
| 2 | 36 | DT Coach: two rounds, then a handoff | 7 | 0:10 |
| 3 | 37 | PRD Builder: no BRD, short Q&A | 5 | 0:15 |
| 4a | 38 | `/rpi-research` | 3 | 0:18 |
| 4b | 38 | `/rpi-plan` | 3 | 0:21 |
| 4c | 38 | `/rpi-implement phase=P01` | 4 | 0:25 |
| 4d | 38 | `/rpi-review`, then run the app | 3 | 0:28 |
| 5 | 39 | Recap: what the evidence shows, and what it does not | 2 | 0:30 |

Start every long agent step, then talk while it runs. Never wait in silence. At each cut-off, switch to the prepared fallback if the live step is not done. Label every prepared artifact as prepared.

### Before the demo

Do these steps the day before. Then do a full rehearsal.

1. Clone the repository. The local clone is ready.
1. Create a rehearsal branch and a live branch from `main`:

   ```powershell
   git switch -c demo/rehearsal main
   ```

1. Install the packages and check that the baseline is green:

   ```powershell
   npm ci
   npm test
   npm run build
   ```

1. Confirm that `.gitignore` already contains `.copilot-tracking/`. It does. Agent work files stay out of Git.
1. Run the whole demo once on `demo/rehearsal`. Time each step.
1. Copy the rehearsal artifacts to a folder outside the repository:

   ```powershell
   $fb = '..\apex-demo-fallback'
   New-Item -ItemType Directory -Force $fb | Out-Null
   Copy-Item .copilot-tracking "$fb\copilot-tracking" -Recurse -Force
   Copy-Item docs\project-planning "$fb\project-planning" -Recurse -Force
   ```

1. Commit the rehearsal code, then remove the rehearsal work files from the working folder. Untracked files do not follow a branch switch, so a leftover `.copilot-tracking` folder would give the live run old DT state:

   ```powershell
   git add -A
   git commit -m "Rehearsal: accountable single-save decision"
   Remove-Item .copilot-tracking -Recurse -Force
   ```

1. Create the live branch: `git switch -c demo/live main`. Check that `docs\project-planning` does not exist on it.
1. Reset HVE-Core so that the install step is real. This removes the marketplace registration and the plugins installed from it:

   ```powershell
   copilot plugin marketplace remove hve-core --force
   ```

1. Check the CLI help for the exact syntax of the version you will use: `copilot plugin --help`.
1. Decide how to handle tool approvals. Approval prompts cost time. Approve tools for this demo repository only.
1. Open these in advance: the terminal in the repository folder, the browser at `http://localhost:5173/` (start the dev server only at step 4d), and the fallback folder.

### Step 1: Install HVE-Core (3 minutes, slide 35)

Recommend the **GitHub Copilot CLI plugin route**, even for people who work in VS Code or VS Code Insiders.

Presenter position: one plugin install makes HVE-Core available in Copilot CLI, the GitHub Copilot app, and VS Code. You do not install it separately for each tool.

Verify before the talk: the public docs say the VS Code extension `ise-hve-essentials.hve-core` is the main route for VS Code users. They do not state the cross-tool behavior. Test it on your machine. Soften the claim if it does not hold.

```powershell
copilot plugin marketplace add microsoft/hve-core
copilot plugin install hve-core@hve-core
```

Then start Copilot CLI in the repository and confirm the capabilities:

```powershell
copilot
```

1. Run `/plugin` to browse the installed plugin.
1. Run `/agent` and confirm that **DT Coach**, **PRD Builder**, and **RPI Agent** are listed.
1. Type `/` and confirm that `rpi-research`, `rpi-plan`, `rpi-implement`, and `rpi-review` are listed.

Say it, do not skip it:

- The registration tracks `main`. It has no release gate and no release attestation.
- Update is two steps: `copilot plugin marketplace update hve-core`, then `copilot plugin update hve-core@hve-core`.
- Instruction files in a plugin are not applied automatically by path pattern in the CLI.

Fallback: show the prepared capture of the `/agent` list. Say that it is a capture.

### Step 2: Understand the problem with DT Coach (7 minutes, slide 36)

Select DT Coach with `/agent`. Its qualified name is `hve-core:dt-coach`. Describe the project in plain language. The old `/dt-start-project` and `/dt-handoff-problem-space` slash commands no longer exist. The coach starts and hands off from natural-language requests.

Use the project slug `kaiju-single-save-decision`. Coach files go to `.copilot-tracking/dt/kaiju-single-save-decision/`.

**Round 1: open the project.**

```text
Start a new Design Thinking project called kaiju-single-save-decision. Apex Dynamics Response Systems built the Kaiju Defense Network dashboard. It tracks kaiju moving across Puget Sound and recommends how to respond. One panel, the Single-Save Decision, has an AI agent choose which of two cities to save when only one can be saved. I know little about the code. Start with the problem, not the build: who relies on that recommendation, when it fails them, and why. This is a short live demo, so use Methods 1 to 3 only, keep each round brief, and do not take me into Brainstorming.
```

Expect a question about who relies on the recommendation and what happens today. Answer with this:

```text
Incident commanders and dispatchers rely on it, under time pressure. Today the agent picks Bremerton or Olympia and gives no reason. The commander must accept it within minutes and cannot explain it to the next shift. One dispatcher said a recommendation without who confirmed it is dangerous. The incident commander said he does not want a screen to command the incident.
```

**Round 2: use the stakeholder documents as research evidence.**

```text
Use the stakeholder calls, interviews, and emails in docs/pre-prototype as the research evidence for Methods 2 and 3. Read them now. Give me the stakeholders, the main themes, and a draft problem statement. Mark each finding as validated, assumed, unknown, or conflicting. Keep it short.
```

Evidence in `docs/pre-prototype` that the themes should use (the coach should find these itself):

| Source | Evidence | Theme |
|---|---|---|
| `04-interview-sabien-arink.md` | A recommendation without who confirmed it is "dangerous" | Accountability |
| `01-call-initial-discovery.md` | A current picture does not explain why a decision made ten minutes ago should change | Explainable handoff |
| `05-interview-amalia-cardoso.md` | Derived values need an "accountable meaning"; a combined confidence percentage is "decorative precision" | No false certainty |
| `01-call-initial-discovery.md` | "I am not asking a screen to command the incident" | A person stays in command |
| `10-email-chain-prototype-brief.md` | Treat summary behavior as a model concept; do not call the prototype a validated workflow | Honest scope |

A good problem statement is close to this: *Incident commanders must choose which city to save under time pressure. The agent's recommendation shows no reasons, no data gaps, and no record of who accepted it. They cannot defend the choice at handoff or afterward.*

**Handoff: write the exit.**

```text
Prepare the Problem Statement Complete handoff to RPI for project kaiju-single-save-decision. Mark the gaps as assumed or unknown.
```

Show the files, then open the handoff summary:

```powershell
Get-ChildItem .copilot-tracking\dt\kaiju-single-save-decision -Recurse
```

If the coach does something else:

| Coach does this | Say this |
|---|---|
| Asks for more Method 1 rounds | `We are time-boxed. Accept the pre-prototype documents as the research and move to Methods 2 and 3.` |
| Offers Brainstorming | `Stop at Method 3. Prepare the handoff.` |
| Says exit criteria are not met | `Record the open items as assumed or unknown and prepare the handoff.` |
| Asks you to choose the solution | `Do not choose one. Leave the solution open for research.` |

Fallback at 0:10: copy the prepared `copilot-tracking\dt` folder into `.copilot-tracking\` and say it is prepared.

### Step 3: Write the PRD (5 minutes, slide 37)

There is no BRD in this demo. The PRD Builder starts from the DT handoff. Say this: *a BRD is the right artifact when a business case is needed. This demo skips it to save time.*

Run `/clear`. Select PRD Builder with `/agent`. Its qualified name is `hve-core:prd-builder`.

```text
Create a PRD for the accountable single-save decision, a small change to the Single-Save Decision panel in this dashboard. There is no BRD. Use the Design Thinking handoff in .copilot-tracking/dt/kaiju-single-save-decision/ as the source for the problem, stakeholders, and constraints. Keep it prototype scope: three to five functional requirements, a few testable success criteria, and explicit out-of-scope items. This is a time-boxed demo, so ask me at most five questions and accept short answers.
```

Answer the coach's questions with these short answers:

| Topic | Answer |
|---|---|
| Users | Incident commander and dispatcher |
| Goal | A recommendation the commander can explain and defend, with a named owner for the decision |
| Requirements | Replace the coin flip with a deterministic score on three visible criteria. Show a rationale card with a per-criterion comparison. Show data gaps, not a single confidence percentage. A person confirms or overrides, and an override needs a reason. Keep the existing animation. |
| Out of scope | Real data, login, saving data, real operational messaging, validated threat rules |
| Success | The same inputs always give the same recommendation. The rationale lists every criterion. An override cannot be saved without a reason. All tests pass. |
| Constraint | All values are mocked and provisional. The panel must say so. |

The PRD goes to `docs/project-planning/<name>.md`. Note the exact file name. You need it in step 4.

Fallback at 0:15: copy the prepared `project-planning` folder into `docs\` and say it is prepared.

### Step 4: RPI (13 minutes, slide 38)

RPI works through artifacts. Each phase writes a file. The next phase reads it.

#### 4a: Research (3 minutes)

Run `/clear`, then:

```text
/rpi-research topic="Replace the coin-flip chooseCityToSave() in src/components/LastStandScene.tsx with an accountable single-save decision: a transparent score, a rationale card, and human confirmation. Use the PRD in docs/project-planning/ and the DT handoff in .copilot-tracking/dt/kaiju-single-save-decision/ as the requirements. Find the existing mock data, state, test, and styling conventions. List the mock fields that are missing." posture=focused
```

Show: the research file in `.copilot-tracking/research/<date>/`. It should find that `src/mock/lastStandCities.ts` has only a population field, so new mock fields are needed.

Fallback at 0:18: copy the prepared research file and say it is prepared.

#### 4b: Plan (3 minutes)

Run `/clear`, then pass the research file path. Replace the placeholder with the real path:

```text
/rpi-plan research=.copilot-tracking/research/<date>/<slug>-research.md
```

If you are behind time, add `critique=skip`. Say what you skipped.

If the plan asks for decisions, use these:

- Use three criteria. Keep the weights as named constants in code.
- Add mock fields for evacuation readiness, minutes to impact, and known data gaps. Keep the values obviously mocked.
- Do not show one confidence percentage.
- Phase 1: score, rationale card, and tests. Phase 2: confirm and override gate with the audit line.

Show: the plan phases and the implementation decision. The plan is the point where a person approves the work.

Fallback at 0:21: copy the prepared plan and say it is prepared.

#### 4c: Implement one phase (4 minutes)

Stay in the same thread. Bound the work to the first phase. Check the phase ID in the plan.

```text
/rpi-implement phase=P01
```

If the agent marks work done without evidence, steer it:

```text
Show me what you changed and the validation you ran before you check off a marker. If the plan is wrong, stop and tell me instead of working around it.
```

Show: the changes file, the diff, and the test results.

Fallback at 0:25: restore the rehearsal code with `git checkout demo/rehearsal -- src`. Say it is prepared.

#### 4d: Review, then run the app (3 minutes)

Stay in the same thread:

```text
/rpi-review
```

Then, in a second terminal:

```powershell
npm test
npm run lint
npm run build
npm run dev
```

Open `http://localhost:5173/`. Click **RE-RUN** on the Single-Save Decision panel. Show the recommendation and its rationale. Show that the same run gives the same recommendation.

Show the review findings. Say what Phase 2 (the confirm gate) still needs. Do not claim it is done.

### Step 5: Recap (2 minutes, slide 39)

Return to the opening question: is adding AI to the SDLC enough?

What the demo showed:

- Each stage produced a reviewable artifact: the DT handoff, the PRD, the research, the plan, the changes, and the review.
- A person made the decisions: the problem framing, the PRD answers, the plan approval, and the review.
- The agents did the slow work. The people did the judgment work.

What the demo did not show:

- Real customer validation. The stakeholder documents are fictional teaching material.
- Organizational change. Four pillars need more than a plugin.
- Production readiness or a measured gain in delivery speed.

### Fallbacks and recovery

| Problem | Action |
|---|---|
| A step passes its cut-off | Copy in the prepared artifact. Say that it is prepared. Continue. |
| The model stalls or returns an error | Wait 20 seconds. Then use the prepared artifact. |
| An agent asks too many questions | Say `Accept your best proposal and continue.` |
| A command is not found | Run `/help` or `copilot plugin --help`. Use the name it shows. |
| The code change fails tests | Use `git checkout demo/rehearsal -- src`. |
| Network is down | Use the prepared artifacts and the `demo/rehearsal` branch for the whole demo. Say so. |

Never present a prepared artifact as a live result.

### Known differences from the workshop scenarios

- The ISE workshop used `/dt-start-project` and `/dt-handoff-problem-space`. The current HVE-Core plugin has no prompt files. Use DT Coach in plain language.
- The workshop ran BRD Builder first. This demo skips it and goes DT, then PRD, then RPI.
- The prompts here follow the shape of the workshop scenarios but use new wording and are time-boxed.

### Check before delivery

- Confirm the cross-tool install claim (Copilot CLI, Copilot app, and VS Code) on a clean machine profile.
- Confirm the exact `/plugin` and `copilot plugin` syntax in the installed CLI version.
- Confirm that DT Coach writes the handoff from the plain-language request. Adjust the wording if it does not.
- Confirm the phase ID in the generated plan before you run `/rpi-implement phase=P01`.
- Time the whole flow twice. Cut a round of DT or the plan critique if it runs over.

### Sources

- [HVE-Core installation](https://microsoft.github.io/hve-core/docs/getting-started/install/)
- [HVE-Core CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/)
- [Migrate to the HVE Core identity](https://microsoft.github.io/hve-core/docs/getting-started/package-migration/) for the retired prompt commands
- [Using the DT Coach](https://microsoft.github.io/hve-core/docs/design-thinking/dt-coach/)
- [DT to RPI integration](https://microsoft.github.io/hve-core/docs/design-thinking/dt-rpi-integration/)
- [RPI guide](https://microsoft.github.io/hve-core/docs/rpi/)
