# Demo 4: /troubleshoot & The 100× Pattern

## Overview

Trigger a known AppMod mistake, diagnose with /troubleshoot, and permanently fix it by updating the skill.

## Pre-requisites

- VS Code Insiders with latest updates (Chat Debug enabled)
- Sample .NET app with a WCF service (from `../sample-app/`)
- A skill that has a known edge case it handles incorrectly
- AppMod MCP NuGet installed

## Setup

Before the demo, ensure you have a skill (e.g., `wcf-to-grpc`) that:

- Correctly handles basic WCF → gRPC conversion
- **Incorrectly** handles async streaming WCF contracts (uses wrong pattern)
- This gives us a realistic "mistake" to diagnose and fix

## Demo Script (~5 minutes)

### Step 1: Trigger the Mistake (1 min)

Chat: "Modernize the ContosoLegacy.StreamingService WCF service to gRPC"

The skill runs but makes a mistake — e.g., it converts a streaming WCF contract to unary gRPC calls instead of server-streaming gRPC.

**Say:** "This is a real mistake we saw during the workshop. The skill handled basic WCF fine but got streaming wrong. Let's find out why."

### Step 2: Diagnose with /troubleshoot (1.5 min)

Chat: "/troubleshoot Why did you convert the streaming WCF contract to unary gRPC calls rather than server-streaming gRPC?"

Walk through the diagnosis:

- **Skill selection**: Show which skill was selected and why
- **Instructions followed**: Show the specific instruction that led to unary conversion
- **Missing context**: The skill didn't account for streaming contracts

**Say:** "The /troubleshoot command shows us exactly WHY the agent made this choice. The skill's instructions didn't cover streaming contracts. This is the 10× — you can diagnose instead of guessing."

### Step 3: The 100× Fix (2 min)

Chat: "/troubleshoot Why did you convert the streaming WCF contract to unary gRPC calls rather than server-streaming gRPC? Update the wcf-to-grpc skill so that when you encounter a streaming WCF contract, you use server-streaming gRPC instead of unary calls."

Watch the agent:

1. Diagnose the problem (as before)
2. **Update the skill's SKILL.md** with new instructions for streaming
3. Show the diff — the skill now handles streaming contracts correctly

Now re-run: "Modernize the ContosoLegacy.StreamingService WCF service to gRPC"

Show: the same task now produces correct server-streaming gRPC code.

**Say:** "This is the 100× pattern. We didn't just fix the immediate problem — we permanently updated the skill. This mistake will never happen again for anyone on the team."

### Step 4: Wrap (30 sec)

"Over 4 days, the team closed dozens of these feedback loops. Each fix made the system permanently smarter. By the end of the week, the skills were handling edge cases that would have taken hours to debug manually."

## Wrap-up

"The 100× multiplier comes from compounding. Every /troubleshoot → diagnose → update skill loop makes the entire system better. This is the most important operational pattern from the entire workshop."
