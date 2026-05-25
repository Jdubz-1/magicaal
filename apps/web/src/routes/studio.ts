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
