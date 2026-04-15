# EROAD Hackathon — Demo Runbook

Tailored demo steps for the **Agentic Development Evolution** presentation
at EROAD's internal all-staff hackathon.

> **Audience:** EROAD engineering, product, and leadership.
> **Theme:** Fleet intelligence meets AI-powered development — show how agentic
> tools can accelerate hackathon teams from idea to working prototype.

---

## Pre-Demo Setup Checklist

- [ ] VS Code Insiders installed with GitHub Copilot agent mode enabled
- [ ] `D:\source\GitHub\PlagueHO\plagueho.skills` repo open in VS Code
- [ ] Squad CLI installed: `npm install -g @bradygaster/squad-cli`
- [ ] Azure CLI with prototype extension: `az extension add --name prototype`
- [ ] GitHub CLI authenticated: `gh auth login`
- [ ] Azure subscription ready for deploy
- [ ] New hackathon project repo created (e.g., `eroad-hackathon-demo`)

---

## Demo 1: Skills + /Troubleshoot (~5 min)

**Goal:** Show how a GitHub Copilot Skill can be built live to automate
hackathon team setup — generating issues, a PRD, and project scaffolding
from a Teams meeting recording via WorkIQ.

### Setup

- Open `D:\source\GitHub\PlagueHO\plagueho.skills` in VS Code Insiders
- Have agent mode active in Copilot Chat

### Step 1 — Show the Skills Repo (30 sec)

Walk through the plugin/skill structure:

```text
plagueho.skills/
  plugins/
    content-and-learning/
      skills/
        create-learning-pathway/
          SKILL.md
    github-workflows/
      skills/
        scaffold-repo-ai-guidance/
          SKILL.md
    ...
```

> **Talking point:** "Skills are demand-loaded expertise bundles. The agent
> reads the description in the YAML frontmatter and decides when to activate.
> Let's build one for EROAD's hackathon."

### Step 2 — Generate the Hackathon Skill (2 min)

Prompt Copilot in agent mode with the following:

```text
Create a new GitHub Copilot Agent Skill called "eroad-hackathon-kickstart"
in the plugins/hackathon/skills/eroad-hackathon-kickstart/ directory.

The skill should:
1. Accept a hackathon team name and a topic/idea description as input
2. Query WorkIQ for context from a recent Teams meeting recording about
   the hackathon planning session
3. Generate a Hackathon PRD (Product Requirements Document) from a
   template bundled in the skill's assets/ folder
4. Generate 5-8 GitHub Issues from the PRD — each with acceptance criteria,
   labels (frontend, backend, infra, docs), and size estimates (S/M/L)
5. Create a GitHub milestone for the hackathon sprint

The SKILL.md should include:
- Triggers: "hackathon kickstart", "generate hackathon issues",
  "create hackathon PRD", "hackathon team setup"
- Anti-triggers: "production deployment", "release process"
- Can Invoke: WorkIQ MCP, GitHub MCP tools, file system tools
```

> **Show:** The generated SKILL.md with frontmatter, the PRD template, and
> the workflow steps. Walk through how the description enables routing.

### Step 3 — Run /troubleshoot (1 min)

After the skill is generated, run:

```text
/troubleshoot why wasn't the skill-creator skill activated? How do I improve the skill-creator skill so that it more reliably activates?
```

Walk through the JSONL event tree — show discovery, tool calls, and LLM
request data.

> **Key message:** "This is observability for the entire agentic stack.
> You can see exactly why the AI did what it did."

### Step 4 — Generate a PRD Without the Skill (1.5 min)

Since we won't have a real Teams recording, use the following prompt to
generate a PRD directly. This simulates what the skill would produce:

```text
Generate a Hackathon PRD for an EROAD hackathon team project.

## Context
- Company: EROAD — fleet management and telematics platform
- Products: CoreHub IoT device, connected fleet platform, video telematics,
  driver apps (ELD), cold chain monitoring, compliance reporting
- Industries: Transportation & Logistics, Food & Beverage, Construction,
  Waste & Recycling
- Mission: "Delivering intelligence you can trust, for a better world tomorrow"
- Data scale: 200,000+ connected devices, 8,000+ customers,
  1 billion data points collected monthly

## PRD Template
Use this structure:

### Project Title
[AI-powered project name]

### Problem Statement
What fleet management challenge does this solve?

### Proposed Solution
High-level description of the AI-powered solution.

### Target Users
Who benefits — drivers, fleet managers, dispatchers, safety officers?

### Key Features (MVP)
- Feature 1 — description + acceptance criteria
- Feature 2 — description + acceptance criteria
- Feature 3 — description + acceptance criteria

### Technical Architecture
- Frontend: (web dashboard / mobile app / both)
- Backend: (API framework, language)
- AI/ML: (models, services — Azure OpenAI, Azure AI Search, etc.)
- Data: (what EROAD data sources are consumed)
- Infrastructure: (Azure services)

### Success Metrics
How do we measure impact during the hackathon demo?

### Hackathon Scope
What's in for the 2-day sprint vs. future work?

## Project Idea
Use this idea: "AI-Powered Fleet Safety Coach — a real-time driver coaching
system that uses dashcam video analysis and telematics data to provide
personalized safety recommendations and gamified safety scores."

Generate the full PRD, then generate 6 GitHub Issues from it with labels
and acceptance criteria.
```

> **Talking point:** "In a real hackathon, the skill would pull context from
> your Teams planning meeting via WorkIQ. Today we're feeding it directly —
> same output, same structure."

### Save the PRD

Save the generated PRD as `HACKATHON-PRD.md` in the demo repo — it will
be used in Demo 2 and Demo 3.

---

## 10 Hackathon Ideas for EROAD Teams

These are AI-powered project ideas aligned to EROAD's fleet management
business. Present these to the audience as inspiration:

| # | Project Name | Description | AI Technology |
|---|-------------|-------------|---------------|
| 1 | **AI Fleet Safety Coach** | Real-time driver coaching using dashcam video + telematics. Personalized safety scores, gamified leaderboards, and proactive alerts before incidents happen. | Azure OpenAI GPT-4o + Azure AI Vision + EROAD dashcam feeds |
| 2 | **Predictive Maintenance Oracle** | Analyze engine telemetry patterns from CoreHub to predict breakdowns before they happen. Auto-generate maintenance tickets with severity and cost estimates. | Azure ML anomaly detection + EROAD engine telemetry data |
| 3 | **Smart Route Optimizer** | AI-powered route planning that factors in real-time traffic, fuel costs, weight restrictions, driver HOS limits, and delivery windows. Learns from historical trip data. | Azure OpenAI + Azure Maps + EROAD GPS/trip history |
| 4 | **Cold Chain Guardian** | Intelligent reefer monitoring that predicts temperature excursions before they happen, auto-adjusts set points, and generates compliance-ready audit trails. | Azure Stream Analytics + Azure OpenAI + EROAD temp sensors |
| 5 | **Natural Language Fleet Query** | "How many trucks were idle for more than 30 minutes in Auckland last week?" — a conversational interface over EROAD's billion data points using RAG. | Azure OpenAI + Azure AI Search + EROAD data lake |
| 6 | **Automated Compliance Copilot** | AI assistant that monitors ELD data, flags potential HOS violations before they occur, auto-generates IFTA/IRP/WMT reports, and suggests corrective actions. | Azure OpenAI + EROAD ELD/compliance data |
| 7 | **Video Incident Analyzer** | Auto-detect and classify safety events from dashcam footage (harsh braking, distracted driving, near-misses). Generate coaching summaries without manual review. | Azure AI Vision + Azure OpenAI + EROAD video telematics |
| 8 | **Fleet Carbon Intelligence** | AI dashboard that tracks fleet emissions, models "what-if" scenarios for EV transitions, and generates sustainability reports aligned to ESG frameworks. | Azure OpenAI + Azure Digital Twins + EROAD fuel/emissions data |
| 9 | **Smart Dispatch Agent** | Agentic AI that handles dispatch decisions — assigns drivers to jobs based on proximity, skill, HOS remaining, and vehicle capability. Learns dispatcher preferences. | Azure OpenAI Agents + EROAD driver/vehicle/location data |
| 10 | **IoT Sensor Anomaly Detective** | Monitor all CoreHub-connected sensors (door alerts, drum rotations, moisture levels) and use AI to detect anomalies, predict failures, and auto-escalate to fleet managers. | Azure IoT Hub + Azure ML + EROAD CoreHub sensor data |

> **Present these to the audience:** "Pick one, or invent your own.
> The next two demos will show you how to go from idea to working code
> using agentic tools."

---

## Demo 2: Squads & Fleets (~5 min)

**Goal:** Use the PRD generated in Demo 1 to spin up a Squad — a persistent
multi-agent development team themed after the *Fast & Furious* crew — and
begin building the hackathon project.

### Setup

- New repo: `eroad-hackathon-demo` (or use a pre-created one)
- `HACKATHON-PRD.md` from Demo 1 saved in the repo root
- Squad CLI installed globally

### Step 1 — Install and Init Squad (1 min)

```bash
# Install Squad CLI
npm install -g @bradygaster/squad-cli

# Navigate to the hackathon repo
cd eroad-hackathon-demo
git init

# Initialize Squad
squad init
```

> **Show:** The `.squad/` directory created:
>
> ```text
> .squad/
> ├── team.md
> ├── routing.md
> ├── decisions.md
> ├── ceremonies.md
> ├── casting/
> ├── agents/
> └── log/
> ```

### Step 2 — Create the Fast & Furious Crew (2 min)

Open VS Code Insiders, switch to **Squad** agent mode in Copilot Chat, and
prompt:

```text
I'm starting a new project. Set up the team.

Here's what I'm building: read the HACKATHON-PRD.md file for the full
product requirements.

Theme the team after the Fast & Furious movie franchise:

- 🏎️ Dom (Dominic Toretto) — Lead / Coordinator: "I don't have friends.
  I got family." Runs the crew, makes architecture decisions, delegates.
- ⚡ Letty (Leticia Ortiz) — Backend Engineer: Tough, reliable, gets the
  engine running. Owns API, data layer, and Azure infrastructure.
- 🖥️ Tej (Tej Parker) — Frontend Engineer: The tech genius. Builds the
  dashboard UI, React components, and data visualization.
- 🔧 Roman (Roman Pearce) — Tester / QA: Talks a lot, but catches every
  bug. Writes tests, validates acceptance criteria, finds edge cases.
- 📋 Ramsey — Scribe / DevOps: The hacker. Logs everything, manages CI/CD,
  handles deployment pipelines, and tracks decisions.

Use these exact names for the casting.
```

> **Show:** Squad proposes the team with Fast & Furious names. Confirm with
> "yes" — agents are created in `.squad/agents/`.
>
> **Talking point:** "Each agent has its own charter, its own context, and
> writes back what it learned. It's not a chatbot wearing hats."

### Step 3 — Give the Team a Task (1.5 min)

```text
Team, read the HACKATHON-PRD.md and set up the project structure.
Create the initial folder layout, install dependencies, and generate
the first set of GitHub Issues from the PRD.
```

> **Show:** Multiple agents spawn in parallel:
>
> ```text
> 🏎️ Dom    — analyzing PRD, planning architecture...     ⎤
> ⚡ Letty  — setting up backend API structure...          ⎥ all launched
> 🖥️ Tej   — scaffolding React dashboard...               ⎥ in parallel
> 🔧 Roman  — writing test plan from acceptance criteria...⎥
> 📋 Ramsey — logging decisions, setting up CI...          ⎦
> ```

### Step 4 — Inspect Squad State (30 sec)

```text
@Ramsey, show me the current decisions and what each team member is working on.
```

> **Show:**
>
> - `.squad/decisions.md` — team decisions recorded
> - `.squad/agents/dom/history.md` — what Dom learned
> - `.squad/routing.md` — who handles what
>
> **Key message:** "This is in git. Clone the repo, get the team — with
> all their accumulated knowledge. 'I don't have friends. I got family.'"

### Wrap

> "Not just a chatbot with personality. Each agent runs in its own context,
> makes independent decisions, and the team compounds knowledge across
> sessions. Dom keeps the family together."

---

## Demo 3: az prototype (~4 min)

**Goal:** Show an alternative path — use `az prototype` to go from the same
hackathon idea to a deployed Azure prototype with AI-driven architecture,
cost analysis, and infrastructure generation.

### Setup

- Azure CLI with prototype extension installed
- Azure subscription ready
- GitHub CLI authenticated

### Step 1 — Initialize the Prototype (30 sec)

```bash
# Initialize a new prototype project for the EROAD hackathon idea
az prototype init --name eroad-fleet-safety-coach --location australiaeast
```

> **Show:** `prototype.yaml` created with project scaffolding.
>
> **Talking point:** "Same hackathon idea — AI Fleet Safety Coach. Different
> tool, different approach. Let's see how az prototype handles it."

### Step 2 — Design with AI (1.5 min)

```bash
# Run interactive design — feed it the hackathon context
az prototype design --interactive
```

The biz-analyst agent will ask clarifying questions. Answer with EROAD
context:

- **Q: What does the application do?**
  "A real-time driver coaching system that analyzes dashcam video and
  vehicle telematics from EROAD's CoreHub IoT devices. It provides
  personalized safety recommendations, gamified safety scores, and
  proactive alerts to fleet managers."

- **Q: Who are the users?**
  "Fleet safety managers, dispatchers, and drivers. The dashboard is
  for managers; drivers get a mobile notification feed."

- **Q: What Azure services are needed?**
  "Azure OpenAI for natural language, Azure AI Vision for dashcam
  analysis, Azure IoT Hub for CoreHub data ingestion, Azure Cosmos DB
  for real-time scores, and Azure Container Apps for the API."

> **Show:** Architecture documentation generated — the 19 built-in agents
> (cloud-architect, security-architect, data-architect, etc.) collaborate.
>
> **Talking point:** "A PM could do this design step without a developer.
> The agents ask the right questions."

### Step 3 — Analyze Costs (30 sec)

```bash
# Get cost estimates at S/M/L t-shirt sizes
az prototype analyze costs
```

> **Show:** Three consumption tiers with real Azure pricing estimates.
>
> | Tier | Monthly Estimate | Notes |
> |------|-----------------|-------|
> | S (Dev/Hackathon) | ~$150/mo | Consumption-tier everything |
> | M (Pilot - 1,000 vehicles) | ~$800/mo | Standard tiers, reserved |
> | L (Production - 50,000 vehicles) | ~$4,500/mo | Premium, scaled out |
>
> **Talking point:** "Finance gets real numbers before any code exists.
> For a hackathon, you're looking at the S tier."

### Step 4 — Build and Deploy (1.5 min)

```bash
# Generate infrastructure code and application scaffolding
az prototype build

# Preview what would be deployed
az prototype deploy --dry-run

# If time and network permits — deploy for real
az prototype deploy
```

> **Show:**
>
> - Infrastructure code generated (Terraform or Bicep)
> - Application scaffolding with the right Azure SDKs
> - Deployment progress with change tracking
>
> **Talking point:** "From hackathon idea to deployed Azure resources.
> The 19 agents — cloud-architect, infrastructure-architect,
> csharp-developer, security-architect — all collaborated on this.
> Your hackathon team can start writing business logic immediately."

### Wrap

> "Three demos, three approaches to the same problem:
>
> 1. **Skills** — reusable automation that turns a meeting into issues and a PRD
> 2. **Squad** — a persistent AI dev team (the Fast & Furious family) that
>    builds from your spec
> 3. **az prototype** — concept to deployed Azure in minutes
>
> Pick the tool that fits your hackathon workflow. Or combine them all."

---

## Post-Demo Talking Points

- **For hackathon teams:** "You don't need to use all three. Start with
  a PRD (Demo 1), then choose Squad (Demo 2) or az prototype (Demo 3)
  to build. Or go freestyle — the point is to ship."
- **For leadership:** "These tools reduce the gap between idea and working
  prototype from days to minutes. The cost calculus of experimentation
  has changed."
- **For engineering:** "Skills, Squad, and az prototype are all open source
  or publicly available. Install them today. The links are on the cheat
  sheet slide."
