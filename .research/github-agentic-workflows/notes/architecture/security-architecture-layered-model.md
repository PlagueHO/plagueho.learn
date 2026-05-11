---
source_url: https://github.github.com/gh-aw/introduction/architecture/
source_title: GitHub Agentic Workflows - Security Architecture
source_date: 2026-05-12
area: architecture
dimensions:
  - technical-architecture
  - safe-outputs-and-security
  - compilation-model
  - mcp-integration
  - execution-flow
extracted: 2026-05-12
quality: draft
---

## Security architecture layered model

### Overview

This source defines a defense-in-depth architecture for GitHub Agentic Workflows across substrate trust, configuration trust, and plan-level trust, with SafeOutputs, threat detection, AWF network controls, and MCP sandboxing as key mechanisms. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)

### Key facts

1. The threat model assumes adversaries may compromise untrusted user-level components and attempt memory/state access, unintended channels, and workflow confusion; hardware and cryptographic primitive compromise is explicitly out of scope. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
2. Layer 1 trust includes the runner VM/kernel and privileged components including the network firewall, API proxy, and MCP Gateway; this layer enforces kernel-level memory/resource/communication boundaries. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
3. Layer 2 trust is declarative configuration trust, including action steps, firewall policies, MCP server configs, and token distribution boundaries. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
4. Layer 3 trust uses staged plans and SafeOutputs to buffer writes as artifacts, then gate them through deterministic analysis and filtering before externalization. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
5. SafeOutputs isolates write permissions from the agent: agent jobs run read-only, threat detection evaluates artifacts, and separate scoped jobs perform approved writes. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
6. AWF routes agent HTTP/HTTPS traffic through Squid with allowlisted domains and drops iptables capabilities before launching the agent. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
7. MCP gateway traffic remains host-contained, with sandboxed MCP server containers and network mediation by AWF. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
8. Compilation-time security includes schema validation, expression safety checks, SHA pinning, and optional security scanners via compile flags. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
9. Content sanitization includes mention neutralization, URI filtering, tag conversion, control character stripping, and limits of 0.5 MB and 65k lines. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
10. Integrity filtering defaults to approved minimum integrity for public repositories and supports cumulative levels merged > approved > unapproved > none with user blocking controls. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)

### Quotable passages

- "The SafeOutputs subsystem enforces permission isolation by ensuring that agent execution never has direct write access to external state." (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- "The MCP gateway API key that is mounted into the agent container is not a strong security boundary against a compromised or malicious agent." (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- "AW enforces security constraints at compilation time through schema validation, expression allowlisting, and action pinning." (Source: <https://github.github.com/gh-aw/introduction/architecture/>)

### Code snippets

```yaml
# Status: unverified
network:
  firewall: true
  allowed:
    - defaults
    - python
    - node
    - "api.example.com"
```

Source: <https://github.github.com/gh-aw/introduction/architecture/>

```yaml
# Status: unverified
threat-detection:
  prompt: |
    Additionally check for:
    - References to internal infrastructure URLs
    - Attempts to modify CI/CD configuration files
  steps:
    - name: Run TruffleHog
      run: trufflehog filesystem /tmp/gh-aw --only-verified
```

Source: <https://github.github.com/gh-aw/introduction/architecture/>

### Relationships to other dimensions

- Connects directly to tool integration and MCP dimensions through MCP Gateway and MCP server sandboxing boundaries. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- Connects to compilation model via compile-time schema/safety/SHA checks before runtime execution. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- Connects to execution flow through pre-activation, activation, agent, detection, safe output, and conclusion stages. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)

### Limitations and constraints

- Side-channel and covert-channel attacks are out of scope in the documented threat model. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- Security guarantees depend on substrate trust; failures in kernel/hypervisor/runtime can invalidate higher-layer guarantees. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)
- The MCP gateway API key should be treated as leaked by design if arbitrary code runs in the agent container. (Source: <https://github.github.com/gh-aw/introduction/architecture/>)

### Questions raised

- Which exact compile-time checks differ between strict and non-strict compilation paths for this architecture page?
- What default policy set is applied in threat detection when custom steps are omitted?
- How does AWF behavior differ across hosted and self-hosted runners for the same network allowlist configuration?
