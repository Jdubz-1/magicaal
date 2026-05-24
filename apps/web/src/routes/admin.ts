import { Router } from 'express';
import { requireAdminSession } from '../middleware/session';
import { createApiClient } from '../lib/api-client';
import { layout, escHtml } from '../views/layout';

export const adminRouter = Router();

adminRouter.use(requireAdminSession);

adminRouter.get('/', (req, res) => {
  const user = req.session!;
  res.send(
    layout(
      `<div class="container" style="margin-top:2rem">
        <h1 style="margin:0 0 1.5rem;font-size:1.5rem">Admin</h1>
        <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:1rem">
          <a class="card" href="/admin/users" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Users</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Manage user accounts</div>
          </a>
          <a class="card" href="/admin/tenants" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Tenants</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Manage tenants</div>
          </a>
          <a class="card" href="/admin/agents" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Agents</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">All agents across tenants</div>
          </a>
          <a class="card" href="/admin/system" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">System</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Health &amp; diagnostics</div>
          </a>
        </div>
      </div>`,
      { title: 'Admin — MagiCaal', user: { name: user.userId, role: user.role } },
    ),
  );
});

adminRouter.get('/users', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: users } = await api.get<Array<{ id: string; name: string; email: string; role: string; active: boolean }>>('/v1/users');
    const user = req.session!;

    const rows = users.map((u) => `
      <tr>
        <td>${escHtml(u.name || '—')}</td>
        <td>${escHtml(u.email)}</td>
        <td>${escHtml(u.role)}</td>
        <td>${u.active ? 'Active' : '<span style="color:#f87171">Inactive</span>'}</td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Users</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Users — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/tenants', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: tenants } = await api.get<Array<{ id: string; name: string; slug: string; enabled: boolean }>>('/v1/tenants');
    const user = req.session!;

    const rows = tenants.map((t) => `
      <tr>
        <td>${escHtml(t.name)}</td>
        <td>${escHtml(t.slug)}</td>
        <td>${t.enabled ? 'Enabled' : '<span style="color:#f87171">Disabled</span>'}</td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Tenants</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Slug</th><th>Status</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Tenants — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/agents', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: agents } = await api.get<Array<{ id: string; name: string; handle: string; status: string; enabled: boolean }>>('/v1/agents');
    const user = req.session!;

    const rows = agents.map((a) => `
      <tr>
        <td>${escHtml(a.name)}</td>
        <td><code>${escHtml(a.handle)}</code></td>
        <td>${escHtml(a.status)}</td>
        <td>${a.enabled ? 'Enabled' : '<span style="color:#f87171">Disabled</span>'}</td>
        <td><a href="/studio/${escHtml(a.id)}" style="color:#7c6af7">Open</a></td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Agents</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Handle</th><th>Status</th><th>Enabled</th><th></th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Agents — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/system', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: health } = await api.get<{ api: string; engine: string }>('/v1/system');
    const user = req.session!;

    const badge = (v: string) =>
      v === 'ok'
        ? `<span style="background:#14532d;color:#86efac;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.75rem">OK</span>`
        : `<span style="background:#3b1f1f;color:#fca5a5;padding:0.2rem 0.5rem;border-radius:4px;font-size:0.75rem">${escHtml(v.toUpperCase())}</span>`;

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">System Health</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Service</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td>API</td><td>${badge(health.api)}</td></tr>
              <tr><td>Engine</td><td>${badge(health.engine)}</td></tr>
            </tbody>
          </table>
        </div>
      </div>`, { title: 'System — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});
