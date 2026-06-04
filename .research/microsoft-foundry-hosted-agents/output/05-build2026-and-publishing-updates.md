---
post_title: Foundry Agent Service Build 2026 changes and publishing updates
author1: GitHub Copilot
post_slug: foundry-hosted-agents-build2026-and-publishing-updates
microsoft_alias: copilot
featured_image: none
categories:
  - AI
  - Azure
  - Governance
tags:
  - hosted agents
  - build 2026
  - microsoft 365 copilot
  - microsoft teams
  - agent 365
  - autopilots
ai_note: AI-assisted synthesis
summary: Build 2026 changelog for Microsoft Foundry Agent Service plus implementation-ready guidance for publishing hosted agents to Microsoft 365 Copilot and Teams and for Microsoft Agent 365 autopilots.
post_date: 2026-06-04
section_status: complete
---

## Executive summary

This section is a curated changelog and implementation guide. The first part summarizes
every concrete Microsoft Foundry Agent Service change announced at Build 2026, with an
explicit focus on hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
The second and third parts give implementation-ready guidance for the two new distribution
capabilities: publishing agents to Microsoft 365 Copilot and Microsoft Teams
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)),
and Microsoft Agent 365 autopilots — also called AI teammates
([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).

> Cross-reference: For the underlying hosting and deployment model, see
> [output/01-overview-and-deployment.md](01-overview-and-deployment.md). For identity and
> isolation, see [output/02-persistence-isolation-identity.md](02-persistence-isolation-identity.md).
> For multi-agent patterns, see [output/04-multiagent-multitenant-patterns.md](04-multiagent-multitenant-patterns.md).

## Build 2026 changes at a glance

All rows are sourced from the [Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/).

| Capability | What changed at Build 2026 | Status (GA / public preview / early access preview / timing) | Affects hosted agents? |
|---|---|---|---|
| Hosted agents in Foundry Agent Service | Managed runtime for production agents graduating from preview; every session runs in its own sandbox with dedicated compute, memory, and filesystem | Reaching GA within ~30 days of announcement | Yes — this is the hosted-agent runtime |
| Responses API + Invocations protocol | Reaffirmed dual-protocol support: Responses for OpenAI-compatible stateful interactions, Invocations for schema-free pass-through where the developer controls request/response format | GA (with hosted agents) | Yes |
| Routines | Operationalize any agent on a timer or schedule (for example, monitor a GitHub repo overnight, triage issues, post a Teams summary) | Public preview | Yes |
| Long-running autonomous agents | Hosted agents support long-running autonomous agents (examples: OpenClaw, Hermes) with durable state and filesystem access | Public preview | Yes |
| Autopilot agent mode | Third agent mode alongside assistive and autonomous; agents act independently with Entra Agent ID, an email address, Teams presence, and a place in the org chart | Public preview | Yes |
| Incoming A2A | Expose any Foundry agent as an A2A endpoint discoverable via its agent card and invokable over the open A2A protocol; outbound A2A was already supported | Public preview | Yes |
| Memory types | Three memory types in Foundry Agent Service: procedural (new; +7–14% absolute Tau-bench success-rate gains at near-baseline cost), user, and session | Public preview | Yes |
| Tracing and evaluation for hosted agents | Every model call, tool invocation, sub-agent hop, and handoff flows through one OpenTelemetry pipeline with evaluations linked back to the trace in the Foundry Control Plane | GA later in June 2026 | Yes |
| Agent optimizer | Consumes production traces and evaluations from hosted agents and generates ranked candidate improvements across prompts and skills with lineage, diffs, audit, and rollback | Public preview within ~30 days (private preview sign-up available) | Yes |
| Voice Live | Unifies speech recognition, text-to-speech, turn detection, interruption handling, and avatars into one API | GA for prompt agents; public preview for hosted agents | Yes (public preview for hosted) |
| Foundry IQ | Knowledge layer unifying Work IQ, Fabric IQ, Azure SQL, File Search, and MCP sources behind one SLA-backed retrieval endpoint; Serverless tier in public preview; Web IQ for sub-200ms live web grounding | GA now (Serverless tier in public preview) | Indirect — usable by hosted agents |
| Foundry Toolkit for VS Code | Create, test/debug locally with trace visualization, connect to Toolboxes, and deploy to Foundry Agent Service from VS Code | GA | Yes — deploys hosted agents |
| Publishing to Teams and Microsoft 365 Copilot | Any Foundry agent deploys directly into employee tools with identity, permissions, and policy flowing through automatically | GA next month | Yes |

## Publishing hosted agents to Microsoft 365 Copilot and Teams

Publishing exposes an agent's *stable endpoint* through the Microsoft 365 Copilot and Teams
UI, so end users interact with a consistent agent entity while you roll out new versions
behind the endpoint ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).
You publish from the Microsoft Foundry portal. The how-to does not restrict publishing by
agent type; it applies to any tested agent version that has a valid unique identity
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

### Prerequisites

1. Access to the Microsoft Foundry portal (ai.azure.com).
1. A Foundry project with an agent version you have tested and want to publish.
1. An Azure subscription where Azure Bot Service resources can be created.
1. The agent thoroughly tested in the Foundry portal, with responses and tools confirmed.
1. The active agent version selected for consumers to interact with.
1. The `Microsoft.BotService` resource provider registered, because publishing creates an
   Azure Bot Service resource.

Sources for the list above:
[Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry).

```azurecli
az provider register --namespace Microsoft.BotService
```

### RBAC

- Required role: *Foundry User* on the Foundry project scope to create, manage, and publish
  agents ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).
  *Foundry User* is the recent rename of *Azure AI User*; role IDs and core permissions are
  unchanged (see [RBAC role renames](#rbac-role-renames)).
- Permission to create resources is needed so the Azure Bot Service can be created
  ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).
- If the Azure bot services field shows a `403 AuthorizationFailed` error for
  `Microsoft.BotService/botServices/write`, assign the *Azure Bot Service Contributor* role
  on the resource group containing the bot service, then refresh credentials and reopen the
  publish flow ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).
- The agent's identity must have RBAC roles assigned for any Azure resources it accesses;
  otherwise the agent works in Foundry but fails after publishing
  ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

### Unique agent identity requirement

The agent must have a unique identity (`agent.identity` is not null) to publish. A null
identity raises a publishing identity error; the *Migrate from Agent Applications to the new
agent model* migration guide resolves it
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

### Publish workflow

1. **Select an active agent version.** In the Foundry portal select *Publish*; a dropdown
   shows endpoint URLs, the active version, and a link to publish to Teams and Microsoft 365
   Copilot. Select the arrow next to *Active version* and choose "always use latest" or a
   specific version. The active version receives traffic from the agent's stable endpoint.
1. **Publish to Microsoft 365 and Teams.** Select *Publish*, then *Publish to Teams and
   Microsoft 365 Copilot*. An Azure Bot Service resource is automatically created (or shown
   read-only if one already exists).
1. **Complete required metadata:** Name, Publish version (three-part major.minor.patch),
   Short description, Description, and Developer (under Author). Optional metadata under
   *More*: Developer website (HTTPS), Terms of use (HTTPS), Privacy statement (HTTPS). Do not
   include secrets, API keys, or sensitive information in metadata fields — they are visible
   to users.
1. **Choose publish options:** select *Next: Publish options*, then Direct publish or
   Download & customize.

Sources for the workflow above:
[Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry).

### "Just you" vs "People in your organization" scopes

On the *Direct publish* tab, the "Choose who can use this agent" section offers two scopes
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)):

| Scope | Admin approval | Where it appears | Best for |
|---|---|---|---|
| Just you | None; available immediately | *Your agents* in the agent store; shareable via agent link | Personal testing, small teams, pilots |
| People in your organization | Required | *Built by your org* for all tenant users once approved | Organization-wide distribution and production |

For organization scope, a Microsoft 365 admin reviews and approves the request in the
Microsoft 365 admin center (admin.cloud.microsoft, Agents > Requests), and tenant app
policies control which users can access the agent
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

### Download and customize the manifest

On the Publish options step, select the *Download & customize* tab, then *Download ZIP* to
download a `.zip` containing the *agent manifest*. Customize the manifest as needed, then in
Microsoft Teams upload it: Apps > Manage your apps > Upload an app > "Upload a custom app" or
"Submit an app to your org", and choose the downloaded `.zip`
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

### Limitations

- File uploads and image generation do not work for agents published to Microsoft 365; they
  do work in Microsoft Teams.
- Private Link is not supported for Teams or Azure Bot Service integrations.
- Published agents do not support streaming responses or citations.
- Publishing to Microsoft 365 Copilot and Microsoft Teams is an **Early Access Preview**,
  licensed as part of your Azure subscription and subject to the Preview and Early Access
  Preview supplemental terms; agents published to Copilot or Teams are also subject to
  Microsoft 365 supplemental terms.

Sources for the limitations above:
[Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry).

## Microsoft Agent 365 and autopilots (AI teammates)

Microsoft Agent 365 (A365) is "Microsoft's IT admin control plane for AI agents." It applies
identity, security, governance, and lifecycle management to AI agents at scale, regardless of
where they are built or acquired
([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).
The section anchored as `create-ai-teammates` is now titled "Create autopilots"; "autopilots"
and "AI teammates" refer to the same concept
([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).

### The five capabilities

1. **Registry** — a complete inventory of agents, including Microsoft Foundry and Copilot
   Studio agents, admin-registered agents, and shadow agents discovered in the tenant.
1. **Access control** — brings agents under management and limits access to only needed
   resources using Microsoft Entra–based controls and risk-based Conditional Access policies.
1. **Visualization** — explore connections between agents, people, and data, and monitor
   agent behavior and performance in real time.
1. **Interoperability** — equips agents with access to Microsoft 365 apps and organizational
   data; agents can also connect to Work IQ for organizational context and knowledge.
1. **Security** — protects agents from threats and vulnerabilities by integrating with
   Microsoft's security stack.

Sources for the capabilities above:
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates).

### Auto-registration and hosted-agent participation

- All Foundry agents automatically appear in the Agent 365 registry on creation, with no
  extra configuration; admins see metadata such as name, description, tools, agent identity,
  and agent blueprint.
- Foundry agents are governed alongside Copilot Studio and other ecosystem SaaS agents in a
  unified registry view.
- Foundry **Hosted** agents can be pushed as autopilots to Agent 365. Once approved in the
  Microsoft admin center, these agents can be hired by others in the organization.
- Microsoft Entra network controls and risk-based Conditional Access are **generally
  available** in Agent 365 and apply to both Foundry-hosted agents managed through Agent 365
  and endpoint-hosted agents.

Sources for the items above:
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates).

### Prerequisites for autopilots

1. Microsoft 365 E7 license.
1. An Azure subscription where you can create resources.
1. Owner role on the Azure subscription.
1. *Foundry User* or *Cognitive Services User* role at subscription or resource group scope.
1. A tenant admin role that can approve agent requests in the Microsoft 365 admin center.
1. A region that supports Hosted agents.
1. Tooling: Azure CLI, Azure Developer CLI (azd), Docker, and the .NET 9.0 SDK.
1. Depending on tenant settings, additional Azure CLI sign-in scopes (Foundry, Microsoft
   Graph, Azure Resource Manager) may be required before provisioning.

Sources for the prerequisites above:
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates).

### Code-sample-only workflow (no UI)

The autopilot experience currently has no UI and must be completed using a code sample at
`samples/csharp/FoundryA365` in the `foundry-samples` repository
(github.com/microsoft-foundry/foundry-samples). The sample creates or updates the Azure
resources required to run it, creates an agent version, configures endpoint traffic to always
route to that version, and submits an autopilot request that requires admin approval
([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).

```bash
az login
azd auth login
azd provision
azd env get-values
```

After success there is a published agent application and an autopilot request ready for admin
approval ([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).

### Admin approval and Teams configuration

1. Approve the agent blueprint request in the Microsoft 365 admin center at
   `https://admin.cloud.microsoft/?#/agents/all/requested`. After approval, the agent appears
   in the Agent 365 registry.
1. Configure Teams integration in the Teams Developer Portal at
   `https://dev.teams.microsoft.com/tools/agent-blueprint`, locating the approved agent
   blueprint. If it is not listed, copy the blueprint ID from `azd env get-values` and replace
   it in the portal URL.
1. In Microsoft Teams, go to Apps, then *Agents for your team*, find the agent, and create an
   instance.

Sources for the approval flow above:
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates).

### Limits and failure modes

- The Teams Developer Portal list shows only the first **100 blueprints**; use the blueprint
  ID URL workaround for additional blueprints.
- `azd provision` failures map to: missing permissions (need Owner + Foundry/Cognitive
  Services User), wrong region (must support Hosted agents), or Docker not running (container
  build/push fails).
- Approval-finding issues stem from incomplete approval steps or insufficient tenant admin
  permissions.

Sources for the limits above:
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates).

## RBAC role renames

Foundry RBAC roles were recently renamed. Role IDs and core permissions are unchanged by the
rename, and previous names may still appear during rollout
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry),
[Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates)).

| Previous name | New name | IDs / permissions |
|---|---|---|
| Azure AI User | Foundry User | Unchanged |
| Azure AI Owner | Foundry Owner | Unchanged |
| Azure AI Account Owner | Foundry Account Owner | Unchanged |
| Azure AI Project Manager | Foundry Project Manager | Unchanged |

Note: publishing to Microsoft 365 Copilot and Teams can also require the *Azure Bot Service
Contributor* role on the bot service resource group to resolve a
`403 AuthorizationFailed` on `Microsoft.BotService/botServices/write`
([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

## Caveats and freshness

- **Preview-sensitive items.** Publishing to Microsoft 365 Copilot and Teams is an Early
  Access Preview; autopilots, routines, incoming A2A, the three memory types, the agent
  optimizer, and hosted agents with Voice Live are public preview. Behavior, limits, and
  terms can change ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry),
  [Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- **Timing claims.** Several statuses are time-relative to Build 2026: hosted agents reaching
  GA within ~30 days, publishing GA next month, tracing/evaluation GA later in June 2026, and
  the agent optimizer reaching public preview within ~30 days. Re-validate current GA status
  before production commitments ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- **Limits to re-validate.** The 100-blueprint Teams Developer Portal limit, region support
  for hosted agents, and quota numbers are not exhaustively enumerated in these sources;
  confirm against the current Foundry agents docs and limits pages
  ([Agent 365 how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry#create-ai-teammates),
  [Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- **Data residency.** Customers are responsible for managing whether data flows outside their
  organization's Azure compliance and geographic boundaries, and agents interacting with
  external/third-party tools are subject to those services' own data-processing terms
  ([Publish to Copilot how-to](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).
