import { Router, type Router as RouterType } from 'express';
import { requireAdminSession } from '../middleware/session';
import { createApiClient } from '../lib/api-client';
import { layout, escHtml } from '../views/layout';

export const adminRouter: RouterType = Router();

adminRouter.use(requireAdminSession);

const ROLE_OPTIONS = ['platform_admin', 'tenant_admin', 'developer', 'viewer'];

function roleSelect(selected: string): string {
  return ROLE_OPTIONS.map(
    (r) => `<option value="${r}"${r === selected ? ' selected' : ''}>${escHtml(r)}</option>`,
  ).join('');
}

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
          <a class="card" href="/admin/telemetry" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Telemetry</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Run history &amp; token usage</div>
          </a>
          <a class="card" href="/admin/reviews" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Human Review</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Pending review queue</div>
          </a>
          <a class="card" href="/admin/integrations" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Integrations</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Connection management</div>
          </a>
          <a class="card" href="/admin/router-policies" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Router Policies</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Named LLM router configs</div>
          </a>
          <a class="card" href="/admin/pricing" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Provider Pricing</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Token cost configuration</div>
          </a>
          <a class="card" href="/admin/datasources" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Data Sources</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Registered data connections</div>
          </a>
          <a class="card" href="/admin/invocation-auth" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Invocation Auth</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">API keys, policies &amp; rate limits</div>
          </a>
          <a class="card" href="/admin/system" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">System</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Health &amp; diagnostics</div>
          </a>
          <a class="card" href="/admin/sessions" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Sessions</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Session context management</div>
          </a>
          <a class="card" href="/admin/system/sync" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Sync Log</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">Boot-time agent sync events</div>
          </a>
          <a class="card" href="/admin/system/caal" style="text-decoration:none;color:inherit">
            <div style="font-weight:600">Caal AI</div>
            <div style="color:#94a3b8;font-size:0.875rem;margin-top:0.25rem">AI assistant configuration</div>
          </a>
        </div>
      </div>`,
      { title: 'Admin — MagiCaal', user: { name: user.userId, role: user.role } },
    ),
  );
});

// ─── Users ────────────────────────────────────────────────────────────────────

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
        <td style="white-space:nowrap">
          <a href="/admin/users/${escHtml(u.id)}/edit" style="color:#7c6af7;margin-right:0.75rem">Edit</a>
          ${u.active ? `<form method="POST" action="/admin/users/${escHtml(u.id)}/deactivate" style="display:inline"><button type="submit" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:inherit;padding:0">Deactivate</button></form>` : ''}
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Users</h1>
          <div style="display:flex;gap:1rem;align-items:center">
            <a href="/admin/users/create" class="btn btn-primary">+ Create User</a>
            <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
          </div>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Users — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/users/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:2rem;max-width:480px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
        <h1 style="margin:0;font-size:1.5rem">Create User</h1>
        <a href="/admin/users" style="color:#94a3b8;font-size:0.875rem">← Users</a>
      </div>
      <div class="card">
        <form method="POST" action="/admin/users/create">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" name="password" required />
          </div>
          <div class="form-group">
            <label>Role</label>
            <select name="role">${roleSelect('developer')}</select>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create User</button>
        </form>
      </div>
    </div>`, { title: 'Create User — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/users/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, email, password, role } = req.body as { name: string; email: string; password: string; role: string };
    await api.post('/v1/users', { name, email, password, role });
    res.redirect('/admin/users');
  } catch (err) {
    const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? 'Failed to create user';
    const user = req.session!;
    res.status(400).send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Create User</h1>
          <a href="/admin/users" style="color:#94a3b8;font-size:0.875rem">← Users</a>
        </div>
        <div class="card">
          <div class="alert-error">${escHtml(msg)}</div>
          <form method="POST" action="/admin/users/create">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(req.body.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Email</label>
              <input type="email" name="email" value="${escHtml(req.body.email ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Password</label>
              <input type="password" name="password" required />
            </div>
            <div class="form-group">
              <label>Role</label>
              <select name="role">${roleSelect(req.body.role ?? 'developer')}</select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create User</button>
          </form>
        </div>
      </div>`, { title: 'Create User — Admin', user: { name: user.userId, role: user.role } }));
    void next;
  }
});

adminRouter.get('/users/:id/edit', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: u } = await api.get<{ id: string; name: string; email: string; role: string }>(`/v1/users/${req.params.id}`);
    const user = req.session!;
    res.send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Edit User</h1>
          <a href="/admin/users" style="color:#94a3b8;font-size:0.875rem">← Users</a>
        </div>
        <div class="card">
          <form method="POST" action="/admin/users/${escHtml(u.id)}/edit">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(u.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Email (read-only)</label>
              <input type="email" value="${escHtml(u.email)}" readonly style="opacity:0.5;cursor:not-allowed" />
            </div>
            <div class="form-group">
              <label>Role</label>
              <select name="role">${roleSelect(u.role)}</select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Save Changes</button>
          </form>
        </div>
      </div>`, { title: 'Edit User — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/users/:id/edit', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, role } = req.body as { name: string; role: string };
    await api.patch(`/v1/users/${req.params.id}`, { name, role });
    res.redirect('/admin/users');
  } catch (err) {
    const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? 'Failed to update user';
    const user = req.session!;
    res.status(400).send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Edit User</h1>
          <a href="/admin/users" style="color:#94a3b8;font-size:0.875rem">← Users</a>
        </div>
        <div class="card">
          <div class="alert-error">${escHtml(msg)}</div>
          <form method="POST" action="/admin/users/${escHtml(req.params.id)}/edit">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(req.body.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Role</label>
              <select name="role">${roleSelect(req.body.role ?? 'developer')}</select>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Save Changes</button>
          </form>
        </div>
      </div>`, { title: 'Edit User — Admin', user: { name: user.userId, role: user.role } }));
    void next;
  }
});

adminRouter.post('/users/:id/deactivate', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/v1/users/${req.params.id}`);
    res.redirect('/admin/users');
  } catch (err) {
    next(err);
  }
});

// ─── Tenants ──────────────────────────────────────────────────────────────────

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
        <td><a href="/admin/tenants/${escHtml(t.id)}/edit" style="color:#7c6af7">Edit</a></td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Tenants</h1>
          <div style="display:flex;gap:1rem;align-items:center">
            <a href="/admin/tenants/create" class="btn btn-primary">+ Create Tenant</a>
            <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
          </div>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Slug</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Tenants — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/tenants/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:2rem;max-width:480px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
        <h1 style="margin:0;font-size:1.5rem">Create Tenant</h1>
        <a href="/admin/tenants" style="color:#94a3b8;font-size:0.875rem">← Tenants</a>
      </div>
      <div class="card">
        <form method="POST" action="/admin/tenants/create">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div class="form-group">
            <label>Slug</label>
            <input type="text" name="slug" required placeholder="e.g. acme-corp" />
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create Tenant</button>
        </form>
      </div>
    </div>`, { title: 'Create Tenant — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/tenants/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, slug } = req.body as { name: string; slug: string };
    await api.post('/v1/tenants', { name, slug });
    res.redirect('/admin/tenants');
  } catch (err) {
    const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? 'Failed to create tenant';
    const user = req.session!;
    res.status(400).send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Create Tenant</h1>
          <a href="/admin/tenants" style="color:#94a3b8;font-size:0.875rem">← Tenants</a>
        </div>
        <div class="card">
          <div class="alert-error">${escHtml(msg)}</div>
          <form method="POST" action="/admin/tenants/create">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(req.body.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Slug</label>
              <input type="text" name="slug" value="${escHtml(req.body.slug ?? '')}" required placeholder="e.g. acme-corp" />
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create Tenant</button>
          </form>
        </div>
      </div>`, { title: 'Create Tenant — Admin', user: { name: user.userId, role: user.role } }));
    void next;
  }
});

adminRouter.get('/tenants/:id/edit', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data: t } = await api.get<{ id: string; name: string; slug: string; enabled: boolean; resourceLimits?: string }>(`/v1/tenants/${req.params.id}`);
    const user = req.session!;
    const limitsJson = t.resourceLimits ? JSON.stringify(JSON.parse(t.resourceLimits), null, 2) : '{}';
    res.send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Edit Tenant</h1>
          <a href="/admin/tenants" style="color:#94a3b8;font-size:0.875rem">← Tenants</a>
        </div>
        <div class="card">
          <form method="POST" action="/admin/tenants/${escHtml(t.id)}/edit">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(t.name)}" required />
            </div>
            <div class="form-group">
              <label>Slug (read-only)</label>
              <input type="text" value="${escHtml(t.slug)}" readonly style="opacity:0.5;cursor:not-allowed" />
            </div>
            <div class="form-group">
              <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
                <input type="checkbox" name="enabled" value="true"${t.enabled ? ' checked' : ''} style="width:auto" />
                Enabled
              </label>
            </div>
            <div class="form-group">
              <label>Resource Limits <span style="color:#64748b;font-size:0.6875rem">(JSON object)</span></label>
              <textarea name="resourceLimits" rows="4" style="font-family:monospace;font-size:0.75rem">${escHtml(limitsJson)}</textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Save Changes</button>
          </form>
        </div>
      </div>`, { title: 'Edit Tenant — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/tenants/:id/edit', async (req, res, next) => {
  try {
    const { name, enabled, resourceLimits } = req.body as { name: string; enabled?: string; resourceLimits?: string };

    if (resourceLimits) {
      try { JSON.parse(resourceLimits); } catch {
        throw Object.assign(new Error('Resource Limits must be valid JSON'), { status: 400 });
      }
    }

    const api = createApiClient(req.accessToken);
    await api.patch(`/v1/tenants/${req.params.id}`, {
      name,
      enabled: enabled === 'true',
      ...(resourceLimits !== undefined && { resourceLimits }),
    });
    res.redirect('/admin/tenants');
  } catch (err) {
    const msg = (err as { response?: { data?: { error?: { message?: string } }; }; message?: string })?.response?.data?.error?.message
      ?? (err as { message?: string })?.message
      ?? 'Failed to update tenant';
    const user = req.session!;
    res.status(400).send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Edit Tenant</h1>
          <a href="/admin/tenants" style="color:#94a3b8;font-size:0.875rem">← Tenants</a>
        </div>
        <div class="card">
          <div class="alert-error">${escHtml(msg)}</div>
          <form method="POST" action="/admin/tenants/${escHtml(req.params.id)}/edit">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(req.body.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
                <input type="checkbox" name="enabled" value="true"${req.body.enabled === 'true' ? ' checked' : ''} style="width:auto" />
                Enabled
              </label>
            </div>
            <div class="form-group">
              <label>Resource Limits <span style="color:#64748b;font-size:0.6875rem">(JSON object)</span></label>
              <textarea name="resourceLimits" rows="4" style="font-family:monospace;font-size:0.75rem">${escHtml(req.body.resourceLimits ?? '{}')}</textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Save Changes</button>
          </form>
        </div>
      </div>`, { title: 'Edit Tenant — Admin', user: { name: user.userId, role: user.role } }));
    void next;
  }
});

// ─── Agents ───────────────────────────────────────────────────────────────────

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
        <td style="white-space:nowrap">
          <a href="/studio/${escHtml(a.id)}" style="color:#7c6af7;margin-right:0.75rem">Open</a>
          ${a.enabled
            ? `<form method="POST" action="/admin/agents/${escHtml(a.id)}/disable" style="display:inline"><button type="submit" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:inherit;padding:0">Disable</button></form>`
            : `<form method="POST" action="/admin/agents/${escHtml(a.id)}/enable" style="display:inline"><button type="submit" style="background:none;border:none;color:#86efac;cursor:pointer;font-size:inherit;padding:0">Enable</button></form>`
          }
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:2rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Agents</h1>
          <div style="display:flex;gap:1rem;align-items:center">
            <a href="/admin/agents/create" class="btn btn-primary">+ Create Agent</a>
            <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
          </div>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Handle</th><th>Status</th><th>Enabled</th><th>Actions</th></tr></thead>
            <tbody>${rows}</tbody>
          </table>
        </div>
      </div>`, { title: 'Agents — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/agents/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:2rem;max-width:480px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
        <h1 style="margin:0;font-size:1.5rem">Create Agent</h1>
        <a href="/admin/agents" style="color:#94a3b8;font-size:0.875rem">← Agents</a>
      </div>
      <div class="card">
        <form method="POST" action="/admin/agents/create">
          <div class="form-group">
            <label>Name</label>
            <input type="text" name="name" required />
          </div>
          <div class="form-group">
            <label>Handle <span style="color:#64748b;font-size:0.6875rem">(unique identifier)</span></label>
            <input type="text" name="handle" required placeholder="e.g. my-agent" />
          </div>
          <div class="form-group">
            <label>Description <span style="color:#64748b;font-size:0.6875rem">(optional)</span></label>
            <textarea name="description" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create Agent</button>
        </form>
      </div>
    </div>`, { title: 'Create Agent — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/agents/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, handle, description } = req.body as { name: string; handle: string; description?: string };
    await api.post('/v1/agents', { name, handle, description: description || undefined });
    res.redirect('/admin/agents');
  } catch (err) {
    const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? 'Failed to create agent';
    const user = req.session!;
    res.status(400).send(layout(`
      <div class="container" style="margin-top:2rem;max-width:480px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Create Agent</h1>
          <a href="/admin/agents" style="color:#94a3b8;font-size:0.875rem">← Agents</a>
        </div>
        <div class="card">
          <div class="alert-error">${escHtml(msg)}</div>
          <form method="POST" action="/admin/agents/create">
            <div class="form-group">
              <label>Name</label>
              <input type="text" name="name" value="${escHtml(req.body.name ?? '')}" required />
            </div>
            <div class="form-group">
              <label>Handle <span style="color:#64748b;font-size:0.6875rem">(unique identifier)</span></label>
              <input type="text" name="handle" value="${escHtml(req.body.handle ?? '')}" required placeholder="e.g. my-agent" />
            </div>
            <div class="form-group">
              <label>Description <span style="color:#64748b;font-size:0.6875rem">(optional)</span></label>
              <textarea name="description" rows="3">${escHtml(req.body.description ?? '')}</textarea>
            </div>
            <button type="submit" class="btn btn-primary" style="width:100%;margin-top:0.5rem">Create Agent</button>
          </form>
        </div>
      </div>`, { title: 'Create Agent — Admin', user: { name: user.userId, role: user.role } }));
    void next;
  }
});

adminRouter.post('/agents/:id/enable', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.patch(`/v1/agents/${req.params.id}`, { enabled: true });
    res.redirect('/admin/agents');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/agents/:id/disable', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.patch(`/v1/agents/${req.params.id}`, { enabled: false });
    res.redirect('/admin/agents');
  } catch (err) {
    next(err);
  }
});

// ─── System ───────────────────────────────────────────────────────────────────

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

// ─── Telemetry Dashboard ───────────────────────────────────────────────────────

adminRouter.get('/telemetry', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    let runs: Array<{ id: string; agentId: string; status: string; triggerType: string; startedAt: string; tokenUsage: { promptTokens: number; completionTokens: number; estimatedCostUsd: number } }> = [];
    let tokenTotals = { promptTokens: 0, completionTokens: 0, estimatedCostUsd: 0, runCount: 0 };
    let err2 = '';

    try {
      const [{ data: tel }, { data: tok }] = await Promise.all([
        api.get<{ runs: typeof runs }>('/v1/telemetry?limit=50'),
        api.get<{ totals: typeof tokenTotals }>('/v1/telemetry/tokens'),
      ]);
      runs = tel.runs ?? [];
      tokenTotals = tok.totals ?? tokenTotals;
    } catch {
      err2 = 'Could not load telemetry — engine may be unavailable';
    }

    const statusColor = (s: string) => s === 'completed' ? '#4ade80' : s === 'failed' ? '#fca5a5' : s === 'suspended' ? '#fcd34d' : '#93c5fd';

    const runRows = runs.map((r) => `
      <tr>
        <td style="font-family:monospace;font-size:0.75rem"><a href="/admin/runs/${escHtml(r.id)}" style="color:#93c5fd">${escHtml(r.id)}</a></td>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(r.agentId)}</td>
        <td><span style="color:${statusColor(r.status)}">${escHtml(r.status)}</span></td>
        <td style="color:#94a3b8;font-size:0.75rem">${escHtml(r.triggerType)}</td>
        <td style="color:#94a3b8;font-size:0.75rem">${r.startedAt ? new Date(r.startedAt).toLocaleString() : '—'}</td>
        <td style="font-size:0.75rem">$${(r.tokenUsage?.estimatedCostUsd ?? 0).toFixed(4)}</td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <h1 style="margin:0 0 1.5rem;font-size:1.5rem">Telemetry</h1>
        ${err2 ? `<div class="alert-error">${escHtml(err2)}</div>` : ''}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem">
          <div class="card" style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700">${tokenTotals.runCount}</div>
            <div style="color:#94a3b8;font-size:0.875rem">Total Runs</div>
          </div>
          <div class="card" style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700">${(tokenTotals.promptTokens + tokenTotals.completionTokens).toLocaleString()}</div>
            <div style="color:#94a3b8;font-size:0.875rem">Total Tokens</div>
          </div>
          <div class="card" style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700">$${tokenTotals.estimatedCostUsd.toFixed(2)}</div>
            <div style="color:#94a3b8;font-size:0.875rem">Estimated Cost</div>
          </div>
          <div class="card" style="text-align:center">
            <div style="font-size:1.5rem;font-weight:700">${runs.filter((r) => r.status === 'suspended').length}</div>
            <div style="color:#fcd34d;font-size:0.875rem">Awaiting Review</div>
          </div>
        </div>
        <div class="card">
          <h2 style="margin:0 0 1rem;font-size:1rem">Recent Runs</h2>
          <table>
            <thead><tr><th>Run ID</th><th>Agent</th><th>Status</th><th>Trigger</th><th>Started</th><th>Cost</th></tr></thead>
            <tbody>${runRows || '<tr><td colspan="6" style="color:#475569;text-align:center">No runs yet</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Telemetry — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/runs/:runId', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { runId } = req.params;

    const { data } = await api.get<{
      run: { id: string; agentId: string; status: string; startedAt: string; completedAt?: string; totalPromptTokens: number; totalCompletionTokens: number; estimatedCostUsd: number };
      steps: Array<{ id: string; nodeId: string; nodeType: string; status: string; startedAt: string; completedAt?: string; promptTokens: number; completionTokens: number; routingMeta?: { targetUsed?: { provider: string; model: string }; attemptCount?: number } }>;
    }>(`/v1/telemetry?runId=${encodeURIComponent(runId)}`).catch(() => ({ data: null }));

    if (!data) {
      res.redirect('/admin/telemetry');
      return;
    }

    const stepRows = (data.steps ?? []).map((s) => `
      <tr>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(s.nodeId)}</td>
        <td style="color:#94a3b8;font-size:0.75rem">${escHtml(s.nodeType)}</td>
        <td><span style="color:${s.status === 'complete' ? '#4ade80' : s.status === 'failed' ? '#fca5a5' : '#93c5fd'}">${escHtml(s.status)}</span></td>
        <td style="font-size:0.75rem">${s.startedAt ? new Date(s.startedAt).toLocaleString() : '—'}</td>
        <td style="font-size:0.75rem">${s.promptTokens ? `${s.promptTokens}+${s.completionTokens}` : '—'}</td>
        <td style="font-size:0.75rem;color:#94a3b8">${s.routingMeta?.targetUsed ? `${s.routingMeta.targetUsed.provider}/${s.routingMeta.targetUsed.model}` : '—'}</td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
          <a href="/admin/telemetry" class="btn btn-ghost">&larr; Telemetry</a>
          <h1 style="margin:0;font-size:1.25rem;font-family:monospace">${escHtml(runId)}</h1>
        </div>
        <div class="card" style="margin-bottom:1rem">
          <div style="display:flex;gap:2rem">
            <div><div style="color:#94a3b8;font-size:0.75rem">Status</div><div>${escHtml(data.run?.status ?? '—')}</div></div>
            <div><div style="color:#94a3b8;font-size:0.75rem">Agent</div><div style="font-family:monospace;font-size:0.875rem">${escHtml(data.run?.agentId ?? '—')}</div></div>
            <div><div style="color:#94a3b8;font-size:0.75rem">Started</div><div style="font-size:0.875rem">${data.run?.startedAt ? new Date(data.run.startedAt).toLocaleString() : '—'}</div></div>
          </div>
        </div>
        <div class="card">
          <h2 style="margin:0 0 1rem;font-size:1rem">Steps</h2>
          <table>
            <thead><tr><th>Node ID</th><th>Type</th><th>Status</th><th>Started</th><th>Tokens (in+out)</th><th>Provider/Model</th></tr></thead>
            <tbody>${stepRows || '<tr><td colspan="6" style="color:#475569;text-align:center">No steps recorded</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: `Run ${runId} — Admin`, user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

// ─── Human Review Queue ────────────────────────────────────────────────────────

adminRouter.get('/reviews', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;

    let suspended: Array<{ id: string; agentId: string; startedAt: string; reviewId?: string }> = [];
    try {
      const { data } = await api.get<{ runs: typeof suspended }>('/v1/telemetry?status=suspended&limit=50');
      suspended = data.runs ?? [];
    } catch { /* engine unavailable */ }

    const rows = suspended.map((r) => `
      <tr>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(r.id)}</td>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(r.agentId)}</td>
        <td style="color:#94a3b8;font-size:0.75rem">${r.startedAt ? new Date(r.startedAt).toLocaleString() : '—'}</td>
        <td>
          <form method="POST" action="/admin/reviews/${escHtml(r.id)}/approve" style="display:inline">
            <button class="btn btn-ghost" style="color:#4ade80;border-color:#166534;font-size:0.75rem">Approve</button>
          </form>
          <form method="POST" action="/admin/reviews/${escHtml(r.id)}/reject" style="display:inline;margin-left:0.5rem">
            <button class="btn btn-ghost" style="color:#fca5a5;border-color:#7f2121;font-size:0.75rem">Reject</button>
          </form>
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <h1 style="margin:0 0 1.5rem;font-size:1.5rem">Human Review Queue
          ${suspended.length > 0 ? `<span style="background:#78350f;color:#fcd34d;font-size:0.875rem;padding:0.25rem 0.5rem;border-radius:4px;margin-left:0.5rem">${suspended.length} pending</span>` : ''}
        </h1>
        <div class="card">
          <table>
            <thead><tr><th>Run ID</th><th>Agent</th><th>Suspended At</th><th>Actions</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="4" style="color:#475569;text-align:center;padding:2rem">No runs awaiting review</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Human Review — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/reviews/:runId/approve', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { runId } = req.params;
    // Need agentId — fetch run first (simplified: use a direct engine call via API)
    await api.post(`/v1/telemetry/review/${encodeURIComponent(runId)}`, { action: 'approve' }).catch(() => {});
    res.redirect('/admin/reviews');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/reviews/:runId/reject', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { runId } = req.params;
    await api.post(`/v1/telemetry/review/${encodeURIComponent(runId)}`, { action: 'reject' }).catch(() => {});
    res.redirect('/admin/reviews');
  } catch (err) {
    next(err);
  }
});

// ─── Integration Connections ───────────────────────────────────────────────────

adminRouter.get('/integrations', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    let connections: Array<{ id: string; service: string; displayName: string; authType: string; status: string; createdAt: string }> = [];
    try {
      const { data } = await api.get<typeof connections>('/v1/integrations/connections');
      connections = data;
    } catch { /* no connections yet */ }

    const statusColor = (s: string) => s === 'active' ? '#4ade80' : s === 'expired' ? '#fcd34d' : '#fca5a5';

    const rows = connections.map((c) => `
      <tr>
        <td>${escHtml(c.displayName)}</td>
        <td style="color:#94a3b8">${escHtml(c.service)}</td>
        <td style="color:#94a3b8">${escHtml(c.authType)}</td>
        <td><span style="color:${statusColor(c.status)}">${escHtml(c.status)}</span></td>
        <td style="color:#94a3b8;font-size:0.75rem">${c.createdAt ? new Date(c.createdAt).toLocaleString() : '—'}</td>
        <td>
          <form method="POST" action="/admin/integrations/${escHtml(c.id)}/delete" style="display:inline">
            <button class="btn btn-ghost" style="color:#fca5a5;border-color:#7f2121;font-size:0.75rem">Delete</button>
          </form>
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Integration Connections</h1>
          <a href="/admin/integrations/create" class="btn btn-primary">+ Add Connection</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Service</th><th>Auth Type</th><th>Status</th><th>Created</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="6" style="color:#475569;text-align:center;padding:2rem">No connections configured</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Integrations — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/integrations/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:1.5rem;max-width:600px">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <a href="/admin/integrations" class="btn btn-ghost">&larr; Back</a>
        <h1 style="margin:0;font-size:1.25rem">Add Integration Connection</h1>
      </div>
      <form class="card" method="POST" action="/admin/integrations/create">
        <div class="form-group"><label>Display Name</label><input name="displayName" required /></div>
        <div class="form-group"><label>Service (e.g. openai, slack, github)</label><input name="service" required /></div>
        <div class="form-group">
          <label>Auth Type</label>
          <select name="authType">
            <option value="api_key">API Key</option>
            <option value="oauth2">OAuth 2.0</option>
          </select>
        </div>
        <div class="form-group"><label>Credentials (JSON)</label><textarea name="credentials" rows="5" placeholder='{"api_key":"sk-..."}'></textarea></div>
        <button type="submit" class="btn btn-primary">Save Connection</button>
      </form>
    </div>`, { title: 'Add Connection — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/integrations/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { displayName, service, authType, credentials } = req.body as { displayName: string; service: string; authType: string; credentials: string };
    let credObj: Record<string, unknown> = {};
    try { credObj = JSON.parse(credentials) as Record<string, unknown>; } catch { /* invalid json */ }
    await api.post('/v1/integrations/connections', { displayName, service, authType, credentials: credObj });
    res.redirect('/admin/integrations');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/integrations/:id/delete', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/v1/integrations/connections/${req.params.id}`);
    res.redirect('/admin/integrations');
  } catch (err) {
    next(err);
  }
});

// ─── Router Policies ──────────────────────────────────────────────────────────

adminRouter.get('/router-policies', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    let policies: Array<{ id: string; name: string; overridable: boolean; config: { strategy: string; targets?: unknown[] }; createdAt: string }> = [];
    try {
      const { data } = await api.get<typeof policies>('/v1/llm/router-policies');
      policies = data;
    } catch { /* no policies yet */ }

    const rows = policies.map((p) => `
      <tr>
        <td style="font-weight:600">${escHtml(p.name)}</td>
        <td style="color:#94a3b8">${escHtml(p.config?.strategy ?? '—')}</td>
        <td style="color:#94a3b8">${p.config?.targets?.length ?? 0} target(s)</td>
        <td>${p.overridable ? '<span style="color:#4ade80">yes</span>' : '<span style="color:#fca5a5">locked</span>'}</td>
        <td style="color:#94a3b8;font-size:0.75rem">${p.createdAt ? new Date(p.createdAt).toLocaleString() : '—'}</td>
        <td>
          <form method="POST" action="/admin/router-policies/${escHtml(p.id)}/delete" style="display:inline">
            <button class="btn btn-ghost" style="color:#fca5a5;border-color:#7f2121;font-size:0.75rem">Delete</button>
          </form>
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Named Router Policies</h1>
          <a href="/admin/router-policies/create" class="btn btn-primary">+ Create Policy</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Strategy</th><th>Targets</th><th>Overridable</th><th>Created</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="6" style="color:#475569;text-align:center;padding:2rem">No policies configured</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Router Policies — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/router-policies/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:1.5rem;max-width:600px">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <a href="/admin/router-policies" class="btn btn-ghost">&larr; Back</a>
        <h1 style="margin:0;font-size:1.25rem">Create Router Policy</h1>
      </div>
      <form class="card" method="POST" action="/admin/router-policies/create">
        <div class="form-group"><label>Policy Name</label><input name="name" required placeholder="primary-openai" /></div>
        <div class="form-group">
          <label>Config (JSON — ModelRouterConfig)</label>
          <textarea name="config" rows="10" required placeholder='{"strategy":"priority","targets":[{"id":"t1","connectionId":"conn-id","provider":"openai","model":"gpt-4o"}],"triggers":[]}'></textarea>
        </div>
        <div class="form-group">
          <label><input type="checkbox" name="overridable" value="true" checked /> Overridable by agents</label>
        </div>
        <button type="submit" class="btn btn-primary">Save Policy</button>
      </form>
    </div>`, { title: 'Create Policy — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/router-policies/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, config: configStr, overridable } = req.body as { name: string; config: string; overridable?: string };
    let configObj: Record<string, unknown> = {};
    try { configObj = JSON.parse(configStr) as Record<string, unknown>; } catch { /* invalid */ }
    await api.post('/v1/llm/router-policies', { name, config: configObj, overridable: overridable === 'true' });
    res.redirect('/admin/router-policies');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/router-policies/:id/delete', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/v1/llm/router-policies/${req.params.id}`);
    res.redirect('/admin/router-policies');
  } catch (err) {
    next(err);
  }
});

// ─── Provider Pricing ─────────────────────────────────────────────────────────

adminRouter.get('/pricing', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    let pricing: Array<{ id: string; provider: string; model: string; promptTokensPerMillion: number; completionTokensPerMillion: number; currency: string }> = [];
    try {
      const { data } = await api.get<typeof pricing>('/v1/system/provider-pricing');
      pricing = data;
    } catch { /* no pricing yet */ }

    const rows = pricing.map((p) => `
      <tr>
        <td>${escHtml(p.provider)}</td>
        <td style="font-family:monospace;font-size:0.875rem">${escHtml(p.model)}</td>
        <td>$${p.promptTokensPerMillion.toFixed(2)}</td>
        <td>$${p.completionTokensPerMillion.toFixed(2)}</td>
        <td style="color:#94a3b8">${escHtml(p.currency)}</td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Provider Pricing</h1>
          <a href="/admin/pricing/edit" class="btn btn-primary">Update Pricing</a>
        </div>
        <p style="color:#94a3b8;margin:0 0 1rem">Prices in USD per million tokens. Used for cost estimation in telemetry.</p>
        <div class="card">
          <table>
            <thead><tr><th>Provider</th><th>Model</th><th>Input ($/M)</th><th>Output ($/M)</th><th>Currency</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="5" style="color:#475569;text-align:center;padding:2rem">No pricing data (built-in defaults are used)</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Pricing — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/pricing/edit', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:1.5rem;max-width:600px">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <a href="/admin/pricing" class="btn btn-ghost">&larr; Back</a>
        <h1 style="margin:0;font-size:1.25rem">Update Provider Pricing</h1>
      </div>
      <form class="card" method="POST" action="/admin/pricing/edit">
        <div class="form-group"><label>Entries (JSON array)</label>
          <textarea name="entries" rows="12" placeholder='[{"provider":"openai","model":"gpt-4o","promptTokensPerMillion":2.5,"completionTokensPerMillion":10}]'></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>`, { title: 'Edit Pricing — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/pricing/edit', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { entries: entriesStr } = req.body as { entries: string };
    let entries: unknown[] = [];
    try { entries = JSON.parse(entriesStr) as unknown[]; } catch { /* invalid */ }
    await api.post('/v1/system/provider-pricing', entries);
    res.redirect('/admin/pricing');
  } catch (err) {
    next(err);
  }
});

// ─── Data Sources ─────────────────────────────────────────────────────────────

adminRouter.get('/datasources', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    let sources: Array<{ id: string; name: string; sourceType: string; createdAt: string }> = [];
    try {
      const { data } = await api.get<typeof sources>('/v1/datasources');
      sources = data;
    } catch { /* no data sources yet */ }

    const rows = sources.map((s) => `
      <tr>
        <td style="font-weight:600">${escHtml(s.name)}</td>
        <td style="color:#94a3b8">${escHtml(s.sourceType)}</td>
        <td style="color:#94a3b8;font-size:0.75rem">${s.createdAt ? new Date(s.createdAt).toLocaleString() : '—'}</td>
        <td>
          <form method="POST" action="/admin/datasources/${escHtml(s.id)}/delete" style="display:inline">
            <button class="btn btn-ghost" style="color:#fca5a5;border-color:#7f2121;font-size:0.75rem">Delete</button>
          </form>
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Data Sources</h1>
          <a href="/admin/datasources/create" class="btn btn-primary">+ Add Data Source</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Type</th><th>Created</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="4" style="color:#475569;text-align:center;padding:2rem">No data sources configured</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Data Sources — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/datasources/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:1.5rem;max-width:600px">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem">
        <a href="/admin/datasources" class="btn btn-ghost">&larr; Back</a>
        <h1 style="margin:0;font-size:1.25rem">Add Data Source</h1>
      </div>
      <form class="card" method="POST" action="/admin/datasources/create">
        <div class="form-group"><label>Name</label><input name="name" required /></div>
        <div class="form-group"><label>Source Type (e.g. postgres, mysql, s3, bigquery)</label><input name="sourceType" required /></div>
        <div class="form-group"><label>Connection (JSON)</label><textarea name="connection" rows="5" placeholder='{"host":"localhost","port":5432,"database":"mydb"}'></textarea></div>
        <button type="submit" class="btn btn-primary">Save</button>
      </form>
    </div>`, { title: 'Add Data Source — Admin', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/datasources/create', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, sourceType, connection: connStr } = req.body as { name: string; sourceType: string; connection: string };
    let connObj: Record<string, unknown> = {};
    try { connObj = JSON.parse(connStr) as Record<string, unknown>; } catch { /* invalid */ }
    await api.post('/v1/datasources', { name, sourceType, connection: connObj });
    res.redirect('/admin/datasources');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/datasources/:id/delete', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/v1/datasources/${req.params.id}`);
    res.redirect('/admin/datasources');
  } catch (err) {
    next(err);
  }
});

// ─── Invocation Auth ──────────────────────────────────────────────────────────

interface AgentSummary { id: string; name: string; enabled: boolean }
interface InvocationKey { id: string; label: string; lastUsedAt: string | null; expiresAt: string | null; revoked: boolean; createdAt: string }
interface InvocationPolicy { agentId: string; strategy: string; rateLimit: unknown; jwtConfig: unknown }

adminRouter.get('/invocation-auth', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { data: agents } = await api.get<AgentSummary[]>('/v1/agents');

    // Fetch key counts for each agent in parallel (best-effort)
    const keyCounts = await Promise.all(
      agents.map(async (a) => {
        try {
          const { data: keys } = await api.get<InvocationKey[]>(`/v1/agents/${encodeURIComponent(a.id)}/invocation-keys`);
          return { agentId: a.id, count: keys.filter((k) => !k.revoked).length };
        } catch {
          return { agentId: a.id, count: 0 };
        }
      }),
    );
    const keyCountMap = Object.fromEntries(keyCounts.map((k) => [k.agentId, k.count]));

    const rows = agents.map((a) => `
      <tr>
        <td>${escHtml(a.name)}</td>
        <td>${keyCountMap[a.id] ?? 0} active key(s)</td>
        <td style="white-space:nowrap">
          <a href="/admin/invocation-auth/${escHtml(a.id)}" style="color:#7c6af7">Manage</a>
        </td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.5rem">Invocation Auth</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Agent</th><th>Active Keys</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="3" style="color:#475569;text-align:center;padding:2rem">No agents found</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Invocation Auth — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/invocation-auth/:agentId', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { agentId } = req.params;

    const [{ data: agent }, { data: policy }, { data: keys }] = await Promise.all([
      api.get<AgentSummary>(`/v1/agents/${encodeURIComponent(agentId)}`),
      api.get<InvocationPolicy>(`/v1/agents/${encodeURIComponent(agentId)}/invocation-policy`),
      api.get<InvocationKey[]>(`/v1/agents/${encodeURIComponent(agentId)}/invocation-keys`),
    ]);

    const strategyOptions = ['api-key', 'jwt', 'public'].map((s) =>
      `<option value="${s}"${s === policy.strategy ? ' selected' : ''}>${escHtml(s)}</option>`,
    ).join('');

    const keyRows = keys.map((k) => `
      <tr style="${k.revoked ? 'opacity:0.45' : ''}">
        <td>${escHtml(k.label)}</td>
        <td>${k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : '—'}</td>
        <td>${k.expiresAt ? new Date(k.expiresAt).toLocaleDateString() : 'Never'}</td>
        <td>${k.revoked ? '<span style="color:#f87171">Revoked</span>' : '<span style="color:#34d399">Active</span>'}</td>
        <td>
          ${!k.revoked ? `<form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/keys/${escHtml(k.id)}/revoke" style="display:inline">
            <button type="submit" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:inherit;padding:0">Revoke</button>
          </form>` : ''}
        </td>
      </tr>`).join('');

    const newKeyHtml = (res.locals as { newKey?: string }).newKey
      ? `<div class="alert-error" style="background:#14532d;border-color:#166534;color:#86efac;margin-bottom:1rem">
          <strong>Save this key — it will not be shown again:</strong><br>
          <code style="font-size:0.875rem;word-break:break-all">${escHtml((res.locals as { newKey: string }).newKey)}</code>
        </div>`
      : '';

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:800px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Invocation Auth — ${escHtml(agent.name)}</h1>
          <a href="/admin/invocation-auth" style="color:#94a3b8;font-size:0.875rem">← Invocation Auth</a>
        </div>

        <div class="card" style="margin-bottom:1.5rem">
          <h2 style="font-size:1rem;margin:0 0 1rem">Policy</h2>
          <form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/policy">
            <div class="form-group">
              <label>Auth Strategy</label>
              <select name="strategy">${strategyOptions}</select>
            </div>
            <div class="form-group">
              <label>Rate Limit (requests/min, optional)</label>
              <input name="rateLimitPerMin" type="number" min="0"
                value="${escHtml(String((policy.rateLimit as Record<string, number> | null)?.requestsPerWindow ?? ''))}"
                placeholder="Unlimited" />
            </div>
            <div id="jwt-config-section" style="display:${policy.strategy === 'jwt' ? 'block' : 'none'};border:1px solid #374151;border-radius:6px;padding:1rem;margin-bottom:1rem;background:#0f1117">
              <p style="font-size:0.875rem;color:#94a3b8;margin:0 0 0.75rem">JWT Configuration</p>
              ${(() => {
                const jwtConf = (policy.jwtConfig ?? {}) as Record<string, unknown>;
                return `<div class="form-group"><label>JWKS URL</label><input name="jwtJwksUrl" placeholder="https://your-idp.com/.well-known/jwks.json" value="${escHtml(String(jwtConf.jwksUrl ?? ''))}"/></div>
                <div class="form-group"><label>Issuer (optional)</label><input name="jwtIssuer" placeholder="https://your-idp.com/" value="${escHtml(String(jwtConf.issuer ?? ''))}"/></div>
                <div class="form-group"><label>Audience (optional)</label><input name="jwtAudience" placeholder="your-api-identifier" value="${escHtml(String(jwtConf.audience ?? ''))}"/></div>
                <div class="form-group"><label>Required Claims (key=value, one per line)</label><textarea name="jwtRequiredClaims" rows="3">${escHtml(Object.entries((jwtConf.requiredClaims ?? {}) as Record<string,unknown>).map(([k,v])=>`${k}=${v}`).join('\n'))}</textarea></div>`;
              })()}
            </div>
            <button type="submit" class="btn btn-primary">Save Policy</button>
          </form>
          <script>document.querySelector('select[name="strategy"]')?.addEventListener('change',function(e){const s=document.getElementById('jwt-config-section');if(s)s.style.display=e.target.value==='jwt'?'block':'none';});</script>
        </div>

        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
            <h2 style="font-size:1rem;margin:0">Invocation Keys</h2>
          </div>
          ${newKeyHtml}
          <form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/keys" style="display:flex;gap:0.75rem;margin-bottom:1rem;align-items:flex-end">
            <div class="form-group" style="margin:0;flex:1">
              <label>New Key Label</label>
              <input name="label" required placeholder="e.g. production-app" />
            </div>
            <button type="submit" class="btn btn-primary">Generate Key</button>
          </form>
          <table>
            <thead><tr><th>Label</th><th>Last Used</th><th>Expires</th><th>Status</th><th></th></tr></thead>
            <tbody>${keyRows || '<tr><td colspan="5" style="color:#475569;text-align:center;padding:1.5rem">No keys created yet</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: `Invocation Auth — ${agent.name}`, user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/invocation-auth/:agentId/policy', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { agentId } = req.params;
    const { strategy, rateLimitPerMin, jwtJwksUrl, jwtIssuer, jwtAudience, jwtRequiredClaims } = req.body as {
      strategy: string; rateLimitPerMin: string;
      jwtJwksUrl?: string; jwtIssuer?: string; jwtAudience?: string; jwtRequiredClaims?: string;
    };

    const rateLimit = rateLimitPerMin
      ? { requestsPerWindow: parseInt(rateLimitPerMin, 10), windowSeconds: 60, limitBy: 'tenant' }
      : null;

    let jwtConfig: Record<string, unknown> | null = null;
    if (strategy === 'jwt' && jwtJwksUrl) {
      const requiredClaims: Record<string, string> = {};
      for (const line of (jwtRequiredClaims ?? '').split('\n').filter(Boolean)) {
        const [k, ...v] = line.split('=');
        if (k) requiredClaims[k.trim()] = v.join('=').trim();
      }
      jwtConfig = {
        jwksUrl: jwtJwksUrl,
        ...(jwtIssuer ? { issuer: jwtIssuer } : {}),
        ...(jwtAudience ? { audience: jwtAudience } : {}),
        ...(Object.keys(requiredClaims).length > 0 ? { requiredClaims } : {}),
      };
    }

    await api.patch(`/v1/agents/${encodeURIComponent(agentId)}/invocation-policy`, {
      strategy,
      rateLimit,
      jwtConfig,
    });

    res.redirect(`/admin/invocation-auth/${encodeURIComponent(agentId)}`);
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/invocation-auth/:agentId/keys', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { agentId } = req.params;
    const { label } = req.body as { label: string };

    const { data: created } = await api.post<{ key: string }>(
      `/v1/agents/${encodeURIComponent(agentId)}/invocation-keys`,
      { label },
    );

    // Pass the plaintext key to the next GET so it can be displayed once
    res.locals['newKey'] = created.key;
    // Re-render the detail page with the key displayed
    const user = req.session!;
    const api2 = createApiClient(req.accessToken);
    const [{ data: agent }, { data: policy }, { data: keys }] = await Promise.all([
      api2.get<AgentSummary>(`/v1/agents/${encodeURIComponent(agentId)}`),
      api2.get<InvocationPolicy>(`/v1/agents/${encodeURIComponent(agentId)}/invocation-policy`),
      api2.get<InvocationKey[]>(`/v1/agents/${encodeURIComponent(agentId)}/invocation-keys`),
    ]);

    const strategyOptions = ['api-key', 'jwt', 'public'].map((s) =>
      `<option value="${s}"${s === policy.strategy ? ' selected' : ''}>${escHtml(s)}</option>`,
    ).join('');

    const keyRows = keys.map((k) => `
      <tr style="${k.revoked ? 'opacity:0.45' : ''}">
        <td>${escHtml(k.label)}</td>
        <td>${k.lastUsedAt ? new Date(k.lastUsedAt).toLocaleString() : '—'}</td>
        <td>${k.expiresAt ? new Date(k.expiresAt).toLocaleDateString() : 'Never'}</td>
        <td>${k.revoked ? '<span style="color:#f87171">Revoked</span>' : '<span style="color:#34d399">Active</span>'}</td>
        <td>
          ${!k.revoked ? `<form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/keys/${escHtml(k.id)}/revoke" style="display:inline">
            <button type="submit" style="background:none;border:none;color:#f87171;cursor:pointer;font-size:inherit;padding:0">Revoke</button>
          </form>` : ''}
        </td>
      </tr>`).join('');

    const newKeyHtml = created.key
      ? `<div class="alert-error" style="background:#14532d;border-color:#166534;color:#86efac;margin-bottom:1rem">
          <strong>Save this key — it will not be shown again:</strong><br>
          <code style="font-size:0.875rem;word-break:break-all">${escHtml(created.key)}</code>
        </div>`
      : '';

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:800px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Invocation Auth — ${escHtml(agent.name)}</h1>
          <a href="/admin/invocation-auth" style="color:#94a3b8;font-size:0.875rem">← Invocation Auth</a>
        </div>
        <div class="card" style="margin-bottom:1.5rem">
          <h2 style="font-size:1rem;margin:0 0 1rem">Policy</h2>
          <form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/policy">
            <div class="form-group">
              <label>Auth Strategy</label>
              <select name="strategy">${strategyOptions}</select>
            </div>
            <div class="form-group">
              <label>Rate Limit (requests/min, optional)</label>
              <input name="rateLimitPerMin" type="number" min="0"
                value="${escHtml(String((policy.rateLimit as Record<string, number> | null)?.requestsPerWindow ?? ''))}"
                placeholder="Unlimited" />
            </div>
            <button type="submit" class="btn btn-primary">Save Policy</button>
          </form>
        </div>
        <div class="card">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem">
            <h2 style="font-size:1rem;margin:0">Invocation Keys</h2>
          </div>
          ${newKeyHtml}
          <form method="POST" action="/admin/invocation-auth/${escHtml(agentId)}/keys" style="display:flex;gap:0.75rem;margin-bottom:1rem;align-items:flex-end">
            <div class="form-group" style="margin:0;flex:1">
              <label>New Key Label</label>
              <input name="label" required placeholder="e.g. production-app" />
            </div>
            <button type="submit" class="btn btn-primary">Generate Key</button>
          </form>
          <table>
            <thead><tr><th>Label</th><th>Last Used</th><th>Expires</th><th>Status</th><th></th></tr></thead>
            <tbody>${keyRows}</tbody>
          </table>
        </div>
      </div>`, { title: `Invocation Auth — ${agent.name}`, user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/invocation-auth/:agentId/keys/:keyId/revoke', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { agentId, keyId } = req.params;
    await api.delete(`/v1/agents/${encodeURIComponent(agentId)}/invocation-keys/${encodeURIComponent(keyId)}`);
    res.redirect(`/admin/invocation-auth/${encodeURIComponent(agentId)}`);
  } catch (err) {
    next(err);
  }
});

// ─── MCP Server Management ────────────────────────────────────────────────────

interface McpServer {
  id: string;
  name: string;
  transport: 'stdio' | 'http';
  url: string | null;
  command: string | null;
  enabled: boolean;
  lastTestedAt: string | null;
  createdAt: string;
}

adminRouter.get('/mcp-servers', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { data: servers } = await api.get<McpServer[]>('/v1/mcp-servers').catch(() => ({ data: [] as McpServer[] }));

    const rows = servers.map((s) => `
      <tr>
        <td>${escHtml(s.name)}</td>
        <td><code>${escHtml(s.transport)}</code></td>
        <td style="font-size:0.75rem;color:#94a3b8;max-width:200px;word-break:break-all">${escHtml(s.transport === 'http' ? (s.url ?? '—') : (s.command ?? '—'))}</td>
        <td>${s.lastTestedAt ? `<span style="color:#4ade80">Tested ${new Date(s.lastTestedAt).toLocaleDateString()}</span>` : '<span style="color:#94a3b8">Not tested</span>'}</td>
        <td>
          <form method="POST" action="/admin/mcp-servers/${escHtml(s.id)}/test" style="display:inline">
            <button type="submit" class="btn btn-ghost" style="padding:0.2rem 0.5rem;font-size:0.75rem">Test</button>
          </form>
          <form method="POST" action="/admin/mcp-servers/${escHtml(s.id)}/delete" style="display:inline">
            <button type="submit" class="btn btn-ghost" style="padding:0.2rem 0.5rem;font-size:0.75rem;color:#f87171">Delete</button>
          </form>
        </td>
      </tr>`).join('');

    const flash = req.query.msg ? `<div style="background:#14532d;border:1px solid #166534;color:#86efac;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1rem">${escHtml(String(req.query.msg))}</div>` : '';
    const error = req.query.err ? `<div style="background:#3b1f1f;border:1px solid #7f2121;color:#fca5a5;padding:0.75rem 1rem;border-radius:6px;margin-bottom:1rem">${escHtml(String(req.query.err))}</div>` : '';

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:900px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">MCP Servers</h1>
          <a href="/admin/mcp-servers/create" class="btn btn-primary">+ Register Server</a>
        </div>
        ${flash}${error}
        <div class="card">
          <table>
            <thead><tr><th>Name</th><th>Transport</th><th>URL / Command</th><th>Status</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="5" style="color:#475569;text-align:center;padding:1.5rem">No MCP servers registered</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'MCP Servers', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/mcp-servers/create', (req, res) => {
  const user = req.session!;
  res.send(layout(`
    <div class="container" style="margin-top:1.5rem;max-width:600px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
        <h1 style="margin:0;font-size:1.25rem">Register MCP Server</h1>
        <a href="/admin/mcp-servers" style="color:#94a3b8;font-size:0.875rem">← MCP Servers</a>
      </div>
      <div class="card">
        <form method="POST" action="/admin/mcp-servers">
          <div class="form-group"><label>Name</label><input name="name" required placeholder="My MCP Server"/></div>
          <div class="form-group">
            <label>Transport</label>
            <select name="transport" id="transport-select">
              <option value="stdio">stdio (local process)</option>
              <option value="http">http (Streamable HTTP)</option>
            </select>
          </div>
          <div id="http-fields">
            <div class="form-group"><label>URL</label><input name="url" placeholder="http://localhost:3001/mcp"/></div>
          </div>
          <div id="stdio-fields" style="display:none">
            <div class="form-group"><label>Command</label><input name="command" placeholder="npx -y my-mcp-server"/></div>
            <div class="form-group"><label>Args (space-separated, optional)</label><input name="args" placeholder="--verbose"/></div>
          </div>
          <button type="submit" class="btn btn-primary">Register</button>
        </form>
        <script>document.getElementById('transport-select')?.addEventListener('change',function(e){const v=e.target.value;const http=document.getElementById('http-fields');const stdio=document.getElementById('stdio-fields');if(http)http.style.display=v==='http'?'block':'none';if(stdio)stdio.style.display=v==='stdio'?'block':'none';});</script>
      </div>
    </div>`, { title: 'Register MCP Server', user: { name: user.userId, role: user.role } }));
});

adminRouter.post('/mcp-servers', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { name, transport, url, command, args } = req.body as { name: string; transport: 'stdio' | 'http'; url?: string; command?: string; args?: string };
    const argsArr = args ? args.split(' ').filter(Boolean) : undefined;
    await api.post('/v1/mcp-servers', { name, transport, url, command, args: argsArr });
    res.redirect('/admin/mcp-servers?msg=Server+registered');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/mcp-servers/:id/test', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { data } = await api.post<{ ok: boolean; tools: Array<{ name: string }> }>(`/v1/mcp-servers/${encodeURIComponent(req.params.id)}/test`);
    const toolNames = data.tools.map((t) => t.name).join(', ');
    res.redirect(`/admin/mcp-servers?msg=Test+OK+—+tools%3A+${encodeURIComponent(toolNames || 'none')}`);
  } catch (err) {
    res.redirect(`/admin/mcp-servers?err=${encodeURIComponent((err as Error).message)}`);
  }
});

adminRouter.post('/mcp-servers/:id/delete', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/v1/mcp-servers/${encodeURIComponent(req.params.id)}`);
    res.redirect('/admin/mcp-servers?msg=Server+deleted');
  } catch (err) {
    next(err);
  }
});

// ─── Telemetry additions: Evaluate Scores + Routing Events ────────────────────

interface EvaluateScore {
  runId: string;
  nodeId: string;
  scorerType: string;
  score: number;
  createdAt: string;
}

interface RoutingEvent {
  runId: string;
  nodeId: string;
  nodeType: string;
  agentId: string;
  attemptCount: number;
  targetUsed: unknown;
  triggerHistory: unknown[];
  timestamp: string;
}

adminRouter.get('/telemetry/evaluate-scores', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { data } = await api.get<{ events: EvaluateScore[] }>('/v1/telemetry?type=evaluate-scores').catch(() => ({ data: { events: [] } }));

    const rows = (data.events ?? []).map((s) => `
      <tr>
        <td style="font-size:0.75rem;font-family:monospace">${escHtml(s.nodeId)}</td>
        <td><code>${escHtml(s.scorerType)}</code></td>
        <td>
          <div style="display:flex;align-items:center;gap:0.5rem">
            <div style="width:60px;height:6px;background:#1e2035;border-radius:3px">
              <div style="width:${Math.round(s.score * 100)}%;height:100%;background:${s.score >= 0.7 ? '#4ade80' : s.score >= 0.4 ? '#fbbf24' : '#f87171'};border-radius:3px"></div>
            </div>
            <span>${s.score.toFixed(2)}</span>
          </div>
        </td>
        <td style="font-size:0.75rem;color:#94a3b8">${new Date(s.createdAt).toLocaleString()}</td>
        <td><a href="/admin/runs/${escHtml(s.runId)}" style="color:#7c6af7;font-size:0.75rem">View run</a></td>
      </tr>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:1000px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Evaluate Score History</h1>
          <a href="/admin/telemetry" style="color:#94a3b8;font-size:0.875rem">← Telemetry</a>
        </div>
        <div class="card">
          <table>
            <thead><tr><th>Node ID</th><th>Evaluator Type</th><th>Score</th><th>Timestamp</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="5" style="color:#475569;text-align:center;padding:1.5rem">No evaluate scores recorded</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Evaluate Score History', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.get('/telemetry/routing-events', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const { data } = await api.get<{ events: RoutingEvent[] }>('/v1/telemetry/routing-events').catch(() => ({ data: { events: [] } }));

    const rows = (data.events ?? []).map((e) => {
      const target = e.targetUsed as { provider?: string; model?: string } | null;
      const triggerSummary = Array.isArray(e.triggerHistory) && e.triggerHistory.length > 0
        ? `${e.triggerHistory.length} trigger(s)`
        : '—';
      return `
      <tr>
        <td style="font-size:0.75rem;font-family:monospace">${escHtml(e.nodeId)}</td>
        <td><code style="font-size:0.7rem">${escHtml(e.nodeType)}</code></td>
        <td>${escHtml(e.attemptCount.toString())} attempts</td>
        <td>${target ? `${escHtml(target.provider ?? '')} / ${escHtml(target.model ?? '')}` : '—'}</td>
        <td style="font-size:0.75rem;color:#94a3b8">${triggerSummary}</td>
        <td style="font-size:0.75rem;color:#94a3b8">${e.timestamp ? new Date(e.timestamp).toLocaleString() : '—'}</td>
        <td><a href="/admin/runs/${escHtml(e.runId)}" style="color:#7c6af7;font-size:0.75rem">View run</a></td>
      </tr>`;
    }).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:1100px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Routing Event Log</h1>
          <a href="/admin/telemetry" style="color:#94a3b8;font-size:0.875rem">← Telemetry</a>
        </div>
        <div class="card">
          <p style="font-size:0.875rem;color:#94a3b8;margin:0 0 1rem">Shows LLM steps where at least one provider fallback occurred.</p>
          <table>
            <thead><tr><th>Node ID</th><th>Type</th><th>Attempts</th><th>Final Target</th><th>Triggers</th><th>Timestamp</th><th></th></tr></thead>
            <tbody>${rows || '<tr><td colspan="7" style="color:#475569;text-align:center;padding:1.5rem">No routing fallbacks recorded</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Routing Event Log', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

// ─── Sessions Management ───────────────────────────────────────────────────────

interface SessionRow {
  id: string;
  agentId: string;
  status: string;
  lastActiveAt: string;
  expiresAt: string | null;
  schemaVersion: number;
  createdAt: string;
}

adminRouter.get('/sessions', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;
    const statusFilter = (req.query.status as string) ?? '';
    const agentFilter = (req.query.agentId as string) ?? '';

    let sessions: SessionRow[] = [];
    try {
      const params = new URLSearchParams();
      if (statusFilter) params.set('status', statusFilter);
      if (agentFilter) params.set('agentId', agentFilter);
      const { data } = await api.get<{ sessions: SessionRow[] }>(`/v1/sessions?${params.toString()}`);
      sessions = data.sessions ?? [];
    } catch { /* empty */ }

    const statusColor = (s: string) =>
      s === 'active' ? '#4ade80' : s === 'stale_schema' ? '#fcd34d' : '#f87171';

    const rows = sessions.map((s) => `
      <tr>
        <td style="font-family:monospace;font-size:0.7rem;max-width:160px;overflow:hidden;text-overflow:ellipsis">${escHtml(s.id)}</td>
        <td style="font-family:monospace;font-size:0.75rem">${escHtml(s.agentId)}</td>
        <td><span style="color:${statusColor(s.status)}">${escHtml(s.status)}</span></td>
        <td style="font-size:0.75rem;color:#94a3b8">${s.lastActiveAt ? new Date(s.lastActiveAt).toLocaleString() : '—'}</td>
        <td style="font-size:0.75rem;color:#94a3b8">v${escHtml(String(s.schemaVersion))}</td>
        <td style="white-space:nowrap;font-size:0.75rem">
          <form method="POST" action="/admin/sessions/${encodeURIComponent(s.id)}/reset" style="display:inline">
            <button type="submit" class="btn btn-ghost" style="padding:0.2rem 0.5rem;font-size:0.7rem">Reset</button>
          </form>
          <form method="POST" action="/admin/sessions/${encodeURIComponent(s.id)}/delete" style="display:inline">
            <button type="submit" class="btn btn-ghost" style="padding:0.2rem 0.5rem;font-size:0.7rem;color:#f87171">Delete</button>
          </form>
          ${s.status === 'stale_schema' ? `<form method="POST" action="/admin/sessions/${encodeURIComponent(s.id)}/migrate" style="display:inline">
            <button type="submit" class="btn btn-ghost" style="padding:0.2rem 0.5rem;font-size:0.7rem;color:#fcd34d">Migrate</button>
          </form>` : ''}
        </td>
      </tr>`).join('');

    const statusOptions = ['', 'active', 'stale_schema', 'expired'].map((s) =>
      `<option value="${s}"${s === statusFilter ? ' selected' : ''}>${s || 'All statuses'}</option>`,
    ).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:1200px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Sessions</h1>
          <a href="/admin" style="color:#94a3b8;font-size:0.875rem">← Admin</a>
        </div>
        <form method="GET" action="/admin/sessions" style="display:flex;gap:0.75rem;margin-bottom:1rem;align-items:flex-end">
          <div class="form-group" style="margin:0">
            <label>Status</label>
            <select name="status">${statusOptions}</select>
          </div>
          <div class="form-group" style="margin:0;flex:1">
            <label>Agent ID</label>
            <input name="agentId" value="${escHtml(agentFilter)}" placeholder="Filter by agent" />
          </div>
          <button type="submit" class="btn btn-ghost">Filter</button>
          <form method="POST" action="/admin/sessions/migrate-all-stale" style="display:inline">
            <button type="submit" class="btn btn-primary">Migrate All Stale</button>
          </form>
        </form>
        <div class="card">
          <table>
            <thead><tr><th>Session ID</th><th>Agent</th><th>Status</th><th>Last Active</th><th>Schema</th><th>Actions</th></tr></thead>
            <tbody>${rows || '<tr><td colspan="6" style="color:#475569;text-align:center;padding:2rem">No sessions found</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Sessions — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/sessions/:sessionId/reset', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { sessionId } = req.params;
    // The session reset endpoint is mounted under the agent; use internal path
    await api.post(`/internal/sessions/${encodeURIComponent(sessionId)}/reset`).catch(() => {});
    res.redirect('/admin/sessions');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/sessions/:sessionId/delete', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.delete(`/internal/sessions/${encodeURIComponent(req.params.sessionId)}`).catch(() => {});
    res.redirect('/admin/sessions');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/sessions/:sessionId/migrate', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.post(`/internal/sessions/${encodeURIComponent(req.params.sessionId)}/migrate`).catch(() => {});
    res.redirect('/admin/sessions');
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/sessions/migrate-all-stale', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    await api.post('/internal/sessions/migrate-stale').catch(() => {});
    res.redirect('/admin/sessions');
  } catch (err) {
    next(err);
  }
});

// ─── Sync Event Log ───────────────────────────────────────────────────────────

interface SyncEvent {
  id: string;
  trigger: string;
  inserted: number;
  updated: number;
  skipped: number;
  stale: number;
  errors: number;
  summaryJson: string;
  createdAt: string;
}

adminRouter.get('/system/sync', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;

    let syncEvents: SyncEvent[] = [];
    let lastSync: SyncEvent | null = null;
    try {
      const [{ data: last }, { data: log }] = await Promise.all([
        api.get<{ event: SyncEvent | null }>('/v1/system/sync'),
        api.get<{ events: SyncEvent[] }>('/v1/system/sync/log?limit=20'),
      ]);
      lastSync = last.event;
      syncEvents = log.events ?? [];
    } catch { /* sync log may be empty */ }

    const lastSyncHtml = lastSync ? `
      <div class="card" style="margin-bottom:1.5rem;border-color:${lastSync.errors > 0 ? '#7f2121' : '#166534'}">
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:0.75rem">
          <h2 style="margin:0;font-size:1rem">Last Sync</h2>
          <span style="font-size:0.75rem;color:#94a3b8">${new Date(lastSync.createdAt).toLocaleString()}</span>
          <span style="font-size:0.75rem;background:#1e2235;padding:0.15rem 0.5rem;border-radius:4px;color:#94a3b8">${escHtml(lastSync.trigger)}</span>
        </div>
        <div style="display:flex;gap:1.5rem;font-size:0.875rem">
          <span style="color:#4ade80">+${lastSync.inserted} inserted</span>
          <span style="color:#fbbf24">~${lastSync.updated} updated</span>
          <span style="color:#94a3b8">${lastSync.skipped} skipped</span>
          <span style="color:#f87171">${lastSync.stale} stale</span>
          ${lastSync.errors > 0 ? `<span style="color:#f87171;font-weight:600">${lastSync.errors} errors</span>` : ''}
        </div>
      </div>` : `<div class="card" style="margin-bottom:1.5rem;color:#64748b">No sync events recorded yet.</div>`;

    const evtRows = syncEvents.map((e) => {
      let summary: Record<string, unknown> = {};
      try { summary = JSON.parse(e.summaryJson) as Record<string, unknown>; } catch { /* ignore */ }
      return `
        <tr>
          <td style="font-size:0.75rem;color:#94a3b8">${new Date(e.createdAt).toLocaleString()}</td>
          <td><code style="font-size:0.75rem">${escHtml(e.trigger)}</code></td>
          <td style="color:#4ade80">+${e.inserted}</td>
          <td style="color:#fbbf24">~${e.updated}</td>
          <td style="color:#94a3b8">${e.skipped}</td>
          <td style="color:#f87171">${e.stale}</td>
          <td>${e.errors > 0 ? `<span style="color:#f87171;font-weight:600">${e.errors}</span>` : '—'}</td>
          <td style="font-size:0.7rem;color:#64748b;max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escHtml(JSON.stringify(summary).slice(0, 80))}</td>
        </tr>`;
    }).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:1100px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Boot Sync Log</h1>
          <a href="/admin/system" style="color:#94a3b8;font-size:0.875rem">← System</a>
        </div>
        ${lastSyncHtml}
        <div class="card">
          <h2 style="margin:0 0 1rem;font-size:1rem">Event History</h2>
          <table>
            <thead><tr><th>Time</th><th>Trigger</th><th>Inserted</th><th>Updated</th><th>Skipped</th><th>Stale</th><th>Errors</th><th>Summary</th></tr></thead>
            <tbody>${evtRows || '<tr><td colspan="8" style="color:#475569;text-align:center;padding:1.5rem">No sync events</td></tr>'}</tbody>
          </table>
        </div>
      </div>`, { title: 'Sync Log — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

// ─── Caal Configuration ───────────────────────────────────────────────────────

adminRouter.get('/system/caal', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const user = req.session!;

    let config: Record<string, unknown> = {};
    try {
      const { data } = await api.get<Record<string, unknown>>('/v1/system/caal-config');
      config = data;
    } catch { /* no config yet */ }

    const checked = (field: string) => config[field] ? ' checked' : '';
    const val = (field: string, def = '') => escHtml(String(config[field] ?? def));

    const genModeOptions = ['complete', 'skeleton'].map((m) =>
      `<option value="${m}"${config['generationMode'] === m ? ' selected' : ''}>${m}</option>`).join('');
    const confirmModeOptions = ['always_confirm', 'confirm_structural', 'apply_directly'].map((m) =>
      `<option value="${m}"${config['confirmationMode'] === m ? ' selected' : ''}>${m}</option>`).join('');

    res.send(layout(`
      <div class="container" style="margin-top:1.5rem;max-width:700px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem">
          <h1 style="margin:0;font-size:1.25rem">Caal AI Configuration</h1>
          <a href="/admin/system" style="color:#94a3b8;font-size:0.875rem">← System</a>
        </div>
        <p style="color:#94a3b8;margin:0 0 1.5rem;font-size:0.875rem">
          Platform-wide settings for the Caal AI assistant. Changes apply immediately to new sessions.
        </p>
        <form class="card" method="POST" action="/admin/system/caal">
          <div class="form-group">
            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
              <input type="checkbox" name="enabled" value="true"${checked('enabled')} style="width:auto" />
              Enable Caal AI Assistant
            </label>
          </div>
          <div class="form-group">
            <label>Model Override <span style="color:#64748b;font-size:0.6875rem">(leave blank to use router)</span></label>
            <input name="modelOverride" value="${val('modelOverride')}" placeholder="e.g. claude-sonnet-4-6" />
          </div>
          <div class="form-group">
            <label>Generation Mode</label>
            <select name="generationMode">${genModeOptions}</select>
          </div>
          <div class="form-group">
            <label>Confirmation Mode</label>
            <select name="confirmationMode">${confirmModeOptions}</select>
          </div>
          <div class="form-group">
            <label style="display:flex;align-items:center;gap:0.5rem;cursor:pointer">
              <input type="checkbox" name="showReasoning" value="true"${checked('showReasoning')} style="width:auto" />
              Show Reasoning in Response
            </label>
          </div>
          <div class="form-group">
            <label>System Prompt Suffix <span style="color:#64748b;font-size:0.6875rem">(appended to Caal system prompt)</span></label>
            <textarea name="systemPromptSuffix" rows="4">${val('systemPromptSuffix')}</textarea>
          </div>
          <button type="submit" class="btn btn-primary">Save Configuration</button>
        </form>
      </div>`, { title: 'Caal Config — Admin', user: { name: user.userId, role: user.role } }));
  } catch (err) {
    next(err);
  }
});

adminRouter.post('/system/caal', async (req, res, next) => {
  try {
    const api = createApiClient(req.accessToken);
    const { enabled, modelOverride, generationMode, confirmationMode, showReasoning, systemPromptSuffix } =
      req.body as Record<string, string>;
    await api.patch('/v1/system/caal-config', {
      enabled: enabled === 'true',
      modelOverride: modelOverride || null,
      generationMode,
      confirmationMode,
      showReasoning: showReasoning === 'true',
      systemPromptSuffix: systemPromptSuffix || null,
    });
    res.redirect('/admin/system/caal');
  } catch (err) {
    next(err);
  }
});
