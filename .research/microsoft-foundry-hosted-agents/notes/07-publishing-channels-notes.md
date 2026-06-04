---
post_title: Publish Foundry agents to Microsoft 365 Copilot and Microsoft Teams
author1: GitHub Copilot
post_slug: publishing-channels-m365-copilot-teams
microsoft_alias: copilot
featured_image: none
categories:
  - microsoft-foundry
  - agents
tags:
  - publishing-channels
  - microsoft-365-copilot
  - microsoft-teams
  - azure-bot-service
  - foundry-agents
ai_note: AI-assisted extraction
summary: >-
  Extraction of concrete facts about publishing Microsoft Foundry agents to
  Microsoft 365 Copilot and Microsoft Teams, covering prerequisites, RBAC,
  the publish workflow, identity requirements, manifest customization, limits,
  and preview status.
post_date: 2026-06-04
status: extracted
---

## Overview facts

- The page is titled "Publish agents to Microsoft 365 Copilot and Microsoft Teams".
- Publishing lets you and others interact with and discover an agent through the Microsoft 365
  Copilot and Teams UI.
- What gets published is the agent's *stable endpoint*, so end users always interact with a
  consistent agent entity while you roll out new agent versions that receive traffic through the
  endpoint.
- You publish to M365/Teams from the Microsoft Foundry portal.
- Page last updated 05/06/2026 (per the page footer). The article was created with AI assistance.

## Preview vs GA status facts

- Publishing agents to Microsoft 365 Copilot and Microsoft Teams is an "Early Access Preview".
- It is licensed as part of your Azure subscription and subject to the terms applicable to
  "Previews" and "Early Access Previews" in the Supplemental Terms of Use for Microsoft Azure
  Previews and the Microsoft Products and Services Data Protection Addendum (DPA).
- Agents published to Copilot or Teams are also subject to Microsoft 365 supplemental terms.
- Using Foundry Agent Service to host agents that operate with third-party servers or agents is
  "at your own risk"; review data shared with third parties and their retention/location practices.
- It is the customer's responsibility to manage whether data flows outside the organization's Azure
  compliance and geographic boundaries.

## Supported agent types facts (hosted vs prompt)

- The page does NOT distinguish between hosted (containerized) and prompt agents for publishing. It
  refers generically to "an agent version you tested and want to publish".
- The publish flow requires the agent to have a unique identity: troubleshooting states "Ensure the
  agent has a unique identity (`agent.identity` is not null)" and "The agent doesn't have a unique
  identity (`agent.identity` is null)" causes a publishing identity error.
- A migration note points to "Migrate from Agent Applications to the new agent model" and a hosted
  agent preview migration guide for resolving null-identity issues, implying the new agent model
  (which includes hosted agents) is the supported publishing target.
- No statement on this page explicitly excludes hosted/containerized agents from publishing; the
  workflow is presented as applying to any tested agent version with a valid identity.

## Prerequisites facts

- Access to the Microsoft Foundry portal (ai.azure.com).
- A Foundry project with an agent version you tested and want to publish.
- An Azure subscription where Azure Bot Service resources can be created.
- Test the agent thoroughly in the Foundry portal before publishing; confirm responses and tools
  work as expected.
- Select the active agent version you want consumers to interact with in Microsoft 365 and Teams.
- Verify required Azure resource providers are registered. Publishing creates an Azure Bot Service
  resource, which requires the `Microsoft.BotService` provider.

```azurecli
az provider register --namespace Microsoft.BotService
```

## RBAC and permissions facts

- Required role: *Foundry User* on the Foundry project scope to create, manage, and publish agents.
- Important rename: Foundry RBAC roles were recently renamed. *Foundry User*, *Foundry Owner*,
  *Foundry Account Owner*, and *Foundry Project Manager* were previously named *Azure AI User*,
  *Azure AI Owner*, *Azure AI Account Owner*, and *Azure AI Project Manager*. Role IDs and core
  permissions are unchanged by the rename.
- Permission to create resources is needed so the Azure Bot Service can be created.
- If the Azure bot services field shows a `403 AuthorizationFailed` error for
  `Microsoft.BotService/botServices/write`, assign the *Azure Bot Service Contributor* role on the
  resource group containing the bot service, then refresh credentials and reopen the publish flow.
- The agent's identity must have RBAC roles assigned for any Azure resources it accesses; otherwise
  the agent works in Foundry but fails after publishing.

## Identity and authentication facts

- The agent must have a unique identity (`agent.identity` not null) to publish.
- Publishing fails with an identity error when the agent has no unique identity; the migration guide
  resolves this.
- Agent identity missing permissions is a documented cause of an agent working in Foundry but
  failing after publishing — assign RBAC roles to the agent's identity for Azure resources it uses.

## Publish workflow facts

- Step 1 — Select an active agent version in the Foundry UI:
  - In the Foundry portal select *Publish*; a dropdown shows endpoint URLs, the active version, and
    a link to publish to Teams and Microsoft 365 Copilot.
  - Select the arrow next to *Active version*; choose "always use latest" or a specific version.
  - The active version receives traffic from the agent's stable endpoint; the *Publish* button shows
    a checkmark on success.
- Step 2 — Publish to Microsoft 365 and Teams:
  - In the Foundry portal select *Publish*, then *Publish to Teams and Microsoft 365 Copilot*.
  - An Azure Bot Service resource is automatically created, or shown read-only if one already exists.
  - Complete required metadata: Name, Publish version (three-part major.minor.patch), Short
    description, Description, and Developer (under Author).
  - Optional metadata under *More*: Developer website (HTTPS), Terms of use (HTTPS), Privacy
    statement (HTTPS).
  - Warning: do not include secrets, API keys, or sensitive information in metadata fields — they are
    visible to users.
  - Select *Next: Publish options*, then choose Direct publish or Download & customize.

## Direct publish facts

- On the Publish options step, select the *Direct publish* tab; the "Choose who can use this agent"
  section appears.
- Scope option "Just you": available immediately, no admin approval; appears under *Your agents* in
  the agent store; shareable via the agent link. Good for personal testing, small teams, pilots.
- Scope option "People in your organization": requires admin approval; submitted to the Microsoft 365
  admin; once approved appears under *Built by your org* for all tenant users. Good for
  organization-wide distribution and production deployments.
- For org scope, a Microsoft 365 admin reviews/approves the request in the Microsoft 365 admin center
  (admin.cloud.microsoft, Agents > Requests). App policies in the tenant control which users can
  access the agent.
- Select *Publish*; a "Publish successful" dialog confirms success.

## Download and customize (manifest) facts

- On the Publish options step, select the *Download & customize* tab, then *Download ZIP*.
- A `.zip` file containing the *agent manifest* downloads to the local machine.
- Customize the manifest in the downloaded package as needed.
- In Microsoft Teams, upload the package: Apps > Manage your apps > Upload an app > "Upload a custom
  app" or "Submit an app to your org", then choose the downloaded `.zip`.

## Updating a published agent facts

- To roll out a new agent version, update the agent's version selector in the Foundry portal; the
  stable endpoint URL stays the same — no need to republish to M365/Teams.
- To update end-user metadata (display name, descriptions, URLs), in the Publish dropdown select
  *Update agent Teams and Microsoft 365 Copilot display properties*.
- Updated fields overwrite existing values; unchanged fields are carried forward; version auto
  increments if not manually incremented.
- If the version selector is "Always use latest" (default), new versions are automatically served in
  M365/Teams; if pinned to a specific version, the selector must be updated.

## Limitations facts

- File uploads and image generation do not work for agents published to Microsoft 365; they do work
  in Microsoft Teams.
- Private Link is not supported for Teams or Azure Bot Service integrations.
- Published agents do not support streaming responses or citations.

## Troubleshooting facts

- "Error publishing the agent": caused by invalid metadata or version — ensure unique identity
  (`agent.identity` not null) and a Developer name of 32 characters or fewer.
- "Azure Bot Service creation fails": missing permissions or unregistered provider — confirm
  resource-creation permission and register `Microsoft.BotService`.
- `403 AuthorizationFailed` on `Microsoft.BotService/botServices/write`: assign *Azure Bot Service
  Contributor* on the bot service resource group.
- "Organization scope agent doesn't appear": admin approval pending — confirm M365 admin approval and
  check app policies.
- "Users can't find the agent": for Individual scope share the direct link; for Organization scope
  confirm admin approval.

## Tenant and isolation considerations facts

- Org-scoped agents are governed by the tenant's app policies and require Microsoft 365 admin
  approval before appearing for tenant users.
- Customers are responsible for managing whether data flows outside their organization's Azure
  compliance and geographic boundaries.
- Agents interacting with external/third-party tools are subject to those services' own data
  processing terms.

## Microsoft Agent 365 dependency facts

- This page does NOT mention Microsoft Agent 365. No dependency on Microsoft Agent 365 is stated for
  publishing Foundry agents to Microsoft 365 Copilot or Teams. The publishing target surfaces are the
  Microsoft 365 Copilot agent store and Microsoft Teams, backed by an Azure Bot Service resource.

## Entra app registration / manifest facts

- The page does NOT describe a manual Entra app registration step. Instead, publishing creates an
  Azure Bot Service resource and (in the Download & customize flow) produces a downloadable agent
  manifest `.zip` for Teams sideloading.
- No explicit Microsoft Entra application manifest or app registration configuration is documented on
  this page beyond the agent identity requirement and Azure Bot Service creation.

## Open questions

- Does publishing apply identically to hosted (containerized) agents vs prompt agents? The page does
  not state any agent-type restriction, but it also does not explicitly confirm hosted agents.
- What exactly constitutes the agent's "unique identity" (`agent.identity`)? The page references a
  migration guide rather than defining it here.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry
