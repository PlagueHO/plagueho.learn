# plagueho.learn

[![CI][ci-shield]][ci-url]
[![License][license-shield]][license-url]

External-facing learning content for Daniel Scott-Raynsford — demos,
presentations, learning pathways, and reusable patterns for sharing and
presenting at events, workshops, and online.

> **Looking for agentic workflow automation & OS assets?**
> Visit **[PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os)**
>
> **Looking for agent plugins and skills?**
> Visit **[PlagueHO/skills](https://github.com/PlagueHO/skills)**

## Demos ([`demos/`](demos/))

Build-keynote-quality demos organized by technology area. Every demo is
self-contained with README, source code, and deployment instructions.

| Category | Folder | Focus |
|---|---|---|
| Azure AI | [`demos/azure-ai/`](demos/azure-ai/) | Azure AI Foundry, OpenAI, agents, MCP |
| GitHub Copilot | [`demos/github-copilot/`](demos/github-copilot/) | Extensions, custom agents, skills, MCP servers |
| .NET Aspire | [`demos/dotnet-aspire/`](demos/dotnet-aspire/) | Cloud-native distributed apps with AI |
| SaaS Multitenancy | [`demos/saas-multitenancy/`](demos/saas-multitenancy/) | Tenant isolation, Entra ID, ARB patterns |
| Bleeding Edge | [`demos/bleeding-edge/`](demos/bleeding-edge/) | Preview features, just-announced capabilities |

## Learning Pathways ([`learning-pathways/`](learning-pathways/))

Curated learning pathways for key technology areas, designed for self-paced
study or guided workshop delivery.

## Patterns ([`patterns/`](patterns/))

Reusable development patterns with explanations of when and how to apply them.

## Repository Structure

```text
plagueho.learn/
├── .github/                    # GitHub configuration
│   ├── instructions/           # Copilot instruction files
│   ├── workflows/              # GitHub Actions workflows
│   ├── ISSUE_TEMPLATE/         # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   ├── CODEOWNERS
│   └── copilot-instructions.md
├── .vscode/                    # VS Code workspace settings
├── demos/                      # Presentation-ready demos
│   ├── azure-ai/               # Azure AI Foundry, OpenAI, agents
│   ├── github-copilot/         # Copilot extensions, agents, MCP
│   ├── dotnet-aspire/          # .NET Aspire cloud-native apps
│   ├── saas-multitenancy/      # SaaS patterns, ARB references
│   └── bleeding-edge/          # Preview and experimental features
├── learning-pathways/          # Curated learning pathways
├── patterns/                   # Reusable development patterns
├── scripts/                    # Utility scripts
└── README.md
```

## Related Repositories

| Repository | Purpose |
|---|---|
| [PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os) | Agentic workflow automation, Copilot agents, prompts |
| [PlagueHO/skills](https://github.com/PlagueHO/skills) | Agent plugin marketplace |

## License

[MIT License](LICENSE)

[ci-shield]: https://github.com/PlagueHO/plagueho.learn/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/PlagueHO/plagueho.learn/actions/workflows/ci.yml
[license-shield]: https://img.shields.io/github/license/PlagueHO/plagueho.learn.svg
[license-url]: https://github.com/PlagueHO/plagueho.learn/blob/main/LICENSE
