import { eq } from 'drizzle-orm';
import type { SessionConfig, AgentGraphDefinition } from '@magicaal/core';
import { db } from '../db/client';
import { agents, agentVersions } from '../db/schema';

/** Read the agent's current SessionConfig from its published graph definition. */
export async function loadAgentSessionConfig(agentId: string): Promise<SessionConfig | null> {
  const rows = await db
    .select({ graphJson: agentVersions.graphJson })
    .from(agents)
    .innerJoin(agentVersions, eq(agentVersions.id, agents.currentVersionId))
    .where(eq(agents.id, agentId));

  if (!rows[0]) return null;
  const definition = JSON.parse(rows[0].graphJson) as AgentGraphDefinition;
  return (definition.config?.session as SessionConfig | undefined) ?? null;
}
