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
