# MCP Client

`apps/engine/src/mcp/` connects agent graphs to external [Model Context Protocol](https://modelcontextprotocol.io/) servers, so an agent can call tools an MCP server exposes without a bespoke integration package.

## Client

`src/mcp/mcp-client.ts`'s `McpClient` speaks JSON-RPC 2.0 over one of two transports, per `McpServerConfig`:
- **`stdio`** — spawns a child process (`command`/`args`/`env`)
- **`http`** — Streamable HTTP to a `url`

It exposes the server's tools (`McpTool`: `name`, `description`, `inputSchema`) for a `core:mcp-client` node to call.

## Registry

`src/mcp/mcp-registry.ts` holds the set of configured MCP servers per tenant, backed by `apps/api`'s `mcp-servers` CRUD (`GET/POST /v1/mcp-servers`, `GET/DELETE /v1/mcp-servers/{id}`, `POST /v1/mcp-servers/{id}/test` to check connectivity before saving).

## Direct vs. Funnel Mode

An agent graph can call an MCP server's tools in two modes: **direct** (the graph explicitly wires a `core:mcp-client` node to one tool) or **funnel** (an agentic node is given the whole server's tool list and picks which to call at runtime, the same way it would pick from any other tool set). Which mode applies is a property of how the node is configured on the canvas, not of the MCP server itself.
