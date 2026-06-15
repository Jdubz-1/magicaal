import { Router, type Router as RouterType } from 'express';
import { requireAuth, requireMinRole } from '../middleware/auth';
import {
  listMcpServers,
  getMcpServer,
  createMcpServer,
  deleteMcpServer,
  testMcpServer,
} from '../controllers/mcp-servers.controller';

export const mcpServersRouter: RouterType = Router();

mcpServersRouter.use(requireAuth);

mcpServersRouter.get('/', listMcpServers);
mcpServersRouter.get('/:id', getMcpServer);
mcpServersRouter.post('/', requireMinRole('tenant_admin'), createMcpServer);
mcpServersRouter.delete('/:id', requireMinRole('tenant_admin'), deleteMcpServer);
mcpServersRouter.post('/:id/test', testMcpServer);
