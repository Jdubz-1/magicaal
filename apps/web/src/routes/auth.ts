import { Router, type Router as RouterType } from 'express';
import { createApiClient } from '../lib/api-client';
import { config } from '../config';
import { layout, escHtml } from '../views/layout';

export const authRouter: RouterType = Router();

authRouter.get('/login', (_req, res) => {
  res.send(
    layout(`
    <div class="container" style="max-width:420px;margin-top:4rem">
      <div class="card">
        <h2 style="margin:0 0 1.5rem;font-size:1.25rem">Sign in to MagiCaal</h2>
        <div id="login-error"></div>
        <form id="login-form" method="POST" action="/login">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" autocomplete="username" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" autocomplete="current-password" required>
          </div>
          <button class="btn btn-primary" style="width:100%">Sign in</button>
        </form>
      </div>
    </div>`,
      { title: 'Sign in — MagiCaal' },
    ),
  );
});

authRouter.post('/login', async (req, res, _next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const api = createApiClient();
    const response = await api.post<{ accessToken: string }>('/v1/auth/login', { email, password });

    // SameSite is this app's CSRF control — there are no per-form tokens. Lax
    // rather than Strict on purpose: the cookie has to survive the provider's
    // top-level redirect back from an OAuth connect, which Strict would
    // suppress. Lax still refuses to travel on a cross-site form POST, which is
    // the attack the admin panel has, and that holds only while no GET route
    // changes state. tests/unit/cookie-samesite.test.ts asserts both halves.
    res.cookie('access_token', response.data.accessToken, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.redirect('/');
  } catch (err: unknown) {
    const msg = (err as { response?: { data?: { error?: { message?: string } } } })?.response?.data?.error?.message ?? 'Invalid credentials';
    res.send(
      layout(`
      <div class="container" style="max-width:420px;margin-top:4rem">
        <div class="card">
          <h2 style="margin:0 0 1.5rem;font-size:1.25rem">Sign in to MagiCaal</h2>
          <div class="alert-error" style="margin-bottom:1rem">${escHtml(msg)}</div>
          <form method="POST" action="/login">
            <div class="form-group">
              <label>Email</label>
              <input name="email" type="email" required>
            </div>
            <div class="form-group">
              <label>Password</label>
              <input name="password" type="password" required>
            </div>
            <button class="btn btn-primary" style="width:100%">Sign in</button>
          </form>
        </div>
      </div>`,
        { title: 'Sign in — MagiCaal' },
      ),
    );
  }
});

authRouter.get('/logout', (_req, res) => {
  res.clearCookie('access_token');
  res.redirect('/login');
});
