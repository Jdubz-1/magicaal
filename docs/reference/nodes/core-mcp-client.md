# `core:mcp-client` — MCP Client

**Category:** integration · **Version:** 1.0.0

Connects to a registered [MCP server](../../developer-guide/mcp.md). Two modes:
- **`direct`** — calls a single named tool in normal graph flow, like any other node
- **`funnel`** — exposes **all** the server's tools via a tool edge (`this.tool(mcpNodeId, agentNodeId)`) to an agentic node (`core:react`/`core:tool-call`), which picks which to call at runtime

## Config

| Field | Type | Required | Description |
|---|---|---|---|
| `serverId` | `string` | Yes | ID of the registered MCP server |
| `mode` | `'direct' \| 'funnel'` | Yes | See above |
| `toolName` | `string` | For `mode: 'direct'` | Tool name to call |
| `inputKey` | `string` | No | Context key containing tool arguments (direct mode; default context key `input`) |
| `outputKey` | `string` | No | Context key to write the tool result to (direct mode; default `mcp_result`) |

## Behavior Notes

- **`funnel` mode's `execute()` is a no-op** in normal graph flow — `assembleTools()` in the engine's Tool Executor reads this node's config directly to populate the agentic node's available tools; the node itself never "runs" in the traditional sense.
- **`direct` mode is engine-special-cased**, like `core:tool-call`/`core:react` — real execution happens via the engine's MCP client pool (`apps/engine/src/mcp/`), keyed by the node's id in the graph. The `execute()` body is only a fallback reached in unit tests outside the engine.

## Example

```typescript
// Direct: call one specific tool in graph flow
this.node('get-weather', 'core:mcp-client', {
  serverId: 'weather-mcp', mode: 'direct', toolName: 'get_forecast', inputKey: 'location', outputKey: 'forecast',
});

// Funnel: let an agentic node pick from all of a server's tools
this.node('assistant', 'core:tool-call', { inputKey: 'task', outputKey: 'result' });
this.node('all-tools', 'core:mcp-client', { serverId: 'weather-mcp', mode: 'funnel' });
this.tool('all-tools', 'assistant');
```
