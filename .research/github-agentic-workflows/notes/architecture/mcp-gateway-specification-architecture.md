---
source_url: https://github.github.com/gh-aw/reference/mcp-gateway/
source_title: MCP Gateway Specification
source_date: 2026-05-12
area: architecture
dimensions:
  - mcp-integration
  - technical-architecture
  - safe-outputs-and-security
  - tool-integration
  - execution-flow
extracted: 2026-05-12
quality: draft
---

## MCP gateway specification architecture

### Overview

This source is a formal MCP Gateway specification defining architecture, configuration schema, protocol behavior, isolation model, auth model, guard policy, and compliance tests for MCP integration in agentic workflows. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)

### Key facts

1. The gateway provides unified HTTP access across multiple MCP servers, including containerized stdio and HTTP backends, with protocol translation and isolation. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
2. Stdio servers must be containerized; direct command execution without containerization is not supported by the spec. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
3. Operational model is headless: config via stdin JSON, secrets via environment variables, startup output to stdout, and serving on configured HTTP port. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
4. Core endpoints are POST /mcp/{server-name}, GET /health, and POST /close. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
5. /close behavior is defined as authenticated graceful shutdown with idempotent 410 responses on subsequent calls. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
6. Isolation requirements include per-server containers, isolated streams, credential boundaries, and prevention of cross-server access. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
7. Guard policy defines integrity levels merged > approved > unapproved > none > blocked and a deterministic precedence algorithm across blocked-users, refusal-labels, trusted-users, and approval-labels. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
8. OIDC upstream auth for HTTP servers is supported via auth.type github-oidc and requires id-token write permissions in workflows. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
9. Fail-fast validation requires rejecting unknown or invalid configuration and exiting with status code 1 before serving. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
10. The spec includes normative compliance suites across configuration, translation, isolation, auth, lifecycle, telemetry, and guard policy categories. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)

### Quotable passages

- "The gateway SHALL NOT support direct command execution without containerization." (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- "The gateway MUST reject configurations containing unrecognized fields at the top level." (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- "The gateway API key should not be treated as a secure lock against code already running inside the agent container." (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)

### Code snippets

```json
// Status: unverified
{
  "mcpServers": {
    "github": {
      "container": "ghcr.io/github/github-mcp-server:latest",
      "type": "stdio"
    },
    "remote-server": {
      "type": "http",
      "url": "https://api.example.com/mcp",
      "headers": {
        "Authorization": "Bearer ${API_TOKEN}"
      }
    }
  },
  "gateway": {
    "port": 8080,
    "domain": "localhost",
    "apiKey": "${MCP_GATEWAY_API_KEY}",
    "startupTimeout": 30,
    "toolTimeout": 60
  }
}
```

Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>

```http
# Status: unverified
POST /mcp/{server-name}
GET /health
POST /close
```

Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>

### Relationships to other dimensions

- Connects MCP integration and security through mandatory containerization, API key auth, isolation boundaries, and guard policy filtering. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- Connects MCP integration and execution flow through endpoint semantics, lazy server startup, timeout enforcement, and lifecycle control via /close. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- Connects architecture and observability through health endpoints, runtime error schema, and optional OpenTelemetry tracing controls. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)

### Limitations and constraints

- command field is unsupported for stdio execution; container field is required for stdio servers. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- auth field is only valid for HTTP server type and must be rejected for stdio server definitions. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)
- Configuration must meet strict schema and fail-fast rules; invalid configs prevent startup entirely. (Source: <https://github.github.com/gh-aw/reference/mcp-gateway/>)

### Questions raised

- Which gateway compliance subset is required by default in GitHub-hosted production pipelines?
- How are guard policy defaults versioned when specification revisions introduce new fields?
- What operational limits are recommended for startupTimeout and toolTimeout across heterogeneous MCP backends?
