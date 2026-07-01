# Demo Catalog

Build-keynote-quality demos for Azure AI, GitHub Copilot, .NET, and SaaS.

## Categories

| Category | Folder | Focus |
|----------|--------|-------|
| Azure AI | [`azure-ai/`](azure-ai/) | Azure AI Foundry, OpenAI, Agents, MCP |
| GitHub Copilot | [`github-copilot/`](github-copilot/) | Extensions, custom agents, skills, MCP servers |
| .NET Aspire | [`dotnet-aspire/`](dotnet-aspire/) | Cloud-native, distributed apps, AI integration |
| SaaS Multitenancy | [`saas-multitenancy/`](saas-multitenancy/) | Tenant isolation, Entra ID, ARB patterns |
| Bleeding Edge | [`bleeding-edge/`](bleeding-edge/) | Preview features, experimental, just-announced |
| Hypervelocity Engineering | [`hypervelocity-engineering/`](hypervelocity-engineering/) | HVE-Core, RPI workflow, GitHub Backlog Manager |
| SpecKit | [`speckit/`](speckit/) | Spec-Driven Development workflows |

## Active Demos

| Demo | Category | Status | Relevance |
|------|----------|--------|-----------|
| [Marketplace Channel Adapter](hypervelocity-engineering/marketplace-channel-adapter/README.md) | Hypervelocity Engineering | Active | HVE-Core RPI end-to-end + GitHub Backlog Manager |
| [Immutable Audit Trail](speckit/audit-trail/README.md) | SpecKit | Active | Spec-Driven Development end-to-end with SpecKit |

## Demo Quality Bar

Every demo must pass the review gate:

- [ ] **Self-contained** — runs with a single command (`azd up` or `dotnet run`)
- [ ] **README** — what it does, why it matters, architecture diagram, talk track
- [ ] **Stage-ready** — would you put this in front of Satya Nadella?
- [ ] **Bleeding-edge** — uses the latest SDK/API/feature (not last year's tech)
- [ ] **Tested** — actually works, not just compiles
