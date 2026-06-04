---
post_title: Microsoft Agent 365 and AI teammates notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-agent365-ai-teammates-notes
microsoft_alias: copilot
featured_image: none
categories:
  - Azure
  - Governance
tags:
  - microsoft agent 365
  - autopilots
  - hosted agents
  - agent identity
  - governance
ai_note: AI-assisted extraction
summary: Extracted facts on Microsoft Agent 365, its Foundry integration, and pushing Hosted agents as autopilots (formerly AI teammates).
post_date: 2026-06-04
status: extracted
---

## Terminology note

- The source section anchored as `create-ai-teammates` is now titled "Create autopilots"; the
  page uses "autopilots" rather than "AI teammates". Both terms refer to the same concept.
- Page last updated 06/03/2026; URL uses `?view=foundry`.

## What Microsoft Agent 365 is facts

- Microsoft Agent 365 (A365) is described as "Microsoft's IT admin control plane for AI agents."
- It applies identity, security, governance, and lifecycle management controls to AI agents and
  manages them at scale, "regardless of where they're built or acquired."
- Agent 365 core capabilities are: Registry, Access control, Visualization, Interoperability, Security.
- Registry: a complete inventory of agents in the organization, including agents built in Microsoft
  Foundry and Copilot Studio, agents registered by administrators, and shadow agents discovered in the tenant.
- Access control: brings agents under management and limits access to only needed resources using
  Microsoft Entra–based controls and risk-based Conditional Access policies.
- Visualization: explore connections between agents, people, and data, and monitor agent behavior and
  performance in real time.
- Interoperability: equips agents with access to Microsoft 365 apps and organizational data; agents can
  also be connected to Work IQ to apply organizational context and knowledge.
- Security: protects agents from threats and vulnerabilities by integrating with Microsoft's security stack.

## Foundry integration facts

- All Foundry agents automatically appear in the Agent 365 agent registry on creation.
- No extra configuration is required for Foundry-originated agents.
- In A365, admins can see agent metadata such as name, description, tools, agent identity, and agent blueprint.
- Foundry agents are governed alongside Copilot Studio and other ecosystem SaaS agents in a unified registry view.

## Hosted agents participation facts

- HOSTED agents DO participate: "There's also a specific use case in which Foundry Hosted agents can be
  pushed as autopilots to Agent 365."
- Once approved in the Microsoft admin center, these agents can then be hired by others in the organization.
- The autopilot experience "currently has no UI and must be completed by using a code sample."
- The sample provisions Azure resources and publishes a Hosted agent end-to-end.
- Microsoft Entra network controls and Conditional Access are generally available in Agent 365 and apply to
  "both Foundry-hosted agents managed through Agent 365 and endpoint-hosted agents."

## Creating autopilots (AI teammates) facts

- The sample creates or updates Azure resources required to run the sample.
- It creates an agent version and configures endpoint traffic to always route to that version.
- It submits an autopilot request that requires admin approval in the Microsoft 365 admin center.
- Sample location: `samples/csharp/FoundryA365` in the `foundry-samples` repository on GitHub
  (github.com/microsoft-foundry/foundry-samples).
- High-level flow uses the Azure Developer CLI (`azd`):

```bash
az login
azd auth login
azd provision
azd env get-values
```

- After success there is a published agent application and an autopilot request ready for admin approval.

## Validation and publishing-to-Teams facts

- Approve the agent blueprint request in the Microsoft 365 admin center at
  `https://admin.cloud.microsoft/?#/agents/all/requested`.
- After approval, the agent appears in the Agent 365 agent registry.
- Configure Teams integration in the Teams Developer Portal at
  `https://dev.teams.microsoft.com/tools/agent-blueprint`, locating the approved agent blueprint.
- If the blueprint is not listed, copy the blueprint ID from `azd env get-values` and replace it in the portal URL.
- In Microsoft Teams: go to Apps, then Agents for your team, find the agent, and create an instance.
- Related guidance: "Publish agents to Microsoft 365 Copilot and Microsoft Teams" is a separate how-to article.

## Prerequisites facts

- Microsoft 365 E7 license.
- An Azure subscription where you can create resources.
- Owner role on the Azure subscription.
- Foundry User or Cognitive Services User role at subscription or resource group scope.
- A tenant admin role that can approve agent requests in the Microsoft 365 admin center.
- Use a region that supports Hosted agents.
- Tooling: Azure CLI, Azure Developer CLI (azd), Docker, and .NET 9.0 SDK.
- Depending on tenant settings, additional Azure CLI sign-in scopes (Foundry, Microsoft Graph, Azure
  Resource Manager) may be required before provisioning.

## RBAC and role naming facts

- Foundry RBAC roles were recently renamed: Foundry User, Foundry Owner, Foundry Account Owner, and
  Foundry Project Manager were previously Azure AI User, Azure AI Owner, Azure AI Account Owner, and
  Azure AI Project Manager.
- Previous names may still appear during rollout; role IDs and core permissions are unchanged by the rename.

## Limits and constraints facts

- The autopilot/AI teammate creation experience has no UI and must be done via the code sample.
- The Teams Developer Portal list shows only the first 100 blueprints; use the blueprint ID URL workaround
  for additional blueprints.
- `azd provision` failures map to: missing permissions (need Owner + Foundry/Cognitive Services User),
  wrong region (must support Hosted agents), or Docker not running (container build/push fails).
- Approval-finding issues stem from incomplete approval steps or insufficient tenant admin permissions.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates
