import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ADMIN_SRC = readFileSync(join(__dirname, '../../src/routes/admin.ts'), 'utf8');

/**
 * The provider connect form renders submitted values back on a failed attempt.
 * Credentials must never be among them: they would sit in a `value="…"`
 * attribute of the response HTML, which can land in a back/forward cache, a
 * shared proxy cache, or history state.
 */
describe('provider connect form', () => {
  it('never copies submitted credentials into the re-rendered form', () => {
    // The 424 branch used to do exactly this before asking for a retry.
    expect(ADMIN_SRC).not.toContain('values[`cred_${k}`] = v');
  });

  it('re-renders through nonSecretValues on every failure branch', () => {
    const handler = ADMIN_SRC.slice(
      ADMIN_SRC.indexOf("adminRouter.post('/integrations/providers/:provider/create'"),
      ADMIN_SRC.indexOf("adminRouter.get('/integrations/create'"),
    );
    const renderCalls = handler.match(/render\(\{/g) ?? [];
    const nonSecret = handler.match(/nonSecretValues\(\)/g) ?? [];

    expect(renderCalls.length).toBeGreaterThanOrEqual(4); // 400, 409, 422, 424
    expect(nonSecret.length).toBeGreaterThanOrEqual(renderCalls.length);
  });

  it('reports a catalog failure on POST instead of silently redirecting', () => {
    const handler = ADMIN_SRC.slice(
      ADMIN_SRC.indexOf("adminRouter.post('/integrations/providers/:provider/create'"),
      ADMIN_SRC.indexOf("adminRouter.get('/integrations/create'"),
    );

    expect(handler).toContain("Couldn't load the model provider catalog");
    expect(handler).toContain('Nothing was saved');
  });
});
