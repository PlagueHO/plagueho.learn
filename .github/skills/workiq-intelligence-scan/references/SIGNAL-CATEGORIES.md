# Signal Categories Reference

Detailed criteria for classifying WorkIQ intelligence signals.

## Signal Types

### Repeated Topics

A technology or theme mentioned in 3+ separate conversations (meetings,
emails, chats) within the query window.

**Examples:**

- "Azure AI Foundry" appears in 2 partner meetings and 1 email thread
- "Multitenancy" discussed in 3 separate Teams chats with ISV partners

### Urgent Requests

Partner or customer asks that carry deadline pressure or executive
visibility.

**Indicators:**

- Explicit deadline mentioned ("need this by Build", "demo for exec review")
- Escalation language ("critical", "blocker", "exec ask")
- Follow-up messages requesting status updates

### Upcoming Events

Conferences, summits, reviews, or customer engagements that need demo
material.

**Examples:**

- Microsoft Build, Ignite, MVP Summit
- Partner-specific workshops or architecture reviews
- Internal team demos or readiness reviews

### New Tech Mentions

Technologies in preview or just announced that are generating discussion.

**Indicators:**

- References to "preview", "GA", "just announced", "new feature"
- Links to announcement blog posts in conversations
- Questions about how to use a new capability

### SaaS/ISV Topics

Multitenancy architecture, SaaS patterns, or ISV-specific guidance
requests.

**Indicators:**

- Tenant isolation questions
- Data partitioning discussions
- SaaS pricing or billing architecture
- Architecture Review Board (ARB) topics

## Signal Strength Criteria

| Strength | Icon | Criteria | Action |
|----------|------|----------|--------|
| Hot | 🔴 | 3+ mentions, deadline ≤ 2 weeks, or exec visibility | Create issue immediately |
| Warm | 🟡 | 2 mentions, or event within 1 month | Create issue with lower priority |
| Emerging | 🟢 | 1 mention of new/preview tech, or general interest | Log for monitoring only |

## Cross-Reference Amplifiers

A signal's strength increases by one level when a matching announcement
is found:

- Emerging + announcement → Warm
- Warm + announcement → Hot
- Hot + announcement → Hot (unchanged, already maximum)
