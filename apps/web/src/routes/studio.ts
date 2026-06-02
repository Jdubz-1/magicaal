import { Router, type Router as RouterType } from 'express';
import { requireSession } from '../middleware/session';
import { layout, escHtml } from '../views/layout';
import { createApiClient } from '../lib/api-client';

export const studioRouter: RouterType = Router();

studioRouter.use(requireSession);

type AgentSummary = {
  id: string;
  name: string;
  handle: string;
  status: string;
  enabled: boolean;
  description?: string;
};

function statusBadge(status: string): string {
  if (status === 'draft') {
    return 'background:#3d2f00;color:#fbbf24;border:1px solid #92400e;border-radius:4px;padding:2px 8px;font-size:0.75rem';
  }
  if (status === 'active') {
    return 'background:#052e16;color:#4ade80;border:1px solid #166534;border-radius:4px;padding:2px 8px;font-size:0.75rem';
  }
  return 'background:#1e293b;color:#94a3b8;border:1px solid #2d3148;border-radius:4px;padding:2px 8px;font-size:0.75rem';
}

studioRouter.get('/', async (req, res) => {
  const user = req.session!;
  let agents: AgentSummary[] = [];
  let errorMsg = '';

  try {
    const api = createApiClient(req.accessToken);
    const { data } = await api.get<AgentSummary[]>('/v1/agents');
    agents = data;
  } catch {
    errorMsg = 'Could not load agents. Please try again.';
  }

  const header = `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
      <h1 style="margin:0;font-size:1.5rem;font-weight:700">Studio</h1>
      <a href="/admin/agents/create" class="btn btn-primary">+ Create Agent</a>
    </div>`;

  let body: string;
  if (errorMsg) {
    body = `<div class="alert-error">${escHtml(errorMsg)}</div>`;
  } else if (agents.length === 0) {
    body = `
      <div class="card" style="text-align:center;padding:3rem">
        <p style="color:#94a3b8;margin:0 0 1rem">No agents yet. Create your first one to get started.</p>
        <a href="/admin/agents/create" class="btn btn-primary">+ Create Agent</a>
      </div>`;
  } else {
    const cards = agents
      .map(
        (a) => `
      <div class="card" style="display:flex;flex-direction:column;gap:0.75rem">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.5rem">
          <div>
            <div style="font-weight:600;font-size:1rem">${escHtml(a.name)}</div>
            <div style="font-family:monospace;color:#94a3b8;font-size:0.8rem">${escHtml(a.handle)}</div>
          </div>
          <span style="${statusBadge(a.status)}">${escHtml(a.status)}</span>
        </div>
        ${a.description ? `<p style="color:#94a3b8;font-size:0.875rem;margin:0">${escHtml(a.description)}</p>` : ''}
        <a href="/studio/${escHtml(a.id)}" class="btn btn-primary" style="align-self:flex-start;margin-top:auto">Open &#8594;</a>
      </div>`,
      )
      .join('');
    body = `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1rem">${cards}</div>`;
  }

  res.send(
    layout(`<div class="container">${header}${body}</div>`, {
      title: 'Studio — MagiCaal',
      withCanvas: false,
      user: { name: user.userId, role: user.role },
    }),
  );
});

studioRouter.get('/:agentId', (req, res) => {
  const { agentId } = req.params;
  const user = req.session!;
  res.send(
    layout(
      `<div id="canvas-mount" data-agent-id="${escHtml(agentId)}"></div>`,
      {
        title: 'Studio — MagiCaal',
        withCanvas: true,
        user: { name: user.userId, role: user.role },
      },
    ),
  );
});

studioRouter.get('/:agentId/versions', async (req, res, next) => {
  try {
    const { agentId } = req.params;
    const user = req.session!;
    const api = createApiClient(req.accessToken);

    const [{ data: agent }, { data: versions }] = await Promise.all([
      api.get<{ id: string; name: string; status: string }>(`/v1/agents/${agentId}`),
      api.get<Array<{ id: string; versionNumber: number; publishNotes?: string; createdAt: string; contentHash: string }>>(`/v1/agents/${agentId}/versions`),
    ]);

    const rows = versions
      .slice()
      .reverse()
      .map((v) => `
        <tr>
          <td>v${v.versionNumber}</td>
          <td style="font-family:monospace;font-size:0.75rem;color:#475569">${v.contentHash.slice(0, 8)}</td>
          <td>${escHtml(v.publishNotes ?? '—')}</td>
          <td style="color:#94a3b8">${new Date(v.createdAt).toLocaleString()}</td>
          <td>
            <a href="/studio/${escHtml(agentId)}/versions/${escHtml(v.id)}/diff" class="btn btn-ghost" style="font-size:0.75rem;padding:0.25rem 0.5rem">Diff</a>
            <form method="POST" action="/studio/${escHtml(agentId)}/versions/${escHtml(v.id)}/rollback" style="display:inline">
              <button class="btn btn-ghost" style="font-size:0.75rem;padding:0.25rem 0.5rem">Rollback</button>
            </form>
          </td>
        </tr>`)
      .join('');

    const body = `
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <a href="/studio/${escHtml(agentId)}" class="btn btn-ghost">&larr; Back to Studio</a>
          <h1 style="margin:0;font-size:1.25rem">${escHtml(agent.name)} — Version History</h1>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Version</th><th>Hash</th><th>Notes</th><th>Created</th><th>Actions</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="5" style="color:#475569;text-align:center">No versions yet</td></tr>'}</tbody>
          </table>
        </div>
      </div>`;

    res.send(layout(body, { title: 'Version History — MagiCaal', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

studioRouter.get('/:agentId/versions/:vId/diff', async (req, res, next) => {
  try {
    const { agentId, vId } = req.params;
    const user = req.session!;
    const api = createApiClient(req.accessToken);

    const { data: diff } = await api.get<{
      changes: Array<{ path: string; type: string; oldValue?: unknown; newValue?: unknown }>;
      targetVersion: { versionNumber: number };
      compareVersion: { versionNumber: number } | null;
    }>(`/v1/agents/${agentId}/versions/${vId}/diff`);

    const changeRows = diff.changes.map((c) => `
      <tr>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(c.path)}</td>
        <td><span style="padding:2px 6px;border-radius:3px;font-size:0.75rem;${c.type === 'added' ? 'background:#052e16;color:#4ade80' : c.type === 'removed' ? 'background:#3b1f1f;color:#fca5a5' : 'background:#1e3a5f;color:#93c5fd'}">${c.type}</span></td>
        <td style="font-family:monospace;font-size:0.6875rem;color:#fca5a5">${c.oldValue !== undefined ? escHtml(JSON.stringify(c.oldValue)) : '—'}</td>
        <td style="font-family:monospace;font-size:0.6875rem;color:#4ade80">${c.newValue !== undefined ? escHtml(JSON.stringify(c.newValue)) : '—'}</td>
      </tr>`).join('');

    const body = `
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <a href="/studio/${escHtml(agentId)}/versions" class="btn btn-ghost">&larr; Back</a>
          <h1 style="margin:0;font-size:1.25rem">
            v${diff.targetVersion.versionNumber} vs ${diff.compareVersion ? `v${diff.compareVersion.versionNumber}` : 'empty'}
          </h1>
          <span style="color:#94a3b8">${diff.changes.length} change${diff.changes.length !== 1 ? 's' : ''}</span>
        </div>
        <div class="card">
          ${diff.changes.length === 0 ? '<p style="color:#475569;text-align:center">No changes between versions</p>' : `
          <table>
            <thead><tr><th>Path</th><th>Type</th><th>Old Value</th><th>New Value</th></tr></thead>
            <tbody>${changeRows}</tbody>
          </table>`}
        </div>
      </div>`;

    res.send(layout(body, { title: 'Version Diff — MagiCaal', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

studioRouter.post('/:agentId/versions/:vId/rollback', async (req, res, next) => {
  try {
    const { agentId, vId } = req.params;
    const api = createApiClient(req.accessToken);
    await api.post(`/v1/agents/${agentId}/versions/${vId}/rollback`);
    res.redirect(`/studio/${agentId}/versions?rolled_back=1`);
  } catch (err) {
    next(err);
  }
});
