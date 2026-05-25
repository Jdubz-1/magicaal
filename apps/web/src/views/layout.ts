interface LayoutOptions {
  title?: string;
  withCanvas?: boolean;
  user?: { name: string; role: string } | null;
}

export function layout(content: string, opts: LayoutOptions = {}): string {
  const { title = 'MagiCaal', withCanvas = false, user = null } = opts;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(title)}</title>
  <script type="module" src="https://cdn.jsdelivr.net/gh/starfederation/datastar@1.0.0-beta.11/bundles/datastar.js"></script>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { margin: 0; font-family: system-ui, sans-serif; background: #0f1117; color: #e2e8f0; }
    nav { background: #1a1d27; border-bottom: 1px solid #2d3148; padding: 0 1.5rem; display: flex; align-items: center; height: 52px; gap: 1rem; }
    nav a { color: #94a3b8; text-decoration: none; font-size: 0.875rem; }
    nav a:hover { color: #e2e8f0; }
    .nav-brand { color: #7c6af7; font-weight: 700; font-size: 1rem; margin-right: auto; }
    .container { max-width: 1280px; margin: 0 auto; padding: 1.5rem; }
    .card { background: #1a1d27; border: 1px solid #2d3148; border-radius: 8px; padding: 1.5rem; }
    .btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; border-radius: 6px; font-size: 0.875rem; cursor: pointer; border: none; }
    .btn-primary { background: #7c6af7; color: #fff; }
    .btn-primary:hover { background: #6b57f0; }
    .btn-ghost { background: transparent; color: #94a3b8; border: 1px solid #2d3148; }
    .btn-ghost:hover { background: #2d3148; }
    input, textarea, select { background: #0f1117; border: 1px solid #2d3148; border-radius: 6px; color: #e2e8f0; padding: 0.5rem 0.75rem; font-size: 0.875rem; width: 100%; }
    input:focus, textarea:focus, select:focus { outline: 2px solid #7c6af7; outline-offset: -1px; }
    label { display: block; font-size: 0.75rem; color: #94a3b8; margin-bottom: 0.25rem; }
    .form-group { margin-bottom: 1rem; }
    .alert-error { background: #3b1f1f; border: 1px solid #7f2121; border-radius: 6px; padding: 0.75rem 1rem; color: #fca5a5; font-size: 0.875rem; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 0.75rem 1rem; border-bottom: 1px solid #2d3148; font-size: 0.875rem; }
    th { color: #94a3b8; font-weight: 500; }
    #canvas-mount { position: fixed; inset: 52px 0 0; }
  </style>
  ${withCanvas ? `<link rel="stylesheet" href="/canvas/index.css"><script type="module" src="/canvas/index.mjs"></script>` : ''}
</head>
<body>
  <nav>
    <a href="/" class="nav-brand">MagiCaal</a>
    ${user ? `
    <a href="/admin">Admin</a>
    <a href="/studio">Studio</a>
    <span style="color:#94a3b8;font-size:0.75rem">${escHtml(user.name)} (${escHtml(user.role)})</span>
    <a href="/logout">Sign out</a>
    ` : ''}
  </nav>
  ${content}
</body>
</html>`;
}

export function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
