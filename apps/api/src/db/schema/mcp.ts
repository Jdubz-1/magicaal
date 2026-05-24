import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { tenants } from './auth';

export const mcpServers = sqliteTable('mcp_servers', {
  id: text('id').primaryKey(),
  tenantId: text('tenant_id')
    .notNull()
    .references(() => tenants.id),
  name: text('name').notNull(),
  transport: text('transport', { enum: ['stdio', 'http'] }).notNull(),
  url: text('url'),
  command: text('command'),
  argsJson: text('args_json'),
  envJson: text('env_json'),
  enabled: integer('enabled', { mode: 'boolean' }).notNull().default(true),
  lastTestedAt: integer('last_tested_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
