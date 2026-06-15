import type { RequestHandler } from 'express';
import { McpClient, type McpServerConfig } from '../mcp/mcp-client';

export const testMcpServerInternal: RequestHandler = async (req, res, next) => {
  try {
    const serverConfig = req.body as McpServerConfig;
    if (!serverConfig.id || !serverConfig.transport) {
      throw Object.assign(new Error('id and transport required'), { status: 400 });
    }

    const client = new McpClient(serverConfig);
    try {
      await client.connect();
      await client.initialize();
      const tools = await client.listTools();
      await client.disconnect();
      res.json({ ok: true, tools });
    } catch (err) {
      await client.disconnect().catch(() => {});
      throw Object.assign(
        new Error(`MCP connection failed: ${err instanceof Error ? err.message : String(err)}`),
        { status: 502 },
      );
    }
  } catch (err) {
    next(err);
  }
};
