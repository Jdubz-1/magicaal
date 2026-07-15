export async function sessionsCommand(
  subCommand: string,
  handle: string | undefined,
  apiUrl: string,
  tokenOpt?: string,
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

  const token = tokenOpt ?? process.env.MAGICAAL_API_TOKEN;
  if (!token) {
    console.error('An API token is required: pass --token or set MAGICAAL_API_TOKEN');
    process.exitCode = 1;
    return;
  }

  // The route resolves the parameter as an agent id or handle (tenant-scoped)
  const url = `${apiUrl}/v1/agents/${encodeURIComponent(handle)}/sessions/migrate`;

  console.log(`Triggering session migration: ${url}`);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 401 || res.status === 403) {
      console.error(`Error ${res.status}: authentication failed — check your token (--token / MAGICAAL_API_TOKEN)`);
      process.exitCode = 1;
      return;
    }
    if (res.status === 404) {
      console.error(`Error 404: no agent with handle or id "${handle}" in your tenant`);
      process.exitCode = 1;
      return;
    }
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
