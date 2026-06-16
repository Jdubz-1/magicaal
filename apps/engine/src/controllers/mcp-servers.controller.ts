import type { RequestHandler } from 'express';
import { McpClient, type McpServerConfig } from '../mcp/mcp-client';

const TEST_TIMEOUT_MS = 15_000;

export const testMcpServerInternal: RequestHandler = async (req, res, next) => {
  try {
    const serverConfig = req.body as McpServerConfig;
    if (!serverConfig.id || !serverConfig.transport) {
      throw Object.assign(new Error('id and transport required'), { status: 400 });
    }

    const client = new McpClient(serverConfig);

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(Object.assign(new Error(`MCP server test timed out after ${TEST_TIMEOUT_MS / 1000}s`), { status: 504 })),
        TEST_TIMEOUT_MS,
      ),
    );

    const testPromise = (async () => {
      await client.connect();
      await client.initialize();
      const tools = await client.listTools();
      await client.disconnect();
      return tools;
    })();

    try {
      const tools = await Promise.race([testPromise, timeoutPromise]);
      res.json({ ok: true, tools });
    } catch (err) {
      await client.disconnect().catch(() => {});
      throw Object.assign(
        new Error(`MCP connection failed: ${err instanceof Error ? err.message : String(err)}`),
        { status: (err as { status?: number }).status ?? 502 },
      );
    }
  } catch (err) {
    next(err);
  }
};
