export async function sessionsCommand(
  subCommand: string,
  handle: string | undefined,
  apiUrl: string,
): Promise<void> {
  if (subCommand !== 'migrate') {
    console.error(`Unknown sessions subcommand: ${subCommand}`);
    process.exitCode = 1;
    return;
  }

  if (!handle) {
    console.error('--agent <handle> is required for session migration');
    process.exitCode = 1;
    return;
  }
  const url = `${apiUrl}/v1/agents/${encodeURIComponent(handle)}/sessions/migrate`;

  console.log(`Triggering session migration: ${url}`);
  try {
    const res = await fetch(url, { method: 'POST' });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Error ${res.status}: ${body}`);
      process.exitCode = 1;
      return;
    }
    const result = await res.json() as { migrated: number; skipped: number; failed: number };
    console.log(`Migrated: ${result.migrated}, Skipped: ${result.skipped}, Failed: ${result.failed}`);
  } catch (err) {
    console.error(`Request failed: ${err instanceof Error ? err.message : String(err)}`);
    process.exitCode = 1;
  }
}
