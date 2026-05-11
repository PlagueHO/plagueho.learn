---
source_url: https://github.github.com/gh-aw/reference/github-tools/
source_title: GitHub Tools (for reading from GitHub)
source_date: 2026-05-12
area: architecture
dimensions:
  - tool-integration
  - mcp-integration
  - safe-outputs-and-security
  - execution-flow
extracted: 2026-05-12
quality: draft
---

## GitHub tools integration patterns

### Overview

This source specifies how tools.github is modeled for read access, integrity controls, repository scoping, access modes, and authentication, with a clear separation between read tooling and safe-output write paths. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)

### Key facts

1. Default toolsets include context, repos, issues, pull_requests, and users; additional toolsets can be explicitly enabled. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
2. toolsets all excludes dependabot unless dependabot is explicitly opted in. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
3. tools.github.min-integrity can enforce content trust filtering, with approved applied automatically for public repositories. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
4. tools.github.allowed-repos can constrain accessible repositories to all, public, or specific lowercase patterns with suffix wildcards only. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
5. tools.github.mode supports local, remote, and gh-proxy, with mode-specific auth and latency/security trade-offs. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
6. Additional authentication may be required for org/user data, private cross-repo reads, projects, and remote mode. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
7. dependabot toolset requires vulnerability-alerts read and security-events read permissions, now supported by GITHUB_TOKEN when configured. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
8. Read authentication for tools is distinct from write authentication for safe outputs. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)

### Quotable passages

- "The GitHub Tools (tools.github) allow the agentic step of your workflow to read information such as issues and pull requests from GitHub." (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- "toolsets: [all] does not include the dependabot toolset." (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- "Additional authentication to write to GitHub is handled separately through various Safe Outputs." (Source: <https://github.github.com/gh-aw/reference/github-tools/>)

### Code snippets

```yaml
# Status: unverified
tools:
  github:
    mode: remote
    toolsets: [default]
    allowed-repos:
      - "myorg/*"
      - "partner/shared-repo"
      - "myorg/api-*"
    min-integrity: approved
```

Source: <https://github.github.com/gh-aw/reference/github-tools/>

```yaml
# Status: unverified
permissions:
  vulnerability-alerts: read
  security-events: read
```

Source: <https://github.github.com/gh-aw/reference/github-tools/>

### Relationships to other dimensions

- Connects tool integration and security through integrity filtering and repository scope constraints before agent consumption. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- Connects tool integration and MCP by documenting MCP-based local/remote access modes and gh-proxy alternative mode. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- Connects tool integration and execution by shaping what data can be observed during runtime decision making. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)

### Limitations and constraints

- Pattern matching for allowed-repos is constrained to lowercase and suffix wildcards, reducing expressiveness by design. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- remote mode adds authentication requirements that do not apply in default local mode. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)
- dependabot capability requires explicit opt-in even when all toolsets is selected. (Source: <https://github.github.com/gh-aw/reference/github-tools/>)

### Questions raised

- Which mode is recommended by default for enterprise environments balancing latency and auditability?
- Is there an official migration strategy for large legacy repos fields to allowed-repos beyond gh aw fix?
- What is the expected performance impact of strict allowed-repos matching at scale?
