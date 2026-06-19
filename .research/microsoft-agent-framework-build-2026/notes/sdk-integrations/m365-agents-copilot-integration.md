---
title: Microsoft 365 Agents & Copilot Integration
source_url: https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot
source_title: Bring your agents into Microsoft 365 Copilot
source_date: 2026-06-18
area: sdk-integrations
type: integration-guide
dimensions:
  - m365-copilot-integration
  - agents-sdk
  - channel-adapters
  - agent-manifest
  - oauth-permissions
extracted: 2026-06-18T00:00:00Z
quality: draft
---

## What

Microsoft 365 Agents Toolkit enables agents built in C#, JavaScript, or Python (hosted on Azure or custom infrastructure) to be integrated into Microsoft 365 Copilot Chat. The toolkit provides channel adapters, manifest configuration, and OAuth permission management to surface agents within the unified Microsoft 365 Copilot UI, making agents more discoverable and accessible to enterprise users.

## Key Facts

### Integration Approach

- Use **Microsoft 365 Agents Toolkit** and **Agents SDK** (supports C#, JavaScript, Python)
- Agents require minimal modification — add Agents SDK code and use built-in channel adapters
- Azure Bot Service sits between user surfaces (channels like M365 Copilot) and your code
- Bot Service translates channel messages into common activities that your code understands

### Supported Languages

- C# (Visual Studio recommended)
- JavaScript (Visual Studio Code recommended)
- Python (Visual Studio Code recommended)

### Prerequisites

1. Create app registration (Azure AD)
2. Create Azure Bot Service resource
3. Configure manifest file
4. (Optional) Set up OAuth for user-on-behalf-of actions

### Benefits

- Unified Microsoft 365 Copilot UI instead of separate agent interfaces
- Enterprise user discovery and accessibility
- Reuse existing agents built with Microsoft Agent Framework
- Minimal code changes required
- Support for permission requests (optional)

## Integration Steps

### Step 1: Create App Registration & Azure Bot Service

Create an Azure Bot Service resource with an app registration. The Bot Service manages communication between M365 Copilot channel and your agent code.

### Step 2: Configure Event Listeners

Structure your agent to listen for events from Microsoft 365 Copilot via Azure Bot Service using the `OnActivity` method:

```csharp
// Listen for any message from M365 Copilot
agent.OnActivity(async (context) =>
{
    // Your agent logic here
    // Existing agent can be called or referenced
});
```

The agent listens for any message activity from the channel and runs accordingly.

### Step 3: Create or Generate Manifest File

Microsoft 365 Copilot requires a `.zip` package containing a manifest file (`m365copilot-manifest.json`). The manifest includes:

- Instructions telling M365 Copilot where to look for the agent
- Metadata about the agent
- Hosted endpoint URL
- App registration ID reference
- OAuth configuration (if using permission requests)

**Manifest example structure**:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/copilot/m365copilot-manifest/v1/m365copilot-manifest.json",
  "name": "MyAgent",
  "description": "A helpful agent for task execution",
  "instructions": "You are a helpful assistant that can execute tasks.",
  "publisherInfo": {
    "name": "My Organization"
  },
  "icons": {
    "color": "icon-color.png",
    "outline": "icon-outline.png"
  },
  "actions": [
    {
      "id": "action1",
      "description": "Do something",
      "actionUrl": "https://myagent.example.com/api/actions/action1"
    }
  ],
  "auth": {
    "type": "oauth2",
    "authorizationUrl": "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    "tokenUrl": "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    "scopes": ["User.Read", "Mail.Send"]
  }
}
```

### Step 4 (Optional): Configure OAuth & Permissions

If your agent needs to act on behalf of the user:

1. Configure OAuth settings in Azure Bot Service
2. Request specific Microsoft 365 permissions (e.g., `User.Read`, `Mail.Send`)
3. Users will be prompted for permission during first use

## Implementation Examples

### C# Agent with M365 Copilot Event Handler

```csharp
using Microsoft.Bot.Builder;
using Microsoft.Bot.Schema;
using Microsoft.Agents.AI;

public class MyAgent : IBot
{
    private readonly AIAgent _agent;
    
    public MyAgent(AIAgent agent)
    {
        _agent = agent;
    }
    
    public async Task OnTurnAsync(ITurnContext turnContext, CancellationToken cancellationToken)
    {
        if (turnContext.Activity.Type == ActivityTypes.Message)
        {
            string userMessage = turnContext.Activity.Text;
            
            // Run your Agent Framework agent
            var response = await _agent.RunAsync(userMessage);
            
            // Send response back to M365 Copilot
            await turnContext.SendActivityAsync(
                MessageFactory.Text(response.ToString()),
                cancellationToken);
        }
    }
}

// In startup/DI configuration:
services.AddTransient<IBot, MyAgent>();
services.AddAgentFrameworkAgent(agent); // Your Agent Framework agent
```

### JavaScript Agent with Channel Adapter

```javascript
const { BotFrameworkAdapter, Bot } = require("microsoft-agents-sdk");
const { YourAgent } = require("./your-agent");

const adapter = new BotFrameworkAdapter({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD,
});

const agent = new YourAgent();

adapter.onMessage(async (context) => {
    const userMessage = context.activity.text;
    const response = await agent.run(userMessage);
    
    await context.sendActivity(response);
});

module.exports = adapter;
```

### Python Agent with M365 Copilot Integration

```python
from agent_framework import Agent
from aiohttp import web

class M365AgentHandler:
    def __init__(self, agent: Agent):
        self.agent = agent
    
    async def handle_activity(self, request):
        activity = await request.json()
        
        if activity.get("type") == "message":
            user_message = activity.get("text")
            
            # Run your Agent Framework agent
            response = await self.agent.run(user_message)
            
            return web.json_response({
                "type": "message",
                "text": response.text
            })
        
        return web.json_response({"status": "ok"})

# Create web app and register handler
app = web.Application()
app.router.add_post("/api/messages", handler.handle_activity)
```

## Toolkit Resources

- **Visual Studio Template**: Echo/Empty Agent sample available
- **Visual Studio Code Template**: Echo Agent sample for JavaScript/Python
- **Documentation**: Links provided for both VS and VSCode setup

## Manifest Deployment

1. Create or generate `m365copilot-manifest.json`
2. Package manifest with icons into `.zip` file
3. Upload to Microsoft 365 Copilot app catalog
4. Configure hosted endpoint URL and app ID

## Permission Model

### User-on-Behalf Permissions

If agent needs to access user resources:

1. Configure OAuth in manifest
2. Specify required scopes (e.g., `User.Read`, `Mail.Send`, `Files.Read`)
3. M365 Copilot prompts user for consent
4. Agent receives access token for user-scoped API calls

### Example with User Permissions

```csharp
// In your agent, access the user's token from context
if (turnContext.TurnState.TryGetValue("BotIdentity", out var identity))
{
    var userToken = await adapter.GetUserTokenAsync(
        turnContext, "ConnectionName", null, cancellationToken);
    
    // Use userToken to make user-scoped API calls
    // Example: send email on behalf of user
}
```

## Effort & Complexity

Effort required varies based on:
- Agent complexity
- Whether you need user-on-behalf token management
- How much your agent needs to access scoped user knowledge

**Quick start**: Use Microsoft 365 Agents Toolkit Echo/Empty Agent sample and follow Visual Studio or VSCode documentation.

## Links

- [Microsoft 365 Agents Toolkit](https://aka.ms/M365AgentsToolkit)
- [Agents SDK Documentation](../microsoft-365-agents-sdk)
- [Visual Studio Setup Guide](../create-new-toolkit-project-vs)
- [Visual Studio Code Setup Guide](../create-new-toolkit-project-vsc)
- [Manifest Schema](https://developer.microsoft.com/json-schemas/copilot/m365copilot-manifest/v1/m365copilot-manifest.json)
- [Azure Bot Service Documentation](../../../azure/bot-service/abs-quickstart)
- [GitHub Agents Samples](https://github.com/microsoft/Agents)

## Use Cases

1. **Custom Enterprise Assistants** — Agents trained on internal data, accessible from M365 Copilot
2. **Workflow Automation** — Email, calendar, document tasks triggered from Copilot
3. **Data Access Agents** — Agents querying internal databases/APIs via Copilot interface
4. **Specialized AI Tools** — Domain-specific agents (legal, HR, finance) unified in Copilot
5. **Developer Productivity** — Code generation, documentation, testing agents in unified UI

## Questions & Follow-ups

- How does token refresh work for long-running agent operations?
- Can manifest be updated without redeploying the agent?
- What is the latency impact of the Bot Service intermediary?
- How are permissions revoked if a user denies consent?
- Can agents be deployed to multiple Microsoft 365 tenants?
