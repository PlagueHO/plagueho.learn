---
title: "Multiple-Agent Workflow Automation Architecture on Azure"
source_url: "https://learn.microsoft.com/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation"
source_title: "Multiple-Agent Workflow Automation Architecture | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "architecture-reference"
dimensions:
  - "architecture:enterprise"
  - "deployment:azure"
  - "patterns:all"
  - "scalability"
extracted: "2026-06-18"
quality: "draft"
---

## Overview

This architecture describes **a process automation system that uses multiple specialized AI agents to coordinate and run organizational tasks automatically**.

> "Multiple AI agents collaborate through a central API orchestrator to build scalable automation pipelines. Custom software that uses Microsoft Agent Framework defines the agent and orchestration behavior, and you deploy the agents in Azure Container Apps where they use Foundry Tools."

## Architecture Components

### Core Components

1. **App Service Website** (Frontend)
   - Provides user interface for requesting/managing automated solutions
   - Responsive web experience for task submission and progress tracking

2. **Container Apps API** (Central Orchestration)
   - Central orchestration layer processing user requests
   - Breaks down tasks and determines required AI agents
   - Separates tasks into component parts for multi-agent coordination
   - Hosts custom Agent Framework code
   - Serverless container platform for microservices

3. **Microsoft Foundry** (AI Services)
   - Unified PaaS for enterprise AI operations
   - Hosts GPT-4.1 models via chat interface
   - **Foundry Agent Service**: Managed runtime connecting models, tools, frameworks
   - Manages conversations, orchestrates tool calls, enforces content safety
   - Integrates identity, networking, observability systems

4. **Azure Cosmos DB** (Persistence)
   - Globally distributed, multiple-model database
   - Stores current and past automation plans and solutions
   - Maintains historical task data for learning/optimization
   - Persists agent decisions and outcomes for reference

5. **Container Registry** (Image Management)
   - Managed Docker registry for container images
   - Stores versioned images for front-end website and back-end API
   - Enables version control and rollback capabilities

6. **GitHub** (Source Control & CI/CD)
   - Source repository triggers automatic builds on code updates
   - Docker builds and deploys updated images
   - Continuous integration pipeline

## Workflow Steps

```
1. User submits task request via App Service website
   ↓
2. App Service calls Container Apps API
   ↓
3. Container Apps API connects to Foundry GPT-4.1 model
   ↓
4. API orchestrates multiple specialized AI agents
   ↓
5. Agents collaborate on task operations
   ↓
6. Azure Cosmos DB stores plans, data, historical info
   ↓
7. GitHub triggers CI/CD builds for image updates
   ↓
8. Docker builds and pushes images to Container Registry
```

## Key Concepts

### Fact 1: Multi-Agent Orchestration Patterns

The architecture supports multiple orchestration patterns for coordinating agents:

> "When you design multiple-agent automation systems, consider how agents must coordinate to accomplish complex workflows."

**Pattern Selection**:
- **Sequential**: Dependent tasks like document approval workflows
- **Concurrent**: Independent operations like parallel data collection
- **Group Chat**: Collaborative problem-solving
- **Handoff**: Different specialists handle different workflow phases
- **Magentic**: Manager agent decides task decomposition for complex workflows

See [AI agent orchestration patterns](../../ai-ml/guide/ai-agent-design-patterns) for architectural patterns and implementation considerations.

### Fact 2: Alternative: Foundry Agent Service (No-Code)
> "Use Foundry Agent Service to define agents and connect them individually to relevant knowledge stores and tools. In this no-code solution, you define agent behavior through a system prompt."

**Current Approach** (Code-First):
- Custom Agent Framework SDK code for orchestration
- Container Apps runs orchestration logic
- Maximum control over agent behavior

**Alternative Approach** (No-Code):
- Foundry Agent Service hosts/manages agents
- Define behavior via system prompts
- No control of agent compute

**Choose Alternative if:**
- Don't need deterministic orchestration
- Sufficient definition via system prompts
- Don't require full compute control
- Only need HTTPS-reachable tools

**Hybrid Approach**:
- Use Foundry Agent Service for standard workflows
- Use Container Apps for critical/highly customized processes

### Fact 3: Use Cases

#### Code Modernization & Migration
- **SQL Query Translation**: Coordinate specialized agents for dialect translation
  - SQL analysis agent identifies dialect-specific constructs
  - Translation agent converts syntax
  - Validation agent tests equivalence
  - Documentation agent generates migration notes
  
- **Legacy Application Modernization**: Code analysis → business logic extraction → assessment → planning

- **Database Schema Migration**: Schema analysis → data type mapping → constraint translation → validation

#### Enterprise Process Automation
- **Employee Onboarding**: IT provisioning, HR documentation, facility access, training, compliance
- **Contract Management**: Legal review, procurement approval, financial analysis, vendor communication
- **Incident Response**: Technical remediation, stakeholder communication, documentation, analysis

#### Financial Services & Compliance
- **Regulatory Compliance Automation**: Data collection, analysis, reporting across frameworks
- **Loan Processing**: Credit analysis, risk assessment, documentation review, approvals
- **Audit Preparation**: Evidence gathering, documentation, interviews, verification

#### Healthcare & Research
- **Clinical Trial Management**: Patient recruitment, compliance, data collection, safety monitoring
- **Patient Care Coordination**: Scheduling, treatment planning, insurance verification, communication
- **Medical Equipment Procurement**: Requirements, specifications, vendor evaluation, approval

#### Manufacturing & Supply Chain
- **Product Launch Coordination**: Design finalization, manufacturing setup, QA, marketing, distribution
- **Supplier Onboarding**: Qualification, contract negotiation, system integration, monitoring
- **Quality Incident Management**: Investigation, root cause analysis, corrective actions, supplier communication

## Deployment & Operations

### Continuous Integration
- GitHub triggers builds on code updates
- Docker builds container images
- Images pushed to Container Registry for versioning

### Scalability
- Container Apps serverless scaling
- Cosmos DB global distribution
- Elastic compute based on demand

### Cost Optimization
- Usage-based pricing for most resources
- Container Registry has daily fixed cost
- Pricing varies by region and usage
- See [Azure pricing estimate](https://azure.com/e/a96b2497ec854b89a99362bde8d20e84)

### Deployment
[GitHub repo with implementation](https://github.com/microsoft/Multi-Agent-Custom-Automation-Engine-Solution-Accelerator)

**Code Modernization Implementation:**
[Modernize your code implementation](https://github.com/microsoft/Modernize-your-code-solution-accelerator) — demonstrates SQL query modernization with multiple agents

## Key Concepts

- **Orchestration Patterns**: Sequential, Concurrent, Group Chat, Handoff, Magentic
- **Agent Framework SDK**: Custom code for deterministic orchestration
- **Foundry Agent Service**: Managed runtime for agents
- **Mesh Topology**: Direct agent connections (handoff)
- **Star Topology**: Orchestrator-mediated (group chat, magentic)
- **Tool Calls**: Agents invoke tools/external services
- **Context Management**: Conversation history shared/managed between agents
- **Durable Execution**: Checkpointing, failure recovery, state persistence

## Links

- [AI Agent Design Patterns](../../ai-ml/guide/ai-agent-design-patterns)
- [Agent Framework Documentation](https://learn.microsoft.com/agent-framework/)
- [Azure Container Apps](https://learn.microsoft.com/azure/container-apps/)
- [Azure Cosmos DB](https://learn.microsoft.com/azure/cosmos-db/)
- [Foundry Documentation](https://learn.microsoft.com/azure/foundry/)
- [Multi-Agent Solution Accelerator](https://github.com/microsoft/Multi-Agent-Custom-Automation-Engine-Solution-Accelerator)
- [Code Modernization Accelerator](https://github.com/microsoft/Modernize-your-code-solution-accelerator)
