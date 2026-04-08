# Demo 1: Building & Refining Skills

## Overview

Convert a prompt into a skill, validate with Sensei, and show automatic skill routing.

## Pre-requisites

- VS Code Insiders with latest updates
- Sample .NET app open (from `../sample-app/`)
- `.github/skills/` directory configured
- Sensei installed: `npm install -g @spboyer/sensei`
- `convert-prompt-to-skill` skill installed from [PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os/tree/main/.github/skills/convert-prompt-to-skill)

## Demo Script (~5 minutes)

### Step 1: Show the Prompt (1 min)

Open `.github/prompts/update-wcf-to-grpc.prompt.md`:

```markdown
---
description: Convert WCF services to gRPC in .NET 8+
---

Analyze the WCF service at the specified path and convert it to a gRPC service:
1. Generate .proto file from the WCF contract
2. Create the gRPC server implementation
3. Update dependency injection registrations
4. Migrate any WCF-specific configuration
```

**Say:** "This is a common AppMod edge case — converting WCF to gRPC. It started as a prompt. Let's convert it to a skill."

### Step 2: Convert Prompt to Skill (2 min)

Chat: "Convert the update-wcf-to-grpc prompt to a skill"

Walk through the generated `SKILL.md`:

- **Frontmatter**: name, description, triggers, anti-triggers
- **Body**: detailed instructions with edge cases
- **Scripts**: any helper scripts generated

**Say:** "Notice the triggers and anti-triggers. This is how the agent knows WHEN to use this skill and when NOT to."

### Step 3: Validate with Sensei (1.5 min)

Chat: "Run sensei on the wcf-to-grpc skill"

Show before/after improvements:

- Vague description → specific, routed description
- Missing triggers → explicit triggers added
- Missing anti-triggers → explicit exclusions added

**Say:** "Sensei ensures the agent routes to the RIGHT skill. This is why skill quality matters."

### Step 4: Live Routing (1 min)

Chat: "Modernize this WCF service to use gRPC"

Watch Copilot:

1. Discover the skill via description matching
2. Load the skill's instructions
3. Execute the conversion

**Say:** "The agent found and used our skill automatically. This is the Skill & Agent factory — each skill amplifies everyone."

## Wrap-up

"By day 3 of the workshop, the team was building 5+ skills per day. Each skill made the entire team faster. That's the operating model shift."
